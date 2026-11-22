import type {
  BuildingTypeId,
  EnvironmentId,
  ModuleLanguage,
  ShopItemKind,
} from './types';

export interface GuideItem {
  id: string;
  title: string;
  summary: string;
}

export interface UrbanGeneratorCopy {
  header: {
    moduleTag: string;
    subtitleStats: string;
  };
  tabs: {
    environment: string;
    singleBuilding: string;
    history: string;
  };
  guide: {
    toggleLabel: string;
    title: string;
    description: string;
    environmentsTab: string;
    buildingsTab: string;
    environments: GuideItem[];
    buildings: GuideItem[];
  };
  envForm: {
    title: string;
    description: string;
    settlementNameLabel: string;
    settlementNamePlaceholder: string;
    defaultSettlementName: string;
    environmentLabel: string;
    environmentPlaceholder: string;
    fanMadeLabel: string;
    fanMadeHint: string;
    generateButton: string;
    regenerateButton: string;
    copyButton: string;
    downloadHtmlButton: string;
    printButton: string;
    filterPlaceholder: string;
    emptyTitle: string;
    emptyBody: string;
  };
  buildingForm: {
    title: string;
    description: string;
    itemCountLabel: string;
    buildingTypeLabel: string;
    buildingTypePlaceholder: string;
    fanMadeLabel: string;
    fanMadeHint: string;
    generateButton: string;
    regenerateButton: string;
    copyButton: string;
    emptyTitle: string;
    emptyBody: string;
    invalidCountToast: string;
    cappedCountNote: string;
  };
  output: {
    settlementPrefix: string;
    buildingsCountLabel: string;
    itemsCountLabel: string;
    fanMadeActive: string;
    officialOnly: string;
    crownUnit: string;
    crownSingular: string;
    perNight: string;
    pricelessLabel: string;
    standardBadge: string;
    fanMadeBadge: string;
    noMatchesFilter: string;
    copiedToast: string;
    copyFailedToast: string;
    printSubtitle: string;
    printSandboxFallbackToast: string;
    htmlDownloadedToast: string;
  };
  history: {
    title: string;
    description: string;
    searchPlaceholder: string;
    environmentsTitle: string;
    buildingsTitle: string;
    emptyTitle: string;
    emptyBody: string;
    openBtn: string;
    duplicateBtn: string;
    deleteBtn: string;
    clearAllBtn: string;
    clearDialogTitle: string;
    clearDialogDesc: string;
    confirmClearBtn: string;
    cancelBtn: string;
    savedAutoBadge: string;
    loadedToast: (label: string) => string;
    duplicatedToast: string;
    deletedToast: string;
    clearedToast: string;
  };
  editor: {
    editBuildingTooltip: string;
    rerollBuildingTooltip: string;
    deleteBuildingTooltip: string;
    addBuildingBtn: string;
    addBuildingTitle: string;
    addBuildingDesc: string;
    buildingTypeLabel: string;
    addRolledBtn: string;
    addEmptyBtn: string;
    editSettlementNameAria: string;
    editDialogTitle: string;
    editDialogDesc: string;
    buildingTitleLabel: string;
    tavernNameLabel: string;
    tavernNamePlaceholder: string;
    lodgingNoteLabel: string;
    lodgingNotePlaceholder: string;
    roomPriceLabel: string;
    itemsSectionTitle: string;
    addItemSectionTitle: string;
    itemNameLabel: string;
    itemNamePlaceholder: string;
    itemKindLabel: string;
    itemPriceLabel: string;
    itemPricePlaceholder: string;
    itemMetaLabel: string;
    itemMetaPlaceholder: string;
    addItemBtn: string;
    noItemsHint: string;
    moveUpTooltip: string;
    moveDownTooltip: string;
    removeItemTooltip: string;
    saveBtn: string;
    cancelBtn: string;
    buildingSavedToast: string;
    buildingAddedToast: string;
    buildingRerolledToast: string;
    buildingRemovedToast: string;
    emptyNewEnvironmentBtn: string;
  };
  itemKinds: Record<ShopItemKind, string>;
  environments: Record<EnvironmentId, string>;
  buildings: Record<BuildingTypeId, string>;
  bridges: {
    title: string;
    humanoidBtn: string;
    rumorBtn: string;
    encounterBtn: string;
  };
}

