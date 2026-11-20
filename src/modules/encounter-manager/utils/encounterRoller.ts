import { getCreatureTypeLabel, getEnvironmentLabel } from '../data';
import { getEncounterManagerCopy } from '../i18n';
import type {
  BestiaryKind,
  CreatureTypeId,
  EncounterEntry,
  EncounterEnvId,
  ModuleLanguage,
  RolledEncounter,
} from '../types';

export interface EncounterFilterOptions {
  includeFanMade: boolean;
  includeEverywhere: boolean;
}

export interface BestiaryFilterParams {
  search: string;
  category: 'all' | BestiaryKind;
  typeId: 'all' | CreatureTypeId;
  environment: 'all' | EncounterEnvId;
  source: 'all' | 'official' | 'fan';
}

/**
 * Normalizes a string for accent-insensitive, case-insensitive searching.
 */
function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Returns a deduplicated list of encounters matching the selected environments and toggles.
 * When `everywhere` is selected (either as a checked environment or via `includeEverywhere`),
 * entries tagged `everywhere` are included cleanly without skewing probabilities.
 */
export function getMatchingEncounterPool(
  entries: readonly EncounterEntry[],
  selectedEnvironments: readonly EncounterEnvId[],
  options: EncounterFilterOptions
): EncounterEntry[] {
  if (selectedEnvironments.length === 0) {
    return [];
  }

  const selectedSet = new Set<EncounterEnvId>(selectedEnvironments);
  const everywhereActive =
    options.includeEverywhere || selectedSet.has('everywhere');

  const pool = entries.filter((entry) => {
    if (!options.includeFanMade && entry.isFanMade) {
      return false;
    }

    if (selectedSet.has('everywhere')) {
      return true;
    }

    if (everywhereActive && entry.environments.includes('everywhere')) {
      return true;
    }

    return entry.environments.some((env) => selectedSet.has(env));
  });

  // Guarantee strict deduplication by unique entry ID.
  const seen = new Set<string>();
  return pool.filter((entry) => {
    if (seen.has(entry.id)) return false;
    seen.add(entry.id);
    return true;
  });
}

/**
 * Draws one random encounter uniformly from the deduplicated matching pool.
 */
export function rollRandomEncounter(
  entries: readonly EncounterEntry[],
  selectedEnvironments: readonly EncounterEnvId[],
  options: EncounterFilterOptions
): RolledEncounter | null {
  const pool = getMatchingEncounterPool(entries, selectedEnvironments, options);
  if (pool.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  return {
    entry: pool[index],
    poolSize: pool.length,
    rolledAt: Date.now(),
  };
}

/**
 * Filters and sorts the unified bestiary & faction catalog across both languages.
 */
export function filterBestiaryEntries(
  entries: readonly EncounterEntry[],
  filters: BestiaryFilterParams,
  lang: ModuleLanguage = 'fr'
): EncounterEntry[] {
  const query = normalizeSearchText(filters.search);

  const filtered = entries.filter((entry) => {
    if (filters.category !== 'all' && entry.kind !== filters.category) {
      return false;
    }
    if (filters.typeId !== 'all' && entry.typeId !== filters.typeId) {
      return false;
    }
    if (filters.source === 'official' && entry.isFanMade) {
      return false;
    }
    if (filters.source === 'fan' && !entry.isFanMade) {
      return false;
    }
    if (
      filters.environment !== 'all' &&
      !entry.environments.includes(filters.environment)
    ) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchableParts = [
      entry.name.fr,
      entry.name.en,
      entry.threat.fr,
      entry.threat.en,
      entry.reward.fr,
      entry.reward.en,
      entry.organization.fr,
      entry.organization.en,
      entry.intelligence.fr,
      entry.intelligence.en,
      getCreatureTypeLabel(entry.typeId, 'fr'),
      getCreatureTypeLabel(entry.typeId, 'en'),
      ...entry.environments.map((env) => getEnvironmentLabel(env, 'fr')),
      ...entry.environments.map((env) => getEnvironmentLabel(env, 'en')),
      ...entry.notes.fr,
      ...entry.notes.en,
    ];

    return searchableParts.some((part) =>
      normalizeSearchText(part).includes(query)
    );
  });

  return [...filtered].sort((a, b) =>
    a.name[lang].localeCompare(b.name[lang], lang, { sensitivity: 'base' })
  );
}

/**
 * Formats an encounter dossier as clean plain text for clipboard copying.
 */
export function formatEncounterAsText(
  entry: EncounterEntry,
  lang: ModuleLanguage
): string {
  const copy = getEncounterManagerCopy(lang);
  const d = copy.dossier;
  const envs = entry.environments
    .map((env) => getEnvironmentLabel(env, lang))
    .join(', ');

  const lines: string[] = [
    `${entry.name[lang]}${entry.isFanMade ? ` [${d.fanMadeTag}]` : ''}`,
    `${d.type}: ${getCreatureTypeLabel(entry.typeId, lang)}`,
    `${d.threat}: ${entry.threat[lang]}`,
    `${d.reward}: ${entry.reward[lang]}`,
    `${d.armor}: ${entry.armor[lang]}`,
    `${d.size}: ${entry.size[lang]}`,
    `${d.weight}: ${entry.weight[lang]}`,
    `${d.environments}: ${envs}`,
    `${d.intelligence}: ${entry.intelligence[lang]}`,
    `${d.organization}: ${entry.organization[lang]}`,
  ];

  if (entry.baseStats) {
    const stats = Object.entries(entry.baseStats)
      .map(([k, v]) => `${k} ${v}`)
      .join(' · ');
    lines.push(`${d.baseStats}: ${stats}`);
  }

  if (entry.combat) {
    const statsList = Object.entries(entry.combat.stats)
      .map(([k, v]) => `${k} ${v}`)
      .join(' · ');
    if (statsList) lines.push('', `${d.combatStats}: ${statsList}`);

    const skillsList = Object.entries(entry.combat.skills)
      .map(([k, v]) => `${k} +${v}`)
      .join(' · ');
    if (skillsList) lines.push(`${d.combatSkills}: ${skillsList}`);

    if (entry.combat.weapons.length > 0) {
      lines.push('', `${d.weapons}:`);
      entry.combat.weapons.forEach((w) =>
        lines.push(
          `- ${w.name}: ${w.damage} (${w.attacksPerTurn}x, ${w.effect})`
        )
      );
    }

    if (entry.combat.abilities.length > 0) {
      lines.push(`${d.abilities}: ${entry.combat.abilities.join(', ')}`);
    }
    if (entry.combat.vulnerabilities.length > 0) {
      lines.push(
        `${d.vulnerabilities}: ${entry.combat.vulnerabilities.join(', ')}`
      );
    }
    if (entry.combat.loot.length > 0) {
      lines.push(`${d.loot}: ${entry.combat.loot.join(', ')}`);
    }
  }

  const notes = entry.notes[lang];
  if (notes.length > 0) {
    lines.push('', `${d.notes}:`);
    notes.forEach((note) => lines.push(`- ${note}`));
  }

  return lines.join('\n');
}
