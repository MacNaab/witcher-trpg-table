import { getBestiaryEntryById } from '@/src/data/bestiary';
import type { BestiaryCombatVariant, BestiaryEntry } from '@/src/data/bestiary/types';
import type { CharacterSheetState } from '@/src/modules/character-generator/types';
import { calculateDerivedStats } from '@/src/modules/character-generator/utils/characterCalculations';
import {
  CRITICAL_TIER_META,
  type ArchetypePreset,
  getHitLocationsForAnatomy,
  getLocationLabel,
} from '@/src/modules/combat-tracker/data/combatRulesData';
import type {
  AnatomyType,
  CombatantWeapon,
  CriticalSeverity,
  DamageType,
  HitLocationId,
  LightingConditionId,
  PenetrationTier,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import {
  createDefaultArmor,
  generateId,
  getActiveArmorLocations,
  getCriticalTierFromMargin,
  getWoundThreshold,
  resolveHitLocation,
  rollCriticalWoundEntry,
  rollDiceFormula,
  rollDie,
  rollWitcherD10,
} from '@/src/modules/combat-tracker/utils/combatEngine';
import { extractPcGearFromCharacterSheet } from '@/src/modules/combat-tracker/utils/pcGearExtraction';
import type {
  FighterSimTelemetry,
  LethalityRating,
  ModuleLanguage,
  RoundDistributionBucket,
  SampleCombatEvent,
  SimFighterConfig,
  SimWeaponConfig,
  SimulationReport,
  SimulationSettings,
  TargetPriority,
  TeamSide,
} from '../types';

const LIGHTING_PENALTIES: Record<LightingConditionId, number> = {
  daylight: 0,
  dim: 0,
  darkness: -2,
  bright: 0,
};

export function createDefaultSimSettings(): SimulationSettings {
  return {
    iterations: 500,
    maxRounds: 25,
    lightLevel: 'daylight',
    targetPriorityA: 'weakest',
    targetPriorityB: 'weakest',
    enableCritWounds: true,
    enableFumbles: true,
    enableWoundThreshold: true,
    enableFlanking: true,
    enableStatusEffects: true,
    enableMultiDefensePenalty: true,
    groupInitiativeTeamB: false,
  };
}

function parseNum(raw: string | number | undefined, fallback: number): number {
  if (typeof raw === 'number' && !Number.isNaN(raw)) return raw;
  if (typeof raw === 'string') {
    const match = raw.match(/-?\d+/);
    if (match) return Number.parseInt(match[0], 10);
  }
  return fallback;
}

function parseFirstInt(raw: string, fallback = 0): number {
  const match = raw.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : fallback;
}

function parseEffectPercentage(effectText: string, keywords: string[]): number {
  const lower = effectText.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const slice = lower.slice(idx, idx + 32);
      const pctMatch = slice.match(/(\d+)\s*%/);
      if (pctMatch) return Math.min(100, Math.max(5, Number.parseInt(pctMatch[1], 10)));
      return 35;
    }
  }
  return 0;
}

function parseSimWeaponFromBestiary(
  entry: BestiaryEntry,
  variant?: BestiaryCombatVariant
): SimWeaponConfig {
  const combat = variant ?? entry.combat;
  const weapons = combat?.weapons ?? [];
  // Pick the highest average-damage primary weapon (or first listed)
  const w = weapons[0];
  if (!w) {
    return {
      name: 'Griffe / Frappe',
      damageFormula: '2d6',
      damageType: 'slashing',
      isSilver: false,
      penetration: 'none',
      attacksPerRound: 1,
      isRanged: false,
      bleedChance: 0,
      burnChance: 0,
      poisonChance: 0,
      stunChance: 0,
    };
  }

  const lowerName = w.name.toLowerCase();
  const lowerEffect = w.effect.toLowerCase();
  const isSilver = lowerName.includes('argent') || lowerName.includes('silver');
  const penetration: PenetrationTier = lowerEffect.includes('amélior') || lowerEffect.includes('improved')
    ? 'improved'
    : lowerEffect.includes('perforation') || lowerEffect.includes('armor piercing')
      ? 'normal'
      : 'none';

  const isRanged =
    lowerEffect.includes('por') ||
    lowerName.includes('arc') ||
    lowerName.includes('arbalète') ||
    lowerName.includes('bow') ||
    lowerName.includes('crossbow') ||
    lowerName.includes('lancer') ||
    lowerName.includes('throwing');

  const damageType: DamageType =
    lowerName.includes('feu') || lowerName.includes('fire') || lowerEffect.includes('incinér')
      ? 'elemental'
      : isRanged ||
          lowerName.includes('dague') ||
          lowerName.includes('lance') ||
          lowerName.includes('morsure') ||
          lowerName.includes('crocs')
        ? 'piercing'
        : lowerName.includes('masse') ||
            lowerName.includes('bâton') ||
            lowerName.includes('gourdin') ||
            lowerName.includes('queue') ||
            lowerName.includes('coup')
          ? 'bludgeoning'
          : 'slashing';

  return {
    name: w.name,
    damageFormula: w.damage || '2d6',
    damageType,
    isSilver,
    penetration,
    attacksPerRound: Math.max(1, Math.min(4, parseNum(w.attacksPerTurn, 1))),
    isRanged,
    bleedChance: parseEffectPercentage(lowerEffect, ['saignement', 'bleed']),
    burnChance: parseEffectPercentage(lowerEffect, ['incinér', 'feu', 'burn', 'fire']),
    poisonChance: parseEffectPercentage(lowerEffect, ['empoison', 'poison', 'venin']),
    stunChance: parseEffectPercentage(lowerEffect, ['étourdis', 'stun']),
  };
}

function lookupBestSkillRank(
  skills: Record<string, string | number>,
  candidates: string[],
  fallback: number
): number {
  let best = -1;
  for (const [k, v] of Object.entries(skills)) {
    const kl = k.toLowerCase();
    if (candidates.some((c) => kl.includes(c))) {
      best = Math.max(best, parseNum(v, 0));
    }
  }
  return best >= 0 ? best : fallback;
}

/**
 * Builds a simulator fighter from a canonical BestiaryEntry.
 * Remember: Witcher TRPG Bestiary `skills` list Skill Ranks, so Base = Stat + Rank!
 */
