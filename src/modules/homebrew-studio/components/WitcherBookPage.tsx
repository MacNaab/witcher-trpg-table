import type { CSSProperties } from 'react';
import { BUILTIN_ARTWORK_MAP, HOMEBREW_THEMES } from '../data/templates';
import type {
  HomebrewPageFormat,
  HomebrewThemeId,
  MarkdownBlockNode,
  ParsedHomebrewPage,
} from '../types';
import {
  computeSmartTocLayout,
  tokenizeInlineMarkdown,
} from '../utils/witcherMarkdown';
import {
  WitcherBestiaryLeftPage,
  WitcherBestiaryRightPage,
} from './WitcherBestiaryPages';
import { WitcherCharacterSheetPage } from './WitcherCharacterSheetPage';
import {
  WitcherProfessionOverviewPage,
  WitcherProfessionTreePage,
} from './WitcherProfessionPages';

interface WitcherBookPageProps {
  page: ParsedHomebrewPage;
  themeId: HomebrewThemeId;
  pageFormat: HomebrewPageFormat;
  chapterFooter: string;
  images: Record<string, string>;
  pageRef?: (el: HTMLDivElement | null) => void;
}

export const PAGE_DIMENSIONS: Record<
  HomebrewPageFormat,
  { width: number; height: number; cssSize: string }
> = {
  a4: { width: 794, height: 1123, cssSize: '210mm 297mm' },
  letter: { width: 816, height: 1056, cssSize: '8.5in 11in' },
};

function resolveImageSource(
  rawSrc: string,
  images: Record<string, string>
): string | null {
  if (BUILTIN_ARTWORK_MAP[rawSrc]) return BUILTIN_ARTWORK_MAP[rawSrc];
  if (rawSrc.startsWith('img:')) {
    const key = rawSrc.slice(4);
    return images[key] ?? null;
  }
  return rawSrc;
}

function renderInlineText(text: string) {
  const tokens = tokenizeInlineMarkdown(text);
  return tokens.map((tok, idx) => {
    switch (tok.type) {
      case 'bold':
        return (
          <strong key={idx} style={{ fontWeight: 700 }}>
            {tok.text}
          </strong>
        );
      case 'italic':
        return (
          <em key={idx} style={{ fontStyle: 'italic' }}>
            {tok.text}
          </em>
        );
      case 'bolditalic':
        return (
          <strong key={idx} style={{ fontWeight: 700, fontStyle: 'italic' }}>
            {tok.text}
          </strong>
        );
      case 'code':
        return (
          <code
            key={idx}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.86em',
              backgroundColor: 'rgba(0,0,0,0.06)',
              padding: '1px 4px',
              borderRadius: '3px',
            }}
          >
            {tok.text}
          </code>
        );
      case 'strike':
        return <s key={idx}>{tok.text}</s>;
      default:
        return <span key={idx}>{tok.text}</span>;
    }
  });
}

