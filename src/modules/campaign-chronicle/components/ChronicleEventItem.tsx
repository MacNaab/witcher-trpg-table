import {
  CheckCircle2,
  Clock3,
  Copy,
  EyeOff,
  GitBranch,
  MapPin,
  Pencil,
  Pin,
  PlayCircle,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCampaignChronicleCopy } from '../i18n';
import type {
  ChronicleEvent,
  ChronicleEventStatus,
  ModuleLanguage,
} from '../types';
import { formatEventDateLabel, formatRealDateLabel } from '../utils/chronicleStorage';

interface ChronicleEventItemProps {
  lang: ModuleLanguage;
  event: ChronicleEvent;
  sessionRealDate?: string;
  hideBilateralDate?: boolean;
  showGmSecrets: boolean;
  onEdit: (event: ChronicleEvent) => void;
  onDuplicate: (event: ChronicleEvent) => void;
  onTogglePin: (eventId: string) => void;
  onCycleStatus: (eventId: string) => void;
  onRequestDelete: (event: ChronicleEvent) => void;
}

function getStatusVisual(status: ChronicleEventStatus) {
  switch (status) {
    case 'completed':
      return {
        icon: CheckCircle2,
        textClass: 'text-emerald-600 dark:text-emerald-400',
      };
    case 'active':
      return {
        icon: PlayCircle,
        textClass: 'text-amber-600 dark:text-amber-400',
      };
    case 'upcoming':
      return {
        icon: Clock3,
        textClass: 'text-sky-600 dark:text-sky-400',
      };
    case 'consequence':
      return {
        icon: GitBranch,
        textClass: 'text-rose-600 dark:text-rose-400',
      };
  }
}

/**
 * Clean single-elevation chronological entry card with unboxed typographic metadata,
 * optional GM secret note visibility, and direct inline quick actions.
 */
export function ChronicleEventItem({
  lang,
  event,
  sessionRealDate,
  hideBilateralDate = false,
  showGmSecrets,
  onEdit,
  onDuplicate,
  onTogglePin,
  onCycleStatus,
  onRequestDelete,
}: ChronicleEventItemProps) {
  const copy = getCampaignChronicleCopy(lang);
  const statusMeta = getStatusVisual(event.status);
  const StatusIcon = statusMeta.icon;

  const dateLabel = formatEventDateLabel(event.date, lang);
  const timeLabel = copy.timeOfDay[event.date.timeOfDay];
  const formattedRealDate =
    event.sessionNumber > 0
      ? formatRealDateLabel(sessionRealDate, lang)
      : null;
  const sessionLabel =
    event.sessionNumber > 0
      ? formattedRealDate
        ? `${copy.eventCard.sessionLabel(event.sessionNumber)} (${formattedRealDate})`
        : copy.eventCard.sessionLabel(event.sessionNumber)
      : copy.eventCard.unassignedSession;

  return (
    <article
      className={`group rounded-lg border bg-card p-4 transition-colors ${
        event.pinned
          ? 'border-primary/45'
          : 'border-border hover:border-border/90'
      }`}
    >
      {/* Top Row: Quiet unboxed metadata + Action icons */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {!hideBilateralDate ? (
            <>
              <span className="font-mono font-medium text-foreground tabular-nums">
                {dateLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{timeLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{sessionLabel}</span>
              <span aria-hidden="true">·</span>
            </>
          ) : (
            <span className="flex flex-wrap items-center gap-x-2 @3xl:hidden">
              <span className="font-mono font-medium text-foreground tabular-nums">
                {dateLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{timeLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{sessionLabel}</span>
              <span aria-hidden="true">·</span>
            </span>
          )}
          <span>{copy.categories[event.category]}</span>
          {event.location && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3 text-muted-foreground" aria-hidden="true" />
                <span>{event.location}</span>
              </span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onCycleStatus(event.id)}
            title={copy.eventCard.cycleStatusAction}
            className={`inline-flex cursor-pointer items-center gap-1 font-medium underline-offset-4 hover:underline ${statusMeta.textClass}`}
          >
            <StatusIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{copy.eventStatus[event.status]}</span>
          </button>
          {event.importance === 'turning-point' && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-primary">
                {copy.importance[event.importance]}
              </span>
            </>
          )}
        </div>

        {/* Inline GM Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onTogglePin(event.id)}
            aria-label={
              event.pinned
                ? copy.eventCard.unpinAction
                : copy.eventCard.pinAction
            }
            title={
              event.pinned
                ? copy.eventCard.unpinAction
                : copy.eventCard.pinAction
            }
            className={event.pinned ? 'text-primary' : 'text-muted-foreground'}
          >
            <Pin className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onEdit(event)}
            aria-label={copy.eventCard.editAction}
            title={copy.eventCard.editAction}
          >
            <Pencil className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onDuplicate(event)}
            aria-label={copy.eventCard.duplicateAction}
            title={copy.eventCard.duplicateAction}
          >
            <Copy className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onRequestDelete(event)}
            aria-label={copy.eventCard.deleteAction}
            title={copy.eventCard.deleteAction}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Title & Summary */}
      <div className="mt-2 flex flex-col gap-1.5">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {event.title}
        </h3>
        {event.summary && (
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {event.summary}
          </p>
        )}
      </div>

      {/* Involved Entities & Consequences */}
      {(event.involvedEntities.length > 0 || event.consequences) && (
        <div className="mt-3 flex flex-col gap-1.5 border-t border-border/60 pt-2.5 text-xs">
          {event.involvedEntities.length > 0 && (
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">
                {copy.eventCard.entitiesLabel} :{' '}
              </span>
              <span>{event.involvedEntities.join(', ')}</span>
            </p>
          )}
          {event.consequences && (
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">
                {copy.eventCard.consequencesLabel} :{' '}
              </span>
              <span>{event.consequences}</span>
            </p>
          )}
        </div>
      )}

      {/* Optional GM Secret Note */}
      {showGmSecrets && event.gmSecretNote && (
        <div className="mt-3 rounded-md border border-border/80 bg-muted/35 px-3 py-2 text-xs">
          <div className="mb-0.5 flex items-center gap-1.5 font-medium text-foreground">
            <EyeOff className="size-3 text-primary" aria-hidden="true" />
            <span>{copy.eventCard.gmSecretLabel}</span>
          </div>
          <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
            {event.gmSecretNote}
          </p>
        </div>
      )}
    </article>
  );
}
