import type { TranslationDictionary } from '@/src/i18n/types';

/**
 * French translation dictionary for The Witcher TRPG GM Grimoire.
 */
export const fr: TranslationDictionary = {
  app: {
    brand: 'Grimoire du MJ',
    subtitle: 'The Witcher TRPG',
    editionLabel: 'Compagnon de maîtrise · Continent',
    issuesUrl: 'https://github.com/MacNaab/witcher-trpg-table/issues',
    issuesShortLabel: 'Bugs & suggestions',
    issuesNotice: 'Un problème, une erreur ou une suggestion ?',
    issuesDescription:
      'Pour tout bug, erreur de règle ou idée d’amélioration, merci d’utiliser le suivi GitHub Issues :',
    issuesCta: 'github.com/MacNaab/witcher-trpg-table/issues',
  },
  nav: {
    overview: 'Vue d’ensemble',
    groups: {
      world: 'Monde & Exploration',
      combat: 'Combats & Rencontres',
      reference: 'Personnages & Références',
    },
    allCategories: 'Toutes les catégories',
    openCommandPalette: 'Rechercher un outil…',
    searchPlaceholder: 'Rechercher une catégorie ou action…',
    noResults: 'Aucun outil trouvé.',
    quickActions: 'Actions rapides',
    modulesGroup: 'Catégories du MJ',
    shortcutsGroup: 'Raccourcis d’outils',
    bestiaryGroup: 'Bestiaire & Factions (accès direct)',
    codexGroup: 'Codex Artisanat & Alchimie (accès direct)',
    compendiumGroup: 'Équipement & Alchimie (fiche rapide)',
    campaignGroup: 'Données de campagne enregistrées',
    backupAction: 'Sauvegarde & restauration de campagne (JSON)',
    diceAction: 'Lanceur de dés Witcher (1d10! & jets rapides)',
    notesAction: 'Notes de séance & bloc-notes MJ',
    collapseSidebar: 'Basculer la barre latérale',
  },
  controls: {
    language: 'Langue',
    theme: 'Apparence',
    themeDark: 'Obsidienne (Sombre)',
    themeLight: 'Parchemin (Clair)',
    themeSwitched: 'Thème mis à jour',
    languageSwitched: 'Langue modifiée : Français',
    backToOverview: 'Retour à l’accueil',
    openModule: 'Ouvrir',
    moduleSpecs: 'Architecture du module',
    close: 'Fermer',
    readyState: 'Actif',
    pendingState: 'En attente d’intégration',
  },
  overview: {
    heroEyebrow: 'Compagnon de Maître du Jeu · The Witcher TRPG',
    heroTitle: 'Préparez et dirigez vos campagnes sur le Continent',
    heroDescription:
      'Huit outils réunis pour la table de jeu : tables aléatoires et coffres, générateur urbain avec historique, cartes de trajet, rencontres et bestiaire, suivi et simulateur de combat à hub partagé, fiches PJ PDF et Codex Artisanat EN/FR.',
    heroCta: 'Ouvrir le suivi de combat',
    heroSecondary: 'Recherche rapide (Ctrl+K)',
    directoryTitle: 'Outils du Maître du Jeu',
    directorySubtitle:
      'Accédez directement aux espaces de préparation, d’exploration, de combat et de référence du Grimoire.',
    moduleCountLabel: 'modules disponibles',
    resume: {
      title: 'Reprendre la campagne',
      subtitle: 'Accès direct aux données enregistrées sur cet appareil',
      combatActive: 'Combat en cours',
      combatPaused: 'Combat en pause',
      combatCompleted: 'Dernier combat',
      combatRound: (round) => (round === 0 ? 'R0 · Préparation' : `Round ${round}`),
      combatResumeBtn: 'Reprendre',
      hubTitle: 'Hub MJ partagé',
      hubMeta: (pcs, groups, custom) =>
        `${pcs} PJ · ${groups} groupe(s) · ${custom} perso`,
      hubOpenBtn: 'Ouvrir le Hub',
      urbanTitle: 'Dernière localité',
      urbanMeta: (count) => `${count} établissement(s)`,
      urbanOpenBtn: 'Ouvrir la fiche',
      chargenTitle: 'Brouillon de Fiche PJ',
      chargenUntitled: 'Personnage en cours',
      chargenOpenBtn: 'Continuer',
      chronicleTitle: 'Chronologie de campagne',
      chronicleMeta: (events, campaigns) =>
        `${events} événement(s) · ${campaigns} campagne(s)`,
      chronicleOpenBtn: 'Ouvrir la frise',
    },
  },
  dice: {
    buttonLabel: 'Dés',
    title: 'Lanceur de dés rapide · The Witcher TRPG',
    description:
      'Jets de compétence explosifs (1d10! : 10 relance et s’ajoute, 1 relance et se retranche) ou lancers rapides de dégâts.',
    witcherSectionTitle: 'Jet de compétence Witcher (1d10!)',
    modifierLabel: 'Stat + Compétence / Mod.',
    dcLabel: 'SD cible (optionnel)',
    dcOptionalPlaceholder: 'Ex. 14',
    rollWitcherBtn: 'Lancer 1d10!',
    critSuccessBadge: 'Critique (10!)',
    critFailBadge: 'Échec critique (1!)',
    fumbleLabel: (severity) => `Gravité ${severity}`,
    successBadge: 'Réussite',
    failBadge: 'Échec',
    quickDiceTitle: 'Dés de dégâts & jets libres',
    customFormulaLabel: 'Formule personnalisée',
    customFormulaPlaceholder: 'Ex. 3d6+4 ou 2d10-1',
    rollFormulaBtn: 'Lancer',
    invalidFormulaError: 'Formule invalide (ex. 3d6+2, 1d10, 2d6-1).',
    historyTitle: 'Historique de la séance',
    clearHistoryBtn: 'Effacer',
    emptyHistory: 'Aucun lancer pour le moment.',
  },
  notes: {
    buttonLabel: 'Notes',
    title: 'Notes de séance & Bloc-notes MJ',
    description:
      'Bloc-notes persistant sauvegardé localement et inclus automatiquement dans l’export JSON de campagne.',
    sessionTitleLabel: 'Titre de séance / Arc en cours',
    sessionTitlePlaceholder: 'Ex. Séance 12 — L’ombre sur Oxenfurt…',
    contentLabel: 'Notes rapides, PNJ rencontrés, indices & promesses',
    contentPlaceholder:
      'Notez ici les noms improvisés, dettes, blessures persistantes ou pistes de la séance…',
    insertTimestampBtn: 'Horodater',
    copyBtn: 'Copier',
    copiedToast: 'Notes copiées dans le presse-papiers.',
    clearBtn: 'Vider',
    clearConfirmBtn: 'Confirmer l’effacement',
    cancelClearBtn: 'Annuler',
    savedHint: 'Sauvegarde locale automatique',
    charsCount: (count) => `${count} car.`,
  },
  compendium: {
    weaponKind: 'Arme / Outil',
    armorKind: 'Armure',
    shieldKind: 'Bouclier',
    alchemyKind: 'Alchimie',
    gearKind: 'Équipement',
    categoryLabel: 'Catégorie',
    availabilityLabel: 'Disponibilité',
    priceLabel: 'Prix',
    weightLabel: 'Poids',
    damageLabel: 'Dégâts',
    accuracyLabel: 'Précision',
    reliabilityLabel: 'Fiabilité',
    handsLabel: 'Mains',
    rangeLabel: 'Portée',
    concealmentLabel: 'Dissimulation',
    enhancementsLabel: 'Emplacements',
    spLabel: 'Protection (PA)',
    evLabel: 'Encombrement (EV)',
    durationLabel: 'Durée',
    toxicityLabel: 'Toxicité',
    effectLabel: 'Effet & propriétés',
    sourceLabel: 'Source',
    copyBtn: 'Copier la fiche',
    copiedToast: 'Fiche d’équipement copiée.',
    closeBtn: 'Fermer',
  },
  placeholder: {
    statusLabel: 'Emplacement modulaire prêt',
    titleSuffix: 'Espace de travail réservé',
    description:
      'La structure de navigation, le routage et le multilinguisme sont opérationnels. Le contenu fonctionnel de cette catégorie sera raccordé individuellement dans son module dédié.',
    plannedScopeHeading: 'Fonctionnalités incluses',
    architectureNoteTitle: 'Isolation modulaire active',
    architectureNoteBody:
      'Ce module est découplé du reste de l’application afin d’éviter tout conflit lors des prochaines étapes d’intégration.',
    specsDialogTitle: 'Détails techniques du module',
    specsDialogDescription:
      'Informations d’intégration pour le développement individuel de cette catégorie.',
    modulePathLabel: 'Point d’entrée modulaire',
    groupLabel: 'Section',
    shortcutLabel: 'Raccourci clavier',
  },
  backup: {
    buttonLabel: 'Campagne (JSON)',
    title: 'Sauvegarde & Restauration de campagne',
    description:
      'Exportez ou restaurez en un fichier JSON toutes vos données locales : Hub MJ, combats, simulations, localités, itinéraires, fiches PJ et historiques.',
    currentSectionTitle: 'Données actuellement enregistrées dans ce navigateur',
    exportBtn: 'Exporter la campagne (.json)',
    exportedToast: 'Sauvegarde complète exportée en JSON.',
    importSectionTitle: 'Restaurer depuis un fichier de sauvegarde',
    importSelectFileBtn: 'Choisir un fichier .json…',
    invalidFileError:
      'Ce fichier n’est pas une sauvegarde valide du Grimoire du MJ.',
    modeReplaceLabel: 'Remplacer toute la campagne actuelle',
    modeReplaceHint:
      'Supprime les données existantes des modules et applique exactement la sauvegarde.',
    modeMergeLabel: 'Fusionner / compléter',
    modeMergeHint:
      'Écrase uniquement les modules présents dans le fichier tout en conservant le reste.',
    confirmRestoreBtn: 'Restaurer la sauvegarde',
    cancelFileBtn: 'Annuler ce fichier',
    restoredToast: 'Campagne restaurée avec succès.',
    indexedDbNotice:
      'Note : les images de cartes personnalisées importées en local (IndexedDB) ne sont pas incluses dans le JSON et restent intactes sur ce navigateur.',
    emptyState: 'Aucune donnée de campagne enregistrée pour le moment.',
    stats: {
      hubPcs: 'PJ du Hub',
      hubGroups: 'Groupes',
      hubNpcsMonsters: 'PNJ / Monstres perso',
      combatSessions: 'Combats sauvegardés',
      simSessions: 'Simulations',
      urbanEntries: 'Localités / Commerces',
      travelRoutes: 'Itinéraires tracés',
      chargenDraft: 'Brouillon PJ',
      rollerHistories: 'Tirages en historique',
      chronicleCampaigns: 'Chroniques (campagnes)',
      chronicleEvents: 'Événements chronologiques',
      yes: 'Oui',
      no: 'Non',
    },
  },
  modules: {
    'random-tables': {
      title: 'Tables aléatoires',
      shortTitle: 'Tables aléatoires',
      metaLabel: '3 outils · Tables, coffre & scène',
      description:
        'Consultez et tirez sur les tables du MJ, générez des coffres de butin paramétrables et composez des rencontres modulaires.',
      plannedScope: [
        'Tables filtrables par catégorie avec tirage rapide',
        'Générateur de coffre et de butin selon la rareté',
        'Compositeur modulaire de rencontres et péripéties',
      ],
    },
    'urban-generator': {
      title: 'Générateur d’environnement urbain',
      shortTitle: 'Environnement urbain',
      metaLabel: '4 échelles · Édition & historique',
      description:
        'Générez des localités complètes ou des commerces isolés, éditez manuellement chaque inventaire et conservez votre historique local.',
      plannedScope: [
        'Capitale, Cité, Village ou Forteresse avec auberges et contrats',
        'Édition manuelle des bâtiments, prix, grimoires et articles',
        'Historique persistant, copie texte et fiche HTML imprimable',
      ],
    },
    'travel-manager': {
      title: 'Gestionnaire de trajets',
      shortTitle: 'Trajets & Cartes',
      metaLabel: 'Cartes régionales & import perso',
      description:
        'Tracez vos itinéraires par jalons sur les cartes interactives du Continent ou importez vos propres cartes pour estimer vos durées de voyage.',
      plannedScope: [
        'Cartes régionales interactives et import de cartes personnelles',
        'Placement de jalons et calcul de distances sur itinéraire',
        'Estimation des jours de trajet à pied, à cheval ou en chariot',
      ],
    },
    'campaign-calendar': {
      title: 'Calendrier du Continent & Météo',
      shortTitle: 'Calendrier & Météo',
      metaLabel: '8 mois elfiques · Lunes & Guérison',
      description:
        'Suivez les saisons officielles du Continent, les phases lunaires, la météo quotidienne en jeu, la guérison naturelle des PJ et vos chantiers d’artisanat.',
      plannedScope: [
        'Mois elfiques officiels (Birke, Blathe, Feainn…), fêtes & cycle lunaire',
        'Météo dynamique par région avec malus (vigilance, tir, magie feu/eau)',
        'Synchronisé avec les Trajets, la guérison RÉC des PJ et l’artisanat',
      ],
    },
    'campaign-chronicle': {
      title: 'Chronologie de Campagne (MJ)',
      shortTitle: 'Chronologie & Campagnes',
      metaLabel: 'Multi-campagnes · Frise & Séances',
      description:
        'Organisez plusieurs campagnes indépendantes, suivez chaque événement sur le calendrier elfique et visualisez vos arcs par frise, par séance ou en tableau.',
      plannedScope: [
        'Gestion multi-campagnes (création, duplication, archivage et import/export)',
        'Frise par mois elfique, vue par séance, notes secrètes MJ et jalons épinglés',
        'Synchronisation directe avec le Calendrier & exports Markdown MJ ou Joueurs',
      ],
    },
    'encounter-manager': {
      title: 'Gestionnaire de rencontres aléatoires',
      shortTitle: 'Rencontres aléatoires',
      metaLabel: 'Monstres, humanoïdes & bestiaire',
      description:
        'Tirez des rencontres de monstres ou d’humanoïdes selon le milieu traversé et consultez le bestiaire complet du livre de base.',
      plannedScope: [
        'Tirages dédiés Monstres et Humanoïdes par environnement',
        'Bestiaire & Factions filtrable avec fiches de combat complètes',
        'Détail des statistiques, armes, capacités, vulnérabilités et butin',
      ],
    },
    'combat-tracker': {
      title: 'Gestionnaire de combats',
      shortTitle: 'Suivi de combats',
      metaLabel: 'Hub partagé · R0 & journal éditable',
      description:
        'Préparez vos affrontements en phase R0 depuis le Hub MJ partagé et gérez chaque tour avec jets ciblés, blessures critiques et journal.',
      plannedScope: [
        'Hub MJ partagé (PJ, groupes, PNJ, monstres) et historique',
        'Phase R0, initiative modifiable et lancers attaque/défense ciblés',
        'Dégâts localisés, dégradation d’armure, états et journal éditable',
      ],
    },
    'combat-simulator': {
      title: 'Simulateur de combat',
      shortTitle: 'Simulateur',
      metaLabel: 'Hub partagé · 100 à 2 000 tirages',
      description:
        'Évaluez l’équilibre et la létalité d’une rencontre par simulations Monte-Carlo à partir des combattants du Hub commun.',
      plannedScope: [
        'Hub partagé avec création de PNJ (professions) et monstres',
        'Conditions d’éclairage, priorité de cible et 100 à 2 000 combats',
        'Taux de victoire, rounds moyens, pertes et historique dédié',
      ],
    },
    'verbal-combat': {
      title: 'Suivi du Combat Verbal',
      shortTitle: 'Combat verbal',
      metaLabel: 'Joutes sociales · Détermination & 1d10!',
      description:
        'Dirigez négociations tendues, interrogatoires et procès selon les règles officielles : Détermination, attitude, attaques/défenses sociales et journal.',
      plannedScope: [
        'Détermination calculée (VOL + INT), initiative sociale et attitude',
        'Résolution opposée 1d10! avec outils officiels et contre-arguments',
        'Import de PJ du Hub/brouillon, archétypes et journal exportable',
      ],
    },
    'character-generator': {
      title: 'Générateur de Fiche PJ',
      shortTitle: 'Fiches PJ',
      metaLabel: '7 étapes · Guidé, Avancé & PDF',
      description:
        'Créez des personnages complets en 7 étapes (mode Guidé ou Avancé), avec arbres de talents, magie et export PDF officiel rempli.',
      plannedScope: [
        'Races, professions, parcours/destinées et sorts du livre de base',
        'Calcul automatique des caractéristiques dérivées et compétences',
        'Sauvegarde/import JSON et export PDF officiel rempli',
      ],
    },
    'lexicon-tables': {
      title: 'Codex Artisanat & Alchimie',
      shortTitle: 'Codex Artisanat',
      metaLabel: '10 tables · 348 entrées EN / FR',
      description:
        'Parcourez les 10 tables d’artisanat, matériaux, schémas, substances et formules avec recherche instantanée bilingue anglais / français.',
      plannedScope: [
        '348 entrées : matériaux, peaux, minerais, schémas et formules',
        'Recherche globale bilingue EN / FR et filtres par niveau ou rareté',
        'Fiche détaillée avec composants, SD, coût et copie rapide',
      ],
    },
    'homebrew-studio': {
      title: 'Créateur de Suppléments & PDF',
      shortTitle: 'Studio PDF (Markdown)',
      metaLabel: 'Style Livre officiel · 2 col. + Marge',
      description:
        'Rédigez en Markdown enrichi (façon Homebrewery) avec aperçu livre en direct, colonne mineure alternant gauche/droite selon la page et export PDF.',
      plannedScope: [
        'Bloc central 2 colonnes justifiées + colonne mineure alternée (paire/impaire)',
        'Bandeau peint, marque-page numéroté, statblocks Bestiaire & illustrations',
        'Export direct en PDF, HTML imprimable et sauvegarde Markdown (.md)',
      ],
    },
  },
};
