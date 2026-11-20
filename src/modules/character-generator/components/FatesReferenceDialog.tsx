import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FAMILY_FATES,
  FAMILY_STANDINGS,
  MENTORS_DATA,
  PARENTAL_FATES,
  REGIONS_DATA,
} from '../data/lifepathData';
import { getCharacterGeneratorCopy } from '../i18n';
import type { ModuleLanguage, RegionId } from '../types';

interface FatesReferenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  initialRegion: RegionId | '';
}

/**
 * Bilingual reference dialog for inspecting
 * Family Fate, Parental Fate, Family Standing, and Mentor tables by region.
 */
export function FatesReferenceDialog({
  open,
  onOpenChange,
  lang,
  initialRegion,
}: FatesReferenceDialogProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [region, setRegion] = useState<RegionId>(
    initialRegion || 'north'
  );

  const selectedRegionDef =
    REGIONS_DATA.find((r) => r.id === region) ?? REGIONS_DATA[0];

  const renderOrderedList = (
    items: readonly { en: string; fr: string }[]
  ) => (
    <ol className="flex flex-col gap-2 pr-2 text-sm">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="rounded-lg border border-border/70 bg-muted/30 p-3 leading-relaxed"
        >
          <span className="mr-2 font-mono text-xs font-semibold text-primary">
            #{idx + 1}
          </span>
          <span>{item[lang]}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{copy.lifepath.fatesDialogTitle}</DialogTitle>
          <DialogDescription>
            {copy.lifepath.fatesDialogSubtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {copy.lifepath.standard.region}
          </span>
          <Select
            value={region}
            onValueChange={(value) => {
              if (value === 'north' || value === 'nilfgaard' || value === 'elderlands') {
                setRegion(value);
              }
            }}
          >
            <SelectTrigger className="w-full sm:w-60">
              <SelectValue>{selectedRegionDef.name[lang]}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              {REGIONS_DATA.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="familyFate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-0">
            <TabsTrigger value="familyFate">
              {copy.lifepath.fatesTabs.familyFate}
            </TabsTrigger>
            <TabsTrigger value="parentalFate">
              {copy.lifepath.fatesTabs.parentalFate}
            </TabsTrigger>
            <TabsTrigger value="familyStanding">
              {copy.lifepath.fatesTabs.familyStanding}
            </TabsTrigger>
            <TabsTrigger value="mentor">
              {copy.lifepath.fatesTabs.mentor}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="mt-3 h-64 rounded-md border border-border/50 p-3 sm:h-72">
            <TabsContent value="familyFate" className="mt-0">
              {renderOrderedList(FAMILY_FATES[region])}
            </TabsContent>
            <TabsContent value="parentalFate" className="mt-0">
              {renderOrderedList(PARENTAL_FATES[region])}
            </TabsContent>
            <TabsContent value="familyStanding" className="mt-0">
              {renderOrderedList(FAMILY_STANDINGS[region])}
            </TabsContent>
            <TabsContent value="mentor" className="mt-0">
              {renderOrderedList(MENTORS_DATA[region])}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
