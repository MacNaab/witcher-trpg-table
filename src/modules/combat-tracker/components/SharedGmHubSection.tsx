import { useRef, useState } from 'react';
import {
  ChevronDown,
  Copy,
  Edit3,
  FolderPlus,
  Play,
  Plus,
  Shield,
  Skull,
  Trash2,
  Upload,
  UserCheck,
  UserPlus,
  Users,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BESTIARY_CORE_RULES } from '@/src/data/bestiary';
import { parseImportedCharacterJson } from '@/src/modules/character-generator/utils/characterCalculations';
import { ARCHETYPE_PRESETS } from '../data/combatRulesData';
import { getCombatTrackerCopy } from '../i18n';
import type {
  CombatHubState,
  ModuleLanguage,
  SavedCombatGroup,
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '../types';
import { generateId } from '../utils/combatEngine';
import {
  createSavedPcFromCharacterSheet,
  createSavedPcFromPreset,
  describeGroupMember,
} from '../utils/hubStorage';
import { EditCombatGroupDialog } from './EditCombatGroupDialog';
import { EditCustomMonsterDialog } from './EditCustomMonsterDialog';
import { EditCustomNpcDialog } from './EditCustomNpcDialog';
import { EditSavedPcDialog } from './EditSavedPcDialog';

interface SharedGmHubSectionProps {
  mode: 'combat' | 'simulator';
  hubState: CombatHubState;
  lang: ModuleLanguage;
  onSavePc: (pc: SavedPartyCharacter) => void;
  onDeletePc: (pcId: string) => void;
  onSaveGroup: (group: SavedCombatGroup) => void;
  onDeleteGroup: (groupId: string) => void;
  onSaveNpc: (npc: SavedCustomNpc) => void;
  onDeleteNpc: (npcId: string) => void;
  onSaveMonster: (monster: SavedCustomMonster) => void;
  onDeleteMonster: (monsterId: string) => void;
  /** Combat Tracker action on a Group */
  onLaunchEncounterWithGroup?: (group: SavedCombatGroup) => void;
  /** Combat Simulator quick-launch / inject actions */
  onSimulateGroup?: (group: SavedCombatGroup, team: 'teamA' | 'teamB') => void;
  onSimulatePc?: (pc: SavedPartyCharacter, team: 'teamA' | 'teamB') => void;
  onSimulateNpc?: (npc: SavedCustomNpc, team: 'teamA' | 'teamB') => void;
  onSimulateMonster?: (
    monster: SavedCustomMonster,
    team: 'teamA' | 'teamB'
  ) => void;
}

/**
 * Unified Shared GM Hub Library synchronized between Combat Tracker & Combat Simulator:
 * - Player Characters & Companions (PJ)
 * - Reusable Encounter Groups
 * - Custom Profession-based NPCs (PNJ)
 * - Custom Bestiary Monsters
 */
export function SharedGmHubSection({
  mode,
  hubState,
  lang,
  onSavePc,
  onDeletePc,
  onSaveGroup,
  onDeleteGroup,
  onSaveNpc,
  onDeleteNpc,
  onSaveMonster,
  onDeleteMonster,
  onLaunchEncounterWithGroup,
  onSimulateGroup,
  onSimulatePc,
  onSimulateNpc,
  onSimulateMonster,
}: SharedGmHubSectionProps) {
  const copy = getCombatTrackerCopy(lang);
  const h = copy.hub;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pcDialogOpen, setPcDialogOpen] = useState(false);
  const [editingPc, setEditingPc] = useState<SavedPartyCharacter | null>(null);
  const [pcToDelete, setPcToDelete] = useState<SavedPartyCharacter | null>(null);

  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<SavedCombatGroup | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<SavedCombatGroup | null>(
    null
  );

  const [npcDialogOpen, setNpcDialogOpen] = useState(false);
  const [editingNpc, setEditingNpc] = useState<SavedCustomNpc | null>(null);
  const [npcToDelete, setNpcToDelete] = useState<SavedCustomNpc | null>(null);

  const [monsterDialogOpen, setMonsterDialogOpen] = useState(false);
  const [editingMonster, setEditingMonster] =
    useState<SavedCustomMonster | null>(null);
  const [monsterToDelete, setMonsterToDelete] =
    useState<SavedCustomMonster | null>(null);

  const handleImportJsonFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseImportedCharacterJson(text);
      if (!parsed) {
        toast.error(copy.addDialog.importJsonError);
        return;
      }
      const savedPc = createSavedPcFromCharacterSheet(parsed, lang);
      onSavePc(savedPc);
      toast.success(h.pcSavedToast(savedPc.name));
    } catch {
      toast.error(copy.addDialog.importJsonError);
    }
  };

  const handleDuplicatePc = (pc: SavedPartyCharacter) => {
    const clone: SavedPartyCharacter = {
      ...pc,
      id: generateId('hubpc'),
      name: `${pc.name} (2)`,
      stats: { ...pc.stats },
      armor: { ...pc.armor },
      weapons: pc.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
      updatedAt: new Date().toISOString(),
    };
    onSavePc(clone);
    toast.success(h.pcSavedToast(clone.name));
  };

  const handleDuplicateGroup = (group: SavedCombatGroup) => {
    const clone: SavedCombatGroup = {
      ...group,
      id: generateId('grp'),
      name: `${group.name} (2)`,
      members: group.members.map((m) => ({ ...m, id: generateId('gm') })),
      updatedAt: new Date().toISOString(),
    };
    onSaveGroup(clone);
    toast.success(h.groupSavedToast(clone.name));
  };

  const handleDuplicateNpc = (npc: SavedCustomNpc) => {
    const clone: SavedCustomNpc = {
      ...npc,
      id: generateId('npc'),
      name: `${npc.name} (2)`,
      stats: { ...npc.stats },
      armor: { ...npc.armor },
      weapons: npc.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
      updatedAt: new Date().toISOString(),
    };
    onSaveNpc(clone);
    toast.success(
      lang === 'fr'
        ? `PNJ « ${clone.name} » enregistré dans le Hub.`
        : `NPC “${clone.name}” saved to Hub.`
    );
  };

  const handleDuplicateMonster = (mon: SavedCustomMonster) => {
    const clone: SavedCustomMonster = {
      ...mon,
      id: generateId('mon'),
      name: `${mon.name} (2)`,
      stats: { ...mon.stats },
      vulnerabilities: [...mon.vulnerabilities],
      resistances: [...mon.resistances],
      immunities: [...mon.immunities],
      abilities: [...mon.abilities],
      weapons: mon.weapons.map((w) => ({ ...w, id: generateId('wpn') })),
      updatedAt: new Date().toISOString(),
    };
    onSaveMonster(clone);
    toast.success(
      lang === 'fr'
        ? `Monstre « ${clone.name} » enregistré dans le Hub.`
        : `Monster “${clone.name}” saved to Hub.`
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-foreground">
          {lang === 'fr'
            ? 'Hub MJ en commun · Combat & Simulation'
            : 'Shared GM Hub · Combat & Simulation'}
        </h2>
        <p className="text-xs text-muted-foreground">
          {lang === 'fr'
            ? 'Toutes vos fiches PJ, groupes, PNJ et monstres créés ici sont synchronisés automatiquement entre le Gestionnaire de combats et le Simulateur.'
            : 'All PCs, groups, profession-based NPCs, and custom monsters created here stay synchronized between Combat Tracker and Combat Simulator.'}
        </p>
      </div>

      {/* Row 1: Saved PCs & Reusable Combat Groups */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Saved PCs */}
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-col gap-3 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-primary" aria-hidden="true" />
                <CardTitle className="text-base font-semibold">
                  {h.pcsTitle}
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={handleImportJsonFile}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload data-icon="inline-start" />
                  <span>{h.importJsonBtn}</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button type="button" variant="outline" size="xs" />}
                  >
                    <span>{h.presetDropdownBtn}</span>
                    <ChevronDown data-icon="inline-end" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {ARCHETYPE_PRESETS.map((preset) => (
                      <DropdownMenuItem
                        key={preset.id}
                        onClick={() => {
                          const pc = createSavedPcFromPreset(preset, lang);
                          onSavePc(pc);
                          toast.success(h.pcSavedToast(pc.name));
                        }}
                      >
                        <UserPlus className="size-4" />
                        <span>{preset.name[lang]}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  type="button"
                  size="xs"
                  onClick={() => {
                    setEditingPc(null);
                    setPcDialogOpen(true);
                  }}
                >
                  <Plus data-icon="inline-start" />
                  <span>{h.newPcBtn}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {hubState.characters.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <Users
                  className="size-8 text-muted-foreground/60"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    {h.emptyPcsTitle}
                  </p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    {h.emptyPcsDesc}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setEditingPc(null);
                    setPcDialogOpen(true);
                  }}
                >
                  <Plus data-icon="inline-start" />
                  <span>{h.newPcBtn}</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {hubState.characters.map((pc) => {
                  const torsoSp = pc.armor.torso ?? 0;
                  return (
                    <div
                      key={pc.id}
                      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {pc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {[copy.roles[pc.role], pc.professionLabel, pc.playerName]
                              .filter(Boolean)
                              .join(' · ') || '—'}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1">
                          {mode === 'simulator' && onSimulatePc && (
                            <>
                              <Button
                                type="button"
                                variant="secondary"
                                size="xs"
                                onClick={() => onSimulatePc(pc, 'teamA')}
                              >
                                {lang === 'fr' ? 'Simuler (Éq. A)' : 'Sim (Team A)'}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="xs"
                                onClick={() => onSimulatePc(pc, 'teamB')}
                              >
                                {lang === 'fr' ? 'Éq. B' : 'Team B'}
                              </Button>
                            </>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => {
                              setEditingPc(pc);
                              setPcDialogOpen(true);
                            }}
                            title={h.editBtn}
                          >
                            <Edit3 data-icon="inline-start" />
                            <span>{h.editBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDuplicatePc(pc)}
                            title={h.duplicateBtn}
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setPcToDelete(pc)}
                            title={h.deleteBtn}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-2 font-mono text-xs text-muted-foreground tabular-nums">
                        <span>PS {pc.maxHp}</span>
                        <span aria-hidden="true">·</span>
                        <span>END {pc.maxEnd}</span>
                        <span aria-hidden="true">·</span>
                        <span>RÉF {pc.stats.ref}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Shield className="size-3" />
                          PA {torsoSp}
                        </span>
                        {pc.weapons.length > 0 && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>
                              {pc.weapons.length}{' '}
                              {lang === 'fr' ? 'arme(s)' : 'weapon(s)'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT: Reusable Combat Groups */}
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <FolderPlus className="size-4 text-primary" aria-hidden="true" />
              <CardTitle className="text-base font-semibold">
                {h.groupsTitle}
              </CardTitle>
            </div>
            <Button
              type="button"
              size="xs"
              onClick={() => {
                setEditingGroup(null);
                setGroupDialogOpen(true);
              }}
            >
              <Plus data-icon="inline-start" />
              <span>{h.newGroupBtn}</span>
            </Button>
          </CardHeader>

          <CardContent className="pt-0">
            {hubState.groups.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <FolderPlus
                  className="size-8 text-muted-foreground/60"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    {h.emptyGroupsTitle}
                  </p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    {h.emptyGroupsDesc}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setEditingGroup(null);
                    setGroupDialogOpen(true);
                  }}
                >
                  <Plus data-icon="inline-start" />
                  <span>{h.newGroupBtn}</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {hubState.groups.map((group) => {
                  const totalUnits = group.members.reduce(
                    (sum, m) => sum + (m.kind === 'saved-pc' ? 1 : m.quantity),
                    0
                  );
                  return (
                    <div
                      key={group.id}
                      className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {group.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-mono tabular-nums">
                              {h.groupMembersCount(totalUnits)}
                            </span>
                            <span aria-hidden="true"> · </span>
                            <span>
                              {group.groupInitiative
                                ? h.groupInitBadge
                                : h.individualInitBadge}
                            </span>
                            {group.description && (
                              <>
                                <span aria-hidden="true"> · </span>
                                <span>{group.description}</span>
                              </>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => {
                              setEditingGroup(group);
                              setGroupDialogOpen(true);
                            }}
                          >
                            <Edit3 data-icon="inline-start" />
                            <span>{h.editBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDuplicateGroup(group)}
                            title={h.duplicateBtn}
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setGroupToDelete(group)}
                            title={h.deleteBtn}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      {group.members.length > 0 && (
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {group.members
                            .map((m) => {
                              const info = describeGroupMember(
                                m,
                                hubState.characters,
                                lang,
                                hubState.customNpcs,
                                hubState.customMonsters
                              );
                              return `${info.badge} ${info.label}`;
                            })
                            .join(' · ')}
                        </p>
                      )}

                      <div className="flex flex-wrap justify-end gap-1.5 border-t border-border pt-2">
                        {mode === 'combat' && onLaunchEncounterWithGroup && (
                          <Button
                            type="button"
                            size="xs"
                            onClick={() => onLaunchEncounterWithGroup(group)}
                            disabled={group.members.length === 0}
                          >
                            <Play data-icon="inline-start" />
                            <span>{h.startNewEncounterBtn}</span>
                          </Button>
                        )}
                        {mode === 'simulator' && onSimulateGroup && (
                          <>
                            <Button
                              type="button"
                              size="xs"
                              onClick={() => onSimulateGroup(group, 'teamA')}
                              disabled={group.members.length === 0}
                            >
                              <Play data-icon="inline-start" />
                              <span>
                                {lang === 'fr'
                                  ? 'Simuler (Éq. A)'
                                  : 'Simulate (Team A)'}
                              </span>
                            </Button>
                            <Button
                              type="button"
                              size="xs"
                              variant="outline"
                              onClick={() => onSimulateGroup(group, 'teamB')}
                              disabled={group.members.length === 0}
                            >
                              <span>
                                {lang === 'fr'
                                  ? 'Simuler (Éq. B)'
                                  : 'Simulate (Team B)'}
                              </span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Profession-Based NPCs & Custom Bestiary Monsters */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* LEFT: Profession-Based Custom NPCs */}
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="size-4 text-primary" aria-hidden="true" />
                <CardTitle className="text-base font-semibold">
                  {lang === 'fr'
                    ? 'PNJ sur mesure (Professions)'
                    : 'Custom NPCs (Professions)'}
                </CardTitle>
              </div>
              <CardDescription className="mt-0.5 text-xs">
                {lang === 'fr'
                  ? 'Alliés, rivaux et boss humanoïdes générés depuis les 15 professions de PJ.'
                  : 'Allies, rivals, and humanoid bosses built from all 15 PC professions.'}
              </CardDescription>
            </div>
            <Button
              type="button"
              size="xs"
              onClick={() => {
                setEditingNpc(null);
                setNpcDialogOpen(true);
              }}
            >
              <Plus data-icon="inline-start" />
              <span>{lang === 'fr' ? 'Nouveau PNJ' : 'New NPC'}</span>
            </Button>
          </CardHeader>

          <CardContent className="pt-0">
            {hubState.customNpcs.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <UserCheck
                  className="size-8 text-muted-foreground/60"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    {lang === 'fr'
                      ? 'Aucun PNJ personnalisé'
                      : 'No custom NPCs saved yet'}
                  </p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    {lang === 'fr'
                      ? 'Créez des PNJ basés sur les professions (Sorceleur, Mage, Homme d’armes, Criminel…) réutilisables en combat et en simulation.'
                      : 'Create profession-based NPCs (Witcher, Mage, Man at Arms, Criminal…) reusable across combat and simulation.'}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setEditingNpc(null);
                    setNpcDialogOpen(true);
                  }}
                >
                  <Plus data-icon="inline-start" />
                  <span>{lang === 'fr' ? 'Créer un PNJ' : 'Create NPC'}</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {hubState.customNpcs.map((npc) => (
                  <div
                    key={npc.id}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">
                          {npc.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[npc.professionLabel, copy.roles[npc.role]]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1">
                        {mode === 'simulator' && onSimulateNpc && (
                          <>
                            <Button
                              type="button"
                              variant="secondary"
                              size="xs"
                              onClick={() => onSimulateNpc(npc, 'teamA')}
                            >
                              {lang === 'fr' ? 'Éq. A' : 'Team A'}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="xs"
                              onClick={() => onSimulateNpc(npc, 'teamB')}
                            >
                              {lang === 'fr' ? 'Éq. B' : 'Team B'}
                            </Button>
                          </>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          size="xs"
                          onClick={() => {
                            setEditingNpc(npc);
                            setNpcDialogOpen(true);
                          }}
                        >
                          <Edit3 data-icon="inline-start" />
                          <span>{h.editBtn}</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleDuplicateNpc(npc)}
                          title={h.duplicateBtn}
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => setNpcToDelete(npc)}
                          title={h.deleteBtn}
                        >
                          <Trash2 className="size-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-border pt-2 font-mono text-xs text-muted-foreground tabular-nums">
                      <span>PS {npc.maxHp}</span>
                      <span aria-hidden="true">·</span>
                      <span>PA {npc.armor.torso ?? 0}</span>
                      <span aria-hidden="true">·</span>
                      <span>Att {npc.attackBase}</span>
                      <span aria-hidden="true">·</span>
                      <span>Déf {npc.defenseBase}</span>
                      {npc.weapons[0] && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="truncate text-foreground">
                            {npc.weapons[0].name} ({npc.weapons[0].damage})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* RIGHT: Custom Bestiary Monsters */}
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Skull className="size-4 text-primary" aria-hidden="true" />
                <CardTitle className="text-base font-semibold">
                  {lang === 'fr'
                    ? 'Monstres du Bestiaire (MJ)'
                    : 'Custom Bestiary Monsters'}
                </CardTitle>
              </div>
              <CardDescription className="mt-0.5 text-xs">
                {lang === 'fr'
                  ? 'Créatures originales, boss et variantes maison partagés avec le Bestiaire de combat.'
                  : 'Original creatures, bosses, and variants shared across combat & simulation.'}
              </CardDescription>
            </div>
            <Button
              type="button"
              size="xs"
              onClick={() => {
                setEditingMonster(null);
                setMonsterDialogOpen(true);
              }}
            >
              <Plus data-icon="inline-start" />
              <span>{lang === 'fr' ? 'Nouveau monstre' : 'New Monster'}</span>
            </Button>
          </CardHeader>

          <CardContent className="pt-0">
            {hubState.customMonsters.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center">
                <Skull
                  className="size-8 text-muted-foreground/60"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    {lang === 'fr'
                      ? 'Aucun monstre personnalisé'
                      : 'No custom monsters created yet'}
                  </p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    {lang === 'fr'
                      ? 'Ajoutez vos propres monstres ou variantes de boss avec leurs attaques, armure et résistances.'
                      : 'Create custom monsters or boss variants with their own attacks, armor, and resistances.'}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setEditingMonster(null);
                    setMonsterDialogOpen(true);
                  }}
                >
                  <Plus data-icon="inline-start" />
                  <span>
                    {lang === 'fr' ? 'Créer un monstre' : 'Create Monster'}
                  </span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {hubState.customMonsters.map((mon) => {
                  const catTitle =
                    BESTIARY_CORE_RULES.categories.find(
                      (c) => c.typeId === mon.typeId
                    )?.rulebookTitle[lang] ?? mon.typeId;
                  return (
                    <div
                      key={mon.id}
                      className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">
                            {mon.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {[catTitle, mon.threatLabel]
                              .filter(Boolean)
                              .join(' · ')}
                            {mon.resistantToNonSilver && (
                              <>
                                <span aria-hidden="true"> · </span>
                                <span className="text-amber-600 dark:text-amber-400">
                                  {lang === 'fr'
                                    ? 'Rés. non-argent'
                                    : 'Non-silver res.'}
                                </span>
                              </>
                            )}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1">
                          {mode === 'simulator' && onSimulateMonster && (
                            <>
                              <Button
                                type="button"
                                variant="secondary"
                                size="xs"
                                onClick={() => onSimulateMonster(mon, 'teamB')}
                              >
                                {lang === 'fr' ? 'Simuler (Éq. B)' : 'Sim (Team B)'}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="xs"
                                onClick={() => onSimulateMonster(mon, 'teamA')}
                              >
                                {lang === 'fr' ? 'Éq. A' : 'Team A'}
                              </Button>
                            </>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="xs"
                            onClick={() => {
                              setEditingMonster(mon);
                              setMonsterDialogOpen(true);
                            }}
                          >
                            <Edit3 data-icon="inline-start" />
                            <span>{h.editBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => handleDuplicateMonster(mon)}
                            title={h.duplicateBtn}
                          >
                            <Copy className="size-3.5" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => setMonsterToDelete(mon)}
                            title={h.deleteBtn}
                          >
                            <Trash2 className="size-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 border-t border-border pt-2 font-mono text-xs text-muted-foreground tabular-nums">
                        <span>PS {mon.maxHp}</span>
                        <span aria-hidden="true">·</span>
                        <span>PA {mon.armorSp}</span>
                        <span aria-hidden="true">·</span>
                        <span>Att {mon.attackBase}</span>
                        <span aria-hidden="true">·</span>
                        <span>Déf {mon.defenseBase}</span>
                        {mon.weapons[0] && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="truncate text-foreground">
                              {mon.weapons[0].name} ({mon.weapons[0].damage})
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create / Edit Saved PC Dialog */}
      <EditSavedPcDialog
        open={pcDialogOpen}
        onOpenChange={setPcDialogOpen}
        initialPc={editingPc}
        lang={lang}
        onSave={(pc) => {
          onSavePc(pc);
          toast.success(h.pcSavedToast(pc.name));
        }}
      />

      {/* Create / Edit Group Dialog */}
      <EditCombatGroupDialog
        open={groupDialogOpen}
        onOpenChange={setGroupDialogOpen}
        initialGroup={editingGroup}
        savedCharacters={hubState.characters}
        customNpcs={hubState.customNpcs}
        customMonsters={hubState.customMonsters}
        lang={lang}
        onSave={(group) => {
          onSaveGroup(group);
          toast.success(h.groupSavedToast(group.name));
        }}
      />

      {/* Create / Edit Custom NPC Dialog */}
      <EditCustomNpcDialog
        open={npcDialogOpen}
        onOpenChange={setNpcDialogOpen}
        initialNpc={editingNpc}
        lang={lang}
        onSave={(npc) => {
          onSaveNpc(npc);
          toast.success(
            lang === 'fr'
              ? `PNJ « ${npc.name} » enregistré dans le Hub.`
              : `NPC “${npc.name}” saved to Hub.`
          );
        }}
      />

      {/* Create / Edit Custom Monster Dialog */}
      <EditCustomMonsterDialog
        open={monsterDialogOpen}
        onOpenChange={setMonsterDialogOpen}
        initialMonster={editingMonster}
        lang={lang}
        onSave={(mon) => {
          onSaveMonster(mon);
          toast.success(
            lang === 'fr'
              ? `Monstre « ${mon.name} » enregistré dans le Hub.`
              : `Monster “${mon.name}” saved to Hub.`
          );
        }}
      />

      {/* Delete PC Confirmation */}
      <Dialog
        open={pcToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPcToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {pcToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>{h.deletePcTitle}</DialogTitle>
                <DialogDescription>
                  {h.deletePcDesc(pcToDelete.name)}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPcToDelete(null)}
                >
                  {copy.toolbar.resetCancel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeletePc(pcToDelete.id);
                    toast.success(h.pcDeletedToast(pcToDelete.name));
                    setPcToDelete(null);
                  }}
                >
                  {h.deleteBtn}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Group Confirmation */}
      <Dialog
        open={groupToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setGroupToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {groupToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>{h.deleteGroupTitle}</DialogTitle>
                <DialogDescription>
                  {h.deleteGroupDesc(groupToDelete.name)}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setGroupToDelete(null)}
                >
                  {copy.toolbar.resetCancel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeleteGroup(groupToDelete.id);
                    toast.success(h.groupDeletedToast(groupToDelete.name));
                    setGroupToDelete(null);
                  }}
                >
                  {h.deleteBtn}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Custom NPC Confirmation */}
      <Dialog
        open={npcToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setNpcToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {npcToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {lang === 'fr'
                    ? 'Supprimer ce PNJ du Hub ?'
                    : 'Delete this NPC from Hub?'}
                </DialogTitle>
                <DialogDescription>
                  {lang === 'fr'
                    ? `Le profil « ${npcToDelete.name} » sera supprimé du Hub partagé et détaché des groupes associés.`
                    : `“${npcToDelete.name}” will be removed from the shared GM Hub and detached from saved groups.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNpcToDelete(null)}
                >
                  {copy.toolbar.resetCancel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeleteNpc(npcToDelete.id);
                    toast.success(
                      lang === 'fr'
                        ? `PNJ « ${npcToDelete.name} » supprimé.`
                        : `NPC “${npcToDelete.name}” deleted.`
                    );
                    setNpcToDelete(null);
                  }}
                >
                  {h.deleteBtn}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Custom Monster Confirmation */}
      <Dialog
        open={monsterToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setMonsterToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {monsterToDelete && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {lang === 'fr'
                    ? 'Supprimer ce monstre du Hub ?'
                    : 'Delete this custom monster?'}
                </DialogTitle>
                <DialogDescription>
                  {lang === 'fr'
                    ? `La fiche « ${monsterToDelete.name} » sera supprimée du Hub partagé et retirée des groupes associés.`
                    : `“${monsterToDelete.name}” will be removed from the shared GM Hub and detached from saved groups.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMonsterToDelete(null)}
                >
                  {copy.toolbar.resetCancel}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    onDeleteMonster(monsterToDelete.id);
                    toast.success(
                      lang === 'fr'
                        ? `Monstre « ${monsterToDelete.name} » supprimé.`
                        : `Monster “${monsterToDelete.name}” deleted.`
                    );
                    setMonsterToDelete(null);
                  }}
                >
                  {h.deleteBtn}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
