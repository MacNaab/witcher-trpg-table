import grimoireHeroArt from '@/src/assets/images/witcher_gm_grimoire_1794558035520.jpg';
import type { BestiaryEntry } from '@/src/data/bestiary/types';
import type {
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import { getCreatureTypeLabel } from '@/src/modules/encounter-manager/data';
import type {
  HomebrewDocument,
  HomebrewThemeConfig,
  HomebrewThemeId,
  ModuleLanguage,
} from '../types';

export const HOMEBREW_STORAGE_KEY = 'witcher-gm-homebrew-v1';

export const BUILTIN_ARTWORK_MAP: Record<string, string> = {
  'preset:grimoire': grimoireHeroArt,
};

export const HOMEBREW_THEMES: Record<HomebrewThemeId, HomebrewThemeConfig> = {
  teal: {
    id: 'teal',
    label: { fr: 'Océan & Monde (Bleu sarcelle)', en: 'World & History (Teal)' },
    bannerBg: '#126584',
    bannerGradient: 'linear-gradient(125deg, #0b4d67 0%, #167293 52%, #0e5875 100%)',
    ribbonBg: '#0f5c79',
    ribbonShadow: '#073649',
    headingColor: '#0e6180',
    ruleColor: '#1a7596',
    calloutBg: 'rgba(18, 101, 132, 0.08)',
    calloutBorder: 'rgba(18, 101, 132, 0.32)',
    tableStripe: 'rgba(18, 101, 132, 0.09)',
    statblockBg: '#e7e2d6',
    statblockBorder: '#126584',
  },
  crimson: {
    id: 'crimson',
    label: { fr: 'Sorceleurs & Combat (Cramoisi)', en: 'The Witchers (Crimson)' },
    bannerBg: '#8c171d',
    bannerGradient: 'linear-gradient(125deg, #680f14 0%, #9c1f26 52%, #751218 100%)',
    ribbonBg: '#901820',
    ribbonShadow: '#4d0a0e',
    headingColor: '#86181e',
    ruleColor: '#9e242b',
    calloutBg: 'rgba(140, 23, 29, 0.08)',
    calloutBorder: 'rgba(140, 23, 29, 0.30)',
    tableStripe: 'rgba(140, 23, 29, 0.08)',
    statblockBg: '#e7e0d6',
    statblockBorder: '#8c171d',
  },
  charcoal: {
    id: 'charcoal',
    label: { fr: 'Chroniques & Bestiaire (Ardoise)', en: 'Chronicles & Bestiary (Slate)' },
    bannerBg: '#27292e',
    bannerGradient: 'linear-gradient(125deg, #1a1b1f 0%, #34383f 55%, #202226 100%)',
    ribbonBg: '#27292e',
    ribbonShadow: '#121316',
    headingColor: '#23201c',
    ruleColor: '#524b42',
    calloutBg: 'rgba(39, 41, 46, 0.07)',
    calloutBorder: 'rgba(39, 41, 46, 0.28)',
    tableStripe: 'rgba(39, 41, 46, 0.08)',
    statblockBg: '#e4dfd4',
    statblockBorder: '#3c3a37',
  },
  olive: {
    id: 'olive',
    label: { fr: 'Alchimie & Terres sauvages (Vert forêt)', en: 'Alchemy & Wilds (Forest)' },
    bannerBg: '#2e5135',
    bannerGradient: 'linear-gradient(125deg, #1f3924 0%, #3a6543 52%, #24432a 100%)',
    ribbonBg: '#2c4f33',
    ribbonShadow: '#162b1a',
    headingColor: '#284a2f',
    ruleColor: '#3a6643',
    calloutBg: 'rgba(46, 81, 53, 0.08)',
    calloutBorder: 'rgba(46, 81, 53, 0.30)',
    tableStripe: 'rgba(46, 81, 53, 0.08)',
    statblockBg: '#e5e3d8',
    statblockBorder: '#2e5135',
  },
  ochre: {
    id: 'ochre',
    label: { fr: 'Artisanat & Commerce (Ocre brun)', en: 'Crafting & Guilds (Ochre)' },
    bannerBg: '#74481b',
    bannerGradient: 'linear-gradient(125deg, #543210 0%, #8a5824 55%, #623c15 100%)',
    ribbonBg: '#73471a',
    ribbonShadow: '#3f250b',
    headingColor: '#6d4116',
    ruleColor: '#8d5b27',
    calloutBg: 'rgba(116, 72, 27, 0.08)',
    calloutBorder: 'rgba(116, 72, 27, 0.32)',
    tableStripe: 'rgba(116, 72, 27, 0.09)',
    statblockBg: '#e8e2d5',
    statblockBorder: '#74481b',
  },
};

export interface HomebrewTemplatePreset {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  theme: HomebrewThemeId;
  startPageNumber: number;
  chapterFooter: { fr: string; en: string };
  markdown: { fr: string; en: string };
}

export const HOMEBREW_TEMPLATES: readonly HomebrewTemplatePreset[] = [
  {
    id: 'full-book',
    title: {
      fr: 'Ouvrage complet : Couverture + Sommaire + Double page + 4e de couverture',
      en: 'Complete Book: Cover + Smart TOC + Opener Spread + Back Cover',
    },
    description: {
      fr: 'Démontre le livre complet : couverture avant, sommaire auto 1–3 colonnes, double page (illustration pleine page + ouverture de chapitre avec épigraphe et frise des Signes), puis 4e de couverture à coupe diagonale et chaînes.',
      en: 'Showcases the full rulebook flow: front cover, adaptive 1–3 column smart TOC, chapter-opening spread (full-art left page + right chapter opener with epigraph & Witcher Signs divider), and forged-chain diagonal back cover.',
    },
    theme: 'teal',
    startPageNumber: 3,
    chapterFooter: { fr: 'Le Monde du Sorceleur', en: 'The World of the Witcher' },
    markdown: {
      fr: `::: cover
overline: CHRONIQUES DU CONTINENT
title: SEIGNEURS & TERRES
subtitle: SUPPLÉMENT DE CAMPAGNE
tagline: Dans le monde sombre du Sorceleur, chaque avantage compte rien que pour survivre…
image: preset:grimoire
creditLeft: Compagnon du MJ
creditRight: Édition Homebrew
:::

\\page

::: toc
title: Sommaire
image: preset:grimoire
:::

\\page

::: art-page
image: preset:grimoire
:::

\\page

::: aside
## Dark Fantasy, à la sauce Sorceleur
Si vous avez parcouru le Sommaire, vous aurez remarqué l’ampleur des chapitres consacrés au Meneur de Jeu. Le Continent repose sur une *Dark Fantasy* sans concessions : chaque victoire a un coût, et la survie dépend autant de l’acier que de la ruse.

Ces contrastes entre terreur sourde et instants d’humanité forgent le ton unique de *The Witcher TRPG*.
:::

# Le Monde du Sorceleur

> « Les gens », répondit Geralt en tournant la tête, « aiment inventer des monstres et des monstruosités. Ils se sentent alors moins monstrueux eux-mêmes… Ils vivent plus facilement ainsi. »
> — Andrzej Sapkowski, Le Dernier Vœu

::: signs

**Le jeu de rôle du Sorceleur plonge les joueurs dans un univers sombre et adulte où les fins heureuses demeurent rares et où chaque choix entraîne des conséquences souvent brutales.**

Dans les cités fortifiées comme dans les hameaux boueux du Nord, mendiants, marchands et seigneurs s’entredéchirent tandis que les guerres frontalières attisent la haine envers les non-humains. Nul héros n’échappe à ce climat : seuls demeurent ceux qui acceptent de marcher sur le fil.

\\page

::: aside
## Principe de Neutralité
Les sorceleurs ne prennent jamais parti dans les querelles des rois ou des prêtres. Cette règle ancienne protège leur passage d’un royaume à l’autre.
:::

# Chapitre II : Contrats & Périls
Passé le dégel de Birke, chaque sorceleur quitte son bastion d’hiver pour arpenter les pistes boueuses du Pontar et négocier ses primes à la lueur des lanternes.

## Négocier son Contrat
La prime varie selon la rareté de la bête, la dangerosité de l’antre et les risques politiques encourus auprès des baillis locaux.

## Équipement & Préparatifs
Huiles, décoctions et bombes demeurent indispensables face aux reliques anciennes.

# Bestiaire & Rencontres

## Jeune Leshen de Brumebois
Une créature territoriale ancienne qui lie son existence aux forêts intactes.

\\page

::: backcover
image: preset:grimoire
Parcourez le Continent d’un bout à l’autre, percez ses secrets, traquez ses monstres les plus anciens et faites vivre vos propres chroniques à la table de jeu. Des montagnes glacées de Kovir aux vignobles ensoleillés de Toussaint, chaque page offre de nouvelles intrigues.

Ce supplément complet pour *The Witcher TRPG* rassemble outils du MJ, accroches de campagne, fiches techniques et règles prêtes à l’impression pour enrichir durablement vos parties.

featuring: Au programme
- 6 Aventures | Découvrez des scénarios sur tout le Continent : enquête à Haut-Pont, duel d’arène et mystères dans les bois brumeux.
- Nouveaux Contenus | Enrichissez vos campagnes avec armes inédites, sorts, équipements d’artisanat et secrets alchimiques.
- Une Campagne Liée | Reliez chaque contrat pour bâtir une véritable fresque d’un royaume à l’autre.
creditLeft: Compagnon du MJ
creditRight: Édition Homebrew
:::`,
      en: `::: cover
overline: CHRONICLES OF THE CONTINENT
title: LORDS & LANDS
subtitle: CAMPAIGN SUPPLEMENT
tagline: In the Dark World of the Witcher, a person needs every advantage they can get just to survive...
image: preset:grimoire
creditLeft: GM Companion
creditRight: Homebrew Edition
:::

\\page

::: toc
title: Table of Contents
image: preset:grimoire
:::

\\page

::: art-page
image: preset:grimoire
:::

\\page

::: aside
## Dark Fantasy, Witcher Style
If you took a look through the Table of Contents, you may have noticed how much space is dedicated to helping Game Masters run a dark, gritty campaign across the Continent.

What sets *The Witcher TRPG* apart is the sharp contrast between grim survival and brief moments of genuine joy, camaraderie, and gallows humor.
:::

# The World of the Witcher

> "People," Geralt turned his head, "like to invent monsters and monstrosities. Then they seem less monstrous themselves... They feel better then. They find it easier to live."
> — Andrzej Sapkowski, The Last Wish

::: signs

**The Witcher role playing game is set in a world of dark, adult fantasy where happy endings are rare and actions have swift, often brutal consequences across every border.**

In crowded cities and mud-walled hamlets alike, merchants, soldiers, and desperate peasants struggle beneath creeping war while ancient hatreds fester in the shadows. There are no spotless heroes—only survivors making hard bargains.

\\page

::: aside
## Witcher Neutrality
Neutrality remains a cornerstone of the Path regardless of shifting banners across the Northern Realms.
:::

# Chapter II: Witcher Work
Once the Birke thaw clears the mountain passes, each witcher rides back down into the muddy valleys of the Pontar alone to haggle over coin and silver.

## The Question of Price
Fair coin depends on the beast’s lethality, distance to the lair, and whether local bailiffs tell the full truth.

## Silver & Alchemy
Oils, decoctions, and dimeritium remain essential when confronting ancient relicts.

# Bestiary & Encounters

## Mistwood Leshen
An ancient woodland relict anchored to hidden bone totems.

\\page

::: backcover
image: preset:grimoire
Adventure across the world of The Witcher, uncovering its secrets, slaying its monsters, and bringing unforgettable stories to life at your table. Travel from the frozen peaks of Kovir to the sun-drenched vineyards of Toussaint with intrigue around every bend.

This campaign supplement provides ready-to-print lore spreads, monster statblocks, new player gear, and modular contracts designed for effortless table preparation.

featuring: Featuring
- 6 Adventures | Experience escapades across the Continent, from mountain murder mysteries to mist-shrouded forest hunts.
- New Player Content | Expand your game with new weapons, spells, alchemical formulae, and regional crafting diagrams.
- A Connected Campaign | Weave every contract together into a sweeping cross-country trek across the realms.
creditLeft: GM Companion
creditRight: Homebrew Edition
:::`,
    },
  },
  {
    id: 'chronicle',
    title: {
      fr: 'Chronique du Continent (Modèle 2 pages paires/impaires)',
      en: 'Continent Chronicle (2-Page Alternating Spread)',
    },
    description: {
      fr: 'Reproduit fidèlement la mise en page des livres officiels : colonne mineure à gauche sur page 8 (paire), à droite sur page 9 (impaire), 2 colonnes justifiées et illustration en bas de page.',
      en: 'Mirrors official rulebook spreads: minor sidebar on Left for Page 8 (even), automatically flipping Right on Page 9 (odd), justified 2-column prose, and bottom art.',
    },
    theme: 'teal',
    startPageNumber: 8,
    chapterFooter: { fr: 'Les Chroniques du Nord', en: 'The Northern Chronicles' },
    markdown: {
      fr: `::: aside
## Sur la Voie
Votre personnage garde probablement un souvenir vif ou trouble de la Première et de la Deuxième Guerre du Nord. Tout vétéran de plus de 24 ans a côtoyé la conscription ou les colonnes de réfugiés fuyant l’avance nilfgaardienne.

Si vous venez d’une province annexée comme Cintra ou Metinna, les lois impériales façonnent encore votre quotidien — entre ordre strict et rancœurs enfouies.
:::

Au début, les villageois accueillirent la disparition des bêtes avec soulagement. Mais la paix ne dura pas. Beaucoup murmurent qu’en chassant les sorceleurs de leurs bastions, les royaumes ont détruit les seuls prédateurs capables de contenir le retour des fléaux anciens.

Les marais s’étendent, les routes deviennent incertaines, et les bourgmestres recommencent à clouer des avis de prime sur les ormes des carrefours.

## Les Guerres Nilfgaardiennes
Connues sous le nom de Guerres du Nord, ces campagnes sanglantes virent l’Empire de Nilfgaard s’étendre sur le Continent en absorbant seize nations voisines. Rarement le monde connu avait affronté une machine militaire aussi disciplinée et impitoyable.

Techniquement, la conquête débuta il y a des décennies avec l’annexion d’Ymlac et de Rowan. Mais chacun retient l’année 1239, lorsque Nilfgaard franchit l’Amell sous l’impulsion de l’Usurpateur qui avait renversé l’empereur légitime et exilé l’héritier Emhyr.

> *« Le premier âge des sorceleurs s’est éteint dans la neige de Kaer Morhen. Ceux qui arpentent encore la Voie aujourd’hui ne portent plus la bannière d’un ordre, mais seulement le poids d’un médaillon. »*

Avec la restauration d’Emhyr var Emreis sur le trône impérial, les guerres entrèrent dans l’histoire. En 1263, les légions noires ravagèrent Cintra. Malgré la victoire du Mont Sodden et les traités suivants, la troisième offensive menace déjà de briser les derniers royaumes libres.

::: bottom-art
![Cavaliers sur la frontière du Nord](preset:grimoire)
:::

\\page

::: aside
## Principe de Neutralité
Les sorceleurs ne prennent jamais parti dans les querelles des rois ou des prêtres. Cette règle ancienne garantit qu’un village des terres de Rédanie comme une garnison nilfgaardienne puisse encore recourir à leur lame sans craindre de trahison.

### Repères rapides
- **Tarif usuel** : 150 à 400 couronnes selon la menace.
- **Arrhes** : rarement versées avant la preuve du trophée.
- **Accueil** : méfiance polie dans le meilleur des cas.
:::

## Le Métier de Sorceleur et le Prix du Sang
Les sorceleurs passent leurs hivers retranchés dans leurs forteresses. Ils y réparent leurs lames d’argent, distillent de nouvelles fioles et transmettent aux plus jeunes les traités sur les nécrophages et les maudits. Dès le dégel de Birke, chacun reprend la route en solitaire.

Dans chaque bourgade, le rituel demeure immuable : interroger l’aubergiste, lire les placards cloués aux poteaux et négocier ferme avec le conseil du village. Trop souvent, les paysans ne voient en nous que des mutants tout juste tolérés le temps de régler un massacre.

> *« Ne bradez jamais un contrat pour quelques pièces de cuivre : celui qui tue une wyverne pour une miche de pain condamne ses frères à crever de faim la saison suivante. »*

### Barème indicatif des contrats

| Créature / Menace | Difficulté | Prime conseillée |
| :--- | :---: | :---: |
| Noyeurs / Goules | Facile | 80 – 140 couronnes |
| Spectre de midi / Loup-garou | Moyenne | 200 – 350 couronnes |
| Leshen / Katakan | Périlleuse | 450 – 750 couronnes |
| Dragon / Vampire supérieur | Légendaire | 1 200+ couronnes |`,
      en: `::: aside
## Living Through It
Likely your character will remember—or at least hold hazy impressions of—the First and Second Northern Wars. Any traveler over twenty-four probably brushed against conscription or refugee columns fleeing Nilfgaardian banners.

If you hail from an annexed province such as Cintra or Nazair, imperial law still shapes daily life beneath strict order and quiet resentment.
:::

At first this relieved the commonfolk, yet peace proved fleeting. Many whisper that driving witchers from their keeps eliminated the only predators keeping ancient horrors in check. Across Velen and Temeria, monsters once thought extinct are prowling overgrown trade roads again.

## The Nilfgaardian Wars
Known across the North as the Northern Wars, these brutal campaigns saw Nilfgaard expand across the Continent, absorbing sixteen neighboring realms into an empire without equal in known history.

Technically the conquests began decades earlier with Ymlac and Rowan, though most point to 1239 when Nilfgaard crossed the Amell under the Usurper. After Emhyr var Emreis reclaimed his throne, the invasions shook every northern crown. Nine years later in 1263, Cintra fell, sparking conflicts whose embers now threaten to ignite a Third Northern War.

> *"The First Age of Witchers ended beneath the snows of Kaer Morhen. Those who still walk the Path carry no banner—only cold silver and the memory of brothers long gone."*

Things look dark for the Northern Kingdoms as sabotage and winter famine hollow out their border garrisons.

::: bottom-art
![Northern Frontier Riders](preset:grimoire)
:::

\\page

::: aside
## Witcher Neutrality
Neutrality remains a cornerstone of the Path. Refusing to take sides in the conflicts of kings and temples ensures witchers can still cross borders to hunt monsters regardless of shifting banners.

### Field Notes
- **Typical Bounty**: 150–400 crowns depending on risk.
- **Upfront Coin**: Rarely paid before presenting a trophy.
- **Hospitality**: Guarded caution at best.
:::

## Witcher Work and the Question of Price
Witchers spend their winters behind stone walls, replenishing decoctions, mending silver-edged blades, and comparing field notes on cursed beasts. Come spring in Birke, each rides back onto the mud roads alone.

Picking jobs comes down to survival and pride. No witcher is obliged to take a contract beneath his skill, nor accept insults over coin. Agreeing on exact terms before drawing silver prevents bloodshed once the village council sees the cost of living.

### Contract Bounty Reference

| Threat Tier | Investigation | Suggested Bounty |
| :--- | :---: | :---: |
| Drowners / Nekkers | Simple | 80 – 140 crowns |
| Noonwraith / Werewolf | Moderate | 200 – 350 crowns |
| Leshen / Katakan | Hazardous | 450 – 750 crowns |
| True Dragon / Higher Vampire | Legendary | 1,200+ crowns |`,
    },
  },
  {
    id: 'contract',
    title: {
      fr: 'Contrat de Sorceleur & Statblock (Style Cramoisi)',
      en: 'Witcher Contract & Statblock (Crimson Style)',
    },
    description: {
      fr: 'Idéal pour préparer un scénario court : accroche, rumeurs en colonne mineure, tableau d’indices et fiche technique Witcher TRPG complète.',
      en: 'Built for one-shot adventures: contract hook, rumor sidebar, investigation table, and full Witcher TRPG monster statblock.',
    },
    theme: 'crimson',
    startPageNumber: 1,
    chapterFooter: { fr: 'Contrats de la Voie', en: 'Contracts of the Path' },
    markdown: {
      fr: `::: aside
## Rumeurs d’auberge
- **Le meunier** jure avoir vu des racines bouger seules à l’orée de la futaie de Brumebois.
- **La vieille Marta** affirme qu’un bûcheron a brisé un totem d’os de cerf trois nuits avant les disparitions.
- **Le bourgmestre** cache qu’un convoi d’impôts a disparu avec les deux gardes.
:::

# Contrat : L’Ombre de Brumebois

> *« Par ordre du Bailli de Noirval : cent cinquante couronnes d’argent à quiconque débarrassera la lisière du démon aux ramures qui égorge nos bûcherons. Prime doublée si les haches perdues sont rapportées. »*

## Contexte pour le MJ
Depuis deux semaines, aucun chariot de bois n’a rejoint Noirval. Un ancien **Leshen** territorial s’est éveillé après que les forestiers ont abattu son chêne centenaire pour bâtir une palissade. La créature marque désormais l’un des jeunes villageois comme son lien (*Totem vivant*), lui permettant de renaître tant que l’hôte ou les totems demeurent intacts.

### Pistes d’enquête (SD 14–16)
1. **Inspection des corps (Médecine / Survie SD 14)** : blessures nettes de racines acérées et présence de résine noire.
2. **Cercle de corbeaux (Vigilance SD 16)** : trois totems d’ossements dissimulés autour de la clairière.

::: statblock
title: Jeune Leshen de Brumebois
subtitle: Relique · Menace Élevée · Prime 320 couronnes
stats: INT 7 | RÉF 8 | DEX 6 | COR 11 | VIT 7 | EMP 2 | TECH 3 | VOL 9
derived: PV 75 | END 45 | RÉC 7 | ÉTOU 7 | Course 18 m | Saut 3 m
Armure: Écorce ancienne (PA 8)
Compétences: Bagarre +15, Vigilance +16, Survie +18, Incantation +15
Attaques: Griffes ligneuses 4d6+4 (2/tour) · Racines jaillissantes 3d6 (Portée 12 m)
Capacités: Contrôle des corbeaux & loups · Reconstitution par Totem (1d6 jours)
Vulnérabilités: Huile contre les Reliques · Feu (Igni) · Dimeritium
Butin: Cœur de Leshen, Résine ancienne, Bois durci
:::`,
      en: `::: aside
## Tavern Rumors
- **The miller** swears roots shifted on their own along Mistwood’s edge.
- **Old Marta** claims a woodcutter smashed an antler-bone totem three nights before the vanishings.
- **The alderman** conceals that a tax cart vanished alongside two town guards.
:::

# Contract: Shadow of Mistwood

> *"By order of the Bailiff of Blackvale: one hundred and fifty silver crowns to any brave soul who rids our timberline of the horned forest fiend slaying our woodsmen."*

## GM Overview
No lumber wagon has reached Blackvale for two weeks. An ancient territorial **Leshen** awakened after loggers felled its heart-oak for a palisade. The relict has secretly marked a village youth as its anchor, ensuring it reforms in the woods until both totems and mark are cleansed.

### Investigation Clues (DC 14–16)
1. **Corpse Inspection (Healing Hands / Survival DC 14)**: Deep splintered wounds laced with black sap.
2. **Raven Perches (Awareness DC 16)**: Three bone-and-antler totems hidden around the clearing.

::: statblock
title: Mistwood Leshen
subtitle: Relict · High Threat · Bounty 320 crowns
stats: INT 7 | REF 8 | DEX 6 |Body 11 | SPD 7 | EMP 2 | CRA 3 | WILL 9
derived: HP 75 | STA 45 | REC 7 | STUN 7 | Run 18 m | Leap 3 m
Armor: Ancient Bark (SP 8)
Skills: Brawling +15, Awareness +16, Wilderness Survival +18, Spell Casting +15
Attacks: Wooden Claws 4d6+4 (2/turn) · Burrowing Roots 3d6 (Range 12 m)
Abilities: Command Ravens & Wolves · Reborn via Marked Anchor
Vulnerabilities: Relict Oil · Fire (Igni) · Dimeritium
Loot: Leshen Trophy Heart, Ancient Resin, Hardened Wood
:::`,
    },
  },
  {
    id: 'lore-dossier',
    title: {
      fr: 'Dossier de Localité & Commerces (Style Ardoise)',
      en: 'Settlement & Inn Dossier (Slate Style)',
    },
    description: {
      fr: 'Fiche de ville ou d’auberge prête à imprimer avec PNJ en marge et tarifs de services.',
      en: 'Print-ready town or tavern dossier with NPC marginalia and service pricing tables.',
    },
    theme: 'charcoal',
    startPageNumber: 2,
    chapterFooter: { fr: 'Atlas du Continent', en: 'Atlas of the Continent' },
    markdown: {
      fr: `::: aside
## Personnalités clés
### Aubergiste : Barnabé le Borgne
Ancien sapeur témérien. Connaît tous les passeurs du Pontar et rachète les trophées douteux sans poser de questions.

### Forgeronne : Gretta
Maîtresse forgeronne naine. Peut réparer l’acier météorique (+2 SD si matériaux fournis).
:::

# Halte du Bac-Rouge
Petite bourgade fortifiée juchée sur un méandre boueux du Pontar, entre Oxenfurt et la frontière rédannienne. Les bacs y traversent jour et nuit sous l’œil méfiant d’une demi-douzaine de hallebardiers.

## L’Auberge du Brochet Doré
Bâtie sur pilotis de chêne noirci, l’auberge sert de refuge aux marchands de fourrures, déserteurs et chasseurs de primes. La salle commune sent la tourbe humide, le chou fermenté et l’hydromel tiède.

| Service / Consommation | Prix courant | Remarque |
| :--- | :---: | :--- |
| Chope de bière de Mahakam | 3 couronnes | Robuste, calme les nerfs |
| Ragoût d’anguille du Pontar | 7 couronnes | Rations chaudes pour 1 jour |
| Chambre individuelle (verrou) | 18 couronnes | Vue sur le quai nord |
| Passage du bac (avec montures) | 12 couronnes | Doublé par temps de brouillard |

::: bottom-art
![Rive brumeuse du Pontar](preset:grimoire)
:::`,
      en: `::: aside
## Notable Locals
### Innkeeper: One-Eyed Barnaby
Retired Temerian sapper. Knows every Pontar smuggler and buys questionable trophies without asking names.

### Smith: Gretta Ironbraid
Dwarven master smith. Repairs meteoric steel (+2 DC if rare ore is supplied).
:::

# Redferry Crossing
A cramped timber-palisaded river post perched along a muddy bend of the Pontar between Oxenfurt and the Redanian marches. Flat-bottom ferries cross from dawn to dusk under the watch of six bored halberdiers.

## The Gilded Pike Inn
Raised on blackened oak pilings, the tavern shelters fur traders, deserters, and bounty hunters alike. The common room reeks of wet peat, pickled cabbage, and spiced mead.

| Service / Goods | Price | Notes |
| :--- | :---: | :--- |
| Mug of Mahakam Stout | 3 crowns | Strong brew, steadies nerves |
| Pontar Eel Stew | 7 crowns | Counts as 1 hot ration |
| Private Locked Room | 18 crowns | Overlooks the northern pier |
| Ferry Crossing (with mounts) | 12 crowns | Doubled during thick fog |

::: bottom-art
![Misty Pontar Bank](preset:grimoire)
:::`,
    },
  },
];

export function createDocumentFromTemplate(
  presetId: string,
  lang: ModuleLanguage,
  customTitle?: string
): HomebrewDocument {
  const preset =
    HOMEBREW_TEMPLATES.find((t) => t.id === presetId) ?? HOMEBREW_TEMPLATES[0];
  return {
    id: `brew-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: customTitle || preset.title[lang],
    chapterFooter: preset.chapterFooter[lang],
    theme: preset.theme,
    pageFormat: 'a4',
    startPageNumber: preset.startPageNumber,
    markdown: preset.markdown[lang],
    images: {},
    updatedAt: new Date().toISOString(),
  };
}

export function createBlankDocument(
  lang: ModuleLanguage,
  title: string
): HomebrewDocument {
  return {
    id: `brew-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title,
    chapterFooter: lang === 'fr' ? 'Supplément de Campagne' : 'Campaign Supplement',
    theme: 'crimson',
    pageFormat: 'a4',
    startPageNumber: 1,
    markdown:
      lang === 'fr'
        ? `::: aside\n## Note en marge\nCe bloc de 1 colonne se place automatiquement à **droite** sur les pages impaires (1, 3, 5…) et à **gauche** sur les pages paires (2, 4, 6…).\n:::\n\n# ${title}\n\n> *« Écrivez ici votre texte d’ambiance ou un extrait de journal. »*\n\n## Section principale\nLe bloc central s’écoule automatiquement sur **deux colonnes justifiées**, fidèles aux ouvrages officiels de *The Witcher TRPG*.\n\n\\page\n\n::: aside\n## Page suivante\nParce que cette page est paire, la colonne mineure vient automatiquement se placer à gauche.\n:::\n\n## Suite du chapitre\nAjoutez des tableaux, des fiches de monstres (\`::: statblock\`) ou des illustrations en bas de page (\`::: bottom-art\`).`
        : `::: aside\n## Margin Note\nThis 1-column minor block automatically appears on the **right** for odd pages (1, 3, 5…) and on the **left** for even pages (2, 4, 6…).\n:::\n\n# ${title}\n\n> *"Write your opening lore voice or journal excerpt here."*\n\n## Main Section\nYour central prose flows naturally across **two justified columns**, matching official *The Witcher TRPG* rulebooks.\n\n\\page\n\n::: aside\n## Next Page\nBecause this page is even, the minor sidebar shifts automatically to the left side.\n:::\n\n## Continuing the Chapter\nAdd tables, monster statblocks (\`::: statblock\`), or bottom illustrations (\`::: bottom-art\`).`,
    images: {},
    updatedAt: new Date().toISOString(),
  };
}

export function loadHomebrewDocuments(lang: ModuleLanguage): HomebrewDocument[] {
  if (typeof window === 'undefined') {
    return [createDocumentFromTemplate('chronicle', lang)];
  }
  try {
    const raw = window.localStorage.getItem(HOMEBREW_STORAGE_KEY);
    if (!raw) {
      const initial = [createDocumentFromTemplate('chronicle', lang)];
      window.localStorage.setItem(HOMEBREW_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as HomebrewDocument[];
    }
  } catch {
    // Fallback
  }
  return [createDocumentFromTemplate('chronicle', lang)];
}

export function saveHomebrewDocuments(docs: HomebrewDocument[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(HOMEBREW_STORAGE_KEY, JSON.stringify(docs));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function formatBestiaryEntryAsStatblock(
  entry: BestiaryEntry,
  lang: ModuleLanguage
): string {
  const typeLabel = getCreatureTypeLabel(entry.typeId, lang);
  const statsMap = entry.combat?.stats ?? {};
  const primaryKeys = ['INT', 'REF', 'DEX', 'BODY', 'COR', 'SPD', 'VIT', 'EMP', 'CRA', 'TECH', 'WILL', 'VOL'];
  const statPairs: string[] = [];
  for (const k of primaryKeys) {
    if (statsMap[k] !== undefined && statPairs.length < 8) {
      statPairs.push(`${k} ${statsMap[k]}`);
    }
  }
  const derivedKeys = ['HP', 'PV', 'STA', 'END', 'REC', 'RÉC', 'STUN', 'ÉTOU', 'RUN', 'Course'];
  const derivedPairs: string[] = [];
  for (const k of derivedKeys) {
    if (statsMap[k] !== undefined && derivedPairs.length < 5) {
      derivedPairs.push(`${k} ${statsMap[k]}`);
    }
  }

  const lines: string[] = [
    '::: statblock',
    `title: ${entry.name[lang]}`,
    `subtitle: ${typeLabel} · ${entry.threat[lang]} · ${entry.reward[lang]}`,
  ];
  if (statPairs.length > 0) {
    lines.push(`stats: ${statPairs.join(' | ')}`);
  }
  if (derivedPairs.length > 0) {
    lines.push(`derived: ${derivedPairs.join(' | ')}`);
  }
  if (entry.armor[lang]) {
    lines.push(`${lang === 'fr' ? 'Armure' : 'Armor'}: ${entry.armor[lang]}`);
  }
  if (entry.combat?.weapons && entry.combat.weapons.length > 0) {
    const wepStr = entry.combat.weapons
      .slice(0, 3)
      .map((w) => `${w.name} (${w.damage}${w.effect && w.effect !== '—' ? `, ${w.effect}` : ''})`)
      .join(' · ');
    lines.push(`${lang === 'fr' ? 'Attaques' : 'Attacks'}: ${wepStr}`);
  }
  if (entry.combat?.abilities && entry.combat.abilities.length > 0) {
    lines.push(
      `${lang === 'fr' ? 'Capacités' : 'Abilities'}: ${entry.combat.abilities.slice(0, 4).join(' · ')}`
    );
  }
  if (entry.combat?.vulnerabilities && entry.combat.vulnerabilities.length > 0) {
    lines.push(
      `${lang === 'fr' ? 'Vulnérabilités' : 'Vulnerabilities'}: ${entry.combat.vulnerabilities.slice(0, 4).join(' · ')}`
    );
  }
  if (entry.combat?.loot && entry.combat.loot.length > 0) {
    lines.push(
      `${lang === 'fr' ? 'Butin' : 'Loot'}: ${entry.combat.loot.slice(0, 4).join(', ')}`
    );
  }
  lines.push(':::');
  return lines.join('\n');
}

export function formatHubEntityAsStatblock(
  entity:
    | { kind: 'pc'; data: SavedPartyCharacter }
    | { kind: 'npc'; data: SavedCustomNpc }
    | { kind: 'monster'; data: SavedCustomMonster },
  lang: ModuleLanguage
): string {
  const s = entity.data.stats;
  const statsLine =
    lang === 'fr'
      ? `stats: INT ${s.int} | RÉF ${s.ref} | DEX ${s.dex} | COR ${s.cor} | VIT ${s.vit} | VOL ${s.vol}`
      : `stats: INT ${s.int} | REF ${s.ref} | DEX ${s.dex} | BODY ${s.cor} | SPD ${s.vit} | WILL ${s.vol}`;
  const derivedLine =
    lang === 'fr'
      ? `derived: PV ${entity.data.maxHp} | END ${entity.data.maxEnd} | RÉC ${s.rec} | ÉTOU ${s.etou} | VIG ${s.vig}`
      : `derived: HP ${entity.data.maxHp} | STA ${entity.data.maxEnd} | REC ${s.rec} | STUN ${s.etou} | VIG ${s.vig}`;

  const subtitle =
    entity.kind === 'pc'
      ? `${entity.data.professionLabel} (${entity.data.playerName || 'PJ'})`
      : entity.kind === 'npc'
        ? `${entity.data.professionLabel} · ${entity.data.powerTier}`
        : `${getCreatureTypeLabel(entity.data.typeId, lang)} · ${entity.data.threatLabel}`;

  const lines = [
    '::: statblock',
    `title: ${entity.data.name}`,
    `subtitle: ${subtitle}`,
    statsLine,
    derivedLine,
  ];

  if (entity.data.weapons.length > 0) {
    const wepStr = entity.data.weapons
      .slice(0, 3)
      .map((w) => `${w.name} (${w.damage})`)
      .join(' · ');
    lines.push(`${lang === 'fr' ? 'Armes' : 'Weapons'}: ${wepStr}`);
  }
  if (entity.kind === 'monster' && entity.data.vulnerabilities.length > 0) {
    lines.push(
      `${lang === 'fr' ? 'Vulnérabilités' : 'Vulnerabilities'}: ${entity.data.vulnerabilities.join(' · ')}`
    );
  }
  lines.push(':::');
  return lines.join('\n');
}
