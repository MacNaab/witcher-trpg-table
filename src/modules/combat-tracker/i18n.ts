import type {
  CombatantRole,
  CriticalSeverity,
  CriticalWoundState,
  DamageType,
  EncounterStatus,
  LightingConditionId,
  ModuleLanguage,
  PenetrationTier,
} from './types';

export interface CombatTrackerCopy {
  header: {
    moduleTag: string;
    tabs: {
      board: string;
      hub: string;
      log: string;
      rules: string;
    };
  };
  toolbar: {
    encounterNamePlaceholder: string;
    roundLabel: string;
    activeLabel: string;
    noActiveCombatant: string;
    combatantsCount: string;
    prevTurn: string;
    nextTurn: string;
    startCombatBtn: string;
    prepRoundBadge: string;
    prepRoundBanner: string;
    rollAllInit: string;
    sortInit: string;
    addCombatant: string;
    attackResolver: string;
    resetCombat: string;
    lightLevelLabel: string;
    adrenalineRule: string;
    resetTitle: string;
    resetDescription: string;
    resetCancel: string;
    resetConfirm: string;
    roundWrappedToast: (round: number) => string;
    allInitRolledToast: string;
    resetToast: string;
  };
  roles: Record<CombatantRole, string>;
  lighting: Record<LightingConditionId, string>;
  anatomy: {
    human: string;
    monster: string;
    elemental: string;
    specter: string;
  };
  roster: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyAddBtn: string;
    initShort: string;
    editInitTitle: string;
    editInitHint: (refStat: number) => string;
    editInitApply: string;
    rerollInitBtn: string;
    hpShort: string;
    endShort: string;
    nonLethalShort: string;
    woundThresholdShort: string;
    woundedBadge: string;
    dyingBadge: string;
    unconsciousBadge: string;
    deadBadge: string;
    delayedBadge: string;
    quickDrawBadge: string;
    activeDodgeBadge: string;
    aimBadge: (stacks: number) => string;
    duplicateAction: string;
    delayAction: string;
    undelayAction: string;
    removeAction: string;
  };
  inspector: {
    noSelectionTitle: string;
    noSelectionDesc: string;
    vitalsTab: string;
    armorConditionsTab: string;
    criticalsWeaponsTab: string;
    quickAdjustHp: string;
    quickAdjustEnd: string;
    quickAdjustNonLethal: string;
    woundThresholdLabel: string;
    woundPenaltyActive: string;
    deathStateBanner: string;
    deathSaveBtn: string;
    deathSaveSuccess: (roll: number, target: number) => string;
    deathSaveFail: (roll: number, target: number) => string;
    stabilizeBtn: (dc: number) => string;
    stabilizeToast: string;
    unconsciousBanner: string;
    recoverEndBtn: (rec: number) => string;
    extraActionBtn: string;
    extraDefenseBtn: string;
    extraDefenseFreeBtn: string;
    quickDrawToggle: string;
    activeDodgeToggle: string;
    aimActionBtn: string;
    clearAimBtn: string;
    adrenalineGainBtn: string;
    adrenalineSpendDmgBtn: string;
    adrenalineSpendHpBtn: string;
    adrenalineEmergencyBtn: string;
    effectiveStatsTitle: string;
    armorTitle: string;
    repairAllArmor: string;
    conditionsTitle: string;
    criticalsTitle: string;
    addRandomCrit: string;
    critSeverityLabel: string;
    critStateLabels: Record<CriticalWoundState, string>;
    critSeverities: Record<CriticalSeverity, string>;
    noCriticals: string;
    weaponsTitle: string;
    addWeaponBtn: string;
    weaponNamePlaceholder: string;
    weaponDamagePlaceholder: string;
    silverLabel: string;
    fiaLabel: string;
    traitsTitle: string;
    nonSilverResistantBadge: string;
    vulnerabilitiesLabel: string;
    resistancesLabel: string;
    abilitiesLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    reviveBtn: string;
    initiativeLabel: string;
  };
  addDialog: {
    title: string;
    description: string;
    tabs: {
      hub: string;
      bestiary: string;
      party: string;
      manual: string;
    };
    searchBestiaryPlaceholder: string;
    filterAll: string;
    filterMonsters: string;
    filterHumanoids: string;
    filterAnimals: string;
    variantLabel: string;
    quantityLabel: string;
    roleOverrideLabel: string;
    initiativeModeLabel: string;
    initIndividual: string;
    initGroup: string;
    addFromBestiaryBtn: string;
    presetsTitle: string;
    importJsonTitle: string;
    importJsonDesc: string;
    importJsonBtn: string;
    importJsonError: string;
    addedToast: (name: string, count: number) => string;
    manual: {
      nameLabel: string;
      namePlaceholder: string;
      roleLabel: string;
      anatomyLabel: string;
      hpLabel: string;
      endLabel: string;
      armorLabel: string;
      refLabel: string;
      dexLabel: string;
      corLabel: string;
      vitLabel: string;
      intLabel: string;
      volLabel: string;
      recLabel: string;
      etouLabel: string;
      nonSilverResistLabel: string;
      submitBtn: string;
    };
  };
  resolver: {
    title: string;
    description: string;
    attackerLabel: string;
    customAttacker: string;
    defenderLabel: string;
    weaponLabel: string;
    customWeapon: string;
    attackRollSection: string;
    attackBaseLabel: string;
    defenseBaseLabel: string;
    attackDieLabel: string;
    defenseDieLabel: string;
    rollDiceBtn: string;
    rollAttackDieBtn: string;
    rollDefenseDieBtn: string;
    directTotalToggle: string;
    attackDirectTotalLabel: string;
    defenseDirectTotalLabel: string;
    diceResultDetail: (rolls: number[], total: number) => string;
    strikeModeLabel: string;
    strikeNormal: string;
    strikeFast: string;
    strikeStrong: string;
    strikeExplosive: string;
    flankingLabel: string;
    rangeLabel: string;
    coverLabel: string;
    aimBonusLabel: string;
    hitLocationLabel: string;
    randomLocationOption: string;
    rollLocationBtn: string;
    damageSection: string;
    rawDamageLabel: string;
    rollDamageBtn: string;
    damageTypeLabel: string;
    damageTypes: Record<DamageType, string>;
    penetrationLabel: string;
    penetrationTiers: Record<PenetrationTier, string>;
    isSilverLabel: string;
    isTargetResistantLabel: string;
    isTargetVulnerableLabel: string;
    isNonLethalLabel: string;
    previewTitle: string;
    outcomeHit: string;
    outcomeMiss: string;
    outcomeCrit: (tier: string, bonus: number) => string;
    outcomeFumble: (who: string, severity: number) => string;
    applyDamageBtn: string;
    closeBtn: string;
    appliedToast: (target: string, dmg: number) => string;
  };
  log: {
    title: string;
    empty: string;
    copyBtn: string;
    copiedToast: string;
    clearBtn: string;
    deleteEntryLabel: string;
    roundPrefix: (round: number) => string;
  };
  rules: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categoryFilter: {
      all: string;
      combat: string;
      outOfCombat: string;
    };
    sections: {
      modifiers: string;
      locations: string;
      criticals: string;
      fumbles: string;
      conditions: string;
      coverAndLight: string;
      magicRules: string;
      grimoire: string;
      bestiaryRules: string;
      dcScale: string;
      healingSurgery: string;
      toxicityAddiction: string;
      hazardsClimate: string;
      reputationRegion: string;
      servicesPrices: string;
    };
  };
  hub: {
    hubTab: string;
    gmScreenTab: string;
    title: string;
    subtitle: string;
    pcsTitle: string;
    pcsCountLabel: (count: number) => string;
    newPcBtn: string;
    importJsonBtn: string;
    presetDropdownBtn: string;
    emptyPcsTitle: string;
    emptyPcsDesc: string;
    inCombatBadge: string;
    addPcToCombatBtn: string;
    editBtn: string;
    duplicateBtn: string;
    deleteBtn: string;
    deletePcTitle: string;
    deletePcDesc: (name: string) => string;
    pcSavedToast: (name: string) => string;
    pcDeletedToast: (name: string) => string;
    groupsTitle: string;
    groupsCountLabel: (count: number) => string;
    newGroupBtn: string;
    emptyGroupsTitle: string;
    emptyGroupsDesc: string;
    groupInitBadge: string;
    individualInitBadge: string;
    groupMembersCount: (count: number) => string;
    addGroupToCombatBtn: string;
    startNewEncounterBtn: string;
    newEncounterConfirmTitle: string;
    newEncounterConfirmDesc: (groupName: string) => string;
    newEncounterConfirmBtn: string;
    deleteGroupTitle: string;
    deleteGroupDesc: (name: string) => string;
    groupSavedToast: (name: string) => string;
    groupDeletedToast: (name: string) => string;
    groupAddedToast: (name: string, count: number) => string;
    groupEmptyWarning: string;
    pcAlreadyInCombatNotice: (names: string) => string;
    pcDialog: {
      createTitle: string;
      editTitle: string;
      description: string;
      nameLabel: string;
      playerLabel: string;
      professionLabel: string;
      roleLabel: string;
      maxHpLabel: string;
      maxEndLabel: string;
      statsTitle: string;
      armorTitle: string;
      weaponsTitle: string;
      notesLabel: string;
      cancelBtn: string;
      saveBtn: string;
    };
    groupDialog: {
      createTitle: string;
      editTitle: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      descLabel: string;
      descPlaceholder: string;
      groupInitSwitch: string;
      membersTitle: string;
      noMembers: string;
      addFromHubPcsTitle: string;
      noSavedPcsHint: string;
      addFromBestiaryTitle: string;
      searchBestiaryPlaceholder: string;
      addBestiaryBtn: string;
      addCustomTitle: string;
      customNamePlaceholder: string;
      cancelBtn: string;
      saveBtn: string;
    };
  };
  sessions: {
    sessionsCountLabel: (count: number) => string;
    newEmptyEncounterBtn: string;
    sectionTitle: string;
    sectionSubtitle: string;
    filterAll: string;
    filterActive: string;
    filterPaused: string;
    filterCompleted: string;
    emptyTitle: string;
    emptyDesc: string;
    statusLabels: Record<EncounterStatus, string>;
    roundBadge: (round: number) => string;
    survivorsBadge: (alive: number, total: number) => string;
    logsCountBadge: (count: number) => string;
    activeTurnLabel: (name: string) => string;
    updatedAtLabel: (date: string) => string;
    resumeBtn: string;
    reviewBtn: string;
    pauseBtn: string;
    completeBtn: string;
    reopenBtn: string;
    duplicateBtn: string;
    deleteBtn: string;
    deleteTitle: string;
    deleteDesc: (title: string) => string;
    deletedToast: (title: string) => string;
    createdToast: (title: string) => string;
    duplicatedToast: (title: string) => string;
    summaryDialog: {
      title: string;
      description: string;
      rosterTitle: string;
      logTitle: string;
      emptyRoster: string;
      deadBadge: string;
      copySummaryBtn: string;
      copiedSummaryToast: string;
      closeBtn: string;
      resumeFromSummaryBtn: string;
    };
  };
  workspace: {
    backToHubBtn: string;
    statusLabel: string;
    defaultUntitled: string;
    combatantAddedLog: (actorPrefix: string, count: number, label: string) => string;
    combatantRemovedLog: (actorPrefix: string, name: string) => string;
    combatantDuplicatedLog: (actorPrefix: string, source: string, clone: string) => string;
  };
}

