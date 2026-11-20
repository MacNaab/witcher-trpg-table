import type { CharacterSheetState } from '@/src/modules/character-generator/types';
import {
  getProfessionDefinition,
  getRaceDefinition,
} from '@/src/modules/character-generator/data/racesAndProfessions';
import { calculateDerivedStats } from '@/src/modules/character-generator/utils/characterCalculations';
import type {
  NpcPowerTier,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import {
  extractPcGearFromCharacterSheet,
  extractPcSheetProfileDetails,
} from '@/src/modules/combat-tracker/utils/pcGearExtraction';
import type { CharacterSheetPageData, ModuleLanguage } from '../types';

function splitKeyValPairs(raw: string): Array<{ label: string; value: string }> {
  return raw
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((pair) => {
      const colonIdx = pair.indexOf(':');
      if (colonIdx > 0) {
        return {
          label: pair.slice(0, colonIdx).trim(),
          value: pair.slice(colonIdx + 1).trim(),
        };
      }
      const m = pair.match(/^(.+?)\s+([^\s]+)$/);
      if (m) {
        return { label: m[1].trim(), value: m[2].trim() };
      }
      return { label: pair, value: '—' };
    });
}

function splitPipeList(raw: string): string[] {
  return raw
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Parses a `::: character-sheet ... :::` directive block into structured data
 * matching the official 1-page Witcher TRPG PC / NPC rulebook layout.
 */
export function parseCharacterSheetBlock(
  raw: string,
  lang: ModuleLanguage = 'fr'
): CharacterSheetPageData {
  const data: CharacterSheetPageData = {
    name: lang === 'fr' ? 'Personnage' : 'Character',
    image: 'preset:grimoire',
    stats: [],
    derived: [],
    skills: [],
    keySkills: [],
    magicTitle: lang === 'fr' ? 'Magie' : 'Magic',
    magic: [],
    gear: [],
    quote: '',
    lang,
  };

  const quoteLines: string[] = [];

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      data.image = imgMatch[2].trim();
      continue;
    }

    const kv = line.match(/^([A-Za-zÀ-ÿ0-9_]+)\s*:\s*(.*)$/);
    if (!kv) {
      quoteLines.push(line);
      continue;
    }

    const key = kv[1].toLowerCase();
    const val = kv[2].trim();

    switch (key) {
      case 'name':
      case 'title':
      case 'nom':
        if (val) data.name = val;
        break;
      case 'subtitle':
      case 'profession':
      case 'archetype':
        if (val) data.subtitle = val;
        break;
      case 'image':
      case 'portrait':
      case 'art':
        if (val) data.image = val;
        break;
      case 'stats':
        data.stats = splitKeyValPairs(val);
        break;
      case 'derived':
        data.derived = splitKeyValPairs(val);
        break;
      case 'skills':
      case 'compétences':
      case 'competences':
        data.skills = splitKeyValPairs(val).map((item) => ({
          name: item.label,
          value: item.value,
        }));
        break;
      case 'keyskills':
      case 'cles':
      case 'clés':
      case 'competencescles':
        data.keySkills = splitKeyValPairs(val).map((item) => ({
          name: item.label,
          value: item.value,
        }));
        break;
      case 'magictitle':
      case 'titrebox':
        if (val) data.magicTitle = val;
        break;
      case 'magic':
      case 'magie':
      case 'spells':
      case 'sorts':
        data.magic = splitPipeList(val);
        break;
      case 'gear':
      case 'equipement':
      case 'équipement':
        data.gear = splitPipeList(val);
        break;
      case 'attribution':
      case 'author':
      case 'auteur':
        if (val) data.attribution = val;
        break;
      case 'quote':
      case 'lore':
      case 'bio':
      case 'description':
        if (val) quoteLines.push(val);
        break;
      case 'lang':
        if (val === 'fr' || val === 'en') data.lang = val;
        break;
      default:
        quoteLines.push(line);
        break;
    }
  }

  if (quoteLines.length > 0) {
    // Allow trailing attribution line starting with "-" or "–" inside quote prose
    const last = quoteLines[quoteLines.length - 1];
    if (!data.attribution && /^[-—–]\s*.+/.test(last)) {
      data.attribution = last.replace(/^[-—–]\s*/, '').trim();
      quoteLines.pop();
    }
    data.quote = quoteLines.join('\n\n');
  }

  return data;
}

