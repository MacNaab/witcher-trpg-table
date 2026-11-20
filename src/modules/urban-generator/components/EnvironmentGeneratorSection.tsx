import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Building2,
  Castle,
  Check,
  Compass,
  Copy,
  Dices,
  FileDown,
  Pencil,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Users,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
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
  ENVIRONMENT_BY_ID,
  ENVIRONMENTS,
  STANDALONE_BUILDING_OPTIONS,
} from '../data/environmentsData';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  BuildingTypeId,
  EnvironmentId,
  GeneratedBuilding,
  GeneratedEnvironment,
  ModuleLanguage,
} from '../types';
import {
  createBlankBuilding,
  createRolledBuildingForEnvironment,
  formatEnvironmentAsText,
  generateUrbanEnvironment,
} from '../utils/generator';
import {
  downloadPrintableDossier,
  isEmbeddedSandbox,
} from '../utils/printExport';
import type { ModuleId, ModuleLaunchIntent } from '@/src/types/navigation';
import { BuildingCard } from './BuildingCard';
import { EditBuildingDialog } from './EditBuildingDialog';

interface EnvironmentGeneratorSectionProps {
  lang: ModuleLanguage;
  activeResult: GeneratedEnvironment | null;
  onSaveNewResult: (generated: GeneratedEnvironment) => void;
  onUpdateActiveResult: (updated: GeneratedEnvironment) => void;
  onNavigateModule?: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
}

/**
 * Full settlement generator: produces all allowed shops, taverns, stables,
 * and notice board hooks for Capital, City, Village, or Fortress scales,
 * with full manual editing and automatic history archival.
 */
