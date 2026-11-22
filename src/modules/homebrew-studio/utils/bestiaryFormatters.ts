import type { BestiaryEntry } from '@/src/data/bestiary/types';
import type {
  SavedCustomMonster,
  SavedCustomNpc,
  SavedPartyCharacter,
} from '@/src/modules/combat-tracker/types';
import {
  getCreatureTypeLabel,
  getEnvironmentLabel,
} from '@/src/modules/encounter-manager/data';
import type {
  BestiaryLeftPageData,
  BestiaryRightPageData,
  ModuleLanguage,
} from '../types';

function parseNumeric(val: unknown, fallback = 0): number {
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val !== 'string') return fallback;
  const match = val.match(/-?\d+/);
  return match ? Number.parseInt(match[0], 10) : fallback;
}

/**
 * Resolves the governing Witcher TRPG attribute for a given localized skill name.
 * Canonical Bestiary `skills` store Skill Ranks, so Base = Stat + Rank.
 */
function inferGoverningStatValue(
  skillName: string,
  statsMap: Record<string, string>
): number {
  const s = skillName.toLowerCase();
  const pick = (fr: string, en: string, def = 5) =>
    parseNumeric(statsMap[fr] ?? statsMap[en], def);

  if (
    /vigilance|awareness|survie|survival|déduction|deduction|éducation|education|langue|speech|tactique|tactics|savoir|lore|négoce|business|instruction|teaching/.test(
      s
    )
  ) {
    return pick('INT', 'INT', 5);
  }
  if (
    /bagarre|brawling|esquive|dodge|mêlée|melee|escrime|sword|lames|blades|bâton|staff|équitation|riding|navigation|sailing/.test(
      s
    )
  ) {
    return pick('RÉF', 'REF', 6);
  }
  if (
    /athlétisme|athletics|archerie|archery|arbalète|crossbow|furtivité|stealth|adresse|sleight/.test(
      s
    )
  ) {
    return pick('DEX', 'DEX', 6);
  }
  if (/physique|résilience|endurance/.test(s)) {
    return pick('COR', 'BODY', 6);
  }
  if (
    /charisme|charisma|tromperie|deceit|persuasion|représentation|performance|psychologie|perception|commandement|leadership|séduction|seduction/.test(
      s
    )
  ) {
    return pick('EMP', 'EMP', 4);
  }
  if (
    /artisanat|crafting|alchimie|alchemy|crochetage|pick|premiers|first aid|déguisement|disguise/.test(
      s
    )
  ) {
    return pick('TECH', 'CRA', 4);
  }
  if (
    /courage|intimidation|contrainte|coercion|magie|magic|incantation|spell|rituel|ritual|envoûtement|hex/.test(
      s
    )
  ) {
    return pick('VOL', 'WILL', 5);
  }
  return pick('RÉF', 'REF', 5);
}

function findBestSkillBase(
  skills: Record<string, string>,
  statsMap: Record<string, string>,
  patterns: string[],
  fallbackStatKeyFr: string,
  fallbackStatKeyEn: string
): number {
  let bestRank = -1;
  let matchedName = '';
  for (const [k, v] of Object.entries(skills)) {
    const kl = k.toLowerCase();
    if (patterns.some((p) => kl.includes(p))) {
      const rank = parseNumeric(v, 0);
      if (rank > bestRank) {
        bestRank = rank;
        matchedName = k;
      }
    }
  }
  if (bestRank >= 0) {
    return inferGoverningStatValue(matchedName, statsMap) + bestRank;
  }
  return parseNumeric(
    statsMap[fallbackStatKeyFr] ?? statsMap[fallbackStatKeyEn],
    6
  );
}

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

/**
 * Parses a `::: bestiary-left ... :::` directive block into structured Left-Page Bestiary data.
 */
