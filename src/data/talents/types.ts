import type { LocalizedText } from '../bestiary/types';

/**
 * Canonical profession identifiers across all 14 Witcher TRPG skill trees.
 */
export type ProfessionId =
  | 'craftsman'
  | 'bard'
  | 'criminal'
  | 'doctor'
  | 'man-at-arms'
  | 'mage'
  | 'merchant'
  | 'priest'
  | 'witcher'
  | 'noble'
  | 'vampire'
  | 'fanatic'
  | 'outlaw'
  | 'nomad';

/**
 * Single profession talent / skill-tree node.
 */
export interface TalentEntry {
  id: string;
  professionId: ProfessionId;
  profession: LocalizedText;
  branch: string;
  name: string;
  attribute?: string;
  description: string;
  isCoreProfession: boolean;
}
