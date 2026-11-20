import type { ModuleLanguage } from './types';

export interface TravelManagerCopy {
  header: {
    moduleTag: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    availableCountLabel: string;
    comingSoonCountLabel: string;
    totalCountLabel: string;
    searchPlaceholder: string;
    importMapBtn: string;
    filters: {
      all: string;
      available: string;
      comingSoon: string;
    };
  };
  card: {
    statusAvailable: string;
    statusComingSoon: string;
    customBadge: string;
    creatorLabel: string;
    sourceLinkLabel: string;
    sourceTooltip: string;
    openMapBtn: string;
    disabledMapBtn: string;
    editCustomMapLabel: string;
    deleteCustomMapLabel: string;
    deleteConfirmTitle: string;
    deleteConfirmBody: string;
    deleteConfirmBtn: string;
    cancelBtn: string;
    deletedToast: string;
  };
  customMapDialog: {
    createTitle: string;
    editTitle: string;
    subtitle: string;
    imageLabel: string;
    imageRequiredHint: string;
    imageReplaceHint: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    changeImageBtn: string;
    dimensionsLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    subtitleLabel: string;
    subtitlePlaceholder: string;
    regionTagLabel: string;
    regionTagPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    scaleKmLabel: string;
    scaleHintLabel: string;
    scaleHintPlaceholder: string;
    creatorLabel: string;
    creatorPlaceholder: string;
    sourceUrlLabel: string;
    sourceUrlPlaceholder: string;
    accentLabel: string;
    cancelBtn: string;
    createSubmitBtn: string;
    editSubmitBtn: string;
    savingBtn: string;
    validationNameRequired: string;
    validationImageRequired: string;
    validationInvalidImage: string;
    validationInvalidUrl: string;
    validationStorageError: string;
    createdToast: string;
    updatedToast: string;
  };
  emptySearch: {
    title: string;
    description: string;
    resetBtn: string;
  };
  sources: {
    title: string;
    subtitle: string;
    creatorsHeading: string;
    techHeading: string;
    mapPrefix: string;
    byWord: string;
  };
  workspace: {
    backToHubBtn: string;
    selectedBadge: string;
    creatorLabel: string;
    scaleLabel: string;
    openSourceBtn: string;
    missingImageTitle: string;
    missingImageDescription: string;
    missingImagePathHint: string;
    loadTestNotice: string;
    encountersBridgeTitle: string;
    encountersBridgeDesc: string;
    rollMonsterBtn: string;
    rollHumanoidBtn: string;
    rollModularBtn: string;
    calendarBridgeTitle: string;
    calendarBridgeNoRouteDesc: string;
    advanceCalendarBtn: (days: number) => string;
    openCalendarBtn: string;
    calendarAdvancedToast: (days: number, dateStr: string, weatherStr: string) => string;
    calendarHealedToast: (count: number) => string;
    calendarCraftedToast: (names: string) => string;
  };
  canvas: {
    toolsLabel: string;
    toolPan: string;
    toolAddWaypoint: string;
    toolCalibrate: string;
    waypointTypeLabel: string;
    zoomInTooltip: string;
    zoomOutTooltip: string;
    resetViewBtn: string;
    fullscreenEnter: string;
    fullscreenExit: string;
    scaleDefaultBadge: string;
    scaleCustomBadge: string;
    resetCalibrationBtn: string;
    calibrationStep1: string;
    calibrationStep2: string;
    calibrationCancel: string;
    calibrationDialogTitle: string;
    calibrationDialogDesc: string;
    calibrationKmLabel: string;
    calibrationConfirmBtn: string;
    calibrationSuccessToast: string;
    calibrationInvalidToast: string;
    calibrationResetToast: string;
    panHint: string;
    addHint: string;
    segmentClickTooltip: string;
    curveHandleTooltip: string;
    curveAddedToast: string;
    styleBtn: string;
    styleTitle: string;
    strokeWidthLabel: string;
    landColorLabel: string;
    seaColorLabel: string;
    customColorTooltip: string;
    resetStyleBtn: string;
  };
  waypoints: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyHint: string;
    clearAllBtn: string;
    clearConfirmTitle: string;
    clearConfirmBody: string;
    clearConfirmBtn: string;
    cancelBtn: string;
    clearedToast: string;
    stopDaysBadge: string;
    legLabel: string;
    editTitle: string;
    editDesc: string;
    nameLabel: string;
    typeLabel: string;
    stopDaysLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    saveBtn: string;
    moveUpLabel: string;
    moveDownLabel: string;
    editLabel: string;
    deleteLabel: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    transportLabel: string;
    paceLabel: string;
    modifiersBtn: string;
    clearModifiersBtn: string;
    hoursPerDayLabel: string;
    hoursSuffix: string;
    partySizeLabel: string;
    mountCountLabel: string;
    rationsPerDayLabel: string;
    kpiDistance: string;
    kpiDuration: string;
    kpiTravelOnly: string;
    kpiStopovers: string;
    kpiSpeed: string;
    kpiRations: string;
    kpiWater: string;
    kpiFodder: string;
    noMountsNeeded: string;
    segmentsTitle: string;
    segmentsHint: string;
    noSegmentsHint: string;
    tableLeg: string;
    tableRoute: string;
    tableConditions: string;
    tableDistance: string;
    tableTime: string;
    tableActions: string;
    addCurveBtn: string;
    editSectionBtn: string;
    curvesBadge: string;
    customSectionBadge: string;
  };
  sectionEditor: {
    titlePrefix: string;
    subtitle: string;
    inheritGlobalOption: string;
    transportLabel: string;
    paceLabel: string;
    modifiersTitle: string;
    clearModifiersBtn: string;
    landGroupTitle: string;
    seaGroupTitle: string;
    landDisabledForSeaNote: string;
    seaDisabledForLandNote: string;
    curvesSectionTitle: string;
    curvesCountLabel: string;
    straightLineLabel: string;
    addCurvePointBtn: string;
    removeLastCurveBtn: string;
    clearCurvesBtn: string;
    liveSpeedLabel: string;
    liveDurationLabel: string;
    appearanceSectionTitle: string;
    sectionColorLabel: string;
    sectionStrokeWidthLabel: string;
    useGlobalColorBtn: string;
    useGlobalWidthBtn: string;
    resetSectionBtn: string;
    closeBtn: string;
  };
}

