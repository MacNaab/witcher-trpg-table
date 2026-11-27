import type { LocalizedText } from '@/src/data/bestiary/types';
import type {
  MageAcademyId,
  MageDecadeEventOutcomeId,
  MageDecadeStyleId,
  RegionId,
} from '../types';

/**
 * Complete bilingual Mage Lifepath tables from A Tome of Chaos (pp. 18–31).
 */

export const MAGE_BIRTH_LOCATIONS: readonly {
  roll: number;
  regionId: RegionId;
  label: LocalizedText;
}[] = [
  {
    roll: 1,
    regionId: 'north',
    label: {
      en: 'The Northern Realms (Kovir & Poviss or The Hengfors League)',
      fr: 'Royaumes du Nord (Kovir et Poviss ou Ligue d’Hengfors)',
    },
  },
  {
    roll: 2,
    regionId: 'north',
    label: {
      en: 'The Northern Realms (Redania or Kaedwen)',
      fr: 'Royaumes du Nord (Rédanie ou Kaedwen)',
    },
  },
  {
    roll: 3,
    regionId: 'north',
    label: {
      en: 'The Northern Realms (Aedirn, Lyria & Rivia, or Temeria)',
      fr: 'Royaumes du Nord (Aedirn, Lyrie et Rivie ou Témérie)',
    },
  },
  {
    roll: 4,
    regionId: 'north',
    label: {
      en: 'The Northern Realms (Cidaris, Kerack, or Verden)',
      fr: 'Royaumes du Nord (Cidaris, Kerack ou Verden)',
    },
  },
  {
    roll: 5,
    regionId: 'north',
    label: {
      en: 'Skellige',
      fr: 'Skellige',
    },
  },
  {
    roll: 6,
    regionId: 'nilfgaard',
    label: {
      en: 'Nilfgaard (Cintra, Angren, or Nazair)',
      fr: 'Nilfgaard (Cintra, Angren ou Nazair)',
    },
  },
  {
    roll: 7,
    regionId: 'nilfgaard',
    label: {
      en: 'Nilfgaard (Metinna, Toussaint, or Mag Turga)',
      fr: 'Nilfgaard (Metinna, Toussaint ou Mag Turga)',
    },
  },
  {
    roll: 8,
    regionId: 'nilfgaard',
    label: {
      en: 'Nilfgaard (Gheso, Ebbing, or Maecht)',
      fr: 'Nilfgaard (Geso, Ebbing ou Maecht)',
    },
  },
  {
    roll: 9,
    regionId: 'nilfgaard',
    label: {
      en: 'Nilfgaard (Etolia, Gemmera, or Vicovaro)',
      fr: 'Nilfgaard (Étolie, Gemmery ou Vicovaro)',
    },
  },
  {
    roll: 10,
    regionId: 'nilfgaard',
    label: {
      en: 'Nilfgaard (The Heart of Nilfgaard)',
      fr: 'Nilfgaard (Cœur de l’Empire)',
    },
  },
];

export const MAGE_ELDERLAND_BIRTH_NOTE: LocalizedText = {
  en: 'Born in Dol Blathanna or an Elderfolk mountain conclave.',
  fr: 'Né à Dol Blathanna ou dans une enclave montagnarde des Races anciennes.',
};

export const MAGE_FAMILY_SIZES: readonly LocalizedText[] = [
  { en: 'Tiny', fr: 'Minuscule' },
  { en: 'Small', fr: 'Petite' },
  { en: 'Small', fr: 'Petite' },
  { en: 'Medium', fr: 'Moyenne' },
  { en: 'Medium', fr: 'Moyenne' },
  { en: 'Medium', fr: 'Moyenne' },
  { en: 'Medium', fr: 'Moyenne' },
  { en: 'Large', fr: 'Grande' },
  { en: 'Large', fr: 'Grande' },
  { en: 'Huge', fr: 'Immense' },
];

export const MAGE_FAMILY_PERSONALITIES: readonly LocalizedText[] = [
  { en: 'Conservative', fr: 'Conservatrice' },
  { en: 'Aggressive', fr: 'Agressive' },
  { en: 'Strange', fr: 'Étrange' },
  { en: 'Kind', fr: 'Bienveillante' },
  { en: 'Depressive', fr: 'Dépressive' },
  { en: 'Stern', fr: 'Sévère' },
  { en: 'Immature', fr: 'Immature' },
  { en: 'Supportive', fr: 'Solidaire' },
  { en: 'Tight Knit', fr: 'Très soudée' },
  { en: 'Calm', fr: 'Calme' },
];

export const MAGE_FAMILY_STATUSES: readonly LocalizedText[] = [
  { en: 'Aristocracy', fr: 'Aristocratie' },
  { en: 'Artisans', fr: 'Artisans' },
  { en: 'Knights', fr: 'Chevaliers' },
  { en: 'Merchants', fr: 'Marchands' },
  { en: 'Peasants', fr: 'Paysans' },
  { en: 'Slaves or Prisoners', fr: 'Esclaves ou prisonniers' },
  { en: 'Priests', fr: 'Prêtres' },
  { en: 'Mages', fr: 'Mages' },
  { en: 'Entertainers', fr: 'Artistes / Bateleurs' },
  { en: 'Academics', fr: 'Érudits / Universitaires' },
];

export interface MageDiscoveryEntry {
  title: LocalizedText;
  nextRollMod: number;
  description: LocalizedText;
}

