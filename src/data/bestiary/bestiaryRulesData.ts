import type { CreatureTypeId, LocalizedText } from './types';

export interface BestiaryDifficultyTier {
  id: string;
  axis: 'power' | 'complexity';
  label: LocalizedText;
  description: LocalizedText;
}

export interface BestiaryCategoryRule {
  typeId: CreatureTypeId;
  rulebookTitle: LocalizedText;
  description: LocalizedText;
  steelSilverNote?: LocalizedText;
}

export interface BestiaryRulesBundle {
  intro: LocalizedText;
  difficultyTiers: readonly BestiaryDifficultyTier[];
  categories: readonly BestiaryCategoryRule[];
  rewardRule: LocalizedText;
  attacksPerRoundRule: LocalizedText;
}

/**
 * Core Rulebook bestiary guidelines, difficulty ratings, 12 monster category definitions,
 * bounty rules, and attacks-per-round rule extracted from `guide/bestiaire.md`.
 */
export const BESTIARY_CORE_RULES: BestiaryRulesBundle = {
  intro: {
    fr: 'Apparus lors de la Conjonction des Sphères, la plupart des monstres s’adaptent à de nouvelles niches écologiques. Leur résurgence récente s’explique notamment par la raréfaction des sorceleurs — mais les adversaires humains ou des races anciennes se montrent parfois tout aussi impitoyables.',
    en: 'Introduced during the Conjunction of the Spheres, monsters now occupy new ecological niches as witchers grow scarce — though human and elder-race foes can be just as ruthless.',
  },
  difficultyTiers: [
    {
      id: 'weak',
      axis: 'power',
      label: { fr: 'Faible', en: 'Easy' },
      description: {
        fr: 'Un soldat entraîné n’en fait qu’une bouchée en duel ; ces créatures se déplacent généralement en bandes.',
        en: 'A trained soldier easily handles one alone; usually encountered in packs.',
      },
    },
    {
      id: 'normal',
      axis: 'power',
      label: { fr: 'Normal', en: 'Medium' },
      description: {
        fr: 'Plus dangereux : apparaît généralement seul ou accompagné de créatures faibles.',
        en: 'Significantly more dangerous; usually appears alone or leading weak creatures.',
      },
    },
    {
      id: 'strong',
      axis: 'power',
      label: { fr: 'Fort', en: 'Hard' },
      description: {
        fr: 'Parfait pour un combat de boss final. À opposer seul, sauf à un groupe nombreux ou très expérimenté.',
        en: 'Boss-tier threat best used solo unless facing a large or veteran party.',
      },
    },
    {
      id: 'simple',
      axis: 'complexity',
      label: { fr: 'Simple', en: 'Simple' },
      description: {
        fr: 'Agit instinctivement : aucune préparation particulière requise pour l’affronter.',
        en: 'Acts purely on instinct; no special planning required to defeat.',
      },
    },
    {
      id: 'complex',
      axis: 'complexity',
      label: { fr: 'Complexe', en: 'Complex' },
      description: {
        fr: 'Plus facile à vaincre en prenant le temps de s’organiser, sans que cela soit indispensable.',
        en: 'Easier to defeat with preparation, though manageable without it.',
      },
    },
    {
      id: 'difficult',
      axis: 'complexity',
      label: { fr: 'Difficile', en: 'Difficult' },
      description: {
        fr: 'Très périlleux sans connaître ses faiblesses : évitez de les placer en embuscade gratuite.',
        en: 'Deadly if approached blindly; avoid springing them in unprompted ambushes.',
      },
    },
  ],
  categories: [
    {
      typeId: 'humanoid',
      rulebookTitle: { fr: 'Humanoïdes', en: 'Humanoids' },
      description: {
        fr: 'Regroupe humains, elfes, nains et autres races anciennes aux habitats et comportements variés.',
        en: 'Covers humans, elves, dwarves, and other elder races across varied habitats and motives.',
      },
      steelSilverNote: {
        fr: 'Ne sont ni résistants à l’acier ni vulnérables à l’argent.',
        en: 'Neither resistant to steel nor vulnerable to silver.',
      },
    },
    {
      typeId: 'necrophage',
      rulebookTitle: { fr: 'Nécrophages', en: 'Necrophages' },
      description: {
        fr: 'Dévoreurs de cadavres vivants issus d’un autre plan (non morts-vivants), fréquentant cimetières, champs de bataille et cavernes.',
        en: 'Living corpse-eaters from another plane (not undead) haunting battlefields, graveyards, and caves.',
      },
    },
    {
      typeId: 'specter',
      rulebookTitle: { fr: 'Spectres', en: 'Specters' },
      description: {
        fr: 'Manifestation physique des désirs irrépressibles ou de la rage de défunts après un meurtre ou une mort violente ; impossibles à raisonner.',
        en: 'Physical manifestations of lingering rage or violent deaths; impossible to reason with once enraged.',
      },
    },
    {
      typeId: 'beast',
      rulebookTitle: { fr: 'Bêtes', en: 'Beasts' },
      description: {
        fr: 'Chiens, loups et prédateurs naturels présents dans les étendues sauvages et autour des villages.',
        en: 'Natural predators such as wolves, dogs, and wild beasts.',
      },
      steelSilverNote: {
        fr: 'Ne sont ni résistantes à l’acier ni vulnérables à l’argent.',
        en: 'Neither resistant to steel nor vulnerable to silver.',
      },
    },
    {
      typeId: 'cursed',
      rulebookTitle: { fr: 'Créatures maudites', en: 'Cursed Ones' },
      description: {
        fr: 'Humains et non-humains transformés par une malédiction (comme les loups-garous), rôdant souvent près des habitations.',
        en: 'Humans and elderfolk transformed by curses (such as werewolves), typically prowling near settlements.',
      },
    },
    {
      typeId: 'hybrid',
      rulebookTitle: { fr: 'Hybrides', en: 'Hybrids' },
      description: {
        fr: 'Créatures chimériques combinant plusieurs espèces animales (sirènes, griffons) dans des habitats très variés.',
        en: 'Chimerical beasts blending traits from multiple animal species (sirens, griffins).',
      },
    },
    {
      typeId: 'insectoid',
      rulebookTitle: { fr: 'Insectoïdes', en: 'Insectoids' },
      description: {
        fr: 'Insectes et arachnides géants tendant des embuscades avec dards ou griffes empoisonnés ; approcher d’un nid attire souvent une nuée.',
        en: 'Giant insects and arachnids using ambush, venomous stingers, and swarm tactics near nests.',
      },
    },
    {
      typeId: 'elemental',
      rulebookTitle: { fr: 'Élémentaires', en: 'Elementa' },
      description: {
        fr: 'Golems, gargouilles et élémentaires invoqués par mages ou prêtres ; libérés de leur maître, ils deviennent chaotiques et destructeurs.',
        en: 'Magical constructs and elementals bound by mages or priests; destructive if freed.',
      },
    },
    {
      typeId: 'relict',
      rulebookTitle: { fr: 'Vestiges (Relictuels)', en: 'Relicts' },
      description: {
        fr: 'Forces anciennes et magiques liées à la nature sauvage ou arrivées lors de la Conjonction, parfois rusées, parfois purement féroces.',
        en: 'Ancient magical forces deeply bound to nature, ranging from cunning intelligences to primal fury.',
      },
    },
    {
      typeId: 'ogroid',
      rulebookTitle: { fr: 'Ogroïdes', en: 'Ogroids' },
      description: {
        fr: 'Trolls, nekkers et géants vivant en sociétés tribales, souvent dotés d’une intelligence proche de l’humain.',
        en: 'Tribal humanoid-like monsters (trolls, nekkers, giants) often possessing near-human cunning.',
      },
    },
    {
      typeId: 'draconid',
      rulebookTitle: { fr: 'Draconides', en: 'Draconids' },
      description: {
        fr: 'Grands reptiles ailés sauvages (wyverns, dragons) redoutables au corps à corps et nichant dans les montagnes.',
        en: 'Dangerous winged reptiles (wyverns, true dragons) nesting in high mountain peaks.',
      },
    },
    {
      typeId: 'vampire',
      rulebookTitle: { fr: 'Vampires', en: 'Vampires' },
      description: {
        fr: 'Buveurs de sang : les vampires inférieurs chassent en bêtes féroces dans les ruines, tandis que les vampires supérieurs se fondent dans les cités humaines.',
        en: 'Blood-drinking creatures ranging from feral lesser beasts to intelligent higher vampires in cities.',
      },
    },
  ],
  rewardRule: {
    fr: 'La prime indique le montant officiel en couronnes offert par les autorités locales pour la mort du monstre — bien qu’elles rechignent parfois à verser la totalité promise.',
    en: 'Bounty lists the local government’s official crown reward for slaying the monster — though authorities frequently try to underpay.',
  },
  attacksPerRoundRule: {
    fr: 'Lorsqu’un personnage ou un monstre possède plusieurs attaques différentes, il ne peut utiliser qu’un seul type d’attaque durant un même round (par ex. pour un griffon : soit griffes ×2, soit morsure ×1).',
    en: 'When a creature has multiple distinct attack types, it may only use one type in a given round (e.g., a Griffin uses claws ×2 OR bite ×1, never both in the same round).',
  },
};
