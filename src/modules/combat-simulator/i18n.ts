import type {
  AnatomyType,
  DamageType,
  LethalityRating,
  LightingConditionId,
  ModuleLanguage,
  PenetrationTier,
  TacticalStance,
  TargetPriority,
} from './types';

export interface CombatSimulatorCopy {
  header: {
    moduleTag: string;
    presetsLabel: string;
  };
  presets: {
    witcherVsGhouls: string;
    partyVsGriffin: string;
    patrolVsBandits: string;
    clearAll: string;
  };
  controls: {
    iterationsLabel: string;
    runBtn: string;
    runningLabel: string;
    settingsBtn: string;
    settingsTitle: string;
    settingsDesc: string;
    maxRoundsLabel: string;
    lightingLabel: string;
    groupInitBLabel: string;
    rulesHeading: string;
    ruleCritWounds: string;
    ruleFumbles: string;
    ruleWoundThreshold: string;
    ruleFlanking: string;
    ruleStatusEffects: string;
    ruleMultiDefense: string;
    saveToTrackerHint: string;
  };
  lighting: Record<LightingConditionId, string>;
  priorities: Record<TargetPriority, string>;
  stances: Record<TacticalStance, string>;
  anatomy: Record<AnatomyType, string>;
  damageTypes: Record<DamageType, string>;
  penetration: Record<PenetrationTier, string>;
  teams: {
    teamATitle: string;
    teamASubtitle: string;
    teamBTitle: string;
    teamBSubtitle: string;
    priorityLabel: string;
    fightersCount: (units: number, hpTotal: number) => string;
    addBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    qtyLabel: string;
    attLabel: string;
    defLabel: string;
    hpLabel: string;
    spLabel: string;
    dmgLabel: string;
    editTooltip: string;
    duplicateTooltip: string;
    swapTeamTooltip: string;
    removeTooltip: string;
    nonSilverTag: string;
    silverTag: string;
  };
  addDialog: {
    title: string;
    description: string;
    tabs: {
      bestiary: string;
      hub: string;
      archetypes: string;
      custom: string;
    };
    searchPlaceholder: string;
    kindAll: string;
    kindMonster: string;
    kindHumanoid: string;
    kindAnimal: string;
    variantLabel: string;
    qtyLabel: string;
    addSelectedBtn: string;
    hubPcsTitle: string;
    hubGroupsTitle: string;
    noHubData: string;
    importGroupBtn: string;
    importJsonBtn: string;
    jsonErrorToast: string;
    addedToast: (name: string) => string;
    groupImportedToast: (name: string, count: number) => string;
    customForm: {
      nameLabel: string;
      namePlaceholder: string;
      anatomyLabel: string;
      hpLabel: string;
      endLabel: string;
      spLabel: string;
      refLabel: string;
      corLabel: string;
      etouLabel: string;
      attackBaseLabel: string;
      defenseBaseLabel: string;
      weaponNameLabel: string;
      weaponDmgLabel: string;
      attacksPerRoundLabel: string;
      damageTypeLabel: string;
      penetrationLabel: string;
      isSilverLabel: string;
      nonSilverResistLabel: string;
      stanceLabel: string;
      submitBtn: string;
    };
  };
  editDialog: {
    title: string;
    description: string;
    statsSection: string;
    weaponSection: string;
    bleedChanceLabel: string;
    burnChanceLabel: string;
    poisonChanceLabel: string;
    stunChanceLabel: string;
    isRangedLabel: string;
    saveBtn: string;
    cancelBtn: string;
  };
  report: {
    title: string;
    metaSummary: (iterations: number, durationMs: number) => string;
    emptyTeamsNotice: string;
    kpis: {
      teamAWinRate: string;
      winsOfTotal: (wins: number, total: number) => string;
      perfectWinRate: string;
      perfectWinSub: (count: number) => string;
      avgDuration: string;
      roundsUnit: (rounds: string) => string;
      durationRange: (min: number, max: number, seconds: string) => string;
      teamBWinRate: string;
      drawsNote: (draws: number) => string;
    };
    lethalityLabels: Record<LethalityRating, string>;
    lethalityDescriptions: Record<LethalityRating, string>;
    outcomeBreakdownTitle: string;
    outcomePerfectA: string;
    outcomeCostlyA: string;
    outcomeDraw: string;
    outcomeWinB: string;
    histogramTitle: string;
    histogramSubtitle: string;
    roundShort: (r: number) => string;
    telemetryTitle: string;
    telemetryColumns: {
      fighter: string;
      side: string;
      survival: string;
      death: string;
      avgHp: string;
      hitRate: string;
      dmgDealt: string;
      dmgTaken: string;
      crits: string;
      fumbles: string;
    };
    sampleTitle: string;
    sampleSubtitle: (winner: string, rounds: number) => string;
    sampleDrawWinner: string;
    teamAShort: string;
    teamBShort: string;
  };
}

