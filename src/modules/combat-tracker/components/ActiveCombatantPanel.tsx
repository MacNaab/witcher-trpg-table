import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Crosshair,
  Dices,
  Flame,
  HeartPulse,
  Plus,
  Shield,
  Skull,
  Sparkles,
  Swords,
  Trash2,
  Wrench,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  CONDITIONS_CATALOG,
  CRITICAL_TIER_META,
} from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatLogType,
  Combatant,
  CombatantWeapon,
  ConditionId,
  CriticalSeverity,
  CriticalWoundRecord,
  CriticalWoundState,
  HitLocationId,
  ModuleLanguage,
} from '../types';
import {
  generateId,
  getActiveArmorLocations,
  getEffectiveCombatStats,
  getLocationLabel,
  rollCriticalWoundEntry,
  rollDie,
} from '../utils/combatEngine';

export type CombatantUpdateLogOption =
  | string
  | {
      message: string;
      type?: CombatLogType;
      skipDiff?: boolean;
    };

interface ActiveCombatantPanelProps {
  combatant: Combatant | null;
  currentRound: number;
  useAdrenalineRule: boolean;
  lang: ModuleLanguage;
  onUpdateCombatant: (updated: Combatant, logOption?: CombatantUpdateLogOption) => void;
  onUpdateInitiative?: (id: string, nextInitiative: number) => void;
}

const CRIT_STATE_ORDER: readonly CriticalWoundState[] = [
  'active',
  'stabilized',
  'treated',
];

/**
 * Detailed tactical inspector for the currently selected combatant:
 * vitals, initiative, wound threshold / death saves, per-location armor SP,
 * conditions, critical wounds, weapons Fiabilité, and GM notes.
 */
