import { useEffect, useState, type FormEvent } from 'react';
import { Copy, RotateCcw, Store } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { STANDALONE_BUILDING_OPTIONS } from '../data/environmentsData';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  BuildingTypeId,
  GeneratedBuilding,
  GeneratedSingleBuilding,
  ModuleLanguage,
} from '../types';
import {
  formatBuildingAsText,
  generateSingleBuilding,
} from '../utils/generator';
import { BuildingCard } from './BuildingCard';
import { EditBuildingDialog } from './EditBuildingDialog';

interface SingleBuildingSectionProps {
  lang: ModuleLanguage;
  activeResult: GeneratedSingleBuilding | null;
  onSaveNewResult: (generated: GeneratedSingleBuilding) => void;
  onUpdateActiveResult: (updated: GeneratedSingleBuilding) => void;
}

const FIXED_COUNT_BUILDINGS = new Set<BuildingTypeId>([
  'Inn_high_class',
  'Inn_standard_quality',
  'Inn_medium_quality',
  'Inn_cheap_quality',
  'Inn_infamous_quality',
  'Notice_board',
]);

/**
 * Standalone shop / tavern / notice board generator allowing the GM
 * to roll a custom number of unique wares on demand and edit manually.
 */
export function SingleBuildingSection({
  lang,
  activeResult,
  onSaveNewResult,
  onUpdateActiveResult,
}: SingleBuildingSectionProps) {
  const copy = getUrbanGeneratorCopy(lang);

  const [itemCountInput, setItemCountInput] = useState('12');
  const [buildingType, setBuildingType] = useState<BuildingTypeId>('Alchemist');
  const [includeFanMade, setIncludeFanMade] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (!activeResult) return;
    setBuildingType(activeResult.buildingType);
    setItemCountInput(String(activeResult.requestedCount));
    setIncludeFanMade(activeResult.includeFanMade);
  }, [activeResult]);

  const isFixedOutput = FIXED_COUNT_BUILDINGS.has(buildingType);

  const handleGenerate = (event?: FormEvent) => {
    event?.preventDefault();
    const parsed = Number.parseInt(itemCountInput, 10);
    if (!isFixedOutput && (Number.isNaN(parsed) || parsed < 1)) {
      toast.warning(copy.buildingForm.invalidCountToast);
      return;
    }

    const generated = generateSingleBuilding({
      buildingType,
      itemCount: Number.isNaN(parsed) || parsed < 1 ? 10 : parsed,
      includeFanMade,
    });
    onSaveNewResult(generated);
  };

  const handleCopy = async () => {
    if (!activeResult) return;
    try {
      await navigator.clipboard.writeText(
        formatBuildingAsText(activeResult.building, lang)
      );
      toast.success(copy.output.copiedToast);
    } catch {
      toast.error(copy.output.copyFailedToast);
    }
  };

  const handleSaveManualEdit = (updatedBuilding: GeneratedBuilding) => {
    if (!activeResult) return;
    onUpdateActiveResult({
      ...activeResult,
      building: updatedBuilding,
    });
    toast.success(copy.editor.buildingSavedToast);
  };

  const wasCapped =
    activeResult !== null &&
    !FIXED_COUNT_BUILDINGS.has(activeResult.buildingType) &&
    activeResult.buildingType !== 'Tailoring' &&
    activeResult.buildingType !== 'Inn_stables' &&
    activeResult.building.items.length < activeResult.requestedCount;

  return (
    <div className="flex flex-col gap-5">
      <Card className="print:hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            {copy.buildingForm.title}
          </CardTitle>
          <CardDescription>{copy.buildingForm.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="flex flex-col gap-1.5 md:col-span-4">
                <Label htmlFor="gm-urban-single-count">
                  {copy.buildingForm.itemCountLabel}
                </Label>
                <Input
                  id="gm-urban-single-count"
                  type="number"
                  min={1}
                  max={500}
                  disabled={isFixedOutput}
                  value={itemCountInput}
                  onChange={(e) => setItemCountInput(e.target.value)}
                  className="font-mono tabular-nums"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-8">
                <Label htmlFor="gm-urban-single-type">
                  {copy.buildingForm.buildingTypeLabel}
                </Label>
                <Select
                  value={buildingType}
                  onValueChange={(value) => {
                    if (value) {
                      setBuildingType(value as BuildingTypeId);
                    }
                  }}
                >
                  <SelectTrigger
                    id="gm-urban-single-type"
                    className="h-9 w-full justify-between"
                  >
                    <SelectValue>{copy.buildings[buildingType]}</SelectValue>
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
            </div>

            <div className="flex flex-col gap-4 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  id="gm-urban-single-fanmade"
                  checked={includeFanMade}
                  onCheckedChange={setIncludeFanMade}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor="gm-urban-single-fanmade"
                    className="cursor-pointer text-sm font-medium"
                  >
                    {copy.buildingForm.fanMadeLabel}
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {copy.buildingForm.fanMadeHint}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activeResult ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                  >
                    <Copy data-icon="inline-start" />
                    <span>{copy.buildingForm.copyButton}</span>
                  </Button>
                ) : null}

                <Button type="submit" size="default" className="w-full sm:w-auto">
                  {activeResult ? (
                    <RotateCcw data-icon="inline-start" />
                  ) : (
                    <Store data-icon="inline-start" />
                  )}
                  <span>
                    {activeResult
                      ? copy.buildingForm.regenerateButton
                      : copy.buildingForm.generateButton}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {activeResult ? (
        <div className="flex flex-col gap-3">
          {wasCapped ? (
            <p className="text-xs text-muted-foreground">
              {copy.buildingForm.cappedCountNote} (
              <span className="font-mono tabular-nums">
                {activeResult.building.items.length}
              </span>
              ).
            </p>
          ) : null}
          <BuildingCard
            building={activeResult.building}
            lang={lang}
            onEdit={() => setEditOpen(true)}
          />
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Store
              className="size-8 text-muted-foreground/70"
              aria-hidden="true"
            />
            <p className="text-sm font-medium text-foreground">
              {copy.buildingForm.emptyTitle}
            </p>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              {copy.buildingForm.emptyBody}
            </p>
          </CardContent>
        </Card>
      )}

      <EditBuildingDialog
        building={activeResult?.building ?? null}
        open={editOpen}
        lang={lang}
        onOpenChange={setEditOpen}
        onSave={handleSaveManualEdit}
      />
    </div>
  );
}
