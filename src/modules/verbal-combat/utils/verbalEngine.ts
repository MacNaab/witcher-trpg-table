import type { CharacterSheetState, SkillId } from '@/src/modules/character-generator/types';
import type { SavedPartyCharacter } from '@/src/modules/combat-tracker/types';
import {
  generateId,
  rollDiceFormula,
  rollDie,
  rollWitcherD10,
} from '@/src/modules/combat-tracker/utils/combatEngine';
import {
  RELATIONSHIP_META,
  VERBAL_ATTACK_TOOLS,
  VERBAL_CONDITION_META,
  VERBAL_DEFENSE_TOOLS,
  VERBAL_NPC_ARCHETYPES,
} from '../data/verbalRulesData';
import type {
  ModuleLanguage,
  RelationshipTier,
  SavedVerbalSession,
  VerbalAttackId,
  VerbalConditionId,
  VerbalContextType,
  VerbalDefenseId,
  VerbalLogEntry,
  VerbalNpcArchetype,
  VerbalParticipant,
  VerbalParticipantSkills,
  VerbalParticipantStats,
  VerbalRole,
  VerbalSkillKey,
} from '../types';

export const VERBAL_SESSIONS_STORAGE_KEY = 'witcher-gm-verbal-sessions-v1';

/**
 * Official Witcher TRPG Resolve formula: floor((WILL + INT) / 2) * 5.
 */
export function calculateMaxResolve(intStat: number, volStat: number): number {
  return Math.max(5, Math.floor((Math.max(1, intStat) + Math.max(1, volStat)) / 2) * 5);
}

export function createDefaultVerbalSkills(base = 4): VerbalParticipantSkills {
  return {
    persuasion: base,
    charisma: base,
    seduction: Math.max(0, base - 2),
    leadership: Math.max(0, base - 1),
    intimidation: base,
    deceit: Math.max(0, base - 1),
    education: base,
    etiquette: Math.max(0, base - 1),
    business: base,
    humanPerception: base,
    resistCoercion: base,
  };
}

export function getGoverningStatForSkill(
  skill: VerbalSkillKey
): keyof VerbalParticipantStats {
  switch (skill) {
    case 'intimidation':
    case 'resistCoercion':
      return 'vol';
    case 'education':
    case 'etiquette':
    case 'business':
      return 'int';
    default:
      return 'emp';
  }
}

export function getVerbalSkillBase(
  participant: VerbalParticipant,
  skill: VerbalSkillKey
): number {
  const statKey = getGoverningStatForSkill(skill);
  return (participant.stats[statKey] ?? 0) + (participant.skills[skill] ?? 0);
}

export function rollVerbalInitiative(emp: number): {
  roll: number;
  total: number;
} {
  const roll = rollDie(10);
  return { roll, total: emp + roll };
}

export function createVerbalParticipantFromArchetype(
  arch: VerbalNpcArchetype,
  lang: ModuleLanguage,
  nameOverride?: string
): VerbalParticipant {
  const maxResolve = calculateMaxResolve(arch.stats.int, arch.stats.vol);
  const init = rollVerbalInitiative(arch.stats.emp);
  return {
    id: generateId('vb'),
    name: nameOverride?.trim() || arch.label[lang],
    role: arch.role,
    titleLabel: arch.title[lang],
    relationship: arch.relationship,
    initiative: init.total,
    initiativeRoll: init.roll,
    actedThisRound: false,
    resolve: maxResolve,
    maxResolve,
    stats: { ...arch.stats },
    skills: { ...arch.skills },
    conditions: [],
    notes: arch.notes[lang],
  };
}

export function createCustomVerbalParticipant(params: {
  name: string;
  role: VerbalRole;
  titleLabel?: string;
  relationship: RelationshipTier;
  emp: number;
  int: number;
  vol: number;
  skillBaseline: number;
  notes?: string;
}): VerbalParticipant {
  const maxResolve = calculateMaxResolve(params.int, params.vol);
  const init = rollVerbalInitiative(params.emp);
  return {
    id: generateId('vb'),
    name: params.name.trim(),
    role: params.role,
    titleLabel: params.titleLabel?.trim() || '',
    relationship: params.relationship,
    initiative: init.total,
    initiativeRoll: init.roll,
    actedThisRound: false,
    resolve: maxResolve,
    maxResolve,
    stats: { emp: params.emp, int: params.int, vol: params.vol },
    skills: createDefaultVerbalSkills(params.skillBaseline),
    conditions: [],
    notes: params.notes?.trim() || '',
  };
}

