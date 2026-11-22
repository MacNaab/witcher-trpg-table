import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Dices,
  ExternalLink,
  History,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RANDOM_TABLES_REGISTRY, getTableMeta } from '../data/tableRegistry';
import { getRandomTablesCopy } from '../i18n';
import type {
  ModuleLanguage,
  RandomTableId,
  TableCategoryGroup,
  TableRollResult,
} from '../types';
import { formatTableRollAsText, rollRandomTable } from '../utils/roller';

interface RandomTablesSectionProps {
  lang: ModuleLanguage;
}

const TABLE_GROUPS: readonly TableCategoryGroup[] = [
  'locations',
  'quests',
  'npcs',
  'encounters',
  'merchants',
] as const;

const MAX_HISTORY_ITEMS = 12;
const RANDOM_TABLES_STORAGE_KEY = 'witcher-gm-random-tables-v1';

interface PersistedRandomTablesState {
  selectedGroup: 'all' | TableCategoryGroup;
  selectedTableId: RandomTableId;
  history: TableRollResult[];
}

function loadStoredRandomTablesState(): PersistedRandomTablesState {
  const fallback: PersistedRandomTablesState = {
    selectedGroup: 'all',
    selectedTableId: 1,
    history: [],
  };
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(RANDOM_TABLES_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedRandomTablesState>;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const validGroup =
      parsed.selectedGroup === 'all' ||
      (parsed.selectedGroup && TABLE_GROUPS.includes(parsed.selectedGroup))
        ? parsed.selectedGroup
        : 'all';

    const validTableId =
      typeof parsed.selectedTableId === 'number' &&
      RANDOM_TABLES_REGISTRY.some((t) => t.id === parsed.selectedTableId)
        ? (parsed.selectedTableId as RandomTableId)
        : 1;

    const validHistory = Array.isArray(parsed.history)
      ? parsed.history
          .filter(
            (item): item is TableRollResult =>
              Boolean(
                item &&
                  typeof item === 'object' &&
                  typeof item.id === 'string' &&
                  typeof item.tableId === 'number'
              )
          )
          .slice(0, MAX_HISTORY_ITEMS)
      : [];

    return {
      selectedGroup: validGroup,
      selectedTableId: validTableId,
      history: validHistory,
    };
  } catch {
    return fallback;
  }
}

/**
 * Interactive roller for all 26 Game Master random tables with category filtering,
 * structured bilingual rendering, external links, clipboard export, and persistent history.
 */
