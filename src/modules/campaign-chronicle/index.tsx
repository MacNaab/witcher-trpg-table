import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  BookOpen,
  CalendarClock,
  Copy,
  Download,
  FileText,
  History,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import {
  CampaignEditorDialog,
  type CampaignFormValues,
} from './components/CampaignEditorDialog';
import { ChronicleSessionView } from './components/ChronicleSessionView';
import { ChronicleTableView } from './components/ChronicleTableView';
import { ChronicleTimelineView } from './components/ChronicleTimelineView';
import {
  EventEditorDialog,
  type EventFormValues,
} from './components/EventEditorDialog';
import { getCampaignChronicleCopy } from './i18n';
import type {
  CampaignChronicleStore,
  CampaignRecord,
  ChronicleEvent,
  ChronicleEventCategory,
  ChronicleEventStatus,
  ChronicleSortOrder,
  ChronicleViewMode,
  ModuleLanguage,
} from './types';
import {
  downloadChronicleJson,
  downloadChronicleMarkdown,
  parseChronicleImportJson,
} from './utils/chronicleExport';
import {
  CHRONICLE_UPDATED_EVENT,
  buildSampleChronicleEvents,
  buildSampleSessionDates,
  duplicateCampaignWithEvents,
  formatRealDateLabel,
  getNextEventStatus,
  loadChronicleStore,
  normalizeContinentDate,
  normalizeRealDate,
  saveChronicleStore,
  sortChronicleEvents,
} from './utils/chronicleStorage';

/**
 * Multi-campaign chronological tracker enabling GMs to manage multiple campaigns
 * and visualize events by Continent timeline, tabletop session, or compact table.
 */
