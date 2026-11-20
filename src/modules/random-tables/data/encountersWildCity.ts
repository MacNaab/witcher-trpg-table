import type { BilingualTuple } from "../types";

/**
 * Data pools for Wilderness, City, Small Town, and Travel Obstacles (Tables 13, 14, 16, 17).
 */

export const T13_WILDERNESS_ENCOUNTERS: readonly BilingualTuple[] = [
  [
    "You hear suspicious sound, but when you check it out, it turns out to be a young doe, caught in the hunter's trap.",
    "Vous entendez un son suspect, mais lorsque vous le vérifiez, il s'agit d'une jeune biche, prise au piège du chasseur."
  ],
  [
    "The path you're walking on intersects with another, clearly more animal than human made. You see few drops of blood, and what appears to be humanoid tracks on it.",
    "Le chemin sur lequel vous marchez croise un autre, clairement plus animal qu'humain. Vous voyez quelques gouttes de sang et ce qui semble être des traces humanoïdes dessus."
  ],
  [
    "You find small spring flowing from underneath a rock. When you drink from it, you feel strangely invigorated.",
    "Vous trouvez une petite source qui coule de dessous un rocher. Lorsque vous en buvez, vous vous sentez étrangement revigoré."
  ],
  [
    "You find a long-abandoned cabin, with no signs of recent dwellers. Perhaps you can find something useful among all the rubbish.",
    "Vous trouvez une cabane abandonnée depuis longtemps, sans aucun signe d'habitants récents. Peut-être pouvez-vous trouver quelque chose d'utile parmi toutes les ordures."
  ],
  [
    "The party walks upon a nest of the rare bird. It's eggs would be worth quite a sum, but their mother does whatever she can to scare adventurers away.",
    "Le groupe marche sur un nid de l'oiseau rare. Ces œufs valent une somme considérable, mais leur mère fait tout ce qu'elle peut pour effrayer les aventuriers."
  ],
  [
    "A scarecrow (clearly abandoned) lies slumped by the roadside. It’s clothes are ragged and it’s falling apart at the seams. For those inclined to sense such things, there is a small trace of magic surrounding the object.",
    "Un épouvantail (clairement abandonné) est affalé au bord de la route. Ses vêtements sont en lambeaux et ils s’effondrent au niveau des coutures. Pour ceux qui sont enclins à ressentir de telles choses, il y a une petite trace de magie autour de l'objet."
  ],
  [
    "A stag shadows and stares unblinking at the party but vanishes if they try to follow it.",
    "Un cerf ombres et fixe la fête sans ciller mais disparaît s'ils essaient de la suivre."
  ],
  [
    "A row of brambles have grown up across the path, there is a narrow gap that small animals have been using but it is far too small for the players.",
    "Une rangée de ronces s'est formée sur le chemin, il y a un espace étroit que les petits animaux ont utilisé mais il est beaucoup trop petit pour les joueurs."
  ],
  [
    "You see an old cairn a ways off to the side. It's weathered surface displays the name of a long lost elf. Detect Magic gives off an aura of Enchantment, but it is heavily flawed from the passage of time. Touching it makes you forget the last 5 seconds.",
    "Vous voyez un vieux cairn sur le côté. Sa surface altérée affiche le nom d'un elfe perdu depuis longtemps. Détecter la magie dégage une aura d'enchantement, mais elle est fortement imparfaite avec le passage du temps. Le toucher fait oublier les 5 dernières secondes."
  ],
  [
    "A roaming band of paladins trots down the path on their spectral steeds at magical speed expecting any and all to get out of the way. If the party doesn't move, the ghostly mounts move right through them. The last paladin in line kicks a party member and laughs. They are out of sight before initiative can be rolled.",
    "Une bande itinérante de paladins trotte le long du chemin sur leurs destriers spectraux à une vitesse magique, s'attendant à ce que tout le monde s'écarte du chemin. Si le groupe ne bouge pas, les montures fantomatiques les traversent. Le dernier paladin en ligne donne un coup de pied à un membre du groupe et rit. Ils sont hors de vue avant que l'initiative puisse être lancée."
  ],
  [
    "There are some extra large crickets in this field for some reason. They rub up against your shins as you pass through the grasses.",
    "Il y a des grillons très gros dans ce domaine pour une raison quelconque. Ils frottent contre vos tibias lorsque vous traversez les herbes."
  ],
  [
    "For the past hour, you've had the sensation you were being followed. Perception and investigation only really allow you a fleeting glimpse of something small and furry. An animal handling check reveals the creature as a timid skeleton cat. It mimes it's previous life activities.",
    "Depuis une heure, vous avez la sensation d'être suivi. La perception et l'enquête ne vous permettent vraiment qu'un aperçu fugitif de quelque chose de petit et de poilu. Un test de manipulation des animaux révèle la créature comme un chat squelette timide. Il mime ses activités de vie antérieures."
  ],
  [
    "The party stumbles upon a small patch of unusual mushrooms. They are unable to identify them unless they roll a natural 20 intelligence. If the party eat them, they trip hard for 12 hours. Any character who eats them may have one of the following temporary (for one adventure) effects (d6) when they come to: 1 they're blue, 2 they have forgotten Common, but are now fluent in another language, 3 they are nonviolent, 4 they are insatiably hungry/thirsty/horny, 5 they feel horrific and are deeply depressed, 6 they feel great, they have seen the light and can reroll any one dice in this adventure",
    "La fête tombe sur une petite parcelle de champignons inhabituels. Ils sont incapables de les identifier à moins d'avoir obtenu une intelligence naturelle de 20. Si le groupe les mange, ils trébuchent pendant 12 heures. Tout personnage qui les mange peut avoir l'un des effets temporaires (pour une aventure) (d6) suivants: 1 ils sont bleus, 2 ils ont oublié le commun, mais parlent maintenant couramment une autre langue, 3 ils sont non violents , 4 ils ont une faim insatiable / soif / excité, 5 ils se sentent horribles et sont profondément déprimés, 6 ils se sentent bien, ils ont vu la lumière et peuvent relancer n'importe quel dés dans cette aventure."
  ],
  [
    "A young girl dressed as a druid runs frantically out into the path shouting for help. Her animal companion has become mired in quicksand and she cannot get them out. If the party rescues the animal, she will reward them with some homemade herbal healing potions.",
    "Une jeune fille habillée en druide court frénétiquement dans le chemin en criant à l'aide. Son compagnon animal s'est embourbé dans les sables mouvants et elle ne peut pas les sortir. Si le groupe sauve l'animal, elle le récompensera avec des potions de guérison à base de plantes maison."
  ],
  [
    "A tumbleweed passes by",
    "Un virevoltant passe."
  ],
  [
    "Strong winds pick up and you must seek shelter",
    "Les vents forts se lèvent et vous devez chercher un abri."
  ],
  [
    "You heard loud cawing. A flock (murder) of crows watches you intently. As you continue on, they follow you, alerting the area to your passing with their caws",
    "Vous avez entendu des croassements bruyants. Un troupeau (meurtre) de corbeaux vous regarde attentivement. Au fur et à mesure que vous continuez, ils vous suivent, alertant la zone de votre passage avec leurs crocs"
  ],
  [
    "You encounter 2 bear cubs climbing a tree. Mother bear isn’t visible (yet). Intelligence or wisdom would lead a player to move on before she arrives",
    "Vous rencontrez 2 oursons grimpant à un arbre. La mère ours n'est pas (encore) visible. L'intelligence ou la sagesse conduiraient un joueur à passer à autre chose avant son arrivée"
  ],
  [
    "You come upon a clearing with many colorful wildflowers. In the center of the clearing is the body of an orc, slumped over. (The flowers can paralyze, CON save)",
    "Vous tombez sur une clairière avec de nombreuses fleurs sauvages colorées. Au centre de la clairière se trouve le corps d'un orc, affalé. (Les fleurs peuvent paralyser, économiser CON)"
  ],
  [
    "A smouldering ring of ash glows gently in the middle of a nearby patch of grass. Any attempts to put out the embers with water only results in steam. Faint Evocation magic can be detected here.",
    "Un anneau de cendres fumantes brille doucement au milieu d'une parcelle d'herbe à proximité. Toute tentative d'éteindre les braises avec de l'eau ne produit que de la vapeur. La magie d'évocation faible peut être détectée ici."
  ],
  [
    "An elderly vagrant approaches the party and asks for a few gold pieces. When questioned, his dog has been confiscated by the local guard for causing a disturbance, and he needs to pay the 20 gold penalty in order to get it back.",
    "Un vagabond âgé s'approche de la fête et demande quelques pièces d'or. Interrogé, son chien a été confisqué par le garde local pour avoir provoqué des troubles et il doit payer la pénalité de 20 pièces d'or pour le récupérer."
  ],
  [
    "An arrow pins a fresh wanted poster to a tree. The portrait on the poster looks vaguely similar to one of the party members, but relates to crimes committed in a city they’ve never been to before.",
    "Une flèche épingle une nouvelle affiche recherchée sur un arbre. Le portrait sur l'affiche ressemble vaguement à l'un des membres du parti, mais se rapporte à des crimes commis dans une ville où ils ne sont jamais allés auparavant."
  ],
  [
    "A parade of large ants stretch across the path ahead of the party, each carrying a gold coin in their mandibles. Following the line of ants backwards, the party find a split bag of gold coins stashed underneath a weather-beaten log.",
    "Un défilé de grosses fourmis s'étend sur le chemin devant la fête, chacune portant une pièce d'or dans ses mandibules. En suivant la ligne des fourmis à l'envers, le groupe trouve un sac fendu de pièces d'or caché sous une bûche battue par les intempéries."
  ],
  [
    "A Druid approaches you. They sell multiple types of mushrooms",
    "Un druide s'approche de vous. Ils vendent plusieurs types de champignons"
  ],
  [
    "You pass another group of adventurers. Their party is the same size, the races and apparent genders are the same, the same number of mounts, etc., but each is in a different combination. If you attempt communication they become wary and run.",
    "Vous croisez un autre groupe d'aventuriers. Leur groupe est de la même taille, les races et les sexes apparents sont les mêmes, le même nombre de montures, etc., mais chacun est dans une combinaison différente. Si vous tentez de communiquer, ils deviennent méfiants et courent."
  ],
  [
    "You heard some rumbling noises, if the party investigates, there are two dangerous wild animal fighting they dont pay attention to the group.",
    "Vous avez entendu des bruits de grondement, si le groupe enquête, il y a deux animaux sauvages dangereux qui se battent, ils ne font pas attention au groupe."
  ],
  [
    "The party wanders into an area of mud that functions like quicksand, only it is based on noise. Any creature in it sinks at a very slow rate, but any sound they make causes them to sink faster.",
    "La fête se promène dans une zone de boue qui fonctionne comme des sables mouvants, mais elle est basée sur le bruit. Toute créature qui s'y trouve coule à un rythme très lent, mais tout son qu'elle émet les fait couler plus rapidement."
  ],
  [
    "The path you are on goes down and then up the side of a fifteen foot stream ravine. The soil is very slippery however. Make Acrobatics or Athletics checks (DC 20) to avoid slipping and falling. (Party can gain advantage by lowering others down with a rope or by using walking stalves) (failure means 1d6 fall damage.) (Fail by more than 10 gets 2d6 fall damage)",
    "Le chemin sur lequel vous vous trouvez descend puis remonte le long d'un ravin de 15 pieds. Le sol est cependant très glissant. Faites des tests d'acrobatie ou d'athlétisme (DD 20) pour éviter de glisser et de tomber. (Le groupe peut gagner un avantage en abaissant les autres avec une corde ou en utilisant des piliers qui marchent) (l'échec signifie 1d6 dégâts de chute.) (Un échec de plus de 10 entraîne 2d6 dégâts de chute)"
  ],
  [
    "A pack of wild blink dogs can be heard barking. Upon inspection the group finds they have treed a medium sized cat with oddly colored eyes. Upon rescuing the cat it thanks the group and hacks up a large furball that when placed on trail they were walking will confuse any pursuers causing them to walk around the furball and lose the trail and the group.",
    "Une meute de chiens sauvages clignant des yeux peut être entendu aboyer. Après inspection, le groupe découvre qu'ils ont arboré un chat de taille moyenne aux yeux étrangement colorés. En sauvant le chat, il remercie le groupe et pirate une grosse boule de poils qui, lorsqu'elle est placée sur la piste, confondra les poursuivants, les faisant marcher autour de la boule de poils et perdre la piste et le groupe."
  ],
  [
    "A strong wind suddenly blows, rustling the trees and causing many leaves to be dislodged from their branches. Any unsecured paper or hats may be blown off nearby, the party maybe will now have an easier time foraging for fallen fruit, and the roads will be a bit muddier for the rest of the day.",
    "Un vent fort souffle soudainement, bruissant les arbres et provoquant le délogement de nombreuses feuilles de leurs branches. Tout papier ou chapeau non sécurisé peut être emporté à proximité, la fête aura peut-être plus de facilité à chercher les fruits tombés et les routes seront un peu plus boueuses pour le reste de la journée."
  ],
  [
    "You find the remains of a wooden crate half destroyed on the side of the road, that looks like it fell out of a cart. Upon inspection you will find a few kegs of medium quality ale, and two miniature barrels of high quality fortified wine. There is a shopkeeper’s stamp on the crate from a nearby city, and the shopkeeper will be thankful if the party returns the wine. You can introduce an important NPC this way.",
    "Vous trouvez les restes d'une caisse en bois à moitié détruite sur le bord de la route, qui semble être tombée d'une charrette. Après inspection, vous trouverez quelques fûts de bière de qualité moyenne et deux fûts miniatures de vin fortifié de haute qualité. Il y a un tampon du commerçant sur la caisse d'une ville voisine, et le commerçant sera reconnaissant si la partie retourne le vin. Vous pouvez présenter un PNJ important de cette façon."
  ],
  [
    "Roll a die for the amount of party members you have. Someone gets pooped on by a bird flying overhead.",
    "Lancez un dé pour le nombre de membres du groupe que vous avez. Quelqu'un se fait caca par un oiseau volant au-dessus de sa tête."
  ],
  [
    "There are quite a lot of arrows embedded into the trees and ground in this area. A scrap of cloth flutters in the wind, pinned to a tree.",
    "Il y a pas mal de flèches incrustées dans les arbres et le sol dans cette zone. Un bout de tissu flotte dans le vent, épinglé à un arbre."
  ],
  [
    "Deep from the forest, a deep crimson light flashes briefly, illuminating the forest tree line in the color of blood, then disappears. All nearby birds take flight, obviously spooked. Any party member looking in the general direction of the flash has ominous chills driven down their spine, and make a check not to be frightened.",
    "Au plus profond de la forêt, une lumière cramoisie profonde clignote brièvement, illuminant la limite des arbres de la forêt de couleur sang, puis disparaît. Tous les oiseaux à proximité prennent leur envol, visiblement effrayés. Tout membre du groupe regardant dans la direction générale du flash a des frissons menaçants le long de sa colonne vertébrale et fait un chèque pour ne pas avoir peur."
  ],
  [
    "Flying. Frigging. Monkeys.",
    "En volant. Frigging. Singes."
  ],
  [
    "Trees that just scold the players for no reason",
    "Des arbres qui grondent les joueurs sans raison"
  ],
  [
    "Bees. But like. Multicolored",
    "Les abeilles. Mais comme. Multicolore"
  ],
  [
    "A random tent owned by a nice troll",
    "Une tente aléatoire appartenant à un gentil troll"
  ],
  [
    "A flower bed with a sleeping NPC",
    "Un parterre de fleurs avec un PNJ endormi"
  ],
  [
    "Just a totally regular boulder. In the middle of the forest. Yeah.",
    "Juste un rocher totalement régulier. Au milieu de la forêt. Ouais."
  ],
  [
    "The party stumbles across a hole in the ground that when things jump in they immediately reappear next to the hole again.",
    "Le groupe tombe sur un trou dans le sol qui, lorsque les choses sautent, réapparaît immédiatement à côté du trou."
  ],
  [
    "A group of vultures is circling high above the tree line. They appear to be slowly descending to the ground. The remains of a large hoofed animal can be found in a clearing under the circling carrion birds.",
    "Un groupe de vautours tourne au-dessus de la limite des arbres. Ils semblent descendre lentement au sol. Les restes d'un gros animal à sabots peuvent être trouvés dans une clairière sous les oiseaux charognards qui tournent autour."
  ],
  [
    "A novice wizard is attempting to learn telekinesis and attempting to practice the spell on a large stone. A wizard can see that the arcane runes in the spell are completely wrong.",
    "Un sorcier novice tente d'apprendre la télékinésie et tente de pratiquer le sort sur une grosse pierre. Un sorcier peut voir que les runes arcanes du sort sont complètement fausses."
  ],
  [
    "A young person is practicing firing a crossbow at a tree that has a freshly, hand-painted target. His aim is quite good.",
    "Un jeune s'entraîne à tirer avec une arbalète sur un arbre qui a une cible fraîchement peinte à la main. Son objectif est plutôt bon."
  ],
  [
    "A brash individual is riding through the forest, whistling tunelessly to himself as if he had no cares in the world. The garb makes the individual look fairly affluent.",
    "Un individu impétueux traverse la forêt, sifflant sans accord pour lui-même comme s'il ne se souciait pas du monde. Le costume donne à l'individu un aspect assez riche."
  ],
  [
    "As the party lights a campfire all of the trees in their immediate area shudder. With a perception check, the party will notices that all of the trees are leaning away from their camp.",
    "Alors que la fête allume un feu de camp, tous les arbres de leur zone immédiate tremblent. Avec un contrôle de perception, le groupe remarquera que tous les arbres se penchent loin de leur camp."
  ],
  [
    "The party hear giggling and hushed whispers nearby. Upon investigation the party will find a couple who seem to have entered the forest for a tryst.",
    "Le groupe entend des rires et des chuchotements étouffés à proximité. Après enquête, le groupe trouvera un couple qui semble être entré dans la forêt pour un rendez-vous amoureux."
  ],
  [
    "A dry river bed, If searched they find a hand of a skeleton with a magic ring on it.",
    "Un lit de rivière asséché, si fouillé, ils trouvent une main d'un squelette avec un anneau magique dessus."
  ],
  [
    "A large group of various forest animals runs past the group. smoke can be seen and smelled in the air. moments later the forest in front of the party erupts in flames. Either run or put the fire out or I guess continue walking through the burning woods.",
    "Un grand groupe de divers animaux de la forêt passe devant le groupe. la fumée peut être vue et sentie dans l'air. quelques instants plus tard, la forêt devant la fête éclate en flammes. Soit courir, soit éteindre le feu, soit continuer à marcher dans les bois en feu."
  ],
  [
    "A horse and wagon tied to a tree. The horse is owned by a hunter that is out tracking a deer a couple miles away.",
    "Un cheval et une charrette attachés à un arbre. Le cheval appartient à un chasseur qui traque un cerf à quelques kilomètres de là."
  ],
  [
    "The party stumbles upon a druid mumbling to himself as he or she is mixing a potion at a small camp fire. Before the party can do anything the Druid accidentally spills the entire potion. They watch as the druid and the area around the small camp slowly gets turned into a massive tree reaching well over the forest.",
    "Le groupe tombe sur un druide qui marmonne pour lui-même alors qu'il ou elle mélange une potion à un petit feu de camp. Avant que la fête ne puisse faire quoi que ce soit, le druide renverse accidentellement la potion entière. Ils regardent le druide et la zone autour du petit camp se transformer lentement en un arbre massif atteignant bien la forêt."
  ],
  [
    "They come upon a wide stream a few feet deep. water rushes past. a fallen tree lays across resting on the banks. a successful DEX check to cross without falling in. If failed they fall into the water a successful perception check and they catch a glimpse of something shiny they kicked up as they fell in. Gold, Silver, Magic item, your choice.",
    "Ils tombent sur un large ruisseau de quelques mètres de profondeur. l'eau se précipite. un arbre tombé repose sur les rives. un test DEX réussi pour traverser sans tomber. En cas d'échec, ils tombent à l'eau, un contrôle de perception réussi et ils aperçoivent quelque chose de brillant qu'ils ont lancé en tombant. Or, argent, objet magique, votre choix."
  ],
  [
    "Two lost brothers from a nearby village. They ran away after their parents gave them a scolding, but lost their way and don't know the way back.",
    "Deux frères perdus d'un village voisin. Ils se sont enfuis après que leurs parents les aient réprimandés, mais ont perdu leur chemin et ne savent pas le chemin du retour."
  ],
  [
    "A circle of stones 10ft wide. after stepping in the circle you realize no sound can leave the circle.",
    "Un cercle de pierres de 10 pieds de large. après avoir marché dans le cercle, vous réalisez qu'aucun son ne peut quitter le cercle."
  ],
  [
    "A small water trough being filled by a spring. Various animals come to drink from it throughout the day and night.",
    "Un petit abreuvoir alimenté par une source. Divers animaux viennent s’y désaltérer tout au long du jour et de la nuit."
  ],
  [
    "One member of the party runs into something invisible. A tree! If climbed they can find two invisible fruits with a successful investigation check. If eaten the member becomes invisible for 1 hour. Once picked you have a week before the fruit goes bad.",
    "Un membre du groupe se heurte à quelque chose d’invisible : un arbre ! En y grimpant, un jet d’Investigation réussi permet de découvrir deux fruits invisibles. Quiconque en mange devient invisible pendant 1 heure. Une fois cueillis, les fruits pourrissent au bout d’une semaine."
  ],
  [
    "An awakened shrub that is too afraid to leave the area on its own but desperately wishes to be taken to a small hill that overlooks a picturesque babbling brook that he overheard a group of travelers speak of on the other side of the forest.",
    "Un arbuste éveillé, trop effrayé pour quitter l’endroit seul, qui supplie le groupe de le transporter jusqu’à une petite colline surplombant un ruisseau pittoresque dont il a entendu des voyageurs parler de l’autre côté de la forêt."
  ],
  [
    "A face carved into a tree/cliff face. Insulting it will make it cry. Flowers will make it sneeze and kissing, licking or breathing on it at close range will make it warp and disappear to the faint sound of a female voice singing, accompanied by a lute. Whilst the face is there, it will emit a faint magical aura which causes a momentary sorrow in the heart of those who has detect it.",
    "Un visage sculpté dans un arbre ou une paroi rocheuse. L’insulter le fait pleurer, des fleurs le font éternuer, et l’embrasser, le lécher ou souffler dessus de près le fait se déformer et disparaître au son lointain d’une voix féminine accompagnée d’un luth. Tant que le visage est présent, il émet une faible aura magique qui insuffle une mélancolie passagère à ceux qui la détectent."
  ],
  [
    "A large turtle with a blue-gray shell with lightning-like patterns on it. If detected, the turtle has a faint aura of storm (air+lightning) magic. 1d4×3 minutes after encountering the turtle, it begins to thunder. With enough time, it's able to be found out that the turtle's aura and shell can predict the weather.",
    "Une grande tortue à la carapace gris-bleu striée de motifs semblables à des éclairs. Si elle est analysée, elle dégage une faible aura de magie d’orage (air et foudre). 1d4×3 minutes après la rencontre, le tonnerre commence à gronder. Avec un peu d’observation, on comprend que son aura et sa carapace annoncent la météo."
  ],
  [
    "A necromancer traveling with 3 animated skeletons. They're all carrying decently-large bags. If questioned, the necromancer reveals she is bringing an assortment of supplies to another wizard she's been working with. She assures the party that the skeletons will do no harm, and are only to assist with travel.",
    "Une nécromancienne voyageant avec 3 squelettes animés portant chacun d’imposants sacs. Si on l’interroge, elle révèle qu’elle livre des fournitures à un autre sorcier avec lequel elle collabore et assure que ses squelettes sont parfaitement inoffensifs et ne servent qu’au portage."
  ],
  [
    "A big wolf runs past the party battered and beaten being chased by smaller wolves. If initiative is started and the party saves the big wolf it’s revealed to be a polymorphism bard who gotten lost from his party.",
    "Un grand loup meurtri et couvert de blessures passe en courant devant le groupe, poursuivi par des loups plus petits. Si le combat s’engage et que le groupe sauve le grand loup, celui-ci se révèle être un barde métamorphosé ayant perdu la trace de ses compagnons."
  ],
  [
    "A sentient bunny darts out of the trees. It talks and has a heavy Brooklyn accent, along with a smokers hack. It asks the party to help him get rid of his lying, cheating brother. If the party does this, the rabbit gives them his brothers foot, which allows the reroll of a failed dice roll once per campaign.",
    "Un lapin doué de parole jaillit des fourrés. Il s’exprime avec un accent traînant de bas-fonds et une toux de fumeur invétéré. Il demande au groupe de l’aider à se débarrasser de son frère menteur et tricheur. En récompense, il leur remettra la patte de son frère, permettant de relancer un jet raté une fois par campagne."
  ],
  [
    "A bench by the side of a clearing dedicated to an explorers guild reads <<May this journal be guiding star to those who wander.>> A nearby tree hollow hides a journal documenting 3d4 other locations in the forest nearby signed and dated by various travelers (roll again on this table for each entry).",
    "Un banc en bordure de clairière dédié à une guilde d’explorateurs porte l’inscription : « Puisse ce journal guider les pas de ceux qui errent. » Un tronc creux voisin cache un carnet décrivant 3d4 autres lieux de la forêt signés et datés par divers voyageurs (tirez à nouveau sur cette table pour chaque mention)."
  ],
  [
    "In a hole in the ground there lived a hobbit... his name is Reggie and he is chopping firewood for his fireplace. His passtimes include eating, woodcarving, and juggling. Reggie will challenge friendly PCs to a juggling contest for clues to nearby forest denizens or treasures (roll again on this table for clues).",
    "Dans un trou du sol vivait un semi-homme… prénommé Reggie, occupé à fendre du bois pour sa cheminée. Ses passe-temps favoris sont la bonne chère, la sculpture sur bois et le jonglage. Il défiera volontiers des aventuriers amicaux à un concours de jonglage contre des indices sur les habitants ou trésors de la forêt (tirez à nouveau sur cette table pour les indices)."
  ]
];

