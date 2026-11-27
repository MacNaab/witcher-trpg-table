import type { Locale } from '@/src/i18n/types';

export interface EstateCopy {
  headerEyebrow: string;
  headerTitle: string;
  headerSubtitle: string;
  tabs: {
    overview: string;
    upgrades: string;
    resources: string;
  };
  selector: {
    activeEstateLabel: string;
    newEstateBtn: string;
    copyMarkdownBtn: string;
    copiedToast: string;
    deleteBtn: string;
    deleteConfirmTitle: string;
    deleteConfirmDesc: string;
    cancelBtn: string;
    confirmDeleteBtn: string;
  };
  overview: {
    identityCardTitle: string;
    estateNameLabel: string;
    nobleNameLabel: string;
    regionLabel: string;
    domainLevelLabel: string;
    domainLevelHint: string;
    floorplanLabel: string;
    floorplanPlaceholder: string;
    staffCardTitle: string;
    majordomeRole: string;
    majordomeDesc: string;
    servantsRole: (count: number) => string;
    servantsDesc: string;
    guardsRole: (count: number) => string;
    guardsDesc: string;
    specialistsLabel: string;
    noSpecialists: string;
    securityCardTitle: string;
    doorLockDcLabel: string;
    secretRoomsLabel: string;
    secretRoomsValue: (rooms: number, passages: number) => string;
    secretRoomsDesc: string;
    tortureRoomLabel: string;
    tortureActive: string;
    tortureLocked: string;
    slotsUsedLabel: (used: number, max: number) => string;
    visitRuleTitle: string;
    visitRuleBody: string;
  };
  upgrades: {
    budgetLabel: string;
    slotsSummary: (installed: number, queued: number, max: number) => string;
    queueTitle: string;
    queueDesc: string;
    advanceMonthBtn: string;
    monthCompletedToast: (count: number) => string;
    emptyQueue: string;
    completeSingleBtn: string;
    cancelProjectBtn: string;
    installedTitle: string;
    emptyInstalled: string;
    removeUpgradeBtn: string;
    catalogTitle: string;
    catalogDesc: string;
    specialtyPlaceholder: string;
    startBuildBtn: string;
    instantBuildBtn: string;
    buildQueuedToast: (name: string) => string;
    limitReachedLabel: string;
    noSlotsWarning: string;
  };
  resources: {
    greenhouseTitle: string;
    greenhouseLocked: string;
    greenhouseCapacity: (count: number, max: number) => string;
    greenhouseGuide: string;
    harvestMonthBtn: string;
    harvestedToast: (units: number) => string;
    addPlantTitle: string;
    plantNameLabel: string;
    plantRarityLabel: string;
    rarityLabels: {
      common: string;
      uncommon: string;
      rare: string;
    };
    suggestedPlantsLabel: string;
    addPlantBtn: string;
    emptyPlants: string;
    storedLabel: (units: number) => string;
    useTenBtn: string;
    huntingTitle: string;
    huntingLocked: string;
    huntingDesc: string;
    hoursLabel: string;
    rollHuntBtn: (hours: number) => string;
    stockpileLabel: string;
    bonesLabel: string;
    feathersLabel: string;
    leatherLabel: string;
    huntHistoryTitle: string;
    noHuntHistory: string;
    huntRollToast: (b: number, f: number, l: number) => string;
    resetStockpileBtn: string;
  };
  createDialog: {
    title: string;
    nameLabel: string;
    nobleLabel: string;
    regionLabel: string;
    domainLabel: string;
    createBtn: string;
    cancelBtn: string;
  };
}

