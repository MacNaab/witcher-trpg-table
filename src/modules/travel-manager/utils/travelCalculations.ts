import {
  DEFAULT_LAND_ROUTE_COLOR,
  DEFAULT_ROUTE_STROKE_WIDTH,
  DEFAULT_SEA_ROUTE_COLOR,
  DEFAULT_TRAVEL_SETTINGS,
  MAX_ROUTE_STROKE_WIDTH,
  MIN_ROUTE_STROKE_WIDTH,
  getTransportModePreset,
  getTravelModifierById,
  getTravelPacePreset,
} from '../data/travelPresets';
import type {
  MapPoint,
  ModuleLanguage,
  PersistedMapWorkspaceState,
  RouteSegmentSummary,
  RouteTotalSummary,
  ScaleCalibration,
  SegmentOverrideConfig,
  TravelMapId,
  TravelModifierCategory,
  TravelModifierId,
  TravelSettings,
  TravelWaypoint,
} from '../types';

const KM_TO_MILES = 0.621371;
const STORAGE_PREFIX = 'witcher-gm-travel-workspace-v1:';

const HARSH_WATER_MODIFIERS = new Set<TravelModifierId>([
  'land_mountain_road',
  'land_off_road',
  'land_bad_weather',
  'sea_bad_weather',
]);

/**
 * Deterministic segment key linking two waypoints in sequence.
 */
export function buildSegmentKey(fromId: string, toId: string): string {
  return `${fromId}__${toId}`;
}

/**
 * Computes Euclidean distance between two normalized points (0..1) in width units,
 * accounting for image aspectRatio = naturalHeight / naturalWidth.
 */
export function computeNormalizedWidthDistance(
  a: MapPoint,
  b: MapPoint,
  aspectRatio: number
): number {
  const dx = b.x - a.x;
  const dy = (b.y - a.y) * aspectRatio;
  return Math.hypot(dx, dy);
}

/**
 * Converts two normalized points into real-world kilometers given the calibrated
 * kilometers per full image width (`kmPerWidth`).
 */
export function computeDistanceKm(
  a: MapPoint,
  b: MapPoint,
  aspectRatio: number,
  kmPerWidth: number
): number {
  return computeNormalizedWidthDistance(a, b, aspectRatio) * kmPerWidth;
}

export function kmToMiles(km: number): number {
  return km * KM_TO_MILES;
}

/**
 * Computes the cubic Bezier control points for a Catmull-Rom spline segment
 * between points[i] and points[i+1], passing smoothly through all control points.
 */
export function getCatmullRomBezierControlPoints(
  points: readonly MapPoint[],
  index: number
): { p0: MapPoint; c1: MapPoint; c2: MapPoint; p3: MapPoint } {
  const p0 = points[index];
  const p3 = points[index + 1];
  const pPrev = index > 0 ? points[index - 1] : p0;
  const pNext = index + 2 < points.length ? points[index + 2] : p3;

  const c1: MapPoint = {
    x: Math.max(0, Math.min(1, p0.x + (p3.x - pPrev.x) / 6)),
    y: Math.max(0, Math.min(1, p0.y + (p3.y - pPrev.y) / 6)),
  };
  const c2: MapPoint = {
    x: Math.max(0, Math.min(1, p3.x - (pNext.x - p0.x) / 6)),
    y: Math.max(0, Math.min(1, p3.y - (pNext.y - p0.y) / 6)),
  };

  return { p0, c1, c2, p3 };
}

/**
 * Evaluates a cubic Bezier curve at parameter t in [0, 1].
 */
function evalCubicBezier(
  p0: MapPoint,
  c1: MapPoint,
  c2: MapPoint,
  p3: MapPoint,
  t: number
): MapPoint {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + ttt * p3.y,
  };
}

/**
 * Samples a segment's `[from, ...curvePoints, to]` spline into dense points,
 * computing its exact arc-length distance (in normalized width units) and midpoint.
 */
