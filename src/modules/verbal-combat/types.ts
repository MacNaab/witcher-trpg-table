import type { LocalizedText } from '@/src/data/bestiary/types';

export type ModuleLanguage = 'fr' | 'en';

export type VerbalRole = 'pc' | 'ally' | 'opponent' | 'witness';

export type RelationshipTier =
  | 'hostile'
  | 'unfriendly'
  | 'neutral'
  | 'friendly'
  | 'helpful';

export type VerbalAttackId =
  | 'persuasion'
  | 'seduction'
  | 'intimidation'
  | 'deceit'
  | 'ridicule'
  | 'leadership'
  | 'hard_facts';

export type VerbalDefenseId =
  | 'ignore'
  | 'counter'
  | 'deflect'
  | 'read_intent'
  | 'appease';

export type VerbalConditionId =
  | 'intimidated'
  | 'ridiculed'
  | 'charmed'
  | 'rattled'
  | 'unmasked'
  | 'broken';

export type VerbalSkillKey =
  | 'persuasion'
  | 'charisma'
  | 'seduction'
  | 'leadership'
  | 'intimidation'
  | 'deceit'
  | 'education'
  | 'etiquette'
  | 'business'
  | 'humanPerception'
  | 'resistCoercion';

export type VerbalContextType =
  | 'negotiation'
  | 'interrogation'
  | 'trial'
  | 'debate';

export type VerbalSessionStatus = 'active' | 'paused' | 'completed';

export interface VerbalParticipantStats {
  emp: number;
  int: number;
  vol: number;
}

export type VerbalParticipantSkills = Record<VerbalSkillKey, number>;

export interface VerbalParticipant {
  id: string;
  hubPcId?: string;
  name: string;
  role: VerbalRole;
  titleLabel: string;
  relationship: RelationshipTier;
  initiative: number;
  initiativeRoll: number;
  actedThisRound: boolean;
  resolve: number;
  maxResolve: number;
  stats: VerbalParticipantStats;
  skills: VerbalParticipantSkills;
  conditions: VerbalConditionId[];
  notes: string;
}

export type VerbalLogType =
  | 'exchange'
  | 'damage'
  | 'counter'
  | 'condition'
  | 'turn'
  | 'system';

export interface VerbalLogEntry {
  id: string;
  round: number;
  timestamp: string;
  type: VerbalLogType;
  message: string;
}

export interface VerbalSessionState {
  contextType: VerbalContextType;
  stakes: string;
  round: number;
  activeParticipantId: string | null;
  participants: VerbalParticipant[];
  logs: VerbalLogEntry[];
}

export interface SavedVerbalSession {
  id: string;
  title: string;
  status: VerbalSessionStatus;
  updatedAt: string;
  state: VerbalSessionState;
}

export interface VerbalAttackToolMeta {
  id: VerbalAttackId;
  label: LocalizedText;
  skillKey: VerbalSkillKey;
  statKey: keyof VerbalParticipantStats;
  damageDice: string;
  damageStat: keyof VerbalParticipantStats;
  appliesCondition?: VerbalConditionId;
  summary: LocalizedText;
}

export interface VerbalDefenseToolMeta {
  id: VerbalDefenseId;
  label: LocalizedText;
  skillKey: VerbalSkillKey;
  statKey: keyof VerbalParticipantStats;
  summary: LocalizedText;
}

export interface VerbalNpcArchetype {
  id: string;
  label: LocalizedText;
  role: VerbalRole;
  title: LocalizedText;
  relationship: RelationshipTier;
  stats: VerbalParticipantStats;
  skills: VerbalParticipantSkills;
  notes: LocalizedText;
}
