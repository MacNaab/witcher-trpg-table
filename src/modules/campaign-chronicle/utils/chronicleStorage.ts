import {
  ELVEN_MONTHS,
  formatContinentDate,
  getDayOfYear,
  getMonthDef,
  loadCalendarState,
} from '@/src/utils/continentCalendar';
import type {
  CampaignChronicleStore,
  CampaignRecord,
  ChronicleContinentDate,
  ChronicleEvent,
  ChronicleEventStatus,
  ChronicleSortOrder,
  ChronicleTimeOfDay,
  ModuleLanguage,
} from '../types';

export const CHRONICLE_STORAGE_KEY = 'witcher-gm-chronicle-v1';
export const CHRONICLE_UPDATED_EVENT = 'witcher-chronicle-updated';

const TIME_OF_DAY_ORDER: Record<ChronicleTimeOfDay, number> = {
  dawn: 1,
  morning: 2,
  afternoon: 3,
  dusk: 4,
  night: 5,
};

function createUniqueId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * Computes a deterministic numeric key so events across years, Elven months,
 * days, and time-of-day slices sort accurately in chronological order.
 */
export function computeContinentSortKey(date: ChronicleContinentDate): number {
  const safeMonth = Math.max(0, Math.min(ELVEN_MONTHS.length - 1, date.monthIndex));
  const monthDef = getMonthDef(safeMonth);
  const safeDay = Math.max(1, Math.min(monthDef.length, date.dayOfMonth));
  const dayOfYear = getDayOfYear(safeMonth, safeDay);
  const timeRank = TIME_OF_DAY_ORDER[date.timeOfDay] ?? 2;
  return date.year * 10000 + dayOfYear * 10 + timeRank;
}

export function formatEventDateLabel(
  date: ChronicleContinentDate,
  lang: ModuleLanguage
): string {
  return formatContinentDate(date)[lang];
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates a real-world calendar date string in YYYY-MM-DD format.
 */
export function normalizeRealDate(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!ISO_DATE_RE.test(trimmed)) return undefined;
  const [y, m, d] = trimmed.split('-').map(Number);
  const check = new Date(y, m - 1, d);
  if (
    check.getFullYear() !== y ||
    check.getMonth() !== m - 1 ||
    check.getDate() !== d
  ) {
    return undefined;
  }
  return trimmed;
}

export function sanitizeSessionDates(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const num = Number(key);
    if (!Number.isInteger(num) || num < 0) continue;
    const valid = normalizeRealDate(value);
    if (valid) {
      out[String(num)] = valid;
    }
  }
  return out;
}

/**
 * Formats an ISO real-world date string ("YYYY-MM-DD") without timezone shift.
 */
export function formatRealDateLabel(
  isoDate: string | undefined,
  lang: ModuleLanguage
): string | null {
  const normalized = normalizeRealDate(isoDate);
  if (!normalized) return null;
  const [y, m, d] = normalized.split('-').map(Number);
  const localDate = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(localDate);
}

/**
 * Clamps a Continent date to valid Elven month boundaries.
 */
export function normalizeContinentDate(
  input: Partial<ChronicleContinentDate> | undefined
): ChronicleContinentDate {
  const rawMonth =
    typeof input?.monthIndex === 'number' && Number.isFinite(input.monthIndex)
      ? Math.trunc(input.monthIndex)
      : 2;
  const monthIndex = Math.max(0, Math.min(ELVEN_MONTHS.length - 1, rawMonth));
  const maxDays = getMonthDef(monthIndex).length;
  const rawDay =
    typeof input?.dayOfMonth === 'number' && Number.isFinite(input.dayOfMonth)
      ? Math.trunc(input.dayOfMonth)
      : 1;
  const dayOfMonth = Math.max(1, Math.min(maxDays, rawDay));
  const year =
    typeof input?.year === 'number' && Number.isFinite(input.year)
      ? Math.max(1, Math.min(9999, Math.trunc(input.year)))
      : 1272;
  const timeOfDay: ChronicleTimeOfDay =
    input?.timeOfDay && input.timeOfDay in TIME_OF_DAY_ORDER
      ? input.timeOfDay
      : 'morning';

  return { year, monthIndex, dayOfMonth, timeOfDay };
}

