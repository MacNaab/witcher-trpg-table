import type { MaterialLexiconEntry } from '../types';

/**
 * Crafting Materials reference table (13 entries).
 */
export const CRAFTING_MATERIALS_DATA: readonly MaterialLexiconEntry[] = [
  {
    "id": "crafting-materials-1-ashes",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Ashes",
      "fr": "Cendres"
    },
    "rarity": "E",
    "location": {
      "en": "Fire and burned objects",
      "fr": "Feu et objets brûlés"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "10",
    "weight": "0.1",
    "cost": "1"
  },
  {
    "id": "crafting-materials-2-coal",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Coal",
      "fr": "Charbon"
    },
    "rarity": "C",
    "location": {
      "en": "Fire, mountains, or underground",
      "fr": "Feu, montagnes ou souterrains"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "14",
    "weight": "0.1",
    "cost": "1"
  },
  {
    "id": "crafting-materials-3-cotton",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Cotton",
      "fr": "Coton"
    },
    "rarity": "C",
    "location": {
      "en": "Fields and plantations",
      "fr": "Champs et plantations"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "1"
  },
  {
    "id": "crafting-materials-4-double-woven-linen",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Double Woven Linen",
      "fr": "Lin tissé double"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "22"
  },
  {
    "id": "crafting-materials-5-glass",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Glass",
      "fr": "Verre"
    },
    "rarity": "P",
    "location": {
      "en": "Bought",
      "fr": "Acheté"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.5",
    "cost": "5"
  },
  {
    "id": "crafting-materials-6-hardened-timber",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Hardened Timber",
      "fr": "Bois durci"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "16"
  },
  {
    "id": "crafting-materials-7-linen",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Linen",
      "fr": "Lin"
    },
    "rarity": "C",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "9"
  },
  {
    "id": "crafting-materials-8-oil",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Oil",
      "fr": "Huile"
    },
    "rarity": "C",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "3"
  },
  {
    "id": "crafting-materials-9-resin",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Resin",
      "fr": "Résine"
    },
    "rarity": "C",
    "location": {
      "en": "Forests",
      "fr": "Forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "10",
    "weight": "0.1",
    "cost": "2"
  },
  {
    "id": "crafting-materials-10-silk",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Silk",
      "fr": "Soie"
    },
    "rarity": "P",
    "location": {
      "en": "Bought",
      "fr": "Acheté"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "50"
  },
  {
    "id": "crafting-materials-11-thread",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Thread",
      "fr": "Fil"
    },
    "rarity": "C",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "3"
  },
  {
    "id": "crafting-materials-12-timber",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Timber",
      "fr": "Bois"
    },
    "rarity": "E",
    "location": {
      "en": "Forests",
      "fr": "Forêts"
    },
    "quantity": {
      "en": "2d6",
      "fr": "2d6"
    },
    "forageDc": "8",
    "weight": "1",
    "cost": "3"
  },
  {
    "id": "crafting-materials-13-wax",
    "tabId": "crafting-materials",
    "rowKind": "material",
    "name": {
      "en": "Wax",
      "fr": "Cire"
    },
    "rarity": "C",
    "location": {
      "en": "Forests and fields",
      "fr": "Forêts et champs"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "12",
    "weight": "0.1",
    "cost": "2"
  }
];

/**
 * Hides & Animal Parts reference table (9 entries).
 */
