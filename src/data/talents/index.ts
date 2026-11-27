import { CORE_PROFESSIONS_TALENTS } from './coreProfessionsTalents';
import { DRUID_PROFESSION_TALENTS } from './druidProfessionTalents';
import { EXTENDED_PROFESSIONS_TALENTS } from './extendedProfessionsTalents';
import type { ProfessionId, TalentEntry } from './types';

export * from './types';
export * from './professionReferenceData';
export { CORE_PROFESSIONS_TALENTS } from './coreProfessionsTalents';
export { DRUID_PROFESSION_TALENTS } from './druidProfessionTalents';
export { EXTENDED_PROFESSIONS_TALENTS } from './extendedProfessionsTalents';

/**
 * Complete unified skill-tree talents compendium across all 15 professions (135 entries).
 */
export const ALL_TALENTS: readonly TalentEntry[] = [
  ...CORE_PROFESSIONS_TALENTS,
  ...DRUID_PROFESSION_TALENTS,
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
