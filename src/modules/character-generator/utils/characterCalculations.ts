import {
  ALL_MAGIC_ENTRIES,
  getMagicEntryById,
  getMagicalGiftById,
  type MagicEntry,
} from '@/src/data/magic';
import { FORMULAE_DATA } from '@/src/data/items';
import {
  FAMILY_FATES,
  FAMILY_STANDINGS,
  MAGE_ACADEMIES,
  MAGE_AGES,
  MAGE_CURRENT_STATUS,
  MAGE_GRADUATION_OUTCOMES,
  MAGE_IMPORTANT_EVENTS,
  MAGE_TRAINING_EVENTS,
  MENTORS_DATA,
  PARENTAL_FATES,
  REGIONS_DATA,
  WITCHER_AGES,
  WITCHER_CURRENT_STATUS,
  WITCHER_EARLY_TRAINING,
  WITCHER_IMPORTANT_EVENTS,
  WITCHER_SCHOOLS,
  WITCHER_TRIAL_OUTCOMES,
  rollMageDecadeEvent,
  rollSiblingDescription,
  rollStandardDecadeEvent,
  rollWitcherDecadeEvent,
} from '../data/lifepathData';
import {
  MAGE_ACADEMIA_EVENTS,
  MAGE_BENEFIT_EVENTS,
  MAGE_BIRTH_LOCATIONS,
  MAGE_CHAOS_SCHOOLS,
  MAGE_DANGER_TABLES,
  MAGE_DECADE_STYLES,
  MAGE_DISCOVERIES,
  MAGE_FAMILY_PERSONALITIES,
  MAGE_FAMILY_REACTIONS,
  MAGE_FAMILY_SIZES,
  MAGE_FAMILY_STATUSES,
  MAGE_KNOWLEDGE_EVENTS,
  MAGE_MENTOR_CLOTHING,
  MAGE_MENTOR_ENDINGS,
  MAGE_MENTOR_HATREDS,
  MAGE_MENTOR_MOMENTS,
  MAGE_MENTOR_PERSONALITIES,
  MAGE_MENTOR_TEACHING_STYLES,
  MAGE_MENTOR_VALUES,
  getChaosSchoolDefinition,
  rollMageAllySummary,
  rollMageGrudgeSummary,
} from '../data/mageLifepathChaosData';
import {
  PRIMARY_STAT_KEYS,
  PROFESSIONS_DATA,
  RACES_DATA,
  getProfessionDefinition,
  getRaceDefinition,
} from '../data/racesAndProfessions';
import {
  LANGUAGE_SKILLS,
  SKILLS_CATALOG,
  getSkillDefinition,
} from '../data/skillsCatalog';
import {
  PROFESSION_STARTER_KITS,
  getWitcherFormulaOptions,
} from '../data/startingGearData';
import type {
  CharacterProfessionId,
  CharacterSheetState,
  DecadeRiskLevel,
  DerivedStats,
  GeneratorMode,
  LifepathTrack,
  ModuleLanguage,
  PrimaryStatKey,
  ProfessionDefinition,
  RaceId,
  RegionId,
  SkillId,
  WizardStepId,
} from '../types';
import { getCharacterGeneratorCopy } from '../i18n';

export const WIZARD_STEP_ORDER: readonly WizardStepId[] = [
  'identity',
  'lifepath',
  'stats',
  'professionSkills',
  'generalSkills',
  'gear',
  'summary',
];

export const DEFAULT_STATS: Record<PrimaryStatKey, number> = {
  INT: 6,
  REF: 6,
  DEX: 6,
  COR: 6,
  VIT: 6,
  EMP: 6,
  TEC: 6,
  VOL: 6,
  CHA: 6,
};

export function createInitialCharacterState(
  mode: GeneratorMode = 'simple'
): CharacterSheetState {
  return {
    mode,
    playerName: '',
    characterName: '',
    gender: '',
    raceId: '',
    professionId: '',
    useCustomLifepath: false,
    standardLifepath: {
      region: '',
      originIndex: null,
      familyStatus: '',
      parentsStatus: '',
      familyFateIndex: null,
      parentalFateIndex: null,
      familyStandingIndex: null,
      mentorIndex: null,
      siblingsCount: null,
      siblingsDetails: [],
      ageDecade: null,
      decadeEvents: [],
    },
    witcherLifepath: {
      ageTaken: '',
      school: '',
      earlyTrainingResult: '',
      trialResult: '',
      importantEventIndex: null,
      currentStatusIndex: null,
      decadeSafety: ['safe', 'safe', 'safe'],
      decadeEvents: ['', '', ''],
    },
    mageLifepath: {
      ageEntered: '',
      academy: '',
      trainingResult: '',
      graduationResult: '',
      importantEventIndex: null,
      currentStatusIndex: null,
      decadeSafety: ['safe', 'safe', 'safe'],
      decadeEvents: ['', '', ''],
      birthLocationIndex: null,
      elderlandConclave: false,
      familySizeIndex: null,
      familyPersonalityIndex: null,
      familyStatusIndex: null,
      discoveryIndex: null,
      reactionRegion: '',
      reactionIndex: null,
      academiaDecade1Index: null,
      academiaDecade2Index: null,
      wasApprentice: null,
      mentorPersonalityIndex: null,
      mentorValueIndex: null,
      mentorClothingIndex: null,
      mentorHatredIndex: null,
      mentorTeachingIndex: null,
      mentorMomentIndex: null,
      mentorEndingIndex: null,
      chaosDecades: [],
    },
    customLifepath: {
      origin: '',
      age: '',
      backstory: '',
    },
    personalDescription: '',
    statBudget: 60,
    ignoreStatBudget: mode === 'advanced',
    allowStatCap13: mode === 'advanced',
    stats: {
      INT: 1,
      REF: 1,
      DEX: 1,
      COR: 1,
      VIT: 1,
      EMP: 1,
      TEC: 1,
      VOL: 1,
      CHA: 1,
    },
    professionBudget: 44,
    ignoreSkillBudgets: mode === 'advanced',
    allowSkillCap13: mode === 'advanced',
    definingSkillRank: 1,
    professionSkillRanks: {},
    selectedCombatSkills: [],
    selectedCraftSkill: '',
    selectedLanguages: [],
    includeUnofficialMagic: mode === 'advanced',
    includeDarkArtsMagic: mode === 'advanced',
    selectedSpells: [],
    selectedInvocations: [],
    selectedRituals: [],
    selectedHexes: [],
    selectedVampirePowers: [],
    magicalGiftId: '',
    generalSkillRanks: {},
    selectedStarterGearIds: [],
    witcherDecoctionFormulaId: '',
    witcherOilFormulaIds: ['', ''],
    witcherPotionFormulaIds: ['', ''],
    customInventory: [],
  };
}

/**
 * Determines which lifepath workflow applies based on race/profession & custom toggle.
 */
export function resolveLifepathTrack(state: CharacterSheetState): LifepathTrack {
  if (state.useCustomLifepath) return 'custom';
  if (state.raceId === 'witcher' || state.professionId === 'witcher') {
    return 'witcher';
  }
  if (state.professionId === 'mage') {
    return 'mage';
  }
  return 'standard';
}

