import type { CSSProperties } from 'react';
import { BUILTIN_ARTWORK_MAP, HOMEBREW_THEMES } from '../data/templates';
import type {
  HomebrewPageFormat,
  HomebrewThemeId,
  ParsedHomebrewPage,
  ProfessionOverviewPageData,
  ProfessionTreePageData,
} from '../types';
import { tokenizeInlineMarkdown } from '../utils/witcherMarkdown';

interface ProfessionPageCommonProps {
  page: ParsedHomebrewPage;
  themeId: HomebrewThemeId;
  pageFormat: HomebrewPageFormat;
  chapterFooter: string;
  dims: { width: number; height: number };
  pageRef?: (el: HTMLDivElement | null) => void;
}

function resolveArt(
  rawSrc: string,
  images: Record<string, string>
): string | null {
  if (BUILTIN_ARTWORK_MAP[rawSrc]) return BUILTIN_ARTWORK_MAP[rawSrc];
  if (rawSrc.startsWith('img:')) return images[rawSrc.slice(4)] ?? null;
  return rawSrc || null;
}

function renderInline(text: string, accentColor?: string) {
  return tokenizeInlineMarkdown(text).map((tok, idx) => {
    switch (tok.type) {
      case 'bold':
        return (
          <strong
            key={idx}
            style={{ fontWeight: 700, color: accentColor || 'inherit' }}
          >
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
          <strong
            key={idx}
            style={{
              fontWeight: 700,
              fontStyle: 'italic',
              color: accentColor || 'inherit',
            }}
          >
            {tok.text}
          </strong>
        );
      case 'code':
        return <code key={idx}>{tok.text}</code>;
      case 'strike':
        return <s key={idx}>{tok.text}</s>;
      default:
        return <span key={idx}>{tok.text}</span>;
    }
  });
}

function renderBookHeaderAndRibbon(
  page: ParsedHomebrewPage,
  themeId: HomebrewThemeId
) {
  const theme = HOMEBREW_THEMES[themeId];
  return (
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
  );
}

