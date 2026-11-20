import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Castle, History, Store } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { EnvironmentGeneratorSection } from './components/EnvironmentGeneratorSection';
import { ReferenceGuideCard } from './components/ReferenceGuideCard';
import { SingleBuildingSection } from './components/SingleBuildingSection';
import { UrbanHistorySection } from './components/UrbanHistorySection';
import { getUrbanGeneratorCopy } from './i18n';
import type {
  GeneratedEnvironment,
  GeneratedSingleBuilding,
  ModuleLanguage,
  SavedUrbanBuilding,
  SavedUrbanEnvironment,
  UrbanHistoryState,
} from './types';
import {
  generateUrbanId,
  loadUrbanHistory,
  saveUrbanHistory,
  upsertBuildingHistory,
  upsertEnvironmentHistory,
} from './utils/urbanStorage';

type UrbanGeneratorTab = 'environment' | 'single-building' | 'history';

function resolveInitialTab(tab?: string): UrbanGeneratorTab {
  if (tab === 'environment' || tab === 'single-building' || tab === 'history') {
    return tab;
  }
  return 'environment';
}

/**
 * Isolated entry point for the Urban Environment & Shop Generator module,
 * including localStorage history archival and manual editing workspaces.
 */
export default function UrbanGeneratorModule({
  onNavigateOverview,
  onNavigateModule,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('urban-generator');
  const moduleCopy = t.modules['urban-generator'];
  const copy = getUrbanGeneratorCopy(lang);
  const Icon = definition.icon;

  const [activeTab, setActiveTab] = useState<UrbanGeneratorTab>(() =>
    resolveInitialTab(launchIntent?.tab)
  );
  const [historyState, setHistoryState] = useState<UrbanHistoryState>(() =>
    loadUrbanHistory()
  );
  const [activeEnvId, setActiveEnvId] = useState<string | null>(() =>
    launchIntent?.entryId &&
    historyState.environments.some((e) => e.id === launchIntent.entryId)
      ? launchIntent.entryId
      : null
  );
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null);

  useEffect(() => {
    if (!launchIntent) return;
    if (
      launchIntent.tab === 'environment' ||
      launchIntent.tab === 'single-building' ||
      launchIntent.tab === 'history'
    ) {
      setActiveTab(launchIntent.tab);
    }
    if (
      launchIntent.entryId &&
      historyState.environments.some((e) => e.id === launchIntent.entryId)
    ) {
      setActiveEnvId(launchIntent.entryId);
      setActiveTab('environment');
    }
  }, [historyState.environments, launchIntent]);

  useEffect(() => {
    saveUrbanHistory(historyState);
  }, [historyState]);

  const activeEnvResult = useMemo(() => {
    if (!activeEnvId) return null;
    return (
      historyState.environments.find((entry) => entry.id === activeEnvId)?.data ??
      null
    );
  }, [activeEnvId, historyState.environments]);

  const activeBuildingResult = useMemo(() => {
    if (!activeBuildingId) return null;
    return (
      historyState.buildings.find((entry) => entry.id === activeBuildingId)
        ?.data ?? null
    );
  }, [activeBuildingId, historyState.buildings]);

  const handleSaveNewEnvironment = (generated: GeneratedEnvironment) => {
    const { history, entryId } = upsertEnvironmentHistory(
      historyState,
      null,
      generated
    );
    setHistoryState(history);
    setActiveEnvId(entryId);
  };

  const handleUpdateActiveEnvironment = (updated: GeneratedEnvironment) => {
    const { history, entryId } = upsertEnvironmentHistory(
      historyState,
      activeEnvId,
      updated
    );
    setHistoryState(history);
    setActiveEnvId(entryId);
  };

  const handleSaveNewBuilding = (generated: GeneratedSingleBuilding) => {
    const { history, entryId } = upsertBuildingHistory(
      historyState,
      null,
      generated
    );
    setHistoryState(history);
    setActiveBuildingId(entryId);
  };

  const handleUpdateActiveBuilding = (updated: GeneratedSingleBuilding) => {
    const { history, entryId } = upsertBuildingHistory(
      historyState,
      activeBuildingId,
      updated
    );
    setHistoryState(history);
    setActiveBuildingId(entryId);
  };

  const handleOpenEnvironment = (entry: SavedUrbanEnvironment) => {
    setActiveEnvId(entry.id);
    setActiveTab('environment');
    toast.success(
      copy.history.loadedToast(
        entry.data.settlementName || copy.envForm.defaultSettlementName
      )
    );
  };

  const handleDuplicateEnvironment = (id: string) => {
    const source = historyState.environments.find((entry) => entry.id === id);
    if (!source) return;
    const baseName =
      source.data.settlementName || copy.envForm.defaultSettlementName;
    const copySuffix = lang === 'fr' ? ' (copie)' : ' (copy)';
    const cloned: GeneratedEnvironment = {
      ...source.data,
      settlementName: `${baseName}${copySuffix}`,
      buildings: source.data.buildings.map((b) => ({
        ...b,
        id: generateUrbanId('bld'),
        items: b.items.map((item) => ({ ...item })),
      })),
      generatedAtIso: new Date().toISOString(),
    };
    const { history } = upsertEnvironmentHistory(historyState, null, cloned);
    setHistoryState(history);
    toast.success(copy.history.duplicatedToast);
  };

  const handleDeleteEnvironment = (id: string) => {
    setHistoryState((prev) => ({
      ...prev,
      environments: prev.environments.filter((entry) => entry.id !== id),
    }));
    if (activeEnvId === id) {
      setActiveEnvId(null);
    }
    toast.success(copy.history.deletedToast);
  };

  const handleOpenBuilding = (entry: SavedUrbanBuilding) => {
    setActiveBuildingId(entry.id);
    setActiveTab('single-building');
    const b = entry.data.building;
    const label = b.tavernName
      ? `${b.title[lang]} — "${b.tavernName[lang]}"`
      : b.title[lang];
    toast.success(copy.history.loadedToast(label));
  };

  const handleDuplicateBuilding = (id: string) => {
    const source = historyState.buildings.find((entry) => entry.id === id);
    if (!source) return;
    const copySuffix = lang === 'fr' ? ' (copie)' : ' (copy)';
    const srcBld = source.data.building;
    const cloned: GeneratedSingleBuilding = {
      ...source.data,
      building: {
        ...srcBld,
        id: generateUrbanId('bld'),
        tavernName: srcBld.tavernName
          ? {
              en: `${srcBld.tavernName.en}${copySuffix}`,
              fr: `${srcBld.tavernName.fr}${copySuffix}`,
            }
          : undefined,
        items: srcBld.items.map((item) => ({ ...item })),
      },
      generatedAtIso: new Date().toISOString(),
    };
    const { history } = upsertBuildingHistory(historyState, null, cloned);
    setHistoryState(history);
    toast.success(copy.history.duplicatedToast);
  };

  const handleDeleteBuilding = (id: string) => {
    setHistoryState((prev) => ({
      ...prev,
      buildings: prev.buildings.filter((entry) => entry.id !== id),
    }));
    if (activeBuildingId === id) {
      setActiveBuildingId(null);
    }
    toast.success(copy.history.deletedToast);
  };

  const handleClearAllHistory = () => {
    setHistoryState({ environments: [], buildings: [] });
    setActiveEnvId(null);
    setActiveBuildingId(null);
    toast.success(copy.history.clearedToast);
  };

  const totalHistoryCount =
    historyState.environments.length + historyState.buildings.length;

  return (
    <section
      aria-labelledby="module-heading-urban-generator"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      {/* Category Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:hidden">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t.nav.groups[definition.group]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {copy.header.moduleTag}
              </span>
            </div>
            <h1
              id="module-heading-urban-generator"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {moduleCopy.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {moduleCopy.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="shrink-0 self-start"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator className="print:hidden" />

      {/* Collapsible Settlement & Building Guide */}
      <ReferenceGuideCard lang={lang} />

      {/* Three Generator Workspaces */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (
            value === 'environment' ||
            value === 'single-building' ||
            value === 'history'
          ) {
            setActiveTab(value);
          }
        }}
        className="w-full gap-5"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 md:inline-flex md:w-fit md:flex-wrap print:hidden">
          <TabsTrigger value="environment" className="gap-2 px-3 py-1.5">
            <Castle className="size-4" aria-hidden="true" />
            <span>{copy.tabs.environment}</span>
          </TabsTrigger>
          <TabsTrigger value="single-building" className="gap-2 px-3 py-1.5">
            <Store className="size-4" aria-hidden="true" />
            <span>{copy.tabs.singleBuilding}</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2 px-3 py-1.5">
            <History className="size-4" aria-hidden="true" />
            <span>{copy.tabs.history}</span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              ({totalHistoryCount})
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="environment">
          <EnvironmentGeneratorSection
            lang={lang}
            activeResult={activeEnvResult}
            onSaveNewResult={handleSaveNewEnvironment}
            onUpdateActiveResult={handleUpdateActiveEnvironment}
            onNavigateModule={onNavigateModule}
          />
        </TabsContent>

        <TabsContent value="single-building">
          <SingleBuildingSection
            lang={lang}
            activeResult={activeBuildingResult}
            onSaveNewResult={handleSaveNewBuilding}
            onUpdateActiveResult={handleUpdateActiveBuilding}
          />
        </TabsContent>

        <TabsContent value="history">
          <UrbanHistorySection
            history={historyState}
            lang={lang}
            activeEnvironmentId={activeEnvId}
            activeBuildingId={activeBuildingId}
            onOpenEnvironment={handleOpenEnvironment}
            onDuplicateEnvironment={handleDuplicateEnvironment}
            onDeleteEnvironment={handleDeleteEnvironment}
            onOpenBuilding={handleOpenBuilding}
            onDuplicateBuilding={handleDuplicateBuilding}
            onDeleteBuilding={handleDeleteBuilding}
            onClearAll={handleClearAllHistory}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
