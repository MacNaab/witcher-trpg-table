import type { LocalizedText } from '../bestiary/types';

export interface MagicDefenseRule {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
}

export interface MagicOvercastingEffect {
  id: string;
  element: LocalizedText;
  effect: LocalizedText;
}

export interface MagicSpecialRule {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
}

export interface HexLiftDifficulty {
  id: string;
  danger: LocalizedText;
  educationDc: number;
  witcherTrainingDc: number;
}

export interface SiteOfPowerEntry {
  id: string;
  element: LocalizedText;
  locations: LocalizedText;
  benefit: LocalizedText;
  duration: LocalizedText;
}

export interface MagicLearningTier {
  id: string;
  tier: LocalizedText;
  ppCost: number;
  learningTime: LocalizedText;
  dc: number;
  requiredRolls: number;
}

export interface MagicRulesBundle {
  defenses: readonly MagicDefenseRule[];
  overcasting: readonly MagicOvercastingEffect[];
  castingAndSpecials: readonly MagicSpecialRule[];
  hexLifting: {
    intro: LocalizedText;
    tiers: readonly HexLiftDifficulty[];
  };
  sitesOfPower: {
    intro: LocalizedText;
    abuseRule: LocalizedText;
    sites: readonly SiteOfPowerEntry[];
  };
  learningMagic: {
    intro: LocalizedText;
    prerequisiteRule: LocalizedText;
    tiers: readonly MagicLearningTier[];
  };
}

/**
 * Core Rulebook magic mechanics, defenses, elemental overcasting, Sites of Power,
 * hex-lifting DCs, and spell-learning progression extracted from `guide/magie.md`.
 */
