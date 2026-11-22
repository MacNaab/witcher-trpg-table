import type { BestiaryEntry } from './types';

/**
 * Canonical Monster bestiary — Core & Official entries with combat stat blocks (71 entries).
 */
export const MONSTERS_CORE_DATA: readonly BestiaryEntry[] = [
  {
    "id": "monster-ghoul",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Goule",
      "en": "Ghoul"
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
      "fr": "Environ 1,25 m au garrot",
      "en": "Around 1.25 m at shoulder"
    },
    "weight": {
      "fr": "Environ 86 kg",
      "en": "Around 86 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Groupes de 3 à 6 individus",
      "en": "Packs of 3 to 6 individuals"
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
        "DEX": "7",
        "COR": "6",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "3",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "7",
        "Bagarre": "6",
        "Esquive/Évasion": "6",
        "Mêlée": "6",
        "Athlétisme": "7",
        "Furtivité": "4",
        "Résilience": "6",
        "Courage": "7",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "3d6+2",
          "effect": "Saignement(25 %) –1 PRÉ",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6/2)",
        "Griffes de goule (2)",
        "Moelle de goule (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages"
      ],
      "abilities": [
        "Bond",
        "Fureur",
        "Nyctalopie",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-grave-hag",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Guenaude sépulcrale",
      "en": "Grave Hag"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Environ 80 kg",
      "en": "Around 80 kg"
    },
    "environments": [
      "graveyards",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Même les mages les plus érudits butent sur l’origine de la magie qui émane des cercles de crânes des guenaudes sépulcrales. On considère généralement qu’elles tirent leurs pouvoirs des démons peuplant le vide entre les plans."
      ],
      "en": [
        "Even the most learned mages struggle to explain the magic radiating from a grave hag’s skull circles. Most scholars believe they draw power from demons dwelling in the void between planes."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "10",
        "COR": "7",
        "VIT": "7",
        "EMP": "3",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "8",
        "Bagarre": "6",
        "Esquive/Évasion": "8",
        "Mêlée": "8",
        "Athlétisme": "6",
        "Furtivité": "8",
        "Résilience": "7",
        "Courage": "9",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50 %)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Poison(75 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Langue",
          "damage": "3d6+2",
          "effect": "Poison(100 %) POR:4m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Oreille de guenaude sépulcrale (2)",
        "Extrait de venin (1d6)",
        "Rune aléatoire",
        "Objets étranges (1d6)",
        "Dent de guenaude (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Langue fouet"
      ],
      "abilities": [
        "Cercle de crânes",
        "Commandement des morts-vivants",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-drowners",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Noyeurs",
      "en": "Drowners"
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
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Poids humain",
      "en": "Human weight"
    },
    "environments": [
      "marine",
      "sewers"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un poisson",
      "en": "As intelligent as a fish"
    },
    "organization": {
      "fr": "Groupes de 3 à 6 individus",
      "en": "Groups of 3 to 6 individuals"
    },
    "notes": {
      "fr": [
        "Bien qu’ils croient les noyeurs issus de criminels revenus à la vie, nombre de citadins de la région du Pontar paient cher pour se procurer des cerveaux de noyeurs afin d’en faire un ragoût réputé aphrodisiaque."
      ],
      "en": [
        "Despite believing drowners are drowned criminals risen from death, many townsfolk along the Pontar pay handsomely for drowner brains, boiling them into a stew rumored to be a potent aphrodisiac."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "7",
        "COR": "6",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "18",
        "SAUT": "3",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "8",
        "Bagarre": "6",
        "Esquive/Évasion": "5",
        "Mêlée": "6",
        "Athlétisme": "6",
        "Furtivité": "5",
        "Résilience": "6",
        "Courage": "8",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cerveau de noyeur",
        "Essence d’eau (1d6/2)",
        "Langue de noyeur"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Sauvage",
        "Immunité au poison",
        "Amphibien",
        "Stupidité crasse"
      ]
    }
  },
  {
    "id": "monster-wraiths",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Fantômes",
      "en": "Wraiths"
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
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Guidé par ses émotions",
      "en": "Driven by emotion"
    },
    "organization": {
      "fr": "Groupes de 3 à 21 individus",
      "en": "Groups of 3 to 21 individuals"
    },
    "notes": {
      "fr": [
        "Les armes d’un fantôme sont une manifestation du pouvoir qui lui a donné naissance. Lorsqu’il meurt, sa lanterne et son épée s’évaporent avec le reste de son corps et ne peuvent être récupérées."
      ],
      "en": [
        "A wraith’s weapons are manifestations of the power that created it. When slain, its lantern and sword evaporate along with its form and cannot be looted."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "5",
        "COR": "5",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "15",
        "SAUT": "3",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "8",
        "Bagarre": "6",
        "Escrime": "7",
        "Esquive/Évasion": "6",
        "Mêlée": "6",
        "Athlétisme": "5",
        "Furtivité": "9",
        "Résilience": "7 (Co)",
        "Incantation": "6",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Épée de spectre",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lanterne de spectre",
          "damage": "2d6+2",
          "effect": "Feu(25 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6/2)",
        "Poussière de spectre (1d6/2)",
        "Poussière imprégnée (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Poussière de lune et Yrden"
      ],
      "abilities": [
        "Alimenté par la colère",
        "Décalage",
        "Téléportation",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-noonwraith",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Spectre de midi",
      "en": "Noonwraith"
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
      "fr": "Consumé par la haine",
      "en": "Consumed by hatred"
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
        "DEX": "6",
        "COR": "7",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "18",
        "SAUT": "3",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "5",
        "Vigilance": "10",
        "Bagarre": "7",
        "Esquive/Évasion": "9",
        "Mêlée": "8",
        "Athlétisme": "4",
        "Furtivité": "10",
        "Résilience": "7",
        "Incantation": "8",
        "Résistance à la magie": "7"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6)",
        "Essence de lumière (1d6/2)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Poussière de lune et Yrden",
        "Faiblesse astrale"
      ],
      "abilities": [
        "Alimenté par la colère",
        "Incorporel",
        "Danse de midi",
        "Démon de poussière",
        "Téléportation"
      ]
    }
  },
  {
    "id": "monster-wolves",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Loups",
      "en": "Wolves"
    },
    "threat": {
      "fr": "Facile Simple",
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
      "fr": "Environ 0,8 m",
      "en": "Around 0.8 m"
    },
    "weight": {
      "fr": "Environ 68 kg",
      "en": "Around 68 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Meutes de 3 à 6 individus",
      "en": "Packs of 3 to 6 individuals"
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
        "DEX": "6",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "21",
        "SAUT": "4",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Survie": "9",
        "Vigilance": "6",
        "Bagarre": "6",
        "Esquive/Évasion": "6",
        "Mêlée": "6",
        "Athlétisme": "6",
        "Furtivité": "6",
        "Résilience": "5",
        "Courage": "6",
        "Résistance à la magie": "2"
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
        "Foie de loup",
        "Os de bête (1d6)",
        "Peau de loup",
        "Suif de chien (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Traque olfactive",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-wargs",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Wargs",
      "en": "Wargs"
    },
    "threat": {
      "fr": "Facile Simple",
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
      "fr": "Environ 0,8 m",
      "en": "Around 0.8 m"
    },
    "weight": {
      "fr": "Environ 68 kg",
      "en": "Around 68 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Meutes de 3 à 6 individus",
      "en": "Packs of 3 to 6 individuals"
    },
    "notes": {
      "fr": [
        "Les wargs sont plus grands que les loups, arborent une fourrure brun-roux et possèdent des yeux rouges brillants. Leur comportement laisse penser qu’ils sont plus intelligents que les loups ordinaires."
      ],
      "en": [
        "Wargs are larger than common wolves, sport reddish-brown fur, and have glowing red eyes. Their coordinated behavior suggests greater cunning than ordinary wolves."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "5",
        "DEX": "7",
        "COR": "6",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "24",
        "SAUT": "4",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Survie": "9",
        "Vigilance": "6",
        "Bagarre": "6",
        "Esquive/Évasion": "6",
        "Mêlée": "6",
        "Athlétisme": "6",
        "Furtivité": "6",
        "Résilience": "5",
        "Courage": "6",
        "Résistance à la magie": "2"
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
        "Foie de loup",
        "Os de bête (1d6)",
        "Peau de loup",
        "Suif de chien (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes"
      ],
      "abilities": [
        "Traque olfactive",
        "Nyctalopie",
        "Chef de meute"
      ]
    }
  },
  {
    "id": "monster-werewolves",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Loups-garous",
      "en": "Werewolves"
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
      "fr": "Environ 2,5 m",
      "en": "Around 2.5 m"
    },
    "weight": {
      "fr": "Environ 140 kg",
      "en": "Around 140 kg"
    },
    "environments": [
      "forests",
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
        "Un personnage affligé de lycanthropie a 30 % de chance de se transformer chaque nuit au lever de la lune, devenant un prédateur sanguinaire contrôlé par le MJ jusqu’à l’aube.",
        "Sous forme bestiale, le lycanthrope acquiert les armes, l’armure et les capacités d’un loup-garou ainsi que les bonus : Réflexes +2, Corps +3, Vitesse +4, Empathie -5."
      ],
      "en": [
        "A character afflicted with lycanthropy has a 30% chance each night at moonrise to transform into a bloodthirsty predator controlled by the GM until dawn.",
        "While transformed, the lycanthrope gains a werewolf’s natural weapons, armor, and abilities, plus: REF +2, BODY +3, SPD +4, EMP -5."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "8",
        "DEX": "8",
        "COR": "7",
        "VIT": "9",
        "EMP": "1",
        "TECH": "3",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "27",
        "SAUT": "5",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "9",
        "Vigilance": "10",
        "Bagarre": "8",
        "Esquive/Évasion": "8",
        "Mêlée": "9",
        "Athlétisme": "8",
        "Furtivité": "9",
        "Résilience": "8",
        "Courage": "10",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6+2",
          "effect": "Saignement(25 %)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(75 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets aléatoires (1d6)",
        "Peau de loup-garou",
        "Salive de loup-garou (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Poussière de lune"
      ],
      "abilities": [
        "Régénération",
        "Traque olfactive",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-griffins",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Griffons",
      "en": "Griffins"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 200 couronnes",
      "en": "1,200 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "Environ 2 m au garrot",
      "en": "Around 2 m at shoulder"
    },
    "weight": {
      "fr": "Environ 900 kg",
      "en": "Around 900 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Seul ou en couple",
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
        "RÉF": "10",
        "DEX": "10",
        "COR": "15",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "18",
        "SAUT": "3",
        "END": "50",
        "ENC": "150",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "10",
        "Bagarre": "7",
        "Esquive/Évasion": "7",
        "Mêlée": "9",
        "Athlétisme": "7",
        "Furtivité": "4",
        "Résilience": "3",
        "Courage": "10",
        "Résistance à la magie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "7d6+2",
          "effect": "Saignement(50 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Plume de griffon (1d10)",
        "Poussière imprégnée (1d6/2)",
        "Œuf de griffon (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Hurlement sonique",
        "Charge",
        "Sauvage",
        "Vol",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-sirens",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Sirènes",
      "en": "Sirens"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
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
      "fr": "Environ 3 m de long",
      "en": "Around 3 m long"
    },
    "weight": {
      "fr": "Environ 120 kg",
      "en": "Around 120 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un humain",
      "en": "As intelligent as a human"
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
        "INT": "3",
        "RÉF": "7",
        "DEX": "7",
        "COR": "6",
        "VIT": "8",
        "EMP": "3",
        "TECH": "3",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "24",
        "SAUT": "4",
        "END": "35",
        "ENC": "60",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "7",
        "Bagarre": "7",
        "Esquive/Évasion": "6",
        "Mêlée": "7",
        "Athlétisme": "8",
        "Furtivité": "8",
        "Résilience": "6",
        "Courage": "5",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6+2",
          "effect": "+1 PRÉ",
          "attacksPerTurn": "1"
        },
        {
          "name": "Queue",
          "damage": "3d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cordes vocales de sirène",
        "Essence d’eau (1d6)",
        "Objets communs (1d6/3)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Mouvement entravé"
      ],
      "abilities": [
        "Illusion",
        "Hurlement sonique",
        "Amphibien",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-arachas",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Arachas",
      "en": "Arachas"
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
      "fr": "20",
      "en": "20"
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
      "swamps"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un chien",
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
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "9",
        "DEX": "6",
        "COR": "13",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "15",
        "SAUT": "3",
        "END": "45",
        "ENC": "130",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Survie": "4",
        "Vigilance": "6",
        "Bagarre": "5",
        "Esquive/Évasion": "8",
        "Mêlée": "5",
        "Athlétisme": "5",
        "Furtivité": "6",
        "Résilience": "5",
        "Courage": "10",
        "Résistance à la magie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Poison(25 %)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Chitine (1d6)",
        "Extrait de venin (1d6/2)",
        "Œil d’arachas (1d6/2)",
        "Venin d’arachas (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Point faible"
      ],
      "abilities": [
        "Bond",
        "Résistances (saignement,T,P)",
        "Immunité au poison",
        "Camouflage",
        "Toile",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-endregas",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Endriagues",
      "en": "Endregas"
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
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "Environ 2,5 m",
      "en": "Around 2.5 m"
    },
    "weight": {
      "fr": "Environ 200 kg",
      "en": "Around 200 kg"
    },
    "environments": [
      "swamps"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Groupes de 3 à 9 individus",
      "en": "Groups of 3 to 9 individuals"
    },
    "notes": {
      "fr": [
        "Les reines endriagues ressemblent tant aux arachas qu’on peut utiliser les caractéristiques d’un arachas pour représenter la reine d’un nid.",
        "Épines de bourdon : projette ses épines dans un rayon de 5 m (esquive/blocage SD 15 ; 1d6 dégâts empoisonnés par point de marge d’échec).",
        "Queue de guerrière : inflige 4d6+2 dégâts avec 50 % de chance d’empoisonnement. Pinces d’ouvrière : 25 % de chance d’infliger des dégâts empoisonnés."
      ],
      "en": [
        "Endrega queens closely resemble arachas—when a party enters an endrega nest, GMs may use arachas statistics to represent the queen.",
        "Drone Spines: fires spines in a 5 m radius (dodge or block DC 15; 1d6 poison damage per point of failure margin).",
        "Warrior Tail: deals 4d6+2 damage with a 50% chance to poison. Worker Pincers: 25% chance to inflict poison."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "7",
        "COR": "8",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "21",
        "SAUT": "4",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "35",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "5",
        "Bagarre": "5",
        "Esquive/Évasion": "6",
        "Mêlée": "6",
        "Athlétisme": "5",
        "Furtivité": "7",
        "Résilience": "6",
        "Courage": "5",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chitine (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Mucus d’endriague (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes"
      ],
      "abilities": [
        "Bond",
        "Résistances (saignement,T)",
        "Immunité au poison",
        "Sauvage"
      ],
      "variants": [
        {
          "label": {
            "fr": "Reine endriague",
            "en": "Endrega Queen"
          },
          "stats": {
            "INT": "1",
            "RÉF": "9",
            "DEX": "6",
            "COR": "13",
            "VIT": "5",
            "EMP": "1",
            "TECH": "1",
            "VOL": "5",
            "CHA": "0",
            "ÉTOU": "9",
            "COU": "15",
            "SAUT": "3",
            "END": "45",
            "ENC": "130",
            "RÉC": "9",
            "PS": "90",
            "VIG": "0"
          },
          "skills": {
            "Survie": "6",
            "Vigilance": "5",
            "Bagarre": "5",
            "Esquive/Évasion": "6",
            "Mêlée": "6",
            "Athlétisme": "5",
            "Furtivité": "7",
            "Résilience": "6",
            "Courage": "5",
            "Résistance à la magie": "6"
          },
          "weapons": [
            {
              "name": "Griffes",
              "damage": "3d6",
              "effect": "Aucun",
              "attacksPerTurn": "1"
            }
          ],
          "loot": [
            "Chitine (1d6/2)",
            "Extrait de venin (1d6/2)",
            "Mucus d’endriague (1d6/2)"
          ],
          "vulnerabilities": [
            "Huile contre les insectoïdes"
          ],
          "abilities": [
            "Bond",
            "Résistances (saignement,T)",
            "Immunité au poison",
            "Sauvage"
          ]
        },
        {
          "label": {
            "fr": "Guerrière endriague",
            "en": "Endrega Warrior"
          },
          "stats": {
            "INT": "1",
            "RÉF": "6",
            "DEX": "7",
            "COR": "8",
            "VIT": "7",
            "EMP": "1",
            "TECH": "1",
            "VOL": "6",
            "CHA": "0",
            "ÉTOU": "7",
            "COU": "21",
            "SAUT": "4",
            "END": "35",
            "ENC": "80",
            "RÉC": "7",
            "PS": "35",
            "VIG": "0"
          },
          "skills": {
            "Survie": "6",
            "Vigilance": "5",
            "Bagarre": "5",
            "Esquive/Évasion": "6",
            "Mêlée": "6",
            "Athlétisme": "5",
            "Furtivité": "7",
            "Résilience": "6",
            "Courage": "5",
            "Résistance à la magie": "6"
          },
          "weapons": [
            {
              "name": "Griffes",
              "damage": "3d6",
              "effect": "Aucun",
              "attacksPerTurn": "1"
            }
          ],
          "loot": [
            "Chitine (1d6/2)",
            "Extrait de venin (1d6/2)",
            "Mucus d’endriague (1d6/2)"
          ],
          "vulnerabilities": [
            "Huile contre les insectoïdes"
          ],
          "abilities": [
            "Bond",
            "Résistances (saignement,T)",
            "Immunité au poison",
            "Sauvage"
          ]
        },
        {
          "label": {
            "fr": "Bourdon endriague",
            "en": "Endrega Drone"
          },
          "stats": {
            "INT": "1",
            "RÉF": "6",
            "DEX": "7",
            "COR": "8",
            "VIT": "7",
            "EMP": "1",
            "TECH": "1",
            "VOL": "6",
            "CHA": "0",
            "ÉTOU": "7",
            "COU": "21",
            "SAUT": "4",
            "END": "35",
            "ENC": "80",
            "RÉC": "7",
            "PS": "35",
            "VIG": "0"
          },
          "skills": {
            "Survie": "6",
            "Vigilance": "5",
            "Bagarre": "5",
            "Esquive/Évasion": "6",
            "Mêlée": "6",
            "Athlétisme": "5",
            "Furtivité": "7",
            "Résilience": "6",
            "Courage": "5",
            "Résistance à la magie": "6"
          },
          "weapons": [
            {
              "name": "Griffes",
              "damage": "3d6",
              "effect": "Aucun",
              "attacksPerTurn": "1"
            }
          ],
          "loot": [
            "Chitine (1d6/2)",
            "Extrait de venin (1d6/2)",
            "Mucus d’endriague (1d6/2)"
          ],
          "vulnerabilities": [
            "Huile contre les insectoïdes"
          ],
          "abilities": [
            "Bond",
            "Résistances (saignement,T)",
            "Immunité au poison",
            "Sauvage"
          ]
        },
        {
          "label": {
            "fr": "Ouvrière endriague",
            "en": "Endrega Worker"
          },
          "stats": {
            "INT": "1",
            "RÉF": "6",
            "DEX": "7",
            "COR": "8",
            "VIT": "7",
            "EMP": "1",
            "TECH": "1",
            "VOL": "6",
            "CHA": "0",
            "ÉTOU": "7",
            "COU": "21",
            "SAUT": "4",
            "END": "35",
            "ENC": "80",
            "RÉC": "7",
            "PS": "35",
            "VIG": "0"
          },
          "skills": {
            "Survie": "6",
            "Vigilance": "5",
            "Bagarre": "5",
            "Esquive/Évasion": "6",
            "Mêlée": "6",
            "Athlétisme": "5",
            "Furtivité": "7",
            "Résilience": "6",
            "Courage": "5",
            "Résistance à la magie": "6"
          },
          "weapons": [
            {
              "name": "Griffes",
              "damage": "3d6",
              "effect": "Aucun",
              "attacksPerTurn": "1"
            }
          ],
          "loot": [
            "Chitine (1d6/2)",
            "Extrait de venin (1d6/2)",
            "Mucus d’endriague (1d6/2)"
          ],
          "vulnerabilities": [
            "Huile contre les insectoïdes"
          ],
          "abilities": [
            "Bond",
            "Résistances (saignement,T)",
            "Immunité au poison",
            "Sauvage"
          ]
        }
      ]
    }
  },
  {
    "id": "monster-golems",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Golems",
      "en": "Golems"
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
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Environ 2,5 m",
      "en": "Around 2.5 m"
    },
    "weight": {
      "fr": "Environ 900 kg",
      "en": "Around 900 kg"
    },
    "environments": [
      "ruins"
    ],
    "intelligence": {
      "fr": "Incapable de réfléchir",
      "en": "Mindless"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Habituellement postés comme gardiens dans des ruines et des tours de sorciers."
      ],
      "en": [
        "Commonly stationed as guardians within ancient ruins and mage towers."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "6",
        "COR": "13",
        "VIT": "4",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "12",
        "SAUT": "2",
        "END": "–",
        "ENC": "130",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "4",
        "Vigilance": "8",
        "Bagarre": "5",
        "Esquive/Évasion": "4",
        "Athlétisme": "2",
        "Furtivité": "2",
        "Physique": "10",
        "Résistance à la magie": "10"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "8d6",
          "effect": "Ablation",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cœur de golem",
        "Poussière imprégnée (1d6)",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Vulnérable à l’électricité",
        "Bombes au dimeritium"
      ],
      "abilities": [
        "Force écrasante",
        "Charge",
        "Construit",
        "Résistances (T,P)"
      ]
    }
  },
  {
    "id": "monster-fiends",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Fiellons",
      "en": "Fiends"
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
      "fr": "Environ 4 m au garrot",
      "en": "Around 4 m at shoulder"
    },
    "weight": {
      "fr": "Environ 1 500 kg",
      "en": "Around 1,500 kg"
    },
    "environments": [
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
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "13",
        "DEX": "10",
        "COR": "15",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "150",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "10",
        "Bagarre": "8",
        "Esquive/Évasion": "7",
        "Mêlée": "9",
        "Athlétisme": "5",
        "Furtivité": "1",
        "Physique": "10",
        "Résilience": "7",
        "Courage": "10",
        "Incantation": "7",
        "Résistance à la magie": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "7d6",
          "effect": "Saignement (50 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Cornes",
          "damage": "8d6",
          "effect": "–1 PRÉ",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cinquième essence (1d10)",
        "Excréments de fiellon (1d6)",
        "Œil de fiellon (3)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Poussière de lune",
        "Ouïe sensible"
      ],
      "abilities": [
        "Régénération",
        "Charge",
        "Massif",
        "Hypnose",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-nekkers",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Nekkers",
      "en": "Nekkers"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
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
      "fr": "Environ 1 m",
      "en": "Around 1 m"
    },
    "weight": {
      "fr": "Environ 13 kg",
      "en": "Around 13 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain simplet",
      "en": "As intelligent as a simpleton human"
    },
    "organization": {
      "fr": "Bandes de 3 à 12 individus",
      "en": "Bands of 3 to 12 individuals"
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
        "DEX": "7",
        "COR": "3",
        "VIT": "6",
        "EMP": "2",
        "TECH": "2",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "3",
        "COU": "18",
        "SAUT": "3",
        "END": "15",
        "ENC": "30",
        "RÉC": "3",
        "PS": "15",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "5",
        "Esquive/Évasion": "6",
        "Mêlée": "5",
        "Athlétisme": "7",
        "Furtivité": "8",
        "Résilience": "6",
        "Courage": "6",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cœur de nekker (1)",
        "Dent de nekker (1d6/2)",
        "Griffe de nekker (2)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes"
      ],
      "abilities": [
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-nekker-warrior",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Chef nekker",
      "en": "Nekker Warrior"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
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
      "fr": "Environ 1 m",
      "en": "Around 1 m"
    },
    "weight": {
      "fr": "Environ 13 kg",
      "en": "Around 13 kg"
    },
    "environments": [
      "forests",
      "plains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain simplet",
      "en": "As intelligent as a simpleton human"
    },
    "organization": {
      "fr": "Bandes de 3 à 12 individus",
      "en": "Bands of 3 to 12 individuals"
    },
    "notes": {
      "fr": [
        "Les chefs nekkers sont généralement plus grands que leurs congénères. Il s’agit vraisemblablement des spécimens les plus forts élus à la tête du groupe, reconnaissables à leurs peintures de guerre rougeâtres."
      ],
      "en": [
        "Nekker warriors are typically larger than the rest of their pack. Rather than a distinct subspecies, they appear to be the strongest individuals chosen as leaders, distinguished by reddish war paint."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "6",
        "DEX": "8",
        "COR": "4",
        "VIT": "7",
        "EMP": "2",
        "TECH": "2",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "21",
        "SAUT": "4",
        "END": "20",
        "ENC": "40",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "5",
        "Esquive/Évasion": "6",
        "Mêlée": "5",
        "Athlétisme": "7",
        "Furtivité": "8",
        "Résilience": "6",
        "Courage": "6",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cœur de nekker (1)",
        "Dent de nekker (1d6/2)",
        "Griffe de nekker (2)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes"
      ],
      "abilities": [
        "Chef de meute",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-rock-trolls",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Trolls de pierre",
      "en": "Rock Trolls"
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
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 150 kg",
      "en": "Around 150 kg"
    },
    "environments": [
      "mountains",
      "valleys"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain simplet",
      "en": "As intelligent as a simpleton human"
    },
    "organization": {
      "fr": "Solitaire ou groupes de 2 à 3 individus",
      "en": "Solitary or groups of 2 to 3 individuals"
    },
    "notes": {
      "fr": [
        "Il est fréquent de trouver des trolls de pierre installés sous ou près des ponts. Certaines cités profitent de leur force et de leurs talents de maçons pour entretenir les ponts et percevoir les péages — en les payant souvent en vodka."
      ],
      "en": [
        "Rock trolls frequently dwell beneath or beside bridges. Towns often employ their strength and masonry skills to maintain bridges and collect tolls—gladly paying them in vodka."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "8",
        "DEX": "7",
        "COR": "12",
        "VIT": "4",
        "EMP": "6",
        "TECH": "7",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "12",
        "SAUT": "2",
        "END": "40",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "9",
        "Bagarre": "8",
        "Esquive/Évasion": "5",
        "Athlétisme": "3",
        "Furtivité": "3",
        "Résilience": "8",
        "Courage": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "6d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Foie de troll (1)",
        "Objets communs (1d6)",
        "Peau de troll (1d6)",
        "Pierre (2d10)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Point faible"
      ],
      "abilities": [
        "Force écrasante",
        "Lanceur de roche",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-wyverns",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Wyverns",
      "en": "Wyverns"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 000 couronnes",
      "en": "1,000 crowns"
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
      "fr": "Environ 900 kg",
      "en": "Around 900 kg"
    },
    "environments": [
      "mountains",
      "valleys"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire ou par couple",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [
        "Depuis des siècles, les nobles, chevaliers et mages ornent leurs atours d’écailles de draconides. Tannées en cuir de draconide, elles forment des armures si durables qu’elles se transmettent en héritage familial."
      ],
      "en": [
        "For generations, nobles, knights, and mages have coveted draconid scales. Tanned into draconid leather, the resulting armor is so resilient that complete sets become treasured family heirlooms."
      ]
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "10",
        "COR": "10",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "4",
        "END": "40",
        "ENC": "100",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "9",
        "Vigilance": "10",
        "Bagarre": "7",
        "Esquive/Évasion": "6",
        "Mêlée": "8",
        "Athlétisme": "8",
        "Furtivité": "6",
        "Résilience": "8",
        "Courage": "8",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "7d6",
          "effect": "Poison(25 %)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Queue",
          "damage": "5d6+2",
          "effect": "Poison(75 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Écailles de draconide (1d10)",
        "Extrait de venin (1d10)",
        "Œil de wyvern (1d6/2)",
        "Œuf de wyvern (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Vol",
        "Projection de venin",
        "Résistances (T,P)",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-katakans",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Katakans",
      "en": "Katakans"
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
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 115 kg",
      "en": "Around 115 kg"
    },
    "environments": [
      "ruins",
      "caves",
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
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "official",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "14",
        "DEX": "12",
        "COR": "8",
        "VIT": "10",
        "EMP": "3",
        "TECH": "3",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "30",
        "SAUT": "6",
        "END": "40",
        "ENC": "80",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "10",
        "Bagarre": "7",
        "Esquive/Évasion": "10",
        "Mêlée": "8",
        "Athlétisme": "10",
        "Furtivité": "10",
        "Résilience": "8",
        "Courage": "8",
        "Intimidation": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6",
          "effect": "Saignement(50 %)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "7d6+2",
          "effect": "Saignement(100 %)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Rune aléatoire",
        "Salive de vampire (1d6)",
        "Objets communs (1d6)",
        "Crocs de vampire (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir (potion)",
        "Faiblesse astrale",
        "Vulnérable au feu",
        "Transfert sanguin"
      ],
      "abilities": [
        "Régénération",
        "Invisibilité",
        "Invisible à la scrutation magique",
        "Télépathie",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-aguara",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Aguara",
      "en": "Aguara"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
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
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Poids humain",
      "en": "Human weight"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Aussi intelligente qu’un humain",
      "en": "As intelligent as a human"
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
        "INT": "8",
        "RÉF": "7",
        "DEX": "6",
        "COR": "5",
        "VIT": "7",
        "EMP": "4",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "21",
        "SAUT": "4",
        "END": "35",
        "ENC": "50",
        "RÉC": "7",
        "PS": "35",
        "VIG": "5"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "10",
        "Bagarre": "7",
        "Courage": "9",
        "Esquive/Évasion": "9",
        "Résilience": "7",
        "Mêlée": "6",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "9",
        "Furtivité": "10",
        "Survie": "9",
        "Séduction": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Saignement(25%)",
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
        "Peau d'Aguara",
        "Salive d'Aguara (1d6)",
        "Objets étranges (1d6)",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les vestiges",
        "Argent",
        "Poussière de lune"
      ],
      "abilities": [
        "Transformation",
        "Illusion",
        "Traque olfactive",
        "Nyctalopie",
        "Régénération (5)",
        "Invisibilité à la scrutation magique"
      ]
    }
  },
  {
    "id": "monster-alghouls",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Algoules",
      "en": "Alghouls"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Environ 1,30 m au garrot",
      "en": "Around 1.3 m at shoulder"
    },
    "weight": {
      "fr": "Environ 90 kg",
      "en": "Around 90 kg"
    },
    "environments": [
      "battlefields",
      "graveyards"
    ],
    "intelligence": {
      "fr": "À peu près aussi intelligent qu’un chien",
      "en": "Roughly as intelligent as a dog"
    },
    "organization": {
      "fr": "Bandes de 3 à 15 goules",
      "en": "Packs of 3 to 15 ghouls"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "7",
        "COR": "7",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "30",
        "ENC": "50",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Mêlée": "7",
        "Survie": "6",
        "Vigilance": "7",
        "Bagarre": "7",
        "Esquive/Évasion": "6",
        "Athlétisme": "8",
        "Furtivité": "3",
        "Résilience": "6",
        "Courage": "8",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "3d6+2",
          "effect": "Saignement (25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6/2)",
        "Griffes de goule (2)",
        "Moelle de goule (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages"
      ],
      "abilities": [
        "Bond",
        "Fureur",
        "Nyctalopie",
        "Sauvage",
        "Hurlement sonique",
        "Pointes"
      ]
    }
  },
  {
    "id": "monster-arachnomorph",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Arachnomorphe",
      "en": "Arachnomorph"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "25 couronnes",
      "en": "25 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Entre 1,50 et 2 m",
      "en": "1.5 to 2 m"
    },
    "weight": {
      "fr": "Environ 50 kg",
      "en": "Around 50 kg"
    },
    "environments": [
      "forests",
      "swamps",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Bandes de 5 à 15 individus",
      "en": "Clusters of 5 to 15 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "8",
        "COR": "6",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "24",
        "SAUT": "4",
        "END": "25",
        "ENC": "60",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "5",
        "Bagarre": "6",
        "Mêlée": "6",
        "Esquive/Évasion": "5",
        "Athlétisme": "7",
        "Furtivité": "8",
        "Résilience": "4",
        "Courage": "3",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6+1",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "2d6-2",
          "effect": "Toile",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chitine d’arachnomorphe (1d6/2)",
        "Salive d’arachnomorphe (1d6/2)",
        "Soie (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes"
      ],
      "abilities": [
        "Bond",
        "Nyctalopie",
        "Sauvage",
        "Toile"
      ]
    }
  },
  {
    "id": "monster-banshee",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Banshee",
      "en": "Banshee"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
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
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "deserts",
      "urban"
    ],
    "intelligence": {
      "fr": "Guidé par ses émotions",
      "en": "Driven by emotion"
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
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "8",
        "DEX": "5",
        "COR": "7",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "8",
        "Bagarre": "7",
        "Esquive/Évasion": "8",
        "Mêlée": "8",
        "Athlétisme": "4",
        "Furtivité": "9",
        "Résilience": "7",
        "Incantation": "7",
        "Résistance à la magie": "7"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Saignement (25%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)",
        "Poussière de lune (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres"
      ],
      "abilities": [
        "Démon de poussière",
        "Hurlement sonique",
        "Incorporel",
        "Invoquer des squelettes"
      ]
    }
  },
  {
    "id": "monster-djinn",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Djinn",
      "en": "Djinn"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Variable",
      "en": "Variable"
    },
    "weight": {
      "fr": "Intangible",
      "en": "Intangible"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Assez intelligent pour négocier",
      "en": "Intelligent enough to bargain"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Dernier recours : lorsqu’un djinn tombe sous 10 PS, il prépare en 1 tour une téléportation massive tout en maintenant ses tempêtes actives, puis disparaît sans laisser de trace au début de son tour suivant.",
        "S’il tombe à 0 PS sans avoir été scellé dans un récipient, il se téléporte automatiquement après 30 minutes de répit."
      ],
      "en": [
        "Last Resort: when a djinn drops below 10 HP, it spends 1 turn preparing a massive teleport while sustaining active storms, vanishing without a trace at the start of its next turn.",
        "If reduced to 0 HP without being bound in a vessel, it automatically teleports away after 30 minutes."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "5",
        "DEX": "6",
        "COR": "5",
        "VIT": "3",
        "EMP": "5",
        "TECH": "1",
        "VOL": "11",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "19",
        "SAUT": "1",
        "END": "-",
        "ENC": "50",
        "RÉC": "8",
        "PS": "100",
        "VIG": "30"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "10",
        "Esquive/Évasion": "7",
        "Furtivité": "9",
        "Duperie": "6 (Emp)",
        "Persuasion": "6 (Emp)",
        "Psychologie": "8 (Emp)",
        "Incantation": "11",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "12"
      },
      "weapons": [
        {
          "name": "Voir « Magie »",
          "damage": "-",
          "effect": "-",
          "attacksPerTurn": "-"
        }
      ],
      "loot": [
        "-"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Axé sur les accords",
        "Récipient"
      ],
      "abilities": [
        "Magie",
        "Malicieux",
        "Invulnérabilités",
        "Téléportation"
      ]
    }
  },
  {
    "id": "monster-ekhidna",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Échidna",
      "en": "Ekhidna"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Environ 3 m de long",
      "en": "Around 3 m long"
    },
    "weight": {
      "fr": "Environ 150 kg",
      "en": "Around 150 kg"
    },
    "environments": [
      "marine"
    ],
    "intelligence": {
      "fr": "Humaine",
      "en": "Human"
    },
    "organization": {
      "fr": "Bandes de 3 à 6 individus, souvent mêlées à des sirènes",
      "en": "Flocks of 3 to 6 individuals, often alongside sirens"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "8",
        "COR": "7",
        "VIT": "8",
        "EMP": "5",
        "TECH": "3",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "70",
        "RÉC": "8",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "7",
        "Bagarre": "7",
        "Mêlée": "8",
        "Esquive/Évasion": "6",
        "Athlétisme": "9",
        "Furtivité": "8",
        "Résilience": "7",
        "Séduction": "5 (Emp)",
        "Courage": "5",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+1",
          "effect": "+1 fiabilité",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "2d6-2",
          "effect": "Saignement (75%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Queue",
          "damage": "3d6+2",
          "effect": "Stupéfaction",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cordes vocales de sirène",
        "Essence d’eau (1d6)",
        "Objets communs (1d6/3)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Mouvement entravé"
      ],
      "abilities": [
        "Amphibien",
        "Hurlement sonique",
        "Illusion",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-ekimmara",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Ekimme",
      "en": "Ekimmara"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 100 kg",
      "en": "Around 100 kg"
    },
    "environments": [
      "caves",
      "ruins",
      "urban"
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
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "8",
        "COR": "7",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "24",
        "SAUT": "4",
        "END": "35",
        "ENC": "70",
        "RÉC": "7",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "7",
        "Mêlée": "8",
        "Esquive/Évasion": "8",
        "Athlétisme": "8",
        "Furtivité": "10",
        "Résilience": "7",
        "Courage": "10",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Ablation",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6+2",
          "effect": "Saignement (100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Crocs de vampire (1d6)",
        "Peau d'ekimme (1d6)",
        "Salive de vampire (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Potion de sang noir",
        "Faiblesse céleste",
        "Vulnérable au feu",
        "Transfert sanguin"
      ],
      "abilities": [
        "Bond",
        "Invisibilité",
        "Nyctalopie",
        "Régénération"
      ]
    }
  },
  {
    "id": "monster-forktail",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Foënard",
      "en": "Forktail"
    },
    "threat": {
      "fr": "Fort Simple",
      "en": "Hard Simple"
    },
    "reward": {
      "fr": "950 couronnes",
      "en": "950 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 800 kg",
      "en": "Around 800 kg"
    },
    "environments": [
      "mountains",
      "plains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire ou en couple",
      "en": "Solitary or in pairs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "9",
        "DEX": "9",
        "COR": "9",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "90",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "9",
        "Vigilance": "8",
        "Bagarre": "8",
        "Mêlée": "8",
        "Esquive/Évasion": "7",
        "Athlétisme": "6",
        "Furtivité": "4( )",
        "Résilience": "7",
        "Courage": "8",
        "Résistance à la magie": "7"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Serres",
          "damage": "6d6+3",
          "effect": "Stupéfaction, Au sol",
          "attacksPerTurn": "1"
        },
        {
          "name": "Queue fourchue",
          "damage": "8d6",
          "effect": "Ablation, Poison (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Écailles de draconide (1d10)",
        "Extrait de venin (1d10)",
        "OEil de foënard (2)",
        "OEuf de foënard (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Résistances (Poison, T, P)",
        "Sauvage",
        "Vol"
      ]
    }
  },
  {
    "id": "monster-mire-glutton",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Glouton des vasières",
      "en": "Mire Glutton"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Jusqu’à 4 m",
      "en": "Up to 4 m"
    },
    "weight": {
      "fr": "Jusqu’à 1 000 kg",
      "en": "Up to 1,000 kg"
    },
    "environments": [
      "swamps",
      "marine"
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
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "13",
        "DEX": "12",
        "COR": "8",
        "VIT": "10",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "30",
        "SAUT": "6",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Survie": "7",
        "Vigilance": "7",
        "Bagarre": "8",
        "Mêlée": "8",
        "Esquive/Évasion": "6",
        "Athlétisme": "10",
        "Furtivité": "9",
        "Résilience": "8",
        "Courage": "8",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Pinces",
          "damage": "2d6",
          "effect": "Aucun",
          "attacksPerTurn": "6"
        }
      ],
      "loot": [
        "Chitine (1d6)",
        "Essence d’eau (1d6)",
        "Pinces de monstre (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Mouvement entravé"
      ],
      "abilities": [
        "Chasseur Sauteur",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-kikimore-worker",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Ouvrière kikimorrhe",
      "en": "Kikimore Worker"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Entre 1 et 3 m",
      "en": "1 to 3 m"
    },
    "weight": {
      "fr": "Entre 180 et 300 kg",
      "en": "180 to 300 kg"
    },
    "environments": [
      "swamps",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Colonies de 3 à 20",
      "en": "Colonies of 3 to 20"
    },
    "notes": {
      "fr": [
        "Les ouvrières sont plus petites et plus rapides que les autres kikimorrhes : VIT 10 et +2 en Athlétisme ainsi qu’en Esquive/Évasion."
      ],
      "en": [
        "Workers are smaller and faster than other kikimores: SPD 10 and +2 to Athletics and Dodge/Escape."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "8",
        "COR": "9",
        "VIT": "10",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "90",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "7",
        "Mêlée": "7",
        "Esquive/Évasion": "9",
        "Athlétisme": "8",
        "Furtivité": "6",
        "Physique": "10",
        "Résilience": "8",
        "Courage": "6",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "+15% Toxicité",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Chitine (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Pince de monstre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Bond",
        "Cécité",
        "Immunité au poison",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-kikimore-warrior",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Guerrière kikimorrhe",
      "en": "Kikimore Warrior"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Entre 1 et 3 m",
      "en": "1 to 3 m"
    },
    "weight": {
      "fr": "Entre 180 et 300 kg",
      "en": "180 to 300 kg"
    },
    "environments": [
      "swamps",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Colonies de 3 à 20",
      "en": "Colonies of 3 to 20"
    },
    "notes": {
      "fr": [
        "Plus imposantes et robustes que les ouvrières (Armure 20), les guerrières dirigent les ouvrières par des ordres simples (« Apportez ça », « Attaquez ceci », « Creusez là »)."
      ],
      "en": [
        "Larger and stronger than workers (Armor 20), warriors issue simple commands to nearby workers such as “Fetch that,” “Attack this,” or “Dig there.”"
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "8",
        "COR": "9",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "90",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "7",
        "Mêlée": "7",
        "Esquive/Évasion": "7",
        "Athlétisme": "6",
        "Furtivité": "6",
        "Physique": "10",
        "Résilience": "8",
        "Courage": "6",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "+15% Toxicité",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "+30% Toxicité",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chitine (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Pince de monstre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Bond",
        "Cécité",
        "Commander les ouvrières",
        "Immunité au poison",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-kikimore-queen",
    "kind": "monster",
    "typeId": "insectoid",
    "name": {
      "fr": "Reine kikimorrhe",
      "en": "Kikimore Queen"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Entre 1 et 3 m",
      "en": "1 to 3 m"
    },
    "weight": {
      "fr": "Entre 180 et 300 kg",
      "en": "180 to 300 kg"
    },
    "environments": [
      "swamps",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Colonies de 3 à 20",
      "en": "Colonies of 3 to 20"
    },
    "notes": {
      "fr": [
        "Rares et gigantesques, les reines sont immunisées contre tous les effets (y compris le feu), résistent aux dégâts tranchants, perforants et contondants, disposent de 20 d’armure et renversent leurs cibles à l’impact, mais n’ont qu’une VIT de 3."
      ],
      "en": [
        "Rare and colossal, queens are immune to all status effects including fire, resist slashing, piercing, and bludgeoning attacks, have 20 armor, and knock targets prone—offset by a sluggish SPD of 3."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "7",
        "DEX": "8",
        "COR": "9",
        "VIT": "3",
        "EMP": "1",
        "TECH": "1",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "90",
        "RÉC": "8",
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "8",
        "Bagarre": "7",
        "Mêlée": "7",
        "Esquive/Évasion": "7",
        "Athlétisme": "6",
        "Furtivité": "6",
        "Physique": "10",
        "Résilience": "8",
        "Courage": "6",
        "Résistance à la magie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "+15% Toxicité, Au sol",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "+30% Toxicité, Au sol",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chitine (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Pince de monstre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les insectoïdes"
      ],
      "abilities": [
        "Bond",
        "Cécité",
        "Immunité aux effets",
        "Résistance (T,P,C)",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-koshchey",
    "kind": "monster",
    "typeId": "beast",
    "name": {
      "fr": "Kochtcheï",
      "en": "Koshchey"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
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
      "summoning"
    ],
    "intelligence": {
      "fr": "Humaine",
      "en": "Human"
    },
    "organization": {
      "fr": "Bandes de 3 à 15 individus",
      "en": "Swarms of 3 to 15 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
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
        "Survie": "16",
        "Vigilance": "16",
        "Bagarre": "7",
        "Mêlée": "8",
        "Esquive/Évasion": "8",
        "Athlétisme": "8",
        "Furtivité": "5",
        "Résilience": "10",
        "Courage": "15",
        "Résistance à la magie": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Aveuglement (25%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Pénétration d’armure",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Coeur de kochtcheï (1)",
        "Chitine (3d6)"
      ],
      "vulnerabilities": [
        "Huile contre les bêtes",
        "Vulnérabilité de l'argent",
        "Exosquelette"
      ],
      "abilities": [
        "Amphibien",
        "Bête de destruction",
        "Farouche",
        "Grimpeur"
      ]
    }
  },
  {
    "id": "monster-mula",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Mula",
      "en": "Mula"
    },
    "threat": {
      "fr": "Dur Difficile",
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
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 120 kg",
      "en": "Around 120 kg"
    },
    "environments": [
      "ruins",
      "caves"
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
        "Rage sanguine : ses yeux brillent et il ne se transforme plus en brouillard ; ses attaques gagnent +2 en Fia et ses griffes frappent 2 fois par tour. Dure 5 tours ou jusqu’à ce que le mula subisse une blessure critique."
      ],
      "en": [
        "Blood Rage: eyes glow and mist-form ceases; attacks gain +2 precision and claws strike twice per turn. Lasts 5 turns or until the mula suffers a critical wound."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "15",
        "DEX": "11",
        "COR": "10",
        "VIT": "8",
        "EMP": "3",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "24",
        "SAUT": "4",
        "END": "40",
        "ENC": "100",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "10",
        "Bagarre": "8",
        "Mêlée": "9",
        "Esquive/Évasion": "9",
        "Athlétisme": "9",
        "Furtivité": "10",
        "Résilience": "10",
        "Courage": "10",
        "Intimidation": "12",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Aucun",
          "attacksPerTurn": "1"
        },
        {
          "name": "Crocs",
          "damage": "6d6",
          "effect": "Saignement (100%), active Rage sanguine",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Rune aléatoire",
        "Crocs de vampire (1d6/2)",
        "Salive de vampire (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Potion de sang noir",
        "Transfert sanguin",
        "Briser les crocs"
      ],
      "abilities": [
        "Bond",
        "Brouillard",
        "Invisible à la scrutation magique",
        "Nyctalopie",
        "Rage sanguine"
      ]
    }
  },
  {
    "id": "monster-necrophage",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Nécrophage",
      "en": "Necrophage"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "100 couronnes",
      "en": "100 crowns"
    },
    "armor": {
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,60 m",
      "en": "Around 1.60 m"
    },
    "weight": {
      "fr": "Environ 60 kg",
      "en": "Around 60 kg"
    },
    "environments": [
      "deserts",
      "graveyards"
    ],
    "intelligence": {
      "fr": "Peut-être au niveau humain",
      "en": "Potentially human-level"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Compagnons fantomatiques : les barghests invoqués obéissent à tous ses ordres et ne disparaissent que lorsqu’ils sont détruits ou à la mort du nécrophage."
      ],
      "en": [
        "Spectral Companions: summoned barghests obey every command and remain until slain or until the necrophage dies, often guarding its territory."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "8",
        "COR": "6",
        "VIT": "7",
        "EMP": "4",
        "TECH": "5",
        "VOL": "7",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "4",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "12",
        "Vigilance": "8",
        "Bagarre": "7",
        "Mêlée": "7",
        "Esquive/Évasion": "4",
        "Athlétisme": "8",
        "Furtivité": "6",
        "Résilience": "8",
        "Courage": "8",
        "Alchimie": "3 (Tec)",
        "Artisanat": "3 (Tec)",
        "Résistance à la contrainte": "9",
        "Résistance à la magie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Poison (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6)",
        "Langue de nécrophage (1)",
        "Oreilles de nécrophage (2)",
        "Objets étranges (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages"
      ],
      "abilities": [
        "Familiarité",
        "Compagnons fantomatiques",
        "Jet acide",
        "Immunité au poison",
        "Nyctalopie"
      ]
    }
  },
  {
    "id": "monster-nekurat",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Nekurat",
      "en": "Nekurat"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 750 couronnes",
      "en": "1,750 crowns"
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
      "fr": "Environ 100 kg",
      "en": "Around 100 kg"
    },
    "environments": [
      "caves",
      "ruins",
      "urban"
    ],
    "intelligence": {
      "fr": "Au-dessus du niveau humain",
      "en": "Above human intelligence"
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
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "14",
        "DEX": "15",
        "COR": "8",
        "VIT": "14",
        "EMP": "8",
        "TECH": "4",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "9",
        "COU": "42",
        "SAUT": "8",
        "END": "45",
        "ENC": "80",
        "RÉC": "9",
        "PS": "90",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "12",
        "Bagarre": "8",
        "Mêlée": "8",
        "Esquive/Évasion": "12",
        "Athlétisme": "12",
        "Furtivité": "13",
        "Résilience": "5",
        "Charisme": "8 (Emp)",
        "Persuasion": "8 (Emp)",
        "Courage": "8",
        "Intimidation": "7",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "8d6",
          "effect": "Saignement (25%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Crocs",
          "damage": "10d6",
          "effect": "Saignement (75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Glyphe ou Rune aléatoire",
        "Crocs de vampire (1d6/2)",
        "Salive de vampire (1d6)",
        "Potentiellement une relique"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Potion de sang noir",
        "Faiblesse céleste",
        "Transfert sanguin"
      ],
      "abilities": [
        "Changeforme",
        "Immunité",
        "Invisible à la scrutation magique",
        "Nyctalopie",
        "Régénération (5)"
      ]
    }
  },
  {
    "id": "monster-penitent",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Pénitent",
      "en": "Penitent"
    },
    "threat": {
      "fr": "Fort Simple",
      "en": "Hard Simple"
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
      "fr": "Consumé par la colère",
      "en": "Consumed by wrath"
    },
    "organization": {
      "fr": "Solitaire, mais souvent entouré de spectres",
      "en": "Solitary, often surrounded by wraiths"
    },
    "notes": {
      "fr": [
        "Commandement des spectres : dirige les spectres mineurs par des ordres tactiques simples (« Tuez-les d’abord », « Gardez celui-ci pour la fin », « Retraite »)."
      ],
      "en": [
        "Command Wraiths: issues simple tactical orders to lesser specters (“Kill them first,” “Save that one for last,” “Retreat”)."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "9",
        "DEX": "7",
        "COR": "8",
        "VIT": "6",
        "EMP": "1",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "18",
        "SAUT": "3",
        "END": "40",
        "ENC": "80",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Survie": "4",
        "Vigilance": "10",
        "Bagarre": "8",
        "Escrime": "9",
        "Esquive/Évasion": "8",
        "Mêlée": "8",
        "Athlétisme": "4",
        "Furtivité": "8",
        "Résilience": "6",
        "Résistance à la magie": "7"
      },
      "weapons": [
        {
          "name": "Epée de spectre",
          "damage": "5d6",
          "effect": "Aucun",
          "attacksPerTurn": "3"
        },
        {
          "name": "Lanterne de spectre",
          "damage": "6d6",
          "effect": "Feu (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Poussière de lune et Yrden",
        "Pénitence effectuée"
      ],
      "abilities": [
        "Alimenté par la colère",
        "Commandement des spectres",
        "Invoquer des spectres",
        "Incorporel",
        "Téléportation"
      ]
    }
  },
  {
    "id": "monster-scurver",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Piqueteur",
      "en": "Scurver"
    },
    "threat": {
      "fr": "Faible Difficile",
      "en": "Easy Hard"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
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
      "fr": "Environ 90 kg",
      "en": "Around 90 kg"
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
      "fr": "Bandes de 3 à 6 individus, souvent avec des putréfacteurs",
      "en": "Packs of 3 to 6 individuals, often with rotfiends"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
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
        "PS": "40",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "6",
        "Bagarre": "7",
        "Mêlée": "7",
        "Esquive/Évasion": "5",
        "Athlétisme": "7",
        "Furtivité": "5",
        "Résilience": "5",
        "Courage": "8",
        "Résistance à la magie": "5"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6",
          "effect": "Saignement (25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Morsure",
          "damage": "4d6",
          "effect": "-1 Fia, Saignement (50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6/2)",
        "Griffes de putréfacteur (2)",
        "Moelle de putréfacteur (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Gaz inflammables"
      ],
      "abilities": [
        "Bond",
        "Explosion",
        "Nyctalopie",
        "Sauvage"
      ]
    }
  },
  {
    "id": "monster-nightwraith",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Spectre de minuit",
      "en": "Nightwraith"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "750 couronnes",
      "en": "750 crowns"
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
      "urban",
      "plains"
    ],
    "intelligence": {
      "fr": "Consumé par le chagrin",
      "en": "Consumed by sorrow"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [
        "Veilleuse : tant que ses copies existent, tous les êtres vivants dans un rayon de 30 m subissent 3 dégâts par tour. Les copies n’attaquent pas mais se défendent ; un coup porté détruit une copie, et toutes doivent tomber pour que le spectre réapparaisse."
      ],
      "en": [
        "Night Light: while its spectral copies exist, all living beings within 30 m take 3 damage per turn. Copies do not attack but defend; any hit destroys a copy, and the nightwraith reappears once all are vanquished."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "9",
        "DEX": "6",
        "COR": "6",
        "VIT": "5",
        "EMP": "1",
        "TECH": "1",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Survie": "5",
        "Vigilance": "10",
        "Bagarre": "7",
        "Mêlée": "8",
        "Esquive/Évasion": "8",
        "Athlétisme": "4",
        "Furtivité": "10",
        "Résilience": "6",
        "Incantation": "7",
        "Résistance à la magie": "7"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6+4",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Essence de fantôme (1d6)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Poussière de lune et Yrden",
        "Faiblesse céleste",
        "Changeant"
      ],
      "abilities": [
        "Alimenté par le chagrin",
        "Démon de poussière",
        "Incorporel",
        "Veilleuse"
      ]
    }
  },
  {
    "id": "monster-ice-troll",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Troll de glace",
      "en": "Ice Troll"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "850 couronnes",
      "en": "850 crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Environ 4 m",
      "en": "Around 4 m"
    },
    "weight": {
      "fr": "Environ 150 kg",
      "en": "Around 150 kg"
    },
    "environments": [
      "mountains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain simplet",
      "en": "As intelligent as a simpleton human"
    },
    "organization": {
      "fr": "Solitaire ou groupes de 2 à 3 individus",
      "en": "Solitary or groups of 2 to 3 individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "3",
        "RÉF": "10",
        "DEX": "6",
        "COR": "14",
        "VIT": "4",
        "EMP": "1",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "10",
        "COU": "12",
        "SAUT": "2",
        "END": "50",
        "ENC": "140",
        "RÉC": "10",
        "PS": "100",
        "VIG": "0"
      },
      "skills": {
        "Survie": "8",
        "Vigilance": "7",
        "Bagarre": "8",
        "Esquive/Évasion": "5",
        "Athlétisme": "4",
        "Furtivité": "2",
        "Physique": "8",
        "Résilience": "8",
        "Courage": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Poings",
          "damage": "6d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Foie de troll (1)",
        "Objets communs (1d6)",
        "Peau de troll (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes",
        "Point faible (abdomen - 5)",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Force écrasante",
        "Lanceur de roche",
        "Né dans la glace",
        "Résistances (C,T,P)"
      ]
    }
  },
  {
    "id": "monster-wild-hunt-warrior",
    "kind": "monster",
    "typeId": "humanoid",
    "name": {
      "fr": "Guerrier de la Chasse Sauvage",
      "en": "Wild Hunt Warrior"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "100 couronnes",
      "en": "100 crowns"
    },
    "armor": {
      "fr": "Tête : 30, Torse : 30, Jambes : 30",
      "en": "Head: 30, Torso: 30, Legs: 30"
    },
    "size": {
      "fr": "Taille Aen Elle",
      "en": "Aen Elle size"
    },
    "weight": {
      "fr": "Poids Aen Elle",
      "en": "Aen Elle weight"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "fr": "Humaine",
      "en": "Human"
    },
    "organization": {
      "fr": "Bandes de 3+ individus, souvent accompagnées de molosses",
      "en": "Bands of 3+ individuals, often accompanied by hounds"
    },
    "notes": {
      "fr": [
        "Bouclier : certains guerriers portent un bouclier qu’ils utilisent habilement pour bloquer les attaques et protéger leurs camarades des projectiles.",
        "Cavalier : ceux qui chevauchent un destrier de guerre bénéficient d’un bonus supplémentaire de +5 aux jets de contrôle de monture."
      ],
      "en": [
        "Shield: some warriors carry shields, using them skillfully to block incoming blows and intercept projectiles aimed at allies.",
        "Rider: warriors mounted on loyal warhorses gain an extra +5 bonus to Ride/Control checks."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "8",
        "DEX": "6",
        "COR": "8",
        "VIT": "6",
        "EMP": "4",
        "TECH": "3",
        "VOL": "6",
        "CHA": "0",
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
          "name": "Epée de la Chasse Sauvage",
          "damage": "5d6",
          "effect": "+2 Fia, Gel (50%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Hache de la Chasse Sauvage",
          "damage": "5d6+2",
          "effect": "+1 Fia, Gel (50%), Saignement (25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Masse de la Chasse Sauvage",
          "damage": "6d6",
          "effect": "+1 Fia, Gel (50%), -2 ETOU",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Armure de la Chasse Sauvage",
        "Son arme",
        "Son bouclier (si utilisé)",
        "Objet commun (1d6/2)"
      ],
      "vulnerabilities": [
        "Venin du pendu"
      ],
      "abilities": [
        "Bouclier",
        "Cavalier",
        "Immunité au gel",
        "Résistances"
      ]
    }
  },
  {
    "id": "monster-wild-hunt-hound",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Molosse de la Chasse Sauvage",
      "en": "Hound of the Wild Hunt"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Environ 80 cm",
      "en": "Around 80 cm"
    },
    "weight": {
      "fr": "Environ 80 kg",
      "en": "Around 80 kg"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Bandes de 3+ individus",
      "en": "Packs of 3+ individuals"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "6",
        "DEX": "8",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "21",
        "SAUT": "4",
        "END": "20",
        "ENC": "50",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Survie": "6",
        "Vigilance": "6",
        "Bagarre": "6",
        "Mêlée": "6",
        "Esquive/Évasion": "4",
        "Athlétisme": "7",
        "Furtivité": "4",
        "Résilience": "6",
        "Courage": "7",
        "Résistance à la magie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "2d6+3",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "3d6+1",
          "effect": "Gel (100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Chair pourrie (1d6)",
        "Os de bête (1d6)",
        "Soufre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Immunité au gel",
        "Nature gelée",
        "Pointes de glace",
        "Sauvage",
        "Traque olfactive"
      ]
    }
  },
  {
    "id": "monster-wild-hunt-navigator",
    "kind": "monster",
    "typeId": "humanoid",
    "name": {
      "fr": "Navigatrice de la Chasse Sauvage",
      "en": "Wild Hunt Navigator"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "150 couronnes",
      "en": "150 crowns"
    },
    "armor": {
      "fr": "Tête : 18, Torse : 18, Jambes : 18",
      "en": "Head: 18, Torso: 18, Legs: 18"
    },
    "size": {
      "fr": "Taille Aen Elle",
      "en": "Aen Elle size"
    },
    "weight": {
      "fr": "Poids Aen Elle",
      "en": "Aen Elle weight"
    },
    "environments": [
      "everywhere"
    ],
    "intelligence": {
      "fr": "Humaine",
      "en": "Human"
    },
    "organization": {
      "fr": "Solitaire, accompagné par des guerriers et molosses",
      "en": "Solitary, escorted by warriors and hounds"
    },
    "notes": {
      "fr": [
        "Sorts maîtrisés : Dissipation, Invocation de bâton, Aire de glace, Grêle de Cary, Vague du Naglfar, Tryferi Gaeaf."
      ],
      "en": [
        "Spells available: Dispel, Summon Staff, Ice Patch, Cary’s Hail, Wave of the Naglfar, Tryferi Gaeaf."
      ]
    },
    "isFanMade": false,
    "source": "extended",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "8",
        "DEX": "6",
        "COR": "5",
        "VIT": "6",
        "EMP": "5",
        "TECH": "5",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "18",
        "SAUT": "3",
        "END": "35",
        "ENC": "50",
        "RÉC": "7",
        "PS": "35",
        "VIG": "20"
      },
      "skills": {
        "Survie": "5",
        "Vigilance": "7",
        "Bâton/Lance": "7",
        "Bagarre": "5",
        "Esquive/Évasion": "8",
        "Athlétisme": "5",
        "Furtivité": "4",
        "Physique": "5",
        "Résilience": "6",
        "Courage": "6",
        "Incantation": "8",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "8"
      },
      "weapons": [
        {
          "name": "Bâton de navigatrice",
          "damage": "3d6",
          "effect": "Allonge, Focus (2), Focus supérieur, +1 Fia, Gel (50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Armure de navigatrice",
        "Bâton de navigatrice",
        "Objets communs (1d6)",
        "Potentiellement un schéma de la chasse sauvage"
      ],
      "vulnerabilities": [
        "Venin du pendu",
        "Dimeritium"
      ],
      "abilities": [
        "Immunité au gel",
        "Invoquer des molosses",
        "Portail",
        "Sort",
        "Téléportation"
      ]
    }
  },
  {
    "id": "monster-water-hag",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Abaya",
      "en": "Water Hag"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Jusqu’à 80 kg",
      "en": "Up to 80 kg"
    },
    "environments": [
      "marine",
      "swamps"
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
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "5",
        "RÉF": "8",
        "DEX": "10",
        "COR": "5",
        "VIT": "7",
        "EMP": "3",
        "TECH": "3",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "21",
        "SAUT": "4",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "7",
        "Bagarre": "4",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "8",
        "Mêlée": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "9",
        "Furtivité": "8",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Dents d’abaya (1d6/2)",
        "Objets étranges (1d6)",
        "Rune aléatoire",
        "Essence d’eau"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Jet de boue",
        "Amphibien",
        "Bauge",
        "Sol humide",
        "Chef des noyeurs",
        "Sous la pluie"
      ]
    }
  },
  {
    "id": "monster-alp",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Alpyre",
      "en": "Alp"
    },
    "threat": {
      "fr": "Difficile Complexe",
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
      "fr": "Environ 1,5 m",
      "en": "Around 1.5 m"
    },
    "weight": {
      "fr": "Environ 75 kg",
      "en": "Around 75 kg"
    },
    "environments": [
      "urban",
      "caves"
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
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "12",
        "DEX": "11",
        "COR": "6",
        "VIT": "10",
        "EMP": "8",
        "TECH": "4",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "30",
        "SAUT": "12",
        "END": "50",
        "ENC": "60",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "10",
        "Vigilance": "8",
        "Bagarre": "8",
        "Charisme": "9",
        "Courage": "6",
        "Duperie": "10",
        "Esquive/Évasion": "10",
        "Perception humaine": "8",
        "Intimidation": "4",
        "Mêlée": "7",
        "Résistance à la contrainte": "8",
        "Résistance à la magie": "9",
        "Séduction": "10",
        "Furtivité": "9"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "2d6+2",
          "effect": "Saignement(100%) Salive anesthésiante",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Dent de vampire (1d10)",
        "Doses de sédatif (1d6/2)",
        "Butin aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Potion Sang noir",
        "Transfert sanguin",
        "Argent",
        "Bombe Poussière de lune"
      ],
      "abilities": [
        "Régénération",
        "Charge rapide",
        "Illusion",
        "Nyctalopie",
        "Salive anesthésiante",
        "Hurlement sonique"
      ]
    }
  },
  {
    "id": "monster-amarok",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Amarok",
      "en": "Amarok"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1 m",
      "en": "Around 1 m"
    },
    "weight": {
      "fr": "Environ 70 kg",
      "en": "Around 70 kg"
    },
    "environments": [
      "forests",
      "plains"
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
        "RÉF": "6",
        "DEX": "8",
        "COR": "5",
        "VIT": "11",
        "EMP": "1",
        "TECH": "1",
        "VOL": "12",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "33",
        "SAUT": "6",
        "END": "35",
        "ENC": "50",
        "RÉC": "7",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "5",
        "Bagarre": "6",
        "Courage": "10",
        "Esquive/Évasion": "2",
        "Résilience": "10",
        "Intimidation": "10",
        "Mêlée": "7",
        "Résistance à la magie": "7",
        "Incantation": "7",
        "Furtivité": "7"
      },
      "weapons": [
        {
          "name": "Morsures",
          "damage": "4d6+1",
          "effect": "Gel",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Poussière imprégnée (1d6)",
        "Essence de lumière (1d6/2)",
        "Peau de loup"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Faiblesse astrale",
        "Chat (potion)",
        "Bannissement"
      ],
      "abilities": [
        "Revirement",
        "Chasseur sans fin",
        "Invisibilité",
        "Sauvage",
        "Nyctalopie",
        "Phobavore"
      ]
    }
  },
  {
    "id": "monster-barghest-fan",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Barghest (fan)",
      "en": "Barghest (fan)"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
    },
    "reward": {
      "fr": "50 couronnes",
      "en": "50 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "Taille canine (env. 1 m)",
      "en": "Canine size (~1 m)"
    },
    "weight": {
      "fr": "Intangible / ~40 kg",
      "en": "Intangible / ~40 kg"
    },
    "environments": [
      "summoning"
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
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "5",
        "DEX": "6",
        "COR": "5",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
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
        "Athlétisme": "7",
        "Vigilance": "8",
        "Bagarre": "7",
        "Courage": "4",
        "Esquive/Évasion": "7",
        "Résilience": "6",
        "Mêlée": "7",
        "Résistance à la magie": "5",
        "Incantation": "5",
        "Furtivité": "5"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "3d6+2",
          "effect": "Feu(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de lumière (1d6/2)",
        "Poussière de spectre (1d6)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Poussière de lune et Yrden"
      ],
      "abilities": [
        "Nyctalopie",
        "Immunité au poison",
        "Sauvage",
        "Décalage",
        "Flash aveuglant",
        "Corps enflammés"
      ]
    }
  },
  {
    "id": "monster-basilisk",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Basilic",
      "en": "Basilisk"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
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
      "fr": "1,5 m au garrot",
      "en": "1.5 m at shoulder"
    },
    "weight": {
      "fr": "Environ 70 kg",
      "en": "Around 70 kg"
    },
    "environments": [
      "sewers",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire ou en couple",
      "en": "Solitary or in pairs"
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
        "DEX": "9",
        "COR": "9",
        "VIT": "8",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "24",
        "SAUT": "5",
        "END": "35",
        "ENC": "90",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "8",
        "Bagarre": "7",
        "Courage": "4",
        "Esquive/Évasion": "6",
        "Résilience": "6",
        "Mêlée": "8",
        "Résistance à la magie": "7",
        "Furtivité": "3",
        "Survie": "8"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "4d6+2",
          "effect": "Aucun",
          "attacksPerTurn": "2"
        },
        {
          "name": "Bec",
          "damage": "5d6+2",
          "effect": "Poison(100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d10)",
        "Ecailles de draconide (1d6)",
        "Glande à venin"
      ],
      "vulnerabilities": [
        "Huile contre les draconides",
        "Vulnérable au feu"
      ],
      "abilities": [
        "Vol",
        "Immunité au poison",
        "Sauvage",
        "Extrêmement venimeux",
        "Peau durcie",
        "Haleine nocive",
        "Résistances (T,P)"
      ]
    }
  },
  {
    "id": "monster-foglet-fan",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Brumelin (fan)",
      "en": "Foglet (fan)"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 1,5 m",
      "en": "Around 1.5 m"
    },
    "weight": {
      "fr": "Environ 65 kg",
      "en": "Around 65 kg"
    },
    "environments": [
      "swamps"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain stupide",
      "en": "As intelligent as a dull human"
    },
    "organization": {
      "fr": "Solitaire, rarement en petits groupes",
      "en": "Solitary, rarely in small groups"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "9",
        "DEX": "9",
        "COR": "6",
        "VIT": "8",
        "EMP": "2",
        "TECH": "1",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "24",
        "SAUT": "4",
        "END": "35",
        "ENC": "70",
        "RÉC": "7",
        "PS": "50",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "3",
        "Vigilance": "7",
        "Bagarre": "6",
        "Courage": "3",
        "Duperie": "10",
        "Esquive/Évasion": "8",
        "Résilience": "5",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "7",
        "Incantation": "8",
        "Furtivité": "9",
        "Survie": "5"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Phosphore (1d6)",
        "Poussière imprégnée (1d6/2)",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages",
        "Aard et Yrden"
      ],
      "abilities": [
        "Capacités",
        "Décalage",
        "Téléportation",
        "Brouillardier",
        "Illusions",
        "Nyctalopie",
        "Sensibilité",
        "Leurre"
      ]
    }
  },
  {
    "id": "monster-cockatrice-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Cocatrix (fan)",
      "en": "Cockatrice (fan)"
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
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "1,2 m au garrot",
      "en": "1.2 m at shoulder"
    },
    "weight": {
      "fr": "Environ 500 kg",
      "en": "Around 500 kg"
    },
    "environments": [
      "ruins",
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
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "8",
        "DEX": "9",
        "COR": "7",
        "VIT": "9",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "27",
        "SAUT": "5",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "7",
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
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Bec",
          "damage": "5d6",
          "effect": "Poison(50%) Saignement(50%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6)",
        "Ecailles de draconide (1d6/2)",
        "Solution acide (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les draconides",
        "Gaz inflammables"
      ],
      "abilities": [
        "Vol",
        "Immunité au poison",
        "Sauvage",
        "Haleine toxique",
        "Brouillard toxique",
        "Résistances (T)"
      ]
    }
  },
  {
    "id": "monster-botchling-fan",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Couvin (fan)",
      "en": "Botchling (fan)"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 0,5 m",
      "en": "Around 0.5 m"
    },
    "weight": {
      "fr": "Environ 40 kg",
      "en": "Around 40 kg"
    },
    "environments": [
      "everywhere"
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
        "INT": "3",
        "RÉF": "2",
        "DEX": "7",
        "COR": "3",
        "VIT": "2",
        "EMP": "3",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "4",
        "COU": "6",
        "SAUT": "1",
        "END": "20",
        "ENC": "30",
        "RÉC": "4",
        "PS": "20",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "9",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "7",
        "Résistance à la magie": "7",
        "Furtivité": "9",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+3",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "4d6+2",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de lumière (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Dent de couvin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Transfert sanguin"
      ],
      "abilities": [
        "Transformation",
        "Appât de spectre",
        "Nyctalopie",
        "Bond (T)",
        "Epines (T)",
        "Drainage du sang"
      ]
    }
  },
  {
    "id": "monster-lubberkin-fan",
    "kind": "monster",
    "typeId": "cursed",
    "name": {
      "fr": "Couvin transformé (fan)",
      "en": "Lubberkin (fan)"
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
      "fr": "0",
      "en": "0"
    },
    "size": {
      "fr": "Environ 0,5 m",
      "en": "Around 0.5 m"
    },
    "weight": {
      "fr": "Environ 40 kg",
      "en": "Around 40 kg"
    },
    "environments": [
      "everywhere"
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
        "INT": "3",
        "RÉF": "8",
        "DEX": "8",
        "COR": "6",
        "VIT": "6",
        "EMP": "3",
        "TECH": "1",
        "VOL": "7",
        "ÉTOU": "6",
        "COU": "18",
        "SAUT": "3",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "9",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "7",
        "Résistance à la magie": "7",
        "Furtivité": "9",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "3d6+3",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "4d6+2",
          "effect": "Saignement(75%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de lumière (1d6/2)",
        "Extrait de venin (1d6/2)",
        "Dent de couvin (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les créatures maudites",
        "Transfert sanguin"
      ],
      "abilities": [
        "Transformation",
        "Appât de spectre",
        "Nyctalopie",
        "Bond (T)",
        "Epines (T)",
        "Drainage du sang"
      ]
    }
  },
  {
    "id": "monster-cyclops-fan",
    "kind": "monster",
    "typeId": "ogroid",
    "name": {
      "fr": "Cyclope (fan)",
      "en": "Cyclops (fan)"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 750 couronnes",
      "en": "1,750 crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Jusqu’à 5 m",
      "en": "Up to 5 m"
    },
    "weight": {
      "fr": "Environ 1 600 kg",
      "en": "Around 1,600 kg"
    },
    "environments": [
      "mountains",
      "caves",
      "plains"
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
      "fr": [
        "Bien que particulièrement stupides, les cyclopes savent fabriquer des pièges étonnamment sophistiqués pour protéger leurs repaires."
      ],
      "en": [
        "Despite their dim intellect, cyclopes craft surprisingly intricate traps to guard the approaches to their lairs."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "8",
        "DEX": "6",
        "COR": "18",
        "VIT": "5",
        "EMP": "1",
        "TECH": "6",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "15",
        "SAUT": "3",
        "END": "110",
        "ENC": "180",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "3",
        "Vigilance": "8",
        "Bagarre": "6",
        "Courage": "7",
        "Esquive/Évasion": "4",
        "Résilience": "10",
        "Mêlée": "7",
        "Physique": "10",
        "Résistance à la contrainte": "7",
        "Résistance à la magie": "8",
        "Fabrication de pièges": "6",
        "Survie": "7"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "8d6+6",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Un arbre",
          "damage": "8d6+2",
          "effect": "Longue portée(4m) Etourdissement(-2)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (2d10)",
        "Runes aléatoires (2)",
        "Oeil de cyclope"
      ],
      "vulnerabilities": [
        "Huile contre les ogroïdes"
      ],
      "abilities": [
        "Force écrasante",
        "Œil-qui-voit-tout",
        "Massif",
        "Balayage",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-devourer",
    "kind": "monster",
    "typeId": "necrophage",
    "name": {
      "fr": "Dévoreur",
      "en": "Devourer"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
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
      "fr": "Environ 2 m",
      "en": "Around 2 m"
    },
    "weight": {
      "fr": "Environ 150 kg",
      "en": "Around 150 kg"
    },
    "environments": [
      "battlefields",
      "graveyards",
      "caves"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain stupide",
      "en": "As intelligent as a dull human"
    },
    "organization": {
      "fr": "Solitaire, parfois avec des goules",
      "en": "Solitary, occasionally with ghouls"
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
        "DEX": "6",
        "COR": "8",
        "VIT": "5",
        "EMP": "3",
        "TECH": "6",
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
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "7",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "6",
        "Mêlée": "6",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "4",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "6d6",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Moelle de goule (1d6)",
        "Phosphore (1d6/2)",
        "Soufre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les nécrophages"
      ],
      "abilities": [
        "Avaler en entier",
        "Chef de meute",
        "Nyctalopie",
        "Immunité au poison",
        "Robuste"
      ]
    }
  },
  {
    "id": "monster-doppler",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Doppler",
      "en": "Doppler"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
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
      "fr": "Environ 1,5 m",
      "en": "Around 1.5 m"
    },
    "weight": {
      "fr": "Environ 100 kg",
      "en": "Around 100 kg"
    },
    "environments": [
      "everywhere"
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
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "7",
        "EMP": "9",
        "CHA": "0"
      },
      "skills": {
        "Envoûtement": "8",
        "Duperie": "10",
        "Perception humaine": "9",
        "Intimidation": "6",
        "Résistance à la contrainte": "7",
        "Séduction": "9"
      },
      "weapons": [],
      "loot": [
        "Cinquième essence (1d6/2)",
        "Objets communs (1d6)",
        "Eventuels biens volés"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Contact de l’argent"
      ],
      "abilities": [
        "Mimétisme"
      ]
    }
  },
  {
    "id": "monster-black-dragon-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon noir (fan)",
      "en": "Black Dragon (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500+ couronnes",
      "en": "1,500+ crowns"
    },
    "armor": {
      "fr": "20",
      "en": "20"
    },
    "size": {
      "fr": "Variable, jusqu’à 6 m au garrot",
      "en": "Variable, up to 6 m"
    },
    "weight": {
      "fr": "Variable, jusqu’à 1 500 kg",
      "en": "Variable, up to 1,500 kg"
    },
    "environments": [
      "forests",
      "caves",
      "mountains"
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
        "Ces profils représentent les variétés de dragons plus modestes ; le MJ peut renforcer les statistiques pour les grands anciens.",
        "Les dragons noirs soufflent un gaz nocif infligeant 5d6 dégâts et 2d6 d’ablation, et bénéficient d’une armure doublée."
      ],
      "en": [
        "These baseline stats represent smaller dragons; GMs should scale them up for elder specimens.",
        "Black dragons breathe a noxious gas dealing 5d6 damage plus 2d6 ablation, and possess double the listed armor."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "6",
        "TECH": "3",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "8",
        "Bagarre": "9",
        "Envoûtement": "5",
        "Courage": "7",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Intimidation": "5",
        "Mêlée": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Ablation Perçage d’armure",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Oeil de dragon (2)",
        "Dent de dragon (1d10)",
        "Ecailles de draconides (2d10)",
        "Coeur de dragon",
        "Pillage de son trésor"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Massif",
        "Vol",
        "Harmonie avec la magie",
        "Souffle",
        "Nyctalopie",
        "Absorption de magie",
        "Immunités (noirs: poison, rouges & dorés: feu, blancs: froid|gel)",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-green-dragon-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon vert (fan)",
      "en": "Green Dragon (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500+ couronnes",
      "en": "1,500+ crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Variable, jusqu’à 6 m au garrot",
      "en": "Variable, up to 6 m"
    },
    "weight": {
      "fr": "Variable, jusqu’à 1 500 kg",
      "en": "Variable, up to 1,500 kg"
    },
    "environments": [
      "forests",
      "caves",
      "mountains"
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
        "Ces profils représentent les variétés de dragons plus modestes ; le MJ peut renforcer les statistiques pour les grands anciens.",
        "Les dragons verts soufflent de la vapeur brûlante (6d6 dégâts et effet Étourdissement) et sont amphibies."
      ],
      "en": [
        "These baseline stats represent smaller dragons; GMs should scale them up for elder specimens.",
        "Green dragons breathe scalding steam (6d6 damage with Stun effect) and are amphibious."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "6",
        "TECH": "3",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "8",
        "Bagarre": "9",
        "Envoûtement": "5",
        "Courage": "7",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Intimidation": "5",
        "Mêlée": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Ablation Perçage d’armure",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Oeil de dragon (2)",
        "Dent de dragon (1d10)",
        "Ecailles de draconides (2d10)",
        "Coeur de dragon",
        "Pillage de son trésor"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Massif",
        "Vol",
        "Harmonie avec la magie",
        "Souffle",
        "Nyctalopie",
        "Absorption de magie",
        "Immunités (noirs: poison, rouges & dorés: feu, blancs: froid|gel)",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-white-dragon-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon blanc (fan)",
      "en": "White Dragon (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500+ couronnes",
      "en": "1,500+ crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Variable, jusqu’à 6 m au garrot",
      "en": "Variable, up to 6 m"
    },
    "weight": {
      "fr": "Variable, jusqu’à 1 500 kg",
      "en": "Variable, up to 1,500 kg"
    },
    "environments": [
      "forests",
      "caves",
      "mountains"
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
        "Ces profils représentent les variétés de dragons plus modestes ; le MJ peut renforcer les statistiques pour les grands anciens.",
        "Les dragons blancs soufflent un brouillard glacial infligeant 6d6 dégâts et provoquant l’effet Gel."
      ],
      "en": [
        "These baseline stats represent smaller dragons; GMs should scale them up for elder specimens.",
        "White dragons breathe a freezing mist dealing 6d6 damage and inflicting Freeze."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "6",
        "TECH": "3",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "8",
        "Bagarre": "9",
        "Envoûtement": "5",
        "Courage": "7",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Intimidation": "5",
        "Mêlée": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Ablation Perçage d’armure",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Oeil de dragon (2)",
        "Dent de dragon (1d10)",
        "Ecailles de draconides (2d10)",
        "Coeur de dragon",
        "Pillage de son trésor"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Massif",
        "Vol",
        "Harmonie avec la magie",
        "Souffle",
        "Nyctalopie",
        "Absorption de magie",
        "Immunités (noirs: poison, rouges & dorés: feu, blancs: froid|gel)",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-red-dragon-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon rouge (fan)",
      "en": "Red Dragon (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500+ couronnes",
      "en": "1,500+ crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Variable, jusqu’à 6 m au garrot",
      "en": "Variable, up to 6 m"
    },
    "weight": {
      "fr": "Variable, jusqu’à 1 500 kg",
      "en": "Variable, up to 1,500 kg"
    },
    "environments": [
      "forests",
      "caves",
      "mountains"
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
        "Ces profils représentent les variétés de dragons plus modestes ; le MJ peut renforcer les statistiques pour les grands anciens.",
        "Les dragons rouges crachent du feu infligeant 6d6 dégâts et l’effet Incinération."
      ],
      "en": [
        "These baseline stats represent smaller dragons; GMs should scale them up for elder specimens.",
        "Red dragons breathe fire dealing 6d6 damage and inflicting On Fire."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "6",
        "TECH": "3",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "8",
        "Bagarre": "9",
        "Envoûtement": "5",
        "Courage": "7",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Intimidation": "5",
        "Mêlée": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Ablation Perçage d’armure",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Oeil de dragon (2)",
        "Dent de dragon (1d10)",
        "Ecailles de draconides (2d10)",
        "Coeur de dragon",
        "Pillage de son trésor"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Massif",
        "Vol",
        "Harmonie avec la magie",
        "Souffle",
        "Nyctalopie",
        "Absorption de magie",
        "Immunités (noirs: poison, rouges & dorés: feu, blancs: froid|gel)",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-golden-dragon-fan",
    "kind": "monster",
    "typeId": "draconid",
    "name": {
      "fr": "Dragon doré (fan)",
      "en": "Golden Dragon (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 500+ couronnes",
      "en": "1,500+ crowns"
    },
    "armor": {
      "fr": "10",
      "en": "10"
    },
    "size": {
      "fr": "Variable, jusqu’à 6 m au garrot",
      "en": "Variable, up to 6 m"
    },
    "weight": {
      "fr": "Variable, jusqu’à 1 500 kg",
      "en": "Variable, up to 1,500 kg"
    },
    "environments": [
      "forests",
      "caves",
      "mountains"
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
        "Les dragons dorés n’existent presque exclusivement que dans les légendes.",
        "Ils peuvent se métamorphoser en humains ou en d’autres créatures et cracher des flammes (6d6 dégâts + Incinération)."
      ],
      "en": [
        "Golden dragons exist almost exclusively in legend.",
        "They can polymorph into humans or other creatures and breathe fire (6d6 damage + On Fire)."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "10",
        "DEX": "9",
        "COR": "12",
        "VIT": "7",
        "EMP": "6",
        "TECH": "3",
        "VOL": "10",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "21",
        "SAUT": "4",
        "END": "55",
        "ENC": "120",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "9",
        "Vigilance": "8",
        "Bagarre": "9",
        "Envoûtement": "5",
        "Courage": "7",
        "Duperie": "6",
        "Esquive/Évasion": "8",
        "Résilience": "6",
        "Intimidation": "5",
        "Mêlée": "10",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Morsure",
          "damage": "8d6",
          "effect": "Ablation Perçage d’armure",
          "attacksPerTurn": "1"
        },
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Oeil de dragon (2)",
        "Dent de dragon (1d10)",
        "Ecailles de draconides (2d10)",
        "Coeur de dragon",
        "Pillage de son trésor"
      ],
      "vulnerabilities": [
        "Huile contre les draconides"
      ],
      "abilities": [
        "Massif",
        "Vol",
        "Harmonie avec la magie",
        "Souffle",
        "Nyctalopie",
        "Absorption de magie",
        "Immunités (noirs: poison, rouges & dorés: feu, blancs: froid|gel)",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-draugir",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Draugir",
      "en": "Draugir"
    },
    "threat": {
      "fr": "Facile Simple",
      "en": "Easy Simple"
    },
    "reward": {
      "fr": "65 couronnes",
      "en": "65 crowns"
    },
    "armor": {
      "fr": "30",
      "en": "30"
    },
    "size": {
      "fr": "Taille humaine",
      "en": "Human size"
    },
    "weight": {
      "fr": "Selon l’équipement porté",
      "en": "Depends on worn gear"
    },
    "environments": [
      "battlefields",
      "graveyards",
      "ruins"
    ],
    "intelligence": {
      "fr": "Consumé par ses émotions",
      "en": "Consumed by emotion"
    },
    "organization": {
      "fr": "De un à plusieurs dizaines, parfois menés par un draugr",
      "en": "From one to dozens, sometimes led by a draug"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "4",
        "RÉF": "6",
        "DEX": "2",
        "COR": "6",
        "VIT": "2",
        "EMP": "4",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "6",
        "SAUT": "1",
        "END": "25",
        "ENC": "50",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "5",
        "Athlétisme": "4",
        "Vigilance": "4",
        "Esquive/Évasion": "6",
        "Résilience": "8",
        "Résistance à la magie": "6",
        "Bâton/Lance": "7",
        "Furtivité": "3",
        "Escrime": "7",
        "Survie": "3"
      },
      "weapons": [
        {
          "name": "Epée de spectre",
          "damage": "3d6",
          "effect": "-",
          "attacksPerTurn": "1"
        },
        {
          "name": "Lance de spectre",
          "damage": "2d6+2",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Arc de spectre",
          "damage": "2d6+1",
          "effect": "Portée: 100m",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d6/2)",
        "Arme commune",
        "Armure commune",
        "Poussière de spectre (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Lourd"
      ],
      "abilities": [
        "Colosse blindé",
        "Volumineux",
        "Déjà mort",
        "Alimenté par la colère",
        "Résistances (T)"
      ]
    }
  },
  {
    "id": "monster-draug",
    "kind": "monster",
    "typeId": "specter",
    "name": {
      "fr": "Draugr",
      "en": "Draug"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 800 couronnes",
      "en": "1,800 crowns"
    },
    "armor": {
      "fr": "30",
      "en": "30"
    },
    "size": {
      "fr": "Jusqu’à 6 m",
      "en": "Up to 6 m"
    },
    "weight": {
      "fr": "Environ 1 000 kg",
      "en": "Around 1,000 kg"
    },
    "environments": [
      "battlefields",
      "graveyards",
      "ruins"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’il l’était en vie, souvent fou",
      "en": "As intelligent as in life, often mad"
    },
    "organization": {
      "fr": "Solitaire, souvent avec des draugirs",
      "en": "Solitary, often leading draugirs"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "7",
        "RÉF": "8",
        "DEX": "7",
        "COR": "14",
        "VIT": "4",
        "EMP": "4",
        "TECH": "1",
        "VOL": "9",
        "CHA": "0",
        "ÉTOU": "11",
        "COU": "12",
        "SAUT": "2",
        "END": "55",
        "ENC": "140",
        "RÉC": "11",
        "PS": "110",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "7",
        "Courage": "10",
        "Esquive/Évasion": "6",
        "Résilience": "8",
        "Mêlée": "8",
        "Résistance à la contrainte": "10",
        "Résistance à la magie": "10",
        "Furtivité": "8",
        "Escrime": "8",
        "Survie": "9"
      },
      "weapons": [
        {
          "name": "Epée de spectre",
          "damage": "8d6",
          "effect": "-1PRE Feu(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Essence de spectre (1d10)",
        "Poussière de spectre (1d10)",
        "Potentiellement une relique",
        "Runes aléatoires (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les spectres",
        "Yrden"
      ],
      "abilities": [
        "Colosse blindé",
        "Massif",
        "Déjà mort",
        "Tornade",
        "Artillerie fantôme",
        "Charge",
        "Résistances (T,feu)"
      ]
    }
  },
  {
    "id": "monster-dryad",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Dryade",
      "en": "Dryad"
    },
    "threat": {
      "fr": "Moyen Simple",
      "en": "Medium Simple"
    },
    "reward": {
      "fr": "350 couronnes",
      "en": "350 crowns"
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
      "forests"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain",
      "en": "As intelligent as a human"
    },
    "organization": {
      "fr": "Solitaire ou en bandes de 2 à 5",
      "en": "Solitary or bands of 2 to 5"
    },
    "notes": {
      "fr": [
        "Ces caractéristiques concernent les dryades de sang pur ; les dryades transformées sont légèrement moins puissantes à la discrétion du MJ."
      ],
      "en": [
        "These statistics represent pure-blooded dryads; converted dryads are slightly less potent at the GM’s discretion."
      ]
    },
    "isFanMade": false,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "6",
        "RÉF": "7",
        "DEX": "9",
        "COR": "6",
        "VIT": "8",
        "EMP": "7",
        "TECH": "5",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "24",
        "SAUT": "4",
        "END": "30",
        "ENC": "60",
        "RÉC": "6",
        "PS": "30",
        "VIG": "0"
      },
      "skills": {
        "Archerie": "10",
        "Athlétisme": "8",
        "Vigilance": "9",
        "Duperie": "4",
        "Esquive/Évasion": "8",
        "Résilience": "5",
        "Mains thérapeutiques": "7",
        "Intimidation": "5",
        "Résistance à la contrainte": "5",
        "Résistance à la magie": "4",
        "Bâton/Lance": "7",
        "Furtivité": "9",
        "Tactique": "3",
        "Fabrication de pièges": "5",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Arc long",
          "damage": "4d6",
          "effect": "Saignement(100%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Lance",
          "damage": "3d6",
          "effect": "Longue portée(2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Objets communs (1d6/2)",
        "Ingrédients végétaux (1d6)",
        "Fkèches (20)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques"
      ],
      "abilities": [
        "Un avec la nature",
        "Tireuse d’élite",
        "Mains thérapeutiques"
      ]
    }
  },
  {
    "id": "monster-fire-elemental-fan",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de feu (fan)",
      "en": "Fire Elemental (fan)"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 350 couronnes",
      "en": "1,350 crowns"
    },
    "armor": {
      "fr": "15",
      "en": "15"
    },
    "size": {
      "fr": "Jusqu’à 2,5 m",
      "en": "Up to 2.5 m"
    },
    "weight": {
      "fr": "Jusqu’à 1 000 kg",
      "en": "Up to 1,000 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Capable de pensées simples",
      "en": "Capable of simple thought"
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
        "RÉF": "11",
        "DEX": "6",
        "COR": "11",
        "VIT": "3",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "9",
        "SAUT": "1",
        "END": "-",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "8",
        "Bagarre": "6",
        "Esquive/Évasion": "5",
        "Physique": "10",
        "Résistance à la magie": "10",
        "Furtivité": "4",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "8d6",
          "effect": "Feu(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Soufre (1d10)",
        "Fragments lunaires (1d6/2)",
        "Rune aléatoire",
        "Poussière imprégnée"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Flammes vacillantes"
      ],
      "abilities": [
        "Force écrasante",
        "Flammes",
        "Massif",
        "Construit",
        "Fournaise",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-ice-elemental-fan",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de glace (fan)",
      "en": "Ice Elemental (fan)"
    },
    "threat": {
      "fr": "Difficile Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "1 350 couronnes",
      "en": "1,350 crowns"
    },
    "armor": {
      "fr": "25",
      "en": "25"
    },
    "size": {
      "fr": "Jusqu’à 2,5 m",
      "en": "Up to 2.5 m"
    },
    "weight": {
      "fr": "Jusqu’à 1 000 kg",
      "en": "Up to 1,000 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Capable de pensées simples",
      "en": "Capable of simple thought"
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
        "RÉF": "11",
        "DEX": "6",
        "COR": "11",
        "VIT": "3",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "9",
        "SAUT": "1",
        "END": "-",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "5",
        "Bagarre": "8",
        "Esquive/Évasion": "7",
        "Physique": "10",
        "Résistance à la magie": "10",
        "Furtivité": "4",
        "Survie": "4"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "8d6",
          "effect": "Gel(25%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Eau ducale (1d6/2)",
        "Essence d’eau (1d10)",
        "Rune aléatoire",
        "Poussière infusée"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium",
        "Fragile"
      ],
      "abilities": [
        "Force écrasante",
        "Pointes glacées",
        "Massif",
        "Construit",
        "Froid glacial",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-earth-elemental-fan",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Élémentaire de terre (fan)",
      "en": "Earth Elemental (fan)"
    },
    "threat": {
      "fr": "Difficile Simple",
      "en": "Hard Simple"
    },
    "reward": {
      "fr": "1 200 couronnes",
      "en": "1,200 crowns"
    },
    "armor": {
      "fr": "25 (estimé)",
      "en": "25 (est.)"
    },
    "size": {
      "fr": "Jusqu’à 2,5 m",
      "en": "Up to 2.5 m"
    },
    "weight": {
      "fr": "Jusqu’à 1 000 kg",
      "en": "Up to 1,000 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Capable de pensées simples",
      "en": "Capable of simple thought"
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
    "baseStats": {
      "INT": "1",
      "REF": "10",
      "DEX": "7",
      "BODY": "12",
      "SPD": "2",
      "EMP": "1",
      "CRA": "1",
      "WILL": "5",
      "LUCK": "0",
      "STUN": "8",
      "RUN": "6",
      "LEAP": "1",
      "STA": "-",
      "ENC": "120",
      "REC": "8",
      "HP": "80",
      "VIG": "0"
    },
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "1",
        "RÉF": "10",
        "DEX": "7",
        "COR": "12",
        "VIT": "2",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "6",
        "SAUT": "1",
        "END": "-",
        "ENC": "120",
        "RÉC": "8",
        "PS": "80",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "4",
        "Vigilance": "9",
        "Bagarre": "6",
        "Esquive/Évasion": "5",
        "Physique": "10",
        "Résistance à la magie": "10",
        "Furtivité": "4",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "8d6",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Pierres précieuses (1d6/2)",
        "Fragments lunaires (1d6/2)",
        "Rune aléatoire",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium"
      ],
      "abilities": [
        "Force écrasante",
        "Camouflage",
        "Massif",
        "Construit",
        "Onde de choc",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-fleder",
    "kind": "monster",
    "typeId": "vampire",
    "name": {
      "fr": "Flédre",
      "en": "Fleder"
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
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Jusqu’à 2,5 m",
      "en": "Up to 2.5 m"
    },
    "weight": {
      "fr": "Jusqu’à 125 kg",
      "en": "Up to 125 kg"
    },
    "environments": [
      "ruins",
      "caves",
      "sewers"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un chien",
      "en": "As intelligent as a dog"
    },
    "organization": {
      "fr": "Solitaire, parfois par 2 ou 3",
      "en": "Solitary, sometimes in groups of 2 or 3"
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
        "COR": "9",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "4",
        "CHA": "0",
        "ÉTOU": "6",
        "COU": "21",
        "SAUT": "10",
        "END": "30",
        "ENC": "70",
        "RÉC": "6",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "5",
        "Bagarre": "7",
        "Courage": "7",
        "Esquive/Évasion": "6",
        "Résilience": "6",
        "Mêlée": "6",
        "Résistance à la contrainte": "6",
        "Résistance à la magie": "4",
        "Furtivité": "7",
        "Survie": "6"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "6d6+2",
          "effect": "Saignement(100%)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Crocs de vampire (1d6/2)",
        "Salive de vampire (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les vampires",
        "Sang noir",
        "Faiblesse astrale",
        "Vulnérabilité au feu",
        "Transfert sanguin"
      ],
      "abilities": [
        "Régénération",
        "Chasseur sans fin",
        "Nyctalopie",
        "Invisible à la scrutation magique",
        "Grimpeur",
        "Ailes de Vestige"
      ]
    }
  },
  {
    "id": "monster-gargoyle",
    "kind": "monster",
    "typeId": "elemental",
    "name": {
      "fr": "Gargouille",
      "en": "Gargoyle"
    },
    "threat": {
      "fr": "Moyen Difficile",
      "en": "Medium Hard"
    },
    "reward": {
      "fr": "900 couronnes",
      "en": "900 crowns"
    },
    "armor": {
      "fr": "15",
      "en": "15"
    },
    "size": {
      "fr": "Environ 1,75 m",
      "en": "Around 1.75 m"
    },
    "weight": {
      "fr": "Environ 750 kg",
      "en": "Around 750 kg"
    },
    "environments": [
      "summoning"
    ],
    "intelligence": {
      "fr": "Incapable de réfléchir",
      "en": "Mindless"
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
        "RÉF": "8",
        "DEX": "5",
        "COR": "10",
        "VIT": "4",
        "EMP": "1",
        "TECH": "1",
        "VOL": "5",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "12",
        "SAUT": "2",
        "ENC": "100",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "5",
        "Vigilance": "8",
        "Bagarre": "7",
        "Esquive/Évasion": "6",
        "Résistance à la magie": "10",
        "Furtivité": "5",
        "Survie": "2"
      },
      "weapons": [
        {
          "name": "Poing",
          "damage": "6d6",
          "effect": "-",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cinquième essence (1d6/2)",
        "Poussière imprégnée (1d6)",
        "Coeur de gargouille"
      ],
      "vulnerabilities": [
        "Huile contre les élémentaires",
        "Bombes au dimeritium"
      ],
      "abilities": [
        "Construit",
        "Massif",
        "Charge explosive",
        "Lanceur de roche",
        "Haleine empoisonnée",
        "Piétinement",
        "Résistances (T,C,P)"
      ]
    }
  },
  {
    "id": "monster-harpy-fan",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Harpie (fan)",
      "en": "Harpy (fan)"
    },
    "threat": {
      "fr": "Facile Complexe",
      "en": "Easy Complex"
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
      "fr": "Environ 1,25 m, voûté",
      "en": "Around 1.25 m, hunched"
    },
    "weight": {
      "fr": "Environ 65 kg",
      "en": "Around 65 kg"
    },
    "environments": [
      "ruins",
      "mountains"
    ],
    "intelligence": {
      "fr": "Aussi intelligent qu’un humain stupide",
      "en": "As intelligent as a dull human"
    },
    "organization": {
      "fr": "Groupes de 5 à 20",
      "en": "Flocks of 5 to 20"
    },
    "notes": {
      "fr": [
        "Comme les pies, les harpies sont attirées par les objets brillants : leurs nids recèlent souvent bijoux, pièces, armes ou pièces d’armure volées."
      ],
      "en": [
        "Like magpies, harpies are drawn to shiny objects; their nests frequently hold stolen jewelry, coins, or scavenged weapons and armor."
      ]
    },
    "isFanMade": true,
    "source": "unofficial",
    "combat": {
      "stats": {
        "INT": "2",
        "RÉF": "7",
        "DEX": "7",
        "COR": "4",
        "VIT": "9",
        "EMP": "2",
        "TECH": "4",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "5",
        "COU": "21",
        "SAUT": "21",
        "END": "25",
        "ENC": "40",
        "RÉC": "5",
        "PS": "25",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "8",
        "Vigilance": "8",
        "Bagarre": "5",
        "Esquive/Évasion": "6",
        "Résilience": "4",
        "Mêlée": "7",
        "Résistance à la magie": "5",
        "Furtivité": "4",
        "Survie": "7"
      },
      "weapons": [
        {
          "name": "Serres",
          "damage": "2d6+3",
          "effect": "+1 PRE(Dans les airs)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Griffes",
          "damage": "2d6",
          "effect": "-",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Plumes de harpies (1d6)",
        "Objets communs (1d6/2)"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides",
        "Vulnérable au feu",
        "Os creux",
        "Mouvement entravé"
      ],
      "abilities": [
        "Vol",
        "Manœuvres aériennes"
      ]
    }
  },
  {
    "id": "monster-leshen-fan",
    "kind": "monster",
    "typeId": "relict",
    "name": {
      "fr": "Leshen (fan)",
      "en": "Leshen (fan)"
    },
    "threat": {
      "fr": "Fort Difficile",
      "en": "Hard Hard"
    },
    "reward": {
      "fr": "1 750 couronnes",
      "en": "1,750 crowns"
    },
    "armor": {
      "fr": "5",
      "en": "5"
    },
    "size": {
      "fr": "Environ 4 m",
      "en": "Around 4 m"
    },
    "weight": {
      "fr": "Environ 250 kg",
      "en": "Around 250 kg"
    },
    "environments": [
      "forests"
    ],
    "intelligence": {
      "fr": "Peut-être plus intelligent qu’un humain",
      "en": "Possibly smarter than a human"
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
        "INT": "11",
        "RÉF": "6",
        "DEX": "8",
        "COR": "7",
        "VIT": "5",
        "EMP": "4",
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
        "Athlétisme": "8",
        "Vigilance": "10",
        "Bagarre": "4",
        "Esquive/Évasion": "5",
        "Résilience": "10",
        "Mêlée": "9",
        "Résistance à la magie": "10",
        "Incantation": "8",
        "Furtivité": "7",
        "Survie": "10"
      },
      "weapons": [
        {
          "name": "Griffes",
          "damage": "6d6+2",
          "effect": "+1 PRE Portée:2m",
          "attacksPerTurn": "2"
        }
      ],
      "loot": [
        "Ingrédients végétaux (1d10)",
        "Os de bête (1d10)",
        "Poussière imprégnée (1d6)"
      ],
      "vulnerabilities": [
        "Huile contre les reliques",
        "Dimeritium",
        "Vulnérable au feu",
        "Poussière de lune et Yrden"
      ],
      "abilities": [
        "Fumée (D)",
        "Racines (D)",
        "Meute de corbeaux (D)",
        "Totems (max 5)",
        "Chef de meute",
        "Esprit de la forêt",
        "Résistances (T,C)"
      ]
    }
  },
  {
    "id": "monster-manticore-fan",
    "kind": "monster",
    "typeId": "hybrid",
    "name": {
      "fr": "Manticore (fan)",
      "en": "Manticore (fan)"
    },
    "threat": {
      "fr": "Moyen Complexe",
      "en": "Medium Complex"
    },
    "reward": {
      "fr": "750 couronnes",
      "en": "750 crowns"
    },
    "armor": {
      "fr": "8",
      "en": "8"
    },
    "size": {
      "fr": "1,5 m au garrot",
      "en": "1.5 m at shoulder"
    },
    "weight": {
      "fr": "Environ 550 kg",
      "en": "Around 550 kg"
    },
    "environments": [
      "mountains",
      "plains",
      "deserts"
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
        "INT": "2",
        "RÉF": "9",
        "DEX": "7",
        "COR": "8",
        "VIT": "7",
        "EMP": "1",
        "TECH": "1",
        "VOL": "6",
        "CHA": "0",
        "ÉTOU": "7",
        "COU": "21",
        "SAUT": "4",
        "END": "35",
        "ENC": "80",
        "RÉC": "7",
        "PS": "70",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "7",
        "Vigilance": "6",
        "Bagarre": "7",
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
          "effect": "-",
          "attacksPerTurn": "2"
        },
        {
          "name": "Morsure",
          "damage": "5d6",
          "effect": "Saignement(50%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Dard de queue",
          "damage": "5d6",
          "effect": "Perçage d’armure Poison(100%)  Longue portée(2m)",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Extrait de venin (1d6)",
        "Dard de manticore",
        "Cuir de manticore"
      ],
      "vulnerabilities": [
        "Huile contre les hybrides"
      ],
      "abilities": [
        "Vol",
        "Immunité au poison",
        "Sauvage",
        "Pic empoisonné",
        "Venin anesthésiant",
        "Nyctalopie",
        "Bond",
        "Résistance (C)"
      ]
    }
  },
  {
    "id": "monster-krampus",
    "kind": "monster",
    "typeId": "relict",
    "source": "site",
    "isFanMade": true,
    "name": {
      "fr": "Krampus",
      "en": "Krampus"
    },
    "threat": {
      "fr": "Fort Complexe",
      "en": "Hard Complex"
    },
    "reward": {
      "fr": "600 couronnes",
      "en": "600 crowns"
    },
    "armor": {
      "fr": "12",
      "en": "12"
    },
    "size": {
      "fr": "Environ 3 m",
      "en": "Around 3 m"
    },
    "weight": {
      "fr": "Environ 200 kg",
      "en": "Around 200 kg"
    },
    "environments": [
      "urban",
      "forests",
      "mountains"
    ],
    "intelligence": {
      "fr": "Humaine",
      "en": "Human"
    },
    "organization": {
      "fr": "Solitaire",
      "en": "Solitary"
    },
    "notes": {
      "fr": [],
      "en": []
    },
    "combat": {
      "stats": {
        "INT": "8",
        "RÉF": "9",
        "DEX": "8",
        "COR": "10",
        "VIT": "7",
        "EMP": "6",
        "TECH": "4",
        "VOL": "8",
        "CHA": "0",
        "ÉTOU": "8",
        "COU": "21",
        "SAUT": "2",
        "END": "60",
        "ENC": "80",
        "RÉC": "8",
        "PS": "60",
        "VIG": "0"
      },
      "skills": {
        "Athlétisme": "6",
        "Vigilance": "6",
        "Bagarre": "7",
        "Courage": "8",
        "Esquive/Évasion": "6",
        "Résilience": "9",
        "Mêlée": "8",
        "Résistance à la magie": "6",
        "Incantation": "6",
        "Physique": "7"
      },
      "weapons": [
        {
          "name": "Coup de griffes (Bagarre)",
          "damage": "5d6",
          "effect": "Saignement(25%)",
          "attacksPerTurn": "2"
        },
        {
          "name": "Coup de Cornes (Bagarre)",
          "damage": "6d6",
          "effect": "Etourdissement(25%)",
          "attacksPerTurn": "1"
        },
        {
          "name": "Grosse chaine (Mêlée)",
          "damage": "4d6+2",
          "effect": "Portée:CORx2, Saisie",
          "attacksPerTurn": "1"
        }
      ],
      "loot": [
        "Cornes de Krampus (2)",
        "Langue de Krampus",
        "Queue de Krampus",
        "Rune aléatoire"
      ],
      "vulnerabilities": [
        "Huile contre les vestiges",
        "Pacte"
      ],
      "abilities": [
        "Immunité (Froid)",
        "Nyctalopie",
        "Régénération (3)",
        "Charge",
        "Clone de glace",
        "Grêle dévastatrice",
        "Microclimat",
        "Pic de glace"
      ]
    }
  }
];
