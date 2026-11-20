import type { LocalizedText } from '@/src/data/bestiary/types';
import type { RaceId } from '../types';

export type SocialStatusLevel =
  | 'neutral'
  | 'tolerated'
  | 'feared'
  | 'hated'
  | 'feared_hated';

export type SocialTerritoryId =
  | 'north'
  | 'nilfgaard'
  | 'skellige'
  | 'dol_blathanna'
  | 'mahakam';

export type SocialGroupId =
  | 'human'
  | 'elf'
  | 'dwarf'
  | 'witcher'
  | 'mage'
  | 'halfling'
  | 'gnome'
  | 'vran'
  | 'werebbub';

export interface RacePerkDetail {
  id: string;
  name: LocalizedText;
  effect: LocalizedText;
  subRule?: {
    title: LocalizedText;
    text: LocalizedText;
  };
}

export interface RaceReferenceEntry {
  raceId: RaceId;
  title: LocalizedText;
  sourceNote: LocalizedText;
  /** True for supplement races whose source text in guide/races.md is in English. */
  hasEnglishSourceText?: boolean;
  englishSourceExcerpt?: string;
  lore: LocalizedText;
  societyNote?: {
    title: LocalizedText;
    text: LocalizedText;
  };
  perks: readonly RacePerkDetail[];
}

export interface SocialStatusDefinition {
  id: SocialStatusLevel;
  label: LocalizedText;
  shortLabel: LocalizedText;
  effect: LocalizedText;
}

export interface SocialTerritoryRow {
  territoryId: SocialTerritoryId;
  territory: LocalizedText;
  statuses: Record<SocialGroupId, SocialStatusLevel>;
}

/**
 * Official Social Status definitions from `guide/races.md`.
 */
export const SOCIAL_STATUS_DEFINITIONS: Record<
  SocialStatusLevel,
  SocialStatusDefinition
> = {
  neutral: {
    id: 'neutral',
    label: { fr: 'Neutre', en: 'Equal (Neutral)' },
    shortLabel: { fr: 'Neutre', en: 'Equal' },
    effect: {
      fr: 'Considérés comme des égaux : ni malus ni bonus lors des interactions sociales. Jugés selon leur apparence et leurs actes.',
      en: 'Viewed as equals: no social penalties or bonuses. Judged on appearance and actions rather than race.',
    },
  },
  tolerated: {
    id: 'tolerated',
    label: { fr: 'Toléré', en: 'Tolerated' },
    shortLabel: { fr: 'Toléré', en: 'Tolerated' },
    effect: {
      fr: '–1 en Séduction, Charisme, Persuasion et Commandement lors des interactions avec les autres habitants.',
      en: '-1 to Seduction, Charisma, Persuasion, and Leadership when interacting with locals.',
    },
  },
  feared: {
    id: 'feared',
    label: { fr: 'Craint', en: 'Feared' },
    shortLabel: { fr: 'Craint', en: 'Feared' },
    effect: {
      fr: '+1 en Intimidation et –1 en Charisme.',
      en: '+1 to Intimidation and -1 to Charisma.',
    },
  },
  hated: {
    id: 'hated',
    label: { fr: 'Haï', en: 'Hated' },
    shortLabel: { fr: 'Haï', en: 'Hated' },
    effect: {
      fr: '–2 en Séduction, Charisme, Persuasion et Commandement ; souvent la cible de crimes xénophobes et d’agressions.',
      en: '-2 to Seduction, Charisma, Persuasion, and Leadership; frequent targets of xenophobic hostility.',
    },
  },
  feared_hated: {
    id: 'feared_hated',
    label: { fr: 'Craint et haï', en: 'Hated & Feared' },
    shortLabel: { fr: 'Craint & haï', en: 'Hated/Feared' },
    effect: {
      fr: 'Cumule Craint et Haï : +1 en Intimidation, –2 en Séduction, Persuasion et Commandement, et –3 au total en Charisme.',
      en: 'Combines Feared and Hated: +1 Intimidation, -2 Seduction/Persuasion/Leadership, and -3 total Charisma.',
    },
  },
};

