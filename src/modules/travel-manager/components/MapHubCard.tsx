import { useState } from 'react';
import {
  Anchor,
  ArrowRight,
  Compass,
  Crown,
  ExternalLink,
  Flame,
  Lock,
  Map as MapIcon,
  MapPin,
  Pencil,
  Sun,
  Trash2,
  UserCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getTravelManagerCopy } from '../i18n';
import type {
  BuiltinTravelMapId,
  ModuleLanguage,
  TravelMapDefinition,
  TravelMapId,
} from '../types';

interface MapHubCardProps {
  map: TravelMapDefinition;
  lang: ModuleLanguage;
  onSelectMap: (mapId: TravelMapId) => void;
  onEditCustomMap?: (map: TravelMapDefinition) => void;
  onDeleteCustomMap?: (mapId: TravelMapId) => Promise<void>;
}

const BUILTIN_MAP_ICONS: Record<BuiltinTravelMapId, typeof Compass> = {
  continent: Compass,
  skellige: Anchor,
  toussaint: Crown,
  korath: Sun,
  ophir: MapPin,
  zerrikania: Flame,
};

/**
 * Individual regional map card displayed in the Travel Manager Hub.
 * Highlights availability state, scale/lore hints, creator attribution,
 * and management actions for user-imported custom maps.
 */
export function MapHubCard({
  map,
  lang,
  onSelectMap,
  onEditCustomMap,
  onDeleteCustomMap,
}: MapHubCardProps) {
  const copy = getTravelManagerCopy(lang);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const Icon =
    BUILTIN_MAP_ICONS[map.id as BuiltinTravelMapId] ?? MapIcon;
  const isDisabled = map.status === 'coming-soon';

  const handleConfirmDelete = async () => {
    if (!onDeleteCustomMap) return;
    setIsDeleting(true);
    try {
      await onDeleteCustomMap(map.id);
      setDeleteDialogOpen(false);
      toast.success(copy.card.deletedToast);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      className={`group relative flex h-full flex-col overflow-hidden border-border pt-0 transition-colors ${
        isDisabled
          ? 'border-dashed opacity-80'
          : `${map.accent.cardHover} bg-card`
      }`}
    >
      {/* Top regional color strip */}
      <div className={`h-1.5 w-full ${map.accent.topBar}`} aria-hidden="true" />

      <CardHeader className="flex flex-row items-start justify-between gap-3 pt-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-lg border ${map.accent.iconBox}`}
          >
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex w-fit items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${map.accent.badge}`}
              >
                {map.regionTag[lang]}
              </span>
              {map.isCustom && (
                <span className="inline-flex w-fit items-center rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
                  {copy.card.customBadge}
                </span>
              )}
            </div>
            <CardTitle className="truncate font-sans text-lg font-semibold text-foreground">
              {map.name[lang]}
            </CardTitle>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
            isDisabled
              ? 'border border-border bg-muted text-muted-foreground'
              : 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {isDisabled
            ? copy.card.statusComingSoon
            : copy.card.statusAvailable}
        </span>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="text-xs font-medium text-foreground/85">
          {map.subtitle[lang]}
        </div>
        <CardDescription className="flex-1 text-xs leading-relaxed sm:text-sm">
          {map.description[lang]}
        </CardDescription>

        {/* Scale hint + Creator source block */}
        <div className="flex flex-col gap-2 rounded-lg border border-border/70 bg-muted/25 p-2.5 text-xs">
          <div className="font-mono text-[11px] text-muted-foreground">
            {map.scaleHint[lang]}
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-2">
            <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
              <UserCheck
                className="size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="truncate">
                {copy.card.creatorLabel}{' '}
                <strong className="font-semibold text-foreground">
                  {map.creatorName}
                </strong>
              </span>
            </div>

            {map.creatorSourceUrl && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      href={map.creatorSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    />
                  }
                >
                  <span>{copy.card.sourceLinkLabel}</span>
                  <ExternalLink className="size-3" aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {copy.card.sourceTooltip}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 border-t border-border/60 pt-3">
        {isDisabled ? (
          <Button
            type="button"
            variant="secondary"
            disabled
            aria-disabled="true"
            className="w-full cursor-not-allowed"
          >
            <Lock data-icon="inline-start" className="size-3.5" />
            <span>{copy.card.disabledMapBtn}</span>
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="default"
              onClick={() => onSelectMap(map.id)}
              className="flex-1 justify-between"
            >
              <span>{copy.card.openMapBtn}</span>
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Button>

            {map.isCustom && onEditCustomMap && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => onEditCustomMap(map)}
                      aria-label={copy.card.editCustomMapLabel}
                    />
                  }
                >
                  <Pencil className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {copy.card.editCustomMapLabel}
                </TooltipContent>
              </Tooltip>
            )}

            {map.isCustom && onDeleteCustomMap && (
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <DialogTrigger
                        render={
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label={copy.card.deleteCustomMapLabel}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          />
                        }
                      >
                        <Trash2 className="size-4" />
                      </DialogTrigger>
                    }
                  />
                  <TooltipContent side="top" className="text-xs">
                    {copy.card.deleteCustomMapLabel}
                  </TooltipContent>
                </Tooltip>

                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>{copy.card.deleteConfirmTitle}</DialogTitle>
                    <DialogDescription>
                      {copy.card.deleteConfirmBody}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose
                      render={
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isDeleting}
                        >
                          {copy.card.cancelBtn}
                        </Button>
                      }
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={isDeleting}
                      onClick={() => void handleConfirmDelete()}
                    >
                      {copy.card.deleteConfirmBtn}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
