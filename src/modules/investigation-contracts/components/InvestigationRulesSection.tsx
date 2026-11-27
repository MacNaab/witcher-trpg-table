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
  CLUE_TYPES,
  COMPLEXITY_TIERS,
  CONCEALMENT_TIERS,
  DAILY_OBSTACLE_GUIDE,
  OBSTACLE_TYPES,
} from '../data/investigationData';
import type { InvestigationCopy } from '../i18n';

interface InvestigationRulesSectionProps {
  locale: 'fr' | 'en';
  copy: InvestigationCopy['rules'];
}

export function InvestigationRulesSection({
  locale,
  copy,
}: InvestigationRulesSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Top 3 Rules Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {copy.concentrationTitle}
            </CardTitle>
            <CardDescription className="font-mono text-xs text-primary">
              {copy.concentrationFormula}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-xs leading-relaxed text-muted-foreground">
            <p>{copy.concentrationBody}</p>
            <p className="text-foreground">{copy.recoveryBody}</p>
            <p>{copy.deductionBody}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {copy.complexityTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {COMPLEXITY_TIERS.map((tier) => (
                  <TableRow key={tier.id}>
                    <TableCell className="font-medium text-xs">
                      {tier.label[locale]}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold tabular-nums">
                      {tier.hp}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {tier.description[locale]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {copy.concealmentTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {CONCEALMENT_TIERS.map((tier) => (
                  <TableRow key={tier.value}>
                    <TableCell className="font-mono text-xs font-semibold tabular-nums">
                      {tier.value}
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-medium">{tier.label[locale]}</span>
                      <p className="text-muted-foreground">
                        {tier.example[locale]}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* 11 Clue Types Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.cluesMatrixTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.clueMatrixNote}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.clueColumns.type}</TableHead>
                <TableHead>{copy.clueColumns.skills}</TableHead>
                <TableHead>{copy.clueColumns.damage}</TableHead>
                <TableHead>{copy.clueColumns.penalty}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLUE_TYPES.map((ct) => (
                <TableRow key={ct.id}>
                  <TableCell className="align-top text-xs font-medium">
                    <div>{ct.label[locale]}</div>
                    <div className="font-normal text-muted-foreground">
                      {ct.example[locale]}
                    </div>
                  </TableCell>
                  <TableCell className="align-top text-xs">
                    {ct.skills[locale]}
                  </TableCell>
                  <TableCell className="align-top font-mono text-xs whitespace-nowrap tabular-nums">
                    {ct.damageDie} + {ct.damageStat}
                  </TableCell>
                  <TableCell className="align-top text-xs text-muted-foreground">
                    {ct.penalty[locale]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Obstacles Guide */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {copy.obstaclesCountTitle}
            </CardTitle>
            <CardDescription className="text-xs">
              {copy.obstaclePenaltyNote}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {DAILY_OBSTACLE_GUIDE.map((row) => (
                  <TableRow key={row.difficulty.en}>
                    <TableCell className="text-xs font-medium">
                      {row.difficulty[locale]}
                    </TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">
                      {row.guidance[locale]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              {copy.obstaclesGuideTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {OBSTACLE_TYPES.map((ot) => (
                  <TableRow key={ot.id}>
                    <TableCell className="w-40 text-xs font-medium">
                      {ot.label[locale]}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {ot.example[locale]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
