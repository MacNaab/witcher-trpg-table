import type { ChestCategoryId, EncounterDisposition, ModuleLanguage, TableCategoryGroup } from './types';

export interface RandomTablesLocaleCopy {
  tabs: {
    tables: string;
    chest: string;
    encounter: string;
  };
  header: {
    groupLabel: string;
    tablesCountLabel: string;
  };
  tables: {
    selectLabel: string;
    filterAll: string;
    groups: Record<TableCategoryGroup, string>;
    generateButton: string;
    rollAgainButton: string;
    copyButton: string;
    copiedToast: string;
    sourcePrefix: string;
    openExternalLink: string;
    externalNotice: string;
    emptyTitle: string;
    emptyDescription: string;
    possessionsCountLabel: string;
    possessionsTiers: {
      ordinary: string;
      strange: string;
      occult: string;
    };
    historyTitle: string;
    historyEmpty: string;
    clearHistory: string;
    showHistory: string;
    hideHistory: string;
  };
  chest: {
    title: string;
    description: string;
    generateButton: string;
    editRatesButton: string;
    copyButton: string;
    copiedToast: string;
    creditPrefix: string;
    creditAuthor: string;
    emptyTitle: string;
    emptyDescription: string;
    crownsLabel: string;
    itemsCountLabel: string;
    emptyChestLoot: string;
    ratesSummaryTitle: string;
    dialogTitle: string;
    dialogDescription: string;
    presetStandard: string;
    presetBurning: string;
    resetDefaults: string;
    saveRates: string;
    cancel: string;
    maxCrownLabel: string;
    rollsSuffix: string;
    historyTitle: string;
    historyEmpty: string;
    clearHistory: string;
    openInCodexBtn: string;
    categories: Record<ChestCategoryId, string>;
  };
  encounter: {
    title: string;
    description: string;
    generateButton: string;
    copyButton: string;
    copiedToast: string;
    distributionTitle: string;
    presetsLabel: string;
    presets: {
      balanced: string;
      safe: string;
      hostile: string;
    };
    resetButton: string;
    dispositions: Record<EncounterDisposition, string>;
    rollLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    sourcePrefix: string;
    historyTitle: string;
    historyEmpty: string;
    clearHistory: string;
  };
}

