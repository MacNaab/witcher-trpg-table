import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Skull,
  Swords,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCombatSimulatorCopy } from '../i18n';
import type {
  LethalityRating,
  ModuleLanguage,
  SimulationReport,
} from '../types';

interface SimulationReportViewProps {
  report: SimulationReport | null;
  lang: ModuleLanguage;
}

const LETHALITY_TONES: Record<
  LethalityRating,
  { textClass: string; Icon: typeof CheckCircle2 }
> = {
  trivial: { textClass: 'text-emerald-600 dark:text-emerald-400', Icon: CheckCircle2 },
  favorable: { textClass: 'text-emerald-600 dark:text-emerald-400', Icon: CheckCircle2 },
  balanced: { textClass: 'text-amber-600 dark:text-amber-400', Icon: Swords },
  risky: { textClass: 'text-orange-600 dark:text-orange-400', Icon: AlertTriangle },
  deadly: { textClass: 'text-destructive', Icon: Skull },
};

export function SimulationReportView({
  report,
  lang,
}: SimulationReportViewProps) {
  const copy = getCombatSimulatorCopy(lang);
  const r = copy.report;
  const [hoveredRound, setHoveredRound] = useState<number | null>(null);

  if (!report) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
          <ShieldAlert className="size-4" aria-hidden="true" />
          <span>{r.emptyTeamsNotice}</span>
        </CardContent>
      </Card>
    );
  }

  const perfectPct = report.teamAPerfectWinRate;
  const costlyPct = Math.max(0, report.teamAWinRate - perfectPct);
  const drawPct = report.drawRate;
  const teamBPct = report.teamBWinRate;

  const lethalityMeta = LETHALITY_TONES[report.lethality];
  const LethalityIcon = lethalityMeta.Icon;

  const maxBucketTotal = Math.max(
    1,
    ...report.roundDistribution.map((b) => b.teamAWins + b.teamBWins)
  );
  const hoveredBucket =
    hoveredRound !== null
      ? report.roundDistribution.find((b) => b.round === hoveredRound) ?? null
      : null;

  const sampleWinnerLabel =
    report.sampleWinner === 'teamA'
      ? r.teamAShort
      : report.sampleWinner === 'teamB'
        ? r.teamBShort
        : r.sampleDrawWinner;

  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {r.title}
          </h2>
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {r.metaSummary(report.iterations, report.durationMs)}
        </span>
      </div>

      {/* 4-Column KPI Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{r.kpis.teamAWinRate}</CardDescription>
            <CardTitle className="font-mono text-2xl font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {report.teamAWinRate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-xs">
            <span className="font-mono text-muted-foreground tabular-nums">
              {r.kpis.winsOfTotal(report.teamAWins, report.iterations)}
            </span>
            <span className={`inline-flex items-center gap-1 font-medium ${lethalityMeta.textClass}`}>
              <LethalityIcon className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{r.lethalityLabels[report.lethality]}</span>
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {r.kpis.perfectWinRate}
            </CardDescription>
            <CardTitle className="font-mono text-2xl font-semibold tabular-nums text-foreground">
              {report.teamAPerfectWinRate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">
              {r.kpis.perfectWinSub(report.teamAPerfectWins)}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{r.kpis.avgDuration}</CardDescription>
            <CardTitle className="flex items-center gap-1.5 font-mono text-2xl font-semibold tabular-nums text-foreground">
              <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
              <span>{r.kpis.roundsUnit(report.avgRounds.toFixed(1))}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">
              {r.kpis.durationRange(
                report.minRounds,
                report.maxRounds,
                (report.avgRounds * 3).toFixed(0)
              )}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{r.kpis.teamBWinRate}</CardDescription>
            <CardTitle className="font-mono text-2xl font-semibold tabular-nums text-destructive">
              {report.teamBWinRate.toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-xs text-muted-foreground">
            <span className="font-mono tabular-nums">
              {r.kpis.winsOfTotal(report.teamBWins, report.iterations)}
            </span>
            <span className="font-mono tabular-nums">
              {r.kpis.drawsNote(report.draws)}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Outcome Breakdown & Round Distribution */}
      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              {r.outcomeBreakdownTitle}
            </CardTitle>
            <CardDescription className="text-xs">
              {r.lethalityDescriptions[report.lethality]}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Segmented Probability Bar */}
            <div className="flex h-5 w-full overflow-hidden rounded-md border border-border bg-muted">
              {perfectPct > 0 && (
                <div
                  style={{ width: `${perfectPct}%` }}
                  className="bg-emerald-600 transition-all dark:bg-emerald-500"
                  title={`${r.outcomePerfectA}: ${perfectPct.toFixed(1)}%`}
                />
              )}
              {costlyPct > 0 && (
                <div
                  style={{ width: `${costlyPct}%` }}
                  className="bg-amber-500 transition-all"
                  title={`${r.outcomeCostlyA}: ${costlyPct.toFixed(1)}%`}
                />
              )}
              {drawPct > 0 && (
                <div
                  style={{ width: `${drawPct}%` }}
                  className="bg-muted-foreground/40 transition-all"
                  title={`${r.outcomeDraw}: ${drawPct.toFixed(1)}%`}
                />
              )}
              {teamBPct > 0 && (
                <div
                  style={{ width: `${teamBPct}%` }}
                  className="bg-destructive transition-all"
                  title={`${r.outcomeWinB}: ${teamBPct.toFixed(1)}%`}
                />
              )}
            </div>

            <div className="grid gap-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="size-2.5 shrink-0 rounded-xs bg-emerald-600 dark:bg-emerald-500" />
                  <span>{r.outcomePerfectA}</span>
                </span>
                <span className="font-mono font-medium tabular-nums">
                  {perfectPct.toFixed(1)}% ({report.teamAPerfectWins})
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="size-2.5 shrink-0 rounded-xs bg-amber-500" />
                  <span>{r.outcomeCostlyA}</span>
                </span>
                <span className="font-mono font-medium tabular-nums">
                  {costlyPct.toFixed(1)}% (
                  {report.teamAWins - report.teamAPerfectWins})
                </span>
              </div>

              {report.draws > 0 && (
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-foreground">
                    <span className="size-2.5 shrink-0 rounded-xs bg-muted-foreground/50" />
                    <span>{r.outcomeDraw}</span>
                  </span>
                  <span className="font-mono font-medium tabular-nums">
                    {drawPct.toFixed(1)}% ({report.draws})
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="size-2.5 shrink-0 rounded-xs bg-destructive" />
                  <span>{r.outcomeWinB}</span>
                </span>
                <span className="font-mono font-medium tabular-nums">
                  {teamBPct.toFixed(1)}% ({report.teamBWins})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Round Histogram */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm font-semibold">
                  {r.histogramTitle}
                </CardTitle>
                <CardDescription className="text-xs">
                  {r.histogramSubtitle}
                </CardDescription>
              </div>
              {hoveredBucket && (
                <div className="font-mono text-xs text-muted-foreground tabular-nums">
                  {r.roundShort(hoveredBucket.round)} :{' '}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    A {hoveredBucket.teamAWins}
                  </span>{' '}
                  ·{' '}
                  <span className="text-destructive">
                    B {hoveredBucket.teamBWins}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-1.5 overflow-x-auto border-b border-border pb-2">
              {report.roundDistribution.map((bucket) => {
                const total = bucket.teamAWins + bucket.teamBWins;
                const heightPct = (total / maxBucketTotal) * 100;
                const aRatio = total > 0 ? (bucket.teamAWins / total) * 100 : 0;
                const bRatio = total > 0 ? (bucket.teamBWins / total) * 100 : 0;

                return (
                  <button
                    key={bucket.round}
                    type="button"
                    onMouseEnter={() => setHoveredRound(bucket.round)}
                    onFocus={() => setHoveredRound(bucket.round)}
                    onMouseLeave={() => setHoveredRound(null)}
                    className="group flex h-full min-w-7 flex-1 flex-col items-center justify-end gap-1 focus-visible:outline-none"
                    aria-label={`${r.roundShort(bucket.round)}: A ${bucket.teamAWins}, B ${bucket.teamBWins}`}
                  >
                    <div
                      style={{ height: `${Math.max(4, heightPct)}%` }}
                      className="flex w-full max-w-8 flex-col justify-end overflow-hidden rounded-t-xs border border-border/60 transition-opacity group-hover:opacity-90"
                    >
                      {bRatio > 0 && (
                        <div
                          style={{ height: `${bRatio}%` }}
                          className="w-full bg-destructive/85"
                        />
                      )}
                      {aRatio > 0 && (
                        <div
                          style={{ height: `${aRatio}%` }}
                          className="w-full bg-emerald-600/85 dark:bg-emerald-500/85"
                        />
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                      {r.roundShort(bucket.round)}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per-Blueprint Telemetry Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">
            {r.telemetryTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{r.telemetryColumns.fighter}</TableHead>
                  <TableHead>{r.telemetryColumns.side}</TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.survival}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.death}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.avgHp}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.hitRate}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.dmgDealt}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.dmgTaken}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.crits}
                  </TableHead>
                  <TableHead className="text-right">
                    {r.telemetryColumns.fumbles}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.fighterTelemetry.map((row) => {
                  const hitRate =
                    row.avgAttacksTotal > 0
                      ? (row.avgAttacksHit / row.avgAttacksTotal) * 100
                      : 0;
                  return (
                    <TableRow key={row.blueprintId}>
                      <TableCell className="font-medium">
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          ×{row.quantity}
                        </span>{' '}
                        {row.name}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {row.team === 'teamA' ? r.teamAShort : r.teamBShort}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums text-emerald-600 dark:text-emerald-400">
                        {row.survivalRate.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums text-destructive">
                        {row.deathRate.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {row.avgRemainingHp.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {hitRate.toFixed(0)}%
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {row.avgDamageDealt.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {row.avgDamageTaken.toFixed(1)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {row.avgCritsInflicted.toFixed(2)} /{' '}
                        {row.avgCritsReceived.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs tabular-nums">
                        {row.avgFumbles.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Representative Sample Combat Transcript */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <CardTitle className="text-sm font-semibold">{r.sampleTitle}</CardTitle>
            <CardDescription className="font-mono text-xs tabular-nums">
              {r.sampleSubtitle(sampleWinnerLabel, report.sampleRounds)}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60 rounded-md border border-border bg-muted/15 p-3">
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {report.sampleLog.map((ev, idx) => (
                <div
                  key={`${ev.round}-${idx}`}
                  className={`flex items-start gap-2 leading-relaxed ${
                    ev.kind === 'crit'
                      ? 'text-amber-600 dark:text-amber-400'
                      : ev.kind === 'fumble' || ev.kind === 'death'
                        ? 'text-destructive'
                        : ev.kind === 'victory'
                          ? 'font-semibold text-primary'
                          : ev.kind === 'miss'
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                  }`}
                >
                  <span className="w-8 shrink-0 text-muted-foreground tabular-nums">
                    R{ev.round}
                  </span>
                  <span>{ev.text}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