export const MAGE_DISCOVERIES: readonly MageDiscoveryEntry[] = [
  {
    title: { en: 'Catastrophe', fr: 'Catastrophe' },
    nextRollMod: -3,
    description: {
      en: '(-3 on next Lifepath roll) Uncontrolled Chaos triggered a disaster in childhood (fire, sinkhole, or frost).',
      fr: '(–3 au prochain jet d’historique) Vos émotions ont déclenché un désastre magique dans votre enfance (incendie, effondrement ou gel mortel).',
    },
  },
  {
    title: { en: 'Accidental Curse', fr: 'Malédiction accidentelle' },
    nextRollMod: -2,
    description: {
      en: '(-2 on next Lifepath roll) Hatred during childhood unleashed an involuntary curse upon someone.',
      fr: '(–2 au prochain jet d’historique) Dans un accès de haine enfantine, vous avez involontairement maudit quelqu’un.',
    },
  },
  {
    title: { en: 'Discovered by a Mage', fr: 'Repéré par un mage' },
    nextRollMod: 0,
    description: {
      en: 'A visiting mage sensed your Chaos talent and convinced your parents you needed formal training.',
      fr: 'Un mage de passage a détecté votre don et convaincu vos parents qu’une formation était indispensable.',
    },
  },
  {
    title: { en: 'Inspired by a Mage', fr: 'Inspiré par un mage' },
    nextRollMod: 0,
    description: {
      en: 'After watching a traveling mage perform wonders, you imitated them and awakened your gift.',
      fr: 'En imitant les prodiges d’un mage itinérant, vous avez découvert que vous possédiez vous aussi le don.',
    },
  },
  {
    title: { en: 'Terrifying Magical Development', fr: 'Éveil magique terrifiant' },
    nextRollMod: 0,
    description: {
      en: 'A small magical burst occurred while playing, frightening you deeply about your uncontrollable gift.',
      fr: 'Un petit effet magique survenu pendant un jeu vous a profondément effrayé quant à la nature de votre don.',
    },
  },
  {
    title: { en: 'Joyous Magical Development', fr: 'Éveil magique joyeux' },
    nextRollMod: 0,
    description: {
      en: 'You figured out how to produce minor wonders and eagerly showed them off to family and friends.',
      fr: 'Vous avez appris à produire de petits prodiges et vous êtes empressé de les montrer à vos proches.',
    },
  },
  {
    title: { en: 'Press-ganged by a Mage', fr: 'Enrôlé de force par un mage' },
    nextRollMod: 0,
    description: {
      en: 'A mage intimidated your family or abducted you outright to force you into magical training.',
      fr: 'Un mage a intimidé votre famille ou vous a enlevé pour vous former contre votre gré.',
    },
  },
  {
    title: { en: 'Bought by a Mage', fr: 'Acheté par un mage' },
    nextRollMod: 0,
    description: {
      en: 'A traveling mage noticed your potential and paid your parents to take you as an apprentice.',
      fr: 'Un mage itinérant a repéré votre potentiel et négocié votre rachat auprès de vos parents.',
    },
  },
  {
    title: { en: 'Grudge-born Curse', fr: 'Malédiction née d’une rancune' },
    nextRollMod: -2,
    description: {
      en: '(-2 on next Lifepath roll) A festering grudge in your hometown drew Chaos into a terrible curse.',
      fr: '(–2 au prochain jet d’historique) Une rancune tenace a attiré le Chaos pour frapper une cible d’une terrible malédiction.',
    },
  },
  {
    title: { en: 'Catastrophe (Self-Taught)', fr: 'Catastrophe (Autodidacte)' },
    nextRollMod: -3,
    description: {
      en: '(-3 on next Lifepath roll) Secretly studying magic on your own inevitably backfired into a major disaster.',
      fr: '(–3 au prochain jet d’historique) En tentant d’étudier la magie en secret par vous-même, tout a dégénéré en catastrophe.',
    },
  },
];

export const MAGE_FAMILY_REACTIONS: Record<RegionId, readonly LocalizedText[]> = {
  north: [
    { en: '1 — Your family cast you out.', fr: '1 — Votre famille vous a renié et chassé.' },
    { en: '2 — Your family became terribly scared of you.', fr: '2 — Votre famille a pris terriblement peur de vous.' },
    { en: '3 — Your family tried to sell you to a family of high standing.', fr: '3 — Votre famille a tenté de vous vendre à une maison noble.' },
    { en: '4 — Your family immediately sent you to Aretuza or Ban Ard.', fr: '4 — Votre famille vous a immédiatement envoyé à Aretuza ou Ban Ard.' },
    { en: '5 — Your family tried to ignore your gift.', fr: '5 — Votre famille a tenté d’ignorer votre don.' },
    { en: '6 — Your family and friends celebrated your talent.', fr: '6 — Votre famille et vos amis ont célébré votre talent.' },
  ],
  elderlands: [
    { en: '1 — Your family cast you out.', fr: '1 — Votre famille vous a renié et chassé.' },
    { en: '2 — Your family tried to ignore your gift.', fr: '2 — Votre famille a tenté d’ignorer votre don.' },
    { en: '3 — Your family sent you to train immediately.', fr: '3 — Votre famille vous a immédiatement envoyé en formation.' },
    { en: '4 — Your family sent you to train immediately.', fr: '4 — Votre famille vous a immédiatement envoyé en formation.' },
    { en: '5 — Your family pushed you to become a great mage.', fr: '5 — Votre famille vous a poussé à devenir un grand mage.' },
    { en: '6 — Your family and friends celebrated your talent.', fr: '6 — Votre famille et vos amis ont célébré votre talent.' },
  ],
  nilfgaard: [
    { en: '1 — Your family cast you out.', fr: '1 — Votre famille vous a renié et chassé.' },
    { en: '2 — Your family sent you to the church.', fr: '2 — Votre famille vous a confié à l’Église.' },
    { en: '3 — Your family immediately sent you to Gweison Haul.', fr: '3 — Votre famille vous a immédiatement envoyé à Gweison Haul.' },
    { en: '4 — Your family pushed you to study magic and get into politics.', fr: '4 — Votre famille vous a poussé vers la magie et la politique.' },
    { en: '5 — Your family tried to use your power for themselves.', fr: '5 — Votre famille a tenté d’exploiter votre pouvoir à son profit.' },
    { en: '6 — Your family and friends celebrated your talent.', fr: '6 — Votre famille et vos amis ont célébré votre talent.' },
  ],
};

export interface MageChaosSchoolDefinition {
  id: Extract<MageAcademyId, 'aretuza' | 'ban-ard' | 'gweison-haul' | 'minor-academia'>;
  name: LocalizedText;
  perkName: LocalizedText;
  perkEffect: LocalizedText;
  apprenticeMinRoll1d6: number; // Roll this or higher on 1d6 => was an apprentice
  summaryDescription: LocalizedText;
}