const FR_COPY: TravelManagerCopy = {
  header: {
    moduleTag: 'HUB CARTOGRAPHIQUE',
  },
  hero: {
    eyebrow: 'THE WITCHER TRPG · ATLAS INTERACTIF',
    title: 'Hub des cartes du Monde Connu',
    tagline:
      'Cartes interactives non officielles de The Witcher TRPG — sélectionnez une région pour préparer vos itinéraires et consulter les sources des cartographes.',
    availableCountLabel: 'cartes actives',
    comingSoonCountLabel: 'à venir',
    totalCountLabel: 'régions répertoriées',
    searchPlaceholder: 'Filtrer par région ou cartographe…',
    importMapBtn: 'Importer une carte',
    filters: {
      all: 'Toutes',
      available: 'Disponibles',
      comingSoon: 'À venir',
    },
  },
  card: {
    statusAvailable: 'Disponible',
    statusComingSoon: 'À venir',
    customBadge: 'Importée',
    creatorLabel: 'Carte par',
    sourceLinkLabel: 'Source originale',
    sourceTooltip: 'Ouvrir la source originale du créateur dans un nouvel onglet',
    openMapBtn: 'Ouvrir la carte',
    disabledMapBtn: 'Carte à venir',
    editCustomMapLabel: 'Modifier les informations de la carte',
    deleteCustomMapLabel: 'Supprimer cette carte personnalisée',
    deleteConfirmTitle: 'Supprimer cette carte personnalisée ?',
    deleteConfirmBody:
      'La carte importée et tous les points de passage tracés dessus seront définitivement supprimés de votre navigateur.',
    deleteConfirmBtn: 'Supprimer la carte',
    cancelBtn: 'Annuler',
    deletedToast: 'Carte personnalisée supprimée.',
  },
  customMapDialog: {
    createTitle: 'Importer une carte personnalisée',
    editTitle: 'Modifier la carte personnalisée',
    subtitle:
      'Ajoutez votre propre image de carte (WebP, PNG, JPG…) avec sa description et une échelle initiale. Stockée localement dans votre navigateur.',
    imageLabel: 'Fichier image de la carte',
    imageRequiredHint: 'Obligatoire · PNG, JPG, WebP, AVIF ou SVG',
    imageReplaceHint: 'Optionnel en modification · laissez vide pour conserver l’image actuelle',
    dropzoneTitle: 'Cliquez ou glissez votre carte ici',
    dropzoneSubtitle: 'Dimensions réelles détectées automatiquement pour des calculs exacts.',
    changeImageBtn: 'Changer d’image',
    dimensionsLabel: 'Résolution détectée',
    nameLabel: 'Nom de la carte',
    namePlaceholder: 'Ex. Côte de Cidaris / Royaume maison…',
    subtitleLabel: 'Sous-titre / Zone couverte',
    subtitlePlaceholder: 'Ex. Terres côtières, îles et routes commerciales',
    regionTagLabel: 'Étiquette d’échelle / Badge',
    regionTagPlaceholder: 'Ex. Carte régionale',
    descriptionLabel: 'Description',
    descriptionPlaceholder:
      'Décrivez la région, le contexte de campagne ou les repères importants…',
    scaleKmLabel: 'Largeur estimée (km)',
    scaleHintLabel: 'Indication d’échelle (optionnelle)',
    scaleHintPlaceholder: 'Ex. Trajets côtiers · 1 à 5 jours',
    creatorLabel: 'Créateur / Cartographe',
    creatorPlaceholder: 'Ex. MJ / Campagne perso',
    sourceUrlLabel: 'Lien source externe (optionnel)',
    sourceUrlPlaceholder: 'https://…',
    accentLabel: 'Couleur d’accent de la carte',
    cancelBtn: 'Annuler',
    createSubmitBtn: 'Importer la carte',
    editSubmitBtn: 'Enregistrer les modifications',
    savingBtn: 'Enregistrement…',
    validationNameRequired: 'Veuillez indiquer un nom pour la carte.',
    validationImageRequired: 'Veuillez sélectionner un fichier image pour la carte.',
    validationInvalidImage: 'Impossible de lire ce fichier image. Vérifiez son format.',
    validationInvalidUrl: 'L’URL source doit commencer par http:// ou https://.',
    validationStorageError: 'Erreur lors de la sauvegarde locale de la carte.',
    createdToast: 'Carte personnalisée importée et prête à l’emploi !',
    updatedToast: 'Carte personnalisée mise à jour.',
  },
  emptySearch: {
    title: 'Aucune carte trouvée',
    description:
      'Aucune région ou aucun cartographe ne correspond à votre filtre actuel.',
    resetBtn: 'Réinitialiser les filtres',
  },
  sources: {
    title: 'Sources, Cartographes & Crédits',
    subtitle:
      'Attribution complète des créateurs communautaires et des références techniques à l’origine de cet atlas.',
    creatorsHeading: 'Cartographes & sources des cartes',
    techHeading: 'Inspirations & outils cartographiques',
    mapPrefix: 'Carte',
    byWord: 'par',
  },
  workspace: {
    backToHubBtn: 'Retour au hub des cartes',
    selectedBadge: 'CARTE INTERACTIVE',
    creatorLabel: 'Cartographe',
    scaleLabel: 'Échelle estimée',
    openSourceBtn: 'Voir la carte source',
    missingImageTitle: 'Fichier image local non encore ajouté pour cette région',
    missingImageDescription:
      'La carte interactive fonctionne déjà dès qu’une image est déposée dans le dossier des cartes du module (comme continent.webp). Vous pouvez consulter la source originale ou revenir au hub.',
    missingImagePathHint: 'Emplacement attendu :',
    loadTestNotice: 'Astuce : glissez les marqueurs à tout moment pour ajuster un tracé.',
    encountersBridgeTitle: 'Rencontres & péripéties sur la route',
    encountersBridgeDesc:
      'Générez instantanément une menace, une patrouille ou un événement de voyage pendant ce trajet.',
    rollMonsterBtn: 'Tirer un monstre',
    rollHumanoidBtn: 'Tirer un humain / faction',
    rollModularBtn: 'Rencontre modulaire',
    calendarBridgeTitle: 'Calendrier du Continent & Météo du trajet',
    calendarBridgeNoRouteDesc:
      'Placez au moins 2 points de passage sur la carte pour faire avancer automatiquement le calendrier de campagne sur la durée du trajet.',
    advanceCalendarBtn: (days) => `Avancer le calendrier (+${days} j)`,
    openCalendarBtn: 'Ouvrir Calendrier & Récup.',
    calendarAdvancedToast: (days, dateStr, weatherStr) =>
      `Calendrier avancé de ${days} j → ${dateStr} · Météo : ${weatherStr}`,
    calendarHealedToast: (count) =>
      `${count} PJ ont récupéré des PV durant le trajet (⌊RÉC÷2⌋/j).`,
    calendarCraftedToast: (names) => `Artisanat de camp terminé : ${names}`,
  },
  canvas: {
    toolsLabel: 'Outil actif',
    toolPan: 'Déplacer',
    toolAddWaypoint: 'Placer point',
    toolCalibrate: 'Calibrer échelle',
    waypointTypeLabel: 'Type à placer',
    zoomInTooltip: 'Zoomer',
    zoomOutTooltip: 'Dézoomer',
    resetViewBtn: 'Ajuster',
    fullscreenEnter: 'Plein écran',
    fullscreenExit: 'Quitter plein écran',
    scaleDefaultBadge: 'Échelle par défaut',
    scaleCustomBadge: 'Échelle calibrée',
    resetCalibrationBtn: 'Réinitialiser l’échelle',
    calibrationStep1:
      'Calibration (1/2) : cliquez sur le premier point de référence sur la carte.',
    calibrationStep2:
      'Calibration (2/2) : cliquez sur le second point de référence pour mesurer le segment.',
    calibrationCancel: 'Annuler',
    calibrationDialogTitle: 'Calibrer l’échelle de la carte',
    calibrationDialogDesc:
      'Indiquez la distance réelle en kilomètres séparant les deux points que vous venez de tracer sur la carte.',
    calibrationKmLabel: 'Distance réelle (km)',
    calibrationConfirmBtn: 'Appliquer l’échelle',
    calibrationSuccessToast: 'Échelle calibrée et sauvegardée pour cette carte.',
    calibrationInvalidToast:
      'Veuillez saisir une distance valide supérieure à 0 km.',
    calibrationResetToast: 'Échelle réinitialisée sur l’estimation par défaut.',
    panHint:
      'Glissez pour déplacer · Molette pour zoomer · Cliquez sur un badge de distance pour modifier la section ou déplacez les points de courbe.',
    addHint:
      'Cliquez sur la carte pour placer un jalon (ville, étape ou bivouac) ou sur un badge de distance pour configurer la section.',
    segmentClickTooltip: 'Cliquer pour configurer cette section ou ajouter des courbes',
    curveHandleTooltip: 'Glisser pour courber le tracé (double-clic pour retirer)',
    curveAddedToast: 'Point de courbe ajouté — glissez-le sur la carte pour épouser le tracé.',
    styleBtn: 'Tracé',
    styleTitle: 'Apparence du tracé',
    strokeWidthLabel: 'Épaisseur du trait',
    landColorLabel: 'Couleur terrestre',
    seaColorLabel: 'Couleur navigation',
    customColorTooltip: 'Choisir une couleur personnalisée',
    resetStyleBtn: 'Réinitialiser le style',
  },
  waypoints: {
    title: 'Points de passage',
    subtitle: 'Villes, étapes et bivouacs tracés dans l’ordre du trajet.',
    emptyTitle: 'Aucun point de passage',
    emptyHint:
      'Activez l’outil « Placer point » puis cliquez sur la carte pour débuter votre itinéraire.',
    clearAllBtn: 'Tout effacer',
    clearConfirmTitle: 'Effacer tout l’itinéraire ?',
    clearConfirmBody:
      'Tous les points de passage tracés sur cette carte seront supprimés.',
    clearConfirmBtn: 'Confirmer la suppression',
    cancelBtn: 'Annuler',
    clearedToast: 'Itinéraire effacé.',
    stopDaysBadge: 'j de halte',
    legLabel: 'Étape',
    editTitle: 'Modifier le point de passage',
    editDesc:
      'Personnalisez le nom, la catégorie, les jours de halte et vos notes de MJ.',
    nameLabel: 'Nom du lieu',
    typeLabel: 'Catégorie',
    stopDaysLabel: 'Jours de halte / repos sur place',
    notesLabel: 'Notes de voyage (auberge, péage, danger…)',
    notesPlaceholder: 'Ex. Auberge des Sept Chats, passe de contrôle…',
    saveBtn: 'Enregistrer',
    moveUpLabel: 'Monter',
    moveDownLabel: 'Descendre',
    editLabel: 'Modifier',
    deleteLabel: 'Supprimer',
  },
  calculator: {
    title: 'Calculateur de trajet & rations',
    subtitle:
      'Réglages globaux du groupe et personnalisation indépendante de chaque section (modificateurs, transport, courbes).',
    transportLabel: 'Monture par défaut',
    paceLabel: 'Allure par défaut',
    modifiersBtn: 'Modificateurs',
    clearModifiersBtn: 'Tout désactiver sur cette section',
    hoursPerDayLabel: 'Heures de trajet / jour',
    hoursSuffix: 'h/j',
    partySizeLabel: 'Voyageurs (PJ/PNJ)',
    mountCountLabel: 'Montures / Bêtes',
    rationsPerDayLabel: 'Rations / pers. / jour',
    kpiDistance: 'Distance totale',
    kpiDuration: 'Durée estimée',
    kpiTravelOnly: 'Trajet effectif',
    kpiStopovers: 'Haltes',
    kpiSpeed: 'Cadence moyenne',
    kpiRations: 'Rations nécessaires',
    kpiWater: 'Eau douce conseillée',
    kpiFodder: 'Fourrage montures',
    noMountsNeeded: 'Sans monture',
    segmentsTitle: 'Détail & configuration par section',
    segmentsHint:
      'Chaque section peut avoir son propre mode (terrestre/navigation), ses modificateurs et une ou plusieurs courbes.',
    noSegmentsHint:
      'Placez au moins 2 points de passage sur la carte pour calculer et personnaliser les sections du trajet.',
    tableLeg: '#',
    tableRoute: 'Section',
    tableConditions: 'Mode & Modificateurs',
    tableDistance: 'Distance',
    tableTime: 'Durée',
    tableActions: 'Actions',
    addCurveBtn: '+ Courbe',
    editSectionBtn: 'Configurer',
    curvesBadge: 'courbe(s)',
    customSectionBadge: 'Personnalisée',
  },
  sectionEditor: {
    titlePrefix: 'Section',
    subtitle:
      'Ajustez le transport, l’allure, les modificateurs de terrain/vent et les points de courbe de ce tronçon.',
    inheritGlobalOption: 'Hériter du réglage global',
    transportLabel: 'Mode de transport sur ce tronçon',
    paceLabel: 'Allure sur ce tronçon',
    modifiersTitle: 'Modificateurs actifs sur cette section',
    clearModifiersBtn: 'Tout désactiver',
    landGroupTitle: 'Terrestre',
    seaGroupTitle: 'Navigation',
    landDisabledForSeaNote: 'Désactivés en mode navigation',
    seaDisabledForLandNote: 'Désactivés en mode terrestre',
    curvesSectionTitle: 'Courbes du tronçon',
    curvesCountLabel: 'point(s) de courbe actif(s)',
    straightLineLabel: 'Ligne droite (aucune courbe)',
    addCurvePointBtn: 'Ajouter une courbe',
    removeLastCurveBtn: 'Retirer la dernière',
    clearCurvesBtn: 'Remettre droit',
    liveSpeedLabel: 'Vitesse effective',
    liveDurationLabel: 'Durée estimée du tronçon',
    appearanceSectionTitle: 'Apparence du tronçon',
    sectionColorLabel: 'Couleur personnalisée du trait',
    sectionStrokeWidthLabel: 'Épaisseur personnalisée du trait',
    useGlobalColorBtn: 'Couleur globale',
    useGlobalWidthBtn: 'Épaisseur globale',
    resetSectionBtn: 'Réinitialiser la section',
    closeBtn: 'Fermer',
  },
};

