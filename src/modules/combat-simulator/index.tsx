import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { ARCHETYPE_PRESETS } from '@/src/modules/combat-tracker/data/combatRulesData';
import type {
  CombatHubState,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import { generateId } from '@/src/modules/combat-tracker/utils/combatEngine';
import {
  loadCombatHubState,
  saveCombatHubState,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import { AddSimFighterDialog } from './components/AddSimFighterDialog';
import { EditSimFighterDialog } from './components/EditSimFighterDialog';
import { SimHubPanel } from './components/SimHubPanel';
import { SimulationReportView } from './components/SimulationReportView';
import { TeamRosterCard } from './components/TeamRosterCard';
import { getCombatSimulatorCopy } from './i18n';
import type {
  LightingConditionId,
  ModuleLanguage,
  SavedSimulationSession,
  SimFighterConfig,
  SimulationSettings,
  TargetPriority,
  TeamSide,
} from './types';
import {
  createSimulationSession,
  loadSimulationSessions,
  saveSimulationSessions,
} from './utils/simStorage';
import {
  createDefaultSimSettings,
  createScenarioPreset,
  runCombatSimulationBatch,
  simFighterFromCustomMonster,
  simFighterFromCustomNpc,
  simFighterFromHubPc,
  simFightersFromHubGroup,
} from './utils/simulatorEngine';

const ITERATION_OPTIONS = [100, 250, 500, 1000, 2000] as const;
const LIGHTING_OPTIONS: readonly LightingConditionId[] = [
  'daylight',
  'dim',
  'darkness',
  'bright',
];

/**
 * Hub-first entry point for the Witcher TRPG Combat Simulator:
 * - Default view (`selectedSessionId === null`): Simulation Hub showing dedicated
 *   Simulation History + Shared GM Hub (PCs, Groups, Profession-based NPCs, Custom Monsters).
 * - Selected view (`selectedSessionId !== null`): Interactive Monte-Carlo Simulation Workspace.
 */
export default function CombatSimulatorModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('combat-simulator');
  const moduleCopy = t.modules['combat-simulator'];
  const copy = getCombatSimulatorCopy(lang);
  const Icon = definition.icon;

  const [hubState, setHubState] = useState<CombatHubState>(() =>
    loadCombatHubState()
  );
  const [sessions, setSessions] = useState<SavedSimulationSession[]>(() =>
    loadSimulationSessions(lang)
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    () => launchIntent?.sessionId ?? null
  );

  const [addTargetTeam, setAddTargetTeam] = useState<TeamSide | null>(null);
  const [editingFighter, setEditingFighter] = useState<SimFighterConfig | null>(
    null
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!launchIntent) return;
    if (launchIntent.sessionId) {
      setSessions(loadSimulationSessions(lang));
      setSelectedSessionId(launchIntent.sessionId);
    } else if (launchIntent.tab === 'hub') {
      setHubState(loadCombatHubState());
      setSelectedSessionId(null);
    }
  }, [launchIntent, lang]);

  useEffect(() => {
    saveCombatHubState(hubState);
  }, [hubState]);

  useEffect(() => {
    saveSimulationSessions(sessions);
  }, [sessions]);

  const selectedSession = useMemo(
    () =>
      selectedSessionId
        ? (sessions.find((s) => s.id === selectedSessionId) ?? null)
        : null,
    [selectedSessionId, sessions]
  );

  // --- Shared GM Hub CRUD (synchronized with Combat Tracker) ---
  const handleSavePc = (pc: SavedPartyCharacter) => {
    setHubState((prev) => {
      const exists = prev.characters.some((c) => c.id === pc.id);
      return {
        ...prev,
        characters: exists
          ? prev.characters.map((c) => (c.id === pc.id ? pc : c))
          : [pc, ...prev.characters],
      };
    });
  };

  const handleDeletePc = (pcId: string) => {
    setHubState((prev) => ({
      ...prev,
      characters: prev.characters.filter((c) => c.id !== pcId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'saved-pc' && m.pcId === pcId)
        ),
      })),
    }));
  };

  const handleSaveGroup = (group: SavedCombatGroup) => {
    setHubState((prev) => {
      const exists = prev.groups.some((g) => g.id === group.id);
      return {
        ...prev,
        groups: exists
          ? prev.groups.map((g) => (g.id === group.id ? group : g))
          : [group, ...prev.groups],
      };
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setHubState((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== groupId),
    }));
  };

  const handleSaveNpc = (npc: SavedCustomNpc) => {
    setHubState((prev) => {
      const exists = prev.customNpcs.some((n) => n.id === npc.id);
      return {
        ...prev,
        customNpcs: exists
          ? prev.customNpcs.map((n) => (n.id === npc.id ? npc : n))
          : [npc, ...prev.customNpcs],
      };
    });
  };

  const handleDeleteNpc = (npcId: string) => {
    setHubState((prev) => ({
      ...prev,
      customNpcs: prev.customNpcs.filter((n) => n.id !== npcId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'custom-npc' && m.npcId === npcId)
        ),
      })),
    }));
  };

  const handleSaveMonster = (monster: SavedCustomMonster) => {
    setHubState((prev) => {
      const exists = prev.customMonsters.some((m) => m.id === monster.id);
      return {
        ...prev,
        customMonsters: exists
          ? prev.customMonsters.map((m) => (m.id === monster.id ? monster : m))
          : [monster, ...prev.customMonsters],
      };
    });
  };

  const handleDeleteMonster = (monsterId: string) => {
    setHubState((prev) => ({
      ...prev,
      customMonsters: prev.customMonsters.filter((m) => m.id !== monsterId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'custom-monster' && m.monsterId === monsterId)
        ),
      })),
    }));
  };

  // --- Simulation Session Lifecycle ---
  const handleCreateEmptySimulation = () => {
    const created = createSimulationSession({
      title: lang === 'fr' ? 'Nouvelle simulation' : 'New Simulation',
      teamA: [],
      teamB: [],
      settings: createDefaultSimSettings(),
      lastReport: null,
      lang,
    });
    setSessions((prev) => [created, ...prev]);
    setSelectedSessionId(created.id);
  };

  const handleLaunchPresetSimulation = (
    presetId: 'witcherVsGhouls' | 'partyVsGriffin' | 'patrolVsBandits'
  ) => {
    const preset = createScenarioPreset(presetId, ARCHETYPE_PRESETS, lang);
    const created = createSimulationSession({
      title: copy.presets[presetId],
      teamA: preset.teamA,
      teamB: preset.teamB,
      settings: createDefaultSimSettings(),
      lang,
    });
    setSessions((prev) => [created, ...prev]);
    setSelectedSessionId(created.id);
  };

  const handleSimulateGroup = (group: SavedCombatGroup, team: TeamSide) => {
    const fighters = simFightersFromHubGroup(
      group,
      hubState.characters,
      team,
      lang,
      {
        customNpcs: hubState.customNpcs,
        customMonsters: hubState.customMonsters,
      }
    );
    if (fighters.length === 0) {
      toast.warning(
        lang === 'fr'
          ? 'Ce groupe ne contient aucun membre valide.'
          : 'This group has no valid members.'
      );
      return;
    }
    const created = createSimulationSession({
      title: `${lang === 'fr' ? 'Test' : 'Test'} · ${group.name}`,
      teamA: team === 'teamA' ? fighters : [],
      teamB: team === 'teamB' ? fighters : [],
      settings: createDefaultSimSettings(),
      lastReport: null,
      lang,
    });
    setSessions((prev) => [created, ...prev]);
    setSelectedSessionId(created.id);
  };

  const handleSimulateSingleFighter = (fighter: SimFighterConfig, title: string) => {
    const created = createSimulationSession({
      title: `${lang === 'fr' ? 'Test' : 'Test'} · ${title}`,
      teamA: fighter.team === 'teamA' ? [fighter] : [],
      teamB: fighter.team === 'teamB' ? [fighter] : [],
      settings: createDefaultSimSettings(),
      lastReport: null,
      lang,
    });
    setSessions((prev) => [created, ...prev]);
    setSelectedSessionId(created.id);
  };

  const handleDuplicateSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (!target) return;
    const now = new Date().toISOString();
    const clone: SavedSimulationSession = {
      ...target,
      id: generateId('sim'),
      title: `${target.title} (2)`,
      createdAt: now,
      updatedAt: now,
      teamA: target.teamA.map((f) => ({ ...f, weapon: { ...f.weapon } })),
      teamB: target.teamB.map((f) => ({ ...f, weapon: { ...f.weapon } })),
      settings: { ...target.settings },
      lastReport: target.lastReport ? { ...target.lastReport } : null,
    };
    setSessions((prev) => [clone, ...prev]);
    toast.success(
      lang === 'fr'
        ? `Simulation dupliquée : « ${clone.title} ».`
        : `Duplicated simulation: “${clone.title}”.`
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (selectedSessionId === sessionId) {
      setSelectedSessionId(null);
    }
  };

  // --- Active Simulation Workspace Mutations ---
  const mutateActiveSession = (
    nextTeamA: SimFighterConfig[],
    nextTeamB: SimFighterConfig[],
    nextSettings: SimulationSettings,
    nextTitle?: string
  ) => {
    if (!selectedSession) return;
    const nextReport =
      nextTeamA.length > 0 && nextTeamB.length > 0
        ? runCombatSimulationBatch(nextTeamA, nextTeamB, nextSettings, lang)
        : null;
    const now = new Date().toISOString();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === selectedSession.id
          ? {
              ...s,
              title: nextTitle ?? s.title,
              teamA: nextTeamA,
              teamB: nextTeamB,
              settings: nextSettings,
              lastReport: nextReport,
              updatedAt: now,
            }
          : s
      )
    );
  };

  const handleLoadPresetIntoActive = (
    presetId: 'witcherVsGhouls' | 'partyVsGriffin' | 'patrolVsBandits'
  ) => {
    if (!selectedSession) return;
    const preset = createScenarioPreset(presetId, ARCHETYPE_PRESETS, lang);
    mutateActiveSession(
      preset.teamA,
      preset.teamB,
      selectedSession.settings,
      copy.presets[presetId]
    );
  };

  const handleClearActiveRosters = () => {
    if (!selectedSession) return;
    mutateActiveSession([], [], selectedSession.settings);
  };

  const handleAddFighters = (added: SimFighterConfig[]) => {
    if (!selectedSession || added.length === 0) return;
    const target = added[0].team;
    if (target === 'teamA') {
      mutateActiveSession(
        [...selectedSession.teamA, ...added],
        selectedSession.teamB,
        selectedSession.settings
      );
    } else {
      mutateActiveSession(
        selectedSession.teamA,
        [...selectedSession.teamB, ...added],
        selectedSession.settings
      );
    }
  };

  const handleUpdateQuantity = (team: TeamSide, id: string, delta: number) => {
    if (!selectedSession) return;
    if (team === 'teamA') {
      const nextA = selectedSession.teamA.map((f) =>
        f.id === id
          ? { ...f, quantity: Math.max(1, Math.min(20, f.quantity + delta)) }
          : f
      );
      mutateActiveSession(nextA, selectedSession.teamB, selectedSession.settings);
    } else {
      const nextB = selectedSession.teamB.map((f) =>
        f.id === id
          ? { ...f, quantity: Math.max(1, Math.min(20, f.quantity + delta)) }
          : f
      );
      mutateActiveSession(selectedSession.teamA, nextB, selectedSession.settings);
    }
  };

  const handleDuplicateFighter = (team: TeamSide, id: string) => {
    if (!selectedSession) return;
    if (team === 'teamA') {
      const src = selectedSession.teamA.find((f) => f.id === id);
      if (!src) return;
      const clone: SimFighterConfig = {
        ...src,
        id: generateId('simf'),
        weapon: { ...src.weapon },
      };
      mutateActiveSession(
        [...selectedSession.teamA, clone],
        selectedSession.teamB,
        selectedSession.settings
      );
    } else {
      const src = selectedSession.teamB.find((f) => f.id === id);
      if (!src) return;
      const clone: SimFighterConfig = {
        ...src,
        id: generateId('simf'),
        weapon: { ...src.weapon },
      };
      mutateActiveSession(
        selectedSession.teamA,
        [...selectedSession.teamB, clone],
        selectedSession.settings
      );
    }
  };

  const handleSwapTeam = (fromTeam: TeamSide, id: string) => {
    if (!selectedSession) return;
    if (fromTeam === 'teamA') {
      const item = selectedSession.teamA.find((f) => f.id === id);
      if (!item) return;
      mutateActiveSession(
        selectedSession.teamA.filter((f) => f.id !== id),
        [...selectedSession.teamB, { ...item, team: 'teamB' as const }],
        selectedSession.settings
      );
    } else {
      const item = selectedSession.teamB.find((f) => f.id === id);
      if (!item) return;
      mutateActiveSession(
        [...selectedSession.teamA, { ...item, team: 'teamA' as const }],
        selectedSession.teamB.filter((f) => f.id !== id),
        selectedSession.settings
      );
    }
  };

  const handleRemoveFighter = (team: TeamSide, id: string) => {
    if (!selectedSession) return;
    if (team === 'teamA') {
      mutateActiveSession(
        selectedSession.teamA.filter((f) => f.id !== id),
        selectedSession.teamB,
        selectedSession.settings
      );
    } else {
      mutateActiveSession(
        selectedSession.teamA,
        selectedSession.teamB.filter((f) => f.id !== id),
        selectedSession.settings
      );
    }
  };

  const handleSaveEditedFighter = (updated: SimFighterConfig) => {
    if (!selectedSession) return;
    if (updated.team === 'teamA') {
      mutateActiveSession(
        selectedSession.teamA.map((f) => (f.id === updated.id ? updated : f)),
        selectedSession.teamB,
        selectedSession.settings
      );
    } else {
      mutateActiveSession(
        selectedSession.teamA,
        selectedSession.teamB.map((f) => (f.id === updated.id ? updated : f)),
        selectedSession.settings
      );
    }
  };

  const updateSettings = (patch: Partial<SimulationSettings>) => {
    if (!selectedSession) return;
    mutateActiveSession(selectedSession.teamA, selectedSession.teamB, {
      ...selectedSession.settings,
      ...patch,
    });
  };

  const handleChangePriority = (team: TeamSide, priority: TargetPriority) => {
    if (team === 'teamA') {
      updateSettings({ targetPriorityA: priority });
    } else {
      updateSettings({ targetPriorityB: priority });
    }
  };

  const handleRenameSession = (title: string) => {
    if (!selectedSession) return;
    const now = new Date().toISOString();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === selectedSession.id ? { ...s, title, updatedAt: now } : s
      )
    );
  };

  return (
    <section
      aria-labelledby="module-heading-combat-simulator"
      className="mx-auto flex w-full max-w-6xl flex-col gap-6"
    >
      {/* Module Header */}
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
              id="module-heading-combat-simulator"
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

      {!selectedSession ? (
        <SimHubPanel
          hubState={hubState}
          sessions={sessions}
          lang={lang}
          onSavePc={handleSavePc}
          onDeletePc={handleDeletePc}
          onSaveGroup={handleSaveGroup}
          onDeleteGroup={handleDeleteGroup}
          onSaveNpc={handleSaveNpc}
          onDeleteNpc={handleDeleteNpc}
          onSaveMonster={handleSaveMonster}
          onDeleteMonster={handleDeleteMonster}
          onCreateEmptySimulation={handleCreateEmptySimulation}
          onLaunchPresetSimulation={handleLaunchPresetSimulation}
          onSimulateGroup={handleSimulateGroup}
          onSimulatePc={(pc, team) =>
            handleSimulateSingleFighter(simFighterFromHubPc(pc, team), pc.name)
          }
          onSimulateNpc={(npc, team) =>
            handleSimulateSingleFighter(simFighterFromCustomNpc(npc, team), npc.name)
          }
          onSimulateMonster={(mon, team) =>
            handleSimulateSingleFighter(
              simFighterFromCustomMonster(mon, team),
              mon.name
            )
          }
          onOpenSession={(id) => setSelectedSessionId(id)}
          onDuplicateSession={handleDuplicateSession}
          onDeleteSession={handleDeleteSession}
        />
      ) : (
        <>
          {/* Workspace Top Bar: Back to Hub + Title */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedSessionId(null)}
                className="shrink-0"
              >
                <ArrowLeft data-icon="inline-start" />
                <span>
                  {lang === 'fr' ? 'Retour au Hub' : 'Back to Hub'}
                </span>
              </Button>
              <Input
                value={selectedSession.title}
                onChange={(e) => handleRenameSession(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? 'Titre de la simulation…'
                    : 'Simulation title…'
                }
                className="min-w-44 flex-1 font-medium sm:max-w-sm"
              />
            </div>
          </div>

          {/* Control Bar: Quick Scenarios & Monte-Carlo Runner */}
          <section className="flex flex-col gap-3 rounded-lg border border-border bg-card/70 p-3.5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs font-medium text-muted-foreground">
                {copy.header.presetsLabel} :
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleLoadPresetIntoActive('witcherVsGhouls')}
              >
                {copy.presets.witcherVsGhouls}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleLoadPresetIntoActive('partyVsGriffin')}
              >
                {copy.presets.partyVsGriffin}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleLoadPresetIntoActive('patrolVsBandits')}
              >
                {copy.presets.patrolVsBandits}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearActiveRosters}
                disabled={
                  selectedSession.teamA.length === 0 &&
                  selectedSession.teamB.length === 0
                }
                className="text-muted-foreground"
              >
                <RotateCcw data-icon="inline-start" />
                <span>{copy.presets.clearAll}</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3 lg:border-t-0 lg:pt-0">
              <div className="flex items-center gap-1.5">
                <Label
                  htmlFor="sim-iterations-select"
                  className="text-xs text-muted-foreground"
                >
                  {copy.controls.iterationsLabel}
                </Label>
                <Select
                  value={String(selectedSession.settings.iterations)}
                  onValueChange={(v) => {
                    if (v)
                      updateSettings({ iterations: Number.parseInt(v, 10) });
                  }}
                >
                  <SelectTrigger
                    id="sim-iterations-select"
                    className="h-8 w-24 font-mono text-xs tabular-nums"
                  >
                    <SelectValue>{selectedSession.settings.iterations}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="end">
                    {ITERATION_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={String(opt)}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger
                  render={
                    <Button type="button" variant="outline" size="sm">
                      <SlidersHorizontal data-icon="inline-start" />
                      <span>{copy.controls.settingsBtn}</span>
                    </Button>
                  }
                />
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{copy.controls.settingsTitle}</DialogTitle>
                    <DialogDescription>
                      {copy.controls.settingsDesc}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 py-2">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label>{copy.controls.lightingLabel}</Label>
                        <Select
                          value={selectedSession.settings.lightLevel}
                          onValueChange={(v) => {
                            if (v) {
                              updateSettings({
                                lightLevel: v as LightingConditionId,
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue>
                              {copy.lighting[selectedSession.settings.lightLevel]}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {LIGHTING_OPTIONS.map((id) => (
                              <SelectItem key={id} value={id}>
                                {copy.lighting[id]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="sim-max-rounds">
                          {copy.controls.maxRoundsLabel}
                        </Label>
                        <Input
                          id="sim-max-rounds"
                          type="number"
                          min={5}
                          max={60}
                          value={selectedSession.settings.maxRounds}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value, 10);
                            if (!Number.isNaN(val)) {
                              updateSettings({
                                maxRounds: Math.max(5, Math.min(60, val)),
                              });
                            }
                          }}
                          className="font-mono tabular-nums"
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2.5">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {copy.controls.rulesHeading}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-crit"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleCritWounds}
                        </Label>
                        <Switch
                          id="rule-crit"
                          checked={selectedSession.settings.enableCritWounds}
                          onCheckedChange={(checked) =>
                            updateSettings({ enableCritWounds: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-fumble"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleFumbles}
                        </Label>
                        <Switch
                          id="rule-fumble"
                          checked={selectedSession.settings.enableFumbles}
                          onCheckedChange={(checked) =>
                            updateSettings({ enableFumbles: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-threshold"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleWoundThreshold}
                        </Label>
                        <Switch
                          id="rule-threshold"
                          checked={selectedSession.settings.enableWoundThreshold}
                          onCheckedChange={(checked) =>
                            updateSettings({ enableWoundThreshold: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-flanking"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleFlanking}
                        </Label>
                        <Switch
                          id="rule-flanking"
                          checked={selectedSession.settings.enableFlanking}
                          onCheckedChange={(checked) =>
                            updateSettings({ enableFlanking: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-status"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleStatusEffects}
                        </Label>
                        <Switch
                          id="rule-status"
                          checked={selectedSession.settings.enableStatusEffects}
                          onCheckedChange={(checked) =>
                            updateSettings({ enableStatusEffects: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-multidef"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.ruleMultiDefense}
                        </Label>
                        <Switch
                          id="rule-multidef"
                          checked={
                            selectedSession.settings.enableMultiDefensePenalty
                          }
                          onCheckedChange={(checked) =>
                            updateSettings({
                              enableMultiDefensePenalty: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <Label
                          htmlFor="rule-groupinit"
                          className="cursor-pointer text-xs font-normal"
                        >
                          {copy.controls.groupInitBLabel}
                        </Label>
                        <Switch
                          id="rule-groupinit"
                          checked={
                            selectedSession.settings.groupInitiativeTeamB
                          }
                          onCheckedChange={(checked) =>
                            updateSettings({ groupInitiativeTeamB: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                type="button"
                size="sm"
                disabled={
                  selectedSession.teamA.length === 0 ||
                  selectedSession.teamB.length === 0
                }
                onClick={() =>
                  mutateActiveSession(
                    selectedSession.teamA,
                    selectedSession.teamB,
                    selectedSession.settings
                  )
                }
              >
                <Play data-icon="inline-start" />
                <span>{copy.controls.runBtn}</span>
              </Button>
            </div>
          </section>

          {/* Two-Team Confrontation Workbench */}
          <section className="flex flex-col gap-2">
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
              <TeamRosterCard
                team="teamA"
                fighters={selectedSession.teamA}
                priority={selectedSession.settings.targetPriorityA}
                lang={lang}
                onChangePriority={(p) => handleChangePriority('teamA', p)}
                onOpenAdd={() => setAddTargetTeam('teamA')}
                onEditFighter={(f) => setEditingFighter(f)}
                onUpdateQuantity={(id, delta) =>
                  handleUpdateQuantity('teamA', id, delta)
                }
                onDuplicateFighter={(id) => handleDuplicateFighter('teamA', id)}
                onSwapTeam={(id) => handleSwapTeam('teamA', id)}
                onRemoveFighter={(id) => handleRemoveFighter('teamA', id)}
              />

              <TeamRosterCard
                team="teamB"
                fighters={selectedSession.teamB}
                priority={selectedSession.settings.targetPriorityB}
                lang={lang}
                onChangePriority={(p) => handleChangePriority('teamB', p)}
                onOpenAdd={() => setAddTargetTeam('teamB')}
                onEditFighter={(f) => setEditingFighter(f)}
                onUpdateQuantity={(id, delta) =>
                  handleUpdateQuantity('teamB', id, delta)
                }
                onDuplicateFighter={(id) => handleDuplicateFighter('teamB', id)}
                onSwapTeam={(id) => handleSwapTeam('teamB', id)}
                onRemoveFighter={(id) => handleRemoveFighter('teamB', id)}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              {copy.controls.saveToTrackerHint}
            </p>
          </section>

          {/* Statistical Report Dashboard */}
          <SimulationReportView
            report={selectedSession.lastReport}
            lang={lang}
          />
        </>
      )}

      {/* Add Combatant Dialog */}
      <AddSimFighterDialog
        open={addTargetTeam !== null}
        onOpenChange={(open) => {
          if (!open) setAddTargetTeam(null);
        }}
        targetTeam={addTargetTeam ?? 'teamB'}
        lang={lang}
        hubState={hubState}
        onAddFighters={handleAddFighters}
      />

      {/* Edit Combatant Dialog */}
      <EditSimFighterDialog
        fighter={editingFighter}
        lang={lang}
        onClose={() => setEditingFighter(null)}
        onSave={handleSaveEditedFighter}
      />
    </section>
  );
}
