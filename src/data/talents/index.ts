import { CORE_PROFESSIONS_TALENTS } from './coreProfessionsTalents';
import { EXTENDED_PROFESSIONS_TALENTS } from './extendedProfessionsTalents';
import type { ProfessionId, TalentEntry } from './types';

export * from './types';
export * from './professionReferenceData';
export { CORE_PROFESSIONS_TALENTS } from './coreProfessionsTalents';
export { EXTENDED_PROFESSIONS_TALENTS } from './extendedProfessionsTalents';

/**
 * Complete unified skill-tree talents compendium across all 14 professions (126 entries).
 */
export const ALL_TALENTS: readonly TalentEntry[] = [
  ...CORE_PROFESSIONS_TALENTS,
  ...EXTENDED_PROFESSIONS_TALENTS,
];

/**
 * Returns all talents belonging to a specific profession.
 */
export function getTalentsByProfession(
  professionId: ProfessionId
): readonly TalentEntry[] {
  return ALL_TALENTS.filter((talent) => talent.professionId === professionId);
}
