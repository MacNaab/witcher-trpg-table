import type { LexiconTablesCopy } from '../i18n';
import type {
  CraftLevelId,
  ElderfolkKindId,
  LexiconEntry,
  LexiconTabId,
  ModuleLanguage,
  RarityCode,
  SortDirection,
  SortField,
  SubstanceId,
} from '../types';

export interface LexiconFilterState {
  search: string;
  tableFilter: 'all' | LexiconTabId;
  level: 'all' | CraftLevelId;
  rarity: 'all' | RarityCode;
  substance: 'all' | SubstanceId;
  elderfolkKind: 'all' | ElderfolkKindId;
}

export interface LexiconSortState {
  field: SortField;
  direction: SortDirection;
}

/**
 * Strips accents and normalizes text for fast EN/FR comparative searching.
 */
export function normalizeLexiconSearch(value: string | undefined): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function parseSortableNumber(raw: string): number | null {
  const cleaned = raw.replace(',', '.').trim();
  if (!cleaned || cleaned.toUpperCase() === 'N/A' || cleaned === '—') {
    return null;
  }
  const parsed = Number.parseFloat(cleaned);
  return Number.isNaN(parsed) ? null : parsed;
}

function compareNumericStrings(
  aRaw: string,
  bRaw: string,
  direction: SortDirection
): number {
  const aNum = parseSortableNumber(aRaw);
  const bNum = parseSortableNumber(bRaw);
  if (aNum === null && bNum === null) return 0;
  if (aNum === null) return 1;
  if (bNum === null) return -1;
  return direction === 'asc' ? aNum - bNum : bNum - aNum;
}

function getSearchableParts(
  entry: LexiconEntry,
  copy: LexiconTablesCopy
): string[] {
  const base = [entry.name.en, entry.name.fr, copy.tabs[entry.tabId], entry.cost];

  if (entry.rowKind === 'material') {
    base.push(
      entry.location.en,
      entry.location.fr,
      entry.quantity.en,
      entry.quantity.fr,
      entry.forageDc,
      entry.weight
    );
    if (entry.substance) {
      base.push(copy.substances[entry.substance]);
    }
    return base;
  }

  if (entry.rowKind === 'diagram') {
    base.push(
      copy.levels[entry.level],
      entry.dc,
      entry.time.en,
      entry.time.fr,
      entry.components.en,
      entry.components.fr,
      entry.investment
    );
    if (entry.elderfolkKind) {
      base.push(copy.elderfolkKinds[entry.elderfolkKind]);
    }
    return base;
  }

  base.push(
    copy.levels[entry.level],
    entry.dc,
    entry.time.en,
    entry.time.fr,
    entry.components
  );
  return base;
}

/**
 * Applies active search, attribute filters, and column sorting to a lexicon dataset.
 */
