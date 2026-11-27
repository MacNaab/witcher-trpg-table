import { Flame, Shield, Sparkles, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MAGIC_CORE_RULES } from '@/src/data/magic';
import { MagicChaosRulesSection } from './MagicChaosRulesSection';

interface MagicCoreRulesContentProps {
  lang: 'en' | 'fr';
  searchQuery?: string;
}

/**
 * Reusable Core Rulebook magic mechanics reference block (`guide/magie.md`):
 * magical defenses, elemental overcasting, casting rules & sidebars, hex-lifting DCs,
 * Places of Power, and spell-learning progression.
 */
export function MagicCoreRulesContent({
  lang,
  searchQuery = '',
}: MagicCoreRulesContentProps) {
  const q = searchQuery.trim().toLowerCase();

  const matches = (...texts: string[]) =>
    !q || texts.some((t) => t.toLowerCase().includes(q));

  const defenses = MAGIC_CORE_RULES.defenses.filter((d) =>
    matches(d.label[lang], d.description[lang])
  );
  const overcasting = MAGIC_CORE_RULES.overcasting.filter((o) =>
    matches(o.element[lang], o.effect[lang])
  );
  const specials = MAGIC_CORE_RULES.castingAndSpecials.filter((s) =>
    matches(s.title[lang], s.summary[lang])
  );
  const sites = MAGIC_CORE_RULES.sitesOfPower.sites.filter((s) =>
    matches(s.element[lang], s.locations[lang], s.benefit[lang])
  );

  return (
    <div className="flex flex-col gap-5 text-xs">
      {/* 1. Defending against Magic & Elemental Overcasting */}
      {(defenses.length > 0 || overcasting.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {defenses.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Shield className="size-3.5 text-primary" aria-hidden="true" />
                <span>
                  {lang === 'fr'
                    ? 'Se défendre contre la magie'
                    : 'Defending Against Magic'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {defenses.map((d) => (
                  <div key={d.id} className="leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {d.label[lang]} :{' '}
                    </span>
                    <span className="text-muted-foreground">
                      {d.description[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {overcasting.length > 0 && (
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Flame className="size-3.5 text-amber-500" aria-hidden="true" />
                <span>
                  {lang === 'fr'
                    ? 'Dangers & Dépassement de Vigueur'
                    : 'Dangers & Vigor Overcasting'}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {overcasting.map((o) => (
                  <div key={o.id} className="leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {o.element[lang]} :{' '}
                    </span>
                    <span className="text-muted-foreground">
                      {o.effect[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Special Casting & Sign Rules */}
      {specials.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Wand2 className="size-3.5 text-primary" aria-hidden="true" />
            <span>
              {lang === 'fr'
                ? 'Incantation, Maintien, Signes & Télékinésie'
                : 'Casting, Maintenance, Signs & Telekinesis'}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {specials.map((rule) => (
              <div
                key={rule.id}
                className="rounded-md border border-border bg-card p-2.5"
              >
                <div className="font-semibold text-foreground">
                  {rule.title[lang]}
                </div>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {rule.summary[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Places of Power & Hex Lifting */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/15 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              <span>
                {lang === 'fr' ? 'Sites d’Énergie' : 'Places of Power'}
              </span>
            </span>
            <Badge variant="outline" className="text-[10px]">
              {lang === 'fr' ? '3 rounds · +10 P.P.' : '3 rounds · +10 I.P.'}
            </Badge>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {MAGIC_CORE_RULES.sitesOfPower.intro[lang]}
          </p>
          <p className="rounded border border-amber-500/30 bg-amber-500/10 p-2 leading-relaxed text-amber-800 dark:text-amber-200">
            {MAGIC_CORE_RULES.sitesOfPower.abuseRule[lang]}
          </p>
          {sites.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Élément' : 'Element'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Lieux' : 'Locations'}</TableHead>
                  <TableHead>{lang === 'fr' ? 'Avantage (1 h)' : 'Benefit (1 hr)'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sites.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-semibold">
                      {site.element[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {site.locations[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {site.benefit[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {/* Lifting Hexes */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/15 p-3">
            <div className="font-semibold text-foreground">
              {lang === 'fr'
                ? 'Comment lever un Envoûtement'
                : 'Lifting Hexes'}
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {MAGIC_CORE_RULES.hexLifting.intro[lang]}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Danger' : 'Danger'}</TableHead>
                  <TableHead className="text-right">
                    {lang === 'fr' ? 'Éducation (SD)' : 'Education (DC)'}
                  </TableHead>
                  <TableHead className="text-right">
                    {lang === 'fr'
                      ? 'Form. Sorceleur (SD)'
                      : 'Witcher Training (DC)'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MAGIC_CORE_RULES.hexLifting.tiers.map((tier) => (
                  <TableRow key={tier.id}>
                    <TableCell className="font-medium">
                      {tier.danger[lang]}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {tier.educationDc}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold text-primary">
                      {tier.witcherTrainingDc}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Learning Magic */}
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/15 p-3">
            <div className="font-semibold text-foreground">
              {lang === 'fr'
                ? 'L’apprentissage de la magie'
                : 'Learning Magic'}
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {MAGIC_CORE_RULES.learningMagic.prerequisiteRule[lang]}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{lang === 'fr' ? 'Niveau' : 'Level'}</TableHead>
                  <TableHead className="text-right">P.P.</TableHead>
                  <TableHead>{lang === 'fr' ? 'Temps' : 'Time'}</TableHead>
                  <TableHead className="text-right">SD</TableHead>
                  <TableHead className="text-right">
                    {lang === 'fr' ? 'Jets' : 'Rolls'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MAGIC_CORE_RULES.learningMagic.tiers.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">
                      {row.tier[lang]}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {row.ppCost}
                    </TableCell>
                    <TableCell>{row.learningTime[lang]}</TableCell>
                    <TableCell className="text-right font-mono">
                      {row.dc}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {row.requiredRolls}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="leading-relaxed text-muted-foreground">
              {MAGIC_CORE_RULES.learningMagic.intro[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Tome of Chaos: Ley Lines, Necromancy, Goetia */}
      <MagicChaosRulesSection lang={lang} searchQuery={searchQuery} />
    </div>
  );
}
