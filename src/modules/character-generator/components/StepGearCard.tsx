import { useState } from 'react';
import {
  AlertTriangle,
  Backpack,
  Coins,
  FlaskConical,
  Minus,
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getProfessionDefinition } from '../data/racesAndProfessions';
import {
  COMPENDIUM_PICKER_ITEMS,
  PROFESSION_STARTER_KITS,
  getWitcherFormulaOptions,
} from '../data/startingGearData';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  CustomInventoryEntry,
  ModuleLanguage,
  StarterEquipmentCategory,
} from '../types';
import {
  calculateDerivedStats,
  getTotalCarriedWeight,
} from '../utils/characterCalculations';
import { ItemDescriptionTooltip } from './ItemDescriptionTooltip';

interface StepGearCardProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  onUpdateState: (
    updater: (prev: CharacterSheetState) => CharacterSheetState
  ) => void;
}

/**
 * Step 6: Profession Starter Kit checklists, Witcher starting alchemy formulae,
 * unified `@/src/data/items` Compendium Command Picker, live Encumbrance weight meter,
 * and Personal Description notes.
 */
export function StepGearCard({
  lang,
  state,
  onUpdateState,
}: StepGearCardProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<
    StarterEquipmentCategory | 'all'
  >('all');

  const derived = calculateDerivedStats(state);
  const carriedWeight = getTotalCarriedWeight(state);
  const isOverweight = carriedWeight > derived.encumbrance;
  const kit = state.professionId
    ? PROFESSION_STARTER_KITS[state.professionId]
    : null;
  const profDef = state.professionId
    ? getProfessionDefinition(state.professionId)
    : null;
  const formulaOptions = getWitcherFormulaOptions();

  const toggleStarterItem = (itemId: string, checked: boolean) => {
    if (!kit) return;
    onUpdateState((prev) => {
      const current = prev.selectedStarterGearIds;
      if (checked) {
        if (current.includes(itemId)) return prev;
        if (prev.mode === 'simple' && current.length >= kit.pickLimit) {
          return prev;
        }
        return { ...prev, selectedStarterGearIds: [...current, itemId] };
      }
      return {
        ...prev,
        selectedStarterGearIds: current.filter((id) => id !== itemId),
      };
    });
  };

  const addCompendiumItem = (item: (typeof COMPENDIUM_PICKER_ITEMS)[number]) => {
    onUpdateState((prev) => {
      const existingIdx = prev.customInventory.findIndex(
        (c) => c.catalogId === item.id
      );
      if (existingIdx >= 0) {
        const next = [...prev.customInventory];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return { ...prev, customInventory: next };
      }
      const created: CustomInventoryEntry = {
        uid: `${item.id}-${Date.now()}`,
        catalogId: item.id,
        name: item.name[lang],
        category: item.category,
        quantity: 1,
        weight: item.weight,
        notes: item.summary,
      };
      return {
        ...prev,
        customInventory: [...prev.customInventory, created],
      };
    });
    setPickerOpen(false);
  };

  const updateCustomQty = (uid: string, delta: number) => {
    onUpdateState((prev) => {
      const next = prev.customInventory
        .map((entry) =>
          entry.uid === uid
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0);
      return { ...prev, customInventory: next };
    });
  };

  const filteredCompendiumItems =
    categoryFilter === 'all'
      ? COMPENDIUM_PICKER_ITEMS
      : COMPENDIUM_PICKER_ITEMS.filter((i) => i.category === categoryFilter);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Backpack className="size-5 text-primary" />
            <span>{copy.gear.title}</span>
          </CardTitle>
          <CardDescription>{copy.gear.subtitle}</CardDescription>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-right">
          <div className="text-[11px] text-muted-foreground">
            {copy.gear.weightLabel} / {copy.gear.encumbranceMax}
          </div>
          <div
            className={`font-mono text-lg font-bold tabular-nums ${
              isOverweight ? 'text-destructive' : 'text-primary'
            }`}
          >
            {carriedWeight} / {derived.encumbrance} {copy.gear.weightUnit}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {isOverweight && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            <AlertTriangle className="size-4 shrink-0" />
            <span>{copy.gear.overweightWarning}</span>
          </div>
        )}

        {/* Profession Starting Treasure (e.g. Noble 2d6 x 200 crowns) */}
        {profDef?.startingTreasure && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/35 bg-amber-500/10 p-3 text-xs">
            <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
              <Coins className="size-4 shrink-0" />
              <span>{copy.gear.startingTreasureTitle}</span>
            </div>
            <span className="font-mono font-semibold text-foreground">
              {profDef.startingTreasure[lang]}
            </span>
          </div>
        )}

        {/* Profession Starter Kit */}
        {kit && (
          <div className="flex flex-col gap-4">
            {kit.freeItems.length > 0 && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="mb-2 text-xs font-semibold text-primary">
                  {copy.gear.freeItemsTitle}
                </div>
                <ul className="flex flex-wrap gap-2">
                  {kit.freeItems.map((item) => (
                    <li
                      key={item.id}
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-background/80 px-2.5 py-1 text-xs font-medium"
                    >
                      <span>
                        {item.name[lang]} ({item.weight} {copy.gear.weightUnit})
                      </span>
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={item.name[lang]}
                        catalogItemId={item.catalogItemId}
                        weight={item.weight}
                        fallbackDescription={item.description?.[lang]}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  {copy.gear.starterPickTitle}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {state.selectedStarterGearIds.length}{' '}
                  {copy.gear.starterPickCount}{' '}
                  {state.mode === 'simple' ? kit.pickLimit : '∞'}
                </span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {kit.selectableItems.map((item) => {
                  const checked = state.selectedStarterGearIds.includes(
                    item.id
                  );
                  const limitReached =
                    state.mode === 'simple' &&
                    !checked &&
                    state.selectedStarterGearIds.length >= kit.pickLimit;

                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 text-sm transition-colors ${
                        checked
                          ? 'border-primary/50 bg-primary/5'
                          : 'border-border bg-card hover:bg-muted/30'
                      } ${limitReached ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Checkbox
                          checked={checked}
                          disabled={limitReached}
                          onCheckedChange={(val) =>
                            toggleStarterItem(item.id, Boolean(val))
                          }
                        />
                        <span className="truncate font-medium">
                          {item.name[lang]}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.weight} {copy.gear.weightUnit}
                        </span>
                        <ItemDescriptionTooltip
                          lang={lang}
                          name={item.name[lang]}
                          catalogItemId={item.catalogItemId}
                          weight={item.weight}
                          fallbackDescription={item.description?.[lang]}
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Witcher Alchemy Formulae */}
        {state.professionId === 'witcher' && (
          <>
            <Separator />
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FlaskConical className="size-4 text-primary" />
                <span>{copy.gear.witcherFormulaTitle}</span>
              </div>

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {/* 1 Decoction */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <Label className="text-xs">{copy.gear.decoctionLabel}</Label>
                    {state.witcherDecoctionFormulaId && (
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={
                          formulaOptions.decoctions.find(
                            (d) => d.id === state.witcherDecoctionFormulaId
                          )?.name[lang] ?? ''
                        }
                        catalogItemId={state.witcherDecoctionFormulaId}
                      />
                    )}
                  </div>
                  <Select
                    value={state.witcherDecoctionFormulaId}
                    onValueChange={(val) => {
                      if (!val) return;
                      onUpdateState((prev) => ({
                        ...prev,
                        witcherDecoctionFormulaId: val,
                      }));
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue>
                        {formulaOptions.decoctions.find(
                          (d) => d.id === state.witcherDecoctionFormulaId
                        )?.name[lang] ?? copy.gear.formulaPlaceholder}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                      {formulaOptions.decoctions.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name[lang]} (SD {d.dc})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 2 Oils */}
                {[0, 1].map((idx) => {
                  const selectedId = state.witcherOilFormulaIds[idx] ?? '';
                  const otherId = state.witcherOilFormulaIds[idx === 0 ? 1 : 0];
                  const selectedOil = formulaOptions.oils.find(
                    (o) => o.id === selectedId
                  );
                  return (
                    <div key={`oil-${idx}`} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <Label className="text-xs">
                          {copy.gear.oilLabel} #{idx + 1}
                        </Label>
                        {selectedOil && (
                          <ItemDescriptionTooltip
                            lang={lang}
                            name={selectedOil.name[lang]}
                            catalogItemId={selectedOil.id}
                          />
                        )}
                      </div>
                      <Select
                        value={selectedId}
                        onValueChange={(val) => {
                          if (!val) return;
                          onUpdateState((prev) => {
                            const nextOils = [
                              ...prev.witcherOilFormulaIds,
                            ] as [string, string];
                            nextOils[idx] = val;
                            return { ...prev, witcherOilFormulaIds: nextOils };
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue>
                            {selectedOil?.name[lang] ??
                              copy.gear.formulaPlaceholder}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          {formulaOptions.oils
                            .filter((o) => o.id !== otherId)
                            .map((o) => (
                              <SelectItem key={o.id} value={o.id}>
                                {o.name[lang]} (SD {o.dc})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}

                {/* 2 Potions */}
                {[0, 1].map((idx) => {
                  const selectedId = state.witcherPotionFormulaIds[idx] ?? '';
                  const otherId =
                    state.witcherPotionFormulaIds[idx === 0 ? 1 : 0];
                  const selectedPotion = formulaOptions.potions.find(
                    (p) => p.id === selectedId
                  );
                  return (
                    <div key={`pot-${idx}`} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <Label className="text-xs">
                          {copy.gear.potionLabel} #{idx + 1}
                        </Label>
                        {selectedPotion && (
                          <ItemDescriptionTooltip
                            lang={lang}
                            name={selectedPotion.name[lang]}
                            catalogItemId={selectedPotion.id}
                          />
                        )}
                      </div>
                      <Select
                        value={selectedId}
                        onValueChange={(val) => {
                          if (!val) return;
                          onUpdateState((prev) => {
                            const nextPotions = [
                              ...prev.witcherPotionFormulaIds,
                            ] as [string, string];
                            nextPotions[idx] = val;
                            return {
                              ...prev,
                              witcherPotionFormulaIds: nextPotions,
                            };
                          });
                        }}
                      >
                        <SelectTrigger className="h-8 w-full text-xs">
                          <SelectValue>
                            {selectedPotion?.name[lang] ??
                              copy.gear.formulaPlaceholder}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          {formulaOptions.potions
                            .filter((p) => p.id !== otherId)
                            .map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name[lang]} (SD {p.dc})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* Compendium Equipment Picker */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">
                {copy.gear.compendiumTitle}
              </h3>
              <p className="text-xs text-muted-foreground">
                {copy.gear.customInventoryTitle}
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setPickerOpen(true)}
            >
              <Search data-icon="inline-start" />
              <span>{copy.gear.compendiumSearchBtn}</span>
            </Button>
          </div>

          {state.customInventory.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              {copy.gear.customInventoryEmpty}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {state.customInventory.map((item) => (
                <div
                  key={item.uid}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <span className="truncate">{item.name}</span>
                      <ItemDescriptionTooltip
                        lang={lang}
                        name={item.name}
                        catalogItemId={item.catalogId}
                        weight={item.weight}
                        fallbackDescription={item.notes}
                      />
                    </div>
                    {item.notes && (
                      <div className="truncate text-xs text-muted-foreground">
                        {item.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {(item.weight * item.quantity).toFixed(1)}{' '}
                      {copy.gear.weightUnit}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateCustomQty(item.uid, -1)}
                    >
                      <Minus className="size-3.5" />
                    </Button>
                    <span className="w-6 text-center font-mono text-xs font-bold">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateCustomQty(item.uid, 1)}
                    >
                      <Plus className="size-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => updateCustomQty(item.uid, -item.quantity)}
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Personal Description */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cg-personal-description">
            {copy.gear.personalDescriptionTitle}
          </Label>
          <Textarea
            id="cg-personal-description"
            rows={4}
            value={state.personalDescription}
            onChange={(e) =>
              onUpdateState((prev) => ({
                ...prev,
                personalDescription: e.target.value,
              }))
            }
            placeholder={copy.gear.personalDescriptionPlaceholder}
          />
        </div>
      </CardContent>

      {/* Compendium Search Dialog */}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="p-0 sm:max-w-xl">
          <DialogHeader className="pt-4 pr-10 pl-4">
            <DialogTitle>{copy.gear.compendiumDialogTitle}</DialogTitle>
            <DialogDescription>
              {COMPENDIUM_PICKER_ITEMS.length} items
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-1 px-4">
            {(
              [
                ['all', copy.gear.compendiumCategoryAll],
                ['weapon', lang === 'fr' ? 'Armes' : 'Weapons'],
                ['armor', lang === 'fr' ? 'Armures' : 'Armor'],
                ['shield', lang === 'fr' ? 'Boucliers' : 'Shields'],
                ['gear', lang === 'fr' ? 'Équipement' : 'Gear'],
                ['formula', lang === 'fr' ? 'Formules/Schémas' : 'Formulae'],
                ['component', lang === 'fr' ? 'Composants' : 'Components'],
              ] as const
            ).map(([cat, label]) => (
              <Button
                key={cat}
                type="button"
                size="sm"
                variant={categoryFilter === cat ? 'default' : 'outline'}
                className="h-7 px-2 text-xs"
                onClick={() => setCategoryFilter(cat)}
              >
                {label}
              </Button>
            ))}
          </div>

          <Command className="rounded-t-none border-t border-border">
            <CommandInput placeholder={copy.gear.compendiumSearchPlaceholder} />
            <CommandList className="max-h-80">
              <CommandEmpty>{copy.gear.compendiumNoResults}</CommandEmpty>
              <CommandGroup>
                {filteredCompendiumItems.slice(0, 120).map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.name.fr} ${item.name.en} ${item.groupLabel[lang]} ${item.summary}`}
                    onSelect={() => addCompendiumItem(item)}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{item.name[lang]}</div>
                      <div className="truncate text-[11px] text-muted-foreground">
                        {item.groupLabel[lang]} · {item.summary}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {item.weight} {copy.gear.weightUnit}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
