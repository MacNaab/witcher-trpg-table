import { useState } from 'react';
import {
  ChevronDown,
  ClipboardCopy,
  Coins,
  Download,
  FileDown,
  FileText,
  Globe2,
  Loader2,
  Sparkles,
  Users,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
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
import { FORMULAE_DATA } from '@/src/data/items';
import { ALL_MAGIC_ENTRIES, getMagicEntryById } from '@/src/data/magic';
import { getTalentsByProfession } from '@/src/data/talents';
import {
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
} from '../data/lifepathData';
import {
  PRIMARY_STAT_KEYS,
  getProfessionDefinition,
  getRaceDefinition,
} from '../data/racesAndProfessions';
import {
  SOCIAL_STATUS_DEFINITIONS,
  SOCIAL_STATUS_MATRIX,
  getRaceReference,
  resolveSocialGroupForCharacter,
} from '../data/racesReferenceData';
import { SKILLS_CATALOG } from '../data/skillsCatalog';
import { PROFESSION_STARTER_KITS } from '../data/startingGearData';
import { getCharacterGeneratorCopy } from '../i18n';
import type { CharacterSheetState, ModuleLanguage } from '../types';
import {
  calculateDerivedStats,
  formatCharacterDossierText,
  getEffectiveSkillRank,
  getNativeLanguageSkillId,
  getTotalCarriedWeight,
  resolveLifepathTrack,
} from '../utils/characterCalculations';
import type { DerivedStatKey } from '../data/rulesDescriptions';
import { ItemDescriptionTooltip } from './ItemDescriptionTooltip';
import { ProfessionTalentTree } from './ProfessionTalentTree';
import { getSocialStatusBadgeClass } from './RacesAndStatusDialog';
import { RuleDescriptionTooltip } from './RuleDescriptionTooltip';

interface CharacterSummarySheetProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  isExportingPdf: boolean;
  onExportJson: () => void;
  onExportPdf: () => void;
  onSendToHub: () => void;
}

/**
 * Step 7: Complete playable dossier displaying Identity & Racial Perks, Lifepath narrative,
 * Primary & Derived Stats, Skill Totals, Grimoire/Signs/Powers, Inventory & Formulae,
 * Profession Talent Tree, and Filled PDF / JSON / Clipboard exports.
 */
