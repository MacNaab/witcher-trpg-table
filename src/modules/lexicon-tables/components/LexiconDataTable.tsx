import { ArrowDown, ArrowUp, ArrowUpDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getLexiconTablesCopy } from '../i18n';
import type {
  LexiconEntry,
  LexiconTabId,
  ModuleLanguage,
  SortField,
} from '../types';
import type { LexiconSortState } from '../utils/lexiconFilters';

interface LexiconDataTableProps {
  activeTab: LexiconTabId;
  isGlobalMode: boolean;
  entries: readonly LexiconEntry[];
  sort: LexiconSortState;
  lang: ModuleLanguage;
  onToggleSort: (field: SortField) => void;
  onInspectEntry: (entry: LexiconEntry) => void;
}

interface SortableHeadProps {
  label: string;
  field: SortField;
  sort: LexiconSortState;
  onToggleSort: (field: SortField) => void;
  className?: string;
}

function SortableHead({
  label,
  field,
  sort,
  onToggleSort,
  className,
}: SortableHeadProps) {
  const active = sort.field === field;
  const SortIcon = !active
    ? ArrowUpDown
    : sort.direction === 'asc'
      ? ArrowUp
      : ArrowDown;

  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => onToggleSort(field)}
        className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
      >
        <span>{label}</span>
        <SortIcon
          className={`size-3.5 ${
            active ? 'text-primary' : 'text-muted-foreground/70'
          }`}
          aria-hidden="true"
        />
      </button>
    </TableHead>
  );
}

/**
 * Responsive Shadcn comparative EN-FR table adapting its columns cleanly to:
 * - Materials / Hides / Minerals / Treatments / Substances
 * - Ingredient / Weapon / Armor / Elderfolk Crafting Diagrams
 * - Alchemical Formulae
 * - Global cross-table comparative search
 */
