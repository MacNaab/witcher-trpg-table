import type { LocalizedText } from '../types';

export interface DcScaleEntry {
  id: string;
  dc: number;
  difficulty: LocalizedText;
  example: LocalizedText;
}

export interface SituationalModEntry {
  id: string;
  situation: LocalizedText;
  dcMod: string;
  category: 'general' | 'lighting' | 'foraging';
}

export interface HealingRateRule {
  id: string;
  label: LocalizedText;
  rate: LocalizedText;
  notes: LocalizedText;
}

export interface CriticalHealingTableRow {
  severity: 'simple' | 'complex' | 'difficult' | 'mortal';
  label: LocalizedText;
  healingHandsRounds: number;
  healingHandsDc: number;
  spellUses: number;
  spellDc: number;
}

export interface CriticalRecoveryDaysRow {
  body: number;
  simpleDays: number;
  complexDays: number;
  difficultDays: number;
}

export interface ToxicityRuleEntry {
  id: string;
  topic: LocalizedText;
  thresholdOrDc: LocalizedText;
  effect: LocalizedText;
}

export interface EnvironmentalHazardEntry {
  id: string;
  hazard: 'fall' | 'drowning' | 'fire' | 'heat' | 'cold' | 'storm';
  title: LocalizedText;
  checkOrDc: LocalizedText;
  damageOrPenalty: LocalizedText;
  mitigation: LocalizedText;
}

export interface ReputationTierEntry {
  level: string;
  title: LocalizedText;
  reach: LocalizedText;
  socialEffect: LocalizedText;
}

export interface RegionalReputationModEntry {
  id: string;
  region: LocalizedText;
  humans: string;
  nonHumans: string;
  witchers: string;
  mages: string;
  notes: LocalizedText;
}

export interface ServicePriceCategory {
  id: 'bribes' | 'tolls' | 'guides' | 'apothecary';
  title: LocalizedText;
  items: readonly {
    id: string;
    service: LocalizedText;
    cost: LocalizedText;
    notes: LocalizedText;
  }[];
}

/**
 * Official Difficulty Check scale (SD 10 to 30) from guide/compétences.md.
 */
export const DC_SCALE_REFERENCE: readonly DcScaleEntry[] = [
  {
    id: 'dc-10',
    dc: 10,
    difficulty: { fr: 'Facile', en: 'Easy' },
    example: {
      fr: 'Défoncer une porte en bois pourrie ; grimper une paroi rocheuse simple.',
      en: 'Kick down a rotted wooden door; climb a simple rocky slope.',
    },
  },
  {
    id: 'dc-14',
    dc: 14,
    difficulty: { fr: 'Moyen', en: 'Average' },
    example: {
      fr: 'Se faufiler derrière un garde de la ville ; crocheter une serrure ordinaire.',
      en: 'Sneak past a city guard; pick a standard lock.',
    },
  },
  {
    id: 'dc-16',
    dc: 16,
    difficulty: { fr: 'Soutenu (Intermédiaire)', en: 'Challenging' },
    example: {
      fr: 'Suivre une piste ancienne sous la pluie ; convaincre un capitaine méfiant.',
      en: 'Track an old trail in rain; convince a suspicious watch captain.',
    },
  },
  {
    id: 'dc-18',
    dc: 18,
    difficulty: { fr: 'Assez difficile', en: 'Difficult' },
    example: {
      fr: 'Crocheter une serrure de bonne facture ; résister à un élixir de sorceleur (non-sorceleur).',
      en: 'Pick a well-made lock; endure a witcher potion (non-witcher).',
    },
  },
  {
    id: 'dc-20',
    dc: 20,
    difficulty: { fr: 'Difficile', en: 'Very Difficult' },
    example: {
      fr: 'Toucher une chaîne avec une hache de lancer à 10 m ; plier des barreaux.',
      en: 'Hit a chain with a throwing axe at 10 m; bend iron prison bars.',
    },
  },
  {
    id: 'dc-25',
    dc: 25,
    difficulty: { fr: 'Très difficile', en: 'Extremely Difficult' },
    example: {
      fr: 'Soulever un cheval tombé sur un cavalier ; désamorcer un piège complexe de maître.',
      en: 'Lift a fallen horse off a rider; disarm a masterwork trap.',
    },
  },
  {
    id: 'dc-30',
    dc: 30,
    difficulty: { fr: 'Presque impossible', en: 'Nearly Impossible' },
    example: {
      fr: 'Ouvrir la porte d’une forteresse à mains nues ; résister seul à une tempête dévastatrice.',
      en: 'Force open a fortress gate bare-handed; weather a catastrophic storm unassisted.',
    },
  },
];

