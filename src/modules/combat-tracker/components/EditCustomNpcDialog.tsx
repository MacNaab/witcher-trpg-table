import { useEffect, useState } from 'react';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { PROFESSIONS_DATA } from '@/src/modules/character-generator/data/racesAndProfessions';
import type { CharacterProfessionId } from '@/src/modules/character-generator/types';
import { HUMAN_HIT_LOCATIONS } from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatantRole,
  CombatantStats,
  CombatantWeapon,
  DamageType,
  HitLocationId,
  ModuleLanguage,
  NpcPowerTier,
  PenetrationTier,
  SavedCustomNpc,
} from '../types';
import { generateId } from '../utils/combatEngine';
import { createSavedNpcFromProfession } from '../utils/hubStorage';

interface EditCustomNpcDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialNpc: SavedCustomNpc | null;
  lang: ModuleLanguage;
  onSave: (npc: SavedCustomNpc) => void;
}

const TIER_LABELS: Record<NpcPowerTier, { fr: string; en: string }> = {
  novice: { fr: 'Novice (Base +4)', en: 'Novice (+4 skill)' },
  experienced: { fr: 'Expérimenté (Base +6)', en: 'Experienced (+6 skill)' },
  veteran: { fr: 'Vétéran (Base +8)', en: 'Veteran (+8 skill)' },
  elite: { fr: 'Élite / Boss (Base +10)', en: 'Elite / Boss (+10 skill)' },
};

