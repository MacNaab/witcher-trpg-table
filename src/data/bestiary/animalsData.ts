import type { BestiaryEntry } from './types';

/**
 * Canonical Beast & Mount entries from the Witcher TRPG core bestiary (8 entries).
 */
export const ANIMALS_DATA: readonly BestiaryEntry[] = [
  {
    "id": "animal-cat",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Chat",
      "en": "Cat"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Petit (~0,3 m)",
      "en": "Small (~0.3 m)"
    },
    "weight": {
      "fr": "Environ 4 kg",
      "en": "Around 4 kg"
    },
    "environments": [
      "everywhere",
      "urban",
      "forests"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Animal domestique ou errant sensible aux fluctuations magiques."
      ],
      "en": [
        "Domestic or stray feline sensitive to magical fluctuations."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "6",
        "COR": "1",
        "VIT": "6",
        "EMP": "3",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "2",
        "COU": "18",
        "SAUT": "3",
        "END": "10",
        "ENC": "10",
        "RÉC": "2",
        "PS": "10",
        "VIG": "0"
      },
      "skills": {
        "Survie": "3",
        "Vigilance": "7",
        "Esquive/Évasion": "6",
        "Mêlée": "4",
        "Athlétisme": "8",
        "Furtivité": "6",
        "Résilience": "4",
        "Courage": "5"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "1d6/2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "1d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Viande crue (1d6/2)",
        "Os de bête (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Nyctalopie",
        "Bond",
        "Harmonisation magique",
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-dog",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Chien",
      "en": "Dog"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Petit à moyen (~0,6 m)",
      "en": "Small to medium (~0.6 m)"
    },
    "weight": {
      "fr": "Environ 20 kg",
      "en": "Around 20 kg"
    },
    "environments": [
      "everywhere",
      "urban",
      "roads"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Chien de garde, de chasse ou errant."
      ],
      "en": [
        "Guard, hunting, or stray dog."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "3",
        "DEX": "5",
        "COR": "3",
        "VIT": "5",
        "EMP": "4",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "15",
        "SAUT": "3",
        "END": "20",
        "ENC": "30",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "9",
        "Esquive/Évasion": "6",
        "Mêlée": "7",
        "Athlétisme": "3",
        "Furtivité": "3",
        "Résilience": "10",
        "Courage": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Os de bête (1d6)",
        "Suif de chien (1d6/2)",
        "Viande crue (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Traque olfactive",
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-bird",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Oiseau",
      "en": "Bird"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Très petit (~0,25 m)",
      "en": "Tiny (~0.25 m)"
    },
    "weight": {
      "fr": "Environ 0,5 kg",
      "en": "Around 0.5 kg"
    },
    "environments": [
      "everywhere",
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Corbeau, faucon ou oiseau sauvage commun."
      ],
      "en": [
        "Raven, hawk, or common wild bird."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "3",
        "DEX": "4",
        "COR": "1",
        "VIT": "2",
        "EMP": "3",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "2",
        "COU": "10",
        "SAUT": "2",
        "END": "10",
        "ENC": "10",
        "RÉC": "2",
        "PS": "10",
        "VIG": "0"
      },
      "skills": {
        "Survie": "3",
        "Vigilance": "9",
        "Esquive/Évasion": "6",
        "Mêlée": "5",
        "Athlétisme": "6",
        "Furtivité": "6",
        "Résilience": "4",
        "Courage": "6"
      },
      "weapons": [
        {
          "name": "Serres",
          "damage": "1d6/2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Plumes (1d6)",
        "Viande crue (1d6/2)",
        "Os de bête (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Vol",
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-serpent",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Serpent",
      "en": "Serpent"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1 m",
      "en": "Around 1 m"
    },
    "weight": {
      "fr": "Environ 2 kg",
      "en": "Around 2 kg"
    },
    "environments": [
      "forests",
      "swamps",
      "deserts"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Serpent venimeux ou constricteur commun."
      ],
      "en": [
        "Common venomous or constrictor serpent."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "3",
        "COR": "1",
        "VIT": "6",
        "EMP": "2",
        "TECH": "1",
        "VOL": "3",
        "CHA": "0",
        "ÉTOU": "2",
        "COU": "18",
        "SAUT": "3",
        "END": "10",
        "ENC": "10",
        "RÉC": "2",
        "PS": "10",
        "VIG": "0"
      },
      "skills": {
        "Survie": "2",
        "Vigilance": "5",
        "Esquive/Évasion": "5",
        "Mêlée": "6",
        "Athlétisme": "4",
        "Furtivité": "9",
        "Résilience": "4",
        "Courage": "5"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "1d6",
          "effect": "Poison(75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Viande crue (1d6/2)",
        "Os de bête (1d6/2)",
        "Extrait de venin (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Natation",
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-horse",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Cheval",
      "en": "Horse"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,6 m au garrot",
      "en": "Around 1.6 m at shoulder"
    },
    "weight": {
      "fr": "Environ 450 kg",
      "en": "Around 450 kg"
    },
    "environments": [
      "plains",
      "roads",
      "urban"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Monture de selle ou de voyage standard."
      ],
      "en": [
        "Standard riding or travel mount."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "5",
        "COR": "12",
        "VIT": "12",
        "EMP": "4",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "36",
        "SAUT": "7",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Survie": "2",
        "Vigilance": "5",
        "Esquive/Évasion": "8",
        "Mêlée": "6",
        "Athlétisme": "6",
        "Furtivité": "3",
        "Résilience": "6",
        "Courage": "6"
      },
      "weapons": [
        {
          "name": "Sabots",
          "damage": "2d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Os de bête (1d10)",
        "Viande crue (1d10)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-warhorse",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Destrier",
      "en": "Warhorse (Destrier)"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,7 m au garrot",
      "en": "Around 1.7 m at shoulder"
    },
    "weight": {
      "fr": "Environ 600 kg",
      "en": "Around 600 kg"
    },
    "environments": [
      "battlefields",
      "roads",
      "urban"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Cheval de guerre entraîné au combat et à la charge."
      ],
      "en": [
        "Trained warhorse conditioned for battle and charging."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "6",
        "COR": "14",
        "VIT": "11",
        "EMP": "3",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "33",
        "SAUT": "6",
        "END": "50",
        "ENC": "140",
        "RÉC": "10",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Survie": "2",
        "Vigilance": "6",
        "Esquive/Évasion": "6",
        "Mêlée": "8",
        "Athlétisme": "6",
        "Furtivité": "2",
        "Résilience": "9",
        "Courage": "10"
      },
      "weapons": [
        {
          "name": "Sabots",
          "damage": "4d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Viande crue (2d6)",
        "Os de bête (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-ox",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Bœuf",
      "en": "Ox"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,5 m au garrot",
      "en": "Around 1.5 m at shoulder"
    },
    "weight": {
      "fr": "Environ 700 kg",
      "en": "Around 700 kg"
    },
    "environments": [
      "plains",
      "roads"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Bête de trait agricole utilisée pour les chariots et les labours."
      ],
      "en": [
        "Draft animal used for wagons and plowing."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "3",
        "DEX": "3",
        "COR": "14",
        "VIT": "6",
        "EMP": "2",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "18",
        "SAUT": "3",
        "END": "50",
        "ENC": "140",
        "RÉC": "10",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Survie": "1",
        "Vigilance": "3",
        "Esquive/Évasion": "7",
        "Mêlée": "5",
        "Athlétisme": "2",
        "Furtivité": "1",
        "Résilience": "6",
        "Courage": "10"
      },
      "weapons": [
        {
          "name": "Sabots",
          "damage": "4d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Coup de corne",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Viande crue (2d6)",
        "Os de bête (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Charge",
        "Sauvage"
      ]
    }
  },
  {
    "id": "animal-mule",
    "kind": "animal",
    "typeId": "beast",
    "source": "official",
    "isFanMade": false,
    "name": {
      "fr": "Mule",
      "en": "Mule"
    },
    "threat": {
      "fr": "Animal / Monture",
      "en": "Animal / Mount"
    },
    "reward": {
      "fr": "Aucune",
      "en": "None"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,3 m au garrot",
      "en": "Around 1.3 m at shoulder"
    },
    "weight": {
      "fr": "Environ 380 kg",
      "en": "Around 380 kg"
    },
    "environments": [
      "mountains",
      "roads"
    ],
    "intelligence": {
      "fr": "Instinct animal",
      "en": "Animal instinct"
    },
    "organization": {
      "fr": "Solitaire ou en troupeau",
      "en": "Solitary or in herds"
    },
    "notes": {
      "fr": [
        "Bête de somme endurante adaptée aux sentiers escarpés."
      ],
      "en": [
        "Hardy pack animal suited for steep trails."
      ]
    },
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "4",
        "COR": "11",
        "VIT": "9",
        "EMP": "3",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "27",
        "SAUT": "5",
        "END": "45",
        "ENC": "110",
        "RÉC": "9",
        "PS": "45",
        "VIG": "0"
      },
      "skills": {
        "Survie": "2",
        "Vigilance": "3",
        "Esquive/Évasion": "5",
        "Mêlée": "5",
        "Athlétisme": "3",
        "Furtivité": "2",
        "Résilience": "7",
        "Courage": "7"
      },
      "weapons": [
        {
          "name": "Sabots",
          "damage": "2d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Os de bête (1d10)",
        "Viande crue (1d10)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Sauvage"
      ]
    }
  }
];