export const T14_CITY_ENCOUNTERS: readonly BilingualTuple[] = [
  [
    "There's a loud crash, when a drunkard flies through the window of the nearby tavern. Another man walks out and yanks him up. Looks like the fight isn't over yet.",
    "Il y a un fracas fort, quand un ivrogne vole à travers la fenêtre de la taverne voisine. Un autre homme sort et le tire. On dirait que le combat n'est pas encore terminé."
  ],
  [
    "You hear laughs, some music and a high-pitched voice, when at the crossroads you see a colorful wagon. Gnomish tinkerer, who appears to own it, challenges passerbies to games of chance and contests of skill, offering common magic items as reward for lucky winners.",
    "Vous entendez des rires, de la musique et une voix aiguë, quand à la croisée des chemins vous voyez un wagon coloré. Le bricoleur gnome, qui semble le posséder, défie les passants à des jeux de hasard et à des concours d'adresse, offrant des objets magiques communs comme récompense pour les heureux gagnants."
  ],
  [
    "A kid cries nearby a big tree. It asks whomever walks by to help it get its kitten from the highest branch.",
    "Un enfant pleure près d'un grand arbre. Il demande à quiconque passe de l'aider à obtenir son chaton de la plus haute branche."
  ],
  [
    "There's a crowd at local plaza, surrounding town's gallows. There's an exexution ongoing. Guard captain reads aloud convict's crimes and people start murmuring. Apparently not everyone believes in prisoner's guilt.",
    "Il y a une foule sur la place locale, autour de la potence de la ville. Il y a une exécution en cours. Le capitaine de la garde lit à haute voix les crimes des condamnés et les gens commencent à murmurer. Apparemment, tout le monde ne croit pas à la culpabilité du prisonnier."
  ],
  [
    "During an evening walk, you hear a romantic poem being recited from nearby alley. A young man is singing praises to his mistress, who looks out of a window above him. Suddenly, doors of a building open and a big, red-faced man, either father or husband of the woman, emerges, seeming intent on giving the young Casanova a piece of his mind.",
    "Au cours d'une promenade nocturne, vous entendez un poème romantique récité depuis une ruelle voisine. Un jeune homme fait l'éloge de sa maîtresse, qui regarde par une fenêtre au-dessus de lui. Soudain, les portes d'un immeuble s'ouvrent et un grand homme au visage rouge, père ou mari de la femme, émerge, semblant résolu à donner au jeune Casanova une tranquillité d'esprit."
  ],
  [
    "A nimble thief steals a magic item from the party, It's a skill challenge as you race after the culprit.",
    "Un voleur agile vole un objet magique au groupe, c'est un défi de compétence alors que vous courez après le coupable."
  ],
  [
    "You see an old man seated on a cushion in a crowded market. He speaks in a low tone of mysterious tales to the children crowded around him.",
    "Vous voyez un vieil homme assis sur un coussin dans un marché bondé. Il parle à voix basse d'histoires mystérieuses aux enfants qui l'entourent."
  ],
  [
    "A corpse hangs from a nearby gallows. Some children are gathered round it and are throwing stones at the corpse. From the look of the corpse, it appears to have recently been executed.",
    "Un cadavre est suspendu à une potence voisine. Des enfants sont rassemblés autour et jettent des pierres sur le cadavre. D'après l'apparence du cadavre, il semble avoir été exécuté récemment."
  ],
  [
    "A small group of children nearby are throwing a rock from child to child. You hear glass shatter, and the children quickly disperse. A passed Perception/Intuition check will alert you to the imminent angry shop owner looking for who threw a rock through his window, demanding reparation from the first person he sees.",
    "Un petit groupe d'enfants à proximité jette une pierre d'enfant en enfant. Vous entendez le verre se briser et les enfants se dispersent rapidement. Un contrôle de Perception / Intuition réussi vous alertera du propriétaire du magasin en colère imminent à la recherche de qui a jeté une pierre par sa fenêtre, exigeant une réparation de la première personne qu'il voit."
  ],
  [
    "An old (wo/)man comes to your group and ask for help finding his/her home.",
    "Un vieil (femme) homme vient dans votre groupe et demande de l'aide pour trouver sa maison."
  ],
  [
    "You hear the mewing of an abandoned kitten in the alley.",
    "Vous entendez le miaulement d'un chaton abandonné dans la ruelle."
  ],
  [
    "Stray dogs rummage in the trash.",
    "Des chiens errants fouillent dans la poubelle."
  ],
  [
    "A falcon swoops down and grabs a pigeon.",
    "Un faucon descend et attrape un pigeon."
  ],
  [
    "A man juggles on a unicycle.",
    "Un homme jongle sur un monocycle."
  ],
  [
    "You see a member of a normally mostrous species dressed all ritzy and hobnobbing with human/demihuman members of high society as an equal.",
    "Vous voyez un membre d'une espèce normalement la plus nombreuse habillée tout chic et en train de jouer avec des membres humains / demi-humains de la haute société comme un égal."
  ],
  [
    "A cat waits beside the road, charging and nipping at the ankles and dresses of passerby (+5, 1d4-1 piercing)",
    "Un chat attend au bord de la route, chargeant et mordillant les chevilles et les robes du passant (piercing +5, 1d4-1)"
  ],
  [
    "A young woman shyly approaches the party and asks them to deliver a sealed letter to the blacksmith’s apprentice on the other side of town",
    "Une jeune femme s'approche timidement de le groupe et leur demande de remettre une lettre scellée à l'apprenti forgeron de l'autre côté de la ville"
  ],
  [
    "Children are chasing a stray dog, who appears to have something ties to their tail",
    "Les enfants poursuivent un chien errant, qui semble avoir quelque chose de lié à leur queue"
  ],
  [
    "Tiefling street performers sing and dance for coin",
    "Les artistes de rue Tiefling chantent et dansent pour la pièce"
  ],
  [
    "Drunk man mistakes a party member for a long lost lover/child/friend",
    "Un homme ivre confond un membre du groupe avec un amant / enfant / ami perdu depuis longtemps"
  ],
  [
    "You take a wrong turn down one of the grubbier alleys in an already grubby tangle of narrow streets. You keep going as surely you'll rejoin one of the main ginnels this connects to in a monument. But as you turn another corner through, kicking through the detritus and garbage of this dump of a cut-through, you are faced with a dead end. But at the end of this alley, against the lichen and moss covered brick of some ancient slop-house, leans an odd stone idol, its weathered and pitted form is surrounded by a perfect semi circle of silent rodents, insects and worms, all facing the statue, heads bowed into the muck. You had better find another way back to the street. The vermin gods despise pink bipedal apes.",
    "Vous prenez un mauvais virage dans l'une des ruelles les plus sales dans un enchevêtrement déjà sale de rues étroites. Vous continuez car vous rejoindrez sûrement l'un des principaux ginnels auxquels il se connecte dans un monument. Mais alors que vous prenez un autre virage, en passant à travers les détritus et les ordures de ce dépotoir d'une coupure, vous êtes confronté à une impasse. Mais au bout de cette allée, contre la brique couverte de lichen et de mousse d'une ancienne maison en pente, se penche une étrange idole de pierre, sa forme patinée et piquée est entourée d'un demi-cercle parfait de rongeurs silencieux, d'insectes et de vers, tous faisant face la statue, les têtes inclinées dans la boue. Tu ferais mieux de trouver un autre moyen de retourner dans la rue. Les dieux vermine méprisent les singes bipèdes roses."
  ],
  [
    "The PCs find evidence of a burglary in a jewelry store, and the owners seem very reluctant to contact the town guards; for a small reward, they're willing to pay for the location of the thieves in question.",
    "Les PJ trouvent des preuves d'un cambriolage dans une bijouterie, et les propriétaires semblent très réticents à contacter les gardes de la ville; pour une petite récompense, ils sont prêts à payer pour l'emplacement des voleurs en question."
  ],
  [
    "The town butchers are having what looks like some kind of rally behind w a warehouse. Judging from the rhetoric on offer, they're not going to have a peaceful protest within the next few days.",
    "Les bouchers de la ville organisent ce qui ressemble à une sorte de rassemblement derrière un entrepôt. À en juger par la rhétorique proposée, ils n'auront pas de manifestation pacifique dans les prochains jours."
  ],
  [
    "The constabulary give chase to a group of orphans, looking determined and with obvious hostile intention. For some reason, this doesn't feel like it should be happening in broad daylight.",
    "La gendarmerie donne la chasse à un groupe d'orphelins, l'air déterminé et avec une intention hostile évidente. Pour une raison quelconque, cela ne semble pas devoir se produire en plein jour."
  ],
  [
    "The inn where the PCs are staying is hosting a poetry reading by local bards; clever listeners can catch the secret code being given to select members of the audience.",
    "L'auberge où logent les PJ accueille une lecture de poésie par des bardes locaux; des auditeurs intelligents peuvent saisir le code secret donné à certains membres du public."
  ],
  [
    "Someone stole every wheel from the coaches and wagons parked within a three block radius of the palace; witnesses say that it was done by robed members of the guard, others that it was a group of beggars.",
    "Quelqu'un a volé toutes les roues des voitures et des wagons garés dans un rayon de trois pâtés de maisons du palais; des témoins disent que cela a été fait par des membres en robe de la garde, d'autres que c'était un groupe de mendiants."
  ],
  [
    "In an alley way, the PCs find a discarded set of clothes, enough for twelve or more people, all covered in a fine blue dust and smelling of seawater and fish blood; despite being inland by several hundred miles, it smells fresh and is still damp to the touch.",
    "D'une manière ruelle, les PJ trouvent un ensemble de vêtements mis au rebut, assez pour douze personnes ou plus, le tout recouvert d'une fine poussière bleue et sentant l'eau de mer et le sang de poisson; bien qu'il soit à l'intérieur des terres de plusieurs centaines de kilomètres, il sent le frais et est encore humide au toucher."
  ],
  [
    "A window is open with a lady changing. Whether the pcs look in the window or not a furious husband will come out threatening to call the law. He will however forget it for some gold.",
    "Une fenêtre est ouverte avec une dame en train de changer. Que les PC regardent dans la fenêtre ou non, un mari furieux sortira menaçant d'appeler la loi. Il l'oubliera cependant pour de l'or."
  ],
  [
    "A tug of war contest in the city Square. Winning team gets free lodging at a nice inn for a week.",
    "Un concours de tir à la corde sur la place de la ville. L'équipe gagnante est logée gratuitement dans une belle auberge pendant une semaine."
  ],
  [
    "A factory manager has quick work for a high profit. You dont find out until you arrive at the job site that you have to cross a picket line.",
    "Un directeur d'usine travaille rapidement pour un bénéfice élevé. Vous ne savez pas avant d'arriver sur le chantier que vous devez franchir une ligne de piquetage."
  ],
  [
    "A little girl had her teddy bear stolen by the local bullies. She needs someone to get it back.",
    "Une petite fille s'est fait voler son ours en peluche par les brutes locales. Elle a besoin de quelqu'un pour le récupérer."
  ],
  [
    "Fruit pickers of <<strong constitution>> are needed. The fruit is coated in a psychedelic substance that makes the pcs hallucinate.",
    "Des cueilleurs de fruits de «forte constitution» sont nécessaires. Le fruit est enrobé d'une substance psychédélique qui rend les pcs hallucinants."
  ],
  [
    "There's a fire! The city needs all hands to rush water to the burning houses.",
    "Il y a un feu! La ville a besoin de toutes les mains pour se précipiter vers les maisons en feu."
  ],
  [
    "A very drunk noble lost the diplomat he needed to impress in a drunken sloppy night on the town. He needs someone who's not so hungover to retrieve him. The diplomat has fallen in love with a prostitute and is about to forsake his family name",
    "Un noble très ivre a perdu le diplomate dont il avait besoin pour impressionner dans une nuit ivre bâclée en ville. Il a besoin de quelqu'un qui n'a pas la gueule de bois pour le récupérer. Le diplomate est tombé amoureux d'une prostituée et est sur le point d'abandonner son nom de famille"
  ],
  [
    "The lions escape from the zoo! Grab them before anyone gets hurt.",
    "Les lions s'échappent du zoo! Attrapez-les avant que quiconque ne soit blessé."
  ],
  [
    "A surgeon needs tools from the blacksmith for an emergency surgery! Someone honest and brave will have to grab them and tout the very valuable instruments across town.",
    "Un chirurgien a besoin des outils du forgeron pour une intervention chirurgicale d'urgence! Quelqu'un d'honnête et courageux devra les attraper et vanter les instruments très précieux à travers la ville."
  ],
  [
    "Two of a noble house’s guard run to you, asking if they have seen someone from their house. They explain that their charge had gone out to a tavern, and run off very drunk. The two guards ask you for help, promising payment for your aid.",
    "Deux des gardes d’une maison noble courent vers vous, vous demandant s’ils ont vu quelqu'un de leur maison. Ils expliquent que leur charge était allée dans une taverne et s'était enfuie très ivre. Les deux gardiens vous demandent de l'aide et vous promettent de payer votre aide."
  ],
  [
    "A small market is set up on a wide streetside. Trinkets and old clothing laid out on blanket-topped folding tables. Players can try to see if they can find any common magic items among the junk for sale.",
    "Un petit marché est installé sur une large rue. Bibelots et vieux vêtements disposés sur des tables pliantes recouvertes de couvertures. Les joueurs peuvent essayer de voir s'ils peuvent trouver des objets magiques communs parmi les déchets à vendre."
  ],
  [
    "There are overhanging windows two and three storeys above the street, which slopes on both sides into the gutter. A maid tosses bathwater into gutter from a top storey window, there's a dexterity check to avoid getting filthy water on your clothes.",
    "Il y a des fenêtres en surplomb de deux et trois étages au-dessus de la rue, qui s'inclinent des deux côtés dans la gouttière. Une femme de chambre jette l'eau du bain dans la gouttière depuis une fenêtre du dernier étage, il y a un contrôle de dextérité pour éviter de mettre de l'eau sale sur vos vêtements."
  ],
  [
    "A horse comes cantering past with a yelling man running after it. Anyone who can calm and capture the horse might get an excellent reward from the groom who lost it.... Or a hoof to the thigh if the horse won't calm down...",
    "Un cheval passe au galop avec un homme qui hurle après lui. Quiconque sait calmer et capturer le cheval pourrait obtenir une excellente récompense du marié qui l'a perdu ... Ou un sabot à la cuisse si le cheval ne se calme pas ..."
  ],
  [
    "You notice that the buildings in this neighborhood all have little shelves by the door, each one holding a glass of pink wine. As you approach one for a closer look, you suddenly see 2d4 pixies swarm out of nowhere and drink the wine. They hiss at you if you try to get too close. Later, you see more pixies vandalizing a house whose wine dish is empty. (Alt: swap the pink wine with blood for a darker aesthetic.)",
    "Vous remarquez que les bâtiments de ce quartier ont tous de petites étagères près de la porte, chacune contenant un verre de vin rose. Alors que vous vous en approchez pour regarder de plus près, vous voyez soudainement 2d4 lutins surgir de nulle part et boire le vin. Ils vous sifflent si vous essayez de vous approcher trop près. Plus tard, vous verrez plus de lutins vandaliser une maison dont le plat de vin est vide. (Alt: remplacez le vin rose par du sang pour une esthétique plus sombre.)"
  ],
  [
    "A foreign-looking warrior is arguing with a pair of town guard. The warrior is looking for an criminal she thinks is hiding in town but, after harassing the wrong person, the guards are kicking her out of the city. She'll try to get the players to search for her target.",
    "Un guerrier d'aspect étranger se dispute avec une paire de gardes de la ville. La guerrière cherche un criminel qu'elle pense se cacher en ville mais, après avoir harcelé la mauvaise personne, les gardes la chassent de la ville. Elle essaiera d'amener les joueurs à rechercher sa cible."
  ],
  [
    "A stranger of the character's desired gender seems to fall in love at first sight with one of the PC's. The stranger approaches and attempts to convince the PC to give their love a chance.",
    "Un inconnu du sexe souhaité par le personnage semble tomber amoureux à première vue de l'un des PC. L'étranger s'approche et tente de convaincre le PJ de donner une chance à leur amour."
  ],
  [
    "A young girl, appearing very frightened, is stuck up a scaffold. At the base of the structure, an agitated dog is barking ferociously up at her. She will call for help.",
    "Une jeune fille, paraissant très effrayée, est coincée sur un échafaudage. À la base de la structure, un chien agité lui aboie avec férocité. Elle appellera à l'aide."
  ],
  [
    "A baker is giving out free samples of a few new, experimental flavors of muffin he has cooked up.",
    "Un boulanger donne des échantillons gratuits de quelques nouvelles saveurs expérimentales de muffin qu'il a concoctées."
  ],
  [
    "A runaway wine barrel rolls down the street",
    "Un tonneau de vin en fuite roule dans la rue"
  ],
  [
    "A farmers flock / herd of (ducks / geese / pigs / sheep) got spooked on the way to the market. The animals are running down the streets in different directions. The farmer request anyone's help in getting them back.",
    "Un troupeau de fermiers / troupeau de (canards / oies / porcs / moutons) a été effrayé sur le chemin du marché. Les animaux courent dans les rues dans des directions différentes. Le fermier demande l'aide de n'importe qui pour les récupérer."
  ],
  [
    "They are holding an auction for the estate of an (adventurer / wizard). There could be some interesting items for sale.",
    "Ils organisent une vente aux enchères pour le domaine d'un (aventurier / sorcier). Il pourrait y avoir des articles intéressants à vendre."
  ],
  [
    "Three tiefling children in a cloak stumble out of a confectionery shop, arms and mouths full of sweets. As the shop owner shakes a soup ladel at them, the three scamper down an alley with their [obviously] ill gotten gains.",
    "Trois enfants cravates dans un manteau trébuchent hors d'une confiserie, les bras et la bouche pleins de bonbons. Alors que le propriétaire du magasin leur secoue une louche à soupe, les trois se précipitent dans une allée avec leurs gains [manifestement] mal acquis."
  ],
  [
    "A procession of musicians in brightly coloured garb spill out of an alleyway just in front of the party, blocking their path. Feel free to throw this one in the middle of a city chase for extra annoyance.",
    "Un cortège de musiciens vêtus de vêtements aux couleurs vives déborde d'une ruelle juste en face de le groupe, bloquant leur chemin. N'hésitez pas à lancer celui-ci au milieu d'une poursuite en ville pour plus de gêne."
  ],
  [
    "Two bards on opposite sides of the town square have a Bard-off, seeing who can gather the biggest audience.",
    "Deux bardes sur les côtés opposés de la place de la ville ont un Bard-off, voyant qui peut rassembler le plus grand public."
  ],
  [
    "A bard challenges one of the party members to a musical/poetic/flyting duel. For extra hilarity, have this bard focus on a non-bardic party member, even if the party bard looks obviously bardic.",
    "Un barde défie l'un des membres du groupe dans un duel musical / poétique / flyting. Pour plus d'hilarité, demandez à ce barde de se concentrer sur un membre du parti non bardique, même si le barde du parti a l'air manifestement bardique."
  ],
  [
    "A teenaged villager swaggers up to the party, looking for a confrontation as a group his friends shout encouragements from a distance.",
    "Un adolescent villageois se hâte à le groupe, à la recherche d'une confrontation alors qu'un groupe ses amis crient des encouragements à distance."
  ],
  [
    "As the party walks by a ajar door, they hear an oops followed by an explosion deeper within that shakes the street.",
    "Alors que le groupe passe devant une porte entrouverte, ils entendent un <<oups>> suivi d'une explosion plus profonde qui secoue la rue."
  ],
  [
    "Another adventurer attempts to woo a pair of ladies. One of them has enough, slaps him in the face and walks off in a huff.",
    "Un autre aventurier tente de courtiser une paire de femmes. L'un d'eux en a assez, le gifle au visage et repart en haletant."
  ],
  [
    "It's guild recruitment day. The members of various guilds set up stalls and stand at street corners handing out flyers and pitches, hoping to entice fresh blood to join.",
    "C'est le jour du recrutement de la guilde. Les membres de diverses guildes installent des stands et se tiennent au coin des rues pour distribuer des prospectus et des emplacements, dans l'espoir d'attirer du sang frais à se joindre."
  ],
  [
    "A comely lady/man of the night propositions one of the party members. You got to admit, their rates are affordable.",
    "Une belle dame / homme de la nuit propose l'un des membres du groupe. Vous devez admettre que leurs tarifs sont abordables."
  ],
  [
    "As the party enters the city, a sleazy man helpfully points out all of the brothels, seedy joints and all manners of sins and vices the party can partake in during their stay",
    "Alors que le groupe entre dans la ville, un homme sordide indique utilement tous les bordels, les joints minables et toutes les manières de péchés et de vices auxquels le groupe peut participer pendant son séjour."
  ],
  [
    "On a hot day, a <<battle>> breaks out between two uniformed groups. They are hurling balls of some substance that, upon impact, bursts open and splashes the target with refreshing water. While their “battle” looks competitive in nature, most players are laughing and enjoying themselves.",
    "Par une chaude journée, une «bataille» éclate entre deux groupes en uniforme. Ils lancent des balles d'une substance qui, lors de l'impact, éclate et éclabousse la cible avec de l'eau rafraîchissante. Alors que leur «bataille» semble de nature compétitive, la plupart des joueurs rient et s'amusent."
  ],
  [
    "A butterfly lands on a party member’s nose/shoulder/etc. A nearby guard identifies it as a somewhat rare member of its species and gives a surprisingly detailed rundown of the creature, to the shock of another guard.",
    "Un papillon atterrit sur le nez / l’épaule d’un membre du groupe, etc. Un garde à proximité l'identifie comme un membre assez rare de son espèce et donne un aperçu étonnamment détaillé de la créature, au choc d'un autre garde."
  ],
  [
    "The party is roped into a citywide relay race.",
    "Le parti est encordé dans une course de relais dans toute la ville."
  ],
  [
    "A citizen approaches the party and asks for assistance with a marriage proposal. Their request depends on the party’s composition; they may ask for a prayer from a cleric/paladin, or the rogue can sneak the ring onto a treat, or a spellcaster can make a nice effect when the question is popped, etc.",
    "Un citoyen s'approche de la fête et demande de l'aide pour une demande en mariage. Leur demande dépend de la composition du parti; ils peuvent demander une prière à un clerc / paladin, ou le voleur peut glisser l'anneau sur une friandise, ou un lanceur de sorts peut faire un bel effet lorsque la question est posée, etc."
  ],
  [
    "A snakeoil salesman hawking their wares calls upon the party and tries to get them to buy some product.",
    "Un vendeur d'huile de serpent colportant leurs marchandises appelle la partie et essaie de les amener à acheter un produit."
  ],
  [
    "A blind man with linens covering his eyes is begging across from a chapel or tavern. If the adventures drop a coin in his hat he thanks them in a way that could imply he isn't actually blind.",
    "Un aveugle avec des draps couvrant ses yeux mendie en face d'une chapelle ou d'une taverne. Si les aventures laissent tomber une pièce dans son chapeau, il les remercie d'une manière qui pourrait impliquer qu'il n'est pas réellement aveugle."
  ],
  [
    "Tiles from a nearby roof drop to the street in front of the players. Someone seems to be slinking across the roof of a nearby building.",
    "Les tuiles d'un toit voisin tombent dans la rue devant les joueurs. Quelqu'un semble se faufiler sur le toit d'un immeuble voisin."
  ],
  [
    "A group of children run up to the party. They surround them, laughing and giggling, asking them questions and opening gawking at their weapons and armor. At some unknown signal, the children run off again. At least one player's coin purse has been cut open, it's contents missing.",
    "Un groupe d'enfants accourt à la fête. Ils les entourent, rient et gloussent, leur posent des questions et s'ouvrent en regardant leurs armes et armures. À un signal inconnu, les enfants repartent. Au moins le porte-monnaie d'un joueur a été ouvert, son contenu est manquant."
  ],
  [
    "An elderly woman with milky eyes and gnarled hands, walks up to a player, pointing directly at them (even if they try to move away) and starts to prophesize a doom that will befall the player.",
    "Une femme âgée aux yeux laiteux et aux mains noueuses, s'approche d'un joueur, le montre directement (même s'il essaie de s'éloigner) et commence à prophétiser un destin qui va s'abattre sur le joueur."
  ],
  [
    "A rotund man is jogging down the street while carrying a large fish. He is very out of breath. He needs to deliver the fish to a restaurant on the other side of town as quickly as possible and is willing to pay if someone will help him with this endeavor. The fish is still alive and weighs about 100 lbs.",
    "Un homme rond fait du jogging dans la rue en portant un gros poisson. Il est très essoufflé. Il doit livrer le poisson dans un restaurant de l'autre côté de la ville le plus rapidement possible et est prêt à payer si quelqu'un l'aidera dans cette entreprise. Le poisson est toujours vivant et pèse environ 100 livres."
  ],
  [
    "A very ugly elderly lady is slowly trugging down as the guard rushes pass her in search for a small time thief. A cursor look will reveal the old lady is a thin, bald, bearded man in a stolen tattered bed sheet and dolie, but, he is very charismatic and good at acting like a sweet old grandmother.",
    "Une vieille dame très laide se traîne lentement tandis que le garde se précipite vers elle à la recherche d'un petit voleur de temps. Un regard de curseur révélera que la vieille dame est un homme mince, chauve et barbu dans un drap de lit en lambeaux volé et une dolie, mais, il est très charismatique et bon à agir comme une vieille grand-mère douce."
  ],
  [
    "A famous author is in town for a book signing, but, most of the town is not too keen on reading. You have a handful of fans but the author does not care and is just happy to have people there who are not aiming on killing them or think they are a new prostitute in town.",
    "Un auteur célèbre est en ville pour une signature de livre, mais la majeure partie de la ville n'aime pas trop la lecture. Vous avez une poignée de fans mais l'auteur s'en fiche et est juste heureux d'avoir des gens là-bas qui ne visent pas à les tuer ou qui pensent qu'ils sont une nouvelle prostituée en ville."
  ],
  [
    "An white robed man is spotted jumping to their death after climbing to the top of the tallest building into a tiny wheelbarrow of hay. No idea what was going on in his head, but he has a hidden knife on his wrist and a collection of head injuries.",
    "Un homme en robe blanche est aperçu en train de sauter à la mort après avoir grimpé au sommet du plus haut bâtiment dans une minuscule brouette de foin. Aucune idée de ce qui se passait dans sa tête, mais il a un couteau caché au poignet et une collection de blessures à la tête."
  ],
  [
    "A group of kids are secretly following the party. Not too good at it as one is using crawling in an upside down crate, one hides behind a blanket painted like a fence and dog, another is hiding behind their nearest compatriots, and the last just covers their eyes with their hands.",
    "Un groupe d'enfants suit secrètement le groupe. Pas trop doué pour ça car on utilise ramper dans une caisse à l'envers, on se cache derrière une couverture peinte comme une clôture et un chien, un autre se cache derrière leurs compatriotes les plus proches, et le dernier se couvre les yeux avec leurs mains."
  ],
  [
    "A person's flatulence has caused clear a path through the crowd. The air is nauseating and strangely staying like a stone. the assailant has left them like a thief in the night. Those foolish/daring enough to try or having a constitution of an ogre are using the path as a easier route to get where they need to.",
    "Les flatulences d'une personne ont ouvert un chemin à travers la foule. L'air est nauséabond et reste étrangement comme une pierre. l'assaillant les a laissés comme un voleur dans la nuit. Ceux qui sont assez stupides / audacieux pour essayer ou qui ont la constitution d'un ogre utilisent le chemin comme un chemin plus facile pour arriver là où ils en ont besoin."
  ],
  [
    "You notice a person in the second floor of a building raise and aim a crossbow.",
    "Vous remarquez qu'une personne au deuxième étage d'un immeuble se lève et vise une arbalète."
  ],
  [
    "A noble stops in front of the party, looks down their nose and simply says <<move>>.",
    "Un noble s'arrête devant la fête, baisse les yeux et dit simplement «bouge»."
  ],
  [
    "A stall on the side of the road hawking meat pies. The owner is very cagey about what he means by 'meat'.",
    "Un étal sur le bord de la route colportant des tartes à la viande. Le propriétaire est très prudent sur ce qu'il entend par «viande»."
  ],
  [
    "An intoxicated gentleman relieving himself on the side of a building. Bonus points if it's the guards building.",
    "Un gentleman enivré se soulageant sur le côté d'un immeuble. Points bonus si c'est le bâtiment des gardes."
  ]
];

