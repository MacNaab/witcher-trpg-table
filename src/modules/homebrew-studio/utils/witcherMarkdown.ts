import type {
  BackCoverData,
  BestiaryLeftPageData,
  BestiaryRightPageData,
  CharacterSheetPageData,
  CoverPageData,
  MarkdownBlockNode,
  ParsedHomebrewPage,
  StatblockEntry,
  TocConfig,
  TocEntry,
} from '../types';
import {
  parseBestiaryLeftBlock,
  parseBestiaryRightBlock,
} from './bestiaryFormatters';
import { parseCharacterSheetBlock } from './characterSheetFormatters';

function parseStatblockLines(lines: string[]): StatblockEntry {
  const entry: StatblockEntry = {
    title: 'Créature / PNJ',
    stats: [],
    derived: [],
    traits: [],
    bodyLines: [],
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith('title:')) {
      entry.title = line.slice(6).trim();
    } else if (line.startsWith('subtitle:')) {
      entry.subtitle = line.slice(9).trim();
    } else if (line.startsWith('stats:')) {
      const pairs = line
        .slice(6)
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
      for (const pair of pairs) {
        const match = pair.match(/^([A-Za-zÀ-ÿ]+)\s+(.+)$/);
        if (match) {
          entry.stats.push({ label: match[1].trim(), value: match[2].trim() });
        }
      }
    } else if (line.startsWith('derived:')) {
      const pairs = line
        .slice(8)
        .split('|')
        .map((part) => part.trim())
        .filter(Boolean);
      for (const pair of pairs) {
        const match = pair.match(/^([A-Za-zÀ-ÿ\s.]+?)\s+([0-9+\-/m]+.*)$/);
        if (match) {
          entry.derived.push({ label: match[1].trim(), value: match[2].trim() });
        } else {
          const idx = pair.indexOf(':');
          if (idx > 0) {
            entry.derived.push({
              label: pair.slice(0, idx).trim(),
              value: pair.slice(idx + 1).trim(),
            });
          }
        }
      }
    } else if (line.includes(':') && !line.startsWith('-')) {
      const idx = line.indexOf(':');
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if (key.length <= 28 && val.length > 0) {
        entry.traits.push({ label: key, value: val });
      } else {
        entry.bodyLines.push(line);
      }
    } else {
      entry.bodyLines.push(line.replace(/^[-*]\s+/, ''));
    }
  }

  return entry;
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

function isTableSeparatorLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes('|') && !trimmed.includes('-')) return false;
  const cells = parseTableRow(trimmed);
  return cells.length > 0 && cells.every((c) => /^:?-{2,}:?$/.test(c));
}

/**
 * Parses standard Markdown lines (headings, blockquotes, lists, tables, images, hr, paragraphs).
 */
