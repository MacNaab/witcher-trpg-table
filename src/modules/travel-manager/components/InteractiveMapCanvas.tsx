import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Building2,
  Compass,
  Flag,
  LocateFixed,
  Maximize2,
  Minimize2,
  MousePointer2,
  Palette,
  Plus,
  RotateCcw,
  Ruler,
  Spline,
  Tent,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DEFAULT_LAND_ROUTE_COLOR,
  DEFAULT_ROUTE_STROKE_WIDTH,
  DEFAULT_SEA_ROUTE_COLOR,
  MAX_ROUTE_STROKE_WIDTH,
  MIN_ROUTE_STROKE_WIDTH,
  WAYPOINT_TYPE_LIST,
  getWaypointTypeMeta,
} from '../data/travelPresets';
import { getTravelManagerCopy } from '../i18n';
import type {
  MapPoint,
  MapToolMode,
  ModuleLanguage,
  RouteSegmentSummary,
  ScaleCalibration,
  TravelSettings,
  TravelWaypoint,
  WaypointType,
} from '../types';
import {
  buildSvgSegmentPath,
  computeDistanceKm,
  computeNiceScaleBar,
} from '../utils/travelCalculations';
import { RouteColorPicker } from './RouteColorPicker';

interface InteractiveMapCanvasProps {
  imageSrc: string;
  mapName: string;
  aspectRatio: number;
  kmPerWidth: number;
  calibration: ScaleCalibration | null;
  waypoints: readonly TravelWaypoint[];
  segments: readonly RouteSegmentSummary[];
  selectedWaypointId: string | null;
  selectedSegmentKey: string | null;
  routeStrokeWidth: number;
  landRouteColor: string;
  seaRouteColor: string;
  lang: ModuleLanguage;
  onAddWaypoint: (point: MapPoint, type: WaypointType) => void;
  onMoveWaypoint: (id: string, point: MapPoint) => void;
  onSelectWaypoint: (id: string) => void;
  onEditWaypoint: (id: string) => void;
  onSelectSegment: (segmentKey: string) => void;
  onEditSegment: (segmentKey: string) => void;
  onAddCurvePoint: (segment: RouteSegmentSummary) => void;
  onMoveCurvePoint: (
    segmentKey: string,
    curveIndex: number,
    point: MapPoint
  ) => void;
  onRemoveCurvePoint: (segmentKey: string, curveIndex: number) => void;
  onUpdateRouteStyle: (
    patch: Partial<
      Pick<
        TravelSettings,
        'routeStrokeWidth' | 'landRouteColor' | 'seaRouteColor'
      >
    >
  ) => void;
  onApplyCalibration: (p1: MapPoint, p2: MapPoint, knownKm: number) => void;
  onResetCalibration: () => void;
}

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 16;

const WAYPOINT_ICONS: Record<WaypointType, typeof Building2> = {
  city: Building2,
  stage: Flag,
  bivouac: Tent,
};

/**
 * Interactive cartographic viewport supporting smooth pan, cursor-centered wheel zoom,
 * zoom slider, native + fallback fullscreen, draggable waypoints, curved per-section
 * SVG paths with draggable curve handles, and 2-point real-world scale calibration.
 */
