import {
  CORE_DEFINING_SKILLS_REF,
  TALENT_REFERENCE_EXTRAS,
  getTalentsByProfession,
} from '@/src/data/talents';
import {
  PROFESSIONS_DATA,
  getProfessionDefinition,
} from '@/src/modules/character-generator/data/racesAndProfessions';
import { getSkillDefinition } from '@/src/modules/character-generator/data/skillsCatalog';
import { PROFESSION_STARTER_KITS } from '@/src/modules/character-generator/data/startingGearData';
import type { CharacterProfessionId } from '@/src/modules/character-generator/types';
import type {
  ModuleLanguage,
  ProfessionOverviewPageData,
  ProfessionTreePageData,
  ProfessionTreeSideSubTable,
  ProfessionTreeTalentNode,
} from '../types';

function splitPipeList(raw: string): string[] {
  return raw
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatSkillShortAttr(attr: string, lang: ModuleLanguage): string {
  const mapFr: Record<string, string> = {
    INT: 'Int',
    REF: 'Réf',
    DEX: 'Dex',
    COR: 'Cor',
    VIT: 'Vit',
    EMP: 'Emp',
    TEC: 'Tech',
    VOL: 'Vol',
    CHA: 'Cha',
  };
  const mapEn: Record<string, string> = {
    INT: 'Int',
    REF: 'Ref',
    DEX: 'Dex',
    COR: 'Body',
    VIT: 'Spd',
    EMP: 'Emp',
    TEC: 'Cra',
    VOL: 'Will',
    CHA: 'Luck',
  };
  return (lang === 'fr' ? mapFr[attr] : mapEn[attr]) ?? attr;
}

/**
 * Parses a `::: profession ... :::` directive block into structured data
 * matching the official Witcher TRPG Profession Overview page (left spread).
 */
export function parseProfessionOverviewBlock(
  raw: string,
  lang: ModuleLanguage = 'fr'
): ProfessionOverviewPageData {
  const data: ProfessionOverviewPageData = {
    title: lang === 'fr' ? 'NOUVELLE PROFESSION' : 'NEW PROFESSION',
    image: 'preset:grimoire',
    definingSkillTitle:
      lang === 'fr' ? 'Compétence exclusive (INT)' : 'Defining Skill (INT)',
    definingSkillShort:
      lang === 'fr' ? 'Compétence exclusive' : 'Defining Skill',
    definingSkillText: '',
    quote: '',
    lore: '',
    vigor: '0',
    magicPerks: [],
    skills: [],
    gearTitle:
      lang === 'fr' ? '5 équipements parmi' : 'Starting Gear (Pick 5)',
    gear: [],
    lang,
  };

  const loreParagraphs: string[] = [];
  let inLoreSection = false;

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      if (inLoreSection && loreParagraphs.length > 0) {
        loreParagraphs.push('');
      }
      continue;
    }

    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      data.image = imgMatch[2].trim();
      continue;
    }

    const kv = line.match(/^([A-Za-zÀ-ÿ0-9_]+)\s*:\s*(.*)$/);
    if (kv && !inLoreSection) {
      const key = kv[1].toLowerCase();
      const val = kv[2].trim();

      switch (key) {
        case 'lang':
          if (val === 'fr' || val === 'en') data.lang = val;
          break;
        case 'title':
        case 'name':
        case 'profession':
          if (val) data.title = val;
          break;
        case 'image':
        case 'portrait':
        case 'art':
          if (val) data.image = val;
          break;
        case 'definingskill':
        case 'competenceexclusive':
          if (val) data.definingSkillTitle = val;
          break;
        case 'definingskillshort':
        case 'exclusiveshort':
          if (val) data.definingSkillShort = val;
          break;
        case 'definingskilltext':
        case 'exclusivetext':
          if (val) data.definingSkillText = val;
          break;
        case 'quote':
        case 'citation':
          if (val) data.quote = val;
          break;
        case 'quoteattribution':
        case 'quoteauthor':
        case 'auteurcitation':
          if (val) data.quoteAttribution = val;
          break;
        case 'loreattribution':
        case 'chronicler':
        case 'chroniqueur':
          if (val) data.loreAttribution = val;
          break;
        case 'vigor':
        case 'vigueur':
          if (val) data.vigor = val;
          break;
        case 'magictitle':
        case 'titremagie':
          if (val) data.magicTitle = val;
          break;
        case 'magicperks':
        case 'magic':
        case 'atoutsmagiques':
          data.magicPerks = splitPipeList(val);
          break;
        case 'skills':
        case 'competences':
        case 'compétences':
          data.skills = splitPipeList(val);
          break;
        case 'geartitle':
        case 'titreequipement':
          if (val) data.gearTitle = val;
          break;
        case 'gear':
        case 'equipement':
        case 'équipement':
          data.gear = splitPipeList(val);
          break;
        case 'treasure':
        case 'pecule':
        case 'pécule':
        case 'coin':
          if (val) data.treasure = val;
          break;
        case 'lore':
        case 'recit':
        case 'récit':
          inLoreSection = true;
          if (val) loreParagraphs.push(val);
          break;
        default:
          loreParagraphs.push(line);
          break;
      }
      continue;
    }

    if (kv && kv[1].toLowerCase() === 'loreattribution') {
      data.loreAttribution = kv[2].trim();
      continue;
    }

    loreParagraphs.push(line);
  }

  // Collapse raw lore lines cleanly into double-newline paragraphs
  const cleanedParas: string[] = [];
  let buffer: string[] = [];
  for (const item of loreParagraphs) {
    if (item === '') {
      if (buffer.length > 0) {
        cleanedParas.push(buffer.join(' '));
        buffer = [];
      }
    } else {
      buffer.push(item);
    }
  }
  if (buffer.length > 0) {
    cleanedParas.push(buffer.join(' '));
  }

  if (cleanedParas.length > 0) {
    const last = cleanedParas[cleanedParas.length - 1];
    if (!data.loreAttribution && /^[-—–]\s*.+/.test(last)) {
      data.loreAttribution = last.replace(/^[-—–]\s*/, '').trim();
      cleanedParas.pop();
    }
    data.lore = cleanedParas.join('\n\n');
  }

  if (!data.definingSkillShort || data.definingSkillShort === 'Compétence exclusive') {
    const stripped = data.definingSkillTitle.replace(/\s*\([^)]+\)\s*$/, '').trim();
    if (stripped) data.definingSkillShort = stripped;
  }

  return data;
}

