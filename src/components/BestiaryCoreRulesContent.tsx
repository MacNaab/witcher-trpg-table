import { Coins, ShieldAlert, Skull, Swords } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BESTIARY_CORE_RULES } from '@/src/data/bestiary';

interface BestiaryCoreRulesContentProps {
  lang: 'en' | 'fr';
  searchQuery?: string;
}

/**
 * Reusable Core Rulebook bestiary guidelines (`guide/bestiaire.md`):
 * difficulty/complexity tiers, attacks-per-round rule, bounty rule, and the 12 core creature categories.
 */
export function BestiaryCoreRulesContent({
  lang,
  searchQuery = '',
}: BestiaryCoreRulesContentProps) {
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

  return (
    <div className="flex flex-col gap-5 text-xs">
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
    </div>
  );
}
