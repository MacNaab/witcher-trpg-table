import type { ModuleLanguage, PrimaryStatKey, WizardStepId } from './types';

export interface CharacterGeneratorCopy {
  header: {
    moduleTag: string;
    modeSimple: string;
    modeSimpleHint: string;
    modeAdvanced: string;
    modeAdvancedHint: string;
    randomFull: string;
    importJson: string;
    exportJson: string;
    resetBtn: string;
    resetDialogTitle: string;
    resetDialogBody: string;
    resetConfirm: string;
    cancel: string;
    quickGeneratedToast: string;
    importedToast: string;
    importErrorToast: string;
    resetToast: string;
  };
  steps: Record<
    WizardStepId,
    {
      label: string;
      shortLabel: string;
      description: string;
    }
  >;
  nav: {
    previous: string;
    next: string;
    finish: string;
    validationTitle: string;
  };
  identity: {
    title: string;
    subtitle: string;
    playerName: string;
    playerNamePlaceholder: string;
    characterName: string;
    characterNamePlaceholder: string;
    gender: string;
    genderPlaceholder: string;
    male: string;
    female: string;
    race: string;
    racePlaceholder: string;
    profession: string;
    professionPlaceholder: string;
    extendedNote: string;
    racialPerksTitle: string;
    definingSkillLabel: string;
    definingSkillRuleLabel: string;
    vigorLabel: string;
    magicAssetsLabel: string;
    talentTreeBtn: string;
    talentTreeTitle: string;
    talentTreeEmpty: string;
    talentAllBranches: string;
    talentTierLabel: string;
    halflingWarning: string;
    halflingBlocked: string;
    noRaceOrProfSelected: string;
    racesGuideBtn: string;
    racesGuideTitle: string;
    racesGuideSubtitle: string;
    racesTab: string;
    socialStatusTab: string;
    socialStandingLabel: string;
    startingTreasureLabel: string;
    englishSourceNotice: string;
    loreLabel: string;
    societyRuleLabel: string;
  };
  lifepath: {
    title: string;
    subtitle: string;
    customToggleLabel: string;
    customToggleHint: string;
    randomizeBtn: string;
    fatesDialogBtn: string;
    fatesDialogTitle: string;
    fatesDialogSubtitle: string;
    fatesTabs: {
      familyFate: string;
      parentalFate: string;
      familyStanding: string;
      mentor: string;
    };
    selectPlaceholder: string;
    standard: {
      region: string;
      origin: string;
      familyStatus: string;
      familyAlive: string;
      familyTragedy: string;
      familyFate: string;
      parentsStatus: string;
      parentsAlive: string;
      parentsDead: string;
      parentalFate: string;
      familyStanding: string;
      mentor: string;
      siblingsCount: string;
      rerollSiblings: string;
      noSiblings: string;
      ageLabel: string;
      yearsSuffix: string;
      decadeLabel: string;
      rollAllDecades: string;
      rollDecade: string;
      nativeLanguageBadge: string;
    };
    witcher: {
      ageTaken: string;
      school: string;
      rollTrainingBtn: string;
      earlyTraining: string;
      trialOutcome: string;
      importantEvent: string;
      currentStatus: string;
      decadeRiskLabel: string;
      decadePlaceholder: string;
    };
    mage: {
      ageEntered: string;
      academy: string;
      rollTrainingBtn: string;
      trainingEvent: string;
      graduationOutcome: string;
      importantEvent: string;
      currentStatus: string;
      decadeRiskLabel: string;
      decadePlaceholder: string;
    };
    riskLevels: {
      safe: string;
      ordinary: string;
      reckless: string;
      risky: string;
    };
    custom: {
      originLabel: string;
      originPlaceholder: string;
      originSuggestions: string;
      ageLabel: string;
      agePlaceholder: string;
      backstoryLabel: string;
      backstoryPlaceholder: string;
    };
  };
  stats: {
    title: string;
    subtitle: string;
    budgetLabel: string;
    spentLabel: string;
    remainingLabel: string;
    presetsLabel: string;
    balancedFillBtn: string;
    resetStatsBtn: string;
    cap13Label: string;
    ignoreBudgetLabel: string;
    derivedTitle: string;
    derivedNames: {
      stun: string;
      run: string;
      leap: string;
      hp: string;
      stamina: string;
      recovery: string;
      encumbrance: string;
      vigor: string;
    };
    derivedFormulas: {
      stun: string;
      run: string;
      leap: string;
      hp: string;
      stamina: string;
      recovery: string;
      encumbrance: string;
      vigor: string;
    };
    dwarfEncNote: string;
    gnomeEncNote: string;
    statNames: Record<PrimaryStatKey, { name: string; hint: string }>;
  };
  professionSkills: {
    title: string;
    subtitle: string;
    budgetRemaining: string;
    spentOf: string;
    cap13Label: string;
    ignoreBudgetLabel: string;
    definingSkillTitle: string;
    definingSkillHint: string;
    nativeLangAuto: string;
    slotsSectionTitle: string;
    combatSlotLabel: string;
    craftSlotLabel: string;
    languageSlotLabel: string;
    slotPlaceholder: string;
    tableHeaders: {
      skill: string;
      attr: string;
      rank: string;
      cost: string;
      total: string;
    };
    doubleCostTag: string;
    magicSectionTitle: string;
    magicRulesBtn: string;
    magicRulesTitle: string;
    magicRulesSubtitle: string;
    magicUnofficialToggle: string;
    magicUnofficialHint: string;
    witcherSignsNote: string;
    slotsSpell: string;
    slotsInvocation: string;
    slotsRitual: string;
    slotsHex: string;
    slotsVampire: string;
    selectSpellPlaceholder: string;
    addSpellBtn: string;
    emptyMagicSelection: string;
    unofficialTag: string;
    staminaLabel: string;
    rangeLabel: string;
    durationLabel: string;
    defenseLabel: string;
  };
  generalSkills: {
    title: string;
    subtitle: string;
    budgetLabel: string;
    budgetFormula: string;
    remainingLabel: string;
    ignoreBudgetNote: string;
    excludedInfo: string;
  };
  gear: {
    title: string;
    subtitle: string;
    weightLabel: string;
    encumbranceMax: string;
    overweightWarning: string;
    freeItemsTitle: string;
    starterPickTitle: string;
    starterPickCount: string;
    witcherFormulaTitle: string;
    decoctionLabel: string;
    oilLabel: string;
    potionLabel: string;
    formulaPlaceholder: string;
    compendiumTitle: string;
    compendiumSearchBtn: string;
    compendiumDialogTitle: string;
    compendiumSearchPlaceholder: string;
    compendiumNoResults: string;
    compendiumCategoryAll: string;
    customInventoryTitle: string;
    customInventoryEmpty: string;
    qtyLabel: string;
    weightUnit: string;
    tooltipCategory: string;
    tooltipStats: string;
    tooltipNoDescription: string;
    personalDescriptionTitle: string;
    personalDescriptionPlaceholder: string;
    startingTreasureTitle: string;
  };
  summary: {
    title: string;
    subtitle: string;
    copyTextBtn: string;
    copiedToast: string;
    exportJsonBtn: string;
    exportPdfBtn: string;
    exportingPdfBtn: string;
    exportedPdfToast: string;
    exportPdfErrorToast: string;
    sendToHubBtn: string;
    sentToHubToast: (name: string) => string;
    openGmHubBtn: string;
    identitySection: string;
    playerLabel: string;
    characterLabel: string;
    racePerksLabel: string;
    lifepathSection: string;
    primaryStatsSection: string;
    derivedStatsSection: string;
    skillsSection: string;
    skillsActiveOnlyToggle: string;
    magicSection: string;
    gearSection: string;
    talentsSection: string;
    noMagic: string;
    noGear: string;
    totalWeightLabel: string;
    signatureBadge: string;
    nativeBadge: string;
    socialStandingLabel: string;
    startingTreasureLabel: string;
  };
  errors: {
    missingPlayerName: string;
    missingCharacterName: string;
    missingGender: string;
    missingRace: string;
    missingProfession: string;
    halflingRestricted: string;
    incompleteStandardLifepath: string;
    incompleteWitcherLifepath: string;
    incompleteMageLifepath: string;
    incompleteCustomLifepath: string;
    statsRemaining: string;
    definingSkillMin: string;
    professionSlotsIncomplete: string;
    professionSkillMinRank: string;
    professionSkillsBudget: string;
    magicSlotsIncomplete: string;
    generalSkillsBudget: string;
    starterGearLimit: string;
    witcherFormulaeIncomplete: string;
  };
}

