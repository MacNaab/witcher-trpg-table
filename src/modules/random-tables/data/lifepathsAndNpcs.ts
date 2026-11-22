import type { BilingualTuple, LocalizedText } from "../types";

/**
 * Data pools for NPCs & Lifepaths tables (Tables 10, 11, 12, 20, 22).
 */

export const T10_BASIC_NPC = {
  race: [
  [
    "Human",
    "Humain"
  ],
  [
    "Aen Seidhe",
    "Aen Seidhe"
  ],
  [
    "Dwarf",
    "Nain"
  ]
] as readonly BilingualTuple[],
  gender: [
  [
    "Female",
    "Femme"
  ],
  [
    "Male",
    "Homme"
  ]
] as readonly BilingualTuple[],
  age: [
  [
    "Child",
    "Enfant"
  ],
  [
    "Teen",
    "Adoslescent"
  ],
  [
    "Young adult",
    "Jeune adulte"
  ],
  [
    "Adult",
    "Adulte"
  ],
  [
    "Elder",
    "Ancien"
  ]
] as readonly BilingualTuple[],
  personality: [
  [
    "Shy",
    "Timide"
  ],
  [
    "Rebellious",
    "Rebelle"
  ],
  [
    "Arrogant",
    "Arrogant"
  ],
  [
    "Headstrong",
    "Têtu"
  ],
  [
    "Friendly",
    "Amical"
  ],
  [
    "Secretive",
    "Secret"
  ],
  [
    "Nervous",
    "Nerveux"
  ],
  [
    "Flirtatious",
    "Coquette"
  ],
  [
    "Eccentric",
    "Excentrique"
  ],
  [
    "Aloof",
    "Distant"
  ]
] as readonly BilingualTuple[],
  history: [
  [
    "Lost everything",
    "A tout perdu"
  ],
  [
    "Family was killed",
    "Sa famille a été tuée"
  ],
  [
    "Fought in the Northern War",
    "A combattu pendant la guerre du Nord"
  ],
  [
    "Thinks they have magic",
    "Pense qu'il a de la magie"
  ],
  [
    "Almost died",
    "Presque mort"
  ],
  [
    "Saved by a witcher",
    "A été sauvé par un sorceleur"
  ],
  [
    "Used to be a priest",
    "A été prêtre"
  ],
  [
    "Once ruled a small town",
    "A gouverné une petite ville"
  ],
  [
    "Lived as a bandit",
    "A vécu comme un bandit"
  ],
  [
    "Killed a dangerous monster",
    "A tué un monstre dangereux"
  ]
] as readonly BilingualTuple[],
  standing: [
  [
    "Slave",
    "Esclave"
  ],
  [
    "Slave",
    "Esclave"
  ],
  [
    "Poor",
    "Pauvre"
  ],
  [
    "Poor",
    "Pauvre"
  ],
  [
    "Poor",
    "Pauvre"
  ],
  [
    "Average",
    "Moyenne"
  ],
  [
    "Well to do",
    "Aisé"
  ],
  [
    "Well to do",
    "Aisé"
  ],
  [
    "Rich",
    "Riche"
  ],
  [
    "Nobility",
    "Noble"
  ]
] as readonly BilingualTuple[],
  romance: [
  [
    "None",
    "Aucune"
  ],
  [
    "None",
    "Aucune"
  ],
  [
    "None",
    "Aucune"
  ],
  [
    "Uninterested in love",
    "Pas intéressé par l'amour"
  ],
  [
    "Debauchery",
    "Débauche"
  ],
  [
    "Playboy",
    "Playboy"
  ],
  [
    "Interested in a player",
    "Intéressé par un joueur"
  ],
  [
    "A dedicated lover",
    "Un amoureux dédié"
  ],
  [
    "Married",
    "Marié"
  ],
  [
    "Star-crossed lovers",
    "Amants maudits"
  ]
] as readonly BilingualTuple[],
  secret: [
  [
    "Is secretly a mage",
    "Est secrètement un mage"
  ],
  [
    "Found a lost treasure",
    "A trouvé un trésor perdu"
  ],
  [
    "Is a wanted criminal",
    "Est un criminel recherché"
  ],
  [
    "Is a secret service agent",
    "Est un agent des services secrets"
  ],
  [
    "Has a secret life",
    "A une vie secrète"
  ],
  [
    "Has a Secret Profession",
    "A une profession secrète"
  ],
  [
    "Is a cross-dresser",
    "Est un travesti"
  ],
  [
    "Is a deserter",
    "Est un déserteur"
  ],
  [
    "Has a secret lover",
    "A un amant secret"
  ],
  [
    "Has a hex or curse of your choice",
    "A une malédiction de votre choix"
  ]
] as readonly BilingualTuple[],
};

