import type { Locale } from '@/src/i18n/types';

export interface ChaosLeyGoetiaCopy {
  headerEyebrow: string;
  headerTitle: string;
  headerSubtitle: string;
  tabs: {
    leyLines: string;
    trueName: string;
    goetiaCodex: string;
  };
  ley: {
    resolverTitle: string;
    resolverDesc: string;
    casterTypeLabel: string;
    casterTypes: {
      mage: string;
      priest_druid: string;
      witcher: string;
    };
    elementLabel: string;
    spellCastBaseLabel: string;
    earthPenaltyLabel: (dc: number) => string;
    drawCheckBtn: string;
    resetEarthPenaltyBtn: string;
    witcherBlockedWarning: string;
    connectedBadge: string;
    severedBadge: string;
    priestMixedTitle: string;
    priestMixedBenefit: string;
    priestMixedPenalty: string;
    priestVigorPenaltyBtn: string;
    priestVigorResetBtn: string;
    priestVigorStatus: (penalty: number) => string;
    signsLabel: string;
    benefitLabel: string;
    penaltyLabel: string;
    detectionTitle: string;
    detectionMagic: string;
    detectionMundane: string;
    detectionPlaces: string;
    elementalsWarning: string;
    allElementsTitle: string;
  };
  trueName: {
    generatorTitle: string;
    generatorDesc: string;
    rollTwoBtn: string;
    rollThreeBtn: string;
    clearSelectionBtn: string;
    matrixHint: string;
    selectedNameLabel: string;
    syllableSlot: (idx: number) => string;
    copyNameBtn: string;
    copiedNameToast: string;
    saveDemonTitle: string;
    speciesLabel: string;
    speciesNames: {
      bes: string;
      casglydd: string;
      mari_lwyd: string;
    };
    greaterLabel: string;
    bindingStateLabel: string;
    bindingStates: {
      unbound: string;
      bound: string;
      banished: string;
      escaped: string;
    };
    lucifugeLabel: string;
    lucifugePlaceholder: string;
    bindingCheckLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    saveToRegistryBtn: string;
    savedToast: string;
    registryTitle: string;
    emptyRegistry: string;
    resistCheckBtn: string;
    deleteDemonBtn: string;
    lucifugeBadge: (bearer: string) => string;
    greaterBadge: string;
  };
  codex: {
    benefitsTitle: string;
    benefitsDesc: string;
    desiresTitle: string;
    desiresNote: string;
    ritualsTitle: string;
    ritualsDesc: string;
    ritualMeta: {
      dc: string;
      prep: string;
      duration: string;
      investment: string;
      components: string;
      process: string;
      effect: string;
    };
    toolsTitle: string;
    toolsDesc: string;
    tiers: {
      novice: string;
      journeyman: string;
      master: string;
    };
  };
}

