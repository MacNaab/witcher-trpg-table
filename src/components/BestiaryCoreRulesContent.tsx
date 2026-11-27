import { useState } from 'react';
import {
  BookOpenText,
  Coins,
  Compass,
  SearchCheck,
  ShieldAlert,
  Skull,
  Sparkles,
  Swords,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BESTIARY_CORE_RULES,
  BESTIARY_DECIPHERING_RULES,
} from '@/src/data/bestiary';

interface BestiaryCoreRulesContentProps {
  lang: 'en' | 'fr';
  searchQuery?: string;
}

/**
 * Reusable Bestiary Rules reference combining:
 * 1. Core Rulebook bestiary guidelines (`guide/core/`): threat/complexity tiers, attacks-per-round, bounties, 12 categories.
 * 2. "Décrypter un monstre" & Investigation loop (`guide/Le Journal du Sorcelleur/`): statblock anatomy, special rules, Complexity & Concealment.
 */
export function BestiaryCoreRulesContent({
  lang,
  searchQuery = '',
}: BestiaryCoreRulesContentProps) {
  const [activeTab, setActiveTab] = useState<'core' | 'decipher'>('core');

  const q = searchQuery.trim().toLowerCase();
  const matches = (...texts: Array<string | undefined>) =>
    !q || texts.some((t) => t && t.toLowerCase().includes(q));

  const powerTiers = BESTIARY_CORE_RULES.difficultyTiers.filter(
    (t) => t.axis === 'power' && matches(t.label[lang], t.description[lang])
  );
  const complexityTiers = BESTIARY_CORE_RULES.difficultyTiers.filter(
    (t) =>
      t.axis === 'complexity' && matches(t.label[lang], t.description[lang])
  );
  const categories = BESTIARY_CORE_RULES.categories.filter((c) =>
    matches(
      c.rulebookTitle[lang],
      c.description[lang],
      c.steelSilverNote?.[lang]
    )
  );

  const showIntro = matches(
    BESTIARY_CORE_RULES.intro[lang],
    BESTIARY_CORE_RULES.attacksPerRoundRule[lang],
    BESTIARY_CORE_RULES.rewardRule[lang]
  );

  const anatomyItems = BESTIARY_DECIPHERING_RULES.anatomyItems.filter((item) =>
    matches(item.title[lang], item.description[lang])
  );
  const specialRules = BESTIARY_DECIPHERING_RULES.specialRules.filter((rule) =>
    matches(rule.title[lang], rule.description[lang])
  );
  const inv = BESTIARY_DECIPHERING_RULES.investigation;
  const showInvestigation = matches(
    inv.title[lang],
    inv.intro[lang],
    inv.concentrationFormula[lang],
    ...inv.complexityTiers.flatMap((t) => [t.label[lang], t.example[lang], t.value]),
    ...inv.concealmentTiers.flatMap((t) => [t.label[lang], t.example[lang], t.value])
  );

  const hasCoreHits =
    showIntro ||
    powerTiers.length > 0 ||
    complexityTiers.length > 0 ||
    categories.length > 0;
  const hasDecipherHits =
    anatomyItems.length > 0 || specialRules.length > 0 || showInvestigation;

  // When searching globally (e.g. GM Screen), auto-show matching content without hiding hits behind an inactive tab
  const effectiveTab =
    q && !hasCoreHits && hasDecipherHits
      ? 'decipher'
      : q && hasCoreHits && !hasDecipherHits
        ? 'core'
        : activeTab;

  return (
    <Tabs
      value={effectiveTab}
      onValueChange={(value) => {
        if (value === 'core' || value === 'decipher') {
          setActiveTab(value);
        }
      }}
      className="flex flex-col gap-4 text-xs"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="core" className="gap-1.5 text-xs">
          <Skull className="size-3.5" aria-hidden="true" />
          <span>
            {lang === 'fr' ? 'Règles du Bestiaire' : 'Core Bestiary Rules'}
          </span>
        </TabsTrigger>
        <TabsTrigger value="decipher" className="gap-1.5 text-xs">
          <BookOpenText className="size-3.5" aria-hidden="true" />
          <span>
            {lang === 'fr'
              ? 'Décrypter un monstre & Enquête'
              : 'Deciphering & Investigation'}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="core" className="m-0 flex flex-col gap-5">
        {showIntro && (
          <p className="leading-relaxed text-muted-foreground">
            {BESTIARY_CORE_RULES.intro[lang]}
          </p>
        )}

        {/* Difficulty & Complexity Matrix */}
        {(powerTiers.length > 0 || complexityTiers.length > 0) && (
          <div className="grid gap-4 md:grid-cols-2">
            {powerTiers.length > 0 && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3">
                <div className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Puissance brute (Niveau de menace)'
                    : 'Raw Power (Threat Rating)'}
                </div>
                <div className="flex flex-col gap-2">
                  {powerTiers.map((tier) => (
                    <div key={tier.id} className="leading-relaxed">
                      <span className="font-semibold text-foreground">
                        {tier.label[lang]} :{' '}
                      </span>
                      <span className="text-muted-foreground">
                        {tier.description[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {complexityTiers.length > 0 && (
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3">
                <div className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Complexité tactique (Préparation)'
                    : 'Tactical Complexity (Preparation)'}
                </div>
                <div className="flex flex-col gap-2">
                  {complexityTiers.map((tier) => (
                    <div key={tier.id} className="leading-relaxed">
                      <span className="font-semibold text-foreground">
                        {tier.label[lang]} :{' '}
                      </span>
                      <span className="text-muted-foreground">
                        {tier.description[lang]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Combat & Bounty Callouts */}
        {showIntro && (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
              <Swords
                className="mt-0.5 size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Attaques par round'
                    : 'Attacks per Round'}
                </span>
                <p className="leading-relaxed text-muted-foreground">
                  {BESTIARY_CORE_RULES.attacksPerRoundRule[lang]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-border bg-card p-3">
              <Coins
                className="mt-0.5 size-3.5 shrink-0 text-amber-500"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Prime & Contrats'
                    : 'Bounties & Contracts'}
                </span>
                <p className="leading-relaxed text-muted-foreground">
                  {BESTIARY_CORE_RULES.rewardRule[lang]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 12 Core Creature Categories */}
        {categories.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Skull className="size-3.5 text-primary" aria-hidden="true" />
              <span>
                {lang === 'fr'
                  ? 'Catégories du Bestiaire (Livre de base)'
                  : 'Bestiary Categories (Core Rulebook)'}
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {categories.map((cat) => (
                <div
                  key={cat.typeId}
                  className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/15 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground">
                      {cat.rulebookTitle[lang]}
                    </span>
                    {cat.steelSilverNote && (
                      <Badge variant="outline" className="text-[10px]">
                        {lang === 'fr' ? 'Acier / Argent' : 'Steel / Silver'}
                      </Badge>
                    )}
                  </div>
                  <p className="leading-relaxed text-muted-foreground">
                    {cat.description[lang]}
                  </p>
                  {cat.steelSilverNote && (
                    <p className="flex items-start gap-1.5 rounded border border-border/70 bg-background/70 px-2 py-1 text-[11px] text-foreground">
                      <ShieldAlert
                        className="mt-0.5 size-3 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{cat.steelSilverNote[lang]}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="decipher" className="m-0 flex flex-col gap-5">
        {!q && (
          <p className="leading-relaxed text-muted-foreground">
            {BESTIARY_DECIPHERING_RULES.intro[lang]}
          </p>
        )}

        {/* 14-Item Monster Statblock Anatomy */}
        {anatomyItems.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <BookOpenText
                className="size-3.5 text-primary"
                aria-hidden="true"
              />
              <span>
                {lang === 'fr'
                  ? 'Décrypter une fiche de monstre (Le Journal du Sorcelleur)'
                  : 'Deciphering a Monster Statblock (A Witcher’s Journal)'}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {anatomyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 rounded-md border border-border bg-muted/15 p-2.5"
                >
                  <span className="font-semibold text-foreground">
                    {item.title[lang]}
                  </span>
                  <p className="leading-relaxed text-muted-foreground">
                    {item.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Rules Boxes */}
        {specialRules.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              <span>
                {lang === 'fr'
                  ? 'Encadrés et règles spéciales'
                  : 'Special Rules & Conditions'}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {specialRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex flex-col gap-1 rounded-md border border-border bg-card p-2.5"
                >
                  <span className="font-semibold text-foreground">
                    {rule.title[lang]}
                  </span>
                  <p className="leading-relaxed text-muted-foreground">
                    {rule.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investigation System Quick Reference */}
        {showInvestigation && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <SearchCheck
                className="size-3.5 text-primary"
                aria-hidden="true"
              />
              <span>{inv.title[lang]}</span>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {inv.intro[lang]}
            </p>
            <div className="flex items-start gap-2 rounded-md border border-border bg-background/80 px-2.5 py-2 font-mono text-[11px] text-foreground">
              <Compass
                className="mt-0.5 size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>{inv.concentrationFormula[lang]}</span>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-2.5">
                <span className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Complexité du mystère'
                    : 'Mystery Complexity'}
                </span>
                {inv.complexityTiers.map((tier) => (
                  <div
                    key={tier.value}
                    className="flex items-baseline justify-between gap-2 border-b border-border/50 pb-1 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">
                        {tier.label[lang]}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {tier.example[lang]}
                      </span>
                    </div>
                    <Badge variant="outline" className="shrink-0 font-mono text-[10px]">
                      {tier.value}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-2.5">
                <span className="font-semibold text-foreground">
                  {lang === 'fr'
                    ? 'Dissimulation des indices (Armure)'
                    : 'Clue Concealment (Armor)'}
                </span>
                {inv.concealmentTiers.map((tier) => (
                  <div
                    key={tier.value}
                    className="flex items-baseline justify-between gap-2 border-b border-border/50 pb-1 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">
                        {tier.label[lang]}
                      </span>
                      <span className="block text-[11px] text-muted-foreground">
                        {tier.example[lang]}
                      </span>
                    </div>
                    <Badge variant="secondary" className="shrink-0 font-mono text-[10px]">
                      -{tier.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
