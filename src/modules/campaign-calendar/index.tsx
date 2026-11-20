import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Compass,
  HeartPulse,
  ScrollText,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import {
  CALENDAR_UPDATED_EVENT,
  WEATHER_DEFINITIONS,
  advanceCalendarDays,
  formatContinentDate,
  getDayOfYear,
  getMonthDef,
  loadCalendarState,
  rollWeatherForSeason,
  saveCalendarState,
  syncRecoveryWithHubCharacters,
  type ClimateRegionId,
  type ContinentCalendarState,
  type CraftingProject,
  type RecoveryCareMode,
  type TrackedRecoveryCharacter,
  type WeatherConditionId,
} from '@/src/utils/continentCalendar';
import { CalendarLogPanel } from './components/CalendarLogPanel';
import { CalendarWeatherPanel } from './components/CalendarWeatherPanel';
import { CraftingQueuePanel } from './components/CraftingQueuePanel';
import { RecoveryTrackerPanel } from './components/RecoveryTrackerPanel';
import { getCampaignCalendarCopy } from './i18n';

type CalendarTab = 'calendar' | 'recovery' | 'log';

/**
 * Continent Calendar, Dynamic Weather, Natural Healing & Crafting Downtime module.
 */
export default function CampaignCalendarModule({
  onNavigateOverview,
  onNavigateModule,
  launchIntent,
}: ModuleEntryProps) {
  const { locale } = useI18n();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = getCampaignCalendarCopy(lang);

  const [state, setState] = useState<ContinentCalendarState>(() =>
    loadCalendarState()
  );
  const [activeTab, setActiveTab] = useState<CalendarTab>(() => {
    if (launchIntent?.tab === 'recovery') return 'recovery';
    if (launchIntent?.tab === 'log') return 'log';
    return 'calendar';
  });

  useEffect(() => {
    if (!launchIntent?.tab) return;
    if (launchIntent.tab === 'recovery') setActiveTab('recovery');
    else if (launchIntent.tab === 'log') setActiveTab('log');
    else setActiveTab('calendar');
  }, [launchIntent]);

  // Keep synchronized when Travel Manager or another component updates the calendar
  useEffect(() => {
    const handleExternalUpdate = () => {
      setState(loadCalendarState());
    };
    window.addEventListener(CALENDAR_UPDATED_EVENT, handleExternalUpdate);
    return () =>
      window.removeEventListener(CALENDAR_UPDATED_EVENT, handleExternalUpdate);
  }, []);

  const commitState = (
    updater: (prev: ContinentCalendarState) => ContinentCalendarState
  ) => {
    setState((prev) => {
      const next = updater(prev);
      saveCalendarState(next);
      return next;
    });
  };

  const handleAdvanceDays = (days: number, careMode: RecoveryCareMode) => {
    const result = advanceCalendarDays(state, {
      days,
      source: careMode === 'travel' ? 'travel' : 'manual',
      careModeOverride: careMode,
      rollWeatherEachDay: true,
    });
    saveCalendarState(result.nextState);
    setState(result.nextState);

    const dateLabel = formatContinentDate(result.nextState)[lang];
    toast.success(copy.toasts.advancedSummary(days, dateLabel));

    if (result.healedSummary.length > 0) {
      toast.info(copy.toasts.healedNotice(result.healedSummary.length));
    }
    if (result.completedProjects.length > 0) {
      toast.success(
        copy.toasts.craftedNotice(result.completedProjects.join(', '))
      );
    }
  };

  const handleSelectDay = (dayOfMonth: number) => {
    commitState((prev) => {
      const month = getMonthDef(prev.monthIndex);
      const clampedDay = Math.max(1, Math.min(month.length, dayOfMonth));
      const nextEpoch =
        (prev.year - 1272) * 365 + (getDayOfYear(prev.monthIndex, clampedDay) - 1);
      return {
        ...prev,
        dayOfMonth: clampedDay,
        totalDaysElapsed: Math.max(0, nextEpoch),
      };
    });
    toast.success(copy.dateCard.daySetToast);
  };

  const handleChangeMonth = (monthIndex: number) => {
    commitState((prev) => {
      const month = getMonthDef(monthIndex);
      const clampedDay = Math.min(prev.dayOfMonth, month.length);
      const nextEpoch =
        (prev.year - 1272) * 365 + (getDayOfYear(monthIndex, clampedDay) - 1);
      return {
        ...prev,
        monthIndex,
        dayOfMonth: clampedDay,
        totalDaysElapsed: Math.max(0, nextEpoch),
        weatherId: prev.weatherLocked
          ? prev.weatherId
          : rollWeatherForSeason(prev.regionId, month.season),
      };
    });
  };

  const handleChangeYear = (year: number) => {
    commitState((prev) => {
      const nextEpoch =
        (year - 1272) * 365 + (getDayOfYear(prev.monthIndex, prev.dayOfMonth) - 1);
      return {
        ...prev,
        year,
        totalDaysElapsed: Math.max(0, nextEpoch),
      };
    });
  };

  const handleChangeRegion = (regionId: ClimateRegionId) => {
    commitState((prev) => {
      const month = getMonthDef(prev.monthIndex);
      return {
        ...prev,
        regionId,
        weatherId: prev.weatherLocked
          ? prev.weatherId
          : rollWeatherForSeason(regionId, month.season),
      };
    });
  };

  const handleRerollWeather = () => {
    commitState((prev) => {
      const month = getMonthDef(prev.monthIndex);
      const nextWeather = rollWeatherForSeason(prev.regionId, month.season);
      const dateLabel = formatContinentDate(prev);
      const wName = WEATHER_DEFINITIONS[nextWeather].name;
      return {
        ...prev,
        weatherId: nextWeather,
        logs: [
          {
            id: `cal-w-${Date.now()}`,
            dayEpoch: prev.totalDaysElapsed,
            dateLabel,
            kind: 'weather' as const,
            message: {
              fr: `Tirage météo : ${wName.fr}.`,
              en: `Weather rolled: ${wName.en}.`,
            },
          },
          ...prev.logs,
        ].slice(0, 60),
      };
    });
    toast.success(copy.weatherCard.rerolledToast);
  };

  const handleSetWeather = (weatherId: WeatherConditionId) => {
    commitState((prev) => ({
      ...prev,
      weatherId,
    }));
  };

  const handleToggleWeatherLock = () => {
    commitState((prev) => ({
      ...prev,
      weatherLocked: !prev.weatherLocked,
    }));
  };

  const handleSyncHub = () => {
    const synced = syncRecoveryWithHubCharacters(state.recoveryCharacters);
    if (synced.addedCount === 0) {
      toast.info(copy.recovery.noNewHubToast);
      return;
    }
    commitState((prev) => ({
      ...prev,
      recoveryCharacters: synced.characters,
    }));
    toast.success(copy.recovery.syncedToast(synced.addedCount));
  };

  const handleAddRecoveryChar = (char: Omit<TrackedRecoveryCharacter, 'id'>) => {
    commitState((prev) => ({
      ...prev,
      recoveryCharacters: [
        ...prev.recoveryCharacters,
        {
          ...char,
          id: `rec-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        },
      ],
    }));
  };

  const handleUpdateRecoveryChar = (
    id: string,
    patch: Partial<TrackedRecoveryCharacter>
  ) => {
    commitState((prev) => ({
      ...prev,
      recoveryCharacters: prev.recoveryCharacters.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    }));
  };

  const handleRemoveRecoveryChar = (id: string) => {
    commitState((prev) => ({
      ...prev,
      recoveryCharacters: prev.recoveryCharacters.filter((c) => c.id !== id),
    }));
  };

  const handleAddProject = (project: Omit<CraftingProject, 'id'>) => {
    commitState((prev) => ({
      ...prev,
      craftingProjects: [
        {
          ...project,
          id: `craft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        },
        ...prev.craftingProjects,
      ],
    }));
  };

  const handleUpdateProject = (
    id: string,
    patch: Partial<CraftingProject>
  ) => {
    commitState((prev) => ({
      ...prev,
      craftingProjects: prev.craftingProjects.map((p) =>
        p.id === id ? { ...p, ...patch } : p
      ),
    }));
  };

  const handleRemoveProject = (id: string) => {
    commitState((prev) => ({
      ...prev,
      craftingProjects: prev.craftingProjects.filter((p) => p.id !== id),
    }));
  };

  const handleAddLogNote = (text: string) => {
    commitState((prev) => ({
      ...prev,
      logs: [
        {
          id: `cal-note-${Date.now()}`,
          dayEpoch: prev.totalDaysElapsed,
          dateLabel: formatContinentDate(prev),
          kind: 'note' as const,
          message: { fr: text, en: text },
        },
        ...prev.logs,
      ].slice(0, 60),
    }));
  };

  const handleClearLogs = () => {
    commitState((prev) => ({
      ...prev,
      logs: [],
    }));
  };

  const injuredCount = state.recoveryCharacters.filter(
    (c) => c.currentHp < c.maxHp || c.criticalWoundDaysLeft > 0
  ).length;
  const activeCraftCount = state.craftingProjects.filter(
    (p) => p.active && p.daysCompleted < p.totalDays
  ).length;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] font-medium tracking-wider text-primary uppercase">
            {copy.header.eyebrow}
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {copy.header.title}
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {copy.header.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateModule && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onNavigateModule('travel-manager')}
            >
              <Compass data-icon="inline-start" className="size-3.5" />
              <span>{copy.header.travelShortcutBtn}</span>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onNavigateOverview}
          >
            <ArrowLeft data-icon="inline-start" className="size-3.5" />
            <span>{copy.header.backBtn}</span>
          </Button>
        </div>
      </div>

      {/* Main Module Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as CalendarTab)}
        className="flex flex-col gap-5"
      >
        <TabsList className="w-full max-w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="calendar" className="gap-1.5">
            <CalendarDays className="size-3.5" />
            <span>{copy.tabs.calendarWeather}</span>
          </TabsTrigger>
          <TabsTrigger value="recovery" className="gap-1.5">
            <HeartPulse className="size-3.5" />
            <span>
              {copy.tabs.recoveryCrafting}
              {injuredCount + activeCraftCount > 0
                ? ` (${injuredCount + activeCraftCount})`
                : ''}
            </span>
          </TabsTrigger>
          <TabsTrigger value="log" className="gap-1.5">
            <ScrollText className="size-3.5" />
            <span>
              {copy.tabs.chronology}
              {state.logs.length > 0 ? ` (${state.logs.length})` : ''}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-0">
          <CalendarWeatherPanel
            state={state}
            lang={lang}
            copy={copy}
            onAdvanceDays={handleAdvanceDays}
            onSelectDay={handleSelectDay}
            onChangeMonth={handleChangeMonth}
            onChangeYear={handleChangeYear}
            onChangeRegion={handleChangeRegion}
            onRerollWeather={handleRerollWeather}
            onSetWeather={handleSetWeather}
            onToggleWeatherLock={handleToggleWeatherLock}
          />
        </TabsContent>

        <TabsContent value="recovery" className="mt-0 flex flex-col gap-6">
          <RecoveryTrackerPanel
            characters={state.recoveryCharacters}
            lang={lang}
            copy={copy}
            onSyncHub={handleSyncHub}
            onAddCharacter={handleAddRecoveryChar}
            onUpdateCharacter={handleUpdateRecoveryChar}
            onRemoveCharacter={handleRemoveRecoveryChar}
          />

          <CraftingQueuePanel
            projects={state.craftingProjects}
            lang={lang}
            copy={copy}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onRemoveProject={handleRemoveProject}
          />
        </TabsContent>

        <TabsContent value="log" className="mt-0">
          <CalendarLogPanel
            logs={state.logs}
            lang={lang}
            copy={copy}
            onAddNote={handleAddLogNote}
            onClearLogs={handleClearLogs}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