const FR_COPY: ChaosLeyGoetiaCopy = {
  headerEyebrow: 'A Tome of Chaos · Lignes telluriques & Goétie',
  headerTitle: 'Tellurie, Vrais Noms & Goétie',
  headerSubtitle:
    'Résolvez l’harmonisation aux Lignes telluriques (SD 16), générez les Vrais Noms de démons (1d6 × 1d10), suivez vos pactes, marques de Lucifuge et rituels goétiques.',
  tabs: {
    leyLines: 'Lignes Telluriques',
    trueName: 'Vrai Nom & Registre Démoniaque',
    goetiaCodex: 'Pactes, Rituels & Outils',
  },
  ley: {
    resolverTitle: 'Canalisation d’une Ligne Tellurique',
    resolverDesc:
      'Pour puiser dans une ligne tellurique à son contact, un Mage, Prêtre ou Druide doit réussir un jet d’Exercice de la magie SD 16 (action).',
    casterTypeLabel: 'Profil de lanceur',
    casterTypes: {
      mage: 'Mage (restreint à l’élément de la ligne)',
      priest_druid: 'Prêtre / Druide (Table Mixte)',
      witcher: 'Sorceleur / Talent mineur',
    },
    elementLabel: 'Élément de la Ligne',
    spellCastBaseLabel: 'Base Exercice de la magie',
    earthPenaltyLabel: (dc) => `SD Terre actuel : ${dc}`,
    drawCheckBtn: 'Puiser dans la ligne (1d10!)',
    resetEarthPenaltyBtn: 'Réinit. SD 16',
    witcherBlockedWarning:
      'Règle officielle : un Sorceleur ou utilisateur mineur de magie ne possède pas la formation requise pour ouvrir une connexion à une Ligne tellurique.',
    connectedBadge: 'Connexion active (tant qu’en contact)',
    severedBadge: 'Non connecté',
    priestMixedTitle: 'Prêtres & Druides (Affinité Mixte)',
    priestMixedBenefit:
      'Tant que connecté à la ligne : +4 au Seuil de Vigueur (Vigor Threshold). Peut lancer ses invocations sans restriction d’élément.',
    priestMixedPenalty:
      'Surcharge / Échec critique : -2 au Seuil de Vigueur pendant 6 heures (cumulatif ; à 0 ou moins, impossible de lancer le moindre sort).',
    priestVigorPenaltyBtn: 'Appliquer Surcharge (-2 Vigueur)',
    priestVigorResetBtn: 'Fin des 6h (Réinit.)',
    priestVigorStatus: (penalty) =>
      penalty === 0
        ? 'Malus actif : 0'
        : `Malus cumulé actif : -${penalty} Vigueur (6h)`,
    signsLabel: 'Signes physiques (détection profane)',
    benefitLabel: 'Avantage en jeu',
    penaltyLabel: 'Contrecoup (Surcharge / Échec critique)',
    detectionTitle: 'Détection, Sites de Pouvoir & Élémentaires',
    detectionMagic:
      'Signature magique : toute créature dotée d’une Vigueur ressent une crampe à l’annulaire dans un rayon de 10 m. Formation Magique d’un Mage révèle la direction exacte à ≤ 10 m.',
    detectionMundane:
      'Largeur ~6 m sur des centaines de kilomètres, accessible à toute altitude (sommet ou caverne).',
    detectionPlaces:
      'Sites de Pouvoir : croisement de deux lignes telluriques du même élément (delta pour l’Eau, cratère pour le Feu, cime pour l’Air).',
    elementalsWarning:
      'Élémentaires errants : un Site de Pouvoir isolé et rarement puisé peut invoquer spontanément des élémentaires souvent agressifs.',
    allElementsTitle: 'Tableau complet des Lignes Élémentaires',
  },
  trueName: {
    generatorTitle: 'Générateur de Vrai Nom de Démon (1d6 × 1d10)',
    generatorDesc:
      'Règle officielle : tirez les deux premières syllabes au hasard (1d6 colonne × 1d10 ligne), puis choisissez la 3e syllabe qui vous semble sonner juste — ou tirez les 3.',
    rollTwoBtn: 'Tirer 2 syllabes (Officiel)',
    rollThreeBtn: 'Tirer 3 syllabes',
    clearSelectionBtn: 'Vider',
    matrixHint:
      'Cliquez sur n’importe quelle case de la matrice pour remplir le prochain emplacement de syllabe (ou remplacer la 3e).',
    selectedNameLabel: 'Vrai Nom assemblé',
    syllableSlot: (idx) => `Syllabe ${idx}`,
    copyNameBtn: 'Copier le Nom',
    copiedNameToast: 'Vrai Nom copié dans le presse-papiers.',
    saveDemonTitle: 'Enregistrer dans le Registre de Goétie',
    speciesLabel: 'Espèce démoniaque',
    speciesNames: {
      bes: 'Bes (Possession & carnage)',
      casglydd: 'Casglydd (Savoir & ombres)',
      mari_lwyd: 'Mari Lwyd (Trésors & contrats)',
    },
    greaterLabel: 'Démon Supérieur (Greater Demon — SD +6/+7)',
    bindingStateLabel: 'Statut du lien',
    bindingStates: {
      unbound: 'Libre / Pactisé',
      bound: 'Asservi (Lié)',
      banished: 'Banni (24h)',
      escaped: 'Échappé (Vengeance !)',
    },
    lucifugeLabel: 'Marque de Lucifuge (échec du Rituel de Nomination)',
    lucifugePlaceholder: 'Nom du PJ marqué au fer rouge (laisser vide si aucun)',
    bindingCheckLabel: 'Jet de Rituel d’Asservissement (pour test Résister à la magie / 2 sem.)',
    notesLabel: 'Clauses du pacte & notes',
    notesPlaceholder:
      'Détails de l’accord, objet réclamé ou faiblesse connue…',
    saveToRegistryBtn: 'Enregistrer ce Démon',
    savedToast: 'Démon ajouté au registre de campagne.',
    registryTitle: 'Registre des Démons & Pactes actifs',
    emptyRegistry:
      'Aucun démon consigné. Utilisez la matrice ci-dessus pour révéler et sauvegarder un Vrai Nom.',
    resistCheckBtn: 'Test 2 sem. (Résister)',
    deleteDemonBtn: 'Supprimer',
    lucifugeBadge: (bearer) => `Lucifuge : ${bearer}`,
    greaterBadge: 'Supérieur',
  },
  codex: {
    benefitsTitle: 'Bénéfices de la Goétie (Pactes & Asservissement)',
    benefitsDesc:
      'Les démons négocient selon leur nature ; seul le Rituel d’Asservissement (avec un Véritable Bâton d’Asservissement) impose un pacte à sens unique.',
    desiresTitle: 'Ce que désirent les Démons',
    desiresNote:
      'Bes : sadiques avides de douleur et de sang. Casglydd : collectionneurs obsessionnels d’objets rares. Mari Lwyd : avides de présents, d’attention et de festins.',
    ritualsTitle: 'Les 4 Rituels de Goétie',
    ritualsDesc:
      'Chaque rituel repose sur les précédents ; leur savoir est proscrit par le Conclave.',
    ritualMeta: {
      dc: 'SD',
      prep: 'Préparation',
      duration: 'Durée',
      investment: 'Investissement',
      components: 'Composants',
      process: 'Procédure',
      effect: 'Effet',
    },
    toolsTitle: 'Les 8 Outils de Goétie',
    toolsDesc:
      'Sans ces protections rituelles, un praticien est à la merci immédiate du démon invoqué.',
    tiers: {
      novice: 'Novice',
      journeyman: 'Compagnon',
      master: 'Maître',
    },
  },
};