export const SITUATIONAL_MODIFIERS_REFERENCE: readonly SituationalModEntry[] = [
  {
    id: 'mod-missing-parts',
    situation: { fr: 'Vous ne disposez pas des bons éléments', en: 'Lacking proper materials/parts' },
    dcMod: '+2 SD',
    category: 'general',
  },
  {
    id: 'mod-missing-tools',
    situation: { fr: 'Vous ne disposez pas des bons outils', en: 'Lacking proper tools' },
    dcMod: '+3 SD',
    category: 'general',
  },
  {
    id: 'mod-distraction',
    situation: { fr: 'Source de distraction', en: 'Distraction nearby' },
    dcMod: '+3 SD',
    category: 'general',
  },
  {
    id: 'mod-under-attack',
    situation: { fr: 'Vous êtes attaqué pendant l’action', en: 'Under attack while acting' },
    dcMod: '+5 SD',
    category: 'general',
  },
  {
    id: 'mod-drunk',
    situation: { fr: 'Vous êtes ivre / intoxiqué', en: 'Drunk / Intoxicated' },
    dcMod: '+3 SD',
    category: 'general',
  },
  {
    id: 'mod-sleep',
    situation: { fr: 'Manque de sommeil', en: 'Sleep deprived' },
    dcMod: '+3 SD',
    category: 'general',
  },
  {
    id: 'mod-hostile-env',
    situation: { fr: 'Environnement hostile (boue, tangage, foule)', en: 'Hostile environment' },
    dcMod: '+4 SD',
    category: 'general',
  },
  {
    id: 'light-bright',
    situation: { fr: 'Lumière vive / éblouissement', en: 'Bright / blinding light' },
    dcMod: '+2 SD',
    category: 'lighting',
  },
  {
    id: 'light-daylight',
    situation: { fr: 'Lumière du jour', en: 'Daylight' },
    dcMod: '0',
    category: 'lighting',
  },
  {
    id: 'light-dim',
    situation: { fr: 'Lumière tamisée (crépuscule, torche lointaine)', en: 'Dim light' },
    dcMod: '+2 SD',
    category: 'lighting',
  },
  {
    id: 'light-darkness',
    situation: { fr: 'Obscurité totale', en: 'Darkness' },
    dcMod: '+5 SD',
    category: 'lighting',
  },
  {
    id: 'forage-forest',
    situation: { fr: 'Survie · Recherche en Forêts', en: 'Wilderness Survival · Forests' },
    dcMod: 'SD 10',
    category: 'foraging',
  },
  {
    id: 'forage-plains',
    situation: { fr: 'Survie · Recherche en Plaines', en: 'Wilderness Survival · Plains' },
    dcMod: 'SD 12',
    category: 'foraging',
  },
  {
    id: 'forage-coast',
    situation: { fr: 'Survie · Côtes & Montagnes', en: 'Wilderness Survival · Coasts & Mountains' },
    dcMod: 'SD 14',
    category: 'foraging',
  },
  {
    id: 'forage-caves',
    situation: { fr: 'Survie · Grottes & Souterrains', en: 'Wilderness Survival · Caves' },
    dcMod: 'SD 15',
    category: 'foraging',
  },
  {
    id: 'forage-desert',
    situation: { fr: 'Survie · Déserts', en: 'Wilderness Survival · Deserts' },
    dcMod: 'SD 18',
    category: 'foraging',
  },
  {
    id: 'forage-tundra',
    situation: { fr: 'Survie · Toundra & Hautes neiges', en: 'Wilderness Survival · Tundra' },
    dcMod: 'SD 20',
    category: 'foraging',
  },
];

