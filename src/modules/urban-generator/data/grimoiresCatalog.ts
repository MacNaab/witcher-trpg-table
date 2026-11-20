import { GRIMOIRE_ELIGIBLE_SPELLS } from '@/src/data/magic';
import type { GrimoireSpellItem } from '../types';

/**
 * Official and Fan-Made magical grimoire entries for Bookshop stock generation,
 * projected from the unified src/data/magic compendium.
 */
export const GRIMOIRE_SPELLS: readonly GrimoireSpellItem[] =
  GRIMOIRE_ELIGIBLE_SPELLS.filter(
    (
      spell
    ): spell is typeof spell & {
      tier: 'novice' | 'journeyman' | 'master';
      source: 'official' | 'fanMade';
    } =>
      (spell.tier === 'novice' ||
        spell.tier === 'journeyman' ||
        spell.tier === 'master') &&
      (spell.source === 'official' || spell.source === 'fanMade')
  ).map((spell) => ({
    id: spell.id,
    name: spell.name,
    tier: spell.tier,
    school: spell.school,
    source: spell.source,
  }));