const COPY: Record<ModuleLanguage, RandomTablesLocaleCopy> = {
  en: {
    tabs: {
      tables: 'Random Tables',
      chest: 'Random Chest',
      encounter: 'Modular Encounter',
    },
    header: {
      groupLabel: 'World & Sandbox Tools',
      tablesCountLabel: '26 tables ready',
    },
    tables: {
      selectLabel: 'Select a table',
      filterAll: 'All categories',
      groups: {
        locations: 'Locations & Dungeons',
        quests: 'Quests & Contracts',
        npcs: 'NPCs & Lifepaths',
        encounters: 'Travel & Encounters',
        merchants: 'Merchants & Loot',
      },
      generateButton: 'Generate',
      rollAgainButton: 'Roll Again',
      copyButton: 'Copy',
      copiedToast: 'Table result copied to clipboard',
      sourcePrefix: 'Based on the original creation of',
      openExternalLink: 'Open reference table',
      externalNotice:
        'This external reference table is hosted on DnD Speak. Open the source link below to roll directly from their archive.',
      emptyTitle: 'Ready to roll',
      emptyDescription:
        'Pick one of the 26 GM tables above and click Generate to produce an instant result for your session.',
      possessionsCountLabel: 'Items rolled (1d10)',
      possessionsTiers: {
        ordinary: 'Ordinary',
        strange: 'Strange',
        occult: 'Occult',
      },
      historyTitle: 'Session History',
      historyEmpty: 'No rolls recorded yet in this session.',
      clearHistory: 'Clear',
      showHistory: 'Show history',
      hideHistory: 'Hide history',
    },
    chest: {
      title: 'Random Chest Generator',
      description:
        'Roll crowns and categorized loot drops with configurable drop probabilities.',
      generateButton: 'Generate Chest',
      editRatesButton: 'Edit Drop Rates',
      copyButton: 'Copy Loot',
      copiedToast: 'Chest loot copied to clipboard',
      creditPrefix: 'Based on the original creation of',
      creditAuthor: 'Burning (Witcher Loot) & Godzilla',
      emptyTitle: 'No chest rolled yet',
      emptyDescription:
        'Adjust drop rates if needed, then click Generate Chest to roll crowns and equipment.',
      crownsLabel: 'Crowns',
      itemsCountLabel: 'Items found',
      emptyChestLoot: 'Only crowns were found inside this chest.',
      ratesSummaryTitle: 'Active Drop Rates',
      dialogTitle: 'Edit Drop Rates',
      dialogDescription:
        'Customize the maximum crown roll and percentage probabilities for each loot category.',
      presetStandard: 'Standard (193 Crowns)',
      presetBurning: 'Roll20 Burning (300 Crowns)',
      resetDefaults: 'Reset',
      saveRates: 'Save Rates',
      cancel: 'Cancel',
      maxCrownLabel: 'Max Crowns',
      rollsSuffix: 'rolls',
      historyTitle: 'Chest History',
      historyEmpty: 'No chests generated yet.',
      clearHistory: 'Clear',
      openInCodexBtn: 'Codex',
      categories: {
        gear: 'Gear',
        weapon: 'Weapon',
        armor: 'Armor',
        diagram: 'Diagram',
        formula: 'Formula',
        alchemy: 'Alchemy',
        glyph: 'Glyph',
        rune: 'Rune',
        efWeapon: 'Elderfolk Weapon',
        efArmor: 'Elderfolk Armor',
        relic: 'Relic',
      },
    },
    encounter: {
      title: 'Modular Random Encounter',
      description:
        'Split the 0–100% probability range across Good, Neutral, and Bad outcomes using the dual-handle slider.',
      generateButton: 'Generate Encounter',
      copyButton: 'Copy',
      copiedToast: 'Encounter copied to clipboard',
      distributionTitle: 'Outcome Probability Split',
      presetsLabel: 'Presets',
      presets: {
        balanced: 'Balanced (33 / 34 / 33)',
        safe: 'Patrolled Road (50 / 35 / 15)',
        hostile: 'Dangerous Wilds (15 / 35 / 50)',
      },
      resetButton: 'Reset',
      dispositions: {
        good: 'Good',
        neutral: 'Neutral',
        bad: 'Bad',
      },
      rollLabel: 'd100 Roll',
      emptyTitle: 'No encounter generated',
      emptyDescription:
        'Configure the Good / Neutral / Bad probability split and click Generate Encounter.',
      sourcePrefix: 'Source:',
      historyTitle: 'Encounter History',
      historyEmpty: 'No encounters rolled yet.',
      clearHistory: 'Clear',
    },
  },
  fr: {
    tabs: {
      tables: 'Tables aléatoires',
      chest: 'Coffre aléatoire',
      encounter: 'Rencontre modulaire',
    },
    header: {
      groupLabel: 'Monde & Exploration',
      tablesCountLabel: '26 tables disponibles',
    },
    tables: {
      selectLabel: 'Choisir une table',
      filterAll: 'Toutes les catégories',
      groups: {
        locations: 'Lieux & Donjons',
        quests: 'Quêtes & Contrats',
        npcs: 'PNJ & Historiques',
        encounters: 'Voyages & Rencontres',
        merchants: 'Marchands & Butin',
      },
      generateButton: 'Générer',
      rollAgainButton: 'Relancer',
      copyButton: 'Copier',
      copiedToast: 'Résultat copié dans le presse-papiers',
      sourcePrefix: 'Basé sur la création originale de',
      openExternalLink: 'Ouvrir la table de référence',
      externalNotice:
        'Cette table de référence externe est hébergée sur DnD Speak. Ouvrez le lien source ci-dessous pour la consulter directement.',
      emptyTitle: 'Prêt à lancer',
      emptyDescription:
        'Sélectionnez une des 26 tables de MJ ci-dessus et cliquez sur Générer pour obtenir un résultat immédiat.',
      possessionsCountLabel: 'Objets tirés (1d10)',
      possessionsTiers: {
        ordinary: 'Ordinaire',
        strange: 'Étrange',
        occult: 'Occulte',
      },
      historyTitle: 'Historique de session',
      historyEmpty: 'Aucun tirage enregistré pour cette session.',
      clearHistory: 'Effacer',
      showHistory: 'Afficher l’historique',
      hideHistory: 'Masquer l’historique',
    },
    chest: {
      title: 'Générateur de coffre aléatoire',
      description:
        'Générez des couronnes et du butin par catégorie avec des taux de drop personnalisables.',
      generateButton: 'Générer un coffre',
      editRatesButton: 'Modifier les taux',
      copyButton: 'Copier le butin',
      copiedToast: 'Butin copié dans le presse-papiers',
      creditPrefix: 'Basé sur la création originale de',
      creditAuthor: 'Burning (Witcher Loot) & Godzilla',
      emptyTitle: 'Aucun coffre généré',
      emptyDescription:
        'Ajustez les taux de drop si besoin, puis cliquez sur Générer un coffre.',
      crownsLabel: 'Couronnes',
      itemsCountLabel: 'Objets trouvés',
      emptyChestLoot: 'Seules des couronnes se trouvaient dans ce coffre.',
      ratesSummaryTitle: 'Taux de drop actifs',
      dialogTitle: 'Modifier les taux de drop',
      dialogDescription:
        'Personnalisez le maximum de couronnes et les pourcentages de chaque catégorie de butin.',
      presetStandard: 'Standard (193 couronnes)',
      presetBurning: 'Roll20 Burning (300 couronnes)',
      resetDefaults: 'Réinitialiser',
      saveRates: 'Enregistrer',
      cancel: 'Annuler',
      maxCrownLabel: 'Couronnes max',
      rollsSuffix: 'jets',
      historyTitle: 'Historique des coffres',
      historyEmpty: 'Aucun coffre enregistré pour le moment.',
      clearHistory: 'Effacer',
      openInCodexBtn: 'Codex',
      categories: {
        gear: 'Équipement',
        weapon: 'Arme',
        armor: 'Armure',
        diagram: 'Schéma',
        formula: 'Formule',
        alchemy: 'Alchimie',
        glyph: 'Glyphe',
        rune: 'Rune',
        efWeapon: 'Arme des Anciens',
        efArmor: 'Armure des Anciens',
        relic: 'Relique',
      },
    },
    encounter: {
      title: 'Rencontre aléatoire modulaire',
      description:
        'Répartissez la plage de 0 à 100 % entre issues Bonne, Neutre et Mauvaise à l’aide du curseur double.',
      generateButton: 'Générer une rencontre',
      copyButton: 'Copier',
      copiedToast: 'Rencontre copiée dans le presse-papiers',
      distributionTitle: 'Répartition des probabilités',
      presetsLabel: 'Préréglages',
      presets: {
        balanced: 'Équilibré (33 / 34 / 33)',
        safe: 'Route sûre (50 / 35 / 15)',
        hostile: 'Terres hostiles (15 / 35 / 50)',
      },
      resetButton: 'Réinitialiser',
      dispositions: {
        good: 'Bon',
        neutral: 'Neutre',
        bad: 'Mauvais',
      },
      rollLabel: 'Jet d100',
      emptyTitle: 'Aucune rencontre générée',
      emptyDescription:
        'Réglez la répartition Bon / Neutre / Mauvais puis cliquez sur Générer une rencontre.',
      sourcePrefix: 'Source :',
      historyTitle: 'Historique des rencontres',
      historyEmpty: 'Aucune rencontre enregistrée pour le moment.',
      clearHistory: 'Effacer',
    },
  },
};

export function getRandomTablesCopy(lang: ModuleLanguage): RandomTablesLocaleCopy {
  return COPY[lang];
}
