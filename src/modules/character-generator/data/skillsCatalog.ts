import type { SkillAttributeKey, SkillDefinition, SkillId } from '../types';

/**
 * Complete canonical Witcher TRPG skill catalog grouped across 7 governing attributes.
 * Difficult (x2) skills require 2 skill points per rank during character creation.
 */
export const SKILLS_CATALOG: readonly SkillDefinition[] = [
  // INTELLIGENCE (INT)
  {
    id: 'int_awareness',
    attribute: 'INT',
    name: { en: 'Awareness', fr: 'Vigilance' },
    doubleCost: false,
  },
  {
    id: 'int_business',
    attribute: 'INT',
    name: { en: 'Business', fr: 'Négociation' },
    doubleCost: false,
  },
  {
    id: 'int_deduction',
    attribute: 'INT',
    name: { en: 'Deduction', fr: 'Déduction' },
    doubleCost: false,
  },
  {
    id: 'int_education',
    attribute: 'INT',
    name: { en: 'Education', fr: 'Éducation' },
    doubleCost: false,
  },
  {
    id: 'int_lang_common',
    attribute: 'INT',
    name: { en: 'Common Speech', fr: 'Langue commune' },
    doubleCost: true,
    isLanguage: true,
  },
  {
    id: 'int_lang_elder',
    attribute: 'INT',
    name: { en: 'Elder Speech', fr: 'Langue ancienne' },
    doubleCost: true,
    isLanguage: true,
  },
  {
    id: 'int_lang_dwarvish',
    attribute: 'INT',
    name: { en: 'Dwarvish', fr: 'Langue naine' },
    doubleCost: true,
    isLanguage: true,
  },
  {
    id: 'int_monster_lore',
    attribute: 'INT',
    name: { en: 'Monster Lore', fr: 'Connaissance des monstres' },
    doubleCost: true,
  },
  {
    id: 'int_etiquette',
    attribute: 'INT',
    name: { en: 'Social Etiquette', fr: 'Étiquette' },
    doubleCost: false,
  },
  {
    id: 'int_streetwise',
    attribute: 'INT',
    name: { en: 'Streetwise', fr: 'Connaissance de la rue' },
    doubleCost: false,
  },
  {
    id: 'int_tactics',
    attribute: 'INT',
    name: { en: 'Tactics', fr: 'Tactique' },
    doubleCost: true,
    isCombat: true,
  },
  {
    id: 'int_teaching',
    attribute: 'INT',
    name: { en: 'Teaching', fr: 'Enseignement' },
    doubleCost: false,
  },
  {
    id: 'int_survival',
    attribute: 'INT',
    name: { en: 'Wilderness Survival', fr: 'Survie' },
    doubleCost: false,
  },

  // REFLEX (REF)
  {
    id: 'ref_brawling',
    attribute: 'REF',
    name: { en: 'Brawling', fr: 'Bagarre' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'ref_dodge',
    attribute: 'REF',
    name: { en: 'Dodge / Escape', fr: 'Esquive / Évasion' },
    doubleCost: false,
  },
  {
    id: 'ref_melee',
    attribute: 'REF',
    name: { en: 'Melee', fr: 'Mêlée' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'ref_riding',
    attribute: 'REF',
    name: { en: 'Riding', fr: 'Équitation' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'ref_sailing',
    attribute: 'REF',
    name: { en: 'Sailing', fr: 'Navigation' },
    doubleCost: false,
  },
  {
    id: 'ref_small_blades',
    attribute: 'REF',
    name: { en: 'Small Blades', fr: 'Lames courtes' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'ref_staff_spear',
    attribute: 'REF',
    name: { en: 'Staff / Spear', fr: 'Bâton / Lance' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'ref_swordsmanship',
    attribute: 'REF',
    name: { en: 'Swordsmanship', fr: 'Escrime' },
    doubleCost: false,
    isCombat: true,
  },

  // DEXTERITY (DEX)
  {
    id: 'dex_archery',
    attribute: 'DEX',
    name: { en: 'Archery', fr: 'Archerie' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'dex_athletics',
    attribute: 'DEX',
    name: { en: 'Athletics', fr: 'Athlétisme' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'dex_crossbow',
    attribute: 'DEX',
    name: { en: 'Crossbow', fr: 'Arbalète' },
    doubleCost: false,
    isCombat: true,
  },
  {
    id: 'dex_sleight_of_hand',
    attribute: 'DEX',
    name: { en: 'Sleight of Hand', fr: 'Adresse' },
    doubleCost: false,
  },
  {
    id: 'dex_stealth',
    attribute: 'DEX',
    name: { en: 'Stealth', fr: 'Furtivité' },
    doubleCost: false,
  },

  // BODY (COR)
  {
    id: 'cor_physique',
    attribute: 'COR',
    name: { en: 'Physique', fr: 'Physique' },
    doubleCost: false,
  },
  {
    id: 'cor_endurance',
    attribute: 'COR',
    name: { en: 'Endurance', fr: 'Résilience' },
    doubleCost: false,
  },

  // EMPATHY (EMP)
  {
    id: 'emp_charisma',
    attribute: 'EMP',
    name: { en: 'Charisma', fr: 'Charisme' },
    doubleCost: false,
  },
  {
    id: 'emp_deceit',
    attribute: 'EMP',
    name: { en: 'Deceit', fr: 'Duperie' },
    doubleCost: false,
  },
  {
    id: 'emp_fine_arts',
    attribute: 'EMP',
    name: { en: 'Fine Arts', fr: 'Artiste' },
    doubleCost: false,
  },
  {
    id: 'emp_gambling',
    attribute: 'EMP',
    name: { en: 'Gambling', fr: 'Jeu' },
    doubleCost: false,
  },
  {
    id: 'emp_grooming',
    attribute: 'EMP',
    name: { en: 'Grooming & Style', fr: 'Stylisme' },
    doubleCost: false,
  },
  {
    id: 'emp_human_perception',
    attribute: 'EMP',
    name: { en: 'Human Perception', fr: 'Psychologie' },
    doubleCost: false,
  },
  {
    id: 'emp_leadership',
    attribute: 'EMP',
    name: { en: 'Leadership', fr: 'Commandement' },
    doubleCost: false,
  },
  {
    id: 'emp_persuasion',
    attribute: 'EMP',
    name: { en: 'Persuasion', fr: 'Persuasion' },
    doubleCost: false,
  },
  {
    id: 'emp_performance',
    attribute: 'EMP',
    name: { en: 'Performance', fr: 'Représentation' },
    doubleCost: false,
  },
  {
    id: 'emp_seduction',
    attribute: 'EMP',
    name: { en: 'Seduction', fr: 'Séduction' },
    doubleCost: false,
  },

  // CRAFT / TECHNIQUE (TEC)
  {
    id: 'tec_alchemy',
    attribute: 'TEC',
    name: { en: 'Alchemy', fr: 'Alchimie' },
    doubleCost: true,
    isCraft: true,
  },
  {
    id: 'tec_crafting',
    attribute: 'TEC',
    name: { en: 'Crafting', fr: 'Artisanat' },
    doubleCost: true,
    isCraft: true,
  },
  {
    id: 'tec_disguise',
    attribute: 'TEC',
    name: { en: 'Disguise', fr: 'Déguisement' },
    doubleCost: false,
    isCraft: true,
  },
  {
    id: 'tec_first_aid',
    attribute: 'TEC',
    name: { en: 'First Aid', fr: 'Premiers secours' },
    doubleCost: false,
    isCraft: true,
  },
  {
    id: 'tec_forgery',
    attribute: 'TEC',
    name: { en: 'Forgery', fr: 'Falsification' },
    doubleCost: false,
    isCraft: true,
  },
  {
    id: 'tec_pick_locks',
    attribute: 'TEC',
    name: { en: 'Pick Locks', fr: 'Crochetage' },
    doubleCost: false,
    isCraft: true,
  },
  {
    id: 'tec_trap_crafting',
    attribute: 'TEC',
    name: { en: 'Trap Crafting', fr: 'Fabrication de pièges' },
    doubleCost: true,
    isCraft: true,
  },

  // WILL (VOL)
  {
    id: 'vol_courage',
    attribute: 'VOL',
    name: { en: 'Courage', fr: 'Courage' },
    doubleCost: false,
  },
  {
    id: 'vol_hex_weaving',
    attribute: 'VOL',
    name: { en: 'Hex Weaving', fr: 'Envoûtement' },
    doubleCost: true,
  },
  {
    id: 'vol_intimidation',
    attribute: 'VOL',
    name: { en: 'Intimidation', fr: 'Intimidation' },
    doubleCost: false,
  },
  {
    id: 'vol_spell_casting',
    attribute: 'VOL',
    name: { en: 'Spell Casting', fr: 'Incantation' },
    doubleCost: true,
  },
  {
    id: 'vol_resist_magic',
    attribute: 'VOL',
    name: { en: 'Resist Magic', fr: 'Résistance à la magie' },
    doubleCost: true,
  },
  {
    id: 'vol_resist_coercion',
    attribute: 'VOL',
    name: { en: 'Resist Coercion', fr: 'Résistance à la contrainte' },
    doubleCost: false,
  },
  {
    id: 'vol_ritual_crafting',
    attribute: 'VOL',
    name: { en: 'Ritual Crafting', fr: 'Rituels' },
    doubleCost: true,
  },
];

export const SKILL_ATTRIBUTE_ORDER: readonly SkillAttributeKey[] = [
  'INT',
  'REF',
  'DEX',
  'COR',
  'EMP',
  'TEC',
  'VOL',
];

export const LANGUAGE_SKILLS: readonly SkillId[] = [
  'int_lang_common',
  'int_lang_elder',
  'int_lang_dwarvish',
];

export const CRAFT_SKILLS: readonly SkillId[] = [
  'tec_alchemy',
  'tec_crafting',
  'tec_disguise',
  'tec_first_aid',
  'tec_forgery',
  'tec_pick_locks',
  'tec_trap_crafting',
];

export const ALL_COMBAT_OPTIONS: readonly SkillId[] = [
  'int_tactics',
  'ref_brawling',
  'ref_staff_spear',
  'ref_riding',
  'ref_swordsmanship',
  'ref_small_blades',
  'ref_melee',
  'dex_crossbow',
  'dex_archery',
  'dex_athletics',
];

const SKILL_MAP = new Map<SkillId, SkillDefinition>(
  SKILLS_CATALOG.map((skill) => [skill.id, skill])
);

export function getSkillDefinition(id: SkillId): SkillDefinition {
  const found = SKILL_MAP.get(id);
  if (!found) {
    throw new Error(`Unknown skill id: ${id}`);
  }
  return found;
}
