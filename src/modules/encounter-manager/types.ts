import type {
  BestiaryEntry,
  CompendiumLanguage,
} from '@/src/data/bestiary/types';

export type ModuleLanguage = CompendiumLanguage;
export type EncounterEntry = BestiaryEntry;

export type {
  BestiaryCombatBlock,
  BestiaryCombatVariant,
  BestiaryEntry,
  BestiaryKind,
  BestiarySourceTier,
  BestiaryWeapon,
  CreatureTypeId,
  EncounterEnvId,
  EncounterKind,
  HumanoidEnvId,
  LocalizedNotes,
  LocalizedText,
  MonsterEnvId,
} from '@/src/data/bestiary/types';

/**
 * Output of a single deduplicated random encounter roll.
 */
export interface RolledEncounter {
  entry: EncounterEntry;
  poolSize: number;
  rolledAt: number;
}