/**
 * Checks whether a race/profession combination is restricted in Simple mode.
 */
export function isProfessionRestrictedForRace(
  raceId: RaceId | '',
  professionId: CharacterProfessionId | ''
): boolean {
  if (!raceId || !professionId) return false;
  const race = getRaceDefinition(raceId);
  if (race.lockedProfessionId && race.lockedProfessionId !== professionId) {
    return true;
  }
  return Boolean(race.restrictedProfessions?.includes(professionId));
}

/**
 * Magical Gifts ("The Magical Mundane" — A Tome of Chaos) are restricted to non-casters
 * (no Mage, Priest, Druid, Witcher, or Vampire). In Simple Mode, only Humans & Elves are eligible.
 */
export function canCharacterTakeMagicalGift(
  raceId: RaceId | '',
  professionId: CharacterProfessionId | '',
  mode: GeneratorMode
): boolean {
  if (!professionId) return false;
  if (
    professionId === 'mage' ||
    professionId === 'priest' ||
    professionId === 'druid' ||
    professionId === 'witcher' ||
    professionId === 'vampire'
  ) {
    return false;
  }
  if (mode === 'simple') {
    return raceId === 'human' || raceId === 'elf';
  }
  return true;
}

/**
 * Calculates derived statistics using fixed Witcher TRPG formulas
 * (including LEAP = Math.floor(RUN / 5)).
 */
export function calculateDerivedStats(state: CharacterSheetState): DerivedStats {
  const cor = state.stats.COR;
  const vol = state.stats.VOL;
  const vit = state.stats.VIT;
  const statBase = Math.floor((cor + vol) / 2);
  const run = vit * 3;
  const leap = Math.floor(run / 5);
  const stun = Math.min(10, statBase);
  const hp = statBase * 5;
  const stamina = statBase * 5;
  const recovery = statBase;
  // Racial Encumbrance modifiers from guide/races.md:
  // - Dwarf (Strong / Coriace): +25 kg maximum Encumbrance
  // - Gnome (Small Stature / Petite taille): Encumbrance calculated as if BODY were 3 lower (min 1)
  const effectiveEncBody =
    state.raceId === 'gnome' ? Math.max(1, cor - 3) : cor;
  const encumbrance =
    effectiveEncBody * 10 + (state.raceId === 'dwarf' ? 25 : 0);
  const baseVigor = state.professionId
    ? getProfessionDefinition(state.professionId).vigorThreshold
    : 0;
  const giftBonusVigor =
    baseVigor === 0 && Boolean(state.magicalGiftId && getMagicalGiftById(state.magicalGiftId))
      ? 2
      : 0;
  const vigor = baseVigor + giftBonusVigor;

  return {
    statBase,
    stun,
    run,
    leap,
    hp,
    stamina,
    recovery,
    encumbrance,
    vigor,
  };
}

export function getStatPointsSpent(state: CharacterSheetState): number {
  return PRIMARY_STAT_KEYS.reduce((sum, key) => sum + (state.stats[key] ?? 0), 0);
}

/**
 * Determines native language granted at rank 8 for Standard lifepath characters.
 */
export function getNativeLanguageSkillId(
  state: CharacterSheetState
): SkillId | null {
  if (state.useCustomLifepath) return null;
  if (state.raceId === 'witcher' || state.professionId === 'witcher') {
    return 'int_lang_common';
  }
  const region = state.standardLifepath.region;
  const originIndex = state.standardLifepath.originIndex;
  if (!region) return null;
  if (region === 'north') {
    return originIndex === 6 ? 'int_lang_elder' : 'int_lang_common';
  }
  if (region === 'nilfgaard') {
    return 'int_lang_elder';
  }
  if (region === 'elderlands') {
    return originIndex === 1 ? 'int_lang_dwarvish' : 'int_lang_elder';
  }
  return null;
}

/**
 * Computes active profession skill list from fixed skills + chosen combat/craft/language slots.
 */
export function getActiveProfessionSkills(
  state: CharacterSheetState,
  profession?: ProfessionDefinition
): SkillId[] {
  const prof =
    profession ??
    (state.professionId ? getProfessionDefinition(state.professionId) : null);
  if (!prof) return [];

  const combined: SkillId[] = [...prof.fixedSkills];
  for (const combatId of state.selectedCombatSkills) {
    if (combatId && !combined.includes(combatId)) {
      combined.push(combatId);
    }
  }
  if (state.selectedCraftSkill && !combined.includes(state.selectedCraftSkill)) {
    combined.push(state.selectedCraftSkill);
  }
  for (const langId of state.selectedLanguages) {
    if (langId && !combined.includes(langId)) {
      combined.push(langId);
    }
  }
  return combined;
}

/**
 * Returns skill points consumed by a given rank (x2 for difficult skills, unless waived by Higher Vampire perk).
 */
export function getSkillPointCost(
  skillId: SkillId,
  rank: number,
  waiveDoubleCost = false
): number {
  if (rank <= 0) return 0;
  const def = getSkillDefinition(skillId);
  return def.doubleCost && !waiveDoubleCost ? rank * 2 : rank;
}

export function getProfessionSkillPointsSpent(
  state: CharacterSheetState
): number {
  if (!state.professionId) return 0;
  const activeSkills = getActiveProfessionSkills(state);
  const waiveDoubleCost = state.raceId === 'vampire';
  let total = state.definingSkillRank;
  for (const skillId of activeSkills) {
    const rank = state.professionSkillRanks[skillId] ?? 0;
    total += getSkillPointCost(skillId, rank, waiveDoubleCost);
  }
  return total;
}

export function getGeneralSkillBudget(state: CharacterSheetState): number {
  return (state.stats.INT ?? 0) + (state.stats.REF ?? 0);
}

export function getAvailableGeneralSkills(
  state: CharacterSheetState
): readonly SkillId[] {
  const activeProf = new Set(getActiveProfessionSkills(state));
  const nativeLang = getNativeLanguageSkillId(state);
  return SKILLS_CATALOG.filter(
    (s) => !activeProf.has(s.id) && s.id !== nativeLang
  ).map((s) => s.id);
}

export function getGeneralSkillPointsSpent(state: CharacterSheetState): number {
  const available = new Set(getAvailableGeneralSkills(state));
  const waiveDoubleCost = state.raceId === 'vampire';
  let total = 0;
  for (const [id, rank] of Object.entries(state.generalSkillRanks)) {
    if (!available.has(id as SkillId)) continue;
    total += getSkillPointCost(id as SkillId, rank ?? 0, waiveDoubleCost);
  }
  return total;
}

/**
 * Computes effective rank (0..13) for any skill across native language, profession, and general pools.
 */
export function getEffectiveSkillRank(
  state: CharacterSheetState,
  skillId: SkillId
): number {
  const nativeLang = getNativeLanguageSkillId(state);
  if (nativeLang === skillId) return 8;
  const activeProf = getActiveProfessionSkills(state);
  if (activeProf.includes(skillId)) {
    return state.professionSkillRanks[skillId] ?? 0;
  }
  return state.generalSkillRanks[skillId] ?? 0;
}

