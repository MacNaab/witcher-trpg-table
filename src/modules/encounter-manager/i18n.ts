import type { ModuleLanguage } from './types';

export interface EncounterManagerCopy {
  header: {
    moduleTag: string;
  };
  tabs: {
    monster: string;
    humanoid: string;
    bestiary: string;
  };
  roller: {
    monsterTitle: string;
    monsterDescription: string;
    humanoidTitle: string;
    humanoidDescription: string;
    environmentsLabel: string;
    selectAll: string;
    clearAll: string;
    includeFanMade: string;
    includeEverywhere: string;
    allEnvironmentsOption: string;
    rollMonster: string;
    rollHumanoid: string;
    reroll: string;
    matchingCount: string;
    selectEnvHint: string;
    noMatchesHint: string;
    emptyResultTitle: string;
    emptyResultBody: string;
    recentRolls: string;
  };
  dossier: {
    type: string;
    threat: string;
    reward: string;
    armor: string;
    size: string;
    weight: string;
    environments: string;
    intelligence: string;
    organization: string;
    notes: string;
    noNotes: string;
    baseStats: string;
    fanMadeTag: string;
    officialTag: string;
    humanoidTag: string;
    monsterTag: string;
    animalTag: string;
    combatStats: string;
    combatSkills: string;
    weapons: string;
    weaponName: string;
    weaponDamage: string;
    weaponEffect: string;
    weaponAttacks: string;
    attacksPerRoundNote: string;
    abilities: string;
    vulnerabilities: string;
    loot: string;
    variants: string;
    copy: string;
    copied: string;
    copiedToast: string;
    poolSummary: string;
    quantityLabel: string;
    sendToCombat: string;
    sendToSimulator: string;
    sentToCombatToast: (name: string, qty: number) => string;
    sentToSimulatorToast: (name: string, qty: number) => string;
  };
  bestiary: {
    title: string;
    description: string;
    searchPlaceholder: string;
    categoryFilter: string;
    categoryAll: string;
    categoryMonsters: string;
    categoryHumanoids: string;
    categoryAnimals: string;
    typeFilter: string;
    typeAll: string;
    envFilter: string;
    envAll: string;
    everywhereOption: string;
    sourceFilter: string;
    sourceAll: string;
    sourceOfficial: string;
    sourceFanMade: string;
    resetFilters: string;
    resultsCount: string;
    columns: {
      name: string;
      type: string;
      threat: string;
      reward: string;
      armor: string;
      environments: string;
      organization: string;
      intelligence: string;
      size: string;
      weight: string;
      actions: string;
    };
    inspect: string;
    emptyTable: string;
    dialogClose: string;
    rulesBtn: string;
    rulesDialogTitle: string;
    rulesDialogDesc: string;
  };
}

