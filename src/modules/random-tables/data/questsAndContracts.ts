import type { BilingualTuple, LocalizedText } from "../types";

/**
 * Data pools for Quests & Contracts tables (Tables 3, 4, 9).
 */

export const T3_VILLAGE_HOOKS: readonly { title: LocalizedText; body: LocalizedText }[] = [
  {
    "title": {
      "en": "Missing Child",
      "fr": "Enfant disparu"
    },
    "body": {
      "en": "A young single mother was found murdered and dismembered in her home. The mayor suspects that it was the work of dark magic. To make matters worse, her one-year-old child is missing.",
      "fr": "Une jeune mère célibataire a été retrouvée assassinée et démembrée chez elle. Le maire soupçonne que c'était l'œuvre de la magie noire. Pour aggraver les choses, son enfant d'un an a disparu."
    }
  },
  {
    "title": {
      "en": "Local Spirits",
      "fr": "Esprits locaux"
    },
    "body": {
      "en": "There is a forest near the village where no one dares to go after nightfall. Lights are seen floating between the trees, and passersby swear that they can hear someone whispering to them in the dark.",
      "fr": "Il y a une forêt près du village où personne n'ose aller après la tombée de la nuit. On voit des lumières flotter entre les arbres, et les passants jurent qu'ils peuvent entendre quelqu'un leur chuchoter dans le noir."
    }
  },
  {
    "title": {
      "en": "Farmer’s Crops",
      "fr": "Cultures paysannes"
    },
    "body": {
      "en": "The Rutherfords haven’t been able to bring in a decent harvest since last year. Everyone thought that it was because Farmer Rutherford was a drunk, but now other peoples’ crops are starting to wither and die as well.",
      "fr": "Les Rutherford n’ont pas été en mesure de produire une récolte décente depuis l’année dernière. Tout le monde pensait que c'était parce que le fermier Rutherford était ivre, mais maintenant, les récoltes d'autres peuples commencent à se faner et à mourir aussi."
    }
  },
  {
    "title": {
      "en": "Brutes at the Inn",
      "fr": "Brutes à l'auberge"
    },
    "body": {
      "en": "There’s a group of mercenaries that are running a protection racket on the local inn. The innkeeper can’t afford to pay them off any more, but if he misses a payment, they’ll burn his place to the ground.",
      "fr": "Il y a un groupe de mercenaires qui lancent une raquette de protection sur l'auberge locale. L’aubergiste n’a plus les moyens de les rembourser, mais s’il manque un paiement, ils brûleront sa place."
    }
  },
  {
    "title": {
      "en": "The Plague",
      "fr": "La peste"
    },
    "body": {
      "en": "People in the village are falling deathly ill; a handful have already died, and more get sick every day. No one is sure why, but one of the servers at the tavern swears that the water tastes funny.",
      "fr": "Les habitants du village tombent gravement malades; une poignée est déjà décédée et d'autres tombent malades chaque jour. Personne ne sait pourquoi, mais l'un des serveurs de la taverne jure que l'eau a un goût drôle."
    }
  },
  {
    "title": {
      "en": "The Party",
      "fr": "La fête"
    },
    "body": {
      "en": "The local lord is throwing a banquet, and the party has all been invited. Everyone in town is terrified for them. No one who gets invited to the lord’s banquets ever comes back the same; some don’t come back at all.",
      "fr": "Le seigneur local organise un banquet et la fête a toutes été invitées. Tout le monde en ville est terrifié pour eux. Personne qui est invité aux banquets du seigneur ne revient jamais le même; certains ne reviennent pas du tout."
    }
  },
  {
    "title": {
      "en": "The Land Baron",
      "fr": "Le baron de la terre"
    },
    "body": {
      "en": "A wealthy landowner just bought up most of the local farmland and threw out the families that lived there. They’ve brought in a massive crew of laborers to start digging. The townsfolk don’t think he’s mining; they think he’s looking for something.",
      "fr": "Un riche propriétaire foncier vient d'acheter la plupart des terres agricoles locales et a expulsé les familles qui y vivaient. Ils ont amené une équipe massive de travailleurs pour commencer à creuser. Les citadins ne pensent pas qu’il exploite des mines; ils pensent qu’il cherche quelque chose."
    }
  },
  {
    "title": {
      "en": "The Priest",
      "fr": "Le prêtre"
    },
    "body": {
      "en": "The new priest at the local temple is well-liked, but they never seem to be available during the full moon. Last month, a man turned up murdered right after the night of the full moon. The guard captain is convinced that it’s not a coincidence.",
      "fr": "Le nouveau prêtre du temple local est très apprécié, mais il ne semble jamais être disponible pendant la pleine lune. Le mois dernier, un homme s'est retrouvé assassiné juste après la nuit de la pleine lune. Le capitaine de garde est convaincu que ce n’est pas une coïncidence."
    }
  },
  {
    "title": {
      "en": "The Traveling Salesman",
      "fr": "Le vendeur ambulant"
    },
    "body": {
      "en": "A snake-oil peddler named Dr. Fabulam arrived in town yesterday hawking his wares. Old Gerald showed up at the tavern this morning swearing up and down that when he passed by Dr. Fabulum’s wagon last night, he heard children crying. Of course, Old Gerald says a lot of strange things, so no one’s sure what to believe.",
      "fr": "Un colporteur d’huile de serpent du nom de Dr. Fabulam est arrivé hier en ville pour vendre ses marchandises. Le vieux Gerald s'est présenté à la taverne ce matin en jurant que lorsqu'il est passé devant le chariot du Dr Fabulum la nuit dernière, il a entendu des enfants pleurer. Bien sûr, Old Gerald dit beaucoup de choses étranges, donc personne ne sait trop quoi croire."
    }
  },
  {
    "title": {
      "en": "The Pumpkin Patch",
      "fr": "Le champ de citrouilles"
    },
    "body": {
      "en": "Farmer Daggett came into the village tavern yesterday with dry leaves sprouting out of his face. He said that a stranger in robes came across his pumpkin farm waving some strange metal stick the day before and cursed him with a leafy visage. Before he could do anything, the stranger’s companion showed up: a monster with three heads and goat hooves that wrecked his entire farm. Daggett himself was nearly knocked out, but he thought he saw the two of them heading straight into the woods.",
      "fr": "Le fermier Daggett est entré hier dans la taverne du village avec des feuilles sèches qui poussaient sur son visage. Il a dit qu'un étranger en robe est tombé sur sa ferme de citrouilles en agitant un étrange bâton de métal la veille et l'a maudit avec un visage feuillu. Avant qu'il ne puisse faire quoi que ce soit, le compagnon de l'étranger est arrivé: un monstre à trois têtes et des sabots de chèvre qui a détruit toute sa ferme. Daggett lui-même était presque assommé, mais il pensa les voir tous les deux se diriger directement vers les bois."
    }
  },
  {
    "title": {
      "en": "Strange Meats",
      "fr": "Viandes étranges"
    },
    "body": {
      "en": "This village is known as the finest producer of beef and pork in the entire region, and the villagers have made a fortune exporting meat to larger towns and cities. Now that you’re here, you’ve noticed something odd: even though carts are leaving the town laden with salted meats every day, you haven’t seen a single cow or pig since you arrived.",
      "fr": "Ce village est connu comme le meilleur producteur de bœuf et de porc de toute la région, et les villageois ont fait fortune en exportant de la viande vers les grandes villes. Maintenant que vous êtes ici, vous avez remarqué quelque chose de bizarre: même si des charrettes quittent la ville chaque jour chargées de viandes salées, vous n’avez pas vu une seule vache ou un seul cochon depuis votre arrivée."
    }
  },
  {
    "title": {
      "en": "What do You Mean, “Bigger”?",
      "fr": "Que voulez-vous dire par «plus gros»?"
    },
    "body": {
      "en": "Lindy, one of the serving girls at the tavern, won’t stop talking about the rats in the basement. She’s telling everyone that they’re bigger than they used to be. No one paid her much mind, until she went down to the basement one day and never came back up. Even the innkeeper is scared to go down there now.",
      "fr": "Lindy, l’une des serveuses de la taverne, n’arrêtera pas de parler des rats dans le sous-sol. Elle dit à tout le monde qu’ils sont plus gros qu’avant. Personne ne lui a prêté beaucoup d'importance, jusqu'à ce qu'elle descende un jour au sous-sol et ne revienne jamais. Même l'aubergiste a peur d'aller là-bas maintenant."
    }
  },
  {
    "title": {
      "en": "The Creepy Tree",
      "fr": "L'arbre effrayant"
    },
    "body": {
      "en": "The grove at the center of town goes through gardeners at an alarming rate. Every couple of months, another one has a grisly accident, and the mayor has to find a new tender for the plants. The townsfolk think it has something to do with the gnarled old tree at the center of the grove. It never grows leaves, but this year, for the first time that anyone can remember, it bore fruit: a single blood-red apple.",
      "fr": "Le bosquet au centre de la ville passe par les jardiniers à un rythme alarmant. Tous les deux mois, un autre a un sinistre accident et le maire doit trouver un nouvel appel d'offres pour les plantes. Les citadins pensent que cela a quelque chose à voir avec le vieil arbre noueux au centre du bosquet. Il ne pousse jamais de feuilles, mais cette année, pour la première fois dont on se souvienne, il a porté ses fruits: une seule pomme rouge sang."
    }
  },
  {
    "title": {
      "en": "The Other Kingpin",
      "fr": "L'autre pivot"
    },
    "body": {
      "en": "Mr. Sharpe, the owner of the local casino, has been used to being the only source of entertainment in the town. Two weeks ago, however, a rich outsider moved into the abandoned building across the street and opened up another casino. It’s just a handful of card tables in a burnt-out hovel, but for some reason, everyone is flocking to it, and Mr. Sharpe is at his wit’s end.",
      "fr": "M. Sharpe, le propriétaire du casino local, était habitué à être la seule source de divertissement de la ville. Il y a deux semaines, cependant, un riche étranger a emménagé dans le bâtiment abandonné de l'autre côté de la rue et a ouvert un autre casino. C’est juste une poignée de tables à cartes dans une masure brûlée, mais pour une raison quelconque, tout le monde s’y précipite et M. Sharpe est à bout de souffle."
    }
  },
  {
    "title": {
      "en": "Fortune Teller",
      "fr": "Diseuse de bonne aventure"
    },
    "body": {
      "en": "Madame Shadowlight appears at the edge of the parade grounds once a year in her harlequin tent to read the fortunes of all who seek her out. She charges only a copper for her services, and the townsfolk revere her. This year, however, she’s scaring them. Anyone who visits her receives the same grim prediction: impending death. Most terrifying of all: Madame Shadowlight is never wrong.",
      "fr": "Madame Shadowlight apparaît une fois par an au bord du terrain de parade dans sa tente arlequin pour lire la fortune de tous ceux qui la recherchent. Elle ne facture qu'un cuivre pour ses services, et les citadins la vénèrent. Cette année, cependant, elle leur fait peur. Quiconque lui rend visite reçoit la même sombre prédiction: la mort imminente. Le plus terrifiant de tous: Madame Shadowlight n'a jamais tort."
    }
  }
];

