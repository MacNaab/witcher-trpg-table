import type { CSSProperties } from 'react';
import { getMonsterCategoryEmblemUrl } from '@/src/data/bestiary/categoryEmblems';
import { BUILTIN_ARTWORK_MAP, HOMEBREW_THEMES } from '../data/templates';
import type {
  BestiaryLeftPageData,
  BestiaryRightPageData,
  HomebrewPageFormat,
  HomebrewThemeId,
  ParsedHomebrewPage,
} from '../types';
import { tokenizeInlineMarkdown } from '../utils/witcherMarkdown';

interface BestiaryPageCommonProps {
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

/**
 * Hexagonal Witcher Bestiary creature category emblem rendered inside the hanging left banner
 * using the dedicated PNG category illustrations.
 */
function CreatureTypeHexEmblem({ creatureType }: { creatureType: string }) {
  const emblemSrc = getMonsterCategoryEmblemUrl(creatureType);

  return (
    <img
      src={emblemSrc}
      alt={creatureType}
      style={{
        width: '66px',
        height: '66px',
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35))',
      }}
    />
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
 * Official Witcher TRPG Bestiary Left Page (Page 34 style):
 * Left 1-col boxed stats sidebar + Artwork with hanging ribbon & physical table + Monster H1 + Superstition lore.
 */
export function WitcherBestiaryLeftPage({
  page,
  data,
  themeId,
  chapterFooter,
  dims,
  images,
  pageRef,
}: BestiaryPageCommonProps & {
  data: BestiaryLeftPageData;
  images: Record<string, string>;
}) {
  const theme = HOMEBREW_THEMES[themeId];
  const isFr = (data.lang ?? 'fr') === 'fr';
  const imgSrc = resolveArt(data.image || 'preset:grimoire', images);

  const labels = isFr
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

  const tintBg = theme.tableStripe;
  const borderCol = theme.headingColor;

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
          padding: '44px 36px 36px 34px',
          display: 'grid',
          gridTemplateColumns: '23.5% minmax(0, 1fr)',
          gap: '22px',
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Sidebar: Stacked Official Framed Bestiary Stat Tables */}
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            fontSize: '8.8px',
            lineHeight: 1.28,
            overflow: 'hidden',
          }}
        >
          {/* Skill Base Table */}
          {data.skills.length > 0 && (
            <DoubleFramedBox borderColor={borderCol}>
              <div
                style={{
                  backgroundColor: tintBg,
                  textAlign: 'center',
                  fontWeight: 700,
                  padding: '2.5px 4px',
                  borderBottom: `1px solid ${borderCol}`,
                  fontSize: '9.5px',
                }}
              >
                {labels.skillBase}
              </div>
              {data.skills.slice(0, 13).map((sk, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 28px',
                    borderBottom:
                      idx < Math.min(13, data.skills.length) - 1
                        ? `1px solid rgba(0,0,0,0.18)`
                        : 'none',
                  }}
                >
                  <span style={{ padding: '2px 5px', textAlign: 'center' }}>
                    {sk.name}
                  </span>
                  <span
                    style={{
                      padding: '2px 4px',
                      textAlign: 'center',
                      borderLeft: `1px solid ${borderCol}`,
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {sk.value}
                  </span>
                </div>
              ))}
            </DoubleFramedBox>
          )}

          {/* Armor & Regeneration */}
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 44px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              <span
                style={{
                  backgroundColor: tintBg,
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '2.5px 4px',
                }}
              >
                {labels.armor}
              </span>
              <span
                style={{
                  textAlign: 'center',
                  padding: '2.5px 4px',
                  borderLeft: `1px solid ${borderCol}`,
                }}
              >
                {data.armor}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px' }}>
              <span
                style={{
                  backgroundColor: tintBg,
                  fontWeight: 700,
                  textAlign: 'center',
                  padding: '2.5px 4px',
                }}
              >
                {labels.regen}
              </span>
              <span
                style={{
                  textAlign: 'center',
                  padding: '2.5px 4px',
                  borderLeft: `1px solid ${borderCol}`,
                }}
              >
                {data.regeneration}
              </span>
            </div>
          </DoubleFramedBox>

          {/* Resistances & Immunities */}
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                backgroundColor: tintBg,
                fontWeight: 700,
                textAlign: 'center',
                padding: '2.5px 4px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {labels.resistances}
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '3px 5px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {data.resistances}
            </div>
            <div
              style={{
                backgroundColor: tintBg,
                fontWeight: 700,
                textAlign: 'center',
                padding: '2.5px 4px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {labels.immunities}
            </div>
            <div style={{ textAlign: 'center', padding: '3px 5px' }}>
              {data.immunities}
            </div>
          </DoubleFramedBox>

          {/* Susceptibilities */}
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                backgroundColor: tintBg,
                fontWeight: 700,
                textAlign: 'center',
                padding: '2.5px 4px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {labels.susceptibilities}
            </div>
            <div style={{ textAlign: 'center', padding: '3.5px 6px' }}>
              {data.susceptibilities}
            </div>
          </DoubleFramedBox>

          {/* Dodge / Reposition / Block Bases */}
          <DoubleFramedBox borderColor={borderCol}>
            {[
              [labels.dodge, data.dodgeBase],
              [labels.reposition, data.repositionBase],
              [labels.block, data.blockBase],
            ].map(([k, v], idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 34px',
                  borderBottom: idx < 2 ? `1px solid ${borderCol}` : 'none',
                }}
              >
                <span
                  style={{
                    backgroundColor: tintBg,
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '2.5px 4px',
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    textAlign: 'center',
                    padding: '2.5px 4px',
                    borderLeft: `1px solid ${borderCol}`,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </DoubleFramedBox>

          {/* Bounty */}
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                backgroundColor: tintBg,
                fontWeight: 700,
                textAlign: 'center',
                padding: '2.5px 4px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {labels.bounty}
            </div>
            <div style={{ textAlign: 'center', padding: '3px 5px' }}>
              {data.bounty}
            </div>
          </DoubleFramedBox>

          {/* Loot */}
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                backgroundColor: tintBg,
                fontWeight: 700,
                textAlign: 'center',
                padding: '2.5px 4px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {labels.loot}
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '3.5px 5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5px',
              }}
            >
              {data.loot.length > 0 ? (
                data.loot.map((item, lIdx) => <span key={lIdx}>{item}</span>)
              ) : (
                <span>—</span>
              )}
            </div>
          </DoubleFramedBox>
        </aside>

        {/* Right 2-Col Area: Artwork + Hanging Banner + Monster Heading + Superstition */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            minHeight: 0,
            position: 'relative',
          }}
        >
          {/* Top Illustration Frame with Hanging Ribbon & Physical Info Overlay */}
          <div
            style={{
              position: 'relative',
              height: `${Math.round(dims.height * 0.56)}px`,
              flexShrink: 0,
              marginBottom: '26px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1a1b1f',
                border: '1px solid rgba(0,0,0,0.3)',
                overflow: 'hidden',
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
                    objectPosition: 'center 25%',
                    display: 'block',
                  }}
                />
              )}
            </div>

            {/* Hanging Swallowtail Stats Ribbon Banner */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '16px',
                width: '92px',
                bottom: '-34px',
                background: theme.bannerGradient,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%)',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.48))',
                padding: '8px 8px 34px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                color: '#f7f4ec',
                zIndex: 4,
              }}
            >
              <CreatureTypeHexEmblem creatureType={data.creatureType} />

              <div
                style={{
                  fontSize: '9.2px',
                  fontWeight: 700,
                  textAlign: 'center',
                  lineHeight: 1.15,
                  borderBottom: '1px solid rgba(255,255,255,0.45)',
                  paddingBottom: '4px',
                  width: '100%',
                }}
              >
                {data.threat}
              </div>

              <div style={{ textAlign: 'center', fontSize: '8.2px', lineHeight: 1.18 }}>
                <div style={{ textDecoration: 'underline', fontWeight: 700 }}>
                  {labels.intelligence}
                </div>
                <div style={{ fontStyle: 'italic' }}>{data.intelligence}</div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '8.2px', lineHeight: 1.18 }}>
                <div style={{ textDecoration: 'underline', fontWeight: 700 }}>
                  {labels.senses}
                </div>
                <div style={{ fontStyle: 'italic' }}>{data.senses}</div>
              </div>

              {/* 8 Primary Stats */}
              {data.stats.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5px',
                    marginTop: '2px',
                  }}
                >
                  {data.stats.slice(0, 8).map((st, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 22px',
                        backgroundColor: '#f8f5ee',
                        color: '#1b1612',
                        border: '1px solid rgba(0,0,0,0.35)',
                        fontSize: '8px',
                        lineHeight: 1.32,
                      }}
                    >
                      <span
                        style={{
                          textAlign: 'center',
                          fontWeight: 700,
                          borderRight: '1px solid rgba(0,0,0,0.28)',
                        }}
                      >
                        {st.label}
                      </span>
                      <span
                        style={{
                          textAlign: 'center',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* 7 Derived Stats */}
              {data.derived.length > 0 && (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5px',
                    marginTop: '4px',
                  }}
                >
                  {data.derived.slice(0, 7).map((dv, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 24px',
                        backgroundColor: '#f8f5ee',
                        color: '#1b1612',
                        border: '1px solid rgba(0,0,0,0.35)',
                        fontSize: '8px',
                        lineHeight: 1.32,
                      }}
                    >
                      <span
                        style={{
                          textAlign: 'center',
                          fontWeight: 700,
                          borderRight: '1px solid rgba(0,0,0,0.28)',
                        }}
                      >
                        {dv.label}
                      </span>
                      <span
                        style={{
                          textAlign: 'center',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {dv.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom-Right Physical Profile Table */}
            <div
              style={{
                position: 'absolute',
                right: '10px',
                bottom: '10px',
                width: '215px',
                zIndex: 4,
                fontSize: '8.5px',
                lineHeight: 1.25,
                boxShadow: '0 3px 8px rgba(0,0,0,0.45)',
              }}
            >
              <DoubleFramedBox borderColor={borderCol}>
                {[
                  [labels.height, data.height],
                  [labels.weight, data.weight],
                  [labels.env, data.environment],
                  [labels.org, data.organization],
                ].map(([k, v], idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '78px 1fr',
                      borderBottom: idx < 3 ? `1px solid ${borderCol}` : 'none',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: tintBg,
                        fontWeight: 700,
                        textAlign: 'center',
                        padding: '3px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{
                        padding: '3px 6px',
                        textAlign: 'center',
                        borderLeft: `1px solid ${borderCol}`,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </DoubleFramedBox>
            </div>
          </div>

          {/* Monster Title + Commoner Superstition Lore */}
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <h1
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", "Book Antiqua", serif',
                fontSize: data.name.length > 22 ? '34px' : '42px',
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
                color: theme.headingColor,
                margin: '0 0 6px 0',
              }}
            >
              {data.name}
            </h1>
            <h2
              style={{
                fontFamily: 'Georgia, "Palatino Linotype", serif',
                fontSize: '14.5px',
                fontWeight: 700,
                color: theme.headingColor,
                borderBottom: `1.5px solid ${theme.ruleColor}`,
                paddingBottom: '2px',
                margin: '0 0 8px 0',
              }}
            >
              {data.superstitionTitle}
            </h2>
            <div
              style={{
                fontSize: '10.2px',
                lineHeight: 1.4,
                fontStyle: 'italic',
                textAlign: 'justify',
                color: '#1e1915',
              }}
            >
              {renderInline(data.superstition)}
            </div>
          </div>
        </div>
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

/**
 * Official Witcher TRPG Bestiary Right Page (Page 35 style):
 * Witcher Knowledge prose + Full-width Framed Attacks Table + 2-column Grid of Framed Ability Cards.
 */
export function WitcherBestiaryRightPage({
  page,
  data,
  themeId,
  chapterFooter,
  dims,
  pageRef,
}: BestiaryPageCommonProps & {
  data: BestiaryRightPageData;
}) {
  const theme = HOMEBREW_THEMES[themeId];
  const isFr = (data.lang ?? 'fr') === 'fr';
  const borderCol = theme.headingColor;
  const tintBg = theme.tableStripe;

  const colHeaders = isFr
    ? ['Nom', 'Base', 'Type', 'Dégâts', 'Fiab.', 'Portée', 'Effet', 'CAD']
    : ['Name', 'ATK Base', 'Type', 'DMG', 'Rel.', 'RNG', 'Effect', 'ROF'];

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
          padding: '48px 42px 42px 42px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxSizing: 'border-box',
        }}
      >
        {/* Witcher Knowledge Section */}
        <div>
          <h2
            style={{
              fontFamily: 'Georgia, "Palatino Linotype", serif',
              fontSize: '16.5px',
              fontWeight: 700,
              color: theme.headingColor,
              borderBottom: `1.5px solid ${theme.ruleColor}`,
              paddingBottom: '3px',
              margin: '0 0 8px 0',
            }}
          >
            {data.knowledgeTitle}
          </h2>
          {data.knowledge.split('\n\n').map((para, idx) => (
            <p
              key={idx}
              style={{
                margin: idx === 0 ? 0 : '6px 0 0 0',
                fontSize: '10.6px',
                lineHeight: 1.44,
                textAlign: 'justify',
              }}
            >
              {renderInline(para)}
            </p>
          ))}
        </div>

        {/* Full-Width Official Attacks Table */}
        {data.attacks.length > 0 && (
          <DoubleFramedBox borderColor={borderCol}>
            <div
              style={{
                backgroundColor: tintBg,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: '11.5px',
                padding: '4px 8px',
                borderBottom: `1px solid ${borderCol}`,
              }}
            >
              {data.attacksTitle}
            </div>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '9.8px',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: tintBg,
                    borderBottom: `1px solid ${borderCol}`,
                  }}
                >
                  {colHeaders.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      style={{
                        padding: '4px 5px',
                        textAlign: 'center',
                        fontWeight: 700,
                        borderLeft: hIdx > 0 ? `1px solid ${borderCol}` : 'none',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.attacks.map((atk, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      borderTop: rIdx > 0 ? `1px solid rgba(0,0,0,0.15)` : 'none',
                    }}
                  >
                    {[
                      atk.name,
                      atk.atkBase,
                      atk.type,
                      atk.dmg,
                      atk.rel,
                      atk.rng,
                      atk.effect,
                      atk.rof,
                    ].map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        style={{
                          padding: '5px 5px',
                          textAlign: 'center',
                          borderLeft:
                            cIdx > 0 ? `1px solid ${borderCol}` : 'none',
                          fontWeight: cIdx === 0 ? 600 : 400,
                        }}
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </DoubleFramedBox>
        )}

        {/* 2-Column Grid of Framed Ability Cards */}
        {data.abilities.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '16px 20px',
              alignItems: 'start',
            }}
          >
            {data.abilities.map((ab, idx) => (
              <DoubleFramedBox key={idx} borderColor={borderCol}>
                <div
                  style={{
                    backgroundColor: tintBg,
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '10.6px',
                    padding: '4px 8px',
                    borderBottom: `1px solid ${borderCol}`,
                  }}
                >
                  {isFr ? `Capacité : ${ab.title}` : `Ability: ${ab.title}`}
                </div>
                <div
                  style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    fontSize: '9.8px',
                    lineHeight: 1.4,
                    color: '#1e1915',
                  }}
                >
                  {renderInline(ab.description)}
                </div>
              </DoubleFramedBox>
            ))}
          </div>
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
