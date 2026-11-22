import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  GeneratedBuilding,
  GeneratedShopItem,
  ModuleLanguage,
  ShopItemKind,
} from '../types';
import { generateUrbanId } from '../utils/urbanStorage';

interface EditBuildingDialogProps {
  building: GeneratedBuilding | null;
  open: boolean;
  lang: ModuleLanguage;
  onOpenChange: (open: boolean) => void;
  onSave: (updated: GeneratedBuilding) => void;
}

const SHOP_ITEM_KINDS: readonly ShopItemKind[] = [
  'article',
  'formula',
  'component',
  'weapon',
  'armor',
  'diagram',
  'tool',
  'general',
  'container',
  'clothing',
  'mountGear',
  'spellbook',
  'book',
  'food',
  'lodging',
  'contract',
];

export function EditBuildingDialog({
  building,
  open,
  lang,
  onOpenChange,
  onSave,
}: EditBuildingDialogProps) {
  const copy = getUrbanGeneratorCopy(lang);
  const ed = copy.editor;

  const [titleText, setTitleText] = useState('');
  const [tavernNameText, setTavernNameText] = useState('');
  const [lodgingNoteText, setLodgingNoteText] = useState('');
  const [roomPriceText, setRoomPriceText] = useState('');
  const [items, setItems] = useState<GeneratedShopItem[]>([]);

  // New entry draft
  const [newName, setNewName] = useState('');
  const [newKind, setNewKind] = useState<ShopItemKind>('general');
  const [newPriceText, setNewPriceText] = useState('');
  const [newMeta, setNewMeta] = useState('');

  useEffect(() => {
    if (!open || !building) return;
    setTitleText(building.title[lang]);
    setTavernNameText(building.tavernName?.[lang] ?? '');
    setLodgingNoteText(building.lodgingNote?.[lang] ?? '');
    setRoomPriceText(
      building.roomPrice !== undefined ? String(building.roomPrice) : ''
    );
    setItems(building.items.map((item) => ({ ...item })));
    setNewName('');
    setNewKind(building.buildingType === 'Notice_board' ? 'contract' : 'general');
    setNewPriceText('');
    setNewMeta('');
  }, [open, building, lang]);

  if (!building) return null;

  const handleUpdateItem = (
    idx: number,
    patch: Partial<GeneratedShopItem>
  ) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, ...patch } : it))
    );
  };

  const handleMoveItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const tmp = next[idx];
      next[idx] = next[target];
      next[target] = tmp;
      return next;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddItem = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    const parsedPrice = Number.parseInt(newPriceText.trim(), 10);
    const price =
      newPriceText.trim() === '' || Number.isNaN(parsedPrice)
        ? null
        : Math.max(0, parsedPrice);
    const metaTrimmed = newMeta.trim();

    const created: GeneratedShopItem = {
      id: generateUrbanId('item'),
      name: { en: trimmed, fr: trimmed },
      kind: newKind,
      price,
      ...(metaTrimmed ? { meta: { en: metaTrimmed, fr: metaTrimmed } } : {}),
    };
    setItems((prev) => [...prev, created]);
    setNewName('');
    setNewPriceText('');
    setNewMeta('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedTitle = titleText.trim() || building.title[lang];
    const cleanedTavern = tavernNameText.trim();
    const cleanedNote = lodgingNoteText.trim();
    const parsedRoomPrice = Number.parseInt(roomPriceText.trim(), 10);

    const updated: GeneratedBuilding = {
      ...building,
      title: {
        ...building.title,
        [lang]: cleanedTitle,
      },
      tavernName: cleanedTavern
        ? {
            en: building.tavernName?.en ?? cleanedTavern,
            fr: building.tavernName?.fr ?? cleanedTavern,
            [lang]: cleanedTavern,
          }
        : undefined,
      lodgingNote: cleanedNote
        ? {
            en: building.lodgingNote?.en ?? cleanedNote,
            fr: building.lodgingNote?.fr ?? cleanedNote,
            [lang]: cleanedNote,
          }
        : undefined,
      roomPrice:
        roomPriceText.trim() !== '' && !Number.isNaN(parsedRoomPrice)
          ? Math.max(0, parsedRoomPrice)
          : undefined,
      items,
    };

    onSave(updated);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{ed.editDialogTitle}</DialogTitle>
          <DialogDescription>{ed.editDialogDesc}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
            {/* Building Header Fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-bld-title" className="text-xs">
                  {ed.buildingTitleLabel}
                </Label>
                <Input
                  id="edit-bld-title"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-bld-tavern" className="text-xs">
                  {ed.tavernNameLabel}
                </Label>
                <Input
                  id="edit-bld-tavern"
                  value={tavernNameText}
                  onChange={(e) => setTavernNameText(e.target.value)}
                  placeholder={ed.tavernNamePlaceholder}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-bld-note" className="text-xs">
                  {ed.lodgingNoteLabel}
                </Label>
                <Input
                  id="edit-bld-note"
                  value={lodgingNoteText}
                  onChange={(e) => setLodgingNoteText(e.target.value)}
                  placeholder={ed.lodgingNotePlaceholder}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="edit-bld-room-price" className="text-xs">
                  {ed.roomPriceLabel}
                </Label>
                <Input
                  id="edit-bld-room-price"
                  type="number"
                  min={0}
                  value={roomPriceText}
                  onChange={(e) => setRoomPriceText(e.target.value)}
                  className="font-mono tabular-nums"
                  placeholder="—"
                />
              </div>
            </div>

            <Separator />

            {/* Add Custom Item Section */}
            <div className="flex flex-col gap-2.5 rounded-lg border border-border bg-muted/25 p-3">
              <span className="text-xs font-semibold text-foreground">
                {ed.addItemSectionTitle}
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-12">
                <div className="col-span-2 flex flex-col gap-1 sm:col-span-4">
                  <Label className="text-[11px] text-muted-foreground">
                    {ed.itemNameLabel}
                  </Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={ed.itemNamePlaceholder}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:col-span-3">
                  <Label className="text-[11px] text-muted-foreground">
                    {ed.itemKindLabel}
                  </Label>
                  <Select
                    value={newKind}
                    onValueChange={(v) => {
                      if (v) setNewKind(v as ShopItemKind);
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue>{copy.itemKinds[newKind]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {SHOP_ITEM_KINDS.map((k) => (
                        <SelectItem key={k} value={k}>
                          {copy.itemKinds[k]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <Label className="text-[11px] text-muted-foreground">
                    {ed.itemPriceLabel}
                  </Label>
                  <Input
                    type="number"
                    min={0}
                    value={newPriceText}
                    onChange={(e) => setNewPriceText(e.target.value)}
                    placeholder={ed.itemPricePlaceholder}
                    className="h-8 font-mono text-xs tabular-nums"
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-1 sm:col-span-3">
                  <Label className="text-[11px] text-muted-foreground">
                    {ed.itemMetaLabel}
                  </Label>
                  <div className="flex gap-1.5">
                    <Input
                      value={newMeta}
                      onChange={(e) => setNewMeta(e.target.value)}
                      placeholder={ed.itemMetaPlaceholder}
                      className="h-8 flex-1 text-xs"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={handleAddItem}
                      disabled={!newName.trim()}
                      className="h-8 shrink-0"
                    >
                      <Plus className="size-3.5" />
                      <span className="sr-only sm:not-sr-only">
                        {ed.addItemBtn}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Items Editor List */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">
                  {ed.itemsSectionTitle}
                </span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {items.length} {copy.output.itemsCountLabel}
                </span>
              </div>

              {items.length === 0 ? (
                <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                  {ed.noItemsHint}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 items-center gap-2 rounded-md border border-border bg-card p-2 sm:grid-cols-12"
                    >
                      <div className="col-span-2 sm:col-span-4">
                        <Input
                          value={item.name[lang]}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateItem(idx, {
                              name: { ...item.name, [lang]: val },
                            });
                          }}
                          aria-label={ed.itemNameLabel}
                          className="h-8 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <Select
                          value={item.kind}
                          onValueChange={(v) => {
                            if (v) {
                              handleUpdateItem(idx, { kind: v as ShopItemKind });
                            }
                          }}
                        >
                          <SelectTrigger className="h-8 w-full text-xs">
                            <SelectValue>{copy.itemKinds[item.kind]}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {SHOP_ITEM_KINDS.map((k) => (
                              <SelectItem key={k} value={k}>
                                {copy.itemKinds[k]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="sm:col-span-2">
                        <Input
                          type="number"
                          min={0}
                          value={item.price === null ? '' : String(item.price)}
                          onChange={(e) => {
                            const raw = e.target.value.trim();
                            if (raw === '') {
                              handleUpdateItem(idx, { price: null });
                            } else {
                              const num = Number.parseInt(raw, 10);
                              handleUpdateItem(idx, {
                                price: Number.isNaN(num) ? null : Math.max(0, num),
                              });
                            }
                          }}
                          placeholder={ed.itemPricePlaceholder}
                          aria-label={ed.itemPriceLabel}
                          className="h-8 font-mono text-xs tabular-nums"
                        />
                      </div>

                      <div className="col-span-2 flex items-center gap-1 sm:col-span-3">
                        <Input
                          value={item.meta?.[lang] ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            handleUpdateItem(idx, {
                              meta: val.trim()
                                ? {
                                    en: item.meta?.en ?? val,
                                    fr: item.meta?.fr ?? val,
                                    [lang]: val,
                                  }
                                : undefined,
                            });
                          }}
                          placeholder={ed.itemMetaLabel}
                          aria-label={ed.itemMetaLabel}
                          className="h-8 min-w-0 flex-1 text-xs"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          disabled={idx === 0}
                          onClick={() => handleMoveItem(idx, -1)}
                          title={ed.moveUpTooltip}
                          aria-label={ed.moveUpTooltip}
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          disabled={idx === items.length - 1}
                          onClick={() => handleMoveItem(idx, 1)}
                          title={ed.moveDownTooltip}
                          aria-label={ed.moveDownTooltip}
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleRemoveItem(idx)}
                          title={ed.removeItemTooltip}
                          aria-label={ed.removeItemTooltip}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {ed.cancelBtn}
            </Button>
            <Button type="submit">{ed.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