export function parseBestiaryLeftBlock(
  raw: string,
  lang: ModuleLanguage = 'fr'
): BestiaryLeftPageData {
  const data: BestiaryLeftPageData = {
    name: lang === 'fr' ? 'Créature' : 'Creature',
    creatureType: 'relict',
    threat: lang === 'fr' ? 'Moyen Complexe' : 'Medium Complex',
    intelligence: lang === 'fr' ? 'Instinctive' : 'Instinctual',
    senses: '—',
    image: 'preset:grimoire',
    stats: [],
    derived: [],
    height: '—',
    weight: '—',
    environment: '—',
    organization: '—',
    armor: '0',
    regeneration: '—',
    resistances: '—',
    immunities: '—',
    susceptibilities: '—',
    dodgeBase: '10',
    repositionBase: '10',
    blockBase: '10',
    bounty: '—',
    skills: [],
    loot: [],
    superstitionTitle:
      lang === 'fr'
        ? 'Superstition paysanne (Éducation SD : 12)'
        : 'Commoner Superstition (Education DC:12)',
    superstition: '',
    lang,
  };

  const superstitionLines: string[] = [];

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
      superstitionLines.push(line);
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
      case 'type':
      case 'creaturetype':
      case 'categorie':
        if (val) data.creatureType = val.toLowerCase();
        break;
      case 'threat':
      case 'danger':
      case 'menace':
        data.threat = val || '—';
        break;
      case 'intelligence':
        data.intelligence = val || '—';
        break;
      case 'senses':
      case 'sens':
        data.senses = val || '—';
        break;
      case 'image':
      case 'art':
        if (val) data.image = val;
        break;
      case 'stats':
        data.stats = splitKeyValPairs(val);
        break;
      case 'derived':
        data.derived = splitKeyValPairs(val);
        break;
      case 'height':
      case 'taille':
        data.height = val || '—';
        break;
      case 'weight':
      case 'poids':
        data.weight = val || '—';
        break;
      case 'environment':
      case 'environnement':
        data.environment = val || '—';
        break;
      case 'organization':
      case 'organisation':
        data.organization = val || '—';
        break;
      case 'armor':
      case 'armure':
        data.armor = val || '0';
        break;
      case 'regeneration':
      case 'régénération':
        data.regeneration = val || '—';
        break;
      case 'resistances':
      case 'résistances':
        data.resistances = val || '—';
        break;
      case 'immunities':
      case 'immunités':
        data.immunities = val || '—';
        break;
      case 'susceptibilities':
      case 'vulnerabilities':
      case 'vulnérabilités':
        data.susceptibilities = val || '—';
        break;
      case 'dodge':
      case 'dodgebase':
      case 'esquive':
        data.dodgeBase = val || '—';
        break;
      case 'reposition':
      case 'repositionbase':
      case 'déplacement':
        data.repositionBase = val || '—';
        break;
      case 'block':
      case 'blockbase':
      case 'blocage':
        data.blockBase = val || '—';
        break;
      case 'bounty':
      case 'reward':
      case 'prime':
        data.bounty = val || '—';
        break;
      case 'skills':
      case 'compétences':
        data.skills = splitKeyValPairs(val).map((item) => ({
          name: item.label,
          value: item.value,
        }));
        break;
      case 'loot':
      case 'butin':
        data.loot = val
          .split('|')
          .map((item) => item.trim())
          .filter(Boolean);
        break;
      case 'superstitiontitle':
      case 'loretitle':
        if (val) data.superstitionTitle = val;
        break;
      case 'superstition':
      case 'lore':
        if (val) superstitionLines.push(val);
        break;
      case 'lang':
        if (val === 'fr' || val === 'en') data.lang = val;
        break;
      default:
        superstitionLines.push(line);
        break;
    }
  }

  if (superstitionLines.length > 0) {
    data.superstition = superstitionLines.join(' ');
  }
  return data;
}

/**
 * Parses a `::: bestiary-right ... :::` directive block into structured Right-Page Bestiary data.
 */
