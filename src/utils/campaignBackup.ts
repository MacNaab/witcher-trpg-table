export const CAMPAIGN_STORAGE_PREFIX = 'witcher-gm-';

export interface CampaignBackupSummary {
  totalKeys: number;
  hubPcs: number;
  hubGroups: number;
  hubNpcs: number;
  hubMonsters: number;
  combatSessions: number;
  simSessions: number;
  urbanEntries: number;
  travelRoutes: number;
  hasCharGenDraft: boolean;
  rollerHistories: number;
  chronicleCampaigns: number;
  chronicleEvents: number;
}

export interface CampaignBackupPayload {
  app: 'witcher-gm-grimoire';
  version: 1;
  exportedAt: string;
  keys: Record<string, string>;
}

function safeParseJson<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function summarizeCampaignKeys(
  keys: Record<string, string>
): CampaignBackupSummary {
  const entries = Object.entries(keys);

  const hub = safeParseJson<{
    characters?: unknown[];
    groups?: unknown[];
    customNpcs?: unknown[];
    customMonsters?: unknown[];
  }>(keys['witcher-gm-combat-hub-v1']);

  const combatSessions = safeParseJson<unknown[]>(
    keys['witcher-gm-combat-sessions-v1']
  );
  const simSessions = safeParseJson<unknown[]>(
    keys['witcher-gm-simulation-sessions-v1']
  );
  const urbanHistory = safeParseJson<unknown[]>(
    keys['witcher-gm-urban-history-v1']
  );
  const chargenDraft = safeParseJson<{ characterName?: string }>(
    keys['witcher-gm-chargen-draft-v1']
  );
  const chronicle = safeParseJson<{
    campaigns?: unknown[];
    events?: unknown[];
  }>(keys['witcher-gm-chronicle-v1']);

  let travelRoutes = 0;
  let rollerHistories = 0;

  for (const [key, rawVal] of entries) {
    if (key.startsWith('witcher-gm-travel-v1-')) {
      const parsed = safeParseJson<{ waypoints?: unknown[] }>(rawVal);
      if (Array.isArray(parsed?.waypoints) && parsed.waypoints.length > 0) {
        travelRoutes += 1;
      }
    } else if (
      key === 'witcher-gm-chest-history-v1' ||
      key === 'witcher-gm-random-tables-v1' ||
      key === 'witcher-gm-modular-enc-v1' ||
      key.startsWith('witcher-gm-enc-roller-')
    ) {
      const parsed = safeParseJson<unknown>(rawVal);
      if (Array.isArray(parsed)) {
        rollerHistories += parsed.length;
      } else if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray((parsed as { history?: unknown[] }).history)
      ) {
        rollerHistories += (parsed as { history: unknown[] }).history.length;
      }
    }
  }

  return {
    totalKeys: entries.length,
    hubPcs: Array.isArray(hub?.characters) ? hub.characters.length : 0,
    hubGroups: Array.isArray(hub?.groups) ? hub.groups.length : 0,
    hubNpcs: Array.isArray(hub?.customNpcs) ? hub.customNpcs.length : 0,
    hubMonsters: Array.isArray(hub?.customMonsters)
      ? hub.customMonsters.length
      : 0,
    combatSessions: Array.isArray(combatSessions) ? combatSessions.length : 0,
    simSessions: Array.isArray(simSessions) ? simSessions.length : 0,
    urbanEntries: Array.isArray(urbanHistory) ? urbanHistory.length : 0,
    travelRoutes,
    hasCharGenDraft: Boolean(chargenDraft),
    rollerHistories,
    chronicleCampaigns: Array.isArray(chronicle?.campaigns)
      ? chronicle.campaigns.length
      : 0,
    chronicleEvents: Array.isArray(chronicle?.events)
      ? chronicle.events.length
      : 0,
  };
}

export function collectLocalCampaignBackup(): {
  payload: CampaignBackupPayload;
  summary: CampaignBackupSummary;
} {
  const keys: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(CAMPAIGN_STORAGE_PREFIX)) {
        const value = window.localStorage.getItem(key);
        if (value !== null) {
          keys[key] = value;
        }
      }
    }
  }

  return {
    payload: {
      app: 'witcher-gm-grimoire',
      version: 1,
      exportedAt: new Date().toISOString(),
      keys,
    },
    summary: summarizeCampaignKeys(keys),
  };
}

export function parseCampaignBackupJson(rawText: string): {
  payload: CampaignBackupPayload;
  summary: CampaignBackupSummary;
} | null {
  try {
    const parsed = JSON.parse(rawText) as Partial<CampaignBackupPayload>;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.app !== 'witcher-gm-grimoire' ||
      parsed.version !== 1 ||
      !parsed.keys ||
      typeof parsed.keys !== 'object' ||
      Array.isArray(parsed.keys)
    ) {
      return null;
    }

    const sanitizedKeys: Record<string, string> = {};
    for (const [key, val] of Object.entries(parsed.keys)) {
      if (key.startsWith(CAMPAIGN_STORAGE_PREFIX) && typeof val === 'string') {
        sanitizedKeys[key] = val;
      }
    }

    const payload: CampaignBackupPayload = {
      app: 'witcher-gm-grimoire',
      version: 1,
      exportedAt:
        typeof parsed.exportedAt === 'string'
          ? parsed.exportedAt
          : new Date().toISOString(),
      keys: sanitizedKeys,
    };

    return {
      payload,
      summary: summarizeCampaignKeys(sanitizedKeys),
    };
  } catch {
    return null;
  }
}

export function applyCampaignBackup(
  payload: CampaignBackupPayload,
  mode: 'replace' | 'merge'
): void {
  if (typeof window === 'undefined') return;

  if (mode === 'replace') {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(CAMPAIGN_STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      window.localStorage.removeItem(key);
    }
  }

  for (const [key, value] of Object.entries(payload.keys)) {
    if (key.startsWith(CAMPAIGN_STORAGE_PREFIX) && typeof value === 'string') {
      window.localStorage.setItem(key, value);
    }
  }
}

export function downloadCampaignBackupFile(
  payload: CampaignBackupPayload
): void {
  const dateTag = new Date().toISOString().slice(0, 10);
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `witcher-gm-campaign-${dateTag}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
