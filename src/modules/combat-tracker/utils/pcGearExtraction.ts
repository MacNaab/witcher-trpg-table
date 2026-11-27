import { ARMOR_DATA, FORMULAE_DATA, RELICS_DATA, WEAPONS_DATA } from '@/src/data/items';
import type { ArmorCatalogEntry, RelicCatalogEntry, WeaponCatalogEntry } from '@/src/data/items/types';
import { getMagicEntryById, getMagicalGiftById } from '@/src/data/magic';
import { getProfessionDefinition } from '@/src/modules/character-generator/data/racesAndProfessions';
import { SKILLS_CATALOG } from '@/src/modules/character-generator/data/skillsCatalog';
import {
  PROFESSION_STARTER_KITS,
  getWitcherFormulaOptions,
} from '@/src/modules/character-generator/data/startingGearData';
import type {
  CharacterSheetState,
  StarterGearOption,
} from '@/src/modules/character-generator/types';
import {
  getEffectiveSkillRank,
  getMagicPoolsForState,
} from '@/src/modules/character-generator/utils/characterCalculations';
import type {
  CombatantWeapon,
  DamageType,
  HitLocationId,
  ModuleLanguage,
  PenetrationTier,
} from '../types';

const WEAPON_BY_ID = new Map<string, WeaponCatalogEntry>(
  WEAPONS_DATA.map((w) => [w.id, w])
);
const ARMOR_BY_ID = new Map<string, ArmorCatalogEntry>(
  ARMOR_DATA.map((a) => [a.id, a])
);

const WEAPON_BY_NAME = new Map<string, WeaponCatalogEntry>();
for (const w of WEAPONS_DATA) {
  WEAPON_BY_NAME.set(w.name.fr.trim().toLowerCase(), w);
  WEAPON_BY_NAME.set(w.name.en.trim().toLowerCase(), w);
}

const ARMOR_BY_NAME = new Map<string, ArmorCatalogEntry>();
for (const a of ARMOR_DATA) {
  ARMOR_BY_NAME.set(a.name.fr.trim().toLowerCase(), a);
  ARMOR_BY_NAME.set(a.name.en.trim().toLowerCase(), a);
}

const RELIC_BY_ID = new Map<string, RelicCatalogEntry>(
  RELICS_DATA.map((r) => [r.id, r])
);
const RELIC_BY_NAME = new Map<string, RelicCatalogEntry>();
for (const r of RELICS_DATA) {
  RELIC_BY_NAME.set(r.name.fr.trim().toLowerCase(), r);
  RELIC_BY_NAME.set(r.name.en.trim().toLowerCase(), r);
}

