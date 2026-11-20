import { Copy, FlaskConical, Package, Shield, Swords } from 'lucide-react';
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
  GearCatalogEntry,
  PotionCatalogEntry,
  WeaponCatalogEntry,
} from '@/src/data/items/types';

export type CompendiumSearchItem =
  | { kind: 'weapon'; entry: WeaponCatalogEntry }
  | { kind: 'armor'; entry: ArmorCatalogEntry }
  | { kind: 'alchemy'; entry: PotionCatalogEntry }
  | { kind: 'gear'; entry: GearCatalogEntry };

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
 * Read-only quick-inspection modal for Weapons, Armor, Shields, Alchemy, and Gear
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

  const kindLabel =
    item.kind === 'weapon'
      ? c.weaponKind
      : item.kind === 'armor'
        ? item.entry.isShield
          ? c.shieldKind
          : c.armorKind
        : item.kind === 'alchemy'
          ? c.alchemyKind
          : c.gearKind;

  const Icon =
    item.kind === 'weapon'
      ? Swords
      : item.kind === 'armor'
        ? Shield
        : item.kind === 'alchemy'
          ? FlaskConical
          : Package;

  const handleCopy = async () => {
    const lines: string[] = [`${title} (${altTitle}) — ${kindLabel}`];
    lines.push(`${c.priceLabel}: ${entry.priceDisplay} · ${c.availabilityLabel}: ${entry.availability}`);

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
            <Badge variant="secondary" className="font-mono text-[11px]">
              {entry.availability}
            </Badge>
          </div>
          {altTitle !== title && (
            <DialogDescription className="font-mono text-xs">
              {altTitle}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-3.5 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <StatField
              label={c.categoryLabel}
              value={item.kind === 'alchemy' ? item.entry.type : item.entry.category}
            />
            <StatField label={c.priceLabel} value={entry.priceDisplay} />
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
          </div>

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

          {entry.source && (
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
