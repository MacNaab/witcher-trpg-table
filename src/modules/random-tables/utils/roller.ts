import {
  CHEST_CATEGORY_ROLL_COUNTS,
  CHEST_LOOT_POOLS,
} from '../data/chestLootData';
import {
  BAD_OUTCOME_POOL,
  CARAVAN_DETAIL,
  GOOD_OUTCOME_POOL,
  MODULAR_ENVIRONMENT_ENCOUNTERS,
  MODULAR_SOCIAL_ROAD_AAA,
  MONSTER_DIFFICULTIES,
  NEUTRAL_OUTCOME_POOL,
  OUTCOME_CATEGORY_LABELS,
  WITCHER_CLASSES,
} from '../data/encountersSocialAndEnv';
import {
  T15_TRAVEL_ENCOUNTERS,
  T23_ROAD_TRAVELERS,
} from '../data/encountersTravel';
import {
  T13_WILDERNESS_ENCOUNTERS,
  T14_CITY_ENCOUNTERS,
  T16_SMALL_TOWN_ENCOUNTERS,
  T17_TRAVEL_OBSTACLES,
} from '../data/encountersWildCity';
import {
  T10_BASIC_NPC,
  T11_ADVANCED_NPC,
  T12_WITCHER_LIFEPATH,
  T20_NPC_QUIRKS,
  T22_VISUAL_FEATURES,
} from '../data/lifepathsAndNpcs';
import {
  T1_INNKEEPERS,
  T1_INN_COMFORTS,
  T1_INN_ESTABLISHMENTS,
  T1_INN_FEATURES,
  T1_INN_PERSONALITIES,
  T21_UNIQUE_DUNGEONS,
  T2_DUNGEON_TRAPS,
  T5_DUNGEON_CORRIDORS,
  T5_DUNGEON_ENTRANCES,
  T5_DUNGEON_GOALS,
  T5_DUNGEON_OBSTACLES,
  T5_DUNGEON_TRAPS,
  T6_SWAMP_HAZARDS,
  T6_SWAMP_LOCATIONS,
  T6_SWAMP_NPCS,
  T6_SWAMP_PLOTHOOKS,
  T6_SWAMP_TREASURES,
  T7_FOREST_HAZARDS,
  T7_FOREST_LOCATIONS,
  T7_FOREST_NPCS,
  T7_FOREST_PLOTHOOKS,
  T7_FOREST_TREASURES,
} from '../data/locationsAndDungeons';
import {
  T18_WEIRD_MERCHANTS,
  T19_MERCHANTS,
  T25_PEASANT_TREASURES,
  T8_POSSESSIONS,
} from '../data/merchantsAndLoot';
import { MORPHOLOGY_TRAITS } from '../data/npcMorphology';
import {
  T3_VILLAGE_HOOKS,
  T4_SIEGE_QUESTS,
  T9_COMPLEXITIES,
  T9_COMPLICATIONS,
  T9_DIFFICULTIES,
  T9_EMPLOYERS,
  T9_LOCATIONS,
  T9_MONSTERS,
  T9_PAY_OUTCOMES,
  T9_TWISTS,
  T9_TWIST_STATUS,
} from '../data/questsAndContracts';
import { getTableMeta } from '../data/tableRegistry';
import type { RandomTablesLocaleCopy } from '../i18n';
import type {
  BilingualTuple,
  ChestCategoryId,
  ChestDropRates,
  ChestLootEntry,
  ChestRollResult,
  EncounterDisposition,
  LocalizedText,
  ModularEncounterRates,
  ModularEncounterResult,
  ModuleLanguage,
  RandomTableId,
  RollField,
  TableRollResult,
  WeightedBilingualItem,
} from '../types';

function createResultId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) return 0;
  return Math.floor(Math.random() * maxExclusive);
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[randomInt(items.length)];
}

export function pickWeighted(
  items: readonly WeightedBilingualItem[]
): LocalizedText {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let cursor = randomInt(totalWeight);

  for (const item of items) {
    if (cursor < item.weight) {
      return { en: item.en, fr: item.fr };
    }
    cursor -= item.weight;
  }

  const last = items[items.length - 1];
  return { en: last.en, fr: last.fr };
}

function tupleToText(tuple: BilingualTuple): LocalizedText {
  return { en: tuple[0], fr: tuple[1] };
}

