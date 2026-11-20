import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Skull, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { BestiaryCombatVariant } from '@/src/data/bestiary';
import type { ModuleEntryProps } from '@/src/types/navigation';
import {
  createCombatantFromBestiary,
  createInitialCombatState,
  createLogEntry,
  rollDie,
  sortCombatantsByInitiative,
} from '@/src/modules/combat-tracker/utils/combatEngine';
import {
  createEncounterSession,
  loadCombatSessions,
  saveCombatSessions,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import {
  createSimulationSession,
  loadSimulationSessions,
  saveSimulationSessions,
} from '@/src/modules/combat-simulator/utils/simStorage';
import {
  createDefaultSimSettings,
  simFighterFromBestiary,
} from '@/src/modules/combat-simulator/utils/simulatorEngine';
import { BestiaryTableSection } from './components/BestiaryTableSection';
import { EncounterDetailDialog } from './components/EncounterDetailDialog';
import { EncounterRollerCard } from './components/EncounterRollerCard';
import { ALL_BESTIARY_ENTRIES } from './data';
import { getEncounterManagerCopy } from './i18n';
import type { EncounterEntry, ModuleLanguage } from './types';

type EncounterManagerTab = 'monster' | 'humanoid' | 'bestiary';

function resolveInitialTab(tab?: string): EncounterManagerTab {
  if (tab === 'monster' || tab === 'humanoid' || tab === 'bestiary') {
    return tab;
  }
  return 'monster';
}

/**
 * Isolated entry point for the Random Encounter Manager module.
 * Provides dedicated Monster and Human/Humanoid encounter generator tabs
 * alongside a searchable bestiary & faction reference table.
 */
export default function EncounterManagerModule({
  onNavigateOverview,
  onNavigateModule,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('encounter-manager');
  const moduleCopy = t.modules['encounter-manager'];
  const copy = getEncounterManagerCopy(lang);
  const Icon = definition.icon;

  const [activeTab, setActiveTab] = useState<EncounterManagerTab>(() =>
    resolveInitialTab(launchIntent?.tab)
  );
  const [inspectedEntry, setInspectedEntry] = useState<EncounterEntry | null>(
    () =>
      launchIntent?.entryId
        ? ALL_BESTIARY_ENTRIES.find((e) => e.id === launchIntent.entryId) ??
          null
        : null
  );

  useEffect(() => {
    if (!launchIntent) return;
    if (
      launchIntent.tab === 'monster' ||
      launchIntent.tab === 'humanoid' ||
      launchIntent.tab === 'bestiary'
    ) {
      setActiveTab(launchIntent.tab);
    }
    if (launchIntent.entryId) {
      const matched =
        ALL_BESTIARY_ENTRIES.find((e) => e.id === launchIntent.entryId) ?? null;
      if (matched) {
        setInspectedEntry(matched);
      }
    }
  }, [launchIntent]);

  const handleSendToCombat = (
    entry: EncounterEntry,
    quantity = 1,
    variant?: BestiaryCombatVariant
  ) => {
    const qty = Math.max(1, Math.min(8, Math.round(quantity)));
    const sharedInitRoll = qty > 1 ? rollDie(10) : undefined;
    const baseName = variant
      ? `${entry.name[lang]} (${variant.label[lang]})`
      : entry.name[lang];

    const combatants = Array.from({ length: qty }, (_, idx) =>
      createCombatantFromBestiary(entry, {
        lang,
        variant,
        customName: qty > 1 ? `${baseName} #${idx + 1}` : baseName,
        fixedInitRoll: sharedInitRoll,
      })
    );

    const encounterTitle = qty > 1 ? `${baseName} ×${qty}` : baseName;
    const newSession = createEncounterSession({
      title: encounterTitle,
      status: 'active',
      state: {
        ...createInitialCombatState(),
        round: 0,
        encounterTitle,
        activeCombatantId: null,
        combatants: sortCombatantsByInitiative(combatants),
        logs: [
          createLogEntry(
            0,
            'system',
            copy.dossier.sentToCombatToast(baseName, qty)
          ),
        ],
      },
      lang,
    });

    const existing = loadCombatSessions(lang);
    saveCombatSessions([newSession, ...existing]);
    setInspectedEntry(null);
    toast.success(copy.dossier.sentToCombatToast(baseName, qty));
    onNavigateModule?.('combat-tracker', { sessionId: newSession.id });
  };

  const handleSendToSimulator = (
    entry: EncounterEntry,
    quantity = 1,
    variant?: BestiaryCombatVariant
  ) => {
    const qty = Math.max(1, Math.min(8, Math.round(quantity)));
    const baseName = variant
      ? `${entry.name[lang]} (${variant.label[lang]})`
      : entry.name[lang];

    const fighter = simFighterFromBestiary(entry, {
      team: 'teamB',
      lang,
      variant,
      quantity: qty,
    });

    const title =
      qty > 1 ? `Test · ${baseName} ×${qty}` : `Test · ${baseName}`;
    const newSim = createSimulationSession({
      title,
      teamA: [],
      teamB: [fighter],
      settings: createDefaultSimSettings(),
      lastReport: null,
      lang,
    });

    const existing = loadSimulationSessions(lang);
    saveSimulationSessions([newSim, ...existing]);
    setInspectedEntry(null);
    toast.success(copy.dossier.sentToSimulatorToast(baseName, qty));
    onNavigateModule?.('combat-simulator', { sessionId: newSim.id });
  };

  return (
    <section
      aria-labelledby="module-heading-encounter-manager"
      className="mx-auto flex w-full max-w-6xl flex-col gap-6"
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
                {copy.header.moduleTag}
              </span>
            </div>
            <h1
              id="module-heading-encounter-manager"
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

      {/* Three Direct Workspaces: Random Monster, Random Human/Humanoid, Bestiary */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (
            value === 'monster' ||
            value === 'humanoid' ||
            value === 'bestiary'
          ) {
            setActiveTab(value);
          }
        }}
        className="w-full gap-5"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 p-1 sm:inline-flex sm:w-fit">
          <TabsTrigger value="monster" className="gap-2 px-3 py-1.5">
            <Skull className="size-4" aria-hidden="true" />
            <span>{copy.tabs.monster}</span>
          </TabsTrigger>
          <TabsTrigger value="humanoid" className="gap-2 px-3 py-1.5">
            <Users className="size-4" aria-hidden="true" />
            <span>{copy.tabs.humanoid}</span>
          </TabsTrigger>
          <TabsTrigger value="bestiary" className="gap-2 px-3 py-1.5">
            <BookOpen className="size-4" aria-hidden="true" />
            <span>{copy.tabs.bestiary}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monster" keepMounted>
          <EncounterRollerCard
            kind="monster"
            lang={lang}
            onInspectEntry={setInspectedEntry}
            onSendToCombat={handleSendToCombat}
            onSendToSimulator={handleSendToSimulator}
          />
        </TabsContent>

        <TabsContent value="humanoid" keepMounted>
          <EncounterRollerCard
            kind="humanoid"
            lang={lang}
            onInspectEntry={setInspectedEntry}
            onSendToCombat={handleSendToCombat}
            onSendToSimulator={handleSendToSimulator}
          />
        </TabsContent>

        <TabsContent value="bestiary">
          <BestiaryTableSection
            lang={lang}
            onInspectEntry={setInspectedEntry}
            onSendToCombat={(entry) => handleSendToCombat(entry, 1)}
            onSendToSimulator={(entry) => handleSendToSimulator(entry, 1)}
          />
        </TabsContent>
      </Tabs>

      {/* Shared Encounter Reference Dialog */}
      <EncounterDetailDialog
        entry={inspectedEntry}
        lang={lang}
        onClose={() => setInspectedEntry(null)}
        onSendToCombat={handleSendToCombat}
        onSendToSimulator={handleSendToSimulator}
      />
    </section>
  );
}
