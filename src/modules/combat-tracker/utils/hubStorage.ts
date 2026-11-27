import { getBestiaryEntryById } from '@/src/data/bestiary';
import type { CharacterProfessionId, CharacterSheetState } from '@/src/modules/character-generator/types';
import {
  PROFESSIONS_DATA,
  getProfessionDefinition,
  getRaceDefinition,
} from '@/src/modules/character-generator/data/racesAndProfessions';
import { calculateDerivedStats } from '@/src/modules/character-generator/utils/characterCalculations';
import type { ArchetypePreset } from '../data/combatRulesData';
import type {
  CombatHubState,
  CombatTrackerState,
  Combatant,
  CombatantRole,
  CombatantWeapon,
  EncounterStatus,
  GroupMemberEntry,
  HitLocationId,
  ModuleLanguage,
  NpcPowerTier,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedEncounterSession,
  SavedPartyCharacter,
} from '../types';
import {
  createCombatantFromBestiary,
  createDefaultArmor,
  createInitialCombatState,
  generateId,
  loadCombatTrackerState,
  rollDie,
} from './combatEngine';
import {
  extractPcGearFromCharacterSheet,
  extractPcSheetProfileDetails,
} from './pcGearExtraction';

export const COMBAT_HUB_STORAGE_KEY = 'witcher-gm-combat-hub-v1';
export const COMBAT_SESSIONS_STORAGE_KEY = 'witcher-gm-combat-sessions-v1';

export function createInitialHubState(): CombatHubState {
  return {
    version: 1,
    characters: [],
    groups: [],
    customNpcs: [],
    customMonsters: [],
  };
}

export function loadCombatHubState(): CombatHubState {
  if (typeof window === 'undefined') return createInitialHubState();
  try {
    const raw = window.localStorage.getItem(COMBAT_HUB_STORAGE_KEY);
    if (!raw) return createInitialHubState();
    const parsed = JSON.parse(raw) as Partial<CombatHubState>;
    if (!parsed || typeof parsed !== 'object') {
      return createInitialHubState();
    }
    return {
      version: 1,
      characters: Array.isArray(parsed.characters) ? parsed.characters : [],
      groups: Array.isArray(parsed.groups) ? parsed.groups : [],
      customNpcs: Array.isArray(parsed.customNpcs) ? parsed.customNpcs : [],
      customMonsters: Array.isArray(parsed.customMonsters) ? parsed.customMonsters : [],
    };
  } catch {
    return createInitialHubState();
  }
}

export function saveCombatHubState(state: CombatHubState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COMBAT_HUB_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

/**
 * Creates a fresh SavedEncounterSession wrapper around a CombatTrackerState.
 */
export function createEncounterSession(options: {
  title?: string;
  status?: EncounterStatus;
  state?: CombatTrackerState;
  lang: ModuleLanguage;
}): SavedEncounterSession {
  const now = new Date().toISOString();
  const baseState = options.state ?? createInitialCombatState();
  const resolvedTitle =
    options.title?.trim() ||
    baseState.encounterTitle.trim() ||
    (options.lang === 'fr' ? 'Nouvel affrontement' : 'New Encounter');

  return {
    id: generateId('enc'),
    title: resolvedTitle,
    status: options.status ?? 'active',
    createdAt: now,
    updatedAt: now,
    state: {
      ...baseState,
      encounterTitle: resolvedTitle,
    },
  };
}

/**
 * Loads all persisted combat sessions, sorted by most recently updated.
 * Automatically migrates a pre-existing single-board legacy combat once if present.
 */
export function loadCombatSessions(
  lang: ModuleLanguage = 'fr'
): SavedEncounterSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(COMBAT_SESSIONS_STORAGE_KEY);
    if (raw === null) {
      const legacy = loadCombatTrackerState();
      if (legacy.combatants.length > 0 || legacy.logs.length > 0) {
        const migrated = createEncounterSession({
          title:
            legacy.encounterTitle.trim() ||
            (lang === 'fr' ? 'Affrontement en cours' : 'Ongoing Encounter'),
          status: 'active',
          state: legacy,
          lang,
        });
        saveCombatSessions([migrated]);
        return [migrated];
      }
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter((item): item is SavedEncounterSession => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as Partial<SavedEncounterSession>;
      return (
        typeof candidate.id === 'string' &&
        typeof candidate.title === 'string' &&
        (candidate.status === 'active' ||
          candidate.status === 'paused' ||
          candidate.status === 'completed') &&
        Boolean(candidate.state) &&
        Array.isArray(candidate.state?.combatants)
      );
    });

    return valid.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export function saveCombatSessions(
  sessions: readonly SavedEncounterSession[]
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      COMBAT_SESSIONS_STORAGE_KEY,
      JSON.stringify(sessions)
    );
  } catch {
    // Ignore quota errors
  }
}