export const MAGE_CHAOS_SCHOOLS: readonly MageChaosSchoolDefinition[] = [
  {
    id: 'aretuza',
    name: { en: 'Aretuza', fr: 'Aretuza' },
    perkName: { en: 'Wellspring', fr: 'Source inépuisable (Wellspring)' },
    perkEffect: {
      en: 'Spend 10 extra STA on your turn to raise your Vigor Threshold by +2 for that turn (stacks with Focus items).',
      fr: 'En dépensant 10 END supplémentaires pendant votre tour, vous augmentez votre Seuil de Vigueur de +2 pour la durée de ce tour (cumulable avec les objets Focus).',
    },
    apprenticeMinRoll1d6: 4,
    summaryDescription: {
      en: 'Isle of Thanedd academy: rigorous arcane theory, courtly politics, and the Wellspring school perk.',
      fr: 'Académie de l’île de Thanedd : théorie arcanique rigoureuse, intrigues de cour et don d’école Source inépuisable.',
    },
  },
  {
    id: 'ban-ard',
    name: { en: 'Ban Ard', fr: 'Ban Ard' },
    perkName: { en: 'Controlled Collateral', fr: 'Dommages maîtrisés (Controlled Collateral)' },
    perkEffect: {
      en: 'When suffering a Magical Fumble, sacrifice 10 STA to reduce the fumbled amount by 5 (minimum 1).',
      fr: 'Lors d’un échec critique magique, vous pouvez sacrifier 10 END pour réduire de 5 le résultat du tableau d’incident (minimum 1).',
    },
    apprenticeMinRoll1d6: 5,
    summaryDescription: {
      en: 'Kaedweni male academy: practical battle magic, internships, and Controlled Collateral.',
      fr: 'Académie de Kaedwen : magie pratique et martiale, contrats et don d’école Dommages maîtrisés.',
    },
  },
  {
    id: 'gweison-haul',
    name: {
      en: 'Gweison Haul / Imperial Magic Academy',
      fr: 'Gweison Haul / Académie Impériale de Magie',
    },
    perkName: { en: 'Tolerance', fr: 'Tolérance (Tolerance)' },
    perkEffect: {
      en: 'Spend 10 STA when touching dimeritium to gain +3 to Endurance checks to resist its effects.',
      fr: 'Au contact du diméritium, dépensez 10 END pour obtenir +3 à votre jet de Résilience afin d’en résister aux effets.',
    },
    apprenticeMinRoll1d6: 3,
    summaryDescription: {
      en: 'Nilfgaardian state schools: Imperial discipline, mage hunters patrol, and dimeritium Tolerance.',
      fr: 'Écoles d’État nilfgaardiennes : discipline impériale, surveillance des chasseurs et don d’école Tolérance.',
    },
  },
  {
    id: 'minor-academia',
    name: {
      en: 'Minor Academia (Independent / Elderlands)',
      fr: 'Académie mineure (Mentor indépendant / Terres Anciennes)',
    },
    perkName: { en: 'Versatile Caster', fr: 'Lanceur polyvalent (Versatile Caster)' },
    perkEffect: {
      en: 'Spend 10 extra STA when casting to add +4m range OR +2 Rounds duration to a Non-Active spell.',
      fr: 'En dépensant 10 END supplémentaires lors d’une incantation, ajoutez +4 m de portée OU +2 rounds de durée à un sort non actif.',
    },
    apprenticeMinRoll1d6: 1,
    summaryDescription: {
      en: 'Unaffiliated mentors or Elderfolk tutors outside Conclave walls; grants Versatile Caster.',
      fr: 'Mentors indépendants ou précepteurs des Races anciennes hors des grandes académies ; octroie Lanceur polyvalent.',
    },
  },
];

/**
 * Normalizes legacy MageAcademyId ('nilfgaard', 'druid-circle') to Tome of Chaos 4 school columns.
 */
export function resolveChaosSchoolId(
  academy?: MageAcademyId | ''
): MageChaosSchoolDefinition['id'] {
  if (academy === 'aretuza' || academy === 'ban-ard' || academy === 'gweison-haul' || academy === 'minor-academia') {
    return academy;
  }
  if (academy === 'nilfgaard') return 'gweison-haul';
  return 'minor-academia';
}

export function getChaosSchoolDefinition(
  academy?: MageAcademyId | ''
): MageChaosSchoolDefinition {
  const id = resolveChaosSchoolId(academy);
  return MAGE_CHAOS_SCHOOLS.find((s) => s.id === id) ?? MAGE_CHAOS_SCHOOLS[0];
}

export const MAGE_ACADEMIA_EVENTS: Record<
  MageChaosSchoolDefinition['id'],
  readonly LocalizedText[]
