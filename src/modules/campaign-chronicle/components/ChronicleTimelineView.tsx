import { Calendar, Sparkles } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getMonthDef, getSeasonLabel } from '@/src/utils/continentCalendar';
import { getCampaignChronicleCopy } from '../i18n';
import type {
  ChronicleEvent,
  ChronicleEventStatus,
  ChronicleSortOrder,
  ModuleLanguage,
} from '../types';
import {
  formatEventDateLabel,
  formatRealDateLabel,
  groupEventsByMonth,
} from '../utils/chronicleStorage';
import { ChronicleEventItem } from './ChronicleEventItem';

interface ChronicleTimelineViewProps {
  lang: ModuleLanguage;
  events: readonly ChronicleEvent[];
  sessionDates: Record<string, string>;
  sortOrder: ChronicleSortOrder;
  showGmSecrets: boolean;
  onEdit: (event: ChronicleEvent) => void;
  onDuplicate: (event: ChronicleEvent) => void;
  onTogglePin: (eventId: string) => void;
  onCycleStatus: (eventId: string) => void;
  onRequestDelete: (event: ChronicleEvent) => void;
}

function getStatusNodeStyle(status: ChronicleEventStatus): string {
  switch (status) {
    case 'active':
      return 'border-amber-500 bg-amber-500';
    case 'upcoming':
      return 'border-sky-500 bg-background';
    case 'consequence':
      return 'border-rose-500 bg-rose-500/25';
    case 'completed':
      return 'border-emerald-500 bg-emerald-500';
  }
}

/**
 * Bilateral alternating visual timeline ("Frise chronologique"):
 * - Top interactive horizontal period scrubber & status legend
 * - Continuous central spine on desktop (@3xl+) with left/right alternating event cards
 *   and opposite-side Continent + real-world session date anchors
 * - Clean left-rail vertical timeline fallback on narrow viewports
 */
