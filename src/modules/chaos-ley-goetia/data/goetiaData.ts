import type {
  DemonBenefitTier,
  GoeticRitualDef,
  GoeticToolDef,
} from '../types';

/**
 * Exact 1d10 (rows 0-9) x 1d6 (cols 0-5) Demon True Name Generator matrix
 * from "A Tome of Chaos" (09_goetia.md lines 89-100).
 */
export const DEMON_SYLLABLE_MATRIX: readonly (readonly string[])[] = [
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
];

export const GOETIA_BENEFITS: readonly DemonBenefitTier[] = [
  {
    tier: 'unbound',
    label: { fr: 'Libre (Pacte)', en: 'Unbound' },
    effects: {
      bes: {
        fr: 'Possède votre corps pour conférer une puissance physique prodigieuse et traque une cible désignée pour la tuer, mais massacre quiconque se met en travers.',
        en: 'Possesses your body to grant immense physical might and hunts down one target you name, slaughtering anyone in the way.',
      },
      casglydd: {
        fr: 'Échange n’importe quel savoir qu’il a collecté contre un objet de son choix. À la remise de l’objet, vous apprenez aussitôt le secret.',
        en: 'Trades one piece of collected knowledge for an item of its choosing. Upon delivery, you immediately learn the secret.',
      },
      mari_lwyd: {
        fr: 'Fournit toute combinaison d’objets d’une valeur maximale de 3 000 couronnes. Reviendra réclamer un dû de valeur comparable plus tard.',
        en: 'Offers items totaling up to 3,000 crowns in value. Will return in the near future for something of equal worth.',
      },
    },
  },
  {
    tier: 'bound',
    label: { fr: 'Asservi (Lié)', en: 'Bound' },
    effects: {
      bes: {
        fr: 'Piégé dans votre corps : porte vos Réflexes et Dextérité à 12 et confère la capacité Sang bouillant tant qu’il reste lié.',
        en: 'Trapped inside your body: raises Reflex & Dexterity to 12 and grants the Boiling Blood ability while bound.',
      },
      casglydd: {
        fr: 'Parlez-lui à travers les ombres et posez n’importe quelle question dont un mortel a déjà connu la réponse : il trouve la réponse en 1 semaine.',
        en: 'Speak to it through shadows and ask any question a mortal ever knew the answer to; retrieves the answer within 1 week.',
      },
      mari_lwyd: {
        fr: 'Invoquez-le pour exiger un objet d’au plus 3 000 couronnes ; il l’apporte à contrecœur sous 1 semaine sans pouvoir réclamer de paiement.',
        en: 'Summon it and demand any item up to 3,000 crowns; retrieves it grudgingly within 1 week with no repayment.',
      },
    },
  },
  {
    tier: 'greater_unbound',
    label: { fr: 'Supérieur Libre', en: 'Greater Unbound' },
    effects: {
      bes: {
        fr: 'Même pacte de possession meurtrière qu’un Bes ordinaire, avec la puissance dévastatrice d’un démon supérieur sur tout obstacle.',
        en: 'Same murderous possession deal as a standard Bes, unleashing Greater Demon devastation on anything in its path.',
      },
      casglydd: {
        fr: 'Échange tout savoir de ce royaume ou d’au-delà contre un objet choisi. Permet d’apprendre des sorts ou magies hors de votre Profession.',
        en: 'Trades any lore from this realm or beyond for an item. Can teach spells and magic unavailable to your Profession.',
      },
      mari_lwyd: {
        fr: 'Offre des objets jusqu’à 30 000 couronnes au total ; reviendra exiger une contrepartie équivalente.',
        en: 'Offers items totaling up to 30,000 crowns; will return later to collect something of similar value.',
      },
    },
  },
  {
    tier: 'greater_bound',
    label: { fr: 'Supérieur Asservi', en: 'Greater Bound' },
    effects: {
      bes: {
        fr: 'Piégé dans votre corps : porte vos Réflexes et Dextérité à 14 et confère la capacité Sang bouillant tant qu’il reste lié.',
        en: 'Trapped inside your body: raises Reflex & Dexterity to 14 and grants the Boiling Blood ability while bound.',
      },
      casglydd: {
        fr: 'Interrogez-le à travers les ombres sur toute question accessible aux êtres de ce monde ou d’autres plans (réponse en 1 semaine, magies hors Profession incluses).',
        en: 'Speak through shadows to ask anything known to beings of this realm or others (1 week, can unlock out-of-Profession magic).',
      },
      mari_lwyd: {
        fr: 'Exigez n’importe quel objet d’une valeur maximale de 30 000 couronnes livré sous 1 semaine sans contrepartie tant que le lien tient.',
        en: 'Demand any item up to 30,000 crowns delivered within 1 week without repayment while bound.',
      },
    },
  },
];

