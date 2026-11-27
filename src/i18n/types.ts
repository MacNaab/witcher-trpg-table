import type { ModuleGroupId, ModuleId } from '@/src/types/navigation';

/**
 * Supported UI locales.
 * Extend this union and register the matching dictionary in `src/i18n/index.ts`
 * to support additional languages (e.g., 'pl', 'de', 'es').
 */
export type Locale = 'fr' | 'en';

export interface LocaleMeta {
  code: Locale;
  label: string;
  nativeLabel: string;
}

export interface ModuleTranslation {
  title: string;
  shortTitle: string;
  metaLabel: string;
  description: string;
  plannedScope: string[];
}

/**
 * Complete translation schema enforced across all locales at compile time.
 */
export interface TranslationDictionary {
  app: {
    brand: string;
    subtitle: string;
    editionLabel: string;
    issuesUrl: string;
    issuesShortLabel: string;
    issuesNotice: string;
    issuesDescription: string;
    issuesCta: string;
  };
  nav: {
    overview: string;
    groups: Record<ModuleGroupId, string>;
    allCategories: string;
    openCommandPalette: string;
    searchPlaceholder: string;
    noResults: string;
    quickActions: string;
    modulesGroup: string;
    shortcutsGroup: string;
    bestiaryGroup: string;
    codexGroup: string;
    compendiumGroup: string;
    campaignGroup: string;
    backupAction: string;
    diceAction: string;
    notesAction: string;
    collapseSidebar: string;
  };
  controls: {
    language: string;
    theme: string;
    themeDark: string;
    themeLight: string;
    themeSwitched: string;
    languageSwitched: string;
    backToOverview: string;
    openModule: string;
    moduleSpecs: string;
    close: string;
    readyState: string;
    pendingState: string;
  };
  overview: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    heroCta: string;
    heroSecondary: string;
    directoryTitle: string;
    directorySubtitle: string;
    moduleCountLabel: string;
    resume: {
      title: string;
      subtitle: string;
      combatActive: string;
      combatPaused: string;
      combatCompleted: string;
      combatRound: (round: number) => string;
      combatResumeBtn: string;
      hubTitle: string;
      hubMeta: (pcs: number, groups: number, custom: number) => string;
      hubOpenBtn: string;
      urbanTitle: string;
      urbanMeta: (count: number) => string;
      urbanOpenBtn: string;
      chargenTitle: string;
      chargenUntitled: string;
      chargenOpenBtn: string;
      chronicleTitle: string;
      chronicleMeta: (events: number, campaigns: number) => string;
      chronicleOpenBtn: string;
    };
  };
  dice: {
    buttonLabel: string;
    title: string;
    description: string;
    witcherSectionTitle: string;
    modifierLabel: string;
    dcLabel: string;
    dcOptionalPlaceholder: string;
    rollWitcherBtn: string;
    critSuccessBadge: string;
    critFailBadge: string;
    fumbleLabel: (severity: number) => string;
    successBadge: string;
    failBadge: string;
    quickDiceTitle: string;
    customFormulaLabel: string;
    customFormulaPlaceholder: string;
    rollFormulaBtn: string;
    invalidFormulaError: string;
    historyTitle: string;
    clearHistoryBtn: string;
    emptyHistory: string;
  };
  notes: {
    buttonLabel: string;
    title: string;
    description: string;
    sessionTitleLabel: string;
    sessionTitlePlaceholder: string;
    contentLabel: string;
    contentPlaceholder: string;
    insertTimestampBtn: string;
    copyBtn: string;
    copiedToast: string;
    clearBtn: string;
    clearConfirmBtn: string;
    cancelClearBtn: string;
    savedHint: string;
    charsCount: (count: number) => string;
  };
  compendium: {
    weaponKind: string;
    armorKind: string;
    shieldKind: string;
    alchemyKind: string;
    gearKind: string;
    relicKind: string;
    experimentalKind: string;
    runeGlyphKind: string;
    magicItemKind: string;
    trophyKind: string;
    mutagenKind: string;
    categoryLabel: string;
    availabilityLabel: string;
    priceLabel: string;
    weightLabel: string;
    damageLabel: string;
    accuracyLabel: string;
    reliabilityLabel: string;
    handsLabel: string;
    rangeLabel: string;
    concealmentLabel: string;
    enhancementsLabel: string;
    spLabel: string;
    evLabel: string;
    durationLabel: string;
    toxicityLabel: string;
    dcLabel: string;
    slotsLabel: string;
    targetLabel: string;
    craftTimeLabel: string;
    componentsLabel: string;
    colorLabel: string;
    monsterCategoryLabel: string;
    alchemyDcLabel: string;
    mutationLabel: string;
    effectLabel: string;
    sourceLabel: string;
    copyBtn: string;
    copiedToast: string;
    closeBtn: string;
  };
  placeholder: {
    statusLabel: string;
    titleSuffix: string;
    description: string;
    plannedScopeHeading: string;
    architectureNoteTitle: string;
    architectureNoteBody: string;
    specsDialogTitle: string;
    specsDialogDescription: string;
    modulePathLabel: string;
    groupLabel: string;
    shortcutLabel: string;
  };
  backup: {
    buttonLabel: string;
    title: string;
    description: string;
    currentSectionTitle: string;
    exportBtn: string;
    exportedToast: string;
    importSectionTitle: string;
    importSelectFileBtn: string;
    invalidFileError: string;
    modeReplaceLabel: string;
    modeReplaceHint: string;
    modeMergeLabel: string;
    modeMergeHint: string;
    confirmRestoreBtn: string;
    cancelFileBtn: string;
    restoredToast: string;
    indexedDbNotice: string;
    emptyState: string;
    stats: {
      hubPcs: string;
      hubGroups: string;
      hubNpcsMonsters: string;
      combatSessions: string;
      simSessions: string;
      urbanEntries: string;
      travelRoutes: string;
      chargenDraft: string;
      rollerHistories: string;
      chronicleCampaigns: string;
      chronicleEvents: string;
      investigationsCount: string;
      estatesCount: string;
      demonsCount: string;
      yes: string;
      no: string;
    };
  };
  modules: Record<Exclude<ModuleId, 'overview'>, ModuleTranslation>;
}