export const ANIMAL_PARTS_DATA: readonly MaterialLexiconEntry[] = [
  {
    "id": "animal-parts-1-beast-bones",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Beast Bones",
      "fr": "Os de bête"
    },
    "rarity": "C",
    "location": {
      "en": "Found on monsters and beasts",
      "fr": "Trouvé sur des monstres et des bêtes"
    },
    "quantity": {
      "en": "Variable",
      "fr": "Variable"
    },
    "forageDc": "N/A",
    "weight": "4",
    "cost": "8"
  },
  {
    "id": "animal-parts-2-cow-hide",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Cow Hide",
      "fr": "Peau de vache"
    },
    "rarity": "C",
    "location": {
      "en": "Bought",
      "fr": "Acheté"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "5",
    "cost": "10"
  },
  {
    "id": "animal-parts-3-draconid-leather",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Draconid Leather",
      "fr": "Cuir draconide"
    },
    "rarity": "R",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "5",
    "cost": "58"
  },
  {
    "id": "animal-parts-4-draconid-scales",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Draconid Scales",
      "fr": "Écailles draconides"
    },
    "rarity": "R",
    "location": {
      "en": "Found on wyverns",
      "fr": "Trouvé sur les wyvernes"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "N/A",
    "weight": "5",
    "cost": "30"
  },
  {
    "id": "animal-parts-5-feathers",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Feathers",
      "fr": "Plumes"
    },
    "rarity": "E",
    "location": {
      "en": "Found on birds",
      "fr": "Trouvé sur les oiseaux"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "4"
  },
  {
    "id": "animal-parts-6-hardened-leather",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Hardened Leather",
      "fr": "Cuir durci"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "3",
    "cost": "48"
  },
  {
    "id": "animal-parts-7-leather",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Leather",
      "fr": "Cuir"
    },
    "rarity": "C",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "28"
  },
  {
    "id": "animal-parts-8-lyrian-leather",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Lyrian Leather",
      "fr": "Cuir Lyrian"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "60"
  },
  {
    "id": "animal-parts-9-wolf-hide",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Wolf Hide",
      "fr": "Peau de loup"
    },
    "rarity": "C",
    "location": {
      "en": "Found on wolves",
      "fr": "Trouvé sur les loups"
    },
    "quantity": {
      "en": "3",
      "fr": "3"
    },
    "forageDc": "N/A",
    "weight": "3",
    "cost": "14"
  },
  {
    "id": "animal-parts-10-bear-hide",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Bear Hide",
      "fr": "Peau d’ours"
    },
    "rarity": "C",
    "location": {
      "en": "Found on bears",
      "fr": "Trouvé sur les ours"
    },
    "quantity": {
      "en": "Variable",
      "fr": "Variable"
    },
    "forageDc": "N/A",
    "weight": "6",
    "cost": "30"
  },
  {
    "id": "animal-parts-11-boar-hide",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Boar Hide",
      "fr": "Peau de sanglier"
    },
    "rarity": "C",
    "location": {
      "en": "Found on boars",
      "fr": "Trouvé sur les sangliers"
    },
    "quantity": {
      "en": "Variable",
      "fr": "Variable"
    },
    "forageDc": "N/A",
    "weight": "2",
    "cost": "10"
  },
  {
    "id": "animal-parts-12-panther-hide",
    "tabId": "animal-parts",
    "rowKind": "material",
    "name": {
      "en": "Panther Hide",
      "fr": "Peau de panthère"
    },
    "rarity": "P",
    "location": {
      "en": "Found on panthers",
      "fr": "Trouvé sur les panthères"
    },
    "quantity": {
      "en": "Variable",
      "fr": "Variable"
    },
    "forageDc": "N/A",
    "weight": "3",
    "cost": "38"
  }
];

/**
 * Ingots & Minerals reference table (16 entries).
 */
export const MINERALS_DATA: readonly MaterialLexiconEntry[] = [
  {
    "id": "minerals-1-dark-iron",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Dark Iron",
      "fr": "Fer noir"
    },
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "18",
    "weight": "1.5",
    "cost": "52"
  },
  {
    "id": "minerals-2-dark-steel",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Dark Steel",
      "fr": "Acier foncé"
    },
    "rarity": "R",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "82"
  },
  {
    "id": "minerals-3-dimeritium",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Dimeritium",
      "fr": "Diméritium"
    },
    "rarity": "R",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "240"
  },
  {
    "id": "minerals-4-gemstone",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Gemstone",
      "fr": "Gemme"
    },
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "24",
    "weight": "0.1",
    "cost": "100"
  },
  {
    "id": "minerals-5-glowing-ore",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Glowing Ore",
      "fr": "Minerai lumineux"
    },
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "20",
    "weight": "1",
    "cost": "80"
  },
  {
    "id": "minerals-6-gold",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Gold",
      "fr": "Or"
    },
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "1",
    "cost": "85"
  },
  {
    "id": "minerals-7-iron",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Iron",
      "fr": "Fer"
    },
    "rarity": "P",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "16",
    "weight": "1.5",
    "cost": "30"
  },
  {
    "id": "minerals-8-dimeritium-mahakamien",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Mahakaman Dimeritium",
      "fr": "Diméritium de Mahakaman"
    },
    "rarity": "R",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "300"
  },
  {
    "id": "minerals-9-mahakaman-steel",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Mahakaman Steel",
      "fr": "Acier de Mahakaman"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "114"
  },
  {
    "id": "minerals-10-meteorite",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Meteorite",
      "fr": "Météorite"
    },
    "rarity": "R",
    "location": {
      "en": "Anywhere above ground",
      "fr": "Partout en surface"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "24",
    "weight": "1",
    "cost": "98"
  },
  {
    "id": "minerals-11-river-clay",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "River Clay",
      "fr": "Argile alluviale"
    },
    "rarity": "P",
    "location": {
      "en": "Rivers or shores",
      "fr": "Rivières ou rivages"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "14",
    "weight": "1.5",
    "cost": "5"
  },
  {
    "id": "minerals-12-silver",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Silver",
      "fr": "Argent"
    },
    "rarity": "R",
    "location": {
      "en": "Mountains and underground",
      "fr": "Montagnes et souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "16",
    "weight": "1",
    "cost": "72"
  },
  {
    "id": "minerals-13-steel",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Steel",
      "fr": "Acier"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "48"
  },
  {
    "id": "minerals-14-stone",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Stone",
      "fr": "Pierre"
    },
    "rarity": "E",
    "location": {
      "en": "Everywhere",
      "fr": "Partout"
    },
    "quantity": {
      "en": "2d6",
      "fr": "2d6"
    },
    "forageDc": "8",
    "weight": "2",
    "cost": "4"
  },
  {
    "id": "minerals-15-tretogor-steel",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Tretogor Steel",
      "fr": "Acier de Tretogor"
    },
    "rarity": "P",
    "location": {
      "en": "Bought or crafted",
      "fr": "Acheté ou fabriqué"
    },
    "quantity": {
      "en": "N/A",
      "fr": "N/A"
    },
    "forageDc": "N/A",
    "weight": "1",
    "cost": "64"
  },
  {
    "id": "minerals-16-zerrikanian-powder",
    "tabId": "minerals",
    "rowKind": "material",
    "name": {
      "en": "Zerrikanian Powder",
      "fr": "Poudre zerrikanienne"
    },
    "rarity": "P",
    "location": {
      "en": "Mountains or underground",
      "fr": "Montagnes ou souterrains"
    },
    "quantity": {
      "en": "1d6/2",
      "fr": "1d6/2"
    },
    "forageDc": "18",
    "weight": "0.1",
    "cost": "30"
  }
];

