import type {
  ModuleLanguage,
  VerbalContextType,
  VerbalRole,
  VerbalSessionStatus,
} from './types';

export interface VerbalCombatCopy {
  header: {
    moduleTag: string;
    tabs: {
      board: string;
      log: string;
      rules: string;
    };
  };
  roles: Record<VerbalRole, string>;
  sessions: {
    title: string;
    subtitle: string;
    newEmptyBtn: string;
    presetLabel: string;
    presets: {
      contract: string;
      interrogation: string;
      trial: string;
    };
    filterAll: string;
    filterActive: string;
    filterPaused: string;
    filterCompleted: string;
    statusLabels: Record<VerbalSessionStatus, string>;
    emptyTitle: string;
    emptyDesc: string;
    roundBadge: (round: number) => string;
    participantsBadge: (count: number) => string;
    brokenBadge: (count: number) => string;
    resumeBtn: string;
    pauseBtn: string;
    completeBtn: string;
    reopenBtn: string;
    duplicateBtn: string;
    deleteBtn: string;
    deleteTitle: string;
    deleteDesc: (title: string) => string;
    createdToast: (title: string) => string;
    deletedToast: (title: string) => string;
    duplicatedToast: (title: string) => string;
  };
  workspace: {
    backToHubBtn: string;
    titlePlaceholder: string;
    stakesPlaceholder: string;
    stakesLabel: string;
    contextLabel: string;
    roundLabel: string;
    prepBadge: string;
    prepBanner: string;
    startBtn: string;
    prevTurn: string;
    nextTurn: string;
    rollInitBtn: string;
    addParticipantBtn: string;
    resolveExchangeBtn: string;
    emptyParticipantsTitle: string;
    emptyParticipantsDesc: string;
    initRolledToast: string;
    roundWrappedToast: (round: number) => string;
    statusLabels: Record<VerbalContextType, string>;
  };
  participant: {
    resolveLabel: string;
    attitudeLabel: string;
    initiativeLabel: string;
    statsTitle: string;
    skillsTitle: string;
    conditionsTitle: string;
    notesLabel: string;
    notesPlaceholder: string;
    restoreResolveBtn: string;
    removeBtn: string;
    activeTurnBadge: string;
    brokenStatus: string;
  };
  addDialog: {
    title: string;
    description: string;
    tabs: {
      hub: string;
      archetypes: string;
      custom: string;
    };
    importDraftTitle: string;
    importDraftBtn: string;
    noDraftHint: string;
    hubPcsTitle: string;
    noHubPcsHint: string;
    addPcBtn: string;
    addArchetypeBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    roleLabel: string;
    titleLabel: string;
    titlePlaceholder: string;
    attitudeLabel: string;
    skillLevelLabel: string;
    addCustomBtn: string;
    addedToast: (name: string) => string;
  };
  resolver: {
    title: string;
    description: string;
    attackerLabel: string;
    defenderLabel: string;
    attackToolLabel: string;
    defenseToolLabel: string;
    attackerModLabel: string;
    defenderModLabel: string;
    manualAtkDieLabel: string;
    manualDefDieLabel: string;
    autoDiePlaceholder: string;
    attitudeImpactLabel: (mod: number) => string;
    rollAndPreviewBtn: string;
    applyBtn: string;
    closeBtn: string;
    hitLabel: string;
    defendedLabel: string;
    counterLabel: (dmg: number) => string;
    unmaskedLabel: string;
    damageLabel: (dmg: number) => string;
    appliedToast: string;
    needTwoWarning: string;
  };
  log: {
    title: string;
    empty: string;
    copyBtn: string;
    copiedToast: string;
    clearBtn: string;
    roundPrefix: (round: number) => string;
  };
  rules: {
    title: string;
    subtitle: string;
    formulaTitle: string;
    formulaBody: string;
    attitudesTitle: string;
    attacksTitle: string;
    defensesTitle: string;
    conditionsTitle: string;
  };
}

