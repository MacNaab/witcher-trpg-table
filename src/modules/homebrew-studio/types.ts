export type ModuleLanguage = 'fr' | 'en';

export type HomebrewThemeId =
  | 'crimson'
  | 'teal'
  | 'charcoal'
  | 'olive'
  | 'ochre';

export type HomebrewPageFormat = 'a4' | 'letter';

export interface HomebrewThemeConfig {
  id: HomebrewThemeId;
  label: { fr: string; en: string };
  bannerBg: string;
  bannerGradient: string;
  ribbonBg: string;
  ribbonShadow: string;
  headingColor: string;
  ruleColor: string;
  calloutBg: string;
  calloutBorder: string;
  tableStripe: string;
  statblockBg: string;
  statblockBorder: string;
}

export interface HomebrewDocument {
  id: string;
  title: string;
  chapterFooter: string;
  theme: HomebrewThemeId;
  pageFormat: HomebrewPageFormat;
  startPageNumber: number;
  markdown: string;
  images: Record<string, string>;
  updatedAt: string;
}

export interface StatblockEntry {
  title: string;
  subtitle?: string;
  stats: Array<{ label: string; value: string }>;
  derived: Array<{ label: string; value: string }>;
  traits: Array<{ label: string; value: string }>;
  bodyLines: string[];
}

export interface CoverPageData {
  overline?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  image?: string;
  creditLeft?: string;
  creditRight?: string;
}

export interface BackCoverFeature {
  title: string;
  description?: string;
}

export interface BackCoverData {
  image?: string;
  paragraphs: string[];
  featuringTitle: string;
  features: BackCoverFeature[];
  creditLeft?: string;
  creditRight?: string;
  editionCode?: string;
}

export interface TocConfig {
  title: string;
  image?: string;
  includeAside?: boolean;
}

export interface TocEntry {
  level: 1 | 2;
  text: string;
  pageNumber: number;
}

export type MarkdownBlockNode =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; alt: string; src: string; fullHeight?: boolean }
  | { type: 'hr' }
  | { type: 'signs' }
  | { type: 'callout'; title?: string; nodes: MarkdownBlockNode[] }
  | { type: 'statblock'; data: StatblockEntry };

export interface BestiaryLeftPageData {
  name: string;
  creatureType: string;
  threat: string;
  intelligence: string;
  senses: string;
  image: string;
  stats: Array<{ label: string; value: string }>;
  derived: Array<{ label: string; value: string }>;
  height: string;
  weight: string;
  environment: string;
  organization: string;
  armor: string;
  regeneration: string;
  resistances: string;
  immunities: string;
  susceptibilities: string;
  dodgeBase: string;
  repositionBase: string;
  blockBase: string;
  bounty: string;
  skills: Array<{ name: string; value: string }>;
  loot: string[];
  superstitionTitle: string;
  superstition: string;
  lang?: ModuleLanguage;
}

export interface BestiaryAttackRow {
  name: string;
  atkBase: string;
  type: string;
  dmg: string;
  rel: string;
  rng: string;
  effect: string;
  rof: string;
}

export interface BestiaryAbilityCard {
  title: string;
  description: string;
}

export interface BestiaryRightPageData {
  knowledgeTitle: string;
  knowledge: string;
  attacksTitle: string;
  attacks: BestiaryAttackRow[];
  abilities: BestiaryAbilityCard[];
  lang?: ModuleLanguage;
}

export interface CharacterSheetPageData {
  name: string;
  subtitle?: string;
  image: string;
  stats: Array<{ label: string; value: string }>;
  derived: Array<{ label: string; value: string }>;
  skills: Array<{ name: string; value: string }>;
  keySkills: Array<{ name: string; value: string }>;
  magicTitle?: string;
  magic: string[];
  gear: string[];
  quote: string;
  attribution?: string;
  lang?: ModuleLanguage;
}

export interface ProfessionOverviewPageData {
  title: string;
  image: string;
  definingSkillTitle: string;
  definingSkillShort: string;
  definingSkillText: string;
  quote: string;
  quoteAttribution?: string;
  lore: string;
  loreAttribution?: string;
  vigor: string;
  magicTitle?: string;
  magicPerks: string[];
  skills: string[];
  gearTitle?: string;
  gear: string[];
  treasure?: string;
  lang?: ModuleLanguage;
}

export interface ProfessionTreeSideSubTable {
  title: string;
  headers: [string, string];
  sections: Array<{
    heading?: string;
    rows: Array<[string, string]>;
  }>;
}

export interface ProfessionTreeTalentNode {
  name: string;
  description: string;
}

export interface ProfessionTreePageData {
  title: string;
  definingSkillTitle: string;
  definingSkillDescription: string;
  branches: [string, string, string];
  /** Ordered row-major: [b1_t1, b2_t1, b3_t1, b1_t2, b2_t2, b3_t2, b1_t3, b2_t3, b3_t3] */
  talents: ProfessionTreeTalentNode[];
  sideTables: ProfessionTreeSideSubTable[];
  lang?: ModuleLanguage;
}

export interface ParsedHomebrewPage {
  pageIndex: number;
  pageNumber: number;
  isEven: boolean;
  isCover: boolean;
  isBackCover: boolean;
  isArtPage: boolean;
  isChapterOpener: boolean;
  coverData?: CoverPageData;
  backCoverData?: BackCoverData;
  artPageData?: { image: string; caption?: string };
  bestiaryLeftData?: BestiaryLeftPageData;
  bestiaryRightData?: BestiaryRightPageData;
  characterSheetData?: CharacterSheetPageData;
  professionOverviewData?: ProfessionOverviewPageData;
  professionTreeData?: ProfessionTreePageData;
  tocConfig?: TocConfig;
  tocEntries: TocEntry[];
  bannerNodes: MarkdownBlockNode[];
  mainNodes: MarkdownBlockNode[];
  asideNodes: MarkdownBlockNode[];
  bottomNodes: MarkdownBlockNode[];
}