export default function CampaignChronicleModule({
  onNavigateOverview,
  onNavigateModule,
  launchIntent,
}: ModuleEntryProps) {
  const { locale } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const copy = getCampaignChronicleCopy(lang);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const [store, setStore] = useState<CampaignChronicleStore>(() =>
    loadChronicleStore(lang)
  );
  const [viewMode, setViewMode] = useState<ChronicleViewMode>('timeline');
  const [sortOrder, setSortOrder] = useState<ChronicleSortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | ChronicleEventCategory
  >('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | ChronicleEventStatus
  >('all');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [showGmSecrets, setShowGmSecrets] = useState(true);

  const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CampaignRecord | null>(
    null
  );
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChronicleEvent | null>(null);

  const [pendingDeleteEvent, setPendingDeleteEvent] =
    useState<ChronicleEvent | null>(null);
  const [pendingDeleteCampaign, setPendingDeleteCampaign] =
    useState<CampaignRecord | null>(null);

  // Sync if another view or backup restore updates localStorage
  useEffect(() => {
    const sync = () => setStore(loadChronicleStore(lang));
    window.addEventListener(CHRONICLE_UPDATED_EVENT, sync);
    return () => window.removeEventListener(CHRONICLE_UPDATED_EVENT, sync);
  }, [lang]);

  // Support deep-linking directly to a specific campaign via CommandSearchDialog / Overview
  useEffect(() => {
    if (!launchIntent?.entryId) return;
    setStore((prev) => {
      const targetExists = prev.campaigns.some(
        (c) => c.id === launchIntent.entryId
      );
      if (!targetExists || prev.activeCampaignId === launchIntent.entryId) {
        return prev;
      }
      const next = { ...prev, activeCampaignId: launchIntent.entryId! };
      saveChronicleStore(next);
      return next;
    });
  }, [launchIntent]);

  const commitStore = (
    updater: (prev: CampaignChronicleStore) => CampaignChronicleStore
  ) => {
    setStore((prev) => {
      const next = updater(prev);
      saveChronicleStore(next);
      return next;
    });
  };

  const activeCampaign = useMemo(() => {
    return (
      store.campaigns.find((c) => c.id === store.activeCampaignId) ??
      store.campaigns[0]
    );
  }, [store.activeCampaignId, store.campaigns]);

  const campaignEvents = useMemo(() => {
    return store.events.filter((ev) => ev.campaignId === activeCampaign.id);
  }, [activeCampaign.id, store.events]);

  const sortedCampaignEvents = useMemo(() => {
    return sortChronicleEvents(campaignEvents, sortOrder);
  }, [campaignEvents, sortOrder]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return sortedCampaignEvents.filter((ev) => {
      if (categoryFilter !== 'all' && ev.category !== categoryFilter) {
        return false;
      }
      if (statusFilter !== 'all' && ev.status !== statusFilter) {
        return false;
      }
      if (pinnedOnly && !ev.pinned) {
        return false;
      }
      if (q) {
        const rawReal =
          ev.sessionNumber > 0
            ? activeCampaign.sessionDates?.[String(ev.sessionNumber)]
            : undefined;
        const realFormatted = formatRealDateLabel(rawReal, lang) ?? '';
        const haystack = [
          ev.title,
          ev.summary,
          ev.location,
          ev.consequences,
          ev.gmSecretNote,
          ev.involvedEntities.join(' '),
          rawReal ?? '',
          realFormatted,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [
    activeCampaign.sessionDates,
    categoryFilter,
    lang,
    pinnedOnly,
    searchQuery,
    sortedCampaignEvents,
    statusFilter,
  ]);

  const stats = useMemo(() => {
    let activeCount = 0;
    let upcomingCount = 0;
    for (const ev of campaignEvents) {
      if (ev.status === 'active') activeCount += 1;
      else if (ev.status === 'upcoming' || ev.status === 'consequence') {
        upcomingCount += 1;
      }
    }
    return {
      total: campaignEvents.length,
      active: activeCount,
      upcoming: upcomingCount,
      session: activeCampaign.currentSessionNumber,
    };
  }, [activeCampaign.currentSessionNumber, campaignEvents]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    categoryFilter !== 'all' ||
    statusFilter !== 'all' ||
    pinnedOnly;

  // --- Campaign Handlers ---

  const handleSelectCampaign = (campaignId: string) => {
    commitStore((prev) => ({ ...prev, activeCampaignId: campaignId }));
  };

  const handleOpenNewCampaign = () => {
    setEditingCampaign(null);
    setCampaignDialogOpen(true);
  };

  const handleOpenEditCampaign = () => {
    setEditingCampaign(activeCampaign);
    setCampaignDialogOpen(true);
  };

  const handleSaveCampaign = (values: CampaignFormValues) => {
    const now = new Date().toISOString();
    if (editingCampaign) {
      commitStore((prev) => ({
        ...prev,
        campaigns: prev.campaigns.map((c) =>
          c.id === editingCampaign.id
            ? { ...c, ...values, updatedAt: now }
            : c
        ),
      }));
      toast.success(copy.toasts.campaignUpdated);
    } else {
      const newCampaign: CampaignRecord = {
        id: `camp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        ...values,
        sessionDates: {},
        createdAt: now,
        updatedAt: now,
      };
      commitStore((prev) => ({
        ...prev,
        activeCampaignId: newCampaign.id,
        campaigns: [newCampaign, ...prev.campaigns],
      }));
      toast.success(copy.toasts.campaignCreated);
    }
  };

  const handleDuplicateCampaign = () => {
    const suffix = lang === 'fr' ? 'copie' : 'copy';
    const result = duplicateCampaignWithEvents(
      store,
      activeCampaign.id,
      suffix
    );
    if (!result) return;
    saveChronicleStore(result.nextStore);
    setStore(result.nextStore);
    toast.success(copy.toasts.campaignDuplicated);
  };

  const handleRequestDeleteCampaign = () => {
    if (store.campaigns.length <= 1) {
      toast.error(copy.toasts.cannotDeleteLastCampaign);
      return;
    }
    setPendingDeleteCampaign(activeCampaign);
  };

  const handleConfirmDeleteCampaign = () => {
    if (!pendingDeleteCampaign) return;
    if (store.campaigns.length <= 1) {
      setPendingDeleteCampaign(null);
      toast.error(copy.toasts.cannotDeleteLastCampaign);
      return;
    }

    const targetId = pendingDeleteCampaign.id;
    commitStore((prev) => {
      const remainingCampaigns = prev.campaigns.filter((c) => c.id !== targetId);
      const nextActive =
        prev.activeCampaignId === targetId
          ? remainingCampaigns[0].id
          : prev.activeCampaignId;
      return {
        ...prev,
        activeCampaignId: nextActive,
        campaigns: remainingCampaigns,
        events: prev.events.filter((ev) => ev.campaignId !== targetId),
      };
    });
    setPendingDeleteCampaign(null);
    toast.success(copy.toasts.campaignDeleted);
  };

  // --- Event Handlers ---

  const handleOpenNewEvent = () => {
    setEditingEvent(null);
    setEventDialogOpen(true);
  };

  const handleOpenEditEvent = (event: ChronicleEvent) => {
    setEditingEvent(event);
    setEventDialogOpen(true);
  };

  const handleUpdateSessionRealDate = (
    sessionNumber: number,
    isoDate: string
  ) => {
    if (sessionNumber <= 0) return;
    const valid = normalizeRealDate(isoDate);
    const key = String(sessionNumber);
    const now = new Date().toISOString();

    commitStore((prev) => ({
      ...prev,
      campaigns: prev.campaigns.map((camp) => {
        if (camp.id !== activeCampaign.id) return camp;
        const nextDates = { ...(camp.sessionDates ?? {}) };
        if (valid) {
          nextDates[key] = valid;
        } else {
          delete nextDates[key];
        }
        return { ...camp, sessionDates: nextDates, updatedAt: now };
      }),
    }));
  };

  const handleSaveEvent = (values: EventFormValues) => {
    const now = new Date().toISOString();
    const { sessionRealDate, ...eventFields } = values;

    const applySessionDateUpdate = (camp: CampaignRecord): CampaignRecord => {
      if (camp.id !== activeCampaign.id || eventFields.sessionNumber <= 0) {
        return camp;
      }
      if (sessionRealDate === undefined) return camp;
      const key = String(eventFields.sessionNumber);
      const valid = normalizeRealDate(sessionRealDate);
      const nextDates = { ...(camp.sessionDates ?? {}) };
      if (valid) {
        nextDates[key] = valid;
      } else {
        delete nextDates[key];
      }
      return { ...camp, sessionDates: nextDates, updatedAt: now };
    };

    if (editingEvent) {
      commitStore((prev) => ({
        ...prev,
        campaigns: prev.campaigns.map(applySessionDateUpdate),
        events: prev.events.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, ...eventFields, updatedAt: now }
            : ev
        ),
      }));
      toast.success(copy.toasts.eventUpdated);
    } else {
      const newEvent: ChronicleEvent = {
        id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        campaignId: activeCampaign.id,
        ...eventFields,
        sortOrderOffset: campaignEvents.length,
        createdAt: now,
        updatedAt: now,
      };
      commitStore((prev) => ({
        ...prev,
        campaigns: prev.campaigns.map(applySessionDateUpdate),
        events: [...prev.events, newEvent],
      }));
      toast.success(copy.toasts.eventCreated);
    }
  };

  const handleDuplicateEvent = (event: ChronicleEvent) => {
    const now = new Date().toISOString();
    const copyLabel = lang === 'fr' ? 'copie' : 'copy';
    const cloned: ChronicleEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${event.title} (${copyLabel})`,
      sortOrderOffset: campaignEvents.length + 1,
      createdAt: now,
      updatedAt: now,
    };
    commitStore((prev) => ({
      ...prev,
      events: [...prev.events, cloned],
    }));
    toast.success(copy.toasts.eventDuplicated);
  };

  const handleTogglePin = (eventId: string) => {
    commitStore((prev) => ({
      ...prev,
      events: prev.events.map((ev) =>
        ev.id === eventId
          ? { ...ev, pinned: !ev.pinned, updatedAt: new Date().toISOString() }
          : ev
      ),
    }));
  };

  const handleCycleStatus = (eventId: string) => {
    commitStore((prev) => ({
      ...prev,
      events: prev.events.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              status: getNextEventStatus(ev.status),
              updatedAt: new Date().toISOString(),
            }
          : ev
      ),
    }));
  };

  const handleConfirmDeleteEvent = () => {
    if (!pendingDeleteEvent) return;
    const targetId = pendingDeleteEvent.id;
    commitStore((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== targetId),
    }));
    setPendingDeleteEvent(null);
    toast.success(copy.toasts.eventDeleted);
  };

  const handleLoadSample = () => {
    const sampleEvents = buildSampleChronicleEvents(activeCampaign.id, lang);
    const sampleDates = buildSampleSessionDates();
    const now = new Date().toISOString();
    commitStore((prev) => ({
      ...prev,
      campaigns: prev.campaigns.map((camp) =>
        camp.id === activeCampaign.id &&
        Object.keys(camp.sessionDates ?? {}).length === 0
          ? { ...camp, sessionDates: sampleDates, updatedAt: now }
          : camp
      ),
      events: [...prev.events, ...sampleEvents],
    }));
    toast.success(copy.toasts.sampleLoaded);
  };

  const handleImportJson = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseChronicleImportJson(text);
      if (!parsed) {
        toast.error(copy.toasts.importError);
        return;
      }

      const now = new Date().toISOString();
      const importedCampaignId = `camp-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 6)}`;
      const importedCampaign: CampaignRecord = {
        id: importedCampaignId,
        name:
          parsed.campaignName?.trim() ||
          file.name.replace(/\.json$/i, '') ||
          'Imported Campaign',
        subtitle: parsed.campaignSubtitle || '',
        region: parsed.campaignRegion || '',
        description: parsed.campaignDescription || '',
        currentSessionNumber: 1,
        sessionDates: parsed.sessionDates ?? {},
        status: 'active',
        createdAt: now,
        updatedAt: now,
      };

      const importedEvents: ChronicleEvent[] = parsed.events.map((raw, idx) => ({
        id: `evt-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        campaignId: importedCampaignId,
        title: typeof raw.title === 'string' && raw.title.trim() ? raw.title : 'Événement',
        summary: typeof raw.summary === 'string' ? raw.summary : '',
        gmSecretNote: typeof raw.gmSecretNote === 'string' ? raw.gmSecretNote : '',
        date: normalizeContinentDate(raw.date),
        sessionNumber:
          typeof raw.sessionNumber === 'number' ? Math.max(0, raw.sessionNumber) : 1,
        category: raw.category ?? 'story',
        status: raw.status ?? 'completed',
        importance: raw.importance ?? 'major',
        location: typeof raw.location === 'string' ? raw.location : '',
        involvedEntities: Array.isArray(raw.involvedEntities)
          ? raw.involvedEntities.filter((e): e is string => typeof e === 'string')
          : [],
        consequences: typeof raw.consequences === 'string' ? raw.consequences : '',
        pinned: Boolean(raw.pinned),
        sortOrderOffset: idx,
        createdAt: now,
        updatedAt: now,
      }));

      commitStore((prev) => ({
        ...prev,
        activeCampaignId: importedCampaignId,
        campaigns: [importedCampaign, ...prev.campaigns],
        events: [...importedEvents, ...prev.events],
      }));
      toast.success(copy.toasts.importedSuccess(importedEvents.length));
    } catch {
      toast.error(copy.toasts.importError);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* Top Bar: Back + Title + Primary Actions */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={onNavigateOverview}
              className="-ml-2 gap-1.5 text-muted-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              <span>{copy.backToOverview}</span>
            </Button>
            <span aria-hidden="true">·</span>
            <span>{copy.moduleTag}</span>
          </div>

          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {copy.title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {copy.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateModule && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onNavigateModule('campaign-calendar')}
              className="gap-1.5"
            >
              <CalendarClock className="size-3.5 text-primary" aria-hidden="true" />
              <span>{lang === 'fr' ? 'Calendrier' : 'Calendar'}</span>
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleOpenNewEvent}
            className="gap-1.5"
          >
            <Plus className="size-4" aria-hidden="true" />
            <span>{copy.toolbar.addEventBtn}</span>
          </Button>
        </div>
      </div>

      {/* Multi-Campaign Selector & Synopsis Strip */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
            <span className="text-xs font-medium text-muted-foreground">
              {copy.campaignBar.activeCampaignLabel}
            </span>

            <Select
              value={activeCampaign.id}
              onValueChange={(val) => {
                if (val) handleSelectCampaign(val);
              }}
            >
              <SelectTrigger className="w-full min-w-[220px] sm:w-[280px]">
                <SelectValue>
                  <span className="truncate">
                    {activeCampaign.name} ({campaignEvents.length})
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {store.campaigns.map((camp) => {
                  const count = store.events.filter(
                    (e) => e.campaignId === camp.id
                  ).length;
                  return (
                    <SelectItem key={camp.id} value={camp.id}>
                      {camp.name} ({count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenNewCampaign}
              className="gap-1.5"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              <span>{copy.campaignBar.newCampaignBtn}</span>
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenEditCampaign}
              className="gap-1.5"
            >
              <Pencil className="size-3.5" aria-hidden="true" />
              <span>{copy.campaignBar.editCampaignBtn}</span>
            </Button>

            <input
              ref={importInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportJson}
              className="sr-only"
              aria-label={copy.campaignBar.importJsonBtn}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label="Campaign actions"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleDuplicateCampaign}>
                  <Copy className="size-4" />
                  <span>{copy.campaignBar.duplicateCampaignBtn}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    downloadChronicleMarkdown(
                      activeCampaign,
                      campaignEvents,
                      lang,
                      true
                    );
                    toast.success(copy.toasts.exportedMd);
                  }}
                >
                  <FileText className="size-4" />
                  <span>{copy.campaignBar.exportMdFullBtn}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    downloadChronicleMarkdown(
                      activeCampaign,
                      campaignEvents,
                      lang,
                      false
                    );
                    toast.success(copy.toasts.exportedMd);
                  }}
                >
                  <BookOpen className="size-4" />
                  <span>{copy.campaignBar.exportMdPlayersBtn}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    downloadChronicleJson(activeCampaign, campaignEvents);
                    toast.success(copy.toasts.exportedJson);
                  }}
                >
                  <Download className="size-4" />
                  <span>{copy.campaignBar.exportJsonBtn}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => importInputRef.current?.click()}
                >
                  <Upload className="size-4" />
                  <span>{copy.campaignBar.importJsonBtn}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleRequestDeleteCampaign}
                >
                  <Trash2 className="size-4" />
                  <span>{copy.campaignBar.deleteCampaignBtn}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Campaign Metadata & Synopsis */}
        <div className="flex flex-col gap-1.5 border-t border-border/70 pt-3">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {activeCampaign.name}
            </span>
            {activeCampaign.subtitle && (
              <>
                <span aria-hidden="true">·</span>
                <span>{activeCampaign.subtitle}</span>
              </>
            )}
            {activeCampaign.region && (
              <>
                <span aria-hidden="true">·</span>
                <span>{activeCampaign.region}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{copy.campaignStatus[activeCampaign.status]}</span>
          </div>
          {activeCampaign.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {activeCampaign.description}
            </p>
          )}
        </div>

        {/* 4-Metric Tabular Strip */}
        <div className="grid grid-cols-2 gap-3 border-t border-border/70 pt-3 sm:grid-cols-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {copy.stats.totalEvents}
            </span>
            <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
              {stats.total}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {copy.stats.activeThreads}
            </span>
            <span className="font-mono text-lg font-semibold text-amber-600 tabular-nums dark:text-amber-400">
              {stats.active}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {copy.stats.upcomingEvents}
            </span>
            <span className="font-mono text-lg font-semibold text-sky-600 tabular-nums dark:text-sky-400">
              {stats.upcoming}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">
              {copy.stats.currentSession}
            </span>
            <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
              #{stats.session}
            </span>
          </div>
        </div>
      </section>

      {/* Filter & View Controls */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={copy.toolbar.searchPlaceholder}
              className="pl-8"
            />
          </div>

          <Select
            value={categoryFilter}
            onValueChange={(val) => {
              if (val) {
                setCategoryFilter(val as 'all' | ChronicleEventCategory);
              }
            }}
          >
            <SelectTrigger className="w-[175px]">
              <SelectValue>
                {categoryFilter === 'all'
                  ? copy.toolbar.allCategories
                  : copy.categories[categoryFilter]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{copy.toolbar.allCategories}</SelectItem>
              {(
                Object.keys(copy.categories) as ChronicleEventCategory[]
              ).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {copy.categories[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(val) => {
              if (val) {
                setStatusFilter(val as 'all' | ChronicleEventStatus);
              }
            }}
          >
            <SelectTrigger className="w-[165px]">
              <SelectValue>
                {statusFilter === 'all'
                  ? copy.toolbar.allStatuses
                  : copy.eventStatus[statusFilter]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{copy.toolbar.allStatuses}</SelectItem>
              {(Object.keys(copy.eventStatus) as ChronicleEventStatus[]).map(
                (st) => (
                  <SelectItem key={st} value={st}>
                    {copy.eventStatus[st]}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            }
            className="gap-1.5"
          >
            <ArrowUpDown className="size-3.5" aria-hidden="true" />
            <span>
              {sortOrder === 'asc'
                ? copy.toolbar.sortAsc
                : copy.toolbar.sortDesc}
            </span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-2.5">
          <Tabs
            value={viewMode}
            onValueChange={(val) => setViewMode(val as ChronicleViewMode)}
          >
            <TabsList>
              <TabsTrigger value="timeline">
                {copy.toolbar.views.timeline}
              </TabsTrigger>
              <TabsTrigger value="sessions">
                {copy.toolbar.views.sessions}
              </TabsTrigger>
              <TabsTrigger value="table">
                {copy.toolbar.views.table}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="chronicle-pinned-only"
                checked={pinnedOnly}
                onCheckedChange={setPinnedOnly}
              />
              <Label
                htmlFor="chronicle-pinned-only"
                className="cursor-pointer text-xs font-normal"
              >
                {copy.toolbar.pinnedOnly}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="chronicle-gm-secrets"
                checked={showGmSecrets}
                onCheckedChange={setShowGmSecrets}
              />
              <Label
                htmlFor="chronicle-gm-secrets"
                className="cursor-pointer text-xs font-normal"
              >
                {copy.toolbar.showGmSecrets}
              </Label>
            </div>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setPinnedOnly(false);
                }}
              >
                {copy.toolbar.resetFiltersBtn}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area: Empty State vs Active View */}
      {campaignEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
          <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-muted/40 text-primary">
            <History className="size-5" aria-hidden="true" />
          </div>
          <div className="flex max-w-md flex-col gap-1">
            <h2 className="text-base font-semibold text-foreground">
              {copy.empty.noEventsTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {copy.empty.noEventsBody}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button type="button" onClick={handleOpenNewEvent} className="gap-1.5">
              <Plus className="size-4" aria-hidden="true" />
              <span>{copy.empty.addFirstBtn}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleLoadSample}
              className="gap-1.5"
            >
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.empty.loadSampleBtn}</span>
            </Button>
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-10 text-center">
          <h2 className="text-base font-semibold text-foreground">
            {copy.empty.noFilterMatchTitle}
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            {copy.empty.noFilterMatchBody}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
              setPinnedOnly(false);
            }}
          >
            {copy.empty.clearFiltersBtn}
          </Button>
        </div>
      ) : viewMode === 'timeline' ? (
        <ChronicleTimelineView
          lang={lang}
          events={filteredEvents}
          sessionDates={activeCampaign.sessionDates ?? {}}
          sortOrder={sortOrder}
          showGmSecrets={showGmSecrets}
          onEdit={handleOpenEditEvent}
          onDuplicate={handleDuplicateEvent}
          onTogglePin={handleTogglePin}
          onCycleStatus={handleCycleStatus}
          onRequestDelete={setPendingDeleteEvent}
        />
      ) : viewMode === 'sessions' ? (
        <ChronicleSessionView
          lang={lang}
          events={filteredEvents}
          sessionDates={activeCampaign.sessionDates ?? {}}
          sortOrder={sortOrder}
          showGmSecrets={showGmSecrets}
          onUpdateSessionRealDate={handleUpdateSessionRealDate}
          onEdit={handleOpenEditEvent}
          onDuplicate={handleDuplicateEvent}
          onTogglePin={handleTogglePin}
          onCycleStatus={handleCycleStatus}
          onRequestDelete={setPendingDeleteEvent}
        />
      ) : (
        <ChronicleTableView
          lang={lang}
          events={filteredEvents}
          sessionDates={activeCampaign.sessionDates ?? {}}
          showGmSecrets={showGmSecrets}
          onEdit={handleOpenEditEvent}
          onTogglePin={handleTogglePin}
          onCycleStatus={handleCycleStatus}
          onRequestDelete={setPendingDeleteEvent}
        />
      )}

      {/* Campaign Create/Edit Dialog */}
      <CampaignEditorDialog
        lang={lang}
        open={campaignDialogOpen}
        editingCampaign={editingCampaign}
        onOpenChange={setCampaignDialogOpen}
        onSubmit={handleSaveCampaign}
      />

      {/* Event Create/Edit Dialog */}
      <EventEditorDialog
        lang={lang}
        open={eventDialogOpen}
        editingEvent={editingEvent}
        defaultSessionNumber={activeCampaign.currentSessionNumber}
        sessionDates={activeCampaign.sessionDates ?? {}}
        onOpenChange={setEventDialogOpen}
        onSubmit={handleSaveEvent}
      />

      {/* Delete Event Confirmation (AlertDialog) */}
      <AlertDialog
        open={pendingDeleteEvent !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteEvent(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{copy.confirmDelete.eventTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeleteEvent
                ? copy.confirmDelete.eventBody(pendingDeleteEvent.title)
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.confirmDelete.cancelBtn}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDeleteEvent}
            >
              {copy.confirmDelete.confirmBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Campaign Confirmation (AlertDialog) */}
      <AlertDialog
        open={pendingDeleteCampaign !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteCampaign(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {copy.confirmDelete.campaignTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDeleteCampaign
                ? copy.confirmDelete.campaignBody(
                    pendingDeleteCampaign.name,
                    store.events.filter(
                      (ev) => ev.campaignId === pendingDeleteCampaign.id
                    ).length
                  )
                : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.confirmDelete.cancelBtn}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDeleteCampaign}
            >
              {copy.confirmDelete.confirmBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