export function parseMarkdownBlockNodes(
  rawText: string,
  fullHeightImages = false
): MarkdownBlockNode[] {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const nodes: MarkdownBlockNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Nested callout or statblock inside standard flow
    if (/^:::\s*callout\b/i.test(trimmed)) {
      const title = trimmed.replace(/^:::\s*callout\b/i, '').trim() || undefined;
      const innerLines: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ':::') {
        innerLines.push(lines[i]);
        i += 1;
      }
      i += 1; // skip closing :::
      nodes.push({
        type: 'callout',
        title,
        nodes: parseMarkdownBlockNodes(innerLines.join('\n')),
      });
      continue;
    }

    if (/^:::\s*statblock\b/i.test(trimmed)) {
      const innerLines: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== ':::') {
        innerLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      nodes.push({
        type: 'statblock',
        data: parseStatblockLines(innerLines),
      });
      continue;
    }

    // Witcher Signs ornamental divider (::: signs / [[signs]])
    if (/^(?::::\s*signs(?:\s*:::)?|\[{1,2}signs\]{1,2})$/i.test(trimmed)) {
      nodes.push({ type: 'signs' });
      i += 1;
      continue;
    }

    // Stray ::: delimiter (e.g., while user is mid-typing a directive) -> skip safely
    if (/^:::\s*$/.test(trimmed)) {
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      nodes.push({ type: 'hr' });
      i += 1;
      continue;
    }

    // Heading (# .. ######, clamped to levels 1..4)
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(4, headingMatch[1].length) as 1 | 2 | 3 | 4;
      nodes.push({
        type: 'heading',
        level,
        text: headingMatch[2].trim(),
      });
      i += 1;
      continue;
    }

    // Standalone image ![alt](src)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      nodes.push({
        type: 'image',
        alt: imgMatch[1].trim(),
        src: imgMatch[2].trim(),
        fullHeight: fullHeightImages,
      });
      i += 1;
      continue;
    }

    // Blockquote (> ...)
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      nodes.push({ type: 'blockquote', lines: quoteLines });
      continue;
    }

    // Markdown Table
    if (
      trimmed.includes('|') &&
      i + 1 < lines.length &&
      isTableSeparatorLine(lines[i + 1])
    ) {
      const headers = parseTableRow(trimmed);
      const rows: string[][] = [];
      i += 2; // skip header & separator
      while (i < lines.length && lines[i].trim().includes('|')) {
        const rowLine = lines[i].trim();
        if (!rowLine || rowLine.startsWith(':::')) break;
        rows.push(parseTableRow(rowLine));
        i += 1;
      }
      nodes.push({ type: 'table', headers, rows });
      continue;
    }

    // Unordered list (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }
      nodes.push({ type: 'list', ordered: false, items });
      continue;
    }

    // Ordered list (1. )
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      nodes.push({ type: 'list', ordered: true, items });
      continue;
    }

    // Paragraph (collect consecutive non-special lines; always consume at least lines[i])
    const startIndex = i;
    const paraLines: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (
        paraLines.length > 0 &&
        (!cur ||
          /^#{1,6}\s+/.test(cur) ||
          cur.startsWith('>') ||
          /^:::\s*(?:callout|statblock|signs|$)/i.test(cur) ||
          /^\[{1,2}signs\]{1,2}$/i.test(cur) ||
          /^[-*]\s+/.test(cur) ||
          /^\d+\.\s+/.test(cur) ||
          /^(-{3,}|\*{3,}|_{3,})$/.test(cur) ||
          /^!\[([^\]]*)\]\(([^)]+)\)$/.test(cur) ||
          (cur.includes('|') &&
            i + 1 < lines.length &&
            isTableSeparatorLine(lines[i + 1])))
      ) {
        break;
      }
      paraLines.push(cur);
      i += 1;
    }
    if (i === startIndex) {
      i += 1;
    }
    if (paraLines.length > 0) {
      nodes.push({ type: 'paragraph', text: paraLines.join(' ') });
    }
  }

  return nodes;
}

function parseCoverBlock(raw: string): CoverPageData {
  const cover: CoverPageData = {
    title: 'THE WITCHER',
  };
  let hasExplicitTitle = false;

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      cover.image = imgMatch[2].trim();
      continue;
    }

    if (/^#\s+/.test(line)) {
      cover.title = line.replace(/^#\s+/, '').trim();
      hasExplicitTitle = true;
      continue;
    }

    if (/^##\s+/.test(line)) {
      cover.subtitle = line.replace(/^##\s+/, '').trim();
      continue;
    }

    if (line.startsWith('>')) {
      const q = line.replace(/^>\s?/, '').trim();
      cover.tagline = cover.tagline ? `${cover.tagline} ${q}` : q;
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z]+)\s*:\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === 'overline' || key === 'series' || key === 'eyebrow') {
        cover.overline = val;
      } else if (key === 'title' || key === 'titre') {
        cover.title = val;
        hasExplicitTitle = true;
      } else if (key === 'subtitle' || key === 'soustitre') {
        cover.subtitle = val;
      } else if (key === 'tagline' || key === 'accroche' || key === 'quote') {
        cover.tagline = val;
      } else if (key === 'image' || key === 'bg' || key === 'art') {
        cover.image = val;
      } else if (key === 'creditleft' || key === 'left') {
        cover.creditLeft = val;
      } else if (key === 'creditright' || key === 'right') {
        cover.creditRight = val;
      }
      continue;
    }

    if (!hasExplicitTitle) {
      cover.title = line;
      hasExplicitTitle = true;
    } else if (!cover.tagline) {
      cover.tagline = line;
    }
  }

  return cover;
}

