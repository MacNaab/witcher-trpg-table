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
      fr: 'Dans les temples de sa religion (ou auprès des croyants de sa confession, avec moins de moyens), un jet réussi (SD fixé par le MJ) octroie hébergement gratuit, soins et services. À la discrétion du MJ, fonctionne aussi avec les fidèles de divinités apparentées, jamais avec une autre religion.',
      en: 'Roll in temples or among worshippers of your faith (or related deities at GM discretion) for free lodging, healing, and aid. Never works on followers of unrelated faiths.',
    },
  },
  druid: {
    professionId: 'druid',
    name: { fr: 'Rite du Chêne et du Gui', en: 'Rite of Oak and Mistletoe' },
    attribute: 'INT',
    description: {
      fr: 'En 1 jour (1 round complet au rang 10), un jet d’INT permet de façonner un bâton-focalisateur personnel (SD : Forêt 14, Marais 16, Montagne 18, Mer 20). Valeur de Focalisation : 1 au rang 1, +1 tous les 2 rangs (max 4 au rang 7), Focalisation supérieure au rang 9. Tant qu’il le porte : ignore les pénalités de végétation dense/marais (rang 2), neige/glace (rang 4), chaleur extrême (rang 6) et combat sous-marin (rang 8).',
      en: 'Spend 1 day (1 full round at rank 10) rolling INT (DC: Forest 14, Swamp 16, Mountain 18, Sea 20) to craft a personal Focus staff (Focus 1 at rank 1, +1 every 2 ranks up to 4 at rank 7, Greater Focus at rank 9). While carried, ignore penalties for overgrown/swampy terrain (rank 2), snow/ice (rank 4), extreme heat (rank 6), and underwater combat (rank 8).',
    },
    sidebar: {
      title: { fr: 'Druides Halfelins & Cercles', en: 'Halfling Druids & Circles' },
      text: {
        fr: 'Bien que les Halfelins ne puissent pas lancer d’invocations ni tracer de sigils en raison de leur résistance innée à la magie, quelques familles halfelines siègent au Cercle de Bleobheris. Grands cercles : Gwyn Carn, Clan des Corbeaux, Bleobheris, Caed Myrkvid et Gedyneith.',
        en: 'While halflings cannot cast invocations or sigils due to innate magic deterrence, several halfling families serve within the Circle of Bleobheris. Major circles: Gwyn Carn, Crow Clan, Bleobheris, Caed Myrkvid, and Gedyneith.',
      },
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
  vampire: {
    professionId: 'vampire',
    name: { fr: 'Étreinte', en: 'Embrace' },
    attribute: 'COR',
    description: {
      fr: 'Pour se saisir d’une cible et se nourrir, le Vampire effectue un jet d’Étreinte (COR) en opposition à l’Esquive ou la Bagarre de la victime. Il se régénère de son rang d’Étreinte × 2 PS grâce au sang absorbé. Il s’agit d’une addiction plus que d’un besoin vital : 97 % de risque d’addiction au rang 1, réduit de 8 % par rang (soit 15 % au rang 10). En cas d’addiction, il doit se nourrir le jour suivant ou subir un malus de 25 % pour y résister.',
      en: 'To grapple and feed, roll Embrace (BODY) opposed by the victim’s Dodge or Brawling, regenerating Embrace rank × 2 HP. Blood is an addiction rather than a survival necessity: 97% addiction chance at rank 1, reduced by 8% per rank (15% at rank 10). Once addicted, the vampire must feed within the next day or suffer a -25% penalty to resist.',
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
  'tl-priest-mystagogue': {
    talentId: 'tl-priest-mystagogue',
    tables: [
      {
        title: { fr: 'SD d’Érection de Sanctuaire (Mystagogue)', en: 'Shrine Settlement DC (Mystagogue)' },
        columns: [
          { fr: 'Localité', en: 'Settlement' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Hameau', '22'],
          ['Ville / Bourg', '20'],
          ['Petite cité', '18'],
          ['Capitale', '14'],
        ],
      },
    ],
  },
  'tl-priest-mystere-du-culte': {
    talentId: 'tl-priest-mystere-du-culte',
    tables: [
      {
        title: { fr: 'Mystère du culte & Divinités', en: 'Cult Mystery & Deities' },
        columns: [
          { fr: 'Type de clergé', en: 'Priesthood Type' },
          { fr: 'Divinités & Effet', en: 'Deities & Effect' },
        ],
        rows: [
          ['Églises organisées (Feu Éternel, Kreve, Grand Soleil, Melitele, Prophète Lebioda)', 'Ajoute le rang de Mystère du culte aux jets d’Initié des Dieux.'],
          ['Anciens Dieux (Dana Meadbh, Epona, Freya, Lilvani, Morrigan, Nehaleni, Veyopatis)', 'Lors d’un rituel, lance Mystère du culte ET Rituels et garde le meilleur résultat.'],
          ['Cultes sombres (Coram Agh Tera, Svalblod)', 'Contre la détection magique de la foi, oppose Mystère du culte ; ajoute ce rang en Duperie contre la scrutation ordinaire.'],
        ],
      },
    ],
  },
  'tl-priest-benedictions': {
    talentId: 'tl-priest-benedictions',
    tables: [
      {
        title: { fr: 'Bénédictions (SD 16 · 1 jour)', en: 'Blessings (DC 16 · 1 day)' },
        columns: [
          { fr: 'Type de clergé', en: 'Priesthood Type' },
          { fr: 'Bénéfice', en: 'Benefit' },
        ],
        rows: [
          ['Églises organisées', '+4 en Commandement et +4 en Réputation.'],
          ['Anciens Dieux', '+3 en PA (SP) et +2 en Résistance à la magie.'],
          ['Cultes sombres', '+4 en Furtivité et +4 en Initiative.'],
        ],
      },
    ],
  },
  'tl-priest-emissaire-des-dieux': {
    talentId: 'tl-priest-emissaire-des-dieux',
    sidebar: {
      title: { fr: 'Guider vos Apôtres', en: 'Guiding Your Apostles' },
      text: {
        fr: 'Chaque ordre étrange ou contraire à la doctrine demande un jet d’Émissaire des dieux (SD fixé par le MJ). Au bout de trois échecs consécutifs, les apôtres vous abandonnent — et vous attaquent ou vous marquent hérétique si le 3e jet est un échec critique.',
        en: 'Each strange or uncharacteristic command requires a Word of God roll (GM DC). Three consecutive failures cause followers to abandon you — or attack/brand you a heretic if the 3rd is a fumble.',
      },
    },
  },
  'tl-druid-pacte-animal': {
    talentId: 'tl-druid-pacte-animal',
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
  'tl-druid-forme-bestiale': {
    talentId: 'tl-druid-forme-bestiale',
    tables: [
      {
        title: { fr: 'Aspects de Métamorphose (Forme bestiale)', en: 'Shapeshift Aspects (Bestial Form)' },
        columns: [
          { fr: 'Animal', en: 'Animal' },
          { fr: 'Effet de la forme hybride', en: 'Hybrid Form Effect' },
        ],
        rows: [
          ['Sanglier (Boar)', 'Peau épaissie et soies : +3 PA sur toutes les localisations.'],
          ['Ours (Bear)', 'Griffes naturelles : 4d6 tranchants, Fiabilité 10 (+1 Fiab/jour si endommagées).'],
          ['Loup (Wolf)', 'Sens aiguisés : +1 Vigilance et pistage à l’odorat (Scent Tracking).'],
          ['Panthère (Panther)', 'Pattes digitigrades : Saut ×2 horizontalement ou verticalement (action de mouvement, sans élan).'],
          ['Serpent', 'Crocs venimeux : morsure 3d6 avec 100 % de chance d’Empoisonnement.'],
          ['Hibou (Owl)', 'Yeux élargis et plumes faciales : Vision nocturne supérieure.'],
          ['Corbeau (Crow)', '+1 INT (peut dépasser 10) et Repositionnement sur toute la valeur de VIT au lieu de la moitié.'],
        ],
      },
    ],
  },
  'tl-druid-bosquet-sacre': {
    talentId: 'tl-druid-bosquet-sacre',
    tables: [
      {
        title: { fr: 'Protections de Bosquet sacré', en: 'Sacred Grove Protections' },
        columns: [
          { fr: 'Protection & Effet', en: 'Protection & Effect' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Végétation envahissante : plantes prolifèrent, –2 en Esquive/Évasion et Athlétisme.', '2'],
          ['Récolte miraculeuse : double le nombre d’ingrédients végétaux récoltés sur place.', '4'],
          ['Récolte empoisonnée : toute culture poussant dans le bosquet inflige Empoisonnement si consommée.', '6'],
          ['Égaré : brouillard magique ; Résistance à la magie SD 16 requise pour entrer sans être renvoyé dehors.', '10'],
          ['Ronces : mur d’épines en bordure ; Athlétisme SD 16 ou Saignement au passage.', '10'],
        ],
      },
    ],
  },
  'tl-druid-gardien-du-savoir': {
    talentId: 'tl-druid-gardien-du-savoir',
    sidebar: {
      title: { fr: 'Faucille de druide & Cercles', en: 'Druid’s Sickle & Circles' },
      text: {
        fr: 'Faucille de druide (T/P, PR +0, 3d6, Fiab. 15, 1 main, Saisie & Saignement 30%, 540 c. ; Schéma Compagnon SD 17). Cercles majeurs : Gwyn Carn (Montagnes du Dragon), Clan des Corbeaux (Skellige), Bleobheris (Témérie), Caed Myrkvid (Toussaint), Gedyneith (Ard Skellig).',
        en: 'Druid’s Sickle (S/P, WA +0, 3d6, Rel 15, 1H, Grappling & Bleed 30%, 540 cr.; Journeyman Diagram DC 17). Major Circles: Gwyn Carn, Crow Clan, Bleobheris, Caed Myrkvid, Gedyneith.',
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
  'tl-vampire-repaire': {
    talentId: 'tl-vampire-repaire',
    tables: [
      {
        title: { fr: 'Tableau de Repaire de Vampire', en: 'Vampire Lair Allocation Table' },
        columns: [
          { fr: 'Catégorie / Option', en: 'Category / Option' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Localisation — Caverne et galerie', '1'],
          ['Localisation — Cave', '2'],
          ['Localisation — Ruine en campagne', '3'],
          ['Localisation — Égouts de ville', '3'],
          ['Localisation — Ruine dans une ville', '5'],
          ['Localisation — Maison de Faubourg', '7'],
          ['Localisation — Ruines Elfiques', '10'],
          ['Localisation — Maison de Ville', '10'],
          ['Localisation — Manoir', '13'],
          ['Localisation — Petit Domaine', '15'],
          ['Sécurité — Aéré', '1'],
          ['Sécurité — Portes ouvertes', '3'],
          ['Sécurité — Porte cadenassée', '5'],
          ['Sécurité — Portes et fenêtres blindées', '7'],
          ['Sécurité — Illusion', '10'],
          ['Sécurité — Illusion Interactive', '15'],
          ['Sécurité — Portail Magique', '20'],
          ['Espace — Exigu (quelques m²)', '1'],
          ['Espace — Loge (10–20 m²)', '3'],
          ['Espace — Petite maison (40–50 m²)', '5'],
          ['Espace — Demeure (+ de 70 m²)', '8'],
          ['Espace — Manoir (150 m²)', '10'],
          ['Espace — Domaine (Manoir + Jardin 300 m²)', '13'],
          ['Espace — Vaste (petit Château ou ruine Elfique)', '16'],
        ],
      },
    ],
  },
  'tl-vampire-seigneur-de-la-nuit': {
    talentId: 'tl-vampire-seigneur-de-la-nuit',
    sidebar: {
      title: { fr: 'Forme du Seigneur de la Nuit', en: 'Lord of the Night Rules' },
      text: {
        fr: 'Transformation : SD 24 (SD 30 en plein jour) et SD 28 pour garder le contrôle ; consomme la moitié de l’Endurance totale. Dure un nombre d’heures égal au rang, puis le Vampire redevient humain nu et inconscient autant d’heures. 1 round pour s’envoler ; attaque avec 1 main tout en bloquant avec les autres (Mains : 15 PS, Ailes : 30 PS chacune — si une aile est tranchée, vol impossible jusqu’à régénération complète ; les membres ne régénèrent que s’ils sont inutilisables). Seule la Nuée de Chauve-souris reste incantable sous cette forme.',
        en: 'Transform DC 24 (DC 30 in daylight) and Control DC 28; costs half total Stamina. Lasts ranks hours, followed by an equal number of unconscious naked hours. Taking flight takes 1 round; attacks with 1 arm while parrying with the others (Arms: 15 HP, Wings: 30 HP each—crippled wings ground him until fully restored; limbs only regenerate when unusable). Only Bat Swarm may be cast in this form.',
      },
    },
    tables: [
      {
        title: { fr: 'Progression — Seigneur de la Nuit', en: 'Lord of the Night Scaling (Ranks 1–10)' },
        columns: [
          { fr: 'Niv.', en: 'Rank' },
          { fr: 'PS bonus', en: 'Bonus HP' },
          { fr: 'Griffes', en: 'Claws' },
          { fr: 'Morsures', en: 'Bite' },
        ],
        rows: [
          ['1', '10', '4d6+3 (Saignement 25%)', '3d6+3 (Saignement 50%)'],
          ['2', '15', '5d6 (Saignement 25%)', '4d6 (Saignement 50%)'],
          ['3', '20', '5d6+3 (Saignement 30%)', '4d6+3 (Saignement 55%)'],
          ['4', '25', '6d6 (Saignement 35%)', '5d6 (Saignement 60%)'],
          ['5', '30', '6d6+3 (Saignement 40%)', '5d6+3 (Saignement 65%)'],
          ['6', '35', '7d6 (Saignement 45%)', '6d6 (Saignement 70%)'],
          ['7', '40', '7d6+3 (Saignement 50%)', '6d6+3 (Saignement 75%)'],
          ['8', '45', '8d6 (Saignement 55%)', '7d6 (Saignement 80%)'],
          ['9', '50', '8d6+1 (Saignement 60%)', '7d6+1 (Saignement 90%)'],
          ['10', '55', '8d6+3 (Saignement 65%)', '7d6+3 (Saignement 100%)'],
        ],
      },
    ],
  },
  'tl-vampire-goule': {
    talentId: 'tl-vampire-goule',
    sidebar: {
      title: { fr: 'Coût en PS & Durée du lien de sang', en: 'HP Cost & Blood Bond Duration' },
      text: {
        fr: 'Les PS dépensés pour créer une Goule ne se régénèrent pas pendant 2 jours, sauf si le Vampire se nourrit. Le lien d’attachement dure un nombre de jours égal au rang de Goule et doit être renouvelé pour maintenir le palier : sinon, il baisse d’un palier tous les 2 jours sans jamais descendre sous Connaissance.',
        en: 'HP spent creating a Ghoul cannot regenerate for 2 days unless the Vampire feeds. The attachment bond lasts Goule rank in days; if unrenewed, it drops one tier every 2 days (minimum Acquaintance).',
      },
    },
    tables: [
      {
        title: { fr: 'Tableau des Goules (Créatures & Attachement)', en: 'Ghoul Creation & Bond Table' },
        columns: [
          { fr: 'Créature / Attachement', en: 'Creature / Bond Tier' },
          { fr: 'Coût', en: 'Cost' },
          { fr: 'Dépense PS', en: 'HP Spent' },
          { fr: 'SD', en: 'DC' },
        ],
        rows: [
          ['Créature — Chat', '1', '5', '12'],
          ['Créature — Chien', '2', '8', '10'],
          ['Créature — Loup', '4', '10', '12'],
          ['Créature — Oiseaux', '4', '15', '14'],
          ['Créature — Insectes', '4', '15', '10'],
          ['Créature — Humain', '10', '20', '18'],
          ['Créature — Cheval', '12', '22', '14'],
          ['Créature — Alpyre', '16', '25', '20'],
          ['Créature — Ekimme', '18', '30', '24'],
          ['Créature — Katakan', '20', '35', '28'],
          ['Attachement — Connaissance', '1', '1 à 5', 'Gratuit'],
          ['Attachement — Amis', '3', '7', '3'],
          ['Attachement — Amis proches', '8', '10', '6'],
          ['Attachement — Inséparables', '10', '15', '8'],
          ['Attachement — À la vie, à la mort', '15', '20', '10'],
          ['Attachement — Soumission Totale', '20', '30', '15'],
        ],
      },
    ],
  },
  'tl-vampire-appel-de-la-nuit': {
    talentId: 'tl-vampire-appel-de-la-nuit',
    tables: [
      {
        title: { fr: 'Tableau Appel de la Nuit', en: 'Call of the Night Table' },
        columns: [
          { fr: 'Catégorie / Option', en: 'Category / Option' },
          { fr: 'Coût', en: 'Cost' },
        ],
        rows: [
          ['Créatures — Chiens', '2'],
          ['Créatures — Loup', '4'],
          ['Créatures — Warg', '6'],
          ['Créatures — Chauves-souris (par nuées)', '8'],
          ['Créatures — Goules (déjà soumises au Sang)', '12'],
          ['Créatures — Noctule', '14'],
          ['Créatures — Alpyre', '16'],
          ['Créatures — Ekimme', '18'],
          ['Créatures — Katakan', '20'],
          ['Créatures — Vampire de rang inférieur', '22'],
          ['Durée — Quelques minutes', '1'],
          ['Durée — Une demi-heure', '5'],
          ['Durée — Une heure', '8'],
          ['Durée — 1d6 heures', '12'],
          ['Durée — 1d10 heures', '15'],
          ['Durée — Nuit entière', '20'],
          ['Discipline — Sanguinaires', '1'],
          ['Discipline — Rugissants', '3'],
          ['Discipline — Ordonnés', '5'],
          ['Discipline — Au doigt et à l’œil', '8'],
        ],
      },
    ],
  },
};