/**
 * Parses a `::: profession-tree ... :::` directive block into structured data
 * matching the official Witcher TRPG Skill Tree page (right spread).
 */
export function parseProfessionTreeBlock(
  raw: string,
  lang: ModuleLanguage = 'fr'
): ProfessionTreePageData {
  const emptyTalents: ProfessionTreeTalentNode[] = Array.from(
    { length: 9 },
    (_, i) => ({
      name: `${lang === 'fr' ? 'Talent' : 'Talent'} ${i + 1}`,
      description: '',
    })
  );

  const data: ProfessionTreePageData = {
    title:
      lang === 'fr'
        ? 'ARBRE DE COMPÉTENCE DE PROFESSION'
        : 'PROFESSION SKILL TREE',
    definingSkillTitle:
      lang === 'fr' ? 'COMPÉTENCE EXCLUSIVE (INT)' : 'DEFINING SKILL (INT)',
    definingSkillDescription: '',
    branches:
      lang === 'fr'
        ? ['Branche I', 'Branche II', 'Branche III']
        : ['Branch I', 'Branch II', 'Branch III'],
    talents: emptyTalents,
    sideTables: [],
    lang,
  };

  let currentTable: ProfessionTreeSideSubTable | null = null;

  const ensureSection = (table: ProfessionTreeSideSubTable) => {
    if (table.sections.length === 0) {
      table.sections.push({ rows: [] });
    }
    return table.sections[table.sections.length - 1];
  };

  for (const rawLine of raw.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;

    const kv = line.match(/^([A-Za-zÀ-ÿ0-9_]+)\s*:\s*(.*)$/);
    if (!kv) continue;

    const key = kv[1].toLowerCase();
    const val = kv[2].trim();

    if (key === 'lang') {
      if (val === 'fr' || val === 'en') data.lang = val;
      continue;
    }
    if (key === 'title' || key === 'titre') {
      if (val) data.title = val;
      continue;
    }
    if (key === 'definingskilltitle' || key === 'exclusivetitle') {
      if (val) data.definingSkillTitle = val;
      continue;
    }
    if (key === 'definingskilldescription' || key === 'exclusivedescription') {
      data.definingSkillDescription = val.replace(/\s*\|\|\s*/g, '\n\n');
      continue;
    }
    if (key === 'branches') {
      const parts = splitPipeList(val);
      data.branches = [
        parts[0] || data.branches[0],
        parts[1] || data.branches[1],
        parts[2] || data.branches[2],
      ];
      continue;
    }

    // Match talentB_T (e.g. talent1_1 = col 0 row 0, talent3_2 = col 2 row 1)
    const talentMatch = key.match(/^talent([1-3])_([1-3])$/);
    if (talentMatch) {
      const col = Number(talentMatch[1]) - 1;
      const row = Number(talentMatch[2]) - 1;
      const idx = row * 3 + col;
      const pipeIdx = val.indexOf('|');
      if (pipeIdx >= 0) {
        data.talents[idx] = {
          name: val.slice(0, pipeIdx).trim(),
          description: val.slice(pipeIdx + 1).trim(),
        };
      } else if (val) {
        data.talents[idx] = { name: val, description: '' };
      }
      continue;
    }

    if (key === 'sidetable') {
      const parts = splitPipeList(val);
      currentTable = {
        title: parts[0] || 'TABLE',
        headers: [
          parts[1] || (lang === 'fr' ? 'Catégorie' : 'Category'),
          parts[2] || (lang === 'fr' ? 'Coût' : 'Cost'),
        ],
        sections: [],
      };
      data.sideTables.push(currentTable);
      continue;
    }

    if (key === 'sidesection' && currentTable) {
      currentTable.sections.push({
        heading: val || undefined,
        rows: [],
      });
      continue;
    }

    if (key === 'siderow' && currentTable) {
      const pipeIdx = val.indexOf('|');
      const sec = ensureSection(currentTable);
      if (pipeIdx >= 0) {
        sec.rows.push([
          val.slice(0, pipeIdx).trim(),
          val.slice(pipeIdx + 1).trim(),
        ]);
      } else if (val) {
        sec.rows.push([val, '—']);
      }
    }
  }

  return data;
}

