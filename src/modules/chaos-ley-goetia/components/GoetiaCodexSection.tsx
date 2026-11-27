import { Badge } from '@/components/ui/badge';
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
  GOETIA_BENEFITS,
  GOETIC_RITUALS,
  GOETIC_TOOLS,
} from '../data/goetiaData';
import type { ChaosLeyGoetiaCopy } from '../i18n';

interface GoetiaCodexSectionProps {
  locale: 'fr' | 'en';
  copy: ChaosLeyGoetiaCopy['codex'];
}

export function GoetiaCodexSection({ locale, copy }: GoetiaCodexSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Benefits of Goetia Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.benefitsTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.benefitsDesc} — <strong>{copy.desiresTitle} :</strong>{' '}
            {copy.desiresNote}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-36">—</TableHead>
                <TableHead>Bes</TableHead>
                <TableHead>Casglydd</TableHead>
                <TableHead>Mari Lwyd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {GOETIA_BENEFITS.map((row) => (
                <TableRow key={row.tier}>
                  <TableCell className="align-top text-xs font-semibold">
                    {row.label[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs leading-relaxed text-muted-foreground">
                    {row.effects.bes[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs leading-relaxed text-muted-foreground">
                    {row.effects.casglydd[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs leading-relaxed text-muted-foreground">
                    {row.effects.mari_lwyd[locale]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 4 Goetic Rituals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.ritualsTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.ritualsDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {GOETIC_RITUALS.map((rit) => (
              <div
                key={rit.id}
                className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3.5 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {rit.name[locale]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[11px]">
                      {copy.tiers[rit.tier]}
                    </Badge>
                    <span className="font-mono font-semibold text-primary tabular-nums">
                      {rit.dc[locale]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground tabular-nums">
                  <span>
                    {copy.ritualMeta.prep} : {rit.prepTime[locale]}
                  </span>
                  <span>·</span>
                  <span>
                    {copy.ritualMeta.duration} : {rit.duration[locale]}
                  </span>
                  <span>·</span>
                  <span>
                    {copy.ritualMeta.investment} : {rit.investment} cr.
                  </span>
                </div>

                <p className="text-muted-foreground">
                  <strong className="text-foreground">
                    {copy.ritualMeta.components} :{' '}
                  </strong>
                  {rit.components[locale]}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">
                    {copy.ritualMeta.process} :{' '}
                  </strong>
                  {rit.process[locale]}
                </p>
                <p className="leading-relaxed text-foreground">
                  <strong className="text-primary">
                    {copy.ritualMeta.effect} :{' '}
                  </strong>
                  {rit.effect[locale]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 8 Tools of Goetia */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.toolsTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.toolsDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Objet / Outil</TableHead>
                <TableHead>Artisanat / SD</TableHead>
                <TableHead>Composants</TableHead>
                <TableHead>Effet & Protection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {GOETIC_TOOLS.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="align-top text-xs font-semibold">
                    <div>{tool.name[locale]}</div>
                    <div className="font-mono text-[11px] font-normal text-muted-foreground tabular-nums">
                      {tool.rarity[locale]} · {tool.cost[locale]}
                    </div>
                  </TableCell>
                  <TableCell className="align-top font-mono text-xs whitespace-nowrap tabular-nums">
                    <div>{tool.craftSkill[locale]}</div>
                    <div className="text-[11px] text-muted-foreground">
                      SD {tool.dc} · {tool.time[locale]}
                    </div>
                  </TableCell>
                  <TableCell className="align-top text-xs text-muted-foreground">
                    {tool.components[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs leading-relaxed">
                    {tool.effect[locale]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