export const GOETIC_RITUALS: readonly GoeticRitualDef[] = [
  {
    id: 'uncontrolled-summoning',
    tier: 'novice',
    name: { fr: 'Invocation incontrôlée', en: 'Uncontrolled Summoning' },
    dc: { fr: 'SD 10', en: 'DC 10' },
    prepTime: { fr: '10 Rounds', en: '10 Rounds' },
    duration: { fr: 'Instantanée', en: 'Instant' },
    staCost: '0',
    investment: 2,
    components: { fr: 'Craie ×1', en: 'Chalk ×1' },
    process: {
      fr: 'Tracez un cercle de craie, placez le groupe en demi-cercle derrière l’officiant et psalmodiez 3 syllabes au hasard (Matrice de Vrai Nom) sans relâche en visualisant votre désir.',
      en: 'Scribe a chalk circle, stand in a semicircle, and endlessly chant 3 random syllables while visualizing your heart’s desire until a demon appears.',
    },
    effect: {
      fr: 'Extrêmement périlleux : n’importe quel démon (même Supérieur) peut répondre sans aucune contrainte ni protection, attaquer ou trahir son accord.',
      en: 'Incredibly dangerous: any species (including Greater Demons) may appear unbound, hostile, or eager to break any bargain.',
    },
  },
  {
    id: 'controlled-summoning',
    tier: 'journeyman',
    name: { fr: 'Invocation contrôlée', en: 'Controlled Summoning' },
    dc: { fr: 'SD 16', en: 'DC 16' },
    prepTime: { fr: '15 Rounds', en: '15 Rounds' },
    duration: { fr: 'Instantanée', en: 'Instant' },
    staCost: '0',
    investment: 639,
    components: {
      fr: 'Bougie (×5), Essence de spectre (×2), Poussière infusée (×3), Huile (×2) + offrande spécifique',
      en: 'Candle (×5), Essence of Wraith (×2), Infused Dust (×3), Oil (×2) + demon offering',
    },
    process: {
      fr: 'Cercle de pâte (huile + poussière infusée + essence de spectre) entouré de 5 bougies et d’un appât (Bes : chair fraîche coupée ; Mari Lwyd : mets/cervoise ou festin à 100 cr. ; Casglydd : lettre promettant un bénéfice mutuel). Répétez le nom 5 fois.',
      en: 'Paste circle with 5 candles & species offering (Bes: fresh-cut flesh; Mari Lwyd: food/ale or 100-crown feast; Casglydd: introductory letter). Chant the name 5 times.',
    },
    effect: {
      fr: 'Permet de choisir l’espèce (et version Supérieure) et force l’arrivée d’un démon précis si vous connaissez son Vrai Nom. Reste mortel sans Manteau en peau de bouc ou outil dédié.',
      en: 'Lets you pick species (normal or Greater) and compels a specific demon if you chant its True Name. Still lethal without Goat Skin Mantle or tailored defenses.',
    },
  },
  {
    id: 'ritual-of-naming',
    tier: 'journeyman',
    name: { fr: 'Rituel de Nomination', en: 'Ritual of Naming' },
    dc: { fr: 'SD 18 (SD 24 Supérieur)', en: 'DC 18 (DC 24 Greater)' },
    prepTime: { fr: '20 Rounds', en: '20 Rounds' },
    duration: { fr: 'Instantanée', en: 'Instant' },
    staCost: '0',
    investment: 848,
    components: {
      fr: 'Charbon (×10), Bois durci (×20), Os de bête (×10), Poussière infusée (×3), Votre propre sang',
      en: 'Coal (×10), Hardened Timber (×20), Beast Bones (×10), Infused Dust (×3), Your Own Blood',
    },
    process: {
      fr: 'Enduisez votre peau de charbon, cinquième essence et votre sang ; tenez une branche de noisetier et plongez votre peau dans un bûcher d’os et de charbon chauffé à blanc.',
      en: 'Coat skin in coal, fifth essence & your blood; hold a hazel branch and submerge your skin in a white-hot bonfire of beast bones until it burns out.',
    },
    effect: {
      fr: 'Réussite : le Vrai Nom s’inscrit dans la croûte de charbon sans vous blesser. Échec : le nom se grave à vif dans votre chair (Marque de Lucifuge — le démon sait toujours où vous êtes).',
      en: 'Success: True Name appears harmlessly in the coal crust. Failure: burned into your flesh as a Lucifuge Mark — the demon always knows where you are.',
    },
  },
  {
    id: 'ritual-of-binding',
    tier: 'master',
    name: { fr: 'Rituel d’Asservissement', en: 'Ritual of Binding' },
    dc: { fr: 'SD 20 (SD 27 Supérieur)', en: 'DC 20 (DC 27 Greater)' },
    prepTime: { fr: '30 Rounds', en: '30 Rounds' },
    duration: { fr: '24 Heures', en: '24 Hours' },
    staCost: '0',
    investment: 1288,
    components: {
      fr: 'Bougies (×5), Essence de spectre (×2), Poussière infusée (×3), Huile (×1), Charbon (×10), Argent (×6), Carafe de votre sang, Véritable Bâton d’Asservissement',
      en: 'Candle (×5), Essence of Wraith (×2), Infused Dust (×3), Oil (×1), Coal (×10), Silver (×6), Jug of Your Own Blood, True Staff of Binding',
    },
    process: {
      fr: 'Cercle d’Invocation contrôlée doublé d’argent à l’intérieur et du Vrai Nom tracé au sang/charbon à l’extérieur. Invoquez le démon dans la cage d’argent et soumettez-le en Combat Verbal avec le Véritable Bâton d’Asservissement.',
      en: 'Silver-lined Controlled Summoning circle with the True Name written outside in blood/coal. Trap the demon and break its will in Verbal Combat using a True Staff of Binding.',
    },
    effect: {
      fr: 'Asservit indéfiniment le démon, invocable sans rituel d’invocation. Toutes les 2 semaines, le MJ teste secrètement Résister à la magie contre votre jet initial.',
      en: 'Binds the demon indefinitely, allowing ritual-free summoning. Every 2 weeks the GM secretly rolls Resist Magic against your original Ritual Crafting check.',
    },
  },
];

