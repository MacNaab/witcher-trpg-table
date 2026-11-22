import { useState } from 'react';
import { ScrollText, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type {
  CalendarLogEntry,
  ModuleLanguage,
} from '@/src/utils/continentCalendar';
import type { CampaignCalendarCopy } from '../i18n';

interface CalendarLogPanelProps {
  logs: CalendarLogEntry[];
  lang: ModuleLanguage;
  copy: CampaignCalendarCopy;
  onAddNote: (text: string) => void;
  onClearLogs: () => void;
}

export function CalendarLogPanel({
  logs,
  lang,
  copy,
  onAddNote,
  onClearLogs,
}: CalendarLogPanelProps) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteText.trim();
    if (!trimmed) return;
    onAddNote(trimmed);
    setNoteText('');
  };

  return (
    <Card className="border-border">
      <CardHeader className="gap-3 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <ScrollText className="size-5 text-primary" aria-hidden="true" />
              <span>{copy.log.title}</span>
            </CardTitle>
            <CardDescription>{copy.log.subtitle}</CardDescription>
          </div>

          {logs.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClearLogs}
            >
              <Trash2 data-icon="inline-start" className="size-3.5" />
              <span>{copy.log.clearBtn}</span>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={copy.log.notePlaceholder}
            className="h-9 flex-1 text-xs"
          />
          <Button type="submit" size="sm">
            <Send data-icon="inline-start" className="size-3.5" />
            <span>{copy.log.addNoteBtn}</span>
          </Button>
        </form>

        {logs.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            {copy.log.emptyLabel}
          </p>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-card">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-1 px-3.5 py-2.5 text-xs sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-mono text-[11px] font-semibold text-primary tabular-nums">
                    {entry.dateLabel[lang]}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    · {copy.log.kinds[entry.kind]}
                  </span>
                  <span className="text-foreground">{entry.message[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
