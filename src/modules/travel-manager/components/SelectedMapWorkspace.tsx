import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Compass,
  Dices,
  ExternalLink,
  ImageOff,
  Skull,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ModuleId, ModuleLaunchIntent } from '@/src/types/navigation';
import {
  getTransportModePreset,
  getTravelModifierById,
  getWaypointTypeMeta,
} from '../data/travelPresets';
import { getTravelManagerCopy } from '../i18n';
import type {
  MapPoint,
  ModuleLanguage,
  PersistedMapWorkspaceState,
  RouteSegmentSummary,
  SegmentOverrideConfig,
  TravelMapDefinition,
  TravelModifierId,
  TravelSettings,
  TravelWaypoint,
  WaypointType,
} from '../types';
import {
  buildCustomCalibration,
  buildSegmentKey,
  calculateRouteSummary,
  createNextCurvePointForSegment,
  loadMapWorkspaceState,
  saveMapWorkspaceState,
} from '../utils/travelCalculations';
import { InteractiveMapCanvas } from './InteractiveMapCanvas';
import { SectionEditorDialog } from './SectionEditorDialog';
import { TravelCalculatorCard } from './TravelCalculatorCard';
import { WaypointsPanel } from './WaypointsPanel';
import {
  CALENDAR_UPDATED_EVENT,
  WEATHER_DEFINITIONS,
  advanceCalendarDays,
  formatContinentDate,
  getMonthDef,
  getMoonPhaseForEpoch,
  loadCalendarState,
  saveCalendarState,
} from '@/src/utils/continentCalendar';

interface SelectedMapWorkspaceProps {
  map: TravelMapDefinition;
  lang: ModuleLanguage;
  onBackToHub: () => void;
  onNavigateModule?: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
}

/**
 * Complete interactive cartography & travel simulation workspace for a chosen map.
 * Persists waypoints, per-section modifiers/curves, calibration, and settings per map.
 */