export function createVerbalParticipantFromHubPc(
  pc: SavedPartyCharacter,
  empOverride = 6
): VerbalParticipant {
  const intStat = Math.max(1, pc.stats.int || 6);
  const volStat = Math.max(1, pc.stats.vol || 6);
  const empStat = Math.max(1, empOverride);
  const maxResolve = calculateMaxResolve(intStat, volStat);
  const init = rollVerbalInitiative(empStat);

  return {
    id: generateId('vb'),
    hubPcId: pc.id,
    name: pc.name,
    role: pc.role === 'ally' ? 'ally' : 'pc',
    titleLabel: pc.professionLabel || pc.playerName || '',
    relationship: 'neutral',
    initiative: init.total,
    initiativeRoll: init.roll,
    actedThisRound: false,
    resolve: maxResolve,
    maxResolve,
    stats: { emp: empStat, int: intStat, vol: volStat },
    skills: createDefaultVerbalSkills(5),
    conditions: [],
    notes: pc.notes || '',
  };
}

export function loadCharGenDraftForVerbal(
  lang: ModuleLanguage
): VerbalParticipant | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem('witcher-gm-chargen-draft-v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: Partial<CharacterSheetState> };
    const st = parsed?.state;
    if (!st || !st.stats) return null;

    const getSkillRank = (id: SkillId): number =>
      (st.professionSkillRanks?.[id] ?? 0) + (st.generalSkillRanks?.[id] ?? 0);

    const emp = st.stats.EMP ?? 6;
    const intStat = st.stats.INT ?? 6;
    const volStat = st.stats.VOL ?? 6;
    const maxResolve = calculateMaxResolve(intStat, volStat);
    const init = rollVerbalInitiative(emp);

    const defaultName =
      lang === 'fr' ? 'PJ du Générateur' : 'Character Sheet PC';

    return {
      id: generateId('vb'),
      name: st.characterName?.trim() || defaultName,
      role: 'pc',
      titleLabel: st.professionId || '',
      relationship: 'neutral',
      initiative: init.total,
      initiativeRoll: init.roll,
      actedThisRound: false,
      resolve: maxResolve,
      maxResolve,
      stats: { emp, int: intStat, vol: volStat },
      skills: {
        persuasion: getSkillRank('emp_persuasion'),
        charisma: getSkillRank('emp_charisma'),
        seduction: getSkillRank('emp_seduction'),
        leadership: getSkillRank('emp_leadership'),
        intimidation: getSkillRank('vol_intimidation'),
        deceit: getSkillRank('emp_deceit'),
        education: getSkillRank('int_education'),
        etiquette: getSkillRank('int_etiquette'),
        business: getSkillRank('int_business'),
        humanPerception: getSkillRank('emp_human_perception'),
        resistCoercion: getSkillRank('vol_resist_coercion'),
      },
      conditions: [],
      notes: '',
    };
  } catch {
    return null;
  }
}

export interface VerbalExchangeInput {
  attacker: VerbalParticipant;
  defender: VerbalParticipant;
  attackToolId: VerbalAttackId;
  defenseToolId: VerbalDefenseId;
  attackerMiscMod: number;
  defenderMiscMod: number;
  manualAttackDie?: number | null;
  manualDefenseDie?: number | null;
  lang: ModuleLanguage;
}

export interface VerbalExchangeResolution {
  hit: boolean;
  margin: number;
  attackDieLabel: string;
  defenseDieLabel: string;
  attackTotal: number;
  defenseTotal: number;
  attackBase: number;
  defenseBase: number;
  resolveDamage: number;
  damageDetail: string;
  counterDamage: number;
  counterDetail: string;
  appliedCondition?: VerbalConditionId;
  critSuccess: boolean;
  critFail: boolean;
  summaryText: string;
}

function getConditionAttackPenalty(
  p: VerbalParticipant,
  toolId: VerbalAttackId
): number {
  let mod = 0;
  if (p.conditions.includes('intimidated')) mod -= 2;
  if (p.conditions.includes('ridiculed')) mod -= 2;
  if (p.conditions.includes('unmasked') && (toolId === 'deceit' || toolId === 'persuasion')) {
    mod -= 3;
  }
  return mod;
}

function getConditionDefensePenalty(p: VerbalParticipant): number {
  let mod = 0;
  if (p.conditions.includes('ridiculed')) mod -= 2;
  if (p.conditions.includes('rattled')) mod -= 1;
  return mod;
}

