import { useEffect, useState } from 'react';
import { Dices, Scale, ShieldCheck, Swords } from 'lucide-react';
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
import {
  RELATIONSHIP_META,
  VERBAL_ATTACK_TOOLS,
  VERBAL_DEFENSE_TOOLS,
} from '../data/verbalRulesData';
import { getVerbalCombatCopy } from '../i18n';
import type {
  ModuleLanguage,
  VerbalAttackId,
  VerbalDefenseId,
  VerbalParticipant,
} from '../types';
import {
  getVerbalSkillBase,
  resolveVerbalExchange,
  type VerbalExchangeResolution,
} from '../utils/verbalEngine';

interface VerbalExchangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: readonly VerbalParticipant[];
  defaultAttackerId: string | null;
  lang: ModuleLanguage;
  onApplyResolution: (params: {
    attackerId: string;
    defenderId: string;
    resolution: VerbalExchangeResolution;
  }) => void;
}

/**
 * Interactive opposed 1d10! Verbal Exchange resolver modal.
 * Supports automatic exploding Witcher 1d10! rolls or manual physical dice entry.
 */
export function VerbalExchangeDialog({
  open,
  onOpenChange,
  participants,
  defaultAttackerId,
  lang,
  onApplyResolution,
}: VerbalExchangeDialogProps) {
  const copy = getVerbalCombatCopy(lang);
  const rCopy = copy.resolver;

  const [attackerId, setAttackerId] = useState<string>('');
  const [defenderId, setDefenderId] = useState<string>('');
  const [attackToolId, setAttackToolId] =
    useState<VerbalAttackId>('persuasion');
  const [defenseToolId, setDefenseToolId] =
    useState<VerbalDefenseId>('ignore');
  const [atkMiscMod, setAtkMiscMod] = useState('0');
  const [defMiscMod, setDefMiscMod] = useState('0');
  const [manualAtkDie, setManualAtkDie] = useState('');
  const [manualDefDie, setManualDefDie] = useState('');
  const [preview, setPreview] = useState<VerbalExchangeResolution | null>(null);

  useEffect(() => {
    if (!open || participants.length < 2) return;
    const initialAtk =
      (defaultAttackerId &&
        participants.find((p) => p.id === defaultAttackerId)?.id) ||
      participants[0].id;
    const initialDef =
      participants.find((p) => p.id !== initialAtk)?.id || participants[1].id;
    setAttackerId(initialAtk);
    setDefenderId(initialDef);
    setPreview(null);
    setManualAtkDie('');
    setManualDefDie('');
  }, [defaultAttackerId, open, participants]);

  const attacker = participants.find((p) => p.id === attackerId) ?? null;
  const defender = participants.find((p) => p.id === defenderId) ?? null;
  const attackTool =
    VERBAL_ATTACK_TOOLS.find((t) => t.id === attackToolId) ??
    VERBAL_ATTACK_TOOLS[0];
  const defenseTool =
    VERBAL_DEFENSE_TOOLS.find((t) => t.id === defenseToolId) ??
    VERBAL_DEFENSE_TOOLS[0];

  const handleRollPreview = () => {
    if (!attacker || !defender) return;
    const parsedManualAtk =
      manualAtkDie.trim() === '' ? null : Number.parseInt(manualAtkDie, 10);
    const parsedManualDef =
      manualDefDie.trim() === '' ? null : Number.parseInt(manualDefDie, 10);

    const res = resolveVerbalExchange({
      attacker,
      defender,
      attackToolId,
      defenseToolId,
      attackerMiscMod: Number.parseInt(atkMiscMod, 10) || 0,
      defenderMiscMod: Number.parseInt(defMiscMod, 10) || 0,
      manualAttackDie: parsedManualAtk,
      manualDefenseDie: parsedManualDef,
      lang,
    });
    setPreview(res);
  };

  const handleApply = () => {
    if (!attacker || !defender || !preview) return;
    onApplyResolution({
      attackerId: attacker.id,
      defenderId: defender.id,
      resolution: preview,
    });
    onOpenChange(false);
  };

  const relMod = defender
    ? RELATIONSHIP_META[defender.relationship].modifier
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="size-4 text-primary" aria-hidden="true" />
            <span>{rCopy.title}</span>
          </DialogTitle>
          <DialogDescription>{rCopy.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:max-h-[68dvh] sm:overflow-y-auto sm:pr-1">
          {/* Attacker & Defender Pickers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-lg border border-border p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <Swords className="size-3.5 text-primary" aria-hidden="true" />
                <span>{rCopy.attackerLabel}</span>
              </div>

              <Select
                value={attackerId}
                onValueChange={(val) => {
                  if (val) {
                    setAttackerId(val);
                    if (val === defenderId) {
                      const other = participants.find((p) => p.id !== val);
                      if (other) setDefenderId(other.id);
                    }
                    setPreview(null);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{attacker?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {participants.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({copy.roles[p.role]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">{rCopy.attackToolLabel}</Label>
                <Select
                  value={attackToolId}
                  onValueChange={(val) => {
                    if (val) {
                      setAttackToolId(val as VerbalAttackId);
                      setPreview(null);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{attackTool.label[lang]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {VERBAL_ATTACK_TOOLS.map((tool) => (
                      <SelectItem key={tool.id} value={tool.id}>
                        {tool.label[lang]} ({tool.damageDice})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {attackTool.summary[lang]}
                </p>
                {attacker && (
                  <span className="font-mono text-xs font-medium text-foreground tabular-nums">
                    Base : {getVerbalSkillBase(attacker, attackTool.skillKey)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px]">{rCopy.attackerModLabel}</Label>
                  <Input
                    type="number"
                    value={atkMiscMod}
                    onChange={(e) => {
                      setAtkMiscMod(e.target.value);
                      setPreview(null);
                    }}
                    className="h-8 font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px]">
                    {rCopy.manualAtkDieLabel}
                  </Label>
                  <Input
                    type="number"
                    value={manualAtkDie}
                    onChange={(e) => {
                      setManualAtkDie(e.target.value);
                      setPreview(null);
                    }}
                    placeholder={rCopy.autoDiePlaceholder}
                    className="h-8 font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Defender Side */}
            <div className="flex flex-col gap-3 rounded-lg border border-border p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <ShieldCheck
                  className="size-3.5 text-primary"
                  aria-hidden="true"
                />
                <span>{rCopy.defenderLabel}</span>
              </div>

              <Select
                value={defenderId}
                onValueChange={(val) => {
                  if (val) {
                    setDefenderId(val);
                    if (val === attackerId) {
                      const other = participants.find((p) => p.id !== val);
                      if (other) setAttackerId(other.id);
                    }
                    setPreview(null);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue>{defender?.name}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {participants
                    .filter((p) => p.id !== attackerId)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name} ({p.resolve}/{p.maxResolve})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">{rCopy.defenseToolLabel}</Label>
                <Select
                  value={defenseToolId}
                  onValueChange={(val) => {
                    if (val) {
                      setDefenseToolId(val as VerbalDefenseId);
                      setPreview(null);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{defenseTool.label[lang]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {VERBAL_DEFENSE_TOOLS.map((tool) => (
                      <SelectItem key={tool.id} value={tool.id}>
                        {tool.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {defenseTool.summary[lang]}
                </p>
                {defender && (
                  <div className="flex flex-col gap-0.5 font-mono text-xs tabular-nums">
                    <span className="font-medium text-foreground">
                      Base : {getVerbalSkillBase(defender, defenseTool.skillKey)}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {rCopy.attitudeImpactLabel(relMod)}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px]">{rCopy.defenderModLabel}</Label>
                  <Input
                    type="number"
                    value={defMiscMod}
                    onChange={(e) => {
                      setDefMiscMod(e.target.value);
                      setPreview(null);
                    }}
                    className="h-8 font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px]">
                    {rCopy.manualDefDieLabel}
                  </Label>
                  <Input
                    type="number"
                    value={manualDefDie}
                    onChange={(e) => {
                      setManualDefDie(e.target.value);
                      setPreview(null);
                    }}
                    placeholder={rCopy.autoDiePlaceholder}
                    className="h-8 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="button" variant="secondary" onClick={handleRollPreview}>
              <Dices data-icon="inline-start" />
              <span>{rCopy.rollAndPreviewBtn}</span>
            </Button>
          </div>

          {preview && (
            <>
              <Separator />
              <div className="flex flex-col gap-2 rounded-lg border border-primary/40 bg-primary/5 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-sm font-bold ${
                      preview.hit ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {preview.hit
                      ? rCopy.hitLabel
                      : preview.counterDamage > 0
                        ? rCopy.counterLabel(preview.counterDamage)
                        : preview.appliedCondition === 'unmasked'
                          ? rCopy.unmaskedLabel
                          : rCopy.defendedLabel}
                  </span>
                  {preview.hit && (
                    <span className="font-mono text-sm font-bold text-destructive tabular-nums">
                      {rCopy.damageLabel(preview.resolveDamage)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2 font-mono text-xs text-muted-foreground tabular-nums sm:grid-cols-2">
                  <div>
                    {attacker?.name} : {preview.attackBase} + [
                    {preview.attackDieLabel}] ={' '}
                    <strong className="text-foreground">
                      {preview.attackTotal}
                    </strong>
                  </div>
                  <div>
                    {defender?.name} : {preview.defenseBase} + [
                    {preview.defenseDieLabel}] ={' '}
                    <strong className="text-foreground">
                      {preview.defenseTotal}
                    </strong>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-foreground">
                  {preview.summaryText}
                </p>
                {preview.damageDetail && (
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {preview.damageDetail}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {rCopy.closeBtn}
          </Button>
          <Button type="button" disabled={!preview} onClick={handleApply}>
            {rCopy.applyBtn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
