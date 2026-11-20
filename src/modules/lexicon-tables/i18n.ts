import type {
  CraftLevelId,
  ElderfolkKindId,
  LexiconGroupId,
  LexiconTabId,
  ModuleLanguage,
  RarityCode,
  SubstanceId,
} from './types';

export interface LexiconTablesCopy {
  header: {
    moduleTag: string;
  };
  groups: Record<LexiconGroupId, string>;
  tabs: Record<LexiconTabId, string>;
  levels: Record<CraftLevelId, string>;
  elderfolkKinds: Record<ElderfolkKindId, string>;
  rarities: Record<RarityCode, { code: string; label: string }>;
  substances: Record<SubstanceId, string>;
  toolbar: {
    searchPlaceholder: string;
    globalSearchToggle: string;
    globalSearchHint: string;
    levelFilter: string;
    levelAll: string;
    rarityFilter: string;
    rarityAll: string;
    substanceFilter: string;
    substanceAll: string;
    elderfolkKindFilter: string;
    elderfolkKindAll: string;
    tableFilter: string;
    tableAll: string;
    resetFilters: string;
    resultsCount: string;
    rarityLegendTitle: string;
  };
  columns: {
    table: string;
    nameEn: string;
    nameFr: string;
    level: string;
    type: string;
    substance: string;
    rarity: string;
    location: string;
    quantity: string;
    dc: string;
    forageDc: string;
    time: string;
    weight: string;
    componentsEn: string;
    componentsFr: string;
    components: string;
    investment: string;
    cost: string;
    actions: string;
  };
  detail: {
    titlePrefix: string;
    englishTerm: string;
    frenchTerm: string;
    englishComponents: string;
    frenchComponents: string;
    copyRow: string;
    copiedToast: string;
    close: string;
    inspect: string;
    crownsUnit: string;
    weightUnit: string;
  };
  emptyState: {
    title: string;
    description: string;
  };
}

const FR_COPY: LexiconTablesCopy = {
  header: {
    moduleTag: 'CODEX ARTISANAT & ALCHIMIE (EN–FR)',
  },
  groups: {
    materials: 'Matériaux & Récolte',
    diagrams: 'Schémas d’artisanat',
    alchemy: 'Alchimie',
  },
  tabs: {
    'crafting-materials': 'Matériaux d’artisanat',
    'animal-parts': 'Peaux & Parties d’animaux',
    minerals: 'Lingots & Minéraux',
    'alchemical-treatments': 'Traitements alchimiques',
    'ingredient-diagrams': 'Schémas d’ingrédients',
    'weapon-diagrams': 'Schémas d’armes',
    'armor-diagrams': 'Schémas d’armures',
    'elderfolk-diagrams': 'Schémas des Races Anciennes',
    substances: 'Substances',
    formulae: 'Formules',
  },
  levels: {
    novice: 'Novice',
    journeyman: 'Compagnon',
    master: 'Maître',
    'grand-master': 'Grand Maître',
  },
  elderfolkKinds: {
    weapon: 'Arme',
    armor: 'Armure',
    'armor-enhancement': 'Amélioration d’armure',
  },
  rarities: {
    E: { code: 'E', label: 'Omniprésent (E)' },
    C: { code: 'C', label: 'Commun (C)' },
    P: { code: 'P', label: 'Peu courant (P)' },
    R: { code: 'R', label: 'Rare (R)' },
    none: { code: '—', label: 'Non spécifié' },
  },
  substances: {
    aether: 'Aether',
    caelum: 'Caelum',
    fulgur: 'Fulgur',
    hydragenum: 'Hydragenum',
    quebrith: 'Quebrith',
    rebis: 'Rebis',
    sol: 'Sol',
    vermilion: 'Vermilion',
    vitriol: 'Vitriol',
  },
  toolbar: {
    searchPlaceholder: 'Rechercher en anglais ou en français (nom, composant, lieu, SD)…',
    globalSearchToggle: 'Chercher dans les 10 tableaux',
    globalSearchHint: 'Mode comparatif global actif (348 entrées)',
    levelFilter: 'Niveau',
    levelAll: 'Tous les niveaux',
    rarityFilter: 'Rareté',
    rarityAll: 'Toutes raretés',
    substanceFilter: 'Substance',
    substanceAll: 'Toutes substances',
    elderfolkKindFilter: 'Catégorie',
    elderfolkKindAll: 'Toutes catégories',
    tableFilter: 'Tableau',
    tableAll: 'Tous les tableaux',
    resetFilters: 'Réinitialiser',
    resultsCount: '{shown} / {total} entrées',
    rarityLegendTitle: 'Rareté : E = Omniprésent · C = Commun · P = Peu courant · R = Rare',
  },
  columns: {
    table: 'Tableau',
    nameEn: 'Name (EN)',
    nameFr: 'Nom (FR)',
    level: 'Niveau',
    type: 'Type',
    substance: 'Substance',
    rarity: 'Rareté',
    location: 'Localisation',
    quantity: 'Qté',
    dc: 'SD',
    forageDc: 'SD Récolte',
    time: 'Temps',
    weight: 'Poids',
    componentsEn: 'Components (EN)',
    componentsFr: 'Composants (FR)',
    components: 'Composants',
    investment: 'Invest.',
    cost: 'Coût',
    actions: 'Fiche',
  },
  detail: {
    titlePrefix: 'Correspondance bilingue',
    englishTerm: 'Terme anglais (VO)',
    frenchTerm: 'Terme français (VF)',
    englishComponents: 'Composants (VO)',
    frenchComponents: 'Composants (VF)',
    copyRow: 'Copier la ligne',
    copiedToast: 'Entrée copiée dans le presse-papiers.',
    close: 'Fermer',
    inspect: 'Détails',
    crownsUnit: 'couronnes',
    weightUnit: 'kg',
  },
  emptyState: {
    title: 'Aucune entrée correspondante',
    description:
      'Essayez d’élargir votre recherche ou de réinitialiser les filtres actifs.',
  },
};

