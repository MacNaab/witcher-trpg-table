import { useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Hammer,
  Pause,
  Play,
  Plus,
  Search,
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ALL_LEXICON_ENTRIES } from '@/src/modules/lexicon-tables/data';
import type {
  DiagramLexiconEntry,
  FormulaLexiconEntry,
} from '@/src/modules/lexicon-tables/types';
import {
  parseLexiconCraftDays,
  type CraftingProject,
  type ModuleLanguage,
} from '@/src/utils/continentCalendar';
import type { CampaignCalendarCopy } from '../i18n';

interface CraftingQueuePanelProps {
  projects: CraftingProject[];
  lang: ModuleLanguage;
  copy: CampaignCalendarCopy;
  onAddProject: (project: Omit<CraftingProject, 'id'>) => void;
  onUpdateProject: (id: string, patch: Partial<CraftingProject>) => void;
  onRemoveProject: (id: string) => void;
}

export function CraftingQueuePanel({
  projects,
  lang,
  copy,
  onAddProject,
  onUpdateProject,
  onRemoveProject,
}: CraftingQueuePanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [codexOpen, setCodexOpen] = useState(false);
  const [codexSearch, setCodexSearch] = useState('');

  const [title, setTitle] = useState('');
  const [crafterName, setCrafterName] = useState('');
  const [dcLabel, setDcLabel] = useState('SD 16');
  const [totalDays, setTotalDays] = useState('2');
  const [workDuringTravel, setWorkDuringTravel] = useState(false);

  const codexCraftables = useMemo(() => {
    const items = ALL_LEXICON_ENTRIES.filter(
      (entry): entry is DiagramLexiconEntry | FormulaLexiconEntry =>
        entry.rowKind === 'diagram' || entry.rowKind === 'formula'
    );
    const q = codexSearch.trim().toLowerCase();
    if (!q) return items.slice(0, 40);
    return items
      .filter(
        (entry) =>
          entry.name.fr.toLowerCase().includes(q) ||
          entry.name.en.toLowerCase().includes(q)
      )
      .slice(0, 40);
  }, [codexSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    const days = Math.max(1, Number.parseInt(totalDays, 10) || 1);
    onAddProject({
      title: cleanTitle,
      crafterName: crafterName.trim() || (lang === 'fr' ? 'Groupe' : 'Party'),
      dcLabel: dcLabel.trim() || '—',
      totalDays: days,
      daysCompleted: 0,
      active: true,
      workDuringTravel,
    });
    setTitle('');
    setCrafterName('');
    setDcLabel('SD 16');
    setTotalDays('2');
    setWorkDuringTravel(false);
    setShowAddForm(false);
  };

  const handleImportCodexEntry = (
    entry: DiagramLexiconEntry | FormulaLexiconEntry
  ) => {
    const computedDays = parseLexiconCraftDays(entry.time.en || entry.time.fr);
    onAddProject({
      title: entry.name[lang],
      crafterName: lang === 'fr' ? 'Artisanat' : 'Crafter',
      dcLabel: `${lang === 'fr' ? 'SD' : 'DC'} ${entry.dc}`,
      totalDays: computedDays,
      daysCompleted: 0,
      active: true,
      workDuringTravel: entry.rowKind === 'formula',
    });
    setCodexOpen(false);
    setCodexSearch('');
  };

  return (
    <Card className="border-border">
      <CardHeader className="gap-3 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Hammer className="size-5 text-primary" aria-hidden="true" />
              <span>{copy.crafting.title}</span>
            </CardTitle>
            <CardDescription>{copy.crafting.subtitle}</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCodexOpen(true)}
            >
              <BookOpen data-icon="inline-start" className="size-3.5" />
              <span>{copy.crafting.pickCodexBtn}</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              <Plus data-icon="inline-start" className="size-3.5" />
              <span>{copy.crafting.addProjectBtn}</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 rounded-lg border border-border bg-muted/20 p-3.5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="flex flex-col gap-1 sm:col-span-2">
              <Label htmlFor="craft-title" className="text-xs">
                {copy.crafting.projectTitleLabel}
              </Label>
              <Input
                id="craft-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={copy.crafting.projectTitlePlaceholder}
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="craft-crafter" className="text-xs">
                {copy.crafting.crafterLabel}
              </Label>
              <Input
                id="craft-crafter"
                value={crafterName}
                onChange={(e) => setCrafterName(e.target.value)}
                placeholder={copy.crafting.crafterPlaceholder}
                className="h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="craft-dc" className="text-xs">
                  {copy.crafting.dcLabel}
                </Label>
                <Input
                  id="craft-dc"
                  value={dcLabel}
                  onChange={(e) => setDcLabel(e.target.value)}
                  className="h-8 font-mono text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="craft-days" className="text-xs">
                  {copy.crafting.totalDaysLabel}
                </Label>
                <Input
                  id="craft-days"
                  type="number"
                  min={1}
                  max={120}
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
                  className="h-8 font-mono text-xs tabular-nums"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-2 lg:col-span-4">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={workDuringTravel}
                  onChange={(e) => setWorkDuringTravel(e.target.checked)}
                  className="size-3.5 rounded border-border accent-primary"
                />
                <span>{copy.crafting.workDuringTravelLabel}</span>
              </label>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  {copy.crafting.cancelBtn}
                </Button>
                <Button type="submit" size="sm">
                  {copy.crafting.saveProjectBtn}
                </Button>
              </div>
            </div>
          </form>
        )}

        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
            <Hammer className="size-7 text-muted-foreground/70" />
            <p className="text-sm font-semibold text-foreground">
              {copy.crafting.emptyTitle}
            </p>
            <p className="max-w-md text-xs text-muted-foreground">
              {copy.crafting.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((proj) => {
              const isDone = proj.daysCompleted >= proj.totalDays;
              const pct = Math.min(
                100,
                Math.round((proj.daysCompleted / proj.totalDays) * 100)
              );

              return (
                <div
                  key={proj.id}
                  className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {isDone && (
                          <CheckCircle2
                            className="size-4 text-emerald-500"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-sm font-semibold text-foreground">
                          {proj.title}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{proj.crafterName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{proj.dcLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={
                            isDone
                              ? 'font-medium text-emerald-500'
                              : proj.active
                                ? 'font-medium text-primary'
                                : 'text-muted-foreground'
                          }
                        >
                          {isDone
                            ? copy.crafting.statusDone
                            : proj.active
                              ? copy.crafting.statusActive
                              : copy.crafting.statusPaused}
                        </span>
                        {proj.workDuringTravel && !isDone && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{copy.crafting.workDuringTravelLabel}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="mr-1 font-mono text-xs font-semibold text-foreground tabular-nums">
                        {proj.daysCompleted} / {proj.totalDays}{' '}
                        {copy.crafting.daysSuffix}
                      </span>

                      {!isDone && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 font-mono text-xs"
                            onClick={() =>
                              onUpdateProject(proj.id, {
                                daysCompleted: Math.min(
                                  proj.totalDays,
                                  proj.daysCompleted + 1
                                ),
                              })
                            }
                          >
                            {copy.crafting.stepDayBtn}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() =>
                              onUpdateProject(proj.id, { active: !proj.active })
                            }
                            aria-label={
                              proj.active
                                ? copy.crafting.pauseBtn
                                : copy.crafting.resumeBtn
                            }
                            title={
                              proj.active
                                ? copy.crafting.pauseBtn
                                : copy.crafting.resumeBtn
                            }
                          >
                            {proj.active ? (
                              <Pause className="size-3" />
                            ) : (
                              <Play className="size-3" />
                            )}
                          </Button>
                        </>
                      )}

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={copy.crafting.removeBtn}
                        onClick={() => onRemoveProject(proj.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all ${
                        isDone ? 'bg-emerald-500' : 'bg-primary'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>

      {/* Codex Diagram & Formula Picker Dialog */}
      <Dialog open={codexOpen} onOpenChange={setCodexOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-4 text-primary" />
              <span>{copy.crafting.codexDialogTitle}</span>
            </DialogTitle>
            <DialogDescription>
              {copy.crafting.codexDialogDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
              <Input
                value={codexSearch}
                onChange={(e) => setCodexSearch(e.target.value)}
                placeholder={copy.crafting.codexSearchPlaceholder}
                className="pl-8 text-xs"
              />
            </div>

            <div className="flex max-h-72 flex-col divide-y divide-border overflow-y-auto rounded-md border border-border">
              {codexCraftables.map((entry) => {
                const days = parseLexiconCraftDays(
                  entry.time.en || entry.time.fr
                );
                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between gap-3 px-3 py-2 text-xs hover:bg-muted/30"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-foreground">
                        {entry.name[lang]}
                      </p>
                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        {lang === 'fr' ? 'SD' : 'DC'} {entry.dc} ·{' '}
                        {copy.crafting.codexTimeHint}: {entry.time[lang]} →{' '}
                        <strong className="text-foreground">
                          {days} {copy.crafting.daysSuffix}
                        </strong>
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 shrink-0 px-2.5 text-xs"
                      onClick={() => handleImportCodexEntry(entry)}
                    >
                      {copy.crafting.codexImportBtn}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