export function sampleSegmentSpline(
  from: MapPoint,
  to: MapPoint,
  curvePoints: readonly MapPoint[],
  aspectRatio: number
): {
  sampledPath: MapPoint[];
  normalizedWidthLength: number;
  midpoint: MapPoint;
} {
  if (curvePoints.length === 0) {
    return {
      sampledPath: [from, to],
      normalizedWidthLength: computeNormalizedWidthDistance(
        from,
        to,
        aspectRatio
      ),
      midpoint: { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 },
    };
  }

  const anchors: MapPoint[] = [from, ...curvePoints, to];
  const stepsPerSpan = 24;
  const sampledPath: MapPoint[] = [from];

  for (let i = 0; i < anchors.length - 1; i++) {
    const { p0, c1, c2, p3 } = getCatmullRomBezierControlPoints(anchors, i);
    for (let s = 1; s <= stepsPerSpan; s++) {
      sampledPath.push(evalCubicBezier(p0, c1, c2, p3, s / stepsPerSpan));
    }
  }

  const cumLengths: number[] = [0];
  let totalLen = 0;
  for (let i = 1; i < sampledPath.length; i++) {
    totalLen += computeNormalizedWidthDistance(
      sampledPath[i - 1],
      sampledPath[i],
      aspectRatio
    );
    cumLengths.push(totalLen);
  }

  const halfLen = totalLen / 2;
  let midpoint = sampledPath[Math.floor(sampledPath.length / 2)];
  for (let i = 1; i < cumLengths.length; i++) {
    if (cumLengths[i] >= halfLen) {
      const spanLen = cumLengths[i] - cumLengths[i - 1];
      const frac = spanLen > 0 ? (halfLen - cumLengths[i - 1]) / spanLen : 0;
      const a = sampledPath[i - 1];
      const b = sampledPath[i];
      midpoint = {
        x: a.x + (b.x - a.x) * frac,
        y: a.y + (b.y - a.y) * frac,
      };
      break;
    }
  }

  return { sampledPath, normalizedWidthLength: totalLen, midpoint };
}

/**
 * Generates an SVG path string (`M ... C ...` or `M ... L ...`) in SVG viewBox space
 * matching the smooth Catmull-Rom spline through `[from, ...curvePoints, to]`.
 */
export function buildSvgSegmentPath(
  from: MapPoint,
  to: MapPoint,
  curvePoints: readonly MapPoint[],
  svgWidth: number,
  svgHeight: number
): string {
  const sx = (p: MapPoint) => (p.x * svgWidth).toFixed(2);
  const sy = (p: MapPoint) => (p.y * svgHeight).toFixed(2);

  if (curvePoints.length === 0) {
    return `M ${sx(from)} ${sy(from)} L ${sx(to)} ${sy(to)}`;
  }

  const anchors: MapPoint[] = [from, ...curvePoints, to];
  const cmds: string[] = [`M ${sx(anchors[0])} ${sy(anchors[0])}`];
  for (let i = 0; i < anchors.length - 1; i++) {
    const { c1, c2, p3 } = getCatmullRomBezierControlPoints(anchors, i);
    cmds.push(
      `C ${sx(c1)} ${sy(c1)}, ${sx(c2)} ${sy(c2)}, ${sx(p3)} ${sy(p3)}`
    );
  }
  return cmds.join(' ');
}

/**
 * Inserts a new curve control point cleanly along a segment without abrupt jumps:
 * places it halfway between the last curve point (or start) and the destination,
 * with a slight perpendicular offset on the first point so the user immediately sees the bend.
 */