const FR_COPY: EstateCopy = {
  headerEyebrow: 'Seigneur & Fiefs · Domaine du Noble',
  headerTitle: 'Gestionnaire de Domaine',
  headerSubtitle:
    'Administrez le fief d’un Noble : rang de Domaine, majordome et domestiques, chantiers mensuels (8 améliorations officielles), sécurité, Serre et Terrain de chasse.',
  tabs: {
    overview: 'Fiche & Personnel',
    upgrades: 'Améliorations & Chantiers',
    resources: 'Serre & Terrain de chasse',
  },
  selector: {
    activeEstateLabel: 'Domaine actif',
    newEstateBtn: 'Nouveau domaine',
    copyMarkdownBtn: 'Copier fiche',
    copiedToast: 'Fiche du domaine copiée dans le presse-papiers.',
    deleteBtn: 'Supprimer',
    deleteConfirmTitle: 'Supprimer ce domaine ?',
    deleteConfirmDesc:
      'Toutes les infrastructures, plantations et réserves de ce fief seront effacées.',
    cancelBtn: 'Annuler',
    confirmDeleteBtn: 'Supprimer',
  },
  overview: {
    identityCardTitle: 'Identité & Plan du Domaine',
    estateNameLabel: 'Nom du domaine',
    nobleNameLabel: 'Seigneur / Noble propriétaire',
    regionLabel: 'Province / Situation',
    domainLevelLabel: 'Compétence Domaine',
    domainLevelHint:
      '1 amélioration par rang de Domaine · Serviteurs = 2 × Domaine',
    floorplanLabel: 'Plan du domaine & notes architecturales',
    floorplanPlaceholder:
      'Décrivez la disposition initiale des pièces (fixée une fois établie, modifiable ensuite uniquement via Améliorations)…',
    staffCardTitle: 'Personnel & Garnison',
    majordomeRole: 'Majordome (Savant)',
    majordomeDesc:
      'Gère les affaires domestiques et reçoit les rapports des gardes.',
    servantsRole: (count) => `${count} Serviteur(s) (Journaliers)`,
    servantsDesc:
      'Égal au double du niveau de Domaine. Ne quitte pas le domaine ni ne combat sans persuasion.',
    guardsRole: (count) => `${count} Garde(s) de caserne (Bandits p. 272)`,
    guardsDesc:
      'Défendent le domaine et son seigneur ; ne partent pas se battre au loin.',
    specialistsLabel: 'Spécialistes d’améliorations',
    noSpecialists: 'Aucun spécialiste attitré construit pour le moment.',
    securityCardTitle: 'Sécurité & Infrastructures',
    doorLockDcLabel: 'Crochetage portes & fenêtres',
    secretRoomsLabel: 'Chambres & passages secrets',
    secretRoomsValue: (rooms, passages) =>
      `${rooms} pièce(s) · ${passages} passage(s)`,
    secretRoomsDesc:
      'Vigilance SD 16 pour repérer, clef spéciale (doubles gratuits), Crochetage SD 20.',
    tortureRoomLabel: 'Salle de torture & cachots',
    tortureActive:
      'Porte SD 18 · 5 cages SD 18 · +3 Intimidation (2d6 dég.) · +2 Torture verbale',
    tortureLocked: 'Non installée',
    slotsUsedLabel: (used, max) => `${used} / ${max} emplacements utilisés`,
    visitRuleTitle: 'Présence sur le Domaine',
    visitRuleBody:
      'Le Noble doit être présent physiquement sur ses terres pour profiter de ses infrastructures et ateliers.',
  },
  upgrades: {
    budgetLabel: 'Emplacements de Domaine',
    slotsSummary: (installed, queued, max) =>
      `${installed} bâtie(s) + ${queued} en chantier / ${max} max`,
    queueTitle: 'Chantiers en cours (1 mois / structure)',
    queueDesc:
      'Plusieurs améliorations peuvent être construites en parallèle ; chacune exige 1 mois complet.',
    advanceMonthBtn: 'Valider 1 mois (tout achever)',
    monthCompletedToast: (count) =>
      `${count} amélioration(s) terminée(s) et ajoutée(s) au domaine.`,
    emptyQueue: 'Aucun chantier en cours.',
    completeSingleBtn: 'Achever',
    cancelProjectBtn: 'Annuler',
    installedTitle: 'Structures construites',
    emptyInstalled: 'Aucune amélioration installée pour le moment.',
    removeUpgradeBtn: 'Retirer',
    catalogTitle: 'Catalogue des 8 Améliorations officielles',
    catalogDesc:
      'Chaque rang de Domaine débloque 1 emplacement d’amélioration.',
    specialtyPlaceholder: 'Spécialité (ex. Forge, Alchimie, Tailleur…)',
    startBuildBtn: 'Lancer (1 mois)',
    instantBuildBtn: 'Construire direct',
    buildQueuedToast: (name) => `Chantier lancé : ${name} (1 mois).`,
    limitReachedLabel: 'Limite atteinte',
    noSlotsWarning:
      'Tous les emplacements permis par la compétence Domaine sont occupés ou en chantier.',
  },
  resources: {
    greenhouseTitle: 'Serre & Productions végétales',
    greenhouseLocked:
      'Construisez l’amélioration « Serre » dans l’onglet Améliorations pour cultiver jusqu’à 10 substances végétales (10 unités/mois chacune).',
    greenhouseCapacity: (count, max) =>
      `${count} / ${max} substance(s) cultivée(s)`,
    greenhouseGuide:
      'Départ : 4 communes/partout + 2 inhabituelles (+ plantes rapportées de voyage, max 10 par Serre). Jardinier : Survie base 15.',
    harvestMonthBtn: 'Récolte mensuelle (+10/plante)',
    harvestedToast: (units) =>
      `Récolte mensuelle effectuée : +${units} unités stockées.`,
    addPlantTitle: 'Planter une substance',
    plantNameLabel: 'Nom de la plante / substance',
    plantRarityLabel: 'Rareté',
    rarityLabels: {
      common: 'Partout / Commune',
      uncommon: 'Inhabituelle',
      rare: 'Rare (rapportée)',
    },
    suggestedPlantsLabel: 'Suggestions rapides',
    addPlantBtn: 'Planter',
    emptyPlants: 'Aucune plante dans la Serre.',
    storedLabel: (units) => `${units} u. en réserve`,
    useTenBtn: '-10 u.',
    huntingTitle: 'Terrain de chasse (1 jour de voyage)',
    huntingLocked:
      'Construisez l’amélioration « Terrain de chasse » pour récolter os, plumes et cuir (1d6 à 3d6 unités) avec votre Maître de chasse (Survie base 15).',
    huntingDesc:
      'Récolte 1d6 unités d’os, de plumes et de cuir par heure passée sur place (maximum 3d6).',
    hoursLabel: 'Durée de la chasse',
    rollHuntBtn: (hours) => `Chasser ${hours}h (${hours}d6 chacun)`,
    stockpileLabel: 'Réserves du domaine',
    bonesLabel: 'Os',
    feathersLabel: 'Plumes',
    leatherLabel: 'Cuir',
    huntHistoryTitle: 'Dernières chasses',
    noHuntHistory: 'Aucune sortie de chasse enregistrée.',
    huntRollToast: (b, f, l) =>
      `Butin préparé : +${b} Os, +${f} Plumes, +${l} Cuir.`,
    resetStockpileBtn: 'Vider réserves',
  },
  createDialog: {
    title: 'Créer un Domaine de Noble',
    nameLabel: 'Nom du domaine',
    nobleLabel: 'Nom du Noble',
    regionLabel: 'Région / Royaume',
    domainLabel: 'Niveau en Domaine',
    createBtn: 'Créer le domaine',
    cancelBtn: 'Annuler',
  },
};