const FR_COPY: CombatTrackerCopy = {
  header: {
    moduleTag: 'Combat & Règles officielles',
    tabs: {
      board: 'Tableau de combat',
      hub: 'Hub MJ',
      log: 'Journal de combat',
      rules: 'Aide-mémoire & Tables',
    },
  },
  toolbar: {
    encounterNamePlaceholder: 'Nom de l’affrontement (ex. Embuscade à Velen)…',
    roundLabel: 'Round',
    activeLabel: 'Tour actif',
    noActiveCombatant: 'Aucun',
    combatantsCount: 'Combattants',
    prevTurn: 'Précédent',
    nextTurn: 'Tour suivant',
    startCombatBtn: 'Démarrer le combat (R1)',
    prepRoundBadge: 'R0 · Préparation',
    prepRoundBanner:
      'Phase de préparation (R0) : ajoutez tous les participants et ajustez les initiatives des PJ avant de démarrer le Round 1.',
    rollAllInit: 'Lancer Initiatives',
    sortInit: 'Trier',
    addCombatant: 'Ajouter',
    attackResolver: 'Résoudre Attaque / Dégâts',
    resetCombat: 'Réinitialiser',
    lightLevelLabel: 'Luminosité',
    adrenalineRule: 'Règle Adrénaline',
    resetTitle: 'Réinitialiser le combat en cours ?',
    resetDescription:
      'Tous les combattants, compteurs de rounds, blessures critiques et entrées du journal seront effacés.',
    resetCancel: 'Annuler',
    resetConfirm: 'Tout effacer',
    roundWrappedToast: (round) => `Début du Round ${round}`,
    allInitRolledToast: 'Initiatives lancées et triées (RÉF + 1d10).',
    resetToast: 'Combat réinitialisé.',
  },
  roles: {
    pc: 'PJ',
    ally: 'Allié',
    enemy: 'Ennemi',
    monster: 'Monstre',
  },
  lighting: {
    bright: 'Lumière brillante (-3 Vig · -3 Att/Déf si face au soleil)',
    daylight: 'Lumière du jour (Aucun malus)',
    dim: 'Lumière tamisée (-2 Vigilance)',
    darkness: 'Ténèbres (-4 Vig / -2 Att & Déf)',
  },
  anatomy: {
    human: 'Humanoïde',
    monster: 'Monstre',
    elemental: 'Élémentaire (sans organes)',
    specter: 'Spectre (sans organes/jambes)',
  },
  roster: {
    title: 'Ordre d’initiative',
    emptyTitle: 'Aucun combattant dans la scène',
    emptyDesc:
      'Importez des monstres ou humanoïdes du Bestiaire, chargez une fiche PJ ou créez un profil manuel.',
    emptyAddBtn: 'Ajouter des combattants',
    initShort: 'Init',
    editInitTitle: 'Modifier l’initiative',
    editInitHint: (refStat) => `RÉF ${refStat} + dé du joueur ou 1d10`,
    editInitApply: 'Appliquer',
    rerollInitBtn: '1d10 + RÉF',
    hpShort: 'PS',
    endShort: 'END',
    nonLethalShort: 'NL',
    woundThresholdShort: 'Seuil',
    woundedBadge: 'Seuil atteint (÷2)',
    dyingBadge: 'Mort imminente',
    unconsciousBadge: 'Inconscient / K.O.',
    deadBadge: 'Mort',
    delayedBadge: 'Action décalée',
    quickDrawBadge: 'Dégainage +3',
    activeDodgeBadge: 'Esquive active',
    aimBadge: (stacks) => `Viser +${stacks}`,
    duplicateAction: 'Dupliquer',
    delayAction: 'Décaler le tour',
    undelayAction: 'Reprendre le tour',
    removeAction: 'Retirer',
  },
  inspector: {
    noSelectionTitle: 'Sélectionnez un combattant',
    noSelectionDesc:
      'Cliquez sur une ligne de l’ordre d’initiative pour gérer ses PS, son Endurance, son armure par localisation, ses effets et blessures critiques.',
    vitalsTab: 'Santé & Actions',
    armorConditionsTab: 'Armure & Effets',
    criticalsWeaponsTab: 'Critiques & Armes',
    quickAdjustHp: 'Points de Santé (PS)',
    quickAdjustEnd: 'Endurance (END)',
    quickAdjustNonLethal: 'Dégâts non létaux',
    woundThresholdLabel: 'Seuil de blessures',
    woundPenaltyActive: 'PS < Seuil : RÉF, DEX, INT et VOL divisés par 2 !',
    deathStateBanner:
      'État de Mort imminente (PS < 0) : toutes les caractéristiques sont réduites à 1/3. Jet de sauvegarde contre la mort requis chaque round (-1 cumulatif).',
    deathSaveBtn: 'Jet Sauvegarde Mort',
    deathSaveSuccess: (roll, target) =>
      `Sauvegarde contre la mort réussie ! (1d10: ${roll} ≤ ${target})`,
    deathSaveFail: (roll, target) =>
      `Sauvegarde contre la mort échouée ! (1d10: ${roll} > ${target}) — Combattant décédé.`,
    stabilizeBtn: (dc) => `Stabiliser (Premiers soins SD ${dc})`,
    stabilizeToast: 'Combattant stabilisé à 1 PS.',
    unconsciousBanner:
      'Dégâts non létaux ≥ END actuelle (ou END à 0) : cible Inconsciente / Étourdie jusqu’à récupérer ≥ 20 END.',
    recoverEndBtn: (rec) => `Action Récupérer (+${rec} END)`,
    extraActionBtn: 'Action supp. (-3 END)',
    extraDefenseBtn: 'Défense supp. (-1 END)',
    extraDefenseFreeBtn: 'Défense supp. (Gratuite · Esquive active)',
    quickDrawToggle: 'Dégainage rapide (+3 Init / -3 Att)',
    activeDodgeToggle: 'Esquive active (-2 mêlée reçue)',
    aimActionBtn: 'Viser (+1, max +3)',
    clearAimBtn: 'RAZ Visée',
    adrenalineGainBtn: '+1 Dé d’Adrénaline',
    adrenalineSpendDmgBtn: 'Dé Adrénaline (+1d6 DÉG, -10 END)',
    adrenalineSpendHpBtn: 'Dé Adrénaline (+1d6 PS temp., -10 END)',
    adrenalineEmergencyBtn: 'Survie Adrénaline (repasse > 0 PS)',
    effectiveStatsTitle: 'Caractéristiques effectives (avec malus)',
    armorTitle: 'Armure par localisation (Pouvoir d’arrêt)',
    repairAllArmor: 'Tout réparer',
    conditionsTitle: 'Effets & États actifs',
    criticalsTitle: 'Blessures critiques',
    addRandomCrit: 'Tirer 2d6',
    critSeverityLabel: 'Gravité',
    critStateLabels: {
      active: 'Active',
      stabilized: 'Stabilisée',
      treated: 'Traitée',
    },
    critSeverities: {
      simple: 'Simple (+3)',
      complex: 'Complexe (+5)',
      difficult: 'Difficile (+8)',
      mortal: 'Mortelle (+10)',
    },
    noCriticals: 'Aucune blessure critique enregistrée.',
    weaponsTitle: 'Armes & Fiabilité (Fia)',
    addWeaponBtn: 'Ajouter arme',
    weaponNamePlaceholder: 'Nom de l’arme…',
    weaponDamagePlaceholder: 'Dégâts (ex. 3d6+2)',
    silverLabel: 'Argent',
    fiaLabel: 'Fia',
    traitsTitle: 'Traits, Vulnérabilités & Notes MJ',
    nonSilverResistantBadge: 'Résistant aux armes non-argent (÷2)',
    vulnerabilitiesLabel: 'Vulnérabilités',
    resistancesLabel: 'Résistances / Immunités',
    abilitiesLabel: 'Capacités spéciales',
    notesLabel: 'Notes de combat',
    notesPlaceholder: 'Notes tactiques, position, effets en cours…',
    reviveBtn: 'Rétablir (annuler mort)',
    initiativeLabel: 'Initiative',
  },
  addDialog: {
    title: 'Ajouter des combattants',
    description:
      'Importez depuis le Bestiaire officiel, chargez une fiche PJ JSON / un archétype ou créez un combattant personnalisé.',
    tabs: {
      hub: 'Hub MJ',
      bestiary: 'Bestiaire officiel',
      party: 'Archétypes & JSON',
      manual: 'Création manuelle',
    },
    searchBestiaryPlaceholder: 'Rechercher goule, bandit, griffon, chevalier…',
    filterAll: 'Tous',
    filterMonsters: 'Monstres',
    filterHumanoids: 'Humanoïdes',
    filterAnimals: 'Animaux',
    variantLabel: 'Variante / Caste',
    quantityLabel: 'Quantité',
    roleOverrideLabel: 'Camp',
    initiativeModeLabel: 'Initiative',
    initIndividual: 'Individuelle (1d10 chacun)',
    initGroup: 'De groupe (1d10 partagé + RÉF)',
    addFromBestiaryBtn: 'Ajouter à la scène',
    presetsTitle: 'Archétypes rapides',
    importJsonTitle: 'Importer une fiche du Générateur de PJ (.json)',
    importJsonDesc:
      'Chargez un fichier JSON exporté depuis le module Générateur de Fiche PJ pour importer ses statistiques et points de vie.',
    importJsonBtn: 'Importer un fichier JSON',
    importJsonError: 'Fichier JSON invalide pour une fiche de personnage.',
    addedToast: (name, count) =>
      count > 1 ? `${count}× ${name} ajoutés au combat.` : `${name} ajouté au combat.`,
    manual: {
      nameLabel: 'Nom',
      namePlaceholder: 'Ex. Bandit vétéran, Chevalier errant…',
      roleLabel: 'Camp',
      anatomyLabel: 'Anatomie',
      hpLabel: 'PS max',
      endLabel: 'END max',
      armorLabel: 'PA moyen (toutes zones)',
      refLabel: 'RÉF',
      dexLabel: 'DEX',
      corLabel: 'COR',
      vitLabel: 'VIT',
      intLabel: 'INT',
      volLabel: 'VOL',
      recLabel: 'RÉC',
      etouLabel: 'ÉTOU',
      nonSilverResistLabel: 'Résistant non-argent (Monstre ÷2)',
      submitBtn: 'Créer et ajouter',
    },
  },
  resolver: {
    title: 'Résolveur d’Attaque & Dégâts (The Witcher)',
    description:
      'Calcule la touche, les échecs/réussites critiques, la localisation, la pénétration d’armure, la détérioration du PA et les dégâts critiques.',
    attackerLabel: 'Attaquant',
    customAttacker: 'Attaquant externe / Personnalisé',
    defenderLabel: 'Défenseur (Cible)',
    weaponLabel: 'Arme utilisée',
    customWeapon: 'Saisie manuelle',
    attackRollSection: 'Jets d’Attaque vs Défense',
    attackBaseLabel: 'Base d’attaque (Carac + Comp + Mods)',
    defenseBaseLabel: 'Base de défense (Carac + Comp)',
    attackDieLabel: 'Jet 1d10 Attaque (10/1 explosifs)',
    defenseDieLabel: 'Jet 1d10 Défense (10/1 explosifs)',
    rollDiceBtn: 'Lancer Att. & Déf.',
    rollAttackDieBtn: 'Lancer Att. (1d10)',
    rollDefenseDieBtn: 'Lancer Déf. (1d10)',
    directTotalToggle: 'Total saisi (PJ)',
    attackDirectTotalLabel: 'Total d’attaque du joueur',
    defenseDirectTotalLabel: 'Total de défense du joueur',
    diceResultDetail: (rolls, total) =>
      rolls.length > 1
        ? `Dés [${rolls.join(', ')}] → ${total >= 0 ? `+${total}` : total}`
        : `Dé [${rolls[0]}] → ${total >= 0 ? `+${total}` : total}`,
    strikeModeLabel: 'Type de frappe',
    strikeNormal: 'Frappe normale',
    strikeFast: 'Frappe rapide (×2 att./rd)',
    strikeStrong: 'Frappe puissante (-3 Att, ×2 DÉG)',
    strikeExplosive: 'Bombe / Piège (toutes localisations)',
    flankingLabel: 'Adversaires en mêlée suppl. (-1 Déf/chacun)',
    rangeLabel: 'Portée / SD',
    coverLabel: 'Couvert (PA)',
    aimBonusLabel: 'Bonus de Visée (+0 à +3)',
    hitLocationLabel: 'Localisation du coup',
    randomLocationOption: 'Aléatoire (1d10)',
    rollLocationBtn: 'Tirer 1d10',
    damageSection: 'Calcul des dégâts',
    rawDamageLabel: 'Dégâts bruts lancés',
    rollDamageBtn: 'Lancer dégâts',
    damageTypeLabel: 'Type de dégâts',
    damageTypes: {
      slashing: 'Tranchant',
      piercing: 'Perforant',
      bludgeoning: 'Contondant',
      elemental: 'Élémental / Feu',
    },
    penetrationLabel: 'Perforation',
    penetrationTiers: {
      none: 'Aucune',
      normal: 'Perforation (ignore RD)',
      improved: 'Perforation améliorée (PA ÷2, ignore RD)',
    },
    isSilverLabel: 'Arme en argent',
    isTargetResistantLabel: 'Cible résistante à ce type (÷2)',
    isTargetVulnerableLabel: 'Cible vulnérable à ce type (×2)',
    isNonLethalLabel: 'Dégâts non létaux (END)',
    previewTitle: 'Aperçu de la résolution',
    outcomeHit: 'TOUCHE',
    outcomeMiss: 'MANQUÉ / PARÉ',
    outcomeCrit: (tier, bonus) => `CRITIQUE ${tier.toUpperCase()} (+${bonus} DÉG hors armure)`,
    outcomeFumble: (who, severity) => `ÉCHEC CRITIQUE (${who}) · Gravité ${severity}`,
    applyDamageBtn: 'Appliquer à la cible',
    closeBtn: 'Fermer',
    appliedToast: (target, dmg) => `${dmg} points appliqués sur ${target}.`,
  },
  log: {
    title: 'Journal chronologique du combat',
    empty: 'Aucun événement enregistré pour l’instant.',
    copyBtn: 'Copier le journal',
    copiedToast: 'Journal de combat copié dans le presse-papiers.',
    clearBtn: 'Vider le journal',
    deleteEntryLabel: 'Supprimer cette entrée',
    roundPrefix: (round) => `R${round}`,
  },
  rules: {
    title: 'Écran du MJ complet (Combat & Hors-combat)',
    subtitle:
      'Tables officielles de combat, magie, bestiaire et règles essentielles hors-affrontement de The Witcher JdR.',
    searchPlaceholder:
      'Filtrer une règle, SD, soin, chute, service, blessure…',
    categoryFilter: {
      all: 'Tout afficher',
      combat: 'Combat, Magie & Bestiaire',
      outOfCombat: 'Hors-combat & Survie',
    },
    sections: {
      modifiers: 'Modificateurs d’attaque & Portées',
      locations: 'Localisation des coups (Humains & Monstres)',
      criticals: 'Tables des Blessures critiques (2d6)',
      fumbles: 'Tables des Échecs critiques',
      conditions: 'Effets & États spéciaux',
      coverAndLight: 'Abris (PA), Luminosité & Superposition d’armure',
      magicRules: 'Règles de la Magie, Dangers, Sites d’Énergie & Envoûtements',
      grimoire: 'Grimoire rapide (Sorts, Invocations, Rituels, Signes & Envoûtements)',
      bestiaryRules: 'Guide du Bestiaire & Règles des créatures',
      dcScale: 'Barème officiel des SD (10 à 30), Modificateurs & Recherche',
      healingSurgery: 'Soins, Récupération, Chirurgie & Guérison des critiques',
      toxicityAddiction: 'Toxicité des potions, Seuil alchimique & Addiction',
      hazardsClimate: 'Chutes (calculateur d6), Noyade, Feu & Conditions climatiques',
      reputationRegion: 'Réputation (0–10) & Modificateurs régionaux du Continent',
      servicesPrices: 'Coûts de services courants (Pots-de-vin, Péages, Guides, Soins)',
    },
  },
  hub: {
    hubTab: 'Hub MJ & Combats',
    gmScreenTab: 'Écran du MJ complet',
    title: 'Hub du Maître de Jeu',
    subtitle:
      'Enregistrez et modifiez vos PJ persistants, puis composez des groupes réutilisables pour lancer chaque nouvel affrontement en un clic.',
    pcsTitle: 'Personnages Joueurs & Compagnons',
    pcsCountLabel: (count) => `${count} PJ`,
    newPcBtn: 'Nouveau PJ',
    importJsonBtn: 'Importer JSON',
    presetDropdownBtn: 'Depuis archétype',
    emptyPcsTitle: 'Aucun PJ enregistré dans le Hub',
    emptyPcsDesc:
      'Ajoutez les personnages de votre table (manuellement, par archétype ou depuis un fichier JSON du Générateur de PJ) pour les réutiliser à chaque combat.',
    inCombatBadge: 'En combat',
    addPcToCombatBtn: 'Envoyer au combat',
    editBtn: 'Modifier',
    duplicateBtn: 'Dupliquer',
    deleteBtn: 'Supprimer',
    deletePcTitle: 'Supprimer ce PJ du Hub ?',
    deletePcDesc: (name) =>
      `Le profil de « ${name} » sera supprimé du Hub MJ et retiré des groupes associés.`,
    pcSavedToast: (name) => `PJ « ${name} » enregistré dans le Hub.`,
    pcDeletedToast: (name) => `PJ « ${name} » supprimé.`,
    groupsTitle: 'Groupes d’affrontement & Équipes',
    groupsCountLabel: (count) => `${count} groupe(s)`,
    newGroupBtn: 'Nouveau groupe',
    emptyGroupsTitle: 'Aucun groupe configuré',
    emptyGroupsDesc:
      'Créez un groupe pour vos PJ, une embuscade ennemie ou une meute de monstres afin de les déployer d’un clic sur le tableau de combat.',
    groupInitBadge: 'Init. de groupe',
    individualInitBadge: 'Init. individuelle',
    groupMembersCount: (count) => `${count} combattant(s)`,
    addGroupToCombatBtn: 'Ajouter au combat',
    startNewEncounterBtn: 'Nouvel affrontement',
    newEncounterConfirmTitle: 'Démarrer un nouvel affrontement avec ce groupe ?',
    newEncounterConfirmDesc: (groupName) =>
      `Le combat en cours sera réinitialisé et remplacé par le groupe « ${groupName} » au Round 1 (vos PJ et groupes du Hub sont conservés).`,
    newEncounterConfirmBtn: 'Lancer l’affrontement',
    deleteGroupTitle: 'Supprimer ce groupe ?',
    deleteGroupDesc: (name) =>
      `Le groupe « ${name} » sera définitivement supprimé du Hub MJ.`,
    groupSavedToast: (name) => `Groupe « ${name} » enregistré.`,
    groupDeletedToast: (name) => `Groupe « ${name} » supprimé.`,
    groupAddedToast: (name, count) =>
      `Groupe « ${name} » déployé (${count} combattant(s)).`,
    groupEmptyWarning: 'Ce groupe ne contient aucun membre valide.',
    pcAlreadyInCombatNotice: (names) =>
      `Déjà présent(s) sur le tableau (ignoré(s)) : ${names}`,
    pcDialog: {
      createTitle: 'Créer un PJ dans le Hub',
      editTitle: 'Modifier le PJ du Hub',
      description:
        'Configurez ses caractéristiques, points de vie, armure par localisation et armes. Ces valeurs seront utilisées à chaque déploiement.',
      nameLabel: 'Nom du personnage',
      playerLabel: 'Nom du joueur',
      professionLabel: 'Race / Profession',
      roleLabel: 'Rôle',
      maxHpLabel: 'PS max',
      maxEndLabel: 'END max',
      statsTitle: 'Caractéristiques',
      armorTitle: 'Armure (PA max par localisation)',
      weaponsTitle: 'Armes équipées',
      notesLabel: 'Notes permanentes',
      cancelBtn: 'Annuler',
      saveBtn: 'Enregistrer le PJ',
    },
    groupDialog: {
      createTitle: 'Créer un groupe d’affrontement',
      editTitle: 'Modifier le groupe',
      description:
        'Assemblez des PJ du Hub, des monstres ou humanoïdes du Bestiaire et des combattants personnalisés.',
      nameLabel: 'Nom du groupe',
      namePlaceholder: 'Ex. Compagnie de Velen, Embuscade Scoia’tael…',
      descLabel: 'Description / Contexte',
      descPlaceholder: 'Notes tactiques, lieu d’embuscade…',
      groupInitSwitch: 'Initiative de groupe partagée (1d10 commun + RÉF)',
      membersTitle: 'Membres du groupe',
      noMembers: 'Aucun membre dans ce groupe pour l’instant.',
      addFromHubPcsTitle: 'Ajouter des PJ du Hub',
      noSavedPcsHint: 'Aucun PJ enregistré dans le Hub pour le moment.',
      addFromBestiaryTitle: 'Ajouter depuis le Bestiaire',
      searchBestiaryPlaceholder: 'Rechercher une créature ou faction…',
      addBestiaryBtn: 'Ajouter',
      addCustomTitle: 'Ajouter un profil rapide personnalisé',
      customNamePlaceholder: 'Ex. Chef bandit, Garde d’élite…',
      cancelBtn: 'Annuler',
      saveBtn: 'Enregistrer le groupe',
    },
  },
  sessions: {
    sessionsCountLabel: (count) => `${count} affrontement(s)`,
    newEmptyEncounterBtn: 'Nouvel affrontement vide',
    sectionTitle: 'Affrontements & Historique de campagne',
    sectionSubtitle:
      'Reprenez un combat interrompu en milieu de session avec l’état exact (Round, PS, END, effets) ou consultez le bilan et le journal d’un combat passé.',
    filterAll: 'Tous',
    filterActive: 'En cours',
    filterPaused: 'En pause',
    filterCompleted: 'Terminés',
    emptyTitle: 'Aucun affrontement enregistré',
    emptyDesc:
      'Lancez un nouvel affrontement vide ci-dessus ou déployez directement un groupe depuis la section Groupes ci-dessous.',
    statusLabels: {
      active: 'En cours',
      paused: 'En pause',
      completed: 'Terminé',
    },
    roundBadge: (round) => (round === 0 ? 'R0 · Préparation' : `Round ${round}`),
    survivorsBadge: (alive, total) => `${alive}/${total} en vie`,
    logsCountBadge: (count) => `${count} événement(s)`,
    activeTurnLabel: (name) => `Tour : ${name}`,
    updatedAtLabel: (date) => `Modifié : ${date}`,
    resumeBtn: 'Reprendre / Ouvrir',
    reviewBtn: 'Journal & Bilan',
    pauseBtn: 'Mettre en pause',
    completeBtn: 'Marquer terminé',
    reopenBtn: 'Rouvrir',
    duplicateBtn: 'Dupliquer',
    deleteBtn: 'Supprimer',
    deleteTitle: 'Supprimer cet affrontement ?',
    deleteDesc: (title) =>
      `L’affrontement « ${title} » et tout son journal de combat seront définitivement supprimés (vos PJ et groupes du Hub sont conservés).`,
    deletedToast: (title) => `Affrontement « ${title} » supprimé.`,
    createdToast: (title) => `Affrontement « ${title} » créé.`,
    duplicatedToast: (title) => `Affrontement dupliqué : « ${title} ».`,
    summaryDialog: {
      title: 'Bilan & Journal de l’affrontement',
      description:
        'Consultez les survivants, les blessures critiques et le journal chronologique complet sans modifier l’état du combat.',
      rosterTitle: 'État des combattants',
      logTitle: 'Journal chronologique complet',
      emptyRoster: 'Aucun combattant dans cette scène.',
      deadBadge: 'Mort',
      copySummaryBtn: 'Copier le bilan',
      copiedSummaryToast: 'Bilan et journal copiés dans le presse-papiers.',
      closeBtn: 'Fermer',
      resumeFromSummaryBtn: 'Reprendre ce combat',
    },
  },
  workspace: {
    backToHubBtn: 'Retour au Hub MJ',
    statusLabel: 'Statut',
    defaultUntitled: 'Nouvel affrontement',
    combatantAddedLog: (prefix, count, label) =>
      count > 1
        ? `${prefix}${count}× ${label} rejoignent le combat.`
        : `${prefix}${label} rejoint le combat.`,
    combatantRemovedLog: (prefix, name) =>
      `${prefix}${name} est retiré du combat.`,
    combatantDuplicatedLog: (prefix, source, clone) =>
      `${prefix}${source} est dupliqué (${clone}).`,
  },
};

