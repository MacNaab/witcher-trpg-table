import type {
  BilingualLabel,
  BuildingBounds,
  BuildingTypeId,
  EnvironmentDefinition,
  EnvironmentId,
} from '../types';
import type { InnQualityKey } from './innNames';

/**
 * The 4 settlement environment configurations matching The Witcher TRPG urban tiers.
 */
export const ENVIRONMENTS: readonly EnvironmentDefinition[] = [
  {
    id: 0,
    key: 'capital',
    name: { en: 'Capital', fr: 'Capitale' },
    allowedBuildings: [
      'Alchemist',
      'Armorer_standard',
      'Notice_board',
      'General_shop',
      'Bookshop',
      'Inn_straw_bedding',
      'Inn_stables',
      'Inn_high_class',
      'Inn_standard_quality',
      'Inn_medium_quality',
      'Inn_cheap_quality',
      'Inn_infamous_quality',
      'Haberdashery',
      'Tailoring',
    ],
    availabilities: ['P', 'C', 'I', 'R'],
    craftTiers: ['novice', 'journeyman', 'master', 'grandmaster'],
  },
  {
    id: 1,
    key: 'city',
    name: { en: 'City', fr: 'Cité' },
    allowedBuildings: [
      'Alchemist',
      'Armorer_standard',
      'Notice_board',
      'General_shop',
      'Bookshop',
      'Inn_standard_quality',
      'Inn_medium_quality',
      'Inn_cheap_quality',
      'Inn_stables',
      'Inn_straw_bedding',
      'Haberdashery',
      'Tailoring',
    ],
    availabilities: ['P', 'C', 'I', 'R'],
    craftTiers: ['novice', 'journeyman', 'master'],
  },
  {
    id: 2,
    key: 'village',
    name: { en: 'Village', fr: 'Village' },
    allowedBuildings: [
      'Alchemist',
      'Armorer_village',
      'Notice_board',
      'General_shop',
      'Inn_cheap_quality',
      'Inn_infamous_quality',
      'Inn_stables',
      'Inn_straw_bedding',
      'Haberdashery',
    ],
    availabilities: ['P', 'C', 'I'],
    craftTiers: ['novice', 'journeyman'],
  },
  {
    id: 3,
    key: 'fortress',
    name: { en: 'Fortress', fr: 'Forteresse' },
    allowedBuildings: [
      'Alchemist',
      'Armorer_standard',
      'Notice_board',
      'General_shop',
      'Inn_cheap_quality',
      'Inn_stables',
    ],
    availabilities: ['P', 'C', 'I', 'R'],
    craftTiers: ['novice', 'journeyman', 'master'],
  },
] as const;

export const ENVIRONMENT_BY_ID: Record<EnvironmentId, EnvironmentDefinition> = {
  0: ENVIRONMENTS[0],
  1: ENVIRONMENTS[1],
  2: ENVIRONMENTS[2],
  3: ENVIRONMENTS[3],
};

/**
 * Min/max item counts per building for each environment [Capital, City, Village, Fortress].
 */
export const BUILDING_BOUNDS: Record<
  BuildingTypeId,
  Record<EnvironmentId, BuildingBounds>