export const MAGIC_CORE_RULES: MagicRulesBundle = {
  defenses: [
    {
      id: 'block',
      label: { fr: 'Blocage', en: 'Block' },
      description: {
        fr: 'La magie peut être bloquée comme n’importe quelle attaque.',
        en: 'The spell can be blocked or parried like any standard attack.',
      },
    },
    {
      id: 'dodge',
      label: { fr: 'Esquive', en: 'Dodge' },
      description: {
        fr: 'La magie peut être esquivée avec Athlétisme ou Esquive/Évasion.',
        en: 'The spell can be dodged using Athletics or Dodge/Escape.',
      },
    },
    {
      id: 'resist-magic',
      label: { fr: 'Résistance à la magie', en: 'Resist Magic' },
      description: {
        fr: 'La magie peut être contrée avec un jet de Résistance à la magie.',
        en: 'The magic can be countered with a Resist Magic roll.',
      },
    },
    {
      id: 'stat-x3',
      label: { fr: 'CARAC × 3', en: 'STAT × 3' },
      description: {
        fr: 'Le lanceur doit battre un seuil de difficulté basé sur une caractéristique de la cible (×3).',
        en: 'The caster must beat a Difficulty Class equal to three times the target’s listed stat.',
      },
    },
    {
      id: 'none',
      label: { fr: 'Aucune', en: 'None' },
      description: {
        fr: 'Impossible de se défendre contre cette magie, à moins d’utiliser le sort Dissipation ou le Signe Héliotrope.',
        en: 'Cannot be defended against normally, except via Dispel or the Heliotrope Sign.',
      },
    },
  ],
  overcasting: [
    {
      id: 'earth',
      element: { fr: 'Terre', en: 'Earth' },
      effect: {
        fr: 'Ébranle le sol autour du mage et bloque ses articulations, l’immobilisant temporairement.',
        en: 'Shakes the ground around the caster and locks their joints, temporarily immobilizing them.',
      },
    },
    {
      id: 'air',
      element: { fr: 'Air', en: 'Air' },
      effect: {
        fr: 'Fait léviter le mage involontairement et lui fait perdre l’équilibre.',
        en: 'Causes the caster to levitate and lose their balance.',
      },
    },
    {
      id: 'fire',
      element: { fr: 'Feu', en: 'Fire' },
      effect: {
        fr: 'Enflamme le mage dans un bûcher de flammes colorées.',
        en: 'Ignites the caster in colored flames.',
      },
    },
    {
      id: 'water',
      element: { fr: 'Eau', en: 'Water' },
      effect: {
        fr: 'Commence à geler le mage en formant des cristaux de glace sur sa peau et ses vêtements.',
        en: 'Begins to freeze the caster, forming ice crystals across skin and clothing.',
      },
    },
    {
      id: 'mixed',
      element: { fr: 'Éléments mixtes', en: 'Mixed Elements' },
      effect: {
        fr: 'Éclate de manière imprévisible selon l’élément prédominant du sort.',
        en: 'Erupts unpredictably according to the dominant element of the spell.',
      },
    },
  ],
  castingAndSpecials: [
    {
      id: 'maintain',
      title: { fr: 'Maintenir un sort (Actif)', en: 'Maintaining Spells (Active)' },
      summary: {
        fr: 'Au début de chacun de ses tours, le lanceur dépense le coût d’END indiqué à côté de « actif ». Il doit rester concentré et ne peut pas lancer d’autres sorts tant qu’il en maintient un.',
        en: 'At the start of each turn, spend the listed STA maintenance cost. While maintaining a spell, the caster cannot cast other spells.',
      },
    },
    {
      id: 'aoe',
      title: { fr: 'Zones d’effet', en: 'Areas of Effect' },
      summary: {
        fr: 'Les sorts à zone d’effet (ex. Tempête statique) touchent indifféremment les ennemis et les alliés (PJ et PNJ amicaux) présents dans la zone.',
        en: 'Area-of-effect spells hit friendly PCs and NPCs as well as enemies within the affected radius.',
      },
    },
    {
      id: 'signs-cap',
      title: { fr: 'Signes (Coût max 7 END & Axii)', en: 'Witcher Signs (Max 7 STA & Axii)' },
      summary: {
        fr: 'Les Signes ont un coût en END variable jusqu’à un maximum de 7 points (toujours sous votre seuil de Vigueur). Axii peut remplacer Persuasion (Incantation vs Résistance à la magie), mais produit une lueur blanche visible.',
        en: 'Signs accept variable STA up to a maximum of 7 points (subject to your Vigor threshold). Axii can replace Persuasion (Spell Casting vs Resist Magic), though a visible white glow surrounds hand and target.',
      },
    },
    {
      id: 'telekinesis',
      title: { fr: 'Télékinésie appliquée', en: 'Telekinesis Tasks' },
      summary: {
        fr: 'Tâches liées à une compétence (faire trébucher, frapper à l’épée) : –3 en VOL et Incantation. Actions complexes (crocheter, tirer à l’arc, charger une arbalète) : –5. Utilisez VOL au lieu de COR pour calculer la portée de projection.',
        en: 'Skill tasks (tripping, sword strikes): -3 WILL & Spell Casting. Complex tasks (lockpicking, archery, loading a crossbow): -5. Use WILL instead of BODY for throwing range.',
      },
    },
    {
      id: 'telepathy-spy',
      title: { fr: 'Espionnage télépathique', en: 'Telepathic Eavesdropping' },
      summary: {
        fr: 'Un médaillon de sorceleur vibre à proximité. Un mage doté d’Exercice de la magie peut tenter 1 jet par round opposé au jet de Télépathie initial pour repérer l’intrusion.',
        en: 'A witcher medallion vibrates nearby. A mage with Magic Training gets one opposed roll per round against the initial Telepathy roll to detect spying.',
      },
    },
    {
      id: 'teleport-blind',
      title: { fr: 'Téléportation à l’aveuglette & Portails', en: 'Blind Teleportation & Portals' },
      summary: {
        fr: 'Téléportation vers un lieu inconnu grâce à un objet qui en provient : jet d’Incantation SD 20 (échec = lieu aléatoire à 2d10 km). Marque incandescente : seul un chirurgien (Mains thérapeutiques SD 15) peut neutraliser la cicatrice.',
        en: 'Teleporting to an unseen place with a physical souvenir requires Spell Casting DC 20 (failure = random spot within 2d10 km). Brand of Fire scars require Healing Hands DC 15 to deactivate.',
      },
    },
    {
      id: 'ritual-components',
      title: { fr: 'Composants de rituels', en: 'Ritual Components' },
      summary: {
        fr: 'Les composants sont consommés à la fin du rituel, qu’il réussisse ou échoue. Certains ingrédients (liqueur, craie) proviennent de l’Équipement général.',
        en: 'All listed components are consumed at the end of a ritual regardless of success or failure.',
      },
    },
    {
      id: 'reverse-engineering-portals',
      title: { fr: 'Rétro-ingénierie de portail & Signes avancés', en: 'Portal Tracing & Advanced Signs' },
      summary: {
        fr: 'Tout Portail actif laisse une trace résiduelle durant 30 s pouvant être rouverte par Réouverture de portail. Somne et Supirre étendent l’arsenal des Sorceleurs (plafond 7 END, soumis au Seuil de Vigueur).',
        en: 'Standing Portals leave a residual trace for 30s re-openable via Reopen Portal. Somne and Supirre expand Witcher Signs (7 STA cap, still bound by Vigor Threshold).',
      },
    },
  ],
  hexLifting: {
    intro: {
      fr: 'En cas d’échec critique au lancement, un envoûtement peut s’appliquer sur le lanceur. Chaque envoûtement possède un rituel de levée spécifique ; identifier la méthode demande un jet d’Éducation ou de Formation de sorceleur.',
      en: 'Fumbling a hex risks applying it to the caster. Identifying the lifting ritual requires an Education or Witcher Training roll based on danger tier.',
    },
    tiers: [
      {
        id: 'low',
        danger: { fr: 'Faible', en: 'Low' },
        educationDc: 16,
        witcherTrainingDc: 14,
      },
      {
        id: 'moderate',
        danger: { fr: 'Modéré', en: 'Moderate' },
        educationDc: 20,
        witcherTrainingDc: 18,
      },
      {
        id: 'high',
        danger: { fr: 'Élevé', en: 'High' },
        educationDc: 26,
        witcherTrainingDc: 22,
      },
    ],
  },
  sitesOfPower: {
    intro: {
      fr: 'En passant 3 rounds complets à se concentrer sur un Site d’Énergie, un utilisateur de magie gagne le bonus élémentaire (1 heure) + 10 P.P. (exclusifs à la magie), ou peut renoncer au bonus pour extraire 5 doses de Cinquième essence.',
      en: 'Focusing on a Place of Power for 3 full rounds grants an elemental bonus (1 hour) + 10 I.P. (for magic only), or 5 doses of Fifth Essence instead of the bonus.',
    },
    abuseRule: {
      fr: 'Dès la 2e utilisation sur un même site, réussir un jet de Résilience SD 20 (+4 au SD par réussite précédente) ou subir immédiatement 5d6 dégâts et les effets de Dépassement élémentaire.',
      en: 'From the 2nd draw onward, roll Endurance DC 20 (+4 per prior success) or immediately take 5d6 damage plus the elemental Overcasting effect.',
    },
    sites: [
      {
        id: 'earth',
        element: { fr: 'Terre', en: 'Earth' },
        locations: {
          fr: 'Lignes de faille, dolines profondes, cavernes naturelles',
          en: 'Fault lines, deep sinkholes, natural caverns',
        },
        benefit: {
          fr: '+5 Seuil de Vigueur (Terre) & +2 aux jets d’Incantation (Terre)',
          en: '+5 Vigor Threshold (Earth) & +2 Spell Casting (Earth)',
        },
        duration: { fr: '1 heure', en: '1 hour' },
      },
      {
        id: 'air',
        element: { fr: 'Air', en: 'Air' },
        locations: {
          fr: 'Zones de tornades fréquentes, sommets de hautes montagnes',
          en: 'Tornado-prone plains, high mountain peaks',
        },
        benefit: {
          fr: '+5 Seuil de Vigueur (Air) & +2 aux jets d’Incantation (Air)',
          en: '+5 Vigor Threshold (Air) & +2 Spell Casting (Air)',
        },
        duration: { fr: '1 heure', en: '1 hour' },
      },
      {
        id: 'fire',
        element: { fr: 'Feu', en: 'Fire' },
        locations: {
          fr: 'Sommets volcaniques, cœur des déserts brûlants',
          en: 'Volcanic peaks, heart of scorching deserts',
        },
        benefit: {
          fr: '+5 Seuil de Vigueur (Feu) & +2 aux jets d’Incantation (Feu)',
          en: '+5 Vigor Threshold (Feu) & +2 Spell Casting (Fire)',
        },
        duration: { fr: '1 heure', en: '1 hour' },
      },
      {
        id: 'water',
        element: { fr: 'Eau', en: 'Water' },
        locations: {
          fr: 'Confluences de rivières/courants, cavernes sous-marines',
          en: 'Confluence of rivers/currents, underwater caves',
        },
        benefit: {
          fr: '+5 Seuil de Vigueur (Eau) & +2 aux jets d’Incantation (Eau)',
          en: '+5 Vigor Threshold (Water) & +2 Spell Casting (Water)',
        },
        duration: { fr: '1 heure', en: '1 hour' },
      },
    ],
  },
  learningMagic: {
    intro: {
      fr: 'Apprendre un sort requiert : (1) un tuteur (mage/prêtre) ou un grimoire, (2) les P.P. nécessaires, et (3) réussir le nombre requis de jets de la compétence magique appropriée. Chaque jet raté oblige à réessayer le lendemain (+1 jour).',
      en: 'Learning a spell requires: (1) a teacher or grimoire, (2) required I.P., and (3) passing the listed number of magical skill rolls. Each failed roll delays learning by 1 day.',
    },
    prerequisiteRule: {
      fr: 'Vous devez débuter avec une Vigueur > 0 pour apprendre la magie (hors Dons magiques). Mages : sorts, rituels, envoûtements, signes. Prêtres & Druides : invocations propres, rituels, envoûtements, signes. Sorceleurs : signes uniquement (Base = Novice, Alternatifs/Avancés = Compagnon).',
      en: 'Requires starting Vigor > 0 (except Magical Gifts, which grant Vigor 2 and cannot learn spells). Mages: spells, rituals, hexes, signs. Priests & Druids: own invocations, rituals, hexes, signs. Witchers: signs only (Basic = Novice, Alt/Advanced = Journeyman).',
    },
    tiers: [
      {
        id: 'novice',
        tier: { fr: 'Novice / bas', en: 'Novice / Low' },
        ppCost: 10,
        learningTime: { fr: '4 jours', en: '4 days' },
        dc: 14,
        requiredRolls: 2,
      },
      {
        id: 'journeyman',
        tier: { fr: 'Compagnon / moyen', en: 'Journeyman / Moderate' },
        ppCost: 20,
        learningTime: { fr: '1 semaine', en: '1 week' },
        dc: 18,
        requiredRolls: 4,
      },
      {
        id: 'master',
        tier: { fr: 'Maître / élevé', en: 'Master / High' },
        ppCost: 30,
        learningTime: { fr: '3 semaines', en: '3 weeks' },
        dc: 22,
        requiredRolls: 6,
      },
      {
        id: 'archpriest',
        tier: { fr: 'Archiprêtre', en: 'Archpriest' },
        ppCost: 40,
        learningTime: { fr: '5 semaines', en: '5 weeks' },
        dc: 24,
        requiredRolls: 8,
      },
    ],
  },
};
