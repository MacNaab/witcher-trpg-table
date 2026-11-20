import type { BilingualTuple, LocalizedText } from "../types";

/**
 * Data pools for Locations & Dungeons tables (Tables 1, 2, 5, 6, 7, 21).
 */

export const T1_INN_ESTABLISHMENTS: readonly BilingualTuple[] = [
  [
    "Hostel",
    "Auberge de jeunesse"
  ],
  [
    "Inn",
    "Auberge"
  ],
  [
    "Tavern",
    "Taverne"
  ],
  [
    "Brothel",
    "Bordel"
  ],
  [
    "Boarding House",
    "Pension de famille"
  ],
  [
    "Casino",
    "Casino"
  ],
  [
    "Hotel",
    "Hôtel"
  ],
  [
    "Guest Room",
    "Chambre d'hôtes"
  ]
];

export const T1_INN_COMFORTS: readonly { tier: LocalizedText; description: LocalizedText }[] = [
  {
    "tier": {
      "en": "Squalid (1 SP)",
      "fr": "Misérable (1 SP)"
    },
    "description": {
      "en": "You’re sleeping on a pile of hay in the stables, and your bathroom is a bucket, but at least you’re out of the rain.",
      "fr": "Vous dormez sur un tas de foin dans les étables, et votre salle de bain est un seau, mais au moins vous êtes à l'abri de la pluie."
    }
  },
  {
    "tier": {
      "en": "Poor (2 SP)",
      "fr": "Pauvre (2 SP)"
    },
    "description": {
      "en": "Just because you can run an inn doesn’t mean that you should. These places always have something about them that makes the experience unpleasant, like overflowing chamber pots or a rat infestation. You do technically have a bed, but you may be sharing it with one or more people.",
      "fr": "Ce n'est pas parce que vous pouvez gérer une auberge que vous devriez. Ces endroits ont toujours quelque chose à leur sujet qui rend l'expérience désagréable, comme des pots de chambre débordants ou une infestation de rats. Vous avez techniquement un lit, mais vous pouvez le partager avec une ou plusieurs personnes."
    }
  },
  {
    "tier": {
      "en": "Modest (5 SP)",
      "fr": "Modeste (5 SP)"
    },
    "description": {
      "en": "The accommodation level for the average village inn. Well-kept, but unfussy. The mattresses are still stuffed with straw, and the blankets are scratchy, but everything is clean, and you don’t have to worry about vermin.",
      "fr": "La qualité de l'herbergement pour cette auberge de village est moyenne. Bien entretenu, mais sans prétention. Les matelas sont encore bourrés de paille et les couvertures sont éraflées, mais tout est propre et vous n'avez pas à vous soucier de la vermine."
    }
  },
  {
    "tier": {
      "en": "Respectable (1 GP)",
      "fr": "Respectable (1 GP)"
    },
    "description": {
      "en": "Once you get into slightly larger towns, you’ll start to find places that cater to the traveling merchant class. There are occasional feather beds, softer pillows, and meals that can be brought to your room. It isn’t exactly fancy, but it’s certainly a step above average.",
      "fr": "Une fois que vous arrivez dans des villes un peu plus grandes, vous commencez à trouver des endroits adaptés à la classe des marchands ambulants. Il y a parfois des lits en plumes, des oreillers plus moelleux et des repas qui peuvent être apportés dans votre chambre. c'est certainement un cran au-dessus de la moyenne."
    }
  },
  {
    "tier": {
      "en": "Comfortable (2 GP)",
      "fr": "Confortable (2 GP)"
    },
    "description": {
      "en": "This is when you get your own private bathroom. These are often the nicest accommodations that you can find in small cities. They can feel a little bit pretentious and stuffy at times, but it doesn’t make the mattresses any less comfortable.",
      "fr": "C'est alors que vous avez votre propre salle de bain privée. Ce sont souvent les plus beaux hébergements que vous pouvez trouver dans les petites villes. Ils peuvent parfois se sentir un peu prétentieux et étouffants, mais cela ne rend pas les matelas moins confortables."
    }
  },
  {
    "tier": {
      "en": "Wealthy (4 GP)",
      "fr": "Riche (4 GP)"
    },
    "description": {
      "en": "The favorite accommodation level of rich merchants and petty aristocrats. It’s roughly equivalent to the level of most boutique luxury hotels. The thread counts are high, everything is stuffed with goose down, and service is always quick. Forget a private bathroom; in places like this, you have your own bath tub.",
      "fr": "Le niveau d'hébergement préféré des riches marchands et des petits aristocrates. Il est à peu près équivalent au niveau de la plupart des hôtels de luxe de charme. Le nombre de fils est élevé, tout est bourré de duvet d'oie et le service est toujours rapide. Oubliez une salle de bain privée; dans des endroits comme celui-ci, vous avez votre propre baignoire."
    }
  },
  {
    "tier": {
      "en": "Lavish (6 GP)",
      "fr": "Somptueux (6 GP)"
    },
    "description": {
      "en": "Equivalent to the presidential suite at a five-star hotel. There are multiple rooms, dedicated serving staff, and as much alcohol as you can drink. This level of accommodation can only be found in large cities, and cater to an elite clientele. If your party isn’t well-dressed, they may not be allowed inside no matter how much money they can wave around.",
      "fr": "Equivalent à la suite présidentielle d'un hôtel cinq étoiles. Il y a plusieurs salles, un personnel de service dévoué et autant d'alcool que vous pouvez en boire. Ce niveau d'hébergement ne peut être trouvé que dans les grandes villes et s'adresse à une clientèle d'élite. Si votre groupe n'est pas bien habillé, il se peut qu'ils ne soient pas autorisés à l'intérieur, peu importe le montant d'argent qu'ils peuvent faire circuler."
    }
  },
  {
    "tier": {
      "en": "Royal (10 GP)",
      "fr": "Royal (10 GP)"
    },
    "description": {
      "en": "Palatial quarters fit for monarchs and archmages: private wings, personal guards, rare vintage cellars, and discreet round-the-clock attendants.",
      "fr": "Appartements dignes de souverains et d’archimages : aile privée, gardes personnels, cave de grands crus et domestiques discrets à toute heure."
    }
  }
];

export const T1_INNKEEPERS: readonly BilingualTuple[] = [
  [
    "Dwarf",
    "Nain"
  ],
  [
    "Human/Half-Elf",
    "Human/Demi-Elf"
  ],
  [
    "Tiefling",
    "Tieflin"
  ],
  [
    "Gnome",
    "Gnome"
  ],
  [
    "Half-Orc",
    "Demi-Orc"
  ],
  [
    "Dragonborn",
    "Dragonborn"
  ],
  [
    "Elf",
    "Elfe"
  ],
  [
    "Halfling",
    "Halflin"
  ]
];

export const T1_INN_PERSONALITIES: readonly BilingualTuple[] = [
  [
    "Old, cranky, and not fond of visitors",
    "Vieux, grincheux et n'aimant pas les visiteurs"
  ],
  [
    "Nervous, as if they’re hiding something",
    "Nerveux, comme s'ils cachaient quelque chose"
  ],
  [
    "Loud and boisterous: the life of every party",
    "Bruyant et agité: la vie de chaque fête"
  ],
  [
    "Obsessed with cleanliness and hates even the sight of mud",
    "Obsédé par la propreté et déteste même la vue de la boue"
  ],
  [
    "Just trying to get to the end of their shift",
    "Essaie juste de finir sa journée de travail"
  ],
  [
    "Always drunk, regardless of the time of day",
    "Toujours ivre, quelle que soit l'heure de la journée"
  ],
  [
    "Knows Common perfectly well, but refuses to speak it",
    "Connaît parfaitement le commun, mais refuse de le parler"
  ],
  [
    "Exceedingly competent and professional",
    "Extrêmement compétent et professionnel"
  ]
];

export const T1_INN_FEATURES: readonly BilingualTuple[] = [
  [
    "A massive portrait of the innkeeper’s father hangs behind the front desk. The eyes follow you wherever you go.",
    "Un portrait massif du père de l'aubergiste est accroché derrière la réception. Les yeux vous suivent partout où vous allez."
  ],
  [
    "There’s an entrance to an underground cavern system hidden in the basement.",
    "Il y a une entrée dans un système de cavernes souterraines caché dans le sous-sol."
  ],
  [
    "There are messages in Thief’s Cant written under some of the beds directing the reader to nearby dead-drops for loot.",
    "Il y a des messages écrits en argot de voleur sous certains des lits qui dirige le lecteur vers des tombes mortes à proximité pour récupérer le butin."
  ],
  [
    "A ghost wanders the halls at night, and occasionally during the day as well.",
    "Un fantôme se promène dans les couloirs la nuit, et parfois aussi pendant la journée."
  ],
  [
    "One of the rooms is always locked. The actual owner is kept tied up inside at all times.",
    "Une des chambres est toujours fermée. Le propriétaire actuel est attaché à l'intérieur."
  ],
  [
    "A local crime boss has made this establishment their base of operations against the wishes of the owner and the staff.",
    "Un patron du crime local a fait de cet établissement leur base d'opérations contre la volonté du propriétaire et du personnel."
  ],
  [
    "There’s a mimic loose somewhere in the establishment, but the owner isn’t quite sure where.",
    "Il y a un mimétisme quelque part dans l'établissement, mais le propriétaire n'est pas tout à fait sûr où."
  ],
  [
    "Meals are disproportionately cheap, but the meat doesn’t taste like anything the party has ever eaten before.",
    "Les repas sont disproportionnellement bon marché, mais la viande n'a pas le même goût de tout ce que le groupe a jamais mangé auparavant."
  ]
];

