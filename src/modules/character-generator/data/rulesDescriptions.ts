import type { LocalizedText } from '@/src/data/bestiary/types';
import type { PrimaryStatKey, SkillId } from '../types';

export type DerivedStatKey =
  | 'hp'
  | 'stamina'
  | 'recovery'
  | 'stun'
  | 'run'
  | 'leap'
  | 'encumbrance'
  | 'vigor';

export interface PrimaryStatDescription {
  name: LocalizedText;
  summary: LocalizedText;
  mechanics?: LocalizedText;
}

export interface DerivedStatDescription {
  name: LocalizedText;
  formula: LocalizedText;
  summary: LocalizedText;
}

export interface SkillRuleDescription {
  summary: LocalizedText;
  note?: LocalizedText;
  benchmarks: {
    b10: LocalizedText;
    b13: LocalizedText;
    b16: LocalizedText;
    b20: LocalizedText;
  };
}

/**
 * Core rulebook descriptions for the 9 Primary Characteristics (source: guide/compétences.md).
 */
export const PRIMARY_STAT_DESCRIPTIONS: Record<
  PrimaryStatKey,
  PrimaryStatDescription
> = {
  INT: {
    name: { en: 'Intelligence (INT)', fr: 'Intelligence (INT)' },
    summary: {
      en: 'Mental acuity used to solve riddles, conduct scientific experiments, build logical reasoning, and recall lore.',
      fr: 'Permet de résoudre des énigmes, réaliser des expériences scientifiques, construire des raisonnements logiques et mobiliser ses connaissances.',
    },
    mechanics: {
      en: 'Contributes directly to your free pickup skill points (INT + REF). Max 10 at creation (13 via mutations/perks).',
      fr: 'Détermine avec RÉF votre réserve de points de compétences générales (INT + RÉF). Plafond standard : 10 (13 via mutations/atouts).',
    },
  },
  REF: {
    name: { en: 'Reflexes (REF)', fr: 'Réflexes (RÉF)' },
    summary: {
      en: 'Governs melee combat, dodging, parrying, and actions requiring fast reactions and precise physical gestures.',
      fr: 'Sert à combattre au corps-à-corps, esquiver, parer et effectuer des actions nécessitant des réactions rapides et des gestes précis.',
    },
    mechanics: {
      en: 'Determines Initiative (1d10 + REF) and pickup skill budget (INT + REF).',
      fr: 'Détermine l’Initiative (1d10 + RÉF) et la réserve de compétences générales (INT + RÉF).',
    },
  },
  DEX: {
    name: { en: 'Dexterity (DEX)', fr: 'Dextérité (DEX)' },
    summary: {
      en: 'Governs ranged attacks (bows, crossbows, thrown weapons) and anything requiring balance, agility, and hand-eye coordination.',
      fr: 'Utilisée pour les attaques à distance et tout ce qui fait appel à l’équilibre, à l’agilité et à la coordination œil-main.',
    },
  },
  COR: {
    name: { en: 'Body (BODY)', fr: 'Corps (COR)' },
    summary: {
      en: 'Used whenever brute strength is required, such as brawling or physical feats, as well as stamina to resist disease and fatigue.',
      fr: 'S’utilise lorsqu’il faut faire appel à la force brute (bagarres, prouesses physiques) et représente la résistance aux maladies et à la fatigue.',
    },
    mechanics: {
      en: 'Affects HP, STA, REC, STUN (via (BODY+WILL)/2), Encumbrance (BODY × 10 kg), and Melee/Unarmed damage bonus.',
      fr: 'Influence PS, END, RÉC, ÉTOU (via (COR+VOL)/2), l’Encombrement (COR × 10 kg) et le bonus de dégâts en mêlée.',
    },
  },
  VIT: {
    name: { en: 'Speed (SPD)', fr: 'Vitesse (VIT)' },
    summary: {
      en: 'Represents your movement speed in meters per round. Used to outrun pursuers or calculate distance covered in a given time.',
      fr: 'Représente la vitesse de déplacement en mètres par round. Sert à semer des poursuivants ou calculer la distance parcourue.',
    },
    mechanics: {
      en: 'Determines Run (SPD × 3 m) and Leap (Run / 5 m).',
      fr: 'Détermine la Course (VIT × 3 m) et le Saut (Course / 5 m).',
    },
  },
  EMP: {
    name: { en: 'Empathy (EMP)', fr: 'Empathie (EMP)' },
    summary: {
      en: 'Governs matters of the heart, social awareness, and reading emotions. Seduction, persuasion, leadership, and artistry rely on it.',
      fr: 'Pour gérer les affaires de cœur, la lecture des émotions et les interactions sociales : séduction, persuasion, charisme et arts.',
    },
  },
  TEC: {
    name: { en: 'Craft (CRA)', fr: 'Technique (TECH)' },
    summary: {
      en: 'Used to operate mechanisms, craft items with precision, handle siege engines, disarm or set traps, and administer first aid.',
      fr: 'Pour utiliser des mécanismes ou créer des objets avec précision, préparer des remèdes, poser des pièges et prodiguer les premiers soins.',
    },
  },
  VOL: {
    name: { en: 'Will (WILL)', fr: 'Volonté (VOL)' },
    summary: {
      en: 'Used to intimidate others, perform magical tests, and resist mental coercion or fear. Reflects mental fortitude and magical mastery.',
      fr: 'Sert à intimider, réaliser des tests magiques et résister à la contrainte mentale ou à la peur. Reflète la force d’âme et la maîtrise magique.',
    },
    mechanics: {
      en: 'Combined with BODY ((BODY + WILL) / 2) to compute HP, STA, REC, and STUN.',
      fr: 'Combinée au Corps ((COR + VOL) / 2) pour calculer PS, END, RÉC et ÉTOU.',
    },
  },
  CHA: {
    name: { en: 'Luck (LUCK)', fr: 'Chance (CHA)' },
    summary: {
      en: 'A pool of points spent before rolling a skill check or death save (on your turn or in defense) to gain +1 per point spent.',
      fr: 'Réserve de points utilisable avant un jet de compétence ou de sauvegarde contre la mort (à votre tour ou en défense) pour gagner +1 par point dépensé.',
    },
    mechanics: {
      en: 'Refreshes at the start of each session. On a Death Save (Defying Death), raises the survival threshold by the Luck spent.',
      fr: 'Se reconstitue au début de chaque session. Sur un jet contre la mort (Tromper la mort), augmente le seuil de survie du montant dépensé.',
    },
  },
};

/**
 * Core rulebook descriptions for the 8 Derived Statistics (source: guide/compétences.md).
 */
export const DERIVED_STAT_DESCRIPTIONS: Record<
  DerivedStatKey,
  DerivedStatDescription
