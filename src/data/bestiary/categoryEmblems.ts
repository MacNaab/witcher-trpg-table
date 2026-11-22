import type { CreatureTypeId } from './types';

/**
 * Maps each normalized Witcher TRPG creature taxonomy ID to its dedicated
 * hexagonal category emblem asset in `/public/assets/monster-categories/`.
 */
export const MONSTER_CATEGORY_EMBLEM_MAP: Record<CreatureTypeId, string> = {
  beast: '/assets/monster-categories/bete.png',
  draconid: '/assets/monster-categories/draconide.png',
  elemental: '/assets/monster-categories/elementaire.png',
  humanoid: '/assets/monster-categories/humanoide.png',
  hybrid: '/assets/monster-categories/hybride.png',
  insectoid: '/assets/monster-categories/insectoide.png',
  cursed: '/assets/monster-categories/maudit.png',
  necrophage: '/assets/monster-categories/necrophage.png',
  ogroid: '/assets/monster-categories/ogroide.png',
  specter: '/assets/monster-categories/spectre.png',
  vampire: '/assets/monster-categories/vampire.png',
  relict: '/assets/monster-categories/vestige.png',
};

/**
 * Normalizes any English, French, accented, or pluralized creature category string
 * into one of the 12 canonical `CreatureTypeId` keys.
 */
export function normalizeCreatureTypeId(rawType: string): CreatureTypeId {
  const normalized = rawType
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (!normalized) return 'relict';

  if (
    normalized.includes('necro') ||
    normalized.includes('ghoul') ||
    normalized.includes('goule')
  ) {
    return 'necrophage';
  }
  if (
    normalized.includes('spect') ||
    normalized.includes('wraith') ||
    normalized.includes('apparition')
  ) {
    return 'specter';
  }
  if (normalized.includes('drac')) {
    return 'draconid';
  }
  if (normalized.includes('vamp')) {
    return 'vampire';
  }
  if (normalized.includes('insect')) {
    return 'insectoid';
  }
  if (normalized.includes('hybrid')) {
    return 'hybrid';
  }
  if (
    normalized.includes('beast') ||
    normalized.includes('bete') ||
    normalized.includes('animal')
  ) {
    return 'beast';
  }
  if (normalized.includes('elem') || normalized.includes('construct')) {
    return 'elemental';
  }
  if (normalized.includes('ogro') || normalized.includes('troll')) {
    return 'ogroid';
  }
  if (normalized.includes('curs') || normalized.includes('maudit')) {
    return 'cursed';
  }
  if (normalized.includes('human')) {
    return 'humanoid';
  }
  if (normalized.includes('relic') || normalized.includes('vestige')) {
    return 'relict';
  }

  return 'relict';
}

/**
 * Resolves the PNG emblem URL for a monster category.
 * Pass `absolute = true` for standalone exported HTML files so asset links stay valid offline/outside the SPA root.
 */
export function getMonsterCategoryEmblemUrl(
  rawType: string,
  absolute = false
): string {
  const typeId = normalizeCreatureTypeId(rawType);
  const path = MONSTER_CATEGORY_EMBLEM_MAP[typeId];
  if (absolute && typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}
