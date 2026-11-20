import { ARMOR_DATA } from './armorData';
import { COMPONENTS_DATA } from './componentsData';
import { DIAGRAMS_DATA } from './diagramsData';
import { FORMULAE_DATA } from './formulaeData';
import { GEAR_ITEMS } from './gearData';
import { POTIONS_DATA } from './potionsData';
import { WEAPONS_DATA } from './weaponsData';

export * from './types';
export { ARMOR_DATA } from './armorData';
export { COMPONENTS_DATA } from './componentsData';
export { DIAGRAMS_DATA } from './diagramsData';
export { FORMULAE_DATA } from './formulaeData';
export { GEAR_ITEMS } from './gearData';
export { POTIONS_DATA } from './potionsData';
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
} as const;
