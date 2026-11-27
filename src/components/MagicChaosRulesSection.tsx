import { useState } from 'react';
import { Dices, FlameKindling, Ghost, Sparkles, Waypoints } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CHAOS_MAGIC_RULES } from '@/src/data/magic';

interface MagicChaosRulesSectionProps {
  lang: 'en' | 'fr';
  searchQuery?: string;
}

/**
 * Modular Tome of Chaos rules extension rendered inside MagicCoreRulesContent:
 * Ley Lines, Necromancy & Restless Spirits, Goetia / Demon Benefits, True Name Generator, and Goetic Tools.
 */
export function MagicChaosRulesSection({
  lang,
  searchQuery = '',
}: MagicChaosRulesSectionProps) {
  const [generatedName, setGeneratedName] = useState<string>('');
  const q = searchQuery.trim().toLowerCase();

  const matches = (...texts: string[]) =>
    !q || texts.some((t) => t.toLowerCase().includes(q));

  const leyLines = CHAOS_MAGIC_RULES.leyLines.filter((line) =>
    matches(line.element[lang], line.signs[lang], line.benefit[lang], line.penalty[lang])
  );
  const spirits = CHAOS_MAGIC_RULES.restlessSpirits.filter((s) =>
    matches(s.name[lang], s.effect[lang])
  );
  const tools = CHAOS_MAGIC_RULES.goeticTools.filter((t) =>
    matches(t.name[lang], t.craft[lang], t.effect[lang])
  );

  const rollDemonTrueName = () => {
    const grid = CHAOS_MAGIC_RULES.demonTrueNameGrid;
    const pick = () => grid[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 6)];
    setGeneratedName(`${pick()}-${pick()}-${pick()}`);
  };

  if (q && leyLines.length === 0 && spirits.length === 0 && tools.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 font-semibold text-foreground">
        <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
        <span>
          {lang === 'fr'
            ? 'Règles avancées : A Tome of Chaos'
            : 'Advanced Rules: A Tome of Chaos'}
        </span>
      </div>

      <Accordion multiple className="rounded-lg border border-border bg-muted/15 px-3">
        {/* Ley Lines */}
        <AccordionItem value="ley-lines">
          <AccordionTrigger className="py-2.5 text-xs font-semibold hover:no-underline">
            <span className="flex items-center gap-1.5">
              <Waypoints className="size-3.5 text-primary" aria-hidden="true" />
              <span>
                {lang === 'fr'
                  ? 'Lignes telluriques (Ley Lines — Incantation SD 16)'
                  : 'Ley Lines (Spell Casting DC 16)'}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-xs">
            <p className="leading-relaxed text-muted-foreground">
              {CHAOS_MAGIC_RULES.leyLinesIntro[lang]}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Élément' : 'Element'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Indices' : 'Signs'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Avantage' : 'Benefit'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Pénalité (Échec / Dépassement)' : 'Fumble / Overdraw'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leyLines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell className="font-semibold">{line.element[lang]}</TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {line.signs[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal">{line.benefit[lang]}</TableCell>
                    <TableCell className="whitespace-normal text-amber-700 dark:text-amber-300">
                      {line.penalty[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Necromancy & Restless Spirits */}
        <AccordionItem value="necromancy">
          <AccordionTrigger className="py-2.5 text-xs font-semibold hover:no-underline">
            <span className="flex items-center gap-1.5">
              <Ghost className="size-3.5 text-purple-500" aria-hidden="true" />
              <span>
                {lang === 'fr'
                  ? 'Nécromancie & Table des Esprits agités'
                  : 'Necromancy & Restless Spirits Table'}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-xs">
            <p className="rounded border border-purple-500/30 bg-purple-500/10 p-2 leading-relaxed text-foreground">
              {CHAOS_MAGIC_RULES.necromancyIntro[lang]}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Novice</TableHead>
                  <TableHead>{lang === 'fr' ? 'Compagnon' : 'Journeyman'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Maître' : 'Master'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Effet cumulatif' : 'Cumulative Effect'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {spirits.map((row) => (
                  <TableRow key={row.name.en}>
                    <TableCell className="font-mono font-semibold">{row.rollNovice}</TableCell>
                    <TableCell className="font-mono font-semibold">{row.rollJourneyman}</TableCell>
                    <TableCell className="font-mono font-semibold">{row.rollMaster}</TableCell>
                    <TableCell className="whitespace-normal">
                      <span className="font-semibold text-foreground">{row.name[lang]} — </span>
                      <span className="text-muted-foreground">{row.effect[lang]}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        {/* Goetia & Demon Deals */}
        <AccordionItem value="goetia" className="border-b-0">
          <AccordionTrigger className="py-2.5 text-xs font-semibold hover:no-underline">
            <span className="flex items-center gap-1.5">
              <FlameKindling className="size-3.5 text-red-500" aria-hidden="true" />
              <span>
                {lang === 'fr'
                  ? 'Goétie, Pactes démoniaques & Noms véritables'
                  : 'Goetia, Demon Deals & True Names'}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 text-xs">
            <p className="leading-relaxed text-muted-foreground">
              {CHAOS_MAGIC_RULES.goetiaIntro[lang]}
            </p>

            {/* True Name Generator */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-card p-2.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Générateur de Nom Véritable de Démon :'
                    : 'Demon True Name Generator:'}
                </span>
                {generatedName ? (
                  <Badge variant="destructive" className="font-mono tracking-wider">
                    {generatedName}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">
                    {lang === 'fr' ? '3 syllabes (1d6 & 1d10)' : '3 syllables (1d6 & 1d10)'}
                  </span>
                )}
              </div>
              <Button type="button" size="sm" variant="outline" onClick={rollDemonTrueName}>
                <Dices className="mr-1.5 size-3.5" aria-hidden="true" />
                {lang === 'fr' ? 'Générer un nom' : 'Generate Name'}
              </Button>
            </div>

            {/* Demon Benefits Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Statut' : 'Status'}</TableHead>
                  <TableHead>Bes</TableHead>
                  <TableHead>Casglydd</TableHead>
                  <TableHead>Mari Lwyd</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CHAOS_MAGIC_RULES.demonBenefits.map((row) => (
                  <TableRow key={row.tier.en}>
                    <TableCell className="font-semibold">{row.tier[lang]}</TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {row.bes[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {row.casglydd[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {row.mariLwyd[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Goetic Tools */}
            <div className="grid gap-2 sm:grid-cols-2">
              {tools.map((tool) => (
                <div key={tool.id} className="rounded-md border border-border bg-card p-2">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-semibold text-foreground">{tool.name[lang]}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {tool.craft[lang]}
                    </Badge>
                  </div>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{tool.effect[lang]}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