function joinLocalized(
  parts: readonly LocalizedText[],
  separator = ' · '
): LocalizedText {
  return {
    en: parts.map((p) => p.en).join(separator),
    fr: parts.map((p) => p.fr).join(separator),
  };
}

const SINGLE_TUPLE_TABLES: Partial<
  Record<RandomTableId, readonly BilingualTuple[]>
> = {
  2: T2_DUNGEON_TRAPS,
  4: T4_SIEGE_QUESTS,
  13: T13_WILDERNESS_ENCOUNTERS,
  14: T14_CITY_ENCOUNTERS,
  15: T15_TRAVEL_ENCOUNTERS,
  16: T16_SMALL_TOWN_ENCOUNTERS,
  17: T17_TRAVEL_OBSTACLES,
  18: T18_WEIRD_MERCHANTS,
  19: T19_MERCHANTS,
  21: T21_UNIQUE_DUNGEONS,
  22: T22_VISUAL_FEATURES,
  23: T23_ROAD_TRAVELERS,
  25: T25_PEASANT_TREASURES,
};

/**
 * Rolls any of the 26 GM tables and returns a structured, bilingual result object.
 */
export function rollRandomTable(tableId: RandomTableId): TableRollResult {
  const meta = getTableMeta(tableId);
  const base = {
    id: createResultId(`table-${tableId}`),
    tableId,
    tableTitle: meta.title,
    kind: meta.kind,
    attribution: meta.attribution,
    timestamp: Date.now(),
  };

  // Single-entry tables
  const singlePool = SINGLE_TUPLE_TABLES[tableId];
  if (singlePool) {
    return {
      ...base,
      body: tupleToText(pickRandom(singlePool)),
    };
  }

  // Titled tables (Table 3: Village Hooks, Table 20: NPC Quirks)
  if (tableId === 3 || tableId === 20) {
    const entry = pickRandom(tableId === 3 ? T3_VILLAGE_HOOKS : T20_NPC_QUIRKS);
    return {
      ...base,
      headline: entry.title,
      body: entry.body,
    };
  }

  // Table 1: Random Inns & Taverns
  if (tableId === 1) {
    const establishment = tupleToText(pickRandom(T1_INN_ESTABLISHMENTS));
    const comfort = pickRandom(T1_INN_COMFORTS);
    const innkeeperRace = tupleToText(pickRandom(T1_INNKEEPERS));
    const innkeeperPersonality = tupleToText(pickRandom(T1_INN_PERSONALITIES));
    const feature = tupleToText(pickRandom(T1_INN_FEATURES));

    const fields: RollField[] = [
      {
        label: { en: 'Establishment', fr: 'Établissement' },
        value: establishment,
      },
      {
        label: { en: 'Comfort Tier', fr: 'Niveau de confort' },
        value: {
          en: `${comfort.tier.en} — ${comfort.description.en}`,
          fr: `${comfort.tier.fr} — ${comfort.description.fr}`,
        },
      },
      {
        label: { en: 'Innkeeper', fr: 'Tavernier' },
        value: {
          en: `${innkeeperRace.en} — ${innkeeperPersonality.en}`,
          fr: `${innkeeperRace.fr} — ${innkeeperPersonality.fr}`,
        },
      },
      {
        label: { en: 'Distinctive Feature', fr: 'Particularité' },
        value: feature,
      },
    ];

    return { ...base, fields };
  }

  // Table 5: Dicing for Dungeons
  if (tableId === 5) {
    return {
      ...base,
      fields: [
        {
          label: { en: 'Entrance', fr: 'Entrée' },
          value: tupleToText(pickRandom(T5_DUNGEON_ENTRANCES)),
        },
        {
          label: { en: 'Traps', fr: 'Pièges' },
          value: tupleToText(pickRandom(T5_DUNGEON_TRAPS)),
        },
        {
          label: { en: 'Corridors', fr: 'Couloirs' },
          value: tupleToText(pickRandom(T5_DUNGEON_CORRIDORS)),
        },
        {
          label: { en: 'Obstacles', fr: 'Obstacles' },
          value: tupleToText(pickRandom(T5_DUNGEON_OBSTACLES)),
        },
        {
          label: { en: 'Goal', fr: 'Objectif' },
          value: tupleToText(pickRandom(T5_DUNGEON_GOALS)),
        },
      ],
    };
  }

  // Table 6: Dicing for Swamps & Table 7: Dicing for Forests
  if (tableId === 6 || tableId === 7) {
    const isSwamp = tableId === 6;
    return {
      ...base,
      fields: [
        {
          label: { en: 'Hazard', fr: 'Danger' },
          value: tupleToText(
            pickRandom(isSwamp ? T6_SWAMP_HAZARDS : T7_FOREST_HAZARDS)
          ),
        },
        {
          label: { en: 'Treasure', fr: 'Trésor' },
          value: tupleToText(
            pickRandom(isSwamp ? T6_SWAMP_TREASURES : T7_FOREST_TREASURES)
          ),
        },
        {
          label: { en: 'Plot Hook', fr: 'Accroche d’intrigue' },
          value: tupleToText(
            pickRandom(isSwamp ? T6_SWAMP_PLOTHOOKS : T7_FOREST_PLOTHOOKS)
          ),
        },
        {
          label: { en: 'Notable NPC', fr: 'PNJ notable' },
          value: tupleToText(
            pickRandom(isSwamp ? T6_SWAMP_NPCS : T7_FOREST_NPCS)
          ),
        },
        {
          label: { en: 'Location', fr: 'Lieu' },
          value: tupleToText(
            pickRandom(isSwamp ? T6_SWAMP_LOCATIONS : T7_FOREST_LOCATIONS)
          ),
        },
      ],
    };
  }

  // Table 8: Random Possessions (1d10 items)
  if (tableId === 8) {
    const count = randomInt(10) + 1;
    const items = Array.from({ length: count }, () => pickRandom(T8_POSSESSIONS));
    return {
      ...base,
      possessions: { count, items },
    };
  }

  // Table 9: Random Contract
  if (tableId === 9) {
    const monster = tupleToText(pickRandom(T9_MONSTERS));

    const diffRoll = randomInt(10);
    const difficulty = tupleToText(
      diffRoll < 4
        ? T9_DIFFICULTIES[0]
        : diffRoll > 7
          ? T9_DIFFICULTIES[2]
          : T9_DIFFICULTIES[1]
    );

    const compRoll = randomInt(10);
    const complexity = tupleToText(
      compRoll < 4
        ? T9_COMPLEXITIES[0]
        : compRoll > 7
          ? T9_COMPLEXITIES[2]
          : T9_COMPLEXITIES[1]
    );

    const location = tupleToText(pickRandom(T9_LOCATIONS));

    const hasTwist = randomInt(10) < 4;
    const twistChoice = tupleToText(pickRandom(T9_TWISTS));
    const twistValue: LocalizedText = hasTwist
      ? twistChoice
      : T9_TWIST_STATUS.noTwist;

    const employer = tupleToText(pickRandom(T9_EMPLOYERS));

    const payRoll = randomInt(10);
    const payIndex =
      payRoll >= 3 && payRoll <= 6
        ? 3
        : payRoll === 7
          ? 4
          : payRoll === 8
            ? 5
            : payRoll === 9
              ? 6
              : payRoll;
    const pay = tupleToText(T9_PAY_OUTCOMES[payIndex]);

    const complicationRoll = randomInt(8);
    let complication: LocalizedText;
    if (complicationRoll < 2) {
      complication = tupleToText(T9_COMPLICATIONS[0]);
    } else if (complicationRoll < 4) {
      complication = tupleToText(T9_COMPLICATIONS[1]);
    } else if (complicationRoll === 4) {
      complication = tupleToText(T9_COMPLICATIONS[2]);
    } else if (complicationRoll === 5) {
      complication = tupleToText(T9_COMPLICATIONS[3]);
    } else if (complicationRoll === 6) {
      complication = tupleToText(T9_COMPLICATIONS[4]);
    } else {
      const extraTwist = tupleToText(pickRandom(T9_TWISTS));
      complication = {
        en: `${T9_COMPLICATIONS[5][0]}: ${extraTwist.en}`,
        fr: `${T9_COMPLICATIONS[5][1]} : ${extraTwist.fr}`,
      };
    }

    return {
      ...base,
      fields: [
        {
          label: { en: 'Target Monster', fr: 'Monstre ciblé' },
          value: {
            en: `${monster.en} [${difficulty.en} — ${complexity.en}]`,
            fr: `${monster.fr} [${difficulty.fr} — ${complexity.fr}]`,
          },
        },
        {
          label: { en: 'Location', fr: 'Localisation' },
          value: location,
        },
        {
          label: { en: 'Plot Twist', fr: 'Retournement' },
          value: twistValue,
        },
        {
          label: { en: 'Employer & Pay', fr: 'Employeur & Paie' },
          value: {
            en: `${employer.en} — ${pay.en}`,
            fr: `${employer.fr} — ${pay.fr}`,
          },
        },
        {
          label: { en: 'Optional Complication', fr: 'Complication (optionnelle)' },
          value: complication,
        },
      ],
    };
  }

  // Table 10: Basic NPC Lifepath
  if (tableId === 10) {
    const raceRoll = randomInt(10);
    const race = tupleToText(
      raceRoll < 4
        ? T10_BASIC_NPC.race[0]
        : raceRoll > 6
          ? T10_BASIC_NPC.race[2]
          : T10_BASIC_NPC.race[1]
    );
    const gender = tupleToText(
      randomInt(10) % 2 === 0
        ? T10_BASIC_NPC.gender[0]
        : T10_BASIC_NPC.gender[1]
    );
    const age = tupleToText(pickRandom(T10_BASIC_NPC.age));
    const personality = tupleToText(pickRandom(T10_BASIC_NPC.personality));
    const history = tupleToText(pickRandom(T10_BASIC_NPC.history));
    const standing = tupleToText(pickRandom(T10_BASIC_NPC.standing));
    const romance = tupleToText(pickRandom(T10_BASIC_NPC.romance));
    const secret = tupleToText(pickRandom(T10_BASIC_NPC.secret));

    return {
      ...base,
      fields: [
        {
          label: { en: 'Identity', fr: 'Identité' },
          value: joinLocalized([race, gender, age]),
        },
        {
          label: { en: 'Personality', fr: 'Personnalité' },
          value: personality,
        },
        {
          label: { en: 'History', fr: 'Passé' },
          value: history,
        },
        {
          label: { en: 'Social Standing', fr: 'Classe sociale' },
          value: standing,
        },
        {
          label: { en: 'Romance', fr: 'Romance' },
          value: romance,
        },
        {
          label: { en: 'Secret', fr: 'Secret' },
          value: secret,
        },
      ],
    };
  }

  // Table 11: Advanced NPC Lifepath
  if (tableId === 11) {
    const regionRoll = randomInt(10);
    const nilfRoll = randomInt(10);
    const originRoll = randomInt(10);
    const familyRoll = randomInt(10);
    const parentRoll = randomInt(10);
    const statusRoll = randomInt(10);

    let regionIdx: 0 | 1 | 2;
    let origin: LocalizedText;

    if (regionRoll > 7) {
      regionIdx = 2;
      origin = tupleToText(
        originRoll % 2 === 0
          ? T11_ADVANCED_NPC.eOrigins[0]
          : T11_ADVANCED_NPC.eOrigins[1]
      );
    } else if (regionRoll % 2 === 0) {
      regionIdx = 1;
      origin = tupleToText(
        nilfRoll < 3
          ? T11_ADVANCED_NPC.nOrigins[10]
          : T11_ADVANCED_NPC.nOrigins[originRoll]
      );
    } else {
      regionIdx = 0;
      origin = tupleToText(T11_ADVANCED_NPC.nkOrigins[originRoll]);
    }

    const region = tupleToText(T11_ADVANCED_NPC.regions[regionIdx]);

    let lifepathEvent: LocalizedText;
    if (familyRoll % 2 === 0) {
      if (parentRoll % 2 === 0) {
        const idx = Math.min(statusRoll, 6);
        lifepathEvent = tupleToText(
          T11_ADVANCED_NPC.familyStatus[regionIdx][idx]
        );
      } else {
        lifepathEvent = tupleToText(
          T11_ADVANCED_NPC.parentalFate[regionIdx][statusRoll]
        );
      }
    } else {
      lifepathEvent = tupleToText(
        T11_ADVANCED_NPC.familyFate[regionIdx][statusRoll]
      );
    }

    return {
      ...base,
      fields: [
        {
          label: { en: 'Origin', fr: 'Origine' },
          value: {
            en: `${origin.en} (${region.en})`,
            fr: `${origin.fr} (${region.fr})`,
          },
        },
        {
          label: { en: 'Family & Upbringing', fr: 'Passé familial' },
          value: lifepathEvent,
        },
        {
          label: { en: 'Style', fr: 'Style' },
          value: joinLocalized([
            tupleToText(pickRandom(T11_ADVANCED_NPC.clothing)),
            tupleToText(pickRandom(T11_ADVANCED_NPC.personality)),
          ]),
          subFields: [
            {
              label: { en: 'Clothing', fr: 'Vêtements' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.clothing)),
            },
            {
              label: { en: 'Personality', fr: 'Personnalité' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.personality)),
            },
            {
              label: { en: 'Hairstyle', fr: 'Cheveux' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.hair)),
            },
            {
              label: { en: 'Affectations', fr: 'Signes distinctifs' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.affectations)),
            },
          ],
        },
        {
          label: { en: 'Values', fr: 'Valeurs' },
          value: tupleToText(pickRandom(T11_ADVANCED_NPC.valued)),
          subFields: [
            {
              label: { en: 'Valued Person', fr: 'Personne valorisée' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.valuedPerson)),
            },
            {
              label: { en: 'Core Value', fr: 'Valeur principale' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.valued)),
            },
            {
              label: { en: 'Feelings on People', fr: 'Opinion sur les gens' },
              value: tupleToText(pickRandom(T11_ADVANCED_NPC.feelings)),
            },
          ],
        },
      ],
    };
  }

  // Table 12: Witcher Lifepath
  if (tableId === 12) {
    const ageRoll = randomInt(10);
    const trialsRoll = randomInt(10);
    const nowRoll = randomInt(10);

    const age = tupleToText(
      ageRoll < 2
        ? T12_WITCHER_LIFEPATH.age[0]
        : ageRoll > 7
          ? T12_WITCHER_LIFEPATH.age[2]
          : T12_WITCHER_LIFEPATH.age[1]
    );
    const school = tupleToText(pickRandom(T12_WITCHER_LIFEPATH.school));
    const training = tupleToText(pickRandom(T12_WITCHER_LIFEPATH.training));
    const trials = tupleToText(
      trialsRoll === 0
        ? T12_WITCHER_LIFEPATH.trials[0]
        : trialsRoll === 9
          ? T12_WITCHER_LIFEPATH.trials[3]
          : trialsRoll < 3
            ? T12_WITCHER_LIFEPATH.trials[1]
            : T12_WITCHER_LIFEPATH.trials[2]
    );
    const event = tupleToText(pickRandom(T12_WITCHER_LIFEPATH.event));
    const now = tupleToText(
      nowRoll === 9
        ? T12_WITCHER_LIFEPATH.now[4]
        : nowRoll === 8
          ? T12_WITCHER_LIFEPATH.now[3]
          : nowRoll > 1
            ? T12_WITCHER_LIFEPATH.now[2]
            : T12_WITCHER_LIFEPATH.now[nowRoll]
    );

    return {
      ...base,
      fields: [
        {
          label: {
            en: 'When Did You Become a Witcher?',
            fr: 'Âge de recrutement',
          },
          value: age,
        },
        {
          label: { en: 'Witcher School', fr: 'École de sorceleur' },
          value: school,
        },
        {
          label: { en: 'Early Training Event', fr: 'Entraînement initial' },
          value: training,
        },
        {
          label: { en: 'Outcome of the Trials', fr: 'Épreuve des Herbes' },
          value: trials,
        },
        {
          label: { en: 'Most Important Event', fr: 'Événement marquant' },
          value: event,
        },
        {
          label: { en: 'Where You Are Now', fr: 'Situation actuelle' },
          value: now,
        },
      ],
    };
  }

  // Table 24: External reference (Mushrooms)
  if (tableId === 24) {
    return {
      ...base,
      externalUrl: meta.attribution.url,
    };
  }

  // Table 26: Detailed Physical & Vocal Profile
  const gender = pickWeighted(MORPHOLOGY_TRAITS.gender);
  const isMale = gender.en === 'Male';

  const hairLine: LocalizedText = isMale
    ? {
        en: `${pickWeighted(MORPHOLOGY_TRAITS.hairMale).en} · Facial hair: ${pickWeighted(MORPHOLOGY_TRAITS.facialHair).en}`,
        fr: `${pickWeighted(MORPHOLOGY_TRAITS.hairMale).fr} · Pilosité faciale : ${pickWeighted(MORPHOLOGY_TRAITS.facialHair).fr}`,
      }
    : pickWeighted(MORPHOLOGY_TRAITS.hairFemale);

  const eyeColor = pickWeighted(MORPHOLOGY_TRAITS.eyeColor);
  const eyeShape = pickWeighted(MORPHOLOGY_TRAITS.eyeShape);
  const eyeLuster = pickWeighted(MORPHOLOGY_TRAITS.eyeLuster);

  return {
    ...base,
    fields: [
      {
        label: { en: 'Identity & Profession', fr: 'Identité & Métier' },
        value: joinLocalized([
          pickWeighted(MORPHOLOGY_TRAITS.race),
          gender,
          pickWeighted(MORPHOLOGY_TRAITS.profession),
        ]),
      },
      {
        label: { en: 'Physique', fr: 'Physique' },
        value: joinLocalized([
          pickWeighted(MORPHOLOGY_TRAITS.height),
          pickWeighted(MORPHOLOGY_TRAITS.weight),
          pickWeighted(MORPHOLOGY_TRAITS.build),
        ]),
        subFields: [
          {
            label: { en: 'Skin & Features', fr: 'Peau & Traits' },
            value: joinLocalized([
              pickWeighted(MORPHOLOGY_TRAITS.skin),
              pickWeighted(MORPHOLOGY_TRAITS.feature),
            ]),
          },
          {
            label: { en: 'Gesture & Walk', fr: 'Gestuelle & Démarche' },
            value: joinLocalized([
              pickWeighted(MORPHOLOGY_TRAITS.gesture),
              pickWeighted(MORPHOLOGY_TRAITS.walk),
            ]),
          },
        ],
      },
      {
        label: { en: 'Head & Hair', fr: 'Tête & Chevelure' },
        value: joinLocalized([
          pickWeighted(MORPHOLOGY_TRAITS.headShape),
          pickWeighted(MORPHOLOGY_TRAITS.hairColor),
          hairLine,
        ]),
        subFields: [
          {
            label: { en: 'Forehead & Nose', fr: 'Front & Nez' },
            value: joinLocalized([
              pickWeighted(MORPHOLOGY_TRAITS.forehead),
              pickWeighted(MORPHOLOGY_TRAITS.nose),
            ]),
          },
          {
            label: { en: 'Mouth, Lips & Teeth', fr: 'Bouche, Lèvres & Dents' },
            value: joinLocalized([
              pickWeighted(MORPHOLOGY_TRAITS.mouth),
              pickWeighted(MORPHOLOGY_TRAITS.lips),
              pickWeighted(MORPHOLOGY_TRAITS.teeth),
            ]),
          },
        ],
      },
      {
        label: { en: 'Eyes & Gaze', fr: 'Yeux & Regard' },
        value: joinLocalized([
          eyeColor,
          eyeShape,
          eyeLuster,
          pickWeighted(MORPHOLOGY_TRAITS.gaze),
        ]),
      },
      {
        label: { en: 'Voice & Speech', fr: 'Voix & Élocution' },
        value: joinLocalized([
          pickWeighted(MORPHOLOGY_TRAITS.voiceTone),
          pickWeighted(MORPHOLOGY_TRAITS.voiceTimbre),
          pickWeighted(MORPHOLOGY_TRAITS.voiceVolume),
          pickWeighted(MORPHOLOGY_TRAITS.voicePitch),
        ]),
        subFields: [
          {
            label: { en: 'Language & Diction', fr: 'Langage & Articulation' },
            value: joinLocalized([
              pickWeighted(MORPHOLOGY_TRAITS.language),
              pickWeighted(MORPHOLOGY_TRAITS.elocution),
              pickWeighted(MORPHOLOGY_TRAITS.articulation),
            ]),
          },
        ],
      },
      {
        label: { en: 'Behavior & Quirks', fr: 'Attitude & Manies' },
        value: joinLocalized([
          tupleToText(pickRandom(MORPHOLOGY_TRAITS.personality)),
          pickWeighted(MORPHOLOGY_TRAITS.demeanor),
          pickWeighted(MORPHOLOGY_TRAITS.habit),
        ]),
        subFields: [
          {
            label: { en: 'Visible Condition', fr: 'Handicap visible' },
            value: pickWeighted(MORPHOLOGY_TRAITS.visibleDisability),
          },
          {
            label: { en: 'Hidden Condition', fr: 'Trouble caché' },
            value: pickWeighted(MORPHOLOGY_TRAITS.hiddenDisability),
          },
        ],
      },
    ],
  };
}

