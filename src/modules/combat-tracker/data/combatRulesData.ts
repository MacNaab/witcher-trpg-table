import type {
  AnatomyType,
  CombatantRole,
  ConditionDefinition,
  ConditionId,
  CriticalSeverity,
  CriticalTableEntry,
  FumbleCategoryId,
  FumbleRangeEntry,
  HitLocationId,
  HitLocationRow,
  LocalizedText,
} from '../types';

/**
 * All 11 official status effects + Prone ("Au sol") from guide/combat.md.
 */
export const CONDITIONS_CATALOG: readonly ConditionDefinition[] = [
  {
    id: 'bleeding',
    name: { fr: 'Saignement', en: 'Bleeding' },
    shortEffect: { fr: '-2 PS/rd (ignore armure)', en: '-2 HP/rd (ignores armor)' },
    fullRule: {
      fr: 'Vous subissez 2 points de dégâts par round (l’armure n’absorbe pas) jusqu’à un sort de soins ou un jet de Premiers soins SD 15 (1 action).',
      en: 'Take 2 direct HP damage per round (ignores armor) until healed magically or stopped with First Aid DC 15 (1 action).',
    },
    cureSkill: { fr: 'Premiers soins SD 15 / Sort de soin', en: 'First Aid DC 15 / Healing spell' },
    roundDamage: 2,
    bypassesArmor: true,
  },
  {
    id: 'poisoned',
    name: { fr: 'Empoisonnement', en: 'Poisoned' },
    shortEffect: { fr: '-3 PS/rd (ignore armure)', en: '-3 HP/rd (ignores armor)' },
    fullRule: {
      fr: 'Un venin inflige 3 points de dégâts par round (l’armure n’absorbe pas). Jet de Résilience SD 15 (1 action) pour y mettre fin.',
      en: 'Venom deals 3 direct HP damage per round (ignores armor). Requires Endurance DC 15 (1 action) to stop.',
    },
    cureSkill: { fr: 'Résilience SD 15', en: 'Endurance DC 15' },
    roundDamage: 3,
    bypassesArmor: true,
  },
  {
    id: 'burning',
    name: { fr: 'Incinération', en: 'On Fire' },
    shortEffect: {
      fr: '5 DÉG/rd toutes zones + -1 PA/Fia',
      en: '5 DMG/rd all zones + -1 SP/REL',
    },
    fullRule: {
      fr: 'Subit 5 dégâts/round sur toutes les localisations (armure absorbe, puis perd 1 PA/Fia par round). Passer 1 round à s’asperger ou se rouler au sol pour éteindre.',
      en: 'Takes 5 damage/round on every body location (armor absorbs, losing 1 SP/REL per round). Spend 1 full round dousing or rolling to extinguish.',
    },
    cureSkill: { fr: '1 round (eau / roulade au sol)', en: '1 full round (water / drop & roll)' },
    roundDamage: 5,
    bypassesArmor: false,
    hitsAllLocations: true,
  },
  {
    id: 'suffocating',
    name: { fr: 'Suffocation', en: 'Suffocating' },
    shortEffect: { fr: '-3 PS/rd (ignore armure)', en: '-3 HP/rd (ignores armor)' },
    fullRule: {
      fr: 'Vous subissez 3 points de dégâts par round (armure ignorée) jusqu’à retrouver de l’air respirable.',
      en: 'Take 3 damage per round (armor cannot absorb) until breathable air is restored.',
    },
    cureSkill: { fr: 'Accès à l’air respirable', en: 'Restore breathable air' },
    roundDamage: 3,
    bypassesArmor: true,
  },
  {
    id: 'stunned',
    name: { fr: 'Étourdissement', en: 'Stunned' },
    shortEffect: { fr: '0 action · SD 10 pour toucher', en: 'No action · DC 10 to hit' },
    fullRule: {
      fr: 'Aucune action possible ; vous toucher ne demande que SD 10. Fin : réussir une sauvegarde ÉTOU (1 round complet) ou subir une frappe.',
      en: 'Cannot act; attackers only need DC 10 to hit. Ends on successful Stun save (1 full round) or immediately when struck.',
    },
    cureSkill: { fr: 'Jet ÉTOU (1 rd) ou coup reçu', en: 'Stun save (1 rd) or being hit' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'staggered',
    name: { fr: 'Stupéfaction', en: 'Staggered' },
    shortEffect: { fr: '-2 Att & Déf (1 tour)', en: '-2 Att & Def (until next turn)' },
    fullRule: {
      fr: 'Déséquilibré : -2 à l’attaque et à la défense. Disparaît automatiquement au début de votre prochain tour.',
      en: 'Off-balance: -2 to Attack and Defense. Automatically clears at the start of your next turn.',
    },
    cureSkill: { fr: 'Fin au début du prochain tour', en: 'Clears at start of next turn' },
    roundDamage: 0,
    bypassesArmor: false,
    autoClearOnTurnStart: true,
  },
  {
    id: 'blinded',
    name: { fr: 'Aveuglé', en: 'Blinded' },
    shortEffect: { fr: '-3 Att/Déf · -5 Vig vue', en: '-3 Att/Def · -5 sight Awr' },
    fullRule: {
      fr: 'Malus de -3 aux attaques et défenses, et -5 aux jets de Vigilance liés à la vue jusqu’à passer 1 round à nettoyer vos yeux.',
      en: '-3 to all attacks and defenses, and -5 to sight-based Awareness until spending 1 round clearing your eyes.',
    },
    cureSkill: { fr: '1 round (dégager les yeux)', en: '1 round (clear eyes)' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'frozen',
    name: { fr: 'Gel', en: 'Frozen' },
    shortEffect: { fr: '-3 VIT · -1 RÉF', en: '-3 SPD · -1 REF' },
    fullRule: {
      fr: 'Corps raidi par le givre : -3 en VIT et -1 en RÉF. Briser la glace demande un jet de Physique SD 16 (1 action).',
      en: 'Covered in frost: -3 SPD and -1 REF. Break free with Physique DC 16 (1 action).',
    },
    cureSkill: { fr: 'Physique SD 16 (1 action)', en: 'Physique DC 16 (1 action)' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'intoxicated',
    name: { fr: 'Intoxication', en: 'Intoxicated' },
    shortEffect: { fr: '-2 RÉF/DEX/INT · -3 verbal', en: '-2 REF/DEX/INT · -3 verbal' },
    fullRule: {
      fr: '-2 en RÉF, DEX et INT ; -3 en combat verbal. 25 % de chance d’amnésie partielle.',
      en: '-2 to REF, DEX, and INT; -3 to verbal combat. 25% chance of forgetting actions.',
    },
    cureSkill: { fr: 'Repos / Temps', en: 'Time / Sobering up' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'nausea',
    name: { fr: 'Nausée', en: 'Nausea' },
    shortEffect: { fr: 'Jet COR / 3 rds', en: 'BODY save every 3 rds' },
    fullRule: {
      fr: 'Tous les 3 rounds, réussir un jet sous votre COR ou perdre le round à vomir.',
      en: 'Every 3 rounds, roll under BODY or spend your turn vomiting.',
    },
    cureSkill: { fr: 'Jet de COR / repos', en: 'BODY check / recovery' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'hallucinating',
    name: { fr: 'Hallucinations', en: 'Hallucinating' },
    shortEffect: { fr: 'Déduction SD 15', en: 'Deduction DC 15' },
    fullRule: {
      fr: 'Perceptions irréelles. Identifier chaque illusion demande un jet de Déduction SD 15.',
      en: 'Unreal sensory perceptions. Recognizing each hallucination requires Deduction DC 15.',
    },
    cureSkill: { fr: 'Déduction SD 15', en: 'Deduction DC 15' },
    roundDamage: 0,
    bypassesArmor: false,
  },
  {
    id: 'prone',
    name: { fr: 'Au sol', en: 'Prone' },
    shortEffect: { fr: '-2 Att/Déf au sol', en: '-2 Att/Def while prone' },
    fullRule: {
      fr: 'À terre : pénalité tactique (-2 Att/Déf en mêlée), utiliser son mouvement pour se relever.',
      en: 'Knocked down: -2 Att/Def penalty; spend movement to stand back up.',
    },
    cureSkill: { fr: 'Se relever (mouvement)', en: 'Stand up (movement)' },
    roundDamage: 0,
    bypassesArmor: false,
  },
];

export const CONDITIONS_MAP = new Map<ConditionId, ConditionDefinition>(
  CONDITIONS_CATALOG.map((c) => [c.id, c])
);

export const HUMAN_HIT_LOCATIONS: readonly HitLocationRow[] = [
  {
    id: 'head',
    name: { fr: 'Tête', en: 'Head' },
    d10Min: 1,
    d10Max: 1,
    rollLabel: '1',
    aimPenalty: -6,
    damageMultiplier: 3,
    multiplierLabel: '×3',
  },
  {
    id: 'torso',
    name: { fr: 'Torse', en: 'Torso' },
    d10Min: 2,
    d10Max: 4,
    rollLabel: '2–4',
    aimPenalty: -1,
    damageMultiplier: 1,
    multiplierLabel: '×1',
  },
  {
    id: 'rightArm',
    name: { fr: 'Bras droit', en: 'Right Arm' },
    d10Min: 5,
    d10Max: 5,
    rollLabel: '5',
    aimPenalty: -3,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
  {
    id: 'leftArm',
    name: { fr: 'Bras gauche', en: 'Left Arm' },
    d10Min: 6,
    d10Max: 6,
    rollLabel: '6',
    aimPenalty: -3,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
  {
    id: 'rightLeg',
    name: { fr: 'Jambe droite', en: 'Right Leg' },
    d10Min: 7,
    d10Max: 8,
    rollLabel: '7–8',
    aimPenalty: -2,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
  {
    id: 'leftLeg',
    name: { fr: 'Jambe gauche', en: 'Left Leg' },
    d10Min: 9,
    d10Max: 10,
    rollLabel: '9–10',
    aimPenalty: -2,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
];

export const MONSTER_HIT_LOCATIONS: readonly HitLocationRow[] = [
  {
    id: 'head',
    name: { fr: 'Tête', en: 'Head' },
    d10Min: 1,
    d10Max: 1,
    rollLabel: '1',
    aimPenalty: -6,
    damageMultiplier: 3,
    multiplierLabel: '×3',
  },
  {
    id: 'torso',
    name: { fr: 'Torse', en: 'Torso' },
    d10Min: 2,
    d10Max: 5,
    rollLabel: '2–5',
    aimPenalty: -1,
    damageMultiplier: 1,
    multiplierLabel: '×1',
  },
  {
    id: 'rightArm',
    name: { fr: 'Membre droit', en: 'Right Limb' },
    d10Min: 6,
    d10Max: 7,
    rollLabel: '6–7',
    aimPenalty: -3,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
  {
    id: 'leftArm',
    name: { fr: 'Membre gauche', en: 'Left Limb' },
    d10Min: 8,
    d10Max: 9,
    rollLabel: '8–9',
    aimPenalty: -3,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
  {
    id: 'rightLeg',
    name: { fr: 'Queue ou aile', en: 'Tail or Wing' },
    d10Min: 10,
    d10Max: 10,
    rollLabel: '10',
    aimPenalty: -2,
    damageMultiplier: 0.5,
    multiplierLabel: '×½',
  },
];

export function getHitLocationsForAnatomy(anatomy: AnatomyType): readonly HitLocationRow[] {
  return anatomy === 'human' ? HUMAN_HIT_LOCATIONS : MONSTER_HIT_LOCATIONS;
}

export function getLocationLabel(
  locationId: HitLocationId,
  anatomy: AnatomyType,
  lang: 'fr' | 'en'
): string {
  const table = getHitLocationsForAnatomy(anatomy);
  const found = table.find((row) => row.id === locationId);
  if (found) return found.name[lang];
  const fallback = HUMAN_HIT_LOCATIONS.find((row) => row.id === locationId);
  return fallback ? fallback.name[lang] : locationId;
}

/**
 * Critical wound extra damage (unaffected by armor) & First Aid stabilization DC.
 */
export const CRITICAL_TIER_META: Record<
  CriticalSeverity,
  {
    marginThreshold: number;
    bonusDamage: number;
    noAnatomyBonusDamage: number;
    stabilizeDc: number;
  }
> = {
  simple: { marginThreshold: 7, bonusDamage: 3, noAnatomyBonusDamage: 5, stabilizeDc: 12 },
  complex: { marginThreshold: 10, bonusDamage: 5, noAnatomyBonusDamage: 10, stabilizeDc: 14 },
  difficult: { marginThreshold: 13, bonusDamage: 8, noAnatomyBonusDamage: 15, stabilizeDc: 16 },
  mortal: { marginThreshold: 15, bonusDamage: 10, noAnatomyBonusDamage: 20, stabilizeDc: 18 },
};

/**
 * Official 2d6 Critical Wound tables (Simple, Complex, Difficult, Mortal).
 */
export const CRITICAL_WOUNDS_TABLES: Record<
  CriticalSeverity,
  readonly CriticalTableEntry[]
> = {
  simple: [
    {
      rollMin: 12,
      rollMax: 12,
      rollLabel: '12',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Mâchoire fêlée', en: 'Cracked Jaw' },
      activeEffect: {
        fr: '-2 à toute compétence magique ou combat verbal.',
        en: '-2 to all spellcasting and verbal combat.',
      },
      stabilizedEffect: {
        fr: '-1 aux compétences magiques et au combat verbal.',
        en: '-1 to spellcasting and verbal combat.',
      },
      treatedEffect: { fr: '-1 aux compétences magiques.', en: '-1 to spellcasting.' },
    },
    {
      rollMin: 11,
      rollMax: 11,
      rollLabel: '11',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Cicatrice défigurante', en: 'Disfiguring Scar' },
      activeEffect: {
        fr: '-3 en combat verbal basé sur l’Empathie.',
        en: '-3 to Empathy-based verbal combat.',
      },
      stabilizedEffect: {
        fr: '-1 en combat verbal empathique.',
        en: '-1 to Empathy-based verbal combat.',
      },
      treatedEffect: { fr: '-1 en Séduction.', en: '-1 to Seduction.' },
    },
    {
      rollMin: 9,
      rollMax: 10,
      rollLabel: '9–10',
      locationHint: 'torso',
      isOrganWound: false,
      title: { fr: 'Côtes fêlées', en: 'Cracked Ribs' },
      activeEffect: {
        fr: '-2 en COR (n’affecte pas le maximum de PS).',
        en: '-2 BODY (does not reduce max HP).',
      },
      stabilizedEffect: { fr: '-1 en COR.', en: '-1 BODY.' },
      treatedEffect: { fr: '-10 en Encombrement.', en: '-10 Encumbrance.' },
    },
    {
      rollMin: 6,
      rollMax: 8,
      rollLabel: '6–8',
      locationHint: 'torso',
      isOrganWound: true,
      title: { fr: 'Corps étranger', en: 'Foreign Object' },
      activeEffect: {
        fr: 'Récupération et soins critiques divisés par 4.',
        en: 'Recovery and critical healing divided by 4.',
      },
      stabilizedEffect: {
        fr: 'Récupération et soins critiques divisés par 2.',
        en: 'Recovery and critical healing halved.',
      },
      treatedEffect: {
        fr: '-2 Récupération, -1 soins critiques.',
        en: '-2 Recovery, -1 critical healing.',
      },
    },
    {
      rollMin: 4,
      rollMax: 5,
      rollLabel: '4–5',
      locationHint: 'arm',
      isOrganWound: false,
      title: { fr: 'Entorse du bras', en: 'Sprained Arm' },
      activeEffect: {
        fr: '-2 à toutes les actions effectuées avec ce bras.',
        en: '-2 to all actions using this arm.',
      },
      stabilizedEffect: { fr: '-1 aux actions de ce bras.', en: '-1 to actions with this arm.' },
      treatedEffect: { fr: '-1 en Physique.', en: '-1 to Physique.' },
    },
    {
      rollMin: 2,
      rollMax: 3,
      rollLabel: '2–3',
      locationHint: 'leg',
      isOrganWound: false,
      title: { fr: 'Entorse de la jambe / cheville', en: 'Sprained Leg / Ankle' },
      activeEffect: {
        fr: '-2 en VIT, Esquive/Évasion et Athlétisme.',
        en: '-2 SPD, Dodge/Escape, and Athletics.',
      },
      stabilizedEffect: {
        fr: '-1 en VIT, Esquive/Évasion et Athlétisme.',
        en: '-1 SPD, Dodge/Escape, and Athletics.',
      },
      treatedEffect: { fr: '-1 en VIT.', en: '-1 SPD.' },
    },
  ],
  complex: [
    {
      rollMin: 12,
      rollMax: 12,
      rollLabel: '12',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Blessure mineure à la tête', en: 'Minor Head Wound' },
      activeEffect: { fr: '-1 en INT, VOL et ÉTOU.', en: '-1 INT, WILL, and STUN.' },
      stabilizedEffect: { fr: '-1 en INT et VOL.', en: '-1 INT and WILL.' },
      treatedEffect: { fr: '-1 en VOL.', en: '-1 WILL.' },
    },
    {
      rollMin: 11,
      rollMax: 11,
      rollLabel: '11',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Dents perdues', en: 'Lost Teeth' },
      activeEffect: {
        fr: '1d10 dents perdues. -3 compétences magiques et combat verbal.',
        en: 'Lose 1d10 teeth. -3 spellcasting and verbal combat.',
      },
      stabilizedEffect: {
        fr: '-2 compétences magiques et combat verbal.',
        en: '-2 spellcasting and verbal combat.',
      },
      treatedEffect: {
        fr: '-1 compétences magiques et combat verbal.',
        en: '-1 spellcasting and verbal combat.',
      },
    },
    {
      rollMin: 9,
      rollMax: 10,
      rollLabel: '9–10',
      locationHint: 'torso',
      isOrganWound: true,
      title: { fr: 'Rupture de la rate', en: 'Ruptured Spleen' },
      activeEffect: {
        fr: 'Saignement actif. Sauvegarde ÉTOU tous les 5 rounds.',
        en: 'Causes Bleeding. Stun save every 5 rounds.',
      },
      stabilizedEffect: {
        fr: 'Sauvegarde ÉTOU tous les 10 rounds.',
        en: 'Stun save every 10 rounds.',
      },
      treatedEffect: { fr: '-2 en ÉTOU.', en: '-2 STUN.' },
    },
    {
      rollMin: 6,
      rollMax: 8,
      rollLabel: '6–8',
      locationHint: 'torso',
      isOrganWound: false,
      title: { fr: 'Côtes brisées', en: 'Broken Ribs' },
      activeEffect: { fr: '-2 COR, -1 DEX et RÉF.', en: '-2 BODY, -1 DEX and REF.' },
      stabilizedEffect: { fr: '-1 COR et RÉF.', en: '-1 BODY and REF.' },
      treatedEffect: { fr: '-1 COR.', en: '-1 BODY.' },
    },
    {
      rollMin: 4,
      rollMax: 5,
      rollLabel: '4–5',
      locationHint: 'arm',
      isOrganWound: false,
      title: { fr: 'Bras fracturé', en: 'Fractured Arm' },
      activeEffect: {
        fr: '-3 à toutes les actions avec ce bras.',
        en: '-3 to all actions with this arm.',
      },
      stabilizedEffect: { fr: '-2 aux actions de ce bras.', en: '-2 to actions with this arm.' },
      treatedEffect: { fr: '-1 aux actions de ce bras.', en: '-1 to actions with this arm.' },
    },
    {
      rollMin: 2,
      rollMax: 3,
      rollLabel: '2–3',
      locationHint: 'leg',
      isOrganWound: false,
      title: { fr: 'Jambe fracturée', en: 'Fractured Leg' },
      activeEffect: {
        fr: '-3 VIT, Esquive/Évasion et Athlétisme.',
        en: '-3 SPD, Dodge/Escape, and Athletics.',
      },
      stabilizedEffect: {
        fr: '-2 VIT, Esquive/Évasion et Athlétisme.',
        en: '-2 SPD, Dodge/Escape, and Athletics.',
      },
      treatedEffect: {
        fr: '-1 VIT, Esquive/Évasion et Athlétisme.',
        en: '-1 SPD, Dodge/Escape, and Athletics.',
      },
    },
  ],
  difficult: [
    {
      rollMin: 12,
      rollMax: 12,
      rollLabel: '12',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Fracture du crâne', en: 'Fractured Skull' },
      activeEffect: {
        fr: '-1 INT et DEX ; les blessures à la tête infligent ×4 dégâts.',
        en: '-1 INT and DEX; head hits deal ×4 damage.',
      },
      stabilizedEffect: {
        fr: '-1 INT et DEX ; ×4 dégâts à la tête.',
        en: '-1 INT and DEX; ×4 damage to head.',
      },
      treatedEffect: { fr: '×4 dégâts à la tête.', en: '×4 damage to head.' },
    },
    {
      rollMin: 11,
      rollMax: 11,
      rollLabel: '11',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Commotion', en: 'Concussion' },
      activeEffect: {
        fr: 'Sauvegarde ÉTOU tous les 1d6 rounds ; -2 INT, RÉF et DEX.',
        en: 'Stun save every 1d6 rounds; -2 INT, REF, and DEX.',
      },
      stabilizedEffect: { fr: '-1 INT, RÉF et DEX.', en: '-1 INT, REF, and DEX.' },
      treatedEffect: { fr: '-1 INT et DEX.', en: '-1 INT and DEX.' },
    },
    {
      rollMin: 9,
      rollMax: 10,
      rollLabel: '9–10',
      locationHint: 'torso',
      isOrganWound: true,
      title: { fr: 'Perforation de l’estomac', en: 'Ruptured Stomach' },
      activeEffect: {
        fr: '-2 à toutes les actions et 4 dégâts d’acide/round.',
        en: '-2 to all actions and 4 acid damage/round.',
      },
      stabilizedEffect: { fr: '-2 à toutes les actions.', en: '-2 to all actions.' },
      treatedEffect: { fr: '-1 à toutes les actions.', en: '-1 to all actions.' },
    },
    {
      rollMin: 6,
      rollMax: 8,
      rollLabel: '6–8',
      locationHint: 'torso',
      isOrganWound: true,
      title: { fr: 'Plaie aspirante au thorax', en: 'Sucking Chest Wound' },
      activeEffect: {
        fr: '-3 COR et VIT ; déclenche Suffocation.',
        en: '-3 BODY and SPD; triggers Suffocating.',
      },
      stabilizedEffect: { fr: '-2 COR et VIT.', en: '-2 BODY and SPD.' },
      treatedEffect: { fr: '-1 COR et VIT.', en: '-1 BODY and SPD.' },
    },
    {
      rollMin: 4,
      rollMax: 5,
      rollLabel: '4–5',
      locationHint: 'arm',
      isOrganWound: false,
      title: { fr: 'Fracture ouverte du bras', en: 'Compound Arm Fracture' },
      activeEffect: {
        fr: 'Bras inutilisable et déclenche Saignement.',
        en: 'Arm unusable and causes Bleeding.',
      },
      stabilizedEffect: { fr: 'Impossible d’utiliser ce bras.', en: 'Arm cannot be used.' },
      treatedEffect: {
        fr: 'Bras en écharpe, peut tenir des objets.',
        en: 'Arm in sling, can still hold items.',
      },
    },
    {
      rollMin: 2,
      rollMax: 3,
      rollLabel: '2–3',
      locationHint: 'leg',
      isOrganWound: false,
      title: { fr: 'Fracture ouverte de la jambe', en: 'Compound Leg Fracture' },
      activeEffect: {
        fr: 'VIT, Esquive et Athlétisme ÷4 ; déclenche Saignement.',
        en: 'SPD, Dodge, Athletics ÷4; causes Bleeding.',
      },
      stabilizedEffect: {
        fr: 'VIT, Esquive et Athlétisme ÷2.',
        en: 'SPD, Dodge, Athletics halved.',
      },
      treatedEffect: {
        fr: '-2 VIT, Esquive/Évasion et Athlétisme.',
        en: '-2 SPD, Dodge/Escape, Athletics.',
      },
    },
  ],
  mortal: [
    {
      rollMin: 12,
      rollMax: 12,
      rollLabel: '12',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Fracture de la nuque / Décapitation', en: 'Broken Neck / Decapitation' },
      activeEffect: { fr: 'Mort instantanée.', en: 'Instant death.' },
      stabilizedEffect: {
        fr: 'Ne peut pas être stabilisée.',
        en: 'Cannot be stabilized.',
      },
      treatedEffect: { fr: 'Ne peut pas être traitée.', en: 'Cannot be treated.' },
    },
    {
      rollMin: 11,
      rollMax: 11,
      rollLabel: '11',
      locationHint: 'head',
      isOrganWound: false,
      title: { fr: 'Œil endommagé', en: 'Damaged Eye' },
      activeEffect: {
        fr: '-5 Vigilance vue, -4 DEX ; déclenche Saignement.',
        en: '-5 sight Awareness, -4 DEX; causes Bleeding.',
      },
      stabilizedEffect: {
        fr: '-3 Vigilance vue, -2 DEX.',
        en: '-3 sight Awareness, -2 DEX.',
      },
      treatedEffect: {
        fr: '-1 Vigilance vue et -1 DEX permanents.',
        en: 'Permanent -1 sight Awareness and -1 DEX.',
      },
    },
    {
      rollMin: 9,
      rollMax: 10,
      rollLabel: '9–10',
      locationHint: 'torso',
      isOrganWound: false,
      title: { fr: 'Cœur endommagé', en: 'Heart Damage' },
      activeEffect: {
        fr: 'Jet de sauvegarde Mort immédiat. Saignement ; END, VIT et COR ÷4.',
        en: 'Immediate Death Save. Bleeding; STA, SPD, BODY ÷4.',
      },
      stabilizedEffect: { fr: 'END, VIT et COR ÷2.', en: 'STA, SPD, BODY halved.' },
      treatedEffect: {
        fr: 'Tout saignement inflige +2 DÉG/rd permanent.',
        en: 'Any bleeding deals +2 DMG/rd permanently.',
      },
    },
    {
      rollMin: 6,
      rollMax: 8,
      rollLabel: '6–8',
      locationHint: 'torso',
      isOrganWound: true,
      title: { fr: 'Choc septique', en: 'Septic Shock' },
      activeEffect: {
        fr: 'END ÷4 ; -3 INT, VOL, RÉF, DEX ; déclenche Empoisonnement.',
        en: 'STA ÷4; -3 INT, WILL, REF, DEX; triggers Poisoned.',
      },
      stabilizedEffect: {
        fr: 'END ÷2 ; -1 INT, VOL, RÉF, DEX.',
        en: 'STA halved; -1 INT, WILL, REF, DEX.',
      },
      treatedEffect: { fr: '-5 END permanent.', en: 'Permanent -5 STA.' },
    },
    {
      rollMin: 4,
      rollMax: 5,
      rollLabel: '4–5',
      locationHint: 'arm',
      isOrganWound: false,
      title: { fr: 'Bras arraché', en: 'Severed Arm' },
      activeEffect: {
        fr: 'Bras inutilisable ; déclenche Saignement.',
        en: 'Arm unusable; triggers Bleeding.',
      },
      stabilizedEffect: { fr: 'Bras inutilisable.', en: 'Arm unusable.' },
      treatedEffect: {
        fr: 'Remplaçable par une prothèse.',
        en: 'Can be replaced with a prosthetic.',
      },
    },
    {
      rollMin: 2,
      rollMax: 3,
      rollLabel: '2–3',
      locationHint: 'leg',
      isOrganWound: false,
      title: { fr: 'Jambe arrachée', en: 'Severed Leg' },
      activeEffect: {
        fr: 'VIT, Esquive et Athlétisme ÷4 ; déclenche Saignement.',
        en: 'SPD, Dodge, Athletics ÷4; triggers Bleeding.',
      },
      stabilizedEffect: {
        fr: 'VIT, Esquive et Athlétisme ÷4.',
        en: 'SPD, Dodge, Athletics ÷4.',
      },
      treatedEffect: {
        fr: 'Remplaçable par une prothèse.',
        en: 'Can be replaced with a prosthetic.',
      },
    },
  ],
};

export const FUMBLE_TABLES: Record<
  FumbleCategoryId,
  { label: LocalizedText; entries: readonly FumbleRangeEntry[] }
> = {
  melee: {
    label: { fr: 'Attaque de mêlée', en: 'Melee Attack' },
    entries: [
      { minSeverity: 1, maxSeverity: 5, rangeLabel: '1–5', effect: { fr: 'Pas de conséquence majeure.', en: 'No major consequence.' } },
      { minSeverity: 6, maxSeverity: 6, rangeLabel: '6', effect: { fr: 'Votre arme dévie : vous êtes Stupéfait.', en: 'Weapon deflects: you become Staggered.' } },
      { minSeverity: 7, maxSeverity: 7, rangeLabel: '7', effect: { fr: 'Arme coincée dans un objet proche (1 round pour la dégager).', en: 'Weapon stuck in nearby object (1 round to free).' } },
      { minSeverity: 8, maxSeverity: 8, rangeLabel: '8', effect: { fr: 'Arme gravement endommagée : subit 1d10 dégâts de Fiabilité.', en: 'Weapon severely damaged: takes 1d10 Reliability damage.' } },
      { minSeverity: 9, maxSeverity: 9, rangeLabel: '9', effect: { fr: 'Vous vous blessez vous-même (localisation aléatoire).', en: 'You strike yourself (random hit location).' } },
      { minSeverity: 10, maxSeverity: null, rangeLabel: '>9', effect: { fr: 'Vous blessez un allié proche à portée (localisation aléatoire).', en: 'You strike a nearby ally in range (random location).' } },
    ],
  },
  armedDefense: {
    label: { fr: 'Défense armée (Blocage / Parade)', en: 'Armed Defense' },
    entries: [
      { minSeverity: 1, maxSeverity: 5, rangeLabel: '1–5', effect: { fr: 'Pas de conséquence majeure.', en: 'No major consequence.' } },
      { minSeverity: 6, maxSeverity: 6, rangeLabel: '6', effect: { fr: 'Votre arme subit +1d6 dégâts de Fiabilité.', en: 'Weapon takes +1d6 Reliability damage.' } },
      { minSeverity: 7, maxSeverity: 7, rangeLabel: '7', effect: { fr: 'Arme projetée à 1d6 m dans une direction aléatoire.', en: 'Weapon knocked 1d6 m away in a random direction.' } },
      { minSeverity: 8, maxSeverity: 8, rangeLabel: '8', effect: { fr: 'Projeté au sol : à terre et jet de sauvegarde ÉTOU.', en: 'Knocked prone; must roll Stun save.' } },
      { minSeverity: 9, maxSeverity: 9, rangeLabel: '9', effect: { fr: 'Votre arme subit +2d6 dégâts de Fiabilité.', en: 'Weapon takes +2d6 Reliability damage.' } },
      { minSeverity: 10, maxSeverity: null, rangeLabel: '>9', effect: { fr: 'Votre arme ricoche et vous frappe (localisation aléatoire).', en: 'Your weapon rebounds and strikes you (random location).' } },
    ],
  },
  ranged: {
    label: { fr: 'Attaque à distance', en: 'Ranged Attack' },
    entries: [
      { minSeverity: 1, maxSeverity: 5, rangeLabel: '1–5', effect: { fr: 'Pas de conséquence majeure.', en: 'No major consequence.' } },
      { minSeverity: 6, maxSeverity: 7, rangeLabel: '6–7', effect: { fr: 'Munition ou arme lancée brisée contre un obstacle.', en: 'Ammunition or thrown weapon shatters.' } },
      { minSeverity: 8, maxSeverity: 9, rangeLabel: '8–9', effect: { fr: 'Corde dénouée / arbalète enrayée / arme lâchée (1 round pour réparer).', en: 'Bowstring unstrung / crossbow jammed / dropped (1 round to fix).' } },
      { minSeverity: 10, maxSeverity: null, rangeLabel: '>9', effect: { fr: 'Ricochet sur un allié à portée (localisation aléatoire).', en: 'Ricochet hits an ally in range (random location).' } },
    ],
  },
  unarmed: {
    label: { fr: 'Mains nues / Esquive', en: 'Unarmed / Dodge' },
    entries: [
      { minSeverity: 1, maxSeverity: 5, rangeLabel: '1–5', effect: { fr: 'Pas de conséquence majeure.', en: 'No major consequence.' } },
      { minSeverity: 6, maxSeverity: 6, rangeLabel: '6', effect: { fr: 'Déséquilibré : vous êtes Stupéfait.', en: 'Off-balance: you become Staggered.' } },
      { minSeverity: 7, maxSeverity: 7, rangeLabel: '7', effect: { fr: 'Vous tombez au sol ; jet de sauvegarde ÉTOU.', en: 'Trip and fall prone; roll Stun save.' } },
      { minSeverity: 8, maxSeverity: 8, rangeLabel: '8', effect: { fr: 'Chute au sol et arme lâchée à 1d6 m.', en: 'Fall prone and drop weapon 1d6 m away.' } },
      { minSeverity: 9, maxSeverity: 9, rangeLabel: '9', effect: { fr: 'Chute sur la tête : 1d6 dégâts non létaux à la tête + sauvegarde ÉTOU.', en: 'Hit head: 1d6 non-lethal head damage + Stun save.' } },
      { minSeverity: 10, maxSeverity: null, rangeLabel: '>9', effect: { fr: 'Chute brutale : 1d6 dégâts létaux à la tête + sauvegarde ÉTOU.', en: 'Brutal fall: 1d6 lethal head damage + Stun save.' } },
    ],
  },
  magic: {
    label: { fr: 'Magie (Volonté)', en: 'Magic (Spellcasting)' },
    entries: [
      { minSeverity: 1, maxSeverity: 6, rangeLabel: '1–6', effect: { fr: 'Étincelles : 1 DÉG par point sous le SD. Sort échoué.', en: 'Magical sparks: 1 DMG per point under DC. Spell fails.' } },
      { minSeverity: 7, maxSeverity: 9, rangeLabel: '7–9', effect: { fr: 'Explosion interne : sort échoué + échec critique élémentaire.', en: 'Magical backlash: spell fails + elemental fumble effect.' } },
      { minSeverity: 10, maxSeverity: null, rangeLabel: '>9', effect: { fr: 'Catastrophe : échec critique élémentaire + focus explose (rayon 2 m, 1d10 DÉG).', en: 'Catastrophic overload: elemental fumble + focus explodes (2m, 1d10 DMG).' } },
    ],
  },
};

export const ATTACK_MODIFIERS_REFERENCE: readonly {
  circumstance: LocalizedText;
  mod: string;
}[] = [
  { circumstance: { fr: 'Cible immobilisée', en: 'Immobilized target' }, mod: '+4' },
  { circumstance: { fr: 'Cible esquivant activement (mêlée)', en: 'Target actively dodging (melee)' }, mod: '-2' },
  { circumstance: { fr: 'Cible mouvante (RÉF > 10)', en: 'Fast-moving target (REF > 10)' }, mod: '-3' },
  { circumstance: { fr: 'Dégainage rapide', en: 'Quick Draw' }, mod: '-3 (+3 Init)' },
  { circumstance: { fr: 'Embuscade', en: 'Ambush' }, mod: '+5' },
  { circumstance: { fr: 'Tir ricochet', en: 'Ricochet shot' }, mod: '-5' },
  { circumstance: { fr: 'Aveuglé (lumière, poussière)', en: 'Blinded (light, dust)' }, mod: '-3' },
  { circumstance: { fr: 'Cible à contre-jour', en: 'Target silhouetted' }, mod: '+2' },
  { circumstance: { fr: 'Viser (par tour, max 3)', en: 'Aiming (per round, max 3)' }, mod: '+1' },
  { circumstance: { fr: 'Frappe puissante', en: 'Strong Strike' }, mod: '-3 (×2 DÉG)' },
  { circumstance: { fr: 'Hors angle de vue', en: 'Outside line of sight' }, mod: '-3 / +3 ennemi' },
];

export const RANGE_MODIFIERS_REFERENCE: readonly {
  id: 'pointBlank' | 'short' | 'medium' | 'long' | 'extreme';
  label: LocalizedText;
  dc: number;
  mod: number;
}[] = [
  { id: 'pointBlank', label: { fr: 'À bout portant (< 50 cm)', en: 'Point Blank (< 50 cm)' }, dc: 10, mod: 5 },
  { id: 'short', label: { fr: 'Courte (¼ portée)', en: 'Short (¼ range)' }, dc: 15, mod: 0 },
  { id: 'medium', label: { fr: 'Intermédiaire (½ portée)', en: 'Medium (½ range)' }, dc: 20, mod: -2 },
  { id: 'long', label: { fr: 'Longue (portée de base)', en: 'Long (base range)' }, dc: 25, mod: -4 },
  { id: 'extreme', label: { fr: 'Extrême (×2 portée)', en: 'Extreme (×2 range)' }, dc: 30, mod: -6 },
];

export const COVER_PA_REFERENCE: readonly {
  id: string;
  label: LocalizedText;
  sp: number;
}[] = [
  { id: 'none', label: { fr: 'Aucun abri', en: 'No Cover' }, sp: 0 },
  { id: 'tent', label: { fr: 'Tente', en: 'Tent' }, sp: 5 },
  { id: 'thatch', label: { fr: 'Toit de chaume / Broussailles', en: 'Thatch / Brush' }, sp: 7 },
  { id: 'woodWall', label: { fr: 'Mur de bois / Carriole / Tonneau', en: 'Wood Wall / Cart / Barrel' }, sp: 10 },
  { id: 'woodDoor', label: { fr: 'Lourde porte en bois', en: 'Heavy Wood Door' }, sp: 15 },
  { id: 'steelDoor', label: { fr: 'Porte en acier', en: 'Steel Door' }, sp: 20 },
  { id: 'brickWall', label: { fr: 'Mur de brique', en: 'Brick Wall' }, sp: 25 },
  { id: 'stoneWall', label: { fr: 'Mur de pierre / Gros arbre', en: 'Stone Wall / Large Tree' }, sp: 30 },
];

export const ARMOR_LAYERING_REFERENCE: readonly {
  diff: string;
  bonus: string;
}[] = [
  { diff: '0–4', bonus: '+5' },
  { diff: '5–8', bonus: '+4' },
  { diff: '9–14', bonus: '+3' },
  { diff: '15–20', bonus: '+2' },
];

export interface ArchetypePreset {
  id: string;
  name: LocalizedText;
  role: CombatantRole;
  anatomy: AnatomyType;
  hp: number;
  end: number;
  armorSp: number;
  stats: {
    ref: number;
    dex: number;
    cor: number;
    vit: number;
    int: number;
    vol: number;
    rec: number;
    etou: number;
    vig: number;
  };
  weapons: readonly {
    name: LocalizedText;
    damage: string;
    damageType: 'slashing' | 'piercing' | 'bludgeoning' | 'elemental';
    isSilver: boolean;
    penetration: 'none' | 'normal' | 'improved';
    reliability: number;
    attacksPerRound: number;
    effectNote: string;
  }[];
}

export const ARCHETYPE_PRESETS: readonly ArchetypePreset[] = [
  {
    id: 'preset-witcher',
    name: { fr: 'Sorceleur (PJ)', en: 'Witcher (PC)' },
    role: 'pc',
    anatomy: 'human',
    hp: 40,
    end: 40,
    armorSp: 12,
    stats: { ref: 9, dex: 8, cor: 8, vit: 8, int: 6, vol: 7, rec: 8, etou: 8, vig: 2 },
    weapons: [
      {
        name: { fr: 'Épée en argent de sorceleur', en: 'Witcher Silver Sword' },
        damage: '4d6+2',
        damageType: 'slashing',
        isSilver: true,
        penetration: 'none',
        reliability: 15,
        attacksPerRound: 2,
        effectNote: '+3d6 vs Monstres',
      },
      {
        name: { fr: 'Épée en acier de sorceleur', en: 'Witcher Steel Sword' },
        damage: '4d6+2',
        damageType: 'slashing',
        isSilver: false,
        penetration: 'none',
        reliability: 15,
        attacksPerRound: 2,
        effectNote: 'Standard',
      },
    ],
  },
  {
    id: 'preset-man-at-arms',
    name: { fr: 'Homme d’armes (PJ)', en: 'Man-at-Arms (PC)' },
    role: 'pc',
    anatomy: 'human',
    hp: 45,
    end: 45,
    armorSp: 16,
    stats: { ref: 8, dex: 7, cor: 9, vit: 7, int: 5, vol: 6, rec: 9, etou: 9, vig: 0 },
    weapons: [
      {
        name: { fr: 'Épée longue / Hallebarde', en: 'Longsword / Halberd' },
        damage: '4d6+4',
        damageType: 'slashing',
        isSilver: false,
        penetration: 'normal',
        reliability: 15,
        attacksPerRound: 2,
        effectNote: 'Perforation',
      },
      {
        name: { fr: 'Arbalète lourde', en: 'Heavy Crossbow' },
        damage: '4d6+2',
        damageType: 'piercing',
        isSilver: false,
        penetration: 'normal',
        reliability: 12,
        attacksPerRound: 1,
        effectNote: '1 action recharge',
      },
    ],
  },
  {
    id: 'preset-mage',
    name: { fr: 'Mage / Sorcière (PJ)', en: 'Mage (PC)' },
    role: 'pc',
    anatomy: 'human',
    hp: 25,
    end: 35,
    armorSp: 5,
    stats: { ref: 5, dex: 6, cor: 4, vit: 6, int: 9, vol: 9, rec: 5, etou: 5, vig: 5 },
    weapons: [
      {
        name: { fr: 'Trait d’Aenye / Feu', en: 'Aenye / Fire Bolt' },
        damage: '4d6',
        damageType: 'elemental',
        isSilver: false,
        penetration: 'none',
        reliability: 15,
        attacksPerRound: 1,
        effectNote: 'Incinération (50%)',
      },
      {
        name: { fr: 'Bâton ferré', en: 'Ironshod Staff' },
        damage: '2d6',
        damageType: 'bludgeoning',
        isSilver: false,
        penetration: 'none',
        reliability: 12,
        attacksPerRound: 1,
        effectNote: 'Focus -2 END',
      },
    ],
  },
  {
    id: 'preset-doctor',
    name: { fr: 'Médecin / Prêtre (PJ)', en: 'Doctor / Priest (PC)' },
    role: 'pc',
    anatomy: 'human',
    hp: 30,
    end: 30,
    armorSp: 6,
    stats: { ref: 6, dex: 7, cor: 5, vit: 6, int: 8, vol: 7, rec: 6, etou: 6, vig: 2 },
    weapons: [
      {
        name: { fr: 'Dague de chirurgien', en: 'Surgeon’s Dagger' },
        damage: '2d6',
        damageType: 'piercing',
        isSilver: false,
        penetration: 'none',
        reliability: 10,
        attacksPerRound: 1,
        effectNote: 'Premiers soins +8',
      },
    ],
  },
  {
    id: 'preset-guard',
    name: { fr: 'Garde / Mercenaire (Allié)', en: 'Guard / Mercenary (Ally)' },
    role: 'ally',
    anatomy: 'human',
    hp: 30,
    end: 30,
    armorSp: 10,
    stats: { ref: 6, dex: 6, cor: 7, vit: 6, int: 5, vol: 5, rec: 6, etou: 6, vig: 0 },
    weapons: [
      {
        name: { fr: 'Épée d’armement', en: 'Arming Sword' },
        damage: '3d6',
        damageType: 'slashing',
        isSilver: false,
        penetration: 'none',
        reliability: 12,
        attacksPerRound: 1,
        effectNote: 'Standard',
      },
    ],
  },
];