export const HEALING_RATE_RULES: readonly HealingRateRule[] = [
  {
    id: 'heal-bedrest',
    label: { fr: 'Repos complet (après Premiers soins / Mains thérapeutiques)', en: 'Full Bedrest (after First Aid / Healing Hands)' },
    rate: { fr: 'RÉC PS / jour', en: 'REC HP / day' },
    notes: {
      fr: 'Un personnage ne récupère naturellement que s’il a reçu au préalable un jet réussi de Premiers soins ou de Mains thérapeutiques.',
      en: 'Characters begin natural HP recovery only after receiving a successful First Aid or Healing Hands check.',
    },
  },
  {
    id: 'heal-active',
    label: { fr: 'Activité soutenue (marche, travail, combat)', en: 'Active / Strenuous Day (travel, fighting)' },
    rate: { fr: '⌊RÉC ÷ 2⌋ PS / jour', en: '⌊REC ÷ 2⌋ HP / day' },
    notes: {
      fr: 'La récupération journalière est réduite de moitié si le blessé ne reste pas au repos.',
      en: 'Daily natural healing is halved when the patient continues traveling or fighting.',
    },
  },
  {
    id: 'heal-hands-bonus',
    label: { fr: 'Suivi par un Docteur (Mains thérapeutiques)', en: 'Treated by Doctor (Healing Hands)' },
    rate: { fr: '+3 PS / jour', en: '+3 HP / day' },
    notes: {
      fr: 'S’ajoute au rythme de guérison normal. Diagnostic préalable : +2 aux jets de Mains thérapeutiques.',
      en: 'Added on top of base daily recovery. Prior Diagnosis grants +2 to Healing Hands checks.',
    },
  },
  {
    id: 'heal-miracle',
    label: { fr: 'Chirurgie miraculeuse (Docteur)', en: 'Miraculous Surgery (Doctor)' },
    rate: { fr: 'Rythme ×2', en: 'Recovery ×2' },
    notes: {
      fr: 'Test contre le SD de la blessure : double la vitesse de guérison des blessures normales et critiques.',
      en: 'Check vs wound DC: doubles healing speed for both normal HP and critical wounds.',
    },
  },
  {
    id: 'heal-tent',
    label: { fr: 'Espace de soins (Docteur, 1h d’installation)', en: 'Healing Tent (Doctor, 1 hr setup)' },
    rate: { fr: '+3 soins · +2 PS/jour', en: '+3 heal checks · +2 HP/day' },
    notes: {
      fr: 'Dure autant de jours que le rang en Espace de soins ; bonifie tous les soignants à l’intérieur.',
      en: 'Lasts days equal to Healing Tent rank; boosts all healers treating patients inside.',
    },
  },
];

export const CRITICAL_HEALING_TABLE: readonly CriticalHealingTableRow[] = [
  {
    severity: 'simple',
    label: { fr: 'Critique Simple', en: 'Simple Critical' },
    healingHandsRounds: 2,
    healingHandsDc: 12,
    spellUses: 4,
    spellDc: 14,
  },
  {
    severity: 'complex',
    label: { fr: 'Critique Complexe', en: 'Complex Critical' },
    healingHandsRounds: 4,
    healingHandsDc: 14,
    spellUses: 6,
    spellDc: 16,
  },
  {
    severity: 'difficult',
    label: { fr: 'Critique Difficile', en: 'Difficult Critical' },
    healingHandsRounds: 6,
    healingHandsDc: 16,
    spellUses: 8,
    spellDc: 18,
  },
  {
    severity: 'mortal',
    label: { fr: 'Critique Mortelle', en: 'Deadly Critical' },
    healingHandsRounds: 8,
    healingHandsDc: 18,
    spellUses: 10,
    spellDc: 20,
  },
];

export const CRITICAL_RECOVERY_DAYS: readonly CriticalRecoveryDaysRow[] = [
  { body: 3, simpleDays: 5, complexDays: 9, difficultDays: 12 },
  { body: 4, simpleDays: 4, complexDays: 8, difficultDays: 11 },
  { body: 5, simpleDays: 3, complexDays: 7, difficultDays: 10 },
  { body: 6, simpleDays: 2, complexDays: 6, difficultDays: 9 },
  { body: 7, simpleDays: 1, complexDays: 5, difficultDays: 8 },
  { body: 8, simpleDays: 1, complexDays: 4, difficultDays: 7 },
  { body: 9, simpleDays: 1, complexDays: 3, difficultDays: 6 },
  { body: 10, simpleDays: 1, complexDays: 2, difficultDays: 5 },
  { body: 11, simpleDays: 1, complexDays: 1, difficultDays: 4 },
  { body: 12, simpleDays: 1, complexDays: 1, difficultDays: 3 },
  { body: 13, simpleDays: 1, complexDays: 1, difficultDays: 2 },
];

