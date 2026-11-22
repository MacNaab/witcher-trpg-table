import { RotateCcw, Search } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import {
  CRAFT_LEVEL_ORDER,
  ELDERFOLK_KIND_ORDER,
  LEXICON_TABS,
  RARITY_ORDER,
  SUBSTANCE_ORDER,
} from '../data';
import { getLexiconTablesCopy } from '../i18n';
import type {
  CraftLevelId,
  ElderfolkKindId,
  LexiconTabId,
  ModuleLanguage,
  RarityCode,
  SubstanceId,
} from '../types';
import type { LexiconFilterState } from '../utils/lexiconFilters';

interface LexiconFilterToolbarProps {
  activeTab: LexiconTabId;
  isGlobalMode: boolean;
  filters: LexiconFilterState;
  shownCount: number;
  totalCount: number;
  lang: ModuleLanguage;
  onToggleGlobalMode: (enabled: boolean) => void;
  onUpdateFilters: (patch: Partial<LexiconFilterState>) => void;
  onResetFilters: () => void;
}

/**
 * Search and contextual filter bar supporting bilingual EN/FR queries,
 * cross-table global search, level/rarity/substance/subtype filters, and reset.
 */
export function LexiconFilterToolbar({
  activeTab,
  isGlobalMode,
  filters,
  shownCount,
  totalCount,
  lang,
  onToggleGlobalMode,
  onUpdateFilters,
  onResetFilters,
}: LexiconFilterToolbarProps) {
  const copy = getLexiconTablesCopy(lang);
  const t = copy.toolbar;

  const isMaterialTab =
    !isGlobalMode &&
    (activeTab === 'crafting-materials' ||
      activeTab === 'animal-parts' ||
      activeTab === 'minerals' ||
      activeTab === 'alchemical-treatments' ||
      activeTab === 'substances');
  const isSubstancesTab = !isGlobalMode && activeTab === 'substances';
  const isDiagramOrFormulaTab =
    !isGlobalMode &&
    (activeTab === 'ingredient-diagrams' ||
      activeTab === 'weapon-diagrams' ||
      activeTab === 'armor-diagrams' ||
      activeTab === 'elderfolk-diagrams' ||
      activeTab === 'formulae');
  const isElderfolkTab = !isGlobalMode && activeTab === 'elderfolk-diagrams';

  const hasActiveFilters =
    filters.search.trim().length > 0 ||
    filters.tableFilter !== 'all' ||
    filters.level !== 'all' ||
    filters.rarity !== 'all' ||
    filters.substance !== 'all' ||
    filters.elderfolkKind !== 'all';

  const tableLabel =
    filters.tableFilter === 'all'
      ? t.tableAll
      : copy.tabs[filters.tableFilter];
  const levelLabel =
    filters.level === 'all' ? t.levelAll : copy.levels[filters.level];
  const rarityLabel =
    filters.rarity === 'all'
      ? t.rarityAll
      : copy.rarities[filters.rarity].label;
  const substanceLabel =
    filters.substance === 'all'
      ? t.substanceAll
      : copy.substances[filters.substance];
  const elderfolkLabel =
    filters.elderfolkKind === 'all'
      ? t.elderfolkKindAll
      : copy.elderfolkKinds[filters.elderfolkKind];

  return (
    <div className="flex flex-col gap-3">
      {/* Global Search Toggle + Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/80 bg-muted/20 px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <Switch
            id="lexicon-global-search-switch"
            checked={isGlobalMode}
            onCheckedChange={onToggleGlobalMode}
          />
          <Label
            htmlFor="lexicon-global-search-switch"
            className="cursor-pointer text-xs font-medium text-foreground"
          >
            {t.globalSearchToggle}
          </Label>
          {isGlobalMode && (
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · {t.globalSearchHint}
            </span>
          )}
        </div>

        <div className="font-mono text-xs text-muted-foreground tabular-nums">
          {t.resultsCount
            .replace('{shown}', String(shownCount))
            .replace('{total}', String(totalCount))}
        </div>
      </div>

      {/* Search + Contextual Filter Selects */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative min-w-60 flex-1">
          <Label htmlFor="lexicon-search-input" className="sr-only">
            {t.searchPlaceholder}
          </Label>
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="lexicon-search-input"
            type="search"
            value={filters.search}
            onChange={(event) =>
              onUpdateFilters({ search: event.target.value })
            }
            placeholder={t.searchPlaceholder}
            className="pl-8"
          />
        </div>

        {isGlobalMode && (
          <Select
            value={filters.tableFilter}
            onValueChange={(value) => {
              if (value) {
                onUpdateFilters({
                  tableFilter: value as 'all' | LexiconTabId,
                });
              }
            }}
          >
            <SelectTrigger
              id="lexicon-table-filter"
              className="w-full sm:w-56"
            >
              <SelectValue>{tableLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start" className="max-h-72">
              <SelectItem value="all">{t.tableAll}</SelectItem>
              {LEXICON_TABS.map((tab) => (
                <SelectItem key={tab.id} value={tab.id}>
                  {copy.tabs[tab.id]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {isElderfolkTab && (
          <Select
            value={filters.elderfolkKind}
            onValueChange={(value) => {
              if (value) {
                onUpdateFilters({
                  elderfolkKind: value as 'all' | ElderfolkKindId,
                });
              }
            }}
          >
            <SelectTrigger
              id="lexicon-elderfolk-filter"
              className="w-full sm:w-48"
            >
              <SelectValue>{elderfolkLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">{t.elderfolkKindAll}</SelectItem>
              {ELDERFOLK_KIND_ORDER.map((kind) => (
                <SelectItem key={kind} value={kind}>
                  {copy.elderfolkKinds[kind]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {isDiagramOrFormulaTab && (
          <Select
            value={filters.level}
            onValueChange={(value) => {
              if (value) {
                onUpdateFilters({ level: value as 'all' | CraftLevelId });
              }
            }}
          >
            <SelectTrigger
              id="lexicon-level-filter"
              className="w-full sm:w-44"
            >
              <SelectValue>{levelLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">{t.levelAll}</SelectItem>
              {CRAFT_LEVEL_ORDER.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {copy.levels[lvl]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {isSubstancesTab && (
          <Select
            value={filters.substance}
            onValueChange={(value) => {
              if (value) {
                onUpdateFilters({
                  substance: value as 'all' | SubstanceId,
                });
              }
            }}
          >
            <SelectTrigger
              id="lexicon-substance-filter"
              className="w-full sm:w-44"
            >
              <SelectValue>{substanceLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">{t.substanceAll}</SelectItem>
              {SUBSTANCE_ORDER.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {copy.substances[sub]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {isMaterialTab && (
          <Select
            value={filters.rarity}
            onValueChange={(value) => {
              if (value) {
                onUpdateFilters({ rarity: value as 'all' | RarityCode });
              }
            }}
          >
            <SelectTrigger
              id="lexicon-rarity-filter"
              className="w-full sm:w-44"
            >
              <SelectValue>{rarityLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">{t.rarityAll}</SelectItem>
              {RARITY_ORDER.map((rar) => (
                <SelectItem key={rar} value={rar}>
                  {copy.rarities[rar].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          disabled={!hasActiveFilters}
          className="h-8 shrink-0"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          <span>{t.resetFilters}</span>
        </Button>
      </div>

      {isMaterialTab && (
        <p className="text-xs text-muted-foreground">{t.rarityLegendTitle}</p>
      )}
    </div>
  );
}
