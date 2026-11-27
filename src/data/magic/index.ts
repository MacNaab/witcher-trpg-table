import { SPELLS_BASE_DATA } from './spellsBaseData';
import { SPELLS_CHAOS_MAGES_DATA } from './spellsChaosMagesData';
import { SPELLS_CHAOS_DIVINE_DATA } from './spellsChaosDivineData';
import { SPELLS_CHAOS_RITUALS_HEXES_SIGNS_DATA } from './spellsChaosRitualsHexesSignsData';
import { SPELLS_DARK_ARTS_GOETIA_DATA } from './spellsDarkArtsGoetiaData';
import { SPELLS_UNOFFICIAL_DATA } from './spellsUnofficialData';
import { MAGICAL_GIFTS_DATA } from './magicalGiftsData';
import { VAMPIRE_POWERS_DATA } from './vampirePowersData';
import type { MagicEntry, MagicalGiftEntry } from './types';

export * from './types';
export * from './magicRulesData';
export * from './chaosMagicRulesData';
export * from './magicalGiftsData';
export { SPELLS_BASE_DATA } from './spellsBaseData';
export { SPELLS_CHAOS_MAGES_DATA } from './spellsChaosMagesData';
export { SPELLS_CHAOS_DIVINE_DATA } from './spellsChaosDivineData';
export { SPELLS_CHAOS_RITUALS_HEXES_SIGNS_DATA } from './spellsChaosRitualsHexesSignsData';
export { SPELLS_DARK_ARTS_GOETIA_DATA } from './spellsDarkArtsGoetiaData';
export { SPELLS_UNOFFICIAL_DATA } from './spellsUnofficialData';
export { VAMPIRE_POWERS_DATA } from './vampirePowersData';

/**
 * Combined magic compendium across Official Core, A Tome of Chaos, A Book of Tales, Unofficial/Fan-Made, and Higher Vampire powers.
 */
export const ALL_MAGIC_ENTRIES: readonly MagicEntry[] = [
  ...SPELLS_BASE_DATA,
  ...SPELLS_CHAOS_MAGES_DATA,
  ...SPELLS_CHAOS_DIVINE_DATA,
  ...SPELLS_CHAOS_RITUALS_HEXES_SIGNS_DATA,
  ...SPELLS_DARK_ARTS_GOETIA_DATA,
  ...SPELLS_UNOFFICIAL_DATA,
  ...VAMPIRE_POWERS_DATA,
];

/**
 * Subset of Novice, Journeyman, and Master grimoire-eligible spells stocked by Bookshops.
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

const MAGICAL_GIFT_BY_ID = new Map<string, MagicalGiftEntry>(
  MAGICAL_GIFTS_DATA.map((gift) => [gift.id, gift])
);

/**
 * Looks up a Magical Gift ("The Magical Mundane") by unique ID.
 */
export function getMagicalGiftById(id: string): MagicalGiftEntry | undefined {
  return MAGICAL_GIFT_BY_ID.get(id);
}
