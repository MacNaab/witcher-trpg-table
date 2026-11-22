import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  RELATIONSHIP_META,
  VERBAL_CONDITION_META,
  VERBAL_SKILL_LABELS,
} from '../data/verbalRulesData';
import { getVerbalCombatCopy } from '../i18n';
import type {
  ModuleLanguage,
  RelationshipTier,
  VerbalConditionId,
  VerbalParticipant,
  VerbalSkillKey,
} from '../types';
import { getVerbalSkillBase } from '../utils/verbalEngine';

interface VerbalParticipantCardProps {
  participant: VerbalParticipant;
  isActiveTurn: boolean;
  lang: ModuleLanguage;
  onUpdate: (patch: Partial<VerbalParticipant>) => void;
  onRemove: () => void;
}

const RELATIONSHIP_OPTIONS: readonly RelationshipTier[] = [
  'hostile',
  'unfriendly',
  'neutral',
  'friendly',
  'helpful',
];

const CONDITION_OPTIONS: readonly VerbalConditionId[] = [
  'intimidated',
  'ridiculed',
  'charmed',
  'rattled',
  'unmasked',
  'broken',
];

const KEY_SKILLS: readonly VerbalSkillKey[] = [
  'persuasion',
  'charisma',
  'seduction',
  'leadership',
  'intimidation',
  'deceit',
  'education',
  'humanPerception',
  'resistCoercion',
];

/**
 * Detailed participant inspector showing Resolve bar, disposition modifier,
 * social stats, editable skill ranks, conditions, and leverage notes.
 */