export const TOXICITY_ADDICTION_RULES: readonly ToxicityRuleEntry[] = [
  {
    id: 'tox-witcher-limit',
    topic: { fr: 'Seuil de toxicité (Sorceleur)', en: 'Witcher Toxicity Limit' },
    thresholdOrDc: { fr: '100 % (+25 % / rang Métabolisme)', en: '100% (+25% per Alchemy Metabolism rank)' },
    effect: {
      fr: 'Chaque élixir ajoute 25 % à 75 % de toxicité tant qu’il reste actif. Dépasser 100 % inflige Empoisonnement (-5 PS/round hors armure) et Intoxication jusqu’à baisse sous le seuil.',
      en: 'Each witcher potion adds 25%–75% Toxicity while active. Exceeding 100% inflicts Poison (-5 HP/round ignoring armor) and Intoxication until toxicity drops below cap.',
    },
  },
  {
    id: 'tox-non-witcher',
    topic: { fr: 'Potions de sorceleur sur non-sorceleur', en: 'Witcher Potions on Non-Witchers' },
    thresholdOrDc: { fr: 'Résilience SD 18', en: 'Endurance DC 18' },
    effect: {
      fr: 'Boire Hirondelle ou toute potion mutagène sans mutations exige un jet de Résilience SD 18 : en cas d’échec, la cible est Empoisonnée au lieu de profiter des effets.',
      en: 'Drinking Swallow or witcher decoctions without mutations requires Endurance DC 18: failure inflicts Poison instead of benefits.',
    },
  },
  {
    id: 'tox-white-honey',
    topic: { fr: 'Miel blanc & Rituel de purification', en: 'White Honey & Purification Ritual' },
    thresholdOrDc: { fr: '0 % tox. / Rituel SD 12–18', en: '0% Tox / Ritual DC 12–18' },
    effect: {
      fr: 'Miel blanc ramène la toxicité à 0 % et dissipe les potions actives. Le Rituel de purification lève alcool/drogues (SD 12), poisons/huiles (SD 15) et maladies graves (SD 18).',
      en: 'White Honey resets toxicity to 0% and clears active potions. Purification Ritual cleanses alcohol/drugs (DC 12), poisons/oils (DC 15), and severe diseases (DC 18).',
    },
  },
  {
    id: 'addict-onset',
    topic: { fr: 'Déclenchement d’une addiction (Fisstech, alcool fort)', en: 'Developing Addiction (Fisstech, Strong Spirits)' },
    thresholdOrDc: { fr: 'Résilience SD 14–18 (par dose répétée)', en: 'Endurance DC 14–18 (repeated doses)' },
    effect: {
      fr: 'À chaque prise rapprochée (ou dose de Fisstech, SD 16), un échec en Résilience crée une dépendance active.',
      en: 'Repeated consumption within days (or Fisstech, DC 16) requires Endurance: failure triggers active addiction.',
    },
  },
  {
    id: 'addict-withdrawal',
    topic: { fr: 'Manque & Sevrage', en: 'Withdrawal & Craving' },
    thresholdOrDc: { fr: 'Résistance à la contrainte SD 16', en: 'Resist Coercion DC 16' },
    effect: {
      fr: 'Après 24 h sans dose : -2 à toutes les caractéristiques/compétences, perte de 5 END/jour et jet de Résistance à la contrainte SD 16 pour résister à une prise immédiate.',
      en: 'After 24h without a dose: -2 to all stats/skills, -5 STA/day, and Resist Coercion DC 16 to avoid seeking an immediate fix.',
    },
  },
  {
    id: 'addict-cure',
    topic: { fr: 'Guérir une dépendance', en: 'Overcoming Addiction' },
    thresholdOrDc: { fr: '7 jours d’abstinence + 3× Résilience SD 16', en: '7 days sober + 3× Endurance DC 16' },
    effect: {
      fr: 'Un suivi médical (Docteur) accorde +2 aux jets de Résilience durant la cure ; le Rituel de purification (SD 12–15) purge l’organisme.',
      en: 'Doctor care grants +2 to Endurance checks during detox; Purification Ritual (DC 12–15) purges chemical dependency.',
    },
  },
];

