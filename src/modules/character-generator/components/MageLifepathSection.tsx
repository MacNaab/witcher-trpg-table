import { AlertTriangle, Dices, Plus, Sparkles, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import {
  MAGE_AGES,
  MAGE_CURRENT_STATUS,
  MAGE_IMPORTANT_EVENTS,
} from '../data/lifepathData';
import {
  MAGE_ACADEMIA_EVENTS,
  MAGE_BIRTH_LOCATIONS,
  MAGE_CHAOS_SCHOOLS,
  MAGE_DANGER_TABLES,
  MAGE_DECADE_STYLES,
  MAGE_DISCOVERIES,
  MAGE_ELDERLAND_BIRTH_NOTE,
  MAGE_FAMILY_PERSONALITIES,
  MAGE_FAMILY_REACTIONS,
  MAGE_FAMILY_SIZES,
  MAGE_FAMILY_STATUSES,
  MAGE_MENTOR_CLOTHING,
  MAGE_MENTOR_ENDINGS,
  MAGE_MENTOR_HATREDS,
  MAGE_MENTOR_MOMENTS,
  MAGE_MENTOR_PERSONALITIES,
  MAGE_MENTOR_TEACHING_STYLES,
  MAGE_MENTOR_VALUES,
  getChaosSchoolDefinition,
  resolveChaosSchoolId,
  rollMageGrudgeSummary,
} from '../data/mageLifepathChaosData';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  MageChaosDecadeEntry,
  MageDecadeStyleId,
  ModuleLanguage,
  RegionId,
} from '../types';
import {
  randomizeMageLifepath,
  rollChaosMageDecade,
  rollMageTrainingAndGraduation,
} from '../utils/characterCalculations';

interface MageLifepathSectionProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (updater: (prev: CharacterSheetState) => CharacterSheetState) => void;
}

const REGIONS_LIST: { id: RegionId; label: { en: string; fr: string } }[] = [
  { id: 'north', label: { en: 'Northern Realms / Skellige', fr: 'Royaumes du Nord / Skellige' } },
  { id: 'nilfgaard', label: { en: 'Nilfgaard Empire', fr: 'Empire du Nilfgaard' } },
  { id: 'elderlands', label: { en: 'Elderlands / Conclave', fr: 'Terres Anciennes / Enclave' } },
];

/**
 * Complete bilingual Mage Lifepath editor implementing A Tome of Chaos (pp. 18–31)
 * while maintaining synchronization with legacy summary/PDF fields.
 */
