import type { LocalizedText } from '@/src/data/bestiary/types';
import type {
  RelationshipTier,
  VerbalAttackToolMeta,
  VerbalConditionId,
  VerbalContextType,
  VerbalDefenseToolMeta,
  VerbalNpcArchetype,
  VerbalSkillKey,
} from '../types';

export const RELATIONSHIP_META: Record<
  RelationshipTier,
  { modifier: number; label: LocalizedText }
> = {
  hostile: {
    modifier: -4,
    label: { fr: 'Hostile (-4)', en: 'Hostile (-4)' },
  },
  unfriendly: {
    modifier: -2,
    label: { fr: 'Méfiant (-2)', en: 'Unfriendly (-2)' },
  },
  neutral: {
    modifier: 0,
    label: { fr: 'Neutre (0)', en: 'Neutral (0)' },
  },
  friendly: {
    modifier: 2,
    label: { fr: 'Amical (+2)', en: 'Friendly (+2)' },
  },
  helpful: {
    modifier: 4,
    label: { fr: 'Dévoué (+4)', en: 'Helpful (+4)' },
  },
};

export const VERBAL_SKILL_LABELS: Record<
  VerbalSkillKey,
  { stat: 'emp' | 'int' | 'vol'; label: LocalizedText }
> = {
  persuasion: {
    stat: 'emp',
    label: { fr: 'Persuasion (EMP)', en: 'Persuasion (EMP)' },
  },
  charisma: {
    stat: 'emp',
    label: { fr: 'Charisme (EMP)', en: 'Charisma (EMP)' },
  },
  seduction: {
    stat: 'emp',
    label: { fr: 'Séduction (EMP)', en: 'Seduction (EMP)' },
  },
  leadership: {
    stat: 'emp',
    label: { fr: 'Commandement (EMP)', en: 'Leadership (EMP)' },
  },
  intimidation: {
    stat: 'vol',
    label: { fr: 'Intimidation (VOL)', en: 'Intimidation (WILL)' },
  },
  deceit: {
    stat: 'emp',
    label: { fr: 'Duperie (EMP)', en: 'Deceit (EMP)' },
  },
  education: {
    stat: 'int',
    label: { fr: 'Éducation (INT)', en: 'Education (INT)' },
  },
  etiquette: {
    stat: 'int',
    label: { fr: 'Étiquette (INT)', en: 'Social Etiquette (INT)' },
  },
  business: {
    stat: 'int',
    label: { fr: 'Négociation (INT)', en: 'Business (INT)' },
  },
  humanPerception: {
    stat: 'emp',
    label: { fr: 'Psychologie (EMP)', en: 'Human Perception (EMP)' },
  },
  resistCoercion: {
    stat: 'vol',
    label: { fr: 'Rés. contrainte (VOL)', en: 'Resist Coercion (WILL)' },
  },
};

