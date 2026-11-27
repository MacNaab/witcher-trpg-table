/**
 * Domain types for the Investigation / Mystery & Witcher Contracts module
 * based on "Le Journal du Sorcelleur" (pp. Investigation & Contrats).
 */

export type MysteryComplexityTierId =
  | 'easy'
  | 'moderate'
  | 'challenging'
  | 'hard'
  | 'nearlyImpossible';

export type ClueConcealmentLevel = 0 | 2 | 4 | 6;

export type ClueTypeId =
  | 'evidence_analysis'
  | 'transaction_analysis'
  | 'deciphering'
  | 'scene_examination'
  | 'body_examination'
  | 'tailing'
  | 'interrogation'
  | 'mystic_investigation'
  | 'tracking'
  | 'research'
  | 'rumors';

export type ObstacleTypeId =
  | 'authority'
  | 'conspiracy'
  | 'unfavorable_context'
  | 'distraction'
  | 'exhaustion'
  | 'red_herring'
  | 'missing_clue'
  | 'weather'
  | 'passage_of_time'
  | 'gossip'
  | 'unusual_situation';

export interface BilingualText {
  fr: string;
  en: string;
}

export interface ComplexityTierDef {
  id: MysteryComplexityTierId;
  hp: number;
  label: BilingualText;
  description: BilingualText;
  cluesByConcealment: Record<ClueConcealmentLevel, number>;
}

export interface ConcealmentTierDef {
  value: ClueConcealmentLevel;
  label: BilingualText;
  example: BilingualText;
}

export interface ClueTypeDef {
  id: ClueTypeId;
  label: BilingualText;
  skills: BilingualText;
  damageDie: '1d6' | '1d10';
  damageStat: 'TECH' | 'INT' | 'EMP';
  allowExtraTime: boolean;
  failConcentrationDie: '1d6' | '1d10';
  example: BilingualText;
  penalty: BilingualText;
}

export interface ObstacleTypeDef {
  id: ObstacleTypeId;
  label: BilingualText;
  example: BilingualText;
}

export interface InvestigatorEntry {
  id: string;
  name: string;
  will: number;
  int: number;
  deduction: number;
  concentration: number;
  maxConcentration: number;
  hubMemberId?: string;
}

export interface MysteryClueEntry {
  id: string;
  title: string;
  clueType: ClueTypeId;
  dc: number;
  concealment: ClueConcealmentLevel;
  description: string;
  attemptsUsed: number;
  maxAttempts?: number;
  solved: boolean;
  contaminatedPenalty: number;
}

export interface MysteryObstacleEntry {
  id: string;
  obstacleType: ObstacleTypeId;
  title: string;
  dc: number;
  description: string;
  resolved: boolean;
  outcome?: 'success' | 'fail';
}

export interface InvestigationLogEntry {
  id: string;
  timestamp: string;
  kind: 'clue' | 'obstacle' | 'deduction' | 'rest' | 'system';
  summary: string;
}

export interface MysteryCase {
  id: string;
  title: string;
  objective: string;
  solutionSecret: string;
  tier: MysteryComplexityTierId;
  maxComplexity: number;
  remainingComplexity: number;
  currentDay: number;
  countdownTotalDays: number | null;
  sourceContractId?: string;
  clues: MysteryClueEntry[];
  obstacles: MysteryObstacleEntry[];
  logs: InvestigationLogEntry[];
  updatedAt: string;
}

export interface WitcherContractEntry {
  id: string;
  number: number;
  title: BilingualText;
  client: BilingualText;
  location: BilingualText;
  reward: BilingualText;
  noticeText: BilingualText;
  gmHint: BilingualText;
  suggestedTier: MysteryComplexityTierId;
  suggestedMonster: BilingualText;
}

export interface InvestigationStoreState {
  activeMysteryId: string;
  mysteries: MysteryCase[];
  investigators: InvestigatorEntry[];
}
