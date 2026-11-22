import { useState } from 'react';
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Dices,
  Play,
  Plus,
  RotateCcw,
  Sun,
  Swords,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatTrackerState,
  LightingConditionId,
  ModuleLanguage,
} from '../types';

interface CombatToolbarBarProps {
  state: CombatTrackerState;
  lang: ModuleLanguage;
  onChangeTitle: (title: string) => void;
  onChangeLightLevel: (light: LightingConditionId) => void;
  onToggleAdrenaline: (enabled: boolean) => void;
  onPrevTurn: () => void;
  onNextTurn: () => void;
  onRollAllInitiatives: () => void;
  onSortInitiative: () => void;
  onOpenAddDialog: () => void;
  onOpenResolverDialog: () => void;
  onResetCombat: () => void;
}

/**
 * Top tactical command bar for round tracking, turn progression,
 * lighting/adrenaline optional rules, and encounter actions.
 */
export function CombatToolbarBar({
  state,
  lang,
  onChangeTitle,
  onChangeLightLevel,
  onToggleAdrenaline,
  onPrevTurn,
  onNextTurn,
  onRollAllInitiatives,
  onSortInitiative,
  onOpenAddDialog,
  onOpenResolverDialog,
  onResetCombat,
}: CombatToolbarBarProps) {
  const copy = getCombatTrackerCopy(lang);
  const tb = copy.toolbar;
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const activeCombatant = state.combatants.find(
    (c) => c.id === state.activeCombatantId
  );
  const livingCount = state.combatants.filter((c) => !c.isDead).length;

  return (
    <>
      <Card>
        <CardContent className="flex flex-col gap-4 pt-5">
          {/* Row 1: Encounter Name, Round KPI, Active Turn, and Lighting/Optional Rule */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="min-w-0 flex-1 basis-full sm:min-w-56 sm:basis-auto">
                <Input
                  value={state.encounterTitle}
                  onChange={(e) => onChangeTitle(e.target.value)}
                  placeholder={tb.encounterNamePlaceholder}
                  aria-label={tb.encounterNamePlaceholder}
                  className="font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={state.round === 0 ? 'secondary' : 'default'}
                  className="h-7 px-3 font-mono text-xs"
                >
                  {state.round === 0
                    ? tb.prepRoundBadge
                    : `${tb.roundLabel} ${state.round}`}
                </Badge>
                <Badge variant="outline" className="h-7 px-2.5 text-xs">
                  {tb.combatantsCount}: {livingCount}/{state.combatants.length}
                </Badge>
                {activeCombatant && (
                  <Badge variant="secondary" className="h-7 px-2.5 text-xs">
                    {tb.activeLabel}: {activeCombatant.name}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-initial">
                <Sun className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <Select
                  value={state.lightLevel}
                  onValueChange={(v) => {
                    if (
                      v === 'bright' ||
                      v === 'daylight' ||
                      v === 'dim' ||
                      v === 'darkness'
                    ) {
                      onChangeLightLevel(v);
                    }
                  }}
                >
                  <SelectTrigger className="w-full min-w-0 sm:w-56" aria-label={tb.lightLevelLabel}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daylight">{copy.lighting.daylight}</SelectItem>
                    <SelectItem value="dim">{copy.lighting.dim}</SelectItem>
                    <SelectItem value="bright">{copy.lighting.bright}</SelectItem>
                    <SelectItem value="darkness">{copy.lighting.darkness}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5">
                <Switch
                  id="combat-adrenaline-toggle"
                  checked={state.useAdrenalineRule}
                  onCheckedChange={onToggleAdrenaline}
                />
                <Label
                  htmlFor="combat-adrenaline-toggle"
                  className="cursor-pointer text-xs font-medium"
                >
                  {tb.adrenalineRule}
                </Label>
              </div>
            </div>
          </div>

          {state.round === 0 && (
            <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-200">
              {tb.prepRoundBanner}
            </div>
          )}

          {/* Row 2: Turn Controls & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
            <div className="flex flex-wrap items-center gap-2">
              {state.round > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onPrevTurn}
                  disabled={livingCount === 0 || state.round <= 1 && state.combatants.findIndex((c) => !c.isDead && c.id === state.activeCombatantId) <= 0}
                >
                  <ChevronLeft data-icon="inline-start" />
                  <span>{tb.prevTurn}</span>
                </Button>
              )}
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={onNextTurn}
                disabled={livingCount === 0}
              >
                {state.round === 0 ? (
                  <>
                    <Play data-icon="inline-start" />
                    <span>{tb.startCombatBtn}</span>
                  </>
                ) : (
                  <>
                    <span>{tb.nextTurn}</span>
                    <ChevronRight data-icon="inline-end" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onRollAllInitiatives}
                disabled={state.combatants.length === 0}
              >
                <Dices data-icon="inline-start" />
                <span>{tb.rollAllInit}</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onSortInitiative}
                disabled={state.combatants.length < 2}
              >
                <ArrowDownUp data-icon="inline-start" />
                <span>{tb.sortInit}</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpenResolverDialog}
                disabled={state.combatants.length === 0}
              >
                <Swords data-icon="inline-start" />
                <span>{tb.attackResolver}</span>
              </Button>

              <Button type="button" size="sm" onClick={onOpenAddDialog}>
                <Plus data-icon="inline-start" />
                <span>{tb.addCombatant}</span>
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setConfirmResetOpen(true)}
                disabled={state.combatants.length === 0 && state.logs.length === 0}
              >
                <RotateCcw data-icon="inline-start" />
                <span>{tb.resetCombat}</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shadcn Dialog Confirmation (never native confirm()) */}
      <Dialog open={confirmResetOpen} onOpenChange={setConfirmResetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{tb.resetTitle}</DialogTitle>
            <DialogDescription>{tb.resetDescription}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmResetOpen(false)}
            >
              {tb.resetCancel}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onResetCombat();
                setConfirmResetOpen(false);
              }}
            >
              {tb.resetConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
