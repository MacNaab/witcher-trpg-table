import {
  ALCHEMY_ARTICLES,
  ALCHEMY_FORMULAS,
  CRAFTING_COMPONENTS,
  CRAFTING_DIAGRAMS,
  TAILORING_BASE_MATERIALS,
} from '../data/alchemyAndCraftingCatalog';
import { BOOKSHOP_BOOKS } from '../data/booksCatalog';
import {
  BUILDING_BOUNDS,
  ENVIRONMENT_BY_ID,
  INN_PROFILES,
  NOTICE_BOARD_CONTRACTS,
  STABLE_STALL_LODGING,
  STRAW_BEDDING_LODGING,
} from '../data/environmentsData';
import {
  ARMORS_CATALOG,
  FORTRESS_WORLD_MAP_ITEM,
  GENERAL_EQUIPMENT_ITEMS,
  TAILOR_EXTRA_CLOTHING,
  WEAPONS_CATALOG,
} from '../data/equipmentCatalog';
import { GRIMOIRE_SPELLS } from '../data/grimoiresCatalog';
import { INN_RANDOM_NAMES, type InnQualityKey } from '../data/innNames';
import { getUrbanGeneratorCopy } from '../i18n';
import type {
  AvailabilityTier,
  BilingualLabel,
  BuildingTypeId,
  CraftTier,
  EnvironmentId,
  GeneratedBuilding,
  GeneratedEnvironment,
  GeneratedShopItem,
  GeneratedSingleBuilding,
  ModuleLanguage,
} from '../types';

const INN_TYPES = new Set<BuildingTypeId>([
  'Inn_high_class',
  'Inn_standard_quality',
  'Inn_medium_quality',
  'Inn_cheap_quality',
  'Inn_infamous_quality',
]);

function isInnType(buildingType: BuildingTypeId): buildingType is InnQualityKey {
  return INN_TYPES.has(buildingType);
}

/**
 * Inclusive random integer helper.
 */
