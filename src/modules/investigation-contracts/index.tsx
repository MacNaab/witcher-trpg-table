import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Compass, ScrollText } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { InvestigationRulesSection } from './components/InvestigationRulesSection';
import { MysteryTrackerSection } from './components/MysteryTrackerSection';
import { NoticeBoardSection } from './components/NoticeBoardSection';
import { getInvestigationCopy } from './i18n';
import type { InvestigationStoreState, WitcherContractEntry } from './types';
import {
  createMysteryFromContract,
  loadInvestigationStore,
  saveInvestigationStore,
} from './utils/investigationStorage';

type InvestigationTab = 'tracker' | 'contracts' | 'rules';

/**
 * Investigation / Mystery Tracker & Official Witcher Contract Board module
 * implementing "Le Journal du Sorcelleur" (17_investigation.md & 18_contrats.md).
 */
export default function InvestigationContractsModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = useMemo(() => getInvestigationCopy(lang), [lang]);

  const [activeTab, setActiveTab] = useState<InvestigationTab>('tracker');
  const [store, setStore] = useState<InvestigationStoreState>(() =>
    loadInvestigationStore(lang)
  );

  useEffect(() => {
    if (!launchIntent?.tab) return;
    if (
      launchIntent.tab === 'tracker' ||
      launchIntent.tab === 'contracts' ||
      launchIntent.tab === 'rules'
    ) {
      setActiveTab(launchIntent.tab);
    }
  }, [launchIntent]);

  const updateStore = (
    updater: (prev: InvestigationStoreState) => InvestigationStoreState
  ) => {
    setStore((prev) => {
      const next = updater(prev);
      saveInvestigationStore(next);
      return next;
    });
  };

  const handleLaunchContractMystery = (contract: WitcherContractEntry) => {
    const newMystery = createMysteryFromContract(contract, lang);
    updateStore((prev) => ({
      ...prev,
      activeMysteryId: newMystery.id,
      mysteries: [newMystery, ...prev.mysteries],
    }));
    setActiveTab('tracker');
    toast.success(copy.contracts.launchedMysteryToast(newMystery.title));
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-medium tracking-wide text-primary">
            {copy.headerEyebrow}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {copy.headerTitle}
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {copy.headerSubtitle}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="w-fit shrink-0 whitespace-nowrap"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator />

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as InvestigationTab)}
        className="flex flex-col gap-5"
      >
        <TabsList className="w-full max-w-full justify-start overflow-x-auto sm:w-max">
          <TabsTrigger value="tracker" className="gap-1.5 whitespace-nowrap">
            <Compass className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.tracker}</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-1.5 whitespace-nowrap">
            <ScrollText className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.contracts}</span>
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-1.5 whitespace-nowrap">
            <BookOpen className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.rules}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="mt-0">
          <MysteryTrackerSection
            store={store}
            onUpdateStore={updateStore}
            locale={lang}
            copy={copy}
          />
        </TabsContent>

        <TabsContent value="contracts" className="mt-0">
          <NoticeBoardSection
            locale={lang}
            copy={copy.contracts}
            onLaunchContractMystery={handleLaunchContractMystery}
          />
        </TabsContent>

        <TabsContent value="rules" className="mt-0">
          <InvestigationRulesSection locale={lang} copy={copy.rules} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