export function createNextCurvePointForSegment(
  from: MapPoint,
  to: MapPoint,
  existingCurvePoints: readonly MapPoint[]
): MapPoint {
  const anchorA =
    existingCurvePoints.length > 0
      ? existingCurvePoints[existingCurvePoints.length - 1]
      : from;
  const midX = (anchorA.x + to.x) / 2;
  const midY = (anchorA.y + to.y) / 2;

  if (existingCurvePoints.length === 0) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const offset = Math.min(0.05, len * 0.22);
    // Perpendicular nudge so the curve is visibly distinct and easy to grab
    const nx = -dy / len;
    const ny = dx / len;
    return {
      x: Math.max(0.02, Math.min(0.98, midX + nx * offset)),
      y: Math.max(0.02, Math.min(0.98, midY + ny * offset)),
    };
  }

  return {
    x: Math.max(0.02, Math.min(0.98, midX)),
    y: Math.max(0.02, Math.min(0.98, midY)),
  };
}

/**
 * Filters a modifier list so only modifiers matching the section's transport category
 * ('land' vs 'sea') are applied. Prevents land penalties/bonuses on sea legs and vice-versa.
 */
export function filterCompatibleModifiers(
  modifierIds: readonly TravelModifierId[],
  category: TravelModifierCategory
): TravelModifierId[] {
  return modifierIds.filter((id) => {
    const mod = getTravelModifierById(id);
    return mod?.category === category;
  });
}

/**
 * Multiplies active modifier factors cleanly (`product of (1 + value)`), clamped at >= 10% speed.
 */
export function computeModifiersMultiplier(
  modifierIds: readonly TravelModifierId[]
): number {
  let factor = 1;
  for (const id of modifierIds) {
    const mod = getTravelModifierById(id);
    if (mod) {
      factor *= 1 + mod.value;
    }
  }
  return Math.max(0.1, factor);
}

/**
 * Clamps a user-configured route line thickness into safe rendering bounds (px).
 */
export function clampRouteStrokeWidth(width: number): number {
  if (!Number.isFinite(width)) return DEFAULT_ROUTE_STROKE_WIDTH;
  return Math.max(
    MIN_ROUTE_STROKE_WIDTH,
    Math.min(MAX_ROUTE_STROKE_WIDTH, Math.round(width * 10) / 10)
  );
}

/**
 * Derives a `ScaleCalibration` from two user-picked points and a known real distance in km.
 */
export function buildCustomCalibration(
  p1: MapPoint,
  p2: MapPoint,
  knownKm: number,
  aspectRatio: number
): ScaleCalibration | null {
  const normDist = computeNormalizedWidthDistance(p1, p2, aspectRatio);
  if (normDist <= 0.0001 || !Number.isFinite(knownKm) || knownKm <= 0) {
    return null;
  }
  return {
    p1,
    p2,
    knownKm,
    kmPerWidth: knownKm / normDist,
    isCustom: true,
  };
}

/**
 * Calculates full route distances, curved lengths, per-section durations,
 * and party/mount rations & water supplies.
 */