export function ActiveCombatantPanel({
  combatant,
  currentRound,
  useAdrenalineRule,
  lang,
  onUpdateCombatant,
  onUpdateInitiative,
}: ActiveCombatantPanelProps) {
  const copy = getCombatTrackerCopy(lang);
  const ins = copy.inspector;

  const [newCritSeverity, setNewCritSeverity] =
    useState<CriticalSeverity>('simple');
  const [newWeaponName, setNewWeaponName] = useState('');
  const [newWeaponDamage, setNewWeaponDamage] = useState('3d6');
  const [newWeaponSilver, setNewWeaponSilver] = useState(false);

  // Buffered numeric input drafts so typing multi-digit numbers commits cleanly on blur/Enter without spamming the Combat Log
  const [hpDraft, setHpDraft] = useState(() =>
    combatant ? String(combatant.hp) : '0'
  );
  const [endDraft, setEndDraft] = useState(() =>
    combatant ? String(combatant.end) : '0'
  );
  const [nlDraft, setNlDraft] = useState(() =>
    combatant ? String(combatant.nonLethalDmg) : '0'
  );
  const [initDraft, setInitDraft] = useState(() =>
    combatant ? String(combatant.initiative) : '10'
  );

  useEffect(() => {
    if (!combatant) return;
    setHpDraft(String(combatant.hp));
    setEndDraft(String(combatant.end));
    setNlDraft(String(combatant.nonLethalDmg));
    setInitDraft(String(combatant.initiative));
  }, [combatant]);

  if (!combatant) {
    return (
      <Card className="flex min-h-[420px] items-center justify-center">
        <CardContent className="flex max-w-md flex-col items-center gap-2 py-12 text-center">
          <Swords className="size-8 text-muted-foreground/60" aria-hidden="true" />
          <p className="text-base font-semibold text-foreground">
            {ins.noSelectionTitle}
          </p>
          <p className="text-sm text-muted-foreground">{ins.noSelectionDesc}</p>
        </CardContent>
      </Card>
    );
  }

  const eff = getEffectiveCombatStats(combatant);
  const activeZones = getActiveArmorLocations(combatant.anatomy);

  const adjustHp = (delta: number) => {
    const nextHp = combatant.hp + delta;
    onUpdateCombatant({ ...combatant, hp: nextHp });
  };

  const adjustEnd = (delta: number) => {
    const nextEnd = Math.max(0, Math.min(combatant.maxEnd, combatant.end + delta));
    onUpdateCombatant({ ...combatant, end: nextEnd });
  };

  const adjustNonLethal = (delta: number) => {
    const nextNl = Math.max(0, combatant.nonLethalDmg + delta);
    onUpdateCombatant({ ...combatant, nonLethalDmg: nextNl });
  };

  const commitHpDraft = () => {
    const parsed = Number.parseInt(hpDraft, 10);
    if (Number.isNaN(parsed)) {
      setHpDraft(String(combatant.hp));
      return;
    }
    if (parsed !== combatant.hp) {
      onUpdateCombatant({ ...combatant, hp: parsed });
    }
  };

  const commitEndDraft = () => {
    const parsed = Number.parseInt(endDraft, 10);
    if (Number.isNaN(parsed)) {
      setEndDraft(String(combatant.end));
      return;
    }
    const clamped = Math.max(0, parsed);
    if (clamped !== combatant.end) {
      onUpdateCombatant({ ...combatant, end: clamped });
    } else {
      setEndDraft(String(clamped));
    }
  };

  const commitNlDraft = () => {
    const parsed = Number.parseInt(nlDraft, 10);
    if (Number.isNaN(parsed)) {
      setNlDraft(String(combatant.nonLethalDmg));
      return;
    }
    const clamped = Math.max(0, parsed);
    if (clamped !== combatant.nonLethalDmg) {
      onUpdateCombatant({ ...combatant, nonLethalDmg: clamped });
    } else {
      setNlDraft(String(clamped));
    }
  };

  const handleExtraAction = () => {
    if (combatant.end < 3) return;
    const nextEnd = combatant.end - 3;
    onUpdateCombatant(
      { ...combatant, end: nextEnd },
      {
        message: `${combatant.name}: ${ins.extraActionBtn} (${combatant.end} → ${nextEnd} END)`,
        type: 'system',
        skipDiff: true,
      }
    );
  };

  const handleExtraDefense = () => {
    const isFree = combatant.activeDodge;
    if (!isFree && combatant.end < 1) return;
    const nextEnd = isFree ? combatant.end : combatant.end - 1;
    onUpdateCombatant(
      {
        ...combatant,
        end: nextEnd,
        defensesUsedThisRound: combatant.defensesUsedThisRound + 1,
      },
      {
        message: isFree
          ? `${combatant.name}: ${ins.extraDefenseFreeBtn}`
          : `${combatant.name}: ${ins.extraDefenseBtn} (${combatant.end} → ${nextEnd} END)`,
        type: 'system',
        skipDiff: true,
      }
    );
  };

  const handleRecoveryAction = () => {
    const nextEnd = Math.min(combatant.maxEnd, combatant.end + eff.rec);
    onUpdateCombatant(
      {
        ...combatant,
        end: nextEnd,
        nonLethalDmg: Math.max(0, combatant.nonLethalDmg - eff.rec),
      },
      {
        message: `${combatant.name}: ${ins.recoverEndBtn(eff.rec)} (${combatant.end} → ${nextEnd} END)`,
        type: 'heal',
        skipDiff: true,
      }
    );
  };

  const handleDeathSave = () => {
    const roll = rollDie(10);
    // Death save target = base ÉTOU - cumulative rounds in death state (min 1)
    const target = Math.max(1, combatant.stats.etou - combatant.deathSaveRounds);
    // In Witcher TRPG, Stun/Death save succeeds on roll < target (guide/compétences.md line 39: "inférieur à cette caractéristique", or <= target)
    const succeeded = roll <= target;
    if (succeeded) {
      const msg = ins.deathSaveSuccess(roll, target);
      toast.success(msg);
      onUpdateCombatant(
        { ...combatant, deathSaveRounds: combatant.deathSaveRounds + 1 },
        { message: `${combatant.name}: ${msg}`, type: 'death', skipDiff: true }
      );
    } else {
      const msg = ins.deathSaveFail(roll, target);
      toast.error(msg);
      onUpdateCombatant(
        {
          ...combatant,
          isDead: true,
          deathSaveFailures: combatant.deathSaveFailures + 1,
        },
        { message: `${combatant.name}: ${msg}`, type: 'death', skipDiff: true }
      );
    }
  };

  const handleStabilizeDying = () => {
    toast.success(ins.stabilizeToast);
    onUpdateCombatant(
      {
        ...combatant,
        hp: 1,
        deathSaveRounds: 0,
        isDead: false,
      },
      { message: `${combatant.name}: ${ins.stabilizeToast}`, type: 'heal' }
    );
  };

  const handleAdjustArmor = (zone: HitLocationId, delta: number) => {
    const currentZone = combatant.armor[zone];
    if (!currentZone) return;
    const nextVal = Math.max(0, currentZone.current + delta);
    onUpdateCombatant({
      ...combatant,
      armor: {
        ...combatant.armor,
        [zone]: {
          current: nextVal,
          max: Math.max(currentZone.max, nextVal),
        },
      },
    });
  };

  const handleRepairAllArmor = () => {
    const nextArmor = { ...combatant.armor };
    for (const zone of activeZones) {
      nextArmor[zone] = {
        ...nextArmor[zone],
        current: nextArmor[zone].max,
      };
    }
    onUpdateCombatant({ ...combatant, armor: nextArmor });
  };

  const handleToggleCondition = (condId: ConditionId) => {
    const exists = combatant.conditions.includes(condId);
    const nextConditions = exists
      ? combatant.conditions.filter((c) => c !== condId)
      : [...combatant.conditions, condId];
    onUpdateCombatant({ ...combatant, conditions: nextConditions });
  };

  const handleRollAddCritical = () => {
    const { wound, noAnatomyExtraDamage } = rollCriticalWoundEntry(
      newCritSeverity,
      combatant.anatomy,
      currentRound
    );

    if (!wound && noAnatomyExtraDamage > 0) {
      const nextHp = combatant.hp - noAnatomyExtraDamage;
      const msg =
        lang === 'fr'
          ? `${combatant.name} (sans organes) subit +${noAnatomyExtraDamage} DÉG bonus au lieu d’une blessure critique.`
          : `${combatant.name} (no organs) takes +${noAnatomyExtraDamage} bonus DMG instead of an organ critical wound.`;
      toast.info(msg);
      onUpdateCombatant(
        { ...combatant, hp: nextHp },
        { message: msg, type: 'critical' }
      );
      return;
    }

    if (wound) {
      // Diff logger automatically records new critical wounds with turn context
      onUpdateCombatant({
        ...combatant,
        criticalWounds: [wound, ...combatant.criticalWounds],
      });
    }
  };

  const handleCycleCritState = (wound: CriticalWoundRecord) => {
    const idx = CRIT_STATE_ORDER.indexOf(wound.state);
    const nextState = CRIT_STATE_ORDER[(idx + 1) % CRIT_STATE_ORDER.length];
    onUpdateCombatant({
      ...combatant,
      criticalWounds: combatant.criticalWounds.map((w) =>
        w.id === wound.id ? { ...w, state: nextState } : w
      ),
    });
  };

  const handleRemoveCrit = (woundId: string) => {
    onUpdateCombatant({
      ...combatant,
      criticalWounds: combatant.criticalWounds.filter((w) => w.id !== woundId),
    });
  };

  const handleAdjustWeaponFia = (weaponId: string, delta: number) => {
    onUpdateCombatant({
      ...combatant,
      weapons: combatant.weapons.map((w) =>
        w.id === weaponId
          ? {
              ...w,
              reliability: Math.max(0, Math.min(w.maxReliability, w.reliability + delta)),
            }
          : w
      ),
    });
  };

  const handleAddWeapon = () => {
    if (!newWeaponName.trim()) return;
    const weapon: CombatantWeapon = {
      id: generateId('wpn'),
      name: newWeaponName.trim(),
      damage: newWeaponDamage.trim() || '2d6',
      damageType: 'slashing',
      isSilver: newWeaponSilver,
      penetration: 'none',
      reliability: 12,
      maxReliability: 12,
      attacksPerRound: 1,
      effectNote: '',
    };
    onUpdateCombatant({
      ...combatant,
      weapons: [...combatant.weapons, weapon],
    });
    setNewWeaponName('');
    setNewWeaponDamage('3d6');
    setNewWeaponSilver(false);
  };

  const handleRemoveWeapon = (weaponId: string) => {
    onUpdateCombatant({
      ...combatant,
      weapons: combatant.weapons.filter((w) => w.id !== weaponId),
    });
  };

  const statRows: { key: string; base: number; current: number }[] = [
    { key: 'RÉF', base: combatant.stats.ref, current: eff.ref },
    { key: 'DEX', base: combatant.stats.dex, current: eff.dex },
    { key: 'COR', base: combatant.stats.cor, current: eff.cor },
    { key: 'VIT', base: combatant.stats.vit, current: eff.vit },
    { key: 'INT', base: combatant.stats.int, current: eff.int },
    { key: 'VOL', base: combatant.stats.vol, current: eff.vol },
    { key: 'ÉTOU', base: combatant.stats.etou, current: eff.etou },
    { key: 'RÉC', base: combatant.stats.rec, current: eff.rec },
  ];

  const stabilizeDyingDc = Math.max(1, Math.abs(combatant.hp));

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-lg font-semibold">
                {combatant.name}
              </CardTitle>
              <Badge variant="outline">{copy.roles[combatant.role]}</Badge>
              <Badge variant="secondary">{copy.anatomy[combatant.anatomy]}</Badge>
              {combatant.resistantToNonSilver && (
                <Badge variant="outline">{ins.nonSilverResistantBadge}</Badge>
              )}
            </div>
            <CardDescription className="mt-1">
              {ins.woundThresholdLabel}:{' '}
              <span className="font-mono font-semibold text-foreground">
                {eff.woundThreshold} PS
              </span>
              {eff.attackPenalty !== 0 || eff.defensePenalty !== 0 ? (
                <span>
                  {' · '}
                  {lang === 'fr' ? 'Mod. actifs' : 'Active Mods'}: Att{' '}
                  {eff.attackPenalty}, Déf {eff.defensePenalty}
                </span>
              ) : null}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Inline Initiative Editor */}
            <div className="flex items-center gap-1 rounded-md border border-border bg-muted/30 px-2 py-1">
              <Label
                htmlFor={`inspector-init-${combatant.id}`}
                className="text-[11px] font-medium text-muted-foreground"
              >
                {ins.initiativeLabel}
              </Label>
              <Input
                id={`inspector-init-${combatant.id}`}
                type="number"
                value={initDraft}
                onChange={(e) => setInitDraft(e.target.value)}
                onBlur={() => {
                  const parsed = Number.parseInt(initDraft, 10);
                  if (Number.isNaN(parsed)) {
                    setInitDraft(String(combatant.initiative));
                    return;
                  }
                  if (parsed !== combatant.initiative) {
                    if (onUpdateInitiative) {
                      onUpdateInitiative(combatant.id, parsed);
                    } else {
                      onUpdateCombatant({
                        ...combatant,
                        initiative: parsed,
                        initiativeRoll: parsed - combatant.stats.ref,
                      });
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                className="h-6 w-14 px-1.5 text-center font-mono text-xs font-bold"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                title={copy.roster.rerollInitBtn}
                onClick={() => {
                  const rolled = combatant.stats.ref + rollDie(10);
                  if (onUpdateInitiative) {
                    onUpdateInitiative(combatant.id, rolled);
                  } else {
                    onUpdateCombatant({
                      ...combatant,
                      initiative: rolled,
                      initiativeRoll: rolled - combatant.stats.ref,
                    });
                  }
                }}
              >
                <Dices className="size-3.5" />
              </Button>
            </div>

            {combatant.isDead && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  onUpdateCombatant({
                    ...combatant,
                    isDead: false,
                    hp: Math.max(1, combatant.hp),
                    deathSaveRounds: 0,
                  })
                }
              >
                {ins.reviveBtn}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-0">
        {/* Status Warnings: Death State, Wound Threshold, Unconscious */}
        {eff.isDying && (
          <div className="flex flex-col gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-xs">
            <div className="flex items-start gap-2 font-medium text-destructive">
              <Skull className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{ins.deathStateBanner}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="destructive"
                size="xs"
                onClick={handleDeathSave}
              >
                <Dices data-icon="inline-start" />
                <span>{ins.deathSaveBtn}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleStabilizeDying}
              >
                <HeartPulse data-icon="inline-start" />
                <span>{ins.stabilizeBtn(stabilizeDyingDc)}</span>
              </Button>
            </div>
          </div>
        )}

        {eff.isWounded && (
          <div className="flex items-center gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-700 dark:text-amber-300">
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            <span>{ins.woundPenaltyActive}</span>
          </div>
        )}

        {eff.isUnconscious && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            <span>{ins.unconsciousBanner}</span>
          </div>
        )}

        <Tabs defaultValue="vitals" className="w-full gap-4">
          <TabsList className="flex w-full flex-wrap gap-1 sm:grid sm:grid-cols-3 sm:gap-0">
            <TabsTrigger value="vitals">{ins.vitalsTab}</TabsTrigger>
            <TabsTrigger value="armor">{ins.armorConditionsTab}</TabsTrigger>
            <TabsTrigger value="crits">{ins.criticalsWeaponsTab}</TabsTrigger>
          </TabsList>

          {/* TAB 1: Vitals, Combat Actions, Effective Stats */}
          <TabsContent value="vitals" className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {/* HP Adjuster */}
              <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <Label className="text-xs text-muted-foreground">
                  {ins.quickAdjustHp}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={hpDraft}
                    onChange={(e) => setHpDraft(e.target.value)}
                    onBlur={commitHpDraft}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        commitHpDraft();
                        e.currentTarget.blur();
                      }
                    }}
                    className="h-8 font-mono font-bold"
                  />
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    / {combatant.maxHp}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[-10, -5, -1, 1, 5, 10].map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant="outline"
                      size="xs"
                      className="flex-1 font-mono"
                      onClick={() => adjustHp(d)}
                    >
                      {d > 0 ? `+${d}` : d}
                    </Button>
                  ))}
                </div>
              </div>

              {/* END Adjuster */}
              <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <Label className="text-xs text-muted-foreground">
                  {ins.quickAdjustEnd}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={endDraft}
                    onChange={(e) => setEndDraft(e.target.value)}
                    onBlur={commitEndDraft}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        commitEndDraft();
                        e.currentTarget.blur();
                      }
                    }}
                    className="h-8 font-mono font-bold"
                  />
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    / {combatant.maxEnd}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[-5, -1, 1, 5].map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant="outline"
                      size="xs"
                      className="flex-1 font-mono"
                      onClick={() => adjustEnd(d)}
                    >
                      {d > 0 ? `+${d}` : d}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Non-Lethal Damage */}
              <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
                <Label className="text-xs text-muted-foreground">
                  {ins.quickAdjustNonLethal}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={nlDraft}
                    onChange={(e) => setNlDraft(e.target.value)}
                    onBlur={commitNlDraft}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        commitNlDraft();
                        e.currentTarget.blur();
                      }
                    }}
                    className="h-8 font-mono font-bold"
                  />
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    ≤ {combatant.end}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[-5, -1, 1, 5].map((d) => (
                    <Button
                      key={d}
                      type="button"
                      variant="outline"
                      size="xs"
                      className="flex-1 font-mono"
                      onClick={() => adjustNonLethal(d)}
                    >
                      {d > 0 ? `+${d}` : d}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Combat Actions & Tactical Toggles */}
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/20 p-3">
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleRecoveryAction}
              >
                <HeartPulse data-icon="inline-start" />
                <span>{ins.recoverEndBtn(eff.rec)}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleExtraAction}
                disabled={combatant.end < 3}
              >
                <Zap data-icon="inline-start" />
                <span>{ins.extraActionBtn}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={handleExtraDefense}
                disabled={!combatant.activeDodge && combatant.end < 1}
              >
                <Shield data-icon="inline-start" />
                <span>
                  {combatant.activeDodge
                    ? ins.extraDefenseFreeBtn
                    : ins.extraDefenseBtn}
                </span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() =>
                  onUpdateCombatant({
                    ...combatant,
                    aimStacks: Math.min(3, combatant.aimStacks + 1),
                  })
                }
                disabled={combatant.aimStacks >= 3}
              >
                <Crosshair data-icon="inline-start" />
                <span>{ins.aimActionBtn}</span>
              </Button>
              {combatant.aimStacks > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => onUpdateCombatant({ ...combatant, aimStacks: 0 })}
                >
                  {ins.clearAimBtn}
                </Button>
              )}

              <div className="flex items-center gap-2 pl-2">
                <Switch
                  id={`quickdraw-${combatant.id}`}
                  checked={combatant.quickDraw}
                  onCheckedChange={(checked) =>
                    onUpdateCombatant({ ...combatant, quickDraw: checked })
                  }
                />
                <Label
                  htmlFor={`quickdraw-${combatant.id}`}
                  className="cursor-pointer text-xs"
                >
                  {ins.quickDrawToggle}
                </Label>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <Switch
                  id={`activedodge-${combatant.id}`}
                  checked={combatant.activeDodge}
                  onCheckedChange={(checked) =>
                    onUpdateCombatant({ ...combatant, activeDodge: checked })
                  }
                />
                <Label
                  htmlFor={`activedodge-${combatant.id}`}
                  className="cursor-pointer text-xs"
                >
                  {ins.activeDodgeToggle}
                </Label>
              </div>
            </div>

            {/* Optional Adrenaline Rule Controls */}
            {useAdrenalineRule && (
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/20 p-3">
                <Badge variant="default" className="gap-1 font-mono">
                  <Flame className="size-3" />
                  <span>
                    {combatant.adrenalineDice} / {eff.cor} d6
                  </span>
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={combatant.adrenalineDice >= eff.cor}
                  onClick={() =>
                    onUpdateCombatant({
                      ...combatant,
                      adrenalineDice: Math.min(eff.cor, combatant.adrenalineDice + 1),
                    })
                  }
                >
                  {ins.adrenalineGainBtn}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={combatant.adrenalineDice <= 0 || combatant.end < 10}
                  onClick={() => {
                    const bonus = rollDie(6);
                    toast.info(`Adrénaline : +${bonus} DÉG (-10 END)`);
                    onUpdateCombatant({
                      ...combatant,
                      adrenalineDice: combatant.adrenalineDice - 1,
                      end: Math.max(0, combatant.end - 10),
                    });
                  }}
                >
                  {ins.adrenalineSpendDmgBtn}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={combatant.adrenalineDice <= 0 || combatant.end < 10}
                  onClick={() => {
                    const bonus = rollDie(6);
                    onUpdateCombatant({
                      ...combatant,
                      adrenalineDice: combatant.adrenalineDice - 1,
                      end: Math.max(0, combatant.end - 10),
                      tempHp: combatant.tempHp + bonus,
                    });
                  }}
                >
                  {ins.adrenalineSpendHpBtn}
                </Button>
                {combatant.hp < 0 && combatant.adrenalineDice > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="xs"
                    onClick={() =>
                      onUpdateCombatant({
                        ...combatant,
                        adrenalineDice: combatant.adrenalineDice - 1,
                        hp: 1,
                        deathSaveRounds: 0,
                      })
                    }
                  >
                    {ins.adrenalineEmergencyBtn}
                  </Button>
                )}
              </div>
            )}

            {/* Effective Stats Grid */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {ins.effectiveStatsTitle}
              </p>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {statRows.map((s) => {
                  const isPenalized = s.current < s.base;
                  return (
                    <div
                      key={s.key}
                      className={`flex flex-col items-center rounded-md border px-2 py-1.5 text-center ${
                        isPenalized
                          ? 'border-amber-500/40 bg-amber-500/10'
                          : 'border-border bg-card'
                      }`}
                    >
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {s.key}
                      </span>
                      <span
                        className={`font-mono text-sm font-bold ${
                          isPenalized ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'
                        }`}
                      >
                        {s.current}
                      </span>
                      {isPenalized && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          ({s.base})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Per-Location Armor & Status Conditions */}
          <TabsContent value="armor" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {ins.armorTitle}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleRepairAllArmor}
                >
                  <Wrench data-icon="inline-start" />
                  <span>{ins.repairAllArmor}</span>
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {activeZones.map((zone) => {
                  const zoneState = combatant.armor[zone];
                  const broken = zoneState.max > 0 && zoneState.current === 0;
                  return (
                    <div
                      key={zone}
                      className={`flex items-center justify-between rounded-md border px-3 py-2 ${
                        broken
                          ? 'border-destructive/40 bg-destructive/10'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-foreground">
                          {getLocationLabel(zone, combatant.anatomy, lang)}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {zoneState.current} / {zoneState.max} PA
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => handleAdjustArmor(zone, -1)}
                        >
                          -
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => handleAdjustArmor(zone, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {ins.conditionsTitle}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CONDITIONS_CATALOG.map((cond) => {
                  const active = combatant.conditions.includes(cond.id);
                  return (
                    <Tooltip key={cond.id}>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant={active ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleToggleCondition(cond.id)}
                            className="h-auto justify-between px-2.5 py-2 text-left"
                          />
                        }
                      >
                        <div className="flex flex-col items-start gap-0.5 overflow-hidden">
                          <span className="truncate text-xs font-semibold">
                            {cond.name[lang]}
                          </span>
                          <span
                            className={`truncate text-[10px] ${
                              active
                                ? 'text-primary-foreground/80'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {cond.shortEffect[lang]}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-xs">
                        <p className="font-semibold">{cond.name[lang]}</p>
                        <p className="mt-1">{cond.fullRule[lang]}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Critical Wounds, Weapons Fiabilité & Traits */}
          <TabsContent value="crits" className="flex flex-col gap-4">
            {/* Critical Wounds Section */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {ins.criticalsTitle}
                </p>
                <div className="flex items-center gap-2">
                  <Select
                    value={newCritSeverity}
                    onValueChange={(v) => {
                      if (
                        v === 'simple' ||
                        v === 'complex' ||
                        v === 'difficult' ||
                        v === 'mortal'
                      ) {
                        setNewCritSeverity(v);
                      }
                    }}
                  >
                    <SelectTrigger className="h-7 w-40 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">
                        {ins.critSeverities.simple}
                      </SelectItem>
                      <SelectItem value="complex">
                        {ins.critSeverities.complex}
                      </SelectItem>
                      <SelectItem value="difficult">
                        {ins.critSeverities.difficult}
                      </SelectItem>
                      <SelectItem value="mortal">
                        {ins.critSeverities.mortal}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="destructive"
                    size="xs"
                    onClick={handleRollAddCritical}
                  >
                    <Dices data-icon="inline-start" />
                    <span>{ins.addRandomCrit}</span>
                  </Button>
                </div>
              </div>

              {combatant.criticalWounds.length === 0 ? (
                <p className="rounded-md border border-dashed border-border py-4 text-center text-xs text-muted-foreground">
                  {ins.noCriticals}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {combatant.criticalWounds.map((wound) => {
                    const stabDc = CRITICAL_TIER_META[wound.severity].stabilizeDc;
                    const effectText =
                      wound.state === 'active'
                        ? wound.activeEffect[lang]
                        : wound.state === 'stabilized'
                          ? wound.stabilizedEffect[lang]
                          : wound.treatedEffect[lang];
                    return (
                      <div
                        key={wound.id}
                        className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/20 p-2.5 text-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge variant="destructive">
                              {ins.critSeverities[wound.severity]}
                            </Badge>
                            <span className="font-semibold text-foreground">
                              {wound.title[lang]}
                            </span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              (2d6: {wound.rollLabel})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Button
                              type="button"
                              variant={
                                wound.state === 'active'
                                  ? 'destructive'
                                  : wound.state === 'stabilized'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              size="xs"
                              onClick={() => handleCycleCritState(wound)}
                              title={`SD ${stabDc}`}
                            >
                              {ins.critStateLabels[wound.state]} (SD {stabDc})
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => handleRemoveCrit(wound.id)}
                              aria-label="Remove wound"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{effectText}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Separator />

            {/* Weapons & Fiabilité Section */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {ins.weaponsTitle}
              </p>

              {combatant.weapons.length > 0 && (
                <div className="flex flex-col gap-2">
                  {combatant.weapons.map((wpn) => (
                    <div
                      key={wpn.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-xs"
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-foreground">
                            {wpn.name}
                          </span>
                          <Badge variant="outline" className="font-mono">
                            {wpn.damage}
                          </Badge>
                          {wpn.isSilver && (
                            <Badge variant="secondary">{ins.silverLabel}</Badge>
                          )}
                          {wpn.attacksPerRound > 1 && (
                            <Badge variant="outline">
                              {wpn.attacksPerRound} att/rd
                            </Badge>
                          )}
                        </div>
                        {wpn.effectNote && (
                          <span className="text-[11px] text-muted-foreground">
                            {wpn.effectNote}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-muted-foreground">
                          {ins.fiaLabel}: {wpn.reliability}/{wpn.maxReliability}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => handleAdjustWeaponFia(wpn.id, -1)}
                        >
                          -
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          onClick={() => handleAdjustWeaponFia(wpn.id, 1)}
                        >
                          +
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleRemoveWeapon(wpn.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <Input
                  value={newWeaponName}
                  onChange={(e) => setNewWeaponName(e.target.value)}
                  placeholder={ins.weaponNamePlaceholder}
                  className="h-8 min-w-36 flex-1 text-xs"
                />
                <Input
                  value={newWeaponDamage}
                  onChange={(e) => setNewWeaponDamage(e.target.value)}
                  placeholder={ins.weaponDamagePlaceholder}
                  className="h-8 w-28 font-mono text-xs"
                />
                <div className="flex items-center gap-1.5">
                  <Switch
                    id={`new-wpn-silver-${combatant.id}`}
                    checked={newWeaponSilver}
                    onCheckedChange={setNewWeaponSilver}
                  />
                  <Label
                    htmlFor={`new-wpn-silver-${combatant.id}`}
                    className="text-xs"
                  >
                    {ins.silverLabel}
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleAddWeapon}
                >
                  <Plus data-icon="inline-start" />
                  <span>{ins.addWeaponBtn}</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Abilities, Vulnerabilities & GM Notes */}
            <div className="flex flex-col gap-2">
              {(combatant.vulnerabilities.length > 0 ||
                combatant.abilities.length > 0) && (
                <div className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/20 p-2.5 text-xs">
                  {combatant.vulnerabilities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-semibold text-destructive">
                        {ins.vulnerabilitiesLabel}:
                      </span>
                      <span>{combatant.vulnerabilities.join(', ')}</span>
                    </div>
                  )}
                  {combatant.abilities.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
                      <span className="font-semibold">{ins.abilitiesLabel}:</span>
                      <span>{combatant.abilities.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              <Label
                htmlFor={`notes-${combatant.id}`}
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {ins.notesLabel}
              </Label>
              <Textarea
                id={`notes-${combatant.id}`}
                value={combatant.notes}
                onChange={(e) =>
                  onUpdateCombatant({ ...combatant, notes: e.target.value })
                }
                placeholder={ins.notesPlaceholder}
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