const FR_COPY: CharacterGeneratorCopy = {
  header: {
    moduleTag: 'GÉNÉRATEUR DE FICHE PJ',
    modeSimple: 'Mode Simple (Guidé)',
    modeSimpleHint: 'Règles strictes du livre de base : budgets bloquants, historiques guidés et magie Novice.',
    modeAdvanced: 'Mode Avancé (Libre)',
    modeAdvancedHint: 'Budgets libres ou modifiables, seuils jusqu’à 13, historique libre et accès complet au compendium.',
    randomFull: 'PJ aléatoire',
    importJson: 'Importer JSON',
    exportJson: 'Exporter JSON',
    resetBtn: 'Réinitialiser',
    resetDialogTitle: 'Réinitialiser la fiche de personnage ?',
    resetDialogBody:
      'Toutes les caractéristiques, compétences, historiques, sorts et équipements en cours seront effacés.',
    resetConfirm: 'Confirmer la réinitialisation',
    cancel: 'Annuler',
    quickGeneratedToast: 'Personnage complet généré aléatoirement.',
    importedToast: 'Fiche JSON importée avec succès.',
    importErrorToast: 'Fichier JSON invalide ou incompatible.',
    resetToast: 'La fiche a été réinitialisée.',
  },
  steps: {
    identity: {
      label: '1. Identité',
      shortLabel: 'Identité',
      description: 'Nom, genre, race et profession',
    },
    lifepath: {
      label: '2. Historique',
      shortLabel: 'Historique',
      description: 'Origines, destin familial et décennies',
    },
    stats: {
      label: '3. Caractéristiques',
      shortLabel: 'Carac.',
      description: 'Attributs primaires et statistiques dérivées',
    },
    professionSkills: {
      label: '4. Comp. de profession',
      shortLabel: 'Profession',
      description: 'Compétence signature, pack de classe et magie',
    },
    generalSkills: {
      label: '5. Comp. générales',
      shortLabel: 'Générales',
      description: 'Points libres (INT + RÉF)',
    },
    gear: {
      label: '6. Équipement',
      shortLabel: 'Équipement',
      description: 'Pack de départ, compendium d’objets et description',
    },
    summary: {
      label: '7. Dossier PJ',
      shortLabel: 'Fiche finale',
      description: 'Récapitulatif complet, arbres de talents et export',
    },
  },
  nav: {
    previous: 'Étape précédente',
    next: 'Étape suivante',
    finish: 'Voir la fiche complète',
    validationTitle: 'Validation requise avant de continuer :',
  },
  identity: {
    title: 'Identité du personnage',
    subtitle: 'Définissez l’état civil, la race et la profession de votre personnage.',
    playerName: 'Nom du joueur',
    playerNamePlaceholder: 'Ex. Antoine',
    characterName: 'Nom du personnage',
    characterNamePlaceholder: 'Ex. Geralt de Riv',
    gender: 'Genre',
    genderPlaceholder: 'Choisir le genre',
    male: 'Homme',
    female: 'Femme',
    race: 'Race',
    racePlaceholder: 'Choisir une race',
    profession: 'Profession',
    professionPlaceholder: 'Choisir une profession',
    extendedNote: '* Races et professions issues des suppléments officiels ou communautaires.',
    racialPerksTitle: 'Atouts raciaux',
    definingSkillLabel: 'Compétence signature',
    definingSkillRuleLabel: 'Compétence exclusive (Livre de base)',
    vigorLabel: 'Seuil de Vigueur',
    magicAssetsLabel: 'Atouts magiques de départ',
    talentTreeBtn: 'Voir l’arbre de talents',
    talentTreeTitle: 'Arbre de talents de la profession',
    talentTreeEmpty: 'Cette profession ne dispose pas d’arbre de talents dédié dans le compendium.',
    talentAllBranches: 'Toutes les branches',
    talentTierLabel: 'Palier',
    halflingWarning:
      'Remarque (Mode Avancé) : selon le livre de base, seuls les Humains et les Elfes peuvent devenir Mage ou Prêtre / Druide. Option débloquée en mode Avancé.',
    halflingBlocked:
      'En mode Simple, seuls les Humains et les Elfes peuvent exercer la profession Mage ou Prêtre / Druide.',
    noRaceOrProfSelected: 'Sélectionnez une race et une profession pour consulter leurs bonus.',
    racesGuideBtn: 'Guide des races & Statut social',
    racesGuideTitle: 'Guide des Races & Statut Social',
    racesGuideSubtitle: 'Particularités raciales détaillées, règles de société et matrice officielle de Statut social selon les territoires.',
    racesTab: 'Races & Atouts',
    socialStatusTab: 'Statut social (Territoires)',
    socialStandingLabel: 'Statut social sur le Continent',
    startingTreasureLabel: 'Trésor / Bourse de départ',
    englishSourceNotice: 'Certains passages issus des suppléments sont basés sur le texte source anglais (traduction officielle indisponible).',
    loreLabel: 'Présentation',
    societyRuleLabel: 'Règle particulière',
  },
  lifepath: {
    title: 'Historique & Vécu',
    subtitle: 'Suivez les tables aléatoires/guidées du livre de base ou rédigez un historique libre.',
    customToggleLabel: 'Historique libre',
    customToggleHint: 'Remplace les tables guidées par des champs libres d’origine, d’âge et de biographie.',
    randomizeBtn: 'Tout tirer aléatoirement',
    fatesDialogBtn: 'Table des Destins & Mentors',
    fatesDialogTitle: 'Référentiel des Destins familiaux & Mentors',
    fatesDialogSubtitle: 'Consultez les conséquences complètes selon la région sélectionnée.',
    fatesTabs: {
      familyFate: 'Destin familial',
      parentalFate: 'Destin parental',
      familyStanding: 'Statut social',
      mentor: 'Mentor',
    },
    selectPlaceholder: 'Choisir une option…',
    standard: {
      region: 'Région natale',
      origin: 'Pays / Province d’origine',
      familyStatus: 'Situation familiale',
      familyAlive: 'Famille en vie et unie',
      familyTragedy: 'Tragédie familiale',
      familyFate: 'Destin familial',
      parentsStatus: 'Situation parentale',
      parentsAlive: 'Parents en vie',
      parentsDead: 'Parents disparus / décédés',
      parentalFate: 'Destin des parents',
      familyStanding: 'Statut social de la famille',
      mentor: 'Mentor influent',
      siblingsCount: 'Frères et sœurs',
      rerollSiblings: 'Relancer la fratrie',
      noSiblings: 'Aucun frère ni sœur (enfant unique ou statut particulier).',
      ageLabel: 'Âge & Décennies vécues',
      yearsSuffix: 'ans',
      decadeLabel: 'Décennie',
      rollAllDecades: 'Tirer toutes les décennies',
      rollDecade: 'Tirer',
      nativeLanguageBadge: 'Langue maternelle gratuite (Rang 8)',
    },
    witcher: {
      ageTaken: 'Âge d’arrivée à la forteresse',
      school: 'École de Sorceleur',
      rollTrainingBtn: 'Tirer Entraînement & Épreuve des Herbes',
      earlyTraining: 'Entraînement initial',
      trialOutcome: 'Résultat de l’Épreuve des Herbes',
      importantEvent: 'Événement marquant sur la Voie',
      currentStatus: 'Situation actuelle',
      decadeRiskLabel: 'Risque décennie',
      decadePlaceholder: 'Tirer ou saisir un événement de décennie…',
    },
    mage: {
      ageEntered: 'Âge de détection du don',
      academy: 'Académie ou Cercle',
      rollTrainingBtn: 'Tirer Formation & Remise des diplômes',
      trainingEvent: 'Événement durant la formation',
      graduationOutcome: 'Issue des études / Diplôme',
      importantEvent: 'Événement marquant',
      currentStatus: 'Situation actuelle',
      decadeRiskLabel: 'Risque décennie',
      decadePlaceholder: 'Tirer ou saisir un événement de décennie…',
    },
    riskLevels: {
      safe: 'Sûre (10%)',
      ordinary: 'Ordinaire (25%)',
      reckless: 'Imprudente (50%)',
      risky: 'Risquée (75%)',
    },
    custom: {
      originLabel: 'Origine / Patrie',
      originPlaceholder: 'Ex. Témérie, Dol Blathanna, Kaedwen…',
      originSuggestions: 'Suggestions rapides :',
      ageLabel: 'Âge',
      agePlaceholder: 'Ex. 34 ans',
      backstoryLabel: 'Histoire & Faits marquants',
      backstoryPlaceholder: 'Décrivez l’enfance, le mentor, les alliés, ennemis et dettes du personnage…',
    },
  },
  stats: {
    title: 'Caractéristiques primaires',
    subtitle: 'Répartissez vos points entre les 9 caractéristiques du personnage.',
    budgetLabel: 'Budget total',
    spentLabel: 'Dépensés',
    remainingLabel: 'Restants',
    presetsLabel: 'Préréglages :',
    balancedFillBtn: 'Répartition équilibrée',
    resetStatsBtn: 'Tout à 1',
    cap13Label: 'Autoriser rang max 13 (Avancé)',
    ignoreBudgetLabel: 'Ignorer la contrainte de budget',
    derivedTitle: 'Statistiques dérivées (calculées en direct)',
    derivedNames: {
      stun: 'Étourdissement (ETOU)',
      run: 'Course (CSE)',
      leap: 'Saut (SAUT)',
      hp: 'Points de Santé (PS)',
      stamina: 'Endurance (END)',
      recovery: 'Récupération (RÉC)',
      encumbrance: 'Encombrement (ENC)',
      vigor: 'Seuil de Vigueur',
    },
    derivedFormulas: {
      stun: 'min(10, ⌊(COR+VOL)/2⌋)',
      run: 'VIT × 3 (m)',
      leap: '⌊Course / 5⌋ (m)',
      hp: '⌊(COR+VOL)/2⌋ × 5',
      stamina: '⌊(COR+VOL)/2⌋ × 5',
      recovery: '⌊(COR+VOL)/2⌋',
      encumbrance: 'COR × 10 (kg)',
      vigor: 'Selon profession',
    },
    dwarfEncNote: '+25 kg (Coriace — Nain)',
    gnomeEncNote: '(COR − 3) × 10 (Petite taille — Gnome)',
    statNames: {
      INT: { name: 'Intelligence', hint: 'Éducation, vigilance, survie, déduction' },
      REF: { name: 'Réflexes', hint: 'Combat au corps à corps, esquive, équitation' },
      DEX: { name: 'Dextérité', hint: 'Tir, furtivité, athlétisme, adresse' },
      COR: { name: 'Corps', hint: 'Santé, endurance, encombrement, résistance' },
      VIT: { name: 'Vitesse', hint: 'Course, saut et déplacements en combat' },
      EMP: { name: 'Empathie', hint: 'Relations sociales, psychologie, représentation' },
      TEC: { name: 'Technique', hint: 'Alchimie, artisanat, soins et crochetage' },
      VOL: { name: 'Volonté', hint: 'Magie, courage, résistance mentale et santé' },
      CHA: { name: 'Chance', hint: 'Réserve de chance pour modifier les jets de dés' },
    },
  },
  professionSkills: {
    title: 'Compétences de profession & Magie',
    subtitle: 'Répartissez vos points de compétence de profession (44 par défaut) et sélectionnez votre magie de départ.',
    budgetRemaining: 'Points restants',
    spentOf: 'dépensés sur',
    cap13Label: 'Autoriser rang max 13',
    ignoreBudgetLabel: 'Ignorer le budget / minimum 1',
    definingSkillTitle: 'Compétence signature',
    definingSkillHint: 'Compétence unique de profession (doit avoir au moins le rang 1).',
    nativeLangAuto: 'Langue maternelle (auto Rang 8)',
    slotsSectionTitle: 'Choix de spécialités de la profession',
    combatSlotLabel: 'Compétence de combat',
    craftSlotLabel: 'Compétence d’artisanat / technique',
    languageSlotLabel: 'Langue supplémentaire',
    slotPlaceholder: 'Sélectionner…',
    tableHeaders: {
      skill: 'Compétence',
      attr: 'Carac.',
      rank: 'Rang',
      cost: 'Coût',
      total: 'Base totale',
    },
    doubleCostTag: '×2',
    magicSectionTitle: 'Magie, Signes & Pouvoirs de départ',
    magicRulesBtn: 'Règles de la Magie',
    magicRulesTitle: 'Référentiel Magie (Livre de base)',
    magicRulesSubtitle: 'Défenses, dépassement de Vigueur, Signes (max 7 END), Sites d’Énergie et apprentissage.',
    magicUnofficialToggle: 'Inclure les sorts non-officiels (Suppléments)',
    magicUnofficialHint: 'Ajoute les créations communautaires du compendium magique.',
    witcherSignsNote: 'Tout Sorceleur maîtrise automatiquement les 5 Signes de base (Aard, Axii, Igni, Quen, Yrden).',
    slotsSpell: 'Sorts',
    slotsInvocation: 'Invocations',
    slotsRitual: 'Rituels',
    slotsHex: 'Envoûtements',
    slotsVampire: 'Pouvoirs vampiriques',
    selectSpellPlaceholder: 'Choisir dans le grimoire…',
    addSpellBtn: 'Ajouter',
    emptyMagicSelection: 'Aucun choix sélectionné dans cette catégorie.',
    unofficialTag: 'Non-officiel',
    staminaLabel: 'END',
    rangeLabel: 'Portée',
    durationLabel: 'Durée',
    defenseLabel: 'Défense',
  },
  generalSkills: {
    title: 'Compétences générales',
    subtitle: 'Dépensez vos points libres (égaux à INT + RÉF) dans le reste des compétences.',
    budgetLabel: 'Budget libre (INT + RÉF)',
    budgetFormula: 'Calculé automatiquement à partir de vos caractéristiques INT et RÉF.',
    remainingLabel: 'Points restants',
    ignoreBudgetNote: 'Mode Avancé : contrainte de budget désactivée.',
    excludedInfo: 'Les compétences déjà incluses dans votre pack de profession et votre langue maternelle sont masquées ici.',
  },
  gear: {
    title: 'Équipement, Formules & Description',
    subtitle: 'Sélectionnez votre équipement de profession ou enrichissez votre inventaire depuis le compendium.',
    weightLabel: 'Poids transporté',
    encumbranceMax: 'Capacité max (ENC)',
    overweightWarning: 'Attention : le poids dépasse votre capacité d’encombrement !',
    freeItemsTitle: 'Équipement de base inclus gratuitement',
    starterPickTitle: 'Pack de départ de profession',
    starterPickCount: 'sélectionnés sur',
    witcherFormulaTitle: 'Formules alchimiques de départ (Sorceleur)',
    decoctionLabel: 'Décoction de départ (1)',
    oilLabel: 'Huiles de départ (2)',
    potionLabel: 'Potions de départ (2)',
    formulaPlaceholder: 'Choisir une formule…',
    compendiumTitle: 'Inventaire libre (Compendium d’objets)',
    compendiumSearchBtn: 'Ajouter depuis le compendium',
    compendiumDialogTitle: 'Rechercher dans le compendium d’équipement',
    compendiumSearchPlaceholder: 'Rechercher une arme, armure, potion, formule, schéma…',
    compendiumNoResults: 'Aucun objet correspondant.',
    compendiumCategoryAll: 'Tout',
    customInventoryTitle: 'Objets ajoutés manuellement',
    customInventoryEmpty: 'Aucun objet supplémentaire ajouté depuis le compendium.',
    qtyLabel: 'Qté',
    weightUnit: 'kg',
    tooltipCategory: 'Catégorie',
    tooltipStats: 'Caractéristiques',
    tooltipNoDescription: 'Équipement de base.',
    personalDescriptionTitle: 'Description personnelle & Notes de rôle',
    personalDescriptionPlaceholder: 'Apparence physique, cicatrices, maniérismes, équipement particulier, objectifs…',
    startingTreasureTitle: 'Bourse & Trésor de départ de profession',
  },
  summary: {
    title: 'Dossier complet du personnage',
    subtitle: 'Vue récapitulative prête à jouer. Exportez la fiche en PDF rempli, en JSON ou copiez le texte.',
    copyTextBtn: 'Copier la fiche (Texte)',
    copiedToast: 'Dossier du personnage copié dans le presse-papiers.',
    exportJsonBtn: 'Exporter JSON',
    exportPdfBtn: 'Exporter PDF',
    exportingPdfBtn: 'Génération du PDF…',
    exportedPdfToast: 'Fiche PDF générée et téléchargée.',
    exportPdfErrorToast: 'Impossible de générer la fiche PDF.',
    sendToHubBtn: 'Envoyer vers le Hub MJ',
    sentToHubToast: (name: string) => `« ${name} » envoyé vers le Hub MJ partagé.`,
    openGmHubBtn: 'Ouvrir le Hub',
    identitySection: 'Identité & Atouts raciaux',
    playerLabel: 'Joueur',
    characterLabel: 'Personnage',
    racePerksLabel: 'Capacités raciales',
    lifepathSection: 'Historique & Biographie',
    primaryStatsSection: 'Caractéristiques',
    derivedStatsSection: 'Statistiques dérivées',
    skillsSection: 'Compétences (Base = Carac. + Rang)',
    skillsActiveOnlyToggle: 'Afficher uniquement les compétences apprises (> 0)',
    magicSection: 'Grimoire, Signes & Pouvoirs',
    gearSection: 'Équipement & Formules',
    talentsSection: 'Arbre de talents de la profession',
    noMagic: 'Aucune capacité magique pour ce personnage.',
    noGear: 'Aucun équipement sélectionné.',
    totalWeightLabel: 'Poids total estimé',
    signatureBadge: 'Signature',
    nativeBadge: 'Natale',
    socialStandingLabel: 'Statut social selon les territoires',
    startingTreasureLabel: 'Trésor de départ',
  },
  errors: {
    missingPlayerName: 'Veuillez renseigner le nom du joueur.',
    missingCharacterName: 'Veuillez renseigner le nom du personnage.',
    missingGender: 'Veuillez choisir le genre du personnage.',
    missingRace: 'Veuillez sélectionner une race.',
    missingProfession: 'Veuillez sélectionner une profession.',
    halflingRestricted: 'Selon les règles du livre de base, seuls les Humains et les Elfes peuvent devenir Mage ou Prêtre / Druide en mode Simple.',
    incompleteStandardLifepath: 'Veuillez compléter la région, l’origine, la famille, le statut, le mentor, la fratrie et l’âge.',
    incompleteWitcherLifepath: 'Veuillez compléter l’âge d’arrivée, l’école, l’entraînement, l’épreuve, l’événement marquant et la situation.',
    incompleteMageLifepath: 'Veuillez compléter l’âge de détection, l’académie, la formation, le diplôme, l’événement marquant et la situation.',
    incompleteCustomLifepath: 'Veuillez renseigner une origine et un âge dans l’historique libre.',
    statsRemaining: 'Il reste des points de caractéristiques à dépenser (ou passez en mode Avancé).',
    definingSkillMin: 'La compétence signature doit avoir au moins le rang 1.',
    professionSlotsIncomplete: 'Veuillez remplir tous les choix de spécialités de votre profession (combat, artisanat ou langues).',
    professionSkillMinRank: 'En mode Simple, toutes les compétences de profession doivent avoir au moins le rang 1.',
    professionSkillsBudget: 'Le total des points dépensés en profession ne correspond pas au budget requis.',
    magicSlotsIncomplete: 'Veuillez sélectionner le nombre requis de sorts, invocations, rituels, envoûtements ou pouvoirs.',
    generalSkillsBudget: 'Veuillez dépenser tous vos points de compétences générales (ou activez le mode Avancé).',
    starterGearLimit: 'Veuillez sélectionner le nombre exact d’objets de départ de votre profession.',
    witcherFormulaeIncomplete: 'Veuillez sélectionner 1 décoction, 2 huiles et 2 potions de départ.',
  },
};

