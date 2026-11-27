import { useMemo, useState } from 'react';
import {
  Briefcase,
  CopyCheck,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import type { CharacterProfessionId } from '@/src/modules/character-generator/types';
import type { HomebrewStudioCopy } from '../i18n';
import type {
  ModuleLanguage,
  ProfessionOverviewPageData,
  ProfessionTreePageData,
  ProfessionTreeSideSubTable,
} from '../types';
import {
  PROFESSIONS_DATA,
  buildProfessionSpreadFromCompendium,
  createBlankProfessionSpreadData,
  serializeProfessionSpreadToMarkdown,
} from '../utils/professionFormatters';

interface ProfessionBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: ModuleLanguage;
  copy: HomebrewStudioCopy;
  docImages: Record<string, string>;
  onInsertProfession: (name: string, markdown: string) => void;
}

/**
 * Guided Shadcn UI builder modal to author a complete 2-page Witcher TRPG Profession spread
 * (Page 1: Lore, Portrait, Defining Skill & Sidebar Tables | Page 2: 3x3 Talent Tree & Reference Sub-Tables),
 * either from a blank Inquisitor scaffold or cloned/pre-filled from any official/homebrew profession.
 */
export function ProfessionBuilderDialog({
  open,
  onOpenChange,
  lang,
  copy,
  docImages,
  onInsertProfession,
}: ProfessionBuilderDialogProps) {
  const dc = copy.professionDialog;

  const initialBlank = useMemo(
    () => createBlankProfessionSpreadData(lang),
    [lang]
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'tree' | 'tables'>(
    'overview'
  );
  const [selectedPresetProf, setSelectedPresetProf] =
    useState<CharacterProfessionId>('mage');
  const [overview, setOverview] = useState<ProfessionOverviewPageData>(
    () => initialBlank.overview
  );
  const [tree, setTree] = useState<ProfessionTreePageData>(
    () => initialBlank.tree
  );

  // Store multiline list editors cleanly as raw text so newlines don't jump cursor while typing
  const [magicPerksText, setMagicPerksText] = useState(() =>
    initialBlank.overview.magicPerks.join('\n')
  );
  const [skillsText, setSkillsText] = useState(() =>
    initialBlank.overview.skills.join('\n')
  );
  const [gearText, setGearText] = useState(() =>
    initialBlank.overview.gear.join('\n')
  );

  const imageKeys = useMemo(() => Object.keys(docImages), [docImages]);

  const applySpreadState = (
    nextOverview: ProfessionOverviewPageData,
    nextTree: ProfessionTreePageData
  ) => {
    setOverview(nextOverview);
    setTree(nextTree);
    setMagicPerksText(nextOverview.magicPerks.join('\n'));
    setSkillsText(nextOverview.skills.join('\n'));
    setGearText(nextOverview.gear.join('\n'));
  };

  const handleLoadFromCompendium = () => {
    const built = buildProfessionSpreadFromCompendium(selectedPresetProf, lang);
    applySpreadState(built.overview, built.tree);
  };

  const handleResetBlank = () => {
    const blank = createBlankProfessionSpreadData(lang);
    applySpreadState(blank.overview, blank.tree);
  };

  const handleUpdateBranch = (colIdx: 0 | 1 | 2, value: string) => {
    setTree((prev) => {
      const nextBranches: [string, string, string] = [...prev.branches] as [
        string,
        string,
        string,
      ];
      nextBranches[colIdx] = value;
      return { ...prev, branches: nextBranches };
    });
  };

  const handleUpdateTalent = (
    idx: number,
    patch: Partial<{ name: string; description: string }>
  ) => {
    setTree((prev) => {
      const nextTalents = prev.talents.map((item, i) =>
        i === idx ? { ...item, ...patch } : item
      );
      return { ...prev, talents: nextTalents };
    });
  };

  const handleAddSideTable = () => {
    const newTable: ProfessionTreeSideSubTable = {
      title: lang === 'fr' ? 'NOUVELLE TABLE' : 'NEW TABLE',
      headers: [
        lang === 'fr' ? 'Catégorie' : 'Category',
        lang === 'fr' ? 'Coût / SD' : 'Cost / DC',
      ],
      sections: [
        {
          heading: lang === 'fr' ? 'Sous-section' : 'Subsection',
          rows: [[lang === 'fr' ? 'Option 1' : 'Option 1', '10']],
        },
      ],
    };
    setTree((prev) => ({
      ...prev,
      sideTables: [...prev.sideTables, newTable],
    }));
  };

  const handleRemoveSideTable = (tableIdx: number) => {
    setTree((prev) => ({
      ...prev,
      sideTables: prev.sideTables.filter((_, i) => i !== tableIdx),
    }));
  };

  const handleUpdateSideTable = (
    tableIdx: number,
    updater: (table: ProfessionTreeSideSubTable) => ProfessionTreeSideSubTable
  ) => {
    setTree((prev) => ({
      ...prev,
      sideTables: prev.sideTables.map((tbl, i) =>
        i === tableIdx ? updater(tbl) : tbl
      ),
    }));
  };

  const handleSubmit = () => {
    const splitLines = (raw: string) =>
      raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    const sanitizedOverview: ProfessionOverviewPageData = {
      ...overview,
      lang,
      title: (overview.title.trim() || 'PROFESSION').toUpperCase(),
      magicPerks: splitLines(magicPerksText),
      skills: splitLines(skillsText),
      gear: splitLines(gearText),
    };

    const sanitizedTree: ProfessionTreePageData = {
      ...tree,
      lang,
      title: (
        tree.title.trim() ||
        (lang === 'fr'
          ? `ARBRE DE COMPÉTENCE DE ${sanitizedOverview.title}`
          : `${sanitizedOverview.title} SKILL TREE`)
      ).toUpperCase(),
    };

    const md = serializeProfessionSpreadToMarkdown(
      sanitizedOverview,
      sanitizedTree
    );
    onInsertProfession(sanitizedOverview.title, md);
    onOpenChange(false);
  };

  const selectedProfLabel =
    PROFESSIONS_DATA.find((p) => p.id === selectedPresetProf)?.name[lang] ??
    selectedPresetProf;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-3 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Briefcase className="size-4 text-primary" />
            <span>{dc.title}</span>
          </DialogTitle>
          <DialogDescription>{dc.desc}</DialogDescription>
        </DialogHeader>

        {/* Compendium Pre-fill / Clone Bar */}
        <div className="flex flex-wrap items-end justify-between gap-2 rounded-lg border border-border bg-muted/25 p-2.5">
          <div className="flex min-w-[220px] flex-1 flex-wrap items-end gap-2">
            <div className="flex min-w-[190px] flex-1 flex-col gap-1">
              <Label className="text-[11px] text-muted-foreground">
                {dc.presetLabel}
              </Label>
              <Select
                value={selectedPresetProf}
                onValueChange={(val) => {
                  if (val) setSelectedPresetProf(val as CharacterProfessionId);
                }}
              >
                <SelectTrigger className="h-8 w-full text-xs">
                  <SelectValue>{selectedProfLabel}</SelectValue>
                </SelectTrigger>
                <SelectContent align="start">
                  {PROFESSIONS_DATA.map((prof) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.name[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={handleLoadFromCompendium}
            >
              <CopyCheck className="size-3.5" />
              <span>{dc.loadPresetBtn}</span>
            </Button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
            onClick={handleResetBlank}
          >
            <RotateCcw className="size-3.5" />
            <span>{dc.resetBlankBtn}</span>
          </Button>
        </div>

        {/* Multi-Tab Form Area */}
        <Tabs
          value={activeTab}
          onValueChange={(v) =>
            setActiveTab(v as 'overview' | 'tree' | 'tables')
          }
          className="flex min-h-0 flex-1 flex-col gap-2"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-xs">
              {dc.tabOverview}
            </TabsTrigger>
            <TabsTrigger value="tree" className="text-xs">
              {dc.tabTree}
            </TabsTrigger>
            <TabsTrigger value="tables" className="gap-1.5 text-xs">
              <span>{dc.tabTables}</span>
              <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                {tree.sideTables.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {/* TAB 1: PAGE 1 — OVERVIEW & SIDEBAR */}
            <TabsContent value="overview" className="mt-1 flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-1 lg:col-span-2">
                  <Label className="text-xs">{dc.fieldTitle}</Label>
                  <Input
                    value={overview.title}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldVigor}</Label>
                  <Input
                    value={overview.vigor}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        vigor: e.target.value,
                      }))
                    }
                    className="h-8 font-mono text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldTreasure}</Label>
                  <Input
                    value={overview.treasure ?? ''}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        treasure: e.target.value,
                      }))
                    }
                    placeholder="2d6 × 15 couronnes"
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldImage}</Label>
                  <Select
                    value={
                      overview.image === 'preset:grimoire' ||
                      imageKeys.some((k) => `img:${k}` === overview.image)
                        ? overview.image
                        : 'custom'
                    }
                    onValueChange={(val) => {
                      if (val && val !== 'custom') {
                        setOverview((prev) => ({ ...prev, image: val }));
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue>
                        {overview.image === 'preset:grimoire'
                          ? dc.defaultImageLabel
                          : overview.image}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="preset:grimoire">
                        {dc.defaultImageLabel}
                      </SelectItem>
                      {imageKeys.map((key) => (
                        <SelectItem key={key} value={`img:${key}`}>
                          img:{key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldImageCustom}</Label>
                  <Input
                    value={overview.image}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                    placeholder="preset:grimoire"
                    className="h-8 font-mono text-xs"
                  />
                </div>
              </div>

              <Separator />

              {/* Defining Skill */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldDefiningShort}</Label>
                  <Input
                    value={overview.definingSkillShort}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        definingSkillShort: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldDefiningFull}</Label>
                  <Input
                    value={overview.definingSkillTitle}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        definingSkillTitle: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{dc.fieldDefiningBoxText}</Label>
                <Textarea
                  rows={2}
                  value={overview.definingSkillText}
                  onChange={(e) =>
                    setOverview((prev) => ({
                      ...prev,
                      definingSkillText: e.target.value,
                    }))
                  }
                  className="text-xs"
                />
              </div>

              <Separator />

              {/* Epigraph Quote & Lore */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <Label className="text-xs">{dc.fieldQuote}</Label>
                  <Input
                    value={overview.quote}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        quote: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldQuoteAuthor}</Label>
                  <Input
                    value={overview.quoteAttribution ?? ''}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        quoteAttribution: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1 sm:col-span-3">
                  <Label className="text-xs">{dc.fieldLore}</Label>
                  <Textarea
                    rows={4}
                    value={overview.lore}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        lore: e.target.value,
                      }))
                    }
                    className="text-xs leading-relaxed"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldLoreAuthor}</Label>
                  <Input
                    value={overview.loreAttribution ?? ''}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        loreAttribution: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <Separator />

              {/* Sidebar Tables */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldMagicPerks}</Label>
                  <Textarea
                    rows={5}
                    value={magicPerksText}
                    onChange={(e) => setMagicPerksText(e.target.value)}
                    placeholder={dc.onePerLineHint}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldSkills}</Label>
                  <Textarea
                    rows={5}
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    placeholder={dc.onePerLineHint}
                    className="font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <Label className="text-xs">{dc.fieldGear}</Label>
                  </div>
                  <Input
                    value={overview.gearTitle ?? ''}
                    onChange={(e) =>
                      setOverview((prev) => ({
                        ...prev,
                        gearTitle: e.target.value,
                      }))
                    }
                    placeholder={dc.fieldGearTitle}
                    className="mb-1 h-7 text-xs"
                  />
                  <Textarea
                    rows={4}
                    value={gearText}
                    onChange={(e) => setGearText(e.target.value)}
                    placeholder={dc.onePerLineHint}
                    className="font-mono text-xs"
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: PAGE 2 — 3x3 SKILL TREE */}
            <TabsContent value="tree" className="mt-1 flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldTreeTitle}</Label>
                  <Input
                    value={tree.title}
                    onChange={(e) =>
                      setTree((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">{dc.fieldTreeDefTitle}</Label>
                  <Input
                    value={tree.definingSkillTitle}
                    onChange={(e) =>
                      setTree((prev) => ({
                        ...prev,
                        definingSkillTitle: e.target.value,
                      }))
                    }
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs">{dc.fieldTreeDefDesc}</Label>
                <Textarea
                  rows={3}
                  value={tree.definingSkillDescription}
                  onChange={(e) =>
                    setTree((prev) => ({
                      ...prev,
                      definingSkillDescription: e.target.value,
                    }))
                  }
                  className="text-xs leading-relaxed"
                />
              </div>

              <Separator />

              {/* 3 Branches Header */}
              <div className="grid gap-2.5 sm:grid-cols-3">
                {([0, 1, 2] as const).map((colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1">
                    <Label className="text-xs font-semibold text-primary">
                      {dc.branchLabel(colIdx + 1)}
                    </Label>
                    <Input
                      value={tree.branches[colIdx]}
                      onChange={(e) =>
                        handleUpdateBranch(colIdx, e.target.value)
                      }
                      className="h-8 text-xs font-medium"
                    />
                  </div>
                ))}
              </div>

              {/* 3x3 Talent Matrix */}
              <div className="flex flex-col gap-2.5">
                {[0, 1, 2].map((rowIdx) => (
                  <div
                    key={rowIdx}
                    className="grid gap-2.5 rounded-md border border-border bg-muted/15 p-2 sm:grid-cols-3"
                  >
                    {[0, 1, 2].map((colIdx) => {
                      const idx = rowIdx * 3 + colIdx;
                      const talent = tree.talents[idx] ?? {
                        name: '',
                        description: '',
                      };
                      return (
                        <div
                          key={colIdx}
                          className="flex flex-col gap-1.5 rounded border border-border/70 bg-background p-2"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                              {tree.branches[colIdx] || `#${colIdx + 1}`} ·{' '}
                              {dc.tierLabel(rowIdx + 1)}
                            </span>
                          </div>
                          <Input
                            value={talent.name}
                            onChange={(e) =>
                              handleUpdateTalent(idx, { name: e.target.value })
                            }
                            placeholder={dc.talentNamePlaceholder}
                            className="h-7 text-xs font-semibold"
                          />
                          <Textarea
                            rows={3}
                            value={talent.description}
                            onChange={(e) =>
                              handleUpdateTalent(idx, {
                                description: e.target.value,
                              })
                            }
                            placeholder={dc.talentDescPlaceholder}
                            className="text-[11px] leading-snug"
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: PAGE 2 — OPTIONAL SIDEBAR REFERENCE SUB-TABLES */}
            <TabsContent value="tables" className="mt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 rounded-md border border-border bg-muted/20 p-2.5">
                <p className="text-xs text-muted-foreground">
                  {dc.sideTablesHint}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 shrink-0 gap-1.5 text-xs"
                  onClick={handleAddSideTable}
                >
                  <Plus className="size-3.5" />
                  <span>{dc.addSideTableBtn}</span>
                </Button>
              </div>

              {tree.sideTables.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                  {dc.noSideTables}
                </div>
              ) : (
                tree.sideTables.map((table, tableIdx) => (
                  <div
                    key={tableIdx}
                    className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3"
                  >
                    <div className="flex flex-wrap items-end gap-2">
                      <div className="flex min-w-[160px] flex-1 flex-col gap-1">
                        <Label className="text-[11px]">
                          {dc.sideTableTitle}
                        </Label>
                        <Input
                          value={table.title}
                          onChange={(e) =>
                            handleUpdateSideTable(tableIdx, (tbl) => ({
                              ...tbl,
                              title: e.target.value,
                            }))
                          }
                          className="h-8 text-xs font-semibold"
                        />
                      </div>
                      <div className="flex min-w-[120px] flex-1 flex-col gap-1">
                        <Label className="text-[11px]">
                          {dc.sideTableCol1}
                        </Label>
                        <Input
                          value={table.headers[0]}
                          onChange={(e) =>
                            handleUpdateSideTable(tableIdx, (tbl) => ({
                              ...tbl,
                              headers: [e.target.value, tbl.headers[1]],
                            }))
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <div className="flex min-w-[100px] flex-1 flex-col gap-1">
                        <Label className="text-[11px]">
                          {dc.sideTableCol2}
                        </Label>
                        <Input
                          value={table.headers[1]}
                          onChange={(e) =>
                            handleUpdateSideTable(tableIdx, (tbl) => ({
                              ...tbl,
                              headers: [tbl.headers[0], e.target.value],
                            }))
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveSideTable(tableIdx)}
                        title={dc.removeTableBtn}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>

                    {table.sections.map((section, secIdx) => (
                      <div
                        key={secIdx}
                        className="flex flex-col gap-1.5 rounded border border-border/70 bg-muted/20 p-2"
                      >
                        <div className="flex items-center gap-2">
                          <Input
                            value={section.heading ?? ''}
                            onChange={(e) =>
                              handleUpdateSideTable(tableIdx, (tbl) => ({
                                ...tbl,
                                sections: tbl.sections.map((s, si) =>
                                  si === secIdx
                                    ? { ...s, heading: e.target.value }
                                    : s
                                ),
                              }))
                            }
                            placeholder={dc.sideSectionPlaceholder}
                            className="h-7 flex-1 text-xs font-medium"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1 px-2 text-[11px]"
                            onClick={() =>
                              handleUpdateSideTable(tableIdx, (tbl) => ({
                                ...tbl,
                                sections: tbl.sections.map((s, si) =>
                                  si === secIdx
                                    ? { ...s, rows: [...s.rows, ['', '']] }
                                    : s
                                ),
                              }))
                            }
                          >
                            <Plus className="size-3" />
                            <span>{dc.addRowBtn}</span>
                          </Button>
                        </div>

                        {section.rows.map(([col1, col2], rowIdx) => (
                          <div key={rowIdx} className="flex items-center gap-2">
                            <Input
                              value={col1}
                              onChange={(e) =>
                                handleUpdateSideTable(tableIdx, (tbl) => ({
                                  ...tbl,
                                  sections: tbl.sections.map((s, si) =>
                                    si === secIdx
                                      ? {
                                          ...s,
                                          rows: s.rows.map((r, ri) =>
                                            ri === rowIdx
                                              ? [e.target.value, r[1]]
                                              : r
                                          ),
                                        }
                                      : s
                                  ),
                                }))
                              }
                              className="h-7 flex-1 text-xs"
                            />
                            <Input
                              value={col2}
                              onChange={(e) =>
                                handleUpdateSideTable(tableIdx, (tbl) => ({
                                  ...tbl,
                                  sections: tbl.sections.map((s, si) =>
                                    si === secIdx
                                      ? {
                                          ...s,
                                          rows: s.rows.map((r, ri) =>
                                            ri === rowIdx
                                              ? [r[0], e.target.value]
                                              : r
                                          ),
                                        }
                                      : s
                                  ),
                                }))
                              }
                              className="h-7 w-28 font-mono text-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-sm"
                              className="size-7 text-muted-foreground hover:text-destructive"
                              onClick={() =>
                                handleUpdateSideTable(tableIdx, (tbl) => ({
                                  ...tbl,
                                  sections: tbl.sections.map((s, si) =>
                                    si === secIdx
                                      ? {
                                          ...s,
                                          rows: s.rows.filter(
                                            (_, ri) => ri !== rowIdx
                                          ),
                                        }
                                      : s
                                  ),
                                }))
                              }
                            >
                              <Trash2 className="size-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-fit gap-1 text-xs"
                      onClick={() =>
                        handleUpdateSideTable(tableIdx, (tbl) => ({
                          ...tbl,
                          sections: [
                            ...tbl.sections,
                            { heading: '', rows: [['', '']] },
                          ],
                        }))
                      }
                    >
                      <Plus className="size-3.5" />
                      <span>{dc.addSectionBtn}</span>
                    </Button>
                  </div>
                ))
              )}
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="border-t border-border pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            {copy.docs.cancelBtn}
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={handleSubmit}
          >
            <Briefcase className="size-3.5" />
            <span>{dc.insertSpreadBtn}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
