import { useEffect, useState } from 'react';
import { ArrowLeft, Compass, Dices, PackageOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { ModularEncounterSection } from './components/ModularEncounterSection';
import { RandomChestSection } from './components/RandomChestSection';
import { RandomTablesSection } from './components/RandomTablesSection';
import { getRandomTablesCopy } from './i18n';
import type { ModuleLanguage } from './types';

type RandomTablesTab = 'tables' | 'chest' | 'encounter';

function resolveInitialTab(tab?: string): RandomTablesTab {
  if (tab === 'chest' || tab === 'encounter' || tab === 'tables') return tab;
  return 'tables';
}

/**
 * Isolated entry point for the Random Tables, Random Chest, and Modular Encounter module.
 */
export default function RandomTablesModule({
  onNavigateOverview,
  onNavigateModule,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('random-tables');
  const moduleCopy = t.modules['random-tables'];
  const copy = getRandomTablesCopy(lang);
  const Icon = definition.icon;

  const [activeTab, setActiveTab] = useState<RandomTablesTab>(() =>
    resolveInitialTab(launchIntent?.tab)
  );

  useEffect(() => {
    if (!launchIntent?.tab) return;
    if (
      launchIntent.tab === 'tables' ||
      launchIntent.tab === 'chest' ||
      launchIntent.tab === 'encounter'
    ) {
      setActiveTab(launchIntent.tab);
    }
  }, [launchIntent]);

  return (
    <section
      aria-labelledby="module-heading-random-tables"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      {/* Category Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t.nav.groups[definition.group]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {copy.header.tablesCountLabel}
              </span>
            </div>
            <h1
              id="module-heading-random-tables"
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

      <Separator />

      {/* Three Integrated Tools */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === 'tables' || value === 'chest' || value === 'encounter') {
            setActiveTab(value);
          }
        }}
        className="w-full gap-5"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 sm:inline-flex sm:w-fit">
          <TabsTrigger value="tables" className="gap-2 px-3 py-1.5">
            <Dices className="size-4" aria-hidden="true" />
            <span>{copy.tabs.tables}</span>
          </TabsTrigger>
          <TabsTrigger value="chest" className="gap-2 px-3 py-1.5">
            <PackageOpen className="size-4" aria-hidden="true" />
            <span>{copy.tabs.chest}</span>
          </TabsTrigger>
          <TabsTrigger value="encounter" className="gap-2 px-3 py-1.5">
            <Compass className="size-4" aria-hidden="true" />
            <span>{copy.tabs.encounter}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tables">
          <RandomTablesSection lang={lang} />
        </TabsContent>

        <TabsContent value="chest">
          <RandomChestSection lang={lang} onNavigateModule={onNavigateModule} />
        </TabsContent>

        <TabsContent value="encounter">
          <ModularEncounterSection lang={lang} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