> = {
  aretuza: [
    {
      en: '1. Spell Backfired — Lower your Vigor Threshold by 1.',
      fr: '1. Retour de sort — Un sort a horriblement mal tourné. Réduisez votre Seuil de Vigueur de 1.',
    },
    {
      en: '2. Bond with Another Student — Gain a Mage Ally (roll on Allies table).',
      fr: '2. Lien avec une autre élève — Vous gagnez une Alliée mage (utilisez la table des Alliés).',
    },
    {
      en: '3. Got a Rival Expelled — Gain a Mage Enemy (roll on Grudges table).',
      fr: '3. Rivale renvoyée — Vous avez fait expulser une rivale d’Aretuza. Ennemie mage (table des Rancunes).',
    },
    {
      en: '4. Teacher’s Pet — Start with 1 extra known Novice spell.',
      fr: '4. Chouchou d’un professeur — Vous commencez avec 1 sort de Novice supplémentaire.',
    },
    {
      en: '5. Impressed a Foreign Dignitary — +2 Reputation at the court of one kingdom of your choice.',
      fr: '5. Dignitaire étranger impressionné — +2 Réputation à la cour d’un royaume de votre choix.',
    },
    {
      en: '6. Miscast — Ruined a faculty or student’s day. Roll on Grudges table.',
      fr: '6. Incantation ratée — Un sort accidentel a gâché la journée d’un membre de l’école (table des Rancunes).',
    },
    {
      en: '7. Found Blackmail Material on a Teacher — Force 1 favor out of them (GM discretion).',
      fr: '7. Chantage sur un professeur — Vous détenez de quoi exiger une faveur unique (accord du MJ).',
    },
    {
      en: '8. Found Clues on a Relic — Consult with the GM on the Relic and what you know.',
      fr: '8. Indices sur une relique — Déterminez avec le MJ quelle relique et ce que vous savez d’elle.',
    },
    {
      en: '9. Sent into the World — Leashed to a mage outside Aretuza, made an apprentice, +1 regular Life Event.',
      fr: '9. Envoyé dans le monde — Lié à un mage hors d’Aretuza comme apprenti + 1 événement de vie courant.',
    },
    {
      en: '10. Cursed — Work with the GM to pick an appropriate curse (Core Book p. 230).',
      fr: '10. Maudit — Choisissez avec le MJ une malédiction adaptée (Livre de base p. 230).',
    },
  ],
  'ban-ard': [
    {
      en: '1. Spell Backfired — Lower your Vigor Threshold by 1.',
      fr: '1. Retour de sort — Un sort a horriblement mal tourné. Réduisez votre Seuil de Vigueur de 1.',
    },
    {
      en: '2. Caught Smuggling — Smuggled tomes out and got caught; made an apprentice.',
      fr: '2. Pris en flagrant délit de contrebande — Vous avez été pris à sortir des grimoires : placé en apprentissage.',
    },
    {
      en: '3. Stole a Spell Scroll — Start with a Journeyman spell scroll (choose with GM).',
      fr: '3. Parchemin de sort dérobé — Vous commencez avec un parchemin de sort de Compagnon (avec le MJ).',
    },
    {
      en: '4. Unsanctioned Research — Roll once on the Knowledge table; exposure risks trouble with Ban Ard alumni.',
      fr: '4. Recherches non autorisées — Tirez 1 résultat sur la table Savoir (dangereux si révélé aux anciens de Ban Ard).',
    },
    {
      en: '5. Hunted a Monster — Hunted in Kaedwen’s forests. Gain +1 Monster Lore.',
      fr: '5. Chasse au monstre — Vous avez traqué un monstre en Kaedwen. +1 en Connaissance des monstres.',
    },
    {
      en: '6. Stole Ritual Components — Start with +100 crowns of rare ritual components.',
      fr: '6. Composants rituels détournés — Vous commencez avec +100 couronnes de composants rituels.',
    },
    {
      en: '7. Mercenary Work — Fought in a land dispute (after school’s cut): gain 1d6 × 100 crowns.',
      fr: '7. Travail mercenaire — Après la part de l’académie, vous conservez 1d6 × 100 couronnes.',
    },
    {
      en: '8. Cursed — Work with the GM to pick an appropriate curse (Core Book p. 230).',
      fr: '8. Maudit — Choisissez avec le MJ une malédiction adaptée (Livre de base p. 230).',
    },
    {
      en: '9. Secret Society Initiation — +2 Reputation with Ban Ard alumni.',
      fr: '9. Initiation à une société secrète — +2 Réputation auprès des anciens élèves de Ban Ard.',
    },
    {
      en: '10. Translated a Tome — Translated an old elven tome. Gain +2 to Elder Speech.',
      fr: '10. Traduction d’un grimoire — Vous avez traduit un vieux tome elfique. +2 en Langue ancienne.',
    },
  ],
  'gweison-haul': [
    {
      en: '1. Spell Backfired — Lower your Vigor Threshold by 1.',
      fr: '1. Retour de sort — Un sort a horriblement mal tourné. Réduisez votre Seuil de Vigueur de 1.',
    },
    {
      en: '2. Rule-Breaker — Caught breaking Gweison Haul’s rules; made an apprentice.',
      fr: '2. Briseur de règles — Pris en infraction à Gweison Haul : placé en apprentissage forcé.',
    },
    {
      en: '3. Weapons of War — Helped Imperial projects. Start with 1 bomb formula (choose with GM).',
      fr: '3. Armes de guerre impériales — Vous commencez avec 1 formule de bombe (avec le MJ).',
    },
    {
      en: '4. Law Bringer — Helped authorities on a magic crime. +2 Reputation with Nilfgaardian authorities.',
      fr: '4. Auxiliaire de justice — +2 Réputation auprès des autorités nilfgaardiennes.',
    },
    {
      en: '5. Explored the Catacombs — Found a Journeyman spell scroll in the school catacombs.',
      fr: '5. Catacombes explorées — Vous avez trouvé 1 parchemin de sort de Compagnon dans les sous-sols.',
    },
    {
      en: '6. Censorship — Erased a banned work; its author seeks revenge (roll on Grudges table).',
      fr: '6. Censure — Vous avez détruit un ouvrage interdit ; son auteur réclame vengeance (table des Rancunes).',
    },
    {
      en: '7. Hunt a Renegade Mage — Assisted Mage Hunters. +1 to any combat skill or start a new one at +2.',
      fr: '7. Chasse au mage renégat — +1 dans une compétence de combat existante (ou une nouvelle au rang 2).',
    },
    {
      en: '8. Harbored a Renegade Mage — Gain a Mage Ally (roll on Allies table).',
      fr: '8. Refuge pour un renégat — Vous avez caché un mage recherché : vous gagnez un Allié mage (table Alliés).',
    },
    {
      en: '9. Church Liaison — Worked with Church of the Great Sun. +1 Charisma & +1 Social Etiquette.',
      fr: '9. Liaison avec l’Église du Grand Soleil — +1 en Charisme et +1 en Étiquette.',
    },
    {
      en: '10. Better Part of Valor — Trained in spycraft. +1 Disguise & no penalty disguising without a kit.',
      fr: '10. Formation d’espionnage — +1 en Déguisement et aucun malus pour vous déguiser sans trousse.',
    },
  ],
  'minor-academia': [
    {
      en: '1. Spell Backfired — Lower your Vigor Threshold by 1.',
      fr: '1. Retour de sort — Un sort a horriblement mal tourné. Réduisez votre Seuil de Vigueur de 1.',
    },
    {
      en: '2. Dabbled in Dark Magic — Unleashed a demon; you bear its lucifuge and it always knows where you are.',
      fr: '2. Touche à la magie noire — Un démon déchaîné a gravé sur vous son lucifuge et connaît votre position.',
    },
    {
      en: '3. Witcher Target — A Cat School witcher was hired to kill you after collateral damage and still hunts you.',
      fr: '3. Cible d’un sorceleur — Un sorceleur de l’École du Chat a été engagé pour vous abattre et vous traque.',
    },
    {
      en: '4. Apothecary — Treated local ailments for your community. Gain +2 to First Aid.',
      fr: '4. Apothicaire — Vous avez soigné les maux locaux. +2 en Premiers soins.',
    },
    {
      en: '5. Botanist — Tended your mentor’s herb garden. Gain +2 to Wilderness Survival.',
      fr: '5. Botaniste — Vous entreteniez les jardins d’herbes. +2 en Survie.',
    },
    {
      en: '6. Helped Locals — Your Social Standing is Equal in a region you helped (choose with GM).',
      fr: '6. Bienfaiteur local — Votre Statut social est considéré Neutre dans une région aidée (avec le MJ).',
    },
    {
      en: '7. Cursed — Work with the GM to pick an appropriate curse (Core Book p. 230).',
      fr: '7. Maudit — Choisissez avec le MJ une malédiction adaptée (Livre de base p. 230).',
    },
    {
      en: '8. Defended a Village — Repelled a monster attack with magic. Gain +1 Monster Lore.',
      fr: '8. Défense d’un village — +1 en Connaissance des monstres.',
    },
    {
      en: '9. Extracurricular Learning — Studied under many mentors. Start with 1 extra Novice spell.',
      fr: '9. Enseignements multiples — Vous commencez avec 1 sort de Novice supplémentaire.',
    },
    {
      en: '10. Crafted Your Own Focus — Gain an Amulet counting as a Focus (2) item.',
      fr: '10. Création de votre Focus — Vous possédez une amulette comptant comme un Focus (2).',
    },
  ],
};

