import { useState } from 'react';
import {
  BarChart3,
  Clock,
  Copy,
  History,
  Play,
  Plus,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SharedGmHubSection } from '@/src/modules/combat-tracker/components/SharedGmHubSection';
import type {
  CombatHubState,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import { formatSessionTimestamp } from '@/src/modules/combat-tracker/utils/hubStorage';
import { getCombatSimulatorCopy } from '../i18n';
import type {
  LethalityRating,
  ModuleLanguage,
  SavedSimulationSession,
  SimFighterConfig,
  TeamSide,
} from '../types';

interface SimHubPanelProps {
  hubState: CombatHubState;
  sessions: readonly SavedSimulationSession[];
  lang: ModuleLanguage;
  onSavePc: (pc: SavedPartyCharacter) => void;
  onDeletePc: (pcId: string) => void;
  onSaveGroup: (group: SavedCombatGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onSaveNpc: (npc: SavedCustomNpc) => void;
  onDeleteNpc: (npcId: string) => void;
  onSaveMonster: (monster: SavedCustomMonster) => void;
  onDeleteMonster: (monsterId: string) => void;
  onCreateEmptySimulation: () => void;
  onLaunchPresetSimulation: (
    presetId: 'witcherVsGhouls' | 'partyVsGriffin' | 'patrolVsBandits'
  ) => void;
  onSimulateGroup: (group: SavedCombatGroup, team: TeamSide) => void;
  onSimulatePc: (pc: SavedPartyCharacter, team: TeamSide) => void;
  onSimulateNpc: (npc: SavedCustomNpc, team: TeamSide) => void;
  onSimulateMonster: (monster: SavedCustomMonster, team: TeamSide) => void;
  onOpenSession: (sessionId: string) => void;
  onDuplicateSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

const LETHALITY_CLASSES: Record<LethalityRating, string> = {
  trivial: 'text-emerald-600 dark:text-emerald-400',
  favorable: 'text-emerald-600 dark:text-emerald-400',
  balanced: 'text-amber-600 dark:text-amber-400',
  risky: 'text-orange-600 dark:text-orange-400',
  deadly: 'text-destructive',
};

function summarizeRoster(roster: readonly SimFighterConfig[], emptyLabel: string): string {
  if (roster.length === 0) return emptyLabel;
  return roster
    .map((f) => (f.quantity > 1 ? `×${f.quantity} ${f.name}` : f.name))
    .join(', ');
}

export function SimHubPanel({
  hubState,
  sessions,
  lang,
  onSavePc,
  onDeletePc,
  onSaveGroup,
  onDeleteGroup,
  onSaveNpc,
  onDeleteNpc,
  onSaveMonster,
  onDeleteMonster,
  onCreateEmptySimulation,
  onLaunchPresetSimulation,
  onSimulateGroup,
  onSimulatePc,
  onSimulateNpc,
  onSimulateMonster,
  onOpenSession,
  onDuplicateSession,
  onDeleteSession,
}: SimHubPanelProps) {
  const copy = getCombatSimulatorCopy(lang);
  const [sessionToDelete, setSessionToDelete] =
    useState<SavedSimulationSession | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Intro Hero Card */}
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg font-semibold">
              {lang === 'fr'
                ? 'Hub & Historique de simulation'
                : 'Simulation Hub & History'}
            </CardTitle>
            <CardDescription>
              {lang === 'fr'
                ? 'Retrouvez vos simulations passées, lancez un scénario type ou utilisez le Hub MJ partagé (PJ, Groupes, PNJ et Monstres).'
                : 'Reopen past statistical simulations, launch quick scenarios, or manage your shared GM Hub library.'}
            </CardDescription>
            <p className="mt-1 font-mono text-xs text-muted-foreground tabular-nums">
              {sessions.length} {lang === 'fr' ? 'simulation(s)' : 'simulation(s)'}
              <span aria-hidden="true"> · </span>
              {hubState.characters.length} PJ
              <span aria-hidden="true"> · </span>
              {hubState.groups.length}{' '}
              {lang === 'fr' ? 'groupe(s)' : 'group(s)'}
              <span aria-hidden="true"> · </span>
              {hubState.customNpcs.length} {lang === 'fr' ? 'PNJ' : 'NPCs'}
              <span aria-hidden="true"> · </span>
              {hubState.customMonsters.length}{' '}
              {lang === 'fr' ? 'monstre(s)' : 'monster(s)'}
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={onCreateEmptySimulation}
            className="shrink-0 self-start sm:self-center"
          >
            <BarChart3 data-icon="inline-start" />
            <span>
              {lang === 'fr' ? 'Nouvelle simulation' : 'New Simulation'}
            </span>
          </Button>
        </CardHeader>

        <CardContent className="border-t border-border pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {copy.header.presetsLabel} :
            </span>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => onLaunchPresetSimulation('witcherVsGhouls')}
            >
              {copy.presets.witcherVsGhouls}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => onLaunchPresetSimulation('partyVsGriffin')}
            >
              {copy.presets.partyVsGriffin}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => onLaunchPresetSimulation('patrolVsBandits')}
            >
              {copy.presets.patrolVsBandits}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Dedicated Simulation History */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <History className="size-4 text-primary" aria-hidden="true" />
            <CardTitle className="text-base font-semibold">
              {lang === 'fr'
                ? 'Historique des simulations'
                : 'Simulation History'}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {lang === 'fr'
              ? 'Historique propre au simulateur : rouvrez n’importe quelle configuration passée pour ajuster les effectifs ou relancer les statistiques.'
              : 'Dedicated simulation history: reopen any previous matchup to tweak rosters or re-run Monte-Carlo statistics.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
              <History
                className="size-8 text-muted-foreground/60"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">
                  {lang === 'fr'
                    ? 'Aucune simulation enregistrée'
                    : 'No simulations recorded yet'}
                </p>
                <p className="max-w-md text-xs text-muted-foreground">
                  {lang === 'fr'
                    ? 'Créez une nouvelle simulation ou lancez un scénario ci-dessus pour conserver son historique ici.'
                    : 'Create a new simulation or launch a quick preset above to track its results here.'}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={onCreateEmptySimulation}
              >
                <Plus data-icon="inline-start" />
                <span>
                  {lang === 'fr' ? 'Nouvelle simulation' : 'New Simulation'}
                </span>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {sessions.map((sim) => {
                const emptyTeam = lang === 'fr' ? 'Vide' : 'Empty';
                const teamAStr = summarizeRoster(sim.teamA, emptyTeam);
                const teamBStr = summarizeRoster(sim.teamB, emptyTeam);
                const rep = sim.lastReport;

                return (
                  <div
                    key={sim.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card p-3.5"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-foreground">
                          {sim.title}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="size-3" aria-hidden="true" />
                          <span>
                            {formatSessionTimestamp(sim.updatedAt, lang)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            {sim.settings.iterations} {lang === 'fr' ? 'combats' : 'runs'}
                          </span>
                        </p>
                      </div>

                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {teamAStr}
                        </span>
                        <span className="mx-1.5 text-muted-foreground">vs</span>
                        <span className="font-medium text-foreground">
                          {teamBStr}
                        </span>
                      </p>

                      {rep ? (
                        <p className="font-mono text-xs tabular-nums">
                          <span className="font-semibold text-foreground">
                            A: {rep.teamAWinRate.toFixed(1)}%
                          </span>
                          <span className="text-muted-foreground" aria-hidden="true">
                            {' · '}
                          </span>
                          <span className={LETHALITY_CLASSES[rep.lethality]}>
                            {copy.report.lethalityLabels[rep.lethality]}
                          </span>
                          <span className="text-muted-foreground" aria-hidden="true">
                            {' · '}
                          </span>
                          <span className="text-muted-foreground">
                            {rep.avgRounds.toFixed(1)} rds
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {lang === 'fr'
                            ? 'En attente de calcul'
                            : 'Not executed yet'}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-1.5 border-t border-border pt-2.5">
                      <Button
                        type="button"
                        size="xs"
                        onClick={() => onOpenSession(sim.id)}
                      >
                        <Play data-icon="inline-start" />
                        <span>{lang === 'fr' ? 'Ouvrir' : 'Open'}</span>
                      </Button>

                      <div className="flex items-center gap-0.5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => onDuplicateSession(sim.id)}
                          title={lang === 'fr' ? 'Dupliquer' : 'Duplicate'}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setSessionToDelete(sim)}
                          title={lang === 'fr' ? 'Supprimer' : 'Delete'}
                        >
                          <Trash2 className="size-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Shared GM Hub Library (Synchronized with Combat Tracker) */}
      <SharedGmHubSection
        mode="simulator"
        hubState={hubState}
        lang={lang}
        onSavePc={onSavePc}
        onDeletePc={onDeletePc}
        onSaveGroup={onSaveGroup}
        onDeleteGroup={onDeleteGroup}
        onSaveNpc={onSaveNpc}
        onDeleteNpc={onDeleteNpc}
        onSaveMonster={onSaveMonster}
        onDeleteMonster={onDeleteMonster}
        onSimulateGroup={onSimulateGroup}
        onSimulatePc={onSimulatePc}
        onSimulateNpc={onSimulateNpc}
        onSimulateMonster={onSimulateMonster}
      />

      {/* Delete Simulation Confirmation Dialog */}
      <Dialog
        open={sessionToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setSessionToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {sessionToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {lang === 'fr'
                    ? 'Supprimer cette simulation ?'
                    : 'Delete this simulation?'}
                </DialogTitle>
                <DialogDescription>
                  {lang === 'fr'
                    ? `La simulation « ${sessionToDelete.title} » et son rapport statistique seront supprimés de l’historique (vos PJ, groupes, PNJ et monstres du Hub restent intacts).`
                    : `Simulation “${sessionToDelete.title}” and its saved report will be permanently removed (your Shared Hub library stays safe).`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSessionToDelete(null)}
                >
                  {lang === 'fr' ? 'Annuler' : 'Cancel'}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeleteSession(sessionToDelete.id);
                    toast.success(
                      lang === 'fr'
                        ? `Simulation « ${sessionToDelete.title} » supprimée.`
                        : `Simulation “${sessionToDelete.title}” deleted.`
                    );
                    setSessionToDelete(null);
                  }}
                >
                  {lang === 'fr' ? 'Supprimer' : 'Delete'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
