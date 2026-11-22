import type { BilingualTuple, EncounterDisposition, LocalizedText } from "../types";

/**
 * Data pools for Modular Random Encounter outcomes (AAA Social Road, Environment, Dispositions).
 */

export const MODULAR_SOCIAL_ROAD_AAA: readonly BilingualTuple[] = [
  [
    "A bard or minstrel, half dressed and looking over his shoulder",
    "Un barde ou ménestrel à moitié vêtu qui jette sans cesse des coups d’œil par-dessus son épaule."
  ],
  [
    "Farmer going to/returning from market with his meager goods",
    "Un fermier se rendant au marché ou en revenant avec sa maigre marchandise."
  ],
  [
    "Farmer going to/returning from town with his/her sons",
    "Un fermier allant en ville ou en revenant avec ses fils."
  ],
  [
    "Farmer going to/returning from town with his/her daughters",
    "Un fermier allant en ville ou en revenant avec ses filles."
  ],
  [
    "Girl running away from home",
    "Une jeune fille ayant fugué de chez elle."
  ],
  [
    "Boy running away to the city",
    "Un jeune garçon en fuite vers la ville."
  ],
  [
    "A lost child, in tears and holding a torn sack",
    "Un enfant perdu, en larmes, serrant un sac déchiré."
  ],
  [
    "A troupe of entertainers, led by an overdressed and curious Elf",
    "Une troupe de saltimbanques menée par un elfe curieux et trop richement vêtu."
  ],
  [
    "Full company of mercenaries, led by a stout, dark bearded Captain",
    "Une compagnie complète de mercenaires dirigée par un capitaine trapu à la barbe noire."
  ],
  [
    "A small group of mercenaries, dishevelled and sweating",
    "Un petit groupe de mercenaires débraillés et couverts de sueur."
  ],
  [
    "Minor noble travelling via horse, with servants",
    "Un petit noble voyageant à cheval avec ses serviteurs."
  ],
  [
    "Minor noble going to/returning from hunt, with retinue",
    "Un petit noble partant à la chasse ou en revenant avec sa suite."
  ],
  [
    "Local bailiff, sheriff or warden, with a suspicious outlook of strangers",
    "Un bailli, shérif ou garde local scrutant les étrangers avec méfiance."
  ],
  [
    "A hunter or poacher, with a huge longbow strapped to their back",
    "Un chasseur ou braconnier portant un immense arc long dans le dos."
  ],
  [
    "A pair of hunters or poachers, arguing about who is to blame for a missed shot",
    "Deux chasseurs ou braconniers se disputant pour savoir qui est responsable d’un tir manqué."
  ],
  [
    "Large trading caravan, with accompanying surly guards",
    "Une grande caravane marchande accompagnée de gardes renfrognés."
  ],
  [
    "A lone trader/merchant on foot, leading a mule carrying their wares",
    "Un marchand solitaire à pied tirant une mule chargée de marchandises."
  ],
  [
    "Lone trader/merchant riding on a horse drawn wagon",
    "Un marchand solitaire conduisant un chariot tiré par des chevaux."
  ],
  [
    "Limping bailiff and his badly beaten prisoner",
    "Un bailli boitant et son prisonnier sévèrement battu."
  ],
  [
    "Escaped prisoner, manacled and carrying a religious icon",
    "Un prisonnier évadé, encore entravé aux poignets, portant une icône religieuse."
  ],
  [
    "Sheriff and his dogs, out hunting an outlaw",
    "Un shérif et ses chiens partis à la poursuite d’un hors-la-loi."
  ],
  [
    "A boundary warden with a broken bow and empty scabbard, fuming as he walks",
    "Un garde-frontière pestant tout en marchant avec un arc brisé et un fourreau vide."
  ],
  [
    "Lone travelling priest, carrying a lit censer with an acrid smell",
    "Un prêtre voyageant seul et balançant un encensoir allumé à l’odeur âcre."
  ],
  [
    "Lone travelling cleric, with a faintly glowing mace",
    "Un clerc solitaire portant une masse faiblement lumineuse."
  ],
  [
    "Charismatic priest and retinue of apostles, who are mumbling to each other and won't make eye contact",
    "Un prêtre charismatique et sa suite de disciples qui murmurent entre eux en évitant tout contact visuel."
  ],
  [
    "A cleric and a small retinue of acolytes, full of confidence",
    "Un clerc plein d’assurance accompagné d’un petit groupe d’acolytes."
  ],
  [
    "A ranger/boundary warder patrol, with a cheerful leader",
    "Une patrouille de rôdeurs ou de gardes-frontières menée par un chef jovial."
  ],
  [
    "A patrol from the local city or town guard, nervous about being out of town",
    "Une patrouille de la garde urbaine visiblement nerveuse de se trouver hors des murs."
  ],
  [
    "A foot messenger, with a ducal ring on his hand",
    "Un messager à pied arborant une chevalière ducale."
  ],
  [
    "A horse messenger wearing a royal tabard and carrying a fine leather satchel",
    "Un messager à cheval portant un tabard royal et une sacoche de cuir fin."
  ],
  [
    "A travelling historian carrying a sack of old stone statues",
    "Un historien itinérant transportant un sac rempli d’anciennes statues de pierre."
  ],
  [
    "A starving beggar, willing to trade information for food",
    "Un mendiant affamé prêt à échanger des informations contre de la nourriture."
  ],
  [
    "A group of refugees, telling stories of war and oppression in their homeland",
    "Un groupe de réfugiés racontant des récits de guerre et d’oppression dans leur patrie."
  ],
  [
    "A wounded soldier, limping along on crutches",
    "Un soldat blessé avançant péniblement avec des béquilles."
  ],
  [
    "A deserting soldier carrying a memento of a fallen friend",
    "Un soldat déserteur emportant le souvenir d’un camarade tombé au combat."
  ],
  [
    "A wandering dog, with a silver collar and name tag",
    "Un chien errant portant un collier d’argent muni d’une médaille."
  ],
  [
    "A bear wearing a collar and trailing a frayed rope",
    "Un ours portant un collier et traînant une corde effilochée."
  ],
  [
    "A riderless horse, with bulging saddlebags",
    "Un cheval sans cavalier dont les fontes de selle sont pleines à craquer."
  ],
  [
    "A thrown rider, trying to catch his horse",
    "Un cavalier désarçonné tentant de rattraper son cheval."
  ],
  [
    "A wandering madman, ranting about an invisible creature",
    "Un fou errant vociférant contre une créature invisible."
  ],
  [
    "A pair of dwarven prospectors, arguing loudly about where they took a wrong turn",
    "Deux prospecteurs nains se disputant bruyamment sur l’endroit où ils ont pris le mauvais chemin."
  ],
  [
    "Halfling cook/chef, out foraging for ingredients",
    "Un cuisinier halfelin parti cueillir des ingrédients."
  ],
  [
    "Overturned wagon with injured merchant",
    "Un chariot renversé avec un marchand blessé."
  ],
  [
    "A bored elderly gnome, with a curious mechanical toy",
    "Un vieux gnome désœuvré manipulant un curieux jouet mécanique."
  ],
  [
    "Fisherman by a riverside, without any fish",
    "Un pêcheur bredouille au bord d’une rivière."
  ],
  [
    "Druid planting rows of trees across the road",
    "Un druide plantant des rangées d’arbres en travers de la route."
  ],
  [
    "A drunk from a nearby tavern, unsteady on his feet",
    "Un ivrogne titubant tout juste sorti d’une taverne voisine."
  ],
  [
    "A partially smashed coffin, with a “corpse” inside which is slowly moving",
    "Un cercueil à moitié brisé contenant un « cadavre » qui bouge lentement."
  ],
  [
    "A dealer of “used magical artefacts”",
    "Un revendeur « d’artefacts magiques d’occasion »."
  ],
  [
    "An elf picking and eating wild berries",
    "Un elfe cueillant et mangeant des baies sauvages."
  ],
  [
    "A manic Herbalist, with green smears around his mouth",
    "Un herboriste exalté aux lèvres barbouillées de taches vertes."
  ],
  [
    "Group of robed monks, carrying a lit censer",
    "Un groupe de moines encapuchonnés portant un encensoir allumé."
  ],
  [
    "A squire chasing his drunken master’s horse",
    "Un écuyer courant après le cheval de son maître ivre."
  ],
  [
    "An armoured Dragonborn sitting on a stone, sharpening a sword and sighing",
    "Un drakéide en armure assis sur un rocher, aiguisant son épée en soupirant."
  ],
  [
    "Farmer with an unmoving mule, laden with fruit",
    "Un fermier face à une mule entêtée et immobile, chargée de fruits."
  ],
  [
    "Guarded and chained prisoners digging a ditch",
    "Des prisonniers enchaînés et surveillés en train de creuser un fossé."
  ],
  [
    "A pair of wagon drivers preparing to race each other",
    "Deux conducteurs de chariots se préparant à faire la course."
  ],
  [
    "A tiny Earth Elemental, shifting pebbles from one side of the road to the other",
    "Un minuscule élémentaire de terre déplaçant des cailloux d’un côté à l’autre de la route."
  ],
  [
    "A group of dancing lights, which keep just ahead of the party",
    "Une nuée de lumières dansantes qui reste juste devant le groupe."
  ],
  [
    "A drug addict, coming down from their last score",
    "Un toxicomane en plein sevrage après sa dernière dose."
  ],
  [
    "A harmless ghost, sadly humming an old song",
    "Un fantôme inoffensif fredonnant tristement une vieille chanson."
  ],
  [
    "A gnome riding an armoured mastiff",
    "Un gnome chevauchant un molosse en armure."
  ],
  [
    "A hawker trying to find his bird",
    "Un fauconnier cherchant à retrouver son oiseau."
  ],
  [
    "A grave robber, with mud on his shoes and a dark, wet sack on his back",
    "Un pilleur de tombes aux bottes boueuses, un sac sombre et humide sur le dos."
  ],
  [
    "A friendly necromancer with several raised skeletons, who offers to share food",
    "Un nécromancien affable accompagné de plusieurs squelettes animés, qui propose de partager son repas."
  ],
  [
    "A gang of youths from a nearby town",
    "Une bande de jeunes gens venus d’une ville voisine."
  ],
  [
    "A gnomish tinker & merchant, offering magical mending",
    "Un bricoleur et marchand gnome proposant des réparations magiques."
  ],
  [
    "A Quickling, fleeing from the service of a warlock",
    "Un quickling fuyant le service d’un sorcier."
  ],
  [
    "A drunken Hill Giant, asleep and snoring loudly",
    "Un géant des collines ivre, endormi et ronflant bruyamment."
  ],
  [
    "A starving hermit, bearing a sword handle without a blade",
    "Un ermite affamé portant une poignée d’épée dépourvue de lame."
  ],
  [
    "A migrating Treant, walking down the middle of the road",
    "Un sylvanien en migration marchant au beau milieu de la route."
  ],
  [
    "A dead knight’s retinue, returning the body home",
    "L’escorte d’un chevalier défunt ramenant son corps sur ses terres."
  ],
  [
    "Traveling reeve or magistrate, summoned to a case",
    "Un prévôt ou magistrat itinérant convoqué pour une affaire."
  ],
  [
    "A group of pilgrims, one of which is carrying a small, heavily bound chest",
    "Un groupe de pèlerins dont l’un transporte un petit coffret solidement cerclé."
  ],
  [
    "A backwoods moonshiner, offering free samples of his wares",
    "Un bouilleur de cru des bois offrant des échantillons gratuits de sa gnôle."
  ],
  [
    "A surveyor excited about discovering a door into an artificial hillock",
    "Un arpenteur tout excité d’avoir découvert une porte dans un tertre artificiel."
  ],
  [
    "A dripping wet fisherman, climbing up from a riverbank with an angry look",
    "Un pêcheur trempé jusqu’aux os remontant de la berge d’un air furieux."
  ],
  [
    "A girl picking wildflowers, acting as a lookout for local bandits",
    "Une jeune fille cueillant des fleurs des champs tout en faisant le guet pour des bandits locaux."
  ],
  [
    "A boy swinging a stick like a sword, with a pet dog following",
    "Un garçon maniant un bâton comme une épée, suivi par son chien."
  ],
  [
    "Villagers cutting wood to make bows",
    "Des villageois coupant du bois pour fabriquer des arcs."
  ],
  [
    "A stone golem with one leg shorter than the other, never walking in a straight line",
    "Un golem de pierre dont une jambe est plus courte que l’autre, incapable de marcher droit."
  ],
  [
    "A pixie telling rude jokes and riddles",
    "Un lutin racontant des plaisanteries salaces et des énigmes."
  ],
  [
    "Four villagers burning a pile of corpses, which are emitting a thick purple smoke",
    "Quatre villageois brûlant un tas de cadavres d’où s’échappe une épaisse fumée pourpre."
  ],
  [
    "A wagoner trying to fix his strangely burned cart",
    "Un charretier tentant de réparer sa charrette étrangement calcinée."
  ],
  [
    "A contented Halfling, smoking an oddly scented pipe",
    "Un halfelin paisible fumant une pipe à l’odeur inhabituelle."
  ],
  [
    "A wild-eyed and dishevelled Alchemist, ranting about a breakthrough",
    "Un alchimiste échevelé au regard hagard divaguant sur une découverte majeure."
  ],
  [
    "An imp caught in a rabbit trap, screeching loudly",
    "Un diablotin pris dans un collet à lapins, hurlant à pleins poumons."
  ],
  [
    "A lost wagon guard, with scratches on his face",
    "Un garde de caravane égaré portant des griffures au visage."
  ],
  [
    "A seller of genuine, if minor, religious relics",
    "Un vendeur de reliques religieuses mineures, mais authentiques."
  ],
  [
    "An old gnome in hat and tattered clothes, rapidly shuffling a deck of cards",
    "Un vieux gnome coiffé d’un chapeau et vêtu de guenilles, battant rapidement un jeu de cartes."
  ],
  [
    "An ebullient Orc, dressed in bright fine silks",
    "Un orque exubérant vêtu de fines soieries aux couleurs vives."
  ],
  [
    "A Green Hag, offering a reward for revenge on those who tricked her",
    "Une guenaude verte offrant une récompense à qui la vengera de ceux qui l’ont dupée."
  ],
  [
    "A wine merchant, asking for directions to the nearby town festival",
    "Un marchand de vin demandant son chemin vers la fête de la ville voisine."
  ],
  [
    "A fur trapper, with a live wolverine as a pet",
    "Un trappeur avec un glouton vivant en guise d’animal de compagnie."
  ],
  [
    "A sour old grandmother, complaining bitterly about her eldest son",
    "Une vieille grand-mère acariâtre se plaignant amèrement de son fils aîné."
  ],
  [
    "A Hobgoblin out to see the world",
    "Un hobgobelin parti découvrir le monde."
  ],
  [
    "A young man, with a hideous mask magically stuck to his face",
    "Un jeune homme portant un masque hideux collé par magie sur son visage."
  ],
  [
    "A band of giant hunters, paid to kill a troublesome old Hill Giant",
    "Une bande de chasseurs de géants payée pour abattre un vieux géant des collines gênant."
  ],
  [
    "A charcoal burner, telling stories about haunted trees",
    "Un charbonnier racontant des histoires d’arbres hantés."
  ],
  [
    "A potion merchant, with a backpack full of ‘alternative’ potions",
    "Un marchand de potions avec un sac à dos rempli de potions « alternatives »."
  ]
];