function generateWeaponId(): string {
  return `wpn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function parseDamageTypeFromCatalog(entry: WeaponCatalogEntry): DamageType {
  const lowerEffect = (entry.effect || '').toLowerCase();
  const lowerName = `${entry.name.fr} ${entry.name.en}`.toLowerCase();
  if (
    lowerEffect.includes('feu') ||
    lowerEffect.includes('fire') ||
    lowerName.includes('flamme')
  ) {
    return 'elemental';
  }
  const dt = (entry.damageType || '').toUpperCase().trim();
  if (dt === 'P') return 'piercing';
  if (dt === 'C' || dt.startsWith('C/')) return 'bludgeoning';
  return 'slashing';
}

function parsePenetrationFromCatalog(entry: WeaponCatalogEntry): PenetrationTier {
  const lowerEffect = (entry.effect || '').toLowerCase();
  if (
    lowerEffect.includes('perforation améliorée') ||
    lowerEffect.includes('improved armor piercing')
  ) {
    return 'improved';
  }
  if (
    lowerEffect.includes('perforation') ||
    lowerEffect.includes('armor piercing')
  ) {
    return 'normal';
  }
  return 'none';
}

function isCatalogWeaponSilver(entry: WeaponCatalogEntry): boolean {
  const lowerId = entry.id.toLowerCase();
  const lowerFr = entry.name.fr.toLowerCase();
  const lowerEn = entry.name.en.toLowerCase();
  return (
    lowerId.includes('silver') ||
    lowerFr.includes('argent') ||
    lowerEn.includes('silver')
  );
}

function normalizeDiceFormula(rawDamage: string | undefined): string {
  const cleaned = (rawDamage || '').trim().replace(/D/g, 'd');
  return cleaned || '2d6';
}

function weaponCatalogToCombatantWeapon(
  entry: WeaponCatalogEntry,
  lang: ModuleLanguage
): CombatantWeapon {
  const reliability = Math.max(
    1,
    Number.parseInt(entry.reliability, 10) || 10
  );
  const effectNote =
    entry.effect && entry.effect !== '-' && entry.effect.toLowerCase() !== 'aucun'
      ? entry.effect
      : '';

  return {
    id: generateWeaponId(),
    name: entry.name[lang],
    damage: normalizeDiceFormula(entry.damage),
    damageType: parseDamageTypeFromCatalog(entry),
    isSilver: isCatalogWeaponSilver(entry),
    penetration: parsePenetrationFromCatalog(entry),
    reliability,
    maxReliability: reliability,
    attacksPerRound: 1,
    effectNote,
  };
}

function applyArmorCatalogEntry(
  armor: Record<HitLocationId, number>,
  entry: ArmorCatalogEntry
): void {
  const sp = Math.max(0, Number.parseInt(entry.sp, 10) || 0);
  if (sp <= 0) return;

  const lowerId = entry.id.toLowerCase();
  const lowerEffect = (entry.effect || '').toLowerCase();

  const isHead =
    lowerId.includes('hood') ||
    lowerId.includes('helm') ||
    lowerId.includes('kettle') ||
    lowerId.includes('coif') ||
    lowerId.includes('armet');

  const isLegs =
    lowerId.includes('trousers') ||
    lowerId.includes('greaves') ||
    lowerId.includes('chausses');

  if (isHead) {
    armor.head = Math.max(armor.head, sp);
    return;
  }

  if (isLegs) {
    armor.rightLeg = Math.max(armor.rightLeg, sp);
    armor.leftLeg = Math.max(armor.leftLeg, sp);
    return;
  }

  // Torso / Full-suit armor covers torso + both arms (and legs when "Complet")
  armor.torso = Math.max(armor.torso, sp);
  armor.rightArm = Math.max(armor.rightArm, sp);
  armor.leftArm = Math.max(armor.leftArm, sp);

  if (
    lowerEffect.includes('complet') ||
    lowerEffect.includes('full armor')
  ) {
    armor.rightLeg = Math.max(armor.rightLeg, sp);
    armor.leftLeg = Math.max(armor.leftLeg, sp);
  }
}

export interface ExtractedPcGear {
  armor: Record<HitLocationId, number>;
  weapons: CombatantWeapon[];
  shields: Array<{ name: string; sp: number }>;
  shieldSummaryNote: string;
  hasEquippedWeapons: boolean;
}

/**
 * Extracts real weapons, localized armor SP, and carried shields from a
 * CharacterSheetState (profession free/selected starter kit + custom inventory).
 */
export function extractPcGearFromCharacterSheet(
  sheet: CharacterSheetState,
  lang: ModuleLanguage
): ExtractedPcGear {
  const armor: Record<HitLocationId, number> = {
    head: 0,
    torso: 0,
    rightArm: 0,
    leftArm: 0,
    rightLeg: 0,
    leftLeg: 0,
  };

  const primaryWeapons: CombatantWeapon[] = [];
  const toolWeapons: CombatantWeapon[] = [];
  const seenWeaponCatalogIds = new Set<string>();
  const shields: Array<{ name: string; sp: number }> = [];
  const seenShieldIds = new Set<string>();

  const processCatalogOrFallback = (params: {
    catalogId?: string;
    name: string;
    category: string;
    notes?: string;
  }) => {
    const normalizedName = params.name.trim().toLowerCase();
    const weaponEntry =
      (params.catalogId ? WEAPON_BY_ID.get(params.catalogId) : undefined) ??
      (params.category === 'weapon' ? WEAPON_BY_NAME.get(normalizedName) : undefined);

    if (weaponEntry) {
      if (weaponEntry.category === 'Munitions') return;
      if (seenWeaponCatalogIds.has(weaponEntry.id)) return;
      seenWeaponCatalogIds.add(weaponEntry.id);

      const converted = weaponCatalogToCombatantWeapon(weaponEntry, lang);
      if (weaponEntry.shopKind === 'tool') {
        toolWeapons.push(converted);
      } else {
        primaryWeapons.push(converted);
      }
      return;
    }

    const armorEntry =
      (params.catalogId ? ARMOR_BY_ID.get(params.catalogId) : undefined) ??
      (params.category === 'armor' || params.category === 'shield'
        ? ARMOR_BY_NAME.get(normalizedName)
        : undefined);

    if (armorEntry) {
      if (armorEntry.isShield) {
        if (!seenShieldIds.has(armorEntry.id)) {
          seenShieldIds.add(armorEntry.id);
          shields.push({
            name: armorEntry.name[lang],
            sp: Math.max(0, Number.parseInt(armorEntry.sp, 10) || 0),
          });
        }
      } else {
        applyArmorCatalogEntry(armor, armorEntry);
      }
      return;
    }

    const relicEntry =
      (params.catalogId ? RELIC_BY_ID.get(params.catalogId) : undefined) ??
      RELIC_BY_NAME.get(normalizedName);

    if (relicEntry) {
      if (relicEntry.relicType === 'weapon') {
        if (seenWeaponCatalogIds.has(relicEntry.id)) return;
        seenWeaponCatalogIds.add(relicEntry.id);

        const syntheticWeapon: WeaponCatalogEntry = {
          id: relicEntry.id,
          name: relicEntry.name,
          category: relicEntry.subType.fr,
          shopKind: 'weapon',
          damageType: relicEntry.damageType ?? 'P/T',
          accuracy: relicEntry.accuracy ?? '+0',
          availability: relicEntry.availability,
          damage: relicEntry.damage ?? '4d6',
          reliability: relicEntry.reliability ?? '15',
          hands: relicEntry.hands ?? '2',
          range: relicEntry.range ?? '–',
          effect: `${relicEntry.subType[lang]} · ${relicEntry.effect}`,
          concealment: relicEntry.concealment ?? '–',
          enhancements: relicEntry.enhancements,
          weight: relicEntry.weight,
          price: null,
          priceDisplay: relicEntry.priceDisplay,
        };
        const lowerSub = `${relicEntry.subType.fr} ${relicEntry.subType.en} ${relicEntry.effect}`.toLowerCase();
        const converted = weaponCatalogToCombatantWeapon(syntheticWeapon, lang);
        if (lowerSub.includes('argent') || lowerSub.includes('silver')) {
          converted.isSilver = true;
        }
        primaryWeapons.push(converted);
      } else {
        const sp = Math.max(0, Number.parseInt(relicEntry.sp ?? '0', 10) || 0);
        const cov = (relicEntry.coverage?.en ?? '').toLowerCase();
        if (sp > 0) {
          if (cov.includes('head')) armor.head = Math.max(armor.head, sp);
          if (cov.includes('torso')) armor.torso = Math.max(armor.torso, sp);
          if (cov.includes('arm')) {
            armor.rightArm = Math.max(armor.rightArm, sp);
            armor.leftArm = Math.max(armor.leftArm, sp);
          }
          if (cov.includes('leg')) {
            armor.rightLeg = Math.max(armor.rightLeg, sp);
            armor.leftLeg = Math.max(armor.leftLeg, sp);
          }
        }
      }
      return;
    }

    // Homebrew custom weapon without catalog link
    if (params.category === 'weapon' && params.name.trim()) {
      primaryWeapons.push({
        id: generateWeaponId(),
        name: params.name.trim(),
        damage: '3d6',
        damageType: 'slashing',
        isSilver: normalizedName.includes('argent') || normalizedName.includes('silver'),
        penetration: 'none',
        reliability: 12,
        maxReliability: 12,
        attacksPerRound: 1,
        effectNote: params.notes?.trim() ?? '',
      });
    }
  };

  // 1. Starter Kit (free items + selected items)
  if (sheet.professionId && PROFESSION_STARTER_KITS[sheet.professionId]) {
    const kit = PROFESSION_STARTER_KITS[sheet.professionId];
    const selectedSet = new Set(sheet.selectedStarterGearIds ?? []);
    const starterOptions: StarterGearOption[] = [
      ...kit.freeItems,
      ...kit.selectableItems.filter((item) => selectedSet.has(item.id)),
    ];
    for (const item of starterOptions) {
      processCatalogOrFallback({
        catalogId: item.catalogItemId,
        name: item.name[lang],
        category: item.category,
      });
    }
  }

  // 2. Custom / Compendium inventory items
  for (const item of sheet.customInventory ?? []) {
    if ((item.quantity ?? 1) <= 0) continue;
    processCatalogOrFallback({
      catalogId: item.catalogId,
      name: item.name,
      category: item.category,
      notes: item.notes,
    });
  }

  const combinedWeapons = [...primaryWeapons, ...toolWeapons];
  const hasEquippedWeapons = combinedWeapons.length > 0;

  if (!hasEquippedWeapons) {
    combinedWeapons.push({
      id: generateWeaponId(),
      name:
        lang === 'fr'
          ? 'Mains nues / Arme improvisée'
          : 'Unarmed / Improvised Weapon',
      damage: '1d6',
      damageType: 'bludgeoning',
      isSilver: false,
      penetration: 'none',
      reliability: 10,
      maxReliability: 10,
      attacksPerRound: 1,
      effectNote: '',
    });
  }

  const shieldSummaryNote =
    shields.length > 0
      ? `${lang === 'fr' ? 'Bouclier(s)' : 'Shield(s)'} : ${shields
          .map((s) => `${s.name} (${lang === 'fr' ? 'PA' : 'SP'} ${s.sp})`)
          .join(', ')}`
      : '';

  return {
    armor,
    weapons: combinedWeapons,
    shields,
    shieldSummaryNote,
    hasEquippedWeapons,
  };
}

export interface ExtractedPcSheetProfileDetails {
  extraStats: { emp: number; tec: number; cha: number };
  skills: Array<{ name: string; value: number }>;
  keySkills: Array<{ name: string; value: number }>;
  magic: string[];
  gear: string[];
}

/**
 * Extracts full character sheet details (EMP/TEC/CHA, trained skills, defining/key skills,
 * magic pool, and full gear list) from a `CharacterSheetState` for rulebook sheet rendering.
 */
export function extractPcSheetProfileDetails(
  sheet: CharacterSheetState,
  lang: ModuleLanguage
): ExtractedPcSheetProfileDetails {
  const extraStats = {
    emp: sheet.stats.EMP || 5,
    tec: sheet.stats.TEC || 5,
    cha: sheet.stats.CHA || 5,
  };

  const skills: Array<{ name: string; value: number }> = [];
  for (const def of SKILLS_CATALOG) {
    const rank = getEffectiveSkillRank(sheet, def.id);
    if (rank > 0) {
      skills.push({ name: def.name[lang], value: rank });
    }
  }
  skills.sort((a, b) => a.name.localeCompare(b.name, lang));

  const keySkills: Array<{ name: string; value: number }> = [];
  const prof = sheet.professionId
    ? getProfessionDefinition(sheet.professionId)
    : null;
  if (prof) {
    keySkills.push({
      name: prof.definingSkill[lang],
      value: sheet.definingSkillRank || 1,
    });
  }

  const magicSet = new Set<string>();
  const magic: string[] = [];
  const pushMagicId = (id: string) => {
    const entry = getMagicEntryById(id);
    const label = entry?.name[lang] ?? id;
    if (label && !magicSet.has(label)) {
      magicSet.add(label);
      magic.push(label);
    }
  };

  if (prof?.magicConfig?.autoBasicSigns) {
    for (const sign of getMagicPoolsForState(sheet).basicSigns) {
      if (!magicSet.has(sign.name[lang])) {
        magicSet.add(sign.name[lang]);
        magic.push(sign.name[lang]);
      }
    }
  }
  if (sheet.magicalGiftId) {
    const gift = getMagicalGiftById(sheet.magicalGiftId);
    if (gift) {
      const label = `${gift.name[lang]} (${lang === 'fr' ? 'Don' : 'Gift'})`;
      if (!magicSet.has(label)) {
        magicSet.add(label);
        magic.push(label);
      }
    }
  }
  for (const id of sheet.selectedSpells ?? []) pushMagicId(id);
  for (const id of sheet.selectedInvocations ?? []) pushMagicId(id);
  for (const id of sheet.selectedRituals ?? []) pushMagicId(id);
  for (const id of sheet.selectedHexes ?? []) pushMagicId(id);
  for (const id of sheet.selectedVampirePowers ?? []) pushMagicId(id);
  magic.sort((a, b) => a.localeCompare(b, lang));

  const gear: string[] = [];
  const seenGear = new Set<string>();
  const pushGear = (label: string) => {
    const clean = label.trim();
    if (clean && !seenGear.has(clean.toLowerCase())) {
      seenGear.add(clean.toLowerCase());
      gear.push(clean);
    }
  };

  if (sheet.professionId && PROFESSION_STARTER_KITS[sheet.professionId]) {
    const kit = PROFESSION_STARTER_KITS[sheet.professionId];
    const selectedSet = new Set(sheet.selectedStarterGearIds ?? []);
    for (const item of kit.freeItems) pushGear(item.name[lang]);
    for (const item of kit.selectableItems) {
      if (selectedSet.has(item.id)) pushGear(item.name[lang]);
    }
  }

  const formulaPool = getWitcherFormulaOptions();
  const findFormulaName = (id: string) => {
    if (!id) return '';
    const f =
      FORMULAE_DATA.find((x) => x.id === id) ??
      formulaPool.decoctions.find((x) => x.id === id) ??
      formulaPool.oils.find((x) => x.id === id) ??
      formulaPool.potions.find((x) => x.id === id);
    return f ? f.name[lang] : id;
  };
  if (sheet.witcherDecoctionFormulaId) {
    pushGear(findFormulaName(sheet.witcherDecoctionFormulaId));
  }
  for (const fId of sheet.witcherOilFormulaIds ?? []) {
    if (fId) pushGear(findFormulaName(fId));
  }
  for (const fId of sheet.witcherPotionFormulaIds ?? []) {
    if (fId) pushGear(findFormulaName(fId));
  }
  for (const item of sheet.customInventory ?? []) {
    if ((item.quantity ?? 1) <= 0) continue;
    const qtySuffix = item.quantity > 1 ? ` (×${item.quantity})` : '';
    pushGear(`${item.name}${qtySuffix}`);
  }

  return {
    extraStats,
    skills,
    keySkills,
    magic,
    gear,
  };
}
