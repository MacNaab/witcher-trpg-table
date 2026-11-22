import { Compass, Map, Search, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTravelManagerCopy } from '../i18n';
import type { ModuleLanguage, TravelMapFilter } from '../types';

interface TravelHubHeroProps {
  lang: ModuleLanguage;
  availableCount: number;
  comingSoonCount: number;
  totalCount: number;
  filter: TravelMapFilter;
  searchQuery: string;
  onFilterChange: (next: TravelMapFilter) => void;
  onSearchChange: (next: string) => void;
  onOpenImportModal: () => void;
}

/**
 * Top atmospheric Hub banner with map availability counts, status filter tabs,
 * and instant region/cartographer search.
 */
export function TravelHubHero({
  lang,
  availableCount,
  comingSoonCount,
  totalCount,
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onOpenImportModal,
}: TravelHubHeroProps) {
  const copy = getTravelManagerCopy(lang);

  return (
    <Card className="relative overflow-hidden border-border">
      {/* Subtle cartographic decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 opacity-[0.06]"
      >
        <Compass className="size-64 text-primary" />
      </div>

      <CardContent className="relative z-10 flex flex-col gap-5 pt-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase">
              <Map className="size-3.5" aria-hidden="true" />
              <span>{copy.hero.eyebrow}</span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {copy.hero.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {copy.hero.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
              {availableCount} {copy.hero.availableCountLabel}
            </span>
            <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
              {comingSoonCount} {copy.hero.comingSoonCountLabel}
            </span>
            <span className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground">
              {totalCount} {copy.hero.totalCountLabel}
            </span>
            <Button
              type="button"
              size="sm"
              onClick={onOpenImportModal}
              className="ml-0 sm:ml-1"
            >
              <Upload data-icon="inline-start" className="size-3.5" />
              <span>{copy.hero.importMapBtn}</span>
            </Button>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={filter}
            onValueChange={(value) => {
              if (
                value === 'all' ||
                value === 'available' ||
                value === 'coming-soon'
              ) {
                onFilterChange(value);
              }
            }}
          >
            <TabsList className="flex w-full flex-wrap gap-1 p-1 sm:inline-flex sm:w-fit sm:flex-nowrap">
              <TabsTrigger value="all" className="px-3 py-1.5 text-xs">
                {copy.hero.filters.all} ({totalCount})
              </TabsTrigger>
              <TabsTrigger value="available" className="px-3 py-1.5 text-xs">
                {copy.hero.filters.available} ({availableCount})
              </TabsTrigger>
              <TabsTrigger value="coming-soon" className="px-3 py-1.5 text-xs">
                {copy.hero.filters.comingSoon} ({comingSoonCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={copy.hero.searchPlaceholder}
              aria-label={copy.hero.searchPlaceholder}
              className="h-9 pr-8 pl-8 text-xs sm:text-sm"
            />
            {searchQuery.trim() && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => onSearchChange('')}
                aria-label={copy.emptySearch.resetBtn}
                className="absolute top-1/2 right-1 size-7 -translate-y-1/2"
              >
                <X className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
