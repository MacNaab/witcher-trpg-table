import type { TalentEntry } from './types';

/**
 * Official Druid skill-tree talents from A Tome of Chaos (`guide/A Tome Of Chaos/05_druids.md`).
 */
export const DRUID_PROFESSION_TALENTS: readonly TalentEntry[] = [
  // Branch 1: Initié (Initiate)
  {
    id: 'tl-druid-harmonisation-naturelle',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Initié',
    name: 'Harmonisation naturelle',
    description:
      'Le Druide s’harmonise avec la nature et gagne 1 point de seuil de Vigueur par niveau jusqu’au rang 9. Au rang 10, son seuil de Vigueur augmente de 5 points supplémentaires pour atteindre un total de 16. Peut être entraînée comme une compétence ordinaire.',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-dechiffrer-la-nature',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Initié',
    name: 'Déchiffrer la nature (INT)',
    attribute: 'INT',
    description:
      'En pleine nature, le Druide effectue un jet de Déchiffrer la nature (SD fixé par le MJ) pour lire les signes alentour et connaître tout ce qui est passé dans la zone au cours de la dernière semaine et ce que chaque créature y a fait. Fournit une image très localisée sans permettre de suivre une piste.',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-pacte-animal',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Initié',
    name: 'Pacte animal (VOL)',
    attribute: 'VOL',
    description:
      'Le Druide ajoute son rang de Pacte animal à tous ses jets de Survie pour gérer des animaux. Par une action complète et un jet de Pacte animal (SD fixé par le MJ), il peut faire d’une Bête ou d’un animal son allié pendant un nombre d’heures égal à son niveau. Sans effet sur les monstres.',
    isCoreProfession: true,
  },

  // Branch 2: Sage mystique (Mystic Sage)
  {
    id: 'tl-druid-gardien-du-savoir',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Sage mystique',
    name: 'Gardien du savoir',
    description:
      'L’initiation au Cercle exige de mémoriser d’innombrables traditions orales. Le Druide peut remplacer ses jets de Survie, Connaissance des monstres, Psychologie ou Éducation par son score de Gardien du savoir.',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-sang-et-os',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Sage mystique',
    name: 'Sang et Os (VOL)',
    attribute: 'VOL',
    description:
      'En jetant des osselets dans un bol rempli du sang d’un sujet, le Druide tente d’altérer son destin contre SD 10 + VOL de la cible. En cas de réussite, la cible ajoute la moitié du rang de Sang et Os à un jet avant le prochain lever du soleil. En cas d’échec, elle est immunisée pendant 1 semaine (1 fois max par session et par cible).',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-forme-bestiale',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Sage mystique',
    name: 'Forme bestiale',
    description:
      'Des rituels anciens permettent au Druide d’adopter sans action une forme hybride mêlant des traits animaux. Tous les 2 rangs de Forme bestiale, il ajoute un aspect animal issu du tableau de Métamorphose. Sous cette forme, il peut parler aux animaux des espèces intégrées mais devient Haï et Craint des non-druides.',
    isCoreProfession: true,
  },

  // Branch 3: Militant
  {
    id: 'tl-druid-soigneur-des-betes',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Militant',
    name: 'Soigneur des bêtes (TEC)',
    attribute: 'TEC',
    description:
      'Habitué à secourir la faune sauvage, le Druide peut utiliser Soigneur des bêtes pour soigner les Blessures Critiques infligées aux Bêtes et animaux, exactement comme la compétence Mains thérapeutiques du Docteur.',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-bosquet-sacre',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Militant',
    name: 'Bosquet sacré (VOL)',
    attribute: 'VOL',
    description:
      'En 1 heure, le Druide consacre une zone naturelle de 20 m de rayon. Le résultat de son jet de Bosquet sacré sert de budget de points pour y activer des protections du tableau Bosquet sacré (lui et les personnes désignées en sont immunisés). Chaque bosquet dure 3 mois ; nombre maximal égal au rang de Bosquet sacré.',
    isCoreProfession: true,
  },
  {
    id: 'tl-druid-gardien-du-bosquet',
    professionId: 'druid',
    profession: { en: 'Druid', fr: 'Druide' },
    branch: 'Militant',
    name: 'Gardien du bosquet (VOL)',
    attribute: 'VOL',
    description:
      'Par une action complète et un jet de Gardien du bosquet contre SD 10 + COR de l’animal, la bête double de taille, gagne +5 en COR (statistiques dérivées incluses) et +5 aux dégâts, et attaque férocement les ennemis du Druide. Dure 24 h et réduit le seuil de Vigueur du Druide de 5 durant cet intervalle.',
    isCoreProfession: true,
  },
];