export function VerbalParticipantCard({
  participant,
  isActiveTurn,
  lang,
  onUpdate,
  onRemove,
}: VerbalParticipantCardProps) {
  const copy = getVerbalCombatCopy(lang);
  const pCopy = copy.participant;

  const pct =
    participant.maxResolve > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round((participant.resolve / participant.maxResolve) * 100)
          )
        )
      : 0;

  const adjustResolve = (delta: number) => {
    const nextResolve = Math.max(
      0,
      Math.min(participant.maxResolve, participant.resolve + delta)
    );
    const nextConditions =
      nextResolve === 0
        ? Array.from(new Set([...participant.conditions, 'broken']))
        : participant.conditions.filter((c) => c !== 'broken');
    onUpdate({
      resolve: nextResolve,
      conditions: nextConditions as VerbalConditionId[],
    });
  };

  const toggleCondition = (condId: VerbalConditionId) => {
    const has = participant.conditions.includes(condId);
    const next = has
      ? participant.conditions.filter((c) => c !== condId)
      : [...participant.conditions, condId];
    onUpdate({ conditions: next });
  };

  const updateStat = (key: 'emp' | 'int' | 'vol', rawVal: string) => {
    const parsed = Number.parseInt(rawVal, 10);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.max(1, Math.min(15, parsed));
    onUpdate({
      stats: { ...participant.stats, [key]: clamped },
    });
  };

  const updateSkill = (key: VerbalSkillKey, rawVal: string) => {
    const parsed = Number.parseInt(rawVal, 10);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.max(0, Math.min(15, parsed));
    onUpdate({
      skills: { ...participant.skills, [key]: clamped },
    });
  };

  return (
    <Card
      className={
        isActiveTurn
          ? 'border-primary/60 bg-card'
          : 'border-border bg-card'
      }
    >
      <CardHeader className="gap-2 pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {copy.roles[participant.role]}
              </span>
              {participant.titleLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{participant.titleLabel}</span>
                </>
              )}
              {isActiveTurn && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-primary">
                    {pCopy.activeTurnBadge}
                  </span>
                </>
              )}
            </div>
            <CardTitle className="text-lg font-semibold">
              {participant.name}
            </CardTitle>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                onUpdate({
                  resolve: participant.maxResolve,
                  conditions: participant.conditions.filter(
                    (c) => c !== 'broken'
                  ),
                })
              }
              title={pCopy.restoreResolveBtn}
              aria-label={pCopy.restoreResolveBtn}
            >
              <RotateCcw className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onRemove}
              title={pCopy.removeBtn}
              aria-label={pCopy.removeBtn}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Resolve Bar & +/- Adjusters */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {pCopy.resolveLabel}
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => adjustResolve(-5)}
                aria-label="-5"
              >
                <span className="font-mono text-[10px]">-5</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => adjustResolve(-1)}
                aria-label="-1"
              >
                <Minus className="size-3" />
              </Button>
              <span className="min-w-[4.5rem] text-center font-mono text-sm font-bold text-foreground tabular-nums">
                {participant.resolve} / {participant.maxResolve}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => adjustResolve(1)}
                aria-label="+1"
              >
                <Plus className="size-3" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                onClick={() => adjustResolve(5)}
                aria-label="+5"
              >
                <span className="font-mono text-[10px]">+5</span>
              </Button>
            </div>
          </div>

          <Progress value={pct} className="h-2" />
        </div>

        {/* Attitude & Initiative */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">{pCopy.attitudeLabel}</Label>
            <Select
              value={participant.relationship}
              onValueChange={(val) => {
                if (val) onUpdate({ relationship: val as RelationshipTier });
              }}
            >
              <SelectTrigger className="h-9">
                <SelectValue>
                  {RELATIONSHIP_META[participant.relationship].label[lang]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIP_OPTIONS.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {RELATIONSHIP_META[tier].label[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`vb-init-${participant.id}`} className="text-xs">
              {pCopy.initiativeLabel}
            </Label>
            <Input
              id={`vb-init-${participant.id}`}
              type="number"
              value={participant.initiative}
              onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(n)) onUpdate({ initiative: n });
              }}
              className="h-9 font-mono tabular-nums"
            />
          </div>
        </div>

        <Separator />

        {/* Core Social Attributes */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {pCopy.statsTitle}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(['emp', 'int', 'vol'] as const).map((statKey) => (
              <div key={statKey} className="flex flex-col gap-1">
                <Label
                  htmlFor={`vb-stat-${participant.id}-${statKey}`}
                  className="font-mono text-[11px] uppercase text-muted-foreground"
                >
                  {statKey === 'vol' && lang === 'en' ? 'WILL' : statKey.toUpperCase()}
                </Label>
                <Input
                  id={`vb-stat-${participant.id}-${statKey}`}
                  type="number"
                  min={1}
                  max={15}
                  value={participant.stats[statKey]}
                  onChange={(e) => updateStat(statKey, e.target.value)}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social Skills (Rank + Base) */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {pCopy.skillsTitle}
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {KEY_SKILLS.map((skillKey) => {
              const meta = VERBAL_SKILL_LABELS[skillKey];
              const baseTotal = getVerbalSkillBase(participant, skillKey);
              return (
                <div
                  key={skillKey}
                  className="flex items-center justify-between gap-2 rounded-md border border-border/70 px-2.5 py-1.5"
                >
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium text-foreground">
                      {meta.label[lang]}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      Base {baseTotal}
                    </div>
                  </div>
                  <Input
                    type="number"
                    min={0}
                    max={15}
                    value={participant.skills[skillKey]}
                    onChange={(e) => updateSkill(skillKey, e.target.value)}
                    aria-label={meta.label[lang]}
                    className="h-7 w-14 shrink-0 px-1.5 text-center font-mono text-xs tabular-nums"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Social Conditions (Interactive Toggle Buttons) */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {pCopy.conditionsTitle}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CONDITION_OPTIONS.map((condId) => {
              const active = participant.conditions.includes(condId);
              const meta = VERBAL_CONDITION_META[condId];
              return (
                <button
                  key={condId}
                  type="button"
                  onClick={() => toggleCondition(condId)}
                  title={meta.effect[lang]}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? 'border-destructive/60 bg-destructive/15 text-destructive'
                      : 'border-border bg-background text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  {meta.label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes / Leverage */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`vb-notes-${participant.id}`} className="text-xs">
            {pCopy.notesLabel}
          </Label>
          <Textarea
            id={`vb-notes-${participant.id}`}
            rows={2}
            value={participant.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder={pCopy.notesPlaceholder}
            className="resize-y text-xs"
          />
        </div>
      </CardContent>
    </Card>
  );
}
