import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { Textarea } from '@/components/ui/textarea';
import {
  CLUE_TYPES,
  COMPLEXITY_TIERS,
  CONCEALMENT_TIERS,
  OBSTACLE_TYPES,
} from '../data/investigationData';
import type { InvestigationCopy } from '../i18n';
import type {
  ClueConcealmentLevel,
  ClueTypeId,
  InvestigatorEntry,
  MysteryCase,
  MysteryClueEntry,
  MysteryComplexityTierId,
  MysteryObstacleEntry,
  ObstacleTypeId,
} from '../types';
import { computeConcentrationMax } from '../utils/investigationStorage';

interface MysteryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMystery: MysteryCase | null;
  locale: 'fr' | 'en';
  copy: InvestigationCopy['editor'];
  onSave: (payload: {
    id?: string;
    title: string;
    objective: string;
    solutionSecret: string;
    tier: MysteryComplexityTierId;
    countdownTotalDays: number | null;
  }) => void;
}

export function MysteryFormDialog({
  open,
  onOpenChange,
  initialMystery,
  locale,
  copy,
  onSave,
}: MysteryFormDialogProps) {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [solutionSecret, setSolutionSecret] = useState('');
  const [tier, setTier] = useState<MysteryComplexityTierId>('moderate');
  const [countdownInput, setCountdownInput] = useState('');

  useEffect(() => {
    if (!open) return;
    if (initialMystery) {
      setTitle(initialMystery.title);
      setObjective(initialMystery.objective);
      setSolutionSecret(initialMystery.solutionSecret);
      setTier(initialMystery.tier);
      setCountdownInput(
        initialMystery.countdownTotalDays !== null
          ? String(initialMystery.countdownTotalDays)
          : ''
      );
    } else {
      setTitle('');
      setObjective('');
      setSolutionSecret('');
      setTier('moderate');
      setCountdownInput('');
    }
  }, [initialMystery, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const parsedCountdown = parseInt(countdownInput, 10);
    const countdownTotalDays =
      Number.isFinite(parsedCountdown) && parsedCountdown > 0
        ? parsedCountdown
        : null;

    onSave({
      id: initialMystery?.id,
      title: title.trim(),
      objective: objective.trim(),
      solutionSecret: solutionSecret.trim(),
      tier,
      countdownTotalDays,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialMystery ? copy.editTitle : copy.createTitle}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mystery-title">{copy.titleLabel}</Label>
            <Input
              id="mystery-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mystery-objective">{copy.objectiveLabel}</Label>
            <Textarea
              id="mystery-objective"
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mystery-secret">{copy.solutionLabel}</Label>
            <Textarea
              id="mystery-secret"
              rows={2}
              value={solutionSecret}
              onChange={(e) => setSolutionSecret(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>{copy.tierLabel}</Label>
              <Select
                value={tier}
                onValueChange={(v) => setTier(v as MysteryComplexityTierId)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPLEXITY_TIERS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label[locale]} ({t.hp})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mystery-countdown">{copy.countdownLabel}</Label>
              <Input
                id="mystery-countdown"
                type="number"
                min={1}
                placeholder={copy.countdownPlaceholder}
                value={countdownInput}
                onChange={(e) => setCountdownInput(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {copy.cancelBtn}
            </Button>
            <Button type="submit">{copy.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddClueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: 'fr' | 'en';
  copy: InvestigationCopy['editor'];
  onAdd: (clue: MysteryClueEntry) => void;
}

export function AddClueDialog({
  open,
  onOpenChange,
  locale,
  copy,
  onAdd,
}: AddClueDialogProps) {
  const [title, setTitle] = useState('');
  const [clueType, setClueType] = useState<ClueTypeId>('scene_examination');
  const [dc, setDc] = useState('14');
  const [concealment, setConcealment] = useState<ClueConcealmentLevel>(0);
  const [maxAttempts, setMaxAttempts] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setClueType('scene_examination');
    setDc('14');
    setConcealment(0);
    setMaxAttempts('');
    setDescription('');
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const parsedMax = parseInt(maxAttempts, 10);
    onAdd({
      id: `clue-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: title.trim(),
      clueType,
      dc: Math.max(5, parseInt(dc, 10) || 14),
      concealment,
      description: description.trim(),
      attemptsUsed: 0,
      maxAttempts:
        Number.isFinite(parsedMax) && parsedMax > 0 ? parsedMax : undefined,
      solved: false,
      contaminatedPenalty: 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{copy.addClueTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clue-title">{copy.clueTitleLabel}</Label>
            <Input
              id="clue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>{copy.clueTypeLabel}</Label>
              <Select
                value={clueType}
                onValueChange={(v) => setClueType(v as ClueTypeId)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLUE_TYPES.map((ct) => (
                    <SelectItem key={ct.id} value={ct.id}>
                      {ct.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{copy.clueConcealmentLabel}</Label>
              <Select
                value={String(concealment)}
                onValueChange={(v) =>
                  setConcealment(Number(v) as ClueConcealmentLevel)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONCEALMENT_TIERS.map((ct) => (
                    <SelectItem key={ct.value} value={String(ct.value)}>
                      {ct.label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="clue-dc">{copy.clueDcLabel}</Label>
              <Input
                id="clue-dc"
                type="number"
                min={5}
                max={35}
                value={dc}
                onChange={(e) => setDc(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="clue-max">{copy.clueMaxAttemptsLabel}</Label>
              <Input
                id="clue-max"
                type="number"
                min={1}
                placeholder="—"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clue-desc">{copy.clueDescLabel}</Label>
            <Textarea
              id="clue-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {copy.cancelBtn}
            </Button>
            <Button type="submit">{copy.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddObstacleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: 'fr' | 'en';
  copy: InvestigationCopy['editor'];
  onAdd: (obstacle: MysteryObstacleEntry) => void;
}

export function AddObstacleDialog({
  open,
  onOpenChange,
  locale,
  copy,
  onAdd,
}: AddObstacleDialogProps) {
  const [obstacleType, setObstacleType] = useState<ObstacleTypeId>('weather');
  const [title, setTitle] = useState('');
  const [dc, setDc] = useState('14');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    setObstacleType('weather');
    setTitle('');
    setDc('14');
    setDescription('');
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = OBSTACLE_TYPES.find((o) => o.id === obstacleType);
    onAdd({
      id: `obs-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      obstacleType,
      title: title.trim() || (chosen ? chosen.label[locale] : 'Obstacle'),
      dc: Math.max(5, parseInt(dc, 10) || 14),
      description:
        description.trim() || (chosen ? chosen.example[locale] : ''),
      resolved: false,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.addObstacleTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label>{copy.obstacleTypeLabel}</Label>
            <Select
              value={obstacleType}
              onValueChange={(v) => setObstacleType(v as ObstacleTypeId)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OBSTACLE_TYPES.map((ot) => (
                  <SelectItem key={ot.id} value={ot.id}>
                    {ot.label[locale]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="obs-title">{copy.obstacleTitleLabel}</Label>
              <Input
                id="obs-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="obs-dc">{copy.obstacleDcLabel}</Label>
              <Input
                id="obs-dc"
                type="number"
                min={5}
                max={30}
                value={dc}
                onChange={(e) => setDc(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="obs-desc">{copy.obstacleDescLabel}</Label>
            <Textarea
              id="obs-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {copy.cancelBtn}
            </Button>
            <Button type="submit">{copy.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AddInvestigatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  copy: InvestigationCopy['editor'];
  onAdd: (inv: InvestigatorEntry) => void;
}

export function AddInvestigatorDialog({
  open,
  onOpenChange,
  copy,
  onAdd,
}: AddInvestigatorDialogProps) {
  const [name, setName] = useState('');
  const [will, setWill] = useState('6');
  const [intVal, setIntVal] = useState('6');
  const [deduction, setDeduction] = useState('3');

  useEffect(() => {
    if (!open) return;
    setName('');
    setWill('6');
    setIntVal('6');
    setDeduction('3');
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const w = Math.max(1, parseInt(will, 10) || 6);
    const i = Math.max(1, parseInt(intVal, 10) || 6);
    const d = Math.max(0, parseInt(deduction, 10) || 0);
    const maxC = computeConcentrationMax(w, i);
    onAdd({
      id: `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      will: w,
      int: i,
      deduction: d,
      concentration: maxC,
      maxConcentration: maxC,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.addInvestigatorTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-name">{copy.invNameLabel}</Label>
            <Input
              id="inv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-will">{copy.invWillLabel}</Label>
              <Input
                id="inv-will"
                type="number"
                min={1}
                max={20}
                value={will}
                onChange={(e) => setWill(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-int">{copy.invIntLabel}</Label>
              <Input
                id="inv-int"
                type="number"
                min={1}
                max={20}
                value={intVal}
                onChange={(e) => setIntVal(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="inv-ded">{copy.invDeductionLabel}</Label>
              <Input
                id="inv-ded"
                type="number"
                min={0}
                max={15}
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {copy.cancelBtn}
            </Button>
            <Button type="submit">{copy.saveBtn}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
