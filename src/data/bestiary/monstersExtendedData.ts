import type { BestiaryEntry } from './types';

/**
 * Canonical Monster bestiary — Extended & Unofficial/Fan-Made entries with combat stat blocks (72 entries).
 */
export const MONSTERS_EXTENDED_DATA: readonly BestiaryEntry[] = [
  {
    "id": "monster-naiad",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Naïade",
      "en": "Naiad"
    },
    "threat": {
      "fr": "Facile Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "250 couronnes",
      "en": "250 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Poids humain",
      "en": "Human weight"
    },
    "environments": [
      "forests",
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire ou en groupes de 2 ou 3",
      "en": "Solitary or groups of 2 or 3"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "7",
        "DEX": "7",
        "COR": "5",
        "VIT": "6",
        "EMP": "7",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "3",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "7",
        "Bagarre": "7",
        "Charisme": "8",
        "Courage": "5",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "4",
        "Représentation": "8",
        "Persuasion": "8",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "5",
        "Séduction": "9",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "1d6",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d’eau (1d6)",
        "Objets communs (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques"
      ],
      "abilities": [
        "Amphibien",
        "Chant hypnotique",
        "Illusion",
        "Réfraction"
      ]
    }
  },
  {
    "id": "monster-naucore",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Naucore",
      "en": "Giant Water Bug (Naucore)"
    },
    "threat": {
      "fr": "Facile Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 90 kg",
      "en": "Around 90 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un poisson",
      "en": "As intelligent as a fish"
    },
    "organization": {
      "fr": "Solitaire, parfois par 2 ou 3",
      "en": "Solitary, sometimes 2 or 3"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "7",
        "COR": "8",
        "VIT": "8",
        "EMP": "1",
        "TECH": "5",
        "VOL": "3",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "80",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "7",
        "Courage": "8",
        "Esquive/Évasion": "6",
        "Résilience": "6",
        "Mêlée": "6",
        "Résistance à la magie": "3",
        "Résistance à la contrainte": "3",
        "Furtivité": "7",
        "Survie": "7"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d’eau (1d6/2)",
        "Viande crue (1d6)",
        "Perle"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Mouvement entravé",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Amphibien",
        "Nyctalopie",
        "Sauvage",
        "Ejection de larves",
        "Camouflage naturel",
        "Résistances (T)"
      ]
    }
  },
  {
    "id": "monster-nereid",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Néréide",
      "en": "Nereid"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "550 couronnes",
      "en": "550 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Taille humaine normale",
      "en": "Normal human size"
    },
    "weight": {
      "fr": "Poids humain normal",
      "en": "Normal human weight"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire, parfois en groupes de 2 ou 3",
      "en": "Solitary, sometimes groups of 2 or 3"
    },
    "notes": {
      "fr": [
        "Compagnon : Bongare."
      ],
      "en": [
        "Companion: Bongare."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "7",
        "COR": "7",
        "VIT": "9",
        "EMP": "7",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "27",
        "SAUT": "5",
        "END": "30",
        "ENC": "70",
        "RÉC": "7",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "8",
        "Courage": "4",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Mêlée": "7",
        "Résistance à la magie": "5",
        "Furtivité": "5",
        "Survie": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence d’eau (1d6)",
        "Objets communs (1d6/2)",
        "Objets étranges (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Mouvement entravé",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Amphibien",
        "Nyctalopie",
        "Chant des profondeurs",
        "Appel",
        "Illusion",
        "Tentacules"
      ]
    }
  },
  {
    "id": "monster-bongare",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Bongare",
      "en": "Bongare"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "550 couronnes",
      "en": "550 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Taille humaine normale",
      "en": "Normal human size"
    },
    "weight": {
      "fr": "Poids humain normal",
      "en": "Normal human weight"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire, parfois en groupes de 2 ou 3",
      "en": "Solitary, sometimes groups of 2 or 3"
    },
    "notes": {
      "fr": [
        "Compagnon de la Néréide."
      ],
      "en": [
        "Companion to the Nereid."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "8",
        "VIT": "6",
        "EMP": "2",
        "TECH": "1",
        "VOL": "6",
        "ÉTOU": "7",
        "COU": "18",
        "SAUT": "3",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "6",
        "Esquive/Évasion": "5",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Fouet",
          "damage": "3d6",
          "effect": "ETOU (-2)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(50%) Poison(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d’eau (1d6)",
        "Objets communs (1d6/2)",
        "Objets étranges (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Mouvement entravé",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Amphibien",
        "Nyctalopie",
        "Chant des profondeurs",
        "Appel",
        "Illusion",
        "Tentacules"
      ]
    }
  },
  {
    "id": "monster-ogre",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Ogre",
      "en": "Ogre"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "250 couronnes",
      "en": "250 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 125 kg",
      "en": "Around 125 kg"
    },
    "environments": [
      "mountains",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain stupide",
      "en": "As intelligent as a dull human"
    },
    "organization": {
      "fr": "Bande de guerriers de 3 à 6 ; jusqu’à 50 en communauté",
      "en": "Warbands of 3 to 6; up to 50 in a settlement"
    },
    "notes": {
      "fr": [
        "Les ogres sont une espèce intelligente. Bien que stupides et violents, ils partagent bien plus de traits avec les humains et les races anciennes que la plupart des monstres."
      ],
      "en": [
        "Ogres are a sapient species. Though dim-witted and violent, they have far more in common with humans and the Elder Races than most monsters witchers face."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "7",
        "COR": "8",
        "VIT": "5",
        "EMP": "5",
        "TECH": "4",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "15",
        "SAUT": "3",
        "END": "30",
        "ENC": "80",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "7",
        "Bagarre": "8",
        "Courage": "6",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Résistance à la magie": "5",
        "Furtivité": "6",
        "Escrime": "7",
        "Survie": "7"
      },
      "weapons": [
        {
          "name": "Lame brute",
          "damage": "4d6+4",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Javelot",
          "damage": "3d6+2",
          "effect": "Portée:32m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Armure en métal brut",
        "Arme de mauvaise facture",
        "Objets communs (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Aveuglement"
      ],
      "abilities": [
        "Nyctalopie",
        "Robuste",
        "Coups",
        "Force physique"
      ]
    }
  },
  {
    "id": "monster-plague-maiden-fan",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Pesta (fan)",
      "en": "Plague Maiden (fan)"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 000 couronnes",
      "en": "1,000 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Consumé par l’amertume ou la colère",
      "en": "Consumed by bitterness or wrath"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "7",
        "COR": "7",
        "VIT": "6",
        "EMP": "3",
        "TECH": "1",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "18",
        "SAUT": "5",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "10",
        "Bagarre": "8",
        "Courage": "6",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Intimidation": "6",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "5",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Maladie(25%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)",
        "Objets lui ayant appartenu (si le corps peut être retrouvé)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Poussière de lune et Yrden",
        "Magie guérisseuse"
      ],
      "abilities": [
        "Incorporel",
        "Malédiction",
        "Horde de rats",
        "Essaim d’insectes",
        "Maladie"
      ]
    }
  },
  {
    "id": "monster-phoenix-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Phénix (fan)",
      "en": "Phoenix (fan)"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 000 couronnes",
      "en": "1,000 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Environ 180 kg",
      "en": "Around 180 kg"
    },
    "environments": [
      "mountains",
      "plains",
      "deserts"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain stupide",
      "en": "As intelligent as a dull human"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "9",
        "COR": "5",
        "VIT": "7",
        "EMP": "4",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "21",
        "SAUT": "4",
        "END": "25",
        "ENC": "70",
        "RÉC": "5",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "6",
        "Bagarre": "5",
        "Courage": "8",
        "Esquive/Évasion": "9",
        "Résilience": "5",
        "Mêlée": "9",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "8",
        "Furtivité": "3",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Serres (en vol)",
          "damage": "4d6+6",
          "effect": "Saignement(25%) PRE:+1",
          "attacksPerTurn": "2"
        },
        {
          "name": "Bec",
          "damage": "6d6+2",
          "effect": "Saignement(50%) Feu(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Plume de phénix (1d6)",
        "Coeur de phénix",
        "Oeuf de phénix"
      ],
      "vulnerabilities": [
        "Huile contre les draconides",
        "Vulnérable au froid"
      ],
      "abilities": [
        "Régénération",
        "Vol",
        "Explosion",
        "Nimbus de feu",
        "Immortalité",
        "Rayonnement",
        "Immunité au feu"
      ]
    }
  },
  {
    "id": "monster-rotfiend-fan",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Putréfacteur (fan)",
      "en": "Rotfiend (fan)"
    },
    "threat": {
      "fr": "Facile Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,5 m",
      "en": "Around 1.5 m"
    },
    "weight": {
      "fr": "Environ 80 kg",
      "en": "Around 80 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Groupes de 3 à 6",
      "en": "Groups of 3 to 6"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "7",
        "COR": "7",
        "VIT": "9",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "27",
        "SAUT": "5",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "6",
        "Courage": "6",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Mêlée": "6",
        "Résistance à la magie": "5",
        "Furtivité": "5",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "3d6+1",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Moelle de putréfacteur (1d6/2)",
        "Griffes de putréfacteur (2)",
        "Extrait de venin (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Gaz inflammables"
      ],
      "abilities": [
        "Sauvage",
        "Bond",
        "Nyctalopie",
        "Explosion"
      ]
    }
  },
  {
    "id": "monster-shaelmaar-fan",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Shaelmaar (fan)",
      "en": "Shaelmaar (fan)"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "Environ 3 m",
      "en": "Around 3 m"
    },
    "weight": {
      "fr": "Environ 800 kg",
      "en": "Around 800 kg"
    },
    "environments": [
      "caves",
      "mountains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "7",
        "COR": "10",
        "VIT": "4",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "2",
        "END": "35",
        "ENC": "70",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "7",
        "Bagarre": "7",
        "Courage": "7",
        "Esquive/Évasion": "5",
        "Résilience": "8",
        "Mêlée": "9",
        "Physique": "9",
        "Résistance à la magie": "5",
        "Furtivité": "2",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Frappe",
          "damage": "5d6",
          "effect": "ETOU (-2)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Optima Mater (1d6/2)",
        "Calcium Equum (1d10)",
        "Pierres (2d10)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Point faible (Abdomen)",
        "Aveugle",
        "Grosse carrure"
      ],
      "abilities": [
        "Charge roulante",
        "Terrier",
        "Terre brisée",
        "Vision nocturne",
        "Massif",
        "Sauvage",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-striga",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Stryge",
      "en": "Striga"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "650 couronnes",
      "en": "650 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Environ 1,25 m au garrot",
      "en": "Around 1.25 m at shoulder"
    },
    "weight": {
      "fr": "Environ 125 kg",
      "en": "Around 125 kg"
    },
    "environments": [
      "ruins"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "8",
        "COR": "5",
        "VIT": "10",
        "EMP": "1",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "30",
        "SAUT": "15",
        "END": "25",
        "ENC": "50",
        "RÉC": "6",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "7",
        "Bagarre": "8",
        "Courage": "9",
        "Esquive/Évasion": "10",
        "Résilience": "7",
        "Mêlée": "9",
        "Physique": "9",
        "Résistance à la magie": "7",
        "Furtivité": "8",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6+2",
          "effect": "Saignement(25%)",
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
        "Cinquième essence (1d6/2)",
        "Objets aléatoires (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Faiblesse astrale"
      ],
      "abilities": [
        "Régénération (3)",
        "Saut",
        "Nyctalopie",
        "Terre d’origine",
        "Escalade",
        "Charge rapide",
        "Amie des nécrophages"
      ]
    }
  },
  {
    "id": "monster-succubus-alt",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Succube (variante)",
      "en": "Succubus (variant)"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "650 couronnes",
      "en": "650 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Poids humain",
      "en": "Human weight"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Le pendant masculin de la succube est l’incube, identique en tout point hormis son apparence."
      ],
      "en": [
        "The male counterpart to the succubus is the incubus, identical in every respect except appearance."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "7",
        "DEX": "8",
        "COR": "7",
        "VIT": "6",
        "EMP": "12",
        "TECH": "4",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "18",
        "SAUT": "3",
        "END": "35",
        "ENC": "70",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "7",
        "Bagarre": "6",
        "Charisme": "10",
        "Courage": "7",
        "Duperie": "8",
        "Esquive/Évasion": "8",
        "Résilience": "8",
        "Perception humaine": "10",
        "Mêlée": "7",
        "Persuasion": "10",
        "Résistance à la magie": "7",
        "Séduction": "10",
        "Incantation": "5",
        "Furtivité": "4"
      },
      "weapons": [
        {
          "name": "Coup",
          "damage": "3d6+2",
          "effect": "PRE +1",
          "attacksPerTurn": "1"
        },
        {
          "name": "Coup de tête",
          "damage": "4d6+2",
          "effect": "ETOU -1",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d10)",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Insatiable",
        "Séduction",
        "Incantation",
        "Immunité au charme"
      ]
    }
  },
  {
    "id": "monster-sylvan",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Sylvain",
      "en": "Sylvan"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "500 couronnes",
      "en": "500 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 3 m",
      "en": "Around 3 m"
    },
    "weight": {
      "fr": "Jusqu’à 200 kg",
      "en": "Up to 200 kg"
    },
    "environments": [
      "ruins",
      "forests"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire, parfois en petites communautés",
      "en": "Solitary, sometimes in small communities"
    },
    "notes": {
      "fr": [
        "Espèce intelligente et généralement placide, les sylvains interagissent souvent de façon semi-pacifique avec les communautés humaines des régions les plus isolées."
      ],
      "en": [
        "An intelligent and generally placid species, sylvans frequently maintain semi-peaceful interactions with isolated human villages."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "6",
        "DEX": "4",
        "COR": "11",
        "VIT": "4",
        "EMP": "7",
        "TECH": "5",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "12",
        "SAUT": "2",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "4",
        "Bagarre": "10",
        "Charisme": "5",
        "Courage": "7",
        "Duperie": "10",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Perception humaine": "8",
        "Physique": "8",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "8",
        "Furtivité": "3",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "5d6+1",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Objets communs (1d6)",
        "Possessions étranges (1d6)",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Glouton"
      ],
      "abilities": [
        "Force écrasante",
        "Solide",
        "Têtu",
        "Langue d’argent",
        "Odeur nauséabonde"
      ]
    }
  },
  {
    "id": "monster-chort",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Tschart",
      "en": "Chort"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 250 couronnes",
      "en": "1,250 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "2 m au garrot",
      "en": "2 m at shoulder"
    },
    "weight": {
      "fr": "Environ 800 kg",
      "en": "Around 800 kg"
    },
    "environments": [
      "plains",
      "forests"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "12",
        "DEX": "9",
        "COR": "12",
        "VIT": "9",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "27",
        "SAUT": "6",
        "END": "45",
        "ENC": "90",
        "RÉC": "90",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "10",
        "Bagarre": "4",
        "Courage": "8",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "7",
        "Physique": "8",
        "Résistance à la magie": "5",
        "Furtivité": "2",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6+2",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6+1",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Cornes",
          "damage": "7d6",
          "effect": "-1 PRE",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Oeil de tschart (3)",
        "Excrément de tschart (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Poussière de lune",
        "Ouïe sensible",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Régénération (3)",
        "Charge",
        "Massif",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-higher-vampire-fan",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Vampire supérieur (fan)",
      "en": "Higher Vampire (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "2 000+ couronnes",
      "en": "2,000+ crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Taille humaine normale",
      "en": "Normal human size"
    },
    "weight": {
      "fr": "Poids humain normal",
      "en": "Normal human weight"
    },
    "environments": [
      "urban",
      "everywhere"
    ],
    "intelligence": {
      "fr": "Bien plus intelligent qu’un humain",
      "en": "Far smarter than a human"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "13",
        "RÉF": "12",
        "DEX": "9",
        "COR": "10",
        "VIT": "9",
        "EMP": "14",
        "TECH": "7",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "27",
        "SAUT": "5",
        "END": "50",
        "ENC": "100",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "10",
        "Vigilance": "8",
        "Bagarre": "8",
        "Charisme": "10",
        "Courage": "9",
        "Duperie": "10",
        "Esquive/Évasion": "10",
        "Etiquette": "10",
        "Perception humaine": "10",
        "Intimidation": "10",
        "Mêlée": "9",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Séduction": "10",
        "Furtivité": "10",
        "Connaissance de la rue": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "8d6+2",
          "effect": "Saignement(100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Crocs de vampire (1d6/2)",
        "Salive de vampire (1d6)",
        "Runes aléatoires (1d6)",
        "Probablement une relique",
        "Toutes les richesses d’un noble"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "Transfert sanguin"
      ],
      "abilities": [
        "Régénération (10)",
        "Illusion",
        "Invisible à la scrutation magique",
        "Nyctalopie",
        "Immortalité",
        "Immunités (Feu & Argent)",
        "Pouvoirs variables"
      ]
    }
  },
  {
    "id": "monster-vodyanoi",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Vodianoï",
      "en": "Vodyanoi"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "35 couronnes",
      "en": "35 crowns"
    },
    "armor": {
      "fr": "4",
      "en": "4"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Jusqu’à 75 kg",
      "en": "Up to 75 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Groupes de 4 à 10, communautés",
      "en": "Groups of 4 to 10, communities"
    },
    "notes": {
      "fr": [
        "Espèce intelligente partageant bien des traits avec les humains et les races anciennes, souvent dirigée par un chef ou un prêtre."
      ],
      "en": [
        "A sapient species with more in common with humans and Elder Races than most monsters, typically led by a chieftain or priest."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "7",
        "DEX": "6",
        "COR": "3",
        "VIT": "6",
        "EMP": "7",
        "TECH": "7",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "12",
        "SAUT": "2",
        "END": "20",
        "ENC": "30",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "7",
        "Bagarre": "4",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "8",
        "Physique": "4",
        "Résistance à la magie": "2",
        "Furtivité": "8",
        "Fabrication de pièges": "5",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Javelot",
          "damage": "3d6",
          "effect": "Portée:6m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d6/2)",
        "Objets étranges (1d6)",
        "Veste de cuir simple",
        "Masque étrange"
      ],
      "vulnerabilities": [
        "Huile contre les ogroÏdes",
        "Air libre",
        "Yeux sensibles"
      ],
      "abilities": [
        "Neurotoxine",
        "Amphibien",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-vodyanoi-priest",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Prêtre vodianoï",
      "en": "Vodyanoi Priest"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "35 couronnes",
      "en": "35 crowns"
    },
    "armor": {
      "fr": "4",
      "en": "4"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Jusqu’à 75 kg",
      "en": "Up to 75 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Groupes de 4 à 10, communautés",
      "en": "Groups of 4 to 10, communities"
    },
    "notes": {
      "fr": [
        "Tant que le prêtre vodianoï est vivant, tous les vodianoï de son groupe bénéficient d’un bonus de +4 en Courage."
      ],
      "en": [
        "As long as the vodyanoi priest remains alive, all vodyanoi in its group gain a +4 bonus to Courage."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "7",
        "DEX": "6",
        "COR": "3",
        "VIT": "6",
        "EMP": "7",
        "TECH": "7",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "12",
        "SAUT": "2",
        "END": "20",
        "ENC": "30",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "7",
        "Bagarre": "4",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "8",
        "Physique": "4",
        "Résistance à la magie": "2",
        "Furtivité": "8",
        "Fabrication de pièges": "5",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Javelot",
          "damage": "3d6",
          "effect": "Portée:6m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d6/2)",
        "Objets étranges (1d6)",
        "Veste de cuir simple",
        "Masque étrange"
      ],
      "vulnerabilities": [
        "Huile contre les ogroÏdes",
        "Air libre",
        "Yeux sensibles"
      ],
      "abilities": [
        "Neurotoxine",
        "Amphibien",
        "Nyctalopie",
        "Chef",
        "Prière de guérison",
        "Averse",
        "Contrôle de l’eau"
      ]
    }
  },
  {
    "id": "monster-zeugl",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Zeugle",
      "en": "Zeugl"
    },
    "threat": {
      "fr": "Fort Simple",
      "en": "Hard Simple"
    },
    "reward": {
      "fr": "1 250 couronnes",
      "en": "1,250 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Environ 6 m",
      "en": "Around 6 m"
    },
    "weight": {
      "fr": "Jusqu’à 500 kg",
      "en": "Up to 500 kg"
    },
    "environments": [
      "sewers",
      "swamps"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un poisson",
      "en": "As intelligent as a fish"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "9",
        "DEX": "4",
        "COR": "14",
        "VIT": "2",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "6",
        "SAUT": "-",
        "END": "50",
        "ENC": "140",
        "RÉC": "10",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "2",
        "Vigilance": "4",
        "Bagarre": "10",
        "Courage": "4",
        "Esquive/Évasion": "2",
        "Résilience": "10",
        "Mêlée": "2",
        "Physique": "10",
        "Résistance à la magie": "5",
        "Furtivité": "8"
      },
      "weapons": [
        {
          "name": "Tentacules",
          "damage": "4d6",
          "effect": "-",
          "attacksPerTurn": "1-4"
        },
        {
          "name": "Morsure",
          "damage": "8d6+2",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d6/2)",
        "Objets étranges (1d6)",
        "Essence d’eau (1d6)",
        "Os de bête (2d10)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Point faible (Corps)"
      ],
      "abilities": [
        "Tentacules",
        "Amphibien",
        "Nyctalopie",
        "Crasse",
        "Odeur nauséabonde",
        "Vorace",
        "Immunité (poison, maladie)",
        "Résistances (Feu,C,P)"
      ]
    }
  },
  {
    "id": "monster-anopheli",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Anopheli",
      "en": "Anopheli"
    },
    "threat": {
      "fr": "Facile Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "40 couronnes",
      "en": "40 crowns"
    },
    "armor": {
      "fr": "3",
      "en": "3"
    },
    "size": {
      "fr": "1,25 – 1,5 m voûté",
      "en": "1.25 – 1.5 m hunched"
    },
    "weight": {
      "fr": "Environ 65 kg (jusqu’à 100 kg repu)",
      "en": "Around 65 kg (up to 100 kg well-fed)"
    },
    "environments": [
      "caves",
      "swamps"
    ],
    "intelligence": {
      "fr": "Repu : humain stupide ; affamé : poisson",
      "en": "Fed: dull human; hungry: fish"
    },
    "organization": {
      "fr": "1 à 3 en itinérance (jusqu’à 12 dans un nid)",
      "en": "1 to 3 roaming (up to 12 in a nest)"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "6",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "3",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "20",
        "ENC": "50",
        "RÉC": "6",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Mêlée": "6",
        "Bagarre": "7",
        "Esquive/Évasion": "5",
        "Athlétisme": "5",
        "Vigilance": "3",
        "Furtivité": "6",
        "Survie": "5",
        "Résistance à la magie": "2",
        "Résilience": "6",
        "Courage": "3"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6+2",
          "effect": "PRE +1",
          "attacksPerTurn": "2"
        },
        {
          "name": "Trompe",
          "damage": "3d6+1",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "1 unité de Fer",
        "Acide (1d6)",
        "Coeur d’anopheli"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Potion Sang noir",
        "Vulnérabilité au froid",
        "Aveugle",
        "Point faible (Abdomen)"
      ],
      "abilities": [
        "Vol limité",
        "Explosion",
        "Sens améliorés",
        "Jet de vomi",
        "Faim de loup"
      ]
    }
  },
  {
    "id": "monster-berberoka",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Berberoka",
      "en": "Berberoka"
    },
    "threat": {
      "fr": "Facile Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "45 couronnes",
      "en": "45 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Environ 1 m au garrot",
      "en": "Around 1 m at shoulder"
    },
    "weight": {
      "fr": "Environ 95 kg",
      "en": "Around 95 kg"
    },
    "environments": [
      "swamps"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Meutes de 3 à 6",
      "en": "Packs of 3 to 6"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "6",
        "DEX": "5",
        "COR": "6",
        "VIT": "4",
        "EMP": "5",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "12",
        "SAUT": "4",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "8",
        "Bagarre": "7",
        "Courage": "4",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Perception humaine": "5",
        "Mêlée": "7",
        "Résistance à la magie": "5",
        "Furtivité": "5",
        "Tactique": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+2",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "4d6",
          "effect": "PRE:-1 Saignement(100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d’eau (1d6)",
        "Peau de loup",
        "Pétrole brut (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Crustacés"
      ],
      "abilities": [
        "Sauvage",
        "Mangeur d’eau",
        "Vomi d’eau",
        "Intelligence partagée"
      ]
    }
  },
  {
    "id": "monster-bukuvac",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Bukuvak",
      "en": "Bukuvac"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "150 couronnes",
      "en": "150 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "1 m au garrot",
      "en": "1 m at shoulder"
    },
    "weight": {
      "fr": "Environ 175 kg",
      "en": "Around 175 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire, parfois avec des noyeurs",
      "en": "Solitary, sometimes with drowners"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "7",
        "VIT": "4",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "12",
        "SAUT": "2",
        "END": "25",
        "ENC": "70",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "8",
        "Bagarre": "8",
        "Courage": "3",
        "Duperie": "6",
        "Esquive/Évasion": "6",
        "Résilience": "5",
        "Mêlée": "7",
        "Physique": "4",
        "Résistance à la magie": "5",
        "Furtivité": "6",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "4d6",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d’eau",
        "Pétrole brut (1d10)",
        "Ecailles de draconide (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Amphibien",
        "Enchevêtrement de queue",
        "Mucus épais",
        "Sauvage",
        "Modulation"
      ]
    }
  },
  {
    "id": "monster-guvorag",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Guvorag",
      "en": "Guvorag"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "450 couronnes",
      "en": "450 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Environ 3 m",
      "en": "Around 3 m"
    },
    "weight": {
      "fr": "Environ 250 kg",
      "en": "Around 250 kg"
    },
    "environments": [
      "ruins",
      "forests"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "9",
        "COR": "6",
        "VIT": "8",
        "EMP": "8",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "10",
        "Bagarre": "9",
        "Charisme": "6",
        "Duperie": "6",
        "Esquive/Évasion": "6",
        "Perception humaine": "10",
        "Intimidation": "6",
        "Mêlée": "7",
        "Résistance à la magie": "10",
        "Séduction": "6",
        "Incantation": "6",
        "Furtivité": "5",
        "Survie": "2"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Soie (1d10)",
        "Poussière imprégnée (1d6/2)",
        "Mucus de guvorag (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Faiblesse astrale"
      ],
      "abilities": [
        "Nyctalopie",
        "Sauvage",
        "Marionnettiste",
        "Tissage de lumière",
        "Sensible à la magie",
        "Grimpeur",
        "Toiles"
      ]
    }
  },
  {
    "id": "monster-preta",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Preta",
      "en": "Preta"
    },
    "threat": {
      "fr": "Facile Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,25 m, voûté",
      "en": "Around 1.25 m, hunched"
    },
    "weight": {
      "fr": "Environ 50 kg",
      "en": "Around 50 kg"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "fr": "Consumé par la faim",
      "en": "Consumed by hunger"
    },
    "organization": {
      "fr": "Groupes de 3 à 6",
      "en": "Groups of 3 to 6"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "5",
        "DEX": "7",
        "COR": "6",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
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
        "Athlétisme": "7",
        "Vigilance": "8",
        "Bagarre": "5",
        "Esquive/Évasion": "6",
        "Résilience": "8",
        "Mêlée": "6",
        "Résistance à la magie": "5",
        "Furtivité": "5",
        "Survie": "6"
      },
      "weapons": [],
      "loot": [
        "Poussière imprégnée (1d6)",
        "Essence de fantôme (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Faiblesse astrale"
      ],
      "abilities": [
        "Invisible pour les rassasiés",
        "Consumé par la faim",
        "Furie",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-uktena",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Uktena",
      "en": "Uktena"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "650 couronnes",
      "en": "650 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "Longueur d’environ 10 m",
      "en": "Around 10 m long"
    },
    "weight": {
      "fr": "Jusqu’à 750 kg",
      "en": "Up to 750 kg"
    },
    "environments": [
      "mountains",
      "forests",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "9",
        "DEX": "6",
        "COR": "9",
        "VIT": "4",
        "EMP": "3",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "2",
        "END": "35",
        "ENC": "90",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "8",
        "Bagarre": "8",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Mêlée": "7",
        "Physique": "7",
        "Résistance à la magie": "5",
        "Incantation": "8",
        "Furtivité": "5",
        "Survie": "6",
        "Butins": "Salive d’uktena"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Poison(50%) Saignement(25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Langue barbelée",
          "damage": "6d6+2",
          "effect": "Poison(100%) Portée:5m PRE:-1",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Salive d’uktena (1d10)",
        "Ecailles de draconide (1d10)",
        "Chitine"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Vulnérable au feu",
        "Ecailles fragiles (A)"
      ],
      "abilities": [
        "Etouffement",
        "Salive empoisonnée",
        "Divination",
        "Grimpeur",
        "Natation",
        "Résistances (T,P)"
      ]
    }
  },
  {
    "id": "monster-foglet",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Brumelin",
      "en": "Foglet"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "800 couronnes",
      "en": "800 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 75 kg",
      "en": "Around 75 kg"
    },
    "environments": [
      "caves",
      "swamps"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "8",
        "COR": "7",
        "VIT": "6",
        "EMP": "3",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "4",
        "Courage": "6",
        "Esquive/Évasion": "7",
        "Furtivité": "7",
        "Intimidation": "7",
        "Physique": "2",
        "Résilience": "3",
        "Résistance à la magie": "8",
        "Survie": "7",
        "Vigilance": "9",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+2",
          "effect": "Fia:10",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Dent de brumelin (1d6/2)",
        "Essence de brumelin (1d6)",
        "Phosphore (2d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "bombe Poussière de lune",
        "bombe au dimeritium",
        "Yrden"
      ],
      "abilities": [
        "Nyctalopie",
        "Invocation de brouillard",
        "Invisibilité",
        "Double illusoire",
        "Création de mirages"
      ]
    }
  },
  {
    "id": "monster-bullvore",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Bullvore",
      "en": "Bullvore"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "500 couronnes",
      "en": "500 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "3,5 m",
      "en": "3.5 m"
    },
    "weight": {
      "fr": "500 kg",
      "en": "500 kg"
    },
    "environments": [
      "caves"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "5",
        "DEX": "4",
        "COR": "12",
        "VIT": "3",
        "EMP": "1",
        "TECH": "2",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "9",
        "SAUT": "1",
        "END": "45",
        "ENC": "120",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Bagarre": "9",
        "Courage": "9",
        "Esquive/Évasion": "8",
        "Furtivité": "1",
        "Intimidation": "8",
        "Physique": "8",
        "Résilience": "8",
        "Résistance à la magie": "8",
        "Survie": "5",
        "Vigilance": "8",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+3",
          "effect": "Fia:15",
          "attacksPerTurn": "2"
        },
        {
          "name": "Cornes",
          "damage": "5d6",
          "effect": "Fia:15, Saignement (50 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cerveau de bullvore (1)",
        "OEil de bullvore (1d6/3)",
        "Sang de bullvore (2d6)",
        "Fil (2d6)",
        "Lin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "bombe Poussière de lune"
      ],
      "abilities": [
        "Nyctalopie améliorée",
        "Immunité (Poison, saignement)",
        "Régénération (4)",
        "Bile caustique",
        "Charge"
      ]
    }
  },
  {
    "id": "monster-rotfiends",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Putréfacteurs",
      "en": "Rotfiends"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "10 couronnes",
      "en": "10 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "2 m",
      "en": "2 m"
    },
    "weight": {
      "fr": "80 kg",
      "en": "80 kg"
    },
    "environments": [
      "caves",
      "battlefields"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Groupes de 4 à 6 individus",
      "en": "Groups of 4 to 6 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "6",
        "COR": "5",
        "VIT": "11",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "33",
        "SAUT": "6",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Bagarre": "4",
        "Courage": "8",
        "Esquive/Évasion": "6",
        "Furtivité": "4",
        "Intimidation": "5",
        "Physique": "3",
        "Résilience": "3",
        "Résistance à la magie": "4",
        "Survie": "9",
        "Vigilance": "7",
        "Mêlée": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Fia:10",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Foie de putréfacteur (1)",
        "Sang de putréfacteur (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Puanteur atroce"
      ],
      "abilities": [
        "Nyctalopie améliorée",
        "Immunité (Poison, saignement)",
        "Mort explosive"
      ]
    }
  },
  {
    "id": "monster-barghest",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Barghest",
      "en": "Barghest"
    },
    "threat": {
      "fr": "Faible Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
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
      "fr": "Environ 40 kg",
      "en": "Around 40 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Meutes de 3 à 5 individus",
      "en": "Packs of 3 to 5 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "5",
        "DEX": "7",
        "COR": "5",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "7",
        "Courage": "0",
        "Esquive/Évasion": "6",
        "Furtivité": "6",
        "Intimidation": "6",
        "Physique": "2",
        "Résilience": "5",
        "Résistance à la magie": "8",
        "Survie": "13",
        "Vigilance": "11",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6",
          "effect": "Fia:15",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de barghest (1d6)",
        "Poussière imprégnée (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "bombe Poussière de lune",
        "Yrden"
      ],
      "abilities": [
        "Nyctalopie",
        "Traque olfactive",
        "Charge spectrale",
        "Souffle infernal",
        "Immunité (feu, poison, peur, maladie)"
      ]
    }
  },
  {
    "id": "monster-gaunt",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Blême",
      "en": "Gaunt (The Pale)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500 couronnes",
      "en": "1,500 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "3 m",
      "en": "3 m"
    },
    "weight": {
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "5",
        "DEX": "4",
        "COR": "7",
        "VIT": "5",
        "EMP": "3",
        "TECH": "1",
        "VOL": "12",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "15",
        "SAUT": "3",
        "END": "45",
        "ENC": "70",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "13",
        "Bagarre": "11",
        "Courage": "6",
        "Esquive/Évasion": "11",
        "Furtivité": "14",
        "Intimidation": "5",
        "Persuasion": "14",
        "Physique": "8",
        "Résilience": "0",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "5",
        "Survie": "7",
        "Vigilance": "10",
        "Mêlée": "11"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Allonge, Serres d’ombre",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Pierre runique Veles (1)",
        "Essence cristallisée (1d6/2)",
        "Essence de fantôme (2d6)",
        "Poussière de spectre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Attaques enflammées"
      ],
      "abilities": [
        "Nyctalopie améliorée",
        "Immunités (Saignement, gel, poison,  renversement, maladie)",
        "Régénération (5)",
        "Serres d’ombre",
        "Forme d’ombre",
        "Influence néfaste"
      ]
    }
  },
  {
    "id": "monster-plague-maiden",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Pesta",
      "en": "Plague Maiden"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "900 couronnes",
      "en": "900 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1,75 m",
      "en": "1.75 m"
    },
    "weight": {
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Horde de rats de la peste : PS 10, Esquive (base) 16, Vitesse 5, Attaque (base) 14.",
        "La horde tente de submerger la cible (Esquive/Évasion ou repositionnement). En cas de touche : 2d6 dégâts sur tout le corps et 50 % de chance de contracter une maladie."
      ],
      "en": [
        "Plague Rat Swarm: HP 10, Dodge (base) 16, Speed 5, Attack (base) 14.",
        "The swarm attempts to overwhelm its target (avoid via Dodge/Escape or Reposition). On a hit: 2d6 damage across the whole body and a 50% chance to contract disease."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "6",
        "COR": "7",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "4",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "2",
        "Courage": "0",
        "Esquive/Évasion": "10",
        "Furtivité": "5",
        "Intimidation": "5",
        "Physique": "3",
        "Résilience": "0",
        "Résistance à la contrainte": "0",
        "Résistance à la magie": "6",
        "Survie": "3",
        "Vigilance": "4",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Maladie (50 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Glyphe de Magie (1)",
        "Essence cristallisée (1d6/2)",
        "Essence de fantôme (2d6)",
        "Poussière de spectre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres"
      ],
      "abilities": [
        "Nyctalopie",
        "Incorporel",
        "Immunités (Saignement, poison,  peur, contrainte, maladie)",
        "Invocation de rats de la peste",
        "Nuée de mouches"
      ]
    }
  },
  {
    "id": "monster-bear",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Ours",
      "en": "Bear"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "450 couronnes",
      "en": "450 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "1,75 m",
      "en": "1.75 m"
    },
    "weight": {
      "fr": "600 kg",
      "en": "600 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par deux",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "12",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "4",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "6",
        "Courage": "9",
        "Esquive/Évasion": "6",
        "Furtivité": "2",
        "Intimidation": "9",
        "Physique": "8",
        "Résilience": "4",
        "Résistance à la magie": "8",
        "Survie": "11",
        "Vigilance": "9",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Force écrasante, Saignement (75 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "4d6+5",
          "effect": "Force écrasante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Graisse d’ours (1d6)",
        "Os de bête (2d6)",
        "Peau d’ours (1d6/2)",
        "Viande crue (3d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Nyctalopie",
        "Traque olfactive",
        "Résistance (C)",
        "Frappe brutale"
      ]
    }
  },
  {
    "id": "monster-grizzly-bear",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Ours gris",
      "en": "Grizzly Bear"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "450 couronnes",
      "en": "450 crowns"
    },
    "armor": {
      "fr": "14",
      "en": "14"
    },
    "size": {
      "fr": "1,75 m",
      "en": "1.75 m"
    },
    "weight": {
      "fr": "600 kg",
      "en": "600 kg"
    },
    "environments": [
      "forests",
      "skellige"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par deux",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Plus massifs et territoriaux que les ours communs, ces ours gris des forêts profondes et de Skellige affrontent fréquemment des monstres de la Conjonction.",
        "Armure améliorée (PA 14), résistance au perforant, tranchant et contondant, base d’attaque de 17 (14 pour Frappe brutale)."
      ],
      "en": [
        "Larger and fiercely territorial compared to common bears, grizzlies in deep forests and Skellige regularly battle Conjunction monsters.",
        "Upgraded armor (14 SP), resistance to piercing, slashing, and bludgeoning damage, and attack base 17 (14 for Heavy Strike)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "12",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "4",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "6",
        "Courage": "9",
        "Esquive/Évasion": "6",
        "Furtivité": "2",
        "Intimidation": "9",
        "Physique": "8",
        "Résilience": "4",
        "Résistance à la magie": "8",
        "Survie": "1",
        "Vigilance": "11",
        "Mêlée": "10"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Force écrasante, Saignement (75 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "4d6+5",
          "effect": "Force écrasante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Graisse d’ours (1d6)",
        "Os de bête (2d6)",
        "Peau d’ours (1d6/2)",
        "Viande crue (3d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Nyctalopie",
        "Traque olfactive",
        "Résistance (P,T,C)",
        "Frappe brutale"
      ]
    }
  },
  {
    "id": "monster-panther",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Panthère",
      "en": "Panther"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "20 couronnes",
      "en": "20 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "0,75 m",
      "en": "0.75 m"
    },
    "weight": {
      "fr": "78 kg",
      "en": "78 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par deux",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "7",
        "COR": "5",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "5",
        "Courage": "8",
        "Esquive/Évasion": "5",
        "Furtivité": "10",
        "Intimidation": "6",
        "Physique": "8",
        "Résilience": "7",
        "Résistance à la magie": "4",
        "Survie": "13",
        "Vigilance": "14",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "4d6+4",
          "effect": "Fia:10",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "2d6+2",
          "effect": "Fia:10, Saignement (30 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Os de bête (1d6)",
        "Peau de panthère (1d6/3)",
        "Viande crue (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Nyctalopie",
        "Bond",
        "Grimpeur agile"
      ]
    }
  },
  {
    "id": "monster-great-cat",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Grand chat",
      "en": "Great Cat"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "20 couronnes",
      "en": "20 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "0,75 m",
      "en": "0.75 m"
    },
    "weight": {
      "fr": "78 kg",
      "en": "78 kg"
    },
    "environments": [
      "nilfgaard"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par deux",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Félins du sud nilfgaardien plus imposants que les panthères, capables de désarçonner des chevaliers en un bond.",
        "Armure améliorée (PA 5), griffes équilibrées à 3d6+2, morsure à 5d6+4 (50 % Saignement), base d’attaque 17."
      ],
      "en": [
        "Southern Nilfgaardian predators larger than panthers, famed for ambushing merchant caravans and leaping knights from their saddles.",
        "Upgraded armor (5 SP), balanced claws (3d6+2), bite (5d6+4, 50% Bleed), and attack base 17."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "8",
        "DEX": "7",
        "COR": "5",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "5",
        "Courage": "8",
        "Esquive/Évasion": "5",
        "Furtivité": "10",
        "Intimidation": "6",
        "Physique": "8",
        "Résilience": "7",
        "Résistance à la magie": "4",
        "Survie": "13",
        "Vigilance": "14",
        "Mêlée": "10"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "5d6+4",
          "effect": "Fia:10, Saignement (50 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "3d6+2",
          "effect": "Fia:10, Saignement (30 %), équilibrée",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Os de bête (1d6)",
        "Peau de panthère (1d6/3)",
        "Viande crue (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Nyctalopie",
        "Bond",
        "Grimpeur agile"
      ]
    }
  },
  {
    "id": "monster-boar",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Sanglier",
      "en": "Boar"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "10 couronnes",
      "en": "10 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "1 m",
      "en": "1 m"
    },
    "weight": {
      "fr": "90 kg",
      "en": "90 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Compagnie de 2 à 6 individus",
      "en": "Sounder of 2 to 6 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "5",
        "DEX": "4",
        "COR": "8",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "15",
        "SAUT": "3",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "2",
        "Courage": "10",
        "Esquive/Évasion": "5",
        "Furtivité": "6",
        "Intimidation": "4",
        "Physique": "4",
        "Résilience": "5",
        "Résistance à la magie": "2",
        "Survie": "8",
        "Vigilance": "6",
        "Mêlée": "6"
      },
      "weapons": [
        {
          "name": "Défenses",
          "damage": "3d6",
          "effect": "Fia:15, Saignement(30%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Défense de sanglier (1d6/3)",
        "Peau de sanglier (1d6/3)",
        "Viande crue (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Traque olfactive",
        "Charge furieuse"
      ]
    }
  },
  {
    "id": "monster-war-boar",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Sanglier de guerre",
      "en": "War Boar"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "10 couronnes",
      "en": "10 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "1 m",
      "en": "1 m"
    },
    "weight": {
      "fr": "90 kg",
      "en": "90 kg"
    },
    "environments": [
      "skellige"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Compagnie de 2 à 6 individus",
      "en": "Sounder of 2 to 6 individuals"
    },
    "notes": {
      "fr": [
        "Dressés notamment à Skellige pour briser les lignes ennemies et saper le moral.",
        "Armure améliorée (PA 10), coup de défense à 4d6 et Charge furieuse à 6d6 (base 15)."
      ],
      "en": [
        "Trained especially in Skellige to shatter enemy formations and break morale on the battlefield.",
        "Upgraded armor (10 SP), tusk strike (4d6), and Furious Charge (6d6), both at attack base 15."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "5",
        "DEX": "4",
        "COR": "8",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "15",
        "SAUT": "3",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "2",
        "Courage": "10",
        "Esquive/Évasion": "5",
        "Furtivité": "6",
        "Intimidation": "4",
        "Physique": "4",
        "Résilience": "5",
        "Résistance à la magie": "2",
        "Survie": "8",
        "Vigilance": "6",
        "Mêlée": "10"
      },
      "weapons": [
        {
          "name": "Défenses",
          "damage": "4d6",
          "effect": "Fia:15, Saignement(30%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Défense de sanglier (1d6/3)",
        "Peau de sanglier (1d6/3)",
        "Viande crue (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Traque olfactive",
        "Charge furieuse"
      ]
    }
  },
  {
    "id": "monster-botchling",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Couvin",
      "en": "Botchling"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "0,3 m",
      "en": "0.3 m"
    },
    "weight": {
      "fr": "3,5 kg",
      "en": "3.5 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Transformation possible : Sommeillard ou Forme de combat."
      ],
      "en": [
        "Can transform into: Lubberkin or Combat Form."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "8",
        "DEX": "9",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "9",
        "Courage": "8",
        "Esquive/Évasion": "8",
        "Furtivité": "7",
        "Intimidation": "6",
        "Physique": "10",
        "Résilience": "9",
        "Résistance à la magie": "7",
        "Survie": "9",
        "Vigilance": "13",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "3d6",
          "effect": "Perforation améliorée, Drain de sang",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6+4",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Cerveau de couvin (1)",
        "Oreille de couvin (1d6/3)",
        "Os de couvin (1d6)",
        "Sang de couvin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Sang noir (potion)"
      ],
      "abilities": [
        "Nyctalopie",
        "Drain de force vitale",
        "Drain de sang"
      ]
    }
  },
  {
    "id": "monster-botchling-combat",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Couvin (forme de combat)",
      "en": "Botchling (Combat Form)"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "0,3 m",
      "en": "0.3 m"
    },
    "weight": {
      "fr": "3,5 kg",
      "en": "3.5 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Après s’être nourri ou s’il est menacé, se métamorphose en 1 tour complet : +2 RÉF/DEX/VIT, +3 COR, attaques de griffes et piquants corporels (2d6 dégâts au torse sur prise et 1 point d’ablation aux armes ; rétractés s’il est étourdi).",
        "Axii ou Manipulation de l’esprit (SD 18, puis SD 25 s’il est ensuite attaqué) permet de lui rendre sa forme d’origine."
      ],
      "en": [
        "After drinking blood or when threatened, takes a full turn to transform: +2 REF/DEX/SPD, +3 BODY, claw attacks, and spines (2d6 torso damage to grapplers and 1 weapon ablation; retracted if stunned).",
        "Axii or Mind Manipulation (DC 18, rising to DC 25 if attacked afterward) can force it back into its base form."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "11",
        "COR": "8",
        "VIT": "9",
        "EMP": "1",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "9",
        "Courage": "8",
        "Esquive/Évasion": "8",
        "Furtivité": "7",
        "Intimidation": "6",
        "Physique": "10",
        "Résilience": "9",
        "Résistance à la magie": "7",
        "Survie": "9",
        "Vigilance": "13",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "3d6",
          "effect": "Perforation améliorée, Drain de sang",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6+4",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Cerveau de couvin (1)",
        "Oreille de couvin (1d6/3)",
        "Os de couvin (1d6)",
        "Sang de couvin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Sang noir (potion)"
      ],
      "abilities": [
        "Nyctalopie",
        "Drain de force vitale",
        "Drain de sang"
      ]
    }
  },
  {
    "id": "monster-lubberkin",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Sommeillard",
      "en": "Lubberkin"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "0,3 m",
      "en": "0.3 m"
    },
    "weight": {
      "fr": "3,5 kg",
      "en": "3.5 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Né du rituel elfique d’Aymm Rhoin accompli par un parent sur un couvin enterré. Devient un esprit gardien amical et incorporel (vol 8 m), mais perd sa forme de combat et ses drains de vie/sang."
      ],
      "en": [
        "Created when a parent performs the elven naming ritual of Aymm Rhoin over a buried botchling. Becomes a friendly, incorporeal guardian spirit (8 m flight) and loses combat form and drain abilities."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "8",
        "DEX": "9",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "9",
        "Courage": "8",
        "Esquive/Évasion": "8",
        "Furtivité": "7",
        "Intimidation": "6",
        "Physique": "10",
        "Résilience": "9",
        "Résistance à la magie": "7",
        "Survie": "9",
        "Vigilance": "13",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "3d6",
          "effect": "Perforation améliorée, Drain de sang",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6+4",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Cerveau de couvin (1)",
        "Oreille de couvin (1d6/3)",
        "Os de couvin (1d6)",
        "Sang de couvin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Sang noir (potion)"
      ],
      "abilities": [
        "Nyctalopie",
        "Drain de force vitale",
        "Drain de sang"
      ]
    }
  },
  {
    "id": "monster-brown-archespore",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Ékinoppyre brune",
      "en": "Brown Archespore"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "68 kg",
      "en": "68 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Entre 3 et 5 plants",
      "en": "Between 3 and 5 bulbs"
    },
    "notes": {
      "fr": [
        "L’ékinoppyre brune est la plus faible des variétés d’ékinoppyres."
      ],
      "en": [
        "The brown archespore is the weakest of the archespore variants."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "5",
        "COR": "5",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "0",
        "END": "25",
        "ENC": "5",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "3",
        "Bagarre": "3",
        "Courage": "5",
        "Esquive/Évasion": "6",
        "Furtivité": "5",
        "Intimidation": "4",
        "Physique": "3",
        "Résilience": "5",
        "Résistance à la magie": "5",
        "Survie": "7",
        "Vigilance": "8",
        "Mêlée": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6+2",
          "effect": "Allonge",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Jus d’ékinoppyre (1d6/2)",
        "Vrille d’ékinoppyre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Feu",
        "Enracinée"
      ],
      "abilities": [
        "Immunités (poison)",
        "Camouflage",
        "Crachat acide",
        "Enfouissement",
        "Cosse explosive"
      ]
    }
  },
  {
    "id": "monster-green-archespore",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Ékinoppyre verte",
      "en": "Green Archespore"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "68 kg",
      "en": "68 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Entre 3 et 5 plants",
      "en": "Between 3 and 5 bulbs"
    },
    "notes": {
      "fr": [
        "Variété plus robuste que l’ékinoppyre brune."
      ],
      "en": [
        "Stronger variant than the brown archespore."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "5",
        "COR": "5",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "0",
        "END": "25",
        "ENC": "5",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Bagarre": "5",
        "Courage": "5",
        "Esquive/Évasion": "8",
        "Furtivité": "5",
        "Intimidation": "4",
        "Physique": "3",
        "Résilience": "5",
        "Résistance à la magie": "5",
        "Survie": "7",
        "Vigilance": "8",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6+2",
          "effect": "Allonge, Empoisonnement (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Jus d’ékinoppyre (1d6/2)",
        "Vrille d’ékinoppyre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Feu",
        "Enracinée"
      ],
      "abilities": [
        "Immunités (poison)",
        "Camouflage",
        "Crachat acide",
        "Enfouissement",
        "Cosse explosive"
      ]
    }
  },
  {
    "id": "monster-purple-archespore",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Ékinoppyre violette",
      "en": "Purple Archespore"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "30 couronnes",
      "en": "30 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "68 kg",
      "en": "68 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Entre 3 et 5 plants",
      "en": "Between 3 and 5 bulbs"
    },
    "notes": {
      "fr": [
        "Variété supérieure à l’ékinoppyre brune."
      ],
      "en": [
        "More dangerous variant than the brown archespore."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "5",
        "COR": "5",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "0",
        "END": "25",
        "ENC": "5",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "3",
        "Bagarre": "3",
        "Courage": "5",
        "Esquive/Évasion": "6",
        "Furtivité": "5",
        "Intimidation": "4",
        "Physique": "3",
        "Résilience": "5",
        "Résistance à la magie": "5",
        "Survie": "7",
        "Vigilance": "8",
        "Mêlée": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6+2",
          "effect": "Allonge",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Jus d’ékinoppyre (1d6/2)",
        "Vrille d’ékinoppyre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Feu",
        "Enracinée"
      ],
      "abilities": [
        "Immunités (poison)",
        "Camouflage",
        "Crachat acide",
        "Enfouissement",
        "Cosse explosive"
      ]
    }
  },
  {
    "id": "monster-wendigo",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Vendigo",
      "en": "Wendigo"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500 couronnes",
      "en": "1,500 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "3,5 m",
      "en": "3.5 m"
    },
    "weight": {
      "fr": "110 kg",
      "en": "110 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "9",
        "DEX": "11",
        "COR": "10",
        "VIT": "9",
        "EMP": "1",
        "TECH": "2",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "27",
        "SAUT": "5",
        "END": "50",
        "ENC": "100",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "7",
        "Courage": "8",
        "Esquive/Évasion": "7",
        "Envoûtement": "7",
        "Furtivité": "8",
        "Intimidation": "7",
        "Physique": "8",
        "Résilience": "9",
        "Résistance à la magie": "8",
        "Survie": "13",
        "Vigilance": "11",
        "Mêlée": "11"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "7d6",
          "effect": "Maladie (60 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6+4",
          "effect": "Saignement (50 %), Maladie (25 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Coeur de vendigo (1)",
        "Essence cristallisée (1d6/2)",
        "Essence de mort (2d6)",
        "Peau de vendigo (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "bombes au dimeritium",
        "bombes Poussière de lune",
        "Peur du feu"
      ],
      "abilities": [
        "Immunités (Charme, gel, maladie, contrainte, neige et glace)",
        "Invocation de blizzard",
        "Nourriture avariée",
        "Malédiction du vendigo"
      ]
    }
  },
  {
    "id": "monster-harpy",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Harpie",
      "en": "Harpy"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "15 couronnes",
      "en": "15 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1,5 m",
      "en": "1.5 m"
    },
    "weight": {
      "fr": "60 kg",
      "en": "60 kg"
    },
    "environments": [
      "mountains",
      "marine"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Nuée de 4 à 8 individus",
      "en": "Flock of 4 to 8 individuals"
    },
    "notes": {
      "fr": [
        "Les nuées de harpies peuvent être menées par une harpie célénos (bonus +2 en Intelligence et base 13 en Résistance à la contrainte)."
      ],
      "en": [
        "Flocks of harpies may be led by a celaeno harpy (+2 Intelligence and base 13 Resist Coercion)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "5",
        "COR": "5",
        "VIT": "3",
        "EMP": "2",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "9",
        "SAUT": "1",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "2",
        "Bagarre": "9",
        "Courage": "5",
        "Esquive/Évasion": "2",
        "Furtivité": "6",
        "Intimidation": "4",
        "Physique": "5",
        "Résilience": "2",
        "Résistance à la magie": "4",
        "Survie": "12",
        "Vigilance": "13",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Serres",
          "damage": "2d6+4",
          "effect": "Fia:10",
          "attacksPerTurn": "1"
        },
        {
          "name": "Battement d'ailes",
          "damage": "1d6+2",
          "effect": "Stupéfaction (30 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Plume de harpie (1d6)",
        "Serre de harpie (1d6/3)",
        "OEuf de harpie (Nid) (1d6/2)",
        "Objets communs (Nid) (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Vol"
      ]
    }
  },
  {
    "id": "monster-celaeno-harpy",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Harpie célénos",
      "en": "Celaeno Harpy"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "15 couronnes",
      "en": "15 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1,5 m",
      "en": "1.5 m"
    },
    "weight": {
      "fr": "60 kg",
      "en": "60 kg"
    },
    "environments": [
      "mountains",
      "marine"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Nuée de 4 à 8 individus",
      "en": "Flock of 4 to 8 individuals"
    },
    "notes": {
      "fr": [
        "Mène souvent les nuées de harpies (+2 Intelligence, base 13 en Résistance à la contrainte).",
        "Vole les rêves d’une cible endormie à moins de 4 m (1 tour complet) pour les enfermer dans un cristal de rêve (Focus de valeur 1, ou 3 pour un songe puissant). Butin : +1d6/2 essence cristallisée et +1d6/2 cristal de rêve."
      ],
      "en": [
        "Often leads harpy flocks (+2 Intelligence, base 13 Resist Coercion).",
        "Steals dreams from a sleeper within 4 m (full turn) to craft a dream crystal (Focus value 1, or 3 for a potent dream). Drops +1d6/2 crystallized essence and +1d6/2 dream crystals."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "4",
        "DEX": "5",
        "COR": "5",
        "VIT": "3",
        "EMP": "2",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "9",
        "SAUT": "1",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "2",
        "Bagarre": "9",
        "Courage": "5",
        "Esquive/Évasion": "2",
        "Furtivité": "6",
        "Intimidation": "4",
        "Physique": "5",
        "Résilience": "2",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "4",
        "Survie": "12",
        "Vigilance": "13",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Serres",
          "damage": "2d6+4",
          "effect": "Fia:10",
          "attacksPerTurn": "1"
        },
        {
          "name": "Battement d'ailes",
          "damage": "1d6+2",
          "effect": "Stupéfaction (30 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Plume de harpie (1d6)",
        "Serre de harpie (1d6/3)",
        "OEuf de harpie (Nid) (1d6/2)",
        "Objets communs (Nid) (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Vol",
        "Dérober les songes"
      ]
    }
  },
  {
    "id": "monster-manticore",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Manticore",
      "en": "Manticore"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 600 couronnes",
      "en": "1,600 crowns"
    },
    "armor": {
      "fr": "15",
      "en": "15"
    },
    "size": {
      "fr": "1,75 m",
      "en": "1.75 m"
    },
    "weight": {
      "fr": "204 kg",
      "en": "204 kg"
    },
    "environments": [
      "mountains",
      "forests"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "12",
        "DEX": "10",
        "COR": "15",
        "VIT": "10",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "6",
        "END": "55",
        "ENC": "150",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "6",
        "Courage": "14",
        "Esquive/Évasion": "5",
        "Furtivité": "7",
        "Intimidation": "11",
        "Physique": "8",
        "Résilience": "6",
        "Résistance à la magie": "12",
        "Survie": "15",
        "Vigilance": "15",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffe",
          "damage": "5d6+1",
          "effect": "Saignement (75 %)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Queue empoisonnée",
          "damage": "6d6+3",
          "effect": "Allonge, Poison de Bohun Upas",
          "attacksPerTurn": "1"
        },
        {
          "name": "Battement d'ailes",
          "damage": "4d6",
          "effect": "Renversement (50 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Corne de manticore (1d6/3)",
        "Croc de manticore (1d6/2)",
        "Estomac de manticore (1)",
        "Membrane d’aile de manticore (2d6)",
        "Poison de Bohun Upas (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Immunités (Poison)",
        "Nyctalopie",
        "Traque olfactive",
        "Bond",
        "Vol",
        "Poison de Bohun Upas",
        "Attaque en piqué"
      ]
    }
  },
  {
    "id": "monster-succubus",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Succube",
      "en": "Succubus"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "400 couronnes",
      "en": "400 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1,8 m",
      "en": "1.8 m"
    },
    "weight": {
      "fr": "80 kg",
      "en": "80 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Créatures douées de raison avec lesquelles il est facile de négocier, mais souvent responsables d’incidents « mémorables » auprès des sorceleurs imprudents."
      ],
      "en": [
        "Sapient hybrids easily reasoned and bargained with, though careless witchers have often suffered “memorable” entanglements while dealing with succubi and incubi."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "7",
        "DEX": "8",
        "COR": "12",
        "VIT": "6",
        "EMP": "10",
        "TECH": "4",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "18",
        "SAUT": "3",
        "END": "150",
        "ENC": "120",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Adresse": "2",
        "Athlétisme": "7",
        "Bagarre": "9",
        "Charisme": "5",
        "Courage": "7",
        "Esquive/Évasion": "7",
        "Déguisement": "6",
        "Furtivité": "4",
        "Intimidation": "4",
        "Persuasion": "4",
        "Physique": "6",
        "Résilience": "2",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "8",
        "Séduction": "8",
        "Survie": "4",
        "Vigilance": "7",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Coup de boule",
          "damage": "5d6",
          "effect": "-3 Précision, Étourdissement (–2), Force écrasante",
          "attacksPerTurn": "1"
        },
        {
          "name": "Coup de sabot",
          "damage": "4d6+4",
          "effect": "Renversement (50 %), Force écrasante",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poing",
          "damage": "3d6+3",
          "effect": "Force écrasante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Coeur de succube (1)",
        "Corne de succube (1d6/3)",
        "Poussière imprégnée (2d6)",
        "Objets communs (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Bombes au dimeritium",
        "Désir insatiable"
      ],
      "abilities": [
        "Immunités (Charmes magiques)",
        "Jet de flammes",
        "Boule de feu"
      ]
    }
  },
  {
    "id": "monster-barbegazi",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Barbegazi",
      "en": "Barbegazi"
    },
    "threat": {
      "fr": "Faible Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "15 couronnes",
      "en": "15 crowns"
    },
    "armor": {
      "fr": "3",
      "en": "3"
    },
    "size": {
      "fr": "1 m",
      "en": "1 m"
    },
    "weight": {
      "fr": "25 kg",
      "en": "25 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Colonies de 4 à 10 individus",
      "en": "Colonies of 4 to 10 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "4",
        "DEX": "4",
        "COR": "5",
        "VIT": "4",
        "EMP": "1",
        "TECH": "1",
        "VOL": "3",
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
        "Athlétisme": "3",
        "Bagarre": "5",
        "Courage": "6",
        "Esquive/Évasion": "6",
        "Furtivité": "7",
        "Intimidation": "5",
        "Physique": "3",
        "Résilience": "4",
        "Résistance à la magie": "5",
        "Survie": "8",
        "Vigilance": "8",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6+3",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "1d6+5",
          "effect": "Saignement (25 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chitine (1d6)",
        "Fourrure de barbegazi (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes"
      ],
      "abilities": [
        "Immunités (Gel, neige et glace)",
        "Résistances (T)",
        "Nyctalopie améliorée",
        "Camouflage",
        "Imitation"
      ]
    }
  },
  {
    "id": "monster-frightener",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Épouvanteur",
      "en": "Frightener"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "2 000 couronnes",
      "en": "2,000 crowns"
    },
    "armor": {
      "fr": "30",
      "en": "30"
    },
    "size": {
      "fr": "4,5 m",
      "en": "4.5 m"
    },
    "weight": {
      "fr": "3 000 kg",
      "en": "3,000 kg"
    },
    "environments": [
      "mountains",
      "deserts"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "9",
        "DEX": "7",
        "COR": "18",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "24",
        "SAUT": "8",
        "END": "60",
        "ENC": "180",
        "RÉC": "12",
        "PS": "120",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "2",
        "Bagarre": "7",
        "Courage": "0",
        "Esquive/Évasion": "6",
        "Furtivité": "3",
        "Intimidation": "10",
        "Physique": "7",
        "Résilience": "4",
        "Résistance à la magie": "11",
        "Survie": "14",
        "Vigilance": "15",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "8d6+4",
          "effect": "Allonge, Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "OEil d’épouvanteur (1d6/2)",
        "Griffe d’épouvanteur (1d6/3)",
        "Chitine (3d6)",
        "Cinquième essence (1d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Ouïe sensible",
        "Vulnérable à l’acier"
      ],
      "abilities": [
        "Immunités (Saignement, Feu, Gel, Étourdissement, Poison, Aveuglement, Peur, Charme, Chaleur extrême)",
        "Résistances (T,P,C)",
        "Nyctalopie améliorée",
        "Avantage de la hauteur",
        "Camouflage"
      ]
    }
  },
  {
    "id": "monster-giant-centipede",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Scolopendromorphe",
      "en": "Giant Centipede"
    },
    "threat": {
      "fr": "Faible Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "20 couronnes",
      "en": "20 crowns"
    },
    "armor": {
      "fr": "8 (3)",
      "en": "8 (3)"
    },
    "size": {
      "fr": "4,5 m",
      "en": "4.5 m"
    },
    "weight": {
      "fr": "200 kg",
      "en": "200 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Groupes de 3 à 6 individus",
      "en": "Groups of 3 to 6 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "5",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "18",
        "SAUT": "3",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Bagarre": "3",
        "Courage": "5",
        "Esquive/Évasion": "3",
        "Furtivité": "2",
        "Intimidation": "4",
        "Physique": "4",
        "Résilience": "4",
        "Résistance à la magie": "5",
        "Survie": "6",
        "Vigilance": "7",
        "Mêlée": "4"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "3d6",
          "effect": "Poison (30 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Mandibule de scolopendromorphe (1d6/3)",
        "Sécrétions de scolopendromorphe (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Abdomen mou",
        "Sensible aux vibrations"
      ],
      "abilities": [
        "Immunités (Saignement)",
        "Nyctalopie",
        "Enfouissement",
        "Roulé en boule",
        "Projection d’acide"
      ]
    }
  },
  {
    "id": "monster-fire-elemental",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de feu",
      "en": "Fire Elemental"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 600 couronnes",
      "en": "1,600 crowns"
    },
    "armor": {
      "fr": "15",
      "en": "15"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "2 700 kg",
      "en": "2,700 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "6",
        "COR": "11",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "15",
        "SAUT": "3",
        "END": "50",
        "ENC": "100",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "5",
        "Courage": "0",
        "Esquive/Évasion": "7",
        "Furtivité": "1",
        "Intimidation": "3",
        "Physique": "9",
        "Résilience": "7",
        "Résistance à la magie": "6",
        "Survie": "6",
        "Vigilance": "8",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "5d6",
          "effect": "Feu (50 %), Force écrasante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence de feu (2d6)",
        "Gemme (1d6/2)",
        "Pierre d’élémentaire (1)",
        "Pierre runique Dazhbog (1)"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Magie de l’eau",
        "Étouffer les flammes"
      ],
      "abilities": [
        "Immunités (Saignement, Poison, Renversement, Peur, Charmes magiques, Feu, Maladie, Contrainte)",
        "Aura de fournaise",
        "Cercle de flammes",
        "Étouffer les flammes",
        "Mangeur de feu",
        "Piétinement enflammé"
      ]
    }
  },
  {
    "id": "monster-ice-elemental",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de glace",
      "en": "Ice Elemental"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 600 couronnes",
      "en": "1,600 crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "2 700 kg",
      "en": "2,700 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "5",
        "COR": "13",
        "VIT": "3",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "15",
        "SAUT": "3",
        "END": "55",
        "ENC": "130",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "4",
        "Courage": "0",
        "Esquive/Évasion": "8",
        "Furtivité": "2",
        "Intimidation": "2",
        "Physique": "9",
        "Résilience": "7",
        "Résistance à la magie": "4",
        "Survie": "6",
        "Vigilance": "8",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "8d6",
          "effect": "Force écrasante, Gel (50 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence d'eau (2d6)",
        "Gemme (1d6/2)",
        "Pierre d’élémentaire (1)",
        "Pierre runique Zoria (1)"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Feu"
      ],
      "abilities": [
        "Immunités (Saignement, Poison, Renversement, Peur, Charmes magiques, Gel, Maladie, Contrainte)",
        "Cercle de glace",
        "Geler l’eau",
        "Vague de glace"
      ]
    }
  },
  {
    "id": "monster-earth-elemental",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de terre",
      "en": "Earth Elemental"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 600 couronnes",
      "en": "1,600 crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "2 700 kg",
      "en": "2,700 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "5",
        "COR": "13",
        "VIT": "3",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "15",
        "SAUT": "3",
        "END": "55",
        "ENC": "130",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "4",
        "Courage": "0",
        "Esquive/Évasion": "8",
        "Furtivité": "2",
        "Intimidation": "2",
        "Physique": "9",
        "Résilience": "7",
        "Résistance à la magie": "4",
        "Survie": "6",
        "Vigilance": "8",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "8d6",
          "effect": "Force écrasante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Météorite (2d6)",
        "Gemme (1d6/2)",
        "Pierre d’élémentaire (1)",
        "Pierre runique Chernobog (1)"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Feu"
      ],
      "abilities": [
        "Immunités (Saignement, Poison, Renversement, Peur, Charmes magiques, Maladie, Contrainte)",
        "Résistance (Feu)",
        "Cercle de pierres",
        "Lancer de rocher",
        "Piétinement déchaîné"
      ]
    }
  },
  {
    "id": "monster-godling",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Célicole",
      "en": "Godling"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "20 couronnes",
      "en": "20 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1 m",
      "en": "1 m"
    },
    "weight": {
      "fr": "22 kg",
      "en": "22 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "8",
        "DEX": "9",
        "COR": "3",
        "VIT": "8",
        "EMP": "7",
        "TECH": "4",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "24",
        "SAUT": "4",
        "END": "20",
        "ENC": "30",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Bagarre": "-2",
        "Charisme": "7",
        "Courage": "4",
        "Adresse": "4",
        "Esquive/Évasion": "5",
        "Furtivité": "7",
        "Intimidation": "1",
        "Persuasion": "6",
        "Physique": "2",
        "Psychologie": "5",
        "Résilience": "5",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "4",
        "Survie": "12",
        "Vigilance": "8",
        "Mêlée": "0"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "1d6-2",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "OEil de célicole (1d6/3)",
        "Objets communs (1d6)",
        "Objets étranges (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vestiges",
        "Bombes au dimeritium",
        "Allergie à la bardane"
      ],
      "abilities": [
        "Nyctalopie",
        "Langage animal",
        "Nourriture avariée",
        "Odeur sauvage",
        "Tisseur de cauchemars"
      ]
    }
  },
  {
    "id": "monster-leshen",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Leshen",
      "en": "Leshen"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500 couronnes",
      "en": "1,500 crowns"
    },
    "armor": {
      "fr": "16",
      "en": "16"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "136 kg",
      "en": "136 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "9",
        "DEX": "9",
        "COR": "12",
        "VIT": "5",
        "EMP": "4",
        "TECH": "2",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "15",
        "SAUT": "3",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "3",
        "Bagarre": "7",
        "Courage": "9",
        "Envoûtement": "10",
        "Esquive/Évasion": "7",
        "Furtivité": "9",
        "Intimidation": "5",
        "Physique": "6",
        "Résilience": "5",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "8",
        "Survie": "10",
        "Vigilance": "9",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "7d6",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Fibre de leshen (2d6)",
        "Os de leshen (2d6)",
        "Résine de leshen (1d6)",
        "Essence cristallisée (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les vestiges",
        "Bombes au dimeritium",
        "Bombes Poussière de lune",
        "Feu"
      ],
      "abilities": [
        "Nyctalopie",
        "Résistances (T)",
        "Immunités (Charmes magiques)",
        "Création de totems",
        "Évaporation",
        "Racine fouetteuse",
        "Roi des animaux"
      ]
    }
  },
  {
    "id": "monster-shaelmaar",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Shaelmaar",
      "en": "Shaelmaar"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "500 couronnes",
      "en": "500 crowns"
    },
    "armor": {
      "fr": "20 (0)",
      "en": "20 (0)"
    },
    "size": {
      "fr": "2 m",
      "en": "2 m"
    },
    "weight": {
      "fr": "2 000 kg",
      "en": "2,000 kg"
    },
    "environments": [
      "mountains",
      "caves"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "4",
        "COR": "12",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "15",
        "SAUT": "3",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Bagarre": "6",
        "Courage": "10",
        "Esquive/Évasion": "8",
        "Furtivité": "8",
        "Intimidation": "5",
        "Physique": "8",
        "Résilience": "6",
        "Résistance à la magie": "9",
        "Survie": "7",
        "Vigilance": "12",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6+2",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Poils de shaelmaar (1d6)",
        "Poussière de shaelmaar (1d6)",
        "Chitine (2d6)",
        "Pierre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vestiges",
        "Abdomen mou",
        "Aveugle"
      ],
      "abilities": [
        "Nyctalopie",
        "Résistances (T)",
        "Immunités (Renversement, Aveuglement)",
        "Enfouissement",
        "Toupie sismique",
        "Roulade écrasante"
      ]
    }
  },
  {
    "id": "monster-cyclops",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Cyclope",
      "en": "Cyclops"
    },
    "threat": {
      "fr": "Fort Simple",
      "en": "Hard Simple"
    },
    "reward": {
      "fr": "1 200 couronnes",
      "en": "1,200 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "6 m",
      "en": "6 m"
    },
    "weight": {
      "fr": "3 000 kg",
      "en": "3,000 kg"
    },
    "environments": [
      "mountains",
      "plains"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "7",
        "DEX": "6",
        "COR": "15",
        "VIT": "6",
        "EMP": "4",
        "TECH": "5",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "18",
        "SAUT": "6",
        "END": "110",
        "ENC": "300",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "9",
        "Courage": "10",
        "Esquive/Évasion": "9",
        "Furtivité": "4",
        "Intimidation": "8",
        "Physique": "10",
        "Résilience": "7",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "7",
        "Survie": "8",
        "Vigilance": "10",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Massue",
          "damage": "7d6+8",
          "effect": "[Mêlée], Allonge, Étourdissement (–2), Force écrasante, Renversement (75%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Poings",
          "damage": "6d6",
          "effect": "[Bagarre], Allonge, Force écrasante, Renversement (50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Cerveau de cyclope (1)",
        "Langue de cyclope (1)",
        "OEil de cyclope (1)",
        "Os de cyclope (3d6)",
        "Essence cristallisée (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes"
      ],
      "abilities": [
        "Immunités (Renversement,Stupéfaction)",
        "Balayage",
        "Charge sauvage",
        "Choc sismique",
        "Confusion",
        "Différence de taille"
      ]
    }
  },
  {
    "id": "monster-knocker",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Frappeur",
      "en": "Knocker"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "25 couronnes",
      "en": "25 crowns"
    },
    "armor": {
      "fr": "3",
      "en": "3"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "450 kg",
      "en": "450 kg"
    },
    "environments": [
      "mountains",
      "caves"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Groupes de 2 à 6 individus",
      "en": "Groups of 2 to 6 individuals"
    },
    "notes": {
      "fr": [
        "Fréquents dans les mines de Mahakam, les frappeurs volent des outils, sabotent des passerelles ou posent des pièges de mine pour dérober de l’eau-de-vie aux mineurs. Le Signe d’Axii permet souvent d’ouvrir la négociation."
      ],
      "en": [
        "Common in Mahakam’s deep mines, knockers steal tools, sabotage catwalks, and rig tripwires to raid miners for spirits. A well-placed Axii sign often turns hostility into negotiation."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "6",
        "COR": "10",
        "VIT": "6",
        "EMP": "4",
        "TECH": "8",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "18",
        "SAUT": "3",
        "END": "80",
        "ENC": "200",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Artisanat": "6",
        "Athlétisme": "8",
        "Bagarre": "7",
        "Courage": "8",
        "Duperie": "11",
        "Esquive/Évasion": "9",
        "Fabrication de pièges": "8",
        "Furtivité": "8",
        "Intimidation": "8",
        "Langue commune": "6",
        "Gobelin": "6",
        "Persuasion": "7",
        "Physique": "7",
        "Résilience": "5",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "7",
        "Survie": "10",
        "Vigilance": "8",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "2d6+4",
          "effect": "[Bagarre]",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Dent de frappeur (1d6/2)",
        "Orteil de frappeur (1d6)",
        "Poil de frappeur (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes"
      ],
      "abilities": [
        "Nyctalopie",
        "Traque olfactive",
        "Détection de minerais",
        "Galop"
      ]
    }
  },
  {
    "id": "monster-troll",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Troll",
      "en": "Troll"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "800 couronnes",
      "en": "800 crowns"
    },
    "armor": {
      "fr": "12",
      "en": "12"
    },
    "size": {
      "fr": "2,5 m",
      "en": "2.5 m"
    },
    "weight": {
      "fr": "500 kg",
      "en": "500 kg"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Bien que capables de négocier — souvent contre un peu de vodka ou de viande fraîche — certains trolls considèrent les voyageurs comme des proies. Dégainer une arme d’argent ou être bien escorté aide à imposer le respect."
      ],
      "en": [
        "Though willing to bargain—often for vodka or fresh meat—some trolls view travelers as food. Drawing a silver weapon or bringing armed company helps ensure serious negotiations."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "7",
        "DEX": "4",
        "COR": "14",
        "VIT": "4",
        "EMP": "6",
        "TECH": "9",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "12",
        "SAUT": "2",
        "END": "45",
        "ENC": "140",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Artisanat": "8",
        "Athlétisme": "6",
        "Bagarre": "7",
        "Courage": "11",
        "Esquive/Évasion": "7",
        "Furtivité": "8",
        "Intimidation": "10",
        "Langue commune": "6",
        "Persuasion": "3",
        "Physique": "4",
        "Résilience": "2",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "9",
        "Survie": "10",
        "Vigilance": "9",
        "Mêlée": "8"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "5d6+2",
          "effect": "[Bagarre], Étourdissement",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Foie de troll (1)",
        "Langue de troll (1)",
        "Peau de troll (1d6)",
        "Cuir (1d6)",
        "Fil (2d6)",
        "Objets communs (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Poison"
      ],
      "abilities": [
        "Nyctalopie",
        "Immunités (Renversement,Saignement)",
        "Régénération (3)",
        "Résistances (C,P)",
        "Lanceur de roche"
      ]
    }
  },
  {
    "id": "monster-cockatrice",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Cockatrix",
      "en": "Cockatrice"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "800 couronnes",
      "en": "800 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "2 m",
      "en": "2 m"
    },
    "weight": {
      "fr": "800 kg",
      "en": "800 kg"
    },
    "environments": [
      "mountains",
      "caves"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Très territoriales, les cockatrix ne chassent guère hors de leur domaine. Les contrats cachent souvent une route commerciale tracée dans leur zone ou la convoitise de leur plumage."
      ],
      "en": [
        "Strictly territorial, cockatrices rarely hunt beyond their territory. Contracts usually stem from trade roads encroaching on their domain or nobles coveting their iridescent plumage."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "8",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "4",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Bagarre": "9",
        "Courage": "12",
        "Esquive/Évasion": "7",
        "Furtivité": "6",
        "Intimidation": "11",
        "Physique": "5",
        "Résilience": "4",
        "Résistance à la magie": "10",
        "Survie": "12",
        "Vigilance": "14",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Poison (50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Serres",
          "damage": "4d6+3",
          "effect": "Saignement (50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Queue",
          "damage": "4d6+3",
          "effect": "Allonge, Saignement (50%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Battement d'ailes",
          "damage": "2d6",
          "effect": "Stupéfaction (25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Carapace de cockatrix (2d6)",
        "Estomac de cockatrix (1)",
        "Plume de cockatrix (1d6)",
        "Extrait de venin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Nyctalopie",
        "Résistances (Poison)",
        "Charge",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-phoenix",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Phénix",
      "en": "Phoenix"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "1 200 couronnes",
      "en": "1,200 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "3 m",
      "en": "3 m"
    },
    "weight": {
      "fr": "550 kg",
      "en": "550 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "9",
        "DEX": "10",
        "COR": "10",
        "VIT": "10",
        "EMP": "5",
        "TECH": "3",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "30",
        "SAUT": "6",
        "END": "45",
        "ENC": "100",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Bagarre": "6",
        "Courage": "9",
        "Esquive/Évasion": "8",
        "Furtivité": "4",
        "Intimidation": "7",
        "Persuasion": "8",
        "Physique": "5",
        "Résilience": "4",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "8",
        "Survie": "9",
        "Vigilance": "14",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Bec",
          "damage": "6d6",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Serres",
          "damage": "4d6",
          "effect": "Saignement (50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Battement d'ailes",
          "damage": "3d6",
          "effect": "Feu (50%), Stupéfaction (25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cendres de phénix (2d6)",
        "OEuf ou oisillon de phénix (1)",
        "Plume de phénix (1d6)",
        "Cinquième essence (1d6)",
        "Essence de feu (2d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides",
        "Bombes au dimeritium"
      ],
      "abilities": [
        "Nyctalopie",
        "Immunités (Feu, Gel)",
        "Déluge de feu",
        "Pluie de braises",
        "Renaissance",
        "Torrent de cendres",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-slyzard",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Slyzard",
      "en": "Slyzard"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 500 couronnes",
      "en": "1,500 crowns"
    },
    "armor": {
      "fr": "16",
      "en": "16"
    },
    "size": {
      "fr": "3 m",
      "en": "3 m"
    },
    "weight": {
      "fr": "950 kg",
      "en": "950 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "12",
        "DEX": "10",
        "COR": "11",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "24",
        "SAUT": "4",
        "END": "45",
        "ENC": "110",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "5",
        "Courage": "10",
        "Esquive/Évasion": "5",
        "Furtivité": "6",
        "Intimidation": "9",
        "Physique": "7",
        "Résilience": "6",
        "Résistance à la magie": "9",
        "Survie": "16",
        "Vigilance": "17",
        "Mêlée": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "7d6+2",
          "effect": "Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "6d6+2",
          "effect": "Saignement (50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Queue",
          "damage": "6d6",
          "effect": "Allonge, Force écrasante, Poison (75%), Saignement (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Corde vocale de slyzard (1d6/2)",
        "Écaille de slyzard (2d6)",
        "Extrait de venin (2d6)",
        "Griffe de slyzard (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Nyctalopie",
        "Résistances (T,P, Feu)",
        "Balayage",
        "Boule de feu",
        "Hurlement sonique",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-bruxa",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Brouxe",
      "en": "Bruxa"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "2 000 couronnes",
      "en": "2,000 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "1,75 m",
      "en": "1.75 m"
    },
    "weight": {
      "fr": "90 kg",
      "en": "90 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "14",
        "DEX": "14",
        "COR": "11",
        "VIT": "12",
        "EMP": "6",
        "TECH": "5",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "36",
        "SAUT": "7",
        "END": "45",
        "ENC": "110",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Bagarre": "9",
        "Charisme": "7",
        "Courage": "9",
        "Esquive/Évasion": "6",
        "Étiquette": "8",
        "Furtivité": "4",
        "Intimidation": "10",
        "Persuasion": "7",
        "Physique": "6",
        "Résilience": "5",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "10",
        "Séduction": "10",
        "Survie": "10",
        "Vigilance": "10",
        "Mêlée": "10"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "5d6+3",
          "effect": "Drain de sang, Perforation améliorée, Saignement(75%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "4d6+4",
          "effect": "Perforation, Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Sang de brouxe (1d6)",
        "Sels naezanniques (1d6/2)",
        "Crocs de vampire (1d6/2)",
        "Lymphe abominable (1d6/3)",
        "Lymphe abominable (1d6/3)",
        "Essence de mort (2d6)",
        "Objets communs (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "bombes Poussière de lune",
        "Feu"
      ],
      "abilities": [
        "Nyctalopie améliorée",
        "Résistances (Étourdissement, Saignement, Poison)",
        "Immunités (Scrutation magique)",
        "Affinité avec les oiseaux",
        "Drain de sang",
        "Hurlement sonique",
        "Invisibilité supérieure",
        "Télépathie",
        "Transformation : Beauté"
      ]
    }
  },
  {
    "id": "monster-garkain",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Garkain",
      "en": "Garkain"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "700 couronnes",
      "en": "700 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "2,25 m",
      "en": "2.25 m"
    },
    "weight": {
      "fr": "136 kg",
      "en": "136 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire ou par paire",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Nombre de meurtres atroces dans les cités populeuses sont l’œuvre de garkains. Il est fortement conseillé d’attendre l’aube avant de mener l’enquête."
      ],
      "en": [
        "Many notorious urban massacres have been traced to garkains stalking crowded districts. Investigators are strongly advised to wait for dawn before pursuing the trail."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "11",
        "DEX": "10",
        "COR": "8",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "24",
        "SAUT": "4",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Bagarre": "7",
        "Courage": "9",
        "Esquive/Évasion": "10",
        "Furtivité": "7",
        "Intimidation": "8",
        "Physique": "9",
        "Résilience": "8",
        "Résistance à la magie": "10",
        "Survie": "15",
        "Vigilance": "16",
        "Mêlée": "7"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "4d6+4",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Lymphe abominable (1d6/3)",
        "Membrane d’aile (1d6/3)",
        "Salive de garkain (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "Bombes au dimeritium",
        "Faiblesse astrale"
      ],
      "abilities": [
        "Nyctalopie",
        "Résistances (Étourdissement)",
        "Immunités (Peur)",
        "Attaque sautée",
        "Bond prodigieux",
        "Choc psychique"
      ]
    }
  },
  {
    "id": "monster-plumard",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Plumeur",
      "en": "Plumard"
    },
    "threat": {
      "fr": "Faible Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "15 couronnes",
      "en": "15 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "1 m",
      "en": "1 m"
    },
    "weight": {
      "fr": "4,5 kg",
      "en": "4.5 kg"
    },
    "environments": [
      "forests",
      "swamps"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Nuées de 6 à 12 individus",
      "en": "Swarms of 6 to 12 individuals"
    },
    "notes": {
      "fr": [
        "Bien que les plumeurs soient les plus faibles des vampires, une nuée entière répondant à la détresse d’un des siens peut décimer un manoir."
      ],
      "en": [
        "Though the weakest vampire breed, an entire swarm answering a captive plumard’s distress call can slaughter a manor’s garrison."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "5",
        "DEX": "6",
        "COR": "1",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "2",
        "COU": "21",
        "SAUT": "4",
        "END": "10",
        "ENC": "10",
        "RÉC": "2",
        "PS": "10",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "3",
        "Courage": "4",
        "Esquive/Évasion": "8",
        "Furtivité": "6",
        "Intimidation": "2",
        "Physique": "3",
        "Résilience": "5",
        "Résistance à la magie": "5",
        "Survie": "12",
        "Vigilance": "13",
        "Mêlée": "5"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "2d6",
          "effect": "Drain de sang",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Estomac de plumeur (1)",
        "Membrane d’aile (1d6/3)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "Feu",
        "Lumière du jour"
      ],
      "abilities": [
        "Nyctalopie",
        "Drain de sang",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-green-dragon",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon vert",
      "en": "Green Dragon"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "5 m",
      "en": "5 m"
    },
    "weight": {
      "fr": "300 kg",
      "en": "300 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Plus petits et communs des dragons, ils nichent près des sources chaudes forestières et crachent un jet de vapeur brûlante.",
        "Morsure : Poison (100 %) infligeant 5 dégâts/round ignorant l’armure et -3 à toutes les actions. Loriot doré inefficace ; nécessite Rituel de purification ou Résilience (SD 25)."
      ],
      "en": [
        "The smallest and most common dragons, camouflaged in woodland canopies near hot springs and breathing scalding steam.",
        "Bite: Poison (100%), 5 damage/round bypassing armor and -3 to all actions. Golden Oriole has no effect; cured only via Purification Ritual or Endurance (DC 25)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "13",
        "COR": "20",
        "VIT": "10",
        "EMP": "8",
        "TECH": "5",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "12",
        "END": "80",
        "ENC": "500",
        "RÉC": "16",
        "PS": "150",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "7",
        "Charisme": "9",
        "Courage": "10",
        "Duperie": "8",
        "Éducation": "10",
        "Esquive/Évasion": "10",
        "Furtivité": "1",
        "Intimidation": "4",
        "Persuasion": "9",
        "Physique": "10",
        "Psychologie": "9",
        "Résilience": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "10d6",
          "effect": "Ablation, allonge, Force écrasante, Perforation, Poison (100 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Ablation, Allonge, Force écrasante, Renversement (50 %), Saignement (75 %)",
          "attacksPerTurn": "3"
        },
        {
          "name": "Battement d'ailes",
          "damage": "5d6+3",
          "effect": "Ablation, Étourdissement (-2), Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Croc de dragon (4d10)",
        "Larmes de dragon (2d10)",
        "Queue de dragon (2d10)",
        "Sang de dragon (5d10)",
        "Le trésor du dragon"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Immunités (Saignement, Renversement, Feu)",
        "Nyctalopie",
        "Bond",
        "Télépathie",
        "Souffle enflammé",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-red-dragon",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon rouge",
      "en": "Red Dragon"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "12 à 15 m",
      "en": "12 to 15 m"
    },
    "weight": {
      "fr": "800 kg",
      "en": "800 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Habitants des hauts sommets et amateurs de débats hors combat, les dragons rouges réduisent des cités en cendres lorsqu’ils sont provoqués.",
        "Souffle enflammé : inflige 10d6 dégâts (au lieu de 7d6) et cause des dégâts d’ablation égaux à la moitié des dégâts infligés à l’armure ou au bouclier."
      ],
      "en": [
        "Dwellers of mountain peaks who enjoy witty debate when unprovoked, yet reduce cities to ash in anger.",
        "Fiery Breath: deals 10d6 damage (instead of 7d6) and inflicts ablation damage to target armor or blocking shields equal to half the breath damage."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "13",
        "COR": "20",
        "VIT": "10",
        "EMP": "8",
        "TECH": "5",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "12",
        "END": "80",
        "ENC": "500",
        "RÉC": "16",
        "PS": "150",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "7",
        "Charisme": "9",
        "Courage": "10",
        "Duperie": "8",
        "Éducation": "10",
        "Esquive/Évasion": "10",
        "Furtivité": "1",
        "Intimidation": "4",
        "Persuasion": "9",
        "Physique": "10",
        "Psychologie": "9",
        "Résilience": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "10d6",
          "effect": "Ablation, allonge, Force écrasante, Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Ablation, Allonge, Force écrasante, Renversement (50 %), Saignement (75 %)",
          "attacksPerTurn": "3"
        },
        {
          "name": "Battement d'ailes",
          "damage": "5d6+3",
          "effect": "Ablation, Étourdissement (-2), Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Croc de dragon (4d10)",
        "Larmes de dragon (2d10)",
        "Queue de dragon (2d10)",
        "Sang de dragon (5d10)",
        "Le trésor du dragon"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Immunités (Saignement, Renversement, Feu)",
        "Nyctalopie",
        "Bond",
        "Télépathie",
        "Souffle enflammé (10d6)",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-black-dragon",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon noir",
      "en": "Black Dragon"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "6 m",
      "en": "6 m"
    },
    "weight": {
      "fr": "400 kg",
      "en": "400 kg"
    },
    "environments": [
      "nilfgaard"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Sous-espèce rare des contrées méridionales (Nilfgaard, Gemmery) capable de projeter un acide corrosif rongeant les meilleures armures.",
        "Écailles impénétrables : résistance au perforant, tranchant, contondant, étourdissement et feu ; immunisé à la perforation (y compris améliorée) et dégâts d’ablation divisés par deux (min. 1)."
      ],
      "en": [
        "Rare southern subspecies near Nilfgaard and Gemmera able to spray caustic acid that dissolves armor and terrain.",
        "Impenetrable Scales: resists piercing, slashing, bludgeoning, stun, and fire; ignores Armor Piercing / Improved Armor Piercing and halves ablation damage (min. 1)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "13",
        "COR": "20",
        "VIT": "10",
        "EMP": "8",
        "TECH": "5",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "12",
        "END": "80",
        "ENC": "500",
        "RÉC": "16",
        "PS": "150",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "7",
        "Charisme": "9",
        "Courage": "10",
        "Duperie": "8",
        "Éducation": "10",
        "Esquive/Évasion": "10",
        "Furtivité": "1",
        "Intimidation": "4",
        "Persuasion": "9",
        "Physique": "10",
        "Psychologie": "9",
        "Résilience": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "10d6",
          "effect": "Ablation, allonge, Force écrasante, Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Ablation, Allonge, Force écrasante, Renversement (50 %), Saignement (75 %)",
          "attacksPerTurn": "3"
        },
        {
          "name": "Battement d'ailes",
          "damage": "5d6+3",
          "effect": "Ablation, Étourdissement (-2), Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Croc de dragon (4d10)",
        "Larmes de dragon (2d10)",
        "Queue de dragon (2d10)",
        "Sang de dragon (5d10)",
        "Le trésor du dragon"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Immunités (Saignement, Renversement, Feu, Perforation améliorée)",
        "Résistance (P,T,C, Ablation, Étourdissement)",
        "Nyctalopie",
        "Bond",
        "Télépathie",
        "Souffle enflammé",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-brown-dragon",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon brun",
      "en": "Brown Dragon"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "10 m",
      "en": "10 m"
    },
    "weight": {
      "fr": "600 kg",
      "en": "600 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Aussi appelés dragons de roches, ils creusent des galeries souterraines à vitesse normale dans le sable, la terre et la roche, croisant souvent les mineurs nains et gnomes.",
        "Séisme (rayon 30 m, Athlétisme/Physique SD 25 ou à terre + sauvegarde d’étourdissement à -3) et Jaillissement sur round complet (rayon 10 m, Défense SD 25 ou projeté à 6 m et 6d6 dégâts au torse)."
      ],
      "en": [
        "Also called rock dragons, they burrow through sand, earth, and solid rock at normal movement speed, often clashing with dwarven and gnomish miners.",
        "Ground Shake (30 m radius, Athletics/Physique DC 25 or knocked prone + Stun save at -3) and Full-Round Breach (10 m radius, Defense DC 25 or thrown 6 m taking 6d6 torso damage)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "13",
        "COR": "20",
        "VIT": "10",
        "EMP": "8",
        "TECH": "5",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "12",
        "END": "80",
        "ENC": "500",
        "RÉC": "16",
        "PS": "150",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "7",
        "Charisme": "9",
        "Courage": "10",
        "Duperie": "8",
        "Éducation": "10",
        "Esquive/Évasion": "10",
        "Furtivité": "1",
        "Intimidation": "4",
        "Persuasion": "9",
        "Physique": "10",
        "Psychologie": "9",
        "Résilience": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "10d6",
          "effect": "Ablation, allonge, Force écrasante, Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Ablation, Allonge, Force écrasante, Renversement (50 %), Saignement (75 %)",
          "attacksPerTurn": "3"
        },
        {
          "name": "Battement d'ailes",
          "damage": "5d6+3",
          "effect": "Ablation, Étourdissement (-2), Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Croc de dragon (4d10)",
        "Larmes de dragon (2d10)",
        "Queue de dragon (2d10)",
        "Sang de dragon (5d10)",
        "Le trésor du dragon"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Immunités (Saignement, Renversement, Feu)",
        "Nyctalopie",
        "Bond",
        "Télépathie",
        "Souffle enflammé",
        "Sous terre",
        "Jaillir du sol"
      ]
    }
  },
  {
    "id": "monster-white-dragon",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon blanc",
      "en": "White Dragon"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "12 m",
      "en": "12 m"
    },
    "weight": {
      "fr": "800 kg",
      "en": "800 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Quadrupèdes ailés des monts du Dragon et des forêts enneigées du septentrion.",
        "Souffle glacial : inflige 7d6 dégâts de glace et emprisonne les cibles ayant raté leur défense dans la glace (Physique SD 25 ou infliger 10 dégâts / 5 dégâts de feu à la gangue)."
      ],
      "en": [
        "Winged quadrupeds haunting the Dragon Mountains and snowy northern forests.",
        "Frost Breath: deals 7d6 ice damage and encases targets who fail Defense in solid ice (break via Physique DC 25 or dealing 10 damage / 5 fire damage to the ice)."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "13",
        "COR": "20",
        "VIT": "10",
        "EMP": "8",
        "TECH": "5",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "30",
        "SAUT": "12",
        "END": "80",
        "ENC": "500",
        "RÉC": "16",
        "PS": "150",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Bagarre": "7",
        "Charisme": "9",
        "Courage": "10",
        "Duperie": "8",
        "Éducation": "10",
        "Esquive/Évasion": "10",
        "Furtivité": "1",
        "Intimidation": "4",
        "Persuasion": "9",
        "Physique": "10",
        "Psychologie": "9",
        "Résilience": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "10d6",
          "effect": "Ablation, allonge, Force écrasante, Perforation",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Ablation, Allonge, Force écrasante, Renversement (50 %), Saignement (75 %)",
          "attacksPerTurn": "3"
        },
        {
          "name": "Battement d'ailes",
          "damage": "5d6+3",
          "effect": "Ablation, Étourdissement (-2), Force écrasante, Renversement (75 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Croc de dragon (4d10)",
        "Larmes de dragon (2d10)",
        "Queue de dragon (2d10)",
        "Sang de dragon (5d10)",
        "Le trésor du dragon"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Immunités (Saignement, Renversement, Feu)",
        "Nyctalopie",
        "Bond",
        "Télépathie",
        "Souffle glacé",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-higher-vampire",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Vampire supérieur",
      "en": "Higher Vampire"
    },
    "threat": {
      "fr": "Légendaire Complexe",
      "en": "Legendary Complex"
    },
    "reward": {
      "fr": "5 000 couronnes",
      "en": "5,000 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "1,8 m",
      "en": "1.8 m"
    },
    "weight": {
      "fr": "75 kg",
      "en": "75 kg"
    },
    "environments": [
      "urban"
    ],
    "intelligence": {
      "fr": "Pensant",
      "en": "Sapient"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "10",
        "RÉF": "15",
        "DEX": "16",
        "COR": "12",
        "VIT": "12",
        "EMP": "8",
        "TECH": "7",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "36",
        "SAUT": "7",
        "END": "60",
        "ENC": "120",
        "RÉC": "12",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "10",
        "Bagarre": "9",
        "Charisme": "9",
        "Courage": "12",
        "Duperie": "9",
        "Esquive/Évasion": "10",
        "Étiquette": "8",
        "Furtivité": "4",
        "Intimidation": "12",
        "Persuasion": "7",
        "Physique": "8",
        "Résilience": "7",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "12",
        "Séduction": "10",
        "Survie": "9",
        "Vigilance": "10",
        "Mêlée": "9"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Drain de sang, Perforation améliorée, Saignement (100 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6+3",
          "effect": "Équilibrées, Saignement (75 %)",
          "attacksPerTurn": "4"
        }
      ],
      "loot": [
        "Croc de vampire supérieur (1d6/3)",
        "Essence de mort (3d10)",
        "Lymphe abominable (1d6/2)",
        "Sels naezanniques (1d10)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "Absence d’ombre et de reflet",
        "Effets négatifs du sang",
        "Magie du feu"
      ],
      "abilities": [
        "Régénération (20)",
        "Immunités (Argent, scrutation magique, incinération (effet))",
        "Résistances (Charmes magiques)",
        "Nyctalopie",
        "Traque olfactive",
        "Immortel",
        "Influence magique",
        "Invisibilité améliorée",
        "Forme volatile"
      ]
    }
  },
  {
    "id": "monster-vypper",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Vypper",
      "en": "Vypper"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 400 couronnes",
      "en": "1,400 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "4 m",
      "en": "4 m"
    },
    "weight": {
      "fr": "250 kg",
      "en": "250 kg"
    },
    "environments": [
      "graveyards"
    ],
    "intelligence": {
      "fr": "Sauvage",
      "en": "Feral / Wild"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "site",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "11",
        "DEX": "8",
        "COR": "10",
        "VIT": "9",
        "EMP": "1",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "27",
        "SAUT": "3",
        "END": "45",
        "ENC": "100",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "15",
        "Bagarre": "6",
        "Courage": "0",
        "Esquive/Évasion": "7",
        "Résilience": "0",
        "Mêlée": "8",
        "Résistance à la magie": "11",
        "Furtivité": "5",
        "Survie": "14"
      },
      "weapons": [
        {
          "name": "Morsure (Mêlée)",
          "damage": "7d6+2",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Coup de langue (Bagarre)",
          "damage": "4d6",
          "effect": "Empoisonnement(100%) Etourdissement(1) Portée(2)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Dents de Vypper (1d6/2)",
        "Écaille de Vypper (3d6)",
        "Extrait de venin (2d6)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Langue molle"
      ],
      "abilities": [
        "Immunité (Poison)",
        "Nyctalopie",
        "Régénération (5)",
        "Langue molle",
        "Longueur extrême",
        "Rampant",
        "Saisie mortelle"
      ]
    }
  },
  {
    "id": "monster-anopheli-fed",
    "kind": "monster",
    "typeId": "ogroid",
    "source": "unofficial",
    "isFanMade": true,
    "name": {
      "fr": "Anopheli (nourri)",
      "en": "Anopheli (Fed)"
    },
    "threat": {
      "fr": "Facile Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "40 couronnes",
      "en": "40 crowns"
    },
    "armor": {
      "fr": "3",
      "en": "3"
    },
    "size": {
      "fr": "1,25 à 1,5 m, voûté",
      "en": "1.25 to 1.5 m, hunched"
    },
    "weight": {
      "fr": "Environ 65 kg (jusqu’à 100 kg si bien nourri)",
      "en": "Around 65 kg (up to 100 kg when well-fed)"
    },
    "environments": [
      "swamps",
      "plains",
      "caves"
    ],
    "intelligence": {
      "fr": "Comme un humain stupide",
      "en": "As intelligent as a dim-witted human"
    },
    "organization": {
      "fr": "Entre 1 et 3 en itinérance (jusqu’à 12 dans un nid)",
      "en": "1 to 3 roaming (up to 12 in a nest)"
    },
    "notes": {
      "fr": [
        "+1 attaque par rapport à la forme affamée."
      ],
      "en": [
        "+1 attack compared to the starved state."
      ]
    },
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "4",
        "DEX": "6",
        "COR": "5",
        "VIT": "4",
        "EMP": "2",
        "TECH": "5",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "12",
        "SAUT": "3",
        "END": "30",
        "ENC": "50",
        "RÉC": "4",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Mêlée": "6",
        "Bagarre": "7",
        "Esquive/Évasion": "5",
        "Athlétisme": "5",
        "Vigilance": "3",
        "Furtivité": "6",
        "Survie": "5",
        "Résistance à la magie": "2",
        "Résilience": "6",
        "Courage": "3"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6+2",
          "effect": "PRE +1",
          "attacksPerTurn": "2"
        },
        {
          "name": "Trompe",
          "damage": "3d6+1",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "1 unité de Fer",
        "Acide (1d6)",
        "Coeur d’anopheli"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Potion Sang noir",
        "Vulnérabilité au froid",
        "Aveugle",
        "Point faible (Abdomen)"
      ],
      "abilities": [
        "Vol limité",
        "Explosion",
        "Sens améliorés",
        "Jet de vomi",
        "Faim de loup"
      ]
    }
  }
];