export const MAGE_MENTOR_PERSONALITIES: readonly LocalizedText[] = [
  { en: 'Secretive', fr: 'Secret' },
  { en: 'Rebellious', fr: 'Rebelle' },
  { en: 'Violent', fr: 'Violent' },
  { en: 'Idealistic', fr: 'Idéaliste' },
  { en: 'Contemplative', fr: 'Contemplatif' },
  { en: 'Stern', fr: 'Sévère' },
  { en: 'Deceptive', fr: 'Menteur / Trompeur' },
  { en: 'Friendly', fr: 'Amical' },
  { en: 'Arrogant', fr: 'Arrogant' },
  { en: 'Nervous', fr: 'Nerveux' },
];

export const MAGE_MENTOR_VALUES: readonly LocalizedText[] = [
  { en: 'Money', fr: 'L’argent' },
  { en: 'Honor', fr: 'L’honneur' },
  { en: 'Their Word', fr: 'Sa parole' },
  { en: 'Hedonistic Pursuits', fr: 'Les plaisirs hédonistes' },
  { en: 'Knowledge', fr: 'La connaissance' },
  { en: 'Vengeance', fr: 'La vengeance' },
  { en: 'Power', fr: 'Le pouvoir' },
  { en: 'Love', fr: 'L’amour' },
  { en: 'Survival', fr: 'La survie' },
  { en: 'Friendship', fr: 'L’amitié' },
];

export const MAGE_MENTOR_CLOTHING: readonly LocalizedText[] = [
  { en: 'Utilitarian', fr: 'Utilitaire' },
  { en: 'Ostentatious', fr: 'Ostentatoire' },
  { en: 'Severe', fr: 'Austère / Sévère' },
  { en: 'Militaristic', fr: 'Militaire' },
  { en: 'Traditional', fr: 'Traditionnel' },
  { en: 'Comfortable', fr: 'Confortable' },
  { en: 'Ragged', fr: 'Dépenaillé' },
  { en: 'Unusual', fr: 'Inhabituel' },
  { en: 'Charming', fr: 'Élégant / Charmant' },
  { en: 'Foreign', fr: 'Étranger' },
];

export const MAGE_MENTOR_HATREDS: readonly LocalizedText[] = [
  { en: 'Arrogance', fr: 'L’arrogance' },
  { en: 'Politics', fr: 'La politique' },
  { en: 'Other Races', fr: 'Les autres races' },
  { en: 'Mundane People', fr: 'Les gens ordinaires' },
  { en: 'Violence', fr: 'La violence' },
  { en: 'Disrespect', fr: 'Le manque de respect' },
  { en: 'Young People', fr: 'Les jeunes' },
  { en: 'Adversity', fr: 'L’adversité' },
  { en: 'Criminals', fr: 'Les criminels' },
  { en: 'Disorganization', fr: 'La désorganisation' },
];

export const MAGE_MENTOR_TEACHING_STYLES: readonly LocalizedText[] = [
  { en: 'Hands On', fr: 'Pratique / Sur le terrain' },
  { en: 'Patient', fr: 'Patient' },
  { en: 'Demonstrating', fr: 'Par la démonstration' },
  { en: 'Neglectful', fr: 'Négligent' },
  { en: 'Overbearing', fr: 'Autoritaire / Étouffant' },
  { en: 'Manipulative', fr: 'Manipulateur' },
];

export const MAGE_MENTOR_MOMENTS: readonly LocalizedText[] = [
  { en: 'You shared a touching moment', fr: 'Vous avez partagé un moment touchant' },
  { en: 'They used you to achieve a goal', fr: 'Il/elle vous a utilisé pour atteindre un objectif' },
  { en: 'They abused you in some way', fr: 'Il/elle a abusé de son autorité sur vous' },
  { en: 'They risked their life to help you', fr: 'Il/elle a risqué sa vie pour vous aider' },
  { en: 'They betrayed your trust', fr: 'Il/elle a trahi votre confiance' },
  { en: 'They took you to meet your family', fr: 'Il/elle vous a emmené revoir votre famille' },
  { en: 'They tried to ditch you', fr: 'Il/elle a tenté de vous abandonner' },
  { en: 'They helped you recover from something', fr: 'Il/elle vous a aidé à vous remettre d’une épreuve' },
  { en: 'They killed or hurt someone close to you', fr: 'Il/elle a tué ou blessé un de vos proches' },
  { en: 'They saved your life', fr: 'Il/elle vous a sauvé la vie' },
];

export const MAGE_MENTOR_ENDINGS: readonly LocalizedText[] = [
  { en: 'They were murdered', fr: 'Votre mentor a été assassiné' },
  { en: 'You poisoned them', fr: 'Vous l’avez empoisonné' },
  { en: 'You are to marry their child', fr: 'Vous devez épouser son enfant' },
  { en: 'You are still with your mentor, but as lovers now', fr: 'Vous êtes toujours ensemble, désormais comme amants' },
  { en: 'You parted ways after a particularly intense argument', fr: 'Vous vous êtes séparés après une dispute violente' },
  { en: 'You passed all of their tests', fr: 'Vous avez réussi toutes ses épreuves' },
  { en: 'They discarded you after you failed them yet again', fr: 'Il/elle vous a renvoyé après un énième échec' },
  { en: 'You became friends and still keep in touch', fr: 'Vous êtes devenus amis et restez en contact' },
  { en: 'You killed them in self-defense', fr: 'Vous l’avez tué en légitime défense' },
  { en: 'They lost control of their magic and obliterated themselves before your eyes', fr: 'Il/elle a perdu le contrôle de sa magie et s’est désintégré sous vos yeux' },
];

export interface MageDecadeStyleDefinition {
  id: MageDecadeStyleId;
  label: LocalizedText;
  dangerPct: number;
  rollEventOutcome: (d10: number) => MageDecadeEventOutcomeId;
}

export const MAGE_DECADE_STYLES: readonly MageDecadeStyleDefinition[] = [
  {
    id: 'cautious',
    label: { en: 'Cautious (20% Danger)', fr: 'Prudent (Danger 20 %)' },
    dangerPct: 20,
    rollEventOutcome: (d10) =>
      d10 === 1 ? 'benefit' : d10 === 2 ? 'ally' : d10 === 3 ? 'knowledge' : 'nothing',
  },
  {
    id: 'politicking',
    label: { en: 'Politicking (50% Danger)', fr: 'Politique (Danger 50 %)' },
    dangerPct: 50,
    rollEventOutcome: (d10) =>
      d10 <= 2 ? 'benefit' : d10 <= 7 ? 'ally' : d10 === 8 ? 'knowledge' : 'nothing',
  },
  {
    id: 'experimentation',
    label: { en: 'Experimentation (70% Danger)', fr: 'Expérimentation (Danger 70 %)' },
    dangerPct: 70,
    rollEventOutcome: (d10) =>
      d10 <= 3 ? 'benefit' : d10 === 4 ? 'ally' : 'knowledge',
  },
  {
    id: 'study',
    label: { en: 'Magical Study (50% Danger)', fr: 'Étude magique (Danger 50 %)' },
    dangerPct: 50,
    rollEventOutcome: (d10) =>
      d10 <= 5 ? 'benefit' : d10 <= 7 ? 'ally' : d10 === 8 ? 'knowledge' : 'nothing',
  },
];