export function resolveVerbalExchange(
  input: VerbalExchangeInput
): VerbalExchangeResolution {
  const {
    attacker,
    defender,
    attackToolId,
    defenseToolId,
    attackerMiscMod,
    defenderMiscMod,
    manualAttackDie,
    manualDefenseDie,
    lang,
  } = input;

  const attackTool =
    VERBAL_ATTACK_TOOLS.find((t) => t.id === attackToolId) ??
    VERBAL_ATTACK_TOOLS[0];
  const defenseTool =
    VERBAL_DEFENSE_TOOLS.find((t) => t.id === defenseToolId) ??
    VERBAL_DEFENSE_TOOLS[0];

  const atkBase = getVerbalSkillBase(attacker, attackTool.skillKey);
  const defBase = getVerbalSkillBase(defender, defenseTool.skillKey);

  // Defender's attitude toward attacker acts as modifier on attacker's roll (official rule)
  const relMod = RELATIONSHIP_META[defender.relationship].modifier;
  const atkCondMod = getConditionAttackPenalty(attacker, attackToolId);
  const defCondMod = getConditionDefensePenalty(defender);

  const atkRoll =
    typeof manualAttackDie === 'number' && !Number.isNaN(manualAttackDie)
      ? {
          dieValue: manualAttackDie,
          rolls: [manualAttackDie],
          isCritSuccess: manualAttackDie >= 10,
          isCritFail: manualAttackDie <= 1,
        }
      : rollWitcherD10();

  const defRoll =
    typeof manualDefenseDie === 'number' && !Number.isNaN(manualDefenseDie)
      ? {
          dieValue: manualDefenseDie,
          rolls: [manualDefenseDie],
          isCritSuccess: manualDefenseDie >= 10,
          isCritFail: manualDefenseDie <= 1,
        }
      : rollWitcherD10();

  const attackTotal =
    atkBase + atkRoll.dieValue + relMod + atkCondMod + attackerMiscMod;
  const defenseTotal =
    defBase + defRoll.dieValue + defCondMod + defenderMiscMod;
  const margin = attackTotal - defenseTotal;
  const hit = margin > 0;

  let resolveDamage = 0;
  let damageDetail = '';
  let counterDamage = 0;
  let counterDetail = '';
  let appliedCondition: VerbalConditionId | undefined;

  if (hit) {
    const rolledDmg = rollDiceFormula(attackTool.damageDice);
    const statBonus = attacker.stats[attackTool.damageStat] ?? 0;
    const critBonus = margin >= 7 || atkRoll.isCritSuccess ? 3 : 0;
    resolveDamage = Math.max(1, rolledDmg.total + statBonus + critBonus);
    damageDetail = `${attackTool.damageDice} (${rolledDmg.detail}) + ${statBonus}${critBonus > 0 ? ` + ${critBonus} crit.` : ''} = ${resolveDamage}`;
    appliedCondition = attackTool.appliesCondition;
  } else if (defenseToolId === 'counter' && defenseTotal - attackTotal >= 3) {
    const counterRoll = rollDiceFormula('1d6');
    counterDamage = Math.max(1, counterRoll.total);
    counterDetail = `1d6 (${counterRoll.detail}) = ${counterDamage}`;
  } else if (defenseToolId === 'read_intent' && attackToolId === 'deceit') {
    appliedCondition = 'unmasked';
  }

  const attackDieLabel =
    atkRoll.rolls.length > 1
      ? `${atkRoll.rolls.join('+')} (${atkRoll.dieValue})`
      : `${atkRoll.dieValue}`;
  const defenseDieLabel =
    defRoll.rolls.length > 1
      ? `${defRoll.rolls.join('+')} (${defRoll.dieValue})`
      : `${defRoll.dieValue}`;

  const summaryText =
    lang === 'fr'
      ? hit
        ? `${attacker.name} (${attackTool.label.fr} : ${attackTotal}) surpasse ${defender.name} (${defenseTool.label.fr} : ${defenseTotal}) [marge +${margin}] → -${resolveDamage} Détermination${appliedCondition ? ` · ${VERBAL_CONDITION_META[appliedCondition].label.fr}` : ''}.`
        : counterDamage > 0
          ? `${defender.name} contre-argumente ${attacker.name} (${defenseTotal} vs ${attackTotal}) → riposte -${counterDamage} Détermination !`
          : appliedCondition === 'unmasked'
            ? `${defender.name} démasque la duperie de ${attacker.name} (${defenseTotal} vs ${attackTotal}) → ${VERBAL_CONDITION_META.unmasked.label.fr} !`
            : `${defender.name} résiste à ${attacker.name} (${defenseTool.label.fr} ${defenseTotal} vs ${attackTool.label.fr} ${attackTotal}).`
      : hit
        ? `${attacker.name} (${attackTool.label.en}: ${attackTotal}) overcomes ${defender.name} (${defenseTool.label.en}: ${defenseTotal}) [margin +${margin}] → -${resolveDamage} Resolve${appliedCondition ? ` · ${VERBAL_CONDITION_META[appliedCondition].label.en}` : ''}.`
        : counterDamage > 0
          ? `${defender.name} counters ${attacker.name} (${defenseTotal} vs ${attackTotal}) → -${counterDamage} Resolve riposte!`
          : appliedCondition === 'unmasked'
            ? `${defender.name} sees through ${attacker.name}'s deceit (${defenseTotal} vs ${attackTotal}) → ${VERBAL_CONDITION_META.unmasked.label.en}!`
            : `${defender.name} withstands ${attacker.name} (${defenseTool.label.en} ${defenseTotal} vs ${attackTool.label.en} ${attackTotal}).`;

  return {
    hit,
    margin,
    attackDieLabel,
    defenseDieLabel,
    attackTotal,
    defenseTotal,
    attackBase: atkBase + relMod + atkCondMod + attackerMiscMod,
    defenseBase: defBase + defCondMod + defenderMiscMod,
    resolveDamage,
    damageDetail,
    counterDamage,
    counterDetail,
    appliedCondition,
    critSuccess: atkRoll.isCritSuccess,
    critFail: atkRoll.isCritFail,
    summaryText,
  };
}

