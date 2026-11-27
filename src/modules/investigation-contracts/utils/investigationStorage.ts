import { createOfficialExampleMysteries } from '../data/investigationData';
import type {
  InvestigationStoreState,
  MysteryCase,
  WitcherContractEntry,
} from '../types';

export const INVESTIGATION_STORAGE_KEY = 'witcher-gm-investigations-v1';

/**
 * Official Concentration formula: [(WILL + INT) / 2] * 3
 */
export function computeConcentrationMax(will: number, intVal: number): number {
  const safeWill = Math.max(1, Math.round(will));
  const safeInt = Math.max(1, Math.round(intVal));
  return Math.floor((safeWill + safeInt) / 2) * 3;
}

/**
 * Official 6h+ rest recovery: WILL + 1 (Deduction >= 5) or + 2 (Deduction >= 8)
 */
export function computeRestRecovery(will: number, deduction: number): number {
  const bonus = deduction >= 8 ? 2 : deduction >= 5 ? 1 : 0;
  return Math.max(1, Math.round(will)) + bonus;
}

/**
 * Roll a standard Witcher 1d10! check (10 explodes upward, 1 explodes downward).
 */
export function rollExplodingD10(): {
  rawFirst: number;
  rolls: number[];
  total: number;
  isCritSuccess: boolean;
  isCritFail: boolean;
} {
  const first = Math.floor(Math.random() * 10) + 1;
  const rolls = [first];

  if (first === 10) {
    let total = 10;
    let next = Math.floor(Math.random() * 10) + 1;
    rolls.push(next);
    total += next;
    while (next === 10 && rolls.length < 12) {
      next = Math.floor(Math.random() * 10) + 1;
      rolls.push(next);
      total += next;
    }
    return {
      rawFirst: first,
      rolls,
      total,
      isCritSuccess: true,
      isCritFail: false,
    };
  }

  if (first === 1) {
    let penalty = Math.floor(Math.random() * 10) + 1;
    rolls.push(-penalty);
    while (penalty === 10 && rolls.length < 12) {
      const extra = Math.floor(Math.random() * 10) + 1;
      rolls.push(-extra);
      penalty += extra;
    }
    return {
      rawFirst: first,
      rolls,
      total: -penalty,
      isCritSuccess: false,
      isCritFail: true,
    };
  }

  return {
    rawFirst: first,
    rolls,
    total: first,
    isCritSuccess: false,
    isCritFail: false,
  };
}

export function rollDie(sides: 6 | 10): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function createMysteryFromContract(
  contract: WitcherContractEntry,
  locale: 'fr' | 'en'
): MysteryCase {
  const hpMap = {
    easy: 25,
    moderate: 50,
    challenging: 100,
    hard: 150,
    nearlyImpossible: 200,
  } as const;
  const maxHp = hpMap[contract.suggestedTier];
  const now = new Date().toISOString();

  return {
    id: `mystery-contract-${contract.id}-${Date.now()}`,
    title: contract.title[locale],
    objective:
      locale === 'fr'
        ? `Résoudre le contrat #${contract.number} (${contract.location.fr}) : ${contract.client.fr}.`
        : `Complete Contract #${contract.number} (${contract.location.en}) for ${contract.client.en}.`,
    solutionSecret: `${contract.suggestedMonster[locale]} — ${contract.gmHint[locale]}`,
    tier: contract.suggestedTier,
    maxComplexity: maxHp,
    remainingComplexity: maxHp,
    currentDay: 1,
    countdownTotalDays: contract.number === 7 ? 2 : contract.number === 10 ? 5 : null,
    sourceContractId: contract.id,
    clues: [
      {
        id: `c-init-1-${Date.now()}`,
        title:
          locale === 'fr'
            ? `Rencontrer ${contract.client.fr} & inspecter les lieux`
            : `Interview ${contract.client.en} & inspect scene`,
        clueType: 'interrogation',
        dc: 14,
        concealment: 0,
        description: contract.noticeText[locale].slice(0, 160) + '…',
        attemptsUsed: 0,
        solved: false,
        contaminatedPenalty: 0,
      },
      {
        id: `c-init-2-${Date.now() + 1}`,
        title:
          locale === 'fr'
            ? `Relever les traces sur place (${contract.location.fr})`
            : `Examine scene & tracks (${contract.location.en})`,
        clueType: 'scene_examination',
        dc: 14,
        concealment: 2,
        description:
          locale === 'fr'
            ? 'Premier examen des indices physiques laissés par la menace.'
            : 'Initial examination of physical traces left at the site.',
        attemptsUsed: 0,
        solved: false,
        contaminatedPenalty: 0,
      },
    ],
    obstacles: [],
    logs: [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        kind: 'system',
        summary:
          locale === 'fr'
            ? `Contrat #${contract.number} converti en mystère (${maxHp} Complexité).`
            : `Contract #${contract.number} launched as mystery (${maxHp} Complexity).`,
      },
    ],
    updatedAt: now,
  };
}

export function loadInvestigationStore(
  locale: 'fr' | 'en'
): InvestigationStoreState {
  if (typeof window === 'undefined') {
    const defaults = createOfficialExampleMysteries(locale);
    return {
      activeMysteryId: defaults[0].id,
      mysteries: defaults,
      investigators: [],
    };
  }

  try {
    const raw = window.localStorage.getItem(INVESTIGATION_STORAGE_KEY);
    if (!raw) {
      const defaults = createOfficialExampleMysteries(locale);
      return {
        activeMysteryId: defaults[0].id,
        mysteries: defaults,
        investigators: [],
      };
    }
    const parsed = JSON.parse(raw) as Partial<InvestigationStoreState>;
    const mysteries =
      Array.isArray(parsed.mysteries) && parsed.mysteries.length > 0
        ? parsed.mysteries
        : createOfficialExampleMysteries(locale);
    return {
      activeMysteryId:
        typeof parsed.activeMysteryId === 'string' &&
        mysteries.some((m) => m.id === parsed.activeMysteryId)
          ? parsed.activeMysteryId
          : mysteries[0].id,
      mysteries,
      investigators: Array.isArray(parsed.investigators)
        ? parsed.investigators
        : [],
    };
  } catch {
    const defaults = createOfficialExampleMysteries(locale);
    return {
      activeMysteryId: defaults[0].id,
      mysteries: defaults,
      investigators: [],
    };
  }
}

export function saveInvestigationStore(state: InvestigationStoreState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      INVESTIGATION_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    // Ignore quota errors
  }
}
