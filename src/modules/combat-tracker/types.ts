import type { CreatureTypeId, LocalizedText } from '@/src/data/bestiary/types';
import type { CharacterProfessionId } from '@/src/modules/character-generator/types';

export type { CreatureTypeId, LocalizedText };

export type ModuleLanguage = 'fr' | 'en';

/**
 * Combatant allegiance / faction role in the encounter.
 */
export type CombatantRole = 'pc' | 'ally' | 'enemy' | 'monster';

/**
 * Hit-location anatomy profile per Witcher TRPG rules:
 * - human: Head (1), Torso (2-4), R.Arm (5), L.Arm (6), R.Leg (7-8), L.Leg (9-10)
 * - monster: Head (1), Torso (2-5), R.Limb (6-7), L.Limb (8-9), Tail/Wing (10)
 * - elemental: Monster table + immune to organ critical wounds (bonus flat dmg instead)
 * - specter: Monster table + immune to organ criticals & leg/lower-limb hits
 */
export type AnatomyType = 'human' | 'monster' | 'elemental' | 'specter';

/**
 * Canonical 6 armor/hit-location slots.
 * On non-human monsters:
 * - rightArm -> Right Limb (Membre droit)
 * - leftArm -> Left Limb (Membre gauche)
 * - rightLeg -> Tail / Wing (Queue ou aile)
 * - leftLeg -> unused (SP 0)
 */
export type HitLocationId =
  | 'head'
  | 'torso'
  | 'rightArm'
  | 'leftArm'
  | 'rightLeg'
  | 'leftLeg';

/**
 * All 11 official Witcher TRPG status effects + Prone ("Au sol").
 */
export type ConditionId =
  | 'blinded'
  | 'poisoned'
  | 'stunned'
  | 'frozen'
  | 'hallucinating'
  | 'burning'
  | 'intoxicated'
  | 'nausea'
  | 'bleeding'
  | 'staggered'
  | 'suffocating'
  | 'prone';

/**
 * Critical wound severity tiers determined by attack margin over defense (+7/+10/+13/+15).
 */
export type CriticalSeverity = 'simple' | 'complex' | 'difficult' | 'mortal';

/**
 * Healing progression of an active critical wound.
 */
export type CriticalWoundState = 'active' | 'stabilized' | 'treated';

export type DamageType = 'slashing' | 'piercing' | 'bludgeoning' | 'elemental';

export type PenetrationTier = 'none' | 'normal' | 'improved';

export type LightingConditionId = 'bright' | 'daylight' | 'dim' | 'darkness';

export interface ArmorZoneState {
  current: number;
  max: number;
}

export interface CombatantStats {
  ref: number;
  dex: number;
  cor: number;
  vit: number;
  int: number;
  vol: number;
  rec: number;
  etou: number;
  vig: number;
}

export interface CombatantWeapon {
  id: string;
  name: string;
  damage: string;
  damageType: DamageType;
  isSilver: boolean;
  penetration: PenetrationTier;
  reliability: number;
  maxReliability: number;
  attacksPerRound: number;
  effectNote: string;
}

export interface CriticalWoundRecord {
  id: string;
  severity: CriticalSeverity;
  rollLabel: string;
  title: LocalizedText;
  activeEffect: LocalizedText;
  stabilizedEffect: LocalizedText;
  treatedEffect: LocalizedText;
  state: CriticalWoundState;
  location?: HitLocationId;
  addedRound: number;
}

export interface Combatant {
  id: string;
  /** Optional link back to a SavedPartyCharacter in the GM Hub. */
  hubPcId?: string;
  name: string;
  role: CombatantRole;
  anatomy: AnatomyType;
  sourceLabel?: string;

  // Initiative & turn state
  initiative: number;
  initiativeRoll: number;
  tieBreaker: number;
  quickDraw: boolean;
  delayed: boolean;
  actedThisRound: boolean;
  defensesUsedThisRound: number;
  activeDodge: boolean;
  aimStacks: number;

  // Vitals
  hp: number;
  maxHp: number;
  end: number;
  maxEnd: number;
  nonLethalDmg: number;
  adrenalineDice: number;
  tempHp: number;
  deathSaveFailures: number;
  deathSaveRounds: number;
  isDead: boolean;

  stats: CombatantStats;
  armor: Record<HitLocationId, ArmorZoneState>;

  // Resistances & Bestiary context
  resistantToNonSilver: boolean;
  vulnerabilities: string[];
  resistances: string[];
  immunities: string[];
  abilities: string[];
  weapons: CombatantWeapon[];

  conditions: ConditionId[];
  criticalWounds: CriticalWoundRecord[];
  notes: string;
}

export type CombatLogType =
  | 'turn'
  | 'damage'
  | 'heal'
  | 'condition'
  | 'critical'
  | 'fumble'
  | 'death'
  | 'system';

export interface CombatLogEntry {
  id: string;
  round: number;
  timestamp: string;
  type: CombatLogType;
  message: string;
}

export interface CombatTrackerState {
  version: 1;
  encounterTitle: string;
  round: number;
  activeCombatantId: string | null;
  lightLevel: LightingConditionId;
  useAdrenalineRule: boolean;
  combatants: Combatant[];
  logs: CombatLogEntry[];
}

