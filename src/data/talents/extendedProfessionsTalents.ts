import type { TalentEntry } from './types';

/**
 * Skill-tree talents for the 5 extended & supplement professions (45 entries).
 */
export const EXTENDED_PROFESSIONS_TALENTS: readonly TalentEntry[] = [
  {
    "id": "tl-noble-dilettante",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Oisif",
    "name": "Dilettante",
    "description": "Chaque fois que le Noble acquiert un niveau en Dilettante, il gagne gratuitement 2 points de compétence. Il doit obligatoirement dépenser ces points pour acquérir le premier niveau d'une compétence, qu'il ne peut pas améliorer au-delà du niveau 1. Pour obtenir le premier niveau d'une compétence complexe, le Noble doit dépenser les 2 points gratuits.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-esbroufe",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Oisif",
    "name": "Esbroufe (EMP)",
    "attribute": "EMP",
    "description": "En réussissant un jet d'Esbroufe contre la Résistance à la contrainte d'une cible, le Noble la persuade qu'il est un véritable expert sur un sujet spécifique. La victime s'en remet par la suite au jugement du Noble, qui gagne un bonus de +3 à ses jets de Duperie contre la cible chaque fois que le sujet en question est évoqué.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-reception",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Oisif",
    "name": "Réception (EMP)",
    "attribute": "EMP",
    "description": "Le Noble peut consacrer un jour et dépenser une somme d'argent égale à sa valeur de Réception x 100 pour organiser des festivités. Pendant le banquet, le Noble bénéficie d'un bonus de +3 en Charisme, Séduction et Persuasion. Les invités doivent réussir un jet de Résistance à la contrainte contre la Réception du Noble pour ne pas se rendre à la fête.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-ordres",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Commandant",
    "name": "Ordres (VOL)",
    "attribute": "VOL",
    "description": "En guise d'action, le Noble peut ordonner à une cible d'effectuer une tâche spécifique lors de leur tour suivant. S'il réussit un jet d'Ordres contre la VOL x 3 de la cible, cette dernière bénéficie d'un bonus égal à la moitié de la valeur d'Ordres du Noble (minimum 1) sur un jet lié à la tâche demandée.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-serviteurs",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Commandant",
    "name": "Serviteurs",
    "description": "Le Noble obtient un nombre de serviteurs égal à la moitié de son niveau de Serviteurs (minimum 1). Ces sujets obéissent du mieux qu'ils peuvent aux ordres du Noble, mais s'ils doivent risquer leur vie pour leur maître, ce dernier doit leur donner une consigne explicite ou les convaincre du bienfondé de leur sacrifice. Quand un serviteur ne peut plus remplir ses fonctions pour quelque raison que ce soit, le Noble peut requérir la présence d'un autre serviteur issu de sa maisonnée.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-domaine",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Commandant",
    "name": "Domaine",
    "description": "Le Noble possède dans la région de sa préférence (il doit justifier son choix) un domaine comprenant une habitation principale, une écurie et des terres. Le fief qu'il administre lui rapporte des bénéfices. Toutes les personnes vivant sur ses terres sont ses sujets. Les règles complètes se trouvent à la page suivante.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-determination",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Chevalier",
    "name": "Détermination",
    "description": "Le Noble peut ajouter sa valeur de Détermination à ses jets de Courage et de Résistance à la contrainte. Lorsqu'il réussit un jet de Courage ou de Résistance à la contrainte, tous les alliés en mesure de le voir bénéficient d'un bonus égal à la moitié de la valeur de Détermination du Noble (minimum 1) sur les jets du même type jusqu'à la fin de la scène.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-cavalier",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Chevalier",
    "name": "Cavalier (EMP)",
    "attribute": "EMP",
    "description": "Le Noble peut consacrer une heure de son temps et un jet de Cavalier contre la VOL x 3 de sa monture pour tisser un lien puissant avec elle. Lorsque le Noble la chevauche, ajoutez la moitié du niveau de Cavalier au modificateur de contrôle de la monture. Le Noble peut également réduire le résultat d'une perte de contrôle de la moitié de son niveau de Cavalier.",
    "isCoreProfession": false
  },
  {
    "id": "tl-noble-harnois-de-qualite",
    "professionId": "noble",
    "profession": {
      "en": "Noble",
      "fr": "Noble"
    },
    "branch": "Chevalier",
    "name": "Harnois de qualité (RÉF)",
    "attribute": "RÉF",
    "description": "Lorsqu'un ennemi inflige une blessure critique à un Noble, ce dernier peut immédiatement faire un jet de Harnois de qualité contre le SD du jet d'attaque de son adversaire. Si le Noble réussit, il annule la blessure critique en sacrifiant l'armure qui le protège à l'endroit ciblé. L'armure subit 1d10 dégâts d'ablation par niveau de critique dans la localisation touchée.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-incognito",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Humaniste",
    "name": "Incognito (INT)",
    "attribute": "INT",
    "description": "Le Vampire a appris de son observation des Humains et est capable de se faire passer pour n'importe qui (médecin, bandit, vétéran, marchand, noble, ermite…). Il effectue un jet d'Incognito en opposition au SD de la cible selon la circonstance (Duperie, Résistance à la contrainte, Étiquette, Vigilance ou Éducation).",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-repaire",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Humaniste",
    "name": "Repaire (INT)",
    "attribute": "INT",
    "description": "De par sa nature, le Vampire peut trouver et réclamer un repaire d'un point de vue animal (ne confère pas d'acte de propriété officiel en ville). Il effectue un jet de Repaire et répartit les points obtenus dans le tableau de Repaire. Si l'endroit est habité, il devra tuer ou chasser ses occupants.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-a-travers-les-ages",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Humaniste",
    "name": "À travers les Âges",
    "description": "Avec le temps, le Vampire a dépassé les limites humaines. Tous les 2 rangs dans cette compétence, il gagne +1 à chaque Caractéristique (soit +5 au rang 10) et peut ainsi dépasser le plafond humain de 10.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-invisibilite",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Vampire",
    "name": "Invisibilité (VOL)",
    "attribute": "VOL",
    "description": "Lorsqu'il est invisible, le Vampire obtient +10 en Furtivité et +5 en attaque. Il redevient visible dès qu'il attaque ou si une cible réussit un jet de Vigilance (auquel cas il subit –3 pour attaquer ou se défendre). Yrden et Poussière de Lune le rendent visible. Endurance requise : 8 · Durée : 1 round / niveau.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-puissance-vampirique",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Vampire",
    "name": "Puissance Vampirique",
    "description": "À force de maîtrise, le Vampire augmente sa Vigueur et sa capacité à lancer des sortilèges vampiriques. Chaque rang octroie +3 de Vigueur, atteignant ainsi 40 points au niveau 10.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-seigneur-de-la-nuit",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Vampire",
    "name": "Seigneur de la Nuit (VOL)",
    "attribute": "VOL",
    "description": "Le Vampire se métamorphose en créature de carnage (3 m, 220 kg, 4 bras et 2 ailes, déchirant vêtements et armures). Toute personne qui le voit doit réussir un jet de Courage (SD = VOL × 3) pour ne pas être terrifiée. Transformation : SD 24 (SD 30 de jour), maintien du contrôle : SD 28, pour la moitié de l'Endurance totale.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-charme",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Séducteur",
    "name": "Charme (EMP)",
    "attribute": "EMP",
    "description": "Le Vampire ajoute son rang de Charme à un jet de Charisme, Commandement, Duperie, Persuasion ou Séduction (et à Appel de la Nuit au rang 10). Toutefois, cette action fait briller ses yeux et risque de révéler sa véritable nature.",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-goule",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Séducteur",
    "name": "Goule (EMP)",
    "attribute": "EMP",
    "description": "Le Vampire peut se lier des alliés en leur faisant volontairement boire son sang. Il effectue un jet de Goule (EMP) selon le SD de la créature visée et du degré d'attachement souhaité, tout en sacrifiant les PS correspondants (voir tableau).",
    "isCoreProfession": false
  },
  {
    "id": "tl-vampire-appel-de-la-nuit",
    "professionId": "vampire",
    "profession": {
      "en": "Higher Vampire",
      "fr": "Vampire supérieur"
    },
    "branch": "Séducteur",
    "name": "Appel de la Nuit (EMP)",
    "attribute": "EMP",
    "description": "Soumet par sa volonté les créatures de la nuit environnantes afin qu'elles viennent à son aide. Le Vampire effectue un jet d'Appel de la Nuit et répartit ses points dans le tableau correspondant (Créatures, Durée et Discipline).",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-frappe-vertueuse",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Militant",
    "name": "Frappe vertueuse (Réf / Dex)",
    "description": "Chaque fois que le Fanatique provoque et commence une rencontre avec un humanoïde sensible qui n'est pas un adepte de sa religion, il peut lancer Frappe vertueuse en tant qu'ouvreur de combat contre un SD: 17 pour prendre son ennemi au dépourvu et attaquer avec l'arme principale. Cette attaque est considérée comme une action gratuite qui inflige des dégâts de 1d6 pour tous les 2 rangs dans Frappe vertueuse et ne peut être défendue que si la cible bat un jet SD: 20 de Vigilance (ou Paranoïa pratiquée).",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-marque-d-heresie",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Militant",
    "name": "Marque d'hérésie (Vol)",
    "description": "En tant qu'action, un Fanatique peut marquer un adversaire sans défense ou battu d'une religion différente avec une Marque d'hérésie pour montrer à son environnement les crimes hérétiques du sujet, infligeant des dégâts 1d6 (les multiplicateurs de localisation ne s'appliquent pas) et infligeant un négatif de la moitié rang dans Marque d'hérésie pour toutes les interactions sociales (min. 1). Pour réussir à marquer un adversaire, le Fanatique doit lancer Marque d'hérésie contre CORx3 de la cible.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-guidance-divine",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Militant",
    "name": "Guidance divine (Réf / Dex)",
    "description": "À chaque fois qu'un Fanatique inflige une blessure critique à un ennemi, il peut lancer un jet de Guidance Divine contre CORx3 de la cible. En cas de succès, le jet de blessure critique est considéré augmente de 2 points (si l'attaque était dirigée, 4-6 sont considérés comme la blessure la plus grande). Lors de l'utilisation d'une arme avec l’effet Equilibré, le jet de détermination de la blessure critique EST considéré seulement 1 point plus haut.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-conversion",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Missionnaire",
    "name": "Conversion (Emp)",
    "description": "Un fanatique peut utiliser Conversion comme une attaque empathique dans un combat verbal. Si vous terminez un combat par un jet de Conversion réussi, votre adversaire est plus ouvert à votre religion et vous aidera à réaliser les souhaits de vos divinités (voir tableau annexe). La Conversion inflige 1d10 + VOL dégâts et inflige + 1 dégâts cumulés pour chaque utilisation de la conversion (réussie ou non) jusqu'à un maximum du rang de contrôle de la compétence.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-dime",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Missionnaire",
    "name": "Dîme (Emp)",
    "description": "Lorsqu'il interagit avec un adepte de sa religion, une fois par jour et par personne, en tant qu'action, un Fanatique peut lancer Dîme contre la Résistance à la contrainte de la cible pour gagner un certain nombre de couronnes de leur part, à condition qu'ils aient de l'argent.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-confraternite",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Missionnaire",
    "name": "Confraternité",
    "description": "Lorsqu'il interagit avec une personne qui ne partage pas sa religion, un Fanatique peut ajouter + 1 à ses capacités de profession (sauf Foi inébranlable) pour chaque adepte de sa religion dans une portée de 15m jusqu'à la moitié de son rang en Confraternité (min 1).",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-pieux",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Dévot",
    "name": "Pieux",
    "description": "Un Fanatique a un lien fort avec sa foi qui se manifeste dans ses capacités. Pour chaque rang obtenu dans Pieux, un Fanatique peut élever une compétence de profession (sauf Foi inébranlable) de 1. Au rang 10, chaque compétence de métier a été augmentée de 1. Cette compétence ne peut pas élever une autre compétence au-dessus de 10 et peut être entraînée comme toute autre compétence.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-volonte-focalisee",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Dévot",
    "name": "Volonté focalisée (Vol)",
    "description": "Lorsqu'ils souffrent de blessures, les Fanatiques peuvent se tourner vers leurs dieux pour obtenir de l'aide. Une fois par jour, en priant un tour complet, un Fanatique peut lancer Volonté focalisée à un SD: 20 pour augmenter sa guérison naturelle parpure volonté de 1d6 + 2 PS. Cette compétence peut également être utilisée pour réduire le temps de guérison d'une plaie critique traitée de 1d6 jours, mais ne fonctionne qu'une fois par plaie critique.",
    "isCoreProfession": false
  },
  {
    "id": "tl-fanatic-intervention-divine",
    "professionId": "fanatic",
    "profession": {
      "en": "Fanatic",
      "fr": "Fanatique"
    },
    "branch": "Dévot",
    "name": "Intervention divine (Vol)",
    "description": "En dépensant 15 points d’END, un Fanatique peut prier et laisser sa foi le guider par un jet d’Intervention Divine à -3 pour «lancer» l'Invocation d’Archiprêtre appropriée à sa religion. Toute défense possible contre l’invocation peut être lancée et l’END utilisé par cette compétence ne peut être abaissé par aucun moyen (ex: Focus).",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-contre-toute-attente",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Brigand",
    "name": "Contre toute attente (RÉF)",
    "attribute": "RÉF",
    "description": "Dans les situations de combat, chaque fois qu'il y a plus d'ennemis que de personnes dans le groupe du Hors-la-loi (y compris lui-même), un Hors-la-loi peut lancer Contre toute attente contre un SD égal au nombre d'ennemis en plus x3 pour gagner un bonus égal au nombre d’ennemie pour toutes les actions défensives lors de cette rencontre (max. 4).",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-akimbo",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Brigand",
    "name": "Akimbo (DEX)",
    "attribute": "DEX",
    "description": "Un Hors-la-loi peut effectuer une attaque conjointe en utilisant deux arbalètes à une main et un jet d’Akimbo. La cible doit se défendre a -3 deux fois. Si l'adversaire n’arrive pas à se défendre une ou deux fois, les dégâts de l'arbalète(s) sont appliqués (comme deux attaques distinctes). Avant le jet, le hors-la-loi doit clarifier quelle arbalète a tiré en premier et second. Un tiers du rang d'Akimbo (min. 1) peut également être ajouté à la valeur d'attaque lors d'attaques conjointes avec des armes de combat rapproché.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-aguerri",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Brigand",
    "name": "Aguerri (COR)",
    "attribute": "COR",
    "description": "Lorsqu'il subit une blessure critique, un Hors-la-loi peut lancer Aguerri contre le SD Mains thérapeutiques à la complexité de la blessure afin d’ignorer les pénalités de cette blessure pendant un nombre de tours égal au rang d’Aguerri. Une fois le temps épuisé, le Hors-la-loi peut lancer à nouveau Aguerri mais le SD est augmenté de 2 pour chaque test réussi. Les pénalités d'une blessure critique mortelle ne peuvent être ignorées.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-lien",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Paria",
    "name": "Lien",
    "description": "Un hors-la-loi construit un Lien profond avec ses compagnons animaux. Ce Lien se manifeste dans la loyauté et même les compétences des animaux du hors-la-loi. Le horsla-loi peut choisir n'importe quelle animal apprivoisé qui ont été avec le Hors-la-loi pendant au moins une semaine pour être son compagnon, mais s'il le perd ou si l'animal meurt, le Hors-la-loi subira un malus de -1 à chaque test de compétence pendant une durée de 1d10 jours.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-routine-habituelle",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Paria",
    "name": "Routine habituelle (VOL)",
    "attribute": "VOL",
    "description": "Lorsqu'il éviscère des animaux ou des monstres, un hors-la-loi peut lancer Routine habituelle contre le CORx3 de la cible pour doubler le résultat en fonction des trophées et des matériaux. Cela ne fonctionne tant que c'est logiquement possible (vous ne pouvez pas gagner deux cœurs avec un loup). Routine habituelle peut également être utilisée contre un SD de recherche lors de la recherche d'un matériau spécifique pour augmenter le nombre d'unités trouvées de 50%.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-coexistence",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Paria",
    "name": "Coexistence (VOL)",
    "attribute": "VOL",
    "description": "Lorsqu'il rencontre un groupe d'animaux ou de monstres agressifs, un hors-la-loi peut lancer Coexistence à un SD égal au SD de connaissances de sorceleur des monstres dans le bestiaire. En cas de succès, le monstre ou le groupe de monstres cesse d'être agressif envers le Hors-la-loi et un nombre de personnes de son groupe égal à la moitié du rang de compétence. Si quelqu'un commence à agir de manière agressive envers le monstre ou à se rapprocher de lui à moins de 5 m, le monstre commencera à l'attaquer.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-aiguisage",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Homme de main",
    "name": "Aiguisage (TEC)",
    "attribute": "TEC",
    "description": "Contre un SD: 15 un Hors-la-loi peut prendre une heure pour aiguiser les têtes de jusqu'à 10 pièces de munitions standards en utilisant Aiguisage. En cas de succès, le Hors-la-loi gagne un nombre de munitions aiguisées égal au nombre de munitions standard aiguisés. Un échec entraîne la destruction de munitions égale à la valeur de l’échec (max. munitions utilisées).",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-ameliorer",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Homme de main",
    "name": "Améliorer (TEC)",
    "attribute": "TEC",
    "description": "Un Hors-la-loi peut utiliser une unité de cinquième essence et lancer Améliorer contre le SD de fabrication d’une arme ou une armure pour lui ajouter un emplacement d'amélioration. Un échec fait que l'objet subit des dégâts égaux à la valeur du jet. Un objet ne peut gagner qu'un seul emplacement d'amélioration en utilisant Améliorer et l'unité de cinquième essence est utilisée, que le Hors-la-loi ait réussi ou non.",
    "isCoreProfession": false
  },
  {
    "id": "tl-outlaw-improviser",
    "professionId": "outlaw",
    "profession": {
      "en": "Outlaw",
      "fr": "Hors-la-loi"
    },
    "branch": "Homme de main",
    "name": "Improviser (TEC)",
    "attribute": "TEC",
    "description": "Vivant en dehors de la société, planifiant et survivant, le Hors-la-loi a appris quelques trucs. Un hors-laloi peut prendre une heure pour lancer Improviser et regarder sur la table Improviser pour créer une alternative de secours pour les situations difficiles. Pour obtenir l’effet, le Hors-la-loi a également dû utiliser le matériel répertorié. Chaque élément construit de cette façon pèse 0,5.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-agilite",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Conquérant",
    "name": "Agilité (Réf)",
    "description": "Après une attaque réussie basée sur REF, un nomade peut lancer un jet d'Agilité contre le jet de défense initial de l'adversaire. En cas de succès, le nomade peut se déplacer d'un nombre de mètres égal au montant roulé sur le SD (max. la moitié VIT du nomade). Le SD est augmenté de 1 pour chaque pièce d'armure que porte le nomade.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-coupures-profondes",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Conquérant",
    "name": "Coupures profondes",
    "description": "Lors d’un combat rapproché, un nomade peut ajouter sa valeur de Coupures profondes aux dégâts critiques de toute blessure infligée. Ce bonus est diminué de 2 pour chaque pièce d'armure que porte le nomade. Après avoir infligé une blessure critique en combat rapproché, le nomade peut également dépenser un certain nombre de points de Détermination (max. un tiers du rang Coupures profondes) pour augmenter les dégâts critiques de 3 par point dépensé.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-toujours-pret",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Conquérant",
    "name": "Toujours prêt (Réf)",
    "description": "Après une attaque réussie basée sur REF, un nomade peut lancer Toujours prêt contre la VIT x3 de l’adversaire attaqué pour gagner un bonus de +1 cumulatif aux attaques basées sur REF (max. moitié rang Toujours prêt) jusqu'à la fin du combat. La limite de bonus est réduite de 1 pour chaque pièce d'armure que porte le nomade.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-action-d-initiative",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Chef de tribu",
    "name": "Action d'Initiative (Emp)",
    "description": "En tant que première action d'un combat et en dépensant 1 point de Détermination, un nomade peut lancer Action d'Initiative contre un SD: 16 pour augmenter l'Initiative de chaque membre du groupe du nomade (à l'exclusion de lui-même) de 1d6 pendant la durée du combat.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-cris-de-guerre",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Chef de tribu",
    "name": "Cris de guerre (Vol)",
    "description": "Les nomades ont perfectionné leur capacité à démoraliser les ennemis. Un nomade peut lancer Cris de guerre pour infliger -1d6 à l'Initiative et un malus égal au tiers du rang de Cris de guerre à toutes les actions offensives de tous les ennemis à moins de 15m qui échouent à un test de Courage contre votre jet de Cris de guerre. Ces négatifs ne s’additionnent pas et durent jusqu'à la fin du prochain tour de l'ennemi.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-provocation",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Chef de tribu",
    "name": "Provocation (Emp)",
    "description": "Un nomade peut lancer Provocation contre un ou plusieurs ennemis (Résistance à la contrainte) pour les forcer à vous attaquer durant leur tour avec l'arme équipée. Pour chaque ennemi que vous voulez provoquer en plus du premier, soustrayez 1 de votre jet. Si vous n'êtes pas à portée pour que ces ennemis puissent vous attaquer, ils attaqueront quelqu'un d'autre. Pour chaque attaque défendue avant le début de votre prochain tour, vous gagnez +1 à votre première action d'attaque au tour suivant jusqu'à un maximum de la moitié de votre rang de Provocation.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-habitude",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Tirailleur",
    "name": "Habitude",
    "description": "Chaque fois que vous utilisez des armes à distance à cheval, votre portée est augmentée de 5% pour chaque rang dans Habitudes. De plus, tant que vous attaquez des cibles à moins de la moitié de votre rang d'Habitudes en mètres à cheval, vous utilisez le SD et le Mod de cible pour la portée à bout portant.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-volonte-de-tuer",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Tirailleur",
    "name": "Volonté de tuer (Dex)",
    "description": "À cheval, en dépensant 1 point de Détermination et en lançant Volonté de tuer, un nomade peut utiliser cette compétence comme une action offensive. Il choisit soit de tirer deux flèches comme s'il s'agissait d'une Frappe rapide dans laquelle les deux flèches peuvent être ciblées et peuvent frapper différents adversaires (dans ce cas, lancez pour chacun des coups) ou de tirer une flèche comme s'il s'agissait d'une Frappe puissante sans le malus. Le tir puissant repousse également votre cible de 1d6 mètres et la fait tomber à terre.",
    "isCoreProfession": false
  },
  {
    "id": "tl-nomad-salve",
    "professionId": "nomad",
    "profession": {
      "en": "Nomad",
      "fr": "Nomade"
    },
    "branch": "Tirailleur",
    "name": "Salve (Dex)",
    "description": "À cheval en utilisant jusqu'à 5 munitions et en faisant un jet de Salve, un nomade peut tirer une multitude de flèches sur un point d'un rayon égal à un tiers du rang Salve en mètres pour atteindre jusqu'à 5 cibles. Toute personne dans ce rayon qui n'est pas capable de réussir une défense d'Athlétisme pour sortir de la zone est touchée à un endroit aléatoire. Cette compétence a sa propre table de localisation. S'il y a plus de 5 cibles possibles dans la zone ciblée, c'est au MJ de décider qui est touchée.",
    "isCoreProfession": false
  }
];