export const T4_SIEGE_QUESTS: readonly BilingualTuple[] = [
  [
    "An ancient mausoleum runs under the city's sewers, famously occupied by an ancient lich. It is believed he may have a Sphere of Annihilation that if recovered could turn the battle.",
    "Un ancien mausolée s’étend sous les égouts de la ville, notoirement occupé par une antique liche. On raconte qu’elle détiendrait une Sphère d’Annihilation qui, une fois récupérée, pourrait renverser le cours de la bataille."
  ],
  [
    "The party is to lead a sortie under the cover of night with the intention to destroy or poison the enemy's food stock. Stealth must be utilized lest the camp becomes aware and overwhelm them.",
    "Le groupe doit mener une sortie sous le couvert de la nuit afin de détruire ou d’empoisonner les réserves de vivres ennemies. La discrétion est indispensable pour éviter que le camp ne donne l’alerte et ne les submerge."
  ],
  [
    "The party must investigate acts of sabotage with their own ranks while taking care not to spread paranoia within them.",
    "Le groupe doit enquêter sur des actes de sabotage au sein de ses propres rangs tout en veillant à ne pas semer la paranoïa parmi les défenseurs."
  ],
  [
    "The party must light signal beacons upon the high walls in hope that a relief force will arrive.",
    "Le groupe doit allumer les fanaux d’alarme au sommet des hauts remparts dans l’espoir qu’une armée de secours arrive à temps."
  ],
  [
    "The party is teleported outside of the walls to seek allies among a reclusive elf tribe in the nearby wilderness.",
    "Le groupe est téléporté hors des murs pour aller chercher des alliés auprès d’une tribu elfique recluse dans les étendues sauvages voisines."
  ],
  [
    "The party must confront an enemy mage who directs the armies entirely from the ethereal plane.",
    "Le groupe doit affronter un mage ennemi qui dirige les armées adverses entièrement depuis le plan éthéré."
  ],
  [
    "The party hears a rumor of an upcoming coup attempt and must decide whether to combat it or join the usurpers.",
    "Le groupe entend la rumeur d’une tentative de coup d’État imminente et doit choisir s’il la combat ou s’il se rallie aux usurpateurs."
  ],
  [
    "The party must placate the citizens of the city as they become increasingly riotous due to lack of food.",
    "Le groupe doit apaiser les habitants de la cité, de plus en plus enclins à l’émeute en raison du manque de nourriture."
  ],
  [
    "The party is tasked with defending the city's leaders as they undertake a symbolic gesture important to morale.",
    "Le groupe est chargé de protéger les dirigeants de la cité pendant qu’ils accomplissent un geste symbolique crucial pour le moral des troupes."
  ],
  [
    "The party must find a way to evacuate the city safely during the siege.",
    "Le groupe doit trouver un moyen d’évacuer la ville en toute sécurité durant le siège."
  ],
  [
    "The party must protect a minority/refugees from attack due to heightened tensions between them and the city's denizens.",
    "Le groupe doit protéger une minorité ou des réfugiés contre des attaques alimentées par les tensions grandissantes avec les habitants de la cité."
  ],
  [
    "A friendly alchemist was captured by the enemies, saving him would allow alchemist fire to be rained down to the enemies.",
    "Un alchimiste allié a été capturé par l’ennemi ; le sauver permettrait de faire pleuvoir du feu grégeois sur les assiégeants."
  ],
  [
    "The party is tasked with recruiting an ancient guardian slumbering underneath the city, the only problem is that the guardian only speaks in a tongue none alive know, so the party must communicate through hand signals.",
    "Le groupe est chargé de recruter un ancien gardien endormi sous la ville, le seul problème est que le gardien ne parle que dans une langue qu'aucun vivant ne sait, donc le groupe doit communiquer par des signaux manuels."
  ],
  [
    "A breach in the wall! The party must defend this position in a [5] round gauntlet of foes until the breach is restored.",
    "Une brèche dans le mur! Le groupe doit défendre cette position dans un gant [5] round d'ennemis jusqu'à ce que la brèche soit rétablie."
  ],
  [
    "Respite. The party is enlisted to mediate a parlay between the two opposing rulers.",
    "Répit. Le parti est enrôlé pour arbitrer un pari entre les deux dirigeants opposés."
  ],
  [
    "The princess, a high ranking military officer, has been surrounded following a botched cavalry charge. She and her men have holed up in a ruined old church, and they need rescuing.",
    "La princesse, un officier militaire de haut rang, a été encerclée suite à une charge de cavalerie bâclée. Elle et ses hommes se sont enfermés dans une vieille église en ruine, et ils ont besoin d'être sauvés."
  ],
  [
    "Bandit groups in the area around the siege have flocked to the city for protection from the raiders, but the guards are forbidding their entrance. The party must choose whether it is worth the risk to allow bandits to enter or risk letting them join the enemy.",
    "Des groupes de bandits dans la zone autour du siège ont afflué vers la ville pour se protéger des pillards, mais les gardes leur interdisent l'entrée. Le parti doit décider si cela vaut le risque de permettre aux bandits d'entrer ou de risquer de les laisser rejoindre l'ennemi."
  ],
  [
    "The raiders have grown tired of the siege. By the time the party arrives the raiders are nearly finished in constructing a giant trebuchet. The populace is discouraged by this and plans to surrender. The party may attempt to negotiate the people’s surrender, or instead, attempt to destroy the gigantic siege weapon.",
    "Les pillards sont fatigués du siège. Au moment où le groupe arrive, les pillards ont presque fini de construire un trébuchet géant. La population est découragée par cela et envisage de se rendre. Le parti peut tenter de négocier la reddition du peuple ou, à la place, tenter de détruire la gigantesque arme de siège."
  ],
  [
    "Critical emplaced weapons (catapults, ballista, boiling oil pourers,) have been damaged, or are running out of ammunition. The party needs to repair the weapons, resupply them, or find appropriate replacements to maintain the strength of the front.",
    "Les armes critiques en place (catapultes, balistes, verseurs d'huile bouillante) ont été endommagées ou sont à court de munitions. Le groupe doit réparer les armes, les réapprovisionner ou trouver des remplaçants appropriés pour maintenir la force du front."
  ],
  [
    "Siege weapons (trebuchets, a giant,) are on the approach, trundling toward a vulnerable point in the defences. Dismantle it and escape the resulting skirmish before the weapons reach the wall.",
    "Des armes de siège (trébuchets, un géant,) sont à l'approche, se déplaçant vers un point vulnérable des défenses. Démontez-le et échappez à l'escarmouche qui en résulte avant que les armes n'atteignent le mur."
  ],
  [
    "A complete idiot leaked critical information to the enemy wholly by accident or made a terrible tactical blunder. The resulting chaos has passed with minimal damages, but the party must now calm down the crowds demanding the fool’s head.",
    "Un idiot complet a divulgué des informations critiques à l'ennemi par accident ou a commis une terrible erreur tactique. Le chaos qui en a résulté est passé avec des dégâts minimes, mais le groupe doit maintenant calmer les foules exigeant la tête du fou./u/viceVersailes"
  ],
  [
    "A wizard capable of repairing the defences or providing a similarly critical resource (food, water, equipment,) has been noticed and is being targeted by the enemy forces while on the job. Protect them while they work.",
    "Un sorcier capable de réparer les défenses ou de fournir une ressource tout aussi critique (nourriture, eau, équipement) a été remarqué et est pris pour cible par les forces ennemies pendant son travail. Protégez-les pendant qu'ils travaillent."
  ],
  [
    "Disease is being spread by giant rats in the sewers. Clearing the sewers reveals a magical device and the truth: this is a magical disease and the cure can only be found by tracking the rats to their source. Party members or vital NPCs may have gotten infected. Requiring them to find the cure before the symptoms become too severe.",
    "La maladie est propagée par des rats géants dans les égouts. Le nettoyage des égouts révèle un appareil magique et la vérité: il s'agit d'une maladie magique et le remède ne peut être trouvé qu'en suivant les rats jusqu'à leur source. Les membres du groupe ou les PNJ vitaux peuvent avoir été infectés. Les obliger à trouver le remède avant que les symptômes ne deviennent trop sévères."
  ],
  [
    "Arrows made from the feathers of a [magical creature] are needed to give the edge to the besieged. Sneak out of the fortress. Get the feathers. Return.",
    "Des flèches fabriquées à partir des plumes d'une [créature magique] sont nécessaires pour donner l'avantage aux assiégés. Faufilez-vous hors de la forteresse. Obtenez les plumes. Revenir."
  ],
  [
    "As the siege has dragged on, the enemy has continued to have more fresh troops show up. However, the generals and politicians in power haven't a clue where they are coming from. They task the party with a scouting mission to discover where they are getting these fresh troops from.",
    "Au fur et à mesure que le siège se prolongeait, l'ennemi a continué à voir apparaître de nouvelles troupes. Cependant, les généraux et les politiciens au pouvoir n'ont aucune idée d'où ils viennent. Ils confient à l'équipe une mission de reconnaissance pour découvrir d'où ils tirent ces troupes fraîches."
  ],
  [
    "The city plans on surrendering, but crucial information must be delivered to the King/Leader which can turn the tide.",
    "La ville envisage de se rendre, mais des informations cruciales doivent être fournies au roi / chef qui peut inverser la tendance."
  ],
  [
    "The Captain of the Guard needs you to persuade his old Sword Master to come back to service who left because of some argument 15 years ago. The Sword Master does this under the condition that the Thieves Guild be convinced to help as well. The Thieves Guild will only agree if a particular someone is released from prison as they claim his innocence and it was some petty minor noble who stole the [object]. The ruler will only trust the guild and release the prisoner if some evidence is found. The [object] is found in the minor noble's home. There are several jewels pried out of it. The remaining jewel gives off a weak magic hum.The minor noble confesses to the crime and admits to having pried the jewels out one by one and selling them to help maintain his lifestyle. The players persuade him to give up the list of buyers. Upon retrieving the jewels and returning them to the heir apparent. Who could never be sworn in due to the theft of this [object]. The [object] reassembles itself and attunes itself with the heir. Armor forms on the heir with the family crest glowing. The damage sustained to the walls is mended. All people working to protect the fortification have some buff while the heir uses the object. The prisoner is freed, guild joins, swordmaster returns and the Captain apologizes for the cause of the argument.",
    "Le capitaine de la garde a besoin de vous pour persuader son ancien maître des épées de revenir au service, parti à cause d'une dispute il y a 15 ans. Le maître de l'épée le fait à la condition que la guilde des voleurs soit également convaincue d'aider. La Guilde des voleurs ne sera d'accord que si une personne en particulier est libérée de prison car elle prétend son innocence et c'est un petit noble mineur qui a volé [l'objet]. Le dirigeant ne fera confiance à la guilde et ne relâchera le prisonnier que si des preuves sont trouvées. [L'objet] se trouve dans la maison du noble mineur. Il y a plusieurs bijoux qui en sont tirés. Le bijou restant dégage un faible bourdonnement magique. Le noble mineur avoue le crime et admet avoir enlevé les bijoux un par un et les avoir vendus pour aider à maintenir son style de vie. Les joueurs le persuadent de renoncer à la liste des acheteurs. Après avoir récupéré les bijoux et les rendre à l'héritier présumé. Qui n'a jamais pu être assermenté en raison du vol de cet [objet]. [L'objet] se rassemble et s'accorde avec l'héritier. L'armure se forme sur l'héritier avec l'écusson familial brillant. Les dommages subis aux murs sont réparés. Toutes les personnes qui travaillent à la protection de la fortification ont du buff pendant que l'héritier utilise l'objet. Le prisonnier est libéré, la guilde se joint, le maître de l'épée revient et le capitaine s'excuse pour la cause de la dispute."
  ],
  [
    "Chaos has been sown among the leadership, making them accuse each other of various misdeeds. Unravel the mess to reunite the town's leadership (everything becomes more efficient, small gain to all resources/defences).",
    "Le chaos a été semé parmi les dirigeants, les faisant s'accuser mutuellement de divers méfaits. Démêlez le désordre pour réunir les dirigeants de la ville (tout devient plus efficace, petit gain pour toutes les ressources / défenses)."
  ],
  [
    "A local lord has barricaded himself in with mountains of food and guards aplenty. Get creative and find a way to \"redistribute\" his wealth without him realising the town leadership is funding the effort. He knows the adventuring party's appearance and names.",
    "Un seigneur local s'est barricadé avec des montagnes de nourriture et de nombreux gardes. Faites preuve de créativité et trouvez un moyen de «redistribuer» sa richesse sans qu'il se rende compte que la direction de la ville finance l'effort. Il connaît l'apparence et les noms des aventuriers."
  ],
  [
    "An ambitious wizard wants to summon a demon to help defend the town. Help him gather materials.",
    "Un sorcier ambitieux veut invoquer un démon pour aider à défendre la ville. Aidez-le à rassembler des matériaux."
  ],
  [
    "An over-ambitious, unwise wizard has set loose a demon in town instead of controlling it for the town's good. Hunt the demon.",
    "Un sorcier trop ambitieux et imprudent a libéré un démon en ville au lieu de le contrôler pour le bien de la ville. Chassez le démon."
  ],
  [
    "Citizens in baker street report all having the same dream each night of an elven enchantress. Spend the night in an empty house on baker street to see the dream. The dream leads to the ancient elven portal going to the jungle thousands of miles away. Allies and supplies can be gathered but at great risk and much time.",
    "Les citoyens de Baker Street rapportent tous avoir le même rêve chaque nuit d'une enchanteresse elfique. Passez la nuit dans une maison vide sur Baker Street pour voir le rêve. Le rêve mène à l'ancien portail elfique qui mène à la jungle à des milliers de kilomètres. Les alliés et les approvisionnements peuvent être rassemblés, mais avec de grands risques et beaucoup de temps."
  ],
  [
    "Battle past hostile underwater creatures while walking the sea/river bed to reach a cove where supplies have been delivered by friendly smugglers. Water breathing spells are supplied.",
    "Combattez des créatures sous-marines hostiles tout en marchant sur le lit de la mer / de la rivière pour atteindre une crique où les fournitures ont été livrées par des passeurs amicaux. Des sorts de respiration d'eau sont fournis."
  ],
  [
    "More chickens are required to provide eggs and meat for the populace. A local druid can help quicken their life cycle but must be found and convinced to help. Blackmail info is provided by city leadership, but the players are given an optional side quest to help the druid instead.",
    "Il faut davantage de poulets pour fournir des œufs et de la viande à la population. Un druide local peut aider à accélérer leur cycle de vie, mais doit être trouvé et convaincu de l'aider. Les informations sur le chantage sont fournies par les dirigeants de la ville, mais les joueurs reçoivent une quête secondaire facultative pour aider le druide à la place."
  ],
  [
    "A murderer is loose amongst the defenders and guards don't care or have time. It is up to the players to apprehend the culprit.",
    "Un meurtrier est lâche parmi les défenseurs et les gardes s'en moquent ou n'ont pas le temps. Il appartient aux joueurs d'appréhender le coupable."
  ],
  [
    "Gangs have hoarded food and demand exhorbinant money for it from the poor. The players must resolve this quickly as the situation becomes increasingly tense.",
    "Les gangs ont amassé de la nourriture et en demandent aux pauvres une somme exorbitante. Les joueurs doivent résoudre cela rapidement car la situation devient de plus en plus tendue."
  ],
  [
    "A witch was burned just before the siege and her curse lingers. Fight spirits while protecting a cleric cleansing the site of her death.",
    "Une sorcière a été brûlée juste avant le siège et sa malédiction persiste. Combattez les esprits tout en protégeant un clerc qui nettoie le site de sa mort."
  ],
  [
    "A religious figure from the enemy camp has begun convincing the a significant minority of the cities poor to swap sides. The party must move quickly to remedy the situation before moral falters.",
    "Une personnalité religieuse du camp ennemi a commencé à convaincre une minorité importante de villes pauvres d'échanger leur camp. Le parti doit agir rapidement pour remédier à la situation avant que le moral ne faiblisse."
  ],
  [
    "Swarms of rats have devoured the store of food the poor were provided, and then died of starvation mysteriously fast. The party must investigate why and find some more food for the poor. A pontential reason: the enemy has hired the Pied Piper.",
    "Des essaims de rats ont dévoré la réserve de nourriture qui était fournie aux pauvres, puis sont morts de faim mystérieusement rapidement. Le parti doit rechercher pourquoi et trouver davantage de nourriture pour les pauvres. Une raison pontentielle: l'ennemi a engagé le joueur de flûte."
  ],
  [
    "The enemy has too many troops, and we're running out of things to throw at them while they climb. Get lowered over the wall and protect workers while they gather weapons and armour from the dead and material to throw from the base of the wall.",
    "L'ennemi a trop de troupes, et nous manquons de choses à leur lancer pendant qu'ils grimpent. Descendez au-dessus du mur et protégez les ouvriers pendant qu'ils rassemblent des armes et des armures des morts et du matériel à jeter de la base du mur."
  ],
  [
    "The raiders are nearly breaking through the walls. One of the king/lords advisors gives the group a secret mission to collect and stack all the explosives near the (soon to be) breached wall so that when the raiders breakthrough, they will suffer great losses in an explosion. The catch: the explosives will almost definitely destroy the holy temple that is near the wall.",
    "Les pillards sont presque en train de percer les murs. L'un des conseillers du roi / seigneurs confie au groupe une mission secrète pour collecter et empiler tous les explosifs près du mur (qui sera bientôt) percé afin que lorsque les raiders perceront, ils subiront de grandes pertes lors d'une explosion. Le hic: les explosifs détruiront presque définitivement le temple sacré qui se trouve près du mur."
  ],
  [
    "The party must kill and recover a leviathan that is being used to blockade the ports. This act will open the ports and provide food for the kingdom.",
    "Le parti doit tuer et récupérer un léviathan qui est utilisé pour bloquer les ports. Cet acte ouvrira les ports et fournira de la nourriture au royaume."
  ],
  [
    "The kingdom's wizards need spell components so they can unleash more lightning bolts and fireballs. These objects are normally cheap, but in the siege, they have become scarce. The party is tasked with procuring them.",
    "Les sorciers du royaume ont besoin de composants de sorts pour pouvoir déclencher plus d'éclairs et de boules de feu. Ces objets sont normalement bon marché, mais pendant le siège, ils sont devenus rares. Le parti est chargé de les acheter."
  ],
  [
    "The characters are told they must manufacture an accident that will reduce the population of peasants in the city walls. The only path to victory is to reduce the number of hungry mouths to feed.",
    "On dit aux personnages qu'ils doivent fabriquer un accident qui réduira la population de paysans dans les murs de la ville. La seule voie vers la victoire est de réduire le nombre de bouches affamées à nourrir."
  ],
  [
    "The characters must secure the Kingdom's water source by wiping out the monstrous residents of a nearby cave and sealing the entrance with magic.",
    "Les personnages doivent sécuriser la source d'eau du Royaume en anéantissant les résidents monstrueux d'une grotte voisine et en scellant l'entrée avec de la magie."
  ],
  [
    "The characters must bring an offering to an Earth elemental to enlist its aide.",
    "Les personnages doivent apporter une offrande à un élémentaire de la Terre pour enrôler son aide."
  ],
  [
    "The characters must retrieve a rare ingredient or magical item to remove the poison from the city's water source.",
    "Les personnages doivent récupérer un ingrédient rare ou un objet magique pour éliminer le poison de la source d'eau de la ville."
  ],
  [
    "A spy has infiltrated one of the major organizations overseeing the defence. The players must locate and apprehend them quickly.",
    "Un espion s'est infiltré dans l'une des principales organisations chargées de la défense. Les joueurs doivent les localiser et les appréhender rapidement."
  ],
  [
    "A fresh band of mercenaries is being bought by the enemy, the seller must be warned and possibly persuaded to refuse to sell to the enemy.",
    "Une nouvelle bande de mercenaires est achetée par l'ennemi, le vendeur doit être averti et peut-être persuadé de refuser de vendre à l'ennemi."
  ],
  [
    "Besides the bad circumstances the leader of the besieged town remains uncanny calm and certain of victory. The heroes find clues by accident that he has some ritual planned that may win him the siege but at the cost of many townfolks' lives. They have to decide to help him with the ritual (and maybe find a way to decrease the costs), talk him out of it, or help the enemies to prevent the massacre.",
    "Outre les mauvaises circonstances, le chef de la ville assiégée reste étrangement calme et certain de la victoire. Les héros trouvent par accident des indices selon lesquels il a prévu un rituel qui pourrait lui gagner le siège mais au prix de la vie de nombreux citadins. Ils doivent décider de l'aider avec le rituel (et peut-être trouver un moyen de réduire les coûts), le dissuader ou aider les ennemis à empêcher le massacre."
  ],
  [
    "The sounds of war have awoken something old and sinister in the nearby woods and only the heroes know of it. they need to unite the enemies at all costs to prevent an even grimmer fate.",
    "Les sons de la guerre ont réveillé quelque chose de vieux et de sinistre dans les bois voisins et seuls les héros le savent. ils doivent à tout prix unir les ennemis pour éviter un sort encore plus sombre."
  ],
  [
    "The foes are predominant and heartless. It is for sure, that they won't spare any soul if they break through the town walls. To the heroes' surprise, their cruel leader is an old and kind friend of them, that they have not seen for a long time. A reliable source of information tells them, that their friend acted strangely since he met a new consultant/found this strange artifact. Maybe it is time for some undercover mission in the enemy's camp?",
    "Les ennemis sont prédominants et sans cœur. Il est certain qu'ils n'épargneront aucune âme s'ils franchissent les murs de la ville. À la surprise des héros, leur chef cruel est un vieil et gentil ami d'eux, qu'ils n'ont pas vu depuis longtemps. Une source d'informations fiable leur dit que leur ami a agi étrangement depuis qu'il a rencontré un nouveau consultant / trouvé cet étrange artefact. Il est peut-être temps pour une mission d'infiltration dans le camp de l'ennemi?"
  ],
  [
    "The party must lead a counter mining operation. Enemy sappers seek to plant explosives beneath the defensive walls, which must be intercepted and demolished. Traps, narrow passages, and ambushes abound.",
    "Le parti doit mener une opération de contre-minage. Les sapeurs ennemis cherchent à planter des explosifs sous les murs défensifs, qui doivent être interceptés et démolis. Les pièges, les passages étroits et les embuscades abondent."
  ],
  [
    "The party must smuggle a powerful arcane explosive into the siege’s base of operations, get out, and detonate it without being caught, bringing disorganization to the siege and giving the city the upper hand.",
    "Le groupe doit introduire en contrebande un puissant explosif arcanique dans la base d’opérations du siège, sortir et le faire exploser sans se faire prendre, ce qui désorganise le siège et donne le dessus à la ville."
  ],
  [
    "The enemies have discovered a secret tunnel system underneath the walls, leading a small force through the narrow tunnels to attack from behind. The party must defeat these enemies and close the tunnels before more come through.",
    "Les ennemis ont découvert un système de tunnel secret sous les murs, menant une petite force à travers les tunnels étroits pour attaquer par derrière. Le groupe doit vaincre ces ennemis et fermer les tunnels avant que d'autres ne passent."
  ],
  [
    "A fire has broken out in a market area and the party must assist the population in putting it out before it spreads.",
    "Un incendie s'est déclaré dans une zone de marché et le parti doit aider la population à l'éteindre avant qu'il ne se propage."
  ],
  [
    "A trap will be set for the invading army, sectioning off part of the wall to let them through to kill boxes, the party must help execute this plan.",
    "Un piège sera tendu à l'armée d'invasion, sectionnant une partie du mur pour les laisser passer pour tuer des boîtes, le groupe doit aider à exécuter ce plan."
  ],
  [
    "Supplies are running low! The party must sneak out to either send for a relief from a neighbouring kingdom or scavenge the enemy backlines for supplies such as food or ammunition.",
    "Les fournitures s'épuisent! Le groupe doit se faufiler pour envoyer des secours depuis un royaume voisin ou récupérer les lignes de fond ennemies pour des fournitures telles que de la nourriture ou des munitions."
  ],
  [
    "The enemies have discovered the appropriate teleportation circle to the palace and the party must destroy it before too many troops teleport in. Luckily the mages can only teleport X amount at a time but they must act quickly or the stronghold will be taken.",
    "Les ennemis ont découvert le cercle de téléportation approprié vers le palais et le groupe doit le détruire avant que trop de troupes ne se téléportent. Heureusement, les mages ne peuvent téléporter que X à la fois, mais ils doivent agir rapidement ou la forteresse sera prise."
  ],
  [
    "The walls have been breached in multiple places and the defending army must retreat further into the city and establish a second line of defence. The party must either help do this or delay the incoming army for long enough for this to be done.",
    "Les murs ont été percés à plusieurs endroits et l'armée en défense doit se replier plus loin dans la ville et établir une deuxième ligne de défense. Le parti doit soit aider à le faire, soit retarder l'arrivée de l'armée assez longtemps pour que cela se fasse."
  ],
  [
    "A guard/soldier helping to defend the siege asks for help. Some of his men were trapped in the barracks when a projectile caved the roof in.",
    "Un garde / soldat aidant à défendre le siège demande de l'aide. Certains de ses hommes ont été piégés dans la caserne lorsqu'un projectile a cédé le toit."
  ],
  [
    "Winged beasts can be seen approaching from enemy ranks and they are advancing fast towards the city. The party is responsible for intercepting and preventing them from doing catastrophic damage.",
    "Des bêtes ailées peuvent être vues s'approcher des rangs ennemis et elles avancent rapidement vers la ville. La partie est responsable de les intercepter et de les empêcher de causer des dommages catastrophiques."
  ],
  [
    "The party is tasked to protect a convoy of women and children to an escape route behind enemy lines.",
    "Le parti est chargé de protéger un convoi de femmes et d'enfants vers une voie d'évacuation derrière les lignes ennemies."
  ],
  [
    "The enemy launched floating balloons with diseased rats. Party must capture, isolate, and burn incoming vectors to avoid debilitating the reserves.",
    "L'ennemi a lancé des ballons flottants avec des rats malades. Le parti doit capturer, isoler et brûler les vecteurs entrants pour éviter d'affaiblir les réserves."
  ],
  [
    "The party must defend an incoming infiltration through the servant's quarters. Turncoats and defectors make it hard to distinguish between friend and foe.",
    "Le groupe doit défendre une infiltration entrante dans les quartiers du serviteur. Les retourneurs et les déserteurs rendent difficile la distinction entre ami et ennemi."
  ],
  [
    "The enemy has poisoned the town's water supply and the local medicine man is nowhere to be seen.",
    "L'ennemi a empoisonné l'approvisionnement en eau de la ville et le guérisseur local est introuvable."
  ],
  [
    "A fire breaks out in the armory, destroying 60% of the ballistic supplies. Now the heroes must sacrifice a wing of town to lay an ambush on invading parties.",
    "Un incendie se déclare dans l'arsenal, détruisant 60% des approvisionnements balistiques. Les héros doivent maintenant sacrifier une aile de la ville pour tendre une embuscade aux envahisseurs."
  ],
  [
    "FIRE! A fire has been started in the warehouse district and the city guard can't be pulled from the walls to help put it out. Once the fire is out what caused the fire? Sabotage? A Cult trying to use the lack of guards to enact their nefarious goals? Was it merely an unfortunate accident?",
    "FEU! Un incendie a été allumé dans le quartier des entrepôts et le garde de la ville ne peut pas être retiré des murs pour aider à l'éteindre. Une fois le feu éteint, qu'est-ce qui a causé l'incendie? Sabotage? Une secte essayant d'utiliser le manque de gardes pour réaliser ses objectifs infâmes? Était-ce simplement un accident malheureux?"
  ],
  [
    "The party needs to coat the gate with magic paint, both inside and outside.",
    "Le parti doit enduire la porte de peinture magique, à la fois à l'intérieur et à l'extérieur."
  ],
  [
    "A plague is sweeping through the city, and your party needs to find a way to cure or contain it, without contracting it themselves.",
    "Un fléau envahit la ville et votre groupe doit trouver un moyen de le guérir ou de le contenir, sans le contracter lui-même."
  ],
  [
    "The party is accused of being infiltrators for the opposing force. The party now must either comply and defend themselves by trial or attempt to escape the city as wanted criminals.",
    "Le parti est accusé d'être des infiltrés de la force adverse. Le parti doit maintenant se conformer et se défendre par un procès ou tenter de s'échapper de la ville en tant que criminels recherchés."
  ],
  [
    "The party must escort a caravan of supplies: the siege had gone on for a long time and food is running low. The city has obtained supplies but needs help getting in the walls with being destroyed by the enemy.",
    "Le groupe doit escorter une caravane de ravitaillement: le siège dure depuis longtemps et la nourriture s'épuise. La ville s'est ravitaillée mais a besoin d'aide pour entrer dans les murs pour être détruite par l'ennemi."
  ],
  [
    "During the quiet nights, soft banging and scraping noises can be heard under the city. The party must find and collapse enemy tunnels being dug under the city.",
    "Pendant les nuits calmes, de doux bruits de claquement et de grattage peuvent être entendus sous la ville. Le groupe doit trouver et effondrer les tunnels ennemis creusés sous la ville."
  ],
  [
    "The sky above turns a hostile grey, and clouds begin to swirl overhead. The party must and interrupt an enemy wizard from turning the very air against them and tearing the city asunder.",
    "Le ciel au-dessus devient gris hostile et les nuages ​​commencent à tourbillonner au-dessus. Le groupe doit et empêcher un sorcier ennemi de retourner l'air contre eux et de déchirer la ville."
  ],
  [
    "A neighboring city is sending troops to help break the siege, but the attackers have begun building their own wall around the city to prevent interruption. The party must disrupt the building process or help the reinforcements from the inside.",
    "Une ville voisine envoie des troupes pour aider à briser le siège, mais les assaillants ont commencé à construire leur propre mur autour de la ville pour éviter toute interruption. Le parti doit perturber le processus de construction ou aider les renforts de l'intérieur."
  ],
  [
    "The enemy seems to have let a caravan of food slip through their perimeter. The population rejoices until they realize that the enemy actually tainted it with negative energies. Anyone who consumes the food must make a DC 14 Fortitude/Constitution save or be turned into a ghoul in 1d4 days and attack any nearby living creature. The party must track the distribution.",
    "L'ennemi semble avoir laissé passer une caravane de nourriture à travers leur périmètre. La population se réjouit jusqu'à ce qu'elle réalise que l'ennemi l'a en fait entachée d'énergies négatives. Quiconque consomme la nourriture doit effectuer un jet de sauvegarde de Vigueur / Constitution DD 14 ou être transformé en goule en 1d4 jours et attaquer toute créature vivante à proximité. Le parti doit suivre la distribution."
  ],
  [
    "A nearby dragon might be willing to attack the enemy siege camp. Your party must bring it an offering that will convince it to do so.",
    "Un dragon à proximité pourrait être prêt à attaquer le camp de siège ennemi. Votre parti doit lui apporter une offre qui le convaincra de le faire."
  ],
  [
    "A team of wizards must spread out on the walls to cast a protective ritual. The party must defend them or else the enemy will kill them before the ritual can be completed.",
    "Une équipe de sorciers doit s'étaler sur les murs pour lancer un rituel protecteur. Le groupe doit les défendre, sinon l'ennemi les tuera avant que le rituel ne puisse être terminé."
  ],
  [
    "The party must stop a spy from recovering intel that was stolen from the enemy, but the catch is that the spy could be anyone.",
    "Le groupe doit empêcher un espion de récupérer des informations volées à l'ennemi, mais le hic, c'est que l'espion peut être n'importe qui."
  ],
  [
    "The party must find and destroy magical sensors to prevent the enemy from scrying.",
    "Le groupe doit trouver et détruire des capteurs magiques pour empêcher l'ennemi de scruter."
  ],
  [
    "Reinforcements are ready, but the teleportation circle must be retaken from the enemy forces first.",
    "Les renforts sont prêts, mais le cercle de téléportation doit d'abord être repris aux forces ennemies."
  ],
  [
    "The party must work together with the main city's engineer(s)/crafters/architects to craft new defenses. If able to make clockwork defenders, then there's a chance of the creations going haywire and attacking the party.",
    "Le groupe doit travailler avec le ou les ingénieurs / artisans / architectes de la ville principale pour élaborer de nouvelles défenses. Si vous êtes capable de faire des défenseurs mécaniques, alors il y a une chance que les créations se détraquent et attaquent le parti."
  ],
  [
    "A negotiating group from the siegers has been allowed entry to begin the peace talks. However, while they try to fight for peace, mysterious crimes start increasing, and supplies are suddenly worse. Are the diplomats lying about their intentions, or is there a mysterious 3rd group at work?",
    "Un groupe de négociation des sièges a été autorisé à entrer pour commencer les pourparlers de paix. Cependant, alors qu'ils tentent de lutter pour la paix, les crimes mystérieux commencent à augmenter et les approvisionnements sont soudainement pires. Les diplomates mentent-ils sur leurs intentions, ou y a-t-il un mystérieux 3e groupe au travail?"
  ],
  [
    "With the help of the town's mage, a portion of the siege is temporarily frozen for some amount of time, as long as the mage does not come under attack. The party has to either 1: protect the mage in time for them to expand the effects wider, and/or 2: find allies to help just in time.",
    "Avec l'aide du mage de la ville, une partie du siège est temporairement gelée pendant un certain temps, tant que le mage n'est pas attaqué. Le groupe doit soit 1: protéger le mage à temps pour qu'il élargisse les effets, et / ou 2: trouver des alliés pour l'aider juste à temps."
  ],
  [
    "A traveling mercenary band has happened to show up outside the sieged town, and now both sides are trying to get their forces to help. The party is sent as the diplomats for their side.",
    "Une bande de mercenaires itinérants est arrivée à l'extérieur de la ville assiégée, et maintenant les deux parties essaient d'obtenir leur aide. Le parti est envoyé comme diplomates de son côté."
  ],
  [
    "The thieves guild has been making a handsome profit on black market foodstuffs, someone has cut into their bottom line recently by selling cheap meat, while the guard has received numerous reports of missing individuals that they can't spare the manpower to look for. Find out if these events are connected.",
    "La guilde des voleurs a réalisé de beaux bénéfices sur les produits alimentaires du marché noir, quelqu'un a récemment réduit ses résultats en vendant de la viande bon marché, tandis que le garde a reçu de nombreux rapports d'individus disparus qu'ils ne peuvent pas épargner de main-d'œuvre pour rechercher. Découvrez si ces événements sont liés."
  ],
  [
    "Act as double agents, find out what the enemy plans to do next and find a way to sabotage them without blowing your cover.",
    "Agissez en tant qu'agents doubles, découvrez ce que l'ennemi envisage de faire ensuite et trouvez un moyen de les saboter sans faire sauter votre couverture."
  ],
  [
    "A vampire has been taking advantage of the chaos to prey on the city. Hunt it down.",
    "Un vampire a profité du chaos pour s'attaquer à la ville. Traquez-le."
  ],
  [
    "Damage from a siege weapon reveals a previously unknown passageway running under the central keep. The party is tasked with exploring it and determining whether or not it is a potential escape route or a liability.",
    "Les dommages causés par une arme de siège révèlent un passage auparavant inconnu sous le donjon central. La partie est chargée de l'explorer et de déterminer s'il s'agit ou non d'une voie d'évacuation potentielle ou d'un passif."
  ],
  [
    "The party is forced to seek out reclusive nature spirits from a nearby forest. This may either be for safe passage of an allied force or a direct appeal for military aid.",
    "Le groupe est obligé de rechercher des esprits de la nature reclus dans une forêt voisine. Cela peut être soit pour le passage en toute sécurité d'une force alliée, soit pour un appel direct à l'aide militaire."
  ],
  [
    "The party slowly uncovers evidence that a dangerous lycanthrope and a greatly respected member of the community are one and the same. The party must struggle with the knowledge that revealing this now would certainly be disastrous for morale.",
    "Le parti découvre lentement des preuves qu'un lycanthrope dangereux et un membre très respecté de la communauté sont une seule et même personne. Le parti doit lutter en sachant que révéler cela maintenant serait certainement désastreux pour le moral."
  ],
  [
    "An infiltrator has snuck a powerful object into the city, they must find the object and stop doing any damage to the siege effort.",
    "Un infiltré a introduit un objet puissant dans la ville, il doit trouver l'objet et cesser de causer des dommages à l'effort de siège."
  ],
  [
    "The party has to assassinate an enemy spell caster /commander, but to do so they must find a way out of the city.",
    "Le groupe doit assassiner un lanceur de sorts / commandant ennemi, mais pour ce faire, il doit trouver un moyen de sortir de la ville."
  ],
  [
    "The attackers have employed a siege monster to attack the gates, forcing the party to try and keep it occupied while the forces of the castle move weapons in a position to kill said siege monster.",
    "Les attaquants ont utilisé un monstre de siège pour attaquer les portes, forçant le groupe à essayer de le garder occupé pendant que les forces du château déplacent des armes en mesure de tuer ledit monstre de siège."
  ]
];

