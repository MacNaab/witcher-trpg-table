import { ANIMALS_DATA } from './animalsData';
import { FAMOUS_MAGES_DATA } from './famousMagesData';
import { HABITANTS_CONTINENT_DATA } from './habitantsContinentData';
import { HUMANOIDS_DATA } from './humanoidsData';
import { MONSTERS_BOOK_OF_TALES_DATA } from './monstersBookOfTalesData';
import { MONSTERS_CORE_DATA } from './monstersCoreData';
import { MONSTERS_EXTENDED_DATA } from './monstersExtendedData';
import { MONSTERS_TOME_OF_CHAOS_DATA } from './monstersTomeOfChaosData';
import { NAMED_NPCS_BOOK_OF_TALES_DATA } from './namedNpcsData';
import type { BestiaryEntry } from './types';

export * from './environments';
export * from './types';
export * from './bestiaryRulesData';
export { ANIMALS_DATA } from './animalsData';
export { FAMOUS_MAGES_DATA } from './famousMagesData';
export { HABITANTS_CONTINENT_DATA } from './habitantsContinentData';
export { HUMANOIDS_DATA } from './humanoidsData';
export { MONSTERS_BOOK_OF_TALES_DATA } from './monstersBookOfTalesData';
export { MONSTERS_CORE_DATA } from './monstersCoreData';
export { MONSTERS_EXTENDED_DATA } from './monstersExtendedData';
export { MONSTERS_TOME_OF_CHAOS_DATA } from './monstersTomeOfChaosData';
export { NAMED_NPCS_BOOK_OF_TALES_DATA } from './namedNpcsData';

/**
 * Combined monster bestiary (official core, extended, Tome of Chaos, Book of Tales, and fan-made).
 */
export const ALL_MONSTERS: readonly BestiaryEntry[] = [
  ...MONSTERS_CORE_DATA,
  ...MONSTERS_EXTENDED_DATA,
  ...MONSTERS_TOME_OF_CHAOS_DATA,
  ...MONSTERS_BOOK_OF_TALES_DATA,
];

/**
 * Combined humanoid factions, Continent archetypes, named NPCs, and Famous Mages.
 */
export const ALL_HUMANOIDS: readonly BestiaryEntry[] = [
  ...HUMANOIDS_DATA,
  ...HABITANTS_CONTINENT_DATA,
  ...NAMED_NPCS_BOOK_OF_TALES_DATA,
  ...FAMOUS_MAGES_DATA,
];

/**
 * Domestic & wild animals / mounts from the core bestiary.
 */
export const ALL_ANIMALS: readonly BestiaryEntry[] = ANIMALS_DATA;

/**
 * Random encounter roller catalog (Monsters + Humanoids).
 */
export const ALL_ENCOUNTERS: readonly BestiaryEntry[] = [
  ...ALL_HUMANOIDS,
  ...ALL_MONSTERS,
];

/**
 * Complete unified bestiary compendium (Humanoids + Monsters + Animals).
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
