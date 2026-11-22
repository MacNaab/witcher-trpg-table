import { useMemo, useState } from 'react';
import {
  BookOpen,
  BookOpenCheck,
  FilePlus2,
  Plus,
  Search,
  Skull,
  Table2,
  UserCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProfessionDefinition } from '@/src/modules/character-generator/data/racesAndProfessions';
import type { CharacterSheetState } from '@/src/modules/character-generator/types';
import { parseImportedCharacterJson } from '@/src/modules/character-generator/utils/characterCalculations';
import {
  createSavedPcFromCharacterSheet,
  loadCombatHubState,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import {
  ALL_BESTIARY_ENTRIES,
  getCreatureTypeLabel,
} from '@/src/modules/encounter-manager/data';
import {
  formatBestiaryEntryAsStatblock,
  formatHubEntityAsStatblock,
} from '../data/templates';
import {
  createBlankMonsterTemplate,
  formatBestiaryEntryAsTwoPageSpread,
  formatHubEntityAsTwoPageSpread,
} from '../utils/bestiaryFormatters';
import {
  createBlankCharacterSheetTemplate,
  formatCharacterSheetStateAsOfficialPage,
  formatHubEntityAsCharacterSheet,
} from '../utils/characterSheetFormatters';
import type { HomebrewStudioCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

const CHARGEN_DRAFT_STORAGE_KEY = 'witcher-gm-chargen-draft-v1';

export type ImportEntityMode = 'character' | 'monster';

interface BestiaryImportDialogProps {
  open: boolean;
  mode: ImportEntityMode;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  copy: HomebrewStudioCopy;
  onInsertStatblock: (name: string, markdown: string) => void;
}

function loadCharacterGeneratorDraft(): CharacterSheetState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CHARGEN_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: unknown };
    if (!parsed || typeof parsed !== 'object' || !parsed.state) return null;
    return parseImportedCharacterJson(JSON.stringify(parsed.state));
  } catch {
    return null;
  }
}

/**
 * Dual-purpose entity importer dialog strictly scoped by mode:
 * - 'character': Only PCs & NPCs (Character Generator draft, Hub PCs, Hub Custom NPCs) + Blank PC/NPC template.
 * - 'monster': Only Monsters (Official Bestiary + Hub Custom Monsters) + Blank Monster template.
 */
