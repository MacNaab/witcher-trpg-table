import { PDFDocument } from 'pdf-lib';
import {
  ARMOR_DATA,
  COMPONENTS_DATA,
  DIAGRAMS_DATA,
  FORMULAE_DATA,
  POTIONS_DATA,
  WEAPONS_DATA,
} from '@/src/data/items';
import {
  ALL_MAGIC_ENTRIES,
  getMagicEntryById,
  getMagicalGiftById,
} from '@/src/data/magic';
import {
  FAMILY_FATES,
  FAMILY_STANDINGS,
  MAGE_AGES,
  MAGE_CURRENT_STATUS,
  MAGE_IMPORTANT_EVENTS,
  MENTORS_DATA,
  PARENTAL_FATES,
  REGIONS_DATA,
  WITCHER_AGES,
  WITCHER_CURRENT_STATUS,
  WITCHER_IMPORTANT_EVENTS,
  WITCHER_SCHOOLS,
} from '../data/lifepathData';
import {
  MAGE_ACADEMIA_EVENTS,
  MAGE_BIRTH_LOCATIONS,
  MAGE_DANGER_TABLES,
  MAGE_DISCOVERIES,
  MAGE_FAMILY_REACTIONS,
  MAGE_FAMILY_SIZES,
  MAGE_FAMILY_STATUSES,
  MAGE_MENTOR_ENDINGS,
  MAGE_MENTOR_PERSONALITIES,
  getChaosSchoolDefinition,
  resolveChaosSchoolId,
} from '../data/mageLifepathChaosData';
import {
  PRIMARY_STAT_KEYS,
  getProfessionDefinition,
  getRaceDefinition,
} from '../data/racesAndProfessions';
import { SKILLS_CATALOG, getSkillDefinition } from '../data/skillsCatalog';
import { PROFESSION_STARTER_KITS } from '../data/startingGearData';
import type {
  CharacterSheetState,
  ModuleLanguage,
  SkillId,
} from '../types';
import {
  calculateDerivedStats,
  getActiveProfessionSkills,
  getEffectiveSkillRank,
  getNativeLanguageSkillId,
  resolveLifepathTrack,
} from './characterCalculations';

const WEAPON_BY_ID = new Map(WEAPONS_DATA.map((w) => [w.id, w]));
const ARMOR_BY_ID = new Map(ARMOR_DATA.map((a) => [a.id, a]));
const FORMULA_BY_ID = new Map(FORMULAE_DATA.map((f) => [f.id, f]));
const DIAGRAM_BY_ID = new Map(DIAGRAMS_DATA.map((d) => [d.id, d]));
const COMPONENT_BY_ID = new Map(COMPONENTS_DATA.map((c) => [c.id, c]));

/**
 * Normalizes typography and replaces characters outside PDF WinAnsi encoding
 * so `pdf-lib` standard font rendering never fails on special glyphs.
 */
function sanitizeForPdf(value: string): string {
  return value
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/[’‘]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/…/g, '...')
    .replace(/•/g, '-')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/⌊/g, '')
    .replace(/⌋/g, '')
    .trim();
}

/**
 * Resolves concise Age and Origin strings for Page 1 header fields across all lifepath tracks.
 */
function resolveAgeAndOrigin(
  state: CharacterSheetState,
  lang: ModuleLanguage
): { age: string; origin: string } {
  const track = resolveLifepathTrack(state);

  if (track === 'custom') {
    return {
      age: state.customLifepath.age || '',
      origin: state.customLifepath.origin || '',
    };
  }

  if (track === 'witcher') {
    const w = state.witcherLifepath;
    const ageLabel =
      WITCHER_AGES.find((a) => a.id === w.ageTaken)?.label[lang] ?? '';
    const schoolLabel =
      WITCHER_SCHOOLS.find((s) => s.id === w.school)?.label[lang] ?? '';
    return { age: ageLabel, origin: schoolLabel };
  }

  if (track === 'mage') {
    const m = state.mageLifepath;
    const ageLabel =
      MAGE_AGES.find((a) => a.id === m.ageEntered)?.label[lang] ?? '';
    const schoolDef = getChaosSchoolDefinition(m.academy);
    return { age: ageLabel, origin: schoolDef.name[lang] };
  }

  const s = state.standardLifepath;
  const regionDef = REGIONS_DATA.find((r) => r.id === s.region);
  const originName =
    regionDef && s.originIndex !== null
      ? (regionDef.origins[s.originIndex]?.[lang] ?? '')
      : '';
  const ageStr = s.ageDecade
    ? `${s.ageDecade * 10} ${lang === 'fr' ? 'ans' : 'yrs'}`
    : '';
  return {
    age: ageStr,
    origin: originName,
  };
}

