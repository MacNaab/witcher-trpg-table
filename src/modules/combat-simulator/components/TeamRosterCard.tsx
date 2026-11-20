import {
  ArrowLeftRight,
  Copy,
  Minus,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCombatSimulatorCopy } from '../i18n';
import type {
  ModuleLanguage,
  SimFighterConfig,
  TargetPriority,
  TeamSide,
} from '../types';

interface TeamRosterCardProps {
  team: TeamSide;
  fighters: readonly SimFighterConfig[];
  priority: TargetPriority;
  lang: ModuleLanguage;
  onChangePriority: (priority: TargetPriority) => void;
  onOpenAdd: () => void;
  onEditFighter: (fighter: SimFighterConfig) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onDuplicateFighter: (id: string) => void;
  onSwapTeam: (id: string) => void;
  onRemoveFighter: (id: string) => void;
}

export function TeamRosterCard({
  team,
  fighters,
  priority,
  lang,
  onChangePriority,
  onOpenAdd,
  onEditFighter,
  onUpdateQuantity,
  onDuplicateFighter,
  onSwapTeam,
  onRemoveFighter,
}: TeamRosterCardProps) {
  const copy = getCombatSimulatorCopy(lang);
  const tm = copy.teams;

  const isTeamA = team === 'teamA';
  const totalUnits = fighters.reduce((acc, f) => acc + f.quantity, 0);
  const totalHp = fighters.reduce((acc, f) => acc + f.maxHp * f.quantity, 0);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="gap-3 pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold text-foreground">
              {isTeamA ? tm.teamATitle : tm.teamBTitle}
            </CardTitle>
            <CardDescription className="text-xs">
              {isTeamA ? tm.teamASubtitle : tm.teamBSubtitle}
            </CardDescription>
          </div>

          <Button type="button" size="sm" variant="outline" onClick={onOpenAdd}>
            <Plus data-icon="inline-start" />
            <span>{tm.addBtn}</span>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-2.5 text-xs">
          <span className="font-mono text-muted-foreground tabular-nums">
            {tm.fightersCount(totalUnits, totalHp)}
          </span>

          <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:flex-initial">
            <span className="shrink-0 text-muted-foreground">{tm.priorityLabel} :</span>
            <Select
              value={priority}
              onValueChange={(v) => {
                if (v) onChangePriority(v as TargetPriority);
              }}
            >
              <SelectTrigger className="h-7 w-full min-w-0 text-xs sm:w-48">
                <SelectValue>{copy.priorities[priority]}</SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                {(
                  ['weakest', 'strongest', 'focused', 'random'] as const
                ).map((p) => (
                  <SelectItem key={p} value={p}>
                    {copy.priorities[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {fighters.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-8 text-center">
            <p className="text-sm font-medium text-foreground">{tm.emptyTitle}</p>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              {tm.emptyDesc}
            </p>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={onOpenAdd}
              className="mt-1"
            >
              <Plus data-icon="inline-start" />
              <span>{tm.addBtn}</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
            {fighters.map((f) => (
              <div
                key={f.id}
                className="flex flex-col gap-2 px-3 py-2.5 transition-colors hover:bg-muted/25 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-mono text-xs font-semibold text-primary tabular-nums">
                      ×{f.quantity}
                    </span>
                    <span className="truncate text-sm font-medium text-foreground">
                      {f.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {copy.stances[f.stance]}
                    </span>
                  </div>

                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] text-muted-foreground tabular-nums">
                    <span>
                      {tm.hpLabel} <strong className="text-foreground">{f.maxHp}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {tm.spLabel} <strong className="text-foreground">{f.armorSp}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {tm.attLabel}{' '}
                      <strong className="text-foreground">{f.attackBase}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {tm.defLabel}{' '}
                      <strong className="text-foreground">{f.defenseBase}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-foreground">
                      {f.weapon.name} ({f.weapon.damageFormula}
                      {f.weapon.attacksPerRound > 1
                        ? ` ×${f.weapon.attacksPerRound}`
                        : ''}
                      )
                    </span>
                    {f.weapon.isSilver && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-sky-600 dark:text-sky-400">
                          {tm.silverTag}
                        </span>
                      </>
                    )}
                    {f.resistantToNonSilver && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-600 dark:text-amber-400">
                          {tm.nonSilverTag}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 self-end sm:self-center">
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onUpdateQuantity(f.id, -1)}
                    disabled={f.quantity <= 1}
                    title="-1"
                    aria-label={`${f.name} -1`}
                  >
                    <Minus className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onUpdateQuantity(f.id, 1)}
                    disabled={f.quantity >= 20}
                    title="+1"
                    aria-label={`${f.name} +1`}
                  >
                    <Plus className="size-3" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onEditFighter(f)}
                    title={tm.editTooltip}
                    aria-label={tm.editTooltip}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onDuplicateFighter(f.id)}
                    title={tm.duplicateTooltip}
                    aria-label={tm.duplicateTooltip}
                  >
                    <Copy className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onSwapTeam(f.id)}
                    title={tm.swapTeamTooltip}
                    aria-label={tm.swapTeamTooltip}
                  >
                    <ArrowLeftRight className="size-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => onRemoveFighter(f.id)}
                    title={tm.removeTooltip}
                    aria-label={tm.removeTooltip}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