export const MAGE_DANGER_TABLES: Record<MageDecadeStyleId, readonly LocalizedText[]> = {
  cautious: [
    { en: '1. Grudge — Someone is holding a grudge against you (roll Grudges).', fr: '1. Rancune — Un conflit a laissé une rancune tenace (table des Rancunes).' },
    { en: '2. Addiction — Developed a chemical or behavioral addiction (Core Book p. 32).', fr: '2. Dépendance — Vous avez développé une addiction (Livre de base p. 32).' },
    { en: '3. Fell Ill — Wasting disease left lasting fatigue (-2 STA).', fr: '3. Maladie grave — Une maladie débilitante vous laisse fatigué (–2 END).' },
    { en: '4. Angered City Folk — Citizens of a major city view you as a threat on sight.', fr: '4. Courroux citadin — Les habitants d’une grande ville vous voient comme une menace.' },
    { en: '5. Accident — 1-4: Disfigured (Feared); 5-6: Bedridden 1d10 mo; 7-8: Lost 1d10 mo memory; 9-10: Nightmares (7/10).', fr: '5. Accident — 1-4: Défiguré (Craint) ; 5-6: Alité 1d10 mois ; 7-8: Amnésie 1d10 mois ; 9-10: Cauchemars (7/10).' },
    { en: '6. Magical Allergy — Drinking any potion/elixir inflicts Nausea for its duration.', fr: '6. Allergie magique — Boire une potion/élixir inflige Nausée pendant sa durée.' },
    { en: '7. Extreme Vulnerability — -3 Endurance checks to resist dimeritium.', fr: '7. Vulnérabilité extrême — –3 aux jets de Résilience contre le diméritium.' },
    { en: '8. Hair Fell Out — A botched spell removed all body hair permanently.', fr: '8. Perte de pilosité — Plus aucun cheveu ni poil ne repoussera jamais.' },
    { en: '9. Arthritis — -1 Spell Casting when casting spells requiring hand gestures.', fr: '9. Arthrite — –1 en Incantation pour les sorts nécessitant des gestes.' },
    { en: '10. Hexed — Still afflicted by an unlifted hex (GM picks from Core Book).', fr: '10. Envoûté — Vous subissez toujours un envoûtement non levé (avec le MJ).' },
  ],
  politicking: [
    { en: '1. Debt — You fell 1d10 × 100 Crowns in debt.', fr: '1. Dettes — Vous avez accumulé 1d10 × 100 couronnes de dettes.' },
    { en: '2. False Accusation — Framed (Theft/Treason/Murder/Forbidden Magic/etc.).', fr: '2. Fausse accusation — Accusé à tort (vol, trahison, meurtre, magie interdite…).' },
    { en: '3. Betrayed — A friend or acquaintance turned into a bitter enemy.', fr: '3. Trahison — Un ami ou allié vous a trahi et devient votre ennemi.' },
    { en: '4. Friend or Lover Killed — Lost someone close in an accident or scheme.', fr: '4. Proche assassiné — Un ami ou amant a péri dans un accident ou un complot.' },
    { en: '5. Caught Red Handed — Exposed manipulating others; gain an enemy with Minions.', fr: '5. Pris la main dans le sac — Un ennemi disposant de Sbires cherche vengeance.' },
    { en: '6. Imprisonment — Locked behind bars for 1d10 months.', fr: '6. Emprisonnement — Emprisonné pendant 1d10 mois.' },
    { en: '7. Mentor Passed Away — If your mentor lived, they perished this decade.', fr: '7. Décès du mentor — Votre mentor est mort durant cette décennie.' },
    { en: '8. Enemy of the State — Branded Hated in a nation you conspired against.', fr: '8. Ennemi d’État — Vous êtes désormais Haï dans le royaume visé par vos intrigues.' },
    { en: '9. Rival — Made a school rival (roll on Grudges; they are the offended party).', fr: '9. Rivalité — Un membre d’académie vous voue une rancune (table des Rancunes).' },
    { en: '10. Retained by a Noble — 100 Crowns/month stipend, but must obey every summon.', fr: '10. Mage attitré — Rente de 100 couronnes/mois contre obéissance immédiate à un noble.' },
  ],
  experimentation: [
    { en: '1. Overdraw — Drew too much Chaos; lower Health Points (HP) by 2.', fr: '1. Surtension arcanique — Vous avez trop puisé dans le Chaos : –2 Points de Santé (PS).' },
    { en: '2. Demonic Encounter — Bear a demon’s lucifuge; it always knows where you are.', fr: '2. Rencontre démoniaque — Un démon a marqué votre corps de son lucifuge.' },
    { en: '3. Deemed Dangerous — Wanted by authorities across an entire kingdom.', fr: '3. Jugé dangereux — Vous êtes recherché par les autorités d’un royaume.' },
    { en: '4. Alchemical Incident — Toxic reagent mishap reduces Stamina by -2 STA.', fr: '4. Incident alchimique — Une réaction toxique réduit votre Endurance de –2.' },
    { en: '5. Lasting Scars — Explosion scarred your face; Social Standing becomes Feared.', fr: '5. Cicatrices durables — Visage défiguré : votre Statut social devient Craint.' },
    { en: '6. Social Faux Pas — Treated as Tolerated instead of Equal by other mages.', fr: '6. Faux pas magique — Les autres mages vous considèrent comme Toléré.' },
    { en: '7. Hunted — 1d6+5 bounty hunters actively pursue bounties on your head.', fr: '7. Traqué — 1d6+5 chasseurs de primes sont à vos trousses.' },
    { en: '8. Alchemical Dependency — Developed an addiction to Elixirs (Core p. 32).', fr: '8. Dépendance aux élixirs — Addiction sévère aux élixirs alchimiques.' },
    { en: '9. Lost a Sense — Lost taste, smell, or touch (-2 on checks relying on it).', fr: '9. Sens perdu — Perte du goût, de l’odorat ou du toucher (–2 aux tests liés).' },
    { en: '10. Mutation — Gained Minor Mutation of a Mutagen of choice & its Social Standing change.', fr: '10. Mutation — Vous subissez une mutation mineure de mutagène et son impact social.' },
  ],
  study: [
    { en: '1. Magical Block — Pick an element (earth/air/fire/water); -2 Spell Casting with it.', fr: '1. Blocage magique — –2 cumulatif en Incantation sur un élément (terre/air/feu/eau).' },
    { en: '2. Monster Encounter — Phobia of 1 monster (-2 Courage, DC:15 Courage check or Staggered).', fr: '2. Traumatisme monstrueux — Phobie d’un monstre (–2 Courage, SD 15 ou Chancelant).' },
    { en: '3. Overdrew Place of Power — Permanently scarred; every draw requires 2nd-draw Endurance save.', fr: '3. Site d’énergie surchargé — Chaque puisement exige d’emblée un jet de Résilience.' },
    { en: '4. Hunted by a Golem — An angry archmage sent an unstoppable golem after you.', fr: '4. Traqué par un golem — Un golem programmé pour vous détruire parcourt le Continent.' },
    { en: '5. Loud Telepathy — Learn Telepathy, but targets hear a mumble (DC:15 Awareness detects).', fr: '5. Télépathie bruyante — Vous connaissez Télépathie, mais vos cibles peuvent vous sentir (SD 15).' },
    { en: '6. Polymorphed — Spent years as an animal; lingering mannerisms impose -2 Etiquette.', fr: '6. Métamorphosé — Longtemps transformé en bête : –2 en Étiquette.' },
    { en: '7. Intoxicated — Roll below BODY on 1d10 when drinking any potion/elixir or become Intoxicated.', fr: '7. Métabolisme altéré — Jet < COR sur 1d10 pour toute potion sous peine d’Ivresse.' },
    { en: '8. Teleportation Sickness — Endurance DC:12 after any portal/teleport or Nausea 10 min.', fr: '8. Mal des portails — Résilience SD 12 après téléportation sous peine de Nausée (10 min).' },
    { en: '9. Wanted by Hunters — Two Witch Hunters / Imperial Mage Hunters pursue you relentlessly.', fr: '9. Poursuivi par des chasseurs — Deux Chasseurs de Sorcières ou de Mages vous traquent.' },
    { en: '10. Cursed — Cursed yourself studying hexes (pick with GM, Core Book p. 230).', fr: '10. Maudit — Vous vous êtes maudit par accident (Livre de base p. 230).' },
  ],
};

