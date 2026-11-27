import { DEMON_SYLLABLE_MATRIX } from '../data/goetiaData';
import type { GoetiaStoreState } from '../types';

export const GOETIA_STORAGE_KEY = 'witcher-gm-goetia-v1';

export function rollMatrixSyllable(): {
  d6: number;
  d10: number;
  syllable: string;
} {
  const d6 = Math.floor(Math.random() * 6) + 1;
  const d10 = Math.floor(Math.random() * 10) + 1;
  const syllable = DEMON_SYLLABLE_MATRIX[d10 - 1][d6 - 1];
  return { d6, d10, syllable };
}

export function rollExplodingD10(): {
  rolls: number[];
  total: number;
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
    return { rolls, total, isCritFail: false };
  }

  if (first === 1) {
    let penalty = Math.floor(Math.random() * 10) + 1;
    rolls.push(-penalty);
    while (penalty === 10 && rolls.length < 12) {
      const extra = Math.floor(Math.random() * 10) + 1;
      rolls.push(-extra);
      penalty += extra;
    }
    return { rolls, total: -penalty, isCritFail: true };
  }

  return { rolls, total: first, isCritFail: false };
}

export function loadGoetiaStore(): GoetiaStoreState {
  if (typeof window === 'undefined') {
    return { demons: [] };
  }
  try {
    const raw = window.localStorage.getItem(GOETIA_STORAGE_KEY);
    if (!raw) return { demons: [] };
    const parsed = JSON.parse(raw) as Partial<GoetiaStoreState>;
    return {
      demons: Array.isArray(parsed.demons) ? parsed.demons : [],
    };
  } catch {
    return { demons: [] };
  }
}

export function saveGoetiaStore(state: GoetiaStoreState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GOETIA_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}
