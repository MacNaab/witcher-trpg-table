import { useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Eye,
  RotateCcw,
  Search,
  Swords,
} from 'lucide-react';
import { BestiaryCoreRulesContent } from '@/src/components/BestiaryCoreRulesContent';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ALL_BESTIARY_ENTRIES,
  ALL_ENVIRONMENTS,
  CREATURE_TYPES,
  getCreatureTypeLabel,
  getEnvironmentLabel,
} from '../data';
import { getEncounterManagerCopy } from '../i18n';
import type {
  BestiaryKind,
  CreatureTypeId,
  EncounterEntry,
  EncounterEnvId,
  ModuleLanguage,
} from '../types';
import { filterBestiaryEntries } from '../utils/encounterRoller';

interface BestiaryTableSectionProps {
  lang: ModuleLanguage;
  onInspectEntry: (entry: EncounterEntry) => void;
  onSendToCombat?: (entry: EncounterEntry) => void;
  onSendToSimulator?: (entry: EncounterEntry) => void;
}

type CategoryFilter = 'all' | BestiaryKind;
type TypeFilter = 'all' | CreatureTypeId;
type EnvironmentFilter = 'all' | EncounterEnvId;
type SourceFilter = 'all' | 'official' | 'fan';

/**
 * Searchable & filterable bestiary and faction reference table across all unified entries.
 * Clicking any row opens the full GM dossier modal with combat stats, armor breakdown, and notes.
 */
