import type {
  CampaignStatus,
  ChronicleEventCategory,
  ChronicleEventStatus,
  ChronicleImportance,
  ChronicleTimeOfDay,
  ModuleLanguage,
} from './types';

export interface CampaignChronicleCopy {
  backToOverview: string;
  moduleTag: string;
  title: string;
  subtitle: string;
  campaignBar: {
    activeCampaignLabel: string;
    newCampaignBtn: string;
    editCampaignBtn: string;
    duplicateCampaignBtn: string;
    deleteCampaignBtn: string;
    exportMdFullBtn: string;
    exportMdPlayersBtn: string;
    exportJsonBtn: string;
    importJsonBtn: string;
    sessionBadge: (num: number) => string;
    eventsCount: (count: number) => string;
  };
  stats: {
    totalEvents: string;
    activeThreads: string;
    upcomingEvents: string;
    currentSession: string;
    noDateYet: string;
  };
  toolbar: {
    addEventBtn: string;
    loadSampleBtn: string;
    searchPlaceholder: string;
    allCategories: string;
    allStatuses: string;
    pinnedOnly: string;
    showGmSecrets: string;
    sortAsc: string;
    sortDesc: string;
    views: {
      timeline: string;
      sessions: string;
      table: string;
    };
    resetFiltersBtn: string;
  };
  empty: {
    noEventsTitle: string;
    noEventsBody: string;
    addFirstBtn: string;
    loadSampleBtn: string;
    noFilterMatchTitle: string;
    noFilterMatchBody: string;
    clearFiltersBtn: string;
  };
  campaignStatus: Record<CampaignStatus, string>;
  categories: Record<ChronicleEventCategory, string>;
  eventStatus: Record<ChronicleEventStatus, string>;
  importance: Record<ChronicleImportance, string>;
  timeOfDay: Record<ChronicleTimeOfDay, string>;
  eventCard: {
    sessionLabel: (n: number) => string;
    unassignedSession: string;
    pinnedLabel: string;
    consequencesLabel: string;
    gmSecretLabel: string;
    entitiesLabel: string;
    pinAction: string;
    unpinAction: string;
    editAction: string;
    duplicateAction: string;
    cycleStatusAction: string;
    deleteAction: string;
  };
  sessionView: {
    realDateLabel: string;
    realDateUnset: string;
    clearRealDateAction: string;
  };
  timelineView: {
    jumpToPeriodLabel: string;
    turningPointBadge: string;
    axisDirectionHint: (isAsc: boolean) => string;
  };
  table: {
    date: string;
    session: string;
    event: string;
    category: string;
    location: string;
    status: string;
    actions: string;
  };
  eventDialog: {
    createTitle: string;
    editTitle: string;
    description: string;
    titleLabel: string;
    titlePlaceholder: string;
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    timeOfDayLabel: string;
    syncCalendarBtn: string;
    sessionLabel: string;
    sessionRealDateLabel: string;
    sessionRealDateHint: string;
    categoryLabel: string;
    statusLabel: string;
    importanceLabel: string;
    locationLabel: string;
    locationPlaceholder: string;
    entitiesLabel: string;
    entitiesPlaceholder: string;
    summaryLabel: string;
    summaryPlaceholder: string;
    consequencesLabel: string;
    consequencesPlaceholder: string;
    gmSecretLabel: string;
    gmSecretPlaceholder: string;
    pinnedLabel: string;
    saveBtn: string;
    createBtn: string;
    cancelBtn: string;
    titleRequiredError: string;
  };
  campaignDialog: {
    createTitle: string;
    editTitle: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    subtitleLabel: string;
    subtitlePlaceholder: string;
    regionLabel: string;
    regionPlaceholder: string;
    statusLabel: string;
    sessionLabel: string;
    synopsisLabel: string;
    synopsisPlaceholder: string;
    saveBtn: string;
    createBtn: string;
    cancelBtn: string;
    nameRequiredError: string;
  };
  confirmDelete: {
    eventTitle: string;
    eventBody: (title: string) => string;
    campaignTitle: string;
    campaignBody: (name: string, count: number) => string;
    confirmBtn: string;
    cancelBtn: string;
  };
  toasts: {
    eventCreated: string;
    eventUpdated: string;
    eventDeleted: string;
    eventDuplicated: string;
    campaignCreated: string;
    campaignUpdated: string;
    campaignDuplicated: string;
    campaignDeleted: string;
    cannotDeleteLastCampaign: string;
    calendarSynced: (dateLabel: string) => string;
    sampleLoaded: string;
    exportedMd: string;
    exportedJson: string;
    importedSuccess: (count: number) => string;
    importError: string;
  };
}

