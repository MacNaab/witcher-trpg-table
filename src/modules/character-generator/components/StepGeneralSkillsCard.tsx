import { BookOpen, Minus, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  SKILL_ATTRIBUTE_ORDER,
  getSkillDefinition,
} from '../data/skillsCatalog';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  ModuleLanguage,
  SkillId,
} from '../types';
import {
  getAvailableGeneralSkills,
  getGeneralSkillBudget,
  getGeneralSkillPointsSpent,
  getSkillPointCost,
} from '../utils/characterCalculations';
import { RuleDescriptionTooltip } from './RuleDescriptionTooltip';

interface StepGeneralSkillsCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (
    updater: (prev: CharacterSheetState) => CharacterSheetState
  ) => void;
}

/**
 * Step 5: Free pickup skills (budget = INT + REF), automatically excluding
 * active profession skills and native language, honoring x2 double-cost rules.
 */
export function StepGeneralSkillsCard({
  lang,
  state,
  onUpdateState,
}: StepGeneralSkillsCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const budget = getGeneralSkillBudget(state);
  const spent = getGeneralSkillPointsSpent(state);
  const remaining = budget - spent;
  const maxRank =
    state.mode === 'advanced' && state.allowSkillCap13 ? 13 : 6;
  const waiveDoubleCost = state.raceId === 'vampire';
  const availableIds = getAvailableGeneralSkills(state);

  const adjustRank = (skillId: SkillId, delta: number) => {
    onUpdateState((prev) => {
      const cap = prev.mode === 'advanced' && prev.allowSkillCap13 ? 13 : 6;
      const current = prev.generalSkillRanks[skillId] ?? 0;
      const next = Math.max(0, Math.min(cap, current + delta));
      if (next === current) return prev;

      const prevWaiveDouble = prev.raceId === 'vampire';
      const deltaCost =
        getSkillPointCost(skillId, next, prevWaiveDouble) -
        getSkillPointCost(skillId, current, prevWaiveDouble);
      if (
        delta > 0 &&
        !prev.ignoreSkillBudgets &&
        getGeneralSkillPointsSpent(prev) + deltaCost >
          getGeneralSkillBudget(prev)
      ) {
        return prev;
      }

      const nextRanks = { ...prev.generalSkillRanks };
      if (next === 0) {
        delete nextRanks[skillId];
      } else {
        nextRanks[skillId] = next;
      }
      return {
        ...prev,
        generalSkillRanks: nextRanks,
      };
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <span>{copy.generalSkills.title}</span>
          </CardTitle>
          <CardDescription>{copy.generalSkills.subtitle}</CardDescription>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-right">
          <div className="text-[11px] text-muted-foreground">
            {copy.generalSkills.budgetLabel} ({state.stats.INT} +{' '}
            {state.stats.REF})
          </div>
          <div
            className={`font-mono text-lg font-bold tabular-nums ${
              remaining === 0
                ? 'text-emerald-500'
                : remaining < 0
                  ? 'text-destructive'
                  : 'text-amber-500'
            }`}
          >
            {remaining}{' '}
            <span className="text-xs font-normal text-muted-foreground">
              ({spent} {copy.professionSkills.spentOf} {budget})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">
          {copy.generalSkills.excludedInfo}
          {state.ignoreSkillBudgets ? ` ${copy.generalSkills.ignoreBudgetNote}` : ''}
        </p>

        {waiveDoubleCost && (
          <div className="flex items-start gap-2 rounded-lg border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
            <Sparkles className="mt-0.5 size-4 shrink-0" />
            <span>{copy.professionSkills.vampireNoDoubleCostNote}</span>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {SKILL_ATTRIBUTE_ORDER.map((attr) => {
            const groupSkills = availableIds
              .map((id) => getSkillDefinition(id))
              .filter((s) => s.attribute === attr);
            if (groupSkills.length === 0) return null;

            return (
              <div key={attr} className="rounded-lg border border-border">
                <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span>
                      {attr} — {copy.stats.statNames[attr].name}
                    </span>
                    <RuleDescriptionTooltip
                      kind="stat"
                      statKey={attr}
                      lang={lang}
                    />
                  </div>
                  <span className="font-mono text-primary">
                    {attr}: {state.stats[attr]}
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {copy.professionSkills.tableHeaders.skill}
                      </TableHead>
                      <TableHead className="w-36 text-center">
                        {copy.professionSkills.tableHeaders.rank}
                      </TableHead>
                      <TableHead className="w-20 text-right">
                        {copy.professionSkills.tableHeaders.cost}
                      </TableHead>
                      <TableHead className="w-24 text-right">
                        {copy.professionSkills.tableHeaders.total}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupSkills.map((def) => {
                      const rank = state.generalSkillRanks[def.id] ?? 0;
                      const stepCost = def.doubleCost && !waiveDoubleCost ? 2 : 1;
                      const cost = getSkillPointCost(
                        def.id,
                        rank,
                        waiveDoubleCost
                      );
                      const statVal = state.stats[def.attribute] ?? 0;
                      const canInc =
                        rank < maxRank &&
                        (state.ignoreSkillBudgets || remaining >= stepCost);
                      const canDec = rank > 0;

                      return (
                        <TableRow key={def.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span>{def.name[lang]}</span>
                              <RuleDescriptionTooltip
                                kind="skill"
                                skillId={def.id}
                                lang={lang}
                                waiveDoubleCost={waiveDoubleCost}
                              />
                              {def.doubleCost && (
                                <span
                                  className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                                    waiveDoubleCost
                                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                                      : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  }`}
                                >
                                  {waiveDoubleCost
                                    ? copy.professionSkills
                                        .vampireDoubleCostWaivedTag
                                    : copy.professionSkills.doubleCostTag}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1.5">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                disabled={!canDec}
                                onClick={() => adjustRank(def.id, -1)}
                              >
                                <Minus className="size-3.5" />
                              </Button>
                              <span className="w-6 text-center font-mono text-sm font-bold tabular-nums">
                                {rank}
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon-sm"
                                disabled={!canInc}
                                onClick={() => adjustRank(def.id, 1)}
                              >
                                <Plus className="size-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs tabular-nums">
                            {cost}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm font-bold text-primary tabular-nums">
                            {statVal + rank}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