export function MageLifepathSection({
  lang,
  state,
  onUpdateState,
}: MageLifepathSectionProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const m = state.mageLifepath;
  const schoolId = resolveChaosSchoolId(m.academy);
  const schoolDef = getChaosSchoolDefinition(m.academy);

  const birthEntry =
    m.birthLocationIndex !== null && m.birthLocationIndex !== undefined
      ? MAGE_BIRTH_LOCATIONS[m.birthLocationIndex]
      : undefined;

  const reactionRegion: RegionId =
    m.reactionRegion ||
    (m.elderlandConclave ? 'elderlands' : birthEntry?.regionId ?? 'north');

  const discoveryEntry =
    m.discoveryIndex !== null && m.discoveryIndex !== undefined
      ? MAGE_DISCOVERIES[m.discoveryIndex]
      : undefined;

  const academiaList = MAGE_ACADEMIA_EVENTS[schoolId];
  const chaosDecades = m.chaosDecades ?? [];

  const syncLegacyDecades = (decades: MageChaosDecadeEntry[]): [string, string, string] => [
    decades[0]
      ? `${decades[0].eventDetail ?? ''}${
          decades[0].dangerTriggered &&
          decades[0].dangerIndex !== null &&
          decades[0].dangerIndex !== undefined
            ? ` (${MAGE_DANGER_TABLES[decades[0].style][decades[0].dangerIndex]?.[lang] ?? ''})`
            : ''
        }`
      : m.decadeEvents[0] ?? '',
    decades[1]
      ? `${decades[1].eventDetail ?? ''}${
          decades[1].dangerTriggered &&
          decades[1].dangerIndex !== null &&
          decades[1].dangerIndex !== undefined
            ? ` (${MAGE_DANGER_TABLES[decades[1].style][decades[1].dangerIndex]?.[lang] ?? ''})`
            : ''
        }`
      : m.decadeEvents[1] ?? '',
    decades[2]
      ? `${decades[2].eventDetail ?? ''}${
          decades[2].dangerTriggered &&
          decades[2].dangerIndex !== null &&
          decades[2].dangerIndex !== undefined
            ? ` (${MAGE_DANGER_TABLES[decades[2].style][decades[2].dangerIndex]?.[lang] ?? ''})`
            : ''
        }`
      : m.decadeEvents[2] ?? '',
  ];

  const handleRollApprenticeshipAndMentor = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const isApprentice = roll >= schoolDef.apprenticeMinRoll1d6;
    onUpdateState((prev) => ({
      ...prev,
      mageLifepath: {
        ...prev.mageLifepath,
        wasApprentice: isApprentice,
        mentorPersonalityIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_PERSONALITIES.length)
          : null,
        mentorValueIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_VALUES.length)
          : null,
        mentorClothingIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_CLOTHING.length)
          : null,
        mentorHatredIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_HATREDS.length)
          : null,
        mentorTeachingIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_TEACHING_STYLES.length)
          : null,
        mentorMomentIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_MOMENTS.length)
          : null,
        mentorEndingIndex: isApprentice
          ? Math.floor(Math.random() * MAGE_MENTOR_ENDINGS.length)
          : null,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" />
            <span>{copy.lifepath.mage.chaosBannerTitle}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {copy.lifepath.mage.chaosBannerSubtitle}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => onUpdateState((prev) => randomizeMageLifepath(prev, lang))}
        >
          <Dices data-icon="inline-start" />
          <span>{copy.lifepath.mage.rollFullChaosBtn}</span>
        </Button>
      </div>

      {/* 1. Birth Location & Age Entered */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>{copy.lifepath.mage.birthLocationLabel}</Label>
          <Select
            value={
              m.birthLocationIndex !== null && m.birthLocationIndex !== undefined
                ? String(m.birthLocationIndex)
                : ''
            }
            onValueChange={(value) => {
              if (value === null || value === '') return;
              const idx = Number(value);
              const loc = MAGE_BIRTH_LOCATIONS[idx];
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  birthLocationIndex: idx,
                  reactionRegion: prev.mageLifepath.elderlandConclave
                    ? 'elderlands'
                    : loc?.regionId ?? prev.mageLifepath.reactionRegion,
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {birthEntry
                  ? `${birthEntry.roll}. ${birthEntry.label[lang]}`
                  : copy.lifepath.selectPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {MAGE_BIRTH_LOCATIONS.map((loc, idx) => (
                <SelectItem key={loc.roll} value={String(idx)}>
                  {loc.roll}. {loc.label[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-1 flex items-center gap-2">
            <Switch
              id="cg-mage-elder-conclave"
              checked={Boolean(m.elderlandConclave)}
              onCheckedChange={(checked) =>
                onUpdateState((prev) => ({
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    elderlandConclave: checked,
                    reactionRegion: checked
                      ? 'elderlands'
                      : birthEntry?.regionId ?? 'north',
                    reactionIndex: null,
                  },
                }))
              }
            />
            <Label htmlFor="cg-mage-elder-conclave" className="cursor-pointer text-xs">
              {copy.lifepath.mage.elderlandConclaveToggle}
            </Label>
          </div>
          {m.elderlandConclave && (
            <p className="text-[11px] text-primary">
              {MAGE_ELDERLAND_BIRTH_NOTE[lang]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>{copy.lifepath.mage.ageEntered}</Label>
          <Select
            value={m.ageEntered}
            onValueChange={(value) => {
              if (value !== '2-6' && value !== '7-12' && value !== '12+') return;
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  ageEntered: value,
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {MAGE_AGES.find((a) => a.id === m.ageEntered)?.label[lang] ??
                  copy.lifepath.selectPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {MAGE_AGES.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.label[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 2. Family Background */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/15 p-4">
        <h3 className="text-sm font-semibold">
          {copy.lifepath.mage.familySectionTitle}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">{copy.lifepath.mage.familySizeLabel}</Label>
            <Select
              value={
                m.familySizeIndex !== null && m.familySizeIndex !== undefined
                  ? String(m.familySizeIndex)
                  : ''
              }
              onValueChange={(val) => {
                if (val === null || val === '') return;
                onUpdateState((prev) => ({
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    familySizeIndex: Number(val),
                  },
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {m.familySizeIndex !== null && m.familySizeIndex !== undefined
                    ? MAGE_FAMILY_SIZES[m.familySizeIndex]?.[lang] ??
                      copy.lifepath.selectPlaceholder
                    : copy.lifepath.selectPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {MAGE_FAMILY_SIZES.map((item, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {idx + 1}. {item[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">
              {copy.lifepath.mage.familyPersonalityLabel}
            </Label>
            <Select
              value={
                m.familyPersonalityIndex !== null &&
                m.familyPersonalityIndex !== undefined
                  ? String(m.familyPersonalityIndex)
                  : ''
              }
              onValueChange={(val) => {
                if (val === null || val === '') return;
                onUpdateState((prev) => ({
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    familyPersonalityIndex: Number(val),
                  },
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {m.familyPersonalityIndex !== null &&
                  m.familyPersonalityIndex !== undefined
                    ? MAGE_FAMILY_PERSONALITIES[m.familyPersonalityIndex]?.[lang] ??
                      copy.lifepath.selectPlaceholder
                    : copy.lifepath.selectPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {MAGE_FAMILY_PERSONALITIES.map((item, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {idx + 1}. {item[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">{copy.lifepath.mage.familyStatusLabel}</Label>
            <Select
              value={
                m.familyStatusIndex !== null && m.familyStatusIndex !== undefined
                  ? String(m.familyStatusIndex)
                  : ''
              }
              onValueChange={(val) => {
                if (val === null || val === '') return;
                onUpdateState((prev) => ({
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    familyStatusIndex: Number(val),
                  },
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {m.familyStatusIndex !== null &&
                  m.familyStatusIndex !== undefined
                    ? MAGE_FAMILY_STATUSES[m.familyStatusIndex]?.[lang] ??
                      copy.lifepath.selectPlaceholder
                    : copy.lifepath.selectPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {MAGE_FAMILY_STATUSES.map((item, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {idx + 1}. {item[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 3. Magic Discovery & Family Reaction */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <Label>{copy.lifepath.mage.discoveryLabel}</Label>
            {discoveryEntry && discoveryEntry.nextRollMod !== 0 && (
              <Badge variant="outline" className="text-[10px] text-amber-600 dark:text-amber-400">
                {discoveryEntry.nextRollMod} jet réaction
              </Badge>
            )}
          </div>
          <Select
            value={
              m.discoveryIndex !== null && m.discoveryIndex !== undefined
                ? String(m.discoveryIndex)
                : ''
            }
            onValueChange={(val) => {
              if (val === null || val === '') return;
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  discoveryIndex: Number(val),
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {discoveryEntry
                  ? discoveryEntry.title[lang]
                  : copy.lifepath.selectPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {MAGE_DISCOVERIES.map((item, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {idx + 1}. {item.title[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {discoveryEntry && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {discoveryEntry.description[lang]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label className="text-xs">{copy.lifepath.mage.reactionRegionLabel}</Label>
              <Select
                value={reactionRegion}
                onValueChange={(val) => {
                  if (val !== 'north' && val !== 'nilfgaard' && val !== 'elderlands') {
                    return;
                  }
                  onUpdateState((prev) => ({
                    ...prev,
                    mageLifepath: {
                      ...prev.mageLifepath,
                      reactionRegion: val,
                      reactionIndex: null,
                    },
                  }));
                }}
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue>
                    {REGIONS_LIST.find((r) => r.id === reactionRegion)?.label[lang]}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {REGIONS_LIST.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.label[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">{copy.lifepath.mage.reactionLabel}</Label>
              <Select
                value={
                  m.reactionIndex !== null && m.reactionIndex !== undefined
                    ? String(m.reactionIndex)
                    : ''
                }
                onValueChange={(val) => {
                  if (val === null || val === '') return;
                  onUpdateState((prev) => ({
                    ...prev,
                    mageLifepath: {
                      ...prev.mageLifepath,
                      reactionRegion,
                      reactionIndex: Number(val),
                    },
                  }));
                }}
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue>
                    {m.reactionIndex !== null && m.reactionIndex !== undefined
                      ? MAGE_FAMILY_REACTIONS[reactionRegion]?.[m.reactionIndex]?.[
                          lang
                        ] ?? copy.lifepath.selectPlaceholder
                      : copy.lifepath.selectPlaceholder}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {MAGE_FAMILY_REACTIONS[reactionRegion].map((item, idx) => (
                    <SelectItem key={idx} value={String(idx)}>
                      {item[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* 4. School & Life in Academia (20 Years) */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-4">
        <h3 className="text-sm font-semibold">
          {copy.lifepath.mage.schoolSectionTitle}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>{copy.lifepath.mage.academy}</Label>
            <Select
              value={schoolId}
              onValueChange={(value) => {
                if (!value) return;
                onUpdateState((prev) => ({
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    academy: value as CharacterSheetState['mageLifepath']['academy'],
                  },
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{schoolDef.name[lang]}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {MAGE_CHAOS_SCHOOLS.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {schoolDef.summaryDescription[lang]}
            </p>
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs">
            <div className="text-[11px] font-semibold text-primary">
              {copy.lifepath.mage.schoolPerkLabel}
            </div>
            <div className="mt-0.5 font-semibold text-foreground">
              {schoolDef.perkName[lang]}
            </div>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              {schoolDef.perkEffect[lang]}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">
              {copy.lifepath.mage.academiaDecade1Label}
            </Label>
            <Select
              value={
                m.academiaDecade1Index !== null &&
                m.academiaDecade1Index !== undefined
                  ? String(m.academiaDecade1Index)
                  : ''
              }
              onValueChange={(val) => {
                if (val === null || val === '') return;
                const idx = Number(val);
                onUpdateState((prev) => {
                  const second = prev.mageLifepath.academiaDecade2Index;
                  const summary = [
                    academiaList[idx]?.[lang],
                    second !== null && second !== undefined
                      ? academiaList[second]?.[lang]
                      : '',
                  ]
                    .filter(Boolean)
                    .join(' | ');
                  return {
                    ...prev,
                    mageLifepath: {
                      ...prev.mageLifepath,
                      academy: schoolId,
                      academiaDecade1Index: idx,
                      trainingResult: summary || prev.mageLifepath.trainingResult,
                    },
                  };
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {m.academiaDecade1Index !== null &&
                  m.academiaDecade1Index !== undefined
                    ? academiaList[m.academiaDecade1Index]?.[lang] ??
                      copy.lifepath.selectPlaceholder
                    : copy.lifepath.selectPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {academiaList.map((ev, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {ev[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">
              {copy.lifepath.mage.academiaDecade2Label}
            </Label>
            <Select
              value={
                m.academiaDecade2Index !== null &&
                m.academiaDecade2Index !== undefined
                  ? String(m.academiaDecade2Index)
                  : ''
              }
              onValueChange={(val) => {
                if (val === null || val === '') return;
                const idx = Number(val);
                onUpdateState((prev) => {
                  const first = prev.mageLifepath.academiaDecade1Index;
                  const summary = [
                    first !== null && first !== undefined
                      ? academiaList[first]?.[lang]
                      : '',
                    academiaList[idx]?.[lang],
                  ]
                    .filter(Boolean)
                    .join(' | ');
                  return {
                    ...prev,
                    mageLifepath: {
                      ...prev.mageLifepath,
                      academy: schoolId,
                      academiaDecade2Index: idx,
                      trainingResult: summary || prev.mageLifepath.trainingResult,
                    },
                  };
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {m.academiaDecade2Index !== null &&
                  m.academiaDecade2Index !== undefined
                    ? academiaList[m.academiaDecade2Index]?.[lang] ??
                      copy.lifepath.selectPlaceholder
                    : copy.lifepath.selectPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {academiaList.map((ev, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {ev[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 5. Apprenticeship & Leashing */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/15 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">
            {copy.lifepath.mage.apprenticeSectionTitle}
          </h3>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleRollApprenticeshipAndMentor}
          >
            <Dices data-icon="inline-start" />
            <span>{copy.lifepath.mage.apprenticeRollBtn}</span>
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          <Switch
            id="cg-mage-was-apprentice"
            checked={Boolean(m.wasApprentice)}
            onCheckedChange={(checked) =>
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  wasApprentice: checked,
                },
              }))
            }
          />
          <Label htmlFor="cg-mage-was-apprentice" className="cursor-pointer text-xs">
            {copy.lifepath.mage.wasApprenticeLabel} (
            {schoolDef.apprenticeMinRoll1d6}+ sur 1d6)
          </Label>
        </div>

        {m.wasApprentice && (
          <>
            <div className="rounded-md border border-amber-500/35 bg-amber-500/10 p-3 text-xs">
              <div className="font-semibold text-amber-800 dark:text-amber-300">
                {copy.lifepath.mage.leashingRuleTitle}
              </div>
              <p className="mt-0.5 leading-relaxed text-muted-foreground">
                {copy.lifepath.mage.leashingRuleText}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  {
                    key: 'mentorPersonalityIndex',
                    label: copy.lifepath.mage.mentorPersonalityLabel,
                    items: MAGE_MENTOR_PERSONALITIES,
                  },
                  {
                    key: 'mentorValueIndex',
                    label: copy.lifepath.mage.mentorValueLabel,
                    items: MAGE_MENTOR_VALUES,
                  },
                  {
                    key: 'mentorClothingIndex',
                    label: copy.lifepath.mage.mentorClothingLabel,
                    items: MAGE_MENTOR_CLOTHING,
                  },
                  {
                    key: 'mentorHatredIndex',
                    label: copy.lifepath.mage.mentorHatredLabel,
                    items: MAGE_MENTOR_HATREDS,
                  },
                  {
                    key: 'mentorTeachingIndex',
                    label: copy.lifepath.mage.mentorTeachingLabel,
                    items: MAGE_MENTOR_TEACHING_STYLES,
                  },
                  {
                    key: 'mentorMomentIndex',
                    label: copy.lifepath.mage.mentorMomentLabel,
                    items: MAGE_MENTOR_MOMENTS,
                  },
                  {
                    key: 'mentorEndingIndex',
                    label: copy.lifepath.mage.mentorEndingLabel,
                    items: MAGE_MENTOR_ENDINGS,
                  },
                ] as const
              ).map((field) => {
                const curIdx = m[field.key];
                return (
                  <div key={field.key} className="flex flex-col gap-1">
                    <Label className="text-xs">{field.label}</Label>
                    <Select
                      value={
                        curIdx !== null && curIdx !== undefined
                          ? String(curIdx)
                          : ''
                      }
                      onValueChange={(val) => {
                        if (val === null || val === '') return;
                        onUpdateState((prev) => ({
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            [field.key]: Number(val),
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="h-8 w-full text-xs">
                        <SelectValue>
                          {curIdx !== null && curIdx !== undefined
                            ? field.items[curIdx]?.[lang] ??
                              copy.lifepath.selectPlaceholder
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {field.items.map((opt, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {opt[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 6. Life of a Mage Decades (Tome of Chaos) */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/15 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">
            {copy.lifepath.mage.decadesSectionTitle} ({chaosDecades.length})
          </h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              onUpdateState((prev) => {
                const nextDecades = [
                  ...(prev.mageLifepath.chaosDecades ?? []),
                  rollChaosMageDecade('study', lang),
                ];
                return {
                  ...prev,
                  mageLifepath: {
                    ...prev.mageLifepath,
                    chaosDecades: nextDecades,
                    decadeEvents: syncLegacyDecades(nextDecades),
                  },
                };
              })
            }
          >
            <Plus data-icon="inline-start" />
            <span>{copy.lifepath.mage.addDecadeBtn}</span>
          </Button>
        </div>

        {chaosDecades.map((entry, idx) => {
          const styleDef =
            MAGE_DECADE_STYLES.find((s) => s.id === entry.style) ??
            MAGE_DECADE_STYLES[0];
          const dangerText =
            entry.dangerTriggered &&
            entry.dangerIndex !== null &&
            entry.dangerIndex !== undefined
              ? MAGE_DANGER_TABLES[entry.style][entry.dangerIndex]?.[lang] ?? ''
              : '';

          return (
            <div
              key={idx}
              className="flex flex-col gap-2.5 rounded-md border border-border bg-card p-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">
                    {copy.lifepath.standard.decadeLabel} #{idx + 1}
                  </Badge>
                  <Select
                    value={entry.style}
                    onValueChange={(val) => {
                      if (!val) return;
                      onUpdateState((prev) => {
                        const list = [...(prev.mageLifepath.chaosDecades ?? [])];
                        list[idx] = {
                          ...list[idx],
                          style: val as MageDecadeStyleId,
                        };
                        return {
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            chaosDecades: list,
                          },
                        };
                      });
                    }}
                  >
                    <SelectTrigger className="h-8 w-56 text-xs">
                      <SelectValue>{styleDef.label[lang]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                      {MAGE_DECADE_STYLES.map((st) => (
                        <SelectItem key={st.id} value={st.id}>
                          {st.label[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="h-8"
                    onClick={() =>
                      onUpdateState((prev) => {
                        const list = [...(prev.mageLifepath.chaosDecades ?? [])];
                        list[idx] = rollChaosMageDecade(entry.style, lang);
                        return {
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            chaosDecades: list,
                            decadeEvents: syncLegacyDecades(list),
                          },
                        };
                      })
                    }
                  >
                    <Dices data-icon="inline-start" />
                    <span>{copy.lifepath.mage.rollDecadeBtn}</span>
                  </Button>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    onClick={() =>
                      onUpdateState((prev) => {
                        const list = (prev.mageLifepath.chaosDecades ?? []).filter(
                          (_, i) => i !== idx
                        );
                        return {
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            chaosDecades: list,
                            decadeEvents: syncLegacyDecades(list),
                          },
                        };
                      })
                    }
                    aria-label={copy.lifepath.mage.removeDecadeBtn}
                  >
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </div>

              {entry.dangerTriggered && dangerText && (
                <div className="flex items-start gap-2 rounded border border-destructive/40 bg-destructive/10 px-2.5 py-2 text-destructive">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                  <div>
                    <strong>
                      {copy.lifepath.mage.dangerLabel} (
                      {entry.dangerRoll ?? '?'} ≤ {styleDef.dangerPct}%):
                    </strong>{' '}
                    {dangerText}
                  </div>
                </div>
              )}

              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px] text-muted-foreground">
                    {copy.lifepath.mage.eventLabel}
                  </Label>
                  <Input
                    className="h-8 text-xs"
                    value={entry.eventDetail ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateState((prev) => {
                        const list = [...(prev.mageLifepath.chaosDecades ?? [])];
                        list[idx] = { ...list[idx], eventDetail: val };
                        return {
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            chaosDecades: list,
                            decadeEvents: syncLegacyDecades(list),
                          },
                        };
                      });
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] text-muted-foreground">
                      {copy.lifepath.mage.grudgeLabel}
                    </Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-5 px-1.5 text-[11px]"
                      onClick={() => {
                        const grudge = rollMageGrudgeSummary(lang);
                        onUpdateState((prev) => {
                          const list = [...(prev.mageLifepath.chaosDecades ?? [])];
                          list[idx] = { ...list[idx], grudgeText: grudge };
                          return {
                            ...prev,
                            mageLifepath: {
                              ...prev.mageLifepath,
                              chaosDecades: list,
                            },
                          };
                        });
                      }}
                    >
                      <Dices className="mr-1 size-3" />
                      <span>{copy.lifepath.mage.rollGrudgeBtn}</span>
                    </Button>
                  </div>
                  <Input
                    className="h-8 text-xs"
                    value={entry.grudgeText ?? ''}
                    placeholder="—"
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateState((prev) => {
                        const list = [...(prev.mageLifepath.chaosDecades ?? [])];
                        list[idx] = { ...list[idx], grudgeText: val };
                        return {
                          ...prev,
                          mageLifepath: {
                            ...prev.mageLifepath,
                            chaosDecades: list,
                          },
                        };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 7. Core Status & Summary Notes */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>{copy.lifepath.mage.importantEvent}</Label>
          <Select
            value={
              m.importantEventIndex !== null ? String(m.importantEventIndex) : ''
            }
            onValueChange={(value) => {
              if (value === null || value === '') return;
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  importantEventIndex: Number(value),
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {m.importantEventIndex !== null
                  ? MAGE_IMPORTANT_EVENTS[m.importantEventIndex]?.[lang] ??
                    copy.lifepath.selectPlaceholder
                  : copy.lifepath.selectPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {MAGE_IMPORTANT_EVENTS.map((ev, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {ev[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>{copy.lifepath.mage.currentStatus}</Label>
          <Select
            value={
              m.currentStatusIndex !== null ? String(m.currentStatusIndex) : ''
            }
            onValueChange={(value) => {
              if (value === null || value === '') return;
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  currentStatusIndex: Number(value),
                },
              }));
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {m.currentStatusIndex !== null
                  ? MAGE_CURRENT_STATUS[m.currentStatusIndex]?.[lang] ??
                    copy.lifepath.selectPlaceholder
                  : copy.lifepath.selectPlaceholder}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {MAGE_CURRENT_STATUS.map((st, idx) => (
                <SelectItem key={idx} value={String(idx)}>
                  {st[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-border/70 bg-muted/10 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label className="text-xs text-muted-foreground">
            {copy.lifepath.mage.trainingEvent} &{' '}
            {copy.lifepath.mage.graduationOutcome}
          </Label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            disabled={!m.ageEntered}
            onClick={() => {
              if (!m.ageEntered) return;
              const res = rollMageTrainingAndGraduation(m.ageEntered, lang);
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  ...res,
                },
              }));
            }}
          >
            <Dices data-icon="inline-start" />
            <span>{copy.lifepath.mage.rollTrainingBtn}</span>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Textarea
            rows={2}
            value={m.trainingResult}
            placeholder={copy.lifepath.mage.trainingEvent}
            onChange={(e) =>
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  trainingResult: e.target.value,
                },
              }))
            }
          />
          <Textarea
            rows={2}
            value={m.graduationResult}
            placeholder={copy.lifepath.mage.graduationOutcome}
            onChange={(e) =>
              onUpdateState((prev) => ({
                ...prev,
                mageLifepath: {
                  ...prev.mageLifepath,
                  graduationResult: e.target.value,
                },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
