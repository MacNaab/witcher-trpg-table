import { ARMOR_DATA } from './armorData';
import { COMPONENTS_DATA } from './componentsData';
import { DIAGRAMS_DATA } from './diagramsData';
import { EXPERIMENTAL_TECH_DATA } from './experimentalTechData';
import { FORMULAE_DATA } from './formulaeData';
import { GEAR_ITEMS } from './gearData';
import { MAGIC_ITEMS_DATA, TROPHIES_DATA } from './magicItemsData';
import { MUTAGENS_DATA } from './mutagensData';
import { POTIONS_DATA } from './potionsData';
import { RELICS_DATA } from './relicsData';
import { RUNES_GLYPHS_DATA } from './runesGlyphsData';
import { WEAPONS_DATA } from './weaponsData';

export * from './types';
export { ARMOR_DATA } from './armorData';
export { COMPONENTS_DATA } from './componentsData';
export { DIAGRAMS_DATA } from './diagramsData';
export { EXPERIMENTAL_TECH_DATA } from './experimentalTechData';
export { FORMULAE_DATA } from './formulaeData';
export { GEAR_ITEMS } from './gearData';
export { MAGIC_ITEMS_DATA, TROPHIES_DATA } from './magicItemsData';
export { MUTAGENS_DATA } from './mutagensData';
export { POTIONS_DATA } from './potionsData';
export { RELICS_DATA } from './relicsData';
export { RUNES_GLYPHS_DATA } from './runesGlyphsData';
export { WEAPONS_DATA } from './weaponsData';

/**
 * Tailoring standard raw textiles always offered alongside rolled Tailor inventory.
 */
export const TAILORING_BASE_MATERIALS = [
  {
    id: 'tl-raw-fiber',
    name: { en: 'Raw Fiber', fr: 'Fibre brute' },
    rarity: 'P' as const,
    price: 1,
  },
  {
    id: 'tl-thread',
    name: { en: 'Thread', fr: 'Fil' },
    rarity: 'P' as const,
    price: 1,
  },
  {
    id: 'tl-linen',
    name: { en: 'Linen', fr: 'Lin' },
    rarity: 'P' as const,
    price: 7,
  },
  {
    id: 'tl-cotton',
    name: { en: 'Cotton', fr: 'Coton' },
    rarity: 'P' as const,
    price: 2,
  },
  {
    id: 'tl-silk',
    name: { en: 'Silk', fr: 'Soie' },
    rarity: 'I' as const,
    price: 14,
  },
] as const;

/**
 * Summary counts across the unified item, equipment, alchemy, and crafting compendium.
 */
export const ITEMS_COMPENDIUM_COUNTS = {
  gear: GEAR_ITEMS.length,
  weapons: WEAPONS_DATA.length,
  armor: ARMOR_DATA.length,
  potions: POTIONS_DATA.length,
  formulae: FORMULAE_DATA.length,
  components: COMPONENTS_DATA.length,
  diagrams: DIAGRAMS_DATA.length,
  relics: RELICS_DATA.length,
  experimentalTech: EXPERIMENTAL_TECH_DATA.length,
  runesGlyphs: RUNES_GLYPHS_DATA.length,
  magicItems: MAGIC_ITEMS_DATA.length,
  trophies: TROPHIES_DATA.length,
  mutagens: MUTAGENS_DATA.length,
} as const;
