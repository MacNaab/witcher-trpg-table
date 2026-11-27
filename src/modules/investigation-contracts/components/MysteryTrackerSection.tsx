import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Brain,
  CalendarPlus,
  CheckCircle2,
  Clock,
  Dices,
  Eye,
  EyeOff,
  Minus,
  Moon,
  Pencil,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { loadCombatHubState } from '@/src/modules/combat-tracker/utils/hubStorage';
import {
  CLUE_TYPES,
  COMPLEXITY_TIERS,
  OBSTACLE_TYPES,
} from '../data/investigationData';
import type { InvestigationCopy } from '../i18n';
import type {
  InvestigationLogEntry,
  InvestigationStoreState,
  InvestigatorEntry,
  MysteryCase,
  MysteryClueEntry,
  MysteryObstacleEntry,
} from '../types';
import {
  computeConcentrationMax,
  computeRestRecovery,
  rollDie,
  rollExplodingD10,
} from '../utils/investigationStorage';
import {
  AddClueDialog,
  AddInvestigatorDialog,
  AddObstacleDialog,
  MysteryFormDialog,
} from './MysteryEditorDialog';

interface MysteryTrackerSectionProps {
  store: InvestigationStoreState;
  onUpdateStore: (updater: (prev: InvestigationStoreState) => InvestigationStoreState) => void;
  locale: 'fr' | 'en';
  copy: InvestigationCopy;
}

