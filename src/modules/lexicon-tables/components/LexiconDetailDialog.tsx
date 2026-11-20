import { Copy, Languages } from 'lucide-react';
import { toast } from 'sonner';
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
import { getLexiconTablesCopy } from '../i18n';
import type { LexiconEntry, ModuleLanguage } from '../types';
import { formatLexiconEntryAsText } from '../utils/lexiconFilters';

interface LexiconDetailDialogProps {
  entry: LexiconEntry | null;
  lang: ModuleLanguage;
  onClose: () => void;
}

/**
 * Side-by-side EN/FR inspection modal showing complete crafting, foraging,
 * or alchemical statistics and dual-language components.
 */
export function LexiconDetailDialog({
  entry,
  lang,
  onClose,
}: LexiconDetailDialogProps) {
  const copy = getLexiconTablesCopy(lang);
  const c = copy.columns;
  const d = copy.detail;

  const handleCopy = async () => {
    if (!entry) return;
    try {
      await navigator.clipboard.writeText(
        formatLexiconEntryAsText(entry, copy, lang)
      );
      toast.success(d.copiedToast);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  return (
    <Dialog
      open={entry !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-xl">
        {entry && (
          <>
            <DialogHeader className="pr-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                  <Languages className="size-3.5" aria-hidden="true" />
                  <span>{copy.tabs[entry.tabId]}</span>
                </span>
                {entry.rowKind !== 'material' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
                      {copy.levels[entry.level]}
                    </span>
                  </>
                )}
                {entry.rowKind === 'diagram' && entry.elderfolkKind && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{copy.elderfolkKinds[entry.elderfolkKind]}</span>
                  </>
                )}
                {entry.rowKind === 'material' && entry.substance && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
                      {copy.substances[entry.substance]}
                    </span>
                  </>
                )}
              </div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-foreground">
                {entry.name[lang]}
              </DialogTitle>
              <DialogDescription>{d.titlePrefix}</DialogDescription>
            </DialogHeader>

            <Separator />

            <ScrollArea className="max-h-[60vh] pr-3">
              <div className="flex flex-col gap-4">
                {/* Side-by-side EN / FR Terms */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-3">
                    <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.englishTerm}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {entry.name.en}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-3">
                    <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.frenchTerm}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {entry.name.fr}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                {entry.rowKind === 'material' && (
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.rarity}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {copy.rarities[entry.rarity].label}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.forageDc}
                      </dt>
                      <dd className="font-mono text-sm font-medium text-foreground tabular-nums">
                        {entry.forageDc}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.quantity}
                      </dt>
                      <dd className="font-mono text-sm text-foreground tabular-nums">
                        {entry.quantity[lang]}
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.weight} / {c.cost}
                      </dt>
                      <dd className="font-mono text-sm text-foreground tabular-nums">
                        {entry.weight} {d.weightUnit} ·{' '}
                        <span className="font-semibold text-primary">
                          {entry.cost} {d.crownsUnit}
                        </span>
                      </dd>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3 sm:col-span-2">
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.location}
                      </dt>
                      <dd className="text-sm text-foreground">
                        <span className="font-medium">{entry.location.en}</span>
                        <span className="mx-2 text-muted-foreground">·</span>
                        <span>{entry.location.fr}</span>
                      </dd>
                    </div>
                  </dl>
                )}

                {entry.rowKind === 'diagram' && (
                  <>
                    <dl className="grid gap-3 sm:grid-cols-2">
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.dc}
                        </dt>
                        <dd className="font-mono text-sm font-semibold text-foreground tabular-nums">
                          {entry.dc}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.time}
                        </dt>
                        <dd className="text-sm text-foreground">
                          {entry.time[lang]}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.investment}
                        </dt>
                        <dd className="font-mono text-sm text-foreground tabular-nums">
                          {entry.investment} {d.crownsUnit}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.cost}
                        </dt>
                        <dd className="font-mono text-sm font-semibold text-primary tabular-nums">
                          {entry.cost} {d.crownsUnit}
                        </dd>
                      </div>
                    </dl>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">
                          {d.englishComponents}
                        </span>
                        <p className="text-xs leading-relaxed text-foreground">
                          {entry.components.en}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">
                          {d.frenchComponents}
                        </span>
                        <p className="text-xs leading-relaxed text-foreground">
                          {entry.components.fr}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {entry.rowKind === 'formula' && (
                  <>
                    <dl className="grid gap-3 sm:grid-cols-3">
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.dc}
                        </dt>
                        <dd className="font-mono text-sm font-semibold text-foreground tabular-nums">
                          {entry.dc}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.time}
                        </dt>
                        <dd className="text-sm text-foreground">
                          {entry.time[lang]}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">
                          {c.cost}
                        </dt>
                        <dd className="font-mono text-sm font-semibold text-primary tabular-nums">
                          {entry.cost} {d.crownsUnit}
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-3">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">
                        {c.components}
                      </span>
                      <p className="text-xs leading-relaxed text-foreground">
                        {entry.components}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopy}
              >
                <Copy data-icon="inline-start" />
                <span>{d.copyRow}</span>
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                {d.close}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