function renderNodes(
  nodes: MarkdownBlockNode[],
  themeId: HomebrewThemeId,
  images: Record<string, string>,
  inMinorColumn = false
) {
  const theme = HOMEBREW_THEMES[themeId];

  return nodes.map((node, idx) => {
    switch (node.type) {
      case 'heading': {
        if (node.level === 1) {
          const h1Size = inMinorColumn
            ? '18px'
            : node.text.length > 36
              ? '30px'
              : node.text.length > 26
                ? '36px'
                : '42px';
          return (
            <h1
              key={idx}
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
                fontSize: h1Size,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
                color: theme.headingColor,
                marginTop: idx === 0 ? '0px' : '14px',
                marginBottom: '12px',
                breakAfter: 'avoid',
                columnSpan: inMinorColumn ? 'none' : 'all',
              }}
            >
              {node.text}
            </h1>
          );
        }
        if (node.level === 2) {
          return (
            <h2
              key={idx}
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: inMinorColumn ? '14px' : '15.5px',
                fontWeight: 700,
                lineHeight: 1.2,
                color: theme.headingColor,
                borderBottom: `1.5px solid ${theme.ruleColor}`,
                paddingBottom: '2px',
                marginTop: idx === 0 ? '0px' : '11px',
                marginBottom: '5px',
                breakAfter: 'avoid',
              }}
            >
              {node.text}
            </h2>
          );
        }
        if (node.level === 3) {
          return (
            <h3
              key={idx}
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#231e19',
                marginTop: idx === 0 ? '0px' : '8px',
                marginBottom: '3px',
                breakAfter: 'avoid',
              }}
            >
              {node.text}
            </h3>
          );
        }
        return (
          <h4
            key={idx}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '11.5px',
              fontWeight: 700,
              fontStyle: 'italic',
              color: theme.headingColor,
              marginTop: '6px',
              marginBottom: '2px',
            }}
          >
            {node.text}
          </h4>
        );
      }

      case 'paragraph':
        return (
          <p
            key={idx}
            style={{
              margin: '0 0 7px 0',
              textAlign: inMinorColumn ? 'left' : 'justify',
              textIndent: idx > 0 && nodes[idx - 1]?.type === 'paragraph' ? '1.1em' : '0',
              hyphens: 'auto',
            }}
          >
            {renderInlineText(node.text)}
          </p>
        );

      case 'blockquote':
        return (
          <blockquote
            key={idx}
            style={{
              margin: '7px 0 9px 0',
              padding: '6px 10px',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              borderTop: `1px solid ${theme.calloutBorder}`,
              borderBottom: `1px solid ${theme.calloutBorder}`,
              fontStyle: 'italic',
              color: '#2b241d',
              breakInside: 'avoid',
            }}
          >
            {node.lines.map((line, lIdx) => (
              <p key={lIdx} style={{ margin: lIdx === node.lines.length - 1 ? 0 : '0 0 4px 0' }}>
                {renderInlineText(line)}
              </p>
            ))}
          </blockquote>
        );

      case 'list': {
        const Tag = node.ordered ? 'ol' : 'ul';
        return (
          <Tag
            key={idx}
            style={{
              margin: '4px 0 8px 0',
              paddingLeft: '16px',
              listStyleType: node.ordered ? 'decimal' : 'disc',
            }}
          >
            {node.items.map((item, itemIdx) => (
              <li key={itemIdx} style={{ marginBottom: '3px', lineHeight: 1.38 }}>
                {renderInlineText(item)}
              </li>
            ))}
          </Tag>
        );
      }

      case 'table':
        return (
          <div
            key={idx}
            style={{
              margin: '8px 0 10px 0',
              breakInside: 'avoid',
              columnSpan: node.headers.length >= 4 && !inMinorColumn ? 'all' : 'none',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '10px',
                lineHeight: 1.35,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1.5px solid ${theme.ruleColor}`,
                    color: theme.headingColor,
                  }}
                >
                  {node.headers.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      style={{
                        textAlign: 'left',
                        padding: '4px 6px',
                        fontWeight: 700,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {node.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      backgroundColor:
                        rIdx % 2 === 1 ? theme.tableStripe : 'transparent',
                      borderBottom: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '4px 6px' }}>
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'image': {
        const resolved = resolveImageSource(node.src, images);
        if (!resolved) {
          return (
            <div
              key={idx}
              style={{
                border: '1px dashed rgba(0,0,0,0.28)',
                padding: '16px',
                textAlign: 'center',
                fontSize: '10px',
                color: '#5a5046',
                margin: '6px 0',
              }}
            >
              {node.alt || 'Image'}
            </div>
          );
        }
        return (
          <figure
            key={idx}
            style={{
              margin: inMinorColumn ? '0 0 8px 0' : '6px 0 0 0',
              breakInside: 'avoid',
            }}
          >
            <img
              src={resolved}
              alt={node.alt}
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: node.fullHeight && inMinorColumn ? '260px' : 'auto',
                maxHeight: inMinorColumn ? '320px' : '235px',
                objectFit: 'cover',
                display: 'block',
                border: '1px solid rgba(0,0,0,0.18)',
              }}
            />
          </figure>
        );
      }

      case 'hr':
        return (
          <hr
            key={idx}
            style={{
              border: 0,
              borderTop: `1px solid ${theme.ruleColor}`,
              opacity: 0.45,
              margin: '10px 0',
            }}
          />
        );

      case 'signs':
        return <WitcherSignsDivider key={idx} color={theme.headingColor} />;

      case 'callout':
        return (
          <div
            key={idx}
            style={{
              margin: '8px 0 10px 0',
              padding: '8px 10px',
              backgroundColor: theme.calloutBg,
              border: `1px solid ${theme.calloutBorder}`,
              borderRadius: '2px',
              breakInside: 'avoid',
            }}
          >
            {node.title && (
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: theme.headingColor,
                  marginBottom: '4px',
                }}
              >
                {node.title}
              </div>
            )}
            <div style={{ fontSize: '10.5px', lineHeight: 1.4 }}>
              {renderNodes(node.nodes, themeId, images, true)}
            </div>
          </div>
        );

      case 'statblock': {
        const sb = node.data;
        return (
          <div
            key={idx}
            style={{
              margin: '8px 0 10px 0',
              padding: '9px 11px',
              backgroundColor: theme.statblockBg,
              borderTop: `2.5px solid ${theme.statblockBorder}`,
              borderBottom: `2.5px solid ${theme.statblockBorder}`,
              borderLeft: '1px solid rgba(0,0,0,0.12)',
              borderRight: '1px solid rgba(0,0,0,0.12)',
              breakInside: 'avoid',
              columnSpan: !inMinorColumn ? 'all' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: '"Cinzel", Georgia, serif',
                fontSize: '13.5px',
                fontWeight: 700,
                color: theme.headingColor,
                lineHeight: 1.15,
              }}
            >
              {sb.title}
            </div>
            {sb.subtitle && (
              <div
                style={{
                  fontSize: '9.5px',
                  fontStyle: 'italic',
                  color: '#4c433a',
                  marginBottom: '6px',
                  paddingBottom: '4px',
                  borderBottom: `1px solid ${theme.calloutBorder}`,
                }}
              >
                {sb.subtitle}
              </div>
            )}

            {sb.stats.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(8, sb.stats.length)}, minmax(0, 1fr))`,
                  gap: '4px',
                  marginBottom: '5px',
                  padding: '4px 0',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                  textAlign: 'center',
                }}
              >
                {sb.stats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <div
                      style={{
                        fontSize: '8.5px',
                        fontWeight: 700,
                        color: theme.headingColor,
                      }}
                    >
                      {st.label}
                    </div>
                    <div
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: '#1b1612',
                      }}
                    >
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sb.derived.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  fontSize: '9.5px',
                  marginBottom: '5px',
                  paddingBottom: '4px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                {sb.derived.map((dv, dIdx) => (
                  <span key={dIdx}>
                    <strong style={{ color: theme.headingColor }}>{dv.label}:</strong>{' '}
                    <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {dv.value}
                    </span>
                  </span>
                ))}
              </div>
            )}

            {sb.traits.map((tr, tIdx) => (
              <div
                key={tIdx}
                style={{ fontSize: '9.8px', lineHeight: 1.35, marginBottom: '3px' }}
              >
                <strong style={{ color: theme.headingColor }}>{tr.label}:</strong>{' '}
                <span>{renderInlineText(tr.value)}</span>
              </div>
            ))}

            {sb.bodyLines.map((b, bIdx) => (
              <div
                key={bIdx}
                style={{ fontSize: '9.8px', lineHeight: 1.35, marginBottom: '2px' }}
              >
                {renderInlineText(b)}
              </div>
            ))}
          </div>
        );
      }
    }
  });
}

