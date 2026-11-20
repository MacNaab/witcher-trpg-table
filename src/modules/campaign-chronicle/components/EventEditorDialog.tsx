import { useEffect, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  ELVEN_MONTHS,
  formatContinentDate,
  getMonthDef,
} from '@/src/utils/continentCalendar';
import { getCampaignChronicleCopy } from '../i18n';
import type {
  ChronicleContinentDate,
  ChronicleEvent,
  ChronicleEventCategory,
  ChronicleEventStatus,
  ChronicleImportance,
  ChronicleTimeOfDay,
  ModuleLanguage,
} from '../types';
import {
  getCalendarSnapshotDate,
  normalizeContinentDate,
} from '../utils/chronicleStorage';

export interface EventFormValues {
  title: string;
  summary: string;
  gmSecretNote: string;
  date: ChronicleContinentDate;
  sessionNumber: number;
  category: ChronicleEventCategory;
  status: ChronicleEventStatus;
  importance: ChronicleImportance;
  location: string;
  involvedEntities: string[];
  consequences: string;
  pinned: boolean;
  /** Real-world ISO date (YYYY-MM-DD) for the event's session when sessionNumber > 0 */
  sessionRealDate?: string;
}

interface EventEditorDialogProps {
  lang: ModuleLanguage;
  open: boolean;
  editingEvent: ChronicleEvent | null;
  defaultSessionNumber: number;
  sessionDates: Record<string, string>;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: EventFormValues) => void;
}

const EVENT_CATEGORIES: readonly ChronicleEventCategory[] = [
  'story',
  'contract',
  'combat',
  'travel',
  'politics',
  'npc',
  'discovery',
  'downtime',
];

const EVENT_STATUSES: readonly ChronicleEventStatus[] = [
  'completed',
  'active',
  'upcoming',
  'consequence',
];

const EVENT_IMPORTANCES: readonly ChronicleImportance[] = [
  'minor',
  'major',
  'turning-point',
];

const TIMES_OF_DAY: readonly ChronicleTimeOfDay[] = [
  'dawn',
  'morning',
  'afternoon',
  'dusk',
  'night',
];

/**
 * Shadcn Dialog for creating or editing a dated chronological campaign event.
 */
