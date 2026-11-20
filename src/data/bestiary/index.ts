import { ANIMALS_DATA } from './animalsData';
import { HUMANOIDS_DATA } from './humanoidsData';
import { MONSTERS_CORE_DATA } from './monstersCoreData';
import { MONSTERS_EXTENDED_DATA } from './monstersExtendedData';
import type { BestiaryEntry } from './types';

export * from './environments';
export * from './types';
export * from './bestiaryRulesData';
export { ANIMALS_DATA } from './animalsData';
export { HUMANOIDS_DATA } from './humanoidsData';
export { MONSTERS_CORE_DATA } from './monstersCoreData';
export { MONSTERS_EXTENDED_DATA } from './monstersExtendedData';

/**
 * Combined monster bestiary (143 entries: official core, extended, site, and fan-made).
 */
export const ALL_MONSTERS: readonly BestiaryEntry[] = [
  ...MONSTERS_CORE_DATA,
  ...MONSTERS_EXTENDED_DATA,
];

/**
 * Combined humanoid factions and adversaries (23 entries).
 */
export const ALL_HUMANOIDS: readonly BestiaryEntry[] = HUMANOIDS_DATA;

/**
 * Domestic & wild animals / mounts from the core bestiary (8 entries).
 */
export const ALL_ANIMALS: readonly BestiaryEntry[] = ANIMALS_DATA;

/**
 * Random encounter roller catalog (Monsters + Humanoids = 166 entries).
 */
export const ALL_ENCOUNTERS: readonly BestiaryEntry[] = [
  ...ALL_HUMANOIDS,
  ...ALL_MONSTERS,
];

/**
 * Complete unified bestiary compendium (Humanoids + Monsters + Animals = 174 entries).
 */
export const ALL_BESTIARY_ENTRIES: readonly BestiaryEntry[] = [
  ...ALL_HUMANOIDS,
  ...ALL_MONSTERS,
  ...ALL_ANIMALS,
];

const BESTIARY_BY_ID = new Map<string, BestiaryEntry>(
  ALL_BESTIARY_ENTRIES.map((entry) => [entry.id, entry])
);

/**
 * Retrieves a canonical bestiary record by its unique identifier.
 */
export function getBestiaryEntryById(id: string): BestiaryEntry | undefined {
  return BESTIARY_BY_ID.get(id);
}
