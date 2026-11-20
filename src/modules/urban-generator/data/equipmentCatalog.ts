import { ARMOR_DATA, GEAR_ITEMS, WEAPONS_DATA } from '@/src/data/items';
import type { ShopCatalogItem } from '../types';

type GeneralShopKind =
  | 'tool'
  | 'general'
  | 'container'
  | 'clothing'
  | 'mountGear';

function isGeneralShopKind(kind: string): kind is GeneralShopKind {
  return (
    kind === 'tool' ||
    kind === 'general' ||
    kind === 'container' ||
    kind === 'clothing' ||
    kind === 'mountGear'
  );
}

/**
 * General adventuring gear, tools, containers, clothing, and mount equipment
 * projected from the unified src/data/items compendium.
 */
export const GENERAL_EQUIPMENT_ITEMS: readonly ShopCatalogItem[] = GEAR_ITEMS.filter(
  (item): item is typeof item & { shopKind: GeneralShopKind } =>
    !item.urbanOnly && isGeneralShopKind(item.shopKind)
).map((item) => ({
  id: item.id,
  name: item.name,
  kind: item.shopKind,
  availability: item.availability,
  price: item.price,
}));

const fortressMapEntry = GEAR_ITEMS.find(
  (item) => item.urbanOnly === 'fortress-map'
);
if (!fortressMapEntry) {
  throw new Error('Missing fortress-map entry in canonical GEAR_ITEMS');
}

/**
 * Standard item automatically added to Fortress General Stores (per legacy rule).
 */
export const FORTRESS_WORLD_MAP_ITEM: ShopCatalogItem = {
  id: fortressMapEntry.id,
  name: fortressMapEntry.name,
  kind: 'tool',
  availability: fortressMapEntry.availability,
  price: fortressMapEntry.price,
};

const tailorExtraEntry = GEAR_ITEMS.find(
  (item) => item.urbanOnly === 'tailor-extra'
);
if (!tailorExtraEntry) {
  throw new Error('Missing tailor-extra entry in canonical GEAR_ITEMS');
}

/**
 * Additional Tailor-exclusive clothing entry (Vêtements élégants / Elegant Clothing).
 */
export const TAILOR_EXTRA_CLOTHING: ShopCatalogItem = {
  id: tailorExtraEntry.id,
  name: tailorExtraEntry.name,
  kind: 'clothing',
  availability: tailorExtraEntry.availability,
  price: tailorExtraEntry.price,
};

/**
 * Complete Weapons & utility tools catalog projected from src/data/items.
 */
export const WEAPONS_CATALOG: readonly ShopCatalogItem[] = WEAPONS_DATA.map(
  (weapon) => ({
    id: weapon.id,
    name: weapon.name,
    kind: weapon.shopKind,
    availability: weapon.availability,
    price: weapon.price,
  })
);

export interface ArmorCatalogItem extends ShopCatalogItem {
  weightClass: 'light' | 'medium' | 'heavy';
  isShield: boolean;
}

/**
 * Complete Armor & Shields catalog projected from src/data/items.
 * Tailors stock Light and Medium non-shield armor; Armorers stock all armor & shields.
 */
export const ARMORS_CATALOG: readonly ArmorCatalogItem[] = ARMOR_DATA.map(
  (armor) => ({
    id: armor.id,
    name: armor.name,
    kind: 'armor',
    availability: armor.availability,
    price: armor.price,
    weightClass: armor.weightClass,
    isShield: armor.isShield,
  })
);