export const ENVIRONMENTAL_HAZARDS_DATA: readonly EnvironmentalHazardEntry[] = [
  {
    id: 'haz-fall',
    hazard: 'fall',
    title: { fr: 'Chute', en: 'Falling' },
    checkOrDc: { fr: 'Athlétisme (SD MJ) pour saisir un rebord', en: 'Athletics (GM DC) to grab a ledge' },
    damageOrPenalty: {
      fr: '⌊Hauteur (m) ÷ 2⌋ × d6 au Torse (ignore l’armure). Vitesse ≈ 30 m/round.',
      en: '⌊Height (m) ÷ 2⌋ × d6 to Torso (ignores armor). Fall speed ≈ 30 m/round.',
    },
    mitigation: {
      fr: 'Si un rebord est saisi, les dégâts déjà accumulés s’appliquent au Bras. Percuter une cible inflige les mêmes dégâts aux deux.',
      en: 'Grabbing a ledge applies accumulated fall damage to the Arm instead. Hitting another creature deals the same damage to both.',
    },
  },
  {
    id: 'haz-drowning',
    hazard: 'drowning',
    title: { fr: 'Noyade & Apnée', en: 'Drowning & Suffocation' },
    checkOrDc: { fr: 'Athlétisme SD 14–18 (courant / armure encombrante)', en: 'Athletics DC 14–18 (current / heavy armor)' },
    damageOrPenalty: {
      fr: 'Apnée = COR rounds en effort (ou COR min au calme), puis Suffocation : -3 PS/round (ignore l’armure).',
      en: 'Hold breath = BODY rounds in combat (BODY min calm), then Suffocating: -3 HP/round (ignores armor).',
    },
    mitigation: {
      fr: 'Retirer une armure lourde sous l’eau demande un jet de Physique/Athlétisme SD 15 ; retrouver de l’air stoppe immédiatement la Suffocation.',
      en: 'Doffing heavy armor underwater requires Physique/Athletics DC 15; reaching breathable air immediately halts Suffocation.',
    },
  },
  {
    id: 'haz-fire',
    hazard: 'fire',
    title: { fr: 'Feu & Incinération', en: 'Fire & Burning' },
    checkOrDc: { fr: '1 round complet pour éteindre (eau / roulade)', en: '1 full round to extinguish (water / drop & roll)' },
    damageOrPenalty: {
      fr: '5 DÉG/round sur toutes les zones (armure absorbe, puis -1 PA/Fia par round). Fumée dense : Suffocation (-3 PS/rd).',
      en: '5 DMG/round to every location (armor absorbs, losing 1 SP/REL per round). Dense smoke: Suffocating (-3 HP/rd).',
    },
    mitigation: {
      fr: 'Les créatures ou objets inflammables s’embrasent sur 50 %+ ; l’eau ou un jet de Quen/Aard bien placé étouffe les flammes.',
      en: 'Flammable gear ignites easily; water, sand, or a timely Aard blast extinguishes flames.',
    },
  },
  {
    id: 'haz-cold',
    hazard: 'cold',
    title: { fr: 'Froid extrême & Gel', en: 'Extreme Cold & Freezing' },
    checkOrDc: { fr: 'Résilience SD 12 (hiver) à SD 18 (blizzard / eau glacée)', en: 'Endurance DC 12 (winter) to DC 18 (blizzard / icy water)' },
    damageOrPenalty: {
      fr: 'Échec : -2 END/heure + état Gel (-3 VIT, -1 RÉF ; Physique SD 16 pour briser le givre). À 0 END : inconscience / hypothermie (-2 PS/h).',
      en: 'Failure: -2 STA/hour + Frozen (-3 SPD, -1 REF; Physique DC 16 to break free). At 0 STA: unconsciousness / hypothermia (-2 HP/hr).',
    },
    mitigation: {
      fr: 'Fourrures / cape d’hiver (+2 à +4 en Résilience), feu de camp ou alcool fort (temporaire : réchauffe mais +2 SD contre déshydratation).',
      en: 'Furs & winter cloak (+2 to +4 Endurance), campfire, or shelter halve exposure checks.',
    },
  },
  {
    id: 'haz-heat',
    hazard: 'heat',
    title: { fr: 'Chaleur & Désert', en: 'Extreme Heat & Desert' },
    checkOrDc: { fr: 'Résilience SD 14–18 par heure de marche en armure', en: 'Endurance DC 14–18 per hour of armored march' },
    damageOrPenalty: {
      fr: 'Échec : -1d6 END (non récupérable sans ombre ni eau). Armure de métal au soleil : +3 SD aux jets de fatigue.',
      en: 'Failure: -1d6 STA (cannot recover without shade and water). Metal armor in sun adds +3 DC to fatigue checks.',
    },
    mitigation: {
      fr: 'Doubler la ration d’eau quotidienne et retirer les plates pour annuler la pénalité d’armure.',
      en: 'Double daily water rations and travel at dusk/dawn to avoid heat penalties.',
    },
  },
  {
    id: 'haz-storm',
    hazard: 'storm',
    title: { fr: 'Pluie battante, Brouillard & Tempête', en: 'Heavy Rain, Fog & Gale' },
    checkOrDc: { fr: 'Athlétisme SD 12–15 (sol glissant) · Navigation SD 16+', en: 'Athletics DC 12–15 (slick mud) · Sailing DC 16+' },
    damageOrPenalty: {
      fr: 'Pluie : -2 Vigilance / tir à distance / pistage. Brouillard dense : visibilité 5 m (-4 Vig). Vent violent : -3 arcs & arbalètes.',
      en: 'Rain: -2 Awareness / ranged / tracking. Dense fog: 5 m visibility (-4 Awr). Gale winds: -3 bows & crossbows.',
    },
    mitigation: {
      fr: 'Les cordes d’arc détrempées risquent de perdre 1 Fia par heure sans étui huilé ; les pistes s’effacent après 1d6 heures.',
      en: 'Unprotected bowstrings lose 1 REL per hour in heavy rain; tracks wash away after 1d6 hours.',
    },
  },
];

