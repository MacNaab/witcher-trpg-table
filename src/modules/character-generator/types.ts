import type { LocalizedText } from '@/src/data/bestiary/types';
import type { ProfessionId as TalentProfessionId } from '@/src/data/talents/types';

export type ModuleLanguage = 'en' | 'fr';

/**
 * Guided rules vs. Freeform / Extended rules.
 */
export type GeneratorMode = 'simple' | 'advanced';

/**
 * Wizard step identifiers (6 guided creation steps + final playable dossier).
 */
export type WizardStepId =
  | 'identity'
  | 'lifepath'
  | 'stats'
  | 'professionSkills'
  | 'generalSkills'
  | 'gear'
  | 'summary';

export type GenderId = 'male' | 'female';

export type RaceId =
  | 'witcher'
  | 'human'
  | 'elf'
  | 'dwarf'
  | 'halfling'
  | 'gnome'
  | 'vran'
  | 'werebbub'
  | 'vampire';

/**
 * All 15 playable professions (9 core + 6 extended/supplement).
 */
export type CharacterProfessionId =
  | 'craftsman'
  | 'bard'
  | 'criminal'
  | 'doctor'
  | 'man-at-arms'
  | 'mage'
  | 'merchant'
  | 'priest'
  | 'witcher'
  | 'vampire'
  | 'noble'
  | 'peasant'
  | 'fanatic'
  | 'outlaw'
  | 'nomad';

export type PrimaryStatKey =
  | 'INT'
  | 'REF'
  | 'DEX'
  | 'COR'
  | 'VIT'
  | 'EMP'
  | 'TEC'
  | 'VOL'
  | 'CHA';

export type SkillAttributeKey = 'INT' | 'REF' | 'DEX' | 'COR' | 'EMP' | 'TEC' | 'VOL';

export type SkillId =
  // INT (13)
  | 'int_awareness'
  | 'int_business'
  | 'int_deduction'
  | 'int_education'
  | 'int_lang_common'
  | 'int_lang_elder'
  | 'int_lang_dwarvish'
  | 'int_monster_lore'
  | 'int_etiquette'
  | 'int_streetwise'
  | 'int_tactics'
  | 'int_teaching'
  | 'int_survival'
  // REF (8)
  | 'ref_brawling'
  | 'ref_dodge'
  | 'ref_melee'
  | 'ref_riding'
  | 'ref_sailing'
  | 'ref_small_blades'
  | 'ref_staff_spear'
  | 'ref_swordsmanship'
  // DEX (5)
  | 'dex_archery'
  | 'dex_athletics'
  | 'dex_crossbow'
  | 'dex_sleight_of_hand'
  | 'dex_stealth'
  // COR (2)
  | 'cor_physique'
  | 'cor_endurance'
  // EMP (10)
  | 'emp_charisma'
  | 'emp_deceit'
  | 'emp_fine_arts'
  | 'emp_gambling'
  | 'emp_grooming'
  | 'emp_human_perception'
  | 'emp_leadership'
  | 'emp_persuasion'
  | 'emp_performance'
  | 'emp_seduction'
  // TEC (7)
  | 'tec_alchemy'
  | 'tec_crafting'
  | 'tec_disguise'
  | 'tec_first_aid'
  | 'tec_forgery'
  | 'tec_pick_locks'
  | 'tec_trap_crafting'
  // VOL (7)
  | 'vol_courage'
  | 'vol_hex_weaving'
  | 'vol_intimidation'
  | 'vol_spell_casting'
  | 'vol_resist_magic'
  | 'vol_resist_coercion'
  | 'vol_ritual_crafting';

export type RegionId = 'north' | 'nilfgaard' | 'elderlands';

export type LifepathTrack = 'standard' | 'witcher' | 'mage' | 'custom';

export type DecadeRiskLevel = 'safe' | 'ordinary' | 'reckless' | 'risky';

export type MagicSlotKind = 'spell' | 'invocation' | 'ritual' | 'hex' | 'vampire';

export interface RaceDefinition {
  id: RaceId;
  name: LocalizedText;
  isExtended: boolean;
  lockedProfessionId?: CharacterProfessionId;
  restrictedProfessions?: readonly CharacterProfessionId[];
  allowedRegions: readonly RegionId[];
  defaultOrigin?: { region: RegionId; originIndex: number };
  maxSiblings: number;
  allowElderAges: boolean;
  perks: readonly LocalizedText[];
}

export interface ProfessionDefinition {
  id: CharacterProfessionId;
  legacyCode: string;
  talentProfessionId: TalentProfessionId | null;
  name: LocalizedText;
  isExtended: boolean;
  definingSkill: LocalizedText;
  vigorThreshold: number;
  fixedSkills: readonly SkillId[];
  selectableCombatSlots?: {
    count: number;
    options: readonly SkillId[];
  };
  selectableCraftSlots?: {
    count: number;
    options: readonly SkillId[];
  };
  selectableLanguageCount?: number;
  startingTreasure?: LocalizedText;
  magicConfig?: {
    spells?: number;
    invocations?: number;
    rituals?: number;
    hexes?: number;
    vampirePowers?: number;
    autoBasicSigns?: boolean;
  };
}