export const T11_ADVANCED_NPC = {
  regions: [
  [
    "Northern Kingdoms",
    "Royaumes du Nord"
  ],
  [
    "Nilfgaard",
    "Nilfgaard"
  ],
  [
    "Elderlands",
    "Terres Ancestrales"
  ]
] as readonly BilingualTuple[],
  nkOrigins: [
  [
    "Redania",
    "Redania"
  ],
  [
    "Kaedwen",
    "Kaedwen"
  ],
  [
    "Temeria",
    "Temeria"
  ],
  [
    "Aedirn",
    "Aedirn"
  ],
  [
    "Lyria & Rivia",
    "Lyria & Rivia"
  ],
  [
    "Kovir & Poviss",
    "Kovir & Poviss"
  ],
  [
    "Skellige",
    "Skellige"
  ],
  [
    "Cidaris",
    "Cidaris"
  ],
  [
    "Verden",
    "Verden"
  ],
  [
    "Cintra",
    "Cintra"
  ]
] as readonly BilingualTuple[],
  nOrigins: [
  [
    "Vicovaro",
    "Vicovaro"
  ],
  [
    "Angren",
    "Angren"
  ],
  [
    "Nazair",
    "Nazair"
  ],
  [
    "Mettina",
    "Mettina"
  ],
  [
    "Mag Turga",
    "Mag Turga"
  ],
  [
    "Gheso",
    "Gheso"
  ],
  [
    "Ebbing",
    "Ebbing"
  ],
  [
    "Maecht",
    "Maecht"
  ],
  [
    "Gemmeria",
    "Gemmeria"
  ],
  [
    "Etolia",
    "Etolia"
  ],
  [
    "The Heart of Nilfgaard",
    "Le coeur de Nilfgaard"
  ]
] as readonly BilingualTuple[],
  eOrigins: [
  [
    "Dol Blathanna",
    "Dol Blathanna"
  ],
  [
    "Mahakam",
    "Mahakam"
  ]
] as readonly BilingualTuple[],
  familyFate: [
    [
  [
    "Your family was scattered to the winds by the wars and you have no idea where most of them are.",
    "Votre famille a été dispersée par les guerres et vous ne savez pas où se trouvent la plupart d'entre elles."
  ],
  [
    "Your family was imprisoned for crimes or on trumped-up charges. You were the only one to escape. You may want to free them...or maybe not.",
    "Votre famille a été emprisonnée pour des délits ou pour des accusations forgées de toutes pièces. Tu étais le seul à t'échapper. Vous voudrez peut-être les libérer ... ou peut-être pas."
  ],
  [
    "Your family house was cursed and now either crops won’t grow or specters roam the halls. It became too dangerous for you to stay in this home.",
    "Votre maison familiale a été maudite et maintenant les récoltes ne poussent plus et des spectres parcourent les couloirs. Il est devenu trop dangereux pour vous de rester dans cette maison."
  ],
  [
    "With so many wars your family’s livelihood was destroyed. Your family turned to crime to survive.",
    "Avec tant de guerres, le gagne-pain de votre famille a été détruit. Votre famille s'est tournée vers le crime pour survivre."
  ],
  [
    "Your family accumulated a huge debt through gambling or favors from others. You need money desperately.",
    "Votre famille a accumulé une énorme dette de jeux. Vous avez désespérément besoin d'argent."
  ],
  [
    "Your family has fallen into a feud with another family. You may not even remember why this feud started in the first place.",
    "Votre famille est morte dans une querelle avec une autre famille. Vous ne vous souvenez peut-être même pas pourquoi cette querelle a commencé..."
  ],
  [
    "Due to some action or inaction your family has become hated in your home town and now no one there wants to have anything to do with them.",
    "En raison d'une action ou d'une inaction, votre famille est devenue détestée dans votre ville natale et maintenant personne là-bas ne veut rien avoir à faire avec eux."
  ],
  [
    "One day everything you had was ripped away by a bandit mob. Your family was massacred, leaving you entirely alone.",
    "Un jour, tout ce que vous aviez a été arraché par une bande de bandits. Votre famille a été massacrée, vous laissant entièrement seul."
  ],
  [
    "Your family has a deep, dark secret that if discovered would ruin you all completely. You can decide what this secret is, or the Game Master can decide.",
    "Votre famille a un secret profond et sombre qui, s'il était découvert, vous ruinerait complètement. Vous pouvez décider quel est ce secret, ou le MJ peut décider."
  ],
  [
    "Your family has come to despise each other. No one you grew up with will talk with each other any more and you’re lucky to get a passing hello from your siblings.",
    "Votre famille en est venue à se mépriser. Personne avec qui vous avez grandi ne vous reparlera et vous avez de la chance de recevoir le bonjour de vos frères et sœurs."
  ]
],
    [
  [
    "Your family was indentured for crimes against the Empire or on trumped-up charges. Only you escaped.",
    "Votre famille a été condamné pour des crimes contre l'Empire ou pour de fausses accusations. Vous seul avez échappé."
  ],
  [
    "Your family was exiled to the Korath Desert and you likely spent most of your early life struggling to survive in the deadly wasteland.",
    "Votre famille a été exilée dans le désert de Korath et vous avez probablement passé la majeure partie de votre jeunesse à lutter pour survivre dans ce désert mortel."
  ],
  [
    "Your family was killed by a rogue mage who either had a vendetta against your family, or just wanted blood. Either way, you are alone.",
    "Votre famille a été tuée par un mage renégat qui a eu une vendetta contre votre famille ou qui voulait juste du sang. De toute façon, vous êtes seul."
  ],
  [
    "Your family disappeared and you have no idea where they went. One day they just up and left.",
    "Votre famille a disparu et vous ne savez pas où ils sont allés. Un jour, ils se sont levés et sont partis."
  ],
  [
    "Your family was executed for treason against the Empire. You were the only one to escape this fate.",
    "Votre famille a été exécutée pour trahison contre l'Empire. Vous étiez le seul à échapper à ce sort."
  ],
  [
    "Your family was stripped of its title for some reason. You were evicted from your home and left scrambling to survive among the un-washed masses.",
    "Votre famille a été dépouillée de son titre pour une raison quelconque. Vous avez été expulsé de votre domicile et vous avez dû survivre parmi le peuple."
  ],
  [
    "Your family name was tarnished by a magic relative who flaunted their magical gift disgracefully like a Northern mage.",
    "Votre nom de famille a été terni par un parent magicien qui s'affiche honteusement comme un mage du Nord."
  ],
  [
    "You disgraced your family in the eyes of the Empire. Something you did or failed to do has ruined your personal name and harmed your family.",
    "Vous avez déshonoré votre famille aux yeux de l'Empire. Quelque chose que vous avez fait ou omis de faire a ruiné votre nom personnel et a nui à votre famille."
  ],
  [
    "Your family has a deep, dark secret that if discovered would destroy them and their name forever. You must protect this secret with your life.",
    "Votre famille a un secret profond et sombre qui, s'il était découvert, les détruirait ainsi que leur nom pour toujours. Vous devez protéger ce secret avec votre vie."
  ],
  [
    "Your family was assassinated. They may have been in the way of someone’s plan or they may have been used to get at someone more powerful. Either way, your family is gone now.",
    "Votre famille a été assassinée. Ils peuvent avoir gêné le plan de quelqu'un ou avoir été utilisé pour atteindre quelqu'un de plus puissant. De toute façon, votre famille est partie maintenant."
  ]
],
    [
  [
    "Your family were marked as human sympathizers and are not particularly loved in their homeland.",
    "Votre famille était marquée comme des sympathisants humains et n'est pas particulièrement aimée dans sa patrie."
  ],
  [
    "Your family was ostracized for dissenting opinions and now people won’t socialize with you or your family at all.",
    "Votre famille a été ostracisée pour ses opinions dissidentes et maintenant les gens ne vont plus socialiser avec vous ou votre famille."
  ],
  [
    "Your family died in the Northern Wars. They may have actually fought in the war, or were casualties of war who just happened to get in the way.",
    "Votre famille est morte dans les guerres du Nord. Ils ont peut-être effectivement combattu pendant la guerre ou ont été des victimes de la guerre."
  ],
  [
    "Your family has been caught in a feud for centuries. You may not remember why this feud started, but it is dire.",
    "Votre famille est prise dans une querelle depuis des siècles. Vous ne vous souvenez peut-être pas pourquoi cette querelle a commencé, mais c'est terrible."
  ],
  [
    "Your family was stripped of its title for some reason. You were evicted from your home and left scrambling to survive.",
    "Votre famille a été dépouillée de son titre pour une raison quelconque. Vous avez été expulsé de votre domicile et laissé en difficulté pour survivre"
  ],
  [
    "Your family turned to raiding human settlements early in your life to get food and perhaps strike back at the humans.",
    "Votre famille a pillé des établissements humains au début de votre vie pour obtenir de la nourriture et peut-être riposter contre les humains."
  ],
  [
    "Your family house is haunted. Most likely this is because your home was the site of many, many deaths during the war against humans.",
    "Votre maison familiale est hantée. C'est très probablement parce que votre maison a été le site de nombreux morts pendant la guerre contre les humains."
  ],
  [
    "Your family has been split by a human in-law who was brought into your family by a sibling or relative. Some of your family like them and some hate them.",
    "Votre famille a été divisée par un beau-père humain qui a été amené dans votre famille par un frère ou une sœur. Certains membres de votre famille les aiment et d'autres les détestent."
  ],
  [
    "Your family was killed by humans who thought they were Scoia’tael. They may have been slaughtered or hung with no court proceedings or trials.",
    "Votre famille a été tuée par des humains qui les prennaient pour des Scoia’tael. Ils peuvent avoir été abattus ou pendus sans procédure ni procès."
  ],
  [
    "Your family is descended from an infamous traitor. It taints your family’s interactions with others of the elder races and has made living in the elderland difficult.",
    "Votre famille est issue d'un traître infâme. Il entache les interactions de votre famille avec les autres races et rend la vie dans les terres ancestrales difficile."
  ]
],
  ] as readonly (readonly BilingualTuple[])[],
  parentalFate: [
    [
  [
    "One or more of your parents were killed in the Northern Wars. Most likely your father, but it is also possible that your mother fought or was a casualty.",
    "Un ou plusieurs de vos parents ont été tués dans les guerres du Nord. Très probablement votre père, mais il est également possible que votre mère se soit battue ou ait été une victime."
  ],
  [
    "One or more of your parents left you in the wilderness to fend for yourself. Maybe they couldn’t afford to keep you; maybe you were an accident.",
    "Un ou plusieurs de vos parents vous ont laissé seul dans les étendus sauvages. Peut-être qu'ils ne pouvaient pas se permettre de vous garder; vous étiez peut-être un accident."
  ],
  [
    "One or more of your parents were cursed by a mage or due to the intense hatred of someone they encountered. The curse took their life.",
    "Un ou plusieurs de vos parents ont été maudits par un mage ou à cause de la haine intense de quelqu'un qu'ils ont rencontré. La malédiction leur a pris la vie."
  ],
  [
    "One or more of your parents sold you for coin, or perhaps traded you for some goods or service. Your parents needed the money more than you.",
    "Un ou plusieurs de vos parents vous ont vendu pour de la monnaie ou vous ont peut-être échangé contre certains biens ou services. Vos parents avaient plus besoin d'argent que vous."
  ],
  [
    "One or more of your parents joined a gang. You saw this gang often and were sometimes forced to work with them.",
    "Un ou plusieurs de vos parents ont rejoint un gang. Vous avez vu ce gang souvent et avez parfois été obligé de travailler avec eux."
  ],
  [
    "One or more of your parents were killed by monsters. It is your decision as to what they may have fallen prey to.",
    "Un ou plusieurs de vos parents ont été tués par des monstres. C'est à vous de décider à quoi ils ont pu être la proie."
  ],
  [
    "One or more of your parents were falsely executed. They may have been a scapegoat for something or just in the wrong place.",
    "Un ou plusieurs de vos parents ont été exécutés à tort. Ils peuvent avoir été un bouc émissaire pour quelque chose ou simplement au mauvais endroit."
  ],
  [
    "One or more of your parents died of a plague. There was nothing that could be done but try to ease their passing.",
    "Un ou plusieurs de vos parents sont morts de la peste. Il n'y avait rien d'autre à faire que d'essayer d'achever leur souffrance."
  ],
  [
    "One or more of your parents defected to Nilfgaard. They may have been given a deal for information or they may just have jumped the border.",
    "Un ou plusieurs de vos parents ont fait défection à Nilfgaard. Ils ont peut-être obtenu un accord pour obtenir des informations ou ils ont peut-être simplement franchi la frontière."
  ],
  [
    "One or more of your parents were kidnapped by nobles. Likely it was your mother, who attracted the attention of a local lord or his son.",
    "Un ou plusieurs de vos parents ont été enlevés par des nobles. C'est probablement votre mère qui a attiré l'attention d'un seigneur local ou de son fils."
  ]
],
    [
  [
    "Your father died in one of the Northern Wars. He may have already been in the military or he may have been conscripted into service during that war.",
    "Votre père est décédé dans l'une des guerres du Nord. Il a peut-être déjà été dans l'armée ou il peut avoir été enrôlé pendant cette guerre"
  ],
  [
    "One or more of your parents were poisoned. This may have been the work of a professional rival, or it may have been to get your parents out of the way.",
    "Un ou plusieurs de vos parents ont été empoisonnés. Cela a peut-être été le travail d'un rival professionnel, ou cela a peut-être été pour écarter vos parents."
  ],
  [
    "The secret police took your parent or parents for ‘questioning.’ The next week their bodies were found hung in the streets of the city.",
    "La police secrète a emmené votre ou vos parents pour un «interrogatoire». La semaine suivante, leur corps a été retrouvé pendu dans les rues de la ville."
  ],
  [
    "One or more of your parents were killed by a rogue mage. Most likely they tried to turn the mage in question in to the Empire and paid the price.",
    "Un ou plusieurs de vos parents ont été tués par un mage voyou. Ils ont très probablement essayé de remettre le mage en question et en ont payé le prix."
  ],
  [
    "One or more of your parents were imprisoned for unlawful magic. Maybe they actually commited the crime or maybe it was a setup.",
    "Un ou plusieurs de vos parents ont été emprisonnés pour magie illégale. Peut-être qu'ils ont réellement commis le crime ou peut-être que c'était une mise en scène."
  ],
  [
    "One or more of your parents were exiled to the Korath Desert. Likely they committed a major crime but killing them would cause trouble.",
    "Un ou plusieurs de vos parents ont été exilés dans le désert de Korath. Ils ont probablement commis un crime majeur, mais les tuer causerait des problèmes."
  ],
  [
    "One or more of your parents were cursed by a mage. The mage likely had a vendetta against them.",
    "Un ou plusieurs de vos parents ont été maudits par un mage. Le mage avait probablement une vendetta contre eux."
  ],
  [
    "Your parents simply left you one day. You may not even know why they did it. One day your parents just disappeared.",
    "Vos parents vous ont simplement quittés. Vous ne savez peut-être même pas pourquoi ils l'ont fait. Un jour, vos parents ont tout simplement disparu."
  ],
  [
    "One or more of your parents were enslaved. They either commited a crime against the Empire or were set up by a rival.",
    "Un ou plusieurs de vos parents ont été réduits en esclavage. Ils ont commis un crime contre l'Empire ou ont été piégé par un rival."
  ],
  [
    "One or more of your parents were sent to the North as double agents. You likely don’t even know where they are now, but they’re serving the Emperor.",
    "Un ou plusieurs de vos parents ont été envoyés dans le Nord comme agents doubles. Vous ne savez probablement même pas où ils sont maintenant, mais ils servent l'Empereur."
  ]
],
    [
  [
    "One or more of your parents were accused of being Scoia’tael. The people around you give your parents sidelong glances.",
    "Un ou plusieurs de vos parents ont été accusés d’être Scoia’tael. Les gens autour de vous jettent des regards à vos parents."
  ],
  [
    "One or more of your parents turned on your own people and sold out the elder races to the humans. Your parents are unwelcome in your homeland.",
    "Un ou plusieurs de vos parents se sont retournés contre votre propre peuple et ont vendu les races aînées aux humains. Vos parents ne sont pas les bienvenus dans votre pays d'origine."
  ],
  [
    "One or more of your parents killed themselves out of despair. With no hope of regaining the glory of the past, they gave up and ended it.",
    "Un ou plusieurs de vos parents se sont suicidés de désespoir. Sans espoir de regagner la gloire du passé, ils ont abandonné et y ont mis fin."
  ],
  [
    "While traveling, one or more of your parents fell prey to human racism. They died in a pogrom and their bodies were displayed on pikes.",
    "En voyage, un ou plusieurs de vos parents sont devenus la proie du racisme humain. Ils sont morts dans un pogrom et leurs corps ont été affichés sur des piques."
  ],
  [
    "One or more of your parents have become obssessed with regaining the former glory of their race. They sacri\u001dfice everything for this cause.",
    "Un ou plusieurs de vos parents sont devenus obsédés par le fait de retrouver l'ancienne gloire de leur race. Ils ont tout sacrifié pour cette cause."
  ],
  [
    "One or more of your parents were exiled from your homeland. There are many possible reasons, from crime to dissenting opinons.",
    "Un ou plusieurs de vos parents ont été exilés de votre patrie. Il existe de nombreuses raisons possibles, du crime aux opinions dissidentes."
  ],
  [
    "One or more of your parents were cursed. You can decide what this curse is or, the Game Master can decide.",
    "Un ou plusieurs de vos parents ont été maudits. Vous pouvez décider de ce qu'est cette malédiction ou, le Game Master peut décider."
  ],
  [
    "Your parents gave you to another family so that you could survive, because they couldn’t care for you.",
    "Vos parents vous ont donné à une autre famille pour que vous puissiez survivre, car ils ne pouvaient pas prendre soin de vous."
  ],
  [
    "One or more of your parents joined the Scoia’tael in an attempt to get revenge on the humans who they see as ruining their lives.",
    "Un ou plusieurs de vos parents ont rejoint les Scoia’tael pour tenter de se venger des humains qu’ils considèrent comme ruinant leur vie."
  ],
  [
    "One or more of your parents died in an ‘accident’. Most likely they made a powerful enemy that finally found a way to get rid of them.",
    "Un ou plusieurs de vos parents sont décédés dans un «accident». Très probablement, ils se sont fait un ennemi puissant qui a finalement trouvé un moyen de s'en débarrasser."
  ]
],
  ] as readonly (readonly BilingualTuple[])[],
  familyStatus: [
    [
  [
    "Aristocracy : You grew up in a noble manor with servants to wait on you, but you were always expected to behave and impress.",
    "Aristocratie: Vous avez grandi dans un noble manoir avec des serviteurs pour vous attendre, mais vous vous attendiez toujours à vous comporter et à impressionner."
  ],
  [
    "Adopted by a Mage : You were given to a mage at a young age. You lived in comfort but barely saw your caretaker, who was always busy.",
    "Adopté par un mage: Vous avez été donné à un mage à un jeune âge. Vous viviez dans le confort mais voyiez à peine votre concierge, toujours occupé."
  ],
  [
    "Knights : You grew up in a manor where you learned to be a proper lady or lord. Your fate was set from birth.",
    "Chevaliers: Vous avez grandi dans un manoir où vous avez appris à être une vraie dame ou un seigneur. Votre destin a été fixé dès la naissance."
  ],
  [
    "Merchant Family : You grew up among merchants and you were always surrounded by yelling, haggling, and money.",
    "Famille de marchands: vous avez grandi parmi les marchands et vous avez toujours été entouré de cris, de marchandages et d'argent."
  ],
  [
    "Artisan Family : You grew up in an artisan’s workshop. Your days were \u001d lled with the incessant sounds of creation, and o\u0016 en long.",
    "Famille d'artisans: vous avez grandi dans un atelier d'artisans. Vos journées ont été remplies des bruits incessants de la création, et souvent longues."
  ],
  [
    "Entertainer Family : You grew up with a band of performers. You may have traveled or you may have performed at a theater.",
    "Entertainer Family: Vous avez grandi avec un groupe d'artistes. Vous avez peut-être voyagé ou joué dans un théâtre."
  ],
  [
    "Peasant Family : You grew up on a farm in the countryside. You didn’t have much to your name and your life was simple, but dangerous.",
    "Famille paysanne: vous avez grandi dans une ferme à la campagne. Vous n'aviez pas grand-chose, votre vie était simple mais dangereuse."
  ]
],
    [
  [
    "Aristocracy : You grew up in a manor, training to be well-versed in the world of the court. The luxury was just your incentive.",
    "Aristocratie: Vous avez grandi dans un manoir, vous vous entraînez à bien connaître le monde de la cour. Le luxe n'était que votre motivation."
  ],
  [
    "High Clergy : You were raised among the clergy of the Great Sun. You grew up pious and always aware that the Church would guide you.",
    "Haut clergé: vous avez été élevé parmi le clergé du Grand Soleil. Vous avez grandi pieux et toujours conscient que l'Église vous guiderait."
  ],
  [
    "Knights : You grew up knowing that your duty was to the Emperor, and that all of your luxury was a reward for your eventual service.",
    "Chevaliers: Vous avez grandi en sachant que votre devoir était envers l'empereur et que tout votre luxe était une récompense pour votre service éventuel."
  ],
  [
    "Artisan Family : You grew up in an artisan’s shop, learning to cra\u0016 products for sale around the world. You learned the value of quality.",
    "Famille d'artisan: Vous avez grandi dans une boutique d'artisan, apprenant à créer des produits à vendre dans le monde entier. Vous avez appris la valeur de la qualité."
  ],
  [
    "Merchant Family : You grew up selling products all around the Empire. You saw all kinds exotic of goods from all around the world.",
    "Famille de marchands: vous avez grandi en vendant des produits dans tout l'Empire. Vous avez vu toutes sortes de produits exotiques du monde entier."
  ],
  [
    "Born into Servitude : You were born into servitude and lived in simple quarters. You owned very little and toiled often.",
    "Né dans la servitude: vous êtes né dans la servitude et avez vécu dans des quartiers simples. Vous possédiez très peu et peiniez souvent."
  ],
  [
    "Peasant Family : You grew up on one of the thousands of farms across the Empire. You had little to your name but life was simple.",
    "Famille paysanne: Vous avez grandi dans l'une des milliers de fermes de l'Empire. Vous aviez peu de choses à votre nom mais la vie était simple."
  ]
],
    [
  [
    "Aristocracy : You grew up in a palace and were constantly reminded of the glory of the past. You were expected to live up to the legacy.",
    "Aristocratie: Vous avez grandi dans un palais et vous avez constamment rappelé la gloire du passé. Vous deviez être à la hauteur de l'héritage."
  ],
  [
    "Noble Warrior : You grew up as a noble warrior’s child, expected to rise to your family’s reputation and to never dishonor your heritage.",
    "Guerrier noble: Vous avez grandi en tant qu'enfant de noble guerrier, censé élever la réputation de votre famille et ne jamais déshonorer votre héritage."
  ],
  [
    "Merchants : You grew up among traveling merchants. Life was dificult sometimes but non-human crafts are always valuable.",
    "Marchands: vous avez grandi parmi les marchands itinérants. La vie était parfois difficile, mais les loisirs non humains ont toujours de la valeur."
  ],
  [
    "Scribe Family : You grew up as the child of scribes, recording and protecting as much elderfolk history as possible.",
    "Famille de scribes: Vous avez grandi en tant qu'enfant de scribes, enregistrant et protégeant le plus possible l'histoire des personnes âgées."
  ],
  [
    "Entertainers : You grew up singing songs and performing plays. You worked backstage, helped write songs, and \u001d xed instruments.",
    "Artistes: Vous avez grandi en chantant des chansons et en jouant des pièces. Vous avez travaillé dans les coulisses, aidé à écrire des chansons et réparé des instruments."
  ],
  [
    "Artisan Family : You grew up in a family of artisans, visiting ancient palaces for inspiration and spending hours every day on projects.",
    "Famille d'artisans: Vous avez grandi dans une famille d'artisans, visitant d'anciens palais pour vous inspirer et passant des heures chaque jour sur des projets."
  ],
  [
    "Lowborn Family : You grew up in a lowborn family, tending to the manors of others or working small jobs around your home city.",
    "Famille de roturiers: vous avez grandi dans une famille basse-née, occupée aux manoirs des autres ou occupant de petits emplois dans votre ville natale."
  ]
],
  ] as readonly (readonly BilingualTuple[])[],
  clothing: [
  [
    "A Uniform",
    "Un uniforme"
  ],
  [
    "Traveling Clothing",
    "Vêtements de voyage"
  ],
  [
    "Fancy Clothing",
    "Vêtements fantaisie"
  ],
  [
    "Ragged Clothing",
    "Vêtements déchiquetés"
  ],
  [
    "Utilitarian Clothing",
    "Vêtements utilitaires"
  ],
  [
    "Traditional Clothing",
    "Vêtements traditionnels"
  ],
  [
    "Revealing Clothing",
    "Décolleté"
  ],
  [
    "Heavy Clothing",
    "Vêtements lourds"
  ],
  [
    "Strange Clothing",
    "Vêtements étranges"
  ],
  [
    "Flamboyant Clothing",
    "Vêtements flamboyants"
  ]
] as readonly BilingualTuple[],
  personality: [
  [
    "Secretive",
    "secret"
  ],
  [
    "Rebellious",
    "rebelle"
  ],
  [
    "Violent",
    "violent"
  ],
  [
    "Idealistic",
    "idéaliste"
  ],
  [
    "Contemplative",
    "contemplatif"
  ],
  [
    "Stern",
    "sévère"
  ],
  [
    "Deceptive",
    "trompeur"
  ],
  [
    "Friendly",
    "amical"
  ],
  [
    "Arrogant",
    "arrogant"
  ],
  [
    "Nervous",
    "nerveux"
  ]
] as readonly BilingualTuple[],
  hair: [
  [
    "Long & Loose",
    "long et lâche"
  ],
  [
    "Cropped Short",
    "court court"
  ],
  [
    "Self-Cut Short",
    "coupe courte"
  ],
  [
    "Braided",
    "tressé"
  ],
  [
    "Long & Wild",
    "long et sauvage"
  ],
  [
    "Bald",
    "chauve"
  ],
  [
    "Uniformly Short",
    "uniformément court"
  ],
  [
    "Ragged & Messy",
    "en lambeaux et en désordre"
  ],
  [
    "Complicated Hairstyle",
    "coiffure compliquée"
  ],
  [
    "Shaven Sides",
    "côtés rasés"
  ]
] as readonly BilingualTuple[],
  affectations: [
  [
    "Trophies",
    "Trophées"
  ],
  [
    "Rings & Jewlery",
    "Bagues et bijoux"
  ],
  [
    "Trinkets",
    "Bibelots"
  ],
  [
    "Tattoos",
    "Tatouages"
  ],
  [
    "War Paint",
    "Peinture de guerre"
  ],
  [
    "Shadowy Cloak",
    "Cape ombragée"
  ],
  [
    "Bright Bandanas",
    "Bandanas brillants"
  ],
  [
    "Eye Patch",
    "Cache-oeil"
  ],
  [
    "Furs",
    "Fourrures"
  ],
  [
    "Insignias & Plaques",
    "Insignes et plaques"
  ]
] as readonly BilingualTuple[],
  valuedPerson: [
  [
    "A Parent",
    "Un parent"
  ],
  [
    "A Sibling",
    "Un frère"
  ],
  [
    "A Lover",
    "Un amoureux"
  ],
  [
    "A Friend",
    "Un ami"
  ],
  [
    "Yourself",
    "Toi même"
  ],
  [
    "A Pet",
    "Un animal de compagnie"
  ],
  [
    "A Mentor",
    "Un mentor"
  ],
  [
    "A Public Figure",
    "Une personnalité publique"
  ],
  [
    "A Personal Hero",
    "Un héros personnel"
  ],
  [
    "No One",
    "Personne"
  ]
] as readonly BilingualTuple[],
  valued: [
  [
    "Money",
    "Argent"
  ],
  [
    "Honor",
    "Honneur"
  ],
  [
    "Your Word",
    "Votre parole"
  ],
  [
    "Hedonistic",
    "Hédonistique"
  ],
  [
    "Knowledge",
    "Connaissance"
  ],
  [
    "Vengeance",
    "Vengeance"
  ],
  [
    "Power",
    "Puissance"
  ],
  [
    "Love",
    "L'amour"
  ],
  [
    "Survival",
    "Survie"
  ],
  [
    "Friendship",
    "Relation amicale"
  ]
] as readonly BilingualTuple[],
  feelings: [
  [
    "People Are Tools to Be Used",
    "Les gens sont des outils à utiliser"
  ],
  [
    "Our Kind Are Fine but Plough the Rest",
    "Notre espèce est supérieure aux autres"
  ],
  [
    "People Can Never Be Trusted",
    "On ne peut jamais faire confiance aux gens"
  ],
  [
    "People Have to Prove themselves",
    "Les gens doivent faire leurs preuves"
  ],
  [
    "Neutral",
    "Neutre"
  ],
  [
    "Neutral",
    "Neutre"
  ],
  [
    "People Are Great",
    "Les gens sont super"
  ],
  [
    "Everyone Deserves to Die",
    "Tout le monde mérite de mourir"
  ],
  [
    "People Are Hedonistic Swine",
    "Les gens sont des porcs hédonistes"
  ],
  [
    "All Life Is Valuble",
    "Toute vie est précieuse"
  ]
] as readonly BilingualTuple[],
};

