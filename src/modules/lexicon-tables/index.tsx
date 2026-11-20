import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { LexiconDataTable } from './components/LexiconDataTable';
import { LexiconDetailDialog } from './components/LexiconDetailDialog';
import { LexiconFilterToolbar } from './components/LexiconFilterToolbar';
import { LexiconTabBar } from './components/LexiconTabBar';
import { ALL_LEXICON_ENTRIES, LEXICON_TAB_DATA } from './data';
import { getLexiconTablesCopy } from './i18n';
import type {
  LexiconEntry,
  LexiconTabId,
  ModuleLanguage,
  SortField,
} from './types';
import {
  filterAndSortLexiconEntries,
  type LexiconFilterState,
  type LexiconSortState,
} from './utils/lexiconFilters';

const INITIAL_FILTERS: LexiconFilterState = {
  search: '',
  tableFilter: 'all',
  level: 'all',
  rarity: 'all',
  substance: 'all',
  elderfolkKind: 'all',
};

const INITIAL_SORT: LexiconSortState = {
  field: 'default',
  direction: 'asc',
};

function isLexiconTabId(value?: string): value is LexiconTabId {
  return Boolean(value && value in LEXICON_TAB_DATA);
}

/**
 * Isolated entry point for the EN–FR Comparative Tables module.
 * Houses all 10 crafting, material, diagram, substance, and formula tables
 * with live bilingual EN/FR search, cross-table comparison, sorting, and detail view.
 */
export default function LexiconTablesModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('lexicon-tables');
  const moduleCopy = t.modules['lexicon-tables'];
  const copy = getLexiconTablesCopy(lang);
  const Icon = definition.icon;

  const [activeTab, setActiveTab] = useState<LexiconTabId>(() =>
    isLexiconTabId(launchIntent?.tab) ? launchIntent.tab : 'crafting-materials'
  );
  const [isGlobalMode, setIsGlobalMode] = useState(false);
  const [filters, setFilters] = useState<LexiconFilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<LexiconSortState>(INITIAL_SORT);
  const [inspectedEntry, setInspectedEntry] = useState<LexiconEntry | null>(
    () =>
      launchIntent?.entryId
        ? ALL_LEXICON_ENTRIES.find((e) => e.id === launchIntent.entryId) ?? null
        : null
  );

  useEffect(() => {
    if (!launchIntent) return;
    if (isLexiconTabId(launchIntent.tab)) {
      setIsGlobalMode(false);
      setActiveTab(launchIntent.tab);
      setFilters(INITIAL_FILTERS);
      setSort(INITIAL_SORT);
    }
    if (launchIntent.entryId) {
      const matched =
        ALL_LEXICON_ENTRIES.find((e) => e.id === launchIntent.entryId) ?? null;
      if (matched) {
        setIsGlobalMode(false);
        setActiveTab(matched.tabId);
        setInspectedEntry(matched);
      }
    }
  }, [launchIntent]);

  const sourceEntries = isGlobalMode
    ? ALL_LEXICON_ENTRIES
    : LEXICON_TAB_DATA[activeTab];

  const filteredEntries = useMemo(
    () =>
      filterAndSortLexiconEntries(
        sourceEntries,
        filters,
        sort,
        copy,
        lang,
        isGlobalMode
      ),
    [copy, filters, isGlobalMode, lang, sort, sourceEntries]
  );

  const handleSelectTab = (tabId: LexiconTabId) => {
    setIsGlobalMode(false);
    setActiveTab(tabId);
    setFilters((prev) => ({
      ...INITIAL_FILTERS,
      search: prev.search,
    }));
    setSort(INITIAL_SORT);
  };

  const handleToggleGlobalMode = (enabled: boolean) => {
    setIsGlobalMode(enabled);
    setFilters((prev) => ({
      ...INITIAL_FILTERS,
      search: prev.search,
    }));
    setSort(INITIAL_SORT);
  };

  const handleUpdateFilters = (patch: Partial<LexiconFilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSort(INITIAL_SORT);
  };

  const handleToggleSort = (field: SortField) => {
    setSort((prev) => {
      if (prev.field !== field) {
        return { field, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { field, direction: 'desc' };
      }
      return INITIAL_SORT;
    });
  };

  const activeTitle = isGlobalMode
    ? copy.toolbar.globalSearchToggle
    : copy.tabs[activeTab];

  return (
    <section
      aria-labelledby="module-heading-lexicon-tables"
      className="mx-auto flex w-full max-w-6xl flex-col gap-6"
    >
      {/* Category Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t.nav.groups[definition.group]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {copy.header.moduleTag}
              </span>
            </div>
            <h1
              id="module-heading-lexicon-tables"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {moduleCopy.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {moduleCopy.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="shrink-0 self-start"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator />

      {/* 10 Grouped Reference Table Selectors */}
      <LexiconTabBar
        activeTab={activeTab}
        isGlobalMode={isGlobalMode}
        lang={lang}
        onSelectTab={handleSelectTab}
      />

      {/* Active Table Workspace */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            {activeTitle}
          </CardTitle>
          <CardDescription>{moduleCopy.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <LexiconFilterToolbar
            activeTab={activeTab}
            isGlobalMode={isGlobalMode}
            filters={filters}
            shownCount={filteredEntries.length}
            totalCount={sourceEntries.length}
            lang={lang}
            onToggleGlobalMode={handleToggleGlobalMode}
            onUpdateFilters={handleUpdateFilters}
            onResetFilters={handleResetFilters}
          />

          <LexiconDataTable
            activeTab={activeTab}
            isGlobalMode={isGlobalMode}
            entries={filteredEntries}
            sort={sort}
            lang={lang}
            onToggleSort={handleToggleSort}
            onInspectEntry={setInspectedEntry}
          />
        </CardContent>
      </Card>

      {/* Bilingual Comparison Inspection Dialog */}
      <LexiconDetailDialog
        entry={inspectedEntry}
        lang={lang}
        onClose={() => setInspectedEntry(null)}
      />
    </section>
  );
}