export function LexiconDataTable({
  activeTab,
  isGlobalMode,
  entries,
  sort,
  lang,
  onToggleSort,
  onInspectEntry,
}: LexiconDataTableProps) {
  const copy = getLexiconTablesCopy(lang);
  const c = copy.columns;

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-12 text-center">
        <p className="text-sm font-medium text-foreground">
          {copy.emptyState.title}
        </p>
        <p className="max-w-sm text-xs text-muted-foreground">
          {copy.emptyState.description}
        </p>
      </div>
    );
  }

  // Global cross-table comparative layout
  if (isGlobalMode) {
    return (
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                label={c.nameEn}
                field="nameEn"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <SortableHead
                label={c.nameFr}
                field="nameFr"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead className="hidden sm:table-cell">{c.table}</TableHead>
              <TableHead className="hidden md:table-cell">
                {c.level} / {c.substance}
              </TableHead>
              <SortableHead
                label={c.dc}
                field="dc"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <SortableHead
                label={c.cost}
                field="cost"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead className="text-right">{c.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              const dcValue =
                entry.rowKind === 'material' ? entry.forageDc : entry.dc;
              const badgeValue =
                entry.rowKind === 'material'
                  ? entry.substance
                    ? copy.substances[entry.substance]
                    : copy.rarities[entry.rarity].code
                  : entry.rowKind === 'diagram' && entry.elderfolkKind
                    ? `${copy.levels[entry.level]} · ${
                        copy.elderfolkKinds[entry.elderfolkKind]
                      }`
                    : copy.levels[entry.level];

              return (
                <TableRow
                  key={entry.id}
                  className="cursor-pointer"
                  onClick={() => onInspectEntry(entry)}
                >
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.en}
                  </TableCell>
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.fr}
                  </TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                    {copy.tabs[entry.tabId]}
                  </TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                    {badgeValue}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-foreground tabular-nums">
                    {dcValue}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-medium text-primary tabular-nums">
                    {entry.cost}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onInspectEntry(entry);
                      }}
                    >
                      <Eye className="size-3.5" aria-hidden="true" />
                      <span className="sr-only sm:not-sr-only">
                        {copy.detail.inspect}
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Materials / Hides / Minerals / Treatments / Substances
  const isMaterialTab =
    activeTab === 'crafting-materials' ||
    activeTab === 'animal-parts' ||
    activeTab === 'minerals' ||
    activeTab === 'alchemical-treatments' ||
    activeTab === 'substances';

  if (isMaterialTab) {
    const showSubstance = activeTab === 'substances';

    return (
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                label={c.nameEn}
                field="nameEn"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <SortableHead
                label={c.nameFr}
                field="nameFr"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              {showSubstance && <TableHead>{c.substance}</TableHead>}
              <TableHead>{c.rarity}</TableHead>
              <TableHead className="hidden md:table-cell">
                {c.location}
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                {c.quantity}
              </TableHead>
              <SortableHead
                label={c.dc}
                field="dc"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <SortableHead
                label={c.weight}
                field="weight"
                sort={sort}
                onToggleSort={onToggleSort}
                className="hidden sm:table-cell"
              />
              <SortableHead
                label={c.cost}
                field="cost"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead className="text-right">{c.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              if (entry.rowKind !== 'material') return null;

              return (
                <TableRow
                  key={entry.id}
                  className="cursor-pointer"
                  onClick={() => onInspectEntry(entry)}
                >
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.en}
                  </TableCell>
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.fr}
                  </TableCell>
                  {showSubstance && (
                    <TableCell>
                      {entry.substance && (
                        <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-xs font-medium text-foreground">
                          {copy.substances[entry.substance]}
                        </span>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="font-mono text-xs text-muted-foreground tabular-nums">
                    {copy.rarities[entry.rarity].code}
                  </TableCell>
                  <TableCell className="hidden max-w-60 whitespace-normal text-xs text-muted-foreground md:table-cell">
                    {entry.location[lang]}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground tabular-nums lg:table-cell">
                    {entry.quantity[lang]}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-foreground tabular-nums">
                    {entry.forageDc}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs text-muted-foreground tabular-nums sm:table-cell">
                    {entry.weight}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-medium text-primary tabular-nums">
                    {entry.cost}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onInspectEntry(entry);
                      }}
                    >
                      <Eye className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">{copy.detail.inspect}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Formulae Table
  if (activeTab === 'formulae') {
    return (
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                label={c.nameEn}
                field="nameEn"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <SortableHead
                label={c.nameFr}
                field="nameFr"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead>{c.level}</TableHead>
              <SortableHead
                label={c.dc}
                field="dc"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead className="hidden sm:table-cell">{c.time}</TableHead>
              <TableHead className="hidden md:table-cell">
                {c.components}
              </TableHead>
              <SortableHead
                label={c.cost}
                field="cost"
                sort={sort}
                onToggleSort={onToggleSort}
              />
              <TableHead className="text-right">{c.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              if (entry.rowKind !== 'formula') return null;

              return (
                <TableRow
                  key={entry.id}
                  className="cursor-pointer"
                  onClick={() => onInspectEntry(entry)}
                >
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.en}
                  </TableCell>
                  <TableCell className="font-medium whitespace-normal text-foreground">
                    {entry.name.fr}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {copy.levels[entry.level]}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-foreground tabular-nums">
                    {entry.dc}
                  </TableCell>
                  <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                    {entry.time[lang]}
                  </TableCell>
                  <TableCell className="hidden max-w-72 whitespace-normal text-xs text-muted-foreground md:table-cell">
                    {entry.components}
                  </TableCell>
                  <TableCell className="font-mono text-xs font-medium text-primary tabular-nums">
                    {entry.cost}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onInspectEntry(entry);
                      }}
                    >
                      <Eye className="size-3.5" aria-hidden="true" />
                      <span className="sr-only">{copy.detail.inspect}</span>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Crafting Diagrams (Ingredients, Weapons, Armor, Elderfolk)
  const isElderfolk = activeTab === 'elderfolk-diagrams';

  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead
              label={c.nameEn}
              field="nameEn"
              sort={sort}
              onToggleSort={onToggleSort}
            />
            <SortableHead
              label={c.nameFr}
              field="nameFr"
              sort={sort}
              onToggleSort={onToggleSort}
            />
            {isElderfolk && (
              <TableHead className="hidden sm:table-cell">{c.type}</TableHead>
            )}
            <TableHead>{c.level}</TableHead>
            <SortableHead
              label={c.dc}
              field="dc"
              sort={sort}
              onToggleSort={onToggleSort}
            />
            <TableHead className="hidden md:table-cell">{c.time}</TableHead>
            <TableHead className="hidden xl:table-cell">
              {c.componentsEn}
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              {c.componentsFr}
            </TableHead>
            <SortableHead
              label={c.investment}
              field="investment"
              sort={sort}
              onToggleSort={onToggleSort}
              className="hidden sm:table-cell"
            />
            <SortableHead
              label={c.cost}
              field="cost"
              sort={sort}
              onToggleSort={onToggleSort}
            />
            <TableHead className="text-right">{c.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => {
            if (entry.rowKind !== 'diagram') return null;

            return (
              <TableRow
                key={entry.id}
                className="cursor-pointer"
                onClick={() => onInspectEntry(entry)}
              >
                <TableCell className="font-medium whitespace-normal text-foreground">
                  {entry.name.en}
                </TableCell>
                <TableCell className="font-medium whitespace-normal text-foreground">
                  {entry.name.fr}
                </TableCell>
                {isElderfolk && (
                  <TableCell className="hidden text-xs text-muted-foreground sm:table-cell">
                    {entry.elderfolkKind
                      ? copy.elderfolkKinds[entry.elderfolkKind]
                      : '—'}
                  </TableCell>
                )}
                <TableCell className="text-xs text-muted-foreground">
                  {copy.levels[entry.level]}
                </TableCell>
                <TableCell className="font-mono text-xs text-foreground tabular-nums">
                  {entry.dc}
                </TableCell>
                <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                  {entry.time[lang]}
                </TableCell>
                <TableCell className="hidden max-w-64 whitespace-normal text-xs text-muted-foreground xl:table-cell">
                  {entry.components.en}
                </TableCell>
                <TableCell className="hidden max-w-64 whitespace-normal text-xs text-muted-foreground lg:table-cell">
                  {entry.components.fr}
                </TableCell>
                <TableCell className="hidden font-mono text-xs text-muted-foreground tabular-nums sm:table-cell">
                  {entry.investment}
                </TableCell>
                <TableCell className="font-mono text-xs font-medium text-primary tabular-nums">
                  {entry.cost}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      onInspectEntry(entry);
                    }}
                  >
                    <Eye className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">{copy.detail.inspect}</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
