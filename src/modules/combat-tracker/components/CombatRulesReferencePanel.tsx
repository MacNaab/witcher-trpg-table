import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { BestiaryCoreRulesContent } from '@/src/components/BestiaryCoreRulesContent';
import { MagicCoreRulesContent } from '@/src/components/MagicCoreRulesContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ALL_MAGIC_ENTRIES,
  type MagicSchoolId,
  type MagicTier,
} from '@/src/data/magic';
import {
  ARMOR_LAYERING_REFERENCE,
  ATTACK_MODIFIERS_REFERENCE,
  CONDITIONS_CATALOG,
  COVER_PA_REFERENCE,
  CRITICAL_TIER_META,
  CRITICAL_WOUNDS_TABLES,
  FUMBLE_TABLES,
  HUMAN_HIT_LOCATIONS,
  MONSTER_HIT_LOCATIONS,
  RANGE_MODIFIERS_REFERENCE,
} from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type { CriticalSeverity, FumbleCategoryId, ModuleLanguage } from '../types';
import { OutOfCombatRulesSections } from './OutOfCombatRulesSections';

type RulesCategoryFilter = 'all' | 'combat' | 'outOfCombat';

interface CombatRulesReferencePanelProps {
  lang: ModuleLanguage;
  defaultCategory?: RulesCategoryFilter;
}

const MAGIC_TIER_LABELS: Record<MagicTier, { fr: string; en: string }> = {
  novice: { fr: 'Novice', en: 'Novice' },
  journeyman: { fr: 'Compagnon', en: 'Journeyman' },
  master: { fr: 'Maître', en: 'Master' },
  archpriest: { fr: 'Archiprêtre', en: 'Archpriest' },
  hierophant: { fr: 'Hiérophante / Flaminika', en: 'Hierophant' },
  sign: { fr: 'Signe', en: 'Sign' },
};

/**
 * Searchable Game Master reference panel containing official Witcher TRPG
 * tables extracted from guide/combat.md.
 */