export const T2_DUNGEON_TRAPS: readonly BilingualTuple[] = [
  [
    "At the top of a set of stairs is a massive 'ogre' made of straw and hay. When the players are coming up the stairs, the enemies light the 'ogre scarecrow' on fire and push it down the stairs towards the players.",
    "Au sommet d'un escalier se trouve un énorme «ogre» fait de paille et de foin. Lorsque les joueurs montent les escaliers, les ennemis allument le feu de l'ogre épouvantail et le poussent dans les escaliers vers les joueurs."
  ],
  [
    "The middle section of a thin stone bridge between dungeon rooms is actually made of a much weaker stone than is perceived. When a player walks across it, it begins to crumble and fall apart.",
    "La section centrale d'un mince pont de pierre entre les salles de donjon est en fait faite d'une pierre beaucoup plus faible qu'on ne le pense. Lorsqu'un joueur le traverse, il commence à s'effriter et à s'effondrer."
  ],
  [
    "Small holes in the floor hide a spear trap underneath. Kobolds have tunneled into the walls, and will stick their spears through the holes towards the players when they get close.",
    "De petits trous dans le sol cachent un piège à lance en dessous. Les Kobolds ont creusé des tunnels dans les murs et enfonceront leurs lances à travers les trous vers les joueurs lorsqu'ils se rapprochent."
  ],
  [
    "A small vial of corrosive acid is sitting above a partially open door. When the door is pushed open, the vial falls on the one opening the door.",
    "Un petit flacon d'acide corrosif se trouve au-dessus d'une porte partiellement ouverte. Lorsque la porte est ouverte, le flacon tombe sur celui qui ouvre la porte."
  ],
  [
    "Every odd-numbered step on a staircase is a pit trap. Two-thirds of the way down the steps, the traps start appearing on even-numbered steps.",
    "Chaque marche impaire d'un escalier est un piège à fosse. Aux deux tiers de la descente des marches, les pièges commencent à apparaître sur des marches paires."
  ],
  [
    "A pit trap is covered by an illusion of the floor.",
    "Un piège à fosse est recouvert par une illusion du sol."
  ],
  [
    "One of the floor tiles has a spring underneath it which will launch the victim into the ceiling when activated.",
    "L'un des carreaux de sol a un ressort en dessous qui lancera la victime dans le plafond lorsqu'il sera activé."
  ],
  [
    "A maze full of mirrors, a few of them magical which contain doppelgangers of the PCs and will proceed to hunt them.",
    "Un labyrinthe plein de miroirs, certains d'entre eux magiques qui contiennent des sosies des PJ et se mettront à les chasser."
  ],
  [
    "A trap that causes a bee's nest to fall onto or next to the victim.",
    "Un piège qui fait tomber un nid d'abeille sur ou à côté de la victime."
  ],
  [
    "Stepping on a pressure plate causes several concealed nozzles to spray acid at the victim.",
    "Si vous marchez sur une plaque de pression, plusieurs buses dissimulées pulvérisent de l'acide sur la victime."
  ],
  [
    "Opening a door or chest pulls a string that pulls the trigger on crossbow. The crossbow bolt may or may not be poisoned.",
    "L'ouverture d'une porte ou d'un coffre tire une ficelle qui appuie sur la détente de l'arbalète. Le boulon d'arbalète peut ou non être empoisonné."
  ],
  [
    "When the trap is triggered, portcullis drop down blocking the doors. Then the walls slowly move together or the ceiling slowly lowers.",
    "Lorsque le piège est déclenché, la herse descend bloquant les portes. Ensuite, les murs se déplacent lentement ensemble ou le plafond s'abaisse lentement."
  ],
  [
    "Deadfall Trap - When the trap is triggered, a heavy object falls onto the target area.",
    "Deadfall Trap - Lorsque le piège est déclenché, un objet lourd tombe sur la zone cible."
  ],
  [
    "Deadly Ramp - A pressure plate on the stairs, causes the tread of the stairs to turn into a ramp. A pit opens at the bottom of the stairs.",
    "Rampe mortelle - Une plaque de pression sur les escaliers fait que la bande de roulement des escaliers se transforme en rampe. Une fosse s'ouvre au bas de l'escalier."
  ],
  [
    "Flood Gate - When triggered, doors drop down sealing the room. Grates in the ceiling or walls start filling room with water.",
    "Porte d'inondation - Lorsqu'elle est déclenchée, les portes tombent pour sceller la pièce. Les grilles du plafond ou des murs commencent à remplir la pièce d'eau."
  ],
  [
    "A room or section of corridor is filled with gas. Gas has a drug or toxic effect.",
    "Une pièce ou une section de couloir est remplie de gaz. Le gaz a un effet médicamenteux ou toxique."
  ],
  [
    "Invisible spiked portcullis bars a corridor. Victims just walk into it.",
    "Une herse à pointes invisible barre un couloir. Les victimes y entrent simplement."
  ],
  [
    "A net is draped across the floor and concealed by detritus. A tripwire causes a heavy counterweight to drop, lifting the net and anyone caught in it.",
    "Un filet est drapé sur le sol et dissimulé par des détritus. Un fil de déclenchement fait tomber un contrepoids lourd, soulevant le filet et toute personne prise dedans."
  ],
  [
    "Pendulum Weapon - (axes, blades, hammers, spiked weight) swing back and forth across a corridor.",
    "Arme pendulaire - (haches, lames, marteaux, poids à pointes) se balancent d'avant en arrière à travers un couloir."
  ],
  [
    "Open Pit Trap - a pit blocks a corridor. The pit may be filled with (acid, boiling oil, boiling water, burning oil, flammable oil, heavier than air gas, lava, liquid metal, poison, poison gas, quicksand, spikes, tar, water)",
    "Open Pit Trap - une fosse bloque un couloir. La fosse peut être remplie de (acide, huile bouillante, eau bouillante, huile en feu, huile inflammable, gaz plus lourd que l'air, lave, métal liquide, poison, gaz toxique, sables mouvants, pointes, goudron, eau)"
  ],
  [
    "Pivot Bridge / Walkway - Stepping on the walkway causes it to pivot, dumping victims off the walkway.",
    "Pont pivotant / passerelle - Marcher sur la passerelle la fait pivoter, déchargeant les victimes de la passerelle."
  ],
  [
    "A chest, placed in the center of the room, is covered with a deadly contact poison.",
    "Un coffre, placé au centre de la pièce, est recouvert d'un poison de contact mortel."
  ],
  [
    "Rolling Boulder - A large boulder is place at the top on an inclined corridor. When triggered the boulder rolls down the corridor crushing anything in its path.",
    "Rolling Boulder - Un gros rocher est placé au sommet d'un couloir incliné. Lorsqu'il est déclenché, le rocher roule dans le couloir, écrasant tout ce qui se trouve sur son passage."
  ],
  [
    "Rolling Logs - logs stacked at the top of an incline, held in place by a pin. Logs roll down hill if triggered.",
    "Bûches à rouler - bûches empilées au sommet d'une pente, maintenues en place par une épingle. Les grumes descendent la colline si elles sont déclenchées."
  ],
  [
    "A narrow hallway coated in grease. When the trap is set, the hallway is lit on fire.",
    "Un couloir étroit enduit de graisse. Lorsque le piège est installé, le couloir est allumé en feu."
  ],
  [
    "Corridor filled with murky water. The good news is that the water is only about chest deep. The bad news is that there are a half dozen bear traps chained to the floor. Watch your step!",
    "Couloir rempli d'eau trouble. La bonne nouvelle est que l'eau n'est qu'à la hauteur de la poitrine. La mauvaise nouvelle est qu'il y a une demi-douzaine de pièges à ours enchaînés au sol. Attention a la marche!"
  ],
  [
    "Ceramic jugs filled with alchemical fire, tied to thin ropes triggered to drop.",
    "Des cruches en céramique remplies de feu alchimique, attachées à de fines cordes déclenchées pour tomber."
  ],
  [
    "Tread trap that is set-up for a particular creature type and size. Comprises a small trapdoor, with angled spikes on the interior portions, that is placed over a 2-3 ft deep pit. The doors to the trap open easily when sufficient weight is applied but close tightly against the victims leg. The spikes, angled inward, dig into the sides of the victims leg as they attempt to pull their leg out, which also forces the door to remain closed.",
    "Piège à bande de roulement configuré pour un type et une taille de créature particuliers. Comprend une petite trappe, avec des pointes inclinées sur les parties intérieures, qui est placée sur une fosse de 2 à 3 pieds de profondeur. Les portes du piège s'ouvrent facilement lorsqu'un poids suffisant est appliqué mais se ferment fermement contre la jambe de la victime. Les pointes, inclinées vers l'intérieur, s'enfoncent dans les côtés de la jambe des victimes alors qu'elles tentent de retirer leur jambe, ce qui oblige également la porte à rester fermée."
  ],
  [
    "Seesaw bridge or corridor that will dump passersby into pits or down a long fall. The party will have to be quick of foot or crafty to balance the seesaw.",
    "Pont à bascule ou couloir qui jettera les passants dans des fosses ou dans une longue chute. Le groupe devra être rapide ou astucieux pour équilibrer la bascule."
  ],
  [
    "A treasure or other object that replicates itself to fill the available space in the room. Anything trapped in the area will become crush and will eventually suffocate.",
    "Un trésor ou un autre objet qui se réplique pour remplir l'espace disponible dans la pièce. Tout ce qui est piégé dans la zone deviendra écrasé et finira par suffoquer."
  ],
  [
    "A thin hallway/crawlspace is blocked by a series of supports. Close inspection shows many of them to be immovable rods. Deactivation or destruction of the rods will cause the ceiling to collapse onto the entire hallway.",
    "Un couloir / vide sanitaire mince est bloqué par une série de supports. Une inspection minutieuse montre que bon nombre d'entre eux sont des tiges immobiles. La désactivation ou la destruction des tiges entraînera l'effondrement du plafond sur tout le couloir."
  ],
  [
    "A mine cart sits at the ready with multiple levers setting its path. The wrong combination will lead to the cart flying off a cliff, crashing into a wall, sent to the den of dangerous beasts, etc.",
    "Un chariot de mine est prêt avec plusieurs leviers définissant son chemin. La mauvaise combinaison conduira le chariot à voler d'une falaise, à s'écraser contre un mur, à être envoyé dans l'antre de bêtes dangereuses, etc."
  ],
  [
    "A mechanism begins to spin the circular room faster and faster. At first it's just disorienting but it gradually builds until any items and creatures are firmly pressed against the wall (think saucer carnival rides). Some versions of this trap release objects like caltrops, stones, etc. When they reach high speeds to tumble pierce, and smash any within. Other versions just increase the speeds until the point where most creature will go unconcious or even die.",
    "Un mécanisme commence à faire tourner la pièce circulaire de plus en plus vite. Au début, c'est juste désorientant, mais cela se construit progressivement jusqu'à ce que tous les objets et créatures soient fermement pressés contre le mur (pensez aux manèges de carnaval de soucoupes). Certaines versions de ce piège libèrent des objets comme des caltrops, des pierres, etc. Lorsqu'ils atteignent des vitesses élevées, ils peuvent percer et écraser tout ce qu'il contient. D'autres versions augmentent simplement les vitesses jusqu'au point où la plupart des créatures perdront conscience ou même mourront."
  ]
];

