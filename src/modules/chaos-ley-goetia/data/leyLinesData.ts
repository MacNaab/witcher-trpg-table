import type { LeyElementDef } from '../types';

/**
 * Official Elemental Ley Lines data from "A Tome of Chaos" (02_compiling.md lines 67-115).
 */
export const LEY_ELEMENTS: readonly LeyElementDef[] = [
  {
    id: 'earth',
    name: { fr: 'Terre', en: 'Earth' },
    placesOfPowerExample: {
      fr: 'Menhirs anciens, dolmens profonds ou caverne cristalline',
      en: 'Ancient standing stones or deep cavern intersections',
    },
    signs: {
      fr: 'Végétation foisonnante, arbres noueux, motifs rocheux inhabituels.',
      en: 'Prevalent plant growth, gnarled trees, strange rock patterns.',
    },
    benefit: {
      fr: 'En lançant un sort de Terre sur la ligne, toute défense contre ce sort subit un malus de -4 (quelle que soit la défense).',
      en: 'While casting Earth magic at a Ley Line, anyone defending against your spell (any defense) takes -4 to their attempt.',
    },
    penalty: {
      fr: 'Votre connexion à la Ligne tellurique est rompue et le SD pour vous reconnecter augmente de +2.',
      en: 'Your connection to the Ley Line is severed and the DC to connect again rises by +2.',
    },
  },
  {
    id: 'air',
    name: { fr: 'Air', en: 'Air' },
    placesOfPowerExample: {
      fr: 'Cime de haute montagne balayée par les vents',
      en: 'Peak of a windswept mountain',
    },
    signs: {
      fr: 'Tourbillons de poussière fréquents, cirrus, odeur d’ozone.',
      en: 'Frequent dust devils, cirrus clouds, a smell of ozone.',
    },
    benefit: {
      fr: 'En puisant dans la ligne, vous pouvez lancer n’importe quel sort d’Air du même niveau qu’un sort d’Air déjà connu (sans l’apprendre, l’enseigner ni le copier sur parchemin).',
      en: 'While casting Air magic from a Ley Line, cast any Air spell of the same level as one you already know (without learning, teaching, or scribing it).',
    },
    penalty: {
      fr: 'Le sort part tout de même et coûte son Endurance initiale, mais le MJ choisit un autre sort d’Air du même niveau à votre place.',
      en: 'The spell goes off and still costs its initial Stamina, but the GM chooses a different Air spell of the same level instead.',
    },
  },
  {
    id: 'fire',
    name: { fr: 'Feu', en: 'Fire' },
    placesOfPowerExample: {
      fr: 'Bord d’un cratère volcanique ou faille brûlante',
      en: 'Rim of a volcano or scorching fissure',
    },
    signs: {
      fr: 'Plantes desséchées, brume de chaleur, soleil aveuglant.',
      en: 'Withered plants, heat haze, glaring sunlight.',
    },
    benefit: {
      fr: 'Ajoutez +2 dés de dégâts à tout sort de Feu offensif et portez ses chances d’enflammer à 100 %.',
      en: 'Add +2 damage dice to any damaging Fire spell and raise any chance to ignite to 100%.',
    },
    penalty: {
      fr: 'Vous devez dépenser à nouveau de l’Endurance et une action supplémentaire pour relancer le même sort sur une cible aléatoire.',
      en: 'You must spend extra Stamina and take another action to cast the same spell again at a random target.',
    },
  },
  {
    id: 'water',
    name: { fr: 'Eau', en: 'Water' },
    placesOfPowerExample: {
      fr: 'Delta fluvial ou confluent brumeux',
      en: 'River delta or misty confluence',
    },
    signs: {
      fr: 'Humidité anormale, cours d’eau contre-nature, marées extrêmes.',
      en: 'Unnatural humidity, erratic water flow, extreme tides.',
    },
    benefit: {
      fr: 'Votre compétence Exercice de la magie est considérée supérieure de +2 points pour les sorts d’Eau.',
      en: 'Your Spell Casting skill is treated as +2 higher while casting Water magic.',
    },
    penalty: {
      fr: 'Vous subissez de vives hallucinations contrôlées par le MJ jusqu’à quitter la ligne et jusqu’à 1 minute ensuite.',
      en: 'You suffer vivid GM-controlled hallucinations until disconnecting from the Ley Line and for up to 1 minute after.',
    },
  },
];
