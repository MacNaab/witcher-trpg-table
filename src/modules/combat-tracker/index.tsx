import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Swords } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { CombatRulesReferencePanel } from './components/CombatRulesReferencePanel';
import { GmHubPanel } from './components/GmHubPanel';
import { SelectedCombatWorkspace } from './components/SelectedCombatWorkspace';
import { getCombatTrackerCopy } from './i18n';
import type {
  CombatHubState,
  EncounterStatus,
  ModuleLanguage,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedEncounterSession,
  SavedPartyCharacter,
} from './types';
import {
  createInitialCombatState,
  createLogEntry,
  generateId,
  sortCombatantsByInitiative,
} from './utils/combatEngine';
import {
  createEncounterSession,
  loadCombatHubState,
  loadCombatSessions,
  resolveGroupToCombatants,
  saveCombatHubState,
  saveCombatSessions,
} from './utils/hubStorage';

/**
 * Modular entry point for the Witcher TRPG Combat Tracker.
 * Follows a Hub-first architecture (matching Travel Manager):
 * - Default view (`selectedSessionId === null`): Game Master Hub displaying saved/past
 *   encounters (resume or inspect logs), persistent PCs, and reusable Combat Groups.
 * - Selected view (`selectedSessionId !== null`): Active turn-by-turn Combat Workspace.
 */