function nowTimeStamp(): string {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function MysteryTrackerSection({
  store,
  onUpdateStore,
  locale,
  copy,
}: MysteryTrackerSectionProps) {
  const activeMystery =
    store.mysteries.find((m) => m.id === store.activeMysteryId) ??
    store.mysteries[0];

  const [showSecret, setShowSecret] = useState(false);
  const [mysteryModalOpen, setMysteryModalOpen] = useState(false);
  const [editingMystery, setEditingMystery] = useState<MysteryCase | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addClueOpen, setAddClueOpen] = useState(false);
  const [addObstacleOpen, setAddObstacleOpen] = useState(false);
  const [addInvOpen, setAddInvOpen] = useState(false);

  // Active Clue Resolver Dialog
  const [resolvingClue, setResolvingClue] = useState<MysteryClueEntry | null>(null);
  const [selectedInvId, setSelectedInvId] = useState<string>('none');
  const [skillTotal, setSkillTotal] = useState('14');
  const [statMod, setStatMod] = useState('6');
  const [extraTimeUnits, setExtraTimeUnits] = useState('0');
  const [manualRollTotal, setManualRollTotal] = useState('');

  // Active Obstacle Resolver Dialog
  const [resolvingObstacle, setResolvingObstacle] =
    useState<MysteryObstacleEntry | null>(null);
  const [obstacleSkillTotal, setObstacleSkillTotal] = useState('14');
  const [obstacleIncludeCritFail, setObstacleIncludeCritFail] = useState(false);

  // Deduction Check Dialog
  const [deductionOpen, setDeductionOpen] = useState(false);
  const [deductionInvId, setDeductionInvId] = useState<string>('none');
  const [deductionBase, setDeductionBase] = useState('12');

  const clueTypeMap = useMemo(
    () => new Map(CLUE_TYPES.map((ct) => [ct.id, ct])),
    []
  );
  const obstacleTypeMap = useMemo(
    () => new Map(OBSTACLE_TYPES.map((ot) => [ot.id, ot])),
    []
  );

  const tierInfo = COMPLEXITY_TIERS.find((t) => t.id === activeMystery.tier);
  const complexityPercent =
    activeMystery.maxComplexity > 0
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              ((activeMystery.maxComplexity - activeMystery.remainingComplexity) /
                activeMystery.maxComplexity) *
                100
            )
          )
        )
      : 100;

  const isSolved = activeMystery.remainingComplexity <= 0;
  const countdownRemaining =
    activeMystery.countdownTotalDays !== null
      ? activeMystery.countdownTotalDays - (activeMystery.currentDay - 1)
      : null;

  const mutateActiveMystery = (
    mutator: (m: MysteryCase) => MysteryCase
  ) => {
    onUpdateStore((prev) => ({
      ...prev,
      mysteries: prev.mysteries.map((m) =>
        m.id === activeMystery.id
          ? { ...mutator(m), updatedAt: new Date().toISOString() }
          : m
      ),
    }));
  };

  const appendLog = (
    m: MysteryCase,
    kind: InvestigationLogEntry['kind'],
    summary: string
  ): MysteryCase => ({
    ...m,
    logs: [
      {
        id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: nowTimeStamp(),
        kind,
        summary,
      },
      ...m.logs.slice(0, 49),
    ],
  });

  const handleSaveMystery = (payload: {
    id?: string;
    title: string;
    objective: string;
    solutionSecret: string;
    tier: MysteryCase['tier'];
    countdownTotalDays: number | null;
  }) => {
    const newMax =
      COMPLEXITY_TIERS.find((t) => t.id === payload.tier)?.hp ?? 50;

    if (payload.id) {
      onUpdateStore((prev) => ({
        ...prev,
        mysteries: prev.mysteries.map((m) =>
          m.id === payload.id
            ? {
                ...m,
                title: payload.title,
                objective: payload.objective,
                solutionSecret: payload.solutionSecret,
                tier: payload.tier,
                maxComplexity: newMax,
                remainingComplexity: Math.min(m.remainingComplexity, newMax),
                countdownTotalDays: payload.countdownTotalDays,
                updatedAt: new Date().toISOString(),
              }
            : m
        ),
      }));
    } else {
      const created: MysteryCase = {
        id: `mystery-${Date.now()}`,
        title: payload.title,
        objective: payload.objective,
        solutionSecret: payload.solutionSecret,
        tier: payload.tier,
        maxComplexity: newMax,
        remainingComplexity: newMax,
        currentDay: 1,
        countdownTotalDays: payload.countdownTotalDays,
        clues: [],
        obstacles: [],
        logs: [
          {
            id: `log-${Date.now()}`,
            timestamp: nowTimeStamp(),
            kind: 'system',
            summary:
              locale === 'fr'
                ? `Mystère créé (${newMax} Complexité).`
                : `Mystery created (${newMax} Complexity).`,
          },
        ],
        updatedAt: new Date().toISOString(),
      };
      onUpdateStore((prev) => ({
        ...prev,
        activeMysteryId: created.id,
        mysteries: [created, ...prev.mysteries],
      }));
    }
  };

  const handleDeleteMystery = () => {
    if (store.mysteries.length <= 1) return;
    onUpdateStore((prev) => {
      const remaining = prev.mysteries.filter((m) => m.id !== activeMystery.id);
      return {
        ...prev,
        activeMysteryId: remaining[0].id,
        mysteries: remaining,
      };
    });
    setDeleteDialogOpen(false);
  };

  const handleImportFromHub = () => {
    const hub = loadCombatHubState();
    const existingHubIds = new Set(
      store.investigators
        .map((i) => i.hubMemberId)
        .filter((v): v is string => Boolean(v))
    );
    const added: InvestigatorEntry[] = [];

    for (const pc of hub.characters) {
      if (existingHubIds.has(pc.id)) continue;
      const will = pc.stats?.vol ?? 6;
      const intVal = pc.stats?.int ?? 6;
      const maxC = computeConcentrationMax(will, intVal);
      added.push({
        id: `inv-hub-${pc.id}`,
        hubMemberId: pc.id,
        name: pc.name,
        will,
        int: intVal,
        deduction: 3,
        concentration: maxC,
        maxConcentration: maxC,
      });
    }

    if (added.length === 0) {
      toast.info(
        locale === 'fr'
          ? 'Aucun nouveau PJ trouvé dans le Hub MJ.'
          : 'No new PCs found in the Shared GM Hub.'
      );
      return;
    }

    onUpdateStore((prev) => ({
      ...prev,
      investigators: [...prev.investigators, ...added],
    }));
    toast.success(
      locale === 'fr'
        ? `${added.length} PJ importé(s) du Hub.`
        : `${added.length} PC(s) imported from Hub.`
    );
  };

  const handleRestParty = () => {
    onUpdateStore((prev) => ({
      ...prev,
      investigators: prev.investigators.map((inv) => {
        const gain = computeRestRecovery(inv.will, inv.deduction);
        return {
          ...inv,
          concentration: Math.min(inv.maxConcentration, inv.concentration + gain),
        };
      }),
    }));
    mutateActiveMystery((m) =>
      appendLog(
        m,
        'rest',
        locale === 'fr'
          ? 'Nuit de repos (6h+) : Concentration des investigateurs restaurée.'
          : 'Night rest (6h+): Investigator Concentration recovered.'
      )
    );
    toast.success(copy.tracker.restPartyToast);
  };

  const handleAdjustConcentration = (invId: string, delta: number) => {
    onUpdateStore((prev) => ({
      ...prev,
      investigators: prev.investigators.map((inv) =>
        inv.id === invId
          ? {
              ...inv,
              concentration: Math.max(
                0,
                Math.min(inv.maxConcentration, inv.concentration + delta)
              ),
            }
          : inv
      ),
    }));
  };

  const handleRemoveInvestigator = (invId: string) => {
    onUpdateStore((prev) => ({
      ...prev,
      investigators: prev.investigators.filter((inv) => inv.id !== invId),
    }));
  };

  const openClueResolver = (clue: MysteryClueEntry) => {
    setResolvingClue(clue);
    setManualRollTotal('');
    setExtraTimeUnits('0');
    if (store.investigators.length > 0) {
      const firstValid =
        store.investigators.find((i) => i.concentration > 0) ??
        store.investigators[0];
      setSelectedInvId(firstValid.id);
      const clueDef = clueTypeMap.get(clue.clueType);
      const baseStat =
        clueDef?.damageStat === 'INT' ? firstValid.int : 6;
      setStatMod(String(baseStat));
    } else {
      setSelectedInvId('none');
      setStatMod('6');
    }
  };

  const applyClueOutcome = (mode: 'auto' | 'manual_success' | 'manual_fail') => {
    if (!resolvingClue) return;
    const clueDef = clueTypeMap.get(resolvingClue.clueType);
    const inv = store.investigators.find((i) => i.id === selectedInvId) ?? null;

    if (inv && inv.concentration <= 0) {
      toast.error(
        locale === 'fr'
          ? `${inv.name} a 0 Concentration (esprit embrouillé) et doit se reposer avant de faire un Jet de Preuve.`
          : `${inv.name} has 0 Concentration (muddled mind) and must rest before making a Clue check.`
      );
      return;
    }

    const extraBonus = clueDef?.allowExtraTime
      ? Math.max(0, Math.min(3, parseInt(extraTimeUnits, 10) || 0))
      : 0;
    const statBonus = parseInt(statMod, 10) || 0;
    const effectiveDc = resolvingClue.dc + resolvingClue.contaminatedPenalty;

    let succeeded = false;
    let isCritFail = false;
    let rollSummary = '';

    if (mode === 'auto') {
      const parsedManual = parseInt(manualRollTotal, 10);
      if (Number.isFinite(parsedManual) && manualRollTotal.trim() !== '') {
        succeeded = parsedManual + extraBonus >= effectiveDc;
        rollSummary = `${parsedManual}${extraBonus > 0 ? `+${extraBonus}` : ''} vs SD ${effectiveDc}`;
      } else {
        const d10 = rollExplodingD10();
        const base = parseInt(skillTotal, 10) || 0;
        const total = base + extraBonus + d10.total;
        succeeded = total >= effectiveDc;
        isCritFail = d10.isCritFail;
        rollSummary = `${base}+(${d10.rolls.join(',')})${extraBonus > 0 ? `+${extraBonus}` : ''}=${total} vs SD ${effectiveDc}`;
      }
    } else {
      succeeded = mode === 'manual_success';
      rollSummary =
        locale === 'fr'
          ? mode === 'manual_success'
            ? 'Réussite validée MJ'
            : 'Échec validé MJ'
          : mode === 'manual_success'
            ? 'GM Success'
            : 'GM Failure';
    }

    if (succeeded) {
      const dieSides = clueDef?.damageDie === '1d10' ? 10 : 6;
      const dieRoll = rollDie(dieSides);
      const rawDamage = dieRoll + statBonus + extraBonus;
      const finalDamage = Math.max(1, rawDamage - resolvingClue.concealment);

      mutateActiveMystery((m) => {
        const nextRemaining = Math.max(0, m.remainingComplexity - finalDamage);
        const updatedClues = m.clues.map((c) => {
          if (c.id !== resolvingClue.id) return c;
          const nextAttempts = c.attemptsUsed + 1;
          const shouldAutoClose = !c.maxAttempts || nextAttempts >= c.maxAttempts;
          return {
            ...c,
            attemptsUsed: nextAttempts,
            solved: shouldAutoClose ? true : c.solved,
          };
        });
        const actorPrefix = inv ? `${inv.name} · ` : '';
        return appendLog(
          {
            ...m,
            remainingComplexity: nextRemaining,
            clues: updatedClues,
          },
          'clue',
          locale === 'fr'
            ? `${actorPrefix}Preuve « ${resolvingClue.title} » réussie (${rollSummary}) → -${finalDamage} Complexité (${dieRoll}+${statBonus}+${extraBonus} - Dissim. ${resolvingClue.concealment}).`
            : `${actorPrefix}Clue "${resolvingClue.title}" succeeded (${rollSummary}) → -${finalDamage} Complexity (${dieRoll}+${statBonus}+${extraBonus} - Conceal ${resolvingClue.concealment}).`
        );
      });

      toast.success(
        locale === 'fr'
          ? `Preuve recueillie : -${finalDamage} Complexité !`
          : `Clue gathered: -${finalDamage} Complexity!`
      );
    } else {
      const concSides = clueDef?.failConcentrationDie === '1d10' ? 10 : 6;
      const concLoss = rollDie(concSides);

      if (inv) {
        handleAdjustConcentration(inv.id, -concLoss);
      }

      const penaltyNote = isCritFail
        ? ` (${locale === 'fr' ? 'Échec critique !' : 'Critical Fumble!'})`
        : '';

      mutateActiveMystery((m) => {
        const updatedClues = m.clues.map((c) => {
          if (c.id !== resolvingClue.id) return c;
          let extraPen = c.contaminatedPenalty;
          if (
            isCritFail &&
            (c.clueType === 'evidence_analysis' ||
              c.clueType === 'body_examination')
          ) {
            extraPen = Math.max(extraPen, 5);
          } else if (isCritFail && c.clueType === 'scene_examination') {
            extraPen = Math.max(extraPen, 3);
          }
          return {
            ...c,
            attemptsUsed: c.attemptsUsed + 1,
            contaminatedPenalty: extraPen,
          };
        });
        const actorPrefix = inv ? `${inv.name} · ` : '';
        return appendLog(
          { ...m, clues: updatedClues },
          'clue',
          locale === 'fr'
            ? `${actorPrefix}Échec sur « ${resolvingClue.title} » (${rollSummary})${penaltyNote} → -${concLoss} Concentration.`
            : `${actorPrefix}Failed "${resolvingClue.title}" (${rollSummary})${penaltyNote} → -${concLoss} Concentration.`
        );
      });

      toast.warning(
        locale === 'fr'
          ? `Jet de Preuve raté : -${concLoss} Concentration${inv ? ` (${inv.name})` : ''}.`
          : `Clue check failed: -${concLoss} Concentration${inv ? ` (${inv.name})` : ''}.`
      );
    }

    setResolvingClue(null);
  };

  const applyObstacleOutcome = (mode: 'auto' | 'success' | 'fail') => {
    if (!resolvingObstacle) return;
    let succeeded = false;
    let rollNote = '';

    if (mode === 'auto') {
      const d10 = rollExplodingD10();
      const base = parseInt(obstacleSkillTotal, 10) || 0;
      const total = base + d10.total;
      succeeded = total >= resolvingObstacle.dc;
      rollNote = ` (${base}+(${d10.rolls.join(',')})=${total} vs SD ${resolvingObstacle.dc})`;
    } else {
      succeeded = mode === 'success';
    }

    const loss = succeeded ? 2 : rollDie(6) + 2;
    const critExtra = obstacleIncludeCritFail ? 3 : 0;

    if (store.investigators.length > 0) {
      onUpdateStore((prev) => ({
        ...prev,
        investigators: prev.investigators.map((inv, idx) => ({
          ...inv,
          concentration: Math.max(
            0,
            inv.concentration - loss - (idx === 0 ? critExtra : 0)
          ),
        })),
      }));
    }

    mutateActiveMystery((m) =>
      appendLog(
        {
          ...m,
          obstacles: m.obstacles.map((o) =>
            o.id === resolvingObstacle.id
              ? { ...o, resolved: true, outcome: succeeded ? 'success' : 'fail' }
              : o
          ),
        },
        'obstacle',
        locale === 'fr'
          ? `Obstacle « ${resolvingObstacle.title} » (${succeeded ? 'Surmonté' : 'Subi'})${rollNote} → -${loss} Concentration à tous${critExtra ? ' (-3 échec crit.)' : ''}.`
          : `Obstacle "${resolvingObstacle.title}" (${succeeded ? 'Overcome' : 'Failed'})${rollNote} → -${loss} Concentration to all${critExtra ? ' (-3 crit fail)' : ''}.`
      )
    );

    toast.info(
      locale === 'fr'
        ? `Obstacle résolu : -${loss} Concentration aux participants.`
        : `Obstacle resolved: -${loss} Concentration to active investigators.`
    );
    setResolvingObstacle(null);
    setObstacleIncludeCritFail(false);
  };

  const handleRollDeduction = () => {
    const d10 = rollExplodingD10();
    const base = parseInt(deductionBase, 10) || 0;
    const total = base + d10.total;
    const succeeded = total >= 15;
    const concLoss = rollDie(6);

    const inv = store.investigators.find((i) => i.id === deductionInvId) ?? null;
    if (inv) {
      handleAdjustConcentration(inv.id, -concLoss);
    }

    mutateActiveMystery((m) =>
      appendLog(
        m,
        'deduction',
        locale === 'fr'
          ? `${inv ? `${inv.name} · ` : ''}Déduction (${base}+(${d10.rolls.join(',')})=${total} vs SD 15) : ${succeeded ? 'Piste débloquée !' : 'Aucune nouvelle piste.'} (-${concLoss} Concentration).`
          : `${inv ? `${inv.name} · ` : ''}Deduction (${base}+(${d10.rolls.join(',')})=${total} vs DC 15): ${succeeded ? 'Fresh lead unlocked!' : 'No new lead.'} (-${concLoss} Concentration).`
      )
    );

    if (succeeded) {
      toast.success(
        locale === 'fr'
          ? `Déduction réussie (${total} vs SD 15) ! -${concLoss} Concentration.`
          : `Deduction succeeded (${total} vs DC 15)! -${concLoss} Concentration.`
      );
    } else {
      toast.warning(
        locale === 'fr'
          ? `Déduction ratée (${total} vs SD 15). -${concLoss} Concentration.`
          : `Deduction failed (${total} vs DC 15). -${concLoss} Concentration.`
      );
    }
    setDeductionOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar: Mystery Switcher & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-md">
          <Label className="text-xs text-muted-foreground">
            {copy.tracker.activeMysteryLabel}
          </Label>
          <Select
            value={activeMystery.id}
            onValueChange={(id) =>
              id &&
              onUpdateStore((prev) => ({ ...prev, activeMysteryId: id }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {store.mysteries.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.title} ({m.remainingComplexity}/{m.maxComplexity})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setEditingMystery(null);
              setMysteryModalOpen(true);
            }}
            className="whitespace-nowrap shrink-0"
          >
            <Plus data-icon="inline-start" />
            <span>{copy.tracker.newMysteryBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingMystery(activeMystery);
              setMysteryModalOpen(true);
            }}
            className="whitespace-nowrap shrink-0"
          >
            <Pencil data-icon="inline-start" />
            <span>{copy.tracker.editMysteryBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={store.mysteries.length <= 1}
            onClick={() => setDeleteDialogOpen(true)}
            className="whitespace-nowrap shrink-0 text-destructive hover:text-destructive"
          >
            <Trash2 data-icon="inline-start" />
            <span>{copy.tracker.deleteMysteryBtn}</span>
          </Button>
        </div>
      </div>

      {/* Mystery Overview Card */}
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono tabular-nums">
                  {tierInfo?.label[locale]} · {activeMystery.maxComplexity} HP
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {copy.tracker.dayLabel(activeMystery.currentDay)}
                </span>
                {countdownRemaining !== null &&
                  activeMystery.countdownTotalDays !== null && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span
                        className={`inline-flex items-center gap-1 font-mono tabular-nums ${
                          countdownRemaining <= 0
                            ? 'font-semibold text-destructive'
                            : 'text-amber-500'
                        }`}
                      >
                        <Clock className="size-3.5" aria-hidden="true" />
                        {countdownRemaining <= 0
                          ? copy.tracker.countdownExpired
                          : copy.tracker.countdownLabel(
                              countdownRemaining,
                              activeMystery.countdownTotalDays
                            )}
                      </span>
                    </>
                  )}
              </div>
              <CardTitle className="text-lg font-semibold">
                {activeMystery.title}
              </CardTitle>
              {activeMystery.objective && (
                <CardDescription className="text-sm leading-relaxed">
                  <strong className="font-medium text-foreground">
                    {copy.tracker.objectiveLabel} :{' '}
                  </strong>
                  {activeMystery.objective}
                </CardDescription>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {isSolved && (
                <Badge className="gap-1 bg-emerald-600 text-white">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  <span>{copy.tracker.solvedBadge}</span>
                </Badge>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  mutateActiveMystery((m) =>
                    appendLog(
                      { ...m, currentDay: m.currentDay + 1 },
                      'system',
                      locale === 'fr'
                        ? `Passage au Jour ${m.currentDay + 1}.`
                        : `Advanced to Day ${m.currentDay + 1}.`
                    )
                  )
                }
                className="whitespace-nowrap shrink-0"
              >
                <CalendarPlus data-icon="inline-start" />
                <span>{copy.tracker.advanceDayBtn}</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDeductionOpen(true)}
                className="whitespace-nowrap shrink-0"
              >
                <Brain data-icon="inline-start" />
                <span>{copy.tracker.deductionCheckBtn}</span>
              </Button>
            </div>
          </div>

          {activeMystery.solutionSecret && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-muted/30 px-3 py-2 text-xs">
              <div className="flex min-w-0 flex-1 items-start gap-2">
                <span className="shrink-0 font-semibold text-muted-foreground">
                  {copy.tracker.secretSolutionLabel} :
                </span>
                <span className="text-foreground">
                  {showSecret
                    ? activeMystery.solutionSecret
                    : '••••••••••••••••••••••••••••••••'}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSecret((v) => !v)}
                className="h-7 shrink-0 px-2 text-xs"
              >
                {showSecret ? (
                  <EyeOff className="size-3.5" />
                ) : (
                  <Eye className="size-3.5" />
                )}
                <span>
                  {showSecret
                    ? copy.tracker.hideSecretBtn
                    : copy.tracker.showSecretBtn}
                </span>
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-3 border-t border-border/60 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {copy.tracker.complexityLabel} :
              </span>
              <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
                {activeMystery.remainingComplexity} / {activeMystery.maxComplexity}
              </span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                ({complexityPercent}%)
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  mutateActiveMystery((m) => ({
                    ...m,
                    remainingComplexity: Math.max(0, m.remainingComplexity - 5),
                  }))
                }
                className="h-7 px-2 font-mono text-xs"
              >
                -5
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  mutateActiveMystery((m) => ({
                    ...m,
                    remainingComplexity: Math.max(0, m.remainingComplexity - 1),
                  }))
                }
                className="h-7 px-2 font-mono text-xs"
              >
                -1
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  mutateActiveMystery((m) => ({
                    ...m,
                    remainingComplexity: Math.min(
                      m.maxComplexity,
                      m.remainingComplexity + 5
                    ),
                  }))
                }
                className="h-7 px-2 font-mono text-xs"
              >
                +5
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  mutateActiveMystery((m) => ({
                    ...m,
                    remainingComplexity: m.maxComplexity,
                    currentDay: 1,
                    clues: m.clues.map((c) => ({
                      ...c,
                      attemptsUsed: 0,
                      solved: false,
                      contaminatedPenalty: 0,
                    })),
                    obstacles: m.obstacles.map((o) => ({
                      ...o,
                      resolved: false,
                      outcome: undefined,
                    })),
                  }))
                }
                className="h-7 gap-1 px-2 text-xs"
              >
                <RotateCcw className="size-3" />
                <span>{copy.tracker.resetMysteryBtn}</span>
              </Button>
            </div>
          </div>
          <Progress value={complexityPercent} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Main Split: Clues + Obstacles on Left, Investigators + Log on Right */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Clues Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
              <CardTitle className="text-base font-semibold">
                {copy.tracker.cluesSectionTitle}
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAddClueOpen(true)}
                className="whitespace-nowrap shrink-0"
              >
                <Plus data-icon="inline-start" />
                <span>{copy.tracker.addClueBtn}</span>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {activeMystery.clues.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {copy.tracker.noClues}
                </p>
              ) : (
                <div className="divide-y divide-border/70 rounded-md border border-border/80">
                  {activeMystery.clues.map((clue) => {
                    const def = clueTypeMap.get(clue.clueType);
                    return (
                      <div
                        key={clue.id}
                        className={`flex flex-col gap-2 p-3 ${
                          clue.solved ? 'bg-muted/30 opacity-75' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <span
                              className={`text-sm font-medium ${
                                clue.solved
                                  ? 'line-through text-muted-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {clue.title}
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                              <span>{def?.label[locale]}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {copy.tracker.dcTag(
                                  clue.dc + clue.contaminatedPenalty
                                )}
                                {clue.contaminatedPenalty > 0 &&
                                  ` (+${clue.contaminatedPenalty})`}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {copy.tracker.concealmentTag(clue.concealment)}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                {def
                                  ? `${def.damageDie}+${def.damageStat}`
                                  : '1d6'}
                              </span>
                              {clue.attemptsUsed > 0 && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-mono tabular-nums">
                                    {copy.tracker.attemptsTag(
                                      clue.attemptsUsed,
                                      clue.maxAttempts
                                    )}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5">
                            <Button
                              type="button"
                              size="sm"
                              variant={clue.solved ? 'outline' : 'default'}
                              onClick={() => openClueResolver(clue)}
                              className="h-7 whitespace-nowrap px-2.5 text-xs"
                            >
                              <Dices className="size-3.5" />
                              <span>{copy.tracker.resolveClueBtn}</span>
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                mutateActiveMystery((m) => ({
                                  ...m,
                                  clues: m.clues.map((c) =>
                                    c.id === clue.id
                                      ? { ...c, solved: !c.solved }
                                      : c
                                  ),
                                }))
                              }
                              className="h-7 px-2 text-xs"
                            >
                              {clue.solved
                                ? copy.tracker.reopenBtn
                                : copy.tracker.markSolvedBtn}
                            </Button>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              aria-label="Remove clue"
                              onClick={() =>
                                mutateActiveMystery((m) => ({
                                  ...m,
                                  clues: m.clues.filter((c) => c.id !== clue.id),
                                }))
                              }
                              className="size-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>

                        {clue.description && (
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {clue.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Obstacles Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
              <CardTitle className="text-base font-semibold">
                {copy.tracker.obstaclesSectionTitle}
              </CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setAddObstacleOpen(true)}
                className="whitespace-nowrap shrink-0"
              >
                <Plus data-icon="inline-start" />
                <span>{copy.tracker.addObstacleBtn}</span>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {activeMystery.obstacles.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  {copy.tracker.noObstacles}
                </p>
              ) : (
                <div className="divide-y divide-border/70 rounded-md border border-border/80">
                  {activeMystery.obstacles.map((obs) => {
                    const def = obstacleTypeMap.get(obs.obstacleType);
                    return (
                      <div
                        key={obs.id}
                        className={`flex flex-col gap-1.5 p-3 ${
                          obs.resolved ? 'bg-muted/30 opacity-75' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex min-w-0 flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <AlertTriangle
                                className="size-3.5 shrink-0 text-amber-500"
                                aria-hidden="true"
                              />
                              <span
                                className={`text-sm font-medium ${
                                  obs.resolved
                                    ? 'line-through text-muted-foreground'
                                    : ''
                                }`}
                              >
                                {obs.title}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {def?.label[locale]} ·{' '}
                              <span className="font-mono tabular-nums">
                                SD {obs.dc}
                              </span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Button
                              type="button"
                              size="sm"
                              variant={obs.resolved ? 'outline' : 'secondary'}
                              onClick={() => setResolvingObstacle(obs)}
                              className="h-7 whitespace-nowrap px-2.5 text-xs"
                            >
                              <ShieldAlert className="size-3.5" />
                              <span>{copy.tracker.triggerObstacleBtn}</span>
                            </Button>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              aria-label="Remove obstacle"
                              onClick={() =>
                                mutateActiveMystery((m) => ({
                                  ...m,
                                  obstacles: m.obstacles.filter(
                                    (o) => o.id !== obs.id
                                  ),
                                }))
                              }
                              className="size-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>

                        {obs.description && (
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {obs.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Investigator Concentration & Log */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Card>
            <CardHeader className="gap-3 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Users className="size-4 text-primary" aria-hidden="true" />
                  <span>{copy.tracker.investigatorsSectionTitle}</span>
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleImportFromHub}
                  className="whitespace-nowrap shrink-0"
                >
                  <Sparkles data-icon="inline-start" />
                  <span>{copy.tracker.importHubBtn}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAddInvOpen(true)}
                  className="whitespace-nowrap shrink-0"
                >
                  <UserPlus data-icon="inline-start" />
                  <span>{copy.tracker.addInvestigatorBtn}</span>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={store.investigators.length === 0}
                  onClick={handleRestParty}
                  className="whitespace-nowrap shrink-0"
                >
                  <Moon data-icon="inline-start" />
                  <span>{copy.tracker.restPartyBtn}</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              {store.investigators.length === 0 ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {copy.tracker.noInvestigators}
                </p>
              ) : (
                <div className="divide-y divide-border/70 rounded-md border border-border/80">
                  {store.investigators.map((inv) => {
                    const pct =
                      inv.maxConcentration > 0
                        ? Math.round(
                            (inv.concentration / inv.maxConcentration) * 100
                          )
                        : 0;
                    const confused = inv.concentration <= 0;

                    return (
                      <div key={inv.id} className="flex flex-col gap-2 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex min-w-0 flex-col">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-medium text-foreground">
                                {inv.name}
                              </span>
                              {confused && (
                                <Badge variant="destructive" className="text-[10px]">
                                  {copy.tracker.confusedBadge}
                                </Badge>
                              )}
                            </div>
                            <span className="font-mono text-xs text-muted-foreground tabular-nums">
                              {copy.tracker.willIntLabel(
                                inv.will,
                                inv.int,
                                inv.deduction
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="outline"
                              aria-label="Decrease Concentration"
                              onClick={() => handleAdjustConcentration(inv.id, -1)}
                              className="size-7"
                            >
                              <Minus className="size-3" />
                            </Button>
                            <span className="min-w-12 text-center font-mono text-xs font-semibold tabular-nums">
                              {inv.concentration}/{inv.maxConcentration}
                            </span>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="outline"
                              aria-label="Increase Concentration"
                              onClick={() => handleAdjustConcentration(inv.id, 1)}
                              className="size-7"
                            >
                              <Plus className="size-3" />
                            </Button>
                            <Button
                              type="button"
                              size="icon-sm"
                              variant="ghost"
                              aria-label="Remove investigator"
                              onClick={() => handleRemoveInvestigator(inv.id)}
                              className="size-7 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Investigation Log */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
              <CardTitle className="text-base font-semibold">
                {copy.tracker.logSectionTitle}
              </CardTitle>
              {activeMystery.logs.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    mutateActiveMystery((m) => ({ ...m, logs: [] }))
                  }
                  className="h-7 px-2 text-xs"
                >
                  {copy.tracker.clearLogBtn}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {activeMystery.logs.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  {copy.tracker.noLogs}
                </p>
              ) : (
                <ul className="flex max-h-72 flex-col gap-2 overflow-y-auto pr-1 text-xs">
                  {activeMystery.logs.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex items-baseline gap-2 border-b border-border/50 pb-1.5 last:border-b-0"
                    >
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                        {entry.timestamp}
                      </span>
                      <span className="leading-relaxed text-foreground">
                        {entry.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Clue Check Resolver Dialog */}
      <Dialog
        open={Boolean(resolvingClue)}
        onOpenChange={(o) => !o && setResolvingClue(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{copy.resolver.title}</DialogTitle>
            <DialogDescription>
              {resolvingClue
                ? `${resolvingClue.title} · SD ${
                    resolvingClue.dc + resolvingClue.contaminatedPenalty
                  } · ${copy.tracker.concealmentTag(resolvingClue.concealment)}`
                : copy.resolver.description}
            </DialogDescription>
          </DialogHeader>

          {resolvingClue && (
            <div className="flex flex-col gap-3.5">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {copy.resolver.description}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>{copy.resolver.investigatorLabel}</Label>
                  <Select
                    value={selectedInvId}
                    onValueChange={(id) => {
                      if (!id) return;
                      setSelectedInvId(id);
                      const found = store.investigators.find((i) => i.id === id);
                      const def = clueTypeMap.get(resolvingClue.clueType);
                      if (found && def?.damageStat === 'INT') {
                        setStatMod(String(found.int));
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">—</SelectItem>
                      {store.investigators.map((inv) => (
                        <SelectItem key={inv.id} value={inv.id}>
                          {inv.name} ({inv.concentration}/{inv.maxConcentration})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clue-skill-base">
                    {copy.resolver.skillTotalLabel}
                  </Label>
                  <Input
                    id="clue-skill-base"
                    type="number"
                    value={skillTotal}
                    onChange={(e) => setSkillTotal(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clue-stat-mod">
                    {copy.resolver.statModLabel}
                  </Label>
                  <Input
                    id="clue-stat-mod"
                    type="number"
                    value={statMod}
                    onChange={(e) => setStatMod(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clue-extra-time">
                    {copy.resolver.extraTimeLabel}
                  </Label>
                  <Input
                    id="clue-extra-time"
                    type="number"
                    min={0}
                    max={3}
                    disabled={!clueTypeMap.get(resolvingClue.clueType)?.allowExtraTime}
                    value={extraTimeUnits}
                    onChange={(e) => setExtraTimeUnits(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="clue-manual-total">
                  {copy.resolver.manualRollPlaceholder}
                </Label>
                <Input
                  id="clue-manual-total"
                  type="number"
                  placeholder={copy.resolver.manualRollPlaceholder}
                  value={manualRollTotal}
                  onChange={(e) => setManualRollTotal(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => applyClueOutcome('manual_fail')}
            >
              {copy.resolver.manualFailBtn}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => applyClueOutcome('manual_success')}
            >
              {copy.resolver.manualSuccessBtn}
            </Button>
            <Button type="button" onClick={() => applyClueOutcome('auto')}>
              <Dices data-icon="inline-start" />
              <span>{copy.resolver.rollAndResolveBtn}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Obstacle Resolver Dialog */}
      <Dialog
        open={Boolean(resolvingObstacle)}
        onOpenChange={(o) => !o && setResolvingObstacle(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.resolver.obstacleTitle}</DialogTitle>
            <DialogDescription>
              {resolvingObstacle
                ? `${resolvingObstacle.title} · SD ${resolvingObstacle.dc}`
                : copy.resolver.obstacleDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3.5">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {copy.resolver.obstacleDesc}
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="obs-skill-base">
                {copy.resolver.skillTotalLabel}
              </Label>
              <Input
                id="obs-skill-base"
                type="number"
                value={obstacleSkillTotal}
                onChange={(e) => setObstacleSkillTotal(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-foreground">
              <Checkbox
                checked={obstacleIncludeCritFail}
                onCheckedChange={(v) => setObstacleIncludeCritFail(Boolean(v))}
              />
              <span>{copy.resolver.obstacleCritFailCheck}</span>
            </label>
          </div>
          <DialogFooter className="flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => applyObstacleOutcome('fail')}
            >
              {copy.resolver.obstacleFailBtn}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => applyObstacleOutcome('success')}
            >
              {copy.resolver.obstacleSuccessBtn}
            </Button>
            <Button type="button" onClick={() => applyObstacleOutcome('auto')}>
              <Dices data-icon="inline-start" />
              <span>{copy.resolver.obstacleRollBtn}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deduction Check Dialog */}
      <Dialog open={deductionOpen} onOpenChange={setDeductionOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.resolver.deductionTitle}</DialogTitle>
            <DialogDescription>{copy.resolver.deductionDesc}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <Label>{copy.resolver.investigatorLabel}</Label>
              <Select
                value={deductionInvId}
                onValueChange={(id) => {
                  if (!id) return;
                  setDeductionInvId(id);
                  const found = store.investigators.find((i) => i.id === id);
                  if (found) {
                    setDeductionBase(String(found.int + found.deduction));
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">—</SelectItem>
                  {store.investigators.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id}>
                      {inv.name} (INT {inv.int} + Déd. {inv.deduction})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ded-base">INT + Déduction</Label>
              <Input
                id="ded-base"
                type="number"
                value={deductionBase}
                onChange={(e) => setDeductionBase(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeductionOpen(false)}
            >
              {copy.resolver.closeBtn}
            </Button>
            <Button type="button" onClick={handleRollDeduction}>
              <Dices data-icon="inline-start" />
              <span>{copy.resolver.rollDeductionBtn}</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Mystery, Add Clue, Add Obstacle, Add Investigator Dialogs */}
      <MysteryFormDialog
        open={mysteryModalOpen}
        onOpenChange={setMysteryModalOpen}
        initialMystery={editingMystery}
        locale={locale}
        copy={copy.editor}
        onSave={handleSaveMystery}
      />

      <AddClueDialog
        open={addClueOpen}
        onOpenChange={setAddClueOpen}
        locale={locale}
        copy={copy.editor}
        onAdd={(clue) =>
          mutateActiveMystery((m) => ({
            ...m,
            clues: [...m.clues, clue],
          }))
        }
      />

      <AddObstacleDialog
        open={addObstacleOpen}
        onOpenChange={setAddObstacleOpen}
        locale={locale}
        copy={copy.editor}
        onAdd={(obs) =>
          mutateActiveMystery((m) => ({
            ...m,
            obstacles: [...m.obstacles, obs],
          }))
        }
      />

      <AddInvestigatorDialog
        open={addInvOpen}
        onOpenChange={setAddInvOpen}
        copy={copy.editor}
        onAdd={(inv) =>
          onUpdateStore((prev) => ({
            ...prev,
            investigators: [...prev.investigators, inv],
          }))
        }
      />

      {/* Delete Confirmation AlertDialog (never native confirm()) */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {copy.tracker.deleteConfirmTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {copy.tracker.deleteConfirmDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.tracker.cancelBtn}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMystery}>
              {copy.tracker.confirmDeleteBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