export const T5_DUNGEON_ENTRANCES: readonly BilingualTuple[] = [
  [
    "Trapped with fire",
    "Pris au piège du feu"
  ],
  [
    "Trapped with poison",
    "Piégé de poison"
  ],
  [
    "Trapped with acid",
    "Piégé avec de l'acide"
  ],
  [
    "Must ascend vertically to enter",
    "Doit monter verticalement pour entrer"
  ],
  [
    "Guarded by a beast",
    "Gardé par une bête"
  ],
  [
    "Guarded by an abberation",
    "Gardé par une abberation"
  ],
  [
    "Must descend vertically to enter",
    "Doit descendre verticalement pour entrer"
  ],
  [
    "Guarded by fey",
    "Gardé par fey"
  ],
  [
    "Guarded by golems",
    "Gardé par des golems"
  ],
  [
    "Trapped with cold",
    "Pris au piège du froid"
  ],
  [
    "Trapped with lightning",
    "Pris au piège de la foudre"
  ],
  [
    "Trapped with force",
    "Pris au piège avec force"
  ]
];
export const T5_DUNGEON_TRAPS: readonly BilingualTuple[] = [
  [
    "Confining",
    "Confiner"
  ],
  [
    "Delaying",
    "Dilatoire"
  ],
  [
    "Damage",
    "Dommage"
  ],
  [
    "Alarm",
    "Alarme"
  ]
];
export const T5_DUNGEON_CORRIDORS: readonly BilingualTuple[] = [
  [
    "Hazardous terrain",
    "Terrain dangereux"
  ],
  [
    "Extreme temperature",
    "Température extrême"
  ],
  [
    "Decorated",
    "Décoré"
  ],
  [
    "Destroyed",
    "Détruit"
  ],
  [
    "Up/Down",
    "Haut / Bas"
  ],
  [
    "Spellwracked",
    "Sort détruit"
  ]
];
export const T5_DUNGEON_OBSTACLES: readonly BilingualTuple[] = [
  [
    "Magic Item",
    "Objet magique"
  ],
  [
    "Mirrors",
    "Miroirs"
  ],
  [
    "Puzzle",
    "Puzzle"
  ],
  [
    "Fountain",
    "Fontaine"
  ],
  [
    "Riddle",
    "énigme"
  ],
  [
    "Mural",
    "Mural"
  ],
  [
    "Puzzle",
    "Puzzle"
  ],
  [
    "Alien/Strange",
    "Alien / étrange"
  ],
  [
    "Riddle",
    "énigme"
  ],
  [
    "Magic Weapon",
    "Arme magique"
  ]
];
export const T5_DUNGEON_GOALS: readonly BilingualTuple[] = [
  [
    "Defeat the Avatar",
    "Vaincre l'avatar"
  ],
  [
    "End the curse",
    "Mettre fin à la malédiction"
  ],
  [
    "Disrupt the spell",
    "Perturber le sort"
  ],
  [
    "Destroy the magic item",
    "Détruisez l'objet magique"
  ],
  [
    "Drink the liquid",
    "Boire le liquide"
  ],
  [
    "Use the item",
    "Utilisez l'article"
  ],
  [
    "Disrupt the ritual",
    "Perturber le rituel"
  ],
  [
    "Read the book and cast the spell",
    "Lisez le livre et lancez le sort"
  ],
  [
    "Slay the leader",
    "Tuer le chef"
  ],
  [
    "Close the portal",
    "Fermer le portail"
  ],
  [
    "Slay the summoned",
    "Tuer les invoqués"
  ],
  [
    "Slay the leader",
    "Tuer le chef"
  ],
  [
    "Destroy the area",
    "Détruisez la zone"
  ],
  [
    "Free the prisoner(s)",
    "Libérez le (s) prisonnier (s)"
  ],
  [
    "Steal the treasure",
    "Voler le trésor"
  ],
  [
    "Capture the creature",
    "Capturez la créature"
  ],
  [
    "Escape the area",
    "Échapper à la région"
  ],
  [
    "Talk to the Hidden One(s)",
    "Parlez aux cachés"
  ],
  [
    "Start/Stop the countdown",
    "Démarrer / arrêter le compte à rebours"
  ],
  [
    "Destroy the artefact",
    "Détruire l'artefact"
  ]
];

export const T6_SWAMP_HAZARDS: readonly BilingualTuple[] = [
  [
    "Quicksand",
    "Sables mouvants"
  ],
  [
    "Leeches/Stinging Insect Swarms",
    "Sangsues / Essaims d'insectes piqueurs"
  ],
  [
    "Poisonous Food/Poisoned Water",
    "Aliments toxiques / eau empoisonnée"
  ],
  [
    "Underwater Potholes (can fall into and drown)",
    "Nids de poule sous l'eau (peuvent tomber et se noyer)"
  ],
  [
    "Sticky Deep Mud",
    "Boue profonde collante"
  ],
  [
    "Poisonous Brambles",
    "Ronces vénéneuses"
  ]
];
export const T6_SWAMP_TREASURES: readonly BilingualTuple[] = [
  [
    "Ring of Water Walking (6 charges)",
    "Anneau de marche sur l'eau (6 charges)"
  ],
  [
    "Wand of Fog Cloud (10 charges)",
    "Baguette de nuage de brouillard (10 charges)"
  ],
  [
    "Cloak of Elvenkind",
    "Cape d'Elvenkind"
  ],
  [
    "Ring of the Swamp: Call 1 Shambling Mound per month to assist the owner",
    "Ring of the Swamp: appelez 1 Shambling Mound par mois pour aider le propriétaire"
  ],
  [
    "Hunter's Garb: +2 to stealth checks when remaining still",
    "Habit de chasseur: +2 aux tests de furtivité en restant immobile"
  ],
  [
    "Hunter's Bow: +1 dmg",
    "Arc du chasseur: +1 dmg"
  ],
  [
    "Boots of Tracking: Can change the bootprints to any common animal's prints, or revert to normal bootprints",
    "Boots of Tracking: peut changer les empreintes de démarrage en empreintes d'animaux courants ou revenir aux empreintes de démarrage normales"
  ],
  [
    "Folding Canoe",
    "Canoë pliant"
  ]
];
export const T6_SWAMP_PLOTHOOKS: readonly BilingualTuple[] = [
  [
    "Wounded NPC says they were attacked by X and their child was taken. They offer a meagre reward.",
    "Un PNJ blessé dit qu'ils ont été attaqués par X et que leur enfant a été enlevé. Ils offrent une maigre récompense."
  ],
  [
    "The party stumbles across a religious ceremony. Slaves are being sacrificed. This is a regular occurence.",
    "Le parti trébuche sur une cérémonie religieuse. Des esclaves sont sacrifiés. C'est une occurrence régulière."
  ],
  [
    "Two groups of two different monster types are waging a noisy battle. One side is losing.",
    "Deux groupes de deux types de monstres différents mènent une bataille bruyante. Un côté perd."
  ],
  [
    "A Ranger NPC is fighting a large creature and needs help. A wounded NPC lies face down next to the Ranger.",
    "Un PNJ Ranger combat une grande créature et a besoin d'aide. Un PNJ blessé se trouve face cachée à côté du Ranger."
  ],
  [
    "A creature has escaped imprisonment from a nearby location. Its jailer is hunting for it.",
    "Une créature a échappé à l'emprisonnement depuis un endroit proche. Son geôlier le cherche."
  ],
  [
    "A huge group of creatures have gathered to mate. Their senses are heightened and will attack en masse if party is detected.",
    "Un énorme groupe de créatures s'est réuni pour s'accoupler. Leurs sens sont renforcés et attaqueront en masse si une fête est détectée."
  ],
  [
    "A sleeping Dragon is found and cannot be woken. It cannot be harmed. It is stuck in time. A nearby dropped notebook gives some clues to the mystery.",
    "Un dragon endormi est trouvé et ne peut pas être réveillé. Il ne peut pas être blessé. Il est coincé dans le temps. Un cahier déposé à proximité donne quelques indices sur le mystère."
  ],
  [
    "A group of adventurers, battling a vault guardian, flees into the swamp and is cut down to a man (or woman). The guardian is severely wounded and the treasure, vast.",
    "Un groupe d'aventuriers, combattant un gardien de la voûte, s'enfuit dans le marais et est réduit à un homme (ou une femme). Le gardien est gravement blessé et le trésor, vaste."
  ],
  [
    "A child's toy boat drifts past. Aboard are the skeletons of rats, posed as if manning the vessel.",
    "Le bateau-jouet d'un enfant dérive. A bord se trouvent les squelettes de rats, posés comme s'ils tenaient le vaisseau."
  ],
  [
    "A woman screams and a group of men laugh. They are nearby. The voices are lies. It is one NPC, lying in wait.",
    "Une femme hurle et un groupe d'hommes rit. Ils sont à proximité. Les voix sont des mensonges. C'est un PNJ qui attend."
  ]
];
export const T6_SWAMP_NPCS: readonly BilingualTuple[] = [
  [
    "Elkhart Repp - Peat Farmer. Proud. Whistles a lot. Has a secret.",
    "Elkhart Repp - Peat Farmer. Fier. Siffle beaucoup. A un secret."
  ],
  [
    "Shane Twillin - Peat Farmer. Insensitive. Absent-minded. Was once a rich merchant.",
    "Shane Twillin - agriculteur de tourbe. Insensible. Distrait. Était autrefois un riche marchand."
  ],
  [
    "Cullock Upwey - Druid. Exacting. Harsh. Obsesses over poison and venoms.",
    "Cullock Upwey - Druide. Exigeant. Dur. Obsède par le poison et les venins."
  ],
  [
    "Seersucker Bwin - Druid. Compulsive. Honest. Doesn't sleep well.",
    "Seersucker Bwin - Druide. Compulsif. Honnête. Ne dort pas bien."
  ],
  [
    "Eshee Vomp - Ranger. Morose. Hard-hearted. Has lost his faith.",
    "Eshee Vomp - Ranger. Morose. Au cœur dur. A perdu sa foi."
  ],
  [
    "Buck Weathers - Ranger. Practical. Inquisitive. Enslaved by vice.",
    "Buck Weathers - Ranger. Pratique. Curieux. Asservi par le vice."
  ],
  [
    "Yish Gdalt - Bandit Leader. Haughty. Narrow-minded. Fears fire.",
    "Yish Gdalt - Chef de bandit. Hautain. Étroit d'esprit. Peur du feu."
  ],
  [
    "Qulu Moab - Monk. Punctual. Ponderous. Refuses to eat or drink.",
    "Qulu Moab - Moine. Ponctuel. Lourd. Refuse de manger ou de boire."
  ],
  [
    "Gizzy Crump - Fisherman. Pessimistic. Boorish. Killed his last 3 wives when drunk.",
    "Gizzy Crump - Pêcheur. Pessimiste. Rustre. Tué ses 3 dernières femmes en état d'ébriété."
  ],
  [
    "Bodak Gloombarrow - Hunter. Friendly. Trusting. Often takes in strays.",
    "Bodak Gloombarrow - Chasseur. Amical. Confiant. Accepte souvent les animaux errants."
  ],
  [
    "Ubbe Lothbrok - Charcoal Maker. Suspicious. Aloof. Is a glutton.",
    "Ubbe Lothbrok - Fabricant de charbon de bois. Méfiant. Distant. Est un glouton."
  ],
  [
    "Weshiya Trevalt - Witch/Herbalist. Opinionated. Kind-hearted. Doesn't like animals.",
    "Weshiya Trevalt - sorcière / herboriste. Dogmatique. Bienveillant. N'aime pas les animaux."
  ]
];
export const T6_SWAMP_LOCATIONS: readonly BilingualTuple[] = [
  [
    "Temple/Abandoned Temple",
    "Temple / Temple abandonné"
  ],
  [
    "Peat Farmer's Homestead",
    "Propriété du fermier de tourbe"
  ],
  [
    "Hunter's Cabin",
    "Cabane du chasseur"
  ],
  [
    "Herbalist's Cabin",
    "Cabane d'herboriste"
  ],
  [
    "Standing Stones",
    "Pierres debout"
  ],
  [
    "Tower/Ruined Tower",
    "Tour / Tour en ruine"
  ],
  [
    "Fort/Abandoned Fort",
    "Fort / Fort abandonné"
  ],
  [
    "Haunted House",
    "Maison hantée"
  ],
  [
    "Fisherman's Cabin",
    "Cabane du pêcheur"
  ],
  [
    "Charcoal Maker's Cabin",
    "Cabane du fabricant de charbon"
  ],
  [
    "Carved Tor",
    "Tor sculpté"
  ],
  [
    "Sailing Ship, half-sunken",
    "Voilier, à moitié coulé"
  ],
  [
    "Giant Creature's Skeleton",
    "Squelette de créature géante"
  ],
  [
    "Planar Portal (Choose a gate type)",
    "Portail planaire (choisissez un type de porte)"
  ],
  [
    "Slaver's Compound",
    "Composé de l'esclavage"
  ],
  [
    "Bandit/Rebel's Hideout",
    "Repaire de bandits / rebelles"
  ],
  [
    "Large Tar Pits",
    "Grands fosses à goudron"
  ],
  [
    "Animal Graveyard",
    "Cimetière des animaux"
  ],
  [
    "Monk's Home",
    "Maison de moine"
  ],
  [
    "Barbarian Outcast's Home",
    "La maison du paria barbare"
  ]
];

