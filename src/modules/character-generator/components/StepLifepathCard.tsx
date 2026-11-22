import { useState } from 'react';
import { BookOpen, Dices, ScrollText } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  ALL_ORIGINS_SUGGESTIONS,
  FAMILY_FATES,
  FAMILY_STANDINGS,
  MAGE_ACADEMIES,
  MAGE_AGES,
  MAGE_CURRENT_STATUS,
  MAGE_IMPORTANT_EVENTS,
  MENTORS_DATA,
  PARENTAL_FATES,
  REGIONS_DATA,
  WITCHER_AGES,
  WITCHER_CURRENT_STATUS,
  WITCHER_IMPORTANT_EVENTS,
  WITCHER_SCHOOLS,
  rollMageDecadeEvent,
  rollSiblingDescription,
  rollStandardDecadeEvent,
  rollWitcherDecadeEvent,
} from '../data/lifepathData';
import { getRaceDefinition } from '../data/racesAndProfessions';
import { getSkillDefinition } from '../data/skillsCatalog';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  DecadeRiskLevel,
  ModuleLanguage,
  RegionId,
} from '../types';
import {
  getNativeLanguageSkillId,
  randomizeMageLifepath,
  randomizeStandardLifepath,
  randomizeWitcherLifepath,
  resolveLifepathTrack,
  rollMageTrainingAndGraduation,
  rollWitcherTrainingAndTrial,
} from '../utils/characterCalculations';
import { FatesReferenceDialog } from './FatesReferenceDialog';

interface StepLifepathCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (updater: (prev: CharacterSheetState) => CharacterSheetState) => void;
}

/**
 * Step 2: Supports Guided tracks (Standard, Witcher, Mage) with race restrictions,
 * decade randomizers, and Fates dialog — plus Custom Freeform Lifepath mode.
 */