/**
 * Formats the full lifepath narrative and personal notes for Page 2's `Historique` field.
 */
function buildHistoriqueNarrative(
  state: CharacterSheetState,
  lang: ModuleLanguage,
  overflowNotes: string[]
): string {
  const lines: string[] = [];
  const isFr = lang === 'fr';
  const track = resolveLifepathTrack(state);

  if (state.playerName.trim()) {
    lines.push(`${isFr ? 'Joueur' : 'Player'} : ${state.playerName.trim()}`);
  }
  if (state.gender) {
    const gLabel =
      state.gender === 'male'
        ? isFr
          ? 'Homme'
          : 'Male'
        : isFr
          ? 'Femme'
          : 'Female';
    lines.push(`${isFr ? 'Genre' : 'Gender'} : ${gLabel}`);
  }

  if (track === 'custom') {
    if (state.customLifepath.origin) {
      lines.push(
        `${isFr ? 'Origine' : 'Origin'} : ${state.customLifepath.origin}`
      );
    }
    if (state.customLifepath.age) {
      lines.push(`${isFr ? 'Âge' : 'Age'} : ${state.customLifepath.age}`);
    }
    if (state.customLifepath.backstory.trim()) {
      lines.push('');
      lines.push(state.customLifepath.backstory.trim());
    }
  } else if (track === 'witcher') {
    const w = state.witcherLifepath;
    const schoolLabel =
      WITCHER_SCHOOLS.find((s) => s.id === w.school)?.label[lang] ?? '-';
    const ageLabel =
      WITCHER_AGES.find((a) => a.id === w.ageTaken)?.label[lang] ?? '-';
    lines.push(`${isFr ? 'École' : 'School'} : ${schoolLabel} (${ageLabel})`);
    if (w.earlyTrainingResult) {
      lines.push(
        `${isFr ? 'Entraînement' : 'Early Training'} : ${w.earlyTrainingResult}`
      );
    }
    if (w.trialResult) {
      lines.push(
        `${isFr ? 'Épreuve des Herbes' : 'Trial of the Grasses'} : ${w.trialResult}`
      );
    }
    if (w.importantEventIndex !== null) {
      lines.push(
        `${isFr ? 'Événement marquant' : 'Key Event'} : ${WITCHER_IMPORTANT_EVENTS[w.importantEventIndex]?.[lang] ?? ''}`
      );
    }
    if (w.currentStatusIndex !== null) {
      lines.push(
        `${isFr ? 'Situation actuelle' : 'Current Status'} : ${WITCHER_CURRENT_STATUS[w.currentStatusIndex]?.[lang] ?? ''}`
      );
    }
    w.decadeEvents.forEach((ev, idx) => {
      if (ev) {
        lines.push(
          `${isFr ? 'Décennie' : 'Decade'} ${idx + 1} : ${ev}`
        );
      }
    });
  } else if (track === 'mage') {
    const m = state.mageLifepath;
    const schoolDef = getChaosSchoolDefinition(m.academy);
    const schoolId = resolveChaosSchoolId(m.academy);
    const ageLabel =
      MAGE_AGES.find((a) => a.id === m.ageEntered)?.label[lang] ?? '-';
    lines.push(
      `${isFr ? 'Académie' : 'School'} : ${schoolDef.name[lang]} (${ageLabel}) - ${schoolDef.perkName[lang]}`
    );
    if (m.birthLocationIndex !== null && m.birthLocationIndex !== undefined) {
      const birthLoc = MAGE_BIRTH_LOCATIONS[m.birthLocationIndex]?.label[lang];
      if (birthLoc) {
        lines.push(`${isFr ? 'Naissance' : 'Birthplace'} : ${birthLoc}`);
      }
    }
    if (m.familySizeIndex !== null && m.familySizeIndex !== undefined) {
      const fSize = MAGE_FAMILY_SIZES[m.familySizeIndex]?.[lang] ?? '';
      const fStatus =
        m.familyStatusIndex !== null && m.familyStatusIndex !== undefined
          ? MAGE_FAMILY_STATUSES[m.familyStatusIndex]?.[lang] ?? ''
          : '';
      lines.push(
        `${isFr ? 'Famille' : 'Family'} : ${[fSize, fStatus].filter(Boolean).join(', ')}`
      );
    }
    if (m.discoveryIndex !== null && m.discoveryIndex !== undefined) {
      const disc = MAGE_DISCOVERIES[m.discoveryIndex]?.title[lang] ?? '';
      const rRegion =
        m.reactionRegion || (m.elderlandConclave ? 'elderlands' : 'north');
      const react =
        m.reactionIndex !== null && m.reactionIndex !== undefined
          ? MAGE_FAMILY_REACTIONS[rRegion]?.[m.reactionIndex]?.[lang] ?? ''
          : '';
      lines.push(
        `${isFr ? 'Découverte' : 'Discovery'} : ${disc}${react ? ` -> ${react}` : ''}`
      );
    }
    if (
      (m.academiaDecade1Index !== null && m.academiaDecade1Index !== undefined) ||
      (m.academiaDecade2Index !== null && m.academiaDecade2Index !== undefined)
    ) {
      const ac1 =
        m.academiaDecade1Index !== null && m.academiaDecade1Index !== undefined
          ? MAGE_ACADEMIA_EVENTS[schoolId][m.academiaDecade1Index]?.[lang]
          : '';
      const ac2 =
        m.academiaDecade2Index !== null && m.academiaDecade2Index !== undefined
          ? MAGE_ACADEMIA_EVENTS[schoolId][m.academiaDecade2Index]?.[lang]
          : '';
      lines.push(
        `${isFr ? 'Vie en académie' : 'Academia'} : ${[ac1, ac2].filter(Boolean).join(' | ')}`
      );
    } else if (m.trainingResult) {
      lines.push(`${isFr ? 'Formation' : 'Training'} : ${m.trainingResult}`);
    }
    if (m.wasApprentice) {
      const mPers =
        m.mentorPersonalityIndex !== null && m.mentorPersonalityIndex !== undefined
          ? MAGE_MENTOR_PERSONALITIES[m.mentorPersonalityIndex]?.[lang]
          : '';
      const mEnd =
        m.mentorEndingIndex !== null && m.mentorEndingIndex !== undefined
          ? MAGE_MENTOR_ENDINGS[m.mentorEndingIndex]?.[lang]
          : '';
      lines.push(
        `${isFr ? 'Apprentissage' : 'Apprenticeship'} : ${[mPers, mEnd].filter(Boolean).join(' - ') || (isFr ? 'Apprenti lié' : 'Leashed Apprentice')}`
      );
    }
    if (m.graduationResult) {
      lines.push(`${isFr ? 'Diplôme' : 'Graduation'} : ${m.graduationResult}`);
    }
    if (m.importantEventIndex !== null) {
      lines.push(
        `${isFr ? 'Événement marquant' : 'Key Event'} : ${MAGE_IMPORTANT_EVENTS[m.importantEventIndex]?.[lang] ?? ''}`
      );
    }
    if (m.currentStatusIndex !== null) {
      lines.push(
        `${isFr ? 'Situation actuelle' : 'Current Status'} : ${MAGE_CURRENT_STATUS[m.currentStatusIndex]?.[lang] ?? ''}`
      );
    }
    if (m.chaosDecades && m.chaosDecades.length > 0) {
      m.chaosDecades.forEach((dec, idx) => {
        const dTxt =
          dec.dangerTriggered &&
          dec.dangerIndex !== null &&
          dec.dangerIndex !== undefined
            ? MAGE_DANGER_TABLES[dec.style][dec.dangerIndex]?.[lang] ?? ''
            : '';
        lines.push(
          `${isFr ? 'Décennie' : 'Decade'} ${idx + 1} : ${dec.eventDetail || '-'}${dTxt ? ` | ${dTxt}` : ''}${dec.grudgeText ? ` | ${dec.grudgeText}` : ''}`
        );
      });
    } else {
      m.decadeEvents.forEach((ev, idx) => {
        if (ev) {
          lines.push(
            `${isFr ? 'Décennie' : 'Decade'} ${idx + 1} : ${ev}`
          );
        }
      });
    }
  } else {
    const s = state.standardLifepath;
    const regionDef = REGIONS_DATA.find((r) => r.id === s.region);
    if (regionDef) {
      const originName =
        s.originIndex !== null
          ? (regionDef.origins[s.originIndex]?.[lang] ?? '')
          : '';
      lines.push(
        `${isFr ? 'Origine' : 'Origin'} : ${originName} (${regionDef.name[lang]})`
      );
    }
    if (s.region && s.familyStatus === 'tragedy' && s.familyFateIndex !== null) {
      lines.push(
        `${isFr ? 'Destin familial' : 'Family Fate'} : ${FAMILY_FATES[s.region][s.familyFateIndex]?.[lang] ?? ''}`
      );
    } else if (s.familyStatus === 'alive') {
      lines.push(
        `${isFr ? 'Famille' : 'Family'} : ${isFr ? 'En vie et unie' : 'Alive & together'}`
      );
    }
    if (s.region && s.parentsStatus === 'dead' && s.parentalFateIndex !== null) {
      lines.push(
        `${isFr ? 'Destin des parents' : 'Parental Fate'} : ${PARENTAL_FATES[s.region][s.parentalFateIndex]?.[lang] ?? ''}`
      );
    }
    if (s.region && s.familyStandingIndex !== null) {
      lines.push(
        `${isFr ? 'Statut social' : 'Family Standing'} : ${FAMILY_STANDINGS[s.region][s.familyStandingIndex]?.[lang] ?? ''}`
      );
    }
    if (s.region && s.mentorIndex !== null) {
      lines.push(
        `${isFr ? 'Mentor' : 'Mentor'} : ${MENTORS_DATA[s.region][s.mentorIndex]?.[lang] ?? ''}`
      );
    }
    if (s.siblingsDetails.length > 0) {
      lines.push(
        `${isFr ? 'Fratrie' : 'Siblings'} (${s.siblingsDetails.length}) : ${s.siblingsDetails.join(' ; ')}`
      );
    }
    s.decadeEvents.forEach((ev, idx) => {
      if (ev) {
        lines.push(`${isFr ? 'Décennie' : 'Decade'} ${idx + 1} : ${ev}`);
      }
    });
  }

  if (state.personalDescription.trim()) {
    lines.push('');
    lines.push(
      `${isFr ? 'Description & Notes' : 'Description & Notes'} :\n${state.personalDescription.trim()}`
    );
  }

  if (overflowNotes.length > 0) {
    lines.push('');
    lines.push(
      `${isFr ? 'Éléments supplémentaires' : 'Additional Items'} :\n${overflowNotes.join('\n')}`
    );
  }

  return lines.join('\n');
}