export const T12_WITCHER_LIFEPATH = {
  age: [
  [
    "Infancy : You were taken to become a witcher when you were a toddler, between 1 and 2 years old. You have no memories of life before becoming a witcher and had nothing to cling to when taking the Trial of the Grasses.",
    "Petite enfance: vous avez été amené à devenir un sorceleur quand vous étiez enfant, entre 1 et 2 ans. Vous n'avez aucun souvenir de la vie avant de devenir un sorceleur et n'aviez rien à quoi vous accrocher lorsque vous participiez à l'Épreuve des herbes ."
  ],
  [
    "Early Childhood : You were taken to become a witcher when you were young, between 4 and 6 years old. You had some normal memories to aid you when taking the Trial of the Grasses.",
    "Petite enfance: vous avez été emmené pour devenir sorceleur quand vous étiez jeune, entre 4 et 6 ans. Vous aviez des souvenirs normaux pour vous aider lors de l'essai des herbes."
  ],
  [
    "Late Childhood : You were taken to become a witcher when you were relatively old, between 8 and 11 years old. While training was somewhat harder, your many memories bolstered you when you took the Trial of the Grasses.",
    "Enfance tardive: vous étiez pris pour devenir un sorceleur quand vous étiez relativement vieux, entre 8 et 11 ans. Alors que l'entraînement était un peu plus difficile, vos nombreux souvenirs vous ont soutenu lorsque vous avez participé à l'épreuve des herbes."
  ]
] as readonly BilingualTuple[],
  school: [
  [
    "The Wolf School : You trained at Kaer Morhen in the heights of the Blue Mountains. Your training was tough and structured, focusing on a very rounded approach to the Witcher profession. You were taught to strike hard and fast to end hunts quickly.",
    "L'école du Loup: Vous vous êtes entraîné à Kaer Morhen dans les hauteurs des Blue Mountains. Votre formation a été difficile et structurée, axée sur une approche très complète du métier de sorceleur. On vous a appris à frapper fort et vite pour terminer chasse rapidement."
  ],
  [
    "The Gryphon School : You were trained at Kaer Y Seren along the coastal side of the Dragon Mountains. Your training was heavily focused on fighting any number of opponents and using your limited magical power to its greatest potential.",
    "L'école du Griffon Vous avez été formé à Kaer Y Seren le long de la côte des montagnes du Dragon. Votre formation était fortement axée sur la lutte contre un certain nombre d'adversaires et l'utilisation de votre pouvoir magique limité à son plus grand potentiel."
  ],
  [
    "The Cat School : You trained in the Dyn Marv Caravan, a traveling troop of witchers who sold their skills to anyone who could pay, for any job. Their mutations and training flayed your emotions, and you struggle against violent, cruel impulses.",
    "L'école du Chat: Vous vous êtes entraîné dans la caravane Dyn Marv, une troupe itinérante de sorciers qui a vendu ses compétences à quiconque pouvait payer, pour n'importe quel travail. Leurs mutations et leur formation ont effrayé vos émotions, et vous luttez contre des impulsions violentes et cruelles."
  ],
  [
    "The Viper School : You trained at Gorthwr Gvaed in the deep chasms of the Tir Tochair Mountains. Unlike other witchers, you were trained on twin blades and an assassination-based approach to killing monsters.",
    "L'école de la Vipère: Vous vous êtes entraîné à Gorthwr Gvaed dans les abîmes profonds des montagnes de Tir Tochair. Contrairement à d'autres sorceleurs, vous avez été formé sur les lames jumelles et une approche basée sur l'assassinat pour tuer des monstres."
  ],
  [
    "The Bear School : You trained in the snowy heights of the Amell Mountains at Haern Cadvch. You conditioned your body to endure all manner of punishment and move quickly and efficiently in heavy steel armor.",
    "L'école de l'Ours: Vous vous êtes entraîné dans le sn hauteurs des montagnes Amell à Haern Cadvch. Vous avez conditionné votre corps à supporter toutes sortes de punitions et à vous déplacer rapidement et efficacement dans une lourde armure d'acier."
  ]
] as readonly BilingualTuple[],
  training: [
  [
    "Wounded on the Gauntlet : You were wounded while running the gauntlet around your School. Your leg was broken badly, and even after healing it is still slightly stiff.",
    "Blessé au gantelet: vous avez été blessé lors de l'exécution du gantelet autour de votre école. Votre jambe a été gravement cassée, et même après la guérison, elle est encore légèrement raide."
  ],
  [
    "Stolen Knowledge : While training at your School you snuck into the libraries of the keep and copied one of the secret witcher diagrams, smuggling the information out with you.",
    "Connaissances volées: pendant l'entraînement à votre école, vous vous êtes faufilé dans les bibliothèques du donjon et copié l'un des diagrammes de sorceleur secret, en faisant passer les informations avec vous."
  ],
  [
    "Made a Rival : While training at the keep you formed a rivalry with another witcher in training. Even after mutations, their hatred of you continues to boil.",
    "Made a Rival: Pendant l'entraînement au donjon, vous avez formé une rivalité avec un autre sorceleur en formation. Même après les mutations, leur haine de vous continue à bouillir."
  ],
  [
    "Easy Mutations : You adapted well to the lesser mutations and mutagenic mushrooms you were fed early in training. When the time came for the Trial of the Grasses, you were well prepared.",
    "Mutations faciles: Vous vous êtes bien adapté aux petites mutations et aux champignons mutagènes que vous avez été nourris au début de la formation. Lorsque le moment est venu pour L'Epreuve des Herbes, vous étiez bien préparé."
  ],
  [
    "Magical Backfire : A failure casting a sign caused minor damage to your body. It was horrifically painful, and even after your body healed your Vigor threshold was lowered.",
    "Magical Backfire : Un échec à lancer un signe a causé des dommages mineurs à votre corps. C'était horriblement douloureux, et même après que votre corps ait guéri, votre seuil de vigueur a été abaissé."
  ],
  [
    "Top of Your Class : You were one of the best swordsmen in your class and your skills haven’t dulled. You perform the complex movements, pirouettes, and spins of the witcher with ease.",
    "Top of Your Class: Vous étiez l'un des meilleurs épéistes de votre classe et de votre compétences ne se sont pas émoussées. rm les mouvements complexes, les pirouettes et les tours de sorceleur avec facilité."
  ],
  [
    "Bad Reaction to Mutagens You had allergic reactions to the mutagenic mushrooms and chemical compounds given to you in early training. When the Trial of the Grasses came, it was more difficult.",
    "Mauvaise réaction aux mutagènes Vous avez eu des réactions allergiques aux champignons mutagènes et aux composés chimiques qui vous ont été donnés au début de la formation. Lorsque le procès des herbes est arrivé, c'était plus difficile. L'entraînement difficile et les situations dangereuses ont scellé votre lien."
  ],
  [
    "Made a Friend : You made a fast friend in your early years of witcher training. The rough training and dangerous situations sealed your bond.",
    "Se faire un ami : Vous vous êtes lié d’amitié avec un autre novice dès vos premières années d’entraînement. La rudesse des exercices et les dangers partagés ont scellé votre lien."
  ],
  [
    "Wounded by the Pendulum : You were wounded while training on the pendulum. You fell from the posts and broke several bones on the rocks below. While healed, you are a little stiffer than before.",
    "Blessé par le pendule: Vous avez été blessé pendant l'entraînement au pendule. Vous êtes tombé des poteaux et avez cassé plusieurs os sur les rochers en dessous. Pendant que vous êtes guéri, vous êtes un peu plus raide qu'auparavant."
  ],
  [
    "Extensive Research : While sword training was important, you spent most of your free time in the libraries of the keep studying the monsters of the world and taking notes.",
    "Recherche approfondie: Bien que l'entraînement à l'épée était important, vous avez passé la plupart de votre temps libre dans les bibliothèques du donjon à étudier les monstres du monde et à prendre des notes."
  ]
] as readonly BilingualTuple[],
  trials: [
  [
    "Nearly Fatal : The Trial of the Grasses nearly destroyed your body. Though you survived the process, your body and mind were damaged permanently.",
    "Presque fatal: L'Epreuve des Herbes a presque détruit votre corps. Bien que vous ayez survécu au processus, votre corps et votre esprit ont été endommagés de façon permanente."
  ],
  [
    "Poorly Accepted : The Trial of the Grasses went poorly and the witchers in charge of mutation weren’t entirely sure you would make it. You survived, but not without mental scars.",
    "Mal accepté: L'Epreuve des Herbes s'est mal passé et les sorciers en charge de mutation n'étaient pas tout à fait sûrs que vous y arriveriez. Vous avez survécu, mais pas sans cicatrices mentales."
  ],
  [
    "Passable Mutations : The Trial of the Grasses went well. You passed into the ranks of witchers with nothing more than memories of horrible pain.",
    "Mutations passables: Le procès des herbes s'est bien passé. Vous êtes passé dans les rangs des sorciers avec rien de plus que des souvenirs d'horribles douleurs ."
  ],
  [
    "Extra Mutations : Your body was very receptive to the Trial of the Grasses and you had extra mutations applied to you. Your body handled it well, and all of the pain paid off in the end.",
    "Mutations supplémentaires: votre corps a été très réceptif au procès des herbes et vous avez subi des mutations supplémentaires. Votre corps l'a bien géré, et toute la douleur a finalement payé."
  ]
] as readonly BilingualTuple[],
  event: [
  [
    "Given a Child by the Law of Surprises : Along your travels you invoked the Law of Surprises and received a child. They may have been a boy, in which case they were made into a witcher, or a girl, in which case their fate was up to you.",
    "Donné à un enfant par le Droit de Surprise: Au cours de vos voyages, vous avez invoqué la Droit de Surprise et reçu un enfant. Il peut s'agir d'un garçon, auquel cas il a été transformé en sorceleur ou en fille en auquel cas leur sort dépendait de vous."
  ],
  [
    "Hunted by a Sentient Monster : The tables turned during one of your hunts. Sentient monsters like grave hags and katakan can be dangerous quarry, and you wound up becoming the hunted for a stressful night.",
    "Chassé par un monstre sensible: Les tables se sont retournées lors de l'une de vos chasses. Les monstres sensibles comme les sorcières et les katakan peuvent être une carrière dangereuse, et vous vous retrouvez devenir le chassé pour une nuit stressante ."
  ],
  [
    "Fought Alongside a Knight : You did battle alongside a noble knight. This may have been against both of your wishes or even an accident, but fighting beside a noble changed your outlook on knights and your job as a witcher.",
    "Combattu aux côtés d'un chevalier: Vous avez combattu aux côtés d'un noble chevalier. Cela a peut-être été contraire à vos souhaits ou même à un accident, mais combattre aux côtés d'un noble a changé votre vision des chevaliers et de votre travail de sorceleur."
  ],
  [
    "Captured by a Mage for Testing : Mages lust after the secrets of Witcher mutations. At some point in your life, you were captured by a mage who experimented on you in an attempt to reverse-engineer them.",
    "Capturés par un mage pour les tester: les mages convoitent les secrets des mutations de Witcher. À un moment donné de votre vie, vous avez été capturé par un mage qui a fait des expériences sur vous pour tenter de les désosser."
  ],
  [
    "Worked for a Nobleman : For a time you worked for a nobleman. The pay was good, but it was strange and aggravating to have to hide most of your actions to avoid shaming the family by bringing their secrets to light.",
    "Travaillé pour un noble : Pendant un certain temps, vous avez travaillé pour un noble. Le salaire était bon, mais c'était étrange et aggra vating d'avoir à cacher la plupart de vos actions pour éviter de faire honte à la famille en dévoilant leurs secrets."
  ],
  [
    "Went Beyond the Boundaries : Once, you traveled beyond the borders of the Continent—past the Dragon Mountains, the Tir Tochair or Blue Mountains, or the Great Sea. You have seen far lands unknown to most others.",
    "Went Beyond the Boundaries: Once, you voyagé au-delà des frontières du continent - au-delà des montagnes du Dragon, du Tir Tochair ou Blue Les montagnes ou la Grande Mer. Vous avez vu des terres lointaines inconnues de la plupart des autres."
  ],
  [
    "Meaningful Romance : Most witchers remain neutral and avoid meaningful relationships. However, this didn’t stop you. You fell in love and actually considered settling down. It still occurs to you sometimes.",
    "Romance significative: La plupart des sorciers restent neutres et évitent les relations significatives. Mais cela ne vous a pas arrêté. Vous êtes tombé amoureux et avez envisagé de vous installer. Cela vous vient parfois à l'esprit."
  ],
  [
    "Fought for your Keep : You fought at a siege of your keep. You were outnumbered and overpowered, but you stayed nonetheless. You survived the siege with serious wounds, but saw your brethren dying around you.",
    "Combattu pour votre donjon: Vous avez combattu lors d'un siège de votre donjon. Vous étiez en infériorité numérique et maîtrisé, mais vous êtes néanmoins resté. Vous avez survécu au siège avec de graves blessures, mais avez vu vos frères mourir autour de vous."
  ],
  [
    "Gained Infamy : After helping a city with a monster, the people became afraid and turned on you. They might have even tried to kill you. Either way, you’ve seen what kind of reward you can expect from people.",
    "Gained Infamy: Après avoir aidé une ville avec un monstre, les gens ont eu peur et se sont tournés contre vous. Ils ont peut-être même essayé de vous tuer. Quoi qu'il en soit, vous avez vu le genre de récompense que vous pouvez attendre des gens."
  ],
  [
    "Gained Fame : You were well-received in a town after helping them with a monster. You didn’t expect free drinks or women casting you glances, but that’s what you got. You haven’t seen such kindness again, but it was heartening.",
    "Acquis la renommée: vous avez été bien reçu dans une ville après les avoir aidés avec un monstre. Vous ne vous attendiez pas à des boissons gratuites ou à des femmes qui vous jettent des regards, mais c'est ce que vous avez. Vous n’avez pas revu une telle gentillesse, mais c’était réconfortant."
  ]
] as readonly BilingualTuple[],
  now: [
  [
    "Became a Personal Witcher : You signed on to work for a merchant group, noble house, or important person as a personal witcher. You work for modest pay and hunt what they tell you to hunt. Mostly it’s monsters...",
    "Est devenu un sorceleur personnel: vous vous êtes inscrit pour travailler pour un groupe de marchands, une maison noble ou une personne importante en tant que sorceleur personnel. ."
  ],
  [
    "Looking For Work : The hard life of a witcher continues. You spend a lot of time on the road, lamenting the efficiency of your kind and the extinction of monsters. You travel constantly and never settle down.",
    "Recherche d'emploi: la dure vie d'un sorceleur continue. Vous passez beaucoup de temps sur la route, déplorant l'efficacité de votre espèce et l'extinction des monstres. Vous voyagez constamment et ne vous installez jamais."
  ],
  [
    "Became a Hermit : You gave up on the life of a witcher and traveled out into the wilderness. Now you live as a hermit in the wilds. Only now that monsters are returning have you started to venture out again.",
    "Est devenu un ermite: Vous avez abandonné la vie d'un sorceleur et vous êtes parti dans le désert. Maintenant, vous vivez comme un ermite dans la nature. Ce n'est que maintenant que les monstres reviennent que vous avez recommencé à vous aventurer."
  ],
  [
    "Turned to a Normal Life : You’ve tried for decades to leave the witcher life behind. It’s difficult, since people won’t ever really accept you, but you have managed to cobble together an almost normal life. Good luck.",
    "Passé à la normale La vie: Vous avez essayé pendant des décennies de laisser la vie de sorceleur derrière vous. C'est difficile, car les gens ne vous accepteront jamais vraiment, mais vous avez réussi à bricoler une vie presque normale. Bonne chance."
  ],
  [
    "Became a Dangerous Criminal : Eventually all the negativity and thankless people got to you— you decided that with fewer and fewer monsters, it was time to start hunting people. You can determine what you do to survive.",
    "Est devenu un criminel dangereux : Finalement, toute la négativité et les gens ingrats vous ont touché - vous avez décidé qu'avec de moins en moins de monstres, il était temps de commencer à chasser les gens. Vous pouvez déterminer ce que vous faites pour survivre."
  ]
] as readonly BilingualTuple[],
};

