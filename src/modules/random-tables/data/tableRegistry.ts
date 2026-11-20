import type { RandomTableId, RandomTableMeta } from '../types';

/**
 * Registry of all 26 GM random tables, grouped by narrative domain.
 * Ordering follows logical workflow while preserving exact legacy IDs (1..26).
 */
export const RANDOM_TABLES_REGISTRY: readonly RandomTableMeta[] = [
  // Locations & Dungeons
  {
    id: 1,
    group: 'locations',
    title: {
      en: 'Random Inns and Taverns',
      fr: 'Auberges et tavernes aléatoires',
    },
    subtitle: {
      en: 'Establishment type, comfort tier, innkeeper, and memorable quirk',
      fr: 'Type d’établissement, niveau de confort, tavernier et particularité',
    },
    kind: 'structured',
    attribution: {
      author: 'Spell Theory',
      url: 'https://www.spelltheory.online/random-tavern-generator/',
    },
  },
  {
    id: 2,
    group: 'locations',
    title: {
      en: 'Random Dungeon Traps and Hazards',
      fr: 'Pièges et dangers de donjon',
    },
    subtitle: {
      en: '33 mechanical, alchemical, and architectural dungeon hazards',
      fr: '33 pièges mécaniques, alchimiques et architecturaux',
    },
    kind: 'single',
    attribution: {
      author: 'DnD Speak',
      url: 'https://www.reddit.com/r/d100/comments/h7qa9m/lets_build_dungeon_traps_and_hazards/',
    },
  },
  {
    id: 5,
    group: 'locations',
    title: {
      en: 'Dicing for Dungeons',
      fr: 'Générateur de donjons',
    },
    subtitle: {
      en: 'Entrance, traps, corridors, obstacles, and central objective',
      fr: 'Entrée, pièges, couloirs, obstacles et objectif principal',
    },
    kind: 'structured',
    attribution: {
      author: 'famoushippopotamus',
      url: 'https://www.reddit.com/r/DnDBehindTheScreen/comments/5i3bvt/dicing_for_dungeons/',
    },
  },
  {
    id: 21,
    group: 'locations',
    title: {
      en: 'Unique Dungeons',
      fr: 'Donjons uniques',
    },
    subtitle: {
      en: '100 high-concept dungeon premises and supernatural twists',
      fr: '100 concepts de donjons atypiques et environnements surnaturels',
    },
    kind: 'single',
    attribution: {
      author: 'Reddit r/d100',
      url: 'https://www.reddit.com/r/d100/comments/j6h387/lets_build_1d100_unique_dungeons/',
    },
  },
  {
    id: 6,
    group: 'locations',
    title: {
      en: 'Dicing for Swamps',
      fr: 'Générateur de marais',
    },
    subtitle: {
      en: 'Swamp hazards, treasure, plot hooks, NPCs, and landmarks',
      fr: 'Dangers, trésors, intrigues, PNJ et lieux en zone marécageuse',
    },
    kind: 'structured',
    attribution: {
      author: 'famoushippopotamus',
      url: 'https://www.reddit.com/r/DnDBehindTheScreen/comments/5l0hea/dicing_for_swamps/',
    },
  },
  {
    id: 7,
    group: 'locations',
    title: {
      en: 'Dicing for Forests',
      fr: 'Générateur de forêts',
    },
    subtitle: {
      en: 'Woodland hazards, treasure, plot hooks, NPCs, and landmarks',
      fr: 'Dangers, trésors, intrigues, PNJ et lieux en milieu forestier',
    },
    kind: 'structured',
    attribution: {
      author: 'Quincy0807',
      url: 'https://www.reddit.com/r/DnDBehindTheScreen/comments/hw8a35/dicing_for_forests/',
    },
  },

  // Quests & Contracts
  {
    id: 3,
    group: 'quests',
    title: {
      en: 'Plot Hooks for Small Towns & Villages',
      fr: 'Accroches d’intrigues pour villages et hameaux',
    },
    subtitle: {
      en: '15 self-contained rural mysteries and local crises',
      fr: '15 mystères ruraux et crises locales prêts à jouer',
    },
    kind: 'titled',
    attribution: {
      author: 'Spell Theory',
      url: 'https://www.spelltheory.online/village-plot-hooks/',
    },
  },
  {
    id: 4,
    group: 'quests',
    title: {
      en: 'Quests During a Siege',
      fr: 'Quêtes lors d’un siège',
    },
    subtitle: {
      en: '94 urgent missions for a party defending a besieged city',
      fr: '94 missions urgentes pour un groupe défendant une ville assiégée',
    },
    kind: 'single',
    attribution: {
      author: 'Reddit r/d100',
      url: 'https://www.reddit.com/r/d100/comments/i2liev/d100_quests_given_to_a_party_defending_in_a_siege/',
    },
  },
  {
    id: 9,
    group: 'quests',
    title: {
      en: 'Random Witcher Contract',
      fr: 'Contrat de sorceleur aléatoire',
    },
    subtitle: {
      en: 'Monster category, difficulty, location, twist, employer, and pay',
      fr: 'Catégorie de monstre, difficulté, lieu, retournement, employeur et paie',
    },
    kind: 'structured',
    attribution: {
      author: 'Schism 989',
      url: 'https://www.reddit.com/r/WitcherTRPG/comments/gslrad/random_contract_generator/',
    },
  },

  // NPCs & Lifepaths
  {
    id: 10,
    group: 'npcs',
    title: {
      en: "Basic NPC's Lifepath",
      fr: 'Historique de PNJ basique',
    },
    subtitle: {
      en: 'Quick race, age, personality, standing, romance, and secret',
      fr: 'Race, âge, personnalité, classe sociale, romance et secret',
    },
    kind: 'structured',
    attribution: {
      author: 'R. Talsorian Games — The Witcher TRPG',
    },
  },
  {
    id: 11,
    group: 'npcs',
    title: {
      en: "Advanced NPC's Lifepath",
      fr: 'Historique de PNJ avancé',
    },
    subtitle: {
      en: 'Homeland, family fate, style, and personal values',
      fr: 'Origine, destin familial, style vestimentaire et valeurs',
    },
    kind: 'structured',
    attribution: {
      author: 'R. Talsorian Games — The Witcher TRPG',
    },
  },
  {
    id: 12,
    group: 'npcs',
    title: {
      en: "Witcher's Lifepath",
      fr: 'Historique de sorceleur',
    },
    subtitle: {
      en: 'School, early training, Trials outcome, defining event, and present',
      fr: 'École, entraînement, Épreuve des Herbes, événement majeur et présent',
    },
    kind: 'structured',
    attribution: {
      author: 'R. Talsorian Games — The Witcher TRPG',
    },
  },
  {
    id: 20,
    group: 'npcs',
    title: {
      en: 'Somewhat Simple NPC Quirks',
      fr: 'Manies et particularités de PNJ',
    },
    subtitle: {
      en: '100 distinctive behavioral traits, habits, and secrets',
      fr: '100 traits comportementaux, habitudes et secrets distinctifs',
    },
    kind: 'titled',
    attribution: {
      author: 'u/JediCapitalist',
      url: 'https://www.reddit.com/r/d100/comments/j9pxsc/d100_somewhat_simple_npc_quirks/',
    },
  },
  {
    id: 22,
    group: 'npcs',
    title: {
      en: 'Unique Visual Features for Characters',
      fr: 'Traits visuels uniques de personnage',
    },
    subtitle: {
      en: '50 memorable physical marks, scars, and silhouette cues',
      fr: '50 marques physiques, cicatrices et détails visuels mémorables',
    },
    kind: 'single',
    attribution: {
      author: 'u/edog813',
      url: 'https://www.reddit.com/r/d100/comments/il6314/a_d100_table_of_unique_visual_features_for/',
    },
  },
  {
    id: 26,
    group: 'npcs',
    title: {
      en: 'Detailed NPC Physical & Vocal Profile',
      fr: 'Portrait physique & vocal détaillé (PNJ)',
    },
    subtitle: {
      en: 'Weighted 35-trait anatomy, expression, voice, and habit generator',
      fr: 'Générateur pondéré complet : morphologie, visage, voix, habitudes',
    },
    kind: 'morphology',
    attribution: {
      author: 'Formol / Alexis Baugas',
      url: 'https://www.black-book-editions.fr/forums.php?a=last&topic_id=13792',
    },
  },

  // Travel & Encounters
  {
    id: 13,
    group: 'encounters',
    title: {
      en: 'Non-combat Wilderness Encounters',
      fr: 'Rencontres hors combat en pleine nature',
    },
    subtitle: {
      en: '64 atmospheric sightings, discoveries, and roadside curiosities',
      fr: '64 scènes atmosphériques, découvertes et curiosités sauvages',
    },
    kind: 'single',
    attribution: {
      author: 'HopelessPope',
      url: 'https://www.reddit.com/r/d100/comments/hez6yy/lets_build_d100_noncombat_wilderness_encounters/',
    },
  },
  {
    id: 14,
    group: 'encounters',
    title: {
      en: 'Non-combat City Encounters',
      fr: 'Rencontres hors combat en ville',
    },
    subtitle: {
      en: '77 street incidents, urban rumors, and alleyway scenes',
      fr: '77 incidents de rue, rumeurs urbaines et scènes de quartier',
    },
    kind: 'single',
    attribution: {
      author: 'Reddit r/d100',
      url: 'https://www.reddit.com/r/d100/comments/hdptb5/lets_build_d100_noncombat_city_encounters/',
    },
  },
  {
    id: 15,
    group: 'encounters',
    title: {
      en: 'Non-combat Encounters While Travelling',
      fr: 'Rencontres hors combat entre villes et villages',
    },
    subtitle: {
      en: '119 roadside events between settlements',
      fr: '119 événements sur les routes entre agglomérations',
    },
    kind: 'single',
    attribution: {
      author: 'Reddit r/d100',
      url: 'https://www.reddit.com/r/d100/comments/gxtn40/d100_random_noncombat_encounters_while_travelling/',
    },
  },
  {
    id: 16,
    group: 'encounters',
    title: {
      en: 'Non-combat Encounters for a Small Town or Village',
      fr: 'Rencontres hors combat en village ou bourgade',
    },
    subtitle: {
      en: '44 everyday crises and arrivals in rural communities',
      fr: '44 péripéties et visiteurs dans une petite communauté rurale',
    },
    kind: 'single',
    attribution: {
      author: 'lumo19',
      url: 'https://www.reddit.com/r/d100/comments/ekjbrt/lets_build_100_combat_and_noncombat_encounters/',
    },
  },
  {
    id: 17,
    group: 'encounters',
    title: {
      en: 'Non-combat Obstacles While Traveling',
      fr: 'Obstacles hors combat en voyage',
    },
    subtitle: {
      en: '29 natural, social, and strange roadblocks',
      fr: '29 obstacles naturels, sociaux ou insolites sur le trajet',
    },
    kind: 'single',
    attribution: {
      author: 'Rhedkiex',
      url: 'https://www.reddit.com/r/d100/comments/dgjyjq/lets_build_d100_noncombat_obstacles_to_encounter/',
    },
  },
  {
    id: 23,
    group: 'encounters',
    title: {
      en: 'Travelers You Meet On The Road',
      fr: 'Voyageurs croisés sur la route',
    },
    subtitle: {
      en: '100 distinctive travelers, pilgrims, peddlers, and wayfarers',
      fr: '100 voyageurs, pèlerins, colporteurs et errants mémorables',
    },
    kind: 'single',
    attribution: {
      author: 'DnD Speak',
      url: 'http://dndspeak.com/2020/08/100-travelers-you-meet-on-the-road/',
    },
  },
  {
    id: 24,
    group: 'encounters',
    title: {
      en: 'Mushrooms And Their Effects',
      fr: 'Champignons et leurs effets',
    },
    subtitle: {
      en: 'External reference archive on DnD Speak',
      fr: 'Table de référence externe sur DnD Speak',
    },
    kind: 'external',
    attribution: {
      author: 'DnD Speak',
      url: 'http://dndspeak.com/2020/08/100-mushrooms-and-their-effects/',
    },
  },

  // Merchants & Loot
  {
    id: 8,
    group: 'merchants',
    title: {
      en: 'Random Possessions',
      fr: 'Possessions aléatoires',
    },
    subtitle: {
      en: 'Rolls 1d10 pocket items across Ordinary, Strange, and Occult tiers',
      fr: 'Tire 1d10 objets de poche (Ordinaire, Étrange et Occulte)',
    },
    kind: 'possessions',
    attribution: {
      author: 'R. Talsorian Games — The Witcher TRPG',
    },
  },
  {
    id: 18,
    group: 'merchants',
    title: {
      en: 'Weird Merchants in the Grand Bazaar',
      fr: 'Marchands étranges du Grand Bazar',
    },
    subtitle: {
      en: '100 surreal, eccentric, and uncanny shopkeepers',
      fr: '100 vendeurs insolites, excentriques et surnaturels',
    },
    kind: 'single',
    attribution: {
      author: 'The Latest Enemy',
      url: 'https://thelatestenemy.blogspot.com/2020/10/funday-sunday-1d100-weird-merchants-in.html',
    },
  },
  {
    id: 19,
    group: 'merchants',
    title: {
      en: 'Merchants',
      fr: 'Marchands',
    },
    subtitle: {
      en: '101 grounded shopkeepers with motives, secrets, and hooks',
      fr: '101 commerçants avec motivations, secrets et accroches',
    },
    kind: 'single',
    attribution: {
      author: 'Reddit r/DnDBehindTheScreen',
      url: 'https://www.reddit.com/r/DnDBehindTheScreen/comments/jwouji/100_merchants_ready_to_use/',
    },
  },
  {
    id: 25,
    group: 'merchants',
    title: {
      en: 'Peasant Treasures',
      fr: 'Trésors de paysans',
    },
    subtitle: {
      en: '100 humble heirlooms, keepsakes, and folk curiosities',
      fr: '100 babioles modestes, souvenirs de famille et curiosités rurales',
    },
    kind: 'single',
    attribution: {
      author: 'u/Th3R3493r',
      url: 'https://www.reddit.com/r/d100/comments/gucm2n/peasant_treasures/',
    },
  },
] as const;

const TABLE_MAP = new Map<RandomTableId, RandomTableMeta>(
  RANDOM_TABLES_REGISTRY.map((meta) => [meta.id, meta])
);

export function getTableMeta(id: RandomTableId): RandomTableMeta {
  const found = TABLE_MAP.get(id);
  if (!found) {
    throw new Error(`Unknown random table id: ${id}`);
  }
  return found;
}