const FR_COPY: VerbalCombatCopy = {
  header: {
    moduleTag: 'Joutes sociales · Détermination & 1d10!',
    tabs: {
      board: 'Tableau d’échange',
      log: 'Journal du débat',
      rules: 'Règles verbales',
    },
  },
  roles: {
    pc: 'PJ',
    ally: 'Allié',
    opponent: 'Adversaire',
    witness: 'Témoin / Juge',
  },
  sessions: {
    title: 'Joutes verbales, Interrogatoires & Procès',
    subtitle:
      'Préparez une négociation ou un interrogatoire avec le calcul officiel de Détermination, les attitudes et la résolution opposée 1d10!.',
    newEmptyBtn: 'Nouvelle joute vide',
    presetLabel: 'Scénarios rapides :',
    presets: {
      contract: 'Marchandage de contrat',
      interrogation: 'Interrogatoire de garde',
      trial: 'Procès / Audience',
    },
    filterAll: 'Toutes',
    filterActive: 'En cours',
    filterPaused: 'En pause',
    filterCompleted: 'Terminées',
    statusLabels: {
      active: 'En cours',
      paused: 'En pause',
      completed: 'Terminée',
    },
    emptyTitle: 'Aucune joute verbale enregistrée',
    emptyDesc:
      'Lancez un scénario rapide ci-dessus ou créez une scène vide pour ajouter vos PJ et PNJ.',
    roundBadge: (r) => (r === 0 ? 'R0 · Préparation' : `Round ${r}`),
    participantsBadge: (n) => `${n} participant(s)`,
    brokenBadge: (n) => `${n} cédé(s)`,
    resumeBtn: 'Ouvrir / Reprendre',
    pauseBtn: 'Mettre en pause',
    completeBtn: 'Clore la joute',
    reopenBtn: 'Rouvrir',
    duplicateBtn: 'Dupliquer',
    deleteBtn: 'Supprimer',
    deleteTitle: 'Supprimer cette joute verbale ?',
    deleteDesc: (title) =>
      `La scène « ${title} » et son journal de débat seront définitivement supprimés.`,
    createdToast: (title) => `Scène créée : « ${title} ».`,
    deletedToast: (title) => `Scène « ${title} » supprimée.`,
    duplicatedToast: (title) => `Scène dupliquée : « ${title} ».`,
  },
  workspace: {
    backToHubBtn: 'Retour aux joutes',
    titlePlaceholder: 'Titre de la scène (ex. Négociation avec le Bourgmestre)…',
    stakesPlaceholder: 'Enjeu (ex. Obtenir 600 couronnes et un sauf-conduit)…',
    stakesLabel: 'Enjeu',
    contextLabel: 'Contexte',
    roundLabel: 'Round',
    prepBadge: 'R0 · Préparation',
    prepBanner:
      'Phase R0 : ajoutez vos interlocuteurs, réglez leur attitude initiale puis lancez l’initiative (EMP + 1d10).',
    startBtn: 'Démarrer la joute (R1)',
    prevTurn: 'Précédent',
    nextTurn: 'Tour suivant',
    rollInitBtn: 'Initiatives (EMP)',
    addParticipantBtn: 'Ajouter participant',
    resolveExchangeBtn: 'Résoudre un échange (1d10!)',
    emptyParticipantsTitle: 'Aucun participant dans cette scène',
    emptyParticipantsDesc:
      'Ajoutez vos PJ (depuis le Hub ou le brouillon actif) et vos PNJ pour commencer la confrontation.',
    initRolledToast: 'Initiatives sociales lancées (EMP + 1d10).',
    roundWrappedToast: (round) => `Début du Round ${round}`,
    statusLabels: {
      negotiation: 'Négociation / Marchandage',
      interrogation: 'Interrogatoire',
      trial: 'Procès / Audience',
      debate: 'Joute / Débat politique',
    },
  },
  participant: {
    resolveLabel: 'Détermination',
    attitudeLabel: 'Attitude',
    initiativeLabel: 'Init.',
    statsTitle: 'Attributs sociaux',
    skillsTitle: 'Compétences (Rang)',
    conditionsTitle: 'États sociaux actifs',
    notesLabel: 'Arguments & Levier',
    notesPlaceholder: 'Points sensibles, secrets, preuves détenues…',
    restoreResolveBtn: 'Réinitialiser Détermination',
    removeBtn: 'Retirer',
    activeTurnBadge: 'Parole active',
    brokenStatus: 'Cédé (0)',
  },
  addDialog: {
    title: 'Ajouter un participant',
    description:
      'Importez vos PJ ou ajoutez des interlocuteurs du Continent avec leur Détermination calculée automatiquement.',
    tabs: {
      hub: 'PJ du Grimoire',
      archetypes: 'Archétypes PNJ',
      custom: 'Profil libre',
    },
    importDraftTitle: 'Brouillon actif du Générateur de PJ',
    importDraftBtn: 'Importer le brouillon PJ (stats & compétences exactes)',
    noDraftHint: 'Aucun brouillon PJ enregistré pour le moment.',
    hubPcsTitle: 'Personnages du Hub MJ partagé',
    noHubPcsHint: 'Aucun PJ enregistré dans le Hub MJ.',
    addPcBtn: 'Ajouter',
    addArchetypeBtn: 'Ajouter à la scène',
    nameLabel: 'Nom',
    namePlaceholder: 'Ex. Bourgmestre Henrik',
    roleLabel: 'Rôle',
    titleLabel: 'Fonction / Titre (optionnel)',
    titlePlaceholder: 'Ex. Juge de Novigrad',
    attitudeLabel: 'Attitude initiale envers les PJ',
    skillLevelLabel: 'Niveau social de base (rangs)',
    addCustomBtn: 'Créer et ajouter',
    addedToast: (name) => `${name} rejoint l’échange.`,
  },
  resolver: {
    title: 'Résoudre un échange verbal (1d10!)',
    description:
      'Compare un jet d’attaque sociale contre une défense verbale, applique automatiquement les dégâts de Détermination et les états.',
    attackerLabel: 'Orateur / Attaquant',
    defenderLabel: 'Interlocuteur / Défenseur',
    attackToolLabel: 'Outil d’attaque sociale',
    defenseToolLabel: 'Réplique / Défense verbale',
    attackerModLabel: 'Mod. attaque (circonstance)',
    defenderModLabel: 'Mod. défense (circonstance)',
    manualAtkDieLabel: 'Dé attaque manuel (optionnel)',
    manualDefDieLabel: 'Dé défense manuel (optionnel)',
    autoDiePlaceholder: 'Auto 1d10!',
    attitudeImpactLabel: (mod) =>
      `Modificateur d’attitude cible : ${mod >= 0 ? `+${mod}` : mod}`,
    rollAndPreviewBtn: 'Lancer 1d10! (Aperçu)',
    applyBtn: 'Appliquer l’échange',
    closeBtn: 'Fermer',
    hitLabel: 'ARGUMENT PORTÉ',
    defendedLabel: 'PARÉ / RÉSISTÉ',
    counterLabel: (dmg) => `CONTRE-ARGUMENT (-${dmg} Détermination)`,
    unmaskedLabel: 'DUPERIE DÉMASQUÉE',
    damageLabel: (dmg) => `-${dmg} Détermination`,
    appliedToast: 'Échange verbal appliqué et journalisé.',
    needTwoWarning: 'Ajoutez au moins deux participants pour résoudre un échange.',
  },
  log: {
    title: 'Journal chronologique de l’échange',
    empty: 'Aucun échange verbal enregistré pour l’instant.',
    copyBtn: 'Copier le journal',
    copiedToast: 'Journal du débat copié dans le presse-papiers.',
    clearBtn: 'Vider',
    roundPrefix: (round) => `R${round}`,
  },
  rules: {
    title: 'Aide-mémoire officiel · Combat Verbal',
    subtitle:
      'Synthèse des règles de joute sociale issues du livre de base The Witcher TRPG.',
    formulaTitle: 'Détermination (Resolve) & Initiative',
    formulaBody:
      'Détermination = ((VOL + INT) ÷ 2 arrondi inférieur) × 5. L’ordre de tour utilise EMP + 1d10. Quand la Détermination tombe à 0, l’interlocuteur cède, accepte le compromis ou rompt le dialogue.',
    attitudesTitle: 'Modificateurs d’attitude initiale',
    attacksTitle: 'Attaques verbales officielles',
    defensesTitle: 'Défenses verbales & Ripostes',
    conditionsTitle: 'États sociaux',
  },
};