/**
 * Matches a formula entry against POTIONS_DATA to retrieve its gameplay effect & duration.
 */
function findMatchingPotionForFormula(formulaId: string, nameFr: string) {
  const bySlug = POTIONS_DATA.find(
    (p) => p.id === formulaId.replace(/^fm-/, 'pt-')
  );
  if (bySlug) return bySlug;

  const lower = nameFr.trim().toLowerCase();
  return POTIONS_DATA.find((p) => p.name.fr.trim().toLowerCase() === lower);
}

/**
 * Fills the 5-page fillable `fiche_eric.pdf` template from the current `CharacterSheetState`
 * and returns serialized PDF bytes. Pure function testable outside the browser.
 */
export async function fillCharacterPdfBytes(
  templateBytes: ArrayBuffer | Uint8Array,
  state: CharacterSheetState,
  lang: ModuleLanguage
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();
  const isFr = lang === 'fr';

  const trySetText = (
    fieldName: string,
    rawValue: string | number | undefined | null
  ) => {
    if (rawValue === undefined || rawValue === null) return;
    const text = sanitizeForPdf(String(rawValue));
    if (!text) return;
    try {
      const field = form.getTextField(fieldName);
      try {
        field.setText(text);
      } catch {
        // Fallback: strip any exotic characters outside WinAnsi range
        field.setText(
          text.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '')
        );
      }
    } catch {
      // Field absent in PDF template; skip gracefully
    }
  };

  const race = state.raceId ? getRaceDefinition(state.raceId) : null;
  const profession = state.professionId
    ? getProfessionDefinition(state.professionId)
    : null;
  const derived = calculateDerivedStats(state);
  const { age, origin } = resolveAgeAndOrigin(state, lang);
  const overflowNotes: string[] = [];

  if (state.characterName.trim()) {
    pdfDoc.setTitle(sanitizeForPdf(state.characterName.trim()));
  }
  pdfDoc.setCreator('Witcher TRPG Companion');

  // --- Page 1: Identity & Racial Perks ---
  trySetText('Nom', state.characterName);
  trySetText('Race', race?.name[lang]);
  trySetText('Profession', profession?.name[lang]);
  trySetText('Age', age);
  trySetText('Origine', origin);
  if (race) {
    trySetText(
      'Particularités',
      race.perks.map((p) => p[lang]).join('\n')
    );
  }

  // --- Page 1: Primary & Derived Statistics ---
  for (const key of PRIMARY_STAT_KEYS) {
    trySetText(`${key} 1`, state.stats[key]);
  }
  trySetText('ETOU 1', derived.stun);
  trySetText('RUN 1', derived.run);
  trySetText('SAUT 1', derived.leap);
  trySetText('END 1', derived.stamina);
  trySetText('ENC 1', derived.encumbrance);
  trySetText('REC 1', derived.recovery);
  trySetText('PS', derived.hp);
  trySetText('SB', derived.recovery);
  trySetText('Vigueur', derived.vigor);
  trySetText('END', derived.stamina);

  // --- Page 1: Defining Skill, Profession Skills (1..10) & General Skills (1..14) ---
  if (profession) {
    trySetText('Compt Excl', profession.definingSkill[lang]);
    trySetText('Compt Excl N', state.definingSkillRank);
    trySetText('Compt Excl T', state.definingSkillRank);
  }

  const activeProfSkills = profession
    ? getActiveProfessionSkills(state, profession)
    : [];
  const activeProfSet = new Set<SkillId>(activeProfSkills);

  const profOverflowSkills: { id: SkillId; rank: number }[] = [];
  activeProfSkills.forEach((skillId, idx) => {
    const rank = getEffectiveSkillRank(state, skillId);
    if (idx < 10) {
      const slot = idx + 1;
      const def = getSkillDefinition(skillId);
      const statVal = state.stats[def.attribute] ?? 0;
      trySetText(`Compt Pro ${slot}`, def.name[lang]);
      trySetText(`Compt Pro ${slot} N`, rank);
      trySetText(`Compt Pro ${slot} C`, statVal);
      trySetText(`Compt Pro ${slot} T`, statVal + rank);
    } else if (rank > 0) {
      profOverflowSkills.push({ id: skillId, rank });
    }
  });

  const generalSkillEntries: { id: SkillId; rank: number; isNative: boolean }[] = [];
  const nativeLangId = getNativeLanguageSkillId(state);

  // Put overflow profession skills first, then native language, then general pickup skills > 0
  for (const ov of profOverflowSkills) {
    generalSkillEntries.push({ id: ov.id, rank: ov.rank, isNative: false });
  }
  for (const skill of SKILLS_CATALOG) {
    if (activeProfSet.has(skill.id)) continue;
    const rank = getEffectiveSkillRank(state, skill.id);
    if (rank > 0) {
      generalSkillEntries.push({
        id: skill.id,
        rank,
        isNative: nativeLangId === skill.id,
      });
    }
  }

  generalSkillEntries.forEach((entry, idx) => {
    const def = getSkillDefinition(entry.id);
    const statVal = state.stats[def.attribute] ?? 0;
    const label = entry.isNative
      ? `${def.name[lang]} (${isFr ? 'Natale' : 'Native'})`
      : def.name[lang];

    if (idx < 14) {
      const slot = idx + 1;
      trySetText(`Compt ${slot}`, label);
      trySetText(`Compt ${slot} N`, entry.rank);
      trySetText(`Compt ${slot} C`, statVal);
      trySetText(`Compt ${slot} T`, statVal + entry.rank);
    } else {
      overflowNotes.push(
        `- ${label}: ${entry.rank} (+${statVal} = ${statVal + entry.rank})`
      );
    }
  });

  // --- Pages 2, 3, 4: Equipment, Weapons, Armor, Shields, Components & Formulae ---
  interface NormalizedInventoryItem {
    name: string;
    category: string;
    quantity: number;
    catalogId?: string;
    rawLabelWithQty?: string;
  }

  const allItems: NormalizedInventoryItem[] = [];
  if (profession) {
    if (profession.startingTreasure) {
      allItems.push({
        name: `${isFr ? 'Trésor de départ' : 'Starting Treasure'} : ${profession.startingTreasure[lang]}`,
        category: 'gear',
        quantity: 1,
        rawLabelWithQty: `${isFr ? 'Trésor de départ' : 'Starting Treasure'} : ${profession.startingTreasure[lang]}`,
      });
    }
    const kit = PROFESSION_STARTER_KITS[profession.id];
    const selectedSet = new Set(state.selectedStarterGearIds);
    for (const item of [...kit.freeItems, ...kit.selectableItems]) {
      if (kit.freeItems.includes(item) || selectedSet.has(item.id)) {
        const rawName = item.name[lang];
        const qtyMatch = rawName.match(/\s*(?:\(|)\s*x(\d+)\s*(?:\)|)$/i);
        const qty = qtyMatch ? Number(qtyMatch[1]) : 1;
        const cleanName = qtyMatch
          ? rawName.replace(/\s*(?:\(|)\s*x\d+\s*(?:\)|)$/i, '').trim()
          : rawName;
        allItems.push({
          name: cleanName,
          category: item.category,
          quantity: qty,
          catalogId: item.catalogItemId,
          rawLabelWithQty: rawName,
        });
      }
    }
  }
  for (const custom of state.customInventory) {
    allItems.push({
      name: custom.name,
      category: custom.category,
      quantity: Math.max(1, custom.quantity ?? 1),
      catalogId: custom.catalogId,
      rawLabelWithQty:
        custom.quantity > 1 ? `${custom.name} x${custom.quantity}` : custom.name,
    });
  }

  let weaponSlot = 1;
  let armorSlot = 1;
  let shieldSlot = 1;
  let componentSlot = 1;
  let gearSlot = 1;
  let formulaSlot = 0;

  const pushGearSlot = (label: string) => {
    if (gearSlot <= 20) {
      trySetText(`Equipement ${gearSlot}`, label);
      gearSlot += 1;
    } else {
      overflowNotes.push(`- ${label}`);
    }
  };

  const pushFormulaEntry = (
    name: string,
    effectOrDuration: string,
    components: string,
    dc: string
  ) => {
    if (formulaSlot <= 10) {
      trySetText(`Formule N${formulaSlot}`, name);
      trySetText(`Formule D${formulaSlot}`, effectOrDuration);
      trySetText(`Formule C${formulaSlot}`, components);
      trySetText(`Formule SD${formulaSlot}`, dc);
      formulaSlot += 1;
    } else {
      overflowNotes.push(`- ${isFr ? 'Formule' : 'Formula'}: ${name} (SD ${dc})`);
    }
  };

  for (const item of allItems) {
    const weapon = item.catalogId ? WEAPON_BY_ID.get(item.catalogId) : undefined;
    const armor = item.catalogId ? ARMOR_BY_ID.get(item.catalogId) : undefined;
    const formula = item.catalogId ? FORMULA_BY_ID.get(item.catalogId) : undefined;
    const diagram = item.catalogId ? DIAGRAM_BY_ID.get(item.catalogId) : undefined;
    const component = item.catalogId
      ? COMPONENT_BY_ID.get(item.catalogId)
      : undefined;

    if ((item.category === 'weapon' || weapon) && weaponSlot <= 5) {
      trySetText(`Arme ${weaponSlot}`, item.rawLabelWithQty || item.name);
      if (weapon) {
        trySetText(`Arme ${weaponSlot} Pré`, weapon.accuracy);
        trySetText(`Arme ${weaponSlot} DMG`, weapon.damage);
        trySetText(`Arme ${weaponSlot} Type`, weapon.damageType);
        trySetText(`Arme ${weaponSlot} F`, weapon.reliability);
        trySetText(`Arme ${weaponSlot} Port`, weapon.range);
        trySetText(`Arme ${weaponSlot} Effet`, weapon.effect);
      }
      weaponSlot += 1;
      continue;
    }

    if ((item.category === 'shield' || armor?.isShield) && shieldSlot <= 2) {
      trySetText(`Bouclier ${shieldSlot}`, item.name);
      if (armor) {
        trySetText(`Bouclier ${shieldSlot} F`, armor.sp);
        trySetText(
          `Bouclier ${shieldSlot} DMG`,
          isFr ? 'Dégâts de coup de poing' : 'Punch damage'
        );
        trySetText(`Bouclier ${shieldSlot} VE`, armor.ev);
        trySetText(`Bouclier ${shieldSlot} Effet`, armor.effect);
      }
      shieldSlot += 1;
      continue;
    }

    if ((item.category === 'armor' || (armor && !armor.isShield)) && armorSlot <= 4) {
      trySetText(`Armure ${armorSlot}`, item.name);
      if (armor) {
        trySetText(`Armure ${armorSlot} PA`, armor.sp);
        trySetText(`Armure ${armorSlot} VE`, armor.ev);
        trySetText(`Armure ${armorSlot} Effet`, armor.effect);
      }
      armorSlot += 1;
      continue;
    }

    if (formula) {
      const potion = findMatchingPotionForFormula(formula.id, formula.name.fr);
      pushFormulaEntry(
        formula.name[lang],
        potion ? potion.effect : `${isFr ? 'Temps' : 'Time'}: ${formula.time}`,
        formula.components,
        formula.dc
      );
      continue;
    }

    if (diagram) {
      pushFormulaEntry(
        diagram.name[lang],
        `${isFr ? 'Temps' : 'Time'}: ${diagram.time}`,
        diagram.components,
        diagram.dc
      );
      continue;
    }

    if ((item.category === 'component' || component) && componentSlot <= 20) {
      trySetText(`Composant ${componentSlot}`, item.name);
      trySetText(`Composant ${componentSlot} Q`, String(item.quantity));
      componentSlot += 1;
      continue;
    }

    pushGearSlot(item.rawLabelWithQty || item.name);
  }

  // Witcher starting alchemy formulae
  const witcherFormulaIds = [
    state.witcherDecoctionFormulaId,
    ...state.witcherOilFormulaIds,
    ...state.witcherPotionFormulaIds,
  ].filter(Boolean);

  for (const fid of witcherFormulaIds) {
    const formula = FORMULA_BY_ID.get(fid);
    if (!formula) continue;
    const potion = findMatchingPotionForFormula(formula.id, formula.name.fr);
    pushFormulaEntry(
      formula.name[lang],
      potion ? potion.effect : `${isFr ? 'Temps' : 'Time'}: ${formula.time}`,
      formula.components,
      formula.dc
    );
  }

  // --- Page 5: Magic (Spells / Invocations / Hexes / Signs / Vampire Powers) & Rituals ---
  const basicSigns = profession?.magicConfig?.autoBasicSigns
    ? ALL_MAGIC_ENTRIES.filter((e) => e.schoolId === 'sign-basic')
    : [];

  const nonRitualMagicIds = [
    ...state.selectedSpells,
    ...state.selectedInvocations,
    ...state.selectedHexes,
    ...state.selectedVampirePowers,
  ];
  const nonRitualEntries = [
    ...basicSigns,
    ...nonRitualMagicIds
      .map((id) => getMagicEntryById(id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e)),
  ];

  const selectedGift = state.magicalGiftId
    ? getMagicalGiftById(state.magicalGiftId)
    : undefined;

  const nonRitualRows: Array<{
    name: string;
    stamina: string;
    range: string;
    duration: string;
    effect: string;
  }> = [
    ...(selectedGift
      ? [
          {
            name: `${selectedGift.name[lang]} (${isFr ? 'Don Magique' : 'Magical Gift'})`,
            stamina: selectedGift.stamina,
            range: '8m / Self',
            duration: selectedGift.castTime[lang],
            effect: `${selectedGift.effect[lang]} | ${isFr ? 'Effet sec.' : 'Side Effect'}: ${selectedGift.sideEffect[lang]}`,
          },
        ]
      : []),
    ...nonRitualEntries.map((entry) => ({
      name: entry.name[lang],
      stamina: entry.stamina,
      range: entry.range,
      duration: entry.duration,
      effect: entry.effect,
    })),
  ];

  nonRitualRows.forEach((entry, idx) => {
    if (idx <= 9) {
      trySetText(`Sort N${idx}`, entry.name);
      trySetText(`Sort C${idx}`, entry.stamina);
      trySetText(`Sort P${idx}`, entry.range);
      trySetText(`Sort D${idx}`, entry.duration);
      // Note: in `fiche_eric.pdf`, slot 9's effect field is named `Sort E` instead of `Sort E9`
      const effectFieldName = idx === 9 ? 'Sort E' : `Sort E${idx}`;
      trySetText(effectFieldName, entry.effect);
    } else {
      overflowNotes.push(
        `- ${entry.name} (${entry.stamina} END): ${entry.effect}`
      );
    }
  });

  const ritualEntries = state.selectedRituals
    .map((id) => getMagicEntryById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  ritualEntries.forEach((entry, idx) => {
    if (idx <= 5) {
      trySetText(`Rituel N${idx}`, entry.name[lang]);
      trySetText(`Rituel C${idx}`, entry.stamina);
      trySetText(`Rituel SD${idx}`, entry.dc ?? '-');
      trySetText(`Rituel D${idx}`, entry.duration);
      trySetText(`Rituel T${idx}`, entry.craftTime ?? '-');
      trySetText(`Rituel Comp${idx}`, entry.components ?? '-');
      trySetText(`Rituel E${idx}`, entry.effect);
    } else {
      overflowNotes.push(
        `- ${isFr ? 'Rituel' : 'Ritual'} ${entry.name[lang]}: ${entry.effect}`
      );
    }
  });

  // --- Page 2: Lifepath Narrative & Notes (filled last so any overflow items are included) ---
  trySetText(
    'Historique',
    buildHistoriqueNarrative(state, lang, overflowNotes)
  );

  return pdfDoc.save();
}

/**
 * Fetches the bundled `fiche_eric.pdf` template, fills it with the character sheet data,
 * and triggers a browser file download. Returns the downloaded filename.
 */
export async function downloadFilledCharacterPdf(
  state: CharacterSheetState,
  lang: ModuleLanguage
): Promise<string> {
  const { default: ficheEricPdfUrl } = await import('../fiche_eric.pdf?url');
  const response = await fetch(ficheEricPdfUrl);
  if (!response.ok) {
    throw new Error(`Unable to fetch PDF template (${response.status})`);
  }
  const templateBytes = await response.arrayBuffer();
  const filledBytes = await fillCharacterPdfBytes(templateBytes, state, lang);

  const rawSlug = (state.characterName || 'witcher-character')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `${rawSlug || 'witcher-character'}.pdf`;

  const blobBuffer = new Uint8Array(filledBytes).buffer;
  const blob = new Blob([blobBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);

  return filename;
}
