import type { LocalizedText } from '@/src/data/bestiary/types';
import type {
  TransportModeId,
  TravelModifierCategory,
  TravelModifierId,
  TravelPaceId,
  TravelSettings,
  WaypointType,
} from '../types';

export interface WaypointTypeMeta {
  id: WaypointType;
  label: LocalizedText;
  defaultPrefix: LocalizedText;
  pinBg: string;
  pinBorder: string;
  badgeClass: string;
}

export const WAYPOINT_TYPE_LIST: readonly WaypointTypeMeta[] = [
  {
    id: 'city',
    label: { en: 'City / Town', fr: 'Ville / Cité' },
    defaultPrefix: { en: 'City', fr: 'Ville' },
    pinBg: 'bg-amber-500 text-stone-950',
    pinBorder: 'border-amber-200 ring-amber-500/40',
    badgeClass:
      'border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  {
    id: 'stage',
    label: { en: 'Stage / Inn / Waypost', fr: 'Étape / Relais' },
    defaultPrefix: { en: 'Stage', fr: 'Étape' },
    pinBg: 'bg-sky-500 text-stone-950',
    pinBorder: 'border-sky-200 ring-sky-500/40',
    badgeClass:
      'border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300',
  },
  {
    id: 'bivouac',
    label: { en: 'Bivouac / Camp', fr: 'Bivouac / Camp' },
    defaultPrefix: { en: 'Bivouac', fr: 'Bivouac' },
    pinBg: 'bg-emerald-500 text-stone-950',
    pinBorder: 'border-emerald-200 ring-emerald-500/40',
    badgeClass:
      'border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
] as const;

export function getWaypointTypeMeta(type: WaypointType): WaypointTypeMeta {
  return (
    WAYPOINT_TYPE_LIST.find((item) => item.id === type) ?? WAYPOINT_TYPE_LIST[0]
  );
}

export interface TransportModePreset {
  id: TransportModeId;
  label: LocalizedText;
  hint: LocalizedText;
  /** Base speed in km/h during active travel. */
  baseKmPerHour: number;
  usesMounts: boolean;
  category: TravelModifierCategory;
}

export const TRANSPORT_MODES: readonly TransportModePreset[] = [
  {
    id: 'foot',
    label: { en: 'On Foot', fr: 'À pied' },
    hint: { en: '~30 km / 8h day', fr: '~30 km / jour (8h)' },
    baseKmPerHour: 3.75,
    usesMounts: false,
    category: 'land',
  },
  {
    id: 'horse',
    label: { en: 'Horseback / Mount', fr: 'À cheval / Monture' },
    hint: { en: '~48 km / 8h day', fr: '~48 km / jour (8h)' },
    baseKmPerHour: 6.0,
    usesMounts: true,
    category: 'land',
  },
  {
    id: 'wagon',
    label: { en: 'Wagon / Caravan', fr: 'Chariot / Caravane' },
    hint: { en: '~24 km / 8h day', fr: '~24 km / jour (8h)' },
    baseKmPerHour: 3.0,
    usesMounts: true,
    category: 'land',
  },
  {
    id: 'ship',
    label: { en: 'Ship / Longship', fr: 'Navire / Drakkar' },
    hint: { en: '~110 km / 8h leg', fr: '~110 km / étape (8h)' },
    baseKmPerHour: 13.75,
    usesMounts: false,
    category: 'sea',
  },
] as const;

export function getTransportModePreset(
  id: TransportModeId
): TransportModePreset {
  return TRANSPORT_MODES.find((t) => t.id === id) ?? TRANSPORT_MODES[0];
}

export interface TravelPacePreset {
  id: TravelPaceId;
  label: LocalizedText;
  hint: LocalizedText;
  multiplier: number;
}

export const TRAVEL_PACES: readonly TravelPacePreset[] = [
  {
    id: 'cautious',
    label: { en: 'Cautious / Scout (×0.75)', fr: 'Prudente / Éclaireur (×0,75)' },
    hint: {
      en: 'Discreet travel, bonus to spot ambushes and forage',
      fr: 'Progression discrète, repérage d’embuscades et cueillette facilités',
    },
    multiplier: 0.75,
  },
  {
    id: 'normal',
    label: { en: 'Normal Pace (×1.0)', fr: 'Allure normale (×1,0)' },
    hint: {
      en: 'Standard march with regular rests and no fatigue penalty',
      fr: 'Marche standard avec pauses régulières, sans malus de fatigue',
    },
    multiplier: 1.0,
  },
  {
    id: 'forced',
    label: { en: 'Forced March (×1.35)', fr: 'Marche forcée (×1,35)' },
    hint: {
      en: 'Covers more ground rapidly; risks Endurance checks & exhaustion',
      fr: 'Distance accrue rapidement ; expose aux tests d’Endurance et à la fatigue',
    },
    multiplier: 1.35,
  },
] as const;

export function getTravelPacePreset(id: TravelPaceId): TravelPacePreset {
  return TRAVEL_PACES.find((p) => p.id === id) ?? TRAVEL_PACES[1];
}

export interface TravelModifierPreset {
  id: TravelModifierId;
  category: TravelModifierCategory;
  name: LocalizedText;
  /** Signed decimal percentage delta: e.g., -0.75 for -75%, +0.20 for +20%. */
  value: number;
}

/**
 * Canonical Terrestre (Land) and Navigation (Sea) route speed modifiers.
 */
export const TRAVEL_MODIFIERS: readonly TravelModifierPreset[] = [
  // Terrestre
  {
    id: 'land_mountain_road',
    category: 'land',
    name: { en: 'Mountain road', fr: 'Route de montagne' },
    value: -0.75,
  },
  {
    id: 'land_off_road',
    category: 'land',
    name: { en: 'Off-road / Wilderness', fr: 'Hors piste' },
    value: -0.5,
  },
  {
    id: 'land_poor_road',
    category: 'land',
    name: { en: 'Poorly maintained road', fr: 'Route mal entretenue' },
    value: -0.25,
  },
  {
    id: 'land_encumbered',
    category: 'land',
    name: { en: 'Heavily laden / Encumbered', fr: 'Chargé' },
    value: -0.2,
  },
  {
    id: 'land_bad_weather',
    category: 'land',
    name: { en: 'Adverse weather', fr: 'Météo défavorable' },
    value: -0.2,
  },
  {
    id: 'land_unknown_road',
    category: 'land',
    name: { en: 'Uncharted / Unknown road', fr: 'Route inconnue' },
    value: -0.2,
  },
  {
    id: 'land_crowded_road',
    category: 'land',
    name: { en: 'Heavily trafficked road', fr: 'Route très fréquentée' },
    value: -0.1,
  },
  {
    id: 'land_practiced_road',
    category: 'land',
    name: { en: 'Familiar / Well-worn road', fr: 'Route pratiquée' },
    value: 0.1,
  },
  {
    id: 'land_paved_road',
    category: 'land',
    name: { en: 'Paved highway', fr: 'Route pavée' },
    value: 0.2,
  },
  // Navigation
  {
    id: 'sea_headwind',
    category: 'sea',
    name: { en: 'Headwind', fr: 'Contre-vent' },
    value: -0.5,
  },
  {
    id: 'sea_bad_weather',
    category: 'sea',
    name: { en: 'Adverse sea weather', fr: 'Météo défavorable' },
    value: -0.25,
  },
  {
    id: 'sea_tailwind',
    category: 'sea',
    name: { en: 'Favorable tailwind', fr: 'Vent bénéfique' },
    value: 0.5,
  },
] as const;

const MODIFIER_MAP = new Map<TravelModifierId, TravelModifierPreset>(
  TRAVEL_MODIFIERS.map((m) => [m.id, m])
);

export function getTravelModifierById(
  id: TravelModifierId
): TravelModifierPreset | undefined {
  return MODIFIER_MAP.get(id);
}

export function formatModifierPercent(value: number): string {
  const pct = Math.round(value * 100);
  return pct > 0 ? `+${pct}%` : `${pct}%`;
}

export const MIN_ROUTE_STROKE_WIDTH = 0.3;
export const MAX_ROUTE_STROKE_WIDTH = 6.0;
export const DEFAULT_ROUTE_STROKE_WIDTH = 2.0;
export const DEFAULT_LAND_ROUTE_COLOR = '#f59e0b';
export const DEFAULT_SEA_ROUTE_COLOR = '#38bdf8';

export interface RouteColorPreset {
  id: string;
  hex: string;
  label: LocalizedText;
}

/**
 * Curated high-contrast cartographic ink & route color swatches.
 */
export const ROUTE_COLOR_PRESETS: readonly RouteColorPreset[] = [
  { id: 'amber', hex: '#f59e0b', label: { en: 'Amber Gold', fr: 'Or ambré' } },
  { id: 'sky', hex: '#38bdf8', label: { en: 'Sea Azure', fr: 'Bleu azur' } },
  { id: 'crimson', hex: '#ef4444', label: { en: 'Crimson', fr: 'Carmin' } },
  { id: 'emerald', hex: '#10b981', label: { en: 'Emerald', fr: 'Émeraude' } },
  { id: 'violet', hex: '#a855f7', label: { en: 'Arcane Violet', fr: 'Violet arcanique' } },
  { id: 'rose', hex: '#ec4899', label: { en: 'Rose', fr: 'Rose' } },
  { id: 'ivory', hex: '#f5f5f4', label: { en: 'Parchment Ivory', fr: 'Ivoire' } },
  { id: 'ink', hex: '#1c1917', label: { en: 'Charcoal Ink', fr: 'Encre noire' } },
] as const;

export const DEFAULT_TRAVEL_SETTINGS: TravelSettings = {
  transport: 'horse',
  pace: 'normal',
  hoursPerDay: 8,
  partySize: 4,
  mountCount: 4,
  rationsPerDay: 1,
  routeStrokeWidth: DEFAULT_ROUTE_STROKE_WIDTH,
  landRouteColor: DEFAULT_LAND_ROUTE_COLOR,
  seaRouteColor: DEFAULT_SEA_ROUTE_COLOR,
};