export const MODULAR_ENVIRONMENT_ENCOUNTERS: readonly BilingualTuple[] = [
  [
    "Abandoned camp",
    "Campement abandonné"
  ],
  [
    "Abandoned ship",
    "Navire abandonné"
  ],
  [
    "Abandoned structure - castle, farmhouse, fort, inn, lighthouse, mill, outpost, temple, tower / (burned, decayed, flooded, half buried) ruins, ghost town, overgrown, recently abandoned - List of Structures",
    "Structure abandonnée — château, ferme, fortin, auberge, phare, moulin, avant-poste, temple, tour (ruines calcinées, délabrées, inondées, à demi ensevelies, ville fantôme ou envahie par la végétation)"
  ],
  [
    "Abandoned town - (burned, decayed, flooded, half buried) ruins, ghost town, overgrown, recently abandoned",
    "Ville abandonnée — ruines calcinées, délabrées, inondées, à demi ensevelies, ville fantôme ou récemment désertée"
  ],
  [
    "Adventurer guild symbol on or near structure - Adventurer Guild Symbols",
    "Symbole de guilde d’aventuriers gravé sur ou près d’une structure"
  ],
  [
    "Alter to some forgotten (ancestral spirit, angle, demon, elder god, forgotten god, god, old one, outsider, nature spirit)",
    "Autel dédié à quelque entité oubliée (esprit ancestral, ange, démon, dieu ancien, divinité oubliée, entité extérieure ou esprit de la nature)"
  ],
  [
    "Blight - place where nothing grows, place where everything is dying / slowly expanding",
    "Zone de flétrissure — terre où rien ne pousse ou où tout se meurt lentement en s’étendant"
  ],
  [
    "Campsite (bandit, hunter, slaver, traveler)",
    "Campement actif ou récent (bandits, chasseurs, esclavagistes ou voyageurs)"
  ],
  [
    "Cave - hideout (as hideout), monster lair, path to (giant mushroom forest, hidden valley, hollow earth, through the great barrier, underground city, underworld)",
    "Caverne — repaire, tanière de monstre ou passage vers une forêt de champignons géants, une vallée cachée, une cité souterraine ou les profondeurs"
  ],
  [
    "Circle of mushrooms (fairy circle)",
    "Cercle de champignons (rond de fées)"
  ],
  [
    "Circle of stones",
    "Cercle de pierres dressées"
  ],
  [
    "Collocation (environment) - area occasionally switches from one environment to another. Ex forest to desert, plains to sea, mountain to valley, etc / random, set event, set trigger",
    "Anomalie spatiale (environnement) — la zone bascule périodiquement d’un biome à un autre (forêt vers désert, plaine vers mer, montagne vers vallée) selon un déclencheur ou aléatoirement"
  ],
  [
    "Collocation (structure) - structure occasionally appears & vanishes in area / random, set event, set trigger",
    "Anomalie spatiale (structure) — un bâtiment apparaît et disparaît périodiquement dans la zone"
  ],
  [
    "Frozen area in a desert or tropical jungle",
    "Étendue gelée en plein désert ou jungle tropicale"
  ],
  [
    "Garden or Orchard in the middle of a hostile environment (arctic, desert, wasteland)",
    "Jardin ou verger entretenu au cœur d’un milieu hostile (arctique, désert ou terres désolées)"
  ],
  [
    "Garden or Orchard in the middle of the wilderness",
    "Jardin ou verger caché en pleine nature sauvage"
  ],
  [
    "Gateway - portal to (another location on the current world, another plane of existence)",
    "Portail — passage menant vers une autre région du monde ou vers un autre plan d’existence"
  ],
  [
    "Giant Remains (recent, decaying, skeletal, carapace, shell) / (dragon, deity, demon, kaiju, monster, outsider)",
    "Restes géants (récents, en décomposition, squelettiques ou carapace) de dragon, divinité, démon, monstre colossal ou entité extérieure"
  ],
  [
    "Giant Remains (skull, helmet, weapon)",
    "Restes géants (crâne, heaume ou arme monumentale)"
  ],
  [
    "Giant Tree Stump",
    "Souche d’arbre titanesque"
  ],
  [
    "Green & lush area in an arctic region",
    "Oasis verdoyante et luxuriante en pleine région arctique"
  ],
  [
    "Hermit dwelling - built their house in the middle of nowhere to get away from it all",
    "Demeure d’ermite — bâtie au milieu de nulle part pour fuir le monde"
  ],
  [
    "Hideout - criminal, necromancer, pirate, rebel, rum runner, smuggler",
    "Repaire clandestin — criminels, nécromancien, pirates, rebelles ou contrebandiers"
  ],
  [
    "Historical / Famous - monument, structure, or location",
    "Lieu historique ou célèbre — monument, ruine ou site mémorable"
  ],
  [
    "Mage Dwelling - Possible Mage Dwellings",
    "Demeure de mage — tour, manoir isolé ou laboratoire arcanique"
  ],
  [
    "Magic Pools - amplify magic (type), healing, potion effect, restore mana, scrying pool, speed growth of (animals, plants)",
    "Bassins magiques — amplifient un type de magie, soignent, reproduisent l’effet d’une potion, restaurent le mana, permettent la scrutation ou accélèrent la croissance des plantes/animaux"
  ],
  [
    "Meteor Impact - causes (plants, fungi) to grow out of control, crater exposes a (cave system, crystal, kaiju, mineral vein, monster), made of strange mineral, meteor is a crystal with (angel, artifact, deity, demon, egg, monster, outsider, seed, ship) trapped within, meteor is a (angel, artifact, deity, demon, egg, giant weapon, golem, kaiju, monster, outsider, seed, ship), monsters swarm out of crater, mutates animals or plants near it",
    "Impact de météore — provoque une croissance incontrôlée de plantes/champignons, révèle une grotte ou un filon étrange, libère des monstres ou mute la faune et la flore alentour"
  ],
  [
    "Mine - abandoned, collapsed, monster infested, unknown (crystals, minerals)",
    "Mine — abandonnée, effondrée, infestée de monstres ou riche en cristaux et minerais inconnus"
  ],
  [
    "Monolith - (absorbs, amplifies) magic, drains (magic items, mana), glowing runes, grants visions to those who touch it, humming with power, pictographs, recharges (magic items, mana), repels (animals, magic, monsters, spirits, undead), runes, unknown material",
    "Monolithe — absorbe ou amplifie la magie, draine ou recharge les objets magiques, luit de runes, accorde des visions au toucher ou repousse certaines créatures"
  ],
  [
    "Outpost",
    "Avant-poste militaire ou frontalier"
  ],
  [
    "Pillar of (fire, light, lightning)",
    "Pilier de feu, de lumière ou de foudre"
  ],
  [
    "Places of Power - amplified magic (type), fast mana recovery, makes extremely powerful (rituals, spells) possible",
    "Lieu de Pouvoir — magie amplifiée, récupération rapide de mana, rend possibles de puissants rituels ou sortilèges"
  ],
  [
    "Ruins - castle, city, fort, temple, tomb, tower, vault / (advanced, primitive) civilization, flooded, half buried, overgrown, sunken, underground",
    "Ruines — château, cité, fort, temple, tombeau, tour ou caveau d’une civilisation avancée ou primitive (inondées, envahies, enfouies ou souterraines)"
  ],
  [
    "Shipwreck - airship, famous missing ship, river boat, seafaring ship / frozen in ice, in the middle of a desert, leagues from water, on a mountain top",
    "Épave — aéronef, navire disparu célèbre, bateau fluvial ou vaisseau maritime pris dans les glaces, échoué en plein désert ou au sommet d’une montagne"
  ],
  [
    "Shrine",
    "Sanctuaire isolé"
  ],
  [
    "Statue - dormant (elemental, giant, god, monster), giant statue from a bygone age, native totem, transformed being or creature",
    "Statue — élémentaire, géant, dieu ou monstre endormi, colosse d’un âge révolu, totem tribal ou être pétrifié"
  ],
  [
    "Temple d100 Temples & Monasteries",
    "Temple ou monastère isolé"
  ],
  [
    "Territory Marker - bandit, monster, spell caster, tribal",
    "Marqueur de territoire — bandits, monstre, lanceur de sorts ou tribu"
  ]
];