export const VERBAL_ATTACK_TOOLS: readonly VerbalAttackToolMeta[] = [
  {
    id: 'persuasion',
    label: { fr: 'Persuasion', en: 'Persuasion' },
    skillKey: 'persuasion',
    statKey: 'emp',
    damageDice: '1d6',
    damageStat: 'emp',
    summary: {
      fr: '1d6 + EMP en dégâts de Détermination. Argument raisonné, compromis ou appel au bon sens.',
      en: '1d6 + EMP Resolve damage. Reasoned argument, compromise, or appeal to logic.',
    },
  },
  {
    id: 'seduction',
    label: { fr: 'Charme / Séduction', en: 'Romance / Seduction' },
    skillKey: 'seduction',
    statKey: 'emp',
    damageDice: '1d6',
    damageStat: 'emp',
    appliesCondition: 'charmed',
    summary: {
      fr: '1d6 + EMP. Si l’attaque passe, la cible est Séduite et hésite à attaquer frontalement.',
      en: '1d6 + EMP. On hit, target is Charmed and reluctant to make hostile attacks.',
    },
  },
  {
    id: 'intimidation',
    label: { fr: 'Intimidation', en: 'Intimidation' },
    skillKey: 'intimidation',
    statKey: 'vol',
    damageDice: '1d10',
    damageStat: 'vol',
    appliesCondition: 'intimidated',
    summary: {
      fr: '1d10 + VOL. Pression directe ou menace ; inflige Intimidé (-2 aux répliques).',
      en: '1d10 + WILL. Direct threat or pressure; inflicts Intimidated (-2 to replies).',
    },
  },
  {
    id: 'deceit',
    label: { fr: 'Duperie / Bluff', en: 'Deceit / Bluff' },
    skillKey: 'deceit',
    statKey: 'emp',
    damageDice: '1d6',
    damageStat: 'int',
    appliesCondition: 'rattled',
    summary: {
      fr: '1d6 + INT. Mensonge plausible ou demi-vérité ; peut être démasqué par Psychologie.',
      en: '1d6 + INT. Plausible lie or half-truth; vulnerable to Human Perception.',
    },
  },
  {
    id: 'ridicule',
    label: { fr: 'Moquerie / Discrédit', en: 'Ridicule' },
    skillKey: 'charisma',
    statKey: 'emp',
    damageDice: '1d6',
    damageStat: 'emp',
    appliesCondition: 'ridiculed',
    summary: {
      fr: '1d6 + EMP. Tourne l’interlocuteur en ridicule ; inflige Discrédité (-2 aux jets sociaux).',
      en: '1d6 + EMP. Undermines credibility in public; inflicts Ridiculed (-2 to social rolls).',
    },
  },
  {
    id: 'leadership',
    label: { fr: 'Autorité / Commandement', en: 'Leadership / Authority' },
    skillKey: 'leadership',
    statKey: 'emp',
    damageDice: '1d6',
    damageStat: 'vol',
    summary: {
      fr: '1d6 + VOL. Poids du rang, du prestige militaire ou d’un mandat officiel.',
      en: '1d6 + WILL. Weight of rank, military authority, or official writ.',
    },
  },
  {
    id: 'hard_facts',
    label: { fr: 'Preuve / Argument imparable', en: 'Hard Facts / Evidence' },
    skillKey: 'education',
    statKey: 'int',
    damageDice: '2d6',
    damageStat: 'int',
    appliesCondition: 'rattled',
    summary: {
      fr: '2d6 + INT. Pièce à conviction, loi écrite ou contradiction factuelle irréfutable.',
      en: '2d6 + INT. Physical evidence, legal precedent, or undeniable factual contradiction.',
    },
  },
];

export const VERBAL_DEFENSE_TOOLS: readonly VerbalDefenseToolMeta[] = [
  {
    id: 'ignore',
    label: { fr: 'Stoïcisme / Ignorer', en: 'Ignore / Stonewall' },
    skillKey: 'resistCoercion',
    statKey: 'vol',
    summary: {
      fr: 'Résistance à la contrainte + VOL. Encaisse la pression sans riposte.',
      en: 'Resist Coercion + WILL. Endures verbal pressure without counter-attacking.',
    },
  },
  {
    id: 'counter',
    label: { fr: 'Contre-argumenter', en: 'Counter-Argue' },
    skillKey: 'persuasion',
    statKey: 'emp',
    summary: {
      fr: 'Persuasion + EMP. Si la défense l’emporte de +3 ou plus, inflige 1d6 de Détermination en retour.',
      en: 'Persuasion + EMP. If defense wins by +3 or more, deals 1d6 Resolve back to attacker.',
    },
  },
  {
    id: 'deflect',
    label: { fr: 'Esquive verbale / Détourner', en: 'Change the Subject' },
    skillKey: 'charisma',
    statKey: 'emp',
    summary: {
      fr: 'Charisme + EMP. Dévie l’échange vers un autre sujet ou noie le poisson.',
      en: 'Charisma + EMP. Redirects the conversation or dodges the accusation.',
    },
  },
  {
    id: 'read_intent',
    label: { fr: 'Démasquer / Psychologie', en: 'See Through / Read Intent' },
    skillKey: 'humanPerception',
    statKey: 'emp',
    summary: {
      fr: 'Psychologie + EMP. Perce les mensonges ; si réussi contre Duperie, inflige Démasqué.',
      en: 'Human Perception + EMP. Spots lies; against Deceit, inflicts Unmasked on success.',
    },
  },
  {
    id: 'appease',
    label: { fr: 'Désamorcer / Négocier', en: 'Appease / Negotiate' },
    skillKey: 'business',
    statKey: 'int',
    summary: {
      fr: 'Négociation + INT. Ramène le débat vers les intérêts matériels ou un terrain neutre.',
      en: 'Business + INT. Reframes pressure around practical terms and mutual gain.',
    },
  },
];

