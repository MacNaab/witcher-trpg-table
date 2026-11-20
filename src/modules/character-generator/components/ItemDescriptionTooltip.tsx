import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { resolveEquipmentTooltip } from '../data/startingGearData';
import type { ModuleLanguage } from '../types';

interface ItemDescriptionTooltipProps {
  lang: ModuleLanguage;
  name: string;
  catalogItemId?: string;
  weight?: number;
  fallbackDescription?: string;
}

/**
 * Reusable Shadcn Tooltip trigger displaying full equipment stats,
 * category, weight/price, and description from `@/src/data/items`.
 */
export function ItemDescriptionTooltip({
  lang,
  name,
  catalogItemId,
  weight,
  fallbackDescription,
}: ItemDescriptionTooltipProps) {
  const info = resolveEquipmentTooltip(
    { catalogItemId, name, weight, fallbackDescription },
    lang
  );

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            aria-label={info.title}
            className="inline-flex size-5 shrink-0 cursor-help items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        }
      >
        <Info className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-xs flex-col items-start gap-1.5 px-3 py-2.5 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-semibold">{info.title}</span>
          <span className="rounded bg-background/15 px-1.5 py-0.5 text-[10px] font-medium">
            {info.categoryLabel}
          </span>
        </div>
        {info.statsLine && (
          <div className="font-mono text-[10px] opacity-85">
            {info.statsLine}
          </div>
        )}
        <p className="text-xs leading-relaxed opacity-95">{info.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
