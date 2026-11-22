import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  History,
  PauseCircle,
  Play,
  Plus,
  RotateCcw,
  Swords,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatHubState,
  EncounterStatus,
  ModuleLanguage,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedEncounterSession,
  SavedPartyCharacter,
} from '../types';
import { formatSessionTimestamp } from '../utils/hubStorage';
import { EncounterSummaryDialog } from './EncounterSummaryDialog';
import { SharedGmHubSection } from './SharedGmHubSection';

interface GmHubPanelProps {
  hubState: CombatHubState;
  sessions: readonly SavedEncounterSession[];
  lang: ModuleLanguage;
  onSavePc: (pc: SavedPartyCharacter) => void;
  onDeletePc: (pcId: string) => void;
  onSaveGroup: (group: SavedCombatGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onSaveNpc: (npc: SavedCustomNpc) => void;
  onDeleteNpc: (npcId: string) => void;
  onSaveMonster: (monster: SavedCustomMonster) => void;
  onDeleteMonster: (monsterId: string) => void;
  onCreateEmptyEncounter: () => void;
  onLaunchEncounterWithGroup: (group: SavedCombatGroup) => void;
  onOpenSession: (sessionId: string) => void;
  onUpdateSessionStatus: (sessionId: string, status: EncounterStatus) => void;
  onDuplicateSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

type SessionFilter = 'all' | EncounterStatus;

function getStatusBadgeVariant(
  status: EncounterStatus
): 'default' | 'secondary' | 'outline' {
  switch (status) {
    case 'active':
      return 'default';
    case 'paused':
      return 'secondary';
    case 'completed':
      return 'outline';
  }
}

/**
 * Game Master Hub landing page for Combat Tracker:
 * 1. Saved / Paused / Past Encounters (resume mid-session or inspect summary & logs)
 * 2. Shared GM Hub Library (PCs, Groups, Profession-based NPCs, Custom Bestiary Monsters)
 */
export function GmHubPanel({
  hubState,
  sessions,
  lang,
  onSavePc,
  onDeletePc,
  onSaveGroup,
  onDeleteGroup,
  onSaveNpc,
  onDeleteNpc,
  onSaveMonster,
  onDeleteMonster,
  onCreateEmptyEncounter,
  onLaunchEncounterWithGroup,
  onOpenSession,
  onUpdateSessionStatus,
  onDuplicateSession,
  onDeleteSession,
}: GmHubPanelProps) {
  const copy = getCombatTrackerCopy(lang);
  const h = copy.hub;
  const sCopy = copy.sessions;

  const [sessionFilter, setSessionFilter] = useState<SessionFilter>('all');
  const [summarySession, setSummarySession] =
    useState<SavedEncounterSession | null>(null);
  const [sessionToDelete, setSessionToDelete] =
    useState<SavedEncounterSession | null>(null);

  const filteredSessions = useMemo(() => {
    if (sessionFilter === 'all') return sessions;
    return sessions.filter((s) => s.status === sessionFilter);
  }, [sessionFilter, sessions]);

  return (
    <div className="flex flex-col gap-6">
      {/* Intro Hero Card */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">{h.title}</CardTitle>
            <CardDescription>{h.subtitle}</CardDescription>
            <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
              {sCopy.sessionsCountLabel(sessions.length)}
              <span aria-hidden="true"> · </span>
              {h.pcsCountLabel(hubState.characters.length)}
              <span aria-hidden="true"> · </span>
              {h.groupsCountLabel(hubState.groups.length)}
              <span aria-hidden="true"> · </span>
              {hubState.customNpcs.length} {lang === 'fr' ? 'PNJ' : 'NPCs'}
              <span aria-hidden="true"> · </span>
              {hubState.customMonsters.length}{' '}
              {lang === 'fr' ? 'monstre(s)' : 'monster(s)'}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={onCreateEmptyEncounter}
            className="shrink-0 self-start sm:self-center"
          >
            <Swords data-icon="inline-start" />
            <span>{sCopy.newEmptyEncounterBtn}</span>
          </Button>
        </CardHeader>
      </Card>

      {/* Section 1: Saved Encounters & Campaign History */}
      <Card>
        <CardHeader className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" aria-hidden="true" />
              <CardTitle className="text-base font-semibold">
                {sCopy.sectionTitle}
              </CardTitle>
            </div>
            <CardDescription className="mt-0.5">
              {sCopy.sectionSubtitle}
            </CardDescription>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                { id: 'all', label: sCopy.filterAll },
                { id: 'active', label: sCopy.filterActive },
                { id: 'paused', label: sCopy.filterPaused },
                { id: 'completed', label: sCopy.filterCompleted },
              ] as const
            ).map((f) => (
              <Button
                key={f.id}
                type="button"
                variant={sessionFilter === f.id ? 'default' : 'outline'}
                size="xs"
                onClick={() => setSessionFilter(f.id)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {filteredSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <History
                className="size-8 text-muted-foreground/60"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">
                  {sCopy.emptyTitle}
                </p>
                <p className="max-w-md text-xs text-muted-foreground">
                  {sCopy.emptyDesc}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={onCreateEmptyEncounter}
              >
                <Plus data-icon="inline-start" />
                <span>{sCopy.newEmptyEncounterBtn}</span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {filteredSessions.map((session) => {
                const { state } = session;
                const aliveCount = state.combatants.filter(
                  (c) => !c.isDead
                ).length;
                const activeCombatant = state.combatants.find(
                  (c) => c.id === state.activeCombatantId
                );

                return (
                  <div
                    key={session.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card p-3.5"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-foreground">
                            {session.title}
                          </h3>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="size-3" aria-hidden="true" />
                            <span>
                              {sCopy.updatedAtLabel(
                                formatSessionTimestamp(session.updatedAt, lang)
                              )}
                            </span>
                          </p>
                        </div>

                        <Badge variant={getStatusBadgeVariant(session.status)}>
                          {sCopy.statusLabels[session.status]}
                        </Badge>
                      </div>

                      <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                        {sCopy.roundBadge(state.round)}
                        <span aria-hidden="true"> · </span>
                        {sCopy.survivorsBadge(
                          aliveCount,
                          state.combatants.length
                        )}
                        <span aria-hidden="true"> · </span>
                        {sCopy.logsCountBadge(state.logs.length)}
                      </p>

                      {activeCombatant && session.status !== 'completed' && (
                        <p className="truncate text-xs text-muted-foreground">
                          {sCopy.activeTurnLabel(activeCombatant.name)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-1.5 border-t border-border pt-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Button
                          type="button"
                          size="xs"
                          onClick={() => onOpenSession(session.id)}
                        >
                          <Play data-icon="inline-start" />
                          <span>{sCopy.resumeBtn}</span>
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          onClick={() => setSummarySession(session)}
                        >
                          <Eye data-icon="inline-start" />
                          <span>{sCopy.reviewBtn}</span>
                        </Button>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {session.status !== 'completed' ? (
                          <>
                            {session.status === 'active' && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() =>
                                  onUpdateSessionStatus(session.id, 'paused')
                                }
                                title={sCopy.pauseBtn}
                              >
                                <PauseCircle className="size-3.5" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() =>
                                onUpdateSessionStatus(session.id, 'completed')
                              }
                              title={sCopy.completeBtn}
                            >
                              <CheckCircle2 className="size-3.5 text-emerald-500" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() =>
                              onUpdateSessionStatus(session.id, 'active')
                            }
                            title={sCopy.reopenBtn}
                          >
                            <RotateCcw className="size-3.5" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => onDuplicateSession(session.id)}
                          title={sCopy.duplicateBtn}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setSessionToDelete(session)}
                          title={sCopy.deleteBtn}
                        >
                          <Trash2 className="size-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Shared GM Hub Library (PCs, Groups, Custom NPCs, Custom Monsters) */}
      <SharedGmHubSection
        mode="combat"
        hubState={hubState}
        lang={lang}
        onSavePc={onSavePc}
        onDeletePc={onDeletePc}
        onSaveGroup={onSaveGroup}
        onDeleteGroup={onDeleteGroup}
        onSaveNpc={onSaveNpc}
        onDeleteNpc={onDeleteNpc}
        onSaveMonster={onSaveMonster}
        onDeleteMonster={onDeleteMonster}
        onLaunchEncounterWithGroup={onLaunchEncounterWithGroup}
      />

      {/* Read-only Encounter Summary & Log Dialog */}
      <EncounterSummaryDialog
        open={summarySession !== null}
        onOpenChange={(open) => {
          if (!open) setSummarySession(null);
        }}
        session={summarySession}
        lang={lang}
        onResumeSession={onOpenSession}
      />

      {/* Delete Session Confirmation Dialog */}
      <Dialog
        open={sessionToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setSessionToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {sessionToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>{sCopy.deleteTitle}</DialogTitle>
                <DialogDescription>
                  {sCopy.deleteDesc(sessionToDelete.title)}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSessionToDelete(null)}
                >
                  {copy.toolbar.resetCancel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeleteSession(sessionToDelete.id);
                    toast.success(sCopy.deletedToast(sessionToDelete.title));
                    setSessionToDelete(null);
                  }}
                >
                  {sCopy.deleteBtn}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
