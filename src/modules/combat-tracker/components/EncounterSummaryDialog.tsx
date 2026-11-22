import { Copy, Play, ScrollText, Skull, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatLogType,
  EncounterStatus,
  ModuleLanguage,
  SavedEncounterSession,
} from '../types';
import { formatSessionTimestamp } from '../utils/hubStorage';

interface EncounterSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SavedEncounterSession | null;
  lang: ModuleLanguage;
  onResumeSession: (sessionId: string) => void;
}

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

function getLogBadgeVariant(
  type: CombatLogType
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (type) {
    case 'damage':
    case 'critical':
    case 'death':
    case 'fumble':
      return 'destructive';
    case 'heal':
      return 'default';
    case 'turn':
      return 'secondary';
    default:
      return 'outline';
  }
}

/**
 * Read-only summary modal displaying an encounter's combatant standings
 * and full chronological Combat Log directly from the GM Hub.
 */
export function EncounterSummaryDialog({
  open,
  onOpenChange,
  session,
  lang,
  onResumeSession,
}: EncounterSummaryDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const sCopy = copy.sessions;
  const sum = sCopy.summaryDialog;

  if (!session) return null;

  const { state } = session;
  const aliveCount = state.combatants.filter((c) => !c.isDead).length;

  const handleCopySummary = async () => {
    const lines: string[] = [
      `# ${session.title} (${sCopy.statusLabels[session.status]} · ${sCopy.roundBadge(state.round)})`,
      '',
      `## ${sum.rosterTitle} (${sCopy.survivorsBadge(aliveCount, state.combatants.length)})`,
    ];

    if (state.combatants.length === 0) {
      lines.push(`- ${sum.emptyRoster}`);
    } else {
      for (const c of state.combatants) {
        const flags: string[] = [];
        if (c.isDead) flags.push(sum.deadBadge);
        if (c.criticalWounds.length > 0) flags.push(`${c.criticalWounds.length} crit.`);
        if (c.conditions.length > 0) flags.push(c.conditions.join(', '));
        const suffix = flags.length > 0 ? ` — ${flags.join(' · ')}` : '';
        lines.push(
          `- ${c.name} [${copy.roles[c.role]}] : ${c.hp}/${c.maxHp} ${copy.roster.hpShort}, ${c.end}/${c.maxEnd} ${copy.roster.endShort}${suffix}`
        );
      }
    }

    lines.push('', `## ${sum.logTitle}`);
    if (state.logs.length === 0) {
      lines.push(`- ${copy.log.empty}`);
    } else {
      for (const entry of state.logs) {
        lines.push(
          `- [${copy.log.roundPrefix(entry.round)} · ${entry.timestamp}] ${entry.message}`
        );
      }
    }

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      toast.success(sum.copiedSummaryToast);
    } catch {
      // Clipboard restricted
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle>{session.title}</DialogTitle>
            <Badge variant={getStatusBadgeVariant(session.status)}>
              {sCopy.statusLabels[session.status]}
            </Badge>
            <Badge variant="outline" className="font-mono">
              {sCopy.roundBadge(state.round)}
            </Badge>
          </div>
          <DialogDescription>
            {sum.description} ·{' '}
            {sCopy.updatedAtLabel(formatSessionTimestamp(session.updatedAt, lang))}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:max-h-[68dvh] sm:overflow-y-auto sm:pr-1">
          {/* Combatant Standings */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Users className="size-3.5 text-primary" aria-hidden="true" />
                <span>{sum.rosterTitle}</span>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {sCopy.survivorsBadge(aliveCount, state.combatants.length)}
              </Badge>
            </div>

            {state.combatants.length === 0 ? (
              <p className="rounded-md border border-dashed border-border py-4 text-center text-xs text-muted-foreground">
                {sum.emptyRoster}
              </p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {state.combatants.map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-xs ${
                      c.isDead
                        ? 'border-destructive/30 bg-destructive/5 opacity-75'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="truncate font-semibold text-foreground">
                          {c.name}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {copy.roles[c.role]}
                        </Badge>
                        {c.isDead && (
                          <Badge variant="destructive" className="gap-1 text-[10px]">
                            <Skull className="size-2.5" />
                            <span>{sum.deadBadge}</span>
                          </Badge>
                        )}
                      </div>
                      {(c.conditions.length > 0 || c.criticalWounds.length > 0) && (
                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                          {c.criticalWounds.length > 0
                            ? `${c.criticalWounds.length} crit.`
                            : ''}
                          {c.criticalWounds.length > 0 && c.conditions.length > 0
                            ? ' · '
                            : ''}
                          {c.conditions.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                      <div className="font-semibold text-foreground">
                        {c.hp}/{c.maxHp} {copy.roster.hpShort}
                      </div>
                      <div>
                        {c.end}/{c.maxEnd} {copy.roster.endShort}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Full Chronological Combat Log */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ScrollText className="size-3.5 text-primary" aria-hidden="true" />
                <span>{sum.logTitle}</span>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {sCopy.logsCountBadge(state.logs.length)}
              </Badge>
            </div>

            {state.logs.length === 0 ? (
              <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                {copy.log.empty}
              </p>
            ) : (
              <ScrollArea className="h-64 rounded-md border border-border p-2.5">
                <div className="flex flex-col gap-2">
                  {state.logs.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start gap-2 rounded-md border border-border bg-muted/20 px-2.5 py-1.5 text-xs"
                    >
                      <Badge
                        variant={getLogBadgeVariant(entry.type)}
                        className="mt-0.5 shrink-0 font-mono text-[10px]"
                      >
                        {copy.log.roundPrefix(entry.round)}
                      </Badge>
                      <span className="mt-0.5 shrink-0 font-mono text-[11px] text-muted-foreground">
                        {entry.timestamp}
                      </span>
                      <span className="leading-snug text-foreground">
                        {entry.message}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        <DialogFooter className="flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleCopySummary}
          >
            <Copy data-icon="inline-start" />
            <span>{sum.copySummaryBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {sum.closeBtn}
          </Button>
          <Button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onResumeSession(session.id);
            }}
          >
            <Play data-icon="inline-start" />
            <span>{sum.resumeFromSummaryBtn}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
