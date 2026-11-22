import type { ModuleLanguage } from '@/src/utils/continentCalendar';

export interface CampaignCalendarCopy {
  header: {
    eyebrow: string;
    title: string;
    subtitle: string;
    backBtn: string;
    travelShortcutBtn: string;
  };
  tabs: {
    calendarWeather: string;
    recoveryCrafting: string;
    chronology: string;
  };
  dateCard: {
    yearLabel: string;
    monthLabel: string;
    dayLabel: string;
    seasonLabel: string;
    lunarLabel: string;
    lunarDaySuffix: string;
    festivalBannerTitle: string;
    advanceLabel: string;
    advance1d: string;
    advance3d: string;
    advance7d: string;
    advanceCustomPlaceholder: string;
    advanceCustomBtn: string;
    advanceModeLabel: string;
    advanceModeRest: string;
    advanceModeTravel: string;
    monthGridTitle: string;
    monthGridHint: string;
    festivalLegend: string;
    fullMoonLegend: string;
    newMoonLegend: string;
    daySetToast: string;
  };
  weatherCard: {
    title: string;
    regionLabel: string;
    rerollBtn: string;
    lockLabel: string;
    lockedHint: string;
    unlockedHint: string;
    manualSelectLabel: string;
    temperatureLabel: string;
    modifiersTitle: string;
    modPerception: string;
    modRanged: string;
    modFireMagic: string;
    modWaterMagic: string;
    modTravelSurvival: string;
    rerolledToast: string;
  };
  recovery: {
    title: string;
    subtitle: string;
    syncHubBtn: string;
    syncedToast: (count: number) => string;
    noNewHubToast: string;
    addCustomBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    hpLabel: string;
    recStatLabel: string;
    ratePerDayLabel: string;
    careModeRest: string;
    careModeTravel: string;
    doctorToggle: string;
    critWoundLabel: string;
    critWoundPlaceholder: string;
    critDaysLabel: string;
    critNoneLabel: string;
    removeLabel: string;
    customFormTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    profLabel: string;
    profPlaceholder: string;
    maxHpLabel: string;
    recLabel: string;
    saveCustomBtn: string;
    cancelBtn: string;
    ruleSummary: string;
  };
  crafting: {
    title: string;
    subtitle: string;
    addProjectBtn: string;
    pickCodexBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    projectTitleLabel: string;
    projectTitlePlaceholder: string;
    crafterLabel: string;
    crafterPlaceholder: string;
    dcLabel: string;
    totalDaysLabel: string;
    workDuringTravelLabel: string;
    saveProjectBtn: string;
    cancelBtn: string;
    statusDone: string;
    statusActive: string;
    statusPaused: string;
    pauseBtn: string;
    resumeBtn: string;
    stepDayBtn: string;
    removeBtn: string;
    codexDialogTitle: string;
    codexDialogDesc: string;
    codexSearchPlaceholder: string;
    codexTimeHint: string;
    codexImportBtn: string;
    daysSuffix: string;
  };
  log: {
    title: string;
    subtitle: string;
    notePlaceholder: string;
    addNoteBtn: string;
    clearBtn: string;
    emptyLabel: string;
    kinds: {
      advance: string;
      travel: string;
      weather: string;
      recovery: string;
      crafting: string;
      note: string;
    };
  };
  toasts: {
    advancedSummary: (days: number, dateStr: string) => string;
    healedNotice: (count: number) => string;
    craftedNotice: (names: string) => string;
  };
}

