import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, Search, Trash2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ALL_BESTIARY_ENTRIES,
  type BestiaryEntry,
} from '@/src/data/bestiary';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatantRole,
  GroupMemberEntry,
  ModuleLanguage,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '../types';
import { generateId } from '../utils/combatEngine';
import { describeGroupMember } from '../utils/hubStorage';

interface EditCombatGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialGroup: SavedCombatGroup | null;
  savedCharacters: readonly SavedPartyCharacter[];
  customNpcs?: readonly SavedCustomNpc[];
  customMonsters?: readonly SavedCustomMonster[];
  lang: ModuleLanguage;
  onSave: (group: SavedCombatGroup) => void;
}

/**
 * Shadcn Dialog allowing the GM to build or edit a reusable combat group
 * mixing saved Hub PCs, Bestiary monsters/humanoids (with variants & quantity),
 * and quick custom combatants.
 */
export function EditCombatGroupDialog({
  open,
  onOpenChange,
  initialGroup,
  savedCharacters,
  customNpcs = [],
  customMonsters = [],
  lang,
  onSave,
}: EditCombatGroupDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const g = copy.hub.groupDialog;
  const isEditing = initialGroup !== null;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [groupInitiative, setGroupInitiative] = useState(true);
  const [members, setMembers] = useState<GroupMemberEntry[]>([]);

  // Bestiary picker state
  const [bestiaryQuery, setBestiaryQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<BestiaryEntry | null>(
    ALL_BESTIARY_ENTRIES[0] ?? null
  );
  const [variantIdx, setVariantIdx] = useState(0);
  const [bestiaryQty, setBestiaryQty] = useState(1);

  // Quick custom member state
  const [customName, setCustomName] = useState('');
  const [customRole, setCustomRole] = useState<CombatantRole>('enemy');
  const [customQty, setCustomQty] = useState(1);
  const [customHp, setCustomHp] = useState(25);
  const [customArmor, setCustomArmor] = useState(6);
  const [customRef, setCustomRef] = useState(6);

  useEffect(() => {
    if (!open) return;
    if (initialGroup) {
      setName(initialGroup.name);
      setDescription(initialGroup.description);
      setGroupInitiative(initialGroup.groupInitiative);
      setMembers(initialGroup.members.map((m) => ({ ...m })));
    } else {
      setName('');
      setDescription('');
      setGroupInitiative(true);
      setMembers([]);
    }
    setBestiaryQuery('');
    setVariantIdx(0);
    setBestiaryQty(1);
    setCustomName('');
    setCustomQty(1);
  }, [open, initialGroup]);

  const filteredBestiary = useMemo(() => {
    const q = bestiaryQuery.trim().toLowerCase();
    return ALL_BESTIARY_ENTRIES.filter((entry) => {
      if (!q) return true;
      return (
        entry.name.fr.toLowerCase().includes(q) ||
        entry.name.en.toLowerCase().includes(q) ||
        entry.typeId.toLowerCase().includes(q)
      );
    });
  }, [bestiaryQuery]);

  const handleToggleHubPc = (pcId: string) => {
    const exists = members.some(
      (m) => m.kind === 'saved-pc' && m.pcId === pcId
    );
    if (exists) {
      setMembers((prev) =>
        prev.filter((m) => !(m.kind === 'saved-pc' && m.pcId === pcId))
      );
    } else {
      setMembers((prev) => [
        ...prev,
        { id: generateId('gm'), kind: 'saved-pc', pcId },
      ]);
    }
  };

  const handleAddBestiaryMember = () => {
    if (!selectedEntry) return;
    const qty = Math.max(1, Math.min(12, bestiaryQty));
    const hasVariants = (selectedEntry.combat?.variants?.length ?? 0) > 0;
    setMembers((prev) => [
      ...prev,
      {
        id: generateId('gm'),
        kind: 'bestiary',
        entryId: selectedEntry.id,
        variantIndex: hasVariants ? variantIdx : undefined,
        quantity: qty,
      },
    ]);
  };

  const handleAddCustomMember = () => {
    if (!customName.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: generateId('gm'),
        kind: 'custom',
        name: customName.trim(),
        role: customRole,
        anatomy: 'human',
        quantity: Math.max(1, Math.min(12, customQty)),
        maxHp: Math.max(1, customHp),
        maxEnd: Math.max(1, customHp),
        armorSp: Math.max(0, customArmor),
        stats: {
          ref: customRef,
          dex: customRef,
          cor: 6,
          vit: 6,
          int: 5,
          vol: 5,
          rec: 6,
          etou: 6,
          vig: 0,
        },
        resistantToNonSilver: false,
      },
    ]);
    setCustomName('');
    setCustomQty(1);
  };

  const handleAdjustMemberQty = (memberId: string, delta: number) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId || m.kind === 'saved-pc') return m;
        return {
          ...m,
          quantity: Math.max(1, Math.min(12, m.quantity + delta)),
        };
      })
    );
  };

  const handleRemoveMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved: SavedCombatGroup = {
      id: initialGroup?.id ?? generateId('grp'),
      name:
        name.trim() ||
        (lang === 'fr' ? 'Nouveau groupe' : 'New Group'),
      description: description.trim(),
      groupInitiative,
      members,
      updatedAt: new Date().toISOString(),
    };
    onSave(saved);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? g.editTitle : g.createTitle}</DialogTitle>
          <DialogDescription>{g.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 md:max-h-[68dvh] md:grid-cols-12 md:overflow-y-auto md:pr-1">
            {/* Left Column: Metadata + Current Members */}
            <div className="flex flex-col gap-3 md:col-span-5">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{g.nameLabel}</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={g.namePlaceholder}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{g.descLabel}</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={g.descPlaceholder}
                />
              </div>

              <div className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
                <Label
                  htmlFor="group-dialog-init-switch"
                  className="cursor-pointer text-xs"
                >
                  {g.groupInitSwitch}
                </Label>
                <Switch
                  id="group-dialog-init-switch"
                  checked={groupInitiative}
                  onCheckedChange={setGroupInitiative}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {g.membersTitle}
                </p>
                <Badge variant="outline" className="font-mono text-xs">
                  {members.reduce(
                    (acc, m) => acc + (m.kind === 'saved-pc' ? 1 : m.quantity),
                    0
                  )}
                </Badge>
              </div>

              {members.length === 0 ? (
                <p className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
                  {g.noMembers}
                </p>
              ) : (
                <ScrollArea className="h-56 rounded-md border border-border p-2">
                  <div className="flex flex-col gap-1.5">
                    {members.map((m) => {
                      const info = describeGroupMember(
                        m,
                        savedCharacters,
                        lang,
                        customNpcs,
                        customMonsters
                      );
                      return (
                        <div
                          key={m.id}
                          className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs"
                        >
                          <div className="flex min-w-0 items-center gap-1.5">
                            <Badge
                              variant={info.missing ? 'destructive' : 'secondary'}
                              className="shrink-0 font-mono text-[10px]"
                            >
                              {info.badge}
                            </Badge>
                            <span className="truncate font-medium">
                              {info.label}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-1">
                            {m.kind !== 'saved-pc' && (
                              <>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon-xs"
                                  onClick={() => handleAdjustMemberQty(m.id, -1)}
                                >
                                  <Minus className="size-3" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon-xs"
                                  onClick={() => handleAdjustMemberQty(m.id, 1)}
                                >
                                  <Plus className="size-3" />
                                </Button>
                              </>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => handleRemoveMember(m.id)}
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>

            {/* Right Column: Member Pickers */}
            <div className="flex flex-col gap-3 rounded-lg border border-border p-3 md:col-span-7">
              <Tabs defaultValue="pcs" className="w-full gap-3">
                <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-0">
                  <TabsTrigger value="pcs">{g.addFromHubPcsTitle}</TabsTrigger>
                  <TabsTrigger value="custom-hub">
                    {lang === 'fr' ? 'PNJ & Monstres' : 'NPCs & Monsters'}
                  </TabsTrigger>
                  <TabsTrigger value="bestiary">
                    {g.addFromBestiaryTitle}
                  </TabsTrigger>
                  <TabsTrigger value="custom">{g.addCustomTitle}</TabsTrigger>
                </TabsList>

                {/* Picker 1: Hub PCs */}
                <TabsContent value="pcs">
                  {savedCharacters.length === 0 ? (
                    <p className="py-8 text-center text-xs text-muted-foreground">
                      {g.noSavedPcsHint}
                    </p>
                  ) : (
                    <ScrollArea className="h-64 pr-2">
                      <div className="flex flex-col gap-1.5">
                        {savedCharacters.map((pc) => {
                          const included = members.some(
                            (m) => m.kind === 'saved-pc' && m.pcId === pc.id
                          );
                          return (
                            <Button
                              key={pc.id}
                              type="button"
                              variant={included ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleToggleHubPc(pc.id)}
                              className="h-auto justify-between px-3 py-2 text-left"
                            >
                              <div className="flex items-center gap-2">
                                <Users className="size-4 shrink-0" />
                                <div className="flex flex-col">
                                  <span className="font-medium">{pc.name}</span>
                                  <span
                                    className={`font-mono text-[10px] ${
                                      included
                                        ? 'text-primary-foreground/80'
                                        : 'text-muted-foreground'
                                    }`}
                                  >
                                    PS {pc.maxHp} · END {pc.maxEnd} · RÉF{' '}
                                    {pc.stats.ref}
                                  </span>
                                </div>
                              </div>
                              <Badge variant={included ? 'secondary' : 'outline'}>
                                {included ? '✓' : '+'}
                              </Badge>
                            </Button>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                {/* Picker 1b: Shared Hub Custom NPCs & Custom Monsters */}
                <TabsContent value="custom-hub">
                  {customNpcs.length === 0 && customMonsters.length === 0 ? (
                    <p className="py-8 text-center text-xs text-muted-foreground">
                      {lang === 'fr'
                        ? 'Aucun PNJ ni monstre personnalisé dans le Hub MJ pour le moment.'
                        : 'No custom NPCs or monsters saved in the GM Hub yet.'}
                    </p>
                  ) : (
                    <ScrollArea className="h-64 pr-2">
                      <div className="flex flex-col gap-2">
                        {customNpcs.map((npc) => (
                          <div
                            key={npc.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-xs"
                          >
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">
                                {npc.name}
                              </p>
                              <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                                {npc.professionLabel} · PS {npc.maxHp} · Att{' '}
                                {npc.attackBase} · Déf {npc.defenseBase}
                              </p>
                            </div>
                            <Button
                              type="button"
                              size="xs"
                              variant="outline"
                              onClick={() =>
                                setMembers((prev) => [
                                  ...prev,
                                  {
                                    id: generateId('gm'),
                                    kind: 'custom-npc',
                                    npcId: npc.id,
                                    quantity: 1,
                                  },
                                ])
                              }
                            >
                              <Plus data-icon="inline-start" />
                              <span>{g.addBestiaryBtn}</span>
                            </Button>
                          </div>
                        ))}

                        {customMonsters.map((mon) => (
                          <div
                            key={mon.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 text-xs"
                          >
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">
                                {mon.name}
                              </p>
                              <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                                {mon.threatLabel || mon.typeId} · PS {mon.maxHp} · PA{' '}
                                {mon.armorSp} · Att {mon.attackBase}
                              </p>
                            </div>
                            <Button
                              type="button"
                              size="xs"
                              variant="outline"
                              onClick={() =>
                                setMembers((prev) => [
                                  ...prev,
                                  {
                                    id: generateId('gm'),
                                    kind: 'custom-monster',
                                    monsterId: mon.id,
                                    quantity: 1,
                                  },
                                ])
                              }
                            >
                              <Plus data-icon="inline-start" />
                              <span>{g.addBestiaryBtn}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>

                {/* Picker 2: Bestiary */}
                <TabsContent value="bestiary" className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Search
                        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <Input
                        value={bestiaryQuery}
                        onChange={(e) => setBestiaryQuery(e.target.value)}
                        placeholder={g.searchBestiaryPlaceholder}
                        className="pl-8"
                      />
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                      {filteredBestiary.length} / {ALL_BESTIARY_ENTRIES.length}
                    </span>
                  </div>

                  <ScrollArea className="h-44 rounded-md border border-border p-1.5">
                    <div className="flex flex-col gap-1">
                      {filteredBestiary.map((entry) => {
                        const isSelected = selectedEntry?.id === entry.id;
                        return (
                          <Button
                            key={entry.id}
                            type="button"
                            variant={isSelected ? 'default' : 'ghost'}
                            size="xs"
                            onClick={() => {
                              setSelectedEntry(entry);
                              setVariantIdx(0);
                            }}
                            className="h-auto justify-between px-2 py-1.5 text-left"
                          >
                            <span className="truncate font-medium">
                              {entry.name[lang]}
                            </span>
                            <span className="text-[10px] opacity-75">
                              {entry.threat[lang]}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {selectedEntry && (
                    <div className="flex flex-wrap items-end gap-2 rounded-md border border-border bg-muted/20 p-2.5">
                      {selectedEntry.combat?.variants &&
                        selectedEntry.combat.variants.length > 0 && (
                          <div className="flex min-w-36 flex-1 flex-col gap-1">
                            <Label className="text-[11px]">
                              {copy.addDialog.variantLabel}
                            </Label>
                            <Select
                              value={String(variantIdx)}
                              onValueChange={(v) =>
                                setVariantIdx(Number(v ?? '0') || 0)
                              }
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {selectedEntry.combat.variants.map((v, i) => (
                                  <SelectItem key={i} value={String(i)}>
                                    {v.label[lang]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                      <div className="flex w-20 flex-col gap-1">
                        <Label className="text-[11px]">
                          {copy.addDialog.quantityLabel}
                        </Label>
                        <Input
                          type="number"
                          min={1}
                          max={12}
                          value={bestiaryQty}
                          onChange={(e) =>
                            setBestiaryQty(
                              Math.max(1, Math.min(12, Number(e.target.value) || 1))
                            )
                          }
                          className="h-8"
                        />
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddBestiaryMember}
                      >
                        <Plus data-icon="inline-start" />
                        <span>{g.addBestiaryBtn}</span>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Picker 3: Quick Custom Member */}
                <TabsContent value="custom" className="flex flex-col gap-3">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.manual.nameLabel}
                      </Label>
                      <Input
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder={g.customNamePlaceholder}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.manual.roleLabel}
                      </Label>
                      <Select
                        value={customRole}
                        onValueChange={(v) => {
                          if (
                            v === 'pc' ||
                            v === 'ally' ||
                            v === 'enemy' ||
                            v === 'monster'
                          ) {
                            setCustomRole(v);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enemy">{copy.roles.enemy}</SelectItem>
                          <SelectItem value="monster">
                            {copy.roles.monster}
                          </SelectItem>
                          <SelectItem value="ally">{copy.roles.ally}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.quantityLabel}
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        max={12}
                        value={customQty}
                        onChange={(e) =>
                          setCustomQty(Math.max(1, Number(e.target.value) || 1))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.manual.hpLabel}
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        value={customHp}
                        onChange={(e) =>
                          setCustomHp(Math.max(1, Number(e.target.value) || 1))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.manual.armorLabel}
                      </Label>
                      <Input
                        type="number"
                        min={0}
                        value={customArmor}
                        onChange={(e) =>
                          setCustomArmor(Math.max(0, Number(e.target.value) || 0))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">
                        {copy.addDialog.manual.refLabel}
                      </Label>
                      <Input
                        type="number"
                        min={1}
                        value={customRef}
                        onChange={(e) =>
                          setCustomRef(Math.max(1, Number(e.target.value) || 1))
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddCustomMember}
                      disabled={!customName.trim()}
                    >
                      <Plus data-icon="inline-start" />
                      <span>{g.addBestiaryBtn}</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {g.cancelBtn}
            </Button>
            <Button type="submit">{g.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
