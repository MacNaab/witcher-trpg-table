import { useState } from 'react';
import {
  Anchor,
  ChevronDown,
  Clock,
  Compass,
  Droplets,
  Gauge,
  Palette,
  Plus,
  RotateCcw,
  Route,
  SlidersHorizontal,
  Spline,
  Users,
  Utensils,
  Wheat,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DEFAULT_LAND_ROUTE_COLOR,
  DEFAULT_ROUTE_STROKE_WIDTH,
  DEFAULT_SEA_ROUTE_COLOR,
  MAX_ROUTE_STROKE_WIDTH,
  MIN_ROUTE_STROKE_WIDTH,
  TRANSPORT_MODES,
  TRAVEL_MODIFIERS,
  TRAVEL_PACES,
  formatModifierPercent,
  getTransportModePreset,
  getTravelModifierById,
  getTravelPacePreset,
} from '../data/travelPresets';
import { RouteColorPicker } from './RouteColorPicker';
import { getTravelManagerCopy } from '../i18n';
import type {
  ModuleLanguage,
  RouteSegmentSummary,
  RouteTotalSummary,
  TransportModeId,
  TravelModifierId,
  TravelPaceId,
  TravelSettings,
} from '../types';
import { formatJourneyDuration } from '../utils/travelCalculations';

interface TravelCalculatorCardProps {
  settings: TravelSettings;
  summary: RouteTotalSummary;
  selectedSegmentKey: string | null;
  lang: ModuleLanguage;
  onUpdateSettings: (patch: Partial<TravelSettings>) => void;
  onSelectSegment: (segmentKey: string) => void;
  onEditSegment: (segmentKey: string) => void;
  onAddCurvePoint: (segment: RouteSegmentSummary) => void;
  onToggleSectionModifier: (
    segmentKey: string,
    modifierId: TravelModifierId,
    checked: boolean
  ) => void;
  onClearSectionModifiers: (segmentKey: string) => void;
}

/**
 * Automatic journey, duration, pace, and supply/ration calculator
 * with per-section modifier activation, independent transport, style, and curves.
 */