function randomInt(min: number, max: number): number {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  if (high <= low) return low;
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

/**
 * Picks a single random element from a non-empty readonly array.
 */
function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Fisher-Yates unique sampling bounded by pool size (fixes legacy random2() duplicate/undefined bug).
 */
function sampleUnique<T>(pool: readonly T[], requestedCount: number): T[] {
  const count = Math.max(0, Math.min(requestedCount, pool.length));
  if (count === 0) return [];
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy.slice(0, count);
}

/**
 * Resolves allowed item availability tiers for a specific building & environment.
 */
function getAllowedAvailabilities(
  buildingType: BuildingTypeId,
  environmentId: EnvironmentId
): ReadonlySet<AvailabilityTier> {
  if (buildingType === 'Alchemist') {
    if (environmentId === 2) return new Set(['P', 'C', 'I']);
    if (environmentId === 3) return new Set(['P', 'C']);
    return new Set(['P', 'C', 'I', 'R']);
  }

  if (buildingType === 'Armorer_village') {
    return new Set(['P', 'C']);
  }

  if (
    buildingType === 'General_shop' ||
    buildingType === 'Inn_stables'
  ) {
    if (environmentId === 2) return new Set(['P', 'C']);
    return new Set(['P', 'C', 'I', 'R']);
  }

  if (buildingType === 'Haberdashery' || buildingType === 'Tailoring') {
    if (environmentId === 0) return new Set(['P', 'C', 'I', 'R']);
    if (environmentId === 1) return new Set(['P', 'C', 'I']);
    return new Set(['P', 'C']);
  }

  return new Set(['P', 'C', 'I', 'R']);
}

/**
 * Resolves allowed crafting/spell tiers for a specific building & environment.
 */
function getAllowedCraftTiers(
  buildingType: BuildingTypeId,
  environmentId: EnvironmentId
): ReadonlySet<CraftTier> {
  if (buildingType === 'Armorer_village') {
    return new Set(['novice', 'journeyman']);
  }

  if (buildingType === 'Haberdashery') {
    if (environmentId === 0) return new Set(['novice', 'journeyman', 'master']);
    if (environmentId === 1) return new Set(['novice', 'journeyman']);
    return new Set(['novice']);
  }

  if (buildingType === 'Bookshop' || buildingType === 'Tailoring') {
    if (environmentId === 0) {
      return new Set(['novice', 'journeyman', 'master', 'grandmaster']);
    }
    return new Set(['novice', 'journeyman']);
  }

  // Armorer_standard & others
  if (environmentId === 0) {
    return new Set(['novice', 'journeyman', 'master', 'grandmaster']);
  }
  return new Set(['novice', 'journeyman', 'master']);
}

function getBuildingTitle(buildingType: BuildingTypeId): BilingualLabel {
  const enCopy = getUrbanGeneratorCopy('en');
  const frCopy = getUrbanGeneratorCopy('fr');
  return {
    en: enCopy.buildings[buildingType],
    fr: frCopy.buildings[buildingType],
  };
}

function getSpellBookPrice(tier: Exclude<CraftTier, 'grandmaster'>): number {
  if (tier === 'novice') return randomInt(101, 200);
  if (tier === 'journeyman') return randomInt(201, 300);
  return randomInt(401, 500);
}

/**
 * Builds the full eligible item pool for a given shop archetype, environment scale, and fan-made flag.
 */
function buildShopPool(
  buildingType: BuildingTypeId,
  environmentId: EnvironmentId,
  includeFanMade: boolean
): GeneratedShopItem[] {
  const availabilities = getAllowedAvailabilities(buildingType, environmentId);
  const craftTiers = getAllowedCraftTiers(buildingType, environmentId);

  switch (buildingType) {
    case 'Alchemist': {
      const articles: GeneratedShopItem[] = ALCHEMY_ARTICLES.filter((item) =>
        availabilities.has(item.availability)
      ).map((item) => ({
        id: item.id,
        name: item.name,
        kind: 'article',
        price: item.price,
      }));

      const formulas: GeneratedShopItem[] = ALCHEMY_FORMULAS.map((f) => ({
        id: f.id,
        name: f.name,
        kind: 'formula',
        price: null,
      }));

      const components: GeneratedShopItem[] = CRAFTING_COMPONENTS.filter((c) =>
        availabilities.has(c.rarity)
      ).map((c) => ({
        id: c.id,
        name: c.name,
        kind: 'component',
        price: c.price,
      }));

      return [...articles, ...formulas, ...components];
    }

    case 'Armorer_standard':
    case 'Armorer_village': {
      const weapons: GeneratedShopItem[] = WEAPONS_CATALOG.filter(
        (w) => w.kind === 'weapon' && availabilities.has(w.availability)
      ).map((w) => ({
        id: w.id,
        name: w.name,
        kind: 'weapon',
        price: w.price,
      }));

      const armors: GeneratedShopItem[] = ARMORS_CATALOG.filter((a) =>
        availabilities.has(a.availability)
      ).map((a) => ({
        id: a.id,
        name: a.name,
        kind: 'armor',
        price: a.price,
      }));

      const diagrams: GeneratedShopItem[] = CRAFTING_DIAGRAMS.filter(
        (d) => d.pool === 'A' && craftTiers.has(d.tier)
      ).map((d) => ({
        id: d.id,
        name: d.name,
        kind: 'diagram',
        price: d.price,
      }));

      return [...weapons, ...armors, ...diagrams];
    }

    case 'General_shop': {
      const items: GeneratedShopItem[] = GENERAL_EQUIPMENT_ITEMS.filter((item) =>
        availabilities.has(item.availability)
      ).map((item) => ({
        id: item.id,
        name: item.name,
        kind: item.kind,
        price: item.price,
      }));

      const toolWeapons: GeneratedShopItem[] = WEAPONS_CATALOG.filter(
        (w) => w.kind === 'tool' && availabilities.has(w.availability)
      ).map((w) => ({
        id: w.id,
        name: w.name,
        kind: 'tool',
        price: w.price,
      }));

      return [...items, ...toolWeapons];
    }

    case 'Bookshop': {
      const spells: GeneratedShopItem[] = GRIMOIRE_SPELLS.filter(
        (s) =>
          (s.source === 'official' || includeFanMade) &&
          craftTiers.has(s.tier)
      ).map((s) => ({
        id: s.id,
        name: s.name,
        kind: 'spellbook',
        price: getSpellBookPrice(s.tier),
        meta: s.school,
        isFanMade: s.source === 'fanMade',
      }));

      const books: GeneratedShopItem[] = BOOKSHOP_BOOKS.map((book, idx) => ({
        id: `bk-${idx}`,
        name: book,
        kind: 'book',
        price: randomInt(1, 50),
      }));

      const diagrams: GeneratedShopItem[] = CRAFTING_DIAGRAMS.filter(
        (d) => d.pool !== 'S' && d.price > 0 && craftTiers.has(d.tier)
      ).map((d) => ({
        id: d.id,
        name: d.name,
        kind: 'diagram',
        price: d.price,
      }));

      return [...spells, ...books, ...diagrams];
    }

    case 'Haberdashery': {
      const components: GeneratedShopItem[] = CRAFTING_COMPONENTS.filter((c) =>
        availabilities.has(c.rarity)
      ).map((c) => ({
        id: c.id,
        name: c.name,
        kind: 'component',
        price: c.price,
      }));

      const diagrams: GeneratedShopItem[] = CRAFTING_DIAGRAMS.filter(
        (d) => d.pool === 'M' && craftTiers.has(d.tier)
      ).map((d) => ({
        id: d.id,
        name: d.name,
        kind: 'diagram',
        price: d.price,
      }));

      return [...components, ...diagrams];
    }

    case 'Tailoring': {
      const armors: GeneratedShopItem[] = ARMORS_CATALOG.filter(
        (a) =>
          (a.weightClass === 'light' || a.weightClass === 'medium') &&
          !a.isShield &&
          availabilities.has(a.availability)
      ).map((a) => ({
        id: a.id,
        name: a.name,
        kind: 'armor',
        price: a.price,
      }));

      const clothing: GeneratedShopItem[] = [
        ...GENERAL_EQUIPMENT_ITEMS.filter((i) => i.kind === 'clothing'),
        TAILOR_EXTRA_CLOTHING,
      ]
        .filter((i) => availabilities.has(i.availability))
        .map((i) => ({
          id: i.id,
          name: i.name,
          kind: 'clothing',
          price: i.price,
        }));

      const staffDiagrams: GeneratedShopItem[] = CRAFTING_DIAGRAMS.filter(
        (d) => d.pool === 'B' && craftTiers.has(d.tier)
      ).map((d) => ({
        id: d.id,
        name: d.name,
        kind: 'diagram',
        price: d.price,
      }));

      return [...armors, ...clothing, ...staffDiagrams];
    }

    case 'Inn_stables': {
      return GENERAL_EQUIPMENT_ITEMS.filter(
        (i) => i.kind === 'mountGear' && availabilities.has(i.availability)
      ).map((i) => ({
        id: i.id,
        name: i.name,
        kind: 'mountGear',
        price: i.price,
      }));
    }

    default:
      return [];
  }
}

/**
 * Generates a single building record using either environment bounds or an explicit item count.
 */
function rollBuilding(params: {
  buildingType: BuildingTypeId;
  environmentId: EnvironmentId;
  includeFanMade: boolean;
  explicitItemCount?: number;
  includeStrawBeddingNote?: boolean;
}): GeneratedBuilding {
  const {
    buildingType,
    environmentId,
    includeFanMade,
    explicitItemCount,
    includeStrawBeddingNote = false,
  } = params;

  const createBuildingInstanceId = (bt: BuildingTypeId) =>
    `bld-${bt}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

  const title = getBuildingTitle(buildingType);

  if (isInnType(buildingType)) {
    const profile = INN_PROFILES[buildingType];
    const tavernName = pickRandom(INN_RANDOM_NAMES[buildingType]);
    const items: GeneratedShopItem[] = profile.menu.map((food) => ({
      id: food.id,
      name: food.name,
      kind: 'food',
      price: food.price,
      isStandard: true,
    }));

    const lodgingNote: BilingualLabel = includeStrawBeddingNote
      ? {
          en: `${profile.roomDescription.en} · ${STRAW_BEDDING_LODGING.name.en} (2 crowns/night)`,
          fr: `${profile.roomDescription.fr} · ${STRAW_BEDDING_LODGING.name.fr} (2 couronnes/nuit)`,
        }
      : profile.roomDescription;

    return {
      id: createBuildingInstanceId(buildingType),
      buildingType,
      title,
      tavernName,
      roomPrice: profile.roomPrice,
      lodgingNote,
      items,
    };
  }

  if (buildingType === 'Notice_board') {
    const contract = pickRandom(NOTICE_BOARD_CONTRACTS);
    return {
      id: createBuildingInstanceId(buildingType),
      buildingType,
      title,
      items: [
        {
          id: 'notice-contract',
          name: contract,
          kind: 'contract',
          price: null,
        },
      ],
    };
  }

  const bounds = BUILDING_BOUNDS[buildingType][environmentId];
  const rollCount =
    explicitItemCount !== undefined
      ? explicitItemCount
      : randomInt(bounds.min, bounds.max);

  const pool = buildShopPool(buildingType, environmentId, includeFanMade);
  const sampled = sampleUnique(pool, rollCount);

  if (buildingType === 'Inn_stables') {
    const stallItem: GeneratedShopItem = {
      id: STABLE_STALL_LODGING.id,
      name: STABLE_STALL_LODGING.name,
      kind: 'lodging',
      price: STABLE_STALL_LODGING.price,
      isStandard: true,
    };
    return {
      id: createBuildingInstanceId(buildingType),
      buildingType,
      title,
      items: [stallItem, ...sampled],
    };
  }

  if (buildingType === 'Tailoring') {
    const standardTextiles: GeneratedShopItem[] = TAILORING_BASE_MATERIALS.map(
      (mat) => ({
        id: mat.id,
        name: mat.name,
        kind: mat.kind,
        price: mat.price,
        isStandard: true,
      })
    );
    return {
      id: createBuildingInstanceId(buildingType),
      buildingType,
      title,
      items: [...standardTextiles, ...sampled],
    };
  }

  if (buildingType === 'General_shop' && environmentId === 3 && explicitItemCount === undefined) {
    const worldMap: GeneratedShopItem = {
      id: FORTRESS_WORLD_MAP_ITEM.id,
      name: FORTRESS_WORLD_MAP_ITEM.name,
      kind: FORTRESS_WORLD_MAP_ITEM.kind,
      price: FORTRESS_WORLD_MAP_ITEM.price,
      isStandard: true,
    };
    return {
      id: createBuildingInstanceId(buildingType),
      buildingType,
      title,
      items: [worldMap, ...sampled],
    };
  }

  return {
    id: createBuildingInstanceId(buildingType),
    buildingType,
    title,
    items: sampled,
  };
}

/**
 * Rolls a single building in the context of an existing settlement environment.
 */
export function createRolledBuildingForEnvironment(
  buildingType: BuildingTypeId,
  environmentId: EnvironmentId,
  includeFanMade: boolean
): GeneratedBuilding {
  const env = ENVIRONMENT_BY_ID[environmentId];
  const hasStrawBedding = env.allowedBuildings.includes('Inn_straw_bedding');
  return rollBuilding({
    buildingType,
    environmentId,
    includeFanMade,
    includeStrawBeddingNote: hasStrawBedding,
  });
}

/**
 * Creates an empty custom building ready for manual GM population.
 */
export function createBlankBuilding(buildingType: BuildingTypeId): GeneratedBuilding {
  const title = getBuildingTitle(buildingType);
  return {
    id: `bld-${buildingType}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    buildingType,
    title: { ...title },
    items: [],
  };
}

