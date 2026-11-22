import type { LocalizedText } from '@/src/data/bestiary/types';

export type ModuleLanguage = 'en' | 'fr';

/**
 * Canonical identifiers for the 6 built-in regional maps of the Travel Manager hub.
 */
export type BuiltinTravelMapId =
  | 'continent'
  | 'skellige'
  | 'toussaint'
  | 'korath'
  | 'ophir'
  | 'zerrikania';

/**
 * Identifier for any regional map (built-in or user-imported custom map).
 */
export type TravelMapId = string;

export type TravelMapStatus = 'available' | 'coming-soon';

export type TravelMapFilter = 'all' | TravelMapStatus;

export type TravelMapAccentKey =
  | 'amber'
  | 'sky'
  | 'rose'
  | 'orange'
  | 'emerald'
  | 'violet';

export interface TravelMapAccent {
  topBar: string;
  iconBox: string;
  badge: string;
  cardHover: string;
}

/**
 * Metadata and creator attribution for an interactive map entry in the Travel Hub.
 */
export interface TravelMapDefinition {
  id: TravelMapId;
  /** Legacy route folder slug preserved for historical reference (e.g. 'c/', 's/'). */
  legacyPath: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  regionTag: LocalizedText;
  scaleHint: LocalizedText;
  status: TravelMapStatus;
  creatorName: string;
  creatorSourceUrl?: string;
  /** True when the map was imported locally by the user. */
  isCustom?: boolean;
  /** Selected accent preset key (used for editing custom maps). */
  accentKey?: TravelMapAccentKey;
  /** Local high-resolution map asset or object URL if integrated in the workspace. */
  imageSrc?: string;
  /** Natural image dimensions for exact aspect-ratio distance calculations. */
  naturalDimensions?: {
    width: number;
    height: number;
  };
  /** Default estimated distance in kilometers across the full image width. */
  defaultScaleKmPerWidth?: number;
  /** Static Tailwind classes for distinct regional visual identity. */
  accent: TravelMapAccent;
}

/**
 * Form payload for creating or updating a user-imported custom map.
 */
export interface CustomMapFormPayload {
  id?: string;
  name: string;
  subtitle: string;
  description: string;
  regionTag: string;
  scaleHint: string;
  creatorName: string;
  creatorSourceUrl: string;
  defaultScaleKmPerWidth: number;
  accentKey: TravelMapAccentKey;
  imageFile: File | null;
}

/**
 * Technical / inspiration credit displayed in the Travel Hub attribution section.
 */
export interface MapLibraryCredit {
  id: string;
  label: string;
  role: LocalizedText;
  url: string;
}

export type MapToolMode = 'pan' | 'add-waypoint' | 'calibrate';

export type WaypointType = 'city' | 'stage' | 'bivouac';

/**
 * Normalized coordinates (0..1 relative to image width and height).
 */
export interface MapPoint {
  x: number;
  y: number;
}

export interface TravelWaypoint {
  id: string;
  name: string;
  type: WaypointType;
  x: number;
  y: number;
  /** Optional full rest/stopover days spent at this location. */
  stopDays: number;
  notes: string;
}

export interface ScaleCalibration {
  p1: MapPoint;
  p2: MapPoint;
  knownKm: number;
  kmPerWidth: number;
  isCustom: boolean;
}

export type TransportModeId = 'foot' | 'horse' | 'wagon' | 'ship';

export type TravelPaceId = 'cautious' | 'normal' | 'forced';

export type TravelModifierCategory = 'land' | 'sea';

export type TravelModifierId =
  | 'land_mountain_road'
  | 'land_off_road'
  | 'land_poor_road'
  | 'land_encumbered'
  | 'land_bad_weather'
  | 'land_unknown_road'
  | 'land_crowded_road'
  | 'land_practiced_road'
  | 'land_paved_road'
  | 'sea_headwind'
  | 'sea_bad_weather'
  | 'sea_tailwind';

/**
 * Per-section customization keyed by `${fromWaypointId}__${toWaypointId}`.
 */
export interface SegmentOverrideConfig {
  /** Optional override; undefined inherits global TravelSettings.transport. */
  transport?: TransportModeId;
  /** Optional override; undefined inherits global TravelSettings.pace. */
  pace?: TravelPaceId;
  /** Active terrain/weather/navigation modifiers for this specific leg. */
  modifiers?: TravelModifierId[];
  /** Intermediate curve control points through which the spline smoothly passes. */
  curvePoints?: MapPoint[];
  /** Optional hex color override for this specific leg; undefined inherits global land/sea color. */
  color?: string;
  /** Optional stroke width override (px) for this specific leg; undefined inherits global thickness. */
  strokeWidth?: number;
}

export interface TravelSettings {
  transport: TransportModeId;
  pace: TravelPaceId;
  hoursPerDay: number;
  partySize: number;
  mountCount: number;
  rationsPerDay: number;
  /** Global route line thickness in screen pixels (0.6 - 6.0). */
  routeStrokeWidth: number;
  /** Default hex color for terrestrial legs. */
  landRouteColor: string;
  /** Default hex color for naval/sea legs. */
  seaRouteColor: string;
}

export interface RouteSegmentSummary {
  key: string;
  index: number;
  from: TravelWaypoint;
  to: TravelWaypoint;
  transport: TransportModeId;
  pace: TravelPaceId;
  modifiers: TravelModifierId[];
  curvePoints: MapPoint[];
  /** Resolved hex color for rendering this leg on the map. */
  strokeColor: string;
  /** Resolved stroke width (px) for rendering this leg on the map. */
  strokeWidth: number;
  /** Sampled points (normalized 0..1) tracing the straight or curved spline. */
  sampledPath: MapPoint[];
  /** Exact visual midpoint along the spline arc length. */
  midpoint: MapPoint;
  hasCustomOverride: boolean;
  speedMultiplier: number;
  effectiveSpeedKmPerHour: number;
  distanceKm: number;
  distanceMiles: number;
  travelHours: number;
  travelDays: number;
}

export interface RouteTotalSummary {
  totalDistanceKm: number;
  totalDistanceMiles: number;
  activeTravelHours: number;
  activeTravelDays: number;
  stopoverDays: number;
  totalJourneyDays: number;
  averageSpeedKmPerHour: number;
  averageKmPerDay: number;
  totalRations: number;
  totalWaterLiters: number;
  totalFodder: number;
  usesAnyMounts: boolean;
  segments: RouteSegmentSummary[];
}

export interface PersistedMapWorkspaceState {
  waypoints: TravelWaypoint[];
  calibration: ScaleCalibration | null;
  settings: TravelSettings;
  segmentsByKey: Record<string, SegmentOverrideConfig>;
}
