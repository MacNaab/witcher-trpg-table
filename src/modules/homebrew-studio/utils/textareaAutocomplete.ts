import { MONSTER_CATEGORY_EMBLEM_MAP } from '@/src/data/bestiary/categoryEmblems';
import { getCreatureTypeLabel } from '@/src/data/bestiary/environments';
import type { CreatureTypeId } from '@/src/data/bestiary/types';
import type { ModuleLanguage } from '../types';

export interface CreatureTypeSuggestion {
  id: CreatureTypeId;
  labelFr: string;
  labelEn: string;
  emblemUrl: string;
  searchTokens: string;
}

export interface TypeAutocompleteMatch {
  /** Character offset right after `type:` where replacement begins */
  replaceStart: number;
  /** Character offset at the end of the current type token on the line */
  replaceEnd: number;
  /** Current typed query after `type:` (trimmed of leading spaces) */
  query: string;
  /** True when the current value already matches one of the 12 canonical IDs verbatim */
  isExactCanonicalId: boolean;
}

export interface CaretPopupCoords {
  top: number;
  left: number;
  openUpward: boolean;
}

const ORDERED_CREATURE_TYPE_IDS: readonly CreatureTypeId[] = [
  'beast',
  'draconid',
  'elemental',
  'humanoid',
  'hybrid',
  'insectoid',
  'cursed',
  'necrophage',
  'ogroid',
  'specter',
  'vampire',
  'relict',
];

const EXTRA_ALIASES: Record<CreatureTypeId, string[]> = {
  beast: ['bete', 'animal'],
  draconid: ['draconide', 'dragon'],
  elemental: ['elementaire', 'construct'],
  humanoid: ['humanoide'],
  hybrid: ['hybride'],
  insectoid: ['insectoide'],
  cursed: ['maudit', 'lycanthrope'],
  necrophage: ['necrophage', 'ghoul', 'goule'],
  ogroid: ['ogroide', 'troll'],
  specter: ['spectre', 'wraith'],
  vampire: ['vampire'],
  relict: ['relictuel', 'vestige', 'sylvan'],
};

