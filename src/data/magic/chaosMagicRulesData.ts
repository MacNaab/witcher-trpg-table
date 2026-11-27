import type { LocalizedText } from '../bestiary/types';

export interface LeyLineRule {
  id: string;
  element: LocalizedText;
  signs: LocalizedText;
  benefit: LocalizedText;
  penalty: LocalizedText;
}

export interface RestlessSpiritEntry {
  rollNovice: string;
  rollJourneyman: string;
  rollMaster: string;
  name: LocalizedText;
  effect: LocalizedText;
}

export interface DemonBenefitEntry {
  tier: LocalizedText;
  bes: LocalizedText;
  casglydd: LocalizedText;
  mariLwyd: LocalizedText;
}

export interface GoeticToolEntry {
  id: string;
  name: LocalizedText;
  craft: LocalizedText;
  effect: LocalizedText;
}

/**
 * Supplemental Official Magic Rules from "A Tome of Chaos":
 * - Ley Lines (`02_compiling.md`)
 * - Advanced Signs & Portal Reverse Engineering (`06_spells.md`)
 * - Necromancy & Restless Spirits (`08_darkarts.md`)
 * - Goetia, Demon Benefits, True Name Generator & Goetic Tools (`09_goetia.md`)
 */
export const CHAOS_MAGIC_RULES = {
  leyLinesIntro: {
    fr: 'Larges d’env. 6 m, les Lignes telluriques (Ley Lines) sont détectées à ≤ 10 m par une crampe à l’annulaire (toute Vigueur ≥ 1) ou par Exercice de la magie. S’y connecter demande 1 Action et Incantation SD 16 (Prêtres et Druides peuvent y lancer leurs invocations). Échec = Échec critique élémentaire sans dégâts supplémentaires.',
    en: 'Roughly 6m wide, Ley Lines are felt within 10m via ring-finger cramp (any Vigor ≥ 1) or Magic Training. Connecting takes 1 Action + Spell Casting DC 16 (Priests/Druids can cast invocations). Failure triggers an elemental fumble with no extra damage.',
  },
  leyLines: [
    {
      id: 'earth',
      element: { fr: 'Terre', en: 'Earth' },
      signs: {
        fr: 'Végétation dense, arbres noueux, formations rocheuses étranges',
        en: 'Prevalent plant growth, gnarled trees, strange rock patterns',
      },
      benefit: {
        fr: 'Toute défense contre votre magie de Terre subit –4.',
        en: 'Defending against your Earth magic suffers -4 (any defense).',
      },
      penalty: {
        fr: 'Lien rompu et SD de reconnexion augmenté de +2.',
        en: 'Connection severed and reconnect DC increases by +2.',
      },
    },
    {
      id: 'air',
      element: { fr: 'Air', en: 'Air' },
      signs: {
        fr: 'Tourbillons de poussière fréquents, cirrus, odeur d’ozone',
        en: 'Frequent dust devils, cirrus clouds, smell of ozone',
      },
      benefit: {
        fr: 'Permet de lancer n’importe quel sort d’Air de même rang qu’un sort d’Air déjà connu (sans pouvoir l’enseigner ni l’écrire).',
        en: 'Cast any Air spell of the same tier as one you already know (cannot teach or scribe).',
      },
      penalty: {
        fr: 'Le sort part mais le MJ choisit un autre sort d’Air de même rang (coût d’END initial payé).',
        en: 'Spell still triggers, but GM chooses a different Air spell of the same tier (initial STA still paid).',
      },
    },
    {
      id: 'fire',
      element: { fr: 'Feu', en: 'Fire' },
      signs: {
        fr: 'Plantes desséchées, brume de chaleur, soleil éblouissant',
        en: 'Withered plants, heat haze, glaring sunlight',
      },
      benefit: {
        fr: '+2 dés de dégâts sur les sorts de Feu offensifs et chance d’enflammer portée à 100 %.',
        en: '+2 damage dice on damaging Fire spells and 100% ignite chance.',
      },
      penalty: {
        fr: 'Doit dépenser l’END supplémentaire pour relancer le même sort en 1 action sur une cible aléatoire.',
        en: 'Must spend extra STA as an action to recast the same spell on a random target.',
      },
    },
    {
      id: 'water',
      element: { fr: 'Eau', en: 'Water' },
      signs: {
        fr: 'Humidité forte, courants anormaux, marées extrêmes',
        en: 'Humidity, unnatural water flow, extreme tides',
      },
      benefit: {
        fr: 'Compétence Incantation considérée comme supérieure de +2 pour la magie d’Eau.',
        en: 'Spell Casting skill treated as +2 higher for Water magic.',
      },
      penalty: {
        fr: 'Hallucinations vives contrôlées par le MJ jusqu’à rupture du lien + 1 min.',
        en: 'Vivid GM-controlled hallucinations until disconnecting plus 1 minute.',
      },
    },
    {
      id: 'mixed',
      element: { fr: 'Prêtre / Druide (Mixte)', en: 'Priest / Druid (Mixed)' },
      signs: {
        fr: 'Toute ligne tellurique (indépendamment de son élément)',
        en: 'Any elemental Ley Line',
      },
      benefit: {
        fr: '+4 au Seuil de Vigueur tant que connecté à la Ligne.',
        en: '+4 Vigor Threshold while connected to the Ley Line.',
      },
      penalty: {
        fr: '–2 au Seuil de Vigueur pendant 6 h (cumulatif à chaque échec/dépassement ; à ≤ 0, aucune magie possible).',
        en: '-2 Vigor Threshold for 6 hours (cumulative; at ≤ 0, cannot cast magic).',
      },
    },
  ] as readonly LeyLineRule[],
  necromancyIntro: {
    fr: 'Un échec critique ou dépassement en Nécromancie ne déclenche pas d’effet élémentaire : après les dégâts normaux d’échec critique, lancez 1d10 sur la table des Esprits agités. Vous subissez l’effet obtenu ET tous les effets des lignes précédentes de la colonne !',
    en: 'Fumbling or overdrawing Necromancy avoids elemental blowback: take normal fumble damage, then roll 1d10 on the Restless Spirits table, suffering that tier plus every preceding tier in that column.',
  },
  restlessSpirits: [
    {
      rollNovice: '1–5',
      rollJourneyman: '1–3',
      rollMaster: '1–2',
      name: { fr: 'Portail (Gateway)', en: 'Gateway' },
      effect: {
        fr: 'Pendant 1 jour, +2 aux jets de Nécromancie mais tout résultat de 1, 2 ou 3 au dé impose un nouveau jet sur cette table.',
        en: 'For 1 day, +2 to Necromancy rolls, but rolling 1–3 on any d10 triggers another Restless Spirits roll.',
      },
    },
    {
      rollNovice: '6–9',
      rollJourneyman: '4–6',
      rollMaster: '3–4',
      name: { fr: 'Invité indésirable', en: 'Uninvited Guests' },
      effect: {
        fr: 'Un esprit mineur vous hante et imite un Envoûtement (choix du MJ), impossible à lever normalement : il faut l’invoquer par Séance (sans sang de parent) pour le détruire ou le convaincre.',
        en: 'A spirit clings to you mimicking a GM-chosen Hex; cannot be lifted normally—must be summoned via Seance (no relative blood needed) and slain or banished.',
      },
    },
    {
      rollNovice: '10',
      rollJourneyman: '7–8',
      rollMaster: '5–6',
      name: { fr: 'Cohorte de spectres', en: 'Host of Specters' },
      effect: {
        fr: '1d6 Spectres (Wraiths) apparaissent immédiatement dans les 5 m et attaquent à mort la cible la plus proche.',
        en: '1d6 Wraiths immediately manifest within 5m and attack the nearest target to the death.',
      },
    },
    {
      rollNovice: '—',
      rollJourneyman: '9–10',
      rollMaster: '7–8',
      name: { fr: 'Terre souillée', en: 'Tainted Ground' },
      effect: {
        fr: 'La zone subit une puissante Malédiction de « Hantise » (The Haunting) définie par le MJ.',
        en: 'The casting site is afflicted by a powerful Haunting Curse determined by the GM.',
      },
    },
    {
      rollNovice: '—',
      rollJourneyman: '—',
      rollMaster: '9–10',
      name: { fr: 'Le Pénitent', en: 'The Penitent' },
      effect: {
        fr: 'Un Pénitent apparaît à 5 m, traque le nécromancien sans relâche et revient chaque nuit tant qu’il n’est pas détruit ou banni.',
        en: 'A Penitent spawns within 5m and returns every night hunting only the caster until destroyed or banished.',
      },
    },
  ] as readonly RestlessSpiritEntry[],
  goetiaIntro: {
    fr: 'N’importe qui peut tenter la Goétie sans don préalable : les démons désirent être invoqués. S’ils ne sont pas asservis par le Rituel d’asservissement (avec un Véritable Bâton d’asservissement), ils cherchent toujours à retourner les termes du pacte à leur avantage.',
    en: 'Anyone can attempt Goetia without magical talent—demons want to be summoned. Unless bound via Ritual of Binding with a True Staff of Binding, they twist every pact to their own benefit.',
  },
  demonBenefits: [
    {
      tier: { fr: 'Libre (Unbound)', en: 'Unbound' },
      bes: {
        fr: 'Possède votre corps pour traquer et tuer une cible désignée (massacre quiconque s’interpose).',
        en: 'Possesses your body to hunt and slay one named target (slays anyone in the way).',
      },
      casglydd: {
        fr: 'Échange un savoir secret contre un objet de son choix (appris sitôt l’objet livré).',
        en: 'Trades one piece of collected knowledge for an item of its choosing.',
      },
      mariLwyd: {
        fr: 'Fournit jusqu’à 3 000 couronnes d’objets, mais reviendra réclamer un dû équivalent.',
        en: 'Grants up to 3,000 crowns of items; returns later for something of similar value.',
      },
    },
    {
      tier: { fr: 'Asservi (Bound)', en: 'Bound' },
      bes: {
        fr: 'Enfermé en vous : RÉF et DEX passent à 12 + capacité Sang bouillant tant qu’il reste lié.',
        en: 'Trapped inside you: REF & DEX become 12 + Boiling Blood ability while bound.',
      },
      casglydd: {
        fr: 'Répond sous 1 semaine (via les ombres) à toute question qu’un mortel a déjà su résoudre.',
        en: 'Answers via shadows within 1 week any question a mortal once knew.',
      },
      mariLwyd: {
        fr: 'Rapporte sous 1 semaine un objet d’au plus 3 000 couronnes sans pouvoir exiger de paiement.',
        en: 'Fetches an item up to 3,000 crowns within 1 week without seeking repayment.',
      },
    },
    {
      tier: { fr: 'Majeur Libre', en: 'Greater Unbound' },
      bes: {
        fr: 'Possession majeure : puissance colossale pour éliminer une cible (ravage tout sur son passage).',
        en: 'Greater possession to hunt and kill a named target, slaying everything in its path.',
      },
      casglydd: {
        fr: 'Échange un savoir de ce monde ou d’au-delà (permet d’apprendre sorts/magies hors Profession !).',
        en: 'Trades lore from beyond this realm, even unlocking magic unavailable to your Profession.',
      },
      mariLwyd: {
        fr: 'Fournit jusqu’à 30 000 couronnes d’objets contre une dette future équivalente.',
        en: 'Grants up to 30,000 crowns of items; returns later for equal payment.',
      },
    },
    {
      tier: { fr: 'Majeur Asservi', en: 'Greater Bound' },
      bes: {
        fr: 'RÉF et DEX passent à 14 + capacité Sang bouillant tant qu’il demeure asservi.',
        en: 'REF & DEX rise to 14 + Boiling Blood ability while bound.',
      },
      casglydd: {
        fr: 'Répond sous 1 semaine à toute question connue de ce monde ou d’autres plans (magies hors Profession incluses).',
        en: 'Answers within 1 week questions from this realm or beyond (unlocks out-of-class magic).',
      },
      mariLwyd: {
        fr: 'Rapporte sous 1 semaine jusqu’à 30 000 couronnes d’objets sans contrepartie tant qu’il est lié.',
        en: 'Retrieves items worth up to 30,000 crowns within 1 week with no repayment while bound.',
      },
    },
  ] as readonly DemonBenefitEntry[],
  demonTrueNameGrid: [
    ['VOD', 'TOS', 'RES', 'NEU', 'MEY', 'ITH'],
    ['NOC', 'DRE', 'MON', 'HUS', 'NAB', 'STO'],
    ['HEI', 'ZAK', 'BAK', 'CHO', 'BAR', 'VAS'],
    ['MAL', 'FOR', 'AUM', 'KAV', 'KHO', 'GUS'],
    ['ROG', 'SHA', 'OTH', 'CAM', 'BAS', 'AGO'],
    ['MOR', 'LAC', 'BIA', 'MAR', 'OCK', 'IAS'],
    ['BOG', 'SKI', 'TAR', 'HAX', 'OVE', 'ROS'],
    ['CAM', 'CAS', 'RIS', 'VAK', 'VOI', 'GAN'],
    ['NOY', 'DOM', 'IEN', 'EOS', 'OSE', 'CRO'],
    ['AEL', 'DAI', 'LAM', 'TAL', 'SOR', 'IAN'],
  ] as readonly (readonly string[])[],
  goeticTools: [
    {
      id: 'bloodstone-dagger',
      name: { fr: 'Dague de pierre de sang', en: 'Bloodstone Dagger' },
      craft: { fr: 'Compagnon · SD 14 · 4 h · Coût 500 c.', en: 'Journeyman · DC 14 · 4 hrs · Cost 500 cr.' },
      effect: {
        fr: 'P/T, 2d6, Saignement 25 %, Fiab. 5. Composant indispensable du Rituel de la peau de bouc.',
        en: 'P/S, 2d6, Bleed 25%, Rel 5. Required tool for the Ritual of the Goat Skin.',
      },
    },
    {
      id: 'goatskin-mantle',
      name: { fr: 'Manteau en peau de bouc', en: 'Goat Skin Mantle' },
      craft: { fr: 'Rituel (SD 16, 30 rounds, Inv. 400 c.)', en: 'Ritual (DC 16, 30 rounds, Inv. 400 cr.)' },
      effect: {
        fr: 'Empêche Bes de vous posséder dès l’apparition, Casglydd de vous happer dans l’ombre et Mari Lwyd de tout réquisitionner.',
        en: 'Prevents instant possession (Bes), shadow drag (Casglydd), or seizing the whole building (Mari Lwyd).',
      },
    },
    {
      id: 'earthly-ribbons',
      name: { fr: 'Rubans terrestres (Mari Lwyd)', en: 'Earthly Ribbons (Mari Lwyd)' },
      craft: { fr: 'Maître · SD 22 · 10 h · Coût 1 352 c.', en: 'Master · DC 22 · 10 hrs · Cost 1,352 cr.' },
      effect: {
        fr: 'Empêche un Mari Lwyd d’abandonner sa forme physique pendant 1 an (retirable par quiconque sauf le démon).',
        en: 'Locks a Mari Lwyd out of shifting forms for 1 year unless removed by someone else.',
      },
    },
    {
      id: 'cerebral-elixir',
      name: { fr: 'Élixir cérébral (Bes)', en: 'Cerebral Elixir (Bes)' },
      craft: { fr: 'Alchimie Maître · SD 22 · 10 h · Coût 1 332 c.', en: 'Master Alchemy · DC 22 · 10 hrs · Cost 1,332 cr.' },
      effect: {
        fr: 'Immunise contre la possession d’un Bes pendant 24 h (ou l’expulse immédiatement si déjà possédé).',
        en: 'Prevents Bes possession for 24h (or forces a possessing Bes out immediately).',
      },
    },
    {
      id: 'centerpiece',
      name: { fr: 'Pièce maîtresse (Casglydd)', en: 'Centerpiece (Casglydd)' },
      craft: { fr: 'Beaux-arts Maître · SD 22 · 10 h · Inv. ≥ 700 c.', en: 'Master Fine Arts · DC 22 · 10 hrs · Inv. ≥ 700 cr.' },
      effect: {
        fr: 'Objet unique à ≥ 3 matériaux détournant l’obsession d’un Casglydd sur lui plutôt que sur vous.',
        en: 'Unique 3+ material masterpiece that redirects a Casglydd’s fixation away from you.',
      },
    },
    {
      id: 'wand-of-banishment',
      name: { fr: 'Baguette de bannissement', en: 'Wand of Banishment' },
      craft: { fr: 'Compagnon · SD 17 · 9 h · Coût 800 c.', en: 'Journeyman · DC 17 · 9 hrs · Cost 800 cr.' },
      effect: {
        fr: 'Gravée au nom d’un démon : un coup au corps-à-corps le bannit 24 h (50 % de bris, 100 % sur Démon majeur).',
        en: 'Carved with one demon’s name: a melee hit banishes it for 24h (50% break chance, 100% vs Greater).',
      },
    },
    {
      id: 'staff-of-binding',
      name: { fr: 'Bâton & Véritable Bâton d’asservissement', en: 'Staff & True Staff of Binding' },
      craft: {
        fr: 'Bâton (Maître SD 19, 1 332 c.) → Véritable (Grand Maître SD 25, 2 320 c.)',
        en: 'Staff (Master DC 19, 1,332 cr.) → True (Grand Master DC 25, 2,320 cr.)',
      },
      effect: {
        fr: 'Focaliseur (3) + Focalisation supérieure. Seul le Véritable Bâton perce la cage d’argent du Rituel d’asservissement.',
        en: 'Focus (3) + Greater Focus. Only the True Staff penetrates the Ritual of Binding barrier.',
      },
    },
  ] as readonly GoeticToolEntry[],
};
