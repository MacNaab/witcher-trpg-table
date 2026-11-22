import { toPng } from 'html-to-image';
import { PDFDocument } from 'pdf-lib';
import { getMonsterCategoryEmblemUrl } from '@/src/data/bestiary/categoryEmblems';
import { BUILTIN_ARTWORK_MAP, HOMEBREW_THEMES } from '../data/templates';
import type {
  HomebrewDocument,
  HomebrewPageFormat,
  MarkdownBlockNode,
  ModuleLanguage,
  ParsedHomebrewPage,
} from '../types';
import {
  computeSmartTocLayout,
  tokenizeInlineMarkdown,
} from './witcherMarkdown';

const PDF_PT_SIZE: Record<HomebrewPageFormat, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

function slugifyTitle(title: string): string {
  const safe = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return safe || 'witcher-supplement';
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * Exports all unscaled rendered book page elements into a multi-page A4/Letter PDF file.
 */
export async function exportBrewPagesToPdf(
  pageElements: HTMLElement[],
  doc: HomebrewDocument
): Promise<string> {
  if (pageElements.length === 0) {
    throw new Error('No rendered pages to export.');
  }

  const pdfDoc = await PDFDocument.create();
  const [pageW, pageH] = PDF_PT_SIZE[doc.pageFormat];

  for (const el of pageElements) {
    const dataUrl = await toPng(el, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#efece4',
    });

    const res = await fetch(dataUrl);
    const pngBytes = await res.arrayBuffer();
    const embeddedImage = await pdfDoc.embedPng(pngBytes);

    const pdfPage = pdfDoc.addPage([pageW, pageH]);
    pdfPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: pageW,
      height: pageH,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const arrayCopy = new Uint8Array(pdfBytes);
  const filename = `${slugifyTitle(doc.title)}.pdf`;
  triggerBlobDownload(
    new Blob([arrayCopy], { type: 'application/pdf' }),
    filename
  );
  return filename;
}

/**
 * Resizes and compresses an uploaded local image file so it embeds cleanly in localStorage.
 */
export function readAndOptimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File read error'));
    reader.onload = () => {
      const rawUrl = String(reader.result ?? '');
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image'));
      img.onload = () => {
        const maxDim = 1400;
        let w = img.naturalWidth || 800;
        let h = img.naturalHeight || 600;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.86));
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderInlineHtml(text: string): string {
  return tokenizeInlineMarkdown(text)
    .map((tok) => {
      const safe = escapeHtml(tok.text);
      switch (tok.type) {
        case 'bold':
          return `<strong>${safe}</strong>`;
        case 'italic':
          return `<em>${safe}</em>`;
        case 'bolditalic':
          return `<strong><em>${safe}</em></strong>`;
        case 'code':
          return `<code>${safe}</code>`;
        case 'strike':
          return `<s>${safe}</s>`;
        default:
          return safe;
      }
    })
    .join('');
}

function resolveImg(rawSrc: string, images: Record<string, string>): string {
  if (BUILTIN_ARTWORK_MAP[rawSrc]) return BUILTIN_ARTWORK_MAP[rawSrc];
  if (rawSrc.startsWith('img:')) return images[rawSrc.slice(4)] ?? '';
  return rawSrc;
}

function renderWitcherSignsHtml(color: string): string {
  return `
    <div class="signs-divider" aria-hidden="true">
      <svg width="268" height="34" viewBox="0 0 268 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="17" cy="17" r="12" />
          <path d="M12 10 L22 10 L13 24 L22 24 Z" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="54" cy="17" r="12" />
          <path d="M47 12 L61 12 L54 24 Z" />
          <line x1="48" y1="15.5" x2="60" y2="15.5" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="91" cy="17" r="12" />
          <path d="M84 22 L91 10 L98 22 Z" />
          <line x1="86.5" y1="14.5" x2="95.5" y2="14.5" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.8" stroke-linejoin="round">
          <polygon points="134,3 147,10 147,24 134,31 121,24 121,10" fill="rgba(255,255,255,0.22)" />
          <path d="M126 12 L130 16 L134 11 L138 16 L142 12 L140 22 L134 26 L128 22 Z" fill="${escapeHtml(color)}" fill-opacity="0.18" />
          <circle cx="130.5" cy="17.5" r="1.1" fill="${escapeHtml(color)}" />
          <circle cx="137.5" cy="17.5" r="1.1" fill="${escapeHtml(color)}" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="177" cy="17" r="12" />
          <path d="M170 12 L184 12 L177 24 Z" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="214" cy="17" r="12" />
          <path d="M207 22 L214 10 L221 22 Z" />
        </g>
        <g stroke="${escapeHtml(color)}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="251" cy="17" r="12" />
          <path d="M244 22 L251 10 L258 22 Z" />
          <line x1="246" y1="18" x2="256" y2="18" />
        </g>
      </svg>
    </div>
  `;
}

function renderIronChainHtml(widthPx: number): string {
  const step = 36;
  const count = Math.ceil(widthPx / step) + 2;
  const links = Array.from({ length: count })
    .map((_, idx) => {
      const x = idx * step;
      return `
        <g>
          <rect x="${x + 1}" y="2.5" width="24" height="11" rx="5.5" fill="#23252a" stroke="#5c6068" stroke-width="1.6" />
          <rect x="${x + 6}" y="5.5" width="14" height="5" rx="2.5" fill="#e4dfd4" fill-opacity="0.92" />
          <rect x="${x + 21}" y="5.5" width="18" height="5" rx="2.5" fill="#31343b" stroke="#777b85" stroke-width="1.2" />
        </g>
      `;
    })
    .join('');
  return `<svg width="${widthPx}" height="16" viewBox="0 0 ${widthPx} 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 2px rgba(0,0,0,0.45));" aria-hidden="true">${links}</svg>`;
}

function renderCreatureHexEmblemHtml(creatureType: string): string {
  const emblemSrc = getMonsterCategoryEmblemUrl(creatureType, true);
  return `<img class="bl-emblem" src="${escapeHtml(emblemSrc)}" alt="${escapeHtml(creatureType)}" />`;
}

function renderNodesHtml(
  nodes: MarkdownBlockNode[],
  images: Record<string, string>,
  headingColor: string,
  inMinor = false
): string {
  return nodes
    .map((node, idx) => {
      switch (node.type) {
        case 'heading':
          return `<h${node.level}>${escapeHtml(node.text)}</h${node.level}>`;
        case 'paragraph': {
          const indentClass =
            idx > 0 && nodes[idx - 1]?.type === 'paragraph' ? ' class="indent"' : '';
          return `<p${indentClass}>${renderInlineHtml(node.text)}</p>`;
        }
        case 'blockquote':
          return `<blockquote>${node.lines.map((l) => `<p>${renderInlineHtml(l)}</p>`).join('')}</blockquote>`;
        case 'list': {
          const tag = node.ordered ? 'ol' : 'ul';
          return `<${tag}>${node.items.map((it) => `<li>${renderInlineHtml(it)}</li>`).join('')}</${tag}>`;
        }
        case 'table':
          return `<div class="table-wrap ${node.headers.length >= 4 && !inMinor ? 'span-all' : ''}"><table><thead><tr>${node.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${node.rows.map((r) => `<tr>${r.map((c) => `<td>${renderInlineHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        case 'image': {
          const src = resolveImg(node.src, images);
          if (!src) return '';
          return `<figure class="${inMinor ? 'minor-fig' : 'main-fig'}"><img src="${escapeHtml(src)}" alt="${escapeHtml(node.alt)}" /></figure>`;
        }
        case 'hr':
          return '<hr />';
        case 'signs':
          return renderWitcherSignsHtml(headingColor);
        case 'callout':
          return `<div class="callout">${node.title ? `<div class="callout-title">${escapeHtml(node.title)}</div>` : ''}${renderNodesHtml(node.nodes, images, headingColor, true)}</div>`;
        case 'statblock': {
          const sb = node.data;
          const statsHtml =
            sb.stats.length > 0
              ? `<div class="sb-stats" style="grid-template-columns: repeat(${Math.min(8, sb.stats.length)}, minmax(0, 1fr))">${sb.stats.map((s) => `<div><div class="sb-k">${escapeHtml(s.label)}</div><div class="sb-v">${escapeHtml(s.value)}</div></div>`).join('')}</div>`
              : '';
          const derivedHtml =
            sb.derived.length > 0
              ? `<div class="sb-derived">${sb.derived.map((d) => `<span><strong>${escapeHtml(d.label)}:</strong> ${escapeHtml(d.value)}</span>`).join('')}</div>`
              : '';
          const traitsHtml = sb.traits
            .map((t) => `<div class="sb-trait"><strong>${escapeHtml(t.label)}:</strong> ${renderInlineHtml(t.value)}</div>`)
            .join('');
          const bodyHtml = sb.bodyLines
            .map((b) => `<div class="sb-trait">${renderInlineHtml(b)}</div>`)
            .join('');
          return `<div class="statblock ${!inMinor ? 'span-all' : ''}"><div class="sb-title">${escapeHtml(sb.title)}</div>${sb.subtitle ? `<div class="sb-sub">${escapeHtml(sb.subtitle)}</div>` : ''}${statsHtml}${derivedHtml}${traitsHtml}${bodyHtml}</div>`;
        }
      }
    })
    .join('');
}

/**
 * Generates a standalone printable HTML document mimicking the exact Witcher TRPG layout.
 */
export function downloadPrintableBrewHtml(
  doc: HomebrewDocument,
  pages: ParsedHomebrewPage[],
  lang: ModuleLanguage
): void {
  const theme = HOMEBREW_THEMES[doc.theme];
  const isLetter = doc.pageFormat === 'letter';
  const pageSizeCss = isLetter ? '8.5in 11in' : '210mm 297mm';
  const pageWidthNum = isLetter ? 816 : 794;
  const pageHeightNum = isLetter ? 1056 : 1123;
  const wPx = `${pageWidthNum}px`;
  const hPx = `${pageHeightNum}px`;
  const printLabel =
    lang === 'fr' ? 'Imprimer / Enregistrer en PDF' : 'Print / Save as PDF';

  const pagesHtml = pages
    .map((p) => {
      if (p.isBackCover && p.backCoverData) {
        const bc = p.backCoverData;
        const bgSrc = resolveImg(bc.image || 'preset:grimoire', doc.images);
        const leftY = Math.round(pageHeightNum * 0.43);
        const rightY = Math.round(pageHeightNum * 0.59);
        const dy = rightY - leftY;
        const angleDeg = (Math.atan2(dy, pageWidthNum) * 180) / Math.PI;
        const chainLen = Math.ceil(Math.hypot(pageWidthNum, dy)) + 40;
        const midY = (leftY + rightY) / 2;
        const leftPct = Math.round((leftY / rightY) * 1000) / 10;

        const sideMargin = 44;
        const colGap = 32;
        const leftColWidth = (pageWidthNum - sideMargin * 2 - colGap) / 2;
        const colsTop = leftY + 56;
        const chainClearance = 22;
        const stepHeight = 12;
        const rightColTopOffset = Math.max(0, rightY + chainClearance - colsTop);

        const staircaseHtmlParts: string[] = [];
        for (let s = 0; s < 10; s += 1) {
          const yBandTop = colsTop + s * stepHeight;
          const xSafe = ((yBandTop - leftY - chainClearance) / dy) * pageWidthNum;
          const availWidth = xSafe - sideMargin;
          const blockedWidth = Math.round(leftColWidth - availWidth);
          if (blockedWidth <= 4) break;
          const wPx = Math.min(Math.round(leftColWidth - 96), blockedWidth);
          staircaseHtmlParts.push(
            `<div aria-hidden="true" style="float:right;clear:right;width:${wPx}px;height:${stepHeight}px;"></div>`
          );
        }

        const synopsisHtml = bc.paragraphs
          .map((para) => `<p class="bc-para">${renderInlineHtml(para)}</p>`)
          .join('');
        const featuresHtml = bc.features
          .map(
            (feat) => `
              <div class="bc-feat">
                <div class="bc-feat-title"><span>•</span><span>${escapeHtml(feat.title)}</span></div>
                ${feat.description ? `<p class="bc-feat-desc">${renderInlineHtml(feat.description)}</p>` : ''}
              </div>
            `
          )
          .join('');

        return `
          <article class="book-page backcover-page">
            <div class="bc-top-art" style="height: ${rightY}px; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 ${leftPct}%);">
              ${bgSrc ? `<img src="${escapeHtml(bgSrc)}" alt="${escapeHtml(bc.featuringTitle)}" />` : ''}
            </div>
            <div class="bc-diag-chain" style="top: ${midY}px; width: ${chainLen}px; transform: translate(-50%, -50%) rotate(${angleDeg.toFixed(2)}deg);">
              ${renderIronChainHtml(chainLen)}
            </div>
            <div class="bc-cols" style="top: ${colsTop}px;">
              <div class="bc-synopsis">${staircaseHtmlParts.join('')}${synopsisHtml}</div>
              <div class="bc-features" style="padding-top: ${rightColTopOffset}px;">
                ${bc.featuringTitle ? `<h2 class="bc-feat-heading">${escapeHtml(bc.featuringTitle)}</h2>` : ''}
                <div class="bc-feat-list">${featuresHtml}</div>
              </div>
            </div>
            <div class="bc-bottom-chain">${renderIronChainHtml(pageWidthNum + 16)}</div>
            <div class="bc-footer">
              <span class="bc-credit-left">${escapeHtml(bc.creditLeft ?? '')}</span>
              <span class="bc-credit-right">${escapeHtml(bc.creditRight ?? '')}</span>
            </div>
          </article>
        `;
      }

      if (p.isCover && p.coverData) {
        const c = p.coverData;
        const bgSrc = resolveImg(c.image || 'preset:grimoire', doc.images);
        const titleSize =
          c.title.length > 24 ? '38px' : c.title.length > 15 ? '46px' : '54px';
        return `
          <article class="book-page cover-page">
            ${bgSrc ? `<img class="cover-bg" src="${escapeHtml(bgSrc)}" alt="${escapeHtml(c.title)}" />` : ''}
            <div class="cover-scrim"></div>
            <div class="cover-frame"></div>
            <div class="cover-lockup">
              ${c.overline ? `<div class="cover-overline">${escapeHtml(c.overline)}</div>` : ''}
              <h1 class="cover-title" style="font-size: ${titleSize}">${escapeHtml(c.title)}</h1>
              ${c.subtitle ? `<div class="cover-subtitle">${escapeHtml(c.subtitle)}</div>` : ''}
              ${c.tagline ? `<p class="cover-tagline">${escapeHtml(c.tagline)}</p>` : ''}
              <div class="cover-credits ${c.creditLeft || c.creditRight ? 'has-rule' : ''}">
                <span>${escapeHtml(c.creditLeft ?? '')}</span>
                <span>${escapeHtml(c.creditRight ?? '')}</span>
              </div>
            </div>
          </article>
        `;
      }

      if (p.bestiaryLeftData) {
        const d = p.bestiaryLeftData;
        const isFr = (d.lang ?? lang) === 'fr';
        const artSrc = resolveImg(d.image || 'preset:grimoire', doc.images);
        const L = isFr
          ? {
              skillBase: 'Bases de Comp.',
              armor: 'Armure',
              regen: 'Régénération',
              resistances: 'Résistances',
              immunities: 'Immunités',
              susceptibilities: 'Vulnérabilités',
              dodge: 'Base d’Esquive',
              reposition: 'Déplacement',
              block: 'Base de Blocage',
              bounty: 'Prime',
              loot: 'Butin',
              intelligence: 'Intelligence',
              senses: 'Sens',
              height: 'Taille',
              weight: 'Poids',
              env: 'Environnement',
              org: 'Organisation',
            }
          : {
              skillBase: 'Skill Base',
              armor: 'Armor',
              regen: 'Regeneration',
              resistances: 'Resistances',
              immunities: 'Immunities',
              susceptibilities: 'Susceptibilities',
              dodge: 'Dodge Base',
              reposition: 'Reposition Base',
              block: 'Block Base',
              bounty: 'Bounty',
              loot: 'Loot',
              intelligence: 'Intelligence',
              senses: 'Senses',
              height: 'Height',
              weight: 'Weight',
              env: 'Environment',
              org: 'Organization',
            };

        const skillsBox =
          d.skills.length > 0
            ? `<div class="bl-box"><div class="bl-inner"><div class="bl-hdr">${escapeHtml(L.skillBase)}</div>${d.skills
                .slice(0, 13)
                .map(
                  (sk, idx, arr) =>
                    `<div class="bl-row ${idx < arr.length - 1 ? 'soft-b' : ''}"><span>${escapeHtml(sk.name)}</span><span class="bl-val">${escapeHtml(sk.value)}</span></div>`
                )
                .join('')}</div></div>`
            : '';

        const artH = Math.round(pageHeightNum * 0.56);
        const statsRows = d.stats
          .slice(0, 8)
          .map(
            (st) =>
              `<div class="bl-chip"><span>${escapeHtml(st.label)}</span><span>${escapeHtml(st.value)}</span></div>`
          )
          .join('');
        const derivedRows = d.derived
          .slice(0, 7)
          .map(
            (dv) =>
              `<div class="bl-chip derived"><span>${escapeHtml(dv.label)}</span><span>${escapeHtml(dv.value)}</span></div>`
          )
          .join('');

        return `
          <article class="book-page ${p.isEven ? 'even' : 'odd'}">
            <div class="top-band">
              <div class="ribbon">
                <div class="ribbon-shadow"></div>
                <div class="ribbon-face">${p.pageNumber}</div>
              </div>
            </div>
            <div class="bl-grid">
              <aside class="bl-aside">
                ${skillsBox}
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-kv-row solid-b"><span class="bl-k">${escapeHtml(L.armor)}</span><span class="bl-val">${escapeHtml(d.armor)}</span></div>
                  <div class="bl-kv-row"><span class="bl-k">${escapeHtml(L.regen)}</span><span class="bl-val">${escapeHtml(d.regeneration)}</span></div>
                </div></div>
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-hdr">${escapeHtml(L.resistances)}</div>
                  <div class="bl-cell solid-b">${escapeHtml(d.resistances)}</div>
                  <div class="bl-hdr">${escapeHtml(L.immunities)}</div>
                  <div class="bl-cell">${escapeHtml(d.immunities)}</div>
                </div></div>
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-hdr">${escapeHtml(L.susceptibilities)}</div>
                  <div class="bl-cell">${escapeHtml(d.susceptibilities)}</div>
                </div></div>
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-kv-row bl-kv-sm solid-b"><span class="bl-k">${escapeHtml(L.dodge)}</span><span class="bl-val">${escapeHtml(d.dodgeBase)}</span></div>
                  <div class="bl-kv-row bl-kv-sm solid-b"><span class="bl-k">${escapeHtml(L.reposition)}</span><span class="bl-val">${escapeHtml(d.repositionBase)}</span></div>
                  <div class="bl-kv-row bl-kv-sm"><span class="bl-k">${escapeHtml(L.block)}</span><span class="bl-val">${escapeHtml(d.blockBase)}</span></div>
                </div></div>
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-hdr">${escapeHtml(L.bounty)}</div>
                  <div class="bl-cell">${escapeHtml(d.bounty)}</div>
                </div></div>
                <div class="bl-box"><div class="bl-inner">
                  <div class="bl-hdr">${escapeHtml(L.loot)}</div>
                  <div class="bl-loot">${(d.loot.length > 0 ? d.loot : ['—']).map((l) => `<div>${escapeHtml(l)}</div>`).join('')}</div>
                </div></div>
              </aside>
              <div class="bl-main">
                <div class="bl-art-wrap" style="height:${artH}px;">
                  <div class="bl-art-frame">${artSrc ? `<img src="${escapeHtml(artSrc)}" alt="${escapeHtml(d.name)}" />` : ''}</div>
                  <div class="bl-banner">
                    ${renderCreatureHexEmblemHtml(d.creatureType)}
                    <div class="bl-threat">${escapeHtml(d.threat)}</div>
                    <div class="bl-meta-grp"><div class="u">${escapeHtml(L.intelligence)}</div><div class="i">${escapeHtml(d.intelligence)}</div></div>
                    <div class="bl-meta-grp"><div class="u">${escapeHtml(L.senses)}</div><div class="i">${escapeHtml(d.senses)}</div></div>
                    <div class="bl-chips">${statsRows}</div>
                    <div class="bl-chips derived-wrap">${derivedRows}</div>
                  </div>
                  <div class="bl-phys">
                    <div class="bl-box"><div class="bl-inner">
                      <div class="bl-phys-row solid-b"><span class="bl-k">${escapeHtml(L.height)}</span><span class="bl-val">${escapeHtml(d.height)}</span></div>
                      <div class="bl-phys-row solid-b"><span class="bl-k">${escapeHtml(L.weight)}</span><span class="bl-val">${escapeHtml(d.weight)}</span></div>
                      <div class="bl-phys-row solid-b"><span class="bl-k">${escapeHtml(L.env)}</span><span class="bl-val">${escapeHtml(d.environment)}</span></div>
                      <div class="bl-phys-row"><span class="bl-k">${escapeHtml(L.org)}</span><span class="bl-val">${escapeHtml(d.organization)}</span></div>
                    </div></div>
                  </div>
                </div>
                <div class="bl-lore">
                  <h1 class="bl-name" style="font-size:${d.name.length > 22 ? '34px' : '42px'}">${escapeHtml(d.name)}</h1>
                  <h2 class="bl-super-h">${escapeHtml(d.superstitionTitle)}</h2>
                  <p class="bl-super-p">${renderInlineHtml(d.superstition)}</p>
                </div>
              </div>
            </div>
            ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
          </article>
        `;
      }

      if (p.bestiaryRightData) {
        const d = p.bestiaryRightData;
        const isFr = (d.lang ?? lang) === 'fr';
        const colHeaders = isFr
          ? ['Nom', 'Base', 'Type', 'Dégâts', 'Fiab.', 'Portée', 'Effet', 'CAD']
          : ['Name', 'ATK Base', 'Type', 'DMG', 'Rel.', 'RNG', 'Effect', 'ROF'];
        const attacksBox =
          d.attacks.length > 0
            ? `<div class="bl-box"><div class="bl-inner">
                <div class="br-tbl-title">${escapeHtml(d.attacksTitle)}</div>
                <table class="br-tbl">
                  <thead><tr>${colHeaders.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
                  <tbody>${d.attacks
                    .map(
                      (a) =>
                        `<tr><td>${renderInlineHtml(a.name)}</td><td>${renderInlineHtml(a.atkBase)}</td><td>${renderInlineHtml(a.type)}</td><td>${renderInlineHtml(a.dmg)}</td><td>${renderInlineHtml(a.rel)}</td><td>${renderInlineHtml(a.rng)}</td><td>${renderInlineHtml(a.effect)}</td><td>${renderInlineHtml(a.rof)}</td></tr>`
                    )
                    .join('')}</tbody>
                </table>
              </div></div>`
            : '';
        const abilitiesHtml = d.abilities
          .map(
            (ab) => `
              <div class="bl-box"><div class="bl-inner">
                <div class="br-ab-title">${escapeHtml(isFr ? `Capacité : ${ab.title}` : `Ability: ${ab.title}`)}</div>
                <div class="br-ab-body">${renderInlineHtml(ab.description)}</div>
              </div></div>
            `
          )
          .join('');
        const knowledgeParas = d.knowledge
          .split('\n\n')
          .map((para) => `<p class="br-know-p">${renderInlineHtml(para)}</p>`)
          .join('');

        return `
          <article class="book-page ${p.isEven ? 'even' : 'odd'}">
            <div class="top-band">
              <div class="ribbon">
                <div class="ribbon-shadow"></div>
                <div class="ribbon-face">${p.pageNumber}</div>
              </div>
            </div>
            <div class="br-shell">
              <div>
                <h2 class="br-know-h">${escapeHtml(d.knowledgeTitle)}</h2>
                ${knowledgeParas}
              </div>
              ${attacksBox}
              ${abilitiesHtml ? `<div class="br-ab-grid">${abilitiesHtml}</div>` : ''}
            </div>
            ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
          </article>
        `;
      }

      if (p.characterSheetData) {
        const d = p.characterSheetData;
        const isFr = (d.lang ?? lang) === 'fr';
        const artSrc = resolveImg(d.image || 'preset:grimoire', doc.images);
        const skillsH = isFr ? 'Compétences' : 'Skills';
        const keySkillsH = isFr ? 'Compétences Clés' : 'Key Skills';
        const magicH = d.magicTitle || (isFr ? 'Magie' : 'Magic');
        const gearH = isFr ? 'Équipement' : 'Gear';

        const statsRowsHtml = d.stats
          .slice(0, 9)
          .map(
            (st, idx, arr) =>
              `<div class="cs-stat-row ${idx < arr.length - 1 ? 'solid-b' : ''}"><span>${escapeHtml(st.label)}</span><span>${escapeHtml(st.value)}</span></div>`
          )
          .join('');
        const derivedRowsHtml = d.derived
          .slice(0, 8)
          .map(
            (dv, idx, arr) =>
              `<div class="cs-stat-row ${idx < arr.length - 1 ? 'solid-b' : ''}"><span>${escapeHtml(dv.label)}</span><span>${escapeHtml(dv.value)}</span></div>`
          )
          .join('');
        const skillsRowsHtml = d.skills
          .slice(0, 20)
          .map(
            (sk, idx, arr) =>
              `<div class="cs-skill-row ${idx % 2 === 1 ? 'stripe' : ''} ${idx < arr.length - 1 ? 'solid-b' : ''}"><span>${escapeHtml(sk.name)}</span><span>${escapeHtml(sk.value)}</span></div>`
          )
          .join('');
        const keySkillsRowsHtml = d.keySkills
          .slice(0, 10)
          .map(
            (ks, idx, arr) =>
              `<div class="cs-skill-row ${idx % 2 === 1 ? 'stripe' : ''} ${idx < arr.length - 1 ? 'solid-b' : ''}"><span>${escapeHtml(ks.name)}</span><span>${escapeHtml(ks.value)}</span></div>`
          )
          .join('');

        const magicRowsHtml = d.magic
          .slice(0, 11)
          .map(
            (item, idx, arr) =>
              `<div class="cs-magic-row ${idx % 2 === 1 ? 'stripe' : ''} ${idx < arr.length - 1 ? 'solid-b' : ''}">${renderInlineHtml(item)}</div>`
          )
          .join('');

        const visibleGear = d.gear.slice(0, 24);
        const gearRows: string[][] = [];
        for (let i = 0; i < visibleGear.length; i += 4) {
          const row = visibleGear.slice(i, i + 4);
          while (row.length < 4) row.push('');
          gearRows.push(row);
        }
        if (gearRows.length === 0) gearRows.push(['—', '', '', '']);

        const gearRowsHtml = gearRows
          .map(
            (row, rIdx) =>
              `<div class="cs-gear-row ${rIdx % 2 === 1 ? 'stripe' : ''} ${rIdx < gearRows.length - 1 ? 'solid-b' : ''}">${row
                .map((cell) => `<span>${cell ? escapeHtml(cell) : '&nbsp;'}</span>`)
                .join('')}</div>`
          )
          .join('');

        const quoteHtml = d.quote
          .split('\n\n')
          .filter(Boolean)
          .map((para) => `<p class="cs-quote-p">${renderInlineHtml(para)}</p>`)
          .join('');
        const nameSize =
          d.name.length > 26 ? '31px' : d.name.length > 18 ? '37px' : '43px';
        const portraitH = Math.round(pageHeightNum * 0.34);

        return `
          <article class="book-page ${p.isEven ? 'even' : 'odd'}">
            <div class="top-band">
              <div class="ribbon">
                <div class="ribbon-shadow"></div>
                <div class="ribbon-face">${p.pageNumber}</div>
              </div>
            </div>
            <div class="cs-grid">
              <aside class="cs-aside">
                ${
                  d.stats.length > 0 || d.derived.length > 0
                    ? `<div class="cs-stat-pair">
                        <div class="bl-box"><div class="bl-inner">${statsRowsHtml}</div></div>
                        <div class="bl-box"><div class="bl-inner">${derivedRowsHtml}</div></div>
                      </div>`
                    : ''
                }
                ${
                  d.skills.length > 0
                    ? `<div class="bl-box"><div class="bl-inner"><div class="cs-box-hdr">${escapeHtml(skillsH)}</div>${skillsRowsHtml}</div></div>`
                    : ''
                }
                ${
                  d.keySkills.length > 0
                    ? `<div class="bl-box"><div class="bl-inner"><div class="cs-box-hdr">${escapeHtml(keySkillsH)}</div>${keySkillsRowsHtml}</div></div>`
                    : ''
                }
              </aside>
              <div class="cs-main">
                <div>
                  <h1 class="cs-name" style="font-size:${nameSize}">${escapeHtml(d.name)}</h1>
                  ${d.subtitle ? `<div class="cs-sub">${escapeHtml(d.subtitle)}</div>` : ''}
                </div>
                <div class="cs-mid">
                  <div class="cs-mid-left">
                    <div class="cs-portrait" style="height:${portraitH}px">${artSrc ? `<img src="${escapeHtml(artSrc)}" alt="${escapeHtml(d.name)}" />` : ''}</div>
                    ${
                      d.magic.length > 0
                        ? `<div class="bl-box"><div class="bl-inner"><div class="cs-box-hdr">${escapeHtml(magicH)}</div>${magicRowsHtml}</div></div>`
                        : ''
                    }
                  </div>
                  <div class="cs-quote-col">
                    ${quoteHtml}
                    ${d.attribution ? `<p class="cs-attr">–${escapeHtml(d.attribution)}</p>` : ''}
                  </div>
                </div>
                <div class="bl-box"><div class="bl-inner"><div class="cs-box-hdr">${escapeHtml(gearH)}</div>${gearRowsHtml}</div></div>
              </div>
            </div>
            ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
          </article>
        `;
      }

      if (p.isArtPage && p.artPageData) {
        const artSrc = resolveImg(p.artPageData.image, doc.images);
        return `
          <article class="book-page ${p.isEven ? 'even' : 'odd'}">
            <div class="top-band">
              <div class="ribbon">
                <div class="ribbon-shadow"></div>
                <div class="ribbon-face">${p.pageNumber}</div>
              </div>
            </div>
            <div class="art-page-inner">
              ${
                artSrc
                  ? `<figure class="art-page-fig"><img src="${escapeHtml(artSrc)}" alt="${escapeHtml(p.artPageData.caption || 'Illustration')}" />${p.artPageData.caption ? `<figcaption>${escapeHtml(p.artPageData.caption)}</figcaption>` : ''}</figure>`
                  : ''
              }
            </div>
            ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
          </article>
        `;
      }

      const bottomHtml =
        p.bottomNodes.length > 0
          ? `<div class="bottom-art">${renderNodesHtml(p.bottomNodes, doc.images, theme.headingColor, false)}</div>`
          : '';

      if (p.tocConfig) {
        const tocImg = p.tocConfig.image
          ? resolveImg(p.tocConfig.image, doc.images)
          : '';
        const tocBottom =
          bottomHtml ||
          (tocImg
            ? `<div class="bottom-art"><figure class="main-fig"><img src="${escapeHtml(tocImg)}" alt="${escapeHtml(p.tocConfig.title)}" /></figure></div>`
            : '');
        const tocLayout = computeSmartTocLayout(
          p.tocEntries,
          pageWidthNum,
          pageHeightNum,
          Boolean(tocBottom)
        );
        const tocColsHtml = tocLayout.columns
          .map(
            (colEntries) => `
              <div class="toc-col">
                ${colEntries
                  .map(
                    (e, idx) => `
                      <div class="toc-row ${e.level === 1 ? 'toc-h1' : 'toc-h2'} ${idx === 0 ? 'first' : ''}">
                        <span class="toc-label">${escapeHtml(e.text)}</span>
                        <span class="toc-dots"></span>
                        <span class="toc-page">${e.pageNumber}</span>
                      </div>
                    `
                  )
                  .join('')}
              </div>
            `
          )
          .join('');

        return `
          <article class="book-page ${p.isEven ? 'even' : 'odd'}">
            <div class="top-band">
              <div class="ribbon">
                <div class="ribbon-shadow"></div>
                <div class="ribbon-face">${p.pageNumber}</div>
              </div>
            </div>
            <div class="page-inner">
              <h1 class="toc-heading">${escapeHtml(p.tocConfig.title)}</h1>
              <div class="toc-cols ${tocLayout.compact ? 'compact' : ''}" style="grid-template-columns: repeat(${tocLayout.columnCount}, minmax(0, 1fr))">${tocColsHtml}</div>
              ${tocBottom}
            </div>
            ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
          </article>
        `;
      }

      let openerHtml = '';
      let bodyNodes = p.mainNodes;
      if (p.isChapterOpener && p.mainNodes[0]?.type === 'heading') {
        const h1Node = p.mainNodes[0];
        let cursor = 1;
        let quoteHtml = '';
        const nextNode = p.mainNodes[cursor];
        const nodeAfterQuote = p.mainNodes[cursor + 1];
        const quoteHasAttr =
          nextNode?.type === 'blockquote' &&
          nextNode.lines.some((l) => /^[-—–]\s*/.test(l.trim()));
        if (
          nextNode?.type === 'blockquote' &&
          (quoteHasAttr || nodeAfterQuote?.type === 'signs')
        ) {
          quoteHtml = `<div class="opener-quote">${nextNode.lines
            .map((line) => {
              const isAttr = /^[-—–]\s*/.test(line.trim());
              return `<p class="${isAttr ? 'attr' : ''}">${renderInlineHtml(line)}</p>`;
            })
            .join('')}</div>`;
          cursor += 1;
        }
        let signsHtml = '';
        if (p.mainNodes[cursor]?.type === 'signs') {
          signsHtml = renderWitcherSignsHtml(theme.headingColor);
          cursor += 1;
        }
        const openerSize =
          h1Node.text.length > 36 ? '33px' : h1Node.text.length > 26 ? '40px' : '48px';
        openerHtml = `<div class="opener-block"><h1 class="opener-heading" style="font-size:${openerSize}">${escapeHtml(h1Node.text)}</h1>${quoteHtml}${signsHtml}</div>`;
        bodyNodes = p.mainNodes.slice(cursor);
      }

      const asideHtml =
        p.asideNodes.length > 0
          ? `<aside class="minor-col ${openerHtml ? 'staggered' : ''}">${renderNodesHtml(p.asideNodes, doc.images, theme.headingColor, true)}</aside>`
          : '';
      const mainHtml = `<div class="main-wrap">${openerHtml}<div class="main-cols">${renderNodesHtml(bodyNodes, doc.images, theme.headingColor, false)}</div></div>`;
      const bodyRow = p.isEven ? `${asideHtml}${mainHtml}` : `${mainHtml}${asideHtml}`;
      const bannerHtml =
        p.bannerNodes.length > 0
          ? `<div class="banner-slot">${renderNodesHtml(p.bannerNodes, doc.images, theme.headingColor, false)}</div>`
          : '';

      return `
        <article class="book-page ${p.isEven ? 'even' : 'odd'}">
          <div class="top-band">
            <div class="ribbon">
              <div class="ribbon-shadow"></div>
              <div class="ribbon-face">${p.pageNumber}</div>
            </div>
          </div>
          <div class="page-inner">
            ${bannerHtml}
            <div class="columns-shell ${p.asideNodes.length > 0 ? 'has-aside' : 'no-aside'}">${bodyRow}</div>
            ${bottomHtml}
          </div>
          ${doc.chapterFooter.trim() ? `<footer class="page-footer">${escapeHtml(doc.chapterFooter)}</footer>` : ''}
        </article>
      `;
    })
    .join('');

  const html = `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(doc.title)}</title>
  <style>
    @page { size: ${pageSizeCss}; margin: 0; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { margin: 0; padding: 24px; background: #1e1d1b; font-family: Georgia, serif; color: #1e1915; }
    .toolbar { display: flex; justify-content: center; margin-bottom: 18px; }
    .print-btn { background: ${theme.bannerBg}; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: system-ui, sans-serif; }
    .stack { display: flex; flex-direction: column; align-items: center; gap: 24px; }
    .book-page { width: ${wPx}; height: ${hPx}; background: #efece4; background-image: radial-gradient(ellipse at 50% 45%, rgba(255,253,247,0.75) 0%, rgba(230,224,210,0.68) 72%, rgba(212,204,188,0.85) 100%); position: relative; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 18px 40px rgba(0,0,0,0.45); page-break-after: always; break-after: page; font-size: 10.6px; line-height: 1.44; }
    .cover-page { background: #121316; }
    .cover-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 25%; }
    .cover-scrim { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(8,10,14,0.10) 0%, rgba(8,10,14,0.22) 38%, rgba(8,10,14,0.78) 68%, rgba(5,6,9,0.95) 100%); }
    .cover-frame { position: absolute; inset: 14px; border: 1px solid rgba(255, 248, 232, 0.14); pointer-events: none; }
    .cover-lockup { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding: 56px 56px 34px; text-align: center; }
    .cover-overline { font-size: 15.5px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: #f2efe6; margin-bottom: 6px; text-shadow: 0 2px 12px rgba(0,0,0,0.92); }
    .cover-title { font-weight: 800; line-height: 1.04; letter-spacing: 0.07em; text-transform: uppercase; color: #f5f3ec; border: none; padding: 0; margin: 0; column-span: none; text-shadow: 0 4px 20px rgba(0,0,0,0.96); }
    .cover-subtitle { font-size: 21px; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: #e6b43d; margin-top: 10px; text-shadow: 0 2px 14px rgba(0,0,0,0.95); }
    .cover-tagline { font-size: 14.5px; line-height: 1.45; font-style: italic; color: #ece8dd; max-width: 540px; margin: 20px auto 52px; text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,0.96); }
    .cover-credits { display: flex; justify-content: space-between; align-items: flex-end; width: 100%; padding-top: 12px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(235, 230, 220, 0.86); text-shadow: 0 1px 6px rgba(0,0,0,0.95); }
    .cover-credits.has-rule { border-top: 1px solid rgba(255, 245, 224, 0.16); }
    .backcover-page { background: #ece7dc; background-image: radial-gradient(ellipse at 50% 65%, rgba(255,253,247,0.75) 0%, rgba(226,220,206,0.72) 75%, rgba(208,200,185,0.88) 100%); }
    .bc-top-art { position: absolute; top: 0; left: 0; right: 0; background: #1a1b1f; overflow: hidden; z-index: 1; }
    .bc-top-art img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .bc-diag-chain { position: absolute; left: 50%; z-index: 4; pointer-events: none; }
    .bc-cols { position: absolute; left: 44px; right: 44px; bottom: 94px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; z-index: 5; }
    .bc-synopsis { display: flow-root; }
    .bc-para { font-size: 12px; line-height: 1.46; font-weight: 500; color: #1b1612; margin: 0 0 14px; text-align: left; text-indent: 0; }
    .bc-feat-heading { font-size: 15px; font-weight: 700; color: #1b1612; margin: 0 0 10px; border: none; padding: 0; }
    .bc-feat-list { display: flex; flex-direction: column; gap: 10px; }
    .bc-feat-title { display: flex; align-items: baseline; gap: 7px; font-size: 12px; font-weight: 700; color: #1b1612; margin-bottom: 2px; }
    .bc-feat-desc { margin: 0 0 0 14px; font-size: 10.6px; line-height: 1.38; color: #2c251e; text-align: left; text-indent: 0; }
    .bc-bottom-chain { position: absolute; left: -8px; right: -8px; bottom: 74px; z-index: 4; pointer-events: none; }
    .bc-footer { position: absolute; left: 44px; right: 44px; bottom: 18px; height: 46px; display: flex; justify-content: space-between; align-items: center; z-index: 3; }
    .bc-credit-left { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${theme.headingColor}; }
    .bc-credit-right { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #2c251e; }
    .art-page-inner { flex: 1; min-height: 0; padding: 48px 36px 40px; display: flex; flex-direction: column; gap: 8px; }
    .art-page-fig { margin: 0; flex: 1; min-height: 0; display: flex; flex-direction: column; }
    .art-page-fig img { width: 100%; flex: 1; min-height: 0; object-fit: cover; display: block; border: 1px solid rgba(0,0,0,0.28); }
    .art-page-fig figcaption { margin-top: 6px; font-size: 9.5px; font-style: italic; color: #4e453b; text-align: center; flex-shrink: 0; }
    .signs-divider { display: flex; justify-content: center; align-items: center; margin: 10px 0 14px; column-span: all; break-inside: avoid; }
    .opener-block { flex-shrink: 0; margin-bottom: 6px; }
    .opener-heading { font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif; font-weight: 700; line-height: 0.98; letter-spacing: -0.02em; color: ${theme.headingColor}; margin: 0 0 14px; border: none; padding: 0; column-span: none; }
    .opener-quote { margin: 0 18px 12px 22px; font-style: italic; font-size: 11.2px; line-height: 1.42; color: #231e19; }
    .opener-quote p { margin: 0 0 4px; text-align: left; text-indent: 0; }
    .opener-quote p.attr { text-align: right; font-weight: 600; margin-bottom: 0; }
    .toc-heading { font-size: 23px; color: ${theme.headingColor}; text-align: center; border: none; padding: 0; margin: 0 0 4px; column-span: none; flex-shrink: 0; }
    .toc-cols { flex: 1; min-height: 0; display: grid; gap: 20px; align-items: start; overflow: hidden; }
    .toc-col { min-width: 0; display: flex; flex-direction: column; }
    .toc-row { display: flex; align-items: baseline; gap: 4px; }
    .toc-h1 { margin-top: 8px; font-size: 10.6px; font-weight: 700; color: ${theme.headingColor}; line-height: 1.28; }
    .toc-h1.first { margin-top: 0; }
    .toc-h2 { margin-top: 2px; font-size: 9.5px; color: #28211b; line-height: 1.28; }
    .toc-cols.compact .toc-h1 { margin-top: 5px; font-size: 9.8px; line-height: 1.22; }
    .toc-cols.compact .toc-h1.first { margin-top: 0; }
    .toc-cols.compact .toc-h2 { margin-top: 1px; font-size: 8.9px; line-height: 1.22; }
    .toc-dots { flex: 1; min-width: 8px; border-bottom: 1px dotted rgba(35,29,23,0.42); transform: translateY(-2px); }
    .toc-page { flex-shrink: 0; font-variant-numeric: tabular-nums; color: #1e1915; }
    .top-band { height: 28px; width: 100%; background: ${theme.bannerGradient}; border-bottom: 2px solid rgba(0,0,0,0.25); position: relative; flex-shrink: 0; }
    .ribbon { position: absolute; top: 0; width: 48px; height: 62px; z-index: 5; }
    .book-page.even .ribbon { left: 30px; }
    .book-page.odd .ribbon { right: 30px; }
    .ribbon-shadow { position: absolute; top: 4px; left: 5px; width: 44px; height: 58px; background: ${theme.ribbonShadow}; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%); }
    .ribbon-face { position: relative; width: 44px; height: 56px; background: ${theme.bannerGradient}; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%); display: flex; align-items: center; justify-content: center; padding-bottom: 12px; font-size: 15px; font-weight: 700; color: #f7f4ec; }
    .page-inner { flex: 1; min-height: 0; padding: 48px 42px 40px; display: flex; flex-direction: column; gap: 14px; }
    .columns-shell.has-aside { flex: 1; min-height: 0; display: grid; gap: 26px; align-items: stretch; overflow: hidden; }
    .book-page.even .columns-shell.has-aside { grid-template-columns: 21.5% minmax(0, 1fr); }
    .book-page.odd .columns-shell.has-aside { grid-template-columns: minmax(0, 1fr) 21.5%; }
    .columns-shell.no-aside { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
    .minor-col { min-width: 0; font-size: 9.9px; line-height: 1.4; overflow: hidden; text-align: left; }
    .minor-col.staggered { padding-top: 14px; }
    .main-wrap { width: 100%; height: 100%; min-width: 0; display: flex; flex-direction: column; overflow: hidden; }
    .main-cols { flex: 1; min-height: 0; width: 100%; column-count: 2; column-gap: 22px; column-fill: balance; overflow: hidden; }
    .bottom-art { flex-shrink: 0; max-height: 245px; overflow: hidden; }
    .bottom-art img, .main-fig img { width: 100%; max-height: 235px; object-fit: cover; display: block; border: 1px solid rgba(0,0,0,0.18); }
    .minor-fig img { width: 100%; height: 260px; object-fit: cover; display: block; border: 1px solid rgba(0,0,0,0.18); }
    h1 { font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif; font-size: 40px; font-weight: 700; line-height: 0.98; letter-spacing: -0.02em; color: ${theme.headingColor}; border: none; padding: 0; margin: 12px 0 12px; column-span: all; }
    .minor-col h1 { font-size: 18px; margin-top: 0; column-span: none; }
    h2 { font-size: 15.5px; color: ${theme.headingColor}; border-bottom: 1.5px solid ${theme.ruleColor}; padding-bottom: 2px; margin: 11px 0 5px; }
    .minor-col h2 { font-size: 14px; margin-top: 0; }
    h3 { font-size: 12.5px; margin: 8px 0 3px; }
    p { margin: 0 0 7px; text-align: justify; }
    .minor-col p { text-align: left; }
    p.indent { text-indent: 1.1em; }
    blockquote { margin: 7px 0 9px; padding: 6px 10px; background: rgba(255,255,255,0.35); border-top: 1px solid ${theme.calloutBorder}; border-bottom: 1px solid ${theme.calloutBorder}; font-style: italic; }
    blockquote p { margin: 0 0 4px; text-indent: 0; }
    blockquote p:last-child { margin: 0; }
    ul, ol { margin: 4px 0 8px; padding-left: 16px; }
    li { margin-bottom: 3px; }
    .span-all { column-span: all; }
    table { width: 100%; border-collapse: collapse; font-size: 10px; margin: 8px 0; }
    th { text-align: left; padding: 4px 6px; border-bottom: 1.5px solid ${theme.ruleColor}; color: ${theme.headingColor}; }
    td { padding: 4px 6px; border-bottom: 1px solid rgba(0,0,0,0.08); }
    tbody tr:nth-child(even) { background: ${theme.tableStripe}; }
    .callout { margin: 8px 0; padding: 8px 10px; background: ${theme.calloutBg}; border: 1px solid ${theme.calloutBorder}; break-inside: avoid; }
    .callout-title { font-weight: 700; font-size: 12px; color: ${theme.headingColor}; margin-bottom: 4px; }
    .statblock { margin: 8px 0; padding: 9px 11px; background: ${theme.statblockBg}; border-top: 2.5px solid ${theme.statblockBorder}; border-bottom: 2.5px solid ${theme.statblockBorder}; border-left: 1px solid rgba(0,0,0,0.12); border-right: 1px solid rgba(0,0,0,0.12); break-inside: avoid; }
    .sb-title { font-size: 13.5px; font-weight: 700; color: ${theme.headingColor}; }
    .sb-sub { font-size: 9.5px; font-style: italic; color: #4c433a; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid ${theme.calloutBorder}; }
    .sb-stats { display: grid; gap: 4px; text-align: center; padding: 4px 0; margin-bottom: 5px; border-bottom: 1px solid rgba(0,0,0,0.1); }
    .sb-k { font-size: 8.5px; font-weight: 700; color: ${theme.headingColor}; }
    .sb-v { font-family: monospace; font-size: 10.5px; font-weight: 700; }
    .sb-derived { display: flex; flex-wrap: wrap; gap: 10px; font-size: 9.5px; margin-bottom: 5px; padding-bottom: 4px; border-bottom: 1px solid rgba(0,0,0,0.1); }
    .sb-trait { font-size: 9.8px; line-height: 1.35; margin-bottom: 3px; }
    .page-footer { position: absolute; bottom: 16px; font-size: 9.5px; font-style: italic; color: #4e453b; }
    .book-page.even .page-footer { left: 42px; }
    .book-page.odd .page-footer { right: 42px; }
    /* Official 2-Page Bestiary Spread CSS */
    .bl-grid { flex: 1; min-height: 0; padding: 44px 36px 36px 34px; display: grid; grid-template-columns: 23.5% minmax(0, 1fr); gap: 22px; align-items: stretch; }
    .bl-aside { display: flex; flex-direction: column; gap: 9px; font-size: 8.8px; line-height: 1.28; overflow: hidden; }
    .bl-box { border: 1.5px solid ${theme.headingColor}; padding: 1.5px; background: #f7f4ec; break-inside: avoid; }
    .bl-inner { border: 1px solid ${theme.headingColor}; background: #faf8f3; }
    .bl-hdr { background: ${theme.tableStripe}; text-align: center; font-weight: 700; padding: 2.5px 4px; border-bottom: 1px solid ${theme.headingColor}; font-size: 9.2px; }
    .bl-row { display: grid; grid-template-columns: 1fr 28px; text-align: center; }
    .bl-row span:first-child { padding: 2px 5px; }
    .bl-kv-row { display: grid; grid-template-columns: 1fr 44px; text-align: center; }
    .bl-kv-row.bl-kv-sm { grid-template-columns: 1fr 34px; }
    .bl-k { background: ${theme.tableStripe}; font-weight: 700; padding: 2.5px 4px; text-align: center; display: flex; align-items: center; justify-content: center; }
    .bl-val { padding: 2.5px 4px; border-left: 1px solid ${theme.headingColor}; text-align: center; font-variant-numeric: tabular-nums; display: flex; align-items: center; justify-content: center; }
    .bl-cell { text-align: center; padding: 3px 5px; }
    .bl-loot { text-align: center; padding: 3.5px 5px; display: flex; flex-direction: column; gap: 1.5px; }
    .solid-b { border-bottom: 1px solid ${theme.headingColor}; }
    .soft-b { border-bottom: 1px solid rgba(0,0,0,0.18); }
    .bl-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
    .bl-art-wrap { position: relative; flex-shrink: 0; margin-bottom: 26px; }
    .bl-art-frame { width: 100%; height: 100%; background: #1a1b1f; border: 1px solid rgba(0,0,0,0.3); overflow: hidden; }
    .bl-art-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; display: block; }
    .bl-banner { position: absolute; top: -10px; left: 16px; width: 92px; bottom: -34px; background: ${theme.bannerGradient}; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%); padding: 8px 8px 34px; display: flex; flex-direction: column; align-items: center; gap: 5px; color: #f7f4ec; z-index: 4; }
    .bl-emblem { width: 66px; height: 66px; object-fit: contain; display: block; flex-shrink: 0; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35)); }
    .bl-threat { font-size: 9.2px; font-weight: 700; text-align: center; line-height: 1.15; border-bottom: 1px solid rgba(255,255,255,0.45); padding-bottom: 4px; width: 100%; }
    .bl-meta-grp { text-align: center; font-size: 8.2px; line-height: 1.18; }
    .bl-meta-grp .u { text-decoration: underline; font-weight: 700; }
    .bl-meta-grp .i { font-style: italic; }
    .bl-chips { width: 100%; display: flex; flex-direction: column; gap: 1.5px; margin-top: 2px; }
    .bl-chips.derived-wrap { margin-top: 4px; }
    .bl-chip { display: grid; grid-template-columns: 1fr 22px; background: #f8f5ee; color: #1b1612; border: 1px solid rgba(0,0,0,0.35); font-size: 8px; line-height: 1.32; text-align: center; }
    .bl-chip.derived { grid-template-columns: 1fr 24px; }
    .bl-chip span:first-child { font-weight: 700; border-right: 1px solid rgba(0,0,0,0.28); }
    .bl-phys { position: absolute; right: 10px; bottom: 10px; width: 215px; z-index: 4; font-size: 8.5px; line-height: 1.25; box-shadow: 0 3px 8px rgba(0,0,0,0.45); }
    .bl-phys-row { display: grid; grid-template-columns: 78px 1fr; }
    .bl-lore { flex: 1; min-height: 0; overflow: hidden; }
    .bl-name { font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif; font-weight: 700; line-height: 0.98; letter-spacing: -0.02em; color: ${theme.headingColor}; margin: 0 0 6px; border: none; padding: 0; column-span: none; }
    .bl-super-h { font-size: 14.5px; font-weight: 700; color: ${theme.headingColor}; border-bottom: 1.5px solid ${theme.ruleColor}; padding-bottom: 2px; margin: 0 0 8px; }
    .bl-super-p { font-size: 10.2px; line-height: 1.4; font-style: italic; text-align: justify; margin: 0; text-indent: 0; }
    .br-shell { flex: 1; min-height: 0; padding: 48px 42px 42px; display: flex; flex-direction: column; gap: 18px; }
    .br-know-h { font-size: 16.5px; font-weight: 700; color: ${theme.headingColor}; border-bottom: 1.5px solid ${theme.ruleColor}; padding-bottom: 3px; margin: 0 0 8px; }
    .br-know-p { margin: 0 0 6px; font-size: 10.6px; line-height: 1.44; text-align: justify; text-indent: 0; }
    .br-know-p:last-child { margin-bottom: 0; }
    .br-tbl-title { background: ${theme.tableStripe}; text-align: center; font-weight: 700; font-size: 11.5px; padding: 4px 8px; border-bottom: 1px solid ${theme.headingColor}; }
    .br-tbl { width: 100%; border-collapse: collapse; font-size: 9.8px; margin: 0; }
    .br-tbl th { background: ${theme.tableStripe}; padding: 4px 5px; text-align: center; font-weight: 700; border-bottom: 1px solid ${theme.headingColor}; color: #1e1915; }
    .br-tbl th + th, .br-tbl td + td { border-left: 1px solid ${theme.headingColor}; }
    .br-tbl td { padding: 5px; text-align: center; border-bottom: none; }
    .br-tbl tbody tr:nth-child(even) { background: transparent; }
    .br-tbl tbody tr + tr td { border-top: 1px solid rgba(0,0,0,0.15); }
    .br-ab-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 20px; align-items: start; }
    .br-ab-title { background: ${theme.tableStripe}; text-align: center; font-weight: 700; font-size: 10.6px; padding: 4px 8px; border-bottom: 1px solid ${theme.headingColor}; }
    .br-ab-body { padding: 10px 12px; text-align: center; font-size: 9.8px; line-height: 1.4; color: #1e1915; }
    /* Official 1-Page PC/NPC Character Sheet CSS */
    .cs-grid { flex: 1; min-height: 0; padding: 44px 36px 38px 32px; display: grid; grid-template-columns: 24.5% minmax(0, 1fr); gap: 22px; align-items: stretch; }
    .cs-aside { display: flex; flex-direction: column; gap: 12px; font-size: 8.6px; line-height: 1.25; overflow: hidden; }
    .cs-stat-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; align-items: start; }
    .cs-stat-row { display: grid; grid-template-columns: 1fr 24px; text-align: center; }
    .cs-stat-row span:first-child { padding: 2px; font-weight: 700; font-size: 8.1px; }
    .cs-stat-row span:last-child { padding: 2px; border-left: 1px solid ${theme.headingColor}; font-variant-numeric: tabular-nums; }
    .cs-box-hdr { background: ${theme.tableStripe}; text-align: center; font-weight: 700; font-size: 12px; padding: 3.5px 6px; border-bottom: 1px solid ${theme.headingColor}; }
    .cs-skill-row { display: grid; grid-template-columns: 1fr 26px; background: #faf8f3; text-align: center; }
    .cs-skill-row.stripe, .cs-magic-row.stripe, .cs-gear-row.stripe { background: ${theme.tableStripe}; }
    .cs-skill-row span:first-child { padding: 2.2px 5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cs-skill-row span:last-child { padding: 2.2px 4px; border-left: 1px solid ${theme.headingColor}; font-variant-numeric: tabular-nums; }
    .cs-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; justify-content: space-between; gap: 12px; }
    .cs-name { font-family: Georgia, "Palatino Linotype", "Book Antiqua", serif; font-weight: 700; line-height: 0.98; letter-spacing: -0.02em; color: ${theme.headingColor}; margin: 0; padding: 0 0 5px; border-bottom: 1.5px solid ${theme.ruleColor}; column-span: none; }
    .cs-sub { margin-top: 3px; font-size: 9.5px; font-style: italic; color: #52473c; }
    .cs-mid { flex: 1; min-height: 0; display: grid; grid-template-columns: 46% minmax(0, 1fr); gap: 18px; align-items: start; overflow: hidden; }
    .cs-mid-left { display: flex; flex-direction: column; gap: 12px; min-height: 0; }
    .cs-portrait { width: 100%; background: #1a1b1f; border: 1px solid rgba(0,0,0,0.28); overflow: hidden; flex-shrink: 0; }
    .cs-portrait img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block; }
    .cs-magic-row { background: #faf8f3; text-align: center; font-size: 8.7px; line-height: 1.28; padding: 2.5px 6px; }
    .cs-quote-col { font-size: 10.1px; line-height: 1.38; font-style: italic; color: #1e1915; text-align: justify; overflow: hidden; }
    .cs-quote-p { margin: 0 0 6px; text-indent: 0; text-align: justify; }
    .cs-attr { margin: 6px 0 0; text-align: right; font-style: italic; font-weight: 600; text-indent: 0; }
    .cs-gear-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: #faf8f3; text-align: center; }
    .cs-gear-row span { padding: 3px 4px; font-size: 8.3px; line-height: 1.24; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cs-gear-row span + span { border-left: 1px solid ${theme.headingColor}; }
    @media print {
      body { padding: 0; background: none; }
      .toolbar { display: none; }
      .stack { gap: 0; }
      .book-page { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="toolbar"><button class="print-btn" onclick="window.print()">${escapeHtml(printLabel)}</button></div>
  <main class="stack">${pagesHtml}</main>
</body>
</html>`;

  triggerBlobDownload(
    new Blob([html], { type: 'text/html;charset=utf-8' }),
    `${slugifyTitle(doc.title)}.html`
  );
}

export function downloadMarkdownSource(doc: HomebrewDocument): void {
  triggerBlobDownload(
    new Blob([doc.markdown], { type: 'text/markdown;charset=utf-8' }),
    `${slugifyTitle(doc.title)}.md`
  );
}
