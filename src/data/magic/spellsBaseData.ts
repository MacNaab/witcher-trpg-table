import type { MagicEntry } from './types';

/**
 * Official Witcher TRPG magic: Mages, Druids, Priests, Archpriests, Signs, Rituals, and Hexes (124 entries).
 */
export const SPELLS_BASE_DATA: readonly MagicEntry[] = [
  {
    "id": "sp-magic-compass",
    "name": {
      "en": "Magic Compass",
      "fr": "Compas magique"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "personnelle",
    "duration": "1d6 heures",
    "defense": "aucune",
    "effect": "Compas magique permet de déterminer instantanément la direction vers un endroit où vous êtes déjà allé auparavant. Sinon, le sort indique le nord."
  },
  {
    "id": "sp-dispel",
    "name": {
      "en": "Dispel",
      "fr": "Dissipation"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "variable",
    "range": "10 m",
    "duration": "instantané",
    "defense": "Incantation",
    "effect": "Dissipation met fin à un sort, un rituel ou une malédiction en cours dans sa portée. Ce sort permet d’annuler une magie qui dure et peut être utilisé comme une action défensive pour bloquer une attaque magique avec ou sans composants. Pour annuler un effet magique, vous devez dépenser la moitié des points de Résilience utilisés par le lanceur et réussir un jet d’Incantation en opposition à son jet pour lancer le sort."
  },
  {
    "id": "sp-glamour",
    "name": {
      "en": "Glamour",
      "fr": "Glamour"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "personnelle",
    "duration": "1d6 heures",
    "defense": "aucune",
    "effect": "Glamour vous permet de mettre une illusion autour de vous qui vous fait paraître éblouissant. Ce sort vous donne un bonus de +3 en Séduction, Charisme et Commandement."
  },
  {
    "id": "sp-summon-staff",
    "name": {
      "en": "Summon Staff",
      "fr": "Invocation de bâton"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "–",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Invocation de bâton vous permet de dématérialiser votre bâton et le téléporter à un endroit où vous avez été présent au cours du dernier jour. Vous pouvez lancer à nouveau le sort pour faire revenir le bâton à vous."
  },
  {
    "id": "sp-mind-manipulation",
    "name": {
      "en": "Mind Manipulation",
      "fr": "Manipulation de l’esprit"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5 m",
    "duration": "1d10 rounds",
    "defense": "Résistance à la magie",
    "effect": "Manipulation de l’esprit vous permet de forcer votre cible à ressentir l’une de ces émotions pendant la durée du sort: haine, amour, dépression ou euphorie."
  },
  {
    "id": "sp-afans-mirror",
    "name": {
      "en": "Afan’s Mirror",
      "fr": "Miroir d’Afan"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "10 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "inventé par le talentueux magicien aedirnien Afan de Guletta, le Miroir d’Afan crée 1d10 copies illusoires du lanceur. Ces copies sont intangibles, mais impossibles à différencier du lanceur, qui les contrôle par l’esprit. Contrôler ces copies ne demande pas d’action, mais elles ne peuvent pas se déplacer au-delà de la portée du sort."
  },
  {
    "id": "sp-blinding-dust",
    "name": {
      "en": "Blinding Dust",
      "fr": "Poussière aveuglante"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "4 m",
    "duration": "1d10 rounds",
    "defense": "Esquive ou Blocage",
    "effect": "la poussière aveuglante vous permet de lancer une poussière magique dans les yeux d’une cible afin de l’aveugler pour la durée du sort."
  },
  {
    "id": "sp-telepathy",
    "name": {
      "en": "Telepathy",
      "fr": "Télépathie"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "10 m",
    "duration": "actif (1 END)",
    "defense": "aucune",
    "effect": "Télépathie vous permet de communiquer par télépathie avec une personne pendant la durée du sort, sans barrière de langage."
  },
  {
    "id": "sp-cenlly-graig",
    "name": {
      "en": "Cenlly Graig",
      "fr": "Cenlly Graig"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Cenlly Graig lance des pierres acérées sur votre adversaire. Lors de votre jet, pour chaque point qui dépasse la défense de votre adversaire (maximum 10), vous infligez 1d6 points dégâts. Chaque lancer compte comme une attaque à part entière."
  },
  {
    "id": "sp-codi-bywyd",
    "name": {
      "en": "Codi Bywyd",
      "fr": "Codi Bywyd"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "4 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Codi Bywyd permet de faire parvenir à maturité une graine en l’espace d’un round. Cela permet de faire pousser des herbes et des plantes alchimiques, mais rien de plus grand, comme un arbre."
  },
  {
    "id": "sp-diagnostic",
    "name": {
      "en": "Diagnostic",
      "fr": "Diagnostic"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Diagnostic permet d’évaluer rapidement la santé d’une personne et de déterminer combien de points de santé elle a, ses blessures critiques et si elle est malade ou empoisonnée."
  },
  {
    "id": "sp-earth-spike",
    "name": {
      "en": "Earth Spike",
      "fr": "Pic terrestre"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "6 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Pic terrestre crée une stalagmite inclinée de manière à pouvoir poignarder la cible. Ce pic inflige 5d6 points de dégâts et reste en place jusqu’à être détruit. Il peut être détruit en lui infligeant 20 points de dégâts."
  },
  {
    "id": "sp-luthiens-quill",
    "name": {
      "en": "Luthien’s Quill",
      "fr": "Plume de Luthien"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "1 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "nommé ainsi d’après son créateur, Luthien de Ebbing, Plume de Luthien peut graver des écritures ou des dessins sur n’importe quelle surface solide. Le sort ne peut pas être utilisé sur une créature vivante."
  },
  {
    "id": "sp-talfryns-prison",
    "name": {
      "en": "Talfryn’s Prison",
      "fr": "Prison de Talfryn"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "10 m",
    "duration": "jusqu’à destruction",
    "defense": "Esquive",
    "effect": "Prison de Talfryn tient son nom de Talfryn de Nazair, un chevalier traître qui a été piégé trois jours durant dans le jardin du magicien Drystan. Le sort permet d’empêtrer une cible dans des racines. Il faut 15 points de dégâts pour détruire les racines. Autrement, pour s’en échapper, il faut un jet d’Esquive ou d’Évasion avec un SD égal à votre résultat pour lancer le sort."
  },
  {
    "id": "sp-magic-healing",
    "name": {
      "en": "Magical Healing",
      "fr": "Soins magiques"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "2 m",
    "duration": "1d10 rounds",
    "defense": "aucune",
    "effect": "Soins magiques stimule la régénération naturelle d’une cible en lui soignant 3 points de dégâts par round. L’effet dure pendant la durée du sort. Sinon, ce sort peut être utilisé à plusieurs reprises pour soigner une blessure critique."
  },
  {
    "id": "sp-koraths-breath",
    "name": {
      "en": "Breath of Korath",
      "fr": "Souffle de Korath"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "cône de 3 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Souffle de Korath démolit une surface de terre ou de pierre proche et pulvérise du sable brûlant dans un cône de 3 m devant le lanceur. Les adversaires dans cette zone qui ratent leur défense sont aveuglés pour 1d6 rounds."
  },
  {
    "id": "sp-uriens-shelter",
    "name": {
      "en": "Urien’s Shelter",
      "fr": "Abri d’Urien"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "rayon de 8 m",
    "duration": "1d6 heures",
    "defense": "aucune",
    "effect": "Abri d’Urien, créé par le magicien de l’air Urien de Cidaris, permet d’annuler les effets d’un temps hostile dans un rayon de 8 m autour du lanceur. Cela annule la chaleur et le froid extrêmes, la pluie et la neige."
  },
  {
    "id": "sp-adenydd",
    "name": {
      "en": "Adenydd",
      "fr": "Adenydd"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "personnelle",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Adenydd vous allège légèrement et crée une trajectoire de descente lorsque vous chutez. Ce qui signifie que pour 2 m de chute, vous avancez de 2 m dans une direction. Si vous touchez terre avant la fin du sort, vous ne subirez aucuns dégâts."
  },
  {
    "id": "sp-fresh-air",
    "name": {
      "en": "Fresh Air",
      "fr": "Air frais"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "rayon de 4 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Air frais dégage une zone d’un rayon de 4 m autour de vous de tout poison, fumée ou autre air vicié pendant la durée du sort."
  },
  {
    "id": "sp-air-pocket",
    "name": {
      "en": "Air Pocket",
      "fr": "Poche d’air"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "12 m",
    "duration": "2d10 rounds",
    "defense": "aucune",
    "effect": "Poche d’air crée une poche d’air frais sous l’eau ou dans tout autre endroit où il n’y a normalement pas d’air respirable. La poche fait un rayon de 1 m pendant toute la durée du sort."
  },
  {
    "id": "sp-bronwyns-gust",
    "name": {
      "en": "Bronwyn’s Gust",
      "fr": "Rafale de Bronwyn"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "2 m",
    "duration": "instantané",
    "defense": "Esquive",
    "effect": "Rafale de Bronwyn tire son nom du mage et pillard skellige, Bronwyn Œil-Sûr. Le sort permet de faire reculer une cible d’autant de mètres que le nombre de points supérieurs à la défense de l’adversaire sur votre jet. Cette attaque n’inflige que 1d6 points de dégâts, mais si votre adversaire percute quelque chose, il prend des dégâts d’éperonnage."
  },
  {
    "id": "sp-telekinesis",
    "name": {
      "en": "Telekinesis",
      "fr": "Télékinésie"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Télékinésie permet de soulever et manipuler un objet (jusqu’à 5 ENC par niveau d’Incantation) comme si vous le teniez."
  },
  {
    "id": "sp-static-storm",
    "name": {
      "en": "Static Storm",
      "fr": "Tempête statique"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "rayon de 5 m",
    "duration": "2d6 rounds",
    "defense": "aucune",
    "effect": "Tempête statique imprègne l’air d’électricité dans un rayon de 5 m autour du lanceur. Quiconque dans cette zone (à part le lanceur) porte une armure ou une arme en métal subit 2 points de dégâts par round."
  },
  {
    "id": "sp-zephyr",
    "name": {
      "en": "Zephyr",
      "fr": "Zéphyr"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "rayon de 2 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Zéphyr permet de faire éclater une rafale de vent qui repousse quiconque se trouve dans un rayon de 2 m autour de vous, d’autant de mètres que le nombre de points supérieurs à sa défense sur votre jet. Cette attaque n’inflige que 1d6 points de dégâts, mais si votre adversaire percute quelque chose, il subit des dégâts d’éperonnage."
  },
  {
    "id": "sp-aenye",
    "name": {
      "en": "Aenye",
      "fr": "Aenye"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "12 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Aenye permet de lancer une boule de feu pur sur un adversaire à portée du sort. Cette boule de feu inflige 4d6 points de dégâts et a 75 % de chances de mettre le feu à la cible."
  },
  {
    "id": "sp-aine-verseos",
    "name": {
      "en": "Aine Verseos",
      "fr": "Aine Verseos"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "1",
    "range": "rayon de 4 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Aine Verseos crée une zone de lumière vive dans un rayon de 4 m autour de vous."
  },
  {
    "id": "sp-fan-the-flames",
    "name": {
      "en": "Fan the Flames",
      "fr": "Attiser les flammes"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "10 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Attiser les flammes permet de propager un feu à une vitesse de 2 m par round dans n’importe quelle direction, réduire un feu à une simple flambée (ce qui réduit les dégâts de feu de –1) ou rendre le feu plus intense (ce qui augmente les dégâts de feu de +1)."
  },
  {
    "id": "sp-magic-flare",
    "name": {
      "en": "Magic Flare",
      "fr": "Éclat magique"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "rayon de 8 m",
    "duration": "instantané",
    "defense": "Résistance à la magie",
    "effect": "Éclat magique crée une lumière vive au-dessus de votre tête. Quiconque se trouve dans un rayon de 8 m doit faire un jet de Résistance à la magie ou être aveuglé pendant 1d6 rounds. Cet éclat est visible à 10 km."
  },
  {
    "id": "sp-brand-of-fire",
    "name": {
      "en": "Brand of Fire",
      "fr": "Marque incandescente"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "8 m",
    "duration": "instantané",
    "defense": "Bouclier magique",
    "effect": "Marque incandescente permet de marquer une cible d’un simple symbole ou mot, à n’importe quel endroit exposé de son corps. Cela inflige 1d6 points de dégâts à la cible et laisse une grande cicatrice permanente."
  },
  {
    "id": "sp-cadfans-grasp",
    "name": {
      "en": "Cadfan’s Grasp",
      "fr": "Poigne de Cadfan"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "8 m",
    "duration": "1d6 rounds",
    "defense": "aucune",
    "effect": "Poigne de Cadfan, d’après le magicien et forgeron Cadfan de Ebbing, permet de surchauffer un objet en métal, de manière à le rendre impossible à tenir en main et obligeant son porteur à le lâcher ou à subir 2d6 points de dégâts au membre qui le tient. Il est également possible de chauffer une arme en métal pour lui octroyer un bonus de +2d6 dégâts et 50 % de chances de mettre le feu à une cible."
  },
  {
    "id": "sp-tanio-ilchar",
    "name": {
      "en": "Tanio Ilchar",
      "fr": "Tanio Ilchar"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "8 m",
    "duration": "instantané",
    "defense": "Esquive",
    "effect": "Tanio Ilchar crée une explosion de feu dans une zone de 2 m sur 2 m. Il y a 100 % de chances d’enflammer une cible qui se trouve dans la zone."
  },
  {
    "id": "sp-wave-of-fire",
    "name": {
      "en": "Wave of Fire",
      "fr": "Vague de feu"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "cône de 3 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Vague de feu tire dans une direction un cône de feu de 3 m qui inflige 2d6 points de dégâts à quiconque ne peut pas esquiver ou bloquer et a 50 % de chances d’enflammer une cible."
  },
  {
    "id": "sp-ice-slick",
    "name": {
      "en": "Ice Slick",
      "fr": "Aire de glace"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "10 m",
    "duration": "2d10 rounds",
    "defense": "Esquive",
    "effect": "Aire de glace permet de créer une zone de glace de 2 m². Quiconque traverse cette zone doit faire un jet d’Athlétisme avec un SD égal à votre résultat d’Incantation ou déraper sur la glace."
  },
  {
    "id": "sp-downpour",
    "name": {
      "en": "Downpour",
      "fr": "Averse"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "8 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Averse crée une zone d’un rayon de 10 m de pluie qui éteint n’importe quel feu qu’elle touche. Ce sort contrecarre les effets du feu."
  },
  {
    "id": "sp-dormyns-fog",
    "name": {
      "en": "Dormyn’s Fog",
      "fr": "Brouillard de Dormyn"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "rayon de 10 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "inventé par Dormyn de Gemmery, Brouillard de Dormyn crée dans une zone d’un rayon de 10 m, centrée sur vous, un épais brouillard qui donne un malus de –3 en Vigilance à ceux qui s’y trouvent et limite la vision à 4 m."
  },
  {
    "id": "sp-control-water",
    "name": {
      "en": "Control Water",
      "fr": "Contrôle de l’eau"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "10 m",
    "duration": "actif (2 END)",
    "defense": "SD déterminé par le MJ",
    "effect": "Contrôle de l’eau permet de contrôle la vitesse à laquelle un plan d’eau bouge et dans quelle direction il va pendant la durée du sort. On peut l’utiliser pour ralentir de moitié une cible qui nage, réduire de moitié la vitesse d’un navire ou ralentir ou arrêter le courant d’une rivière."
  },
  {
    "id": "sp-carys-hail",
    "name": {
      "en": "Cary’s Hail",
      "fr": "Grêle de Cary"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "nommé ainsi d’après son créateur, Carys de Cintra, ce sort projette des plombs de glace à très haute vitesse sur un adversaire. Pour chaque point que vous obtenez au-dessus de l’Esquive ou du Blocage de votre adversaire (maximum 5), vous infligez 1d6 points de dégâts et avez 25 % de chances de geler votre opposant. Chaque jet est une attaque unique pour déterminer les dégâts et leur localisation."
  },
  {
    "id": "sp-curse-of-sedna",
    "name": {
      "en": "Curse of Sedna",
      "fr": "Malédiction de Sedna"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "12 m",
    "duration": "actif (2 END)",
    "defense": "Esquive",
    "effect": "appelé ainsi en référence aux eaux tumultueuses de l’Abysse de Sedna, considéré comme une destination suicidaire pour les bateaux, Malédiction de Sedna crée un puissant tourbillon sur une zone de 4 m. Quiconque se trouve dans les 5 m doit faire un jet de Natation ou être emporté sous l’eau. Il faut refaire un jet à chaque tour ou rester sous l’eau et commencer à suffoquer."
  },
  {
    "id": "sp-puro-dwr",
    "name": {
      "en": "Puro Dwr",
      "fr": "Puro Dwr"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "4 m",
    "duration": "1d10 rounds",
    "defense": "aucune",
    "effect": "Puro Dwr permet de purifier 1 m3  d’eau. Cela supprime le poison et la maladie, mais ça ne fera pas en sortir les créatures vivantes. S’il est lancé sur une petite portion d’une eau polluée, la zone visée recommencera à être polluée après la durée du sort."
  },
  {
    "id": "sp-rhewi",
    "name": {
      "en": "Rhewi",
      "fr": "Rhewi"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "8 m",
    "duration": "1d10 rounds",
    "defense": "Esquive",
    "effect": "Rhewi crée une épaisse couche de glace autour d’une cible pour la durée du sort. La cible est considérée comme gelée. S’il est utilisé sur une cible non vivante, elle ne peut plus être manipulée ou déplacée."
  },
  {
    "id": "sp-illusion",
    "name": {
      "en": "Illusion",
      "fr": "Illusion"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "20 m",
    "duration": "actif (4 END)",
    "defense": "Résistance à la magie",
    "effect": "Illusion permet de créer l’illusion visuelle que vous souhaitez à 20 m autour de vous. Quiconque rate son jet de Résistance à la magie voit l’illusion et y croit. Cependant, l’illusion ne peut être ni touchée, ni sentie, ni entendue."
  },
  {
    "id": "sp-eilharts-technique",
    "name": {
      "en": "Eilhart’s Technique",
      "fr": "Technique d’Eilhart"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "3 m",
    "duration": "instantané",
    "defense": "Résistance à la magie",
    "effect": "nommé ainsi d’après sa créatrice Philippa Eilhart, ce sort horrible permet de fouiller l’esprit d’une cible et d’en arracher des informations. Si vous réussissez votre jet d’Incantation, vous gagnez un bout d’information de la cible. Si la cible fait un échec critique sur sa défense, elle perd définitivement 1 point en INT."
  },
  {
    "id": "sp-teleportation",
    "name": {
      "en": "Teleportation",
      "fr": "Téléportation"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "N/A",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Téléportation vous permet de vous téléporter instantanément vers une destination que vous connaissez déjà. Vous ne pouvez emmener personne avec vous et vous ne pouvez emporter que les objets que vous avez sur vous ou en main. Si vous essayez d’emmener une personne avec vous, vous allez simplement vous téléporter et la laisser derrière. La téléportation requiert un jet d’Incantation (SD 15). En cas d’échec, vous vous retrouvez à 1d6 kilomètres de votre destination."
  },
  {
    "id": "sp-rhwystr-graig",
    "name": {
      "en": "Rhwystr Graig",
      "fr": "Rhwystr Graig"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "20 m",
    "duration": "jusqu’à destruction",
    "defense": "aucune",
    "effect": "Rhwystr Graig permet de créer un mur de pierre de 2 m sur 3 m avec 30 points de PA, n’importe où et dans n’importe quelle direction dans les 20 m. Ce mur reste jusqu’à ce qu’il soit détruit."
  },
  {
    "id": "sp-stammelfords-quake",
    "name": {
      "en": "Stammelford’s Tremors",
      "fr": "Séisme de Stammelford"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "30 m",
    "duration": "1d10 rounds",
    "defense": "Esquive",
    "effect": "Séisme de Stammelford permet d’ébranler la terre dans une zone de 10 m et créer un terrain irrégulier et qui s’écroule, infligeant à tout le monde dans la zone un malus de –2 aux Réflexes et de –3 à la VIT. Les petites structures qui se trouvent sur le terrain secoué ont 10 % de chances d’être détruites. À chaque tour, une créature se trouvant dans la zone du sort doit faire un jet d’Athlétisme ou se retrouver plongée sous la terre qui s’écroule, ce qui la fera suffoquer jusqu’à ce qu’elle réussisse un jet d’Athlétisme pour grimper en dehors. À la fin du sort, la terre cesse de remuer, mais elle reste chamboulée."
  },
  {
    "id": "sp-elgans-theory",
    "name": {
      "en": "Elgan’s Theory",
      "fr": "Théorie d’Elgan"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "8 m",
    "duration": "2d10 rounds",
    "defense": "aucune",
    "effect": "Théorie d’Elgan a été découvert par Elgan de Verden, qui a voyagé au cœur de Mahakam et a étudié pendant des années la magie de la terre. Ce sort permet de magnétiser un objet en métal dans les 8 m. Tout objet en métal se trouvant dans les 2 m est attiré et collé à l’aimant. Un jet de Physique (SD 18) permet de détacher l’objet. Tout métal qui vient se coller contre l’arme ou l’armure de quelqu’un compte pour l’ENC."
  },
  {
    "id": "sp-gwynt-troelli",
    "name": {
      "en": "Gwynt Troelli",
      "fr": "Gwynt Troelli"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "rayon de 10 m",
    "duration": "actif (4 END)",
    "defense": "aucune",
    "effect": "Gwynt Troelli crée une barrière de vent autour de vous afin de bloquer les attaques à distance et les projectiles. Toute attaque avec un projectile doit être supérieure à votre jet d’Incantation. En cas d’échec, la barrière renvoie le projectile à 8 m, dans une direction aléatoire."
  },
  {
    "id": "sp-suffocation",
    "name": {
      "en": "Suffocation",
      "fr": "Suffocation"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "14",
    "range": "10 m",
    "duration": "actif (4 END)",
    "defense": "Résistance à la magie",
    "effect": "fait suffoquer une cible pour 1d10 points de dégâts par round. La suffocation cesse si le lanceur du sort est frappé par une arme ou arrête de se focaliser sur le sort. Pendant qu’elle suffoque, une cible est considérée comme stupéfiée."
  },
  {
    "id": "sp-alzurs-thunder",
    "name": {
      "en": "Alzur’s Thunder",
      "fr": "Tonnerre d’Alzur"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "25 m",
    "duration": "instantané",
    "defense": "Esquive",
    "effect": "Tonnerre d’Alzur permet de projeter sur une cible un puissant éclair qui inflige 8d6 points de dégâts et a 75 % de chances d’enflammer la cible. Tonnerre d’Alzur peut aller en ligne droite à travers plusieurs cibles. Pour chaque cible traversée, les dégâts infligés à la cible suivante sont réduits de –1d6."
  },
  {
    "id": "sp-demetias-surge",
    "name": {
      "en": "Demetia’s Crest",
      "fr": "Afflux de Demetia"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "10 m",
    "duration": "actif (4 END)",
    "defense": "aucune",
    "effect": "Afflux de Demetia permet de créer autour de vous un bouclier de magie du feu pure qui bloque un nombre de sorts d’eau égal à deux fois votre niveau d’Incantation. Les projectiles qui pénètrent dans le bouclier sont détruits et les créatures vivantes ne peuvent pas entrer dans la zone protégée."
  },
  {
    "id": "sp-seirffs-grasp",
    "name": {
      "en": "Seirff’s Grasp",
      "fr": "Prise de Seirff"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "10 m",
    "duration": "2d10",
    "defense": "Esquive",
    "effect": "Prise de Seirff crée des serpents issus de la magie du feu qui déferlent sur une cible. Cette dernière est saisie et en feu jusqu’à ce qu’elle réussisse un jet d’Esquive/Évasion en opposition à votre jet d’Incantation. À chaque tour où la cible échoue sur son jet d’Esquive/Évasion, le SD augmente de +1, les serpents renforçant leur étreinte."
  },
  {
    "id": "sp-blazing-vortex",
    "name": {
      "en": "Blazing Vortex",
      "fr": "Vortex enflammé"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "rayon de 10 m",
    "duration": "actif (4 END)",
    "defense": "Esquive",
    "effect": "Vortex enflammé crée une tornade enflammée de 2 m de largeur. Vous pouvez diriger la tornade afin de la déplacer d’autant de mètres que votre niveau d’Incantation par tour. Si elle rencontre une cible, faites un jet d’Incantation opposé à son jet d’Esquive/Évasion. Si elle échoue, elle subit 5d6 points de dégâts et a 50 % de chances de prendre feu. Le vortex ne peut pas être déplacé au-delà de la portée du sort."
  },
  {
    "id": "sp-anialwch",
    "name": {
      "en": "Anialwch",
      "fr": "Anialwch"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "10 m",
    "duration": "instantané",
    "defense": "Résistance à la magie",
    "effect": "Anialwch permet d’aspirer du liquide du corps d’une cible, ce qui la blesse et l’épuise. Le sort inflige 4d6 points de dégâts qui ne peuvent pas être absorbés par l’armure ou le bouclier. La déshydratation extrême provoque une fatigue qui réduit l’END actuelle de la cible de 4d6."
  },
  {
    "id": "sp-merigolds-hailstorm",
    "name": {
      "en": "Merigold’s Hailstorm",
      "fr": "Grêle dévastatrice de Merigold"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "rayon de 30 m",
    "duration": "actif (4 END)",
    "defense": "Esquive",
    "effect": "nommé ainsi d’après sa créatrice Triss Merigold, ex-conseillère du roi Foltest de Téméria, Grêle dévastatrice de Merigold provoque une grêle qui encercle la zone du sort. À chaque tour, tous ceux qui sont pris dans la tempête doivent faire un jet d’Esquive/Évasion avec un SD égal à votre jet d’Incantation ou subir 2d6 points de dégâts sur une partie de leur corps."
  },
  {
    "id": "sp-wave-of-naglfar",
    "name": {
      "en": "Wave of the Naglfar",
      "fr": "Vague du Naglfar"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "rayon de 3 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "créé par un mage qui proclamait avoir assisté à la chevauchée de la Chasse Sauvage, ce sort crée une vague de glace magique qui se répand à 3 m à partir du lanceur dans toutes les directions. Quiconque n’esquive pas ou ne bloque pas le sort est gelé et subit 4d6 points de dégâts."
  },
  {
    "id": "sp-psychic-command",
    "name": {
      "en": "Psychic Command",
      "fr": "Commandement psychique"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "10 m",
    "duration": "jusqu’à la fin de la tâche",
    "defense": "Résistance à la magie",
    "effect": "Commandement psychique permet d’implanter un ordre dans l’esprit d’une cible. Ce commandement doit être exécuté à la lettre par la cible. Si le commandement implique quelque chose que la cible ne ferait jamais, elle obtient un bonus de +5 à son jet de Résistance à la magie."
  },
  {
    "id": "sp-portal",
    "name": {
      "en": "Portal",
      "fr": "Portail"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "10 m",
    "duration": "actif (6 END)",
    "defense": "aucune",
    "effect": "Portail crée un portail flottant de 1 m sur 2 m, jusqu’à 10 m du lanceur. Emprunter ce portail vous téléporte dans n’importe quel endroit dont vous pouvez vous souvenir. Le portail peut téléporter tout ce qui peut passer dedans en taille. Si le portail est refermé alors que quelque chose le traverse, il coupe l’objet (ou la créature) en deux. La personne est considérée comme démembrée, selon les blessures critiques bras arraché et jambe arrachée. Il est possible de créer un portail vers une destination inconnue, de la même manière que pour Téléportation."
  },
  {
    "id": "sp-polymorphism",
    "name": {
      "en": "Polymorph",
      "fr": "Polymorphisme"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "personnelle",
    "duration": "jusqu’au nouveau lancement du sort",
    "defense": "aucune",
    "effect": "Polymorphisme permet de prendre la forme d’un serpent, d’un chat, d’un oiseau ou d’un chien. Sous cette forme, vous avez les caractéristiques physiques de l’animal (voir le Bestiaire, page 310). Les objets que vous portez se transforment avec vous. Vous devez relancer le sort pour reprendre votre forme humaine."
  },
  {
    "id": "sp-transmutation",
    "name": {
      "en": "Transmutation",
      "fr": "Transmutation"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "2 m",
    "duration": "permanent",
    "defense": "aucune",
    "effect": "Transmutation permet de modifier les propriétés d’un minéral ou d’un métal. Vous pouvez changer une unité de métal en un autre métal ou transformer une gemme imparfaite en une gemme parfaite utilisable en magie. Le dimeritium ou les autres métaux au contact du dimeritium ne peuvent pas être créés ou modifiés par ce sort."
  },
  {
    "id": "sp-dervish",
    "name": {
      "en": "Dervish",
      "fr": "Derviche"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "rayon de 2 m",
    "duration": "actif (6 END)",
    "defense": "Esquive",
    "effect": "conçu par un mystérieux mage ophiri, Derviche permet de créer une tornade de 2 m autour du lanceur. Cette tornade dévie immédiatement les attaques à distance, à l’instar de Gwynt Troelli, et agit comme le sort Zéphyr contre quiconque se trouve à moins de 2 m du lanceur. Vous ne pouvez pas courir dans cette tornade ni attaquer en dehors. Mais si vous vous déplacez à moins de 2 m d’une cible, elle est affectée par Zéphyr."
  },
  {
    "id": "sp-thunderstorm",
    "name": {
      "en": "Thunderstorm",
      "fr": "Orage"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "20 m",
    "duration": "actif (6 END)",
    "defense": "Esquive",
    "effect": "Orage permet de déclencher un orage. Les éclairs tombent aléatoirement dans la zone. Quiconque (à part le lanceur) se trouve dans cette zone a 35 % de chances d’être touché par la foudre. En cas d’échec, il faut faire un jet d’Esquive/Évasion ou subir 8d6 points de dégâts au torse et avoir 75 % de chances d’être enflammé."
  },
  {
    "id": "sp-mirror-effect",
    "name": {
      "en": "Mirror Effect",
      "fr": "Effet miroir"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "20 m",
    "duration": "2d6 rounds",
    "defense": "Esquive ou Blocage",
    "effect": "Effet miroir crée un rayon de lumière aveuglant qui inflige 10d6 points de dégâts. Ce rayon peut être esquivé et bloqué (ce qui le bloque est détruit), mais il ne peut pas être dévié par le vent et ne peut être paré que par une surface réfléchissante, qui subit quand même des dégâts. Le rayon reflété part dans une direction aléatoire. Ce sort utilise les rayons du soleil et ne peut pas être utilisé là où le soleil n’entre pas. À la lueur de la lune ou lors des jours nuageux, les dégâts sont réduits de moitié."
  },
  {
    "id": "sp-melgars-fire",
    "name": {
      "en": "Melgar’s Fire",
      "fr": "Feu de Melgar"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "rayon de 40 m",
    "duration": "2d6 rounds",
    "defense": "Esquive ou Blocage",
    "effect": "ce sort est particulièrement connu pour le chaos qu’il sème dans les champs de la vallée du Pontar. Feu de Melgar provoque une pluie de boules de feu sur une immense zone. Quiconque (à part le lanceur) se trouve dans la zone a 75 % de chances d’être touché par une boule de feu. En cas d’échec, la victime doit se défendre avec un SD égal au jet d’Incantation du lanceur de sort ou subir 4d6 points de dégâts sur une localisation aléatoire, avec 75 % de chances d’être enflammé."
  },
  {
    "id": "sp-parting-the-waters",
    "name": {
      "en": "Parting the Waters",
      "fr": "Séparation des eaux"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "rayon de 10 m",
    "duration": "actif (6 END)",
    "defense": "aucune",
    "effect": "Séparation des eaux permet d’ouvrir une zone dégagée au milieu de l’eau, jusqu’à 10 m sur 100 m sur 10 m. Les poissons, monstres et autres créatures dans l’eau sont repoussés avec l’eau. Vous pouvez passer à travers le mur aussi facilement que pour entrer et sortir de l’eau, sans altérer les murs. Si le lanceur utilise ce sort alors qu’il est dans l’eau, il est aussi repoussé. La zone peut être créée dans n’importe quelle orientation, y compris verticale."
  },
  {
    "id": "sp-tryferi-gaeaf",
    "name": {
      "en": "Tryferi Gaeaf",
      "fr": "Tryferi Gaeaf"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "20 m",
    "duration": "1d10 rounds",
    "defense": "Esquive ou blocage",
    "effect": "Tryferi Gaeaf permet de lancer autant de pics de glace de 2 m que la moitié de votre niveau d’Incantation, vers autant de cibles que vous le souhaitez dans la portée du sort. Ces pics infligent 5d6 points de dégâts et, si les dégâts passent l’armure, ils gèlent l’adversaire et infligent 2 points de dégâts chaque round jusqu’à ce qu’ils soient cassés, par un jet de Physique (SD 20) ou en leur infligeant 20 points de dégâts. Sinon, les pics restent en place jusqu’à la fin du sort. Chaque attaque est résolue séparément."
  },
  {
    "id": "sp-friend-to-wild",
    "name": {
      "en": "Friend to the Wild",
      "fr": "Ami des espèces sauvages"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "1",
    "range": "personnelle ou 5 m",
    "duration": "1d6 heures",
    "defense": "Volonté de la créature × 3",
    "effect": "Ami des espèces sauvages octroie au lanceur un bonus de +3 en Survie pour dresser des animaux. L’invocation peut aussi apaiser un animal si le jet d’Incantation dépasse la VOL × 3 de l’animal."
  },
  {
    "id": "sp-natures-gift",
    "name": {
      "en": "Nature’s Gift",
      "fr": "Don de la nature"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "variable",
    "range": "2 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Don de la nature fait pousser une petite grappe de plantes comestibles dans n’importe quel sol. Ces plantes sont suffisantes pour nourrir autant de personnes pendant un jour que le nombre de points d’END dépensés."
  },
  {
    "id": "sp-sigil-of-unseen",
    "name": {
      "en": "Sigil of the Unseen",
      "fr": "Emblème de l’invisible"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "personnelle",
    "duration": "jusqu’à dissipation",
    "defense": "aucune",
    "effect": "en dessinant l’Emblème de l’invisible, vous couvrez une zone de 3 m avec des branches, des feuillages et autres éléments naturels afin d’obtenir une couverture visuelle totale. Cela vous octroie un bonus de +5 à la Discrétion, mais immobilise ceux qui se trouvent dans la zone et l’invocation doit être relancée pour se découvrir. Vous pouvez tailler à travers les broussailles en leur infligeant 10 points de dégâts."
  },
  {
    "id": "sp-curse-druid",
    "name": {
      "en": "Blight",
      "fr": "Maladiction"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "variable",
    "range": "8 m",
    "duration": "le jet de Résilience y met fin",
    "defense": "Résistance à la magie",
    "effect": "Maladiction rend une cible malade. La maladie se manifeste différemment, selon comment les points de Résilience sont dépensés. Avec 2 points, la cible est pliée en deux par la toux et stupéfiée. Avec 4 points, la cible est gravement malade et étourdie."
  },
  {
    "id": "sp-boiling-blood",
    "name": {
      "en": "Boiling Blood",
      "fr": "Sang bouillonnant"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "8 m",
    "duration": "1d10 rounds",
    "defense": "Volonté de la créature × 3",
    "effect": "Sang bouillonnant provoque la rage chez un animal ou un monstre non sensible à l’encontre d’une cible. La créature attaquera la cible choisie jusqu’à la fin du sort."
  },
  {
    "id": "sp-natures-eye",
    "name": {
      "en": "Nature’s Eye",
      "fr": "Vision naturelle"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "personnelle",
    "duration": "actif (1 END)",
    "defense": "aucune",
    "effect": "Vision naturelle permet de voir les créatures qui ne sont pas de ce royaume. Cela vous permet de voir les monstres à 50 m, même à travers les obstacles. Les monstres ainsi repérés apparaissent sous une version lumineuse d’eux-mêmes."
  },
  {
    "id": "sp-blessing-of-healing",
    "name": {
      "en": "Blessing of Healing",
      "fr": "Bénédiction de soins"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "2 m",
    "duration": "actif (3 END)",
    "defense": "aucune",
    "effect": "Bénédiction de soins déclenche le soin d’une cible, lui permettant de récupérer 3 points de santé par round. Cette bénédiction peut être utilisée plusieurs fois afin de soigner une blessure critique."
  },
  {
    "id": "sp-threads-of-life",
    "name": {
      "en": "Threads of Life",
      "fr": "Fils de vie"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "10 m",
    "duration": "actif (2 END)",
    "defense": "aucune",
    "effect": "Fils de vie vous permet de voir l’énergie vitale de chaque cible qui se trouve dans le rayon du sort, ce qui vous renseigne sur ses points de santé et les blessures critiques qu’elle a subies."
  },
  {
    "id": "sp-primal-wellspring",
    "name": {
      "en": "Primal Wellspring",
      "fr": "Réservoir primal"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "5 m",
    "duration": "2d6 rounds",
    "defense": "Résistance à la magie",
    "effect": "Réservoir primal permet de puiser dans la puissance primale d’une cible et la réveiller. Cela donne un bonus de +2 aux dégâts de Mêlée, mais un malus de –2 à l’INT pour la durée du sort."
  },
  {
    "id": "sp-celestial-song",
    "name": {
      "en": "Celestial Song",
      "fr": "Chant céleste"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "50 m",
    "duration": "actif (5 END)",
    "defense": "aucune",
    "effect": "le Chant céleste change le climat dans la zone autour de vous. Vous pouvez changer le climat en : ciel dégagé (pas de modificateur), nuageux (lumière du soleil réduite), pluie torrentielle (éteint les feux), tempête (–2 à la DEX pour les attaques à distance) ou orage (35 % de chances d’être touché par un éclair, équivalent au sort Orage)."
  },
  {
    "id": "sp-shape-nature",
    "name": {
      "en": "Shape Nature",
      "fr": "Façonner la nature"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "10 m",
    "duration": "1d10 rounds",
    "defense": "aucune",
    "effect": "Façonner la nature vous permet de créer un petit golem à partir d’un arbre proche. Le golem vous sert pendant toute la durée du sort puis retourne à son état d’arbre. S’il est tué, le golem ne rapporte que 2d10 unités de bois. Dans tous les autres cas, l’arbre agit comme un golem normal."
  },
  {
    "id": "sp-blessing-of-affection",
    "name": {
      "en": "Blessing of Affection",
      "fr": "Bénédiction d’affection"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "5 m",
    "duration": "1d10 rounds",
    "defense": "aucune",
    "effect": "la Bénédiction d’affection donne au lanceur un bonus de +3 au Charisme et à la Séduction pendant toute la durée du sort."
  },
  {
    "id": "sp-blessing-of-fortune",
    "name": {
      "en": "Blessing of Fortune",
      "fr": "Bénédiction de fortune"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "1",
    "range": "10 m",
    "duration": "jusqu’à ce qu’ils soient dépensés",
    "defense": "SD 12",
    "effect": "la Bénédiction de fortune octroie à la cible autant de points de CHA que la moitié de votre score au-dessus du SD (maximum 5)."
  },
  {
    "id": "sp-vault-of-lore",
    "name": {
      "en": "Vault of Lore",
      "fr": "Crypte de la connaissance"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "personnelle",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Crypte de la connaissance vous permet de fouiller dans votre esprit et de retrouver le moindre savoir ou souvenir, comme si vous étiez en train de le vivre."
  },
  {
    "id": "sp-cleansing-waters",
    "name": {
      "en": "Cleansing Waters",
      "fr": "Eaux purificatrices"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "1",
    "range": "5 m",
    "duration": "instantané",
    "defense": "Résistance à la magie",
    "effect": "Eaux purificatrices rend instantanément sa sobriété à la cible. Cette incantation permet de contrer l’alcool et les solutions alchimiques qui provoquent une intoxication."
  },
  {
    "id": "sp-holy-light",
    "name": {
      "en": "Holy Light",
      "fr": "Lumière sacrée"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "1",
    "range": "personnelle",
    "duration": "3d10 rounds",
    "defense": "aucune",
    "effect": "Lumière sacrée éclaire une zone, comme si le lanceur portait une torche. La lumière ne produit pas de chaleur et ne peut pas servir à mettre le feu à un autre objet, comme le ferait une torche."
  },
  {
    "id": "sp-web-of-lies",
    "name": {
      "en": "Web of Lies",
      "fr": "Toile de mensonges"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "8 m",
    "duration": "le jet d’Intelligence y met fin",
    "defense": "Résistance à la magie",
    "effect": "Toile de mensonges permet de brouiller les informations dans la tête d’une cible, ce qui lui fera douter de chaque bout d’information et de mémoire. Cela étourdit la cible jusqu’à ce qu’elle réussisse un jet sous son INT."
  },
  {
    "id": "sp-cleansing-fire",
    "name": {
      "en": "Cleansing Fire",
      "fr": "Feu purificateur"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "10 m",
    "duration": "jusqu’à extinction",
    "defense": "Résistance à la magie",
    "effect": "Feu purificateur enflamme une cible, ce qui lui inflige 3d6 points de dégâts et lui met le feu."
  },
  {
    "id": "sp-light-of-truth",
    "name": {
      "en": "Light of Truth",
      "fr": "Lumière de vérité"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "5 m",
    "duration": "actif (2 END)",
    "defense": "Résistance à la magie",
    "effect": "Lumière de vérité permet de créer une lumière blanche et brillante qui force une cible à dire la vérité. À chaque tour, la cible doit refaire un autre jet. Si elle échoue, elle doit répondre en toute honnêteté à une question."
  },
  {
    "id": "sp-holy-fortification",
    "name": {
      "en": "Holy Fortification",
      "fr": "Renforcement sacré"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "10 m",
    "duration": "instantané",
    "defense": "aucune",
    "effect": "Renforcement sacré renforce la volonté d’une cible et lui permet de faire un nouveau jet contre les effets de n’importe quel sort qui l’affecte à ce moment-là."
  },
  {
    "id": "sp-divine-portal",
    "name": {
      "en": "Divine Portal",
      "fr": "Portail divin"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "–",
    "duration": "1 round",
    "defense": "aucune",
    "effect": "Portail divin crée un portail pour un bref instant. Le portail ne dure qu’un round et vous permet de vous transporter vous-même ou d’autres personnes dans n’importe quel lieu dont vous avez souvenir. Sinon, ce portail fonctionne comme le sort de magicien Portail."
  },
  {
    "id": "sp-divine-wisdom",
    "name": {
      "en": "Divine Wisdom",
      "fr": "Sagesse divine"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "50 m",
    "duration": "actif (5 END)",
    "defense": "aucune",
    "effect": "Sagesse divine recherche la réponse à une question avec un puissant présage. Cette réponse ne peut pas prédire le futur. Le MJ détermine le SD selon la confidentialité de l’information."
  },
  {
    "id": "sp-benediction-de-mort",
    "name": {
      "en": "Blessing of Death",
      "fr": "Bénédiction de mort"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "10 m",
    "duration": "instantané",
    "defense": "Résistance à la magie",
    "effect": "En invoquant le pouvoir de l’Araignée à tête de lion, vous rompez les liens de vie qui retiennent une cible à ce monde. La cible doit réussir un jet de Résistance à la magie ou elle se retrouve en état de mort, comme si elle avait reçu les dégâts normaux. Cependant, si elle est soignée par un jet réussi de Premiers soins ou Mains thérapeutiques (SD 16), elle retrouve immédiatement les points de santé qu’il lui restait avant.",
    "deity": "Corram Agh Tera"
  },
  {
    "id": "sp-bravoure-de-freya",
    "name": {
      "en": "Freya’s Bravery",
      "fr": "Bravoure de Freya"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "rayon de 20 m",
    "duration": "20 rounds",
    "defense": "aucune",
    "effect": "en appelant au pouvoir de la déesse Freya, vous invoquez son esprit dans votre corps, ce qui vous entoure d’une lueur qui émane à 20 m dans toutes les directions. Quiconque se trouve dans cette zone est encouragé par l’amour et les conseils de Modron Freya. Il ou elle gagne une immunité à la crainte et 25 points de santé tant que le sort dure. En quittant la zone, l’effet perdure pendant 1d6 rounds. Ces rounds sont renouvelés si la personne entre de nouveau dans la zone d’invocation et en ressort. Cette invocation affecte aussi ceux qui ne croient pas en Freya, mais le pouvoir peut être refusé à ceux que le lanceur choisit.",
    "deity": "Freya"
  },
  {
    "id": "sp-chance-du-pere",
    "name": {
      "en": "Father’s Luck",
      "fr": "Chance du Père"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "personnelle/10 m",
    "duration": "1 heure",
    "defense": "aucune",
    "effect": "grâce au pouvoir accordé par Kreve, le Père de tout, vous vous entourez de providence. Pendant la durée du sort, vous pouvez dépenser autant de points de CHA que votre niveau d’Incantation x 3. Vous pouvez augmenter tous les jets que vous faites, mais vous pouvez aussi imposer des malus ou accorder des bonus aux jets de quiconque se trouve à moins de 10 m.",
    "deity": "Kreve"
  },
  {
    "id": "sp-flamme-immaculee",
    "name": {
      "en": "Immaculate Flame",
      "fr": "Flamme immaculée"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "rayon de 10 m",
    "duration": "1 heure",
    "defense": "Résistance à la magie",
    "effect": "en invoquant le pouvoir du Grand soleil, vous créez une aura brillante de feu immaculé qui apporte une luminosité élevée dans la zone autour. Cette aura de feu ne brûle pas ceux qui la touchent, mais elle fait fondre quiconque se trouve à l’intérieur. Les sorts d’eau ne peuvent être lancés dans la zone que si le jet d’Incantation du lanceur dépasse celui du prêtre du Grand soleil. De plus, n’importe quel monstre vulnérable à la lumière du soleil subit un double malus dans la zone.",
    "deity": "Le Feu Éternel"
  },
  {
    "id": "sp-jugement-eternel",
    "name": {
      "en": "Eternal Judgment",
      "fr": "Jugement éternel"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "10 m",
    "duration": "jusqu’à extinction",
    "defense": "Résistance à la magie",
    "effect": "grâce au pouvoir que le Feu Éternel vous procure, vous enflammez une cible d’un brillant feu blanc teinté de rouge. Le feu inflige le double des dégâts de feu normaux et ne peut être éteint que par la magie ou en immergeant complètement la cible sous l’eau pendant 3 rounds. Tout ce qui touche ce feu magique s’enflamme d’un feu normal et peut être éteint en un round complet.",
    "deity": "Le Grand Soleil"
  },
  {
    "id": "sp-repos-guerisseur",
    "name": {
      "en": "Healing Rest",
      "fr": "Repos guérisseur"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "5 m",
    "duration": "1 jour",
    "defense": "aucune",
    "effect": "grâce au pouvoir que vous procure Melitele, la déesse mère, vous pouvez plonger autant de personnes que votre niveau d’Incantation dans un profond coma où leur corps s’autoguérit. Elles ne peuvent pas agir pendant tout le repos et sont inconscientes de leur environnement, même si elles sont touchées, déplacées ou attaquées. À la fin du repos, les cibles reviennent avec leur santé pleine. Si elles souffraient de blessures critiques traitées, ces blessures sont soignées. Cela n’annule pas les malus permanents dus aux blessures critiques mortelles.",
    "deity": "Melitele"
  },
  {
    "id": "sp-yrden",
    "name": {
      "en": "Yrden",
      "fr": "Yrden"
    },
    "schoolId": "sign-basic",
    "school": {
      "en": "Basic Sign",
      "fr": "Signe de base"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "rayon de 3 m",
    "duration": "5 rounds",
    "defense": "aucune",
    "effect": "Yrden dessine sur le sol autour de vous un grand cercle magique. Tout ce qui entre dans ce cercle subit un malus à la VIT et aux RÉF (égal aux points d’END que vous dépensez) jusqu’à en ressortir. Toutes les créatures incorporelles qui pénètrent dans le cercle deviennent matérielles."
  },
  {
    "id": "sp-quen",
    "name": {
      "en": "Quen",
      "fr": "Quen"
    },
    "schoolId": "sign-basic",
    "school": {
      "en": "Basic Sign",
      "fr": "Signe de base"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "personnelle",
    "duration": "10 rounds ou jusqu’à épuisement",
    "defense": "aucune",
    "effect": "Quen crée un bouclier avec 5 points de santé par point d’END dépensé. Si vous échouez à vous défendre (ou que vous ne voulez/pouvez pas vous défendre) contre une attaque ou un effet infligeant des dégâts, ces dégâts sont infligés en priorité au bouclier Quen. Les dégâts létaux et non létaux réduisent d’autant les points de santé du bouclier. Si le bouclier Quen est réduit à 0 point de santé, les dégâts surnuméraires vous sont infligés et doivent pénétrer votre armure et votre éventuelle résistance aux dégâts afin d’impacter vos points de santé ou votre Endurance. Quen peut être utilisé pour se défendre contre les sorts pouvant être bloqués, mais est inefficace dans le cas contraire. Le signe ne protège pas non plus des dégâts infligés par un poison déjà absorbé/inoculé, une maladie ou la suffocation. Vous ne pouvez pas relancer à nouveau Quen tant que ses points de santé n’ont pas été épuisés ou qu’il ne s’achève (10 tours)."
  },
  {
    "id": "sp-aard",
    "name": {
      "en": "Aard",
      "fr": "Aard"
    },
    "schoolId": "sign-basic",
    "school": {
      "en": "Basic Sign",
      "fr": "Signe de base"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "cône de 2 m",
    "duration": "instantané",
    "defense": "Esquive",
    "effect": "Aard déclenche une vague de force télékinésique qui stupéfie les créatures avec 10 % de chances de les mettre à terre. Le pourcentage augmente de 10 % pour chaque point d’END dépensé."
  },
  {
    "id": "sp-igni",
    "name": {
      "en": "Igni",
      "fr": "Igni"
    },
    "schoolId": "sign-basic",
    "school": {
      "en": "Basic Sign",
      "fr": "Signe de base"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "cône de 2 m",
    "duration": "instantané",
    "defense": "Esquive ou Blocage",
    "effect": "Igni projette une vague d’étincelles et de feu qui inflige 1d6 points de dégâts par point d’END dépensé et a 50 % de chances de mettre le feu à tout ce qu’elle touche. Igni inflige toujours ses dégâts au torse, à moins qu’il ne soit utilisé à bout portant. Lorsqu’Igni est utilisé à bout portant, il peut prendre pour cible n’importe quelle localisation."
  },
  {
    "id": "sp-axii",
    "name": {
      "en": "Axii",
      "fr": "Axii"
    },
    "schoolId": "sign-basic",
    "school": {
      "en": "Basic Sign",
      "fr": "Signe de base"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "8 m",
    "duration": "jusqu’à s’en débarrasser",
    "defense": "Résistance à la magie",
    "effect": "Axii étourdit un adversaire jusqu’à ce qu’il réussisse un jet de sauvegarde contre l’étourdissement avec un malus de –1. Pour 2 points d’END supplémentaires dépensés, le jet de sauvegarde contre l’étourdissement est plus difficile de 1 point."
  },
  {
    "id": "sp-piege-magique",
    "name": {
      "en": "Magic Trap (Alt. Yrden)",
      "fr": "Piège magique"
    },
    "schoolId": "sign-alt",
    "school": {
      "en": "Alternate Sign",
      "fr": "Signe alternatif"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "rayon de 3 m",
    "duration": "1 round par point d’END",
    "defense": "Esquive ou Blocage",
    "effect": "Yrden crée désormais un piège magique qui prend un round à préparer. L’attaque de ce piège utilise votre jet d’Incantation et votre VOL et inflige 3d6 points de dégâts. Le piège lance une attaque contre l’adversaire la plus proche à chaque round."
  },
  {
    "id": "sp-bouclier-actif",
    "name": {
      "en": "Active Shield (Alt. Quen)",
      "fr": "Bouclier actif"
    },
    "schoolId": "sign-alt",
    "school": {
      "en": "Alternate Sign",
      "fr": "Signe alternatif"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "personnelle",
    "duration": "actif (END de départ)",
    "defense": "aucune",
    "effect": "Quen crée désormais un bouclier luisant autour de vous. Le bouclier a 10 PS pour chaque point de Résilience dépensé. À chaque round après le premier, vous devez dépenser un nombre de points de Résilience égal au coût d’END de départ pour garder le bouclier actif. Bouclier actif ne protège que vous, mais vous pouvez y inclure une autre personne si vous vous serrez l’un contre l’autre. Une fois dans le Bouclier actif, rien de tangible ne peut passer au travers dans un sens comme dans l’autre sans détruire le bouclier avant. Vous devez vous déplacer lentement pour que le bouclier reste actif, ce qui signifie que vous ne pouvez pas courir. Quand le bouclier prend fin, tout ce qui est adjacent à vous est repoussé de 2 m et subit 1d6 points de dégâts au torse. Cela inclut les objets, l’équipement et les alliés. Tout ce qui est enraciné dans le sol ou pèse plus de 226 kg n’est pas repoussé, mais subit tout de même les dégâts."
  },
  {
    "id": "sp-balayage-d-aard",
    "name": {
      "en": "Aard Sweep (Alt. Aard)",
      "fr": "Balayage d’Aard"
    },
    "schoolId": "sign-alt",
    "school": {
      "en": "Alternate Sign",
      "fr": "Signe alternatif"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "rayon de 4 m",
    "duration": "instantané",
    "defense": "Esquive",
    "effect": "Aard lance désormais une explosion de force télékinésique autour de vous. Pour chaque point d’END dépensé, tout ce qui est pris dans l’explosion a 10 % de chances d’être jeté à terre et stupéfié. L’explosion part dans toutes les directions en forme de sphère. Les créatures volantes touchées par Balayage d’Aard sont fauchées en plein vol et jetées à terre aussi."
  },
  {
    "id": "sp-langue-de-feu",
    "name": {
      "en": "Firestream (Alt. Igni)",
      "fr": "Langue de feu"
    },
    "schoolId": "sign-alt",
    "school": {
      "en": "Alternate Sign",
      "fr": "Signe alternatif"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "3 m",
    "duration": "actif (1/2 END de départ)",
    "defense": "Esquive ou Blocage",
    "effect": "Igni tire désormais de votre main un flot continu de feu et d’étincelles qui inflige 1d6 points de dégâts par point d’END dépensé et a 75 % de chances de mettre le feu à l’adversaire. Langue de feu doit être maintenu à chaque round avec la moitié de points d’END dépensés pour lancer le sort. Vous pouvez changer de cible à votre tour et le flot peut être dirigé contre une localisation corporelle précise."
  },
  {
    "id": "sp-marionnette",
    "name": {
      "en": "Puppet (Alt. Axii)",
      "fr": "Marionnette"
    },
    "schoolId": "sign-alt",
    "school": {
      "en": "Alternate Sign",
      "fr": "Signe alternatif"
    },
    "tier": "sign",
    "source": "official",
    "grimoireEligible": false,
    "stamina": "variable",
    "range": "8 m",
    "duration": "jusqu’à s’en débarrasser ou END dépensée",
    "defense": "Résistance à la magie",
    "effect": "Axii contrôle désormais l’esprit d’un adversaire, qui devient alors votre allié pendant autant de rounds que le nombre de points d’END dépensés pour le sort. À chaque round, la cible peut faire un jet de Résistance à la magie contre votre jet d’Incantation pour essayer de se libérer."
  },
  {
    "id": "sp-hydromancy",
    "name": {
      "en": "Hydromancy",
      "fr": "Hydromancie"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "-",
    "duration": "actif (2 END)",
    "defense": "-",
    "effect": "Hydromancie permet de fixer une petite flaque d’eau pour y apercevoir un évènement qui s’est passé au cours des deux derniers jours ou qui a lieu au moment même. Regarder un évènement du passé se fait sur le SD de base. Si vous essayez de voir un évènement qui se passe au moment même, augmentez le SD de +3. Si vous observez un évènement présent, si un magicien y est présent, il peut sentir l’augure avec un jet d’Exercice de la magie supérieur à votre jet de Rituels.",
    "craftTime": "5 rounds",
    "dc": "15 (18)",
    "components": "une petite quantité d’eau ou un bol d’eau, éclat de lune (×1), fruit de berbéris (×1), cinquième essence (×2), perle (×2), pétale de myrte blanc (×2)"
  },
  {
    "id": "sp-magical-message",
    "name": {
      "en": "Magical Message",
      "fr": "Message magique"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "-",
    "duration": "permanent",
    "defense": "-",
    "effect": "Message magique permet d’enregistrer un message de 5 minutes maximum dans une gemme ou un bout de verre gravé d’un emblème magique. Vous pouvez déterminer jusqu’à trois déclencheurs spécifiques qui activeront le message. Une fois lu, le message reste en dormance jusqu’au prochain déclencheur. Quand il est déclenché, une illusion du lanceur apparaît et délivre le message. S’il est enregistré dans une gemme parfaite, le message est aussi clair que si le ritualiste était physiquement présent.",
    "craftTime": "5 rounds",
    "dc": "12",
    "components": "cinquième essence (×1), solution de mercure (×1), verre (×1); Composants alternatifs : gemme parfaite (×1)"
  },
  {
    "id": "sp-pyromancy",
    "name": {
      "en": "Pyromancy",
      "fr": "Pyromancie"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "-",
    "duration": "actif (4 END)",
    "defense": "-",
    "effect": "Pyromancie permet de fixer un feu et y observer des évènements qui se passent au même moment. Pyromancie est plus dangereux qu’Hydromancie, ce qui le rend plus difficile à maintenir et impossible à regarder à l’envers. Cependant, il est plus facile de voir des évènements présents. Tout comme avec Hydromancie, un mage que vous observez ainsi peut sentir l’augure avec un jet d’Exercice de la magie supérieur à votre jet de Rituels.",
    "craftTime": "5 rounds",
    "dc": "15",
    "components": "un petit feu, cinquième essence (×2), cendres (×2), cire (×2), oeil de corbeau (×2), calcium equum (×5)"
  },
  {
    "id": "sp-ritual-of-magic",
    "name": {
      "en": "Ritual of Magic",
      "fr": "Rituel de magie"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "-",
    "duration": "une utilisation",
    "defense": "-",
    "effect": "le Rituel de magie crée un cercle magique qui renforce la tolérance à la magie, en accordant un bonus au seuil de Vigueur égal à la moitié du niveau de Rituels du lanceur. Ce bénéfice est accordé à la première personne avec des capacités magiques qui pénètre dans le cercle et se concentre dessus, et dure 5 heures. Autrement, le lanceur peut dépenser le cercle pour gagner 1d6/2 unités de cinquième essence.",
    "craftTime": "5 rounds",
    "dc": "15",
    "components": "poussière imprégnée (×1), craie (×2), soufre (×2), verre (×2)"
  },
  {
    "id": "sp-purification-ritual",
    "name": {
      "en": "Purification Ritual",
      "fr": "Rituel de purification"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "-",
    "duration": "instantané",
    "defense": "-",
    "effect": "Rituel de purification purifie le corps d’une cible de tout poison ou maladie. Quand il est activé, le lanceur fait un jet de Rituels contre un SD spécifique afin de nettoyer le corps de la cible. L’alcool et les drogues sont assez faciles, avec un SD 12. Les poisons et les huiles sont plus difficiles, avec un SD 15. Les maladies graves sont très difficiles à purifier, avec un SD 18. Rituel purificateur ne permet pas de soigner des épidémies telles que la catriona.",
    "craftTime": "5 rounds",
    "dc": "variable",
    "components": "feuille de balisse (×1), liqueur (×1), oeil de corbeau (×1), craie (×2), gui (×2)"
  },
  {
    "id": "sp-ritual-of-life",
    "name": {
      "en": "Ritual of Life",
      "fr": "Rituel de vie"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "-",
    "duration": "une utilisation",
    "defense": "-",
    "effect": "le Rituel de vie crée un cercle magique qui agit sur les capacités de guérison d’une cible qui se trouve à l’intérieur. Le cercle confère une régénération de 3 points de santé par round. Cette régénération dure 10 rounds, tant que la cible reste dans le cercle. Si la cible sort du cercle, il disparaît.",
    "craftTime": "5 rounds",
    "dc": "15",
    "components": "cendres (×2), craie (×2), racine de mandragore (×2)"
  },
  {
    "id": "sp-spell-jar",
    "name": {
      "en": "Spell Jar",
      "fr": "Jarre ensorcelée"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "-",
    "duration": "1d6 jours",
    "defense": "-",
    "effect": "Jarre ensorcelée crée un vortex magique dans une jarre en argile scellée. Ce vortex magique dure 1d6 jours et s’active quand la jarre est brisée. Quand elle est brisée, le vortex magique s’ouvre et un sort aléatoire de la liste ci-dessous est jeté. Lancez 1d10/2 :  1. Prison de Talfryn; 2. Zéphyr; 3. Tanio Ilchar; 4. Brouillard de Dormyn; 5. Tempête statique",
    "craftTime": "5 rounds",
    "dc": "15",
    "components": "cinquième essence (×1), cire (×1), craie (×1), fibre de han (×2), fil (×2), poussière imprégnée (×1), argile alluviale (×5)"
  },
  {
    "id": "sp-seance",
    "name": {
      "en": "Séance",
      "fr": "Séance de spiritisme"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "-",
    "duration": "permanent",
    "defense": "-",
    "effect": "Séance de spiritisme contacte l’esprit d’une personne décédée. La séance ramène l’âme sous forme d’un spectre qui a la conscience de la personne originelle. Le spectre garde tous les souvenirs, y compris celui de sa mort, et l’on peut lui parler à l’endroit où il a été enterré. Le spectre ne peut pas être renvoyé dans le royaume des morts sauf s’il le décide ou s’il est tué. La séance invoquera les esprits de la lignée de quelqu’un dans les 20 m, donc utiliser ce sort dans une crypte familiale n’est pas conseillé.",
    "craftTime": "5 rounds",
    "dc": "12",
    "components": "du sang de la personne décédée ou de quelqu’un de sa famille, racine de mandragore (×1), aconit (×2), soufre (×2), vitriocybe (×2)"
  },
  {
    "id": "sp-telecommunication",
    "name": {
      "en": "Telecommunication",
      "fr": "Télécommunication"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "-",
    "duration": "1 heure",
    "defense": "-",
    "effect": "Un télécommunicateur permet de communiquer avec une autre personne qui possède un télécommunicateur. Le rituel est simple, mais il nécessite que chaque participant ait un télécommunicateur et réalise le rituel. Cependant, il vous permet de communiquer à des distances phénoménales, même d’un bout à l’autre du Continent connu.",
    "craftTime": "5 rounds",
    "dc": "aucun",
    "components": "un télécommunicateur"
  },
  {
    "id": "sp-magic-barrier",
    "name": {
      "en": "Magic Barrier",
      "fr": "Barrière magique"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "-",
    "duration": "actif (2 END)",
    "defense": "-",
    "effect": "Barrière magique crée une barrière circulaire de force pure qui fait un diamètre de 10 m. Cette barrière a 50 points de santé avant d’être détruite. À votre tour, vous pouvez dépenser 1 point d’END en plus pour régénérer les points de santé du bouclier, au taux de 5 points par point d’END. Ce bouclier est solide et imperméable à tout objet solide. Une fois que le bouclier est érigé, plus rien ne peut y entrer. L’air est renouvelé dans le bouclier, il est donc possible d’y respirer. Si un magicien le souhaite, il peut mettre fin à ce renouvellement, ce qui ne laisse que 20 rounds d’air. Pour chaque personne supplémentaire dans le bouclier, les rounds d’air sont réduits de –1. Les créatures éthérées peuvent passer à travers le bouclier et vous pouvez vous téléporter dedans et en dehors.",
    "craftTime": "10 rounds",
    "dc": "18",
    "components": "poussière imprégnée (×2), craie (×4), cinquième essence (×5)"
  },
  {
    "id": "sp-consecration",
    "name": {
      "en": "Consecration",
      "fr": "Consécration"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "-",
    "duration": "jusqu’à dissipation",
    "defense": "-",
    "effect": "Consécration crée un cercle magique qui repousse temporairement les monstres. Ce cercle peut mesurer jusqu’à 10 m de rayon et force tout monstre qui cherche à y pénétrer à faire un jet de Résistance à la magie avec un SD égal au jet de Rituels utilisé pour la création du cercle. Les effets de sort générés par les monstres ne peuvent pas passer le cercle, mais les projectiles non magiques lancés par les monstres l’ignorent. Un monstre qui réussit le jet pour entrer dans le cercle peut y rester, mais il doit faire un autre jet pour sortir du cercle. Si vous utilisez les règles traditionnelles de vulnérabilité des monstres, vous devez utiliser de l’argent pour les monstres sensibles à l’argent et de la météorite pour les monstres vulnérables à la météorite.",
    "craftTime": "10 rounds",
    "dc": "18",
    "components": "craie (×4), poussière imprégnée (×2), cinquième essence (×5), argent ou météorite (×5)"
  },
  {
    "id": "sp-oneiromancy",
    "name": {
      "en": "Oneiromancy",
      "fr": "Oniromancie"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "journeyman",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "-",
    "duration": "1d10 rounds",
    "defense": "-",
    "effect": "Oniromancie accorde au lanceur un rêve qui dévoile des secrets et des évènements du passé et du présent. Un lanceur peut effectuer le rituel seul, comme Hydromancie. Il requiert également un jet de Rituels pour observer des évènements qui se sont produits dans le passé et un SD plus difficile pour des évènements qui ont lieu au même moment. Oniromancie peut être détecté comme Hydromancie. Cependant, l’oniromancien peut guider autant de personnes que son niveau de Rituels dans le partage de leur rêve illuminé. Pour cela, l’oniromancien doit se lier avec la personne qu’il veut illuminer. Les participants doivent répondre à une série de questions personnelles, aussi honnêtement que possible. Le rêve dure pendant tout le rituel.",
    "craftTime": "10 rounds",
    "dc": "15 (18)",
    "components": "un endroit où dormir"
  },
  {
    "id": "sp-artifact-compression",
    "name": {
      "en": "Artifact Compression",
      "fr": "Artefact comprimé"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "16",
    "range": "-",
    "duration": "jusqu’à inversion",
    "defense": "-",
    "effect": "Artefact comprimé réduit une créature ciblée dans les 10 m à 1/10e de sa taille normale et l’enrobe de jade. Tant qu’elle est dans cette statuette, la cible est inconsciente. La transformation est extrêmement douloureuse pour la cible qui doit réussir un jet de Résilience avec un SD 15 ou subir 6d6 points de dégâts au torse. Une cible peut être gardée en état d’artefact comprimé pour une durée infinie et son corps est en pause, donc il ne vieillit pas. Tant qu’elle est sous sa forme condensée, la cible possède 1/5e de ses points de santé (arrondis au supérieur). Si ces points sont consommés, la cible meurt. Si l’un de ses membres est cassé, que ce soit par un jet de Physique avec un SD 14 ou par 5 points de dégâts, ce membre est considéré comme arraché. Si la tête est arrachée, la cible meurt. Recoller des morceaux à une figurine compressée ne remet pas le membre en place. Après décompression, la cible est stupéfiée jusqu’à ce qu’elle réussisse un jet de sauvegarde contre la stupéfaction.",
    "craftTime": "10 rounds",
    "dc": "18",
    "components": "gemme parfaite (×1), poussière imprégnée (×2), argile alluviale (×4), cinquième essence (×5)"
  },
  {
    "id": "sp-create-golem",
    "name": {
      "en": "Create Golem",
      "fr": "Création de golem"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "-",
    "duration": "permanent",
    "defense": "-",
    "effect": "Création de golem crée un golem qui se met au service du lanceur jusqu’à sa mort. Le procédé crée un simple golem qui est lié à votre volonté. Il effectuera tout ce que vous lui demanderez, mais il ne peut pas réfléchir et ne peut pas effectuer des tâches de précision qui requièrent des doigts ou d’attraper de petites choses. Un golem accomplira le dernier ordre qui lui a été donné. S’il échoue, il essaiera encore et encore jusqu’à réussir ou que vous lui disiez d’arrêter. Si l’ordre est continu (« va chercher de l’eau »), le golem continuera à le faire jusqu’à sa mort ou l’ordre d’arrêter.",
    "craftTime": "10 rounds",
    "dc": "20",
    "components": "gemme parfaite (×1), cinquième essence (×2), craie (×2), poussière imprégnée (×5), bois durci (×10), pierre (×10)"
  },
  {
    "id": "sp-interactive-illusion",
    "name": {
      "en": "Interactive Illusion",
      "fr": "Illusion interactive"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "master",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "-",
    "duration": "jusqu’à dissipation",
    "defense": "-",
    "effect": "Illusion interactive crée une illusion avec vue, son, odeur et sensations réelles. Rien dans l’illusion n’est réel, mais tout semble réel à quiconque pénètre dans cette zone. L’illusion couvre un rayon de 20 m et son lanceur peut la contrôler et la façonner. S’il crée un danger dans l’illusion pour combattre les intrus, chaque intrus doit faire un jet de Résistance à la magie ou de Résilience avec un SD 12. En cas de réussite, l’intrus réalise qu’il ne se passe rien et ne subit aucun dommage. En cas d’échec, l’intrus pendant que les dégâts sont réels et doit faire un jeu de sauvegarde contre la stupéfaction. Les dégâts ne peuvent pas tuer, mais ils peuvent étourdir.",
    "craftTime": "10 rounds",
    "dc": "18",
    "components": "éclat imprégné (×1), gemme parfaite (×1), verre (×2), eau ducale (×3), cinquième essence (×5)"
  },
  {
    "id": "sp-hex-of-shadows",
    "name": {
      "en": "Hex of Shadows",
      "fr": "L’envoûtement des Ombres"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "L’envoûtement des Ombres crée des murmures dans les ténèbres et des silhouettes dans les coins. Le sujet doit faire des jets de Vigilance au hasard avec un SD non spécifié, apercevant toujours quelque chose ou quelqu’un du coin de l’oeil. Les jets de Vigilance ne sont jamais pour une menace réelle, juste des visions.",
    "danger": "Faible",
    "prerequisites": "le sujet doit apporter un bol d’eau pure, une branche de myrte blanc et une bouteille d’encre dans une clairière lors d’une lune croissante. Quand la lune est au plus haut, le sujet doit verser l’encre dans l’eau, tremper la branche dans le mélange et asperger des gouttelettes en cercle autour de lui tout en retenant sa respiration."
  },
  {
    "id": "sp-eternal-itch",
    "name": {
      "en": "The Eternal Itch",
      "fr": "La démangeaison éternelle"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "La démangeaison éternelle fait pousser des pustules qui grattent et brûlent sur les parties intimes du sujet. La démangeaison n’inflige pas de dégâts, mais dérange constamment, ce qui inflige un malus de -1 à toutes les tâches. En plus du –1, la cible a un malus de –5 en Séduction une fois dans « la chambre à coucher ».",
    "danger": "Faible",
    "prerequisites": "le sujet doit rassembler 1 dose de sclérodermie, de petite ciguë et de bryone. Il doit allumer un feu de camp et faire un bouquet avec les herbes. Quand tout est prêt, le sujet doit enflammer les herbes et effriter les cendres chaudes sur la zone atteinte tout en récitant une série de mots magiques."
  },
  {
    "id": "sp-devils-luck",
    "name": {
      "en": "Devil’s Luck",
      "fr": "La chance démoniaque"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "La chance démoniaque tourmente le sujet avec des touches de mauvaise fortune. Dans des situations très stressantes, comme en combat ou en effectuant une tâche avec un délai court ou un SD supérieur à 15, le sujet fait un échec critique sur un 1 ou 2 naturel.",
    "danger": "Modéré",
    "prerequisites": "le sujet doit planter un clou en argent au cadre de sa porte et y attacher 2 doses d’aconit, attachées avec une mèche de cheveux d’une vierge. Enfin, le sujet soit rester sous le clou en argent, enflammer le bouquet d’aconit et de cheveux de vierge et respirer profondément."
  },
  {
    "id": "sp-nightmare",
    "name": {
      "en": "Nightmare",
      "fr": "Le cauchemar"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "Le cauchemar fait revivre au sujet le même cauchemar horrifique. Chaque nuit, le sujet doit faire un jet de Résistance à la contrainte avec un SD égal au jet d’Envoûtement du lanceur pour lancer cet envoûtement. En cas de réussite, le sujet parvient à dormir une nuit complète, bien qu’elle ne soit pas reposante. En cas d’échec, il dort à peine et ne régénère pas d’END ou de PS durant la nuit. S’il échoue trois nuits d’affilée, il réduit de moitié son Endurance et a un malus de –2 à toutes ses actions jusqu’à pouvoir faire une nuit complète.",
    "danger": "Modéré",
    "prerequisites": "le sujet doit rassembler 5 bougies, 5 os de bête et 1 minerai luisant. La nuit de la cérémonie, le sujet doit répartir les bougies autour de lui, les relier avec les os et placer le minerai luisant sous sa tête. S’il arrive à dormir toute la nuit, il est libéré de l’envoûtement."
  },
  {
    "id": "sp-pestas-kiss",
    "name": {
      "en": "Pesta’s Kiss",
      "fr": "Le baiser de Pesta"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "Le baiser de Pesta ôte au sujet sa capacité à combattre les maladies et sa résistance à la nausée. À chaque fois que le sujet est en contact avec une personne malade, il a 75 % de chances d’attraper la maladie. À chaque fois qu’il sent quelque chose de nauséabond, même légèrement, il doit réussir un jet de Résilience avec un SD 16 ou être nauséeux.",
    "danger": "Élevé",
    "prerequisites": "le sujet doit réunir 3 doses d’argile alluviale, 1 dose de charbon, 3 doses de résine et 1 dose de poussière imprégnée. Il doit d’abord confectionner un totem avec l’argile mélangée à la poussière imprégnée, le recouvrir de résine, avec le charbon à la place des yeux. Cela requiert un jet de Beaux-arts avec un SD 14. Ensuite le sujet doit répéter une série de mots magiques, ce qui imprègne le totem de pouvoir. Tout de suite après, le totem doit être brisé et les yeux de charbon doivent être réduits en poudre et consommés par le sujet."
  },
  {
    "id": "sp-hex-of-the-beast",
    "name": {
      "en": "Hex of the Beast",
      "fr": "L’envoûtement de la bête"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "official",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "L’envoûtement de la bête rend la cible répugnante aux yeux des animaux et des bêtes. Dès que la cible s’approche d’un animal à moins de 10 m, ce dernier réagira mal au sujet, ce qui lui inflige un malus de –3 en Survie en ce qui concerne le dressage des animaux. À chaque fois que le sujet s’approche d’un animal à moins de 10 m, il y a 50 % de chances pour que l’animal attaque.",
    "danger": "Élevé",
    "prerequisites": "Prérequis pour la lever : le sujet doit rassembler un petit animal vivant, 2 doses de gui, 1 dose de phosphore, 2 doses d’oeil de corbeau, 3 doses de racine de mandragore. À la pleine lune, le sujet doit trancher la gorge de l’animal et boire son sang. Ensuite, le corps de l’animal doit être enveloppé dans un bouquet de gui, oeil de corbeau et racine de mandragore et être placé dans un feu ouvert. Lorsque les écailles ou les poils de l’animal commencent à partir en fumée, le phosphore doit être lancé dans les flammes. Quand le feu s’éteint, le sujet doit en enlever les os de l’animal et les porter sur lui pendant toute une journée."
  }
];