export const T9_MONSTERS: readonly BilingualTuple[] = [
  [
    "Specter",
    "Spectre"
  ],
  [
    "Cursed One",
    "Créature maudite"
  ],
  [
    "Hybrid",
    "Hybride"
  ],
  [
    "Insectoid",
    "Insectoïde"
  ],
  [
    "Elementa",
    "Élémentaire"
  ],
  [
    "Relict",
    "Vestige"
  ],
  [
    "Ogroid",
    "Ogroïde"
  ],
  [
    "Draconid",
    "Draconide"
  ],
  [
    "Necrophage",
    "Nécrophage"
  ],
  [
    "Vampire",
    "Vampire"
  ]
];
export const T9_DIFFICULTIES: readonly BilingualTuple[] = [
  [
    "Easy",
    "Faible"
  ],
  [
    "Medium",
    "Moyen"
  ],
  [
    "Hard",
    "Fort"
  ]
];
export const T9_COMPLEXITIES: readonly BilingualTuple[] = [
  [
    "Simple",
    "Simple"
  ],
  [
    "Difficult",
    "Difficile"
  ],
  [
    "Complex",
    "Complexe"
  ]
];
export const T9_LOCATIONS: readonly BilingualTuple[] = [
  [
    "A Forest",
    "une forêt"
  ],
  [
    "A building",
    "un batiment"
  ],
  [
    "An Abandoned Building",
    "un batiment abandonné"
  ],
  [
    "A Coast",
    "la côte"
  ],
  [
    "The Mountains",
    "les montagnes"
  ],
  [
    "The City",
    "en ville"
  ],
  [
    "A Graveyard",
    "un cimetierre"
  ],
  [
    "A Hamlet",
    "un hameau"
  ],
  [
    "Along the River",
    "le long de la rivière"
  ],
  [
    "A Cave",
    "une grotte"
  ]
];
export const T9_TWISTS: readonly BilingualTuple[] = [
  [
    "The Monster Is Fake",
    "Le monstre est faux"
  ],
  [
    "It Is All A Curse",
    "C'est une malédiction"
  ],
  [
    "The Monster Is Already Dead",
    "Le monstre est déjà mort"
  ],
  [
    "It Isn’t What You Think",
    "Ce n'est pas ce que vous pensez"
  ],
  [
    "Employer Wants It Caught",
    "L'employeur veut qu'il soit attrapé"
  ],
  [
    "The Employer Is To Blame For It All",
    "L'employeur est à blâmer pour tout cela"
  ],
  [
    "The Monster Is Harmless",
    "Le monstre est inoffensif"
  ],
  [
    "It Is A Trap For You",
    "C'est un piège"
  ],
  [
    "It Was More Than You Were Told",
    "C'était plus que ce qu'on vous aviez dit"
  ],
  [
    "A Mage Is Behind It All",
    "Un mage est derrière tout cela"
  ]
];
export const T9_TWIST_STATUS: { hasTwist: LocalizedText; noTwist: LocalizedText } = {
  hasTwist: { en: "Twist", fr: "Retournement" },
  noTwist: { en: "No twist", fr: "Aucun retournement" },
};
export const T9_EMPLOYERS: readonly BilingualTuple[] = [
  [
    "A Peasant or Ealdorman",
    "Un paysan ou un Ealdorman"
  ],
  [
    "A Guard or Witch Hunter",
    "Un garde ou un chasseur de sorcières"
  ],
  [
    "A Merchant",
    "Un marchand"
  ],
  [
    "A Scholar or Noble",
    "Un érudit ou un noble"
  ],
  [
    "A Mage",
    "Un mage"
  ],
  [
    "A King, Queen, Duke or Duchess",
    "Un roi, une reine, un duc ou une duchesse"
  ]
];
export const T9_PAY_OUTCOMES: readonly BilingualTuple[] = [
  [
    "The Employer is unable to, or tries not to Pay",
    "L'Employeur ne peut pas ou essaie de ne pas payer"
  ],
  [
    "The Employer Offers a Trade",
    "L'Employeur propose un échange"
  ],
  [
    "The Employer Pays less than Agreed",
    "L'Employeur paie moins que convenu"
  ],
  [
    "The Employer pays Exactly as Agreed",
    "L'Employeur paie exactement comme convenu"
  ],
  [
    "The Employer Pays More than Agreed",
    "L'Employeur paie plus que convenu"
  ],
  [
    "The Employer tries to have you killed",
    "L'Employeur essaie de vous faire tuer"
  ],
  [
    "The Employer is nowhere to be found",
    "L'Employeur est introuvable"
  ]
];
export const T9_COMPLICATIONS: readonly BilingualTuple[] = [
  [
    "Bandits are hunting the monster",
    "Des bandits chassent le monstre"
  ],
  [
    "A Witcher is already hunting it",
    "Un sorceleur le chasse déjà"
  ],
  [
    "It can't be killed normally",
    "Il ne peut pas être tué normalement"
  ],
  [
    "The Employer has died",
    "L'Employeur est mort"
  ],
  [
    "Monster has trapped hostages",
    "Le monstre a piégé des otages"
  ],
  [
    "Extra Twist",
    "Retournement supplémentaire"
  ]
];
