import { useMemo, useRef, useState } from 'react';
import { Plus, Search, Upload, Users } from 'lucide-react';
import { toast } from 'sonner';
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
  getCreatureTypeLabel,
} from '@/src/data/bestiary';
import { parseImportedCharacterJson } from '@/src/modules/character-generator/utils/characterCalculations';
import { ARCHETYPE_PRESETS } from '@/src/modules/combat-tracker/data/combatRulesData';
import type { CombatHubState } from '@/src/modules/combat-tracker/types';
import { generateId } from '@/src/modules/combat-tracker/utils/combatEngine';
import { getCombatSimulatorCopy } from '../i18n';
import type {
  AnatomyType,
  DamageType,
  ModuleLanguage,
  PenetrationTier,
  SimFighterConfig,
  TacticalStance,
  TeamSide,
} from '../types';
import {
  simFighterFromArchetype,
  simFighterFromBestiary,
  simFighterFromCharacterSheet,
  simFighterFromCustomMonster,
  simFighterFromCustomNpc,
  simFighterFromHubPc,
  simFightersFromHubGroup,
} from '../utils/simulatorEngine';

interface AddSimFighterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetTeam: TeamSide;
  lang: ModuleLanguage;
  hubState: CombatHubState;
  onAddFighters: (fighters: SimFighterConfig[]) => void;
}

