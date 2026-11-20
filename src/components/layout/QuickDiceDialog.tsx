import { useState } from 'react';
import { Dices, Flame, RotateCcw, Skull, Sparkles } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/src/contexts/I18nContext';
import { rollDie, rollWitcherD10 } from '@/src/modules/combat-tracker/utils/combatEngine';

interface QuickDiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DiceRollRecord {
  id: string;
  label: string;
  total: number;
  breakdown: string;
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  dcCheck?: {
    dc: number;
    passed: boolean;
    margin: number;
  };
  timestamp: string;
}

const PRESET_DICE = ['1d6', '2d6', '3d6', '4d6', '5d6', '1d10', '2d10', '1d100'] as const;

function rollCustomFormula(formula: string): { total: number; breakdown: string } | null {
  const cleaned = formula.replace(/\s+/g, '').replace(/−/g, '-').toLowerCase();
  const match = cleaned.match(/^(\d{1,2})d(\d{1,3})([+-]\d{1,4})?$/);
  if (!match) return null;

  const count = Number.parseInt(match[1], 10);
  const sides = Number.parseInt(match[2], 10);
  const mod = match[3] ? Number.parseInt(match[3], 10) : 0;
  if (count < 1 || count > 30 || sides < 2 || sides > 1000) return null;

  const rolls: number[] = [];
  let sum = 0;
  for (let i = 0; i < count; i += 1) {
    const r = rollDie(sides);
    rolls.push(r);
    sum += r;
  }
  const total = sum + mod;
  const rollsText = `[${rolls.join(', ')}]`;
  const modText = mod === 0 ? '' : mod > 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`;
  return {
    total,
    breakdown: `${rollsText}${modText} = ${total}`,
  };
}

/**
 * Header-accessible Witcher TRPG dice roller modal supporting exploding 1d10! skill checks
 * (10 explodes upward, 1 triggers fumble subtraction) and damage/custom formula rolls.
 */
export function QuickDiceDialog({ open, onOpenChange }: QuickDiceDialogProps) {
  const { locale, t } = useI18n();
  const d = t.dice;

  const [modifierInput, setModifierInput] = useState('10');
  const [dcInput, setDcInput] = useState('');
  const [customFormula, setCustomFormula] = useState('3d6+2');
  const [formulaError, setFormulaError] = useState<string | null>(null);
  const [history, setHistory] = useState<DiceRollRecord[]>([]);

  const latestRoll = history[0] ?? null;

  const pushRecord = (record: Omit<DiceRollRecord, 'id' | 'timestamp'>) => {
    const now = new Date().toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setHistory((prev) => [
      {
        ...record,
        id: `roll-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: now,
      },
      ...prev.slice(0, 11),
    ]);
  };

  const handleRollWitcher = () => {
    const modifier = Number.parseInt(modifierInput, 10) || 0;
    const parsedDc = dcInput.trim() === '' ? null : Number.parseInt(dcInput, 10);
    const hasValidDc = parsedDc !== null && !Number.isNaN(parsedDc);

    const res = rollWitcherD10();
    const total = modifier + res.dieValue;

    let dieText = `[${res.natural}]`;
    let badge: DiceRollRecord['badge'];

    if (res.isCritSuccess) {
      dieText = `[${res.rolls.join(' + ')} = +${res.dieValue}]`;
      badge = { text: d.critSuccessBadge, variant: 'default' };
    } else if (res.isCritFail) {
      const penaltyRolls = res.rolls.slice(1);
      dieText = `[1 → -(${penaltyRolls.join(' + ')}) = ${res.dieValue}]`;
      badge = {
        text: `${d.critFailBadge} · ${d.fumbleLabel(res.fumbleSeverity)}`,
        variant: 'destructive',
      };
    }

    const modText = modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;

    pushRecord({
      label: `1d10! ${modText}`,
      total,
      breakdown: `${dieText} ${modText} = ${total}`,
      badge,
      dcCheck: hasValidDc
        ? {
            dc: parsedDc,
            passed: total >= parsedDc,
            margin: total - parsedDc,
          }
        : undefined,
    });
  };

  const handleRollFormula = (formula: string) => {
    const rolled = rollCustomFormula(formula);
    if (!rolled) {
      setFormulaError(d.invalidFormulaError);
      return;
    }
    setFormulaError(null);
    pushRecord({
      label: formula.toUpperCase(),
      total: rolled.total,
      breakdown: rolled.breakdown,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dices className="size-4 text-primary" aria-hidden="true" />
            <span>{d.title}</span>
          </DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:max-h-[70dvh] sm:overflow-y-auto sm:pr-1">
          {/* Witcher 1d10! Exploding Skill Check */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              <span>{d.witcherSectionTitle}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-dice-mod" className="text-xs">
                  {d.modifierLabel}
                </Label>
                <Input
                  id="quick-dice-mod"
                  type="number"
                  value={modifierInput}
                  onChange={(e) => setModifierInput(e.target.value)}
                  className="h-9 font-mono"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quick-dice-dc" className="text-xs">
                  {d.dcLabel}
                </Label>
                <Input
                  id="quick-dice-dc"
                  type="number"
                  value={dcInput}
                  onChange={(e) => setDcInput(e.target.value)}
                  placeholder={d.dcOptionalPlaceholder}
                  className="h-9 font-mono"
                />
              </div>
            </div>

            <Button type="button" onClick={handleRollWitcher} className="w-full">
              <Dices data-icon="inline-start" />
              <span>{d.rollWitcherBtn}</span>
            </Button>
          </div>

          {/* Latest Roll Highlight */}
          {latestRoll && (
            <div className="flex flex-col gap-1.5 rounded-lg border border-primary/40 bg-primary/5 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {latestRoll.label}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {latestRoll.badge && (
                    <Badge variant={latestRoll.badge.variant} className="gap-1">
                      {latestRoll.badge.variant === 'destructive' ? (
                        <Skull className="size-3" />
                      ) : (
                        <Flame className="size-3" />
                      )}
                      <span>{latestRoll.badge.text}</span>
                    </Badge>
                  )}
                  {latestRoll.dcCheck && (
                    <Badge
                      variant={latestRoll.dcCheck.passed ? 'default' : 'destructive'}
                    >
                      {latestRoll.dcCheck.passed ? d.successBadge : d.failBadge} (SD{' '}
                      {latestRoll.dcCheck.dc} ·{' '}
                      {latestRoll.dcCheck.margin >= 0
                        ? `+${latestRoll.dcCheck.margin}`
                        : latestRoll.dcCheck.margin}
                      )
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-3xl font-bold text-foreground tabular-nums">
                  {latestRoll.total}
                </span>
                <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
                  {latestRoll.breakdown}
                </span>
              </div>
            </div>
          )}

          {/* Quick Damage & Custom Formula */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {d.quickDiceTitle}
            </span>

            <div className="grid grid-cols-4 gap-1.5">
              {PRESET_DICE.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRollFormula(preset)}
                  className="font-mono text-xs"
                >
                  {preset}
                </Button>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="quick-dice-formula" className="text-xs">
                  {d.customFormulaLabel}
                </Label>
                <Input
                  id="quick-dice-formula"
                  value={customFormula}
                  onChange={(e) => {
                    setCustomFormula(e.target.value);
                    if (formulaError) setFormulaError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRollFormula(customFormula);
                    }
                  }}
                  placeholder={d.customFormulaPlaceholder}
                  className="h-9 font-mono"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleRollFormula(customFormula)}
              >
                {d.rollFormulaBtn}
              </Button>
            </div>
            {formulaError && (
              <p className="text-xs text-destructive">{formulaError}</p>
            )}
          </div>

          <Separator />

          {/* Roll History */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {d.historyTitle}
              </span>
              {history.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setHistory([])}
                  className="gap-1 text-muted-foreground"
                >
                  <RotateCcw className="size-3" />
                  <span>{d.clearHistoryBtn}</span>
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="py-3 text-center text-xs text-muted-foreground">
                {d.emptyHistory}
              </p>
            ) : (
              <ScrollArea className="h-36 rounded-md border border-border p-2">
                <div className="flex flex-col gap-1.5">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-2 rounded border border-border/60 bg-muted/25 px-2.5 py-1.5 text-xs"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                          {item.timestamp}
                        </span>
                        <span className="shrink-0 font-medium text-foreground">
                          {item.label}
                        </span>
                        <span className="truncate font-mono text-[11px] text-muted-foreground">
                          {item.breakdown}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-sm font-bold text-foreground tabular-nums">
                        {item.total}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
