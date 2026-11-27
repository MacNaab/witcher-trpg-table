import { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  BookOpenCheck,
  Coins,
  Globe2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  CORE_DEFINING_SKILLS_REF,
  getTalentsByProfession,
} from '@/src/data/talents';
import {
  PROFESSIONS_DATA,
  RACES_DATA,
  getProfessionDefinition,
  getRaceDefinition,
} from '../data/racesAndProfessions';
import {
  SOCIAL_STATUS_DEFINITIONS,
  SOCIAL_STATUS_MATRIX,
  getRaceReference,
  resolveSocialGroupForCharacter,
} from '../data/racesReferenceData';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterProfessionId,
  CharacterSheetState,
  GenderId,
  ModuleLanguage,
  RaceId,
} from '../types';
import { isProfessionRestrictedForRace } from '../utils/characterCalculations';
import { ProfessionTalentTree } from './ProfessionTalentTree';
import {
  RacesAndStatusDialog,
  getSocialStatusBadgeClass,
} from './RacesAndStatusDialog';

interface StepIdentityCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateFields: (patch: Partial<CharacterSheetState>) => void;
  onSelectRace: (raceId: RaceId) => void;
  onSelectProfession: (profId: CharacterProfessionId) => void;
}

/**
 * Step 1: Player & character identity, Race selection (with perks),
 * Profession selection (with Vigor/Signature info & live Talent Tree modal).
 */
