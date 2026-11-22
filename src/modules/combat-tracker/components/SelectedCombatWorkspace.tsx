import { useState } from 'react';
import { ArrowLeft, BookOpen, ScrollText, Swords } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatHubState,
  CombatLogEntry,
  CombatTrackerState,
  Combatant,
  EncounterStatus,
  ModuleLanguage,
  SavedCombatGroup,
  SavedEncounterSession,
  SavedPartyCharacter,
} from '../types';
import {
  buildCombatantDiffLogs,
  createInitialCombatState,
  createLogEntry,
  formatTurnPrefix,
  generateId,
  rollDie,
  sortCombatantsByInitiative,
  stepCombatTurn,
} from '../utils/combatEngine';
import {
  combatantFromSavedPc,
  resolveGroupToCombatants,
} from '../utils/hubStorage';
import {
  ActiveCombatantPanel,
  type CombatantUpdateLogOption,
} from './ActiveCombatantPanel';
import { AddCombatantDialog } from './AddCombatantDialog';
import { CombatLogPanel } from './CombatLogPanel';
import { CombatResolverDialog } from './CombatResolverDialog';
import { CombatRulesReferencePanel } from './CombatRulesReferencePanel';
import { CombatToolbarBar } from './CombatToolbarBar';
import { InitiativeOrderList } from './InitiativeOrderList';

interface SelectedCombatWorkspaceProps {
  session: SavedEncounterSession;
  hubState: CombatHubState;
  lang: ModuleLanguage;
  onBackToHub: () => void;
  onUpdateSession: (
    sessionId: string,
    updater: (prev: SavedEncounterSession) => SavedEncounterSession
  ) => void;
}

type WorkspaceTab = 'board' | 'log' | 'rules';

const MAX_LOG_ENTRIES = 300;

/**
 * Active combat encounter workspace launched or resumed from the GM Hub.
 * Mirrors SelectedMapWorkspace UX with a Return-to-Hub header bar, status selector,
 * turn-contextualized diff logging, and 3 tactical tabs (Board / Log / Rules).
 */
