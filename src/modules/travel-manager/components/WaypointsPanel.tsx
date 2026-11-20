import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Building2,
  Flag,
  MapPin,
  Pencil,
  Tent,
  Trash2,
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { WAYPOINT_TYPE_LIST, getWaypointTypeMeta } from '../data/travelPresets';
import { getTravelManagerCopy } from '../i18n';
import type {
  ModuleLanguage,
  RouteSegmentSummary,
  TravelWaypoint,
  WaypointType,
} from '../types';

interface WaypointsPanelProps {
  waypoints: readonly TravelWaypoint[];
  segments: readonly RouteSegmentSummary[];
  selectedWaypointId: string | null;
  editingWaypointId: string | null;
  lang: ModuleLanguage;
  onSelectWaypoint: (id: string) => void;
  onRequestEdit: (id: string | null) => void;
  onUpdateWaypoint: (id: string, patch: Partial<TravelWaypoint>) => void;
  onMoveOrder: (index: number, direction: -1 | 1) => void;
  onDeleteWaypoint: (id: string) => void;
  onClearAll: () => void;
}

const WAYPOINT_ICONS: Record<WaypointType, typeof Building2> = {
  city: Building2,
  stage: Flag,
  bivouac: Tent,
};

/**
 * Interactive ordered list of plotted waypoints (cities, stages, bivouacs)
 * with inline reordering, Shadcn Dialog editor, and safe clear-all confirmation.
 */
export function WaypointsPanel({
  waypoints,
  segments,
  selectedWaypointId,
  editingWaypointId,
  lang,
  onSelectWaypoint,
  onRequestEdit,
  onUpdateWaypoint,
  onMoveOrder,
  onDeleteWaypoint,
  onClearAll,
}: WaypointsPanelProps) {
  const copy = getTravelManagerCopy(lang);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const editingTarget = editingWaypointId
    ? (waypoints.find((w) => w.id === editingWaypointId) ?? null)
    : null;

  const [draftName, setDraftName] = useState('');
  const [draftType, setDraftType] = useState<WaypointType>('city');
  const [draftStopDays, setDraftStopDays] = useState('0');
  const [draftNotes, setDraftNotes] = useState('');

  useEffect(() => {
    if (editingTarget) {
      setDraftName(editingTarget.name);
      setDraftType(editingTarget.type);
      setDraftStopDays(String(editingTarget.stopDays));
      setDraftNotes(editingTarget.notes);
    }
  }, [editingTarget]);

  const handleSaveEdit = () => {
    if (!editingTarget) return;
    const stopDays = Math.max(0, Number.parseInt(draftStopDays, 10) || 0);
    onUpdateWaypoint(editingTarget.id, {
      name: draftName.trim() || editingTarget.name,
      type: draftType,
      stopDays,
      notes: draftNotes.trim(),
    });
    onRequestEdit(null);
  };

  return (
    <Card className="flex h-full flex-col border-border">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            <span>
              {copy.waypoints.title} ({waypoints.length})
            </span>
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.waypoints.subtitle}
          </CardDescription>
        </div>

        {waypoints.length > 0 && (
          <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 data-icon="inline-start" className="size-3.5" />
                  <span>{copy.waypoints.clearAllBtn}</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>{copy.waypoints.clearConfirmTitle}</DialogTitle>
                <DialogDescription>
                  {copy.waypoints.clearConfirmBody}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose
                  render={
                    <Button type="button" variant="outline" size="sm">
                      {copy.waypoints.cancelBtn}
                    </Button>
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onClearAll();
                    setClearDialogOpen(false);
                    toast.success(copy.waypoints.clearedToast);
                  }}
                >
                  {copy.waypoints.clearConfirmBtn}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        {waypoints.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/15 p-6 text-center">
            <MapPin className="size-7 text-muted-foreground/50" />
            <div className="text-sm font-medium text-foreground">
              {copy.waypoints.emptyTitle}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {copy.waypoints.emptyHint}
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[460px] pr-2">
            <div className="flex flex-col gap-2">
              {waypoints.map((wp, idx) => {
                const meta = getWaypointTypeMeta(wp.type);
                const WpIcon = WAYPOINT_ICONS[wp.type];
                const isSelected = wp.id === selectedWaypointId;
                const incomingSeg = idx > 0 ? segments[idx - 1] : null;

                return (
                  <div
                    key={wp.id}
                    onClick={() => onSelectWaypoint(wp.id)}
                    className={`flex cursor-pointer flex-col gap-1.5 rounded-lg border p-2.5 text-xs transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:bg-muted/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] font-bold text-foreground">
                          {idx + 1}
                        </span>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-semibold text-foreground">
                            {wp.name}
                          </span>
                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${meta.badgeClass}`}
                            >
                              <WpIcon className="size-2.5" />
                              {meta.label[lang]}
                            </span>
                            {wp.stopDays > 0 && (
                              <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                                +{wp.stopDays} {copy.waypoints.stopDaysBadge}
                              </span>
                            )}
                            {incomingSeg && (
                              <span className="font-mono text-[10px] text-muted-foreground">
                                +{Math.round(incomingSeg.distanceKm)} km
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex shrink-0 items-center gap-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={idx === 0}
                          onClick={() => onMoveOrder(idx, -1)}
                          aria-label={copy.waypoints.moveUpLabel}
                          className="size-7"
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={idx === waypoints.length - 1}
                          onClick={() => onMoveOrder(idx, 1)}
                          aria-label={copy.waypoints.moveDownLabel}
                          className="size-7"
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onRequestEdit(wp.id)}
                          aria-label={copy.waypoints.editLabel}
                          className="size-7"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDeleteWaypoint(wp.id)}
                          aria-label={copy.waypoints.deleteLabel}
                          className="size-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    {wp.notes && (
                      <p className="line-clamp-2 pl-7 text-[11px] text-muted-foreground">
                        {wp.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {/* Waypoint Editor Dialog */}
      <Dialog
        open={Boolean(editingTarget)}
        onOpenChange={(open) => {
          if (!open) onRequestEdit(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.waypoints.editTitle}</DialogTitle>
            <DialogDescription>{copy.waypoints.editDesc}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tm-wp-name">{copy.waypoints.nameLabel}</Label>
              <Input
                id="tm-wp-name"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.waypoints.typeLabel}</Label>
                <Select
                  value={draftType}
                  onValueChange={(val) => {
                    if (
                      val === 'city' ||
                      val === 'stage' ||
                      val === 'bivouac'
                    ) {
                      setDraftType(val);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {getWaypointTypeMeta(draftType).label[lang]}
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
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tm-wp-stop">
                  {copy.waypoints.stopDaysLabel}
                </Label>
                <Input
                  id="tm-wp-stop"
                  type="number"
                  min={0}
                  max={60}
                  value={draftStopDays}
                  onChange={(e) => setDraftStopDays(e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="tm-wp-notes">{copy.waypoints.notesLabel}</Label>
              <Textarea
                id="tm-wp-notes"
                rows={3}
                value={draftNotes}
                onChange={(e) => setDraftNotes(e.target.value)}
                placeholder={copy.waypoints.notesPlaceholder}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-wrap items-center justify-between gap-2 sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (!editingTarget) return;
                onDeleteWaypoint(editingTarget.id);
              }}
            >
              <Trash2 data-icon="inline-start" className="size-4" />
              <span>{copy.waypoints.deleteLabel}</span>
            </Button>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    {copy.waypoints.cancelBtn}
                  </Button>
                }
              />
              <Button type="button" onClick={handleSaveEdit}>
                {copy.waypoints.saveBtn}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