/**
 * Serializes structured `ProfessionOverviewPageData` back to a readable `::: profession` block.
 */
export function serializeProfessionOverviewBlock(
  data: ProfessionOverviewPageData
): string {
  const lines: string[] = [
    '::: profession',
    `lang: ${data.lang ?? 'fr'}`,
    `title: ${data.title}`,
    `image: ${data.image || 'preset:grimoire'}`,
    ...(data.quote ? [`quote: ${data.quote}`] : []),
    ...(data.quoteAttribution
      ? [`quoteAttribution: ${data.quoteAttribution}`]
      : []),
    `definingSkill: ${data.definingSkillTitle}`,
    `definingSkillShort: ${data.definingSkillShort}`,
    `definingSkillText: ${data.definingSkillText.replace(/\n+/g, ' ')}`,
    `vigor: ${data.vigor || '0'}`,
    ...(data.magicTitle ? [`magicTitle: ${data.magicTitle}`] : []),
    ...(data.magicPerks.length > 0
      ? [`magicPerks: ${data.magicPerks.join(' | ')}`]
      : []),
    `skills: ${data.skills.join(' | ')}`,
    ...(data.gearTitle ? [`gearTitle: ${data.gearTitle}`] : []),
    `gear: ${data.gear.join(' | ')}`,
    ...(data.treasure ? [`treasure: ${data.treasure}`] : []),
    ...(data.loreAttribution
      ? [`loreAttribution: ${data.loreAttribution}`]
      : []),
    'lore:',
    data.lore,
    ':::',
  ];
  return lines.join('\n');
}

/**
 * Serializes structured `ProfessionTreePageData` back to a readable `::: profession-tree` block.
 */