/**
 * Filters selectable starting magic pools from `@/src/data/magic` for Simple & Advanced modes.
 */
export function getMagicPoolsForState(state: CharacterSheetState): {
  spells: MagicEntry[];
  invocations: MagicEntry[];
  rituals: MagicEntry[];
  hexes: MagicEntry[];
  vampirePowers: MagicEntry[];
  basicSigns: MagicEntry[];
  advancedSigns: MagicEntry[];
} {
  const isAdvanced = state.mode === 'advanced';
  const allowUnofficial = state.includeUnofficialMagic;
  const allowDarkArts = state.includeDarkArtsMagic;

  const sourceOk = (entry: MagicEntry) =>
    entry.source === 'official' ||
    (allowUnofficial && entry.source === 'fanMade');

  const spells = ALL_MAGIC_ENTRIES.filter(
    (e) =>
      sourceOk(e) &&
      (['mixed', 'earth', 'air', 'fire', 'water'].includes(e.schoolId) ||
        (allowDarkArts && e.schoolId === 'necromancy')) &&
      (isAdvanced || e.tier === 'novice')
  );

  const allowedInvocationSchools =
    state.professionId === 'druid'
      ? ['druid', ...(isAdvanced ? ['druid-hierophant'] : [])]
      : state.professionId === 'priest'
        ? ['priest', ...(isAdvanced ? ['archpriest'] : [])]
        : [
            'druid',
            'priest',
            ...(isAdvanced ? ['archpriest', 'druid-hierophant'] : []),
          ];

  const invocations = ALL_MAGIC_ENTRIES.filter(
    (e) =>
      sourceOk(e) &&
      allowedInvocationSchools.includes(e.schoolId) &&
      (isAdvanced || e.tier === 'novice')
  );

  const rituals = ALL_MAGIC_ENTRIES.filter(
    (e) =>
      sourceOk(e) &&
      (e.schoolId === 'ritual' ||
        (allowDarkArts &&
          (e.schoolId === 'necromancy' || e.schoolId === 'goetia'))) &&
      (isAdvanced || e.tier === 'novice')
  );

  const hexes = ALL_MAGIC_ENTRIES.filter(
    (e) =>
      sourceOk(e) &&
      e.schoolId === 'hex' &&
      (isAdvanced ||
        (e.danger ?? '').toLowerCase().includes('faible') ||
        (e.danger ?? '').toLowerCase().includes('low'))
  );

  const vampirePowers = ALL_MAGIC_ENTRIES.filter(
    (e) =>
      (e.source === 'vampire' || e.schoolId === 'vampire-spell') &&
      (isAdvanced || e.tier === 'novice')
  );

  const basicSigns = ALL_MAGIC_ENTRIES.filter(
    (e) => e.schoolId === 'sign-basic'
  );

  const advancedSigns =
    isAdvanced || allowDarkArts
      ? ALL_MAGIC_ENTRIES.filter((e) => e.schoolId === 'sign-advanced')
      : [];

  return {
    spells,
    invocations,
    rituals,
    hexes,
    vampirePowers,
    basicSigns,
    advancedSigns,
  };
}

/**
 * Calculates total carried weight across starter kit + free items + compendium additions.
 */
export function getTotalCarriedWeight(state: CharacterSheetState): number {
  let total = 0;
  if (state.professionId) {
    const kit = PROFESSION_STARTER_KITS[state.professionId];
    for (const item of kit.freeItems) {
      total += item.weight;
    }
    const selectedSet = new Set(state.selectedStarterGearIds);
    for (const item of kit.selectableItems) {
      if (selectedSet.has(item.id)) {
        total += item.weight;
      }
    }
  }
  for (const custom of state.customInventory) {
    total += (custom.weight ?? 0) * Math.max(0, custom.quantity ?? 1);
  }
  return Math.round(total * 100) / 100;
}

/**
 * Applies cascading resets when race changes.
 */
export function applyRaceChange(
  prev: CharacterSheetState,
  raceId: RaceId
): CharacterSheetState {
  const race = getRaceDefinition(raceId);
  let nextProfession = prev.professionId;

  if (race.lockedProfessionId) {
    nextProfession = race.lockedProfessionId;
  } else if (
    nextProfession === 'witcher' ||
    nextProfession === 'vampire'
  ) {
    nextProfession = '';
  }

  if (
    prev.mode === 'simple' &&
    nextProfession &&
    race.restrictedProfessions?.includes(nextProfession)
  ) {
    nextProfession = '';
  }

  let nextRegion = prev.standardLifepath.region;
  let nextOriginIndex = prev.standardLifepath.originIndex;
  if (race.defaultOrigin) {
    nextRegion = race.defaultOrigin.region;
    nextOriginIndex = race.defaultOrigin.originIndex;
  } else if (nextRegion && !race.allowedRegions.includes(nextRegion)) {
    nextRegion = '';
    nextOriginIndex = null;
  }

  const nextMagicalGiftId = canCharacterTakeMagicalGift(
    raceId,
    nextProfession,
    prev.mode
  )
    ? prev.magicalGiftId
    : '';

  const nextState: CharacterSheetState = {
    ...prev,
    raceId,
    magicalGiftId: nextMagicalGiftId,
    standardLifepath: {
      ...prev.standardLifepath,
      region: nextRegion,
      originIndex: nextOriginIndex,
      siblingsCount:
        prev.standardLifepath.siblingsCount !== null
          ? Math.min(prev.standardLifepath.siblingsCount, race.maxSiblings)
          : null,
      siblingsDetails: prev.standardLifepath.siblingsDetails.slice(
        0,
        race.maxSiblings
      ),
    },
  };

  if (nextProfession !== prev.professionId) {
    return applyProfessionChange(nextState, nextProfession);
  }
  return nextState;
}

/**
 * Applies cascading profession skill, magic, and starter gear initializations when profession changes.
 */
export function applyProfessionChange(
  prev: CharacterSheetState,
  professionId: CharacterProfessionId | ''
): CharacterSheetState {
  if (!professionId) {
    return {
      ...prev,
      professionId: '',
      professionSkillRanks: {},
      selectedCombatSkills: [],
      selectedCraftSkill: '',
      selectedLanguages: [],
      selectedSpells: [],
      selectedInvocations: [],
      selectedRituals: [],
      selectedHexes: [],
      selectedVampirePowers: [],
      magicalGiftId: '',
      selectedStarterGearIds: [],
      witcherDecoctionFormulaId: '',
      witcherOilFormulaIds: ['', ''],
      witcherPotionFormulaIds: ['', ''],
    };
  }

  const prof = getProfessionDefinition(professionId);
  const initialRanks: Partial<Record<SkillId, number>> = {};
  for (const skillId of prof.fixedSkills) {
    initialRanks[skillId] = prev.mode === 'simple' ? 1 : 0;
  }

  const combatSlotsCount = prof.selectableCombatSlots?.count ?? 0;
  const langCount = prof.selectableLanguageCount ?? 0;

  let nextRaceId = prev.raceId;
  if (professionId === 'witcher') {
    nextRaceId = 'witcher';
  } else if (professionId === 'vampire') {
    nextRaceId = 'vampire';
  } else if (nextRaceId === 'witcher' || nextRaceId === 'vampire') {
    nextRaceId = '';
  }

  const nextMagicalGiftId = canCharacterTakeMagicalGift(
    nextRaceId,
    professionId,
    prev.mode
  )
    ? prev.magicalGiftId
    : '';

  return {
    ...prev,
    raceId: nextRaceId,
    professionId,
    definingSkillRank: 1,
    professionSkillRanks: initialRanks,
    selectedCombatSkills: Array.from({ length: combatSlotsCount }, () => '' as SkillId),
    selectedCraftSkill: '',
    selectedLanguages: Array.from({ length: langCount }, () => '' as SkillId),
    selectedSpells: [],
    selectedInvocations: [],
    selectedRituals: [],
    selectedHexes: [],
    selectedVampirePowers: [],
    magicalGiftId: nextMagicalGiftId,
    selectedStarterGearIds: [],
    witcherDecoctionFormulaId: '',
    witcherOilFormulaIds: ['', ''],
    witcherPotionFormulaIds: ['', ''],
  };
}