export interface GenerateEnvironmentInput {
  settlementName: string;
  environmentId: EnvironmentId;
  includeFanMade: boolean;
}

/**
 * Generates a full settlement dossier across all allowed buildings for the selected environment.
 */
export function generateUrbanEnvironment(
  input: GenerateEnvironmentInput
): GeneratedEnvironment {
  const env = ENVIRONMENT_BY_ID[input.environmentId];
  const hasStrawBedding = env.allowedBuildings.includes('Inn_straw_bedding');

  const buildings = env.allowedBuildings
    // Straw bedding is folded into Inn lodging notes to avoid noisy 1-line orphan cards
    .filter((buildingType) => buildingType !== 'Inn_straw_bedding')
    .map((buildingType) =>
      rollBuilding({
        buildingType,
        environmentId: env.id,
        includeFanMade: input.includeFanMade,
        includeStrawBeddingNote: hasStrawBedding,
      })
    );

  return {
    settlementName: input.settlementName.trim(),
    environmentId: env.id,
    environmentName: env.name,
    includeFanMade: input.includeFanMade,
    buildings,
    generatedAtIso: new Date().toISOString(),
  };
}

export interface GenerateSingleBuildingInput {
  buildingType: BuildingTypeId;
  itemCount: number;
  includeFanMade: boolean;
}