const FR_COPY: CampaignCalendarCopy = {
  header: {
    eyebrow: 'CHRONOLOGIE DU CONTINENT · MÉTÉO & RÉCUPÉRATION',
    title: 'Calendrier du Continent, Météo & Récupération',
    subtitle:
      'Suivez les 8 périodes elfiques officielles, phases lunaires, conditions climatiques en jeu, guérison naturelle des PJ et travaux d’artisanat.',
    backBtn: 'Accueil',
    travelShortcutBtn: 'Ouvrir les Trajets',
  },
  tabs: {
    calendarWeather: 'Calendrier & Météo',
    recoveryCrafting: 'Guérison & Artisanat',
    chronology: 'Journal chronologique',
  },
  dateCard: {
    yearLabel: 'Année',
    monthLabel: 'Mois elfique',
    dayLabel: 'Jour',
    seasonLabel: 'Saison',
    lunarLabel: 'Phase lunaire',
    lunarDaySuffix: '/ 28',
    festivalBannerTitle: 'Fête & événement du Continent',
    advanceLabel: 'Faire avancer le temps de campagne',
    advance1d: '+1 jour',
    advance3d: '+3 jours',
    advance7d: '+7 jours',
    advanceCustomPlaceholder: 'Nb j',
    advanceCustomBtn: 'Avancer',
    advanceModeLabel: 'Régime de la période',
    advanceModeRest: 'Repos / Camp (RÉC complète)',
    advanceModeTravel: 'Marche / Trajet (⌊RÉC÷2⌋)',
    monthGridTitle: 'Calendrier du mois',
    monthGridHint: 'Cliquez sur un jour pour ajuster manuellement la date.',
    festivalLegend: 'Fête',
    fullMoonLegend: 'Pleine lune',
    newMoonLegend: 'Nlle lune',
    daySetToast: 'Date mise à jour.',
  },
  weatherCard: {
    title: 'Météo dynamique & Modificateurs en jeu',
    regionLabel: 'Région climatique',
    rerollBtn: 'Nouveau tirage météo',
    lockLabel: 'Figer la météo',
    lockedHint: 'Météo verrouillée lors des sauts de jours',
    unlockedHint: 'Tirage saisonnier automatique à chaque journée',
    manualSelectLabel: 'Forcer une condition',
    temperatureLabel: 'Température',
    modifiersTitle: 'Règles & Modificateurs actifs à la table',
    modPerception: 'Vigilance / Perception',
    modRanged: 'Tir & Projectiles',
    modFireMagic: 'Magie du Feu',
    modWaterMagic: 'Magie de l’Eau / Glace',
    modTravelSurvival: 'Trajet & Survie',
    rerolledToast: 'Météo quotidienne générée.',
  },
  recovery: {
    title: 'Suivi de guérison naturelle des PJ',
    subtitle:
      'Synchronisé avec le Hub MJ partagé : récupère automatiquement RÉC PV/jour au repos ou ⌊RÉC÷2⌋ PV/jour en voyage.',
    syncHubBtn: 'Synchroniser le Hub MJ',
    syncedToast: (count) => `${count} PJ importé(s) depuis le Hub MJ.`,
    noNewHubToast: 'Tous les PJ du Hub sont déjà présents.',
    addCustomBtn: 'Ajouter manuellement',
    emptyTitle: 'Aucun personnage suivi en récupération',
    emptyDesc:
      'Importez vos PJ depuis le Hub MJ partagé ou ajoutez un personnage pour suivre ses PV et blessures critiques jour après jour.',
    hpLabel: 'Points de Vie',
    recStatLabel: 'RÉC',
    ratePerDayLabel: 'Gain / jour',
    careModeRest: 'Au repos (RÉC)',
    careModeTravel: 'En trajet (⌊RÉC÷2⌋)',
    doctorToggle: 'Mains de Guérisseur (+3/j)',
    critWoundLabel: 'Blessure critique',
    critWoundPlaceholder: 'Ex. Côtes fêlées, entaille…',
    critDaysLabel: 'Jours restants',
    critNoneLabel: 'Aucune',
    removeLabel: 'Retirer',
    customFormTitle: 'Nouveau personnage en convalescence',
    nameLabel: 'Nom',
    namePlaceholder: 'Ex. Geralt / Jaskier…',
    profLabel: 'Profession / Rôle',
    profPlaceholder: 'Ex. Sorceleur, Barde…',
    maxHpLabel: 'PV Max',
    recLabel: 'Stat RÉC',
    saveCustomBtn: 'Ajouter au suivi',
    cancelBtn: 'Annuler',
    ruleSummary:
      'Règle officielle : 1 jour de repos complet rend RÉC PV ; en voyage actif, ⌊RÉC ÷ 2⌋ PV. Soins de Médecin (Mains de Guérisseur) : +3 PV/jour.',
  },
  crafting: {
    title: 'File d’artisanat & Alchimie',
    subtitle:
      'Suivez vos forges d’armes, armures, formules longues ou entraînements : la progression avance automatiquement avec le calendrier.',
    addProjectBtn: 'Nouveau projet',
    pickCodexBtn: 'Depuis le Codex',
    emptyTitle: 'Aucun projet d’artisanat en cours',
    emptyDesc:
      'Ajoutez un schéma du Codex Artisanat ou un projet libre pour décompter automatiquement les jours nécessaires.',
    projectTitleLabel: 'Objet / Schéma / Travail',
    projectTitlePlaceholder: 'Ex. Épée en argent de maître, Armure de chasseur…',
    crafterLabel: 'Artisan (PJ/PNJ)',
    crafterPlaceholder: 'Ex. Hattori ou PJ Artisan',
    dcLabel: 'SD Artisanat',
    totalDaysLabel: 'Durée totale (jours)',
    workDuringTravelLabel: 'Progresse aussi pendant les trajets (campement)',
    saveProjectBtn: 'Lancer le projet',
    cancelBtn: 'Annuler',
    statusDone: 'Terminé',
    statusActive: 'En cours',
    statusPaused: 'En pause',
    pauseBtn: 'Pause',
    resumeBtn: 'Reprendre',
    stepDayBtn: '+1 j',
    removeBtn: 'Supprimer',
    codexDialogTitle: 'Importer un schéma ou une formule du Codex',
    codexDialogDesc:
      'Sélectionnez un schéma d’artisanat ou une formule alchimique (8 h de travail converties en 1 journée de calendrier).',
    codexSearchPlaceholder: 'Filtrer par nom (FR ou EN)…',
    codexTimeHint: 'Temps d’origine',
    codexImportBtn: 'Ajouter à la file',
    daysSuffix: 'j',
  },
  log: {
    title: 'Journal chronologique de campagne',
    subtitle:
      'Historique automatique des jours écoulés, trajets, changements météo, soins et travaux terminés.',
    notePlaceholder: 'Ajouter un événement marquant à la date du jour…',
    addNoteBtn: 'Consigner',
    clearBtn: 'Vider le journal',
    emptyLabel: 'Aucune entrée enregistrée.',
    kinds: {
      advance: 'Temps',
      travel: 'Trajet',
      weather: 'Météo',
      recovery: 'Soin',
      crafting: 'Artisanat',
      note: 'Chronique',
    },
  },
  toasts: {
    advancedSummary: (days, dateStr) =>
      `Calendrier avancé de ${days} jour(s) — ${dateStr}`,
    healedNotice: (count) => `${count} personnage(s) ont récupéré des PV.`,
    craftedNotice: (names) => `Artisanat terminé : ${names}`,
  },
};