const FR_COPY: CampaignChronicleCopy = {
  backToOverview: 'Retour à l’accueil',
  moduleTag: 'Monde & Campagnes',
  title: 'Chronologie de Campagne',
  subtitle:
    'Visualisez et organisez facilement la chronologie, les arcs narratifs, les séances et les conséquences de chacune de vos campagnes.',
  campaignBar: {
    activeCampaignLabel: 'Campagne active',
    newCampaignBtn: 'Nouvelle campagne',
    editCampaignBtn: 'Modifier',
    duplicateCampaignBtn: 'Dupliquer',
    deleteCampaignBtn: 'Supprimer',
    exportMdFullBtn: 'Exporter MJ (.md)',
    exportMdPlayersBtn: 'Résumé Joueurs (.md)',
    exportJsonBtn: 'Exporter (.json)',
    importJsonBtn: 'Importer (.json)',
    sessionBadge: (num) => `Séance ${num}`,
    eventsCount: (count) => `${count} événement${count > 1 ? 's' : ''}`,
  },
  stats: {
    totalEvents: 'Événements consignés',
    activeThreads: 'Fils actifs',
    upcomingEvents: 'À venir / Prévus',
    currentSession: 'Séance en cours',
    noDateYet: 'Aucune date',
  },
  toolbar: {
    addEventBtn: 'Nouvel événement',
    loadSampleBtn: 'Charger un exemple',
    searchPlaceholder: 'Rechercher un événement, lieu, PNJ, conséquence…',
    allCategories: 'Toutes catégories',
    allStatuses: 'Tous statuts',
    pinnedOnly: 'Épinglés uniquement',
    showGmSecrets: 'Notes secrètes MJ',
    sortAsc: 'Chronologique (Ancien → Récent)',
    sortDesc: 'Plus récents d’abord',
    views: {
      timeline: 'Frise chronologique',
      sessions: 'Par séance',
      table: 'Tableau compact',
    },
    resetFiltersBtn: 'Réinitialiser',
  },
  empty: {
    noEventsTitle: 'Aucun événement dans cette campagne',
    noEventsBody:
      'Ajoutez votre premier événement daté sur le calendrier du Continent ou chargez une trame d’exemple pour tester l’affichage chronologique.',
    addFirstBtn: 'Ajouter un premier événement',
    loadSampleBtn: 'Charger un exemple de trame',
    noFilterMatchTitle: 'Aucun événement ne correspond aux filtres',
    noFilterMatchBody:
      'Modifiez votre recherche ou réinitialisez les filtres actifs pour afficher toute la chronologie.',
    clearFiltersBtn: 'Effacer les filtres',
  },
  campaignStatus: {
    active: 'En cours',
    paused: 'En pause',
    completed: 'Terminée',
  },
  categories: {
    story: 'Trame principale',
    contract: 'Contrat',
    combat: 'Affrontement',
    travel: 'Voyage & Étape',
    politics: 'Intrigue & Faction',
    npc: 'Rencontre PNJ',
    discovery: 'Indice & Secret',
    downtime: 'Repos & Artisanat',
  },
  eventStatus: {
    completed: 'Accompli',
    active: 'En cours',
    upcoming: 'Prévu / À venir',
    consequence: 'Conséquence',
  },
  importance: {
    minor: 'Secondaire',
    major: 'Majeur',
    'turning-point': 'Tournant',
  },
  timeOfDay: {
    dawn: 'Aube',
    morning: 'Matin',
    afternoon: 'Après-midi',
    dusk: 'Crépuscule',
    night: 'Nuit',
  },
  eventCard: {
    sessionLabel: (n) => `Séance ${n}`,
    unassignedSession: 'Hors séance / Prep',
    pinnedLabel: 'Épinglé',
    consequencesLabel: 'Conséquences & suites',
    gmSecretLabel: 'Note secrète MJ',
    entitiesLabel: 'Protagonistes',
    pinAction: 'Épingler',
    unpinAction: 'Désépingler',
    editAction: 'Modifier',
    duplicateAction: 'Dupliquer',
    cycleStatusAction: 'Changer le statut',
    deleteAction: 'Supprimer',
  },
  sessionView: {
    realDateLabel: 'Date réelle',
    realDateUnset: 'Non datée',
    clearRealDateAction: 'Effacer la date réelle',
  },
  timelineView: {
    jumpToPeriodLabel: 'Repères de la frise',
    turningPointBadge: 'Tournant clé',
    axisDirectionHint: (isAsc) =>
      isAsc ? 'Ancien → Récent' : 'Récent → Ancien',
  },
  table: {
    date: 'Date',
    session: 'Séance',
    event: 'Événement',
    category: 'Catégorie',
    location: 'Lieu',
    status: 'Statut',
    actions: 'Actions',
  },
  eventDialog: {
    createTitle: 'Ajouter un événement à la chronologie',
    editTitle: 'Modifier l’événement',
    description:
      'Datez l’événement selon le calendrier du Continent pour le classer automatiquement dans la frise de la campagne.',
    titleLabel: 'Titre de l’événement',
    titlePlaceholder: 'Ex. Pacte rompu à l’auberge du Carrefour',
    yearLabel: 'Année',
    monthLabel: 'Mois elfique',
    dayLabel: 'Jour',
    timeOfDayLabel: 'Moment',
    syncCalendarBtn: 'Date du Calendrier actuel',
    sessionLabel: 'N° de séance (0 = prep)',
    sessionRealDateLabel: 'Date réelle de la séance',
    sessionRealDateHint: 'Associée à cette séance (optionnel)',
    categoryLabel: 'Catégorie',
    statusLabel: 'Statut',
    importanceLabel: 'Portée',
    locationLabel: 'Lieu',
    locationPlaceholder: 'Ex. Oxenfurt, Marais de Torsin…',
    entitiesLabel: 'PNJ, PJ ou factions impliqués (séparés par virgule)',
    entitiesPlaceholder: 'Ex. Geralt, Baron Sanglant, Scoia’tael',
    summaryLabel: 'Résumé de l’événement',
    summaryPlaceholder:
      'Ce qui s’est passé ou ce qui est prévu pour cette scène…',
    consequencesLabel: 'Conséquences / Ramifications futures',
    consequencesPlaceholder:
      'Ex. Les éclaireurs nilfgaardiens fouillent la route dans 3 jours…',
    gmSecretLabel: 'Note secrète MJ (masquée en export Joueurs)',
    gmSecretPlaceholder:
      'Véritables motivations, pièges cachés, identité du commanditaire…',
    pinnedLabel: 'Épingler comme fil prioritaire de la campagne',
    saveBtn: 'Enregistrer',
    createBtn: 'Ajouter l’événement',
    cancelBtn: 'Annuler',
    titleRequiredError: 'Veuillez saisir un titre pour l’événement.',
  },
  campaignDialog: {
    createTitle: 'Créer une nouvelle campagne',
    editTitle: 'Modifier la campagne',
    description:
      'Chaque campagne dispose de sa propre chronologie indépendante et de ses propres événements.',
    nameLabel: 'Nom de la campagne',
    namePlaceholder: 'Ex. Les Ombres de Velen',
    subtitleLabel: 'Sous-titre / Arc',
    subtitlePlaceholder: 'Ex. Acte I — La Chasse aux Reliques',
    regionLabel: 'Région principale',
    regionPlaceholder: 'Ex. Témérie & Velen',
    statusLabel: 'Statut',
    sessionLabel: 'Séance actuelle',
    synopsisLabel: 'Synopsis & enjeux MJ',
    synopsisPlaceholder:
      'Objectifs globaux du groupe, menaces principales, contexte politique…',
    saveBtn: 'Enregistrer',
    createBtn: 'Créer la campagne',
    cancelBtn: 'Annuler',
    nameRequiredError: 'Le nom de la campagne est requis.',
  },
  confirmDelete: {
    eventTitle: 'Supprimer cet événement ?',
    eventBody: (title) =>
      `L’événement « ${title} » sera définitivement retiré de la chronologie.`,
    campaignTitle: 'Supprimer cette campagne ?',
    campaignBody: (name, count) =>
      `La campagne « ${name} » et ses ${count} événement(s) seront définitivement supprimés.`,
    confirmBtn: 'Supprimer',
    cancelBtn: 'Annuler',
  },
  toasts: {
    eventCreated: 'Événement ajouté à la chronologie.',
    eventUpdated: 'Événement mis à jour.',
    eventDeleted: 'Événement supprimé.',
    eventDuplicated: 'Événement dupliqué.',
    campaignCreated: 'Nouvelle campagne créée.',
    campaignUpdated: 'Campagne mise à jour.',
    campaignDuplicated: 'Campagne dupliquée avec sa chronologie.',
    campaignDeleted: 'Campagne supprimée.',
    cannotDeleteLastCampaign:
      'Vous devez conserver au moins une campagne active.',
    calendarSynced: (dateLabel) => `Date alignée sur le Calendrier : ${dateLabel}.`,
    sampleLoaded: 'Chronologie d’exemple chargée dans la campagne.',
    exportedMd: 'Chronologie exportée en Markdown.',
    exportedJson: 'Chronologie exportée en JSON.',
    importedSuccess: (count) => `${count} événement(s) importé(s) avec succès.`,
    importError: 'Fichier JSON invalide pour une chronologie de campagne.',
  },
};