export function ChronicleTimelineView({
  lang,
  events,
  sessionDates,
  sortOrder,
  showGmSecrets,
  onEdit,
  onDuplicate,
  onTogglePin,
  onCycleStatus,
  onRequestDelete,
}: ChronicleTimelineViewProps) {
  const copy = getCampaignChronicleCopy(lang);
  const monthGroups = groupEventsByMonth(events);

  const scrollToPeriod = (key: string) => {
    const el = document.getElementById(`chronicle-period-${key}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  let runningIndex = 0;

  return (
    <div className="@container flex flex-col gap-6">
      {/* Horizontal Period Milestone Scrubber & Axis Legend */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {copy.timelineView.jumpToPeriodLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">
              {copy.timelineView.axisDirectionHint(sortOrder === 'asc')}
            </span>
          </div>

          {/* Axis Node Status Legend */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2 border-emerald-500 bg-emerald-500" />
              <span>{copy.eventStatus.completed}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2 border-amber-500 bg-amber-500" />
              <span>{copy.eventStatus.active}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2 border-sky-500 bg-background" />
              <span>{copy.eventStatus.upcoming}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2 border-rose-500 bg-rose-500/25" />
              <span>{copy.eventStatus.consequence}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <span className="size-2.5 rounded-full border-2 border-primary bg-primary ring-2 ring-primary/25" />
              <span>{copy.timelineView.turningPointBadge}</span>
            </span>
          </div>
        </div>

        <ScrollArea className="w-full">
          <div className="relative flex w-max min-w-full items-center gap-6 px-2 pt-1 pb-2.5">
            <div
              aria-hidden="true"
              className="absolute top-[11px] right-4 left-4 h-px bg-border"
            />
            {monthGroups.map((group) => {
              const monthDef = getMonthDef(group.monthIndex);
              return (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => scrollToPeriod(group.key)}
                  className="group relative z-10 flex shrink-0 cursor-pointer flex-col items-center gap-1 rounded-md px-2 py-0.5 transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span className="size-3 rounded-full border-2 border-primary bg-card transition-transform group-hover:scale-125 group-hover:bg-primary" />
                  <span className="font-display text-xs font-semibold whitespace-nowrap text-foreground">
                    {monthDef.name[lang]} {group.year}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {copy.campaignBar.eventsCount(group.events.length)}
                  </span>
                </button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Main Vertical Spine Timeline */}
      <div className="relative flex flex-col gap-10 pb-4">
        {/* Continuous Vertical Spine: Left on narrow, Dead Center on @3xl+ */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-3 w-0.5 bg-border @3xl:left-1/2 @3xl:-translate-x-1/2"
        />

        {monthGroups.map((group) => {
          const monthDef = getMonthDef(group.monthIndex);
          const seasonLabel = getSeasonLabel(monthDef.season)[lang];

          return (
            <section
              key={group.key}
              id={`chronicle-period-${group.key}`}
              className="relative flex scroll-mt-4 flex-col gap-6"
            >
              {/* Elven Month & Year Milestone Banner anchored directly on the spine */}
              <div className="relative z-10 flex items-center pl-8 @3xl:justify-center @3xl:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-1.5 size-3.5 rotate-45 border-2 border-primary bg-background @3xl:hidden"
                />
                <div className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-0.5 rounded-lg border border-border bg-card px-4 py-2 shadow-xs">
                  <h2 className="font-display text-base font-semibold tracking-wide text-foreground @3xl:text-lg">
                    {monthDef.name[lang]}{' '}
                    <span className="font-mono tabular-nums">{group.year}</span>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    {seasonLabel} · {monthDef.meaning[lang]}
                  </span>
                  <span className="font-mono text-xs font-medium text-primary tabular-nums">
                    ({group.events.length})
                  </span>
                </div>
              </div>

              {/* Alternating Event Rows along the Spine */}
              <div className="flex flex-col gap-6">
                {group.events.map((ev) => {
                  const isLeftSide = runningIndex % 2 === 0;
                  runningIndex += 1;

                  const isTurningPoint = ev.importance === 'turning-point';
                  const nodeStyle = getStatusNodeStyle(ev.status);
                  const dateLabel = formatEventDateLabel(ev.date, lang);
                  const timeLabel = copy.timeOfDay[ev.date.timeOfDay];
                  const rawRealDate =
                    ev.sessionNumber > 0
                      ? sessionDates[String(ev.sessionNumber)]
                      : undefined;
                  const formattedRealDate = formatRealDateLabel(
                    rawRealDate,
                    lang
                  );
                  const sessionLabel =
                    ev.sessionNumber > 0
                      ? copy.eventCard.sessionLabel(ev.sessionNumber)
                      : copy.eventCard.unassignedSession;

                  return (
                    <div
                      key={ev.id}
                      className="relative pl-8 @3xl:grid @3xl:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] @3xl:items-start @3xl:pl-0"
                    >
                      {/* Mobile Left-Rail Node + Horizontal Tick */}
                      <div
                        aria-hidden="true"
                        className="absolute top-5 left-0 flex items-center @3xl:hidden"
                      >
                        <span
                          className={`ml-[5px] flex size-3.5 shrink-0 items-center justify-center rounded-full border-2 ${
                            isTurningPoint ? 'ring-4 ring-primary/20' : ''
                          } ${nodeStyle}`}
                        />
                        <span className="h-px w-3.5 bg-border" />
                      </div>

                      {/* Desktop Center Spine Node */}
                      <div
                        aria-hidden="true"
                        className="hidden @3xl:col-start-2 @3xl:row-start-1 @3xl:mt-5 @3xl:flex @3xl:justify-center"
                      >
                        <span
                          className={`relative z-10 flex size-4 items-center justify-center rounded-full border-2 transition-transform ${
                            isTurningPoint
                              ? 'size-4.5 ring-4 ring-primary/25'
                              : ''
                          } ${nodeStyle}`}
                        />
                      </div>

                      {/* Event Card Column (alternating Left / Right on @3xl+) */}
                      <div
                        className={`relative @3xl:row-start-1 ${
                          isLeftSide ? '@3xl:col-start-1' : '@3xl:col-start-3'
                        }`}
                      >
                        {/* Horizontal Connector Branch to Center Node */}
                        <span
                          aria-hidden="true"
                          className={`hidden @3xl:block @3xl:absolute @3xl:top-7 @3xl:h-px @3xl:w-7 @3xl:bg-border ${
                            isLeftSide ? '@3xl:-right-7' : '@3xl:-left-7'
                          }`}
                        />
                        <ChronicleEventItem
                          lang={lang}
                          event={ev}
                          sessionRealDate={rawRealDate}
                          hideBilateralDate
                          showGmSecrets={showGmSecrets}
                          onEdit={onEdit}
                          onDuplicate={onDuplicate}
                          onTogglePin={onTogglePin}
                          onCycleStatus={onCycleStatus}
                          onRequestDelete={onRequestDelete}
                        />
                      </div>

                      {/* Opposite-Side Chronological Date & Session Anchor (@3xl+) */}
                      <div
                        className={`hidden @3xl:row-start-1 @3xl:flex @3xl:flex-col @3xl:gap-1 @3xl:pt-3.5 ${
                          isLeftSide
                            ? '@3xl:col-start-3 @3xl:items-start @3xl:pl-1.5 @3xl:text-left'
                            : '@3xl:col-start-1 @3xl:items-end @3xl:pr-1.5 @3xl:text-right'
                        }`}
                      >
                        <div className="font-display text-base font-semibold tracking-tight text-foreground">
                          {dateLabel}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                          <span>{timeLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-foreground/90 tabular-nums">
                            {sessionLabel}
                          </span>
                        </div>
                        {formattedRealDate && (
                          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-primary tabular-nums">
                            <Calendar className="size-3 shrink-0" aria-hidden="true" />
                            <span>{formattedRealDate}</span>
                          </div>
                        )}
                        {isTurningPoint && (
                          <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                            <Sparkles className="size-3 shrink-0" aria-hidden="true" />
                            <span>{copy.timelineView.turningPointBadge}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Terminal End Anchor on the Spine */}
        <div
          aria-hidden="true"
          className="relative z-10 flex pl-[7px] @3xl:justify-center @3xl:pl-0"
        >
          <span className="size-2.5 rounded-full border border-border bg-muted" />
        </div>
      </div>
    </div>
  );
}