export const T20_NPC_QUIRKS: readonly { title: LocalizedText; body: LocalizedText }[] = [
  {
    "title": {
      "en": "Maimed",
      "fr": "Estropié"
    },
    "body": {
      "en": "This character is missing a limb or appendage. Your discretion or roll a d4: 1=arm 2=leg 3=ear 4=eye",
      "fr": "Il manque un membre ou un appendice à ce personnage. À votre discrétion ou lancez un d4: 1 = bras 2 = jambe 3 = oreille 4 = œil"
    }
  },
  {
    "title": {
      "en": "Joker speech tick",
      "fr": "Tique de discours de Joker"
    },
    "body": {
      "en": "This character ends everything they say with a chuckle or laugh.",
      "fr": "Ce personnage termine tout ce qu'il dit par un rire ou un rire."
    }
  },
  {
    "title": {
      "en": "Aggressive flirt",
      "fr": "Flirt agressif"
    },
    "body": {
      "en": "This character will make innuendo at anyone and everyone over the age of consent.",
      "fr": "Ce personnage fera des insinuations à quiconque et à tous ceux qui ont dépassé l'âge du consentement."
    }
  },
  {
    "title": {
      "en": "Sleepy",
      "fr": "Somnolent"
    },
    "body": {
      "en": "This character yawns a lot and is disinterested in the waking world.",
      "fr": "Ce personnage bâille beaucoup et se désintéresse du monde éveillé."
    }
  },
  {
    "title": {
      "en": "Alcholic",
      "fr": "Alcholique"
    },
    "body": {
      "en": "This character possesses and takes swigs from an exotic flask of liquor frequently.",
      "fr": "Ce personnage possède et prend fréquemment des gorgées d'un flacon exotique d'alcool."
    }
  },
  {
    "title": {
      "en": "Lisp",
      "fr": "Zézayer"
    },
    "body": {
      "en": "This character speaks with a lisp.",
      "fr": "Ce personnage parle avec un lisp."
    }
  },
  {
    "title": {
      "en": "OCD",
      "fr": "TOC"
    },
    "body": {
      "en": "This character requires everything to be in order, neat, strongly prefers round numbers and takes every second step, every time.",
      "fr": "Ce personnage exige que tout soit en ordre, net, préfère fortement les nombres ronds et fait un pas sur deux, à chaque fois."
    }
  },
  {
    "title": {
      "en": "Terrified",
      "fr": "Terrifié"
    },
    "body": {
      "en": "This character jumps at every knock, click and sudden movement. If they have magic, they may accidentally cast it in a surprised panic.",
      "fr": "Ce personnage saute à chaque coup, clic et mouvement brusque. S'ils ont de la magie, ils peuvent la lancer accidentellement dans une panique surprise."
    }
  },
  {
    "title": {
      "en": "Chain cigars",
      "fr": "Chaîne de cigares"
    },
    "body": {
      "en": "This character is never without a cigar or pipe. If they are a child, they always have a long blade of grass or wheat in their mouth.",
      "fr": "Ce personnage n'est jamais sans cigare ni pipe. S'ils sont enfants, ils ont toujours un long brin d'herbe ou de blé dans la bouche."
    }
  },
  {
    "title": {
      "en": "Love at first sight",
      "fr": "Le coup de foudre"
    },
    "body": {
      "en": "This character has fallen deeply, unconditionally, irreparably in love with the first PC they saw. They will do anything for them but will tolerate no rivals.",
      "fr": "Ce personnage est tombé profondément, inconditionnellement, irrémédiablement amoureux du premier PC qu'il a vu. Ils feront tout pour eux mais ne toléreront aucun rival."
    }
  },
  {
    "title": {
      "en": "Tattoos",
      "fr": "Tatouages"
    },
    "body": {
      "en": "This character is covered from head to toe in tatts. Including face, neck, fingers and yeah even 'there'. They are culturally significant or meaningless at your discretion.",
      "fr": "Ce personnage est couvert de la tête aux pieds en tatts. Y compris le visage, le cou, les doigts et ouais même «là». Ils sont culturellement significatifs ou dénués de sens à votre discrétion."
    }
  },
  {
    "title": {
      "en": "Offensive",
      "fr": "Offensive"
    },
    "body": {
      "en": "To anyone of equal or lower station, this character will inject accusations, insults and disrespect into everything they say. They are completely amiable to those of greater station.",
      "fr": "À toute personne de rang égal ou inférieur, ce personnage injectera des accusations, des insultes et un manque de respect dans tout ce qu'il dira. Ils sont tout à fait aimables à ceux de plus grande gare."
    }
  },
  {
    "title": {
      "en": "Sickly",
      "fr": "Maladif"
    },
    "body": {
      "en": "This character coughs, hacks and/or sneezes in perpetuity and gets frequent nosebleeds. If asked, they swear they are fine.",
      "fr": "Ce personnage tousse, hacque et / ou éternue à perpétuité et a des saignements de nez fréquents. Si on leur demande, ils jurent qu'ils vont bien."
    }
  },
  {
    "title": {
      "en": "Pocket baubles",
      "fr": "Boules de poche"
    },
    "body": {
      "en": "This character keeps a seemingly endless supply of valueless baubles, toys and/or trinkets in their pocket. They offer them to people a lot.",
      "fr": "Ce personnage garde une réserve apparemment infinie de boules, jouets et / ou bibelots sans valeur dans sa poche. Ils les offrent beaucoup aux gens."
    }
  },
  {
    "title": {
      "en": "Conspiracy theorist",
      "fr": "Adepte de la théorie de conspiration"
    },
    "body": {
      "en": "This character is utterly convinced that a secret organisation or aliens (your choice) run the world and are responsible for all its evils.",
      "fr": "Ce personnage est absolument convaincu qu'une organisation secrète ou des extraterrestres (votre choix) dirigent le monde et sont responsables de tous ses maux."
    }
  },
  {
    "title": {
      "en": "Vaguery",
      "fr": "Vaguery"
    },
    "body": {
      "en": "This character qualifies everything they say with 'maybe', 'perhaps', 'possibly', and avoids making certain or exact statements as much as they can get away with.",
      "fr": "Ce caractère qualifie tout ce qu'ils disent par «peut-être», «peut-être», «peut-être», et évite de faire des déclarations certaines ou exactes autant qu'ils peuvent s'en tirer."
    }
  },
  {
    "title": {
      "en": "Disability",
      "fr": "Invalidité"
    },
    "body": {
      "en": "Your choice or roll a d6: 1= Deaf, 2= Mute, 3= Blind, 4= Cannot feel pain, 5= No sense of taste, 6= No sense of smell",
      "fr": "Votre choix ou lancez un d6: 1 = Sourd, 2 = Muet, 3 = Aveugle, 4 = Ne ressent pas la douleur, 5 = Pas de goût, 6 = Pas de sens de l'odorat"
    }
  },
  {
    "title": {
      "en": "Gums Mcgee. This character has one, two or no teeth.",
      "fr": "Gums Mcgee. Ce personnage a une, deux ou pas de dents."
    },
    "body": {
      "en": "",
      "fr": ""
    }
  },
  {
    "title": {
      "en": "Racist",
      "fr": "Raciste"
    },
    "body": {
      "en": "This character has an irrational dislike for all people with even partial blood of a race (even if it's their own).<br>Roll a d8: 1= Humans 2= Elves 3= Dwarves 4= Orcs 5= Gnomes 6= Halflings 7=Tieflings 8= Race of first PC to talk to them",
      "fr": "Ce personnage a une aversion irrationnelle pour toutes les personnes ayant même le sang partiel d'une race (même si c'est la leur).<br>Lancez un d8: 1 = Humains 2 = Elfes 3 = Nains 4 = Orcs 5 = Gnomes 6 = Halflings 7 = Tieflings 8 = Race du premier PJ à leur parler"
    }
  },
  {
    "title": {
      "en": "Protective pet",
      "fr": "Animal de compagnie protecteur"
    },
    "body": {
      "en": "This character has a pet or familiar as appropriate that never leaves them and who seems to hate the PC's.<br>Roll a d8: 1= bird (choose parrot or budgy) 2= Cat 3= small dog 4= large dog 5= lizard 6= mouse 7= snake 8= rat",
      "fr": "Ce personnage a un familier ou familier selon le cas qui ne les quitte jamais et qui semble détester les PJ.<br>Lancez un d8: 1 = oiseau (choisissez perroquet ou bourgeon) 2 = chat 3 = petit chien 4 = grand chien 5 = lézard 6 = souris 7 = serpent 8 = rat"
    }
  },
  {
    "title": {
      "en": "Huge fan",
      "fr": "Grand fan"
    },
    "body": {
      "en": "This character absolutely adores the PC's and somehow knows all about them and their adventures. Pick two random PC's, they ship them.",
      "fr": "Ce personnage adore absolument les PC et sait tout sur eux et leurs aventures. Choisissez deux PC aléatoires, ils les expédient."
    }
  },
  {
    "title": {
      "en": "Immense scar",
      "fr": "Immense cicatrice"
    },
    "body": {
      "en": "This character has an obvious and large scar on their face. Battle injury or childhood accident as appropriate.",
      "fr": "Ce personnage a une cicatrice évidente et large sur le visage. Blessure de combat ou accident d'enfance, selon le cas."
    }
  },
  {
    "title": {
      "en": "Hairless",
      "fr": "Chauve"
    },
    "body": {
      "en": "There is not a single hair on this persons body.",
      "fr": "Il n'y a pas un seul cheveu sur le corps de cette personne."
    }
  },
  {
    "title": {
      "en": "Unusually short",
      "fr": "Exceptionnellement court"
    },
    "body": {
      "en": "This character is significantly shorter than you'd expect. If human, they are now a halfling who absolutely believes they are human.",
      "fr": "Ce personnage est nettement plus court que prévu. S'ils sont humains, ils sont maintenant un halfelin qui croit absolument qu'ils sont humains."
    }
  },
  {
    "title": {
      "en": "Unusually tall",
      "fr": "Exceptionnellement grand"
    },
    "body": {
      "en": "This character is significantly taller than you'd expect. If halfling, they are now a human who absolutely believes they are halfling.",
      "fr": "Ce personnage est nettement plus grand que prévu. S'ils sont halfelins, ils sont maintenant un humain qui croit absolument qu'ils sont halfelins."
    }
  },
  {
    "title": {
      "en": "Bzzt",
      "fr": "Bzzt"
    },
    "body": {
      "en": "Tells people to shush with an annoying 'BZZZZZT' sound.",
      "fr": "Dit aux gens de se taire avec un son ennuyeux «BZZZZZT»."
    }
  },
  {
    "title": {
      "en": "Oedipus",
      "fr": "Œdipe"
    },
    "body": {
      "en": "Has a portrait of their mother in every room. Adores and defers to their mother if present. Will tolerate no disrespect of her no matter what.",
      "fr": "A un portrait de leur mère dans chaque pièce. Adore et s'en remet à sa mère si elle est présente. Ne tolérera aucun manque de respect envers elle quoi qu'il arrive."
    }
  },
  {
    "title": {
      "en": "Allergy",
      "fr": "Allergie"
    },
    "body": {
      "en": "This character will uncontrollably sneeze and suffer rashes/swelling when coming into contact with flowers.",
      "fr": "Ce personnage éternuera de manière incontrôlable et souffrira d'éruptions cutanées / d'enflure au contact des fleurs."
    }
  },
  {
    "title": {
      "en": "Freezing",
      "fr": "Gelé"
    },
    "body": {
      "en": "This character is always in much more clothing than the weather calls for, and seems to shiver/teeth chatter a lot.",
      "fr": "Ce personnage porte toujours beaucoup plus de vêtements que la météo ne l'exige, et semble frissonner / claquer des dents beaucoup."
    }
  },
  {
    "title": {
      "en": "What cold?",
      "fr": "Quel froid?"
    },
    "body": {
      "en": "This character is always wearing very little, and if asked will say it's too warm and question how the PC's can stand it, they sweat a lot.",
      "fr": "Ce personnage porte toujours très peu de vêtements, et s'il lui est demandé de dire qu'il fait trop chaud et de se demander comment les PC peuvent le supporter, ils transpirent beaucoup."
    }
  },
  {
    "title": {
      "en": "Apologetic",
      "fr": "Apologétique"
    },
    "body": {
      "en": "This character apologises for everything, anything, to anyone, all the time.",
      "fr": "Ce personnage s'excuse pour tout, n'importe quoi, à n'importe qui, tout le temps."
    }
  },
  {
    "title": {
      "en": "Patriot",
      "fr": "Patriote"
    },
    "body": {
      "en": "This characters nationality is incredibly important to them. They will act in what they perceive as the interests of the country no matter what it takes.",
      "fr": "Cette nationalité des personnages est extrêmement importante pour eux. Ils agiront dans ce qu'ils perçoivent comme les intérêts du pays, quoi qu'il en coûte."
    }
  },
  {
    "title": {
      "en": "Devout",
      "fr": "Pieux"
    },
    "body": {
      "en": "Pick a deity. This character is a staunch worshipper and has adopted some of the personality traits of that god/goddess and their domain. Optional d4: 1= lawful god 2= chaotic god 3= good god 4= neutral god",
      "fr": "Choisissez une divinité. Ce personnage est un fidèle adorateur et a adopté certains des traits de personnalité de ce dieu / déesse et de leur domaine. Optionnel d4: 1 = dieu légitime 2 = dieu chaotique 3 = bon dieu 4 = dieu neutre"
    }
  },
  {
    "title": {
      "en": "Forbidden love. This character has a secret and relationship with someone. It should also be someone in a dramatically different station (eg if they are noble, it is a pauper). It would create scandal in the community if it got out.",
      "fr": "Amour interdit. Ce personnage a un secret et une relation avec quelqu'un. Cela devrait aussi être quelqu'un dans une situation radicalement différente (par exemple, s'il est noble, c'est un pauvre). Cela créerait un scandale dans la communauté s'il sortait."
    },
    "body": {
      "en": "",
      "fr": ""
    }
  },
  {
    "title": {
      "en": "Incompetent, Clumsy & totally unaware",
      "fr": "Incompétent, maladroit et totalement inconscient"
    },
    "body": {
      "en": "Whatever profession or hobbies this character has, they are bad at it. Whatever they have to roll and in whatever context, -5 from it. They do not believe they are bad.",
      "fr": "Quelle que soit la profession ou les passe-temps de ce personnage, ils sont mauvais. Tout ce qu'ils doivent rouler et dans n'importe quel contexte, -5 à partir de là. Ils ne croient pas qu'ils sont mauvais."
    }
  },
  {
    "title": {
      "en": "Idiot savant",
      "fr": "Idiot savant"
    },
    "body": {
      "en": "If higher, set this characters intelligence and wisdom to 8. Pick one appropriate skill or hobby. They are inexplicably brilliant at it and where able should get +10 to all rolls regarding it.",
      "fr": "S'il est supérieur, réglez l'intelligence et la sagesse de ce personnage sur 8. Choisissez une compétence ou un passe-temps approprié. Ils sont inexplicablement brillants dans ce domaine et, dans la mesure du possible, devraient obtenir +10 à tous les rouleaux à ce sujet."
    }
  },
  {
    "title": {
      "en": "Possessed",
      "fr": "Possédé"
    },
    "body": {
      "en": "This character is possessed by a spirit. They are aware of each other and switch at random with a cough. Roll a d4: 1= Spirit is evil 2= Spirit is good 3= Spirit is the characters dead-at-birth twin 4= split personality.",
      "fr": "Ce personnage est possédé par un esprit. Ils sont conscients l'un de l'autre et changent au hasard avec une toux. Lancez un d4: 1 = l'esprit est mauvais 2 = l'esprit est bon 3 = l'esprit est le personnage jumeau mort à la naissance 4 = double personnalité."
    }
  },
  {
    "title": {
      "en": "Compulsive liar & braggart",
      "fr": "Menteur compulsif et fanfaron"
    },
    "body": {
      "en": "Character lies, brags and boasts about everything. The lies are brazen and ludicrous, and may even contradict previous lies, but the character will stand by them with absolute conviction.",
      "fr": "Le personnage ment, se vante et se vante de tout. Les mensonges sont effrontés et ridicules, et peuvent même contredire les mensonges précédents, mais le personnage les soutiendra avec une conviction absolue."
    }
  },
  {
    "title": {
      "en": "Anti-theist",
      "fr": "Anti-théiste"
    },
    "body": {
      "en": "The character hates the gods, angels, fey, demons and devils. They resent and despise those who are subserviant to them.",
      "fr": "Le personnage déteste les dieux, les anges, les fées, les démons et les démons. Ils en ressentent et méprisent ceux qui leur sont soumis."
    }
  },
  {
    "title": {
      "en": "Waterworks",
      "fr": "Aqueduc"
    },
    "body": {
      "en": "This character cries a lot. Good emotions, bad emotions, all emotions draw tears.",
      "fr": "Ce personnage pleure beaucoup. Les bonnes émotions, les mauvaises émotions, toutes les émotions font pleurer."
    }
  },
  {
    "title": {
      "en": "Lycanthrope",
      "fr": "Lycanthrope"
    },
    "body": {
      "en": "This character is actually a lycanthrope.<br>Optionally roll a d6: 1= Wererat, 2= Wereboar 3= Werebadger 4= Werewolf 5= Weresnake 6= Werebat",
      "fr": "Ce personnage est en fait un lycanthrope.<br>Lancez éventuellement un d6: 1 = Wererat, 2 = Wereboar 3 = Werebadger 4 = Werewolf 5 = Weresnake 6 = Werebat"
    }
  },
  {
    "title": {
      "en": "Latent sorcery",
      "fr": "Sorcellerie latente"
    },
    "body": {
      "en": "This character has a seemingly unexplained ability to cast a random cantrip at will.<br>Optionally roll a d12: 1= minor illusion 2= light 3= gust 4= mage hand 5= prestidigitation 6= vicious mockery 7= friends 8= shape water 9= resistance 10= message 11= mold earth 12= control flames",
      "fr": "Ce personnage a une capacité apparemment inexpliquée à lancer un sort aléatoire à volonté.<br>Lancez éventuellement un d12: 1 = illusion mineure 2 = lumière 3 = rafale 4 = main de mage 5 = prestidigitation 6 = moquerie vicieuse 7 = amis 8 = forme eau 9 = résistance 10 = message 11 = terre de moisissure 12 = flammes de contrôle"
    }
  },
  {
    "title": {
      "en": "Arts & Crafts",
      "fr": "Art et Bricolages"
    },
    "body": {
      "en": "This character is utterly dedicated to their hobby and spends as much time as possible on it. Optional d8: 1= knitting 2= woodworks 3= jewelcraft 4= origami 5= puppeteering 6= coin collection 7= painting 8= cooking",
      "fr": "Ce personnage est totalement dédié à son passe-temps et y passe le plus de temps possible. Optionnel d8: 1 = tricot 2 = boiseries 3 = joaillerie 4 = origami 5 = marionnettiste 6 = collection de pièces 7 = peinture 8 = cuisine"
    }
  },
  {
    "title": {
      "en": "Musician",
      "fr": "Musicien"
    },
    "body": {
      "en": "This character is a talented and dedicated musician. Optional d8: 1= guitar 2= flute 3= harmonica 4= harp 5= lute 6= violin 7= drums 8= singing",
      "fr": "Ce personnage est un musicien talentueux et dévoué. En option d8: 1 = guitare 2 = flûte 3 = harmonica 4 = harpe 5 = luth 6 = violon 7 = batterie 8 = chant"
    }
  },
  {
    "title": {
      "en": "Grinner",
      "fr": "Grinner"
    },
    "body": {
      "en": "This character is always smiling.",
      "fr": "Ce personnage est toujours souriant."
    }
  },
  {
    "title": {
      "en": "Resting bitch face",
      "fr": "Visage de chienne au repos"
    },
    "body": {
      "en": "This character is constantly scowling.",
      "fr": "Ce personnage est constamment renfrogné."
    }
  },
  {
    "title": {
      "en": "Fashionista",
      "fr": "Fashionista"
    },
    "body": {
      "en": "This character is always adorned in exotic colours and exuberant clothing. If poor, they still wear clothes that are noticeably better than their peers.",
      "fr": "Ce personnage se pare toujours de couleurs exotiques et de vêtements exubérants. S'ils sont pauvres, ils portent toujours des vêtements nettement meilleurs que leurs pairs."
    }
  },
  {
    "title": {
      "en": "Drow-born escapee",
      "fr": "Évadé né drow"
    },
    "body": {
      "en": "Whatever they are now, this character spent their formative years as a slave of the drow. They instinctively defer to women and see men as lesser.",
      "fr": "Quoi qu'ils soient maintenant, ce personnage a passé ses années de formation en tant qu'esclave du drow. Ils s'en remettent instinctivement aux femmes et considèrent les hommes comme inférieurs."
    }
  },
  {
    "title": {
      "en": "Sexist",
      "fr": "Sexiste"
    },
    "body": {
      "en": "This character doesn't trust the competency of women (even if they are one) and assumes men are the leaders in any given situation.",
      "fr": "Ce personnage ne fait pas confiance aux compétences des femmes (même si elles en sont une) et suppose que les hommes sont les leaders dans une situation donnée."
    }
  },
  {
    "title": {
      "en": "Vegan / Animal rights activist",
      "fr": "Militante des droits végétaliens / animaux"
    },
    "body": {
      "en": "This character loves animals and sees them as deserving of the same right to life that we all have. Decide contextually if they respect the choice of others to eat meat or are activists about it.",
      "fr": "Ce personnage aime les animaux et les considère comme méritant le même droit à la vie que nous avons tous. Décidez de manière contextuelle s'ils respectent le choix des autres de manger de la viande ou s'ils sont militants à ce sujet."
    }
  },
  {
    "title": {
      "en": "Salt glutton",
      "fr": "Glouton de sel"
    },
    "body": {
      "en": "This person puts enormous amounts of salt on everything they eat. Like, ludicrous amounts of it.",
      "fr": "Cette personne met d'énormes quantités de sel sur tout ce qu'elle mange. Comme, des quantités ridicules."
    }
  },
  {
    "title": {
      "en": "Sugar addict",
      "fr": "Accro au sucre"
    },
    "body": {
      "en": "This person puts enormous amounts of sugar into everything they eat and drink. Everything.",
      "fr": "Cette personne met d'énormes quantités de sucre dans tout ce qu'elle mange et boit. Tout."
    }
  },
  {
    "title": {
      "en": "Imaginary friend",
      "fr": "Ami imaginaire"
    },
    "body": {
      "en": "This person has an imaginary friend that they talk to. If they are a child they will do it in front of others.",
      "fr": "Cette personne a un ami imaginaire à qui elle parle. S'ils sont enfants, ils le feront devant les autres."
    }
  },
  {
    "title": {
      "en": "Sniff",
      "fr": "Renifler"
    },
    "body": {
      "en": "This character sniffs before and during their speaking.",
      "fr": "Ce personnage renifle avant et pendant leur discours."
    }
  },
  {
    "title": {
      "en": "Unusual accent",
      "fr": "Accent inhabituel"
    },
    "body": {
      "en": "This character swears they are local, but they speak with a foreign accent.",
      "fr": "Ce personnage jure qu'ils sont locaux, mais ils parlent avec un accent étranger."
    }
  },
  {
    "title": {
      "en": "Adulterer",
      "fr": "Adultère"
    },
    "body": {
      "en": "This character has two lovers, but only one is publicly known.",
      "fr": "Ce personnage a deux amants, mais un seul est publiquement connu."
    }
  },
  {
    "title": {
      "en": "Aspiring adventurer",
      "fr": "Aspirant aventurier"
    },
    "body": {
      "en": "This character is on the verge of becoming their own level 1 adventurer. They are especially interested in the talents and expertise of others as they try to decide their class.",
      "fr": "Ce personnage est sur le point de devenir son propre aventurier de niveau 1. Ils sont particulièrement intéressés par les talents et l'expertise des autres lorsqu'ils essaient de décider de leur classe."
    }
  },
  {
    "title": {
      "en": "Misery guts",
      "fr": "Les tripes de la misère"
    },
    "body": {
      "en": "This character is cynical about themselves, others, and everything else. They only see the worst outcomes and they bring the mood down everywhere they go.",
      "fr": "Ce personnage est cynique envers lui-même, les autres et tout le reste. Ils ne voient que les pires résultats et ils font baisser l'ambiance partout où ils vont."
    }
  },
  {
    "title": {
      "en": "Happy go lucky",
      "fr": "Heureux, chanceux"
    },
    "body": {
      "en": "This character is optimistic about themselves, others and everything else. They see the best in everyone and are always trying to lighten the mood, lift spirits.",
      "fr": "Ce personnage est optimiste sur lui-même, les autres et tout le reste. Ils voient le meilleur de tout le monde et essaient toujours d'alléger l'ambiance, de remonter le moral."
    }
  },
  {
    "title": {
      "en": "Royal/Noble bastard",
      "fr": "Bâtard royal / noble"
    },
    "body": {
      "en": "This character is the illegitimate child of someone of great power and stature in their community or kingdom.",
      "fr": "Ce personnage est l'enfant illégitime de quelqu'un de grand pouvoir et de grande stature dans sa communauté ou son royaume."
    }
  },
  {
    "title": {
      "en": "Terminally ill",
      "fr": "En phase terminale"
    },
    "body": {
      "en": "This character has an illness that is not contagious, but will kill them soon. They are aware of and at peace with it.",
      "fr": "Ce personnage a une maladie qui n'est pas contagieuse, mais qui les tuera bientôt. Ils en sont conscients et en paix avec elle."
    }
  },
  {
    "title": {
      "en": "Unrequited love",
      "fr": "Amour non réciproque"
    },
    "body": {
      "en": "This character is hopelessly in love with someone else in their community who has no interest in them.",
      "fr": "Ce personnage est désespérément amoureux de quelqu'un d'autre dans sa communauté qui ne s'intéresse pas à lui."
    }
  },
  {
    "title": {
      "en": "Bird Enthusiast",
      "fr": "Passionné d'oiseaux"
    },
    "body": {
      "en": "This character is hugely enthusiastic about flying creatures. They document them, see them, love them. Optional d4: 1= All birds 2= Rare birds 3= Large birds 4= Not birds, but dragons",
      "fr": "Ce personnage est extrêmement passionné par les créatures volantes. Ils les documentent, les voient, les aiment. Optionnel d4: 1 = Tous les oiseaux 2 = Oiseaux rares 3 = Grands oiseaux 4 = Pas des oiseaux, mais des dragons"
    }
  },
  {
    "title": {
      "en": "Grisly veteran",
      "fr": "Vétéran macabre"
    },
    "body": {
      "en": "This character has seen and been through war and it has affected them. If they are too young to have seen war, they are instead youthful, optimistic & determined to join the army as soon as they can.",
      "fr": "Ce personnage a vu et vécu la guerre et cela les a affectés. S'ils sont trop jeunes pour avoir vu la guerre, ils sont plutôt jeunes, optimistes et déterminés à rejoindre l'armée dès qu'ils le peuvent."
    }
  },
  {
    "title": {
      "en": "Spy",
      "fr": "Espion"
    },
    "body": {
      "en": "This character is loyal to, and collects information for an organisation. Optional d4: 1= foreign nation 2= organised crime 3= cult 4= a rival noble to the ruling faction",
      "fr": "Ce personnage est fidèle et recueille des informations pour une organisation. Facultatif d4: 1 = nation étrangère 2 = crime organisé 3 = culte 4 = noble rival de la faction dirigeante"
    }
  },
  {
    "title": {
      "en": "Warlock",
      "fr": "Démoniste"
    },
    "body": {
      "en": "This character has sold their soul to an extra-planar patron in return for power, and they are bound to their motives.",
      "fr": "Ce personnage a vendu son âme à un patron extra-planaire en échange de pouvoir, et ils sont liés à leurs motivations."
    }
  },
  {
    "title": {
      "en": "Bound fiend",
      "fr": "Démon lié"
    },
    "body": {
      "en": "In a place normally accessible only to this character is a ritually and securely bound fiend that serves them.",
      "fr": "Dans un endroit normalement accessible uniquement à ce personnage se trouve un démon rituellement et solidement lié qui les sert."
    }
  },
  {
    "title": {
      "en": "Blessed by a god",
      "fr": "Béni par un dieu"
    },
    "body": {
      "en": "This character has been chosen by a good deity for some purpose, and have an aura of holiness to them.",
      "fr": "Ce personnage a été choisi par une bonne divinité dans un certain but, et a une aura de sainteté pour eux."
    }
  },
  {
    "title": {
      "en": "Skint/Hard up for cash",
      "fr": "Skint / Hard pour de l'argent"
    },
    "body": {
      "en": "This character is always out of money. They make terrible financial decisions. They are always borrowing and never pay back.",
      "fr": "Ce personnage est toujours à court d'argent. Ils prennent de terribles décisions financières. Ils empruntent toujours et ne remboursent jamais."
    }
  },
  {
    "title": {
      "en": "Dealer",
      "fr": "Marchand"
    },
    "body": {
      "en": "If asked in thieves cant or if someone knows the code phrase, this character can supply a range of drugs and alchemical resources for a fair price. Code phrase is your choice, otherwise it is 'I need to feed the owls'.",
      "fr": "Si demandé aux voleurs ne peut pas ou si quelqu'un connaît la phrase de code, ce personnage peut fournir une gamme de médicaments et de ressources alchimiques à un prix raisonnable. La phrase de code est votre choix, sinon c'est «j'ai besoin de nourrir les hiboux»."
    }
  },
  {
    "title": {
      "en": "Bee keeper, Dog owner, Cat lady",
      "fr": "Apiculteur, propriétaire de chien, dame de chat"
    },
    "body": {
      "en": "This character either currently maintains beehives, or they aspire to if they do not own property. Alternatively they own a lot of dogs, or a lot of cats. Optional roll d3: 1= Bees, 2= Dogs, 3= Cats.",
      "fr": "Ce personnage entretient actuellement des ruches ou y aspire s'il ne possède pas de propriété. Alternativement, ils possèdent beaucoup de chiens ou beaucoup de chats. Rouleau optionnel d3: 1 = Abeilles, 2 = Chiens, 3 = Chats."
    }
  },
  {
    "title": {
      "en": "Nicknamer",
      "fr": "Nicknamer"
    },
    "body": {
      "en": "This character makes up nicknames for everyone they know, and seemingly forgets their real names. The nicknames can be positive or negative.",
      "fr": "Ce personnage invente des surnoms pour tous ceux qu'il connaît et oublie apparemment leurs vrais noms. Les surnoms peuvent être positifs ou négatifs."
    }
  },
  {
    "title": {
      "en": "No boundaries",
      "fr": "Pas de frontières"
    },
    "body": {
      "en": "This character is unaware of personal space. They will get too close, touch strangers in friendly ways, sit right next to you on a large empty bench. All the worst things.",
      "fr": "Ce personnage ignore l'espace personnel. Ils s'approcheront trop près, toucheront des inconnus de manière amicale, s'assoiront juste à côté de vous sur un grand banc vide. Toutes les pires choses."
    }
  },
  {
    "title": {
      "en": "No filter",
      "fr": "Pas de filtre"
    },
    "body": {
      "en": "This character does not filter personal details about their lives or the lives of anyone else. They will talk about going to the toilet, ask you when you last had sex, and never realise when they make things awkward.",
      "fr": "Ce personnage ne filtre pas les détails personnels sur leur vie ou la vie de quiconque. Ils parleront d'aller aux toilettes, vous demanderont quand vous avez eu des relations sexuelles pour la dernière fois et ne se rendront jamais compte quand ils gênent les choses."
    }
  },
  {
    "title": {
      "en": "Taciturn",
      "fr": "Taciturne"
    },
    "body": {
      "en": "This character speaks in one word answers. They rarely string whole sentences together.",
      "fr": "Ce personnage parle en un mot répond. Ils enchaînent rarement des phrases entières."
    }
  },
  {
    "title": {
      "en": "Never blinks",
      "fr": "Ne clignote jamais"
    },
    "body": {
      "en": "This character rarely blinks, and subjects people to long stares.",
      "fr": "Ce personnage clignote rarement et soumet les gens à de longs regards."
    }
  },
  {
    "title": {
      "en": "Dulcet tones",
      "fr": "Des tons doux"
    },
    "body": {
      "en": "This characters voice is incredibly pleasing to the ears. They command attention more easily and people could listen to them speak for hours without complaint.",
      "fr": "Cette voix de personnages est incroyablement agréable aux oreilles. Ils attirent l'attention plus facilement et les gens peuvent les écouter parler pendant des heures sans se plaindre."
    }
  },
  {
    "title": {
      "en": "Questioner?",
      "fr": "Questionneur?"
    },
    "body": {
      "en": "This character ends every sentence like it's a question? No matter what the statement is?",
      "fr": "Ce personnage termine chaque phrase comme si c'était une question? Quelle que soit la déclaration?"
    }
  },
  {
    "title": {
      "en": "Caked in make-up",
      "fr": "Cuit dans le maquillage"
    },
    "body": {
      "en": "This character is always in obvious layers of thick make-up. Expertly or clumsily applied at DM discretion.",
      "fr": "Ce personnage est toujours en couches évidentes de maquillage épais. Appliqué de manière experte ou maladroite à la discrétion de DM."
    }
  },
  {
    "title": {
      "en": "Fitness junky",
      "fr": "Accro au fitness"
    },
    "body": {
      "en": "This character is significantly more jacked than others of similar age and species. They have a heavy workout regimen and take their physical appearance very seriously.",
      "fr": "Ce personnage est nettement plus branlé que d'autres de même âge et espèce. Ils ont un régime d'entraînement intensif et prennent leur apparence physique très au sérieux."
    }
  },
  {
    "title": {
      "en": "Evil cackle",
      "fr": "Ricanement maléfique"
    },
    "body": {
      "en": "This character laughs like a supervillain.",
      "fr": "Ce personnage rit comme un supervillain."
    }
  },
  {
    "title": {
      "en": "Phobia of magic",
      "fr": "Phobie de la magie"
    },
    "body": {
      "en": "This character is scared of magic, magic users and all things related.",
      "fr": "Ce personnage a peur de la magie, des utilisateurs de magie et de tout ce qui y est lié."
    }
  },
  {
    "title": {
      "en": "Nature spirit",
      "fr": "Esprit de la nature"
    },
    "body": {
      "en": "This character prefers to be amongst the trees and wildlife. If they are in civilisation, it depresses them. They are drawn to kindred spirits.",
      "fr": "Ce personnage préfère être parmi les arbres et la faune. S'ils sont dans la civilisation, cela les déprime. Ils sont attirés par les esprits apparentés."
    }
  },
  {
    "title": {
      "en": "Paranoid of theft",
      "fr": "Paranoïaque du vol"
    },
    "body": {
      "en": "This character has traps and locks on everything they own, and if they have the resources, golem guards too.",
      "fr": "Ce personnage a des pièges et des verrous sur tout ce qu'il possède, et s'il en a les ressources, les gardes de golem aussi."
    }
  },
  {
    "title": {
      "en": "Imposter!",
      "fr": "Imposteur!"
    },
    "body": {
      "en": "This character killed and replaced the person they purport to be. Their story isn't completely straight and they urge their friends and family to self-sabotage.",
      "fr": "Ce personnage a tué et remplacé la personne qu'il prétend être. Leur histoire n'est pas tout à fait claire et ils exhortent leurs amis et leur famille à s'auto-saboter."
    }
  },
  {
    "title": {
      "en": "Klepto",
      "fr": "Klepto"
    },
    "body": {
      "en": "This character will try to steal from people whenever they can. Give them proficiency in sleight of hand.",
      "fr": "Ce personnage essaiera de voler les gens chaque fois qu'il le pourra. Donnez-leur la maîtrise du tour de passe-passe."
    }
  },
  {
    "title": {
      "en": "Small scale anarchist",
      "fr": "Anarchiste à petite échelle"
    },
    "body": {
      "en": "When no one is looking, this character will displace, mess up, break, destroy, unlock, lock, move and damage things, especially public property.",
      "fr": "Lorsque personne ne regarde, ce personnage déplacera, gâchera, brisera, détruira, déverrouillera, verrouille, bougera et endommagera les choses, en particulier les biens publics."
    }
  },
  {
    "title": {
      "en": "Debilitating Social Anxiety",
      "fr": "Anxiété sociale débilitante"
    },
    "body": {
      "en": "This character comes off as extremely shy -- avoiding social interaction and being very closed off to people they don't know.",
      "fr": "Ce personnage se révèle extrêmement timide - évitant les interactions sociales et étant très fermé aux personnes qu'il ne connaît pas."
    }
  },
  {
    "title": {
      "en": "Little green sidekick",
      "fr": "Petit acolyte vert"
    },
    "body": {
      "en": "This character has an intelligent (for a) goblin companion who is their best friend. The goblin can speak common and any native languages of the character. The goblins name is up to you, otherwise it is 'Pickles'.",
      "fr": "Ce personnage a un compagnon gobelin intelligent (pour un) qui est son meilleur ami. Le gobelin peut parler les langues communes et natives du personnage. Le nom des gobelins dépend de vous, sinon c'est «Pickles»."
    }
  },
  {
    "title": {
      "en": "Wanted / Exiled",
      "fr": "Recherché / exilé"
    },
    "body": {
      "en": "This character is either wanted, or exiled from a foreign nation for treason. They go by a fake name and will go to any length to avoid being found out.",
      "fr": "Ce personnage est soit recherché, soit exilé d'une nation étrangère pour trahison. Ils portent un faux nom et feront tout leur possible pour éviter d'être découverts."
    }
  },
  {
    "title": {
      "en": "Guardian",
      "fr": "Gardien"
    },
    "body": {
      "en": "This character has adopted a young orphan who they are highly protective of.<br>Optional d6 for orphan race: 1= dragonborn, 2= half-orc, 3= human, 4= gnome, 5= dwarf, 6= tiefling",
      "fr": "Ce personnage a adopté un jeune orphelin dont il est très protecteur.<br>D6 optionnel pour la race orpheline: 1 = dragonborn, 2 = demi-orc, 3 = humain, 4 = gnome, 5 = nain, 6 = tiefling"
    }
  },
  {
    "title": {
      "en": "Puppeteer",
      "fr": "Marionnettiste"
    },
    "body": {
      "en": "This character lost a dear family member, and recreated them as a puppet who they go everywhere with.<br>Optional d4: 1= Puppet is a dead spouse, 2= dead child, 3= dead sibling, 4= dead parent",
      "fr": "Ce personnage a perdu un membre de sa famille et l'a recréé comme une marionnette avec qui il va partout.<br>Optionnel d4: 1 = la marionnette est un conjoint décédé, 2 = un enfant décédé, 3 = un frère décédé, 4 = un parent décédé"
    }
  },
  {
    "title": {
      "en": "Wrestler",
      "fr": "Lutteur"
    },
    "body": {
      "en": "This has a wrestling persona that they perform as on weekends. The local community has a wrestling ring with at least 4 other wrestlers.",
      "fr": "Cela a un personnage de lutte qu'ils jouent le week-end. La communauté locale a un ring de lutte avec au moins 4 autres lutteurs."
    }
  },
  {
    "title": {
      "en": "Mystic",
      "fr": "Mystique"
    },
    "body": {
      "en": "This character is a divination prodigy. No matter who they are or their walk of life, they now also carry a deck of cards and can be persuaded to offer readings of fortune.",
      "fr": "Ce personnage est un prodige de la divination. Peu importe qui ils sont ou leur chemin de vie, ils ont maintenant aussi un jeu de cartes et peuvent être persuadés d'offrir des lectures de fortune."
    }
  },
  {
    "title": {
      "en": "Initiate",
      "fr": "Lancer"
    },
    "body": {
      "en": "This character has been accepted into one of the schools of wizardry.<br>Optional d8: 1= Abju 2= Conju 3= Divi 4= Ench 5= Evoc 6= illu 7= transmu 8= necro or war (dm's choice)",
      "fr": "Ce personnage a été accepté dans l'une des écoles de magie.<br>Optionnel d8: 1 = Abju 2 = Conju 3 = Divi 4 = Ench 5 = Evoc 6 = illu 7 = transmu 8 = necro ou war (choix de dm)"
    }
  },
  {
    "title": {
      "en": "Secretly evil",
      "fr": "Secrètement mal"
    },
    "body": {
      "en": "This characters alignment is evil, but they do their best to hide it from others by framing their self interest and sadism as something wholesome or as being motivated for the greater good.",
      "fr": "Cet alignement des personnages est mauvais, mais ils font de leur mieux pour le cacher aux autres en présentant leur intérêt personnel et leur sadisme comme quelque chose de sain ou comme étant motivé pour le plus grand bien."
    }
  },
  {
    "title": {
      "en": "Oath-bound",
      "fr": "Serment lié"
    },
    "body": {
      "en": "This character has taken an oath that has a binding, divine aspect to it. They need not be a paladin.<br>Optional d4: 1= Oath of vengeance, 2= Oath of redemption, 3= They're an oathbreaker, 4= Oath of devotion",
      "fr": "Ce personnage a prêté un serment qui a un aspect divin contraignant. Ils n'ont pas besoin d'être un paladin.<br>Optionnel d4: 1 = Serment de vengeance, 2 = Serment de rédemption, 3 = Ils sont un briseur de serment, 4 = Serment de dévotion"
    }
  },
  {
    "title": {
      "en": "Hoarder",
      "fr": "Accumulateur"
    },
    "body": {
      "en": "This character collects everything, and is loathe to part with anything of their own. Wherever they reside is cluttered with valueless furniture and trinkets, but valuable lore and books may lie forgotten within.",
      "fr": "Ce personnage collectionne tout et déteste se séparer de tout ce qui lui est propre. Partout où ils résident sont encombrés de meubles et de bibelots sans valeur, mais des connaissances et des livres précieux peuvent être oubliés à l'intérieur."
    }
  },
  {
    "title": {
      "en": "Revolutionary spirit",
      "fr": "Esprit révolutionnaire"
    },
    "body": {
      "en": "This character resents nobility and established power. The greater a persons social rank, the more disgusted and distrustful they are. The more impoverished and powerless, the more this character sympathises.",
      "fr": "Ce personnage ressent la noblesse et le pouvoir établi. Plus une personne a un rang social élevé, plus elle est dégoûtée et méfiante. Plus ce personnage est appauvri et impuissant, plus ce personnage sympathise."
    }
  },
  {
    "title": {
      "en": "Avatar of Deity",
      "fr": "Avatar de la divinité"
    },
    "body": {
      "en": "This character is a mortal avatar of a deity that someone in the party worships. The party cannot detect this under any circumstances. If the party worships no god, they are Tymora, goddess of luck.",
      "fr": "Ce personnage est un avatar mortel d'une divinité que quelqu'un dans le groupe adore. Le parti ne peut en aucun cas détecter cela. Si le parti n'adore aucun dieu, ce sont Tymora, déesse de la chance."
    }
  }
];