const EN_COPY: CharacterGeneratorCopy = {
  header: {
    moduleTag: 'PC SHEET GENERATOR',
    modeSimple: 'Simple Mode (Guided)',
    modeSimpleHint: 'Strict Core Rulebook budgets, guided lifepath tables, and Novice magic limits.',
    modeAdvanced: 'Advanced Mode (Freeform)',
    modeAdvancedHint: 'Flexible/ignorable budgets, skill & stat caps up to 13, custom origin, and full compendium picks.',
    randomFull: 'Random PC',
    importJson: 'Import JSON',
    exportJson: 'Export JSON',
    resetBtn: 'Reset',
    resetDialogTitle: 'Reset character sheet?',
    resetDialogBody:
      'All current stats, skills, lifepath choices, magic, and equipment will be cleared.',
    resetConfirm: 'Confirm Reset',
    cancel: 'Cancel',
    quickGeneratedToast: 'Complete character randomly generated.',
    importedToast: 'Character JSON imported successfully.',
    importErrorToast: 'Invalid or incompatible JSON file.',
    resetToast: 'Character sheet has been reset.',
  },
  steps: {
    identity: {
      label: '1. Identity',
      shortLabel: 'Identity',
      description: 'Name, gender, race & profession',
    },
    lifepath: {
      label: '2. Lifepath',
      shortLabel: 'Lifepath',
      description: 'Origin, family fate & decades',
    },
    stats: {
      label: '3. Statistics',
      shortLabel: 'Stats',
      description: 'Primary attributes & derived stats',
    },
    professionSkills: {
      label: '4. Profession Skills',
      shortLabel: 'Profession',
      description: 'Defining skill, class kit & starting magic',
    },
    generalSkills: {
      label: '5. General Skills',
      shortLabel: 'General',
      description: 'Pickup points (INT + REF)',
    },
    gear: {
      label: '6. Equipment',
      shortLabel: 'Equipment',
      description: 'Starter pack, item compendium & notes',
    },
    summary: {
      label: '7. PC Dossier',
      shortLabel: 'Summary',
      description: 'Playable character sheet, talent tree & export',
    },
  },
  nav: {
    previous: 'Previous Step',
    next: 'Next Step',
    finish: 'View Full Dossier',
    validationTitle: 'Please fix the following before advancing:',
  },
  identity: {
    title: 'Character Identity',
    subtitle: 'Set player/character names, gender, playable race, and profession.',
    playerName: 'Player Name',
    playerNamePlaceholder: 'e.g. Morgan',
    characterName: 'Character Name',
    characterNamePlaceholder: 'e.g. Geralt of Rivia',
    gender: 'Gender',
    genderPlaceholder: 'Choose gender',
    male: 'Male',
    female: 'Female',
    race: 'Race',
    racePlaceholder: 'Choose a race',
    profession: 'Profession',
    professionPlaceholder: 'Choose a profession',
    extendedNote: '* Races and professions marked with an asterisk come from official/community supplements.',
    racialPerksTitle: 'Racial Perks',
    definingSkillLabel: 'Defining Skill',
    definingSkillRuleLabel: 'Exclusive Defining Skill (Core Rulebook)',
    vigorLabel: 'Vigor Threshold',
    magicAssetsLabel: 'Starting Magic Perks',
    talentTreeBtn: 'View Profession Talent Tree',
    talentTreeTitle: 'Profession Skill Tree & Talents',
    talentTreeEmpty: 'This profession has no dedicated talent tree in the compendium.',
    talentAllBranches: 'All Branches',
    talentTierLabel: 'Tier',
    halflingWarning:
      'Advanced Mode Note: Core rules restrict Mages and Priests / Druids to Humans and Elves. Unlocked in Advanced Mode.',
    halflingBlocked:
      'In Simple Mode, only Humans and Elves can choose Mage or Priest / Druid.',
    noRaceOrProfSelected: 'Select a race and profession to inspect perks and defining skill.',
    racesGuideBtn: 'Races & Social Status Guide',
    racesGuideTitle: 'Races & Social Status Reference',
    racesGuideSubtitle: 'Detailed racial perks, lore rules, and official territorial Social Standing matrix.',
    racesTab: 'Races & Perks',
    socialStatusTab: 'Social Status Matrix',
    socialStandingLabel: 'Territorial Social Standing',
    startingTreasureLabel: 'Starting Coin / Treasure',
    englishSourceNotice: 'Supplement details incorporate official English source text where no French translation is available.',
    loreLabel: 'Overview',
    societyRuleLabel: 'Special Rule',
  },
  lifepath: {
    title: 'Lifepath & Background',
    subtitle: 'Follow the Core Rulebook lifepath tables or switch to a custom freeform background.',
    customToggleLabel: 'Custom Freeform Lifepath',
    customToggleHint: 'Replaces guided tables with freeform Origin, Age, and Backstory fields.',
    randomizeBtn: 'Randomize Lifepath',
    fatesDialogBtn: 'Fates & Mentors Reference',
    fatesDialogTitle: 'Family Fates, Standings & Mentors Reference',
    fatesDialogSubtitle: 'Inspect every outcome table filtered by region.',
    fatesTabs: {
      familyFate: 'Family Fate',
      parentalFate: 'Parental Fate',
      familyStanding: 'Family Standing',
      mentor: 'Mentor',
    },
    selectPlaceholder: 'Select an option…',
    standard: {
      region: 'Home Region',
      origin: 'Country / Homeland',
      familyStatus: 'Family Status',
      familyAlive: 'Family Alive & Together',
      familyTragedy: 'Something Happened to Family',
      familyFate: 'Family Fate',
      parentsStatus: 'Parents Status',
      parentsAlive: 'Parents Alive',
      parentsDead: 'Something Happened to Parents',
      parentalFate: 'Parental Fate',
      familyStanding: 'Family Standing',
      mentor: 'Influential Friend / Mentor',
      siblingsCount: 'Siblings',
      rerollSiblings: 'Reroll Siblings',
      noSiblings: 'No siblings (only child or special origin).',
      ageLabel: 'Age & Lived Decades',
      yearsSuffix: 'years old',
      decadeLabel: 'Decade',
      rollAllDecades: 'Roll All Decades',
      rollDecade: 'Roll',
      nativeLanguageBadge: 'Free Native Language (Rank 8)',
    },
    witcher: {
      ageTaken: 'Age Taken to Keep',
      school: 'Witcher School',
      rollTrainingBtn: 'Roll Training & Trial of the Grasses',
      earlyTraining: 'Early Training Outcome',
      trialOutcome: 'Trial of the Grasses Outcome',
      importantEvent: 'Most Important Event on the Path',
      currentStatus: 'Current Status',
      decadeRiskLabel: 'Decade risk',
      decadePlaceholder: 'Roll or enter a decade event…',
    },
    mage: {
      ageEntered: 'Age Magic Manifested',
      academy: 'Academy or Druid Circle',
      rollTrainingBtn: 'Roll Training & Graduation',
      trainingEvent: 'Training Event',
      graduationOutcome: 'Graduation Outcome',
      importantEvent: 'Most Important Event',
      currentStatus: 'Current Status',
      decadeRiskLabel: 'Decade risk',
      decadePlaceholder: 'Roll or enter a decade event…',
    },
    riskLevels: {
      safe: 'Safe (10%)',
      ordinary: 'Ordinary (25%)',
      reckless: 'Reckless (50%)',
      risky: 'Risky (75%)',
    },
    custom: {
      originLabel: 'Origin / Homeland',
      originPlaceholder: 'e.g. Temeria, Dol Blathanna, Kaedwen…',
      originSuggestions: 'Quick suggestions:',
      ageLabel: 'Age',
      agePlaceholder: 'e.g. 34 years old',
      backstoryLabel: 'Backstory & Life Events',
      backstoryPlaceholder: 'Write childhood, mentor, allies, enemies, or lingering debts…',
    },
  },
  stats: {
    title: 'Primary Statistics',
    subtitle: 'Distribute your character points across the 9 primary statistics.',
    budgetLabel: 'Total Budget',
    spentLabel: 'Spent',
    remainingLabel: 'Remaining',
    presetsLabel: 'Presets:',
    balancedFillBtn: 'Balanced Fill',
    resetStatsBtn: 'Reset to 1',
    cap13Label: 'Allow stat cap up to 13 (Advanced)',
    ignoreBudgetLabel: 'Ignore budget constraint',
    derivedTitle: 'Derived Statistics (Live Calculation)',
    derivedNames: {
      stun: 'Stun (STUN)',
      run: 'Run (RUN)',
      leap: 'Leap (LEAP)',
      hp: 'Health Points (HP)',
      stamina: 'Stamina (STA)',
      recovery: 'Recovery (REC)',
      encumbrance: 'Encumbrance (ENC)',
      vigor: 'Vigor Threshold',
    },
    derivedFormulas: {
      stun: 'min(10, ⌊(BODY+WILL)/2⌋)',
      run: 'SPD × 3 (m)',
      leap: '⌊RUN / 5⌋ (m)',
      hp: '⌊(BODY+WILL)/2⌋ × 5',
      stamina: '⌊(BODY+WILL)/2⌋ × 5',
      recovery: '⌊(BODY+WILL)/2⌋',
      encumbrance: 'BODY × 10 (kg)',
      vigor: 'By profession',
    },
    dwarfEncNote: '+25 kg (Strong — Dwarf)',
    gnomeEncNote: '(BODY − 3) × 10 (Small Stature — Gnome)',
    statNames: {
      INT: { name: 'Intelligence', hint: 'Education, awareness, survival, deduction' },
      REF: { name: 'Reflexes', hint: 'Melee combat, dodging, riding' },
      DEX: { name: 'Dexterity', hint: 'Ranged weapons, stealth, athletics, sleight' },
      COR: { name: 'Body', hint: 'Health, endurance, encumbrance, physique' },
      VIT: { name: 'Speed', hint: 'Run, leap, and combat movement' },
      EMP: { name: 'Empathy', hint: 'Social skills, human perception, performance' },
      TEC: { name: 'Craft', hint: 'Alchemy, crafting, first aid, lockpicking' },
      VOL: { name: 'Will', hint: 'Magic, courage, coercion defense, health' },
      CHA: { name: 'Luck', hint: 'Luck pool used to boost dice rolls' },
    },
  },
  professionSkills: {
    title: 'Profession Skills & Starting Magic',
    subtitle: 'Allocate your profession skill points (44 by default) and choose starting spells or powers.',
    budgetRemaining: 'Points Remaining',
    spentOf: 'spent of',
    cap13Label: 'Allow skill rank up to 13',
    ignoreBudgetLabel: 'Ignore budget / min-1 rule',
    definingSkillTitle: 'Defining Skill',
    definingSkillHint: 'Unique profession skill (minimum rank 1).',
    nativeLangAuto: 'Native Language (auto Rank 8)',
    slotsSectionTitle: 'Selectable Profession Specialties',
    combatSlotLabel: 'Combat Specialty',
    craftSlotLabel: 'Craft Specialty',
    languageSlotLabel: 'Additional Language',
    slotPlaceholder: 'Choose…',
    tableHeaders: {
      skill: 'Skill',
      attr: 'Stat',
      rank: 'Rank',
      cost: 'Cost',
      total: 'Total Base',
    },
    doubleCostTag: '×2',
    magicSectionTitle: 'Starting Magic, Signs & Powers',
    magicRulesBtn: 'Magic Rules',
    magicRulesTitle: 'Core Magic Reference',
    magicRulesSubtitle: 'Magical defenses, Vigor overcasting, Signs (max 7 STA), Places of Power & learning.',
    magicUnofficialToggle: 'Include Unofficial / Fan-Made Magic',
    magicUnofficialHint: 'Adds community supplement spells from the Magic Compendium.',
    witcherSignsNote: 'Every Witcher automatically knows all 5 Basic Signs (Aard, Axii, Igni, Quen, Yrden).',
    slotsSpell: 'Spells',
    slotsInvocation: 'Invocations',
    slotsRitual: 'Rituals',
    slotsHex: 'Hexes',
    slotsVampire: 'Vampire Powers',
    selectSpellPlaceholder: 'Select from compendium…',
    addSpellBtn: 'Add',
    emptyMagicSelection: 'No selection added in this category yet.',
    unofficialTag: 'Unofficial',
    staminaLabel: 'STA',
    rangeLabel: 'Range',
    durationLabel: 'Duration',
    defenseLabel: 'Defense',
  },
  generalSkills: {
    title: 'General / Pickup Skills',
    subtitle: 'Spend free pickup points (equal to INT + REF) on remaining non-profession skills.',
    budgetLabel: 'Pickup Budget (INT + REF)',
    budgetFormula: 'Calculated live from your primary INT and REF statistics.',
    remainingLabel: 'Points Remaining',
    ignoreBudgetNote: 'Advanced Mode: pickup budget requirement bypassed.',
    excludedInfo: 'Skills already covered by your profession package and your native language are hidden here.',
  },
  gear: {
    title: 'Starting Gear, Formulae & Notes',
    subtitle: 'Pick your profession starter gear or add any equipment directly from the compendium.',
    weightLabel: 'Carried Weight',
    encumbranceMax: 'Max Carry (ENC)',
    overweightWarning: 'Warning: carried weight exceeds your Encumbrance limit!',
    freeItemsTitle: 'Included Free Equipment',
    starterPickTitle: 'Profession Starter Package',
    starterPickCount: 'selected of',
    witcherFormulaTitle: 'Starting Witcher Alchemy Formulae',
    decoctionLabel: 'Starting Decoction (1)',
    oilLabel: 'Starting Oils (2)',
    potionLabel: 'Starting Potions (2)',
    formulaPlaceholder: 'Select a formula…',
    compendiumTitle: 'Freeform Equipment (Item Compendium)',
    compendiumSearchBtn: 'Add from Item Compendium',
    compendiumDialogTitle: 'Search Equipment Compendium',
    compendiumSearchPlaceholder: 'Search weapons, armor, gear, potions, formulae, diagrams…',
    compendiumNoResults: 'No matching items found.',
    compendiumCategoryAll: 'All',
    customInventoryTitle: 'Added Compendium Items',
    customInventoryEmpty: 'No extra items added from the compendium yet.',
    qtyLabel: 'Qty',
    weightUnit: 'kg',
    tooltipCategory: 'Category',
    tooltipStats: 'Stats',
    tooltipNoDescription: 'Standard starting gear.',
    personalDescriptionTitle: 'Personal Description & Roleplay Notes',
    personalDescriptionPlaceholder: 'Physical traits, scars, mannerisms, keepsakes, short-term goals…',
    startingTreasureTitle: 'Profession Starting Treasure',
  },
  summary: {
    title: 'Complete Character Dossier',
    subtitle: 'Table-ready character summary. Export as a filled PDF sheet, JSON, or formatted text.',
    copyTextBtn: 'Copy Dossier (Text)',
    copiedToast: 'Character dossier copied to clipboard.',
    exportJsonBtn: 'Export JSON',
    exportPdfBtn: 'Export PDF',
    exportingPdfBtn: 'Generating PDF…',
    exportedPdfToast: 'Filled PDF character sheet downloaded.',
    exportPdfErrorToast: 'Failed to generate the PDF character sheet.',
    sendToHubBtn: 'Send to GM Hub',
    sentToHubToast: (name: string) => `“${name}” sent to shared GM Hub.`,
    openGmHubBtn: 'Open Hub',
    identitySection: 'Identity & Racial Perks',
    playerLabel: 'Player',
    characterLabel: 'Character',
    racePerksLabel: 'Racial Perks',
    lifepathSection: 'Lifepath & Biography',
    primaryStatsSection: 'Primary Statistics',
    derivedStatsSection: 'Derived Statistics',
    skillsSection: 'Skills (Base = Stat + Rank)',
    skillsActiveOnlyToggle: 'Show learned skills only (Rank > 0)',
    magicSection: 'Spells, Signs & Powers',
    gearSection: 'Equipment & Formulae',
    talentsSection: 'Profession Talent Tree',
    noMagic: 'No starting magic for this character.',
    noGear: 'No equipment selected.',
    totalWeightLabel: 'Estimated Carried Weight',
    signatureBadge: 'Signature',
    nativeBadge: 'Native',
    socialStandingLabel: 'Territorial Social Standing',
    startingTreasureLabel: 'Starting Treasure',
  },
  errors: {
    missingPlayerName: 'Please enter a player name.',
    missingCharacterName: 'Please enter a character name.',
    missingGender: 'Please select a gender.',
    missingRace: 'Please select a race.',
    missingProfession: 'Please select a profession.',
    halflingRestricted: 'Per the Core Rulebook, only Humans and Elves can select Mage or Priest / Druid in Simple Mode.',
    incompleteStandardLifepath: 'Please complete region, origin, family, standing, mentor, siblings, and age.',
    incompleteWitcherLifepath: 'Please complete age taken, school, early training, trial outcome, event, and status.',
    incompleteMageLifepath: 'Please complete age entered, academy, training, graduation, event, and status.',
    incompleteCustomLifepath: 'Please enter an origin and age in the custom lifepath.',
    statsRemaining: 'You must spend all stat points first (or switch to Advanced Mode).',
    definingSkillMin: 'Defining Skill must be at least rank 1.',
    professionSlotsIncomplete: 'Please fill all selectable combat, craft, and language slots for your profession.',
    professionSkillMinRank: 'In Simple Mode, every profession skill must have at least rank 1.',
    professionSkillsBudget: 'Profession skill points spent do not match your required budget.',
    magicSlotsIncomplete: 'Please select the required number of spells, invocations, rituals, hexes, or powers.',
    generalSkillsBudget: 'Please spend all pickup skill points (or enable Advanced Mode).',
    starterGearLimit: 'Please choose the required number of starter gear items for your profession.',
    witcherFormulaeIncomplete: 'Please choose 1 decoction, 2 oils, and 2 potions for your Witcher.',
  },
};

export function getCharacterGeneratorCopy(
  lang: ModuleLanguage
): CharacterGeneratorCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