export function simFighterFromBestiary(
  entry: BestiaryEntry,
  options: {
    team: TeamSide;
    lang: ModuleLanguage;
    variant?: BestiaryCombatVariant;
    quantity?: number;
  }
): SimFighterConfig {
  const combat = options.variant ?? entry.combat;
  const rawStats = combat?.stats ?? {};
  const skills = combat?.skills ?? {};

  const ref = parseNum(rawStats['RÉF'] ?? rawStats['REF'], 6);
  const dex = parseNum(rawStats['DEX'], 6);
  const cor = parseNum(rawStats['COR'] ?? rawStats['BODY'], 6);
  const vit = parseNum(rawStats['VIT'] ?? rawStats['SPD'], 6);
  const vol = parseNum(rawStats['VOL'] ?? rawStats['WILL'], 5);
  const rec = parseNum(rawStats['RÉC'] ?? rawStats['REC'], Math.floor((cor + vol) / 2));
  const etou = parseNum(
    rawStats['ÉTOU'] ?? rawStats['STUN'],
    Math.min(10, Math.floor((cor + vol) / 2))
  );
  const maxHp = parseNum(rawStats['PS'] ?? rawStats['HP'], 25);
  const maxEnd = parseNum(rawStats['END'] ?? rawStats['STA'], 25);
  const armorSp = parseFirstInt(entry.armor[options.lang] || entry.armor.fr, 0);

  const weapon = parseSimWeaponFromBestiary(entry, options.variant);

  const meleeRank = lookupBestSkillRank(
    skills,
    ['mêlée', 'melee', 'escrime', 'sword', 'bagarre', 'brawling', 'lames', 'small blades', 'bâton', 'staff'],
    5
  );
  const rangedRank = lookupBestSkillRank(
    skills,
    ['archerie', 'archery', 'arbalète', 'crossbow', 'athlétisme', 'athletics'],
    meleeRank
  );
  const magicRank = lookupBestSkillRank(skills, ['incantation', 'spell'], 0);
  const dodgeRank = lookupBestSkillRank(
    skills,
    ['esquive', 'dodge', 'athlétisme', 'athletics', 'mêlée', 'melee', 'escrime', 'sword'],
    5
  );

  const attackBase = weapon.isRanged
    ? Math.max(dex + rangedRank, vol + magicRank)
    : Math.max(ref + meleeRank, vol + magicRank);
  const defenseBase = Math.max(ref + dodgeRank, dex + dodgeRank);

  const anatomy: AnatomyType =
    entry.typeId === 'elemental'
      ? 'elemental'
      : entry.typeId === 'specter'
        ? 'specter'
        : entry.kind === 'humanoid'
          ? 'human'
          : 'monster';

  const variantSuffix = options.variant
    ? ` (${options.variant.label[options.lang]})`
    : '';

  return {
    id: generateId('simf'),
    name: `${entry.name[options.lang]}${variantSuffix}`,
    team: options.team,
    quantity: Math.max(1, options.quantity ?? 1),
    anatomy,
    maxHp,
    maxEnd,
    armorSp,
    ref,
    dex,
    cor,
    vit,
    vol,
    rec,
    etou,
    attackBase,
    defenseBase,
    resistantToNonSilver: entry.kind === 'monster' && entry.typeId !== 'beast',
    stance: 'balanced',
    weapon,
    sourceTag: 'bestiary',
  };
}

function weaponToSimLoadout(w: CombatantWeapon | undefined, isWitcherDefault = false): SimWeaponConfig {
  if (!w) {
    return {
      name: isWitcherDefault ? 'Épée d’argent' : 'Épée d’armement',
      damageFormula: '3d6',
      damageType: 'slashing',
      isSilver: isWitcherDefault,
      penetration: 'none',
      attacksPerRound: 1,
      isRanged: false,
      bleedChance: 0,
      burnChance: 0,
      poisonChance: 0,
      stunChance: 0,
    };
  }
  const lowerEffect = (w.effectNote || '').toLowerCase();
  const lowerName = w.name.toLowerCase();
  const isRanged =
    lowerName.includes('arc') ||
    lowerName.includes('arbalète') ||
    lowerName.includes('bow') ||
    lowerName.includes('crossbow') ||
    lowerName.includes('trait') ||
    lowerName.includes('bolt');

  return {
    name: w.name,
    damageFormula: w.damage || '3d6',
    damageType: w.damageType,
    isSilver: w.isSilver,
    penetration: w.penetration,
    attacksPerRound: Math.max(1, w.attacksPerRound || 1),
    isRanged,
    bleedChance: parseEffectPercentage(lowerEffect, ['saignement', 'bleed']),
    burnChance: parseEffectPercentage(lowerEffect, ['incinér', 'feu', 'burn']),
    poisonChance: parseEffectPercentage(lowerEffect, ['empoison', 'poison']),
    stunChance: parseEffectPercentage(lowerEffect, ['étourdis', 'stun']),
  };
}

export function simFighterFromHubPc(
  pc: SavedPartyCharacter,
  team: TeamSide
): SimFighterConfig {
  const armorValues = [
    pc.armor.head,
    pc.armor.torso,
    pc.armor.rightArm,
    pc.armor.leftArm,
    pc.armor.rightLeg,
    pc.armor.leftLeg,
  ];
  const avgArmor = Math.round(
    armorValues.reduce((acc, v) => acc + v, 0) / armorValues.length
  );
  const primaryWeapon = weaponToSimLoadout(pc.weapons[0]);
  const estimatedSkill = Math.max(4, Math.min(8, Math.round(pc.stats.ref * 0.75)));

  return {
    id: generateId('simf'),
    name: pc.name,
    team,
    quantity: 1,
    anatomy: pc.anatomy,
    maxHp: pc.maxHp,
    maxEnd: pc.maxEnd,
    armorSp: avgArmor,
    ref: pc.stats.ref,
    dex: pc.stats.dex,
    cor: pc.stats.cor,
    vit: pc.stats.vit,
    vol: pc.stats.vol,
    rec: pc.stats.rec,
    etou: pc.stats.etou,
    attackBase: (primaryWeapon.isRanged ? pc.stats.dex : pc.stats.ref) + estimatedSkill,
    defenseBase: pc.stats.ref + estimatedSkill,
    resistantToNonSilver: false,
    stance: 'balanced',
    weapon: primaryWeapon,
    sourceTag: 'hub-pc',
  };
}