export function CombatRulesReferencePanel({
  lang,
  defaultCategory = 'all',
}: CombatRulesReferencePanelProps) {
  const copy = getCombatTrackerCopy(lang);
  const r = copy.rules;
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] =
    useState<RulesCategoryFilter>(defaultCategory);
  const [grimoireSchool, setGrimoireSchool] = useState<'all' | MagicSchoolId>('all');
  const [grimoireSource, setGrimoireSource] = useState<'all' | 'official' | 'extra'>('all');

  const normalizedQuery = query.trim().toLowerCase();

  const schoolOptions = useMemo(() => {
    const map = new Map<MagicSchoolId, string>();
    for (const entry of ALL_MAGIC_ENTRIES) {
      if (!map.has(entry.schoolId)) {
        map.set(entry.schoolId, entry.school[lang]);
      }
    }
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [lang]);

  const filteredSpells = useMemo(
    () =>
      ALL_MAGIC_ENTRIES.filter((sp) => {
        if (grimoireSchool !== 'all' && sp.schoolId !== grimoireSchool) {
          return false;
        }
        if (grimoireSource === 'official' && sp.source !== 'official') {
          return false;
        }
        if (grimoireSource === 'extra' && sp.source === 'official') {
          return false;
        }
        if (!normalizedQuery) return true;
        return (
          sp.name[lang].toLowerCase().includes(normalizedQuery) ||
          sp.school[lang].toLowerCase().includes(normalizedQuery) ||
          sp.effect.toLowerCase().includes(normalizedQuery) ||
          (sp.components?.toLowerCase().includes(normalizedQuery) ?? false) ||
          (sp.deity?.toLowerCase().includes(normalizedQuery) ?? false)
        );
      }),
    [grimoireSchool, grimoireSource, lang, normalizedQuery]
  );

  const selectedSchoolLabel =
    grimoireSchool === 'all'
      ? lang === 'fr'
        ? 'Toutes les disciplines'
        : 'All schools'
      : (schoolOptions.find((s) => s.id === grimoireSchool)?.label ?? grimoireSchool);

  const selectedGrimoireSourceLabel =
    grimoireSource === 'all'
      ? lang === 'fr'
        ? 'Toutes origines'
        : 'All sources'
      : grimoireSource === 'official'
        ? lang === 'fr'
          ? 'Livre de base'
          : 'Core Rulebook'
        : lang === 'fr'
          ? 'Extensions / Fan-made'
          : 'Supplements / Fan-made';

  const filteredConditions = useMemo(
    () =>
      CONDITIONS_CATALOG.filter((c) => {
        if (!normalizedQuery) return true;
        return (
          c.name[lang].toLowerCase().includes(normalizedQuery) ||
          c.fullRule[lang].toLowerCase().includes(normalizedQuery)
        );
      }),
    [lang, normalizedQuery]
  );

  const critTiers: CriticalSeverity[] = ['simple', 'complex', 'difficult', 'mortal'];
  const fumbleCategories: FumbleCategoryId[] = [
    'melee',
    'armedDefense',
    'ranged',
    'unarmed',
    'magic',
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base font-semibold">{r.title}</CardTitle>
          <CardDescription>{r.subtitle}</CardDescription>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={r.searchPlaceholder}
            className="pl-8"
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div
          role="group"
          aria-label={r.title}
          className="inline-flex w-fit flex-wrap items-center gap-1 rounded-lg bg-muted p-1"
        >
          {(
            [
              { id: 'all', label: r.categoryFilter.all },
              { id: 'outOfCombat', label: r.categoryFilter.outOfCombat },
              { id: 'combat', label: r.categoryFilter.combat },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategoryFilter(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                categoryFilter === item.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Accordion
          defaultValue={['dc-scale', 'modifiers', 'conditions']}
          multiple
        >
          {categoryFilter !== 'combat' && (
            <OutOfCombatRulesSections
              lang={lang}
              normalizedQuery={normalizedQuery}
            />
          )}

          {categoryFilter !== 'outOfCombat' && (
            <>
              {/* 1. Attack Modifiers & Ranges */}
              <AccordionItem value="modifiers">
            <AccordionTrigger>{r.sections.modifiers}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === 'fr' ? 'Circonstance' : 'Circumstance'}
                      </TableHead>
                      <TableHead className="text-right">Mod</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ATTACK_MODIFIERS_REFERENCE.filter(
                      (row) =>
                        !normalizedQuery ||
                        row.circumstance[lang].toLowerCase().includes(normalizedQuery)
                    ).map((row) => (
                      <TableRow key={row.circumstance.en}>
                        <TableCell>{row.circumstance[lang]}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {row.mod}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{lang === 'fr' ? 'Portée' : 'Range'}</TableHead>
                      <TableHead className="text-right">SD</TableHead>
                      <TableHead className="text-right">Mod</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RANGE_MODIFIERS_REFERENCE.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.label[lang]}</TableCell>
                        <TableCell className="text-right font-mono">{row.dc}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {row.mod >= 0 ? `+${row.mod}` : row.mod}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. Hit Locations */}
          <AccordionItem value="locations">
            <AccordionTrigger>{r.sections.locations}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {copy.anatomy.human}
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{lang === 'fr' ? 'Zone' : 'Zone'}</TableHead>
                        <TableHead className="text-center">1d10</TableHead>
                        <TableHead className="text-center">Malus</TableHead>
                        <TableHead className="text-right">Dégâts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {HUMAN_HIT_LOCATIONS.map((loc) => (
                        <TableRow key={loc.id}>
                          <TableCell>{loc.name[lang]}</TableCell>
                          <TableCell className="text-center font-mono">
                            {loc.rollLabel}
                          </TableCell>
                          <TableCell className="text-center font-mono">
                            {loc.aimPenalty}
                          </TableCell>
                          <TableCell className="text-right font-mono font-semibold">
                            {loc.multiplierLabel}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {copy.anatomy.monster}
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{lang === 'fr' ? 'Zone' : 'Zone'}</TableHead>
                        <TableHead className="text-center">1d10</TableHead>
                        <TableHead className="text-center">Malus</TableHead>
                        <TableHead className="text-right">Dégâts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {MONSTER_HIT_LOCATIONS.map((loc) => (
                        <TableRow key={loc.id}>
                          <TableCell>{loc.name[lang]}</TableCell>
                          <TableCell className="text-center font-mono">
                            {loc.rollLabel}
                          </TableCell>
                          <TableCell className="text-center font-mono">
                            {loc.aimPenalty}
                          </TableCell>
                          <TableCell className="text-right font-mono font-semibold">
                            {loc.multiplierLabel}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. Status Conditions */}
          <AccordionItem value="conditions">
            <AccordionTrigger>{r.sections.conditions}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {filteredConditions.map((cond) => (
                  <div
                    key={cond.id}
                    className="flex flex-col gap-1 rounded-md border border-border bg-muted/20 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">
                        {cond.name[lang]}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {cond.cureSkill[lang]}
                      </Badge>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">
                      {cond.fullRule[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 4. Critical Wounds Tables */}
          <AccordionItem value="criticals">
            <AccordionTrigger>{r.sections.criticals}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-5">
                {critTiers.map((tier) => {
                  const meta = CRITICAL_TIER_META[tier];
                  const rows = CRITICAL_WOUNDS_TABLES[tier].filter(
                    (entry) =>
                      !normalizedQuery ||
                      entry.title[lang].toLowerCase().includes(normalizedQuery) ||
                      entry.activeEffect[lang].toLowerCase().includes(normalizedQuery)
                  );
                  if (rows.length === 0) return null;
                  return (
                    <div key={tier} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="destructive">
                          {copy.inspector.critSeverities[tier]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          +{meta.marginThreshold} {lang === 'fr' ? 'marge' : 'margin'} ·{' '}
                          {lang === 'fr' ? 'Stabilisation SD' : 'Stabilize DC'}{' '}
                          {meta.stabilizeDc}
                        </span>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-16">2d6</TableHead>
                            <TableHead>{lang === 'fr' ? 'Blessure' : 'Wound'}</TableHead>
                            <TableHead>{lang === 'fr' ? 'Active' : 'Active'}</TableHead>
                            <TableHead>{lang === 'fr' ? 'Stabilisée' : 'Stabilized'}</TableHead>
                            <TableHead>{lang === 'fr' ? 'Traitée' : 'Treated'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rows.map((entry) => (
                            <TableRow key={`${tier}-${entry.rollLabel}`}>
                              <TableCell className="font-mono font-semibold">
                                {entry.rollLabel}
                              </TableCell>
                              <TableCell className="font-medium">
                                {entry.title[lang]}
                              </TableCell>
                              <TableCell className="whitespace-normal text-xs">
                                {entry.activeEffect[lang]}
                              </TableCell>
                              <TableCell className="whitespace-normal text-xs">
                                {entry.stabilizedEffect[lang]}
                              </TableCell>
                              <TableCell className="whitespace-normal text-xs">
                                {entry.treatedEffect[lang]}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5. Fumble Tables */}
          <AccordionItem value="fumbles">
            <AccordionTrigger>{r.sections.fumbles}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2">
                {fumbleCategories.map((cat) => (
                  <div key={cat} className="rounded-md border border-border p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                      {FUMBLE_TABLES[cat].label[lang]}
                    </p>
                    <div className="flex flex-col gap-1.5 text-xs">
                      {FUMBLE_TABLES[cat].entries.map((entry) => (
                        <div key={entry.rangeLabel} className="flex gap-2">
                          <Badge variant="outline" className="shrink-0 font-mono">
                            {entry.rangeLabel}
                          </Badge>
                          <span className="text-muted-foreground">
                            {entry.effect[lang]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 6. Cover PA, Lighting & Armor Layering */}
          <AccordionItem value="cover">
            <AccordionTrigger>{r.sections.coverAndLight}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{lang === 'fr' ? 'Abri' : 'Cover'}</TableHead>
                      <TableHead className="text-right">PA / SP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COVER_PA_REFERENCE.filter((c) => c.sp > 0).map((cov) => (
                      <TableRow key={cov.id}>
                        <TableCell>{cov.label[lang]}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {cov.sp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {lang === 'fr'
                          ? 'Différence de PA (Superposition)'
                          : 'SP Difference (Layering)'}
                      </TableHead>
                      <TableHead className="text-right">
                        {lang === 'fr' ? 'Bonus PA' : 'Bonus SP'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ARMOR_LAYERING_REFERENCE.map((row) => (
                      <TableRow key={row.diff}>
                        <TableCell className="font-mono">{row.diff}</TableCell>
                        <TableCell className="text-right font-mono font-semibold">
                          {row.bonus}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 7. Core Magic Rules (guide/magie.md) */}
          <AccordionItem value="magic-rules">
            <AccordionTrigger>{r.sections.magicRules}</AccordionTrigger>
            <AccordionContent>
              <MagicCoreRulesContent lang={lang} searchQuery={query} />
            </AccordionContent>
          </AccordionItem>

          {/* 8. Quick Grimoire (ALL_MAGIC_ENTRIES) */}
          <AccordionItem value="grimoire">
            <AccordionTrigger>{r.sections.grimoire}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Select
                      value={grimoireSchool}
                      onValueChange={(val) => {
                        if (val) setGrimoireSchool(val as 'all' | MagicSchoolId);
                      }}
                    >
                      <SelectTrigger className="w-56">
                        <SelectValue>{selectedSchoolLabel}</SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start" className="max-h-72">
                        <SelectItem value="all">
                          {lang === 'fr' ? 'Toutes les disciplines' : 'All schools'}
                        </SelectItem>
                        {schoolOptions.map((opt) => (
                          <SelectItem key={opt.id} value={opt.id}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={grimoireSource}
                      onValueChange={(val) => {
                        if (val) setGrimoireSource(val as 'all' | 'official' | 'extra');
                      }}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue>{selectedGrimoireSourceLabel}</SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectItem value="all">
                          {lang === 'fr' ? 'Toutes origines' : 'All sources'}
                        </SelectItem>
                        <SelectItem value="official">
                          {lang === 'fr' ? 'Livre de base' : 'Core Rulebook'}
                        </SelectItem>
                        <SelectItem value="extra">
                          {lang === 'fr' ? 'Extensions / Fan-made' : 'Supplements / Fan-made'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {filteredSpells.length} / {ALL_MAGIC_ENTRIES.length}
                  </span>
                </div>

                {filteredSpells.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                    {lang === 'fr'
                      ? 'Aucun sort ou rituel ne correspond aux filtres actifs.'
                      : 'No spells or rituals match the active filters.'}
                  </p>
                ) : (
                  <ScrollArea className="h-[28rem] pr-3">
                    <div className="grid gap-2.5 md:grid-cols-2">
                      {filteredSpells.map((sp) => (
                        <div
                          key={sp.id}
                          className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/15 p-3 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-semibold text-foreground">
                                {sp.name[lang]}
                              </span>
                              <div className="text-[11px] text-muted-foreground">
                                {sp.school[lang]} · {MAGIC_TIER_LABELS[sp.tier][lang]}
                                {sp.deity ? ` · ${sp.deity}` : ''}
                              </div>
                            </div>
                            {sp.source !== 'official' && (
                              <Badge variant="outline" className="shrink-0 text-[10px]">
                                {sp.source === 'vampire'
                                  ? 'Vampire'
                                  : 'Fan-made'}
                              </Badge>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 rounded bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                            <span>
                              END: <strong className="text-foreground">{sp.stamina}</strong>
                            </span>
                            <span>
                              {lang === 'fr' ? 'Portée' : 'Range'}:{' '}
                              <strong className="text-foreground">{sp.range}</strong>
                            </span>
                            <span>
                              {lang === 'fr' ? 'Durée' : 'Dur.'}:{' '}
                              <strong className="text-foreground">{sp.duration}</strong>
                            </span>
                            <span>
                              {lang === 'fr' ? 'Déf.' : 'Def.'}:{' '}
                              <strong className="text-foreground">{sp.defense}</strong>
                            </span>
                            {sp.dc && (
                              <span>
                                SD: <strong className="text-foreground">{sp.dc}</strong>
                              </span>
                            )}
                            {sp.craftTime && (
                              <span>
                                {lang === 'fr' ? 'Temps' : 'Time'}:{' '}
                                <strong className="text-foreground">{sp.craftTime}</strong>
                              </span>
                            )}
                            {sp.danger && (
                              <span>
                                {lang === 'fr' ? 'Danger' : 'Danger'}:{' '}
                                <strong className="text-foreground">{sp.danger}</strong>
                              </span>
                            )}
                          </div>

                          {sp.components && (
                            <div className="text-[11px] text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {lang === 'fr' ? 'Composants : ' : 'Components: '}
                              </span>
                              {sp.components}
                            </div>
                          )}

                          {sp.prerequisites && (
                            <div className="text-[11px] text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {lang === 'fr' ? 'Prérequis : ' : 'Prerequisites: '}
                              </span>
                              {sp.prerequisites}
                            </div>
                          )}

                          <p className="leading-relaxed text-muted-foreground">
                            {sp.effect}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

              {/* 9. Core Bestiary Rules (guide/bestiaire.md) */}
              <AccordionItem value="bestiary-rules">
                <AccordionTrigger>{r.sections.bestiaryRules}</AccordionTrigger>
                <AccordionContent>
                  <BestiaryCoreRulesContent lang={lang} searchQuery={query} />
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
