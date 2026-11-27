import {
  Bomb,
  Copy,
  Crown,
  Dna,
  FlaskConical,
  Gem,
  Package,
  Shield,
  Sparkles,
  Swords,
  Trophy,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/src/contexts/I18nContext';
import type {
  ArmorCatalogEntry,
  ExperimentalTechEntry,
  GearCatalogEntry,
  MagicItemCatalogEntry,
  MutagenCatalogEntry,
  PotionCatalogEntry,
  RelicCatalogEntry,
  RuneGlyphEntry,
  TrophyCatalogEntry,
  WeaponCatalogEntry,
} from '@/src/data/items/types';

export type CompendiumSearchItem =
  | { kind: 'weapon'; entry: WeaponCatalogEntry }
  | { kind: 'armor'; entry: ArmorCatalogEntry }
  | { kind: 'alchemy'; entry: PotionCatalogEntry }
  | { kind: 'gear'; entry: GearCatalogEntry }
  | { kind: 'relic'; entry: RelicCatalogEntry }
  | { kind: 'experimental'; entry: ExperimentalTechEntry }
  | { kind: 'runeGlyph'; entry: RuneGlyphEntry }
  | { kind: 'magicItem'; entry: MagicItemCatalogEntry }
  | { kind: 'trophy'; entry: TrophyCatalogEntry }
  | { kind: 'mutagen'; entry: MutagenCatalogEntry };

interface CompendiumItemDialogProps {
  item: CompendiumSearchItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function StatField({ label, value }: { label: string; value?: string }) {
  if (!value || value === '—' || value === '-') return null;
  return (
    <div className="flex flex-col gap-0.5 rounded-md border border-border/70 bg-muted/25 px-2.5 py-1.5">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="font-mono text-xs font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

/**
 * Read-only quick-inspection modal for Weapons, Armor, Shields, Alchemy, Gear,
 * Relics, Experimental Tech, Runes/Glyphs, Magic Items, Trophies, and Mutagens
 * launched directly from Ctrl+K global search.
 */
export function CompendiumItemDialog({
  item,
  open,
  onOpenChange,
}: CompendiumItemDialogProps) {
  const { locale, t } = useI18n();
  const c = t.compendium;
  const lang = locale === 'fr' ? 'fr' : 'en';
  const altLang = lang === 'fr' ? 'en' : 'fr';

  if (!item) return null;

  const { entry } = item;
  const title = entry.name[lang];
  const altTitle = entry.name[altLang];

  const kindLabel = (() => {
    switch (item.kind) {
      case 'weapon':
        return c.weaponKind;
      case 'armor':
        return item.entry.isShield ? c.shieldKind : c.armorKind;
      case 'alchemy':
        return c.alchemyKind;
      case 'gear':
        return c.gearKind;
      case 'relic':
        return c.relicKind;
      case 'experimental':
        return c.experimentalKind;
      case 'runeGlyph':
        return c.runeGlyphKind;
      case 'magicItem':
        return c.magicItemKind;
      case 'trophy':
        return c.trophyKind;
      case 'mutagen':
        return c.mutagenKind;
    }
  })();

  const Icon = (() => {
    switch (item.kind) {
      case 'weapon':
        return Swords;
      case 'armor':
        return Shield;
      case 'alchemy':
        return FlaskConical;
      case 'gear':
        return Package;
      case 'relic':
        return Crown;
      case 'experimental':
        return Bomb;
      case 'runeGlyph':
        return Gem;
      case 'magicItem':
        return Sparkles;
      case 'trophy':
        return Trophy;
      case 'mutagen':
        return Dna;
    }
  })();

  const availabilityBadge =
    'availability' in entry ? entry.availability : null;
  const priceDisplay = 'priceDisplay' in entry ? entry.priceDisplay : undefined;
  const mutagenColorLabel =
    item.kind === 'mutagen'
      ? lang === 'fr'
        ? item.entry.color === 'red'
          ? 'Rouge'
          : item.entry.color === 'green'
            ? 'Vert'
            : 'Bleu'
        : item.entry.color.toUpperCase()
      : null;

  const handleCopy = async () => {
    const lines: string[] = [`${title} (${altTitle}) — ${kindLabel}`];
    if (priceDisplay || availabilityBadge) {
      lines.push(
        `${c.priceLabel}: ${priceDisplay ?? '—'} · ${c.availabilityLabel}: ${availabilityBadge ?? '—'}`
      );
    }

    if (item.kind === 'weapon') {
      lines.push(
        `${c.damageLabel}: ${item.entry.damage} · ${c.accuracyLabel}: ${item.entry.accuracy} · ${c.reliabilityLabel}: ${item.entry.reliability} · ${c.rangeLabel}: ${item.entry.range}`
      );
    } else if (item.kind === 'armor') {
      lines.push(
        `${c.spLabel}: ${item.entry.sp} · ${c.evLabel}: ${item.entry.ev} · ${c.enhancementsLabel}: ${item.entry.enhancements}`
      );
    } else if (item.kind === 'alchemy') {
      lines.push(
        `${c.durationLabel}: ${item.entry.duration} · ${c.toxicityLabel}: ${item.entry.toxicity}`
      );
    } else if (item.kind === 'relic') {
      if (item.entry.relicType === 'weapon') {
        lines.push(
          `${c.damageLabel}: ${item.entry.damage ?? '—'} · ${c.accuracyLabel}: ${item.entry.accuracy ?? '—'} · ${c.reliabilityLabel}: ${item.entry.reliability ?? '—'}`
        );
      } else {
        lines.push(
          `${c.spLabel}: ${item.entry.sp ?? '—'} · ${c.evLabel}: ${item.entry.ev ?? '—'}`
        );
      }
    } else if (item.kind === 'experimental') {
      lines.push(
        `${c.damageLabel}: ${item.entry.damage} · ${c.rangeLabel}: ${item.entry.range} · ${c.dcLabel}: ${item.entry.craftDc}`
      );
    } else if (item.kind === 'runeGlyph') {
      lines.push(
        `${c.targetLabel}: ${item.entry.target[lang]} · ${c.slotsLabel}: ${item.entry.slots}`
      );
    } else if (item.kind === 'mutagen') {
      lines.push(
        `${c.colorLabel}: ${mutagenColorLabel} · ${c.alchemyDcLabel}: ${item.entry.alchemyDc} · ${c.mutationLabel}: ${item.entry.minorMutation}`
      );
    }

    if (entry.effect) {
      lines.push(`${c.effectLabel}: ${entry.effect}`);
    }

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      toast.success(c.copiedToast);
    } catch {
      // Clipboard restricted
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <DialogTitle>{title}</DialogTitle>
            <Badge variant="outline" className="text-[11px]">
              {kindLabel}
            </Badge>
            {availabilityBadge && (
              <Badge variant="secondary" className="font-mono text-[11px]">
                {availabilityBadge}
              </Badge>
            )}
            {mutagenColorLabel && (
              <Badge variant="secondary" className="font-mono text-[11px]">
                {mutagenColorLabel}
              </Badge>
            )}
          </div>
          {altTitle !== title && (
            <DialogDescription className="font-mono text-xs">
              {altTitle}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3.5 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {'category' in entry && (
              <StatField label={c.categoryLabel} value={entry.category} />
            )}
            {item.kind === 'alchemy' && (
              <StatField label={c.categoryLabel} value={item.entry.type} />
            )}
            {item.kind === 'relic' && (
              <StatField
                label={c.categoryLabel}
                value={item.entry.subType[lang]}
              />
            )}
            {item.kind === 'experimental' && (
              <StatField
                label={c.categoryLabel}
                value={item.entry.techType.toUpperCase()}
              />
            )}
            {item.kind === 'runeGlyph' && (
              <StatField label={c.targetLabel} value={item.entry.target[lang]} />
            )}
            {item.kind === 'trophy' && (
              <StatField
                label={c.monsterCategoryLabel}
                value={item.entry.monsterCategory[lang]}
              />
            )}
            {item.kind === 'mutagen' && (
              <StatField
                label={c.monsterCategoryLabel}
                value={item.entry.sourceMonster[lang]}
              />
            )}

            <StatField label={c.priceLabel} value={priceDisplay} />
            {'weight' in entry && (
              <StatField label={c.weightLabel} value={entry.weight} />
            )}

            {item.kind === 'weapon' && (
              <>
                <StatField label={c.damageLabel} value={item.entry.damage} />
                <StatField label={c.accuracyLabel} value={item.entry.accuracy} />
                <StatField label={c.reliabilityLabel} value={item.entry.reliability} />
                <StatField label={c.handsLabel} value={item.entry.hands} />
                <StatField label={c.rangeLabel} value={item.entry.range} />
                <StatField label={c.concealmentLabel} value={item.entry.concealment} />
                <StatField label={c.enhancementsLabel} value={item.entry.enhancements} />
              </>
            )}

            {item.kind === 'armor' && (
              <>
                <StatField label={c.spLabel} value={item.entry.sp} />
                <StatField label={c.evLabel} value={item.entry.ev} />
                <StatField label={c.enhancementsLabel} value={item.entry.enhancements} />
              </>
            )}

            {item.kind === 'alchemy' && (
              <>
                <StatField label={c.durationLabel} value={item.entry.duration} />
                <StatField label={c.toxicityLabel} value={item.entry.toxicity} />
              </>
            )}

            {item.kind === 'relic' && (
              <>
                <StatField label={c.dcLabel} value={`Éduc. ${item.entry.educationDc}`} />
                {item.entry.relicType === 'weapon' ? (
                  <>
                    <StatField label={c.damageLabel} value={item.entry.damage} />
                    <StatField label={c.accuracyLabel} value={item.entry.accuracy} />
                    <StatField label={c.reliabilityLabel} value={item.entry.reliability} />
                    <StatField label={c.handsLabel} value={item.entry.hands} />
                    <StatField label={c.rangeLabel} value={item.entry.range} />
                  </>
                ) : (
                  <>
                    <StatField label={c.spLabel} value={item.entry.sp} />
                    <StatField label={c.evLabel} value={item.entry.ev} />
                    <StatField
                      label={c.targetLabel}
                      value={item.entry.coverage?.[lang]}
                    />
                  </>
                )}
                <StatField label={c.enhancementsLabel} value={item.entry.enhancements} />
              </>
            )}

            {item.kind === 'experimental' && (
              <>
                <StatField label={c.damageLabel} value={item.entry.damage} />
                <StatField label={c.rangeLabel} value={item.entry.range} />
                <StatField label={c.dcLabel} value={item.entry.craftDc} />
                <StatField label={c.craftTimeLabel} value={item.entry.craftTime} />
              </>
            )}

            {item.kind === 'runeGlyph' && (
              <>
                <StatField label={c.slotsLabel} value={item.entry.slots} />
                <StatField label={c.dcLabel} value={item.entry.diagramDc} />
              </>
            )}

            {item.kind === 'magicItem' && (
              <StatField label={c.dcLabel} value={`Éduc. ${item.entry.educationDc}`} />
            )}

            {item.kind === 'mutagen' && (
              <>
                <StatField label={c.alchemyDcLabel} value={item.entry.alchemyDc} />
                <StatField label={c.colorLabel} value={mutagenColorLabel ?? undefined} />
              </>
            )}
          </div>

          {item.kind === 'experimental' && item.entry.craftComponents && (
            <div className="rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{c.componentsLabel}: </span>
              {item.entry.craftComponents}
            </div>
          )}

          {item.kind === 'runeGlyph' && item.entry.diagramComponents && (
            <div className="rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{c.componentsLabel}: </span>
              {item.entry.diagramComponents}
            </div>
          )}

          {item.kind === 'mutagen' && item.entry.minorMutation && (
            <div className="rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{c.mutationLabel}: </span>
              {item.entry.minorMutation}
            </div>
          )}

          {entry.effect && (
            <>
              <Separator />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {c.effectLabel}
                </span>
                <p className="text-sm leading-relaxed text-foreground">
                  {entry.effect}
                </p>
              </div>
            </>
          )}

          {'source' in entry && entry.source && (
            <p className="text-xs text-muted-foreground">
              {c.sourceLabel}: {entry.source}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" size="sm" onClick={handleCopy}>
            <Copy data-icon="inline-start" />
            <span>{c.copyBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            {c.closeBtn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