export function serializeProfessionTreeBlock(
  data: ProfessionTreePageData
): string {
  const lines: string[] = [
    '::: profession-tree',
    `lang: ${data.lang ?? 'fr'}`,
    `title: ${data.title}`,
    `definingSkillTitle: ${data.definingSkillTitle}`,
    `definingSkillDescription: ${data.definingSkillDescription
      .replace(/\n{2,}/g, ' || ')
      .replace(/\n/g, ' ')}`,
    `branches: ${data.branches.join(' | ')}`,
  ];

  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const node = data.talents[row * 3 + col] ?? { name: '', description: '' };
      lines.push(
        `talent${col + 1}_${row + 1}: ${node.name} | ${node.description.replace(/\n+/g, ' ')}`
      );
    }
  }

  for (const table of data.sideTables) {
    lines.push(
      `sideTable: ${table.title} | ${table.headers[0]} | ${table.headers[1]}`
    );
    for (const section of table.sections) {
      if (section.heading) {
        lines.push(`sideSection: ${section.heading}`);
      }
      for (const [k, v] of section.rows) {
        lines.push(`sideRow: ${k} | ${v}`);
      }
    }
  }

  lines.push(':::');
  return lines.join('\n');
}

/**
 * Combines the Profession Overview page and Skill Tree page into an official 2-page spread.
 */
export function serializeProfessionSpreadToMarkdown(
  overview: ProfessionOverviewPageData,
  tree: ProfessionTreePageData
): string {
  return `${serializeProfessionOverviewBlock(overview)}\n\n\\page\n\n${serializeProfessionTreeBlock(tree)}`;
}

/**
 * Creates a faithful example / blank 2-page Profession spread modeled after the Core Rulebook layout.
 */
