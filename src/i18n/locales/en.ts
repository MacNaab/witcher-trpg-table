import type { TranslationDictionary } from '@/src/i18n/types';

/**
 * English translation dictionary for The Witcher TRPG GM Grimoire.
 */
export const en: TranslationDictionary = {
  app: {
    brand: 'GM Grimoire',
    subtitle: 'The Witcher TRPG',
    editionLabel: 'Game Master Companion · The Continent',
    issuesUrl: 'https://github.com/MacNaab/witcher-trpg-table/issues',
    issuesShortLabel: 'Issues & Feedback',
    issuesNotice: 'Found a bug, error, or have a suggestion?',
    issuesDescription:
      'For any bug report, rules error, or feature suggestion, please open an issue on GitHub:',
    issuesCta: 'github.com/MacNaab/witcher-trpg-table/issues',
  },
  nav: {
    overview: 'Overview',
    groups: {
      world: 'World & Exploration',
      combat: 'Combat & Encounters',
      reference: 'Characters & Reference',
    },
    allCategories: 'All Categories',
    openCommandPalette: 'Jump to tool…',
    searchPlaceholder: 'Search category or action…',
    noResults: 'No matching tools found.',
    quickActions: 'Quick Actions',
    modulesGroup: 'GM Categories',
    shortcutsGroup: 'Tool Shortcuts',
    bestiaryGroup: 'Bestiary & Factions (Direct Jump)',
    codexGroup: 'Crafting & Alchemy Codex (Direct Jump)',
    compendiumGroup: 'Equipment & Alchemy (Quick View)',
    campaignGroup: 'Saved Campaign Data',
    backupAction: 'Campaign Backup & Restore (JSON)',
    diceAction: 'Witcher Dice Roller (1d10! & Quick Rolls)',
    notesAction: 'Session Notes & GM Scratchpad',
    collapseSidebar: 'Toggle sidebar',
  },
  controls: {
    language: 'Language',
    theme: 'Appearance',
    themeDark: 'Obsidian (Dark)',
    themeLight: 'Parchment (Light)',
    themeSwitched: 'Appearance updated',
    languageSwitched: 'Language switched to English',
    backToOverview: 'Back to Overview',
    openModule: 'Open',
    moduleSpecs: 'Module Architecture',
    close: 'Close',
    readyState: 'Active',
    pendingState: 'Pending integration',
  },
  overview: {
    heroEyebrow: 'Game Master Workbench · The Witcher TRPG',
    heroTitle: 'Prepare and run campaigns across the Continent',
    heroDescription:
      'Eight integrated tools built for live play: random tables and loot chests, urban generator with history, interactive travel maps, encounter & bestiary reference, shared-hub combat tracker & Monte-Carlo simulator, PDF character builder, and EN/FR Crafting Codex.',
    heroCta: 'Open Combat Tracker',
    heroSecondary: 'Quick Search (Ctrl+K)',
    directoryTitle: 'Game Master Tools',
    directorySubtitle:
      'Jump directly into preparation, exploration, combat management, and rules reference workspaces.',
    moduleCountLabel: 'ready modules',
    resume: {
      title: 'Resume Campaign',
      subtitle: 'Direct shortcuts to locally saved campaign data',
      combatActive: 'Active Encounter',
      combatPaused: 'Paused Encounter',
      combatCompleted: 'Latest Encounter',
      combatRound: (round) => (round === 0 ? 'R0 · Prep' : `Round ${round}`),
      combatResumeBtn: 'Resume',
      hubTitle: 'Shared GM Hub',
      hubMeta: (pcs, groups, custom) =>
        `${pcs} PC(s) · ${groups} group(s) · ${custom} custom`,
      hubOpenBtn: 'Open Hub',
      urbanTitle: 'Latest Settlement',
      urbanMeta: (count) => `${count} building(s)`,
      urbanOpenBtn: 'Open Dossier',
      chargenTitle: 'PC Sheet Draft',
      chargenUntitled: 'Untitled Character',
      chargenOpenBtn: 'Continue',
      chronicleTitle: 'Campaign Chronicle',
      chronicleMeta: (events, campaigns) =>
        `${events} event(s) · ${campaigns} campaign(s)`,
      chronicleOpenBtn: 'Open Timeline',
    },
  },
  dice: {
    buttonLabel: 'Dice',
    title: 'Quick Dice Roller · The Witcher TRPG',
    description:
      'Exploding skill checks (1d10!: 10 explodes upward, 1 explodes downward as fumble) plus instant damage and formula rolls.',
    witcherSectionTitle: 'Witcher Skill Check (1d10!)',
    modifierLabel: 'Stat + Skill / Mod.',
    dcLabel: 'Target DC (optional)',
    dcOptionalPlaceholder: 'e.g. 14',
    rollWitcherBtn: 'Roll 1d10!',
    critSuccessBadge: 'Critical (10!)',
    critFailBadge: 'Critical Fumble (1!)',
    fumbleLabel: (severity) => `Severity ${severity}`,
    successBadge: 'Success',
    failBadge: 'Failure',
    quickDiceTitle: 'Damage & General Dice',
    customFormulaLabel: 'Custom Formula',
    customFormulaPlaceholder: 'e.g. 3d6+4 or 2d10-1',
    rollFormulaBtn: 'Roll',
    invalidFormulaError: 'Invalid formula (e.g. 3d6+2, 1d10, 2d6-1).',
    historyTitle: 'Session Roll History',
    clearHistoryBtn: 'Clear',
    emptyHistory: 'No dice rolled yet.',
  },
  notes: {
    buttonLabel: 'Notes',
    title: 'Session Notes & GM Scratchpad',
    description:
      'Persistent scratchpad saved locally and automatically included in JSON campaign backups.',
    sessionTitleLabel: 'Session Title / Current Arc',
    sessionTitlePlaceholder: 'e.g. Session 12 — Shadows over Oxenfurt…',
    contentLabel: 'Quick notes, improvised NPCs, clues & hooks',
    contentPlaceholder:
      'Jot down improvised NPC names, favors owed, lingering wounds, or session clues…',
    insertTimestampBtn: 'Timestamp',
    copyBtn: 'Copy',
    copiedToast: 'Session notes copied to clipboard.',
    clearBtn: 'Clear',
    clearConfirmBtn: 'Confirm Clear',
    cancelClearBtn: 'Cancel',
    savedHint: 'Auto-saved locally',
    charsCount: (count) => `${count} chars`,
  },
  compendium: {
    weaponKind: 'Weapon / Tool',
    armorKind: 'Armor',
    shieldKind: 'Shield',
    alchemyKind: 'Alchemy',
    gearKind: 'Gear',
    categoryLabel: 'Category',
    availabilityLabel: 'Availability',
    priceLabel: 'Price',
    weightLabel: 'Weight',
    damageLabel: 'Damage',
    accuracyLabel: 'Accuracy',
    reliabilityLabel: 'Reliability',
    handsLabel: 'Hands',
    rangeLabel: 'Range',
    concealmentLabel: 'Concealment',
    enhancementsLabel: 'Enhancements',
    spLabel: 'Stopping Power (SP)',
    evLabel: 'Encumbrance (EV)',
    durationLabel: 'Duration',
    toxicityLabel: 'Toxicity',
    effectLabel: 'Effect & Notes',
    sourceLabel: 'Source',
    copyBtn: 'Copy Item Sheet',
    copiedToast: 'Item sheet copied to clipboard.',
    closeBtn: 'Close',
  },
  placeholder: {
    statusLabel: 'Modular slot ready',
    titleSuffix: 'Reserved Workspace',
    description:
      'Navigation, responsive layout, and multilingual routing are wired. The functional implementation of this category will be connected individually inside its dedicated module.',
    plannedScopeHeading: 'Included capabilities',
    architectureNoteTitle: 'Modular isolation active',
    architectureNoteBody:
      'This module is decoupled from the rest of the application to prevent merge or state conflicts when building each category.',
    specsDialogTitle: 'Module Technical Specifications',
    specsDialogDescription:
      'Integration details for developing this category independently.',
    modulePathLabel: 'Module entry point',
    groupLabel: 'Section',
    shortcutLabel: 'Keyboard shortcut',
  },
  backup: {
    buttonLabel: 'Campaign (JSON)',
    title: 'Campaign Backup & Restore',
    description:
      'Export or restore all browser-stored campaign data in a single JSON file: shared GM Hub, combats, simulations, settlements, plotted routes, PC drafts, and roller histories.',
    currentSectionTitle: 'Currently stored in this browser',
    exportBtn: 'Export Campaign (.json)',
    exportedToast: 'Full campaign backup exported as JSON.',
    importSectionTitle: 'Restore from a backup file',
    importSelectFileBtn: 'Choose a .json file…',
    invalidFileError:
      'This file is not a valid GM Grimoire campaign backup.',
    modeReplaceLabel: 'Replace current campaign data',
    modeReplaceHint:
      'Clears existing module data and restores the exact contents of the backup file.',
    modeMergeLabel: 'Merge / overwrite matching keys',
    modeMergeHint:
      'Only overwrites sections included in the backup file while keeping other data.',
    confirmRestoreBtn: 'Restore Backup',
    cancelFileBtn: 'Discard file',
    restoredToast: 'Campaign backup restored cleanly.',
    indexedDbNotice:
      'Note: custom map images uploaded locally (IndexedDB) are not embedded in the JSON and remain untouched on this browser.',
    emptyState: 'No campaign data saved yet in this browser.',
    stats: {
      hubPcs: 'Hub PCs',
      hubGroups: 'Parties',
      hubNpcsMonsters: 'Custom NPCs / Monsters',
      combatSessions: 'Saved Combats',
      simSessions: 'Simulations',
      urbanEntries: 'Towns / Shops',
      travelRoutes: 'Plotted Routes',
      chargenDraft: 'PC Draft',
      rollerHistories: 'Saved Rolls',
      chronicleCampaigns: 'Chronicle Campaigns',
      chronicleEvents: 'Chronicle Events',
      yes: 'Yes',
      no: 'No',
    },
  },
  modules: {
    'random-tables': {
      title: 'Random Tables',
      shortTitle: 'Random Tables',
      metaLabel: '3 Tools · Tables, Chests & Scenes',
      description:
        'Browse and roll across curated GM tables, generate configurable loot chests, and assemble modular scene encounters.',
      plannedScope: [
        'Category-filtered random tables with instant rolls',
        'Configurable loot chest generator by rarity tier',
        'Modular scene and complication composer',
      ],
    },
    'urban-generator': {
      title: 'Urban Environment Generator',
      shortTitle: 'Urban Generator',
      metaLabel: '4 Tiers · Editing & History',
      description:
        'Generate full settlements or standalone shops, edit every building and inventory manually, and keep a persistent local history.',
      plannedScope: [
        'Capital, City, Village, or Fortress tiers with inns and contracts',
        'Manual editing for shops, prices, grimoires, and custom entries',
        'Persistent browser history, text copy, and printable HTML dossier',
      ],
    },
    'travel-manager': {
      title: 'Travel Manager',
      shortTitle: 'Travel & Maps',
      metaLabel: 'Regional Maps & Custom Import',
      description:
        'Plot multi-waypoint routes across interactive Continent maps or import your own maps to calculate distances and travel duration.',
      plannedScope: [
        'Interactive regional maps plus local custom map import',
        'Waypoint route plotting and live distance calculation',
        'Travel time simulation on foot, horseback, or wagon',
      ],
    },
    'campaign-calendar': {
      title: 'Continent Calendar & Weather',
      shortTitle: 'Calendar & Weather',
      metaLabel: '8 Elven Periods · Moons & Recovery',
      description:
        'Track official Continent seasons, lunar phases, daily dynamic weather penalties, PC natural healing, and crafting downtime queues.',
      plannedScope: [
        'Official Elven periods (Birke, Blathe, Feainn…), feasts & lunar cycle',
        'Regional weather generator with in-game penalties (sight, ranged, magic)',
        'Synced with Travel Manager routes, PC REC healing & crafting projects',
      ],
    },
    'campaign-chronicle': {
      title: 'Campaign Chronicle (GM)',
      shortTitle: 'Chronicle & Campaigns',
      metaLabel: 'Multi-Campaign · Timeline & Sessions',
      description:
        'Organize multiple independent campaigns, log dated events on the Elven calendar, and review arcs by timeline, tabletop session, or compact table.',
      plannedScope: [
        'Multi-campaign management (create, duplicate, switch, and JSON import/export)',
        'Elven month timeline, session grouping, GM secret notes & pinned milestones',
        'One-click Continent Calendar date sync plus GM & Player Recap Markdown exports',
      ],
    },
    'encounter-manager': {
      title: 'Random Encounter Manager',
      shortTitle: 'Encounter Manager',
      metaLabel: 'Monsters, Humanoids & Bestiary',
      description:
        'Roll environment-based monster or humanoid encounters and inspect full stat sheets in the searchable bestiary.',
      plannedScope: [
        'Dedicated Monster and Humanoid rollers by terrain',
        'Filterable Bestiary & Factions table with full combat sheets',
        'Stats, skills, weapons, abilities, vulnerabilities, and loot',
      ],
    },
    'combat-tracker': {
      title: 'Combat Tracker',
      shortTitle: 'Combat Tracker',
      metaLabel: 'Shared Hub · R0 & Editable Log',
      description:
        'Prepare encounters in Round 0 from the shared GM Hub and run turns with targeted dice rolls, critical wounds, and an editable log.',
      plannedScope: [
        'Shared GM Hub (PCs, groups, NPCs, monsters) and battle history',
        'Round 0 staging, editable initiative, and attack/defense rolls',
        'Hit locations, armor ablation, conditions, and editable combat log',
      ],
    },
    'combat-simulator': {
      title: 'Combat Simulator',
      shortTitle: 'Combat Simulator',
      metaLabel: 'Shared Hub · 100–2,000 Runs',
      description:
        'Evaluate encounter balance and lethality with Monte-Carlo combat batches powered by the shared PC, NPC, and monster Hub.',
      plannedScope: [
        'Shared Hub with profession-based NPCs and custom monsters',
        'Lighting rules, target priority, and 100–2,000 simulated fights',
        'Win rate, average rounds, casualties, and dedicated sim history',
      ],
    },
    'verbal-combat': {
      title: 'Verbal Combat Tracker',
      shortTitle: 'Verbal Combat',
      metaLabel: 'Social Duels · Resolve & 1d10!',
      description:
        'Run tense negotiations, interrogations, and trials using official rules: Resolve pools, disposition modifiers, opposed 1d10! social exchanges, and log.',
      plannedScope: [
        'Resolve tracking (WILL + INT), social initiative, and attitudes',
        'Opposed 1d10! resolver for Persuasion, Intimidation, Deceit & Counters',
        'Hub/draft PC import, Continent NPC archetypes, and exportable log',
      ],
    },
    'character-generator': {
      title: 'Character Sheet Generator',
      shortTitle: 'Character Sheets',
      metaLabel: '7 Steps · Guided, Freeform & PDF',
      description:
        'Build complete characters in 7 steps (Guided or Freeform mode) with talent trees, magic compendiums, and filled official PDF export.',
      plannedScope: [
        'Core-rulebook races, professions, lifepath fates, and spells',
        'Automatic derived stats, encumbrance, and point budgets',
        'JSON save/import and filled official PDF sheet export',
      ],
    },
    'lexicon-tables': {
      title: 'Crafting & Alchemy Codex',
      shortTitle: 'Crafting Codex',
      metaLabel: '10 Tables · 348 EN / FR Entries',
      description:
        'Search all 10 crafting, material, diagram, substance, and alchemy formula tables with instant bilingual EN / FR lookup.',
      plannedScope: [
        '348 entries across materials, hides, minerals, diagrams, and formulae',
        'Global bilingual EN / FR search and level/rarity filters',
        'Detailed entry view with components, DC, cost, and quick copy',
      ],
    },
    'homebrew-studio': {
      title: 'Supplement & PDF Studio',
      shortTitle: 'PDF Studio (Markdown)',
      metaLabel: 'Rulebook Layout · 2-Col + Margin',
      description:
        'Write in enhanced Markdown (Homebrewery-style) with a live rulebook spread preview, alternating left/right minor column by page number, and direct PDF export.',
      plannedScope: [
        'Justified 2-column central prose + parity-alternating 1-column minor sidebar',
        'Painted chapter headers, ribbon bookmarks, Bestiary statblocks & artwork',
        'One-click PDF download, printable HTML, and Markdown (.md) export',
      ],
    },
  },
};