export function simFighterFromArchetype(
  preset: ArchetypePreset,
  team: TeamSide,
  lang: ModuleLanguage
): SimFighterConfig {
  const firstWpn = preset.weapons[0];
  const weapon = weaponToSimLoadout(
    firstWpn
      ? {
          id: 'w0',
          name: firstWpn.name[lang],
          damage: firstWpn.damage,
          damageType: firstWpn.damageType,
          isSilver: firstWpn.isSilver,
          penetration: firstWpn.penetration,
          reliability: firstWpn.reliability,
          maxReliability: firstWpn.reliability,
          attacksPerRound: firstWpn.attacksPerRound,
          effectNote: firstWpn.effectNote,
        }
      : undefined
  );

  const skillBonus = preset.id === 'preset-witcher' || preset.id === 'preset-man-at-arms' ? 7 : 6;

  return {
    id: generateId('simf'),
    name: preset.name[lang],
    team,
    quantity: 1,
    anatomy: preset.anatomy,
    maxHp: preset.hp,
    maxEnd: preset.end,
    armorSp: preset.armorSp,
    ref: preset.stats.ref,
    dex: preset.stats.dex,
    cor: preset.stats.cor,
    vit: preset.stats.vit,
    vol: preset.stats.vol,
    rec: preset.stats.rec,
    etou: preset.stats.etou,
    attackBase:
      (weapon.isRanged
        ? preset.stats.dex
        : weapon.damageType === 'elemental'
          ? preset.stats.vol
          : preset.stats.ref) + skillBonus,
    defenseBase: preset.stats.ref + skillBonus,
    resistantToNonSilver: false,
    stance: 'balanced',
    weapon,
    sourceTag: 'archetype',
  };
}

export function simFighterFromCharacterSheet(
  sheet: CharacterSheetState,
  team: TeamSide,
  lang: ModuleLanguage
): SimFighterConfig {
  const derived = calculateDerivedStats(sheet);
  const allRanks = {
    ...sheet.generalSkillRanks,
    ...sheet.professionSkillRanks,
  };

  const ref = sheet.stats.REF || 6;
  const dex = sheet.stats.DEX || 6;
  const vol = sheet.stats.VOL || 6;

  const refWeaponBest = Math.max(
    allRanks.ref_swordsmanship ?? 0,
    allRanks.ref_melee ?? 0,
    allRanks.ref_small_blades ?? 0,
    allRanks.ref_staff_spear ?? 0,
    allRanks.ref_brawling ?? 0
  );
  const dexWeaponBest = Math.max(
    allRanks.dex_archery ?? 0,
    allRanks.dex_crossbow ?? 0
  );
  const spellRank = allRanks.vol_spell_casting ?? 0;
  const defRank = Math.max(
    allRanks.ref_dodge ?? 0,
    allRanks.dex_athletics ?? 0,
    refWeaponBest
  );

  const meleeAttack = ref + refWeaponBest;
  const rangedAttack = dex + dexWeaponBest;
  const magicAttack = vol + spellRank;
  const useRanged = rangedAttack > meleeAttack && rangedAttack >= magicAttack;
  const useMagic = magicAttack > meleeAttack && magicAttack > rangedAttack;

  const gear = extractPcGearFromCharacterSheet(sheet, lang);
  const armorValues = [
    gear.armor.head,
    gear.armor.torso,
    gear.armor.rightArm,
    gear.armor.leftArm,
    gear.armor.rightLeg,
    gear.armor.leftLeg,
  ];
  const avgArmor = Math.round(
    armorValues.reduce((acc, v) => acc + v, 0) / armorValues.length
  );

  const weaponLoadouts = gear.weapons.map((w) => weaponToSimLoadout(w));
  const preferredEquippedWeapon = useRanged
    ? weaponLoadouts.find((w) => w.isRanged) ?? weaponLoadouts[0]
    : weaponLoadouts.find((w) => !w.isRanged) ?? weaponLoadouts[0];

  const resolvedWeapon: SimWeaponConfig = useMagic
    ? {
        name: lang === 'fr' ? 'Sort offensif' : 'Offensive Spell',
        damageFormula: '3d6',
        damageType: 'elemental',
        isSilver: false,
        penetration: 'none',
        attacksPerRound: 1,
        isRanged: true,
        bleedChance: 0,
        burnChance: 0,
        poisonChance: 0,
        stunChance: 0,
      }
    : gear.hasEquippedWeapons && preferredEquippedWeapon
      ? preferredEquippedWeapon
      : weaponToSimLoadout(gear.weapons[0]);

  const attackBase = useMagic
    ? magicAttack
    : resolvedWeapon.isRanged
      ? rangedAttack
      : meleeAttack;

  return {
    id: generateId('simf'),
    name:
      sheet.characterName.trim() ||
      (lang === 'fr' ? 'PJ importé' : 'Imported PC'),
    team,
    quantity: 1,
    anatomy: 'human',
    maxHp: derived.hp,
    maxEnd: derived.stamina,
    armorSp: avgArmor,
    ref,
    dex,
    cor: sheet.stats.COR || 6,
    vit: sheet.stats.VIT || 6,
    vol,
    rec: derived.recovery,
    etou: derived.stun,
    attackBase,
    defenseBase: Math.max(ref + defRank, dex + (allRanks.dex_athletics ?? 0)),
    resistantToNonSilver: false,
    stance: 'balanced',
    weapon: resolvedWeapon,
    sourceTag: 'json',
  };
}

export function simFighterFromCustomNpc(
  npc: SavedCustomNpc,
  team: TeamSide,
  quantity = 1
): SimFighterConfig {
  const primaryWeapon = weaponToSimLoadout(npc.weapons[0]);
  const torsoSp = npc.armor.torso ?? npc.armor.head ?? 0;
  return {
    id: generateId('simf'),
    name: npc.name,
    team,
    quantity: Math.max(1, Math.min(20, quantity)),
    anatomy: npc.anatomy,
    maxHp: npc.maxHp,
    maxEnd: npc.maxEnd,
    armorSp: torsoSp,
    ref: npc.stats.ref,
    dex: npc.stats.dex,
    cor: npc.stats.cor,
    vit: npc.stats.vit,
    vol: npc.stats.vol,
    rec: npc.stats.rec,
    etou: npc.stats.etou,
    attackBase: npc.attackBase,
    defenseBase: npc.defenseBase,
    resistantToNonSilver: false,
    stance: 'balanced',
    weapon: primaryWeapon,
    sourceTag: 'hub-npc',
  };
}

