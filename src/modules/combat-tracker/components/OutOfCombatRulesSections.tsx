import { useMemo, useState } from 'react';
import { Dices } from 'lucide-react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  SOCIAL_GROUP_COLUMNS,
  SOCIAL_STATUS_DEFINITIONS,
  SOCIAL_STATUS_EXTRA_RULES,
  SOCIAL_STATUS_MATRIX,
  type SocialStatusLevel,
} from '@/src/modules/character-generator/data/racesReferenceData';
import { getSocialStatusBadgeClass } from '@/src/modules/character-generator/components/RacesAndStatusDialog';
import {
  COMMON_SERVICES_PRICES,
  CRITICAL_HEALING_TABLE,
  CRITICAL_RECOVERY_DAYS,
  DC_SCALE_REFERENCE,
  ENVIRONMENTAL_HAZARDS_DATA,
  HEALING_RATE_RULES,
  REGIONAL_REPUTATION_MODS,
  REPUTATION_TIERS_DATA,
  SITUATIONAL_MODIFIERS_REFERENCE,
  TOXICITY_ADDICTION_RULES,
} from '../data/outOfCombatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type { ModuleLanguage } from '../types';
import { rollDiceFormula } from '../utils/combatEngine';

interface OutOfCombatRulesSectionsProps {
  lang: ModuleLanguage;
  normalizedQuery: string;
}

/**
 * Complete Witcher TRPG Out-of-Combat GM Screen sections:
 * - Official DC scale (10–30), situational & lighting modifiers, foraging DCs
 * - Healing, bedrest, Healing Hands, healing spells & critical recovery days
 * - Toxicity thresholds, witcher potions on non-witchers & addiction rules
 * - Falling (with live d6 damage roller), drowning, fire, cold, heat & weather
 * - Reputation tiers (0–10) & regional prejudice modifiers across the Continent
 * - Common service costs (bribes, tolls, guides, apothecary, doctors, lodging)
 */