export function StepIdentityCard({
  lang,
  state,
  onUpdateFields,
  onSelectRace,
  onSelectProfession,
}: StepIdentityCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [talentsDialogOpen, setTalentsDialogOpen] = useState(false);
  const [racesDialogOpen, setRacesDialogOpen] = useState(false);
  const [racesDialogTab, setRacesDialogTab] = useState<'races' | 'status'>(
    'races'
  );

  const selectedRace = state.raceId ? getRaceDefinition(state.raceId) : null;
  const selectedRaceRef = selectedRace
    ? getRaceReference(selectedRace.id)
    : undefined;
  const socialGroup = resolveSocialGroupForCharacter(
    state.raceId,
    state.professionId
  );
  const selectedProfession = state.professionId
    ? getProfessionDefinition(state.professionId)
    : null;

  const isSimple = state.mode === 'simple';
  const showHalflingNote = isProfessionRestrictedForRace(
    state.raceId,
    state.professionId
  );
  const showHalflingDruidNote =
    state.raceId === 'halfling' && state.professionId === 'druid';

  const availableProfessions = PROFESSIONS_DATA.filter((prof) => {
    if (selectedRace?.lockedProfessionId) {
      return prof.id === selectedRace.lockedProfessionId;
    }
    if (prof.id === 'witcher' || prof.id === 'vampire') {
      return false;
    }
    if (
      isSimple &&
      selectedRace?.restrictedProfessions?.includes(prof.id)
    ) {
      return false;
    }
    return true;
  });

  const professionTalents = selectedProfession?.talentProfessionId
    ? getTalentsByProfession(selectedProfession.talentProfessionId)
    : [];
  const definingSkillRef = selectedProfession?.talentProfessionId
    ? CORE_DEFINING_SKILLS_REF[selectedProfession.talentProfessionId]
    : undefined;

  const formatMagicPerksSummary = () => {
    if (!selectedProfession?.magicConfig) {
      return lang === 'fr' ? 'Aucun' : 'None';
    }
    const cfg = selectedProfession.magicConfig;
    if (cfg.autoBasicSigns) {
      return lang === 'fr' ? 'Tous les Signes de base' : 'All Basic Signs';
    }
    const parts: string[] = [];
    if (cfg.spells) {
      parts.push(
        lang === 'fr'
          ? `${cfg.spells} sorts de novice`
          : `${cfg.spells} Novice Spells`
      );
    }
    if (cfg.invocations) {
      if (showHalflingDruidNote) {
        parts.push(
          lang === 'fr'
            ? '0 invocation (Halfelin)'
            : '0 Invocations (Halfling)'
        );
      } else {
        parts.push(
          lang === 'fr'
            ? `${cfg.invocations} invocations de novice`
            : `${cfg.invocations} Novice Invocations`
        );
      }
    }
    if (cfg.rituals) {
      parts.push(
        lang === 'fr'
          ? `${cfg.rituals} rituel(s) de novice`
          : `${cfg.rituals} Novice Ritual(s)`
      );
    }
    if (cfg.hexes) {
      parts.push(
        lang === 'fr'
          ? `${cfg.hexes} envoûtement(s) peu dangereux`
          : `${cfg.hexes} Low-Danger Hex(es)`
      );
    }
    if (cfg.vampirePowers) {
      parts.push(
        lang === 'fr'
          ? `${cfg.vampirePowers} sortilèges vampiriques de novice`
          : `${cfg.vampirePowers} Novice Vampiric Spells`
      );
    }
    return parts.join(' · ');
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="size-5 text-primary" />
            <span>{copy.identity.title}</span>
          </CardTitle>
          <CardDescription>{copy.identity.subtitle}</CardDescription>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setRacesDialogTab('races');
            setRacesDialogOpen(true);
          }}
        >
          <Users data-icon="inline-start" />
          <span>{copy.identity.racesGuideBtn}</span>
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Player Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cg-player-name">{copy.identity.playerName}</Label>
            <Input
              id="cg-player-name"
              value={state.playerName}
              onChange={(e) => onUpdateFields({ playerName: e.target.value })}
              placeholder={copy.identity.playerNamePlaceholder}
            />
          </div>

          {/* Character Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cg-character-name">
              {copy.identity.characterName}
            </Label>
            <Input
              id="cg-character-name"
              value={state.characterName}
              onChange={(e) =>
                onUpdateFields({ characterName: e.target.value })
              }
              placeholder={copy.identity.characterNamePlaceholder}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cg-gender-select">{copy.identity.gender}</Label>
            <Select
              value={state.gender}
              onValueChange={(value) => {
                if (value === 'male' || value === 'female') {
                  onUpdateFields({ gender: value as GenderId });
                }
              }}
            >
              <SelectTrigger id="cg-gender-select" className="w-full">
                <SelectValue>
                  {state.gender === 'male'
                    ? copy.identity.male
                    : state.gender === 'female'
                      ? copy.identity.female
                      : copy.identity.genderPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="male">{copy.identity.male}</SelectItem>
                <SelectItem value="female">{copy.identity.female}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Race */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cg-race-select">{copy.identity.race}</Label>
            <Select
              value={state.raceId}
              onValueChange={(value) => {
                if (value) {
                  onSelectRace(value as RaceId);
                }
              }}
            >
              <SelectTrigger id="cg-race-select" className="w-full">
                <SelectValue>
                  {selectedRace
                    ? selectedRace.name[lang]
                    : copy.identity.racePlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {RACES_DATA.map((race) => (
                  <SelectItem key={race.id} value={race.id}>
                    {race.name[lang]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Profession */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cg-profession-select">
              {copy.identity.profession}
            </Label>
            <Select
              value={state.professionId}
              disabled={Boolean(selectedRace?.lockedProfessionId)}
              onValueChange={(value) => {
                if (value) {
                  onSelectProfession(value as CharacterProfessionId);
                }
              }}
            >
              <SelectTrigger id="cg-profession-select" className="w-full">
                <SelectValue>
                  {selectedProfession
                    ? `${selectedProfession.name[lang]}${
                        selectedProfession.isExtended ? ' *' : ''
                      }`
                    : copy.identity.professionPlaceholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {availableProfessions.map((prof) => (
                  <SelectItem key={prof.id} value={prof.id}>
                    {prof.name[lang]}
                    {prof.isExtended ? ' *' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {copy.identity.extendedNote}
        </p>

        {showHalflingNote && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>
              {isSimple
                ? copy.identity.halflingBlocked
                : copy.identity.halflingWarning}
            </span>
          </div>
        )}

        {showHalflingDruidNote && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{copy.professionSkills.halflingDruidNote}</span>
          </div>
        )}

        <Separator />

        {/* Racial Perks & Profession Snapshot */}
        {!selectedRace && !selectedProfession ? (
          <p className="text-sm text-muted-foreground">
            {copy.identity.noRaceOrProfSelected}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {selectedRace && (
              <div className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <ShieldCheck className="size-4 text-primary" />
                      <span>
                        {copy.identity.racialPerksTitle} —{' '}
                        {selectedRace.name[lang]}
                      </span>
                    </div>
                    {selectedRaceRef && (
                      <Badge variant="outline" className="text-[10px]">
                        {selectedRaceRef.sourceNote[lang]}
                      </Badge>
                    )}
                  </div>

                  {selectedRaceRef?.hasEnglishSourceText && (
                    <p className="rounded border border-amber-500/35 bg-amber-500/10 px-2.5 py-1.5 text-[11px] text-amber-800 dark:text-amber-200">
                      {copy.identity.englishSourceNotice}
                    </p>
                  )}

                  {selectedRaceRef ? (
                    <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                      {selectedRaceRef.perks.map((perk) => (
                        <li
                          key={perk.id}
                          className="rounded-md border border-border/70 bg-background/60 p-2"
                        >
                          <div className="font-semibold text-foreground">
                            {perk.name[lang]}
                          </div>
                          <div className="mt-0.5">{perk.effect[lang]}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {selectedRace.perks.map((perk, idx) => (
                        <li key={idx}>{perk[lang]}</li>
                      ))}
                    </ul>
                  )}

                  {selectedRaceRef?.societyNote && (
                    <div className="rounded-md border border-border/80 bg-background/75 p-2.5 text-xs">
                      <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                        <BookOpen
                          className="size-3.5 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          {copy.identity.societyRuleLabel} —{' '}
                          {selectedRaceRef.societyNote.title[lang]}
                        </span>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">
                        {selectedRaceRef.societyNote.text[lang]}
                      </p>
                    </div>
                  )}

                  {socialGroup && (
                    <div className="rounded-md border border-border/70 bg-background/60 p-2.5 text-xs">
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5 font-semibold text-foreground">
                          <Globe2 className="size-3.5 text-primary" />
                          <span>{copy.identity.socialStandingLabel}</span>
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-[11px]"
                          onClick={() => {
                            setRacesDialogTab('status');
                            setRacesDialogOpen(true);
                          }}
                        >
                          {copy.identity.socialStatusTab}
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {SOCIAL_STATUS_MATRIX.map((row) => {
                          const status = row.statuses[socialGroup];
                          const def = SOCIAL_STATUS_DEFINITIONS[status];
                          return (
                            <span
                              key={row.territoryId}
                              className="inline-flex items-center gap-1 rounded border border-border/70 bg-card px-1.5 py-0.5 text-[11px]"
                            >
                              <span className="text-muted-foreground">
                                {row.territory[lang]}:
                              </span>
                              <Badge
                                variant="outline"
                                className={`h-4 px-1.5 text-[10px] ${getSocialStatusBadgeClass(status)}`}
                              >
                                {def.shortLabel[lang]}
                              </Badge>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedProfession && (
              <div className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-muted/20 p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="size-4 text-primary" />
                    <span>{selectedProfession.name[lang]}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-md border border-border/70 bg-background/60 p-2">
                      <div className="text-muted-foreground">
                        {copy.identity.definingSkillLabel}
                      </div>
                      <div className="font-semibold text-foreground">
                        {selectedProfession.definingSkill[lang]}
                        {definingSkillRef?.attribute
                          ? ` (${definingSkillRef.attribute})`
                          : ''}
                      </div>
                    </div>
                    <div className="rounded-md border border-border/70 bg-background/60 p-2">
                      <div className="text-muted-foreground">
                        {copy.identity.vigorLabel}
                      </div>
                      <div className="font-mono font-semibold text-foreground">
                        {selectedProfession.vigorThreshold}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/70 bg-background/60 p-2 text-xs">
                    <div className="text-muted-foreground">
                      {copy.identity.magicAssetsLabel}
                    </div>
                    <div className="font-medium text-foreground">
                      {formatMagicPerksSummary()}
                    </div>
                  </div>
                  {selectedProfession.startingTreasure && (
                    <div className="rounded-md border border-amber-500/35 bg-amber-500/10 p-2 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                        <Coins className="size-3.5 shrink-0" />
                        <span>{copy.identity.startingTreasureLabel}</span>
                      </div>
                      <div className="mt-0.5 font-semibold text-foreground">
                        {selectedProfession.startingTreasure[lang]}
                      </div>
                    </div>
                  )}
                  {definingSkillRef && (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {definingSkillRef.description[lang]}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTalentsDialogOpen(true)}
                  className="self-start"
                >
                  <BookOpenCheck data-icon="inline-start" />
                  <span>{copy.identity.talentTreeBtn}</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {/* Profession Talent Tree Dialog */}
      <Dialog open={talentsDialogOpen} onOpenChange={setTalentsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {copy.identity.talentTreeTitle}
              {selectedProfession
                ? ` — ${selectedProfession.name[lang]}`
                : ''}
            </DialogTitle>
            <DialogDescription>
              {selectedProfession
                ? `${copy.identity.definingSkillLabel}: ${selectedProfession.definingSkill[lang]}`
                : ''}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[65vh] pr-2">
            <ProfessionTalentTree
              talents={professionTalents}
              lang={lang}
              professionId={selectedProfession?.talentProfessionId ?? null}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Races & Social Status Reference Dialog */}
      <RacesAndStatusDialog
        open={racesDialogOpen}
        onOpenChange={setRacesDialogOpen}
        lang={lang}
        initialRaceId={state.raceId}
        initialTab={racesDialogTab}
      />
    </Card>
  );
}
