import type {
  AnatomyType,
  DamageType,
  LightingConditionId,
  ModuleLanguage,
  PenetrationTier,
} from '@/src/modules/combat-tracker/types';

export type { AnatomyType, DamageType, LightingConditionId, ModuleLanguage, PenetrationTier };

export type TeamSide = 'teamA' | 'teamB';

export type TacticalStance = 'balanced' | 'fast' | 'strong' | 'defensive';

export type TargetPriority = 'weakest' | 'strongest' | 'random' | 'focused';

export type FighterSourceTag =
  | 'hub-pc'
  | 'hub-npc'
  | 'hub-monster'
  | 'bestiary'
  | 'archetype'
  | 'json'
  | 'custom';

export type LethalityRating =
  | 'trivial'
  | 'favorable'
  | 'balanced'
  | 'risky'
  | 'deadly';

export interface SimWeaponConfig {
  name: string;
  damageFormula: string;
  damageType: DamageType;
  isSilver: boolean;
  penetration: PenetrationTier;
  attacksPerRound: number;
  isRanged: boolean;
  bleedChance: number;
  burnChance: number;
  poisonChance: number;
  stunChance: number;
}

export interface SimFighterConfig {
  id: string;
  name: string;
  team: TeamSide;
  quantity: number;
  anatomy: AnatomyType;
  maxHp: number;
  maxEnd: number;
  armorSp: number;
  ref: number;
  dex: number;
  cor: number;
  vit: number;
  vol: number;
  rec: number;
  etou: number;
  attackBase: number;
  defenseBase: number;
  resistantToNonSilver: boolean;
  stance: TacticalStance;
  weapon: SimWeaponConfig;
  sourceTag: FighterSourceTag;
}

export interface SimulationSettings {
  iterations: number;
  maxRounds: number;
  lightLevel: LightingConditionId;
  targetPriorityA: TargetPriority;
  targetPriorityB: TargetPriority;
  enableCritWounds: boolean;
  enableFumbles: boolean;
  enableWoundThreshold: boolean;
  enableFlanking: boolean;
  enableStatusEffects: boolean;
  enableMultiDefensePenalty: boolean;
  groupInitiativeTeamB: boolean;
}

export interface FighterSimTelemetry {
  blueprintId: string;
  name: string;
  team: TeamSide;
  quantity: number;
  survivalRate: number;
  deathRate: number;
  avgRemainingHp: number;
  avgDamageDealt: number;
  avgDamageTaken: number;
  avgCritsInflicted: number;
  avgCritsReceived: number;
  avgFumbles: number;
  avgAttacksHit: number;
  avgAttacksTotal: number;
}

export interface RoundDistributionBucket {
  round: number;
  teamAWins: number;
  teamBWins: number;
}

export interface SampleCombatEvent {
  round: number;
  actor: string;
  text: string;
  kind: 'init' | 'hit' | 'miss' | 'crit' | 'fumble' | 'status' | 'death' | 'victory';
}

export interface SimulationReport {
  iterations: number;
  durationMs: number;
  teamAWins: number;
  teamBWins: number;
  draws: number;
  teamAWinRate: number;
  teamBWinRate: number;
  drawRate: number;
  teamAPerfectWins: number;
  teamAPerfectWinRate: number;
  avgRounds: number;
  minRounds: number;
  maxRounds: number;
  lethality: LethalityRating;
  roundDistribution: RoundDistributionBucket[];
  fighterTelemetry: FighterSimTelemetry[];
  sampleWinner: TeamSide | 'draw';
  sampleRounds: number;
  sampleLog: SampleCombatEvent[];
}

export interface SavedSimulationSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  teamA: SimFighterConfig[];
  teamB: SimFighterConfig[];
  settings: SimulationSettings;
  lastReport: SimulationReport | null;
}