/**
 * Reads the active date from the Continent Calendar module to pre-fill new events.
 */
export function getCalendarSnapshotDate(): ChronicleContinentDate {
  const cal = loadCalendarState();
  return normalizeContinentDate({
    year: cal.year,
    monthIndex: cal.monthIndex,
    dayOfMonth: cal.dayOfMonth,
    timeOfDay: 'morning',
  });
}

export function buildDefaultCampaign(lang: ModuleLanguage = 'fr'): CampaignRecord {
  const now = new Date().toISOString();
  return {
    id: createUniqueId('camp'),
    name: lang === 'fr' ? 'Chronique du Continent' : 'Continent Chronicle',
    subtitle:
      lang === 'fr'
        ? 'Acte I — Premiers contrats'
        : 'Act I — First Contracts',
    region: lang === 'fr' ? 'Royaumes du Nord' : 'Northern Realms',
    description: '',
    currentSessionNumber: 1,
    sessionDates: {},
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
}

export function buildInitialChronicleStore(
  lang: ModuleLanguage = 'fr'
): CampaignChronicleStore {
  const defaultCampaign = buildDefaultCampaign(lang);
  return {
    version: 1,
    activeCampaignId: defaultCampaign.id,
    campaigns: [defaultCampaign],
    events: [],
  };
}

function sanitizeCampaign(raw: Partial<CampaignRecord>): CampaignRecord {
  const now = new Date().toISOString();
  return {
    id: typeof raw.id === 'string' && raw.id.trim() ? raw.id : createUniqueId('camp'),
    name:
      typeof raw.name === 'string' && raw.name.trim()
        ? raw.name.trim()
        : 'Campagne sans titre',
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : '',
    region: typeof raw.region === 'string' ? raw.region : '',
    description: typeof raw.description === 'string' ? raw.description : '',
    currentSessionNumber:
      typeof raw.currentSessionNumber === 'number' &&
      Number.isFinite(raw.currentSessionNumber)
        ? Math.max(0, Math.trunc(raw.currentSessionNumber))
        : 1,
    sessionDates: sanitizeSessionDates(raw.sessionDates),
    status:
      raw.status === 'active' || raw.status === 'paused' || raw.status === 'completed'
        ? raw.status
        : 'active',
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now,
  };
}

function sanitizeEvent(
  raw: Partial<ChronicleEvent>,
  fallbackCampaignId: string
): ChronicleEvent {
  const now = new Date().toISOString();
  const validCategories = new Set([
    'story',
    'contract',
    'combat',
    'travel',
    'politics',
    'npc',
    'discovery',
    'downtime',
  ]);
  const validStatuses = new Set(['completed', 'active', 'upcoming', 'consequence']);
  const validImportances = new Set(['minor', 'major', 'turning-point']);

  return {
    id: typeof raw.id === 'string' && raw.id.trim() ? raw.id : createUniqueId('evt'),
    campaignId:
      typeof raw.campaignId === 'string' && raw.campaignId.trim()
        ? raw.campaignId
        : fallbackCampaignId,
    title:
      typeof raw.title === 'string' && raw.title.trim()
        ? raw.title.trim()
        : 'Événement',
    summary: typeof raw.summary === 'string' ? raw.summary : '',
    gmSecretNote: typeof raw.gmSecretNote === 'string' ? raw.gmSecretNote : '',
    date: normalizeContinentDate(raw.date),
    sessionNumber:
      typeof raw.sessionNumber === 'number' && Number.isFinite(raw.sessionNumber)
        ? Math.max(0, Math.trunc(raw.sessionNumber))
        : 1,
    category:
      raw.category && validCategories.has(raw.category) ? raw.category : 'story',
    status:
      raw.status && validStatuses.has(raw.status) ? raw.status : 'completed',
    importance:
      raw.importance && validImportances.has(raw.importance)
        ? raw.importance
        : 'major',
    location: typeof raw.location === 'string' ? raw.location : '',
    involvedEntities: Array.isArray(raw.involvedEntities)
      ? raw.involvedEntities
          .filter((item): item is string => typeof item === 'string')
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    consequences: typeof raw.consequences === 'string' ? raw.consequences : '',
    pinned: Boolean(raw.pinned),
    sortOrderOffset:
      typeof raw.sortOrderOffset === 'number' && Number.isFinite(raw.sortOrderOffset)
        ? raw.sortOrderOffset
        : 0,
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now,
  };
}

export function loadChronicleStore(
  fallbackLang: ModuleLanguage = 'fr'
): CampaignChronicleStore {
  if (typeof window === 'undefined') {
    return buildInitialChronicleStore(fallbackLang);
  }
  try {
    const raw = window.localStorage.getItem(CHRONICLE_STORAGE_KEY);
    if (!raw) return buildInitialChronicleStore(fallbackLang);
    const parsed = JSON.parse(raw) as Partial<CampaignChronicleStore>;
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      return buildInitialChronicleStore(fallbackLang);
    }

    const campaigns = Array.isArray(parsed.campaigns)
      ? parsed.campaigns.map((c) => sanitizeCampaign(c))
      : [];
    const normalizedCampaigns =
      campaigns.length > 0 ? campaigns : [buildDefaultCampaign(fallbackLang)];

    const campaignIdSet = new Set(normalizedCampaigns.map((c) => c.id));
    const activeCampaignId =
      typeof parsed.activeCampaignId === 'string' &&
      campaignIdSet.has(parsed.activeCampaignId)
        ? parsed.activeCampaignId
        : normalizedCampaigns[0].id;

    const events = Array.isArray(parsed.events)
      ? parsed.events
          .map((ev) => sanitizeEvent(ev, activeCampaignId))
          .filter((ev) => campaignIdSet.has(ev.campaignId))
      : [];

    return {
      version: 1,
      activeCampaignId,
      campaigns: normalizedCampaigns,
      events,
    };
  } catch {
    return buildInitialChronicleStore(fallbackLang);
  }
}

