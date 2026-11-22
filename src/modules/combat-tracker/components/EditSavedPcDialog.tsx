import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
import { HUMAN_HIT_LOCATIONS } from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatantStats,
  CombatantWeapon,
  HitLocationId,
  ModuleLanguage,
  PenetrationTier,
  SavedPartyCharacter,
} from '../types';
import { generateId } from '../utils/combatEngine';
import { createEmptySavedPc } from '../utils/hubStorage';

interface EditSavedPcDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPc: SavedPartyCharacter | null;
  lang: ModuleLanguage;
  onSave: (pc: SavedPartyCharacter) => void;
}

/**
 * Shadcn Dialog for creating or editing a persistent Player Character / Companion
 * stored in the GM Hub (identity, stats, vitals, per-location armor SP, weapons, notes).
 */
export function EditSavedPcDialog({
  open,
  onOpenChange,
  initialPc,
  lang,
  onSave,
}: EditSavedPcDialogProps) {
  const copy = getCombatTrackerCopy(lang);
  const d = copy.hub.pcDialog;
  const isEditing = initialPc !== null;

  const [draft, setDraft] = useState<SavedPartyCharacter>(() =>
    createEmptySavedPc(lang)
  );
  const [newWeaponName, setNewWeaponName] = useState('');
  const [newWeaponDmg, setNewWeaponDmg] = useState('3d6');
  const [newWeaponSilver, setNewWeaponSilver] = useState(false);
  const [newWeaponPen, setNewWeaponPen] = useState<PenetrationTier>('none');

  useEffect(() => {
    if (!open) return;
    if (initialPc) {
      setDraft({
        ...initialPc,
        stats: { ...initialPc.stats },
        armor: { ...initialPc.armor },
        weapons: initialPc.weapons.map((w) => ({ ...w })),
      });
    } else {
      setDraft(createEmptySavedPc(lang));
    }
    setNewWeaponName('');
    setNewWeaponDmg('3d6');
    setNewWeaponSilver(false);
    setNewWeaponPen('none');
  }, [open, initialPc, lang]);

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
    if (!newWeaponName.trim()) return;
    const weapon: CombatantWeapon = {
      id: generateId('wpn'),
      name: newWeaponName.trim(),
      damage: newWeaponDmg.trim() || '3d6',
      damageType: 'slashing',
      isSilver: newWeaponSilver,
      penetration: newWeaponPen,
      reliability: 15,
      maxReliability: 15,
      attacksPerRound: 1,
      effectNote: '',
    };
    setDraft((prev) => ({
      ...prev,
      weapons: [...prev.weapons, weapon],
    }));
    setNewWeaponName('');
    setNewWeaponDmg('3d6');
    setNewWeaponSilver(false);
    setNewWeaponPen('none');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned: SavedPartyCharacter = {
      ...draft,
      name: draft.name.trim() || (lang === 'fr' ? 'PJ sans nom' : 'Unnamed PC'),
      playerName: draft.playerName.trim(),
      professionLabel: draft.professionLabel.trim(),
      updatedAt: new Date().toISOString(),
    };
    onSave(cleaned);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? d.editTitle : d.createTitle}</DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
            {/* Identity & Vitals */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.nameLabel}</Label>
                <Input
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.playerLabel}</Label>
                <Input
                  value={draft.playerName}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, playerName: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.professionLabel}</Label>
                <Input
                  value={draft.professionLabel}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      professionLabel: e.target.value,
                    }))
                  }
                  placeholder={lang === 'fr' ? 'Ex. Sorceleur (Loup)' : 'e.g. Witcher'}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.roleLabel}</Label>
                <Select
                  value={draft.role}
                  onValueChange={(v) => {
                    if (v === 'pc' || v === 'ally') {
                      setDraft((prev) => ({ ...prev, role: v }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pc">{copy.roles.pc}</SelectItem>
                    <SelectItem value="ally">{copy.roles.ally}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.maxHpLabel}</Label>
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
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-xs">{d.maxEndLabel}</Label>
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
                />
              </div>
            </div>

            <Separator />

            {/* Characteristics */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.statsTitle}
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
                      className="h-8 text-center font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Per-Location Armor */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.armorTitle}
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
                      className="h-8 font-mono"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Weapons */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d.weaponsTitle}
              </p>
              {draft.weapons.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  {draft.weapons.map((wpn) => (
                    <div
                      key={wpn.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-border px-2.5 py-1.5 text-xs"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-medium">{wpn.name}</span>
                        <Badge variant="outline" className="font-mono">
                          {wpn.damage}
                        </Badge>
                        {wpn.isSilver && (
                          <Badge variant="secondary">
                            {copy.inspector.silverLabel}
                          </Badge>
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

              <div className="flex flex-wrap items-center gap-2">
                <Input
                  value={newWeaponName}
                  onChange={(e) => setNewWeaponName(e.target.value)}
                  placeholder={copy.inspector.weaponNamePlaceholder}
                  className="h-8 min-w-36 flex-1 text-xs"
                />
                <Input
                  value={newWeaponDmg}
                  onChange={(e) => setNewWeaponDmg(e.target.value)}
                  placeholder={copy.inspector.weaponDamagePlaceholder}
                  className="h-8 w-24 font-mono text-xs"
                />
                <Select
                  value={newWeaponPen}
                  onValueChange={(v) => {
                    if (v === 'none' || v === 'normal' || v === 'improved') {
                      setNewWeaponPen(v);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-40 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      {copy.resolver.penetrationTiers.none}
                    </SelectItem>
                    <SelectItem value="normal">
                      {copy.resolver.penetrationTiers.normal}
                    </SelectItem>
                    <SelectItem value="improved">
                      {copy.resolver.penetrationTiers.improved}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1.5">
                  <Switch
                    id="hub-pc-wpn-silver"
                    checked={newWeaponSilver}
                    onCheckedChange={setNewWeaponSilver}
                  />
                  <Label htmlFor="hub-pc-wpn-silver" className="text-xs">
                    {copy.inspector.silverLabel}
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleAddWeapon}
                >
                  <Plus data-icon="inline-start" />
                  <span>{copy.inspector.addWeaponBtn}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-xs">{d.notesLabel}</Label>
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
              {d.cancelBtn}
            </Button>
            <Button type="submit">{d.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