export function calculateRouteSummary(
  waypoints: readonly TravelWaypoint[],
  settings: TravelSettings,
  aspectRatio: number,
  kmPerWidth: number,
  segmentsByKey: Record<string, SegmentOverrideConfig> = {}
): RouteTotalSummary {
  const hoursPerDay = Math.max(1, Math.min(24, settings.hoursPerDay));
  const segments: RouteSegmentSummary[] = [];

  let totalDistanceKm = 0;
  let activeTravelHours = 0;
  let usesAnyMounts = false;
  let hasHarshConditions = false;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const from = waypoints[i];
    const to = waypoints[i + 1];
    const key = buildSegmentKey(from.id, to.id);
    const override = segmentsByKey[key];

    const transportId = override?.transport ?? settings.transport;
    const paceId = override?.pace ?? settings.pace;
    const curvePoints = override?.curvePoints ?? [];

    const transportPreset = getTransportModePreset(transportId);
    const pacePreset = getTravelPacePreset(paceId);
    const modifiers = filterCompatibleModifiers(
      override?.modifiers ?? [],
      transportPreset.category
    );

    if (transportPreset.usesMounts) usesAnyMounts = true;
    if (modifiers.some((m) => HARSH_WATER_MODIFIERS.has(m))) {
      hasHarshConditions = true;
    }

    const modMultiplier = computeModifiersMultiplier(modifiers);
    const speedMultiplier = pacePreset.multiplier * modMultiplier;
    const effectiveSpeedKmPerHour = Math.max(
      0.25,
      transportPreset.baseKmPerHour * speedMultiplier
    );

    const { sampledPath, normalizedWidthLength, midpoint } =
      sampleSegmentSpline(from, to, curvePoints, aspectRatio);

    const distanceKm = normalizedWidthLength * kmPerWidth;
    const distanceMiles = kmToMiles(distanceKm);
    const travelHours = distanceKm / effectiveSpeedKmPerHour;
    const travelDays = travelHours / hoursPerDay;

    const hasCustomOverride = Boolean(
      override &&
        (override.transport !== undefined ||
          override.pace !== undefined ||
          modifiers.length > 0 ||
          override.color !== undefined ||
          override.strokeWidth !== undefined ||
          curvePoints.length > 0)
    );

    const defaultSegmentColor =
      transportPreset.category === 'sea'
        ? settings.seaRouteColor
        : settings.landRouteColor;
    const strokeColor = override?.color || defaultSegmentColor;
    const strokeWidth = clampRouteStrokeWidth(
      override?.strokeWidth ?? settings.routeStrokeWidth
    );

    totalDistanceKm += distanceKm;
    activeTravelHours += travelHours;

    segments.push({
      key,
      index: i + 1,
      from,
      to,
      transport: transportId,
      pace: paceId,
      modifiers,
      curvePoints,
      strokeColor,
      strokeWidth,
      sampledPath,
      midpoint,
      hasCustomOverride,
      speedMultiplier,
      effectiveSpeedKmPerHour,
      distanceKm,
      distanceMiles,
      travelHours,
      travelDays,
    });
  }

  const totalDistanceMiles = kmToMiles(totalDistanceKm);
  const activeTravelDays = activeTravelHours / hoursPerDay;

  const stopoverDays = waypoints.reduce(
    (acc, wp) => acc + Math.max(0, wp.stopDays || 0),
    0
  );
  const totalJourneyDays = activeTravelDays + stopoverDays;

  const averageSpeedKmPerHour =
    activeTravelHours > 0
      ? totalDistanceKm / activeTravelHours
      : getTransportModePreset(settings.transport).baseKmPerHour *
        getTravelPacePreset(settings.pace).multiplier;
  const averageKmPerDay = averageSpeedKmPerHour * hoursPerDay;

  const supplyDays =
    totalJourneyDays > 0 ? Math.max(1, Math.ceil(totalJourneyDays)) : 0;
  const partySize = Math.max(1, Math.round(settings.partySize || 1));
  const mountCount = Math.max(0, Math.round(settings.mountCount || 0));
  const rationsPerDay = Math.max(0.5, settings.rationsPerDay || 1);

  const totalRations = Math.ceil(supplyDays * partySize * rationsPerDay);
  const waterLitersPerPersonDay = hasHarshConditions ? 3 : 2;
  const totalWaterLiters = Math.ceil(
    supplyDays * partySize * waterLitersPerPersonDay
  );
  const totalFodder = usesAnyMounts ? Math.ceil(supplyDays * mountCount) : 0;

  return {
    totalDistanceKm,
    totalDistanceMiles,
    activeTravelHours,
    activeTravelDays,
    stopoverDays,
    totalJourneyDays,
    averageSpeedKmPerHour,
    averageKmPerDay,
    totalRations,
    totalWaterLiters,
    totalFodder,
    usesAnyMounts,
    segments,
  };
}

/**
 * Formats travel duration cleanly into Days + Remaining Travel Hours.
 */
export function formatJourneyDuration(
  totalDays: number,
  hoursPerDay: number,
  lang: ModuleLanguage
): string {
  if (totalDays <= 0) return lang === 'fr' ? '0 j' : '0 d';
  const wholeDays = Math.floor(totalDays);
  const remainingHours = Math.round((totalDays - wholeDays) * hoursPerDay);
  if (wholeDays === 0) {
    return `${Math.max(1, remainingHours)} h`;
  }
  if (remainingHours === 0) {
    return lang === 'fr' ? `${wholeDays} j` : `${wholeDays} d`;
  }
  return lang === 'fr'
    ? `${wholeDays} j ${remainingHours} h`
    : `${wholeDays} d ${remainingHours} h`;
}

