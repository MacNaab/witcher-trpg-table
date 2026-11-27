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

export interface BestiaryAnatomyItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface BestiaryInvestigationTier {
  label: LocalizedText;
  value: string;
  example: LocalizedText;
}

export interface BestiaryDecipheringRulesBundle {
  intro: LocalizedText;
  anatomyItems: readonly BestiaryAnatomyItem[];
  specialRules: readonly BestiaryAnatomyItem[];
  investigation: {
    title: LocalizedText;
    intro: LocalizedText;
    concentrationFormula: LocalizedText;
    complexityTiers: readonly BestiaryInvestigationTier[];
    concealmentTiers: readonly BestiaryInvestigationTier[];
  };
}

/**
 * "Décrypter un monstre" anatomy guide & special rule callouts from *Le Journal du Sorcelleur*
 * (`02_.md` lines 149–228) plus quick Investigation loop reference (`17_investigation.md`).
 */
export const BESTIARY_DECIPHERING_RULES: BestiaryDecipheringRulesBundle = {
  intro: {
    fr: 'Dans Le Journal du Sorcelleur, chaque fiche de monstre suit une structure précise pour aider le MJ à évaluer l’intelligence, les défenses, les connaissances accessibles aux joueurs et les capacités uniques de la créature.',
    en: 'In A Witcher’s Journal, every monster statblock follows a structured layout explaining creature intelligence, defenses, player-facing lore checks, and special mechanics.',
  },
  anatomyItems: [
    {
      id: 'category',
      title: { fr: 'Catégorie', en: 'Category' },
      description: {
        fr: 'Le pictogramme indique la famille du monstre (Nécrophage, Relictuel, Vampire, etc.) et détermine l’huile de sorceleur et les compétences applicables.',
        en: 'The emblem identifies the monster family (Necrophage, Relict, Vampire, etc.), determining applicable witcher oils and lore.',
      },
    },
    {
      id: 'difficulty',
      title: { fr: 'Difficulté (Puissance & Complexité)', en: 'Difficulty (Power & Complexity)' },
      description: {
        fr: 'Évaluée selon deux axes : la puissance brute (Faible, Moyen, Fort) et la complexité tactique (Simple, Complexe, Difficile).',
        en: 'Rated along two axes: raw strength (Easy, Medium, Hard) and tactical complexity (Simple, Complex, Difficult).',
      },
    },
    {
      id: 'intelligence',
      title: { fr: 'Intelligence (Sauvage vs Pensant)', en: 'Intelligence (Wild vs Sapient)' },
      description: {
        fr: 'Les créatures sauvages (INT ≤ 1) attaquent la cible la plus proche ou le dernier attaquant et reçoivent des bonus innés en Survie et Vigilance. Les créatures pensantes (INT > 1) planifient, négocient et peuvent être raisonnées.',
        en: 'Feral beasts (INT ≤ 1) attack the nearest threat or last attacker, boosted by innate Survival/Awareness. Sapient monsters (INT > 1) plan, communicate, and can be reasoned with.',
      },
    },
    {
      id: 'heightened-senses',
      title: { fr: 'Sens accrus', en: 'Heightened Senses' },
      description: {
        fr: 'Nyctalopie (annule les malus de lumière tamisée), Nyctalopie améliorée (annule l’obscurité totale) et Traque olfactive (pistage à l’odorat et bonus en Vigilance).',
        en: 'Night Vision (ignores dim light penalties), Superior Night Vision (ignores total darkness), and Scent Tracking (track by smell with Awareness bonus).',
      },
    },
    {
      id: 'stats',
      title: { fr: 'Caractéristiques', en: 'Statistics' },
      description: {
        fr: 'Caractéristiques primaires et dérivées (PS, Endurance, Étourdissement, Encombrement, Course, Saut, Récupération).',
        en: 'Primary and derived attributes (HP, Stamina, Stun, Encumbrance, Run, Leap, Recovery).',
      },
    },
    {
      id: 'skills',
      title: { fr: 'Compétences (Bases)', en: 'Skills (Skill Bases)' },
      description: {
        fr: 'Sur les fiches publiées, les valeurs affichées sont des bases (Stat + Rang). Dans ce compendium combat, les rangs exacts sont stockés afin que le simulateur calcule Stat + Rang + modificateurs.',
        en: 'Published statblocks list total Skill Bases (Stat + Rank). This compendium stores exact Ranks so Combat Tracker and Simulator compute Stat + Rank cleanly.',
      },
    },
    {
      id: 'defenses',
      title: { fr: 'Défenses', en: 'Defenses' },
      description: {
        fr: 'Regroupe Armure (PA sur tout le corps), Régénération (PS rendus au début du tour), Résistances (dégâts /2), Immunités, Vulnérabilités (dégâts ×2 ou malus de défense) et Bases d’esquive/repositionnement/blocage.',
        en: 'Covers Armor (SP across all locations), Regeneration (HP healed at turn start), Resistances (half damage), Immunities, Vulnerabilities (double damage), and defense bases.',
      },
    },
    {
      id: 'bounty-loot',
      title: { fr: 'Récompense & Butin', en: 'Bounty & Loot' },
      description: {
        fr: 'La prime reflète le contrat moyen local (négociable). Le butin alchimique se prélève facilement, sauf les mutagènes qui exigent un jet de Formation de sorceleur (SD 16).',
        en: 'Bounty shows average contract pay (negotiable). Components are harvested easily, except mutagens which require a Witcher Training check (DC 16).',
      },
    },
    {
      id: 'superstitions',
      title: { fr: 'Superstitions populaires', en: 'Common Superstition' },
      description: {
        fr: 'Rumeurs et croyances locales obtenues sur un jet d’Éducation : souvent erronées mais contenant parfois un indice utile.',
        en: 'Local folklore unlocked via Education checks — frequently exaggerated or flawed, yet offering clues.',
      },
    },
    {
      id: 'behavioral-study',
      title: { fr: 'Étude comportementale', en: 'Behavioral Study' },
      description: {
        fr: 'Faits vérifiés (tactiques, habitudes, failles) obtenus sur un jet de Connaissance des monstres ou Formation de sorceleur (permet au joueur de consulter le bloc de combat).',
        en: 'Verified lore (habits, tactics, weaknesses) unlocked via Monster Lore or Witcher Training checks.',
      },
    },
    {
      id: 'attacks',
      title: { fr: 'Attaques', en: 'Attacks' },
      description: {
        fr: 'Liste des attaques naturelles ou équipées : Base d’attaque, dégâts, type, fiabilité, portée, effets spéciaux et nombre d’attaques par round (un seul type d’attaque par round).',
        en: 'Attack Base, damage/type, reliability, range, special effects, and RoF (remember: only one attack type per round).',
      },
    },
    {
      id: 'vulnerability-tables',
      title: { fr: 'Tableaux de vulnérabilité', en: 'Vulnerability Tables' },
      description: {
        fr: 'Détaille les failles conditionnelles ou rituelles (huile spécifique, bombe, lune, lumière du jour, objet lié) nécessitant une explication complète.',
        en: 'Detailed conditional weaknesses (specific oils, bombs, daylight, bound relics, or ritual conditions).',
      },
    },
    {
      id: 'ability-tables',
      title: { fr: 'Tableaux de capacité', en: 'Ability Tables' },
      description: {
        fr: 'Pouvoirs actifs (exigeant une action ou un tour complet) et aptitudes passives permanentes propres à la créature.',
        en: 'Active powers (requiring an action or full turn) and permanent passive traits unique to the monster.',
      },
    },
    {
      id: 'legendary-lifepaths',
      title: { fr: 'Parcours des monstres légendaires', en: 'Legendary Monster Lifepaths' },
      description: {
        fr: 'Tables narratives et modificateurs permettant de transformer des spécimens rares (Vampires supérieurs, Vrais dragons, Leshens anciens…) en PNJ ou antagonistes majeurs.',
        en: 'Narrative lifepath tables for turning rare apex monsters (Higher Vampires, True Dragons, Ancient Leshens) into unique campaign antagonists.',
      },
    },
  ],
  specialRules: [
    {
      id: 'monsters-weapons',
      title: { fr: 'Monstres et armes', en: 'Monsters & Weapons' },
      description: {
        fr: 'Les monstres pensants dotés de mains peuvent manier des armes humaines en plus ou à la place de leurs attaques naturelles.',
        en: 'Sapient monsters with hands can wield standard weapons alongside or instead of natural attacks.',
      },
    },
    {
      id: 'claw-reliability',
      title: { fr: 'Fiabilité des griffes', en: 'Claw Reliability' },
      description: {
        fr: 'Parer avec des griffes ou une queue use leur Fiabilité. À 0, l’appendice devient inutilisable jusqu’à guérison (+1 Fiabilité/jour si Régénération).',
        en: 'Parrying with claws or tails degrades their Reliability. At 0, that natural weapon is unusable until healed (+1 Reliability/day if Regenerating).',
      },
    },
    {
      id: 'crushing-force',
      title: { fr: 'Force écrasante', en: 'Crushing Force' },
      description: {
        fr: 'Ces attaques ne peuvent jamais être parées et infligent le double de dégâts d’ablation aux armes, boucliers et armures.',
        en: 'Cannot be parried and deals double ablation damage to weapons, shields, and armor.',
      },
    },
    {
      id: 'knockdown',
      title: { fr: 'Effet : Renversement', en: 'Effect: Knockdown' },
      description: {
        fr: 'La cible tombe immédiatement au sol (malus standards d’état « au sol » jusqu’à se relever).',
        en: 'Target is immediately knocked prone.',
      },
    },
    {
      id: 'blood-transfer',
      title: { fr: 'Transfert sanguin', en: 'Blood Transfer' },
      description: {
        fr: 'Les créatures buvant le sang d’une cible subissent immédiatement les effets des potions ou poisons présents dans ce sang (ex. Sang noir).',
        en: 'Creatures drinking a target’s blood immediately suffer the effects of potions or toxins in it (e.g., Black Blood).',
      },
    },
    {
      id: 'disease',
      title: { fr: 'Effet : Maladie', en: 'Effect: Disease' },
      description: {
        fr: 'Malus de –2 à toutes les actions, Endurance max réduite de 1/4, jet de Résilience (SD 14) contre la nausée. Soignée par Mains thérapeutiques (SD 15) + 1 nuit de repos.',
        en: '–2 to all actions, –25% max Stamina, and Endurance DC 14 vs nausea. Cured by Healing Hands (DC 15) plus a full night of rest.',
      },
    },
    {
      id: 'stun-resist',
      title: { fr: 'Résistance à l’étourdissement', en: 'Stun Resistance' },
      description: {
        fr: 'Les créatures résistantes à l’étourdissement ne diminuent jamais leur seuil de sauvegarde d’Étourdissement lors de jets répétés.',
        en: 'Stun-resistant creatures never suffer cumulative reductions to their Stun save threshold.',
      },
    },
    {
      id: 'magical-charms',
      title: { fr: 'Charmes magiques', en: 'Magical Charms' },
      description: {
        fr: 'La résistance aux charmes magiques octroie un bonus de +3 pour contrer toute magie affectant l’esprit ; l’immunité annule entièrement ces effets.',
        en: 'Resistance to magical charms grants +3 to resist mind-affecting magic; immunity negates it outright.',
      },
    },
  ],
  investigation: {
    title: {
      fr: 'Enquête & Mystères (Le Journal du Sorcelleur)',
      en: 'Investigation System (A Witcher’s Journal)',
    },
    intro: {
      fr: 'Pour identifier un monstre avant le combat, le groupe réduit la Complexité du mystère à 0 grâce aux jets de Preuve tout en protégeant sa Concentration contre les échecs et les Obstacles.',
      en: 'To identify a monster before engaging it, investigators reduce Mystery Complexity to 0 using Clue checks while guarding their Focus against failures and Obstacles.',
    },
    concentrationFormula: {
      fr: 'Concentration = [(VOL + INT) / 2] × 3 · Récupération / nuit (6h+) = VOL (+1 si Déduction ≥ 5, +2 si ≥ 8)',
      en: 'Focus = [(WILL + INT) / 2] × 3 · Recovery / night (6h+) = WILL (+1 if Deduction ≥ 5, +2 if ≥ 8)',
    },
    complexityTiers: [
      {
        label: { fr: 'Facile', en: 'Easy' },
        value: '25',
        example: { fr: 'Fragment d’aventure (ex. chasse au scolopendromorphe)', en: 'Short subplot (e.g. Centipede hunt)' },
      },
      {
        label: { fr: 'Moyen', en: 'Medium' },
        value: '50',
        example: { fr: 'Socle d’un scénario complet', en: 'Core pillar of a single adventure' },
      },
      {
        label: { fr: 'Assez difficile', en: 'Fairly Hard' },
        value: '100',
        example: { fr: 'Mystère sur plusieurs aventures', en: 'Multi-session mystery arc' },
      },
      {
        label: { fr: 'Difficile', en: 'Hard' },
        value: '150',
        example: { fr: 'Intrigue majeure de campagne ou de PJ', en: 'Major campaign or PC arc' },
      },
      {
        label: { fr: 'Presque impossible', en: 'Nearly Impossible' },
        value: '200',
        example: { fr: 'Énigme capitale de campagne', en: 'Campaign-defining mystery' },
      },
    ],
    concealmentTiers: [
      {
        label: { fr: 'Solution évidente', en: 'Obvious' },
        value: '0',
        example: { fr: 'Traces fraîches intactes dans la boue', en: 'Fresh, undisturbed monster tracks' },
      },
      {
        label: { fr: 'Recherches minimes', en: 'Minor Research' },
        value: '2',
        example: { fr: 'Empreintes déformées par la pluie', en: 'Tracks blurred by rain' },
      },
      {
        label: { fr: 'Quelques recherches', en: 'Some Research' },
        value: '4',
        example: { fr: 'Traces effacées, croquis fidèle disponible', en: 'Tracks gone; working from accurate sketch' },
      },
      {
        label: { fr: 'Solution obscure', en: 'Obscure' },
        value: '6',
        example: { fr: 'Aucune trace, description orale uniquement', en: 'No physical evidence; oral testimony only' },
      },
    ],
  },
};