const EN_COPY: CampaignChronicleCopy = {
  backToOverview: 'Back to Overview',
  moduleTag: 'World & Campaigns',
  title: 'Campaign Chronicle',
  subtitle:
    'Quickly track and visualize events, plot arcs, sessions, and consequences across multiple independent GM campaigns.',
  campaignBar: {
    activeCampaignLabel: 'Active campaign',
    newCampaignBtn: 'New Campaign',
    editCampaignBtn: 'Edit',
    duplicateCampaignBtn: 'Duplicate',
    deleteCampaignBtn: 'Delete',
    exportMdFullBtn: 'Export GM (.md)',
    exportMdPlayersBtn: 'Player Recap (.md)',
    exportJsonBtn: 'Export (.json)',
    importJsonBtn: 'Import (.json)',
    sessionBadge: (num) => `Session ${num}`,
    eventsCount: (count) => `${count} event${count === 1 ? '' : 's'}`,
  },
  stats: {
    totalEvents: 'Logged Events',
    activeThreads: 'Active Threads',
    upcomingEvents: 'Upcoming / Planned',
    currentSession: 'Current Session',
    noDateYet: 'No date set',
  },
  toolbar: {
    addEventBtn: 'New Event',
    loadSampleBtn: 'Load Sample',
    searchPlaceholder: 'Search events, locations, NPCs, consequences…',
    allCategories: 'All categories',
    allStatuses: 'All statuses',
    pinnedOnly: 'Pinned only',
    showGmSecrets: 'GM Secret Notes',
    sortAsc: 'Chronological (Oldest → Newest)',
    sortDesc: 'Newest first',
    views: {
      timeline: 'Timeline',
      sessions: 'By Session',
      table: 'Compact Table',
    },
    resetFiltersBtn: 'Reset',
  },
  empty: {
    noEventsTitle: 'No events logged in this campaign yet',
    noEventsBody:
      'Log your first Continent-dated event or load a sample multi-session arc to preview the timeline.',
    addFirstBtn: 'Add First Event',
    loadSampleBtn: 'Load Sample Chronicle',
    noFilterMatchTitle: 'No events match your active filters',
    noFilterMatchBody:
      'Adjust your search query or clear filters to display the full campaign timeline.',
    clearFiltersBtn: 'Clear Filters',
  },
  campaignStatus: {
    active: 'Active',
    paused: 'On Hold',
    completed: 'Completed',
  },
  categories: {
    story: 'Main Plot',
    contract: 'Witcher Contract',
    combat: 'Combat',
    travel: 'Travel & Milestone',
    politics: 'Intrigue & Faction',
    npc: 'NPC Encounter',
    discovery: 'Clue & Secret',
    downtime: 'Rest & Crafting',
  },
  eventStatus: {
    completed: 'Completed',
    active: 'Active',
    upcoming: 'Upcoming',
    consequence: 'Consequence',
  },
  importance: {
    minor: 'Minor',
    major: 'Major',
    'turning-point': 'Turning Point',
  },
  timeOfDay: {
    dawn: 'Dawn',
    morning: 'Morning',
    afternoon: 'Afternoon',
    dusk: 'Dusk',
    night: 'Night',
  },
  eventCard: {
    sessionLabel: (n) => `Session ${n}`,
    unassignedSession: 'Prep / Unassigned',
    pinnedLabel: 'Pinned',
    consequencesLabel: 'Consequences & Hooks',
    gmSecretLabel: 'GM Secret Note',
    entitiesLabel: 'Involved',
    pinAction: 'Pin',
    unpinAction: 'Unpin',
    editAction: 'Edit',
    duplicateAction: 'Duplicate',
    cycleStatusAction: 'Advance status',
    deleteAction: 'Delete',
  },
  sessionView: {
    realDateLabel: 'Real-world date',
    realDateUnset: 'No date set',
    clearRealDateAction: 'Clear real date',
  },
  timelineView: {
    jumpToPeriodLabel: 'Timeline milestones',
    turningPointBadge: 'Turning point',
    axisDirectionHint: (isAsc) =>
      isAsc ? 'Oldest → Newest' : 'Newest → Oldest',
  },
  table: {
    date: 'Date',
    session: 'Session',
    event: 'Event',
    category: 'Category',
    location: 'Location',
    status: 'Status',
    actions: 'Actions',
  },
  eventDialog: {
    createTitle: 'Log Chronicle Event',
    editTitle: 'Edit Chronicle Event',
    description:
      'Anchor the event on the Continent calendar to sort it chronologically inside your campaign timeline.',
    titleLabel: 'Event Title',
    titlePlaceholder: 'e.g. Pact broken at the Crossroads Inn',
    yearLabel: 'Year',
    monthLabel: 'Elven Period',
    dayLabel: 'Day',
    timeOfDayLabel: 'Time of Day',
    syncCalendarBtn: 'Use Current Calendar Date',
    sessionLabel: 'Session # (0 = prep)',
    sessionRealDateLabel: 'Session real-world date',
    sessionRealDateHint: 'Linked to this session (optional)',
    categoryLabel: 'Category',
    statusLabel: 'Status',
    importanceLabel: 'Impact',
    locationLabel: 'Location',
    locationPlaceholder: 'e.g. Oxenfurt, Crow’s Perch…',
    entitiesLabel: 'Involved NPCs, PCs, or Factions (comma-separated)',
    entitiesPlaceholder: 'e.g. Geralt, Bloody Baron, Scoia’tael',
    summaryLabel: 'Event Summary',
    summaryPlaceholder: 'What happened or what is planned for this scene…',
    consequencesLabel: 'Consequences / Future Hooks',
    consequencesPlaceholder:
      'e.g. Nilfgaardian scouts sweep the high road in 3 days…',
    gmSecretLabel: 'GM Secret Note (omitted from Player Recap)',
    gmSecretPlaceholder:
      'Hidden motives, secret culprit, upcoming ambush triggers…',
    pinnedLabel: 'Pin as priority campaign thread',
    saveBtn: 'Save Changes',
    createBtn: 'Add Event',
    cancelBtn: 'Cancel',
    titleRequiredError: 'Please enter an event title.',
  },
  campaignDialog: {
    createTitle: 'Create New Campaign',
    editTitle: 'Edit Campaign',
    description:
      'Each campaign maintains its own independent timeline, events, and session counter.',
    nameLabel: 'Campaign Name',
    namePlaceholder: 'e.g. Shadows over Velen',
    subtitleLabel: 'Subtitle / Arc',
    subtitlePlaceholder: 'e.g. Act I — Trail of Relics',
    regionLabel: 'Primary Region',
    regionPlaceholder: 'e.g. Temeria & Velen',
    statusLabel: 'Status',
    sessionLabel: 'Current Session',
    synopsisLabel: 'GM Synopsis & Stakes',
    synopsisPlaceholder:
      'Overall party goals, primary antagonists, political backdrop…',
    saveBtn: 'Save Changes',
    createBtn: 'Create Campaign',
    cancelBtn: 'Cancel',
    nameRequiredError: 'Campaign name is required.',
  },
  confirmDelete: {
    eventTitle: 'Delete this event?',
    eventBody: (title) =>
      `The event “${title}” will be permanently removed from this timeline.`,
    campaignTitle: 'Delete this campaign?',
    campaignBody: (name, count) =>
      `Campaign “${name}” and its ${count} event(s) will be permanently deleted.`,
    confirmBtn: 'Delete',
    cancelBtn: 'Cancel',
  },
  toasts: {
    eventCreated: 'Event added to timeline.',
    eventUpdated: 'Event updated.',
    eventDeleted: 'Event deleted.',
    eventDuplicated: 'Event duplicated.',
    campaignCreated: 'New campaign created.',
    campaignUpdated: 'Campaign updated.',
    campaignDuplicated: 'Campaign duplicated with its timeline.',
    campaignDeleted: 'Campaign deleted.',
    cannotDeleteLastCampaign: 'At least one campaign must remain.',
    calendarSynced: (dateLabel) => `Date synced with Calendar: ${dateLabel}.`,
    sampleLoaded: 'Sample chronicle loaded into the campaign.',
    exportedMd: 'Chronicle exported as Markdown.',
    exportedJson: 'Chronicle exported as JSON.',
    importedSuccess: (count) => `${count} event(s) imported successfully.`,
    importError: 'Invalid campaign chronicle JSON file.',
  },
};

export function getCampaignChronicleCopy(
  lang: ModuleLanguage
): CampaignChronicleCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