export function SelectedCombatWorkspace({
  session,
  hubState,
  lang,
  onBackToHub,
  onUpdateSession,
}: SelectedCombatWorkspaceProps) {
  const copy = getCombatTrackerCopy(lang);
  const state = session.state;

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('board');
  const [selectedId, setSelectedId] = useState<string | null>(
    () => state.activeCombatantId ?? state.combatants[0]?.id ?? null
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [resolverDialogOpen, setResolverDialogOpen] = useState(false);

  const activeCombatant =
    state.combatants.find((c) => c.id === state.activeCombatantId) ?? null;

  const selectedCombatant =
    state.combatants.find((c) => c.id === selectedId) ??
    activeCombatant ??
    null;

  const mutateCombatState = (
    updater: (prev: CombatTrackerState) => CombatTrackerState,
    options?: { nextTitle?: string; nextStatus?: EncounterStatus }
  ) => {
    onUpdateSession(session.id, (prevSession) => {
      const nextState = updater(prevSession.state);
      const resolvedTitle =
        options?.nextTitle !== undefined
          ? options.nextTitle
          : nextState.encounterTitle.trim() || prevSession.title;
      return {
        ...prevSession,
        title: resolvedTitle,
        status: options?.nextStatus ?? prevSession.status,
        updatedAt: new Date().toISOString(),
        state: nextState,
      };
    });
  };

  const handleTurnStep = (direction: 'next' | 'prev') => {
    const { nextState, wrappedRound, turnMessages } = stepCombatTurn(
      state,
      direction,
      lang
    );
    mutateCombatState(() => nextState);
    if (nextState.activeCombatantId) {
      setSelectedId(nextState.activeCombatantId);
    }
    if (wrappedRound && direction === 'next') {
      toast.info(copy.toolbar.roundWrappedToast(nextState.round));
    }
    for (const msg of turnMessages) {
      toast.warning(msg);
    }
  };

  const handleRollAllInitiatives = () => {
    let nextFirstLivingId: string | null = null;
    mutateCombatState((prev) => {
      const rerolled = prev.combatants.map((c) => {
        const roll = rollDie(10);
        return {
          ...c,
          initiativeRoll: roll,
          initiative: c.stats.ref + roll,
          tieBreaker: rollDie(10),
        };
      });
      const sorted = sortCombatantsByInitiative(rerolled);
      const firstLiving = sorted.find((c) => !c.isDead) ?? sorted[0] ?? null;
      nextFirstLivingId = firstLiving?.id ?? null;
      return {
        ...prev,
        combatants: sorted,
        // During R0 preparation, no combatant's turn has started yet
        activeCombatantId: prev.round === 0 ? null : (firstLiving?.id ?? null),
        logs: [
          createLogEntry(prev.round, 'system', copy.toolbar.allInitRolledToast),
          ...prev.logs,
        ].slice(0, MAX_LOG_ENTRIES),
      };
    });
    if (nextFirstLivingId) setSelectedId(nextFirstLivingId);
    toast.success(copy.toolbar.allInitRolledToast);
  };

  const handleSortInitiative = () => {
    mutateCombatState((prev) => ({
      ...prev,
      combatants: sortCombatantsByInitiative(prev.combatants),
    }));
  };

  const handleAddCombatants = (
    added: Combatant[],
    summaryLabel: string
  ) => {
    mutateCombatState((prev) => {
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const combined = sortCombatantsByInitiative([...prev.combatants, ...added]);
      const nextActiveId =
        prev.round === 0
          ? null
          : prev.activeCombatantId ??
            combined.find((c) => !c.isDead)?.id ??
            combined[0]?.id ??
            null;
      const prefix = formatTurnPrefix(
        currentActor,
        added[0]?.name ?? summaryLabel,
        lang
      );
      const logMsg = copy.workspace.combatantAddedLog(
        prefix,
        added.length,
        added.length === 1 ? added[0]?.name ?? summaryLabel : summaryLabel
      );
      return {
        ...prev,
        activeCombatantId: nextActiveId,
        combatants: combined,
        logs: [
          createLogEntry(prev.round, 'system', logMsg),
          ...prev.logs,
        ].slice(0, MAX_LOG_ENTRIES),
      };
    });
    if (added[0]) setSelectedId(added[0].id);
  };

  const handleDeployHubPc = (pc: SavedPartyCharacter) => {
    const existing = state.combatants.find((c) => c.hubPcId === pc.id);
    if (existing) {
      setSelectedId(existing.id);
      toast.info(copy.hub.pcAlreadyInCombatNotice(pc.name));
      return;
    }
    const combatant = combatantFromSavedPc(pc);
    handleAddCombatants([combatant], combatant.name);
    toast.success(copy.addDialog.addedToast(combatant.name, 1));
  };

  const handleDeployHubGroup = (group: SavedCombatGroup) => {
    const resolved = resolveGroupToCombatants(
      group,
      hubState.characters,
      lang,
      {
        customNpcs: hubState.customNpcs,
        customMonsters: hubState.customMonsters,
      }
    );
    if (resolved.length === 0) {
      toast.warning(copy.hub.groupEmptyWarning);
      return;
    }
    const existingHubPcIds = new Set(
      state.combatants.map((c) => c.hubPcId).filter(Boolean)
    );
    const skippedNames: string[] = [];
    const filtered = resolved.filter((c) => {
      if (c.hubPcId && existingHubPcIds.has(c.hubPcId)) {
        skippedNames.push(c.name);
        return false;
      }
      return true;
    });
    if (skippedNames.length > 0) {
      toast.info(copy.hub.pcAlreadyInCombatNotice(skippedNames.join(', ')));
    }
    if (filtered.length > 0) {
      handleAddCombatants(filtered, group.name);
      toast.success(copy.hub.groupAddedToast(group.name, filtered.length));
    }
  };

  /**
   * Updates a combatant and records turn-contextualized CombatLogEntry items
   * (e.g. "Pendant le tour de Geralt : Goule #1 perd 5 PS (20 → 15 PS).").
   */
  const handleUpdateCombatant = (
    updated: Combatant,
    logOption?: CombatantUpdateLogOption
  ) => {
    mutateCombatState((prev) => {
      const previous = prev.combatants.find((c) => c.id === updated.id);
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;

      const parsedOpt =
        typeof logOption === 'string'
          ? { message: logOption, type: 'system' as const, skipDiff: false }
          : logOption;

      const generatedLogs: CombatLogEntry[] = [];

      if (parsedOpt?.message) {
        const prefix = formatTurnPrefix(currentActor, updated.name, lang);
        generatedLogs.push(
          createLogEntry(
            prev.round,
            parsedOpt.type ?? 'system',
            `${prefix}${parsedOpt.message}`
          )
        );
      }

      if (previous && !parsedOpt?.skipDiff) {
        generatedLogs.push(
          ...buildCombatantDiffLogs(
            previous,
            updated,
            prev.round,
            currentActor,
            lang
          )
        );
      }

      return {
        ...prev,
        combatants: prev.combatants.map((c) =>
          c.id === updated.id ? updated : c
        ),
        logs: [...generatedLogs, ...prev.logs].slice(0, MAX_LOG_ENTRIES),
      };
    });
  };

  const handleQuickAdjustHp = (id: string, delta: number) => {
    mutateCombatState((prev) => {
      const previous = prev.combatants.find((c) => c.id === id);
      if (!previous) return prev;
      const updated = { ...previous, hp: previous.hp + delta };
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const diffLogs = buildCombatantDiffLogs(
        previous,
        updated,
        prev.round,
        currentActor,
        lang
      );
      return {
        ...prev,
        combatants: prev.combatants.map((c) => (c.id === id ? updated : c)),
        logs: [...diffLogs, ...prev.logs].slice(0, MAX_LOG_ENTRIES),
      };
    });
  };

  const handleToggleDelayed = (id: string) => {
    mutateCombatState((prev) => {
      const previous = prev.combatants.find((c) => c.id === id);
      if (!previous) return prev;
      const updated = { ...previous, delayed: !previous.delayed };
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const diffLogs = buildCombatantDiffLogs(
        previous,
        updated,
        prev.round,
        currentActor,
        lang
      );
      return {
        ...prev,
        combatants: prev.combatants.map((c) => (c.id === id ? updated : c)),
        logs: [...diffLogs, ...prev.logs].slice(0, MAX_LOG_ENTRIES),
      };
    });
  };

  const handleUpdateInitiative = (id: string, nextInitiative: number) => {
    mutateCombatState((prev) => {
      const previous = prev.combatants.find((c) => c.id === id);
      if (!previous || previous.initiative === nextInitiative) return prev;
      const updated: Combatant = {
        ...previous,
        initiative: nextInitiative,
        initiativeRoll: nextInitiative - previous.stats.ref,
      };
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const diffLogs = buildCombatantDiffLogs(
        previous,
        updated,
        prev.round,
        currentActor,
        lang
      );
      const updatedList = sortCombatantsByInitiative(
        prev.combatants.map((c) => (c.id === id ? updated : c))
      );
      return {
        ...prev,
        combatants: updatedList,
        logs: [...diffLogs, ...prev.logs].slice(0, MAX_LOG_ENTRIES),
      };
    });
  };

  const handleDeleteLogEntry = (entryId: string) => {
    mutateCombatState((prev) => ({
      ...prev,
      logs: prev.logs.filter((entry) => entry.id !== entryId),
    }));
  };

  const handleDuplicateCombatant = (id: string) => {
    const source = state.combatants.find((c) => c.id === id);
    if (!source) return;
    const initRoll = rollDie(10);
    const clone: Combatant = {
      ...source,
      id: generateId('cmb'),
      hubPcId: undefined,
      name: `${source.name} (2)`,
      initiativeRoll: initRoll,
      initiative: source.stats.ref + initRoll,
      tieBreaker: rollDie(10),
      conditions: [...source.conditions],
      criticalWounds: [],
      weapons: source.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
      armor: {
        head: { ...source.armor.head },
        torso: { ...source.armor.torso },
        rightArm: { ...source.armor.rightArm },
        leftArm: { ...source.armor.leftArm },
        rightLeg: { ...source.armor.rightLeg },
        leftLeg: { ...source.armor.leftLeg },
      },
    };
    mutateCombatState((prev) => {
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const prefix = formatTurnPrefix(currentActor, clone.name, lang);
      const logMsg = copy.workspace.combatantDuplicatedLog(
        prefix,
        source.name,
        clone.name
      );
      return {
        ...prev,
        combatants: sortCombatantsByInitiative([...prev.combatants, clone]),
        logs: [
          createLogEntry(prev.round, 'system', logMsg),
          ...prev.logs,
        ].slice(0, MAX_LOG_ENTRIES),
      };
    });
    setSelectedId(clone.id);
  };

  const handleRemoveCombatant = (id: string) => {
    mutateCombatState((prev) => {
      const target = prev.combatants.find((c) => c.id === id);
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;
      const remaining = prev.combatants.filter((c) => c.id !== id);
      const nextActive =
        prev.activeCombatantId === id
          ? remaining.find((c) => !c.isDead)?.id ?? remaining[0]?.id ?? null
          : prev.activeCombatantId;
      const extraLogs: CombatLogEntry[] = target
        ? [
            createLogEntry(
              prev.round,
              'system',
              copy.workspace.combatantRemovedLog(
                formatTurnPrefix(currentActor, target.name, lang),
                target.name
              )
            ),
          ]
        : [];
      return {
        ...prev,
        activeCombatantId: nextActive,
        combatants: remaining,
        logs: [...extraLogs, ...prev.logs].slice(0, MAX_LOG_ENTRIES),
      };
    });
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleApplyResolution = (
    updatedTarget: Combatant,
    logMessages: { type: 'damage' | 'critical' | 'fumble'; text: string }[]
  ) => {
    mutateCombatState((prev) => {
      const previous = prev.combatants.find((c) => c.id === updatedTarget.id);
      const currentActor =
        prev.combatants.find((c) => c.id === prev.activeCombatantId)?.name ??
        null;

      const primaryLogs = logMessages.map((m) =>
        createLogEntry(prev.round, m.type, m.text)
      );

      // Add secondary consequences from diff without duplicating HP/critical wound text already in primaryLogs
      const secondaryLogs = previous
        ? buildCombatantDiffLogs(
            { ...previous, hp: updatedTarget.hp },
            updatedTarget,
            prev.round,
            currentActor,
            lang
          ).filter((entry) => entry.type !== 'critical')
        : [];

      // Still log Wound Threshold & Dying transitions explicitly if crossed during resolution
      const thresholdLogs: CombatLogEntry[] = [];
      if (previous && updatedTarget.hp !== previous.hp) {
        const diffCheck = buildCombatantDiffLogs(
          previous,
          {
            ...previous,
            hp: updatedTarget.hp,
          },
          prev.round,
          currentActor,
          lang
        ).filter(
          (entry) => entry.type === 'condition' || entry.type === 'death'
        );
        thresholdLogs.push(...diffCheck);
      }

      return {
        ...prev,
        combatants: prev.combatants.map((c) =>
          c.id === updatedTarget.id ? updatedTarget : c
        ),
        logs: [
          ...primaryLogs,
          ...thresholdLogs,
          ...secondaryLogs,
          ...prev.logs,
        ].slice(0, MAX_LOG_ENTRIES),
      };
    });
    setSelectedId(updatedTarget.id);
  };

  const handleResetCombat = () => {
    mutateCombatState((prev) => ({
      ...createInitialCombatState(),
      encounterTitle: prev.encounterTitle,
      lightLevel: prev.lightLevel,
      useAdrenalineRule: prev.useAdrenalineRule,
    }));
    setSelectedId(null);
    toast.success(copy.toolbar.resetToast);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Workspace Navigation & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onBackToHub}
          >
            <ArrowLeft data-icon="inline-start" />
            <span>{copy.workspace.backToHubBtn}</span>
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-foreground">
              {session.title}
            </span>
            <Badge variant="outline" className="font-mono text-xs">
              {copy.sessions.roundBadge(state.round)}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Label
            htmlFor="workspace-session-status"
            className="text-xs text-muted-foreground"
          >
            {copy.workspace.statusLabel}
          </Label>
          <Select
            value={session.status}
            onValueChange={(val) => {
              if (
                val === 'active' ||
                val === 'paused' ||
                val === 'completed'
              ) {
                mutateCombatState((prev) => prev, { nextStatus: val });
              }
            }}
          >
            <SelectTrigger id="workspace-session-status" className="h-8 w-36 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">
                {copy.sessions.statusLabels.active}
              </SelectItem>
              <SelectItem value="paused">
                {copy.sessions.statusLabels.paused}
              </SelectItem>
              <SelectItem value="completed">
                {copy.sessions.statusLabels.completed}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top Tactical Command Bar */}
      <CombatToolbarBar
        state={state}
        lang={lang}
        onChangeTitle={(encounterTitle) =>
          mutateCombatState(
            (prev) => ({ ...prev, encounterTitle }),
            {
              nextTitle:
                encounterTitle.trim() || copy.workspace.defaultUntitled,
            }
          )
        }
        onChangeLightLevel={(lightLevel) =>
          mutateCombatState((prev) => ({ ...prev, lightLevel }))
        }
        onToggleAdrenaline={(useAdrenalineRule) =>
          mutateCombatState((prev) => ({ ...prev, useAdrenalineRule }))
        }
        onPrevTurn={() => handleTurnStep('prev')}
        onNextTurn={() => handleTurnStep('next')}
        onRollAllInitiatives={handleRollAllInitiatives}
        onSortInitiative={handleSortInitiative}
        onOpenAddDialog={() => setAddDialogOpen(true)}
        onOpenResolverDialog={() => setResolverDialogOpen(true)}
        onResetCombat={handleResetCombat}
      />

      {/* 3-Tab Tactical Workspace */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === 'board' || value === 'log' || value === 'rules') {
            setActiveTab(value);
          }
        }}
        className="w-full gap-5"
      >
        <TabsList className="flex w-full flex-wrap gap-1 p-1 sm:inline-flex sm:w-fit sm:flex-nowrap">
          <TabsTrigger value="board" className="gap-2 px-3 py-1.5">
            <Swords className="size-4" aria-hidden="true" />
            <span>{copy.header.tabs.board}</span>
          </TabsTrigger>
          <TabsTrigger value="log" className="gap-2 px-3 py-1.5">
            <ScrollText className="size-4" aria-hidden="true" />
            <span>
              {copy.header.tabs.log} ({state.logs.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="rules" className="gap-2 px-3 py-1.5">
            <BookOpen className="size-4" aria-hidden="true" />
            <span>{copy.header.tabs.rules}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="board" keepMounted>
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <InitiativeOrderList
                combatants={state.combatants}
                activeCombatantId={state.activeCombatantId}
                selectedCombatantId={selectedCombatant?.id ?? null}
                lang={lang}
                onSelectCombatant={setSelectedId}
                onUpdateInitiative={handleUpdateInitiative}
                onQuickAdjustHp={handleQuickAdjustHp}
                onToggleDelayed={handleToggleDelayed}
                onDuplicateCombatant={handleDuplicateCombatant}
                onRemoveCombatant={handleRemoveCombatant}
                onOpenAddDialog={() => setAddDialogOpen(true)}
              />
            </div>

            <div className="lg:col-span-7">
              <ActiveCombatantPanel
                combatant={selectedCombatant}
                currentRound={state.round}
                useAdrenalineRule={state.useAdrenalineRule}
                lang={lang}
                onUpdateCombatant={handleUpdateCombatant}
                onUpdateInitiative={handleUpdateInitiative}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="log" keepMounted>
          <CombatLogPanel
            logs={state.logs}
            lang={lang}
            encounterTitle={state.encounterTitle}
            round={state.round}
            onClearLogs={() =>
              mutateCombatState((prev) => ({ ...prev, logs: [] }))
            }
            onDeleteLogEntry={handleDeleteLogEntry}
          />
        </TabsContent>

        <TabsContent value="rules" keepMounted>
          <CombatRulesReferencePanel lang={lang} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddCombatantDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        lang={lang}
        hubState={hubState}
        onAddCombatants={handleAddCombatants}
        onDeployHubPc={handleDeployHubPc}
        onDeployHubGroup={(group) => handleDeployHubGroup(group)}
      />

      <CombatResolverDialog
        open={resolverDialogOpen}
        onOpenChange={setResolverDialogOpen}
        combatants={state.combatants}
        defaultAttackerId={
          state.activeCombatantId ?? selectedCombatant?.id ?? null
        }
        activeActorName={activeCombatant?.name ?? null}
        lightLevel={state.lightLevel}
        currentRound={state.round}
        lang={lang}
        onApplyResolution={handleApplyResolution}
      />
    </div>
  );
}