export function parseBestiaryRightBlock(
  raw: string,
  lang: ModuleLanguage = 'fr'
): BestiaryRightPageData {
  const data: BestiaryRightPageData = {
    knowledgeTitle:
      lang === 'fr'
        ? 'Savoir du Sorceleur (Formation de Sorceleur SD : 14)'
        : 'Witcher Knowledge (Witcher Training DC:14)',
    knowledge: '',
    attacksTitle: lang === 'fr' ? 'Attaques' : 'Attacks',
    attacks: [],
    abilities: [],
    lang,
  };

  const knowledgeLines: string[] = [];

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const kv = line.match(/^([A-Za-zÀ-ÿ0-9_]+)\s*:\s*(.*)$/);
    if (!kv) {
      knowledgeLines.push(line);
      continue;
    }

    const key = kv[1].toLowerCase();
    const val = kv[2].trim();

    switch (key) {
      case 'knowledgetitle':
      case 'title':
        if (val) data.knowledgeTitle = val;
        break;
      case 'knowledge':
      case 'notes':
      case 'tactics':
        if (val) knowledgeLines.push(val);
        break;
      case 'attackstitle':
        if (val) data.attacksTitle = val;
        break;
      case 'attack':
      case 'attaque': {
        const parts = val.split('|').map((p) => p.trim());
        data.attacks.push({
          name: parts[0] || '—',
          atkBase: parts[1] || '—',
          type: parts[2] || '—',
          dmg: parts[3] || '—',
          rel: parts[4] || '—',
          rng: parts[5] || '—',
          effect: parts[6] || '—',
          rof: parts[7] || '1',
        });
        break;
      }
      case 'ability':
      case 'capacite':
      case 'capacité': {
        const pipeIdx = val.indexOf('|');
        if (pipeIdx > 0) {
          data.abilities.push({
            title: val.slice(0, pipeIdx).trim(),
            description: val.slice(pipeIdx + 1).trim(),
          });
        } else {
          data.abilities.push({
            title: val,
            description:
              lang === 'fr'
                ? 'Trait spécial issu du bestiaire officiel (voir règles de créature).'
                : 'Special creature trait from the official Witcher TRPG bestiary.',
          });
        }
        break;
      }
      case 'lang':
        if (val === 'fr' || val === 'en') data.lang = val;
        break;
      default:
        knowledgeLines.push(line);
        break;
    }
  }

  data.knowledge = knowledgeLines.join('\n\n');
  return data;
}

/**
 * Formats a BestiaryEntry as the official 2-Page Bestiary Spread (`::: bestiary-left` + `\page` + `::: bestiary-right`).
 */