export function saveChronicleStore(store: CampaignChronicleStore): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CHRONICLE_STORAGE_KEY, JSON.stringify(store));
    window.dispatchEvent(new CustomEvent(CHRONICLE_UPDATED_EVENT));
  } catch {
    // Ignore storage quota issues
  }
}

export function sortChronicleEvents(
  events: readonly ChronicleEvent[],
  order: ChronicleSortOrder = 'asc'
): ChronicleEvent[] {
  const dir = order === 'asc' ? 1 : -1;
  return [...events].sort((a, b) => {
    const keyDiff =
      computeContinentSortKey(a.date) - computeContinentSortKey(b.date);
    if (keyDiff !== 0) return keyDiff * dir;

    const sessionDiff = a.sessionNumber - b.sessionNumber;
    if (sessionDiff !== 0) return sessionDiff * dir;

    const offsetDiff = a.sortOrderOffset - b.sortOrderOffset;
    if (offsetDiff !== 0) return offsetDiff * dir;

    return a.createdAt.localeCompare(b.createdAt) * dir;
  });
}

export interface ChronicleMonthGroup {
  key: string;
  year: number;
  monthIndex: number;
  events: ChronicleEvent[];
}

export function groupEventsByMonth(
  sortedEvents: readonly ChronicleEvent[]
): ChronicleMonthGroup[] {
  const groups: ChronicleMonthGroup[] = [];
  const indexByKey = new Map<string, number>();

  for (const event of sortedEvents) {
    const key = `${event.date.year}-${event.date.monthIndex}`;
    const existingIdx = indexByKey.get(key);
    if (existingIdx !== undefined) {
      groups[existingIdx].events.push(event);
    } else {
      indexByKey.set(key, groups.length);
      groups.push({
        key,
        year: event.date.year,
        monthIndex: event.date.monthIndex,
        events: [event],
      });
    }
  }

  return groups;
}

export interface ChronicleSessionGroup {
  sessionNumber: number;
  events: ChronicleEvent[];
}