const EN_COPY: ChaosLeyGoetiaCopy = {
  headerEyebrow: 'A Tome of Chaos · Ley Lines & Goetia',
  headerTitle: 'Ley Lines, True Names & Goetia',
  headerSubtitle:
    'Resolve Ley Line attunement (DC 16), generate Demon True Names (1d6 × 1d10 matrix), track bound demons & Lucifuge marks, and browse Goetic rituals & tools.',
  tabs: {
    leyLines: 'Ley Lines',
    trueName: 'Demon True Name & Registry',
    goetiaCodex: 'Goetic Deals, Rituals & Tools',
  },
  ley: {
    resolverTitle: 'Drawing from a Ley Line',
    resolverDesc:
      'While physically touching a Ley Line, a Mage, Priest, or Druid takes an action and rolls a DC 16 Spell Casting check.',
    casterTypeLabel: 'Caster Profile',
    casterTypes: {
      mage: 'Mage (locked to Ley Line element)',
      priest_druid: 'Priest / Druid (Mixed table)',
      witcher: 'Witcher / Minor Talent',
    },
    elementLabel: 'Ley Line Element',
    spellCastBaseLabel: 'Spell Casting Base',
    earthPenaltyLabel: (dc) => `Current Earth DC: ${dc}`,
    drawCheckBtn: 'Draw from Ley Line (1d10!)',
    resetEarthPenaltyBtn: 'Reset DC 16',
    witcherBlockedWarning:
      'Official rule: Witchers and minor magical talents lack the rigorous training needed to open a connection to a Ley Line.',
    connectedBadge: 'Connected (while touching)',
    severedBadge: 'Disconnected',
    priestMixedTitle: 'Priests & Druids (Mixed Affinity)',
    priestMixedBenefit:
      'While connected to any Ley Line, increase your Vigor Threshold by +4 and cast invocations freely regardless of element.',
    priestMixedPenalty:
      'Fumble / Overdraw: lower your Vigor Threshold by 2 for 6 hours (cumulative; at 0 or below, you cannot cast any magic).',
    priestVigorPenaltyBtn: 'Apply Fumble (-2 Vigor)',
    priestVigorResetBtn: '6h Elapsed (Reset)',
    priestVigorStatus: (penalty) =>
      penalty === 0
        ? 'Active Vigor Penalty: 0'
        : `Active Cumulative Penalty: -${penalty} Vigor (6h)`,
    signsLabel: 'Physical Signs (mundane detection)',
    benefitLabel: 'Mechanical Benefit',
    penaltyLabel: 'Additional Fumble / Overdraw Penalty',
    detectionTitle: 'Detection, Places of Power & Elementals',
    detectionMagic:
      'Magical signature: anyone with a Vigor Score feels a ring-finger cramp within 10 m. A Mage using Magic Training learns its exact direction within 10 m.',
    detectionMundane:
      'Roughly 6 meters wide, spanning hundreds of miles, accessible at any altitude (peaks or caverns).',
    detectionPlaces:
      'Places of Power: intersections of two Ley Lines of the same element (river deltas for Water, volcano rims for Fire, mountaintops for Air).',
    elementalsWarning:
      'Random Elementals: remote, rarely tapped Places of Power may spontaneously summon aggressive elementals.',
    allElementsTitle: 'Elemental Ley Lines Reference',
  },
  trueName: {
    generatorTitle: 'Demon True Name Generator (1d6 × 1d10)',
    generatorDesc:
      'Official rule: roll for the first two syllables (1d6 column × 1d10 row), then pick the final syllable that feels right — or roll all three.',
    rollTwoBtn: 'Roll 2 Syllables (Official)',
    rollThreeBtn: 'Roll All 3',
    clearSelectionBtn: 'Clear',
    matrixHint:
      'Click any cell in the matrix to fill the next syllable slot (or replace the 3rd).',
    selectedNameLabel: 'Assembled True Name',
    syllableSlot: (idx) => `Syllable ${idx}`,
    copyNameBtn: 'Copy Name',
    copiedNameToast: 'True Name copied to clipboard.',
    saveDemonTitle: 'Save to Goetia Registry',
    speciesLabel: 'Demon Species',
    speciesNames: {
      bes: 'Bes (Possession & carnage)',
      casglydd: 'Casglydd (Lore & shadows)',
      mari_lwyd: 'Mari Lwyd (Wealth & bargains)',
    },
    greaterLabel: 'Greater Demon (Naming DC 24 / Binding DC 27)',
    bindingStateLabel: 'Status',
    bindingStates: {
      unbound: 'Unbound / Deal',
      bound: 'Bound (Trapped)',
      banished: 'Banished (24h)',
      escaped: 'Broken Free (Vengeful!)',
    },
    lucifugeLabel: 'Lucifuge Mark (Failed Ritual of Naming)',
    lucifugePlaceholder: 'Marked character name (leave blank if none)',
    bindingCheckLabel: 'Binding Ritual Check Total (vs biweekly Resist Magic)',
    notesLabel: 'Deal Clauses & Notes',
    notesPlaceholder:
      'Contract wording, demanded item, or known vulnerabilities…',
    saveToRegistryBtn: 'Save Demon',
    savedToast: 'Demon saved to campaign registry.',
    registryTitle: 'Saved Demons & Active Bindings',
    emptyRegistry:
      'No demons recorded yet. Use the matrix above to roll and archive a True Name.',
    resistCheckBtn: '2-Week Break Check',
    deleteDemonBtn: 'Delete',
    lucifugeBadge: (bearer) => `Lucifuge: ${bearer}`,
    greaterBadge: 'Greater',
  },
  codex: {
    benefitsTitle: 'The Benefits of Goetia',
    benefitsDesc:
      'Demons twist poorly worded deals; only the Ritual of Binding (with a True Staff of Binding) compels one-sided service.',
    desiresTitle: 'What Demons Want',
    desiresNote:
      'Bes are violent sadists; Casglydd are obsessive collectors of rare objects; Mari Lwyd crave attention, feasts, and lavish gifts.',
    ritualsTitle: 'The 4 Goetic Rituals',
    ritualsDesc:
      'Each ritual builds upon the previous ones; outlawed by the Conclave of Mages.',
    ritualMeta: {
      dc: 'DC',
      prep: 'Prep Time',
      duration: 'Duration',
      investment: 'Investment',
      components: 'Components',
      process: 'Process',
      effect: 'Effect',
    },
    toolsTitle: 'The 8 Tools of Goetia',
    toolsDesc:
      'Without proper ritual safeguards, a summoner stands at the demon’s mercy.',
    tiers: {
      novice: 'Novice',
      journeyman: 'Journeyman',
      master: 'Master',
    },
  },
};

export function getChaosLeyGoetiaCopy(locale: Locale): ChaosLeyGoetiaCopy {
  return locale === 'fr' ? FR_COPY : EN_COPY;
}