const EN_COPY: CombatTrackerCopy = {
  header: {
    moduleTag: 'Official Combat Rules',
    tabs: {
      board: 'Combat Board',
      hub: 'GM Hub',
      log: 'Combat Log',
      rules: 'Rules & Reference Tables',
    },
  },
  toolbar: {
    encounterNamePlaceholder: 'Encounter name (e.g. Velen Road Ambush)…',
    roundLabel: 'Round',
    activeLabel: 'Active Turn',
    noActiveCombatant: 'None',
    combatantsCount: 'Combatants',
    prevTurn: 'Prev',
    nextTurn: 'Next Turn',
    startCombatBtn: 'Start Combat (R1)',
    prepRoundBadge: 'R0 · Preparation',
    prepRoundBanner:
      'Preparation Phase (R0): add all combatants and set PC initiatives before starting Round 1.',
    rollAllInit: 'Roll Initiatives',
    sortInit: 'Sort',
    addCombatant: 'Add',
    attackResolver: 'Resolve Attack / Damage',
    resetCombat: 'Reset',
    lightLevelLabel: 'Lighting',
    adrenalineRule: 'Adrenaline Rule',
    resetTitle: 'Reset current combat encounter?',
    resetDescription:
      'All combatants, round counters, critical wounds, and combat log entries will be cleared.',
    resetCancel: 'Cancel',
    resetConfirm: 'Clear All',
    roundWrappedToast: (round) => `Round ${round} started`,
    allInitRolledToast: 'Initiatives rolled and sorted (REF + 1d10).',
    resetToast: 'Combat reset.',
  },
  roles: {
    pc: 'PC',
    ally: 'Ally',
    enemy: 'Enemy',
    monster: 'Monster',
  },
  lighting: {
    bright: 'Bright Light (-3 Awareness · -3 Att/Def if facing sun)',
    daylight: 'Daylight (No penalty)',
    dim: 'Dim Light (-2 Awareness)',
    darkness: 'Darkness (-4 Awareness / -2 Att & Def)',
  },
  anatomy: {
    human: 'Humanoid',
    monster: 'Monster',
    elemental: 'Elemental (No organs)',
    specter: 'Specter (No organs/legs)',
  },
  roster: {
    title: 'Initiative Order',
    emptyTitle: 'No combatants in scene',
    emptyDesc:
      'Import monsters or humanoids from the Bestiary, load a PC sheet, or create a custom combatant.',
    emptyAddBtn: 'Add Combatants',
    initShort: 'Init',
    editInitTitle: 'Edit Initiative',
    editInitHint: (refStat) => `REF ${refStat} + player die or 1d10`,
    editInitApply: 'Apply',
    rerollInitBtn: '1d10 + REF',
    hpShort: 'HP',
    endShort: 'STA',
    nonLethalShort: 'NL',
    woundThresholdShort: 'WT',
    woundedBadge: 'Below Threshold (÷2)',
    dyingBadge: 'Death State',
    unconsciousBadge: 'Unconscious / K.O.',
    deadBadge: 'Dead',
    delayedBadge: 'Delayed',
    quickDrawBadge: 'Quick Draw +3',
    activeDodgeBadge: 'Active Dodge',
    aimBadge: (stacks) => `Aim +${stacks}`,
    duplicateAction: 'Duplicate',
    delayAction: 'Delay Turn',
    undelayAction: 'Resume Turn',
    removeAction: 'Remove',
  },
  inspector: {
    noSelectionTitle: 'Select a combatant',
    noSelectionDesc:
      'Select any entry in the initiative order to manage HP, Stamina, per-location Armor SP, conditions, and critical wounds.',
    vitalsTab: 'Vitals & Actions',
    armorConditionsTab: 'Armor & Conditions',
    criticalsWeaponsTab: 'Criticals & Weapons',
    quickAdjustHp: 'Hit Points (HP)',
    quickAdjustEnd: 'Stamina (STA)',
    quickAdjustNonLethal: 'Non-Lethal Damage',
    woundThresholdLabel: 'Wound Threshold',
    woundPenaltyActive: 'HP < Threshold: REF, DEX, INT, and WILL are halved!',
    deathStateBanner:
      'Death State (HP < 0): all stats reduced to 1/3. Death Save required every round (-1 cumulative penalty).',
    deathSaveBtn: 'Roll Death Save',
    deathSaveSuccess: (roll, target) =>
      `Death Save succeeded! (1d10: ${roll} ≤ ${target})`,
    deathSaveFail: (roll, target) =>
      `Death Save failed! (1d10: ${roll} > ${target}) — Combatant died.`,
    stabilizeBtn: (dc) => `Stabilize (First Aid DC ${dc})`,
    stabilizeToast: 'Combatant stabilized at 1 HP.',
    unconsciousBanner:
      'Non-lethal damage ≥ current STA (or STA at 0): Unconscious / Stunned until recovering ≥ 20 STA.',
    recoverEndBtn: (rec) => `Recovery Action (+${rec} STA)`,
    extraActionBtn: 'Extra Action (-3 STA)',
    extraDefenseBtn: 'Extra Defense (-1 STA)',
    extraDefenseFreeBtn: 'Extra Defense (Free · Active Dodge)',
    quickDrawToggle: 'Quick Draw (+3 Init / -3 Att)',
    activeDodgeToggle: 'Active Dodge (-2 incoming melee)',
    aimActionBtn: 'Aim (+1, max +3)',
    clearAimBtn: 'Reset Aim',
    adrenalineGainBtn: '+1 Adrenaline Die',
    adrenalineSpendDmgBtn: 'Adrenaline Die (+1d6 DMG, -10 STA)',
    adrenalineSpendHpBtn: 'Adrenaline Die (+1d6 Temp HP, -10 STA)',
    adrenalineEmergencyBtn: 'Adrenaline Surge (stay above 0 HP)',
    effectiveStatsTitle: 'Effective Stats (with penalties)',
    armorTitle: 'Per-Location Armor (Stopping Power)',
    repairAllArmor: 'Repair All',
    conditionsTitle: 'Active Conditions & Effects',
    criticalsTitle: 'Critical Wounds',
    addRandomCrit: 'Roll 2d6',
    critSeverityLabel: 'Severity',
    critStateLabels: {
      active: 'Active',
      stabilized: 'Stabilized',
      treated: 'Treated',
    },
    critSeverities: {
      simple: 'Simple (+3)',
      complex: 'Complex (+5)',
      difficult: 'Difficult (+8)',
      mortal: 'Deadly (+10)',
    },
    noCriticals: 'No critical wounds recorded.',
    weaponsTitle: 'Weapons & Reliability (REL)',
    addWeaponBtn: 'Add Weapon',
    weaponNamePlaceholder: 'Weapon name…',
    weaponDamagePlaceholder: 'Damage (e.g. 3d6+2)',
    silverLabel: 'Silver',
    fiaLabel: 'REL',
    traitsTitle: 'Traits, Vulnerabilities & GM Notes',
    nonSilverResistantBadge: 'Resistant to non-silver weapons (÷2)',
    vulnerabilitiesLabel: 'Vulnerabilities',
    resistancesLabel: 'Resistances / Immunities',
    abilitiesLabel: 'Special Abilities',
    notesLabel: 'Combat Notes',
    notesPlaceholder: 'Tactical notes, positioning, active spells…',
    reviveBtn: 'Revive (clear death)',
    initiativeLabel: 'Initiative',
  },
  addDialog: {
    title: 'Add Combatants',
    description:
      'Import from the official Bestiary, load a PC JSON sheet / archetype preset, or build a custom combatant.',
    tabs: {
      hub: 'GM Hub',
      bestiary: 'Official Bestiary',
      party: 'Presets & JSON',
      manual: 'Manual Entry',
    },
    searchBestiaryPlaceholder: 'Search ghoul, bandit, griffin, knight…',
    filterAll: 'All',
    filterMonsters: 'Monsters',
    filterHumanoids: 'Humanoids',
    filterAnimals: 'Animals',
    variantLabel: 'Variant / Caste',
    quantityLabel: 'Quantity',
    roleOverrideLabel: 'Allegiance',
    initiativeModeLabel: 'Initiative',
    initIndividual: 'Individual (1d10 each)',
    initGroup: 'Group (shared 1d10 + REF)',
    addFromBestiaryBtn: 'Add to Combat',
    presetsTitle: 'Quick Archetypes',
    importJsonTitle: 'Import Character Generator Sheet (.json)',
    importJsonDesc:
      'Upload a JSON file exported from the Character Sheet Generator to import derived stats and HP.',
    importJsonBtn: 'Import JSON File',
    importJsonError: 'Invalid Character Sheet JSON file.',
    addedToast: (name, count) =>
      count > 1 ? `Added ${count}× ${name} to combat.` : `Added ${name} to combat.`,
    manual: {
      nameLabel: 'Name',
      namePlaceholder: 'e.g. Veteran Bandit, Hedge Knight…',
      roleLabel: 'Allegiance',
      anatomyLabel: 'Anatomy',
      hpLabel: 'Max HP',
      endLabel: 'Max STA',
      armorLabel: 'Default SP (all zones)',
      refLabel: 'REF',
      dexLabel: 'DEX',
      corLabel: 'BODY',
      vitLabel: 'SPD',
      intLabel: 'INT',
      volLabel: 'WILL',
      recLabel: 'REC',
      etouLabel: 'STUN',
      nonSilverResistLabel: 'Non-silver resistant (Monster ÷2)',
      submitBtn: 'Create & Add',
    },
  },
  resolver: {
    title: 'Witcher Attack & Damage Resolver',
    description:
      'Computes hit/miss, exploding 10/1 criticals & fumbles, hit location, armor penetration, SP degradation, and critical wound tiers.',
    attackerLabel: 'Attacker',
    customAttacker: 'External / Custom Attacker',
    defenderLabel: 'Defender (Target)',
    weaponLabel: 'Weapon',
    customWeapon: 'Manual Entry',
    attackRollSection: 'Attack vs. Defense Rolls',
    attackBaseLabel: 'Attack Base (Stat + Skill + Mods)',
    defenseBaseLabel: 'Defense Base (Stat + Skill)',
    attackDieLabel: 'Attack 1d10 (exploding 10/1)',
    defenseDieLabel: 'Defense 1d10 (exploding 10/1)',
    rollDiceBtn: 'Roll Att. & Def.',
    rollAttackDieBtn: 'Roll Att. (1d10)',
    rollDefenseDieBtn: 'Roll Def. (1d10)',
    directTotalToggle: 'Direct Total (PC)',
    attackDirectTotalLabel: 'Player Attack Total',
    defenseDirectTotalLabel: 'Player Defense Total',
    diceResultDetail: (rolls, total) =>
      rolls.length > 1
        ? `Dice [${rolls.join(', ')}] → ${total >= 0 ? `+${total}` : total}`
        : `Die [${rolls[0]}] → ${total >= 0 ? `+${total}` : total}`,
    strikeModeLabel: 'Strike Type',
    strikeNormal: 'Standard Strike',
    strikeFast: 'Fast Strike (2 att/rd)',
    strikeStrong: 'Strong Strike (-3 Att, ×2 DMG)',
    strikeExplosive: 'Bomb / Trap (all locations)',
    flankingLabel: 'Extra melee attackers (-1 Def each)',
    rangeLabel: 'Range / DC',
    coverLabel: 'Cover (SP)',
    aimBonusLabel: 'Aim Bonus (+0 to +3)',
    hitLocationLabel: 'Hit Location',
    randomLocationOption: 'Random (1d10)',
    rollLocationBtn: 'Roll 1d10',
    damageSection: 'Damage Calculation',
    rawDamageLabel: 'Raw Rolled Damage',
    rollDamageBtn: 'Roll Damage',
    damageTypeLabel: 'Damage Type',
    damageTypes: {
      slashing: 'Slashing',
      piercing: 'Piercing',
      bludgeoning: 'Bludgeoning',
      elemental: 'Elemental / Fire',
    },
    penetrationLabel: 'Armor Penetration',
    penetrationTiers: {
      none: 'None',
      normal: 'Armor Piercing (ignores DR)',
      improved: 'Improved Armor Piercing (SP ÷2, ignores DR)',
    },
    isSilverLabel: 'Silver Weapon',
    isTargetResistantLabel: 'Target Resistant (÷2)',
    isTargetVulnerableLabel: 'Target Vulnerable (×2)',
    isNonLethalLabel: 'Non-Lethal Damage (STA)',
    previewTitle: 'Resolution Preview',
    outcomeHit: 'HIT',
    outcomeMiss: 'MISSED / DEFENDED',
    outcomeCrit: (tier, bonus) => `${tier.toUpperCase()} CRITICAL (+${bonus} bypass DMG)`,
    outcomeFumble: (who, severity) => `CRITICAL FUMBLE (${who}) · Severity ${severity}`,
    applyDamageBtn: 'Apply to Target',
    closeBtn: 'Close',
    appliedToast: (target, dmg) => `Applied ${dmg} points to ${target}.`,
  },
  log: {
    title: 'Chronological Combat Log',
    empty: 'No combat events logged yet.',
    copyBtn: 'Copy Log',
    copiedToast: 'Combat log copied to clipboard.',
    clearBtn: 'Clear Log',
    deleteEntryLabel: 'Delete this entry',
    roundPrefix: (round) => `R${round}`,
  },
  rules: {
    title: 'Complete GM Screen (Combat & Out-of-Combat)',
    subtitle:
      'Official combat, magic, bestiary, and essential out-of-combat reference tables from The Witcher TRPG.',
    searchPlaceholder: 'Filter rules, DCs, healing, falls, services, wounds…',
    categoryFilter: {
      all: 'Show All',
      combat: 'Combat, Magic & Bestiary',
      outOfCombat: 'Out-of-Combat & Survival',
    },
    sections: {
      modifiers: 'Attack Modifiers & Ranges',
      locations: 'Hit Locations (Humans & Monsters)',
      criticals: 'Critical Wounds Tables (2d6)',
      fumbles: 'Critical Failure (Fumble) Tables',
      conditions: 'Status Conditions & Effects',
      coverAndLight: 'Cover SP, Lighting & Armor Layering',
      magicRules: 'Magic Rules, Overcasting, Places of Power & Hexes',
      grimoire: 'Quick Grimoire (Spells, Invocations, Rituals, Signs & Hexes)',
      bestiaryRules: 'Bestiary Guide & Creature Categories',
      dcScale: 'Official DC Scale (10–30), Modifiers & Foraging',
      healingSurgery: 'Healing, Recovery, Surgery & Critical Wound Healing',
      toxicityAddiction: 'Potion Toxicity, Overdose & Addiction Rules',
      hazardsClimate: 'Falling (d6 Calculator), Drowning, Fire & Weather',
      reputationRegion: 'Reputation Tiers (0–10) & Regional Attitude Modifiers',
      servicesPrices: 'Common Service Costs (Bribes, Tolls, Guides, Apothecary)',
    },
  },
  hub: {
    hubTab: 'GM Hub & Encounters',
    gmScreenTab: 'Complete GM Screen',
    title: 'Game Master Hub',
    subtitle:
      'Save and edit your persistent PCs, then build reusable encounter groups to deploy any new fight in one click.',
    pcsTitle: 'Player Characters & Companions',
    pcsCountLabel: (count) => `${count} PCs`,
    newPcBtn: 'New PC',
    importJsonBtn: 'Import JSON',
    presetDropdownBtn: 'From Archetype',
    emptyPcsTitle: 'No PCs saved in the Hub',
    emptyPcsDesc:
      'Add your table’s characters (manually, from archetypes, or via a Character Generator JSON) to reuse them across encounters.',
    inCombatBadge: 'In Combat',
    addPcToCombatBtn: 'Send to Combat',
    editBtn: 'Edit',
    duplicateBtn: 'Duplicate',
    deleteBtn: 'Delete',
    deletePcTitle: 'Delete this PC from the Hub?',
    deletePcDesc: (name) =>
      `“${name}” will be removed from the GM Hub and detached from any saved groups.`,
    pcSavedToast: (name) => `PC “${name}” saved to Hub.`,
    pcDeletedToast: (name) => `PC “${name}” deleted.`,
    groupsTitle: 'Encounter & Party Groups',
    groupsCountLabel: (count) => `${count} group(s)`,
    newGroupBtn: 'New Group',
    emptyGroupsTitle: 'No groups configured yet',
    emptyGroupsDesc:
      'Build a PC party group, an enemy ambush, or a monster pack to deploy into combat with one click.',
    groupInitBadge: 'Group Init',
    individualInitBadge: 'Individual Init',
    groupMembersCount: (count) => `${count} combatant(s)`,
    addGroupToCombatBtn: 'Add to Combat',
    startNewEncounterBtn: 'New Encounter',
    newEncounterConfirmTitle: 'Start a new encounter with this group?',
    newEncounterConfirmDesc: (groupName) =>
      `The current combat board will be cleared and replaced with “${groupName}” at Round 1 (your Hub PCs and groups stay safe).`,
    newEncounterConfirmBtn: 'Launch Encounter',
    deleteGroupTitle: 'Delete this group?',
    deleteGroupDesc: (name) =>
      `Group “${name}” will be permanently deleted from the GM Hub.`,
    groupSavedToast: (name) => `Group “${name}” saved.`,
    groupDeletedToast: (name) => `Group “${name}” deleted.`,
    groupAddedToast: (name, count) =>
      `Group “${name}” deployed (${count} combatant(s)).`,
    groupEmptyWarning: 'This group has no valid members.',
    pcAlreadyInCombatNotice: (names) =>
      `Already on board (skipped): ${names}`,
    pcDialog: {
      createTitle: 'Create Hub PC',
      editTitle: 'Edit Hub PC',
      description:
        'Configure stats, HP/STA, per-location armor SP, and weapons. These values are used whenever deployed.',
      nameLabel: 'Character Name',
      playerLabel: 'Player Name',
      professionLabel: 'Race / Profession',
      roleLabel: 'Role',
      maxHpLabel: 'Max HP',
      maxEndLabel: 'Max STA',
      statsTitle: 'Characteristics',
      armorTitle: 'Armor (Max SP per location)',
      weaponsTitle: 'Equipped Weapons',
      notesLabel: 'Persistent Notes',
      cancelBtn: 'Cancel',
      saveBtn: 'Save PC',
    },
    groupDialog: {
      createTitle: 'Create Encounter Group',
      editTitle: 'Edit Group',
      description:
        'Combine Hub PCs, Bestiary monsters/humanoids, and custom combatants.',
      nameLabel: 'Group Name',
      namePlaceholder: 'e.g. Velen Party, Scoia’tael Ambush…',
      descLabel: 'Description / Context',
      descPlaceholder: 'Tactical notes, ambush setup…',
      groupInitSwitch: 'Shared Group Initiative (common 1d10 + REF)',
      membersTitle: 'Group Members',
      noMembers: 'No members in this group yet.',
      addFromHubPcsTitle: 'Add Hub PCs',
      noSavedPcsHint: 'No PCs saved in the Hub yet.',
      addFromBestiaryTitle: 'Add from Bestiary',
      searchBestiaryPlaceholder: 'Search creature or faction…',
      addBestiaryBtn: 'Add',
      addCustomTitle: 'Add Custom Quick Member',
      customNamePlaceholder: 'e.g. Bandit Leader, Elite Guard…',
      cancelBtn: 'Cancel',
      saveBtn: 'Save Group',
    },
  },
  sessions: {
    sessionsCountLabel: (count) => `${count} encounter(s)`,
    newEmptyEncounterBtn: 'New Empty Encounter',
    sectionTitle: 'Saved Encounters & Campaign History',
    sectionSubtitle:
      'Resume a mid-session encounter at its exact Round/HP/STA/condition state, or inspect the casualty summary and log of past fights.',
    filterAll: 'All',
    filterActive: 'In Progress',
    filterPaused: 'Paused',
    filterCompleted: 'Completed',
    emptyTitle: 'No saved encounters yet',
    emptyDesc:
      'Start a blank encounter above or launch directly from one of your saved Encounter Groups below.',
    statusLabels: {
      active: 'In Progress',
      paused: 'Paused',
      completed: 'Completed',
    },
    roundBadge: (round) => (round === 0 ? 'R0 · Prep' : `Round ${round}`),
    survivorsBadge: (alive, total) => `${alive}/${total} alive`,
    logsCountBadge: (count) => `${count} log event(s)`,
    activeTurnLabel: (name) => `Turn: ${name}`,
    updatedAtLabel: (date) => `Updated: ${date}`,
    resumeBtn: 'Resume / Open',
    reviewBtn: 'Log & Summary',
    pauseBtn: 'Pause',
    completeBtn: 'Mark Completed',
    reopenBtn: 'Reopen',
    duplicateBtn: 'Duplicate',
    deleteBtn: 'Delete',
    deleteTitle: 'Delete this encounter?',
    deleteDesc: (title) =>
      `Encounter “${title}” and its combat log will be permanently deleted (your Hub PCs and groups stay intact).`,
    deletedToast: (title) => `Encounter “${title}” deleted.`,
    createdToast: (title) => `Encounter “${title}” created.`,
    duplicatedToast: (title) => `Duplicated encounter: “${title}”.`,
    summaryDialog: {
      title: 'Encounter Summary & Combat Log',
      description:
        'Inspect final combatant states, critical wounds, and the chronological combat log in read-only mode.',
      rosterTitle: 'Combatant Standings',
      logTitle: 'Full Chronological Log',
      emptyRoster: 'No combatants recorded in this scene.',
      deadBadge: 'Dead',
      copySummaryBtn: 'Copy Summary',
      copiedSummaryToast: 'Encounter summary and log copied to clipboard.',
      closeBtn: 'Close',
      resumeFromSummaryBtn: 'Resume Encounter',
    },
  },
  workspace: {
    backToHubBtn: 'Back to GM Hub',
    statusLabel: 'Status',
    defaultUntitled: 'New Encounter',
    combatantAddedLog: (prefix, count, label) =>
      count > 1
        ? `${prefix}${count}× ${label} join the combat.`
        : `${prefix}${label} joins the combat.`,
    combatantRemovedLog: (prefix, name) =>
      `${prefix}${name} is removed from combat.`,
    combatantDuplicatedLog: (prefix, source, clone) =>
      `${prefix}${source} duplicated (${clone}).`,
  },
};

export function getCombatTrackerCopy(lang: ModuleLanguage): CombatTrackerCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