const EN_COPY: UrbanGeneratorCopy = {
  header: {
    moduleTag: '4 settlement tiers · 9 merchant & civic archetypes',
    subtitleStats: 'Bilingual Continent Gazetteer',
  },
  tabs: {
    environment: 'Full Urban Environment',
    singleBuilding: 'Standalone Building / Shop',
    history: 'History',
  },
  guide: {
    toggleLabel: 'Settlement & Building Guide',
    title: 'How Environments & Shops Are Generated',
    description:
      'Reference rules based on The Witcher TRPG settlement tiers, availability codes, and crafting ranks.',
    environmentsTab: '4 Environments',
    buildingsTab: '9 Building Types',
    environments: [
      {
        id: 'capital',
        title: 'Capital',
        summary:
          'Vast royal or imperial metropolis featuring every merchant archetype, luxury inns, bookshops, tailors, and rare or masterwork wares.',
      },
      {
        id: 'city',
        title: 'City',
        summary:
          'Major fortified trade hub with a wide variety of artisans, quality taverns, bookshops (up to Journeyman spells), and uncommon equipment.',
      },
      {
        id: 'village',
        title: 'Village',
        summary:
          'Rural hamlet with modest supplies, a village smith, basic haberdashery, cheap or infamous taverns, stables, and a local notice board.',
      },
      {
        id: 'fortress',
        title: 'Fortress',
        summary:
          'Military stronghold focused on martial survival: armorer, alchemist, general store (with world map), stables, cheap tavern, and contracts.',
      },
    ],
    buildings: [
      {
        id: 'alchemist',
        title: 'Alchemist',
        summary:
          'Stocks alchemical articles, formulas, and raw ingredients filtered by settlement availability.',
      },
      {
        id: 'armorer',
        title: 'Armorer / Smith',
        summary:
          'Sells weapons, armor, shields, and crafting diagrams up to the local artisan tier.',
      },
      {
        id: 'general',
        title: 'General Store',
        summary:
          'Supplies tools, adventuring gear, containers, clothing, and mount equipment.',
      },
      {
        id: 'bookshop',
        title: 'Bookshop',
        summary:
          'Offers treatises, field notes, crafting diagrams, and magical grimoires (official + optional fan-made spells).',
      },
      {
        id: 'inn',
        title: 'Inns & Lodging',
        summary:
          'Generates named taverns from Infamous to High Class with food/drink menus and nightly lodging rates.',
      },
      {
        id: 'haberdashery',
        title: 'Haberdashery',
        summary:
          'Provides crafting components, leathers, ingots, fabrics, and material diagrams.',
      },
      {
        id: 'tailor',
        title: 'Tailor',
        summary:
          'Stocks clothing, textiles (raw fiber, thread, linen, cotton, silk), light/medium armor, and staff diagrams.',
      },
      {
        id: 'stables',
        title: 'Stables',
        summary:
          'Offers horse tack, barding, saddlebags, and nightly stable stalls (2 crowns).',
      },
      {
        id: 'notice',
        title: 'Notice Board',
        summary:
          'Posts a local monster, bandit, or Scoia’tael contract hook for the party.',
      },
    ],
  },
  envForm: {
    title: 'Generate Complete Settlement',
    description:
      'Choose a settlement scale to roll all local shops, inns, stables, and the town notice board.',
    settlementNameLabel: 'Settlement Name',
    settlementNamePlaceholder: 'e.g. Oxenfurt, Flotsam, Vengerberg…',
    defaultSettlementName: 'Unnamed Settlement',
    environmentLabel: 'Environment Type',
    environmentPlaceholder: 'Select an environment…',
    fanMadeLabel: 'Include Fan-Made Grimoires',
    fanMadeHint: 'Adds community spells to Bookshop rolls',
    generateButton: 'Generate Environment',
    regenerateButton: 'Reroll Environment',
    copyButton: 'Copy Dossier',
    downloadHtmlButton: 'Printable HTML',
    printButton: 'Print',
    filterPlaceholder: 'Filter buildings or items…',
    emptyTitle: 'Ready to chart a settlement',
    emptyBody:
      'Enter a name, select Capital, City, Village, or Fortress, then generate a complete set of merchants and taverns.',
  },
  buildingForm: {
    title: 'Generate Standalone Building',
    description:
      'Roll a single merchant or tavern inventory with a custom number of items.',
    itemCountLabel: 'Number of Items',
    buildingTypeLabel: 'Building Type',
    buildingTypePlaceholder: 'Select a building…',
    fanMadeLabel: 'Include Fan-Made Grimoires',
    fanMadeHint: 'Applicable when rolling a Bookshop',
    generateButton: 'Generate Building',
    regenerateButton: 'Reroll Building',
    copyButton: 'Copy Inventory',
    emptyTitle: 'Ready to stock a building',
    emptyBody:
      'Specify how many items to generate, pick any shop or tavern tier, and roll its inventory.',
    invalidCountToast: 'Please enter an item count of at least 1.',
    cappedCountNote: 'Inventory capped at available unique stock',
  },
  output: {
    settlementPrefix: 'Settlement Dossier',
    buildingsCountLabel: 'locations',
    itemsCountLabel: 'entries',
    fanMadeActive: 'Fan-made grimoires enabled',
    officialOnly: 'Official lore only',
    crownUnit: 'crowns',
    crownSingular: 'crown',
    perNight: '/ night',
    pricelessLabel: 'GM Discretion',
    standardBadge: 'Standard',
    fanMadeBadge: 'Fan-Made',
    noMatchesFilter: 'No buildings or items match your current filter.',
    copiedToast: 'Copied to clipboard.',
    copyFailedToast: 'Unable to access clipboard.',
    printSubtitle: 'The Witcher TRPG · Game Master Settlement Dossier',
    printSandboxFallbackToast:
      'Preview iframe blocks direct printing — downloaded printable HTML file instead.',
    htmlDownloadedToast: 'Printable HTML dossier downloaded.',
  },
  history: {
    title: 'Saved Settlements & Buildings History',
    description:
      'Every generated or manually edited settlement and standalone shop is persisted automatically in your browser.',
    searchPlaceholder: 'Search saved settlements, taverns, or building types…',
    environmentsTitle: 'Saved Urban Environments',
    buildingsTitle: 'Saved Standalone Buildings',
    emptyTitle: 'No urban history yet',
    emptyBody:
      'Generate a settlement or standalone building to archive it here automatically for editing and reuse.',
    openBtn: 'Open / Edit',
    duplicateBtn: 'Duplicate',
    deleteBtn: 'Delete',
    clearAllBtn: 'Clear History',
    clearDialogTitle: 'Clear all urban history?',
    clearDialogDesc:
      'This will permanently remove all saved settlements and standalone buildings from your local history.',
    confirmClearBtn: 'Delete all',
    cancelBtn: 'Cancel',
    savedAutoBadge: 'Auto-saved in history',
    loadedToast: (label) => `Loaded "${label}".`,
    duplicatedToast: 'History entry duplicated.',
    deletedToast: 'Entry removed from history.',
    clearedToast: 'Urban history cleared.',
  },
  editor: {
    editBuildingTooltip: 'Edit building & items manually',
    rerollBuildingTooltip: 'Reroll this building only',
    deleteBuildingTooltip: 'Remove building from settlement',
    addBuildingBtn: 'Add Building',
    addBuildingTitle: 'Add a Building to Settlement',
    addBuildingDesc:
      'Choose a building type to roll automatically for this settlement scale or create an empty card to fill manually.',
    buildingTypeLabel: 'Building Type',
    addRolledBtn: 'Roll & Add',
    addEmptyBtn: 'Add Empty',
    editSettlementNameAria: 'Edit settlement name',
    editDialogTitle: 'Edit Building & Inventory',
    editDialogDesc:
      'Customize the establishment name, lodging details, and add, edit, reorder, or remove individual items.',
    buildingTitleLabel: 'Establishment Title',
    tavernNameLabel: 'Tavern / Shop Name (optional)',
    tavernNamePlaceholder: 'e.g. The Passiflora, The Golden Sturgeon…',
    lodgingNoteLabel: 'Lodging / Service Note (optional)',
    lodgingNotePlaceholder: 'e.g. 12 crowns / night · Private bath…',
    roomPriceLabel: 'Nightly Room Price (crowns)',
    itemsSectionTitle: 'Inventory / Menu / Contracts',
    addItemSectionTitle: 'Add Custom Entry',
    itemNameLabel: 'Name / Contract',
    itemNamePlaceholder: 'e.g. Swallow Potion, Contract: Leshen…',
    itemKindLabel: 'Category',
    itemPriceLabel: 'Price (crowns)',
    itemPricePlaceholder: 'Empty = GM',
    itemMetaLabel: 'Note / School (optional)',
    itemMetaPlaceholder: 'e.g. Novice · Mixed Elements',
    addItemBtn: 'Add Entry',
    noItemsHint: 'No items in this building yet. Add custom entries below.',
    moveUpTooltip: 'Move up',
    moveDownTooltip: 'Move down',
    removeItemTooltip: 'Remove entry',
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
    buildingSavedToast: 'Building updated and saved to history.',
    buildingAddedToast: 'Building added to settlement.',
    buildingRerolledToast: 'Building inventory rerolled.',
    buildingRemovedToast: 'Building removed from settlement.',
    emptyNewEnvironmentBtn: 'Create Empty Settlement',
  },
  itemKinds: {
    article: 'Alchemy Article',
    formula: 'Formula',
    component: 'Component',
    weapon: 'Weapon',
    armor: 'Armor',
    diagram: 'Diagram',
    tool: 'Tool',
    general: 'Gear',
    container: 'Container',
    clothing: 'Clothing',
    mountGear: 'Mount Gear',
    spellbook: 'Grimoire',
    book: 'Book',
    food: 'Food & Drink',
    lodging: 'Lodging',
    contract: 'Contract',
  },
  environments: {
    0: 'Capital',
    1: 'City',
    2: 'Village',
    3: 'Fortress',
  },
  buildings: {
    Alchemist: 'Alchemist',
    Armorer_standard: 'Armorer',
    Armorer_village: 'Village Smith',
    General_shop: 'General Store',
    Bookshop: 'Bookshop',
    Inn_straw_bedding: 'Straw Bedding',
    Inn_stables: 'Stables',
    Inn_high_class: 'High-Class Inn',
    Inn_standard_quality: 'Standard-Quality Inn',
    Inn_medium_quality: 'Medium-Quality Inn',
    Inn_cheap_quality: 'Cheap Inn',
    Inn_infamous_quality: 'Infamous Tavern',
    Haberdashery: 'Haberdashery',
    Tailoring: 'Tailor',
    Notice_board: 'Notice Board',
  },
  bridges: {
    title: 'Local Scenes & Encounters',
    humanoidBtn: 'Patrol / Faction',
    rumorBtn: 'Rumor / Quest / NPC',
    encounterBtn: 'Modular Encounter',
  },
};