const EN_COPY: EstateCopy = {
  headerEyebrow: 'Lords & Lands · Noble Estate',
  headerTitle: 'Noble Estate Manager',
  headerSubtitle:
    'Manage a Noble’s fief: Estate skill cap, Majordomo & servants, monthly construction queue (8 official upgrades), lock DCs, Greenhouse, and Hunting Ground.',
  tabs: {
    overview: 'Estate & Staff',
    upgrades: 'Upgrades & Construction',
    resources: 'Greenhouse & Hunting',
  },
  selector: {
    activeEstateLabel: 'Active Estate',
    newEstateBtn: 'New Estate',
    copyMarkdownBtn: 'Copy Sheet',
    copiedToast: 'Estate dossier copied to clipboard.',
    deleteBtn: 'Delete',
    deleteConfirmTitle: 'Delete this estate?',
    deleteConfirmDesc:
      'All upgrades, greenhouse crops, and stockpiles for this fief will be lost.',
    cancelBtn: 'Cancel',
    confirmDeleteBtn: 'Delete',
  },
  overview: {
    identityCardTitle: 'Estate Identity & Floorplan',
    estateNameLabel: 'Estate Name',
    nobleNameLabel: 'Noble Owner',
    regionLabel: 'Region / Holding',
    domainLevelLabel: 'Estate Skill Level',
    domainLevelHint: '1 upgrade slot per Estate rank · Servants = 2 × Estate',
    floorplanLabel: 'Floorplan & Architectural Notes',
    floorplanPlaceholder:
      'Describe initial layout (once set, only Estate upgrades may alter the layout)…',
    staffCardTitle: 'Household Staff & Garrison',
    majordomeRole: 'Majordomo (Sage)',
    majordomeDesc:
      'Manages domestic affairs and receives guard reports.',
    servantsRole: (count) => `${count} Servant(s) (Laborers)`,
    servantsDesc:
      'Equal to 2 × Estate level. Will not leave the estate or fight without persuasion.',
    guardsRole: (count) => `${count} Barracks Guard(s) (Bandit stats, p.272)`,
    guardsDesc:
      'Protect the Noble and estate grounds; will not march off to distant battles.',
    specialistsLabel: 'Upgrade Specialists',
    noSpecialists: 'No specialist structures built yet.',
    securityCardTitle: 'Security & Defensive Infrastructure',
    doorLockDcLabel: 'Door & Window Pick Lock DC',
    secretRoomsLabel: 'Secret Chambers & Passages',
    secretRoomsValue: (rooms, passages) =>
      `${rooms} room(s) · ${passages} passage(s)`,
    secretRoomsDesc:
      'Awareness DC 16 to spot entrance, special key (free copies), Pick Lock DC 20.',
    tortureRoomLabel: 'Torture Chamber & Cages',
    tortureActive:
      'Outer Lock DC 18 · 5 Cages DC 18 · +3 Intimidation (2d6 dmg) · +2 Verbal Torture',
    tortureLocked: 'Not installed',
    slotsUsedLabel: (used, max) => `${used} / ${max} upgrade slots used`,
    visitRuleTitle: 'Visiting Your Estate',
    visitRuleBody:
      'The Noble must physically visit the estate to utilize its workshops, medical care, and stockpiles.',
  },
  upgrades: {
    budgetLabel: 'Estate Upgrade Budget',
    slotsSummary: (installed, queued, max) =>
      `${installed} built + ${queued} building / ${max} max`,
    queueTitle: 'Construction Queue (1 month per structure)',
    queueDesc:
      'Multiple structures may be constructed simultaneously; each requires 1 month.',
    advanceMonthBtn: 'Pass 1 Month (Finish All)',
    monthCompletedToast: (count) =>
      `${count} structure(s) completed and added to the estate.`,
    emptyQueue: 'No active construction projects.',
    completeSingleBtn: 'Finish',
    cancelProjectBtn: 'Cancel',
    installedTitle: 'Built Structures',
    emptyInstalled: 'No upgrades constructed yet.',
    removeUpgradeBtn: 'Demolish',
    catalogTitle: 'Official Estate Upgrades (8)',
    catalogDesc: 'Each Estate skill rank grants 1 upgrade slot.',
    specialtyPlaceholder: 'Craft specialty (e.g. Smithing, Alchemy, Tailor…)',
    startBuildBtn: 'Build (1 mo)',
    instantBuildBtn: 'Add Built',
    buildQueuedToast: (name) => `Construction started: ${name} (1 month).`,
    limitReachedLabel: 'Max built',
    noSlotsWarning:
      'All upgrade slots allowed by your Estate skill level are filled or under construction.',
  },
  resources: {
    greenhouseTitle: 'Greenhouse & Herbal Harvest',
    greenhouseLocked:
      'Construct a "Greenhouse" upgrade to cultivate up to 10 botanical substances (10 units/month each).',
    greenhouseCapacity: (count, max) => `${count} / ${max} species planted`,
    greenhouseGuide:
      'Initial build: 4 Everywhere/Common + 2 Uncommon plants (+ wild samples brought home, max 10 per Greenhouse). Gardener: Wilderness Survival Base 15.',
    harvestMonthBtn: 'Monthly Harvest (+10 each)',
    harvestedToast: (units) => `Harvested +${units} total herbal units.`,
    addPlantTitle: 'Add Plant Species',
    plantNameLabel: 'Plant / Substance Name',
    plantRarityLabel: 'Rarity',
    rarityLabels: {
      common: 'Everywhere / Common',
      uncommon: 'Uncommon',
      rare: 'Rare (Field Sample)',
    },
    suggestedPlantsLabel: 'Quick Presets',
    addPlantBtn: 'Plant',
    emptyPlants: 'No species planted yet.',
    storedLabel: (units) => `${units} in store`,
    useTenBtn: '-10',
    huntingTitle: 'Hunting Ground (1 day’s travel)',
    huntingLocked:
      'Construct a "Hunting Ground" upgrade to harvest bones, feathers, and leather (1d6 to 3d6 units) via your Huntsmaster (Survival Base 15).',
    huntingDesc:
      'Yields 1d6 units each of Bones, Feathers, and Leather per hour hunted (max 3d6).',
    hoursLabel: 'Hunt Duration',
    rollHuntBtn: (hours) => `Hunt ${hours}h (${hours}d6 each)`,
    stockpileLabel: 'Estate Material Stockpile',
    bonesLabel: 'Bones',
    feathersLabel: 'Feathers',
    leatherLabel: 'Leather',
    huntHistoryTitle: 'Recent Hunts',
    noHuntHistory: 'No hunting trips logged yet.',
    huntRollToast: (b, f, l) =>
      `Huntsmaster prepared: +${b} Bones, +${f} Feathers, +${l} Leather.`,
    resetStockpileBtn: 'Clear Stock',
  },
  createDialog: {
    title: 'Create Noble Estate',
    nameLabel: 'Estate Name',
    nobleLabel: 'Noble Owner',
    regionLabel: 'Region / Kingdom',
    domainLabel: 'Estate Skill Rank',
    createBtn: 'Create Estate',
    cancelBtn: 'Cancel',
  },
};

export function getEstateCopy(locale: Locale): EstateCopy {
  return locale === 'fr' ? FR_COPY : EN_COPY;
}