export function formatBestiaryEntryAsTwoPageSpread(
  entry: BestiaryEntry,
  lang: ModuleLanguage
): string {
  const statsMap = entry.combat?.stats ?? {};
  const skillsMap = entry.combat?.skills ?? {};

  const primaryOrder =
    lang === 'fr'
      ? [
          ['INT', 'INT'],
          ['RÉF', 'REF'],
          ['DEX', 'DEX'],
          ['COR', 'BODY'],
          ['VIT', 'SPD'],
          ['EMP', 'EMP'],
          ['TECH', 'CRA'],
          ['VOL', 'WILL'],
        ]
      : [
          ['INT', 'INT'],
          ['REF', 'RÉF'],
          ['DEX', 'DEX'],
          ['BODY', 'COR'],
          ['SPD', 'VIT'],
          ['EMP', 'EMP'],
          ['CRA', 'TECH'],
          ['WILL', 'VOL'],
        ];

  const primaryLine = primaryOrder
    .map(([k, alt]) => `${k} ${statsMap[k] ?? statsMap[alt] ?? '—'}`)
    .join(' | ');

  const derivedOrder =
    lang === 'fr'
      ? [
          ['ÉTOU', 'STUN'],
          ['COU', 'RUN'],
          ['SAUT', 'LEAP'],
          ['END', 'STA'],
          ['ENC', 'ENC'],
          ['RÉC', 'REC'],
          ['PS', 'HP'],
        ]
      : [
          ['STUN', 'ÉTOU'],
          ['RUN', 'COU'],
          ['LEAP', 'SAUT'],
          ['STA', 'END'],
          ['ENC', 'ENC'],
          ['REC', 'RÉC'],
          ['HP', 'PS'],
        ];

  const derivedLine = derivedOrder
    .map(([k, alt]) => `${k} ${statsMap[k] ?? statsMap[alt] ?? '—'}`)
    .join(' | ');

  const skillPairs = Object.entries(skillsMap).map(([skillName, rankStr]) => {
    const rank = parseNumeric(rankStr, 0);
    const statVal = inferGoverningStatValue(skillName, statsMap);
    return `${skillName} ${statVal + rank}`;
  });

  const dodgeBase = findBestSkillBase(
    skillsMap,
    statsMap,
    ['esquive', 'dodge'],
    'RÉF',
    'REF'
  );
  const repositionBase = findBestSkillBase(
    skillsMap,
    statsMap,
    ['athlétisme', 'athletics'],
    'DEX',
    'DEX'
  );
  const blockBase = findBestSkillBase(
    skillsMap,
    statsMap,
    ['mêlée', 'melee', 'bagarre', 'brawling', 'escrime', 'sword'],
    'RÉF',
    'REF'
  );

  const meleeAtkBase = findBestSkillBase(
    skillsMap,
    statsMap,
    ['bagarre', 'brawling', 'mêlée', 'melee', 'escrime', 'sword'],
    'RÉF',
    'REF'
  );

  const envLabels =
    entry.environments.length > 0
      ? entry.environments.map((e) => getEnvironmentLabel(e, lang)).join(', ')
      : '—';

  const vulns = entry.combat?.vulnerabilities ?? [];
  const lootList = entry.combat?.loot ?? [];
  const notesArr = entry.notes[lang] ?? [];
  const superstitionText =
    notesArr[0] ??
    (lang === 'fr'
      ? `Les voyageurs prudents évitent les zones fréquentées par ${entry.name.fr.toLowerCase()} dès la tombée du soir.`
      : `Seasoned travelers steer clear of regions haunted by the ${entry.name.en.toLowerCase()} once dusk settles.`);

  const knowledgeText =
    notesArr.slice(1).join('\n\n') ||
    (lang === 'fr'
      ? `${entry.name.fr} appartient à la catégorie des ${getCreatureTypeLabel(entry.typeId, 'fr').toLowerCase()}. Préparez vos huiles et bombes adaptées avant l'engagement et exploitez ses vulnérabilités pour abréger l'affrontement.`
      : `${entry.name.en} is classified among ${getCreatureTypeLabel(entry.typeId, 'en').toLowerCase()}. Prepare appropriate blade oils and bombs before closing in, and exploit its susceptibilities early.`);

  const leftLines: string[] = [
    '::: bestiary-left',
    `lang: ${lang}`,
    `name: ${entry.name[lang]}`,
    `type: ${entry.typeId}`,
    `threat: ${entry.threat[lang]}`,
    `intelligence: ${entry.intelligence[lang]}`,
    `senses: ${entry.combat?.abilities.find((a) => /nyctalopie|vision|odorat|senses|night/i.test(a)) ?? '—'}`,
    'image: preset:grimoire',
    `stats: ${primaryLine}`,
    `derived: ${derivedLine}`,
    `height: ${entry.size[lang] || '—'}`,
    `weight: ${entry.weight[lang] || '—'}`,
    `environment: ${envLabels}`,
    `organization: ${entry.organization[lang] || '—'}`,
    `armor: ${entry.armor[lang] || '0'}`,
    'regeneration: —',
    'resistances: —',
    'immunities: —',
    `susceptibilities: ${vulns.length > 0 ? vulns.join(', ') : '—'}`,
    `dodge: ${dodgeBase}`,
    `reposition: ${repositionBase}`,
    `block: ${blockBase}`,
    `bounty: ${entry.reward[lang] || '—'}`,
    `skills: ${skillPairs.length > 0 ? skillPairs.join(' | ') : lang === 'fr' ? 'Vigilance 10' : 'Awareness 10'}`,
    `loot: ${lootList.length > 0 ? lootList.join(' | ') : '—'}`,
    `superstitionTitle: ${
      lang === 'fr'
        ? 'Superstition paysanne (Éducation SD : 12)'
        : 'Commoner Superstition (Education DC:12)'
    }`,
    `superstition: ${superstitionText}`,
    ':::',
  ];

  const rightLines: string[] = [
    '::: bestiary-right',
    `lang: ${lang}`,
    `knowledgeTitle: ${
      lang === 'fr'
        ? 'Savoir du Sorceleur (Formation de Sorceleur SD : 14)'
        : 'Witcher Knowledge (Witcher Training DC:14)'
    }`,
    `knowledge: ${knowledgeText}`,
  ];

  const weapons = entry.combat?.weapons ?? [];
  if (weapons.length > 0) {
    for (const w of weapons) {
      rightLines.push(
        `attack: ${w.name} | ${meleeAtkBase} | ${lang === 'fr' ? 'C/T' : 'S/P/B'} | ${w.damage} | — | ${lang === 'fr' ? 'Mêlée' : 'Melee'} | ${w.effect || '—'} | ${w.attacksPerTurn || '1'}`
      );
    }
  } else {
    rightLines.push(
      `attack: ${lang === 'fr' ? 'Attaque naturelle' : 'Natural Attack'} | ${meleeAtkBase} | B | 2d6 | — | — | — | 1`
    );
  }

  const abilities = entry.combat?.abilities ?? [];
  if (abilities.length > 0) {
    for (const ab of abilities) {
      const colonIdx = ab.indexOf(':');
      if (colonIdx > 0 && colonIdx < 36) {
        rightLines.push(
          `ability: ${ab.slice(0, colonIdx).trim()} | ${ab.slice(colonIdx + 1).trim()}`
        );
      } else {
        rightLines.push(
          `ability: ${ab} | ${
            lang === 'fr'
              ? `Capacité caractéristique (${ab}) utilisable en combat ou en embuscade selon le profil de la créature.`
              : `Signature creature ability (${ab}) applied during encounters and ambush resolution.`
          }`
        );
      }
    }
  } else {
    rightLines.push(
      `ability: ${lang === 'fr' ? 'Instinct de prédateur' : 'Predator Instinct'} | ${
        lang === 'fr'
          ? 'La créature exploite le terrain et attaque la cible la plus vulnérable.'
          : 'Uses natural terrain to isolate and strike the most vulnerable opponent.'
      }`
    );
  }

  rightLines.push(':::');

  return `${leftLines.join('\n')}\n\n\\page\n\n${rightLines.join('\n')}`;
}

