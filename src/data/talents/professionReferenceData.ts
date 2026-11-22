import type { LocalizedText } from '../bestiary/types';
import type { ProfessionId } from './types';

export interface DefiningSkillReference {
  professionId: ProfessionId;
  name: LocalizedText;
  attribute?: string;
  description: LocalizedText;
  sidebar?: {
    title: LocalizedText;
    text: LocalizedText;
  };
}

export interface TalentSubTable {
  title: LocalizedText;
  columns: readonly LocalizedText[];
  rows: readonly (readonly string[])[];
}

export interface TalentReferenceExtra {
  talentId: string;
  tables?: readonly TalentSubTable[];
  sidebar?: {
    title: LocalizedText;
    text: LocalizedText;
  };
}

/**
 * Official Core Rulebook Defining Skill mechanics & attributes for all 9 core professions (`guide/professions.md`).
 */
export const CORE_DEFINING_SKILLS_REF: Partial<
  Record<ProfessionId, DefiningSkillReference>
> = {
  craftsman: {
    professionId: 'craftsman',
    name: { fr: 'Rafistolage', en: 'Patch Job' },
    attribute: 'TECH',
    description: {
      fr: 'En 1 round, l’Artisan effectue un jet de Rafistolage (SD = SD de fabrication –3) pour réparer temporairement une armure (regagne la moitié de son PA total) ou une arme/bouclier (regagne la moitié de sa Fiabilité). Tant qu’elle n’est pas réparée à la forge, une arme rafistolée inflige la moitié des dégâts normaux.',
      en: 'Spend 1 round rolling Patch Job (DC = Crafting DC - 3) to restore half SP to broken armor or half Reliability to a weapon/shield. A patched weapon deals half normal damage until properly forged.',
    },
    sidebar: {
      title: { fr: 'Point trop n’en faut', en: 'Only So Much' },
      text: {
        fr: 'Vous pouvez rafistoler une arme, une armure ou un bouclier qui l’a déjà été une nouvelle fois, mais cette réparation de fortune n’octroie que le quart du PA/Fiabilité initial (arrondi à l’inférieur).',
        en: 'Repatching an already patched item only restores a quarter of its original SP/Reliability (rounded down).',
      },
    },
  },
  bard: {
    professionId: 'bard',
    name: { fr: 'Prestation', en: 'Busking' },
    attribute: 'EMP',
    description: {
      fr: 'Le Barde effectue un jet de Prestation en se produisant 1 heure sur la place publique : le résultat correspond au montant en couronnes récolté. Si le total devient négatif après un échec critique, il ne gagne rien, se fait huer et subit –2 en Charisme avec les citadins jusqu’à la fin de la journée.',
      en: 'Perform on a town square for 1 hour; your Busking roll equals the crowns earned. A negative total on a fumble earns nothing, causes jeering, and imposes -2 Charisma with locals for the rest of the day.',
    },
  },
  criminal: {
    professionId: 'criminal',
    name: { fr: 'Paranoïa exercée', en: 'Practiced Paranoia' },
    attribute: 'INT',
    description: {
      fr: 'À moins de 10 m d’un piège (pièges expérimentaux, chausse-trappes, embuscades), le Criminel réalise immédiatement un jet de Paranoïa exercée contre le SD de détection du piège, la Furtivité du groupe en embuscade ou le SD du MJ. Même s’il ne localise pas le piège, il sent que quelque chose cloche.',
      en: 'Within 10 m of a trap or ambush, immediately roll Practiced Paranoia against the trap’s detection DC or ambushers’ Stealth. Even on a failure, you sense something is off.',
    },
  },
  doctor: {
    professionId: 'doctor',
    name: { fr: 'Mains thérapeutiques', en: 'Healing Hands' },
    attribute: 'TECH',
    description: {
      fr: 'Seul le Docteur possède la formation requise pour soigner les blessures critiques. Il doit réussir un nombre de jets de Mains thérapeutiques et un SD dépendant de la gravité de la blessure critique. Peut aussi remplacer Premiers soins.',
      en: 'The only skill capable of treating Critical Wounds, requiring a number of rolls and DC determined by wound severity. Can also be used for First Aid.',
    },
  },
  'man-at-arms': {
    professionId: 'man-at-arms',
    name: { fr: 'Dur à cuire', en: 'Tough as Nails' },
    attribute: 'COR',
    description: {
      fr: 'Lorsque ses PS tombent à 0 ou moins, l’Homme d’armes peut réussir un jet de Dur à cuire (SD = double du score de santé négatif) pour éviter la mort imminente et continuer à combattre comme à son seuil de blessures. Chaque nouveau dégât subi exige un nouveau jet.',
      en: 'At 0 HP or lower, roll Tough as Nails (DC = double your negative HP) to avoid Dying state and keep fighting as if at your Wound Threshold. Re-roll whenever taking new damage.',
    },
  },
  mage: {
    professionId: 'mage',
    name: { fr: 'Exercice de la magie', en: 'Magic Training' },
    attribute: 'INT',
    description: {
      fr: 'Permet d’identifier tout phénomène magique ou sort inconnu, d’analyser une théorie de la magie (SD fixé par le MJ) et de détecter la magie en cours d’utilisation ou les spectres.',
      en: 'Identify unfamiliar spells or magical phenomena, analyze magical theory (GM DC), and detect active magic or specters.',
    },
  },
  merchant: {
    professionId: 'merchant',
    name: { fr: 'Grand voyageur', en: 'Well Traveled' },
    attribute: 'INT',
    description: {
      fr: 'Permet d’effectuer un jet (SD fixé par le MJ) pour se rappeler d’une anecdote utile concernant un objet, une culture ou une région particulière grâce aux voyages précédents du Marchand.',
      en: 'Roll against a GM-set DC to recall practical lore or anecdotes about an item, culture, or region visited on past journeys.',
    },
  },
  priest: {
    professionId: 'priest',
    name: { fr: 'Initié des Dieux', en: 'Initiate of the Gods' },
    attribute: 'EMP',
    description: {
      fr: 'Dans les temples de sa religion (ou auprès des croyants de sa confession, avec moins de moyens), un jet réussi (SD fixé par le MJ) octroie hébergement gratuit, soins et services. Ne fonctionne jamais avec une autre religion.',
      en: 'Roll in temples or among worshippers of your faith for free lodging, healing, and aid. Never works on followers of another faith.',
    },
  },
  witcher: {
    professionId: 'witcher',
    name: { fr: 'Formation de sorceleur', en: 'Witcher Training' },
    attribute: 'INT',
    description: {
      fr: 'Réduit les pénalités d’environnement hostile ou de relief accidenté de la moitié de son score de Formation de sorceleur (minimum 1). Peut également remplacer Connaissance des monstres.',
      en: 'Reduces environmental and rough-terrain penalties by half your Witcher Training rank (min 1). Also substitutes for Monster Lore.',
    },
  },
  noble: {
    professionId: 'noble',
    name: { fr: 'Prestige', en: 'Notoriety' },
    description: {
      fr: 'Un Noble ajoute son niveau de Prestige à son score de Réputation lorsqu’il se trouve sur sa terre natale ou dans un pays allié. Lorsqu’il se rend dans un territoire ouvertement en guerre avec son pays d’origine ou qui conserve une position de neutralité, il n’ajoute que la moitié de son niveau de Prestige.',
      en: 'A Noble adds their Notoriety rank to their Reputation score when in their homeland or an allied country. In neutral or openly hostile/warring territories, they add only half their Notoriety rank.',
    },
  },
};

