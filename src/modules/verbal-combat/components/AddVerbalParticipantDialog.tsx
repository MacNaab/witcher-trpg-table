import { useEffect, useState } from 'react';
import { Plus, UserPlus, Users } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { SavedPartyCharacter } from '@/src/modules/combat-tracker/types';
import { loadCombatHubState } from '@/src/modules/combat-tracker/utils/hubStorage';
import {
  RELATIONSHIP_META,
  VERBAL_NPC_ARCHETYPES,
} from '../data/verbalRulesData';
import { getVerbalCombatCopy } from '../i18n';
import type {
  ModuleLanguage,
  RelationshipTier,
  VerbalParticipant,
  VerbalRole,
} from '../types';
import {
  calculateMaxResolve,
  createCustomVerbalParticipant,
  createVerbalParticipantFromArchetype,
  createVerbalParticipantFromHubPc,
  loadCharGenDraftForVerbal,
} from '../utils/verbalEngine';

interface AddVerbalParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  onAddParticipant: (participant: VerbalParticipant) => void;
}

/**
 * Dialog for adding participants from Shared GM Hub PCs, Active PC Sheet Draft,
 * Witcher Continent NPC Archetypes, or a Custom Social Profile.
 */
export function AddVerbalParticipantDialog({
  open,
  onOpenChange,
  lang,
  onAddParticipant,
}: AddVerbalParticipantDialogProps) {
  const copy = getVerbalCombatCopy(lang);
  const aCopy = copy.addDialog;

  const [hubPcs, setHubPcs] = useState<SavedPartyCharacter[]>([]);
  const [draftPc, setDraftPc] = useState<VerbalParticipant | null>(null);

  const [customName, setCustomName] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customRole, setCustomRole] = useState<VerbalRole>('opponent');
  const [customAttitude, setCustomAttitude] =
    useState<RelationshipTier>('neutral');
  const [customEmp, setCustomEmp] = useState(6);
  const [customInt, setCustomInt] = useState(6);
  const [customVol, setCustomVol] = useState(6);
  const [customSkillLevel, setCustomSkillLevel] = useState(4);

  useEffect(() => {
    if (!open) return;
    setHubPcs(loadCombatHubState().characters);
    setDraftPc(loadCharGenDraftForVerbal(lang));
  }, [lang, open]);

  const handleAdd = (participant: VerbalParticipant) => {
    onAddParticipant(participant);
    toast.success(aCopy.addedToast(participant.name));
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    handleAdd(
      createCustomVerbalParticipant({
        name: customName,
        role: customRole,
        titleLabel: customTitle,
        relationship: customAttitude,
        emp: customEmp,
        int: customInt,
        vol: customVol,
        skillBaseline: customSkillLevel,
      })
    );
    setCustomName('');
    setCustomTitle('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="size-4 text-primary" aria-hidden="true" />
            <span>{aCopy.title}</span>
          </DialogTitle>
          <DialogDescription>{aCopy.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="hub" className="w-full gap-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hub">{aCopy.tabs.hub}</TabsTrigger>
            <TabsTrigger value="archetypes">{aCopy.tabs.archetypes}</TabsTrigger>
            <TabsTrigger value="custom">{aCopy.tabs.custom}</TabsTrigger>
          </TabsList>

          {/* Tab 1: Shared GM Hub & CharGen Draft */}
          <TabsContent value="hub" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {aCopy.importDraftTitle}
              </span>
              {draftPc ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {draftPc.name}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground tabular-nums">
                      EMP {draftPc.stats.emp} · INT {draftPc.stats.int} ·{' '}
                      {copy.participant.resolveLabel} {draftPc.maxResolve}
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      const fresh = loadCharGenDraftForVerbal(lang);
                      if (fresh) handleAdd(fresh);
                    }}
                  >
                    <Plus data-icon="inline-start" />
                    <span>{aCopy.addPcBtn}</span>
                  </Button>
                </div>
              ) : (
                <p className="rounded-md border border-dashed border-border py-3 text-center text-xs text-muted-foreground">
                  {aCopy.noDraftHint}
                </p>
              )}
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Users className="size-3.5 text-primary" aria-hidden="true" />
                <span>{aCopy.hubPcsTitle}</span>
              </div>
              {hubPcs.length === 0 ? (
                <p className="rounded-md border border-dashed border-border py-4 text-center text-xs text-muted-foreground">
                  {aCopy.noHubPcsHint}
                </p>
              ) : (
                <ScrollArea className="h-52 pr-2">
                  <div className="flex flex-col gap-2">
                    {hubPcs.map((pc) => {
                      const resolveVal = calculateMaxResolve(
                        pc.stats.int,
                        pc.stats.vol
                      );
                      return (
                        <div
                          key={pc.id}
                          className="flex items-center justify-between gap-3 rounded-lg border border-border p-2.5"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-foreground">
                              {pc.name}
                            </div>
                            <div className="font-mono text-xs text-muted-foreground tabular-nums">
                              {pc.professionLabel || copy.roles[pc.role]} · INT{' '}
                              {pc.stats.int} · {copy.participant.resolveLabel}{' '}
                              {resolveVal}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleAdd(createVerbalParticipantFromHubPc(pc))
                            }
                          >
                            <Plus data-icon="inline-start" />
                            <span>{aCopy.addPcBtn}</span>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>
          </TabsContent>

          {/* Tab 2: NPC Archetypes */}
          <TabsContent value="archetypes">
            <ScrollArea className="h-72 pr-2">
              <div className="flex flex-col gap-2">
                {VERBAL_NPC_ARCHETYPES.map((arch) => {
                  const res = calculateMaxResolve(
                    arch.stats.int,
                    arch.stats.vol
                  );
                  return (
                    <div
                      key={arch.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">
                          {arch.label[lang]}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground tabular-nums">
                          {copy.roles[arch.role]} · EMP {arch.stats.emp} ·{' '}
                          {copy.participant.resolveLabel} {res} ·{' '}
                          {RELATIONSHIP_META[arch.relationship].label[lang]}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {arch.notes[lang]}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleAdd(
                            createVerbalParticipantFromArchetype(arch, lang)
                          )
                        }
                        className="shrink-0"
                      >
                        <Plus data-icon="inline-start" />
                        <span>{aCopy.addPcBtn}</span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Tab 3: Custom Social Profile */}
          <TabsContent value="custom">
            <form onSubmit={handleCreateCustom} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="vb-custom-name">{aCopy.nameLabel}</Label>
                  <Input
                    id="vb-custom-name"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={aCopy.namePlaceholder}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="vb-custom-title">{aCopy.titleLabel}</Label>
                  <Input
                    id="vb-custom-title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder={aCopy.titlePlaceholder}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>{aCopy.roleLabel}</Label>
                  <Select
                    value={customRole}
                    onValueChange={(v) => {
                      if (v) setCustomRole(v as VerbalRole);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>{copy.roles[customRole]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {(['pc', 'ally', 'opponent', 'witness'] as const).map(
                        (role) => (
                          <SelectItem key={role} value={role}>
                            {copy.roles[role]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>{aCopy.attitudeLabel}</Label>
                  <Select
                    value={customAttitude}
                    onValueChange={(v) => {
                      if (v) setCustomAttitude(v as RelationshipTier);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {RELATIONSHIP_META[customAttitude].label[lang]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {(
                        [
                          'hostile',
                          'unfriendly',
                          'neutral',
                          'friendly',
                          'helpful',
                        ] as const
                      ).map((tier) => (
                        <SelectItem key={tier} value={tier}>
                          {RELATIONSHIP_META[tier].label[lang]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">EMP</Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    value={customEmp}
                    onChange={(e) =>
                      setCustomEmp(Number.parseInt(e.target.value, 10) || 5)
                    }
                    className="font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">INT</Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    value={customInt}
                    onChange={(e) =>
                      setCustomInt(Number.parseInt(e.target.value, 10) || 5)
                    }
                    className="font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">
                    {lang === 'fr' ? 'VOL' : 'WILL'}
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    max={15}
                    value={customVol}
                    onChange={(e) =>
                      setCustomVol(Number.parseInt(e.target.value, 10) || 5)
                    }
                    className="font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{aCopy.skillLevelLabel}</Label>
                  <Input
                    type="number"
                    min={0}
                    max={12}
                    value={customSkillLevel}
                    onChange={(e) =>
                      setCustomSkillLevel(
                        Number.parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {copy.participant.resolveLabel}:{' '}
                  {calculateMaxResolve(customInt, customVol)}
                </span>
                <Button type="submit" size="sm">
                  <Plus data-icon="inline-start" />
                  <span>{aCopy.addCustomBtn}</span>
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
