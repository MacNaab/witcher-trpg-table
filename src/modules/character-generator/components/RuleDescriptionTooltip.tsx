import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DERIVED_STAT_DESCRIPTIONS,
  PRIMARY_STAT_DESCRIPTIONS,
  SKILL_DESCRIPTIONS,
  type DerivedStatKey,
} from '../data/rulesDescriptions';
import { getSkillDefinition } from '../data/skillsCatalog';
import type { ModuleLanguage, PrimaryStatKey, SkillId } from '../types';

type RuleDescriptionTooltipProps =
  | {
      kind: 'stat';
      statKey: PrimaryStatKey;
      lang: ModuleLanguage;
    }
  | {
      kind: 'derived';
      derivedKey: DerivedStatKey;
      lang: ModuleLanguage;
    }
  | {
      kind: 'skill';
      skillId: SkillId;
      lang: ModuleLanguage;
      waiveDoubleCost?: boolean;
    };

/**
 * Reusable Shadcn Tooltip trigger presenting rulebook descriptions
 * for Primary Characteristics, Derived Statistics, and Skills (including Base 10/13/16/20 thresholds).
 */
export function RuleDescriptionTooltip(props: RuleDescriptionTooltipProps) {
  const { lang } = props;

  if (props.kind === 'stat') {
    const info = PRIMARY_STAT_DESCRIPTIONS[props.statKey];
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
              aria-label={info.name[lang]}
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
            <span className="font-semibold">{info.name[lang]}</span>
            <span className="rounded bg-background/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold">
              {props.statKey}
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-95">
            {info.summary[lang]}
          </p>
          {info.mechanics && (
            <p className="border-t border-background/20 pt-1.5 text-[11px] leading-snug opacity-85">
              {info.mechanics[lang]}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  if (props.kind === 'derived') {
    const info = DERIVED_STAT_DESCRIPTIONS[props.derivedKey];
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
              aria-label={info.name[lang]}
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
            <span className="font-semibold">{info.name[lang]}</span>
            <span className="rounded bg-background/15 px-1.5 py-0.5 font-mono text-[10px] font-medium">
              {info.formula[lang]}
            </span>
          </div>
          <p className="text-xs leading-relaxed opacity-95">
            {info.summary[lang]}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  const def = getSkillDefinition(props.skillId);
  const info = SKILL_DESCRIPTIONS[props.skillId];

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
            aria-label={def.name[lang]}
            className="inline-flex size-5 shrink-0 cursor-help items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
        }
      >
        <Info className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-sm flex-col items-start gap-2 px-3 py-2.5 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <span className="font-semibold">{def.name[lang]}</span>
          <div className="flex items-center gap-1">
            {def.doubleCost && (
              <span className="rounded bg-background/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold">
                {props.waiveDoubleCost ? '×2 → ×1' : '×2'}
              </span>
            )}
            <span className="rounded bg-background/15 px-1.5 py-0.5 font-mono text-[10px] font-medium">
              {def.attribute}
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed opacity-95">
          {info.summary[lang]}
        </p>

        {info.note && (
          <p className="w-full rounded bg-background/10 px-2 py-1 text-[11px] leading-snug opacity-90">
            {info.note[lang]}
          </p>
        )}

        <div className="w-full space-y-1 border-t border-background/20 pt-1.5 text-[11px] leading-snug">
          <div>
            <span className="font-mono font-bold">
              {lang === 'fr' ? 'Base 10 :' : 'Base 10:'}
            </span>{' '}
            <span className="opacity-90">{info.benchmarks.b10[lang]}</span>
          </div>
          <div>
            <span className="font-mono font-bold">
              {lang === 'fr' ? 'Base 13 :' : 'Base 13:'}
            </span>{' '}
            <span className="opacity-90">{info.benchmarks.b13[lang]}</span>
          </div>
          <div>
            <span className="font-mono font-bold">
              {lang === 'fr' ? 'Base 16 :' : 'Base 16:'}
            </span>{' '}
            <span className="opacity-90">{info.benchmarks.b16[lang]}</span>
          </div>
          <div>
            <span className="font-mono font-bold">
              {lang === 'fr' ? 'Base 20 :' : 'Base 20:'}
            </span>{' '}
            <span className="opacity-90">{info.benchmarks.b20[lang]}</span>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