export default function CombatTrackerModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('combat-tracker');
  const moduleCopy = t.modules['combat-tracker'];
  const copy = getCombatTrackerCopy(lang);
  const Icon = definition.icon;

  const [hubState, setHubState] = useState<CombatHubState>(() =>
    loadCombatHubState()
  );
  const [sessions, setSessions] = useState<SavedEncounterSession[]>(() =>
    loadCombatSessions(lang)
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    () => launchIntent?.sessionId ?? null
  );
  const [hubViewTab, setHubViewTab] = useState<'hub' | 'rules'>(() =>
    launchIntent?.tab === 'rules' && !launchIntent?.sessionId ? 'rules' : 'hub'
  );

  useEffect(() => {
    if (!launchIntent) return;
    if (launchIntent.sessionId) {
      setSessions(loadCombatSessions(lang));
      setSelectedSessionId(launchIntent.sessionId);
    } else if (launchIntent.tab === 'hub') {
      setHubState(loadCombatHubState());
      setSelectedSessionId(null);
      setHubViewTab('hub');
    } else if (launchIntent.tab === 'rules') {
      setSelectedSessionId(null);
      setHubViewTab('rules');
    }
  }, [launchIntent, lang]);

  useEffect(() => {
    saveCombatHubState(hubState);
  }, [hubState]);

  useEffect(() => {
    saveCombatSessions(sessions);
  }, [sessions]);

  const selectedSession = useMemo(
    () =>
      selectedSessionId
        ? (sessions.find((s) => s.id === selectedSessionId) ?? null)
        : null,
    [selectedSessionId, sessions]
  );

  // --- GM Hub PC & Group CRUD ---
  const handleSavePc = (pc: SavedPartyCharacter) => {
    setHubState((prev) => {
      const exists = prev.characters.some((c) => c.id === pc.id);
      return {
        ...prev,
        characters: exists
          ? prev.characters.map((c) => (c.id === pc.id ? pc : c))
          : [pc, ...prev.characters],
      };
    });
  };

  const handleDeletePc = (pcId: string) => {
    setHubState((prev) => ({
      ...prev,
      characters: prev.characters.filter((c) => c.id !== pcId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'saved-pc' && m.pcId === pcId)
        ),
      })),
    }));
  };

  const handleSaveGroup = (group: SavedCombatGroup) => {
    setHubState((prev) => {
      const exists = prev.groups.some((g) => g.id === group.id);
      return {
        ...prev,
        groups: exists
          ? prev.groups.map((g) => (g.id === group.id ? group : g))
          : [group, ...prev.groups],
      };
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setHubState((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== groupId),
    }));
  };

  const handleSaveNpc = (npc: SavedCustomNpc) => {
    setHubState((prev) => {
      const exists = prev.customNpcs.some((n) => n.id === npc.id);
      return {
        ...prev,
        customNpcs: exists
          ? prev.customNpcs.map((n) => (n.id === npc.id ? npc : n))
          : [npc, ...prev.customNpcs],
      };
    });
  };

  const handleDeleteNpc = (npcId: string) => {
    setHubState((prev) => ({
      ...prev,
      customNpcs: prev.customNpcs.filter((n) => n.id !== npcId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'custom-npc' && m.npcId === npcId)
        ),
      })),
    }));
  };

  const handleSaveMonster = (monster: SavedCustomMonster) => {
    setHubState((prev) => {
      const exists = prev.customMonsters.some((m) => m.id === monster.id);
      return {
        ...prev,
        customMonsters: exists
          ? prev.customMonsters.map((m) => (m.id === monster.id ? monster : m))
          : [monster, ...prev.customMonsters],
      };
    });
  };

  const handleDeleteMonster = (monsterId: string) => {
    setHubState((prev) => ({
      ...prev,
      customMonsters: prev.customMonsters.filter((m) => m.id !== monsterId),
      groups: prev.groups.map((grp) => ({
        ...grp,
        members: grp.members.filter(
          (m) => !(m.kind === 'custom-monster' && m.monsterId === monsterId)
        ),
      })),
    }));
  };

  // --- Encounter Session Lifecycle ---
  const handleCreateEmptyEncounter = () => {
    const newSession = createEncounterSession({
      title: copy.workspace.defaultUntitled,
      status: 'active',
      state: createInitialCombatState(),
      lang,
    });
    setSessions((prev) => [newSession, ...prev]);
    setSelectedSessionId(newSession.id);
    toast.success(copy.sessions.createdToast(newSession.title));
  };

  const handleLaunchEncounterWithGroup = (group: SavedCombatGroup) => {
    const resolved = resolveGroupToCombatants(
      group,
      hubState.characters,
      lang,
      {
        customNpcs: hubState.customNpcs,
        customMonsters: hubState.customMonsters,
      }
    );
    if (resolved.length === 0) {
      toast.warning(copy.hub.groupEmptyWarning);
      return;
    }

    const sorted = sortCombatantsByInitiative(resolved);

    const newSession = createEncounterSession({
      title: group.name,
      status: 'active',
      state: {
        ...createInitialCombatState(),
        round: 0,
        encounterTitle: group.name,
        activeCombatantId: null,
        combatants: sorted,
        logs: [
          createLogEntry(
            0,
            'system',
            copy.hub.groupAddedToast(group.name, sorted.length)
          ),
        ],
      },
      lang,
    });

    setSessions((prev) => [newSession, ...prev]);
    setSelectedSessionId(newSession.id);
    toast.success(copy.hub.groupAddedToast(group.name, sorted.length));
  };

  const handleUpdateSession = (
    sessionId: string,
    updater: (prev: SavedEncounterSession) => SavedEncounterSession
  ) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? updater(s) : s))
    );
  };

  const handleUpdateSessionStatus = (
    sessionId: string,
    status: EncounterStatus
  ) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, status, updatedAt: new Date().toISOString() }
          : s
      )
    );
  };

  const handleDuplicateSession = (sessionId: string) => {
    const target = sessions.find((s) => s.id === sessionId);
    if (!target) return;
    const now = new Date().toISOString();
    const cloneTitle = `${target.title} (2)`;
    const clone: SavedEncounterSession = {
      ...target,
      id: generateId('enc'),
      title: cloneTitle,
      status: 'paused',
      createdAt: now,
      updatedAt: now,
      state: {
        ...target.state,
        encounterTitle: cloneTitle,
        combatants: target.state.combatants.map((c) => ({
          ...c,
          conditions: [...c.conditions],
          criticalWounds: [...c.criticalWounds],
          weapons: c.weapons.map((w) => ({ ...w })),
          armor: {
            head: { ...c.armor.head },
            torso: { ...c.armor.torso },
            rightArm: { ...c.armor.rightArm },
            leftArm: { ...c.armor.leftArm },
            rightLeg: { ...c.armor.rightLeg },
            leftLeg: { ...c.armor.leftLeg },
          },
        })),
        logs: target.state.logs.map((l) => ({ ...l })),
      },
    };
    setSessions((prev) => [clone, ...prev]);
    toast.success(copy.sessions.duplicatedToast(cloneTitle));
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (selectedSessionId === sessionId) {
      setSelectedSessionId(null);
    }
  };

  return (
    <section
      aria-labelledby="module-heading-combat-tracker"
      className="mx-auto flex w-full max-w-7xl flex-col gap-6"
    >
      {/* Module Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t.nav.groups[definition.group]}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {copy.header.moduleTag}
              </span>
            </div>
            <h1
              id="module-heading-combat-tracker"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {moduleCopy.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {moduleCopy.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="shrink-0 self-start"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator />

      {selectedSession ? (
        <SelectedCombatWorkspace
          key={selectedSession.id}
          session={selectedSession}
          hubState={hubState}
          lang={lang}
          onBackToHub={() => setSelectedSessionId(null)}
          onUpdateSession={handleUpdateSession}
        />
      ) : (
        <Tabs
          value={hubViewTab}
          onValueChange={(v) => {
            if (v === 'hub' || v === 'rules') setHubViewTab(v);
          }}
          className="flex flex-col gap-5"
        >
          <TabsList className="w-fit">
            <TabsTrigger value="hub" className="gap-2 px-3 py-1.5">
              <Swords className="size-4" aria-hidden="true" />
              <span>{copy.hub.hubTab}</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="gap-2 px-3 py-1.5">
              <BookOpen className="size-4" aria-hidden="true" />
              <span>{copy.hub.gmScreenTab}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hub">
            <GmHubPanel
              hubState={hubState}
              sessions={sessions}
              lang={lang}
              onSavePc={handleSavePc}
              onDeletePc={handleDeletePc}
              onSaveGroup={handleSaveGroup}
              onDeleteGroup={handleDeleteGroup}
              onSaveNpc={handleSaveNpc}
              onDeleteNpc={handleDeleteNpc}
              onSaveMonster={handleSaveMonster}
              onDeleteMonster={handleDeleteMonster}
              onCreateEmptyEncounter={handleCreateEmptyEncounter}
              onLaunchEncounterWithGroup={handleLaunchEncounterWithGroup}
              onOpenSession={(sessionId) => setSelectedSessionId(sessionId)}
              onUpdateSessionStatus={handleUpdateSessionStatus}
              onDuplicateSession={handleDuplicateSession}
              onDeleteSession={handleDeleteSession}
            />
          </TabsContent>

          <TabsContent value="rules">
            <CombatRulesReferencePanel lang={lang} />
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}
