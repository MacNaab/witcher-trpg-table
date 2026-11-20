import type { BestiaryCombatVariant, BestiaryEntry } from '@/src/data/bestiary/types';
import type { CharacterSheetState } from '@/src/modules/character-generator/types';
import { calculateDerivedStats } from '@/src/modules/character-generator/utils/characterCalculations';
import {
  CONDITIONS_MAP,
  CRITICAL_TIER_META,
  CRITICAL_WOUNDS_TABLES,
  FUMBLE_TABLES,
  HUMAN_HIT_LOCATIONS,
  MONSTER_HIT_LOCATIONS,
  getHitLocationsForAnatomy,
  getLocationLabel,
} from '../data/combatRulesData';
import type {
  AnatomyType,
  ArmorZoneState,
  CombatLogEntry,
  CombatLogType,
  CombatTrackerState,
  Combatant,
  CombatantRole,
  CombatantStats,
  CombatantWeapon,
  ConditionId,
  CriticalSeverity,
  CriticalWoundRecord,
  DamageType,
  FumbleCategoryId,
  HitLocationId,
  HitLocationRow,
  ModuleLanguage,
  PenetrationTier,
} from '../types';
import { extractPcGearFromCharacterSheet } from './pcGearExtraction';

export const COMBAT_TRACKER_STORAGE_KEY = 'witcher-gm-combat-tracker-v1';

/**
 * Generates a unique client-side identifier.
 */