export function AddSimFighterDialog({
  open,
  onOpenChange,
  targetTeam,
  lang,
  hubState,
  onAddFighters,
}: AddSimFighterDialogProps) {
  const copy = getCombatSimulatorCopy(lang);
  const d = copy.addDialog;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tab, setTab] = useState<'bestiary' | 'hub' | 'archetypes' | 'custom'>('bestiary');
  const [search, setSearch] = useState('');
  const [kindFilter, setKindFilter] = useState<'all' | BestiaryKind>('all');
  const [selectedEntry, setSelectedEntry] = useState<BestiaryEntry | null>(
    ALL_BESTIARY_ENTRIES[0] ?? null
  );
  const [variantIdx, setVariantIdx] = useState(0);
  const [bestiaryQty, setBestiaryQty] = useState(1);

  // Custom form state
  const [customName, setCustomName] = useState('');
  const [customAnatomy, setCustomAnatomy] = useState<AnatomyType>('human');
  const [customHp, setCustomHp] = useState(35);
  const [customEnd, setCustomEnd] = useState(35);
  const [customSp, setCustomSp] = useState(8);
  const [customRef, setCustomRef] = useState(7);
  const [customCor, setCustomCor] = useState(7);
  const [customEtou, setCustomEtou] = useState(7);
  const [customAttBase, setCustomAttBase] = useState(14);
  const [customDefBase, setCustomDefBase] = useState(13);
  const [customWeaponName, setCustomWeaponName] = useState(
    lang === 'fr' ? 'Épée longue' : 'Longsword'
  );
  const [customDmg, setCustomDmg] = useState('4d6');
  const [customRoF, setCustomRoF] = useState(1);
  const [customDmgType, setCustomDmgType] = useState<DamageType>('slashing');
  const [customPen, setCustomPen] = useState<PenetrationTier>('none');
  const [customSilver, setCustomSilver] = useState(false);
  const [customNonSilverRes, setCustomNonSilverRes] = useState(false);
  const [customStance, setCustomStance] = useState<TacticalStance>('balanced');
  const [customQty, setCustomQty] = useState(1);

  const filteredBestiary = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_BESTIARY_ENTRIES.filter((entry) => {
      if (kindFilter !== 'all' && entry.kind !== kindFilter) return false;
      if (!q) return true;
      return (
        entry.name.fr.toLowerCase().includes(q) ||
        entry.name.en.toLowerCase().includes(q) ||
        entry.typeId.toLowerCase().includes(q)
      );
    });
  }, [kindFilter, search]);

  const activeVariants = selectedEntry?.combat?.variants ?? [];

  const handleAddFromBestiary = () => {
    if (!selectedEntry) return;
    const chosenVariant =
      activeVariants.length > 0 ? (activeVariants[variantIdx] ?? activeVariants[0]) : undefined;
    const fighter = simFighterFromBestiary(selectedEntry, {
      team: targetTeam,
      lang,
      variant: chosenVariant,
      quantity: bestiaryQty,
    });
    onAddFighters([fighter]);
    toast.success(d.addedToast(fighter.name));
    onOpenChange(false);
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseImportedCharacterJson(text);
      if (!parsed) {
        toast.error(d.jsonErrorToast);
        return;
      }
      const fighter = simFighterFromCharacterSheet(parsed, targetTeam, lang);
      onAddFighters([fighter]);
      toast.success(d.addedToast(fighter.name));
      onOpenChange(false);
    } catch {
      toast.error(d.jsonErrorToast);
    }
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const name =
      customName.trim() ||
      (lang === 'fr' ? 'Combattant personnalisé' : 'Custom Fighter');
    const fighter: SimFighterConfig = {
      id: generateId('simf'),
      name,
      team: targetTeam,
      quantity: Math.max(1, Math.min(20, customQty)),
      anatomy: customAnatomy,
      maxHp: Math.max(1, customHp),
      maxEnd: Math.max(1, customEnd),
      armorSp: Math.max(0, customSp),
      ref: Math.max(1, customRef),
      dex: Math.max(1, customRef),
      cor: Math.max(1, customCor),
      vit: 6,
      vol: 6,
      rec: Math.max(1, Math.floor((customCor + 6) / 2)),
      etou: Math.max(1, Math.min(10, customEtou)),
      attackBase: Math.max(1, customAttBase),
      defenseBase: Math.max(1, customDefBase),
      resistantToNonSilver: customNonSilverRes,
      stance: customStance,
      weapon: {
        name: customWeaponName.trim() || 'Weapon',
        damageFormula: customDmg.trim() || '3d6',
        damageType: customDmgType,
        isSilver: customSilver,
        penetration: customPen,
        attacksPerRound: Math.max(1, Math.min(4, customRoF)),
        isRanged: false,
        bleedChance: 0,
        burnChance: 0,
        poisonChance: 0,
        stunChance: 0,
      },
      sourceTag: 'custom',
    };
    onAddFighters([fighter]);
    toast.success(d.addedToast(fighter.name));
    onOpenChange(false);
  };

  const teamLabel =
    targetTeam === 'teamA' ? copy.report.teamAShort : copy.report.teamBShort;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {d.title} · {teamLabel}
          </DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          className="flex flex-col gap-4"
        >
          <TabsList className="grid w-full grid-cols-2 gap-1 group-data-horizontal/tabs:h-auto sm:grid-cols-4 sm:gap-0 sm:group-data-horizontal/tabs:h-8">
            <TabsTrigger value="bestiary">{d.tabs.bestiary}</TabsTrigger>
            <TabsTrigger value="hub">{d.tabs.hub}</TabsTrigger>
            <TabsTrigger value="archetypes">{d.tabs.archetypes}</TabsTrigger>
            <TabsTrigger value="custom">{d.tabs.custom}</TabsTrigger>
          </TabsList>

          {/* 1. Bestiary Tab */}
          <TabsContent value="bestiary" className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-0 flex-1 basis-full sm:basis-auto">
                <Search
                  className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={d.searchPlaceholder}
                  className="pl-8"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1">
                {(
                  [
                    ['all', d.kindAll],
                    ['monster', d.kindMonster],
                    ['humanoid', d.kindHumanoid],
                    ['animal', d.kindAnimal],
                  ] as const
                ).map(([k, label]) => (
                  <Button
                    key={k}
                    type="button"
                    size="sm"
                    variant={kindFilter === k ? 'default' : 'outline'}
                    onClick={() => setKindFilter(k)}
                  >
                    {label}
                  </Button>
                ))}
                <span className="ml-1 font-mono text-xs text-muted-foreground tabular-nums">
                  {filteredBestiary.length} / {ALL_BESTIARY_ENTRIES.length}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-12">
              <ScrollArea className="h-52 rounded-md border border-border sm:col-span-7 sm:h-64">
                <div className="flex flex-col divide-y divide-border">
                  {filteredBestiary.map((entry) => {
                    const active = selectedEntry?.id === entry.id;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => {
                          setSelectedEntry(entry);
                          setVariantIdx(0);
                        }}
                        className={`flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors ${
                          active
                            ? 'bg-primary/15 text-foreground'
                            : 'hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="truncate font-medium">
                            {entry.name[lang]}
                          </div>
                          <div className="truncate text-[11px] text-muted-foreground">
                            {getCreatureTypeLabel(entry.typeId, lang)} ·{' '}
                            {entry.threat[lang]}
                          </div>
                        </div>
                        <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                          PS {entry.combat?.stats?.['PS'] ?? '—'} · PA{' '}
                          {entry.armor[lang]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="flex flex-col justify-between gap-3 rounded-md border border-border bg-muted/20 p-3 sm:col-span-5">
                {selectedEntry ? (
                  <div className="flex flex-col gap-3 text-xs">
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {selectedEntry.name[lang]}
                      </div>
                      <div className="text-muted-foreground">
                        {getCreatureTypeLabel(selectedEntry.typeId, lang)} ·{' '}
                        {selectedEntry.threat[lang]}
                      </div>
                    </div>

                    {activeVariants.length > 0 && (
                      <div className="flex flex-col gap-1">
                        <Label className="text-xs">{d.variantLabel}</Label>
                        <Select
                          value={String(variantIdx)}
                          onValueChange={(v) => setVariantIdx(Number(v) || 0)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue>
                              {activeVariants[variantIdx]?.label[lang] ??
                                activeVariants[0]?.label[lang]}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {activeVariants.map((v, idx) => (
                              <SelectItem key={v.label.fr} value={String(idx)}>
                                {v.label[lang]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="sim-bestiary-qty" className="text-xs">
                        {d.qtyLabel}
                      </Label>
                      <Input
                        id="sim-bestiary-qty"
                        type="number"
                        min={1}
                        max={20}
                        value={bestiaryQty}
                        onChange={(e) =>
                          setBestiaryQty(
                            Math.max(1, Math.min(20, Number(e.target.value) || 1))
                          )
                        }
                      />
                    </div>

                    {(() => {
                      const preview = simFighterFromBestiary(selectedEntry, {
                        team: targetTeam,
                        lang,
                        variant: activeVariants[variantIdx],
                        quantity: bestiaryQty,
                      });
                      return (
                        <div className="grid grid-cols-2 gap-1.5 rounded border border-border bg-background/70 p-2 font-mono text-[11px] tabular-nums">
                          <span>Att base: {preview.attackBase}</span>
                          <span>Déf base: {preview.defenseBase}</span>
                          <span>PS: {preview.maxHp}</span>
                          <span>PA: {preview.armorSp}</span>
                          <span className="col-span-2 truncate">
                            {preview.weapon.name}: {preview.weapon.damageFormula} (×
                            {preview.weapon.attacksPerRound})
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                ) : null}

                <Button
                  type="button"
                  onClick={handleAddFromBestiary}
                  disabled={!selectedEntry}
                  className="w-full"
                >
                  <Plus data-icon="inline-start" />
                  <span>{d.addSelectedBtn}</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* 2. GM Hub Tab */}
          <TabsContent value="hub" className="flex flex-col gap-4">
            {hubState.characters.length === 0 &&
            hubState.groups.length === 0 &&
            hubState.customNpcs.length === 0 &&
            hubState.customMonsters.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                {d.noHubData}
              </div>
            ) : (
              <div className="sm:max-h-72 sm:overflow-y-auto sm:pr-2">
                <div className="flex flex-col gap-4">
                  {hubState.groups.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-semibold text-muted-foreground">
                        {d.hubGroupsTitle}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {hubState.groups.map((grp) => (
                          <div
                            key={grp.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/20 p-2.5 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium text-foreground">
                                {grp.name}
                              </div>
                              <div className="truncate text-[11px] text-muted-foreground">
                                {grp.members.length} slot(s)
                              </div>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                const imported = simFightersFromHubGroup(
                                  grp,
                                  hubState.characters,
                                  targetTeam,
                                  lang,
                                  {
                                    customNpcs: hubState.customNpcs,
                                    customMonsters: hubState.customMonsters,
                                  }
                                );
                                if (imported.length > 0) {
                                  onAddFighters(imported);
                                  toast.success(
                                    d.groupImportedToast(grp.name, imported.length)
                                  );
                                  onOpenChange(false);
                                }
                              }}
                            >
                              <Users data-icon="inline-start" />
                              <span>{d.importGroupBtn}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hubState.characters.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-semibold text-muted-foreground">
                        {d.hubPcsTitle}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {hubState.characters.map((pc) => (
                          <div
                            key={pc.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border bg-card p-2.5 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium text-foreground">
                                {pc.name}
                              </div>
                              <div className="truncate font-mono text-[11px] text-muted-foreground tabular-nums">
                                PS {pc.maxHp} · RÉF {pc.stats.ref}
                              </div>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const f = simFighterFromHubPc(pc, targetTeam);
                                onAddFighters([f]);
                                toast.success(d.addedToast(f.name));
                                onOpenChange(false);
                              }}
                            >
                              <Plus data-icon="inline-start" />
                              <span>{copy.teams.addBtn}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hubState.customNpcs.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-semibold text-muted-foreground">
                        {lang === 'fr'
                          ? 'PNJ (Professions) du Hub MJ'
                          : 'Saved NPCs in GM Hub'}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {hubState.customNpcs.map((npc) => (
                          <div
                            key={npc.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border bg-card p-2.5 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium text-foreground">
                                {npc.name}
                              </div>
                              <div className="truncate font-mono text-[11px] text-muted-foreground tabular-nums">
                                {npc.professionLabel} · PS {npc.maxHp} · Att{' '}
                                {npc.attackBase}
                              </div>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const f = simFighterFromCustomNpc(npc, targetTeam);
                                onAddFighters([f]);
                                toast.success(d.addedToast(f.name));
                                onOpenChange(false);
                              }}
                            >
                              <Plus data-icon="inline-start" />
                              <span>{copy.teams.addBtn}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hubState.customMonsters.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-semibold text-muted-foreground">
                        {lang === 'fr'
                          ? 'Monstres (Bestiaire MJ)'
                          : 'Custom Bestiary Monsters'}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {hubState.customMonsters.map((mon) => (
                          <div
                            key={mon.id}
                            className="flex items-center justify-between gap-2 rounded-md border border-border bg-card p-2.5 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-medium text-foreground">
                                {mon.name}
                              </div>
                              <div className="truncate font-mono text-[11px] text-muted-foreground tabular-nums">
                                PS {mon.maxHp} · PA {mon.armorSp} · Att{' '}
                                {mon.attackBase}
                              </div>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const f = simFighterFromCustomMonster(
                                  mon,
                                  targetTeam
                                );
                                onAddFighters([f]);
                                toast.success(d.addedToast(f.name));
                                onOpenChange(false);
                              }}
                            >
                              <Plus data-icon="inline-start" />
                              <span>{copy.teams.addBtn}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          {/* 3. Archetypes & Character Sheet JSON */}
          <TabsContent value="archetypes" className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/20 p-3">
              <div className="text-xs text-muted-foreground">
                {copy.controls.saveToTrackerHint}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImportJson}
                  className="hidden"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload data-icon="inline-start" />
                  <span>{d.importJsonBtn}</span>
                </Button>
              </div>
            </div>

            <div className="sm:max-h-72 sm:overflow-y-auto sm:pr-1">
              <div className="grid gap-2 sm:grid-cols-2">
                {ARCHETYPE_PRESETS.map((preset) => (
                  <div
                    key={preset.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-border bg-card p-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-foreground">
                        {preset.name[lang]}
                      </div>
                      <div className="truncate font-mono text-[11px] text-muted-foreground tabular-nums">
                        PS {preset.hp} · PA {preset.armorSp} ·{' '}
                        {preset.weapons[0]?.damage ?? '3d6'}
                      </div>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        const f = simFighterFromArchetype(preset, targetTeam, lang);
                        onAddFighters([f]);
                        toast.success(d.addedToast(f.name));
                        onOpenChange(false);
                      }}
                    >
                      <Plus data-icon="inline-start" />
                      <span>{copy.teams.addBtn}</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 4. Custom Builder */}
          <TabsContent value="custom">
            <form onSubmit={handleCreateCustom} className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div className="col-span-2 flex flex-col gap-1">
                <Label htmlFor="sim-custom-name">{d.customForm.nameLabel}</Label>
                <Input
                  id="sim-custom-name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={d.customForm.namePlaceholder}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label>{d.customForm.anatomyLabel}</Label>
                <Select
                  value={customAnatomy}
                  onValueChange={(v) => setCustomAnatomy(v as AnatomyType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{copy.anatomy[customAnatomy]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['human', 'monster', 'elemental', 'specter'] as const).map(
                      (a) => (
                        <SelectItem key={a} value={a}>
                          {copy.anatomy[a]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-qty">{d.qtyLabel}</Label>
                <Input
                  id="sim-custom-qty"
                  type="number"
                  min={1}
                  max={20}
                  value={customQty}
                  onChange={(e) => setCustomQty(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-hp">{d.customForm.hpLabel}</Label>
                <Input
                  id="sim-custom-hp"
                  type="number"
                  min={1}
                  value={customHp}
                  onChange={(e) => setCustomHp(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-end">{d.customForm.endLabel}</Label>
                <Input
                  id="sim-custom-end"
                  type="number"
                  min={1}
                  value={customEnd}
                  onChange={(e) => setCustomEnd(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-sp">{d.customForm.spLabel}</Label>
                <Input
                  id="sim-custom-sp"
                  type="number"
                  min={0}
                  value={customSp}
                  onChange={(e) => setCustomSp(Number(e.target.value) || 0)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-att">{d.customForm.attackBaseLabel}</Label>
                <Input
                  id="sim-custom-att"
                  type="number"
                  min={1}
                  value={customAttBase}
                  onChange={(e) => setCustomAttBase(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-def">{d.customForm.defenseBaseLabel}</Label>
                <Input
                  id="sim-custom-def"
                  type="number"
                  min={1}
                  value={customDefBase}
                  onChange={(e) => setCustomDefBase(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-ref">{d.customForm.refLabel}</Label>
                <Input
                  id="sim-custom-ref"
                  type="number"
                  min={1}
                  value={customRef}
                  onChange={(e) => setCustomRef(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-cor">{d.customForm.corLabel}</Label>
                <Input
                  id="sim-custom-cor"
                  type="number"
                  min={1}
                  value={customCor}
                  onChange={(e) => setCustomCor(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-etou">{d.customForm.etouLabel}</Label>
                <Input
                  id="sim-custom-etou"
                  type="number"
                  min={1}
                  max={10}
                  value={customEtou}
                  onChange={(e) => setCustomEtou(Number(e.target.value) || 1)}
                />
              </div>

              <div className="col-span-2 flex flex-col gap-1">
                <Label htmlFor="sim-custom-wpn">{d.customForm.weaponNameLabel}</Label>
                <Input
                  id="sim-custom-wpn"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-dmg">{d.customForm.weaponDmgLabel}</Label>
                <Input
                  id="sim-custom-dmg"
                  value={customDmg}
                  onChange={(e) => setCustomDmg(e.target.value)}
                  placeholder="4d6+2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="sim-custom-rof">{d.customForm.attacksPerRoundLabel}</Label>
                <Input
                  id="sim-custom-rof"
                  type="number"
                  min={1}
                  max={4}
                  value={customRoF}
                  onChange={(e) => setCustomRoF(Number(e.target.value) || 1)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label>{d.customForm.damageTypeLabel}</Label>
                <Select
                  value={customDmgType}
                  onValueChange={(v) => setCustomDmgType(v as DamageType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{copy.damageTypes[customDmgType]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['slashing', 'piercing', 'bludgeoning', 'elemental'] as const).map(
                      (dt) => (
                        <SelectItem key={dt} value={dt}>
                          {copy.damageTypes[dt]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label>{d.customForm.penetrationLabel}</Label>
                <Select
                  value={customPen}
                  onValueChange={(v) => setCustomPen(v as PenetrationTier)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{copy.penetration[customPen]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['none', 'normal', 'improved'] as const).map((p) => (
                      <SelectItem key={p} value={p}>
                        {copy.penetration[p]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 flex flex-col gap-1">
                <Label>{d.customForm.stanceLabel}</Label>
                <Select
                  value={customStance}
                  onValueChange={(v) => setCustomStance(v as TacticalStance)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{copy.stances[customStance]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['balanced', 'fast', 'strong', 'defensive'] as const).map(
                      (st) => (
                        <SelectItem key={st} value={st}>
                          {copy.stances[st]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 flex items-center justify-between rounded border border-border px-2.5 py-2">
                <Label htmlFor="sim-custom-silver">{d.customForm.isSilverLabel}</Label>
                <Switch
                  id="sim-custom-silver"
                  checked={customSilver}
                  onCheckedChange={setCustomSilver}
                />
              </div>

              <div className="col-span-2 flex items-center justify-between rounded border border-border px-2.5 py-2">
                <Label htmlFor="sim-custom-nonsilver">
                  {d.customForm.nonSilverResistLabel}
                </Label>
                <Switch
                  id="sim-custom-nonsilver"
                  checked={customNonSilverRes}
                  onCheckedChange={setCustomNonSilverRes}
                />
              </div>

              <div className="col-span-2 flex justify-end sm:col-span-4">
                <Button type="submit" className="w-full sm:w-auto">
                  <Plus data-icon="inline-start" />
                  <span>{d.customForm.submitBtn}</span>
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