export const MAGE_BENEFIT_EVENTS: readonly LocalizedText[] = [
  {
    en: '1. Scouted out a Prospective Mage — Trained a gifted youth; gain a loyal Mage Ally for research.',
    fr: '1. Découverte d’un jeune prodige — Vous avez guidé un jeune mage qui devient votre Allié pour vos recherches.',
  },
  {
    en: '2. Moved into a Community — Welcomed by a village; always treated as Equal in that region.',
    fr: '2. Accueilli par une communauté — Un village vous offre gîte et protection ; vous y êtes considéré Neutre.',
  },
  {
    en: '3. Payment Due — Someone owes you 600 crowns collectable at any time.',
    fr: '3. Créance due — Quelqu’un vous doit 600 couronnes que vous pouvez réclamer à tout moment.',
  },
  {
    en: '4. Familiar — Loyal trained animal companion (cat, dog, bird, or serpent) follows your commands.',
    fr: '4. Familier — Un animal dressé (chat, chien, oiseau ou serpent) vous suit partout et vous obéit.',
  },
  {
    en: '5. Love Affair — Meaningful lover who cherished your magical gifts (roll 1d10 duration).',
    fr: '5. Liaison passionnée — Vous avez vécu une histoire d’amour mémorable appréciant vos dons.',
  },
  {
    en: '6. Won a Duel — Claimed a trophy (1-4 Elven Walking Staff, 5-8 Gnomish Staff, 9-10 Crystal Skull).',
    fr: '6. Duel magique remporté — Trophée pris à un rival (Bâton elfique, Bâton gnome ou Crâne de cristal).',
  },
  {
    en: '7. Found a Portal — Discovered an ancient elven portal (even d10: active) leading to distant lands.',
    fr: '7. Portail découvert — Vous connaissez l’emplacement d’un ancien portail elfique (pair sur 1d10 : actif).',
  },
  {
    en: '8. Battle Magic Training — Practiced dueling magic users. Gain +1 to Resist Magic.',
    fr: '8. Magie de duel — Entraîné à contrer les autres mages : +1 en Résistance à la magie.',
  },
  {
    en: '9. Place of Power — Discovered and tapped a Site; gain 5 Units of Fifth Essence.',
    fr: '9. Site d’Énergie — Vous avez découvert un Site et récupéré 5 unités de Cinquième Essence.',
  },
  {
    en: '10. Armored Casting — Subtract 1 from total armor EV for spell casting.',
    fr: '10. Incantation en armure — Réduisez de 1 le malus VE total d’armure pour lancer vos sorts.',
  },
];

export const MAGE_KNOWLEDGE_EVENTS: readonly LocalizedText[] = [
  {
    en: '1. Stumped by a Curse — Gain +1 Magic Training and +1 Hex Weaving.',
    fr: '1. Énigme d’une malédiction — +1 en Exercice de la magie et +1 en Envoûtement.',
  },
  {
    en: '2. Memorized Formulae — Begin play knowing 1 extra Novice spell and 1 extra Journeyman spell.',
    fr: '2. Formules mémorisées — Vous commencez avec 1 sort de Novice et 1 sort de Compagnon supplémentaires.',
  },
  {
    en: '3. Magical Biologist — Begin play knowing the Imbue Trophy Ritual.',
    fr: '3. Biologiste arcanique — Vous commencez en connaissant le rituel Imprégner un trophée (Imbue Trophy).',
  },
  {
    en: '4. Zerrikanian Alchemy — Begin play knowing the Formula for Zerrikanian Fire.',
    fr: '4. Alchimie zerrikanienne — Vous connaissez d’office la formule du Feu zerrikanien.',
  },
  {
    en: '5. Signs and Portents — Saw a prophetic vision of an event you must prevent or fulfill (with GM).',
    fr: '5. Signes et présages — Vision symbolique d’un événement futur majeur (à définir avec le MJ).',
  },
  {
    en: '6. Encyclopedia Arcana — Gain +2 to Magic Training.',
    fr: '6. Encyclopédie des Arcanes — +2 en Exercice de la magie.',
  },
  {
    en: '7. Ley Line Studies — +2 bonus drawing from Ley Lines & begin knowing Detect Ley Line.',
    fr: '7. Lignes telluriques — +2 pour puiser dans une Ligne tellurique & sort Détection de ligne tellurique connu.',
  },
  {
    en: '8. Teacher’s Assistant — Halve the learning checks required when teaching spells to other mages.',
    fr: '8. Assistant d’enseignement — Divisez par 2 le nombre de tests pour enseigner des sorts.',
  },
  {
    en: '9. Apprenticed to an Alchemist — +1 Alchemy and 2 Novice alchemical formulae.',
    fr: '9. Apprentissage alchimique — +1 en Alchimie et 2 formules alchimiques de Novice.',
  },
  {
    en: '10. Divination Expert — Know one divination ritual (Hydromancy, Pyromancy, Tyromancy, or Oneiromancy).',
    fr: '10. Expert en divination — Vous maîtrisez au choix Hydromancie, Pyromancie, Tyromancie ou Oniromancie.',
  },
];