/**
 * Validates any wizard step against Simple vs Advanced constraints.
 */
export function validateWizardStep(
  step: WizardStepId,
  state: CharacterSheetState,
  lang: ModuleLanguage
): { valid: boolean; errors: string[] } {
  const copy = getCharacterGeneratorCopy(lang);
  const errors: string[] = [];
  const isSimple = state.mode === 'simple';

  if (step === 'identity') {
    if (isSimple) {
      if (!state.playerName.trim()) errors.push(copy.errors.missingPlayerName);
      if (!state.characterName.trim()) errors.push(copy.errors.missingCharacterName);
      if (!state.gender) errors.push(copy.errors.missingGender);
    }
    if (!state.raceId) errors.push(copy.errors.missingRace);
    if (!state.professionId) errors.push(copy.errors.missingProfession);
    if (
      isSimple &&
      isProfessionRestrictedForRace(state.raceId, state.professionId)
    ) {
      errors.push(copy.errors.halflingRestricted);
    }
  }

  if (step === 'lifepath') {
    const track = resolveLifepathTrack(state);
    if (track === 'custom') {
      if (
        isSimple &&
        (!state.customLifepath.origin.trim() || !state.customLifepath.age.trim())
      ) {
        errors.push(copy.errors.incompleteCustomLifepath);
      }
    } else if (track === 'standard' && isSimple) {
      const lp = state.standardLifepath;
      const incomplete =
        !lp.region ||
        lp.originIndex === null ||
        !lp.familyStatus ||
        !lp.parentsStatus ||
        (lp.familyStatus === 'tragedy' && lp.familyFateIndex === null) ||
        (lp.parentsStatus === 'dead' && lp.parentalFateIndex === null) ||
        lp.familyStandingIndex === null ||
        lp.mentorIndex === null ||
        lp.siblingsCount === null ||
        lp.ageDecade === null;
      if (incomplete) {
        errors.push(copy.errors.incompleteStandardLifepath);
      }
    } else if (track === 'witcher' && isSimple) {
      const w = state.witcherLifepath;
      if (
        !w.ageTaken ||
        !w.school ||
        !w.earlyTrainingResult ||
        !w.trialResult ||
        w.importantEventIndex === null ||
        w.currentStatusIndex === null
      ) {
        errors.push(copy.errors.incompleteWitcherLifepath);
      }
    } else if (track === 'mage' && isSimple) {
      const m = state.mageLifepath;
      const hasLegacyCore = Boolean(
        m.ageEntered &&
          m.academy &&
          m.trainingResult &&
          m.graduationResult &&
          m.importantEventIndex !== null &&
          m.currentStatusIndex !== null
      );
      const hasChaosPath = Boolean(
        (m.birthLocationIndex !== null && m.birthLocationIndex !== undefined || m.elderlandConclave) &&
          m.familySizeIndex !== null &&
          m.familySizeIndex !== undefined &&
          m.discoveryIndex !== null &&
          m.discoveryIndex !== undefined &&
          m.reactionIndex !== null &&
          m.reactionIndex !== undefined &&
          m.academy &&
          m.academiaDecade1Index !== null &&
          m.academiaDecade1Index !== undefined &&
          m.academiaDecade2Index !== null &&
          m.academiaDecade2Index !== undefined
      );
      if (!hasLegacyCore && !hasChaosPath) {
        errors.push(copy.errors.incompleteMageLifepath);
      }
    }
  }

  if (step === 'stats') {
    if (!state.ignoreStatBudget) {
      const remaining = state.statBudget - getStatPointsSpent(state);
      if (remaining !== 0) {
        errors.push(copy.errors.statsRemaining);
      }
    }
  }

  if (step === 'professionSkills') {
    if (!state.professionId) {
      errors.push(copy.errors.missingProfession);
    } else {
      const prof = getProfessionDefinition(state.professionId);
      if (state.definingSkillRank < 1) {
        errors.push(copy.errors.definingSkillMin);
      }
      const needsCombat = prof.selectableCombatSlots?.count ?? 0;
      const needsCraft = prof.selectableCraftSlots?.count ?? 0;
      const needsLang = prof.selectableLanguageCount ?? 0;

      const filledCombat = state.selectedCombatSkills.filter(Boolean).length;
      const filledCraft = state.selectedCraftSkill ? 1 : 0;
      const filledLang = state.selectedLanguages.filter(Boolean).length;

      if (
        filledCombat < needsCombat ||
        filledCraft < needsCraft ||
        filledLang < needsLang
      ) {
        errors.push(copy.errors.professionSlotsIncomplete);
      }

      if (!state.ignoreSkillBudgets) {
        const activeSkills = getActiveProfessionSkills(state, prof);
        const hasZero = activeSkills.some(
          (id) => (state.professionSkillRanks[id] ?? 0) < 1
        );
        if (hasZero) {
          errors.push(copy.errors.professionSkillMinRank);
        }
        const spent = getProfessionSkillPointsSpent(state);
        if (spent !== state.professionBudget) {
          errors.push(copy.errors.professionSkillsBudget);
        }
      }

      if (isSimple && prof.magicConfig) {
        const cfg = prof.magicConfig;
        const isHalflingDruid =
          state.raceId === 'halfling' && state.professionId === 'druid';
        if (
          (cfg.spells && state.selectedSpells.length < cfg.spells) ||
          (!isHalflingDruid &&
            cfg.invocations &&
            state.selectedInvocations.length < cfg.invocations) ||
          (cfg.rituals && state.selectedRituals.length < cfg.rituals) ||
          (cfg.hexes && state.selectedHexes.length < cfg.hexes) ||
          (cfg.vampirePowers &&
            state.selectedVampirePowers.length < cfg.vampirePowers)
        ) {
          errors.push(copy.errors.magicSlotsIncomplete);
        }
      }
    }
  }

  if (step === 'generalSkills') {
    if (!state.ignoreSkillBudgets) {
      const remaining =
        getGeneralSkillBudget(state) - getGeneralSkillPointsSpent(state);
      if (remaining !== 0) {
        errors.push(copy.errors.generalSkillsBudget);
      }
    }
  }

  if (step === 'gear') {
    if (isSimple && state.professionId) {
      const kit = PROFESSION_STARTER_KITS[state.professionId];
      if (state.selectedStarterGearIds.length !== kit.pickLimit) {
        errors.push(copy.errors.starterGearLimit);
      }
      if (state.professionId === 'witcher') {
        if (
          !state.witcherDecoctionFormulaId ||
          state.witcherOilFormulaIds.some((id) => !id) ||
          state.witcherPotionFormulaIds.some((id) => !id)
        ) {
          errors.push(copy.errors.witcherFormulaeIncomplete);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

function randIndex(len: number): number {
  return Math.floor(Math.random() * len);
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[randIndex(arr.length)];
}

/**
 * Randomizes the Standard guided lifepath honoring Race constraints (Elderlands, max siblings, age).
 */
export function randomizeStandardLifepath(
  state: CharacterSheetState,
  lang: ModuleLanguage
): CharacterSheetState {
  const race = state.raceId ? getRaceDefinition(state.raceId) : null;
  const region: RegionId = race?.defaultOrigin
    ? race.defaultOrigin.region
    : race
      ? pickRandom(race.allowedRegions)
      : pickRandom(['north', 'nilfgaard', 'elderlands'] as const);

  const regionDef = REGIONS_DATA.find((r) => r.id === region)!;
  const originIndex = race?.defaultOrigin
    ? race.defaultOrigin.originIndex
    : randIndex(regionDef.origins.length);

  const familyStatus: 'alive' | 'tragedy' =
    Math.random() < 0.5 ? 'alive' : 'tragedy';
  const parentsStatus: 'alive' | 'dead' =
    Math.random() < 0.5 ? 'alive' : 'dead';

  const maxSiblings = race ? race.maxSiblings : 5;
  const siblingsCount =
    maxSiblings > 0 ? Math.floor(Math.random() * (maxSiblings + 1)) : 0;
  const siblingsDetails = Array.from({ length: siblingsCount }, () =>
    rollSiblingDescription(lang)
  );

  const allowedDecades: readonly (2 | 3 | 4 | 5)[] =
    race?.allowElderAges ? [2, 3, 4, 5] : [2, 3, 4];
  const ageDecade = pickRandom(allowedDecades);
  const decadeEvents = Array.from({ length: ageDecade }, () =>
    rollStandardDecadeEvent(lang)
  );

  return {
    ...state,
    standardLifepath: {
      region,
      originIndex,
      familyStatus,
      parentsStatus,
      familyFateIndex:
        familyStatus === 'tragedy'
          ? randIndex(FAMILY_FATES[region].length)
          : null,
      parentalFateIndex:
        parentsStatus === 'dead'
          ? randIndex(PARENTAL_FATES[region].length)
          : null,
      familyStandingIndex: randIndex(FAMILY_STANDINGS[region].length),
      mentorIndex: randIndex(MENTORS_DATA[region].length),
      siblingsCount,
      siblingsDetails,
      ageDecade,
      decadeEvents,
    },
  };
}

/**
 * Computes Witcher Early Training & Trial of the Grasses outcome from Age Taken + 1d10 roll.
 */
export function rollWitcherTrainingAndTrial(
  ageTaken: '1-2' | '4-6' | '8-11',
  lang: ModuleLanguage
): { earlyTrainingResult: string; trialResult: string } {
  const ageMeta =
    WITCHER_AGES.find((a) => a.id === ageTaken) ?? WITCHER_AGES[1];
  const earlyEntry = pickRandom(WITCHER_EARLY_TRAINING);
  const roll = Math.floor(Math.random() * 10) + 1;
  const score = roll + ageMeta.trialModifier + earlyEntry.bonus;

  let outcomeIdx = 2;
  if (score <= 1) outcomeIdx = 0;
  else if (score <= 4) outcomeIdx = 1;
  else if (score <= 8) outcomeIdx = 2;
  else outcomeIdx = 3;

  return {
    earlyTrainingResult: earlyEntry.text[lang],
    trialResult: WITCHER_TRIAL_OUTCOMES[outcomeIdx][lang],
  };
}

export function randomizeWitcherLifepath(
  state: CharacterSheetState,
  lang: ModuleLanguage
): CharacterSheetState {
  const ageTaken = pickRandom(WITCHER_AGES).id;
  const school = pickRandom(WITCHER_SCHOOLS).id;
  const { earlyTrainingResult, trialResult } = rollWitcherTrainingAndTrial(
    ageTaken,
    lang
  );
  const risks: readonly DecadeRiskLevel[] = [
    'safe',
    'ordinary',
    'reckless',
    'risky',
  ];
  const decadeSafety: [DecadeRiskLevel, DecadeRiskLevel, DecadeRiskLevel] = [
    pickRandom(risks),
    pickRandom(risks),
    pickRandom(risks),
  ];
  const decadeEvents: [string, string, string] = [
    rollWitcherDecadeEvent(decadeSafety[0], lang),
    rollWitcherDecadeEvent(decadeSafety[1], lang),
    rollWitcherDecadeEvent(decadeSafety[2], lang),
  ];

  return {
    ...state,
    witcherLifepath: {
      ageTaken,
      school,
      earlyTrainingResult,
      trialResult,
      importantEventIndex: randIndex(WITCHER_IMPORTANT_EVENTS.length),
      currentStatusIndex: randIndex(WITCHER_CURRENT_STATUS.length),
      decadeSafety,
      decadeEvents,
    },
  };
}

export function rollMageTrainingAndGraduation(
  ageEntered: '2-6' | '7-12' | '12+',
  lang: ModuleLanguage
): { trainingResult: string; graduationResult: string } {
  const ageMeta = MAGE_AGES.find((a) => a.id === ageEntered) ?? MAGE_AGES[1];
  const training = pickRandom(MAGE_TRAINING_EVENTS);
  const roll = Math.floor(Math.random() * 10) + 1;
  const score = roll + ageMeta.modifier + training.modifier;

  let outcomeIdx = 2;
  if (score <= 1) outcomeIdx = 0;
  else if (score <= 4) outcomeIdx = 1;
  else if (score <= 8) outcomeIdx = 2;
  else outcomeIdx = 3;

  return {
    trainingResult: training.text[lang],
    graduationResult: MAGE_GRADUATION_OUTCOMES[outcomeIdx][lang],
  };
}

export function rollChaosMageDecade(
  style: NonNullable<CharacterSheetState['mageLifepath']['chaosDecades']>[number]['style'],
  lang: ModuleLanguage
): NonNullable<CharacterSheetState['mageLifepath']['chaosDecades']>[number] {
  const styleDef =
    MAGE_DECADE_STYLES.find((s) => s.id === style) ?? MAGE_DECADE_STYLES[0];
  const dangerRoll = Math.floor(Math.random() * 100) + 1;
  const dangerTriggered = dangerRoll <= styleDef.dangerPct;
  const dangerIndex = dangerTriggered ? randIndex(10) : null;
  let grudgeText = '';
  if (
    dangerTriggered &&
    ((style === 'cautious' && dangerIndex === 0) ||
      (style === 'politicking' && (dangerIndex === 4 || dangerIndex === 8)))
  ) {
    grudgeText = rollMageGrudgeSummary(lang);
  }

  const eventD10 = Math.floor(Math.random() * 10) + 1;
  const eventOutcome = styleDef.rollEventOutcome(eventD10);
  let eventIndex: number | null = null;
  let eventDetail = '';
  if (eventOutcome === 'benefit') {
    eventIndex = randIndex(MAGE_BENEFIT_EVENTS.length);
    eventDetail = MAGE_BENEFIT_EVENTS[eventIndex][lang];
  } else if (eventOutcome === 'ally') {
    eventDetail = rollMageAllySummary(lang);
  } else if (eventOutcome === 'knowledge') {
    eventIndex = randIndex(MAGE_KNOWLEDGE_EVENTS.length);
    eventDetail = MAGE_KNOWLEDGE_EVENTS[eventIndex][lang];
  } else {
    eventDetail = lang === 'fr' ? 'Rien de notable cette décennie.' : 'Nothing notable this decade.';
  }

  return {
    style,
    dangerTriggered,
    dangerRoll,
    dangerIndex,
    grudgeText,
    eventOutcome,
    eventIndex,
    eventDetail,
  };
}

export function randomizeMageLifepath(
  state: CharacterSheetState,
  lang: ModuleLanguage
): CharacterSheetState {
  const birthLocationIndex = randIndex(MAGE_BIRTH_LOCATIONS.length);
  const birthEntry = MAGE_BIRTH_LOCATIONS[birthLocationIndex];
  const isElderRace =
    state.raceId === 'elf' ||
    state.raceId === 'gnome' ||
    state.raceId === 'vran' ||
    state.raceId === 'werebbub';
  const elderlandConclave = isElderRace && Math.random() < 0.65;

  const reactionRegion: RegionId = elderlandConclave
    ? 'elderlands'
    : birthEntry.regionId;

  const familySizeIndex = randIndex(MAGE_FAMILY_SIZES.length);
  const familyPersonalityIndex = randIndex(MAGE_FAMILY_PERSONALITIES.length);
  const familyStatusIndex = randIndex(MAGE_FAMILY_STATUSES.length);
  const discoveryIndex = randIndex(MAGE_DISCOVERIES.length);
  const discoveryMod = MAGE_DISCOVERIES[discoveryIndex].nextRollMod;
  const rawReaction = Math.floor(Math.random() * 6) + 1 + discoveryMod;
  const reactionIndex = Math.max(0, Math.min(5, rawReaction - 1));

  // School selection aligned with region/gender guidelines
  let schoolId = getChaosSchoolDefinition('aretuza').id;
  if (reactionRegion === 'elderlands') {
    schoolId = 'minor-academia';
  } else if (reactionRegion === 'nilfgaard') {
    schoolId = 'gweison-haul';
  } else {
    schoolId = state.gender === 'male' ? 'ban-ard' : 'aretuza';
  }
  const schoolDef = MAGE_CHAOS_SCHOOLS.find((s) => s.id === schoolId) ?? MAGE_CHAOS_SCHOOLS[0];

  const academiaDecade1Index = randIndex(MAGE_ACADEMIA_EVENTS[schoolId].length);
  const academiaDecade2Index = randIndex(MAGE_ACADEMIA_EVENTS[schoolId].length);

  const forcedApprentice =
    (schoolId === 'ban-ard' && (academiaDecade1Index === 1 || academiaDecade2Index === 1)) ||
    (schoolId === 'gweison-haul' && (academiaDecade1Index === 1 || academiaDecade2Index === 1)) ||
    (schoolId === 'aretuza' && (academiaDecade1Index === 8 || academiaDecade2Index === 8));
  const apprenticeRoll = Math.floor(Math.random() * 6) + 1;
  const wasApprentice =
    forcedApprentice || apprenticeRoll >= schoolDef.apprenticeMinRoll1d6;

  const chaosDecades = [0, 1].map(() =>
    rollChaosMageDecade(pickRandom(MAGE_DECADE_STYLES).id, lang)
  );

  // Also keep legacy core summary fields populated for backwards compatibility & PDF export
  const ageEntered = pickRandom(MAGE_AGES).id;
  const { trainingResult, graduationResult } = rollMageTrainingAndGraduation(
    ageEntered,
    lang
  );

  return {
    ...state,
    mageLifepath: {
      ...state.mageLifepath,
      ageEntered,
      academy: schoolId,
      trainingResult:
        `${MAGE_ACADEMIA_EVENTS[schoolId][academiaDecade1Index][lang]} | ${MAGE_ACADEMIA_EVENTS[schoolId][academiaDecade2Index][lang]}` ||
        trainingResult,
      graduationResult,
      importantEventIndex: randIndex(MAGE_IMPORTANT_EVENTS.length),
      currentStatusIndex: randIndex(MAGE_CURRENT_STATUS.length),
      decadeSafety: [
        chaosDecades[0]?.style === 'experimentation' ? 'risky' : 'ordinary',
        chaosDecades[1]?.style === 'experimentation' ? 'risky' : 'ordinary',
        'safe',
      ],
      decadeEvents: [
        chaosDecades[0]
          ? `${chaosDecades[0].eventDetail}${chaosDecades[0].dangerTriggered && chaosDecades[0].dangerIndex !== null && chaosDecades[0].dangerIndex !== undefined ? ` (${MAGE_DANGER_TABLES[chaosDecades[0].style][chaosDecades[0].dangerIndex][lang]})` : ''}`
          : '',
        chaosDecades[1]
          ? `${chaosDecades[1].eventDetail}${chaosDecades[1].dangerTriggered && chaosDecades[1].dangerIndex !== null && chaosDecades[1].dangerIndex !== undefined ? ` (${MAGE_DANGER_TABLES[chaosDecades[1].style][chaosDecades[1].dangerIndex][lang]})` : ''}`
          : '',
        '',
      ],
      birthLocationIndex,
      elderlandConclave,
      familySizeIndex,
      familyPersonalityIndex,
      familyStatusIndex,
      discoveryIndex,
      reactionRegion,
      reactionIndex,
      academiaDecade1Index,
      academiaDecade2Index,
      wasApprentice,
      mentorPersonalityIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_PERSONALITIES.length)
        : null,
      mentorValueIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_VALUES.length)
        : null,
      mentorClothingIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_CLOTHING.length)
        : null,
      mentorHatredIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_HATREDS.length)
        : null,
      mentorTeachingIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_TEACHING_STYLES.length)
        : null,
      mentorMomentIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_MOMENTS.length)
        : null,
      mentorEndingIndex: wasApprentice
        ? randIndex(MAGE_MENTOR_ENDINGS.length)
        : null,
      chaosDecades,
    },
  };
}