/**
 * Formats a shared GM Hub entity (PC, custom NPC, or custom Monster) as a 2-page Bestiary spread.
 */
export function formatHubEntityAsTwoPageSpread(
  entity:
    | { kind: 'pc'; data: SavedPartyCharacter }
    | { kind: 'npc'; data: SavedCustomNpc }
    | { kind: 'monster'; data: SavedCustomMonster },
  lang: ModuleLanguage
): string {
  const s = entity.data.stats;
  const primaryLine =
    lang === 'fr'
      ? `INT ${s.int} | RÉF ${s.ref} | DEX ${s.dex} | COR ${s.cor} | VIT ${s.vit} | EMP — | TECH — | VOL ${s.vol}`
      : `INT ${s.int} | REF ${s.ref} | DEX ${s.dex} | BODY ${s.cor} | SPD ${s.vit} | EMP — | CRA — | WILL ${s.vol}`;
  const derivedLine =
    lang === 'fr'
      ? `ÉTOU ${s.etou} | COU ${s.vit * 3} | SAUT ${Math.max(1, Math.floor((s.vit * 3) / 5))} | END ${entity.data.maxEnd} | ENC ${s.cor * 10} | RÉC ${s.rec} | PS ${entity.data.maxHp}`
      : `STUN ${s.etou} | RUN ${s.vit * 3} | LEAP ${Math.max(1, Math.floor((s.vit * 3) / 5))} | STA ${entity.data.maxEnd} | ENC ${s.cor * 10} | REC ${s.rec} | HP ${entity.data.maxHp}`;

  const creatureType =
    entity.kind === 'monster' ? entity.data.typeId : 'humanoid';
  const threat =
    entity.kind === 'monster'
      ? entity.data.threatLabel
      : entity.kind === 'npc'
        ? entity.data.powerTier
        : entity.data.professionLabel;
  const armorVal =
    entity.kind === 'monster'
      ? String(entity.data.armorSp)
      : String(entity.data.armor.torso);
  const atkBase =
    entity.kind === 'pc' ? s.ref + 6 : entity.data.attackBase;
  const defBase =
    entity.kind === 'pc' ? s.ref + 6 : entity.data.defenseBase;

  const vulns =
    entity.kind === 'monster' && entity.data.vulnerabilities.length > 0
      ? entity.data.vulnerabilities.join(', ')
      : '—';
  const res =
    entity.kind === 'monster' && entity.data.resistances.length > 0
      ? entity.data.resistances.join(', ')
      : '—';
  const imm =
    entity.kind === 'monster' && entity.data.immunities.length > 0
      ? entity.data.immunities.join(', ')
      : '—';

  const leftLines: string[] = [
    '::: bestiary-left',
    `lang: ${lang}`,
    `name: ${entity.data.name}`,
    `type: ${creatureType}`,
    `threat: ${threat}`,
    `intelligence: ${entity.kind === 'monster' ? (lang === 'fr' ? 'Ruse / Variable' : 'Cunning') : (lang === 'fr' ? 'Doué de raison' : 'Sapient')}`,
    'senses: —',
    'image: preset:grimoire',
    `stats: ${primaryLine}`,
    `derived: ${derivedLine}`,
    `height: ${lang === 'fr' ? 'Variable' : 'Variable'}`,
    `weight: —`,
    `environment: ${lang === 'fr' ? 'Campagne du MJ' : 'GM Campaign'}`,
    `organization: ${entity.kind === 'pc' ? (lang === 'fr' ? 'Groupe d’aventuriers' : 'Adventuring Party') : (lang === 'fr' ? 'Solitaire' : 'Solitary')}`,
    `armor: ${armorVal}`,
    'regeneration: —',
    `resistances: ${res}`,
    `immunities: ${imm}`,
    `susceptibilities: ${vulns}`,
    `dodge: ${defBase}`,
    `reposition: ${s.dex + 5}`,
    `block: ${atkBase}`,
    'bounty: —',
    `skills: ${lang === 'fr' ? `Attaque ${atkBase} | Défense ${defBase} | Vigilance ${s.int + 5}` : `Attack ${atkBase} | Defense ${defBase} | Awareness ${s.int + 5}`}`,
    `loot: —`,
    `superstitionTitle: ${
      lang === 'fr' ? 'Notes de campagne' : 'Campaign Notes'
    }`,
    `superstition: ${entity.data.notes?.trim() || (lang === 'fr' ? 'Profil importé depuis le Hub MJ.' : 'Profile imported from GM Hub.')}`,
    ':::',
  ];

  const rightLines: string[] = [
    '::: bestiary-right',
    `lang: ${lang}`,
    `knowledgeTitle: ${
      lang === 'fr' ? 'Savoir & Tactique de combat' : 'Combat Lore & Tactics'
    }`,
    `knowledge: ${entity.data.notes?.trim() || (lang === 'fr' ? 'Utilisez les attaques et capacités ci-dessous pour résoudre l’affrontement.' : 'Use the attacks and abilities below during combat encounters.')}`,
  ];

  if (entity.data.weapons.length > 0) {
    for (const w of entity.data.weapons) {
      rightLines.push(
        `attack: ${w.name} | ${atkBase} | ${w.damageType.slice(0, 1).toUpperCase()} | ${w.damage} | ${w.maxReliability} | — | ${w.effectNote || '—'} | ${w.attacksPerRound}`
      );
    }
  }

  const abilities =
    entity.kind === 'monster' && entity.data.abilities.length > 0
      ? entity.data.abilities
      : [lang === 'fr' ? 'Spécialité martiale' : 'Combat Training'];

  for (const ab of abilities) {
    rightLines.push(
      `ability: ${ab} | ${
        lang === 'fr'
          ? `Capacité spéciale associée à ${entity.data.name}.`
          : `Signature ability associated with ${entity.data.name}.`
      }`
    );
  }
  rightLines.push(':::');

  return `${leftLines.join('\n')}\n\n\\page\n\n${rightLines.join('\n')}`;
}