const EN_COPY: CampaignCalendarCopy = {
  header: {
    eyebrow: 'CONTINENT CHRONOLOGY · WEATHER & RECOVERY',
    title: 'Continent Calendar, Dynamic Weather & Recovery',
    subtitle:
      'Track the 8 official Elven solar periods, lunar phases, daily weather penalties, PC natural healing, and crafting downtime.',
    backBtn: 'Overview',
    travelShortcutBtn: 'Open Travel Maps',
  },
  tabs: {
    calendarWeather: 'Calendar & Weather',
    recoveryCrafting: 'Recovery & Crafting',
    chronology: 'Chronology Log',
  },
  dateCard: {
    yearLabel: 'Year',
    monthLabel: 'Elven Period',
    dayLabel: 'Day',
    seasonLabel: 'Season',
    lunarLabel: 'Lunar Phase',
    lunarDaySuffix: '/ 28',
    festivalBannerTitle: 'Continent Feast & Event',
    advanceLabel: 'Advance Campaign Time',
    advance1d: '+1 Day',
    advance3d: '+3 Days',
    advance7d: '+7 Days',
    advanceCustomPlaceholder: 'Days',
    advanceCustomBtn: 'Advance',
    advanceModeLabel: 'Recovery mode for this span',
    advanceModeRest: 'Rest / Camp (Full REC)',
    advanceModeTravel: 'Active Travel (⌊REC÷2⌋)',
    monthGridTitle: 'Month Overview',
    monthGridHint: 'Click any day to manually jump to that date.',
    festivalLegend: 'Feast',
    fullMoonLegend: 'Full Moon',
    newMoonLegend: 'New Moon',
    daySetToast: 'Campaign date updated.',
  },
  weatherCard: {
    title: 'Dynamic Weather & In-Game Modifiers',
    regionLabel: 'Regional Climate',
    rerollBtn: 'Roll Daily Weather',
    lockLabel: 'Lock Weather',
    lockedHint: 'Weather stays locked across day advances',
    unlockedHint: 'Automatically rolls seasonal weather each day',
    manualSelectLabel: 'Override Condition',
    temperatureLabel: 'Temperature',
    modifiersTitle: 'Active Table Modifiers & Rules',
    modPerception: 'Awareness / Sight',
    modRanged: 'Ranged & Projectiles',
    modFireMagic: 'Fire Magic',
    modWaterMagic: 'Water & Ice Magic',
    modTravelSurvival: 'Travel & Survival',
    rerolledToast: 'Daily weather rolled.',
  },
  recovery: {
    title: 'PC Natural Healing Tracker',
    subtitle:
      'Synced with the Shared GM Hub: automatically restores REC HP/day during rest or ⌊REC÷2⌋ HP/day while traveling.',
    syncHubBtn: 'Sync GM Hub PCs',
    syncedToast: (count) => `Imported ${count} PC(s) from Shared GM Hub.`,
    noNewHubToast: 'All Hub PCs are already tracked.',
    addCustomBtn: 'Add Manually',
    emptyTitle: 'No characters in recovery queue',
    emptyDesc:
      'Sync PCs from your Shared GM Hub or add a character manually to track daily HP recovery and critical wound timers.',
    hpLabel: 'Hit Points',
    recStatLabel: 'REC',
    ratePerDayLabel: 'Heal / day',
    careModeRest: 'Resting (REC)',
    careModeTravel: 'Traveling (⌊REC÷2⌋)',
    doctorToggle: 'Healing Hands (+3/d)',
    critWoundLabel: 'Critical Wound',
    critWoundPlaceholder: 'e.g. Cracked ribs, torn tendon…',
    critDaysLabel: 'Days left',
    critNoneLabel: 'None',
    removeLabel: 'Remove',
    customFormTitle: 'Add Character to Recovery',
    nameLabel: 'Name',
    namePlaceholder: 'e.g. Geralt / Dandelion…',
    profLabel: 'Profession / Role',
    profPlaceholder: 'e.g. Witcher, Bard…',
    maxHpLabel: 'Max HP',
    recLabel: 'REC Stat',
    saveCustomBtn: 'Add Character',
    cancelBtn: 'Cancel',
    ruleSummary:
      'Official rule: a full day of rest restores REC HP; active travel restores ⌊REC ÷ 2⌋ HP. Doctor Healing Hands adds +3 HP/day.',
  },
  crafting: {
    title: 'Crafting & Alchemy Downtime Queue',
    subtitle:
      'Track long weapon/armor diagrams, alchemy batches, or training projects: progress advances automatically with campaign days.',
    addProjectBtn: 'New Project',
    pickCodexBtn: 'Pick from Codex',
    emptyTitle: 'No crafting projects queued',
    emptyDesc:
      'Import a diagram from the Crafting Codex or add a custom project to count down crafting days automatically.',
    projectTitleLabel: 'Item / Diagram / Task',
    projectTitlePlaceholder: 'e.g. Mastercrafted Silver Sword…',
    crafterLabel: 'Crafter (PC/NPC)',
    crafterPlaceholder: 'e.g. Hattori or Craftsman PC',
    dcLabel: 'Craft DC',
    totalDaysLabel: 'Total Duration (days)',
    workDuringTravelLabel: 'Progresses during travel (camp work)',
    saveProjectBtn: 'Start Project',
    cancelBtn: 'Cancel',
    statusDone: 'Complete',
    statusActive: 'Active',
    statusPaused: 'Paused',
    pauseBtn: 'Pause',
    resumeBtn: 'Resume',
    stepDayBtn: '+1 d',
    removeBtn: 'Remove',
    codexDialogTitle: 'Import Diagram or Formula from Codex',
    codexDialogDesc:
      'Select any Crafting Diagram or Alchemy Formula (8 crafting hours are mapped to 1 calendar day).',
    codexSearchPlaceholder: 'Filter by EN or FR name…',
    codexTimeHint: 'Codex time',
    codexImportBtn: 'Add to Queue',
    daysSuffix: 'd',
  },
  log: {
    title: 'Campaign Chronology Log',
    subtitle:
      'Automatic timeline of elapsed days, journeys, weather shifts, healing, and finished crafting projects.',
    notePlaceholder: 'Record a campaign milestone on today’s date…',
    addNoteBtn: 'Log Event',
    clearBtn: 'Clear Log',
    emptyLabel: 'No chronology entries recorded yet.',
    kinds: {
      advance: 'Time',
      travel: 'Travel',
      weather: 'Weather',
      recovery: 'Healing',
      crafting: 'Crafting',
      note: 'Chronicle',
    },
  },
  toasts: {
    advancedSummary: (days, dateStr) =>
      `Calendar advanced by ${days} day(s) — ${dateStr}`,
    healedNotice: (count) => `${count} character(s) recovered HP.`,
    craftedNotice: (names) => `Crafting finished: ${names}`,
  },
};

export function getCampaignCalendarCopy(
  lang: ModuleLanguage
): CampaignCalendarCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
