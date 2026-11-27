import { FORMULAE_DATA, SUBSTANCES_DATA } from './alchemyData';
import {
  INGREDIENT_DIAGRAMS_DATA,
  WEAPON_DIAGRAMS_DATA,
} from './diagramsPart1Data';
import {
  ARMOR_DIAGRAMS_DATA,
  ELDERFOLK_DIAGRAMS_DATA,
} from './diagramsPart2Data';
import { SPECIAL_DIAGRAMS_DATA } from './diagramsSupplementData';
import {
  ALCHEMICAL_TREATMENTS_DATA,
  ANIMAL_PARTS_DATA,
  CRAFTING_MATERIALS_DATA,
  MINERALS_DATA,
} from './materialsData';
import type {
  CraftLevelId,
  ElderfolkKindId,
  LexiconEntry,
  LexiconTabId,
  LexiconTabMeta,
  RarityCode,
  SubstanceId,
} from '../types';

export { FORMULAE_DATA, SUBSTANCES_DATA } from './alchemyData';
export {
  INGREDIENT_DIAGRAMS_DATA,
  WEAPON_DIAGRAMS_DATA,
} from './diagramsPart1Data';
export {
  ARMOR_DIAGRAMS_DATA,
  ELDERFOLK_DIAGRAMS_DATA,
} from './diagramsPart2Data';
export { SPECIAL_DIAGRAMS_DATA } from './diagramsSupplementData';
export {
  ALCHEMICAL_TREATMENTS_DATA,
  ANIMAL_PARTS_DATA,
  CRAFTING_MATERIALS_DATA,
  MINERALS_DATA,
} from './materialsData';

/**
 * Ordered metadata for all 11 EN–FR comparative tables.
 */
export const LEXICON_TABS: readonly LexiconTabMeta[] = [
  {
    id: 'crafting-materials',
    group: 'materials',
    rowKind: 'material',
    count: CRAFTING_MATERIALS_DATA.length,
  },
  {
    id: 'animal-parts',
    group: 'materials',
    rowKind: 'material',
    count: ANIMAL_PARTS_DATA.length,
  },
  {
    id: 'minerals',
    group: 'materials',
    rowKind: 'material',
    count: MINERALS_DATA.length,
  },
  {
    id: 'alchemical-treatments',
    group: 'materials',
    rowKind: 'material',
    count: ALCHEMICAL_TREATMENTS_DATA.length,
  },
  {
    id: 'ingredient-diagrams',
    group: 'diagrams',
    rowKind: 'diagram',
    count: INGREDIENT_DIAGRAMS_DATA.length,
  },
  {
    id: 'weapon-diagrams',
    group: 'diagrams',
    rowKind: 'diagram',
    count: WEAPON_DIAGRAMS_DATA.length,
  },
  {
    id: 'armor-diagrams',
    group: 'diagrams',
    rowKind: 'diagram',
    count: ARMOR_DIAGRAMS_DATA.length,
  },
  {
    id: 'elderfolk-diagrams',
    group: 'diagrams',
    rowKind: 'diagram',
    count: ELDERFOLK_DIAGRAMS_DATA.length,
  },
  {
    id: 'special-diagrams',
    group: 'diagrams',
    rowKind: 'diagram',
    count: SPECIAL_DIAGRAMS_DATA.length,
  },
  {
    id: 'substances',
    group: 'alchemy',
    rowKind: 'material',
    count: SUBSTANCES_DATA.length,
  },
  {
    id: 'formulae',
    group: 'alchemy',
    rowKind: 'formula',
    count: FORMULAE_DATA.length,
  },
] as const;

/**
 * Lookup map from tab ID to its typed dataset.
 */
export const LEXICON_TAB_DATA: Record<LexiconTabId, readonly LexiconEntry[]> = {
  'crafting-materials': CRAFTING_MATERIALS_DATA,
  'animal-parts': ANIMAL_PARTS_DATA,
  minerals: MINERALS_DATA,
  'alchemical-treatments': ALCHEMICAL_TREATMENTS_DATA,
  'ingredient-diagrams': INGREDIENT_DIAGRAMS_DATA,
  'weapon-diagrams': WEAPON_DIAGRAMS_DATA,
  'armor-diagrams': ARMOR_DIAGRAMS_DATA,
  'elderfolk-diagrams': ELDERFOLK_DIAGRAMS_DATA,
  'special-diagrams': SPECIAL_DIAGRAMS_DATA,
  substances: SUBSTANCES_DATA,
  formulae: FORMULAE_DATA,
};

/**
 * Combined catalog of all entries across all 11 tables for global cross-table search.
 */
export const ALL_LEXICON_ENTRIES: readonly LexiconEntry[] = [
  ...CRAFTING_MATERIALS_DATA,
  ...ANIMAL_PARTS_DATA,
  ...MINERALS_DATA,
  ...ALCHEMICAL_TREATMENTS_DATA,
  ...INGREDIENT_DIAGRAMS_DATA,
  ...WEAPON_DIAGRAMS_DATA,
  ...ARMOR_DIAGRAMS_DATA,
  ...ELDERFOLK_DIAGRAMS_DATA,
  ...SPECIAL_DIAGRAMS_DATA,
  ...SUBSTANCES_DATA,
  ...FORMULAE_DATA,
];

export const CRAFT_LEVEL_ORDER: readonly CraftLevelId[] = [
  'novice',
  'journeyman',
  'master',
  'grand-master',
] as const;

export const RARITY_ORDER: readonly RarityCode[] = ['E', 'C', 'P', 'R'] as const;

export const SUBSTANCE_ORDER: readonly SubstanceId[] = [
  'aether',
  'caelum',
  'fulgur',
  'hydragenum',
  'quebrith',
  'rebis',
  'sol',
  'vermilion',
  'vitriol',
] as const;

export const ELDERFOLK_KIND_ORDER: readonly ElderfolkKindId[] = [
  'weapon',
  'armor',
  'armor-enhancement',
] as const;

export function getLexiconTabMeta(tabId: LexiconTabId): LexiconTabMeta {
  const found = LEXICON_TABS.find((t) => t.id === tabId);
  if (!found) {
    throw new Error(`Unknown lexicon tab id: ${tabId}`);
  }
  return found;
}