export interface SkillDefinition {
  id: SkillId;
  attribute: SkillAttributeKey;
  name: LocalizedText;
  doubleCost: boolean;
  isLanguage?: boolean;
  isCombat?: boolean;
  isCraft?: boolean;
}

export interface StandardLifepathState {
  region: RegionId | '';
  originIndex: number | null;
  familyStatus: 'alive' | 'tragedy' | '';
  parentsStatus: 'alive' | 'dead' | '';
  familyFateIndex: number | null;
  parentalFateIndex: number | null;
  familyStandingIndex: number | null;
  mentorIndex: number | null;
  siblingsCount: number | null;
  siblingsDetails: string[];
  ageDecade: 2 | 3 | 4 | 5 | null;
  decadeEvents: string[];
}

export interface WitcherLifepathState {
  ageTaken: '1-2' | '4-6' | '8-11' | '';
  school: 'wolf' | 'griffin' | 'cat' | 'viper' | 'bear' | '';
  earlyTrainingResult: string;
  trialResult: string;
  importantEventIndex: number | null;
  currentStatusIndex: number | null;
  decadeSafety: [DecadeRiskLevel | '', DecadeRiskLevel | '', DecadeRiskLevel | ''];
  decadeEvents: [string, string, string];
}

export interface MageLifepathState {
  ageEntered: '2-6' | '7-12' | '12+' | '';
  academy: 'aretuza' | 'ban-ard' | 'nilfgaard' | 'druid-circle' | '';
  trainingResult: string;
  graduationResult: string;
  importantEventIndex: number | null;
  currentStatusIndex: number | null;
  decadeSafety: [DecadeRiskLevel | '', DecadeRiskLevel | '', DecadeRiskLevel | ''];
  decadeEvents: [string, string, string];
}

export interface CustomLifepathState {
  origin: string;
  age: string;
  backstory: string;
}

export type StarterEquipmentCategory =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'component'
  | 'gear'
  | 'formula';

export interface StarterGearOption {
  id: string;
  name: LocalizedText;
  weight: number;
  category: StarterEquipmentCategory;
  /** Optional linked entry id in `@/src/data/items` for stat & description lookup. */
  catalogItemId?: string;
  /** Optional fallback description when no catalog entry exists. */
  description?: LocalizedText;
}

export interface CustomInventoryEntry {
  uid: string;
  catalogId?: string;
  name: string;
  category: StarterEquipmentCategory;
  quantity: number;
  weight: number;
  notes?: string;
}

export interface DerivedStats {
  statBase: number;
  stun: number;
  run: number;
  leap: number;
  hp: number;
  stamina: number;
  recovery: number;
  encumbrance: number;
  vigor: number;
}

export interface CharacterSheetState {
  mode: GeneratorMode;
  playerName: string;
  characterName: string;
  gender: GenderId | '';
  raceId: RaceId | '';
  professionId: CharacterProfessionId | '';
  useCustomLifepath: boolean;
  standardLifepath: StandardLifepathState;
  witcherLifepath: WitcherLifepathState;
  mageLifepath: MageLifepathState;
  customLifepath: CustomLifepathState;
  personalDescription: string;

  // Step 3: Primary Stats
  statBudget: number;
  ignoreStatBudget: boolean;
  allowStatCap13: boolean;
  stats: Record<PrimaryStatKey, number>;

  // Step 4: Profession Skills & Magic
  professionBudget: number;
  ignoreSkillBudgets: boolean;
  allowSkillCap13: boolean;
  definingSkillRank: number;
  /** Stored as RANK (effective skill level, e.g., 1..6; double-cost skills spend rank * 2 points). */
  professionSkillRanks: Partial<Record<SkillId, number>>;
  selectedCombatSkills: SkillId[];
  selectedCraftSkill: SkillId | '';
  selectedLanguages: SkillId[];

  includeUnofficialMagic: boolean;
  selectedSpells: string[];
  selectedInvocations: string[];
  selectedRituals: string[];
  selectedHexes: string[];
  selectedVampirePowers: string[];

  // Step 5: General / Pickup Skills
  /** Stored as RANK (effective skill level; double-cost skills spend rank * 2 points). */
  generalSkillRanks: Partial<Record<SkillId, number>>;

  // Step 6: Equipment
  selectedStarterGearIds: string[];
  witcherDecoctionFormulaId: string;
  witcherOilFormulaIds: [string, string];
  witcherPotionFormulaIds: [string, string];
  customInventory: CustomInventoryEntry[];
}
