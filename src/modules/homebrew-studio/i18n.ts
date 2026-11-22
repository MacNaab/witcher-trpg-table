import type { ModuleLanguage } from './types';

export interface HomebrewStudioCopy {
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backBtn: string;
  };
  docs: {
    selectLabel: string;
    newDocBtn: string;
    duplicateBtn: string;
    deleteBtn: string;
    deleteConfirmBtn: string;
    cancelBtn: string;
    titlePlaceholder: string;
    footerLabel: string;
    footerPlaceholder: string;
    themeLabel: string;
    formatLabel: string;
    startPageLabel: string;
    templateDialogTitle: string;
    templateDialogDesc: string;
    useTemplateBtn: string;
    blankDocTitle: string;
    blankDocDesc: string;
    untitledPrefix: string;
    createdToast: string;
    deletedToast: string;
  };
  toolbar: {
    cover: string;
    toc: string;
    artPage: string;
    signs: string;
    backCover: string;
    h1: string;
    h2: string;
    h3: string;
    quote: string;
    aside: string;
    bottomArt: string;
    callout: string;
    statblock: string;
    table: string;
    pageBreak: string;
    uploadImage: string;
    importCharacter: string;
    importMonster: string;
    imageUploadedToast: string;
    imageErrorToast: string;
  };
  viewModes: {
    split: string;
    editor: string;
    preview: string;
    singlePage: string;
    spreadView: string;
    syncScrollLabel: string;
    syncScrollTooltip: string;
    syncedPageIndicator: (current: number, total: number) => string;
    fullscreenBtn: string;
    exitFullscreenBtn: string;
    zoomLabel: string;
    zoomAuto: string;
  };
  exportMenu: {
    exportPdfBtn: string;
    exportingPdfBtn: string;
    printBtn: string;
    downloadHtmlBtn: string;
    downloadMdBtn: string;
    importMdBtn: string;
    pdfReadyToast: (filename: string) => string;
    pdfErrorToast: string;
    htmlReadyToast: string;
    mdExportedToast: string;
    mdImportedToast: string;
    printSandboxFallbackToast: string;
  };
  preview: {
    pageMeta: (pageNum: number, isEven: boolean) => string;
    coverMeta: string;
    backCoverMeta: string;
    artPageMeta: (pageNum: number, isEven: boolean) => string;
    tocMeta: (pageNum: number, isEven: boolean) => string;
    bestiaryLeftMeta: (pageNum: number, isEven: boolean, name: string) => string;
    bestiaryRightMeta: (pageNum: number, isEven: boolean) => string;
    characterSheetMeta: (pageNum: number, isEven: boolean, name: string) => string;
    parityEven: string;
    parityOdd: string;
    noAsideHint: string;
    emptyDocTitle: string;
    emptyDocDesc: string;
  };
  bestiaryDialog: {
    characterTitle: string;
    characterDesc: string;
    monsterTitle: string;
    monsterDesc: string;
    formatLabel: string;
    officialCharacterBtn: string;
    officialMonsterBtn: string;
    quickFormatBtn: string;
    officialCharacterHint: string;
    officialMonsterHint: string;
    quickHint: string;
    blankCharacterTitle: string;
    blankCharacterDesc: string;
    blankMonsterTitle: string;
    blankMonsterDesc: string;
    insertBlankBtn: string;
    blankCharacterInsertedName: string;
    blankMonsterInsertedName: string;
    characterSearchPlaceholder: string;
    monsterSearchPlaceholder: string;
    bestiaryTab: string;
    hubMonstersTab: string;
    chargenDraftBadge: string;
    kindPcBadge: string;
    kindNpcBadge: string;
    kindMonsterBadge: string;
    insertBtn: string;
    emptyCharacters: string;
    emptyHubMonsters: string;
    insertedToast: (name: string) => string;
  };
  guide: {
    toggleBtn: string;
    title: string;
    items: Array<{ syntax: string; desc: string }>;
  };
}