const EN_COPY: LexiconTablesCopy = {
  header: {
    moduleTag: 'CRAFTING & ALCHEMY CODEX (EN–FR)',
  },
  groups: {
    materials: 'Materials & Foraging',
    diagrams: 'Crafting Diagrams',
    alchemy: 'Alchemy',
  },
  tabs: {
    'crafting-materials': 'Crafting Materials',
    'animal-parts': 'Hides & Animal Parts',
    minerals: 'Ingots & Minerals',
    'alchemical-treatments': 'Alchemical Treatments',
    'ingredient-diagrams': 'Ingredient Diagrams',
    'weapon-diagrams': 'Weapon Diagrams',
    'armor-diagrams': 'Armor Diagrams',
    'elderfolk-diagrams': 'Elderfolk Diagrams',
    substances: 'Substances',
    formulae: 'Formulae',
  },
  levels: {
    novice: 'Novice',
    journeyman: 'Journeyman',
    master: 'Master',
    'grand-master': 'Grand Master',
  },
  elderfolkKinds: {
    weapon: 'Weapon',
    armor: 'Armor',
    'armor-enhancement': 'Armor Enhancement',
  },
  rarities: {
    E: { code: 'E', label: 'Everywhere (E)' },
    C: { code: 'C', label: 'Common (C)' },
    P: { code: 'P', label: 'Poor (P)' },
    R: { code: 'R', label: 'Rare (R)' },
    none: { code: '—', label: 'Unspecified' },
  },
  substances: {
    aether: 'Aether',
    caelum: 'Caelum',
    fulgur: 'Fulgur',
    hydragenum: 'Hydragenum',
    quebrith: 'Quebrith',
    rebis: 'Rebis',
    sol: 'Sol',
    vermilion: 'Vermilion',
    vitriol: 'Vitriol',
  },
  toolbar: {
    searchPlaceholder: 'Search in English or French (name, components, location, DC)…',
    globalSearchToggle: 'Search across all 10 tables',
    globalSearchHint: 'Global cross-table search active (348 entries)',
    levelFilter: 'Level',
    levelAll: 'All levels',
    rarityFilter: 'Rarity',
    rarityAll: 'All rarities',
    substanceFilter: 'Substance',
    substanceAll: 'All substances',
    elderfolkKindFilter: 'Category',
    elderfolkKindAll: 'All categories',
    tableFilter: 'Table',
    tableAll: 'All tables',
    resetFilters: 'Reset',
    resultsCount: '{shown} / {total} entries',
    rarityLegendTitle: 'Rarity: E = Everywhere · C = Common · P = Poor · R = Rare',
  },
  columns: {
    table: 'Table',
    nameEn: 'Name (EN)',
    nameFr: 'Nom (FR)',
    level: 'Level',
    type: 'Type',
    substance: 'Substance',
    rarity: 'Rarity',
    location: 'Location',
    quantity: 'Qty',
    dc: 'DC',
    forageDc: 'Forage DC',
    time: 'Time',
    weight: 'Weight',
    componentsEn: 'Components (EN)',
    componentsFr: 'Composants (FR)',
    components: 'Components',
    investment: 'Invest.',
    cost: 'Cost',
    actions: 'Details',
  },
  detail: {
    titlePrefix: 'EN–FR Comparative Entry',
    englishTerm: 'English Term',
    frenchTerm: 'French Term',
    englishComponents: 'Components (EN)',
    frenchComponents: 'Components (FR)',
    copyRow: 'Copy entry',
    copiedToast: 'Entry copied to clipboard.',
    close: 'Close',
    inspect: 'Inspect',
    crownsUnit: 'crowns',
    weightUnit: 'kg',
  },
  emptyState: {
    title: 'No matching entries',
    description:
      'Try adjusting your search keywords or resetting the active filters.',
  },
};

export function getLexiconTablesCopy(lang: ModuleLanguage): LexiconTablesCopy {
  return lang === 'fr' ? FR_COPY : EN_COPY;
}