export function StepLifepathCard({
  lang,
  state,
  onUpdateState,
}: StepLifepathCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [fatesOpen, setFatesOpen] = useState(false);

  const track = resolveLifepathTrack(state);
  const race = state.raceId ? getRaceDefinition(state.raceId) : null;
  const nativeLangId = getNativeLanguageSkillId(state);
  const nativeLangDef = nativeLangId ? getSkillDefinition(nativeLangId) : null;

  const handleRandomizeTrack = () => {
    onUpdateState((prev) => {
      const currentTrack = resolveLifepathTrack(prev);
      if (currentTrack === 'witcher') {
        return randomizeWitcherLifepath(prev, lang);
      }
      if (currentTrack === 'mage') {
        return randomizeMageLifepath(prev, lang);
      }
      if (currentTrack === 'standard') {
        return randomizeStandardLifepath(prev, lang);
      }
      return prev;
    });
  };

  const riskOptions: readonly { value: DecadeRiskLevel; label: string }[] = [
    { value: 'safe', label: copy.lifepath.riskLevels.safe },
    { value: 'ordinary', label: copy.lifepath.riskLevels.ordinary },
    { value: 'reckless', label: copy.lifepath.riskLevels.reckless },
    { value: 'risky', label: copy.lifepath.riskLevels.risky },
  ];

  // Standard track helpers
  const std = state.standardLifepath;
  const allowedRegions = race
    ? REGIONS_DATA.filter((r) => race.allowedRegions.includes(r.id))
    : REGIONS_DATA;
  const activeRegionDef = REGIONS_DATA.find((r) => r.id === std.region);
  const maxSiblings = race ? race.maxSiblings : 8;
  const allowedAges: readonly (2 | 3 | 4 | 5)[] = race?.allowElderAges
    ? [2, 3, 4, 5]
    : [2, 3, 4];

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="size-5 text-primary" />
            <span>{copy.lifepath.title}</span>
          </CardTitle>
          <CardDescription>{copy.lifepath.subtitle}</CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {track !== 'custom' && (
            <>
              {track === 'standard' && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFatesOpen(true)}
                >
                  <BookOpen data-icon="inline-start" />
                  <span>{copy.lifepath.fatesDialogBtn}</span>
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleRandomizeTrack}
              >
                <Dices data-icon="inline-start" />
                <span>{copy.lifepath.randomizeBtn}</span>
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Custom Freeform Toggle */}
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
          <Switch
            id="cg-custom-lifepath-switch"
            checked={state.useCustomLifepath}
            onCheckedChange={(checked) =>
              onUpdateState((prev) => ({
                ...prev,
                useCustomLifepath: checked,
              }))
            }
          />
          <div className="flex flex-col gap-0.5">
            <Label
              htmlFor="cg-custom-lifepath-switch"
              className="cursor-pointer text-sm font-medium"
            >
              {copy.lifepath.customToggleLabel}
            </Label>
            <span className="text-xs text-muted-foreground">
              {copy.lifepath.customToggleHint}
            </span>
          </div>
        </div>

        {/* CUSTOM FREEFORM TRACK */}
        {track === 'custom' && (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cg-custom-origin">
                  {copy.lifepath.custom.originLabel}
                </Label>
                <Input
                  id="cg-custom-origin"
                  value={state.customLifepath.origin}
                  onChange={(e) =>
                    onUpdateState((prev) => ({
                      ...prev,
                      customLifepath: {
                        ...prev.customLifepath,
                        origin: e.target.value,
                      },
                    }))
                  }
                  placeholder={copy.lifepath.custom.originPlaceholder}
                />
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-[11px] text-muted-foreground">
                    {copy.lifepath.custom.originSuggestions}
                  </span>
                  {ALL_ORIGINS_SUGGESTIONS.slice(0, 8).map((orig, i) => (
                    <Button
                      key={i}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-[11px]"
                      onClick={() =>
                        onUpdateState((prev) => ({
                          ...prev,
                          customLifepath: {
                            ...prev.customLifepath,
                            origin: orig[lang],
                          },
                        }))
                      }
                    >
                      {orig[lang]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cg-custom-age">
                  {copy.lifepath.custom.ageLabel}
                </Label>
                <Input
                  id="cg-custom-age"
                  value={state.customLifepath.age}
                  onChange={(e) =>
                    onUpdateState((prev) => ({
                      ...prev,
                      customLifepath: {
                        ...prev.customLifepath,
                        age: e.target.value,
                      },
                    }))
                  }
                  placeholder={copy.lifepath.custom.agePlaceholder}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cg-custom-backstory">
                {copy.lifepath.custom.backstoryLabel}
              </Label>
              <Textarea
                id="cg-custom-backstory"
                rows={5}
                value={state.customLifepath.backstory}
                onChange={(e) =>
                  onUpdateState((prev) => ({
                    ...prev,
                    customLifepath: {
                      ...prev.customLifepath,
                      backstory: e.target.value,
                    },
                  }))
                }
                placeholder={copy.lifepath.custom.backstoryPlaceholder}
              />
            </div>
          </div>
        )}

        {/* STANDARD GUIDED LIFEPATH */}
        {track === 'standard' && (
          <div className="flex flex-col gap-5">
            {nativeLangDef && (
              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs">
                <span className="font-medium text-foreground">
                  {copy.lifepath.standard.nativeLanguageBadge}
                </span>
                <span className="font-semibold text-primary">
                  {nativeLangDef.name[lang]} (8)
                </span>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {/* Region */}
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.standard.region}</Label>
                <Select
                  value={std.region}
                  disabled={Boolean(race?.defaultOrigin)}
                  onValueChange={(value) => {
                    if (!value) return;
                    const regionId = value as RegionId;
                    onUpdateState((prev) => ({
                      ...prev,
                      standardLifepath: {
                        ...prev.standardLifepath,
                        region: regionId,
                        originIndex: 0,
                        familyFateIndex: null,
                        parentalFateIndex: null,
                        familyStandingIndex: null,
                        mentorIndex: null,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {activeRegionDef
                        ? activeRegionDef.name[lang]
                        : copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {allowedRegions.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Origin Country */}
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.standard.origin}</Label>
                <Select
                  value={
                    std.originIndex !== null ? String(std.originIndex) : ''
                  }
                  disabled={!activeRegionDef || Boolean(race?.defaultOrigin)}
                  onValueChange={(value) => {
                    if (value === null || value === '') return;
                    const idx = Number(value);
                    onUpdateState((prev) => ({
                      ...prev,
                      standardLifepath: {
                        ...prev.standardLifepath,
                        originIndex: idx,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {activeRegionDef && std.originIndex !== null
                        ? activeRegionDef.origins[std.originIndex]?.[lang] ??
                          copy.lifepath.selectPlaceholder
                        : copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {(activeRegionDef?.origins ?? []).map((orig, idx) => (
                      <SelectItem key={idx} value={String(idx)}>
                        {orig[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {std.region && (
              <>
                {/* Family & Parents Status */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.familyStatus}</Label>
                    <Select
                      value={std.familyStatus}
                      onValueChange={(value) => {
                        if (value !== 'alive' && value !== 'tragedy') return;
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            familyStatus: value,
                            familyFateIndex:
                              value === 'alive'
                                ? null
                                : prev.standardLifepath.familyFateIndex,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.familyStatus === 'alive'
                            ? copy.lifepath.standard.familyAlive
                            : std.familyStatus === 'tragedy'
                              ? copy.lifepath.standard.familyTragedy
                              : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectItem value="alive">
                          {copy.lifepath.standard.familyAlive}
                        </SelectItem>
                        <SelectItem value="tragedy">
                          {copy.lifepath.standard.familyTragedy}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.parentsStatus}</Label>
                    <Select
                      value={std.parentsStatus}
                      onValueChange={(value) => {
                        if (value !== 'alive' && value !== 'dead') return;
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            parentsStatus: value,
                            parentalFateIndex:
                              value === 'alive'
                                ? null
                                : prev.standardLifepath.parentalFateIndex,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.parentsStatus === 'alive'
                            ? copy.lifepath.standard.parentsAlive
                            : std.parentsStatus === 'dead'
                              ? copy.lifepath.standard.parentsDead
                              : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectItem value="alive">
                          {copy.lifepath.standard.parentsAlive}
                        </SelectItem>
                        <SelectItem value="dead">
                          {copy.lifepath.standard.parentsDead}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {std.familyStatus === 'tragedy' && (
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.familyFate}</Label>
                    <Select
                      value={
                        std.familyFateIndex !== null
                          ? String(std.familyFateIndex)
                          : ''
                      }
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const idx = Number(value);
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            familyFateIndex: idx,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.familyFateIndex !== null
                            ? FAMILY_FATES[std.region][std.familyFateIndex]?.[
                                lang
                              ] ?? copy.lifepath.selectPlaceholder
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {FAMILY_FATES[std.region].map((item, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {item[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {std.parentsStatus === 'dead' && (
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.parentalFate}</Label>
                    <Select
                      value={
                        std.parentalFateIndex !== null
                          ? String(std.parentalFateIndex)
                          : ''
                      }
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const idx = Number(value);
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            parentalFateIndex: idx,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.parentalFateIndex !== null
                            ? PARENTAL_FATES[std.region][
                                std.parentalFateIndex
                              ]?.[lang] ?? copy.lifepath.selectPlaceholder
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {PARENTAL_FATES[std.region].map((item, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {item[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Standing & Mentor */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.familyStanding}</Label>
                    <Select
                      value={
                        std.familyStandingIndex !== null
                          ? String(std.familyStandingIndex)
                          : ''
                      }
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const idx = Number(value);
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            familyStandingIndex: idx,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.familyStandingIndex !== null
                            ? FAMILY_STANDINGS[std.region][
                                std.familyStandingIndex
                              ]?.[lang] ?? copy.lifepath.selectPlaceholder
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {FAMILY_STANDINGS[std.region].map((item, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {item[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.mentor}</Label>
                    <Select
                      value={
                        std.mentorIndex !== null ? String(std.mentorIndex) : ''
                      }
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const idx = Number(value);
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            mentorIndex: idx,
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.mentorIndex !== null
                            ? MENTORS_DATA[std.region][std.mentorIndex]?.[
                                lang
                              ] ?? copy.lifepath.selectPlaceholder
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {MENTORS_DATA[std.region].map((item, idx) => (
                          <SelectItem key={idx} value={String(idx)}>
                            {item[lang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Siblings & Age */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label>{copy.lifepath.standard.siblingsCount}</Label>
                      {std.siblingsCount !== null && std.siblingsCount > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() =>
                            onUpdateState((prev) => ({
                              ...prev,
                              standardLifepath: {
                                ...prev.standardLifepath,
                                siblingsDetails: Array.from(
                                  {
                                    length:
                                      prev.standardLifepath.siblingsCount ?? 0,
                                  },
                                  () => rollSiblingDescription(lang)
                                ),
                              },
                            }))
                          }
                        >
                          <Dices data-icon="inline-start" />
                          <span>{copy.lifepath.standard.rerollSiblings}</span>
                        </Button>
                      )}
                    </div>
                    <Select
                      value={
                        std.siblingsCount !== null
                          ? String(std.siblingsCount)
                          : ''
                      }
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const count = Number(value);
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            siblingsCount: count,
                            siblingsDetails: Array.from({ length: count }, () =>
                              rollSiblingDescription(lang)
                            ),
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.siblingsCount !== null
                            ? String(std.siblingsCount)
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {Array.from({ length: maxSiblings + 1 }, (_, i) => (
                          <SelectItem key={i} value={String(i)}>
                            {String(i)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {std.siblingsCount === 0 && (
                      <p className="text-xs text-muted-foreground">
                        {copy.lifepath.standard.noSiblings}
                      </p>
                    )}
                    {std.siblingsDetails.length > 0 && (
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        {std.siblingsDetails.map((sib, idx) => (
                          <li
                            key={idx}
                            className="rounded border border-border/60 bg-muted/20 px-2.5 py-1"
                          >
                            {sib}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Age Decade */}
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.lifepath.standard.ageLabel}</Label>
                    <Select
                      value={std.ageDecade !== null ? String(std.ageDecade) : ''}
                      onValueChange={(value) => {
                        if (value === null || value === '') return;
                        const decades = Number(value) as 2 | 3 | 4 | 5;
                        onUpdateState((prev) => ({
                          ...prev,
                          standardLifepath: {
                            ...prev.standardLifepath,
                            ageDecade: decades,
                            decadeEvents: Array.from({ length: decades }, () =>
                              rollStandardDecadeEvent(lang)
                            ),
                          },
                        }));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {std.ageDecade !== null
                            ? `${std.ageDecade * 10} ${copy.lifepath.standard.yearsSuffix}`
                            : copy.lifepath.selectPlaceholder}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent align="start">
                        {allowedAges.map((dec) => (
                          <SelectItem key={dec} value={String(dec)}>
                            {dec * 10} {copy.lifepath.standard.yearsSuffix}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {std.decadeEvents.length > 0 && (
                      <div className="mt-1 flex flex-col gap-2">
                        {std.decadeEvents.map((ev, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-20 shrink-0 text-xs font-medium text-muted-foreground">
                              {copy.lifepath.standard.decadeLabel} {idx + 1}
                            </span>
                            <Input
                              value={ev}
                              onChange={(e) => {
                                const text = e.target.value;
                                onUpdateState((prev) => {
                                  const next = [
                                    ...prev.standardLifepath.decadeEvents,
                                  ];
                                  next[idx] = text;
                                  return {
                                    ...prev,
                                    standardLifepath: {
                                      ...prev.standardLifepath,
                                      decadeEvents: next,
                                    },
                                  };
                                });
                              }}
                              className="h-8 text-xs"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 shrink-0 px-2"
                              onClick={() => {
                                const rolled = rollStandardDecadeEvent(lang);
                                onUpdateState((prev) => {
                                  const next = [
                                    ...prev.standardLifepath.decadeEvents,
                                  ];
                                  next[idx] = rolled;
                                  return {
                                    ...prev,
                                    standardLifepath: {
                                      ...prev.standardLifepath,
                                      decadeEvents: next,
                                    },
                                  };
                                });
                              }}
                            >
                              <Dices className="size-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* WITCHER GUIDED LIFEPATH */}
        {track === 'witcher' && (
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.witcher.ageTaken}</Label>
                <Select
                  value={state.witcherLifepath.ageTaken}
                  onValueChange={(value) => {
                    if (
                      value !== '1-2' &&
                      value !== '4-6' &&
                      value !== '8-11'
                    ) {
                      return;
                    }
                    onUpdateState((prev) => ({
                      ...prev,
                      witcherLifepath: {
                        ...prev.witcherLifepath,
                        ageTaken: value,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {WITCHER_AGES.find(
                        (a) => a.id === state.witcherLifepath.ageTaken
                      )?.label[lang] ?? copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {WITCHER_AGES.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.witcher.school}</Label>
                <Select
                  value={state.witcherLifepath.school}
                  onValueChange={(value) => {
                    if (!value) return;
                    onUpdateState((prev) => ({
                      ...prev,
                      witcherLifepath: {
                        ...prev.witcherLifepath,
                        school: value as CharacterSheetState['witcherLifepath']['school'],
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {WITCHER_SCHOOLS.find(
                        (s) => s.id === state.witcherLifepath.school
                      )?.label[lang] ?? copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {WITCHER_SCHOOLS.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {copy.lifepath.witcher.earlyTraining} &{' '}
                  {copy.lifepath.witcher.trialOutcome}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={!state.witcherLifepath.ageTaken}
                  onClick={() => {
                    const age = state.witcherLifepath.ageTaken;
                    if (!age) return;
                    const res = rollWitcherTrainingAndTrial(age, lang);
                    onUpdateState((prev) => ({
                      ...prev,
                      witcherLifepath: {
                        ...prev.witcherLifepath,
                        ...res,
                      },
                    }));
                  }}
                >
                  <Dices data-icon="inline-start" />
                  <span>{copy.lifepath.witcher.rollTrainingBtn}</span>
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">
                    {copy.lifepath.witcher.earlyTraining}
                  </Label>
                  <Textarea
                    rows={2}
                    value={state.witcherLifepath.earlyTrainingResult}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        witcherLifepath: {
                          ...prev.witcherLifepath,
                          earlyTrainingResult: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">
                    {copy.lifepath.witcher.trialOutcome}
                  </Label>
                  <Textarea
                    rows={2}
                    value={state.witcherLifepath.trialResult}
                    onChange={(e) =>
                      onUpdateState((prev) => ({
                        ...prev,
                        witcherLifepath: {
                          ...prev.witcherLifepath,
                          trialResult: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.witcher.importantEvent}</Label>
                <Select
                  value={
                    state.witcherLifepath.importantEventIndex !== null
                      ? String(state.witcherLifepath.importantEventIndex)
                      : ''
                  }
                  onValueChange={(value) => {
                    if (value === null || value === '') return;
                    const idx = Number(value);
                    onUpdateState((prev) => ({
                      ...prev,
                      witcherLifepath: {
                        ...prev.witcherLifepath,
                        importantEventIndex: idx,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {state.witcherLifepath.importantEventIndex !== null
                        ? WITCHER_IMPORTANT_EVENTS[
                            state.witcherLifepath.importantEventIndex
                          ]?.[lang] ?? copy.lifepath.selectPlaceholder
                        : copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {WITCHER_IMPORTANT_EVENTS.map((ev, idx) => (
                      <SelectItem key={idx} value={String(idx)}>
                        {ev[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.witcher.currentStatus}</Label>
                <Select
                  value={
                    state.witcherLifepath.currentStatusIndex !== null
                      ? String(state.witcherLifepath.currentStatusIndex)
                      : ''
                  }
                  onValueChange={(value) => {
                    if (value === null || value === '') return;
                    const idx = Number(value);
                    onUpdateState((prev) => ({
                      ...prev,
                      witcherLifepath: {
                        ...prev.witcherLifepath,
                        currentStatusIndex: idx,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {state.witcherLifepath.currentStatusIndex !== null
                        ? WITCHER_CURRENT_STATUS[
                            state.witcherLifepath.currentStatusIndex
                          ]?.[lang] ?? copy.lifepath.selectPlaceholder
                        : copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {WITCHER_CURRENT_STATUS.map((st, idx) => (
                      <SelectItem key={idx} value={String(idx)}>
                        {st[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((idx) => {
                const risk = state.witcherLifepath.decadeSafety[idx] || 'safe';
                return (
                  <div
                    key={idx}
                    className="grid items-center gap-2 sm:grid-cols-12"
                  >
                    <Label className="text-xs sm:col-span-2">
                      {copy.lifepath.standard.decadeLabel} {idx + 1}
                    </Label>
                    <div className="sm:col-span-3">
                      <Select
                        value={risk}
                        onValueChange={(val) => {
                          if (!val) return;
                          onUpdateState((prev) => {
                            const nextSafety = [
                              ...prev.witcherLifepath.decadeSafety,
                            ] as CharacterSheetState['witcherLifepath']['decadeSafety'];
                            nextSafety[idx] = val as DecadeRiskLevel;
                            return {
                              ...prev,
                              witcherLifepath: {
                                ...prev.witcherLifepath,
                                decadeSafety: nextSafety,
                              },
                            };
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue>
                            {riskOptions.find((o) => o.value === risk)?.label}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          {riskOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-7">
                      <Input
                        value={state.witcherLifepath.decadeEvents[idx]}
                        onChange={(e) => {
                          const txt = e.target.value;
                          onUpdateState((prev) => {
                            const nextEv = [
                              ...prev.witcherLifepath.decadeEvents,
                            ] as [string, string, string];
                            nextEv[idx] = txt;
                            return {
                              ...prev,
                              witcherLifepath: {
                                ...prev.witcherLifepath,
                                decadeEvents: nextEv,
                              },
                            };
                          });
                        }}
                        placeholder={copy.lifepath.witcher.decadePlaceholder}
                        className="h-8 text-xs"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 shrink-0 px-2"
                        onClick={() => {
                          const rolled = rollWitcherDecadeEvent(
                            risk as DecadeRiskLevel,
                            lang
                          );
                          onUpdateState((prev) => {
                            const nextEv = [
                              ...prev.witcherLifepath.decadeEvents,
                            ] as [string, string, string];
                            nextEv[idx] = rolled;
                            return {
                              ...prev,
                              witcherLifepath: {
                                ...prev.witcherLifepath,
                                decadeEvents: nextEv,
                              },
                            };
                          });
                        }}
                      >
                        <Dices className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MAGE GUIDED LIFEPATH */}
        {track === 'mage' && (
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.mage.ageEntered}</Label>
                <Select
                  value={state.mageLifepath.ageEntered}
                  onValueChange={(value) => {
                    if (
                      value !== '2-6' &&
                      value !== '7-12' &&
                      value !== '12+'
                    ) {
                      return;
                    }
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
                      {MAGE_AGES.find(
                        (a) => a.id === state.mageLifepath.ageEntered
                      )?.label[lang] ?? copy.lifepath.selectPlaceholder}
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

              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.mage.academy}</Label>
                <Select
                  value={state.mageLifepath.academy}
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
                    <SelectValue>
                      {MAGE_ACADEMIES.find(
                        (a) => a.id === state.mageLifepath.academy
                      )?.label[lang] ?? copy.lifepath.selectPlaceholder}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {MAGE_ACADEMIES.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {copy.lifepath.mage.trainingEvent} &{' '}
                  {copy.lifepath.mage.graduationOutcome}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={!state.mageLifepath.ageEntered}
                  onClick={() => {
                    const age = state.mageLifepath.ageEntered;
                    if (!age) return;
                    const res = rollMageTrainingAndGraduation(age, lang);
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
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">
                    {copy.lifepath.mage.trainingEvent}
                  </Label>
                  <Textarea
                    rows={2}
                    value={state.mageLifepath.trainingResult}
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
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-muted-foreground">
                    {copy.lifepath.mage.graduationOutcome}
                  </Label>
                  <Textarea
                    rows={2}
                    value={state.mageLifepath.graduationResult}
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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.lifepath.mage.importantEvent}</Label>
                <Select
                  value={
                    state.mageLifepath.importantEventIndex !== null
                      ? String(state.mageLifepath.importantEventIndex)
                      : ''
                  }
                  onValueChange={(value) => {
                    if (value === null || value === '') return;
                    const idx = Number(value);
                    onUpdateState((prev) => ({
                      ...prev,
                      mageLifepath: {
                        ...prev.mageLifepath,
                        importantEventIndex: idx,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {state.mageLifepath.importantEventIndex !== null
                        ? MAGE_IMPORTANT_EVENTS[
                            state.mageLifepath.importantEventIndex
                          ]?.[lang] ?? copy.lifepath.selectPlaceholder
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
                    state.mageLifepath.currentStatusIndex !== null
                      ? String(state.mageLifepath.currentStatusIndex)
                      : ''
                  }
                  onValueChange={(value) => {
                    if (value === null || value === '') return;
                    const idx = Number(value);
                    onUpdateState((prev) => ({
                      ...prev,
                      mageLifepath: {
                        ...prev.mageLifepath,
                        currentStatusIndex: idx,
                      },
                    }));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {state.mageLifepath.currentStatusIndex !== null
                        ? MAGE_CURRENT_STATUS[
                            state.mageLifepath.currentStatusIndex
                          ]?.[lang] ?? copy.lifepath.selectPlaceholder
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

            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((idx) => {
                const risk = state.mageLifepath.decadeSafety[idx] || 'safe';
                return (
                  <div
                    key={idx}
                    className="grid items-center gap-2 sm:grid-cols-12"
                  >
                    <Label className="text-xs sm:col-span-2">
                      {copy.lifepath.standard.decadeLabel} {idx + 1}
                    </Label>
                    <div className="sm:col-span-3">
                      <Select
                        value={risk}
                        onValueChange={(val) => {
                          if (!val) return;
                          onUpdateState((prev) => {
                            const nextSafety = [
                              ...prev.mageLifepath.decadeSafety,
                            ] as CharacterSheetState['mageLifepath']['decadeSafety'];
                            nextSafety[idx] = val as DecadeRiskLevel;
                            return {
                              ...prev,
                              mageLifepath: {
                                ...prev.mageLifepath,
                                decadeSafety: nextSafety,
                              },
                            };
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue>
                            {riskOptions.find((o) => o.value === risk)?.label}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          {riskOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-7">
                      <Input
                        value={state.mageLifepath.decadeEvents[idx]}
                        onChange={(e) => {
                          const txt = e.target.value;
                          onUpdateState((prev) => {
                            const nextEv = [
                              ...prev.mageLifepath.decadeEvents,
                            ] as [string, string, string];
                            nextEv[idx] = txt;
                            return {
                              ...prev,
                              mageLifepath: {
                                ...prev.mageLifepath,
                                decadeEvents: nextEv,
                              },
                            };
                          });
                        }}
                        placeholder={copy.lifepath.mage.decadePlaceholder}
                        className="h-8 text-xs"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 shrink-0 px-2"
                        onClick={() => {
                          const rolled = rollMageDecadeEvent(
                            risk as DecadeRiskLevel,
                            lang
                          );
                          onUpdateState((prev) => {
                            const nextEv = [
                              ...prev.mageLifepath.decadeEvents,
                            ] as [string, string, string];
                            nextEv[idx] = rolled;
                            return {
                              ...prev,
                              mageLifepath: {
                                ...prev.mageLifepath,
                                decadeEvents: nextEv,
                              },
                            };
                          });
                        }}
                      >
                        <Dices className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>

      <FatesReferenceDialog
        open={fatesOpen}
        onOpenChange={setFatesOpen}
        lang={lang}
        initialRegion={state.standardLifepath.region}
      />
    </Card>
  );
}