export function BestiaryTableSection({
  lang,
  onInspectEntry,
  onSendToCombat,
  onSendToSimulator,
}: BestiaryTableSectionProps) {
  const copy = getEncounterManagerCopy(lang);
  const b = copy.bestiary;

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [typeId, setTypeId] = useState<TypeFilter>('all');
  const [environment, setEnvironment] = useState<EnvironmentFilter>('all');
  const [source, setSource] = useState<SourceFilter>('all');

  const filteredEntries = useMemo(
    () =>
      filterBestiaryEntries(
        ALL_BESTIARY_ENTRIES,
        {
          search,
          category,
          typeId,
          environment,
          source,
        },
        lang
      ),
    [category, environment, lang, search, source, typeId]
  );

  const hasActiveFilters =
    search.trim().length > 0 ||
    category !== 'all' ||
    typeId !== 'all' ||
    environment !== 'all' ||
    source !== 'all';

  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setTypeId('all');
    setEnvironment('all');
    setSource('all');
  };

  const selectedTypeLabel =
    typeId === 'all' ? b.typeAll : getCreatureTypeLabel(typeId, lang);

  const selectedEnvironmentLabel =
    environment === 'all'
      ? b.envAll
      : environment === 'everywhere'
        ? b.everywhereOption
        : getEnvironmentLabel(environment, lang);

  const selectedSourceLabel =
    source === 'all'
      ? b.sourceAll
      : source === 'official'
        ? b.sourceOfficial
        : b.sourceFanMade;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-base font-semibold">{b.title}</CardTitle>
            <CardDescription>{b.description}</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Dialog>
              <DialogTrigger
                render={
                  <Button type="button" variant="outline" size="sm">
                    <BookOpen data-icon="inline-start" />
                    <span>{b.rulesBtn}</span>
                  </Button>
                }
              />
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{b.rulesDialogTitle}</DialogTitle>
                  <DialogDescription>{b.rulesDialogDesc}</DialogDescription>
                </DialogHeader>
                <div className="sm:max-h-[68dvh] sm:overflow-y-auto sm:pr-2">
                  <BestiaryCoreRulesContent lang={lang} />
                </div>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
            <div className="font-mono text-xs text-muted-foreground tabular-nums">
              {b.resultsCount
                .replace('{shown}', String(filteredEntries.length))
                .replace('{total}', String(ALL_BESTIARY_ENTRIES.length))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Category Quick Filter + Source Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className="flex flex-wrap gap-1.5"
            role="group"
            aria-label={b.categoryFilter}
          >
            <Button
              type="button"
              size="sm"
              variant={category === 'all' ? 'default' : 'outline'}
              onClick={() => setCategory('all')}
            >
              {b.categoryAll}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={category === 'monster' ? 'default' : 'outline'}
              onClick={() => setCategory('monster')}
            >
              {b.categoryMonsters}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={category === 'humanoid' ? 'default' : 'outline'}
              onClick={() => setCategory('humanoid')}
            >
              {b.categoryHumanoids}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={category === 'animal' ? 'default' : 'outline'}
              onClick={() => setCategory('animal')}
            >
              {b.categoryAnimals}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="bestiary-source-select"
              className="text-xs text-muted-foreground"
            >
              {b.sourceFilter}
            </Label>
            <Select
              value={source}
              onValueChange={(value) => {
                if (value) setSource(value as SourceFilter);
              }}
            >
              <SelectTrigger id="bestiary-source-select" className="w-36">
                <SelectValue>{selectedSourceLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">{b.sourceAll}</SelectItem>
                <SelectItem value="official">{b.sourceOfficial}</SelectItem>
                <SelectItem value="fan">{b.sourceFanMade}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search + Type + Environment Controls */}
        <div className="grid gap-3 md:grid-cols-12">
          <div className="flex flex-col gap-1.5 md:col-span-5">
            <Label htmlFor="bestiary-search-input" className="sr-only">
              {b.searchPlaceholder}
            </Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="bestiary-search-input"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={b.searchPlaceholder}
                className="pl-8"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <Select
              value={typeId}
              onValueChange={(value) => {
                if (value) setTypeId(value as TypeFilter);
              }}
            >
              <SelectTrigger id="bestiary-type-select" className="w-full">
                <SelectValue>{selectedTypeLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="all">{b.typeAll}</SelectItem>
                {CREATURE_TYPES.map((typeKey) => (
                  <SelectItem key={typeKey} value={typeKey}>
                    {getCreatureTypeLabel(typeKey, lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-3">
            <Select
              value={environment}
              onValueChange={(value) => {
                if (value) setEnvironment(value as EnvironmentFilter);
              }}
            >
              <SelectTrigger id="bestiary-environment-select" className="w-full">
                <SelectValue>{selectedEnvironmentLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start" className="max-h-72">
                <SelectItem value="all">{b.envAll}</SelectItem>
                {ALL_ENVIRONMENTS.map((envId) => (
                  <SelectItem key={envId} value={envId}>
                    {envId === 'everywhere'
                      ? b.everywhereOption
                      : getEnvironmentLabel(envId, lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end md:col-span-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={!hasActiveFilters}
              className="h-8 w-full"
              title={b.resetFilters}
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span className="md:sr-only">{b.resetFilters}</span>
            </Button>
          </div>
        </div>

        {/* Responsive Bestiary Table */}
        {filteredEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-10 text-center">
            <p className="text-sm text-muted-foreground">{b.emptyTable}</p>
          </div>
        ) : (
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{b.columns.name}</TableHead>
                  <TableHead>{b.columns.type}</TableHead>
                  <TableHead>{b.columns.threat}</TableHead>
                  <TableHead>{b.columns.reward}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {b.columns.armor}
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {b.columns.environments}
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    {b.columns.organization}
                  </TableHead>
                  <TableHead className="text-right">
                    {b.columns.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="cursor-pointer"
                    onClick={() => onInspectEntry(entry)}
                  >
                    <TableCell className="whitespace-normal">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-foreground">
                          {entry.name[lang]}
                        </span>
                        {entry.isFanMade && (
                          <span className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {copy.dossier.fanMadeTag}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {getCreatureTypeLabel(entry.typeId, lang)}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-foreground">
                      {entry.threat[lang]}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-primary tabular-nums">
                      {entry.reward[lang]}
                    </TableCell>
                    <TableCell className="hidden font-mono text-xs text-muted-foreground tabular-nums md:table-cell">
                      {entry.armor[lang]}
                    </TableCell>
                    <TableCell className="hidden whitespace-normal lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {entry.environments.map((envId) => (
                          <span
                            key={`${entry.id}-${envId}`}
                            className="rounded border border-border bg-muted/30 px-1.5 py-0.5 text-[11px] text-foreground"
                          >
                            {getEnvironmentLabel(envId, lang)}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-52 truncate text-xs text-muted-foreground xl:table-cell">
                      {entry.organization[lang]}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onSendToCombat && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            title={copy.dossier.sendToCombat}
                            aria-label={`${copy.dossier.sendToCombat} — ${entry.name[lang]}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              onSendToCombat(entry);
                            }}
                          >
                            <Swords className="size-3.5 text-primary" aria-hidden="true" />
                          </Button>
                        )}
                        {onSendToSimulator && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            title={copy.dossier.sendToSimulator}
                            aria-label={`${copy.dossier.sendToSimulator} — ${entry.name[lang]}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              onSendToSimulator(entry);
                            }}
                          >
                            <BarChart3 className="size-3.5 text-muted-foreground" aria-hidden="true" />
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            onInspectEntry(entry);
                          }}
                        >
                          <Eye className="size-3.5" aria-hidden="true" />
                          <span className="sr-only sm:not-sr-only">
                            {b.inspect}
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