/**
 * Alchemical Treatments reference table (8 entries).
 */
export const ALCHEMICAL_TREATMENTS_DATA: readonly MaterialLexiconEntry[] = [
  {
    "id": "alchemical-treatments-1-darkening-oil",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Darkening Oil",
      "fr": "Huile assombrissante"
    },
    "rarity": "P",
    "location": {
      "en": "Forests",
      "fr": "Forêts"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "16",
    "weight": "0.1",
    "cost": "24"
  },
  {
    "id": "alchemical-treatments-2-drake-oil",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Drake Oil",
      "fr": "Huile de dermoptère"
    },
    "rarity": "P",
    "location": {
      "en": "Rivers and coasts",
      "fr": "Rivières et côtes"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "16",
    "weight": "0.1",
    "cost": "45"
  },
  {
    "id": "alchemical-treatments-3-ester-grease",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Ester Grease",
      "fr": "Graisse d'Ester"
    },
    "rarity": "C",
    "location": {
      "en": "Forests and fields",
      "fr": "Forêts et champs"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "14",
    "weight": "0.1",
    "cost": "8"
  },
  {
    "id": "alchemical-treatments-4-etching-acid",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Etching Acid",
      "fr": "Eau-forte"
    },
    "rarity": "C",
    "location": {
      "en": "Caves and mountains",
      "fr": "Grottes et montagnes"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "14",
    "weight": "0.1",
    "cost": "2"
  },
  {
    "id": "alchemical-treatments-5-fifth-essence",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Fifth Essence",
      "fr": "Cinquième essence"
    },
    "rarity": "R",
    "location": {
      "en": "Places of Power, mages, and fiends",
      "fr": "Lieux de pouvoir, mages et démons"
    },
    "quantity": {
      "en": "Variable",
      "fr": "Variable"
    },
    "forageDc": "N/A",
    "weight": "0.1",
    "cost": "82"
  },
  {
    "id": "alchemical-treatments-6-ogre-wax",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Ogre Wax",
      "fr": "Cire d'Ogre"
    },
    "rarity": "C",
    "location": {
      "en": "Caves",
      "fr": "Grottes"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "14",
    "weight": "0.1",
    "cost": "10"
  },
  {
    "id": "alchemical-treatments-7-sharpening-grit",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Sharpening Grit",
      "fr": "Grains d'affûtage"
    },
    "rarity": "P",
    "location": {
      "en": "Mountains and caves",
      "fr": "Montagnes et grottes"
    },
    "quantity": {
      "en": "1d6",
      "fr": "1d6"
    },
    "forageDc": "16",
    "weight": "0.1",
    "cost": "32"
  },
  {
    "id": "alchemical-treatments-8-tanning-herbs",
    "tabId": "alchemical-treatments",
    "rowKind": "material",
    "name": {
      "en": "Tanning Herbs",
      "fr": "Herbes de tannage"
    },
    "rarity": "C",
    "location": {
      "en": "Fields and forests",
      "fr": "Champs et forêts"
    },
    "quantity": {
      "en": "1d10",
      "fr": "1d10"
    },
    "forageDc": "14",
    "weight": "0.1",
    "cost": "3"
  }
];