function WitcherSignsDivider({ color }: { color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0 14px 0',
        columnSpan: 'all',
        breakInside: 'avoid',
      }}
    >
      <svg
        width="268"
        height="34"
        viewBox="0 0 268 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* 1. Yrden */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="17" cy="17" r="12" />
          <path d="M12 10 L22 10 L13 24 L22 24 Z" />
        </g>
        {/* 2. Quen */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="54" cy="17" r="12" />
          <path d="M47 12 L61 12 L54 24 Z" />
          <line x1="48" y1="15.5" x2="60" y2="15.5" />
        </g>
        {/* 3. Aard */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="91" cy="17" r="12" />
          <path d="M84 22 L91 10 L98 22 Z" />
          <line x1="86.5" y1="14.5" x2="95.5" y2="14.5" />
        </g>
        {/* 4. Central Medallion Hexagon */}
        <g stroke={color} strokeWidth="1.8" strokeLinejoin="round">
          <polygon points="134,3 147,10 147,24 134,31 121,24 121,10" fill="rgba(255,255,255,0.22)" />
          <path d="M126 12 L130 16 L134 11 L138 16 L142 12 L140 22 L134 26 L128 22 Z" fill={color} fillOpacity="0.18" />
          <circle cx="130.5" cy="17.5" r="1.1" fill={color} />
          <circle cx="137.5" cy="17.5" r="1.1" fill={color} />
        </g>
        {/* 5. Igni */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="177" cy="17" r="12" />
          <path d="M170 12 L184 12 L177 24 Z" />
        </g>
        {/* 6. Axii */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="214" cy="17" r="12" />
          <path d="M207 22 L214 10 L221 22 Z" />
        </g>
        {/* 7. Heliotrop / Ward */}
        <g stroke={color} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="251" cy="17" r="12" />
          <path d="M244 22 L251 10 L258 22 Z" />
          <line x1="246" y1="18" x2="256" y2="18" />
        </g>
      </svg>
    </div>
  );
}

function IronChainStrip({ widthPx }: { widthPx: number }) {
  const step = 36;
  const count = Math.ceil(widthPx / step) + 2;
  return (
    <svg
      width={widthPx}
      height="16"
      viewBox={`0 0 ${widthPx} 16`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.45))' }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, idx) => {
        const x = idx * step;
        return (
          <g key={idx}>
            {/* Outer horizontal forged oval link */}
            <rect
              x={x + 1}
              y="2.5"
              width="24"
              height="11"
              rx="5.5"
              fill="#23252a"
              stroke="#5c6068"
              strokeWidth="1.6"
            />
            <rect
              x={x + 6}
              y="5.5"
              width="14"
              height="5"
              rx="2.5"
              fill="#e4dfd4"
              fillOpacity="0.92"
            />
            {/* Connecting vertical bar link */}
            <rect
              x={x + 21}
              y="5.5"
              width="18"
              height="5"
              rx="2.5"
              fill="#31343b"
              stroke="#777b85"
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Renders a single print-accurate Witcher TRPG rulebook page sheet.
 * Enforces parity-driven alternating layout:
 * - Even pages (2, 4, 8...): Swallowtail bookmark & 1-col minor sidebar on the LEFT; 2-col main block on the RIGHT.
 * - Odd pages (1, 3, 73...): Swallowtail bookmark & 1-col minor sidebar on the RIGHT; 2-col main block on the LEFT.
 */
export function WitcherBookPage({
  page,
  themeId,
  pageFormat,
  chapterFooter,
  images,
  pageRef,
}: WitcherBookPageProps) {
  const theme = HOMEBREW_THEMES[themeId];
  const dims = PAGE_DIMENSIONS[pageFormat];
  const hasMinorColumn = page.asideNodes.length > 0;
  const hasBottomBlock = page.bottomNodes.length > 0;

  if (page.bestiaryLeftData) {
    return (
      <WitcherBestiaryLeftPage
        page={page}
        data={page.bestiaryLeftData}
        themeId={themeId}
        pageFormat={pageFormat}
        chapterFooter={chapterFooter}
        dims={dims}
        images={images}
        pageRef={pageRef}
      />
    );
  }

  if (page.bestiaryRightData) {
    return (
      <WitcherBestiaryRightPage
        page={page}
        data={page.bestiaryRightData}
        themeId={themeId}
        pageFormat={pageFormat}
        chapterFooter={chapterFooter}
        dims={dims}
        pageRef={pageRef}
      />
    );
  }

  if (page.characterSheetData) {
    return (
      <WitcherCharacterSheetPage
        page={page}
        data={page.characterSheetData}
        themeId={themeId}
        pageFormat={pageFormat}
        chapterFooter={chapterFooter}
        dims={dims}
        images={images}
        pageRef={pageRef}
      />
    );
  }

  if (page.professionOverviewData) {
    return (
      <WitcherProfessionOverviewPage
        page={page}
        data={page.professionOverviewData}
        themeId={themeId}
        pageFormat={pageFormat}
        chapterFooter={chapterFooter}
        dims={dims}
        images={images}
        pageRef={pageRef}
      />
    );
  }

  if (page.professionTreeData) {
    return (
      <WitcherProfessionTreePage
        page={page}
        data={page.professionTreeData}
        themeId={themeId}
        pageFormat={pageFormat}
        chapterFooter={chapterFooter}
        dims={dims}
        pageRef={pageRef}
      />
    );
  }

  // Back Cover Page (Book of Tales style: diagonal top illustration, iron chain dividers, 2-col synopsis + features)
  if (page.isBackCover && page.backCoverData) {
    const bc = page.backCoverData;
    const bgSrc = resolveImageSource(bc.image || 'preset:grimoire', images);
    const leftY = Math.round(dims.height * 0.43);
    const rightY = Math.round(dims.height * 0.59);
    const dy = rightY - leftY;
    const dx = dims.width;
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    const chainLen = Math.ceil(Math.hypot(dx, dy)) + 40;
    const midY = (leftY + rightY) / 2;

    const sideMargin = 44;
    const colGap = 32;
    const leftColWidth = (dims.width - sideMargin * 2 - colGap) / 2;
    const colsTop = leftY + 56;
    const chainClearance = 22;
    const stepHeight = 12;
    const rightColTopOffset = Math.max(0, rightY + chainClearance - colsTop);

    // Build right-floated staircase spacers so left column lines wrap along the diagonal slope
    const staircaseSpacers: number[] = [];
    for (let s = 0; s < 10; s += 1) {
      const yBandTop = colsTop + s * stepHeight;
      const xSafe = ((yBandTop - leftY - chainClearance) / dy) * dx;
      const availWidth = xSafe - sideMargin;
      const blockedWidth = Math.round(leftColWidth - availWidth);
      if (blockedWidth <= 4) break;
      staircaseSpacers.push(Math.min(Math.round(leftColWidth - 96), blockedWidth));
    }

    return (
      <div
        ref={pageRef}
        data-brew-page="backcover"
        style={{
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          backgroundColor: '#ece7dc',
          backgroundImage:
            'radial-gradient(ellipse at 50% 65%, rgba(255,253,247,0.75) 0%, rgba(226,220,206,0.72) 75%, rgba(208,200,185,0.88) 100%)',
          color: '#1d1814',
          fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
        className="shrink-0 shadow-xl ring-1 ring-black/25"
      >
        {/* Top Diagonal Clipped Illustration */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: `${rightY}px`,
            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 ${Math.round((leftY / rightY) * 1000) / 10}%)`,
            backgroundColor: '#1a1b1f',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {bgSrc && (
            <img
              src={bgSrc}
              alt={bc.featuringTitle}
              referrerPolicy="no-referrer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 25%',
                display: 'block',
              }}
            />
          )}
        </div>

        {/* Diagonal Iron Chain Divider */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: `${midY}px`,
            width: `${chainLen}px`,
            transform: `translate(-50%, -50%) rotate(${angleDeg.toFixed(2)}deg)`,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <IronChainStrip widthPx={chainLen} />
        </div>

        {/* Lower Parchment Copy Area: 2 Columns */}
        <div
          style={{
            position: 'absolute',
            top: `${colsTop}px`,
            left: `${sideMargin}px`,
            right: `${sideMargin}px`,
            bottom: '94px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: `${colGap}px`,
            alignItems: 'start',
            zIndex: 5,
          }}
        >
          {/* Left Column: Synopsis Paragraphs (wraps along diagonal edge using right-floated spacers) */}
          <div style={{ display: 'flow-root' }}>
            {staircaseSpacers.map((wPx, sIdx) => (
              <div
                key={sIdx}
                aria-hidden="true"
                style={{
                  float: 'right',
                  clear: 'right',
                  width: `${wPx}px`,
                  height: `${stepHeight}px`,
                }}
              />
            ))}
            {bc.paragraphs.map((para, pIdx) => (
              <p
                key={pIdx}
                style={{
                  fontSize: '12px',
                  lineHeight: 1.46,
                  fontWeight: 500,
                  color: '#1b1612',
                  margin: '0 0 14px 0',
                  textAlign: 'left',
                }}
              >
                {renderInlineText(para)}
              </p>
            ))}
          </div>

          {/* Right Column: Featuring / Au programme (offset cleanly below lower right diagonal) */}
          <div style={{ paddingTop: `${rightColTopOffset}px` }}>
            {bc.featuringTitle && (
              <h2
                style={{
                  fontFamily: 'Georgia, "Palatino Linotype", serif',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#1b1612',
                  margin: '0 0 10px 0',
                }}
              >
                {bc.featuringTitle}
              </h2>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bc.features.map((feat, fIdx) => (
                <div key={fIdx}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '7px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1b1612',
                      marginBottom: '2px',
                    }}
                  >
                    <span aria-hidden="true">•</span>
                    <span>{feat.title}</span>
                  </div>
                  {feat.description && (
                    <p
                      style={{
                        margin: '0 0 0 14px',
                        fontSize: '10.6px',
                        lineHeight: 1.38,
                        color: '#2c251e',
                      }}
                    >
                      {renderInlineText(feat.description)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Iron Chain */}
        <div
          style={{
            position: 'absolute',
            left: '-8px',
            right: '-8px',
            bottom: '74px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <IronChainStrip widthPx={dims.width + 16} />
        </div>

        {/* Bottom Footer Credits */}
        <div
          style={{
            position: 'absolute',
            left: `${sideMargin}px`,
            right: `${sideMargin}px`,
            bottom: '18px',
            height: '46px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: '"Cinzel", Georgia, serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme.headingColor,
            }}
          >
            {bc.creditLeft ?? ''}
          </span>

          <span
            style={{
              fontFamily: '"Cinzel", Georgia, serif',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#2c251e',
            }}
          >
            {bc.creditRight ?? ''}
          </span>
        </div>
      </div>
    );
  }

  // Full-Bleed Cover Page (Lords & Lands / Witcher TRPG Supplement Style)
  if (page.isCover && page.coverData) {
    const cover = page.coverData;
    const bgSrc = resolveImageSource(cover.image || 'preset:grimoire', images);
    const titleLen = cover.title.length;
    const titleSize = titleLen > 24 ? '38px' : titleLen > 15 ? '46px' : '54px';

    return (
      <div
        ref={pageRef}
        data-brew-page="cover"
        style={{
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          backgroundColor: '#121316',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
        className="shrink-0 shadow-xl ring-1 ring-black/25"
      >
        {bgSrc && (
          <img
            src={bgSrc}
            alt={cover.title}
            referrerPolicy="no-referrer"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
            }}
          />
        )}

        {/* Atmospheric dark gradient scrim for crisp cover typography */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,10,14,0.10) 0%, rgba(8,10,14,0.22) 38%, rgba(8,10,14,0.78) 68%, rgba(5,6,9,0.95) 100%)',
          }}
        />

        {/* Subtle inner framing hairline */}
        <div
          style={{
            position: 'absolute',
            inset: '14px',
            border: '1px solid rgba(255, 248, 232, 0.14)',
            pointerEvents: 'none',
          }}
        />

        {/* Lower-Center Display Title Lockup & Bottom Credits */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '56px 56px 34px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          {cover.overline && (
            <div
              style={{
                fontFamily: '"Cinzel", Georgia, serif',
                fontSize: '15.5px',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#f2efe6',
                marginBottom: '6px',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.92)',
              }}
            >
              {cover.overline}
            </div>
          )}

          <h1
            style={{
              fontFamily: '"Cinzel", Georgia, serif',
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: '#f5f3ec',
              margin: 0,
              textShadow:
                '0 4px 20px rgba(0, 0, 0, 0.96), 0 1px 0 rgba(120, 114, 102, 0.85)',
            }}
          >
            {cover.title}
          </h1>

          {cover.subtitle && (
            <div
              style={{
                fontFamily: '"Cinzel", Georgia, serif',
                fontSize: '21px',
                fontWeight: 700,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#e6b43d',
                marginTop: '10px',
                textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
              }}
            >
              {cover.subtitle}
            </div>
          )}

          {cover.tagline && (
            <p
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: '14.5px',
                lineHeight: 1.45,
                fontStyle: 'italic',
                color: '#ece8dd',
                maxWidth: '540px',
                margin: '20px auto 52px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.96)',
              }}
            >
              {cover.tagline}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              marginTop: cover.tagline ? '0px' : '56px',
              paddingTop: '12px',
              borderTop:
                cover.creditLeft || cover.creditRight
                  ? '1px solid rgba(255, 245, 224, 0.16)'
                  : 'none',
              fontFamily: '"Cinzel", Georgia, serif',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(235, 230, 220, 0.86)',
              textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)',
            }}
          >
            <span>{cover.creditLeft ?? ''}</span>
            <span>{cover.creditRight ?? ''}</span>
          </div>
        </div>
      </div>
    );
  }

  const pageSurfaceStyle: CSSProperties = {
    width: `${dims.width}px`,
    height: `${dims.height}px`,
    backgroundColor: '#efece4',
    backgroundImage:
      'radial-gradient(ellipse at 50% 45%, rgba(255,253,247,0.75) 0%, rgba(230,224,210,0.68) 72%, rgba(212,204,188,0.85) 100%)',
    color: '#1e1915',
    fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
    fontSize: '10.6px',
    lineHeight: 1.44,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  };

  const tocBottomImage = page.tocConfig?.image
    ? resolveImageSource(page.tocConfig.image, images)
    : null;

  return (
    <div
      ref={pageRef}
      data-brew-page={page.pageNumber}
      style={pageSurfaceStyle}
      className="shrink-0 shadow-xl ring-1 ring-black/15"
    >
      {/* Top Painted Header Banner */}
      <div
        style={{
          height: '28px',
          width: '100%',
          background: theme.bannerGradient,
          borderBottom: '2px solid rgba(0, 0, 0, 0.25)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Hanging Swallowtail Ribbon Bookmark (Left on Even, Right on Odd) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: page.isEven ? '30px' : undefined,
            right: !page.isEven ? '30px' : undefined,
            width: '48px',
            height: '62px',
            zIndex: 5,
            filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.38))',
          }}
        >
          {/* Darker back tail offset */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: '5px',
              width: '44px',
              height: '58px',
              backgroundColor: theme.ribbonShadow,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
            }}
          />
          {/* Front swallowtail bookmark */}
          <div
            style={{
              position: 'relative',
              width: '44px',
              height: '56px',
              background: theme.bannerGradient,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '12px',
              borderTop: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#f7f4ec',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {page.pageNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area: Full Art Page OR Smart 1-to-3 Col TOC OR Chapter Opener / Standard Spread */}
      {page.isArtPage && page.artPageData ? (
        (() => {
          const artSrc = resolveImageSource(page.artPageData.image, images);
          return (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '48px 36px 40px 36px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxSizing: 'border-box',
              }}
            >
              {artSrc ? (
                <figure
                  style={{
                    margin: 0,
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <img
                    src={artSrc}
                    alt={page.artPageData.caption || 'Illustration'}
                    referrerPolicy="no-referrer"
                    style={{
                      width: '100%',
                      flex: 1,
                      minHeight: 0,
                      objectFit: 'cover',
                      display: 'block',
                      border: '1px solid rgba(0, 0, 0, 0.28)',
                    }}
                  />
                  {page.artPageData.caption && (
                    <figcaption
                      style={{
                        marginTop: '6px',
                        fontSize: '9.5px',
                        fontStyle: 'italic',
                        color: '#4e453b',
                        textAlign: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {page.artPageData.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <div
                  style={{
                    flex: 1,
                    border: '1px dashed rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5a5046',
                    fontSize: '12px',
                  }}
                >
                  {page.artPageData.caption || 'Illustration'}
                </div>
              )}
            </div>
          );
        })()
      ) : page.tocConfig ? (
        (() => {
          const tocLayout = computeSmartTocLayout(
            page.tocEntries,
            dims.width,
            dims.height,
            hasBottomBlock || Boolean(tocBottomImage)
          );
          const h1Size = tocLayout.compact ? '9.8px' : '10.6px';
          const h2Size = tocLayout.compact ? '8.9px' : '9.5px';

          return (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '48px 42px 40px 42px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxSizing: 'border-box',
              }}
            >
              <h1
                style={{
                  fontFamily: '"Cinzel", Georgia, serif',
                  fontSize: '23px',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  color: theme.headingColor,
                  textAlign: 'center',
                  margin: '0 0 4px 0',
                  flexShrink: 0,
                }}
              >
                {page.tocConfig.title}
              </h1>

              {/* Adaptive 1-to-3 Column Directory (always fills Left column top-to-bottom first) */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  display: 'grid',
                  gridTemplateColumns: `repeat(${tocLayout.columnCount}, minmax(0, 1fr))`,
                  gap: '20px',
                  alignItems: 'start',
                  overflow: 'hidden',
                }}
              >
                {page.tocEntries.length === 0 ? (
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: '#5a5046',
                      fontSize: '10.5px',
                      gridColumn: '1 / -1',
                      textAlign: 'center',
                      marginTop: '24px',
                    }}
                  >
                    Ajoutez des titres # et ## dans les pages suivantes pour remplir ce sommaire automatiquement.
                  </p>
                ) : (
                  tocLayout.columns.map((colEntries, colIdx) => (
                    <div
                      key={colIdx}
                      style={{
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {colEntries.map((entry, eIdx) => {
                        const isH1 = entry.level === 1;
                        return (
                          <div
                            key={`${entry.pageNumber}-${colIdx}-${eIdx}-${entry.text}`}
                            style={{
                              display: 'flex',
                              alignItems: 'baseline',
                              gap: '4px',
                              marginTop: isH1
                                ? eIdx === 0
                                  ? '0px'
                                  : tocLayout.compact
                                    ? '5px'
                                    : '8px'
                                : tocLayout.compact
                                  ? '1px'
                                  : '2px',
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'Georgia, "Palatino Linotype", serif',
                                fontSize: isH1 ? h1Size : h2Size,
                                fontWeight: isH1 ? 700 : 400,
                                color: isH1 ? theme.headingColor : '#28211b',
                                lineHeight: tocLayout.compact ? 1.22 : 1.28,
                              }}
                            >
                              {entry.text}
                            </span>
                            <span
                              aria-hidden="true"
                              style={{
                                flex: 1,
                                minWidth: '8px',
                                borderBottom: isH1
                                  ? '1.2px dotted rgba(35, 29, 23, 0.50)'
                                  : '1px dotted rgba(35, 29, 23, 0.36)',
                                transform: 'translateY(-2px)',
                              }}
                            />
                            <span
                              style={{
                                fontFamily: 'Georgia, serif',
                                fontSize: isH1 ? h1Size : h2Size,
                                fontWeight: isH1 ? 700 : 400,
                                color: '#1e1915',
                                fontVariantNumeric: 'tabular-nums',
                                flexShrink: 0,
                              }}
                            >
                              {entry.pageNumber}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {hasBottomBlock ? (
                <div
                  style={{
                    flexShrink: 0,
                    maxHeight: '255px',
                    overflow: 'hidden',
                  }}
                >
                  {renderNodes(page.bottomNodes, themeId, images, false)}
                </div>
              ) : (
                tocBottomImage && (
                  <figure
                    style={{
                      margin: 0,
                      flexShrink: 0,
                      maxHeight: '255px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={tocBottomImage}
                      alt={page.tocConfig.title}
                      referrerPolicy="no-referrer"
                      style={{
                        width: '100%',
                        height: '245px',
                        objectFit: 'cover',
                        display: 'block',
                        border: '1px solid rgba(0, 0, 0, 0.22)',
                      }}
                    />
                  </figure>
                )
              )}
            </div>
          );
        })()
      ) : (
        (() => {
          // If this is a Chapter Opener (starts with # H1 + optional epigraph + ::: signs), render giant opener header above 2-col body
          let openerHeading: Extract<MarkdownBlockNode, { type: 'heading' }> | null =
            null;
          let openerQuote: Extract<MarkdownBlockNode, { type: 'blockquote' }> | null =
            null;
          let showOpenerSigns = false;
          let bodyNodes = page.mainNodes;

          if (page.isChapterOpener && page.mainNodes[0]?.type === 'heading') {
            openerHeading = page.mainNodes[0];
            let cursor = 1;
            const nextNode = page.mainNodes[cursor];
            const nodeAfterQuote = page.mainNodes[cursor + 1];
            const quoteHasAttr =
              nextNode?.type === 'blockquote' &&
              nextNode.lines.some((l) => /^[-—–]\s*/.test(l.trim()));
            if (
              nextNode?.type === 'blockquote' &&
              (quoteHasAttr || nodeAfterQuote?.type === 'signs')
            ) {
              openerQuote = nextNode;
              cursor += 1;
            }
            if (page.mainNodes[cursor]?.type === 'signs') {
              showOpenerSigns = true;
              cursor += 1;
            }
            bodyNodes = page.mainNodes.slice(cursor);
          }

          return (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: '48px 42px 40px 42px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxSizing: 'border-box',
              }}
            >
              {/* Optional Full-Width Banner / Cover Header */}
              {page.bannerNodes.length > 0 && (
                <div style={{ flexShrink: 0 }}>
                  {renderNodes(page.bannerNodes, themeId, images, false)}
                </div>
              )}

              {/* Alternating 2-Column Main Block + 1-Column Minor Block */}
              <div
                style={
                  hasMinorColumn
                    ? {
                        flex: 1,
                        minHeight: 0,
                        display: 'grid',
                        gridTemplateColumns: page.isEven
                          ? '21.5% minmax(0, 1fr)'
                          : 'minmax(0, 1fr) 21.5%',
                        gap: '26px',
                        alignItems: 'stretch',
                        overflow: 'hidden',
                      }
                    : {
                        flex: 1,
                        minHeight: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                      }
                }
              >
                {/* Minor 1-Column Sidebar (Left on Even Pages, Right on Odd Pages) */}
                {hasMinorColumn && (
                  <aside
                    style={{
                      gridColumn: page.isEven ? 1 : 2,
                      gridRow: 1,
                      minWidth: 0,
                      paddingTop: openerHeading ? '14px' : '0px',
                      fontSize: '9.9px',
                      lineHeight: 1.4,
                      color: '#231e19',
                      overflow: 'hidden',
                      textAlign: 'left',
                    }}
                  >
                    {renderNodes(page.asideNodes, themeId, images, true)}
                  </aside>
                )}

                {/* Main Central 2-Column Block (with optional Chapter Opener header above 2 columns) */}
                <div
                  style={{
                    gridColumn: hasMinorColumn ? (page.isEven ? 2 : 1) : undefined,
                    gridRow: hasMinorColumn ? 1 : undefined,
                    width: '100%',
                    height: '100%',
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                >
                  {openerHeading && (
                    <div style={{ flexShrink: 0, marginBottom: '6px' }}>
                      <h1
                        style={{
                          fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
                          fontSize:
                            openerHeading.text.length > 36
                              ? '33px'
                              : openerHeading.text.length > 26
                                ? '40px'
                                : '48px',
                          fontWeight: 700,
                          lineHeight: 0.98,
                          letterSpacing: '-0.02em',
                          color: theme.headingColor,
                          margin: '0 0 14px 0',
                        }}
                      >
                        {openerHeading.text}
                      </h1>
                      {openerQuote && (
                        <div
                          style={{
                            margin: '0 18px 12px 22px',
                            fontStyle: 'italic',
                            fontSize: '11.2px',
                            lineHeight: 1.42,
                            color: '#231e19',
                          }}
                        >
                          {openerQuote.lines.map((line, qIdx) => {
                            const isAttribution = /^[-—–]\s*/.test(line.trim());
                            return (
                              <p
                                key={qIdx}
                                style={{
                                  margin: qIdx === openerQuote.lines.length - 1 ? 0 : '0 0 4px 0',
                                  textAlign: isAttribution ? 'right' : 'left',
                                  fontWeight: isAttribution ? 600 : 400,
                                }}
                              >
                                {renderInlineText(line)}
                              </p>
                            );
                          })}
                        </div>
                      )}
                      {showOpenerSigns && (
                        <WitcherSignsDivider color={theme.headingColor} />
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      width: '100%',
                      columnCount: 2,
                      columnGap: '22px',
                      columnFill: 'balance',
                      overflow: 'hidden',
                    }}
                  >
                    {renderNodes(bodyNodes, themeId, images, false)}
                  </div>
                </div>
              </div>

              {/* Bottom Wide Artwork / Full-Span Section */}
              {hasBottomBlock && (
                <div
                  style={{
                    flexShrink: 0,
                    maxHeight: '245px',
                    overflow: 'hidden',
                  }}
                >
                  {renderNodes(page.bottomNodes, themeId, images, false)}
                </div>
              )}
            </div>
          );
        })()
      )}

      {/* Subtle Running Chapter Footer */}
      {chapterFooter.trim().length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: page.isEven ? '42px' : undefined,
            right: !page.isEven ? '42px' : undefined,
            fontSize: '9.5px',
            fontStyle: 'italic',
            color: '#4e453b',
            letterSpacing: '0.01em',
          }}
        >
          {chapterFooter}
        </div>
      )}
    </div>
  );
}
