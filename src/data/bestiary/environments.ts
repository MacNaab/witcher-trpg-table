import type {
  CompendiumLanguage,
  CreatureTypeId,
  EncounterEnvId,
  HumanoidEnvId,
  LocalizedText,
  MonsterEnvId,
} from './types';

/**
 * Ordered list of all 17 Monster encounter environments.
 */
export const MONSTER_ENVIRONMENTS: readonly MonsterEnvId[] = [
  'everywhere',
  'battlefields',
  'graveyards',
  'ruins',
  'caves',
  'marine',
  'sewers',
  'mountains',
  'forests',
  'plains',
  'deserts',
  'swamps',
  'summoning',
  'urban',
  'valleys',
  'skellige',
  'nilfgaard',
] as const;

/**
 * Ordered list of all 9 Humanoid encounter environments.
 */
export const HUMANOID_ENVIRONMENTS: readonly HumanoidEnvId[] = [
  'everywhere',
  'roads',
  'urban',
  'forests',
  'marine',
  'mahakam',
  'mountains',
  'ruins',
  'skellige',
] as const;

/**
 * Combined ordered list of all 19 encounter environments for bestiary filtering.
 */
export const ALL_ENVIRONMENTS: readonly EncounterEnvId[] = [
  'everywhere',
  'urban',
  'roads',
  'forests',
  'plains',
  'mountains',
  'valleys',
  'caves',
  'ruins',
  'battlefields',
  'graveyards',
  'swamps',
  'marine',
  'sewers',
  'deserts',
  'summoning',
  'mahakam',
  'skellige',
  'nilfgaard',
] as const;

/**
 * Ordered list of all 12 normalized creature & faction taxonomy categories.
 */
export const CREATURE_TYPES: readonly CreatureTypeId[] = [
  'humanoid',
  'necrophage',
  'specter',
  'beast',
  'cursed',
  'hybrid',
  'insectoid',
  'elemental',
  'relict',
  'ogroid',
  'draconid',
  'vampire',
] as const;

/**
 * Localized labels for every creature taxonomy category.
 */
export const CREATURE_TYPE_LABELS: Record<CreatureTypeId, LocalizedText> = {
  humanoid: { fr: 'Humanoïde', en: 'Humanoid' },
  necrophage: { fr: 'Nécrophage', en: 'Necrophage' },
  specter: { fr: 'Spectre', en: 'Specter' },
  beast: { fr: 'Bête', en: 'Beast' },
  cursed: { fr: 'Maudit', en: 'Cursed One' },
  hybrid: { fr: 'Hybride', en: 'Hybrid' },
  insectoid: { fr: 'Insectoïde', en: 'Insectoid' },
  elemental: { fr: 'Élémentaire', en: 'Elemental' },
  relict: { fr: 'Relictuel', en: 'Relict' },
  ogroid: { fr: 'Ogroïde', en: 'Ogroid' },
  draconid: { fr: 'Draconide', en: 'Draconid' },
  vampire: { fr: 'Vampire', en: 'Vampire' },
};

/**
 * Localized labels for every habitat & region identifier.
 */
export const ENVIRONMENT_LABELS: Record<EncounterEnvId, LocalizedText> = {
  everywhere: { fr: 'Partout', en: 'Everywhere' },
  battlefields: { fr: 'Champs de bataille', en: 'Battlefields' },
  graveyards: { fr: 'Cimetière', en: 'Graveyards' },
  ruins: { fr: 'Ruines', en: 'Ruins' },
  caves: { fr: 'Grottes', en: 'Caves' },
  marine: { fr: 'Marin', en: 'Marine / Aquatic' },
  sewers: { fr: 'Égouts', en: 'Sewers' },
  mountains: { fr: 'Montagnes', en: 'Mountains' },
  forests: { fr: 'Forêts', en: 'Forests' },
  plains: { fr: 'Plaines', en: 'Plains' },
  deserts: { fr: 'Déserts', en: 'Deserts' },
  swamps: { fr: 'Marécages', en: 'Swamps' },
  summoning: { fr: 'Invocation', en: 'Summoning' },
  urban: { fr: 'Urbain', en: 'Urban' },
  valleys: { fr: 'Vallées', en: 'Valleys' },
  roads: { fr: 'Routes', en: 'Roads' },
  mahakam: { fr: 'Mahakam', en: 'Mahakam' },
  skellige: { fr: 'Skellige', en: 'Skellige' },
  nilfgaard: { fr: 'Nilfgaard', en: 'Nilfgaard' },
};

/**
 * Returns the localized label for a normalized creature type ID.
 */
export function getCreatureTypeLabel(
  typeId: CreatureTypeId,
  lang: CompendiumLanguage
): string {
  return CREATURE_TYPE_LABELS[typeId][lang];
}

/**
 * Returns the localized label for a normalized environment ID.
 */
export function getEnvironmentLabel(
  envId: EncounterEnvId,
  lang: CompendiumLanguage
): string {
  return ENVIRONMENT_LABELS[envId][lang];
}
