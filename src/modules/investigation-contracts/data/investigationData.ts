import type {
  ClueTypeDef,
  ComplexityTierDef,
  ConcealmentTierDef,
  MysteryCase,
  ObstacleTypeDef,
} from '../types';

export const COMPLEXITY_TIERS: readonly ComplexityTierDef[] = [
  {
    id: 'easy',
    hp: 25,
    label: { fr: 'Facile', en: 'Easy' },
    description: {
      fr: 'Fragment d’une aventure.',
      en: 'A small piece of a single adventure.',
    },
    cluesByConcealment: { 0: 3, 2: 4, 4: 5, 6: 7 },
  },
  {
    id: 'moderate',
    hp: 50,
    label: { fr: 'Moyen', en: 'Average' },
    description: {
      fr: 'Socle ou composante majeure d’une aventure.',
      en: 'Forms the core or major component of an adventure.',
    },
    cluesByConcealment: { 0: 5, 2: 6, 4: 8, 6: 12 },
  },
  {
    id: 'challenging',
    hp: 100,
    label: { fr: 'Assez difficile', en: 'Challenging' },
    description: {
      fr: 'Mystère au long cours sur plusieurs aventures.',
      en: 'Long-term mystery spanning several adventures.',
    },
    cluesByConcealment: { 0: 10, 2: 13, 4: 17, 6: 25 },
  },
  {
    id: 'hard',
    hp: 150,
    label: { fr: 'Difficile', en: 'Difficult' },
    description: {
      fr: 'Intrigue importante pour la campagne ou un PJ.',
      en: 'Major plotline for the campaign or a character.',
    },
    cluesByConcealment: { 0: 15, 2: 19, 4: 25, 6: 38 },
  },
  {
    id: 'nearlyImpossible',
    hp: 200,
    label: { fr: 'Presque impossible', en: 'Nearly Impossible' },
    description: {
      fr: 'Intrigue capitale pour la campagne.',
      en: 'Central, campaign-defining mystery.',
    },
    cluesByConcealment: { 0: 20, 2: 25, 4: 33, 6: 50 },
  },
];

export const CONCEALMENT_TIERS: readonly ConcealmentTierDef[] = [
  {
    value: 0,
    label: { fr: 'Solution évidente (0)', en: 'Obvious Solution (0)' },
    example: {
      fr: 'Traces fraîches et intactes dans la boue.',
      en: 'Fresh, undisturbed monster tracks in mud.',
    },
  },
  {
    value: 2,
    label: { fr: 'Recherches minimes (2)', en: 'Minimal Research (2)' },
    example: {
      fr: 'Empreintes légèrement déformées par la pluie.',
      en: 'Tracks slightly washed out by rain.',
    },
  },
  {
    value: 4,
    label: { fr: 'Quelques recherches (4)', en: 'Some Research (4)' },
    example: {
      fr: 'Traces effacées, travail sur croquis fidèle.',
      en: 'Tracks gone; working from an accurate sketch.',
    },
  },
  {
    value: 6,
    label: { fr: 'Solution obscure (6)', en: 'Obscure Solution (6)' },
    example: {
      fr: 'Traces effacées, simple description orale.',
      en: 'Tracks gone; working solely from spoken hearsay.',
    },
  },
];