export const GOETIC_TOOLS: readonly GoeticToolDef[] = [
  {
    id: 'bloodstone-dagger',
    name: { fr: 'Dague en héliotrope (pierre de sang)', en: 'Bloodstone Dagger' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Artisanat (Compagnon)', en: 'Crafting (Journeyman)' },
    dc: 14,
    time: { fr: '4 Heures', en: '4 Hours' },
    investment: 254,
    cost: { fr: '500 cr.', en: '500 cr.' },
    components: {
      fr: 'Cendres (×2), Os de bête (×1), Huile d’obscurcissement (×1), Acide de gravure (×4), Poudre à aiguiser (×2), Acier (×1), Gemme (×1)',
      en: 'Ashes (×2), Beast Bones (×1), Darkening Oil (×1), Etching Acid (×4), Sharpening Grit (×2), Steel (×1), Gemstone (×1)',
    },
    effect: {
      fr: 'Dague flamberge P/T, PRÉ +0, 2d6, Fia. 5, Saignement (25%). Indispensable pour le Rituel de la Peau de bouc.',
      en: 'Flamberge dagger P/S, WA +0, 2d6, Rel. 5, Bleed (25%). Required to craft a Goat Skin Mantle.',
    },
  },
  {
    id: 'goat-skin-mantle',
    name: { fr: 'Manteau en peau de bouc', en: 'Goat Skin Mantle' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Rituel de la Peau de bouc', en: 'Ritual of the Goat Skin' },
    dc: 16,
    time: { fr: '30 Rounds (+14j jeûne)', en: '30 Rounds (+14d fast)' },
    investment: 400,
    cost: { fr: 'Rituel (400 cr.)', en: 'Ritual (400 cr.)' },
    components: {
      fr: 'Bouc (×1), Huile (×5), Charbon (×1), Dague pierre de sang, Ginatia (×2), Ellébore (×3), Herbes à tanner (×3), Verveine (×4), Bois (×10), Os (×3), Soie (×1)',
      en: 'Goat (×1), Oil (×5), Coal (×1), Bloodstone Dagger, Ginatia (×2), Hellebore (×3), Tanning Herbs (×3), Verbena (×4), Timber (×10), Bones (×3), Silk (×1)',
    },
    effect: {
      fr: 'Protège le porteur dès l’apparition : empêche le Bes de posséder d’office, le Casglydd de saisir vers les ombres et le Mari Lwyd de réclamer tout le bâtiment.',
      en: 'Protects wearer on arrival: stops Bes instant possession, Casglydd shadow snatch, and Mari Lwyd claiming the entire building.',
    },
  },
  {
    id: 'earthly-ribbons',
    name: { fr: 'Rubans terrestres', en: 'Earthly Ribbons' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Artisanat (Maître)', en: 'Crafting (Master)' },
    dc: 22,
    time: { fr: '10 Heures', en: '10 Hours' },
    investment: 676,
    cost: { fr: '1 352 cr.', en: '1,352 cr.' },
    components: {
      fr: 'Soie (×8), Cinquième essence (×3), Fil (×10)',
      en: 'Silk (×8), 5th Essence (×3), Thread (×10)',
    },
    effect: {
      fr: 'Offerts au Mari Lwyd et noués à ses bois : l’empêchent de changer de forme pendant 1 an.',
      en: 'Presented to a Mari Lwyd and tied around it: prevents shapeshifting for 1 year.',
    },
  },
  {
    id: 'cerebral-elixir',
    name: { fr: 'Élixir cérébral', en: 'Cerebral Elixir' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Alchimie (Maître)', en: 'Alchemy (Master)' },
    dc: 22,
    time: { fr: '10 Heures', en: '10 Hours' },
    investment: 666,
    cost: { fr: '1 332 cr.', en: '1,332 cr.' },
    components: {
      fr: 'Alcohest (×3), Cerveau félin (×1), Hallucinogène (×1), Ellébore (×3), Mandragore (×5), Œil-de-corbeau (×3), Tue-loup (×4), Argent (×1), Fibre han (×4)',
      en: 'Alcohest (×3), Feline Brain (×1), Hallucinogen (×1), Hellebore (×3), Mandrake Root (×5), Crow’s Eye (×3), Wolfsbane (×4), Silver (×1), Han Fiber (×4)',
    },
    effect: {
      fr: 'Immunise contre la possession d’un Bes pendant 24h (ou expulse aussitôt un Bes déjà en place).',
      en: 'Grants 24h immunity to Bes possession (or immediately expels an active Bes if drunk while possessed).',
    },
  },
  {
    id: 'centerpiece',
    name: { fr: 'Pièce maîtresse', en: 'Centerpiece' },
    rarity: { fr: 'Relique', en: 'Relic' },
    craftSkill: { fr: 'Beaux-arts (Maître)', en: 'Fine Arts (Master)' },
    dc: 22,
    time: { fr: '10 Heures', en: '10 Hours' },
    investment: 700,
    cost: { fr: 'Unique (N/A)', en: 'Unique (N/A)' },
    components: {
      fr: 'Au moins 3 matériaux différents d’un coût total minimal de 700 couronnes (pièce unique à chaque invocation).',
      en: 'At least 3 distinct materials totaling 700+ crowns investment (unique piece per summoning).',
    },
    effect: {
      fr: 'Donnée emballée à un Casglydd : détourne son obsession du personnage pour l’empêcher de vous harceler après contrat.',
      en: 'Wrapped gift that shifts a Casglydd’s obsession onto the object so it will not cling to you after a deal.',
    },
  },
  {
    id: 'wand-of-banishment',
    name: { fr: 'Baguette de bannissement', en: 'Wand of Banishment' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Artisanat (Compagnon)', en: 'Crafting (Journeyman)' },
    dc: 17,
    time: { fr: '9 Heures', en: '9 Hours' },
    investment: 405,
    cost: { fr: '800 cr.', en: '800 cr.' },
    components: {
      fr: 'Bois (×1), Cinquième essence (×2), Graisse d’ester (×2), Acier noir (×2), Acide de gravure (×5), Cire d’ogre (×3), Matière optima (×1)',
      en: 'Timber (×1), Fifth Essence (×2), Ester Grease (×2), Dark Steel (×2), Etching Acid (×5), Ogre Wax (×3), Optima Matter (×1)',
    },
    effect: {
      fr: 'Gravée au nom d’un démon : un coup au corps à corps réussi le bannit 24h (50% de casse ; se brise à coup sûr sur un Démon Supérieur).',
      en: 'Carved with one demon’s name: a successful melee hit banishes it for 24h (50% break chance; always breaks vs Greater Demon).',
    },
  },
  {
    id: 'staff-of-binding',
    name: { fr: 'Bâton d’Asservissement (incomplet)', en: 'Staff of Binding' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Artisanat (Maître)', en: 'Crafting (Master)' },
    dc: 19,
    time: { fr: '12 Heures', en: '12 Hours' },
    investment: 666,
    cost: { fr: '1 332 cr.', en: '1,332 cr.' },
    components: {
      fr: 'Bois (×4), Cinquième essence (×5), Cendres (×1), Graisse d’ester (×1), Huile de drake (×3), Cire d’ogre (×5), Gemme (×1)',
      en: 'Timber (×4), Fifth Essence (×5), Ashes (×1), Ester Grease (×1), Drake Oil (×3), Ogre Wax (×5), Gemstone (×1)',
    },
    effect: {
      fr: 'Bâton 2 mains, 2d6, Allonge, Focalisation (3), Grande Focalisation. Ne perce pas la cage d’argent du Rituel d’Asservissement.',
      en: '2H staff, 2d6, Long Reach, Focus (3), Greater Focus. Cannot pierce the silver cage of a Ritual of Binding.',
    },
  },
  {
    id: 'true-staff-of-binding',
    name: { fr: 'Véritable Bâton d’Asservissement', en: 'True Staff of Binding' },
    rarity: { fr: 'Rare', en: 'Rare' },
    craftSkill: { fr: 'Artisanat (Grand Maître)', en: 'Crafting (Grand Master)' },
    dc: 25,
    time: { fr: '13 Heures', en: '13 Hours' },
    investment: 1160,
    cost: { fr: '2 320 cr.', en: '2,320 cr.' },
    components: {
      fr: 'Bâton d’Asservissement + Météorite (×3) + Matière optima (×2) [ou liste complète]',
      en: 'Staff of Binding + Meteorite (×3) + Optima Matter (×2) [or full list]',
    },
    effect: {
      fr: 'Focalisation (3), Grande Focalisation. Seul objet capable de frapper et tourmenter un démon à travers le cercle du Rituel d’Asservissement.',
      en: 'Focus (3), Greater Focus. The only tool able to strike through the silver barrier during the Ritual of Binding.',
    },
  },
];
