import { Copy, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getCombatTrackerCopy } from '../i18n';
import type { CombatLogEntry, CombatLogType, ModuleLanguage } from '../types';

interface CombatLogPanelProps {
  logs: readonly CombatLogEntry[];
  lang: ModuleLanguage;
  encounterTitle?: string;
  round?: number;
  onClearLogs: () => void;
  onDeleteLogEntry?: (entryId: string) => void;
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
 * Chronological combat journal tracking rounds, hits, criticals, DoTs, and death saves,
 * with single-entry removal and clean Markdown/text clipboard export.
 */
export function CombatLogPanel({
  logs,
  lang,
  encounterTitle,
  round,
  onClearLogs,
  onDeleteLogEntry,
}: CombatLogPanelProps) {
  const copy = getCombatTrackerCopy(lang);

  const handleCopyLogs = async () => {
    if (logs.length === 0) return;
    const header = encounterTitle
      ? `# ${encounterTitle}${typeof round === 'number' ? ` (${copy.log.roundPrefix(round)})` : ''}\n\n`
      : '';
    const lines = logs.map(
      (entry) =>
        `- [${copy.log.roundPrefix(entry.round)} · ${entry.timestamp}] ${entry.message}`
    );
    try {
      await navigator.clipboard.writeText(`${header}${lines.join('\n')}`);
      toast.success(copy.log.copiedToast);
    } catch {
      // Clipboard restricted
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">{copy.log.title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopyLogs}
            disabled={logs.length === 0}
          >
            <Copy data-icon="inline-start" />
            <span>{copy.log.copyBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClearLogs}
            disabled={logs.length === 0}
          >
            <Trash2 data-icon="inline-start" />
            <span>{copy.log.clearBtn}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {copy.log.empty}
          </p>
        ) : (
          <ScrollArea className="h-[520px] pr-3">
            <div className="flex flex-col gap-2">
              {logs.map((entry) => (
                <div
                  key={entry.id}
                  className="group flex items-start justify-between gap-2.5 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm"
                >
                  <div className="flex min-w-0 flex-1 items-start gap-2.5">
                    <Badge
                      variant={getLogBadgeVariant(entry.type)}
                      className="mt-0.5 shrink-0 font-mono text-[11px]"
                    >
                      {copy.log.roundPrefix(entry.round)}
                    </Badge>
                    <span className="mt-0.5 shrink-0 font-mono text-xs text-muted-foreground">
                      {entry.timestamp}
                    </span>
                    <span className="leading-snug text-foreground">
                      {entry.message}
                    </span>
                  </div>

                  {onDeleteLogEntry && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onDeleteLogEntry(entry.id)}
                      aria-label={copy.log.deleteEntryLabel}
                      title={copy.log.deleteEntryLabel}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