export interface ConditionDefinition {
  id: ConditionId;
  name: LocalizedText;
  shortEffect: LocalizedText;
  fullRule: LocalizedText;
  cureSkill: LocalizedText;
  roundDamage: number;
  bypassesArmor: boolean;
  hitsAllLocations?: boolean;
  autoClearOnTurnStart?: boolean;
}

export interface HitLocationRow {
  id: HitLocationId;
  name: LocalizedText;
  d10Min: number;
  d10Max: number;
  rollLabel: string;
  aimPenalty: number;
  damageMultiplier: number;
  multiplierLabel: string;
}

export interface CriticalTableEntry {
  rollMin: number;
  rollMax: number;
  rollLabel: string;
  locationHint: 'head' | 'torso' | 'arm' | 'leg';
  isOrganWound: boolean;
  title: LocalizedText;
  activeEffect: LocalizedText;
  stabilizedEffect: LocalizedText;
  treatedEffect: LocalizedText;
}

export type FumbleCategoryId =
  | 'melee'
  | 'armedDefense'
  | 'ranged'
  | 'unarmed'
  | 'magic';

export interface FumbleRangeEntry {
  minSeverity: number;
  maxSeverity: number | null;
  rangeLabel: string;
  effect: LocalizedText;
}

/**
 * Persistent Player Character / Companion profile stored in the GM Hub.
 */
export interface SavedPartyCharacter {
  id: string;
  name: string;
  playerName: string;
  professionLabel: string;
  role: 'pc' | 'ally';
  anatomy: AnatomyType;
  maxHp: number;
  maxEnd: number;
  stats: CombatantStats;
  /** Optional extended non-combat stats (EMP, TEC/CRA, CHA/LUCK) preserved from Character Generator. */
  extraStats?: { emp: number; tec: number; cha: number };
  /** Optional skill ranks list for official 1-page PC/NPC sheet rendering. */
  skills?: Array<{ name: string; value: number }>;
  /** Optional defining / key profession skills list. */
  keySkills?: Array<{ name: string; value: number }>;
  /** Optional spells, signs, invocations, rituals, hexes, or vampire powers. */
  magic?: string[];
  /** Optional carried gear labels list. */
  gear?: string[];
  armor: Record<HitLocationId, number>;
  weapons: CombatantWeapon[];
  notes: string;
  updatedAt: string;
}

export type NpcPowerTier = 'novice' | 'experienced' | 'veteran' | 'elite';

/**
 * Custom NPC profile based on official PC professions, stored in the shared GM Hub.
 */
export interface SavedCustomNpc {
  id: string;
  name: string;
  professionId: CharacterProfessionId | 'custom';
  professionLabel: string;
  powerTier: NpcPowerTier;
  role: CombatantRole;
  anatomy: AnatomyType;
  maxHp: number;
  maxEnd: number;
  stats: CombatantStats;
  attackBase: number;
  defenseBase: number;
  armor: Record<HitLocationId, number>;
  weapons: CombatantWeapon[];
  notes: string;
  updatedAt: string;
}

/**
 * Custom Bestiary monster profile created by the GM, stored in the shared GM Hub.
 */
export interface SavedCustomMonster {
  id: string;
  name: string;
  typeId: CreatureTypeId;
  threatLabel: string;
  anatomy: AnatomyType;
  maxHp: number;
  maxEnd: number;
  armorSp: number;
  stats: CombatantStats;
  attackBase: number;
  defenseBase: number;
  resistantToNonSilver: boolean;
  vulnerabilities: string[];
  resistances: string[];
  immunities: string[];
  abilities: string[];
  weapons: CombatantWeapon[];
  notes: string;
  updatedAt: string;
}

/**
 * Member slot inside a reusable SavedCombatGroup.
 */
export type GroupMemberEntry =
  | {
      id: string;
      kind: 'saved-pc';
      pcId: string;
    }
  | {
      id: string;
      kind: 'custom-npc';
      npcId: string;
      quantity: number;
    }
  | {
      id: string;
      kind: 'custom-monster';
      monsterId: string;
      quantity: number;
    }
  | {
      id: string;
      kind: 'bestiary';
      entryId: string;
      variantIndex?: number;
      quantity: number;
      roleOverride?: CombatantRole;
      customLabel?: string;
    }
  | {
      id: string;
      kind: 'custom';
      name: string;
      role: CombatantRole;
      anatomy: AnatomyType;
      quantity: number;
      maxHp: number;
      maxEnd: number;
      armorSp: number;
      stats: CombatantStats;
      resistantToNonSilver: boolean;
    };

/**
 * Reusable encounter or party group managed in the GM Hub.
 */
export interface SavedCombatGroup {
  id: string;
  name: string;
  description: string;
  groupInitiative: boolean;
  members: GroupMemberEntry[];
  updatedAt: string;
}

/**
 * Persistent shared GM Hub state synchronized between Combat Tracker & Combat Simulator.
 */
export interface CombatHubState {
  version: 1;
  characters: SavedPartyCharacter[];
  groups: SavedCombatGroup[];
  customNpcs: SavedCustomNpc[];
  customMonsters: SavedCustomMonster[];
}

export type EncounterStatus = 'active' | 'paused' | 'completed';

/**
 * Full persisted combat encounter session (live, paused mid-session, or completed)
 * accessible from the GM Hub for resuming or reviewing logs.
 */
export interface SavedEncounterSession {
  id: string;
  title: string;
  status: EncounterStatus;
  createdAt: string;
  updatedAt: string;
  state: CombatTrackerState;
}