export function BestiaryImportDialog({
  open,
  mode,
  onOpenChange,
  lang,
  copy,
  onInsertStatblock,
}: BestiaryImportDialogProps) {
  const [search, setSearch] = useState('');
  const [monsterTab, setMonsterTab] = useState<'bestiary' | 'hubMonsters'>(
    'bestiary'
  );
  const [insertFormat, setInsertFormat] = useState<'official' | 'quick'>(
    'official'
  );

  const isCharacterMode = mode === 'character';
  const hubState = useMemo(() => (open ? loadCombatHubState() : null), [open]);
  const chargenDraft = useMemo(
    () => (open && isCharacterMode ? loadCharacterGeneratorDraft() : null),
    [open, isCharacterMode]
  );

  // Strict Character-only list (PCs & NPCs only — never Monsters)
  const characterItems = useMemo(() => {
    if (!isCharacterMode) return [];
    const items: Array<{
      id: string;
      name: string;
      meta: string;
      badge: string;
      markdown: string;
    }> = [];

    if (
      chargenDraft &&
      (chargenDraft.characterName.trim().length > 0 ||
        Boolean(chargenDraft.raceId) ||
        Boolean(chargenDraft.professionId))
    ) {
      const prof = chargenDraft.professionId
        ? getProfessionDefinition(chargenDraft.professionId)
        : null;
      const draftName =
        chargenDraft.characterName.trim() ||
        (lang === 'fr' ? 'Personnage en cours' : 'Draft Character');
      const quickPc = createSavedPcFromCharacterSheet(chargenDraft, lang);
      items.push({
        id: 'chargen-draft',
        name: draftName,
        meta: `${prof ? prof.name[lang] : lang === 'fr' ? 'Générateur PJ' : 'PC Generator'} · PV ${quickPc.maxHp}`,
        badge: copy.bestiaryDialog.chargenDraftBadge,
        markdown:
          insertFormat === 'official'
            ? formatCharacterSheetStateAsOfficialPage(chargenDraft, lang)
            : formatHubEntityAsStatblock({ kind: 'pc', data: quickPc }, lang),
      });
    }

    if (hubState) {
      for (const pc of hubState.characters) {
        items.push({
          id: `pc-${pc.id}`,
          name: pc.name,
          meta: `${pc.professionLabel} · PV ${pc.maxHp}`,
          badge: copy.bestiaryDialog.kindPcBadge,
          markdown:
            insertFormat === 'official'
              ? formatHubEntityAsCharacterSheet({ kind: 'pc', data: pc }, lang)
              : formatHubEntityAsStatblock({ kind: 'pc', data: pc }, lang),
        });
      }
      for (const npc of hubState.customNpcs) {
        items.push({
          id: `npc-${npc.id}`,
          name: npc.name,
          meta: `${npc.professionLabel} · PV ${npc.maxHp}`,
          badge: copy.bestiaryDialog.kindNpcBadge,
          markdown:
            insertFormat === 'official'
              ? formatHubEntityAsCharacterSheet({ kind: 'npc', data: npc }, lang)
              : formatHubEntityAsStatblock({ kind: 'npc', data: npc }, lang),
        });
      }
    }

    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.meta.toLowerCase().includes(q) ||
        i.badge.toLowerCase().includes(q)
    );
  }, [
    chargenDraft,
    copy.bestiaryDialog,
    hubState,
    insertFormat,
    isCharacterMode,
    lang,
    search,
  ]);

  // Strict Monster-only lists (Bestiary + Hub Custom Monsters only — never PCs/NPCs)
  const filteredBestiary = useMemo(() => {
    if (isCharacterMode) return [];
    const q = search.trim().toLowerCase();
    if (!q) return ALL_BESTIARY_ENTRIES.slice(0, 40);
    return ALL_BESTIARY_ENTRIES.filter(
      (entry) =>
        entry.name[lang].toLowerCase().includes(q) ||
        getCreatureTypeLabel(entry.typeId, lang).toLowerCase().includes(q)
    ).slice(0, 40);
  }, [isCharacterMode, lang, search]);

  const hubMonsterItems = useMemo(() => {
    if (isCharacterMode || !hubState) return [];
    const items = hubState.customMonsters.map((mon) => ({
      id: `mon-${mon.id}`,
      name: mon.name,
      meta: `${getCreatureTypeLabel(mon.typeId, lang)} · PV ${mon.maxHp}`,
      badge: copy.bestiaryDialog.kindMonsterBadge,
      markdown:
        insertFormat === 'official'
          ? formatHubEntityAsTwoPageSpread({ kind: 'monster', data: mon }, lang)
          : formatHubEntityAsStatblock({ kind: 'monster', data: mon }, lang),
    }));

    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.meta.toLowerCase().includes(q) ||
        i.badge.toLowerCase().includes(q)
    );
  }, [
    copy.bestiaryDialog.kindMonsterBadge,
    hubState,
    insertFormat,
    isCharacterMode,
    lang,
    search,
  ]);

  const handleInsertBlankTemplate = () => {
    if (isCharacterMode) {
      const md = createBlankCharacterSheetTemplate(insertFormat, lang);
      onInsertStatblock(copy.bestiaryDialog.blankCharacterInsertedName, md);
    } else {
      const md = createBlankMonsterTemplate(insertFormat, lang);
      onInsertStatblock(copy.bestiaryDialog.blankMonsterInsertedName, md);
    }
    onOpenChange(false);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch('');
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            {isCharacterMode ? (
              <UserCheck className="size-4 text-primary" />
            ) : (
              <Skull className="size-4 text-primary" />
            )}
            <span>
              {isCharacterMode
                ? copy.bestiaryDialog.characterTitle
                : copy.bestiaryDialog.monsterTitle}
            </span>
          </DialogTitle>
          <DialogDescription>
            {isCharacterMode
              ? copy.bestiaryDialog.characterDesc
              : copy.bestiaryDialog.monsterDesc}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {/* Format Selector: Official Book Format vs Compact Quick Statblock */}
          <div className="flex flex-col gap-1.5 rounded-md border border-border bg-muted/25 p-2.5">
            <Label className="text-[11px] font-semibold text-foreground">
              {copy.bestiaryDialog.formatLabel}
            </Label>
            <Tabs
              value={insertFormat}
              onValueChange={(v) => setInsertFormat(v as 'official' | 'quick')}
            >
              <TabsList className="w-full">
                <TabsTrigger value="official" className="flex-1 gap-1.5 text-xs">
                  <BookOpenCheck className="size-3.5" />
                  <span>
                    {isCharacterMode
                      ? copy.bestiaryDialog.officialCharacterBtn
                      : copy.bestiaryDialog.officialMonsterBtn}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="quick" className="flex-1 gap-1.5 text-xs">
                  <Table2 className="size-3.5" />
                  <span>{copy.bestiaryDialog.quickFormatBtn}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="text-[11px] text-muted-foreground">
              {insertFormat === 'official'
                ? isCharacterMode
                  ? copy.bestiaryDialog.officialCharacterHint
                  : copy.bestiaryDialog.officialMonsterHint
                : copy.bestiaryDialog.quickHint}
            </p>
          </div>

          {/* Dedicated Blank Template Action Card */}
          <div className="flex items-center justify-between gap-3 rounded-md border border-dashed border-primary/45 bg-primary/5 px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground">
                {isCharacterMode
                  ? copy.bestiaryDialog.blankCharacterTitle
                  : copy.bestiaryDialog.blankMonsterTitle}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {isCharacterMode
                  ? copy.bestiaryDialog.blankCharacterDesc
                  : copy.bestiaryDialog.blankMonsterDesc}
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              className="h-7 shrink-0 gap-1 px-2.5 text-xs"
              onClick={handleInsertBlankTemplate}
            >
              <FilePlus2 className="size-3.5" />
              <span>{copy.bestiaryDialog.insertBlankBtn}</span>
            </Button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isCharacterMode
                  ? copy.bestiaryDialog.characterSearchPlaceholder
                  : copy.bestiaryDialog.monsterSearchPlaceholder
              }
              className="pl-8 text-xs"
            />
          </div>

          {isCharacterMode ? (
            characterItems.length === 0 ? (
              <p className="rounded-md border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                {copy.bestiaryDialog.emptyCharacters}
              </p>
            ) : (
              <div className="flex max-h-64 flex-col divide-y divide-border overflow-y-auto rounded-md border border-border">
                {characterItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-3 py-2 text-xs hover:bg-muted/30"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate font-semibold text-foreground">
                          {item.name}
                        </p>
                        <Badge
                          variant="outline"
                          className="h-4 shrink-0 px-1.5 text-[10px] font-medium"
                        >
                          {item.badge}
                        </Badge>
                      </div>
                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        {item.meta}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 shrink-0 gap-1 px-2 text-xs"
                      onClick={() => {
                        onInsertStatblock(item.name, item.markdown);
                        onOpenChange(false);
                      }}
                    >
                      <Plus className="size-3" />
                      <span>{copy.bestiaryDialog.insertBtn}</span>
                    </Button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <Tabs
              value={monsterTab}
              onValueChange={(v) =>
                setMonsterTab(v as 'bestiary' | 'hubMonsters')
              }
            >
              <TabsList className="w-full">
                <TabsTrigger value="bestiary" className="flex-1 gap-1.5 text-xs">
                  <BookOpen className="size-3.5" />
                  <span>{copy.bestiaryDialog.bestiaryTab}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="hubMonsters"
                  className="flex-1 gap-1.5 text-xs"
                >
                  <Skull className="size-3.5" />
                  <span>{copy.bestiaryDialog.hubMonstersTab}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bestiary" className="mt-2">
                <div className="flex max-h-64 flex-col divide-y divide-border overflow-y-auto rounded-md border border-border">
                  {filteredBestiary.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 text-xs hover:bg-muted/30"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">
                          {entry.name[lang]}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {getCreatureTypeLabel(entry.typeId, lang)} ·{' '}
                          {entry.threat[lang]} · {entry.reward[lang]}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 shrink-0 gap-1 px-2 text-xs"
                        onClick={() => {
                          const formatted =
                            insertFormat === 'official'
                              ? formatBestiaryEntryAsTwoPageSpread(entry, lang)
                              : formatBestiaryEntryAsStatblock(entry, lang);
                          onInsertStatblock(entry.name[lang], formatted);
                          onOpenChange(false);
                        }}
                      >
                        <Plus className="size-3" />
                        <span>{copy.bestiaryDialog.insertBtn}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hubMonsters" className="mt-2">
                {hubMonsterItems.length === 0 ? (
                  <p className="rounded-md border border-dashed border-border py-8 text-center text-xs text-muted-foreground">
                    {copy.bestiaryDialog.emptyHubMonsters}
                  </p>
                ) : (
                  <div className="flex max-h-64 flex-col divide-y divide-border overflow-y-auto rounded-md border border-border">
                    {hubMonsterItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 px-3 py-2 text-xs hover:bg-muted/30"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate font-semibold text-foreground">
                              {item.name}
                            </p>
                            <Badge
                              variant="outline"
                              className="h-4 shrink-0 px-1.5 text-[10px] font-medium"
                            >
                              {item.badge}
                            </Badge>
                          </div>
                          <p className="truncate font-mono text-[11px] text-muted-foreground">
                            {item.meta}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 shrink-0 gap-1 px-2 text-xs"
                          onClick={() => {
                            onInsertStatblock(item.name, item.markdown);
                            onOpenChange(false);
                          }}
                        >
                          <Plus className="size-3" />
                          <span>{copy.bestiaryDialog.insertBtn}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
