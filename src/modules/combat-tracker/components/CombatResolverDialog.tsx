import { useEffect, useMemo, useState } from 'react';
import { Dices, ShieldAlert, Swords } from 'lucide-react';
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
import {
  COVER_PA_REFERENCE,
  RANGE_MODIFIERS_REFERENCE,
  getHitLocationsForAnatomy,
  getLocationLabel,
} from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  Combatant,
  DamageType,
  HitLocationId,
  LightingConditionId,
  ModuleLanguage,
  PenetrationTier,
} from '../types';
import {
  applyDamageToCombatant,
  calculateSingleLocationDamage,
  formatTurnPrefix,
  getActiveArmorLocations,
  getCriticalTierFromMargin,
  getEffectiveCombatStats,
  getLocalizedFumbleEffect,
  resolveHitLocation,
  rollCriticalWoundEntry,
  rollDiceFormula,
  rollDie,
  rollWitcherD10,
} from '../utils/combatEngine';

interface CombatResolverDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  combatants: readonly Combatant[];
  defaultAttackerId: string | null;
  activeActorName?: string | null;
  lightLevel: LightingConditionId;
  currentRound: number;
  lang: ModuleLanguage;
  onApplyResolution: (
    updatedTarget: Combatant,
    logMessages: { type: 'damage' | 'critical' | 'fumble'; text: string }[]
  ) => void;
}

type StrikeMode = 'normal' | 'fast' | 'strong' | 'explosive';

/**
 * Interactive Witcher TRPG Attack & Damage Resolution Engine:
 * computes exploding 1d10 rolls, hit/miss, critical wound tier (+7/+10/+13/+15),
 * fumble severity, hit location, cover PA, penetration, silver/fire resistance,
 * SP degradation, and one-click damage application.
 */