/**
 * Generates a fully legal, table-ready character across all 6 steps.
 */
export function generateFullRandomCharacter(
  mode: GeneratorMode,
  lang: ModuleLanguage
): CharacterSheetState {
  let state = createInitialCharacterState(mode);
  const namesFr = [
    'Aeloria',
    'Bram',
    'Caelum',
    'Daria',
    'Eskil',
    'Falka',
    'Garrick',
    'Hela',
    'Iorveth',
    'Jaskier',
    'Kiera',
    'Letho',
    'Marek',
    'Nadia',
    'Olgierd',
    'Priscilla',
    'Radovid',
    'Syanna',
    'Torin',
    'Yennefer',
  ];

  const availableRaces =
    mode === 'simple'
      ? RACES_DATA.filter((r) => !r.isExtended)
      : RACES_DATA;
  const chosenRace = pickRandom(availableRaces);

  let chosenProf: ProfessionDefinition;
  if (chosenRace.lockedProfessionId) {
    chosenProf = getProfessionDefinition(chosenRace.lockedProfessionId);
  } else {
    const allowedProfs = PROFESSIONS_DATA.filter(
      (p) =>
        p.id !== 'witcher' &&
        p.id !== 'vampire' &&
        (mode === 'advanced' || !p.isExtended) &&
        !chosenRace.restrictedProfessions?.includes(p.id)
    );
    chosenProf = pickRandom(allowedProfs);
  }

  state = applyRaceChange(state, chosenRace.id);
  state = applyProfessionChange(state, chosenProf.id);
  state.playerName = lang === 'fr' ? 'Maître de Jeu' : 'Game Master';
  state.characterName = pickRandom(namesFr);
  state.gender = Math.random() < 0.5 ? 'male' : 'female';

  // Lifepath
  const track = resolveLifepathTrack(state);
  if (track === 'witcher') state = randomizeWitcherLifepath(state, lang);
  else if (track === 'mage') state = randomizeMageLifepath(state, lang);
  else state = randomizeStandardLifepath(state, lang);

  // Primary stats (distribute 60 points between 3 and 9 cleanly)
  const stats = { ...state.stats };
  for (const key of PRIMARY_STAT_KEYS) stats[key] = 5;
  let remainingStats = state.statBudget - 45;
  while (remainingStats > 0) {
    const k = pickRandom(PRIMARY_STAT_KEYS);
    if (stats[k] < 9) {
      stats[k] += 1;
      remainingStats -= 1;
    }
  }
  state.stats = stats;

  // Selectable profession slots
  if (chosenProf.selectableCombatSlots) {
    const pool = [...chosenProf.selectableCombatSlots.options].sort(
      () => Math.random() - 0.5
    );
    state.selectedCombatSkills = pool.slice(
      0,
      chosenProf.selectableCombatSlots.count
    );
  }
  if (chosenProf.selectableCraftSlots) {
    state.selectedCraftSkill = pickRandom(
      chosenProf.selectableCraftSlots.options
    );
  }
  if (chosenProf.selectableLanguageCount) {
    const native = getNativeLanguageSkillId(state);
    const pool = LANGUAGE_SKILLS.filter((l) => l !== native).sort(
      () => Math.random() - 0.5
    );
    state.selectedLanguages = pool.slice(
      0,
      chosenProf.selectableLanguageCount
    );
  }

  // Profession skills (min 1 everywhere + spend remaining up to 44 cleanly)
  const activeSkills = getActiveProfessionSkills(state, chosenProf);
  const profRanks: Partial<Record<SkillId, number>> = {};
  for (const id of activeSkills) {
    profRanks[id] = 1;
  }
  state.definingSkillRank = 3;
  state.professionSkillRanks = profRanks;

  const waiveDoubleCost = chosenRace.id === 'vampire';
  let safetyLoops = 0;
  while (
    getProfessionSkillPointsSpent(state) < state.professionBudget &&
    safetyLoops < 300
  ) {
    safetyLoops += 1;
    const rem = state.professionBudget - getProfessionSkillPointsSpent(state);
    if (rem >= 2 && Math.random() < 0.75) {
      const candidate = pickRandom(activeSkills);
      const def = getSkillDefinition(candidate);
      const cost = def.doubleCost && !waiveDoubleCost ? 2 : 1;
      const cur = state.professionSkillRanks[candidate] ?? 1;
      if (cur < 6 && rem >= cost) {
        state.professionSkillRanks[candidate] = cur + 1;
      }
    } else if (state.definingSkillRank < 6) {
      state.definingSkillRank += 1;
    } else {
      const single = activeSkills.filter(
        (id) =>
          (!getSkillDefinition(id).doubleCost || waiveDoubleCost) &&
          (state.professionSkillRanks[id] ?? 1) < 6
      );
      if (single.length > 0) {
        const picked = pickRandom(single);
        state.professionSkillRanks[picked] =
          (state.professionSkillRanks[picked] ?? 1) + 1;
      } else {
        break;
      }
    }
  }

  // General skills (spend INT + REF cleanly)
  const generalPool = [...getAvailableGeneralSkills(state)];
  const generalRanks: Partial<Record<SkillId, number>> = {};
  let genLoops = 0;
  const genBudget = getGeneralSkillBudget(state);
  const spentGeneral = () =>
    Object.entries(generalRanks).reduce(
      (sum, [id, r]) =>
        sum + getSkillPointCost(id as SkillId, r ?? 0, waiveDoubleCost),
      0
    );
  while (spentGeneral() < genBudget && genLoops < 200) {
    genLoops += 1;
    const rem = genBudget - spentGeneral();
    const candidate = pickRandom(generalPool);
    const def = getSkillDefinition(candidate);
    const cost = def.doubleCost && !waiveDoubleCost ? 2 : 1;
    const cur = generalRanks[candidate] ?? 0;
    if (cur < 5 && rem >= cost) {
      generalRanks[candidate] = cur + 1;
    }
  }
  state.generalSkillRanks = generalRanks;

  // Magic
  if (chosenProf.magicConfig) {
    const pools = getMagicPoolsForState(state);
    const takeUniqueIds = (arr: MagicEntry[], count: number) =>
      [...arr]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map((e) => e.id);

    if (chosenProf.magicConfig.spells) {
      state.selectedSpells = takeUniqueIds(
        pools.spells,
        chosenProf.magicConfig.spells
      );
    }
    if (chosenProf.magicConfig.invocations) {
      const isHalflingDruid =
        chosenRace.id === 'halfling' && chosenProf.id === 'druid';
      state.selectedInvocations = isHalflingDruid
        ? []
        : takeUniqueIds(
            pools.invocations,
            chosenProf.magicConfig.invocations
          );
    }
    if (chosenProf.magicConfig.rituals) {
      state.selectedRituals = takeUniqueIds(
        pools.rituals,
        chosenProf.magicConfig.rituals
      );
    }
    if (chosenProf.magicConfig.hexes) {
      state.selectedHexes = takeUniqueIds(
        pools.hexes,
        chosenProf.magicConfig.hexes
      );
    }
    if (chosenProf.magicConfig.vampirePowers) {
      state.selectedVampirePowers = takeUniqueIds(
        pools.vampirePowers,
        chosenProf.magicConfig.vampirePowers
      );
    }
  }

  // Gear
  const kit = PROFESSION_STARTER_KITS[chosenProf.id];
  state.selectedStarterGearIds = [...kit.selectableItems]
    .sort(() => Math.random() - 0.5)
    .slice(0, kit.pickLimit)
    .map((item) => item.id);

  if (chosenProf.id === 'witcher') {
    const formulae = getWitcherFormulaOptions();
    if (formulae.decoctions.length > 0) {
      state.witcherDecoctionFormulaId = pickRandom(formulae.decoctions).id;
    }
    const shuffledOils = [...formulae.oils].sort(() => Math.random() - 0.5);
    state.witcherOilFormulaIds = [
      shuffledOils[0]?.id ?? '',
      shuffledOils[1]?.id ?? shuffledOils[0]?.id ?? '',
    ];
    const shuffledPotions = [...formulae.potions].sort(() => Math.random() - 0.5);
    state.witcherPotionFormulaIds = [
      shuffledPotions[0]?.id ?? '',
      shuffledPotions[1]?.id ?? shuffledPotions[0]?.id ?? '',
    ];
  }

  return state;
}