/**
 * Generates a blank editable Monster template in either official 2-page Bestiary spread
 * (`::: bestiary-left` + `::: bestiary-right`) or compact quick statblock (`::: statblock`).
 */
export function createBlankMonsterTemplate(
  format: 'official' | 'quick',
  lang: ModuleLanguage
): string {
  if (format === 'quick') {
    if (lang === 'fr') {
      return [
        '::: statblock',
        'title: Nom du Monstre',
        'subtitle: Catégorie · Danger Moyen Complexe (Modèle vierge)',
        'stats: INT 3 | RÉF 7 | DEX 7 | COR 8 | VIT 6 | EMP 2 | TECH 1 | VOL 5',
        'derived: PS 40 | END 35 | RÉC 8 | ÉTOU 7',
        'Armure: 4',
        'Vulnérabilités: Lame en argent · Huile spécifique',
        'Attaques: Griffes (Base 13 · 3d6) | Morsure (Base 13 · 3d6+2)',
        'Capacités: Décrivez ici les traits particuliers et effets d’embuscade.',
        'Butin: Mutagène · Composants alchimiques',
        ':::',
      ].join('\n');
    }
    return [
      '::: statblock',
      'title: Monster Name',
      'subtitle: Category · Medium Complex Threat (Blank Template)',
      'stats: INT 3 | REF 7 | DEX 7 | BODY 8 | SPD 6 | EMP 2 | CRA 1 | WILL 5',
      'derived: HP 40 | STA 35 | REC 8 | STUN 7',
      'Armor: 4',
      'Susceptibilities: Silver Blade · Specific Oil',
      'Attacks: Claws (Base 13 · 3d6) | Bite (Base 13 · 3d6+2)',
      'Abilities: Describe signature traits and ambush tactics here.',
      'Loot: Mutagen · Alchemy Components',
      ':::',
    ].join('\n');
  }

  if (lang === 'fr') {
    return [
      '::: bestiary-left',
      'lang: fr',
      'name: Nom du Monstre',
      'type: relict',
      'threat: Moyen Complexe',
      'intelligence: Instinctive',
      'senses: Nyctalopie',
      'image: preset:grimoire',
      'stats: INT 3 | RÉF 7 | DEX 7 | COR 8 | VIT 6 | EMP 2 | TECH 1 | VOL 5',
      'derived: ÉTOU 7 | COU 18 | SAUT 3 | END 35 | ENC 80 | RÉC 8 | PS 40',
      'height: Environ 2 mètres',
      'weight: Environ 180 kg',
      'environment: Forêts, ruines et grottes',
      'organization: Solitaire',
      'armor: 4',
      'regeneration: —',
      'resistances: —',
      'immunities: —',
      'susceptibilities: Lame en argent, Feu',
      'dodge: 12',
      'reposition: 11',
      'block: 13',
      'bounty: 250 couronnes',
      'skills: Athlétisme 12 | Bagarre 13 | Courage 11 | Esquive 12 | Furtivité 12 | Intimidation 11 | Vigilance 12',
      'loot: Composants communs (×1d6) | Trophée de créature | Mutagène (×1)',
      'superstitionTitle: Superstition paysanne (Éducation SD : 12)',
      'superstition: Rédigez ici les récits effrayants et rumeurs des villageois à propos de la créature.',
      ':::',
      '',
      '\\page',
      '',
      '::: bestiary-right',
      'lang: fr',
      'knowledgeTitle: Savoir du Sorceleur (Formation de Sorceleur SD : 14)',
      'knowledge: Décrivez ici les habitudes de chasse, les signes annonciateurs et la tactique recommandée pour vaincre la créature.',
      'attack: Griffes | 13 | T | 3d6 | — | Mêlée | Saignement (25%) | 2',
      'attack: Morsure | 12 | P | 3d6+2 | — | Mêlée | — | 1',
      'ability: Trait caractéristique | Décrivez l’effet mécanique de cette capacité en combat.',
      'ability: Attaque spéciale | Décrivez le coût en action, le SD de résistance et les dégâts.',
      ':::',
    ].join('\n');
  }

  return [
    '::: bestiary-left',
    'lang: en',
    'name: Monster Name',
    'type: relict',
    'threat: Medium Complex',
    'intelligence: Instinctual',
    'senses: Night Vision',
    'image: preset:grimoire',
    'stats: INT 3 | REF 7 | DEX 7 | BODY 8 | SPD 6 | EMP 2 | CRA 1 | WILL 5',
    'derived: STUN 7 | RUN 18 | LEAP 3 | STA 35 | ENC 80 | REC 8 | HP 40',
    'height: Around 2 Meters',
    'weight: Around 180 kg',
    'environment: Forests, Ruins & Caves',
    'organization: Solitary',
    'armor: 4',
    'regeneration: —',
    'resistances: —',
    'immunities: —',
    'susceptibilities: Silver Blade, Fire',
    'dodge: 12',
    'reposition: 11',
    'block: 13',
    'bounty: 250 Crowns',
    'skills: Athletics 12 | Awareness 12 | Brawling 13 | Courage 11 | Dodge/Escape 12 | Intimidation 11 | Stealth 12',
    'loot: Common Components (x1d6) | Creature Trophy | Mutagen (x1)',
    'superstitionTitle: Commoner Superstition (Education DC:12)',
    'superstition: Write local villager rumors and superstitions about this monster here.',
    ':::',
    '',
    '\\page',
    '',
    '::: bestiary-right',
    'lang: en',
    'knowledgeTitle: Witcher Knowledge (Witcher Training DC:14)',
    'knowledge: Describe hunting patterns, weaknesses, and tactical advice for fighting this creature.',
    'attack: Claws | 13 | S | 3d6 | — | Melee | Bleed (25%) | 2',
    'attack: Bite | 12 | P | 3d6+2 | — | Melee | — | 1',
    'ability: Signature Trait | Describe the mechanical effect of this trait during combat.',
    'ability: Special Attack | Describe the action cost, defense DC, and damage.',
    ':::',
  ].join('\n');
}
