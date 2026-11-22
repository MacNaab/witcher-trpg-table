import {
  Anchor,
  Compass,
  Palette,
  Plus,
  RotateCcw,
  Spline,
  Trash2,
  Undo2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  SegmentOverrideConfig,
  TransportModeId,
  TravelModifierId,
  TravelPaceId,
  TravelSettings,
} from '../types';
import { formatJourneyDuration } from '../utils/travelCalculations';

interface SectionEditorDialogProps {
  open: boolean;
  segment: RouteSegmentSummary | null;
  overrideConfig: SegmentOverrideConfig | undefined;
  globalSettings: TravelSettings;
  lang: ModuleLanguage;
  onClose: () => void;
  onUpdateSection: (
    segmentKey: string,
    updater: (prev: SegmentOverrideConfig) => SegmentOverrideConfig
  ) => void;
  onAddCurvePoint: (segment: RouteSegmentSummary) => void;
  onRemoveLastCurvePoint: (segmentKey: string) => void;
  onClearCurvePoints: (segmentKey: string) => void;
  onResetSection: (segmentKey: string) => void;
}

/**
 * Shadcn Dialog allowing independent customization of a route section:
 * transport mode, travel pace, stackable Terrestre/Navigation modifiers, and spline curves.
 */
export function SectionEditorDialog({
  open,
  segment,
  overrideConfig,
  globalSettings,
  lang,
  onClose,
  onUpdateSection,
  onAddCurvePoint,
  onRemoveLastCurvePoint,
  onClearCurvePoints,
  onResetSection,
}: SectionEditorDialogProps) {
  const copy = getTravelManagerCopy(lang);

  if (!segment) return null;

  const landModifiers = TRAVEL_MODIFIERS.filter((m) => m.category === 'land');
  const seaModifiers = TRAVEL_MODIFIERS.filter((m) => m.category === 'sea');

  const sectionCategory = getTransportModePreset(segment.transport).category;
  const isLandSection = sectionCategory === 'land';
  const isSeaSection = sectionCategory === 'sea';
  const activeModifiers = segment.modifiers;

  const toggleModifier = (modId: TravelModifierId, checked: boolean) => {
    const mod = getTravelModifierById(modId);
    if (checked && mod && mod.category !== sectionCategory) return;

    onUpdateSection(segment.key, (prev) => {
      const compatibleExisting = (prev.modifiers ?? []).filter(
        (id) => getTravelModifierById(id)?.category === sectionCategory
      );
      const nextList = checked
        ? Array.from(new Set([...compatibleExisting, modId]))
        : compatibleExisting.filter((id) => id !== modId);
      return {
        ...prev,
        modifiers: nextList,
      };
    });
  };

  const selectedTransportValue = overrideConfig?.transport ?? 'inherit';
  const selectedPaceValue = overrideConfig?.pace ?? 'inherit';

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            <span>
              {copy.sectionEditor.titlePrefix} #{segment.index} :{' '}
              {segment.from.name} → {segment.to.name}
            </span>
          </DialogTitle>
          <DialogDescription>{copy.sectionEditor.subtitle}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[68vh] pr-3">
          <div className="flex flex-col gap-5 py-1">
            {/* Live Section Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-muted/25 p-3 text-xs">
              <div>
                <div className="text-muted-foreground">
                  {copy.calculator.tableDistance}
                </div>
                <div className="mt-0.5 font-mono text-sm font-bold text-primary">
                  {Math.round(segment.distanceKm)} km ({Math.round(segment.distanceMiles)} mi)
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  {copy.sectionEditor.liveSpeedLabel}
                </div>
                <div className="mt-0.5 font-mono text-sm font-bold text-foreground">
                  {segment.effectiveSpeedKmPerHour.toFixed(1)} km/h
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">
                  {copy.sectionEditor.liveDurationLabel}
                </div>
                <div className="mt-0.5 font-mono text-sm font-bold text-foreground">
                  {formatJourneyDuration(
                    segment.travelDays,
                    globalSettings.hoursPerDay,
                    lang
                  )}
                </div>
              </div>
            </div>

            {/* Transport & Pace Overrides */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.sectionEditor.transportLabel}</Label>
                <Select
                  value={selectedTransportValue}
                  onValueChange={(val) => {
                    if (!val) return;
                    onUpdateSection(segment.key, (prev) => ({
                      ...prev,
                      transport:
                        val === 'inherit'
                          ? undefined
                          : (val as TransportModeId),
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {selectedTransportValue === 'inherit'
                        ? `${copy.sectionEditor.inheritGlobalOption} (${getTransportModePreset(globalSettings.transport).label[lang]})`
                        : getTransportModePreset(
                            selectedTransportValue as TransportModeId
                          ).label[lang]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="inherit">
                      {copy.sectionEditor.inheritGlobalOption} (
                      {getTransportModePreset(globalSettings.transport).label[lang]}
                      )
                    </SelectItem>
                    {TRANSPORT_MODES.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.label[lang]} ({m.hint[lang]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>{copy.sectionEditor.paceLabel}</Label>
                <Select
                  value={selectedPaceValue}
                  onValueChange={(val) => {
                    if (!val) return;
                    onUpdateSection(segment.key, (prev) => ({
                      ...prev,
                      pace:
                        val === 'inherit' ? undefined : (val as TravelPaceId),
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {selectedPaceValue === 'inherit'
                        ? `${copy.sectionEditor.inheritGlobalOption} (${getTravelPacePreset(globalSettings.pace).label[lang]})`
                        : getTravelPacePreset(selectedPaceValue as TravelPaceId)
                            .label[lang]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="inherit">
                      {copy.sectionEditor.inheritGlobalOption} (
                      {getTravelPacePreset(globalSettings.pace).label[lang]})
                    </SelectItem>
                    {TRAVEL_PACES.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Curve Control Section */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/15 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Spline className="size-4 text-primary" />
                  <span>{copy.sectionEditor.curvesSectionTitle}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {segment.curvePoints.length > 0
                    ? `${segment.curvePoints.length} ${copy.sectionEditor.curvesCountLabel}`
                    : copy.sectionEditor.straightLineLabel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => onAddCurvePoint(segment)}
                >
                  <Plus data-icon="inline-start" />
                  <span>{copy.sectionEditor.addCurvePointBtn}</span>
                </Button>

                {segment.curvePoints.length > 0 && (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveLastCurvePoint(segment.key)}
                    >
                      <Undo2 data-icon="inline-start" />
                      <span>{copy.sectionEditor.removeLastCurveBtn}</span>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onClearCurvePoints(segment.key)}
                    >
                      <Trash2 data-icon="inline-start" />
                      <span>{copy.sectionEditor.clearCurvesBtn}</span>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Per-Section Line Color & Thickness */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/15 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Palette className="size-4 text-primary" />
                <span>{copy.sectionEditor.appearanceSectionTitle}</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-xs">
                      {copy.sectionEditor.sectionColorLabel}
                    </Label>
                    {overrideConfig?.color !== undefined && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-1.5 text-[11px]"
                        onClick={() =>
                          onUpdateSection(segment.key, (prev) => ({
                            ...prev,
                            color: undefined,
                          }))
                        }
                      >
                        <RotateCcw data-icon="inline-start" className="size-3" />
                        <span>{copy.sectionEditor.useGlobalColorBtn}</span>
                      </Button>
                    )}
                  </div>
                  <RouteColorPicker
                    value={overrideConfig?.color ?? segment.strokeColor}
                    lang={lang}
                    customTooltip={copy.canvas.customColorTooltip}
                    onChange={(hex) =>
                      onUpdateSection(segment.key, (prev) => ({
                        ...prev,
                        color: hex,
                      }))
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-xs">
                      {copy.sectionEditor.sectionStrokeWidthLabel}
                    </Label>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-primary tabular-nums">
                        {(
                          overrideConfig?.strokeWidth ?? segment.strokeWidth
                        ).toFixed(1)}{' '}
                        px
                      </span>
                      {overrideConfig?.strokeWidth !== undefined && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-1.5 text-[11px]"
                          onClick={() =>
                            onUpdateSection(segment.key, (prev) => ({
                              ...prev,
                              strokeWidth: undefined,
                            }))
                          }
                        >
                          <RotateCcw data-icon="inline-start" className="size-3" />
                          <span>{copy.sectionEditor.useGlobalWidthBtn}</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <Slider
                    value={[overrideConfig?.strokeWidth ?? segment.strokeWidth]}
                    min={MIN_ROUTE_STROKE_WIDTH}
                    max={MAX_ROUTE_STROKE_WIDTH}
                    step={0.1}
                    onValueChange={(vals) => {
                      const val = Array.isArray(vals) ? vals[0] : vals;
                      if (typeof val === 'number') {
                        onUpdateSection(segment.key, (prev) => ({
                          ...prev,
                          strokeWidth: val,
                        }));
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Stackable Terrestre & Navigation Modifiers */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  {copy.sectionEditor.modifiersTitle} ({activeModifiers.length})
                </h3>
                {activeModifiers.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() =>
                      onUpdateSection(segment.key, (prev) => ({
                        ...prev,
                        modifiers: [],
                      }))
                    }
                  >
                    <Trash2 data-icon="inline-start" className="size-3" />
                    <span>{copy.sectionEditor.clearModifiersBtn}</span>
                  </Button>
                )}
              </div>

              {/* Terrestre Group */}
              <div
                className={`flex flex-col gap-2 ${
                  !isLandSection ? 'opacity-50' : ''
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <div className="flex items-center gap-1.5">
                    <Compass className="size-3.5 text-amber-500" />
                    <span>{copy.sectionEditor.landGroupTitle}</span>
                  </div>
                  {!isLandSection && (
                    <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium tracking-normal normal-case">
                      {copy.sectionEditor.landDisabledForSeaNote}
                    </span>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {landModifiers.map((mod) => {
                    const checked =
                      isLandSection && activeModifiers.includes(mod.id);
                    const isBonus = mod.value > 0;
                    return (
                      <label
                        key={mod.id}
                        className={`flex items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-xs transition-colors ${
                          !isLandSection
                            ? 'cursor-not-allowed border-border bg-muted/20'
                            : checked
                              ? 'cursor-pointer border-primary bg-primary/10'
                              : 'cursor-pointer border-border bg-card hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <Checkbox
                            disabled={!isLandSection}
                            checked={checked}
                            onCheckedChange={(val) =>
                              toggleModifier(mod.id, Boolean(val))
                            }
                          />
                          <span className="truncate font-medium">
                            {mod.name[lang]}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 font-mono text-[11px] font-bold ${
                            isBonus
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {formatModifierPercent(mod.value)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Group */}
              <div
                className={`flex flex-col gap-2 ${
                  !isSeaSection ? 'opacity-50' : ''
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  <div className="flex items-center gap-1.5">
                    <Anchor className="size-3.5 text-sky-500" />
                    <span>{copy.sectionEditor.seaGroupTitle}</span>
                  </div>
                  {!isSeaSection && (
                    <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium tracking-normal normal-case">
                      {copy.sectionEditor.seaDisabledForLandNote}
                    </span>
                  )}
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {seaModifiers.map((mod) => {
                    const checked =
                      isSeaSection && activeModifiers.includes(mod.id);
                    const isBonus = mod.value > 0;
                    return (
                      <label
                        key={mod.id}
                        className={`flex items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-xs transition-colors ${
                          !isSeaSection
                            ? 'cursor-not-allowed border-border bg-muted/20'
                            : checked
                              ? 'cursor-pointer border-sky-500 bg-sky-500/10'
                              : 'cursor-pointer border-border bg-card hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <Checkbox
                            disabled={!isSeaSection}
                            checked={checked}
                            onCheckedChange={(val) =>
                              toggleModifier(mod.id, Boolean(val))
                            }
                          />
                          <span className="truncate font-medium">
                            {mod.name[lang]}
                          </span>
                        </div>
                        <span
                          className={`shrink-0 font-mono text-[11px] font-bold ${
                            isBonus
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {formatModifierPercent(mod.value)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onResetSection(segment.key)}
          >
            <RotateCcw data-icon="inline-start" />
            <span>{copy.sectionEditor.resetSectionBtn}</span>
          </Button>
          <DialogClose
            render={
              <Button type="button" variant="default" size="sm">
                {copy.sectionEditor.closeBtn}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
