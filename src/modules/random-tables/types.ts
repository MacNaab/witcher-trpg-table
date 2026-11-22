/**
 * Domain types for the Random Tables, Random Chest, and Modular Random Encounter module.
 */

export type ModuleLanguage = 'en' | 'fr';

export interface LocalizedText {
  en: string;
  fr: string;
}

/**
 * Compact tuple [english, french] used in data files to guarantee 1:1 translation alignment.
 */
export type BilingualTuple = readonly [en: string, fr: string];

export interface WeightedBilingualItem {
  en: string;
  fr: string;
  weight: number;
}

export type TableCategoryGroup =
  | 'locations'
  | 'quests'
  | 'npcs'
  | 'encounters'
  | 'merchants';

export type RandomTableId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26;

export interface TableAttribution {
  author: string;
  url?: string;
}

export type TableRenderKind =
  | 'single'
  | 'titled'
  | 'structured'
  | 'possessions'
  | 'morphology'
  | 'external';

export interface RandomTableMeta {
  id: RandomTableId;
  group: TableCategoryGroup;
  title: LocalizedText;
  subtitle: LocalizedText;
  kind: TableRenderKind;
  attribution: TableAttribution;
}

export interface RollField {
  label: LocalizedText;
  value: LocalizedText;
  subFields?: RollField[];
}

export interface PossessionRollItem {
  ordinary: LocalizedText;
  strange: LocalizedText;
  occult: LocalizedText;
}

export interface TableRollResult {
  id: string;
  tableId: RandomTableId;
  tableTitle: LocalizedText;
  kind: TableRenderKind;
  attribution: TableAttribution;
  headline?: LocalizedText;
  body?: LocalizedText;
  fields?: RollField[];
  possessions?: {
    count: number;
    items: PossessionRollItem[];
  };
  externalUrl?: string;
  timestamp: number;
}

/* -------------------------------------------------------------------------- */
/* Random Chest Types                                                          */
/* -------------------------------------------------------------------------- */

export type ChestCategoryId =
  | 'gear'
  | 'weapon'
  | 'armor'
  | 'diagram'
  | 'formula'
  | 'alchemy'
  | 'glyph'
  | 'rune'
  | 'efWeapon'
  | 'efArmor'
  | 'relic';

export interface ChestDropRates {
  maxCrown: number;
  gear: number;
  weapon: number;
  armor: number;
  diagram: number;
  formula: number;
  alchemy: number;
  glyph: number;
  rune: number;
  efWeapon: number;
  efArmor: number;
  relicPerMille: number;
}

export interface ChestLootEntry {
  category: ChestCategoryId;
  name: LocalizedText;
  rollValue: number;
}

export interface ChestRollResult {
  id: string;
  crowns: number;
  maxCrown: number;
  items: ChestLootEntry[];
  timestamp: number;
}

/* -------------------------------------------------------------------------- */
/* Modular Random Encounter Types                                              */
/* -------------------------------------------------------------------------- */

export type EncounterDisposition = 'good' | 'neutral' | 'bad';

export interface ModularEncounterRates {
  good: number;
  neutral: number;
  bad: number;
}

export interface ModularEncounterResult {
  id: string;
  disposition: EncounterDisposition;
  category: LocalizedText;
  detail: LocalizedText;
  d100Roll: number;
  attribution?: TableAttribution;
  timestamp: number;
}