export const CLUE_TYPES: readonly ClueTypeDef[] = [
  {
    id: 'evidence_analysis',
    label: { fr: 'Analyse de preuves', en: 'Evidence Analysis' },
    skills: { fr: 'Artisanat ou Alchimie', en: 'Crafting or Alchemy' },
    damageDie: '1d6',
    damageStat: 'TECH',
    allowExtraTime: false,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Identifier un poison à partir d’un échantillon.',
      en: 'Identifying a poison from a sample.',
    },
    penalty: {
      fr: '1d6 Concentration. Échec critique : preuve endommagée (malus -5 aux jets suivants sur cet indice).',
      en: '1d6 Concentration. Critical fail: evidence damaged (-5 penalty to future checks on this clue).',
    },
  },
  {
    id: 'transaction_analysis',
    label: { fr: 'Analyse des transactions*', en: 'Transaction Analysis*' },
    skills: { fr: 'Négoce', en: 'Business' },
    damageDie: '1d6',
    damageStat: 'INT',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Lire un livre de comptes pour vérifier si la victime était un escroc.',
      en: 'Auditing a ledger to see if the victim was a con artist.',
    },
    penalty: {
      fr: '1d6 dégâts de Concentration.',
      en: '1d6 Concentration damage.',
    },
  },
  {
    id: 'deciphering',
    label: { fr: 'Décryptage*', en: 'Deciphering*' },
    skills: { fr: 'Éducation ou Contrefaçon', en: 'Education or Forgery' },
    damageDie: '1d6',
    damageStat: 'INT',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Déchiffrer un message codé ou en langue étrangère.',
      en: 'Decoding a ciphered letter or foreign text.',
    },
    penalty: {
      fr: '1d6 dégâts de Concentration.',
      en: '1d6 Concentration damage.',
    },
  },
  {
    id: 'scene_examination',
    label: { fr: 'Examen d’une scène*', en: 'Scene Examination*' },
    skills: { fr: 'Perception (Vigilance)', en: 'Awareness' },
    damageDie: '1d6',
    damageStat: 'INT',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Chercher des indices sur une scène de crime.',
      en: 'Searching a crime scene for leads.',
    },
    penalty: {
      fr: '1d6 Concentration. Échec critique : scène contaminée (-3 sur tous les indices issus de ce lieu).',
      en: '1d6 Concentration. Critical fail: scene contaminated (-3 to all clues sourced here).',
    },
  },
  {
    id: 'body_examination',
    label: { fr: 'Examen de cadavre*', en: 'Corpse Examination*' },
    skills: { fr: 'Premiers soins', en: 'First Aid' },
    damageDie: '1d10',
    damageStat: 'TECH',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Déterminer l’arme ou les griffes en analysant les plaies.',
      en: 'Determining the murder weapon or claws from wounds.',
    },
    penalty: {
      fr: '1d6 Concentration. Échec critique : corps endommagé (-5 aux jets suivants sur cet indice).',
      en: '1d6 Concentration. Critical fail: corpse damaged (-5 to future checks on this clue).',
    },
  },
  {
    id: 'tailing',
    label: { fr: 'Filature', en: 'Tailing' },
    skills: { fr: 'Furtivité', en: 'Stealth' },
    damageDie: '1d6',
    damageStat: 'INT',
    allowExtraTime: false,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Suivre un suspect ou surveiller un quartier.',
      en: 'Shadowing a suspect or staking out a location.',
    },
    penalty: {
      fr: '1d6 Concentration. Confrontation possible avec la cible.',
      en: '1d6 Concentration. Possible confrontation with the target.',
    },
  },
  {
    id: 'interrogation',
    label: { fr: 'Interrogatoire', en: 'Interrogation' },
    skills: {
      fr: 'Psychologie / Combat verbal / Social',
      en: 'Human Perception / Verbal Combat / Social',
    },
    damageDie: '1d10',
    damageStat: 'EMP',
    allowExtraTime: false,
    failConcentrationDie: '1d10',
    example: {
      fr: 'Interroger un témoin ou un suspect.',
      en: 'Questioning a witness or suspect.',
    },
    penalty: {
      fr: '1d10 Concentration. Échec critique : -5 à toutes les interactions sociales avec ce PNJ pendant 1 semaine.',
      en: '1d10 Concentration. Critical fail: -5 to all social checks with this NPC for 1 week.',
    },
  },
  {
    id: 'mystic_investigation',
    label: { fr: 'Investigation mystique', en: 'Mystical Investigation' },
    skills: { fr: 'Incantation / Exercice de la magie', en: 'Spell Casting' },
    damageDie: '1d10',
    damageStat: 'INT',
    allowExtraTime: false,
    failConcentrationDie: '1d10',
    example: {
      fr: 'Percevoir auras, émanations et résidus de sort.',
      en: 'Sensing magical auras and lingering spell residue.',
    },
    penalty: {
      fr: '1d10 Concentration + jet sur le tableau des Échecs critiques magiques.',
      en: '1d10 Concentration + roll on the Magic Fumble table.',
    },
  },
  {
    id: 'tracking',
    label: { fr: 'Pistage', en: 'Tracking' },
    skills: {
      fr: 'Survie ou Connaissance des monstres',
      en: 'Wilderness Survival or Monster Lore',
    },
    damageDie: '1d6',
    damageStat: 'INT',
    allowExtraTime: false,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Identifier et remonter des traces sur le terrain.',
      en: 'Identifying and following monster tracks.',
    },
    penalty: {
      fr: '1d6 Concentration. Échec critique : temps perdu, un jet de Preuve en moins pour le groupe.',
      en: '1d6 Concentration. Critical fail: wasted time, party loses one Clue check.',
    },
  },
  {
    id: 'research',
    label: { fr: 'Recherches*', en: 'Research*' },
    skills: {
      fr: 'Éducation ou Connaissance des monstres',
      en: 'Education or Monster Lore',
    },
    damageDie: '1d10',
    damageStat: 'INT',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Parcourir de vieux bestiaires ou archives.',
      en: 'Studying old bestiaries or archives.',
    },
    penalty: {
      fr: '1d6 dégâts de Concentration.',
      en: '1d6 Concentration damage.',
    },
  },
  {
    id: 'rumors',
    label: { fr: 'Rumeurs*', en: 'Rumors*' },
    skills: {
      fr: 'Étiquette ou Connaissance de la rue',
      en: 'Social Etiquette or Streetwise',
    },
    damageDie: '1d6',
    damageStat: 'EMP',
    allowExtraTime: true,
    failConcentrationDie: '1d6',
    example: {
      fr: 'Enquêter dans les tavernes, bas-fonds ou salons.',
      en: 'Asking around taverns, alleys, or noble courts.',
    },
    penalty: {
      fr: '1d6 Concentration. Échec critique : interlocuteur froissé ou mis en rogne.',
      en: '1d6 Concentration. Critical fail: insulted or angered the informant.',
    },
  },
];

