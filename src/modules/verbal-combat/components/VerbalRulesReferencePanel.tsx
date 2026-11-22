import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  RELATIONSHIP_META,
  VERBAL_ATTACK_TOOLS,
  VERBAL_CONDITION_META,
  VERBAL_DEFENSE_TOOLS,
} from '../data/verbalRulesData';
import { getVerbalCombatCopy } from '../i18n';
import type { ModuleLanguage, RelationshipTier, VerbalConditionId } from '../types';

interface VerbalRulesReferencePanelProps {
  lang: ModuleLanguage;
}

/**
 * Clean rules quick-reference tab summarizing official Witcher TRPG Verbal Combat mechanics.
 */
export function VerbalRulesReferencePanel({
  lang,
}: VerbalRulesReferencePanelProps) {
  const copy = getVerbalCombatCopy(lang);
  const rCopy = copy.rules;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{rCopy.title}</CardTitle>
          <CardDescription>{rCopy.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-semibold text-foreground">
              {rCopy.formulaTitle}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {rCopy.formulaBody}
            </p>
          </div>

          <Separator />

          {/* Attitudes */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {rCopy.attitudesTitle}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {(
                Object.keys(RELATIONSHIP_META) as RelationshipTier[]
              ).map((tier) => (
                <div
                  key={tier}
                  className="rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground"
                >
                  {RELATIONSHIP_META[tier].label[lang]}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Attacks Table */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {rCopy.attacksTitle}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Outil' : 'Tool'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Dégâts' : 'Damage'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Effet' : 'Effect'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VERBAL_ATTACK_TOOLS.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">
                      {tool.label[lang]}
                    </TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">
                      {tool.damageDice} +{' '}
                      {tool.damageStat === 'vol' && lang === 'en'
                        ? 'WILL'
                        : tool.damageStat.toUpperCase()}
                    </TableCell>
                    <TableCell className="whitespace-normal text-xs text-muted-foreground">
                      {tool.summary[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Defenses Table */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {rCopy.defensesTitle}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Réplique' : 'Defense'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Effet' : 'Effect'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {VERBAL_DEFENSE_TOOLS.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell className="font-medium">
                      {tool.label[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal text-xs text-muted-foreground">
                      {tool.summary[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          {/* Social Conditions */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {rCopy.conditionsTitle}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {(
                Object.keys(VERBAL_CONDITION_META) as VerbalConditionId[]
              ).map((condId) => (
                <div
                  key={condId}
                  className="flex flex-col gap-0.5 rounded-md border border-border px-3 py-2 text-xs"
                >
                  <span className="font-semibold text-foreground">
                    {VERBAL_CONDITION_META[condId].label[lang]}
                  </span>
                  <span className="text-muted-foreground">
                    {VERBAL_CONDITION_META[condId].effect[lang]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
