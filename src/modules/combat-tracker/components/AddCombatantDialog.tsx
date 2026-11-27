import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Search, Upload, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ALL_BESTIARY_ENTRIES,
  type BestiaryEntry,
  type BestiaryKind,
} from '@/src/data/bestiary';
import { parseImportedCharacterJson } from '@/src/modules/character-generator/utils/characterCalculations';
import { ARCHETYPE_PRESETS } from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  AnatomyType,
  CombatHubState,
  Combatant,
  CombatantRole,
  ModuleLanguage,
  SavedCombatGroup,
  SavedPartyCharacter,
} from '../types';
import {
  createCombatantFromBestiary,
  createCombatantFromCharacterSheet,
  createDefaultArmor,
  generateId,
  rollDie,
} from '../utils/combatEngine';
import {
  combatantFromCustomMonster,
  combatantFromCustomNpc,
  describeGroupMember,
} from '../utils/hubStorage';

interface AddCombatantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  hubState: CombatHubState;
  onAddCombatants: (combatants: Combatant[], summaryLabel: string) => void;
  onDeployHubPc: (pc: SavedPartyCharacter) => void;
  onDeployHubGroup: (group: SavedCombatGroup, replaceBoard: boolean) => void;
}

/**
 * Modal dialog supporting 4 fast workflows for adding combatants:
 * 1. GM Hub (saved PCs & reusable encounter groups)
 * 2. Canonical Bestiary search (official & extended entries with caste variants & group initiative)
 * 3. Character Generator JSON import & Archetype quick-starts
 * 4. Manual custom combatant builder
 */