export function EnvironmentGeneratorSection({
  lang,
  activeResult,
  onSaveNewResult,
  onUpdateActiveResult,
  onNavigateModule,
}: EnvironmentGeneratorSectionProps) {
  const copy = getUrbanGeneratorCopy(lang);

  const [settlementName, setSettlementName] = useState('');
  const [environmentId, setEnvironmentId] = useState<EnvironmentId>(0);
  const [includeFanMade, setIncludeFanMade] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  // Manual editing state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [addBuildingOpen, setAddBuildingOpen] = useState(false);
  const [newBuildingType, setNewBuildingType] =
    useState<BuildingTypeId>('Alchemist');
  const [isRenamingSettlement, setIsRenamingSettlement] = useState(false);
  const [renameDraft, setRenameDraft] = useState('');

  useEffect(() => {
    if (!activeResult) return;
    setSettlementName(activeResult.settlementName);
    setEnvironmentId(activeResult.environmentId);
    setIncludeFanMade(activeResult.includeFanMade);
    setIsRenamingSettlement(false);
  }, [activeResult]);

  const handleGenerate = (event?: FormEvent) => {
    event?.preventDefault();
    const generated = generateUrbanEnvironment({
      settlementName,
      environmentId,
      includeFanMade,
    });
    onSaveNewResult(generated);
    setFilterQuery('');
  };

  const handleCreateEmptySettlement = () => {
    const envDef = ENVIRONMENT_BY_ID[environmentId];
    const emptyEnv: GeneratedEnvironment = {
      settlementName: settlementName.trim(),
      environmentId: envDef.id,
      environmentName: envDef.name,
      includeFanMade,
      buildings: [],
      generatedAtIso: new Date().toISOString(),
    };
    onSaveNewResult(emptyEnv);
    setFilterQuery('');
  };

  const handleCopyAll = async () => {
    if (!activeResult) return;
    try {
      await navigator.clipboard.writeText(
        formatEnvironmentAsText(activeResult, lang)
      );
      toast.success(copy.output.copiedToast);
    } catch {
      toast.error(copy.output.copyFailedToast);
    }
  };

  const handleDownloadHtml = () => {
    if (!activeResult) return;
    downloadPrintableDossier(activeResult, lang);
    toast.success(copy.output.htmlDownloadedToast);
  };

  const handlePrint = () => {
    if (!activeResult) return;
    if (isEmbeddedSandbox()) {
      downloadPrintableDossier(activeResult, lang);
      toast.info(copy.output.printSandboxFallbackToast);
      return;
    }
    window.print();
  };

  const handleStartRename = () => {
    if (!activeResult) return;
    setRenameDraft(activeResult.settlementName);
    setIsRenamingSettlement(true);
  };

  const handleCommitRename = (e?: FormEvent) => {
    e?.preventDefault();
    if (!activeResult) return;
    const trimmed = renameDraft.trim();
    onUpdateActiveResult({
      ...activeResult,
      settlementName: trimmed,
    });
    setSettlementName(trimmed);
    setIsRenamingSettlement(false);
  };

  const handleAddBuilding = (mode: 'roll' | 'empty') => {
    if (!activeResult) return;
    const nextBuilding =
      mode === 'roll'
        ? createRolledBuildingForEnvironment(
            newBuildingType,
            activeResult.environmentId,
            activeResult.includeFanMade
          )
        : createBlankBuilding(newBuildingType);

    onUpdateActiveResult({
      ...activeResult,
      buildings: [...activeResult.buildings, nextBuilding],
    });
    setAddBuildingOpen(false);
    toast.success(copy.editor.buildingAddedToast);
  };

  const handleSaveEditedBuilding = (updatedBuilding: GeneratedBuilding) => {
    if (!activeResult || editingIndex === null) return;
    onUpdateActiveResult({
      ...activeResult,
      buildings: activeResult.buildings.map((b, idx) =>
        idx === editingIndex ? updatedBuilding : b
      ),
    });
    toast.success(copy.editor.buildingSavedToast);
  };

  const handleRerollBuilding = (buildingIndex: number) => {
    if (!activeResult) return;
    const target = activeResult.buildings[buildingIndex];
    if (!target) return;
    const rerolled = createRolledBuildingForEnvironment(
      target.buildingType,
      activeResult.environmentId,
      activeResult.includeFanMade
    );
    onUpdateActiveResult({
      ...activeResult,
      buildings: activeResult.buildings.map((b, idx) =>
        idx === buildingIndex ? rerolled : b
      ),
    });
    toast.success(copy.editor.buildingRerolledToast);
  };

  const handleDeleteBuilding = (buildingIndex: number) => {
    if (!activeResult) return;
    onUpdateActiveResult({
      ...activeResult,
      buildings: activeResult.buildings.filter((_, idx) => idx !== buildingIndex),
    });
    toast.success(copy.editor.buildingRemovedToast);
  };

  const normalizedFilter = filterQuery.trim().toLowerCase();

  const filteredBuildings = useMemo(() => {
    if (!activeResult) return [];
    if (!normalizedFilter) {
      return activeResult.buildings.map((building, buildingIndex) => ({
        building,
        buildingIndex,
        passQueryToItems: '',
      }));
    }

    return activeResult.buildings
      .map((building, buildingIndex) => {
        const titleMatches =
          building.title[lang].toLowerCase().includes(normalizedFilter) ||
          (building.tavernName?.[lang].toLowerCase().includes(normalizedFilter) ??
            false);

        if (titleMatches) {
          return { building, buildingIndex, passQueryToItems: '' };
        }

        const anyItemMatches = building.items.some((item) => {
          const itemName = item.name[lang].toLowerCase();
          const kindLabel = copy.itemKinds[item.kind].toLowerCase();
          const metaLabel = item.meta?.[lang].toLowerCase() ?? '';
          return (
            itemName.includes(normalizedFilter) ||
            kindLabel.includes(normalizedFilter) ||
            metaLabel.includes(normalizedFilter)
          );
        });

        return anyItemMatches
          ? { building, buildingIndex, passQueryToItems: normalizedFilter }
          : null;
      })
      .filter(
        (
          entry
        ): entry is {
          building: GeneratedBuilding;
          buildingIndex: number;
          passQueryToItems: string;
        } => entry !== null
      );
  }, [activeResult, copy.itemKinds, lang, normalizedFilter]);

  const totalEntriesCount = useMemo(() => {
    if (!activeResult) return 0;
    return activeResult.buildings.reduce((sum, b) => sum + b.items.length, 0);
  }, [activeResult]);

  return (
    <div className="flex flex-col gap-5">
      {/* Control Form (hidden when printing) */}
      <Card className="print:hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            {copy.envForm.title}
          </CardTitle>
          <CardDescription>{copy.envForm.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="flex flex-col gap-1.5 md:col-span-6">
                <Label htmlFor="gm-urban-settlement-name">
                  {copy.envForm.settlementNameLabel}
                </Label>
                <Input
                  id="gm-urban-settlement-name"
                  type="text"
                  value={settlementName}
                  onChange={(e) => setSettlementName(e.target.value)}
                  placeholder={copy.envForm.settlementNamePlaceholder}
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-6">
                <Label htmlFor="gm-urban-environment-select">
                  {copy.envForm.environmentLabel}
                </Label>
                <Select
                  value={String(environmentId)}
                  onValueChange={(value) => {
                    if (value !== null) {
                      setEnvironmentId(Number(value) as EnvironmentId);
                    }
                  }}
                >
                  <SelectTrigger
                    id="gm-urban-environment-select"
                    className="h-9 w-full justify-between"
                  >
                    <SelectValue>{copy.environments[environmentId]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {ENVIRONMENTS.map((env) => (
                      <SelectItem key={env.id} value={String(env.id)}>
                        {env.name[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  id="gm-urban-env-fanmade"
                  checked={includeFanMade}
                  onCheckedChange={setIncludeFanMade}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor="gm-urban-env-fanmade"
                    className="cursor-pointer text-sm font-medium"
                  >
                    {copy.envForm.fanMadeLabel}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {copy.envForm.fanMadeHint}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activeResult ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAll}
                    >
                      <Copy data-icon="inline-start" />
                      <span>{copy.envForm.copyButton}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadHtml}
                    >
                      <FileDown data-icon="inline-start" />
                      <span>{copy.envForm.downloadHtmlButton}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                    >
                      <Printer data-icon="inline-start" />
                      <span>{copy.envForm.printButton}</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCreateEmptySettlement}
                  >
                    <Plus data-icon="inline-start" />
                    <span>{copy.editor.emptyNewEnvironmentBtn}</span>
                  </Button>
                )}

                <Button type="submit" size="default" className="w-full sm:w-auto">
                  {activeResult ? (
                    <RotateCcw data-icon="inline-start" />
                  ) : (
                    <Castle data-icon="inline-start" />
                  )}
                  <span>
                    {activeResult
                      ? copy.envForm.regenerateButton
                      : copy.envForm.generateButton}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Settlement Dossier Output */}
      {activeResult ? (
        <div className="flex flex-col gap-4">
          {/* Dossier Summary Header + Filter + Add Building */}
          <Card>
            <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium tracking-wide uppercase">
                    {copy.output.printSubtitle}
                  </span>
                  <span aria-hidden="true" className="print:hidden">
                    ·
                  </span>
                  <span className="text-primary print:hidden">
                    {copy.history.savedAutoBadge}
                  </span>
                </div>

                {isRenamingSettlement ? (
                  <form
                    onSubmit={handleCommitRename}
                    className="mt-1 flex max-w-md items-center gap-1.5 print:hidden"
                  >
                    <Input
                      value={renameDraft}
                      onChange={(e) => setRenameDraft(e.target.value)}
                      placeholder={copy.envForm.settlementNamePlaceholder}
                      aria-label={copy.editor.editSettlementNameAria}
                      autoFocus
                      className="h-8 text-sm font-semibold"
                    />
                    <Button
                      type="submit"
                      size="icon-sm"
                      variant="secondary"
                      aria-label={copy.editor.saveBtn}
                    >
                      <Check className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={() => setIsRenamingSettlement(false)}
                      aria-label={copy.editor.cancelBtn}
                    >
                      <X className="size-3.5" />
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="font-display truncate text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {activeResult.settlementName ||
                        copy.envForm.defaultSettlementName}
                    </h2>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={handleStartRename}
                      title={copy.editor.editSettlementNameAria}
                      aria-label={copy.editor.editSettlementNameAria}
                      className="shrink-0 text-muted-foreground hover:text-foreground print:hidden"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {activeResult.environmentName[lang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {activeResult.buildings.length}{' '}
                    {copy.output.buildingsCountLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {totalEntriesCount} {copy.output.itemsCountLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {activeResult.includeFanMade
                      ? copy.output.fanMadeActive
                      : copy.output.officialOnly}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center print:hidden">
                <div className="relative w-full sm:w-56">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    placeholder={copy.envForm.filterPlaceholder}
                    className="pl-8"
                    aria-label={copy.envForm.filterPlaceholder}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setAddBuildingOpen(true)}
                  className="shrink-0"
                >
                  <Plus data-icon="inline-start" />
                  <span>{copy.editor.addBuildingBtn}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
              {filteredBuildings.map(
                ({ building, buildingIndex, passQueryToItems }) => (
                  <BuildingCard
                    key={
                      building.id ?? `${building.buildingType}-${buildingIndex}`
                    }
                    building={building}
                    lang={lang}
                    searchQuery={passQueryToItems}
                    onEdit={() => setEditingIndex(buildingIndex)}
                    onReroll={() => handleRerollBuilding(buildingIndex)}
                    onDelete={() => handleDeleteBuilding(buildingIndex)}
                  />
                )
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center text-sm text-muted-foreground">
                <p>
                  {activeResult.buildings.length === 0
                    ? copy.editor.noItemsHint
                    : copy.output.noMatchesFilter}
                </p>
                {activeResult.buildings.length === 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setAddBuildingOpen(true)}
                    className="print:hidden"
                  >
                    <Plus data-icon="inline-start" />
                    <span>{copy.editor.addBuildingBtn}</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {onNavigateModule && (
            <Card className="border-dashed bg-muted/20 print:hidden">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {copy.bridges.title}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('encounter-manager', { tab: 'humanoid' })
                    }
                  >
                    <Users data-icon="inline-start" />
                    <span>{copy.bridges.humanoidBtn}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('random-tables', { tab: 'tables' })
                    }
                  >
                    <Dices data-icon="inline-start" />
                    <span>{copy.bridges.rumorBtn}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onNavigateModule('random-tables', { tab: 'encounter' })
                    }
                  >
                    <Compass data-icon="inline-start" />
                    <span>{copy.bridges.encounterBtn}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Building2
              className="size-8 text-muted-foreground/70"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-foreground">
              {copy.envForm.emptyTitle}
            </p>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              {copy.envForm.emptyBody}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Manual Building & Inventory Editor */}
      <EditBuildingDialog
        building={
          editingIndex !== null
            ? (activeResult?.buildings[editingIndex] ?? null)
            : null
        }
        open={editingIndex !== null}
        lang={lang}
        onOpenChange={(open) => {
          if (!open) setEditingIndex(null);
        }}
        onSave={handleSaveEditedBuilding}
      />

      {/* Add Building to Settlement Dialog */}
      <Dialog open={addBuildingOpen} onOpenChange={setAddBuildingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.editor.addBuildingTitle}</DialogTitle>
            <DialogDescription>{copy.editor.addBuildingDesc}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="gm-urban-add-bld-type">
              {copy.editor.buildingTypeLabel}
            </Label>
            <Select
              value={newBuildingType}
              onValueChange={(value) => {
                if (value) setNewBuildingType(value as BuildingTypeId);
              }}
            >
              <SelectTrigger
                id="gm-urban-add-bld-type"
                className="h-9 w-full justify-between"
              >
                <SelectValue>{copy.buildings[newBuildingType]}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start" className="max-h-80">
                {STANDALONE_BUILDING_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {copy.buildings[option]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAddBuilding('empty')}
            >
              <Plus data-icon="inline-start" />
              <span>{copy.editor.addEmptyBtn}</span>
            </Button>
            <Button type="button" onClick={() => handleAddBuilding('roll')}>
              <RotateCcw data-icon="inline-start" />
              <span>{copy.editor.addRolledBtn}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