> = {
  hp: {
    name: { en: 'Health Points (HP)', fr: 'Points de santé (PS)' },
    formula: { en: '((BODY + WILL) / 2) × 5', fr: '⌊(COR + VOL) / 2⌋ × 5' },
    summary: {
      en: 'Amount of damage you can suffer before entering the Dying state and succumbing to bleeding.',
      fr: 'Nombre de points de dégâts que vous pouvez subir avant de passer en état de mort imminente et de succomber à une hémorragie.',
    },
  },
  stamina: {
    name: { en: 'Stamina (STA)', fr: 'Endurance (END)' },
    formula: { en: '((BODY + WILL) / 2) × 5', fr: '⌊(COR + VOL) / 2⌋ × 5' },
    summary: {
      en: 'Energy spent on extra actions, casting magic, special abilities, or non-lethal damage. Reaching 0 renders you Stunned/Exhausted until you take a Recovery action.',
      fr: 'Énergie dépensée lors d’efforts physiques, d’actions supplémentaires, de sorts ou de dégâts non létaux. À 0, vous êtes étourdi/épuisé jusqu’à récupérer.',
    },
  },
  recovery: {
    name: { en: 'Recovery (REC)', fr: 'Récupération (RÉC)' },
    formula: { en: '⌊(BODY + WILL) / 2⌋', fr: '⌊(COR + VOL) / 2⌋' },
    summary: {
      en: 'HP regained per day of bed rest (after a successful First Aid or Healing Hands check), and STA regained when using a full-round Recovery action.',
      fr: 'PS regagnés par jour de repos au calme (après réussite de Premiers soins/Mains thérapeutiques), et END récupérée via l’action Récupérer.',
    },
  },
  stun: {
    name: { en: 'Stun (STUN)', fr: 'Étourdissement (ÉTOU)' },
    formula: { en: 'min(10, ⌊(BODY + WILL) / 2⌋)', fr: 'min(10, ⌊(COR + VOL) / 2⌋)' },
    summary: {
      en: 'Resistance against heavy blows and knockout effects. On a Stun Save, you must roll equal to or under STUN (strictly under in core rules) or be Stunned.',
      fr: 'Résistance aux coups avant d’être étourdi ou inconscient. Lors d’un jet de sauvegarde d’étourdissement, obtenez un résultat inférieur à ÉTOU.',
    },
  },
  run: {
    name: { en: 'Run (RUN)', fr: 'Course (CSE)' },
    formula: { en: 'SPD × 3 m', fr: 'VIT × 3 m' },
    summary: {
      en: 'Maximum distance in meters you can cover in one round when spending your entire turn running at a sustainable pace.',
      fr: 'Distance en mètres parcourue en un round lorsque vous consacrez tout votre tour à courir à une allure raisonnable.',
    },
  },
  leap: {
    name: { en: 'Leap (LEAP)', fr: 'Saut (SAUT)' },
    formula: { en: '⌊RUN / 5⌋ m', fr: '⌊Course / 5⌋ m' },
    summary: {
      en: 'Distance in meters you can clear in a single jump after taking a running start.',
      fr: 'Distance en mètres que vous pouvez franchir en sautant après avoir pris de l’élan.',
    },
  },
  encumbrance: {
    name: { en: 'Encumbrance (ENC)', fr: 'Encombrement (ENC)' },
    formula: { en: 'BODY × 10 kg', fr: 'COR × 10 kg' },
    summary: {
      en: 'Maximum weight carried without penalty. Every 5 kg over ENC reduces REF, DEX, and SPD by -1 (min 1). Max lift: BODY × 50 kg.',
      fr: 'Poids transportable sans malus. Au-delà, chaque tranche de 5 kg réduit RÉF, DEX et VIT de -1 (min. 1). Soulèvement max : COR × 50 kg.',
    },
  },
  vigor: {
    name: { en: 'Vigor Threshold', fr: 'Seuil de Vigueur' },
    formula: { en: 'By Profession', fr: 'Selon Profession' },
    summary: {
      en: 'Maximum Chaos (Stamina cost of all spells cast in one round) you can channel safely. Exceeding it causes Overcasting damage.',
      fr: 'Points de Chaos canalisables en un round sans danger. Si le coût en END de vos sorts sur un round dépasse ce seuil, vous subissez un Dépassement.',
    },
  },
};

/**
 * Complete rulebook descriptions and Base 10 / 13 / 16 / 20 mastery benchmarks
 * for all 52 canonical skills in SKILLS_CATALOG (source: guide/compétences.md).
 */