export function simFighterFromCustomMonster(
  monster: SavedCustomMonster,
  team: TeamSide,
  quantity = 1
): SimFighterConfig {
  const primaryWeapon = weaponToSimLoadout(monster.weapons[0]);
  return {
    id: generateId('simf'),
    name: monster.name,
    team,
    quantity: Math.max(1, Math.min(20, quantity)),
    anatomy: monster.anatomy,
    maxHp: monster.maxHp,
    maxEnd: monster.maxEnd,
    armorSp: monster.armorSp,
    ref: monster.stats.ref,
    dex: monster.stats.dex,
    cor: monster.stats.cor,
    vit: monster.stats.vit,
    vol: monster.stats.vol,
    rec: monster.stats.rec,
    etou: monster.stats.etou,
    attackBase: monster.attackBase,
    defenseBase: monster.defenseBase,
    resistantToNonSilver: monster.resistantToNonSilver,
    stance: 'balanced',
    weapon: primaryWeapon,
    sourceTag: 'hub-monster',
  };
}

export function simFightersFromHubGroup(
  group: SavedCombatGroup,
  savedCharacters: readonly SavedPartyCharacter[],
  targetTeam: TeamSide,
  lang: ModuleLanguage,
  extra?: {
    customNpcs?: readonly SavedCustomNpc[];
    customMonsters?: readonly SavedCustomMonster[];
  }
): SimFighterConfig[] {
  const result: SimFighterConfig[] = [];
  const pcById = new Map(savedCharacters.map((c) => [c.id, c]));
  const npcById = new Map((extra?.customNpcs ?? []).map((n) => [n.id, n]));
  const monsterById = new Map((extra?.customMonsters ?? []).map((m) => [m.id, m]));

  for (const member of group.members) {
    if (member.kind === 'saved-pc') {
      const pc = pcById.get(member.pcId);
      if (pc) result.push(simFighterFromHubPc(pc, targetTeam));
      continue;
    }

    if (member.kind === 'custom-npc') {
      const npc = npcById.get(member.npcId);
      if (npc) result.push(simFighterFromCustomNpc(npc, targetTeam, member.quantity));
      continue;
    }

    if (member.kind === 'custom-monster') {
      const mon = monsterById.get(member.monsterId);
      if (mon) {
        result.push(simFighterFromCustomMonster(mon, targetTeam, member.quantity));
      }
      continue;
    }

    if (member.kind === 'bestiary') {
      const entry = getBestiaryEntryById(member.entryId);
      if (!entry) continue;
      const variants = entry.combat?.variants;
      const chosenVariant =
        variants &&
        typeof member.variantIndex === 'number' &&
        variants[member.variantIndex]
          ? variants[member.variantIndex]
          : undefined;
      const cfg = simFighterFromBestiary(entry, {
        team: targetTeam,
        lang,
        variant: chosenVariant,
        quantity: member.quantity,
      });
      if (member.customLabel?.trim()) {
        cfg.name = member.customLabel.trim();
      }
      result.push(cfg);
      continue;
    }

    if (member.kind === 'custom') {
      result.push({
        id: generateId('simf'),
        name: member.name,
        team: targetTeam,
        quantity: Math.max(1, member.quantity),
        anatomy: member.anatomy,
        maxHp: member.maxHp,
        maxEnd: member.maxEnd,
        armorSp: member.armorSp,
        ref: member.stats.ref,
        dex: member.stats.dex,
        cor: member.stats.cor,
        vit: member.stats.vit,
        vol: member.stats.vol,
        rec: member.stats.rec,
        etou: member.stats.etou,
        attackBase: member.stats.ref + 5,
        defenseBase: member.stats.ref + 5,
        resistantToNonSilver: member.resistantToNonSilver,
        stance: 'balanced',
        weapon: {
          name: lang === 'fr' ? 'Arme' : 'Weapon',
          damageFormula: '3d6',
          damageType: 'slashing',
          isSilver: false,
          penetration: 'none',
          attacksPerRound: 1,
          isRanged: false,
          bleedChance: 0,
          burnChance: 0,
          poisonChance: 0,
          stunChance: 0,
        },
        sourceTag: 'custom',
      });
    }
  }

  return result;
}

export function createScenarioPreset(
  presetId: 'witcherVsGhouls' | 'partyVsGriffin' | 'patrolVsBandits',
  presets: readonly ArchetypePreset[],
  lang: ModuleLanguage
): { teamA: SimFighterConfig[]; teamB: SimFighterConfig[] } {
  const witcherPreset = presets.find((p) => p.id === 'preset-witcher') ?? presets[0];
  const warriorPreset = presets.find((p) => p.id === 'preset-man-at-arms') ?? presets[1];
  const magePreset = presets.find((p) => p.id === 'preset-mage') ?? presets[2];
  const guardPreset = presets.find((p) => p.id === 'preset-guard') ?? presets[4];

  const ghoul = getBestiaryEntryById('monster-ghoul');
  const griffin = getBestiaryEntryById('monster-griffin');
  const bandits = getBestiaryEntryById('human-bandits');

  if (presetId === 'witcherVsGhouls') {
    const teamA = [simFighterFromArchetype(witcherPreset, 'teamA', lang)];
    const teamB = ghoul
      ? [simFighterFromBestiary(ghoul, { team: 'teamB', lang, quantity: 3 })]
      : [];
    return { teamA, teamB };
  }

  if (presetId === 'partyVsGriffin') {
    const teamA = [
      simFighterFromArchetype(witcherPreset, 'teamA', lang),
      simFighterFromArchetype(warriorPreset, 'teamA', lang),
      simFighterFromArchetype(magePreset, 'teamA', lang),
    ];
    const teamB = griffin
      ? [simFighterFromBestiary(griffin, { team: 'teamB', lang, quantity: 1 })]
      : [];
    return { teamA, teamB };
  }

  // patrolVsBandits
  const teamA = [
    { ...simFighterFromArchetype(guardPreset, 'teamA', lang), quantity: 2 },
  ];
  const teamB = bandits
    ? [simFighterFromBestiary(bandits, { team: 'teamB', lang, quantity: 3 })]
    : [];
  return { teamA, teamB };
}

// ============================================================================
// Monte-Carlo Runtime Engine
// ============================================================================