export function generateId(prefix = 'ct'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function roll2d6(): number {
  return rollDie(6) + rollDie(6);
}

export interface WitcherD10Result {
  natural: number;
  rolls: number[];
  /** Net modifier produced by the die (positive on normal/crit, negative on fumble). */
  dieValue: number;
  isCritSuccess: boolean;
  isCritFail: boolean;
  /** Severity score for the Fumble table when natural === 1 (sum of negative explosion rolls). */
  fumbleSeverity: number;
}

/**
 * Official Witcher TRPG exploding 1d10:
 * - Natural 10 explodes upward (keep rolling and adding while 10 is rolled).
 * - Natural 1 triggers a critical fumble: roll again (exploding on 10) and subtract from base.
 */
export function rollWitcherD10(): WitcherD10Result {
  const first = rollDie(10);
  if (first === 10) {
    const rolls = [10];
    let total = 10;
    let next = rollDie(10);
    rolls.push(next);
    total += next;
    let safety = 0;
    while (next === 10 && safety < 20) {
      next = rollDie(10);
      rolls.push(next);
      total += next;
      safety += 1;
    }
    return {
      natural: 10,
      rolls,
      dieValue: total,
      isCritSuccess: true,
      isCritFail: false,
      fumbleSeverity: 0,
    };
  }

  if (first === 1) {
    const rolls = [1];
    let penalty = 0;
    let next = rollDie(10);
    rolls.push(next);
    penalty += next;
    let safety = 0;
    while (next === 10 && safety < 20) {
      next = rollDie(10);
      rolls.push(next);
      penalty += next;
      safety += 1;
    }
    return {
      natural: 1,
      rolls,
      dieValue: -penalty,
      isCritSuccess: false,
      isCritFail: true,
      fumbleSeverity: penalty,
    };
  }

  return {
    natural: first,
    rolls: [first],
    dieValue: first,
    isCritSuccess: false,
    isCritFail: false,
    fumbleSeverity: 0,
  };
}

/**
 * Parses common TRPG dice formulas like "3d6+2", "4d6", "1d10-1", "2d6/2".
 */
export function rollDiceFormula(formula: string): { total: number; detail: string } {
  const cleaned = formula.replace(/\s+/g, '').replace(/−/g, '-').toLowerCase();
  const match = cleaned.match(/^(\d+)d(\d+)([+-]\d+)?(\/\d+)?$/);
  if (!match) {
    const flat = Number.parseInt(cleaned, 10);
    if (!Number.isNaN(flat)) {
      return { total: Math.max(0, flat), detail: `${flat}` };
    }
    const fallback = rollDie(6) + rollDie(6);
    return { total: fallback, detail: `2d6=${fallback}` };
  }

  const count = Math.min(20, Math.max(1, Number.parseInt(match[1], 10)));
  const sides = Math.min(100, Math.max(2, Number.parseInt(match[2], 10)));
  const mod = match[3] ? Number.parseInt(match[3], 10) : 0;
  const divisor = match[4] ? Math.max(1, Number.parseInt(match[4].slice(1), 10)) : 1;

  const rolls: number[] = [];
  let sum = 0;
  for (let i = 0; i < count; i += 1) {
    const r = rollDie(sides);
    rolls.push(r);
    sum += r;
  }

  const total = Math.max(0, Math.floor((sum + mod) / divisor));
  const modStr = mod > 0 ? `+${mod}` : mod < 0 ? `${mod}` : '';
  const divStr = divisor > 1 ? `/${divisor}` : '';
  return {
    total,
    detail: `[${rolls.join('+')}]${modStr}${divStr} = ${total}`,
  };
}

export function getWoundThreshold(maxHp: number): number {
  return Math.max(1, Math.floor(maxHp / 5));
}

export interface EffectiveCombatStats extends CombatantStats {
  isWounded: boolean;
  isDying: boolean;
  isUnconscious: boolean;
  woundThreshold: number;
  attackPenalty: number;
  defensePenalty: number;
}

/**
 * Computes effective combat stats applying Witcher TRPG penalties:
 * - Dying (HP < 0): all stats reduced to 1/3.
 * - Below Wound Threshold (HP < floor(MaxHP / 5)): REF, DEX, INT, VOL halved.
 * - Status Conditions: Frozen (-3 VIT, -1 REF), Intoxicated (-2 REF/DEX/INT),
 *   Blinded (-3 Att/Def), Staggered (-2 Att/Def), Prone (-2 Att/Def).
 */
export function getEffectiveCombatStats(combatant: Combatant): EffectiveCombatStats {
  const woundThreshold = getWoundThreshold(combatant.maxHp);
  const isDying = combatant.hp < 0 && !combatant.isDead;
  const isWounded = !isDying && combatant.hp >= 0 && combatant.hp < woundThreshold;
  const isUnconscious =
    !combatant.isDead &&
    (combatant.end <= 0 ||
      (combatant.nonLethalDmg > 0 && combatant.nonLethalDmg >= combatant.end));

  const base = combatant.stats;
  let ref = base.ref;
  let dex = base.dex;
  let cor = base.cor;
  let vit = base.vit;
  let int = base.int;
  let vol = base.vol;
  let rec = base.rec;
  let etou = base.etou;
  let vig = base.vig;

  if (isDying) {
    ref = Math.max(1, Math.floor(ref / 3));
    dex = Math.max(1, Math.floor(dex / 3));
    cor = Math.max(1, Math.floor(cor / 3));
    vit = Math.max(1, Math.floor(vit / 3));
    int = Math.max(1, Math.floor(int / 3));
    vol = Math.max(1, Math.floor(vol / 3));
    rec = Math.max(1, Math.floor(rec / 3));
    etou = Math.max(1, Math.floor(etou / 3));
    vig = Math.floor(vig / 3);
  } else if (isWounded) {
    ref = Math.max(1, Math.floor(ref / 2));
    dex = Math.max(1, Math.floor(dex / 2));
    int = Math.max(1, Math.floor(int / 2));
    vol = Math.max(1, Math.floor(vol / 2));
  }

  if (combatant.conditions.includes('frozen')) {
    vit = Math.max(1, vit - 3);
    ref = Math.max(1, ref - 1);
  }
  if (combatant.conditions.includes('intoxicated')) {
    ref = Math.max(1, ref - 2);
    dex = Math.max(1, dex - 2);
    int = Math.max(1, int - 2);
  }

  let attackPenalty = 0;
  let defensePenalty = 0;
  if (combatant.conditions.includes('blinded')) {
    attackPenalty -= 3;
    defensePenalty -= 3;
  }
  if (combatant.conditions.includes('staggered')) {
    attackPenalty -= 2;
    defensePenalty -= 2;
  }
  if (combatant.conditions.includes('prone')) {
    attackPenalty -= 2;
    defensePenalty -= 2;
  }
  if (combatant.quickDraw) {
    attackPenalty -= 3;
  }

  return {
    ref,
    dex,
    cor,
    vit,
    int,
    vol,
    rec,
    etou,
    vig,
    isWounded,
    isDying,
    isUnconscious,
    woundThreshold,
    attackPenalty,
    defensePenalty,
  };
}

export function createDefaultArmor(
  sp: number,
  anatomy: AnatomyType
): Record<HitLocationId, ArmorZoneState> {
  const safeSp = Math.max(0, Math.round(sp));
  const isHuman = anatomy === 'human';
  return {
    head: { current: safeSp, max: safeSp },
    torso: { current: safeSp, max: safeSp },
    rightArm: { current: safeSp, max: safeSp },
    leftArm: { current: safeSp, max: safeSp },
    rightLeg: { current: safeSp, max: safeSp },
    leftLeg: { current: isHuman ? safeSp : 0, max: isHuman ? safeSp : 0 },
  };
}

export function getActiveArmorLocations(anatomy: AnatomyType): readonly HitLocationId[] {
  if (anatomy === 'human') {
    return ['head', 'torso', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'];
  }
  return ['head', 'torso', 'rightArm', 'leftArm', 'rightLeg'];
}

/**
 * Sorts combatants descending by effective initiative (Quick Draw adds +3 for this round),
 * breaking ties via tieBreaker roll, then REF, then name.
 */
export function sortCombatantsByInitiative(
  combatants: readonly Combatant[]
): Combatant[] {
  return [...combatants].sort((a, b) => {
    const aEff = a.initiative + (a.quickDraw ? 3 : 0);
    const bEff = b.initiative + (b.quickDraw ? 3 : 0);
    if (bEff !== aEff) return bEff - aEff;
    if (b.tieBreaker !== a.tieBreaker) return b.tieBreaker - a.tieBreaker;
    if (b.stats.ref !== a.stats.ref) return b.stats.ref - a.stats.ref;
    return a.name.localeCompare(b.name);
  });
}

export function resolveHitLocation(
  anatomy: AnatomyType,
  roll1d10: number,
  targetedLocation?: HitLocationId | 'random'
): HitLocationRow {
  const table = getHitLocationsForAnatomy(anatomy);
  if (targetedLocation && targetedLocation !== 'random') {
    const explicit = table.find((r) => r.id === targetedLocation);
    if (explicit) return explicit;
  }

  let effectiveRoll = Math.min(10, Math.max(1, roll1d10));
  // Specters have no legs/lower limbs (guide/combat.md line 333) -> re-roll 10 to torso
  if (anatomy === 'specter' && effectiveRoll === 10) {
    effectiveRoll = 2;
  }

  return (
    table.find((r) => effectiveRoll >= r.d10Min && effectiveRoll <= r.d10Max) ??
    table[1] ??
    HUMAN_HIT_LOCATIONS[1]
  );
}

export function getCriticalTierFromMargin(margin: number): CriticalSeverity | null {
  if (margin >= 15) return 'mortal';
  if (margin >= 13) return 'difficult';
  if (margin >= 10) return 'complex';
  if (margin >= 7) return 'simple';
  return null;
}

export function rollCriticalWoundEntry(
  severity: CriticalSeverity,
  anatomy: AnatomyType,
  round: number,
  explicitLocation?: HitLocationId
): {
  wound: CriticalWoundRecord | null;
  noAnatomyExtraDamage: number;
} {
  const roll = roll2d6();
  const table = CRITICAL_WOUNDS_TABLES[severity];
  const entry =
    table.find((row) => roll >= row.rollMin && roll <= row.rollMax) ?? table[2];

  // Elementals & Specters ignore organ-based critical wounds and take flat extra damage instead.
  if (
    (anatomy === 'elemental' || anatomy === 'specter') &&
    entry.isOrganWound
  ) {
    return {
      wound: null,
      noAnatomyExtraDamage: CRITICAL_TIER_META[severity].noAnatomyBonusDamage,
    };
  }

  return {
    noAnatomyExtraDamage: 0,
    wound: {
      id: generateId('crit'),
      severity,
      rollLabel: entry.rollLabel,
      title: entry.title,
      activeEffect: entry.activeEffect,
      stabilizedEffect: entry.stabilizedEffect,
      treatedEffect: entry.treatedEffect,
      state: 'active',
      location: explicitLocation,
      addedRound: round,
    },
  };
}

export function getFumbleEffect(
  category: FumbleCategoryId,
  severity: number
): string {
  const table = FUMBLE_TABLES[category];
  const found =
    table.entries.find(
      (e) =>
        severity >= e.minSeverity &&
        (e.maxSeverity === null || severity <= e.maxSeverity)
    ) ?? table.entries[0];
  return found.effect.fr;
}

export function getLocalizedFumbleEffect(
  category: FumbleCategoryId,
  severity: number,
  lang: ModuleLanguage
): string {
  const table = FUMBLE_TABLES[category];
  const found =
    table.entries.find(
      (e) =>
        severity >= e.minSeverity &&
        (e.maxSeverity === null || severity <= e.maxSeverity)
    ) ?? table.entries[0];
  return found.effect[lang];
}

export interface DamageCalculationInput {
  target: Combatant;
  rawDamage: number;
  locationId: HitLocationId;
  damageType: DamageType;
  penetration: PenetrationTier;
  isSilverWeapon: boolean;
  isTargetResistant: boolean;
  isTargetVulnerable: boolean;
  coverSp: number;
  critSeverity: CriticalSeverity | null;
  noAnatomyBonusDamage?: number;
  isStrongStrike?: boolean;
  isNonLethal?: boolean;
}

export interface DamageCalculationResult {
  locationId: HitLocationId;
  rawDamageAfterStrike: number;
  afterCover: number;
  effectiveArmorSp: number;
  afterArmor: number;
  armorDegradedBy: number;
  afterResistances: number;
  locationMultiplier: number;
  afterLocation: number;
  critBonusDamage: number;
  finalDamage: number;
  isNonLethal: boolean;
}

/**
 * Exact Witcher TRPG damage pipeline from guide/combat.md:
 * 1. Strong strike doubles base weapon damage before armor.
 * 2. Cover SP subtracts first.
 * 3. Penetration: improved halves location armor SP (and ignores DR); normal ignores DR.
 * 4. Location Armor SP subtracts. If damage > 0 penetrates armor, armor degrades by 1 SP.
 * 5. Monster non-silver resistance (÷2 unless fire/elemental), Resistance (÷2), Vulnerability (×2).
 * 6. Hit Location multiplier (×3 Head, ×1 Torso, ×0.5 Limbs/Tail).
 * 7. Critical Wound bonus damage (+3/+5/+8/+10) added AFTER armor & multiplier.
 */
export function calculateSingleLocationDamage(
  input: DamageCalculationInput
): DamageCalculationResult {
  const rawDamageAfterStrike = input.isStrongStrike
    ? input.rawDamage * 2
    : input.rawDamage;

  const afterCover = Math.max(0, rawDamageAfterStrike - Math.max(0, input.coverSp));

  const currentSp = input.target.armor[input.locationId]?.current ?? 0;
  const effectiveArmorSp =
    input.penetration === 'improved' ? Math.floor(currentSp / 2) : currentSp;

  const afterArmor = Math.max(0, afterCover - effectiveArmorSp);
  const armorDegradedBy = afterArmor > 0 && currentSp > 0 ? 1 : 0;

  let afterResistances = afterArmor;
  // Non-beast monsters halve non-silver physical weapons; fire/elemental is NOT resisted (line 369)
  const applyNonSilverHalf =
    input.target.resistantToNonSilver &&
    !input.isSilverWeapon &&
    input.damageType !== 'elemental';

  if (applyNonSilverHalf) {
    afterResistances = Math.floor(afterResistances / 2);
  }

  if (input.isTargetResistant && input.penetration === 'none') {
    afterResistances = Math.floor(afterResistances / 2);
  }

  if (input.isTargetVulnerable) {
    afterResistances = afterResistances * 2;
  }

  const locTable = getHitLocationsForAnatomy(input.target.anatomy);
  const locRow =
    locTable.find((r) => r.id === input.locationId) ??
    MONSTER_HIT_LOCATIONS[1];
  const locationMultiplier = locRow.damageMultiplier;
  const afterLocation = Math.floor(afterResistances * locationMultiplier);

  const critBonusDamage =
    (input.critSeverity ? CRITICAL_TIER_META[input.critSeverity].bonusDamage : 0) +
    (input.noAnatomyBonusDamage ?? 0);

  const finalDamage = afterLocation + critBonusDamage;

  return {
    locationId: input.locationId,
    rawDamageAfterStrike,
    afterCover,
    effectiveArmorSp,
    afterArmor,
    armorDegradedBy,
    afterResistances,
    locationMultiplier,
    afterLocation,
    critBonusDamage,
    finalDamage,
    isNonLethal: Boolean(input.isNonLethal),
  };
}

/**
 * Applies damage results to a combatant (updating HP or non-lethal, degrading SP,
 * clearing Stunned if hit per line 346, and adding critical wounds).
 */
export function applyDamageToCombatant(
  combatant: Combatant,
  results: readonly DamageCalculationResult[],
  newCriticalWound: CriticalWoundRecord | null
): {
  updated: Combatant;
  totalApplied: number;
  triggeredWoundThreshold: boolean;
  enteredDyingState: boolean;
  wokeFromStun: boolean;
} {
  let totalApplied = 0;
  const nextArmor = { ...combatant.armor };

  for (const res of results) {
    totalApplied += res.finalDamage;
    if (res.armorDegradedBy > 0 && nextArmor[res.locationId]) {
      nextArmor[res.locationId] = {
        ...nextArmor[res.locationId],
        current: Math.max(0, nextArmor[res.locationId].current - res.armorDegradedBy),
      };
    }
  }

  const isNonLethal = results.some((r) => r.isNonLethal);
  const prevHp = combatant.hp;
  const threshold = getWoundThreshold(combatant.maxHp);

  let nextHp = prevHp;
  let nextNonLethal = combatant.nonLethalDmg;

  if (isNonLethal) {
    nextNonLethal += totalApplied;
  } else {
    let remainingDmg = totalApplied;
    let nextTempHp = combatant.tempHp;
    if (nextTempHp > 0) {
      const absorbedByTemp = Math.min(nextTempHp, remainingDmg);
      nextTempHp -= absorbedByTemp;
      remainingDmg -= absorbedByTemp;
    }
    nextHp = prevHp - remainingDmg;
    combatant = { ...combatant, tempHp: nextTempHp };
  }

  // Being struck immediately breaks Stunned state (guide/combat.md line 346)
  let wokeFromStun = false;
  let nextConditions = [...combatant.conditions];
  if (totalApplied > 0 && nextConditions.includes('stunned')) {
    nextConditions = nextConditions.filter((c) => c !== 'stunned');
    wokeFromStun = true;
  }

  // Auto-apply secondary conditions triggered by certain severe critical wounds
  const nextCriticals = newCriticalWound
    ? [newCriticalWound, ...combatant.criticalWounds]
    : combatant.criticalWounds;

  if (newCriticalWound) {
    const titleLower = newCriticalWound.title.fr.toLowerCase();
    if (
      (titleLower.includes('saigne') ||
        titleLower.includes('fracture ouverte') ||
        titleLower.includes('arraché') ||
        titleLower.includes('œil') ||
        titleLower.includes('cœur') ||
        titleLower.includes('rate')) &&
      !nextConditions.includes('bleeding')
    ) {
      nextConditions.push('bleeding');
    }
    if (titleLower.includes('thorax') && !nextConditions.includes('suffocating')) {
      nextConditions.push('suffocating');
    }
    if (titleLower.includes('septique') && !nextConditions.includes('poisoned')) {
      nextConditions.push('poisoned');
    }
  }

  const instantDeath =
    newCriticalWound?.title.fr.toLowerCase().includes('décapitation') ?? false;

  const updated: Combatant = {
    ...combatant,
    hp: nextHp,
    nonLethalDmg: nextNonLethal,
    armor: nextArmor,
    conditions: nextConditions,
    criticalWounds: nextCriticals,
    isDead: instantDeath ? true : combatant.isDead,
  };

  return {
    updated,
    totalApplied,
    triggeredWoundThreshold: prevHp >= threshold && nextHp < threshold && nextHp >= 0,
    enteredDyingState: prevHp >= 0 && nextHp < 0,
    wokeFromStun,
  };
}

export function createLogEntry(
  round: number,
  type: CombatLogType,
  message: string
): CombatLogEntry {
  const now = new Date();
  const timestamp = now.toTimeString().slice(0, 5);
  return {
    id: generateId('log'),
    round,
    timestamp,
    type,
    message,
  };
}

/**
 * Advances or rewinds the turn pointer, wrapping rounds cleanly and ticking
 * Witcher TRPG start-of-turn status effects (Bleeding, Poison, Suffocation,
 * Burning across all locations, Staggered auto-clear, Death Save prompt).
 */
export function stepCombatTurn(
  state: CombatTrackerState,
  direction: 'next' | 'prev',
  lang: ModuleLanguage
): {
  nextState: CombatTrackerState;
  wrappedRound: boolean;
  turnMessages: string[];
} {
  const living = state.combatants.filter((c) => !c.isDead);
  if (living.length === 0) {
    return { nextState: state, wrappedRound: false, turnMessages: [] };
  }

  if (state.round === 0 && direction === 'prev') {
    return { nextState: state, wrappedRound: false, turnMessages: [] };
  }

  const startFromPrep = state.round === 0 && direction === 'next';

  const currentIdx = living.findIndex((c) => c.id === state.activeCombatantId);
  let targetIdx = 0;
  let wrappedRound = false;
  let nextRound = state.round;

  if (startFromPrep) {
    targetIdx = 0;
    wrappedRound = true;
    nextRound = 1;
  } else if (direction === 'next') {
    if (currentIdx === -1 || currentIdx + 1 >= living.length) {
      targetIdx = 0;
      if (currentIdx !== -1) {
        wrappedRound = true;
        nextRound += 1;
      }
    } else {
      targetIdx = currentIdx + 1;
    }
  } else {
    if (currentIdx <= 0) {
      targetIdx = living.length - 1;
      if (state.round > 1) {
        wrappedRound = true;
        nextRound -= 1;
      }
    } else {
      targetIdx = currentIdx - 1;
    }
  }

  const prevActiveId = state.activeCombatantId;
  const nextActive = living[targetIdx];
  const turnMessages: string[] = [];
  const newLogs: CombatLogEntry[] = [];

  let updatedCombatants = state.combatants.map((c) => {
    let next = c;
    if (direction === 'next' && !startFromPrep && c.id === prevActiveId) {
      next = { ...next, actedThisRound: true };
    }
    if (wrappedRound && direction === 'next') {
      next = {
        ...next,
        actedThisRound: false,
        defensesUsedThisRound: 0,
        activeDodge: false,
        quickDraw: startFromPrep ? next.quickDraw : false,
        delayed: false,
      };
    }
    return next;
  });

  if (wrappedRound && direction === 'next') {
    updatedCombatants = sortCombatantsByInitiative(updatedCombatants);
  }

  const resolvedNextActive =
    wrappedRound && direction === 'next'
      ? updatedCombatants.find((c) => !c.isDead) ?? nextActive
      : nextActive;

  if (wrappedRound && direction === 'next') {
    newLogs.push(
      createLogEntry(
        nextRound,
        'turn',
        lang === 'fr'
          ? `--- Début du Round ${nextRound} ---`
          : `--- Round ${nextRound} started ---`
      )
    );
  }

  newLogs.push(
    createLogEntry(
      nextRound,
      'turn',
      lang === 'fr'
        ? `Tour de ${resolvedNextActive.name}`
        : `${resolvedNextActive.name}’s turn`
    )
  );

  // Apply start-of-turn condition effects only when advancing forward
  if (direction === 'next') {
    updatedCombatants = updatedCombatants.map((c) => {
      if (c.id !== resolvedNextActive.id) return c;
      let next = { ...c };

      // 1. Stupéfaction (Staggered) auto-clears at start of next turn (line 353)
      if (next.conditions.includes('staggered')) {
        next.conditions = next.conditions.filter((cond) => cond !== 'staggered');
        const msg =
          lang === 'fr'
            ? `${next.name} n’est plus Stupéfait (début de tour).`
            : `${next.name} recovers from Staggered (turn start).`;
        turnMessages.push(msg);
        newLogs.push(createLogEntry(nextRound, 'condition', msg));
      }

      // 2. Direct DoTs bypassing armor
      let directDotDmg = 0;
      const dotDetails: string[] = [];
      for (const condId of ['bleeding', 'poisoned', 'suffocating'] as const) {
        if (next.conditions.includes(condId)) {
          const def = CONDITIONS_MAP.get(condId);
          if (def && def.roundDamage > 0) {
            directDotDmg += def.roundDamage;
            dotDetails.push(`${def.name[lang]} (-${def.roundDamage})`);
          }
        }
      }
      if (directDotDmg > 0) {
        next.hp -= directDotDmg;
        const msg =
          lang === 'fr'
            ? `${next.name} subit ${directDotDmg} PS (${dotDetails.join(', ')}).`
            : `${next.name} takes ${directDotDmg} HP (${dotDetails.join(', ')}).`;
        turnMessages.push(msg);
        newLogs.push(createLogEntry(nextRound, 'damage', msg));
      }

      // 3. Incinération (On Fire): 5 dmg to ALL body locations (armor absorbs, -1 PA/Fia)
      if (next.conditions.includes('burning')) {
        const zones = getActiveArmorLocations(next.anatomy);
        const nextArmor = { ...next.armor };
        let burnHpTotal = 0;
        for (const zone of zones) {
          const currentSp = nextArmor[zone]?.current ?? 0;
          const dmg = Math.max(0, 5 - currentSp);
          burnHpTotal += dmg;
          if (currentSp > 0) {
            nextArmor[zone] = { ...nextArmor[zone], current: currentSp - 1 };
          }
        }
        // Weapon reliability -1 if carrying one
        const nextWeapons = next.weapons.map((w, idx) =>
          idx === 0 && w.reliability > 0
            ? { ...w, reliability: w.reliability - 1 }
            : w
        );
        next.armor = nextArmor;
        next.weapons = nextWeapons;
        next.hp -= burnHpTotal;
        const msg =
          lang === 'fr'
            ? `${next.name} brûle (Incinération) : -${burnHpTotal} PS, -1 PA toutes zones.`
            : `${next.name} burns (On Fire): -${burnHpTotal} HP, -1 SP all zones.`;
        turnMessages.push(msg);
        newLogs.push(createLogEntry(nextRound, 'damage', msg));
      }

      // 4. Death State reminder if HP < 0
      if (next.hp < 0) {
        next.deathSaveRounds += 1;
        const msg =
          lang === 'fr'
            ? `${next.name} est en Mort imminente (PS ${next.hp}) : Jet de sauvegarde requis (-${next.deathSaveRounds - 1} cumulatif).`
            : `${next.name} is in Death State (HP ${next.hp}): Death Save required (-${next.deathSaveRounds - 1} cumulative).`;
        turnMessages.push(msg);
        newLogs.push(createLogEntry(nextRound, 'death', msg));
      }

      return next;
    });
  }

  return {
    wrappedRound,
    turnMessages,
    nextState: {
      ...state,
      round: nextRound,
      activeCombatantId: resolvedNextActive.id,
      combatants: updatedCombatants,
      logs: [...newLogs, ...state.logs].slice(0, 300),
    },
  };
}

/**
 * Helper to parse numeric values from bestiary stat strings like "25", "10 / 12", etc.
 */
function parseStatNumber(raw: string | number | undefined, fallback: number): number {
  if (typeof raw === 'number' && !Number.isNaN(raw)) return raw;
  if (typeof raw === 'string') {
    const match = raw.match(/-?\d+/);
    if (match) return Number.parseInt(match[0], 10);
  }
  return fallback;
}

/**
 * Extracts average Armor SP from bestiary armor strings (e.g. "0", "5", "12 (corps)", "8 / 14").
 */
function parseBestiaryArmor(armorText: string): number {
  const nums = armorText.match(/\d+/g);
  if (!nums || nums.length === 0) return 0;
  return Number.parseInt(nums[0], 10);
}

/**
 * Converts a canonical BestiaryEntry (with optional caste variant) into a ready-to-play Combatant.
 */
export function createCombatantFromBestiary(
  entry: BestiaryEntry,
  options: {
    lang: ModuleLanguage;
    variant?: BestiaryCombatVariant;
    roleOverride?: CombatantRole;
    customName?: string;
    fixedInitRoll?: number;
  }
): Combatant {
  const combat = options.variant ?? entry.combat;
  const rawStats = combat?.stats ?? {};

  const ref = parseStatNumber(rawStats['RÉF'] ?? rawStats['REF'], 6);
  const dex = parseStatNumber(rawStats['DEX'], 6);
  const cor = parseStatNumber(rawStats['COR'] ?? rawStats['BODY'], 6);
  const vit = parseStatNumber(rawStats['VIT'] ?? rawStats['SPD'], 6);
  const int = parseStatNumber(rawStats['INT'], 4);
  const vol = parseStatNumber(rawStats['VOL'] ?? rawStats['WILL'], 5);
  const rec = parseStatNumber(rawStats['RÉC'] ?? rawStats['REC'], Math.floor((cor + vol) / 2));
  const etou = parseStatNumber(rawStats['ÉTOU'] ?? rawStats['STUN'], Math.min(10, Math.floor((cor + vol) / 2)));
  const vig = parseStatNumber(rawStats['VIG'], 0);
  const hp = parseStatNumber(rawStats['PS'] ?? rawStats['HP'], 25);
  const end = parseStatNumber(rawStats['END'] ?? rawStats['STA'], 25);

  const anatomy: AnatomyType =
    entry.typeId === 'elemental'
      ? 'elemental'
      : entry.typeId === 'specter'
        ? 'specter'
        : entry.kind === 'humanoid'
          ? 'human'
          : 'monster';

  const armorSp = parseBestiaryArmor(entry.armor[options.lang] || entry.armor.fr);
  const initRoll = options.fixedInitRoll ?? rollDie(10);

  const weapons: CombatantWeapon[] = (combat?.weapons ?? []).map((w) => {
    const lowerName = w.name.toLowerCase();
    const lowerEffect = w.effect.toLowerCase();
    const isSilver = lowerName.includes('argent') || lowerName.includes('silver');
    const penetration: PenetrationTier = lowerEffect.includes('amélior')
      ? 'improved'
      : lowerEffect.includes('perforation') || lowerEffect.includes('armor piercing')
        ? 'normal'
        : 'none';
    const damageType: DamageType =
      lowerName.includes('feu') || lowerName.includes('fire') || lowerEffect.includes('incinér')
        ? 'elemental'
        : lowerName.includes('flèche') || lowerName.includes('arc') || lowerName.includes('arbalète') || lowerName.includes('dague') || lowerName.includes('lance')
          ? 'piercing'
          : lowerName.includes('masse') || lowerName.includes('bâton') || lowerName.includes('gourdin')
            ? 'bludgeoning'
            : 'slashing';

    return {
      id: generateId('wpn'),
      name: w.name,
      damage: w.damage || '2d6',
      damageType,
      isSilver,
      penetration,
      reliability: 12,
      maxReliability: 12,
      attacksPerRound: Math.max(1, parseStatNumber(w.attacksPerTurn, 1)),
      effectNote: w.effect === 'Aucun' ? '' : w.effect,
    };
  });

  const variantSuffix = options.variant ? ` (${options.variant.label[options.lang]})` : '';
  const role: CombatantRole =
    options.roleOverride ?? (entry.kind === 'monster' ? 'monster' : 'enemy');

  return {
    id: generateId('cmb'),
    name: options.customName ?? `${entry.name[options.lang]}${variantSuffix}`,
    role,
    anatomy,
    sourceLabel: entry.name[options.lang],
    initiative: ref + initRoll,
    initiativeRoll: initRoll,
    tieBreaker: rollDie(10),
    quickDraw: false,
    delayed: false,
    actedThisRound: false,
    defensesUsedThisRound: 0,
    activeDodge: false,
    aimStacks: 0,
    hp,
    maxHp: hp,
    end,
    maxEnd: end,
    nonLethalDmg: 0,
    adrenalineDice: 0,
    tempHp: 0,
    deathSaveFailures: 0,
    deathSaveRounds: 0,
    isDead: false,
    stats: { ref, dex, cor, vit, int, vol, rec, etou, vig },
    armor: createDefaultArmor(armorSp, anatomy),
    // Non-beast monsters resist non-silver weapons (guide/combat.md line 366)
    resistantToNonSilver: entry.kind === 'monster' && entry.typeId !== 'beast',
    vulnerabilities: [...(combat?.vulnerabilities ?? [])],
    resistances: [],
    immunities: [],
    abilities: [...(combat?.abilities ?? [])],
    weapons,
    conditions: [],
    criticalWounds: [],
    notes: '',
  };
}

/**
 * Converts a CharacterSheetState JSON exported from the Character Generator into a Combatant.
 */
export function createCombatantFromCharacterSheet(
  sheet: CharacterSheetState,
  lang: ModuleLanguage
): Combatant {
  const derived = calculateDerivedStats(sheet);
  const initRoll = rollDie(10);
  const ref = sheet.stats.REF || 6;
  const gear = extractPcGearFromCharacterSheet(sheet, lang);
  const combinedNotes = [sheet.personalDescription?.trim(), gear.shieldSummaryNote]
    .filter(Boolean)
    .join('\n');

  const armor = createDefaultArmor(0, 'human');
  const locations: readonly HitLocationId[] = [
    'head',
    'torso',
    'rightArm',
    'leftArm',
    'rightLeg',
    'leftLeg',
  ];
  for (const loc of locations) {
    const sp = Math.max(0, gear.armor[loc] ?? 0);
    armor[loc] = { current: sp, max: sp };
  }

  return {
    id: generateId('pc'),
    name:
      sheet.characterName.trim() ||
      (lang === 'fr' ? 'Personnage Joueur' : 'Player Character'),
    role: 'pc',
    anatomy: 'human',
    sourceLabel: sheet.playerName ? `${sheet.playerName}` : undefined,
    initiative: ref + initRoll,
    initiativeRoll: initRoll,
    tieBreaker: rollDie(10),
    quickDraw: false,
    delayed: false,
    actedThisRound: false,
    defensesUsedThisRound: 0,
    activeDodge: false,
    aimStacks: 0,
    hp: derived.hp,
    maxHp: derived.hp,
    end: derived.stamina,
    maxEnd: derived.stamina,
    nonLethalDmg: 0,
    adrenalineDice: 0,
    tempHp: 0,
    deathSaveFailures: 0,
    deathSaveRounds: 0,
    isDead: false,
    stats: {
      ref,
      dex: sheet.stats.DEX || 6,
      cor: sheet.stats.COR || 6,
      vit: sheet.stats.VIT || 6,
      int: sheet.stats.INT || 6,
      vol: sheet.stats.VOL || 6,
      rec: derived.recovery,
      etou: derived.stun,
      vig: derived.vigor,
    },
    armor,
    resistantToNonSilver: false,
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    abilities: [],
    weapons: gear.weapons,
    conditions: [],
    criticalWounds: [],
    notes: combinedNotes,
  };
}

export function createInitialCombatState(): CombatTrackerState {
  return {
    version: 1,
    encounterTitle: '',
    round: 0,
    activeCombatantId: null,
    lightLevel: 'daylight',
    useAdrenalineRule: false,
    combatants: [],
    logs: [],
  };
}

export function loadCombatTrackerState(): CombatTrackerState {
  if (typeof window === 'undefined') return createInitialCombatState();
  try {
    const raw = window.localStorage.getItem(COMBAT_TRACKER_STORAGE_KEY);
    if (!raw) return createInitialCombatState();
    const parsed = JSON.parse(raw) as Partial<CombatTrackerState>;
    if (!parsed || !Array.isArray(parsed.combatants)) {
      return createInitialCombatState();
    }
    return {
      ...createInitialCombatState(),
      ...parsed,
      combatants: parsed.combatants,
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
    };
  } catch {
    return createInitialCombatState();
  }
}

export function saveCombatTrackerState(state: CombatTrackerState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COMBAT_TRACKER_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export { getLocationLabel };

/**
 * Formats an optional turn-actor prefix for contextual combat logging
 * (e.g., "Pendant le tour de Geralt : ...").
 */
export function formatTurnPrefix(
  activeActorName: string | null | undefined,
  targetName: string,
  lang: ModuleLanguage
): string {
  if (!activeActorName) return '';
  if (activeActorName === targetName) {
    return lang === 'fr'
      ? `[Tour de ${activeActorName}] `
      : `[${activeActorName}’s turn] `;
  }
  return lang === 'fr'
    ? `Pendant le tour de ${activeActorName} : `
    : `During ${activeActorName}’s turn: `;
}

/**
 * Automatically generates chronological, turn-contextualized CombatLogEntry items
 * by diffing a combatant's previous and next states (HP, END, non-lethal, armor SP,
 * conditions, critical wounds, wound threshold, dying, unconsciousness, and tactical states).
 */
export function buildCombatantDiffLogs(
  prev: Combatant,
  next: Combatant,
  round: number,
  activeActorName: string | null | undefined,
  lang: ModuleLanguage
): CombatLogEntry[] {
  const logs: CombatLogEntry[] = [];
  const prefix = formatTurnPrefix(activeActorName, next.name, lang);
  const threshold = getWoundThreshold(next.maxHp);

  // 1. HP diff + Threshold / Dying transitions
  if (next.hp !== prev.hp) {
    const delta = next.hp - prev.hp;
    if (delta < 0) {
      logs.push(
        createLogEntry(
          round,
          'damage',
          lang === 'fr'
            ? `${prefix}${next.name} perd ${Math.abs(delta)} PS (${prev.hp} → ${next.hp} PS).`
            : `${prefix}${next.name} loses ${Math.abs(delta)} HP (${prev.hp} → ${next.hp} HP).`
        )
      );
    } else {
      logs.push(
        createLogEntry(
          round,
          'heal',
          lang === 'fr'
            ? `${prefix}${next.name} récupère +${delta} PS (${prev.hp} → ${next.hp} PS).`
            : `${prefix}${next.name} recovers +${delta} HP (${prev.hp} → ${next.hp} HP).`
        )
      );
    }

    if (prev.hp >= threshold && next.hp < threshold && next.hp >= 0) {
      logs.push(
        createLogEntry(
          round,
          'condition',
          lang === 'fr'
            ? `${next.name} passe sous le Seuil de blessures (< ${threshold} PS) : RÉF/DEX/INT/VOL ÷2.`
            : `${next.name} drops below Wound Threshold (< ${threshold} HP): REF/DEX/INT/WILL halved.`
        )
      );
    }
    if (prev.hp >= 0 && next.hp < 0) {
      logs.push(
        createLogEntry(
          round,
          'death',
          lang === 'fr'
            ? `${next.name} passe en état de Mort imminente (${next.hp} PS) !`
            : `${next.name} enters Death State (${next.hp} HP)!`
        )
      );
    }
  }

  // 2. Non-Lethal Damage diff + Unconscious trigger
  if (next.nonLethalDmg !== prev.nonLethalDmg) {
    const delta = next.nonLethalDmg - prev.nonLethalDmg;
    logs.push(
      createLogEntry(
        round,
        delta > 0 ? 'damage' : 'heal',
        lang === 'fr'
          ? `${prefix}${next.name} : dégâts non létaux ${delta > 0 ? `+${delta}` : delta} (${next.nonLethalDmg}/${next.end} END).`
          : `${prefix}${next.name}: non-lethal damage ${delta > 0 ? `+${delta}` : delta} (${next.nonLethalDmg}/${next.end} STA).`
      )
    );
    if (prev.nonLethalDmg < prev.end && next.nonLethalDmg >= next.end) {
      logs.push(
        createLogEntry(
          round,
          'condition',
          lang === 'fr'
            ? `${next.name} tombe Inconscient / K.O. (dégâts non létaux ≥ END) !`
            : `${next.name} falls Unconscious / K.O. (non-lethal ≥ STA)!`
        )
      );
    }
  }

  // 3. Stamina (END) diff
  if (next.end !== prev.end) {
    const delta = next.end - prev.end;
    logs.push(
      createLogEntry(
        round,
        delta > 0 ? 'heal' : 'system',
        lang === 'fr'
          ? `${prefix}${next.name} : Endurance ${delta > 0 ? `+${delta}` : delta} (${prev.end} → ${next.end} END).`
          : `${prefix}${next.name}: Stamina ${delta > 0 ? `+${delta}` : delta} (${prev.end} → ${next.end} STA).`
      )
    );
  }

  // 4. Per-location Armor SP diff
  const activeZones = getActiveArmorLocations(next.anatomy);
  for (const zone of activeZones) {
    const pSp = prev.armor[zone]?.current ?? 0;
    const nSp = next.armor[zone]?.current ?? 0;
    if (nSp !== pSp) {
      const zoneName = getLocationLabel(zone, next.anatomy, lang);
      logs.push(
        createLogEntry(
          round,
          nSp < pSp ? 'damage' : 'heal',
          lang === 'fr'
            ? `${prefix}Armure (${zoneName}) de ${next.name} : ${pSp} → ${nSp} PA.`
            : `${prefix}${next.name}’s ${zoneName} armor: ${pSp} → ${nSp} SP.`
        )
      );
    }
  }

  // 5. Conditions added / removed
  for (const condId of next.conditions) {
    if (!prev.conditions.includes(condId)) {
      const def = CONDITIONS_MAP.get(condId);
      logs.push(
        createLogEntry(
          round,
          'condition',
          lang === 'fr'
            ? `${prefix}${next.name} subit l’effet : ${def?.name.fr ?? condId}.`
            : `${prefix}${next.name} gains condition: ${def?.name.en ?? condId}.`
        )
      );
    }
  }
  for (const condId of prev.conditions) {
    if (!next.conditions.includes(condId)) {
      const def = CONDITIONS_MAP.get(condId);
      logs.push(
        createLogEntry(
          round,
          'heal',
          lang === 'fr'
            ? `${prefix}${next.name} n’est plus affecté par : ${def?.name.fr ?? condId}.`
            : `${prefix}${next.name} clears condition: ${def?.name.en ?? condId}.`
        )
      );
    }
  }

  // 6. Critical wounds added or updated
  for (const cw of next.criticalWounds) {
    const oldCw = prev.criticalWounds.find((o) => o.id === cw.id);
    if (!oldCw) {
      logs.push(
        createLogEntry(
          round,
          'critical',
          lang === 'fr'
            ? `${prefix}${next.name} subit une blessure critique : ${cw.title.fr}.`
            : `${prefix}${next.name} suffers critical wound: ${cw.title.en}.`
        )
      );
    } else if (oldCw.state !== cw.state) {
      logs.push(
        createLogEntry(
          round,
          'heal',
          lang === 'fr'
            ? `${prefix}Blessure « ${cw.title.fr} » (${next.name}) → ${cw.state === 'stabilized' ? 'Stabilisée' : cw.state === 'treated' ? 'Traitée' : 'Active'}.`
            : `${prefix}Wound “${cw.title.en}” (${next.name}) → ${cw.state}.`
        )
      );
    }
  }

  // 7. Death status toggled
  if (next.isDead !== prev.isDead) {
    logs.push(
      createLogEntry(
        round,
        next.isDead ? 'death' : 'heal',
        lang === 'fr'
          ? next.isDead
            ? `${prefix}${next.name} est déclaré mort.`
            : `${prefix}${next.name} est rétabli.`
          : next.isDead
            ? `${prefix}${next.name} has died.`
            : `${prefix}${next.name} is revived.`
      )
    );
  }

  // 8. Tactical flags (Delayed, Initiative changes)
  if (next.initiative !== prev.initiative) {
    logs.push(
      createLogEntry(
        round,
        'system',
        lang === 'fr'
          ? `${prefix}Initiative de ${next.name} : ${prev.initiative} → ${next.initiative}.`
          : `${prefix}${next.name}’s Initiative: ${prev.initiative} → ${next.initiative}.`
      )
    );
  }

  if (next.delayed !== prev.delayed) {
    logs.push(
      createLogEntry(
        round,
        'turn',
        lang === 'fr'
          ? `${next.name} ${next.delayed ? 'décale son action.' : 'reprend son tour.'}`
          : `${next.name} ${next.delayed ? 'delays their turn.' : 'resumes their turn.'}`
      )
    );
  }

  return logs;
}