export const SKILL_DESCRIPTIONS: Record<SkillId, SkillRuleDescription> = {
  // ==========================================
  // INTELLIGENCE (INT)
  // ==========================================
  int_awareness: {
    summary: {
      en: 'Allows you to spot anomalies, hidden threats, or subtle details in your surroundings.',
      fr: 'Permet de déceler des anomalies, des menaces dissimulées ou des détails dans votre environnement.',
    },
    benchmarks: {
      b10: {
        en: 'Relatively attentive; notices nearby people and major landscape changes.',
        fr: 'Relativement attentif aux gens à proximité et aux modifications majeures du paysage.',
      },
      b13: {
        en: 'Spots minor environmental changes and individuals trying to remain discreet.',
        fr: 'Repère des changements anodins et les personnes qui tentent de rester discrètes.',
      },
      b16: {
        en: 'Locates anomalies immediately; very difficult to ambush or surprise.',
        fr: 'Localise sur-le-champ les anomalies ; difficile de vous prendre par surprise.',
      },
      b20: {
        en: 'Constantly on guard; even invisible creatures struggle to sneak up on you.',
        fr: 'Constamment sur vos gardes ; même les créatures invisibles peinent à vous surprendre.',
      },
    },
  },
  int_business: {
    summary: {
      en: 'The art of managing commerce, evaluating goods, negotiating prices, and keeping enterprises solvent.',
      fr: 'L’art d’administrer un commerce, d’évaluer des marchandises et de mener des transactions rentables.',
    },
    benchmarks: {
      b10: {
        en: 'Capable of running a simple lemonade stand or small market stall.',
        fr: 'Capable de tenir un modeste étal ou un stand simple.',
      },
      b13: {
        en: 'Competent enough to manage a tavern without going bankrupt.',
        fr: 'Apte à gérer une taverne sans risquer la banqueroute.',
      },
      b16: {
        en: 'Successful merchant who has built profitable ventures with few mistakes.',
        fr: 'Négociant prospère ayant monté plusieurs affaires sans erreur majeure.',
      },
      b20: {
        en: 'Merchant lord capable of commanding an entire trade empire.',
        fr: 'Seigneur marchand capable de diriger un véritable empire commercial.',
      },
    },
  },
  int_deduction: {
    summary: {
      en: 'The ability to piece together clues and formulate accurate logical conclusions.',
      fr: 'La capacité à formuler des conclusions justes grâce aux indices dont vous disposez.',
    },
    benchmarks: {
      b10: {
        en: 'Your hunches generally point you in the right direction.',
        fr: 'Vos intuitions vous mettent en général sur la bonne piste.',
      },
      b13: {
        en: 'Your gut feelings are sound and backed by logical reasoning.',
        fr: 'Vos pressentiments sont fondés et étayés par des raisonnements logiques.',
      },
      b16: {
        en: 'A handful of clues suffices to reconstruct past events or predict what comes next.',
        fr: 'Quelques indices vous suffisent pour savoir ce qui s’est passé ou ce qui va advenir.',
      },
      b20: {
        en: 'Almost never wrong; solves mysteries even from partial evidence.',
        fr: 'Presque infaillible ; trouve des réponses même avec des preuves partielles.',
      },
    },
  },
  int_education: {
    summary: {
      en: 'Reflects your formal schooling, historical knowledge, sciences, and breadth of general learning.',
      fr: 'Reflète votre niveau d’instruction, vos connaissances académiques, historiques et scientifiques.',
    },
    benchmarks: {
      b10: {
        en: 'Basic knowledge passed down by parents about how the world works.',
        fr: 'Connaissances sommaires sur la marche du monde léguées par vos parents.',
      },
      b13: {
        en: 'Tutored by a mentor or attended one of the rare regional schools.',
        fr: 'A bénéficié d’un mentor ou fréquenté une des rares écoles de sa région natale.',
      },
      b16: {
        en: 'Encyclopedic scholar educated at Oxenfurt or a comparable academy.',
        fr: 'Savoir encyclopédique acquis à Oxenfurt ou dans une académie équivalente.',
      },
      b20: {
        en: 'Erudite sage rivaling university professors and royal council mages.',
        fr: 'Érudit rivalisant d’intelligence avec des professeurs d’université et des mages royaux.',
      },
    },
  },
  int_lang_common: {
    summary: {
      en: 'Proficiency in the Common Speech spoken across the Northern Kingdoms.',
      fr: 'Niveau de maîtrise de la Langue commune, parlée dans l’ensemble des Royaumes du Nord.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank. Native speakers start with rank +8.',
      fr: 'Compétence complexe (×2) : coûte 2 pts par rang. La langue maternelle débute à +8.',
    },
    benchmarks: {
      b10: {
        en: 'Knows the basics and can read simple texts; speaks with a heavy accent and halting cadence.',
        fr: 'Connaît les bases et lit des textes simples ; accent prononcé et diction hachée.',
      },
      b13: {
        en: 'Reads, writes, and speaks fluently, though idioms and technical jargon still slip by.',
        fr: 'Lit, écrit et parle couramment, mais certaines tournures idiomatiques ou techniques échappent.',
      },
      b16: {
        en: 'Deeply familiar with the tongue and understands regional dialects.',
        fr: 'Très familier avec la langue et comprend plusieurs dialectes régionaux.',
      },
      b20: {
        en: 'Speaks flawlessly, knows every dialect, and masters archaic forms.',
        fr: 'Parle à la perfection, connaît tous les dialectes et en maîtrise les formes anciennes.',
      },
    },
  },
  int_lang_elder: {
    summary: {
      en: 'Proficiency in Elder Speech, spoken by Elves, Nilfgaardians, Skelligers, and non-humans (except Dwarves).',
      fr: 'Maîtrise de la Langue ancienne, parlée par les Elfes, Nilfgaardiens, Skelligiens et non-humains (hors Nains).',
    },
    note: {
      en: 'Complex skill (×2). Optional dialect rule: -2 when dealing with a different Elder dialect (Nilfgaardian vs. Skellige vs. Aen Seidhe).',
      fr: 'Compétence complexe (×2). Règle des dialectes : -2 face à un autre dialecte issu de la langue ancienne.',
    },
    benchmarks: {
      b10: {
        en: 'Basic grasp and simple reading; thick accent and slow, choppy delivery.',
        fr: 'Bases suffisantes pour lire des textes ; accent prononcé et diction lente et hachée.',
      },
      b13: {
        en: 'Fluent reading, writing, and speech; occasional struggle with idioms or technical terms.',
        fr: 'Lit, écrit et parle couramment, hormis les tournures idiomatiques et termes techniques.',
      },
      b16: {
        en: 'Comfortable across multiple regional dialects.',
        fr: 'Très familier de la langue, comprend plusieurs dialectes associés.',
      },
      b20: {
        en: 'Flawless command of every dialect as well as ancient classical forms.',
        fr: 'Parle à la perfection, connaît tous ses dialectes et maîtrise ses formes anciennes.',
      },
    },
  },
  int_lang_dwarvish: {
    summary: {
      en: 'Proficiency in the Dwarvish tongue spoken in Mahakam and Dwarven enclaves.',
      fr: 'Maîtrise de la Langue naine, parlée à Mahakam et dans les enclaves naines.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank. Native speakers start with rank +8.',
      fr: 'Compétence complexe (×2) : coûte 2 pts par rang. La langue maternelle débute à +8.',
    },
    benchmarks: {
      b10: {
        en: 'Knows basic vocabulary and can read runes/texts; heavy accent and slow speech.',
        fr: 'Connaît les bases et lit des textes ; accent à couper au couteau et diction hachée.',
      },
      b13: {
        en: 'Reads, writes, and speaks fluently; misses subtle idioms and forge jargon.',
        fr: 'Lit, écrit et parle couramment, bien que les expressions techniques échappent encore.',
      },
      b16: {
        en: 'Understands clan dialects and nuanced Dwarvish phrasing.',
        fr: 'Assez familier avec la langue pour comprendre certains dialectes claniques.',
      },
      b20: {
        en: 'Perfect command of every Dwarvish dialect and ancient Mahakam forms.',
        fr: 'Maîtrise parfaite de la langue, de tous ses dialectes et de ses formes anciennes.',
      },
    },
  },
  int_monster_lore: {
    summary: {
      en: 'The sum of your knowledge regarding monsters, their classifications, habitats, and weaknesses.',
      fr: 'La somme d’informations que vous possédez à propos des monstres, de leurs comportements et faiblesses.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Can tell a nekker apart from a ghoul.',
        fr: 'Capable de différencier un nekker d’une goule.',
      },
      b13: {
        en: 'Knows how to classify monsters into their general categories.',
        fr: 'Sait classer les monstres au sein des diverses catégories générales.',
      },
      b16: {
        en: 'Knows the specific strengths and weaknesses of most common creatures.',
        fr: 'Au fait des forces et faiblesses que possèdent les créatures les plus communes.',
      },
      b20: {
        en: 'Can analyze almost any monster in seconds—a feat even a Witcher would respect.',
        fr: 'Analyse presque n’importe quel monstre en quelques secondes, un exploit digne d’un sorceleur.',
      },
    },
  },
  int_etiquette: {
    summary: {
      en: 'The ability to blend into social environments and avoid making a fool of yourself in polite or noble society.',
      fr: 'Capacité à se fondre dans un environnement social et à ne pas se ridiculiser dans la bonne société.',
    },
    benchmarks: {
      b10: {
        en: 'Knows how to address nobility and behave decently in upscale districts.',
        fr: 'Sait comment s’adresser à la noblesse et se comporter correctement dans les beaux quartiers.',
      },
      b13: {
        en: 'Can attend high-society banquets and parties without standing out awkwardly.',
        fr: 'Peut participer à des fêtes mondaines sans faire tache dans le décor.',
      },
      b16: {
        en: 'Accomplished lady or gentleman versed in every law of high society.',
        fr: 'Gentilhomme ou noble dame accomplie, évoluant avec grâce selon toutes les lois mondaines.',
      },
      b20: {
        en: 'Knows the unspoken rules of royal courts; could impress the Emperor of Nilfgaard.',
        fr: 'Connaît les règles tacites des cours royales ; pourrait impressionner l’Empereur de Nilfgaard.',
      },
    },
  },
  int_streetwise: {
    summary: {
      en: 'Understanding how urban underworlds function—factions, crime, safe routes, and power brokers.',
      fr: 'Compréhension du fonctionnement urbain : pègre, factions, quartiers sûrs et figures influentes.',
    },
    benchmarks: {
      b10: {
        en: 'Knows enough to avoid thugs and find the safer neighborhoods of a city.',
        fr: 'En sait assez pour éviter les voyous et rejoindre les quartiers les plus sûrs.',
      },
      b13: {
        en: 'Can usually tell which faction controls a district and why.',
        fr: 'Détermine quelle faction exerce son influence sur un quartier et pourquoi.',
      },
      b16: {
        en: 'Gathers extensive intel simply by watching a street; knows key figures and ties.',
        fr: 'Récolte quantité d’informations en observant une zone et identifie les personnalités clés.',
      },
      b20: {
        en: 'Assesses a city’s entire political and criminal pulse at a glance.',
        fr: 'Évalue la situation d’une ville en un clin d’œil, comme un habitant de longue date.',
      },
    },
  },
  int_tactics: {
    summary: {
      en: 'Anticipating enemy maneuvers, commanding battlefield formations, and planning strategic operations (also used for Gwent).',
      fr: 'Permet d’anticiper les mouvements ennemis, planifier des manœuvres et commander au combat (sert aussi au gwynt).',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Understands basic patterns of a skirmish between untrained civilians.',
        fr: 'Comprend le schéma basique d’un combat entre civils.',
      },
      b13: {
        en: 'Can command a small platoon and rout an opposing force of equal size.',
        fr: 'Peut commander un petit bataillon et mettre en déroute une force équivalente.',
      },
      b16: {
        en: 'Capable of leading a major mercenary band and adapting to any battlefield.',
        fr: 'Peut diriger une bande de mercenaires majeure et s’adapter à toute situation.',
      },
      b20: {
        en: 'True warlord with the strategic genius to win battles against overwhelming odds.',
        fr: 'Véritable chef de guerre capable de remporter une bataille contre toute attente.',
      },
    },
  },
  int_teaching: {
    summary: {
      en: 'The ability to pass on knowledge clearly and train students or apprentices efficiently.',
      fr: 'Capacité à dispenser son savoir et à former efficacement des élèves ou apprentis.',
    },
    benchmarks: {
      b10: {
        en: 'Explains simple procedures from start to finish, though students may miss nuances.',
        fr: 'Explique un procédé simple de A à Z, sans garantir que l’élève saisisse chaque détail.',
      },
      b13: {
        en: 'Can teach the basics of a skill to an attentive pupil without trouble.',
        fr: 'Peut enseigner les bases d’une compétence à un élève attentif sans problème.',
      },
      b16: {
        en: 'Given time, teaches complex subjects even to distracted students.',
        fr: 'Avec du temps, apprend des procédés complexes même à des étudiants peu attentifs.',
      },
      b20: {
        en: 'Master pedagogue whose lessons engage anyone on the first try.',
        fr: 'Maître pédagogue capable d’intéresser n’importe qui ; vos leçons font mouche du premier coup.',
      },
    },
  },
  int_survival: {
    summary: {
      en: 'Surviving in the wild, tracking prey, and foraging for food, herbs, or crafting materials.',
      fr: 'Survivre dans la nature, pister des proies et rechercher vivres, herbes ou matériaux.',
    },
    note: {
      en: 'Foraging DCs: Forests 10, Plains 12, Coasts/Mountains 14, Caves 15, Deserts 18, Tundra 20.',
      fr: 'SD de recherche : Forêts 10, Plaines 12, Côtes/Montagnes 14, Grottes 15, Déserts 18, Toundra 20.',
    },
    benchmarks: {
      b10: {
        en: 'Can start a fire, spot common poisonous plants, and follow a clear trail.',
        fr: 'Sait faire du feu, reconnaître les plantes toxiques courantes et suivre une piste.',
      },
      b13: {
        en: 'Survives alone in inhospitable regions and earns a living hunting.',
        fr: 'Vit seul en région inhospitalière et gagne sa vie grâce à la chasse.',
      },
      b16: {
        en: 'Seasoned hermit or ranger thriving effortlessly in the wilderness.',
        fr: 'Ermite ou forestier qui survit sans peine dans les contrées sauvages.',
      },
      b20: {
        en: 'Masters every hostile biome; no environment breaks you and no prey escapes.',
        fr: 'Maîtrise tout milieu hostile ; aucun environnement ne vous terrasse, aucune proie n’échappe.',
      },
    },
  },

  // ==========================================
  // REFLEXES (REF)
  // ==========================================
  ref_brawling: {
    summary: {
      en: 'Unarmed fighting using punches, kicks, grapples, and improvised tavern-brawl maneuvers.',
      fr: 'L’art de se battre à mains nues, d’asséner des coups de poing ou de pied et d’agripper un adversaire.',
    },
    benchmarks: {
      b10: {
        en: 'Competent pugilist who wins fights against ordinary opponents.',
        fr: 'Pugiliste compétent remportant ses combats contre des adversaires normaux.',
      },
      b13: {
        en: 'Seasoned wrestler who drops regular tavern brawlers with ease.',
        fr: 'Lutteur chevronné mettant au tapis les habitués des bagarres de taverne.',
      },
      b16: {
        en: 'Skilled unarmed combatant able to defeat trained professional soldiers.',
        fr: 'Combattant aguerri connaissant de nombreuses techniques pour terrasser des soldats.',
      },
      b20: {
        en: 'Martial arts master capable of holding your own even against armed foes.',
        fr: 'Maître des arts martiaux capable de tenir tête à des combattants armés.',
      },
    },
  },
  ref_dodge: {
    summary: {
      en: 'Evading melee strikes, dodging ranged projectiles, and slipping free from grapples.',
      fr: 'Permet d’esquiver attaques de mêlée et projectiles, et de se soustraire aux prises adverses.',
    },
    benchmarks: {
      b10: {
        en: 'Avoids telegraphed blows or breaks free from a weak attacker.',
        fr: 'Évite des coups téléphonés ou échappe à un agresseur faible.',
      },
      b13: {
        en: 'Sidesteps incoming spears you see coming and escapes standard holds.',
        fr: 'Esquive une lance vue à temps et se défait des prises les plus courantes.',
      },
      b16: {
        en: 'Capable of dodging arrows and bolts within your line of sight.',
        fr: 'Évite des flèches ou des carreaux tant qu’ils sont dans votre champ de vision.',
      },
      b20: {
        en: 'Sixth-sense evasion against projectiles and effortless counter-escapes from any hold.',
        fr: 'Esquive des projectiles par sixième sens et contre toutes sortes de clefs et prises.',
      },
    },
  },
  ref_melee: {
    summary: {
      en: 'Wielding axes, maces, clubs, flails, whips, and non-sword melee weapons (plus monster natural attacks).',
      fr: 'Utilisation des haches, masses, matraques et fouets au corps-à-corps.',
    },
    benchmarks: {
      b10: {
        en: 'Knows how to hold and swing a standard melee weapon properly.',
        fr: 'Sait tenir et manier correctement une arme de corps-à-corps.',
      },
      b13: {
        en: 'Handles axes and blunt weapons with the skill of a professional soldier.',
        fr: 'Manie la hache avec autant d’adresse qu’un soldat professionnel.',
      },
      b16: {
        en: 'Matches hardened battlefield veterans in fierce close combat.',
        fr: 'Rivalise de talent avec des vétérans endurcis au cœur des combats.',
      },
      b20: {
        en: 'Master of war capable of defeating multiple foes simultaneously.',
        fr: 'Maître de guerre capable de défaire plusieurs adversaires en même temps.',
      },
    },
  },
  ref_riding: {
    summary: {
      en: 'Mounting, controlling, and fighting from horseback—or, at mastery, more exotic beasts.',
      fr: 'Permet de monter à cheval, galoper et combattre en selle, voire chevaucher d’autres créatures.',
    },
    benchmarks: {
      b10: {
        en: 'Rides a trained horse without falling out of the saddle.',
        fr: 'Monte un cheval dressé sans tomber de selle.',
      },
      b13: {
        en: 'Comfortable leaping low obstacles and driving your mount to a full gallop.',
        fr: 'Saute par-dessus des obstacles bas et lance sa monture au galop avec aisance.',
      },
      b16: {
        en: 'Breaks wild horses and rides bareback with little difficulty.',
        fr: 'Dompte des chevaux sauvages et monte à cru sans trop de problèmes.',
      },
      b20: {
        en: 'Performs trick riding and can dare to mount dangerous creatures.',
        fr: 'Exécute des figures de voltige et peut risquer de chevaucher des créatures dangereuses.',
      },
    },
  },
  ref_sailing: {
    summary: {
      en: 'Piloting vessels, reading currents, and navigating treacherous seas.',
      fr: 'Savoir manier la barre d’un vaisseau et naviguer en eaux calmes comme agitées.',
    },
    benchmarks: {
      b10: {
        en: 'Can steer and sail safely in calm weather.',
        fr: 'Sait naviguer correctement par temps calme.',
      },
      b13: {
        en: 'Handles rough swells and steers clear of reefs and obstacles.',
        fr: 'Se débrouille en cas de remous et évite les obstacles avec aisance.',
      },
      b16: {
        en: 'Crosses open oceans while evading sirens and drowners.',
        fr: 'Sillonne les océans tout en échappant aux sirènes et aux noyeurs.',
      },
      b20: {
        en: 'Guides a ship through devastating storms with minimal damage.',
        fr: 'Mène son navire à travers des tempêtes dévastatrices sans trop subir de dommages.',
      },
    },
  },
  ref_small_blades: {
    summary: {
      en: 'Precision fighting with light concealable weapons such as daggers, stilettos, and cleavers.',
      fr: 'Utilisation d’armes légères telles que les dagues, stylets et couperets.',
    },
    benchmarks: {
      b10: {
        en: 'Handles knives and short blades with reasonable effectiveness.',
        fr: 'Manipule les lames courtes avec une relative efficacité.',
      },
      b13: {
        en: 'Professional precision rivaling that of a trained assassin.',
        fr: 'Professionnel dont la dextérité égale celle d’un assassin.',
      },
      b16: {
        en: 'Goes toe-to-toe with hardened veterans in close knife fights.',
        fr: 'Rivalise avec des vétérans endurcis lors de combats au couteau.',
      },
      b20: {
        en: 'Lethal close-quarters veteran able to drop multiple foes at once.',
        fr: 'Briscard capable de terrasser plusieurs adversaires à la fois au corps-à-corps.',
      },
    },
  },
  ref_staff_spear: {
    summary: {
      en: 'Fighting with long reach weapons including quarterstaves, spears, pikes, and halberds.',
      fr: 'Usage des armes longues telles que bâtons, lances, piques et haches d’armes.',
    },
    benchmarks: {
      b10: {
        en: 'Uses polearms and staves competently.',
        fr: 'Se sert correctement des armes d’hast et bâtons.',
      },
      b13: {
        en: 'Wields a pike or spear as deftly as a professional soldier.',
        fr: 'Manie la pique avec autant d’aisance qu’un soldat professionnel.',
      },
      b16: {
        en: 'Can brace and hold firm against a full cavalry charge without flinching.',
        fr: 'Peut soutenir une charge de cavalerie sans fléchir.',
      },
      b20: {
        en: 'Forms an impenetrable wall of wood and steel all on your own.',
        fr: 'Forme un mur de bois et d’acier impénétrable à vous seul.',
      },
    },
  },
  ref_swordsmanship: {
    summary: {
      en: 'The art of dueling and battlefield combat with steel or silver swords.',
      fr: 'L’art de manier l’épée en duel comme sur le champ de bataille.',
    },
    benchmarks: {
      b10: {
        en: 'Knows basic blade grip, footwork, and strikes.',
        fr: 'Sait manipuler correctement une lame.',
      },
      b13: {
        en: 'Skilled enough to gain the upper hand on the battlefield.',
        fr: 'Prend l’avantage sur le champ de bataille grâce à sa technique.',
      },
      b16: {
        en: 'Wins the vast majority of formal or street duels.',
        fr: 'Remporte la majorité de ses duels.',
      },
      b20: {
        en: 'Legendary veteran whose blade carves devastation through combat.',
        fr: 'Vétéran redoutable qui fait des ravages dès que l’acier chante.',
      },
    },
  },

  // ==========================================
  // DEXTERITY (DEX)
  // ==========================================
  dex_archery: {
    summary: {
      en: 'Drawing and loosing arrows accurately with shortbows, longbows, and war bows.',
      fr: 'Savoir bander un arc et décocher des flèches avec précision.',
    },
    benchmarks: {
      b10: {
        en: 'Capable of stringing a bow and shooting with decent accuracy.',
        fr: 'Sait tendre un arc et tirer avec une précision honnête.',
      },
      b13: {
        en: 'Battlefield-tested archer with reliable accuracy under pressure.',
        fr: 'Archer expérimenté ayant connu les champs de bataille ; précision fiable.',
      },
      b16: {
        en: 'Consistently hits bullseyes and nails shots trained archers call difficult.',
        fr: 'Fait régulièrement mouche et réussit des tirs jugés difficiles par des gens entraînés.',
      },
      b20: {
        en: 'Master bowman able to strike any target regardless of size or range.',
        fr: 'Maître archer capable de toucher n’importe quelle cible, quelles que soient sa taille et la portée.',
      },
    },
  },
  dex_athletics: {
    summary: {
      en: 'The premier skill for climbing, keeping balance, acrobatics, and throwing weapons (knives, axes, bombs).',
      fr: 'La compétence reine pour escalader, garder son équilibre, faire des acrobaties et lancer des armes.',
    },
    benchmarks: {
      b10: {
        en: 'Scales steep rocky cliffs and hits stationary targets with thrown weapons.',
        fr: 'Escalade des parois escarpées et touche des cibles stationnaires au lancer.',
      },
      b13: {
        en: 'Climbs buildings smoothly and fights steadily on pitched rooftops.',
        fr: 'Grimpe sur les bâtiments avec aisance et combat sur des toits inclinés.',
      },
      b16: {
        en: 'Tightrope balance; aims thrown daggers straight into gaps in armor.',
        fr: 'Talents de funambule ; vise les fentes d’une armure avec des dagues de lancer.',
      },
      b20: {
        en: 'Acrobatic feats on narrow beams and effortless climbing on any non-slick surface.',
        fr: 'Figures acrobatiques sur des poutres étroites et escalade toute surface non glissante.',
      },
    },
  },
  dex_crossbow: {
    summary: {
      en: 'Loading, aiming, and firing crossbows accurately, even amid chaotic combat.',
      fr: 'Savoir armer, viser et tirer avec précision à l’arbalète.',
    },
    benchmarks: {
      b10: {
        en: 'Can span a crossbow and shoot with honest accuracy.',
        fr: 'Sait tendre la corde d’une arbalète et tirer avec une précision honnête.',
      },
      b13: {
        en: 'Battle-hardened crossbowman whose aim holds steady in live combat.',
        fr: 'Arbalétrier aguerri conservant une bonne précision en plein combat.',
      },
      b16: {
        en: 'Regularly lands bullseyes on shots seasoned soldiers find hard.',
        fr: 'Fait régulièrement mouche sur des tirs que des gens aguerris jugent difficiles.',
      },
      b20: {
        en: 'Master crossbowman able to hit any target at any range.',
        fr: 'Maître arbalétrier touchant n’importe quelle cible, quelle que soit la portée.',
      },
    },
  },
  dex_sleight_of_hand: {
    summary: {
      en: 'Palming items, performing sleight tricks, pickpocketing valuables, or planting notes unseen.',
      fr: 'Tours de passe-passe, faire apparaître/disparaître des objets, pickpocket ou glisser discrètement un objet.',
    },
    benchmarks: {
      b10: {
        en: 'Simple tricks like palming a coin or item from your pocket convincingly.',
        fr: 'Tours simples comme faire croire qu’un objet de votre poche apparaît de nulle part.',
      },
      b13: {
        en: 'Picks pockets and lifts small valuables without victims noticing.',
        fr: 'Commet ses larcins sans que les victimes le remarquent.',
      },
      b16: {
        en: 'Plants or steals items right under the noses of alert marks.',
        fr: 'Glisse ou dérobe des biens sous le nez même de personnes attentives.',
      },
      b20: {
        en: 'Makes large objects—even swords or small animals—vanish cleanly.',
        fr: 'Capable de faire disparaître de grands objets, y compris des épées ou de petits animaux.',
      },
    },
  },
  dex_stealth: {
    summary: {
      en: 'Moving silently, hiding in shadows, infiltrating guarded areas, and drawing weapons unnoticed.',
      fr: 'L’art de la discrétion, du déplacement silencieux et de l’infiltration.',
    },
    benchmarks: {
      b10: {
        en: 'Slips past dozing guards without waking them.',
        fr: 'Se faufile derrière des gardes assoupis sans les réveiller.',
      },
      b13: {
        en: 'Evades normal guard patrols and draws weapons silently.',
        fr: 'Échappe à l’attention des gardes et dégaine ses armes sans se faire remarquer.',
      },
      b16: {
        en: 'As stealthy as a veteran assassin; rarely caught snooping.',
        fr: 'Aussi discret qu’un assassin chevronné ; rarement pris la main dans le sac.',
      },
      b20: {
        en: 'Infiltrating secure strongholds is child’s play; draws steel right behind alert sentries.',
        fr: 'Infiltre les bâtiments sécurisés et dégaine derrière des veilleurs aux aguets sans attirer l’attention.',
      },
    },
  },

  // ==========================================
  // BODY (COR)
  // ==========================================
  cor_physique: {
    summary: {
      en: 'Raw muscular power used to lift, smash, pry open, and bend heavy or solid objects.',
      fr: 'Capacité à soulever, fendre, défoncer et tordre des objets lourds et solides.',
    },
    benchmarks: {
      b10: {
        en: 'Lifts burly adults overhead and snaps wooden posts.',
        fr: 'Soulève des personnes corpulentes au-dessus de la tête et brise des poteaux en bois.',
      },
      b13: {
        en: 'Tears thin books in half, punches through wooden crates, and bends thin iron rods.',
        fr: 'Déchire des ouvrages minces, troue des caisses en bois et tord de fines barres de métal.',
      },
      b16: {
        en: 'Snaps manacles and breaks through rusted metal fittings.',
        fr: 'Brise des menottes et des morceaux de métal rouillé.',
      },
      b20: {
        en: 'Strong enough to bend prison bars and punch straight through solid metal.',
        fr: 'Assez fort pour plier des barreaux de prison et trouer n’importe quel type de métal.',
      },
    },
  },
  cor_endurance: {
    summary: {
      en: 'Measures resistance to physical exhaustion, severe pain, torture, hunger, and intoxicants/drugs.',
      fr: 'Mesure votre résistance à la fatigue, à la douleur, à la faim et aux drogues.',
    },
    benchmarks: {
      b10: {
        en: 'Tough enough for forced marches and absorbing blows in long tavern brawls.',
        fr: 'Endure marches forcées et coups lors de longues bagarres de taverne.',
      },
      b13: {
        en: 'Body hardened against mistreatment; holds out against amateur torturers.',
        fr: 'Organisme endurci capable de tenir tête à un tortionnaire amateur.',
      },
      b16: {
        en: 'Withstands harsh interrogation and survives days on minimal rations.',
        fr: 'Endure des interrogatoires poussés et survit plusieurs jours en rationnant eau et vivres.',
      },
      b20: {
        en: 'Laughs in the face of sadistic torturers and endures extreme climates on scraps.',
        fr: 'Rit au nez des bourreaux sadiques et survit en climat extrême avec de maigres vivres.',
      },
    },
  },

  // ==========================================
  // EMPATHY (EMP)
  // ==========================================
  emp_charisma: {
    summary: {
      en: 'Natural likability, warmth, and social ease in everyday interactions.',
      fr: 'Votre aisance naturelle et la sympathie que vous inspirez aux autres.',
    },
    benchmarks: {
      b10: {
        en: 'Makes friends easily at the local tavern.',
        fr: 'Se fait facilement des amis à la taverne du coin.',
      },
      b13: {
        en: 'Seen as genuinely likable; rarely provokes hostility.',
        fr: 'Passe pour quelqu’un d’aimable et n’inspire guère d’antipathie.',
      },
      b16: {
        en: 'Life of the group; people find it hard to stay angry at you for long.',
        fr: 'Boute-en-train de l’équipe ; on a bien du mal à vous en vouloir pour quoi que ce soit.',
      },
      b20: {
        en: 'Could talk an enraged troll into sitting down for Gwent over a pint.',
        fr: 'Pourrait convaincre un troll enragé de jouer au gwynt autour d’une bonne pinte.',
      },
    },
  },
  emp_deceit: {
    summary: {
      en: 'The art of lying convincingly, spinning bluffs, and hiding ulterior motives.',
      fr: 'L’art du mensonge, du bluff et de la dissimulation.',
    },
    benchmarks: {
      b10: {
        en: 'Can convince peasants you are not a spy or pull off polite social fibs.',
        fr: 'Persuade des paysans que vous n’êtes pas un espion ou invente des excuses polies.',
      },
      b13: {
        en: 'Habitual liar who spins tall tales smoothly without giving yourself away.',
        fr: 'Adepte régulier du mensonge servant des salades sans trop se trahir.',
      },
      b16: {
        en: 'Lies as naturally as breathing; fools city watchmen completely.',
        fr: 'Ment comme il respire ; embobine des membres du guet qui y croient dur comme fer.',
      },
      b20: {
        en: 'Master of deception capable of bluffing your way past Impera Brigade interrogators.',
        fr: 'Maître de dissimulation capable de sauver sa peau face à un interrogatoire de la brigade Impera.',
      },
    },
  },
  emp_fine_arts: {
    summary: {
      en: 'Creating artistic works—painting, poetry, songwriting, sculpture, or glasswork (specify discipline).',
      fr: 'Création d’œuvres d’art : peinture, écriture de chansons, sculpture ou soufflage du verre (préciser le domaine).',
    },
    benchmarks: {
      b10: {
        en: 'Prior hobby experience; able to craft a complete piece from start to finish.',
        fr: 'Pratique passée suffisante pour créer une pièce complète de A à Z.',
      },
      b13: {
        en: 'Genuine talent; your pieces are fine enough to sell on the open market.',
        fr: 'Talent certain ; créations suffisamment belles pour être vendues sur le marché.',
      },
      b16: {
        en: 'Gifted artist capable of earning a full living purely from your art.',
        fr: 'Artiste doué pouvant vivre uniquement de la vente de ses œuvres.',
      },
      b20: {
        en: 'Renowned genius likely to receive commissions from kings or emperors.',
        fr: 'Véritable génie susceptible de recevoir des commandes d’un roi ou d’un empereur.',
      },
    },
  },
  emp_gambling: {
    summary: {
      en: 'Calculating odds, reading table stakes, and winning wagers at dice poker and games of chance.',
      fr: 'Calcul des probabilités et gestion des mises aux jeux de hasard (dés, paris).',
    },
    note: {
      en: 'Dice poker and chance games use Gambling; Gwent uses Tactics (INT).',
      fr: 'Les jeux de dés relèvent de Jeu, mais le gwynt fait appel à la compétence Tactique (INT).',
    },
    benchmarks: {
      b10: {
        en: 'Calculates basic win/loss odds against unfamiliar players.',
        fr: 'Calcule ses chances de gagner ou de perdre face à de nouveaux participants.',
      },
      b13: {
        en: 'Consistently beats average gamblers.',
        fr: 'Remporte ses parties contre des joueurs de niveau moyen.',
      },
      b16: {
        en: 'Sweeps the pot against most opponents—often accused of cheating.',
        fr: 'Rafle la mise contre la plupart des gens ; souvent accusé de tricherie.',
      },
      b20: {
        en: 'Infamous shark revered as a master of high-stakes underground betting.',
        fr: 'Connu comme le loup blanc et considéré comme un maître des paris dans les milieux illicites.',
      },
    },
  },
  emp_grooming: {
    summary: {
      en: 'Highlighting your natural appeal, etiquette of dress, and personal presentation across cultures.',
      fr: 'Savoir mettre en valeur ses atouts naturels et revêtir une tenue élégante pour faire bonne impression.',
    },
    benchmarks: {
      b10: {
        en: 'Looks well-groomed and noticeably put-together.',
        fr: 'Paraît plutôt chic et soigné.',
      },
      b13: {
        en: 'Skilled enough to work in a salon in Novigrad or Nilfgaard’s capital.',
        fr: 'Pourrait travailler dans un salon de beauté à Novigrad ou dans la capitale nilfgaardienne.',
      },
      b16: {
        en: 'When you make an effort, your style rivals that of sorceresses.',
        fr: 'Rivalise d’élégance et de beauté avec les magiciennes quand vous y mettez du vôtre.',
      },
      b20: {
        en: 'Could serve as personal stylist to noblewomen; sets trends talked about for months.',
        fr: 'Styliste digne de la haute noblesse dont les créations restent au cœur des conversations.',
      },
    },
  },
  emp_human_perception: {
    summary: {
      en: 'Reading the emotions, hidden intentions, and truthfulness of other intelligent beings.',
      fr: 'Savoir déchiffrer les émotions, les intentions cachées et les mensonges d’autrui.',
    },
    note: {
      en: 'Human/Sapient Psychology: suffers a -2 penalty when used on races other than your own.',
      fr: 'Psychologie « humaine » : subit un malus de -2 sur les espèces intelligentes autres que la vôtre.',
    },
    benchmarks: {
      b10: {
        en: 'Empathetic listener whom people naturally trust with their troubles.',
        fr: 'Personne empathique à qui l’on confie volontiers ses problèmes.',
      },
      b13: {
        en: 'Reads the moods and motives of conversation partners easily.',
        fr: 'Lit aisément dans l’esprit et les intentions de ses interlocuteurs.',
      },
      b16: {
        en: 'Catches the slightest twitch of discomfort and knows immediately when someone lies.',
        fr: 'Décèle le moindre signe d’inconfort et sait quand quelqu’un ment.',
      },
      b20: {
        en: 'Master psychologist who reads people completely at a single glance.',
        fr: 'Véritable psychologue qui évalue les gens d’un seul coup d’œil.',
      },
    },
  },
  emp_leadership: {
    summary: {
      en: 'Rallying allies to your banner, taking command in crises, and inspiring obedience.',
      fr: 'Savoir rallier les autres sous sa bannière, prendre le contrôle en crise et se faire obéir.',
    },
    benchmarks: {
      b10: {
        en: 'Your confidence convinces people to follow your orders in urgent situations.',
        fr: 'Votre assurance pousse les gens à suivre vos ordres dans les situations pressantes.',
      },
      b13: {
        en: 'Competent leader capable of directing a small band effectively.',
        fr: 'Meneur d’hommes compétent capable de diriger efficacement un petit groupe.',
      },
      b16: {
        en: 'Commands a full squad of soldiers without anyone questioning your authority.',
        fr: 'Commande une escouade de soldats sans que personne ne remette vos ordres en question.',
      },
      b20: {
        en: 'Historic commander remembered for leading armies across the Continent.',
        fr: 'Votre nom restera gravé dans l’histoire pour avoir mené des armées au combat.',
      },
    },
  },
  emp_persuasion: {
    summary: {
      en: 'Convincing others through rhetoric, diplomacy, and compelling arguments.',
      fr: 'Convaincre les gens que vous avez raison ou les persuader d’agir pour vous.',
    },
    benchmarks: {
      b10: {
        en: 'Persuasive enough that you rarely end up paying for the next round.',
        fr: 'Assez persuasif pour rarement payer la tournée suivante à la taverne.',
      },
      b13: {
        en: 'Can talk guards into letting you walk away from minor infractions like trespassing.',
        fr: 'Convainc les gardes de vous laisser partir après un délit mineur.',
      },
      b16: {
        en: 'Holds your own in debates through the halls of Oxenfurt Academy.',
        fr: 'Capable de débattre d’égal à égal dans les couloirs de l’Académie d’Oxenfurt.',
      },
      b20: {
        en: 'Master rhetorician who could persuade King Radovid the Stern to spare a mage.',
        fr: 'Maître de rhétorique capable de convaincre le roi Radovid le Sévère d’épargner un mage.',
      },
    },
  },
  emp_performance: {
    summary: {
      en: 'Playing instruments, singing, storytelling, or acting on stage (specify type of performance).',
      fr: 'Jouer de la musique, chanter ou incarner un rôle théâtral (préciser le type de spectacle).',
    },
    benchmarks: {
      b10: {
        en: 'Sings simple ballads and performs passably on stage.',
        fr: 'Chante des chansons simples et joue correctement sur les planches.',
      },
      b13: {
        en: 'Memorable performances that leave a lasting mark on audiences.',
        fr: 'Vos numéros marquent durablement le public.',
      },
      b16: {
        en: 'Sways crowds effortlessly and improvises songs on the spot.',
        fr: 'Manipule la foule à sa guise et improvise des chansons sans effort.',
      },
      b20: {
        en: 'Command performances requested by kings and emperors.',
        fr: 'Sollicité pour donner des représentations devant des rois et des empereurs.',
      },
    },
  },
  emp_seduction: {
    summary: {
      en: 'Flirtation, romantic charm, allure, and prowess in intimate encounters.',
      fr: 'Définit vos talents de séducteur, votre charme romantique et vos prouesses intimes.',
    },
    benchmarks: {
      b10: {
        en: 'Natural charmer with respectable experience.',
        fr: 'Vrai charmeur doté d’une certaine expérience.',
      },
      b13: {
        en: 'Flirts gracefully; partners speak fondly of your company.',
        fr: 'Flirte avec grâce et élégance ; vos partenaires louent vos performances.',
      },
      b16: {
        en: 'Would be the star attraction in the finest high-end brothel.',
        fr: 'Ferait un tabac dans un établissement de grand luxe.',
      },
      b20: {
        en: 'Surrounded by admirers; leaves an unforgettable impression on every lover.',
        fr: 'Croule sous les admirateurs et laisse un souvenir impérissable à chacun de ses partenaires.',
      },
    },
  },

  // ==========================================
  // TECHNIQUE / CRAFT (TEC)
  // ==========================================
  tec_alchemy: {
    summary: {
      en: 'Brewing potions, blade oils, decoctions, mutagens, bombs, and alchemical substances.',
      fr: 'L’art de préparer potions, huiles, décoctions, bombes et autres breuvages alchimiques.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Still learning, yet brews simple compounds like chloroform easily.',
        fr: 'Tâtonne encore, mais fabrique sans peine des mixtures simples comme du chloroforme.',
      },
      b13: {
        en: 'Full-time alchemist able to brew Witcher potions and oils.',
        fr: 'Alchimiste confirmé capable de concocter des huiles et potions de sorceleur.',
      },
      b16: {
        en: 'Accomplished savant able to improvise remedies even without standard lab gear.',
        fr: 'Savant accompli capable de préparer des remèdes même sans matériel standard.',
      },
      b20: {
        en: 'Grandmaster alchemist capable of brewing any formula or Witcher decoction in the book.',
        fr: 'Passé maître ; prépare toutes les formules alchimiques et décoctions de sorceleur.',
      },
    },
  },
  tec_crafting: {
    summary: {
      en: 'Forging, tailoring, and repairing weapons, armor, shields, and artisan equipment.',
      fr: 'Fabrication et réparation d’armes, d’armures, de boucliers et d’équipements.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Crafts reliable shields and daggers with ease.',
        fr: 'Fabrique sans peine des boucliers et des dagues.',
      },
      b13: {
        en: 'Forges battlefield-ready swords and chainmail.',
        fr: 'Réalise des épées et des cottes de mailles dignes du champ de bataille.',
      },
      b16: {
        en: 'Sought-after smith whose maker’s mark makes blades prized possessions.',
        fr: 'Les guerriers se disputent vos lames ; votre poinçon est reconnu.',
      },
      b20: {
        en: 'Legendary master artisan able to forge masterwork relics with little strain.',
        fr: 'Talents très recherchés ; fabrique des artefacts d’excellente facture sans trop de peine.',
      },
    },
  },
  tec_disguise: {
    summary: {
      en: 'Applying makeup, prosthetics, and tailored outfits to mask your identity or someone else’s.',
      fr: 'Savoir se grimer ou costumer autrui pour dissimuler sa véritable identité.',
    },
    benchmarks: {
      b10: {
        en: 'Fairly skilled at concealing someone’s true appearance.',
        fr: 'Plutôt doué quand il s’agit de dissimuler la véritable identité de quelqu’un.',
      },
      b13: {
        en: 'Crafts authentic attire for specific professions or cultures.',
        fr: 'Fabrique des costumes adaptés à des professions ou des cultures spécifiques.',
      },
      b16: {
        en: 'Capable of transforming yourself into a convincing double of anyone.',
        fr: 'Capable de vous transformer en sosie parfait de n’importe qui.',
      },
      b20: {
        en: 'Master of disguise realistic enough to pass as another race or sex.',
        fr: 'Réalisme saisissant permettant même d’incarner une autre race ou le sexe opposé.',
      },
    },
  },
  tec_first_aid: {
    summary: {
      en: 'Stopping bleeding, setting fractures, stabilizing dying allies, and countering poisons.',
      fr: 'Stopper les hémorragies, réduire les fractures, stabiliser les blessés et contrer les poisons.',
    },
    benchmarks: {
      b10: {
        en: 'Applies tourniquets and handles urgent field emergencies.',
        fr: 'Sait poser un garrot et se débrouiller en cas d’urgence.',
      },
      b13: {
        en: 'Administers proper first aid and patches up light wounds effortlessly.',
        fr: 'Prodigue les premiers soins et guérit les blessures légères sans peine.',
      },
      b16: {
        en: 'Experienced field medic able to stabilize multiple patients for transport to a surgeon.',
        fr: 'Prépare plusieurs patients à la fois pour leur transport rapide vers un chirurgien.',
      },
      b20: {
        en: 'Though not a full surgeon, you can pull the dying back from the brink with ease.',
        fr: 'Ramène sans difficulté des mourants à la vie même sans pratiquer la chirurgie lourde.',
      },
    },
  },
  tec_forgery: {
    summary: {
      en: 'Falsifying official passes, letters of marque, seals, and minting counterfeit coin.',
      fr: 'Falsification de documents et papiers officiels, ainsi que fabrication de fausse monnaie.',
    },
    benchmarks: {
      b10: {
        en: 'Imitates papers or coins, though risky to use under big-city scrutiny.',
        fr: 'Imite papiers ou monnaies, mais déconseillé dans les grandes villes très contrôlées.',
      },
      b13: {
        en: 'Coins currency most merchants accept and forges unsealed documents cleanly.',
        fr: 'Crée des devises acceptées par la plupart des marchands et des actes sans sceau.',
      },
      b16: {
        en: 'Copies almost any official writ, including specialized wax seals.',
        fr: 'Copie à peu près n’importe quels actes, même munis d’un sceau spécifique.',
      },
      b20: {
        en: 'Infamous master forger with bounties out for destabilizing local economies.',
        fr: 'Maître faussaire recherché pour faux papiers et déstabilisation économique.',
      },
    },
  },
  tec_pick_locks: {
    summary: {
      en: 'Bypassing padlocks, door locks, and strongboxes without their keys.',
      fr: 'Ouvrir cadenas, serrures et coffres sans posséder la clef.',
    },
    benchmarks: {
      b10: {
        en: 'Pops cheap padlocks without difficulty.',
        fr: 'Ouvre des cadenas bon marché sans peine.',
      },
      b13: {
        en: 'Breaks into most homes and picks standard door locks.',
        fr: 'S’introduit dans la plupart des résidences et crochète les serrures simples.',
      },
      b16: {
        en: 'Cracks reinforced safes and strongboxes in moments.',
        fr: 'Ouvre les coffres-forts en un rien de temps.',
      },
      b20: {
        en: 'Picks the most intricate locks and pops basic padlocks at blinding speed with improvised tools.',
        fr: 'Crochète les serrures les plus complexes et force les cadenas basiques avec des outils improvisés.',
      },
    },
  },
  tec_trap_crafting: {
    summary: {
      en: 'Building, concealing, and disarming mechanical traps and snares.',
      fr: 'Création, dissimulation et désarmement de pièges mécaniques.',
    },
    note: {
      en: 'Complex skill (×2). Spot/Evade DC equals your crafting roll; damage traps deal 1d6 per 2 skill ranks.',
      fr: 'Compétence complexe (×2). Le SD de détection/esquive vaut votre jet ; dégâts : 1d6 par tranche de 2 rangs.',
    },
    benchmarks: {
      b10: {
        en: 'Digs and conceals functional spiked pits.',
        fr: 'Sait préparer une fosse garnie de pieux.',
      },
      b13: {
        en: 'Builds restraining snares and more intricate deadfalls.',
        fr: 'Confectionne des nasses immobilisantes et des traquenards plus complexes.',
      },
      b16: {
        en: 'Camouflages traps seamlessly in wilderness terrain.',
        fr: 'Dissimule efficacement ses pièges dans la nature.',
      },
      b20: {
        en: 'Rigs urban tripwires and deadly swinging-blade mechanisms.',
        fr: 'Sait poser fils de détente et armes à balancier en pleine zone urbaine.',
      },
    },
  },

  // ==========================================
  // WILL (VOL)
  // ==========================================
  vol_courage: {
    summary: {
      en: 'Standing firm against fear, intimidation, and terrifying monsters.',
      fr: 'La capacité à résister à la peur, à l’intimidation et aux créatures terrifiantes.',
    },
    benchmarks: {
      b10: {
        en: 'Keeps calm and stands your ground against stubborn tavern bullies.',
        fr: 'Reste calme et tient tête à un client particulièrement têtu à la taverne.',
      },
      b13: {
        en: 'Makes killers flinch with a stare and doesn’t flee on first sighting a monster.',
        fr: 'Votre regard fait plier les tueurs et vous ne fuyez pas dès l’apparition d’un monstre.',
      },
      b16: {
        en: 'Bravest soul in the room; faces enemies even you cannot defeat.',
        fr: 'Passe pour le plus brave de la salle, tenant tête même à des ennemis hors de portée.',
      },
      b20: {
        en: 'Fearless; stands as unyielding as stone before gigantic monsters.',
        fr: 'Rien ne vous effraie ; reste aussi stoïque qu’un roc face à des monstres gigantesques.',
      },
    },
  },
  vol_hex_weaving: {
    summary: {
      en: 'Weaving curses and malefactions upon people or places.',
      fr: 'L’art de maudire des lieux ou des personnes via des envoûtements.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Channels raw malice into simple hexes.',
        fr: 'Concentre la haine pure pour la transformer en malédictions simples.',
      },
      b13: {
        en: 'Black-magic fundamentals extend the duration of your hexes.',
        fr: 'Bases en magie noire permettant de prolonger la durée des malédictions.',
      },
      b16: {
        en: 'Skilled in cursecraft; fuels lethal hexes from your own pain.',
        fr: 'Versé dans les maléfices ; anime des envoûtements mortels en puisant dans sa douleur.',
      },
      b20: {
        en: 'Weaves curses potent enough to rattle hardened Witchers.',
        fr: 'Tisse des malédictions capables de déstabiliser des sorceleurs endurcis.',
      },
    },
  },
  vol_intimidation: {
    summary: {
      en: 'Cowings rivals through presence, threats, or sheer menace to force compliance or flight.',
      fr: 'Effrayer les gens par votre présence ou vos menaces pour les pousser à fuir ou à obéir.',
    },
    benchmarks: {
      b10: {
        en: 'Menacing enough that tavern troublemakers think twice before picking a fight.',
        fr: 'Assez menaçant pour qu’on ne vienne pas vous chercher des noises à la taverne.',
      },
      b13: {
        en: 'Used to terrifying folks; even trained soldiers occasionally yield.',
        fr: 'Habitué à terroriser les gens ; votre technique fonctionne parfois sur des soldats.',
      },
      b16: {
        en: 'Radiates cruelty; hardened veterans instinctively step out of your path.',
        fr: 'Sentez la cruauté à plein nez ; même des vétérans s’écartent à votre approche.',
      },
      b20: {
        en: 'A single cold glare is enough to make targets cave in.',
        fr: 'Il suffit de fusiller votre interlocuteur du regard pour qu’il cède.',
      },
    },
  },
  vol_spell_casting: {
    summary: {
      en: 'Channeling Chaos to cast full spells, Priest invocations, and Witcher Signs.',
      fr: 'Utilisation de la magie sous forme de sorts, d’invocations ou de Signes de sorceleur.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Casts modest spells or Signs, requiring full spoken incantations and precise gestures.',
        fr: 'Lance sorts ou Signes modestes mais exige incantations et gestuelle précise.',
      },
      b13: {
        en: 'Casts with grace; only the most complex spells require formal formulas.',
        fr: 'Utilise sorts et Signes avec élégance ; seuls les plus complexes requièrent une formule.',
      },
      b16: {
        en: 'Experienced mage needing little motion even for high-tier magic.',
        fr: 'Mage expérimenté n’ayant plus besoin de grands gestes pour ses sorts les plus puissants.',
      },
      b20: {
        en: 'Needs only a snap of the fingers to unleash the most intricate spells.',
        fr: 'Il vous suffit de claquer des doigts pour invoquer les sortilèges les plus délicats.',
      },
    },
  },
  vol_resist_magic: {
    summary: {
      en: 'Shrugging off hostile spells, enchantments, and supernatural compulsions.',
      fr: 'Capacité à contrer et rejeter les énergies et emprises magiques hostiles.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Senses incoming magic and occasionally shakes off weak spells.',
        fr: 'Sent les sortilèges lancés contre vous et parvient parfois à s’en défaire.',
      },
      b13: {
        en: 'Fortified mind capable of thwarting modest mages.',
        fr: 'Esprit renforcé capable de déjouer les manœuvres de mages de rang modeste.',
      },
      b16: {
        en: 'Knows mental techniques to shield body and mind from high-ranking sorcerers.',
        fr: 'Prémunit corps et esprit contre l’emprise et les pouvoirs de sorciers de haut rang.',
      },
      b20: {
        en: 'Unyielding; few mages alive possess enough power to bend your soul.',
        fr: 'Inflexible ; rares sont les mages assez puissants pour prendre le contrôle de votre âme.',
      },
    },
  },
  vol_resist_coercion: {
    summary: {
      en: 'Standing immovable against persuasion, seduction, bribes, and interrogation.',
      fr: 'Rester inébranlable face aux tentatives de persuasion, séduction, corruption ou manipulation.',
    },
    benchmarks: {
      b10: {
        en: 'Keeps a cool head when pressured into doing something you dislike.',
        fr: 'Garde la tête froide lorsqu’on vous presse de faire une tâche à contrecœur.',
      },
      b13: {
        en: 'Unmoved by seductive charms or airtight rhetorical arguments.',
        fr: 'Reste de marbre face aux charmes ou aux arguments les plus irréfutables.',
      },
      b16: {
        en: 'Earned a reputation as stubborn as a mule; neither gold nor willpower sways you.',
        fr: 'Tenace comme une « tête de mule » : ni la fortune ni la persuasion ne vous font céder.',
      },
      b20: {
        en: 'Once you make up your mind, nothing on earth can turn you aside.',
        fr: 'Une fois votre décision prise, rien ni personne ne saurait vous en détourner.',
      },
    },
  },
  vol_ritual_crafting: {
    summary: {
      en: 'Preparing and conducting magical rituals—long-form ceremonies, wards, and spirit bindings.',
      fr: 'L’art de préparer et de mener à bien la magie rituelle.',
    },
    note: {
      en: 'Complex skill (×2): costs 2 points per rank.',
      fr: 'Compétence complexe (×2) : coûte 2 points par rang.',
    },
    benchmarks: {
      b10: {
        en: 'Performs basic rituals competently.',
        fr: 'Sait réaliser des rituels simples correctement.',
      },
      b13: {
        en: 'Ritual magic is second nature in your daily practice.',
        fr: 'La magie rituelle fait partie de votre quotidien.',
      },
      b16: {
        en: 'Can conduct a full ritual even under urgent pressure and succeed.',
        fr: 'Peut mener un rituel en situation pressante et atteindre son objectif.',
      },
      b20: {
        en: 'Gifted ritualist able to execute virtually any ritual you study.',
        fr: 'Talentueux ritualiste capable d’accomplir presque tout rituel dont vous prenez connaissance.',
      },
    },
  },
};
