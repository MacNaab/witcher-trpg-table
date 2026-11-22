export interface TextPageRange {
  pageIndex: number;
  startOffset: number;
  endOffset: number;
  startLine: number;
  endLine: number;
}

const PAGE_BREAK_LINE_RE = /^\s*(?:\\page|---page---)\s*$/i;

/**
 * Splits Markdown into exact character and line ranges matching `parseHomebrewDocument`.
 */
export function computeTextPageRanges(markdown: string): TextPageRange[] {
  const normalized = markdown.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const ranges: TextPageRange[] = [];

  let pageStartOffset = 0;
  let pageStartLine = 0;
  let offset = 0;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx += 1) {
    const line = lines[lineIdx];
    const lineLenWithNewline =
      line.length + (lineIdx < lines.length - 1 ? 1 : 0);

    if (PAGE_BREAK_LINE_RE.test(line)) {
      ranges.push({
        pageIndex: ranges.length,
        startOffset: pageStartOffset,
        endOffset: Math.max(pageStartOffset, offset - 1),
        startLine: pageStartLine,
        endLine: Math.max(pageStartLine, lineIdx - 1),
      });
      pageStartOffset = offset + lineLenWithNewline;
      pageStartLine = lineIdx + 1;
    }

    offset += lineLenWithNewline;
  }

  ranges.push({
    pageIndex: ranges.length,
    startOffset: pageStartOffset,
    endOffset: normalized.length,
    startLine: pageStartLine,
    endLine: Math.max(pageStartLine, lines.length - 1),
  });

  return ranges;
}

/**
 * Finds the 0-based page index containing a character offset (such as textarea.selectionStart).
 */
export function findPageIndexAtOffset(
  ranges: TextPageRange[],
  charOffset: number
): number {
  if (ranges.length === 0) return 0;
  for (let i = ranges.length - 1; i >= 0; i -= 1) {
    if (charOffset >= ranges[i].startOffset) {
      return ranges[i].pageIndex;
    }
  }
  return 0;
}

/**
 * Computes exact pixel Y offsets (`offsetTop`) of each page start inside a `<textarea>`,
 * accounting for wrapped lines using an offscreen styled mirror container.
 */
export function measureTextareaPageTops(
  textarea: HTMLTextAreaElement,
  markdown: string,
  ranges: TextPageRange[]
): number[] {
  if (ranges.length <= 1 || typeof document === 'undefined') {
    return ranges.map(() => 0);
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

  const normalized = markdown.replace(/\r\n/g, '\n');
  const markers: HTMLSpanElement[] = [];

  for (let i = 0; i < ranges.length; i += 1) {
    const marker = document.createElement('span');
    marker.textContent = '\u200B';
    markers.push(marker);
    mirror.appendChild(marker);

    const nextStart =
      i + 1 < ranges.length ? ranges[i + 1].startOffset : normalized.length;
    const chunk = normalized.slice(ranges[i].startOffset, nextStart);
    if (chunk.length > 0) {
      mirror.appendChild(document.createTextNode(chunk));
    }
  }

  document.body.appendChild(mirror);
  const paddingTop = Number.parseFloat(cs.paddingTop) || 0;
  const tops = markers.map((marker, idx) =>
    idx === 0 ? 0 : Math.max(0, marker.offsetTop - paddingTop)
  );
  document.body.removeChild(mirror);

  return tops;
}

/**
 * Resolves the active `pageIndex` and intra-page scroll progress `[0, 1]` from `textarea.scrollTop`.
 */
export function resolveTextareaScrollPosition(
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number,
  pageTops: number[]
): { pageIndex: number; intraRatio: number } {
  if (pageTops.length <= 1) {
    const ratio =
      scrollHeight > clientHeight
        ? Math.max(0, Math.min(1, scrollTop / (scrollHeight - clientHeight)))
        : 0;
    return { pageIndex: 0, intraRatio: ratio };
  }

  if (scrollTop <= 4) {
    return { pageIndex: 0, intraRatio: 0 };
  }

  if (scrollTop + clientHeight >= scrollHeight - 6) {
    return { pageIndex: pageTops.length - 1, intraRatio: 0.35 };
  }

  const probeY = scrollTop + Math.min(84, clientHeight * 0.16);
  let activeIdx = 0;
  for (let i = 0; i < pageTops.length; i += 1) {
    if (pageTops[i] <= probeY) {
      activeIdx = i;
    } else {
      break;
    }
  }

  const startY = pageTops[activeIdx] ?? 0;
  const endY =
    activeIdx + 1 < pageTops.length ? pageTops[activeIdx + 1] : scrollHeight;
  const span = Math.max(1, endY - startY);
  const intraRatio = Math.max(0, Math.min(1, (probeY - startY) / span));

  return { pageIndex: activeIdx, intraRatio };
}

/**
 * Resolves the dominant visible preview `pageIndex` and intra-page ratio `[0, 1]`
 * from the preview scroll container and its rendered page elements.
 */
export function resolvePreviewScrollPosition(
  container: HTMLElement,
  pageElements: Record<number, HTMLElement | null>,
  totalPages: number
): { pageIndex: number; intraRatio: number } {
  if (totalPages <= 1) {
    return { pageIndex: 0, intraRatio: 0 };
  }

  const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
  if (container.scrollTop <= 4) {
    return { pageIndex: 0, intraRatio: 0 };
  }

  const containerRect = container.getBoundingClientRect();

  // If scrolled to the very bottom, snap cleanly to the last page
  if (maxScroll > 0 && container.scrollTop >= maxScroll - 8) {
    const lastIdx = totalPages - 1;
    const lastEl = pageElements[lastIdx];
    let intraRatio = 0;
    if (lastEl) {
      const rect = lastEl.getBoundingClientRect();
      intraRatio = Math.max(
        0,
        Math.min(0.6, (containerRect.top + 48 - rect.top) / Math.max(1, rect.height))
      );
    }
    return { pageIndex: lastIdx, intraRatio };
  }

  let bestIndex = 0;
  let bestVisiblePx = -1;
  let bestRect: DOMRect | null = null;

  for (let i = 0; i < totalPages; i += 1) {
    const el = pageElements[i];
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, containerRect.top);
    const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
    const visiblePx = Math.max(0, visibleBottom - visibleTop);

    // Slight bias toward earlier page on exact ties (e.g., spread view rows)
    if (visiblePx > bestVisiblePx + 2) {
      bestVisiblePx = visiblePx;
      bestIndex = i;
      bestRect = rect;
    }
  }

  if (!bestRect) {
    return { pageIndex: 0, intraRatio: 0 };
  }

  const probeInContainer = containerRect.top + Math.min(90, container.clientHeight * 0.18);
  const intraRatio = Math.max(
    0,
    Math.min(1, (probeInContainer - bestRect.top) / Math.max(1, bestRect.height))
  );

  return { pageIndex: bestIndex, intraRatio };
}
