import { SPELLS_BASE_DATA } from './spellsBaseData';
import { SPELLS_UNOFFICIAL_DATA } from './spellsUnofficialData';
import { VAMPIRE_POWERS_DATA } from './vampirePowersData';
import type { MagicEntry } from './types';

export * from './types';
export * from './magicRulesData';
export { SPELLS_BASE_DATA } from './spellsBaseData';
export { SPELLS_UNOFFICIAL_DATA } from './spellsUnofficialData';
export { VAMPIRE_POWERS_DATA } from './vampirePowersData';

/**
 * Combined magic compendium across Official, Unofficial/Fan-Made, and Higher Vampire powers (192 entries).
 */
export const ALL_MAGIC_ENTRIES: readonly MagicEntry[] = [
  ...SPELLS_BASE_DATA,
  ...SPELLS_UNOFFICIAL_DATA,
  ...VAMPIRE_POWERS_DATA,
];

/**
 * Subset of Novice, Journeyman, and Master grimoire-eligible spells stocked by Bookshops (167 entries).
 */
export const GRIMOIRE_ELIGIBLE_SPELLS: readonly MagicEntry[] =
  ALL_MAGIC_ENTRIES.filter((entry) => entry.grimoireEligible);

const MAGIC_BY_ID = new Map<string, MagicEntry>(
  ALL_MAGIC_ENTRIES.map((entry) => [entry.id, entry])
);

/**
 * Looks up a spell, invocation, ritual, hex, sign, or vampire power by unique ID.
 */
export function getMagicEntryById(id: string): MagicEntry | undefined {
  return MAGIC_BY_ID.get(id);
}
