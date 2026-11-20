import { Activity, Minus, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { PRIMARY_STAT_KEYS } from '../data/racesAndProfessions';
import type { DerivedStatKey } from '../data/rulesDescriptions';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  ModuleLanguage,
  PrimaryStatKey,
} from '../types';
import {
  calculateDerivedStats,
  getStatPointsSpent,
} from '../utils/characterCalculations';
import { RuleDescriptionTooltip } from './RuleDescriptionTooltip';

interface StepStatsCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (
    updater: (prev: CharacterSheetState) => CharacterSheetState
  ) => void;
}

const STAT_BUDGET_PRESETS = [50, 60, 70, 75] as const;

/**
 * Step 3: Primary stats allocator (Simple cap 10 / strict budget vs. Advanced cap 13 / flexible)
 * paired with live Derived Statistics (STUN, RUN, LEAP, HP, STA, REC, ENC, VIGOR).
 */
export function StepStatsCard({
  lang,
  state,
  onUpdateState,
}: StepStatsCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const spent = getStatPointsSpent(state);
  const remaining = state.statBudget - spent;
  const maxPerStat =
    state.mode === 'advanced' && state.allowStatCap13 ? 13 : 10;
  const derived = calculateDerivedStats(state);

  const adjustStat = (key: PrimaryStatKey, delta: number) => {
    onUpdateState((prev) => {
      const cap = prev.mode === 'advanced' && prev.allowStatCap13 ? 13 : 10;
      const cur = prev.stats[key] ?? 1;
      const next = Math.max(1, Math.min(cap, cur + delta));
      if (next === cur) return prev;
      if (
        delta > 0 &&
        !prev.ignoreStatBudget &&
        getStatPointsSpent(prev) + delta > prev.statBudget
      ) {
        return prev;
      }
      return {
        ...prev,
        stats: {
          ...prev.stats,
          [key]: next,
        },
      };
    });
  };

  const handleBalancedFill = () => {
    onUpdateState((prev) => {
      const cap = prev.mode === 'advanced' && prev.allowStatCap13 ? 13 : 10;
      const basePerStat = Math.max(
        1,
        Math.min(cap, Math.floor(prev.statBudget / PRIMARY_STAT_KEYS.length))
      );
      const nextStats = { ...prev.stats };
      let sum = 0;
      for (const k of PRIMARY_STAT_KEYS) {
        nextStats[k] = basePerStat;
        sum += basePerStat;
      }
      let extra = prev.statBudget - sum;
      let idx = 0;
      while (extra > 0 && idx < PRIMARY_STAT_KEYS.length * 4) {
        const k = PRIMARY_STAT_KEYS[idx % PRIMARY_STAT_KEYS.length];
        if (nextStats[k] < cap) {
          nextStats[k] += 1;
          extra -= 1;
        }
        idx += 1;
      }
      return { ...prev, stats: nextStats };
    });
  };

  const handleResetAllToOne = () => {
    onUpdateState((prev) => {
      const nextStats = { ...prev.stats };
      for (const k of PRIMARY_STAT_KEYS) nextStats[k] = 1;
      return { ...prev, stats: nextStats };
    });
  };

  const derivedItems: Array<{
    key: DerivedStatKey;
    label: string;
    value: string;
    formula: string;
  }> = [
    {
      key: 'hp',
      label: copy.stats.derivedNames.hp,
      value: String(derived.hp),
      formula: copy.stats.derivedFormulas.hp,
    },
    {
      key: 'stamina',
      label: copy.stats.derivedNames.stamina,
      value: String(derived.stamina),
      formula: copy.stats.derivedFormulas.stamina,
    },
    {
      key: 'recovery',
      label: copy.stats.derivedNames.recovery,
      value: String(derived.recovery),
      formula: copy.stats.derivedFormulas.recovery,
    },
    {
      key: 'stun',
      label: copy.stats.derivedNames.stun,
      value: String(derived.stun),
      formula: copy.stats.derivedFormulas.stun,
    },
    {
      key: 'run',
      label: copy.stats.derivedNames.run,
      value: `${derived.run} m`,
      formula: copy.stats.derivedFormulas.run,
    },
    {
      key: 'leap',
      label: copy.stats.derivedNames.leap,
      value: `${derived.leap} m`,
      formula: copy.stats.derivedFormulas.leap,
    },
    {
      key: 'encumbrance',
      label: copy.stats.derivedNames.encumbrance,
      value: `${derived.encumbrance} kg`,
      formula:
        state.raceId === 'dwarf'
          ? `${copy.stats.derivedFormulas.encumbrance} · ${copy.stats.dwarfEncNote}`
          : state.raceId === 'gnome'
            ? copy.stats.gnomeEncNote
            : copy.stats.derivedFormulas.encumbrance,
    },
    {
      key: 'vigor',
      label: copy.stats.derivedNames.vigor,
      value: String(derived.vigor),
      formula: copy.stats.derivedFormulas.vigor,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            <span>{copy.stats.title}</span>
          </CardTitle>
          <CardDescription>{copy.stats.subtitle}</CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleBalancedFill}
          >
            <Sparkles data-icon="inline-start" />
            <span>{copy.stats.balancedFillBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetAllToOne}
          >
            <RotateCcw data-icon="inline-start" />
            <span>{copy.stats.resetStatsBtn}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Budget Controls & Presets */}
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Label htmlFor="cg-stat-budget" className="text-xs font-medium">
                {copy.stats.budgetLabel}
              </Label>
              <Input
                id="cg-stat-budget"
                type="number"
                min={9}
                max={200}
                value={state.statBudget}
                onChange={(e) => {
                  const val = Number.parseInt(e.target.value, 10);
                  if (Number.isFinite(val) && val >= 9) {
                    onUpdateState((prev) => ({ ...prev, statBudget: val }));
                  }
                }}
                className="h-8 w-20 font-mono"
              />
              <span className="text-xs text-muted-foreground">
                {copy.stats.presetsLabel}
              </span>
              <div className="flex items-center gap-1">
                {STAT_BUDGET_PRESETS.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    size="sm"
                    variant={state.statBudget === preset ? 'default' : 'outline'}
                    className="h-7 px-2 font-mono text-xs"
                    onClick={() =>
                      onUpdateState((prev) => ({ ...prev, statBudget: preset }))
                    }
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">
                  {copy.stats.spentLabel}:{' '}
                </span>
                <span className="font-mono font-semibold">{spent}</span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {copy.stats.remainingLabel}:{' '}
                </span>
                <span
                  className={`font-mono font-bold ${
                    remaining === 0
                      ? 'text-emerald-500'
                      : remaining < 0
                        ? 'text-destructive'
                        : 'text-amber-500'
                  }`}
                >
                  {remaining}
                </span>
              </div>
            </div>
          </div>

          {state.mode === 'advanced' && (
            <div className="flex flex-wrap gap-6 border-t border-border/60 pt-3">
              <div className="flex items-center gap-2">
                <Switch
                  id="cg-cap13-switch"
                  checked={state.allowStatCap13}
                  onCheckedChange={(checked) =>
                    onUpdateState((prev) => ({
                      ...prev,
                      allowStatCap13: checked,
                    }))
                  }
                />
                <Label htmlFor="cg-cap13-switch" className="cursor-pointer text-xs">
                  {copy.stats.cap13Label}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="cg-ignore-stat-budget"
                  checked={state.ignoreStatBudget}
                  onCheckedChange={(checked) =>
                    onUpdateState((prev) => ({
                      ...prev,
                      ignoreStatBudget: checked,
                    }))
                  }
                />
                <Label
                  htmlFor="cg-ignore-stat-budget"
                  className="cursor-pointer text-xs"
                >
                  {copy.stats.ignoreBudgetLabel}
                </Label>
              </div>
            </div>
          )}
        </div>

        {/* 9 Primary Stats Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_STAT_KEYS.map((key) => {
            const val = state.stats[key] ?? 1;
            const meta = copy.stats.statNames[key];
            const canInc =
              val < maxPerStat &&
              (state.ignoreStatBudget || remaining > 0);
            const canDec = val > 1;

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-xs font-bold text-primary">
                      {key}
                    </span>
                    <span className="text-sm font-semibold">{meta.name}</span>
                    <RuleDescriptionTooltip
                      kind="stat"
                      statKey={key}
                      lang={lang}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {meta.hint}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={!canDec}
                    onClick={() => adjustStat(key, -1)}
                    aria-label={`${meta.name} -1`}
                  >
                    <Minus className="size-3.5" />
                  </Button>
                  <span className="w-8 text-center font-mono text-base font-bold tabular-nums">
                    {val}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    disabled={!canInc}
                    onClick={() => adjustStat(key, 1)}
                    aria-label={`${meta.name} +1`}
                  >
                    <Plus className="size-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Live Derived Stats Bar */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">
            {copy.stats.derivedTitle}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {derivedItems.map((item) => (
              <div
                key={item.key}
                className="flex flex-col justify-between rounded-lg border border-border/80 bg-muted/25 p-3"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <RuleDescriptionTooltip
                    kind="derived"
                    derivedKey={item.key}
                    lang={lang}
                  />
                </div>
                <span className="my-1 font-mono text-xl font-bold text-primary tabular-nums">
                  {item.value}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {item.formula}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