/**
 * Formats a full Character Generator `CharacterSheetState` as an official 1-page
 * Witcher TRPG character sheet (`::: character-sheet ... :::`).
 */
export function formatCharacterSheetStateAsOfficialPage(
  sheet: CharacterSheetState,
  lang: ModuleLanguage
): string {
  const derived = calculateDerivedStats(sheet);
  const race = sheet.raceId ? getRaceDefinition(sheet.raceId) : null;
  const prof = sheet.professionId
    ? getProfessionDefinition(sheet.professionId)
    : null;

  const gearSummary = extractPcGearFromCharacterSheet(sheet, lang);
  const details = extractPcSheetProfileDetails(sheet, lang);

  const name =
    sheet.characterName.trim() ||
    (lang === 'fr' ? 'Personnage Joueur' : 'Player Character');
  const subtitle = [race?.name[lang], prof?.name[lang]]
    .filter(Boolean)
    .join(' · ');

  const statsLine =
    lang === 'fr'
      ? `INT ${sheet.stats.INT} | RÉF ${sheet.stats.REF} | DEX ${sheet.stats.DEX} | COR ${sheet.stats.COR} | VIT ${sheet.stats.VIT} | EMP ${sheet.stats.EMP} | TECH ${sheet.stats.TEC} | VOL ${sheet.stats.VOL} | CHA ${sheet.stats.CHA}`
      : `INT ${sheet.stats.INT} | REF ${sheet.stats.REF} | DEX ${sheet.stats.DEX} | BODY ${sheet.stats.COR} | SPD ${sheet.stats.VIT} | EMP ${sheet.stats.EMP} | CRA ${sheet.stats.TEC} | WILL ${sheet.stats.VOL} | LUCK ${sheet.stats.CHA}`;

  const derivedLine =
    lang === 'fr'
      ? `ÉTOU ${derived.stun} | COU ${derived.run} | SAUT ${derived.leap} | END ${derived.stamina} | ENC ${derived.encumbrance} | RÉC ${derived.recovery} | PS ${derived.hp} | VIG ${derived.vigor}`
      : `STUN ${derived.stun} | RUN ${derived.run} | LEAP ${derived.leap} | STA ${derived.stamina} | ENC ${derived.encumbrance} | REC ${derived.recovery} | HP ${derived.hp} | VIGOR ${derived.vigor}`;

  const skillsStr =
    details.skills.length > 0
      ? details.skills.map((s) => `${s.name} ${s.value}`).join(' | ')
      : lang === 'fr'
        ? 'Vigilance 2 | Esquive 2 | Endurance 2'
        : 'Awareness 2 | Dodge/Escape 2 | Endurance 2';

  const keySkillsStr =
    details.keySkills.length > 0
      ? details.keySkills.map((k) => `${k.name} ${k.value}`).join(' | ')
      : lang === 'fr'
        ? 'Spécialité de profession 5'
        : 'Profession Defining Skill 5';

  // Non-caster professions display their equipped Combat & Armor summary in the slot under the portrait
  const hasMagic = details.magic.length > 0;
  const magicTitle = hasMagic
    ? lang === 'fr'
      ? 'Magie'
      : 'Magic'
    : lang === 'fr'
      ? 'Combat & Armure'
      : 'Combat & Armor';

  const combatFallbackLines: string[] = [
    ...gearSummary.weapons.slice(0, 4).map((w) => `${w.name} (${w.damage})`),
    `${lang === 'fr' ? 'Armure Tête / Torse' : 'Armor Head / Torso'}: ${gearSummary.armor.head} / ${gearSummary.armor.torso}`,
    `${lang === 'fr' ? 'Armure Bras / Jambes' : 'Armor Arms / Legs'}: ${gearSummary.armor.rightArm} / ${gearSummary.armor.rightLeg}`,
  ];
  if (gearSummary.shieldSummaryNote) {
    combatFallbackLines.push(gearSummary.shieldSummaryNote);
  }

  const magicList = hasMagic ? details.magic : combatFallbackLines;
  const gearList =
    details.gear.length > 0
      ? details.gear
      : gearSummary.weapons.map((w) => w.name);

  const defaultLore =
    sheet.personalDescription.trim() ||
    (lang === 'fr'
      ? `${name} parcourt les routes du Continent avec la résolution froide de ceux qui ont survécu à bien des tempêtes. Qu’il s’agisse de négocier un contrat épineux dans une auberge de Novigrad ou de tenir la ligne face aux créatures de la nuit, rares sont ceux qui sous-estiment sa lame deux fois.`
      : `${name} walks the scarred roads of the Continent with the quiet resolve of someone who has outlived worse winters. Whether striking an uneasy bargain in a Novigrad tavern or holding the line against creatures of the dark, few ever underestimate them twice.`);

  const attribution =
    sheet.playerName.trim() ||
    (lang === 'fr' ? 'Chroniques du Continent' : 'Chronicles of the Continent');

  const lines = [
    '::: character-sheet',
    `lang: ${lang}`,
    `name: ${name}`,
    ...(subtitle ? [`subtitle: ${subtitle}`] : []),
    'image: preset:grimoire',
    `stats: ${statsLine}`,
    `derived: ${derivedLine}`,
    `skills: ${skillsStr}`,
    `keySkills: ${keySkillsStr}`,
    `magicTitle: ${magicTitle}`,
    `magic: ${magicList.join(' | ')}`,
    `gear: ${gearList.join(' | ')}`,
    `quote: ${defaultLore}`,
    `attribution: ${attribution}`,
    ':::',
  ];

  return lines.join('\n');
}

