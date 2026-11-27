import type { Locale } from '@/src/i18n/types';

export interface InvestigationCopy {
  headerEyebrow: string;
  headerTitle: string;
  headerSubtitle: string;
  tabs: {
    tracker: string;
    contracts: string;
    rules: string;
  };
  tracker: {
    activeMysteryLabel: string;
    newMysteryBtn: string;
    editMysteryBtn: string;
    deleteMysteryBtn: string;
    deleteConfirmTitle: string;
    deleteConfirmDesc: string;
    cancelBtn: string;
    confirmDeleteBtn: string;
    objectiveLabel: string;
    secretSolutionLabel: string;
    showSecretBtn: string;
    hideSecretBtn: string;
    complexityLabel: string;
    solvedBadge: string;
    dayLabel: (day: number) => string;
    advanceDayBtn: string;
    countdownLabel: (remaining: number, total: number) => string;
    countdownExpired: string;
    adjustComplexityLabel: string;
    resetMysteryBtn: string;
    cluesSectionTitle: string;
    addClueBtn: string;
    noClues: string;
    concealmentTag: (val: number) => string;
    dcTag: (dc: number) => string;
    attemptsTag: (used: number, max?: number) => string;
    markSolvedBtn: string;
    reopenBtn: string;
    resolveClueBtn: string;
    obstaclesSectionTitle: string;
    addObstacleBtn: string;
    noObstacles: string;
    triggerObstacleBtn: string;
    investigatorsSectionTitle: string;
    importHubBtn: string;
    addInvestigatorBtn: string;
    restPartyBtn: string;
    restPartyToast: string;
    deductionCheckBtn: string;
    noInvestigators: string;
    concentrationLabel: string;
    confusedBadge: string;
    willIntLabel: (will: number, intVal: number, ded: number) => string;
    logSectionTitle: string;
    clearLogBtn: string;
    noLogs: string;
  };
  resolver: {
    title: string;
    description: string;
    investigatorLabel: string;
    skillTotalLabel: string;
    statModLabel: string;
    extraTimeLabel: string;
    manualRollPlaceholder: string;
    rollAndResolveBtn: string;
    manualSuccessBtn: string;
    manualFailBtn: string;
    deductionTitle: string;
    deductionDesc: string;
    rollDeductionBtn: string;
    obstacleTitle: string;
    obstacleDesc: string;
    obstacleRollBtn: string;
    obstacleSuccessBtn: string;
    obstacleFailBtn: string;
    obstacleCritFailCheck: string;
    closeBtn: string;
  };
  editor: {
    createTitle: string;
    editTitle: string;
    titleLabel: string;
    objectiveLabel: string;
    solutionLabel: string;
    tierLabel: string;
    countdownLabel: string;
    countdownPlaceholder: string;
    saveBtn: string;
    cancelBtn: string;
    addClueTitle: string;
    clueTitleLabel: string;
    clueTypeLabel: string;
    clueDcLabel: string;
    clueConcealmentLabel: string;
    clueMaxAttemptsLabel: string;
    clueDescLabel: string;
    addObstacleTitle: string;
    obstacleTypeLabel: string;
    obstacleTitleLabel: string;
    obstacleDcLabel: string;
    obstacleDescLabel: string;
    addInvestigatorTitle: string;
    invNameLabel: string;
    invWillLabel: string;
    invIntLabel: string;
    invDeductionLabel: string;
  };
  contracts: {
    searchPlaceholder: string;
    countLabel: (shown: number, total: number) => string;
    clientLabel: string;
    locationLabel: string;
    rewardLabel: string;
    suggestedMonsterLabel: string;
    gmHintLabel: string;
    showHintBtn: string;
    hideHintBtn: string;
    copyNoticeBtn: string;
    copiedNoticeToast: string;
    launchMysteryBtn: string;
    launchedMysteryToast: (title: string) => string;
  };
  rules: {
    concentrationTitle: string;
    concentrationFormula: string;
    concentrationBody: string;
    recoveryBody: string;
    deductionBody: string;
    complexityTitle: string;
    concealmentTitle: string;
    cluesMatrixTitle: string;
    clueMatrixNote: string;
    obstaclesGuideTitle: string;
    obstaclesCountTitle: string;
    obstaclePenaltyNote: string;
    clueColumns: {
      type: string;
      skills: string;
      damage: string;
      penalty: string;
    };
  };
}

