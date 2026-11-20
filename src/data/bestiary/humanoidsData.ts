import type { BestiaryEntry } from './types';

/**
 * Complete canonical registry of Humanoid encounters with full Witcher TRPG combat stats (23 entries).
 */
export const HUMANOIDS_DATA: readonly BestiaryEntry[] = [
  {
    "id": "human-scoia-tael-archers",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Scoia’tael Archers",
      "fr": "Archers Scoia’tael"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "20 crowns",
      "fr": "20 couronnes"
    },
    "armor": {
      "en": "5",
      "fr": "5"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "forests",
      "urban"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Commandos of 3 to 15 individuals",
      "fr": "Commandos de 3 à 15 individus"
    },
    "notes": {
      "en": [
        "Scoia’tael archers begin by firing standard arrows to drop targets quickly. They save their elven burrowing arrows for hated foes and fleeing enemies they will have to track down after the fight."
      ],
      "fr": [
        "Les archers Scoia’tael commencent d’abord par décocher des flèches normales pour tenter de tuer toutes leurs cibles rapidement. Ils réservent leurs fouisseuses elfes pour les ennemis qu’ils abhorrent de tout leur cœur et les fuyards qu’ils devront traquer après la bataille."
      ]
    },
    "source": "official",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "7",
        "COR": "5",
        "VIT": "7",
        "EMP": "3",
        "TECH": "4",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "21",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "10",
        "Vigilance": "9",
        "Bagarre": "4",
        "Escrime": "6",
        "Esquive/Évasion": "7",
        "Lames courtes": "6",
        "Archerie": "8",
        "Athlétisme": "7",
        "Furtivité": "8",
        "Résilience": "7",
        "Courage": "6",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Fauchon de chasseur",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Dague",
          "damage": "1d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Couteaux de lancer",
          "damage": "1d6",
          "effect": "POR: 20 m",
          "attacksPerTurn": "1"
        },
        {
          "name": "Arc long",
          "damage": "4d6",
          "effect": "POR: 200 m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Capuche à tissage renforcé",
        "Couronnes (1d10)",
        "Flèches (30)",
        "Fouisseuses elfes (10)",
        "Gambison aedirnien",
        "Objets communs (1d6)",
        "Pantalon matelassé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Spécialistes de l’embuscade"
      ]
    }
  },
  {
    "id": "human-bandits",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Bandits",
      "fr": "Bandits"
    },
    "threat": {
      "en": "Low Simple",
      "fr": "Faible Simple"
    },
    "reward": {
      "en": "10 crowns",
      "fr": "10 couronnes"
    },
    "armor": {
      "en": "5",
      "fr": "5"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "roads"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Gangs of 3 to 15 individuals",
      "fr": "Bandes de 3 à 15 individus"
    },
    "notes": {
      "en": [
        "Bandit skill levels vary wildly. This profile represents a basic thug—the sort guarding a criminal warehouse or ambushing travelers along the roads. Adjust stats freely: drop REF and DEX to 3 and HP to 15 for ordinary peasants or petty crooks, or raise REF/DEX to 7–8 and HP to 35 (with better gear) for hardened roadcutters."
      ],
      "fr": [
        "Le niveau de compétences des bandits est extrêmement variable. Le profil présenté ici est celui d’un voyou de base, le genre de gros bras qui surveille l’entrepôt d’un criminel ou tend des embuscades aux voyageurs sur les routes. Pour représenter un paysan ordinaire ou un scélérat de bas étage, diminuez ses RÉF et sa DEX à 3, et ses PS à 15. Pour des voyous endurcis, augmentez leur RÉF et DEX à 7 ou 8, leurs PS à 35 et améliorez leur équipement."
      ]
    },
    "source": "official",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "6",
        "DEX": "5",
        "COR": "5",
        "VIT": "4",
        "EMP": "3",
        "TECH": "4",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "12",
        "SAUT": "2",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Survie": "5",
        "Vigilance": "6",
        "Bagarre": "6",
        "Escrime": "6",
        "Esquive/Évasion": "4",
        "Lames courtes": "5",
        "Arbalète": "4",
        "Athlétisme": "4",
        "Furtivité": "3",
        "Résilience": "5",
        "Courage": "7",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Épée longue de fer",
          "damage": "2d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Dague",
          "damage": "1d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Arbalète de main",
          "damage": "2d6+2",
          "effect": "POR:50m Rechargement lent",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Capuche à tissage renforcé",
        "Carreaux (20)",
        "Couronnes (3d10)",
        "Gambison aedirnien",
        "Objets communs (1d6)",
        "Pantalon matelassé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Aucune"
      ]
    }
  },
  {
    "id": "human-mages",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Mages",
      "fr": "Mages"
    },
    "threat": {
      "en": "Medium Simple",
      "fr": "Moyen Simple"
    },
    "reward": {
      "en": "100 crowns",
      "fr": "100 couronnes"
    },
    "armor": {
      "en": "0",
      "fr": "0"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "ruins"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Usually solitary",
      "fr": "Généralement solitaire"
    },
    "notes": {
      "en": [
        "Standard mage spell lists are only an example of how sorcerers handle player characters. Customize any mage with alternative spells, rituals, and hexes from the Magic chapter (Corebook, p. 99)."
      ],
      "fr": [
        "Les pouvoirs magiques présentés ci-dessus sont un exemple de ce que les mages peuvent utiliser pour s’en sortir face aux personnages joueurs. Vous pouvez personnaliser votre sorcier en le dotant de sorts, de rituels et d’envoûtements alternatifs décrits dans la section sur la magie (Livre de base, p. 99)."
      ]
    },
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "7",
        "DEX": "6",
        "COR": "5",
        "VIT": "5",
        "EMP": "4",
        "TECH": "5",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "15",
        "SAUT": "3",
        "END": "30",
        "ENC": "50",
        "RÉC": "7",
        "PS": "30",
        "VIG": "10"
      },
      "skills": {
        "Survie": "5",
        "Vigilance": "7",
        "Bâton/Lance": "6",
        "Esquive/Évasion": "8",
        "Athlétisme": "5",
        "Furtivité": "5",
        "Résilience": "5",
        "Courage": "6",
        "Envoûtement": "6",
        "Incantation": "7",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "7",
        "Rituels": "5"
      },
      "weapons": [
        {
          "name": "Bâton de fer",
          "damage": "3d6",
          "effect": "Focus (2)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Dague",
          "damage": "1d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Cinquième essence (1d6/2)",
        "Couronnes (5d10)",
        "Ensemble d’alchimie",
        "Objets communs (1d6)",
        "Objets étranges (1d6/2)",
        "Souffle de succube"
      ],
      "vulnerabilities": [
        "Venin du pendu",
        "Dimeritium"
      ],
      "abilities": [
        "Un mage peut utiliser ces sorts: Aenye, Glamour, Poussière aveuglante, Rhewi, Téléportation",
        "Un mage peut lancer ces rituels: Jarre ensorcelée, Rituel de magie",
        "Un mage peut infliger ces envoûtements: Démangeaison éternelle, Envoûtement des Ombres"
      ]
    }
  },
  {
    "id": "human-berserkir",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Berserkir",
      "fr": "Berserkir"
    },
    "threat": {
      "en": "Medium Hard",
      "fr": "Moyen Fort"
    },
    "reward": {
      "en": "300 crowns",
      "fr": "300 couronnes"
    },
    "armor": {
      "en": "15",
      "fr": "15"
    },
    "size": {
      "en": "At least 2 m tall",
      "fr": "Au moins 2 m de hauteur"
    },
    "weight": {
      "en": "At least 200 kg",
      "fr": "Au moins 200 kg"
    },
    "environments": [
      "skellige",
      "mountains"
    ],
    "intelligence": {
      "en": "Furious, combative, feral",
      "fr": "Fureur, combatif, animal"
    },
    "organization": {
      "en": "Solitary or in small packs",
      "fr": "Solitaire ou en petite meute"
    },
    "notes": {
      "en": [],
      "fr": []
    },
    "source": "site",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "8",
        "DEX": "5",
        "COR": "8",
        "VIT": "5",
        "EMP": "2",
        "TECH": "3",
        "VOL": "5",
        "CHA": "1",
        "ÉTOU": "8",
        "COU": "100",
        "SAUT": "1.5",
        "END": "30",
        "ENC": "80",
        "RÉC": "5",
        "PS": "70",
        "VIG": "1"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "5",
        "Bagarre": "9",
        "Courage": "6",
        "Résilience": "7",
        "Mêlée": "7",
        "Résistance à la contrainte": "6",
        "Survie": "8",
        "Adresse": "3",
        "Physique": "7",
        "Intimidation": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Entourdissement(50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6+1",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Peau d'ours (1d3)",
        "Crocs d'ours (1d6)",
        "Os de bêtes (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes",
        "Druides et manipulations bestiales (-7 Rés.Magique)",
        "Vulnérable au feu",
        "Etourdissement ou enchantements: 75% de se détransformer"
      ],
      "abilities": [
        "Corps puissant",
        "Force bestiale",
        "Homme-arme",
        "Résistance (C,P)",
        "Mi-homme-ours-homme"
      ]
    }
  },
  {
    "id": "human-svinfylkingar",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Svinfylkingar",
      "fr": "Svinfylkingar"
    },
    "threat": {
      "en": "Medium Hard",
      "fr": "Moyen Fort"
    },
    "reward": {
      "en": "200 crowns",
      "fr": "200 couronnes"
    },
    "armor": {
      "en": "20",
      "fr": "20"
    },
    "size": {
      "en": "At least 2 m tall",
      "fr": "Au moins 2 m de hauteur"
    },
    "weight": {
      "en": "At least 200 kg",
      "fr": "Au moins 200 kg"
    },
    "environments": [
      "skellige",
      "mountains"
    ],
    "intelligence": {
      "en": "Furious, combative, feral",
      "fr": "Fureur, combatif, animal"
    },
    "organization": {
      "en": "Solitary or in small packs",
      "fr": "Solitaire ou en petite meute"
    },
    "notes": {
      "en": [],
      "fr": []
    },
    "source": "site",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "7",
        "COR": "9",
        "VIT": "6",
        "EMP": "3",
        "TECH": "2",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "100",
        "SAUT": "1.5",
        "END": "35",
        "ENC": "100",
        "RÉC": "5",
        "PS": "80",
        "VIG": "1"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "3",
        "Bagarre": "7",
        "Courage": "4",
        "Résilience": "7",
        "Commandement": "2",
        "Résistance à la contrainte": "8",
        "Survie": "6",
        "Adresse": "5",
        "Physique": "8",
        "Intimidation": "5",
        "Charisme": "6"
      },
      "weapons": [
        {
          "name": "Défenses",
          "damage": "6d6",
          "effect": "Perforation(50%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Piétinement",
          "damage": "2d10",
          "effect": "Etourdissement(25%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Peau de sanglier (1d3)",
        "Défenses géantes (1d6)",
        "Os de bêtes (2d6)",
        "Viande crue (4d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes",
        "Druides et manipulations bestiales (-7 Rés.Magique)",
        "Vulnérable au feu",
        "Etourdissement ou enchantements: 75% de se détransformer",
        "Folie Bestiale"
      ],
      "abilities": [
        "Furie",
        "Charge",
        "Mule / Carapaçonner",
        "Désordre rebondissant",
        "Mi-homme-sanglier-homme"
      ]
    }
  },
  {
    "id": "human-ulfhednar",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Ulfhednar",
      "fr": "Ulfhednar"
    },
    "threat": {
      "en": "Medium Hard",
      "fr": "Moyen Fort"
    },
    "reward": {
      "en": "200 crowns",
      "fr": "200 couronnes"
    },
    "armor": {
      "en": "10",
      "fr": "10"
    },
    "size": {
      "en": "Around 1.5 m tall",
      "fr": "Environ 1,5 m de hauteur"
    },
    "weight": {
      "en": "At least 100 kg",
      "fr": "Au moins 100 kg"
    },
    "environments": [
      "skellige",
      "mountains"
    ],
    "intelligence": {
      "en": "Furious, combative, feral",
      "fr": "Fureur, combatif, animal"
    },
    "organization": {
      "en": "Solitary or in small packs",
      "fr": "Solitaire ou en petite meute"
    },
    "notes": {
      "en": [],
      "fr": []
    },
    "source": "site",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "7",
        "DEX": "8",
        "COR": "6",
        "VIT": "8",
        "EMP": "3",
        "TECH": "3",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "100",
        "SAUT": "2",
        "END": "45",
        "ENC": "80",
        "RÉC": "5",
        "PS": "60",
        "VIG": "1"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "10",
        "Bagarre": "7",
        "Courage": "6",
        "Mêlée": "5",
        "Résistance à la contrainte": "5",
        "Survie": "9",
        "Adresse": "8",
        "Intimidation": "8",
        "Esquive/Évasion": "7",
        "Furtivité": "9",
        "Commandement": "2"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Peau de loup (1d3)",
        "Salive de loup (1d3)",
        "Suif de chien (2d6)",
        "Os de bêtes (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes",
        "Druides et manipulations bestiales (-7 Rés.Magique)",
        "Vulnérable au feu",
        "Etourdissement ou enchantements: 75% de se détransformer"
      ],
      "abilities": [
        "Traque olfactive",
        "Bond de prédateur",
        "Soif de sang",
        "Nyctalopie",
        "Mi-homme-loup-homme"
      ]
    }
  },
  {
    "id": "human-bandit-leader",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Bandit Leader",
      "fr": "Chef bandit"
    },
    "threat": {
      "en": "Simple Complex",
      "fr": "Simple Complexe"
    },
    "reward": {
      "en": "40 crowns",
      "fr": "40 couronnes"
    },
    "armor": {
      "en": "Head: 8, Torso: 12, Legs: 12",
      "fr": "Tête : 8, Torse : 12, Jambes : 12"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "roads"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Gangs of 3 to 15 individuals",
      "fr": "Bandes de 3 à 15 individus"
    },
    "notes": {
      "en": [
        "Like standard bandits, bandit leaders scale easily—lower stats for petty village thugs or raise REF/DEX to 7–8 and HP to 35 with upgraded weapons and armor for dangerous highway captains."
      ],
      "fr": [
        "Le niveau de compétences des bandits est extrêmement variable. Pour représenter un chef de bas étage, diminuez ses RÉF et DEX à 3 et ses PS à 15 ; pour des bandits endurcis, augmentez RÉF/DEX à 7 ou 8, PS à 35 et améliorez compétences et équipement."
      ]
    },
    "source": "site",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "7",
        "DEX": "7",
        "COR": "5",
        "VIT": "4",
        "EMP": "3",
        "TECH": "5",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "12",
        "SAUT": "2",
        "END": "35",
        "ENC": "50",
        "RÉC": "4",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "10",
        "Bagarre": "7",
        "Escrime": "12",
        "Esquive/Évasion": "11",
        "Bâton/Lance": "9",
        "Arbalète": "11",
        "Athlétisme": "7",
        "Furtivité": "12",
        "Résilience": "13",
        "Courage": "13",
        "Résistance à la contrainte": "11",
        "Résistance à la magie": "10"
      },
      "weapons": [
        {
          "name": "Épée longue de fer",
          "damage": "2d6+4",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lance",
          "damage": "3d6",
          "effect": "Portée 2m",
          "attacksPerTurn": "1"
        },
        {
          "name": "Arbalète",
          "damage": "3d6",
          "effect": "POR:50m Rechargement lent",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Capuche à tissage renforcé",
        "Carreaux (20)",
        "Couronnes (3d10)",
        "Gambison aedirnien",
        "Objets communs (1d6)",
        "Pantalon matelassé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Humain"
      ]
    }
  },
  {
    "id": "human-bandit-lieutenant",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Bandit Underboss",
      "fr": "Sous-chef bandit"
    },
    "threat": {
      "en": "Simple Medium",
      "fr": "Simple Moyen"
    },
    "reward": {
      "en": "15 crowns",
      "fr": "15 couronnes"
    },
    "armor": {
      "en": "Head: 0, Torso: 14, Legs: 14",
      "fr": "Tête : 0, Torse : 14, Jambes : 14"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "roads"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Gangs of 3 to 15 individuals",
      "fr": "Bandes de 3 à 15 individus"
    },
    "notes": {
      "en": [
        "Bandit skill levels vary significantly. Adjust combat stats, HP, skills, and gear up or down to represent anything from petty gang enforcers to seasoned outlaws."
      ],
      "fr": [
        "Le niveau de compétences des bandits est extrêmement variable. Vous pouvez modifier leurs caractéristiques, leurs PS, leurs compétences et leurs équipements à la hausse ou à la baisse selon la menace souhaitée."
      ]
    },
    "source": "site",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "7",
        "COR": "5",
        "VIT": "4",
        "EMP": "3",
        "TECH": "5",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "12",
        "SAUT": "2",
        "END": "30",
        "ENC": "50",
        "RÉC": "4",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "12",
        "Bagarre": "8",
        "Escrime": "12",
        "Esquive/Évasion": "10",
        "Bâton/Lance": "9",
        "Arbalète": "11",
        "Athlétisme": "7",
        "Furtivité": "8",
        "Résilience": "12",
        "Courage": "11",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Épée longue de fer",
          "damage": "2d6+4",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lance",
          "damage": "3d6",
          "effect": "Portée 2m",
          "attacksPerTurn": "1"
        },
        {
          "name": "Arbalète",
          "damage": "3d6",
          "effect": "POR:50m Rechargement lent",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Carreaux (15)",
        "Couronnes (2d10)",
        "Armure de Hallebardiers",
        "Objets communs (1d6)",
        "Jambière Rédaniennes"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Humain"
      ]
    }
  },
  {
    "id": "human-recruits",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Recruits",
      "fr": "Recrues"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "30 crowns",
      "fr": "30 couronnes"
    },
    "armor": {
      "en": "Head: 8, Torso: 14, Legs: 12",
      "fr": "Tête : 8, Torse : 14, Jambes : 12"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Recruits can hail from any nation; customize equipment, stats, and abilities freely. Like bandits, they can be scaled up with better gear or higher HP.",
        "Recruits are often conscripted penal units. Unless given direct orders, they rarely fight to the death—most military deserters come from recruit companies."
      ],
      "fr": [
        "Les recrues peuvent venir de n’importe quelle nation ; le MJ peut redéfinir leurs équipements, statistiques et capacités à sa guise, ou améliorer leur armure et leurs armes.",
        "Les recrues seront parfois des unités criminelles. Sauf ordre direct, ils ne se battent généralement pas jusqu’à la mort. La plupart des déserteurs des différentes armées sont issus d’unités de recrues."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "6",
        "COR": "6",
        "VIT": "5",
        "EMP": "3",
        "TECH": "2",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "15",
        "SAUT": "3",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "6",
        "Athlétisme": "6",
        "Vigilance": "4",
        "Bagarre": "6",
        "Courage": "4",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Résistance à la contrainte": "4",
        "Résistance à la magie": "4",
        "Bâton / Lance": "7",
        "Furtivité": "3",
        "Escrime": "3",
        "Tactique": "3",
        "Survie": "3"
      },
      "weapons": [
        {
          "name": "Arc court",
          "damage": "3d6+3",
          "effect": "Portée: 100m Saignement(100%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Epée",
          "damage": "2d6+4",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lance",
          "damage": "3d6",
          "effect": "Longue portée",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (1d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Camail",
        "Brigandine",
        "Pantalon renforcé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Pauvre infanterie de merde"
      ]
    }
  },
  {
    "id": "human-highwaymen",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Highwaymen",
      "fr": "Bandits de grand chemin"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "40 crowns",
      "fr": "40 couronnes"
    },
    "armor": {
      "en": "Head: 8, Torso: 12, Legs: 12",
      "fr": "Tête : 8, Torse : 12, Jambes : 12"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "roads"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Highwaymen favor ambush tactics—luring targets into allies or laying traps along roads (Corebook, p. 55). They may travel mounted with saddlebags (+1 Control), cavalry saddle, and leather barding (10 SP).",
        "Horse: Athletics +11 | Control Mod +2 | SPD 12 | HP 40 | Weight 100"
      ],
      "fr": [
        "Les bandits de grand chemin ont souvent recours à des tactiques d’embuscade, en attirant des cibles vers des alliés ou en posant des pièges le long de la route (Livre de base, p. 55). S’ils se déplacent à cheval, ils disposent de sacoches (+1 Contrôle), d’une selle de cavalerie et de bardes de cuir (10 PA).",
        "Cheval : Athlétisme +11 | Mod. de contrôle +2 | Vitesse 12 | PS 40 | Poids 100"
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "7",
        "COR": "6",
        "VIT": "5",
        "EMP": "6",
        "TECH": "4",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "15",
        "SAUT": "3",
        "END": "30",
        "ENC": "60",
        "RÉC": "5",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "5",
        "Athlétisme": "5",
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "7",
        "Esquive/Évasion": "5",
        "Résilience": "5",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4",
        "Equitation": "5",
        "Lames courtes": "5",
        "Bâton / Lance": "7",
        "Furtivité": "5",
        "Escrime": "7",
        "Tactique": "4",
        "Fabrication de pièges": "6",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Arc long",
          "damage": "4d6",
          "effect": "100m de portée",
          "attacksPerTurn": "1"
        },
        {
          "name": "Dague",
          "damage": "1d6+2",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Epée",
          "damage": "2d6+4",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lance",
          "damage": "3d6",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche à tissage renforcé",
        "Brigandine",
        "Pantalon renforcé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Délit de fuite"
      ]
    }
  },
  {
    "id": "human-mercenaries",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Mercenaries",
      "fr": "Mercenaires"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "35 crowns",
      "fr": "35 couronnes"
    },
    "armor": {
      "en": "Head: 5, Torso: 14, Legs: 12",
      "fr": "Tête : 5, Torse : 14, Jambes : 12"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Horse: Athletics +11 | Control Mod +2 | SPD 12 | HP 40 | Weight 100",
        "Mercenaries work solo or in large independent companies hired across the Continent. Coin is their primary motive, making bribery an expensive alternative to combat. They may belong to any race or nation and often include cavalry."
      ],
      "fr": [
        "Cheval : Athlétisme +11 | Mod. de contrôle +2 | Vitesse 12 | PS 40 | Poids 100",
        "Les mercenaires sont engagés individuellement ou en groupes indépendants importants sur tout le Continent. L’argent est leur principale motivation, rendant la corruption envisageable (bien que coûteuse). Ils peuvent être de toute nation ou race et inclure de la cavalerie."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "7",
        "COR": "6",
        "VIT": "6",
        "EMP": "6",
        "TECH": "4",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "8",
        "Arbalète": "7",
        "Esquive/Évasion": "6",
        "Résilience": "7",
        "Mêlée": "7",
        "Résistance à la contrainte": "3",
        "Résistance à la magie": "4",
        "Equitation": "4",
        "Lames courtes": "5",
        "Furtivité": "5",
        "Escrime": "6",
        "Tactique": "5",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Arbalète",
          "damage": "4d6+2",
          "effect": "Portée 100m",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poignard",
          "damage": "2d6+2",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Epée",
          "damage": "2d6+4",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (3d10)",
        "Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche à tissage renforcé",
        "Brigandine",
        "Pantalon renforcé",
        "Bocle d’acier"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Paranoïa professionnelle"
      ]
    }
  },
  {
    "id": "human-pirates",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Pirates",
      "fr": "Pirates"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "45 crowns",
      "fr": "45 couronnes"
    },
    "armor": {
      "en": "Head: 3, Torso: 5, Legs: 5",
      "fr": "Tête : 3, Torse : 5, Jambes : 5"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Boat (Small Cutter): Athletics — | Control Mod 0 | SPD 10 | HP 60 | Weight 610 (scale up for larger vessels).",
        "Pirates fight strictly for plunder and rarely fight to the death unless cornered. They only engage when circumstances heavily favor them, using every dirty trick available."
      ],
      "fr": [
        "Bateau (Cotre typique) : Athlétisme — | Mod. de contrôle 0 | Vitesse 10 | PS 60 | Poids 610 (à adapter pour un navire plus grand).",
        "Les pirates se battent pour voler et engagent rarement jusqu’à la mort, sauf s’ils sont désespérés. Ils n’attaquent que lorsque la situation penche nettement en leur faveur et usent de tous les coups bas possibles."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "7",
        "COR": "7",
        "VIT": "7",
        "EMP": "6",
        "TECH": "4",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "21",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "7",
        "Vigilance": "6",
        "Bagarre": "8",
        "Courage": "6",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Intimidation": "8",
        "Mêlée": "7",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "4",
        "Lames courtes": "8",
        "Furtivité": "5",
        "Tactique": "6",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Arc court",
          "damage": "3d6+3",
          "effect": "Portée:100m Saignement(100%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poignard",
          "damage": "2d6+3",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hache d’armes",
          "damage": "5d6+1",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (1d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche d’archer",
        "Gambison léger",
        "Pantalon matelassé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Cocktail explosif"
      ]
    }
  },
  {
    "id": "human-nilfgaardian-infantry",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Nilfgaardian Infantry",
      "fr": "Infanterie nilfgaardienne"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "110 crowns",
      "fr": "110 couronnes"
    },
    "armor": {
      "en": "Head: 16, Torso: 20, Legs: 14",
      "fr": "Tête : 16, Torse : 20, Jambes : 14"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Like bandits, infantry can be scaled by raising stats, HP, armor, or weapons.",
        "Infantry forms the backbone of the Black Ones’ armies—loyal, highly disciplined, and well-trained soldiers kept in line through strict supervision and harsh punishments."
      ],
      "fr": [
        "Comme pour les bandits, l’infanterie peut être rendue plus difficile à combattre en améliorant ses statistiques, ses PS, son armure ou ses armes.",
        "L’infanterie est l’épine dorsale des armées des Noirs. Ce sont les soldats les plus communs, généralement loyaux, très disciplinés et bien entraînés grâce à une supervision constante et des punitions sévères."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "7",
        "COR": "7",
        "VIT": "5",
        "EMP": "6",
        "TECH": "4",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "15",
        "SAUT": "3",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "7",
        "Arbalète": "7",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Intimidation": "3",
        "Commandement": "4",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4",
        "Bâton / Lance": "8",
        "Furtivité": "5",
        "Escrime": "8",
        "Tactique": "4",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Arbalète",
          "damage": "4d6+2",
          "effect": "Portée:100m PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Esboda",
          "damage": "5d6+1",
          "effect": "PRE +1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hache de guerre",
          "damage": "4d6+3",
          "effect": "Longue portée (2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Armet",
        "Armure de plates",
        "Jambières de plates",
        "Bouclier d’acier"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Discipline stricte"
      ]
    }
  },
  {
    "id": "human-secret-service-agents",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Secret Service Agents",
      "fr": "Agents des services secrets"
    },
    "threat": {
      "en": "Low Difficult",
      "fr": "Faible Difficile"
    },
    "reward": {
      "en": "250 crowns",
      "fr": "250 couronnes"
    },
    "armor": {
      "en": "Head: 8, Torso: 8, Legs: 8",
      "fr": "Tête : 8, Torse : 8, Jambes : 8"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Usually solitary",
      "fr": "Généralement solitaire"
    },
    "notes": {
      "en": [
        "Agents frequently swap armor and weapons to infiltrate locations or maintain cover identities. Designed as a Nilfgaardian spy, this entry works equally well for an operative of any kingdom."
      ],
      "fr": [
        "Les agents se procurent souvent des armures et des armes différentes pour mieux s’infiltrer ou se créer de fausses identités. Conçu comme un espion de Nilfgaard, ce profil s’adapte facilement à n’importe quel royaume."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "8",
        "DEX": "8",
        "COR": "5",
        "VIT": "7",
        "EMP": "8",
        "TECH": "6",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "6",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "8",
        "Bagarre": "9",
        "Courage": "7",
        "Arbalète": "5",
        "Duperie": "9",
        "Déguisement": "8",
        "Esquive/Évasion": "8",
        "ContRÉFaçon": "6",
        "Intimidation": "7",
        "Mêlée": "7",
        "Persuasion": "7",
        "Crochetage": "9",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "4",
        "Furtivité": "4",
        "Escrime": "3",
        "Tactique": "6",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Arbalète de poing",
          "damage": "2d6+2",
          "effect": "Portée:50m Rechargement lent",
          "attacksPerTurn": "1"
        },
        {
          "name": "Stylet",
          "damage": "1d6",
          "effect": "Dissimulation PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Coup-de-poing",
          "damage": "2d6",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Orion",
          "damage": "1d6",
          "effect": "10m portée",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (5d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche à tissage renforcé",
        "Gambison à tissage renforcé",
        "Pantalon à tissage renforcé",
        "Nécessaire de déguisement",
        "Outils de voleur",
        "Forge portable",
        "Renseignements / Ordres"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Spécialiste de l’espionnage",
        "Additifs alchimiques"
      ]
    }
  },
  {
    "id": "human-gemmeran-pacifier",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Gemmeran Pacifier",
      "fr": "Pacificateur de Gemmera"
    },
    "threat": {
      "en": "Hard Simple",
      "fr": "Fort Simple"
    },
    "reward": {
      "en": "500 crowns",
      "fr": "500 couronnes"
    },
    "armor": {
      "en": "Head: 14, Torso: 16, Legs: 16",
      "fr": "Tête : 14, Torse : 16, Jambes : 16"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups, small units",
      "fr": "En groupes, petites unités"
    },
    "notes": {
      "en": [
        "Pacifiers exist to spread terror and break resistance among newly conquered civilians. Keep harsher atrocities off-screen or toned down as appropriate for your table."
      ],
      "fr": [
        "Les pacificateurs existent pour répandre la terreur afin de soumettre les civils nouvellement conquis. Ces thèmes sensibles peuvent aisément être atténués ou laissés hors champ selon les préférences de la table."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "8",
        "DEX": "6",
        "COR": "8",
        "VIT": "4",
        "EMP": "5",
        "TECH": "2",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "4",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "4",
        "Bagarre": "9",
        "Courage": "9",
        "Esquive/Évasion": "7",
        "Résilience": "8",
        "Etiquette": "7",
        "Intimidation": "8",
        "Commandement": "5",
        "Mêlée": "9",
        "Physique": "7",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "5",
        "Furtivité": "4",
        "Tactique": "3",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Poignard",
          "damage": "2d6+4",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Maillet kaedwenien",
          "damage": "6d6+4",
          "effect": "Météorite Etourdissement(-2)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hachette",
          "damage": "2d6+3",
          "effect": "18m portée",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (4d10)",
        "Objets communs (1d6)",
        "Capuche renforcée",
        "Veste de cuir",
        "Pantalon de cuir"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Pouvoir destructeur"
      ]
    }
  },
  {
    "id": "human-nilfgaardian-knights",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Nilfgaardian Knights",
      "fr": "Chevaliers nilfgaardiens"
    },
    "threat": {
      "en": "Hard Complex",
      "fr": "Fort Complexe"
    },
    "reward": {
      "en": "650 crowns",
      "fr": "650 couronnes"
    },
    "armor": {
      "en": "Head: 30, Torso: 30, Legs: 30",
      "fr": "Tête : 30, Torse : 30, Jambes : 30"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups, small units",
      "fr": "En groupes, petites unités"
    },
    "notes": {
      "en": [
        "Warhorse: Athletics +12 | Control Mod -1 | SPD 11 | HP 50 | Weight 270",
        "Knights almost always fight mounted, equipped with saddlebags, cavalry saddle (+1 Control), blinders (+1 calming mount), and chain barding (15 SP). Stats or gear can be lowered to reduce difficulty."
      ],
      "fr": [
        "Cheval de guerre : Athlétisme +12 | Mod. de contrôle -1 | Vitesse 11 | PS 50 | Poids 270",
        "Les chevaliers se battent presque toujours à cheval. Ils disposent de sacoches, d’une selle de cavalerie (+1 aux jets de Contrôle), d’œillères (+1 pour calmer la monture) et de barde de mailles (15 PA). Le MJ peut réduire leurs statistiques ou leur équipement."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "8",
        "DEX": "7",
        "COR": "7",
        "VIT": "5",
        "EMP": "6",
        "TECH": "3",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "15",
        "SAUT": "3",
        "END": "35",
        "ENC": "70",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Vigilance": "5",
        "Bagarre": "8",
        "Courage": "8",
        "Esquive/Évasion": "7",
        "Résilience": "7",
        "Intimidation": "4",
        "Commandement": "7",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "6",
        "Equitation": "9",
        "Lames courtes": "6",
        "Bâton / Lance": "10",
        "Furtivité": "3",
        "Escrime": "9",
        "Tactique": "6",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Poignard",
          "damage": "2d6+3",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lame vicovarienne",
          "damage": "5d6+5",
          "effect": "Equilibrée",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hache de bataille",
          "damage": "4d6+3",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (4d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Casque nilfgaardien",
        "Armure de plates nilfgaardienne",
        "Jambières nilfgaardiennes"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Choc et effroi"
      ]
    }
  },
  {
    "id": "human-northern-kingdoms-soldiers",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Northern Kingdoms Soldiers",
      "fr": "Soldats des Royaumes du Nord"
    },
    "threat": {
      "en": "Low Complex",
      "fr": "Faible Complexe"
    },
    "reward": {
      "en": "100 crowns",
      "fr": "100 couronnes"
    },
    "armor": {
      "en": "Head: 14, Torso: 14, Legs: 14",
      "fr": "Tête : 14, Torse : 14, Jambes : 14"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Northern soldiers can hail from any realm under the Northern banner. Swap weapons, armor, stats, or HP freely to match a specific kingdom or regiment."
      ],
      "fr": [
        "Les soldats du Nord peuvent provenir de n’importe quel pays rassemblé sous la bannière des Royaumes du Nord. Armes, armures, statistiques et PS peuvent être adaptés à une nation ou unité précise."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "7",
        "COR": "7",
        "VIT": "6",
        "EMP": "5",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "35",
        "ENC": "60",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "7",
        "Athlétisme": "4",
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "6",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Intimidation": "5",
        "Commandement": "4",
        "Mêlée": "7",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "5",
        "Furtivité": "5",
        "Escrime": "6",
        "Tactique": "3",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Arc court",
          "damage": "3d6+3",
          "effect": "100m portée",
          "attacksPerTurn": "1"
        },
        {
          "name": "Krigsverd",
          "damage": "4d6+5",
          "effect": "PRE:+2",
          "attacksPerTurn": "1"
        },
        {
          "name": "Masse d’armes",
          "damage": "5d6+1",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (3d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche renforcée",
        "Armure de hallebardier",
        "Jambières rédaniennes",
        "Bocle d’acier"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Aguerris"
      ]
    }
  },
  {
    "id": "human-kaedweni-cavalry",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Kaedweni Cavalry",
      "fr": "Cavalerie de Kaedwen"
    },
    "threat": {
      "en": "Medium Complex",
      "fr": "Moyen Complexe"
    },
    "reward": {
      "en": "450 crowns",
      "fr": "450 couronnes"
    },
    "armor": {
      "en": "Head: 16, Torso: 16, Legs: 16",
      "fr": "Tête : 16, Torse : 16, Jambes : 16"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups, small units",
      "fr": "En groupes, petites unités"
    },
    "notes": {
      "en": [
        "Horse: Athletics +11 | Control Mod +2 | SPD 12 | HP 40 | Weight 100",
        "Kaedwen’s rugged terrain favors agile mounts over heavy warhorses. Riders almost always fight mounted with saddlebags, cavalry saddle (+1 Control), blinders (+1 calming mount), and leather barding (10 SP)."
      ],
      "fr": [
        "Cheval : Athlétisme +11 | Mod. de contrôle +2 | Vitesse 12 | PS 40 | Poids 100",
        "Le terrain de Kaedwen ne convient pas aux chevaux de guerre ; sa cavalerie déploie donc des montures agiles. Les cavaliers combattent presque toujours à cheval avec sacoches, selle de cavalerie (+1 Contrôle), œillères (+1) et barde de cuir (10 PA)."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "8",
        "DEX": "8",
        "COR": "8",
        "VIT": "4",
        "EMP": "5",
        "TECH": "2",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "2",
        "END": "35",
        "ENC": "80",
        "RÉC": "8",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "4",
        "Bagarre": "9",
        "Courage": "9",
        "Esquive/Évasion": "7",
        "Résilience": "8",
        "Intimidation": "8",
        "Commandement": "5",
        "Mêlée": "9",
        "Physique": "7",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "5",
        "Equitation": "7",
        "Furtivité": "4",
        "Tactique": "3",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Arc court",
          "damage": "3d6+2",
          "effect": "Portée:100m Saignement(100%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hachette",
          "damage": "2d6+2",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Maillet kaedwenien",
          "damage": "6d6+3",
          "effect": "Météorite Etourdissement(-2)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (4d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Veste de cuir",
        "Pantalon de cuir"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Tirailleur"
      ]
    }
  },
  {
    "id": "human-blue-stripes",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Blue Stripes",
      "fr": "Stries Bleues"
    },
    "threat": {
      "en": "Medium Difficult",
      "fr": "Moyen Difficile"
    },
    "reward": {
      "en": "300 crowns",
      "fr": "300 couronnes"
    },
    "armor": {
      "en": "Head: 14, Torso: 16, Legs: 12",
      "fr": "Tête : 14, Torse : 16, Jambes : 12"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Blue Stripes commandos almost always employ hit-and-run ambush tactics—drawing targets into allied crossfire or laying traps along roads (Corebook, p. 55)."
      ],
      "fr": [
        "Les Stries Bleues utilisent presque toujours des tactiques d’embuscade et de fuite, attirant leurs cibles vers des alliés ou posant des pièges le long de la route (Livre de base, p. 55)."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "9",
        "DEX": "8",
        "COR": "7",
        "VIT": "7",
        "EMP": "5",
        "TECH": "7",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "7",
        "Bagarre": "8",
        "Courage": "6",
        "Arbalète": "6",
        "Esquive/Évasion": "5",
        "Résilience": "5",
        "Intimidation": "5",
        "Commandement": "4",
        "Mêlée": "7",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "5",
        "Furtivité": "8",
        "Escrime": "7",
        "Tactique": "6",
        "Fabrication de pièges": "8",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Arbalète",
          "damage": "4d6+2",
          "effect": "Portée:100m Saignement(100%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Kord",
          "damage": "5d6+1",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poignard",
          "damage": "2d6+3",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Flèches / Carreaux (20)",
        "Objets communs (1d6)",
        "Capuche renforcée",
        "Veste de cuir",
        "Pantalon renforcé"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Spécialistes des embuscades"
      ]
    }
  },
  {
    "id": "human-redanian-halberdiers",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Redanian Halberdiers",
      "fr": "Hallebardiers redaniens"
    },
    "threat": {
      "en": "Medium Simple",
      "fr": "Moyen Simple"
    },
    "reward": {
      "en": "400 crowns",
      "fr": "400 couronnes"
    },
    "armor": {
      "en": "Head: 12, Torso: 14, Legs: 14",
      "fr": "Tête : 12, Torse : 14, Jambes : 14"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups, small units",
      "fr": "En groupes, petites unités"
    },
    "notes": {
      "en": [],
      "fr": []
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "8",
        "COR": "7",
        "VIT": "5",
        "EMP": "4",
        "TECH": "3",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "15",
        "SAUT": "3",
        "END": "35",
        "ENC": "35",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "7",
        "Athlétisme": "5",
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "6",
        "Esquive/Évasion": "7",
        "Résilience": "5",
        "Intimidation": "5",
        "Commandement": "4",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "5",
        "Bâton / Lance": "9",
        "Furtivité": "5",
        "Escrime": "6",
        "Tactique": "3",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Epée de chevalier",
          "damage": "2d6+5",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poignard",
          "damage": "2d6+3",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hallebarde rouge",
          "damage": "6d6+4",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (3d10)",
        "Objets communs (1d6)",
        "Camail",
        "Armure de hallebardier rédanien",
        "Jambières rédaniennes"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Prêt !"
      ]
    }
  },
  {
    "id": "human-scoia-tael-marauders",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Scoia’tael Marauders",
      "fr": "Maraudeurs Scoia’tael"
    },
    "threat": {
      "en": "Medium Complex",
      "fr": "Moyen Complexe"
    },
    "reward": {
      "en": "500 crowns",
      "fr": "500 couronnes"
    },
    "armor": {
      "en": "Head: 10, Torso: 10, Legs: 10",
      "fr": "Tête : 10, Torse : 10, Jambes : 10"
    },
    "size": {
      "en": "Dwarven height",
      "fr": "Taille naine"
    },
    "weight": {
      "en": "Dwarven weight",
      "fr": "Poids nain"
    },
    "environments": [
      "urban",
      "roads",
      "forests"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "Small groups",
      "fr": "Petits groupes"
    },
    "notes": {
      "en": [
        "Built with Elder Race gear, though they can be swapped to mundane equipment or upgraded to stronger Elder Race armor/weapons. Bombs are optional but highly lethal to a party. While elves are most common, Scoia’tael units include dwarves, halflings, and gnomes."
      ],
      "fr": [
        "Conçus avec des équipements des Races Anciennes, les maraudeurs peuvent être ré-équipés en matériel banal ou renforcés avec de meilleures armures des Races Anciennes. Des bombes peuvent leur être données (très mortelles). Bien que les elfes dominent, les Scoia’tael comptent aussi nains, halfelins et gnomes."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "6",
        "COR": "8",
        "VIT": "4",
        "EMP": "6",
        "TECH": "6",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "2",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "8",
        "Courage": "7",
        "Arbalète": "7",
        "Esquive/Évasion": "4",
        "Résilience": "5",
        "Commandement": "4",
        "Mêlée": "7",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "7",
        "Lames courtes": "6",
        "Furtivité": "8",
        "Tactique": "4",
        "Fabrication de pièges": "7",
        "Survie": "7"
      },
      "weapons": [
        {
          "name": "Arbalète de poing gnome",
          "damage": "2d6",
          "effect": "Portée:100m PRE:+3 (Ablation)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Couperet nain",
          "damage": "3d6+1",
          "effect": "PRE +2",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hache naine",
          "damage": "5d6+4",
          "effect": "PRE:+3",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Carreaux (20)",
        "Impacts nains (1d6)",
        "Objets communs (1d6)",
        "Cotte de mailles gnome"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Cotte de mailles gnome"
      ]
    }
  },
  {
    "id": "human-scoia-tael-veterans",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Scoia’tael Veterans",
      "fr": "Vétérans Scoia’tael"
    },
    "threat": {
      "en": "Medium Complex",
      "fr": "Moyen Complexe"
    },
    "reward": {
      "en": "500 crowns",
      "fr": "500 couronnes"
    },
    "armor": {
      "en": "Head: 20, Torso: 20, Legs: 20",
      "fr": "Tête : 20, Torse : 20, Jambes : 20"
    },
    "size": {
      "en": "Human height",
      "fr": "Taille humaine"
    },
    "weight": {
      "en": "Human weight",
      "fr": "Poids humain"
    },
    "environments": [
      "urban",
      "roads",
      "forests"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups, small units",
      "fr": "En groupes, petites unités"
    },
    "notes": {
      "en": [
        "Horse: Athletics +11 | Control Mod +3 | SPD 12 | HP 40 | Weight 100",
        "Equipped with Elder Race gear (adjustable up or down; bombs remain extremely lethal). Veterans occasionally fight mounted with saddlebags, racing saddle (+2 Control), blinders (+1), and leather barding (10 SP)."
      ],
      "fr": [
        "Cheval : Athlétisme +11 | Mod. de contrôle +3 | Vitesse 12 | PS 40 | Poids 100",
        "Équipés de matériel des Races Anciennes (ajustable selon le défi souhaité ; attention aux bombes très meurtrières). Les vétérans combattent parfois à cheval avec sacoches, selle de course (+2 Contrôle), œillères (+1) et bardes de cuir (10 PA)."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "9",
        "COR": "5",
        "VIT": "8",
        "EMP": "6",
        "TECH": "4",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "15",
        "SAUT": "3",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "9",
        "Athlétisme": "7",
        "Vigilance": "9",
        "Bagarre": "6",
        "Courage": "6",
        "Esquive/Évasion": "8",
        "Résilience": "4",
        "Commandement": "3",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4",
        "Equitation": "6",
        "Furtivité": "8",
        "Escrime": "8",
        "Tactique": "6",
        "Survie": "8"
      },
      "weapons": [
        {
          "name": "Arc de voyage elfe",
          "damage": "4d6",
          "effect": "Portée:200m PRE:+2 Saignement(100%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Messer elfe",
          "damage": "3d6+4",
          "effect": "PRE +2",
          "attacksPerTurn": "1"
        },
        {
          "name": "Vouge elfe",
          "damage": "4d6+3",
          "effect": "Longue portée(2m) Saignement(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Flèches / Carreaux (20)",
        "Fouisseuse elfe",
        "Objets communs (1d6)",
        "Armure Scoia’tael"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Armure Scoia’tael"
      ]
    }
  },
  {
    "id": "human-mahakam-defenders",
    "kind": "humanoid",
    "typeId": "humanoid",
    "isFanMade": false,
    "name": {
      "en": "Mahakam Defenders",
      "fr": "Défenseurs de Mahakam"
    },
    "threat": {
      "en": "Medium Complex",
      "fr": "Moyen Complexe"
    },
    "reward": {
      "en": "600 crowns",
      "fr": "600 couronnes"
    },
    "armor": {
      "en": "Head: 8, Torso: 20, Legs: 20",
      "fr": "Tête : 8, Torse : 20, Jambes : 20"
    },
    "size": {
      "en": "Dwarven height",
      "fr": "Taille naine"
    },
    "weight": {
      "en": "Dwarven weight",
      "fr": "Poids nain"
    },
    "environments": [
      "mahakam"
    ],
    "intelligence": {
      "en": "Human",
      "fr": "Humaine"
    },
    "organization": {
      "en": "In groups",
      "fr": "En groupes"
    },
    "notes": {
      "en": [
        "Designed with Elder Race equipment; the GM can downgrade them to standard gear or enhance them with stronger Elder Race arms and armor."
      ],
      "fr": [
        "Conçus avec des équipements des Races Anciennes, les Défenseurs peuvent être ré-équipés avec du matériel banal ou renforcés avec de meilleures armes et armures des Races Anciennes."
      ]
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "8",
        "DEX": "7",
        "COR": "9",
        "VIT": "4",
        "EMP": "5",
        "TECH": "4",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "12",
        "SAUT": "2",
        "END": "40",
        "ENC": "90",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "7",
        "Bagarre": "7",
        "Courage": "7",
        "Arbalète": "8",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Commandement": "6",
        "Mêlée": "9",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "7",
        "Furtivité": "2",
        "Tactique": "5",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Arbalète lourde naine",
          "damage": "5d6",
          "effect": "Portée:300m PRE:+3 Ablation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Marteau mahakamien",
          "damage": "5d6+1",
          "effect": "Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Couperet nain",
          "damage": "3d6+1",
          "effect": "PRE +2",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Couronnes (2d10)",
        "Flèches / Carreaux (20)",
        "Impacts nains (1d6)",
        "Objets communs (1d6)",
        "Armure de plates",
        "Jambières de plates",
        "Pavois mahakamien"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Soldats entraînés",
        "Soutien fort"
      ]
    }
  }
];
