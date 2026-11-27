import { useState } from 'react';
import { Dices, Plus, Sprout, Trash2, Trees } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { SUGGESTED_BOTANICALS } from '../data/estateUpgradesData';
import type { EstateCopy } from '../i18n';
import type { NobleEstate, PlantRarity } from '../types';
import { computeEstateDerivedStats, rollNd6 } from '../utils/estateStorage';

interface EstateResourcesSectionProps {
  estate: NobleEstate;
  locale: 'fr' | 'en';
  copy: EstateCopy['resources'];
  onUpdateEstate: (mutator: (prev: NobleEstate) => NobleEstate) => void;
}

export function EstateResourcesSection({
  estate,
  locale,
  copy,
  onUpdateEstate,
}: EstateResourcesSectionProps) {
  const derived = computeEstateDerivedStats(estate);
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantRarity, setNewPlantRarity] = useState<PlantRarity>('common');

  const canAddPlant = estate.greenhousePlants.length < derived.maxPlantSpecies;

  const handleAddPlant = (name: string, rarity: PlantRarity) => {
    const trimmed = name.trim();
    if (!trimmed || !canAddPlant) return;
    onUpdateEstate((prev) => ({
      ...prev,
      greenhousePlants: [
        ...prev.greenhousePlants,
        {
          id: `plant-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: trimmed,
          rarity,
          monthlyYield: 10,
          storedUnits: 0,
        },
      ],
    }));
    setNewPlantName('');
  };

  const handleHarvestMonth = () => {
    if (estate.greenhousePlants.length === 0) return;
    const totalGained = estate.greenhousePlants.reduce(
      (sum, p) => sum + p.monthlyYield,
      0
    );
    onUpdateEstate((prev) => ({
      ...prev,
      greenhousePlants: prev.greenhousePlants.map((p) => ({
        ...p,
        storedUnits: p.storedUnits + p.monthlyYield,
      })),
    }));
    toast.success(copy.harvestedToast(totalGained));
  };

  const handleRollHunt = (hours: 1 | 2 | 3) => {
    const bones = rollNd6(hours);
    const feathers = rollNd6(hours);
    const leather = rollNd6(hours);

    onUpdateEstate((prev) => ({
      ...prev,
      stockpile: {
        bones: prev.stockpile.bones + bones,
        feathers: prev.stockpile.feathers + feathers,
        leather: prev.stockpile.leather + leather,
      },
      huntingHistory: [
        {
          id: `hunt-${Date.now()}`,
          hours,
          bones,
          feathers,
          leather,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
        ...prev.huntingHistory.slice(0, 11),
      ],
    }));
    toast.success(copy.huntRollToast(bones, feathers, leather));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Greenhouse / Serre */}
      <Card className="lg:col-span-7">
        <CardHeader className="gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Sprout className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.greenhouseTitle}</span>
            </CardTitle>
            {derived.greenhouseCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {copy.greenhouseCapacity(
                    estate.greenhousePlants.length,
                    derived.maxPlantSpecies
                  )}
                </span>
                <Button
                  type="button"
                  size="sm"
                  disabled={estate.greenhousePlants.length === 0}
                  onClick={handleHarvestMonth}
                  className="whitespace-nowrap shrink-0"
                >
                  {copy.harvestMonthBtn}
                </Button>
              </div>
            )}
          </div>
          <CardDescription className="text-xs">
            {derived.greenhouseCount > 0
              ? copy.greenhouseGuide
              : copy.greenhouseLocked}
          </CardDescription>
        </CardHeader>

        {derived.greenhouseCount > 0 && (
          <CardContent className="flex flex-col gap-4">
            {/* Add Plant Form */}
            <div className="flex flex-col gap-3 rounded-md border border-border/80 bg-muted/20 p-3">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-12">
                <div className="flex flex-col gap-1 sm:col-span-6">
                  <Label htmlFor="plant-name" className="text-xs">
                    {copy.plantNameLabel}
                  </Label>
                  <Input
                    id="plant-name"
                    value={newPlantName}
                    onChange={(e) => setNewPlantName(e.target.value)}
                    disabled={!canAddPlant}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-4">
                  <Label className="text-xs">{copy.plantRarityLabel}</Label>
                  <Select
                    value={newPlantRarity}
                    onValueChange={(v) => setNewPlantRarity(v as PlantRarity)}
                    disabled={!canAddPlant}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">
                        {copy.rarityLabels.common}
                      </SelectItem>
                      <SelectItem value="uncommon">
                        {copy.rarityLabels.uncommon}
                      </SelectItem>
                      <SelectItem value="rare">
                        {copy.rarityLabels.rare}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end sm:col-span-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={!canAddPlant || !newPlantName.trim()}
                    onClick={() => handleAddPlant(newPlantName, newPlantRarity)}
                    className="h-8 w-full whitespace-nowrap"
                  >
                    <Plus className="size-3.5" />
                    <span>{copy.addPlantBtn}</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">
                  {copy.suggestedPlantsLabel} :
                </span>
                {SUGGESTED_BOTANICALS.slice(0, 6).map((bot) => (
                  <Button
                    key={bot.name.en}
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={!canAddPlant}
                    onClick={() => handleAddPlant(bot.name[locale], bot.rarity)}
                    className="h-6 px-2 text-[11px]"
                  >
                    + {bot.name[locale]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Planted List */}
            {estate.greenhousePlants.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                {copy.emptyPlants}
              </p>
            ) : (
              <div className="divide-y divide-border/70 rounded-md border border-border/80">
                {estate.greenhousePlants.map((plant) => (
                  <div
                    key={plant.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-2.5"
                  >
                    <div className="flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {plant.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {copy.rarityLabels[plant.rarity]} · 10/mois
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        {copy.storedLabel(plant.storedUnits)}
                      </span>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={plant.storedUnits < 10}
                        onClick={() =>
                          onUpdateEstate((prev) => ({
                            ...prev,
                            greenhousePlants: prev.greenhousePlants.map((p) =>
                              p.id === plant.id
                                ? {
                                    ...p,
                                    storedUnits: Math.max(0, p.storedUnits - 10),
                                  }
                                : p
                            ),
                          }))
                        }
                        className="h-7 px-2 font-mono text-xs"
                      >
                        {copy.useTenBtn}
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="Remove plant"
                        onClick={() =>
                          onUpdateEstate((prev) => ({
                            ...prev,
                            greenhousePlants: prev.greenhousePlants.filter(
                              (p) => p.id !== plant.id
                            ),
                          }))
                        }
                        className="size-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Hunting Ground / Terrain de chasse */}
      <Card className="lg:col-span-5">
        <CardHeader className="gap-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Trees className="size-4 text-primary" aria-hidden="true" />
            <span>{copy.huntingTitle}</span>
          </CardTitle>
          <CardDescription className="text-xs">
            {derived.hasHuntingGround
              ? copy.huntingDesc
              : copy.huntingLocked}
          </CardDescription>
        </CardHeader>

        {derived.hasHuntingGround && (
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {copy.hoursLabel}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {([1, 2, 3] as const).map((hrs) => (
                  <Button
                    key={hrs}
                    type="button"
                    size="sm"
                    onClick={() => handleRollHunt(hrs)}
                    className="whitespace-nowrap"
                  >
                    <Dices className="size-3.5" />
                    <span>{copy.rollHuntBtn(hrs)}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">
                  {copy.stockpileLabel}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    onUpdateEstate((prev) => ({
                      ...prev,
                      stockpile: { bones: 0, feathers: 0, leather: 0 },
                    }))
                  }
                  className="h-6 px-2 text-xs"
                >
                  {copy.resetStockpileBtn}
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2 rounded-md border border-border/80 bg-muted/25 p-3 text-center">
                <div className="flex flex-col">
                  <span className="font-mono text-lg font-semibold tabular-nums">
                    {estate.stockpile.bones}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {copy.bonesLabel}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-lg font-semibold tabular-nums">
                    {estate.stockpile.feathers}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {copy.feathersLabel}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-lg font-semibold tabular-nums">
                    {estate.stockpile.leather}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {copy.leatherLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {copy.huntHistoryTitle}
              </span>
              {estate.huntingHistory.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  {copy.noHuntHistory}
                </p>
              ) : (
                <ul className="flex flex-col gap-1.5 text-xs">
                  {estate.huntingHistory.map((h) => (
                    <li
                      key={h.id}
                      className="flex items-center justify-between border-b border-border/50 pb-1 font-mono tabular-nums last:border-b-0"
                    >
                      <span className="text-muted-foreground">
                        {h.timestamp} ({h.hours}h)
                      </span>
                      <span>
                        +{h.bones} {copy.bonesLabel} · +{h.feathers}{' '}
                        {copy.feathersLabel} · +{h.leather} {copy.leatherLabel}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