export function AddCombatantDialog({
  open,
  onOpenChange,
  lang,
  hubState,
  onAddCombatants,
  onDeployHubPc,
  onDeployHubGroup,
}: AddCombatantDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const d = copy.addDialog;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasHubEntries =
    hubState.groups.length > 0 ||
    hubState.characters.length > 0 ||
    hubState.customNpcs.length > 0 ||
    hubState.customMonsters.length > 0;
  const [activeTab, setActiveTab] = useState<'hub' | 'bestiary' | 'party' | 'manual'>(
    hasHubEntries ? 'hub' : 'bestiary'
  );

  useEffect(() => {
    if (open) {
      setActiveTab(
        hubState.groups.length > 0 ||
          hubState.characters.length > 0 ||
          hubState.customNpcs.length > 0 ||
          hubState.customMonsters.length > 0
          ? 'hub'
          : 'bestiary'
      );
    }
  }, [
    open,
    hubState.groups.length,
    hubState.characters.length,
    hubState.customNpcs.length,
    hubState.customMonsters.length,
  ]);

  // Bestiary tab state
  const [searchQuery, setSearchQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<'all' | BestiaryKind>('all');
  const [selectedEntry, setSelectedEntry] = useState<BestiaryEntry | null>(
    ALL_BESTIARY_ENTRIES[0] ?? null
  );
  const [variantIdx, setVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [groupInitiative, setGroupInitiative] = useState(true);
  const [roleOverride, setRoleOverride] = useState<'auto' | CombatantRole>('auto');

  // Manual tab state
  const [manualName, setManualName] = useState('');
  const [manualRole, setManualRole] = useState<CombatantRole>('enemy');
  const [manualAnatomy, setManualAnatomy] = useState<AnatomyType>('human');
  const [manualHp, setManualHp] = useState(30);
  const [manualEnd, setManualEnd] = useState(30);
  const [manualArmor, setManualArmor] = useState(8);
  const [manualRef, setManualRef] = useState(6);
  const [manualDex, setManualDex] = useState(6);
  const [manualCor, setManualCor] = useState(6);
  const [manualVit, setManualVit] = useState(6);
  const [manualInt, setManualInt] = useState(5);
  const [manualVol, setManualVol] = useState(5);
  const [manualRec, setManualRec] = useState(6);
  const [manualEtou, setManualEtou] = useState(6);
  const [manualNonSilver, setManualNonSilver] = useState(false);

  // Hub batch deploy controls for saved Custom NPCs & Monsters
  const [hubBatchQty, setHubBatchQty] = useState(1);
  const [hubGroupInit, setHubGroupInit] = useState(true);

  const filteredBestiary = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_BESTIARY_ENTRIES.filter((entry) => {
      if (kindFilter !== 'all' && entry.kind !== kindFilter) return false;
      if (!q) return true;
      return (
        entry.name.fr.toLowerCase().includes(q) ||
        entry.name.en.toLowerCase().includes(q) ||
        entry.typeId.toLowerCase().includes(q)
      );
    });
  }, [kindFilter, searchQuery]);

  const handleAddFromBestiary = () => {
    if (!selectedEntry) return;
    const count = Math.max(1, Math.min(8, quantity));
    const sharedInitRoll = groupInitiative ? rollDie(10) : undefined;
    const variants = selectedEntry.combat?.variants;
    const chosenVariant =
      variants && variants.length > 0 ? variants[variantIdx] ?? variants[0] : undefined;

    const batch: Combatant[] = [];
    for (let i = 0; i < count; i += 1) {
      const baseName = chosenVariant
        ? `${selectedEntry.name[lang]} (${chosenVariant.label[lang]})`
        : selectedEntry.name[lang];
      const indexedName = count > 1 ? `${baseName} #${i + 1}` : baseName;
      batch.push(
        createCombatantFromBestiary(selectedEntry, {
          lang,
          variant: chosenVariant,
          roleOverride: roleOverride === 'auto' ? undefined : roleOverride,
          customName: indexedName,
          fixedInitRoll: sharedInitRoll,
        })
      );
    }

    onAddCombatants(batch, selectedEntry.name[lang]);
    toast.success(d.addedToast(selectedEntry.name[lang], count));
    onOpenChange(false);
  };

  const handleAddPreset = (presetId: string) => {
    const preset = ARCHETYPE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const initRoll = rollDie(10);
    const combatant: Combatant = {
      id: generateId('cmb'),
      name: preset.name[lang],
      role: preset.role,
      anatomy: preset.anatomy,
      initiative: preset.stats.ref + initRoll,
      initiativeRoll: initRoll,
      tieBreaker: rollDie(10),
      quickDraw: false,
      delayed: false,
      actedThisRound: false,
      defensesUsedThisRound: 0,
      activeDodge: false,
      aimStacks: 0,
      hp: preset.hp,
      maxHp: preset.hp,
      end: preset.end,
      maxEnd: preset.end,
      nonLethalDmg: 0,
      adrenalineDice: 0,
      tempHp: 0,
      deathSaveFailures: 0,
      deathSaveRounds: 0,
      isDead: false,
      stats: { ...preset.stats },
      armor: createDefaultArmor(preset.armorSp, preset.anatomy),
      resistantToNonSilver: false,
      vulnerabilities: [],
      resistances: [],
      immunities: [],
      abilities: [],
      weapons: preset.weapons.map((w) => ({
        id: generateId('wpn'),
        name: w.name[lang],
        damage: w.damage,
        damageType: w.damageType,
        isSilver: w.isSilver,
        penetration: w.penetration,
        reliability: w.reliability,
        maxReliability: w.reliability,
        attacksPerRound: w.attacksPerRound,
        effectNote: w.effectNote,
      })),
      conditions: [],
      criticalWounds: [],
      notes: '',
    };

    onAddCombatants([combatant], combatant.name);
    toast.success(d.addedToast(combatant.name, 1));
    onOpenChange(false);
  };

  const handleJsonFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseImportedCharacterJson(text);
      if (!parsed) {
        toast.error(d.importJsonError);
        return;
      }
      const combatant = createCombatantFromCharacterSheet(parsed, lang);
      onAddCombatants([combatant], combatant.name);
      toast.success(d.addedToast(combatant.name, 1));
      onOpenChange(false);
    } catch {
      toast.error(d.importJsonError);
    }
  };

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = manualName.trim() || copy.roles[manualRole];
    const initRoll = rollDie(10);
    const combatant: Combatant = {
      id: generateId('cmb'),
      name: cleanName,
      role: manualRole,
      anatomy: manualAnatomy,
      initiative: manualRef + initRoll,
      initiativeRoll: initRoll,
      tieBreaker: rollDie(10),
      quickDraw: false,
      delayed: false,
      actedThisRound: false,
      defensesUsedThisRound: 0,
      activeDodge: false,
      aimStacks: 0,
      hp: manualHp,
      maxHp: manualHp,
      end: manualEnd,
      maxEnd: manualEnd,
      nonLethalDmg: 0,
      adrenalineDice: 0,
      tempHp: 0,
      deathSaveFailures: 0,
      deathSaveRounds: 0,
      isDead: false,
      stats: {
        ref: manualRef,
        dex: manualDex,
        cor: manualCor,
        vit: manualVit,
        int: manualInt,
        vol: manualVol,
        rec: manualRec,
        etou: manualEtou,
        vig: 0,
      },
      armor: createDefaultArmor(manualArmor, manualAnatomy),
      resistantToNonSilver: manualNonSilver,
      vulnerabilities: [],
      resistances: [],
      immunities: [],
      abilities: [],
      weapons: [],
      conditions: [],
      criticalWounds: [],
      notes: '',
    };

    onAddCombatants([combatant], combatant.name);
    toast.success(d.addedToast(combatant.name, 1));
    setManualName('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{d.title}</DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => {
            if (
              v === 'hub' ||
              v === 'bestiary' ||
              v === 'party' ||
              v === 'manual'
            ) {
              setActiveTab(v);
            }
          }}
          className="w-full gap-4"
        >
          <TabsList className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4 sm:gap-0">
            <TabsTrigger value="hub">{d.tabs.hub}</TabsTrigger>
            <TabsTrigger value="bestiary">{d.tabs.bestiary}</TabsTrigger>
            <TabsTrigger value="party">{d.tabs.party}</TabsTrigger>
            <TabsTrigger value="manual">{d.tabs.manual}</TabsTrigger>
          </TabsList>

          {/* TAB 0: GM Hub (Saved Groups & PCs) */}
          <TabsContent value="hub" className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Saved Groups */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {copy.hub.groupsTitle}
                </p>
                {hubState.groups.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    {copy.hub.emptyGroupsTitle}
                  </p>
                ) : (
                  <ScrollArea className="h-60 rounded-md border border-border p-2">
                    <div className="flex flex-col gap-2">
                      {hubState.groups.map((group) => (
                        <div
                          key={group.id}
                          className="flex flex-col gap-2 rounded-md border border-border bg-card p-2.5 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-foreground">
                              {group.name}
                            </span>
                            <Button
                              type="button"
                              size="xs"
                              onClick={() => {
                                onDeployHubGroup(group, false);
                                onOpenChange(false);
                              }}
                              disabled={group.members.length === 0}
                            >
                              <Plus data-icon="inline-start" />
                              <span>{copy.hub.addGroupToCombatBtn}</span>
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {group.members.map((m) => {
                              const info = describeGroupMember(
                                m,
                                hubState.characters,
                                lang,
                                hubState.customNpcs,
                                hubState.customMonsters
                              );
                              return (
                                <Badge
                                  key={m.id}
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  {info.badge} · {info.label}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>

              {/* Saved PCs, Custom NPCs & Custom Monsters */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {lang === 'fr'
                    ? 'PJ, PNJ & Monstres du Hub'
                    : 'Hub PCs, NPCs & Monsters'}
                </p>
                {hubState.characters.length === 0 &&
                hubState.customNpcs.length === 0 &&
                hubState.customMonsters.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                    {lang === 'fr'
                      ? 'Aucun PJ, PNJ ou monstre enregistré dans le Hub.'
                      : 'No PCs, NPCs, or monsters saved in the Hub.'}
                  </p>
                ) : (
                  <ScrollArea className="h-60 rounded-md border border-border p-2">
                    <div className="flex flex-col gap-1.5">
                      {hubState.characters.map((pc) => (
                        <Button
                          key={pc.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onDeployHubPc(pc);
                            onOpenChange(false);
                          }}
                          className="h-auto justify-between px-3 py-2 text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Users className="size-4 text-primary" />
                            <div className="flex flex-col">
                              <span className="font-medium">{pc.name}</span>
                              <span className="font-mono text-[10px] text-muted-foreground">
                                PJ · PS {pc.maxHp} · END {pc.maxEnd} · RÉF{' '}
                                {pc.stats.ref}
                              </span>
                            </div>
                          </div>
                          <Plus className="size-4 shrink-0" />
                        </Button>
                      ))}

                      {hubState.customNpcs.map((npc) => (
                        <Button
                          key={npc.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const count = Math.max(1, Math.min(8, hubBatchQty));
                            const sharedRoll =
                              count > 1 && hubGroupInit ? rollDie(10) : undefined;
                            const batch = Array.from({ length: count }, (_, idx) =>
                              combatantFromCustomNpc(npc, {
                                customName:
                                  count > 1
                                    ? `${npc.name} #${idx + 1}`
                                    : npc.name,
                                fixedInitRoll: sharedRoll,
                              })
                            );
                            onAddCombatants(batch, npc.name);
                            toast.success(d.addedToast(npc.name, count));
                            onOpenChange(false);
                          }}
                          className="h-auto justify-between px-3 py-2 text-left"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{npc.name}</span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {npc.professionLabel} · PS {npc.maxHp} · PA{' '}
                              {npc.armor.torso ?? 0}
                            </span>
                          </div>
                          <Plus className="size-4 shrink-0" />
                        </Button>
                      ))}

                      {hubState.customMonsters.map((mon) => (
                        <Button
                          key={mon.id}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const count = Math.max(1, Math.min(8, hubBatchQty));
                            const sharedRoll =
                              count > 1 && hubGroupInit ? rollDie(10) : undefined;
                            const batch = Array.from({ length: count }, (_, idx) =>
                              combatantFromCustomMonster(mon, {
                                customName:
                                  count > 1
                                    ? `${mon.name} #${idx + 1}`
                                    : mon.name,
                                fixedInitRoll: sharedRoll,
                              })
                            );
                            onAddCombatants(batch, mon.name);
                            toast.success(d.addedToast(mon.name, count));
                            onOpenChange(false);
                          }}
                          className="h-auto justify-between px-3 py-2 text-left"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{mon.name}</span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {mon.threatLabel || mon.typeId} · PS {mon.maxHp} · PA{' '}
                              {mon.armorSp}
                            </span>
                          </div>
                          <Plus className="size-4 shrink-0" />
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                )}

                {(hubState.customNpcs.length > 0 ||
                  hubState.customMonsters.length > 0) && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-muted/20 px-2.5 py-1.5 text-xs">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="hub-batch-qty"
                        className="text-xs text-muted-foreground"
                      >
                        {lang === 'fr' ? 'Qté PNJ/Monstre' : 'NPC/Monster Qty'}
                      </Label>
                      <Input
                        id="hub-batch-qty"
                        type="number"
                        min={1}
                        max={8}
                        value={hubBatchQty}
                        onChange={(e) =>
                          setHubBatchQty(
                            Math.max(
                              1,
                              Math.min(8, Number.parseInt(e.target.value, 10) || 1)
                            )
                          )
                        }
                        className="h-7 w-14 font-mono text-xs tabular-nums"
                      />
                    </div>
                    {hubBatchQty > 1 && (
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="hub-group-init-switch"
                          className="cursor-pointer text-[11px] text-muted-foreground"
                        >
                          {hubGroupInit ? d.initGroup : d.initIndividual}
                        </Label>
                        <Switch
                          id="hub-group-init-switch"
                          checked={hubGroupInit}
                          onCheckedChange={setHubGroupInit}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 1: Bestiary Search & Batch Import */}
          <TabsContent value="bestiary" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-52 flex-1">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={d.searchBestiaryPlaceholder}
                  className="pl-8"
                />
              </div>
              <Select
                value={kindFilter}
                onValueChange={(v) => {
                  if (
                    v === 'all' ||
                    v === 'monster' ||
                    v === 'humanoid' ||
                    v === 'animal'
                  ) {
                    setKindFilter(v);
                  }
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{d.filterAll}</SelectItem>
                  <SelectItem value="monster">{d.filterMonsters}</SelectItem>
                  <SelectItem value="humanoid">{d.filterHumanoids}</SelectItem>
                  <SelectItem value="animal">{d.filterAnimals}</SelectItem>
                </SelectContent>
              </Select>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {filteredBestiary.length} / {ALL_BESTIARY_ENTRIES.length}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <ScrollArea className="h-64 rounded-md border border-border p-2">
                <div className="flex flex-col gap-1">
                  {filteredBestiary.map((entry) => {
                    const isSelected = selectedEntry?.id === entry.id;
                    return (
                      <Button
                        key={entry.id}
                        type="button"
                        variant={isSelected ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setVariantIdx(0);
                        }}
                        className="h-auto justify-between px-2.5 py-2 text-left"
                      >
                        <span className="truncate font-medium">
                          {entry.name[lang]}
                        </span>
                        <Badge
                          variant={isSelected ? 'secondary' : 'outline'}
                          className="ml-2 shrink-0 text-[10px]"
                        >
                          {entry.threat[lang]}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Selected Bestiary Configuration */}
              {selectedEntry && (
                <div className="flex flex-col justify-between gap-3 rounded-md border border-border bg-muted/20 p-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {selectedEntry.name[lang]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedEntry.threat[lang]} · PA{' '}
                        {selectedEntry.armor[lang]}
                      </p>
                    </div>

                    {selectedEntry.combat?.variants &&
                      selectedEntry.combat.variants.length > 0 && (
                        <div className="flex flex-col gap-1">
                          <Label className="text-xs">{d.variantLabel}</Label>
                          <Select
                            value={String(variantIdx)}
                            onValueChange={(v) =>
                              setVariantIdx(Number.parseInt(v ?? '0', 10) || 0)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedEntry.combat.variants.map((v, idx) => (
                                <SelectItem key={idx} value={String(idx)}>
                                  {v.label[lang]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">{d.quantityLabel}</Label>
                        <Input
                          type="number"
                          min={1}
                          max={8}
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(
                              Math.max(
                                1,
                                Math.min(8, Number.parseInt(e.target.value, 10) || 1)
                              )
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">{d.roleOverrideLabel}</Label>
                        <Select
                          value={roleOverride}
                          onValueChange={(v) => {
                            if (
                              v === 'auto' ||
                              v === 'pc' ||
                              v === 'ally' ||
                              v === 'enemy' ||
                              v === 'monster'
                            ) {
                              setRoleOverride(v);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="monster">{copy.roles.monster}</SelectItem>
                            <SelectItem value="enemy">{copy.roles.enemy}</SelectItem>
                            <SelectItem value="ally">{copy.roles.ally}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {quantity > 1 && (
                      <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-2.5 py-2">
                        <Label
                          htmlFor="group-init-switch"
                          className="cursor-pointer text-xs"
                        >
                          {groupInitiative ? d.initGroup : d.initIndividual}
                        </Label>
                        <Switch
                          id="group-init-switch"
                          checked={groupInitiative}
                          onCheckedChange={setGroupInitiative}
                        />
                      </div>
                    )}
                  </div>

                  <Button type="button" onClick={handleAddFromBestiary}>
                    <Plus data-icon="inline-start" />
                    <span>{d.addFromBestiaryBtn}</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* TAB 2: PCs (JSON import) & Archetypes */}
          <TabsContent value="party" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground">
                  {d.importJsonTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {d.importJsonDesc}
                </p>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={handleJsonFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload data-icon="inline-start" />
                  <span>{d.importJsonBtn}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.presetsTitle}
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {ARCHETYPE_PRESETS.map((preset) => (
                  <Button
                    key={preset.id}
                    type="button"
                    variant="outline"
                    onClick={() => handleAddPreset(preset.id)}
                    className="h-auto justify-between px-3 py-2.5 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="size-4 text-primary" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {preset.name[lang]}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          PS {preset.hp} · END {preset.end} · PA {preset.armorSp} · RÉF{' '}
                          {preset.stats.ref}
                        </span>
                      </div>
                    </div>
                    <Plus className="size-4 shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Manual Custom Entry */}
          <TabsContent value="manual">
            <form onSubmit={handleCreateManual} className="flex flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1 sm:col-span-1">
                  <Label className="text-xs">{d.manual.nameLabel}</Label>
                  <Input
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder={d.manual.namePlaceholder}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.roleLabel}</Label>
                  <Select
                    value={manualRole}
                    onValueChange={(v) => {
                      if (
                        v === 'pc' ||
                        v === 'ally' ||
                        v === 'enemy' ||
                        v === 'monster'
                      ) {
                        setManualRole(v);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">{copy.roles.pc}</SelectItem>
                      <SelectItem value="ally">{copy.roles.ally}</SelectItem>
                      <SelectItem value="enemy">{copy.roles.enemy}</SelectItem>
                      <SelectItem value="monster">{copy.roles.monster}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.anatomyLabel}</Label>
                  <Select
                    value={manualAnatomy}
                    onValueChange={(v) => {
                      if (
                        v === 'human' ||
                        v === 'monster' ||
                        v === 'elemental' ||
                        v === 'specter'
                      ) {
                        setManualAnatomy(v);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="human">{copy.anatomy.human}</SelectItem>
                      <SelectItem value="monster">{copy.anatomy.monster}</SelectItem>
                      <SelectItem value="elemental">
                        {copy.anatomy.elemental}
                      </SelectItem>
                      <SelectItem value="specter">{copy.anatomy.specter}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.hpLabel}</Label>
                  <Input
                    type="number"
                    value={manualHp}
                    onChange={(e) => setManualHp(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.endLabel}</Label>
                  <Input
                    type="number"
                    value={manualEnd}
                    onChange={(e) => setManualEnd(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.armorLabel}</Label>
                  <Input
                    type="number"
                    value={manualArmor}
                    onChange={(e) => setManualArmor(Math.max(0, Number(e.target.value) || 0))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.refLabel}</Label>
                  <Input
                    type="number"
                    value={manualRef}
                    onChange={(e) => setManualRef(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.dexLabel}</Label>
                  <Input
                    type="number"
                    value={manualDex}
                    onChange={(e) => setManualDex(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.corLabel}</Label>
                  <Input
                    type="number"
                    value={manualCor}
                    onChange={(e) => setManualCor(Number(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.vitLabel}</Label>
                  <Input
                    type="number"
                    value={manualVit}
                    onChange={(e) => setManualVit(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.intLabel}</Label>
                  <Input
                    type="number"
                    value={manualInt}
                    onChange={(e) => setManualInt(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.volLabel}</Label>
                  <Input
                    type="number"
                    value={manualVol}
                    onChange={(e) => setManualVol(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.recLabel}</Label>
                  <Input
                    type="number"
                    value={manualRec}
                    onChange={(e) => setManualRec(Number(e.target.value) || 1)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{d.manual.etouLabel}</Label>
                  <Input
                    type="number"
                    value={manualEtou}
                    onChange={(e) => setManualEtou(Number(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="manual-nonsilver-switch"
                    checked={manualNonSilver}
                    onCheckedChange={setManualNonSilver}
                  />
                  <Label
                    htmlFor="manual-nonsilver-switch"
                    className="cursor-pointer text-xs"
                  >
                    {d.manual.nonSilverResistLabel}
                  </Label>
                </div>

                <Button type="submit">
                  <Plus data-icon="inline-start" />
                  <span>{d.manual.submitBtn}</span>
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
