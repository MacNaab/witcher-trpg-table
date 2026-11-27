/**
 * Supported UI languages for the EN–FR Comparative Tables module.
 */
export type ModuleLanguage = 'fr' | 'en';

/**
 * Bilingual string pair preserved side-by-side in comparative tables.
 */
export interface BilingualText {
  en: string;
  fr: string;
}

/**
 * Canonical identifiers for the 10 legacy reference tables.
 */
export type LexiconTabId =
  | 'crafting-materials'
  | 'animal-parts'
  | 'minerals'
  | 'alchemical-treatments'
  | 'ingredient-diagrams'
  | 'weapon-diagrams'
  | 'armor-diagrams'
  | 'elderfolk-diagrams'
  | 'special-diagrams'
  | 'substances'
  | 'formulae';

/**
 * High-level grouping of the 11 reference tables.
 */
export type LexiconGroupId = 'materials' | 'diagrams' | 'alchemy';

/**
 * Witcher TRPG crafting & alchemy skill tiers.
 */
export type CraftLevelId = 'novice' | 'journeyman' | 'master' | 'grand-master';

/**
 * Elderfolk equipment subtype preserved from the legacy Diagrams4 table.
 */
export type ElderfolkKindId = 'weapon' | 'armor' | 'armor-enhancement';

/**
 * Witcher TRPG availability / rarity codes.
 */
export type RarityCode = 'E' | 'C' | 'P' | 'R' | 'none';

/**
 * Alchemical substance categories (9 canonical Witcher substances).
 */
export type SubstanceId =
  | 'aether'
  | 'caelum'
  | 'fulgur'
  | 'hydragenum'
  | 'quebrith'
  | 'rebis'
  | 'sol'
  | 'vermilion'
  | 'vitriol';

/**
 * Material, Hide, Mineral, Alchemical Treatment, or Alchemical Substance entry.
 */
export interface MaterialLexiconEntry {
  id: string;
  tabId:
    | 'crafting-materials'
    | 'animal-parts'
    | 'minerals'
    | 'alchemical-treatments'
    | 'substances';
  rowKind: 'material';
  name: BilingualText;
  substance?: SubstanceId;
  rarity: RarityCode;
  location: BilingualText;
  quantity: BilingualText;
  forageDc: string;
  weight: string;
  cost: string;
}

/**
 * Crafting Diagram entry (Ingredient, Weapon, Armor, Elderfolk, or Special).
 */
export interface DiagramLexiconEntry {
  id: string;
  tabId:
    | 'ingredient-diagrams'
    | 'weapon-diagrams'
    | 'armor-diagrams'
    | 'elderfolk-diagrams'
    | 'special-diagrams';
  rowKind: 'diagram';
  name: BilingualText;
  level: CraftLevelId;
  elderfolkKind?: ElderfolkKindId;
  dc: string;
  time: BilingualText;
  components: BilingualText;
  investment: string;
  cost: string;
}

/**
 * Alchemical Formula entry.
 */
export interface FormulaLexiconEntry {
  id: string;
  tabId: 'formulae';
  rowKind: 'formula';
  name: BilingualText;
  level: CraftLevelId;
  dc: string;
  time: BilingualText;
  components: string;
  cost: string;
}

export type LexiconEntry =
  | MaterialLexiconEntry
  | DiagramLexiconEntry
  | FormulaLexiconEntry;

export type SortField =
  | 'default'
  | 'nameEn'
  | 'nameFr'
  | 'dc'
  | 'cost'
  | 'investment'
  | 'weight';

export type SortDirection = 'asc' | 'desc';

export interface LexiconTabMeta {
  id: LexiconTabId;
  group: LexiconGroupId;
  rowKind: 'material' | 'diagram' | 'formula';
  count: number;
}
