import { Pencil, Pin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCampaignChronicleCopy } from '../i18n';
import type { ChronicleEvent, ModuleLanguage } from '../types';
import {
  formatEventDateLabel,
  formatRealDateLabel,
} from '../utils/chronicleStorage';

interface ChronicleTableViewProps {
  lang: ModuleLanguage;
  events: readonly ChronicleEvent[];
  sessionDates: Record<string, string>;
  showGmSecrets: boolean;
  onEdit: (event: ChronicleEvent) => void;
  onTogglePin: (eventId: string) => void;
  onCycleStatus: (eventId: string) => void;
  onRequestDelete: (event: ChronicleEvent) => void;
}

/**
 * High-density Shadcn Table view for scanning dozens of chronological campaign events at a glance.
 */
export function ChronicleTableView({
  lang,
  events,
  sessionDates,
  showGmSecrets,
  onEdit,
  onTogglePin,
  onCycleStatus,
  onRequestDelete,
}: ChronicleTableViewProps) {
  const copy = getCampaignChronicleCopy(lang);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">{copy.table.date}</TableHead>
            <TableHead className="w-[90px]">{copy.table.session}</TableHead>
            <TableHead>{copy.table.event}</TableHead>
            <TableHead className="hidden md:table-cell">
              {copy.table.category}
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              {copy.table.location}
            </TableHead>
            <TableHead className="w-[120px]">{copy.table.status}</TableHead>
            <TableHead className="w-[100px] text-right">
              {copy.table.actions}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((ev) => (
            <TableRow key={ev.id}>
              <TableCell className="align-top font-mono text-xs tabular-nums">
                <div className="font-medium text-foreground">
                  {formatEventDateLabel(ev.date, lang)}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {copy.timeOfDay[ev.date.timeOfDay]}
                </div>
              </TableCell>

              <TableCell className="align-top font-mono text-xs text-muted-foreground tabular-nums">
                <div>
                  {ev.sessionNumber > 0 ? `#${ev.sessionNumber}` : 'Prep'}
                </div>
                {ev.sessionNumber > 0 &&
                  formatRealDateLabel(
                    sessionDates[String(ev.sessionNumber)],
                    lang
                  ) && (
                    <div className="mt-0.5 text-[11px] text-muted-foreground/85">
                      {formatRealDateLabel(
                        sessionDates[String(ev.sessionNumber)],
                        lang
                      )}
                    </div>
                  )}
              </TableCell>

              <TableCell className="max-w-[360px] align-top whitespace-normal">
                <div className="font-medium text-foreground">{ev.title}</div>
                {ev.summary && (
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {ev.summary}
                  </p>
                )}
                {showGmSecrets && ev.gmSecretNote && (
                  <p className="mt-1 text-xs text-primary">
                    {copy.eventCard.gmSecretLabel} : {ev.gmSecretNote}
                  </p>
                )}
              </TableCell>

              <TableCell className="hidden align-top text-xs text-muted-foreground md:table-cell">
                {copy.categories[ev.category]}
              </TableCell>

              <TableCell className="hidden align-top text-xs text-muted-foreground lg:table-cell">
                {ev.location || '—'}
              </TableCell>

              <TableCell className="align-top text-xs">
                <button
                  type="button"
                  onClick={() => onCycleStatus(ev.id)}
                  className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {copy.eventStatus[ev.status]}
                </button>
              </TableCell>

              <TableCell className="align-top text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onTogglePin(ev.id)}
                    aria-label={
                      ev.pinned
                        ? copy.eventCard.unpinAction
                        : copy.eventCard.pinAction
                    }
                    className={ev.pinned ? 'text-primary' : 'text-muted-foreground'}
                  >
                    <Pin className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onEdit(ev)}
                    aria-label={copy.eventCard.editAction}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onRequestDelete(ev)}
                    aria-label={copy.eventCard.deleteAction}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
