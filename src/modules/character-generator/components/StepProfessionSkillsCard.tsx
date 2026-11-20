import { useState } from 'react';
import { BookOpenCheck, Minus, Plus, Sparkles, Swords, Trash2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MagicCoreRulesContent } from '@/src/components/MagicCoreRulesContent';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMagicEntryById, type MagicEntry } from '@/src/data/magic';
import { getProfessionDefinition } from '../data/racesAndProfessions';
import { LANGUAGE_SKILLS, getSkillDefinition } from '../data/skillsCatalog';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  ModuleLanguage,
  SkillId,
} from '../types';
import {
  getActiveProfessionSkills,
  getMagicPoolsForState,
  getNativeLanguageSkillId,
  getProfessionSkillPointsSpent,
  getSkillPointCost,
} from '../utils/characterCalculations';
import { RuleDescriptionTooltip } from './RuleDescriptionTooltip';

interface StepProfessionSkillsCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (
    updater: (prev: CharacterSheetState) => CharacterSheetState
  ) => void;
}

/**
 * Step 4: Profession skill points (44 default, x2 difficult skills, Defining Skill),
 * selectable combat/craft/language specialty slots, and Starting Magic powered by `@/src/data/magic`.
 */
export function StepProfessionSkillsCard({
  lang,
  state,
  onUpdateState,
}: StepProfessionSkillsCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [pendingSpellId, setPendingSpellId] = useState('');
  const [pendingInvocationId, setPendingInvocationId] = useState('');
  const [pendingRitualId, setPendingRitualId] = useState('');
  const [pendingHexId, setPendingHexId] = useState('');
  const [pendingVampireId, setPendingVampireId] = useState('');
  const [magicRulesOpen, setMagicRulesOpen] = useState(false);

  if (!state.professionId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{copy.professionSkills.title}</CardTitle>
          <CardDescription>{copy.errors.missingProfession}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const profession = getProfessionDefinition(state.professionId);
  const activeSkills = getActiveProfessionSkills(state, profession);
  const spent = getProfessionSkillPointsSpent(state);
  const remaining = state.professionBudget - spent;
  const maxRank =
    state.mode === 'advanced' && state.allowSkillCap13 ? 13 : 6;
  const minSkillRank = state.ignoreSkillBudgets ? 0 : 1;
  const nativeLangId = getNativeLanguageSkillId(state);
  const nativeLangDef = nativeLangId ? getSkillDefinition(nativeLangId) : null;

  const adjustSkillRank = (skillId: SkillId, delta: number) => {
    onUpdateState((prev) => {
      const cap = prev.mode === 'advanced' && prev.allowSkillCap13 ? 13 : 6;
      const minRank = prev.ignoreSkillBudgets ? 0 : 1;
      const current = prev.professionSkillRanks[skillId] ?? minRank;
      const next = Math.max(minRank, Math.min(cap, current + delta));
      if (next === current) return prev;

      const deltaCost =
        getSkillPointCost(skillId, next) - getSkillPointCost(skillId, current);
      if (
        delta > 0 &&
        !prev.ignoreSkillBudgets &&
        getProfessionSkillPointsSpent(prev) + deltaCost > prev.professionBudget
      ) {
        return prev;
      }

      return {
        ...prev,
        professionSkillRanks: {
          ...prev.professionSkillRanks,
          [skillId]: next,
        },
      };
    });
  };

  const adjustDefiningSkill = (delta: number) => {
    onUpdateState((prev) => {
      const cap = prev.mode === 'advanced' && prev.allowSkillCap13 ? 13 : 6;
      const next = Math.max(1, Math.min(cap, prev.definingSkillRank + delta));
      if (next === prev.definingSkillRank) return prev;
      if (
        delta > 0 &&
        !prev.ignoreSkillBudgets &&
        getProfessionSkillPointsSpent(prev) + delta > prev.professionBudget
      ) {
        return prev;
      }
      return {
        ...prev,
        definingSkillRank: next,
      };
    });
  };

  const magicPools = getMagicPoolsForState(state);

  const renderMagicSelectorBlock = (
    title: string,
    limit: number | undefined,
    pool: MagicEntry[],
    selectedIds: string[],
    fieldKey:
      | 'selectedSpells'
      | 'selectedInvocations'
      | 'selectedRituals'
      | 'selectedHexes'
      | 'selectedVampirePowers',
    pendingValue: string,
    setPendingValue: (val: string) => void
  ) => {
    if (!limit || limit <= 0) return null;
    const isAtLimit =
      state.mode === 'simple' && selectedIds.length >= limit;
    const available = pool.filter((entry) => !selectedIds.includes(entry.id));
    const pendingEntry = available.find((e) => e.id === pendingValue);

    const handleAdd = () => {
      if (!pendingValue || isAtLimit) return;
      onUpdateState((prev) => {
        const cur = prev[fieldKey];
        if (cur.includes(pendingValue)) return prev;
        return {
          ...prev,
          [fieldKey]: [...cur, pendingValue],
        };
      });
      setPendingValue('');
    };

    const handleRemove = (id: string) => {
      onUpdateState((prev) => ({
        ...prev,
        [fieldKey]: prev[fieldKey].filter((item) => item !== id),
      }));
    };

    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/15 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold">
            {title} ({selectedIds.length}
            {state.mode === 'simple' ? ` / ${limit}` : ''})
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            value={pendingValue}
            disabled={isAtLimit || available.length === 0}
            onValueChange={(v) => {
              if (v !== null) setPendingValue(v);
            }}
          >
            <SelectTrigger className="w-full flex-1">
              <SelectValue>
                {pendingEntry
                  ? `${pendingEntry.name[lang]} (${pendingEntry.school[lang]} · ${pendingEntry.stamina} ${copy.professionSkills.staminaLabel})`
                  : copy.professionSkills.selectSpellPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {available.map((entry) => (
                <SelectItem key={entry.id} value={entry.id}>
                  {entry.name[lang]} — {entry.school[lang]} ({entry.stamina}{' '}
                  {copy.professionSkills.staminaLabel})
                  {entry.source === 'fanMade'
                    ? ` [${copy.professionSkills.unofficialTag}]`
                    : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={!pendingValue || isAtLimit}
            onClick={handleAdd}
          >
            <Plus data-icon="inline-start" />
            <span>{copy.professionSkills.addSpellBtn}</span>
          </Button>
        </div>

        {selectedIds.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            {copy.professionSkills.emptyMagicSelection}
          </p>
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {selectedIds.map((id) => {
              const entry = getMagicEntryById(id);
              if (!entry) return null;
              return (
                <div
                  key={id}
                  className="flex flex-col justify-between gap-2 rounded-md border border-border bg-card p-3 text-xs"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-foreground">
                          {entry.name[lang]}
                        </span>
                        <div className="text-[11px] text-primary">
                          {entry.school[lang]}
                          {entry.source === 'fanMade' &&
                            ` · ${copy.professionSkills.unofficialTag}`}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleRemove(id)}
                        aria-label={`Remove ${entry.name[lang]}`}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                      <span>
                        {copy.professionSkills.staminaLabel}:{' '}
                        <strong className="text-foreground">
                          {entry.stamina}
                        </strong>
                      </span>
                      <span>·</span>
                      <span>
                        {copy.professionSkills.rangeLabel}: {entry.range}
                      </span>
                      <span>·</span>
                      <span>
                        {copy.professionSkills.durationLabel}: {entry.duration}
                      </span>
                      {entry.defense && entry.defense !== '-' && (
                        <>
                          <span>·</span>
                          <span>
                            {copy.professionSkills.defenseLabel}:{' '}
                            {entry.defense}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-3 leading-relaxed text-muted-foreground">
                      {entry.effect}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Swords className="size-5 text-primary" />
            <span>{copy.professionSkills.title}</span>
          </CardTitle>
          <CardDescription>{copy.professionSkills.subtitle}</CardDescription>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-right">
          <div className="text-[11px] text-muted-foreground">
            {copy.professionSkills.budgetRemaining}
          </div>
          <div
            className={`font-mono text-lg font-bold tabular-nums ${
              remaining === 0
                ? 'text-emerald-500'
                : remaining < 0
                  ? 'text-destructive'
                  : 'text-amber-500'
            }`}
          >
            {remaining}{' '}
            <span className="text-xs font-normal text-muted-foreground">
              ({spent} {copy.professionSkills.spentOf} {state.professionBudget})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {state.mode === 'advanced' && (
          <div className="flex flex-wrap gap-6 rounded-lg border border-border bg-muted/20 p-3">
            <div className="flex items-center gap-2">
              <Switch
                id="cg-skill-cap13"
                checked={state.allowSkillCap13}
                onCheckedChange={(checked) =>
                  onUpdateState((prev) => ({
                    ...prev,
                    allowSkillCap13: checked,
                  }))
                }
              />
              <Label htmlFor="cg-skill-cap13" className="cursor-pointer text-xs">
                {copy.professionSkills.cap13Label}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="cg-ignore-skill-budget"
                checked={state.ignoreSkillBudgets}
                onCheckedChange={(checked) =>
                  onUpdateState((prev) => ({
                    ...prev,
                    ignoreSkillBudgets: checked,
                  }))
                }
              />
              <Label
                htmlFor="cg-ignore-skill-budget"
                className="cursor-pointer text-xs"
              >
                {copy.professionSkills.ignoreBudgetLabel}
              </Label>
            </div>
          </div>
        )}

        {/* Defining Skill & Native Language */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <div>
              <div className="text-xs font-medium text-primary">
                {copy.professionSkills.definingSkillTitle}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {profession.definingSkill[lang]}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {copy.professionSkills.definingSkillHint}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                disabled={state.definingSkillRank <= 1}
                onClick={() => adjustDefiningSkill(-1)}
              >
                <Minus className="size-3.5" />
              </Button>
              <span className="w-7 text-center font-mono text-base font-bold">
                {state.definingSkillRank}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                disabled={
                  state.definingSkillRank >= maxRank ||
                  (!state.ignoreSkillBudgets && remaining < 1)
                }
                onClick={() => adjustDefiningSkill(1)}
              >
                <Plus className="size-3.5" />
              </Button>
            </div>
          </div>

          {nativeLangDef && (
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  {copy.professionSkills.nativeLangAuto}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <span>{nativeLangDef.name[lang]}</span>
                  <RuleDescriptionTooltip
                    kind="skill"
                    skillId={nativeLangDef.id}
                    lang={lang}
                  />
                </div>
              </div>
              <span className="rounded bg-primary/15 px-2.5 py-1 font-mono text-sm font-bold text-primary">
                8 + {state.stats.INT} = {8 + state.stats.INT}
              </span>
            </div>
          )}
        </div>

        {/* Selectable Specialty Slots (Combat, Craft, Languages) */}
        {(profession.selectableCombatSlots ||
          profession.selectableCraftSlots ||
          profession.selectableLanguageCount) && (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4">
            <h3 className="text-sm font-semibold">
              {copy.professionSkills.slotsSectionTitle}
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profession.selectableCombatSlots &&
                Array.from(
                  { length: profession.selectableCombatSlots.count },
                  (_, slotIdx) => {
                    const currentVal =
                      state.selectedCombatSkills[slotIdx] ?? '';
                    const usedElsewhere = new Set(
                      state.selectedCombatSkills.filter(
                        (s, idx) => Boolean(s) && idx !== slotIdx
                      )
                    );
                    const options =
                      profession.selectableCombatSlots!.options.filter(
                        (opt) => !usedElsewhere.has(opt)
                      );
                    return (
                      <div
                        key={`combat-${slotIdx}`}
                        className="flex flex-col gap-1"
                      >
                        <Label className="text-xs">
                          {copy.professionSkills.combatSlotLabel} #{slotIdx + 1}
                        </Label>
                        <Select
                          value={currentVal}
                          onValueChange={(val) => {
                            if (!val) return;
                            onUpdateState((prev) => {
                              const nextSlots = [...prev.selectedCombatSkills];
                              const prevId = nextSlots[slotIdx];
                              const nextRanks = { ...prev.professionSkillRanks };
                              if (prevId && !profession.fixedSkills.includes(prevId)) {
                                delete nextRanks[prevId];
                              }
                              nextSlots[slotIdx] = val as SkillId;
                              nextRanks[val as SkillId] =
                                prev.ignoreSkillBudgets ? 0 : 1;
                              return {
                                ...prev,
                                selectedCombatSkills: nextSlots,
                                professionSkillRanks: nextRanks,
                              };
                            });
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue>
                              {currentVal
                                ? getSkillDefinition(currentVal).name[lang]
                                : copy.professionSkills.slotPlaceholder}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent align="start">
                            {options.map((opt) => {
                              const def = getSkillDefinition(opt);
                              return (
                                <SelectItem key={opt} value={opt}>
                                  {def.name[lang]}
                                  {def.doubleCost ? ' (×2)' : ''}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                )}

              {profession.selectableCraftSlots && (
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">
                    {copy.professionSkills.craftSlotLabel}
                  </Label>
                  <Select
                    value={state.selectedCraftSkill}
                    onValueChange={(val) => {
                      if (!val) return;
                      onUpdateState((prev) => {
                        const nextRanks = { ...prev.professionSkillRanks };
                        if (
                          prev.selectedCraftSkill &&
                          !profession.fixedSkills.includes(
                            prev.selectedCraftSkill
                          )
                        ) {
                          delete nextRanks[prev.selectedCraftSkill];
                        }
                        nextRanks[val as SkillId] =
                          prev.ignoreSkillBudgets ? 0 : 1;
                        return {
                          ...prev,
                          selectedCraftSkill: val as SkillId,
                          professionSkillRanks: nextRanks,
                        };
                      });
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue>
                        {state.selectedCraftSkill
                          ? getSkillDefinition(state.selectedCraftSkill).name[
                              lang
                            ]
                          : copy.professionSkills.slotPlaceholder}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                      {profession.selectableCraftSlots.options.map((opt) => {
                        const def = getSkillDefinition(opt);
                        return (
                          <SelectItem key={opt} value={opt}>
                            {def.name[lang]}
                            {def.doubleCost ? ' (×2)' : ''}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {profession.selectableLanguageCount &&
                Array.from(
                  { length: profession.selectableLanguageCount },
                  (_, slotIdx) => {
                    const currentVal = state.selectedLanguages[slotIdx] ?? '';
                    const usedElsewhere = new Set(
                      state.selectedLanguages.filter(
                        (s, idx) => Boolean(s) && idx !== slotIdx
                      )
                    );
                    const options = LANGUAGE_SKILLS.filter(
                      (opt) => opt !== nativeLangId && !usedElsewhere.has(opt)
                    );
                    return (
                      <div
                        key={`lang-${slotIdx}`}
                        className="flex flex-col gap-1"
                      >
                        <Label className="text-xs">
                          {copy.professionSkills.languageSlotLabel} #
                          {slotIdx + 1}
                        </Label>
                        <Select
                          value={currentVal}
                          onValueChange={(val) => {
                            if (!val) return;
                            onUpdateState((prev) => {
                              const nextLangs = [...prev.selectedLanguages];
                              const prevId = nextLangs[slotIdx];
                              const nextRanks = { ...prev.professionSkillRanks };
                              if (
                                prevId &&
                                !profession.fixedSkills.includes(prevId)
                              ) {
                                delete nextRanks[prevId];
                              }
                              nextLangs[slotIdx] = val as SkillId;
                              nextRanks[val as SkillId] =
                                prev.ignoreSkillBudgets ? 0 : 1;
                              return {
                                ...prev,
                                selectedLanguages: nextLangs,
                                professionSkillRanks: nextRanks,
                              };
                            });
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue>
                              {currentVal
                                ? getSkillDefinition(currentVal).name[lang]
                                : copy.professionSkills.slotPlaceholder}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent align="start">
                            {options.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {getSkillDefinition(opt).name[lang]} (×2)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        )}

        {/* Profession Skills Allocation Table */}
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.professionSkills.tableHeaders.skill}</TableHead>
                <TableHead className="w-20">
                  {copy.professionSkills.tableHeaders.attr}
                </TableHead>
                <TableHead className="w-36 text-center">
                  {copy.professionSkills.tableHeaders.rank}
                </TableHead>
                <TableHead className="w-20 text-right">
                  {copy.professionSkills.tableHeaders.cost}
                </TableHead>
                <TableHead className="w-24 text-right">
                  {copy.professionSkills.tableHeaders.total}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeSkills.map((skillId) => {
                const def = getSkillDefinition(skillId);
                const rank = state.professionSkillRanks[skillId] ?? minSkillRank;
                const stepCost = def.doubleCost ? 2 : 1;
                const totalCost = getSkillPointCost(skillId, rank);
                const statVal = state.stats[def.attribute] ?? 0;
                const canInc =
                  rank < maxRank &&
                  (state.ignoreSkillBudgets || remaining >= stepCost);
                const canDec = rank > minSkillRank;

                return (
                  <TableRow key={skillId}>
                    <TableCell className="font-medium">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span>{def.name[lang]}</span>
                        <RuleDescriptionTooltip
                          kind="skill"
                          skillId={skillId}
                          lang={lang}
                        />
                        {def.doubleCost && (
                          <span className="rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            {copy.professionSkills.doubleCostTag}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {def.attribute} ({statVal})
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          disabled={!canDec}
                          onClick={() => adjustSkillRank(skillId, -1)}
                        >
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-6 text-center font-mono text-sm font-bold tabular-nums">
                          {rank}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-sm"
                          disabled={!canInc}
                          onClick={() => adjustSkillRank(skillId, 1)}
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs tabular-nums">
                      {totalCost}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-bold text-primary tabular-nums">
                      {statVal + rank}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Starting Magic Section */}
        {profession.magicConfig && (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Wand2 className="size-5 text-primary" />
                  <h3 className="text-base font-semibold">
                    {copy.professionSkills.magicSectionTitle}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMagicRulesOpen(true)}
                    className="h-7 gap-1.5 text-xs"
                  >
                    <BookOpenCheck className="size-3.5" aria-hidden="true" />
                    <span>{copy.professionSkills.magicRulesBtn}</span>
                  </Button>
                </div>

                {!profession.magicConfig.autoBasicSigns &&
                  !profession.magicConfig.vampirePowers && (
                    <div className="flex items-center gap-2.5">
                      <Switch
                        id="cg-unofficial-magic"
                        checked={state.includeUnofficialMagic}
                        onCheckedChange={(checked) =>
                          onUpdateState((prev) => ({
                            ...prev,
                            includeUnofficialMagic: checked,
                          }))
                        }
                      />
                      <Label
                        htmlFor="cg-unofficial-magic"
                        className="cursor-pointer text-xs"
                      >
                        {copy.professionSkills.magicUnofficialToggle}
                      </Label>
                    </div>
                  )}
              </div>

              {profession.magicConfig.autoBasicSigns && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-foreground">
                    <Sparkles className="size-4 shrink-0 text-primary" />
                    <span>{copy.professionSkills.witcherSignsNote}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {magicPools.basicSigns.map((sign) => (
                      <div
                        key={sign.id}
                        className="rounded-lg border border-border bg-muted/20 p-3 text-xs"
                      >
                        <div className="font-semibold text-foreground">
                          {sign.name[lang]}
                        </div>
                        <div className="mt-1 text-[11px] text-primary">
                          {sign.stamina} {copy.professionSkills.staminaLabel} ·{' '}
                          {sign.range}
                        </div>
                        <p className="mt-1.5 line-clamp-3 text-muted-foreground">
                          {sign.effect}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renderMagicSelectorBlock(
                copy.professionSkills.slotsSpell,
                profession.magicConfig.spells,
                magicPools.spells,
                state.selectedSpells,
                'selectedSpells',
                pendingSpellId,
                setPendingSpellId
              )}

              {renderMagicSelectorBlock(
                copy.professionSkills.slotsInvocation,
                profession.magicConfig.invocations,
                magicPools.invocations,
                state.selectedInvocations,
                'selectedInvocations',
                pendingInvocationId,
                setPendingInvocationId
              )}

              {renderMagicSelectorBlock(
                copy.professionSkills.slotsRitual,
                profession.magicConfig.rituals,
                magicPools.rituals,
                state.selectedRituals,
                'selectedRituals',
                pendingRitualId,
                setPendingRitualId
              )}

              {renderMagicSelectorBlock(
                copy.professionSkills.slotsHex,
                profession.magicConfig.hexes,
                magicPools.hexes,
                state.selectedHexes,
                'selectedHexes',
                pendingHexId,
                setPendingHexId
              )}

              {renderMagicSelectorBlock(
                copy.professionSkills.slotsVampire,
                profession.magicConfig.vampirePowers,
                magicPools.vampirePowers,
                state.selectedVampirePowers,
                'selectedVampirePowers',
                pendingVampireId,
                setPendingVampireId
              )}
            </div>
          </>
        )}
      </CardContent>

      <Dialog open={magicRulesOpen} onOpenChange={setMagicRulesOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{copy.professionSkills.magicRulesTitle}</DialogTitle>
            <DialogDescription>
              {copy.professionSkills.magicRulesSubtitle}
            </DialogDescription>
          </DialogHeader>
          <div className="sm:max-h-[68dvh] sm:overflow-y-auto sm:pr-2">
            <MagicCoreRulesContent lang={lang} />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
