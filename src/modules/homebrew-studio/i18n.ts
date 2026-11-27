import { ALL_BESTIARY_ENTRIES } from '@/src/data/bestiary';
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
    createProfession: string;
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
    professionOverviewMeta: (pageNum: number, isEven: boolean, title: string) => string;
    professionTreeMeta: (pageNum: number, isEven: boolean, title: string) => string;
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
  professionDialog: {
    title: string;
    desc: string;
    presetLabel: string;
    loadPresetBtn: string;
    resetBlankBtn: string;
    tabOverview: string;
    tabTree: string;
    tabTables: string;
    fieldTitle: string;
    fieldVigor: string;
    fieldTreasure: string;
    fieldImage: string;
    fieldImageCustom: string;
    defaultImageLabel: string;
    fieldDefiningShort: string;
    fieldDefiningFull: string;
    fieldDefiningBoxText: string;
    fieldQuote: string;
    fieldQuoteAuthor: string;
    fieldLore: string;
    fieldLoreAuthor: string;
    fieldMagicPerks: string;
    fieldSkills: string;
    fieldGear: string;
    fieldGearTitle: string;
    onePerLineHint: string;
    fieldTreeTitle: string;
    fieldTreeDefTitle: string;
    fieldTreeDefDesc: string;
    branchLabel: (index: number) => string;
    tierLabel: (tier: number) => string;
    talentNamePlaceholder: string;
    talentDescPlaceholder: string;
    sideTablesHint: string;
    addSideTableBtn: string;
    noSideTables: string;
    sideTableTitle: string;
    sideTableCol1: string;
    sideTableCol2: string;
    removeTableBtn: string;
    sideSectionPlaceholder: string;
    addRowBtn: string;
    addSectionBtn: string;
    insertSpreadBtn: string;
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
    createProfession: 'Nouvelle Profession',
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
    professionOverviewMeta: (pageNum, isEven, title) =>
      `Page ${pageNum} · Profession officielle (1/2 : ${title}) · ${isEven ? 'Paire' : 'Impaire'}`,
    professionTreeMeta: (pageNum, isEven, title) =>
      `Page ${pageNum} · Arbre de compétence 3×3 (2/2 : ${title}) · ${isEven ? 'Paire' : 'Impaire'}`,
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
    bestiaryTab: `Bestiaire (${ALL_BESTIARY_ENTRIES.length})`,
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
  professionDialog: {
    title: 'Créer une Profession (Double page officielle)',
    desc: 'Composez une nouvelle profession sur 2 pages (Description & Profil + Arbre de talents 3×3) ou clonez une profession existante.',
    presetLabel: 'Cloner / préremplir depuis le compendium',
    loadPresetBtn: 'Préremplir',
    resetBlankBtn: 'Modèle vierge',
    tabOverview: 'Page 1 · Description & Profil',
    tabTree: 'Page 2 · Arbre de talents 3×3',
    tabTables: 'Tables annexes',
    fieldTitle: 'Nom de la profession',
    fieldVigor: 'Seuil de Vigueur',
    fieldTreasure: 'Bourse de départ (optionnel)',
    fieldImage: 'Illustration (document / défaut)',
    fieldImageCustom: 'Clé ou URL personnalisée',
    defaultImageLabel: 'Illustration par défaut (Grimoire)',
    fieldDefiningShort: 'Compétence exclusive (nom court)',
    fieldDefiningFull: 'Compétence exclusive (avec Carac.)',
    fieldDefiningBoxText: 'Encadré de Compétence exclusive (sous le portrait)',
    fieldQuote: 'Citation d’ouverture (épigraphe)',
    fieldQuoteAuthor: 'Auteur de la citation',
    fieldLore: 'Récit & description (séparer les paragraphes par ligne vide)',
    fieldLoreAuthor: 'Chroniqueur (signature bas de texte)',
    fieldMagicPerks: 'Atouts magiques (1 par ligne, optionnel)',
    fieldSkills: '10 Compétences de profession (1 par ligne)',
    fieldGear: 'Équipement de départ (1 par ligne)',
    fieldGearTitle: 'Titre du tableau d’équipement',
    onePerLineHint: '1 élément par ligne…',
    fieldTreeTitle: 'Titre de la page Arbre de compétence',
    fieldTreeDefTitle: 'Sous-titre Compétence exclusive',
    fieldTreeDefDesc: 'Règles détaillées sur 2 colonnes (ligne vide = nouveau §)',
    branchLabel: (index) => `Branche ${index}`,
    tierLabel: (tier) => `Rang ${tier}`,
    talentNamePlaceholder: 'Nom du talent (CARAC)',
    talentDescPlaceholder: 'Effet du talent (**mot-clé** en couleur)…',
    sideTablesHint:
      'Tables de référence optionnelles en colonne latérale (ex. Guerrier, Localités, Modificateurs…).',
    addSideTableBtn: 'Ajouter une table',
    noSideTables:
      'Aucune table annexe : l’Arbre de talents occupera toute la largeur de la page.',
    sideTableTitle: 'Titre de la table',
    sideTableCol1: 'En-tête Colonne 1',
    sideTableCol2: 'En-tête Colonne 2',
    removeTableBtn: 'Supprimer cette table',
    sideSectionPlaceholder: 'Titre de section interne (optionnel)',
    addRowBtn: 'Ligne',
    addSectionBtn: 'Ajouter une section',
    insertSpreadBtn: 'Insérer la Profession (2 pages)',
    insertedToast: (name) =>
      `Profession « ${name} » (2 pages) insérée dans le Markdown.`,
  },
  guide: {
    toggleBtn: 'Aide syntaxe',
    title: 'Raccourcis Markdown Witcher TRPG',
    items: [
      { syntax: '::: cover ... :::', desc: 'Page de couverture plein écran (titre, sous-titre doré, accroche, image).' },
      { syntax: '::: toc ... :::', desc: 'Sommaire intelligent (1 à 3 colonnes selon l’espace, rempli à gauche d’abord) synchronisé sur # et ##.' },
      { syntax: '::: art-page ... :::', desc: 'Page complète réservée à une grande illustration (idéale en page paire face à un début de chapitre).' },
      { syntax: '::: signs', desc: 'Frise ornementale des 7 Signes de Sorceleur ; active la mise en page Ouverture de Chapitre sous un titre #.' },
      { syntax: '::: profession ... :::', desc: 'Page gauche officielle de Profession : portrait, citation, récit, compétence exclusive et tableaux latéraux.' },
      { syntax: '::: profession-tree ... :::', desc: 'Page droite officielle d’Arbre de talents 3×3 avec 3 branches, règles sur 2 colonnes et tables annexes.' },
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
    createProfession: 'New Profession',
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
    professionOverviewMeta: (pageNum, isEven, title) =>
      `Page ${pageNum} · Official Profession (1/2: ${title}) · ${isEven ? 'Even' : 'Odd'}`,
    professionTreeMeta: (pageNum, isEven, title) =>
      `Page ${pageNum} · 3×3 Skill Tree (2/2: ${title}) · ${isEven ? 'Even' : 'Odd'}`,
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
    bestiaryTab: `Bestiary (${ALL_BESTIARY_ENTRIES.length})`,
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
  professionDialog: {
    title: 'Create Profession (Official 2-Page Spread)',
    desc: 'Build a complete 2-page rulebook Profession spread (Overview & Sidebar + 3×3 Skill Tree) or pre-fill from an existing profession.',
    presetLabel: 'Clone / pre-fill from compendium',
    loadPresetBtn: 'Pre-fill',
    resetBlankBtn: 'Blank Template',
    tabOverview: 'Page 1 · Overview & Profile',
    tabTree: 'Page 2 · 3×3 Skill Tree',
    tabTables: 'Side Sub-Tables',
    fieldTitle: 'Profession Name',
    fieldVigor: 'Vigor Threshold',
    fieldTreasure: 'Starting Coin (optional)',
    fieldImage: 'Artwork (document / default)',
    fieldImageCustom: 'Custom key or URL',
    defaultImageLabel: 'Default Artwork (Grimoire)',
    fieldDefiningShort: 'Defining Skill (short label)',
    fieldDefiningFull: 'Defining Skill (with Stat)',
    fieldDefiningBoxText: 'Defining Skill Box Text (beneath portrait)',
    fieldQuote: 'Opening Epigraph Quote',
    fieldQuoteAuthor: 'Quote Attribution',
    fieldLore: 'Lore & Chronicle (separate paragraphs with blank line)',
    fieldLoreAuthor: 'Chronicler Attribution',
    fieldMagicPerks: 'Magical Perks (1 per line, optional)',
    fieldSkills: '10 Profession Skills (1 per line)',
    fieldGear: 'Starting Gear (1 per line)',
    fieldGearTitle: 'Gear Table Header',
    onePerLineHint: '1 item per line…',
    fieldTreeTitle: 'Skill Tree Page Title',
    fieldTreeDefTitle: 'Defining Skill Subheading',
    fieldTreeDefDesc: '2-column Mechanics Rules (blank line = new paragraph)',
    branchLabel: (index) => `Branch ${index}`,
    tierLabel: (tier) => `Tier ${tier}`,
    talentNamePlaceholder: 'Talent Name (STAT)',
    talentDescPlaceholder: 'Talent rules (**keyword** highlighted)…',
    sideTablesHint:
      'Optional stacked reference tables in the minor sidebar (e.g. Warrior, Localities, Modifiers…).',
    addSideTableBtn: 'Add Table',
    noSideTables:
      'No side sub-tables: the 3×3 Skill Tree will span the full page width.',
    sideTableTitle: 'Table Title',
    sideTableCol1: 'Column 1 Header',
    sideTableCol2: 'Column 2 Header',
    removeTableBtn: 'Delete table',
    sideSectionPlaceholder: 'Inner section heading (optional)',
    addRowBtn: 'Row',
    addSectionBtn: 'Add Section',
    insertSpreadBtn: 'Insert Profession (2 Pages)',
    insertedToast: (name) =>
      `Profession "${name}" (2-page spread) inserted into Markdown.`,
  },
  guide: {
    toggleBtn: 'Syntax Help',
    title: 'Witcher TRPG Markdown Directives',
    items: [
      { syntax: '::: cover ... :::', desc: 'Full-bleed cover page (title, gold subtitle, tagline, hero art).' },
      { syntax: '::: toc ... :::', desc: 'Smart Table of Contents (adaptive 1–3 columns filling left first) auto-updated from # and ## headings.' },
      { syntax: '::: art-page ... :::', desc: 'Full-page framed illustration (pairs cleanly on even left page opposite a chapter opener).' },
      { syntax: '::: signs', desc: '7-emblem Witcher Signs divider; activates Chapter Opener layout beneath a # heading.' },
      { syntax: '::: profession ... :::', desc: 'Official Profession overview page: portrait, epigraph, lore, defining skill card, and framed sidebar tables.' },
      { syntax: '::: profession-tree ... :::', desc: 'Official 3×3 Skill Tree page with 3 branches, 2-column defining skill rules, and optional reference sub-tables.' },
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
