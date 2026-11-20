import type {
  GeneratedEnvironment,
  GeneratedSingleBuilding,
  ModuleLanguage,
  SavedUrbanBuilding,
  SavedUrbanEnvironment,
  UrbanHistoryState,
} from '../types';

export const URBAN_HISTORY_STORAGE_KEY = 'witcher-gm-urban-history-v1';

const EMPTY_HISTORY: UrbanHistoryState = {
  environments: [],
  buildings: [],
};

export function generateUrbanId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function loadUrbanHistory(): UrbanHistoryState {
  if (typeof window === 'undefined') return EMPTY_HISTORY;
  try {
    const raw = window.localStorage.getItem(URBAN_HISTORY_STORAGE_KEY);
    if (!raw) return EMPTY_HISTORY;
    const parsed = JSON.parse(raw) as Partial<UrbanHistoryState>;
    return {
      environments: Array.isArray(parsed.environments)
        ? parsed.environments
        : [],
      buildings: Array.isArray(parsed.buildings) ? parsed.buildings : [],
    };
  } catch {
    return EMPTY_HISTORY;
  }
}

export function saveUrbanHistory(state: UrbanHistoryState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      URBAN_HISTORY_STORAGE_KEY,
      JSON.stringify(state)
    );
  } catch {
    // Ignore storage quota / privacy mode errors cleanly
  }
}

export function upsertEnvironmentHistory(
  history: UrbanHistoryState,
  existingId: string | null,
  data: GeneratedEnvironment
): { history: UrbanHistoryState; entryId: string } {
  const now = new Date().toISOString();
  if (existingId && history.environments.some((e) => e.id === existingId)) {
    const updated = history.environments
      .map((entry) =>
        entry.id === existingId
          ? { ...entry, updatedAt: now, data }
          : entry
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return {
      history: { ...history, environments: updated },
      entryId: existingId,
    };
  }

  const newId = generateUrbanId('uenv');
  const nextEntry: SavedUrbanEnvironment = {
    id: newId,
    updatedAt: now,
    data,
  };
  return {
    history: {
      ...history,
      environments: [nextEntry, ...history.environments].slice(0, 40),
    },
    entryId: newId,
  };
}

export function upsertBuildingHistory(
  history: UrbanHistoryState,
  existingId: string | null,
  data: GeneratedSingleBuilding
): { history: UrbanHistoryState; entryId: string } {
  const now = new Date().toISOString();
  if (existingId && history.buildings.some((b) => b.id === existingId)) {
    const updated = history.buildings
      .map((entry) =>
        entry.id === existingId
          ? { ...entry, updatedAt: now, data }
          : entry
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return {
      history: { ...history, buildings: updated },
      entryId: existingId,
    };
  }

  const newId = generateUrbanId('ubld');
  const nextEntry: SavedUrbanBuilding = {
    id: newId,
    updatedAt: now,
    data,
  };
  return {
    history: {
      ...history,
      buildings: [nextEntry, ...history.buildings].slice(0, 50),
    },
    entryId: newId,
  };
}

export function formatUrbanTimestamp(iso: string, lang: ModuleLanguage): string {
  try {
    const date = new Date(iso);
    return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return iso.slice(0, 16);
  }
}