export const VERBAL_CONDITION_META: Record<
  VerbalConditionId,
  { label: LocalizedText; effect: LocalizedText }
> = {
  intimidated: {
    label: { fr: 'Intimidé', en: 'Intimidated' },
    effect: {
      fr: '-2 aux jets d’attaque verbale.',
      en: '-2 to verbal attack rolls.',
    },
  },
  ridiculed: {
    label: { fr: 'Discrédité', en: 'Ridiculed' },
    effect: {
      fr: '-2 à tous les jets sociaux devant un public.',
      en: '-2 to all social rolls before an audience.',
    },
  },
  charmed: {
    label: { fr: 'Séduit / Attendri', en: 'Charmed' },
    effect: {
      fr: 'Ne peut utiliser d’attaque agressive tant que la tension dure.',
      en: 'Cannot initiate aggressive verbal tools while charmed.',
    },
  },
  rattled: {
    label: { fr: 'Ébranlé', en: 'Rattled' },
    effect: {
      fr: '-1 aux défenses verbales ce round.',
      en: '-1 to verbal defenses this round.',
    },
  },
  unmasked: {
    label: { fr: 'Démasqué', en: 'Unmasked' },
    effect: {
      fr: 'Mensonge révélé : -3 en Duperie et Persuasion.',
      en: 'Lie exposed: -3 to Deceit and Persuasion.',
    },
  },
  broken: {
    label: { fr: 'Cédé / Convaincu', en: 'Yielded / Broken' },
    effect: {
      fr: 'Détermination à 0 : l’interlocuteur cède ou quitte la négociation.',
      en: 'Resolve at 0: participant concedes or breaks off talks.',
    },
  },
};

export const VERBAL_CONTEXT_LABELS: Record<VerbalContextType, LocalizedText> = {
  negotiation: { fr: 'Négociation / Marchandage', en: 'Negotiation / Bargaining' },
  interrogation: { fr: 'Interrogatoire', en: 'Interrogation' },
  trial: { fr: 'Procès / Audience', en: 'Trial / Court Audience' },
  debate: { fr: 'Joute / Débat politique', en: 'Political Debate / Parley' },
};