interface RuntimeUnit {
  uid: string;
  blueprintId: string;
  displayName: string;
  team: TeamSide;
  cfg: SimFighterConfig;
  hp: number;
  end: number;
  armor: Record<HitLocationId, { current: number; max: number }>;
  initiative: number;
  tieBreaker: number;
  isDead: boolean;
  deathSaveRounds: number;
  bleeding: boolean;
  poisoned: boolean;
  burning: boolean;
  stunned: boolean;
  staggered: boolean;
  prone: boolean;
  defensesUsedThisRound: number;
  meleeAttackersThisRound: number;
  // Accumulators per unit for this single run
  dmgDealt: number;
  dmgTaken: number;
  critsInflicted: number;
  critsReceived: number;
  fumbles: number;
  attacksHit: number;
  attacksTotal: number;
}

function instantiateTeamUnits(
  configs: readonly SimFighterConfig[],
  sharedGroupInitRoll?: number
): RuntimeUnit[] {
  const units: RuntimeUnit[] = [];
  for (const cfg of configs) {
    const qty = Math.max(1, Math.min(20, cfg.quantity));
    for (let i = 0; i < qty; i += 1) {
      const label = qty > 1 ? `${cfg.name} #${i + 1}` : cfg.name;
      const initRoll = sharedGroupInitRoll ?? rollDie(10);
      units.push({
        uid: `${cfg.id}-${i}`,
        blueprintId: cfg.id,
        displayName: label,
        team: cfg.team,
        cfg,
        hp: cfg.maxHp,
        end: cfg.maxEnd,
        armor: createDefaultArmor(cfg.armorSp, cfg.anatomy),
        initiative: cfg.ref + initRoll,
        tieBreaker: rollDie(10),
        isDead: false,
        deathSaveRounds: 0,
        bleeding: false,
        poisoned: false,
        burning: false,
        stunned: false,
        staggered: false,
        prone: false,
        defensesUsedThisRound: 0,
        meleeAttackersThisRound: 0,
        dmgDealt: 0,
        dmgTaken: 0,
        critsInflicted: 0,
        critsReceived: 0,
        fumbles: 0,
        attacksHit: 0,
        attacksTotal: 0,
      });
    }
  }
  return units;
}

function isCombatCapable(unit: RuntimeUnit): boolean {
  return !unit.isDead && unit.hp >= 0;
}

function pickTarget(
  opponents: readonly RuntimeUnit[],
  priority: TargetPriority,
  focusedTargetId: string | null
): RuntimeUnit | null {
  const alive = opponents.filter(isCombatCapable);
  if (alive.length === 0) return null;

  if (priority === 'focused' && focusedTargetId) {
    const prev = alive.find((u) => u.uid === focusedTargetId);
    if (prev) return prev;
  }

  if (priority === 'weakest') {
    let best = alive[0];
    for (let i = 1; i < alive.length; i += 1) {
      if (alive[i].hp < best.hp) best = alive[i];
    }
    return best;
  }

  if (priority === 'strongest') {
    let best = alive[0];
    for (let i = 1; i < alive.length; i += 1) {
      if (alive[i].hp > best.hp) best = alive[i];
    }
    return best;
  }

  // 'random' or fallback
  return alive[Math.floor(Math.random() * alive.length)];
}

function getWoundPenalty(unit: RuntimeUnit, settings: SimulationSettings): number {
  if (!settings.enableWoundThreshold) return 0;
  const threshold = getWoundThreshold(unit.cfg.maxHp);
  if (unit.hp < threshold && unit.hp >= 0) {
    return -Math.floor(unit.cfg.ref / 2);
  }
  return 0;
}

function rollArmorLocationsDamage(
  unit: RuntimeUnit,
  rawDamage: number,
  locationId: HitLocationId,
  weapon: SimWeaponConfig,
  critSeverity: CriticalSeverity | null,
  noAnatomyBonus: number
): { finalDamage: number } {
  const afterCover = Math.max(0, rawDamage);
  const currentSp = unit.armor[locationId]?.current ?? 0;
  const effectiveSp =
    weapon.penetration === 'improved' ? Math.floor(currentSp / 2) : currentSp;

  const afterArmor = Math.max(0, afterCover - effectiveSp);
  if (afterArmor > 0 && currentSp > 0 && unit.armor[locationId]) {
    unit.armor[locationId].current = Math.max(0, currentSp - 1);
  }

  let afterResist = afterArmor;
  const applyNonSilverHalf =
    unit.cfg.resistantToNonSilver &&
    !weapon.isSilver &&
    weapon.damageType !== 'elemental';

  if (applyNonSilverHalf) {
    afterResist = Math.floor(afterResist / 2);
  }

  const locTable = getHitLocationsForAnatomy(unit.cfg.anatomy);
  const locRow = locTable.find((r) => r.id === locationId) ?? locTable[1];
  const afterLocation = Math.floor(afterResist * locRow.damageMultiplier);

  const critBonus =
    (critSeverity ? CRITICAL_TIER_META[critSeverity].bonusDamage : 0) +
    noAnatomyBonus;

  return {
    finalDamage: afterLocation + critBonus,
  };
}