export function OutOfCombatRulesSections({
  lang,
  normalizedQuery,
}: OutOfCombatRulesSectionsProps) {
  const copy = getCombatTrackerCopy(lang);
  const s = copy.rules.sections;

  const [fallHeightMeters, setFallHeightMeters] = useState('6');
  const [fallRollResult, setFallRollResult] = useState<{
    dice: string;
    total: number;
    detail: string;
  } | null>(null);

  const parsedHeight = Math.max(0, Number.parseFloat(fallHeightMeters) || 0);
  const fallDiceCount = Math.floor(parsedHeight / 2);

  const handleRollFallDamage = () => {
    if (fallDiceCount <= 0) {
      setFallRollResult({ dice: '0d6', total: 0, detail: '0' });
      return;
    }
    const formula = `${fallDiceCount}d6`;
    const rolled = rollDiceFormula(formula);
    setFallRollResult({
      dice: formula,
      total: rolled.total,
      detail: rolled.detail,
    });
  };

  const filteredDcScale = useMemo(
    () =>
      DC_SCALE_REFERENCE.filter(
        (row) =>
          !normalizedQuery ||
          row.difficulty[lang].toLowerCase().includes(normalizedQuery) ||
          row.example[lang].toLowerCase().includes(normalizedQuery) ||
          String(row.dc).includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredSituational = useMemo(
    () =>
      SITUATIONAL_MODIFIERS_REFERENCE.filter(
        (row) =>
          !normalizedQuery ||
          row.situation[lang].toLowerCase().includes(normalizedQuery) ||
          row.dcMod.toLowerCase().includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredHealingRates = useMemo(
    () =>
      HEALING_RATE_RULES.filter(
        (row) =>
          !normalizedQuery ||
          row.label[lang].toLowerCase().includes(normalizedQuery) ||
          row.notes[lang].toLowerCase().includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredToxicity = useMemo(
    () =>
      TOXICITY_ADDICTION_RULES.filter(
        (row) =>
          !normalizedQuery ||
          row.topic[lang].toLowerCase().includes(normalizedQuery) ||
          row.thresholdOrDc[lang].toLowerCase().includes(normalizedQuery) ||
          row.effect[lang].toLowerCase().includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredHazards = useMemo(
    () =>
      ENVIRONMENTAL_HAZARDS_DATA.filter(
        (row) =>
          !normalizedQuery ||
          row.title[lang].toLowerCase().includes(normalizedQuery) ||
          row.checkOrDc[lang].toLowerCase().includes(normalizedQuery) ||
          row.damageOrPenalty[lang].toLowerCase().includes(normalizedQuery) ||
          row.mitigation[lang].toLowerCase().includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredRegions = useMemo(
    () =>
      REGIONAL_REPUTATION_MODS.filter(
        (row) =>
          !normalizedQuery ||
          row.region[lang].toLowerCase().includes(normalizedQuery) ||
          row.notes[lang].toLowerCase().includes(normalizedQuery)
      ),
    [lang, normalizedQuery]
  );

  const filteredSocialMatrix = useMemo(
    () =>
      SOCIAL_STATUS_MATRIX.filter((row) => {
        if (!normalizedQuery) return true;
        if (row.territory[lang].toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        return SOCIAL_GROUP_COLUMNS.some((col) => {
          const def = SOCIAL_STATUS_DEFINITIONS[row.statuses[col.id]];
          return (
            col.label[lang].toLowerCase().includes(normalizedQuery) ||
            def.label[lang].toLowerCase().includes(normalizedQuery)
          );
        });
      }),
    [lang, normalizedQuery]
  );

  const filteredServices = useMemo(
    () =>
      COMMON_SERVICES_PRICES.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            !normalizedQuery ||
            cat.title[lang].toLowerCase().includes(normalizedQuery) ||
            item.service[lang].toLowerCase().includes(normalizedQuery) ||
            item.cost[lang].toLowerCase().includes(normalizedQuery) ||
            item.notes[lang].toLowerCase().includes(normalizedQuery)
        ),
      })).filter((cat) => cat.items.length > 0),
    [lang, normalizedQuery]
  );

  return (
    <>
      {/* 1. Official DC Scale (10–30) & General / Survival Modifiers */}
      <AccordionItem value="dc-scale">
        <AccordionTrigger>{s.dcScale}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-5">
            <div className="rounded-md border border-border px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">
                {lang === 'fr' ? 'Règle de réussite : ' : 'Success Rule: '}
              </span>
              {lang === 'fr'
                ? 'Le total (Caractéristique + Compétence + 1d10!) doit être strictement supérieur (>) au SD (ou à Carac × 3 pour les tests passifs).'
                : 'Total (Stat + Skill + 1d10!) must strictly exceed (>) the DC (or Stat × 3 for opposed passive checks).'}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Barème officiel des Seuil de Difficulté (SD 10 à 30)'
                    : 'Official Difficulty Check Scale (DC 10 to 30)'}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">SD / DC</TableHead>
                      <TableHead className="w-36">
                        {lang === 'fr' ? 'Palier' : 'Difficulty'}
                      </TableHead>
                      <TableHead>
                        {lang === 'fr' ? 'Exemples de référence' : 'Benchmark Examples'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDcScale.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-mono font-bold text-primary tabular-nums">
                          {row.dc}
                        </TableCell>
                        <TableCell className="font-medium">
                          {row.difficulty[lang]}
                        </TableCell>
                        <TableCell className="whitespace-normal text-xs text-muted-foreground">
                          {row.example[lang]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Modificateurs de SD, Luminosité & Survie (Recherches)'
                    : 'Situational DC Modifiers, Lighting & Foraging'}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === 'fr' ? 'Situation / Lieu' : 'Condition / Terrain'}
                      </TableHead>
                      <TableHead className="text-right">SD / Mod</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSituational.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="whitespace-normal text-xs">
                          {row.situation[lang]}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs font-semibold tabular-nums">
                          {row.dcMod}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2. Healing, Natural Recovery & Critical Surgery */}
      <AccordionItem value="healing-surgery">
        <AccordionTrigger>{s.healingSurgery}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {lang === 'fr' ? 'Type de soin / repos' : 'Care / Recovery Mode'}
                  </TableHead>
                  <TableHead className="w-44">
                    {lang === 'fr' ? 'Rythme / Bonus' : 'Rate / Bonus'}
                  </TableHead>
                  <TableHead>{lang === 'fr' ? 'Règle' : 'Rule'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHealingRates.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-normal font-medium">
                      {row.label[lang]}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-semibold text-primary tabular-nums">
                      {row.rate[lang]}
                    </TableCell>
                    <TableCell className="whitespace-normal text-xs text-muted-foreground">
                      {row.notes[lang]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Traitement des Blessures critiques (Mains thérapeutiques vs Magie)'
                    : 'Critical Wound Treatment (Healing Hands vs. Spells)'}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === 'fr' ? 'Gravité' : 'Severity'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Chirurgie (Rds · SD)' : 'Surgery (Rds · DC)'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Sort soin (Usages · SD)' : 'Spell (Casts · DC)'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CRITICAL_HEALING_TABLE.map((row) => (
                      <TableRow key={row.severity}>
                        <TableCell className="font-medium">
                          {row.label[lang]}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {row.healingHandsRounds} rds · SD {row.healingHandsDc}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {row.spellUses}× · SD {row.spellDc}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {lang === 'fr'
                    ? 'Analyse (1 rd avant chirurgie, SD = gravité) : -1 rd par tranche de 2 pts au-dessus du SD (min 1 rd). Prothèses : 10 P.P. réduisent de 1 le malus permanent (plancher -2).'
                    : 'Analysis (1 rd pre-op, DC = severity): -1 rd per 2 pts over DC (min 1 rd). Prosthetics: 10 I.P. buy off 1 pt of permanent penalty (minimum -2).'}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Jours de repos pour guérir une critique traitée (selon COR)'
                    : 'Recovery Days for Treated Critical Wounds (by BODY)'}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">
                        {lang === 'fr' ? 'COR' : 'BODY'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Simple' : 'Simple'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Complexe' : 'Complex'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Difficile' : 'Difficult'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CRITICAL_RECOVERY_DAYS.map((row) => (
                      <TableRow key={row.body}>
                        <TableCell className="font-mono font-semibold tabular-nums">
                          {row.body}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {row.simpleDays} j
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {row.complexDays} j
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs tabular-nums">
                          {row.difficultDays} j
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3. Toxicity & Addiction */}
      <AccordionItem value="toxicity-addiction">
        <AccordionTrigger>{s.toxicityAddiction}</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-56">
                  {lang === 'fr' ? 'Mécanique' : 'Mechanic'}
                </TableHead>
                <TableHead className="w-52">
                  {lang === 'fr' ? 'Seuil / SD' : 'Threshold / DC'}
                </TableHead>
                <TableHead>
                  {lang === 'fr' ? 'Conséquences & Résolution' : 'Effects & Resolution'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredToxicity.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-normal font-medium">
                    {row.topic[lang]}
                  </TableCell>
                  <TableCell className="whitespace-normal font-mono text-xs font-semibold text-primary tabular-nums">
                    {row.thresholdOrDc[lang]}
                  </TableCell>
                  <TableCell className="whitespace-normal text-xs leading-relaxed text-muted-foreground">
                    {row.effect[lang]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>

      {/* 4. Falling (with quick calculator), Drowning, Fire & Weather */}
      <AccordionItem value="hazards-climate">
        <AccordionTrigger>{s.hazardsClimate}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            {/* Inline Fall Damage Calculator */}
            <div className="flex flex-wrap items-end justify-between gap-3 rounded-md border border-border px-3.5 py-2.5">
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="gm-fall-height"
                    className="text-xs text-muted-foreground"
                  >
                    {lang === 'fr'
                      ? 'Calculateur de chute (hauteur en m)'
                      : 'Fall Damage Calculator (height in m)'}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="gm-fall-height"
                      type="number"
                      min={0}
                      max={200}
                      value={fallHeightMeters}
                      onChange={(e) => {
                        setFallHeightMeters(e.target.value);
                        setFallRollResult(null);
                      }}
                      className="h-8 w-24 font-mono text-xs tabular-nums"
                    />
                    <span className="font-mono text-xs font-semibold text-foreground tabular-nums">
                      → {fallDiceCount}d6 ({lang === 'fr' ? 'Torse, hors armure' : 'Torso, ignores SP'})
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRollFallDamage}
                >
                  <Dices data-icon="inline-start" />
                  <span>{lang === 'fr' ? 'Lancer' : 'Roll'}</span>
                </Button>
              </div>

              {fallRollResult && (
                <div className="font-mono text-xs text-foreground tabular-nums">
                  {fallRollResult.dice} [{fallRollResult.detail}] ={' '}
                  <strong className="text-destructive">
                    {fallRollResult.total}{' '}
                    {lang === 'fr' ? 'DÉG Torse' : 'Torso DMG'}
                  </strong>
                </div>
              )}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {filteredHazards.map((haz) => (
                <div
                  key={haz.id}
                  className="flex flex-col gap-1.5 rounded-md border border-border p-3.5 text-xs"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {haz.title[lang]}
                    </span>
                    <span className="font-mono text-[11px] text-primary tabular-nums">
                      {haz.checkOrDc[lang]}
                    </span>
                  </div>
                  <p className="font-medium leading-relaxed text-foreground">
                    {haz.damageOrPenalty[lang]}
                  </p>
                  <p className="leading-relaxed text-muted-foreground">
                    {haz.mitigation[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 5. Regional Reputation & Social Standing */}
      <AccordionItem value="reputation-region">
        <AccordionTrigger>{s.reputationRegion}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-foreground">
                {lang === 'fr'
                  ? 'Échelle de Réputation (0 à 10) & Influence sociale'
                  : 'Reputation Scale (0–10) & Social Influence'}
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Niv.</TableHead>
                    <TableHead className="w-44">
                      {lang === 'fr' ? 'Palier' : 'Tier'}
                    </TableHead>
                    <TableHead className="w-48">
                      {lang === 'fr' ? 'Portée' : 'Reach'}
                    </TableHead>
                    <TableHead>
                      {lang === 'fr' ? 'Effet en jeu' : 'Game Effect'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {REPUTATION_TIERS_DATA.map((row) => (
                    <TableRow key={row.level}>
                      <TableCell className="font-mono font-bold text-primary tabular-nums">
                        {row.level}
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.title[lang]}
                      </TableCell>
                      <TableCell className="whitespace-normal text-xs text-muted-foreground">
                        {row.reach[lang]}
                      </TableCell>
                      <TableCell className="whitespace-normal text-xs text-muted-foreground">
                        {row.socialEffect[lang]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-foreground">
                {lang === 'fr'
                  ? 'Modificateurs régionaux de Réputation & Préjugés (par royaume)'
                  : 'Regional Attitude & Prejudice Modifiers (by Realm)'}
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {lang === 'fr' ? 'Région / Faction' : 'Region / Realm'}
                    </TableHead>
                    <TableHead className="text-center">
                      {lang === 'fr' ? 'Humains' : 'Humans'}
                    </TableHead>
                    <TableHead className="text-center">
                      {lang === 'fr' ? 'Non-humains' : 'Non-Humans'}
                    </TableHead>
                    <TableHead className="text-center">
                      {lang === 'fr' ? 'Sorceleurs' : 'Witchers'}
                    </TableHead>
                    <TableHead className="text-center">
                      {lang === 'fr' ? 'Mages' : 'Mages'}
                    </TableHead>
                    <TableHead>
                      {lang === 'fr' ? 'Notes de contexte' : 'Context Notes'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegions.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="whitespace-normal font-medium">
                        {row.region[lang]}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs tabular-nums">
                        {row.humans}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs tabular-nums">
                        {row.nonHumans}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs tabular-nums">
                        {row.witchers}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs tabular-nums">
                        {row.mages}
                      </TableCell>
                      <TableCell className="whitespace-normal text-xs text-muted-foreground">
                        {row.notes[lang]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-foreground">
                {lang === 'fr'
                  ? 'Matrice officielle de Statut social par race et territoire (Livre de base + Suppléments)'
                  : 'Official Territorial Social Status Matrix by Race (Core + Supplements)'}
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">
                      {lang === 'fr' ? 'Territoire' : 'Territory'}
                    </TableHead>
                    {SOCIAL_GROUP_COLUMNS.map((col) => (
                      <TableHead key={col.id} className="text-center text-xs">
                        {col.label[lang]}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSocialMatrix.map((row) => (
                    <TableRow key={row.territoryId}>
                      <TableCell className="text-xs font-medium">
                        {row.territory[lang]}
                      </TableCell>
                      {SOCIAL_GROUP_COLUMNS.map((col) => {
                        const status = row.statuses[col.id];
                        const def = SOCIAL_STATUS_DEFINITIONS[status];
                        return (
                          <TableCell key={col.id} className="text-center">
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${getSocialStatusBadgeClass(status)}`}
                            >
                              {def.shortLabel[lang]}
                            </Badge>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {(
                  Object.keys(SOCIAL_STATUS_DEFINITIONS) as SocialStatusLevel[]
                ).map((level) => {
                  const def = SOCIAL_STATUS_DEFINITIONS[level];
                  return (
                    <div
                      key={level}
                      className="rounded-md border border-border/80 bg-muted/20 p-2.5 text-xs"
                    >
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${getSocialStatusBadgeClass(level)}`}
                      >
                        {def.label[lang]}
                      </Badge>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        {def.effect[lang]}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {SOCIAL_STATUS_EXTRA_RULES.map((rule) => (
                  <div
                    key={rule.id}
                    className="rounded-md border border-border/80 p-2.5 text-xs"
                  >
                    <div className="font-semibold text-foreground">
                      {rule.title[lang]}
                    </div>
                    <p className="mt-0.5 leading-relaxed text-muted-foreground">
                      {rule.text[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 6. Common Services & Prices */}
      <AccordionItem value="services-prices">
        <AccordionTrigger>{s.servicesPrices}</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-5 lg:grid-cols-2">
            {filteredServices.map((cat) => (
              <div key={cat.id} className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold text-foreground">
                  {cat.title[lang]}
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === 'fr' ? 'Service' : 'Service'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Coût' : 'Cost'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cat.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="whitespace-normal">
                          <div className="text-xs font-medium text-foreground">
                            {item.service[lang]}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {item.notes[lang]}
                          </div>
                        </TableCell>
                        <TableCell className="text-right align-top font-mono text-xs font-semibold text-primary tabular-nums whitespace-nowrap">
                          {item.cost[lang]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