/**
 * Formats a clean Markdown/plain-text dossier for clipboard copy.
 */
export function formatCharacterDossierText(
  state: CharacterSheetState,
  lang: ModuleLanguage
): string {
  const race = state.raceId ? getRaceDefinition(state.raceId) : null;
  const prof = state.professionId
    ? getProfessionDefinition(state.professionId)
    : null;
  const derived = calculateDerivedStats(state);
  const lines: string[] = [];

  lines.push(
    `=== ${state.characterName || (lang === 'fr' ? 'Personnage sans nom' : 'Unnamed Character')} ===`
  );
  lines.push(
    `${lang === 'fr' ? 'Joueur' : 'Player'}: ${state.playerName || '—'} | ${lang === 'fr' ? 'Race' : 'Race'}: ${race ? race.name[lang] : '—'} | ${lang === 'fr' ? 'Profession' : 'Profession'}: ${prof ? prof.name[lang] : '—'}`
  );
  lines.push('');

  lines.push(
    `-- ${lang === 'fr' ? 'Caractéristiques' : 'Primary Stats'} --`
  );
  lines.push(
    PRIMARY_STAT_KEYS.map((k) => `${k}: ${state.stats[k]}`).join(' | ')
  );
  lines.push(
    `HP: ${derived.hp} | STA: ${derived.stamina} | REC: ${derived.recovery} | STUN: ${derived.stun} | RUN: ${derived.run}m | LEAP: ${derived.leap}m | ENC: ${derived.encumbrance}kg | VIGOR: ${derived.vigor}`
  );
  lines.push('');

  lines.push(`-- ${lang === 'fr' ? 'Compétences apprises' : 'Learned Skills'} --`);
  if (prof) {
    const defBase =
      prof.definingSkill[lang];
    lines.push(`${defBase} (${lang === 'fr' ? 'Signature' : 'Defining'}): ${state.definingSkillRank}`);
  }
  for (const skill of SKILLS_CATALOG) {
    const rank = getEffectiveSkillRank(state, skill.id);
    if (rank > 0) {
      const statVal = state.stats[skill.attribute] ?? 0;
      lines.push(
        `- ${skill.name[lang]} (${skill.attribute} ${statVal} + ${rank}) = ${statVal + rank}`
      );
    }
  }
  lines.push('');

  const gift = state.magicalGiftId
    ? getMagicalGiftById(state.magicalGiftId)
    : undefined;
  const magicIds = [
    ...state.selectedSpells,
    ...state.selectedInvocations,
    ...state.selectedRituals,
    ...state.selectedHexes,
    ...state.selectedVampirePowers,
  ];
  if (prof?.magicConfig?.autoBasicSigns || magicIds.length > 0 || gift) {
    lines.push(`-- ${lang === 'fr' ? 'Magie & Pouvoirs' : 'Magic & Powers'} --`);
    if (gift) {
      lines.push(
        `- ${lang === 'fr' ? 'Don Magique' : 'Magical Gift'}: ${gift.name[lang]} (${gift.stamina} END) — ${gift.effect[lang]} | ${lang === 'fr' ? 'Effet secondaire' : 'Side Effect'}: ${gift.sideEffect[lang]}`
      );
    }
    if (prof?.magicConfig?.autoBasicSigns) {
      lines.push('- Signes de base : Aard, Axii, Igni, Quen, Yrden');
    }
    for (const id of magicIds) {
      const entry = getMagicEntryById(id);
      if (entry) {
        lines.push(`- ${entry.name[lang]} (${entry.school[lang]}, ${entry.stamina} END)`);
      }
    }
    lines.push('');
  }

  lines.push(`-- ${lang === 'fr' ? 'Équipement' : 'Equipment'} --`);
  if (prof) {
    if (prof.startingTreasure) {
      lines.push(
        `- ${lang === 'fr' ? 'Trésor de départ' : 'Starting Treasure'}: ${prof.startingTreasure[lang]}`
      );
    }
    const kit = PROFESSION_STARTER_KITS[prof.id];
    for (const f of kit.freeItems) lines.push(`- ${f.name[lang]}`);
    for (const s of kit.selectableItems) {
      if (state.selectedStarterGearIds.includes(s.id)) {
        lines.push(`- ${s.name[lang]}`);
      }
    }
  }
  for (const c of state.customInventory) {
    lines.push(`- ${c.name} x${c.quantity}`);
  }

  const allFormulaIds = [
    state.witcherDecoctionFormulaId,
    ...state.witcherOilFormulaIds,
    ...state.witcherPotionFormulaIds,
  ].filter(Boolean);
  for (const fid of allFormulaIds) {
    const found = FORMULAE_DATA.find((f) => f.id === fid);
    if (found) lines.push(`- ${lang === 'fr' ? 'Formule' : 'Formula'}: ${found.name[lang]}`);
  }

  if (state.personalDescription.trim()) {
    lines.push('');
    lines.push(`-- ${lang === 'fr' ? 'Notes' : 'Notes'} --`);
    lines.push(state.personalDescription.trim());
  }

  return lines.join('\n');
}

export function serializeCharacterJson(state: CharacterSheetState): string {
  return JSON.stringify(state, null, 2);
}

export function parseImportedCharacterJson(
  raw: string
): CharacterSheetState | null {
  try {
    const parsed = JSON.parse(raw) as Partial<CharacterSheetState>;
    if (!parsed || typeof parsed !== 'object' || !parsed.stats) {
      return null;
    }
    const base = createInitialCharacterState(
      parsed.mode === 'advanced' ? 'advanced' : 'simple'
    );
    return {
      ...base,
      ...parsed,
      standardLifepath: {
        ...base.standardLifepath,
        ...(parsed.standardLifepath ?? {}),
      },
      witcherLifepath: {
        ...base.witcherLifepath,
        ...(parsed.witcherLifepath ?? {}),
      },
      mageLifepath: {
        ...base.mageLifepath,
        ...(parsed.mageLifepath ?? {}),
      },
      customLifepath: {
        ...base.customLifepath,
        ...(parsed.customLifepath ?? {}),
      },
      stats: {
        ...base.stats,
        ...parsed.stats,
      },
    };
  } catch {
    return null;
  }
}
