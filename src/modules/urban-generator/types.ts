/**
 * Domain types for The Witcher TRPG Urban Environment Generator.
 */

export type ModuleLanguage = 'en' | 'fr';

/**
 * Legacy numeric environment IDs preserved for parity:
 * 0 = Capital, 1 = City, 2 = Village, 3 = Fortress.
 */
export type EnvironmentId = 0 | 1 | 2 | 3;

/**
 * Canonical building identifiers matching the continent settlement rules.
 */
export type BuildingTypeId =
  | 'Alchemist'
  | 'Armorer_standard'
  | 'Armorer_village'
  | 'General_shop'
  | 'Bookshop'
  | 'Inn_straw_bedding'
  | 'Inn_stables'
  | 'Inn_high_class'
  | 'Inn_standard_quality'
  | 'Inn_medium_quality'
  | 'Inn_cheap_quality'
  | 'Inn_infamous_quality'
  | 'Haberdashery'
  | 'Tailoring'
  | 'Notice_board';

/**
 * Witcher TRPG item availability codes:
 * P = Everywhere (Partout), C = Common (Courant),
 * I = Poor / Uncommon (Indigent / Rare selon contexte, 'I' = Pauvre/Inhabituel),
 * R = Rare.
 */
export type AvailabilityTier = 'P' | 'C' | 'I' | 'R';

/**
 * Crafting diagram / spell tier.
 */
export type CraftTier = 'novice' | 'journeyman' | 'master' | 'grandmaster';

/**
 * Semantic category of a generated stock item, used for icons and bilingual badges.
 */
export type ShopItemKind =
  | 'article'
  | 'formula'
  | 'component'
  | 'weapon'
  | 'armor'
  | 'diagram'
  | 'tool'
  | 'general'
  | 'container'
  | 'clothing'
  | 'mountGear'
  | 'spellbook'
  | 'book'
  | 'food'
  | 'lodging'
  | 'contract';

export interface BilingualLabel {
  en: string;
  fr: string;
}

export interface ShopCatalogItem {
  id: string;
  name: BilingualLabel;
  kind: ShopItemKind;
  availability: AvailabilityTier;
  /** Crown cost; null when no fixed core price exists (e.g., Witcher gear or formulas). */
  price: number | null;
}

export interface FormulaCatalogItem {
  id: string;
  name: BilingualLabel;
}

export interface ComponentCatalogItem {
  id: string;
  name: BilingualLabel;
  rarity: AvailabilityTier;
  price: number;
}

export interface DiagramCatalogItem {
  id: string;
  name: BilingualLabel;
  tier: CraftTier;
  price: number;
  pool: 'A' | 'B' | 'M';
}

export interface GrimoireSpellItem {
  id: string;
  name: BilingualLabel;
  tier: Exclude<CraftTier, 'grandmaster'>;
  school: BilingualLabel;
  source: 'official' | 'fanMade';
}

export interface EnvironmentDefinition {
  id: EnvironmentId;
  key: 'capital' | 'city' | 'village' | 'fortress';
  name: BilingualLabel;
  allowedBuildings: readonly BuildingTypeId[];
  availabilities: readonly AvailabilityTier[];
  craftTiers: readonly CraftTier[];
}

export interface BuildingBounds {
  min: number;
  max: number;
}

export interface GeneratedShopItem {
  id: string;
  name: BilingualLabel;
  kind: ShopItemKind;
  /** Resolved crown cost, or null if GM-determined / priceless. */
  price: number | null;
  /** Optional subtitle (e.g. spell school or official/fan-made tag). */
  meta?: BilingualLabel;
  isFanMade?: boolean;
  isStandard?: boolean;
}

export interface GeneratedBuilding {
  /** Optional unique instance identifier for multiple buildings of the same type. */
  id?: string;
  buildingType: BuildingTypeId;
  title: BilingualLabel;
  /** Random tavern name when the building is an Inn. */
  tavernName?: BilingualLabel;
  /** Optional nightly lodging note (e.g. Inn room rate + straw bedding). */
  lodgingNote?: BilingualLabel;
  /** Optional lodging rate in crowns per night. */
  roomPrice?: number;
  /** Generated inventory, menu items, or contract. */
  items: GeneratedShopItem[];
}

export interface GeneratedEnvironment {
  settlementName: string;
  environmentId: EnvironmentId;
  environmentName: BilingualLabel;
  includeFanMade: boolean;
  buildings: GeneratedBuilding[];
  generatedAtIso: string;
}

export interface GeneratedSingleBuilding {
  buildingType: BuildingTypeId;
  requestedCount: number;
  includeFanMade: boolean;
  building: GeneratedBuilding;
  generatedAtIso: string;
}

export interface SavedUrbanEnvironment {
  id: string;
  updatedAt: string;
  data: GeneratedEnvironment;
}

export interface SavedUrbanBuilding {
  id: string;
  updatedAt: string;
  data: GeneratedSingleBuilding;
}

export interface UrbanHistoryState {
  environments: SavedUrbanEnvironment[];
  buildings: SavedUrbanBuilding[];
}
