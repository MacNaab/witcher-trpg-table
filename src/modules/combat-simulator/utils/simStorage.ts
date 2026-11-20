import { ARCHETYPE_PRESETS } from '@/src/modules/combat-tracker/data/combatRulesData';
import { generateId } from '@/src/modules/combat-tracker/utils/combatEngine';
import type {
  ModuleLanguage,
  SavedSimulationSession,
  SimFighterConfig,
  SimulationReport,
  SimulationSettings,
} from '../types';
import {
  createDefaultSimSettings,
  createScenarioPreset,
  runCombatSimulationBatch,
} from './simulatorEngine';

export const SIMULATION_SESSIONS_STORAGE_KEY = 'witcher-gm-simulation-sessions-v1';
const LEGACY_SIM_DRAFT_KEY = 'witcher-gm-combat-simulator-v1';

export function createSimulationSession(options: {
  title?: string;
  teamA?: SimFighterConfig[];
  teamB?: SimFighterConfig[];
  settings?: SimulationSettings;
  lastReport?: SimulationReport | null;
  lang: ModuleLanguage;
}): SavedSimulationSession {
  const now = new Date().toISOString();
  const teamA = options.teamA ?? [];
  const teamB = options.teamB ?? [];
  const settings = options.settings ?? createDefaultSimSettings();

  const resolvedReport =
    options.lastReport !== undefined
      ? options.lastReport
      : teamA.length > 0 && teamB.length > 0
        ? runCombatSimulationBatch(teamA, teamB, settings, options.lang)
        : null;

  return {
    id: generateId('sim'),
    title:
      options.title?.trim() ||
      (options.lang === 'fr' ? 'Nouvelle simulation' : 'New Simulation'),
    createdAt: now,
    updatedAt: now,
    teamA,
    teamB,
    settings,
    lastReport: resolvedReport,
  };
}

export function loadSimulationSessions(
  lang: ModuleLanguage = 'fr'
): SavedSimulationSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SIMULATION_SESSIONS_STORAGE_KEY);
    if (raw === null) {
      // One-time migration from pre-hub single-workbench draft if present
      const legacyRaw = window.localStorage.getItem(LEGACY_SIM_DRAFT_KEY);
      if (legacyRaw) {
        try {
          const parsedLegacy = JSON.parse(legacyRaw) as {
            teamA?: SimFighterConfig[];
            teamB?: SimFighterConfig[];
            settings?: SimulationSettings;
          };
          if (
            Array.isArray(parsedLegacy.teamA) &&
            Array.isArray(parsedLegacy.teamB) &&
            (parsedLegacy.teamA.length > 0 || parsedLegacy.teamB.length > 0)
          ) {
            const migrated = createSimulationSession({
              title:
                lang === 'fr'
                  ? 'Simulation sauvegardée'
                  : 'Saved Simulation',
              teamA: parsedLegacy.teamA,
              teamB: parsedLegacy.teamB,
              settings: {
                ...createDefaultSimSettings(),
                ...(parsedLegacy.settings ?? {}),
              },
              lang,
            });
            saveSimulationSessions([migrated]);
            return [migrated];
          }
        } catch {
          // Ignore malformed legacy draft
        }
      }

      // First launch seed: 1 clean Witchers vs Ghouls benchmark entry in history
      const preset = createScenarioPreset('witcherVsGhouls', ARCHETYPE_PRESETS, lang);
      const seeded = createSimulationSession({
        title:
          lang === 'fr'
            ? 'Sorceleur vs 3 Goules'
            : 'Witcher vs 3 Ghouls',
        teamA: preset.teamA,
        teamB: preset.teamB,
        settings: createDefaultSimSettings(),
        lang,
      });
      saveSimulationSessions([seeded]);
      return [seeded];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter((item): item is SavedSimulationSession => {
      if (!item || typeof item !== 'object') return false;
      const c = item as Partial<SavedSimulationSession>;
      return (
        typeof c.id === 'string' &&
        typeof c.title === 'string' &&
        Array.isArray(c.teamA) &&
        Array.isArray(c.teamB) &&
        Boolean(c.settings)
      );
    });
    return valid.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch {
    return [];
  }
}

export function saveSimulationSessions(
  sessions: readonly SavedSimulationSession[]
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      SIMULATION_SESSIONS_STORAGE_KEY,
      JSON.stringify(sessions)
    );
  } catch {
    // Ignore quota issues
  }
}
