import type { TalentEntry } from './types';

/**
 * Skill-tree talents for the 9 core Witcher TRPG professions (81 entries).
 */
export const CORE_PROFESSIONS_TALENTS: readonly TalentEntry[] = [
  {
    "id": "tl-craftsman-catalogue-etendu",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Maître artisan",
    "name": "Catalogue étendu (INT)",
    "attribute": "INT",
    "description": "Un Artisan expérimenté garde en mémoire tout un catalogue de schémas. Lorsqu’un Artisan a fini de mémoriser le plus de diagrammes possible, il peut réaliser un jet de Catalogue étendu SD 15 pour en retenir un de plus. Il n’existe pas de limite au nombre de schémas qu’il peut mémoriser, mais tous les 10 schémas, le SD augmente de +1.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-compagnon",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Maître artisan",
    "name": "Compagnon (TECH)",
    "attribute": "TECH",
    "description": "Quand il commence à fabriquer un objet, l’Artisan peut effectuer un jet de Compagnon dont le SD est égal au SD de fabrication de l’objet. En cas de réussite, l’objet gagne +1 DÉG (pour les armes) ou +1 PA (pour les armures) par tranche de 2 points au-dessus du SD. La valeur de ce bonus ne peut pas excéder +5.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-maitre-compagnon",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Maître artisan",
    "name": "Maître compagnon (TECH)",
    "attribute": "TECH",
    "description": "Grâce à Maître compagnon, l’Artisan réalise des armes d’excellente facture. Il peut réaliser à tout moment un jet de Maître compagnon dont le SD est égal au SD de fabrication de l’objet pour octroyer une résistance permanente de son choix à une armure, ou une valeur de saignement 50 % ou d’étourdissement –2 à une arme (selon le type de dégâts qu’elle inflige).",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-pharmacie-mentale",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Alchimiste",
    "name": "Pharmacie mentale (INT)",
    "attribute": "INT",
    "description": "Un Artisan chevronné garde en mémoire toute une collection de formules. Lorsqu’un Artisan a fini de mémoriser le plus de formules possible, il peut réaliser un jet de Catalogue étendu SD 15 pour en retenir une de plus. Il n’existe pas de limite au nombre de formules qu’il peut mémoriser, mais tous les 10 formules, le SD augmente de +1.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-double-dose",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Alchimiste",
    "name": "Double dose (TECH)",
    "attribute": "TECH",
    "description": "Chaque fois que l’Artisan prépare une décoction alchimique, il peut réaliser un jet de Double dose dont le SD est égal au SD de la fabrication de la formule. En cas réussite, il crée deux doses au lieu d’une sans dépenser d’ingrédients supplémentaires. Cette compétence s’applique à toutes les créations alchimiques, y compris les potions, les huiles, les décoctions et les bombes.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-adaptation",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Alchimiste",
    "name": "Adaptation (TECH)",
    "attribute": "TECH",
    "description": "L’Artisan peut effectuer un test d’Adaptation (SD de fabrication +3) avant de concocter une potion de sorceleur pour diminuer le SD fixé pour se débarrasser de l’empoisonnement de –1 pour chaque point au-dessus du SD de fabrication. En cas d’échec, la potion est aussi venimeuse que d’habitude. Le SD pour chasser l’effet d’empoisonnement ne peut jamais être inférieur à 12.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-amelioration",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Improvisateur",
    "name": "Amélioration (TECH)",
    "attribute": "TECH",
    "description": "Un Artisan peut effectuer un jet d’Amélioration dont le SD est indiqué dans le tableau ci-contre afin d’améliorer une arme ou une armure grâce à ses outils d’artisan. Le processus prend trois rounds. Les améliorations qui ne nécessitent pas de forge accordent un bonus de +2 sur le jet. En cas d’échec critique, l’objet subit un montant de dégâts égal à la valeur de l’échec critique. Il est impossible d’appliquer deux fois la même amélioration.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-plaque-argent",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Improvisateur",
    "name": "Plaqué argent (TECH)",
    "attribute": "TECH",
    "description": "Un Artisan peut réaliser un placage d’argent sur une arme pourvu qu’il ait accès à une forge et à un nombre suffisant de lingots d’argent. Le SD du jet est de 16. S’il réussit, l’arme inflige +1d6 dégâts d’argent supplémentaires par tranche de 3 points au-dessus du SD, avec un maximum de 5d6. En cas d’échec, l’arme se brise.",
    "isCoreProfession": true
  },
  {
    "id": "tl-craftsman-deceler",
    "professionId": "craftsman",
    "profession": {
      "en": "Craftsman",
      "fr": "Artisan"
    },
    "branch": "Improvisateur",
    "name": "Déceler (TECH)",
    "attribute": "TECH",
    "description": "Un Artisan peut réaliser un jet de Déceler dont le SD est égal au SD de fabrication d’un objet pour repérer les défauts de conception. Il lui faut 1 round pour étudier l’objet, mais il peut ensuite réaliser une attaque ciblée à –6 pour infliger des dégâts d’ablation à l’armure ou l’arme. Il lance autant de d6 que la moitié de sa valeur de Déceler.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-notoriete",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Charmeur",
    "name": "Notoriété (EMP)",
    "attribute": "EMP",
    "description": "Avant un jet de Prestation, le Barde peut faire un jet de Notoriété, dont le SD est fixé par le MJ, pour savoir s’il a déjà joué dans cette ville auparavant. En cas de réussite, le Barde s’est déjà taillé une réputation à cet endroit. Les revenus pour sa Prestation sont doublés et il bénéficie d’un bonus de +2 en Charisme auprès de tous les spectateurs.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-captiver-la-foule",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Charmeur",
    "name": "Captiver la foule (EMP)",
    "attribute": "EMP",
    "description": "Le jet de Captiver la foule, qui nécessite un round complet, permet d’attirer l’attention du public dans un rayon de 20 m. Toutes les personnes qui obtiennent un résultat inférieur ou égal à celui du Barde sur leur jet de Résistance à la contrainte n’ont d’autre choix que de le regarder tant qu’elles ne réussissent pas leur jet. Dès qu’une cible est attaquée, elle s’arrache à sa contemplation.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-bon-ami",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Charmeur",
    "name": "Bon ami (EMP)",
    "attribute": "EMP",
    "description": "Une fois par session, le Barde peut réaliser un jet de Bon ami afin de trouver de l’aide. Le résultat total du jet vous donne le nombre de points à répartir entre les trois catégories du tableau de Bon ami ci-contre. L’ami en question vous prêtera main-forte dans la mesure du raisonnable en souvenir du bon vieux temps, mais par la suite, vous ne pourrez plus lui demander son aide sans contrepartie. Il faudra alors le convaincre.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-disparition",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Informateur",
    "name": "Disparition (INT)",
    "attribute": "INT",
    "description": "Un Barde peut effectuer un jet de Disparition en opposition avec les jets de Vigilance de plusieurs adversaires pour se fondre dans le décor. Cette compétence lui permet de se dissimuler quand il ne trouve pas de cachette à proximité en s’incrustant dans une conversation ou en attirant l’attention sur quelqu’un d’autre par exemple. Cette ruse ne fonctionne pas s’il porte des vêtements aux couleurs vives.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-ragots",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Informateur",
    "name": "Ragots (INT)",
    "attribute": "INT",
    "description": "Un Barde réussissant un jet de Duperie en opposition avec sa cible peut ensuite réaliser un jet de Ragots en opposition avec un jet de Résistance à la contrainte de son adversaire. En cas de réussite, la cible répand les mensonges du Barde auprès de son entourage. Le Barde bénéficie alors d’un bonus de +2 en Duperie lorsqu’il veut transmettre ses bobards à quelqu’un d’autre.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-acclimatation",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Informateur",
    "name": "Acclimatation (INT)",
    "attribute": "INT",
    "description": "Quand il se trouve dans une localité, le Barde peut effectuer un jet d’Acclimatation (voir le tableau d’Acclimatation pour le SD). En cas de réussite, il apprend à passer pour un habitant du coin et n’est plus traité comme un étranger. Il obtient ainsi un bonus de +2 en Charisme et en Persuasion lors des interactions avec les autochtones. En outre, ces derniers n’iront pas l’importuner.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-empoisonner-le-puits",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Manipulateur",
    "name": "Empoisonner le puits (EMP)",
    "attribute": "EMP",
    "description": "Un Barde peut réaliser un jet d’Empoisonner le puits contre l’EMP x3 de la cible pour influencer un interlocuteur ou une foule. En cas de réussite, ses paroles acerbes infligent un malus de –1 pour chaque point du résultat excédant le SD aux tests de Séduction, de Persuasion, de Commandement, d’Intimidation et de Charisme de la cible.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-pique",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Manipulateur",
    "name": "Pique (EMP)",
    "attribute": "EMP",
    "description": "Le Barde peut réaliser un jet de Pique en opposition avec un jet de Résistance à la contrainte de sa cible. En cas de réussite, il provoque sa victime en usant de menaces et de remarques obscènes jusqu’à ce qu’elle l’attaque. La cible subit un malus à ses valeurs d’attaque et de défense égal à la moitié du niveau de Pique du Barde. L’effet dure autant de rounds que le niveau de Pique.",
    "isCoreProfession": true
  },
  {
    "id": "tl-bard-suspicion",
    "professionId": "bard",
    "profession": {
      "en": "Bard",
      "fr": "Barde"
    },
    "branch": "Manipulateur",
    "name": "Suspicion (EMP)",
    "attribute": "EMP",
    "description": "Un Barde peut effectuer un jet de Suspicion contre la VOL x3 de la cible pour qu’elle se retourne contre un allié. En cas de réussite, les mensonges du Barde poussent la victime à se méfier de son ami pendant autant de jours que le niveau de Suspicion du Barde. Mais si elle obtient un résultat supérieur à celui du jet de Suspicion sur un jet de Résistance à la contrainte, l’effet de la compétence prend fin.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-plan-mental",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Voleur",
    "name": "Plan mental (INT)",
    "attribute": "INT",
    "description": "Le Criminel peut errer pendant une heure dans les rues d’une localité et réaliser un jet de Plan mental dont le SD est indiqué dans le tableau ci-contre. En cas de réussite, le Criminel mémorise les trajets des gardes, le plan des rues et l’emplacement des cachettes. Il bénéficie alors d’un bonus de +2 en Furtivité dans cette zone pendant autant de jours que son niveau de Plan mental.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-cle-mentale",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Voleur",
    "name": "Clé mentale (INT)",
    "attribute": "INT",
    "description": "Lorsqu’un Criminel a réussi à crocheter une serrure, il peut réaliser un jet de Clé mentale dont le SD est égal au SD du Crochetage pour mémoriser la position des goupilles. Le Criminel pourra alors déverrouiller la serrure sans jet de Crochetage. Il peut se souvenir d’autant de mécanismes qu’il a de points en INT et sélectionner ceux de son choix.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-planque",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Voleur",
    "name": "Planque (INT)",
    "attribute": "INT",
    "description": "Une fois par session, le Criminel peut effectuer un jet de Planque pour trouver une cachette où il fera profil bas pendant quelque temps. Le résultat total du jet vous donne le nombre de points à répartir entre les trois catégories du tableau de Planque ci-contre. Tant que cette cachette n’est pas détruite, il pourra s’y rendre autant de fois qu’il veut.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-point-faible",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Chef de bande",
    "name": "Point faible (EMP)",
    "attribute": "EMP",
    "description": "Le Criminel peut réaliser un jet de Point faible en opposition à un jet de Duperie de sa victime pour identifier les biens ou les personnes auxquels elle tient le plus. Le Criminel bénéficie aussi d’un bonus de +1 à ses jets d’Intimidation pour chaque tranche de 2 points au-dessus du résultat du jet de Duperie de la cible. Ce bonus d’Intimidation est valable jusqu’à ce que le point faible de la cible change.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-marquage",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Chef de bande",
    "name": "Marquage (VOL)",
    "attribute": "VOL",
    "description": "Un Criminel peut réaliser un jet de Marquage dont le SD est EMP x3 de la cible pour attirer l’attention sur elle en gravant par exemple un signe distinctif sur sa porte. En cas de réussite, la cible doit réussir un jet de Charisme, de Persuasion ou d’Intimidation dont le résultat surpasse celui du jet de Marquage pour obtenir de l’aide ou un service auprès des habitants de sa localité.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-recrutement",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Chef de bande",
    "name": "Recrutement (VOL)",
    "attribute": "VOL",
    "description": "Une fois par jour, le Criminel peut prendre une heure de son temps pour réaliser un jet de Recrutement dont le SD est fixé par le MJ. Pour chaque tranche de 2 points au-dessus du SD, il peut recruter 1 Bandit pendant un nombre de jours égal à sa valeur de Recrutement. Dès qu’un Bandit a perdu la moitié de ses points de santé, il doit obtenir un résultat inférieur ou égal à la VOL du Criminel sur 1d10 pour ne pas s’enfuir.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-visee-precise",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Assassin",
    "name": "Visée précise (DEX)",
    "attribute": "DEX",
    "description": "Un Criminel qui n’est pas engagé dans un combat peut consacrer un round à viser en réalisant un jet de Visée précise dont le SD est égal à RÉF x3 de sa cible. En cas de réussite, il bénéficiera sur sa prochaine attaque d’un bonus égal à la moitié de son niveau de Visée précise. S’il est repéré après avoir lancé les dés, mais avant d’attaquer, le bonus est divisé par deux.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-pique-aux-yeux",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Assassin",
    "name": "Pique aux yeux (DEX)",
    "attribute": "DEX",
    "description": "Le Criminel peut effectuer un jet de Pique aux yeux à la place d’une attaque pour aveugler temporairement sa cible. Pour utiliser cette compétence, le Criminel doit être au contact et subit un malus de –3 à son jet pour toucher. S’il réussit à toucher, la cible subit 2d6 points de dégâts non modifiés et est aveuglée pendant un nombre de rounds égal au niveau de Pique aux yeux.",
    "isCoreProfession": true
  },
  {
    "id": "tl-criminal-frappe-assassine",
    "professionId": "criminal",
    "profession": {
      "en": "Criminal",
      "fr": "Criminel"
    },
    "branch": "Assassin",
    "name": "Frappe assassine (DEX)",
    "attribute": "DEX",
    "description": "Lorsqu’il tend une embuscade à sa cible, le Criminel peut réaliser un jet de Frappe assassine en opposition avec un jet de Vigilance de la cible pour se dissimuler après avoir porté son coup. Cette capacité utilisable en toutes circonstances bénéficie de modificateurs en fonction de la luminosité et des possibilités de couvert. Lorsque plusieurs adversaires se trouvent sur les lieux, ils peuvent effectuer un jet chacun afin de repérer le Criminel.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-diagnostic",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Chirurgien",
    "name": "Diagnostic (INT)",
    "attribute": "INT",
    "description": "Quand il a la possibilité d’examiner un monstre ou un humain blessé, le Docteur peut effectuer un jet de Diagnostic dont le SD est fixé par le MJ. En cas de réussite, il évalue les blessures critiques dont le sujet est accablé ainsi que le nombre de points de santé qu’il lui reste. Il bénéficie également d’un bonus de +2 aux tests de Mains thérapeutiques pour guérir les blessures en question.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-analyse",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Chirurgien",
    "name": "Analyse (INT)",
    "attribute": "INT",
    "description": "Avant d’effectuer un jet de Mains thérapeutiques, le Docteur peut consacrer un round à un jet d’Analyse dont le SD est égal à la gravité de la blessure critique. En cas de réussite, il acquiert une meilleure vision d’ensemble des blessures. Ainsi, l’opération chirurgicale dure 1 round de moins pour chaque tranche de 2 points au-dessus du SD (bonus minimum de 1 round).",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-chirurgie-miraculeuse",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Chirurgien",
    "name": "Chirurgie miraculeuse (TECH)",
    "attribute": "TECH",
    "description": "Avant de soigner une blessure critique, le Docteur peut effectuer un jet de Chirurgie miraculeuse dont le SD est égal au SD Mains thérapeutiques de la blessure. En cas de réussite, il traite son patient avec tellement de brio qu’il récupère deux fois plus vite. Cette compétence est utilisable sur les blessures critiques et normales.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-espace-de-soins",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Herboriste",
    "name": "Espace de soins (TECH)",
    "attribute": "TECH",
    "description": "Le Docteur effectue un jet d’Espace de soins dont le SD est fixé par le MJ afin d’installer un pavillon où les conditions de soin seront optimales. Il faut compter 1 heure pour la mise en place, mais cette tente ajoute un bonus de +3 aux jets de Mains thérapeutiques/Premiers soins des personnages situés à l’intérieur. Elle augmente aussi de +2 PS le rythme de guérison des patients. L’effet dure autant de jours que le niveau d’Espace de soins du Docteur.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-improvisation",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Herboriste",
    "name": "Improvisation (INT)",
    "attribute": "INT",
    "description": "Le Docteur peut réaliser un jet d’Improvisation dont le SD est égal au SD de fabrication d’un remède alchimique pour créer en un round un produit de substitut ayant des effets similaires. En cas d’échec, le personnage peut faire une nouvelle tentative. Le substitut réalisé avec Improvisation fonctionne uniquement sur la blessure traitée au moment du jet.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-remede-naturel",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Herboriste",
    "name": "Remède naturel (TECH)",
    "attribute": "TECH",
    "description": "Avec des mélanges de substances alchimiques, le Docteur crée des remèdes à base de plantes qui accordent des bonus ou des effets supplémentaires selon la recette choisie (voir le tableau Remède naturel ci-contre). Les remèdes se conservent 3 jours et sont à usage unique. Il faut brûler ou mâcher la préparation pour bénéficier de ses avantages (une seule utilisation). La fabrication dure 1 round.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-plaie-ouverte",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Anatomiste",
    "name": "Plaie ouverte (INT)",
    "attribute": "INT",
    "description": "Un Docteur désireux d’infliger des dégâts avec une arme tranchante peut réaliser un jet de Plaie ouverte SD 15. En cas de réussite, l’attaque cause un saignement qui inflige 1 point de dégâts pour chaque tranche de 2 points au-dessus du SD. Seul un jet réussi de Premiers soins dont le SD est égal au résultat du jet de Plaie ouverte permet d’arrêter le saignement.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-carnage",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Anatomiste",
    "name": "Carnage (INT)",
    "attribute": "INT",
    "description": "Le Docteur effectue un jet de Carnage dont le SD est égal à COR x3 de la cible afin que les blessures simples et critiques de cette dernière guérissent deux fois moins vite. Les Docteurs dotés de la compétence Chirurgie miraculeuse et les objets qui augmentent le taux de guérison des blessures peuvent contrer cet effet.",
    "isCoreProfession": true
  },
  {
    "id": "tl-doctor-blessure-incapacitante",
    "professionId": "doctor",
    "profession": {
      "en": "Doctor",
      "fr": "Docteur"
    },
    "branch": "Anatomiste",
    "name": "Blessure incapacitante (INT)",
    "attribute": "INT",
    "description": "Le Docteur peut réaliser un jet de Blessure incapacitante en opposition avec la défense de la cible. Cette attaque souffre d’un malus de –6 au jet pour toucher, mais elle inflige un malus de –1 par tranche de 3 points au-dessus du jet de défense de la cible à ses RÉF, son COR et sa VIT. Seul un jet de Chirurgie miraculeuse dont le résultat excède celui du jet de Blessure incapacitante peut annuler ces effets négatifs.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-portee-extreme",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Tireur d’élite",
    "name": "Portée extrême (DEX)",
    "attribute": "DEX",
    "description": "Lorsqu’il effectue une attaque à distance qui devrait souffrir de malus dus à la portée, l’Homme d’armes peut réduire ce malus jusqu’à la moitié de leur valeur de Portée extrême. Il peut également faire un jet de Portée extrême (SD 16)) pour attaquer une cible située jusqu’à trois fois la portée de l’arme avec un malus de –10 qui peut être modifié par Portée extrême.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-double-tir",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Tireur d’élite",
    "name": "Double tir (DEX)",
    "attribute": "DEX",
    "description": "Lorsqu’il effectue une attaque à distance avec un arc ou une arme de jet, l’Homme d’armes peut réaliser un jet de Double tir au lieu d’utiliser sa compétence d’arme. S’il touche, la cible est frappée par deux projectiles à deux endroits déterminés aléatoirement. Même quand l’Homme d’armes vise, lancez un dé pour déterminer la localisation du deuxième projectile.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-trait-precis",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Tireur d’élite",
    "name": "Trait précis (DEX)",
    "attribute": "DEX",
    "description": "Dès que l’Homme d’armes inflige une blessure critique avec son arme à distance, il réalise immédiatement un jet de Trait précis dont le SD est égal à DEX x3 de la cible. En cas de réussite, il ajoute son niveau de Trait précis à son jet sur le tableau de blessure critique. Ce bonus s’applique uniquement pour déterminer l’emplacement de la blessure critique.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-limier",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Chasseur de primes",
    "name": "Limier (INT)",
    "attribute": "INT",
    "description": "L’Homme d’armes ajoute son niveau de Limier à ses jets de Survie quand il traque une cible ou tente de retrouver sa piste. S’il perd la trace de sa victime après avoir usé de cette compétence, il peut réaliser un jet de Limier dont le SD est fixé par le MJ pour revenir sur ses pas et retrouver la piste de départ.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-chausse-trappe",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Chasseur de primes",
    "name": "Chausse-trappe (TECH)",
    "attribute": "TECH",
    "description": "L’Homme d’armes peut réaliser un jet de Chausse-trappe pour installer un piège dans une zone spécifique. Il en existe différents types, recensés dans le tableau de Chausse-trappe ci-contre. L’Homme d’armes ne peut en fabriquer qu’un seul à la fois. Tous les pièges possèdent un système de détente qui s’étend sur un rayon de 2 m. Pour les repérer, il faut réussir un jet de Vigilance dont le SD est égal au résultat du jet de Chaussetrappe de l’Homme d’armes.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-sens-du-combat",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Chasseur de primes",
    "name": "Sens du combat (INT)",
    "attribute": "INT",
    "description": "Au lieu de se déplacer, l’Homme d’armes peut réaliser un jet de Sens du combat pour analyser plus en détail ses adversaires. Pendant un round, il gagne un bonus de +3 sur ses jets d’attaque et de défense contre les ennemis situés dans un rayon de 10 m dont le total de DEX x3 est inférieur au résultat de son jet. Cette capacité permet aussi à l’Homme d’armes de deviner la prochaine action de ses adversaires.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-fureur",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Ravageur",
    "name": "Fureur (VOL)",
    "attribute": "VOL",
    "description": "L’Homme d’armes peut effectuer un jet de Fureur dont le SD est égal à son EMP x3. En cas de réussite, il devient immunisé à la peur, aux sorts modifiant les émotions et au combat verbal pendant un nombre de rounds égal au double de son niveau de Fureur. Son instinct reprend le dessus pendant que la rage brouille ses pensées.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-zweihand",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Ravageur",
    "name": "Zweihand (COR)",
    "attribute": "COR",
    "description": "L’Homme d’armes peut dépenser 10 END et réaliser un jet de Zweihand avec un malus de –3 en opposition avec la défense d’un adversaire afin de porter une attaque dont les dégâts sont doublés. Elle bénéficie également de l’effet Perforation, qui passe à Perforation améliorée si son arme possédait déjà cette caractéristique. Une arme ayant Perforation améliorée infligera 3d6 dégâts de plus.",
    "isCoreProfession": true
  },
  {
    "id": "tl-man-at-arms-meme-pas-mal",
    "professionId": "man-at-arms",
    "profession": {
      "en": "Man at Arms",
      "fr": "Homme d’armes"
    },
    "branch": "Ravageur",
    "name": "Même pas mal ! (COR)",
    "attribute": "COR",
    "description": "L’Homme d’armes peut dépenser 10 END pour réaliser immédiatement un jet de Même pas mal ! lorsqu’un ennemi lui inflige une blessure critique. Si le résultat est supérieur au jet d’attaque de son adversaire, les effets de la blessure critique sont annulés et il subit des dégâts normalement. L’Homme d’armes peut utiliser cette compétence autant de fois par session de jeu que sa valeur de CORPS.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-intrigue",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Politicien",
    "name": "Intrigue (INT)",
    "attribute": "INT",
    "description": "Un Mage peut réaliser un jet d’Intrigue dont le SD est égal à INT x3 de la cible. En cas de réussite, il obtient un bonus de +3 en Duperie, Séduction, Intimidation ou Persuasion contre la victime qu’il a espionnée et connaît tout d’elle. Le bonus de cette compétence s’applique autant de jours que le niveau d’Intrigue du Mage.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-commerage",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Politicien",
    "name": "Commérage (INT)",
    "attribute": "INT",
    "description": "Le Mage peut consacrer 1 heure de son temps ainsi qu’un jet de Commérage en opposition avec l’EMP x3 de la cible pour répandre des ragots. En cas de réussite, les rumeurs vont bon train dans la localité. Elles diminuent la réputation de la victime de la moitié du niveau de Commérage du Mage, pendant un nombre de jours égal au niveau de cette compétence.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-atout",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Politicien",
    "name": "Atout (INT)",
    "attribute": "INT",
    "description": "Une fois par session, un Mage peut réaliser un jet d’Atout pour se souvenir d’une connaissance qui lui doit une faveur. Le résultat total du jet vous donne le nombre de points à répartir entre les quatre catégories du tableau d’Atout ci-contre. Cette connaissance pourra venir en aide au Mage, mais son degré d’implication dépendra des relations que tous deux entretiennent.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-retro-ingenierie",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Scientifique",
    "name": "Rétro-ingénierie (INT)",
    "attribute": "INT",
    "description": "Pendant l’heure qu’il consacre à l’étude d’une solution alchimique, le Mage peut effectuer un jet de Rétro-ingénierie dont le SD est égal au SD de fabrication de la préparation alchimique +3. En cas de réussite, il est capable d’inverser le processus de préparation pour retrouver la formule alchimique de cette solution. Le SD de fabrication de la formule étudiée sera supérieur de +3, mais la décoction ne souffrira d’aucun défaut.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-distillation",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Scientifique",
    "name": "Distillation (TECH)",
    "attribute": "TECH",
    "description": "Le Mage peut effectuer un jet de Distillation plutôt que d’Alchimie pour la préparation des décoctions. En cas de réussite, il crée une dose dont les effets sont accrus de 50 % par rapport à une préparation normale. Ce bonus peut porter sur la durée, les dégâts ou le SD de résistance, au choix du Mage. Arrondissez à l’inférieur après avoir appliqué le bonus.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-mutation",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Scientifique",
    "name": "Mutation (INT)",
    "attribute": "INT",
    "description": "Un Mage peut dépenser toute son Endurance et consacrer un jour entier à une expérimentation destinée à modifier l’organisme de son sujet. Il réalise alors un jet de Mutation dont le SD est égal à (28 – [COR+VOL du sujet]/2). En cas de réussite, le sujet absorbe un mutagène lui procurant une mutation mineure. En cas d’échec, le sujet entre en état de mort imminente et subit une mutation majeure. Deux mutations sont applicables à un seul sujet et aucune caractéristique ne peut excéder 10 grâce à une mutation.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-contact-magique",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Archimage",
    "name": "Contact magique",
    "description": "L’organisme du Mage s’habitue aux flux d’énergie au fur et à mesure qu’il use de la magie. Chaque point qu’il possède en Contact magique lui augmente de +2 son seuil de Vigueur. Lorsqu’il atteint le niveau 10 dans cette compétence, son seuil de Vigueur maximum est alors de 25. Le personnage peut s’entraîner pour progresser dans cette compétence.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-immuable",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Archimage",
    "name": "Immuable (VOL)",
    "attribute": "VOL",
    "description": "Le Mage est en mesure de réaliser un jet d’Immuable SD 16 chaque fois qu’il devrait être soumis à l’influence du dimeritium. En cas de réussite, le Mage ignore ses effets. Il se sentira toujours mal à l’aise et un peu sonné, mais il conservera la moitié de son seuil de Vigueur habituel et pourra lancer des sorts.",
    "isCoreProfession": true
  },
  {
    "id": "tl-mage-magie-etendue",
    "professionId": "mage",
    "profession": {
      "en": "Mage",
      "fr": "Mage"
    },
    "branch": "Archimage",
    "name": "Magie étendue (VOL)",
    "attribute": "VOL",
    "description": "Le Mage manie une puissance incommensurable à l’aide d’artefacts magiques. Il peut effectuer un jet de Magie étendue SD 16 avant de lancer un sort ou un rituel. En cas de réussite, le Mage peut canaliser son sort ou son rituel à travers 2 objets de son choix ayant le motclef Focus. Il applique la réduction du coût en Endurance des 2 objets.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-choix",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Courtier",
    "name": "Choix (INT)",
    "attribute": "INT",
    "description": "Le Marchand peut réaliser un jet de Choix dont le SD est fixé par le MJ pour trouver une meilleure offre. En cas de réussite, il trouve un vendeur proposant la marchandise recherchée à moitié prix. Plus l’objet est rare, plus le SD sera élevé. Choix ne fonctionne pas sur les technologies expérimentales, les reliques et l’équipement de sorceleur.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-dur-en-affaires",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Courtier",
    "name": "Dur en affaires (EMP)",
    "attribute": "EMP",
    "description": "Lorsqu’il soudoie quelqu’un, le Marchand peut tenter un jet de Dur en affaires dont le SD est égal à VOL x3 de la cible. En cas de réussite, il arrive à corrompre son interlocuteur avec un objet qu’il possède coûtant 5 couronnes. Ce pot-de-vin donne un bonus de +3 en Persuasion. Le SD augmente de +5 si la proposition du Marchand paraît ridicule.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-promesse",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Courtier",
    "name": "Promesse (EMP)",
    "attribute": "EMP",
    "description": "Quand il effectue des achats, le Marchand peut effectuer un jet de Promesse dont le SD est égal à EMP x3 du vendeur. En cas de réussite, il propose de payer la marchandise plus tard, dans un nombre de semaines égal à son niveau de Promesse, et le revendeur accepte.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-gueusaille",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Contact",
    "name": "Gueusaille (EMP)",
    "attribute": "EMP",
    "description": "Le Marchand peut effectuer un jet de Gueusaille dont le SD dépend de la localité pour recevoir l’aide de 1 gamin ou 1 vagabond pour chaque point au-dessus du SD (maximum 10). Il peut se renseigner auprès d’eux pour recevoir un bonus de +1 par adjuvant en Connaissance de la rue, mais devra leur verser 1 couronne chacun.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-carte-aux-tresors",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Contact",
    "name": "Carte aux trésors (INT)",
    "attribute": "INT",
    "description": "Une fois par session de jeu, le Marchand peut effectuer un jet de Carte aux trésors dont le SD est fixé par le MJ afin de retrouver l’emplacement supposé d’une relique ou d’une ruine recelant des artefacts intéressants. Bien évidemment, il faudra effectuer un large détour pour atteindre ce lieu ou se préparer à affronter des dangers mortels lors d’une quête périlleuse. Le trajet jusqu’à l’objectif nécessitera une session de jeu.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-espion",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Contact",
    "name": "Espion (INT)",
    "attribute": "INT",
    "description": "Un Marchand doté de la compétence Espion peut convaincre une personne d’enquêter pour son compte. Il doit pour cela dépenser 10 couronnes et effectuer un jet d’Espion en opposition avec un jet de Résistance à la contrainte de sa cible. En cas de réussite, son interlocuteur espionnera la personne de son choix pendant un nombre de jours égal à son niveau d’Espion. Il peut effectuer un nouveau jet une fois cette période passée, mais il devra encore allonger la monnaie.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-bonne-reputation",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Havekar",
    "name": "Bonne réputation (VOL)",
    "attribute": "VOL",
    "description": "Dès qu’il pénètre dans une localité, le Marchand répand la nouvelle de son arrivée pendant une heure, puis il effectue un jet de Bonne réputation dont le SD dépend de l’agglomération. Une réussite augmente sa réputation dans la zone du nombre de points au-dessus du SD divisé par 2 (minimum +1) pendant 1d6 semaines.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-receleur",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Havekar",
    "name": "Receleur (INT)",
    "attribute": "INT",
    "description": "Lorsqu’un Marchand doit se débarrasser de marchandises douteuses ou volées, il peut effectuer un jet de Receleur dont le SD est fixé par le MJ. En cas de réussite, il revend les biens en question (au prix du marché) à un acheteur qui ne lui posera pas de questions indiscrètes et ne le dénoncera pas aux autorités.",
    "isCoreProfession": true
  },
  {
    "id": "tl-merchant-debiteur-martial",
    "professionId": "merchant",
    "profession": {
      "en": "Merchant",
      "fr": "Marchand"
    },
    "branch": "Havekar",
    "name": "Débiteur martial (EMP)",
    "attribute": "EMP",
    "description": "Le Marchand effectue un jet de Débiteur martial afin d’appeler à l’aide un combattant qui a une dette envers lui. Le résultat total du jet vous donne le nombre de points à répartir entre les trois catégories du tableau de Guerrier ci-contre. Le soldat travaillera pour vous pendant un nombre de jours égal à votre niveau de Débiteur martial. Pendant cette période, il acceptera sans rechigner tous les ordres sensés que vous lui donnerez.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-puissance-divine",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Prêcheur",
    "name": "Puissance divine",
    "description": "Le Prêtre entre en harmonie avec son dieu, son seuil de Vigueur augmente alors de 1 point par niveau de Puissance divine. Cela signifie qu’au niveau 10, son seuil de Vigueur total sera de 12. Le personnage peut s’entraîner pour progresser dans cette compétence dont les effets se cumulent avec ceux d’Harmonisation naturelle, les seuils de Vigueur n’étant pas propres à chaque compétence.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-autorite-divine",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Prêcheur",
    "name": "Autorité divine (EMP)",
    "attribute": "EMP",
    "description": "Les paysans et le commun des mortels considèrent les prêtres comme des agents de la volonté divine. Un Prêtre ajoutera donc son niveau d’Autorité divine à ses jets de Commandement dans les zones où sa religion exerce une influence. Hors de ces régions, il ajoute la moitié de son niveau à ses jets de Commandement.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-precognition",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Prêcheur",
    "name": "Précognition (VOL)",
    "attribute": "VOL",
    "description": "Quand le MJ le désire, le Prêtre peut être assailli de visions prophétiques qui le plongent dans un état catatonique pendant 3 rounds. Passé ce délai, le Prêtre effectue un jet de Précognition dont le SD est fixé par le MJ afin d’interpréter le sens de ces révélations. Les visions s’articulent en général autour de symboles et de métaphores.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-harmonisation-naturelle",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Druide",
    "name": "Harmonisation naturelle",
    "description": "Le Prêtre entre en harmonie avec la nature, son seuil de Vigueur augmente alors de 1 point par niveau d’Harmonisation naturelle. Cela signifie qu’au niveau 10, son seuil de Vigueur total sera de 12. Le personnage peut s’entraîner pour progresser dans cette compétence dont les effets se cumulent avec ceux de Puissance divine, les seuils de Vigueur n’étant pas propres à chaque compétence.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-dechiffrer-la-nature",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Druide",
    "name": "Déchiffrer la nature (INT)",
    "attribute": "INT",
    "description": "Lorsqu’il se trouve en pleine nature, le druide peut effectuer un jet de Déchiffrer la nature dont le SD est fixé par le MJ. En cas de réussite, il interprète les signes de son environnement pour apprendre ce qui s’est passé dans les environs. La compétence dresse un tableau qui reste centré sur le lieu où se trouve le Prêtre et ne permet pas de remonter une piste.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-pacte-animal",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Druide",
    "name": "Pacte animal (VOL)",
    "attribute": "VOL",
    "description": "Le druide ajoute son niveau de Pacte animal lors de ses jets de Survie visant à dresser des animaux. Il peut aussi établir un pacte avec une bête. Il doit alors consacrer un round entier et un jet de Pacte animal pour qu’elle devienne son alliée pendant un nombre d’heures égal à son niveau de Pacte animal. Cette compétence ne fonctionne pas sur les monstres.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-rituels-sanglants",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Fanatique",
    "name": "Rituels sanglants (VOL)",
    "attribute": "VOL",
    "description": "Lorsqu’il réalise un rituel, le Prêtre peut effectuer un jet de Rituels sanglants dont le SD est égal au SD de lancement du rituel. En cas de réussite, le Prêtre lance son rituel sans utiliser les substances alchimiques requises en dépensant 5 points de santé par composant manquant. Le sang doit être versé au moment du rituel, mais il peut provenir d’autres personnes.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-ferveur",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Fanatique",
    "name": "Ferveur (EMP)",
    "attribute": "EMP",
    "description": "Le Prêtre effectue un jet de Ferveur dont le SD est INT x3 de la cible. En cas de réussite, le pouvoir de persuasion de ses paroles octroie 1d6 points de santé temporaires pour chaque point ayant excédé le SD (maximum 5d6). Ce pouvoir dure autant de rounds que le double du niveau de Ferveur et ne fonctionne qu’une fois par jour sur chaque cible.",
    "isCoreProfession": true
  },
  {
    "id": "tl-priest-emissaire-des-dieux",
    "professionId": "priest",
    "profession": {
      "en": "Priest",
      "fr": "Prêtre"
    },
    "branch": "Fanatique",
    "name": "Émissaire des dieux (EMP)",
    "attribute": "EMP",
    "description": "Le Prêtre effectue un jet d’Émissaire des dieux lorsqu’il veut convaincre ses interlocuteurs que les dieux parlent directement à travers sa bouche. Tous ceux qui échouent à un jet de Résistance à la contrainte en opposition au jet d’Émissaire des dieux considèrent le Prêtre comme un messie et deviennent ses apôtres. Le Prêtre peut avoir autant de disciples que son niveau d’Émissaire des dieux. Lors des combats, les apôtres utilisent les caractéristiques des bandits.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-meditation",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Sorcelame",
    "name": "Méditation",
    "description": "Le Sorceleur entre dans une transe méditative qui apporte tous les bénéfices d’une nuit de sommeil tout en lui permettant de rester sur ses gardes. Quand il médite, le Sorceleur est considéré comme étant éveillé. Il repère tout ce qui se passe dans un rayon (exprimé en mètres) égal au double de son niveau de Méditation.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-source-magique",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Sorcelame",
    "name": "Source magique",
    "description": "Le corps du Sorceleur s’endurcit à mesure qu’il utilise les Signes. Son seuil de Vigueur augmente de 1 point pour chaque tranche de 2 points qu’il possède en Source magique. Lorsque cette compétence atteint le niveau 10, son seuil de Vigueur maximum passe à 7. Le personnage peut s’entraîner pour progresser dans cette compétence.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-heliotrope",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Sorcelame",
    "name": "Héliotrope (VOL)",
    "attribute": "VOL",
    "description": "Lorsque le Sorceleur est la cible d’un sort, d’une invocation ou d’un envoûtement, il peut tenter un jet d’Héliotrope pour annuler les effets de la magie. Il doit dépenser autant de points d’Endurance que la moitié de ceux requis pour lancer le sort et obtenir un résultat supérieur ou égal au jet d’Incantation de l’adversaire.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-estomac-de-fer",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Mutant",
    "name": "Estomac de fer",
    "description": "À force d’ingérer des potions toxiques, l’organisme du Sorceleur s’est adapté aux toxines. Il peut supporter 5 % de toxicité en plus lorsqu’il boit des potions ou des décoctions pour chaque point qu’il possède en Estomac de fer. Le personnage peut s’entraîner pour progresser dans cette compétence. Au niveau 10, le taux de toxicité maximal d’un Sorceleur s’élève à 150 %.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-frenesie",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Mutant",
    "name": "Frénésie",
    "description": "Quand il est empoisonné, le Sorceleur entre en état de rage et inflige 1d6 dégâts de mêlée supplémentaires par niveau de Frénésie. À cet instant, son unique but est de se mettre en sécurité ou d’éliminer le responsable de son empoisonnement. Dès que l’effet des toxines disparaît, la Frénésie prend fin. Le Sorceleur peut également réaliser un jet de Résilience SD 15 pour quitter cet état plus tôt.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-transmutation",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Mutant",
    "name": "Transmutation (COR)",
    "attribute": "COR",
    "description": "Quand il ingère une décoction, le Sorceleur peut réaliser un jet de Transmutation SD 18. En cas de réussite, son organisme absorbe mieux le mutagène que d’habitude, il bénéficie alors d’un bonus qui dépend de la nature du breuvage. L’effet de la décoction dure 50 % plus longtemps. Les mutations supplémentaires sont trop discrètes pour être visibles à l’oeil nu.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-deviation-de-fleches",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Tueur",
    "name": "Déviation de flèches (DEX)",
    "attribute": "DEX",
    "description": "Le Sorceleur effectue un jet de Déviation de flèches avec un malus de –3 pour parer les projectiles physiques. Lorsqu’il pare une attaque, le sorceleur peut choisir une cible jusqu’à 10 mètres. Cette cible doit alors effectuer une action de défense contre le jet de Déviation des flèches du sorceleur pour ne pas être Stupéfait par le projectile.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-frappe-rapide",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Tueur",
    "name": "Frappe rapide (RÉF)",
    "attribute": "RÉF",
    "description": "Après que le Sorceleur a terminé son tour, il peut dépenser 5 points d’END pour effectuer un jet de Frappe rapide dont le SD est égal à RÉF x3 de son adversaire. En cas de réussite, il porte une attaque supplémentaire lors du round contre l’adversaire visé. Le coup ne peut pas désarmer, déséquilibrer ou produire d’autres effets de ce genre.",
    "isCoreProfession": true
  },
  {
    "id": "tl-witcher-tourbillon",
    "professionId": "witcher",
    "profession": {
      "en": "Witcher",
      "fr": "Sorceleur"
    },
    "branch": "Tueur",
    "name": "Tourbillon (RÉF)",
    "attribute": "RÉF",
    "description": "En dépensant 5 points d’END par round, le Sorceleur effectue un Tourbillon qui lui permet de porter une attaque contre chaque adversaire à portée de son arme pendant chaque tour. Son jet de Tourbillon remplace alors le jet d’attaque. Pendant ce temps, le Sorceleur a le choix entre maintenir le Tourbillon, esquiver et se déplacer de 2 m par round. Toute autre action met fin au Tourbillon. Il en va de même s’il est touché.",
    "isCoreProfession": true
  }
];
