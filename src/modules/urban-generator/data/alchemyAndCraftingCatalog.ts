import {
  COMPONENTS_DATA,
  DIAGRAMS_DATA,
  FORMULAE_DATA,
  POTIONS_DATA,
  TAILORING_BASE_MATERIALS as CANONICAL_TAILORING_MATERIALS,
} from '@/src/data/items';
import type {
  ComponentCatalogItem,
  DiagramCatalogItem,
  FormulaCatalogItem,
  ShopCatalogItem,
} from '../types';

/**
 * Alchemical articles stocked by Alchemists (projected from src/data/items POTIONS_DATA).
 */
export const ALCHEMY_ARTICLES: readonly ShopCatalogItem[] = POTIONS_DATA.filter(
  (item) => item.type === 'Articles'
).map((item) => ({
  id: item.id,
  name: item.name,
  kind: 'article',
  availability: item.availability,
  price: item.price,
}));

/**
 * Witcher alchemy formulas projected from src/data/items FORMULAE_DATA.
 */
export const ALCHEMY_FORMULAS: readonly FormulaCatalogItem[] =
  FORMULAE_DATA.map((formula) => ({
    id: formula.id,
    name: formula.name,
  }));

/**
 * Crafting & alchemical components projected from src/data/items COMPONENTS_DATA.
 */
export const CRAFTING_COMPONENTS: readonly ComponentCatalogItem[] =
  COMPONENTS_DATA.map((comp) => ({
    id: comp.id,
    name: comp.name,
    rarity: comp.rarity,
    price: comp.price,
  }));

/**
 * Tailoring standard raw textiles always offered alongside rolled Tailor inventory.
 */
export const TAILORING_BASE_MATERIALS: readonly ShopCatalogItem[] =
  CANONICAL_TAILORING_MATERIALS.map((mat) => ({
    id: mat.id,
    name: mat.name,
    kind: 'component',
    availability: mat.rarity,
    price: mat.price,
  }));

/**
 * Crafting diagrams projected from src/data/items DIAGRAMS_DATA.
 */
export const CRAFTING_DIAGRAMS: readonly DiagramCatalogItem[] =
  DIAGRAMS_DATA.map((diagram) => ({
    id: diagram.id,
    name: diagram.name,
    tier: diagram.tier,
    price: diagram.price,
    pool: diagram.pool,
  }));