/**
 * Generates an isolated building inventory using Capital-level availability (0)
 * so any item tier can appear, matching legacy standalone generator behavior.
 */
export function generateSingleBuilding(
  input: GenerateSingleBuildingInput
): GeneratedSingleBuilding {
  const safeCount = Math.max(1, Math.floor(input.itemCount));
  const building = rollBuilding({
    buildingType: input.buildingType,
    environmentId: 0,
    includeFanMade: input.includeFanMade,
    explicitItemCount: safeCount,
    includeStrawBeddingNote: true,
  });

  return {
    buildingType: input.buildingType,
    requestedCount: safeCount,
    includeFanMade: input.includeFanMade,
    building,
    generatedAtIso: new Date().toISOString(),
  };
}

/**
 * Formats a price in crowns for clipboard exports.
 */
export function formatCrownsText(
  price: number | null,
  lang: ModuleLanguage
): string {
  const copy = getUrbanGeneratorCopy(lang);
  if (price === null) return copy.output.pricelessLabel;
  const unit = price === 1 ? copy.output.crownSingular : copy.output.crownUnit;
  return `${price} ${unit}`;
}

/**
 * Converts a generated building into clean plain text for clipboard copying.
 */
export function formatBuildingAsText(
  building: GeneratedBuilding,
  lang: ModuleLanguage
): string {
  const copy = getUrbanGeneratorCopy(lang);
  const header = building.tavernName
    ? `${building.title[lang]} — "${building.tavernName[lang]}"`
    : building.title[lang];

  const lines: string[] = [header];
  if (building.lodgingNote) {
    lines.push(`  ${building.lodgingNote[lang]}`);
  }

  for (const item of building.items) {
    const kindLabel = copy.itemKinds[item.kind];
    const schoolSuffix = item.meta ? ` (${item.meta[lang]})` : '';
    const priceSuffix =
      item.kind === 'contract'
        ? ''
        : ` — ${formatCrownsText(item.price, lang)}`;
    lines.push(`  - [${kindLabel}] ${item.name[lang]}${schoolSuffix}${priceSuffix}`);
  }

  return lines.join('\n');
}

/**
 * Converts an entire generated settlement into a structured plain-text dossier for clipboard copying.
 */
export function formatEnvironmentAsText(
  env: GeneratedEnvironment,
  lang: ModuleLanguage
): string {
  const copy = getUrbanGeneratorCopy(lang);
  const settlementTitle =
    env.settlementName || copy.envForm.defaultSettlementName;
  const header = `${settlementTitle} (${env.environmentName[lang]})`;
  const sections = env.buildings.map((b) => formatBuildingAsText(b, lang));
  return `${header}\n${'='.repeat(header.length)}\n\n${sections.join('\n\n')}`;
}