const EN_COPY: VerbalCombatCopy = {
  header: {
    moduleTag: 'Social Duels · Resolve & 1d10!',
    tabs: {
      board: 'Exchange Board',
      log: 'Debate Log',
      rules: 'Verbal Rules',
    },
  },
  roles: {
    pc: 'PC',
    ally: 'Ally',
    opponent: 'Opponent',
    witness: 'Witness / Judge',
  },
  sessions: {
    title: 'Verbal Combat, Interrogations & Trials',
    subtitle:
      'Run tense negotiations and trials with official Resolve tracking, disposition modifiers, and opposed 1d10! social rolls.',
    newEmptyBtn: 'New Empty Scene',
    presetLabel: 'Quick Scenarios:',
    presets: {
      contract: 'Contract Bargaining',
      interrogation: 'Guard Interrogation',
      trial: 'Court Trial / Hearing',
    },
    filterAll: 'All',
    filterActive: 'In Progress',
    filterPaused: 'Paused',
    filterCompleted: 'Completed',
    statusLabels: {
      active: 'In Progress',
      paused: 'Paused',
      completed: 'Completed',
    },
    emptyTitle: 'No verbal combat scenes yet',
    emptyDesc:
      'Launch a quick scenario above or create a blank scene to add PCs and NPCs.',
    roundBadge: (r) => (r === 0 ? 'R0 · Prep' : `Round ${r}`),
    participantsBadge: (n) => `${n} participant(s)`,
    brokenBadge: (n) => `${n} yielded`,
    resumeBtn: 'Open / Resume',
    pauseBtn: 'Pause',
    completeBtn: 'Conclude',
    reopenBtn: 'Reopen',
    duplicateBtn: 'Duplicate',
    deleteBtn: 'Delete',
    deleteTitle: 'Delete this verbal combat scene?',
    deleteDesc: (title) =>
      `Scene “${title}” and its debate log will be permanently deleted.`,
    createdToast: (title) => `Scene created: “${title}”.`,
    deletedToast: (title) => `Scene “${title}” deleted.`,
    duplicatedToast: (title) => `Duplicated scene: “${title}”.`,
  },
  workspace: {
    backToHubBtn: 'Back to Scenes',
    titlePlaceholder: 'Scene title (e.g. Audience with the Alderman)…',
    stakesPlaceholder: 'Stakes (e.g. Secure 600 crowns & safe-conduct)…',
    stakesLabel: 'Stakes',
    contextLabel: 'Context',
    roundLabel: 'Round',
    prepBadge: 'R0 · Prep',
    prepBanner:
      'Prep Phase (R0): add participants, set initial attitudes, and roll social initiative (EMP + 1d10).',
    startBtn: 'Start Debate (R1)',
    prevTurn: 'Prev',
    nextTurn: 'Next Turn',
    rollInitBtn: 'Roll Init (EMP)',
    addParticipantBtn: 'Add Participant',
    resolveExchangeBtn: 'Resolve Exchange (1d10!)',
    emptyParticipantsTitle: 'No participants in this scene yet',
    emptyParticipantsDesc:
      'Add your PCs (from the Shared Hub or active sheet draft) and NPCs to begin.',
    initRolledToast: 'Social initiatives rolled (EMP + 1d10).',
    roundWrappedToast: (round) => `Round ${round} started`,
    statusLabels: {
      negotiation: 'Negotiation / Bargaining',
      interrogation: 'Interrogation',
      trial: 'Trial / Court Audience',
      debate: 'Political Debate / Parley',
    },
  },
  participant: {
    resolveLabel: 'Resolve',
    attitudeLabel: 'Attitude',
    initiativeLabel: 'Init.',
    statsTitle: 'Social Attributes',
    skillsTitle: 'Skills (Rank)',
    conditionsTitle: 'Active Social Conditions',
    notesLabel: 'Leverage & Arguments',
    notesPlaceholder: 'Pressure points, secrets, evidence held…',
    restoreResolveBtn: 'Reset Resolve',
    removeBtn: 'Remove',
    activeTurnBadge: 'Speaking',
    brokenStatus: 'Yielded (0)',
  },
  addDialog: {
    title: 'Add Participant',
    description:
      'Import PCs or add Continent interlocutors with automatically calculated Resolve.',
    tabs: {
      hub: 'Grimoire PCs',
      archetypes: 'NPC Archetypes',
      custom: 'Custom Profile',
    },
    importDraftTitle: 'Active Character Generator Draft',
    importDraftBtn: 'Import PC Draft (exact stats & skills)',
    noDraftHint: 'No active PC sheet draft saved right now.',
    hubPcsTitle: 'Shared GM Hub Characters',
    noHubPcsHint: 'No PCs saved in the Shared GM Hub.',
    addPcBtn: 'Add',
    addArchetypeBtn: 'Add to Scene',
    nameLabel: 'Name',
    namePlaceholder: 'e.g. Alderman Henrik',
    roleLabel: 'Role',
    titleLabel: 'Title / Role (optional)',
    titlePlaceholder: 'e.g. Novigrad Magistrate',
    attitudeLabel: 'Initial attitude toward PCs',
    skillLevelLabel: 'Baseline social skill ranks',
    addCustomBtn: 'Create & Add',
    addedToast: (name) => `${name} joined the exchange.`,
  },
  resolver: {
    title: 'Resolve Verbal Exchange (1d10!)',
    description:
      'Resolves an opposed social attack vs. verbal defense, deducts Resolve damage, and applies conditions.',
    attackerLabel: 'Speaker / Attacker',
    defenderLabel: 'Target / Defender',
    attackToolLabel: 'Verbal Attack Tool',
    defenseToolLabel: 'Verbal Defense / Riposte',
    attackerModLabel: 'Attack Misc Mod',
    defenderModLabel: 'Defense Misc Mod',
    manualAtkDieLabel: 'Manual Attack Die (optional)',
    manualDefDieLabel: 'Manual Defense Die (optional)',
    autoDiePlaceholder: 'Auto 1d10!',
    attitudeImpactLabel: (mod) =>
      `Target disposition modifier: ${mod >= 0 ? `+${mod}` : mod}`,
    rollAndPreviewBtn: 'Roll 1d10! (Preview)',
    applyBtn: 'Apply Exchange',
    closeBtn: 'Close',
    hitLabel: 'POINT LANDED',
    defendedLabel: 'DEFENDED / HELD FIRM',
    counterLabel: (dmg) => `COUNTER-ARGUMENT (-${dmg} Resolve)`,
    unmaskedLabel: 'DECEIT UNMASKED',
    damageLabel: (dmg) => `-${dmg} Resolve`,
    appliedToast: 'Verbal exchange applied and logged.',
    needTwoWarning: 'Add at least two participants to resolve an exchange.',
  },
  log: {
    title: 'Chronological Debate Log',
    empty: 'No verbal exchanges logged yet.',
    copyBtn: 'Copy Log',
    copiedToast: 'Debate log copied to clipboard.',
    clearBtn: 'Clear',
    roundPrefix: (round) => `R${round}`,
  },
  rules: {
    title: 'Official Verbal Combat Reference',
    subtitle:
      'Summary of social duel mechanics from The Witcher TRPG core rulebook.',
    formulaTitle: 'Resolve & Social Initiative',
    formulaBody:
      'Resolve = floor((WILL + INT) / 2) × 5. Turn order uses EMP + 1d10. When Resolve reaches 0, the participant yields, compromises, or breaks off.',
    attitudesTitle: 'Initial Disposition Modifiers',
    attacksTitle: 'Official Verbal Attacks',
    defensesTitle: 'Verbal Defenses & Counters',
    conditionsTitle: 'Social Conditions',
  },
};

export function getVerbalCombatCopy(lang: ModuleLanguage): VerbalCombatCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