export function formatSessionTimestamp(
  iso: string,
  lang: ModuleLanguage
): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return iso.slice(0, 16).replace('T', ' ');
  }
}

export function createDefaultSavedArmor(sp = 8): Record<HitLocationId, number> {
  const safe = Math.max(0, Math.round(sp));
  return {
    head: safe,
    torso: safe,
    rightArm: safe,
    leftArm: safe,
    rightLeg: safe,
    leftLeg: safe,
  };
}

export function createEmptySavedPc(lang: ModuleLanguage): SavedPartyCharacter {
  const now = new Date().toISOString();
  return {
    id: generateId('hubpc'),
    name: lang === 'fr' ? 'Nouveau PJ' : 'New PC',
    playerName: '',
    professionLabel: '',
    role: 'pc',
    anatomy: 'human',
    maxHp: 35,
    maxEnd: 35,
    stats: {
      ref: 7,
      dex: 7,
      cor: 7,
      vit: 7,
      int: 6,
      vol: 6,
      rec: 7,
      etou: 7,
      vig: 0,
    },
    armor: createDefaultSavedArmor(8),
    weapons: [],
    notes: '',
    updatedAt: now,
  };
}

export function createSavedPcFromPreset(
  preset: ArchetypePreset,
  lang: ModuleLanguage
): SavedPartyCharacter {
  const now = new Date().toISOString();
  return {
    id: generateId('hubpc'),
    name: preset.name[lang],
    playerName: '',
    professionLabel: preset.name[lang],
    role: preset.role === 'ally' ? 'ally' : 'pc',
    anatomy: preset.anatomy,
    maxHp: preset.hp,
    maxEnd: preset.end,
    stats: { ...preset.stats },
    armor: createDefaultSavedArmor(preset.armorSp),
    weapons: preset.weapons.map((w) => ({
      id: generateId('wpn'),
      name: w.name[lang],
      damage: w.damage,
      damageType: w.damageType,
      isSilver: w.isSilver,
      penetration: w.penetration,
      reliability: w.reliability,
      maxReliability: w.reliability,
      attacksPerRound: w.attacksPerRound,
      effectNote: w.effectNote,
    })),
    notes: '',
    updatedAt: now,
  };
}

