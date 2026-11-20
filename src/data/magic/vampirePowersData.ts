import type { MagicEntry } from './types';

/**
 * Higher Vampire supernatural powers & abilities (8 entries).
 */
export const VAMPIRE_POWERS_DATA: readonly MagicEntry[] = [
  {
    "id": "vp-celerite",
    "name": {
      "en": "Celerity",
      "fr": "Célérité"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "novice",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "5+",
    "range": "-",
    "duration": "5 tours",
    "defense": "-",
    "effect": "Le Vampire investit son Endurance afin d'augmenter sa Vitesse (et accorde sa Course en concordance) de +2 tous les 5 Points d'END investit. Le Vampire atteint donc +8 au maximum de sa forme, et atteint une Vitesse Surnaturelle et n'est presque plus visible à l’œil humain. Le sort peut être maintenu au prix de 5 END /Round. Si le Vampire charge avec une pleine vitesse, la cible doit faire un jet de vigilance en opposition à l'incantation du Vampire, s'il échoue, il sera sans défense et ne pourra pas esquiver."
  },
  {
    "id": "vp-saut",
    "name": {
      "en": "Leap",
      "fr": "Saut"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "novice",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "5+",
    "range": "-",
    "duration": "immédiat et personnel",
    "defense": "-",
    "effect": "Le Vampire impulse une puissante force dans ses jambe et peut ainsi s'élever à plusieurs mètres au-dessus du sol. S'il attaque un ennemis, il bénéficie de +3 à l'attaque et +1d6 dégât. Pour chaque pallier de 5 points d'END, le Vampire s'élève de 2 mètre en plus de son SAUT naturel ; au meilleur de sa forme, le Vampire peut s'élever à plus 8 mètre au-dessus de sa valeur de SAUT."
  },
  {
    "id": "vp-nuee-de-chauves-souris",
    "name": {
      "en": "Bat Swarm",
      "fr": "Nuée de chauves-souris"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "novice",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "10+",
    "range": "-",
    "duration": "5 tours",
    "defense": "-",
    "effect": "Le vampire invoque des nuées de Chauve-souris afin d'attaquer ses ennemis. Pour chaque pallier de 10 points d'END dépensé, le Vampire invoque une nuée de Chauve-souris de plus. Au sommet de sa forme, le Vampire peut invoquer 4 nuées de chauve-souris. Le fait de les invoquer immobilise le Vampire dans sa concentration, et s'il est attaqué, il devra ré-invoquer ses chauvesouris. Chaque attaque de nuée inflige 4d6, et le lanceur peut prolonger la durée des nuées en dépensant 5 END/Round."
  },
  {
    "id": "vp-corps-brumeux",
    "name": {
      "en": "Mist Form",
      "fr": "Corps Brumeux"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "journeyman",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "15",
    "range": "-",
    "duration": " jusqu'à la prochaine transformation ou épuisement",
    "defense": "-",
    "effect": "Le Vampire peut dissiper son corps en une brume surnaturelle, il devient donc impossible à attaquer. Sous forme de Brume, le Vampire volette et atteint sa COURSE x 2 afin de se déplacer. Il doit dépenser 5 points d'END pour maintenir cette forme par Round ou jusqu'à épuisement (attention à la réception !)."
  },
  {
    "id": "vp-parler-aux-animaux",
    "name": {
      "en": "Speak with Animals",
      "fr": "Parler aux Animaux"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "journeyman",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "15",
    "range": "-",
    "duration": "5 minutes",
    "defense": "-",
    "effect": " Le Vampire sonde les âmes animales afin de leur parler. Cela peut permettre d'interagir avec eux s'ils ne sont pas agressifs, en ce cas, il peut tenter de les calmer. Cette Capacité Magique n'est pas visible aux humains, s'ils voient le Vampire, ils verront juste un homme parler à des animaux."
  },
  {
    "id": "vp-illusion",
    "name": {
      "en": "Illusion",
      "fr": "Illusion"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "master",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "25+",
    "range": "-",
    "duration": "Jusqu'à ce que le Vampire ou quelqu'un dissipe l'illusion, en le touchant ou le dissipant.",
    "defense": "-",
    "effect": "Le Vampire peut dissimuler des éléments petits, à plus haut niveau, il peut dissimuler une entrée de caverne. De base, l'illusion fait 1m de diamètre, au delà, par pallier de 5, l'illusion augmente d'un mètre de diamètre. Au plus haut, le Vampire peut créer des illusions de 4m de diamètre."
  },
  {
    "id": "vp-polymorphisme",
    "name": {
      "en": "Polymorph",
      "fr": "Polymorphisme"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "master",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "32",
    "range": "-",
    "duration": "jusqu'au nouveau lancement",
    "defense": "-",
    "effect": "Polymorphisme permet de prendre la forme d'un Loup ou une grosse chauve-souris. Sous cette forme, vous avez les caractéristiques physiques de l'animal (voir le Bestiaire page 310). Les objets que vous portez se transforment avec vous. Vous devez relancer le sort pour reprendre forme humaine."
  },
  {
    "id": "vp-dispersion-en-nuee",
    "name": {
      "en": "Swarm Dispersion",
      "fr": "Dispersion en Nuée"
    },
    "schoolId": "vampire-spell",
    "school": {
      "en": "Vampire Power",
      "fr": "Pouvoir vampirique"
    },
    "tier": "master",
    "source": "vampire",
    "grimoireEligible": false,
    "stamina": "35",
    "range": "-",
    "duration": "jusqu'au nouveau lancement",
    "defense": "-",
    "effect": " Le Vampire peut se transformer en une épaisse nuée de chauve-souris ou de Rats afin d'échapper à une situation dangereuse ou simplement voyager.Vous devez relancer le sort pour reprendre forme humaine"
  }
];