const FR_COPY: InvestigationCopy = {
  headerEyebrow: 'Le Journal du Sorcelleur · Système d’enquête',
  headerTitle: 'Enquêtes, Mystères & Contrats',
  headerSubtitle:
    'Gérez la Concentration des investigateurs, les indices à Dissimulation, les obstacles, les comptes à rebours et les 11 annonces officielles de contrats.',
  tabs: {
    tracker: 'Suivi de Mystère',
    contracts: 'Tableau des Contrats (11)',
    rules: 'Règles & Référence',
  },
  tracker: {
    activeMysteryLabel: 'Mystère actif',
    newMysteryBtn: 'Nouveau mystère',
    editMysteryBtn: 'Modifier',
    deleteMysteryBtn: 'Supprimer',
    deleteConfirmTitle: 'Supprimer ce mystère ?',
    deleteConfirmDesc:
      'Cette enquête et son journal de progression seront retirés du stockage local.',
    cancelBtn: 'Annuler',
    confirmDeleteBtn: 'Supprimer',
    objectiveLabel: 'Objectif de l’enquête',
    secretSolutionLabel: 'Vérité (Secrète MJ)',
    showSecretBtn: 'Afficher la vérité',
    hideSecretBtn: 'Masquer',
    complexityLabel: 'Complexité restante',
    solvedBadge: 'Mystère résolu',
    dayLabel: (day) => `Jour ${day}`,
    advanceDayBtn: '+1 Jour',
    countdownLabel: (remaining, total) =>
      `Compte à rebours : ${remaining} / ${total} j.`,
    countdownExpired: 'Échéance dépassée !',
    adjustComplexityLabel: 'Ajuster manuellement',
    resetMysteryBtn: 'Réinitialiser',
    cluesSectionTitle: 'Indices & Pistes (Jets de Preuve)',
    addClueBtn: 'Ajouter un indice',
    noClues: 'Aucun indice enregistré sur ce mystère.',
    concealmentTag: (val) => `Dissim. ${val}`,
    dcTag: (dc) => `SD ${dc}`,
    attemptsTag: (used, max) =>
      max ? `${used}/${max} pistes` : `${used} jet(s)`,
    markSolvedBtn: 'Clore',
    reopenBtn: 'Rouvrir',
    resolveClueBtn: 'Jet de Preuve',
    obstaclesSectionTitle: 'Obstacles & Fausses pistes',
    addObstacleBtn: 'Ajouter un obstacle',
    noObstacles: 'Aucun obstacle actif.',
    triggerObstacleBtn: 'Résoudre',
    investigatorsSectionTitle: 'Concentration des Investigateurs',
    importHubBtn: 'Importer du Hub',
    addInvestigatorBtn: 'Ajouter PJ',
    restPartyBtn: 'Nuit de repos (6h+)',
    restPartyToast: 'Repos appliqué : Concentration récupérée selon VOL & Déduction.',
    deductionCheckBtn: 'Jet de Déduction (SD 15)',
    noInvestigators:
      'Ajoutez les personnages participants ou importez-les depuis le Hub MJ pour suivre leur Concentration.',
    concentrationLabel: 'Concentration',
    confusedBadge: 'Esprit embrouillé (0)',
    willIntLabel: (will, intVal, ded) =>
      `VOL ${will} · INT ${intVal} · Déd. ${ded}`,
    logSectionTitle: 'Journal d’enquête',
    clearLogBtn: 'Vider',
    noLogs: 'Aucune action enregistrée.',
  },
  resolver: {
    title: 'Résoudre un Jet de Preuve',
    description:
      'En cas de réussite, les dégâts réduisent la Complexité après soustraction de la Dissimulation (minimum 1). En cas d’échec, le personnage perd de la Concentration.',
    investigatorLabel: 'Investigateur',
    skillTotalLabel: 'Base compétence (Stat + Comp. + Mod.)',
    statModLabel: 'Mod. Stat dégâts (INT / TECH / EMP)',
    extraTimeLabel: 'Temps supplémentaire (+1 jet & +1 dég., max +3)',
    manualRollPlaceholder: 'Laisser vide pour 1d10! auto',
    rollAndResolveBtn: 'Lancer 1d10! & Résoudre',
    manualSuccessBtn: 'Réussite directe',
    manualFailBtn: 'Échec direct',
    deductionTitle: 'Jet de Déduction (SD 15)',
    deductionDesc:
      'Débloque une piste lorsque le groupe est bloqué. Coûte toujours 1d6 points de Concentration.',
    rollDeductionBtn: 'Lancer Déduction (SD 15)',
    obstacleTitle: 'Surmonter l’Obstacle',
    obstacleDesc:
      'Réussite : tous les participants perdent 2 Concentration. Échec : tous perdent 1d6+2 Concentration (+3 sur échec critique).',
    obstacleRollBtn: 'Lancer 1d10! collectif',
    obstacleSuccessBtn: 'Réussite (-2 chacun)',
    obstacleFailBtn: 'Échec (-(1d6+2) chacun)',
    obstacleCritFailCheck: 'Inclure un échec critique individuel (-3 suppl.)',
    closeBtn: 'Fermer',
  },
  editor: {
    createTitle: 'Créer un Mystère',
    editTitle: 'Modifier le Mystère',
    titleLabel: 'Titre du mystère',
    objectiveLabel: 'Question / Objectif',
    solutionLabel: 'Réponse / Secret du MJ',
    tierLabel: 'Niveau de complexité',
    countdownLabel: 'Compte à rebours en jours (optionnel)',
    countdownPlaceholder: 'Ex. 3 (laisser vide si aucun)',
    saveBtn: 'Enregistrer',
    cancelBtn: 'Annuler',
    addClueTitle: 'Nouvel Indice',
    clueTitleLabel: 'Intitulé de l’indice',
    clueTypeLabel: 'Type d’indice',
    clueDcLabel: 'SD du jet',
    clueConcealmentLabel: 'Dissimulation (Armure)',
    clueMaxAttemptsLabel: 'Pistes max (optionnel)',
    clueDescLabel: 'Description & révélation',
    addObstacleTitle: 'Nouvel Obstacle',
    obstacleTypeLabel: 'Catégorie d’obstacle',
    obstacleTitleLabel: 'Nom de l’obstacle',
    obstacleDcLabel: 'SD suggéré',
    obstacleDescLabel: 'Effet narratif',
    addInvestigatorTitle: 'Ajouter un Investigateur',
    invNameLabel: 'Nom du personnage',
    invWillLabel: 'Volonté (VOL)',
    invIntLabel: 'Intelligence (INT)',
    invDeductionLabel: 'Rang en Déduction',
  },
  contracts: {
    searchPlaceholder: 'Rechercher un contrat, un lieu, un commanditaire ou un monstre…',
    countLabel: (shown, total) => `${shown} / ${total} contrats`,
    clientLabel: 'Commanditaire',
    locationLabel: 'Lieu',
    rewardLabel: 'Récompense',
    suggestedMonsterLabel: 'Piste / Monstre suggéré',
    gmHintLabel: 'Notes secrètes du MJ',
    showHintBtn: 'Voir notes MJ',
    hideHintBtn: 'Masquer notes',
    copyNoticeBtn: 'Copier l’annonce',
    copiedNoticeToast: 'Annonce copiée dans le presse-papiers.',
    launchMysteryBtn: 'Ouvrir en Mystère',
    launchedMysteryToast: (title) => `Mystère « ${title} » créé et ouvert.`,
  },
  rules: {
    concentrationTitle: 'Concentration & Récupération',
    concentrationFormula: 'Concentration = [(VOL + INT) / 2] × 3',
    concentrationBody:
      'Partagée entre tous les mystères simultanés. À 0, l’esprit s’embrouille et aucun Jet de Preuve n’est autorisé avant récupération.',
    recoveryBody:
      'Repos d’au moins 6 heures : récupère VOL + 1 (Déduction ≥ 5) ou + 2 (Déduction ≥ 8).',
    deductionBody:
      'Jet de Déduction (SD 15) : donne une piste en cas de réussite, mais inflige toujours 1d6 dégâts de Concentration.',
    complexityTitle: 'Échelle de Complexité',
    concealmentTitle: 'Dissimulation des Indices',
    cluesMatrixTitle: 'Les 11 Types d’Indices',
    clueMatrixNote:
      '* Bonus de +1 au jet de Preuve et aux dégâts par unité de temps supplémentaire (maximum +3). Dégâts minimum sur réussite : 1.',
    obstaclesGuideTitle: 'Types d’Obstacles',
    obstaclesCountTitle: 'Fréquence recommandée par jour',
    obstaclePenaltyNote:
      'Réussite : -2 Concentration pour chaque participant du jour. Échec : -(1d6+2) chacun. Échec critique : -3 suppl. au malchanceux.',
    clueColumns: {
      type: 'Type d’indice',
      skills: 'Compétences',
      damage: 'Dégâts',
      penalty: 'Malus d’échec',
    },
  },
};