export function EditCustomNpcDialog({
  open,
  onOpenChange,
  initialNpc,
  lang,
  onSave,
}: EditCustomNpcDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const isEditing = initialNpc !== null;

  const [draft, setDraft] = useState<SavedCustomNpc>(() =>
    createSavedNpcFromProfession('man-at-arms', 'experienced', lang)
  );
  const [newWpnName, setNewWpnName] = useState('');
  const [newWpnDmg, setNewWpnDmg] = useState('3d6');
  const [newWpnType, setNewWpnType] = useState<DamageType>('slashing');
  const [newWpnPen, setNewWpnPen] = useState<PenetrationTier>('none');
  const [newWpnRoF, setNewWpnRoF] = useState(1);
  const [newWpnSilver, setNewWpnSilver] = useState(false);
  const [newWpnEffect, setNewWpnEffect] = useState('');

  useEffect(() => {
    if (!open) return;
    if (initialNpc) {
      setDraft({
        ...initialNpc,
        stats: { ...initialNpc.stats },
        armor: { ...initialNpc.armor },
        weapons: initialNpc.weapons.map((w) => ({ ...w })),
      });
    } else {
      setDraft(createSavedNpcFromProfession('man-at-arms', 'experienced', lang));
    }
    setNewWpnName('');
    setNewWpnDmg('3d6');
    setNewWpnType('slashing');
    setNewWpnPen('none');
    setNewWpnRoF(1);
    setNewWpnSilver(false);
    setNewWpnEffect('');
  }, [open, initialNpc, lang]);

  const handleApplyProfessionTemplate = (
    professionId: CharacterProfessionId | 'custom',
    tier: NpcPowerTier
  ) => {
    const generated = createSavedNpcFromProfession(professionId, tier, lang);
    setDraft((prev) => ({
      ...generated,
      id: prev.id,
      role: prev.role,
      name:
        isEditing && prev.name.trim() && prev.name !== prev.professionLabel
          ? prev.name
          : generated.name,
      notes: prev.notes,
    }));
  };

  const updateStat = (key: keyof CombatantStats, value: number) => {
    setDraft((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: Math.max(0, value) },
    }));
  };

  const updateArmor = (loc: HitLocationId, value: number) => {
    setDraft((prev) => ({
      ...prev,
      armor: { ...prev.armor, [loc]: Math.max(0, value) },
    }));
  };

  const handleAddWeapon = () => {
    if (!newWpnName.trim()) return;
    const weapon: CombatantWeapon = {
      id: generateId('wpn'),
      name: newWpnName.trim(),
      damage: newWpnDmg.trim() || '3d6',
      damageType: newWpnType,
      isSilver: newWpnSilver,
      penetration: newWpnPen,
      reliability: 15,
      maxReliability: 15,
      attacksPerRound: Math.max(1, Math.min(4, newWpnRoF)),
      effectNote: newWpnEffect.trim(),
    };
    setDraft((prev) => ({
      ...prev,
      weapons: [...prev.weapons, weapon],
    }));
    setNewWpnName('');
    setNewWpnDmg('3d6');
    setNewWpnEffect('');
    setNewWpnSilver(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...draft,
      name:
        draft.name.trim() ||
        draft.professionLabel ||
        (lang === 'fr' ? 'PNJ sans nom' : 'Unnamed NPC'),
      professionLabel: draft.professionLabel.trim(),
      updatedAt: new Date().toISOString(),
    });
    onOpenChange(false);
  };

  const statFields: { key: keyof CombatantStats; label: string }[] = [
    { key: 'ref', label: 'RÉF' },
    { key: 'dex', label: 'DEX' },
    { key: 'cor', label: 'COR' },
    { key: 'vit', label: 'VIT' },
    { key: 'int', label: 'INT' },
    { key: 'vol', label: 'VOL' },
    { key: 'rec', label: 'RÉC' },
    { key: 'etou', label: 'ÉTOU' },
    { key: 'vig', label: 'VIG' },
  ];

  const selectedProfLabel =
    draft.professionId === 'custom'
      ? lang === 'fr'
        ? 'Libre / Sur mesure'
        : 'Custom'
      : PROFESSIONS_DATA.find((p) => p.id === draft.professionId)?.name[lang] ??
        draft.professionLabel;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? lang === 'fr'
                ? 'Modifier le PNJ du Hub'
                : 'Edit Hub NPC'
              : lang === 'fr'
                ? 'Créer un PNJ (basé sur une profession)'
                : 'Create Profession-Based NPC'}
          </DialogTitle>
          <DialogDescription>
            {lang === 'fr'
              ? 'Choisissez une profession de PJ et un rang pour pré-remplir les statistiques, puis ajustez librement les bases et l’équipement.'
              : 'Pick a PC profession and tier to prefill stats, then freely adjust combat bases, armor, and weapons.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
            {/* Profession Template Selector */}
            <div className="grid gap-3 rounded-lg border border-border bg-muted/25 p-3 sm:grid-cols-12">
              <div className="flex flex-col gap-1 sm:col-span-5">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Profession de PJ' : 'PC Profession'}
                </Label>
                <Select
                  value={draft.professionId}
                  onValueChange={(v) => {
                    if (v) {
                      handleApplyProfessionTemplate(
                        v as CharacterProfessionId | 'custom',
                        draft.powerTier
                      );
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{selectedProfLabel}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {PROFESSIONS_DATA.map((prof) => (
                      <SelectItem key={prof.id} value={prof.id}>
                        {prof.name[lang]}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">
                      {lang === 'fr' ? 'Libre / Sur mesure' : 'Custom'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-4">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Niveau / Rang' : 'Power Tier'}
                </Label>
                <Select
                  value={draft.powerTier}
                  onValueChange={(v) => {
                    if (v) {
                      handleApplyProfessionTemplate(
                        draft.professionId,
                        v as NpcPowerTier
                      );
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{TIER_LABELS[draft.powerTier][lang]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(
                      ['novice', 'experienced', 'veteran', 'elite'] as const
                    ).map((tier) => (
                      <SelectItem key={tier} value={tier}>
                        {TIER_LABELS[tier][lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end sm:col-span-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    handleApplyProfessionTemplate(
                      draft.professionId,
                      draft.powerTier
                    )
                  }
                >
                  <Sparkles data-icon="inline-start" />
                  <span>{lang === 'fr' ? 'Pré-remplir' : 'Apply Preset'}</span>
                </Button>
              </div>
            </div>

            {/* Identity, Role, Vitals & Combat Bases */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Nom du PNJ' : 'NPC Name'}
                </Label>
                <Input
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Intitulé de rôle / faction' : 'Title / Faction'}
                </Label>
                <Input
                  value={draft.professionLabel}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      professionLabel: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Allégeance par défaut' : 'Default Role'}
                </Label>
                <Select
                  value={draft.role}
                  onValueChange={(v) => {
                    if (v === 'ally' || v === 'enemy' || v === 'pc') {
                      setDraft((prev) => ({ ...prev, role: v as CombatantRole }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{copy.roles[draft.role]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enemy">{copy.roles.enemy}</SelectItem>
                    <SelectItem value="ally">{copy.roles.ally}</SelectItem>
                    <SelectItem value="pc">{copy.roles.pc}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'PS max' : 'Max HP'}
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={draft.maxHp}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      maxHp: Math.max(1, Number(e.target.value) || 1),
                    }))
                  }
                  className="font-mono tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'END max' : 'Max STA'}
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={draft.maxEnd}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      maxEnd: Math.max(1, Number(e.target.value) || 1),
                    }))
                  }
                  className="font-mono tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Base Attaque' : 'Attack Base'}
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={draft.attackBase}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      attackBase: Math.max(1, Number(e.target.value) || 1),
                    }))
                  }
                  className="font-mono tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Base Défense' : 'Defense Base'}
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={draft.defenseBase}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      defenseBase: Math.max(1, Number(e.target.value) || 1),
                    }))
                  }
                  className="font-mono tabular-nums"
                />
              </div>
            </div>

            <Separator />

            {/* Characteristics */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {copy.hub.pcDialog.statsTitle}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
                {statFields.map((s) => (
                  <div key={s.key} className="flex flex-col gap-1">
                    <Label className="text-[11px] text-muted-foreground">
                      {s.label}
                    </Label>
                    <Input
                      type="number"
                      min={0}
                      value={draft.stats[s.key]}
                      onChange={(e) =>
                        updateStat(s.key, Number(e.target.value) || 0)
                      }
                      className="h-8 text-center font-mono tabular-nums"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Armor */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {copy.hub.pcDialog.armorTitle}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {HUMAN_HIT_LOCATIONS.map((loc) => (
                  <div key={loc.id} className="flex flex-col gap-1">
                    <Label className="text-xs">{loc.name[lang]}</Label>
                    <Input
                      type="number"
                      min={0}
                      value={draft.armor[loc.id] ?? 0}
                      onChange={(e) =>
                        updateArmor(loc.id, Number(e.target.value) || 0)
                      }
                      className="h-8 font-mono tabular-nums"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Weapons */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {copy.hub.pcDialog.weaponsTitle}
              </p>
              {draft.weapons.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {draft.weapons.map((wpn) => (
                    <div
                      key={wpn.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-border px-2.5 py-1.5 text-xs"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="font-medium text-foreground">
                          {wpn.name}
                        </span>
                        <span className="font-mono text-muted-foreground tabular-nums">
                          {wpn.damage}
                          {wpn.attacksPerRound > 1 ? ` ×${wpn.attacksPerRound}` : ''}
                        </span>
                        <span className="text-muted-foreground">
                          · {copy.resolver.damageTypes[wpn.damageType]}
                        </span>
                        {wpn.isSilver && (
                          <span className="text-sky-600 dark:text-sky-400">
                            · {copy.inspector.silverLabel}
                          </span>
                        )}
                        {wpn.effectNote && (
                          <span className="text-amber-600 dark:text-amber-400">
                            · {wpn.effectNote}
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            weapons: prev.weapons.filter((w) => w.id !== wpn.id),
                          }))
                        }
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-12">
                <Input
                  value={newWpnName}
                  onChange={(e) => setNewWpnName(e.target.value)}
                  placeholder={copy.inspector.weaponNamePlaceholder}
                  className="h-8 text-xs sm:col-span-4"
                />
                <Input
                  value={newWpnDmg}
                  onChange={(e) => setNewWpnDmg(e.target.value)}
                  placeholder="3d6+2"
                  className="h-8 font-mono text-xs sm:col-span-2"
                />
                <Select
                  value={newWpnType}
                  onValueChange={(v) => {
                    if (v) setNewWpnType(v as DamageType);
                  }}
                >
                  <SelectTrigger className="h-8 text-xs sm:col-span-3">
                    <SelectValue>{copy.resolver.damageTypes[newWpnType]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['slashing', 'piercing', 'bludgeoning', 'elemental'] as const).map(
                      (dt) => (
                        <SelectItem key={dt} value={dt}>
                          {copy.resolver.damageTypes[dt]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  value={newWpnRoF}
                  onChange={(e) =>
                    setNewWpnRoF(Math.max(1, Math.min(4, Number(e.target.value) || 1)))
                  }
                  title={lang === 'fr' ? 'Attaques / round' : 'Attacks / round'}
                  className="h-8 font-mono text-xs tabular-nums sm:col-span-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleAddWeapon}
                  disabled={!newWpnName.trim()}
                  className="h-8 sm:col-span-2"
                >
                  <Plus data-icon="inline-start" />
                  <span>{copy.inspector.addWeaponBtn}</span>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Select
                  value={newWpnPen}
                  onValueChange={(v) => {
                    if (v) setNewWpnPen(v as PenetrationTier);
                  }}
                >
                  <SelectTrigger className="h-8 w-52 text-xs">
                    <SelectValue>{copy.resolver.penetrationTiers[newWpnPen]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['none', 'normal', 'improved'] as const).map((p) => (
                      <SelectItem key={p} value={p}>
                        {copy.resolver.penetrationTiers[p]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  value={newWpnEffect}
                  onChange={(e) => setNewWpnEffect(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Effet (ex. Saignement 30%, Poison)'
                      : 'Effect (e.g. Bleed 30%, Poison)'
                  }
                  className="h-8 min-w-44 flex-1 text-xs"
                />

                <div className="flex items-center gap-1.5">
                  <Switch
                    id="hub-npc-wpn-silver"
                    checked={newWpnSilver}
                    onCheckedChange={setNewWpnSilver}
                  />
                  <Label htmlFor="hub-npc-wpn-silver" className="text-xs">
                    {copy.inspector.silverLabel}
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">{copy.hub.pcDialog.notesLabel}</Label>
              <Textarea
                value={draft.notes}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {copy.hub.pcDialog.cancelBtn}
            </Button>
            <Button type="submit">
              {lang === 'fr' ? 'Enregistrer le PNJ' : 'Save NPC'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