const FR_COPY: EncounterManagerCopy = {
  header: {
    moduleTag: 'BESTIAIRE & RENCONTRES',
  },
  tabs: {
    monster: 'Monstre aléatoire',
    humanoid: 'Humain / Humanoïde aléatoire',
    bestiary: 'Bestiaire & Tableau complet',
  },
  roller: {
    monsterTitle: 'Monstre aléatoire',
    monsterDescription:
      'Cochez un ou plusieurs environnements pour tirer une créature unique sans doublon.',
    humanoidTitle: 'Humain / Humanoïde aléatoire',
    humanoidDescription:
      'Cochez les zones traversées pour générer une faction, patrouille ou bande adverse.',
    environmentsLabel: 'Environnements',
    selectAll: 'Tout cocher',
    clearAll: 'Tout décocher',
    includeFanMade: 'Inclure créatures fan-made',
    includeEverywhere: 'Inclure « Partout »',
    allEnvironmentsOption: 'Tous les environnements',
    rollMonster: 'Tirer un monstre',
    rollHumanoid: 'Tirer un humanoïde',
    reroll: 'Relancer',
    matchingCount: 'correspondance(s) possible(s)',
    selectEnvHint:
      'Sélectionnez au moins un environnement pour activer le tirage.',
    noMatchesHint:
      'Aucune rencontre ne correspond à cette combinaison. Essayez d’ajouter un environnement ou d’activer le contenu fan-made.',
    emptyResultTitle: 'En attente de tirage',
    emptyResultBody:
      'Choisissez les terrains ci-dessus puis lancez le tirage pour afficher la fiche complète de la rencontre.',
    recentRolls: 'Derniers tirages',
  },
  dossier: {
    type: 'Type',
    threat: 'Menace',
    reward: 'Récompense',
    armor: 'Armure',
    size: 'Taille',
    weight: 'Poids',
    environments: 'Environnements',
    intelligence: 'Intelligence',
    organization: 'Organisation',
    notes: 'Notes pour le MJ',
    noNotes: 'Aucune note particulière consignée dans le bestiaire.',
    baseStats: 'Caractéristiques de référence',
    fanMadeTag: 'Fan-made',
    officialTag: 'Officiel',
    humanoidTag: 'Humanoïde',
    monsterTag: 'Monstre',
    animalTag: 'Animal / Monture',
    combatStats: 'Caractéristiques',
    combatSkills: 'Compétences',
    weapons: 'Attaques & Armes',
    weaponName: 'Attaque / Arme',
    weaponDamage: 'Dégâts',
    weaponEffect: 'Effet',
    weaponAttacks: 'Att/tour',
    attacksPerRoundNote:
      'Règle : un seul type d’attaque utilisable par round (ex. griffes OU morsure).',
    abilities: 'Capacités spéciales',
    vulnerabilities: 'Vulnérabilités',
    loot: 'Butins & Composants',
    variants: 'Variantes / Castes',
    copy: 'Copier la fiche',
    copied: 'Copié',
    copiedToast: 'Fiche de rencontre copiée dans le presse-papiers.',
    poolSummary: 'Tiré parmi {count} entrée(s)',
    quantityLabel: 'Effectif',
    sendToCombat: 'Lancer en combat',
    sendToSimulator: 'Tester au simulateur',
    sentToCombatToast: (name: string, qty: number) =>
      `Affrontement prêt : ${qty}× ${name} envoyé(s) vers le suivi de combat.`,
    sentToSimulatorToast: (name: string, qty: number) =>
      `Simulation prête : ${qty}× ${name} placé(s) en Équipe B.`,
  },
  bestiary: {
    title: 'Référentiel complet du bestiaire & des factions',
    description:
      'Recherchez, filtrez et consultez l’ensemble des monstres, humanoïdes et animaux. Cliquez sur une ligne pour ouvrir la fiche de combat complète.',
    searchPlaceholder: 'Rechercher un nom, environnement, note, menace…',
    categoryFilter: 'Catégorie',
    categoryAll: 'Toutes',
    categoryMonsters: 'Monstres',
    categoryHumanoids: 'Humanoïdes',
    categoryAnimals: 'Animaux',
    typeFilter: 'Type',
    typeAll: 'Tous les types',
    envFilter: 'Environnement',
    envAll: 'Tous les terrains',
    everywhereOption: 'Partout (ubiquiste)',
    sourceFilter: 'Origine',
    sourceAll: 'Toutes',
    sourceOfficial: 'Officiel',
    sourceFanMade: 'Fan-made',
    resetFilters: 'Réinitialiser',
    resultsCount: '{shown} / {total} entrées',
    columns: {
      name: 'Nom',
      type: 'Type',
      threat: 'Menace',
      reward: 'Récompense',
      armor: 'Armure',
      environments: 'Environnements',
      organization: 'Organisation',
      intelligence: 'Intelligence',
      size: 'Taille',
      weight: 'Poids',
      actions: 'Détails',
    },
    inspect: 'Fiche',
    emptyTable: 'Aucune créature ou faction ne correspond à votre recherche.',
    dialogClose: 'Fermer',
    rulesBtn: 'Guide du Bestiaire',
    rulesDialogTitle: 'Guide officiel du Bestiaire (Livre de base)',
    rulesDialogDesc:
      'Niveaux de menace et de complexité, règle des attaques par round, primes et les 12 catégories de créatures.',
  },
};