export const VERBAL_NPC_ARCHETYPES: readonly VerbalNpcArchetype[] = [
  {
    id: 'arch-magistrate',
    label: { fr: 'Magistrat / Bailli de cité', en: 'City Magistrate / Bailiff' },
    role: 'opponent',
    title: { fr: 'Magistrat', en: 'Magistrate' },
    relationship: 'unfriendly',
    stats: { emp: 6, int: 8, vol: 7 },
    skills: {
      persuasion: 6,
      charisma: 5,
      seduction: 2,
      leadership: 6,
      intimidation: 5,
      deceit: 5,
      education: 7,
      etiquette: 7,
      business: 5,
      humanPerception: 6,
      resistCoercion: 6,
    },
    notes: {
      fr: 'Attaché aux preuves matérielles et au protocole.',
      en: 'Values written law, protocol, and hard evidence.',
    },
  },
  {
    id: 'arch-guard-captain',
    label: { fr: 'Capitaine de la garde', en: 'City Guard Captain' },
    role: 'opponent',
    title: { fr: 'Capitaine de garde', en: 'Guard Captain' },
    relationship: 'unfriendly',
    stats: { emp: 5, int: 6, vol: 7 },
    skills: {
      persuasion: 4,
      charisma: 4,
      seduction: 1,
      leadership: 6,
      intimidation: 7,
      deceit: 3,
      education: 4,
      etiquette: 4,
      business: 4,
      humanPerception: 5,
      resistCoercion: 6,
    },
    notes: {
      fr: 'Privilégie l’intimidation et l’ordre public.',
      en: 'Favors intimidation and civic order over subtlety.',
    },
  },
  {
    id: 'arch-guild-merchant',
    label: { fr: 'Maître marchand / Prêteur', en: 'Guild Merchant / Moneylender' },
    role: 'opponent',
    title: { fr: 'Maître marchand', en: 'Guild Merchant' },
    relationship: 'neutral',
    stats: { emp: 7, int: 7, vol: 6 },
    skills: {
      persuasion: 6,
      charisma: 6,
      seduction: 3,
      leadership: 4,
      intimidation: 3,
      deceit: 6,
      education: 5,
      etiquette: 5,
      business: 8,
      humanPerception: 6,
      resistCoercion: 5,
    },
    notes: {
      fr: 'Sensible aux arguments chiffrés, dettes et garanties commerciales.',
      en: 'Responds to coin, leverage, and trade guarantees.',
    },
  },
  {
    id: 'arch-village-elder',
    label: { fr: 'Ancien de village méfiant', en: 'Suspicious Village Elder' },
    role: 'witness',
    title: { fr: 'Ancien du village', en: 'Village Elder' },
    relationship: 'unfriendly',
    stats: { emp: 6, int: 5, vol: 6 },
    skills: {
      persuasion: 4,
      charisma: 4,
      seduction: 1,
      leadership: 5,
      intimidation: 3,
      deceit: 4,
      education: 3,
      etiquette: 2,
      business: 4,
      humanPerception: 5,
      resistCoercion: 5,
    },
    notes: {
      fr: 'Craint les étrangers et les sorceleurs, mais protège sa communauté.',
      en: 'Distrusts outsiders and witchers, yet fiercely protects the hamlet.',
    },
  },
  {
    id: 'arch-witch-hunter',
    label: { fr: 'Inquisiteur / Chasseur de sorcières', en: 'Witch Hunter Inquisitor' },
    role: 'opponent',
    title: { fr: 'Chasseur de sorcières', en: 'Witch Hunter' },
    relationship: 'hostile',
    stats: { emp: 4, int: 6, vol: 8 },
    skills: {
      persuasion: 4,
      charisma: 3,
      seduction: 1,
      leadership: 6,
      intimidation: 8,
      deceit: 5,
      education: 5,
      etiquette: 4,
      business: 3,
      humanPerception: 6,
      resistCoercion: 8,
    },
    notes: {
      fr: 'Zèle fanatique ; très difficile à intimider ou corrompre.',
      en: 'Zealous fanatic; extremely resistant to coercion or bribes.',
    },
  },
  {
    id: 'arch-scoiatael-envoy',
    label: { fr: 'Émissaire Scoia’tael', en: 'Scoia’tael Envoy' },
    role: 'opponent',
    title: { fr: 'Émissaire elfique', en: 'Scoia’tael Envoy' },
    relationship: 'hostile',
    stats: { emp: 6, int: 7, vol: 7 },
    skills: {
      persuasion: 5,
      charisma: 5,
      seduction: 4,
      leadership: 5,
      intimidation: 6,
      deceit: 5,
      education: 6,
      etiquette: 4,
      business: 3,
      humanPerception: 6,
      resistCoercion: 7,
    },
    notes: {
      fr: 'Fier et amer envers les humains ; respecte la parole tenue.',
      en: 'Proud and bitter toward humans; respects kept oaths.',
    },
  },
];
