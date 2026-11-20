import type { MagicEntry } from './types';

/**
 * Fan-made & unofficial Witcher TRPG spells, invocations, rituals, and hexes (60 entries).
 */
export const SPELLS_UNOFFICIAL_DATA: readonly MagicEntry[] = [
  {
    "id": "sp-fm-foreign-visage",
    "name": {
      "en": "Foreign Visage",
      "fr": "Apparence étrangère"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "Soi-même",
    "duration": "1d6/2 heures",
    "defense": "Aucune",
    "effect": "Apparence étrangère vous permet de prendre l'apparence de quelqu'un d'autre. Cet effet n'est qu'illusoire et vous toucher révélera immédiatement le caractère non substantiel de l'effet. Vous pouvez prendre n'importe quelle forme humanoïde à environ 0,5 m de votre taille et à environ 25 kg de votre poids. Si vous vous faites passer pour une personne réelle, votre jet d’Incantation agit comme un jet de Déguisement."
  },
  {
    "id": "sp-fm-memory-lapse",
    "name": {
      "en": "Memory Lapse",
      "fr": "Perte de mémoire"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "1m",
    "duration": "1d6 heures",
    "defense": "Résistance à la Magie, Déduction",
    "effect": "Ce sort supprime un souvenir de l’esprit de la cible. Ce sort n'accorde aucun aperçu de l'esprit de la cible, donc le souvenir doit être celui dont vous savez qu'il existe ou être celui d'un événement dont vous avez personnellement été témoin. Si la cible se voit présenter quelque chose de contradictoire avec la mémoire manquante, elle peut effectuer un jet de Déduction pour remarquer quelque chose qui ne va pas, avec un bonus basé sur la gravité (à la discrétion du MJ). Le sort supprime un bref souvenir, qui ne vaut que quelques minutes; qui est retrouvé après quelquesheures."
  },
  {
    "id": "sp-fm-llygaid-nos",
    "name": {
      "en": "Llygaid Nos",
      "fr": "Llygaid Nos"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "Rayon 3m",
    "duration": "Actif (2 END)",
    "defense": "Résistance à la Magie",
    "effect": "Llygaid Nos canalise une petite quantité d'énergie de chaque élément, vous accordant des sens surnaturels. Ce sort vous permet de «voir» le son, la chaleur et les vibrations dans une petite zone autour de vous, vous permettant de fonctionner normalement dans l'obscurité totale. Tout ce qui se trouve en dehors de cette zone reste obscurci pour vous, mais si vous touchez une fine barrière ou un support (par exemple un mur en bois, une fenêtre ou tout autre élément sur une petite étendue d'eau), vous pouvez avoir une idée approximative de ce qui se trouve sur ou au-delà. Les sens qui vous sont accordés par ce sort sont très rudimentaires, rendant impossible les détails fins."
  },
  {
    "id": "sp-fm-foreign-memory",
    "name": {
      "en": "Foreign Memory",
      "fr": "Mémoire étrangère"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "2m",
    "duration": "Immédiate",
    "defense": "Résistance à la Magie, Déduction",
    "effect": "Mémoire étrangère vous permet d'ajouter un court souvenir à l'esprit d'une cible. Des souvenirs particulièrement farfelus permettent à la cible de faire un test de Déduction en plus de la Résistance à la Magie, avec un bonus basé sur l'improbabilité de ces souvenirs. Les souvenirs ajoutés de cette manière ne peuvent pas durer plus de 5 minutes environ, mais peuvent s'être «produits» à n'importe quel moment dans le passé. Avec le temps, le sujet peut éventuellement remarquer ces faux souvenirs, mais ils durent comme n'importe quel autre souvenir"
  },
  {
    "id": "sp-fm-cam-syth",
    "name": {
      "en": "Cam Syth",
      "fr": "Cam Syth"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "2m",
    "duration": "Immédiate",
    "defense": "Résistance à la Magie",
    "effect": "Cam Syth téléporte instantanément une cible vers un autre endroit que vous pouvez voir, à condition que le point de référence soit un objet solide (une cible ne peut pas être déplacée dans le vide). Cibler le sort demande de la finesse et peut aller très mal; cela nécessite un test d’Incantation à SD: 16. Si vous échouez à ce jet, la destination de la cible est déterminée en utilisant les règles de dispersion dans le chapitre de combat, avec un -1 sur le test pour tous les 50 m de portée. Si cela se traduit par l'apparition de la cible dans un objet solide tel qu'un mur, alors elle subit 1d6 dégâts par point d’échec critique, sans résistance d'armure; si la cible dans ce cas est un objet, il est détruit.  Un objet transporté est défendu par un jet de Résistance à la magie de son propriétaire."
  },
  {
    "id": "sp-fm-veddahs-charge",
    "name": {
      "en": "Veddah’s Charge",
      "fr": "Charge de Veddah"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "2m",
    "duration": "Immédiate",
    "defense": "Aucune, Incantation",
    "effect": "Charge de Veddah ouvre un canal, tirant de l'énergie du Chaos primordial et injectant plus de puissance dans un sort qui est déjà en vigueur. Ce sort ne peut être utilisé que sur un sort existant. Si le sort ciblé a été lancé par un mage différent, il résiste par son test d’Incantation. Charge de Veddah permet au sort ciblé de relancer sa durée et de l'ajouter à son temps restant. Flux de puissance peut être lancé lorsqu'un autre sort est maintenu et si un sort ciblé par la Charge de Veddah a une durée d'Active, alors il dure 1d6 tours tout seul. Un sort ne peut être affecté par Charge de Veddah qu'une seule fois."
  },
  {
    "id": "sp-fm-don-feddwl",
    "name": {
      "en": "Don Feddwl",
      "fr": "Don Feddwl"
    },
    "schoolId": "mixed",
    "school": {
      "en": "Mixed Elements",
      "fr": "Éléments mixtes"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "20",
    "range": "Rayon 20m",
    "duration": "Actif (6 END)",
    "defense": "Résistance à la Magie",
    "effect": "Don Feddwl vous permet d'entendre toutes les pensées et émotions de ceux qui vous entourent sous forme de doux chuchotements et de couleurs. Les émotions sont plus simples et vous pouvez facilement discerner entre les individus et ce qu’ils ressentent. Cependant, plusieurs pensées peuvent vous submerger et un jet de Déduction peut être nécessaire pour identifier des pensées spécifiques dans une foule."
  },
  {
    "id": "sp-fm-dal-gafael",
    "name": {
      "en": "Dal Gafael",
      "fr": "Dal Gafael"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "2m",
    "duration": "1d6 tours | Actif (2 END)",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Dal Gafael lie la cible avec des chaînes en terre et en pierre. Cela attrape la cible, en utilisant votre Incantation au lieu de Bagarre. S'il est maintenu, ce sort peut ensuite être utilisé pour épingler la cible, à condition qu'elle ne réussisse pas son test de Bagarre opposé."
  },
  {
    "id": "sp-fm-symud-pridd",
    "name": {
      "en": "Symud Pridd",
      "fr": "Symud Pridd"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "10m",
    "duration": "2d10 tours",
    "defense": "Athlétisme",
    "effect": "Symud Pridd déplace et adoucit la terre au sol dans une petite zone. Cela crée un rayon de 2 m de terrain difficile, provoquant un -2 aux tests d'esquive / évasion et d'athlétisme. Quiconque tombe à plat ventre dans ce domaine doit prendre un tour complet pour se lever, plutôt qu'un simple mouvement."
  },
  {
    "id": "sp-fm-elgans-etching",
    "name": {
      "en": "Elgan’s Etching",
      "fr": "Gravure d’Elgan"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "8m",
    "duration": "Immédiate",
    "defense": "Résistance à la Magie",
    "effect": "Gravure d'Elgan vous permet de sculpter instantanément n'importe quel motif, message ou symbole dans une pierre ou un objet en métal. Ce sort peut affecter une zone de 2m sur 2m et peut sculpter tout ce que le lanceur de sorts choisit. Alternativement, ce sort peut être ciblé sur un équipement pour lui infliger 1d6 dégâts d'ablation."
  },
  {
    "id": "sp-fm-meddalu",
    "name": {
      "en": "Meddalu",
      "fr": "Meddalu"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "2m",
    "duration": "Actif (4 END)",
    "defense": "Aucune, Résistance à la Magie",
    "effect": "Meddalu adoucit la pierre et la terre, lui permettant d'être moulée, façonnée et déplacée si nécessaire. Ce sort affecte un volume de 3m de pierre ou de terre, y compris la pierre taillé ou les structures artificielles. Le PA de la pierre tombe à 7 (l'équivalent d'un toit de chaume) et peut être poussé, tiré et moulé à la main sans difficulté. Si elle est maintenue pendant 5 tours, la pierre affectée commencera à tomber naturellement, sous la forme d'un fluide épais. Ce sort peut également être utilisé sur les armes et armures métalliques, affectant tout ce qui est porté par une cible et lui fait subir 1d6 dégâts d’ablation à chaque frappe reçue (ou infligée dans le cas des armes)."
  },
  {
    "id": "sp-fm-kragas-carapace",
    "name": {
      "en": "Kraga’s Carapace",
      "fr": "Carapace de Kraga"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "9",
    "range": "Soi-même",
    "duration": "2d10 tours",
    "defense": "Aucune",
    "effect": "Ce sort vous enveloppe d'une coquille de pierre solide grossièrement articulée. Carapace de Kraga vous confère un bonus de PA égal au nombre de points roulé au-dessus de SD : 15 lors du test d’Incantation. La nature lourde de cette armure signifie que le lanceur a +3 EV pour la durée et divise par deux sa vitesse."
  },
  {
    "id": "sp-fm-elgans-rebuttal",
    "name": {
      "en": "Elgan’s Rebuttal",
      "fr": "La riposte d’Elgan"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "Rayon 2m",
    "duration": "Immédiate",
    "defense": "Résistance à la Magie, Compétence d’Arme",
    "effect": "Un autre sort du talentueux Elgan de Verden, La riposte d'Elgan envoie une onde magnétique vers l’extérieur, repoussant tous les objets métalliques dans la zone touchée. Toutes les cibles dans le rayon peuvent faire un test de compétence d'arme contre votre Incantation ou devenir désarmées. Les armes et les objets métalliques sans surveillance désarmés de cette manière sont projetés en arrière de 3d6 mètres et toutes les cibles portant principalement une armure métallique, ou celles qui ont réussi leur test de compétence d'arme, sont repoussées de 5 m vers l'arrière. Les armes lancées de cette manière peuvent faire des dégâts si elles frappent des cibles, à la discrétion du MJ. Si une cible poussée touche un obstacle, elle subit des dégâts de frappe."
  },
  {
    "id": "sp-fm-obelisk",
    "name": {
      "en": "Obelisk",
      "fr": "Obélisque"
    },
    "schoolId": "earth",
    "school": {
      "en": "Earth",
      "fr": "Terre"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "Soi-même",
    "duration": "Permanent",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Ce sort tire un énorme pilier de pierre du sol autour de vous. Cette structure géante peut mesurer jusqu'à 50 m de haut et 200 m de diamètre, avec des cavernes et des tunnels tout au long de la direction. Toute personne prise dans ce processus sera assommée et frappée par la chute de débris et le déplacement de la terre, infligeant 5d6 dégâts. En fonction de la conception de l'obélisque, ils peuvent également tomber sur une distance significative, subissant des dommages par éperonnage le cas échéant. Ce sort est susceptible de détruire presque toutes les structures dans lesquelles il est lancé."
  },
  {
    "id": "sp-fm-silent-echo",
    "name": {
      "en": "Silent Echo",
      "fr": "Écho silencieux"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "Soi-même",
    "duration": "Actif (2 END)",
    "defense": "Aucune",
    "effect": "Écho silencieux étouffe le son dans une petite zone autour de vous. Toute personne dans un rayon de 2m peut entendre normalement mais aucun son ne pénètre dans le périmètre, dans les deux sens."
  },
  {
    "id": "sp-fm-merthyr",
    "name": {
      "en": "Merthyr",
      "fr": "Merthyr"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "Soi-même",
    "duration": "Actif (2 END)",
    "defense": "Aucune",
    "effect": "Merthyr fait scintiller et brouiller l'air autour de vous, ce qui vous rend légèrement plus difficile à repérer. Cela inflige une pénalité de -2 aux tests de Vigilance et d'attaque à distance contre quiconque se trouve dans un rayon de 2m du lanceur."
  },
  {
    "id": "sp-fm-stray-whisper",
    "name": {
      "en": "Stray Whisper",
      "fr": "Murmure égaré"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "10m",
    "duration": "2d10 tours | Actif (2 END)",
    "defense": "Résistance à la Magie, Déduction",
    "effect": "Murmure égaré crée des bruits illusoires à distance. Vous pouvez produire n'importe quel son que vous souhaitez émanant d'un point à portée. Ce son peut suivre un modèle naturel s'il est laissé à la durée (par exemple, les pas, les aboiements du chien) ou peut être contrôlé pour produire des bruits complexes s'il est maintenu (comme la parole)."
  },
  {
    "id": "sp-fm-hawyr-naid",
    "name": {
      "en": "Hawyr Naid",
      "fr": "Hawyr Naid"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "8",
    "range": "2m",
    "duration": "Immédiate | Actif (4 END)",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Hawyr Naid lance la cible dans le ciel, la tenant en l'air si elle est maintenue. Vous pouvez contrôler ce mouvement vers le haut pour faire un arc vers l'avant (ou de chaque côté) d'un nombre de mètres égal à la moitié de la hauteur. Si elle est maintenue, une cible restera en l'air et peut dériver lentement de 1 m par tour dans la direction de votre choix. À la fin du sort, vous pouvez choisir d'abaisser rapidement mais doucement la cible ou simplement de la laisser tomber, infligeant des dégâts de frappe. La hauteur à laquelle ce sort peut soulever une cible est égale au double du nombre de points obtenus au-dessus de son test de défense (ou 10 si vous vous ciblez). Ce total est également le nombre de corps que le sort peut soulever s'il cible une autre créature (vous pouvez toujours vous élever)."
  },
  {
    "id": "sp-fm-daranu",
    "name": {
      "en": "Daranu",
      "fr": "Daranu"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "10",
    "range": "10m",
    "duration": "Immédiate",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Daranu détruit instantanément une petite sphère d'air, provoquant un coup de tonnerre incroyablement fort. Quiconque se trouve dans un rayon de 2 m de l'effet effectue un test de Résilience contre le test d’Incantation ou devient assourdi et est mis à terre. Les cibles doivent également effectuer un jet de Sauvegarde à -1 tous les 5 points roulé au-dessus de leur défense."
  },
  {
    "id": "sp-fm-miasma",
    "name": {
      "en": "Miasma",
      "fr": "Miasme"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "10m",
    "duration": "Immédiate",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Ce sort crée un nuage nocif de vapeurs jaune-vert dans la zone ciblée. Toute personne prise dans un rayon de 10 m doit faire un test de Résilience contre votre jet d’Incantation ou souffrir de nausées. Ces vapeurs sont également inflammables et toute flamme dans la zone fera exploser le nuage entier, infligeant 3d6 dégâts avec 25% d’enflammer la cible."
  },
  {
    "id": "sp-fm-amser-eira",
    "name": {
      "en": "Amser Eira",
      "fr": "Amser Eira"
    },
    "schoolId": "air",
    "school": {
      "en": "Air",
      "fr": "Air"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "25",
    "range": "Rayon 30m",
    "duration": "Actif (6 END)",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Amser Eira déclenche un blizzard soudain et terrible. Ce phénomène météorologique provoque des conditions presque blanches en quelques minutes, entraînant une pénalité de -3 aux tests de Vigilance, Attaque et Défense dans la zone. Cette tempête crée également un niveau surnaturel de froid, provoquant des conditions de neige et de glace et réduit de moitié le END chez les créatures sans source de chaleur. Vous pouvez désigner un nombre de cibles immunisées contre ces effets égal à la moitié de votre compétence d’Incantation."
  },
  {
    "id": "sp-fm-blackened-wind",
    "name": {
      "en": "Blackened Wind",
      "fr": "Vent noirci"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "Cône 3m",
    "duration": "Immédiate",
    "defense": "Esquive, Résistance à la magie",
    "effect": "Vent noirci évacue un torrent de fumée cendrée vers l'avant dans un cône. Cette fumée fait que les cibles dans le cône qui échouent à leur test de défense commencent à tousser et à vomir, les décalant pendant 1d6 tours et provoquant des nausées. Les vapeurs chaudes repoussent également les cibles de 2m."
  },
  {
    "id": "sp-fm-scattered-blast",
    "name": {
      "en": "Scattered Blast",
      "fr": "Explosion dispersée"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "Rayon 2m",
    "duration": "Immédiate",
    "defense": "Esquive, Blocage (bouclier), Résistance à la magie",
    "effect": "Ce sort provoque une explosion soudaine d'étincelles, de fumée et d'air chaud autour de vous. Explosion dispersée cause 2d6 dégâts, à 25% d’enflammer la cible et de la renverser."
  },
  {
    "id": "sp-fm-anwedd-trwm",
    "name": {
      "en": "Anwedd Trwm",
      "fr": "Anwedd Trwm"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "10m",
    "duration": "1d10 tours",
    "defense": "Aucune",
    "effect": "Anwedd Trwm fait qu'un feu existant s'assombrit et crache un volume artificiel de fumée épaisse et noire. Ce sort cible soit un feu existant, soit une créature avec la condition en feu. Dans les deux cas, une épaisse fumée obscurcissante se répand dans une zone de 10m, infligeant une pénalité de -3 aux attaques et aux jets de Vigilance dans la zone. Si vous ciblez une créature en feu, cela la fait souffrir de nausées, mais éteint les flammes."
  },
  {
    "id": "sp-fm-rhwystr-tan",
    "name": {
      "en": "Rhwystr Tân",
      "fr": "Rhwystr Tân"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "20m",
    "duration": "3d10 tours",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Ce sort crée un mur de 2m sur 6m de flammes chauffées à blanc. Tout ce qui se trouve à côté du mur subit 2d6 dégâts par tours avec 25% de chances d'être incendié. Tout ce qui traverse le mur est immédiatement incendié et subit 5d6 dégâts."
  },
  {
    "id": "sp-fm-corff-cartref",
    "name": {
      "en": "Corff Cartref",
      "fr": "Corff Cartref"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "10m",
    "duration": "2d10 tours",
    "defense": "Résistance à la Magie",
    "effect": "Corff Cartref oblige la peau de la cible à assumer la lueur terne du métal chauffé, les rendant ainsi que leur équipement immunisé contre les flammes. Ce sort accorde non seulement une immunité au feu, mais a également 50% de chances de mettre le feu à tout ce qui touche la cible (à l'exception de son propre équipement). Si elle est ciblée par un sort de feu ou une invocation, la magie hostile doit battre votre jet d’Incantation pour avoir un effet."
  },
  {
    "id": "sp-fm-tholas-beacon",
    "name": {
      "en": "Thola’s Blinding Beacon",
      "fr": "Balise aveuglante de Thola"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "13",
    "range": "Cône 10m",
    "duration": "Actif (4 END)",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Développé par un mage elfique entreprenant, ce sort fait briller violemment un cône de lumière incroyablement brillant de votre main tendue. Toute personne faisant face à la lumière doit faire un test de Résilience contre votre jet d’Incantation ou être rendue aveugle pendant la durée. Ce faisceau peut être maintenu et «balayé», ciblant plusieurs créatures. Toute personne dans le cône pendant plus d'un tour a 25% de chances d'être incendiée, ce qui augmente de 25% pour chaque tour qu'elle passe dans le cône."
  },
  {
    "id": "sp-fm-dal-yr-haul",
    "name": {
      "en": "Dal yr Haul",
      "fr": "Dal yr Haul"
    },
    "schoolId": "fire",
    "school": {
      "en": "Fire",
      "fr": "Feu"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "Cône 6m",
    "duration": "Actif (6 END)",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Ce sort étrange attire la lumière d'une large zone et l'absorbe dans votre concentration, créant une zone d'obscurité totale. Dal yr Haul provoque l'obscurité dans un rayon de 40 m autour de vous, capturant toute la lumière. À tout moment après avoir lancé ce sort, vous pouvez arrêter de maintenir pour libérer une explosion concentrée de lumière et de chaleur, infligeant 5d6 points de dégâts avec 50% de chances d'aveugler les cibles et de les incendier. Ce sort est moins efficace dans les zones de faible luminosité, réduisant de moitié les dégâts et les chances d'effets de statut; il ne fonctionne pas du tout dans les zones sans lumière à absorber."
  },
  {
    "id": "sp-fm-dowser",
    "name": {
      "en": "Dowser",
      "fr": "Sourcier"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "Soi-même",
    "duration": "Actif (2 END)",
    "defense": "Aucune",
    "effect": "Sourcier vous permet de localiser un liquide spécifique à portée de voix. Ce sort fait qu'un liquide défini (sang, vin, whisky, spiritueux, potions spécifiques) produit un carillon sifflant que vous seul pouvez entendre; cela vous permet d'identifier progressivement la source et de la localiser."
  },
  {
    "id": "sp-fm-pel-grym",
    "name": {
      "en": "Pêl Grym",
      "fr": "Pêl Grym"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "12m",
    "duration": "Immédiate",
    "defense": "Esquive, Blocage, Résistance à la magie",
    "effect": "Pêl Grym forme une boule d'eau et la jette sur une cible. Ce sort inflige 4d6 dégâts non mortels et renverse la cible. La cible doit également faire un test d'athlétisme SD: 15 ou laisser tomber tout objet retenu lorsque la boule d’eau la heurte."
  },
  {
    "id": "sp-fm-dwr-du",
    "name": {
      "en": "Dwr Du",
      "fr": "Dwr Du"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "Soi-même",
    "duration": "1d10 tours",
    "defense": "Résilience",
    "effect": "Vous incantez ce sort puis crachez, transformant votre salive en un poison visqueux. Dwr Du transforme la salive banale en un poison collant. Si cela est ingéré ou est appliqué sur une arme qui blesse une cible, ils sont empoisonnés. Le liquide s'évaporera à la fin du sort, mais la condition empoisonnée reste normale."
  },
  {
    "id": "sp-fm-rhwystr-ia",
    "name": {
      "en": "Rhwystr Iâ",
      "fr": "Rhwystr Iâ"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "20m",
    "duration": "Jusqu'à ce qu'il fonde ou soit détruit",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Rhwystr Iâ crée un mur de glace de 2 m sur 3 m avec 15 PA. Quiconque touche le mur est immédiatement submergé par le gel, ce qui provoque 25% de gelé. Toute cible partageant l'espace du mur lors de sa création (et échoue au test d'Esquive) est piégée à l'intérieur et subit 2d6 dégâts à leur END par tours; ils sont également gelés et immobilisés jusqu'à ce qu'ils réussissent un test Physique contre votre jet d’Incantation."
  },
  {
    "id": "sp-fm-ichor-minds-eye",
    "name": {
      "en": "Ichor of the Mind’s Eye",
      "fr": "Ichor des yeux de l’esprit"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "10m",
    "duration": "1d10 tours",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Développé par un alchimiste renommé, ce sort serpentant un fluide arc-en-ciel huileux sur une cible. Cette brume provoque des hallucinations soudaines et dramatiques à la cible et la rend intoxiquée lors du contact avec la peau."
  },
  {
    "id": "sp-fm-glaw-troellog",
    "name": {
      "en": "Glaw Troellog",
      "fr": "Glaw Troellog"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "13",
    "range": "Rayon 10m",
    "duration": "Actif (4 END)",
    "defense": "Esquive, Résistance à la Magie",
    "effect": "Glaw Troellog crée une sphère d'eau planante de 2 m de rayon qui enveloppe les cibles en son sein. Cette sphère peut être dirigée pour se déplacer d'un nombre de mètres égal à la valeur de votre compétence d’Incantation par tour mais s'effondrera si elle est déplacée au-delà de la portée du sort. Toutes les cibles capturées dans la sphère sont considérées comme épinglées et sont emportées avec elle. À chaque tour, ils doivent faire un test d'Athlétisme pour échapper à l'orbe (contre votre jet d’Incantation) ou souffrir d'étouffement. La sphère peut contenir environ 5 cibles de taille humaine à la fois. La sphère peut être percutée contre une surface, la détruisant et causant des dommages par éperonnage à la END de la cible qui sont piégés au point d’impact."
  },
  {
    "id": "sp-fm-hemorrhage",
    "name": {
      "en": "Hemorrhage",
      "fr": "Hémorragie"
    },
    "schoolId": "water",
    "school": {
      "en": "Water",
      "fr": "Eau"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "22",
    "range": "Rayon 10m",
    "duration": "Actif (6 END)",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Ce sort terrifiant exerce une traction de sang sur les corps des ennemis autour de vous. Toutes les cibles que vous désignez dans la zone doivent effectuer un test de Résilience par rapport à votre jet d’Incantation ou commencer immédiatement à saigner. Si vous maintenez ce sort, vous pouvez retirer les viscères de vos adversaires plus rapidement, les faisant saigner pour 5 points de dégâts par tours au lieu de 2 et les forçant à devenir atterré."
  },
  {
    "id": "sp-fm-spirit-of-beast",
    "name": {
      "en": "Spirit of the Beast",
      "fr": "Esprit de la bête"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5m",
    "duration": "Actif (1 END)",
    "defense": "Résistance à la magie",
    "effect": "Esprit de la bête vous permet de voir, d'entendre, de toucher et de sentir à travers les sens d'une bête que vous ciblez. Lorsqu'il est actif, vous pouvez utiliser les tests de Volonté + Survie pour «pousser» doucement une créature vers une certaine action (se déplacer dans une certaine direction, fuir, etc.), mais vous n'avez pas de contrôle précis. Votre corps est complètement aveugle, sourd et engourdi lorsque vous utilisez ce sort."
  },
  {
    "id": "sp-fm-call-dead-branch",
    "name": {
      "en": "Call the Dead Branch",
      "fr": "Appelez la branche morte"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5m",
    "duration": "Immédiate",
    "defense": "Résistance à la magie",
    "effect": "Cette invocation réveille le bois mort à la vie. Tout petit objet en bois, partie d'arme ou petit élément structurel (cadre de porte ou supports de fenêtre, par exemple) que vous ciblez commence à se tordre, à germer et à grandir rapidement. Les armes déformées de cette manière subissent 1d6 dégâts d'ablation et subissent un malus de -2 sur les attaques jusqu'à ce qu'elles soient réparées. Les objets et pièces structurelles sont déformés et rendus inutiles ou endommagés, à la discrétion du MJ."
  },
  {
    "id": "sp-fm-wooden-teeth",
    "name": {
      "en": "Wooden Teeth",
      "fr": "Dents en bois"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "2m",
    "duration": "Jusqu'à endommagement",
    "defense": "Aucune",
    "effect": "Dents en bois fait germer de longues épines acérées à partir d'un bâton ou d'un club en bois, ou du manche d'une lance, d'une flèche ou d'un boulon. L'objet affecté par cette invocation inflige +2 dégâts et a 25% de chances de provoquer un saignement. Lors d'un échec critique utilisant l'arme, elle a 25% de chances de provoquer une hémorragie au porteur."
  },
  {
    "id": "sp-fm-trackless-path",
    "name": {
      "en": "Trackless Path",
      "fr": "Sentier sans trace"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "Variable",
    "range": "Rayon 2m",
    "duration": "1d6 heures",
    "defense": "Aucune",
    "effect": "Sentier sans trace restaure le sol et les plantes autour des cibles; cette invocation supprime également l'odeur de chaque cible pour la durée. Un test de survie doit être effectué pour suivre toute personne affectée par Sentier sans trace avec une pénalité de -6, les cibles gagnent également +2 aux jets de discrétion en terrain planté. Les créatures qui ont la capacité de suivi des odeurs ne peuvent pas non plus l'utiliser sur les cibles affectées par cette invocation. Sentier sans trace coûte 1 point d'endurance pour chaque personne dans le rayon ciblé."
  },
  {
    "id": "sp-fm-silent-howl",
    "name": {
      "en": "Silent Howl",
      "fr": "Hurlement silencieux"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "Variable",
    "range": "Spécial",
    "duration": "Immédiate",
    "defense": "VOL x3 de la créature",
    "effect": "Cette invocation invoque des bêtes spécifiques. Le coût d'Hurlement silencieux dépend de la VOLONTÉ la plus élevée parmi les créatures que vous souhaitez invoquer, et le nombre appelé de cette façon dépend de l'animal - les créatures solitaires apparaîtront seules alors que les créatures sociales apparaîtront dans un groupe (vous pouvez toujours choisir d’invoquer un seul individu). Hurlement silencieux atteint un nombre de km égal au double de la valeur de votre compétence d’incantation et les créatures se déplaceront aussi vite que possible vers vous, prenant entre plusieurs minutes et quelques heures pour vous atteindre, selon la créature ciblée et l'environnement. Les créatures invoquées de cette manière ne seront pas hostiles envers vous mais ne seront pas obligées de suivre vos instructions."
  },
  {
    "id": "sp-fm-seething-swarm",
    "name": {
      "en": "Seething Swarm",
      "fr": "Essaim bouillonnant"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "Variable",
    "range": "8m",
    "duration": "2d10 tours, Actif (3 END)",
    "defense": "Esquive",
    "effect": "Essaim bouillonnant appelle un essaim d'insectes piqueurs qui attaquent les cibles dans un rayon de 2 m. Si vous dépensez 4 points d'endurance pour cette invocation, les créatures sont distrayantes et douloureuses, mais autrement inoffensives, ce qui fait que les cibles de la zone deviennent stupéfaites. Si vous dépensez à la place 6 points d'endurance, des insectes plus dangereux sont invoqués, provoquant marques et piqûres désagréables, infligeant des nausées aux cibles dans la zone. Dans les deux cas, Essaim bouillonnant cause également 2 dégâts par tours (ignorant l'armure). À tout moment, vous pouvez payer son coût actif une fois par tour pour repositionner l'essaim à portée."
  },
  {
    "id": "sp-fm-red-thoughts",
    "name": {
      "en": "Red Thoughts",
      "fr": "Pensées rouges"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "4",
    "range": "20m",
    "duration": "Actif (4 END)",
    "defense": "Résistance à la Magie (monstre), VOL x3 (bête)",
    "effect": "Pensées rouges vous permet de ressentir les pensées et les émotions des animaux dans le rayon. Les sensations captées par ce sort sont beaucoup plus grossières que les pensées humaines, elles nécessiteront donc une certaine interprétation. Pensées rouges fonctionnent également sur les monstres, mais vous subissez une pénalité de -2 à votre jet d’incantation."
  },
  {
    "id": "sp-fm-seed-to-sky",
    "name": {
      "en": "Seed to Sky",
      "fr": "Graine au ciel"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "CORPS x3 m (si jeté)",
    "duration": "1d6 heures, Actif (3 END)",
    "defense": "Esquive/Evasion",
    "effect": "Graine au ciel imprègne une graine d'énergie primaire, lui donnant la capacité de parvenir à maturité en quelques secondes. Vous pouvez déclencher ce pouvoir à tout moment pendant la durée de l'invocation en dépensant une action de mouvement et le coût actif en endurance. S'il est utilisé pour faire pousser un arbre, ses racines poussent au-dessus et épinglent toutes les cibles à moins de 3 m de l'endroit où il atterrit tant qu'elles ne parviennent pas à battre votre jet d’incantation avec leurs jets d'esquive / évasion. Un arbre a 30 PA, mais les racines sont plus molles (7 PA) et se briseront si elles subissent plus de 15 points de dégâts. Si cette invocation est utilisée contre une structure ou à l'intérieur, elle est susceptible de causer des dommages importants. "
  },
  {
    "id": "sp-fm-berserkers-pelt",
    "name": {
      "en": "Berserker’s Pelt",
      "fr": "Peau de Berserker"
    },
    "schoolId": "druid",
    "school": {
      "en": "Druid",
      "fr": "Druide"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "5m",
    "duration": "Jusqu'à ré-incantation, Actif (4 END)",
    "defense": "Résilience, Résistance à la Magie",
    "effect": "Peau de Beserker transforme un certain nombre de personnes (jusqu'à la moitié de votre niveau de compétence d’incantation) en ours ou en loups. Les esprits des cibles sont également transformés par ce sort, réduisant leurs statistiques mentales à celles des bêtes, mais ils gardent un souvenir approximatif de leurs actions récentes et de leur identité personnelle. Vous pouvez utiliser cette invocation sur vous-même, auquel cas la durée est permanente jusqu'à ce que vous ré-incantiez l'invocation et ne soit plus maintenue. Toutes les possessions portées par les cibles sont également transformées par ce sort."
  },
  {
    "id": "sp-fm-blessing-courage",
    "name": {
      "en": "Blessing of Courage",
      "fr": "Bénédiction de courage"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "5m",
    "duration": "1d6 heures",
    "defense": "Aucune",
    "effect": "Bénédiction de courage donne à la cible un bonus de +3 aux tests de courage et aux tests de résistance à la coercition contre les tentatives d'intimidation"
  },
  {
    "id": "sp-fm-blessing-protection",
    "name": {
      "en": "Blessing of Protection",
      "fr": "Bénédiction de protection"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "3",
    "range": "5m",
    "duration": "1d10 tours",
    "defense": "Aucune",
    "effect": "Bénédiction de protection donne à la cible un bonus de +2 aux tests de résistance à la magie pendant la durée de l'invocation."
  },
  {
    "id": "sp-fm-zone-of-peace",
    "name": {
      "en": "Zone of Peace",
      "fr": "Zone de paix"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "5m",
    "duration": "Active (2 END)",
    "defense": "Résistance à la magie",
    "effect": "Zone de paix protège une cible de l'hostilité. Toute créature doit réussir un test de résistance à la magie contre votre test d’incantation pour effectuer une action hostile contre elle, si elle échoue, elle peut toujours attaquer une cible différente. Si une cible affectée par cette invocation entreprend une action hostile contre une autre créature, elle se termine immédiatement."
  },
  {
    "id": "sp-fm-litany-condemnation",
    "name": {
      "en": "Litany of Condemnation",
      "fr": "Litanie de condamnation"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "2",
    "range": "8m",
    "duration": "Active (2 END)",
    "defense": "Résistance à la magie",
    "effect": "Vous lancez cette invocation pour condamner une cible comme ennemie de votre foi, les attaques et les dégâts contre elle sont augmentés de 1. De plus, les jets critiques qu'elle peut subir sont également à +1. Cette invocation n'a aucun effet sur ceux qui servent honnêtement et activement votre religion."
  },
  {
    "id": "sp-fm-dawns-gleam",
    "name": {
      "en": "Dawn’s Gleam",
      "fr": "Éclat de l’aube"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "Cône 10m",
    "duration": "Immédiate",
    "defense": "Esquive, Résistance à la magie (monstre)",
    "effect": "Cette invocation crée un flash lumineux de votre symbole de foi, éblouissant vos adversaires. La lumière d'Éclat de l'aube affecte également les monstres comme s'il faisait jour, tant qu'ils échouent leur résistance à la magie contre votre test d’incantation. Cette invocation provoque la cécité pendant 1d6 tours et a 25% de chances de mettre des cibles en feu."
  },
  {
    "id": "sp-fm-crimson-call",
    "name": {
      "en": "The Crimson Call",
      "fr": "L’appel pourpre"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "5",
    "range": "Rayon 5m",
    "duration": "Actif (3 END)",
    "defense": "Résistance à la magie",
    "effect": "L'appel pourpre exige le sang de vos ennemis. Toute cible hostile dans la zone de cette invocation ajoute +4 à tous les jets critiques contre elle et subit le double des dégâts des effets de saignement."
  },
  {
    "id": "sp-fm-valiant-fervor",
    "name": {
      "en": "Valiant Fervor",
      "fr": "Ferveur vaillante"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "Rayon 5m",
    "duration": "Immédiate",
    "defense": "Aucune",
    "effect": "Cette invocation renforce la volonté de vos alliés, leur octroyant à tous dans la zone affectée (y compris vous) un dé d'adrénaline. Plusieurs dés d'adrénaline ne peuvent pas être accordés de cette manière."
  },
  {
    "id": "sp-fm-welcome-fold",
    "name": {
      "en": "Welcome to the Fold",
      "fr": "Bienvenue au bercail"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "Soi-même",
    "duration": "1d6 heures",
    "defense": "Résistance à la magie",
    "effect": "Cette invocation émerveille ceux qui vous rencontrent, les faisant vous traiter comme si votre réputation était positive (si ce n’était pas déjà le cas) et d’un niveau plus élevé qu’elle ne l’est. Cette invocation n'a aucun effet sur ceux qui vous ont déjà rencontré."
  },
  {
    "id": "sp-fm-blood-for-blood",
    "name": {
      "en": "Blood for Blood",
      "fr": "Sang pour sang"
    },
    "schoolId": "priest",
    "school": {
      "en": "Priest",
      "fr": "Prêcheur"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "2m",
    "duration": "Actif (4 END)",
    "defense": "Résistance à la Magie",
    "effect": "Cette invocation lie le sort de deux cibles, la moitié des dégâts infligés à l'une apparaît comme des blessures à l'autre. Chaque fois que cet effet se déclenche, la cible peut lancer un nouveau jet de résistance à la magie."
  },
  {
    "id": "sp-fm-toile-de-la-vie",
    "name": {
      "en": "Web of Life",
      "fr": "Toile de la vie"
    },
    "schoolId": "archpriest",
    "school": {
      "en": "Archpriest",
      "fr": "Archiprêtre"
    },
    "tier": "archpriest",
    "source": "fanMade",
    "grimoireEligible": false,
    "stamina": "16",
    "range": "Soi-même",
    "duration": "1 heure",
    "defense": "Aucune",
    "effect": "Invoquant le pouvoir inhérent à toute vie, vous vous accordez une connaissance instinctive de tout ce qui vit dans la région. Vous pouvez ressentir les émotions (le cas échéant), connaître la direction approximative et le nombre de tous les êtres vivants dans une vaste zone égale à dix fois votre niveau de compétence de Sorts. Si vous passez du temps à faire un jet de déduction, vous pouvez obtenir plus de détails sur une cible spécifique dans ce domaine, en prenant des pensées approximatives et une vague idée de son état de santé.",
    "deity": "?"
  },
  {
    "id": "sp-fm-astral-projection",
    "name": {
      "en": "Astral Projection",
      "fr": "Projection astrale"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "6",
    "range": "-",
    "duration": "Actif (2 END)",
    "defense": "-",
    "effect": "Projection astrale vous rend inconscient tandis que votre esprit est libre d'errer. En se projetant de cette façon, votre esprit est intangible et invisible pour les autres alors que vous pouvez percevoir normalement, bien que le monde prenne un étrange flou grisâtre. Votre forme projetée peut voler librement et voyager avec un SPD égal à votre VOLONTÉ x3 et se déplacer à travers tous les obstacles non magiques sur votre chemin.  Le mouvement à travers les barrières magiques, la terre consacrée ou les êtres vivants est impossible (faisant des haies épaisses et des arbres une barrière efficace), tout comme se déplacer à moins de 10 m de tout diméritium plus grand qu'une pièce de monnaie.  Vous pouvez vous déplacer de cent fois la valeur de votre compétence Rituel en mètres de votre corps.  Votre corps est totalement impuissant dans cet état et si quelqu'un vous tue, vous êtes pris au piège dans cet état de projection indéfiniment jusqu'à ce que la folie s'installe. Si quelqu'un attache du diméritium à votre corps pendant que vous vous projetez, vous êtes pris au piège dans l'état de projection jusqu'à ce qu'il soit supprimé.",
    "craftTime": "15",
    "dc": "10 tours",
    "components": "Un endroit où dormir, Cinquième essence(x3), Poussière imprégnée (x1)"
  },
  {
    "id": "sp-fm-enduring-ward",
    "name": {
      "en": "Enduring Protection",
      "fr": "Protection durable"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "journeyman",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "12",
    "range": "-",
    "duration": "Jusqu'à ce que détruit ou dissipé",
    "defense": "-",
    "effect": "Protection durable crée un cercle qui repousse la magie hostile. Ce cercle peut atteindre jusqu'à 10 m de rayon et tout sort ou phénomène magique passant au-delà du seuil a une chance d'être dissipé ou repoussé par ce rituel. Cela agit comme le sort Dissipation contre la magie hostile qui franchit le périmètre sauf que le coût en endurance provient d'une réserve que vous investissez dans le rituel lors de son lancement.  Cette réserve peut être de n'importe quel montant, mais votre total d'endurance est également réduit de moitié pendant que le rituel est actif. Le rituel reconstitue sa réserve une fois par jour et s'il est épuisé, Protection durable est détruit.",
    "craftTime": "18",
    "dc": "10 tours",
    "components": "Cinquième essence (x5), Poussière imprégnée (x2), Craie (x4), Diméritium (x1, réduit en poussière)"
  },
  {
    "id": "sp-fm-elemental-binding",
    "name": {
      "en": "Elemental Binding",
      "fr": "Liaison élémentaire"
    },
    "schoolId": "ritual",
    "school": {
      "en": "Ritual",
      "fr": "Rituel"
    },
    "tier": "master",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "15",
    "range": "-",
    "duration": "Permanent",
    "defense": "-",
    "effect": "Liaison élémentaire piège un ifrit ou d’ao (ou maride) inférieur dans une construction physique et le force à servir le lanceur de sorts jusqu'à ce qu'il soit renvoyé à son plan d'origine. Cet élémentaire fera tout ce que vous lui demandez, mais il ne peut pas penser et ne peut pas effectuer des tâches de finesse qui nécessitent des doigts ou de petites choses. Un élémentaire exécutera le dernier ordre qui lui a été donné.  S'il échoue, il essaiera à nouveau sans fin jusqu'à ce qu'il réussisse ou que vous lui ordonniez de s'arrêter.  Si l'ordre est en cours («chercher de l'eau»), l'élémentaire continuera d'exécuter cet ordre jusqu'à ce qu'il soit détruit, ou que vous lui ordonniez de s'arrêter.",
    "craftTime": "22",
    "dc": "10 tours",
    "components": "Craie (x2), Éclats de lune (x2, pour un élémentaire de terre), Météorite (x2, pour un élémentaire de feu), Essence d'eau (x5, pour un élémentaire de glace),Bois durci (x10), Pierre (x10), Poussière imprégnée (x5),Cinquième essence (x2)"
  },
  {
    "id": "sp-fm-beggars-blessing",
    "name": {
      "en": "The Beggar’s Blessing",
      "fr": "La bénédiction du mendiant"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "7",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "La bénédiction du mendiant fait beaucoup souffrir les finances personnelles de la victime. Les contrats commerciaux subissent une pénalité de -6, les marchandises sont vendues deux fois moins et les articles sont deux fois plus chers. Les marchands et les colporteurs semblent se méfier grandement de la victime, comme s’il avait une réputation d’escroc ou de voleur qu’ils ne peuvent expliquer, et les clients se méfient de ses produits ou services, convaincus qu’ils sont de mauvaise qualité.",
    "danger": "Faible",
    "prerequisites": "Le sujet doit faire un don de 8 couronnes par jour pendant 8 jours à 8 causes, temples, églises ou sanctuaires honnêtes différents. Si un jour la victime ne parvient pas à faire un don à un autre site, l'exigence est réinitialisée et elle doit réessayer."
  },
  {
    "id": "sp-fm-cornucopia-ashes",
    "name": {
      "en": "Cornucopia of Ashes",
      "fr": "La corne d’abondance de cendres"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "16",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "La corne d'abondance de cendres transforme la nourriture en poussière lorsqu'elle entre dans la bouche du sujet, le faisant affamer. Chaque jour, l’envoûtement persiste et la victime est incapable de se nourrir, elle doit faire un test d'Endurance à SD: 10, augmentant de 2 chaque jour.  S'ils réussissent ce test, ils soustraient 2 de leur total de points d'endurance et de statistiques d'étourdissement.  S'ils échouent, ils réduisent également leur HP maximum de 2 et prennent un -1 cumulatif pour toutes les statistiques (minimum 1). Si leur endurance maximale est réduite à 0, ils tombent dans le coma. Si leur PV maximum tombe à 0, ils meurent de faim.",
    "danger": "Élevé",
    "prerequisites": "La victime doit préparer cinq repas, avec de la viande de porc, de vache, de cerf, de lapin et d’os d’un homme mort de faim respectivement et tous doivent être garnis d’une goutte de sang du sujet. Le repas de porc doit être brûlé, le repas de bœuf doit être jeté dans un plan d'eau, le repas de chevreuil doit être jeté de grande hauteur, le repas de lapin doit être volé à la victime et enfin, le repas à base d'os humains doit être nourri à un étranger. Tout cela doit se produire sous un ciel clair et la nuit."
  },
  {
    "id": "sp-fm-bone-breaker",
    "name": {
      "en": "The Bone Breaker",
      "fr": "Le brise-os"
    },
    "schoolId": "hex",
    "school": {
      "en": "Hex",
      "fr": "Envoûtement"
    },
    "tier": "novice",
    "source": "fanMade",
    "grimoireEligible": true,
    "stamina": "14",
    "range": "-",
    "duration": "-",
    "defense": "-",
    "effect": "Le brise-os affaiblit considérablement les os de la victime, les rendant si fragiles que même une activité rigoureuse normale a une chance de les briser. Chaque fois que le sujet s'engage dans une activité intense, il doit faire un test de Résilience SD: 15.  Si ce test échoue, lancez un emplacement aléatoire, cet emplacement subit des blessures critiques comme suit: Tête - Mâchoire fissurée, Torse - Côtes cassées, Jambes - Jambe fracturée, Bras - Jambe fracturée. Cette blessure critique peut être stabilisée mais pas traitée jusqu'à ce que l’envoûtement soit retiré.",
    "danger": "Élevé",
    "prerequisites": "La victime doit rassembler les os de 7 créatures différentes pour être brûlées. Les cendres de ces incendies doivent ensuite être préparées dans une solution alcoolique que le sujet doit boire sous la pleine lune jusqu'à ce qu’il s’évanouit. Une fois le matin venu, il sera libéré de l’envoûtement et aura probablement une terrible gueule de bois."
  }
];