export function RandomTablesSection({ lang }: RandomTablesSectionProps) {
  const copy = getRandomTablesCopy(lang);
  const initialStored = useMemo(() => loadStoredRandomTablesState(), []);

  const [selectedGroup, setSelectedGroup] = useState<'all' | TableCategoryGroup>(
    initialStored.selectedGroup
  );
  const [selectedTableId, setSelectedTableId] = useState<RandomTableId>(
    initialStored.selectedTableId
  );
  const [history, setHistory] = useState<TableRollResult[]>(initialStored.history);
  const [currentResult, setCurrentResult] = useState<TableRollResult | null>(
    initialStored.history[0] ?? null
  );
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload: PersistedRandomTablesState = {
        selectedGroup,
        selectedTableId,
        history: history.slice(0, MAX_HISTORY_ITEMS),
      };
      window.localStorage.setItem(
        RANDOM_TABLES_STORAGE_KEY,
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [history, selectedGroup, selectedTableId]);

  const filteredTables = useMemo(() => {
    if (selectedGroup === 'all') return RANDOM_TABLES_REGISTRY;
    return RANDOM_TABLES_REGISTRY.filter((t) => t.group === selectedGroup);
  }, [selectedGroup]);

  const activeMeta = useMemo(
    () => getTableMeta(selectedTableId),
    [selectedTableId]
  );

  const handleGroupChange = (group: 'all' | TableCategoryGroup) => {
    setSelectedGroup(group);
    const nextList =
      group === 'all'
        ? RANDOM_TABLES_REGISTRY
        : RANDOM_TABLES_REGISTRY.filter((t) => t.group === group);
    if (nextList.length > 0 && !nextList.some((t) => t.id === selectedTableId)) {
      setSelectedTableId(nextList[0].id);
    }
  };

  const handleGenerate = () => {
    const result = rollRandomTable(selectedTableId);
    setCurrentResult(result);
    setHistory((prev) => [result, ...prev].slice(0, MAX_HISTORY_ITEMS));
  };

  const handleCopyResult = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(
        formatTableRollAsText(currentResult, lang, copy)
      );
      toast.success(copy.tables.copiedToast);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const groupedSelectItems = useMemo(() => {
    const groupsToRender =
      selectedGroup === 'all' ? TABLE_GROUPS : [selectedGroup];
    return groupsToRender
      .map((group) => ({
        group,
        label: copy.tables.groups[group],
        items: filteredTables.filter((t) => t.group === group),
      }))
      .filter((bucket) => bucket.items.length > 0);
  }, [copy.tables.groups, filteredTables, selectedGroup]);

  return (
    <div className="flex flex-col gap-5">
      {/* Control Panel */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base font-semibold">
                {copy.tabs.tables}
              </CardTitle>
              <CardDescription>{activeMeta.subtitle[lang]}</CardDescription>
            </div>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {copy.header.tablesCountLabel}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Category Filter Strip */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label={copy.tables.selectLabel}>
            <Button
              type="button"
              size="sm"
              variant={selectedGroup === 'all' ? 'default' : 'outline'}
              onClick={() => handleGroupChange('all')}
            >
              {copy.tables.filterAll}
            </Button>
            {TABLE_GROUPS.map((group) => (
              <Button
                key={group}
                type="button"
                size="sm"
                variant={selectedGroup === group ? 'default' : 'outline'}
                onClick={() => handleGroupChange(group)}
              >
                {copy.tables.groups[group]}
              </Button>
            ))}
          </div>

          {/* Table Selector + Generate CTA */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="gm-random-table-select">
                {copy.tables.selectLabel}
              </Label>
              <Select
                value={String(selectedTableId)}
                onValueChange={(value) => {
                  if (value) {
                    setSelectedTableId(Number(value) as RandomTableId);
                  }
                }}
              >
                <SelectTrigger
                  id="gm-random-table-select"
                  className="h-9 w-full justify-between"
                >
                  <SelectValue>{activeMeta.title[lang]}</SelectValue>
                </SelectTrigger>
                <SelectContent align="start" className="max-h-80">
                  {groupedSelectItems.map((bucket) => (
                    <SelectGroup key={bucket.group}>
                      <SelectLabel>{bucket.label}</SelectLabel>
                      {bucket.items.map((table) => (
                        <SelectItem key={table.id} value={String(table.id)}>
                          {table.title[lang]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={handleGenerate}
              className="w-full shrink-0 sm:w-auto"
            >
              <Dices data-icon="inline-start" />
              <span>
                {currentResult?.tableId === selectedTableId
                  ? copy.tables.rollAgainButton
                  : copy.tables.generateButton}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Result Card */}
      {currentResult ? (
        <Card>
          <CardHeader className="gap-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {copy.tables.groups[getTableMeta(currentResult.tableId).group]}
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {currentResult.tableTitle[lang]}
                </CardTitle>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const reroll = rollRandomTable(currentResult.tableId);
                    setCurrentResult(reroll);
                    setSelectedTableId(currentResult.tableId);
                    setHistory((prev) =>
                      [reroll, ...prev].slice(0, MAX_HISTORY_ITEMS)
                    );
                  }}
                >
                  <RotateCcw data-icon="inline-start" />
                  <span>{copy.tables.rollAgainButton}</span>
                </Button>
                {currentResult.kind !== 'external' && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyResult}
                  >
                    <Copy data-icon="inline-start" />
                    <span>{copy.tables.copyButton}</span>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-5">
            {/* External Reference Table (Table 24: Mushrooms) */}
            {currentResult.kind === 'external' && (
              <div className="flex flex-col items-start gap-4 rounded-lg bg-muted/40 p-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {copy.tables.externalNotice}
                </p>
                {currentResult.externalUrl && (
                  <a
                    href={currentResult.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: 'default', size: 'sm' })}
                  >
                    <ExternalLink className="size-4" />
                    <span>{copy.tables.openExternalLink}</span>
                  </a>
                )}
              </div>
            )}

            {/* Single-prose result */}
            {currentResult.kind === 'single' && currentResult.body && (
              <p className="text-base leading-relaxed text-foreground">
                {currentResult.body[lang]}
              </p>
            )}

            {/* Titled hook / quirk result */}
            {currentResult.kind === 'titled' && (
              <div className="flex flex-col gap-2">
                {currentResult.headline && (
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    {currentResult.headline[lang]}
                  </h3>
                )}
                {currentResult.body && (
                  <p className="text-base leading-relaxed text-foreground">
                    {currentResult.body[lang]}
                  </p>
                )}
              </div>
            )}

            {/* Structured / Morphology multi-field dossier */}
            {(currentResult.kind === 'structured' ||
              currentResult.kind === 'morphology') &&
              currentResult.fields && (
                <dl className="grid gap-3 md:grid-cols-2">
                  {currentResult.fields.map((field) => (
                    <div
                      key={field.label.en}
                      className="flex flex-col gap-1.5 rounded-lg bg-muted/40 p-3.5"
                    >
                      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {field.label[lang]}
                      </dt>
                      <dd className="text-sm leading-relaxed text-foreground">
                        {field.value[lang]}
                      </dd>
                      {field.subFields && field.subFields.length > 0 && (
                        <div className="mt-1.5 flex flex-col gap-1 border-t border-border/70 pt-2">
                          {field.subFields.map((sub) => (
                            <div
                              key={sub.label.en}
                              className="flex flex-col gap-0.5 text-xs"
                            >
                              <span className="font-medium text-muted-foreground">
                                {sub.label[lang]}
                              </span>
                              <span className="text-foreground">
                                {sub.value[lang]}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </dl>
              )}

            {/* Table 8: Random Possessions (1d10 table) */}
            {currentResult.kind === 'possessions' && currentResult.possessions && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {copy.tables.possessionsCountLabel}
                  </span>
                  <span className="font-mono font-semibold text-foreground tabular-nums">
                    {currentResult.possessions.count}
                  </span>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 font-mono">#</TableHead>
                      <TableHead>
                        {copy.tables.possessionsTiers.ordinary}
                      </TableHead>
                      <TableHead>
                        {copy.tables.possessionsTiers.strange}
                      </TableHead>
                      <TableHead>
                        {copy.tables.possessionsTiers.occult}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentResult.possessions.items.map((item, idx) => (
                      <TableRow key={`${currentResult.id}-${idx}`}>
                        <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          {item.ordinary[lang]}
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          {item.strange[lang]}
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          {item.occult[lang]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-border pt-3 text-xs text-muted-foreground">
            <span>
              {copy.tables.sourcePrefix}{' '}
              {currentResult.attribution.url ? (
                <a
                  href={currentResult.attribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  {currentResult.attribution.author}
                </a>
              ) : (
                <span className="font-medium text-foreground">
                  {currentResult.attribution.author}
                </span>
              )}
            </span>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <Dices className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="text-base font-medium text-foreground">
              {copy.tables.emptyTitle}
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              {copy.tables.emptyDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Collapsible Session History */}
      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger
            render={
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <History className="size-4" />
                <span>
                  {copy.tables.historyTitle} (
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
              <span>{copy.tables.clearHistory}</span>
            </Button>
          )}
        </div>

        <CollapsibleContent className="pt-2">
          {history.length === 0 ? (
            <p className="rounded-lg bg-muted/35 p-4 text-sm text-muted-foreground">
              {copy.tables.historyEmpty}
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentResult(item);
                    setSelectedTableId(item.tableId);
                  }}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.tableTitle[lang]}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.headline?.[lang] ??
                        item.body?.[lang] ??
                        item.fields?.[0]?.value[lang] ??
                        item.externalUrl ??
                        (item.possessions
                          ? `${item.possessions.count} ${copy.tables.possessionsCountLabel}`
                          : '')}
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
