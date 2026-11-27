/**
 * Supported UI and content languages across the unified Witcher TRPG compendium.
 */
export type CompendiumLanguage = 'fr' | 'en';

/**
 * Localized string pair (French & English).
 */
export interface LocalizedText {
  fr: string;
  en: string;
}

/**
 * Localized array of clean GM note paragraphs.
 */
export interface LocalizedNotes {
  fr: string[];
  en: string[];
}

/**
 * High-level encounter roller category (Monsters vs. Humanoids).
 */
export type EncounterKind = 'monster' | 'humanoid';

/**
 * Full bestiary category including non-hostile/mount domestic animals.
 */
export type BestiaryKind = EncounterKind | 'animal';

/**
 * Canonical publication source tier for a bestiary entry.
 */
export type BestiarySourceTier = 'official' | 'extended' | 'unofficial' | 'site';

/**
 * Normalized Witcher TRPG creature & faction taxonomy identifiers.
 */
export type CreatureTypeId =
  | 'humanoid'
  | 'necrophage'
  | 'specter'
  | 'beast'
  | 'cursed'
  | 'hybrid'
  | 'insectoid'
  | 'elemental'
  | 'relict'
  | 'ogroid'
  | 'draconid'
  | 'vampire';

/**
 * All 17 normalized habitats & regions for Monster encounters.
 */
export type MonsterEnvId =
  | 'everywhere'
  | 'battlefields'
  | 'graveyards'
  | 'ruins'
  | 'caves'
  | 'marine'
  | 'sewers'
  | 'mountains'
  | 'forests'
  | 'plains'
  | 'deserts'
  | 'swamps'
  | 'summoning'
  | 'urban'
  | 'valleys'
  | 'skellige'
  | 'nilfgaard';

/**
 * All 9 normalized habitats & regions for Humanoid encounters.
 */
export type HumanoidEnvId =
  | 'everywhere'
  | 'roads'
  | 'urban'
  | 'forests'
  | 'marine'
  | 'mahakam'
  | 'mountains'
  | 'ruins'
  | 'skellige';

/**
 * Combined canonical environment identifier (19 environments total).
 */
export type EncounterEnvId = MonsterEnvId | HumanoidEnvId;

/**
 * Sanitized natural or equipped attack profile for a bestiary entry.
 */
export interface BestiaryWeapon {
  name: string;
  damage: string;
  effect: string;
  attacksPerTurn: string;
}

/**
 * Caste/variant stat block (e.g. Endrega Worker / Drone / Warrior / Queen).
 */
export interface BestiaryCombatVariant {
  label: LocalizedText;
  stats: Record<string, string>;
  skills: Record<string, string>;
  weapons: readonly BestiaryWeapon[];
  loot: readonly string[];
  vulnerabilities: readonly string[];
  abilities: readonly string[];
}

/**
 * Full Witcher TRPG combat statistics block merged from the canonical bestiary data.
 */
export interface BestiaryCombatBlock {
  stats: Record<string, string>;
  skills: Record<string, string>;
  weapons: readonly BestiaryWeapon[];
  loot: readonly string[];
  vulnerabilities: readonly string[];
  abilities: readonly string[];
  variants?: readonly BestiaryCombatVariant[];
  keySkills?: Record<string, string>;
  favoredMagic?: readonly string[];
}

/**
 * Unified canonical bestiary record used by Encounter Manager, Combat Tracker,
 * Combat Simulator, and GM reference views.
 */
export interface BestiaryEntry {
  id: string;
  kind: BestiaryKind;
  typeId: CreatureTypeId;
  source: BestiarySourceTier;
  isFanMade: boolean;
  isUniqueNpc?: boolean;
  name: LocalizedText;
  threat: LocalizedText;
  reward: LocalizedText;
  armor: LocalizedText;
  size: LocalizedText;
  weight: LocalizedText;
  environments: readonly EncounterEnvId[];
  intelligence: LocalizedText;
  organization: LocalizedText;
  notes: LocalizedNotes;
  baseStats?: Record<string, string | number>;
  combat?: BestiaryCombatBlock;
}