export const REPUTATION_TIERS_DATA: readonly ReputationTierEntry[] = [
  {
    level: '0–1',
    title: { fr: 'Anonyme / Inconnu', en: 'Unknown / Nobody' },
    reach: { fr: 'Aucun renom hors de son village', en: 'Unknown outside home village' },
    socialEffect: {
      fr: 'Aucun bonus ni malus de notoriété. Les gardes et marchands appliquent uniquement les préjugés locaux.',
      en: 'No reputation modifier; locals react strictly via regional racial/class biases.',
    },
  },
  {
    level: '2–3',
    title: { fr: 'Connu localement', en: 'Locally Known' },
    reach: { fr: 'Quartier, bourg ou baronnie', en: 'District, town, or barony' },
    socialEffect: {
      fr: '+1 en Persuasion/Charisme (réputation positive) ou +1 en Intimidation (réputation sombre/violente).',
      en: '+1 Persuasion/Charisma (good fame) or +1 Intimidation (feared/notorious fame).',
    },
  },
  {
    level: '4–6',
    title: { fr: 'Renommée régionale', en: 'Regionally Renowned' },
    reach: { fr: 'Province ou royaume entier', en: 'Entire province or kingdom' },
    socialEffect: {
      fr: '+2 aux jets sociaux alignés avec la réputation ; les aubergistes, baillis et guildes connaissent vos exploits ou méfaits.',
      en: '+2 to aligned social checks; bailiffs, guilds, and tavern keepers recognize your deeds.',
    },
  },
  {
    level: '7–8',
    title: { fr: 'Célébrité du Continent', en: 'Continental Fame' },
    reach: { fr: 'Plusieurs royaumes du Nord & Nilfgaard', en: 'Multiple Northern Kingdoms & Nilfgaard' },
    socialEffect: {
      fr: '+3 aux jets sociaux alignés ; audiences facilitées auprès des nobles, primes ou contrats majorés de +25 %.',
      en: '+3 to aligned social checks; easier court audiences and +25% contract leverage.',
    },
  },
  {
    level: '9–10',
    title: { fr: 'Figure légendaire', en: 'Living Legend' },
    reach: { fr: 'Ballades de bardes dans tout le monde connu', en: 'Sung by bards across the Continent' },
    socialEffect: {
      fr: '+4 aux jets alignés ; les ennemis mineurs peuvent fuir ou négocier avant de dégainer (test de Courage requis).',
      en: '+4 to aligned rolls; minor foes may hesitate or parley (Courage check required to engage).',
    },
  },
];

export const REGIONAL_REPUTATION_MODS: readonly RegionalReputationModEntry[] = [
  {
    id: 'reg-redania',
    region: { fr: 'Rédanie & Novigrad (Chasseurs de sorcières)', en: 'Redania & Novigrad (Witch Hunters)' },
    humans: '0',
    nonHumans: '-2',
    witchers: '-2',
    mages: '-4',
    notes: {
      fr: 'Zèle religieux et persécution des mages/non-humains. Montrer de la magie en public déclenche une alerte du guet.',
      en: 'High zealotry and persecution of mages/non-humans. Open magic triggers immediate guard intervention.',
    },
  },
  {
    id: 'reg-temeria',
    region: { fr: 'Témérie & Velen (Terres ravagées)', en: 'Temeria & Velen (War-Torn)' },
    humans: '0',
    nonHumans: '-1',
    witchers: '-1 / +1 contrat',
    mages: '-2',
    notes: {
      fr: 'Méfiance générale due à la guerre, mais les sorceleurs sont recrutés en urgence pour les nécrophages.',
      en: 'War-weary suspicion everywhere, yet witchers are desperately hired against battlefield necrophages.',
    },
  },
  {
    id: 'reg-kaedwen-aedirn',
    region: { fr: 'Aedirn & Kaedwen (Marches de l’Est)', en: 'Aedirn & Kaedwen (Eastern Marches)' },
    humans: '0',
    nonHumans: '-2',
    witchers: '-1',
    mages: '-1',
    notes: {
      fr: 'Tensions frontalières avec les commandos Scoia’tael ; les elfes non identifiés sont fouillés aux portes.',
      en: 'Border tensions with Scoia’tael commandos; unknown elves face strict gate inspections.',
    },
  },
  {
    id: 'reg-skellige',
    region: { fr: 'Îles de Skellige', en: 'Skellige Isles' },
    humans: '0 (Continentaux -1)',
    nonHumans: '-1',
    witchers: '0 (+1 honneur)',
    mages: '-1 (Druides +2)',
    notes: {
      fr: 'L’honneur, le courage au combat et la parole donnée priment sur l’origine ; les druides sont révérés.',
      en: 'Martial honor, kept oaths, and courage outweigh lineage; druids hold deep reverence.',
    },
  },
  {
    id: 'reg-nilfgaard',
    region: { fr: 'Empire de Nilfgaard (Provinces centrales)', en: 'Nilfgaardian Empire (Heartland)' },
    humans: '0 (Nordlings -1)',
    nonHumans: '0 (Elfes tolérés)',
    witchers: '-2',
    mages: '-1 (surveillés)',
    notes: {
      fr: 'Ordre impérial strict : sorceleurs interdits dans plusieurs cités sans laissez-passer ; mages encadrés par l’État.',
      en: 'Strict imperial bureaucracy: witchers barred without writs in major cities; mages state-regulated.',
    },
  },
  {
    id: 'reg-mahakam',
    region: { fr: 'Mahakam & Dol Blathanna', en: 'Mahakam & Dol Blathanna' },
    humans: '-2',
    nonHumans: '+1 / +2',
    witchers: '-1',
    mages: '0',
    notes: {
      fr: 'Bastions nains et elfiques : les humains étrangers doivent prouver leur loyauté ou payer des cautions.',
      en: 'Dwarven & Elven homelands: human outsiders face suspicion and steep guild/entry bonds.',
    },
  },
];

