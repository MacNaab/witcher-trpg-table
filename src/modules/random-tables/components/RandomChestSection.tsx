import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Coins,
  Copy,
  History,
  PackageOpen,
  RotateCcw,
  Settings2,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ARMOR_DATA,
  GEAR_ITEMS,
  POTIONS_DATA,
  WEAPONS_DATA,
} from '@/src/data/items';
import { ALL_LEXICON_ENTRIES } from '@/src/modules/lexicon-tables/data';
import type { LexiconEntry } from '@/src/modules/lexicon-tables/types';
import type { ModuleId, ModuleLaunchIntent } from '@/src/types/navigation';
import {
  BURNING_ROLL20_CHEST_RATES,
  CHEST_CATEGORY_ROLL_COUNTS,
  DEFAULT_CHEST_RATES,
} from '../data/chestLootData';
import { getRandomTablesCopy } from '../i18n';
import type {
  ChestCategoryId,
  ChestDropRates,
  ChestLootEntry,
  ChestRollResult,
  ModuleLanguage,
} from '../types';
import { formatChestRollAsText, rollChestLoot } from '../utils/roller';

interface RandomChestSectionProps {
  lang: ModuleLanguage;
  onNavigateModule?: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
}

function normalizeLootLookup(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, "'")
    .replace(/^(ammunition|munitions)\s*:\s*/i, '')
    .replace(/\s*\(?\s*x\d+\s*\)?$/i, '')
    .toLowerCase()
    .trim();
}

const CHEST_RATES_STORAGE_KEY = 'witcher-gm-chest-rates-v1';
const CHEST_HISTORY_STORAGE_KEY = 'witcher-gm-chest-history-v1';
const MAX_CHEST_HISTORY = 12;

function loadStoredChestRates(): ChestDropRates {
  if (typeof window === 'undefined') return DEFAULT_CHEST_RATES;
  try {
    const raw = window.localStorage.getItem(CHEST_RATES_STORAGE_KEY);
    if (!raw) return DEFAULT_CHEST_RATES;
    const parsed = JSON.parse(raw) as Partial<ChestDropRates>;
    if (!parsed || typeof parsed !== 'object') return DEFAULT_CHEST_RATES;
    return {
      ...DEFAULT_CHEST_RATES,
      ...parsed,
    };
  } catch {
    return DEFAULT_CHEST_RATES;
  }
}

function loadStoredChestHistory(): ChestRollResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CHEST_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is ChestRollResult =>
          Boolean(
            item &&
              typeof item === 'object' &&
              typeof item.id === 'string' &&
              typeof item.crowns === 'number' &&
              Array.isArray(item.items)
          )
      )
      .slice(0, MAX_CHEST_HISTORY);
  } catch {
    return [];
  }
}

const PERCENTAGE_CATEGORIES: readonly Exclude<ChestCategoryId, 'relic'>[] = [
  'gear',
  'weapon',
  'armor',
  'diagram',
  'formula',
  'alchemy',
  'glyph',
  'rune',
  'efWeapon',
  'efArmor',
] as const;

/**
 * Random Chest generator implementing both Godzilla's 193-crown defaults
 * and Burning's Roll20 300-crown Witcher Loot preset, with editable drop rates.
 */