const FR_COPY: HomebrewStudioCopy = {
  header: {
    eyebrow: 'STUDIO D’ÉDITION · HOMEBREWERY WITCHER TRPG',
    title: 'Créateur de Suppléments & PDF',
    subtitle:
      'Rédigez en Markdown enrichi et admirez instantanément le rendu maquette Witcher TRPG : bloc central à 2 colonnes et colonne mineure alternant gauche/droite selon la parité de page.',
    backBtn: 'Accueil',
  },
  docs: {
    selectLabel: 'Document actif',
    newDocBtn: 'Nouveau / Modèle',
    duplicateBtn: 'Dupliquer',
    deleteBtn: 'Supprimer',
    deleteConfirmBtn: 'Confirmer',
    cancelBtn: 'Annuler',
    titlePlaceholder: 'Titre du supplément…',
    footerLabel: 'Pied de page',
    footerPlaceholder: 'Ex. Les Sorceleurs',
    themeLabel: 'Couleur de chapitre',
    formatLabel: 'Format',
    startPageLabel: 'Page départ',
    templateDialogTitle: 'Créer un nouveau document',
    templateDialogDesc:
      'Partez d’un modèle complet fidèle aux livres officiels ou d’une page vierge.',
    useTemplateBtn: 'Créer depuis ce modèle',
    blankDocTitle: 'Page vierge (Markdown libre)',
    blankDocDesc:
      'Structure minimale avec bloc central 2 colonnes, colonne mineure et saut de page.',
    untitledPrefix: 'Nouveau supplément',
    createdToast: 'Nouveau document créé.',
    deletedToast: 'Document supprimé.',
  },
  toolbar: {
    cover: 'Couverture',
    toc: 'Sommaire auto',
    artPage: 'Page Illustration',
    signs: 'Frise Signes',
    backCover: '4e de couverture',
    h1: 'Titre H1',
    h2: 'Section H2',
    h3: 'Sous-titre',
    quote: 'Journal',
    aside: 'Colonne mineure',
    bottomArt: 'Art bas de page',
    callout: 'Encadré',
    statblock: 'Fiche Statblock',
    table: 'Tableau',
    pageBreak: 'Saut de page',
    uploadImage: 'Image locale',
    importCharacter: 'Importer PJ / PNJ',
    importMonster: 'Importer Monstre',
    imageUploadedToast: 'Image intégrée au document.',
    imageErrorToast: 'Impossible de charger cette image.',
  },
  viewModes: {
    split: 'Éditeur + Aperçu',
    editor: 'Éditeur seul',
    preview: 'Aperçu PDF',
    singlePage: 'Page simple',
    spreadView: 'Double page (Livre)',
    syncScrollLabel: 'Sync',
    syncScrollTooltip:
      'Synchroniser automatiquement la page active entre l’éditeur et l’aperçu PDF',
    syncedPageIndicator: (current, total) => `Page ${current}/${total}`,
    fullscreenBtn: 'Plein écran',
    exitFullscreenBtn: 'Fermer plein écran',
    zoomLabel: 'Zoom',
    zoomAuto: 'Ajuster',
  },
  exportMenu: {
    exportPdfBtn: 'Télécharger PDF',
    exportingPdfBtn: 'Génération PDF…',
    printBtn: 'Imprimer / PDF natif',
    downloadHtmlBtn: 'HTML imprimable',
    downloadMdBtn: 'Exporter .md',
    importMdBtn: 'Importer .md',
    pdfReadyToast: (filename) => `PDF téléchargé : ${filename}`,
    pdfErrorToast:
      'Export PDF direct indisponible sur cette image ; fichier HTML imprimable généré à la place.',
    htmlReadyToast: 'Fichier HTML imprimable téléchargé (ouvrez-le puis Ctrl+P → PDF).',
    mdExportedToast: 'Source Markdown exportée.',
    mdImportedToast: 'Fichier Markdown importé dans un nouveau document.',
    printSandboxFallbackToast:
      'L’aperçu intégré bloque la fenêtre d’impression ; téléchargement du fichier PDF / HTML déclenché.',
  },
  preview: {
    pageMeta: (pageNum, isEven) =>
      `Page ${pageNum} · ${isEven ? 'Paire (colonne mineure à gauche)' : 'Impaire (colonne mineure à droite)'}`,
    coverMeta: 'Page de couverture · Hors pagination',
    backCoverMeta: '4e de couverture (finale) · Hors pagination',
    artPageMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Illustration pleine page (${isEven ? 'Paire' : 'Impaire'})`,
    tocMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Sommaire auto (${isEven ? 'Paire' : 'Impaire'})`,
    bestiaryLeftMeta: (pageNum, isEven, name) =>
      `Page ${pageNum} · Bestiaire officiel (1/2 : ${name}) · ${isEven ? 'Paire' : 'Impaire'}`,
    bestiaryRightMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Bestiaire officiel (2/2 : Attaques & Capacités) · ${isEven ? 'Paire' : 'Impaire'}`,
    characterSheetMeta: (pageNum, isEven, name) =>
      `Page ${pageNum} · Fiche officielle PJ / PNJ (${name}) · ${isEven ? 'Paire' : 'Impaire'}`,
    parityEven: 'Paire · Gauche',
    parityOdd: 'Impaire · Droite',
    noAsideHint: 'Sans bloc mineur sur cette page (2 colonnes pleine largeur)',
    emptyDocTitle: 'Commencez à rédiger votre supplément',
    emptyDocDesc:
      'Utilisez la barre d’outils au-dessus de l’éditeur pour insérer une couverture, un sommaire auto, des titres ou une colonne mineure alternée (::: aside).',
  },
  bestiaryDialog: {
    characterTitle: 'Importer un PJ / PNJ',
    characterDesc:
      'Importez un personnage ou PNJ existant, ou insérez une fiche vierge de modèle à compléter.',
    monsterTitle: 'Importer un Monstre',
    monsterDesc:
      'Importez une créature du Bestiaire officiel, un monstre personnalisé du Hub ou une fiche vierge.',
    formatLabel: 'Format d’importation',
    officialCharacterBtn: 'Fiche officielle (1 page)',
    officialMonsterBtn: 'Double page (Bestiaire officiel)',
    quickFormatBtn: 'Fiche rapide (Tableau)',
    officialCharacterHint:
      'Génère la fiche officielle sur 1 page (stats côte à côte, compétences, magie/combat, portrait, récit et équipement).',
    officialMonsterHint:
      'Génère la présentation officielle sur 2 pages (bannière stats, tableaux encadrés, attaques et cartes de capacités).',
    quickHint:
      'Génère une fiche statblock compacte (::: statblock) intégrée au flux de colonnes.',
    blankCharacterTitle: 'Fiche vierge de modèle (PJ / PNJ)',
    blankCharacterDesc:
      'Insère une fiche personnage vierge prête à personnaliser dans le format choisi ci-dessus.',
    blankMonsterTitle: 'Fiche vierge de modèle (Monstre)',
    blankMonsterDesc:
      'Insère une fiche créature vierge prête à personnaliser dans le format choisi ci-dessus.',
    insertBlankBtn: 'Insérer fiche vierge',
    blankCharacterInsertedName: 'Modèle vierge PJ / PNJ',
    blankMonsterInsertedName: 'Modèle vierge Monstre',
    characterSearchPlaceholder: 'Rechercher un PJ ou PNJ (Générateur / Hub MJ)…',
    monsterSearchPlaceholder: 'Rechercher un monstre ou une catégorie…',
    bestiaryTab: 'Bestiaire (174)',
    hubMonstersTab: 'Monstres du Hub MJ',
    chargenDraftBadge: 'Générateur PJ (En cours)',
    kindPcBadge: 'PJ · Fiche 1 page',
    kindNpcBadge: 'PNJ · Fiche 1 page',
    kindMonsterBadge: 'Monstre · 2 pages Bestiaire',
    insertBtn: 'Insérer la fiche',
    emptyCharacters:
      'Aucun PJ ou PNJ enregistré pour l’instant. Vous pouvez insérer la fiche vierge ci-dessus.',
    emptyHubMonsters:
      'Aucun monstre personnalisé enregistré dans le Hub MJ. Vous pouvez utiliser le Bestiaire ou la fiche vierge.',
    insertedToast: (name) => `Fiche « ${name} » insérée dans le Markdown.`,
  },
  guide: {
    toggleBtn: 'Aide syntaxe',
    title: 'Raccourcis Markdown Witcher TRPG',
    items: [
      { syntax: '::: cover ... :::', desc: 'Page de couverture plein écran (titre, sous-titre doré, accroche, image).' },
      { syntax: '::: toc ... :::', desc: 'Sommaire intelligent (1 à 3 colonnes selon l’espace, rempli à gauche d’abord) synchronisé sur # et ##.' },
      { syntax: '::: art-page ... :::', desc: 'Page complète réservée à une grande illustration (idéale en page paire face à un début de chapitre).' },
      { syntax: '::: signs', desc: 'Frise ornementale des 7 Signes de Sorceleur ; active la mise en page Ouverture de Chapitre sous un titre #.' },
      { syntax: '::: bestiary-left ... :::', desc: 'Page gauche officielle de Bestiaire : compétences latérales, bannière stats, tableau physique et superstition.' },
      { syntax: '::: bestiary-right ... :::', desc: 'Page droite officielle de Bestiaire : savoir du sorceleur, tableau d’attaques et cartes de capacités.' },
      { syntax: '::: character-sheet ... :::', desc: 'Fiche officielle 1 page de PJ / PNJ : stats côte à côte, Compétences, Clés, portrait, Magie/Combat et Équipement 4 colonnes.' },
      { syntax: '::: backcover ... :::', desc: '4e de couverture finale : image diagonale, chaînes forgées, synopsis + liste « Au programme ».' },
      { syntax: '\\page', desc: 'Passe à la page suivante (inverse gauche/droite automatiquement).' },
      { syntax: '::: aside ... :::', desc: 'Colonne mineure (1 col.) : à gauche sur pages paires, à droite sur pages impaires.' },
      { syntax: '::: bottom-art ... :::', desc: 'Illustration ou bloc large ancré en bas de page.' },
      { syntax: '::: statblock ... :::', desc: 'Fiche technique rapide de monstre / PNJ en tableau.' },
      { syntax: '::: callout ... :::', desc: 'Encadré de règle ou note de MJ teintée.' },
      { syntax: '> Citation', desc: 'Voix de journal en italique (ex. récit de sorceleur).' },
    ],
  },
};

const EN_COPY: HomebrewStudioCopy = {
  header: {
    eyebrow: 'PUBLISHING STUDIO · WITCHER TRPG HOMEBREWERY',
    title: 'Supplement & PDF Creator',
    subtitle:
      'Write in enhanced Markdown and inspect a live rulebook spread: a 2-column central prose block paired with a 1-column minor sidebar alternating left/right by page parity.',
    backBtn: 'Overview',
  },
  docs: {
    selectLabel: 'Active document',
    newDocBtn: 'New / Template',
    duplicateBtn: 'Duplicate',
    deleteBtn: 'Delete',
    deleteConfirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    titlePlaceholder: 'Supplement title…',
    footerLabel: 'Running footer',
    footerPlaceholder: 'e.g. The Witchers',
    themeLabel: 'Chapter color',
    formatLabel: 'Page size',
    startPageLabel: 'Start page',
    templateDialogTitle: 'Create New Document',
    templateDialogDesc:
      'Start from an authentic rulebook showcase template or a clean blank layout.',
    useTemplateBtn: 'Use this template',
    blankDocTitle: 'Blank Page (Custom Markdown)',
    blankDocDesc:
      'Minimal scaffold with a 2-column main block, minor sidebar, and page break.',
    untitledPrefix: 'New Supplement',
    createdToast: 'New document created.',
    deletedToast: 'Document deleted.',
  },
  toolbar: {
    cover: 'Cover Page',
    toc: 'Smart TOC',
    artPage: 'Full Art Page',
    signs: 'Signs Divider',
    backCover: 'Back Cover',
    h1: 'Heading H1',
    h2: 'Section H2',
    h3: 'Subhead',
    quote: 'Lore Quote',
    aside: 'Minor Column',
    bottomArt: 'Bottom Art',
    callout: 'Callout Box',
    statblock: 'Statblock',
    table: 'Table',
    pageBreak: 'Page Break',
    uploadImage: 'Upload Image',
    importCharacter: 'Import PC / NPC',
    importMonster: 'Import Monster',
    imageUploadedToast: 'Image embedded in document.',
    imageErrorToast: 'Could not read image file.',
  },
  viewModes: {
    split: 'Editor + Preview',
    editor: 'Editor Only',
    preview: 'PDF Preview',
    singlePage: 'Single Page',
    spreadView: 'Book Spread',
    syncScrollLabel: 'Sync',
    syncScrollTooltip:
      'Keep active page synchronized between Markdown editor and PDF preview',
    syncedPageIndicator: (current, total) => `Page ${current}/${total}`,
    fullscreenBtn: 'Fullscreen',
    exitFullscreenBtn: 'Exit Fullscreen',
    zoomLabel: 'Zoom',
    zoomAuto: 'Fit',
  },
  exportMenu: {
    exportPdfBtn: 'Download PDF',
    exportingPdfBtn: 'Building PDF…',
    printBtn: 'Print / Native PDF',
    downloadHtmlBtn: 'Printable HTML',
    downloadMdBtn: 'Export .md',
    importMdBtn: 'Import .md',
    pdfReadyToast: (filename) => `PDF downloaded: ${filename}`,
    pdfErrorToast:
      'Direct PDF capture encountered an image issue; downloaded printable HTML instead.',
    htmlReadyToast: 'Printable HTML downloaded (open in any browser and Ctrl+P → PDF).',
    mdExportedToast: 'Markdown source exported.',
    mdImportedToast: 'Markdown file imported into a new document.',
    printSandboxFallbackToast:
      'Embedded preview blocks native print dialogs; use Download PDF or Printable HTML.',
  },
  preview: {
    pageMeta: (pageNum, isEven) =>
      `Page ${pageNum} · ${isEven ? 'Even (minor column on Left)' : 'Odd (minor column on Right)'}`,
    coverMeta: 'Cover Page · Unnumbered',
    backCoverMeta: 'Back Cover · Unnumbered',
    artPageMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Full-Page Artwork (${isEven ? 'Even' : 'Odd'})`,
    tocMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Smart TOC (${isEven ? 'Even' : 'Odd'})`,
    bestiaryLeftMeta: (pageNum, isEven, name) =>
      `Page ${pageNum} · Official Bestiary (1/2: ${name}) · ${isEven ? 'Even' : 'Odd'}`,
    bestiaryRightMeta: (pageNum, isEven) =>
      `Page ${pageNum} · Official Bestiary (2/2: Attacks & Abilities) · ${isEven ? 'Even' : 'Odd'}`,
    characterSheetMeta: (pageNum, isEven, name) =>
      `Page ${pageNum} · Official PC / NPC Sheet (${name}) · ${isEven ? 'Even' : 'Odd'}`,
    parityEven: 'Even · Left',
    parityOdd: 'Odd · Right',
    noAsideHint: 'No minor block on this page (full-width 2 columns)',
    emptyDocTitle: 'Start writing your supplement',
    emptyDocDesc:
      'Use the snippet toolbar above the editor to insert a cover page, smart table of contents, headings, or an alternating minor column (::: aside).',
  },
  bestiaryDialog: {
    characterTitle: 'Import PC / NPC',
    characterDesc:
      'Insert an existing saved character or NPC, or start from a blank template sheet.',
    monsterTitle: 'Import Monster',
    monsterDesc:
      'Insert a creature from the official Bestiary, a custom GM Hub monster, or a blank template.',
    formatLabel: 'Import Format',
    officialCharacterBtn: 'Official Sheet (1-page)',
    officialMonsterBtn: '2-Page Spread (Official Bestiary)',
    quickFormatBtn: 'Quick Statblock (Compact)',
    officialCharacterHint:
      'Generates the official 1-page rulebook Character Sheet (side-by-side stats, skills, magic/combat, portrait, bio & 4-col gear).',
    officialMonsterHint:
      'Generates the official 2-page Bestiary spread (hanging stat banner, framed sidebar tables, attacks table & ability cards).',
    quickHint:
      'Inserts a compact ::: statblock card inline inside the regular column layout.',
    blankCharacterTitle: 'Blank Template Sheet (PC / NPC)',
    blankCharacterDesc:
      'Inserts an empty character template ready to customize in the selected format above.',
    blankMonsterTitle: 'Blank Template Sheet (Monster)',
    blankMonsterDesc:
      'Inserts an empty monster template ready to customize in the selected format above.',
    insertBlankBtn: 'Insert Blank',
    blankCharacterInsertedName: 'Blank PC / NPC Template',
    blankMonsterInsertedName: 'Blank Monster Template',
    characterSearchPlaceholder: 'Search PCs or NPCs (PC Generator / GM Hub)…',
    monsterSearchPlaceholder: 'Search Bestiary entries or GM Hub monsters…',
    bestiaryTab: 'Bestiary (174)',
    hubMonstersTab: 'GM Hub Monsters',
    chargenDraftBadge: 'PC Generator (Draft)',
    kindPcBadge: 'PC · 1-page sheet',
    kindNpcBadge: 'NPC · 1-page sheet',
    kindMonsterBadge: 'Monster · 2-page Bestiary',
    insertBtn: 'Insert Sheet',
    emptyCharacters:
      'No PCs or NPCs saved yet. You can insert the blank template sheet above.',
    emptyHubMonsters:
      'No custom monsters saved in the GM Hub yet. Use the Bestiary tab or insert a blank template above.',
    insertedToast: (name) => `Sheet "${name}" inserted into Markdown.`,
  },
  guide: {
    toggleBtn: 'Syntax Help',
    title: 'Witcher TRPG Markdown Directives',
    items: [
      { syntax: '::: cover ... :::', desc: 'Full-bleed cover page (title, gold subtitle, tagline, hero art).' },
      { syntax: '::: toc ... :::', desc: 'Smart Table of Contents (adaptive 1–3 columns filling left first) auto-updated from # and ## headings.' },
      { syntax: '::: art-page ... :::', desc: 'Full-page framed illustration (pairs cleanly on even left page opposite a chapter opener).' },
      { syntax: '::: signs', desc: '7-emblem Witcher Signs divider; activates Chapter Opener layout beneath a # heading.' },
      { syntax: '::: bestiary-left ... :::', desc: 'Official Bestiary left page: framed skill/defense tables, hanging stat ribbon, physical box & superstition.' },
      { syntax: '::: bestiary-right ... :::', desc: 'Official Bestiary right page: Witcher Knowledge lore, full-width attacks table & framed ability cards.' },
      { syntax: '::: character-sheet ... :::', desc: 'Official 1-page PC / NPC sheet: side-by-side stat boxes, Skills, Key Skills, portrait, Magic/Combat & 4-col Gear.' },
      { syntax: '::: backcover ... :::', desc: 'Final back cover with diagonal top artwork, forged iron chains, synopsis & Featuring column.' },
      { syntax: '\\page', desc: 'Starts a new page (automatically flips minor column left/right).' },
      { syntax: '::: aside ... :::', desc: '1-column minor sidebar: Left on even pages, Right on odd pages.' },
      { syntax: '::: bottom-art ... :::', desc: 'Wide artwork or footer panel spanning the bottom of the page.' },
      { syntax: '::: statblock ... :::', desc: 'Compact Witcher TRPG monster/NPC statblock table.' },
      { syntax: '::: callout ... :::', desc: 'Tinted parchment rules callout or GM sidebar box.' },
      { syntax: '> Quote', desc: 'Italicized lore journal quote (Witcher rulebook style).' },
    ],
  },
};

export function getHomebrewStudioCopy(lang: ModuleLanguage): HomebrewStudioCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
