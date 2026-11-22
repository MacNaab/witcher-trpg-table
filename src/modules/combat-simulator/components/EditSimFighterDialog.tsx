import { useEffect, useState } from 'react';
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
import { getCombatSimulatorCopy } from '../i18n';
import type {
  AnatomyType,
  DamageType,
  ModuleLanguage,
  PenetrationTier,
  SimFighterConfig,
  TacticalStance,
} from '../types';

interface EditSimFighterDialogProps {
  fighter: SimFighterConfig | null;
  lang: ModuleLanguage;
  onClose: () => void;
  onSave: (updated: SimFighterConfig) => void;
}

export function EditSimFighterDialog({
  fighter,
  lang,
  onClose,
  onSave,
}: EditSimFighterDialogProps) {
  const copy = getCombatSimulatorCopy(lang);
  const ed = copy.editDialog;
  const cf = copy.addDialog.customForm;

  const [draft, setDraft] = useState<SimFighterConfig | null>(fighter);

  useEffect(() => {
    setDraft(fighter ? { ...fighter, weapon: { ...fighter.weapon } } : null);
  }, [fighter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    onSave(draft);
    onClose();
  };

  return (
    <Dialog
      open={draft !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        {draft && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>{ed.title}</DialogTitle>
              <DialogDescription>{ed.description}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3 text-xs sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-1">
              <div className="text-xs font-semibold text-muted-foreground">
                {ed.statsSection}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="col-span-2 flex flex-col gap-1">
                  <Label>{cf.nameLabel}</Label>
                  <Input
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{copy.teams.qtyLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={draft.quantity}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        quantity: Math.max(1, Math.min(20, Number(e.target.value) || 1)),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.anatomyLabel}</Label>
                  <Select
                    value={draft.anatomy}
                    onValueChange={(v) =>
                      setDraft({ ...draft, anatomy: v as AnatomyType })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{copy.anatomy[draft.anatomy]}</SelectValue>
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
                  <Label>{cf.hpLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.maxHp}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        maxHp: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.endLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.maxEnd}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        maxEnd: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.spLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={draft.armorSp}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        armorSp: Math.max(0, Number(e.target.value) || 0),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.etouLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={draft.etou}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        etou: Math.max(1, Math.min(10, Number(e.target.value) || 1)),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.attackBaseLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.attackBase}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        attackBase: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.defenseBaseLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.defenseBase}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        defenseBase: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.refLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={draft.ref}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        ref: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.stanceLabel}</Label>
                  <Select
                    value={draft.stance}
                    onValueChange={(v) =>
                      setDraft({ ...draft, stance: v as TacticalStance })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>{copy.stances[draft.stance]}</SelectValue>
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
              </div>

              <div className="flex items-center justify-between rounded border border-border px-3 py-2">
                <Label htmlFor="edit-non-silver-res">{cf.nonSilverResistLabel}</Label>
                <Switch
                  id="edit-non-silver-res"
                  checked={draft.resistantToNonSilver}
                  onCheckedChange={(v) =>
                    setDraft({ ...draft, resistantToNonSilver: v })
                  }
                />
              </div>

              <Separator />

              <div className="text-xs font-semibold text-muted-foreground">
                {ed.weaponSection}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="col-span-2 flex flex-col gap-1">
                  <Label>{cf.weaponNameLabel}</Label>
                  <Input
                    value={draft.weapon.name}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: { ...draft.weapon, name: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.weaponDmgLabel}</Label>
                  <Input
                    value={draft.weapon.damageFormula}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: { ...draft.weapon, damageFormula: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{cf.attacksPerRoundLabel}</Label>
                  <Input
                    type="number"
                    min={1}
                    max={4}
                    value={draft.weapon.attacksPerRound}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          attacksPerRound: Math.max(
                            1,
                            Math.min(4, Number(e.target.value) || 1)
                          ),
                        },
                      })
                    }
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <Label>{cf.damageTypeLabel}</Label>
                  <Select
                    value={draft.weapon.damageType}
                    onValueChange={(v) =>
                      setDraft({
                        ...draft,
                        weapon: { ...draft.weapon, damageType: v as DamageType },
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {copy.damageTypes[draft.weapon.damageType]}
                      </SelectValue>
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

                <div className="col-span-2 flex flex-col gap-1">
                  <Label>{cf.penetrationLabel}</Label>
                  <Select
                    value={draft.weapon.penetration}
                    onValueChange={(v) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          penetration: v as PenetrationTier,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {copy.penetration[draft.weapon.penetration]}
                      </SelectValue>
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

                <div className="flex flex-col gap-1">
                  <Label>{ed.bleedChanceLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.weapon.bleedChance}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          bleedChance: Math.max(
                            0,
                            Math.min(100, Number(e.target.value) || 0)
                          ),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{ed.burnChanceLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.weapon.burnChance}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          burnChance: Math.max(
                            0,
                            Math.min(100, Number(e.target.value) || 0)
                          ),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{ed.poisonChanceLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.weapon.poisonChance}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          poisonChance: Math.max(
                            0,
                            Math.min(100, Number(e.target.value) || 0)
                          ),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>{ed.stunChanceLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={draft.weapon.stunChance}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        weapon: {
                          ...draft.weapon,
                          stunChance: Math.max(
                            0,
                            Math.min(100, Number(e.target.value) || 0)
                          ),
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded border border-border px-3 py-2">
                  <Label htmlFor="edit-silver">{cf.isSilverLabel}</Label>
                  <Switch
                    id="edit-silver"
                    checked={draft.weapon.isSilver}
                    onCheckedChange={(v) =>
                      setDraft({
                        ...draft,
                        weapon: { ...draft.weapon, isSilver: v },
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between rounded border border-border px-3 py-2">
                  <Label htmlFor="edit-ranged">{ed.isRangedLabel}</Label>
                  <Switch
                    id="edit-ranged"
                    checked={draft.weapon.isRanged}
                    onCheckedChange={(v) =>
                      setDraft({
                        ...draft,
                        weapon: { ...draft.weapon, isRanged: v },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {ed.cancelBtn}
              </Button>
              <Button type="submit">{ed.saveBtn}</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