export const T7_FOREST_HAZARDS: readonly BilingualTuple[] = [
  [
    "Razorvine",
    "Razorvine"
  ],
  [
    "Animal Trap",
    "Piège à animaux"
  ],
  [
    "Sinkhole",
    "Gouffre"
  ],
  [
    "Poison Ivy",
    "Sumac vénéneux"
  ],
  [
    "Mosquito Swarm",
    "Essaim de moustiques"
  ],
  [
    "Diseased Waterhole",
    "Trou d'eau malade"
  ]
];
export const T7_FOREST_TREASURES: readonly BilingualTuple[] = [
  [
    "Cloak of Elvenkind",
    "Cape d'Elvenkind"
  ],
  [
    "Boots of False Tracks",
    "Bottes des fausses pistes"
  ],
  [
    "Driftglobe",
    "Driftglobe"
  ],
  [
    "10, +1 Arrows",
    "10, +1 flèches"
  ],
  [
    "Staff of Birdcalls",
    "Bâton des cris d'oiseaux"
  ],
  [
    "Everbright Lantern",
    "Lanterne Everbright"
  ],
  [
    "Mithral Armor",
    "Armure mithrale"
  ],
  [
    "Wind Fan",
    "Ventilateur"
  ]
];
export const T7_FOREST_PLOTHOOKS: readonly BilingualTuple[] = [
  [
    "A lost child is crying alone in a clearing. They have no memory of who they are or how they got there.",
    "Un enfant perdu pleure seul dans une clairière. Ils n'ont aucun souvenir de qui ils sont ou comment ils y sont arrivés."
  ],
  [
    "The group stumbles upon a witch coven performing a ceremony to desecrate the ground in the area.",
    "Le groupe tombe sur un coven de sorcières qui organise une cérémonie pour profaner le sol de la région."
  ],
  [
    "A goblin has been separated from its clan. In reality it was abandoned after it started to develop a conscience.",
    "Un gobelin a été séparé de son clan. En réalité, il a été abandonné après avoir commencé à développer une conscience."
  ],
  [
    "A large patch of razorvine has mysteriously grown over the path. The party quickly notices that it is still growing at a rapid pace.",
    "Une grande parcelle de rasoir a mystérieusement poussé sur le chemin. Le parti s'aperçoit rapidement qu'il continue de croître à un rythme rapide."
  ],
  [
    "A pack of wolves has adopted a humanoid child. They aren’t aggressive but refuse to allow anyone to get close to it.",
    "Une meute de loups a adopté un enfant humanoïde. Ils ne sont pas agressifs mais refusent de permettre à quiconque de s'en approcher."
  ],
  [
    "A cart has crashed off an old path. There are no signs of any people or goods from the cart. The horse is tied up nearby.",
    "Un chariot s'est écrasé sur un ancien chemin. Il n'y a aucun signe de personne ou de marchandise dans le chariot. Le cheval est ligoté à proximité."
  ],
  [
    "A storm washed away the bones from an unmarked grave near an oak tree. The bones appear to be children of various races.",
    "Une tempête a emporté les os d'une tombe anonyme près d'un chêne. Les os semblent être des enfants de différentes races."
  ],
  [
    "A young Kenku is being attacked by a group of local monsters. It is too young to have formed a wide dialog and can only repeat what it hears.",
    "Un jeune Kenku est attaqué par un groupe de monstres locaux. Il est trop jeune pour avoir formé un large dialogue et ne peut que répéter ce qu'il entend."
  ],
  [
    "A group of wild worgs are being wrangled by some goblins attempting to tame them. The worgs are vastly outnumbered.",
    "Un groupe de worgs sauvages est combattu par des gobelins qui tentent de les apprivoiser. Les worgs sont largement en infériorité numérique."
  ],
  [
    "Several half-orcs are being lead through the woods by a small group of humans. The humans are slavers with a severe bias against orckind.",
    "Plusieurs demi-orques sont conduits à travers les bois par un petit groupe d'humains. Les humains sont des esclavagistes avec un biais sévère contre les orckinds."
  ]
];
export const T7_FOREST_NPCS: readonly BilingualTuple[] = [
  [
    "Caramip Goodearth, F, Gnome - Expert carpenter, Uses colorful oaths and exclamations",
    "Caramip Goodearth, F, Gnome - Charpentier expert, utilise des serments et des exclamations colorés"
  ],
  [
    "Hadarai Othronus, M, Elf - Hunter, Quiet",
    "Hadarai Othronus, M, Elfe - Chasseur, Calme"
  ],
  [
    "Myria Glenfellow, F, Halfling - Poacher, Bites fingernails",
    "Myria Glenfellow, F, Halfling - Braconnier, se mord les ongles"
  ],
  [
    "Tana Tealeaf, F, Gnome - Druid, Uses flowery speech",
    "Tana Tealeaf, F, Gnome - Druid, utilise un discours fleuri"
  ],
  [
    "Avice Rothwell, F, Human - Ranger, Paces",
    "Avice Rothwell, F, Humain - Ranger, Paces"
  ],
  [
    "Astaro Poetry, M, Tiefling - Logger, Speaks in rhyme",
    "Astaro Poetry, M, Tiefling - Logger, Parle en rime"
  ],
  [
    "Birgit O’Higgens, F, Human - Traveling merchant, Rude",
    "Birgit O’Higgens, F, Humaine - Marchande itinérante, Rude"
  ],
  [
    "Sabastian Flores, M, Human - Local herbalist, Honest",
    "Sabastian Flores, M, Humain - Herboriste local, Honnête"
  ],
  [
    "Aramil Freddrick, M, Half-Elf - Adventurer, Irritable",
    "Aramil Freddrick, M, demi-elfe - Aventurier, irritable"
  ],
  [
    "Kettlewhistle, F, Half-Orc - Outlander, Abandoned tribe",
    "Kettlewhistle, F, Half-Orc - Outlander, tribu abandonnée"
  ],
  [
    "Thodris Frostbeard, F, Dwarf - Miner, Makes constant puns",
    "Thodris Frostbeard, F, Dwarf - Miner, fait des jeux de mots constants"
  ],
  [
    "Haruki Othronus, M, Half-Elf - Monk, Frequently uses the wrong word",
    "Haruki Othronus, M, demi-elfe - Moine, utilise fréquemment le mauvais mot"
  ]
];
export const T7_FOREST_LOCATIONS: readonly BilingualTuple[] = [
  [
    "Abondoned Mine",
    "Mine abandonnée"
  ],
  [
    "Hag’s Hut",
    "Hag’s Hut"
  ],
  [
    "Guard Outpost",
    "Avant-poste de garde"
  ],
  [
    "Hunter’s Cabin",
    "Cabane du chasseur"
  ],
  [
    "Treehouse",
    "Cabane dans les arbres"
  ],
  [
    "Moonshine Distillery",
    "Distillerie Moonshine"
  ],
  [
    "Ancient Temple",
    "Temple antique"
  ],
  [
    "Decrepit Graveyard",
    "Cimetière décrépit"
  ],
  [
    "Woodcutter’s Homestead",
    "Propriété du bûcheron"
  ],
  [
    "Goblin Camp",
    "Camp des gobelins"
  ],
  [
    "Noble’s Estate",
    "Domaine Noble"
  ],
  [
    "Bandit Hideout",
    "Repaire des bandits"
  ],
  [
    "Army Fort",
    "Fort de l'armée"
  ],
  [
    "Soveign’s Summer Home",
    "Résidence d'été de Soveign"
  ],
  [
    "Sacred Totem",
    "Totem sacré"
  ],
  [
    "Planar Portal",
    "Portail planaire"
  ],
  [
    "Barbarian Clan Settlement",
    "Règlement de clan barbare"
  ],
  [
    "Farmstead",
    "Ferme"
  ],
  [
    "Unicorn Lair",
    "Repaire de licorne"
  ],
  [
    "Dryad Grotto",
    "Grotte de la Dryade"
  ]
];

