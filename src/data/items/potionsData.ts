import type { PotionCatalogEntry } from './types';

/**
 * Unified Witcher potions, decoctions, blade oils, and alchemical articles (62 entries).
 */
export const POTIONS_DATA: readonly PotionCatalogEntry[] = [
  {
    "id": "pt-swallow",
    "name": {
      "en": "Swallow",
      "fr": "Hirondelle"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+3PS/Round si pas de dégât ce round",
    "duration": "20 rounds",
    "toxicity": "50%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-blizzard",
    "name": {
      "en": "Blizzard",
      "fr": "Blizzard"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+4 en Réflexes après ennemie vaincu",
    "duration": "10 rounds",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-cat",
    "name": {
      "en": "Cat",
      "fr": "Chat"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Voir dans le noir, +2 pour percer illusions",
    "duration": "10 rounds",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-tawny-owl",
    "name": {
      "en": "Tawny Owl",
      "fr": "Chat-huant"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+2 en END lors de récupération",
    "duration": "20 rounds",
    "toxicity": "50%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-maribor-forest",
    "name": {
      "en": "Maribor Forest",
      "fr": "Forêt de Maribor"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Gagne un dès d’adrénaline en plus",
    "duration": "15 rounds",
    "toxicity": "50%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-golden-oriole",
    "name": {
      "en": "Golden Oriole",
      "fr": "Loriot doré"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "immunise au poison",
    "duration": "30mn",
    "toxicity": "50%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-white-honey",
    "name": {
      "en": "White Honey",
      "fr": "Miel blanc"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Annule la toxicité",
    "duration": "-",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-killer-whale",
    "name": {
      "en": "Killer Whale",
      "fr": "Orque"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Respire sous l'eau et se déplace sans malus",
    "duration": "-",
    "toxicity": "25%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-petris-philter",
    "name": {
      "en": "Petri’s Philter",
      "fr": "Philtre de Petri"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+2 en Envoûtement, Incantation et Rituels.",
    "duration": "15 rounds",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-full-moon",
    "name": {
      "en": "Full Moon",
      "fr": "Pleine lune"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+30 PS",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-black-blood",
    "name": {
      "en": "Black Blood",
      "fr": "Sang noir"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Empoissonne son sang contre les vampires",
    "duration": "20 rounds",
    "toxicity": "25%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-thunderbolt",
    "name": {
      "en": "Thunderbolt",
      "fr": "Tonnerre"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "+3 dégats",
    "duration": "15 rounds",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-berserker-brew",
    "name": {
      "en": "Berserker’s Brew",
      "fr": "Breuvage de berserker"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Fait attaquer avec fénésie",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 105,
    "priceDisplay": "105",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-celestine",
    "name": {
      "en": "Celestine",
      "fr": "Célestine"
    },
    "type": "Potions",
    "availability": "I",
    "effect": "-2 en vigilance",
    "duration": "2D10 mn",
    "toxicity": "0%",
    "price": 60,
    "priceDisplay": "60",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-summer-salve",
    "name": {
      "en": "Summer Salve",
      "fr": "Onguent estival"
    },
    "type": "Potions",
    "availability": "C",
    "effect": "Apaise les froid glacial et chaleurs extrêmes.",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 20,
    "priceDisplay": "20",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-cadaverine-solution",
    "name": {
      "en": "Cadaverine Solution",
      "fr": "Solution de cadavérine"
    },
    "type": "Potions",
    "availability": "I",
    "effect": "Empoisonnement et Nausée",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 75,
    "priceDisplay": "75",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-vitality-potion",
    "name": {
      "en": "Vitality Potion",
      "fr": "Potion de Vitalité"
    },
    "type": "Potions",
    "availability": "P",
    "effect": "Ignore les blessures",
    "duration": "2D6 rounds",
    "toxicity": "50%",
    "price": 85,
    "priceDisplay": "85",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-stamina-potion",
    "name": {
      "en": "Stamina Potion",
      "fr": "Potion d’Endurance"
    },
    "type": "Potions",
    "availability": "P",
    "effect": "Redonne 3D6 d'endurance",
    "duration": "30mn",
    "toxicity": "50%",
    "price": 75,
    "priceDisplay": "75",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-white-raffards",
    "name": {
      "en": "White Raffard’s Decoction",
      "fr": "Décoction de Raffard le Blanc"
    },
    "type": "Potions",
    "availability": "R",
    "effect": "Redonne 1PS par round",
    "duration": "4D6 Rounds",
    "toxicity": "50%",
    "price": 95,
    "priceDisplay": "95",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "pt-arachas-dec",
    "name": {
      "en": "Arachas Decoction",
      "fr": "Décoction d’Arachas"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "+2 PA pour chaque tranche de 10 ENC libre",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-fiend-dec",
    "name": {
      "en": "Fiend Decoction",
      "fr": "Décoction de Fiellon"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "Votre ENC est doublé",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-griffin-dec",
    "name": {
      "en": "Griffin Decoction",
      "fr": "Décoction de Griffon"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "+2 PA tous les 5 dégâts subit",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-grave-hag-dec",
    "name": {
      "en": "Grave Hag Decoction",
      "fr": "Décoction de Guenaude sépulcrale"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "Régénéré 2PS pour chaque tué.",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-katakan-dec",
    "name": {
      "en": "Katakan Decoction",
      "fr": "Décoction de Katakan"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "+3 pour localiser une blessure critique",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-werewolf-dec",
    "name": {
      "en": "Werewolf Decoction",
      "fr": "Décoction de Loup-garou"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "Courir ne dépense pas d'END",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-nekker-dec",
    "name": {
      "en": "Nekker Decoction",
      "fr": "Décoction de Nekker"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "Monture ne panic pas, +3 Athlétisme, +3 Equitation",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-noonwraith-dec",
    "name": {
      "en": "Noonwraith Decoction",
      "fr": "Décoction de Spectre de midi"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "Immunisé à l'étourdissement et l'aveuglement. Ne peut pas être projeté.",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-troll-dec",
    "name": {
      "en": "Troll Decoction",
      "fr": "Décoction de Troll"
    },
    "type": "Decoctions",
    "availability": "C",
    "effect": "Régénérez 5 PS par round",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-wyvern-dec",
    "name": {
      "en": "Wyvern Decoction",
      "fr": "Décoction de Wyvern"
    },
    "type": "Decoctions",
    "availability": "R",
    "effect": "+1 dégât cumulatif après chaque attaque physique réussite jusqu'au prochain dégât.",
    "duration": "30mn",
    "toxicity": "75%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-draconid-oil",
    "name": {
      "en": "Draconid Oil",
      "fr": "Huile contre les draconides"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les draconides",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-beast-oil",
    "name": {
      "en": "Beast Oil",
      "fr": "Huile contre les bêtes"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les bêtes",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-cursed-oil",
    "name": {
      "en": "Cursed Oil",
      "fr": "Huile contre les créatures maudites"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les créatures maudites",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-elementa-oil",
    "name": {
      "en": "Elementa Oil",
      "fr": "Huile contre les élémentaires"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "5 dégâts contre les élémentaires",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-hybrid-oil",
    "name": {
      "en": "Hybrid Oil",
      "fr": "Huile contre les hybrides"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les hybrides",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-insectoid-oil",
    "name": {
      "en": "Insectoid Oil",
      "fr": "Huile contre les insectoïdes"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les insectoïdes",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-necrophage-oil",
    "name": {
      "en": "Necrophage Oil",
      "fr": "Huile contre les nécrophages"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les nécrophages",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-ogroid-oil",
    "name": {
      "en": "Ogroid Oil",
      "fr": "Huile contre les ogroïdes"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les ogroïdes",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-specter-oil",
    "name": {
      "en": "Specter Oil",
      "fr": "Huile contre les spectres"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les spectres",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-vampire-oil",
    "name": {
      "en": "Vampire Oil",
      "fr": "Huile contre les vampires"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les vampires",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-relict-oil",
    "name": {
      "en": "Relict Oil",
      "fr": "Huile contre les vestiges"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les vestiges",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "pt-hanged-mans-venom",
    "name": {
      "en": "Hanged Man’s Venom",
      "fr": "Venin du pendu"
    },
    "type": "Huiles",
    "availability": "R",
    "effect": "+5 dégâts contre les humanoïdes",
    "duration": "30mn",
    "toxicity": "0%",
    "price": 0,
    "priceDisplay": "0",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "al-fisstech",
    "name": {
      "en": "Fisstech",
      "fr": "Fisstech"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Plonge dans un état euphorique, proche de la transe.",
    "duration": "",
    "toxicity": "0%",
    "price": 80,
    "priceDisplay": "80",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-black-venom",
    "name": {
      "en": "Black Venom",
      "fr": "Venin noir"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Empoisonne immédiatement la cible.",
    "duration": "",
    "toxicity": "0%",
    "price": 45,
    "priceDisplay": "45",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-poisoners-friend",
    "name": {
      "en": "Poisoner’s Friend",
      "fr": "Liquide de l’empoisonneur"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Augmente le SD pour détecter le poison à 20",
    "duration": "",
    "toxicity": "0%",
    "price": 16,
    "priceDisplay": "16",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-alchemical-adhesive",
    "name": {
      "en": "Alchemical Adhesive",
      "fr": "Adhésif alchimique"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Peut coller des objets ou personnes",
    "duration": "",
    "toxicity": "0%",
    "price": 28,
    "priceDisplay": "28",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-chloroform",
    "name": {
      "en": "Chloroform",
      "fr": "Chloroforme"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Fait tomber inconscient",
    "duration": "",
    "toxicity": "0%",
    "price": 36,
    "priceDisplay": "36",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-pantagran-elixir",
    "name": {
      "en": "Pantagran’s Elixir",
      "fr": "Élixir de Pantagran"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Provoque une joie délirante",
    "duration": "",
    "toxicity": "0%",
    "price": 67,
    "priceDisplay": "67",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-invisible-ink",
    "name": {
      "en": "Invisible Ink",
      "fr": "Encre invisible"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Encre qui ne se voit qu'à une source de chaleur.",
    "duration": "",
    "toxicity": "0%",
    "price": 15,
    "priceDisplay": "15",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-quick-fire",
    "name": {
      "en": "Quick Fire",
      "fr": "Feu rapide"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Rend la cible très inflammable",
    "duration": "",
    "toxicity": "0%",
    "price": 45,
    "priceDisplay": "45",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-zerrikanian-fire",
    "name": {
      "en": "Zerrikanian Fire",
      "fr": "Feu zerrikanien"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Le feu zerrikanien met le feu à tout ce qu’il touche",
    "duration": "",
    "toxicity": "0%",
    "price": 65,
    "priceDisplay": "65",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-sterilizing-fluid",
    "name": {
      "en": "Sterilizing Fluid",
      "fr": "Fluide stérilisant"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Augmente sa guérison naturelle de 2 points et divise par 2 le nombre de jours de récupération",
    "duration": "",
    "toxicity": "0%",
    "price": 22,
    "priceDisplay": "22",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-bredans-fury",
    "name": {
      "en": "Bredan’s Fury",
      "fr": "Fureur de Bredan"
    },
    "type": "Articles",
    "availability": "R",
    "effect": "Explose au contact de l’air, infligeant 2d6 points de dégâts à l’ensemble du corps",
    "duration": "",
    "toxicity": "0%",
    "price": 95,
    "priceDisplay": "95",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-hallucinogen",
    "name": {
      "en": "Hallucinogen",
      "fr": "Hallucinogène"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Provoque des hallucinations",
    "duration": "",
    "toxicity": "0%",
    "price": 25,
    "priceDisplay": "25",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-numbing-herbs",
    "name": {
      "en": "Numbing Herbs",
      "fr": "Herbes engourdissantes"
    },
    "type": "Articles",
    "availability": "P",
    "effect": "Soulagent la douleur et divisent par 2 les effets négatifs des blessures critiques",
    "duration": "",
    "toxicity": "0%",
    "price": 12,
    "priceDisplay": "12",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-talgars-tears",
    "name": {
      "en": "Talgar’s Tears",
      "fr": "Larmes de Talgar"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Gèle immédiatement la cible",
    "duration": "",
    "toxicity": "0%",
    "price": 79,
    "priceDisplay": "79",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-wives-tears",
    "name": {
      "en": "Wives’ Tears Potion",
      "fr": "Potion de larmes d’épouse"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Annule les effets d'une intoxication ou dessoûle.",
    "duration": "",
    "toxicity": "0%",
    "price": 56,
    "priceDisplay": "56",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-perfume-potion",
    "name": {
      "en": "Perfume Potion",
      "fr": "Potion parfumée"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Provoque une intoxication pendant 1d10 heures",
    "duration": "",
    "toxicity": "0%",
    "price": 76,
    "priceDisplay": "76",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-clotting-powder",
    "name": {
      "en": "Clotting Powder",
      "fr": "Poudre de coagulation"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Permet d’arrêter l’effet de saignement pendant 2d10 rounds",
    "duration": "",
    "toxicity": "0%",
    "price": 20,
    "priceDisplay": "20",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-smelling-salts",
    "name": {
      "en": "Smelling Salts",
      "fr": "Sels de pâmoison"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Fait sortir immédiatement de l'état d'étourdissement.",
    "duration": "",
    "toxicity": "0%",
    "price": 25,
    "priceDisplay": "25",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-acid-solution",
    "name": {
      "en": "Acid Solution",
      "fr": "Solution acide"
    },
    "type": "Articles",
    "availability": "I",
    "effect": "Inflige 2D6 dégâts aux créature sur qui elle est lancée et 1D6/2 points de dégâts d’ablation aux armes et armures",
    "duration": "",
    "toxicity": "0%",
    "price": 56,
    "priceDisplay": "56",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-succubus-breath",
    "name": {
      "en": "Succubus’ Breath",
      "fr": "Souffle du succube"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Aide à la séduction",
    "duration": "",
    "toxicity": "0%",
    "price": 20,
    "priceDisplay": "20",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "al-addas-tomb",
    "name": {
      "en": "Adda’s Tomb",
      "fr": "Tombe d’Adda"
    },
    "type": "Articles",
    "availability": "C",
    "effect": "Retarde le pourrissement de la nourriture",
    "duration": "",
    "toxicity": "0%",
    "price": 18,
    "priceDisplay": "18",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "pt-elx-anabolic-steroids",
    "name": {
      "en": "Anabolic Steroids",
      "fr": "Stéroïdes anabolisants"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "+10 PV maximum, +2 en Endurance et en Physique pendant 10 minutes ; rend extrêmement agressif pendant 1 heure.",
    "duration": "10mn / 1h",
    "toxicity": "50%",
    "price": 165,
    "priceDisplay": "165",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-last-hope",
    "name": {
      "en": "Last Hope",
      "fr": "Dernier Espoir"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Traite immédiatement 1 blessure critique, mais celle-ci ne guérit définitivement qu’après un jet de Mains thérapeutiques SD 24 pour la rouvrir et la traiter.",
    "duration": "Instantané",
    "toxicity": "75%",
    "price": 200,
    "priceDisplay": "200",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-lightning",
    "name": {
      "en": "Lightning",
      "fr": "Éclair"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Confère +3 aux dégâts lors de votre prochaine attaque physique.",
    "duration": "1 attaque",
    "toxicity": "75%",
    "price": 75,
    "priceDisplay": "75",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-mongoose",
    "name": {
      "en": "Mongoose",
      "fr": "Mangouste"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Rend le buveur immunisé à l’état Empoisonné pendant 30 minutes.",
    "duration": "30mn",
    "toxicity": "50%",
    "price": 50,
    "priceDisplay": "50",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-strider",
    "name": {
      "en": "Strider",
      "fr": "Arpenteur"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Supprime le besoin de dormir pendant une période de 24 heures.",
    "duration": "24h",
    "toxicity": "50%",
    "price": 64,
    "priceDisplay": "64",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-tempest",
    "name": {
      "en": "Tempest",
      "fr": "Tempête"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Augmente de +10 % les chances d’infliger Feu, Gel ou À terre lors d’une attaque ou d’un sort.",
    "duration": "Scène",
    "toxicity": "50%",
    "price": 52,
    "priceDisplay": "52",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "pt-elx-cerebral",
    "name": {
      "en": "Cerebral Elixir",
      "fr": "Élixir cérébral"
    },
    "type": "Elixirs",
    "availability": "R",
    "effect": "Empêche d’être possédé par un Bes pendant 24 heures ; bu en cours de possession, expulse immédiatement le Bes.",
    "duration": "24h",
    "toxicity": "0%",
    "price": 1332,
    "priceDisplay": "1332",
    "race": "Humain",
    "source": "Tome of Chaos"
  }
];