/**
 * Rolls a Random Chest (crowns + multi-roll categorized drops).
 */
export function rollChestLoot(rates: ChestDropRates): ChestRollResult {
  const safeMaxCrown = Math.max(0, Math.round(rates.maxCrown));
  const crowns = safeMaxCrown > 0 ? randomInt(safeMaxCrown) + 1 : 0;

  const items: ChestLootEntry[] = [];
  const orderedCategories: ChestCategoryId[] = [
    'gear',
    'weapon',
    'armor',
    'diagram',
    'formula',
    'alchemy',
    'glyph',
    'rune',
    'efWeapon',
    'efArmor',
    'relic',
  ];

  for (const category of orderedCategories) {
    const rolls = CHEST_CATEGORY_ROLL_COUNTS[category];
    const pool = CHEST_LOOT_POOLS[category];

    for (let i = 0; i < rolls; i += 1) {
      if (category === 'relic') {
        const rollValue = randomInt(1000);
        if (rollValue < rates.relicPerMille) {
          items.push({
            category,
            name: tupleToText(pickRandom(pool)),
            rollValue,
          });
        }
      } else {
        const rollValue = randomInt(100);
        const threshold = rates[category];
        if (rollValue < threshold) {
          items.push({
            category,
            name: tupleToText(pickRandom(pool)),
            rollValue,
          });
        }
      }
    }
  }

  return {
    id: createResultId('chest'),
    crowns,
    maxCrown: safeMaxCrown,
    items,
    timestamp: Date.now(),
  };
}