function DoubleFramedBox({
  borderColor,
  children,
  style,
}: {
  borderColor: string;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        border: `1.5px solid ${borderColor}`,
        padding: '1.5px',
        backgroundColor: '#f7f4ec',
        breakInside: 'avoid',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          border: `1px solid ${borderColor}`,
          backgroundColor: '#faf8f3',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Official Witcher TRPG Profession Overview Page (Core Rulebook left-spread style, e.g. Mage p.43):
 * - Main Zone: Giant uppercase profession title + underline, 2-column sub-layout with
 *   Portrait + Defining Skill card (Left) & Quote + Lore chronicle + Attribution (Right).
 * - Alternating 1-Col Sidebar (Right on odd pages, Left on even pages): Framed boxes for
 *   Defining Skill, Vigor, Magical Perks, 10 Skills, Starting Gear, and optional Starting Coin.
 */
export function WitcherProfessionOverviewPage({
  page,
  data,
  themeId,
  chapterFooter,
  dims,
  images,
  pageRef,
}: ProfessionPageCommonProps & {
  data: ProfessionOverviewPageData;
  images: Record<string, string>;
}) {
  const theme = HOMEBREW_THEMES[themeId];
  const isFr = (data.lang ?? 'fr') === 'fr';
  const imgSrc = resolveArt(data.image || 'preset:grimoire', images);

  const borderCol = theme.headingColor;
  const tintBg = theme.tableStripe;
  const oddRowBg = '#faf8f3';

  const labels = isFr
    ? {
        definingSkill: 'Compétence exclusive',
        vigor: 'Vigueur',
        magicPerks: data.magicTitle || 'Atouts magiques',
        skills: 'Compétences',
        gear: data.gearTitle || '5 équipements parmi',
        treasure: 'Bourse de départ',
      }
    : {
        definingSkill: 'Defining Skill',
        vigor: 'Vigor',
        magicPerks: data.magicTitle || 'Magical Perks',
        skills: 'Skills',
        gear: data.gearTitle || 'Starting Gear',
        treasure: 'Starting Coin',
      };

  const titleSize =
    data.title.length > 22 ? '30px' : data.title.length > 14 ? '36px' : '42px';

  const sidebarNode = (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontSize: '8.7px',
        lineHeight: 1.25,
        overflow: 'hidden',
      }}
    >
      {/* Defining Skill Name */}
      <DoubleFramedBox borderColor={borderCol}>
        <div
          style={{
            backgroundColor: tintBg,
            textAlign: 'center',
            fontWeight: 700,
            padding: '3px 5px',
            borderBottom: `1px solid ${borderCol}`,
            fontSize: '9.3px',
          }}
        >
          {labels.definingSkill}
        </div>
        <div style={{ textAlign: 'center', padding: '3.5px 6px' }}>
          {data.definingSkillShort || data.definingSkillTitle}
        </div>
      </DoubleFramedBox>

      {/* Vigor Threshold */}
      <DoubleFramedBox borderColor={borderCol}>
        <div
          style={{
            backgroundColor: tintBg,
            textAlign: 'center',
            fontWeight: 700,
            padding: '3px 5px',
            borderBottom: `1px solid ${borderCol}`,
            fontSize: '9.3px',
          }}
        >
          {labels.vigor}
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '3.5px 6px',
            fontVariantNumeric: 'tabular-nums',
            fontWeight: 600,
          }}
        >
          {data.vigor || '0'}
        </div>
      </DoubleFramedBox>

      {/* Magical Perks (Optional) */}
      {data.magicPerks.length > 0 && (
        <DoubleFramedBox borderColor={borderCol}>
          <div
            style={{
              backgroundColor: tintBg,
              textAlign: 'center',
              fontWeight: 700,
              padding: '3px 5px',
              borderBottom: `1px solid ${borderCol}`,
              fontSize: '9.3px',
            }}
          >
            {labels.magicPerks}
          </div>
          <div
            style={{
              textAlign: 'center',
              padding: '4px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {data.magicPerks.map((perk, idx) => (
              <span key={idx}>{perk}</span>
            ))}
          </div>
        </DoubleFramedBox>
      )}

      {/* Profession Skills */}
      {data.skills.length > 0 && (
        <DoubleFramedBox borderColor={borderCol}>
          <div
            style={{
              backgroundColor: tintBg,
              textAlign: 'center',
              fontWeight: 700,
              padding: '3px 5px',
              borderBottom: `1px solid ${borderCol}`,
              fontSize: '9.3px',
            }}
          >
            {labels.skills}
          </div>
          {data.skills.slice(0, 12).map((sk, idx, arr) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '2.5px 5px',
                backgroundColor: idx % 2 === 1 ? tintBg : oddRowBg,
                borderBottom:
                  idx < arr.length - 1 ? `1px solid ${borderCol}` : 'none',
              }}
            >
              {sk}
            </div>
          ))}
        </DoubleFramedBox>
      )}

      {/* Starting Gear */}
      {data.gear.length > 0 && (
        <DoubleFramedBox borderColor={borderCol}>
          <div
            style={{
              backgroundColor: tintBg,
              textAlign: 'center',
              fontWeight: 700,
              padding: '3px 5px',
              borderBottom: `1px solid ${borderCol}`,
              fontSize: '9.3px',
            }}
          >
            {labels.gear}
          </div>
          {data.gear.slice(0, 12).map((item, idx, arr) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                padding: '2.5px 5px',
                backgroundColor: idx % 2 === 1 ? tintBg : oddRowBg,
                borderBottom:
                  idx < arr.length - 1 ? `1px solid ${borderCol}` : 'none',
              }}
            >
              {item}
            </div>
          ))}
        </DoubleFramedBox>
      )}

      {/* Optional Starting Treasure */}
      {data.treasure && (
        <DoubleFramedBox borderColor={borderCol}>
          <div
            style={{
              backgroundColor: tintBg,
              textAlign: 'center',
              fontWeight: 700,
              padding: '3px 5px',
              borderBottom: `1px solid ${borderCol}`,
              fontSize: '9.3px',
            }}
          >
            {labels.treasure}
          </div>
          <div style={{ textAlign: 'center', padding: '3.5px 6px' }}>
            {data.treasure}
          </div>
        </DoubleFramedBox>
      )}
    </aside>
  );

  const mainNode = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        gap: '14px',
      }}
    >
      {/* Giant Uppercase Profession Title with Rule */}
      <h1
        style={{
          fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 0.98,
          letterSpacing: '-0.02em',
          color: theme.headingColor,
          margin: 0,
          paddingBottom: '5px',
          borderBottom: `1.5px solid ${theme.ruleColor}`,
          flexShrink: 0,
        }}
      >
        {data.title}
      </h1>

      {/* 2-Column Inner Layout: Portrait + Defining Skill Box (Left) | Quote + Lore (Right) */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '44% minmax(0, 1fr)',
          gap: '18px',
          alignItems: 'start',
          overflow: 'hidden',
        }}
      >
        {/* Left Sub-column: Tall Portrait + Framed Defining Skill Box */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            minHeight: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: `${Math.round(dims.height * 0.43)}px`,
              backgroundColor: '#1a1b1f',
              border: '1px solid rgba(0,0,0,0.3)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={data.title}
                referrerPolicy="no-referrer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                }}
              />
            )}
          </div>

          {data.definingSkillText && (
            <DoubleFramedBox borderColor={borderCol}>
              <div
                style={{
                  backgroundColor: tintBg,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '10px',
                  padding: '4px 6px',
                  borderBottom: `1px solid ${borderCol}`,
                }}
              >
                {data.definingSkillTitle}
              </div>
              <div
                style={{
                  padding: '7px 9px',
                  fontSize: '9.2px',
                  lineHeight: 1.38,
                  textAlign: 'justify',
                  color: '#1e1915',
                }}
              >
                {renderInline(data.definingSkillText, theme.headingColor)}
              </div>
            </DoubleFramedBox>
          )}
        </div>

        {/* Right Sub-column: Opening Epigraph + Italicized Chronicle Lore */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          {data.quote && (
            <div
              style={{
                fontSize: '10.4px',
                lineHeight: 1.4,
                fontStyle: 'italic',
                fontWeight: 700,
                color: '#1b1612',
              }}
            >
              <p style={{ margin: 0 }}>{renderInline(data.quote)}</p>
              {data.quoteAttribution && (
                <p
                  style={{
                    margin: '4px 0 0 0',
                    textAlign: 'right',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '10px',
                  }}
                >
                  — {data.quoteAttribution}
                </p>
              )}
            </div>
          )}

          {data.lore && (
            <div
              style={{
                fontSize: '10.1px',
                lineHeight: 1.42,
                fontStyle: 'italic',
                textAlign: 'justify',
                color: '#1e1915',
              }}
            >
              {data.lore
                .split('\n\n')
                .filter(Boolean)
                .map((para, idx) => (
                  <p
                    key={idx}
                    style={{
                      margin: idx === 0 ? 0 : '5px 0 0 0',
                      textIndent: idx === 0 ? '1.1em' : '1.1em',
                    }}
                  >
                    {renderInline(para, theme.headingColor)}
                  </p>
                ))}
              {data.loreAttribution && (
                <p
                  style={{
                    margin: '6px 0 0 0',
                    textAlign: 'right',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '10px',
                  }}
                >
                  — {data.loreAttribution}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={pageRef}
      data-brew-page={page.pageNumber}
      style={{
        width: `${dims.width}px`,
        height: `${dims.height}px`,
        backgroundColor: '#efece4',
        backgroundImage:
          'radial-gradient(ellipse at 50% 45%, rgba(255,253,247,0.75) 0%, rgba(230,224,210,0.68) 72%, rgba(212,204,188,0.85) 100%)',
        color: '#1e1915',
        fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
      className="shrink-0 shadow-xl ring-1 ring-black/15"
    >
      {renderBookHeaderAndRibbon(page, themeId)}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '44px 36px 38px 34px',
          display: 'grid',
          gridTemplateColumns: page.isEven
            ? '23.5% minmax(0, 1fr)'
            : 'minmax(0, 1fr) 23.5%',
          gap: '22px',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}
      >
        {page.isEven ? (
          <>
            {sidebarNode}
            {mainNode}
          </>
        ) : (
          <>
            {mainNode}
            {sidebarNode}
          </>
        )}
      </div>

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
          }}
        >
          {chapterFooter}
        </div>
      )}
    </div>
  );
}