export function InteractiveMapCanvas({
  imageSrc,
  mapName,
  aspectRatio,
  kmPerWidth,
  calibration,
  waypoints,
  segments,
  selectedWaypointId,
  selectedSegmentKey,
  routeStrokeWidth,
  landRouteColor,
  seaRouteColor,
  lang,
  onAddWaypoint,
  onMoveWaypoint,
  onSelectWaypoint,
  onEditWaypoint,
  onSelectSegment,
  onEditSegment,
  onAddCurvePoint,
  onMoveCurvePoint,
  onRemoveCurvePoint,
  onUpdateRouteStyle,
  onApplyCalibration,
  onResetCalibration,
}: InteractiveMapCanvasProps) {
  const copy = getTravelManagerCopy(lang);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [toolMode, setToolMode] = useState<MapToolMode>('add-waypoint');
  const [defaultWaypointType, setDefaultWaypointType] =
    useState<WaypointType>('city');
  const [showStyleBar, setShowStyleBar] = useState(false);

  const [viewportSize, setViewportSize] = useState({ width: 900, height: 580 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Pointer drag state for panning, dragging a waypoint pin, or dragging a curve handle
  const dragRef = useRef<{
    kind: 'pan' | 'pin' | 'curve';
    pinId?: string;
    segmentKey?: string;
    curveIndex?: number;
    startClientX: number;
    startClientY: number;
    startPanX: number;
    startPanY: number;
    movedPx: number;
  } | null>(null);

  const [calPoint1, setCalPoint1] = useState<MapPoint | null>(null);
  const [calPoint2, setCalPoint2] = useState<MapPoint | null>(null);
  const [calDialogOpen, setCalDialogOpen] = useState(false);
  const [calKmInput, setCalKmInput] = useState('250');

  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const panRef = useRef(pan);
  panRef.current = pan;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewportSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isFullscreen]);

  const wasNativeFullscreenRef = useRef(false);

  // Keep React fullscreen state synchronized with native browser fullscreen exit (e.g., Esc or browser UI)
  useEffect(() => {
    const syncNativeFullscreen = () => {
      const doc = document as Document & {
        webkitFullscreenElement?: Element | null;
      };
      const activeEl = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
      const isThisNativeFs = Boolean(activeEl && activeEl === outerRef.current);
      if (isThisNativeFs) {
        wasNativeFullscreenRef.current = true;
        setIsFullscreen(true);
      } else if (wasNativeFullscreenRef.current) {
        wasNativeFullscreenRef.current = false;
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', syncNativeFullscreen);
    document.addEventListener('webkitfullscreenchange', syncNativeFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', syncNativeFullscreen);
      document.removeEventListener(
        'webkitfullscreenchange',
        syncNativeFullscreen
      );
    };
  }, []);

  // CSS-fallback fullscreen Escape handling (do not exit fullscreen when dismissing an open modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !isFullscreen || e.defaultPrevented) return;
      if (document.querySelector('[data-slot="dialog-content"]')) return;

      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      wasNativeFullscreenRef.current = false;
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreen(true);
      if (outerRef.current?.requestFullscreen) {
        void outerRef.current.requestFullscreen().catch(() => {
          // Sandboxed iframe fallback: CSS fixed-inset fullscreen already active.
        });
      }
    }
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const vpRect = el.getBoundingClientRect();
      const curZoom = zoomRef.current;
      const curPan = panRef.current;
      const factor = e.deltaY < 0 ? 1.18 : 0.85;
      const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, curZoom * factor));
      if (Math.abs(nextZoom - curZoom) < 0.0001) return;

      const cx = e.clientX - (vpRect.left + vpRect.width / 2);
      const cy = e.clientY - (vpRect.top + vpRect.height / 2);
      const ratio = nextZoom / curZoom;

      setZoom(nextZoom);
      setPan({
        x: cx - (cx - curPan.x) * ratio,
        y: cy - (cy - curPan.y) * ratio,
      });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const adjustZoomCentered = (factor: number) => {
    setZoom((prev) => {
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev * factor));
      const ratio = next / prev;
      setPan((p) => ({ x: p.x * ratio, y: p.y * ratio }));
      return next;
    });
  };

  const pad = 24;
  const maxW = Math.max(200, viewportSize.width - pad);
  const maxH = Math.max(200, viewportSize.height - pad);
  const widthIfHeightBound = maxH / aspectRatio;
  const baseWidth = Math.min(maxW, widthIfHeightBound);
  const baseHeight = baseWidth * aspectRatio;

  const clientToNormalizedPoint = (
    clientX: number,
    clientY: number
  ): MapPoint | null => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return null;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    return { x, y };
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      kind: 'pan',
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
      movedPx: 0,
    };
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startClientX;
    const dy = e.clientY - drag.startClientY;
    drag.movedPx = Math.max(drag.movedPx, Math.hypot(dx, dy));

    if (drag.kind === 'pan') {
      setPan({ x: drag.startPanX + dx, y: drag.startPanY + dy });
    } else if (drag.kind === 'pin' && drag.pinId) {
      const pt = clientToNormalizedPoint(e.clientX, e.clientY);
      if (pt) {
        onMoveWaypoint(drag.pinId, pt);
      }
    } else if (
      drag.kind === 'curve' &&
      drag.segmentKey &&
      typeof drag.curveIndex === 'number'
    ) {
      const pt = clientToNormalizedPoint(e.clientX, e.clientY);
      if (pt) {
        onMoveCurvePoint(drag.segmentKey, drag.curveIndex, pt);
      }
    }
  };

  const handleStagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (drag.movedPx <= 5) {
      if (drag.kind === 'pin' && drag.pinId) {
        onSelectWaypoint(drag.pinId);
        onEditWaypoint(drag.pinId);
        return;
      }
      if (drag.kind === 'curve' && drag.segmentKey) {
        onSelectSegment(drag.segmentKey);
        return;
      }

      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const rawX = (e.clientX - rect.left) / rect.width;
      const rawY = (e.clientY - rect.top) / rect.height;
      if (rawX < 0 || rawX > 1 || rawY < 0 || rawY > 1) return;
      const pt = { x: rawX, y: rawY };

      if (toolMode === 'add-waypoint') {
        onAddWaypoint(pt, defaultWaypointType);
      } else if (toolMode === 'calibrate') {
        if (!calPoint1) {
          setCalPoint1(pt);
          setCalPoint2(null);
        } else {
          setCalPoint2(pt);
          const currentEstKm = Math.max(
            1,
            Math.round(computeDistanceKm(calPoint1, pt, aspectRatio, kmPerWidth))
          );
          setCalKmInput(String(currentEstKm));
          setCalDialogOpen(true);
        }
      }
    }
  };

  const handleConfirmCalibration = () => {
    if (!calPoint1 || !calPoint2) return;
    const parsedKm = Number.parseFloat(calKmInput.replace(',', '.'));
    if (!Number.isFinite(parsedKm) || parsedKm <= 0) {
      toast.error(copy.canvas.calibrationInvalidToast);
      return;
    }
    onApplyCalibration(calPoint1, calPoint2, parsedKm);
    setCalDialogOpen(false);
    setCalPoint1(null);
    setCalPoint2(null);
    setToolMode('pan');
    toast.success(copy.canvas.calibrationSuccessToast);
  };

  const handleCancelCalibration = () => {
    setCalDialogOpen(false);
    setCalPoint1(null);
    setCalPoint2(null);
    setToolMode('pan');
  };

  const renderedWidthPx = Math.max(1, baseWidth * zoom);
  const kmPerScreenPx = kmPerWidth / renderedWidthPx;
  const scaleBar = computeNiceScaleBar(kmPerScreenPx, 110);

  const svgW = 1000;
  const svgH = Math.round(1000 * aspectRatio);

  return (
    <div
      ref={outerRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-40 flex h-screen w-screen flex-col bg-background p-2 sm:p-4'
          : 'flex flex-col'
      }
    >
      <Card
        className={`flex flex-col overflow-hidden border-border py-0 ${
          isFullscreen ? 'h-full flex-1' : ''
        }`}
      >
        {/* Map Interactive Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              type="button"
              size="sm"
              variant={toolMode === 'pan' ? 'default' : 'outline'}
              onClick={() => {
                setToolMode('pan');
                setCalPoint1(null);
                setCalPoint2(null);
              }}
            >
              <MousePointer2 data-icon="inline-start" />
              <span>{copy.canvas.toolPan}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={toolMode === 'add-waypoint' ? 'default' : 'outline'}
              onClick={() => {
                setToolMode('add-waypoint');
                setCalPoint1(null);
                setCalPoint2(null);
              }}
            >
              <Plus data-icon="inline-start" />
              <span>{copy.canvas.toolAddWaypoint}</span>
            </Button>

            {toolMode === 'add-waypoint' && (
              <Select
                value={defaultWaypointType}
                onValueChange={(val) => {
                  if (val === 'city' || val === 'stage' || val === 'bivouac') {
                    setDefaultWaypointType(val);
                  }
                }}
              >
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue>
                    {getWaypointTypeMeta(defaultWaypointType).label[lang]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {WAYPOINT_TYPE_LIST.map((wt) => (
                    <SelectItem key={wt.id} value={wt.id}>
                      {wt.label[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              type="button"
              size="sm"
              variant={toolMode === 'calibrate' ? 'default' : 'outline'}
              onClick={() => {
                setToolMode('calibrate');
                setCalPoint1(null);
                setCalPoint2(null);
              }}
            >
              <Ruler data-icon="inline-start" />
              <span>{copy.canvas.toolCalibrate}</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    onClick={() => adjustZoomCentered(0.77)}
                    aria-label={copy.canvas.zoomOutTooltip}
                  />
                }
              >
                <ZoomOut className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {copy.canvas.zoomOutTooltip}
              </TooltipContent>
            </Tooltip>

            <span className="min-w-12 text-center font-mono text-xs font-semibold tabular-nums">
              {Math.round(zoom * 100)}%
            </span>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="outline"
                    onClick={() => adjustZoomCentered(1.3)}
                    aria-label={copy.canvas.zoomInTooltip}
                  />
                }
              >
                <ZoomIn className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {copy.canvas.zoomInTooltip}
              </TooltipContent>
            </Tooltip>

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={resetView}
            >
              <LocateFixed data-icon="inline-start" />
              <span>{copy.canvas.resetViewBtn}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={showStyleBar ? 'default' : 'outline'}
              onClick={() => setShowStyleBar((prev) => !prev)}
            >
              <Palette data-icon="inline-start" />
              <span>{copy.canvas.styleBtn}</span>
            </Button>

            <Button
              type="button"
              size="sm"
              variant={isFullscreen ? 'default' : 'secondary'}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 data-icon="inline-start" />
              ) : (
                <Maximize2 data-icon="inline-start" />
              )}
              <span>
                {isFullscreen
                  ? copy.canvas.fullscreenExit
                  : copy.canvas.fullscreenEnter}
              </span>
            </Button>
          </div>
        </div>

        {/* Collapsible Live Route Thickness & Colors Bar */}
        {showStyleBar && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/25 px-3 py-2.5 text-xs">
            <div className="flex min-w-52 flex-1 flex-col gap-1.5 sm:max-w-64">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">
                  {copy.canvas.strokeWidthLabel}
                </Label>
                <span className="font-mono text-xs font-bold text-primary tabular-nums">
                  {routeStrokeWidth.toFixed(1)} px
                </span>
              </div>
              <Slider
                value={[routeStrokeWidth]}
                min={MIN_ROUTE_STROKE_WIDTH}
                max={MAX_ROUTE_STROKE_WIDTH}
                step={0.1}
                onValueChange={(vals) => {
                  const val = Array.isArray(vals) ? vals[0] : vals;
                  if (typeof val === 'number') {
                    onUpdateRouteStyle({ routeStrokeWidth: val });
                  }
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-1">
                <Label className="text-[11px] text-muted-foreground">
                  {copy.canvas.landColorLabel}
                </Label>
                <RouteColorPicker
                  value={landRouteColor}
                  lang={lang}
                  customTooltip={copy.canvas.customColorTooltip}
                  onChange={(hex) =>
                    onUpdateRouteStyle({ landRouteColor: hex })
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-[11px] text-muted-foreground">
                  {copy.canvas.seaColorLabel}
                </Label>
                <RouteColorPicker
                  value={seaRouteColor}
                  lang={lang}
                  customTooltip={copy.canvas.customColorTooltip}
                  onChange={(hex) =>
                    onUpdateRouteStyle({ seaRouteColor: hex })
                  }
                />
              </div>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={() =>
                  onUpdateRouteStyle({
                    routeStrokeWidth: DEFAULT_ROUTE_STROKE_WIDTH,
                    landRouteColor: DEFAULT_LAND_ROUTE_COLOR,
                    seaRouteColor: DEFAULT_SEA_ROUTE_COLOR,
                  })
                }
              >
                <RotateCcw data-icon="inline-start" className="size-3" />
                <span>{copy.canvas.resetStyleBtn}</span>
              </Button>
            </div>
          </div>
        )}

        {/* Contextual Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 bg-muted/15 px-3 py-1.5 text-xs">
          {toolMode === 'calibrate' ? (
            <div className="flex w-full items-center justify-between gap-2 font-medium text-amber-600 dark:text-amber-400">
              <span>
                {!calPoint1
                  ? copy.canvas.calibrationStep1
                  : copy.canvas.calibrationStep2}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={handleCancelCalibration}
              >
                {copy.canvas.calibrationCancel}
              </Button>
            </div>
          ) : (
            <span className="text-muted-foreground">
              {toolMode === 'add-waypoint'
                ? copy.canvas.addHint
                : copy.canvas.panHint}
            </span>
          )}
        </div>

        {/* Interactive Viewport */}
        <CardContent className="relative flex-1 p-0">
          <div
            ref={viewportRef}
            onPointerDown={handleStagePointerDown}
            onPointerMove={handleStagePointerMove}
            onPointerUp={handleStagePointerUp}
            onPointerCancel={handleStagePointerUp}
            className={`relative w-full touch-none overflow-hidden bg-stone-950 select-none ${
              isFullscreen ? 'h-full min-h-[420px]' : 'h-[500px] sm:h-[620px]'
            } ${
              toolMode === 'add-waypoint' || toolMode === 'calibrate'
                ? 'cursor-crosshair'
                : 'cursor-grab active:cursor-grabbing'
            }`}
          >
            {/* Transformed Image + Vector Overlay */}
            <div
              ref={stageRef}
              style={{
                width: `${baseWidth}px`,
                height: `${baseHeight}px`,
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                transformOrigin: 'center center',
              }}
              className="absolute shadow-2xl"
            >
              <img
                src={imageSrc}
                alt={mapName}
                draggable={false}
                className="pointer-events-none h-full w-full rounded-sm object-fill select-none"
              />

              {/* Per-Section Curved SVG Paths */}
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {segments.map((seg) => {
                  const pathD = buildSvgSegmentPath(
                    seg.from,
                    seg.to,
                    seg.curvePoints,
                    svgW,
                    svgH
                  );
                  const isSea = seg.transport === 'ship';
                  const isSelectedSeg = seg.key === selectedSegmentKey;
                  const baseWidth = seg.strokeWidth;
                  const innerWidth = isSelectedSeg
                    ? baseWidth + (baseWidth <= 0.8 ? 0.35 : 0.6)
                    : baseWidth;
                  const casingWidth =
                    baseWidth <= 0.8
                      ? innerWidth + Math.max(0.45, baseWidth * 0.9)
                      : baseWidth <= 1.4
                        ? innerWidth + 1.0
                        : innerWidth +
                          Math.min(2.6, Math.max(1.2, baseWidth * 0.75));
                  const dashPattern = isSea
                    ? `${Math.max(1.8, baseWidth * 1.6).toFixed(1)} ${Math.max(2.2, baseWidth * 2.4).toFixed(1)}`
                    : `${Math.max(2.8, baseWidth * 3.5).toFixed(1)} ${Math.max(2.0, baseWidth * 2.2).toFixed(1)}`;

                  return (
                    <g key={seg.key}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={
                          baseWidth <= 0.6
                            ? 'rgba(12, 10, 9, 0.45)'
                            : baseWidth <= 1.0
                              ? 'rgba(12, 10, 9, 0.65)'
                              : 'rgba(12, 10, 9, 0.8)'
                        }
                        strokeWidth={casingWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        d={pathD}
                        fill="none"
                        stroke={seg.strokeColor}
                        strokeWidth={innerWidth}
                        strokeDasharray={dashPattern}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  );
                })}

                {calPoint1 && calPoint2 && (
                  <line
                    x1={calPoint1.x * svgW}
                    y1={calPoint1.y * svgH}
                    x2={calPoint2.x * svgW}
                    y2={calPoint2.y * svgH}
                    stroke="#38bdf8"
                    strokeWidth={3}
                    strokeDasharray="6 4"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>

              {/* Draggable Curve Control Handles */}
              {segments.map((seg) =>
                seg.curvePoints.map((cp, curveIdx) => (
                  <Tooltip key={`${seg.key}-cp-${curveIdx}`}>
                    <TooltipTrigger
                      render={
                        <div
                          style={{
                            left: `${cp.x * 100}%`,
                            top: `${cp.y * 100}%`,
                            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                            backgroundColor: seg.strokeColor,
                          }}
                          onPointerDown={(e) => {
                            if (e.button !== 0 || toolMode === 'calibrate') {
                              return;
                            }
                            e.stopPropagation();
                            viewportRef.current?.setPointerCapture(e.pointerId);
                            onSelectSegment(seg.key);
                            dragRef.current = {
                              kind: 'curve',
                              segmentKey: seg.key,
                              curveIndex: curveIdx,
                              startClientX: e.clientX,
                              startClientY: e.clientY,
                              startPanX: pan.x,
                              startPanY: pan.y,
                              movedPx: 0,
                            };
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            onRemoveCurvePoint(seg.key, curveIdx);
                          }}
                          className="absolute z-10 flex size-4 cursor-move items-center justify-center rounded-full border-2 border-white shadow-md transition-transform hover:scale-125"
                        />
                      }
                    />
                    <TooltipContent side="top" className="text-xs">
                      {copy.canvas.curveHandleTooltip}
                    </TooltipContent>
                  </Tooltip>
                ))
              )}

              {/* Clickable Segment Midpoint Distance Badges + Quick Add Curve */}
              {segments.map((seg) => {
                const isSelectedSeg = seg.key === selectedSegmentKey;
                return (
                  <div
                    key={`seg-badge-${seg.key}`}
                    style={{
                      left: `${seg.midpoint.x * 100}%`,
                      top: `${seg.midpoint.y * 100}%`,
                      transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute z-10 flex items-center gap-0.5"
                  >
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSegment(seg.key);
                              onEditSegment(seg.key);
                            }}
                            className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-semibold whitespace-nowrap shadow transition-colors ${
                              isSelectedSeg
                                ? 'border-amber-300 bg-amber-500 text-stone-950'
                                : 'border-stone-700 bg-stone-950/90 text-stone-100 hover:border-amber-400'
                            }`}
                          />
                        }
                      >
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: seg.strokeColor }}
                          className="size-2 shrink-0 rounded-full border border-white/40"
                        />
                        <span>
                          {Math.round(seg.distanceKm)} km
                          {seg.hasCustomOverride ? ' · ⚙' : ''}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {copy.canvas.segmentClickTooltip}
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSegment(seg.key);
                              onAddCurvePoint(seg);
                              toast.success(copy.canvas.curveAddedToast);
                            }}
                            aria-label={copy.calculator.addCurveBtn}
                            className="flex size-5 items-center justify-center rounded-md border border-stone-700 bg-stone-950/90 text-stone-200 shadow transition-colors hover:border-amber-400 hover:text-amber-300"
                          />
                        }
                      >
                        <Spline className="size-3" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {copy.sectionEditor.addCurvePointBtn}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}

              {/* Calibration Temporary Markers */}
              {calPoint1 && (
                <div
                  style={{
                    left: `${calPoint1.x * 100}%`,
                    top: `${calPoint1.y * 100}%`,
                    transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                  }}
                  className="pointer-events-none absolute flex size-6 items-center justify-center rounded-full border-2 border-white bg-sky-500 font-mono text-xs font-bold text-stone-950 shadow-lg"
                >
                  A
                </div>
              )}
              {calPoint2 && (
                <div
                  style={{
                    left: `${calPoint2.x * 100}%`,
                    top: `${calPoint2.y * 100}%`,
                    transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                  }}
                  className="pointer-events-none absolute flex size-6 items-center justify-center rounded-full border-2 border-white bg-sky-500 font-mono text-xs font-bold text-stone-950 shadow-lg"
                >
                  B
                </div>
              )}

              {/* Interactive Draggable Waypoint Pins */}
              {waypoints.map((wp, idx) => {
                const meta = getWaypointTypeMeta(wp.type);
                const PinIcon = WAYPOINT_ICONS[wp.type];
                const isSelected = wp.id === selectedWaypointId;

                return (
                  <div
                    key={wp.id}
                    style={{
                      left: `${wp.x * 100}%`,
                      top: `${wp.y * 100}%`,
                      transform: `translate(-50%, -100%) scale(${1 / zoom})`,
                      transformOrigin: 'bottom center',
                    }}
                    onPointerDown={(e) => {
                      if (e.button !== 0 || toolMode === 'calibrate') return;
                      e.stopPropagation();
                      viewportRef.current?.setPointerCapture(e.pointerId);
                      onSelectWaypoint(wp.id);
                      dragRef.current = {
                        kind: 'pin',
                        pinId: wp.id,
                        startClientX: e.clientX,
                        startClientY: e.clientY,
                        startPanX: pan.x,
                        startPanY: pan.y,
                        movedPx: 0,
                      };
                    }}
                    className="group absolute z-20 cursor-pointer"
                  >
                    <div
                      className={`mb-1 flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap shadow-md transition-colors ${
                        isSelected
                          ? 'border-amber-400 bg-stone-950 text-amber-300'
                          : 'border-stone-700 bg-stone-950/90 text-stone-100 group-hover:border-amber-400/70'
                      }`}
                    >
                      <span className="font-mono text-amber-400">
                        #{idx + 1}
                      </span>
                      <span className="max-w-28 truncate">{wp.name}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div
                        className={`flex size-7 items-center justify-center rounded-full border-2 shadow-lg ring-2 transition-transform group-hover:scale-110 ${meta.pinBg} ${meta.pinBorder} ${
                          isSelected ? 'scale-110 ring-amber-400' : ''
                        }`}
                      >
                        <PinIcon className="size-3.5" aria-hidden="true" />
                      </div>
                      <div className="h-1.5 w-0.5 bg-stone-950" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom-Left HUD: Dynamic Scale Bar */}
            <div className="pointer-events-auto absolute bottom-3 left-3 z-20 flex flex-col gap-1.5 rounded-lg border border-stone-700/80 bg-stone-950/85 px-3 py-2 text-stone-100 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div
                  style={{ width: `${scaleBar.widthPx}px` }}
                  className="flex h-2 items-end justify-between border-x-2 border-b-2 border-amber-400"
                />
                <span className="font-mono text-xs font-semibold text-amber-300">
                  {scaleBar.km} km
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[10px] text-stone-300">
                <span className="flex items-center gap-1">
                  <Compass className="size-3 text-amber-400" />
                  {calibration?.isCustom
                    ? copy.canvas.scaleCustomBadge
                    : copy.canvas.scaleDefaultBadge}
                </span>
                {calibration?.isCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetCalibration();
                      toast.success(copy.canvas.calibrationResetToast);
                    }}
                    className="inline-flex items-center gap-1 text-amber-300 hover:underline"
                  >
                    <RotateCcw className="size-2.5" />
                    <span>{copy.canvas.resetCalibrationBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom-Right HUD: Zoom Slider */}
            <div className="pointer-events-auto absolute right-3 bottom-3 z-20 hidden w-44 items-center gap-2 rounded-lg border border-stone-700/80 bg-stone-950/85 px-3 py-2 text-stone-100 shadow-lg backdrop-blur-sm sm:flex">
              <ZoomOut className="size-3.5 shrink-0 text-stone-400" />
              <Slider
                value={[Math.round(zoom * 100)]}
                min={25}
                max={1600}
                step={5}
                onValueChange={(vals) => {
                  const pct = Array.isArray(vals) ? vals[0] : vals;
                  if (typeof pct === 'number') {
                    const nextZoom = pct / 100;
                    const ratio = nextZoom / zoomRef.current;
                    setZoom(nextZoom);
                    setPan((p) => ({ x: p.x * ratio, y: p.y * ratio }));
                  }
                }}
              />
              <ZoomIn className="size-3.5 shrink-0 text-stone-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scale Calibration Known Distance Dialog */}
      <Dialog
        open={calDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCancelCalibration();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ruler className="size-4 text-primary" />
              <span>{copy.canvas.calibrationDialogTitle}</span>
            </DialogTitle>
            <DialogDescription>
              {copy.canvas.calibrationDialogDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="tm-cal-km">{copy.canvas.calibrationKmLabel}</Label>
            <Input
              id="tm-cal-km"
              type="number"
              min={1}
              step="any"
              value={calKmInput}
              onChange={(e) => setCalKmInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirmCalibration();
              }}
              className="font-mono"
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelCalibration}
                >
                  {copy.canvas.calibrationCancel}
                </Button>
              }
            />
            <Button type="button" onClick={handleConfirmCalibration}>
              {copy.canvas.calibrationConfirmBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