export const OBSTACLE_TYPES: readonly ObstacleTypeDef[] = [
  {
    id: 'authority',
    label: { fr: 'Autorité', en: 'Authority' },
    example: {
      fr: 'Un magistrat ou capitaine tient à interrompre l’enquête.',
      en: 'A local magistrate insists on shutting down the investigation.',
    },
  },
  {
    id: 'conspiracy',
    label: { fr: 'Conspiration', en: 'Conspiracy' },
    example: {
      fr: 'Quelqu’un cherche activement à dissimuler les preuves.',
      en: 'Someone is actively covering up or destroying evidence.',
    },
  },
  {
    id: 'unfavorable_context',
    label: { fr: 'Contexte défavorable', en: 'Unfavorable Context' },
    example: {
      fr: 'Scène en zone de guerre, caverne étroite ou marais toxique.',
      en: 'Crime occurred in an active warzone or hazardous terrain.',
    },
  },
  {
    id: 'distraction',
    label: { fr: 'Distraction', en: 'Distraction' },
    example: {
      fr: 'Un événement soudain empêche de se concentrer.',
      en: 'A commotion disrupts the group’s focus.',
    },
  },
  {
    id: 'exhaustion',
    label: { fr: 'Épuisement', en: 'Exhaustion' },
    example: {
      fr: 'Le corps et l’esprit accusent le manque de sommeil.',
      en: 'Fatigue sets in and dulls the senses.',
    },
  },
  {
    id: 'red_herring',
    label: { fr: 'Fausse piste', en: 'Red Herring' },
    example: {
      fr: 'Faux indice : réussir le jet révèle l’imposture sans dégâts de Complexité ; rater coûte de la Concentration.',
      en: 'Fake clue: succeeding reveals it is false (no Complexity dmg); failing costs Concentration.',
    },
  },
  {
    id: 'missing_clue',
    label: { fr: 'Indice manquant', en: 'Missing Clue' },
    example: {
      fr: 'Témoin absent jusqu’au lendemain ou recherches au mauvais endroit.',
      en: 'Key witness unavailable or searching the wrong location.',
    },
  },
  {
    id: 'weather',
    label: { fr: 'Météo', en: 'Weather' },
    example: {
      fr: 'L’orage ou le blizzard efface les pistes.',
      en: 'A sudden storm washes away tracks.',
    },
  },
  {
    id: 'passage_of_time',
    label: { fr: 'Passage du temps', en: 'Passage of Time' },
    example: {
      fr: 'Plusieurs jours écoulés : traces dégradées et souvenirs flous.',
      en: 'Days have passed; memories fade and trails cool.',
    },
  },
  {
    id: 'gossip',
    label: { fr: 'Ragots', en: 'Gossip' },
    example: {
      fr: 'Les rumeurs sur les PJ rendent les habitants méfiants.',
      en: 'Locals distrust the investigators due to wild rumors.',
    },
  },
  {
    id: 'unusual_situation',
    label: { fr: 'Situation inhabituelle', en: 'Unusual Situation' },
    example: {
      fr: 'Élément inédit auquel le groupe n’a jamais été confronté.',
      en: 'An unfamiliar custom or phenomenon complicates the inquiry.',
    },
  },
];