const FR_COPY: CombatSimulatorCopy = {
  header: {
    moduleTag: 'Combat & Rencontres · Simulation statistique',
    presetsLabel: 'Scénarios types',
  },
  presets: {
    witcherVsGhouls: 'Sorceleur vs 3 Goules',
    partyVsGriffin: 'Groupe (3 PJ) vs Griffon',
    patrolVsBandits: '2 Gardes vs 3 Bandits',
    clearAll: 'Vider les équipes',
  },
  controls: {
    iterationsLabel: 'Combats simulés',
    runBtn: 'Lancer la simulation',
    runningLabel: 'Calcul en cours…',
    settingsBtn: 'Paramètres & Règles',
    settingsTitle: 'Paramètres du moteur Monte-Carlo',
    settingsDesc:
      'Activez ou ajustez les mécaniques officielles de combat The Witcher JdR prises en compte lors des simulations.',
    maxRoundsLabel: 'Limite max de rounds par combat',
    lightingLabel: 'Luminosité du champ de bataille',
    groupInitBLabel: 'Initiative de groupe (Équipe B)',
    rulesHeading: 'Règles de combat appliquées',
    ruleCritWounds: 'Blessures critiques (+7/+10/+13/+15 marge & tables 2d6)',
    ruleFumbles: 'Échecs critiques (1 naturel explosif)',
    ruleWoundThreshold: 'Seuil de blessures (< PS max / 5 → RÉF/DEX/INT/VOL ÷2)',
    ruleFlanking: 'Attaquer en groupe (-1 Défense par attaquant suppl.)',
    ruleStatusEffects: 'Effets de statut (Saignement, Incinération, Poison, Étourdissement)',
    ruleMultiDefense: 'Défenses multiples (-1 END / action défensive suppl.)',
    saveToTrackerHint:
      'Astuce : les PJ, groupes, PNJ et monstres du Hub MJ sont synchronisés avec le Gestionnaire de combats.',
  },
  lighting: {
    bright: 'Lumière brillante (éblouissement directionnel · aucun malus auto)',
    daylight: 'Lumière du jour (aucun malus)',
    dim: 'Lumière tamisée (Clair de lune · aucun malus Att/Déf)',
    darkness: 'Ténèbres (-2 Attaque & Défense)',
  },
  priorities: {
    weakest: 'Cible la plus affaiblie (PS)',
    strongest: 'Menace la plus robuste',
    focused: 'Tir concentré (même cible)',
    random: 'Cible aléatoire',
  },
  stances: {
    balanced: 'Standard (selon Att/rd)',
    fast: 'Frappe rapide (×2 attaques)',
    strong: 'Frappe puissante (-3 Att, ×2 DÉG)',
    defensive: 'Prudente / Esquive active (+2 Déf)',
  },
  anatomy: {
    human: 'Humain / Humanoïde',
    monster: 'Monstre',
    elemental: 'Élémentaire (sans organes)',
    specter: 'Spectre (sans jambes/organes)',
  },
  damageTypes: {
    slashing: 'Tranchant',
    piercing: 'Perforant',
    bludgeoning: 'Contondant',
    elemental: 'Élémental / Feu',
  },
  penetration: {
    none: 'Aucune',
    normal: 'Perforation (ignore RD)',
    improved: 'Perforation amél. (PA ÷2, ignore RD)',
  },
  teams: {
    teamATitle: 'Équipe A · Alliés & PJ',
    teamASubtitle: 'Héros, compagnons ou faction défendue',
    teamBTitle: 'Équipe B · Adversaires & Monstres',
    teamBSubtitle: 'Créatures du bestiaire, bandits ou boss',
    priorityLabel: 'Tactique',
    fightersCount: (units, hpTotal) => `${units} combattant(s) · ${hpTotal} PS cumulés`,
    addBtn: 'Ajouter',
    emptyTitle: 'Aucun combattant configuré',
    emptyDesc:
      'Ajoutez des PJ depuis le Hub MJ, des créatures du bestiaire ou un archétype pour estimer les chances de victoire.',
    qtyLabel: 'Qté',
    attLabel: 'Att',
    defLabel: 'Déf',
    hpLabel: 'PS',
    spLabel: 'PA',
    dmgLabel: 'DÉG',
    editTooltip: 'Modifier les statistiques',
    duplicateTooltip: 'Dupliquer',
    swapTeamTooltip: 'Basculer vers l’autre équipe',
    removeTooltip: 'Retirer',
    nonSilverTag: 'Rés. non-argent',
    silverTag: 'Argent',
  },
  addDialog: {
    title: 'Ajouter au simulateur',
    description:
      'Importez une créature du Bestiaire, un PJ/Groupe du Hub MJ partagé, une fiche JSON ou créez un profil sur mesure.',
    tabs: {
      bestiary: 'Bestiaire officiel',
      hub: 'Hub MJ',
      archetypes: 'Archétypes & JSON',
      custom: 'Sur mesure',
    },
    searchPlaceholder: 'Rechercher une créature, faction, type…',
    kindAll: 'Tout',
    kindMonster: 'Monstres',
    kindHumanoid: 'Humanoïdes',
    kindAnimal: 'Animaux',
    variantLabel: 'Variante / Caste',
    qtyLabel: 'Quantité',
    addSelectedBtn: 'Ajouter à l’équipe',
    hubPcsTitle: 'PJ enregistrés dans le Hub MJ',
    hubGroupsTitle: 'Groupes enregistrés dans le Hub MJ',
    noHubData:
      'Aucun PJ, groupe, PNJ ni monstre enregistré dans le Hub MJ pour le moment. Créez-en depuis l’accueil du Simulateur (Hub partagé) ou utilisez les onglets Bestiaire / Archétypes.',
    importGroupBtn: 'Importer le groupe',
    importJsonBtn: 'Importer une fiche PJ (.json)',
    jsonErrorToast: 'Fichier JSON de fiche PJ invalide.',
    addedToast: (name) => `${name} ajouté à la simulation.`,
    groupImportedToast: (name, count) =>
      `Groupe « ${name} » importé (${count} profil(s)).`,
    customForm: {
      nameLabel: 'Nom du combattant',
      namePlaceholder: 'Ex : Chevalier errant, Chef brigand…',
      anatomyLabel: 'Anatomie',
      hpLabel: 'PS max',
      endLabel: 'END max',
      spLabel: 'Armure (PA)',
      refLabel: 'RÉF',
      corLabel: 'COR',
      etouLabel: 'ÉTOU',
      attackBaseLabel: 'Base d’attaque (Carac + Comp)',
      defenseBaseLabel: 'Base de défense (Carac + Comp)',
      weaponNameLabel: 'Arme / Attaque',
      weaponDmgLabel: 'Formule de dégâts',
      attacksPerRoundLabel: 'Attaques / round',
      damageTypeLabel: 'Type de dégâts',
      penetrationLabel: 'Perforation',
      isSilverLabel: 'Arme en argent',
      nonSilverResistLabel: 'Résistant non-argent (Monstre ÷2)',
      stanceLabel: 'Posture tactique',
      submitBtn: 'Ajouter à l’équipe',
    },
  },
  editDialog: {
    title: 'Configurer le combattant simulé',
    description:
      'Affinez les bases de jet, l’armure, l’arme et les probabilités d’effets de statut utilisés par le moteur.',
    statsSection: 'Statistiques & Bases de combat',
    weaponSection: 'Arme principale & Effets',
    bleedChanceLabel: '% Saignement',
    burnChanceLabel: '% Incinération',
    poisonChanceLabel: '% Empoisonnement',
    stunChanceLabel: '% Étourdissement',
    isRangedLabel: 'Attaque à distance (pas de malus encerclement)',
    saveBtn: 'Enregistrer',
    cancelBtn: 'Annuler',
  },
  report: {
    title: 'Rapport statistique de la confrontation',
    metaSummary: (iterations, durationMs) =>
      `${iterations.toLocaleString('fr-FR')} combats simulés en ${durationMs} ms`,
    emptyTeamsNotice:
      'Ajoutez au moins un combattant dans chaque équipe pour exécuter la simulation.',
    kpis: {
      teamAWinRate: 'Victoires Équipe A',
      winsOfTotal: (wins, total) => `${wins} / ${total} victoires`,
      perfectWinRate: 'Victoires sans perte (A)',
      perfectWinSub: (count) => `${count} affrontement(s) sans décès`,
      avgDuration: 'Durée moyenne',
      roundsUnit: (rounds) => `${rounds} rds`,
      durationRange: (min, max, seconds) => `${min}–${max} rds (~${seconds} s en jeu)`,
      teamBWinRate: 'Victoires Équipe B',
      drawsNote: (draws) =>
        draws > 0 ? `${draws} match(s) nul(s) à la limite de rounds` : 'Aucune égalité',
    },
    lethalityLabels: {
      trivial: 'Triviale',
      favorable: 'Favorable',
      balanced: 'Équilibrée',
      risky: 'Risquée',
      deadly: 'Mortelle',
    },
    lethalityDescriptions: {
      trivial: 'L’équipe A domine très largement sans menace sérieuse.',
      favorable: 'Avantage net pour l’équipe A, blessures possibles mais rares décès.',
      balanced: 'Affrontement tendu : la victoire dépendra des jets et de la tactique.',
      risky: 'Confrontation périlleuse avec fort risque de pertes dans l’équipe A.',
      deadly: 'Rencontre extrêmement létale : défaite probable de l’équipe A.',
    },
    outcomeBreakdownTitle: 'Répartition des issues',
    outcomePerfectA: 'Victoire A sans perte',
    outcomeCostlyA: 'Victoire A avec perte(s)',
    outcomeDraw: 'Égalité / Limite',
    outcomeWinB: 'Victoire Équipe B',
    histogramTitle: 'Distribution de durée (par round)',
    histogramSubtitle: 'Nombre de victoires selon le round final',
    roundShort: (r) => `R${r}`,
    telemetryTitle: 'Télémétrie moyenne par profil de combattant',
    telemetryColumns: {
      fighter: 'Combattant',
      side: 'Camp',
      survival: 'Survie',
      death: 'Mortalité',
      avgHp: 'PS restants',
      hitRate: 'Précision',
      dmgDealt: 'DÉG infligés',
      dmgTaken: 'DÉG subis',
      crits: 'Critiques (+ / -)',
      fumbles: 'Échecs crit.',
    },
    sampleTitle: 'Combat témoin (1 déroulement représentatif)',
    sampleSubtitle: (winner, rounds) => `Issue : ${winner} en ${rounds} round(s)`,
    sampleDrawWinner: 'Égalité',
    teamAShort: 'Équipe A',
    teamBShort: 'Équipe B',
  },
};

