import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ROUTE_COLOR_PRESETS } from '../data/travelPresets';
import type { ModuleLanguage } from '../types';

interface RouteColorPickerProps {
  value: string;
  lang: ModuleLanguage;
  customTooltip: string;
  onChange: (hex: string) => void;
}

/**
 * Reusable cartographic route color swatch picker paired with a custom hex input,
 * built strictly on Shadcn UI primitives.
 */
export function RouteColorPicker({
  value,
  lang,
  customTooltip,
  onChange,
}: RouteColorPickerProps) {
  const normalizedValue = value.toLowerCase();

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {ROUTE_COLOR_PRESETS.map((preset) => {
        const isActive = normalizedValue === preset.hex.toLowerCase();
        const isLightSwatch =
          preset.hex.toLowerCase() === '#f5f5f4' ||
          preset.hex.toLowerCase() === '#f59e0b' ||
          preset.hex.toLowerCase() === '#38bdf8';

        return (
          <Tooltip key={preset.id}>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  size="icon-xs"
                  variant="outline"
                  aria-label={preset.label[lang]}
                  onClick={() => onChange(preset.hex)}
                  style={{ backgroundColor: preset.hex }}
                  className={`rounded-full border transition-transform hover:scale-110 ${
                    isActive
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'border-border'
                  }`}
                />
              }
            >
              {isActive && (
                <Check
                  className={`size-3 ${
                    isLightSwatch ? 'text-stone-950' : 'text-white'
                  }`}
                />
              )}
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {preset.label[lang]}
            </TooltipContent>
          </Tooltip>
        );
      })}

      <Tooltip>
        <TooltipTrigger
          render={
            <div className="relative flex items-center">
              <Input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={customTooltip}
                className="h-6 w-8 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
              />
            </div>
          }
        />
        <TooltipContent side="top" className="text-xs">
          {customTooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
