import { useEffect, useState } from 'react';
import { BookOpen, Globe2, ShieldCheck, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  RACES_REFERENCE_DATA,
  SOCIAL_GROUP_COLUMNS,
  SOCIAL_STATUS_DEFINITIONS,
  SOCIAL_STATUS_EXTRA_RULES,
  SOCIAL_STATUS_MATRIX,
  resolveSocialGroupForCharacter,
  type SocialStatusLevel,
} from '../data/racesReferenceData';
import { getCharacterGeneratorCopy } from '../i18n';
import type { ModuleLanguage, RaceId } from '../types';

interface RacesAndStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  initialRaceId?: RaceId | '';
  initialTab?: 'races' | 'status';
}

export function getSocialStatusBadgeClass(status: SocialStatusLevel): string {
  switch (status) {
    case 'neutral':
      return 'border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300';
    case 'tolerated':
      return 'border-sky-500/35 bg-sky-500/10 text-sky-700 dark:text-sky-300';
    case 'feared':
      return 'border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300';
    case 'tolerated_feared':
      return 'border-amber-500/45 bg-amber-500/15 text-amber-800 dark:text-amber-300';
    case 'hated':
      return 'border-orange-500/40 bg-orange-500/15 text-orange-800 dark:text-orange-300';
    case 'feared_hated':
      return 'border-destructive/45 bg-destructive/15 text-destructive';
  }
}

/**
 * Interactive reference dialog presenting all playable Witcher TRPG races
 * (Core Rulebook + English supplement races from `guide/races.md`)
 * and the official 5 × 9 Continental Social Status matrix.
 */