function executeSingleFight(
  teamA: readonly SimFighterConfig[],
  teamB: readonly SimFighterConfig[],
  settings: SimulationSettings,
  lang: ModuleLanguage,
  recordTranscript: boolean
): {
  winner: TeamSide | 'draw';
  rounds: number;
  teamAPerfectWin: boolean;
  units: RuntimeUnit[];
  transcript: SampleCombatEvent[];
} {
  const sharedTeamBRoll = settings.groupInitiativeTeamB ? rollDie(10) : undefined;
  const units = [
    ...instantiateTeamUnits(teamA),
    ...instantiateTeamUnits(teamB, sharedTeamBRoll),
  ];

  // Sort initiative descending
  units.sort((a, b) => {
    if (b.initiative !== a.initiative) return b.initiative - a.initiative;
    if (b.tieBreaker !== a.tieBreaker) return b.tieBreaker - a.tieBreaker;
    return b.cfg.ref - a.cfg.ref;
  });

  const transcript: SampleCombatEvent[] = [];
  if (recordTranscript) {
    const orderStr = units
      .map((u) => `${u.displayName} (${u.initiative})`)
      .join(' → ');
    transcript.push({
      round: 0,
      actor: 'System',
      kind: 'init',
      text:
        lang === 'fr'
          ? `Ordre d’initiative : ${orderStr}`
          : `Initiative order: ${orderStr}`,
    });
  }

  const lightMod = LIGHTING_PENALTIES[settings.lightLevel];
  let round = 0;
  let winner: TeamSide | 'draw' = 'draw';
  let focusA: string | null = null;
  let focusB: string | null = null;

  while (round < settings.maxRounds) {
    round += 1;

    // Reset per-round flanking & multi-defense counters
    for (const u of units) {
      u.defensesUsedThisRound = 0;
      u.meleeAttackersThisRound = 0;
    }

    for (const actor of units) {
      if (actor.isDead) continue;

      // Dying unit rolls Death Save on turn start
      if (actor.hp < 0) {
        const penalty = actor.deathSaveRounds;
        actor.deathSaveRounds += 1;
        const saveRoll = rollDie(10);
        const target = Math.max(1, actor.cfg.etou - penalty);
        if (saveRoll === 10 || saveRoll > target) {
          actor.isDead = true;
          if (recordTranscript) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'death',
              text:
                lang === 'fr'
                  ? `${actor.displayName} échoue son jet contre la mort (${saveRoll} vs ${target}) et succombe.`
                  : `${actor.displayName} fails Death Save (${saveRoll} vs ${target}) and dies.`,
            });
          }
        }
        continue;
      }

      // Check victory before actor acts
      const aliveA = units.some((u) => u.team === 'teamA' && isCombatCapable(u));
      const aliveB = units.some((u) => u.team === 'teamB' && isCombatCapable(u));
      if (!aliveA || !aliveB) {
        winner = aliveA ? 'teamA' : 'teamB';
        break;
      }

      // Clear Staggered at start of own turn
      if (actor.staggered) {
        actor.staggered = false;
      }

      // Apply start-of-turn DoTs
      if (settings.enableStatusEffects) {
        let dotDmg = 0;
        const dotNotes: string[] = [];
        if (actor.bleeding) {
          dotDmg += 2;
          dotNotes.push(lang === 'fr' ? 'Saignement -2' : 'Bleed -2');
        }
        if (actor.poisoned) {
          dotDmg += 3;
          dotNotes.push(lang === 'fr' ? 'Poison -3' : 'Poison -3');
        }
        if (actor.burning) {
          const zones = getActiveArmorLocations(actor.cfg.anatomy);
          let burnTotal = 0;
          for (const z of zones) {
            const sp = actor.armor[z]?.current ?? 0;
            burnTotal += Math.max(0, 5 - sp);
            if (sp > 0) actor.armor[z].current = sp - 1;
          }
          dotDmg += burnTotal;
          dotNotes.push(
            lang === 'fr' ? `Incinération -${burnTotal}` : `Fire -${burnTotal}`
          );
        }
        if (dotDmg > 0) {
          actor.hp -= dotDmg;
          actor.dmgTaken += dotDmg;
          if (recordTranscript) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'status',
              text: `${actor.displayName}: ${dotNotes.join(', ')} (${actor.hp} ${lang === 'fr' ? 'PS' : 'HP'}).`,
            });
          }
          if (actor.hp < 0) continue;
        }
      }

      // Stunned actor spends turn attempting to break Stun
      if (actor.stunned) {
        const stunRoll = rollDie(10);
        const stunTarget = Math.max(1, actor.cfg.etou);
        if (stunRoll !== 10 && stunRoll <= stunTarget) {
          actor.stunned = false;
          if (recordTranscript) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'status',
              text:
                lang === 'fr'
                  ? `${actor.displayName} réussit sa sauvegarde d’étourdissement.`
                  : `${actor.displayName} recovers from Stun.`,
            });
          }
        }
        continue;
      }

      const enemies = units.filter((u) => u.team !== actor.team);
      const priority =
        actor.team === 'teamA' ? settings.targetPriorityA : settings.targetPriorityB;
      const focusedId = actor.team === 'teamA' ? focusA : focusB;

      const target = pickTarget(enemies, priority, focusedId);
      if (!target) {
        winner = actor.team;
        break;
      }
      if (actor.team === 'teamA') focusA = target.uid;
      else focusB = target.uid;

      // Stand up from Prone cleanly (costs movement, leaves action intact)
      if (actor.prone) {
        actor.prone = false;
      }

      // Determine attacks this turn & strike mods
      const stance = actor.cfg.stance;
      const numAttacks =
        stance === 'fast' && !actor.cfg.weapon.isRanged
          ? 2
          : stance === 'strong' || stance === 'defensive'
            ? 1
            : actor.cfg.weapon.attacksPerRound;

      const isStrongStrike = stance === 'strong';
      const strikeAttMod = isStrongStrike ? -3 : 0;

      for (let atkIdx = 0; atkIdx < numAttacks; atkIdx += 1) {
        if (!isCombatCapable(target)) break;

        actor.attacksTotal += 1;
        const attWoundMod = getWoundPenalty(actor, settings);
        const attCondMod =
          (actor.staggered ? -2 : 0) + (actor.prone ? -2 : 0) + lightMod;

        const attDie = rollWitcherD10();
        const attTotal = Math.max(
          0,
          actor.cfg.attackBase +
            attWoundMod +
            attCondMod +
            strikeAttMod +
            attDie.dieValue
        );

        // Handle attack fumble
        if (settings.enableFumbles && attDie.isCritFail) {
          actor.fumbles += 1;
          if (attDie.fumbleSeverity === 6) {
            actor.staggered = true;
          } else if (attDie.fumbleSeverity >= 9) {
            const selfDmg = rollDiceFormula('2d6').total;
            actor.hp -= selfDmg;
            actor.dmgTaken += selfDmg;
          }
          if (recordTranscript) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'fumble',
              text:
                lang === 'fr'
                  ? `${actor.displayName} fait un échec critique à l’attaque (gravité ${attDie.fumbleSeverity}).`
                  : `${actor.displayName} fumbles attack (severity ${attDie.fumbleSeverity}).`,
            });
          }
          continue;
        }

        // Flanking check on melee attacks
        let flankPenalty = 0;
        if (settings.enableFlanking && !actor.cfg.weapon.isRanged) {
          flankPenalty = -Math.min(5, target.meleeAttackersThisRound);
          if (atkIdx === 0) {
            target.meleeAttackersThisRound += 1;
          }
        }

        // Compute Defense Total (DC 10 if Stunned)
        let defTotal = 10;
        let targetStunnedBeforeHit = target.stunned;

        if (!targetStunnedBeforeHit) {
          const defWoundMod = getWoundPenalty(target, settings);
          const defStanceMod = target.cfg.stance === 'defensive' ? 2 : 0;
          const defCondMod =
            (target.staggered ? -2 : 0) + (target.prone ? -2 : 0) + lightMod;

          let multiDefPenalty = 0;
          if (settings.enableMultiDefensePenalty) {
            if (target.defensesUsedThisRound > 0) {
              if (target.end > 0) {
                target.end -= 1;
              } else {
                multiDefPenalty = -2;
              }
            }
            target.defensesUsedThisRound += 1;
          }

          const defDie = rollWitcherD10();
          if (settings.enableFumbles && defDie.isCritFail) {
            target.fumbles += 1;
            if (defDie.fumbleSeverity === 8) {
              target.prone = true;
            }
          }

          defTotal = Math.max(
            0,
            target.cfg.defenseBase +
              defWoundMod +
              defStanceMod +
              defCondMod +
              flankPenalty +
              multiDefPenalty +
              defDie.dieValue
          );
        }

        const margin = attTotal - defTotal;
        if (margin <= 0) {
          if (recordTranscript && atkIdx === 0) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'miss',
              text:
                lang === 'fr'
                  ? `${actor.displayName} (${attTotal}) manque ${target.displayName} (${defTotal}).`
                  : `${actor.displayName} (${attTotal}) misses ${target.displayName} (${defTotal}).`,
            });
          }
          continue;
        }

        // HIT!
        actor.attacksHit += 1;
        const critTier = settings.enableCritWounds
          ? getCriticalTierFromMargin(margin)
          : null;
        const locRow = resolveHitLocation(target.cfg.anatomy, rollDie(10));

        let noAnatomyBonus = 0;
        let critWoundTitle = '';
        if (critTier) {
          actor.critsInflicted += 1;
          target.critsReceived += 1;
          const critRes = rollCriticalWoundEntry(
            critTier,
            target.cfg.anatomy,
            round,
            locRow.id
          );
          noAnatomyBonus = critRes.noAnatomyExtraDamage;
          if (critRes.wound) {
            critWoundTitle = critRes.wound.title[lang];
            const titleLower = critRes.wound.title.fr.toLowerCase();
            if (titleLower.includes('décapitation')) {
              target.isDead = true;
            }
            if (settings.enableStatusEffects) {
              if (
                titleLower.includes('saigne') ||
                titleLower.includes('fracture ouverte') ||
                titleLower.includes('arraché') ||
                titleLower.includes('œil') ||
                titleLower.includes('cœur') ||
                titleLower.includes('rate')
              ) {
                target.bleeding = true;
              }
              if (titleLower.includes('septique')) {
                target.poisoned = true;
              }
            }
          }
          // Critical wounds force a Stun Save
          if (settings.enableStatusEffects && !target.isDead) {
            const stunSave = rollDie(10);
            if (stunSave === 10 || stunSave > Math.max(1, target.cfg.etou)) {
              target.stunned = true;
            }
          }
        }

        const rawRoll = rollDiceFormula(actor.cfg.weapon.damageFormula).total;
        const rawAfterStrike = isStrongStrike ? rawRoll * 2 : rawRoll;
        const { finalDamage } = rollArmorLocationsDamage(
          target,
          rawAfterStrike,
          locRow.id,
          actor.cfg.weapon,
          critTier,
          noAnatomyBonus
        );

        target.hp -= finalDamage;
        actor.dmgDealt += finalDamage;
        target.dmgTaken += finalDamage;

        // Striking a stunned target wakes them up (guide/combat.md line 346)
        if (targetStunnedBeforeHit && finalDamage > 0) {
          target.stunned = false;
        }

        // Apply weapon status chances on penetrating hit
        if (settings.enableStatusEffects && finalDamage > 0) {
          if (
            actor.cfg.weapon.bleedChance > 0 &&
            rollDie(100) <= actor.cfg.weapon.bleedChance
          ) {
            target.bleeding = true;
          }
          if (
            actor.cfg.weapon.burnChance > 0 &&
            rollDie(100) <= actor.cfg.weapon.burnChance
          ) {
            target.burning = true;
          }
          if (
            actor.cfg.weapon.poisonChance > 0 &&
            rollDie(100) <= actor.cfg.weapon.poisonChance
          ) {
            target.poisoned = true;
          }
          if (
            actor.cfg.weapon.stunChance > 0 &&
            rollDie(100) <= actor.cfg.weapon.stunChance
          ) {
            target.stunned = true;
          }
        }

        if (recordTranscript) {
          const locName = getLocationLabel(locRow.id, target.cfg.anatomy, lang);
          if (critTier) {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'crit',
              text:
                lang === 'fr'
                  ? `${actor.displayName} → ${target.displayName} (${locName}) : CRITIQUE ${critTier.toUpperCase()} (${critWoundTitle || 'Organes'}), ${finalDamage} PS (${Math.max(0, target.hp)}/${target.cfg.maxHp}).`
                  : `${actor.displayName} → ${target.displayName} (${locName}): ${critTier.toUpperCase()} CRIT (${critWoundTitle || 'Internal'}), ${finalDamage} HP (${Math.max(0, target.hp)}/${target.cfg.maxHp}).`,
            });
          } else {
            transcript.push({
              round,
              actor: actor.displayName,
              kind: 'hit',
              text:
                lang === 'fr'
                  ? `${actor.displayName} → ${target.displayName} (${locName}) : ${finalDamage} PS (${Math.max(0, target.hp)}/${target.cfg.maxHp}).`
                  : `${actor.displayName} → ${target.displayName} (${locName}): ${finalDamage} HP (${Math.max(0, target.hp)}/${target.cfg.maxHp}).`,
            });
          }
        }
      }
    }

    const aliveA = units.some((u) => u.team === 'teamA' && isCombatCapable(u));
    const aliveB = units.some((u) => u.team === 'teamB' && isCombatCapable(u));
    if (!aliveA || !aliveB) {
      winner = aliveA ? 'teamA' : 'teamB';
      break;
    }
  }

  const teamAPerfectWin =
    winner === 'teamA' &&
    units
      .filter((u) => u.team === 'teamA')
      .every((u) => !u.isDead && u.hp >= 0);

  if (recordTranscript) {
    transcript.push({
      round,
      actor: 'System',
      kind: 'victory',
      text:
        winner === 'draw'
          ? lang === 'fr'
            ? `Égalité atteinte après ${round} rounds.`
            : `Draw reached after ${round} rounds.`
          : lang === 'fr'
            ? `Victoire ${winner === 'teamA' ? 'Équipe A' : 'Équipe B'} en ${round} round(s).`
            : `${winner === 'teamA' ? 'Team A' : 'Team B'} wins in ${round} round(s).`,
    });
  }

  return {
    winner,
    rounds: round,
    teamAPerfectWin,
    units,
    transcript,
  };
}

