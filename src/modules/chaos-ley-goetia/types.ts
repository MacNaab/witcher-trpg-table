/**
 * Domain types for Ley Lines, Demon True Name Generator & Goetia (A Tome of Chaos).
 */

export type LeyElementId = 'earth' | 'air' | 'fire' | 'water';

export type LeyCasterType = 'mage' | 'priest_druid' | 'witcher';

export type DemonSpeciesId = 'bes' | 'casglydd' | 'mari_lwyd';

export type DemonBindingState = 'unbound' | 'bound' | 'banished' | 'escaped';

export interface BilingualText {
  fr: string;
  en: string;
}

export interface LeyElementDef {
  id: LeyElementId;
  name: BilingualText;
  placesOfPowerExample: BilingualText;
  signs: BilingualText;
  benefit: BilingualText;
  penalty: BilingualText;
}

export interface DemonBenefitTier {
  tier: 'unbound' | 'bound' | 'greater_unbound' | 'greater_bound';
  label: BilingualText;
  effects: Record<DemonSpeciesId, BilingualText>;
}

export interface GoeticRitualDef {
  id: string;
  tier: 'novice' | 'journeyman' | 'master';
  name: BilingualText;
  dc: BilingualText;
  prepTime: BilingualText;
  duration: BilingualText;
  staCost: string;
  investment: number;
  components: BilingualText;
  process: BilingualText;
  effect: BilingualText;
}

export interface GoeticToolDef {
  id: string;
  name: BilingualText;
  rarity: BilingualText;
  craftSkill: BilingualText;
  dc: number;
  time: BilingualText;
  investment: number;
  cost: BilingualText;
  components: BilingualText;
  effect: BilingualText;
}

export interface SavedDemonEntry {
  id: string;
  trueName: string;
  syllables: [string, string, string];
  species: DemonSpeciesId;
  isGreater: boolean;
  bindingState: DemonBindingState;
  lucifugeBearer: string;
  bindingCheckResult: number | null;
  summonerNotes: string;
  createdAt: string;
}

export interface GoetiaStoreState {
  demons: SavedDemonEntry[];
}
