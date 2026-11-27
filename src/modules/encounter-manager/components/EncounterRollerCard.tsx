import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Copy,
  Dices,
  Eye,
  History,
  RotateCcw,
  Shield,
  Skull,
  Square,
  Swords,
  Trash2,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  ALL_HUMANOIDS,
  ALL_MONSTERS,
  getCreatureTypeLabel,
  getEnvironmentLabel,
  HUMANOID_ENVIRONMENTS,
  MONSTER_ENVIRONMENTS,
} from '../data';
import { getEncounterManagerCopy } from '../i18n';
import type {
  EncounterEntry,
  EncounterEnvId,
  EncounterKind,
  ModuleLanguage,
  RolledEncounter,
} from '../types';
import {
  formatEncounterAsText,
  getMatchingEncounterPool,
  rollRandomEncounter,
} from '../utils/encounterRoller';

interface EncounterRollerCardProps {
  kind: EncounterKind;
  lang: ModuleLanguage;
  onInspectEntry: (entry: EncounterEntry) => void;
  onSendToCombat?: (entry: EncounterEntry, quantity: number) => void;
  onSendToSimulator?: (entry: EncounterEntry, quantity: number) => void;
}

interface RollHistoryItem extends RolledEncounter {
  rollId: string;
}

const MAX_HISTORY_ITEMS = 8;

interface PersistedRollerSnapshotItem {
  rollId: string;
  entryId: string;
  poolSize: number;
  rolledAt: number;
}

interface PersistedEncounterRollerState {
  selectedEnvironments: EncounterEnvId[];
  includeFanMade: boolean;
  includeEverywhere: boolean;
  includeUniqueNpcs?: boolean;
  history: PersistedRollerSnapshotItem[];
}

function getRollerStorageKey(kind: EncounterKind): string {
  return `witcher-gm-enc-roller-${kind}-v1`;
}

function loadStoredRollerState(
  kind: EncounterKind,
  sourceEntries: readonly EncounterEntry[],
  validEnvironments: readonly EncounterEnvId[]
): {
  selectedEnvironments: EncounterEnvId[];
  includeFanMade: boolean;
  includeEverywhere: boolean;
  includeUniqueNpcs: boolean;
  history: RollHistoryItem[];
} {
  const fallback = {
    selectedEnvironments: ['everywhere'] as EncounterEnvId[],
    includeFanMade: true,
    includeEverywhere: false,
    includeUniqueNpcs: false,
    history: [] as RollHistoryItem[],
  };
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(getRollerStorageKey(kind));
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedEncounterRollerState>;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const envSet = new Set(validEnvironments);
    const selectedEnvironments = Array.isArray(parsed.selectedEnvironments)
      ? parsed.selectedEnvironments.filter((env): env is EncounterEnvId =>
          envSet.has(env)
        )
      : fallback.selectedEnvironments;

    const entryMap = new Map(sourceEntries.map((e) => [e.id, e]));
    const history: RollHistoryItem[] = Array.isArray(parsed.history)
      ? parsed.history
          .map((snap): RollHistoryItem | null => {
            if (!snap || typeof snap !== 'object') return null;
            const found = entryMap.get(snap.entryId);
            if (!found) return null;
            return {
              rollId: typeof snap.rollId === 'string' ? snap.rollId : found.id,
              entry: found,
              poolSize: typeof snap.poolSize === 'number' ? snap.poolSize : 1,
              rolledAt:
                typeof snap.rolledAt === 'number' ? snap.rolledAt : Date.now(),
            };
          })
          .filter((x): x is RollHistoryItem => x !== null)
          .slice(0, MAX_HISTORY_ITEMS)
      : [];

    return {
      selectedEnvironments,
      includeFanMade:
        typeof parsed.includeFanMade === 'boolean'
          ? parsed.includeFanMade
          : true,
      includeEverywhere:
        typeof parsed.includeEverywhere === 'boolean'
          ? parsed.includeEverywhere
          : false,
      includeUniqueNpcs:
        typeof parsed.includeUniqueNpcs === 'boolean'
          ? parsed.includeUniqueNpcs
          : false,
      history,
    };
  } catch {
    return fallback;
  }
}

/**
 * Interactive random encounter generator card for either Monsters or Humanoids.
 * Features multi-select Shadcn Checkbox environment grids, deduplicated pool rolling,
 * optional "Everywhere" and fan-made toggles, full dossier preview, and persistent draw history.
 */
