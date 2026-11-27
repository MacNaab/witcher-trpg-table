import type { MagicEntry } from './types';

/**
 * Higher Vampire supernatural magic ("Magie Vampirique", 8 entries — Fan Rules by Lancelot Von See).
 * Unlike standard elemental or druidic magic, Vampiric Magic is instinctive and corporeal.
 */
export const VAMPIRE_POWERS_DATA: readonly MagicEntry[] = [
  {
    id: 'vp-celerite',
    name: {
      en: 'Celerity',
      fr: 'Célérité',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'novice',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '5+',
    range: '-',
    duration: '5 rounds',
    defense: 'Vigilance vs Incantation',
    effect:
      "Le Vampire investit son Endurance afin d'augmenter sa Vitesse (et accorde sa Course en concordance) de +2 tous les 5 Points d'END investis. Il atteint donc +8 au maximum, accède à une vitesse surnaturelle et devient presque invisible à l'œil humain. Peut être maintenu pour 5 END/round. Lors d'une charge à pleine vitesse, la cible doit réussir un jet de Vigilance en opposition à l'Incantation du Vampire sous peine d'être sans défense et incapable d'esquiver.",
  },
  {
    id: 'vp-saut',
    name: {
      en: 'Leap',
      fr: 'Saut',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'novice',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '5+',
    range: '-',
    duration: 'Immédiat et personnel',
    defense: '-',
    effect:
      "Le Vampire impulse une puissante force dans ses jambes pour s'élever à plusieurs mètres du sol. S'il attaque un ennemi, il bénéficie de +3 à l'attaque et +1d6 dégâts. Par palier de 5 points d'END, il s'élève de 2 m en plus de son SAUT naturel (jusqu'à +8 m au-dessus de sa valeur de SAUT).",
  },
  {
    id: 'vp-nuee-de-chauves-souris',
    name: {
      en: 'Bat Swarm',
      fr: 'Nuée de chauves-souris',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'novice',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '10+',
    range: '-',
    duration: '5 rounds',
    defense: '-',
    effect:
      "Le Vampire invoque des nuées de chauves-souris pour attaquer ses ennemis (+1 nuée par palier de 10 END dépensés, jusqu'à 4 nuées maximum). L'invocation immobilise le Vampire dans sa concentration ; s'il est attaqué, il doit réinvoquer ses nuées. Chaque attaque de nuée inflige 4d6 dégâts. Prolongeable pour 5 END/round.",
  },
  {
    id: 'vp-corps-brumeux',
    name: {
      en: 'Mist Form',
      fr: 'Corps Brumeux',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'journeyman',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '15',
    range: '-',
    duration: "Jusqu'à dissipation ou épuisement",
    defense: '-',
    effect:
      "Le Vampire dissipe son corps en une brume surnaturelle et devient impossible à attaquer. Sous forme de brume, il volette avec une vitesse de déplacement égale à sa COURSE × 2. Maintien : 5 END/round jusqu'à annulation ou épuisement (attention à la chute en cas d'épuisement !).",
  },
  {
    id: 'vp-parler-aux-animaux',
    name: {
      en: 'Speak with Animals',
      fr: 'Parler aux Animaux',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'journeyman',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '15',
    range: '-',
    duration: '5 minutes',
    defense: '-',
    effect:
      'Le Vampire sonde les âmes animales afin de leur parler, interagir avec elles si elles ne sont pas agressives ou tenter de les calmer. Cette capacité magique est imperceptible pour les humains, qui verront simplement un homme parler aux animaux.',
  },
  {
    id: 'vp-illusion',
    name: {
      en: 'Illusion',
      fr: 'Illusion',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'master',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '25+',
    range: '-',
    duration: "Jusqu'à dissipation ou contact",
    defense: '-',
    effect:
      "Le Vampire dissimule des éléments physiques (jusqu'à masquer une entrée de caverne à haut niveau). Diamètre de base : 1 m, augmenté de +1 m par palier de 5 END supplémentaires (jusqu'à 4 m de diamètre maximum).",
  },
  {
    id: 'vp-polymorphisme',
    name: {
      en: 'Polymorph',
      fr: 'Polymorphisme',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'master',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '32',
    range: '-',
    duration: "Jusqu'au nouveau lancement",
    defense: '-',
    effect:
      "Permet de prendre la forme d'un Loup ou d'une grosse chauve-souris, en adoptant ses caractéristiques physiques (Bestiaire p. 310). L'équipement porté se transforme avec le Vampire. Il faut relancer le sort pour reprendre forme humaine.",
  },
  {
    id: 'vp-dispersion-en-nuee',
    name: {
      en: 'Swarm Dispersion',
      fr: 'Dispersion en Nuée',
    },
    schoolId: 'vampire-spell',
    school: {
      en: 'Vampiric Magic',
      fr: 'Magie vampirique',
    },
    tier: 'master',
    source: 'vampire',
    grimoireEligible: false,
    stamina: '35',
    range: '-',
    duration: "Jusqu'au nouveau lancement",
    defense: '-',
    effect:
      'Le Vampire se disperse en une épaisse nuée de chauves-souris ou de rats afin de fuir une situation périlleuse ou de voyager rapidement. Il faut relancer le sort pour reprendre forme humaine.',
  },
];