function parseTocBlock(raw: string): TocConfig {
  const toc: TocConfig = {
    title: 'Sommaire',
  };

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      toc.image = imgMatch[2].trim();
      continue;
    }

    if (/^#{1,2}\s+/.test(line)) {
      toc.title = line.replace(/^#{1,2}\s+/, '').trim();
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z]+)\s*:\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === 'title' || key === 'titre') {
        toc.title = val;
      } else if (key === 'image' || key === 'bg' || key === 'art') {
        toc.image = val;
      } else if (key === 'includeaside' || key === 'aside') {
        toc.includeAside = val.toLowerCase() === 'true' || val === '1' || val.toLowerCase() === 'oui';
      }
      continue;
    }
  }

  return toc;
}

function parseBackCoverBlock(raw: string): BackCoverData {
  const data: BackCoverData = {
    paragraphs: [],
    featuringTitle: 'Au programme',
    features: [],
  };
  let currentParagraph: string[] = [];

  const flushPara = () => {
    if (currentParagraph.length > 0) {
      data.paragraphs.push(currentParagraph.join(' '));
      currentParagraph = [];
    }
  };

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushPara();
      data.image = imgMatch[2].trim();
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      flushPara();
      data.featuringTitle = line.replace(/^#{1,3}\s+/, '').trim();
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushPara();
      const body = line.replace(/^[-*]\s+/, '').trim();
      const pipeIdx = body.indexOf('|');
      if (pipeIdx > 0) {
        data.features.push({
          title: body.slice(0, pipeIdx).replace(/\*\*/g, '').trim(),
          description: body.slice(pipeIdx + 1).trim(),
        });
      } else {
        const boldColon = body.match(/^\*\*([^*]+)\*\*\s*:?\s*(.*)$/);
        if (boldColon) {
          data.features.push({
            title: boldColon[1].trim(),
            description: boldColon[2].trim() || undefined,
          });
        } else {
          const colonIdx = body.indexOf(':');
          if (colonIdx > 0 && colonIdx <= 36) {
            data.features.push({
              title: body.slice(0, colonIdx).trim(),
              description: body.slice(colonIdx + 1).trim(),
            });
          } else {
            data.features.push({ title: body });
          }
        }
      }
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z0-9]+)\s*:\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === 'image' || key === 'bg' || key === 'art') {
        flushPara();
        data.image = val;
        continue;
      }
      if (key === 'featuring' || key === 'features' || key === 'programme') {
        flushPara();
        data.featuringTitle = val;
        continue;
      }
      if (key === 'creditleft' || key === 'left') {
        flushPara();
        data.creditLeft = val;
        continue;
      }
      if (key === 'creditright' || key === 'right') {
        flushPara();
        data.creditRight = val;
        continue;
      }
      if (key === 'code' || key === 'isbn' || key === 'edition') {
        flushPara();
        data.editionCode = val;
        continue;
      }
      if (key.startsWith('pitch') || key === 'summary' || key === 'synopsis') {
        flushPara();
        data.paragraphs.push(val);
        continue;
      }
    }

    currentParagraph.push(line);
  }

  flushPara();
  return data;
}

function parseArtPageBlock(raw: string): { image: string; caption?: string } {
  let image = 'preset:grimoire';
  let caption: string | undefined;

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      image = imgMatch[2].trim();
      if (imgMatch[1].trim() && !caption) {
        caption = imgMatch[1].trim();
      }
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z]+)\s*:\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === 'image' || key === 'src' || key === 'art') {
        image = val;
      } else if (key === 'caption' || key === 'title' || key === 'legende') {
        caption = val;
      }
    }
  }

  return { image, caption };
}

/**
 * Splits a full Markdown document on `\page` / `---page---` and extracts
 * `::: cover`, `::: backcover`, `::: art-page`, `::: toc`, `::: aside`,
 * `::: bottom-art`, `::: banner`, and main 2-column prose blocks with automatic H1/H2 TOC indexing.
 */