export function TravelCalculatorCard({
  settings,
  summary,
  selectedSegmentKey,
  lang,
  onUpdateSettings,
  onSelectSegment,
  onEditSegment,
  onAddCurvePoint,
  onToggleSectionModifier,
  onClearSectionModifiers,
}: TravelCalculatorCardProps) {
  const copy = getTravelManagerCopy(lang);
  const [styleOpen, setStyleOpen] = useState(false);

  const selectedTransport = getTransportModePreset(settings.transport);
  const selectedPace = getTravelPacePreset(settings.pace);

  const landModifiers = TRAVEL_MODIFIERS.filter((m) => m.category === 'land');
  const seaModifiers = TRAVEL_MODIFIERS.filter((m) => m.category === 'sea');

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold sm:text-lg">
          <Route className="size-5 text-primary" aria-hidden="true" />
          <span>{copy.calculator.title}</span>
        </CardTitle>
        <CardDescription>{copy.calculator.subtitle}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Live KPI Dashboard */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Route className="size-3.5 text-primary" />
              <span>{copy.calculator.kpiDistance}</span>
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-primary tabular-nums">
              {Math.round(summary.totalDistanceKm)} km
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {Math.round(summary.totalDistanceMiles)} mi
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              <span>{copy.calculator.kpiDuration}</span>
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-foreground tabular-nums">
              {formatJourneyDuration(
                summary.totalJourneyDays,
                settings.hoursPerDay,
                lang
              )}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {copy.calculator.kpiTravelOnly}:{' '}
              {formatJourneyDuration(
                summary.activeTravelDays,
                settings.hoursPerDay,
                lang
              )}
              {summary.stopoverDays > 0
                ? ` · +${summary.stopoverDays} ${copy.calculator.kpiStopovers}`
                : ''}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Gauge className="size-3.5 text-primary" />
              <span>{copy.calculator.kpiSpeed}</span>
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-foreground tabular-nums">
              {Math.round(summary.averageKmPerDay)} km/
              {lang === 'fr' ? 'j' : 'd'}
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {summary.averageSpeedKmPerHour.toFixed(1)} km/h ·{' '}
              {settings.hoursPerDay} {copy.calculator.hoursSuffix}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Utensils className="size-3.5 text-amber-500" />
              <span>{copy.calculator.kpiRations}</span>
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-amber-600 tabular-nums dark:text-amber-400">
              {summary.totalRations}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Droplets className="size-3 text-sky-500" />
              <span>
                {summary.totalWaterLiters} L ({copy.calculator.kpiWater})
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/25 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Wheat className="size-3.5 text-emerald-500" />
              <span>{copy.calculator.kpiFodder}</span>
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
              {summary.usesAnyMounts ? summary.totalFodder : '—'}
            </div>
            <div className="text-[11px] text-muted-foreground">
              {summary.usesAnyMounts
                ? `${settings.mountCount} × ${Math.ceil(summary.totalJourneyDays)}`
                : copy.calculator.noMountsNeeded}
            </div>
          </div>
        </div>

        <Separator />

        {/* Global Default Transport, Pace & Party Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>{copy.calculator.transportLabel}</Label>
            <Select
              value={settings.transport}
              onValueChange={(val) => {
                if (val) {
                  onUpdateSettings({ transport: val as TransportModeId });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{selectedTransport.label[lang]}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {TRANSPORT_MODES.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.label[lang]} ({mode.hint[lang]})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[11px] text-muted-foreground">
              {selectedTransport.hint[lang]}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{copy.calculator.paceLabel}</Label>
            <Select
              value={settings.pace}
              onValueChange={(val) => {
                if (val) {
                  onUpdateSettings({ pace: val as TravelPaceId });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{selectedPace.label[lang]}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {TRAVEL_PACES.map((pace) => (
                  <SelectItem key={pace.id} value={pace.id}>
                    {pace.label[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-[11px] text-muted-foreground">
              {selectedPace.hint[lang]}
            </span>
          </div>
        </div>

        {/* Collapsible Global Route Thickness & Colors */}
        <Collapsible open={styleOpen} onOpenChange={setStyleOpen}>
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full justify-between"
              />
            }
          >
            <span className="flex items-center gap-2">
              <Palette className="size-3.5 text-primary" />
              <span>
                {copy.canvas.styleTitle} ({settings.routeStrokeWidth.toFixed(1)}{' '}
                px)
              </span>
              <span
                aria-hidden="true"
                style={{ backgroundColor: settings.landRouteColor }}
                className="size-2.5 rounded-full border border-border"
              />
              <span
                aria-hidden="true"
                style={{ backgroundColor: settings.seaRouteColor }}
                className="size-2.5 rounded-full border border-border"
              />
            </span>
            <ChevronDown
              className={`size-4 transition-transform ${
                styleOpen ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-3">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between text-xs">
                  <Label>{copy.canvas.strokeWidthLabel}</Label>
                  <span className="font-mono font-bold text-primary tabular-nums">
                    {settings.routeStrokeWidth.toFixed(1)} px
                  </span>
                </div>
                <Slider
                  value={[settings.routeStrokeWidth]}
                  min={MIN_ROUTE_STROKE_WIDTH}
                  max={MAX_ROUTE_STROKE_WIDTH}
                  step={0.1}
                  onValueChange={(vals) => {
                    const val = Array.isArray(vals) ? vals[0] : vals;
                    if (typeof val === 'number') {
                      onUpdateSettings({ routeStrokeWidth: val });
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">{copy.canvas.landColorLabel}</Label>
                <RouteColorPicker
                  value={settings.landRouteColor}
                  lang={lang}
                  customTooltip={copy.canvas.customColorTooltip}
                  onChange={(hex) => onUpdateSettings({ landRouteColor: hex })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">{copy.canvas.seaColorLabel}</Label>
                <RouteColorPicker
                  value={settings.seaRouteColor}
                  lang={lang}
                  customTooltip={copy.canvas.customColorTooltip}
                  onChange={(hex) => onUpdateSettings({ seaRouteColor: hex })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() =>
                  onUpdateSettings({
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
          </CollapsibleContent>
        </Collapsible>

        {/* Daily Hours & Party Supplies Inputs */}
        <div className="grid gap-4 rounded-lg border border-border/70 bg-muted/20 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between text-xs">
              <Label>{copy.calculator.hoursPerDayLabel}</Label>
              <span className="font-mono font-bold text-primary">
                {settings.hoursPerDay} {copy.calculator.hoursSuffix}
              </span>
            </div>
            <Slider
              value={[settings.hoursPerDay]}
              min={4}
              max={14}
              step={1}
              onValueChange={(vals) => {
                const hrs = Array.isArray(vals) ? vals[0] : vals;
                if (typeof hrs === 'number') {
                  onUpdateSettings({ hoursPerDay: hrs });
                }
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tm-party-size" className="flex items-center gap-1.5">
              <Users className="size-3.5 text-muted-foreground" />
              <span>{copy.calculator.partySizeLabel}</span>
            </Label>
            <Input
              id="tm-party-size"
              type="number"
              min={1}
              max={50}
              value={settings.partySize}
              onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10);
                if (Number.isFinite(n) && n >= 1) {
                  onUpdateSettings({ partySize: n });
                }
              }}
              className="h-8 font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tm-mount-count">
              {copy.calculator.mountCountLabel}
            </Label>
            <Input
              id="tm-mount-count"
              type="number"
              min={0}
              max={50}
              disabled={!summary.usesAnyMounts}
              value={settings.mountCount}
              onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10);
                if (Number.isFinite(n) && n >= 0) {
                  onUpdateSettings({ mountCount: n });
                }
              }}
              className="h-8 font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="tm-rations-day">
              {copy.calculator.rationsPerDayLabel}
            </Label>
            <Input
              id="tm-rations-day"
              type="number"
              min={0.5}
              max={5}
              step={0.5}
              value={settings.rationsPerDay}
              onChange={(e) => {
                const n = Number.parseFloat(e.target.value);
                if (Number.isFinite(n) && n >= 0.5) {
                  onUpdateSettings({ rationsPerDay: n });
                }
              }}
              className="h-8 font-mono"
            />
          </div>
        </div>

        {/* Per-Section Breakdown & Configuration Table */}
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {copy.calculator.segmentsTitle}
            </h3>
            <p className="text-xs text-muted-foreground">
              {copy.calculator.segmentsHint}
            </p>
          </div>

          {summary.segments.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              {copy.calculator.noSegmentsHint}
            </p>
          ) : (
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      {copy.calculator.tableLeg}
                    </TableHead>
                    <TableHead>{copy.calculator.tableRoute}</TableHead>
                    <TableHead>{copy.calculator.tableConditions}</TableHead>
                    <TableHead className="text-right">
                      {copy.calculator.tableDistance}
                    </TableHead>
                    <TableHead className="text-right">
                      {copy.calculator.tableTime}
                    </TableHead>
                    <TableHead className="w-44 text-right">
                      {copy.calculator.tableActions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.segments.map((seg) => {
                    const segTransport = getTransportModePreset(seg.transport);
                    const isSelectedSeg = seg.key === selectedSegmentKey;
                    return (
                      <TableRow
                        key={seg.key}
                        onClick={() => onSelectSegment(seg.key)}
                        className={`cursor-pointer ${
                          isSelectedSeg ? 'bg-primary/5' : ''
                        }`}
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {seg.index}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              style={{ backgroundColor: seg.strokeColor }}
                              className="size-2.5 shrink-0 rounded-full border border-border"
                            />
                            <span>
                              {seg.from.name} → {seg.to.name}
                            </span>
                            {seg.curvePoints.length > 0 && (
                              <span className="inline-flex items-center gap-1 rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] text-amber-700 dark:text-amber-300">
                                <Spline className="size-2.5" />
                                {seg.curvePoints.length}{' '}
                                {copy.calculator.curvesBadge}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex flex-wrap items-center gap-1 text-[11px]">
                            <span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-medium">
                              {segTransport.label[lang]}
                            </span>

                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-6 gap-1 px-1.5 text-[11px]"
                                  />
                                }
                              >
                                <Plus className="size-3" />
                                <span>
                                  {copy.calculator.modifiersBtn}
                                  {seg.modifiers.length > 0
                                    ? ` (${seg.modifiers.length})`
                                    : ''}
                                </span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="start"
                                className="max-h-80 w-auto min-w-72"
                              >
                                {segTransport.category === 'land' ? (
                                  <DropdownMenuGroup>
                                    <DropdownMenuLabel className="flex items-center gap-1.5">
                                      <Compass className="size-3 text-amber-500" />
                                      <span>
                                        {copy.sectionEditor.landGroupTitle}
                                      </span>
                                    </DropdownMenuLabel>
                                    {landModifiers.map((mod) => {
                                      const checked = seg.modifiers.includes(
                                        mod.id
                                      );
                                      return (
                                        <DropdownMenuCheckboxItem
                                          key={mod.id}
                                          checked={checked}
                                          closeOnClick={false}
                                          onCheckedChange={(val) =>
                                            onToggleSectionModifier(
                                              seg.key,
                                              mod.id,
                                              Boolean(val)
                                            )
                                          }
                                          className="justify-between gap-3 text-xs"
                                        >
                                          <span>{mod.name[lang]}</span>
                                          <span
                                            className={`mr-4 font-mono text-[11px] font-semibold ${
                                              mod.value > 0
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                            }`}
                                          >
                                            {formatModifierPercent(mod.value)}
                                          </span>
                                        </DropdownMenuCheckboxItem>
                                      );
                                    })}
                                  </DropdownMenuGroup>
                                ) : (
                                  <DropdownMenuGroup>
                                    <DropdownMenuLabel className="flex items-center gap-1.5">
                                      <Anchor className="size-3 text-sky-500" />
                                      <span>
                                        {copy.sectionEditor.seaGroupTitle}
                                      </span>
                                    </DropdownMenuLabel>
                                    {seaModifiers.map((mod) => {
                                      const checked = seg.modifiers.includes(
                                        mod.id
                                      );
                                      return (
                                        <DropdownMenuCheckboxItem
                                          key={mod.id}
                                          checked={checked}
                                          closeOnClick={false}
                                          onCheckedChange={(val) =>
                                            onToggleSectionModifier(
                                              seg.key,
                                              mod.id,
                                              Boolean(val)
                                            )
                                          }
                                          className="justify-between gap-3 text-xs"
                                        >
                                          <span>{mod.name[lang]}</span>
                                          <span
                                            className={`mr-4 font-mono text-[11px] font-semibold ${
                                              mod.value > 0
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-rose-600 dark:text-rose-400'
                                            }`}
                                          >
                                            {formatModifierPercent(mod.value)}
                                          </span>
                                        </DropdownMenuCheckboxItem>
                                      );
                                    })}
                                  </DropdownMenuGroup>
                                )}

                                {seg.modifiers.length > 0 && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      variant="destructive"
                                      onClick={() =>
                                        onClearSectionModifiers(seg.key)
                                      }
                                      className="text-xs"
                                    >
                                      {copy.calculator.clearModifiersBtn}
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>

                            {seg.modifiers.map((modId) => {
                              const mod = getTravelModifierById(modId);
                              if (!mod) return null;
                              return (
                                <button
                                  key={modId}
                                  type="button"
                                  title={copy.sectionEditor.clearModifiersBtn}
                                  onClick={() =>
                                    onToggleSectionModifier(
                                      seg.key,
                                      modId,
                                      false
                                    )
                                  }
                                  className={`rounded border px-1.5 py-0.5 font-mono text-[10px] transition-opacity hover:opacity-75 ${
                                    mod.value > 0
                                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                      : 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                                  }`}
                                >
                                  {mod.name[lang]} (
                                  {formatModifierPercent(mod.value)}) ×
                                </button>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {Math.round(seg.distanceKm)} km{' '}
                          <span className="text-muted-foreground">
                            ({Math.round(seg.distanceMiles)} mi)
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs font-semibold text-primary tabular-nums">
                          {formatJourneyDuration(
                            seg.travelDays,
                            settings.hoursPerDay,
                            lang
                          )}
                        </TableCell>
                        <TableCell
                          className="text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => {
                                onSelectSegment(seg.key);
                                onAddCurvePoint(seg);
                                toast.success(copy.canvas.curveAddedToast);
                              }}
                            >
                              <Spline data-icon="inline-start" className="size-3" />
                              <span>{copy.calculator.addCurveBtn}</span>
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => {
                                onSelectSegment(seg.key);
                                onEditSegment(seg.key);
                              }}
                            >
                              <SlidersHorizontal
                                data-icon="inline-start"
                                className="size-3"
                              />
                              <span>{copy.calculator.editSectionBtn}</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
