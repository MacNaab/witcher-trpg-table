import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCampaignChronicleCopy } from '../i18n';
import type {
  ChronicleEvent,
  ChronicleSortOrder,
  ModuleLanguage,
} from '../types';
import {
  formatRealDateLabel,
  groupEventsBySession,
} from '../utils/chronicleStorage';
import { ChronicleEventItem } from './ChronicleEventItem';

interface ChronicleSessionViewProps {
  lang: ModuleLanguage;
  events: readonly ChronicleEvent[];
  sessionDates: Record<string, string>;
  sortOrder: ChronicleSortOrder;
  showGmSecrets: boolean;
  onUpdateSessionRealDate: (sessionNumber: number, isoDate: string) => void;
  onEdit: (event: ChronicleEvent) => void;
  onDuplicate: (event: ChronicleEvent) => void;
  onTogglePin: (eventId: string) => void;
  onCycleStatus: (eventId: string) => void;
  onRequestDelete: (event: ChronicleEvent) => void;
}

/**
 * Groups chronicle events by tabletop Session # (with Session 0 for prep / hooks)
 * and lets the GM assign or edit each session's real-world calendar date inline.
 */
export function ChronicleSessionView({
  lang,
  events,
  sessionDates,
  sortOrder,
  showGmSecrets,
  onUpdateSessionRealDate,
  onEdit,
  onDuplicate,
  onTogglePin,
  onCycleStatus,
  onRequestDelete,
}: ChronicleSessionViewProps) {
  const copy = getCampaignChronicleCopy(lang);
  const groups = groupEventsBySession(events, sortOrder);

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => {
        const rawIsoDate =
          group.sessionNumber > 0
            ? (sessionDates[String(group.sessionNumber)] ?? '')
            : '';
        const formattedRealDate = formatRealDateLabel(rawIsoDate, lang);
        const inputId = `chronicle-session-realdate-${group.sessionNumber}`;

        return (
          <section key={group.sessionNumber} className="flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2.5">
              <div className="flex flex-wrap items-baseline gap-2.5">
                <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">
                  {group.sessionNumber > 0
                    ? copy.eventCard.sessionLabel(group.sessionNumber)
                    : copy.eventCard.unassignedSession}
                </h2>
                {group.sessionNumber > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5 text-primary" aria-hidden="true" />
                    <span className="font-mono tabular-nums">
                      {formattedRealDate ?? copy.sessionView.realDateUnset}
                    </span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {group.sessionNumber > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor={inputId}
                      className="text-xs font-normal text-muted-foreground"
                    >
                      {copy.sessionView.realDateLabel}
                    </Label>
                    <Input
                      id={inputId}
                      type="date"
                      value={rawIsoDate}
                      onChange={(e) =>
                        onUpdateSessionRealDate(
                          group.sessionNumber,
                          e.target.value
                        )
                      }
                      className="h-7 w-[142px] px-2 font-mono text-xs tabular-nums"
                    />
                    {rawIsoDate && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          onUpdateSessionRealDate(group.sessionNumber, '')
                        }
                        aria-label={copy.sessionView.clearRealDateAction}
                        title={copy.sessionView.clearRealDateAction}
                        className="text-muted-foreground"
                      >
                        <X className="size-3.5" aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                )}

                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {copy.campaignBar.eventsCount(group.events.length)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {group.events.map((ev) => (
                <ChronicleEventItem
                  key={ev.id}
                  lang={lang}
                  event={ev}
                  sessionRealDate={rawIsoDate || undefined}
                  showGmSecrets={showGmSecrets}
                  onEdit={onEdit}
                  onDuplicate={onDuplicate}
                  onTogglePin={onTogglePin}
                  onCycleStatus={onCycleStatus}
                  onRequestDelete={onRequestDelete}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
