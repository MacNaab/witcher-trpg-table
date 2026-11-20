import type { CSSProperties } from 'react';
import { BUILTIN_ARTWORK_MAP, HOMEBREW_THEMES } from '../data/templates';
import type {
  CharacterSheetPageData,
  HomebrewPageFormat,
  HomebrewThemeId,
  ParsedHomebrewPage,
} from '../types';
import { tokenizeInlineMarkdown } from '../utils/witcherMarkdown';

interface WitcherCharacterSheetPageProps {
  page: ParsedHomebrewPage;
  data: CharacterSheetPageData;
  themeId: HomebrewThemeId;
  pageFormat: HomebrewPageFormat;
  chapterFooter: string;
  dims: { width: number; height: number };
  images: Record<string, string>;
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

function renderInline(text: string) {
  return tokenizeInlineMarkdown(text).map((tok, idx) => {
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
        return <code key={idx}>{tok.text}</code>;
      case 'strike':
        return <s key={idx}>{tok.text}</s>;
      default:
        return <span key={idx}>{tok.text}</span>;
    }
  });
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
        ...style,
      }}
    >
      <div
        style={{
          border: `1px solid ${borderColor}`,
          backgroundColor: '#faf8f3',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Official 1-Page Witcher TRPG PC / NPC Character Sheet (Geralt of Rivia p.12 style):
 * - Left sidebar: Side-by-side Primary Stats & Derived Stats mini-tables + striped Skills & Key Skills boxes.
 * - Right canvas: Display serif Character Name + crisp underline rule; Portrait + Magic/Combat box beside
 *   italicized biography & right-aligned attribution; Full-width 4-column striped Gear table at bottom.
 */
export function WitcherCharacterSheetPage({
  page,
  data,
  themeId,
  chapterFooter,
  dims,
  images,
  pageRef,
}: WitcherCharacterSheetPageProps) {
  const theme = HOMEBREW_THEMES[themeId];
  const isFr = (data.lang ?? 'fr') === 'fr';
  const imgSrc = resolveArt(data.image || 'preset:grimoire', images);

  const borderCol = theme.headingColor;
  const tintBg = theme.tableStripe;
  const oddRowBg = '#faf8f3';

  const skillsHeading = isFr ? 'Compétences' : 'Skills';
  const keySkillsHeading = isFr ? 'Compétences Clés' : 'Key Skills';
  const magicHeading = data.magicTitle || (isFr ? 'Magie' : 'Magic');
  const gearHeading = isFr ? 'Équipement' : 'Gear';

  // Pad gear items into 4-column rows cleanly while capping at 24 items (6 rows) to stay within A4/Letter bounds
  const visibleGear = data.gear.slice(0, 24);
  const gearRows: string[][] = [];
  for (let i = 0; i < visibleGear.length; i += 4) {
    const row = visibleGear.slice(i, i + 4);
    while (row.length < 4) row.push('');
    gearRows.push(row);
  }
  if (gearRows.length === 0) {
    gearRows.push(['—', '', '', '']);
  }

  const nameFontSize =
    data.name.length > 26 ? '31px' : data.name.length > 18 ? '37px' : '43px';

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
      {/* Top Painted Header Banner & Swallowtail Page Ribbon */}
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

      {/* Main 2-Zone Official Character Sheet Grid */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          padding: '44px 36px 38px 32px',
          display: 'grid',
          gridTemplateColumns: '24.5% minmax(0, 1fr)',
          gap: '22px',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT COLUMN: Stats/Derived Mini-Tables + Striped Skills + Striped Key Skills */}
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '8.6px',
            lineHeight: 1.25,
            overflow: 'hidden',
          }}
        >
          {/* Side-by-side Primary Stats & Derived Stats */}
          {(data.stats.length > 0 || data.derived.length > 0) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px',
                alignItems: 'start',
              }}
            >
              <DoubleFramedBox borderColor={borderCol}>
                {data.stats.slice(0, 9).map((st, idx, arr) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px',
                      borderBottom:
                        idx < arr.length - 1
                          ? `1px solid ${borderCol}`
                          : 'none',
                    }}
                  >
                    <span
                      style={{
                        padding: '2px 2px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '8.2px',
                      }}
                    >
                      {st.label}
                    </span>
                    <span
                      style={{
                        padding: '2px 2px',
                        textAlign: 'center',
                        borderLeft: `1px solid ${borderCol}`,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {st.value}
                    </span>
                  </div>
                ))}
              </DoubleFramedBox>

              <DoubleFramedBox borderColor={borderCol}>
                {data.derived.slice(0, 8).map((dv, idx, arr) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 24px',
                      borderBottom:
                        idx < arr.length - 1
                          ? `1px solid ${borderCol}`
                          : 'none',
                    }}
                  >
                    <span
                      style={{
                        padding: '2px 2px',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '8px',
                      }}
                    >
                      {dv.label}
                    </span>
                    <span
                      style={{
                        padding: '2px 2px',
                        textAlign: 'center',
                        borderLeft: `1px solid ${borderCol}`,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {dv.value}
                    </span>
                  </div>
                ))}
              </DoubleFramedBox>
            </div>
          )}

          {/* Striped Skills Box */}
          {data.skills.length > 0 && (
            <DoubleFramedBox borderColor={borderCol}>
              <div
                style={{
                  backgroundColor: tintBg,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '3.5px 6px',
                  borderBottom: `1px solid ${borderCol}`,
                }}
              >
                {skillsHeading}
              </div>
              {data.skills.slice(0, 20).map((sk, idx, arr) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 26px',
                    backgroundColor: idx % 2 === 1 ? tintBg : oddRowBg,
                    borderBottom:
                      idx < arr.length - 1 ? `1px solid ${borderCol}` : 'none',
                  }}
                >
                  <span
                    style={{
                      padding: '2.2px 5px',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {sk.name}
                  </span>
                  <span
                    style={{
                      padding: '2.2px 4px',
                      textAlign: 'center',
                      borderLeft: `1px solid ${borderCol}`,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {sk.value}
                  </span>
                </div>
              ))}
            </DoubleFramedBox>
          )}

          {/* Striped Key Skills Box */}
          {data.keySkills.length > 0 && (
            <DoubleFramedBox borderColor={borderCol}>
              <div
                style={{
                  backgroundColor: tintBg,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '3.5px 6px',
                  borderBottom: `1px solid ${borderCol}`,
                }}
              >
                {keySkillsHeading}
              </div>
              {data.keySkills.slice(0, 10).map((ks, idx, arr) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 26px',
                    backgroundColor: idx % 2 === 1 ? tintBg : oddRowBg,
                    borderBottom:
                      idx < arr.length - 1 ? `1px solid ${borderCol}` : 'none',
                  }}
                >
                  <span
                    style={{
                      padding: '2.2px 5px',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ks.name}
                  </span>
                  <span
                    style={{
                      padding: '2.2px 4px',
                      textAlign: 'center',
                      borderLeft: `1px solid ${borderCol}`,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {ks.value}
                  </span>
                </div>
              ))}
            </DoubleFramedBox>
          )}
        </aside>

        {/* RIGHT CANVAS: Character Name + Rule, Portrait & Magic + Lore Quote, Full-Width 4-Col Gear */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: 0,
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Giant Serif Display Name with Official Theme Underline */}
          <div>
            <h1
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
                fontSize: nameFontSize,
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
                color: theme.headingColor,
                margin: 0,
                paddingBottom: '5px',
                borderBottom: `1.5px solid ${theme.ruleColor}`,
              }}
            >
              {data.name}
            </h1>
            {data.subtitle && (
              <div
                style={{
                  marginTop: '3px',
                  fontSize: '9.5px',
                  fontStyle: 'italic',
                  color: '#52473c',
                }}
              >
                {data.subtitle}
              </div>
            )}
          </div>

          {/* Middle 2-Col Area: Left (Portrait + Magic/Combat Box) | Right (Italic Bio + Attribution) */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: '46% minmax(0, 1fr)',
              gap: '18px',
              alignItems: 'start',
              overflow: 'hidden',
            }}
          >
            {/* Left Sub-column: Portrait Image + Magic / Combat Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `${Math.round(dims.height * 0.34)}px`,
                  backgroundColor: '#1a1b1f',
                  border: '1px solid rgba(0,0,0,0.28)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={data.name}
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

              {data.magic.length > 0 && (
                <DoubleFramedBox borderColor={borderCol}>
                  <div
                    style={{
                      backgroundColor: tintBg,
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '12.5px',
                      padding: '4px 6px',
                      borderBottom: `1px solid ${borderCol}`,
                    }}
                  >
                    {magicHeading}
                  </div>
                  {data.magic.slice(0, 11).map((item, idx, arr) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 1 ? tintBg : oddRowBg,
                        textAlign: 'center',
                        fontSize: '8.7px',
                        lineHeight: 1.28,
                        padding: '2.5px 6px',
                        borderBottom:
                          idx < arr.length - 1
                            ? `1px solid ${borderCol}`
                            : 'none',
                      }}
                    >
                      {renderInline(item)}
                    </div>
                  ))}
                </DoubleFramedBox>
              )}
            </div>

            {/* Right Sub-column: Italicized Narrative Quote & Right-Aligned Attribution */}
            <div
              style={{
                fontSize: '10.1px',
                lineHeight: 1.38,
                fontStyle: 'italic',
                color: '#1e1915',
                textAlign: 'justify',
                overflow: 'hidden',
              }}
            >
              {data.quote
                .split('\n\n')
                .filter(Boolean)
                .map((para, idx) => (
                  <p key={idx} style={{ margin: idx === 0 ? 0 : '6px 0 0 0' }}>
                    {renderInline(para)}
                  </p>
                ))}
              {data.attribution && (
                <p
                  style={{
                    margin: '6px 0 0 0',
                    textAlign: 'right',
                    fontStyle: 'italic',
                    fontWeight: 600,
                  }}
                >
                  –{data.attribution}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Full-Width 4-Column Striped Gear Table */}
          <div style={{ flexShrink: 0 }}>
            <DoubleFramedBox borderColor={borderCol}>
              <div
                style={{
                  backgroundColor: tintBg,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                  padding: '4px 8px',
                  borderBottom: `1px solid ${borderCol}`,
                }}
              >
                {gearHeading}
              </div>
              {gearRows.map((row, rIdx) => (
                <div
                  key={rIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                    backgroundColor: rIdx % 2 === 1 ? tintBg : oddRowBg,
                    borderBottom:
                      rIdx < gearRows.length - 1
                        ? `1px solid ${borderCol}`
                        : 'none',
                  }}
                >
                  {row.map((cell, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        padding: '3px 4px',
                        textAlign: 'center',
                        fontSize: '8.3px',
                        lineHeight: 1.24,
                        borderLeft:
                          cIdx > 0 ? `1px solid ${borderCol}` : 'none',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={cell}
                    >
                      {cell || '\u00A0'}
                    </span>
                  ))}
                </div>
              ))}
            </DoubleFramedBox>
          </div>
        </div>
      </div>

      {/* Running Chapter Footer */}
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