const TREE_COLUMN_TINTS = [
  { headerBg: 'rgba(181, 148, 128, 0.22)', bodyBg: 'rgba(214, 194, 180, 0.16)' },
  { headerBg: 'rgba(136, 166, 152, 0.22)', bodyBg: 'rgba(184, 204, 194, 0.16)' },
  { headerBg: 'rgba(164, 134, 164, 0.22)', bodyBg: 'rgba(202, 182, 202, 0.16)' },
] as const;

/**
 * Official Witcher TRPG Profession Skill Tree Page (Core Rulebook right-spread style, e.g. Merchant p.68):
 * - Optional Alternating 1-Col Sidebar: Stacked framed reference sub-tables (e.g. WARRIOR, LOCALITIES).
 * - Main Area: Giant uppercase Skill Tree title + rule, Defining Skill subheading + 2-column prose,
 *   and 3×3 Framed Skill Tree matrix with 3 Branch headers and 9 Talent cells.
 */
export function WitcherProfessionTreePage({
  page,
  data,
  themeId,
  chapterFooter,
  dims,
  pageRef,
}: ProfessionPageCommonProps & {
  data: ProfessionTreePageData;
}) {
  const theme = HOMEBREW_THEMES[themeId];
  const borderCol = theme.headingColor;
  const tintBg = theme.tableStripe;
  const hasSidebar = data.sideTables.length > 0;

  const titleSize =
    data.title.length > 34 ? '25px' : data.title.length > 24 ? '30px' : '34px';

  const sidebarNode = hasSidebar ? (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontSize: '8.4px',
        lineHeight: 1.24,
        overflow: 'hidden',
      }}
    >
      {data.sideTables.map((table, tIdx) => (
        <div key={tIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              textAlign: 'center',
              fontSize: '9.8px',
              fontWeight: 700,
              color: theme.headingColor,
              borderBottom: `1.5px solid ${theme.ruleColor}`,
              paddingBottom: '2px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {table.title}
          </div>

          <DoubleFramedBox borderColor={borderCol}>
            {/* Table Column Headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 44px',
                backgroundColor: tintBg,
                fontWeight: 700,
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              <span style={{ padding: '2.5px 5px', textAlign: 'center' }}>
                {table.headers[0]}
              </span>
              <span
                style={{
                  padding: '2.5px 4px',
                  textAlign: 'center',
                  borderLeft: `1px solid ${borderCol}`,
                }}
              >
                {table.headers[1]}
              </span>
            </div>

            {table.sections.map((section, sIdx) => (
              <div key={sIdx}>
                {section.heading && (
                  <div
                    style={{
                      backgroundColor: tintBg,
                      fontWeight: 700,
                      textAlign: 'center',
                      padding: '2.5px 5px',
                      borderBottom: `1px solid ${borderCol}`,
                      borderTop: sIdx > 0 ? `1px solid ${borderCol}` : 'none',
                    }}
                  >
                    {section.heading}
                  </div>
                )}
                {section.rows.map(([label, val], rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 44px',
                      borderBottom:
                        rIdx < section.rows.length - 1 ||
                        sIdx < table.sections.length - 1
                          ? `1px solid rgba(0,0,0,0.22)`
                          : 'none',
                    }}
                  >
                    <span
                      style={{
                        padding: '2.5px 5px',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        padding: '2.5px 4px',
                        textAlign: 'center',
                        borderLeft: `1px solid ${borderCol}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </DoubleFramedBox>
        </div>
      ))}
    </aside>
  ) : null;

  const mainNode = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        minHeight: 0,
        gap: '10px',
      }}
    >
      {/* Skill Tree Title */}
      <h1
        style={{
          fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
          fontSize: titleSize,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.015em',
          color: theme.headingColor,
          margin: 0,
          paddingBottom: '4px',
          borderBottom: `1.5px solid ${theme.ruleColor}`,
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        {data.title}
      </h1>

      {/* Defining Skill Heading + 2-Column Justified Rules */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'Georgia, "Palatino Linotype", serif',
            fontSize: '11.5px',
            fontWeight: 700,
            color: theme.headingColor,
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          {data.definingSkillTitle}
        </div>
        {data.definingSkillDescription && (
          <div
            style={{
              columnCount: 2,
              columnGap: '18px',
              fontSize: '9.4px',
              lineHeight: 1.36,
              textAlign: 'justify',
              color: '#1e1915',
            }}
          >
            {data.definingSkillDescription
              .split('\n\n')
              .filter(Boolean)
              .map((para, idx) => (
                <p key={idx} style={{ margin: idx === 0 ? 0 : '4px 0 0 0' }}>
                  {renderInline(para, theme.headingColor)}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* 3x3 Framed Skill Tree Matrix */}
      <DoubleFramedBox borderColor={borderCol} style={{ flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Branch Header Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              borderBottom: `1px solid ${borderCol}`,
              flexShrink: 0,
            }}
          >
            {data.branches.map((branchName, colIdx) => (
              <div
                key={colIdx}
                style={{
                  backgroundColor: TREE_COLUMN_TINTS[colIdx].headerBg,
                  borderLeft: colIdx > 0 ? `1px solid ${borderCol}` : 'none',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '9.6px',
                  padding: '3.5px 6px',
                  color: '#1b1612',
                }}
              >
                {branchName}
              </div>
            ))}
          </div>

          {/* 3 Tiers x 3 Branches (rows size naturally to tallest talent in each tier) */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(3, auto)',
            }}
          >
            {[0, 1, 2].map((rowIdx) => (
              <div
                key={rowIdx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  borderTop: rowIdx > 0 ? `1px solid ${borderCol}` : 'none',
                }}
              >
                {[0, 1, 2].map((colIdx) => {
                  const talent = data.talents[rowIdx * 3 + colIdx] ?? {
                    name: '',
                    description: '',
                  };
                  const colTint = TREE_COLUMN_TINTS[colIdx];
                  return (
                    <div
                      key={colIdx}
                      style={{
                        borderLeft: colIdx > 0 ? `1px solid ${borderCol}` : 'none',
                        backgroundColor: colTint.bodyBg,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: colTint.headerBg,
                          borderBottom: `1px solid ${borderCol}`,
                          textAlign: 'center',
                          fontWeight: 700,
                          fontSize: '8.7px',
                          padding: '2.5px 5px',
                          color: '#1b1612',
                          flexShrink: 0,
                        }}
                      >
                        {talent.name || '—'}
                      </div>
                      <div
                        style={{
                          padding: '6px 7px 8px',
                          fontSize: hasSidebar ? '8.35px' : '8.9px',
                          lineHeight: 1.34,
                          textAlign: 'left',
                          color: '#1e1915',
                        }}
                      >
                        {renderInline(talent.description, theme.headingColor)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </DoubleFramedBox>
    </div>
  );

  return (
    <div
      ref={pageRef}
      data-brew-page={page.pageNumber}
      style={{
        width: `${dims.width}px`,
        height: `${dims.height}px`,
        backgroundColor: '#efece4',
        backgroundImage:
          'radial-gradient(ellipse at 50% 45%, rgba(255,253,247,0.75) 0%, rgba(230,224,210,0.68) 72%, rgba(212,204,188,0.85) 100%)',
        color: '#1e1915',
        fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
      className="shrink-0 shadow-xl ring-1 ring-black/15"
    >
      {renderBookHeaderAndRibbon(page, themeId)}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '44px 34px 38px 34px',
          display: 'grid',
          gridTemplateColumns: hasSidebar
            ? page.isEven
              ? '23% minmax(0, 1fr)'
              : 'minmax(0, 1fr) 23%'
            : 'minmax(0, 1fr)',
          gap: hasSidebar ? '20px' : '0px',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}
      >
        {hasSidebar ? (
          page.isEven ? (
            <>
              {sidebarNode}
              {mainNode}
            </>
          ) : (
            <>
              {mainNode}
              {sidebarNode}
            </>
          )
        ) : (
          mainNode
        )}
      </div>

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
          }}
        >
          {chapterFooter}
        </div>
      )}
    </div>
  );
}