export function loadVerbalSessions(): SavedVerbalSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(VERBAL_SESSIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s): s is SavedVerbalSession =>
        Boolean(
          s &&
            typeof s === 'object' &&
            typeof s.id === 'string' &&
            typeof s.title === 'string' &&
            s.state &&
            Array.isArray(s.state.participants)
        )
    );
  } catch {
    return [];
  }
}

export function saveVerbalSessions(sessions: readonly SavedVerbalSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      VERBAL_SESSIONS_STORAGE_KEY,
      JSON.stringify(sessions)
    );
  } catch {
    // Ignore storage quota errors
  }
}

export function createVerbalSession(params: {
  title: string;
  contextType: VerbalContextType;
  stakes: string;
  participants?: VerbalParticipant[];
}): SavedVerbalSession {
  return {
    id: generateId('vs'),
    title: params.title,
    status: 'active',
    updatedAt: new Date().toISOString(),
    state: {
      contextType: params.contextType,
      stakes: params.stakes,
      round: 0,
      activeParticipantId: params.participants?.[0]?.id ?? null,
      participants: params.participants ?? [],
      logs: [],
    },
  };
}

export function buildVerbalScenarioPreset(
  presetId: 'contract' | 'interrogation' | 'trial',
  lang: ModuleLanguage
): SavedVerbalSession {
  const merchant = VERBAL_NPC_ARCHETYPES[2];
  const captain = VERBAL_NPC_ARCHETYPES[1];
  const magistrate = VERBAL_NPC_ARCHETYPES[0];

  if (presetId === 'contract') {
    const npc = createVerbalParticipantFromArchetype(merchant, lang);
    return createVerbalSession({
      title:
        lang === 'fr'
          ? 'Marchandage de contrat — Guilde marchande'
          : 'Contract Bargaining — Merchant Guild',
      contextType: 'negotiation',
      stakes:
        lang === 'fr'
          ? 'Doubler la prime du contrat et obtenir un sauf-conduit.'
          : 'Double the contract bounty and secure safe-conduct papers.',
      participants: [npc],
    });
  }

  if (presetId === 'interrogation') {
    const npc = createVerbalParticipantFromArchetype(captain, lang);
    return createVerbalSession({
      title:
        lang === 'fr'
          ? 'Interrogatoire au poste de garde'
          : 'Guardhouse Interrogation',
      contextType: 'interrogation',
      stakes:
        lang === 'fr'
          ? 'Obtenir les clés des geôles ou faire avouer le complice.'
          : 'Extract cell keys or force a confession regarding the accomplice.',
      participants: [npc],
    });
  }

  const npc = createVerbalParticipantFromArchetype(magistrate, lang);
  return createVerbalSession({
    title:
      lang === 'fr'
        ? 'Audience / Procès devant le Bailli'
        : 'Court Hearing / Trial before the Bailiff',
    contextType: 'trial',
    stakes:
      lang === 'fr'
        ? 'Éviter la confiscation des biens et obtenir l’acquittement.'
        : 'Prevent asset seizure and secure full acquittal.',
    participants: [npc],
  });
}

export function formatVerbalTimestamp(
  iso: string,
  lang: ModuleLanguage
): string {
  try {
    return new Date(iso).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

export function createVerbalLogEntry(
  round: number,
  type: VerbalLogEntry['type'],
  message: string
): VerbalLogEntry {
  const now = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return {
    id: generateId('vlog'),
    round,
    timestamp: now,
    type,
    message,
  };
}
