import { useState } from 'react';
import {
  Clock,
  Copy,
  Dices,
  MoreHorizontal,
  Plus,
  Shield,
  Skull,
  Trash2,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CONDITIONS_MAP } from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type { Combatant, CombatantRole, ModuleLanguage } from '../types';
import { getEffectiveCombatStats, rollDie } from '../utils/combatEngine';

interface InitiativeOrderListProps {
  combatants: readonly Combatant[];
  activeCombatantId: string | null;
  selectedCombatantId: string | null;
  lang: ModuleLanguage;
  onSelectCombatant: (id: string) => void;
  onUpdateInitiative: (id: string, nextInitiative: number) => void;
  onQuickAdjustHp: (id: string, delta: number) => void;
  onToggleDelayed: (id: string) => void;
  onDuplicateCombatant: (id: string) => void;
  onRemoveCombatant: (id: string) => void;
  onOpenAddDialog: () => void;
}

function getRoleBadgeVariant(
  role: CombatantRole
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (role) {
    case 'pc':
      return 'default';
    case 'ally':
      return 'secondary';
    case 'enemy':
    case 'monster':
      return 'destructive';
    default:
      return 'outline';
  }
}

interface InitiativeEditBadgeProps {
  combatant: Combatant;
  effInit: number;
  isActiveTurn: boolean;
  lang: ModuleLanguage;
  onCommit: (nextInitiative: number) => void;
}

function InitiativeEditBadge({
  combatant,
  effInit,
  isActiveTurn,
  lang,
  onCommit,
}: InitiativeEditBadgeProps) {
  const copy = getCombatTrackerCopy(lang);
  const r = copy.roster;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(String(combatant.initiative));

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraft(String(combatant.initiative));
    }
  };

  const applyDraft = () => {
    const parsed = Number.parseInt(draft, 10);
    if (!Number.isNaN(parsed)) {
      onCommit(parsed);
    }
    setOpen(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger
          render={
            <button
              type="button"
              title={`${r.editInitTitle} (${r.initShort}: ${effInit})`}
              className={`flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border font-mono text-xs font-bold tabular-nums transition-colors hover:border-primary/70 ${
                isActiveTurn
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-muted/60 text-foreground hover:bg-muted'
              }`}
            />
          }
        >
          {effInit}
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="flex flex-col gap-2.5">
            <div>
              <Label className="text-xs font-semibold">{r.editInitTitle}</Label>
              <p className="text-[11px] text-muted-foreground">
                {r.editInitHint(combatant.stats.ref)}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Input
                type="number"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    applyDraft();
                  }
                }}
                className="h-8 font-mono font-bold"
                autoFocus
              />
              <Button type="button" size="xs" onClick={applyDraft}>
                {r.editInitApply}
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => {
                const rolled = combatant.stats.ref + rollDie(10);
                onCommit(rolled);
                setOpen(false);
              }}
            >
              <Dices data-icon="inline-start" />
              <span>{r.rerollInitBtn}</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/**
 * Ordered initiative roster with live HP/STA bars, wound threshold/dying alerts,
 * inline initiative editor, quick HP +/- buttons, condition tags, and turn management menu.
 */