export function createSavedPcFromCharacterSheet(
  sheet: CharacterSheetState,
  lang: ModuleLanguage
): SavedPartyCharacter {
  const derived = calculateDerivedStats(sheet);
  const race = sheet.raceId ? getRaceDefinition(sheet.raceId) : null;
  const prof = sheet.professionId
    ? getProfessionDefinition(sheet.professionId)
    : null;
  const profLabel = [race?.name[lang], prof?.name[lang]]
    .filter(Boolean)
    .join(' · ');

  const gear = extractPcGearFromCharacterSheet(sheet, lang);
  const profileDetails = extractPcSheetProfileDetails(sheet, lang);
  const combinedNotes = [sheet.personalDescription?.trim(), gear.shieldSummaryNote]
    .filter(Boolean)
    .join('\n');

  return {
    id: generateId('hubpc'),
    name:
      sheet.characterName.trim() ||
      (lang === 'fr' ? 'Personnage Joueur' : 'Player Character'),
    playerName: sheet.playerName.trim(),
    professionLabel: profLabel,
    role: 'pc',
    anatomy: 'human',
    maxHp: derived.hp,
    maxEnd: derived.stamina,
    stats: {
      ref: sheet.stats.REF || 6,
      dex: sheet.stats.DEX || 6,
      cor: sheet.stats.COR || 6,
      vit: sheet.stats.VIT || 6,
      int: sheet.stats.INT || 6,
      vol: sheet.stats.VOL || 6,
      rec: derived.recovery,
      etou: derived.stun,
      vig: derived.vigor,
    },
    extraStats: profileDetails.extraStats,
    skills: profileDetails.skills,
    keySkills: profileDetails.keySkills,
    magic: profileDetails.magic,
    gear: profileDetails.gear,
    armor: gear.armor,
    weapons: gear.weapons,
    notes: combinedNotes,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Instantiates a live Combatant from a SavedPartyCharacter template.
 */
export function combatantFromSavedPc(pc: SavedPartyCharacter): Combatant {
  const initRoll = rollDie(10);
  const baseArmor = createDefaultArmor(0, pc.anatomy);
  const locations: readonly HitLocationId[] = [
    'head',
    'torso',
    'rightArm',
    'leftArm',
    'rightLeg',
    'leftLeg',
  ];
  for (const loc of locations) {
    const sp = Math.max(0, pc.armor[loc] ?? 0);
    baseArmor[loc] = { current: sp, max: sp };
  }

  return {
    id: generateId('pc'),
    hubPcId: pc.id,
    name: pc.name,
    role: pc.role,
    anatomy: pc.anatomy,
    sourceLabel: pc.playerName || pc.professionLabel || undefined,
    initiative: pc.stats.ref + initRoll,
    initiativeRoll: initRoll,
    tieBreaker: rollDie(10),
    quickDraw: false,
    delayed: false,
    actedThisRound: false,
    defensesUsedThisRound: 0,
    activeDodge: false,
    aimStacks: 0,
    hp: pc.maxHp,
    maxHp: pc.maxHp,
    end: pc.maxEnd,
    maxEnd: pc.maxEnd,
    nonLethalDmg: 0,
    adrenalineDice: 0,
    tempHp: 0,
    deathSaveFailures: 0,
    deathSaveRounds: 0,
    isDead: false,
    stats: { ...pc.stats },
    armor: baseArmor,
    resistantToNonSilver: false,
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    abilities: [],
    weapons: pc.weapons.map((w: CombatantWeapon) => ({
      ...w,
      id: generateId('wpn'),
    })),
    conditions: [],
    criticalWounds: [],
    notes: pc.notes,
  };
}

const TIER_OFFSETS: Record<
  NpcPowerTier,
  { primary: number; secondary: number; skill: number; armor: number }
> = {
  novice: { primary: 6, secondary: 5, skill: 4, armor: 4 },
  experienced: { primary: 7, secondary: 6, skill: 6, armor: 8 },
  veteran: { primary: 8, secondary: 7, skill: 8, armor: 12 },
  elite: { primary: 9, secondary: 8, skill: 10, armor: 16 },
};

/**
 * Generates an editable SavedCustomNpc template pre-filled from any of the 15
 * playable Witcher TRPG professions and a chosen power tier.
 */
export function createSavedNpcFromProfession(
  professionId: CharacterProfessionId | 'custom',
  tier: NpcPowerTier,
  lang: ModuleLanguage
): SavedCustomNpc {
  const now = new Date().toISOString();
  const scale = TIER_OFFSETS[tier];
  const prof =
    professionId === 'custom'
      ? null
      : PROFESSIONS_DATA.find((p) => p.id === professionId) ??
        getProfessionDefinition(professionId);

  const isWarrior =
    professionId === 'witcher' ||
    professionId === 'man-at-arms' ||
    professionId === 'nomad' ||
    professionId === 'outlaw' ||
    professionId === 'vampire';
  const isCaster =
    professionId === 'mage' ||
    professionId === 'priest' ||
    professionId === 'druid';
  const isAgile =
    professionId === 'criminal' ||
    professionId === 'bard' ||
    professionId === 'outlaw';

  const ref = isWarrior ? scale.primary : isAgile ? scale.primary : scale.secondary;
  const dex = isAgile || isWarrior ? scale.primary : scale.secondary;
  const cor = isWarrior ? scale.primary : isCaster ? scale.secondary - 1 : scale.secondary;
  const vit = isWarrior ? scale.primary : scale.secondary;
  const intStat = isCaster || professionId === 'doctor' ? scale.primary : scale.secondary;
  const vol = isCaster || professionId === 'witcher' || professionId === 'fanatic'
    ? scale.primary
    : scale.secondary;

  const avgCorVol = Math.floor((cor + vol) / 2);
  const maxHp = Math.max(15, avgCorVol * 5);
  const maxEnd = Math.max(15, avgCorVol * 5);
  const rec = Math.max(2, avgCorVol);
  const etou = Math.max(2, Math.min(10, avgCorVol));
  const vig = prof?.vigorThreshold ?? 0;

  const armorSp = isCaster ? Math.max(0, scale.armor - 4) : isWarrior ? scale.armor : Math.max(2, scale.armor - 2);
  const attackBase =
    (isCaster ? vol : isAgile && professionId === 'outlaw' ? dex : ref) +
    scale.skill +
    (isWarrior ? 1 : 0);
  const defenseBase = ref + scale.skill;

  const defaultWeapon: CombatantWeapon =
    professionId === 'witcher'
      ? {
          id: generateId('wpn'),
          name: lang === 'fr' ? 'Épée de sorceleur (argent)' : 'Witcher Silver Sword',
          damage: '4d6+2',
          damageType: 'slashing',
          isSilver: true,
          penetration: 'none',
          reliability: 15,
          maxReliability: 15,
          attacksPerRound: tier === 'novice' ? 1 : 2,
          effectNote: '',
        }
      : isCaster
        ? {
            id: generateId('wpn'),
            name: lang === 'fr' ? 'Sort offensif / Bâton' : 'Offensive Spell / Staff',
            damage: tier === 'elite' ? '5d6' : tier === 'veteran' ? '4d6' : '3d6',
            damageType: 'elemental',
            isSilver: false,
            penetration: 'none',
            reliability: 15,
            maxReliability: 15,
            attacksPerRound: 1,
            effectNote: professionId === 'mage' ? 'Incinération 35%' : '',
          }
        : professionId === 'man-at-arms' || professionId === 'nomad'
          ? {
              id: generateId('wpn'),
              name: lang === 'fr' ? 'Épée longue / Lance' : 'Longsword / Spear',
              damage: tier === 'elite' ? '5d6' : tier === 'veteran' ? '4d6+2' : '3d6+2',
              damageType: 'slashing',
              isSilver: false,
              penetration: tier === 'veteran' || tier === 'elite' ? 'normal' : 'none',
              reliability: 15,
              maxReliability: 15,
              attacksPerRound: tier === 'veteran' || tier === 'elite' ? 2 : 1,
              effectNote: '',
            }
          : professionId === 'outlaw'
            ? {
                id: generateId('wpn'),
                name: lang === 'fr' ? 'Arbalète / Épée courte' : 'Crossbow / Short Sword',
                damage: '3d6+2',
                damageType: 'piercing',
                isSilver: false,
                penetration: 'normal',
                reliability: 12,
                maxReliability: 12,
                attacksPerRound: 1,
                effectNote: '',
              }
            : {
                id: generateId('wpn'),
                name: lang === 'fr' ? 'Dague / Arme de poing' : 'Dagger / Sidearm',
                damage: isAgile ? '2d6+2' : '2d6',
                damageType: isAgile ? 'piercing' : 'slashing',
                isSilver: false,
                penetration: 'none',
                reliability: 12,
                maxReliability: 12,
                attacksPerRound: 1,
                effectNote: isAgile ? 'Saignement 25%' : '',
              };

  const profLabel = prof
    ? prof.name[lang]
    : lang === 'fr'
      ? 'PNJ personnalisé'
      : 'Custom NPC';

  return {
    id: generateId('npc'),
    name: profLabel,
    professionId,
    professionLabel: profLabel,
    powerTier: tier,
    role: 'enemy',
    anatomy: 'human',
    maxHp,
    maxEnd,
    stats: {
      ref,
      dex,
      cor,
      vit,
      int: intStat,
      vol,
      rec,
      etou,
      vig,
    },
    attackBase,
    defenseBase,
    armor: createDefaultSavedArmor(armorSp),
    weapons: [defaultWeapon],
    notes: '',
    updatedAt: now,
  };
}

export function createEmptyCustomMonster(lang: ModuleLanguage): SavedCustomMonster {
  return {
    id: generateId('mon'),
    name: lang === 'fr' ? 'Nouveau monstre' : 'New Monster',
    typeId: 'necrophage',
    threatLabel: lang === 'fr' ? 'Moyen · Complexe' : 'Medium · Complex',
    anatomy: 'monster',
    maxHp: 45,
    maxEnd: 40,
    armorSp: 6,
    stats: {
      ref: 7,
      dex: 7,
      cor: 8,
      vit: 7,
      int: 3,
      vol: 5,
      rec: 8,
      etou: 8,
      vig: 0,
    },
    attackBase: 14,
    defenseBase: 13,
    resistantToNonSilver: true,
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    abilities: [],
    weapons: [
      {
        id: generateId('wpn'),
        name: lang === 'fr' ? 'Griffes / Morsure' : 'Claws / Bite',
        damage: '3d6+2',
        damageType: 'slashing',
        isSilver: false,
        penetration: 'none',
        reliability: 15,
        maxReliability: 15,
        attacksPerRound: 2,
        effectNote: 'Saignement 30%',
      },
    ],
    notes: '',
    updatedAt: new Date().toISOString(),
  };
}

export function combatantFromCustomNpc(
  npc: SavedCustomNpc,
  options?: { customName?: string; fixedInitRoll?: number }
): Combatant {
  const initRoll = options?.fixedInitRoll ?? rollDie(10);
  const baseArmor = createDefaultArmor(0, npc.anatomy);
  const locations: readonly HitLocationId[] = [
    'head',
    'torso',
    'rightArm',
    'leftArm',
    'rightLeg',
    'leftLeg',
  ];
  for (const loc of locations) {
    const sp = Math.max(0, npc.armor[loc] ?? 0);
    baseArmor[loc] = { current: sp, max: sp };
  }

  return {
    id: generateId('npc'),
    name: options?.customName ?? npc.name,
    role: npc.role,
    anatomy: npc.anatomy,
    sourceLabel: npc.professionLabel || undefined,
    initiative: npc.stats.ref + initRoll,
    initiativeRoll: initRoll,
    tieBreaker: rollDie(10),
    quickDraw: false,
    delayed: false,
    actedThisRound: false,
    defensesUsedThisRound: 0,
    activeDodge: false,
    aimStacks: 0,
    hp: npc.maxHp,
    maxHp: npc.maxHp,
    end: npc.maxEnd,
    maxEnd: npc.maxEnd,
    nonLethalDmg: 0,
    adrenalineDice: 0,
    tempHp: 0,
    deathSaveFailures: 0,
    deathSaveRounds: 0,
    isDead: false,
    stats: { ...npc.stats },
    armor: baseArmor,
    resistantToNonSilver: false,
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    abilities: [],
    weapons: npc.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
    conditions: [],
    criticalWounds: [],
    notes: npc.notes,
  };
}

export function combatantFromCustomMonster(
  monster: SavedCustomMonster,
  options?: { customName?: string; fixedInitRoll?: number }
): Combatant {
  const initRoll = options?.fixedInitRoll ?? rollDie(10);
  return {
    id: generateId('mon'),
    name: options?.customName ?? monster.name,
    role: 'monster',
    anatomy: monster.anatomy,
    sourceLabel: monster.threatLabel || undefined,
    initiative: monster.stats.ref + initRoll,
    initiativeRoll: initRoll,
    tieBreaker: rollDie(10),
    quickDraw: false,
    delayed: false,
    actedThisRound: false,
    defensesUsedThisRound: 0,
    activeDodge: false,
    aimStacks: 0,
    hp: monster.maxHp,
    maxHp: monster.maxHp,
    end: monster.maxEnd,
    maxEnd: monster.maxEnd,
    nonLethalDmg: 0,
    adrenalineDice: 0,
    tempHp: 0,
    deathSaveFailures: 0,
    deathSaveRounds: 0,
    isDead: false,
    stats: { ...monster.stats },
    armor: createDefaultArmor(monster.armorSp, monster.anatomy),
    resistantToNonSilver: monster.resistantToNonSilver,
    vulnerabilities: [...monster.vulnerabilities],
    resistances: [...monster.resistances],
    immunities: [...monster.immunities],
    abilities: [...monster.abilities],
    weapons: monster.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
    conditions: [],
    criticalWounds: [],
    notes: monster.notes,
  };
}

/**
 * Resolves all members of a SavedCombatGroup into ready-to-play Combatants.
 */
export function resolveGroupToCombatants(
  group: SavedCombatGroup,
  savedCharacters: readonly SavedPartyCharacter[],
  lang: ModuleLanguage,
  extra?: {
    customNpcs?: readonly SavedCustomNpc[];
    customMonsters?: readonly SavedCustomMonster[];
  }
): Combatant[] {
  const pcById = new Map(savedCharacters.map((c) => [c.id, c]));
  const npcById = new Map((extra?.customNpcs ?? []).map((n) => [n.id, n]));
  const monsterById = new Map((extra?.customMonsters ?? []).map((m) => [m.id, m]));
  const result: Combatant[] = [];
  const sharedBestiaryRoll = group.groupInitiative ? rollDie(10) : undefined;

  for (const member of group.members) {
    if (member.kind === 'saved-pc') {
      const pc = pcById.get(member.pcId);
      if (pc) {
        result.push(combatantFromSavedPc(pc));
      }
      continue;
    }

    if (member.kind === 'custom-npc') {
      const npc = npcById.get(member.npcId);
      if (!npc) continue;
      const qty = Math.max(1, Math.min(12, member.quantity));
      for (let i = 0; i < qty; i += 1) {
        result.push(
          combatantFromCustomNpc(npc, {
            customName: qty > 1 ? `${npc.name} #${i + 1}` : npc.name,
            fixedInitRoll: npc.role === 'pc' ? undefined : sharedBestiaryRoll,
          })
        );
      }
      continue;
    }

    if (member.kind === 'custom-monster') {
      const mon = monsterById.get(member.monsterId);
      if (!mon) continue;
      const qty = Math.max(1, Math.min(12, member.quantity));
      for (let i = 0; i < qty; i += 1) {
        result.push(
          combatantFromCustomMonster(mon, {
            customName: qty > 1 ? `${mon.name} #${i + 1}` : mon.name,
            fixedInitRoll: sharedBestiaryRoll,
          })
        );
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

      const qty = Math.max(1, Math.min(12, member.quantity));
      const baseName =
        member.customLabel?.trim() ||
        (chosenVariant
          ? `${entry.name[lang]} (${chosenVariant.label[lang]})`
          : entry.name[lang]);

      for (let i = 0; i < qty; i += 1) {
        result.push(
          createCombatantFromBestiary(entry, {
            lang,
            variant: chosenVariant,
            roleOverride: member.roleOverride,
            customName: qty > 1 ? `${baseName} #${i + 1}` : baseName,
            fixedInitRoll: sharedBestiaryRoll,
          })
        );
      }
      continue;
    }

    if (member.kind === 'custom') {
      const qty = Math.max(1, Math.min(12, member.quantity));
      for (let i = 0; i < qty; i += 1) {
        const initRoll = sharedBestiaryRoll ?? rollDie(10);
        const role: CombatantRole = member.role;
        result.push({
          id: generateId('cmb'),
          name: qty > 1 ? `${member.name} #${i + 1}` : member.name,
          role,
          anatomy: member.anatomy,
          initiative: member.stats.ref + initRoll,
          initiativeRoll: initRoll,
          tieBreaker: rollDie(10),
          quickDraw: false,
          delayed: false,
          actedThisRound: false,
          defensesUsedThisRound: 0,
          activeDodge: false,
          aimStacks: 0,
          hp: member.maxHp,
          maxHp: member.maxHp,
          end: member.maxEnd,
          maxEnd: member.maxEnd,
          nonLethalDmg: 0,
          adrenalineDice: 0,
          tempHp: 0,
          deathSaveFailures: 0,
          deathSaveRounds: 0,
          isDead: false,
          stats: { ...member.stats },
          armor: createDefaultArmor(member.armorSp, member.anatomy),
          resistantToNonSilver: member.resistantToNonSilver,
          vulnerabilities: [],
          resistances: [],
          immunities: [],
          abilities: [],
          weapons: [],
          conditions: [],
          criticalWounds: [],
          notes: '',
        });
      }
    }
  }

  return result;
}

/**
 * Computes display summary for a SavedCombatGroup member entry.
 */
export function describeGroupMember(
  member: GroupMemberEntry,
  savedCharacters: readonly SavedPartyCharacter[],
  lang: ModuleLanguage,
  customNpcs: readonly SavedCustomNpc[] = [],
  customMonsters: readonly SavedCustomMonster[] = []
): { label: string; badge: string; missing: boolean } {
  if (member.kind === 'saved-pc') {
    const found = savedCharacters.find((c) => c.id === member.pcId);
    if (!found) {
      return {
        label: lang === 'fr' ? 'PJ supprimé' : 'Deleted PC',
        badge: '?',
        missing: true,
      };
    }
    return {
      label: found.name,
      badge: found.role === 'ally' ? (lang === 'fr' ? 'Allié' : 'Ally') : 'PJ',
      missing: false,
    };
  }

  if (member.kind === 'custom-npc') {
    const found = customNpcs.find((n) => n.id === member.npcId);
    if (!found) {
      return {
        label: lang === 'fr' ? 'PNJ supprimé' : 'Deleted NPC',
        badge: '?',
        missing: true,
      };
    }
    return {
      label: found.name,
      badge: `×${member.quantity}`,
      missing: false,
    };
  }

  if (member.kind === 'custom-monster') {
    const found = customMonsters.find((m) => m.id === member.monsterId);
    if (!found) {
      return {
        label: lang === 'fr' ? 'Monstre supprimé' : 'Deleted Monster',
        badge: '?',
        missing: true,
      };
    }
    return {
      label: found.name,
      badge: `×${member.quantity}`,
      missing: false,
    };
  }

  if (member.kind === 'bestiary') {
    const entry = getBestiaryEntryById(member.entryId);
    if (!entry) {
      return {
        label: lang === 'fr' ? 'Créature inconnue' : 'Unknown creature',
        badge: `×${member.quantity}`,
        missing: true,
      };
    }
    const variant =
      typeof member.variantIndex === 'number'
        ? entry.combat?.variants?.[member.variantIndex]
        : undefined;
    const baseName =
      member.customLabel?.trim() ||
      (variant ? `${entry.name[lang]} (${variant.label[lang]})` : entry.name[lang]);
    return {
      label: baseName,
      badge: `×${member.quantity}`,
      missing: false,
    };
  }

  return {
    label: member.name,
    badge: `×${member.quantity}`,
    missing: false,
  };
}
