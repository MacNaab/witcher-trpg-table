import { useState } from 'react';
import {
  CheckCircle2,
  CopyPlus,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Scale,
  Trash2,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VERBAL_CONTEXT_LABELS } from '../data/verbalRulesData';
import { getVerbalCombatCopy } from '../i18n';
import type {
  ModuleLanguage,
  SavedVerbalSession,
  VerbalSessionStatus,
} from '../types';
import { formatVerbalTimestamp } from '../utils/verbalEngine';

type StatusFilter = 'all' | VerbalSessionStatus;

interface VerbalSessionsHubProps {
  sessions: readonly SavedVerbalSession[];
  lang: ModuleLanguage;
  onCreateEmpty: () => void;
  onCreatePreset: (preset: 'contract' | 'interrogation' | 'trial') => void;
  onOpenSession: (id: string) => void;
  onDuplicateSession: (id: string) => void;
  onUpdateStatus: (id: string, status: VerbalSessionStatus) => void;
  onDeleteSession: (id: string) => void;
}

/**
 * Hub view listing all saved negotiations, interrogations, and trials
 * with quick Witcher TRPG scenario starters.
 */
export function VerbalSessionsHub({
  sessions,
  lang,
  onCreateEmpty,
  onCreatePreset,
  onOpenSession,
  onDuplicateSession,
  onUpdateStatus,
  onDeleteSession,
}: VerbalSessionsHubProps) {
  const copy = getVerbalCombatCopy(lang);
  const sCopy = copy.sessions;

  const [filter, setFilter] = useState<StatusFilter>('all');
  const [deleteTarget, setDeleteTarget] = useState<SavedVerbalSession | null>(
    null
  );

  const sortedSessions = [...sessions].sort((a, b) => {
    const rank = (st: VerbalSessionStatus) =>
      st === 'active' ? 0 : st === 'paused' ? 1 : 2;
    const diff = rank(a.status) - rank(b.status);
    if (diff !== 0) return diff;
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  const visibleSessions =
    filter === 'all'
      ? sortedSessions
      : sortedSessions.filter((s) => s.status === filter);

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Scale className="size-4 text-primary" aria-hidden="true" />
                <span>{sCopy.title}</span>
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm">
                {sCopy.subtitle}
              </CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={onCreateEmpty}
              className="shrink-0 self-start"
            >
              <Plus data-icon="inline-start" />
              <span>{sCopy.newEmptyBtn}</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
            <span className="text-xs font-medium text-muted-foreground">
              {sCopy.presetLabel}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCreatePreset('contract')}
            >
              {sCopy.presets.contract}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCreatePreset('interrogation')}
            >
              {sCopy.presets.interrogation}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCreatePreset('trial')}
            >
              {sCopy.presets.trial}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as StatusFilter)}
          >
            <TabsList>
              <TabsTrigger value="all">{sCopy.filterAll}</TabsTrigger>
              <TabsTrigger value="active">{sCopy.filterActive}</TabsTrigger>
              <TabsTrigger value="paused">{sCopy.filterPaused}</TabsTrigger>
              <TabsTrigger value="completed">
                {sCopy.filterCompleted}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {visibleSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-12 text-center">
              <Scale
                className="size-8 text-muted-foreground/60"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-foreground">
                {sCopy.emptyTitle}
              </p>
              <p className="max-w-md text-xs text-muted-foreground">
                {sCopy.emptyDesc}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {visibleSessions.map((session) => {
                const brokenCount = session.state.participants.filter(
                  (p) => p.resolve <= 0
                ).length;
                return (
                  <Card
                    key={session.id}
                    className="flex flex-col justify-between bg-card"
                  >
                    <CardHeader className="gap-1.5 pb-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {sCopy.statusLabels[session.status]}
                        </span>
                        <span className="font-mono tabular-nums">
                          {sCopy.roundBadge(session.state.round)} ·{' '}
                          {formatVerbalTimestamp(session.updatedAt, lang)}
                        </span>
                      </div>
                      <CardTitle className="text-base font-semibold">
                        {session.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {VERBAL_CONTEXT_LABELS[session.state.contextType][lang]}
                        {session.state.stakes
                          ? ` · ${session.state.stakes}`
                          : ''}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3 pt-0">
                      <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-2.5 font-mono text-xs text-muted-foreground tabular-nums">
                        <span>
                          {sCopy.participantsBadge(
                            session.state.participants.length
                          )}
                        </span>
                        {brokenCount > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-destructive">
                              {sCopy.brokenBadge(brokenCount)}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => onOpenSession(session.id)}
                          className="flex-1"
                        >
                          <Play data-icon="inline-start" />
                          <span>{sCopy.resumeBtn}</span>
                        </Button>

                        {session.status === 'active' && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() => onUpdateStatus(session.id, 'paused')}
                            title={sCopy.pauseBtn}
                            aria-label={sCopy.pauseBtn}
                          >
                            <Pause className="size-3.5" />
                          </Button>
                        )}
                        {session.status !== 'completed' ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() =>
                              onUpdateStatus(session.id, 'completed')
                            }
                            title={sCopy.completeBtn}
                            aria-label={sCopy.completeBtn}
                          >
                            <CheckCircle2 className="size-3.5" />
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() => onUpdateStatus(session.id, 'active')}
                            title={sCopy.reopenBtn}
                            aria-label={sCopy.reopenBtn}
                          >
                            <RotateCcw className="size-3.5" />
                          </Button>
                        )}

                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          onClick={() => onDuplicateSession(session.id)}
                          title={sCopy.duplicateBtn}
                          aria-label={sCopy.duplicateBtn}
                        >
                          <CopyPlus className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setDeleteTarget(session)}
                          title={sCopy.deleteBtn}
                          aria-label={sCopy.deleteBtn}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{sCopy.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget ? sCopy.deleteDesc(deleteTarget.title) : ''}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.resolver.closeBtn}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  onDeleteSession(deleteTarget.id);
                  setDeleteTarget(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {sCopy.deleteBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