export function parseHomebrewDocument(
  markdown: string,
  startPageNumber = 1
): ParsedHomebrewPage[] {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const rawPages = normalized.split(/^\s*(?:\\page|---page---)\s*$/gim);

  let runningPageNumber = Math.max(1, startPageNumber);

  // Pass 1: parse all pages and assign display page numbers (covers do not increment content pagination)
  const pages: ParsedHomebrewPage[] = rawPages.map((rawPage, idx) => {
    const lines = rawPage.split('\n');
    const mainLines: string[] = [];
    const asideChunks: string[] = [];
    const bottomChunks: string[] = [];
    const bannerChunks: string[] = [];
    let coverData: CoverPageData | undefined;
    let backCoverData: BackCoverData | undefined;
    let artPageData: { image: string; caption?: string } | undefined;
    let bestiaryLeftData: BestiaryLeftPageData | undefined;
    let bestiaryRightData: BestiaryRightPageData | undefined;
    let characterSheetData: CharacterSheetPageData | undefined;
    let tocConfig: TocConfig | undefined;
    let explicitChapterOpener = false;

    let i = 0;
    const collectDirectiveBlock = (): string => {
      const inner: string[] = [];
      let depth = 1;
      i += 1;
      while (i < lines.length) {
        const curTrimmed = lines[i].trim();
        if (/^:::\s+\S+/.test(curTrimmed) && !/^:::\s*signs\b/i.test(curTrimmed)) {
          depth += 1;
        } else if (curTrimmed === ':::') {
          depth -= 1;
          if (depth === 0) {
            i += 1;
            break;
          }
        }
        inner.push(lines[i]);
        i += 1;
      }
      return inner.join('\n');
    };

    while (i < lines.length) {
      const trimmed = lines[i].trim();

      if (/^:::\s*cover\b/i.test(trimmed)) {
        coverData = parseCoverBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*(?:backcover|back-cover|quatrieme)\b/i.test(trimmed)) {
        backCoverData = parseBackCoverBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*(?:art-page|full-art|splash)\b/i.test(trimmed)) {
        artPageData = parseArtPageBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*bestiary-left\b/i.test(trimmed)) {
        bestiaryLeftData = parseBestiaryLeftBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*bestiary-right\b/i.test(trimmed)) {
        bestiaryRightData = parseBestiaryRightBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*(?:character-sheet|fiche-pj|pc-sheet)\b/i.test(trimmed)) {
        characterSheetData = parseCharacterSheetBlock(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*chapter\b/i.test(trimmed)) {
        explicitChapterOpener = true;
        i += 1;
        continue;
      }

      if (/^:::\s*toc\b/i.test(trimmed)) {
        tocConfig = parseTocBlock(collectDirectiveBlock());
        continue;
      }

      if (/^\[{1,2}toc\]{1,2}$/i.test(trimmed)) {
        tocConfig = tocConfig ?? { title: 'Sommaire' };
        i += 1;
        continue;
      }

      if (/^:::\s*(aside|sidebar|side-art)\b/i.test(trimmed)) {
        asideChunks.push(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*(bottom-art|wide|bottom)\b/i.test(trimmed)) {
        bottomChunks.push(collectDirectiveBlock());
        continue;
      }

      if (/^:::\s*banner\b/i.test(trimmed)) {
        bannerChunks.push(collectDirectiveBlock());
        continue;
      }

      mainLines.push(lines[i]);
      i += 1;
    }

    const asideNodes = asideChunks.flatMap((chunk) =>
      parseMarkdownBlockNodes(chunk, true)
    );
    const bottomNodes = bottomChunks.flatMap((chunk) =>
      parseMarkdownBlockNodes(chunk, true)
    );
    const bannerNodes = bannerChunks.flatMap((chunk) =>
      parseMarkdownBlockNodes(chunk)
    );
    const mainNodes = parseMarkdownBlockNodes(mainLines.join('\n'));

    const isCover = Boolean(coverData);
    const isBackCover = !isCover && Boolean(backCoverData);

    // Auto-detect full-page illustration when a page only holds a single standalone image
    let isArtPage =
      !isCover &&
      !isBackCover &&
      !tocConfig &&
      !bestiaryLeftData &&
      !bestiaryRightData &&
      !characterSheetData &&
      Boolean(artPageData);
    if (
      !isCover &&
      !isBackCover &&
      !tocConfig &&
      !bestiaryLeftData &&
      !bestiaryRightData &&
      !characterSheetData &&
      !isArtPage &&
      asideNodes.length === 0 &&
      bannerNodes.length === 0 &&
      bottomNodes.length === 0 &&
      mainNodes.length === 1 &&
      mainNodes[0].type === 'image'
    ) {
      isArtPage = true;
      artPageData = {
        image: mainNodes[0].src,
        caption: mainNodes[0].alt || undefined,
      };
    }

    // Chapter Opener layout whenever a content page begins with # (matches "The World of the Witcher" H1 style)
    const startsWithH1 = mainNodes[0]?.type === 'heading' && mainNodes[0].level === 1;
    const isChapterOpener =
      !isCover &&
      !isBackCover &&
      !tocConfig &&
      !isArtPage &&
      !bestiaryLeftData &&
      !bestiaryRightData &&
      !characterSheetData &&
      (startsWithH1 || explicitChapterOpener);

    const unnumbered = isCover || isBackCover;
    const pageNumber = unnumbered ? 0 : runningPageNumber;
    const isEven = unnumbered ? false : pageNumber % 2 === 0;
    if (!unnumbered) {
      runningPageNumber += 1;
    }

    return {
      pageIndex: idx,
      pageNumber,
      isEven,
      isCover,
      isBackCover,
      isArtPage,
      isChapterOpener,
      coverData,
      backCoverData,
      artPageData,
      bestiaryLeftData,
      bestiaryRightData,
      characterSheetData,
      tocConfig,
      tocEntries: [],
      bannerNodes,
      mainNodes,
      asideNodes,
      bottomNodes,
    };
  });

  // Pass 2: collect all H1 (#), H2 (##), Bestiary monster names, and PC/NPC character sheet names for Smart TOC
  const collectHeadings = (includeAside: boolean): TocEntry[] => {
    const entries: TocEntry[] = [];
    for (const p of pages) {
      if (p.isCover || p.isBackCover || p.isArtPage || p.tocConfig) continue;
      if (p.bestiaryLeftData?.name) {
        entries.push({
          level: 1,
          text: p.bestiaryLeftData.name,
          pageNumber: p.pageNumber,
        });
      }
      if (p.characterSheetData?.name) {
        entries.push({
          level: 1,
          text: p.characterSheetData.name,
          pageNumber: p.pageNumber,
        });
      }
      const pools = includeAside
        ? [p.bannerNodes, p.mainNodes, p.asideNodes]
        : [p.bannerNodes, p.mainNodes];
      for (const pool of pools) {
        for (const node of pool) {
          if (node.type === 'heading' && (node.level === 1 || node.level === 2)) {
            entries.push({
              level: node.level,
              text: node.text,
              pageNumber: p.pageNumber,
            });
          }
        }
      }
    }
    return entries;
  };

  const standardEntries = collectHeadings(false);
  const withAsideEntries = collectHeadings(true);

  return pages.map((p) =>
    p.tocConfig
      ? {
          ...p,
          tocEntries: p.tocConfig.includeAside ? withAsideEntries : standardEntries,
        }
      : p
  );
}

export interface SmartTocLayout {
  columnCount: 1 | 2 | 3;
  columns: TocEntry[][];
  compact: boolean;
}

/**
 * Computes an adaptive 1-to-3 column Table of Contents layout that always fills
 * the leftmost column top-to-bottom first before spilling into the next column.
 */
export function computeSmartTocLayout(
  entries: TocEntry[],
  pageWidthPx: number,
  pageHeightPx: number,
  hasBottomArt: boolean
): SmartTocLayout {
  if (entries.length === 0) {
    return { columnCount: 1, columns: [[]], compact: false };
  }

  const innerWidthPx = Math.max(320, pageWidthPx - 84);
  // Available vertical space inside page-inner below the centered TOC heading
  const baseHeightPx = pageHeightPx - 28 - 88 - 48 - 14;
  const availableHeightPx = Math.max(
    260,
    hasBottomArt ? baseHeightPx - 261 : baseHeightPx
  );

  const estimateEntryHeight = (
    entry: TocEntry,
    isFirstInCol: boolean,
    colWidthPx: number,
    compact: boolean
  ): number => {
    const isH1 = entry.level === 1;
    const avgCharW = isH1 ? (compact ? 5.3 : 5.9) : compact ? 4.7 : 5.2;
    const charsPerLine = Math.max(16, Math.floor((colWidthPx - 28) / avgCharW));
    const lines = Math.max(1, Math.ceil(entry.text.length / charsPerLine));
    const linePx = isH1 ? (compact ? 12.2 : 13.6) : compact ? 11.2 : 12.4;
    const topGap = isH1 ? (isFirstInCol ? 0 : compact ? 5 : 8) : compact ? 1 : 2;
    const bottomGap = isH1 ? 2 : 1.5;
    return topGap + lines * linePx + bottomGap;
  };

  const tryPack = (
    maxCols: 1 | 2 | 3,
    compact: boolean
  ): { columns: TocEntry[][]; fits: boolean } => {
    const colGap = 20;
    const colWidthPx = (innerWidthPx - (maxCols - 1) * colGap) / maxCols;
    const columns: TocEntry[][] = Array.from({ length: maxCols }, () => []);
    const heights: number[] = Array(maxCols).fill(0);
    let colIdx = 0;

    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      const isFirstInCol = columns[colIdx].length === 0;
      const h = estimateEntryHeight(entry, isFirstInCol, colWidthPx, compact);

      if (
        !isFirstInCol &&
        colIdx < maxCols - 1 &&
        heights[colIdx] + h > availableHeightPx
      ) {
        // Avoid leaving an H1 orphaned at the bottom of a column when followed by its H2
        const lastInCol = columns[colIdx][columns[colIdx].length - 1];
        const moveLastH1 =
          lastInCol?.level === 1 &&
          entry.level === 2 &&
          columns[colIdx].length > 1;

        if (moveLastH1) {
          columns[colIdx].pop();
          colIdx += 1;
          const movedH = estimateEntryHeight(lastInCol, true, colWidthPx, compact);
          columns[colIdx].push(lastInCol);
          heights[colIdx] += movedH;
        } else {
          colIdx += 1;
        }

        const nextH = estimateEntryHeight(
          entry,
          columns[colIdx].length === 0,
          colWidthPx,
          compact
        );
        columns[colIdx].push(entry);
        heights[colIdx] += nextH;
      } else {
        columns[colIdx].push(entry);
        heights[colIdx] += h;
      }
    }

    const nonEmptyCols = columns.filter((c) => c.length > 0);
    const fits = heights.every((h) => h <= availableHeightPx);
    return {
      columns: nonEmptyCols.length > 0 ? nonEmptyCols : [[]],
      fits,
    };
  };

  for (const cols of [1, 2, 3] as const) {
    const attempt = tryPack(cols, false);
    if (attempt.fits) {
      return {
        columnCount: attempt.columns.length as 1 | 2 | 3,
        columns: attempt.columns,
        compact: false,
      };
    }
  }

  const compactAttempt = tryPack(3, true);
  return {
    columnCount: compactAttempt.columns.length as 1 | 2 | 3,
    columns: compactAttempt.columns,
    compact: true,
  };
}

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'bolditalic'; text: string }
  | { type: 'code'; text: string }
  | { type: 'strike'; text: string };

/**
 * Tokenizes inline bold, italic, bold+italic, code, and strikethrough spans safely.
 */
export function tokenizeInlineMarkdown(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const regex =
    /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|~~[^~]+~~)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('***')) {
      tokens.push({ type: 'bolditalic', text: raw.slice(3, -3) });
    } else if (raw.startsWith('**')) {
      tokens.push({ type: 'bold', text: raw.slice(2, -2) });
    } else if (raw.startsWith('*')) {
      tokens.push({ type: 'italic', text: raw.slice(1, -1) });
    } else if (raw.startsWith('`')) {
      tokens.push({ type: 'code', text: raw.slice(1, -1) });
    } else if (raw.startsWith('~~')) {
      tokens.push({ type: 'strike', text: raw.slice(2, -2) });
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return tokens;
}
