import type { ComponentType } from 'react';
import {
  Backpack,
  BedDouble,
  Beer,
  BookOpen,
  Compass,
  Copy,
  DraftingCompass,
  FlaskConical,
  Hammer,
  Package,
  Pencil,
  RotateCcw,
  Scissors,
  ScrollText,
  Shield,
  ShieldAlert,
  Shirt,
  ShoppingBag,
  Sparkles,
  Swords,
  Trash2,
  UtensilsCrossed,
  Warehouse,
  Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
  TableRow,
} from '@/components/ui/table';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  BuildingTypeId,
  GeneratedBuilding,
  ModuleLanguage,
  ShopItemKind,
} from '../types';
import { formatBuildingAsText, formatCrownsText } from '../utils/generator';

interface BuildingCardProps {
  building: GeneratedBuilding;
  lang: ModuleLanguage;
  /** Optional substring filter applied to item names or categories. */
  searchQuery?: string;
  onEdit?: () => void;
  onReroll?: () => void;
  onDelete?: () => void;
}

const BUILDING_ICONS: Record<
  BuildingTypeId,
  ComponentType<{ className?: string }>
> = {
  Alchemist: FlaskConical,
  Armorer_standard: Hammer,
  Armorer_village: Hammer,
  General_shop: ShoppingBag,
  Bookshop: BookOpen,
  Inn_straw_bedding: BedDouble,
  Inn_stables: Warehouse,
  Inn_high_class: Beer,
  Inn_standard_quality: Beer,
  Inn_medium_quality: Beer,
  Inn_cheap_quality: Beer,
  Inn_infamous_quality: Beer,
  Haberdashery: Package,
  Tailoring: Scissors,
  Notice_board: ShieldAlert,
};

const ITEM_KIND_ICONS: Record<
  ShopItemKind,
  ComponentType<{ className?: string }>
> = {
  article: FlaskConical,
  formula: ScrollText,
  component: Sparkles,
  weapon: Swords,
  armor: Shield,
  diagram: DraftingCompass,
  tool: Wrench,
  general: Compass,
  container: Backpack,
  clothing: Shirt,
  mountGear: Warehouse,
  spellbook: Sparkles,
  book: BookOpen,
  food: UtensilsCrossed,
  lodging: BedDouble,
  contract: ShieldAlert,
};

/**
 * Displays a generated merchant, inn, stable, or notice board with bilingual
 * item labels, unboxed category tags, tabular crown pricing, and one-click copy.
 */
export function BuildingCard({
  building,
  lang,
  searchQuery = '',
  onEdit,
  onReroll,
  onDelete,
}: BuildingCardProps) {
  const copy = getUrbanGeneratorCopy(lang);
  const HeaderIcon = BUILDING_ICONS[building.buildingType];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleItems = normalizedQuery
    ? building.items.filter((item) => {
        const itemName = item.name[lang].toLowerCase();
        const kindLabel = copy.itemKinds[item.kind].toLowerCase();
        const metaLabel = item.meta?.[lang].toLowerCase() ?? '';
        return (
          itemName.includes(normalizedQuery) ||
          kindLabel.includes(normalizedQuery) ||
          metaLabel.includes(normalizedQuery)
        );
      })
    : building.items;

  const handleCopyBuilding = async () => {
    try {
      await navigator.clipboard.writeText(formatBuildingAsText(building, lang));
      toast.success(copy.output.copiedToast);
    } catch {
      toast.error(copy.output.copyFailedToast);
    }
  };

  return (
    <Card className="flex flex-col break-inside-avoid">
      <CardHeader className="gap-1.5 border-b border-border/70 pb-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2.5">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-primary">
              <HeaderIcon className="size-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base font-semibold leading-snug text-foreground">
                {building.tavernName
                  ? `${building.title[lang]} — “${building.tavernName[lang]}”`
                  : building.title[lang]}
              </CardTitle>
              {building.lodgingNote ? (
                <CardDescription className="mt-0.5 text-xs leading-relaxed">
                  {building.lodgingNote[lang]}
                </CardDescription>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <span className="mr-1 font-mono text-xs text-muted-foreground tabular-nums">
              {visibleItems.length} {copy.output.itemsCountLabel}
            </span>
            {onEdit && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onEdit}
                title={copy.editor.editBuildingTooltip}
                aria-label={copy.editor.editBuildingTooltip}
                className="print:hidden"
              >
                <Pencil className="size-3.5" aria-hidden="true" />
              </Button>
            )}
            {onReroll && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onReroll}
                title={copy.editor.rerollBuildingTooltip}
                aria-label={copy.editor.rerollBuildingTooltip}
                className="print:hidden"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleCopyBuilding}
              title={copy.buildingForm.copyButton}
              aria-label={copy.buildingForm.copyButton}
              className="print:hidden"
            >
              <Copy className="size-3.5" aria-hidden="true" />
            </Button>
            {onDelete && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={onDelete}
                title={copy.editor.deleteBuildingTooltip}
                aria-label={copy.editor.deleteBuildingTooltip}
                className="text-destructive hover:text-destructive print:hidden"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        {building.buildingType === 'Notice_board' ? (
          <div className="p-4">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-md border border-primary/25 bg-primary/5 px-3.5 py-3"
              >
                <ShieldAlert
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {copy.itemKinds.contract}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {item.name[lang]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableBody>
              {visibleItems.map((item) => {
                const ItemIcon = ITEM_KIND_ICONS[item.kind];
                return (
                  <TableRow key={item.id} className="hover:bg-muted/35">
                    <TableCell className="py-2 pr-2 pl-4">
                      <div className="flex items-start gap-2.5">
                        <ItemIcon
                          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="text-sm font-medium leading-snug text-foreground">
                            {item.name[lang]}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span>{copy.itemKinds[item.kind]}</span>
                            {item.meta ? (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{item.meta[lang]}</span>
                              </>
                            ) : null}
                            {item.isFanMade ? (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="font-medium text-primary">
                                  {copy.output.fanMadeBadge}
                                </span>
                              </>
                            ) : null}
                            {item.isStandard ? (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{copy.output.standardBadge}</span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 pr-4 pl-2 text-right align-top font-mono text-xs font-medium whitespace-nowrap text-foreground tabular-nums">
                      {formatCrownsText(item.price, lang)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