export function createBlankProfessionSpreadData(lang: ModuleLanguage): {
  overview: ProfessionOverviewPageData;
  tree: ProfessionTreePageData;
} {
  if (lang === 'fr') {
    return {
      overview: {
        lang: 'fr',
        title: 'INQUISITEUR',
        image: 'preset:grimoire',
        definingSkillTitle: 'Mandat du Chapitre (EMP)',
        definingSkillShort: 'Mandat du Chapitre',
        definingSkillText:
          'D’un simple sceau ou d’une sentence prononcée à voix haute, l’Inquisiteur peut réquisitionner un gîte, un laissez-passer ou l’assistance d’une garnison locale (SD fixé par le MJ selon l’autorité du lieu).',
        quote:
          '« La vérité ne se cache jamais bien loin ; elle tremble simplement sous les planches en attendant qu’on lui tende la main… ou la torche. »',
        quoteAttribution: 'Frère Malakor de Novigrad',
        loreAttribution: 'Rodolf Kazmer',
        lore:
          'On croise rarement ces gens-là sans ressentir un frisson désagréable entre les omoplates. Partout dans le Nord, les prêtres crient à l’hérésie dès qu’un feu follet traverse un marais, mais ceux qu’on appelle les Inquisiteurs travaillent avec une froideur méthodique qui ferait passer un mercenaire redannien pour un poète.\n\nDans les cités libres comme sur les routes boueuses de Témérie, ils inspectent les registres, confisquent les grimoires douteux et interrogent les témoins jusqu’à ce que les mensonges s’effritent. Bien qu’ils prétendent agir au nom de l’ordre ou d’une foi supérieure, plus d’un seigneur préfère leur glisser une bourse discrète afin qu’ils aillent enquêter dans le fief voisin.',
        vigor: '0',
        magicPerks: [],
        skills: [
          'Vigilance (Int)',
          'Déduction (Int)',
          'Éducation (Int)',
          'Étiquette (Int)',
          'Psychologie (Emp)',
          'Intimidation (Vol)',
          'Courage (Vol)',
          'Résistance à la magie (Vol)',
          'Escrime (Réf)',
          'Équitation (Réf)',
        ],
        gearTitle: '5 équipements parmi',
        gear: [
          'Épée longue',
          'Masse d’armes',
          'Arbalète & 20 carreaux',
          'Gambison renforcé',
          'Sceau officiel',
          'Lanterne sourde',
          'Nécessaire d’écriture',
          'Jeu de menottes',
          'Journal de terrain',
          'Bourse de 50 couronnes',
        ],
        treasure: '2d6 × 15 couronnes',
      },
      tree: {
        lang: 'fr',
        title: 'ARBRE DE COMPÉTENCE D’INQUISITEUR',
        definingSkillTitle: 'MANDAT DU CHAPITRE (EMP)',
        definingSkillDescription:
          'L’Inquisiteur incarne l’autorité implacable d’un ordre religieux, d’une couronne ou d’un tribunal itinérant. Lorsqu’il exhibe ses lettres de créance devant des gardes, des notables ou un clergé local, il peut effectuer un jet de Mandat du Chapitre dont le SD dépend de la taille de l’agglomération et de l’hostilité ambiante.||En cas de réussite, les autorités acceptent de lui ouvrir les registres, de lui prêter main-forte ou de fermer les yeux sur ses méthodes le temps de l’enquête. Un échec critique éveille au contraire la méfiance immédiate des notables.',
        branches: ['Zélote', 'Enquêteur', 'Censeur'],
        talents: [
          {
            name: 'Zèle ardent (VOL)',
            description:
              'Au cœur d’un affrontement ou d’un interrogatoire tendu, l’Inquisiteur peut effectuer un jet de **Zèle ardent** SD 14 pour ignorer les malus de peur, d’étourdissement ou de blessure grave pendant un nombre de rounds égal à la moitié de son score.',
          },
          {
            name: 'Regard accusateur (EMP)',
            description:
              'Lors d’une joute verbale ou d’un interrogatoire, un jet de **Regard accusateur** opposé à la Résistance à la contrainte révèle si l’interlocuteur dissimule une preuve matérielle ou un complice.',
          },
          {
            name: 'Sceau d’anathème (VOL)',
            description:
              'Face à un lanceur de sorts ou un artefact suspect, l’Inquisiteur réussit un jet de **Sceau d’anathème** opposé à l’Incantation pour perturber la concentration de la cible (–3 à son prochain jet magique).',
          },
          {
            name: 'Châtiment implacable (COR)',
            description:
              'Lorsqu’il porte une attaque de mêlée contre un adversaire déjà effrayé ou déséquilibré, un jet de **Châtiment implacable** SD 16 ajoute +1d6 dégâts par tranche de 3 points au-dessus du SD.',
          },
          {
            name: 'Dossier accablant (INT)',
            description:
              'Après avoir recueilli au moins deux indices dans une affaire, l’Inquisiteur réalise un jet de **Dossier accablant** SD 15 pour obtenir un bonus de +3 à tous ses jets sociaux contre les alliés du suspect.',
          },
          {
            name: 'Rappel à l’ordre (EMP)',
            description:
              'Sur la place publique, un jet de **Rappel à l’ordre** SD 15 rallie 1d6 miliciens ou badauds prêts à bloquer une issue ou témoigner sous serment.',
          },
          {
            name: 'Exécution exemplaire (VOL)',
            description:
              'Une fois par scène, après avoir neutralisé un chef ennemi, un jet de **Exécution exemplaire** opposé au Courage force les sbires restants à effectuer un test de moral immédiat avec –3.',
          },
          {
            name: 'Réseau d’indicateurs (INT)',
            description:
              'En payant 20 couronnes dans une ville, un jet de **Réseau d’indicateurs** SD 14 permet d’obtenir une planque sûre et un rapport détaillé sur les mouvements nocturnes d’une cible.',
          },
          {
            name: 'Immunité diplomatique (EMP)',
            description:
              'Un jet de **Immunité diplomatique** opposé à l’Étiquette d’un magistrat annule une arrestation mineure ou fait lever une mise en garde sur tout le territoire d’une province.',
          },
        ],
        sideTables: [
          {
            title: 'JURIDICTION',
            headers: ['Localité', 'SD'],
            sections: [
              {
                heading: 'Mandat & Réquisition',
                rows: [
                  ['Hameau / Poste frontière', '12'],
                  ['Village fortifié', '14'],
                  ['Ville libre', '18'],
                  ['Capitale royale', '22'],
                ],
              },
            ],
          },
        ],
      },
    };
  }

  return {
    overview: {
      lang: 'en',
      title: 'INQUISITOR',
      image: 'preset:grimoire',
      definingSkillTitle: 'Chapter Writ (EMP)',
      definingSkillShort: 'Chapter Writ',
      definingSkillText:
        'By presenting an official wax seal or pronouncing a formal warrant, the Inquisitor may requisition lodging, safe-conduct passes, or local garrison aid (GM-set DC depending on local authority).',
      quote:
        '"The truth never hides very far; it merely trembles beneath the floorboards waiting for a lantern—or a torch."',
      quoteAttribution: 'Brother Malakor of Novigrad',
      loreAttribution: 'Rodolf Kazmer',
      lore:
        'Folks rarely cross paths with their kind without feeling a cold draft settle between their shoulder blades. Across the North, temple zealots cry heresy whenever marsh gas flickers at dusk, yet true Inquisitors work with a methodical chill that makes Redanian sellswords look warm.\n\nFrom free-city archive vaults to rain-soaked Temerian tollgates, they audit ledgers, seize suspect grimoires, and press witnesses until every alibi cracks. Even when they claim to serve higher order, most aldermen would rather slip them a heavy coin purse to investigate the neighboring barony instead.',
      vigor: '0',
      magicPerks: [],
      skills: [
        'Awareness (Int)',
        'Deduction (Int)',
        'Education (Int)',
        'Social Etiquette (Int)',
        'Human Perception (Emp)',
        'Intimidation (Will)',
        'Courage (Will)',
        'Resist Magic (Will)',
        'Swordsmanship (Ref)',
        'Riding (Ref)',
      ],
      gearTitle: 'Starting Gear (Pick 5)',
      gear: [
        'Longsword',
        'Mace',
        'Crossbow & 20 Bolts',
        'Reinforced Gambeson',
        'Official Wax Seal',
        'Bullseye Lantern',
        'Writing Kit',
        'Manacles',
        'Field Journal',
        '50-Crown Pouch',
      ],
      treasure: '2d6 × 15 crowns',
    },
    tree: {
      lang: 'en',
      title: 'INQUISITOR SKILL TREE',
      definingSkillTitle: 'CHAPTER WRIT (EMP)',
      definingSkillDescription:
        'An Inquisitor wields the feared mandate of a ruling crown, temple court, or circuit tribunal. Whenever you present your sealed writ before city watchmen, magistrates, or clergy, roll Chapter Writ against a DC set by the settlement’s size and political hostility.||On a success, local officials open sealed ledgers, lend armed escorts, or turn a blind eye during your investigation. On a fumble, suspicious notables quietly alert your targets instead.',
      branches: ['Zealot', 'Investigator', 'Censor'],
      talents: [
        {
          name: 'Ardent Zeal (WILL)',
          description:
            'During heated combat or tense interrogation, roll **Ardent Zeal** DC 14 to ignore penalties from fear, stun, or critical wound shock for rounds equal to half your rank.',
        },
        {
          name: 'Accusing Gaze (EMP)',
          description:
            'During verbal combat or questioning, roll **Accusing Gaze** opposed by Resist Coercion to spot concealed physical evidence or an unnamed accomplice.',
        },
        {
          name: 'Seal of Anathema (WILL)',
          description:
            'Confronting a caster or suspect relic, roll **Seal of Anathema** opposed by Spell Casting to disrupt focus (–3 to the target’s next magical roll).',
        },
        {
          name: 'Relentless Judgment (BODY)',
          description:
            'When striking an intimidated or staggered foe in melee, roll **Relentless Judgment** DC 16 to add +1d6 damage per 3 points over the DC.',
        },
        {
          name: 'Damning Dossier (INT)',
          description:
            'After gathering at least two case clues, roll **Damning Dossier** DC 15 to gain +3 on all social checks against a suspect’s associates.',
        },
        {
          name: 'Call to Order (EMP)',
          description:
            'In a crowded square, roll **Call to Order** DC 15 to rally 1d6 militia or citizens willing to seal an exit or testify under oath.',
        },
        {
          name: 'Exemplary Verdict (WILL)',
          description:
            'Once per scene upon defeating a leader, roll **Exemplary Verdict** opposed by Courage to force remaining henchmen into an immediate morale check at –3.',
        },
        {
          name: 'Informant Ledger (INT)',
          description:
            'Spending 20 crowns in any city, roll **Informant Ledger** DC 14 to secure a safehouse and nightly movement reports on a chosen target.',
        },
        {
          name: 'Diplomatic Immunity (EMP)',
          description:
            'Roll **Diplomatic Immunity** opposed by a magistrate’s Social Etiquette to void a minor warrant or lift curfews across an entire province.',
        },
      ],
      sideTables: [
        {
          title: 'JURISDICTION',
          headers: ['Settlement', 'DC'],
          sections: [
            {
              heading: 'Writs & Requisition',
              rows: [
                ['Hamlet / Border Post', '12'],
                ['Fortified Village', '14'],
                ['Free City', '18'],
                ['Royal Capital', '22'],
              ],
            },
          ],
        },
      ],
    },
  };
}

