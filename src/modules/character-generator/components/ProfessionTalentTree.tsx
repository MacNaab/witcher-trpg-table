import { useMemo, useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CORE_DEFINING_SKILLS_REF,
  TALENT_REFERENCE_EXTRAS,
  type ProfessionId,
  type TalentEntry,
} from '@/src/data/talents';
import { getCharacterGeneratorCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

interface ProfessionTalentTreeProps {
  talents: readonly TalentEntry[];
  lang: ModuleLanguage;
  professionId?: ProfessionId | null;
}

interface TalentBranchGroup {
  branch: string;
  items: TalentEntry[];
}

interface BranchColorTheme {
  dot: string;
  tabActive: string;
  banner: string;
  columnCard: string;
  columnHeader: string;
  nodeCard: string;
  tierBadge: string;
}

const BRANCH_COLOR_THEMES: readonly BranchColorTheme[] = [
  {
    dot: 'bg-amber-500',
    tabActive:
      'data-active:border-amber-500/50 data-active:bg-amber-500/15 data-active:text-amber-700 dark:data-active:border-amber-400/50 dark:data-active:bg-amber-500/20 dark:data-active:text-amber-300',
    banner:
      'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200',
    columnCard:
      'border-amber-500/30 border-t-4 border-t-amber-500 bg-amber-500/[0.04]',
    columnHeader: 'border-amber-500/25 text-amber-700 dark:text-amber-300',
    nodeCard:
      'border-amber-500/25 border-l-4 border-l-amber-500 bg-amber-500/[0.04]',
    tierBadge:
      'border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  {
    dot: 'bg-emerald-500',
    tabActive:
      'data-active:border-emerald-500/50 data-active:bg-emerald-500/15 data-active:text-emerald-700 dark:data-active:border-emerald-400/50 dark:data-active:bg-emerald-500/20 dark:data-active:text-emerald-300',
    banner:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
    columnCard:
      'border-emerald-500/30 border-t-4 border-t-emerald-500 bg-emerald-500/[0.04]',
    columnHeader: 'border-emerald-500/25 text-emerald-700 dark:text-emerald-300',
    nodeCard:
      'border-emerald-500/25 border-l-4 border-l-emerald-500 bg-emerald-500/[0.04]',
    tierBadge:
      'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  {
    dot: 'bg-sky-500',
    tabActive:
      'data-active:border-sky-500/50 data-active:bg-sky-500/15 data-active:text-sky-700 dark:data-active:border-sky-400/50 dark:data-active:bg-sky-500/20 dark:data-active:text-sky-300',
    banner:
      'border-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-200',
    columnCard:
      'border-sky-500/30 border-t-4 border-t-sky-500 bg-sky-500/[0.04]',
    columnHeader: 'border-sky-500/25 text-sky-700 dark:text-sky-300',
    nodeCard:
      'border-sky-500/25 border-l-4 border-l-sky-500 bg-sky-500/[0.04]',
    tierBadge:
      'border border-sky-500/30 bg-sky-500/15 text-sky-700 dark:text-sky-300',
  },
  {
    dot: 'bg-violet-500',
    tabActive:
      'data-active:border-violet-500/50 data-active:bg-violet-500/15 data-active:text-violet-700 dark:data-active:border-violet-400/50 dark:data-active:bg-violet-500/20 dark:data-active:text-violet-300',
    banner:
      'border-violet-500/30 bg-violet-500/10 text-violet-800 dark:text-violet-200',
    columnCard:
      'border-violet-500/30 border-t-4 border-t-violet-500 bg-violet-500/[0.04]',
    columnHeader: 'border-violet-500/25 text-violet-700 dark:text-violet-300',
    nodeCard:
      'border-violet-500/25 border-l-4 border-l-violet-500 bg-violet-500/[0.04]',
    tierBadge:
      'border border-violet-500/30 bg-violet-500/15 text-violet-700 dark:text-violet-300',
  },
];

function getBranchTheme(branchIndex: number): BranchColorTheme {
  return BRANCH_COLOR_THEMES[branchIndex % BRANCH_COLOR_THEMES.length];
}

/**
 * Displays a profession's Defining Skill reference + 3-branch skill tree
 * with official sub-tables and sidebars from `guide/professions.md`.
 */
export function ProfessionTalentTree({
  talents,
  lang,
  professionId,
}: ProfessionTalentTreeProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const resolvedProfId = professionId ?? talents[0]?.professionId ?? null;
  const definingRef = resolvedProfId
    ? CORE_DEFINING_SKILLS_REF[resolvedProfId]
    : undefined;

  const branchGroups = useMemo(() => {
    const groups: TalentBranchGroup[] = [];
    const byBranch = new Map<string, TalentEntry[]>();
    for (const talent of talents) {
      let list = byBranch.get(talent.branch);
      if (!list) {
        list = [];
        byBranch.set(talent.branch, list);
        groups.push({ branch: talent.branch, items: list });
      }
      list.push(talent);
    }
    return groups;
  }, [talents]);

  const [selectedTab, setSelectedTab] = useState<string>(
    branchGroups[0]?.branch ?? 'all'
  );

  if (talents.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {copy.identity.talentTreeEmpty}
      </p>
    );
  }

  const activeTabValue =
    selectedTab === 'all' ||
    branchGroups.some((group) => group.branch === selectedTab)
      ? selectedTab
      : (branchGroups[0]?.branch ?? 'all');

  const renderBranchNodes = (
    items: readonly TalentEntry[],
    theme: BranchColorTheme,
    compact = false
  ) => (
    <div className="flex flex-col gap-3">
      {items.map((talent, idx) => {
        const extra = TALENT_REFERENCE_EXTRAS[talent.id];
        return (
          <div
            key={talent.id}
            className={`relative flex flex-col gap-2 rounded-lg border p-3 text-sm ${
              compact
                ? 'border-border/70 bg-background/80'
                : theme.nodeCard
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-[11px] font-semibold ${theme.tierBadge}`}
                >
                  {copy.identity.talentTierLabel} {idx + 1}
                </span>
                <span className="font-semibold text-foreground">
                  {talent.name}
                </span>
              </div>
              {talent.attribute && (
                <span className="rounded border border-border bg-background/70 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                  {talent.attribute}
                </span>
              )}
            </div>

            <p
              className={`${
                compact ? 'text-xs' : 'text-xs sm:text-sm'
              } leading-relaxed text-muted-foreground`}
            >
              {talent.description}
            </p>

            {/* Render official sub-tables & sidebars in branch-focused view */}
            {!compact && extra?.sidebar && (
              <div className="rounded-md border border-border/80 bg-background/80 p-2.5 text-xs">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                  <BookOpen className="size-3.5 text-primary" aria-hidden="true" />
                  <span>{extra.sidebar.title[lang]}</span>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {extra.sidebar.text[lang]}
                </p>
              </div>
            )}

            {!compact &&
              extra?.tables?.map((tbl) => (
                <div
                  key={tbl.title.fr}
                  className="overflow-hidden rounded-md border border-border/80 bg-background/85"
                >
                  <div className="border-b border-border/70 bg-muted/40 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-foreground uppercase">
                    {tbl.title[lang]}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {tbl.columns.map((col, cIdx) => (
                          <TableHead
                            key={col.fr}
                            className={`h-8 text-xs ${
                              tbl.columns.length === 2 && cIdx === 1
                                ? 'w-20 text-right'
                                : ''
                            }`}
                          >
                            {col[lang]}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tbl.rows.map((row, rIdx) => (
                        <TableRow key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <TableCell
                              key={cIdx}
                              className={`py-1.5 text-xs whitespace-normal ${
                                row.length === 2 && cIdx === 1 && cell.length <= 8
                                  ? 'text-right font-mono font-semibold text-primary'
                                  : row.length > 2 && cell.length <= 6
                                    ? 'font-mono font-semibold text-primary'
                                    : ''
                              }`}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}

            {compact && extra && (
              <div className="flex flex-wrap gap-1.5">
                {extra.tables?.map((tbl) => (
                  <Badge key={tbl.title.fr} variant="outline" className="text-[10px]">
                    {tbl.title[lang]}
                  </Badge>
                ))}
                {extra.sidebar && (
                  <Badge variant="outline" className="text-[10px]">
                    {extra.sidebar.title[lang]}
                  </Badge>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {definingRef && (
        <div className="flex flex-col gap-2 rounded-lg border border-primary/35 bg-primary/5 p-3.5 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              <span>
                {copy.identity.definingSkillRuleLabel} — {definingRef.name[lang]}
              </span>
            </div>
            {definingRef.attribute && (
              <Badge variant="secondary" className="font-mono text-[11px]">
                {definingRef.attribute}
              </Badge>
            )}
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {definingRef.description[lang]}
          </p>
          {definingRef.sidebar && (
            <div className="rounded border border-border/70 bg-background/70 p-2.5">
              <div className="font-semibold text-foreground">
                {definingRef.sidebar.title[lang]}
              </div>
              <p className="mt-0.5 leading-relaxed text-muted-foreground">
                {definingRef.sidebar.text[lang]}
              </p>
            </div>
          )}
        </div>
      )}

      <Tabs
        value={activeTabValue}
        onValueChange={setSelectedTab}
        className="w-full gap-4"
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4">
          {branchGroups.map((group, branchIdx) => {
            const theme = getBranchTheme(branchIdx);
            return (
              <TabsTrigger
                key={group.branch}
                value={group.branch}
                className={`min-w-0 px-2.5 py-1.5 text-xs font-medium ${theme.tabActive}`}
              >
                <span
                  aria-hidden="true"
                  className={`size-2 shrink-0 rounded-full ${theme.dot}`}
                />
                <span className="truncate">{group.branch}</span>
              </TabsTrigger>
            );
          })}
          <TabsTrigger value="all" className="px-2.5 py-1.5 text-xs font-medium">
            {copy.identity.talentAllBranches}
          </TabsTrigger>
        </TabsList>

        {branchGroups.map((group, branchIdx) => {
          const theme = getBranchTheme(branchIdx);
          return (
            <TabsContent
              key={group.branch}
              value={group.branch}
              className="mt-0 flex flex-col gap-3"
            >
              <div
                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-semibold ${theme.banner}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`size-2.5 shrink-0 rounded-full ${theme.dot}`}
                  />
                  <span className="tracking-wide uppercase">{group.branch}</span>
                </div>
                <span className="font-mono text-[11px] opacity-80">
                  {group.items.length}{' '}
                  {group.items.length > 1 ? 'talents' : 'talent'}
                </span>
              </div>
              {renderBranchNodes(group.items, theme)}
            </TabsContent>
          );
        })}

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4 md:grid-cols-3">
            {branchGroups.map((group, branchIdx) => {
              const theme = getBranchTheme(branchIdx);
              return (
                <div
                  key={group.branch}
                  className={`flex flex-col gap-2.5 rounded-lg border p-3 ${theme.columnCard}`}
                >
                  <div
                    className={`flex items-center gap-2 border-b pb-2 text-xs font-semibold tracking-wide uppercase ${theme.columnHeader}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 shrink-0 rounded-full ${theme.dot}`}
                    />
                    <span>{group.branch}</span>
                  </div>
                  {renderBranchNodes(group.items, theme, true)}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