/**
 * Picks a clean round scale-bar distance in km for the current zoom & calibration.
 */
export function computeNiceScaleBar(
  kmPerScreenPx: number,
  targetWidthPx = 120
): { km: number; widthPx: number } {
  const rawKm = kmPerScreenPx * targetWidthPx;
  const candidates = [
    5, 10, 20, 25, 50, 100, 150, 200, 250, 500, 1000, 1500, 2000,
  ];
  let best = candidates[0];
  for (const c of candidates) {
    if (c <= rawKm * 1.35) {
      best = c;
    }
  }
  const widthPx = Math.max(
    44,
    Math.min(180, Math.round(best / Math.max(0.0001, kmPerScreenPx)))
  );
  return { km: best, widthPx };
}

export function loadMapWorkspaceState(
  mapId: TravelMapId
): PersistedMapWorkspaceState {
  const fallback: PersistedMapWorkspaceState = {
    waypoints: [],
    calibration: null,
    settings: { ...DEFAULT_TRAVEL_SETTINGS },
    segmentsByKey: {},
  };
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${mapId}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedMapWorkspaceState>;
    const rawSettings = parsed.settings as
      | (Partial<TravelSettings> & { defaultModifiers?: unknown })
      | undefined;

    return {
      waypoints: Array.isArray(parsed.waypoints) ? parsed.waypoints : [],
      calibration: parsed.calibration ?? null,
      settings: {
        ...DEFAULT_TRAVEL_SETTINGS,
        transport: rawSettings?.transport ?? DEFAULT_TRAVEL_SETTINGS.transport,
        pace: rawSettings?.pace ?? DEFAULT_TRAVEL_SETTINGS.pace,
        hoursPerDay:
          typeof rawSettings?.hoursPerDay === 'number'
            ? rawSettings.hoursPerDay
            : DEFAULT_TRAVEL_SETTINGS.hoursPerDay,
        partySize:
          typeof rawSettings?.partySize === 'number'
            ? rawSettings.partySize
            : DEFAULT_TRAVEL_SETTINGS.partySize,
        mountCount:
          typeof rawSettings?.mountCount === 'number'
            ? rawSettings.mountCount
            : DEFAULT_TRAVEL_SETTINGS.mountCount,
        rationsPerDay:
          typeof rawSettings?.rationsPerDay === 'number'
            ? rawSettings.rationsPerDay
            : DEFAULT_TRAVEL_SETTINGS.rationsPerDay,
        routeStrokeWidth:
          typeof rawSettings?.routeStrokeWidth === 'number'
            ? clampRouteStrokeWidth(rawSettings.routeStrokeWidth)
            : DEFAULT_ROUTE_STROKE_WIDTH,
        landRouteColor:
          typeof rawSettings?.landRouteColor === 'string' &&
          rawSettings.landRouteColor.length > 0
            ? rawSettings.landRouteColor
            : DEFAULT_LAND_ROUTE_COLOR,
        seaRouteColor:
          typeof rawSettings?.seaRouteColor === 'string' &&
          rawSettings.seaRouteColor.length > 0
            ? rawSettings.seaRouteColor
            : DEFAULT_SEA_ROUTE_COLOR,
      },
      segmentsByKey:
        parsed.segmentsByKey && typeof parsed.segmentsByKey === 'object'
          ? parsed.segmentsByKey
          : {},
    };
  } catch {
    return fallback;
  }
}

export function saveMapWorkspaceState(
  mapId: TravelMapId,
  state: PersistedMapWorkspaceState
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      `${STORAGE_PREFIX}${mapId}`,
      JSON.stringify(state)
    );
  } catch {
    // Ignore storage quota / private browsing errors gracefully.
  }
}