/**
 * Rolls a Modular Random Encounter across Good / Neutral / Bad probability ranges.
 */
export function rollModularEncounter(
  rates: ModularEncounterRates
): ModularEncounterResult {
  const rollZeroIndexed = randomInt(100);
  const d100Roll = rollZeroIndexed + 1;

  let disposition: EncounterDisposition;
  if (rollZeroIndexed < rates.good) {
    disposition = 'good';
  } else if (rollZeroIndexed >= 100 - rates.bad) {
    disposition = 'bad';
  } else {
    disposition = 'neutral';
  }

  const base = {
    id: createResultId('encounter'),
    disposition,
    d100Roll,
    timestamp: Date.now(),
  };

  const resolveHumanOutcome = (): {
    category: LocalizedText;
    detail: LocalizedText;
    attribution?: { author: string; url?: string };
  } => {
    const humanType = randomInt(4);
    if (humanType === 0) {
      return {
        category: OUTCOME_CATEGORY_LABELS.human,
        detail: CARAVAN_DETAIL,
      };
    }
    if (humanType === 1) {
      return {
        category: {
          en: 'Human · Social Road Encounter',
          fr: 'Rencontre humaine · Rencontre sociale sur la route',
        },
        detail: tupleToText(pickRandom(MODULAR_SOCIAL_ROAD_AAA)),
        attribution: {
          author: 'DnD Speak',
          url: 'http://dndspeak.com/2018/03/100-social-encounters-on-the-road/',
        },
      };
    }
    if (humanType === 2) {
      return {
        category: {
          en: 'Human · Travelling Encounter',
          fr: 'Rencontre humaine · Péripétie de voyage',
        },
        detail: tupleToText(pickRandom(T15_TRAVEL_ENCOUNTERS)),
        attribution: {
          author: 'Reddit r/d100',
          url: 'https://www.reddit.com/r/d100/comments/gxtn40/d100_random_noncombat_encounters_while_travelling/',
        },
      };
    }
    return {
      category: {
        en: 'Human · Road Travelers',
        fr: 'Rencontre humaine · Voyageurs sur la route',
      },
      detail: tupleToText(pickRandom(T23_ROAD_TRAVELERS)),
      attribution: {
        author: 'DnD Speak',
        url: 'http://dndspeak.com/2020/08/100-travelers-you-meet-on-the-road/',
      },
    };
  };

  if (disposition === 'good') {
    const key = pickRandom(GOOD_OUTCOME_POOL);
    if (key === 'classMaster') {
      const pickedClass = tupleToText(pickRandom(WITCHER_CLASSES));
      return {
        ...base,
        category: OUTCOME_CATEGORY_LABELS.classMaster,
        detail: pickedClass,
      };
    }
    if (key === 'human') {
      return { ...base, ...resolveHumanOutcome() };
    }
    if (key === 'environment') {
      return {
        ...base,
        category: OUTCOME_CATEGORY_LABELS.environment,
        detail: tupleToText(pickRandom(MODULAR_ENVIRONMENT_ENCOUNTERS)),
      };
    }
    return {
      ...base,
      category: OUTCOME_CATEGORY_LABELS[key],
      detail: OUTCOME_CATEGORY_LABELS[key],
    };
  }

  if (disposition === 'bad') {
    const key = pickRandom(BAD_OUTCOME_POOL);
    if (key === 'creature') {
      const diffRoll = randomInt(10);
      const difficulty =
        diffRoll < 5
          ? MONSTER_DIFFICULTIES.easy
          : diffRoll > 7
            ? MONSTER_DIFFICULTIES.hard
            : MONSTER_DIFFICULTIES.medium;
      return {
        ...base,
        category: OUTCOME_CATEGORY_LABELS.creature,
        detail: difficulty,
      };
    }
    return {
      ...base,
      category: OUTCOME_CATEGORY_LABELS[key],
      detail: OUTCOME_CATEGORY_LABELS[key],
    };
  }

  // Neutral
  const key = pickRandom(NEUTRAL_OUTCOME_POOL);
  if (key === 'human') {
    return { ...base, ...resolveHumanOutcome() };
  }
  if (key === 'environment') {
    return {
      ...base,
      category: OUTCOME_CATEGORY_LABELS.environment,
      detail: tupleToText(pickRandom(MODULAR_ENVIRONMENT_ENCOUNTERS)),
    };
  }
  return {
    ...base,
    category: OUTCOME_CATEGORY_LABELS[key],
    detail: OUTCOME_CATEGORY_LABELS[key],
  };
}