export const COMMON_SERVICES_PRICES: readonly ServicePriceCategory[] = [
  {
    id: 'bribes',
    title: { fr: 'Pots-de-vin & Tolérance (Repères MJ)', en: 'Bribes & Turning a Blind Eye' },
    items: [
      {
        id: 'bribe-gate',
        service: { fr: 'Garde de porte / patrouille (infraction mineure)', en: 'Gate guard / patrol (minor infraction)' },
        cost: { fr: '10 – 25 cr', en: '10 – 25 cr' },
        notes: {
          fr: 'Fermer les yeux sur une arme dissimulée, un couvre-feu ou une fouille rapide.',
          en: 'Ignore concealed weapons, curfew violation, or skip a bag search.',
        },
      },
      {
        id: 'bribe-jailer',
        service: { fr: 'Geôlier / greffier (visite ou dossier)', en: 'Jailer / clerk (visit or record peek)' },
        cost: { fr: '30 – 75 cr', en: '30 – 75 cr' },
        notes: {
          fr: 'Permettre un entretien discret avec un détenu ou « égarer » une plainte mineure.',
          en: 'Grant private prisoner access or misplace a minor citation.',
        },
      },
      {
        id: 'bribe-official',
        service: { fr: 'Officier du guet / magistrat (mandat ou saisie)', en: 'Watch officer / magistrate (warrant or seizure)' },
        cost: { fr: '100 – 300+ cr', en: '100 – 300+ cr' },
        notes: {
          fr: 'En combat verbal, l’outil Soudoyer (Jeu) donne +1 empathique par tranche de 50 cr offertes.',
          en: 'In Verbal Combat, Bribe (Gambling) grants +1 empathetic roll per 50 cr offered.',
        },
      },
    ],
  },
  {
    id: 'tolls',
    title: { fr: 'Péages, Passages & Documents', en: 'Tolls, Passage & Travel Writs' },
    items: [
      {
        id: 'toll-gate',
        service: { fr: 'Droits de péage (route, pont ou porte de cité)', en: 'Road / bridge / city gate toll' },
        cost: { fr: '10 cr', en: '10 cr' },
        notes: {
          fr: 'Tarif officiel par voyageur ; compter +5 à +10 cr pour une charrette ou monture chargée.',
          en: 'Standard traveler fee; add +5–10 cr for a loaded cart or pack mount.',
        },
      },
      {
        id: 'toll-ferry',
        service: { fr: 'Bac fluvial / passeur local', en: 'River ferry / local skiff' },
        cost: { fr: '15 – 30 cr', en: '15 – 30 cr' },
        notes: {
          fr: 'Traversée du Pontar ou de la Iaruga ; doublé la nuit ou en zone de guerre.',
          en: 'Crossing the Pontar or Yaruga; doubled at night or in contested warzones.',
        },
      },
      {
        id: 'toll-ship',
        service: { fr: 'Transport / Passage maritime (navire marchand)', en: 'Sea passage / merchant ship transport' },
        cost: { fr: '85 cr', en: '85 cr' },
        notes: {
          fr: 'Tarif officiel de base pour une traversée longue (Novigrad → Skellige ou Cintra).',
          en: 'Core rulebook baseline for a major sea voyage.',
        },
      },
      {
        id: 'toll-pass',
        service: { fr: 'Sauf-conduit / Laissez-passer (légal ou contrefait)', en: 'Safe-conduct / Travel pass (official or forged)' },
        cost: { fr: '50 – 150 cr', en: '50 – 150 cr' },
        notes: {
          fr: 'Prix variable selon l’urgence et la qualité de la contrefaçon (SD 14–18 à inspecter).',
          en: 'Varies by urgency and forgery quality (DC 14–18 inspection).',
        },
      },
    ],
  },
  {
    id: 'guides',
    title: { fr: 'Guides, Messagers & Main-d’œuvre', en: 'Guides, Messengers & Hired Help' },
    items: [
      {
        id: 'guide-local',
        service: { fr: 'Guide local / pisteurs des marais ou montagnes', en: 'Local wilderness guide / tracker' },
        cost: { fr: '20 – 40 cr / jour', en: '20 – 40 cr / day' },
        notes: {
          fr: 'Réduit de -2 à -4 les SD de navigation et évite les embuscades naturelles connues.',
          en: 'Lowers route navigation DCs by 2–4 and avoids known natural hazards.',
        },
      },
      {
        id: 'guide-messenger',
        service: { fr: 'Messager / Courrier à cheval', en: 'Messenger / Rider' },
        cost: { fr: '15 cr / jour', en: '15 cr / day' },
        notes: {
          fr: 'Tarif officiel par journée de voyage.',
          en: 'Official rate per day of travel.',
        },
      },
      {
        id: 'guide-investigator',
        service: { fr: 'Enquêteur / Juriste', en: 'Investigator / Lawyer' },
        cost: { fr: '45 – 50 cr', en: '45 – 50 cr' },
        notes: {
          fr: 'Tarifs officiels : Enquêteur (45 cr), Juriste / Avocat (50 cr).',
          en: 'Official rates: Investigator (45 cr), Lawyer / Advocate (50 cr).',
        },
      },
      {
        id: 'guide-horse-fence',
        service: { fr: 'Location de cheval · Receleur', en: 'Horse rental · Fence' },
        cost: { fr: '50 cr / jour · 25 % valeur', en: '50 cr / day · 25% value' },
        notes: {
          fr: 'Un receleur rachète les biens volés à 1/4 du prix catalogue officiel.',
          en: 'Fences buy stolen goods at 1/4 of official list price.',
        },
      },
    ],
  },
  {
    id: 'apothecary',
    title: { fr: 'Soins d’apothicaire, Docteurs & Auberges', en: 'Apothecary Care, Doctors & Lodging' },
    items: [
      {
        id: 'med-doctor',
        service: { fr: 'Consultation Docteur (Premiers soins / suture)', en: 'Physician visit (First Aid / stitching)' },
        cost: { fr: '50 cr', en: '50 cr' },
        notes: {
          fr: 'Tarif officiel de base ; opération chirurgicale sur blessure critique : 100 – 250 cr selon gravité.',
          en: 'Official base fee; critical wound surgery runs 100 – 250 cr by severity.',
        },
      },
      {
        id: 'med-apothecary',
        service: { fr: 'Cataplasme d’apothicaire / Antidote courant', en: 'Apothecary poultice / Common antidote' },
        cost: { fr: '15 – 60 cr', en: '15 – 60 cr' },
        notes: {
          fr: 'Herbes médicinales, bandages stérilisés (15 cr), antidote ciblé ou décoction calmante (40–60 cr).',
          en: 'Medicinal herbs & clean bandages (15 cr), targeted antidote or tonic (40–60 cr).',
        },
      },
      {
        id: 'med-craft',
        service: { fr: 'Réparation d’équipement par Artisan', en: 'Craftsman repair (per item)' },
        cost: { fr: '35 cr / pièce', en: '35 cr / item' },
        notes: {
          fr: 'Tarif officiel pour restaurer la Fiabilité ou le PA d’une pièce (hors matériaux rares).',
          en: 'Official base labor cost per item (excluding rare materials).',
        },
      },
      {
        id: 'med-inn',
        service: { fr: 'Hébergement (Paillasse → Auberge correcte → Luxe)', en: 'Lodging (Floor → Decent Inn → Luxury)' },
        cost: { fr: '2 · 16 · 72 cr / nuit', en: '2 · 16 · 72 cr / night' },
        notes: {
          fr: 'Paillasse (2), douteuse (4), bon marché (8), correcte (16), qualité (36), luxe (72). Box d’écurie : 2 cr.',
          en: 'Floor (2), infamous (4), cheap (8), medium (16), standard (36), high-class (72). Stable: 2 cr.',
        },
      },
    ],
  },
];