export function groupEventsBySession(
  events: readonly ChronicleEvent[],
  order: ChronicleSortOrder
): ChronicleSessionGroup[] {
  const bySession = new Map<number, ChronicleEvent[]>();
  for (const ev of events) {
    const list = bySession.get(ev.sessionNumber) ?? [];
    list.push(ev);
    bySession.set(ev.sessionNumber, list);
  }

  const sessionNumbers = [...bySession.keys()].sort((a, b) =>
    order === 'asc' ? a - b : b - a
  );

  return sessionNumbers.map((sessionNumber) => ({
    sessionNumber,
    events: sortChronicleEvents(bySession.get(sessionNumber) ?? [], order),
  }));
}

export function getNextEventStatus(
  status: ChronicleEventStatus
): ChronicleEventStatus {
  switch (status) {
    case 'upcoming':
      return 'active';
    case 'active':
      return 'completed';
    case 'completed':
      return 'consequence';
    case 'consequence':
      return 'upcoming';
  }
}

export function duplicateCampaignWithEvents(
  store: CampaignChronicleStore,
  campaignId: string,
  copySuffix: string
): { nextStore: CampaignChronicleStore; duplicatedCampaign: CampaignRecord } | null {
  const source = store.campaigns.find((c) => c.id === campaignId);
  if (!source) return null;

  const now = new Date().toISOString();
  const newCampaignId = createUniqueId('camp');
  const duplicatedCampaign: CampaignRecord = {
    ...source,
    id: newCampaignId,
    name: `${source.name} (${copySuffix})`,
    createdAt: now,
    updatedAt: now,
  };

  const clonedEvents: ChronicleEvent[] = store.events
    .filter((ev) => ev.campaignId === campaignId)
    .map((ev) => ({
      ...ev,
      id: createUniqueId('evt'),
      campaignId: newCampaignId,
      createdAt: now,
      updatedAt: now,
    }));

  return {
    duplicatedCampaign,
    nextStore: {
      ...store,
      activeCampaignId: newCampaignId,
      campaigns: [duplicatedCampaign, ...store.campaigns],
      events: [...clonedEvents, ...store.events],
    },
  };
}

/**
 * Creates a concise 4-event Witcher sample arc for GMs who want to preview
 * multi-session chronological layout before adding their own campaign entries.
 */