export function RacesAndStatusDialog({
  open,
  onOpenChange,
  lang,
  initialRaceId,
  initialTab = 'races',
}: RacesAndStatusDialogProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [activeTab, setActiveTab] = useState<'races' | 'status'>(initialTab);
  const [selectedRaceId, setSelectedRaceId] = useState<RaceId>(
    initialRaceId && RACES_REFERENCE_DATA.some((r) => r.raceId === initialRaceId)
      ? initialRaceId
      : 'witcher'
  );

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      if (
        initialRaceId &&
        RACES_REFERENCE_DATA.some((r) => r.raceId === initialRaceId)
      ) {
        setSelectedRaceId(initialRaceId);
      }
    }
  }, [open, initialRaceId, initialTab]);

  const activeRace =
    RACES_REFERENCE_DATA.find((r) => r.raceId === selectedRaceId) ??
    RACES_REFERENCE_DATA[0];
  const socialGroup = resolveSocialGroupForCharacter(activeRace.raceId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <span>{copy.identity.racesGuideTitle}</span>
          </DialogTitle>
          <DialogDescription>{copy.identity.racesGuideSubtitle}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as 'races' | 'status')}
          className="w-full gap-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="races">{copy.identity.racesTab}</TabsTrigger>
            <TabsTrigger value="status">
              {copy.identity.socialStatusTab}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Races, Lore & Perks */}
          <TabsContent value="races" className="mt-0">
            <ScrollArea className="max-h-[65vh] pr-3">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {RACES_REFERENCE_DATA.map((entry) => {
                    const isSelected = entry.raceId === activeRace.raceId;
                    return (
                      <Button
                        key={entry.raceId}
                        type="button"
                        size="sm"
                        variant={isSelected ? 'default' : 'outline'}
                        onClick={() => setSelectedRaceId(entry.raceId)}
                        className="h-8 text-xs"
                      >
                        <span>{entry.title[lang]}</span>
                        {entry.hasEnglishSourceText && (
                          <span className="ml-1 font-mono text-[10px] opacity-75">
                            EN
                          </span>
                        )}
                      </Button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {activeRace.title[lang]}
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-[11px]">
                        {activeRace.sourceNote[lang]}
                      </Badge>
                    </div>
                  </div>

                  {activeRace.hasEnglishSourceText && (
                    <div className="rounded-md border border-amber-500/35 bg-amber-500/10 p-2.5 text-xs text-amber-800 dark:text-amber-200">
                      <div className="font-medium">
                        {copy.identity.englishSourceNotice}
                      </div>
                      {activeRace.englishSourceExcerpt && (
                        <p className="mt-1 italic opacity-90">
                          “{activeRace.englishSourceExcerpt}”
                        </p>
                      )}
                    </div>
                  )}

                  <div className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    <span className="font-semibold text-foreground">
                      {copy.identity.loreLabel} :{' '}
                    </span>
                    {activeRace.lore[lang]}
                  </div>

                  {activeRace.societyNote && (
                    <div className="rounded-md border border-border/80 bg-background/75 p-3 text-xs">
                      <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                        <BookOpen
                          className="size-3.5 text-primary"
                          aria-hidden="true"
                        />
                        <span>
                          {copy.identity.societyRuleLabel} —{' '}
                          {activeRace.societyNote.title[lang]}
                        </span>
                      </div>
                      <p className="leading-relaxed text-muted-foreground">
                        {activeRace.societyNote.text[lang]}
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
                      <ShieldCheck
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{copy.identity.racialPerksTitle}</span>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {activeRace.perks.map((perk) => (
                        <div
                          key={perk.id}
                          className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-3 text-xs"
                        >
                          <div className="font-semibold text-foreground">
                            {perk.name[lang]}
                          </div>
                          <p className="leading-relaxed text-muted-foreground">
                            {perk.effect[lang]}
                          </p>
                          {perk.subRule && (
                            <div className="mt-1 rounded border border-border/70 bg-muted/30 p-2 text-[11px]">
                              <div className="font-semibold text-foreground">
                                {perk.subRule.title[lang]}
                              </div>
                              <p className="mt-0.5 text-muted-foreground">
                                {perk.subRule.text[lang]}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {socialGroup && (
                    <>
                      <Separator />
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                          <Globe2
                            className="size-3.5 text-primary"
                            aria-hidden="true"
                          />
                          <span>{copy.identity.socialStandingLabel}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {SOCIAL_STATUS_MATRIX.map((row) => {
                            const status = row.statuses[socialGroup];
                            const def = SOCIAL_STATUS_DEFINITIONS[status];
                            return (
                              <div
                                key={row.territoryId}
                                className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background/80 px-2.5 py-1 text-xs"
                              >
                                <span className="font-medium text-foreground">
                                  {row.territory[lang]}:
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-[11px] ${getSocialStatusBadgeClass(status)}`}
                                >
                                  {def.label[lang]}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Tab 2: Official 5 x 9 Territorial Social Status Matrix */}
          <TabsContent value="status" className="mt-0">
            <ScrollArea className="max-h-[65vh] pr-3">
              <div className="flex flex-col gap-4">
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">
                          {lang === 'fr' ? 'Territoire' : 'Territory'}
                        </TableHead>
                        {SOCIAL_GROUP_COLUMNS.map((col) => (
                          <TableHead
                            key={col.id}
                            className="text-center text-xs"
                          >
                            {col.label[lang]}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SOCIAL_STATUS_MATRIX.map((row) => (
                        <TableRow key={row.territoryId}>
                          <TableCell className="text-xs font-semibold">
                            {row.territory[lang]}
                          </TableCell>
                          {SOCIAL_GROUP_COLUMNS.map((col) => {
                            const status = row.statuses[col.id];
                            const def = SOCIAL_STATUS_DEFINITIONS[status];
                            return (
                              <TableCell key={col.id} className="text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] ${getSocialStatusBadgeClass(status)}`}
                                >
                                  {def.shortLabel[lang]}
                                </Badge>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {(
                    Object.keys(SOCIAL_STATUS_DEFINITIONS) as SocialStatusLevel[]
                  ).map((level) => {
                    const def = SOCIAL_STATUS_DEFINITIONS[level];
                    return (
                      <div
                        key={level}
                        className="flex flex-col gap-1 rounded-md border border-border bg-muted/20 p-3 text-xs"
                      >
                        <div>
                          <Badge
                            variant="outline"
                            className={`text-[11px] ${getSocialStatusBadgeClass(level)}`}
                          >
                            {def.label[lang]}
                          </Badge>
                        </div>
                        <p className="mt-1 leading-relaxed text-muted-foreground">
                          {def.effect[lang]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {SOCIAL_STATUS_EXTRA_RULES.map((rule) => (
                    <div
                      key={rule.id}
                      className="rounded-md border border-border/80 bg-card p-3 text-xs"
                    >
                      <div className="font-semibold text-foreground">
                        {rule.title[lang]}
                      </div>
                      <p className="mt-1 leading-relaxed text-muted-foreground">
                        {rule.text[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
