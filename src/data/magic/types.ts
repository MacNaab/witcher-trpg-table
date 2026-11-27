import type { LocalizedText } from '../bestiary/types';

/**
 * Magic publication origin.
 */
export type MagicSource = 'official' | 'fanMade' | 'vampire';

/**
 * Spell / Invocation / Sign difficulty tier.
 */
export type MagicTier = 'novice' | 'journeyman' | 'master' | 'archpriest' | 'hierophant' | 'sign';

/**
 * Normalized magical school or discipline identifier.
 */
export type MagicSchoolId =
  | 'mixed'
  | 'earth'
  | 'air'
  | 'fire'
  | 'water'
  | 'druid'
  | 'druid-hierophant'
  | 'priest'
  | 'archpriest'
  | 'ritual'
  | 'hex'
  | 'sign-basic'
  | 'sign-alt'
  | 'sign-advanced'
  | 'necromancy'
  | 'goetia'
  | 'vampire-spell';

/**
 * Explicit functional category when schoolId spans multiple types (e.g. Necromancy spells vs rituals).
 */
export type MagicCategory = 'spell' | 'ritual' | 'invocation' | 'hex' | 'sign';

/**
 * Unified canonical spell, invocation, ritual, hex, sign, or vampire power record.
 */
export interface MagicEntry {
  id: string;
  name: LocalizedText;
  schoolId: MagicSchoolId;
  school: LocalizedText;
  tier: MagicTier;
  source: MagicSource;
  /** True when the entry is a Novice/Journeyman/Master grimoire spell/ritual/hex/invocation stocked by Bookshops. */
  grimoireEligible: boolean;
  /** Optional explicit category override for hybrid schools like Necromancy. */
  category?: MagicCategory;
  stamina: string;
  range: string;
  duration: string;
  defense: string;
  effect: string;
  deity?: string;
  craftTime?: string;
  dc?: string;
  components?: string;
  danger?: string;
  prerequisites?: string;
  requirementToLift?: string;
}

/**
 * Magical Gift ("The Magical Mundane" — A Tome of Chaos) for eligible non-caster characters.
 */
export interface MagicalGiftEntry {
  id: string;
  name: LocalizedText;
  tier: 'minor' | 'major';
  stamina: string;
  dc: string;
  castTime: LocalizedText;
  effect: LocalizedText;
  sideEffect: LocalizedText;
}