export const T22_VISUAL_FEATURES: readonly BilingualTuple[] = [
  [
    "A visible facial scar",
    "Une cicatrice faciale visible"
  ],
  [
    "mismatched colors in eyes",
    "Couleurs incompatibles dans les yeux"
  ],
  [
    "a missing limb replace with a prosthetic",
    "Remplacement d'un membre manquant par une prothèse"
  ],
  [
    "A tattoo in the shape of an unknown monster",
    "Un tatouage en forme de monstre inconnu"
  ],
  [
    "extra toes",
    "Orteils supplémentaires"
  ],
  [
    "Scars from a whip",
    "Cicatrices d'un fouet"
  ],
  [
    "Missing earlobes",
    "Oreilles manquantes"
  ],
  [
    "A nose that has obviously been broken multiple times",
    "Un nez qui a manifestement été cassé plusieurs fois"
  ],
  [
    "very thin lips",
    "Lèvres très fines"
  ],
  [
    "A gold tooth",
    "Une dent en or"
  ],
  [
    "Acne",
    "Acné"
  ],
  [
    "Scars from frostbite",
    "Cicatrices d'engelures"
  ],
  [
    "A foreign object is stuck in your body and cannot be removed but does not harm you",
    "Un objet étranger est coincé dans votre corps et ne peut pas être retiré mais ne vous nuit pas"
  ],
  [
    "lighter colored patches across your skin",
    "Taches de couleur plus claire sur votre peau"
  ],
  [
    "hints of features from another race",
    "Indices de fonctionnalités d'une autre race"
  ],
  [
    "Albinism",
    "Albinisme"
  ],
  [
    "Torn Ear",
    "Oreille déchirée"
  ],
  [
    "A pure black glass eye",
    "Un œil de verre noir pur"
  ],
  [
    "Blackened fingertips",
    "Bouts des doigts noircis"
  ],
  [
    "Black/White Lips",
    "Lèvres noires / blanches"
  ],
  [
    "Moving at normal speeds despite a Limp",
    "Se déplacer à vitesse normale malgré une boiterie"
  ],
  [
    "Naturally odd colored hair",
    "Cheveux naturellement colorés"
  ],
  [
    "a red drunkard's nose",
    "Nez d'ivrogne rouge"
  ],
  [
    "An obvious tan line",
    "Une ligne de bronzage évidente"
  ],
  [
    "A very obvious unibrow",
    "Un monosourcil très évident"
  ],
  [
    "left handed",
    "Gaucher"
  ],
  [
    "some rotting teeth",
    "Quelques dents pourries"
  ],
  [
    "no discernible gender",
    "Pas de sexe discernable"
  ],
  [
    "strands of differently colored hair",
    "Mèches de cheveux de couleurs différentes"
  ],
  [
    "a feather or flower in your hair or hat",
    "Une plume ou une fleur dans vos cheveux ou votre chapeau"
  ],
  [
    "distinctive hair style",
    "Coiffures distinctives"
  ],
  [
    "something woven into a beard",
    "Quelque chose tissé dans une barbe"
  ],
  [
    "A pair of goggles you keep on your forehead",
    "Une paire de lunettes que vous gardez sur votre front"
  ],
  [
    "Eyes glow faintly in the dark",
    "Les yeux brillent faiblement dans le noir"
  ],
  [
    "ambidextrous",
    "Ambidextre"
  ],
  [
    "Distinctive footwear",
    "Chaussures distinctives"
  ],
  [
    "acid scars (reroll if you have resistance)",
    "Cicatrices d'acide (relancez si vous avez une résistance)"
  ],
  [
    "A bloodstain",
    "Une tache de sang"
  ],
  [
    "Much taller than usual for your race",
    "Beaucoup plus grand que la normale"
  ],
  [
    "You weigh significantly less for your race",
    "Vous pesez beaucoup moins pour votre course"
  ],
  [
    "uneven limbs",
    "Membres inégaux"
  ],
  [
    "A part of your body is covered in tattoos completely",
    "Une partie de votre corps est complètement couverte de tatouages"
  ],
  [
    "Comically large glasses",
    "Grands verres comiques"
  ],
  [
    "A permanent rash",
    "Une éruption cutanée permanente"
  ],
  [
    "A cloak",
    "Un manteau"
  ],
  [
    "A walking stick",
    "Un bâton de marche"
  ],
  [
    "A piece of cloth that goes from your shoulder to your hip of the opposite side of your shoulder",
    "Un morceau de tissu qui va de votre épaule à votre hanche du côté opposé de votre épaule"
  ],
  [
    "A masquerade style mask",
    "Un masque de style mascarade"
  ],
  [
    "Distinct weapons",
    "Armes distinctes"
  ],
  [
    "A chain you keep on you at all times",
    "Une chaîne que vous gardez sur vous à tout moment"
  ]
];
