import type { LocalizedText } from '../bestiary/types';

/**
 * Witcher TRPG item availability / rarity codes:
 * P = Everywhere (Partout), C = Common (Courant),
 * I = Uncommon / Poor (Indigent / Inhabituel), R = Rare.
 */
export type AvailabilityTier = 'P' | 'C' | 'I' | 'R';

/**
 * Crafting diagram skill tier.
 */
export type CraftTier = 'novice' | 'journeyman' | 'master' | 'grandmaster';

/**
 * Shop item classification shared with Urban Environment Generator.
 */
export type ItemShopKind =
  | 'tool'
  | 'general'
  | 'container'
  | 'clothing'
  | 'mountGear'
  | 'food'
  | 'service'
  | 'lodging'
  | 'weapon'
  | 'armor'
  | 'article'
  | 'potion'
  | 'decoction'
  | 'oil'
  | 'elixir'
  | 'formula'
  | 'component'
  | 'diagram'
  | 'relic'
  | 'bomb'
  | 'trap'
  | 'rune'
  | 'magicItem'
  | 'mutagen';

/**
 * General equipment, tools, containers, food, clothing, services, lodging & mount gear.
 */
export interface GearCatalogEntry {
  id: string;
  name: LocalizedText;
  category: string;
  shopKind:
    | 'tool'
    | 'general'
    | 'container'
    | 'clothing'
    | 'mountGear'
    | 'food'
    | 'service'
    | 'lodging';
  availability: AvailabilityTier;
  /** Numeric crown price, or null when variable / priceless. */
  price: number | null;
  priceDisplay: string;
  weight: string;
  size?: string;
  effect: string;
  race?: string;
  source?: string;
  /** True for urban-generator synthetic items (e.g. Fortress World Map, Tailor extra clothing). */
  urbanOnly?: 'fortress-map' | 'tailor-extra' | 'tailor-base';
}

/**
 * Weapon & utility tool entry from the Armes catalog.
 */
export interface WeaponCatalogEntry {
  id: string;
  name: LocalizedText;
  category: string;
  shopKind: 'weapon' | 'tool';
  damageType: string;
  accuracy: string;
  availability: AvailabilityTier;
  damage: string;
  reliability: string;
  hands: string;
  range: string;
  effect: string;
  concealment: string;
  enhancements: string;
  weight: string;
  price: number | null;
  priceDisplay: string;
  race?: string;
  source?: string;
}

/**
 * Armor & Shield catalog entry.
 */
export interface ArmorCatalogEntry {
  id: string;
  name: LocalizedText;
  category: 'Légères' | 'Intermediaire' | 'Lourdes';
  weightClass: 'light' | 'medium' | 'heavy';
  isShield: boolean;
  sp: string;
  availability: AvailabilityTier;
  enhancements: string;
  effect: string;
  ev: string;
  weight: string;
  price: number | null;
  priceDisplay: string;
  race?: string;
  source?: string;
}

/**
 * Alchemical item entry: Witcher Potions, Decoctions, Blade Oils, Articles, and ToC/Goetic Elixirs.
 */
export interface PotionCatalogEntry {
  id: string;
  name: LocalizedText;
  type: 'Potions' | 'Decoctions' | 'Huiles' | 'Articles' | 'Elixirs';
  availability: AvailabilityTier;
  effect: string;
  duration: string;
  toxicity: string;
  price: number | null;
  priceDisplay: string;
  race?: string;
  source?: string;
}

/**
 * Alchemy formula recipe entry.
 */
export interface FormulaCatalogEntry {
  id: string;
  name: LocalizedText;
  components: string;
  dc: string;
  time: string;
  level?: CraftTier;
  category?: 'Alchemy' | 'Witcher' | 'Bomb' | 'Elixir';
  price?: number;
}

/**
 * Crafting & alchemical component entry.
 */
export interface ComponentCatalogEntry {
  id: string;
  name: LocalizedText;
  rarity: AvailabilityTier;
  location: string;
  quantity: string;
  dc: string;
  weight: string;
  price: number;
  craftCost?: string;
  substance?: string;
}

/**
 * Crafting diagram blueprint entry.
 */
export interface DiagramCatalogEntry {
  id: string;
  name: LocalizedText;
  tier: CraftTier;
  /** Pool used by Urban Generator shops: A = Weapons/Armor/Upgrades, B = Staves, M = Materials, S = Special/ToC/Traps. */
  pool: 'A' | 'B' | 'M' | 'S';
  dc: string;
  time: string;
  components: string;
  investment: string;
  price: number;
}

/**
 * Core Relic weapon or armor entry.
 */
export interface RelicCatalogEntry {
  id: string;
  name: LocalizedText;
  relicType: 'weapon' | 'armor';
  subType: LocalizedText;
  educationDc: string;
  availability: AvailabilityTier;
  damageType?: string;
  accuracy?: string;
  damage?: string;
  reliability?: string;
  hands?: string;
  range?: string;
  concealment?: string;
  sp?: string;
  coverage?: LocalizedText;
  ev?: string;
  enhancements: string;
  weight: string;
  effect: string;
  source: string;
  price: null;
  priceDisplay: string;
}

/**
 * Experimental tech item: Bombs, Traps, and Experimental Ammunition.
 */
export interface ExperimentalTechEntry {
  id: string;
  name: LocalizedText;
  techType: 'bomb' | 'trap' | 'ammo';
  damageType: string;
  range: string;
  damage: string;
  effect: string;
  weight: string;
  availability: AvailabilityTier;
  price: number;
  priceDisplay: string;
  craftDc: string;
  craftTime: string;
  craftComponents: string;
  investment: string;
  source: string;
}

/**
 * Rune, Glyph, Runeword, or Glyphword enchantment entry.
 */
export interface RuneGlyphEntry {
  id: string;
  name: LocalizedText;
  kind: 'rune' | 'glyph' | 'runeword' | 'glyphword';
  target: LocalizedText;
  slots: string;
  effect: string;
  weight: string;
  availability: AvailabilityTier;
  price: number | null;
  priceDisplay: string;
  diagramTier?: CraftTier;
  diagramDc?: string;
  diagramComponents?: string;
  investment?: string;
  source: string;
}

/**
 * Magic Item catalog entry from A Tome of Chaos.
 */
export interface MagicItemCatalogEntry {
  id: string;
  name: LocalizedText;
  category: string;
  educationDc: string;
  availability: AvailabilityTier;
  weight: string;
  effect: string;
  price: number | null;
  priceDisplay: string;
  source: string;
}

/**
 * Magical Monster Trophy entry from A Tome of Chaos.
 */
export interface TrophyCatalogEntry {
  id: string;
  name: LocalizedText;
  monsterCategory: LocalizedText;
  effect: string;
  source: string;
}

/**
 * Witcher & Mage Mutation Mutagen entry (Core + Journal du Sorcelleur).
 */
export interface MutagenCatalogEntry {
  id: string;
  name: LocalizedText;
  color: 'red' | 'green' | 'blue';
  sourceMonster: LocalizedText;
  effect: string;
  alchemyDc: string;
  minorMutation: string;
  weight: string;
  source: string;
}