const EN_COPY: EncounterManagerCopy = {
  header: {
    moduleTag: 'BESTIARY & ENCOUNTERS',
  },
  tabs: {
    monster: 'Random Monster',
    humanoid: 'Random Human / Humanoid',
    bestiary: 'Bestiary & Full Table',
  },
  roller: {
    monsterTitle: 'Random Monster Encounter',
    monsterDescription:
      'Check one or more environments to roll a unique creature without probability skew.',
    humanoidTitle: 'Random Human / Humanoid Encounter',
    humanoidDescription:
      'Select traversed regions to generate an opposing patrol, warband, or faction.',
    environmentsLabel: 'Environments',
    selectAll: 'Select all',
    clearAll: 'Clear',
    includeFanMade: 'Include fan-made creatures',
    includeEverywhere: 'Include "Everywhere"',
    allEnvironmentsOption: 'All environments',
    rollMonster: 'Roll monster',
    rollHumanoid: 'Roll humanoid',
    reroll: 'Reroll',
    matchingCount: 'matching encounter(s)',
    selectEnvHint: 'Select at least one environment to enable rolling.',
    noMatchesHint:
      'No encounters match this combination. Try selecting another terrain or enabling fan-made entries.',
    emptyResultTitle: 'Ready to roll',
    emptyResultBody:
      'Choose one or more environments above and roll to display the complete encounter dossier.',
    recentRolls: 'Recent rolls',
  },
  dossier: {
    type: 'Type',
    threat: 'Threat',
    reward: 'Bounty / Reward',
    armor: 'Armor',
    size: 'Size',
    weight: 'Weight',
    environments: 'Environments',
    intelligence: 'Intelligence',
    organization: 'Organization',
    notes: 'GM Notes',
    noNotes: 'No special GM notes recorded for this entry.',
    baseStats: 'Reference Attributes',
    fanMadeTag: 'Fan-made',
    officialTag: 'Official',
    humanoidTag: 'Humanoid',
    monsterTag: 'Monster',
    animalTag: 'Animal / Mount',
    combatStats: 'Attributes',
    combatSkills: 'Skills',
    weapons: 'Attacks & Weapons',
    weaponName: 'Attack / Weapon',
    weaponDamage: 'DMG',
    weaponEffect: 'Effect',
    weaponAttacks: 'RoF',
    attacksPerRoundNote:
      'Rule: a creature may only use one distinct attack type per round (e.g., claws OR bite).',
    abilities: 'Special Abilities',
    vulnerabilities: 'Vulnerabilities',
    loot: 'Loot & Components',
    variants: 'Castes / Variants',
    copy: 'Copy dossier',
    copied: 'Copied',
    copiedToast: 'Encounter dossier copied to clipboard.',
    poolSummary: 'Rolled from {count} entry/entries',
    quantityLabel: 'Qty',
    sendToCombat: 'Send to Combat',
    sendToSimulator: 'Test in Simulator',
    sentToCombatToast: (name: string, qty: number) =>
      `Encounter ready: ${qty}× ${name} launched in Combat Tracker.`,
    sentToSimulatorToast: (name: string, qty: number) =>
      `Simulation ready: ${qty}× ${name} staged in Team B.`,
  },
  bestiary: {
    title: 'Complete Bestiary & Faction Reference',
    description:
      'Search, filter, and inspect all monsters, humanoids, and beasts. Click any row to open its full combat dossier and GM notes.',
    searchPlaceholder: 'Search by name, terrain, threat, note…',
    categoryFilter: 'Category',
    categoryAll: 'All',
    categoryMonsters: 'Monsters',
    categoryHumanoids: 'Humanoids',
    categoryAnimals: 'Animals',
    typeFilter: 'Type',
    typeAll: 'All types',
    envFilter: 'Environment',
    envAll: 'All terrains',
    everywhereOption: 'Everywhere (ubiquitous)',
    sourceFilter: 'Source',
    sourceAll: 'All',
    sourceOfficial: 'Official',
    sourceFanMade: 'Fan-made',
    resetFilters: 'Reset',
    resultsCount: '{shown} / {total} entries',
    columns: {
      name: 'Name',
      type: 'Type',
      threat: 'Threat',
      reward: 'Bounty',
      armor: 'Armor',
      environments: 'Environments',
      organization: 'Organization',
      intelligence: 'Intelligence',
      size: 'Size',
      weight: 'Weight',
      actions: 'Details',
    },
    inspect: 'Inspect',
    emptyTable: 'No monsters or humanoids match the active filters.',
    dialogClose: 'Close',
    rulesBtn: 'Bestiary Guide',
    rulesDialogTitle: 'Official Bestiary Guide (Core Rulebook)',
    rulesDialogDesc:
      'Threat and complexity ratings, attacks-per-round rule, bounties, and the 12 core creature categories.',
  },
};

export function getEncounterManagerCopy(
  lang: ModuleLanguage
): EncounterManagerCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