function stripAccents(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const ALL_CREATURE_TYPE_SUGGESTIONS: readonly CreatureTypeSuggestion[] =
  ORDERED_CREATURE_TYPE_IDS.map((id) => {
    const labelFr = getCreatureTypeLabel(id, 'fr');
    const labelEn = getCreatureTypeLabel(id, 'en');
    const tokens = [id, labelFr, labelEn, ...EXTRA_ALIASES[id]]
      .map(stripAccents)
      .join(' ');
    return {
      id,
      labelFr,
      labelEn,
      emblemUrl: MONSTER_CATEGORY_EMBLEM_MAP[id],
      searchTokens: tokens,
    };
  });

const CANONICAL_SET = new Set<string>(ORDERED_CREATURE_TYPE_IDS);

/**
 * Inspects the Markdown line around `caretOffset` to check whether the user is
 * writing or editing a `type:` (or `creaturetype:` / `categorie:`) directive value.
 */
export function detectCreatureTypeAutocomplete(
  markdown: string,
  caretOffset: number
): TypeAutocompleteMatch | null {
  const safeOffset = Math.max(0, Math.min(markdown.length, caretOffset));
  const lineStart = markdown.lastIndexOf('\n', safeOffset - 1) + 1;
  const nextNewline = markdown.indexOf('\n', safeOffset);
  const lineEnd = nextNewline === -1 ? markdown.length : nextNewline;

  const beforeCaret = markdown.slice(lineStart, safeOffset);
  const afterCaret = markdown.slice(safeOffset, lineEnd);

  const keyMatch = beforeCaret.match(
    /^(\s*(?:type|creaturetype|categorie|catégorie)\s*:)[ \t]*([A-Za-zÀ-ÿ_-]*)$/i
  );
  if (!keyMatch) return null;

  // Avoid triggering if the user placed the cursor before unrelated trailing prose on the same line
  if (!/^[A-Za-zÀ-ÿ_-]*[ \t]*$/.test(afterCaret)) return null;

  const replaceStart = lineStart + keyMatch[1].length;
  const rawFullValue = markdown.slice(replaceStart, lineEnd).trim();
  const query = keyMatch[2] ?? '';

  return {
    replaceStart,
    replaceEnd: lineEnd,
    query,
    isExactCanonicalId: CANONICAL_SET.has(rawFullValue.toLowerCase()),
  };
}

/**
 * Filters and ranks the 12 canonical creature category suggestions against the typed query.
 */
export function filterCreatureTypeSuggestions(
  query: string
): CreatureTypeSuggestion[] {
  const q = stripAccents(query.trim());
  if (!q) return [...ALL_CREATURE_TYPE_SUGGESTIONS];

  const scored: Array<{ item: CreatureTypeSuggestion; rank: number }> = [];
  for (const item of ALL_CREATURE_TYPE_SUGGESTIONS) {
    const idNorm = item.id.toLowerCase();
    const frNorm = stripAccents(item.labelFr);
    const enNorm = stripAccents(item.labelEn);

    if (idNorm.startsWith(q)) {
      scored.push({ item, rank: 0 });
    } else if (frNorm.startsWith(q) || enNorm.startsWith(q)) {
      scored.push({ item, rank: 1 });
    } else if (item.searchTokens.includes(q)) {
      scored.push({ item, rank: 2 });
    }
  }

  scored.sort((a, b) => a.rank - b.rank);
  return scored.map((s) => s.item);
}

/**
 * Computes anchored `{ top, left, openUpward }` coordinates inside the `<textarea>`
 * container for positioning the floating autocomplete menu right next to the caret.
 */
export function measureTextareaCaretCoords(
  textarea: HTMLTextAreaElement,
  offset: number,
  popupWidth = 280,
  popupHeight = 260
): CaretPopupCoords {
  if (typeof document === 'undefined') {
    return { top: 36, left: 16, openUpward: false };
  }

  const cs = window.getComputedStyle(textarea);
  const mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  mirror.style.position = 'fixed';
  mirror.style.top = '-99999px';
  mirror.style.left = '-99999px';
  mirror.style.visibility = 'hidden';
  mirror.style.pointerEvents = 'none';
  mirror.style.boxSizing = 'border-box';
  mirror.style.width = `${textarea.clientWidth}px`;
  mirror.style.paddingTop = cs.paddingTop;
  mirror.style.paddingRight = cs.paddingRight;
  mirror.style.paddingBottom = cs.paddingBottom;
  mirror.style.paddingLeft = cs.paddingLeft;
  mirror.style.fontFamily = cs.fontFamily;
  mirror.style.fontSize = cs.fontSize;
  mirror.style.fontWeight = cs.fontWeight;
  mirror.style.lineHeight = cs.lineHeight;
  mirror.style.letterSpacing = cs.letterSpacing;
  mirror.style.tabSize = cs.tabSize;
  mirror.style.whiteSpace = 'pre-wrap';
  mirror.style.overflowWrap = 'break-word';
  mirror.style.wordBreak = 'normal';

  const normalizedBefore = textarea.value.slice(0, offset).replace(/\r\n/g, '\n');
  mirror.appendChild(document.createTextNode(normalizedBefore));

  const caretSpan = document.createElement('span');
  caretSpan.textContent = '\u200B';
  mirror.appendChild(caretSpan);

  document.body.appendChild(mirror);
  const lineH = Number.parseFloat(cs.lineHeight) || 19;
  const rawTop = caretSpan.offsetTop - textarea.scrollTop;
  const rawLeft = caretSpan.offsetLeft - textarea.scrollLeft;
  document.body.removeChild(mirror);

  const maxLeft = Math.max(8, textarea.clientWidth - popupWidth - 12);
  const clampedLeft = Math.max(8, Math.min(maxLeft, rawLeft));

  const spaceBelow = textarea.clientHeight - (rawTop + lineH + 4);
  const openUpward = spaceBelow < popupHeight && rawTop > popupHeight;

  const top = openUpward
    ? Math.max(8, rawTop - 4)
    : Math.max(8, Math.min(textarea.clientHeight - 40, rawTop + lineH + 4));

  return {
    top,
    left: clampedLeft,
    openUpward,
  };
}

export function getSuggestionSecondaryLabel(
  item: CreatureTypeSuggestion,
  lang: ModuleLanguage
): string {
  return lang === 'fr'
    ? `${item.labelFr} · ${item.labelEn}`
    : `${item.labelEn} · ${item.labelFr}`;
}
