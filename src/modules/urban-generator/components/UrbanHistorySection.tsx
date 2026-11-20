import { useMemo, useState } from 'react';
import {
  Building2,
  Castle,
  Clock,
  Copy,
  FolderOpen,
  History,
  Search,
  Store,
  Trash2,
} from 'lucide-react';
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  ModuleLanguage,
  SavedUrbanBuilding,
  SavedUrbanEnvironment,
  UrbanHistoryState,
} from '../types';
import { formatUrbanTimestamp } from '../utils/urbanStorage';

interface UrbanHistorySectionProps {
  history: UrbanHistoryState;
  lang: ModuleLanguage;
  activeEnvironmentId: string | null;
  activeBuildingId: string | null;
  onOpenEnvironment: (entry: SavedUrbanEnvironment) => void;
  onDuplicateEnvironment: (id: string) => void;
  onDeleteEnvironment: (id: string) => void;
  onOpenBuilding: (entry: SavedUrbanBuilding) => void;
  onDuplicateBuilding: (id: string) => void;
  onDeleteBuilding: (id: string) => void;
  onClearAll: () => void;
}

export function UrbanHistorySection({
  history,
  lang,
  activeEnvironmentId,
  activeBuildingId,
  onOpenEnvironment,
  onDuplicateEnvironment,
  onDeleteEnvironment,
  onOpenBuilding,
  onDuplicateBuilding,
  onDeleteBuilding,
  onClearAll,
}: UrbanHistorySectionProps) {
  const copy = getUrbanGeneratorCopy(lang);
  const h = copy.history;
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredEnvironments = useMemo(() => {
    if (!normalizedQuery) return history.environments;
    return history.environments.filter((entry) => {
      const name = (
        entry.data.settlementName || copy.envForm.defaultSettlementName
      ).toLowerCase();
      const envName = entry.data.environmentName[lang].toLowerCase();
      return (
        name.includes(normalizedQuery) ||
        envName.includes(normalizedQuery) ||
        entry.data.buildings.some(
          (b) =>
            b.title[lang].toLowerCase().includes(normalizedQuery) ||
            (b.tavernName?.[lang].toLowerCase().includes(normalizedQuery) ?? false)
        )
      );
    });
  }, [copy.envForm.defaultSettlementName, history.environments, lang, normalizedQuery]);

  const filteredBuildings = useMemo(() => {
    if (!normalizedQuery) return history.buildings;
    return history.buildings.filter((entry) => {
      const b = entry.data.building;
      return (
        b.title[lang].toLowerCase().includes(normalizedQuery) ||
        (b.tavernName?.[lang].toLowerCase().includes(normalizedQuery) ?? false) ||
        b.items.some((it) => it.name[lang].toLowerCase().includes(normalizedQuery))
      );
    });
  }, [history.buildings, lang, normalizedQuery]);

  const totalCount = history.environments.length + history.buildings.length;

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" aria-hidden="true" />
              <CardTitle className="text-base font-semibold">{h.title}</CardTitle>
            </div>
            <CardDescription>{h.description}</CardDescription>
          </div>

          {totalCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setConfirmClearOpen(true)}
              className="shrink-0 self-start text-destructive hover:text-destructive sm:self-center"
            >
              <Trash2 data-icon="inline-start" />
              <span>{h.clearAllBtn}</span>
            </Button>
          )}
        </CardHeader>

        {totalCount > 0 && (
          <CardContent className="border-t border-border/70 pt-4">
            <div className="relative max-w-md">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={h.searchPlaceholder}
                aria-label={h.searchPlaceholder}
                className="pl-8"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {totalCount === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <History
              className="size-8 text-muted-foreground/70"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-foreground">{h.emptyTitle}</p>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              {h.emptyBody}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Saved Urban Environments */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Castle className="size-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-foreground">
                  {h.environmentsTitle}
                </h2>
              </div>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {filteredEnvironments.length}
              </span>
            </div>

            {filteredEnvironments.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                {copy.output.noMatchesFilter}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredEnvironments.map((entry) => {
                  const env = entry.data;
                  const title =
                    env.settlementName || copy.envForm.defaultSettlementName;
                  const itemCount = env.buildings.reduce(
                    (sum, b) => sum + b.items.length,
                    0
                  );
                  const isActive = entry.id === activeEnvironmentId;

                  return (
                    <Card
                      key={entry.id}
                      className={isActive ? 'border-primary/60' : undefined}
                    >
                      <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate font-semibold text-foreground">
                              {title}
                            </h3>
                            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                              <span className="font-medium text-foreground">
                                {env.environmentName[lang]}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {env.buildings.length}{' '}
                                {copy.output.buildingsCountLabel}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {itemCount} {copy.output.itemsCountLabel}
                              </span>
                            </p>
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground tabular-nums">
                            <Clock className="size-3" aria-hidden="true" />
                            {formatUrbanTimestamp(entry.updatedAt, lang)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5">
                          <Button
                            type="button"
                            size="sm"
                            variant={isActive ? 'default' : 'secondary'}
                            onClick={() => onOpenEnvironment(entry)}
                            className="flex-1 sm:flex-initial"
                          >
                            <FolderOpen data-icon="inline-start" />
                            <span>{h.openBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="outline"
                            onClick={() => onDuplicateEnvironment(entry.id)}
                            title={h.duplicateBtn}
                            aria-label={h.duplicateBtn}
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => onDeleteEnvironment(entry.id)}
                            title={h.deleteBtn}
                            aria-label={h.deleteBtn}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>

          {/* Saved Standalone Buildings */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="size-4 text-primary" aria-hidden="true" />
                <h2 className="text-sm font-semibold text-foreground">
                  {h.buildingsTitle}
                </h2>
              </div>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {filteredBuildings.length}
              </span>
            </div>

            {filteredBuildings.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                {copy.output.noMatchesFilter}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredBuildings.map((entry) => {
                  const b = entry.data.building;
                  const title = b.tavernName
                    ? `${b.title[lang]} — “${b.tavernName[lang]}”`
                    : b.title[lang];
                  const isActive = entry.id === activeBuildingId;

                  return (
                    <Card
                      key={entry.id}
                      className={isActive ? 'border-primary/60' : undefined}
                    >
                      <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 items-start gap-2">
                            <Building2
                              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <h3 className="truncate font-semibold text-foreground">
                                {title}
                              </h3>
                              <p className="mt-0.5 font-mono text-xs text-muted-foreground tabular-nums">
                                {b.items.length} {copy.output.itemsCountLabel}
                                {b.roomPrice !== undefined
                                  ? ` · ${b.roomPrice} ${copy.output.crownUnit}${copy.output.perNight}`
                                  : ''}
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground tabular-nums">
                            <Clock className="size-3" aria-hidden="true" />
                            {formatUrbanTimestamp(entry.updatedAt, lang)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5">
                          <Button
                            type="button"
                            size="sm"
                            variant={isActive ? 'default' : 'secondary'}
                            onClick={() => onOpenBuilding(entry)}
                            className="flex-1 sm:flex-initial"
                          >
                            <FolderOpen data-icon="inline-start" />
                            <span>{h.openBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="outline"
                            onClick={() => onDuplicateBuilding(entry.id)}
                            title={h.duplicateBtn}
                            aria-label={h.duplicateBtn}
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => onDeleteBuilding(entry.id)}
                            title={h.deleteBtn}
                            aria-label={h.deleteBtn}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      <Dialog open={confirmClearOpen} onOpenChange={setConfirmClearOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{h.clearDialogTitle}</DialogTitle>
            <DialogDescription>{h.clearDialogDesc}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmClearOpen(false)}
            >
              {h.cancelBtn}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onClearAll();
                setConfirmClearOpen(false);
              }}
            >
              {h.confirmClearBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
