import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { DemonTrueNameSection } from './components/DemonTrueNameSection';
import { GoetiaCodexSection } from './components/GoetiaCodexSection';
import { LeyLinesSection } from './components/LeyLinesSection';
import { getChaosLeyGoetiaCopy } from './i18n';
import type { GoetiaStoreState } from './types';
import { loadGoetiaStore, saveGoetiaStore } from './utils/goetiaStorage';

type ChaosTab = 'ley' | 'truename' | 'goetia';

/**
 * Ley Lines, Demon True Name Generator & Goetia reference/workspace module
 * implementing "A Tome of Chaos" (02_compiling.md & 09_goetia.md).
 */
export default function ChaosLeyGoetiaModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = useMemo(() => getChaosLeyGoetiaCopy(lang), [lang]);

  const [activeTab, setActiveTab] = useState<ChaosTab>('ley');
  const [store, setStore] = useState<GoetiaStoreState>(() => loadGoetiaStore());

  useEffect(() => {
    if (!launchIntent?.tab) return;
    if (
      launchIntent.tab === 'ley' ||
      launchIntent.tab === 'truename' ||
      launchIntent.tab === 'goetia'
    ) {
      setActiveTab(launchIntent.tab);
    }
  }, [launchIntent]);

  const updateStore = (
    updater: (prev: GoetiaStoreState) => GoetiaStoreState
  ) => {
    setStore((prev) => {
      const next = updater(prev);
      saveGoetiaStore(next);
      return next;
    });
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
        onValueChange={(v) => setActiveTab(v as ChaosTab)}
        className="flex flex-col gap-5"
      >
        <TabsList className="w-full max-w-full justify-start overflow-x-auto sm:w-max">
          <TabsTrigger value="ley" className="gap-1.5 whitespace-nowrap">
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.leyLines}</span>
          </TabsTrigger>
          <TabsTrigger value="truename" className="gap-1.5 whitespace-nowrap">
            <Flame className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.trueName}</span>
          </TabsTrigger>
          <TabsTrigger value="goetia" className="gap-1.5 whitespace-nowrap">
            <BookOpen className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.goetiaCodex}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ley" className="mt-0">
          <LeyLinesSection locale={lang} copy={copy.ley} />
        </TabsContent>

        <TabsContent value="truename" className="mt-0">
          <DemonTrueNameSection
            store={store}
            onUpdateStore={updateStore}
            locale={lang}
            copy={copy.trueName}
          />
        </TabsContent>

        <TabsContent value="goetia" className="mt-0">
          <GoetiaCodexSection locale={lang} copy={copy.codex} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
