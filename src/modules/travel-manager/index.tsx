import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { CustomMapImportDialog } from './components/CustomMapImportDialog';
import { MapHubCard } from './components/MapHubCard';
import { MapSourcesFooter } from './components/MapSourcesFooter';
import { SelectedMapWorkspace } from './components/SelectedMapWorkspace';
import { TravelHubHero } from './components/TravelHubHero';
import { TRAVEL_MAPS_CATALOG } from './data/mapsCatalog';
import { getTravelManagerCopy } from './i18n';
import type {
  CustomMapFormPayload,
  ModuleLanguage,
  TravelMapDefinition,
  TravelMapFilter,
  TravelMapId,
} from './types';
import {
  deleteCustomMapFromDb,
  loadCustomMapsFromDb,
  revokeCustomMapObjectUrl,
  saveCustomMapToDb,
} from './utils/customMapsStorage';

/**
 * Isolated entry point for the Travel Manager module.
 * Interactive Maps Hub displaying built-in & user-imported regional cards,
 * status filtering, and full cartographer/tool attributions.
 */
export default function TravelManagerModule({
  onNavigateOverview,
  onNavigateModule,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('travel-manager');
  const moduleCopy = t.modules['travel-manager'];
  const copy = getTravelManagerCopy(lang);
  const Icon = definition.icon;

  const [customMaps, setCustomMaps] = useState<TravelMapDefinition[]>([]);
  const customMapsRef = useRef<TravelMapDefinition[]>([]);
  customMapsRef.current = customMaps;

  const [filter, setFilter] = useState<TravelMapFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMapId, setSelectedMapId] = useState<TravelMapId | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [editingCustomMap, setEditingCustomMap] =
    useState<TravelMapDefinition | null>(null);

  // Hydrate persisted custom maps from IndexedDB on mount; revoke blob URLs on unmount
  useEffect(() => {
    let active = true;
    void loadCustomMapsFromDb().then((loaded) => {
      if (!active) {
        for (const m of loaded) revokeCustomMapObjectUrl(m.imageSrc);
        return;
      }
      setCustomMaps(loaded);
    });

    return () => {
      active = false;
      for (const m of customMapsRef.current) {
        revokeCustomMapObjectUrl(m.imageSrc);
      }
    };
  }, []);

  const allMaps = useMemo(
    () => [...customMaps, ...TRAVEL_MAPS_CATALOG],
    [customMaps]
  );

  const availableCount = useMemo(
    () => allMaps.filter((m) => m.status === 'available').length,
    [allMaps]
  );
  const comingSoonCount = allMaps.length - availableCount;

  const filteredMaps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allMaps.filter((map) => {
      if (filter !== 'all' && map.status !== filter) return false;
      if (!query) return true;
      const haystack = [
        map.name[lang],
        map.subtitle[lang],
        map.description[lang],
        map.regionTag[lang],
        map.creatorName,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [allMaps, filter, lang, searchQuery]);

  const selectedMap = useMemo(
    () =>
      selectedMapId
        ? (allMaps.find((m) => m.id === selectedMapId) ?? null)
        : null,
    [allMaps, selectedMapId]
  );

  const handleSaveCustomMap = async (payload: CustomMapFormPayload) => {
    const saved = await saveCustomMapToDb(payload);
    setCustomMaps((prev) => {
      const existing = prev.find((m) => m.id === saved.id);
      if (existing) {
        revokeCustomMapObjectUrl(existing.imageSrc);
        return prev.map((m) => (m.id === saved.id ? saved : m));
      }
      return [saved, ...prev];
    });
  };

  const handleDeleteCustomMap = async (mapId: TravelMapId) => {
    await deleteCustomMapFromDb(mapId);
    setCustomMaps((prev) => {
      const target = prev.find((m) => m.id === mapId);
      if (target) revokeCustomMapObjectUrl(target.imageSrc);
      return prev.filter((m) => m.id !== mapId);
    });
    if (selectedMapId === mapId) {
      setSelectedMapId(null);
    }
  };

  return (
    <section
      aria-labelledby="module-heading-travel-manager"
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
              id="module-heading-travel-manager"
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

      {selectedMap ? (
        <SelectedMapWorkspace
          map={selectedMap}
          lang={lang}
          onBackToHub={() => setSelectedMapId(null)}
          onNavigateModule={onNavigateModule}
        />
      ) : (
        <>
          <TravelHubHero
            lang={lang}
            availableCount={availableCount}
            comingSoonCount={comingSoonCount}
            totalCount={allMaps.length}
            filter={filter}
            searchQuery={searchQuery}
            onFilterChange={setFilter}
            onSearchChange={setSearchQuery}
            onOpenImportModal={() => {
              setEditingCustomMap(null);
              setImportDialogOpen(true);
            }}
          />

          {/* Maps Hub Grid */}
          {filteredMaps.length === 0 ? (
            <Card className="border-dashed border-border">
              <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                <Compass
                  className="size-10 text-muted-foreground/50"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {copy.emptySearch.title}
                  </h3>
                  <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
                    {copy.emptySearch.description}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                >
                  {copy.emptySearch.resetBtn}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMaps.map((map) => (
                <MapHubCard
                  key={map.id}
                  map={map}
                  lang={lang}
                  onSelectMap={(mapId) => setSelectedMapId(mapId)}
                  onEditCustomMap={(target) => {
                    setEditingCustomMap(target);
                    setImportDialogOpen(true);
                  }}
                  onDeleteCustomMap={handleDeleteCustomMap}
                />
              ))}
            </div>
          )}

          {/* Sources, Cartographers & Technical Attributions */}
          <MapSourcesFooter lang={lang} />

          {/* Import / Edit Custom Map Dialog */}
          <CustomMapImportDialog
            open={importDialogOpen}
            editingMap={editingCustomMap}
            lang={lang}
            onClose={() => {
              setImportDialogOpen(false);
              setEditingCustomMap(null);
            }}
            onSubmit={handleSaveCustomMap}
          />
        </>
      )}
    </section>
  );
}