export function CharacterSummarySheet({
  lang,
  state,
  isExportingPdf,
  onExportJson,
  onExportPdf,
  onSendToHub,
}: CharacterSummarySheetProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [activeSkillsOnly, setActiveSkillsOnly] = useState(true);
  const [talentsOpen, setTalentsOpen] = useState(false);

  const race = state.raceId ? getRaceDefinition(state.raceId) : null;
  const raceRef = race ? getRaceReference(race.id) : undefined;
  const socialGroup = resolveSocialGroupForCharacter(
    state.raceId,
    state.professionId
  );
  const profession = state.professionId
    ? getProfessionDefinition(state.professionId)
    : null;
  const derived = calculateDerivedStats(state);
  const nativeLangId = getNativeLanguageSkillId(state);
  const totalWeight = getTotalCarriedWeight(state);
  const track = resolveLifepathTrack(state);

  const handleCopyText = async () => {
    try {
      const text = formatCharacterDossierText(state, lang);
      await navigator.clipboard.writeText(text);
      toast.success(copy.summary.copiedToast);
    } catch {
      toast.error('Clipboard unavailable');
    }
  };

  // Resolve Magic Entries
  const basicSigns = profession?.magicConfig?.autoBasicSigns
    ? ALL_MAGIC_ENTRIES.filter((e) => e.schoolId === 'sign-basic')
    : [];
  const chosenMagicIds = [
    ...state.selectedSpells,
    ...state.selectedInvocations,
    ...state.selectedRituals,
    ...state.selectedHexes,
    ...state.selectedVampirePowers,
  ];
  const chosenMagicEntries = chosenMagicIds
    .map((id) => getMagicEntryById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const allMagicEntries = [...basicSigns, ...chosenMagicEntries];

  // Resolve Equipment Entries
  const kit = profession ? PROFESSION_STARTER_KITS[profession.id] : null;
  const starterGear = kit
    ? [
        ...kit.freeItems,
        ...kit.selectableItems.filter((item) =>
          state.selectedStarterGearIds.includes(item.id)
        ),
      ]
    : [];

  const formulaIds = [
    state.witcherDecoctionFormulaId,
    ...state.witcherOilFormulaIds,
    ...state.witcherPotionFormulaIds,
  ].filter(Boolean);
  const chosenFormulae = formulaIds
    .map((fid) => FORMULAE_DATA.find((f) => f.id === fid))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const talents = profession?.talentProfessionId
    ? getTalentsByProfession(profession.talentProfessionId)
    : [];

  const visibleSkills = SKILLS_CATALOG.filter((s) => {
    const rank = getEffectiveSkillRank(state, s.id);
    return !activeSkillsOnly || rank > 0;
  });

  // Lifepath summary items
  const renderLifepathSummary = () => {
    if (track === 'custom') {
      return (
        <div className="space-y-2 text-sm">
          <div>
            <strong>{copy.lifepath.custom.originLabel}:</strong>{' '}
            {state.customLifepath.origin || '—'}
          </div>
          <div>
            <strong>{copy.lifepath.custom.ageLabel}:</strong>{' '}
            {state.customLifepath.age || '—'}
          </div>
          {state.customLifepath.backstory && (
            <p className="whitespace-pre-wrap rounded-md border border-border/70 bg-muted/20 p-3 text-xs leading-relaxed">
              {state.customLifepath.backstory}
            </p>
          )}
        </div>
      );
    }

    if (track === 'witcher') {
      const w = state.witcherLifepath;
      const ageLabel =
        WITCHER_AGES.find((a) => a.id === w.ageTaken)?.label[lang] ?? '—';
      const schoolLabel =
        WITCHER_SCHOOLS.find((s) => s.id === w.school)?.label[lang] ?? '—';
      const eventLabel =
        w.importantEventIndex !== null
          ? WITCHER_IMPORTANT_EVENTS[w.importantEventIndex]?.[lang]
          : '—';
      const statusLabel =
        w.currentStatusIndex !== null
          ? WITCHER_CURRENT_STATUS[w.currentStatusIndex]?.[lang]
          : '—';

      return (
        <div className="space-y-2 text-xs leading-relaxed">
          <div>
            <strong>{copy.lifepath.witcher.school}:</strong> {schoolLabel} (
            {ageLabel})
          </div>
          {w.earlyTrainingResult && (
            <div>
              <strong>{copy.lifepath.witcher.earlyTraining}:</strong>{' '}
              {w.earlyTrainingResult}
            </div>
          )}
          {w.trialResult && (
            <div>
              <strong>{copy.lifepath.witcher.trialOutcome}:</strong>{' '}
              {w.trialResult}
            </div>
          )}
          <div>
            <strong>{copy.lifepath.witcher.importantEvent}:</strong>{' '}
            {eventLabel}
          </div>
          <div>
            <strong>{copy.lifepath.witcher.currentStatus}:</strong>{' '}
            {statusLabel}
          </div>
          {w.decadeEvents.some(Boolean) && (
            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              {w.decadeEvents.map((ev, idx) =>
                ev ? (
                  <li key={idx}>
                    {copy.lifepath.standard.decadeLabel} {idx + 1}: {ev}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      );
    }

    if (track === 'mage') {
      const m = state.mageLifepath;
      const ageLabel =
        MAGE_AGES.find((a) => a.id === m.ageEntered)?.label[lang] ?? '—';
      const academyLabel =
        MAGE_ACADEMIES.find((a) => a.id === m.academy)?.label[lang] ?? '—';
      const eventLabel =
        m.importantEventIndex !== null
          ? MAGE_IMPORTANT_EVENTS[m.importantEventIndex]?.[lang]
          : '—';
      const statusLabel =
        m.currentStatusIndex !== null
          ? MAGE_CURRENT_STATUS[m.currentStatusIndex]?.[lang]
          : '—';

      return (
        <div className="space-y-2 text-xs leading-relaxed">
          <div>
            <strong>{copy.lifepath.mage.academy}:</strong> {academyLabel} (
            {ageLabel})
          </div>
          {m.trainingResult && (
            <div>
              <strong>{copy.lifepath.mage.trainingEvent}:</strong>{' '}
              {m.trainingResult}
            </div>
          )}
          {m.graduationResult && (
            <div>
              <strong>{copy.lifepath.mage.graduationOutcome}:</strong>{' '}
              {m.graduationResult}
            </div>
          )}
          <div>
            <strong>{copy.lifepath.mage.importantEvent}:</strong> {eventLabel}
          </div>
          <div>
            <strong>{copy.lifepath.mage.currentStatus}:</strong> {statusLabel}
          </div>
          {m.decadeEvents.some(Boolean) && (
            <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
              {m.decadeEvents.map((ev, idx) =>
                ev ? (
                  <li key={idx}>
                    {copy.lifepath.standard.decadeLabel} {idx + 1}: {ev}
                  </li>
                ) : null
              )}
            </ul>
          )}
        </div>
      );
    }

    const s = state.standardLifepath;
    const regionDef = REGIONS_DATA.find((r) => r.id === s.region);
    const originName =
      regionDef && s.originIndex !== null
        ? regionDef.origins[s.originIndex]?.[lang]
        : '—';

    return (
      <div className="space-y-2 text-xs leading-relaxed">
        <div>
          <strong>{copy.lifepath.standard.origin}:</strong> {originName}{' '}
          {regionDef ? `(${regionDef.name[lang]})` : ''}
          {s.ageDecade
            ? ` · ${s.ageDecade * 10} ${copy.lifepath.standard.yearsSuffix}`
            : ''}
        </div>
        {s.region && s.familyStatus === 'tragedy' && s.familyFateIndex !== null && (
          <div>
            <strong>{copy.lifepath.standard.familyFate}:</strong>{' '}
            {FAMILY_FATES[s.region][s.familyFateIndex]?.[lang]}
          </div>
        )}
        {s.region && s.parentsStatus === 'dead' && s.parentalFateIndex !== null && (
          <div>
            <strong>{copy.lifepath.standard.parentalFate}:</strong>{' '}
            {PARENTAL_FATES[s.region][s.parentalFateIndex]?.[lang]}
          </div>
        )}
        {s.region && s.familyStandingIndex !== null && (
          <div>
            <strong>{copy.lifepath.standard.familyStanding}:</strong>{' '}
            {FAMILY_STANDINGS[s.region][s.familyStandingIndex]?.[lang]}
          </div>
        )}
        {s.region && s.mentorIndex !== null && (
          <div>
            <strong>{copy.lifepath.standard.mentor}:</strong>{' '}
            {MENTORS_DATA[s.region][s.mentorIndex]?.[lang]}
          </div>
        )}
        {s.siblingsDetails.length > 0 && (
          <div>
            <strong>{copy.lifepath.standard.siblingsCount}:</strong>{' '}
            {s.siblingsDetails.join(' · ')}
          </div>
        )}
        {s.decadeEvents.length > 0 && (
          <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
            {s.decadeEvents.map((ev, idx) => (
              <li key={idx}>
                {copy.lifepath.standard.decadeLabel} {idx + 1}: {ev}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <span>{copy.summary.title}</span>
          </CardTitle>
          <CardDescription>{copy.summary.subtitle}</CardDescription>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={isExportingPdf}
            onClick={onExportPdf}
          >
            {isExportingPdf ? (
              <Loader2 className="animate-spin" data-icon="inline-start" />
            ) : (
              <FileDown data-icon="inline-start" />
            )}
            <span>
              {isExportingPdf
                ? copy.summary.exportingPdfBtn
                : copy.summary.exportPdfBtn}
            </span>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onSendToHub}
          >
            <Users data-icon="inline-start" />
            <span>{copy.summary.sendToHubBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyText}
          >
            <ClipboardCopy data-icon="inline-start" />
            <span>{copy.summary.copyTextBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onExportJson}
          >
            <Download data-icon="inline-start" />
            <span>{copy.summary.exportJsonBtn}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Identity & Lifepath Split */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h3 className="mb-3 text-sm font-semibold">
              {copy.summary.identitySection}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">
                  {copy.summary.characterLabel}:
                </span>{' '}
                <strong className="text-sm text-foreground">
                  {state.characterName || '—'}
                </strong>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {copy.summary.playerLabel}:
                </span>{' '}
                <strong>{state.playerName || '—'}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {copy.identity.race}:
                </span>{' '}
                <strong>{race ? race.name[lang] : '—'}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {copy.identity.profession}:
                </span>{' '}
                <strong>{profession ? profession.name[lang] : '—'}</strong>
              </div>
            </div>

            {race && (
              <div className="mt-3 space-y-2.5 border-t border-border/60 pt-2">
                <div>
                  <div className="mb-1 text-[11px] font-semibold text-muted-foreground">
                    {copy.summary.racePerksLabel}
                  </div>
                  {raceRef ? (
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {raceRef.perks.map((p) => (
                        <li key={p.id}>
                          <strong className="text-foreground">
                            {p.name[lang]}:
                          </strong>{' '}
                          {p.effect[lang]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc space-y-0.5 pl-4 text-xs text-muted-foreground">
                      {race.perks.map((p, idx) => (
                        <li key={idx}>{p[lang]}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {socialGroup && (
                  <div className="border-t border-border/50 pt-2">
                    <div className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                      <Globe2 className="size-3 text-primary" />
                      <span>{copy.summary.socialStandingLabel}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SOCIAL_STATUS_MATRIX.map((row) => {
                        const status = row.statuses[socialGroup];
                        const def = SOCIAL_STATUS_DEFINITIONS[status];
                        return (
                          <span
                            key={row.territoryId}
                            className="inline-flex items-center gap-1 rounded border border-border/70 bg-card px-1.5 py-0.5 text-[10px]"
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
            )}
          </div>

          <div className="rounded-lg border border-border bg-muted/20 p-4">
            <h3 className="mb-3 text-sm font-semibold">
              {copy.summary.lifepathSection}
            </h3>
            {renderLifepathSummary()}
            {state.personalDescription.trim() && (
              <p className="mt-3 border-t border-border/60 pt-2 text-xs whitespace-pre-wrap text-muted-foreground">
                {state.personalDescription}
              </p>
            )}
          </div>
        </div>

        {/* Primary & Derived Stats */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">
            {copy.summary.primaryStatsSection} &{' '}
            {copy.summary.derivedStatsSection}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
            {PRIMARY_STAT_KEYS.map((k) => (
              <div
                key={k}
                className="flex flex-col items-center rounded-lg border border-border bg-card p-2 text-center"
              >
                <div className="flex items-center gap-0.5">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {k}
                  </span>
                  <RuleDescriptionTooltip kind="stat" statKey={k} lang={lang} />
                </div>
                <span className="font-mono text-lg font-bold text-primary">
                  {state.stats[k]}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {(
              [
                { key: 'hp', label: 'PS/HP', value: derived.hp },
                { key: 'stamina', label: 'END/STA', value: derived.stamina },
                { key: 'recovery', label: 'RÉC/REC', value: derived.recovery },
                { key: 'stun', label: 'ETOU/STUN', value: derived.stun },
                { key: 'run', label: 'CSE/RUN', value: `${derived.run}m` },
                { key: 'leap', label: 'SAUT/LEAP', value: `${derived.leap}m` },
                {
                  key: 'encumbrance',
                  label: 'ENC',
                  value: `${derived.encumbrance}kg`,
                },
                { key: 'vigor', label: 'VIGOR', value: derived.vigor },
              ] satisfies Array<{
                key: DerivedStatKey;
                label: string;
                value: string | number;
              }>
            ).map((item) => (
              <div
                key={item.key}
                className="flex flex-col items-center rounded-md border border-border/70 bg-muted/20 px-2 py-1.5 text-center"
              >
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <RuleDescriptionTooltip
                    kind="derived"
                    derivedKey={item.key}
                    lang={lang}
                  />
                </div>
                <span className="font-mono text-sm font-semibold">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Skills Table */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">
              {copy.summary.skillsSection}
            </h3>
            <div className="flex items-center gap-2">
              <Switch
                id="cg-summary-active-skills"
                checked={activeSkillsOnly}
                onCheckedChange={setActiveSkillsOnly}
              />
              <Label
                htmlFor="cg-summary-active-skills"
                className="cursor-pointer text-xs"
              >
                {copy.summary.skillsActiveOnlyToggle}
              </Label>
            </div>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {copy.professionSkills.tableHeaders.skill}
                  </TableHead>
                  <TableHead className="w-24">
                    {copy.professionSkills.tableHeaders.attr}
                  </TableHead>
                  <TableHead className="w-20 text-right">
                    {copy.professionSkills.tableHeaders.rank}
                  </TableHead>
                  <TableHead className="w-24 text-right">
                    {copy.professionSkills.tableHeaders.total}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profession && (
                  <TableRow className="bg-primary/5">
                    <TableCell className="font-semibold">
                      {profession.definingSkill[lang]}
                      <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        {copy.summary.signatureBadge}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      —
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs">
                      {state.definingSkillRank}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-primary">
                      {state.definingSkillRank}
                    </TableCell>
                  </TableRow>
                )}

                {visibleSkills.map((skill) => {
                  const rank = getEffectiveSkillRank(state, skill.id);
                  const statVal = state.stats[skill.attribute] ?? 0;
                  const isNative = nativeLangId === skill.id;
                  return (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span>{skill.name[lang]}</span>
                          <RuleDescriptionTooltip
                            kind="skill"
                            skillId={skill.id}
                            lang={lang}
                          />
                          {isNative && (
                            <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                              {copy.summary.nativeBadge}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {skill.attribute} ({statVal})
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs">
                        {rank}
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold text-primary">
                        {statVal + rank}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Magic & Gear Split */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/15 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" />
              <span>{copy.summary.magicSection}</span>
            </h3>
            {allMagicEntries.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                {copy.summary.noMagic}
              </p>
            ) : (
              <ul className="space-y-2 text-xs">
                {allMagicEntries.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded border border-border/70 bg-card p-2.5"
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{entry.name[lang]}</span>
                      <span className="font-mono text-primary">
                        {entry.stamina} END
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {entry.school[lang]} · {entry.range} · {entry.duration}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-lg border border-border bg-muted/15 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                {copy.summary.gearSection}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {copy.summary.totalWeightLabel}: {totalWeight}{' '}
                {copy.gear.weightUnit}
              </span>
            </div>

            {starterGear.length === 0 &&
            state.customInventory.length === 0 &&
            chosenFormulae.length === 0 &&
            !profession?.startingTreasure ? (
              <p className="text-xs text-muted-foreground">
                {copy.summary.noGear}
              </p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {profession?.startingTreasure && (
                  <li className="flex items-center justify-between gap-2 rounded border border-amber-500/35 bg-amber-500/10 px-2.5 py-1.5">
                    <span className="flex items-center gap-1.5 font-semibold text-amber-800 dark:text-amber-300">
                      <Coins className="size-3.5 shrink-0" />
                      <span>{copy.summary.startingTreasureLabel}</span>
                    </span>
                    <span className="font-mono font-semibold text-foreground">
                      {profession.startingTreasure[lang]}
                    </span>
                  </li>
                )}
                {starterGear.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded border border-border/70 bg-card px-2.5 py-1.5"
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate">{item.name[lang]}</span>
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={item.name[lang]}
                        catalogItemId={item.catalogItemId}
                        weight={item.weight}
                        fallbackDescription={item.description?.[lang]}
                      />
                    </div>
                    <span className="shrink-0 font-mono text-muted-foreground">
                      {item.weight} {copy.gear.weightUnit}
                    </span>
                  </li>
                ))}
                {state.customInventory.map((item) => (
                  <li
                    key={item.uid}
                    className="flex items-center justify-between gap-2 rounded border border-border/70 bg-card px-2.5 py-1.5"
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate">
                        {item.name} ×{item.quantity}
                      </span>
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={item.name}
                        catalogItemId={item.catalogId}
                        weight={item.weight}
                        fallbackDescription={item.notes}
                      />
                    </div>
                    <span className="shrink-0 font-mono text-muted-foreground">
                      {(item.weight * item.quantity).toFixed(1)}{' '}
                      {copy.gear.weightUnit}
                    </span>
                  </li>
                ))}
                {chosenFormulae.map((fm, idx) => (
                  <li
                    key={`${fm.id}-${idx}`}
                    className="flex items-center justify-between gap-2 rounded border border-primary/30 bg-primary/5 px-2.5 py-1.5"
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate">
                        {lang === 'fr' ? 'Formule' : 'Formula'}: {fm.name[lang]}
                      </span>
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={fm.name[lang]}
                        catalogItemId={fm.id}
                      />
                    </div>
                    <span className="shrink-0 font-mono text-primary">
                      SD {fm.dc}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Collapsible Profession Talent Tree Reference */}
        {talents.length > 0 && (
          <Collapsible open={talentsOpen} onOpenChange={setTalentsOpen}>
            <CollapsibleTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between"
                />
              }
            >
              <span>
                {copy.summary.talentsSection} ({talents.length})
              </span>
              <ChevronDown
                className={`size-4 transition-transform ${
                  talentsOpen ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <ProfessionTalentTree
                talents={talents}
                lang={lang}
                professionId={profession?.talentProfessionId ?? null}
              />
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
