import type { LocalizedText } from '@/src/data/bestiary/types';
import {
  ARMOR_DATA,
  COMPONENTS_DATA,
  DIAGRAMS_DATA,
  FORMULAE_DATA,
  GEAR_ITEMS,
  POTIONS_DATA,
  WEAPONS_DATA,
} from '@/src/data/items';
import type {
  CharacterProfessionId,
  ModuleLanguage,
  StarterEquipmentCategory,
  StarterGearOption,
} from '../types';

export interface ProfessionGearKit {
  pickLimit: number;
  freeItems: readonly StarterGearOption[];
  selectableItems: readonly StarterGearOption[];
}

/**
 * Curated starting equipment checklists per profession (typos from legacy HTML/JS fixed).
 */
export const PROFESSION_STARTER_KITS: Record<
  CharacterProfessionId,
  ProfessionGearKit
> = {
  craftsman: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      {
        id: 'cr-compo',
        name: { en: '50 Crowns of Components', fr: '50 couronnes de composants' },
        weight: 0,
        category: 'component',
        description: {
          en: 'Assorted crafting and alchemical raw materials worth 50 crowns.',
          fr: 'Assortiment de matériaux d’artisanat et composants alchimiques d’une valeur de 50 couronnes.',
        },
      },
      { id: 'cr-lock', name: { en: 'Lock', fr: 'Serrure' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-lock' },
      { id: 'cr-chest', name: { en: 'Wooden Chest', fr: 'Petit coffre' }, weight: 1, category: 'gear', catalogItemId: 'eq-wooden-chest' },
      { id: 'cr-alch', name: { en: 'Alchemy Set', fr: "Ensemble d'alchimie" }, weight: 3, category: 'gear', catalogItemId: 'eq-alchemy-set' },
      { id: 'cr-forge', name: { en: 'Portable Forge', fr: 'Forge portable' }, weight: 5, category: 'gear', catalogItemId: 'eq-tinkers-forge' },
      { id: 'cr-tools', name: { en: 'Artisan Tools', fr: "Outils d'artisan" }, weight: 5, category: 'gear', catalogItemId: 'eq-crafting-tools' },
      { id: 'cr-mtools', name: { en: 'Merchant Tools', fr: 'Outils de marchand' }, weight: 1.5, category: 'gear', catalogItemId: 'eq-merchants-tools' },
      { id: 'cr-hour', name: { en: 'Hourglass', fr: 'Sablier' }, weight: 1, category: 'gear', catalogItemId: 'eq-hourglass' },
      { id: 'cr-sword', name: { en: 'Iron Longsword', fr: 'Épée longue de fer' }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-iron-longsword' },
      { id: 'cr-mace', name: { en: 'Mace', fr: "Masse d'armes" }, weight: 2, category: 'weapon', catalogItemId: 'wp-mace' },
    ],
  },
  bard: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'bd-purse', name: { en: 'Coin Purse', fr: 'Bourse' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-purse' },
      { id: 'bd-garter', name: { en: 'Garter Sheath', fr: 'Fourreau de jarretière' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-garter-sheath' },
      { id: 'bd-inst', name: { en: 'Musical Instrument', fr: 'Instrument' }, weight: 1, category: 'gear', catalogItemId: 'eq-instrument' },
      { id: 'bd-liq', name: { en: 'Spirit / Liquor', fr: 'Flasque d’alcool' }, weight: 1, category: 'gear', catalogItemId: 'eq-liqueur' },
      { id: 'bd-mir', name: { en: 'Pocket Mirror', fr: 'Miroir de poche' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-hand-mirror' },
      { id: 'bd-jour', name: { en: 'Locked Journal', fr: 'Journal cadenassé' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-journal' },
      { id: 'bd-gwynt', name: { en: 'Gwent Deck', fr: 'Jeu de Gwynt' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-gwent-deck' },
      { id: 'bd-perf', name: { en: 'Perfume / Cologne', fr: 'Parfum / eau de toilette' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-perfume' },
      { id: 'bd-dice', name: { en: 'Dice Poker Set', fr: 'Piste de dé' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-dice-poker' },
      { id: 'bd-dag', name: { en: 'Dagger', fr: 'Dague' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-dagger' },
    ],
  },
  criminal: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'cm-chl', name: { en: 'Chloroform', fr: 'Chloroforme' }, weight: 0.1, category: 'gear', catalogItemId: 'al-chloroform' },
      { id: 'cm-dice', name: { en: 'Loaded Dice', fr: 'Dés pipés' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-loaded-dice' },
      { id: 'cm-slv', name: { en: 'Wrist Sheath', fr: 'Fourreau de manche' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-sleeve-sheath' },
      { id: 'cm-lnt', name: { en: 'Bullseye Lantern', fr: 'Lanterne sourde' }, weight: 1, category: 'gear', catalogItemId: 'eq-bullseye-lantern' },
      { id: 'cm-tl', name: { en: "Thieves' Tools", fr: 'Outils de voleur' }, weight: 1, category: 'gear', catalogItemId: 'eq-thieves-tools' },
      { id: 'cm-pkt', name: { en: 'Secret Pocket', fr: 'Poche secrète' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-secret-pocket' },
      { id: 'cm-sat', name: { en: 'Satchel', fr: 'Sacoche' }, weight: 1, category: 'gear', catalogItemId: 'eq-satchel' },
      { id: 'cm-knk', name: { en: 'Brass Knuckles', fr: 'Coup-de-poing' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-brass-knuckles' },
      { id: 'cm-tkn', name: { en: 'Throwing Knives (x5)', fr: 'Couteau de lancer x5' }, weight: 2.5, category: 'weapon', catalogItemId: 'wp-throwing-knife' },
      { id: 'cm-stl', name: { en: 'Stiletto', fr: 'Stylet' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-stiletto' },
    ],
  },
  doctor: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'dc-cnd', name: { en: 'Candles (x10)', fr: 'Bougies x10' }, weight: 1, category: 'component', catalogItemId: 'eq-candles-5' },
      { id: 'dc-blk', name: { en: 'Bedroll / Blanket', fr: 'Couverture' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-bedroll' },
      { id: 'dc-str', name: { en: 'Sterilizing Fluid (x10)', fr: 'Fluide stérilisant x10' }, weight: 1, category: 'component', catalogItemId: 'al-sterilizing-fluid' },
      { id: 'dc-tnt', name: { en: 'Large Tent', fr: 'Grande tente' }, weight: 8, category: 'gear', catalogItemId: 'eq-tent-large' },
      { id: 'dc-hrb', name: { en: 'Numbing Herbs (x10)', fr: 'Herbes engourdissantes x10' }, weight: 1, category: 'component', catalogItemId: 'al-numbing-herbs' },
      { id: 'dc-kit', name: { en: "Surgeon's Kit", fr: 'Instruments chirurgicaux' }, weight: 1, category: 'gear', catalogItemId: 'eq-surgeons-kit' },
      { id: 'dc-wrt', name: { en: 'Writing Kit', fr: 'Nécessaire d’écriture' }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'dc-cld', name: { en: 'Clotting Powder (x10)', fr: 'Poudre de coagulation x10' }, weight: 1, category: 'component', catalogItemId: 'al-clotting-powder' },
      { id: 'dc-hr', name: { en: 'Hourglass', fr: 'Sablier (1 heure)' }, weight: 1, category: 'gear', catalogItemId: 'eq-hourglass' },
      { id: 'dc-dag', name: { en: 'Dagger', fr: 'Dague' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-dagger' },
    ],
  },
  'man-at-arms': {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'ma-sat', name: { en: 'Satchel', fr: 'Sacoche' }, weight: 1, category: 'gear', catalogItemId: 'eq-satchel' },
      { id: 'ma-pnt', name: { en: 'Reinforced Trousers', fr: 'Pantalon renforcé' }, weight: 2.5, category: 'armor', catalogItemId: 'ar-armored-trousers' },
      { id: 'ma-brg', name: { en: 'Brigandine', fr: 'Brigandine' }, weight: 7, category: 'armor', catalogItemId: 'ar-brigandine' },
      { id: 'ma-cm', name: { en: 'Mail Coif / Camail', fr: 'Camail' }, weight: 1.5, category: 'armor', catalogItemId: 'ar-chain-coif' },
      { id: 'ma-axe', name: { en: 'Battle Axe', fr: 'Hache de bataille' }, weight: 2, category: 'weapon', catalogItemId: 'wp-battle-axe' },
      { id: 'ma-xcb', name: { en: 'Crossbow + 20 Bolts', fr: 'Arbalète avec 20 carreaux' }, weight: 3, category: 'weapon', catalogItemId: 'wp-crossbow' },
      { id: 'ma-krd', name: { en: 'Kord', fr: 'Kord' }, weight: 1, category: 'weapon', catalogItemId: 'wp-kord' },
      { id: 'ma-spr', name: { en: 'Spear', fr: 'Lance' }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-spear' },
      { id: 'ma-tkn', name: { en: 'Throwing Knives (x5)', fr: 'Couteau de lancer x5' }, weight: 2.5, category: 'weapon', catalogItemId: 'wp-throwing-knife' },
      { id: 'ma-shd', name: { en: 'Steel Buckler', fr: "Bocle d'acier" }, weight: 1, category: 'shield', catalogItemId: 'ar-steel-buckler' },
    ],
  },
  mage: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      {
        id: 'mg-comp',
        name: { en: '100 Crowns of Components', fr: '100 couronnes de composants' },
        weight: 0,
        category: 'component',
        description: {
          en: 'Alchemical and ritual components worth 100 crowns.',
          fr: 'Réserve de composants alchimiques et rituels d’une valeur de 100 couronnes.',
        },
      },
      { id: 'mg-prs', name: { en: 'Coin Purse', fr: 'Bourse' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-purse' },
      { id: 'mg-grt', name: { en: 'Garter Sheath', fr: 'Fourreau de jarretière' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-garter-sheath' },
      { id: 'mg-jrn', name: { en: 'Journal', fr: 'Journal' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-journal' },
      { id: 'mg-mir', name: { en: 'Pocket Mirror', fr: 'Miroir de poche' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-hand-mirror' },
      { id: 'mg-wrt', name: { en: 'Writing Kit', fr: 'Nécessaire d’écriture' }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'mg-hr', name: { en: 'Hourglass', fr: 'Sablier' }, weight: 1, category: 'gear', catalogItemId: 'eq-hourglass' },
      { id: 'mg-mkp', name: { en: 'Cosmetics Kit', fr: 'Trousse de maquillage' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-makeup-kit' },
      { id: 'mg-stf', name: { en: 'Staff', fr: 'Bâton' }, weight: 2.5, category: 'weapon', catalogItemId: 'wp-staff' },
      { id: 'mg-dag', name: { en: 'Dagger', fr: 'Dague' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-dagger' },
    ],
  },
  merchant: {
    pickLimit: 3,
    freeItems: [
      {
        id: 'mr-free-cart',
        name: {
          en: 'Mule + Cart with 1,000 Crowns of Common Goods',
          fr: "Mule + chariot avec 1 000 couronnes d'articles courants",
        },
        weight: 0,
        category: 'gear',
        description: {
          en: 'Pack mule, merchant wagon, and trade stock worth 1,000 crowns of common merchandise.',
          fr: 'Mule de bât, chariot marchand et stock commercial de 1 000 couronnes en marchandises courantes.',
        },
      },
    ],
    selectableItems: [
      { id: 'mr-tnt', name: { en: 'Large Tent', fr: 'Grande tente' }, weight: 8, category: 'gear', catalogItemId: 'eq-tent-large' },
      { id: 'mr-jrn', name: { en: 'Journal', fr: 'Journal' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-journal' },
      { id: 'mr-wrt', name: { en: 'Writing Kit', fr: 'Nécessaire d’écriture' }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'mr-mtl', name: { en: 'Merchant Tools', fr: 'Outils de marchand' }, weight: 1.5, category: 'gear', catalogItemId: 'eq-merchants-tools' },
      { id: 'mr-xcb', name: { en: 'Crossbow + 20 Bolts', fr: 'Arbalète avec 20 carreaux' }, weight: 3, category: 'weapon', catalogItemId: 'wp-crossbow' },
      { id: 'mr-dag', name: { en: 'Dagger', fr: 'Dague' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-dagger' },
    ],
  },
  priest: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      {
        id: 'pr-comp',
        name: { en: '100 Crowns of Components', fr: '100 couronnes de composants' },
        weight: 0,
        category: 'component',
        description: {
          en: 'Sacred herbs and ritual components worth 100 crowns.',
          fr: 'Herbes consacrées et composants rituels d’une valeur de 100 couronnes.',
        },
      },
      { id: 'pr-alch', name: { en: 'Alchemy Set', fr: 'Ensemble d’alchimie' }, weight: 3, category: 'gear', catalogItemId: 'eq-alchemy-set' },
      { id: 'pr-str', name: { en: 'Sterilizing Fluid (x5)', fr: 'Fluide stérilisant x5' }, weight: 0.5, category: 'component', catalogItemId: 'al-sterilizing-fluid' },
      { id: 'pr-hrb', name: { en: 'Numbing Herbs (x5)', fr: 'Herbes engourdissantes x5' }, weight: 0.5, category: 'component', catalogItemId: 'al-numbing-herbs' },
      { id: 'pr-kit', name: { en: "Surgeon's Kit", fr: 'Instruments chirurgicaux' }, weight: 1, category: 'gear', catalogItemId: 'eq-surgeons-kit' },
      { id: 'pr-cld', name: { en: 'Clotting Powder (x5)', fr: 'Poudre de coagulation x5' }, weight: 0.5, category: 'component', catalogItemId: 'al-clotting-powder' },
      { id: 'pr-hr', name: { en: 'Hourglass', fr: 'Sablier' }, weight: 1, category: 'gear', catalogItemId: 'eq-hourglass' },
      { id: 'pr-sym', name: { en: 'Sacred Symbol', fr: 'Symbole sacré' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-holy-symbol' },
      { id: 'pr-stf', name: { en: 'Walking Staff', fr: 'Bâton' }, weight: 3, category: 'weapon', catalogItemId: 'wp-quarterstaff-tool' },
      { id: 'pr-dag', name: { en: 'Dagger', fr: 'Dague' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-dagger' },
    ],
  },
  witcher: {
    pickLimit: 2,
    freeItems: [
      {
        id: 'wt-free-med',
        name: { en: 'Witcher Medallion', fr: 'Médaillon de sorceleur' },
        weight: 0.1,
        category: 'gear',
        description: {
          en: 'Silver school medallion that vibrates in the presence of magic, active spells, or nearby monsters.',
          fr: 'Médaillon d’école en argent qui vibre en présence de magie, de sortilèges ou de monstres à proximité.',
        },
      },
      { id: 'wt-free-slv', name: { en: 'Witcher Silver Sword', fr: "Épée d'argent de sorceleur" }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-witcher-silver' },
      { id: 'wt-free-stl', name: { en: 'Witcher Steel Sword', fr: "Épée d'acier de sorceleur" }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-witcher-steel' },
    ],
    selectableItems: [
      { id: 'wt-alch', name: { en: 'Alchemy Set', fr: "Ensemble d'alchimie" }, weight: 3, category: 'gear', catalogItemId: 'eq-alchemy-set' },
      { id: 'wt-hrs', name: { en: 'Horse', fr: 'Cheval' }, weight: 0, category: 'gear', catalogItemId: 'eq-location-de-cheval' },
      { id: 'wt-hxb', name: { en: 'Hand Crossbow', fr: 'Arbalète de poing' }, weight: 1, category: 'weapon', catalogItemId: 'wp-hand-crossbow' },
      { id: 'wt-tkn', name: { en: 'Throwing Knives (x5)', fr: 'Couteau de lancer x5' }, weight: 2.5, category: 'weapon', catalogItemId: 'wp-throwing-knife' },
      { id: 'wt-gmb', name: { en: 'Reinforced Gambeson', fr: 'Gambison à tissage renforcé' }, weight: 2.5, category: 'armor', catalogItemId: 'ar-double-woven-gambeson' },
    ],
  },
  vampire: {
    pickLimit: 3,
    freeItems: [],
    selectableItems: [
      {
        id: 'vp-comp',
        name: { en: '100 Crowns of Components', fr: '100 couronnes de composants' },
        weight: 0,
        category: 'component',
        description: {
          en: 'Assorted rare components worth 100 crowns.',
          fr: 'Assortiment de composants d’une valeur de 100 couronnes.',
        },
      },
      { id: 'vp-50c', name: { en: 'Purse with 50 Crowns', fr: 'Bourse de 50 couronnes' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-purse' },
      { id: 'vp-kit', name: { en: "Surgeon's Kit", fr: 'Instruments chirurgicaux' }, weight: 1, category: 'gear', catalogItemId: 'eq-surgeons-kit' },
      { id: 'vp-inst', name: { en: 'Musical Instrument', fr: 'Instrument' }, weight: 1, category: 'gear', catalogItemId: 'eq-instrument' },
      { id: 'vp-wrt', name: { en: 'Writing Kit', fr: 'Nécessaire d’écriture' }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'vp-art', name: { en: 'Artisan Tools', fr: "Outils d'artisan" }, weight: 5, category: 'gear', catalogItemId: 'eq-crafting-tools' },
      { id: 'vp-alch', name: { en: 'Alchemy Set', fr: "Ensemble d'alchimie" }, weight: 3, category: 'gear', catalogItemId: 'eq-alchemy-set' },
      { id: 'vp-nob', name: { en: 'Noble Clothing', fr: 'Vêtements nobles' }, weight: 1, category: 'gear', catalogItemId: 'eq-fashionable-clothing' },
      { id: 'vp-thf', name: { en: "Thieves' Tools", fr: 'Outils de voleur' }, weight: 1, category: 'gear', catalogItemId: 'eq-thieves-tools' },
      { id: 'vp-ckw', name: { en: 'Cookware', fr: 'Ustensiles de cuisine' }, weight: 2, category: 'gear', catalogItemId: 'eq-cooking-tools' },
    ],
  },
  noble: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'nb-jwl', name: { en: 'Jewelry', fr: 'Bijou' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-jewelry' },
      { id: 'nb-hrs', name: { en: 'Horse', fr: 'Cheval' }, weight: 0, category: 'gear', catalogItemId: 'eq-location-de-cheval' },
      { id: 'nb-ink', name: { en: 'Invisible Ink', fr: 'Encre invisible' }, weight: 0.1, category: 'gear', catalogItemId: 'al-invisible-ink' },
      { id: 'nb-jrn', name: { en: 'Locked Journal', fr: 'Journal cadenassé' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-journal' },
      { id: 'nb-wrt', name: { en: 'Writing Kit', fr: 'Nécessaire d’écriture' }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'nb-prf', name: { en: 'Cologne / Perfume', fr: 'Eau de toilette' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-perfume' },
      { id: 'nb-pkt', name: { en: 'Secret Pocket', fr: 'Poche secrète' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-secret-pocket' },
      { id: 'nb-mkp', name: { en: 'Cosmetics Kit', fr: 'Trousse de maquillage' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-makeup-kit' },
      { id: 'nb-clt', name: { en: 'Fashionable Clothing', fr: 'Vêtements à la mode' }, weight: 1, category: 'gear', catalogItemId: 'eq-fashionable-clothing' },
      { id: 'nb-esb', name: { en: 'Esboda', fr: 'Esboda' }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-esboda' },
    ],
  },
  peasant: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'ps-al1', name: { en: 'Ale', fr: 'Bière' }, weight: 1, category: 'gear', catalogItemId: 'eq-biere' },
      { id: 'ps-al2', name: { en: 'Another Ale', fr: 'Une autre bière' }, weight: 1, category: 'gear', catalogItemId: 'eq-biere' },
      {
        id: 'ps-crt',
        name: { en: 'Cart', fr: 'Chariot' },
        weight: 0,
        category: 'gear',
        description: {
          en: 'Simple wooden farm cart suitable for hauling tools, crops, or traveling gear.',
          fr: 'Chariot agricole simple en bois adapté au transport de marchandises ou d’outils.',
        },
      },
      { id: 'ps-wrm', name: { en: 'Warm Clothing', fr: 'Vêtements chauds' }, weight: 1.5, category: 'gear', catalogItemId: 'eq-warm-clothing' },
      { id: 'ps-ckw', name: { en: 'Cookware', fr: 'Ustensiles de cuisine' }, weight: 2, category: 'gear', catalogItemId: 'eq-cooking-tools' },
      { id: 'ps-flt', name: { en: 'Flint & Steel', fr: 'Pierre à briquet' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-flint-steel' },
      { id: 'ps-gwt', name: { en: 'Gwent Deck', fr: 'Jeu de Gwynt' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-gwent-deck' },
      { id: 'ps-sym', name: { en: 'Sacred Symbol', fr: 'Symbole sacré' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-holy-symbol' },
      { id: 'ps-pip', name: { en: 'Pipe & Tobacco', fr: 'Pipe et tabac' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-pipe' },
      { id: 'ps-bag', name: { en: 'Sack', fr: 'Sac' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-sack' },
    ],
  },
  fanatic: {
    pickLimit: 5,
    freeItems: [
      { id: 'fn-free-sym', name: { en: 'Sacred Symbol', fr: 'Symbole sacré' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-holy-symbol' },
      {
        id: 'fn-free-txt',
        name: { en: 'Sacred Text', fr: 'Texte sacré' },
        weight: 0.5,
        category: 'gear',
        description: {
          en: 'Bound religious scriptures and doctrinal prayers of your faith.',
          fr: 'Recueil d’écritures religieuses et de prières doctrinales de votre culte.',
        },
      },
    ],
    selectableItems: [
      { id: 'fn-cnd', name: { en: 'Candles (x5)', fr: 'Bougies x5' }, weight: 0.5, category: 'component', catalogItemId: 'eq-candles-5' },
      { id: 'fn-knk', name: { en: 'Brass Knuckles', fr: 'Coup-de-poing' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-brass-knuckles' },
      { id: 'fn-fch', name: { en: 'Hunter’s Falchion', fr: 'Fauchon de chasseur' }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-hunters-falchion' },
      { id: 'fn-gmb', name: { en: 'Gambeson', fr: 'Gambison' }, weight: 2, category: 'armor', catalogItemId: 'ar-gambeson' },
      { id: 'fn-hat', name: { en: 'Hand Axe', fr: 'Hachette' }, weight: 1, category: 'weapon', catalogItemId: 'wp-hand-axe' },
      { id: 'fn-wrt', name: { en: 'Writing Kit', fr: "Nécessaire d'écriture" }, weight: 1, category: 'gear', catalogItemId: 'eq-writing-kit' },
      { id: 'fn-flt', name: { en: 'Flint & Steel', fr: 'Pierre à briquet' }, weight: 0.1, category: 'gear', catalogItemId: 'eq-flint-steel' },
      { id: 'fn-pon', name: { en: 'Poniard', fr: 'Poignard' }, weight: 0.5, category: 'weapon', catalogItemId: 'wp-poniard' },
      { id: 'fn-tnt', name: { en: 'Tent', fr: 'Tente' }, weight: 3, category: 'gear', catalogItemId: 'eq-tent' },
      { id: 'fn-trc', name: { en: 'Torches (x5)', fr: 'Torches x5' }, weight: 2.5, category: 'gear', catalogItemId: 'wp-torch' },
    ],
  },
  outlaw: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'ol-xcb', name: { en: 'Crossbow + 20 Bolts', fr: 'Arbalète avec 20 carreaux' }, weight: 3, category: 'weapon', catalogItemId: 'wp-crossbow' },
      { id: 'ol-brg', name: { en: 'Brigandine', fr: 'Brigandine' }, weight: 7, category: 'armor', catalogItemId: 'ar-brigandine' },
      { id: 'ol-fsh', name: { en: 'Fishing Gear', fr: 'Équipement de pêche' }, weight: 1, category: 'gear', catalogItemId: 'eq-fishing-gear' },
      {
        id: 'ol-cnt',
        name: { en: '500 Counterfeit Coins', fr: 'Fausses pièces x500' },
        weight: 1,
        category: 'gear',
        description: {
          en: 'Pouch of forged coins convincing enough to pass casual inspection in taverns or markets.',
          fr: 'Bourse de 500 pièces contrefaites suffisamment crédibles pour passer une vérification rapide.',
        },
      },
      { id: 'ol-krs', name: { en: 'Kriegssschwert', fr: 'Kriegssschwert' }, weight: 2, category: 'weapon', catalogItemId: 'wp-krigsverd' },
      { id: 'ol-tnt', name: { en: 'Large Tent', fr: 'Grande tente' }, weight: 8, category: 'gear', catalogItemId: 'eq-tent-large' },
      { id: 'ol-hlb', name: { en: 'Redanian Halberd', fr: 'Hallebarde rédanienne' }, weight: 3, category: 'weapon', catalogItemId: 'wp-red-halberd' },
      { id: 'ol-mac', name: { en: 'Mace', fr: "Masse d'armes" }, weight: 2, category: 'weapon', catalogItemId: 'wp-mace' },
      { id: 'ol-art', name: { en: 'Artisan Tools', fr: "Outils d'artisan" }, weight: 5, category: 'gear', catalogItemId: 'eq-crafting-tools' },
      { id: 'ol-hrs', name: { en: 'Horse', fr: 'Cheval' }, weight: 0, category: 'gear', catalogItemId: 'eq-location-de-cheval' },
    ],
  },
  nomad: {
    pickLimit: 5,
    freeItems: [],
    selectableItems: [
      { id: 'nm-bow', name: { en: 'Short Bow + 20 Arrows', fr: 'Arc court avec 20 flèches' }, weight: 1.5, category: 'weapon', catalogItemId: 'wp-short-bow' },
      { id: 'nm-axe', name: { en: 'Battle Axe', fr: "Hache d'armes" }, weight: 2, category: 'weapon', catalogItemId: 'wp-battle-axe' },
      { id: 'nm-tax', name: { en: 'Throwing Axes (x5)', fr: 'Hache de lancer x5' }, weight: 3, category: 'weapon', catalogItemId: 'wp-throwing-axe' },
      {
        id: 'nm-hel',
        name: { en: 'Heliotite', fr: 'Héliotite' },
        weight: 0.5,
        category: 'gear',
        description: {
          en: 'Traditional nomadic gear/focus charm kept from desert and steppe travels.',
          fr: 'Équipement / talisman nomade traditionnel issu des voyages dans les steppes.',
        },
      },
      { id: 'nm-mac', name: { en: 'Mace', fr: "Masse d'armes" }, weight: 2, category: 'weapon', catalogItemId: 'wp-mace' },
      { id: 'nm-bln', name: { en: 'Racing Blinders', fr: 'Œillères de course' }, weight: 0.5, category: 'gear', catalogItemId: 'eq-racing-blinders' },
      { id: 'nm-sat', name: { en: 'Satchel', fr: 'Sacoche' }, weight: 1, category: 'gear', catalogItemId: 'eq-satchel' },
      { id: 'nm-tnt', name: { en: 'Tent', fr: 'Tente' }, weight: 3, category: 'gear', catalogItemId: 'eq-tent' },
      { id: 'nm-hrs', name: { en: 'Horse', fr: 'Cheval' }, weight: 0, category: 'gear', catalogItemId: 'eq-location-de-cheval' },
      { id: 'nm-ckw', name: { en: 'Cookware', fr: 'Ustensiles de cuisine' }, weight: 2, category: 'gear', catalogItemId: 'eq-cooking-tools' },
    ],
  },
};

export interface CompendiumPickerItem {
  id: string;
  name: LocalizedText;
  category: StarterEquipmentCategory;
  groupLabel: LocalizedText;
  weight: number;
  summary: string;
}

function parseNumericWeight(raw: string | undefined): number {
  if (!raw) return 0;
  const cleaned = raw.replace(',', '.').replace(/[^0-9.]/g, '');
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Unified searchable item catalog combining Gear, Weapons, Armor, Potions,
 * Formulae, Components, and Diagrams from `@/src/data/items`.
 */
export const COMPENDIUM_PICKER_ITEMS: readonly CompendiumPickerItem[] = [
  ...WEAPONS_DATA.map((w) => ({
    id: w.id,
    name: w.name,
    category: 'weapon' as const,
    groupLabel: { en: 'Weapon', fr: 'Arme' },
    weight: parseNumericWeight(w.weight),
    summary: `${w.damage} · ${w.range || 'CàC'}${w.effect && w.effect !== 'aucun' ? ` · ${w.effect}` : ''}`,
  })),
  ...ARMOR_DATA.map((a) => ({
    id: a.id,
    name: a.name,
    category: (a.isShield ? 'shield' : 'armor') as StarterEquipmentCategory,
    groupLabel: a.isShield ? { en: 'Shield', fr: 'Bouclier' } : { en: 'Armor', fr: 'Armure' },
    weight: parseNumericWeight(a.weight),
    summary: `PA ${a.sp} · VE ${a.ev}${a.effect && a.effect !== 'aucun' ? ` · ${a.effect}` : ''}`,
  })),
  ...GEAR_ITEMS.map((g) => ({
    id: g.id,
    name: g.name,
    category: 'gear' as const,
    groupLabel: { en: 'Gear', fr: 'Équipement' },
    weight: parseNumericWeight(g.weight),
    summary: g.effect || g.category,
  })),
  ...POTIONS_DATA.map((p) => ({
    id: p.id,
    name: p.name,
    category: 'gear' as const,
    groupLabel: { en: 'Potion / Oil', fr: 'Potion / Huile' },
    weight: 0.1,
    summary: `${p.effect} (${p.duration}, tox. ${p.toxicity})`,
  })),
  ...FORMULAE_DATA.map((f) => ({
    id: f.id,
    name: f.name,
    category: 'formula' as const,
    groupLabel: { en: 'Formula', fr: 'Formule' },
    weight: 0,
    summary: `SD ${f.dc} · ${f.time} · ${f.components}`,
  })),
  ...DIAGRAMS_DATA.map((d) => ({
    id: d.id,
    name: fDiagramLabel(d.name),
    category: 'formula' as const,
    groupLabel: { en: 'Diagram', fr: 'Schéma' },
    weight: 0,
    summary: `SD ${d.dc} · ${d.time} · ${d.components}`,
  })),
  ...COMPONENTS_DATA.map((c) => ({
    id: c.id,
    name: c.name,
    category: 'component' as const,
    groupLabel: { en: 'Component', fr: 'Composant' },
    weight: parseNumericWeight(c.weight),
    summary: `${c.rarity} · ${c.substance ?? c.location}`,
  })),
];

function fDiagramLabel(name: LocalizedText): LocalizedText {
  return { en: `Diagram: ${name.en}`, fr: `Schéma : ${name.fr}` };
}

/**
 * Resolves the starter Witcher alchemy formula dropdown lists straight from `@/src/data/items`.
 */
export function getWitcherFormulaOptions(): {
  decoctions: readonly { id: string; name: LocalizedText; components: string; dc: string }[];
  oils: readonly { id: string; name: LocalizedText; components: string; dc: string }[];
  potions: readonly { id: string; name: LocalizedText; components: string; dc: string }[];
} {
  const decoctionNamesFr = new Set(
    POTIONS_DATA.filter((p) => p.type === 'Decoctions').map((p) => p.name.fr.toLowerCase())
  );
  const oilNamesFr = new Set(
    POTIONS_DATA.filter((p) => p.type === 'Huiles').map((p) => p.name.fr.toLowerCase())
  );
  const potionNamesFr = new Set(
    POTIONS_DATA.filter((p) => p.type === 'Potions' && p.race === 'Sorceleur').map((p) => p.name.fr.toLowerCase())
  );

  const decoctions = FORMULAE_DATA.filter(
    (f) => f.id.endsWith('-dec') || decoctionNamesFr.has(f.name.fr.toLowerCase())
  ).map((f) => ({ id: f.id, name: f.name, components: f.components, dc: f.dc }));

  const oils = FORMULAE_DATA.filter(
    (f) => f.id.endsWith('-oil') || f.id === 'fm-hanged-mans-venom' || oilNamesFr.has(f.name.fr.toLowerCase())
  ).map((f) => ({ id: f.id, name: f.name, components: f.components, dc: f.dc }));

  const potions = FORMULAE_DATA.filter(
    (f) =>
      potionNamesFr.has(f.name.fr.toLowerCase()) ||
      [
        'fm-swallow',
        'fm-blizzard',
        'fm-cat',
        'fm-tawny-owl',
        'fm-maribor-forest',
        'fm-golden-oriole',
        'fm-white-honey',
        'fm-killer-whale',
        'fm-petris-philter',
        'fm-full-moon',
        'fm-black-blood',
        'fm-thunderbolt',
      ].includes(f.id)
  ).map((f) => ({ id: f.id, name: f.name, components: f.components, dc: f.dc }));

  return { decoctions, oils, potions };
}

export interface ResolvedEquipmentTooltip {
  title: string;
  categoryLabel: string;
  statsLine: string;
  description: string;
}

const WEAPON_BY_ID = new Map(WEAPONS_DATA.map((w) => [w.id, w]));
const ARMOR_BY_ID = new Map(ARMOR_DATA.map((a) => [a.id, a]));
const GEAR_BY_ID = new Map(GEAR_ITEMS.map((g) => [g.id, g]));
const POTION_BY_ID = new Map(POTIONS_DATA.map((p) => [p.id, p]));
const FORMULA_BY_ID = new Map(FORMULAE_DATA.map((f) => [f.id, f]));
const DIAGRAM_BY_ID = new Map(DIAGRAMS_DATA.map((d) => [d.id, d]));
const COMPONENT_BY_ID = new Map(COMPONENTS_DATA.map((c) => [c.id, c]));

/**
 * Resolves full localized equipment stats and description for tooltips
 * from `@/src/data/items` or starter kit fallback descriptions.
 */
export function resolveEquipmentTooltip(
  params: {
    catalogItemId?: string;
    name: string;
    weight?: number;
    fallbackDescription?: string;
  },
  lang: ModuleLanguage
): ResolvedEquipmentTooltip {
  const { catalogItemId, name, weight, fallbackDescription } = params;

  if (catalogItemId) {
    const weapon = WEAPON_BY_ID.get(catalogItemId);
    if (weapon) {
      const dmgLabel = lang === 'fr' ? 'Dégâts' : 'DMG';
      const accLabel = lang === 'fr' ? 'Préc.' : 'WA';
      const relLabel = lang === 'fr' ? 'Fiab.' : 'Rel.';
      const rngLabel = lang === 'fr' ? 'Portée' : 'Range';
      const handsLabel = lang === 'fr' ? 'Mains' : 'Hands';
      const priceLabel = lang === 'fr' ? 'Prix' : 'Price';
      const effectText =
        weapon.effect && weapon.effect !== 'aucun'
          ? weapon.effect
          : lang === 'fr'
            ? `Type de dégâts : ${weapon.damageType || 'Standard'}. Dissimulation : ${weapon.concealment}.`
            : `Damage type: ${weapon.damageType || 'Standard'}. Concealment: ${weapon.concealment}.`;
      return {
        title: weapon.name[lang],
        categoryLabel: weapon.category,
        statsLine: `${dmgLabel} ${weapon.damage} · ${accLabel} ${weapon.accuracy} · ${relLabel} ${weapon.reliability} · ${handsLabel} ${weapon.hands} · ${rngLabel} ${weapon.range} · ${priceLabel} ${weapon.priceDisplay}`,
        description: effectText,
      };
    }

    const armor = ARMOR_BY_ID.get(catalogItemId);
    if (armor) {
      const spLabel = lang === 'fr' ? 'PA' : 'SP';
      const evLabel = lang === 'fr' ? 'VE' : 'EV';
      const enhLabel = lang === 'fr' ? 'Amélio.' : 'Enh.';
      const priceLabel = lang === 'fr' ? 'Prix' : 'Price';
      const catLabel = armor.isShield
        ? lang === 'fr'
          ? 'Bouclier'
          : 'Shield'
        : `${lang === 'fr' ? 'Armure' : 'Armor'} (${armor.category})`;
      const effectText =
        armor.effect && armor.effect !== 'aucun'
          ? armor.effect
          : lang === 'fr'
            ? `Protection d’armure ${armor.sp}, valeur d’encombrement ${armor.ev}.`
            : `Armor stopping power ${armor.sp}, encumbrance value ${armor.ev}.`;
      return {
        title: armor.name[lang],
        categoryLabel: catLabel,
        statsLine: `${spLabel} ${armor.sp} · ${evLabel} ${armor.ev} · ${enhLabel} ${armor.enhancements} · ${priceLabel} ${armor.priceDisplay}`,
        description: effectText,
      };
    }

    const gear = GEAR_BY_ID.get(catalogItemId);
    if (gear) {
      const priceLabel = lang === 'fr' ? 'Prix' : 'Price';
      const weightLabel = lang === 'fr' ? 'Poids' : 'Weight';
      return {
        title: gear.name[lang],
        categoryLabel: gear.category,
        statsLine: `${weightLabel}: ${gear.weight} · ${priceLabel}: ${gear.priceDisplay} (${gear.availability})`,
        description: gear.effect || fallbackDescription || gear.category,
      };
    }

    const potion = POTION_BY_ID.get(catalogItemId);
    if (potion) {
      const durLabel = lang === 'fr' ? 'Durée' : 'Duration';
      const toxLabel = lang === 'fr' ? 'Toxicité' : 'Toxicity';
      return {
        title: potion.name[lang],
        categoryLabel: potion.type,
        statsLine: `${durLabel}: ${potion.duration} · ${toxLabel}: ${potion.toxicity} · ${potion.priceDisplay}`,
        description: potion.effect,
      };
    }

    const formula = FORMULA_BY_ID.get(catalogItemId);
    if (formula) {
      const dcLabel = lang === 'fr' ? 'SD' : 'DC';
      const timeLabel = lang === 'fr' ? 'Temps' : 'Time';
      const compLabel = lang === 'fr' ? 'Composants' : 'Components';
      return {
        title: formula.name[lang],
        categoryLabel: lang === 'fr' ? 'Formule alchimique' : 'Alchemy Formula',
        statsLine: `${dcLabel} ${formula.dc} · ${timeLabel}: ${formula.time}`,
        description: `${compLabel}: ${formula.components}`,
      };
    }

    const diagram = DIAGRAM_BY_ID.get(catalogItemId);
    if (diagram) {
      const dcLabel = lang === 'fr' ? 'SD' : 'DC';
      const timeLabel = lang === 'fr' ? 'Temps' : 'Time';
      const compLabel = lang === 'fr' ? 'Composants' : 'Components';
      return {
        title: diagram.name[lang],
        categoryLabel: lang === 'fr' ? 'Schéma d’artisanat' : 'Crafting Diagram',
        statsLine: `${dcLabel} ${diagram.dc} · ${timeLabel}: ${diagram.time} · ${diagram.price} cr.`,
        description: `${compLabel}: ${diagram.components}`,
      };
    }

    const component = COMPONENT_BY_ID.get(catalogItemId);
    if (component) {
      const dcLabel = lang === 'fr' ? 'SD' : 'DC';
      const locLabel = lang === 'fr' ? 'Origine' : 'Location';
      return {
        title: component.name[lang],
        categoryLabel: lang === 'fr' ? 'Composant' : 'Component',
        statsLine: `${component.rarity} · ${dcLabel} ${component.dc} · ${component.price} cr.`,
        description: `${locLabel}: ${component.location}${component.substance ? ` · ${component.substance}` : ''}`,
      };
    }
  }

  return {
    title: name,
    categoryLabel: lang === 'fr' ? 'Équipement' : 'Equipment',
    statsLine:
      weight !== undefined
        ? `${lang === 'fr' ? 'Poids' : 'Weight'}: ${weight} kg`
        : '',
    description:
      fallbackDescription ||
      (lang === 'fr'
        ? 'Équipement de départ de la profession.'
        : 'Profession starting equipment.'),
  };
}