export const DAILY_OBSTACLE_GUIDE = [
  {
    difficulty: { fr: 'Facile ou moyen', en: 'Easy or Average' },
    guidance: { fr: '1 Obstacle SD 14', en: '1 Obstacle DC 14' },
  },
  {
    difficulty: { fr: 'Assez difficile ou difficile', en: 'Challenging or Difficult' },
    guidance: {
      fr: '2 Obstacles SD 14 ou 1 Obstacle SD 18',
      en: '2 Obstacles DC 14 or 1 Obstacle DC 18',
    },
  },
  {
    difficulty: { fr: 'Presque impossible', en: 'Nearly Impossible' },
    guidance: {
      fr: '3 Obstacles SD 14, 2 Obstacles SD 18 ou 1 Obstacle SD 20',
      en: '3 Obstacles DC 14, 2 Obstacles DC 18, or 1 Obstacle DC 20',
    },
  },
];

export function createOfficialExampleMysteries(locale: 'fr' | 'en'): MysteryCase[] {
  const now = new Date().toISOString();

  if (locale === 'fr') {
    return [
      {
        id: 'official-scolopendromorph',
        title: 'Chasse au scolopendromorphe (Exemple officiel)',
        objective:
          'Identifier la créature qui a anéanti la caravane marchande aux abords de la ville il y a trois jours.',
        solutionSecret:
          'Un scolopendromorphe géant creusant des galeries et crachant de l’acide a attaqué la caravane.',
        tier: 'easy',
        maxComplexity: 25,
        remainingComplexity: 25,
        currentDay: 1,
        countdownTotalDays: null,
        clues: [
          {
            id: 'scolo-c1',
            title: 'Chariot brisé & sol meuble',
            clueType: 'scene_examination',
            dc: 14,
            concealment: 0,
            description:
              'Structure métallique tordue, longs sillons depuis la terre meuble, aucun corps visible.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'scolo-c2',
            title: 'Métal rongé par l’acide',
            clueType: 'evidence_analysis',
            dc: 18,
            concealment: 2,
            description:
              'Les trous dans l’armature métallique proviennent d’un acide puissant et non d’une flamme.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'scolo-c3',
            title: 'Mottes et terre fraîchement retournée',
            clueType: 'tracking',
            dc: 14,
            concealment: 0,
            description:
              'Sol meuble évoquant des galeries souterraines à la manière de taupes géantes.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'scolo-c4',
            title: 'Sillons & centaines d’empreintes parallèles',
            clueType: 'tracking',
            dc: 18,
            concealment: 2,
            description:
              'Centaines de cavités identiques et alignées des deux côtés d’un large sillon.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'scolo-c5',
            title: 'Identification bestiaire (galeries + acide)',
            clueType: 'research',
            dc: 14,
            concealment: 2,
            description:
              'Recoupement des signes : bête fouisseuse sécrétant de l’acide (scolopendromorphe).',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
        ],
        obstacles: [
          {
            id: 'scolo-o1',
            obstacleType: 'weather',
            title: 'Averse soudaine',
            dc: 14,
            description: 'Il commence à pleuvoir, compliquant le relevé des traces.',
            resolved: false,
          },
          {
            id: 'scolo-o2',
            obstacleType: 'red_herring',
            title: 'Fragments de journal d’un mage acide',
            dc: 14,
            description:
              'Fausse piste : journal d’un sorcier local amateur de sorts acides retrouvé dans les décombres.',
            resolved: false,
          },
        ],
        logs: [],
        updatedAt: now,
      },
      {
        id: 'official-knocker-secret',
        title: 'Le secret des frappeurs (Exemple officiel)',
        objective:
          'Gagner la confiance de la communauté de frappeurs pour savoir ce qui hante les profondeurs de l’ancienne mine.',
        solutionSecret:
          'Les frappeurs craignent la créature des profondeurs et accepteront de témoigner une fois leurs inquiétudes et leur culture respectées.',
        tier: 'challenging',
        maxComplexity: 100,
        remainingComplexity: 100,
        currentDay: 1,
        countdownTotalDays: null,
        clues: [
          {
            id: 'knock-c1',
            title: 'Entretiens avec la communauté',
            clueType: 'interrogation',
            dc: 15,
            concealment: 2,
            description:
              'Discuter avec les frappeurs (max 10 fois) ou accomplir de petites quêtes annexes.',
            attemptsUsed: 0,
            maxAttempts: 10,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c2',
            title: 'Histoires locales des frappeurs',
            clueType: 'rumors',
            dc: 18,
            concealment: 4,
            description:
              'Récits de la région partagés avec un peu de tact (max 2 discussions).',
            attemptsUsed: 0,
            maxAttempts: 2,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c3',
            title: 'Archives de la ville voisine',
            clueType: 'research',
            dc: 18,
            concealment: 2,
            description:
              'Bibliothèque de la cité la plus proche sur l’histoire minière du secteur.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c4',
            title: 'Mœurs des frappeurs',
            clueType: 'research',
            dc: 15,
            concealment: 2,
            description:
              'Connaître la nature des frappeurs confère un net avantage.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c5',
            title: 'Observer le quotidien des frappeurs',
            clueType: 'tailing',
            dc: 16,
            concealment: 4,
            description:
              'Furtivité en opposition pour les suivre sans hostilité dans leurs tâches.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c6',
            title: 'Traces autour des galeries',
            clueType: 'tracking',
            dc: 14,
            concealment: 4,
            description:
              'Relever les menaces quotidiennes rôdant autour de leur village souterrain.',
            attemptsUsed: 0,
            solved: false,
            contaminatedPenalty: 0,
          },
          {
            id: 'knock-c7',
            title: 'Outils et artisanat des frappeurs',
            clueType: 'evidence_analysis',
            dc: 18,
            concealment: 4,
            description:
              'Étudier leur façon de forger et d’employer leurs outils (max 2 analyses).',
            attemptsUsed: 0,
            maxAttempts: 2,
            solved: false,
            contaminatedPenalty: 0,
          },
        ],
        obstacles: [
          {
            id: 'knock-o1',
            obstacleType: 'gossip',
            title: 'Rumeurs farfelues sur les étrangers',
            dc: 14,
            description: 'Méfiance des frappeurs envers le groupe.',
            resolved: false,
          },
          {
            id: 'knock-o2',
            obstacleType: 'conspiracy',
            title: 'Rival de la cheffe',
            dc: 18,
            description: 'Sabote discrètement les efforts des PJ pour fragiliser sa rivale.',
            resolved: false,
          },
          {
            id: 'knock-o3',
            obstacleType: 'authority',
            title: 'Négociant impatient',
            dc: 18,
            description: 'Veut envoyer des mercenaires rouvrir la mine de force.',
            resolved: false,
          },
        ],
        logs: [],
        updatedAt: now,
      },
    ];
  }

  return [
    {
      id: 'official-scolopendromorph',
      title: 'Scolopendromorph Hunt (Official Example)',
      objective:
        'Identify the monster that destroyed a merchant caravan outside town three days ago.',
      solutionSecret:
        'A giant burrowing, acid-spitting Scolopendromorph ambushed the caravan.',
      tier: 'easy',
      maxComplexity: 25,
      remainingComplexity: 25,
      currentDay: 1,
      countdownTotalDays: null,
      clues: [
        {
          id: 'scolo-c1',
          title: 'Shattered wagon & soft earth',
          clueType: 'scene_examination',
          dc: 14,
          concealment: 0,
          description:
            'Twisted metal frame, long furrows leading from loose dirt, no bodies left behind.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'scolo-c2',
          title: 'Acid-melted metal frame',
          clueType: 'evidence_analysis',
          dc: 18,
          concealment: 2,
          description:
            'Pitted holes in the iron struts were eaten by strong acid, not extreme heat.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'scolo-c3',
          title: 'Mole-like burrowed dirt',
          clueType: 'tracking',
          dc: 14,
          concealment: 0,
          description:
            'Freshly churned soil resembling gigantic molehills.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'scolo-c4',
          title: 'Parallel rows of small footprints',
          clueType: 'tracking',
          dc: 18,
          concealment: 2,
          description:
            'Hundreds of matching impressions flanking a long central drag groove.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'scolo-c5',
          title: 'Bestiary cross-reference',
          clueType: 'research',
          dc: 14,
          concealment: 2,
          description:
            'Points directly to a large burrowing, acid-secreting creature (Scolopendromorph).',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
      ],
      obstacles: [
        {
          id: 'scolo-o1',
          obstacleType: 'weather',
          title: 'Sudden rain',
          dc: 14,
          description: 'Rain begins falling, washing away surface evidence.',
          resolved: false,
        },
        {
          id: 'scolo-o2',
          obstacleType: 'red_herring',
          title: 'Mage’s acid journal scraps',
          dc: 14,
          description:
            'Red herring: burnt diary pages belonging to a hot-tempered local pyromancer/acid mage.',
          resolved: false,
        },
      ],
      logs: [],
      updatedAt: now,
    },
    {
      id: 'official-knocker-secret',
      title: 'The Secret of the Knockers (Official Example)',
      objective:
        'Earn the trust of an ogroid knocker clan to learn what lurks deep inside an abandoned mine.',
      solutionSecret:
        'The knockers know the truth about the mine beast and will reveal it once the party respects their community and learns local history.',
      tier: 'challenging',
      maxComplexity: 100,
      remainingComplexity: 100,
      currentDay: 1,
      countdownTotalDays: null,
      clues: [
        {
          id: 'knock-c1',
          title: 'Clan interviews',
          clueType: 'interrogation',
          dc: 15,
          concealment: 2,
          description:
            'Speak with individual knockers (up to 10 checks) or earn trust through side favors.',
          attemptsUsed: 0,
          maxAttempts: 10,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c2',
          title: 'Regional folklore',
          clueType: 'rumors',
          dc: 18,
          concealment: 4,
          description:
            'Persuade reluctant knockers to share local oral history (max 2 checks).',
          attemptsUsed: 0,
          maxAttempts: 2,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c3',
          title: 'Nearby town archives',
          clueType: 'research',
          dc: 18,
          concealment: 2,
          description:
            'Consult library records in the nearest town about the old mine.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c4',
          title: 'Knocker lore & customs',
          clueType: 'research',
          dc: 15,
          concealment: 2,
          description:
            'Recall or study knocker physiology and behavior.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c5',
          title: 'Observe daily routines',
          clueType: 'tailing',
          dc: 16,
          concealment: 4,
          description:
            'Opposed Stealth checks to quietly watch knockers go about their tasks.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c6',
          title: 'Mine perimeter tracks',
          clueType: 'tracking',
          dc: 14,
          concealment: 4,
          description:
            'Track the daily threats passing near the knockers’ cavern settlement.',
          attemptsUsed: 0,
          solved: false,
          contaminatedPenalty: 0,
        },
        {
          id: 'knock-c7',
          title: 'Knocker tools & craft',
          clueType: 'evidence_analysis',
          dc: 18,
          concealment: 4,
          description:
            'Inspect how knockers forge and handle tools (max 2 checks).',
          attemptsUsed: 0,
          maxAttempts: 2,
          solved: false,
          contaminatedPenalty: 0,
        },
      ],
      obstacles: [
        {
          id: 'knock-o1',
          obstacleType: 'gossip',
          title: 'Wild rumors about outsiders',
          dc: 14,
          description: 'The clan grows suspicious of the party.',
          resolved: false,
        },
        {
          id: 'knock-o2',
          obstacleType: 'conspiracy',
          title: 'Rival to the chieftess',
          dc: 18,
          description: 'A rival knocker tries to sabotage your efforts.',
          resolved: false,
        },
        {
          id: 'knock-o3',
          obstacleType: 'authority',
          title: 'Impatient mine merchant',
          dc: 18,
          description: 'Threatens to send armed mercenaries into the mine.',
          resolved: false,
        },
      ],
      logs: [],
      updatedAt: now,
    },
  ];
}