const NPC_TIER_ESTIMATED_SKILL: Record<NpcPowerTier, number> = {
  novice: 4,
  experienced: 6,
  veteran: 8,
  elite: 10,
};

/**
 * Formats a shared GM Hub PC (`SavedPartyCharacter`) or Custom NPC (`SavedCustomNpc`)
 * as an official 1-page Witcher TRPG character sheet (`::: character-sheet ... :::`).
 */
export function formatHubEntityAsCharacterSheet(
  entity:
    | { kind: 'pc'; data: SavedPartyCharacter }
    | { kind: 'npc'; data: SavedCustomNpc },
  lang: ModuleLanguage
): string {
  const s = entity.data.stats;
  const runVal = s.vit * 3;
  const leapVal = Math.max(1, Math.floor(runVal / 5));
  const encVal = s.cor * 10;

  const extraEmp = entity.kind === 'pc' && entity.data.extraStats ? entity.data.extraStats.emp : '—';
  const extraTec = entity.kind === 'pc' && entity.data.extraStats ? entity.data.extraStats.tec : '—';
  const extraCha = entity.kind === 'pc' && entity.data.extraStats ? entity.data.extraStats.cha : '—';

  const statsLine =
    lang === 'fr'
      ? `INT ${s.int} | RÉF ${s.ref} | DEX ${s.dex} | COR ${s.cor} | VIT ${s.vit} | EMP ${extraEmp} | TECH ${extraTec} | VOL ${s.vol} | CHA ${extraCha}`
      : `INT ${s.int} | REF ${s.ref} | DEX ${s.dex} | BODY ${s.cor} | SPD ${s.vit} | EMP ${extraEmp} | CRA ${extraTec} | WILL ${s.vol} | LUCK ${extraCha}`;

  const derivedLine =
    lang === 'fr'
      ? `ÉTOU ${s.etou} | COU ${runVal} | SAUT ${leapVal} | END ${entity.data.maxEnd} | ENC ${encVal} | RÉC ${s.rec} | PS ${entity.data.maxHp} | VIG ${s.vig}`
      : `STUN ${s.etou} | RUN ${runVal} | LEAP ${leapVal} | STA ${entity.data.maxEnd} | ENC ${encVal} | REC ${s.rec} | HP ${entity.data.maxHp} | VIGOR ${s.vig}`;

  let skillsList: Array<{ name: string; value: string | number }> = [];
  let keySkillsList: Array<{ name: string; value: string | number }> = [];
  let magicList: string[] = [];
  let gearList: string[] = [];

  if (entity.kind === 'pc') {
    const pc = entity.data;
    skillsList =
      pc.skills && pc.skills.length > 0
        ? pc.skills
        : lang === 'fr'
          ? [
              { name: 'Athlétisme', value: Math.max(2, s.dex - 2) },
              { name: 'Vigilance', value: Math.max(2, s.int - 1) },
              { name: 'Esquive / Évasion', value: Math.max(3, s.ref - 1) },
              { name: 'Mêlée / Escrime', value: Math.max(3, s.ref) },
              { name: 'Endurance', value: Math.max(2, s.cor - 2) },
              { name: 'Résistance à la contrainte', value: Math.max(2, s.vol - 1) },
            ]
          : [
              { name: 'Athletics', value: Math.max(2, s.dex - 2) },
              { name: 'Awareness', value: Math.max(2, s.int - 1) },
              { name: 'Dodge/Escape', value: Math.max(3, s.ref - 1) },
              { name: 'Melee / Swordsmanship', value: Math.max(3, s.ref) },
              { name: 'Endurance', value: Math.max(2, s.cor - 2) },
              { name: 'Resist Coercion', value: Math.max(2, s.vol - 1) },
            ];

    keySkillsList =
      pc.keySkills && pc.keySkills.length > 0
        ? pc.keySkills
        : [
            {
              name:
                pc.professionLabel ||
                (lang === 'fr' ? 'Spécialité de profession' : 'Profession Defining Skill'),
              value: 6,
            },
          ];

    magicList = pc.magic ?? [];
    gearList =
      pc.gear && pc.gear.length > 0
        ? pc.gear
        : [
            ...pc.weapons.map((w) => `${w.name} (${w.damage})`),
            `${lang === 'fr' ? 'Armure Tête' : 'Head Armor'} (PA ${pc.armor.head})`,
            `${lang === 'fr' ? 'Armure Torse' : 'Torso Armor'} (PA ${pc.armor.torso})`,
            `${lang === 'fr' ? 'Armure Membres' : 'Limb Armor'} (PA ${pc.armor.rightLeg})`,
          ];
  } else {
    const npc = entity.data;
    const estRank = NPC_TIER_ESTIMATED_SKILL[npc.powerTier] ?? 6;
    const profDef =
      npc.professionId !== 'custom'
        ? getProfessionDefinition(npc.professionId)
        : null;

    skillsList =
      lang === 'fr'
        ? [
            { name: 'Attaque (Base)', value: npc.attackBase },
            { name: 'Défense (Base)', value: npc.defenseBase },
            { name: 'Vigilance', value: s.int + estRank },
            { name: 'Courage', value: s.vol + estRank },
            { name: 'Athlétisme', value: s.dex + Math.max(2, estRank - 1) },
            { name: 'Endurance', value: s.cor + Math.max(2, estRank - 1) },
          ]
        : [
            { name: 'Attack (Base)', value: npc.attackBase },
            { name: 'Defense (Base)', value: npc.defenseBase },
            { name: 'Awareness', value: s.int + estRank },
            { name: 'Courage', value: s.vol + estRank },
            { name: 'Athletics', value: s.dex + Math.max(2, estRank - 1) },
            { name: 'Endurance', value: s.cor + Math.max(2, estRank - 1) },
          ];

    keySkillsList = [
      {
        name: profDef
          ? profDef.definingSkill[lang]
          : npc.professionLabel || (lang === 'fr' ? 'Art martial / Métier' : 'Signature Training'),
        value: estRank,
      },
    ];

    if (npc.professionId === 'witcher') {
      magicList =
        lang === 'fr'
          ? ['Signe d’Aard', 'Signe d’Axii', 'Signe d’Igni', 'Signe de Quen', 'Signe d’Yrden']
          : ['Aard Sign', 'Axii Sign', 'Igni Sign', 'Quen Sign', 'Yrden Sign'];
    } else if (npc.professionId === 'mage' || npc.professionId === 'priest') {
      magicList =
        lang === 'fr'
          ? ['Incantation', 'Bouclier arcanique', 'Projectiles magiques', 'Dissipation']
          : ['Spell Casting', 'Arcane Shield', 'Elemental Bolt', 'Dispel'];
    }

    gearList = [
      ...npc.weapons.map((w) => `${w.name} (${w.damage})`),
      `${lang === 'fr' ? 'Armure Tête' : 'Head Armor'} (PA ${npc.armor.head})`,
      `${lang === 'fr' ? 'Armure Torse' : 'Torso Armor'} (PA ${npc.armor.torso})`,
      `${lang === 'fr' ? 'Armure Bras' : 'Arm Armor'} (PA ${npc.armor.rightArm})`,
      `${lang === 'fr' ? 'Armure Jambes' : 'Leg Armor'} (PA ${npc.armor.rightLeg})`,
    ];
  }

  const hasMagic = magicList.length > 0;
  const magicTitle = hasMagic
    ? lang === 'fr'
      ? 'Magie'
      : 'Magic'
    : lang === 'fr'
      ? 'Combat & Armure'
      : 'Combat & Armor';

  const combatFallback = [
    ...entity.data.weapons.slice(0, 4).map((w) => `${w.name} (${w.damage})`),
    `${lang === 'fr' ? 'Armure Tête / Torse' : 'Armor Head / Torso'}: ${entity.data.armor.head} / ${entity.data.armor.torso}`,
    `${lang === 'fr' ? 'Armure Bras / Jambes' : 'Armor Arms / Legs'}: ${entity.data.armor.rightArm} / ${entity.data.armor.rightLeg}`,
  ];

  const finalMagic = hasMagic ? magicList : combatFallback;
  const lore =
    entity.data.notes?.trim() ||
    (lang === 'fr'
      ? `${entity.data.name} s’est forgé une solide réputation sur les routes du Continent. Prudent dans ses préparatifs mais redoutable lorsque les lames sortent du fourreau, ce compagnon sait imposer le respect dans les pires auberges comme sur les champs de bataille.`
      : `${entity.data.name} has carved out a hard-earned reputation along the war-torn roads of the Continent. Cautious in preparation yet ruthless once steel is drawn, few cross their path lightly.`);

  const attribution =
    entity.kind === 'pc' && entity.data.playerName
      ? entity.data.playerName
      : entity.data.professionLabel || (lang === 'fr' ? 'Hub du MJ' : 'GM Hub');

  const lines = [
    '::: character-sheet',
    `lang: ${lang}`,
    `name: ${entity.data.name}`,
    ...(entity.data.professionLabel ? [`subtitle: ${entity.data.professionLabel}`] : []),
    'image: preset:grimoire',
    `stats: ${statsLine}`,
    `derived: ${derivedLine}`,
    `skills: ${skillsList.map((sk) => `${sk.name} ${sk.value}`).join(' | ')}`,
    `keySkills: ${keySkillsList.map((k) => `${k.name} ${k.value}`).join(' | ')}`,
    `magicTitle: ${magicTitle}`,
    `magic: ${finalMagic.join(' | ')}`,
    `gear: ${gearList.join(' | ')}`,
    `quote: ${lore}`,
    `attribution: ${attribution}`,
    ':::',
  ];

  return lines.join('\n');
}