> = {
  Alchemist: {
    0: { min: 10, max: 30 },
    1: { min: 5, max: 20 },
    2: { min: 1, max: 10 },
    3: { min: 1, max: 5 },
  },
  Armorer_standard: {
    0: { min: 5, max: 20 },
    1: { min: 3, max: 15 },
    2: { min: 0, max: 0 },
    3: { min: 10, max: 30 },
  },
  Armorer_village: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 1, max: 10 },
    3: { min: 0, max: 0 },
  },
  General_shop: {
    0: { min: 10, max: 30 },
    1: { min: 5, max: 20 },
    2: { min: 1, max: 10 },
    3: { min: 1, max: 5 },
  },
  Bookshop: {
    0: { min: 10, max: 30 },
    1: { min: 5, max: 20 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_straw_bedding: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_stables: {
    0: { min: 1, max: 5 },
    1: { min: 1, max: 3 },
    2: { min: 1, max: 1 },
    3: { min: 1, max: 3 },
  },
  Inn_high_class: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_standard_quality: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_medium_quality: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_cheap_quality: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Inn_infamous_quality: {
    0: { min: 0, max: 0 },
    1: { min: 0, max: 0 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Haberdashery: {
    0: { min: 10, max: 30 },
    1: { min: 5, max: 20 },
    2: { min: 3, max: 10 },
    3: { min: 0, max: 0 },
  },
  Tailoring: {
    0: { min: 3, max: 10 },
    1: { min: 1, max: 5 },
    2: { min: 0, max: 0 },
    3: { min: 0, max: 0 },
  },
  Notice_board: {
    0: { min: 1, max: 1 },
    1: { min: 1, max: 1 },
    2: { min: 1, max: 1 },
    3: { min: 1, max: 1 },
  },
};

/**
 * Stand-alone building selector options (excluding Armorer_village & Inn_straw_bedding
 * to match legacy UX where Armorer pulls full stock and Straw Bedding is part of Inns).
 */
export const STANDALONE_BUILDING_OPTIONS: readonly BuildingTypeId[] = [
  'Alchemist',
  'Armorer_standard',
  'General_shop',
  'Bookshop',
  'Inn_high_class',
  'Inn_standard_quality',
  'Inn_medium_quality',
  'Inn_cheap_quality',
  'Inn_infamous_quality',
  'Inn_stables',
  'Haberdashery',
  'Tailoring',
  'Notice_board',
] as const;

export interface FoodMenuItem {
  id: string;
  name: BilingualLabel;
  price: number;
}

const FOOD_CATALOG: Record<string, FoodMenuItem> = {
  good_meal: {
    id: 'food-good-meal',
    name: { en: 'Good Meal', fr: 'Bon Repas' },
    price: 30,
  },
  feast: {
    id: 'food-feast',
    name: { en: 'Feast', fr: 'Festin' },
    price: 100,
  },
  sweets: {
    id: 'food-sweets',
    name: { en: 'Sweets', fr: 'Confiseries' },
    price: 5,
  },
  liquor: {
    id: 'food-liquor',
    name: { en: 'Spirits / Liquor', fr: 'Liqueur' },
    price: 10,
  },
  beer: {
    id: 'food-beer',
    name: { en: 'Beer', fr: 'Bière' },
    price: 5,
  },
  wine: {
    id: 'food-wine',
    name: { en: 'Wine', fr: 'Vin' },
    price: 8,
  },
  alcohest: {
    id: 'food-alcohest',
    name: { en: 'Alcohest', fr: 'Alcohest' },
    price: 8,
  },
  simple_meal: {
    id: 'food-simple-meal',
    name: { en: 'Simple Meal', fr: 'Repas Simple' },
    price: 10,
  },
  raw_meat: {
    id: 'food-raw-meat',
    name: { en: 'Raw Meat', fr: 'Viande Crue' },
    price: 8,
  },
};

export interface InnProfile {
  menu: readonly FoodMenuItem[];
  roomPrice: number;
  roomDescription: BilingualLabel;
}

export const INN_PROFILES: Record<InnQualityKey, InnProfile> = {
  Inn_high_class: {
    menu: [
      FOOD_CATALOG.good_meal,
      FOOD_CATALOG.feast,
      FOOD_CATALOG.sweets,
      FOOD_CATALOG.liquor,
      FOOD_CATALOG.beer,
      FOOD_CATALOG.wine,
      FOOD_CATALOG.alcohest,
      FOOD_CATALOG.simple_meal,
      FOOD_CATALOG.raw_meat,
    ],
    roomPrice: 72,
    roomDescription: {
      en: 'High-Class Room (72 crowns/night · Pick Lock DC 18)',
      fr: 'Chambre de luxe (72 couronnes/nuit · Crochetage SD 18)',
    },
  },
  Inn_standard_quality: {
    menu: [
      FOOD_CATALOG.good_meal,
      FOOD_CATALOG.sweets,
      FOOD_CATALOG.liquor,
      FOOD_CATALOG.beer,
      FOOD_CATALOG.alcohest,
      FOOD_CATALOG.simple_meal,
      FOOD_CATALOG.raw_meat,
    ],
    roomPrice: 36,
    roomDescription: {
      en: 'Standard-Quality Room (36 crowns/night · Pick Lock DC 15)',
      fr: 'Chambre de qualité (36 couronnes/nuit · Crochetage SD 15)',
    },
  },
  Inn_medium_quality: {
    menu: [
      FOOD_CATALOG.liquor,
      FOOD_CATALOG.beer,
      FOOD_CATALOG.alcohest,
      FOOD_CATALOG.simple_meal,
      FOOD_CATALOG.raw_meat,
    ],
    roomPrice: 16,
    roomDescription: {
      en: 'Medium-Quality Room (16 crowns/night · Pick Lock DC 15)',
      fr: 'Chambre correcte (16 couronnes/nuit · Crochetage SD 15)',
    },
  },
  Inn_cheap_quality: {
    menu: [
      FOOD_CATALOG.beer,
      FOOD_CATALOG.alcohest,
      FOOD_CATALOG.simple_meal,
      FOOD_CATALOG.raw_meat,
    ],
    roomPrice: 8,
    roomDescription: {
      en: 'Cheap Room (8 crowns/night)',
      fr: 'Chambre bon marché (8 couronnes/nuit)',
    },
  },
  Inn_infamous_quality: {
    menu: [FOOD_CATALOG.beer, FOOD_CATALOG.alcohest, FOOD_CATALOG.simple_meal],
    roomPrice: 4,
    roomDescription: {
      en: 'Infamous Room (4 crowns/night)',
      fr: 'Chambre douteuse (4 couronnes/nuit)',
    },
  },
};

export const STRAW_BEDDING_LODGING = {
  id: 'lodging-straw-bedding',
  name: { en: 'Straw Bedding (Common Floor)', fr: 'Paillasse au sol' },
  price: 2,
};

export const STABLE_STALL_LODGING = {
  id: 'lodging-stable-stall',
  name: { en: 'Stable Stall', fr: 'Box d’écurie' },
  price: 2,
};

export const NOTICE_BOARD_CONTRACTS: readonly BilingualLabel[] = [
  { en: 'Contract: Bandits', fr: 'Contrat sur des bandits' },
  { en: 'Contract: Rogue Mage', fr: 'Contrat sur un Mage' },
  { en: 'Contract: Scoia’tael', fr: 'Contrat sur des Scoia’tael' },
  { en: 'Contract: Necrophage', fr: 'Contrat sur un Nécrophage' },
  { en: 'Contract: Specter', fr: 'Contrat sur un Spectre' },
  { en: 'Contract: Beast', fr: 'Contrat sur une Bête' },
  { en: 'Contract: Cursed One', fr: 'Contrat sur une Créature maudite' },
  { en: 'Contract: Hybrid', fr: 'Contrat sur un Hybride' },
  { en: 'Contract: Insectoid', fr: 'Contrat sur un Insectoïde' },
  { en: 'Contract: Elemental', fr: 'Contrat sur un Élémentaire' },
  { en: 'Contract: Relict', fr: 'Contrat sur un Vestige' },
  { en: 'Contract: Draconid', fr: 'Contrat sur un Draconide' },
  { en: 'Contract: Vampire', fr: 'Contrat sur un Vampire' },
];