export function InitiativeOrderList({
  combatants,
  activeCombatantId,
  selectedCombatantId,
  lang,
  onSelectCombatant,
  onUpdateInitiative,
  onQuickAdjustHp,
  onToggleDelayed,
  onDuplicateCombatant,
  onRemoveCombatant,
  onOpenAddDialog,
}: InitiativeOrderListProps) {
  const copy = getCombatTrackerCopy(lang);
  const r = copy.roster;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">{r.title}</CardTitle>
        <Badge variant="outline" className="font-mono text-xs">
          {combatants.length}
        </Badge>
      </CardHeader>

      <CardContent className="pt-0">
        {combatants.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
            <Skull className="size-8 text-muted-foreground/60" aria-hidden="true" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">{r.emptyTitle}</p>
              <p className="max-w-xs text-xs text-muted-foreground">{r.emptyDesc}</p>
            </div>
            <Button type="button" size="sm" onClick={onOpenAddDialog}>
              <Plus data-icon="inline-start" />
              <span>{r.emptyAddBtn}</span>
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[640px] pr-2">
            <div className="flex flex-col gap-2.5">
              {combatants.map((combatant) => {
                const eff = getEffectiveCombatStats(combatant);
                const isActiveTurn = combatant.id === activeCombatantId;
                const isSelected = combatant.id === selectedCombatantId;
                const hpPct =
                  combatant.maxHp > 0
                    ? Math.max(0, Math.min(100, (combatant.hp / combatant.maxHp) * 100))
                    : 0;
                const endPct =
                  combatant.maxEnd > 0
                    ? Math.max(
                        0,
                        Math.min(
                          100,
                          ((combatant.end - combatant.nonLethalDmg) /
                            combatant.maxEnd) *
                            100
                        )
                      )
                    : 0;
                const effInit = combatant.initiative + (combatant.quickDraw ? 3 : 0);

                return (
                  <div
                    key={combatant.id}
                    onClick={() => onSelectCombatant(combatant.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectCombatant(combatant.id);
                      }
                    }}
                    className={`group flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActiveTurn
                        ? 'border-primary bg-primary/5 shadow-xs'
                        : isSelected
                          ? 'border-foreground/40 bg-muted/40'
                          : 'border-border bg-card hover:bg-muted/30'
                    } ${combatant.isDead ? 'opacity-55' : ''}`}
                  >
                    {/* Header line: Initiative + Name + Role + Menu */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <InitiativeEditBadge
                          combatant={combatant}
                          effInit={effInit}
                          isActiveTurn={isActiveTurn}
                          lang={lang}
                          onCommit={(nextInit) =>
                            onUpdateInitiative(combatant.id, nextInit)
                          }
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span
                              className={`truncate text-sm font-semibold ${
                                combatant.isDead
                                  ? 'line-through text-muted-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {combatant.name}
                            </span>
                            <Badge variant={getRoleBadgeVariant(combatant.role)}>
                              {copy.roles[combatant.role]}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                            <span>
                              {r.woundThresholdShort}: {eff.woundThreshold}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>
                              RÉF {eff.ref} / VIT {eff.vit}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          className="h-6 px-1.5 font-mono"
                          onClick={() => onQuickAdjustHp(combatant.id, -5)}
                          title="-5 PS"
                        >
                          -5
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          className="h-6 px-1.5 font-mono"
                          onClick={() => onQuickAdjustHp(combatant.id, -1)}
                          title="-1 PS"
                        >
                          -1
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          className="h-6 px-1.5 font-mono"
                          onClick={() => onQuickAdjustHp(combatant.id, 1)}
                          title="+1 PS"
                        >
                          +1
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                aria-label="Actions"
                              />
                            }
                          >
                            <MoreHorizontal className="size-3.5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onToggleDelayed(combatant.id)}
                            >
                              <Clock className="size-4" />
                              <span>
                                {combatant.delayed ? r.undelayAction : r.delayAction}
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDuplicateCombatant(combatant.id)}
                            >
                              <Copy className="size-4" />
                              <span>{r.duplicateAction}</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onRemoveCombatant(combatant.id)}
                            >
                              <Trash2 className="size-4" />
                              <span>{r.removeAction}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* HP & END Bars */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] tabular-nums">
                          <span className="font-medium text-muted-foreground">
                            {r.hpShort}
                          </span>
                          <span
                            className={`font-mono font-semibold ${
                              eff.isDying || combatant.isDead
                                ? 'text-destructive'
                                : eff.isWounded
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-foreground'
                            }`}
                          >
                            {combatant.hp}/{combatant.maxHp}
                            {combatant.tempHp > 0 ? ` (+${combatant.tempHp})` : ''}
                          </span>
                        </div>
                        <Progress
                          value={hpPct}
                          className={`[&_[data-slot=progress-track]]:h-1.5 ${
                            eff.isDying
                              ? '[&_[data-slot=progress-indicator]]:bg-destructive'
                              : eff.isWounded
                                ? '[&_[data-slot=progress-indicator]]:bg-amber-500'
                                : '[&_[data-slot=progress-indicator]]:bg-emerald-500'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[11px] tabular-nums">
                          <span className="font-medium text-muted-foreground">
                            {r.endShort}
                          </span>
                          <span className="font-mono font-semibold text-foreground">
                            {combatant.end}/{combatant.maxEnd}
                            {combatant.nonLethalDmg > 0
                              ? ` (-${combatant.nonLethalDmg} ${r.nonLethalShort})`
                              : ''}
                          </span>
                        </div>
                        <Progress
                          value={endPct}
                          className="[&_[data-slot=progress-indicator]]:bg-sky-500 [&_[data-slot=progress-track]]:h-1.5"
                        />
                      </div>
                    </div>

                    {/* Status / Tactical Badges */}
                    {(combatant.isDead ||
                      eff.isDying ||
                      eff.isWounded ||
                      eff.isUnconscious ||
                      combatant.delayed ||
                      combatant.quickDraw ||
                      combatant.activeDodge ||
                      combatant.aimStacks > 0 ||
                      combatant.conditions.length > 0 ||
                      combatant.criticalWounds.length > 0) && (
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {combatant.isDead && (
                          <Badge variant="destructive">{r.deadBadge}</Badge>
                        )}
                        {eff.isDying && (
                          <Badge variant="destructive">{r.dyingBadge}</Badge>
                        )}
                        {eff.isWounded && (
                          <Badge variant="secondary">{r.woundedBadge}</Badge>
                        )}
                        {eff.isUnconscious && (
                          <Badge variant="destructive">{r.unconsciousBadge}</Badge>
                        )}
                        {combatant.delayed && (
                          <Badge variant="outline">
                            <Clock className="size-3" />
                            {r.delayedBadge}
                          </Badge>
                        )}
                        {combatant.quickDraw && (
                          <Badge variant="outline">
                            <Zap className="size-3" />
                            {r.quickDrawBadge}
                          </Badge>
                        )}
                        {combatant.activeDodge && (
                          <Badge variant="secondary">
                            <Shield className="size-3" />
                            {r.activeDodgeBadge}
                          </Badge>
                        )}
                        {combatant.aimStacks > 0 && (
                          <Badge variant="outline">
                            {r.aimBadge(combatant.aimStacks)}
                          </Badge>
                        )}
                        {combatant.conditions.map((condId) => {
                          const def = CONDITIONS_MAP.get(condId);
                          if (!def) return null;
                          return (
                            <Badge key={condId} variant="secondary">
                              {def.name[lang]}
                            </Badge>
                          );
                        })}
                        {combatant.criticalWounds.filter((w) => w.state === 'active')
                          .length > 0 && (
                          <Badge variant="destructive">
                            {
                              combatant.criticalWounds.filter(
                                (w) => w.state === 'active'
                              ).length
                            }{' '}
                            Crit.
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