export function EncounterRollerCard({
  kind,
  lang,
  onInspectEntry,
  onSendToCombat,
  onSendToSimulator,
}: EncounterRollerCardProps) {
  const copy = getEncounterManagerCopy(lang);
  const isMonster = kind === 'monster';
  const sourceEntries = isMonster ? ALL_MONSTERS : ALL_HUMANOIDS;
  const environmentList: readonly EncounterEnvId[] = isMonster
    ? MONSTER_ENVIRONMENTS
    : HUMANOID_ENVIRONMENTS;

  const initialStored = useMemo(
    () => loadStoredRollerState(kind, sourceEntries, environmentList),
    [environmentList, kind, sourceEntries]
  );

  const [selectedEnvironments, setSelectedEnvironments] = useState<
    EncounterEnvId[]
  >(initialStored.selectedEnvironments);
  const [includeFanMade, setIncludeFanMade] = useState<boolean>(
    initialStored.includeFanMade
  );
  const [includeEverywhere, setIncludeEverywhere] = useState<boolean>(
    initialStored.includeEverywhere
  );
  const [includeUniqueNpcs, setIncludeUniqueNpcs] = useState<boolean>(
    initialStored.includeUniqueNpcs
  );
  const [history, setHistory] = useState<RollHistoryItem[]>(
    initialStored.history
  );
  const [currentResult, setCurrentResult] = useState<RollHistoryItem | null>(
    initialStored.history[0] ?? null
  );
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [launchQty, setLaunchQty] = useState<number>(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload: PersistedEncounterRollerState = {
        selectedEnvironments,
        includeFanMade,
        includeEverywhere,
        includeUniqueNpcs,
        history: history.slice(0, MAX_HISTORY_ITEMS).map((item) => ({
          rollId: item.rollId,
          entryId: item.entry.id,
          poolSize: item.poolSize,
          rolledAt: item.rolledAt,
        })),
      };
      window.localStorage.setItem(
        getRollerStorageKey(kind),
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [
    history,
    includeEverywhere,
    includeFanMade,
    includeUniqueNpcs,
    kind,
    selectedEnvironments,
  ]);

  const filterOptions = useMemo(
    () => ({
      includeFanMade: isMonster ? includeFanMade : true,
      includeEverywhere,
      includeUniqueNpcs: isMonster ? false : includeUniqueNpcs,
    }),
    [includeEverywhere, includeFanMade, includeUniqueNpcs, isMonster]
  );

  const eligiblePool = useMemo(
    () =>
      getMatchingEncounterPool(
        sourceEntries,
        selectedEnvironments,
        filterOptions
      ),
    [filterOptions, selectedEnvironments, sourceEntries]
  );

  const toggleEnvironment = (envId: EncounterEnvId) => {
    setSelectedEnvironments((prev) =>
      prev.includes(envId)
        ? prev.filter((item) => item !== envId)
        : [...prev, envId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEnvironments([...environmentList]);
  };

  const handleClearAll = () => {
    setSelectedEnvironments([]);
  };

  const handleRoll = () => {
    const rolled = rollRandomEncounter(
      sourceEntries,
      selectedEnvironments,
      filterOptions
    );
    if (!rolled) return;

    const item: RollHistoryItem = {
      ...rolled,
      rollId: `${rolled.entry.id}-${rolled.rolledAt}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,
    };
    setCurrentResult(item);
    setHistory((prev) => [item, ...prev].slice(0, MAX_HISTORY_ITEMS));
  };

  const handleCopy = async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(
        formatEncounterAsText(currentResult.entry, lang)
      );
      toast.success(copy.dossier.copiedToast);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const HeaderIcon = isMonster ? Skull : Users;
  const title = isMonster
    ? copy.roller.monsterTitle
    : copy.roller.humanoidTitle;
  const description = isMonster
    ? copy.roller.monsterDescription
    : copy.roller.humanoidDescription;
  const rollLabel = isMonster
    ? copy.roller.rollMonster
    : copy.roller.rollHumanoid;
  const d = copy.dossier;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-primary">
              <HeaderIcon className="size-4" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
              {eligiblePool.length}
            </span>
            <span className="block text-[11px] text-muted-foreground">
              {copy.roller.matchingCount}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid flex-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Cockpit: Environment Selection, Toggles & Primary Roll CTA */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Environment Checkbox Toolbar */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {copy.roller.environmentsLabel}
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                  className="h-7 px-2 text-xs"
                >
                  <CheckSquare className="size-3.5" aria-hidden="true" />
                  <span>{copy.roller.selectAll}</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-7 px-2 text-xs text-muted-foreground"
                >
                  <Square className="size-3.5" aria-hidden="true" />
                  <span>{copy.roller.clearAll}</span>
                </Button>
              </div>
            </div>

            {/* Environment Multi-Select Grid */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {environmentList.map((envId) => {
                const checkboxId = `encounter-${kind}-env-${envId}`;
                const checked = selectedEnvironments.includes(envId);
                const isAllEnvironments = envId === 'everywhere';

                return (
                  <Label
                    key={envId}
                    htmlFor={checkboxId}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border border-border/80 bg-muted/25 px-2.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted/60 has-data-checked:border-primary/60 has-data-checked:bg-primary/10 ${
                      isAllEnvironments
                        ? 'col-span-2 sm:col-span-3 lg:col-span-2'
                        : ''
                    }`}
                  >
                    <Checkbox
                      id={checkboxId}
                      checked={checked}
                      onCheckedChange={() => toggleEnvironment(envId)}
                    />
                    <span className="truncate">
                      {isAllEnvironments
                        ? copy.roller.allEnvironmentsOption
                        : getEnvironmentLabel(envId, lang)}
                    </span>
                  </Label>
                );
              })}
            </div>
          </div>

          {/* Options + Roll CTA */}
          <div className="flex flex-col gap-3 rounded-lg border border-border/80 bg-muted/20 p-3.5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <Switch
                  id={`encounter-${kind}-everywhere`}
                  checked={includeEverywhere}
                  onCheckedChange={(checked) => setIncludeEverywhere(checked)}
                />
                <Label
                  htmlFor={`encounter-${kind}-everywhere`}
                  className="cursor-pointer text-xs font-medium text-foreground"
                >
                  {copy.roller.includeEverywhere}
                </Label>
              </div>

              {isMonster ? (
                <div className="flex items-center gap-2.5">
                  <Switch
                    id={`encounter-${kind}-fanmade`}
                    checked={includeFanMade}
                    onCheckedChange={(checked) => setIncludeFanMade(checked)}
                  />
                  <Label
                    htmlFor={`encounter-${kind}-fanmade`}
                    className="cursor-pointer text-xs font-medium text-foreground"
                  >
                    {copy.roller.includeFanMade}
                  </Label>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Switch
                    id={`encounter-${kind}-uniquenpcs`}
                    checked={includeUniqueNpcs}
                    onCheckedChange={(checked) => setIncludeUniqueNpcs(checked)}
                  />
                  <Label
                    htmlFor={`encounter-${kind}-uniquenpcs`}
                    className="cursor-pointer text-xs font-medium text-foreground"
                  >
                    {copy.roller.includeUniqueNpcs}
                  </Label>
                </div>
              )}
            </div>

            <Separator />

            <Button
              type="button"
              size="default"
              onClick={handleRoll}
              disabled={eligiblePool.length === 0}
              className="w-full"
            >
              {currentResult ? (
                <RotateCcw data-icon="inline-start" />
              ) : (
                <Dices data-icon="inline-start" />
              )}
              <span>{currentResult ? copy.roller.reroll : rollLabel}</span>
            </Button>
          </div>
        </div>

        {/* Right Panel: Rolled Encounter Dossier & Draw History */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {selectedEnvironments.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-xs text-muted-foreground sm:text-sm">
                {copy.roller.selectEnvHint}
              </p>
            </div>
          ) : eligiblePool.length === 0 ? (
            <div className="flex min-h-60 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border p-6 text-center">
              <p className="text-xs text-muted-foreground sm:text-sm">
                {copy.roller.noMatchesHint}
              </p>
            </div>
          ) : currentResult ? (
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/25 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">
                      {getCreatureTypeLabel(currentResult.entry.typeId, lang)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px] tabular-nums">
                      {d.poolSummary.replace(
                        '{count}',
                        String(currentResult.poolSize)
                      )}
                    </span>
                    {currentResult.entry.isFanMade && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                          {d.fanMadeTag}
                        </span>
                      </>
                    )}
                    {currentResult.entry.isUniqueNpc && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                          {d.uniqueNpcTag}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {currentResult.entry.name[lang]}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onInspectEntry(currentResult.entry)}
                  >
                    <Eye data-icon="inline-start" />
                    <span>{copy.bestiary.inspect}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy data-icon="inline-start" />
                    <span>{d.copy}</span>
                  </Button>
                </div>
              </div>

              <dl className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.threat}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {currentResult.entry.threat[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.reward}
                  </dt>
                  <dd className="font-mono text-sm font-medium text-primary tabular-nums">
                    {currentResult.entry.reward[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground uppercase">
                    <Shield className="size-3" aria-hidden="true" />
                    <span>{d.armor}</span>
                  </dt>
                  <dd className="font-mono text-xs text-foreground tabular-nums">
                    {currentResult.entry.armor[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.organization}
                  </dt>
                  <dd className="text-xs text-foreground">
                    {currentResult.entry.organization[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.intelligence}
                  </dt>
                  <dd className="text-xs text-foreground">
                    {currentResult.entry.intelligence[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.size} / {d.weight}
                  </dt>
                  <dd className="text-xs text-foreground">
                    {currentResult.entry.size[lang]} ·{' '}
                    {currentResult.entry.weight[lang]}
                  </dd>
                </div>

                <div className="rounded-md bg-background/70 px-3 py-2 sm:col-span-2">
                  <dt className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.environments}
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {currentResult.entry.environments.map((envId) => (
                      <span
                        key={envId}
                        className="rounded border border-border bg-card px-2 py-0.5 text-xs text-foreground"
                      >
                        {getEnvironmentLabel(envId, lang)}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              {currentResult.entry.notes[lang].length > 0 && (
                <div className="flex flex-col gap-1.5 border-t border-border/70 pt-3">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {d.notes}
                  </span>
                  {currentResult.entry.notes[lang].map((note, idx) => (
                    <p
                      key={`${currentResult.rollId}-note-${idx}`}
                      className="text-xs leading-relaxed text-muted-foreground"
                    >
                      {note}
                    </p>
                  ))}
                </div>
              )}

              {(onSendToCombat || onSendToSimulator) && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`roller-qty-${kind}`}
                      className="text-xs text-muted-foreground"
                    >
                      {d.quantityLabel}
                    </Label>
                    <Input
                      id={`roller-qty-${kind}`}
                      type="number"
                      min={1}
                      max={8}
                      value={launchQty}
                      onChange={(e) =>
                        setLaunchQty(
                          Math.max(
                            1,
                            Math.min(8, Number.parseInt(e.target.value, 10) || 1)
                          )
                        )
                      }
                      className="h-8 w-16 font-mono text-xs tabular-nums"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {onSendToCombat && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          onSendToCombat(currentResult.entry, launchQty)
                        }
                      >
                        <Swords data-icon="inline-start" />
                        <span>{d.sendToCombat}</span>
                      </Button>
                    )}
                    {onSendToSimulator && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          onSendToSimulator(currentResult.entry, launchQty)
                        }
                      >
                        <BarChart3 data-icon="inline-start" />
                        <span>{d.sendToSimulator}</span>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-60 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border p-6 text-center">
              <Dices className="size-7 text-muted-foreground" aria-hidden="true" />
              <p className="text-sm font-medium text-foreground">
                {copy.roller.emptyResultTitle}
              </p>
              <p className="max-w-sm text-xs text-muted-foreground">
                {copy.roller.emptyResultBody}
              </p>
            </div>
          )}

          {/* Session Draw History */}
          {history.length > 0 && (
            <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
              <div className="flex items-center justify-between">
                <CollapsibleTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 px-2 text-xs text-muted-foreground"
                    >
                      <History className="size-3.5" aria-hidden="true" />
                      <span>
                        {copy.roller.recentRolls} (
                        <span className="font-mono tabular-nums">
                          {history.length}
                        </span>
                        )
                      </span>
                      {historyOpen ? (
                        <ChevronUp className="size-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="size-3.5" aria-hidden="true" />
                      )}
                    </Button>
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setHistory([])}
                  className="h-7 px-2 text-xs text-muted-foreground"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  <span>{copy.roller.clearAll}</span>
                </Button>
              </div>

              <CollapsibleContent className="pt-2">
                <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
                  {history.map((item) => (
                    <button
                      key={item.rollId}
                      type="button"
                      onClick={() => setCurrentResult(item)}
                      className="flex items-center justify-between gap-3 px-3 py-2 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-foreground">
                          {item.entry.name[lang]}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {getCreatureTypeLabel(item.entry.typeId, lang)} ·{' '}
                          {item.entry.threat[lang]}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                        {new Date(item.rolledAt).toLocaleTimeString(
                          lang === 'fr' ? 'fr-FR' : 'en-US',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
