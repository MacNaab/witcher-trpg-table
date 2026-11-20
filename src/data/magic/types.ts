import type { LocalizedText } from '../bestiary/types';

/**
 * Magic publication origin.
 */
export type MagicSource = 'official' | 'fanMade' | 'vampire';

/**
 * Spell / Invocation / Sign difficulty tier.
 */
export type MagicTier = 'novice' | 'journeyman' | 'master' | 'archpriest' | 'sign';

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
  | 'priest'
  | 'archpriest'
  | 'ritual'
  | 'hex'
  | 'sign-basic'
  | 'sign-alt'
  | 'vampire-spell';

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
}