export function buildSampleChronicleEvents(
  campaignId: string,
  lang: ModuleLanguage
): ChronicleEvent[] {
  const now = new Date().toISOString();
  const isFr = lang === 'fr';

  return [
    {
      id: createUniqueId('evt'),
      campaignId,
      title: isFr
        ? 'Contrat affiché au Carrefour des Quatre-Vents'
        : 'Contract Posted at Four-Winds Crossroads',
      summary: isFr
        ? 'Le bourgmestre offre 250 couronnes pour élucider la disparition de deux chariots de sel dans les marais.'
        : 'The alderman offers 250 crowns to investigate two salt wagons missing in the marsh.',
      gmSecretNote: isFr
        ? 'Le contremaître paie secrètement les brigands ; un guenaud rôde près du vieux pont.'
        : 'The foreman is secretly tipping off bandits; a grave hag lurks near the sunken bridge.',
      date: { year: 1272, monthIndex: 2, dayOfMonth: 12, timeOfDay: 'morning' },
      sessionNumber: 1,
      category: 'contract',
      status: 'completed',
      importance: 'major',
      location: isFr ? 'Témérie — Velen' : 'Temeria — Velen',
      involvedEntities: isFr
        ? ['Bourgmestre Radomir', 'Marchands de sel']
        : ['Alderman Radomir', 'Salt Merchants'],
      consequences: isFr
        ? 'Le groupe a gagné la confiance du village mais éveillé la méfiance du bailli.'
        : 'The party earned village trust but drew suspicion from the bailiff.',
      pinned: false,
      sortOrderOffset: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createUniqueId('evt'),
      campaignId,
      title: isFr
        ? 'Embuscade de noyeurs et traces de médaillon brisé'
        : 'Drowner Ambush & Shattered Medallion Clues',
      summary: isFr
        ? 'Affrontement près des ruines immergées ; découverte d’un pendentif gravé aux armes d’une ancienne loge.'
        : 'Skirmish near the flooded ruins; discovery of a fractured pendant bearing lodge sigils.',
      gmSecretNote: isFr
        ? 'Le médaillon appartenait à un espion rédaniens capturé par des Scoia’tael.'
        : 'The pendant belonged to a Redanian courier captured by a Scoia’tael unit.',
      date: { year: 1272, monthIndex: 2, dayOfMonth: 14, timeOfDay: 'dusk' },
      sessionNumber: 1,
      category: 'discovery',
      status: 'completed',
      importance: 'turning-point',
      location: isFr ? 'Pont noyé de Torsin' : 'Torsin Sunken Bridge',
      involvedEntities: isFr
        ? ['Noyeurs', 'Éclaireur inconnu']
        : ['Drowners', 'Unknown Scout'],
      consequences: isFr
        ? 'Piste ouverte vers l’apothicaire d’Oxenfurt pour identifier le sceau.'
        : 'New lead pointing toward an Oxenfurt apothecary to identify the crest.',
      pinned: true,
      sortOrderOffset: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createUniqueId('evt'),
      campaignId,
      title: isFr
        ? 'Négociation tendue à la taverne de l’Alambic'
        : 'Tense Negotiation at the Alembic Tavern',
      summary: isFr
        ? 'L’apothicaire accepte de traduire les runes en échange d’un extrait de glandes de basilic.'
        : 'The apothecary agrees to translate the runes in exchange for basilisk venom glands.',
      gmSecretNote: isFr
        ? 'Des agents nilfgaardiens surveillent l’entrée sud d’Oxenfurt.'
        : 'Nilfgaardian agents are watching the southern gate of Oxenfurt.',
      date: { year: 1272, monthIndex: 2, dayOfMonth: 19, timeOfDay: 'night' },
      sessionNumber: 2,
      category: 'politics',
      status: 'active',
      importance: 'major',
      location: 'Oxenfurt',
      involvedEntities: isFr
        ? ['Maître Alwin', 'Chasseurs de primes']
        : ['Master Alwin', 'Bounty Hunters'],
      consequences: isFr
        ? 'Délai de 5 jours avant que l’archive ne soit revendue à un rival.'
        : '5-day clock before the ciphered ledger is sold to a rival buyer.',
      pinned: true,
      sortOrderOffset: 0,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createUniqueId('evt'),
      campaignId,
      title: isFr
        ? 'Passage des patrouilles impériales sur la Pontar'
        : 'Imperial Patrol Sweep Along the Pontar',
      summary: isFr
        ? 'Contrôle renforcé des bacs fluviaux ; tout laissez-passer contrefait risque un procès verbal.'
        : 'Tightened river ferry inspections; forged passes risk immediate interrogation.',
      gmSecretNote: isFr
        ? 'Déclencher cet événement dès que le groupe quitte Oxenfurt par le fleuve.'
        : 'Trigger this encounter as soon as the party leaves Oxenfurt by barge.',
      date: { year: 1272, monthIndex: 2, dayOfMonth: 24, timeOfDay: 'dawn' },
      sessionNumber: 3,
      category: 'travel',
      status: 'upcoming',
      importance: 'minor',
      location: isFr ? 'Fleuve Pontar' : 'Pontar River',
      involvedEntities: isFr
        ? ['Garnison nilfgaardienne']
        : ['Nilfgaardian Garrison'],
      consequences: isFr
        ? 'Peut mener à un combat verbal ou à un détour de 2 jours par les collines.'
        : 'May trigger a verbal duel or a 2-day detour through the hills.',
      pinned: false,
      sortOrderOffset: 0,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

/**
 * Generates sample real-world dates relative to today for the 3 sample sessions.
 */
export function buildSampleSessionDates(): Record<string, string> {
  const toIso = (daysOffset: number) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + daysOffset);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  return {
    '1': toIso(-14),
    '2': toIso(-7),
    '3': toIso(7),
  };
}