export type GoodOutcomeKey =
  | "creature"
  | "animal"
  | "classMaster"
  | "human"
  | "environment"
  | "weather"
  | "foraging";

export type NeutralOutcomeKey =
  | "creature"
  | "animal"
  | "human"
  | "environment"
  | "weather"
  | "nothing"
  | "foraging";

export type BadOutcomeKey =
  | "human"
  | "creature"
  | "animal"
  | "trap"
  | "environment"
  | "weather";

export const GOOD_OUTCOME_POOL: readonly GoodOutcomeKey[] = [
  "creature",
  "animal",
  "classMaster",
  "human",
  "environment",
  "weather",
  "foraging",
] as const;

export const NEUTRAL_OUTCOME_POOL: readonly NeutralOutcomeKey[] = [
  "creature",
  "animal",
  "human",
  "environment",
  "weather",
  "nothing",
  "foraging",
] as const;

export const BAD_OUTCOME_POOL: readonly BadOutcomeKey[] = [
  "human",
  "creature",
  "animal",
  "trap",
  "environment",
  "weather",
] as const;

export const OUTCOME_CATEGORY_LABELS: Record<
  GoodOutcomeKey | NeutralOutcomeKey | BadOutcomeKey,
  LocalizedText
> = {
  creature: { en: "Creature", fr: "Créature" },
  animal: { en: "Animal", fr: "Animal" },
  classMaster: { en: "Class Master", fr: "Maître de classe" },
  human: { en: "Human Encounter", fr: "Rencontre humaine" },
  environment: { en: "Environment", fr: "Environnement" },
  weather: { en: "Weather", fr: "Météo" },
  foraging: { en: "Foraging", fr: "Récolte" },
  nothing: { en: "Nothing Happens", fr: "Rien ne se passe" },
  trap: { en: "Trap", fr: "Piège" },
};

export const WITCHER_CLASSES: readonly BilingualTuple[] = [
  ["Craftsman", "Artisan"],
  ["Bard", "Barde"],
  ["Criminal", "Criminel"],
  ["Doctor", "Docteur"],
  ["Armsman", "Homme d’arme"],
  ["Mage", "Mage"],
  ["Merchant", "Marchand"],
  ["Priest", "Prêtre"],
  ["Witcher", "Sorceleur"],
];

export const MONSTER_DIFFICULTIES: {
  easy: LocalizedText;
  medium: LocalizedText;
  hard: LocalizedText;
} = {
  easy: { en: "Easy Monster", fr: "Monstre facile (Easy)" },
  medium: { en: "Medium Monster", fr: "Monstre moyen (Medium)" },
  hard: { en: "Hard Monster", fr: "Monstre difficile (Hard)" },
};

export const CARAVAN_DETAIL: LocalizedText = {
  en: "A passing merchant caravan.",
  fr: "Une caravane marchande de passage.",
};

export const DISPOSITION_ATTRIBUTIONS: Partial<
  Record<EncounterDisposition, { author: string; url?: string }>
> = {};