/**
 * Official skill-tree sub-tables and sidebars from `guide/professions.md` keyed by talent ID.
 */
export const TALENT_REFERENCE_EXTRAS: Readonly<Record<string, TalentReferenceExtra>> = {
  'tl-craftsman-amelioration': {
    talentId: 'tl-craftsman-amelioration',
    tables: [
      {
        title: { fr: 'Tableau d’Amélioration', en: 'Upgrade Table' },
        columns: [
          { fr: 'Amélioration', en: 'Upgrade' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Arme — Renforcée (+2 Fiabilité)', '14'],
          ['Arme — Crantée/crochets (+25 % saignement)', '16'],
          ['Arme — Allégée (+1 Précision)', '18'],
          ['Armure — Renforcée (+2 PA)', '14'],
          ['Armure — Camouflage (+1 Furtivité)', '16'],
          ['Armure — Cloutée (+2 dégâts en cas de saisie)', '18'],
        ],
      },
    ],
  },
  'tl-craftsman-plaque-argent': {
    talentId: 'tl-craftsman-plaque-argent',
    sidebar: {
      title: { fr: 'Placage d’argent', en: 'Silver Coating Cost' },
      text: {
        fr: 'Il faut compter 2 lingots d’argent pour une arme à une main, 4 lingots pour une arme à deux mains, et 1 lingot pour 10 pointes de flèches ou de carreaux.',
        en: 'Requires 2 silver ingots for a 1-handed weapon, 4 ingots for a 2-handed weapon, or 1 ingot per 10 arrow/bolt heads.',
      },
    },
  },
  'tl-bard-captiver-la-foule': {
    talentId: 'tl-bard-captiver-la-foule',
    sidebar: {
      title: { fr: 'Captiver la foule', en: 'Captivate Crowd' },
      text: {
        fr: 'Un SD 15 en zone fréquentée rassemble une foule si dense qu’il faut réussir Physique ou Athlétisme SD 15 pour la traverser. Les ennemis et créatures non conscientes reçoivent +10 pour y résister.',
        en: 'A DC 15 roll in a busy area gathers a dense crowd requiring Physique or Athletics DC 15 to push through. Enemies and mindless creatures get +10 to resist.',
      },
    },
  },
  'tl-bard-bon-ami': {
    talentId: 'tl-bard-bon-ami',
    tables: [
      {
        title: { fr: 'Répartition Bon ami', en: 'Good Friend Cost Table' },
        columns: [
          { fr: 'Catégorie / Valeur', en: 'Category / Value' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Localité — Hameau', '3'],
          ['Localité — Village', '4'],
          ['Localité — Ville', '5'],
          ['Localité — Capitale', '10'],
          ['Profession — Roturier', '3'],
          ['Profession — Tavernier', '5'],
          ['Profession — Artisan', '6'],
          ['Profession — Garde', '8'],
          ['Profession — Noble', '10'],
          ['Statut — Mineur', '2'],
          ['Statut — Normal', '5'],
          ['Statut — Élevé', '10'],
        ],
      },
    ],
  },
  'tl-bard-acclimatation': {
    talentId: 'tl-bard-acclimatation',
    tables: [
      {
        title: { fr: 'SD d’Acclimatation', en: 'Acclimation DC' },
        columns: [
          { fr: 'Zone', en: 'Area' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Hameau', '25'],
          ['Village', '20'],
          ['Ville', '15'],
          ['Capitale', '10'],
        ],
      },
    ],
  },
  'tl-criminal-plan-mental': {
    talentId: 'tl-criminal-plan-mental',
    tables: [
      {
        title: { fr: 'SD de Plan mental', en: 'Mental Map DC' },
        columns: [
          { fr: 'Localité', en: 'Location' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Hameau', '16'],
          ['Village', '18'],
          ['Ville', '20'],
          ['Capitale', '22'],
        ],
      },
    ],
  },
  'tl-criminal-planque': {
    talentId: 'tl-criminal-planque',
    tables: [
      {
        title: { fr: 'Répartition Planque', en: 'Stash Cost Table' },
        columns: [
          { fr: 'Catégorie / Option', en: 'Category / Option' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Localisation — À une semaine de cheval', '3'],
          ['Localisation — À un jour de cheval', '5'],
          ['Localisation — À un jour de marche', '8'],
          ['Localisation — Dans le coin', '10'],
          ['Sécurité — Cadenas', '1'],
          ['Sécurité — Abri dissimulé', '2'],
          ['Sécurité — 5 pièges (au choix du MJ)', '3'],
          ['Sécurité — 2 bandits en faction', '5'],
          ['Installations — Eau et nourriture', '1'],
          ['Installations — Instruments chirurgicaux', '2'],
          ['Installations — Une forge', '3'],
          ['Installations — Ensemble d’alchimie', '3'],
        ],
      },
    ],
  },
  'tl-criminal-frappe-assassine': {
    talentId: 'tl-criminal-frappe-assassine',
    tables: [
      {
        title: { fr: 'Modificateurs de Frappe assassine', en: 'Assassin’s Strike Modifiers' },
        columns: [
          { fr: 'Situation', en: 'Situation' },
          { fr: 'Mod.', en: 'Mod.' },
        ],
        rows: [
          ['À portée d’engagement', '–3'],
          ['En plein jour', '–5'],
          ['Obscurité', '+5'],
          ['Lumière tamisée', '+2'],
          ['Zone bondée', '+3'],
          ['Zone calme', '–1'],
          ['À plus de 20 m de la cible', '+3'],
        ],
      },
    ],
  },
  'tl-doctor-remede-naturel': {
    talentId: 'tl-doctor-remede-naturel',
    tables: [
      {
        title: { fr: 'Recettes de Remède naturel', en: 'Herbal Remedy Recipes' },
        columns: [
          { fr: 'Substances & Effet', en: 'Substances & Effect' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Vitriol + Rebis : +15 points de santé pendant 1 heure', '18'],
          ['Quebrith + Sol : Soulage les douleurs pendant 1 h (–4 aux malus critiques et portes de la mort)', '14'],
          ['Éther + Caelum : Annule les pénalités de lumière tamisée pendant 1 h (double malus lumière vive)', '14'],
          ['Fulgur + Vermillon : +3 contre les tests d’Intimidation pendant 1 heure', '15'],
          ['Hydragenum + Rebis : +3 en Séduction pendant 1 heure', '15'],
          ['Éther + Vitriol : +3 en Vigilance pendant 1 heure', '15'],
          ['Vermillon + Quebrith : +15 en Endurance pendant 1 heure', '18'],
          ['Fulgur + Sol : Plonge dans le coma pendant 1 heure', '18'],
          ['Caelum + Hydragenum : Rester éveillé toute la nuit sans pénalité', '17'],
          ['Vermillon + Sol : +3 en Réflexes pendant 10 rounds', '15'],
        ],
      },
    ],
  },
  'tl-man-at-arms-portee-extreme': {
    talentId: 'tl-man-at-arms-portee-extreme',
    tables: [
      {
        title: { fr: 'SD de Portée extrême', en: 'Extreme Range DC' },
        columns: [
          { fr: 'Distance', en: 'Distance' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Juste hors de portée', '12'],
          ['À 50 % de la portée maximale', '15'],
          ['Deux fois plus loin que la portée maximale', '18'],
        ],
      },
    ],
  },
  'tl-man-at-arms-double-tir': {
    talentId: 'tl-man-at-arms-double-tir',
    sidebar: {
      title: { fr: 'Bloquer un Double tir', en: 'Blocking Twin Shot' },
      text: {
        fr: 'Une action suffit pour esquiver un Double tir ou le bloquer avec un bouclier. Quant aux parades, elles subissent un malus de –6 au lieu du –3 habituel.',
        en: 'One action suffices to dodge or shield-block Twin Shot; parries suffer a -6 penalty instead of the usual -3.',
      },
    },
  },
  'tl-man-at-arms-chausse-trappe': {
    talentId: 'tl-man-at-arms-chausse-trappe',
    tables: [
      {
        title: { fr: 'Pièges de Chausse-trappe', en: 'Booby Trap Types' },
        columns: [
          { fr: 'Type de piège', en: 'Trap Type' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Filet : la cible doit réussir un jet sous le SD du piège pour se dégager d’une saisie', '14'],
          ['Désarmant : frappe à hauteur d’épaule pour faire lâcher son arme', '18'],
          ['Aveuglant : projette sable ou terre dans les yeux pour aveugler', '16'],
          ['Fil : installé au ras du sol, frappe les jambes pour faire trébucher', '14'],
          ['Perforant : projette des pieux causant une hémorragie', '18'],
          ['Assommant : frappe à la tête ou à l’estomac assez fort pour assommer', '16'],
        ],
      },
    ],
  },
  'tl-mage-atout': {
    talentId: 'tl-mage-atout',
    tables: [
      {
        title: { fr: 'Répartition d’Atout', en: 'Asset Cost Table' },
        columns: [
          { fr: 'Caractéristique / Option', en: 'Attribute / Option' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Localité — Hameau', '3'],
          ['Localité — Village', '4'],
          ['Localité — Ville', '5'],
          ['Localité — Capitale', '10'],
          ['Profession — Tavernier', '3'],
          ['Profession — Artisan', '5'],
          ['Profession — Garde', '6'],
          ['Profession — Mage', '8'],
          ['Profession — Noble', '10'],
          ['Statut — Mineur', '2'],
          ['Statut — Normal', '5'],
          ['Statut — Élevé', '10'],
          ['Relation — Chantage', '3'],
          ['Relation — Dette', '5'],
          ['Relation — Amitié', '6'],
          ['Relation — Amour', '8'],
          ['Relation — Ensorcelé', '10'],
        ],
      },
    ],
    sidebar: {
      title: { fr: 'Degré d’implication (Relation)', en: 'Asset Relationship' },
      text: {
        fr: 'Ensorcelé : prêt à tout. Amour : ira jusqu’au bout contre preuves d’affection. Amitié : à convaincre de prendre des risques. Dette : un seul service. Chantage : 1 chance sur 2 qu’il vous trahisse.',
        en: 'Hexed: does anything. Love: requires affection. Friendship: must be convinced for risks. Debt: one favor only. Blackmail: 50% chance of betrayal.',
      },
    },
  },
  'tl-merchant-gueusaille': {
    talentId: 'tl-merchant-gueusaille',
    tables: [
      {
        title: { fr: 'SD Localités (Gueusaille)', en: 'Settlement DC (Ragamuffins)' },
        columns: [
          { fr: 'Localité', en: 'Settlement' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Village', '14'],
          ['Ville', '18'],
          ['Capitale', '22'],
        ],
      },
    ],
  },
  'tl-merchant-bonne-reputation': {
    talentId: 'tl-merchant-bonne-reputation',
    tables: [
      {
        title: { fr: 'SD Localités (Bonne réputation)', en: 'Settlement DC (Good Name)' },
        columns: [
          { fr: 'Localité', en: 'Settlement' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Village', '14'],
          ['Ville', '18'],
          ['Capitale', '22'],
        ],
      },
    ],
  },
  'tl-merchant-debiteur-martial': {
    talentId: 'tl-merchant-debiteur-martial',
    tables: [
      {
        title: { fr: 'Tableau de Guerrier', en: 'Warrior Debt Table' },
        columns: [
          { fr: 'Catégorie / Option', en: 'Category / Option' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Attaque et défense — 10', '4'],
          ['Attaque et défense — 14', '8'],
          ['Attaque et défense — 16', '10'],
          ['Intelligence — 3', '2'],
          ['Intelligence — 5', '5'],
          ['Intelligence — 9', '10'],
          ['Équipement — Veste PA 3, dague zerrikanienne, arbalète de poing + 10 carreaux', '4'],
          ['Équipement — Veste PA 5, arc long + 30 flèches', '6'],
          ['Équipement — Armure de plate et torrwr', '10'],
        ],
      },
    ],
  },
  'tl-priest-pacte-animal': {
    talentId: 'tl-priest-pacte-animal',
    tables: [
      {
        title: { fr: 'SD d’ordre (Pacte animal)', en: 'Animal Command DC' },
        columns: [
          { fr: 'Ordre', en: 'Command' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Attaquer / Arrête / Battre en retraite', '10'],
          ['Défendre une cible / Pas touche !', '14'],
          ['Attraper une cible / Monter l’animal / Monter la garde / Aller en lieu connu', '15'],
          ['Surveiller une zone', '16'],
          ['Attraper un objet', '17'],
        ],
      },
      {
        title: { fr: 'SD de pacte par animal', en: 'Animal Affinity DC' },
        columns: [
          { fr: 'Animal', en: 'Animal' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Chien', '10'],
          ['Chat', '12'],
          ['Cheval / Mule / Oiseau', '14'],
          ['Chien sauvage', '15'],
          ['Destrier / Loup / Serpent', '16'],
          ['Bœuf', '17'],
        ],
      },
    ],
  },
  'tl-priest-emissaire-des-dieux': {
    talentId: 'tl-priest-emissaire-des-dieux',
    sidebar: {
      title: { fr: 'Apôtres', en: 'Zealots / Followers' },
      text: {
        fr: 'Chaque ordre étrange ou inapproprié demande un jet d’Émissaire des dieux (SD fixé par le MJ). Au bout de trois échecs, les apôtres vous abandonnent — et vous attaquent ou vous marquent hérétique si le dernier jet est un échec critique.',
        en: 'Each strange or inappropriate command requires a Roll (GM DC). Three failures cause followers to abandon you — or attack/brand you a heretic on a fumble.',
      },
    },
  },
  'tl-witcher-transmutation': {
    talentId: 'tl-witcher-transmutation',
    tables: [
      {
        title: { fr: 'Bonus de Transmutation par Décoction', en: 'Decoction Transmutation Bonuses' },
        columns: [
          { fr: 'Décoction', en: 'Decoction' },
          { fr: 'Bonus supplémentaire (SD 18)', en: 'Extra Effect (DC 18)' },
        ],
        rows: [
          ['Arachas', 'Quiconque entre en contact avec votre salive a 50 % de chance d’être empoisonné.'],
          ['Fiellon', 'Bonus de +4 en Charisme, Séduction et Persuasion.'],
          ['Griffon', 'Acuité visuelle accrue : bonus de +4 en Vigilance.'],
          ['Guenaude sépulcrale', 'Récupérez 10 points d’END lorsque vous tuez un adversaire.'],
          ['Katakan', 'Récupérez 3 PS dès que vous infligez des dégâts.'],
          ['Loup-garou', 'Mâchoire renforcée : attaques de morsure infligeant 2d6 dégâts.'],
          ['Nekker', 'Jambes plus puissantes : +3 m à votre valeur de SAUT.'],
          ['Spectre de midi', 'Yeux modifiés : vous ignorez les modificateurs de luminosité.'],
          ['Troll', 'Corps et os renforcés : +1d6 dégâts physiques supplémentaires.'],
          ['Wyvern', 'Muscles affermis : +5 en VIT (se répercute sur votre valeur de COU).'],
        ],
      },
    ],
  },
  'tl-witcher-deviation-de-fleches': {
    talentId: 'tl-witcher-deviation-de-fleches',
    sidebar: {
      title: { fr: 'Parer des bombes', en: 'Deflecting Bombs' },
      text: {
        fr: 'Les bombes et autres attaques à aire d’effet explosent après la résolution de la parade. Si la seconde cible esquive l’attaque, faites un jet sur la table de dispersion pour voir où l’attaque atterrit.',
        en: 'Bombs and AoE attacks explode after the parry resolves. If the secondary target dodges, roll on the scatter table to determine where it lands.',
      },
    },
  },
  'tl-noble-esbroufe': {
    talentId: 'tl-noble-esbroufe',
    sidebar: {
      title: { fr: 'Berner un expert', en: 'Fooling an Expert' },
      text: {
        fr: 'Si vous tentez de leurrer une personne ayant au moins 5 points dans la compétence concernée avec votre Esbroufe, la cible peut ajouter sa valeur de compétence à son jet de Résistance à la contrainte.',
        en: 'If you try to fool someone with at least 5 ranks in the relevant skill using Posture, the target adds that skill’s rank to their Resist Coercion roll.',
      },
    },
  },
  'tl-noble-reception': {
    talentId: 'tl-noble-reception',
    sidebar: {
      title: { fr: 'Organiser des festivités', en: 'Throwing a Party' },
      text: {
        fr: 'Pour organiser une réception digne de ce nom, un hôte doit prévoir un banquet, des jeux et des distractions adaptés au lieu de réception et au thème de la fête. S’il le souhaite, le Noble peut volontairement diminuer son niveau de Réception lorsqu’il prépare des festivités pour économiser de l’argent. Par contre, le SD du jet pour refuser l’invitation sera égal au rang de Réception après application de la réduction.',
        en: 'A host must plan food, games, and entertainment fitting the venue and theme. A Noble may intentionally lower their effective Host rank when budgeting to save coin, but the DC to decline the invitation uses that reduced rank.',
      },
    },
  },
  'tl-noble-serviteurs': {
    talentId: 'tl-noble-serviteurs',
    sidebar: {
      title: { fr: 'Serviteurs', en: 'Retainers' },
      text: {
        fr: 'Vos serviteurs sont des PNJ ordinaires. Lors de leur création, vous pouvez sélectionner les profils de PNJ ordinaires suivants : artisans, baladins, journaliers ou savants. Ils ne gagnent pas de PP et ne peuvent pas améliorer leurs compétences.',
        en: 'Your retainers are everyday NPCs. Choose from Craftsman, Entertainer, Laborer, or Scholar everyday NPC profiles when creating them. They do not gain IP and cannot raise their skills.',
      },
    },
  },
  'tl-noble-harnois-de-qualite': {
    talentId: 'tl-noble-harnois-de-qualite',
    sidebar: {
      title: { fr: 'Harnois de qualité et dégâts', en: 'Quality Armor & Damage' },
      text: {
        fr: 'Lorsqu’un Noble annule une blessure critique avec Harnois de qualité, il supprime également les dégâts supplémentaires de la blessure critique. Néanmoins, il subit les dégâts normaux de l’arme après avoir soustrait la valeur de PA de son armure.',
        en: 'When a Noble negates a Critical Wound with Quality Armor, they also negate its bonus Critical damage, though they still take normal weapon damage after subtracting armor SP.',
      },
    },
  },
};