const FR_COPY: UrbanGeneratorCopy = {
  header: {
    moduleTag: '4 échelles urbaines · 9 types d’établissements',
    subtitleStats: 'Atlas urbain bilingue',
  },
  tabs: {
    environment: 'Environnement urbain complet',
    singleBuilding: 'Bâtiment / Commerce isolé',
    history: 'Historique',
  },
  guide: {
    toggleLabel: 'Guide des environnements & bâtiments',
    title: 'Règles de génération urbaine',
    description:
      'Référentiel basé sur les disponibilités (Omniprésent, Courant, Peu courant, Rare) et rangs d’artisanat de The Witcher TRPG.',
    environmentsTab: '4 Environnements',
    buildingsTab: '9 Types de bâtiments',
    environments: [
      {
        id: 'capital',
        title: 'Capitale',
        summary:
          'Vaste métropole royale ou impériale regroupant tous les corps de métiers, auberges de luxe, librairies, tailleurs et marchandises rares ou de maître.',
      },
      {
        id: 'city',
        title: 'Cité',
        summary:
          'Grande place marchande fortifiée offrant de nombreux artisans, des auberges de qualité, une librairie (jusqu’aux sorts Compagnon) et de l’équipement peu courant.',
      },
      {
        id: 'village',
        title: 'Village',
        summary:
          'Bourg rural modeste doté d’un forgeron de village, d’une mercerie basique, d’auberges bon marché ou douteuses, d’écuries et d’un tableau d’affichage.',
      },
      {
        id: 'fortress',
        title: 'Forteresse',
        summary:
          'Place forte militaire centrée sur la garnison : armurier complet, alchimiste, magasin (avec carte du monde), écuries, taverne bon marché et contrats.',
      },
    ],
    buildings: [
      {
        id: 'alchemist',
        title: 'Alchimiste',
        summary:
          'Propose articles alchimiques, formules et composants bruts filtrés selon la disponibilité locale.',
      },
      {
        id: 'armorer',
        title: 'Armurier',
        summary:
          'Vend armes, armures, boucliers et schémas d’artisanat adaptés au niveau de la localité.',
      },
      {
        id: 'general',
        title: 'Magasin général',
        summary:
          'Fournit outils, matériel d’aventure, contenants, vêtements et équipement de monture.',
      },
      {
        id: 'bookshop',
        title: 'Librairie',
        summary:
          'Propose ouvrages, notes, schémas et grimoires magiques (sorts officiels + option fan-made).',
      },
      {
        id: 'inn',
        title: 'Auberges & Logements',
        summary:
          'Tire des tavernes nommées (de Douteuse à De Luxe) avec carte de restauration et tarifs de nuitée.',
      },
      {
        id: 'haberdashery',
        title: 'Mercerie',
        summary:
          'Fournit matériaux d’artisanat, cuirs, lingots, textiles et schémas de matériaux.',
      },
      {
        id: 'tailor',
        title: 'Tailleur',
        summary:
          'Vend tenues, étoffes de base (fibre, fil, lin, coton, soie), armures légères/intermédiaires et schémas de bâtons.',
      },
      {
        id: 'stables',
        title: 'Écurie',
        summary:
          'Propose harnachements, bardes, sacoches de selle et location de box d’écurie (2 couronnes / nuit).',
      },
      {
        id: 'notice',
        title: 'Tableau d’affichage',
        summary:
          'Affiche un contrat de chasse ou une prime locale (monstres, bandits, Scoia’tael).',
      },
    ],
  },
  envForm: {
    title: 'Générer un environnement complet',
    description:
      'Choisissez une taille de localité pour tirer automatiquement commerces, auberges, écuries et contrats.',
    settlementNameLabel: 'Nom de la localité',
    settlementNamePlaceholder: 'Ex. Oxenfurt, Flotsam, Vengerberg…',
    defaultSettlementName: 'Localité sans nom',
    environmentLabel: 'Type d’environnement',
    environmentPlaceholder: 'Sélectionner un environnement…',
    fanMadeLabel: 'Inclure les grimoires Fan-Made',
    fanMadeHint: 'Ajoute les sorts communautaires aux librairies',
    generateButton: 'Générer l’environnement',
    regenerateButton: 'Relancer le tirage',
    copyButton: 'Copier le dossier',
    downloadHtmlButton: 'Fiche imprimable (.html)',
    printButton: 'Imprimer',
    filterPlaceholder: 'Filtrer un bâtiment ou un objet…',
    emptyTitle: 'Prêt à dresser une localité',
    emptyBody:
      'Saisissez un nom, choisissez Capitale, Cité, Village ou Forteresse, puis générez l’ensemble des établissements.',
  },
  buildingForm: {
    title: 'Générer un bâtiment isolé',
    description:
      'Tirez le stock d’un commerce ou d’une auberge avec un nombre précis d’articles.',
    itemCountLabel: 'Nombre d’objets',
    buildingTypeLabel: 'Type de bâtiment',
    buildingTypePlaceholder: 'Sélectionner un bâtiment…',
    fanMadeLabel: 'Inclure les grimoires Fan-Made',
    fanMadeHint: 'Pris en compte pour la Librairie',
    generateButton: 'Générer le bâtiment',
    regenerateButton: 'Relancer le tirage',
    copyButton: 'Copier l’inventaire',
    emptyTitle: 'Prêt à approvisionner un établissement',
    emptyBody:
      'Indiquez le nombre d’objets souhaité, sélectionnez un bâtiment et lancez la génération.',
    invalidCountToast: 'Veuillez indiquer au moins 1 objet.',
    cappedCountNote: 'Stock plafonné au maximum d’objets uniques disponibles',
  },
  output: {
    settlementPrefix: 'Dossier urbain',
    buildingsCountLabel: 'établissements',
    itemsCountLabel: 'entrées',
    fanMadeActive: 'Grimoires fan-made inclus',
    officialOnly: 'Contenu officiel uniquement',
    crownUnit: 'couronnes',
    crownSingular: 'couronne',
    perNight: '/ nuit',
    pricelessLabel: 'À fixer (MJ)',
    standardBadge: 'Standard',
    fanMadeBadge: 'Fan-Made',
    noMatchesFilter: 'Aucun établissement ou objet ne correspond au filtre.',
    copiedToast: 'Copié dans le presse-papiers.',
    copyFailedToast: 'Impossible d’accéder au presse-papiers.',
    printSubtitle: 'The Witcher TRPG · Dossier urbain du Maître du Jeu',
    printSandboxFallbackToast:
      'L’aperçu intégré bloque l’impression directe : la fiche HTML imprimable a été téléchargée.',
    htmlDownloadedToast: 'Fiche HTML imprimable téléchargée.',
  },
  history: {
    title: 'Historique des localités & bâtiments',
    description:
      'Chaque environnement et bâtiment généré ou modifié manuellement est sauvegardé automatiquement dans votre navigateur.',
    searchPlaceholder: 'Rechercher une localité, une auberge ou un commerce…',
    environmentsTitle: 'Environnements urbains sauvegardés',
    buildingsTitle: 'Bâtiments isolés sauvegardés',
    emptyTitle: 'Aucun historique urbain',
    emptyBody:
      'Générez une localité ou un bâtiment isolé pour qu’il apparaisse ici automatiquement et puisse être modifié à tout moment.',
    openBtn: 'Ouvrir / Éditer',
    duplicateBtn: 'Dupliquer',
    deleteBtn: 'Supprimer',
    clearAllBtn: 'Vider l’historique',
    clearDialogTitle: 'Effacer tout l’historique urbain ?',
    clearDialogDesc:
      'Cette action supprimera définitivement toutes les localités et bâtiments isolés enregistrés.',
    confirmClearBtn: 'Tout supprimer',
    cancelBtn: 'Annuler',
    savedAutoBadge: 'Enregistré dans l’historique',
    loadedToast: (label) => `« ${label} » chargé.`,
    duplicatedToast: 'Entrée dupliquée.',
    deletedToast: 'Entrée supprimée de l’historique.',
    clearedToast: 'Historique urbain vidé.',
  },
  editor: {
    editBuildingTooltip: 'Modifier manuellement le bâtiment et son stock',
    rerollBuildingTooltip: 'Relancer uniquement ce bâtiment',
    deleteBuildingTooltip: 'Retirer ce bâtiment de la localité',
    addBuildingBtn: 'Ajouter un bâtiment',
    addBuildingTitle: 'Ajouter un établissement à la localité',
    addBuildingDesc:
      'Choisissez un type de bâtiment pour le tirer automatiquement selon la taille de la ville ou créer une fiche vierge à remplir manuellement.',
    buildingTypeLabel: 'Type de bâtiment',
    addRolledBtn: 'Tirer & ajouter',
    addEmptyBtn: 'Ajouter vide',
    editSettlementNameAria: 'Modifier le nom de la localité',
    editDialogTitle: 'Éditer le bâtiment & le stock',
    editDialogDesc:
      'Modifiez le nom de l’établissement, les notes d’hébergement et ajoutez, éditez, réordonnez ou supprimez chaque entrée.',
    buildingTitleLabel: 'Titre de l’établissement',
    tavernNameLabel: 'Nom de l’auberge / enseigne (optionnel)',
    tavernNamePlaceholder: 'Ex. Le Passiflore, L’Esturgeon d’Or…',
    lodgingNoteLabel: 'Note d’hébergement / service (optionnel)',
    lodgingNotePlaceholder: 'Ex. 12 couronnes / nuit · Bain privé…',
    roomPriceLabel: 'Tarif chambre / nuit (couronnes)',
    itemsSectionTitle: 'Inventaire / Carte / Contrats',
    addItemSectionTitle: 'Ajouter une entrée manuelle',
    itemNameLabel: 'Nom / Contrat',
    itemNamePlaceholder: 'Ex. Hirondelle, Contrat : Leshen…',
    itemKindLabel: 'Catégorie',
    itemPriceLabel: 'Prix (couronnes)',
    itemPricePlaceholder: 'Vide = MJ',
    itemMetaLabel: 'Note / École (optionnel)',
    itemMetaPlaceholder: 'Ex. Novice · Éléments mixtes',
    addItemBtn: 'Ajouter l’entrée',
    noItemsHint: 'Aucun article dans ce bâtiment. Ajoutez des entrées ci-dessous.',
    moveUpTooltip: 'Monter',
    moveDownTooltip: 'Descendre',
    removeItemTooltip: 'Supprimer l’entrée',
    saveBtn: 'Enregistrer',
    cancelBtn: 'Annuler',
    buildingSavedToast: 'Bâtiment mis à jour et enregistré dans l’historique.',
    buildingAddedToast: 'Bâtiment ajouté à la localité.',
    buildingRerolledToast: 'Stock du bâtiment relancé.',
    buildingRemovedToast: 'Bâtiment retiré de la localité.',
    emptyNewEnvironmentBtn: 'Créer une localité vierge',
  },
  itemKinds: {
    article: 'Article',
    formula: 'Formule',
    component: 'Composant',
    weapon: 'Arme',
    armor: 'Armure',
    diagram: 'Schéma',
    tool: 'Outil',
    general: 'Général',
    container: 'Contenant',
    clothing: 'Vêtement',
    mountGear: 'Monture',
    spellbook: 'Grimoire',
    book: 'Livre',
    food: 'Nourriture & Boisson',
    lodging: 'Logement',
    contract: 'Contrat',
  },
  environments: {
    0: 'Capitale',
    1: 'Cité',
    2: 'Village',
    3: 'Forteresse',
  },
  buildings: {
    Alchemist: 'Alchimiste',
    Armorer_standard: 'Armurier',
    Armorer_village: 'Armurier de village',
    General_shop: 'Magasin général',
    Bookshop: 'Librairie',
    Inn_straw_bedding: 'Paillasse au sol',
    Inn_stables: 'Écurie',
    Inn_high_class: 'Auberge de luxe',
    Inn_standard_quality: 'Auberge de qualité',
    Inn_medium_quality: 'Auberge correcte',
    Inn_cheap_quality: 'Auberge bon marché',
    Inn_infamous_quality: 'Auberge douteuse',
    Haberdashery: 'Mercerie',
    Tailoring: 'Tailleur',
    Notice_board: 'Tableau d’affichage',
  },
  bridges: {
    title: 'Scènes & Rencontres locales',
    humanoidBtn: 'Patrouille / Faction',
    rumorBtn: 'Rumeur / Quête / PNJ',
    encounterBtn: 'Rencontre modulaire',
  },
};

export function getUrbanGeneratorCopy(lang: ModuleLanguage): UrbanGeneratorCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
