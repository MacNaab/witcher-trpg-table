import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
import { BESTIARY_CORE_RULES } from '@/src/data/bestiary';
import type { CreatureTypeId } from '@/src/data/bestiary/types';
import { getCombatTrackerCopy } from '../i18n';
import type {
  AnatomyType,
  CombatantStats,
  CombatantWeapon,
  DamageType,
  ModuleLanguage,
  PenetrationTier,
  SavedCustomMonster,
} from '../types';
import { generateId } from '../utils/combatEngine';
import { createEmptyCustomMonster } from '../utils/hubStorage';

interface EditCustomMonsterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMonster: SavedCustomMonster | null;
  lang: ModuleLanguage;
  onSave: (monster: SavedCustomMonster) => void;
}

function parseCommaList(raw: string): string[] {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function EditCustomMonsterDialog({
  open,
  onOpenChange,
  initialMonster,
  lang,
  onSave,
}: EditCustomMonsterDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const isEditing = initialMonster !== null;

  const [draft, setDraft] = useState<SavedCustomMonster>(() =>
    createEmptyCustomMonster(lang)
  );
  const [vulnInput, setVulnInput] = useState('');
  const [resistInput, setResistInput] = useState('');
  const [immuneInput, setImmuneInput] = useState('');
  const [abilitiesInput, setAbilitiesInput] = useState('');

  const [newWpnName, setNewWpnName] = useState('');
  const [newWpnDmg, setNewWpnDmg] = useState('3d6+2');
  const [newWpnType, setNewWpnType] = useState<DamageType>('slashing');
  const [newWpnPen, setNewWpnPen] = useState<PenetrationTier>('none');
  const [newWpnRoF, setNewWpnRoF] = useState(2);
  const [newWpnEffect, setNewWpnEffect] = useState('');

  useEffect(() => {
    if (!open) return;
    const base = initialMonster
      ? {
          ...initialMonster,
          stats: { ...initialMonster.stats },
          weapons: initialMonster.weapons.map((w) => ({ ...w })),
          vulnerabilities: [...initialMonster.vulnerabilities],
          resistances: [...initialMonster.resistances],
          immunities: [...initialMonster.immunities],
          abilities: [...initialMonster.abilities],
        }
      : createEmptyCustomMonster(lang);

    setDraft(base);
    setVulnInput(base.vulnerabilities.join(', '));
    setResistInput(base.resistances.join(', '));
    setImmuneInput(base.immunities.join(', '));
    setAbilitiesInput(base.abilities.join(', '));
    setNewWpnName('');
    setNewWpnDmg('3d6+2');
    setNewWpnType('slashing');
    setNewWpnPen('none');
    setNewWpnRoF(2);
    setNewWpnEffect('');
  }, [open, initialMonster, lang]);

  const updateStat = (key: keyof CombatantStats, value: number) => {
    setDraft((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: Math.max(0, value) },
    }));
  };

  const handleAddWeapon = () => {
    if (!newWpnName.trim()) return;
    const weapon: CombatantWeapon = {
      id: generateId('wpn'),
      name: newWpnName.trim(),
      damage: newWpnDmg.trim() || '3d6',
      damageType: newWpnType,
      isSilver: false,
      penetration: newWpnPen,
      reliability: 15,
      maxReliability: 15,
      attacksPerRound: Math.max(1, Math.min(5, newWpnRoF)),
      effectNote: newWpnEffect.trim(),
    };
    setDraft((prev) => ({
      ...prev,
      weapons: [...prev.weapons, weapon],
    }));
    setNewWpnName('');
    setNewWpnDmg('3d6');
    setNewWpnEffect('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...draft,
      name:
        draft.name.trim() ||
        (lang === 'fr' ? 'Monstre personnalisé' : 'Custom Monster'),
      threatLabel: draft.threatLabel.trim(),
      vulnerabilities: parseCommaList(vulnInput),
      resistances: parseCommaList(resistInput),
      immunities: parseCommaList(immuneInput),
      abilities: parseCommaList(abilitiesInput),
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

  const categoryTitle =
    BESTIARY_CORE_RULES.categories.find((c) => c.typeId === draft.typeId)
      ?.rulebookTitle[lang] ?? draft.typeId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? lang === 'fr'
                ? 'Modifier le monstre du Bestiaire'
                : 'Edit Custom Bestiary Monster'
              : lang === 'fr'
                ? 'Créer un nouveau monstre du Bestiaire'
                : 'Create Custom Bestiary Monster'}
          </DialogTitle>
          <DialogDescription>
            {lang === 'fr'
              ? 'Ajoutez une créature inédite ou variante au Hub MJ partagé (utilisable à la fois en combat et dans le simulateur).'
              : 'Create a custom creature or monster variant stored in the shared GM Hub for both encounters and simulations.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
            {/* Identity & Taxonomy */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Nom de la créature' : 'Creature Name'}
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
                  {lang === 'fr' ? 'Catégorie du Bestiaire' : 'Bestiary Category'}
                </Label>
                <Select
                  value={draft.typeId}
                  onValueChange={(v) => {
                    if (v) {
                      const nextType = v as CreatureTypeId;
                      setDraft((prev) => ({
                        ...prev,
                        typeId: nextType,
                        anatomy:
                          nextType === 'elemental'
                            ? 'elemental'
                            : nextType === 'specter'
                              ? 'specter'
                              : nextType === 'humanoid'
                                ? 'human'
                                : 'monster',
                      }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{categoryTitle}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {BESTIARY_CORE_RULES.categories.map((cat) => (
                      <SelectItem key={cat.typeId} value={cat.typeId}>
                        {cat.rulebookTitle[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Anatomie' : 'Anatomy'}
                </Label>
                <Select
                  value={draft.anatomy}
                  onValueChange={(v) => {
                    if (v) setDraft((prev) => ({ ...prev, anatomy: v as AnatomyType }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue>{copy.anatomy[draft.anatomy]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {(['monster', 'elemental', 'specter', 'human'] as const).map(
                      (a) => (
                        <SelectItem key={a} value={a}>
                          {copy.anatomy[a]}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Menace / Prime' : 'Threat / Bounty'}
                </Label>
                <Input
                  value={draft.threatLabel}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, threatLabel: e.target.value }))
                  }
                  placeholder={lang === 'fr' ? 'Ex. Fort · Difficile' : 'e.g. Hard · Complex'}
                />
              </div>

              <div className="flex items-end pb-1.5 sm:col-span-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="custom-monster-nonsilver"
                    checked={draft.resistantToNonSilver}
                    onCheckedChange={(checked) =>
                      setDraft((prev) => ({
                        ...prev,
                        resistantToNonSilver: checked,
                      }))
                    }
                  />
                  <Label
                    htmlFor="custom-monster-nonsilver"
                    className="cursor-pointer text-xs"
                  >
                    {copy.addDialog.manual.nonSilverResistLabel}
                  </Label>
                </div>
              </div>
            </div>

            {/* Vitals, Armor & Combat Bases */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
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
                  {lang === 'fr' ? 'Armure nat. (PA)' : 'Natural SP'}
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={draft.armorSp}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      armorSp: Math.max(0, Number(e.target.value) || 0),
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

            {/* Stats */}
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

            {/* Natural Weapons & Attacks */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {lang === 'fr' ? 'Attaques & Armes naturelles' : 'Natural Attacks & Weapons'}
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
                  placeholder={lang === 'fr' ? 'Griffe, Queue, Crachat…' : 'Claw, Tail, Spit…'}
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
                  max={5}
                  value={newWpnRoF}
                  onChange={(e) =>
                    setNewWpnRoF(Math.max(1, Math.min(5, Number(e.target.value) || 1)))
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

              <div className="flex flex-wrap items-center gap-2">
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
                      ? 'Effet (ex. Saignement 35%, Poison, Étourdissement)'
                      : 'Effect (e.g. Bleed 35%, Poison, Stun)'
                  }
                  className="h-8 min-w-48 flex-1 text-xs"
                />
              </div>
            </div>

            <Separator />

            {/* Traits & Abilities */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {copy.inspector.vulnerabilitiesLabel}
                </Label>
                <Input
                  value={vulnInput}
                  onChange={(e) => setVulnInput(e.target.value)}
                  placeholder={lang === 'fr' ? 'Huile vs nécrophages, Igni…' : 'Necrophage oil, Igni…'}
                  className="text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {copy.inspector.resistancesLabel}
                </Label>
                <Input
                  value={resistInput}
                  onChange={(e) => setResistInput(e.target.value)}
                  placeholder={lang === 'fr' ? 'Froid, Perforant…' : 'Cold, Piercing…'}
                  className="text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {lang === 'fr' ? 'Immunités (séparées par virgule)' : 'Immunities (comma-separated)'}
                </Label>
                <Input
                  value={immuneInput}
                  onChange={(e) => setImmuneInput(e.target.value)}
                  placeholder={lang === 'fr' ? 'Poison, Saignement…' : 'Poison, Bleed…'}
                  className="text-xs"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">
                  {copy.inspector.abilitiesLabel}
                </Label>
                <Input
                  value={abilitiesInput}
                  onChange={(e) => setAbilitiesInput(e.target.value)}
                  placeholder={lang === 'fr' ? 'Régénération 3/rd, Vol…' : 'Regeneration 3/rd, Flight…'}
                  className="text-xs"
                />
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
              {lang === 'fr' ? 'Enregistrer le monstre' : 'Save Monster'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