export function EventEditorDialog({
  lang,
  open,
  editingEvent,
  defaultSessionNumber,
  sessionDates,
  onOpenChange,
  onSubmit,
}: EventEditorDialogProps) {
  const copy = getCampaignChronicleCopy(lang);
  const d = copy.eventDialog;

  const [title, setTitle] = useState('');
  const [year, setYear] = useState(1272);
  const [monthIndex, setMonthIndex] = useState(2);
  const [dayOfMonth, setDayOfMonth] = useState(12);
  const [timeOfDay, setTimeOfDay] = useState<ChronicleTimeOfDay>('morning');
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionRealDate, setSessionRealDate] = useState('');
  const [sessionDateDirty, setSessionDateDirty] = useState(false);
  const [category, setCategory] = useState<ChronicleEventCategory>('story');
  const [status, setStatus] = useState<ChronicleEventStatus>('completed');
  const [importance, setImportance] = useState<ChronicleImportance>('major');
  const [location, setLocation] = useState('');
  const [entitiesText, setEntitiesText] = useState('');
  const [summary, setSummary] = useState('');
  const [consequences, setConsequences] = useState('');
  const [gmSecretNote, setGmSecretNote] = useState('');
  const [pinned, setPinned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editingEvent) {
      setTitle(editingEvent.title);
      setYear(editingEvent.date.year);
      setMonthIndex(editingEvent.date.monthIndex);
      setDayOfMonth(editingEvent.date.dayOfMonth);
      setTimeOfDay(editingEvent.date.timeOfDay);
      setSessionNumber(editingEvent.sessionNumber);
      setSessionRealDate(
        editingEvent.sessionNumber > 0
          ? (sessionDates[String(editingEvent.sessionNumber)] ?? '')
          : ''
      );
      setSessionDateDirty(false);
      setCategory(editingEvent.category);
      setStatus(editingEvent.status);
      setImportance(editingEvent.importance);
      setLocation(editingEvent.location);
      setEntitiesText(editingEvent.involvedEntities.join(', '));
      setSummary(editingEvent.summary);
      setConsequences(editingEvent.consequences);
      setGmSecretNote(editingEvent.gmSecretNote);
      setPinned(editingEvent.pinned);
    } else {
      const calDate = getCalendarSnapshotDate();
      const initialSession = Math.max(1, defaultSessionNumber);
      setTitle('');
      setYear(calDate.year);
      setMonthIndex(calDate.monthIndex);
      setDayOfMonth(calDate.dayOfMonth);
      setTimeOfDay('morning');
      setSessionNumber(initialSession);
      setSessionRealDate(sessionDates[String(initialSession)] ?? '');
      setSessionDateDirty(false);
      setCategory('story');
      setStatus('completed');
      setImportance('major');
      setLocation('');
      setEntitiesText('');
      setSummary('');
      setConsequences('');
      setGmSecretNote('');
      setPinned(false);
    }
    setError(null);
  }, [defaultSessionNumber, editingEvent, open, sessionDates]);

  const currentMonthDef = getMonthDef(monthIndex);

  const handleSyncCalendar = () => {
    const cal = getCalendarSnapshotDate();
    setYear(cal.year);
    setMonthIndex(cal.monthIndex);
    setDayOfMonth(cal.dayOfMonth);
    const label = formatContinentDate(cal)[lang];
    toast.success(copy.toasts.calendarSynced(label));
  };

  const handleMonthChange = (nextIdx: number) => {
    const nextMonth = getMonthDef(nextIdx);
    setMonthIndex(nextIdx);
    if (dayOfMonth > nextMonth.length) {
      setDayOfMonth(nextMonth.length);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError(d.titleRequiredError);
      return;
    }

    const parsedEntities = entitiesText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const normalizedSession = Math.max(0, Math.trunc(sessionNumber || 0));

    onSubmit({
      title: trimmedTitle,
      summary: summary.trim(),
      gmSecretNote: gmSecretNote.trim(),
      date: normalizeContinentDate({
        year,
        monthIndex,
        dayOfMonth,
        timeOfDay,
      }),
      sessionNumber: normalizedSession,
      category,
      status,
      importance,
      location: location.trim(),
      involvedEntities: parsedEntities,
      consequences: consequences.trim(),
      pinned,
      sessionRealDate: normalizedSession > 0 ? sessionRealDate.trim() : undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingEvent ? d.editTitle : d.createTitle}
          </DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ScrollArea className="max-h-[65dvh] pr-3">
            <div className="flex flex-col gap-4 pb-1">
              {/* Event Title */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chronicle-evt-title">{d.titleLabel}</Label>
                <Input
                  id="chronicle-evt-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={d.titlePlaceholder}
                />
                {error && (
                  <p className="text-xs font-medium text-destructive">{error}</p>
                )}
              </div>

              {/* Continent Date Row */}
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {formatContinentDate({ year, monthIndex, dayOfMonth })[lang]} ·{' '}
                    {copy.timeOfDay[timeOfDay]}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={handleSyncCalendar}
                    className="gap-1.5"
                  >
                    <CalendarClock className="size-3.5 text-primary" />
                    <span>{d.syncCalendarBtn}</span>
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="chronicle-evt-day" className="text-xs">
                      {d.dayLabel}
                    </Label>
                    <Input
                      id="chronicle-evt-day"
                      type="number"
                      min={1}
                      max={currentMonthDef.length}
                      value={dayOfMonth}
                      onChange={(e) =>
                        setDayOfMonth(
                          Math.max(
                            1,
                            Math.min(
                              currentMonthDef.length,
                              Number(e.target.value) || 1
                            )
                          )
                        )
                      }
                      className="font-mono tabular-nums"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="chronicle-evt-month" className="text-xs">
                      {d.monthLabel}
                    </Label>
                    <Select
                      value={String(monthIndex)}
                      onValueChange={(val) => {
                        if (val !== null) handleMonthChange(Number(val));
                      }}
                    >
                      <SelectTrigger id="chronicle-evt-month" className="w-full">
                        <SelectValue>{currentMonthDef.name[lang]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {ELVEN_MONTHS.map((m) => (
                          <SelectItem key={m.id} value={String(m.index)}>
                            {m.name[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="chronicle-evt-year" className="text-xs">
                      {d.yearLabel}
                    </Label>
                    <Input
                      id="chronicle-evt-year"
                      type="number"
                      min={1}
                      max={9999}
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value) || 1272)}
                      className="font-mono tabular-nums"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label htmlFor="chronicle-evt-time" className="text-xs">
                      {d.timeOfDayLabel}
                    </Label>
                    <Select
                      value={timeOfDay}
                      onValueChange={(val) => {
                        if (val) setTimeOfDay(val as ChronicleTimeOfDay);
                      }}
                    >
                      <SelectTrigger id="chronicle-evt-time" className="w-full">
                        <SelectValue>{copy.timeOfDay[timeOfDay]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {TIMES_OF_DAY.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {copy.timeOfDay[slot]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Session # + Real-World Date */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-session">{d.sessionLabel}</Label>
                  <Input
                    id="chronicle-evt-session"
                    type="number"
                    min={0}
                    max={999}
                    value={sessionNumber}
                    onChange={(e) => {
                      const nextSess = Math.max(
                        0,
                        Math.trunc(Number(e.target.value) || 0)
                      );
                      setSessionNumber(nextSess);
                      if (!sessionDateDirty) {
                        setSessionRealDate(
                          nextSess > 0 ? (sessionDates[String(nextSess)] ?? '') : ''
                        );
                      }
                    }}
                    className="font-mono tabular-nums"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-realdate">
                    {d.sessionRealDateLabel}
                  </Label>
                  <Input
                    id="chronicle-evt-realdate"
                    type="date"
                    disabled={sessionNumber <= 0}
                    value={sessionNumber > 0 ? sessionRealDate : ''}
                    onChange={(e) => {
                      setSessionDateDirty(true);
                      setSessionRealDate(e.target.value);
                    }}
                    className="font-mono tabular-nums"
                  />
                  <span className="text-[11px] text-muted-foreground">
                    {d.sessionRealDateHint}
                  </span>
                </div>
              </div>

              {/* Classification */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-category">
                    {d.categoryLabel}
                  </Label>
                  <Select
                    value={category}
                    onValueChange={(val) => {
                      if (val) setCategory(val as ChronicleEventCategory);
                    }}
                  >
                    <SelectTrigger id="chronicle-evt-category" className="w-full">
                      <SelectValue>{copy.categories[category]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {copy.categories[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-status">{d.statusLabel}</Label>
                  <Select
                    value={status}
                    onValueChange={(val) => {
                      if (val) setStatus(val as ChronicleEventStatus);
                    }}
                  >
                    <SelectTrigger id="chronicle-evt-status" className="w-full">
                      <SelectValue>{copy.eventStatus[status]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_STATUSES.map((st) => (
                        <SelectItem key={st} value={st}>
                          {copy.eventStatus[st]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-importance">
                    {d.importanceLabel}
                  </Label>
                  <Select
                    value={importance}
                    onValueChange={(val) => {
                      if (val) setImportance(val as ChronicleImportance);
                    }}
                  >
                    <SelectTrigger
                      id="chronicle-evt-importance"
                      className="w-full"
                    >
                      <SelectValue>{copy.importance[importance]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_IMPORTANCES.map((imp) => (
                        <SelectItem key={imp} value={imp}>
                          {copy.importance[imp]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location & Involved */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-location">{d.locationLabel}</Label>
                  <Input
                    id="chronicle-evt-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={d.locationPlaceholder}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="chronicle-evt-entities">{d.entitiesLabel}</Label>
                  <Input
                    id="chronicle-evt-entities"
                    value={entitiesText}
                    onChange={(e) => setEntitiesText(e.target.value)}
                    placeholder={d.entitiesPlaceholder}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chronicle-evt-summary">{d.summaryLabel}</Label>
                <Textarea
                  id="chronicle-evt-summary"
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder={d.summaryPlaceholder}
                />
              </div>

              {/* Consequences */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chronicle-evt-consequences">
                  {d.consequencesLabel}
                </Label>
                <Textarea
                  id="chronicle-evt-consequences"
                  rows={2}
                  value={consequences}
                  onChange={(e) => setConsequences(e.target.value)}
                  placeholder={d.consequencesPlaceholder}
                />
              </div>

              {/* GM Secret Note */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="chronicle-evt-secret">{d.gmSecretLabel}</Label>
                <Textarea
                  id="chronicle-evt-secret"
                  rows={2}
                  value={gmSecretNote}
                  onChange={(e) => setGmSecretNote(e.target.value)}
                  placeholder={d.gmSecretPlaceholder}
                />
              </div>

              {/* Pin Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <Checkbox
                  id="chronicle-evt-pinned"
                  checked={pinned}
                  onCheckedChange={(checked) => setPinned(Boolean(checked))}
                />
                <Label
                  htmlFor="chronicle-evt-pinned"
                  className="cursor-pointer text-sm font-normal"
                >
                  {d.pinnedLabel}
                </Label>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {d.cancelBtn}
            </Button>
            <Button type="submit">
              {editingEvent ? d.saveBtn : d.createBtn}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