export const T16_SMALL_TOWN_ENCOUNTERS: readonly BilingualTuple[] = [
  [
    "Another group of adventurers are beligerently drunk and roaring through the streets.",
    "Un autre groupe d'aventuriers est ivre avec vigueur et rugit dans les rues."
  ],
  [
    "A lost child",
    "Un enfant perdu"
  ],
  [
    "A lost horse or draft animal.",
    "Un cheval perdu ou un animal de trait."
  ],
  [
    "A traveling mage visits the town. The visit causes a commotion",
    "Un mage itinérant visite la ville. La visite provoque une agitation"
  ],
  [
    "A traveling salesman",
    "Un voyageur de commerce"
  ],
  [
    "A traveling monk is staying at the local tavern. They challenge locals to arm wrestling contests for drinks. So far, they are undefeated.",
    "Un moine itinérant séjourne à la taverne locale. Ils défient les habitants à des concours de bras de fer pour les boissons. Jusqu'à présent, ils sont invaincus."
  ],
  [
    "1d12 pigs have broken out of Farmer McClintocks farm and are running wild around the streets.",
    "1d12 porcs sont sortis de la ferme Farmer McClintocks et se déchaînent dans les rues."
  ],
  [
    "A wolf or some other predator is killing farm animals.",
    "Un loup ou un autre prédateur tue des animaux de la ferme."
  ],
  [
    "Bandits are stealing farm animals.",
    "Les bandits volent les animaux de la ferme."
  ],
  [
    "Bandits are charging the townspeople protection money. If the townspeople don't pay up the bandits will cause trouble",
    "Les bandits facturent de l'argent pour la protection des citadins. Si les citadins ne paient pas, les bandits causeront des ennuis"
  ],
  [
    "A bounty hunter is looking for an escaped criminal, that he or she believes is hiding out somewhere in this town.",
    "Un chasseur de primes est à la recherche d'un criminel en fuite, qui, selon lui, se cache quelque part dans cette ville."
  ],
  [
    "A traveling bard is in town.",
    "Un barde itinérant est en ville."
  ],
  [
    "A merchant caravan is passing through the town",
    "Une caravane marchande traverse la ville"
  ],
  [
    "A local healer need help collecting herbs to treat their patients",
    "Un guérisseur local a besoin d'aide pour collecter des herbes pour soigner ses patients"
  ],
  [
    "A small pack of peaceful goblins has a camp near the village, they want to trade with humans.",
    "Une petite meute de gobelins pacifiques a un camp près du village, ils veulent faire du commerce avec les humains."
  ],
  [
    "Someone saw a golden bear in the woods",
    "Quelqu'un a vu un ours d'or dans les bois"
  ],
  [
    "There is a big weeding and a good pay for an exotic chef (cooking exotic food to satisfy farmers)",
    "Il y a un gros désherbage et un bon salaire pour un chef exotique (cuisine exotique pour satisfaire les agriculteurs)"
  ],
  [
    "Traveling merchant is in town to do business but no one wants to talk to him (he's a hill giant)",
    "Un marchand ambulant est en ville pour faire des affaires mais personne ne veut lui parler (c'est un géant des collines)"
  ],
  [
    "Wizard form the tower outside of village wants to buy town's elders",
    "Un sorcier de la tour à l'extérieur du village veut acheter les anciens de la ville"
  ],
  [
    "There is a major increase in hedgehog population",
    "Il y a une augmentation importante de la population de hérissons"
  ],
  [
    "One of the farms was hit by a shooting star. It buried itself deep in the ground and now crops taste weird.",
    "Une des fermes a été frappée par une étoile filante. Il s'est enfoui profondément dans le sol et les cultures ont maintenant un goût bizarre."
  ],
  [
    "Village declare independence and wants to be The West Republic of Farmlands",
    "Le village déclare son indépendance et veut devenir la république occidentale des terres agricoles"
  ],
  [
    "Village is empty",
    "Le village est vide"
  ],
  [
    "Village is surprisingly full (at least two families for one house)",
    "Le village est étonnamment plein (au moins deux familles pour une maison)"
  ],
  [
    "Elf living in the village almost his whole life gone mad and wants to blow up everything with explosives.",
    "Elfe vivant dans le village presque toute sa vie est devenu fou et veut tout faire exploser avec des explosifs."
  ],
  [
    "Local hunter is a powerful fiend that wants to live quiet life.",
    "Le chasseur local est un démon puissant qui veut vivre une vie tranquille."
  ],
  [
    "Village is full of humanoid constructs that want to establish a democratic society.",
    "Le village regorge de constructions humanoïdes qui veulent établir une société démocratique."
  ],
  [
    "Village is populated only by women",
    "Le village est peuplé uniquement de femmes"
  ],
  [
    "Village is populated only by men",
    "Le village n'est peuplé que d'hommes"
  ],
  [
    "Village is populated only by kids",
    "Le village est peuplé uniquement d'enfants"
  ],
  [
    "There is a giant festival in the middle of the town.",
    "Il y a un festival géant au milieu de la ville."
  ],
  [
    "Small village was influenced by the storm of wild magic and now everyone can cast spells.",
    "Le petit village a été influencé par la tempête de magie sauvage et maintenant tout le monde peut lancer des sorts."
  ],
  [
    "Village is terrorized by young dragonborn on a young dragon.",
    "Le village est terrorisé par un jeune dragonborn sur un jeune dragon."
  ],
  [
    "A royal with his platoon of guards travels through the city, looking for something",
    "Un royal avec son peloton de gardes parcourt la ville à la recherche de quelque chose"
  ],
  [
    "Village is populated by humanoid monsters. They seem friendly though.",
    "Le village est peuplé de monstres humanoïdes. Ils semblent amicaux cependant."
  ],
  [
    "A rider thunders past on an out of control (dinosaur, dire wolf, giant boar, giant rhinoceros beetle). It would seem that there is a ranch that domesticates them hear. This one isn't quite broken in yet.",
    "Un cavalier tonne passé sur un incontrôlable (dinosaure, loup terrible, sanglier géant, scarabée rhinocéros géant). Il semblerait qu'il existe un ranch qui les domestique entendent. Celui-ci n'est pas encore tout à fait cassé."
  ],
  [
    "An emissary (from a far away kingdom) and their retinue is passing through this village on their way to the capital.",
    "Un émissaire (d'un royaume lointain) et leur suite traversent ce village en route vers la capitale."
  ],
  [
    "An emissary (from a monster tribe) enters the village & attempts to establish trade between their two peoples",
    "Un émissaire (d'une tribu de monstres) entre dans le village et tente d'établir un commerce entre leurs deux peuples"
  ],
  [
    "A group of hunters are returning with the catch of the day (bear, boar, deer, quail, etc)",
    "Un groupe de chasseurs revient avec la prise du jour (ours, sanglier, cerf, caille, etc.)"
  ],
  [
    "A group of hunters are returning with a creature they have never seen before.",
    "Un groupe de chasseurs revient avec une créature qu'ils n'ont jamais vue auparavant."
  ],
  [
    "A group of fishermen are returning with the catch of the day (clams, crab, eel, fish, lobster, octopus, oysters, seal, squid, etc)",
    "Un groupe de pêcheurs revient avec les prises du jour (palourdes, crabe, anguille, poisson, homard, poulpe, huîtres, phoque, calmar, etc.)"
  ],
  [
    "A group of fishermen are returning with a creature they have never seen before.",
    "Un groupe de pêcheurs revient avec une créature qu'ils n'ont jamais vue auparavant."
  ],
  [
    "A group of adventurers shows up at the village bloodied & bruised from the (caverns, ruins, monster lair) they just explored. They were forced to flee before they could finish exploring.",
    "Un groupe d'aventuriers se présente au village ensanglanté et meurtri par les (cavernes, ruines, repaire de monstres) qu'ils viennent d'explorer. Ils ont été forcés de fuir avant de pouvoir terminer l'exploration."
  ],
  [
    "A messenger rides through town announcing a (competition, grand quest) taking place in a city a few days ride from here.",
    "Un messager traverse la ville pour annoncer une (compétition, grande quête) se déroulant dans une ville à quelques jours d'ici."
  ]
];

