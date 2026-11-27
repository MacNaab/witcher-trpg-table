import type { DiagramCatalogEntry } from './types';

/**
 * Unified crafting blueprints & diagrams catalog (183 entries).
 */
export const DIAGRAMS_DATA: readonly DiagramCatalogEntry[] = [
  {
    "id": "dg-mat-hardened-timber",
    "name": {
      "en": "Hardened Timber",
      "fr": "Bois durci"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "12",
    "time": "1 heure",
    "components": "Bois (x1), résine (x4)",
    "investment": "11",
    "price": 22
  },
  {
    "id": "dg-mat-hardened-leather",
    "name": {
      "en": "Hardened Leather",
      "fr": "Cuir durci"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "14",
    "time": "½ heure",
    "components": "Cuir (x1), cire (x2)",
    "investment": "32",
    "price": 64
  },
  {
    "id": "dg-mat-leather",
    "name": {
      "en": "Leather",
      "fr": "Cuir"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "12",
    "time": "1 heure",
    "components": "Cuir de vache (x1), herbe à tanner (x3)",
    "investment": "19",
    "price": 38
  },
  {
    "id": "dg-mat-thread",
    "name": {
      "en": "Thread",
      "fr": "Fil"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "10",
    "time": "15 minutes",
    "components": "Coton (x2)",
    "investment": "2",
    "price": 4
  },
  {
    "id": "dg-mat-linen",
    "name": {
      "en": "Linen",
      "fr": "Lin"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "10",
    "time": "15 minutes",
    "components": "Fil (x2)",
    "investment": "6",
    "price": 12
  },
  {
    "id": "dg-mat-dw-linen",
    "name": {
      "en": "Double Woven Linen",
      "fr": "Toile de lin"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "14",
    "time": "½ heure",
    "components": "Lin (x1), fil (x2)",
    "investment": "15",
    "price": 30
  },
  {
    "id": "dg-mat-dark-steel",
    "name": {
      "en": "Dark Steel",
      "fr": "Acier noir"
    },
    "tier": "journeyman",
    "pool": "M",
    "dc": "17",
    "time": "1 heure",
    "components": "Fer noir (x1), charbon (x3)",
    "investment": "55",
    "price": 110
  },
  {
    "id": "dg-mat-tretogor-steel",
    "name": {
      "en": "Tretogor Steel",
      "fr": "Acier tretogor"
    },
    "tier": "journeyman",
    "pool": "M",
    "dc": "16",
    "time": "1 heure",
    "components": "Fer (x1), plumes (x2), charbon (x5)",
    "investment": "43",
    "price": 86
  },
  {
    "id": "dg-mat-steel",
    "name": {
      "en": "Steel",
      "fr": "Acier"
    },
    "tier": "journeyman",
    "pool": "M",
    "dc": "15",
    "time": "1 heure",
    "components": "Fer (x1), charbon (x5)",
    "investment": "35",
    "price": 70
  },
  {
    "id": "dg-mat-lyrian-leather",
    "name": {
      "en": "Lyrian Leather",
      "fr": "Cuir lyrien"
    },
    "tier": "journeyman",
    "pool": "M",
    "dc": "17",
    "time": "1 heure",
    "components": "cire d’ogre (x1), cuir (x1), charbon (x2)",
    "investment": "40",
    "price": 80
  },
  {
    "id": "dg-mat-mahakaman-steel",
    "name": {
      "en": "Mahakaman Steel",
      "fr": "Acier mahakamien"
    },
    "tier": "master",
    "pool": "M",
    "dc": "22",
    "time": "1 heure",
    "components": "Fer (x1), cendres (x2), argile alluviale (x3), os de bête (x3), charbon (x5)",
    "investment": "76",
    "price": 152
  },
  {
    "id": "dg-mat-draconid-leather",
    "name": {
      "en": "Draconid Leather",
      "fr": "Cuir de draconide"
    },
    "tier": "master",
    "pool": "M",
    "dc": "18",
    "time": "1 heure",
    "components": "Écailles de draconide (x1), herbe à tanner (x3)",
    "investment": "39",
    "price": 78
  },
  {
    "id": "dg-mat-mahakaman-dim",
    "name": {
      "en": "Mahakaman Dimeritium",
      "fr": "Diméritium mahakamien"
    },
    "tier": "master",
    "pool": "M",
    "dc": "24",
    "time": "1 heure",
    "components": "Cendres (x2), minerai luisant (x2), argile alluviale (x3), os de bête (x3)",
    "investment": "201",
    "price": 402
  },
  {
    "id": "dg-mat-dimeritium",
    "name": {
      "en": "Dimeritium",
      "fr": "Diméritium"
    },
    "tier": "master",
    "pool": "M",
    "dc": "20",
    "time": "1 heure",
    "components": "Fer (x1), minerai luisant (x1), plumes (x1)",
    "investment": "37",
    "price": 74
  },
  {
    "id": "dg-short-bow",
    "name": {
      "en": "Short Bow",
      "fr": "Arc court"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Fer (x1), cire (x2), cuir (x2), résine (x2), graisse ester (x3), fil (x4), bois durci (x5)",
    "investment": "210",
    "price": 434
  },
  {
    "id": "dg-brass-knuckles",
    "name": {
      "en": "Brass Knuckles",
      "fr": "Coup-de-poing"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "2 heures",
    "components": "Acier (x1), bois durci (x1), cire (x1), résine (x3)",
    "investment": "72",
    "price": 125
  },
  {
    "id": "dg-throwing-knives",
    "name": {
      "en": "Throwing Knives (x3)",
      "fr": "Couteaux de lancer (x3)"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "8",
    "time": "1 heure",
    "components": "Acier (x1)",
    "investment": "48",
    "price": 74
  },
  {
    "id": "dg-dagger",
    "name": {
      "en": "Dagger",
      "fr": "Dague"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "8",
    "time": "2 heures",
    "components": "Bois (x1), fer (x1)",
    "investment": "33",
    "price": 74
  },
  {
    "id": "dg-arming-sword",
    "name": {
      "en": "Arming Sword",
      "fr": "Épée de chevalier"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "13",
    "time": "7 heures",
    "components": "Fil (x1), acier (x2), bois (x2), cuir durci (x2)",
    "investment": "201",
    "price": 404
  },
  {
    "id": "dg-iron-longsword",
    "name": {
      "en": "Iron Long Sword",
      "fr": "Épée longue de fer"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "5 heures",
    "components": "Bois (x1), cuir (x2), fer (x2)",
    "investment": "119",
    "price": 240
  },
  {
    "id": "dg-hunters-falchion",
    "name": {
      "en": "Hunter’s Falchion",
      "fr": "Fauchon de chasseur"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "14",
    "time": "7 heures",
    "components": "Bois durci (x1), acier (x2), cuir durci (x2), graisse ester (x4)",
    "investment": "240",
    "price": 486
  },
  {
    "id": "dg-gleddyf",
    "name": {
      "en": "Gleddyf",
      "fr": "Gleddyf"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "14",
    "time": "7 heures",
    "components": "Bois durci (x1), cuir (x1),cuir durci (x1), fer (x1), huile (x1), résine (x1), acier (x2)",
    "investment": "210",
    "price": 426
  },
  {
    "id": "dg-throwing-axes",
    "name": {
      "en": "Throwing Axes (x3)",
      "fr": "Haches de lancer (x3)"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "1 heure",
    "components": "Acier (x1), bois (x1)",
    "investment": "51",
    "price": 116
  },
  {
    "id": "dg-hand-axe",
    "name": {
      "en": "Hand Axe",
      "fr": "Hachette"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "3 heures",
    "components": "Acier (x1), bois durci (x1), cuir (x1), cuir durci (x1), résine (x4)",
    "investment": "148",
    "price": 306
  },
  {
    "id": "dg-spear",
    "name": {
      "en": "Spear",
      "fr": "Lance"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "6 heures",
    "components": "Acier (x2), résine (x2), cuir (x3), Fil (x4), bois durci (x5)",
    "investment": "276",
    "price": 562
  },
  {
    "id": "dg-orions",
    "name": {
      "en": "Orions (x3)",
      "fr": "Orions (x3)"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "1 heure",
    "components": "Acier (x1), argile alluviale (x1), huile (x2), cendres (x3)",
    "investment": "62",
    "price": 125
  },
  {
    "id": "dg-ammo-blunt",
    "name": {
      "en": "Ammunition: Blunt (x5)",
      "fr": "Projectiles contondants (x5)"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "1 heure",
    "components": "Bois (x1), fer (x1), plumes (x1)",
    "investment": "37",
    "price": 74
  },
  {
    "id": "dg-ammo-std",
    "name": {
      "en": "Ammunition: Standard (x30)",
      "fr": "Projectiles standards (x30)"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "2 heures",
    "components": "Bois (x1), fer (x1), plumes (x1)",
    "investment": "7",
    "price": 14
  },
  {
    "id": "dg-hand-crossbow",
    "name": {
      "en": "Hand Crossbow",
      "fr": "Arbalète de poing"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Acier (x1), cuir durci (x1),fer (x1), bois durci (x2), cire (x2), résine (x2), graisse ester (x2), graisse d’ogre (x2), fil (x4)",
    "investment": "214",
    "price": 426
  },
  {
    "id": "dg-crossbow",
    "name": {
      "en": "Crossbow",
      "fr": "Arbalète"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "9 heures",
    "components": "Cire (x1), cuir durci (x1),fer (x1), résine (x2), graisse ester (x2), cire d’ogre (x2), acier (x3),bois durci (x4), fil (x5)",
    "investment": "343",
    "price": 682
  },
  {
    "id": "dg-long-bow",
    "name": {
      "en": "Long Bow",
      "fr": "Arc long"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Acier (x1), cuir durci (x1), résine (x2), graisse ester (x3), cire (x4), bois durci (x6), fil (x8)",
    "investment": "252",
    "price": 712
  },
  {
    "id": "dg-staff",
    "name": {
      "en": "Mage’s Staff",
      "fr": "Bâton"
    },
    "tier": "journeyman",
    "pool": "B",
    "dc": "18",
    "time": "9 heures",
    "components": "Acier (x1), cinquième essence (x2), cire (x2), graisse ester (x2), bois (x6)",
    "investment": "250",
    "price": 502
  },
  {
    "id": "dg-esboda",
    "name": {
      "en": "Esboda",
      "fr": "Esboda"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "9 heures",
    "components": "Huile de dermoptère (x1), bois durci (x2), acier noir (x2), cuir durci (x2), acier (x3)",
    "investment": "481",
    "price": 974
  },
  {
    "id": "dg-pole-axe",
    "name": {
      "en": "Pole Axe",
      "fr": "Hache d’armes"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Graisse ester (x1), lin (x1), pierre à aiguiser (x1), acier noir (x2),cuir (x2), bois durci (x5)",
    "investment": "349",
    "price": 690
  },
  {
    "id": "dg-battle-axe",
    "name": {
      "en": "Battle Axe",
      "fr": "Hache de bataille"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "9 heures",
    "components": "Acier (x3), cuir (x3), bois durci (x4), cire d’ogre (x4), graisse ester (x4), argile alluviale (x5)",
    "investment": "389",
    "price": 786
  },
  {
    "id": "dg-hooked-staff",
    "name": {
      "en": "Hooked Staff",
      "fr": "Houlette"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "9 heures",
    "components": "Cire (x1), cuir durci (x1), acier (x2), cinquième essence (x2), eau-forte (x2), graisse ester (x2),fil (x4), bois (x6)",
    "investment": "412",
    "price": 824
  },
  {
    "id": "dg-krigsverd",
    "name": {
      "en": "Krigsverd",
      "fr": "Krigsverd"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Bois durci (x2), cendres (x2), cuir durci (x2), acier (x3), acier noir (x3), résine (x4), os de bête (x7)",
    "investment": "423",
    "price": 854
  },
  {
    "id": "dg-mace",
    "name": {
      "en": "Mace",
      "fr": "Masse d’armes"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Résine (x1), bois durci (x2), cuir durci (x2), fer (x2), acier (x3), cire d’ogre (x5)",
    "investment": "384",
    "price": 786
  },
  {
    "id": "dg-poniard",
    "name": {
      "en": "Poniard",
      "fr": "Poignard"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "4 heures",
    "components": "Acier noir (x1), bois durci (x1), cuir durci (x1), pierre à aiguiser (x2),eau-forte (x4), os de bête (x4)",
    "investment": "250",
    "price": 534
  },
  {
    "id": "dg-ammo-broadhead",
    "name": {
      "en": "Ammunition: Broadhead (x10)",
      "fr": "Projectiles à tête large (x10)"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "15",
    "time": "1 heure",
    "components": "Bois (x1), fer (x1), plumes (x1), pierre à aiguiser (x1)",
    "investment": "69",
    "price": 125
  },
  {
    "id": "dg-ammo-bodkin",
    "name": {
      "en": "Ammunition: Bodkin (x10)",
      "fr": "Projectiles de précision (x10)"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "1 heure",
    "components": "Bois durci (x1), acier (x1), plumes (x1), pierre à aiguiser (x1),cire d’ogre (x1)",
    "investment": "110",
    "price": 224
  },
  {
    "id": "dg-stiletto",
    "name": {
      "en": "Stiletto",
      "fr": "Stylet"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Acier noir (x1), bois (x1), huile assombrissante (x1), résine (x1), cire (x2),pierre à aiguiser (x2), charbon (x5)",
    "investment": "184",
    "price": 412
  },
  {
    "id": "dg-monster-hunter-cbow",
    "name": {
      "en": "Monster Hunter’s Crossbow",
      "fr": "Arbalète de chasseur de monstres"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Graisse ester (x2), fer noir (x2), acier noir (x3), cire (x3),cuir durci (x3), cire d’ogre (x4), os de bête (x4), résine (x4), bois durci (x6), fil (x6)",
    "investment": "844",
    "price": 1686
  },
  {
    "id": "dg-war-bow",
    "name": {
      "en": "War Bow",
      "fr": "Arc de guerre"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Cuir durci (x1), huile de dermoptère (x2), graisse ester (x3), acier noir (x4), cire (x4),résine (x4), bois durci (x6), fil (x8)",
    "investment": "626",
    "price": 1296
  },
  {
    "id": "dg-iron-staff",
    "name": {
      "en": "Iron Staff",
      "fr": "Bâton de fer"
    },
    "tier": "master",
    "pool": "B",
    "dc": "20",
    "time": "10 heures",
    "components": "Acier noir (x1), bois durci (x1), cuir (x1), cinquième essence (x2), eau-forte (x4), fer noir (x4)",
    "investment": "506",
    "price": 1012
  },
  {
    "id": "dg-crystal-staff",
    "name": {
      "en": "Crystal Staff",
      "fr": "Bâton-cristal"
    },
    "tier": "master",
    "pool": "B",
    "dc": "25",
    "time": "13 heures",
    "components": "Gemme (x1), huile de dermoptère (x1), acier (x2), cire (x2), graisse ester (x3), cinquième essence (x4), eau-forte (x4), bois (x6)",
    "investment": "623",
    "price": 1296
  },
  {
    "id": "dg-berserker-axe",
    "name": {
      "en": "Berserker’s Axe",
      "fr": "Hache de Berserker"
    },
    "tier": "master",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Cuir durci (x1), graisse ester (x1), pierre à aiguiser (x1), résine (x1), acier (x2), acier mahakamien (x4), bois durci (x5)",
    "investment": "722",
    "price": 1440
  },
  {
    "id": "dg-red-halberd",
    "name": {
      "en": "Redanian Halberd",
      "fr": "Hallebarde rédanienne"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Acier tretogor (x2), cuir durci (x2), graisse ester (x2), pierre àaiguiser (x2), acier noir (x3), bois durci (x6)",
    "investment": "646",
    "price": 1296
  },
  {
    "id": "dg-jambiya",
    "name": {
      "en": "Jambiya",
      "fr": "Jambiya"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "5 heures",
    "components": "acier noir (x1), bois durci (x1), cuir de draconide (x1), huile assombrissante (x1), résine (x1), acier (x2), pierre à aiguiser (x2)",
    "investment": "342",
    "price": 660
  },
  {
    "id": "dg-kord",
    "name": {
      "en": "Kord",
      "fr": "Kord"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Bois durci (x1), soie (x1), fer noir (x1), cuir durci (x2), acier noir (x3), os de bête (x3), résine (x4)",
    "investment": "525",
    "price": 1012
  },
  {
    "id": "dg-vicovarian-blade",
    "name": {
      "en": "Vicovarian Blade",
      "fr": "Lame vicovarienne"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Fer noir (x3), bois durci (x3), cuir durci (x3), acier noir (x4), cendres (x4), résine (x4), os de bête (x5)",
    "investment": "660",
    "price": 1282
  },
  {
    "id": "dg-highland-mauler",
    "name": {
      "en": "Highland Mauler",
      "fr": "Maillet kaedwenien"
    },
    "tier": "master",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Acier noir (x1), cuir durci (x1), météorite (x1), graisse ester (x4), fer noir (x5), eau-forte (x6), bois durci (x10), os de bête (x10)",
    "investment": "720",
    "price": 1440
  },
  {
    "id": "dg-torrwr",
    "name": {
      "en": "Torrwr",
      "fr": "Torrwr"
    },
    "tier": "master",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Pierre à aiguiser (x1), acier (x2), os de bête (x2), bois durci (x3), cuir durci (x3), cendres (x4), acier noir (x5), résine (x5)",
    "investment": "760",
    "price": 1462
  },
  {
    "id": "dg-steel-buckler",
    "name": {
      "en": "Steel Buckler",
      "fr": "Bocle d’acier"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "4 heures",
    "components": "Acier (x1), bois durci (x1), cuir durci (x1)",
    "investment": "112",
    "price": 224
  },
  {
    "id": "dg-leather-shield",
    "name": {
      "en": "Leather Shield",
      "fr": "Bouclier de peau"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "3 heures",
    "components": "Cuir (x1), herbe à tanner (x1), bois (x2)",
    "investment": "37",
    "price": 74
  },
  {
    "id": "dg-temerian-shield",
    "name": {
      "en": "Temerian Shield",
      "fr": "Bouclier témérien"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Cuir durci (x1), fer (x1), cire d’ogre (x3), bois durci (x4)",
    "investment": "172",
    "price": 343
  },
  {
    "id": "dg-dw-hood",
    "name": {
      "en": "Double Woven Hood",
      "fr": "Capuche à tissage renforcé"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "13",
    "time": "4 heures",
    "components": "Cuir (x2), toile de lin (x2), cire (x4), fil (x7)",
    "investment": "129",
    "price": 262
  },
  {
    "id": "dg-verden-hood",
    "name": {
      "en": "Verden Archer’s Hood",
      "fr": "Capuche d’archer verdenien"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "3 heures",
    "components": "Cuir (x1), lin (x2),cire (x3), fil (x6)",
    "investment": "70",
    "price": 150
  },
  {
    "id": "dg-dw-gambeson",
    "name": {
      "en": "Double Woven Gambeson",
      "fr": "Gambison à tissage renforcé"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Herbe à tanner (x4), lin (x4), toile de lin (x5), fil (x6), coton (x11)",
    "investment": "187",
    "price": 374
  },
  {
    "id": "dg-aedirnian-gambeson",
    "name": {
      "en": "Aedirnian Gambeson",
      "fr": "Gambison aedirnien"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "6 heures",
    "components": "Cuir (x2), huile (x2), fil (x6), lin (x6)",
    "investment": "131",
    "price": 362
  },
  {
    "id": "dg-gambeson",
    "name": {
      "en": "Gambeson",
      "fr": "Gambison"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "5 heures",
    "components": "Lin (x6), Fil (x7)",
    "investment": "75",
    "price": 150
  },
  {
    "id": "dg-dw-trousers",
    "name": {
      "en": "Double Woven Trousers",
      "fr": "Pantalon à tissage renforcé"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Toile de lin (x4), fil (x6)",
    "investment": "165",
    "price": 336
  },
  {
    "id": "dg-cavalry-trousers",
    "name": {
      "en": "Cavalry Trousers",
      "fr": "Pantalon de cavalier"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "13",
    "time": "7 heures",
    "components": "Fil (x4), lin (x5)",
    "investment": "57",
    "price": 112
  },
  {
    "id": "dg-padded-trousers",
    "name": {
      "en": "Padded Trousers",
      "fr": "Pantalon matelassé"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "14",
    "time": "7 heures",
    "components": "Cuir (x1), fil (x4), lin (x5), coton (x9)",
    "investment": "94",
    "price": 186
  },
  {
    "id": "dg-spangenhelm",
    "name": {
      "en": "Spectacled Helm",
      "fr": "Spangenhelm"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "4 heures",
    "components": "Os de bête (x1), acier (x3)",
    "investment": "152",
    "price": 300
  },
  {
    "id": "dg-temerian-armet",
    "name": {
      "en": "Temerian Armet",
      "fr": "Armet témérien"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "5 heures",
    "components": "Graisse ester (x1), cuir (x2), cuir durci (x2), acier (x4)",
    "investment": "352",
    "price": 712
  },
  {
    "id": "dg-halberdier-armor",
    "name": {
      "en": "Redanian Halberdier’s Armor",
      "fr": "Armure d’hallebardier rédanien"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "9 heures",
    "components": "Cuir (x1), cuir durci (x1), eau-forte (x2), fil (x3), acier tretogor (x5)",
    "investment": "299",
    "price": 600
  },
  {
    "id": "dg-skellige-shield",
    "name": {
      "en": "Skellige Raider Shield",
      "fr": "Bouclier de pillard skellige"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "5 heures",
    "components": "Acier noir (x1), cire d’ogre (x1), cuir (x1), herbe à tanner (x4), bois durci (x5), os de bête (x5)",
    "investment": "240",
    "price": 486
  },
  {
    "id": "dg-kaedweni-shield",
    "name": {
      "en": "Kaedweni Shield",
      "fr": "Bouclier kaedwenien"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "19",
    "time": "5 heures",
    "components": "Acier noir (x1), cuir (x1), cire (x2), bois durci (x5), cire d’ogre (x5),os de bête (x7)",
    "investment": "300",
    "price": 600
  },
  {
    "id": "dg-brigandine",
    "name": {
      "en": "Brigandine",
      "fr": "Brigandine"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Cuir (x3), cuir durci (x3)",
    "investment": "228",
    "price": 450
  },
  {
    "id": "dg-chain-coif",
    "name": {
      "en": "Chain Coif",
      "fr": "Camail"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Acier (x4)",
    "investment": "192",
    "price": 374
  },
  {
    "id": "dg-armored-hood",
    "name": {
      "en": "Armored Hood",
      "fr": "Capuche renforcée"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "5 heures",
    "components": "cire d’ogre (x1), cuir (x1), cuir durci (x3), toile de lin (x3),fil (x4)",
    "investment": "260",
    "price": 524
  },
  {
    "id": "dg-steel-kite",
    "name": {
      "en": "Steel Kite Shield",
      "fr": "Écu"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "5 heures",
    "components": "Acier noir (x1), cuir (x1), acier (x4)",
    "investment": "302",
    "price": 600
  },
  {
    "id": "dg-redanian-greaves",
    "name": {
      "en": "Redanian Greaves",
      "fr": "Jambières rédaniennes"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "9 heures",
    "components": "Cuir (x1), cuir durci (x1), acier tretogor (x3), coton (x3), herbe à tanner (x3), fil (x5)",
    "investment": "295",
    "price": 600
  },
  {
    "id": "dg-nilf-plate",
    "name": {
      "en": "Nilfgaardian Plate Armor",
      "fr": "Armure de plates nilfgaardienne"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Cuir (x1), cuir durci (x1), huile assombrissante (x1), lin (x1), huile de dermoptère (x2), lin (x3),acier noir (x5), cendres (x10)",
    "investment": "637",
    "price": 1274
  },
  {
    "id": "dg-plate-armor",
    "name": {
      "en": "Plate Armor",
      "fr": "Armure de plates"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Cire d’ogre (x1), huile de dermoptère (x1), cuir durci (x3), eau-forte (x4), acier (x5), fil (x7)",
    "investment": "468",
    "price": 937
  },
  {
    "id": "dg-hindarsfjall-armor",
    "name": {
      "en": "Hindarsfjall Heavy Armor",
      "fr": "Armure lourde d’Hindarsfjall"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Cendres (x1), cuir durci (x1), huile de dermoptère (x1),acier noir (x4), os de bêtes (x4), fil (x5)",
    "investment": "565",
    "price": 1124
  },
  {
    "id": "dg-nilf-helm",
    "name": {
      "en": "Nilfgaardian Helm",
      "fr": "Casque nilfgaardien"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "6 heures",
    "components": "Cuir durci (x1), huile assombrissante (x1), huile de dermoptère (x1),acier noir (x5), cendres (x10)",
    "investment": "600",
    "price": 1200
  },
  {
    "id": "dg-skellige-helm",
    "name": {
      "en": "Skellige Helm",
      "fr": "Casque skellige"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "6 heures",
    "components": "Huile de dermoptère (x1), cuir durci (x1), acier noir (x4), os de bête (x5), fil (x6)",
    "investment": "527",
    "price": 1050
  },
  {
    "id": "dg-hindarsfjall-chausses",
    "name": {
      "en": "Hindarsfjall Heavy Chausses",
      "fr": "Chausses lourdes d’Hindarsfjall"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Cendres (x1), cuir durci (x1), huile de dermoptère (x1),  acier noir (x4), os de bête (x4), fil (x8)",
    "investment": "565",
    "price": 1124
  },
  {
    "id": "dg-great-helm",
    "name": {
      "en": "Great Helm",
      "fr": "Heaume"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "5 heures",
    "components": "Lin (x1), cire d’ogre (x2), cuir durci (x3), acier (x5), fil (x6)",
    "investment": "431",
    "price": 862
  },
  {
    "id": "dg-plate-greaves",
    "name": {
      "en": "Plate Greaves",
      "fr": "Jambières de plates"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Cire d’ogre (x1), huile de dermoptère (x1),cuir durci (x3), eau-forte (x4), acier (x5), fil (x7)",
    "investment": "468",
    "price": 798
  },
  {
    "id": "dg-nilf-greaves",
    "name": {
      "en": "Nilfgaardian Greaves",
      "fr": "Jambières nilfgaardiennes"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Cuir (x1), huile assombrissante (x1), huile de dermoptère (x2), lin (x1), cuir durci (x2), huile (x4),acier noir (x5), cendres (x10)",
    "investment": "631",
    "price": 1274
  },
  {
    "id": "dg-nilf-pavise",
    "name": {
      "en": "Nilfgaardian Pavise",
      "fr": "Pavois nilfgaardien"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "6 heures",
    "components": "Acier noir (x1), cire d’ogre (x1), huile assombrissante (x1),eau-forte (x2), graisse ester (x2), cuir durci (x3), bois durci (x10), cendres (x10)",
    "investment": "450",
    "price": 900
  },
  {
    "id": "dg-pavise",
    "name": {
      "en": "Pavise",
      "fr": "Pavois"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "5 heures",
    "components": "Acier (x1), cire d’ogre (x1), graisse ester (x2), cuir durci (x3), bois durci (x10)",
    "investment": "378",
    "price": 750
  },
  {
    "id": "dg-dwarven-heavy-cbow",
    "name": {
      "en": "Dwarven Heavy Crossbow",
      "fr": "Arbalète lourde naine"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Fer noir (x1), cuir durci (x2), acier mahakamien (x3), fil (x4), bois durci (x5), cire d’ogre (x5)",
    "investment": "632",
    "price": 1274
  },
  {
    "id": "dg-elven-travel-bow",
    "name": {
      "en": "Elven Travel Bow",
      "fr": "Arc de voyage elfe"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Cinquième essence (x1), cuir (x1), acier noir (x2), os de bête (x2), eau-forte (x3), plumes (x3),bois durci (x4), cire (x4), fil (x4), graisse ester (x5)",
    "investment": "432",
    "price": 862
  },
  {
    "id": "dg-gnomish-staff",
    "name": {
      "en": "Gnomish Staff",
      "fr": "Bâton gnome"
    },
    "tier": "master",
    "pool": "B",
    "dc": "22",
    "time": "11 heures",
    "components": "Acier noir (x1), toile de lin (x1), huile assombrissante (x3), cinquième essence (x5),bois durci (x6)",
    "investment": "682",
    "price": 1364
  },
  {
    "id": "dg-dwarven-cleaver",
    "name": {
      "en": "Dwarven Cleaver",
      "fr": "Couperet nain"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Bois durci (x1), cuir (x1), huile de dermoptère (x1), Pierre à aiguiser (x1), acier mahakamien (x2), argile alluviale (x5)",
    "investment": "374",
    "price": 750
  },
  {
    "id": "dg-halfling-rondel",
    "name": {
      "en": "Halfling Rondel",
      "fr": "Dague à rouelles halfelin"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Bois durci (x1), cuir durci (x1), huile assombrissante (x1),acier noir (x2), graisse ester (x2), pierre à aiguiser (x3)",
    "investment": "364",
    "price": 726
  },
  {
    "id": "dg-meteorite-sword",
    "name": {
      "en": "Meteorite Sword",
      "fr": "Épée météorique"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "10 heures",
    "components": "Pierre à aiguiser (x1), bois durci (x2), cuir (x2), eau-forte (x4),graisse ester (x4), météorite (x5)",
    "investment": "650",
    "price": 1312
  },
  {
    "id": "dg-dwarven-axe",
    "name": {
      "en": "Dwarven Axe",
      "fr": "Hache naine"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Pierre à aiguiser (x2),argile alluviale (x2), cuir durci (x2), acier mahakamien (x3),charbon (x3), bois durci (x4), eau-forte (x4)",
    "investment": "555",
    "price": 1110
  },
  {
    "id": "dg-mahakaman-martell",
    "name": {
      "en": "Mahakaman Martell",
      "fr": "Marteau mahakamien"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Lin (x1), peau de loup (x1), pierre à aiguiser (x1), cuir durci (x2), huilede dermoptère (x2), acier mahakamien (x3),bois durci (x3), graisse ester (x3), argile alluviale (x4)",
    "investment": "675",
    "price": 1350
  },
  {
    "id": "dg-elven-messer",
    "name": {
      "en": "Elven Messer",
      "fr": "Messer elfe"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Eau-forte (x1), pierre à aiguiser (x1), soie (x1), bois durci (x2),acier noir (x3), cuir (x3)",
    "investment": "446",
    "price": 892
  },
  {
    "id": "dg-vrihedd-sword",
    "name": {
      "en": "Vrihedd Cavalry Sword",
      "fr": "Sabre de cavalerie Vrihedd"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Soie (x1), bois durci (x2), pierre à aiguiser (x3), acier noir (x4), argile alluviale (x4), graisse ester (x4)",
    "investment": "558",
    "price": 1117
  },
  {
    "id": "dg-elven-glaive",
    "name": {
      "en": "Elven Glaive",
      "fr": "Vouge elfe"
    },
    "tier": "master",
    "pool": "A",
    "dc": "19",
    "time": "10 heures",
    "components": "Acier (x1), pierre à aiguiser (x2), plumes (x3), acier noir (x4), cuir (x4), graisse ester (x4),bois durci (x6)",
    "investment": "692",
    "price": 1386
  },
  {
    "id": "dg-gnomish-hand-cbow",
    "name": {
      "en": "Gnomish Hand Crossbow",
      "fr": "Arbalète de poing gnome"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Graisse ester (x1), huile de dermoptère (x1), acier noir (x2), bois durci (x2), cire (x2),huile assombrissante (x2), résine (x2), fil (x4)",
    "investment": "317",
    "price": 634
  },
  {
    "id": "dg-elven-walking-staff",
    "name": {
      "en": "Elven Walking Staff",
      "fr": "Bâton de marche elfe"
    },
    "tier": "grandmaster",
    "pool": "B",
    "dc": "25",
    "time": "13 heures",
    "components": "Acier noir (x1), gemme (x1),or (x1), soie (x1), peau de loup (x2), cinquième essence (x3),bois durci (x6), graisse ester (x6)",
    "investment": "735",
    "price": 1470
  },
  {
    "id": "dg-meteorite-flail",
    "name": {
      "en": "Meteorite Chain Mace",
      "fr": "Fléau d’armes météorique"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Acier noir (x1), bois durci (x1), cuir durci (x1), graisse ester (x1),pierre à aiguiser (x1), météorite (x5)",
    "investment": "676",
    "price": 1352
  },
  {
    "id": "dg-gnomish-gwyhyr",
    "name": {
      "en": "Gnomish Gwyhyr",
      "fr": "Gwyhyr gnome"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Acier noir (x1), cuir durci (x1), huile assombrissante (x1),bois durci (x2), dimeritium (x2), eau-forte (x2), graisse ester (x4), pierre à aiguiser (x6)",
    "investment": "814",
    "price": 1628
  },
  {
    "id": "dg-gnomish-black-axe",
    "name": {
      "en": "Gnomish Black Axe",
      "fr": "Hache noire gnome"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Cire d’ogre (x1), dimeritium (x1), pierre à aiguiser (x1), cuir durci (x2), acier noir (x3), bois durci (x4)",
    "investment": "688",
    "price": 1376
  },
  {
    "id": "dg-tir-tochair",
    "name": {
      "en": "Tir Tochair Blade",
      "fr": "Lame de Tir Tochair"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "26",
    "time": "13 heures",
    "components": "Acier noir (x1), cuir durci (x1), cuir de draconide (x1), pierre  à aiguiser (x1), bois durci (x2), dimeritium mahakamien (x2), cendres (x4), graisse ester (x4)",
    "investment": "888",
    "price": 1776
  },
  {
    "id": "dg-dwarven-polehammer",
    "name": {
      "en": "Dwarven Pole Hammer",
      "fr": "Marteau de guerre nain"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Cire ogre (x1), pierre à aiguiser (x1), acier mahakamien (x3),cuir durci (x3), bois durci (x6)",
    "investment": "624",
    "price": 1248
  },
  {
    "id": "dg-elven-zefhar",
    "name": {
      "en": "Elven Zefhar",
      "fr": "Zefhar elfe"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "13 heures",
    "components": "Cinquième essence (x2), cuir (x2), acier noir (x3), os de bête (x4), plumes (x4), eau-forte (x6),bois durci (x8), cire d’ogre (x8), fil (x8), graisse ester (x9)",
    "investment": "830",
    "price": 1660
  },
  {
    "id": "dg-elven-burrower",
    "name": {
      "en": "Elven Burrower Bolts",
      "fr": "Fouisseuse elfe"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "½ heure",
    "components": "Acier noir (x1), bois durci (x1), cire d’ogre (x1), fil (x1), résine (x1), plumes (x2), pierre à aiguiser (x2)",
    "investment": "185",
    "price": 100
  },
  {
    "id": "dg-dwarven-impact",
    "name": {
      "en": "Dwarven Impact Bolts",
      "fr": "Impact nain"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "½ heure",
    "components": "Acier mahakamien (x1), bois durci (x1), cire ogre (x1),fer (x1), plumes (x1)",
    "investment": "184",
    "price": 100
  },
  {
    "id": "dg-scoiatael-armor",
    "name": {
      "en": "Scoia’tael Armor",
      "fr": "Armure scoia’tael"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "20 heures",
    "components": "Huile de dermoptère (x2), peau de loup (x3), huile assombrissante (x4), lin (x8), fil (x9), graisse ester (x10), cendres (x11), acier noir (x12),eau-forte (x12), bois durci (x13)",
    "investment": "1 738",
    "price": 3486
  },
  {
    "id": "dg-gnomish-buckler",
    "name": {
      "en": "Gnomish Buckler",
      "fr": "Bocle gnome"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "6 heures",
    "components": "Cuir (x1), huile de dermoptère (x1), graisse ester (x1), acier noir (x3), eau-forte (x4)",
    "investment": "335",
    "price": 674
  },
  {
    "id": "dg-elven-shield",
    "name": {
      "en": "Elven Shield",
      "fr": "Bouclier elfe"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "5 heures",
    "components": "Acier noir (x2), cire d’ogre (x2), graisse ester (x2), eau-forte (x4), bois durci (x5), cuir durci (x5)",
    "investment": "528",
    "price": 1050
  },
  {
    "id": "dg-halfling-doublet",
    "name": {
      "en": "Halfling Protective Doublet",
      "fr": "Doublet armant halfelin"
    },
    "tier": "master",
    "pool": "A",
    "dc": "18",
    "time": "9 heures",
    "components": "Toile de lin (x2), soie (x4), coton (x7), fil (x10)",
    "investment": "281",
    "price": 562
  },
  {
    "id": "dg-dwarven-cloak",
    "name": {
      "en": "Dwarven Cloak",
      "fr": "Manteau nain"
    },
    "tier": "master",
    "pool": "A",
    "dc": "18",
    "time": "9 heures",
    "components": "Cuir de vache (x1), huile de dermoptère (x2), cuir (x6),graisse ester (x7), cire d’ogre (x10), fil (x10), résine (x10),cuir durci (x12)",
    "investment": "1 050",
    "price": 2100
  },
  {
    "id": "dg-gnomish-chain",
    "name": {
      "en": "Gnomish Chainmail",
      "fr": "Cotte de mailles gnome"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "24",
    "time": "24 heures",
    "components": "Huile assombrissante (x1), cuir (x2), acier noir (x8)",
    "investment": "736",
    "price": 1462
  },
  {
    "id": "dg-gnomish-dragoon",
    "name": {
      "en": "Gnomish Dragoon Armor",
      "fr": "Armure dragon gnome"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "25",
    "time": "25 heures",
    "components": "Météorite (x1), dimeritium mahakamien (x2),huile de dermoptère (x2), huile assombrissante (x4),toile de lin (x5), graisse ester (x10), acier noir (x12), eau-forte (x14),fil (x15)",
    "investment": "2 131",
    "price": 4274
  },
  {
    "id": "dg-mahakaman-pavise",
    "name": {
      "en": "Mahakaman Pavise",
      "fr": "Pavois mahakamien"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "26",
    "time": "7 heures",
    "components": "Cuir (x1), acier mahakamien (x2), graisse ester (x2), eau-forte (x3), cuir durci (x5), bois durci (x10), cire d’ogre (x11)",
    "investment": "788",
    "price": 1574
  },
  {
    "id": "dg-mahakaman-plate",
    "name": {
      "en": "Mahakaman Plate Armor",
      "fr": "Armure de plates mahakamienne"
    },
    "tier": "grandmaster",
    "pool": "A",
    "dc": "28",
    "time": "28 heures",
    "components": "Huile de dermoptère (x1), dimeritium mahakamien (x2), huile assombrissante (x2), météorite (x2), cire d’ogre (x3), cuir durci (x5), graisse ester (x8), fil (x10), acier mahakamien (x12), eau-forte (x12)",
    "investment": "2 645",
    "price": 5286
  },
  {
    "id": "dg-mat-fibers",
    "name": {
      "en": "Raw Fibers",
      "fr": "Fibres"
    },
    "tier": "novice",
    "pool": "M",
    "dc": "14",
    "time": "3 heures",
    "components": "Toile de lin (x1), fil (x2)",
    "investment": "28",
    "price": 60
  },
  {
    "id": "dg-studded-leather",
    "name": {
      "en": "Enhancement: Studded Leather",
      "fr": "Amélioration : Cuir clouté"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "14",
    "time": "3 heures",
    "components": "Cuir (x1), fer (x1), fil (x1)",
    "investment": "61",
    "price": 120
  },
  {
    "id": "dg-chainmail-enh",
    "name": {
      "en": "Enhancement: Chainmail",
      "fr": "Amélioration : Cotte de mailles"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "5 heures",
    "components": "Acier (x2)",
    "investment": "96",
    "price": 187
  },
  {
    "id": "dg-reinforced-leather",
    "name": {
      "en": "Enhancement: Reinforced Leather",
      "fr": "Amélioration : Cuir renforcé"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Cuir (x1), cuir durci (x1), cire (x3), fil (x5)",
    "investment": "97",
    "price": 195
  },
  {
    "id": "dg-steel-enh",
    "name": {
      "en": "Enhancement: Steel Plate",
      "fr": "Amélioration : Acier"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "5 heures",
    "components": "Acier (x2), eau-forte (x2), fil (x3)",
    "investment": "109",
    "price": 217
  },
  {
    "id": "dg-elven-enh",
    "name": {
      "en": "Enhancement: Elven",
      "fr": "Amélioration elfique"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "6 heures",
    "components": "Acier noir (x1), cuir durci (x1), plumes (x1), fil (x5)",
    "investment": "149",
    "price": 300
  },
  {
    "id": "dg-dwarven-enh",
    "name": {
      "en": "Enhancement: Dwarven",
      "fr": "Amélioration naine"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "6 heures",
    "components": "Acier mahakamien (x1), charbon (x1), peau de loup (x1), fil (x5)",
    "investment": "144",
    "price": 292
  },
  {
    "id": "dg-nilf-sights",
    "name": {
      "en": "Crossbow: Nilfgaardian Sights",
      "fr": "Visée nilfgaardienne"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "15",
    "time": "4 Heures",
    "components": "Acier(x1), Pierre à Aiguiser(x4)",
    "investment": "176",
    "price": 550
  },
  {
    "id": "dg-improved-cranequin",
    "name": {
      "en": "Crossbow: Improved Cranequin",
      "fr": "Guindeau amélioré"
    },
    "tier": "master",
    "pool": "A",
    "dc": "20",
    "time": "10 Heures",
    "components": "Acier(x4), Coton(x3), Fil(x10), Graisse Ester(x7)",
    "investment": "284",
    "price": 880
  },
  {
    "id": "dg-high-tension-string",
    "name": {
      "en": "Crossbow: High-Tension String",
      "fr": "Corde haute tension"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "17",
    "time": "4 Heures",
    "components": "Cire d'Ogre(x10) ,Fil(x10),Soie (x3)",
    "investment": "280",
    "price": 850
  },
  {
    "id": "dg-stabilizing-stock",
    "name": {
      "en": "Crossbow: Stabilizing Stock",
      "fr": "Garde stabilisatrice"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "12",
    "time": "2 Heures",
    "components": "Acier(x3),Bois durci(x5), Cuir(x1),Graisse Ester(x1)",
    "investment": "260",
    "price": 790
  },
  {
    "id": "dg-bludgeon-stick",
    "name": {
      "en": "Bludgeon Stick",
      "fr": "Bâton de matraque"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "8",
    "time": "1 heure",
    "components": "Bois durci x1 Cuir durci x1 Acier x1 Filetage x2",
    "investment": "72",
    "price": 125
  },
  {
    "id": "dg-blunt-maul",
    "name": {
      "en": "Blunt Maul",
      "fr": "Blunt Maul"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "2 heures",
    "components": "Bois durci x1 Cuir durci x1 Cire d'ogre x3 Acier x2 Fer x21 Résine x1",
    "investment": "148",
    "price": 306
  },
  {
    "id": "dg-traditional-bow",
    "name": {
      "en": "Traditional Bow",
      "fr": "Arc traditionnel"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Bois durci x5 Fil x4 Cire x2 Résine x2 Graisse ester x3 Fer x1 Cuir x2",
    "investment": "210",
    "price": 434
  },
  {
    "id": "dg-woodcutters-axe",
    "name": {
      "en": "Woodcutter’s Axe",
      "fr": "Hache de bûcheron"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "3 heures",
    "components": "Bois durci x1 Cuir durci x1 Cuir x1 Résine x4 Acier x1",
    "investment": "148",
    "price": 306
  },
  {
    "id": "dg-glaive",
    "name": {
      "en": "Glaive",
      "fr": "Glaive"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "15",
    "time": "8 heures",
    "components": "Bois durci x5, Acier x4, Fil x5, Cire d'ogre x3, Cuir x3",
    "investment": "481",
    "price": 974
  },
  {
    "id": "dg-redanian-mace",
    "name": {
      "en": "Redanian Mace",
      "fr": "Masse redanienne"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "15",
    "time": "6 heures",
    "components": "Bois durci x2, Cuir durci x1, Cire d'ogre x3, Acier x3, Fer x2, Résine x1",
    "investment": "250",
    "price": 502
  },
  {
    "id": "dg-temerian-slip-axe",
    "name": {
      "en": "Temerian Slip Axe",
      "fr": "Hache coulissante temerienne"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Bois durci x1, Cuir durci x1, Cuir x1, Résine x4, Acier x2, Cire d'ogre x2",
    "investment": "252",
    "price": 712
  },
  {
    "id": "dg-strong-crossbow",
    "name": {
      "en": "Strong Crossbow",
      "fr": "Arbalète lourde"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "11 heures",
    "components": "Bois durci x6, Cuir durci x2, Fil x6, Cire x2, Résine x3, Acier x4, Graisse ester x2, Cire Ogre x3, Fer x2",
    "investment": "525",
    "price": 1012
  },
  {
    "id": "dg-mancatcher",
    "name": {
      "en": "Mancatcher",
      "fr": "Attrape-coquin"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Fil (x1), Pierre à aiguiser (x1), Cire (x2), Graisse ester (x2), Acier (x3), Cuir (x3), Bois durci (x4)",
    "investment": "347",
    "price": 679
  },
  {
    "id": "dg-parrying-dagger",
    "name": {
      "en": "Parrying Dagger",
      "fr": "Dague de parade"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "4 heures",
    "components": "Acier (x1), Acier noir (x1), Bois durci (x1), Cire d’ogre (x2), Cuir durci (x2)",
    "investment": "262",
    "price": 525
  },
  {
    "id": "dg-flail",
    "name": {
      "en": "Flail",
      "fr": "Fléau"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Bois (x1), Cire d’ogre (x1), Résine (x1), Fer (x2), Huile de dermoptère (x2), Pierre à aiguiser (x2), Acier (x4)",
    "investment": "421",
    "price": 843
  },
  {
    "id": "dg-whip",
    "name": {
      "en": "Whip",
      "fr": "Fouet"
    },
    "tier": "novice",
    "pool": "A",
    "dc": "10",
    "time": "2 heures",
    "components": "Cire (x1), Cuir (x4)",
    "investment": "114",
    "price": 228
  },
  {
    "id": "dg-lamia-whip",
    "name": {
      "en": "Lamia Whip",
      "fr": "Lamia"
    },
    "tier": "master",
    "pool": "A",
    "dc": "24",
    "time": "12 heures",
    "components": "Bois durci (x1), Acier noir (x2), Acier de Tretogor (x2), Cuir durci (x2), Pierre à aiguiser (x2), Huile (x3), Charbon (x10)",
    "investment": "487",
    "price": 937
  },
  {
    "id": "dg-armored-trousers",
    "name": {
      "en": "Armored Trousers",
      "fr": "Pantalon renforcé"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "16",
    "time": "8 heures",
    "components": "Cuir durci x2, Acier x1, Fil x5, Acier x1",
    "investment": "187",
    "price": 374
  },
  {
    "id": "dg-interwoven-helm",
    "name": {
      "en": "Interwoven Helm",
      "fr": "Heaume entrelacé"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "19",
    "time": "9 heures",
    "components": "Lin tissé double x3, cuir x2, fil x7, cire x4, cuir Lyrian x1",
    "investment": "192",
    "price": 374
  },
  {
    "id": "dg-interwoven-gambeson",
    "name": {
      "en": "Interwoven Gambeson",
      "fr": "Gambison entrelacé"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "19",
    "time": "9 heures",
    "components": "Lin tissé double x6, Fil x6, Lin x4, Coton x11, Cuir Lyrian x1",
    "investment": "295",
    "price": 600
  },
  {
    "id": "dg-interwoven-trousers",
    "name": {
      "en": "Interwoven Trousers",
      "fr": "Pantalon entrelacé"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "19",
    "time": "9 heures",
    "components": "Lin tissé double x5, fil x6, cuir Lyrian x1",
    "investment": "228",
    "price": 450
  },
  {
    "id": "dg-lyrian-leather-jacket",
    "name": {
      "en": "Lyrian Leather Jacket",
      "fr": "Veste de cuir lyrienne"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "9 heures",
    "components": "Cuir Lyrian x4, Cuir x2, Fil x4, Lin x4, Acier x1",
    "investment": "392",
    "price": 786
  },
  {
    "id": "dg-lyrian-leather-trousers",
    "name": {
      "en": "Lyrian Leather Trousers",
      "fr": "Pantalon de cuir lyrien"
    },
    "tier": "journeyman",
    "pool": "A",
    "dc": "18",
    "time": "9 heures",
    "components": "Cuir Lyrian x4, Cuir x2, Fil x4, Lin x2, Acier x1",
    "investment": "392",
    "price": 786
  },
  {
    "id": "dg-fine-mail-hood",
    "name": {
      "en": "Fine Mail Hood",
      "fr": "Capuche fine en mailles"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "8 heures",
    "components": "Cuir durci x3, Acier Tretogor x3, Lin x2, Fil x6, Cire Ogre x2",
    "investment": "431",
    "price": 862
  },
  {
    "id": "dg-fine-mail-shirt",
    "name": {
      "en": "Fine Mail Shirt",
      "fr": "Armure fine en maille"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "8 heures",
    "components": "Cuir durci x3, Acier Tretogor x5, Lin x2, Fil x6, Cire d'ogre x2, Huile draconide x2, Coton x3",
    "investment": "565",
    "price": 1124
  },
  {
    "id": "dg-fine-mail-trousers",
    "name": {
      "en": "Fine Mail Trousers",
      "fr": "Pantalon fin en maille"
    },
    "tier": "master",
    "pool": "A",
    "dc": "22",
    "time": "5 heures",
    "components": "Cuir durci x3, Acier Tretogor x4, Lin x2, Fil x6, Cire d'ogre x2, Huile draconide x2, Coton x2",
    "investment": "450",
    "price": 900
  },
  {
    "id": "dg-koviri-battle-cap",
    "name": {
      "en": "Koviri Battle Cap",
      "fr": "Casque de combat Koviri"
    },
    "tier": "master",
    "pool": "A",
    "dc": "26",
    "time": "12 heures",
    "components": "Cuir draconide x2, Acier mahakamien x5, Cuir Lyrian x1, Huile assombrissante x1, Huile de dermoptère x4, Lin x2, Huile x5",
    "investment": "758",
    "price": 1385
  },
  {
    "id": "dg-koviri-battle-armor",
    "name": {
      "en": "Koviri Battle Armor",
      "fr": "Armure de combat Koviri"
    },
    "tier": "master",
    "pool": "A",
    "dc": "28",
    "time": "14 heures",
    "components": "Cuir draconide x4, Acier mahakamien x5, Cuir Lyrian x2, Huile assombrissante x1, Huile de dermoptère x3, Lin x4",
    "investment": "1012",
    "price": 1524
  },
  {
    "id": "dg-koviri-battle-greaves",
    "name": {
      "en": "Koviri Battle Greaves",
      "fr": "Jambière de combat Koviri"
    },
    "tier": "master",
    "pool": "A",
    "dc": "26",
    "time": "12 heures",
    "components": "Cuir draconide x3, Acier mahakamien x5, Cuir Lyrian x2, Huile assombrissante x1, Huile x1, Huile de dermoptère x3, Lin x4",
    "investment": "836",
    "price": 1422
  },
  {
    "id": "dg-chomper-trap",
    "name": {
      "en": "Chomper Trap",
      "fr": "Carnassier"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "16",
    "time": "½ heure",
    "components": "Fer (x1), Poudre zerrikanienne (x2), Fil (x5), Bois (x7)",
    "investment": "96",
    "price": 144
  },
  {
    "id": "dg-conflagration-trap",
    "name": {
      "en": "Conflagration Trap",
      "fr": "Déflagration"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "18",
    "time": "½ heure",
    "components": "Embryon d’endriague (x1), Argile alluviale (x2), Bois (x2), Cire (x2), Fil (x2)",
    "investment": "81",
    "price": 121
  },
  {
    "id": "dg-shredder-trap",
    "name": {
      "en": "Shredder Trap",
      "fr": "Écorcheur"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "16",
    "time": "½ heure",
    "components": "Charbon (x1), Extrait de venin (x1), Lin (x1), Pierre (x2), Bois (x3), Fil (x3)",
    "investment": "74",
    "price": 111
  },
  {
    "id": "dg-fury-trap",
    "name": {
      "en": "Fury Trap",
      "fr": "Furie"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "16",
    "time": "½ heure",
    "components": "Cœur de nekker (x1), Argile alluviale (x2), Bois (x3), Huile (x4), Fil (x5)",
    "investment": "76",
    "price": 144
  },
  {
    "id": "dg-talgarian-winter-trap",
    "name": {
      "en": "Talgarian Winter Trap",
      "fr": "Hiver talgarien"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "18",
    "time": "½ heure",
    "components": "Essence d’eau (x1), Vitriocybe (x1), Bois (x3), Fil (x4)",
    "investment": "84",
    "price": 126
  },
  {
    "id": "dg-marking-trap",
    "name": {
      "en": "Marking Trap",
      "fr": "Marquage"
    },
    "tier": "novice",
    "pool": "S",
    "dc": "14",
    "time": "½ heure",
    "components": "Bois (x1), Cendres (x1), Fil (x1), Lin (x1), Soufre (x1), Pétales de ginatia (x3)",
    "investment": "38",
    "price": 57
  },
  {
    "id": "dg-explosive-ammunition-x5",
    "name": {
      "en": "Explosive Ammunition (x5)",
      "fr": "Projectiles explosifs (x5)"
    },
    "tier": "master",
    "pool": "S",
    "dc": "20",
    "time": "½ heure",
    "components": "Bois durci (x1), Huile (x1), Plumes (x1), Acier noir (x2), Argile alluviale (x3), Cire d’ogre (x3), Poudre zerrikanienne (x4)",
    "investment": "362",
    "price": 540
  },
  {
    "id": "dg-splitter-ammunition-x5",
    "name": {
      "en": "Splitter Ammunition (x5)",
      "fr": "Projectiles à fragmentation (x5)"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "18",
    "time": "½ heure",
    "components": "Toile de lin (x1), Acier (x2), Argile alluviale (x2), Bois durci (x2), Fil (x3), Plumes (x3)",
    "investment": "181",
    "price": 270
  },
  {
    "id": "dg-tracking-ammunition-x5",
    "name": {
      "en": "Tracking Ammunition (x5)",
      "fr": "Projectiles pisteurs (x5)"
    },
    "tier": "novice",
    "pool": "S",
    "dc": "14",
    "time": "½ heure",
    "components": "Acier (x1), Bois durci (x1), Plumes (x1), Résine (x1), Herbe à tanner (x2)",
    "investment": "76",
    "price": 110
  },
  {
    "id": "dg-runeword-burning",
    "name": {
      "en": "Runeword: Burning",
      "fr": "Mot runique : Combustion"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Rune de Tchernobog (x1), Rune de Dajbog (x1)",
    "investment": "1175",
    "price": 2150
  },
  {
    "id": "dg-runeword-placation",
    "name": {
      "en": "Runeword: Placation",
      "fr": "Mot runique : Apaisement"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Rune de Morana (x1), Rune de Stribog (x1)",
    "investment": "1075",
    "price": 2150
  },
  {
    "id": "dg-runeword-preservation",
    "name": {
      "en": "Runeword: Preservation",
      "fr": "Mot runique : Préservation"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Rune de Devana (x1), Rune de Morana (x1)",
    "investment": "1150",
    "price": 2300
  },
  {
    "id": "dg-runeword-prolongation",
    "name": {
      "en": "Runeword: Prolongation",
      "fr": "Mot runique : Prolongation"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Rune de Péroun (x1), Rune de Svarog (x1)",
    "investment": "1175",
    "price": 2150
  },
  {
    "id": "dg-runeword-shearing",
    "name": {
      "en": "Runeword: Shearing",
      "fr": "Mot runique : Cisaillement"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Rune de Vélès (x1), Rune de Zoria (x1)",
    "investment": "1150",
    "price": 2300
  },
  {
    "id": "dg-runeword-deflection",
    "name": {
      "en": "Runeword: Deflection",
      "fr": "Mot runique : Déviation"
    },
    "tier": "master",
    "pool": "S",
    "dc": "21",
    "time": "1 heure",
    "components": "Rune de Tchernobog (x1), Rune de Péroun (x1), Rune de Stribog (x1)",
    "investment": "1650",
    "price": 3300
  },
  {
    "id": "dg-runeword-depletion",
    "name": {
      "en": "Runeword: Depletion",
      "fr": "Mot runique : Épuisement"
    },
    "tier": "master",
    "pool": "S",
    "dc": "21",
    "time": "1 heure",
    "components": "Rune de Stribog (x1), Rune de Triglav (x1), Rune de Vélès (x1)",
    "investment": "1675",
    "price": 3350
  },
  {
    "id": "dg-runeword-rejuvenation",
    "name": {
      "en": "Runeword: Rejuvenation",
      "fr": "Mot runique : Jouvence"
    },
    "tier": "master",
    "pool": "S",
    "dc": "21",
    "time": "1 heure",
    "components": "Rune de Péroun (x1), Rune de Svarog (x1), Rune de Triglav (x1)",
    "investment": "1750",
    "price": 3500
  },
  {
    "id": "dg-glyphword-balance",
    "name": {
      "en": "Glyphword: Balance",
      "fr": "Mot glyphique : Équilibre"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Glyphe de Guérison (x1), Glyphe de Renforcement (x1)",
    "investment": "550",
    "price": 1100
  },
  {
    "id": "dg-glyphword-beguilement",
    "name": {
      "en": "Glyphword: Beguilement",
      "fr": "Mot glyphique : Séduction"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Glyphe de Feu (x1), Glyphe d’Eau (x1)",
    "investment": "1150",
    "price": 2300
  },
  {
    "id": "dg-glyphword-heft",
    "name": {
      "en": "Glyphword: Heft",
      "fr": "Mot glyphique : Lourdeur"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Glyphe de Guérison (x1), Glyphe de Renforcement (x1)",
    "investment": "550",
    "price": 1100
  },
  {
    "id": "dg-glyphword-rotation",
    "name": {
      "en": "Glyphword: Rotation",
      "fr": "Mot glyphique : Rotation"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Glyphe de Coagulation (x1), Glyphe de Renforcement (x1)",
    "investment": "300",
    "price": 600
  },
  {
    "id": "dg-glyphword-shining",
    "name": {
      "en": "Glyphword: Shining",
      "fr": "Mot glyphique : Éclat"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "15",
    "time": "1 heure",
    "components": "Glyphe d’Air (x1), Glyphe de Protection (x1)",
    "investment": "875",
    "price": 1750
  },
  {
    "id": "dg-glyphword-protection",
    "name": {
      "en": "Glyphword: Protection",
      "fr": "Mot glyphique : Protection"
    },
    "tier": "master",
    "pool": "S",
    "dc": "21",
    "time": "1 heure",
    "components": "Glyphe de Terre (x1), Glyphe de Magie (x1), Glyphe de Protection (x1)",
    "investment": "1450",
    "price": 2900
  },
  {
    "id": "dg-glyphword-retribution",
    "name": {
      "en": "Glyphword: Retribution",
      "fr": "Mot glyphique : Représailles"
    },
    "tier": "master",
    "pool": "S",
    "dc": "21",
    "time": "1 heure",
    "components": "Glyphe de Terre (x1), Glyphe de Feu (x1), Glyphe de Renforcement (x1)",
    "investment": "1250",
    "price": 2500
  },
  {
    "id": "dg-enhancement-slot",
    "name": {
      "en": "Enhancement Slot",
      "fr": "Emplacement d’amélioration"
    },
    "tier": "master",
    "pool": "S",
    "dc": "25",
    "time": "4 heures",
    "components": "Météorite (x4), Poussière imprégnée (x2)",
    "investment": "684",
    "price": 1368
  },
  {
    "id": "dg-bloodstone-dagger",
    "name": {
      "en": "Bloodstone Dagger",
      "fr": "Dague en pierre de sang"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "14",
    "time": "4 heures",
    "components": "Cendres (x2), Os de bête (x1), Huile assombrissante (x1), Eau-forte (x4), Pierre à aiguiser (x2), Acier (x1), Gemme (x1)",
    "investment": "254",
    "price": 500
  },
  {
    "id": "dg-wand-of-banishment",
    "name": {
      "en": "Wand of Banishment",
      "fr": "Baguette de bannissement"
    },
    "tier": "journeyman",
    "pool": "S",
    "dc": "17",
    "time": "9 heures",
    "components": "Bois (x1), Cinquième essence (x2), Graisse ester (x2), Acier noir (x2), Eau-forte (x5), Cire d’ogre (x3), Optima mater (x1)",
    "investment": "405",
    "price": 800
  },
  {
    "id": "dg-earthly-ribbons",
    "name": {
      "en": "Earthly Ribbons",
      "fr": "Rubans terrestres"
    },
    "tier": "master",
    "pool": "S",
    "dc": "22",
    "time": "10 heures",
    "components": "Soie (x8), Cinquième essence (x3), Fil (x10)",
    "investment": "676",
    "price": 1352
  },
  {
    "id": "dg-cerebral-elixir",
    "name": {
      "en": "Cerebral Elixir",
      "fr": "Élixir cérébral"
    },
    "tier": "master",
    "pool": "S",
    "dc": "22",
    "time": "10 heures",
    "components": "Alcohest (x3), Cerveau félin (x1), Hallucinogène (x1), Pétales d’ellébore (x3), Racine de mandragore (x5), Œil de corbeau (x3), Aconit (x4), Argent (x1), Fibre de han (x4)",
    "investment": "666",
    "price": 1332
  },
  {
    "id": "dg-centerpiece",
    "name": {
      "en": "Centerpiece",
      "fr": "Pièce maîtresse"
    },
    "tier": "master",
    "pool": "S",
    "dc": "22",
    "time": "10 heures",
    "components": "Au moins 3 matériaux distincts pour 700+ couronnes (jet de Beaux-Arts)",
    "investment": "700",
    "price": 0
  },
  {
    "id": "dg-staff-of-binding",
    "name": {
      "en": "Staff of Binding",
      "fr": "Bâton de lien"
    },
    "tier": "master",
    "pool": "S",
    "dc": "19",
    "time": "12 heures",
    "components": "Bois (x4), Cinquième essence (x5), Cendres (x1), Graisse ester (x1), Huile de dermoptère (x3), Cire d’ogre (x5), Gemme (x1)",
    "investment": "666",
    "price": 1332
  },
  {
    "id": "dg-true-staff-of-binding",
    "name": {
      "en": "True Staff of Binding",
      "fr": "Véritable Bâton de lien"
    },
    "tier": "grandmaster",
    "pool": "S",
    "dc": "25",
    "time": "13 heures",
    "components": "Bâton de lien, Météorite (x3), Optima mater (x2)",
    "investment": "1160",
    "price": 2320
  }
];