export const T21_UNIQUE_DUNGEONS: readonly BilingualTuple[] = [
  [
    "A space with dozens of small planets where if you change your perception of what up and down is you can control how you move between them. Objective is in the center of the room. Walls all lined with spikes. Different enemies on different planets.",
    "Un espace avec des dizaines de petites planètes où, si vous changez votre perception de ce qui est de haut en bas, vous pouvez contrôler la façon dont vous vous déplacez entre elles. L'objectif est au centre de la pièce. Les murs sont tous bordés de pointes. Différents ennemis sur différentes planètes."
  ],
  [
    "Room filled with paintings and an empty coffin. The inscription reads “return me to my rest, to pass this little test”. The paintings are sub dimensions that contain the bones, each with a different challenge.",
    "Salle remplie de peintures et d'un cercueil vide. L'inscription dit «ramène-moi à mon repos, pour passer ce petit test». Les peintures sont des sous-dimensions qui contiennent les os, chacune avec un défi différent."
  ],
  [
    "A cavern filled with intertidal pools linked by special magic. Swimming to the bottom brings you out the top of another. The pools are full of materials and enemies. The pools are in clusters on little plateaus, with terribly powerful wind coming up from the seemingly bottomless pit from which they rise.",
    "Une caverne remplie de piscines intertidales reliées par une magie spéciale. Nager vers le bas vous fait ressortir par-dessus l'autre. Les piscines sont pleines de matériaux et d'ennemis. Les piscines sont en grappes sur de petits plateaux, avec un vent terriblement puissant venant de la fosse apparemment sans fond d'où elles s'élèvent."
  ],
  [
    "Standard labyrinth full of scary beasties. But all the walls are mirrors. Mirror labyrinth definitely worse than the original.",
    "Labyrinthe standard plein de bêtes effrayantes. Mais tous les murs sont des miroirs. Miroir labyrinthe définitivement pire que l'original."
  ],
  [
    "Small floating island with heavy gravity. Upon entering the dungeon players are falling in orbit around the island. Many flying and floating creatures/objects.",
    "Petite île flottante à forte gravité. En entrant dans le donjon, les joueurs tombent en orbite autour de l'île. De nombreuses créatures / objets volants et flottants."
  ],
  [
    "Trap heavy crypt. Full of undead.... fey?! Zombie fairies haunt my nightmares.",
    "Piège une crypte lourde. Plein de morts-vivants ... fey?! Les fées zombies hantent mes cauchemars."
  ],
  [
    "Poison swamp. An obelisk in the center specifies tasks and their point values and rewards.",
    "Marais de poison. Un obélisque au centre spécifie les tâches, leurs valeurs en points et leurs récompenses."
  ],
  [
    "A seemingly endless sea, with ruins to explore below. Actually a prison for an ancient monster, that some asshat pirate decided was a good place to hide treasure.",
    "Une mer apparemment sans fin, avec des ruines à explorer ci-dessous. En fait, une prison pour un ancien monstre, que certains asshateurs ont décidé que c'était un bon endroit pour cacher un trésor."
  ],
  [
    "A tower, with special magic. Each of the 5 floors is large, with its own boss and loot. This dungeon is special, and has a return (save progress) runestone.",
    "Une tour, avec une magie spéciale. Chacun des 5 étages est grand, avec son propre boss et son propre butin. Ce donjon est spécial et possède une pierre runique de retour (sauvegarde de la progression)."
  ],
  [
    "A hive of various monstrous bugs that infested an ancient castle, find and kill the queen to find the key to the door that has the treasure.",
    "Une ruche de divers insectes monstrueux qui infestaient un ancien château, trouvez et tuez la reine pour trouver la clé de la porte qui a le trésor."
  ],
  [
    "The illusion dungeon. Walls, floor/ground, doors, living things, even traps. What’s real and what’s not? Be wary.",
    "Le donjon d'illusion. Murs, sol / sol, portes, êtres vivants, voire pièges. Qu'est-ce qui est réel et qu'est-ce qui ne l'est pas? Se méfier."
  ],
  [
    "An undead battlefield still at war. Neither side sees you as a friend. Though maybe reinforcements, with an adjustment or two... like death.",
    "Un champ de bataille mort-vivant toujours en guerre. Aucun des deux camps ne vous considère comme un ami. Mais peut-être des renforts, avec un ajustement ou deux ... comme la mort."
  ],
  [
    "A small calm lake, covered in giant lily pads. There is a small island in the center, but the water itself is full of swarms of carnivorous fish. Who knows what’s on the pads, but it’s definitely safer than swimming.",
    "Un petit lac calme, couvert de nénuphars géants. Il y a une petite île au centre, mais l'eau elle-même est pleine d'essaims de poissons carnivores. Qui sait ce qu’il y a sur les coussinets, mais c’est certainement plus sûr que la natation."
  ],
  [
    "A space of ground surrounded by ocean, but it seems to be on the ocean floor. The water is held back in a circular force field around this area, and sea life can be seen swimming all around. Not all of it looks friendly.",
    "Un espace de terrain entouré par l'océan, mais il semble être au fond de l'océan. L'eau est retenue dans un champ de force circulaire autour de cette zone, et la vie marine peut être vue nager tout autour. Tout cela n'a pas l'air amical."
  ],
  [
    "Just a giant room with a statue of unidentifiable material. Attacking the statue causes it to change colors in levels from the bottom. It vanishes every six seconds (one combat round). A certain amount of damage in one round needed to clear the dungeon.",
    "Juste une pièce géante avec une statue de matériau non identifiable. Attaquer la statue la fait changer de couleur dans les niveaux à partir du bas. Il disparaît toutes les six secondes (un round de combat). Une certaine quantité de dégâts en un tour est nécessaire pour effacer le donjon."
  ],
  [
    "A small island temple. Inside is A seemingly vast and endless desert. Where even is the dungeon?",
    "Un petit temple insulaire. À l'intérieur se trouve un désert apparemment vaste et sans fin. Où est même le donjon?"
  ],
  [
    "The stormlords cloud keep. A keep in a dark cumulonimbus that likes to randomly strike lightning. Who the hell keeps thunder wolves as pets?",
    "Le nuage de Stormlords continue. Un donjon dans un cumulonimbus sombre qui aime frapper la foudre au hasard. Qui diable garde les loups du tonnerre comme animaux de compagnie?"
  ],
  [
    "A palace in the depths of space , surrounded by stars. Dark things lurk in that void, and aberrations abound here.",
    "Un palais dans les profondeurs de l'espace, entouré d'étoiles. Des choses sombres se cachent dans ce vide, et les aberrations abondent ici."
  ],
  [
    "An island floating in the void of space surrounded with stars, a dim purple sun, and a bright light purple moon. A hunting ground for celestial beasts, and everything is on the menu.",
    "Une île flottant dans le vide de l'espace entourée d'étoiles, d'un sombre soleil violet et d'une lune violette claire. Un terrain de chasse aux bêtes célestes, et tout est au menu."
  ],
  [
    "A mansion with little memory orbs that have stored past events. The inscription seems to be asking you to solve his own murder in exchange for his inheritance. Better find a Clue!",
    "Un manoir avec de petites orbes de mémoire qui ont stocké des événements passés. L'inscription semble vous demander de résoudre son propre meurtre en échange de son héritage. Mieux vaut trouver un indice!"
  ],
  [
    "Abandoned lab of an ancient scientist that was studying the elemental planes. Welcome to elemental gang wars.",
    "Laboratoire abandonné d'un ancien scientifique qui étudiait les plans élémentaires. Bienvenue dans les guerres de gangs élémentaires."
  ],
  [
    "A wealthy modern scientist has disappeared, but his secret lab should hold his fortune and research. What was he studying? Slimes. Countless slimes.",
    "Un riche scientifique moderne a disparu, mais son laboratoire secret devrait contenir sa fortune et ses recherches. Qu'étudiait-il? Slimes. D'innombrables slimes."
  ],
  [
    "A temple built into the underside of a floating isle, long forgotten. Many avian creatures roost here now. There’s a glider here, with a snack compartment.",
    "Un temple construit sous une île flottante, oublié depuis longtemps. De nombreuses créatures aviaires dorment ici maintenant. Il y a un planeur ici, avec un compartiment à collations."
  ],
  [
    "Inside a fire Djinn’s lamp lies a palace of flame. I wish I didn’t have to go in there... ha",
    "À l’intérieur d’une lampe de feu Djinn se trouve un palais de flammes. J'aurais aimé ne pas avoir à y aller ... ha"
  ],
  [
    "This is the fabled Golem Kings enchanted mountain. He may be long dead but his dad lonely golems still protect this place.",
    "Il s'agit de la fabuleuse montagne enchantée des Golem Kings. Il est peut-être mort depuis longtemps, mais son père, des golems solitaires, protège toujours cet endroit."
  ],
  [
    "The northern beast tribes had a bad habit of trying to tame monsters much stronger than them. Maybe that’s why all the ice in these frozen caverns is dyed red?",
    "Les tribus des bêtes du nord avaient la mauvaise habitude d'essayer d'apprivoiser des monstres beaucoup plus forts qu'eux. C’est peut-être pourquoi toute la glace de ces cavernes gelées est teinte en rouge?"
  ],
  [
    "The legendary Stormlords cloud keep in a giant cumulonimbus cloud that’s always storming. Bad place to wear metal. Who keeps lightning wolves as pets?",
    "Le légendaire nuage Stormlords se maintient dans un nuage cumulonimbus géant toujours en tempête. Mauvais endroit pour porter du métal. Qui garde les loups éclair comme animaux de compagnie?"
  ],
  [
    "Under the popular temple of the joy in Cheerytown , the corrupted clergy worships something dark and mad in the catacombs. They’re still joyous, while practicing unspeakable acts. Good thing you’re already crazy for treasure right?",
    "Sous le temple populaire de la joie à Cheerytown, le clergé corrompu vénère quelque chose de sombre et de fou dans les catacombes. Ils sont toujours joyeux, tout en pratiquant des actes indescriptibles. Heureusement que vous êtes déjà fou de trésor, non?"
  ],
  [
    "Deep in a swamp kids have been disappearing into a mostly submerged temple. The hidden temple of legends is owned by a giant talking stone head, who seems to be acting as a game show host. All the teams are here now, who will win?",
    "Au fond d'un marais, des enfants ont disparu dans un temple principalement submergé. Le temple caché des légendes appartient à une tête de pierre parlante géante, qui semble jouer le rôle d'animateur de jeu télévisé. Toutes les équipes sont là maintenant, qui va gagner?"
  ],
  [
    "The lost temple of the Monk-ey King. Just... monkeys. Monkeys who fight well. Better find your Zen. Oh and I hope you like climbing.",
    "Le temple perdu du roi Monk-ey. Juste ... des singes. Des singes qui se battent bien. Mieux vaut trouver votre Zen. Oh et j'espère que vous aimez grimper."
  ],
  [
    "The ancients left behind a great pyramid with a massive hourglass in the center. Every 30 seconds the last turn resets, as if it never happened. Every hour inside is a week outside. Did that monster teleport? No it returned to its past... position.",
    "Les anciens ont laissé derrière eux une grande pyramide avec un sablier massif au centre. Toutes les 30 secondes, le dernier tour se réinitialise, comme si cela ne s'était jamais produit. Chaque heure à l'intérieur est une semaine à l'extérieur. Ce monstre s'est-il téléporté? Non, il est revenu à sa position passée."
  ],
  [
    "A great clock tower in ancient dwarf ruins. Fighting on moving gears sucks, why are the clockwork soldiers still here?! But you’ll need to get more of them moving to progress. Let’s just hope there’s not a clockwork dragon in the treasure vault",
    "Une grande tour de l'horloge dans d'anciennes ruines naines. Se battre avec des engrenages en mouvement est nul, pourquoi les soldats d'horlogerie sont-ils toujours là?! Mais vous devrez faire en sorte que davantage d’entre eux progressent. Espérons qu'il n'y a pas de dragon mécanique dans le coffre au trésor"
  ],
  [
    "The ruins of the ancient witch race, destroyed by the gods for defying heaven and earth alike with their powerful sorcery, is built on top of the enormous leaves and branches of the largest tree in the world. Their bitterness has left countless curses behind, but rumor has it they left their treasures and knowledge at the top of the tree...",
    "Les ruines de l'ancienne race de sorcières, détruites par les dieux pour avoir défié le ciel et la terre avec leur puissante sorcellerie, sont construites au sommet des énormes feuilles et branches du plus grand arbre du monde. Leur amertume a laissé d'innombrables malédictions, mais la rumeur veut qu'ils aient laissé leurs trésors et leurs connaissances au sommet de l'arbre ..."
  ],
  [
    "There’s a small island in the stomach of the fleet devouring shark. There are many shipwrecks around, eternally digesting in the acidic sea around it. The island is inhabited by a semi-intelligent race of creatures that live symbiotically within the sharks stomach. Are you friend or food?",
    "Il y a une petite île dans l’estomac de la flotte qui dévore le requin. Il y a de nombreuses épaves autour, qui se digèrent éternellement dans la mer acide qui l'entoure. L'île est habitée par une race semi-intelligente de créatures qui vivent en symbiose dans l'estomac des requins. Êtes-vous ami ou nourriture?"
  ],
  [
    "A shipwreck of the largest boat you’ve ever seen. It must be a mile long, what the heck could even sink something like this?! There’s no way there’s not treasure in this bad boy. And... lobster people?",
    "Un naufrage du plus gros bateau que vous ayez jamais vu. Ça doit faire un mile de long, qu'est-ce que diable pourrait même couler quelque chose comme ça?! Il n'y a aucun moyen qu'il n'y ait pas de trésor dans ce mauvais garçon. Et ... les homards?"
  ],
  [
    "The ancient mystic wizard Balthazar had a special talent. He could imbue things with souls. But who in their right mind would imbue every piece of furniture in their castle with a soul? I guess the rug got tired of being walked all over.",
    "L'ancien sorcier mystique Balthazar avait un talent spécial. Il pouvait imprégner les choses avec des âmes. Mais qui, sain d'esprit, donnerait une âme à chaque meuble de son château? Je suppose que le tapis était fatigué de se faire marcher partout."
  ],
  [
    "Balthazar is at it again. He’s made a Demi plane of sweets, inhabited by sentient fruit people. Unfortunately the chocolate volcano is about to explode, causing the hot fudge death of everything on the plane. The tribes task you with stopping this, in return they’ll take you to their lords secret treasure.",
    "Balthazar est de retour. Il a fait un plan Demi de bonbons, habité par des gens sensibles aux fruits. Malheureusement, le volcan chocolat est sur le point d'exploser, provoquant la mort de tout ce qui se trouve dans l'avion. Les tribus vous demandent d'arrêter cela, en retour, elles vous emmèneront au trésor secret de leurs seigneurs."
  ],
  [
    "Damn it Balthazar! How many places did you create?! Balthazar’s lost library isnt as dangerous as other places he made. Most of the books here are just dying to tell you their story. But how to get into the restricted section? And you should watch out for the librarian, if you don’t want to die.",
    "Merde Balthazar! Combien de lieux avez-vous créés?! La bibliothèque perdue de Balthazar n’est pas aussi dangereuse que les autres endroits qu’il a créés. La plupart des livres ici meurent d'envie de vous raconter leur histoire. Mais comment entrer dans la section restreinte? Et vous devriez faire attention au bibliothécaire, si vous ne voulez pas mourir."
  ],
  [
    "Sigh... Balthazar please stop. In Balthazar’s lost game room, you can play deadly games for prizes. Though the sentient giant chess set doesn’t seem to want you there...",
    "Soupir ... Balthazar s'il vous plaît arrêtez. Dans la salle de jeux perdue de Balthazar, vous pouvez jouer à des jeux mortels pour gagner des prix. Bien que le jeu d'échecs géant sensible ne semble pas vouloir que vous soyez là ..."
  ],
  [
    "Whatever Balthazar. In Balthazar’s lost Garden, the immaculately shaped trees and shrubbery respond exceptionally well to flattery. Especially the triceratops bush. As long as you’re here to enjoy the garden, and not to take anything, you’ll not be harmed in this maze like garden.",
    "Peu importe Balthazar. Dans le jardin perdu de Balthazar, les arbres et les arbustes aux formes impeccables répondent exceptionnellement bien à la flatterie. Surtout le buisson de tricératops. Tant que vous êtes ici pour profiter du jardin, et pour ne rien emporter, vous ne serez pas blessé dans ce labyrinthe comme un jardin."
  ],
  [
    "A large, multi-roomed crystal with crystalized biomes (such as a crystal forest). Inside there are trapped spirits and golemns that wander the halls (You're gonna want to prepare the spell shatter here, folks!).",
    "Un grand cristal à plusieurs pièces avec des biomes cristallisés (comme une forêt de cristaux). À l'intérieur, il y a des esprits et des golemns piégés qui errent dans les couloirs (vous allez vouloir préparer le sortilège ici, les gars!)."
  ],
  [
    "There's a giant beehive. The giant bees are hostile, but their honey has healing properties.",
    "Il y a une ruche géante. Les abeilles géantes sont hostiles, mais leur miel a des propriétés curatives."
  ],
  [
    "The shrine in the tallest mountain on the spine of the world exists in both the prime material plane and the plane of air. While you're in the prime material plane part, strong winds buffet your party. In the plane of air, this is the lowest part of the plane, and you must dodge the falling debris from above.",
    "Le sanctuaire de la plus haute montagne de la colonne vertébrale du monde existe à la fois dans le plan matériel principal et dans le plan de l'air. Pendant que vous êtes dans la partie principale du plan matériel, des vents forts frappent votre fête. Dans le plan de l'air, c'est la partie la plus basse de l'avion et vous devez éviter les débris qui tombent d'en haut."
  ],
  [
    "There's an old man in a shrine who only wakens once every hundred years. Stories say that he knows the spell that will stop the storm that threatens the capital. Your party must use a special kind of incense, fall into a trance, and defeat his nightmares to wake him and ask him to assist you. But boy are his dreams weird .",
    "Il y a un vieil homme dans un sanctuaire qui ne se réveille qu'une fois tous les cent ans. Les histoires disent qu'il connaît le sortilège qui arrêtera la tempête qui menace la capitale. Votre groupe doit utiliser un type spécial d'encens, tomber en transe et vaincre ses cauchemars pour le réveiller et lui demander de vous aider. Mais garçon sont ses rêves bizarres."
  ],
  [
    "There's a large city in a glass dome at the bottom of the sea. It was abandoned, but intact. When your players go there, the glass has cracked and starts to fill from the bottom. They'll need to race the rising water to get to the teleportation rune at the top...",
    "Il y a une grande ville dans un dôme de verre au fond de la mer. Il a été abandonné, mais intact. Lorsque vos joueurs s'y rendent, le verre s'est fissuré et commence à se remplir par le bas. Ils devront courir la montée des eaux pour atteindre la rune de téléportation au sommet ..."
  ],
  [
    "The tallest giants in this world are long extinct. However, your party has come across the body of one, 80 feet tall, mostly buried underneath the earth. The top half of its body has already rotted to the core, but once you get down about halfway, there's some flesh still left inside. Cultists are inside, trying to recover the sword that felled him....",
    "Les plus grands géants de ce monde ont disparu depuis longtemps. Cependant, votre groupe a rencontré le corps d'un, de 80 pieds de haut, principalement enterré sous la terre. La moitié supérieure de son corps a déjà pourri jusqu'au cœur, mais une fois que vous êtes descendu à mi-chemin, il reste de la chair à l'intérieur. Les cultistes sont à l'intérieur, essayant de récupérer l'épée qui l'a abattu ..."
  ],
  [
    "A giant beholder tower that spans multiple demi-planes. Filled with traps, including the mindless thralls (the adventurers who failed before you.) Better protect your mind here.",
    "Une tour d'observation géante qui enjambe plusieurs demi-plans. Rempli de pièges, y compris les esclaves stupides (les aventuriers qui ont échoué avant vous.) Mieux vaut protéger votre esprit ici."
  ],
  [
    "You've been trapped inside a painting by an enchanter. You'll need to figure out how to escape, even as he paints more monsters for you to fight.",
    "Vous avez été piégé à l'intérieur d'un tableau par un enchanteur. Vous devrez trouver comment vous échapper, même s'il peint plus de monstres à combattre."
  ],
  [
    "You're in a large cavern with giant stalactites. You'll need to fight your way from stalactite to stalactite, using flying or grappling hooks/ziplines to get from one to the next. A giant creature, a thousand feet tall, inhabits the cavern. You'll need to avoid drawing its attention while you seek to recover one of its giant hairs.",
    "Vous êtes dans une grande caverne avec des stalactites géantes. Vous devrez vous frayer un chemin de la stalactite à la stalactite, en utilisant des crochets volants ou des grappins / tyroliennes pour passer de l'un à l'autre. Une créature géante, haute de mille pieds, habite la caverne. Vous devrez éviter d'attirer son attention pendant que vous chercherez à récupérer l'un de ses poils géants."
  ],
  [
    "A descending dungeon of gladiator pits, filled to the brim with demons and other monstrosities, led by the ringmaster on the lowest floor.",
    "Un donjon descendant de fosses de gladiateurs, rempli à ras bord de démons et d'autres monstruosités, dirigé par le maître de piste au dernier étage."
  ],
  [
    "A SAW-like dungeon with a mad killer pursuing the party, just one step behind them as they try to make their way through the trapped halls.",
    "Un donjon en forme de SAW avec un tueur fou poursuivant la fête, juste un pas derrière eux alors qu'ils tentent de se frayer un chemin à travers les salles piégées."
  ],
  [
    "A dungeon made by an abjurist archmage that bans certain schools of magic within each room.",
    "Un donjon fait par un archimage abjuriste qui interdit certaines écoles de magie dans chaque pièce."
  ],
  [
    "A dungeon made by a mad eldritch sorcerer -- in each room your party is true polymorphed into different monsters, and you need to defeat the adventuring party in each room (including copies of your own!) in order to proceed.",
    "Un donjon créé par un sorcier eldritch fou - dans chaque pièce, votre groupe est véritablement transformé en différents monstres, et vous devez vaincre le groupe d'aventures dans chaque pièce (y compris des copies du vôtre!) Pour continuer."
  ],
  [
    "A dungeon that is one big chase like a crash bandicoot level, with a large monster (tarrasque, t-rex, something of that sort) chasing them. They'll need to evade barriers, use environmental traps, and jump on a cart ride in order to escape.",
    "Un donjon qui est une grande poursuite comme un niveau de crash bandicoot, avec un gros monstre (tarrasque, t-rex, quelque chose de ce genre) les poursuivant. Ils devront éviter les barrières, utiliser des pièges environnementaux et faire un tour en charrette pour s'échapper."
  ],
  [
    "A dungeon that is a series of reality TV-show esque challenges against another adventuring party, or a group of mindflayers. (Shows include: The Price is Right, Cutthroat Kitchen, American Idol, etc.)",
    "Un donjon qui est une série de défis esques de télé-réalité contre un autre groupe d'aventures ou un groupe de mindflayers. (Les spectacles comprennent: le prix est correct, cuisine féroce, American Idol, etc.)"
  ],
  [
    "A dungeon where you face off against unknown mercenaries wielding strange weaponry from another dimension. They have long tubes that spit fire and portable bombs of light and rocks. (Our dimension!)",
    "Un donjon où vous affrontez des mercenaires inconnus brandissant des armes étranges d'une autre dimension. Ils ont de longs tubes qui crachent du feu et des bombes portatives de lumière et de roches. (Notre dimension!)"
  ],
  [
    "A dungeon that's a revolving carousel filled with automatons who act out history's famous battles from Faerun.",
    "Un donjon qui est un carrousel tournant rempli d'automates qui jouent les célèbres batailles de l'histoire de Faerun."
  ],
  [
    "A dungeon that takes in a single room, like the X-Men Danger Room. Every two rounds during the fight, the room shifts, stone blocks rising and falling from the ground to create different cover configurations and height (and sometimes adding elemental effects.)",
    "Un donjon qui accueille une seule pièce, comme la X-Men Danger Room. Tous les deux tours pendant le combat, la pièce se déplace, des blocs de pierre s'élevant et tombant du sol pour créer différentes configurations de couverture et hauteur (et parfois en ajoutant des effets élémentaires)."
  ],
  [
    "A dungeon where the party loses different senses: one loses their sight, another their hearing, another their ability to speak.",
    "Un donjon où le groupe perd différents sens: l'un perd la vue, un autre son audition, un autre sa capacité à parler."
  ],
  [
    "A dungeon with floating coins, tunnels , many platforms. You have to get to the end without falling into any pits! If you don’t collect enough coins, you’ll warp back to the start to try again. There are weird potions that come out sometimes if you hit the bottom of platforms, that make you bigger, smaller, lighter, heavier etc.",
    "Un donjon avec des pièces flottantes, des tunnels, de nombreuses plates-formes. Il faut arriver au bout sans tomber dans les fosses! Si vous ne collectez pas suffisamment de pièces, vous reviendrez au début pour réessayer. Il y a des potions étranges qui sortent parfois si vous touchez le bas des plates-formes, qui vous rendent plus grand, plus petit, plus léger, plus lourd, etc."
  ],
  [
    "Every monster in this dungeon has a red glow. Every time one is killed, the glow around the others intensifies. The more you kill the stronger they get.",
    "Chaque monstre de ce donjon a une lueur rouge. Chaque fois que l'un est tué, la lueur autour des autres s'intensifie. Plus vous tuez, plus ils deviennent forts."
  ],
  [
    "The temple of transformation has a large forest inside. Nothing is what it seems. All the creatures can transform in some way, so that rabbit may not be as harmless as it seems.",
    "Le temple de la transformation a une grande forêt à l'intérieur. Rien n'est ce qu'il semble. Toutes les créatures peuvent se transformer d'une manière ou d'une autre, de sorte que le lapin n'est peut-être pas aussi inoffensif qu'il n'y paraît."
  ],
  [
    "The Metal Mountain is a treasure trove for those that can survive. This mountain within a mountain is linked to the sub elemental plane of metal. Even the weakest of monsters have a big payoff if you can kill it, like the steel wool sheep. Just be wary of anything that eats metal themed creatures. Like the frost steel saber tooth .",
    "La montagne de métal est un trésor pour ceux qui peuvent survivre. Cette montagne dans une montagne est liée au plan sous-élémentaire du métal. Même le plus faible des monstres a un gros gain si vous pouvez le tuer, comme le mouton en laine d'acier. Méfiez-vous de tout ce qui mange des créatures sur le thème du métal. Comme la dent de sabre en acier givré."
  ],
  [
    "It’s said that a yeti collects the shinies of all the adventurers it kills in its lair of tunnels through a great iceberg on the subplane of ice.",
    "On dit qu’un yéti recueille les brillances de tous les aventuriers qu’il tue dans son repaire de tunnels à travers un grand iceberg sur le sous-plan de glace."
  ],
  [
    "The Herb Garden of the Gods contains many extraordinary and magical plants. Oh I recognize that one as a natural strength enhancer! Wait... why does that squirrel have such massive biceps?!",
    "Le jardin d'herbes des dieux contient de nombreuses plantes extraordinaires et magiques. Oh, je reconnais celui-là comme un exhausteur de force naturel! Attendez ... pourquoi cet écureuil a-t-il des biceps si massifs?!"
  ],
  [
    "Something important was hidden in the Forest of Life and Death. Here is between the light and dark, and this twilight forest is known for dangerous bloodsuckers and soul leechers, as well as life givers and holy blessers. The deer god, a Titan of life and death makes this place his home.",
    "Quelque chose d'important était caché dans la forêt de la vie et de la mort. Voici entre la lumière et l'obscurité, et cette forêt crépusculaire est connue pour ses sangsues dangereuses et ses sangsues d'âme, ainsi que pour ses donneurs de vie et ses saints bénisseurs. Le dieu du cerf, un Titan de vie et de mort, fait de cet endroit sa maison."
  ],
  [
    "The Black Barons Last Bastion ofBlood Magic. A black stone keep in a small lake of blood, filled with powerful undead water beasts. The keep itself is home to the last of a race of blood sacrifice mages, who absorb blood to gain power. No not a vampire, he doesn’t need to drink it to live, he’s just power hungry .",
    "Le dernier bastion des barons noirs de la magie du sang. Un donjon de pierre noire dans un petit lac de sang, rempli de puissantes bêtes d'eau mort-vivantes. Le donjon lui-même abrite le dernier d'une race de mages du sacrifice de sang, qui absorbent le sang pour gagner en puissance. Non, pas un vampire, il n’a pas besoin de le boire pour vivre, il a juste faim de pouvoir."
  ],
  [
    "This man made cavern has a forest and an ancient city inside it. There are many tiles and traps that shrink or enlarge thing to an extreme degree. There’s a doggo sized T-Rex and a Woodpecker the size of a dragon. Best avoid touching anything unnecessarily",
    "Cette caverne artificielle a une forêt et une ville ancienne à l'intérieur. Il existe de nombreux carreaux et pièges qui rétrécissent ou agrandissent la chose à un degré extrême. Il y a un T-Rex de la taille d'un chien et un pic de la taille d'un dragon. Mieux vaut éviter de toucher quoi que ce soit inutilement"
  ],
  [
    "An infernal brothel. You’re there to rescue your idiot bard, and maybe rob the large safe of victims gold in the basement.",
    "Un bordel infernal. Vous êtes là pour sauver votre idiot barde, et peut-être voler l'or du grand coffre-fort des victimes dans le sous-sol."
  ],
  [
    "Somewhere in a cave deep within the earth lies an extreme concentration of mana. Moving through the mana rich air here feels like moving through water, and the mana saturated water feels like crawling through mud. The monsters here have adapted to this, you have not. (Animals with natural force fields, mana beam attacks, etc.)",
    "Quelque part dans une grotte au plus profond de la terre se trouve une concentration extrême de mana. Se déplacer dans l'air riche en mana donne l'impression de se déplacer dans l'eau, et l'eau saturée de mana donne l'impression de ramper dans la boue. Les monstres ici se sont adaptés à cela, vous ne l'avez pas fait. (Animaux avec champs de force naturels, attaques de rayons de mana, etc.)"
  ],
  [
    "The plains of eternal starlight can be found in many of the ancient oracles temples. Divination is more powerful here, Reading the stars. Many of the creatures that live here seem to know what you’re going to do before you do... but you need something here.",
    "Les plaines de la lumière éternelle des étoiles se trouvent dans de nombreux temples des oracles antiques. La divination est plus puissante ici, la lecture des étoiles. Beaucoup de créatures qui vivent ici semblent savoir ce que vous allez faire avant de le faire ... mais vous avez besoin de quelque chose ici."
  ],
  [
    "Deep and a canyon of blue stone, lies a small castle. One of the most talented summoners ever to live made this his home centuries ago. Most of the summoning traps leading up to the castle have been destroyed already, but no one has ever passed the gate.",
    "Profondément et un canyon de pierre bleue, se trouve un petit château. L'un des invocateurs les plus talentueux qui ait jamais existé en a fait sa demeure il y a des siècles. La plupart des pièges d'invocation menant au château ont déjà été détruits, mais personne n'a jamais franchi la porte."
  ],
  [
    "The hall of statues is itself a 600 foot tall statue of incomparable craftsmanship. Inside is full of beautifully wrought statues of many materials. Though it feels like you’re being watched....",
    "La salle des statues est elle-même une statue haute de 600 pieds d'un savoir-faire incomparable. L'intérieur regorge de statues magnifiquement travaillées de nombreux matériaux. Même si vous avez l'impression d'être surveillé ..."
  ],
  [
    "The Pit. A seemingly endless pit in the ground full of dangerous creatures and hidden rooms. There’s an adventurers town built around it. No one has reached the bottom, but there are certainly many bodies to loot down there with whatever was there originally. And eternal glory.",
    "La fosse. Une fosse apparemment sans fin dans le sol pleine de créatures dangereuses et de pièces cachées. Il y a une ville d'aventuriers construite autour d'elle. Personne n'a atteint le fond, mais il y a certainement beaucoup de corps à piller là-bas avec tout ce qui était là à l'origine. Et la gloire éternelle."
  ],
  [
    "The endless cliffs are riddled with little caves, many of which contain the inheritance of an unknown entity. What is known, they’re well guarded. No one has made it past the demon wolf in the third cave up...",
    "Les falaises sans fin sont criblées de petites grottes, dont beaucoup contiennent l'héritage d'une entité inconnue. Ce que l’on sait, ils sont bien gardés. Personne n'a dépassé le démon loup dans la troisième grotte ..."
  ],
  [
    "For those that know how to reach it, there is a train just above the atmosphere: The Death Train. It circles the globe constantly, and there are many treasures inside to compete for. Unfortunately there will never be more than 100 tickets. You’ll have to get one from its current owner.",
    "Pour ceux qui savent y accéder, il y a un train juste au-dessus de l'atmosphère: Le Train de la Mort. Il fait constamment le tour du globe, et il y a de nombreux trésors à l'intérieur pour rivaliser. Malheureusement, il n'y aura jamais plus de 100 billets. Vous devrez en obtenir un auprès de son propriétaire actuel."
  ],
  [
    "In the eye of the Everstorm that rages up and down the impassable ocean lies a great sphere. Inside is a deserted city, seemingly untouched for millennia. Why does this technology look so much more advanced than anything you’ve ever seen?",
    "Dans l'œil de l'Everstorm qui fait rage de haut en bas, l'océan infranchissable se trouve une grande sphère. À l'intérieur se trouve une ville déserte, apparemment intacte depuis des millénaires. Pourquoi cette technologie semble-t-elle tellement plus avancée que tout ce que vous avez jamais vu?"
  ],
  [
    "Inside a strange box in a ruin, you’re transported to the challengers jungle. Oddly, nothing that’s killed here dies, it just dissipates and reappears somewhere else in the realm. But how do you get out of here?",
    "Dans une étrange boîte en ruine, vous êtes transporté dans la jungle des challengers. Curieusement, rien de ce qui a été tué ici ne meurt, il se dissipe et réapparaît ailleurs dans le royaume. Mais comment sortez-vous d'ici?"
  ],
  [
    "The Sound of Silence. This dungeon is filled with different bells with different effects. Blind monster hunt by sound.",
    "Le son du silence. Ce donjon est rempli de différentes cloches avec différents effets. Chasse aux monstres aveugles par le son."
  ],
  [
    "A dungeon full of mushrooms of varying sizes, with really bouncy tops. Mushroom monsters",
    "Un donjon rempli de champignons de différentes tailles, avec des sommets vraiment gonflables. Monstres champignons"
  ],
  [
    "The tops of great pillars rise from the clouds, leading away from the mountain temple. It’s said if you can make it through this treacherous path, and defeat the pillar guardians, gifts from the gods await.",
    "Les sommets des grands piliers s'élèvent des nuages, s'éloignant du temple de la montagne. Il est dit que si vous pouvez traverser ce chemin perfide et vaincre les gardiens des piliers, les cadeaux des dieux vous attendent."
  ],
  [
    "A towering, enormous, impossibly complex and anachronistically industrial dome-like building with a sentient and telepathic orb at the centre. It sees everything inside and telepathically mocks the party as they weave their way towards it.",
    "Un bâtiment imposant, énorme, incroyablement complexe et en forme de dôme industriel anachronique avec un orbe sensible et télépathique au centre. Il voit tout à l'intérieur et se moque par télépathie du parti alors qu'ils se frayent un chemin vers lui."
  ],
  [
    "Deep in a fey-infested forest is a small bed of totally unique cobalt and ebony flowers that eternally bloom. If you smell them you pass out and are trapped in a lucid dream world. No one can wake you until you surpass three great challenges -- one unique to the PC and their nightmares, and two common to all the PC's stuck within.",
    "Au fond d'une forêt infestée de fées se trouve un petit lit de fleurs de cobalt et d'ébène totalement uniques qui fleurissent éternellement. Si vous les sentez, vous vous évanouissez et êtes piégé dans un monde de rêve lucide. Personne ne peut vous réveiller tant que vous n'avez pas dépassé trois grands défis - un unique au PC et à ses cauchemars, et deux communs à tous les PC coincés à l'intérieur."
  ],
  [
    "Ancient Mystic Temple of the heavenly way. This ziggurat of semitransparent green and blue stone lies hidden in the auroras of the bottom of the world. The beings here seem... astral.",
    "Ancien temple mystique de la voie céleste. Cette ziggourat de pierre verte et bleue semi-transparente se cache dans les aurores boréales du fond du monde. Les êtres ici semblent ... astraux."
  ],
  [
    "In the actual dungeon of the infernal princes castle. Better watch out, demons and their beasts lurk about every corner. Probably just best to ignore those screams.",
    "Dans le donjon actuel du château des princes infernaux. Mieux vaut faire attention, les démons et leurs bêtes se cachent à chaque coin de rue. Il vaut probablement mieux ignorer ces cris."
  ],
  [
    "The drifting island, that’s forgotten as soon as it’s left. Much like the monsters and landmarks. Why are we here again?",
    "L’île à la dérive, qui est oubliée dès qu’elle est partie. Tout comme les monstres et les monuments. Pourquoi sommes-nous encore ici?"
  ],
  [
    "Legend has it this lake of blood can from the most ancient of dragons. His hoard is also supposed to be somewhere in the lake. Whether it’s true or not, one thing is certain. All the creatures here have become draconian",
    "La légende raconte que ce lac de sang peut provenir du plus ancien des dragons. Son trésor est également censé être quelque part dans le lac. Que ce soit vrai ou non, une chose est certaine. Toutes les créatures ici sont devenues draconiennes"
  ],
  [
    "This stone circle of monoliths left by the Origin Race has always been a mystery. So why did it’s center just open up to a great tunnel? This energy feels... otherworldly. Should definitely warp the party to a palace on the moon.",
    "Ce cercle de pierres de monolithes laissé par la Race Origin a toujours été un mystère. Alors pourquoi le centre s’est-il ouvert à un grand tunnel? Cette énergie semble ... d'un autre monde. Devrait définitivement déformer la fête dans un palais sur la lune."
  ],
  [
    "Did you know, there is a flower that grows in the center of the Glowing Forest of Hunger in the underdark that’s worth a fortune? The forest is beautiful too. And hungry. Glowy carnivorous plants. That is all.",
    "Saviez-vous qu'il y a une fleur qui pousse au centre de la forêt rougeoyante de la faim dans le noir qui vaut une fortune? La forêt est belle aussi. Et faim. Plantes carnivores brillantes. C'est tout."
  ],
  [
    "On the vast purple tundra sits a lone dwelling made of great animal bones and hide. Inside is a pocket dimension that’s home to a ferocious pack of shapeshifters, inhabiting this massive complex of bone and hide. Why do werewolves keep even more wolves?Though there’s probably no silver In their treasure hall.",
    "Sur la vaste toundra pourpre se trouve une habitation isolée faite de grands os et de peaux d'animaux. À l'intérieur se trouve une dimension de poche qui abrite une meute féroce de métamorphes, habitant cet immense complexe d'os et de peau. Pourquoi les loups-garous gardent-ils encore plus de loups? Bien qu'il n'y ait probablement pas d'argent dans leur salle aux trésors."
  ],
  [
    "The Little People that preceded all of the modern petite races were unmatched in craftsman ship and their knowledge of the universe. This recently discovered astronomy tower is breathtaking, from the magnificent solarium full of secrets to the star chart hall that seems to be moving. It seems unguarded, but maybe that’s due to all the traps and puzzles?",
    "Les Little People qui ont précédé toutes les petites races modernes étaient inégalés dans le domaine de l'artisanat et de leur connaissance de l'univers. Cette tour d'astronomie récemment découverte est à couper le souffle, du magnifique solarium plein de secrets à la salle des cartes stellaires qui semble bouger. Cela ne semble pas surveillé, mais peut-être est-ce dû à tous les pièges et énigmes?"
  ],
  [
    "The spirits at the Dojo of the Moonlight Blade still linger, protecting their armory from the unworthy. The rules are simple, 1v1 from the weakest to the strongest. Hey I’ve never hit a ghost with glasses before...",
    "Les esprits du Dojo de la Lame du clair de lune s'attardent toujours, protégeant leur arsenal des indignes. Les règles sont simples, 1v1 du plus faible au plus fort. Hé, je n'ai jamais frappé un fantôme avec des lunettes avant ..."
  ],
  [
    "The Crow Kings Roost in the Weird Tree of the Dark Forest is said to hold long forgotten magic. Fear permeates the air as readily as darkness. Be careful not to lose yourself along the way. Pumpkins and skeletons litter this forest.",
    "On dit que le Crow Kings Roost dans l'arbre étrange de la forêt sombre détient une magie oubliée depuis longtemps. La peur imprègne l'air aussi facilement que l'obscurité. Faites attention de ne pas vous perdre en cours de route. Des citrouilles et des squelettes jonchent cette forêt."
  ],
  [
    "The Mad Bards Myriad of Ballrooms. The Mad Bard of Myth was unmatched in his composing, with music that could ensnare the very soul, and bewitch the mind. He amassed a fortune playing for the most wealthy of patrons. Welcome to the Masquerade!",
    "La myriade de Mad Bards de salles de bal. The Mad Bard of Myth était inégalé dans sa composition, avec une musique qui pouvait piéger l'âme même et ensorceler l'esprit. Il a amassé une fortune en jouant pour le plus riche des clients. Bienvenue à la mascarade!"
  ],
  [
    "The Cats in the Hat. In a large top hat shaped building, some crazy collector has gathered many of the worlds cat and cat like beasts into this dwelling, though reality seems warped in here. They also supposedly collected cat themed treasure, like El Gato: an ancient idol of pure gold shaped like a cat. It’s rumored to summon a powerful Fey creature.",
    "Les chats dans le chapeau. Dans un grand bâtiment en forme de chapeau haut de forme, un collectionneur fou a rassemblé de nombreux chats et chats du monde comme des bêtes dans cette demeure, bien que la réalité semble déformée ici. Ils auraient également collecté des trésors sur le thème des chats, comme El Gato: une ancienne idole d'or pur en forme de chat. Selon la rumeur, une puissante créature Fey serait invoquée."
  ],
  [
    "In a pocket dimension well hidden near the city, lies the home of Nicolas Flamel. The ancient master of alchemy left the secrets of immortality and the recipe for the philosophers stone in this place before he went willingly into deaths embrace. This towering haphazardly balanced cottage is protected by the secrets of alchemy. Many things here heal themselves or duplicate when killed.",
    "Dans une dimension de poche bien cachée près de la ville, se trouve la maison de Nicolas Flamel. L'ancien maître de l'alchimie a laissé les secrets de l'immortalité et la recette de la pierre des philosophes dans cet endroit avant de s'engager volontairement dans l'étreinte de la mort. Ce cottage imposant et équilibré au hasard est protégé par les secrets de l'alchimie. Beaucoup de choses ici se guérissent ou se reproduisent lorsqu'elles sont tuées."
  ],
  [
    "The Collectors Zoo. The Collector was a rather obsessive man who like rare and powerful things. The inside of this great tree is like a museum of replicas of items he has, while on each branch of this magnificent tree hangs large spheres much like Christmas ornaments. Upon closer inspection, entire environments can be seen inside with breathtaking creatures roaming in their seemingly natural habitat. You’ve got a hunch the real items from the museum are protected in these animal enclosures.",
    "Le zoo des collectionneurs. Le collectionneur était un homme plutôt obsessionnel qui aimait les choses rares et puissantes. L'intérieur de ce grand arbre ressemble à un musée de répliques d'objets qu'il possède, tandis que sur chaque branche de ce magnifique arbre est suspendu de grandes sphères un peu comme des ornements de Noël. En y regardant de plus près, des environnements entiers peuvent être vus à l'intérieur avec des créatures à couper le souffle errant dans leur habitat apparemment naturel. Vous avez une idée que les vrais objets du musée sont protégés dans ces enclos pour animaux."
  ],
  [
    "There is an abandoned Mages College on the Monstrous Moors. A botched summoning spell managed to teleport hundreds of powerful monstrosities into the school. No one has tried to reclaim it in many years.",
    "Il y a un Collège des Mages abandonné sur les Maures Monstrueux. Un sort d'invocation bâclé a réussi à téléporter des centaines de puissantes monstruosités dans l'école. Personne n'a essayé de le récupérer depuis de nombreuses années."
  ],
  [
    "The rainbow way, a beautiful and deadly path between the planes of air and water. How vibrant everything here is, and there’s supposedly a massive pot of gold at the end. Some green and red fey like creature plagues your journey.",
    "Le chemin de l'arc-en-ciel, un chemin magnifique et mortel entre les plans de l'air et de l'eau. Comme tout est vibrant ici, et il y a supposément un énorme pot d'or à la fin. Des fées vertes et rouges comme des créatures infestent votre voyage."
  ],
  [
    "A massive shopping complex. Doing tasks here earns you points, which can be exchanged for items at the one and only Walters Magic Emporium. There are entrances to here from all across the world. (Walmart dungeon folks, you’ll see scary shit)",
    "Un immense complexe commercial. Faire des tâches ici vous rapporte des points, qui peuvent être échangés contre des objets dans le seul et unique Walters Magic Emporium. Il y a des entrées ici de partout dans le monde. (Les gens des donjons de Walmart, vous verrez de la merde effrayante)"
  ]
];
