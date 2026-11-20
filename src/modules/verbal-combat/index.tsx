import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ClipboardCopy,
  Dices,
  Play,
  Plus,
  Scale,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import { generateId } from '@/src/modules/combat-tracker/utils/combatEngine';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { AddVerbalParticipantDialog } from './components/AddVerbalParticipantDialog';
import { VerbalExchangeDialog } from './components/VerbalExchangeDialog';
import { VerbalParticipantCard } from './components/VerbalParticipantCard';
import { VerbalRulesReferencePanel } from './components/VerbalRulesReferencePanel';
import { VerbalSessionsHub } from './components/VerbalSessionsHub';
import {
  RELATIONSHIP_META,
  VERBAL_CONDITION_META,
  VERBAL_CONTEXT_LABELS,
} from './data/verbalRulesData';
import { getVerbalCombatCopy } from './i18n';
import type {
  ModuleLanguage,
  SavedVerbalSession,
  VerbalConditionId,
  VerbalContextType,
  VerbalParticipant,
  VerbalSessionStatus,
} from './types';
import {
  buildVerbalScenarioPreset,
  calculateMaxResolve,
  createVerbalLogEntry,
  createVerbalSession,
  loadVerbalSessions,
  rollVerbalInitiative,
  saveVerbalSessions,
  type VerbalExchangeResolution,
} from './utils/verbalEngine';

type WorkspaceTab = 'board' | 'log' | 'rules';
type HubTab = 'scenes' | 'rules';

const CONTEXT_OPTIONS: readonly VerbalContextType[] = [
  'negotiation',
  'interrogation',
  'trial',
  'debate',
];

const STATUS_OPTIONS: readonly VerbalSessionStatus[] = [
  'active',
  'paused',
  'completed',
];

/**
 * Dedicated Verbal Combat & Social Duels module under Combats & Rencontres.
 * Supports official Resolve tracking, disposition modifiers, exploding 1d10!
 * exchanges, PC import, NPC archetypes, saved multi-session hub, and log export.
 */