export function CombatResolverDialog({
  open,
  onOpenChange,
  combatants,
  defaultAttackerId,
  activeActorName,
  lightLevel,
  currentRound,
  lang,
  onApplyResolution,
}: CombatResolverDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const rv = copy.resolver;

  const [attackerId, setAttackerId] = useState<string>('custom');
  const [defenderId, setDefenderId] = useState<string>('');
  const [weaponId, setWeaponId] = useState<string>('custom');

  const [attackBase, setAttackBase] = useState(12);
  const [defenseBase, setDefenseBase] = useState(12);
  const [attackDie, setAttackDie] = useState(6);
  const [defenseDie, setDefenseDie] = useState(5);
  const [attackRolls, setAttackRolls] = useState<number[] | null>(null);
  const [defenseRolls, setDefenseRolls] = useState<number[] | null>(null);
  const [directAttackMode, setDirectAttackMode] = useState(false);
  const [directDefenseMode, setDirectDefenseMode] = useState(false);
  const [attackDirectTotal, setAttackDirectTotal] = useState(18);
  const [defenseDirectTotal, setDefenseDirectTotal] = useState(16);
  const [attackFumbleSeverity, setAttackFumbleSeverity] = useState(0);
  const [defenseFumbleSeverity, setDefenseFumbleSeverity] = useState(0);

  const [strikeMode, setStrikeMode] = useState<StrikeMode>('normal');
  const [flankingAttackers, setFlankingAttackers] = useState(0);
  const [rangeMod, setRangeMod] = useState(0);
  const [coverSp, setCoverSp] = useState(0);
  const [aimBonus, setAimBonus] = useState(0);

  const [locationRoll, setLocationRoll] = useState(3);
  const [explicitLocation, setExplicitLocation] = useState<'random' | HitLocationId>(
    'random'
  );

  const [rawDamage, setRawDamage] = useState(14);
  const [damageType, setDamageType] = useState<DamageType>('slashing');
  const [penetration, setPenetration] = useState<PenetrationTier>('none');
  const [isSilver, setIsSilver] = useState(false);
  const [isTargetResistant, setIsTargetResistant] = useState(false);
  const [isTargetVulnerable, setIsTargetVulnerable] = useState(false);
  const [isNonLethal, setIsNonLethal] = useState(false);

  // Sync defaults when opened
  useEffect(() => {
    if (!open || combatants.length === 0) return;
    const initAttacker =
      combatants.find((c) => c.id === defaultAttackerId) ?? combatants[0];
    setAttackerId(initAttacker.id);
    const defaultTarget =
      combatants.find((c) => c.id !== initAttacker.id && !c.isDead) ?? combatants[0];
    setDefenderId(defaultTarget.id);
    setAttackFumbleSeverity(0);
    setDefenseFumbleSeverity(0);
    setAttackRolls(null);
    setDefenseRolls(null);
    setAimBonus(initAttacker.aimStacks);

    const firstWpn = initAttacker.weapons[0];
    if (firstWpn) {
      setWeaponId(firstWpn.id);
      setDamageType(firstWpn.damageType);
      setPenetration(firstWpn.penetration);
      setIsSilver(firstWpn.isSilver);
    } else {
      setWeaponId('custom');
    }
  }, [open, defaultAttackerId, combatants]);

  const attacker = combatants.find((c) => c.id === attackerId) ?? null;
  const defender = combatants.find((c) => c.id === defenderId) ?? null;
  const selectedWeapon =
    attacker?.weapons.find((w) => w.id === weaponId) ?? null;

  // Sync weapon properties when weapon selection changes
  const handleSelectWeapon = (nextWpnId: string) => {
    setWeaponId(nextWpnId);
    const found = attacker?.weapons.find((w) => w.id === nextWpnId);
    if (found) {
      setDamageType(found.damageType);
      setPenetration(found.penetration);
      setIsSilver(found.isSilver);
      const rolled = rollDiceFormula(found.damage);
      setRawDamage(rolled.total);
    }
  };

  // Compute situational mods automatically from active combatant states
  const lightMod = lightLevel === 'darkness' ? -2 : 0;
  const attackerEff = attacker ? getEffectiveCombatStats(attacker) : null;
  const defenderEff = defender ? getEffectiveCombatStats(defender) : null;

  const targetedLocPenalty = useMemo(() => {
    if (!defender || explicitLocation === 'random') return 0;
    const row = getHitLocationsForAnatomy(defender.anatomy).find(
      (r) => r.id === explicitLocation
    );
    return row ? row.aimPenalty : 0;
  }, [defender, explicitLocation]);

  const strongStrikePenalty = strikeMode === 'strong' ? -3 : 0;
  const activeDodgeMod =
    defender?.activeDodge && rangeMod === 0 ? -2 : 0;

  const totalAttackScore = directAttackMode
    ? Math.max(0, attackDirectTotal)
    : Math.max(
        0,
        attackBase +
          attackDie +
          (attackerEff?.attackPenalty ?? 0) +
          lightMod +
          rangeMod +
          aimBonus +
          targetedLocPenalty +
          strongStrikePenalty +
          activeDodgeMod
      );

  // Stunned targets have flat DC 10 to hit (guide/combat.md line 346)
  const isDefenderStunned = defender?.conditions.includes('stunned') ?? false;
  const totalDefenseScore = isDefenderStunned
    ? 10
    : directDefenseMode
      ? Math.max(0, defenseDirectTotal - Math.max(0, flankingAttackers))
      : Math.max(
          0,
          defenseBase +
            defenseDie +
            (defenderEff?.defensePenalty ?? 0) +
            lightMod -
            Math.max(0, flankingAttackers)
        );

  const margin = totalAttackScore - totalDefenseScore;
  const isHit = margin > 0;
  const critSeverity = isHit ? getCriticalTierFromMargin(margin) : null;

  const resolvedLocRow = useMemo(() => {
    if (!defender) return null;
    return resolveHitLocation(defender.anatomy, locationRoll, explicitLocation);
  }, [defender, locationRoll, explicitLocation]);

  const previewResults = useMemo(() => {
    if (!defender || !resolvedLocRow) return [];
    const targetZones: readonly HitLocationId[] =
      strikeMode === 'explosive'
        ? getActiveArmorLocations(defender.anatomy)
        : [resolvedLocRow.id];

    return targetZones.map((zoneId, idx) =>
      calculateSingleLocationDamage({
        target: defender,
        rawDamage,
        locationId: zoneId,
        damageType,
        penetration,
        isSilverWeapon: isSilver,
        isTargetResistant,
        isTargetVulnerable,
        coverSp,
        critSeverity: idx === 0 ? critSeverity : null,
        isStrongStrike: strikeMode === 'strong',
        isNonLethal,
      })
    );
  }, [
    coverSp,
    critSeverity,
    damageType,
    defender,
    isNonLethal,
    isSilver,
    isTargetResistant,
    isTargetVulnerable,
    penetration,
    rawDamage,
    resolvedLocRow,
    strikeMode,
  ]);

  const previewTotalDamage = previewResults.reduce(
    (sum, r) => sum + r.finalDamage,
    0
  );

  const handleRollAttackOnly = () => {
    const att = rollWitcherD10();
    setDirectAttackMode(false);
    setAttackDie(att.dieValue);
    setAttackRolls(att.rolls);
    setAttackFumbleSeverity(att.fumbleSeverity);
  };

  const handleRollDefenseOnly = () => {
    const def = rollWitcherD10();
    setDirectDefenseMode(false);
    setDefenseDie(def.dieValue);
    setDefenseRolls(def.rolls);
    setDefenseFumbleSeverity(def.fumbleSeverity);
  };

  const handleRollBothDice = () => {
    const att = rollWitcherD10();
    const def = rollWitcherD10();
    if (!directAttackMode) {
      setAttackDie(att.dieValue);
      setAttackRolls(att.rolls);
      setAttackFumbleSeverity(att.fumbleSeverity);
    }
    if (!directDefenseMode && !isDefenderStunned) {
      setDefenseDie(def.dieValue);
      setDefenseRolls(def.rolls);
      setDefenseFumbleSeverity(def.fumbleSeverity);
    }
    setLocationRoll(rollDie(10));
    if (selectedWeapon) {
      setRawDamage(rollDiceFormula(selectedWeapon.damage).total);
    }
  };

  const handleApply = () => {
    if (!defender || !resolvedLocRow) return;

    const logs: { type: 'damage' | 'critical' | 'fumble'; text: string }[] = [];
    const targetPrefix = formatTurnPrefix(activeActorName, defender.name, lang);
    const attackerName = attacker?.name ?? rv.customAttacker;
    const attackerPrefix = formatTurnPrefix(activeActorName, attackerName, lang);

    if (attackFumbleSeverity > 0) {
      const fumbleTxt = getLocalizedFumbleEffect(
        rangeMod !== 0 ? 'ranged' : 'melee',
        attackFumbleSeverity,
        lang
      );
      const fumbleHeader =
        lang === 'fr'
          ? `Échec critique Attaque · gravité ${attackFumbleSeverity}`
          : `Attack Critical Fumble · severity ${attackFumbleSeverity}`;
      logs.push({
        type: 'fumble',
        text: `${attackerPrefix}${attackerName} (${fumbleHeader}) : ${fumbleTxt}`,
      });
    }

    if (defenseFumbleSeverity > 0) {
      const fumbleTxt = getLocalizedFumbleEffect(
        'unarmed',
        defenseFumbleSeverity,
        lang
      );
      const fumbleHeader =
        lang === 'fr'
          ? `Échec critique Défense · gravité ${defenseFumbleSeverity}`
          : `Defense Critical Fumble · severity ${defenseFumbleSeverity}`;
      logs.push({
        type: 'fumble',
        text: `${targetPrefix}${defender.name} (${fumbleHeader}) : ${fumbleTxt}`,
      });
    }

    const rolledCrit = critSeverity
      ? rollCriticalWoundEntry(
          critSeverity,
          defender.anatomy,
          currentRound,
          resolvedLocRow.id
        )
      : { wound: null, noAnatomyExtraDamage: 0 };

    // If Elemental/Specter avoided organ wound, add flat bonus damage into first result
    const finalResults = previewResults.map((res, idx) =>
      idx === 0 && rolledCrit.noAnatomyExtraDamage > 0
        ? {
            ...res,
            critBonusDamage: res.critBonusDamage + rolledCrit.noAnatomyExtraDamage,
            finalDamage: res.finalDamage + rolledCrit.noAnatomyExtraDamage,
          }
        : res
    );

    const applied = applyDamageToCombatant(
      defender,
      finalResults,
      rolledCrit.wound
    );

    const locName = getLocationLabel(
      resolvedLocRow.id,
      defender.anatomy,
      lang
    );
    const dmgSummary =
      lang === 'fr'
        ? `${targetPrefix}${attackerName} → ${defender.name} (${strikeMode === 'explosive' ? 'Toutes zones' : locName}) : ${applied.totalApplied} ${isNonLethal ? 'NL' : 'PS'} (${defender.hp} → ${applied.updated.hp} PS).`
        : `${targetPrefix}${attackerName} → ${defender.name} (${strikeMode === 'explosive' ? 'All zones' : locName}): ${applied.totalApplied} ${isNonLethal ? 'NL' : 'HP'} (${defender.hp} → ${applied.updated.hp} HP).`;
    logs.push({ type: 'damage', text: dmgSummary });

    if (rolledCrit.wound) {
      logs.push({
        type: 'critical',
        text: `${targetPrefix}${defender.name}: ${rolledCrit.wound.title[lang]} — ${rolledCrit.wound.activeEffect[lang]}`,
      });
    }

    onApplyResolution(applied.updated, logs);
    toast.success(rv.appliedToast(defender.name, applied.totalApplied));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Swords className="size-5 text-primary" aria-hidden="true" />
            <span>{rv.title}</span>
          </DialogTitle>
          <DialogDescription>{rv.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:max-h-[72dvh] md:grid-cols-2 md:overflow-y-auto md:pr-1">
          {/* Left Column: Participants & Attack/Defense Roll */}
          <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.attackerLabel}</Label>
                <Select
                  value={attackerId}
                  onValueChange={(v) => v && setAttackerId(v)}
                >
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">{rv.customAttacker}</SelectItem>
                    {combatants.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.defenderLabel}</Label>
                <Select
                  value={defenderId}
                  onValueChange={(v) => v && setDefenderId(v)}
                >
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {combatants.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.hp} PS)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {attacker && attacker.weapons.length > 0 && (
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.weaponLabel}</Label>
                <Select value={weaponId} onValueChange={(v) => v && handleSelectWeapon(v)}>
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">{rv.customWeapon}</SelectItem>
                    {attacker.weapons.map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        {w.name} ({w.damage})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Separator />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {rv.attackRollSection}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleRollAttackOnly}
                >
                  <Dices data-icon="inline-start" />
                  <span>{rv.rollAttackDieBtn}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={isDefenderStunned}
                  onClick={handleRollDefenseOnly}
                >
                  <Dices data-icon="inline-start" />
                  <span>{rv.rollDefenseDieBtn}</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={handleRollBothDice}
                >
                  <Dices data-icon="inline-start" />
                  <span>{rv.rollDiceBtn}</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Attack Column (Base+1d10 OR Direct PC Total) */}
              <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/20 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs font-semibold text-foreground">
                    {rv.attackerLabel}
                  </Label>
                  <div className="flex items-center gap-1.5">
                    <Switch
                      id="direct-attack-mode"
                      checked={directAttackMode}
                      onCheckedChange={setDirectAttackMode}
                    />
                    <Label
                      htmlFor="direct-attack-mode"
                      className="cursor-pointer text-[11px] text-muted-foreground"
                    >
                      {rv.directTotalToggle}
                    </Label>
                  </div>
                </div>

                {directAttackMode ? (
                  <div className="flex flex-col gap-1">
                    <Label className="text-[11px] text-muted-foreground">
                      {rv.attackDirectTotalLabel}
                    </Label>
                    <Input
                      type="number"
                      value={attackDirectTotal}
                      onChange={(e) =>
                        setAttackDirectTotal(Number.parseInt(e.target.value, 10) || 0)
                      }
                      className="font-mono font-bold"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <Label className="text-[11px] text-muted-foreground">
                        {rv.attackBaseLabel}
                      </Label>
                      <Input
                        type="number"
                        value={attackBase}
                        onChange={(e) =>
                          setAttackBase(Number.parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-[11px] text-muted-foreground">
                        {rv.attackDieLabel}
                      </Label>
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          value={attackDie}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value, 10) || 0;
                            setAttackDie(val);
                            setAttackRolls(null);
                            setAttackFumbleSeverity(val < 0 ? Math.abs(val) : 0);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleRollAttackOnly}
                          title={rv.rollAttackDieBtn}
                        >
                          <Dices className="size-4" />
                        </Button>
                      </div>
                      {attackRolls && (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {rv.diceResultDetail(attackRolls, attackDie)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Defense Column (Base+1d10 OR Direct PC Total) */}
              <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/20 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs font-semibold text-foreground">
                    {rv.defenderLabel}
                  </Label>
                  <div className="flex items-center gap-1.5">
                    <Switch
                      id="direct-defense-mode"
                      checked={directDefenseMode}
                      disabled={isDefenderStunned}
                      onCheckedChange={setDirectDefenseMode}
                    />
                    <Label
                      htmlFor="direct-defense-mode"
                      className="cursor-pointer text-[11px] text-muted-foreground"
                    >
                      {rv.directTotalToggle}
                    </Label>
                  </div>
                </div>

                {directDefenseMode ? (
                  <div className="flex flex-col gap-1">
                    <Label className="text-[11px] text-muted-foreground">
                      {rv.defenseDirectTotalLabel}
                    </Label>
                    <Input
                      type="number"
                      disabled={isDefenderStunned}
                      value={defenseDirectTotal}
                      onChange={(e) =>
                        setDefenseDirectTotal(Number.parseInt(e.target.value, 10) || 0)
                      }
                      className="font-mono font-bold"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <Label className="text-[11px] text-muted-foreground">
                        {rv.defenseBaseLabel}
                      </Label>
                      <Input
                        type="number"
                        disabled={isDefenderStunned}
                        value={defenseBase}
                        onChange={(e) =>
                          setDefenseBase(Number.parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-[11px] text-muted-foreground">
                        {rv.defenseDieLabel}
                      </Label>
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          value={defenseDie}
                          disabled={isDefenderStunned}
                          onChange={(e) => {
                            const val = Number.parseInt(e.target.value, 10) || 0;
                            setDefenseDie(val);
                            setDefenseRolls(null);
                            setDefenseFumbleSeverity(val < 0 ? Math.abs(val) : 0);
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          disabled={isDefenderStunned}
                          onClick={handleRollDefenseOnly}
                          title={rv.rollDefenseDieBtn}
                        >
                          <Dices className="size-4" />
                        </Button>
                      </div>
                      {defenseRolls && (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {rv.diceResultDetail(defenseRolls, defenseDie)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.strikeModeLabel}</Label>
                <Select
                  value={strikeMode}
                  onValueChange={(v) => {
                    if (
                      v === 'normal' ||
                      v === 'fast' ||
                      v === 'strong' ||
                      v === 'explosive'
                    ) {
                      setStrikeMode(v);
                    }
                  }}
                >
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">{rv.strikeNormal}</SelectItem>
                    <SelectItem value="fast">{rv.strikeFast}</SelectItem>
                    <SelectItem value="strong">{rv.strikeStrong}</SelectItem>
                    <SelectItem value="explosive">{rv.strikeExplosive}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.rangeLabel}</Label>
                <Select
                  value={String(rangeMod)}
                  onValueChange={(v) => setRangeMod(Number(v ?? '0') || 0)}
                >
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RANGE_MODIFIERS_REFERENCE.map((rng) => (
                      <SelectItem key={rng.id} value={String(rng.mod)}>
                        {rng.label[lang]} ({rng.mod >= 0 ? `+${rng.mod}` : rng.mod})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.aimBonusLabel}</Label>
                <Input
                  type="number"
                  min={0}
                  max={3}
                  value={aimBonus}
                  onChange={(e) =>
                    setAimBonus(Math.max(0, Math.min(3, Number(e.target.value) || 0)))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.flankingLabel}</Label>
                <Input
                  type="number"
                  min={0}
                  max={8}
                  value={flankingAttackers}
                  onChange={(e) =>
                    setFlankingAttackers(Math.max(0, Number(e.target.value) || 0))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.coverLabel}</Label>
                <Select
                  value={String(coverSp)}
                  onValueChange={(v) => setCoverSp(Number(v ?? '0') || 0)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COVER_PA_REFERENCE.map((cov) => (
                      <SelectItem key={cov.id} value={String(cov.sp)}>
                        {cov.label[lang]} ({cov.sp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right Column: Hit Location, Damage Calculation & Live Preview */}
          <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {rv.damageSection}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.hitLocationLabel}</Label>
                <Select
                  value={explicitLocation}
                  onValueChange={(v) => {
                    if (
                      v === 'random' ||
                      v === 'head' ||
                      v === 'torso' ||
                      v === 'rightArm' ||
                      v === 'leftArm' ||
                      v === 'rightLeg' ||
                      v === 'leftLeg'
                    ) {
                      setExplicitLocation(v);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">{rv.randomLocationOption}</SelectItem>
                    {defender &&
                      getHitLocationsForAnatomy(defender.anatomy).map((loc) => (
                        <SelectItem key={loc.id} value={loc.id}>
                          {loc.name[lang]} ({loc.aimPenalty}, {loc.multiplierLabel})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">1d10 ({rv.hitLocationLabel})</Label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    disabled={explicitLocation !== 'random'}
                    value={locationRoll}
                    onChange={(e) =>
                      setLocationRoll(
                        Math.max(1, Math.min(10, Number(e.target.value) || 1))
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={explicitLocation !== 'random'}
                    onClick={() => setLocationRoll(rollDie(10))}
                    className="shrink-0"
                  >
                    <Dices data-icon="inline-start" />
                    <span>{rv.rollLocationBtn}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.rawDamageLabel}</Label>
                <div className="flex gap-1">
                  <Input
                    type="number"
                    min={0}
                    value={rawDamage}
                    onChange={(e) =>
                      setRawDamage(Math.max(0, Number(e.target.value) || 0))
                    }
                  />
                  {selectedWeapon && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setRawDamage(rollDiceFormula(selectedWeapon.damage).total)
                      }
                      className="shrink-0"
                    >
                      <Dices data-icon="inline-start" />
                      <span>{rv.rollDamageBtn}</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{rv.damageTypeLabel}</Label>
                <Select
                  value={damageType}
                  onValueChange={(v) => {
                    if (
                      v === 'slashing' ||
                      v === 'piercing' ||
                      v === 'bludgeoning' ||
                      v === 'elemental'
                    ) {
                      setDamageType(v);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slashing">{rv.damageTypes.slashing}</SelectItem>
                    <SelectItem value="piercing">{rv.damageTypes.piercing}</SelectItem>
                    <SelectItem value="bludgeoning">
                      {rv.damageTypes.bludgeoning}
                    </SelectItem>
                    <SelectItem value="elemental">
                      {rv.damageTypes.elemental}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">{rv.penetrationLabel}</Label>
              <Select
                value={penetration}
                onValueChange={(v) => {
                  if (v === 'none' || v === 'normal' || v === 'improved') {
                    setPenetration(v);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{rv.penetrationTiers.none}</SelectItem>
                  <SelectItem value="normal">{rv.penetrationTiers.normal}</SelectItem>
                  <SelectItem value="improved">
                    {rv.penetrationTiers.improved}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Switch
                  id="resolver-silver"
                  checked={isSilver}
                  onCheckedChange={setIsSilver}
                />
                <Label htmlFor="resolver-silver" className="cursor-pointer text-xs">
                  {rv.isSilverLabel}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="resolver-nonlethal"
                  checked={isNonLethal}
                  onCheckedChange={setIsNonLethal}
                />
                <Label
                  htmlFor="resolver-nonlethal"
                  className="cursor-pointer text-xs"
                >
                  {rv.isNonLethalLabel}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="resolver-resist"
                  checked={isTargetResistant}
                  onCheckedChange={setIsTargetResistant}
                />
                <Label htmlFor="resolver-resist" className="cursor-pointer text-xs">
                  {rv.isTargetResistantLabel}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="resolver-vuln"
                  checked={isTargetVulnerable}
                  onCheckedChange={setIsTargetVulnerable}
                />
                <Label htmlFor="resolver-vuln" className="cursor-pointer text-xs">
                  {rv.isTargetVulnerableLabel}
                </Label>
              </div>
            </div>

            <Separator />

            {/* Live Resolution Preview */}
            <div className="flex flex-col gap-2 rounded-md border border-border bg-muted/30 p-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                  {rv.previewTitle}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant={isHit ? 'default' : 'secondary'}>
                    {totalAttackScore} vs {totalDefenseScore} →{' '}
                    {isHit ? rv.outcomeHit : rv.outcomeMiss}
                  </Badge>
                  {critSeverity && (
                    <Badge variant="destructive">
                      {lang === 'fr' ? 'CRITIQUE' : 'CRITICAL'}{' '}
                      {copy.inspector.critSeverities[critSeverity]}
                    </Badge>
                  )}
                </div>
              </div>

              {lightLevel === 'darkness' && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400">
                  {lang === 'fr'
                    ? 'Luminosité (Ténèbres) : -2 Att & Déf appliqué automatiquement.'
                    : 'Lighting (Darkness): -2 Att & Def applied automatically.'}
                </p>
              )}

              {lightLevel === 'bright' && (
                <p className="text-[11px] text-muted-foreground">
                  {lang === 'fr'
                    ? 'Lumière brillante : appliquez manuellement -3 au combattant face au soleil.'
                    : 'Bright Light: apply -3 manually to whichever combatant faces the sun.'}
                </p>
              )}

              {attackFumbleSeverity > 0 && (
                <div className="flex items-center gap-1.5 text-destructive">
                  <ShieldAlert className="size-3.5 shrink-0" />
                  <span>
                    {rv.outcomeFumble(
                      attacker?.name ?? 'Att.',
                      attackFumbleSeverity
                    )}
                    :{' '}
                    {getLocalizedFumbleEffect(
                      rangeMod !== 0 ? 'ranged' : 'melee',
                      attackFumbleSeverity,
                      lang
                    )}
                  </span>
                </div>
              )}

              {defenseFumbleSeverity > 0 && (
                <div className="flex items-center gap-1.5 text-destructive">
                  <ShieldAlert className="size-3.5 shrink-0" />
                  <span>
                    {rv.outcomeFumble(
                      `${defender?.name ?? 'Déf.'} (${lang === 'fr' ? 'Défense' : 'Defense'})`,
                      defenseFumbleSeverity
                    )}
                    :{' '}
                    {getLocalizedFumbleEffect(
                      'unarmed',
                      defenseFumbleSeverity,
                      lang
                    )}
                  </span>
                </div>
              )}

              {defender && resolvedLocRow && (
                <div className="flex flex-col gap-1 text-muted-foreground">
                  {previewResults.map((res) => (
                    <div
                      key={res.locationId}
                      className="flex items-center justify-between font-mono"
                    >
                      <span>
                        {getLocationLabel(res.locationId, defender.anatomy, lang)}{' '}
                        ({resolvedLocRow.multiplierLabel}, PA {res.effectiveArmorSp})
                      </span>
                      <span className="font-bold text-foreground">
                        {res.finalDamage} {isNonLethal ? 'NL' : 'PS'}
                        {res.armorDegradedBy > 0 ? ' (-1 PA)' : ''}
                      </span>
                    </div>
                  ))}
                  <div className="mt-1 flex items-center justify-between border-t border-border pt-1 font-semibold text-foreground">
                    <span>Total</span>
                    <span className="font-mono text-sm">
                      {previewTotalDamage} {isNonLethal ? 'NL' : 'PS'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {rv.closeBtn}
          </Button>
          <Button
            type="button"
            disabled={!defender}
            onClick={handleApply}
          >
            {rv.applyDamageBtn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