export function SelectedMapWorkspace({
  map,
  lang,
  onBackToHub,
  onNavigateModule,
}: SelectedMapWorkspaceProps) {
  const copy = getTravelManagerCopy(lang);

  const [workspaceState, setWorkspaceState] =
    useState<PersistedMapWorkspaceState>(() => loadMapWorkspaceState(map.id));
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(
    null
  );
  const [editingWaypointId, setEditingWaypointId] = useState<string | null>(
    null
  );
  const [selectedSegmentKey, setSelectedSegmentKey] = useState<string | null>(
    null
  );
  const [editingSegmentKey, setEditingSegmentKey] = useState<string | null>(
    null
  );

  // Reload state when switching between maps
  useEffect(() => {
    setWorkspaceState(loadMapWorkspaceState(map.id));
    setSelectedWaypointId(null);
    setEditingWaypointId(null);
    setSelectedSegmentKey(null);
    setEditingSegmentKey(null);
  }, [map.id]);

  // Persist changes to localStorage
  useEffect(() => {
    saveMapWorkspaceState(map.id, workspaceState);
  }, [map.id, workspaceState]);

  const [calendarState, setCalendarState] = useState(() => loadCalendarState());

  useEffect(() => {
    const syncCal = () => setCalendarState(loadCalendarState());
    window.addEventListener(CALENDAR_UPDATED_EVENT, syncCal);
    return () => window.removeEventListener(CALENDAR_UPDATED_EVENT, syncCal);
  }, []);

  const aspectRatio = map.naturalDimensions
    ? map.naturalDimensions.height / map.naturalDimensions.width
    : 1;
  const activeKmPerWidth =
    workspaceState.calibration?.kmPerWidth ?? map.defaultScaleKmPerWidth ?? 2000;

  const routeSummary = useMemo(
    () =>
      calculateRouteSummary(
        workspaceState.waypoints,
        workspaceState.settings,
        aspectRatio,
        activeKmPerWidth,
        workspaceState.segmentsByKey
      ),
    [
      workspaceState.waypoints,
      workspaceState.settings,
      aspectRatio,
      activeKmPerWidth,
      workspaceState.segmentsByKey,
    ]
  );

  const editingSegment = useMemo(
    () =>
      editingSegmentKey
        ? (routeSummary.segments.find((s) => s.key === editingSegmentKey) ??
          null)
        : null,
    [editingSegmentKey, routeSummary.segments]
  );

  const pruneOrphanSegments = (
    waypoints: readonly TravelWaypoint[],
    segmentsByKey: Record<string, SegmentOverrideConfig>
  ): Record<string, SegmentOverrideConfig> => {
    const validKeys = new Set<string>();
    for (let i = 0; i < waypoints.length - 1; i++) {
      validKeys.add(buildSegmentKey(waypoints[i].id, waypoints[i + 1].id));
    }
    const next: Record<string, SegmentOverrideConfig> = {};
    for (const [k, v] of Object.entries(segmentsByKey)) {
      if (validKeys.has(k)) next[k] = v;
    }
    return next;
  };

  const handleAddWaypoint = (point: MapPoint, type: WaypointType) => {
    const typeMeta = getWaypointTypeMeta(type);
    setWorkspaceState((prev) => {
      const nextIndex = prev.waypoints.length + 1;
      const newWp: TravelWaypoint = {
        id: `wp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: `${typeMeta.defaultPrefix[lang]} #${nextIndex}`,
        type,
        x: point.x,
        y: point.y,
        stopDays: 0,
        notes: '',
      };
      setSelectedWaypointId(newWp.id);
      return {
        ...prev,
        waypoints: [...prev.waypoints, newWp],
      };
    });
  };

  const handleMoveWaypoint = (id: string, point: MapPoint) => {
    setWorkspaceState((prev) => ({
      ...prev,
      waypoints: prev.waypoints.map((wp) =>
        wp.id === id ? { ...wp, x: point.x, y: point.y } : wp
      ),
    }));
  };

  const handleUpdateWaypoint = (
    id: string,
    patch: Partial<TravelWaypoint>
  ) => {
    setWorkspaceState((prev) => ({
      ...prev,
      waypoints: prev.waypoints.map((wp) =>
        wp.id === id ? { ...wp, ...patch } : wp
      ),
    }));
  };

  const handleMoveOrder = (index: number, direction: -1 | 1) => {
    setWorkspaceState((prev) => {
      const targetIdx = index + direction;
      if (targetIdx < 0 || targetIdx >= prev.waypoints.length) return prev;
      const nextWaypoints = [...prev.waypoints];
      const [moved] = nextWaypoints.splice(index, 1);
      nextWaypoints.splice(targetIdx, 0, moved);
      return {
        ...prev,
        waypoints: nextWaypoints,
        segmentsByKey: pruneOrphanSegments(nextWaypoints, prev.segmentsByKey),
      };
    });
  };

  const handleDeleteWaypoint = (id: string) => {
    setWorkspaceState((prev) => {
      const nextWaypoints = prev.waypoints.filter((wp) => wp.id !== id);
      return {
        ...prev,
        waypoints: nextWaypoints,
        segmentsByKey: pruneOrphanSegments(nextWaypoints, prev.segmentsByKey),
      };
    });
    if (selectedWaypointId === id) setSelectedWaypointId(null);
    if (editingWaypointId === id) setEditingWaypointId(null);
  };

  const handleClearAll = () => {
    setWorkspaceState((prev) => ({
      ...prev,
      waypoints: [],
      segmentsByKey: {},
    }));
    setSelectedWaypointId(null);
    setEditingWaypointId(null);
    setSelectedSegmentKey(null);
    setEditingSegmentKey(null);
  };

  const handleUpdateSection = (
    segKey: string,
    updater: (prev: SegmentOverrideConfig) => SegmentOverrideConfig
  ) => {
    setWorkspaceState((prev) => {
      const cur = prev.segmentsByKey[segKey] ?? {};
      const nextConfig = updater(cur);
      return {
        ...prev,
        segmentsByKey: {
          ...prev.segmentsByKey,
          [segKey]: nextConfig,
        },
      };
    });
  };

  const handleAddCurvePoint = (segment: RouteSegmentSummary) => {
    handleUpdateSection(segment.key, (prev) => {
      const existing = prev.curvePoints ?? [];
      const nextPoint = createNextCurvePointForSegment(
        segment.from,
        segment.to,
        existing
      );
      return {
        ...prev,
        curvePoints: [...existing, nextPoint],
      };
    });
  };

  const handleMoveCurvePoint = (
    segKey: string,
    curveIndex: number,
    point: MapPoint
  ) => {
    handleUpdateSection(segKey, (prev) => {
      const existing = [...(prev.curvePoints ?? [])];
      if (!existing[curveIndex]) return prev;
      existing[curveIndex] = point;
      return {
        ...prev,
        curvePoints: existing,
      };
    });
  };

  const handleRemoveCurvePoint = (segKey: string, curveIndex: number) => {
    handleUpdateSection(segKey, (prev) => {
      const existing = prev.curvePoints ?? [];
      return {
        ...prev,
        curvePoints: existing.filter((_, idx) => idx !== curveIndex),
      };
    });
  };

  const handleRemoveLastCurvePoint = (segKey: string) => {
    handleUpdateSection(segKey, (prev) => {
      const existing = prev.curvePoints ?? [];
      return {
        ...prev,
        curvePoints: existing.slice(0, -1),
      };
    });
  };

  const handleClearCurvePoints = (segKey: string) => {
    handleUpdateSection(segKey, (prev) => ({
      ...prev,
      curvePoints: [],
    }));
  };

  const handleResetSection = (segKey: string) => {
    setWorkspaceState((prev) => {
      const nextMap = { ...prev.segmentsByKey };
      delete nextMap[segKey];
      return {
        ...prev,
        segmentsByKey: nextMap,
      };
    });
  };

  const handleToggleSectionModifier = (
    segKey: string,
    modifierId: TravelModifierId,
    checked: boolean
  ) => {
    setWorkspaceState((prev) => {
      const cur = prev.segmentsByKey[segKey] ?? {};
      const resolvedTransport = cur.transport ?? prev.settings.transport;
      const sectionCategory = getTransportModePreset(resolvedTransport).category;
      const mod = getTravelModifierById(modifierId);

      // Guard: prevent adding a land modifier to a sea leg and vice-versa.
      if (checked && mod && mod.category !== sectionCategory) {
        return prev;
      }

      const compatibleExisting = (cur.modifiers ?? []).filter(
        (id) => getTravelModifierById(id)?.category === sectionCategory
      );
      const next = checked
        ? Array.from(new Set([...compatibleExisting, modifierId]))
        : compatibleExisting.filter((id) => id !== modifierId);

      return {
        ...prev,
        segmentsByKey: {
          ...prev.segmentsByKey,
          [segKey]: {
            ...cur,
            modifiers: next,
          },
        },
      };
    });
  };

  const handleClearSectionModifiers = (segKey: string) => {
    handleUpdateSection(segKey, (prev) => ({
      ...prev,
      modifiers: [],
    }));
  };

  const handleApplyCalibration = (
    p1: MapPoint,
    p2: MapPoint,
    knownKm: number
  ) => {
    const nextCal = buildCustomCalibration(p1, p2, knownKm, aspectRatio);
    if (!nextCal) return;

    const roundedKmPerWidth = Math.round(nextCal.kmPerWidth);
    const naturalWidth = map.naturalDimensions?.width ?? null;
    const naturalHeight = map.naturalDimensions?.height ?? null;
    const pixelDistance =
      naturalWidth && naturalHeight
        ? Math.hypot(
            (p2.x - p1.x) * naturalWidth,
            (p2.y - p1.y) * naturalHeight
          )
        : null;

    console.info(
      `[TravelManager Calibration] "${map.id}" (${map.name.fr}) -> defaultScaleKmPerWidth: ${roundedKmPerWidth} (exact: ${nextCal.kmPerWidth.toFixed(2)} km)`,
      {
        mapId: map.id,
        defaultScaleKmPerWidth: roundedKmPerWidth,
        exactKmPerWidth: Number(nextCal.kmPerWidth.toFixed(2)),
        previousDefaultScaleKmPerWidth: map.defaultScaleKmPerWidth ?? null,
        knownKm,
        naturalDimensions: map.naturalDimensions ?? null,
        pixelDistance: pixelDistance ? Number(pixelDistance.toFixed(2)) : null,
        p1,
        p2,
      }
    );

    setWorkspaceState((prev) => ({
      ...prev,
      calibration: nextCal,
    }));
  };

  const handleResetCalibration = () => {
    setWorkspaceState((prev) => ({
      ...prev,
      calibration: null,
    }));
  };

  const handleUpdateSettings = (patch: Partial<TravelSettings>) => {
    setWorkspaceState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...patch,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Top Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToHub}
          >
            <ArrowLeft data-icon="inline-start" />
            <span>{copy.workspace.backToHubBtn}</span>
          </Button>

          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-2.5 rounded-full ${map.accent.topBar}`}
            />
            <h2 className="text-lg font-semibold text-foreground sm:text-xl">
              {map.name[lang]}
            </h2>
            <span
              className={`hidden rounded border px-2 py-0.5 text-[11px] font-medium sm:inline-flex ${map.accent.badge}`}
            >
              {map.regionTag[lang]}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {copy.workspace.creatorLabel}:{' '}
            <strong className="text-foreground">{map.creatorName}</strong>
          </span>
          {map.creatorSourceUrl && (
            <a
              href={map.creatorSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:border-primary/50 hover:bg-muted/30"
            >
              <span>{copy.workspace.openSourceBtn}</span>
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {map.imageSrc ? (
        <>
          {/* Interactive Map Canvas + Ordered Waypoints Panel */}
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <InteractiveMapCanvas
                imageSrc={map.imageSrc}
                mapName={map.name[lang]}
                aspectRatio={aspectRatio}
                kmPerWidth={activeKmPerWidth}
                calibration={workspaceState.calibration}
                waypoints={workspaceState.waypoints}
                segments={routeSummary.segments}
                selectedWaypointId={selectedWaypointId}
                selectedSegmentKey={selectedSegmentKey}
                routeStrokeWidth={workspaceState.settings.routeStrokeWidth}
                landRouteColor={workspaceState.settings.landRouteColor}
                seaRouteColor={workspaceState.settings.seaRouteColor}
                lang={lang}
                onAddWaypoint={handleAddWaypoint}
                onMoveWaypoint={handleMoveWaypoint}
                onSelectWaypoint={setSelectedWaypointId}
                onEditWaypoint={(id) => setEditingWaypointId(id)}
                onSelectSegment={setSelectedSegmentKey}
                onEditSegment={(key) => setEditingSegmentKey(key)}
                onAddCurvePoint={handleAddCurvePoint}
                onMoveCurvePoint={handleMoveCurvePoint}
                onRemoveCurvePoint={handleRemoveCurvePoint}
                onUpdateRouteStyle={handleUpdateSettings}
                onApplyCalibration={handleApplyCalibration}
                onResetCalibration={handleResetCalibration}
              />
            </div>

            <div className="lg:col-span-4">
              <WaypointsPanel
                waypoints={workspaceState.waypoints}
                segments={routeSummary.segments}
                selectedWaypointId={selectedWaypointId}
                editingWaypointId={editingWaypointId}
                lang={lang}
                onSelectWaypoint={setSelectedWaypointId}
                onRequestEdit={setEditingWaypointId}
                onUpdateWaypoint={handleUpdateWaypoint}
                onMoveOrder={handleMoveOrder}
                onDeleteWaypoint={handleDeleteWaypoint}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Journey Distance, Per-Section Modifiers & Rations Calculator */}
          <TravelCalculatorCard
            settings={workspaceState.settings}
            summary={routeSummary}
            selectedSegmentKey={selectedSegmentKey}
            lang={lang}
            onUpdateSettings={handleUpdateSettings}
            onSelectSegment={setSelectedSegmentKey}
            onEditSegment={(key) => setEditingSegmentKey(key)}
            onAddCurvePoint={handleAddCurvePoint}
            onToggleSectionModifier={handleToggleSectionModifier}
            onClearSectionModifiers={handleClearSectionModifiers}
          />

          {/* Continent Calendar & Journey Weather Bridge */}
          {(() => {
            const journeyDays =
              routeSummary.segments.length > 0
                ? Math.max(1, Math.ceil(routeSummary.totalJourneyDays))
                : 0;
            const monthDef = getMonthDef(calendarState.monthIndex);
            const moon = getMoonPhaseForEpoch(calendarState.totalDaysElapsed);
            const weatherDef = WEATHER_DEFINITIONS[calendarState.weatherId];
            const firstWp = workspaceState.waypoints[0];
            const lastWp =
              workspaceState.waypoints[workspaceState.waypoints.length - 1];

            const handleAdvanceJourney = () => {
              if (journeyDays <= 0) return;
              const routeLabel =
                firstWp && lastWp
                  ? `${firstWp.name} → ${lastWp.name}`
                  : map.name[lang];

              const res = advanceCalendarDays(calendarState, {
                days: journeyDays,
                source: 'travel',
                careModeOverride: 'travel',
                travelSummaryLabel: {
                  fr: `${routeLabel} (${Math.round(routeSummary.totalDistanceKm)} km)`,
                  en: `${routeLabel} (${Math.round(routeSummary.totalDistanceKm)} km)`,
                },
                rollWeatherEachDay: true,
              });
              saveCalendarState(res.nextState);
              setCalendarState(res.nextState);

              const newDateStr = formatContinentDate(res.nextState)[lang];
              const arrivalWeatherStr =
                WEATHER_DEFINITIONS[res.nextState.weatherId].name[lang];

              toast.success(
                copy.workspace.calendarAdvancedToast(
                  journeyDays,
                  newDateStr,
                  arrivalWeatherStr
                )
              );
              if (res.healedSummary.length > 0) {
                toast.info(
                  copy.workspace.calendarHealedToast(res.healedSummary.length)
                );
              }
              if (res.completedProjects.length > 0) {
                toast.success(
                  copy.workspace.calendarCraftedToast(
                    res.completedProjects.join(', ')
                  )
                );
              }
            };

            return (
              <Card className="border-border/80 bg-muted/20">
                <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CalendarDays
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{copy.workspace.calendarBridgeTitle}</span>
                    </p>
                    <p className="font-mono text-xs text-foreground">
                      {calendarState.dayOfMonth} {monthDef.name[lang]}{' '}
                      {calendarState.year} · {moon.phase.name[lang]} ·{' '}
                      <span className="text-primary">
                        {weatherDef.name[lang]}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {journeyDays > 0
                        ? `${weatherDef.modifiers.travelAndSurvival[lang]} · ${weatherDef.modifiers.perception[lang]}`
                        : copy.workspace.calendarBridgeNoRouteDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={journeyDays <= 0}
                      onClick={handleAdvanceJourney}
                    >
                      <CalendarDays
                        data-icon="inline-start"
                        className="size-3.5"
                      />
                      <span>
                        {copy.workspace.advanceCalendarBtn(
                          journeyDays > 0 ? journeyDays : 1
                        )}
                      </span>
                    </Button>
                    {onNavigateModule && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigateModule('campaign-calendar')}
                      >
                        <span>{copy.workspace.openCalendarBtn}</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Quick Bridge to Road Encounters & Modular Events */}
          {onNavigateModule && (
            <Card className="border-border/80 bg-muted/20">
              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-foreground">
                    {copy.workspace.encountersBridgeTitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {copy.workspace.encountersBridgeDesc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('encounter-manager', { tab: 'monster' })
                    }
                  >
                    <Skull className="size-3.5" aria-hidden="true" />
                    <span>{copy.workspace.rollMonsterBtn}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('encounter-manager', { tab: 'humanoid' })
                    }
                  >
                    <Users className="size-3.5" aria-hidden="true" />
                    <span>{copy.workspace.rollHumanoidBtn}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('random-tables', { tab: 'encounter' })
                    }
                  >
                    <Dices className="size-3.5" aria-hidden="true" />
                    <span>{copy.workspace.rollModularBtn}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Per-Section Editor Dialog */}
          <SectionEditorDialog
            open={Boolean(editingSegment)}
            segment={editingSegment}
            overrideConfig={
              editingSegment
                ? workspaceState.segmentsByKey[editingSegment.key]
                : undefined
            }
            globalSettings={workspaceState.settings}
            lang={lang}
            onClose={() => setEditingSegmentKey(null)}
            onUpdateSection={handleUpdateSection}
            onAddCurvePoint={handleAddCurvePoint}
            onRemoveLastCurvePoint={handleRemoveLastCurvePoint}
            onClearCurvePoints={handleClearCurvePoints}
            onResetSection={handleResetSection}
          />
        </>
      ) : (
        <Card className="border-dashed border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ImageOff className="size-5 text-muted-foreground" />
              <span>{copy.workspace.missingImageTitle}</span>
            </CardTitle>
            <CardDescription>{copy.workspace.missingImageDescription}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-foreground">
              <Compass className="size-4 text-primary" />
              <span>
                {copy.workspace.missingImagePathHint}{' '}
                src/modules/travel-manager/maps/{map.id}.webp
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