export default function VerbalCombatModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('verbal-combat');
  const moduleCopy = t.modules['verbal-combat'];
  const copy = getVerbalCombatCopy(lang);
  const Icon = definition.icon;

  const [sessions, setSessions] = useState<SavedVerbalSession[]>(() =>
    loadVerbalSessions()
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    () => launchIntent?.sessionId ?? null
  );
  const [hubTab, setHubTab] = useState<HubTab>(() =>
    launchIntent?.tab === 'rules' && !launchIntent?.sessionId
      ? 'rules'
      : 'scenes'
  );
  const [workspaceTab, setWorkspaceTab] = useState<WorkspaceTab>(() =>
    launchIntent?.tab === 'log' || launchIntent?.tab === 'rules'
      ? launchIntent.tab
      : 'board'
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [resolverOpen, setResolverOpen] = useState(false);

  useEffect(() => {
    saveVerbalSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    if (!launchIntent) return;
    if (launchIntent.sessionId) {
      setSessions(loadVerbalSessions());
      setSelectedSessionId(launchIntent.sessionId);
      setWorkspaceTab(
        launchIntent.tab === 'log' || launchIntent.tab === 'rules'
          ? launchIntent.tab
          : 'board'
      );
    } else if (launchIntent.tab === 'rules') {
      setSelectedSessionId(null);
      setHubTab('rules');
    }
  }, [launchIntent]);

  const selectedSession = useMemo(
    () =>
      selectedSessionId
        ? (sessions.find((s) => s.id === selectedSessionId) ?? null)
        : null,
    [selectedSessionId, sessions]
  );

  useEffect(() => {
    if (!selectedSession) {
      setSelectedParticipantId(null);
      return;
    }
    const list = selectedSession.state.participants;
    if (list.length === 0) {
      setSelectedParticipantId(null);
      return;
    }
    if (!list.some((p) => p.id === selectedParticipantId)) {
      setSelectedParticipantId(
        selectedSession.state.activeParticipantId &&
          list.some((p) => p.id === selectedSession.state.activeParticipantId)
          ? selectedSession.state.activeParticipantId
          : list[0].id
      );
    }
  }, [selectedParticipantId, selectedSession]);

  const selectedParticipant = useMemo(() => {
    if (!selectedSession || !selectedParticipantId) return null;
    return (
      selectedSession.state.participants.find(
        (p) => p.id === selectedParticipantId
      ) ?? null
    );
  }, [selectedParticipantId, selectedSession]);

  // --- Hub Actions ---
  const handleCreateEmpty = () => {
    const newSession = createVerbalSession({
      title:
        lang === 'fr'
          ? 'Nouvelle joute verbale'
          : 'New Verbal Combat Scene',
      contextType: 'negotiation',
      stakes: '',
      participants: [],
    });
    setSessions((prev) => [newSession, ...prev]);
    setSelectedSessionId(newSession.id);
    setWorkspaceTab('board');
    toast.success(copy.sessions.createdToast(newSession.title));
  };

  const handleCreatePreset = (
    presetId: 'contract' | 'interrogation' | 'trial'
  ) => {
    const newSession = buildVerbalScenarioPreset(presetId, lang);
    setSessions((prev) => [newSession, ...prev]);
    setSelectedSessionId(newSession.id);
    setWorkspaceTab('board');
    toast.success(copy.sessions.createdToast(newSession.title));
  };

  const handleDuplicateSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (!target) return;
    const now = new Date().toISOString();
    const cloneTitle = `${target.title} (2)`;
    const clone: SavedVerbalSession = {
      ...target,
      id: generateId('vs'),
      title: cloneTitle,
      status: 'paused',
      updatedAt: now,
      state: {
        ...target.state,
        participants: target.state.participants.map((p) => ({
          ...p,
          stats: { ...p.stats },
          skills: { ...p.skills },
          conditions: [...p.conditions],
        })),
        logs: target.state.logs.map((l) => ({ ...l })),
      },
    };
    setSessions((prev) => [clone, ...prev]);
    toast.success(copy.sessions.duplicatedToast(cloneTitle));
  };

  const handleUpdateSessionStatus = (
    sessionId: string,
    status: VerbalSessionStatus
  ) => {
    const now = new Date().toISOString();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, status, updatedAt: now } : s
      )
    );
  };

  const handleDeleteSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (selectedSessionId === sessionId) {
      setSelectedSessionId(null);
    }
    if (target) {
      toast.success(copy.sessions.deletedToast(target.title));
    }
  };

  // --- Active Workspace Helpers ---
  const updateSelectedSession = (
    updater: (prev: SavedVerbalSession) => SavedVerbalSession
  ) => {
    if (!selectedSessionId) return;
    const now = new Date().toISOString();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === selectedSessionId ? { ...updater(s), updatedAt: now } : s
      )
    );
  };

  const handleAddParticipant = (participant: VerbalParticipant) => {
    updateSelectedSession((prev) => {
      const nextParticipants = [...prev.state.participants, participant];
      return {
        ...prev,
        state: {
          ...prev.state,
          activeParticipantId:
            prev.state.activeParticipantId ?? participant.id,
          participants: nextParticipants,
        },
      };
    });
    setSelectedParticipantId(participant.id);
  };

  const handleUpdateParticipant = (
    participantId: string,
    patch: Partial<VerbalParticipant>
  ) => {
    updateSelectedSession((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        participants: prev.state.participants.map((p) => {
          if (p.id !== participantId) return p;
          const nextStats = patch.stats ?? p.stats;
          const nextMaxResolve = patch.stats
            ? calculateMaxResolve(nextStats.int, nextStats.vol)
            : (patch.maxResolve ?? p.maxResolve);
          const wasFull = p.resolve === p.maxResolve;
          const nextResolve =
            patch.resolve !== undefined
              ? Math.max(0, Math.min(nextMaxResolve, patch.resolve))
              : patch.stats && wasFull
                ? nextMaxResolve
                : Math.min(p.resolve, nextMaxResolve);
          return {
            ...p,
            ...patch,
            stats: nextStats,
            maxResolve: nextMaxResolve,
            resolve: nextResolve,
          };
        }),
      },
    }));
  };

  const handleRemoveParticipant = (participantId: string) => {
    updateSelectedSession((prev) => {
      const remaining = prev.state.participants.filter(
        (p) => p.id !== participantId
      );
      const nextActive =
        prev.state.activeParticipantId === participantId
          ? (remaining[0]?.id ?? null)
          : prev.state.activeParticipantId;
      return {
        ...prev,
        state: {
          ...prev.state,
          activeParticipantId: nextActive,
          participants: remaining,
        },
      };
    });
  };

  const handleRollAllInitiative = () => {
    if (!selectedSession || selectedSession.state.participants.length === 0) {
      return;
    }
    updateSelectedSession((prev) => {
      const rolled = prev.state.participants
        .map((p) => {
          const init = rollVerbalInitiative(p.stats.emp);
          return {
            ...p,
            initiative: init.total,
            initiativeRoll: init.roll,
          };
        })
        .sort((a, b) => b.initiative - a.initiative);

      const summary = rolled
        .map((p) => `${p.name} (${p.initiative})`)
        .join(' · ');

      return {
        ...prev,
        state: {
          ...prev.state,
          activeParticipantId: rolled[0]?.id ?? null,
          participants: rolled,
          logs: [
            createVerbalLogEntry(
              prev.state.round,
              'system',
              `${copy.workspace.initRolledToast} — ${summary}`
            ),
            ...prev.state.logs,
          ],
        },
      };
    });
    toast.success(copy.workspace.initRolledToast);
  };

  const handleStartDebate = () => {
    if (!selectedSession) return;
    updateSelectedSession((prev) => ({
      ...prev,
      status: prev.status === 'completed' ? 'active' : prev.status,
      state: {
        ...prev.state,
        round: 1,
        activeParticipantId:
          prev.state.activeParticipantId ??
          prev.state.participants[0]?.id ??
          null,
        logs: [
          createVerbalLogEntry(1, 'turn', copy.workspace.roundWrappedToast(1)),
          ...prev.state.logs,
        ],
      },
    }));
    toast.info(copy.workspace.roundWrappedToast(1));
  };

  const handleCycleTurn = (direction: 1 | -1) => {
    if (!selectedSession) return;
    const participants = selectedSession.state.participants;
    if (participants.length === 0) return;

    if (selectedSession.state.round === 0) {
      handleStartDebate();
      return;
    }

    const currentIdx = Math.max(
      0,
      participants.findIndex(
        (p) => p.id === selectedSession.state.activeParticipantId
      )
    );
    let nextIdx = currentIdx + direction;
    let nextRound = selectedSession.state.round;
    let wrappedForward = false;

    if (nextIdx >= participants.length) {
      nextIdx = 0;
      nextRound += 1;
      wrappedForward = true;
    } else if (nextIdx < 0) {
      if (nextRound > 1) {
        nextIdx = participants.length - 1;
        nextRound -= 1;
      } else {
        nextIdx = 0;
      }
    }

    const nextActive = participants[nextIdx];
    updateSelectedSession((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        round: nextRound,
        activeParticipantId: nextActive.id,
        participants: wrappedForward
          ? prev.state.participants.map((p) => ({
              ...p,
              actedThisRound: false,
            }))
          : prev.state.participants,
        logs: wrappedForward
          ? [
              createVerbalLogEntry(
                nextRound,
                'turn',
                copy.workspace.roundWrappedToast(nextRound)
              ),
              ...prev.state.logs,
            ]
          : prev.state.logs,
      },
    }));

    if (wrappedForward) {
      toast.info(copy.workspace.roundWrappedToast(nextRound));
    }
  };

  const handleOpenResolver = () => {
    if (!selectedSession || selectedSession.state.participants.length < 2) {
      toast.warning(copy.resolver.needTwoWarning);
      return;
    }
    setResolverOpen(true);
  };

  const handleApplyResolution = ({
    attackerId,
    defenderId,
    resolution,
  }: {
    attackerId: string;
    defenderId: string;
    resolution: VerbalExchangeResolution;
  }) => {
    updateSelectedSession((prev) => {
      const nextParticipants = prev.state.participants.map((p) => {
        if (resolution.hit && p.id === defenderId) {
          const nextResolve = Math.max(0, p.resolve - resolution.resolveDamage);
          const nextConds = new Set<VerbalConditionId>(p.conditions);
          if (resolution.appliedCondition) {
            nextConds.add(resolution.appliedCondition);
          }
          if (nextResolve === 0) {
            nextConds.add('broken');
          }
          return {
            ...p,
            resolve: nextResolve,
            conditions: Array.from(nextConds),
          };
        }

        if (!resolution.hit && resolution.counterDamage > 0 && p.id === attackerId) {
          const nextResolve = Math.max(0, p.resolve - resolution.counterDamage);
          const nextConds = new Set<VerbalConditionId>(p.conditions);
          if (nextResolve === 0) {
            nextConds.add('broken');
          }
          return {
            ...p,
            resolve: nextResolve,
            actedThisRound: true,
            conditions: Array.from(nextConds),
          };
        }

        if (
          !resolution.hit &&
          resolution.appliedCondition === 'unmasked' &&
          p.id === attackerId
        ) {
          const nextConds = new Set<VerbalConditionId>(p.conditions);
          nextConds.add('unmasked');
          return {
            ...p,
            actedThisRound: true,
            conditions: Array.from(nextConds),
          };
        }

        if (p.id === attackerId) {
          return { ...p, actedThisRound: true };
        }

        return p;
      });

      const logType = resolution.hit
        ? 'damage'
        : resolution.counterDamage > 0
          ? 'counter'
          : 'exchange';

      return {
        ...prev,
        state: {
          ...prev.state,
          participants: nextParticipants,
          logs: [
            createVerbalLogEntry(
              prev.state.round,
              logType,
              resolution.summaryText
            ),
            ...prev.state.logs,
          ],
        },
      };
    });

    toast.success(copy.resolver.appliedToast);
  };

  const handleCopyLog = async () => {
    if (!selectedSession || selectedSession.state.logs.length === 0) return;
    const chronological = [...selectedSession.state.logs].reverse();
    const lines = [
      `# ${selectedSession.title} (${VERBAL_CONTEXT_LABELS[selectedSession.state.contextType][lang]})`,
      ...(selectedSession.state.stakes
        ? [`${copy.workspace.stakesLabel}: ${selectedSession.state.stakes}`]
        : []),
      '',
      ...chronological.map(
        (entry) =>
          `- [${copy.log.roundPrefix(entry.round)} · ${entry.timestamp}] ${entry.message}`
      ),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      toast.success(copy.log.copiedToast);
    } catch {
      // Fallback ignored in sandboxed iframe if clipboard is restricted
    }
  };

  return (
    <section
      aria-labelledby="module-heading-verbal-combat"
      className="mx-auto flex w-full max-w-7xl flex-col gap-6"
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
              id="module-heading-verbal-combat"
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
        <Tabs
          value={hubTab}
          onValueChange={(v) => setHubTab(v as HubTab)}
          className="flex flex-col gap-4"
        >
          <TabsList className="w-fit">
            <TabsTrigger value="scenes">
              {lang === 'fr' ? 'Joutes enregistrées' : 'Saved Scenes'}
            </TabsTrigger>
            <TabsTrigger value="rules">{copy.header.tabs.rules}</TabsTrigger>
          </TabsList>

          <TabsContent value="scenes">
            <VerbalSessionsHub
              sessions={sessions}
              lang={lang}
              onCreateEmpty={handleCreateEmpty}
              onCreatePreset={handleCreatePreset}
              onOpenSession={(id) => {
                setSelectedSessionId(id);
                setWorkspaceTab('board');
              }}
              onDuplicateSession={handleDuplicateSession}
              onUpdateStatus={handleUpdateSessionStatus}
              onDeleteSession={handleDeleteSession}
            />
          </TabsContent>

          <TabsContent value="rules">
            <VerbalRulesReferencePanel lang={lang} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Scene Context Bar */}
          <Card>
            <CardContent className="flex flex-col gap-4 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSessionId(null)}
                >
                  <ArrowLeft data-icon="inline-start" />
                  <span>{copy.workspace.backToHubBtn}</span>
                </Button>

                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={selectedSession.state.contextType}
                    onValueChange={(val) => {
                      if (!val) return;
                      updateSelectedSession((prev) => ({
                        ...prev,
                        state: {
                          ...prev.state,
                          contextType: val as VerbalContextType,
                        },
                      }));
                    }}
                  >
                    <SelectTrigger className="h-8 w-52 text-xs">
                      <SelectValue>
                        {
                          VERBAL_CONTEXT_LABELS[
                            selectedSession.state.contextType
                          ][lang]
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {CONTEXT_OPTIONS.map((ctx) => (
                        <SelectItem key={ctx} value={ctx}>
                          {VERBAL_CONTEXT_LABELS[ctx][lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedSession.status}
                    onValueChange={(val) => {
                      if (!val) return;
                      handleUpdateSessionStatus(
                        selectedSession.id,
                        val as VerbalSessionStatus
                      );
                    }}
                  >
                    <SelectTrigger className="h-8 w-36 text-xs">
                      <SelectValue>
                        {copy.sessions.statusLabels[selectedSession.status]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((st) => (
                        <SelectItem key={st} value={st}>
                          {copy.sessions.statusLabels[st]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="vb-scene-title"
                    className="text-xs text-muted-foreground"
                  >
                    {lang === 'fr' ? 'Scène' : 'Scene'}
                  </Label>
                  <Input
                    id="vb-scene-title"
                    value={selectedSession.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSelectedSession((prev) => ({
                        ...prev,
                        title: val,
                      }));
                    }}
                    placeholder={copy.workspace.titlePlaceholder}
                    className="font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="vb-scene-stakes"
                    className="text-xs text-muted-foreground"
                  >
                    {copy.workspace.stakesLabel}
                  </Label>
                  <Input
                    id="vb-scene-stakes"
                    value={selectedSession.state.stakes}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateSelectedSession((prev) => ({
                        ...prev,
                        state: { ...prev.state, stakes: val },
                      }));
                    }}
                    placeholder={copy.workspace.stakesPlaceholder}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workspace Tabs */}
          <Tabs
            value={workspaceTab}
            onValueChange={(v) => setWorkspaceTab(v as WorkspaceTab)}
            className="flex flex-col gap-4"
          >
            <TabsList className="w-fit">
              <TabsTrigger value="board">{copy.header.tabs.board}</TabsTrigger>
              <TabsTrigger value="log">
                {copy.header.tabs.log} ({selectedSession.state.logs.length})
              </TabsTrigger>
              <TabsTrigger value="rules">{copy.header.tabs.rules}</TabsTrigger>
            </TabsList>

            {/* Tab 1: Active Exchange Board */}
            <TabsContent value="board" className="flex flex-col gap-4">
              {/* Prep Banner when Round === 0 */}
              {selectedSession.state.round === 0 && (
                <div className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 sm:flex-row sm:items-center">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {copy.workspace.prepBanner}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleStartDebate}
                    className="shrink-0 self-start sm:self-center"
                  >
                    <Play data-icon="inline-start" />
                    <span>{copy.workspace.startBtn}</span>
                  </Button>
                </div>
              )}

              {/* Turn & Exchange Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-foreground tabular-nums">
                    {selectedSession.state.round === 0
                      ? copy.workspace.prepBadge
                      : `${copy.workspace.roundLabel} ${selectedSession.state.round}`}
                  </span>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCycleTurn(-1)}
                      disabled={selectedSession.state.participants.length === 0}
                    >
                      <ChevronLeft data-icon="inline-start" />
                      <span>{copy.workspace.prevTurn}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCycleTurn(1)}
                      disabled={selectedSession.state.participants.length === 0}
                    >
                      <span>{copy.workspace.nextTurn}</span>
                      <ChevronRight data-icon="inline-end" />
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRollAllInitiative}
                    disabled={selectedSession.state.participants.length === 0}
                  >
                    <Dices data-icon="inline-start" />
                    <span>{copy.workspace.rollInitBtn}</span>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAddDialogOpen(true)}
                  >
                    <UserPlus data-icon="inline-start" />
                    <span>{copy.workspace.addParticipantBtn}</span>
                  </Button>

                  <Button
                    type="button"
                    size="sm"
                    onClick={handleOpenResolver}
                  >
                    <Scale data-icon="inline-start" />
                    <span>{copy.workspace.resolveExchangeBtn}</span>
                  </Button>
                </div>
              </div>

              {/* Participant List & Active Card Inspector */}
              {selectedSession.state.participants.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <Scale
                      className="size-8 text-muted-foreground/60"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-foreground">
                        {copy.workspace.emptyParticipantsTitle}
                      </p>
                      <p className="max-w-md text-xs text-muted-foreground">
                        {copy.workspace.emptyParticipantsDesc}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setAddDialogOpen(true)}
                    >
                      <Plus data-icon="inline-start" />
                      <span>{copy.workspace.addParticipantBtn}</span>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  {/* Left: Participant Initiative & Resolve Queue */}
                  <div className="flex flex-col gap-2.5 lg:col-span-5">
                    {selectedSession.state.participants.map((p) => {
                      const isActive =
                        p.id === selectedSession.state.activeParticipantId;
                      const isSelected = p.id === selectedParticipant?.id;
                      const pct =
                        p.maxResolve > 0
                          ? Math.max(
                              0,
                              Math.min(
                                100,
                                Math.round((p.resolve / p.maxResolve) * 100)
                              )
                            )
                          : 0;
                      const isBroken = p.resolve <= 0;

                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelectedParticipantId(p.id)}
                          className={`flex w-full flex-col gap-2 rounded-lg border p-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : isActive
                                ? 'border-primary/50 bg-card hover:bg-muted/30'
                                : 'border-border bg-card hover:bg-muted/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="truncate text-sm font-semibold text-foreground">
                                  {p.name}
                                </span>
                                {isActive && (
                                  <span className="text-xs font-semibold text-primary">
                                    · {copy.participant.activeTurnBadge}
                                  </span>
                                )}
                              </div>
                              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground tabular-nums">
                                <span>{copy.roles[p.role]}</span>
                                <span aria-hidden="true">·</span>
                                <span>Init {p.initiative}</span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {RELATIONSHIP_META[p.relationship].label[lang]}
                                </span>
                              </div>
                            </div>

                            <div className="shrink-0 text-right font-mono text-xs tabular-nums">
                              <span
                                className={
                                  isBroken
                                    ? 'font-bold text-destructive'
                                    : 'font-semibold text-foreground'
                                }
                              >
                                {p.resolve} / {p.maxResolve}
                              </span>
                            </div>
                          </div>

                          <Progress value={pct} className="h-1.5" />

                          {(isBroken || p.conditions.length > 0) && (
                            <div className="text-[11px] font-medium text-destructive">
                              {isBroken && p.conditions.length === 0
                                ? copy.participant.brokenStatus
                                : p.conditions
                                    .map(
                                      (c) => VERBAL_CONDITION_META[c].label[lang]
                                    )
                                    .join(' · ')}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Selected Participant Card */}
                  <div className="lg:col-span-7">
                    {selectedParticipant && (
                      <VerbalParticipantCard
                        participant={selectedParticipant}
                        isActiveTurn={
                          selectedParticipant.id ===
                          selectedSession.state.activeParticipantId
                        }
                        lang={lang}
                        onUpdate={(patch) =>
                          handleUpdateParticipant(selectedParticipant.id, patch)
                        }
                        onRemove={() =>
                          handleRemoveParticipant(selectedParticipant.id)
                        }
                      />
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Tab 2: Debate Log */}
            <TabsContent value="log">
              <Card>
                <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">
                      {copy.log.title}
                    </CardTitle>
                    <CardDescription>
                      {selectedSession.title} ·{' '}
                      {selectedSession.state.round === 0
                        ? copy.workspace.prepBadge
                        : `${copy.workspace.roundLabel} ${selectedSession.state.round}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={selectedSession.state.logs.length === 0}
                      onClick={handleCopyLog}
                    >
                      <ClipboardCopy data-icon="inline-start" />
                      <span>{copy.log.copyBtn}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={selectedSession.state.logs.length === 0}
                      onClick={() =>
                        updateSelectedSession((prev) => ({
                          ...prev,
                          state: { ...prev.state, logs: [] },
                        }))
                      }
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 data-icon="inline-start" />
                      <span>{copy.log.clearBtn}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedSession.state.logs.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      {copy.log.empty}
                    </p>
                  ) : (
                    <div className="flex flex-col divide-y divide-border/60">
                      {selectedSession.state.logs.map((entry) => (
                        <div
                          key={entry.id}
                          className="flex flex-col gap-1 py-2.5 text-sm sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                            {copy.log.roundPrefix(entry.round)} ·{' '}
                            {entry.timestamp}
                          </span>
                          <span className="leading-relaxed text-foreground">
                            {entry.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 3: Official Verbal Combat Rules */}
            <TabsContent value="rules">
              <VerbalRulesReferencePanel lang={lang} />
            </TabsContent>
          </Tabs>

          {/* Dialogs */}
          <AddVerbalParticipantDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            lang={lang}
            onAddParticipant={handleAddParticipant}
          />

          <VerbalExchangeDialog
            open={resolverOpen}
            onOpenChange={setResolverOpen}
            participants={selectedSession.state.participants}
            defaultAttackerId={
              selectedSession.state.activeParticipantId ??
              selectedParticipant?.id ??
              null
            }
            lang={lang}
            onApplyResolution={handleApplyResolution}
          />
        </div>
      )}
    </section>
  );
}