const EN_COPY: InvestigationCopy = {
  headerEyebrow: 'A Witcher’s Journal · Investigation System',
  headerTitle: 'Investigations & Contracts',
  headerSubtitle:
    'Track Investigator Concentration, Concealment-armored Clues, Obstacles, Countdowns, and all 11 official Witcher notice-board contracts.',
  tabs: {
    tracker: 'Mystery Tracker',
    contracts: 'Contract Board (11)',
    rules: 'Rules & Reference',
  },
  tracker: {
    activeMysteryLabel: 'Active Mystery',
    newMysteryBtn: 'New Mystery',
    editMysteryBtn: 'Edit',
    deleteMysteryBtn: 'Delete',
    deleteConfirmTitle: 'Delete this mystery?',
    deleteConfirmDesc:
      'This investigation and its progress log will be removed from local browser storage.',
    cancelBtn: 'Cancel',
    confirmDeleteBtn: 'Delete',
    objectiveLabel: 'Investigation Objective',
    secretSolutionLabel: 'Truth (GM Secret)',
    showSecretBtn: 'Reveal Truth',
    hideSecretBtn: 'Hide',
    complexityLabel: 'Remaining Complexity',
    solvedBadge: 'Mystery Solved',
    dayLabel: (day) => `Day ${day}`,
    advanceDayBtn: '+1 Day',
    countdownLabel: (remaining, total) =>
      `Countdown: ${remaining} / ${total} d`,
    countdownExpired: 'Deadline passed!',
    adjustComplexityLabel: 'Manual adjust',
    resetMysteryBtn: 'Reset',
    cluesSectionTitle: 'Clues & Leads (Clue Checks)',
    addClueBtn: 'Add Clue',
    noClues: 'No clues logged for this mystery yet.',
    concealmentTag: (val) => `Conceal. ${val}`,
    dcTag: (dc) => `DC ${dc}`,
    attemptsTag: (used, max) =>
      max ? `${used}/${max} leads` : `${used} check(s)`,
    markSolvedBtn: 'Close',
    reopenBtn: 'Reopen',
    resolveClueBtn: 'Clue Check',
    obstaclesSectionTitle: 'Obstacles & Red Herrings',
    addObstacleBtn: 'Add Obstacle',
    noObstacles: 'No active obstacles.',
    triggerObstacleBtn: 'Resolve',
    investigatorsSectionTitle: 'Investigator Concentration',
    importHubBtn: 'Import from Hub',
    addInvestigatorBtn: 'Add PC',
    restPartyBtn: 'Full Rest (6h+)',
    restPartyToast: 'Rest applied: Concentration recovered by WILL & Deduction.',
    deductionCheckBtn: 'Deduction Roll (DC 15)',
    noInvestigators:
      'Add participating characters or import them from the Shared GM Hub to track Concentration.',
    concentrationLabel: 'Concentration',
    confusedBadge: 'Muddled Mind (0)',
    willIntLabel: (will, intVal, ded) =>
      `WILL ${will} · INT ${intVal} · Ded. ${ded}`,
    logSectionTitle: 'Investigation Log',
    clearLogBtn: 'Clear',
    noLogs: 'No events logged yet.',
  },
  resolver: {
    title: 'Resolve Clue Check',
    description:
      'On success, rolled damage minus Clue Concealment reduces Mystery Complexity (min 1). On failure, the investigator loses Concentration.',
    investigatorLabel: 'Investigator',
    skillTotalLabel: 'Skill Base (Stat + Skill + Mod)',
    statModLabel: 'Damage Stat Mod (INT / CRAFT / EMP)',
    extraTimeLabel: 'Extra Time (+1 check & +1 dmg, max +3)',
    manualRollPlaceholder: 'Leave blank for auto 1d10!',
    rollAndResolveBtn: 'Roll 1d10! & Resolve',
    manualSuccessBtn: 'Manual Success',
    manualFailBtn: 'Manual Failure',
    deductionTitle: 'Deduction Check (DC 15)',
    deductionDesc:
      'Provides a fresh lead when the party is stuck. Always inflicts 1d6 Concentration damage.',
    rollDeductionBtn: 'Roll Deduction (DC 15)',
    obstacleTitle: 'Overcome Obstacle',
    obstacleDesc:
      'Success: all active investigators lose 2 Concentration. Failure: all lose 1d6+2 Concentration (+3 extra on fumble).',
    obstacleRollBtn: 'Roll Party 1d10!',
    obstacleSuccessBtn: 'Success (-2 each)',
    obstacleFailBtn: 'Fail (-(1d6+2) each)',
    obstacleCritFailCheck: 'Include individual critical fumble (-3 extra)',
    closeBtn: 'Close',
  },
  editor: {
    createTitle: 'Create Mystery',
    editTitle: 'Edit Mystery',
    titleLabel: 'Mystery Title',
    objectiveLabel: 'Question / Objective',
    solutionLabel: 'GM Secret Answer',
    tierLabel: 'Complexity Tier',
    countdownLabel: 'Countdown in days (optional)',
    countdownPlaceholder: 'e.g. 3 (blank for none)',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    addClueTitle: 'New Clue',
    clueTitleLabel: 'Clue Title',
    clueTypeLabel: 'Clue Type',
    clueDcLabel: 'Check DC',
    clueConcealmentLabel: 'Concealment (Armor)',
    clueMaxAttemptsLabel: 'Max Leads (optional)',
    clueDescLabel: 'Description & Discovery',
    addObstacleTitle: 'New Obstacle',
    obstacleTypeLabel: 'Obstacle Category',
    obstacleTitleLabel: 'Obstacle Name',
    obstacleDcLabel: 'Suggested DC',
    obstacleDescLabel: 'Narrative Effect',
    addInvestigatorTitle: 'Add Investigator',
    invNameLabel: 'Character Name',
    invWillLabel: 'Willpower (WILL)',
    invIntLabel: 'Intelligence (INT)',
    invDeductionLabel: 'Deduction Rank',
  },
  contracts: {
    searchPlaceholder: 'Search contract, location, client, or creature…',
    countLabel: (shown, total) => `${shown} / ${total} contracts`,
    clientLabel: 'Client',
    locationLabel: 'Location',
    rewardLabel: 'Reward',
    suggestedMonsterLabel: 'Suggested Creature / Lead',
    gmHintLabel: 'GM Notes',
    showHintBtn: 'Show GM notes',
    hideHintBtn: 'Hide notes',
    copyNoticeBtn: 'Copy Notice',
    copiedNoticeToast: 'Contract notice copied to clipboard.',
    launchMysteryBtn: 'Start Mystery',
    launchedMysteryToast: (title) => `Mystery "${title}" created and opened.`,
  },
  rules: {
    concentrationTitle: 'Concentration & Recovery',
    concentrationFormula: 'Concentration = [(WILL + INT) / 2] × 3',
    concentrationBody:
      'Shared across all simultaneous mysteries. At 0, the investigator’s mind is muddled and they cannot make Clue checks until they recover.',
    recoveryBody:
      '6+ hours of sleep restores WILL Concentration (+1 if Deduction ≥ 5, +2 if Deduction ≥ 8).',
    deductionBody:
      'Deduction Check (DC 15): grants a lead on success, but always deals 1d6 Concentration damage.',
    complexityTitle: 'Mystery Complexity Scale',
    concealmentTitle: 'Clue Concealment',
    cluesMatrixTitle: '11 Official Clue Types',
    clueMatrixNote:
      '* +1 to Clue check and damage per extra unit of time spent (max +3). Successful Clue checks always deal at least 1 Complexity damage.',
    obstaclesGuideTitle: 'Obstacle Categories',
    obstaclesCountTitle: 'Recommended Daily Obstacles',
    obstaclePenaltyNote:
      'Success: -2 Concentration to all daily participants. Failure: -(1d6+2) each. Critical fail adds -3 to that character.',
    clueColumns: {
      type: 'Clue Type',
      skills: 'Skills',
      damage: 'Damage',
      penalty: 'Failure Penalty',
    },
  },
};

export function getInvestigationCopy(locale: Locale): InvestigationCopy {
  return locale === 'fr' ? FR_COPY : EN_COPY;
}