export function filterAndSortLexiconEntries(
  entries: readonly LexiconEntry[],
  filters: LexiconFilterState,
  sort: LexiconSortState,
  copy: LexiconTablesCopy,
  lang: ModuleLanguage,
  isGlobalMode: boolean
): LexiconEntry[] {
  const query = normalizeLexiconSearch(filters.search);

  const filtered = entries.filter((entry) => {
    if (isGlobalMode && filters.tableFilter !== 'all') {
      if (entry.tabId !== filters.tableFilter) return false;
    }

    if (filters.level !== 'all') {
      if (entry.rowKind === 'material' || entry.level !== filters.level) {
        return false;
      }
    }

    if (filters.rarity !== 'all') {
      if (entry.rowKind !== 'material' || entry.rarity !== filters.rarity) {
        return false;
      }
    }

    if (filters.substance !== 'all') {
      if (
        entry.rowKind !== 'material' ||
        entry.substance !== filters.substance
      ) {
        return false;
      }
    }

    if (filters.elderfolkKind !== 'all') {
      if (
        entry.rowKind !== 'diagram' ||
        entry.elderfolkKind !== filters.elderfolkKind
      ) {
        return false;
      }
    }

    if (!query) return true;

    return getSearchableParts(entry, copy).some((part) =>
      normalizeLexiconSearch(part).includes(query)
    );
  });

  if (sort.field === 'default') {
    return filtered;
  }

  const locale = lang === 'fr' ? 'fr' : 'en';
  const dir = sort.direction === 'asc' ? 1 : -1;

  return [...filtered].sort((a, b) => {
    switch (sort.field) {
      case 'nameEn':
        return (
          a.name.en.localeCompare(b.name.en, 'en', { sensitivity: 'base' }) *
          dir
        );
      case 'nameFr':
        return (
          a.name.fr.localeCompare(b.name.fr, 'fr', { sensitivity: 'base' }) *
          dir
        );
      case 'cost':
        return compareNumericStrings(a.cost, b.cost, sort.direction);
      case 'dc': {
        const aDc = a.rowKind === 'material' ? a.forageDc : a.dc;
        const bDc = b.rowKind === 'material' ? b.forageDc : b.dc;
        return compareNumericStrings(aDc, bDc, sort.direction);
      }
      case 'investment': {
        const aInv = a.rowKind === 'diagram' ? a.investment : 'N/A';
        const bInv = b.rowKind === 'diagram' ? b.investment : 'N/A';
        return compareNumericStrings(aInv, bInv, sort.direction);
      }
      case 'weight': {
        const aW = a.rowKind === 'material' ? a.weight : 'N/A';
        const bW = b.rowKind === 'material' ? b.weight : 'N/A';
        return compareNumericStrings(aW, bW, sort.direction);
      }
      default:
        return a.name[locale].localeCompare(b.name[locale], locale);
    }
  });
}

/**
 * Formats any lexicon entry as clean EN/FR plain text for clipboard copying.
 */
export function formatLexiconEntryAsText(
  entry: LexiconEntry,
  copy: LexiconTablesCopy,
  lang: ModuleLanguage
): string {
  const c = copy.columns;
  const lines = [
    `${copy.tabs[entry.tabId]}`,
    `${c.nameEn}: ${entry.name.en}`,
    `${c.nameFr}: ${entry.name.fr}`,
  ];

  if (entry.rowKind === 'material') {
    if (entry.substance) {
      lines.push(`${c.substance}: ${copy.substances[entry.substance]}`);
    }
    lines.push(
      `${c.rarity}: ${copy.rarities[entry.rarity].label}`,
      `${c.location}: ${entry.location[lang]}`,
      `${c.quantity}: ${entry.quantity[lang]}`,
      `${c.forageDc}: ${entry.forageDc}`,
      `${c.weight}: ${entry.weight} ${copy.detail.weightUnit}`,
      `${c.cost}: ${entry.cost} ${copy.detail.crownsUnit}`
    );
    return lines.join('\n');
  }

  if (entry.rowKind === 'diagram') {
    if (entry.elderfolkKind) {
      lines.push(`${c.type}: ${copy.elderfolkKinds[entry.elderfolkKind]}`);
    }
    lines.push(
      `${c.level}: ${copy.levels[entry.level]}`,
      `${c.dc}: ${entry.dc}`,
      `${c.time}: ${entry.time[lang]}`,
      `${c.componentsEn}: ${entry.components.en}`,
      `${c.componentsFr}: ${entry.components.fr}`,
      `${c.investment}: ${entry.investment} ${copy.detail.crownsUnit}`,
      `${c.cost}: ${entry.cost} ${copy.detail.crownsUnit}`
    );
    return lines.join('\n');
  }

  lines.push(
    `${c.level}: ${copy.levels[entry.level]}`,
    `${c.dc}: ${entry.dc}`,
    `${c.time}: ${entry.time[lang]}`,
    `${c.components}: ${entry.components}`,
    `${c.cost}: ${entry.cost} ${copy.detail.crownsUnit}`
  );
  return lines.join('\n');
}