/**
 * Generates a blank editable PC / NPC template in either official 1-page format
 * (`::: character-sheet`) or compact quick statblock format (`::: statblock`).
 */
export function createBlankCharacterSheetTemplate(
  format: 'official' | 'quick',
  lang: ModuleLanguage
): string {
  if (format === 'quick') {
    if (lang === 'fr') {
      return [
        '::: statblock',
        'title: Nom du PJ / PNJ',
        'subtitle: Race · Profession (Modèle vierge)',
        'stats: INT 6 | RÉF 6 | DEX 6 | COR 6 | VIT 6 | EMP 6 | TECH 6 | VOL 6',
        'derived: PS 30 | END 30 | RÉC 6 | ÉTOU 6 | VIG 0',
        'Armure: Tête 0 · Torse 0 · Bras 0 · Jambes 0',
        'Attaque: Arme principale (Base 12 · 3d6 · Fiab. 10)',
        'Compétences clés: Spécialité 5 · Vigilance 10 · Esquive 10',
        'Notes: Historique, motivation et équipement notable.',
        ':::',
      ].join('\n');
    }
    return [
      '::: statblock',
      'title: PC / NPC Name',
      'subtitle: Race · Profession (Blank Template)',
      'stats: INT 6 | REF 6 | DEX 6 | BODY 6 | SPD 6 | EMP 6 | CRA 6 | WILL 6',
      'derived: HP 30 | STA 30 | REC 6 | STUN 6 | VIGOR 0',
      'Armor: Head 0 · Torso 0 · Arms 0 · Legs 0',
      'Attack: Primary Weapon (Base 12 · 3d6 · Rel. 10)',
      'Key Skills: Defining Skill 5 · Awareness 10 · Dodge 10',
      'Notes: Background, motivation, and notable equipment.',
      ':::',
    ].join('\n');
  }

  if (lang === 'fr') {
    return [
      '::: character-sheet',
      'lang: fr',
      'name: Nom du Personnage',
      'subtitle: Race · Profession',
      'image: preset:grimoire',
      'stats: INT 6 | RÉF 6 | DEX 6 | COR 6 | VIT 6 | EMP 6 | TECH 6 | VOL 6 | CHA 6',
      'derived: ÉTOU 6 | COU 18 | SAUT 3 | END 30 | ENC 60 | RÉC 6 | PS 30 | VIG 0',
      'skills: Athlétisme 0 | Bagarre 0 | Charisme 0 | Courage 0 | Déduction 0 | Endurance 0 | Esquive 0 | Furtivité 0 | Intimidation 0 | Mêlée 0 | Persuasion 0 | Survie 0 | Vigilance 0',
      'keySkills: Compétence Clé 5',
      'magicTitle: Combat & Armure',
      'magic: Arme principale (3d6) | Arme secondaire (2d6) | Armure Tête / Torse: 0 / 0 | Armure Bras / Jambes: 0 / 0',
      'gear: Arme principale | Dague | Vêtements de voyage | Bourse | Rations (×3) | Sac à dos | Torche | Gourde',
      'quote: Rédigez ici le portrait psychologique, les rumeurs de taverne ou le vécu du personnage.',
      'attribution: Chroniqueur du Continent',
      ':::',
    ].join('\n');
  }

  return [
    '::: character-sheet',
    'lang: en',
    'name: Character Name',
    'subtitle: Race · Profession',
    'image: preset:grimoire',
    'stats: INT 6 | REF 6 | DEX 6 | BODY 6 | SPD 6 | EMP 6 | CRA 6 | WILL 6 | LUCK 6',
    'derived: STUN 6 | RUN 18 | LEAP 3 | STA 30 | ENC 60 | REC 6 | HP 30 | VIGOR 0',
    'skills: Athletics 0 | Awareness 0 | Brawling 0 | Charisma 0 | Courage 0 | Deduction 0 | Dodge/Escape 0 | Endurance 0 | Intimidation 0 | Melee 0 | Persuasion 0 | Stealth 0 | Wilderness Survival 0',
    'keySkills: Defining Skill 5',
    'magicTitle: Combat & Armor',
    'magic: Primary Weapon (3d6) | Sidearm (2d6) | Armor Head / Torso: 0 / 0 | Armor Arms / Legs: 0 / 0',
    'gear: Primary Weapon | Dagger | Traveler Clothes | Coin Pouch | Rations (x3) | Backpack | Torch | Waterskin',
    'quote: Write the character biography, tavern rumors, or personal history here.',
    'attribution: Chronicler of the Continent',
    ':::',
  ].join('\n');
}