const EN_COPY: TravelManagerCopy = {
  header: {
    moduleTag: 'CARTOGRAPHY HUB',
  },
  hero: {
    eyebrow: 'THE WITCHER TRPG · INTERACTIVE ATLAS',
    title: 'Known World Maps Hub',
    tagline:
      'Unofficial interactive maps for The Witcher TRPG — select a region to plan routes and credit the community cartographers.',
    availableCountLabel: 'active maps',
    comingSoonCountLabel: 'upcoming',
    totalCountLabel: 'cataloged regions',
    searchPlaceholder: 'Filter by region or cartographer…',
    importMapBtn: 'Import Custom Map',
    filters: {
      all: 'All',
      available: 'Available',
      comingSoon: 'Upcoming',
    },
  },
  card: {
    statusAvailable: 'Available',
    statusComingSoon: 'Upcoming',
    customBadge: 'Custom',
    creatorLabel: 'Map by',
    sourceLinkLabel: 'Original source',
    sourceTooltip: 'Open the creator’s original map source in a new tab',
    openMapBtn: 'Open map',
    disabledMapBtn: 'Coming soon',
    editCustomMapLabel: 'Edit custom map details',
    deleteCustomMapLabel: 'Delete this custom map',
    deleteConfirmTitle: 'Delete custom map?',
    deleteConfirmBody:
      'This imported map and any waypoints plotted on it will be permanently removed from your browser.',
    deleteConfirmBtn: 'Delete map',
    cancelBtn: 'Cancel',
    deletedToast: 'Custom map deleted.',
  },
  customMapDialog: {
    createTitle: 'Import Custom Map',
    editTitle: 'Edit Custom Map',
    subtitle:
      'Upload your own map image (WebP, PNG, JPG…) with description and starting scale. Stored locally in your browser.',
    imageLabel: 'Map image file',
    imageRequiredHint: 'Required · PNG, JPG, WebP, AVIF, or SVG',
    imageReplaceHint: 'Optional when editing · leave unchanged to keep current image',
    dropzoneTitle: 'Click or drop your map image here',
    dropzoneSubtitle: 'Natural pixel dimensions are detected automatically for accurate distances.',
    changeImageBtn: 'Replace image',
    dimensionsLabel: 'Detected resolution',
    nameLabel: 'Map name',
    namePlaceholder: 'e.g. Coast of Cidaris / Homebrew Duchy…',
    subtitleLabel: 'Subtitle / Coverage',
    subtitlePlaceholder: 'e.g. Coastal realms, ports & trade roads',
    regionTagLabel: 'Region / Scale tag',
    regionTagPlaceholder: 'e.g. Regional Map',
    descriptionLabel: 'Description',
    descriptionPlaceholder:
      'Describe the territory, campaign notes, or major landmarks…',
    scaleKmLabel: 'Estimated full width (km)',
    scaleHintLabel: 'Scale hint (optional)',
    scaleHintPlaceholder: 'e.g. Coastal trails · 1–5 day journeys',
    creatorLabel: 'Creator / Cartographer',
    creatorPlaceholder: 'e.g. GM / Homebrew',
    sourceUrlLabel: 'External source URL (optional)',
    sourceUrlPlaceholder: 'https://…',
    accentLabel: 'Card accent color',
    cancelBtn: 'Cancel',
    createSubmitBtn: 'Import map',
    editSubmitBtn: 'Save changes',
    savingBtn: 'Saving…',
    validationNameRequired: 'Please enter a map name.',
    validationImageRequired: 'Please select an image file for the map.',
    validationInvalidImage: 'Unable to decode this image file. Please try another format.',
    validationInvalidUrl: 'Source URL must start with http:// or https://.',
    validationStorageError: 'Could not save custom map in browser storage.',
    createdToast: 'Custom map imported and ready to use!',
    updatedToast: 'Custom map updated.',
  },
  emptySearch: {
    title: 'No matching maps',
    description:
      'No region or cartographer matches your current search or filter.',
    resetBtn: 'Reset filters',
  },
  sources: {
    title: 'Sources, Cartographers & Credits',
    subtitle:
      'Full attribution for every community map creator and technical inspiration behind this atlas.',
    creatorsHeading: 'Cartographers & map sources',
    techHeading: 'Cartographic references & inspirations',
    mapPrefix: 'Map',
    byWord: 'by',
  },
  workspace: {
    backToHubBtn: 'Back to maps hub',
    selectedBadge: 'INTERACTIVE MAP',
    creatorLabel: 'Cartographer',
    scaleLabel: 'Estimated scale',
    openSourceBtn: 'View source map',
    missingImageTitle: 'Local map image not added yet for this region',
    missingImageDescription:
      'The interactive viewport automatically activates as soon as an image file is placed in the module maps directory (like continent.webp). You can view the creator source or return to the hub.',
    missingImagePathHint: 'Expected location:',
    loadTestNotice: 'Tip: drag waypoint pins directly on the map at any time.',
    encountersBridgeTitle: 'Encounters & Scenes Along the Route',
    encountersBridgeDesc:
      'Jump directly to roll a creature, faction patrol, or modular travel complication for this journey.',
    rollMonsterBtn: 'Roll Monster',
    rollHumanoidBtn: 'Roll Human / Faction',
    rollModularBtn: 'Modular Encounter',
    calendarBridgeTitle: 'Continent Calendar & Journey Weather',
    calendarBridgeNoRouteDesc:
      'Plot at least 2 waypoints on the map to automatically advance campaign days, roll arrival weather, and update PC recovery.',
    advanceCalendarBtn: (days) => `Advance Calendar (+${days} d)`,
    openCalendarBtn: 'Open Calendar & Healing',
    calendarAdvancedToast: (days, dateStr, weatherStr) =>
      `Calendar advanced +${days} d → ${dateStr} · Arrival weather: ${weatherStr}`,
    calendarHealedToast: (count) =>
      `${count} PC(s) recovered HP during travel (⌊REC÷2⌋/day).`,
    calendarCraftedToast: (names) => `Camp crafting completed: ${names}`,
  },
  canvas: {
    toolsLabel: 'Active tool',
    toolPan: 'Pan & Inspect',
    toolAddWaypoint: 'Add Waypoint',
    toolCalibrate: 'Calibrate Scale',
    waypointTypeLabel: 'Pin type',
    zoomInTooltip: 'Zoom in',
    zoomOutTooltip: 'Zoom out',
    resetViewBtn: 'Fit view',
    fullscreenEnter: 'Fullscreen',
    fullscreenExit: 'Exit fullscreen',
    scaleDefaultBadge: 'Default scale',
    scaleCustomBadge: 'Calibrated scale',
    resetCalibrationBtn: 'Reset scale',
    calibrationStep1:
      'Calibration (1/2): click the first reference point on the map.',
    calibrationStep2:
      'Calibration (2/2): click the second reference point to measure the line.',
    calibrationCancel: 'Cancel',
    calibrationDialogTitle: 'Calibrate Map Scale',
    calibrationDialogDesc:
      'Enter the real-world distance in kilometers between the two reference points you just marked.',
    calibrationKmLabel: 'Real distance (km)',
    calibrationConfirmBtn: 'Apply scale',
    calibrationSuccessToast: 'Custom map scale calibrated and saved.',
    calibrationInvalidToast:
      'Please enter a valid distance greater than 0 km.',
    calibrationResetToast: 'Scale reset to default regional estimation.',
    panHint:
      'Drag to pan · Wheel to zoom · Click any segment distance badge to edit conditions or drag curve handles.',
    addHint:
      'Click on the map to place a waypoint (city, stage, or bivouac) or click a distance badge to edit that leg.',
    segmentClickTooltip: 'Click to edit this leg’s terrain or curves',
    curveHandleTooltip: 'Drag to bend the route (double-click to remove)',
    curveAddedToast: 'Curve point added — drag it on the map to shape the path.',
    styleBtn: 'Line Style',
    styleTitle: 'Route Appearance',
    strokeWidthLabel: 'Line thickness',
    landColorLabel: 'Land color',
    seaColorLabel: 'Sea color',
    customColorTooltip: 'Pick a custom color',
    resetStyleBtn: 'Reset style',
  },
  waypoints: {
    title: 'Waypoints',
    subtitle: 'Cities, stages, and bivouacs ordered along your journey.',
    emptyTitle: 'No waypoints yet',
    emptyHint:
      'Select “Add Waypoint” and click on the map to start plotting your route.',
    clearAllBtn: 'Clear route',
    clearConfirmTitle: 'Clear all waypoints?',
    clearConfirmBody:
      'All plotted waypoints on this map will be removed.',
    clearConfirmBtn: 'Confirm clear',
    cancelBtn: 'Cancel',
    clearedToast: 'Route cleared.',
    stopDaysBadge: 'd stopover',
    legLabel: 'Leg',
    editTitle: 'Edit Waypoint',
    editDesc:
      'Customize the location name, category, stopover days, and GM notes.',
    nameLabel: 'Location name',
    typeLabel: 'Category',
    stopDaysLabel: 'Stopover / rest days here',
    notesLabel: 'Travel notes (inn, toll, hazard…)',
    notesPlaceholder: 'e.g. Seven Cats Inn, Redanian checkpoint…',
    saveBtn: 'Save changes',
    moveUpLabel: 'Move up',
    moveDownLabel: 'Move down',
    editLabel: 'Edit',
    deleteLabel: 'Delete',
  },
  calculator: {
    title: 'Journey & Rations Calculator',
    subtitle:
      'Global party defaults plus independent per-section modifiers, transport, style, and curves.',
    transportLabel: 'Default Mount / Transport',
    paceLabel: 'Default Pace',
    modifiersBtn: 'Modifiers',
    clearModifiersBtn: 'Clear section modifiers',
    hoursPerDayLabel: 'Travel hours / day',
    hoursSuffix: 'h/d',
    partySizeLabel: 'Travelers (PC/NPC)',
    mountCountLabel: 'Mounts / Pack beasts',
    rationsPerDayLabel: 'Rations / person / day',
    kpiDistance: 'Total Distance',
    kpiDuration: 'Estimated Duration',
    kpiTravelOnly: 'Active travel',
    kpiStopovers: 'Stopovers',
    kpiSpeed: 'Average pace',
    kpiRations: 'Rations needed',
    kpiWater: 'Recommended water',
    kpiFodder: 'Mount fodder',
    noMountsNeeded: 'No mounts',
    segmentsTitle: 'Per-Section Breakdown & Configuration',
    segmentsHint:
      'Each leg can override its transport mode, stack Terrestre/Navigation modifiers, and add one or more curves.',
    noSegmentsHint:
      'Place at least 2 waypoints on the map to compute and customize route sections.',
    tableLeg: '#',
    tableRoute: 'Section',
    tableConditions: 'Mode & Modifiers',
    tableDistance: 'Distance',
    tableTime: 'Duration',
    tableActions: 'Actions',
    addCurveBtn: '+ Curve',
    editSectionBtn: 'Configure',
    curvesBadge: 'curve(s)',
    customSectionBadge: 'Custom',
  },
  sectionEditor: {
    titlePrefix: 'Section',
    subtitle:
      'Configure transport, pace, land/sailing modifiers, and spline curve handles for this leg.',
    inheritGlobalOption: 'Inherit global default',
    transportLabel: 'Section transport mode',
    paceLabel: 'Section travel pace',
    modifiersTitle: 'Active modifiers on this section',
    clearModifiersBtn: 'Clear all',
    landGroupTitle: 'Land (Terrestre)',
    seaGroupTitle: 'Navigation',
    landDisabledForSeaNote: 'Disabled for navigation legs',
    seaDisabledForLandNote: 'Disabled for land legs',
    curvesSectionTitle: 'Route Curves',
    curvesCountLabel: 'active curve point(s)',
    straightLineLabel: 'Straight line (no curves)',
    addCurvePointBtn: 'Add curve point',
    removeLastCurveBtn: 'Remove last',
    clearCurvesBtn: 'Reset to straight',
    liveSpeedLabel: 'Effective speed',
    liveDurationLabel: 'Estimated leg duration',
    appearanceSectionTitle: 'Section Appearance',
    sectionColorLabel: 'Custom leg color',
    sectionStrokeWidthLabel: 'Custom line thickness',
    useGlobalColorBtn: 'Global color',
    useGlobalWidthBtn: 'Global thickness',
    resetSectionBtn: 'Reset section overrides',
    closeBtn: 'Done',
  },
};

export function getTravelManagerCopy(lang: ModuleLanguage): TravelManagerCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