export const T17_TRAVEL_OBSTACLES: readonly BilingualTuple[] = [
  [
    "lightning strike and the forest catches on fire",
    "la foudre et la forêt s'enflamme"
  ],
  [
    "A prismatic wall spell blocking a cave entrance",
    "Un sort de mur prismatique bloquant l'entrée d'une grotte"
  ],
  [
    "A tall obelisk is looming above the adventurers. If touched, they are surrounded by an impassable bubble (by physical means - maybe misty step will work, maybe it won't, DM's discretion) When this bubble is produced, the obelisk becomes immovable, and then some puzzles can appear on/around the obelisk which must be solved to get out.",
    "Un grand obélisque se profile au-dessus des aventuriers. S'ils sont touchés, ils sont entourés d'une bulle infranchissable (par des moyens physiques - peut-être qu'une étape brumeuse fonctionnera, peut-être que ce ne sera pas le cas, à la discrétion du MJ) Lorsque cette bulle est produite, l'obélisque devient immobile, puis des énigmes peuvent apparaître sur / autour l'obélisque qui doit être résolu pour sortir."
  ],
  [
    "Giant Doors",
    "Portes géantes"
  ],
  [
    "Boulder blocking a cave entrance",
    "Boulder bloquant l'entrée d'une grotte"
  ],
  [
    "Caved-in passageway / Caved in entrance to cave",
    "Passage cédé / cédé à l'entrée de la grotte"
  ],
  [
    "Ravine - bridge crossing it has collapsed",
    "Ravin - pont traversant il s'est effondré"
  ],
  [
    "Flooded River - blocking path/place you want to go is now underwater",
    "Rivière inondée - le chemin / l'endroit où vous voulez vous rendre est maintenant sous l'eau"
  ],
  [
    "Fire - plains, forest, etc.",
    "Feu - plaines, forêt, etc."
  ],
  [
    "Blizzard has buried the (entrance, pass, path, trail)",
    "Blizzard a enterré le (entrée, col, chemin, sentier)"
  ],
  [
    "Avalanche has blocked the (cave entrance, pass)",
    "Avalanche a bloqué la (entrée de la grotte, col)"
  ],
  [
    "Stampede - a large herd of animals is stampeding in between you and where you want to go.",
    "Stampede - un grand troupeau d'animaux se précipite entre vous et l'endroit où vous voulez aller."
  ],
  [
    "Volcano - a river of lava now blocks your path",
    "Volcan - une rivière de lave bloque maintenant votre chemin"
  ],
  [
    "Cliff - a 1000ft cliff blocks your path. you have to climb if you want to get where you are going.",
    "Cliff - une falaise de 1000 pieds bloque votre chemin. vous devez grimper si vous voulez arriver là où vous allez."
  ],
  [
    "A rowdy but peaceful demonstration",
    "Une manifestation tapageuse mais pacifique"
  ],
  [
    "The street is closed to have leaky water pipes repaired",
    "La rue est fermée pour faire réparer les conduites d'eau qui fuient"
  ],
  [
    "The wind is blowing hard enough to push the PCs over",
    "Le vent souffle assez fort pour pousser les PJ"
  ],
  [
    "Tar pits",
    "Goudrons"
  ],
  [
    "A merchant who really really wants to sell the players a kettle",
    "Un marchand qui veut vraiment vendre une bouilloire aux joueurs"
  ],
  [
    "A chat with a sentient cat",
    "Une conversation avec un chat sensible"
  ],
  [
    "A toll road that <<can't>> be passed without paying a massive toll",
    "Une route à péage qui << ne peut >> être franchie sans payer un péage massif"
  ],
  [
    "A nighttime vision of a future plot point",
    "Une vision nocturne d'un futur point de l'intrigue"
  ],
  [
    "A man who is cursed and is attempting to beat himself to death",
    "Un homme qui est maudit et tente de se battre à mort"
  ],
  [
    "A swarm of flying ants is plaguing a traveling merchant",
    "Un essaim de fourmis volantes sévit sur un marchand ambulant"
  ],
  [
    "One of the party members gets really sick and no one knows why",
    "Un des membres du groupe tombe vraiment malade et personne ne sait pourquoi"
  ],
  [
    "The CUBE, a rip in reality that ages whatever touches it by a year and gives them a minor madness that wears off after a week",
    "Le CUBE, une déchirure en réalité qui vieillit tout ce qui le touche d'un an et leur donne une petite folie qui s'estompe après une semaine"
  ],
  [
    "A tall, narrow table with a bell on it and a small sign which reads, <<You must ring bell to continue!>>.",
    "Une table haute et étroite avec une cloche dessus et un petit panneau indiquant: «Vous devez sonner la cloche pour continuer!»."
  ],
  [
    "Vines and roots start to overtake the players. The vibes and roots form a maze in front of them. The players can’t turn back as there is only one exit.",
    "Les vignes et les racines commencent à dépasser les joueurs. Les vibrations et les racines forment un labyrinthe devant eux. Les joueurs ne peuvent pas revenir en arrière car il n'y a qu'une seule sortie."
  ],
  [
    "A lonely traveling minstrel who keeps trying to get you to hear his awful music.",
    "Un ménestrel voyageur solitaire qui essaie de vous faire entendre sa musique horrible."
  ]
];