const EN_COPY: CombatSimulatorCopy = {
  header: {
    moduleTag: 'Combat & Encounters · Statistical Simulation',
    presetsLabel: 'Quick Scenarios',
  },
  presets: {
    witcherVsGhouls: 'Witcher vs 3 Ghouls',
    partyVsGriffin: 'Party (3 PCs) vs Griffin',
    patrolVsBandits: '2 Guards vs 3 Bandits',
    clearAll: 'Clear Rosters',
  },
  controls: {
    iterationsLabel: 'Simulated Combats',
    runBtn: 'Run Simulation',
    runningLabel: 'Simulating…',
    settingsBtn: 'Rules & Settings',
    settingsTitle: 'Monte-Carlo Engine Settings',
    settingsDesc:
      'Configure which official Witcher TRPG combat mechanics are enforced across every simulated encounter.',
    maxRoundsLabel: 'Max rounds per fight',
    lightingLabel: 'Battlefield Lighting',
    groupInitBLabel: 'Group Initiative (Team B)',
    rulesHeading: 'Active Combat Rules',
    ruleCritWounds: 'Critical Wounds (+7/+10/+13/+15 margin & 2d6 tables)',
    ruleFumbles: 'Critical Fumbles (exploding natural 1)',
    ruleWoundThreshold: 'Wound Threshold (< Max HP / 5 → REF/DEX/INT/WILL ÷2)',
    ruleFlanking: 'Group Flanking (-1 Defense per extra melee attacker)',
    ruleStatusEffects: 'Status Conditions (Bleeding, Burning, Poison, Stunned)',
    ruleMultiDefense: 'Multiple Defenses (-1 STA per extra defense)',
    saveToTrackerHint:
      'Tip: PCs, groups, NPCs, and monsters in the GM Hub are synchronized live with the Combat Tracker.',
  },
  lighting: {
    bright: 'Bright Sun (directional glare · no auto penalty)',
    daylight: 'Daylight (no penalties)',
    dim: 'Dim Light (Moonlight · no Att/Def penalty)',
    darkness: 'Darkness (-2 Attack & Defense)',
  },
  priorities: {
    weakest: 'Lowest HP target',
    strongest: 'Highest HP threat',
    focused: 'Focus fire (same target)',
    random: 'Random target',
  },
  stances: {
    balanced: 'Standard (weapon RoF)',
    fast: 'Fast Strike (×2 attacks)',
    strong: 'Strong Strike (-3 Att, ×2 DMG)',
    defensive: 'Cautious / Active Dodge (+2 Def)',
  },
  anatomy: {
    human: 'Human / Humanoid',
    monster: 'Monster',
    elemental: 'Elemental (no organs)',
    specter: 'Specter (no legs/organs)',
  },
  damageTypes: {
    slashing: 'Slashing',
    piercing: 'Piercing',
    bludgeoning: 'Bludgeoning',
    elemental: 'Elemental / Fire',
  },
  penetration: {
    none: 'None',
    normal: 'Armor Piercing (ignores DR)',
    improved: 'Improved AP (SP ÷2, ignores DR)',
  },
  teams: {
    teamATitle: 'Team A · Allies & PCs',
    teamASubtitle: 'Player characters, companions, or defended faction',
    teamBTitle: 'Team B · Opponents & Monsters',
    teamBSubtitle: 'Bestiary creatures, bandits, or bosses',
    priorityLabel: 'Targeting',
    fightersCount: (units, hpTotal) => `${units} combatant(s) · ${hpTotal} total HP`,
    addBtn: 'Add Fighter',
    emptyTitle: 'No combatants configured',
    emptyDesc:
      'Add PCs from your GM Hub, creatures from the Bestiary, or archetypes to evaluate win probabilities.',
    qtyLabel: 'Qty',
    attLabel: 'Att',
    defLabel: 'Def',
    hpLabel: 'HP',
    spLabel: 'SP',
    dmgLabel: 'DMG',
    editTooltip: 'Edit combatant stats',
    duplicateTooltip: 'Duplicate',
    swapTeamTooltip: 'Swap to opposing team',
    removeTooltip: 'Remove',
    nonSilverTag: 'Non-silver res.',
    silverTag: 'Silver',
  },
  addDialog: {
    title: 'Add Combatant to Simulator',
    description:
      'Import from the Bestiary, the shared GM Hub, a Character Sheet JSON, or build a custom profile.',
    tabs: {
      bestiary: 'Official Bestiary',
      hub: 'GM Hub',
      archetypes: 'Archetypes & JSON',
      custom: 'Custom',
    },
    searchPlaceholder: 'Search creature, faction, type…',
    kindAll: 'All',
    kindMonster: 'Monsters',
    kindHumanoid: 'Humanoids',
    kindAnimal: 'Animals',
    variantLabel: 'Caste / Variant',
    qtyLabel: 'Quantity',
    addSelectedBtn: 'Add to Team',
    hubPcsTitle: 'Saved PCs in GM Hub',
    hubGroupsTitle: 'Saved Groups in GM Hub',
    noHubData:
      'No PCs, groups, NPCs, or monsters saved in the GM Hub yet. Create them from the Simulator Hub (shared with the Combat Tracker) or use the Bestiary / Archetypes tabs.',
    importGroupBtn: 'Import Group',
    importJsonBtn: 'Import PC Sheet (.json)',
    jsonErrorToast: 'Invalid Character Sheet JSON file.',
    addedToast: (name) => `${name} added to simulation.`,
    groupImportedToast: (name, count) =>
      `Imported group “${name}” (${count} profile(s)).`,
    customForm: {
      nameLabel: 'Combatant Name',
      namePlaceholder: 'e.g. Hedge Knight, Bandit Leader…',
      anatomyLabel: 'Anatomy',
      hpLabel: 'Max HP',
      endLabel: 'Max STA',
      spLabel: 'Armor (SP)',
      refLabel: 'REF',
      corLabel: 'BODY',
      etouLabel: 'STUN',
      attackBaseLabel: 'Attack Base (Stat + Skill)',
      defenseBaseLabel: 'Defense Base (Stat + Skill)',
      weaponNameLabel: 'Weapon / Attack',
      weaponDmgLabel: 'Damage Formula',
      attacksPerRoundLabel: 'Attacks / round',
      damageTypeLabel: 'Damage Type',
      penetrationLabel: 'Penetration',
      isSilverLabel: 'Silver weapon',
      nonSilverResistLabel: 'Non-silver resistant (Monster ÷2)',
      stanceLabel: 'Tactical Stance',
      submitBtn: 'Add to Team',
    },
  },
  editDialog: {
    title: 'Configure Simulated Combatant',
    description:
      'Tune roll bases, armor, weapon stats, and status proc probabilities for the simulator.',
    statsSection: 'Attributes & Combat Bases',
    weaponSection: 'Primary Weapon & Status Effects',
    bleedChanceLabel: 'Bleed %',
    burnChanceLabel: 'Burn %',
    poisonChanceLabel: 'Poison %',
    stunChanceLabel: 'Stun %',
    isRangedLabel: 'Ranged attack (no melee flanking penalty)',
    saveBtn: 'Save Changes',
    cancelBtn: 'Cancel',
  },
  report: {
    title: 'Statistical Encounter Report',
    metaSummary: (iterations, durationMs) =>
      `${iterations.toLocaleString('en-US')} fights simulated in ${durationMs} ms`,
    emptyTeamsNotice:
      'Add at least one combatant to both Team A and Team B to run the simulation.',
    kpis: {
      teamAWinRate: 'Team A Win Rate',
      winsOfTotal: (wins, total) => `${wins} / ${total} wins`,
      perfectWinRate: 'Zero-Casualty Wins (A)',
      perfectWinSub: (count) => `${count} fight(s) with all A surviving`,
      avgDuration: 'Average Duration',
      roundsUnit: (rounds) => `${rounds} rds`,
      durationRange: (min, max, seconds) => `${min}–${max} rds (~${seconds} s in-world)`,
      teamBWinRate: 'Team B Win Rate',
      drawsNote: (draws) =>
        draws > 0 ? `${draws} draw(s) at round limit` : 'No draws',
    },
    lethalityLabels: {
      trivial: 'Trivial',
      favorable: 'Favorable',
      balanced: 'Balanced',
      risky: 'Risky',
      deadly: 'Deadly',
    },
    lethalityDescriptions: {
      trivial: 'Team A dominates overwhelmingly with negligible threat.',
      favorable: 'Clear edge for Team A; injuries may occur but fatalities are rare.',
      balanced: 'Tense encounter: victory hinges on dice swings and positioning.',
      risky: 'Perilous confrontation with high risk of Team A casualties.',
      deadly: 'Extremely lethal encounter: Team A defeat is likely.',
    },
    outcomeBreakdownTitle: 'Outcome Breakdown',
    outcomePerfectA: 'Team A Clean Victory',
    outcomeCostlyA: 'Team A Costly Victory',
    outcomeDraw: 'Draw / Timeout',
    outcomeWinB: 'Team B Victory',
    histogramTitle: 'Combat Duration Distribution',
    histogramSubtitle: 'Victories binned by final combat round',
    roundShort: (r) => `R${r}`,
    telemetryTitle: 'Per-Blueprint Combat Telemetry',
    telemetryColumns: {
      fighter: 'Combatant',
      side: 'Side',
      survival: 'Survival',
      death: 'Death Rate',
      avgHp: 'Avg End HP',
      hitRate: 'Accuracy',
      dmgDealt: 'DMG Dealt',
      dmgTaken: 'DMG Taken',
      crits: 'Crits (+ / -)',
      fumbles: 'Fumbles',
    },
    sampleTitle: 'Representative Fight Transcript (Sample Run)',
    sampleSubtitle: (winner, rounds) => `Outcome: ${winner} in ${rounds} round(s)`,
    sampleDrawWinner: 'Draw',
    teamAShort: 'Team A',
    teamBShort: 'Team B',
  },
};

export function getCombatSimulatorCopy(lang: ModuleLanguage): CombatSimulatorCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