export const MAGE_GRUDGE_PROFESSIONS: readonly LocalizedText[] = [
  { en: 'Criminal', fr: 'Criminel' },
  { en: 'Mercenary', fr: 'Mercenaire' },
  { en: 'Merchant', fr: 'Marchand' },
  { en: 'Artisan', fr: 'Artisan' },
  { en: 'Scholar', fr: 'Érudit' },
  { en: 'Druid', fr: 'Druide' },
  { en: 'Priest', fr: 'Prêtre' },
  { en: 'Mage', fr: 'Mage' },
  { en: 'Knight', fr: 'Chevalier' },
  { en: 'Noble', fr: 'Noble' },
];

export const MAGE_GRUDGE_CAUSES: readonly LocalizedText[] = [
  { en: 'Sold out the offended party', fr: 'Vendu / trahi la partie offensée' },
  { en: 'Backstabbed the offended party', fr: 'Poignardé dans le dos' },
  { en: 'Turned down the offended party', fr: 'Rejeté ou humilié par un refus' },
  { en: 'Kept the offended party from acquiring something', fr: 'Empêché d’acquérir un bien précieux' },
  { en: 'Stole something from the offended party', fr: 'Volé quelque chose de valeur' },
  { en: 'Caused the offended party harm', fr: 'Causé un dommage physique ou moral' },
  { en: 'Tried to ruin the offended party’s reputation', fr: 'Tenté de ruiner la réputation' },
  { en: 'Manipulated the offended party', fr: 'Manipulé la partie offensée' },
  { en: 'Tried to poison the offended party', fr: 'Tentative d’empoisonnement' },
  { en: 'Insulted the offended party', fr: 'Grave insulte publique' },
];

export const MAGE_GRUDGE_ESCALATIONS: readonly LocalizedText[] = [
  { en: 'Forgotten about it', fr: 'Oublié pour l’instant' },
  { en: 'On the lookout', fr: 'Sur ses gardes' },
  { en: 'Forgiven unless provoked again', fr: 'Pardonné mais rancune latente' },
  { en: 'Actively scheming against the other', fr: 'Complote activement' },
  { en: 'Want nothing to do with the other', fr: 'Refuse tout contact' },
  { en: 'Planning to go after loved ones', fr: 'Cible les proches' },
  { en: 'Trying to sabotage the other', fr: 'Tente de saboter l’autre' },
  { en: 'Spreading harmful rumors', fr: 'Répand de fausses rumeurs' },
  { en: 'Mad enough to fly into a rage on sight', fr: 'Prêt à attaquer à vue' },
  { en: 'Looking for allies to hurt the other', fr: 'Recrute des alliés pour nuire' },
];

export const MAGE_POWER_OR_VALUE: readonly LocalizedText[] = [
  { en: 'Social', fr: 'Influence sociale' },
  { en: 'Social', fr: 'Influence sociale' },
  { en: 'Knowledge', fr: 'Connaissances / Renseignements' },
  { en: 'Knowledge', fr: 'Connaissances / Renseignements' },
  { en: 'Physical', fr: 'Force physique' },
  { en: 'Physical', fr: 'Force physique' },
  { en: 'Minions', fr: 'Sbires / Hommes de main' },
  { en: 'Minions', fr: 'Sbires / Hommes de main' },
  { en: 'Magic', fr: 'Pouvoir magique' },
  { en: 'Magic', fr: 'Pouvoir magique' },
];

export const MAGE_ALLY_HOW_MET: readonly LocalizedText[] = [
  { en: 'Studied together', fr: 'Étudié ensemble' },
  { en: 'Saved them from an accident', fr: 'Sauvé d’un accident' },
  { en: 'Supported them in a tough time', fr: 'Soutenu dans une épreuve' },
  { en: 'Backed them against a betrayal', fr: 'Défendu contre une trahison' },
  { en: 'Former romantic partners', fr: 'Anciens amants' },
  { en: 'Originally tried to manipulate them', fr: 'Tenté au départ de les manipuler' },
  { en: 'Showed genuine kindness', fr: 'Geste de bonté sincère' },
  { en: 'Set out to study them', fr: 'Cherché à les étudier' },
  { en: 'Helped them backstab someone', fr: 'Aidé à doubler un rival' },
  { en: 'Met during shared punishment', fr: 'Rencontré pendant une punition' },
];

export const MAGE_ALLY_CLOSENESS: readonly LocalizedText[] = [
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Acquaintances', fr: 'Connaissances' },
  { en: 'Friends', fr: 'Amis' },
  { en: 'Friends', fr: 'Amis' },
  { en: 'Friends', fr: 'Amis' },
  { en: 'Bound by Bond', fr: 'Liés par un serment' },
];

function pickIdx(len: number): number {
  return Math.floor(Math.random() * len);
}

export function rollMageGrudgeSummary(lang: 'en' | 'fr'): string {
  const prof = MAGE_GRUDGE_PROFESSIONS[pickIdx(10)][lang];
  const cause = MAGE_GRUDGE_CAUSES[pickIdx(10)][lang];
  const esc = MAGE_GRUDGE_ESCALATIONS[pickIdx(10)][lang];
  const power = MAGE_POWER_OR_VALUE[pickIdx(10)][lang];
  return lang === 'fr'
    ? `Rival (${prof}) — Cause : ${cause} ; Escalade : ${esc} ; Pouvoir : ${power}`
    : `Rival (${prof}) — Cause: ${cause}; Escalation: ${esc}; Power: ${power}`;
}

export function rollMageAllySummary(lang: 'en' | 'fr'): string {
  const prof = MAGE_GRUDGE_PROFESSIONS[pickIdx(10)][lang];
  const met = MAGE_ALLY_HOW_MET[pickIdx(10)][lang];
  const close = MAGE_ALLY_CLOSENESS[pickIdx(10)][lang];
  const val = MAGE_POWER_OR_VALUE[pickIdx(10)][lang];
  return lang === 'fr'
    ? `Allié (${prof}, ${close}) — Rencontre : ${met} ; Atout : ${val}`
    : `Ally (${prof}, ${close}) — Met: ${met}; Value: ${val}`;
}