export const SOCIAL_STATUS_EXTRA_RULES: readonly {
  id: string;
  title: LocalizedText;
  text: LocalizedText;
}[] = [
  {
    id: 'own-kind',
    title: { fr: 'Ceux de votre race', en: 'Your Own Kind' },
    text: {
      fr: 'Même en territoire hostile, les membres de votre propre race vous traitent toujours de façon neutre, sauf conflit personnel préalable avec vous ou d’autres représentants de votre espèce.',
      en: 'Even in hostile territories, fellow members of your own race treat you as Equal unless there is a personal grievance.',
    },
  },
  {
    id: 'friendship',
    title: { fr: 'Amitié', en: 'Friendship' },
    text: {
      fr: 'Le statut social reflète la perception des inconnus. Les amis fidèles, compagnons de route, amants et alliés établis ne vous appliquent pas ces préjugés.',
      en: 'Social standing applies to strangers. Trusted companions, close friends, lovers, and loyal allies treat you based on your bond.',
    },
  },
];

export const SOCIAL_GROUP_COLUMNS: readonly {
  id: SocialGroupId;
  label: LocalizedText;
}[] = [
  { id: 'human', label: { fr: 'Humains', en: 'Humans' } },
  { id: 'elf', label: { fr: 'Elfes', en: 'Elves' } },
  { id: 'dwarf', label: { fr: 'Nains', en: 'Dwarves' } },
  { id: 'witcher', label: { fr: 'Sorceleurs', en: 'Witchers' } },
  { id: 'mage', label: { fr: 'Mages', en: 'Mages' } },
  { id: 'halfling', label: { fr: 'Halfelins', en: 'Halflings' } },
  { id: 'gnome', label: { fr: 'Gnomes', en: 'Gnomes' } },
  { id: 'vran', label: { fr: 'Vran', en: 'Vran' } },
  { id: 'werebbub', label: { fr: 'Werebbubs', en: 'Werebbubs' } },
];

/**
 * Complete 5 × 9 Social Status Matrix directly from `guide/races.md`.
 */
export const SOCIAL_STATUS_MATRIX: readonly SocialTerritoryRow[] = [
  {
    territoryId: 'north',
    territory: { fr: 'Nord', en: 'The North' },
    statuses: {
      human: 'neutral',
      elf: 'hated',
      dwarf: 'tolerated',
      witcher: 'feared_hated',
      mage: 'feared_hated',
      halfling: 'tolerated',
      gnome: 'tolerated',
      vran: 'feared_hated',
      werebbub: 'tolerated',
    },
  },
  {
    territoryId: 'nilfgaard',
    territory: { fr: 'Nilfgaard', en: 'Nilfgaard' },
    statuses: {
      human: 'neutral',
      elf: 'neutral',
      dwarf: 'neutral',
      witcher: 'feared_hated',
      mage: 'tolerated',
      halfling: 'neutral',
      gnome: 'neutral',
      vran: 'feared_hated',
      werebbub: 'tolerated',
    },
  },
  {
    territoryId: 'skellige',
    territory: { fr: 'Skellige', en: 'Skellige' },
    statuses: {
      human: 'neutral',
      elf: 'neutral',
      dwarf: 'neutral',
      witcher: 'tolerated',
      mage: 'tolerated',
      halfling: 'neutral',
      gnome: 'neutral',
      vran: 'feared_hated',
      werebbub: 'tolerated',
    },
  },
  {
    territoryId: 'dol_blathanna',
    territory: { fr: 'Dol Blathanna', en: 'Dol Blathanna' },
    statuses: {
      human: 'hated',
      elf: 'neutral',
      dwarf: 'neutral',
      witcher: 'tolerated',
      mage: 'neutral',
      halfling: 'neutral',
      gnome: 'neutral',
      vran: 'hated',
      werebbub: 'tolerated',
    },
  },
  {
    territoryId: 'mahakam',
    territory: { fr: 'Mahakam', en: 'Mahakam' },
    statuses: {
      human: 'tolerated',
      elf: 'neutral',
      dwarf: 'neutral',
      witcher: 'tolerated',
      mage: 'tolerated',
      halfling: 'neutral',
      gnome: 'neutral',
      vran: 'tolerated',
      werebbub: 'neutral',
    },
  },
];