export function RandomChestSection({
  lang,
  onNavigateModule,
}: RandomChestSectionProps) {
  const copy = getRandomTablesCopy(lang);

  const lootResolvers = useMemo(() => {
    const lexiconMap = new Map<string, LexiconEntry>();
    for (const entry of ALL_LEXICON_ENTRIES) {
      if (entry.rowKind === 'diagram' || entry.rowKind === 'formula') {
        lexiconMap.set(normalizeLootLookup(entry.name.en), entry);
        lexiconMap.set(normalizeLootLookup(entry.name.fr), entry);
      }
    }

    const catalogSummaryMap = new Map<string, string>();
    for (const w of WEAPONS_DATA) {
      const summary = `${w.damage} · ${w.priceDisplay}`;
      catalogSummaryMap.set(normalizeLootLookup(w.name.en), summary);
      catalogSummaryMap.set(normalizeLootLookup(w.name.fr), summary);
    }
    for (const a of ARMOR_DATA) {
      const summary = `PA ${a.sp} · ${a.priceDisplay}`;
      catalogSummaryMap.set(normalizeLootLookup(a.name.en), summary);
      catalogSummaryMap.set(normalizeLootLookup(a.name.fr), summary);
    }
    for (const p of POTIONS_DATA) {
      const summary = `${p.type} · ${p.priceDisplay}`;
      catalogSummaryMap.set(normalizeLootLookup(p.name.en), summary);
      catalogSummaryMap.set(normalizeLootLookup(p.name.fr), summary);
    }
    for (const g of GEAR_ITEMS) {
      const summary = `${g.priceDisplay}`;
      catalogSummaryMap.set(normalizeLootLookup(g.name.en), summary);
      catalogSummaryMap.set(normalizeLootLookup(g.name.fr), summary);
    }

    const resolveLootMeta = (entry: ChestLootEntry) => {
      const enKey = normalizeLootLookup(entry.name.en);
      const frKey = normalizeLootLookup(entry.name.fr);

      const lexiconMatch =
        entry.category === 'diagram' || entry.category === 'formula'
          ? lexiconMap.get(enKey) ?? lexiconMap.get(frKey) ?? null
          : null;

      const summary =
        lexiconMatch && (lexiconMatch.rowKind === 'diagram' || lexiconMatch.rowKind === 'formula')
          ? `SD ${lexiconMatch.dc} · ${lexiconMatch.cost} cr.`
          : catalogSummaryMap.get(enKey) ?? catalogSummaryMap.get(frKey) ?? null;

      return { lexiconMatch, summary };
    };

    return { resolveLootMeta };
  }, []);

  const [rates, setRates] = useState<ChestDropRates>(() => loadStoredChestRates());
  const [draftRates, setDraftRates] = useState<ChestDropRates>(() =>
    loadStoredChestRates()
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [history, setHistory] = useState<ChestRollResult[]>(() =>
    loadStoredChestHistory()
  );
  const [historyOpen, setHistoryOpen] = useState(false);
  const [result, setResult] = useState<ChestRollResult | null>(() => {
    const stored = loadStoredChestHistory();
    return stored[0] ?? null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        CHEST_RATES_STORAGE_KEY,
        JSON.stringify(rates)
      );
    } catch {
      // Ignore quota errors
    }
  }, [rates]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        CHEST_HISTORY_STORAGE_KEY,
        JSON.stringify(history)
      );
    } catch {
      // Ignore quota errors
    }
  }, [history]);

  const handleOpenDialog = (open: boolean) => {
    setDialogOpen(open);
    if (open) {
      setDraftRates(rates);
    }
  };

  const updateDraftNumber = (
    field: keyof ChestDropRates,
    raw: string,
    maxLimit: number
  ) => {
    const parsed = Number.parseFloat(raw);
    const sanitized = Number.isFinite(parsed)
      ? Math.max(0, Math.min(maxLimit, parsed))
      : 0;
    setDraftRates((prev) => ({ ...prev, [field]: sanitized }));
  };

  const handleSaveRates = () => {
    setRates(draftRates);
    setDialogOpen(false);
  };

  const handleGenerate = () => {
    const rolled = rollChestLoot(rates);
    setResult(rolled);
    setHistory((prev) => [rolled, ...prev].slice(0, MAX_CHEST_HISTORY));
  };

  const handleCopyLoot = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        formatChestRollAsText(result, lang, copy)
      );
      toast.success(copy.chest.copiedToast);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Control Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                {copy.chest.title}
              </CardTitle>
              <CardDescription>{copy.chest.description}</CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Dialog open={dialogOpen} onOpenChange={handleOpenDialog}>
                <DialogTrigger
                  render={
                    <Button type="button" variant="outline" size="sm">
                      <Settings2 data-icon="inline-start" />
                      <span>{copy.chest.editRatesButton}</span>
                    </Button>
                  }
                />
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{copy.chest.dialogTitle}</DialogTitle>
                    <DialogDescription>
                      {copy.chest.dialogDescription}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Presets */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setDraftRates(DEFAULT_CHEST_RATES)}
                    >
                      {copy.chest.presetStandard}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setDraftRates(BURNING_ROLL20_CHEST_RATES)}
                    >
                      {copy.chest.presetBurning}
                    </Button>
                  </div>

                  <Separator />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="chest-rate-maxCrown">
                        {copy.chest.maxCrownLabel}
                      </Label>
                      <Input
                        id="chest-rate-maxCrown"
                        type="number"
                        min={0}
                        max={100000}
                        value={draftRates.maxCrown}
                        onChange={(e) =>
                          updateDraftNumber('maxCrown', e.target.value, 100000)
                        }
                        className="font-mono tabular-nums"
                      />
                    </div>

                    {PERCENTAGE_CATEGORIES.map((category) => (
                      <div key={category} className="flex flex-col gap-1.5">
                        <Label
                          htmlFor={`chest-rate-${category}`}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <span>{copy.chest.categories[category]}</span>
                          <span className="font-mono text-muted-foreground tabular-nums">
                            {CHEST_CATEGORY_ROLL_COUNTS[category]}× · %
                          </span>
                        </Label>
                        <Input
                          id={`chest-rate-${category}`}
                          type="number"
                          min={0}
                          max={100}
                          value={draftRates[category]}
                          onChange={(e) =>
                            updateDraftNumber(category, e.target.value, 100)
                          }
                          className="font-mono tabular-nums"
                        />
                      </div>
                    ))}

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label
                        htmlFor="chest-rate-relic"
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <span>{copy.chest.categories.relic}</span>
                        <span className="font-mono text-muted-foreground tabular-nums">
                          ‰ (0–1000)
                        </span>
                      </Label>
                      <Input
                        id="chest-rate-relic"
                        type="number"
                        min={0}
                        max={1000}
                        value={draftRates.relicPerMille}
                        onChange={(e) =>
                          updateDraftNumber('relicPerMille', e.target.value, 1000)
                        }
                        className="font-mono tabular-nums"
                      />
                    </div>
                  </div>

                  <DialogFooter className="sm:justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDraftRates(DEFAULT_CHEST_RATES)}
                    >
                      <RotateCcw data-icon="inline-start" />
                      <span>{copy.chest.resetDefaults}</span>
                    </Button>
                    <div className="flex items-center gap-2">
                      <DialogClose
                        render={
                          <Button type="button" variant="outline" size="sm">
                            {copy.chest.cancel}
                          </Button>
                        }
                      />
                      <Button type="button" size="sm" onClick={handleSaveRates}>
                        {copy.chest.saveRates}
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button type="button" size="sm" onClick={handleGenerate}>
                <PackageOpen data-icon="inline-start" />
                <span>{copy.chest.generateButton}</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <Separator />

        {/* Active Drop Rates Compact Readout */}
        <CardContent className="pt-4">
          <div className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.chest.ratesSummaryTitle}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1">
              <span className="text-muted-foreground">{copy.chest.crownsLabel}</span>
              <span className="font-mono font-medium text-foreground tabular-nums">
                1–{rates.maxCrown}
              </span>
            </div>
            {PERCENTAGE_CATEGORIES.map((category) => (
              <div
                key={category}
                className="flex items-center justify-between gap-2 border-b border-border/50 pb-1"
              >
                <span className="truncate text-muted-foreground">
                  {copy.chest.categories[category]} ({CHEST_CATEGORY_ROLL_COUNTS[category]}×)
                </span>
                <span className="font-mono font-medium text-foreground tabular-nums">
                  {rates[category]}%
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1">
              <span className="text-muted-foreground">
                {copy.chest.categories.relic}
              </span>
              <span className="font-mono font-medium text-foreground tabular-nums">
                {(rates.relicPerMille / 10).toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {result ? (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Coins className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <CardDescription>{copy.chest.crownsLabel}</CardDescription>
                  <CardTitle className="font-mono text-2xl font-semibold tabular-nums">
                    {result.crowns}
                  </CardTitle>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {copy.chest.itemsCountLabel}:{' '}
                  <span className="font-mono font-semibold text-foreground tabular-nums">
                    {result.items.length}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyLoot}
                >
                  <Copy data-icon="inline-start" />
                  <span>{copy.chest.copyButton}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-4">
            {result.items.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">
                {copy.chest.emptyChestLoot}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">
                      {copy.chest.itemsCountLabel}
                    </TableHead>
                    <TableHead>Item</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.items.map((entry, idx) => {
                    const { lexiconMatch, summary } =
                      lootResolvers.resolveLootMeta(entry);
                    return (
                      <TableRow key={`${result.id}-${entry.category}-${idx}`}>
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          {copy.chest.categories[entry.category]}
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium text-foreground">
                                {entry.name[lang]}
                              </span>
                              {summary && (
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  {summary}
                                </span>
                              )}
                            </div>

                            {lexiconMatch && onNavigateModule && (
                              <Button
                                type="button"
                                variant="outline"
                                size="xs"
                                onClick={() =>
                                  onNavigateModule('lexicon-tables', {
                                    tab: lexiconMatch.tabId,
                                    entryId: lexiconMatch.id,
                                  })
                                }
                                className="gap-1 text-xs"
                              >
                                <BookOpen className="size-3 text-primary" />
                                <span>{copy.chest.openInCodexBtn}</span>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>

          <CardFooter className="border-t border-border pt-3 text-xs text-muted-foreground">
            <span>
              {copy.chest.creditPrefix}{' '}
              <span className="font-medium text-foreground">
                {copy.chest.creditAuthor}
              </span>
            </span>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <PackageOpen className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="text-base font-medium text-foreground">
              {copy.chest.emptyTitle}
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              {copy.chest.emptyDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Collapsible Chest History */}
      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger
            render={
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <History className="size-4" />
                <span>
                  {copy.chest.historyTitle} (
                  <span className="font-mono tabular-nums">{history.length}</span>)
                </span>
                {historyOpen ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </Button>
            }
          />
          {history.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setHistory([])}
              className="text-muted-foreground"
            >
              <Trash2 data-icon="inline-start" />
              <span>{copy.chest.clearHistory}</span>
            </Button>
          )}
        </div>

        <CollapsibleContent className="pt-2">
          {history.length === 0 ? (
            <p className="rounded-lg bg-muted/35 p-4 text-sm text-muted-foreground">
              {copy.chest.historyEmpty}
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setResult(item)}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm font-medium text-foreground tabular-nums">
                      {item.crowns} {copy.chest.crownsLabel} · {item.items.length}{' '}
                      {copy.chest.itemsCountLabel.toLowerCase()}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.items.length > 0
                        ? item.items
                            .slice(0, 3)
                            .map((entry) => entry.name[lang])
                            .join(', ')
                        : copy.chest.emptyChestLoot}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {new Date(item.timestamp).toLocaleTimeString(
                      lang === 'fr' ? 'fr-FR' : 'en-US',
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