/**
 * Executes N Monte-Carlo Witcher TRPG combats synchronously and aggregates
 * win rates, lethality classification, round distribution, per-fighter telemetry,
 * and a representative combat transcript.
 */
export function runCombatSimulationBatch(
  teamA: readonly SimFighterConfig[],
  teamB: readonly SimFighterConfig[],
  settings: SimulationSettings,
  lang: ModuleLanguage
): SimulationReport {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const iterations = Math.max(10, Math.min(5000, settings.iterations));

  let teamAWins = 0;
  let teamBWins = 0;
  let draws = 0;
  let teamAPerfectWins = 0;
  let totalRounds = 0;
  let minRounds = Number.POSITIVE_INFINITY;
  let maxRounds = 0;

  const roundBins = new Map<number, { teamAWins: number; teamBWins: number }>();

  interface Accumulator {
    cfg: SimFighterConfig;
    unitInstances: number;
    survivedCount: number;
    deadCount: number;
    sumRemainingHp: number;
    sumDmgDealt: number;
    sumDmgTaken: number;
    sumCritsInflicted: number;
    sumCritsReceived: number;
    sumFumbles: number;
    sumAttacksHit: number;
    sumAttacksTotal: number;
  }

  const accumulators = new Map<string, Accumulator>();
  for (const cfg of [...teamA, ...teamB]) {
    accumulators.set(cfg.id, {
      cfg,
      unitInstances: 0,
      survivedCount: 0,
      deadCount: 0,
      sumRemainingHp: 0,
      sumDmgDealt: 0,
      sumDmgTaken: 0,
      sumCritsInflicted: 0,
      sumCritsReceived: 0,
      sumFumbles: 0,
      sumAttacksHit: 0,
      sumAttacksTotal: 0,
    });
  }

  const sampleIndex = Math.floor(iterations / 2);
  let sampleWinner: TeamSide | 'draw' = 'draw';
  let sampleRounds = 1;
  let sampleLog: SampleCombatEvent[] = [];

  for (let i = 0; i < iterations; i += 1) {
    const isSample = i === sampleIndex;
    const result = executeSingleFight(teamA, teamB, settings, lang, isSample);

    if (result.winner === 'teamA') {
      teamAWins += 1;
      if (result.teamAPerfectWin) teamAPerfectWins += 1;
    } else if (result.winner === 'teamB') {
      teamBWins += 1;
    } else {
      draws += 1;
    }

    totalRounds += result.rounds;
    minRounds = Math.min(minRounds, result.rounds);
    maxRounds = Math.max(maxRounds, result.rounds);

    const bin = roundBins.get(result.rounds) ?? { teamAWins: 0, teamBWins: 0 };
    if (result.winner === 'teamA') bin.teamAWins += 1;
    else if (result.winner === 'teamB') bin.teamBWins += 1;
    roundBins.set(result.rounds, bin);

    for (const u of result.units) {
      const acc = accumulators.get(u.blueprintId);
      if (!acc) continue;
      acc.unitInstances += 1;
      if (!u.isDead && u.hp >= 0) acc.survivedCount += 1;
      if (u.isDead || u.hp < 0) acc.deadCount += 1;
      acc.sumRemainingHp += Math.max(0, u.hp);
      acc.sumDmgDealt += u.dmgDealt;
      acc.sumDmgTaken += u.dmgTaken;
      acc.sumCritsInflicted += u.critsInflicted;
      acc.sumCritsReceived += u.critsReceived;
      acc.sumFumbles += u.fumbles;
      acc.sumAttacksHit += u.attacksHit;
      acc.sumAttacksTotal += u.attacksTotal;
    }

    if (isSample) {
      sampleWinner = result.winner;
      sampleRounds = result.rounds;
      sampleLog = result.transcript;
    }
  }

  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const durationMs = Math.max(1, Math.round(end - start));

  const teamAWinRate = (teamAWins / iterations) * 100;
  const teamBWinRate = (teamBWins / iterations) * 100;
  const drawRate = (draws / iterations) * 100;
  const teamAPerfectWinRate = (teamAPerfectWins / iterations) * 100;

  // Determine objective lethality rating for Team A
  let lethality: LethalityRating = 'balanced';
  if (teamAWinRate >= 92 && teamAPerfectWinRate >= 75) {
    lethality = 'trivial';
  } else if (teamAWinRate >= 72) {
    lethality = 'favorable';
  } else if (teamAWinRate >= 45) {
    lethality = 'balanced';
  } else if (teamAWinRate >= 20) {
    lethality = 'risky';
  } else {
    lethality = 'deadly';
  }

  const roundDistribution: RoundDistributionBucket[] = Array.from(roundBins.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([round, counts]) => ({
      round,
      teamAWins: counts.teamAWins,
      teamBWins: counts.teamBWins,
    }));

  const fighterTelemetry: FighterSimTelemetry[] = [];
  for (const acc of accumulators.values()) {
    const n = Math.max(1, acc.unitInstances);
    fighterTelemetry.push({
      blueprintId: acc.cfg.id,
      name: acc.cfg.name,
      team: acc.cfg.team,
      quantity: acc.cfg.quantity,
      survivalRate: (acc.survivedCount / n) * 100,
      deathRate: (acc.deadCount / n) * 100,
      avgRemainingHp: acc.sumRemainingHp / n,
      avgDamageDealt: acc.sumDmgDealt / n,
      avgDamageTaken: acc.sumDmgTaken / n,
      avgCritsInflicted: acc.sumCritsInflicted / n,
      avgCritsReceived: acc.sumCritsReceived / n,
      avgFumbles: acc.sumFumbles / n,
      avgAttacksHit: acc.sumAttacksHit / n,
      avgAttacksTotal: acc.sumAttacksTotal / n,
    });
  }

  return {
    iterations,
    durationMs,
    teamAWins,
    teamBWins,
    draws,
    teamAWinRate,
    teamBWinRate,
    drawRate,
    teamAPerfectWins,
    teamAPerfectWinRate,
    avgRounds: totalRounds / iterations,
    minRounds: Number.isFinite(minRounds) ? minRounds : 0,
    maxRounds,
    lethality,
    roundDistribution,
    fighterTelemetry,
    sampleWinner,
    sampleRounds,
    sampleLog,
  };
}