/**
 * Pre-fills a 2-page Profession spread directly from any existing profession
 * in the application's compendium (`PROFESSIONS_DATA`, `CORE_DEFINING_SKILLS_REF`, `ALL_TALENTS`, `TALENT_REFERENCE_EXTRAS`).
 */
export function buildProfessionSpreadFromCompendium(
  professionId: CharacterProfessionId,
  lang: ModuleLanguage
): {
  overview: ProfessionOverviewPageData;
  tree: ProfessionTreePageData;
} {
  const prof = getProfessionDefinition(professionId);
  const starterKit = PROFESSION_STARTER_KITS[professionId];
  const definingRef = prof.talentProfessionId
    ? CORE_DEFINING_SKILLS_REF[prof.talentProfessionId]
    : undefined;
  const talents = prof.talentProfessionId
    ? [...getTalentsByProfession(prof.talentProfessionId)]
    : [];

  const titleUpper = prof.name[lang].toUpperCase();
  const defAttr = definingRef?.attribute ?? 'INT';
  const defShort = definingRef?.name[lang] ?? prof.definingSkill[lang];
  const defFull = `${defShort} (${defAttr})`;
  const defDesc =
    definingRef?.description[lang] ??
    (lang === 'fr'
      ? `Capacité signature exclusive de la profession ${prof.name[lang]}.`
      : `Exclusive defining skill of the ${prof.name[lang]} profession.`);

  const magicPerks: string[] = [];
  if (prof.magicConfig) {
    const cfg = prof.magicConfig;
    if (cfg.autoBasicSigns) {
      magicPerks.push(
        lang === 'fr' ? '5 Signes de sorceleur (Base)' : '5 Basic Witcher Signs'
      );
    }
    if (cfg.spells) {
      magicPerks.push(
        lang === 'fr'
          ? `${cfg.spells} sorts de novice`
          : `${cfg.spells} Novice Spells`
      );
    }
    if (cfg.invocations) {
      magicPerks.push(
        lang === 'fr'
          ? `${cfg.invocations} invocations de novice`
          : `${cfg.invocations} Novice Invocations`
      );
    }
    if (cfg.rituals) {
      magicPerks.push(
        lang === 'fr'
          ? `${cfg.rituals} rituel(s) de novice`
          : `${cfg.rituals} Novice Ritual(s)`
      );
    }
    if (cfg.hexes) {
      magicPerks.push(
        lang === 'fr'
          ? `${cfg.hexes} envoûtement(s) peu dangereux`
          : `${cfg.hexes} Low-Danger Hex(es)`
      );
    }
    if (cfg.vampirePowers) {
      magicPerks.push(
        lang === 'fr'
          ? `${cfg.vampirePowers} sortilèges vampiriques de novice`
          : `${cfg.vampirePowers} Novice Vampiric Spells`
      );
    }
  }

  const skillsList = prof.fixedSkills.map((skId) => {
    const def = getSkillDefinition(skId);
    return `${def.name[lang]} (${formatSkillShortAttr(def.attribute, lang)})`;
  });
  if (prof.selectableCombatSlots) {
    for (let i = 0; i < prof.selectableCombatSlots.count; i += 1) {
      skillsList.push(
        lang === 'fr' ? 'Compétence de combat au choix' : 'Combat Skill of Choice'
      );
    }
  }
  if (prof.selectableCraftSlots) {
    skillsList.push(
      lang === 'fr' ? 'Artisanat / Compétence au choix' : 'Craft Skill of Choice'
    );
  }
  if (prof.selectableLanguageCount) {
    for (let i = 0; i < prof.selectableLanguageCount; i += 1) {
      skillsList.push(
        lang === 'fr' ? 'Langue supplémentaire (Int)' : 'Additional Language (Int)'
      );
    }
  }

  const gearList = starterKit
    ? starterKit.selectableItems.map((item) => item.name[lang])
    : [];
  const gearTitle = starterKit
    ? lang === 'fr'
      ? `${starterKit.pickLimit} équipements parmi`
      : `Starting Gear (Pick ${starterKit.pickLimit})`
    : lang === 'fr'
      ? 'Équipement de départ'
      : 'Starting Gear';

  // Group compendium talents (which are stored branch-by-branch: 3 per branch) into row-major 3x3
  const branchMap = new Map<string, ProfessionTreeTalentNode[]>();
  for (const t of talents) {
    const list = branchMap.get(t.branch) ?? [];
    list.push({ name: t.name, description: t.description });
    branchMap.set(t.branch, list);
  }
  const branchEntries = Array.from(branchMap.entries()).slice(0, 3);
  while (branchEntries.length < 3) {
    branchEntries.push([
      `${lang === 'fr' ? 'Branche' : 'Branch'} ${branchEntries.length + 1}`,
      [],
    ]);
  }
  const branches: [string, string, string] = [
    branchEntries[0][0],
    branchEntries[1][0],
    branchEntries[2][0],
  ];

  const rowMajorTalents: ProfessionTreeTalentNode[] = [];
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const node = branchEntries[col][1][row];
      rowMajorTalents.push(
        node ?? {
          name: `${lang === 'fr' ? 'Talent' : 'Talent'} ${col + 1}.${row + 1}`,
          description: '',
        }
      );
    }
  }

  // Extract up to 2 side sub-tables from TALENT_REFERENCE_EXTRAS for talents in this profession
  const sideTables: ProfessionTreeSideSubTable[] = [];
  for (const t of talents) {
    const extra = TALENT_REFERENCE_EXTRAS[t.id];
    if (!extra?.tables) continue;
    for (const tbl of extra.tables) {
      if (tbl.columns.length >= 2 && sideTables.length < 3) {
        sideTables.push({
          title: tbl.title[lang].toUpperCase(),
          headers: [tbl.columns[0][lang], tbl.columns[1][lang]],
          sections: [
            {
              rows: tbl.rows.slice(0, 10).map((r) => [r[0] ?? '', r[1] ?? '']),
            },
          ],
        });
      }
    }
  }

  return {
    overview: {
      lang,
      title: titleUpper,
      image: 'preset:grimoire',
      definingSkillTitle: defFull,
      definingSkillShort: defShort,
      definingSkillText: defDesc,
      quote:
        lang === 'fr'
          ? `« Sur le Continent, nul n’exerce le métier de ${prof.name[lang]} sans en payer le prix tôt ou tard. »`
          : `"Across the Continent, nobody walks the path of the ${prof.name[lang]} without paying its toll sooner or later."`,
      quoteAttribution:
        lang === 'fr' ? 'Chroniques du Continent' : 'Chronicles of the Continent',
      loreAttribution: 'Rodolf Kazmer',
      lore:
        lang === 'fr'
          ? `Rédigez ici le texte d’ambiance et le regard de terrain sur la profession ${prof.name[lang]} : sa place dans les royaumes du Nord, la manière dont les habitants l’accueillent et ses méthodes sur la route.\n\nPersonnalisez librement ces paragraphes, l’équipement de départ et les capacités pour adapter cette profession à votre campagne.`
          : `Write your lore overview and field notes for the ${prof.name[lang]} profession here—covering their role across the Northern Realms, how commonfolk react to them, and how they survive on the Continent.\n\nCustomize these paragraphs, starting equipment, and abilities freely for your campaign supplement.`,
      vigor: String(prof.vigorThreshold),
      magicPerks,
      skills: skillsList,
      gearTitle,
      gear: gearList,
      treasure: prof.startingTreasure?.[lang],
    },
    tree: {
      lang,
      title:
        lang === 'fr'
          ? `ARBRE DE COMPÉTENCE DE ${titleUpper}`
          : `${titleUpper} SKILL TREE`,
      definingSkillTitle: defFull.toUpperCase(),
      definingSkillDescription: defDesc,
      branches,
      talents: rowMajorTalents,
      sideTables,
    },
  };
}

export { PROFESSIONS_DATA };
