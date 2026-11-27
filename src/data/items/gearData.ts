import type { GearCatalogEntry } from './types';

/**
 * Unified general equipment, tools, containers, clothing, food, services, lodging & mount gear (124 entries).
 */
export const GEAR_ITEMS: readonly GearCatalogEntry[] = [
  {
    "id": "eq-writing-kit",
    "name": {
      "en": "Writing Kit",
      "fr": "Nécessaire d’écriture"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 25,
    "priceDisplay": "25",
    "weight": "1",
    "size": "P",
    "effect": "Permet d’écrire des lettres, des notes, etc",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-fishing-gear",
    "name": {
      "en": "Fishing Gear",
      "fr": "Équipement de pêche"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 27,
    "priceDisplay": "27",
    "weight": "0.5",
    "size": "G",
    "effect": "+2 en Survie pour pêcher",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-surgeons-kit",
    "name": {
      "en": "Surgeon’s Kit",
      "fr": "Instruments chirurgicaux"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "C",
    "price": 83,
    "priceDisplay": "83",
    "weight": "1",
    "size": "P",
    "effect": "Permet de pratiquer la chirurgie.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-fine-art-tools",
    "name": {
      "en": "Fine Art Tools",
      "fr": "Accessoires artistiques"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "C",
    "price": 55,
    "priceDisplay": "55",
    "weight": "2",
    "size": "P",
    "effect": "Permettent de créer une forme d’art (peinture, joaillerie, sculpture, etc.)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-crafting-tools",
    "name": {
      "en": "Crafting Tools",
      "fr": "Outils d’artisan"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "C",
    "price": 83,
    "priceDisplay": "83",
    "weight": "5",
    "size": "p",
    "effect": "Permettent de fabriquer des armes et des armures",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-merchants-tools",
    "name": {
      "en": "Merchant’s Tools",
      "fr": "Outils de marchand"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "C",
    "price": 60,
    "priceDisplay": "60",
    "weight": "1.5",
    "size": "P",
    "effect": "+2 en Négoce pour évaluer des biens",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-tinkers-forge",
    "name": {
      "en": "Tinker’s Forge",
      "fr": "Forge portable"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "I",
    "price": 110,
    "priceDisplay": "110",
    "weight": "5",
    "size": "G",
    "effect": "Permet de forger des armes et des armures n’importe où",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-forgery-kit",
    "name": {
      "en": "Forgery Kit",
      "fr": "Matériel de contrefaçon"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "I",
    "price": 60,
    "priceDisplay": "60",
    "weight": "0.5",
    "size": "P",
    "effect": "Permet de fabriquer de la fausse monnaie et de falsifier des documents",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-disguise-kit",
    "name": {
      "en": "Disguise Kit",
      "fr": "Nécessaire de déguisement"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "I",
    "price": 58,
    "priceDisplay": "58",
    "weight": "1",
    "size": "P",
    "effect": "+2 en Déguisement",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-thieves-tools",
    "name": {
      "en": "Thieves’ Tools",
      "fr": "Outils de voleur"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 80,
    "priceDisplay": "80",
    "weight": "1",
    "size": "P",
    "effect": "Permettent de crocheter des serrures",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-alchemy-set",
    "name": {
      "en": "Alchemy Set",
      "fr": "Ensemble d’alchimie"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "I",
    "price": 80,
    "priceDisplay": "80",
    "weight": "3",
    "size": "G",
    "effect": "Permet de fabriquer des articles alchimiques",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-makeup-kit",
    "name": {
      "en": "Makeup Kit",
      "fr": "Trousse de maquillage"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 35,
    "priceDisplay": "35",
    "weight": "0.5",
    "size": "M",
    "effect": "+2 en Charisme et Séduction",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-cooking-tools",
    "name": {
      "en": "Cooking Tools",
      "fr": "Ustensiles de cuisine"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 15,
    "priceDisplay": "15",
    "weight": "3",
    "size": "p",
    "effect": "Permet de cuisiner",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-amulet-simple",
    "name": {
      "en": "Amulet, Simple",
      "fr": "Amulette simple"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "R",
    "price": 250,
    "priceDisplay": "250",
    "weight": "0.1",
    "size": "M",
    "effect": "Focus (1)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-amulet-gem",
    "name": {
      "en": "Amulet, Gemstone",
      "fr": "Amulette avec gemme"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "R",
    "price": 500,
    "priceDisplay": "500",
    "weight": "0.1",
    "size": "M",
    "effect": "Focus (3)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-telecommunicator",
    "name": {
      "en": "Telecommunicator",
      "fr": "Télécommunicateur"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "R",
    "price": 1000,
    "priceDisplay": "1000",
    "weight": "4",
    "size": "-",
    "effect": "Permet de communiquer avec le rituel de Télécommunication",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-armor-repair-kit",
    "name": {
      "en": "Armor Repair Kit",
      "fr": "Kit de réparation d’armure"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 33,
    "priceDisplay": "33",
    "weight": "1",
    "size": "P",
    "effect": "Répare de la durabilité d'armure ( voir desc )",
    "race": "Humain",
    "source": "Fan Made"
  },
  {
    "id": "eq-weapon-repair-kit",
    "name": {
      "en": "Weapon Repair Kit",
      "fr": "Kit de réparation d’arme"
    },
    "category": "Outils",
    "shopKind": "tool",
    "availability": "P",
    "price": 15,
    "priceDisplay": "15",
    "weight": "1",
    "size": "P",
    "effect": "Répare de la durabilité d'arme ( voir desc )",
    "race": "Humain",
    "source": "Fan Made"
  },
  {
    "id": "eq-rope-20m",
    "name": {
      "en": "Rope (20m)",
      "fr": "20 m de corde"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 20,
    "priceDisplay": "20",
    "weight": "1.5",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "20"
  },
  {
    "id": "eq-tarp",
    "name": {
      "en": "Tarp",
      "fr": "Bâche"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "1.5",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-candles-5",
    "name": {
      "en": "Candles (x5)",
      "fr": "Bougies (x5)"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 5,
    "priceDisplay": "5",
    "weight": "0.5",
    "size": "M",
    "effect": "Augmente le niveau de luminosité de 1 dans un rayon de 2 m.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-lock",
    "name": {
      "en": "Lock",
      "fr": "Cadenas"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 34,
    "priceDisplay": "34",
    "weight": "0.1",
    "size": "M",
    "effect": "Crochetage SD 15 pour l'ouvrir.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-lock-strong",
    "name": {
      "en": "Lock, Strong",
      "fr": "Cadenas résistant"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "I",
    "price": 68,
    "priceDisplay": "68",
    "weight": "0.1",
    "size": "M",
    "effect": "Crochetage SD 18 pour l'ouvrir.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-map-continent",
    "name": {
      "en": "Map of the Continent",
      "fr": "Carte du Continent"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 18,
    "priceDisplay": "18",
    "weight": "0.1",
    "size": "P",
    "effect": "+3 en Navigation",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chalk",
    "name": {
      "en": "Chalk",
      "fr": "Craie"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 2,
    "priceDisplay": "2",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-dice-poker",
    "name": {
      "en": "Dice Poker Board",
      "fr": "Piste de dés"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 25,
    "priceDisplay": "25",
    "weight": "0.5",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-loaded-dice",
    "name": {
      "en": "Loaded Dice",
      "fr": "Dés pipés"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 12,
    "priceDisplay": "12",
    "weight": "0.1",
    "size": "M",
    "effect": "+3 en jeu, SD 16 Vigilance pour démasquer.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-shackles",
    "name": {
      "en": "Shackles",
      "fr": "Entraves"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 50,
    "priceDisplay": "50",
    "weight": "2",
    "size": "P",
    "effect": "Réduit la VIT à 3",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-manacles",
    "name": {
      "en": "Manacles",
      "fr": "Fers (menottes)"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 30,
    "priceDisplay": "30",
    "weight": "0.5",
    "size": "P",
    "effect": "Crochetage SD 16 pour l'ouvrir. Physique SD 20 pour les casser.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-dimeritium-manacles",
    "name": {
      "en": "Dimeritium Manacles",
      "fr": "Menottes en diméritium"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "I",
    "price": 150,
    "priceDisplay": "150",
    "weight": "0.5",
    "size": "P",
    "effect": "Étouffe la magie.",
    "race": "Humain",
    "source": "Fan Made"
  },
  {
    "id": "eq-grappling-hook",
    "name": {
      "en": "Grappling Hook",
      "fr": "Grappin"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 13,
    "priceDisplay": "13",
    "weight": "0.5",
    "size": "G",
    "effect": "+2 à l’Escalade",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-instrument",
    "name": {
      "en": "Musical Instrument",
      "fr": "Instrument de musique"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 38,
    "priceDisplay": "38",
    "weight": "1",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-gwent-deck",
    "name": {
      "en": "Gwent Deck",
      "fr": "Jeu de Gwynt"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 5,
    "priceDisplay": "5",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-journal",
    "name": {
      "en": "Journal / Ledger",
      "fr": "Journal / Livre vierge"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "0.5",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-lantern",
    "name": {
      "en": "Lantern",
      "fr": "Lanterne"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 35,
    "priceDisplay": "35",
    "weight": "1",
    "size": "G",
    "effect": "Augmente la luminosité de 2m dans un rayon de 3m.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bullseye-lantern",
    "name": {
      "en": "Lantern, Bullseye",
      "fr": "Lanterne sourde"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 39,
    "priceDisplay": "39",
    "weight": "1",
    "size": "G",
    "effect": "Augmente la luminosité de 3m en un cône de 5 m.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-hand-mirror",
    "name": {
      "en": "Hand Mirror",
      "fr": "Miroir de poche"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 27,
    "priceDisplay": "27",
    "weight": "0.5",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-perfume",
    "name": {
      "en": "Perfume / Cologne",
      "fr": "Parfum"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 22,
    "priceDisplay": "22",
    "weight": "0.1",
    "size": "M",
    "effect": "+1 en Charisme et Séduction",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-flint-steel",
    "name": {
      "en": "Flint & Steel",
      "fr": "Pierre à briquet"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 6,
    "priceDisplay": "6",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-pipe",
    "name": {
      "en": "Pipe",
      "fr": "Pipe"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 19,
    "priceDisplay": "19",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-prosthetic-basic",
    "name": {
      "en": "Prosthetic, Basic",
      "fr": "Prothèse basique"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 50,
    "priceDisplay": "50",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-prosthetic-quality",
    "name": {
      "en": "Prosthetic, Quality",
      "fr": "Prothèse de qualité"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 100,
    "priceDisplay": "100",
    "weight": "1.5",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-hourglass",
    "name": {
      "en": "Hourglass (1 hour)",
      "fr": "Sablier (1 heure)"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 38,
    "priceDisplay": "38",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-hourglass-minute",
    "name": {
      "en": "Hourglass (1 minute)",
      "fr": "Sablier (1 minute)"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 18,
    "priceDisplay": "18",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-soap",
    "name": {
      "en": "Soap",
      "fr": "Savon"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 4,
    "priceDisplay": "4",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bedroll",
    "name": {
      "en": "Bedroll",
      "fr": "Sac de couchage"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 16,
    "priceDisplay": "16",
    "weight": "1.5",
    "size": "G",
    "effect": "",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-holy-symbol",
    "name": {
      "en": "Holy Symbol",
      "fr": "Symbole sacré"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "I",
    "price": 14,
    "priceDisplay": "14",
    "weight": "0.1",
    "size": "M",
    "effect": "",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-tobacco",
    "name": {
      "en": "Tobacco",
      "fr": "Tabac"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 4,
    "priceDisplay": "4",
    "weight": "0.1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-tent",
    "name": {
      "en": "Tent",
      "fr": "Tente"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 19,
    "priceDisplay": "19",
    "weight": "4",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-tent-large",
    "name": {
      "en": "Tent, Large",
      "fr": "Grande tente"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 36,
    "priceDisplay": "36",
    "weight": "8",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-leech-jar",
    "name": {
      "en": "Leech Jar",
      "fr": "Bocal à sangsues"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 25,
    "priceDisplay": "25",
    "weight": "0.1",
    "size": "P",
    "effect": "+3 en Résilience pour guérir poisson.",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-fake-crowns",
    "name": {
      "en": "100 Counterfeit Crowns",
      "fr": "100 fausses couronnes"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "I",
    "price": 10,
    "priceDisplay": "10",
    "weight": "0.1",
    "size": "M",
    "effect": "Vigilance/Négoce SD 15 pour voir que ce sont des fausses.",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-tapeworm-vial",
    "name": {
      "en": "Vial of Tapeworm Eggs",
      "fr": "Fiole d’œufs de ver solitaire"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 89,
    "priceDisplay": "89",
    "weight": "0.1",
    "size": "M",
    "effect": "Rend malade",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-carnival-mask",
    "name": {
      "en": "Carnival Mask",
      "fr": "Masque de carnaval"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 36,
    "priceDisplay": "36",
    "weight": "0.1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-plague-mask",
    "name": {
      "en": "Plague Doctor Mask",
      "fr": "Masque de médecin de la peste"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 38,
    "priceDisplay": "38",
    "weight": "0.1",
    "size": "G",
    "effect": "+3 en Résilience pour résister au maladie",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-muzzle",
    "name": {
      "en": "Muzzle",
      "fr": "Muselière"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "0.1",
    "size": "P",
    "effect": "Adresse/Physique SD 16 pour museler",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-bag-of-marbles",
    "name": {
      "en": "Bag of Marbles",
      "fr": "Sac de billes"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 18,
    "priceDisplay": "18",
    "weight": "0.1",
    "size": "M",
    "effect": "Trébuche en marchand dessus sur echec SD Athlétisme 14",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-compass",
    "name": {
      "en": "Compass",
      "fr": "Boussole"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 32,
    "priceDisplay": "32",
    "weight": "0.1",
    "size": "M",
    "effect": "+3 à Survie lors de la Navigation",
    "race": "Humain",
    "source": "Rosolf"
  },
  {
    "id": "eq-foghorn",
    "name": {
      "en": "Foghorn",
      "fr": "Corne de brume"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 30,
    "priceDisplay": "30",
    "weight": "0.1",
    "size": "G",
    "effect": "Se fait entendre à plusieurs kilométres",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-signal-whistle",
    "name": {
      "en": "Signal Whistle",
      "fr": "Sifflet d’alerte"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "P",
    "price": 6,
    "priceDisplay": "6",
    "weight": "0.1",
    "size": "M",
    "effect": "Se fait entendre à quelques dizaines de mètres",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-sunstone",
    "name": {
      "en": "Sunstone",
      "fr": "Pierre de soleil"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 5,
    "priceDisplay": "5",
    "weight": "1",
    "size": "M",
    "effect": "+2 en Survie lors de la navigation",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-witcher-medallion",
    "name": {
      "en": "Witcher Medallion",
      "fr": "Médaillon de sorceleur"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "R",
    "price": null,
    "priceDisplay": "0",
    "weight": "0.1",
    "size": "M",
    "effect": "Détecte les monstre et la magie à 20m.",
    "race": "Sorceleur",
    "source": "Base"
  },
  {
    "id": "eq-spyglass",
    "name": {
      "en": "Spyglass",
      "fr": "Longue-vue"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "C",
    "price": 12,
    "priceDisplay": "12",
    "weight": "0.5",
    "size": "P",
    "effect": "+2 en Navigation",
    "race": "Humain",
    "source": "Fan Made"
  },
  {
    "id": "eq-purse",
    "name": {
      "en": "Coin Purse",
      "fr": "Bourse"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 7,
    "priceDisplay": "7",
    "weight": "0.1",
    "size": "M",
    "effect": "peut contenir jusqu'à 5 kilos.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bandolier",
    "name": {
      "en": "Bandolier",
      "fr": "Bandoulière"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "I",
    "price": 19,
    "priceDisplay": "19",
    "weight": "1",
    "size": "G",
    "effect": "Peut contenir 25 kg de petits objets.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-wooden-chest",
    "name": {
      "en": "Wooden Chest",
      "fr": "Coffre en bois"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 18,
    "priceDisplay": "18",
    "weight": "1",
    "size": "G",
    "effect": "Peut contenir 30 kg de petits objets",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-wooden-chest-large",
    "name": {
      "en": "Wooden Chest, Large",
      "fr": "Coffre en bois, grand"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 30,
    "priceDisplay": "30",
    "weight": "10",
    "size": "-",
    "effect": "Peut contenir 50 kg de grands objets.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bow-sheath",
    "name": {
      "en": "Bow Case / Quiver",
      "fr": "Fourreau d’arc"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "C",
    "price": 24,
    "priceDisplay": "24",
    "weight": "1.5",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-garter-sheath",
    "name": {
      "en": "Garter Sheath",
      "fr": "Fourreau de jarretière"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "C",
    "price": 11,
    "priceDisplay": "11",
    "weight": "0.1",
    "size": "M",
    "effect": "Cache arme, Vigilance SD18 pour le voir",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-sleeve-sheath",
    "name": {
      "en": "Sleeve Sheath",
      "fr": "Fourreau de manche"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "C",
    "price": 13,
    "priceDisplay": "13",
    "weight": "0.1",
    "size": "M",
    "effect": "Cache arme, Vigilance SD15 pour le voir",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-basket",
    "name": {
      "en": "Basket",
      "fr": "Panier"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "0.5",
    "size": "G",
    "effect": "Peut contenir 15 kg de petits objets.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-secret-pocket",
    "name": {
      "en": "Secret Pocket",
      "fr": "Poche secrète"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "C",
    "price": 11,
    "priceDisplay": "11",
    "weight": "0.1",
    "size": "M",
    "effect": "Peut contenir 5 kg de petits objets. Vigilance SD 16 pour la voir.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-sack",
    "name": {
      "en": "Sack",
      "fr": "Sac"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 3,
    "priceDisplay": "3",
    "weight": "0.1",
    "size": "P",
    "effect": "Peut contenir 20 kg de petits objets.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-satchel",
    "name": {
      "en": "Satchel",
      "fr": "Sacoche"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 14,
    "priceDisplay": "14",
    "weight": "1",
    "size": "G",
    "effect": "peut contenir 30 kg de petits objets.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-smugglers-cloak",
    "name": {
      "en": "Cloak with Secret Pockets",
      "fr": "Cape à poches secrètes"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "C",
    "price": 60,
    "priceDisplay": "60",
    "weight": "2.5",
    "size": "G",
    "effect": "Contient 6 poches secrètes",
    "race": "Humain",
    "source": "S&F"
  },
  {
    "id": "eq-waterskin",
    "name": {
      "en": "Waterskin",
      "fr": "Gourde"
    },
    "category": "Contenants",
    "shopKind": "container",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "1",
    "size": "P",
    "effect": "Peut contenir 1L de liquide",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-ration-de-survie",
    "name": {
      "en": "Travel Rations",
      "fr": "Ration de survie"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 5,
    "priceDisplay": "5",
    "weight": "0.5",
    "size": "M",
    "effect": "Un repas longue conservation",
    "race": "Humain",
    "source": "Rodolf"
  },
  {
    "id": "eq-repas-simple",
    "name": {
      "en": "Simple Meal",
      "fr": "Repas simple"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bon-repas",
    "name": {
      "en": "Fine Meal",
      "fr": "Bon repas"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 30,
    "priceDisplay": "30",
    "weight": "2.5",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-festin",
    "name": {
      "en": "Feast",
      "fr": "Festin"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 100,
    "priceDisplay": "100",
    "weight": "5",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-confiseries",
    "name": {
      "en": "Sweets / Confections",
      "fr": "Confiseries"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 5,
    "priceDisplay": "5",
    "weight": "1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-viande-crue",
    "name": {
      "en": "Raw Meat",
      "fr": "Viande crue"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-alcahest",
    "name": {
      "en": "Alcohest",
      "fr": "Alcahest"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "1",
    "size": "P",
    "effect": "Poison ( Voir desc )",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-biere",
    "name": {
      "en": "Beer / Ale",
      "fr": "Bière"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 5,
    "priceDisplay": "5",
    "weight": "1",
    "size": "M",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-liqueur",
    "name": {
      "en": "Spirits / Liquor",
      "fr": "Liqueur"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-vin",
    "name": {
      "en": "Wine",
      "fr": "Vin"
    },
    "category": "Nourritures",
    "shopKind": "food",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "1",
    "size": "P",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-jewelry",
    "name": {
      "en": "Jewelry",
      "fr": "Bijoux"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "P",
    "price": 50,
    "priceDisplay": "50",
    "weight": "0.5",
    "size": "M",
    "effect": "+1 en Séduction",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-basic-clothing",
    "name": {
      "en": "Basic Clothing",
      "fr": "Vêtements basiques"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "2",
    "size": "G",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-fashionable-clothing",
    "name": {
      "en": "Fashionable Clothing",
      "fr": "Vêtements à la mode"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "P",
    "price": 70,
    "priceDisplay": "70",
    "weight": "2",
    "size": "G",
    "effect": "+1 en Stylisme dans les grandes villes",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-warm-clothing",
    "name": {
      "en": "Cold Weather Clothing",
      "fr": "Vêtements chauds"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "P",
    "price": 45,
    "priceDisplay": "45",
    "weight": "3",
    "size": "93",
    "effect": "+5 en Résilience contre le froid",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-rogues-clothing",
    "name": {
      "en": "Rogue’s Clothing",
      "fr": "Vêtements de voleur"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "C",
    "price": 50,
    "priceDisplay": "50",
    "weight": "1.5",
    "size": "G",
    "effect": "+1 en Furtivité la nuit",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-docteur",
    "name": {
      "en": "Physician / Doctor",
      "fr": "Docteur"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 50,
    "priceDisplay": "50",
    "weight": "0",
    "size": "-",
    "effect": "Guéri les blessures ( Voir Desc )",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-bain",
    "name": {
      "en": "Bath",
      "fr": "Bain"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "0",
    "size": "-",
    "effect": "Froid (8) ou Chaud (16)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-artisan",
    "name": {
      "en": "Craftsman Service",
      "fr": "Artisan"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 35,
    "priceDisplay": "35",
    "weight": "0",
    "size": "-",
    "effect": "Réparation ( coût par pièce )",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-blanchisserie",
    "name": {
      "en": "Laundry",
      "fr": "Blanchisserie"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chroniqueur",
    "name": {
      "en": "Scribe / Chronicler",
      "fr": "Chroniqueur"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 25,
    "priceDisplay": "25",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-transport",
    "name": {
      "en": "Passage / Transport",
      "fr": "Transport"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 85,
    "priceDisplay": "85",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-divertissement",
    "name": {
      "en": "Entertainment",
      "fr": "Divertissement"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "0",
    "size": "-",
    "effect": "prix à l'heure",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-droits-de-peage",
    "name": {
      "en": "Road / Gate Toll",
      "fr": "Droits de péage"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 10,
    "priceDisplay": "10",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enqueteur",
    "name": {
      "en": "Investigator",
      "fr": "Enquêteur"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 45,
    "priceDisplay": "45",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-juriste",
    "name": {
      "en": "Lawyer / Advocate",
      "fr": "Juriste"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 50,
    "priceDisplay": "50",
    "weight": "0",
    "size": "-",
    "effect": "-",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-location-de-cheval",
    "name": {
      "en": "Horse Rental",
      "fr": "Location de cheval"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 50,
    "priceDisplay": "50",
    "weight": "0",
    "size": "-",
    "effect": "Prix par jour",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-prostitue-e",
    "name": {
      "en": "Courtesan",
      "fr": "Prostitué(e)"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 12,
    "priceDisplay": "12",
    "weight": "0",
    "size": "-",
    "effect": "Prix à l'heure",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-receleur",
    "name": {
      "en": "Fence",
      "fr": "Receleur"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 0,
    "priceDisplay": "0",
    "weight": "0",
    "size": "-",
    "effect": "1/4 du prix d'achat.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-serviteur",
    "name": {
      "en": "Servant",
      "fr": "Serviteur"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 15,
    "priceDisplay": "15",
    "weight": "0",
    "size": "-",
    "effect": "Prix par jour",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-messager",
    "name": {
      "en": "Messenger",
      "fr": "Messager"
    },
    "category": "Services",
    "shopKind": "service",
    "availability": "P",
    "price": 15,
    "priceDisplay": "15",
    "weight": "0",
    "size": "-",
    "effect": "Prix à la journée de voyage.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-paillasse-au-sol",
    "name": {
      "en": "Straw Bedding (Floor)",
      "fr": "Paillasse au sol"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "P",
    "price": 2,
    "priceDisplay": "2",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chambre-d-auberge-douteuse",
    "name": {
      "en": "Infamous Inn Room",
      "fr": "Chambre d’auberge douteuse"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "P",
    "price": 4,
    "priceDisplay": "4",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chambre-d-auberge-bon-marche",
    "name": {
      "en": "Cheap Inn Room",
      "fr": "Chambre d’auberge bon marché"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "P",
    "price": 8,
    "priceDisplay": "8",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chambre-d-auberge-correcte",
    "name": {
      "en": "Medium Inn Room",
      "fr": "Chambre d’auberge correcte"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "C",
    "price": 16,
    "priceDisplay": "16",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit. (SD 15 pour le Crochetage de la porte)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chambre-d-auberge-de-qualite",
    "name": {
      "en": "Standard Inn Room",
      "fr": "Chambre d’auberge de qualité"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "C",
    "price": 36,
    "priceDisplay": "36",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit. (SD 15 pour le Crochetage de la porte)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-chambre-d-auberge-de-luxe",
    "name": {
      "en": "High-Class Inn Room",
      "fr": "Chambre d’auberge de luxe"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "I",
    "price": 72,
    "priceDisplay": "72",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit. (SD 18 pour le Crochetage de la porte)",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-box-d-ecurie",
    "name": {
      "en": "Stable Stall",
      "fr": "Box d’écurie"
    },
    "category": "Logements",
    "shopKind": "lodging",
    "availability": "P",
    "price": 2,
    "priceDisplay": "2",
    "weight": "0",
    "size": "-",
    "effect": "Prix par nuit",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-cavalry-saddle",
    "name": {
      "en": "Cavalry Saddle",
      "fr": "Selle de cavalerie"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "I",
    "price": 325,
    "priceDisplay": "325",
    "weight": "6",
    "size": "-",
    "effect": "Fourreau arme intégré, +1 jet de contrôle à l'attaque.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-racing-saddle",
    "name": {
      "en": "Racing Saddle",
      "fr": "Selle de course"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "C",
    "price": 200,
    "priceDisplay": "200",
    "weight": "3",
    "size": "-",
    "effect": "+1 jet de contrôle en équitation, +1 VIT",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-saddle",
    "name": {
      "en": "Saddle",
      "fr": "Selle"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "P",
    "price": 100,
    "priceDisplay": "100",
    "weight": "5",
    "size": "-",
    "effect": "Pas de pénalité en Équitation",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-blinders",
    "name": {
      "en": "Blinders",
      "fr": "Œillères"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "P",
    "price": 100,
    "priceDisplay": "100",
    "weight": "0.1",
    "size": "-",
    "effect": "+1 pour calmer la monture",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-racing-blinders",
    "name": {
      "en": "Racing Blinders",
      "fr": "Œillères de course"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "C",
    "price": 125,
    "priceDisplay": "125",
    "weight": "0.1",
    "size": "-",
    "effect": "+2 pour calmer la monture",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-saddlebags",
    "name": {
      "en": "Saddlebags",
      "fr": "Sacoches de selle"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "P",
    "price": 100,
    "priceDisplay": "100",
    "weight": "1.5",
    "size": "-",
    "effect": "+25 kilos de petits objets",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-military-saddlebags",
    "name": {
      "en": "Military Saddlebags",
      "fr": "Sacoches militaires"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "I",
    "price": 150,
    "priceDisplay": "150",
    "weight": "2",
    "size": "-",
    "effect": "+50 kilos de petits objets + 6 grand objet.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-leather-barding",
    "name": {
      "en": "Leather Barding",
      "fr": "Barde de cuir"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "I",
    "price": 550,
    "priceDisplay": "550",
    "weight": "10",
    "size": "-",
    "effect": "PA: 10 pour toute la monture",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-mail-barding",
    "name": {
      "en": "Chainmail Barding",
      "fr": "Barde de mailles"
    },
    "category": "Montures",
    "shopKind": "mountGear",
    "availability": "R",
    "price": 1050,
    "priceDisplay": "1050",
    "weight": "25",
    "size": "-",
    "effect": "PA: 15 pour toute la monture, -1 contrôle",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-world-map-standard",
    "name": {
      "en": "Map of the World",
      "fr": "Carte du Monde"
    },
    "category": "Général",
    "shopKind": "tool",
    "availability": "P",
    "price": 18,
    "priceDisplay": "18",
    "weight": "0.1",
    "effect": "Carte du Continent et des royaumes connus.",
    "urbanOnly": "fortress-map"
  },
  {
    "id": "eq-elegant-clothing",
    "name": {
      "en": "Elegant Clothing",
      "fr": "Vêtements élégants"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "C",
    "price": 55,
    "priceDisplay": "55",
    "weight": "1",
    "effect": "Tenue de cour ou vêtements de qualité.",
    "urbanOnly": "tailor-extra"
  },
  {
    "id": "eq-enh-steel",
    "name": {
      "en": "Armor Enhancement: Steel",
      "fr": "Amélioration d’armure : Acier"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "I",
    "price": 145,
    "priceDisplay": "145",
    "weight": "3.5",
    "size": "-",
    "effect": "+4 PA ; résistance aux dégâts tranchants et perforants.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-chainmail",
    "name": {
      "en": "Armor Enhancement: Chainmail",
      "fr": "Amélioration d’armure : Cotte de mailles"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "I",
    "price": 125,
    "priceDisplay": "125",
    "weight": "3",
    "size": "-",
    "effect": "+3 PA ; résistance aux dégâts contondants et tranchants.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-studded-leather",
    "name": {
      "en": "Armor Enhancement: Studded Leather",
      "fr": "Amélioration d’armure : Cuir clouté"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "C",
    "price": 80,
    "priceDisplay": "80",
    "weight": "1",
    "size": "-",
    "effect": "+2 PA ; résistance aux dégâts tranchants.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-reinforced-leather",
    "name": {
      "en": "Armor Enhancement: Reinforced Leather",
      "fr": "Amélioration d’armure : Cuir renforcé"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "C",
    "price": 130,
    "priceDisplay": "130",
    "weight": "1.5",
    "size": "-",
    "effect": "+2 PA ; résistance au feu, contondant et tranchant.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-elven",
    "name": {
      "en": "Armor Enhancement: Elven",
      "fr": "Amélioration d’armure : Elfe"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "R",
    "price": 200,
    "priceDisplay": "200",
    "weight": "0.5",
    "size": "-",
    "effect": "+3 PA ; +1 en Furtivité ; résistance aux dégâts contondants et tranchants.",
    "race": "Non Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-fibers",
    "name": {
      "en": "Armor Enhancement: Fibers",
      "fr": "Amélioration d’armure : Fibres"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "P",
    "price": 40,
    "priceDisplay": "40",
    "weight": "0.5",
    "size": "-",
    "effect": "+1 PA ; résistance au saignement.",
    "race": "Humain",
    "source": "Base"
  },
  {
    "id": "eq-enh-dwarven",
    "name": {
      "en": "Armor Enhancement: Dwarven",
      "fr": "Amélioration d’armure : Nain(e)"
    },
    "category": "Amélioration d'armure",
    "shopKind": "general",
    "availability": "R",
    "price": 195,
    "priceDisplay": "195",
    "weight": "3.5",
    "size": "-",
    "effect": "+5 PA ; résistance aux dégâts tranchants et perforants.",
    "race": "Non Humain",
    "source": "Base"
  },
  {
    "id": "eq-gold-plating",
    "name": {
      "en": "Gold Plating",
      "fr": "Placage doré"
    },
    "category": "Général",
    "shopKind": "general",
    "availability": "I",
    "price": 100,
    "priceDisplay": "100",
    "weight": "0.5",
    "size": "-",
    "effect": "Offre un bonus de +1 en Réputation sur une arme ou armure (non cumulable).",
    "race": "Humain",
    "source": "Seigneur & Fiefs"
  },
  {
    "id": "eq-bot-plague-mask",
    "name": {
      "en": "Plague Mask (Toussaint)",
      "fr": "Masque contre la peste"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "R",
    "price": 400,
    "priceDisplay": "400",
    "weight": "0.5",
    "size": "P",
    "effect": "Bonus de +3 en Endurance pour résister aux maladies aéroportées, poisons et nausées.",
    "race": "Humain",
    "source": "Book of Tales"
  },
  {
    "id": "eq-ice-skates",
    "name": {
      "en": "Ice Skates",
      "fr": "Patins à glace"
    },
    "category": "Vêtements",
    "shopKind": "clothing",
    "availability": "C",
    "price": 100,
    "priceDisplay": "100",
    "weight": "1",
    "size": "P",
    "effect": "Ignore les effets de Neige et Glace ; compte comme une monture (VIT 12, Mod. Contrôle +2, sans charge ni percussion).",
    "race": "Humain",
    "source": "Book of Tales"
  },
  {
    "id": "eq-goetia-goat-mantle",
    "name": {
      "en": "Goat Skin Mantle",
      "fr": "Manteau en peau de chèvre"
    },
    "category": "Outils de goétie",
    "shopKind": "general",
    "availability": "R",
    "price": 800,
    "priceDisplay": "800",
    "weight": "0.5",
    "size": "M",
    "effect": "Protège l’invocateur des réactions immédiates des Bes, Casglydd et Mari Lwyd lors d’une invocation contrôlée.",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "eq-goetia-earthly-ribbons",
    "name": {
      "en": "Earthly Ribbons",
      "fr": "Rubans terrestres"
    },
    "category": "Outils de goétie",
    "shopKind": "general",
    "availability": "R",
    "price": 1352,
    "priceDisplay": "1352",
    "weight": "0.1",
    "size": "P",
    "effect": "Rubans de soie runiques empêchant un Mari Lwyd de changer de forme pendant 1 an.",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "eq-goetia-centerpiece",
    "name": {
      "en": "Centerpiece",
      "fr": "Pièce maîtresse"
    },
    "category": "Outils de goétie",
    "shopKind": "general",
    "availability": "R",
    "price": null,
    "priceDisplay": "700+",
    "weight": "N/A",
    "size": "M",
    "effect": "Objet unique complexe offert à un Casglydd pour capter sa fascination et l’empêcher de se lier à vous.",
    "race": "Humain",
    "source": "Tome of Chaos"
  },
  {
    "id": "eq-goetia-wand-banishment",
    "name": {
      "en": "Wand of Banishment",
      "fr": "Baguette de bannissement"
    },
    "category": "Outils de goétie",
    "shopKind": "tool",
    "availability": "R",
    "price": 800,
    "priceDisplay": "800",
    "weight": "0.5",
    "size": "P",
    "effect": "Une attaque de mêlée réussie bannit le démon nommé pour 24 heures (50 % de risque de rupture ; 100 % contre un démon majeur).",
    "race": "Humain",
    "source": "Tome of Chaos"
  }
];