/* -------------------------------------------------------------------------- */
/* Clipboard Plain-Text Formatters                                            */
/* -------------------------------------------------------------------------- */

export function formatTableRollAsText(
  result: TableRollResult,
  lang: ModuleLanguage,
  copy: RandomTablesLocaleCopy
): string {
  const lines: string[] = [result.tableTitle[lang]];

  if (result.headline) {
    lines.push(result.headline[lang]);
  }
  if (result.body) {
    lines.push(result.body[lang]);
  }
  if (result.fields) {
    for (const field of result.fields) {
      lines.push(`${field.label[lang]}: ${field.value[lang]}`);
      if (field.subFields) {
        for (const sub of field.subFields) {
          lines.push(`  - ${sub.label[lang]}: ${sub.value[lang]}`);
        }
      }
    }
  }
  if (result.possessions) {
    lines.push(`${copy.tables.possessionsCountLabel}: ${result.possessions.count}`);
    result.possessions.items.forEach((item, idx) => {
      lines.push(
        `${idx + 1}. ${copy.tables.possessionsTiers.ordinary}: ${item.ordinary[lang]} | ${copy.tables.possessionsTiers.strange}: ${item.strange[lang]} | ${copy.tables.possessionsTiers.occult}: ${item.occult[lang]}`
      );
    });
  }
  if (result.externalUrl) {
    lines.push(result.externalUrl);
  }

  return lines.join('\n');
}

export function formatChestRollAsText(
  result: ChestRollResult,
  lang: ModuleLanguage,
  copy: RandomTablesLocaleCopy
): string {
  const lines: string[] = [
    `${copy.chest.crownsLabel}: ${result.crowns}`,
  ];
  if (result.items.length === 0) {
    lines.push(copy.chest.emptyChestLoot);
  } else {
    for (const entry of result.items) {
      lines.push(`- [${copy.chest.categories[entry.category]}] ${entry.name[lang]}`);
    }
  }
  return lines.join('\n');
}

export function formatEncounterAsText(
  result: ModularEncounterResult,
  lang: ModuleLanguage,
  copy: RandomTablesLocaleCopy
): string {
  return [
    `${copy.encounter.dispositions[result.disposition]} (${copy.encounter.rollLabel}: ${result.d100Roll})`,
    `${result.category[lang]}`,
    result.detail[lang],
  ].join('\n');
}