/**
 * Full lore, racial perks, mechanical sub-rules, and English supplement notes from `guide/races.md`.
 */
export const RACES_REFERENCE_DATA: readonly RaceReferenceEntry[] = [
  {
    raceId: 'witcher',
    title: { fr: 'Les Sorceleurs', en: 'Witchers' },
    sourceNote: { fr: 'Livre de base', en: 'Core Rulebook' },
    lore: {
      fr: 'Enfants humains transformés par des entraînements éreintants et l’Épreuve des Herbes au sein d’une école de sorceleurs. Dotés d’yeux de chat, immunisés aux maladies et redoutables tueurs de monstres, ils restent craints et méprisés en tant que mutants.',
      en: 'Human children reshaped by grueling training and the Trial of the Grasses inside a Witcher school. Cat-eyed, disease-immune monster slayers, yet feared and despised across the Continent as mutants.',
    },
    societyNote: {
      title: { fr: 'Sorceleuses', en: 'Female Witchers' },
      text: {
        fr: 'Historiquement, tous les sorceleurs connus sont des hommes en raison de la nature de l’Épreuve des Herbes, mais le MJ reste libre d’inclure des femmes sorceleurs dans sa campagne.',
        en: 'Historically, known witchers are men due to the nature of the Trial of the Grasses, though the GM is free to include female witchers.',
      },
    },
    perks: [
      {
        id: 'wt-senses',
        name: { fr: 'Sens accrus', en: 'Enhanced Senses' },
        effect: {
          fr: 'Aucune pénalité dans les zones de lumière tamisée, bonus naturel de +1 en Vigilance et capacité à pister une cible uniquement à l’odorat.',
          en: 'No dim-light penalties, inherent +1 Awareness, and ability to track targets by scent alone.',
        },
      },
      {
        id: 'wt-mutation',
        name: { fr: 'Mutation durable', en: 'Resilient Mutation' },
        effect: {
          fr: 'Immunité totale aux maladies et capacité à utiliser les mutagènes.',
          en: 'Complete immunity to diseases and ability to safely equip mutagens.',
        },
      },
      {
        id: 'wt-emotions',
        name: { fr: 'Sensibilité émoussée', en: 'Dulled Emotions' },
        effect: {
          fr: 'Aucun jet de Courage requis face à l’Intimidation, mais malus de –4 en Empathie (minimum 1).',
          en: 'Never need Courage checks against Intimidation, but suffer -4 Empathy (min 1).',
        },
        subRule: {
          title: { fr: 'Plafond d’Empathie', en: 'Empathy Cap' },
          text: {
            fr: 'À cause de Sensibilité émoussée, un Sorceleur ne peut jamais dépasser 6 en Empathie.',
            en: 'Due to Dulled Emotions, a Witcher can never raise Empathy above 6.',
          },
        },
      },
      {
        id: 'wt-reflexes',
        name: { fr: 'Réflexes hors du commun', en: 'Lightning Reflexes' },
        effect: {
          fr: 'Bonus permanent de +1 en Réflexes et en Dextérité, et possibilité d’améliorer ces deux caractéristiques au-delà de 10.',
          en: 'Permanent +1 Reflexes and +1 Dexterity, and both stats may be raised beyond 10.',
        },
      },
    ],
  },
  {
    raceId: 'elf',
    title: { fr: 'Les Elfes (Aen Seidhe)', en: 'Elves (Aen Seidhe)' },
    sourceNote: { fr: 'Livre de base', en: 'Core Rulebook' },
    lore: {
      fr: 'Peuple ancien à longue vie venu sur de grands navires blancs avant les humains. Grands, élancés et dotés d’oreilles pointues, les Aen Seidhe entretiennent un lien profond avec la terre et comptent parmi les plus redoutables archers du Continent.',
      en: 'An ancient, long-lived elder race who arrived on white ships before humans. Tall, slender, and fiercely attuned to nature, the Aen Seidhe are unrivaled archers.',
    },
    societyNote: {
      title: { fr: 'Compétences bonus', en: 'Bonus Skills Beyond Cap' },
      text: {
        fr: 'Normalement limitées à 6 à la création (10 ensuite), les compétences peuvent dépasser ce plafond grâce aux particularités raciales (ex. Archerie peut atteindre 8 à la création puis 12 avec Œil d’aigle).',
        en: 'Racial skill bonuses are the only exception able to exceed the normal skill cap of 6 at creation (10 later), e.g., Archery up to 8 at creation / 12 total.',
      },
    },
    perks: [
      {
        id: 'elf-artistic',
        name: { fr: 'Esthète', en: 'Artistic' },
        effect: {
          fr: 'Bonus naturel de +1 dans la compétence Beaux-arts.',
          en: 'Inherent +1 bonus to Fine Arts.',
        },
      },
      {
        id: 'elf-marksman',
        name: { fr: 'Œil d’aigle', en: 'Marksman' },
        effect: {
          fr: 'Bonus naturel de +2 dans la compétence Archerie ; peut saisir son arc et l’encocher/bander sans dépenser d’action.',
          en: 'Inherent +2 bonus to Archery; can draw and nock/string a bow without spending an action.',
        },
      },
      {
        id: 'elf-nature',
        name: { fr: 'Harmonie avec la nature', en: 'Natural Attunement' },
        effect: {
          fr: 'Les bêtes considèrent l’elfe comme amical et ne l’attaquent pas sauf provocation. Trouve automatiquement les plantes de disponibilité commune (ou moindre) poussant naturellement dans la région.',
          en: 'Beasts treat elves as friendly unless provoked. Automatically finds Common (or lower rarity) plants native to the area.',
        },
      },
    ],
  },
  {
    raceId: 'dwarf',
    title: { fr: 'Les Nains', en: 'Dwarves' },
    sourceNote: { fr: 'Livre de base', en: 'Core Rulebook' },
    lore: {
      fr: 'Habitants des montagnes et maîtres forgerons de Mahakam depuis des siècles. Plus petits que les humains mais bâtis comme le roc, pragmatiques et indispensables aux armées pour leur acier.',
      en: 'Stalwart mountain-dwellers and legendary smiths of Mahakam. Compact, immensely strong, pragmatic, and prized across the Continent for their craftsmanship and steel.',
    },
    perks: [
      {
        id: 'dw-tough',
        name: { fr: 'Tanné comme du cuir', en: 'Tough' },
        effect: {
          fr: 'Peau naturellement épaisse conférant un Pouvoir d’arrêt (PA) de 2 qui s’ajoute à toute armure et ne peut être réduit par les attaques ou l’ablation.',
          en: 'Naturally thick skin granting +2 Stopping Power (SP) stacked on top of armor and unaffected by weapons or ablation.',
        },
      },
      {
        id: 'dw-strong',
        name: { fr: 'Coriace', en: 'Strong' },
        effect: {
          fr: 'Bonus de +1 en Physique et capacité d’Encombrement augmentée de +25 kg.',
          en: '+1 bonus to Physique and +25 kg maximum Encumbrance.',
        },
      },
      {
        id: 'dw-eye',
        name: { fr: 'Œil de l’expert', en: 'Eye for Detail' },
        effect: {
          fr: 'Bonus naturel de +1 dans la compétence Négoce.',
          en: 'Inherent +1 bonus to Business.',
        },
      },
    ],
  },
  {
    raceId: 'human',
    title: { fr: 'Les Humains', en: 'Humans' },
    sourceNote: { fr: 'Livre de base', en: 'Core Rulebook' },
    lore: {
      fr: 'Espèce dominante du Continent, aussi ambitieuse qu’adaptable. Des Royaumes du Nord jusqu’aux provinces nilfgaardiennes, leur détermination et leur ingéniosité leur ont permis de bâtir empires, académies et cités.',
      en: 'The dominant species on the Continent—ambitious, adaptable, and relentless. From the Northern Realms to Nilfgaard, humanity’s ingenuity and stubborn drive shaped modern kingdoms.',
    },
    perks: [
      {
        id: 'hu-trustworthy',
        name: { fr: 'Digne de confiance', en: 'Trustworthy' },
        effect: {
          fr: 'Bonus naturel de +1 aux jets de Charisme, Séduction et Persuasion face à d’autres humains.',
          en: 'Inherent +1 to Charisma, Seduction, and Persuasion rolls when dealing with other humans.',
        },
      },
      {
        id: 'hu-ingenuity',
        name: { fr: 'Ingénieux', en: 'Ingenuity' },
        effect: {
          fr: 'Bonus naturel de +1 en Déduction.',
          en: 'Inherent +1 bonus to Deduction.',
        },
      },
      {
        id: 'hu-stubborn',
        name: { fr: 'Têtu comme une mule', en: 'Stubborn as a Mule' },
        effect: {
          fr: 'Trois relances par session pour un jet raté de Résistance à la contrainte ou de Courage (en conservant le meilleur résultat, sans relancer deux fois le même jet).',
          en: 'Reroll a failed Resist Coercion or Courage check up to 3 times per session, keeping the higher roll (once per check).',
        },
      },
    ],
  },
  {
    raceId: 'halfling',
    title: { fr: 'Les Halfelins', en: 'Halflings' },
    sourceNote: { fr: 'Livre de base', en: 'Core Rulebook' },
    lore: {
      fr: 'Petits, aux pieds poilus et oreilles pointues, les halfelins ne revendiquent aucun territoire et vivent paisiblement au cœur des cités humaines comme commerçants, fermiers, meuniers ou artisans, tout en repoussant mystérieusement la magie.',
      en: 'Nimble, practical folk with no homeland of their own, thriving as merchants, farmers, and artisans inside other societies while mysteriously shrugging off magical energies.',
    },
    societyNote: {
      title: { fr: 'Parcours & Mutations des halfelins', en: 'Lifepath & Mutations' },
      text: {
        fr: 'En Terres Ancestrales, un halfelin vient de Dol Blathanna sur un d10 pair ou de Mahakam sur un d10 impair. Les Mages peuvent muter un halfelin, mais les mutagènes bleus n’ont aucun effet sur lui.',
        en: 'When rolling Elderlands origin, even d10 = Dol Blathanna, odd d10 = Mahakam. Blue mutagens have no effect on Halflings.',
      },
    },
    perks: [
      {
        id: 'hf-nimble',
        name: { fr: 'Agile', en: 'Nimble' },
        effect: {
          fr: 'Bonus naturel de +1 dans la compétence Athlétisme.',
          en: 'Inherent +1 bonus to Athletics.',
        },
      },
      {
        id: 'hf-agrifolk',
        name: { fr: 'Peuple agreste', en: 'Agri-Folk' },
        effect: {
          fr: 'Bonus naturel de +2 en Survie ainsi que pour apaiser, dresser ou conduire des animaux.',
          en: 'Inherent +2 to Wilderness Survival and calming, taming, or handling animals.',
        },
      },
      {
        id: 'hf-magicres',
        name: { fr: 'Résilience magique', en: 'Magic Resistance' },
        effect: {
          fr: 'Bonus naturel de +1 en Résistance à la magie (même quand les règles l’interdisent normalement). Les potions de sorceleur et breuvages magiques n’octroient aucun bonus.',
          en: 'Inherent +1 Resist Magic even when normally disallowed; witcher potions and magical elixirs grant no benefits.',
        },
        subRule: {
          title: { fr: 'Restriction magique', en: 'Magic Restriction' },
          text: {
            fr: 'Incapables de canaliser la magie, les halfelins ne peuvent devenir ni Mages ni Prêtres.',
            en: 'Unable to channel magical energy, halflings cannot become Mages or Priests.',
          },
        },
      },
    ],
  },
  {
    raceId: 'gnome',
    title: { fr: 'Gnomes', en: 'Gnomes' },
    sourceNote: {
      fr: 'Supplément (source anglaise)',
      en: 'Supplement (English source)',
    },
    hasEnglishSourceText: true,
    englishSourceExcerpt:
      'Gnomes are the finest craftsmen on the Continent, famed for Gwyhyr blades, alchemy, metallurgy, and engineering, living mostly in democratic communes across Tir Tochair and Mahakam.',
    lore: {
      fr: 'Plus fins artisans du Continent — célèbres pour les épées Gwyhyr, l’alchimie, la métallurgie et l’ingénierie — les gnomes vivent surtout en communes démocratiques dans les montagnes de Tir Tochair et de Mahakam, alliés de longue date des nains.',
      en: 'The finest craftsmen on the Continent—famed for Gwyhyr swords, alchemy, metallurgy, and engineering—gnomes dwell primarily in peaceful democratic communes in Tir Tochair and Mahakam alongside dwarves.',
    },
    perks: [
      {
        id: 'gn-demeanor',
        name: { fr: 'Nature agréable (Pleasant Demeanor)', en: 'Pleasant Demeanor' },
        effect: {
          fr: 'Bonus naturel de +1 en Charisme. [EN: Gnomes gain an inherent +1 to Charisma.]',
          en: 'Inherent +1 bonus to Charisma.',
        },
      },
      {
        id: 'gn-detail',
        name: { fr: 'Œil du détail (Eye for Detail)', en: 'Eye for Detail' },
        effect: {
          fr: 'Bonus naturel de +2 à 3 compétences d’Artisanat/Technique (Craft Skills) au choix, en ignorant le modificateur de compétence difficile. [EN: +2 to any 3 Craft Skills they choose, ignoring Difficult Skill modifier.]',
          en: 'Inherent +2 to any 3 chosen Craft Skills, ignoring the Difficult Skill learning modifier.',
        },
      },
      {
        id: 'gn-scent',
        name: { fr: 'Pistage olfactif (Scent Tracking)', en: 'Scent Tracking' },
        effect: {
          fr: 'Bonus naturel de +1 en Vigilance et capacité à pister uniquement à l’odorat. [EN: Inherent +1 to Awareness and ability to track by scent alone.]',
          en: 'Inherent +1 to Awareness plus the ability to track targets by scent alone.',
        },
      },
      {
        id: 'gn-small',
        name: { fr: 'Petite taille (Small Stature)', en: 'Small Stature' },
        effect: {
          fr: 'Malus naturel de –5 en Physique ; dégâts à mains nues, bonus de mêlée et Encombrement calculés comme avec 3 points de COR en moins. Peut toutefois se faufiler dans tout passage d’au moins 0,5 m et se dissimuler derrière un objet ou une créature d’au moins 1 m × 1 m.',
          en: 'Inherent -5 Physique; hand-to-hand damage, melee bonus, and Encumbrance calculated as if BODY were 3 points lower. Can slip through 0.5m gaps and fully conceal behind any 1m × 1m cover.',
        },
      },
    ],
  },
  {
    raceId: 'vran',
    title: { fr: 'Vran', en: 'Vran' },
    sourceNote: {
      fr: 'Supplément (source anglaise)',
      en: 'Supplement (English source)',
    },
    hasEnglishSourceText: true,
    englishSourceExcerpt:
      'Sometimes referred to as Lizardfolk, the vran were a proud reptilian civilization crushed between elven wars and the Landing of the Exiles, now surviving as rare third-class wanderers.',
    lore: {
      fr: 'Ancienne civilisation reptilienne jadis prospère des Montagnes Bleues à la Grande Mer, décimée par les guerres elfiques puis l’arrivée des humains. Ne croyant pas à l’au-delà, les Vran chérissent la vie et survivent aujourd’hui en rares exilés.',
      en: 'Ancient reptilian people once famed for grand cities, cool-headed politics, and scholarship before being pushed to the brink by elven conflicts and Nordling settlers.',
    },
    perks: [
      {
        id: 'vr-calm',
        name: { fr: 'Cœur calme (Calm Hearted)', en: 'Calm Hearted' },
        effect: {
          fr: 'Bonus naturel de +1 en Résistance à la contrainte. [EN: Inherent +1 Resist Coercion.]',
          en: 'Inherent +1 bonus to Resist Coercion.',
        },
      },
      {
        id: 'vr-claws',
        name: { fr: 'Griffes et crocs (Claws & Fangs)', en: 'Claws & Fangs' },
        effect: {
          fr: 'Deux armes naturelles impossibles à désarmer : poings et coups de pied infligent des dégâts létaux ; attaque de Mêlée par morsure infligeant 3d6 dégâts avec 50 % de chance d’empoisonner.',
          en: 'Two disarm-proof natural weapons: punches/kicks deal lethal damage, and fangs make a 3d6 Melee attack with 50% chance to Poison.',
        },
      },
      {
        id: 'vr-scales',
        name: { fr: 'Peau écailleuse (Scaled Hide)', en: 'Scaled Hide' },
        effect: {
          fr: 'Écailles naturelles conférant un PA de 4 impossible à réduire par les attaques d’armes ou les dégâts d’ablation.',
          en: 'Natural Stopping Power of 4 (SP 4), which cannot be lowered by weapon attacks or ablation damage.',
        },
      },
      {
        id: 'vr-phys',
        name: { fr: 'Physiologie reptilienne (Reptilian Physiology)', en: 'Reptilian Physiology' },
        effect: {
          fr: 'Un médecin non-vran n’ayant jamais soigné de vran subit –2 en Premiers soins et –5 pour stabiliser/soigner les blessures critiques d’un vran. Si Gelé (Frozen), subit –2 à toutes les actions pendant 1d6 rounds après la fin de l’état.',
          en: 'Non-vran doctors unpracticed with vran suffer -2 First Aid and -5 to stabilize/treat Critical Wounds on a vran. Frozen imposes -2 to all actions for 1d6 rounds after ending.',
        },
      },
    ],
  },
  {
    raceId: 'werebbub',
    title: { fr: 'Werebbubs', en: 'Werebbubs' },
    sourceNote: {
      fr: 'Supplément (source anglaise)',
      en: 'Supplement (English source)',
    },
    hasEnglishSourceText: true,
    englishSourceExcerpt:
      'Proud mountain-dwelling Elder Race who revere ancestral heroes, living in reclusive high-peak communities and trading almost exclusively with dwarves.',
    lore: {
      fr: 'Race ancienne et fière vénérant la mémoire des héros et héroïnes ancêtres plutôt que des dieux. Repoussés dans les hautes montagnes par l’expansion elfique puis les armées humaines, les Werebbubs vivent en clans reclus et commercent surtout avec les nains.',
      en: 'Proud, heroic Elder Race pushed into high mountain enclaves after resisting both elven expansion and human mining armies; they honor ancestral heroes and trade mostly with dwarves.',
    },
    perks: [
      {
        id: 'wb-lion',
        name: { fr: 'Cœur de lion (Lionhearted)', en: 'Lionhearted' },
        effect: {
          fr: 'Bonus naturel de +1 en Courage. [EN: Inherent +1 to Courage.]',
          en: 'Inherent +1 bonus to Courage.',
        },
      },
      {
        id: 'wb-phys',
        name: { fr: 'Physiologie étrange (Strange Physiology)', en: 'Strange Physiology' },
        effect: {
          fr: 'Lorsqu’il subit une blessure critique, le Werebbub peut immédiatement effectuer un jet de Résilience contre le SD de stabilisation de la blessure pour la stabiliser sur-le-champ (une seule tentative au moment de la blessure).',
          en: 'Immediately upon taking a Critical Wound, may roll Endurance against the wound’s Stabilize DC to auto-stabilize it (one attempt only).',
        },
      },
      {
        id: 'wb-teeth',
        name: { fr: 'Dents tranchantes (Razor Teeth)', en: 'Razor Teeth' },
        effect: {
          fr: 'Peut porter une attaque de Mêlée avec ses crocs infligeant 2d6 dégâts avec Perforation améliorée.',
          en: 'Can make a Melee fang attack dealing 2d6 damage with Improved Armor Piercing.',
        },
      },
      {
        id: 'wb-eyes',
        name: { fr: 'Mauvaise vue (Poor Eyesight)', en: 'Poor Eyesight' },
        effect: {
          fr: 'Malus naturel de –4 aux jets de Vigilance liés à la vue (ne s’applique pas aux tests de perception basés uniquement sur l’ouïe).',
          en: 'Inherent -4 penalty on Awareness checks (waived for perception checks based solely on hearing).',
        },
      },
    ],
  },
  {
    raceId: 'vampire',
    title: { fr: 'Vampires supérieurs', en: 'Higher Vampires' },
    sourceNote: { fr: 'Supplément communautaire', en: 'Community Supplement' },
    lore: {
      fr: 'Créatures immortelles d’une puissance surnaturelle évoluant clandestinement parmi les mortels à travers les âges.',
      en: 'Immortal beings of immense supernatural power walking quietly among mortals across the centuries.',
    },
    perks: [
      {
        id: 'vp-senses',
        name: { fr: 'Sens vampiriques', en: 'Vampiric Senses' },
        effect: {
          fr: 'Vision nocturne, ouïe et odorat surnaturels permettant de pister et détecter les proies vivantes.',
          en: 'Supernatural night sight, hearing, and blood scent detection.',
        },
      },
      {
        id: 'vp-supernatural',
        name: { fr: 'Être surnaturel', en: 'Supernatural Being' },
        effect: {
          fr: 'Immunité aux maladies, poisons ordinaires et vieillissement ; régénération accélérée.',
          en: 'Immune to diseases, common toxins, and aging; accelerated regeneration.',
        },
      },
      {
        id: 'vp-body',
        name: { fr: 'Corps de vampire', en: 'Vampire Body' },
        effect: {
          fr: 'Griffes et crocs naturels ainsi qu’une résistance physique exceptionnelle.',
          en: 'Natural claws, fangs, and extraordinary physical resilience.',
        },
      },
      {
        id: 'vp-years',
        name: { fr: "Des années d'expérience", en: 'Years of Experience' },
        effect: {
          fr: 'Connaissances et maîtrise accumulées au fil des siècles.',
          en: 'Centuries of accumulated worldly knowledge and skill.',
        },
      },
    ],
  },
];

const RACE_REF_MAP = new Map<RaceId, RaceReferenceEntry>(
  RACES_REFERENCE_DATA.map((entry) => [entry.raceId, entry])
);

export function getRaceReference(raceId: RaceId): RaceReferenceEntry | undefined {
  return RACE_REF_MAP.get(raceId);
}

/**
 * Maps a playable RaceId (and optional ProfessionId for Mage) to its Social Status column.
 */
export function resolveSocialGroupForCharacter(
  raceId: RaceId | '',
  professionId?: string
): SocialGroupId | null {
  if (professionId === 'mage') return 'mage';
  if (!raceId) return null;
  switch (raceId) {
    case 'human':
    case 'elf':
    case 'dwarf':
    case 'witcher':
    case 'halfling':
    case 'gnome':
    case 'vran':
    case 'werebbub':
      return raceId;
    default:
      return null;
  }
}
