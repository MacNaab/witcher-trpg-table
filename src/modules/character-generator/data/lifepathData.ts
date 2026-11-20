import type { LocalizedText } from '@/src/data/bestiary/types';
import type { DecadeRiskLevel, ModuleLanguage, RegionId } from '../types';

export interface RegionDefinition {
  id: RegionId;
  name: LocalizedText;
  origins: readonly LocalizedText[];
}

/**
 * Origins suggested in custom/freeform origin picker.
 */
export const REGIONS_DATA: readonly RegionDefinition[] = [
  {
    id: 'north',
    name: { en: 'Northern Kingdoms', fr: 'Royaumes du Nord' },
    origins: [
      { en: 'Redania', fr: 'Rédanie' },
      { en: 'Kaedwen', fr: 'Kaedwen' },
      { en: 'Temeria', fr: 'Témérie' },
      { en: 'Aedirn', fr: 'Aedirn' },
      { en: 'Lyria & Rivia', fr: 'Lyrie et Rivie' },
      { en: 'Kovir & Poviss', fr: 'Kovir et Poviss' },
      { en: 'Skellige', fr: 'Skellige' },
      { en: 'Cidaris', fr: 'Cidaris' },
      { en: 'Verden', fr: 'Verden' },
      { en: 'Cintra', fr: 'Cintra' },
    ],
  },
  {
    id: 'nilfgaard',
    name: { en: 'Nilfgaardian Empire', fr: 'Empire de Nilfgaard' },
    origins: [
      { en: 'Heart of the Empire', fr: 'Cœur de l’Empire' },
      { en: 'Vicovaro', fr: 'Vicovaro' },
      { en: 'Angren', fr: 'Angren' },
      { en: 'Nazair', fr: 'Nazair' },
      { en: 'Metinna', fr: 'Metinna' },
      { en: 'Mag Turga', fr: 'Mag Turga' },
      { en: 'Geso', fr: 'Geso' },
      { en: 'Ebbing', fr: 'Ebbing' },
      { en: 'Maecht', fr: 'Maecht' },
      { en: 'Gemmera', fr: 'Gemmery' },
      { en: 'Etolia', fr: 'Étolie' },
    ],
  },
  {
    id: 'elderlands',
    name: { en: 'Elderlands', fr: 'Terres Ancestrales' },
    origins: [
      { en: 'Dol Blathanna', fr: 'Dol Blathanna' },
      { en: 'Mahakam', fr: 'Mahakam' },
    ],
  },
];

export const ALL_ORIGINS_SUGGESTIONS: readonly LocalizedText[] =
  REGIONS_DATA.flatMap((region) => region.origins);

export function getRegionDefinition(regionId: RegionId): RegionDefinition {
  const found = REGIONS_DATA.find((r) => r.id === regionId);
  if (!found) throw new Error(`Unknown region id: ${regionId}`);
  return found;
}

export const FAMILY_FATES: Record<RegionId, readonly LocalizedText[]> = {
  north: [
    {
      en: 'Your family was scattered to the winds by the wars and you have no idea where most of them are.',
      fr: 'Les membres de votre famille se sont éparpillés aux quatre vents à cause des guerres successives et vous n’avez aucune idée d’où ils se trouvent à l’heure actuelle.',
    },
    {
      en: 'Your family was imprisoned for crimes, possibly on false charges. You were the only one to escape.',
      fr: 'Votre famille a été emprisonnée pour des crimes, peut-être sur de fausses accusations. Vous êtes le seul à en être réchappé. Vous voulez libérer vos proches… ou pas.',
    },
    {
      en: 'Your family home was cursed; crops no longer grow and specters roam the halls. Staying was too dangerous.',
      fr: 'Votre maison familiale est victime d’une malédiction. Vos terres ne donnent plus de récoltes ou des spectres hantent les couloirs de votre demeure. Séjourner dans cette maison s’avérait trop dangereux.',
    },
    {
      en: 'Endless wars destroyed your family livelihood, forcing them to turn to crime to survive.',
      fr: 'Les guerres incessantes ont fini par détruire le moyen de subsistance de votre famille, qui a dû se tourner vers les activités criminelles pour survivre.',
    },
    {
      en: 'Your family racked up massive gambling or loan debts. You desperately need coin.',
      fr: 'Votre famille a accumulé de lourdes dettes à cause de paris ou d’emprunts. Vous avez désespérément besoin d’argent.',
    },
    {
      en: 'Your family is locked in a blood feud with another family; no one even remembers how it started.',
      fr: 'Votre famille est engagée dans une vendetta avec une autre famille. Vous ne vous souvenez peut-être même pas de l’élément déclencheur de cette rancune.',
    },
    {
      en: 'Due to action or inaction, your family became hated throughout your hometown.',
      fr: 'À cause de son comportement ou de son inaction, votre famille est haïe de tout le village et plus personne ne veut avoir affaire avec elle.',
    },
    {
      en: 'A band of brigands took everything you owned and slaughtered everyone, leaving you alone.',
      fr: 'Un jour, une bande de voyous vous a pris tout ce que vous possédiez. Les bandits ont massacré tout le monde, sauf vous, qui êtes à présent complètement seul.',
    },
    {
      en: 'Your family hides a deep dark secret that would ruin your lives if ever uncovered.',
      fr: 'Votre famille possède un sombre secret qui, s’il était découvert, détruirait votre vie de fond en comble. Vous pouvez imaginer quel est ce secret ou laisser le MJ s’en charger.',
    },
    {
      en: 'Your family grew to despise each other; nobody speaks to you anymore.',
      fr: 'Les membres de votre famille se détestent les uns les autres. Tous ceux avec lesquels vous avez grandi ne font aucun effort pour se parler, et vous avez de la chance quand vous obtenez un simple bonjour.',
    },
  ],
  nilfgaard: [
    {
      en: 'Your family was enslaved for real or fabricated crimes against the Empire. Only you escaped.',
      fr: 'Votre famille a été réduite en esclavage à la suite d’accusations (fondées ou non) de crimes contre l’Empire. Vous seul en êtes réchappé.',
    },
    {
      en: 'Your family was exiled into the Korath Desert, forcing you to fight to survive your youth.',
      fr: 'Votre famille a été exilée dans le désert de Korath et vous avez passé la majorité de votre jeunesse à tenter de survivre dans cette terre hostile et désolée.',
    },
    {
      en: 'A rogue mage murdered your family out of vengeance or bloodlust, leaving only you alive.',
      fr: 'Un mage renégat a assassiné votre famille pour se venger ou par goût de la violence. Dans tous les cas, vous êtes le seul survivant.',
    },
    {
      en: 'Your family simply vanished one day without a trace.',
      fr: 'Les membres de votre famille ont disparu et vous n’avez aucune idée d’où ils se trouvent. Un jour, ils sont partis, et vous ne les avez plus jamais revus.',
    },
    {
      en: 'Your family was executed for treason against the Empire. Only you slipped the noose.',
      fr: 'Votre famille a été exécutée pour trahison envers l’Empire. Vous êtes le seul à avoir échappé à ce destin.',
    },
    {
      en: 'Your family was stripped of its title and cast out to survive among commoners.',
      fr: 'Votre famille a été déchue de ses titres pour une raison quelconque. Vous avez été chassé de votre maison et deviez vous débrouiller pour survivre au milieu de la populace.',
    },
    {
      en: 'A mage relative disgraced your family name by flaunting magic like a Northern sorcerer.',
      fr: 'Le nom de votre famille a été terni par un parent proche qui a fait un étalage scandaleux de ses dons magiques, à la manière d’un mage nordique.',
    },
    {
      en: 'Through action or omission, you brought Imperial disgrace upon your family.',
      fr: 'Par votre faute, votre famille est tombée en disgrâce auprès de l’Empire. Une de vos actions ou votre échec a jeté l’opprobre sur votre nom et celui de vos parents.',
    },
    {
      en: 'Your family guards a dangerous secret that would annihilate your house if revealed.',
      fr: 'Votre famille possède un sombre secret qui, s’il était découvert, détruirait votre vie et celle de votre parenté de fond en comble. Vous devez le protéger au péril de votre vie.',
    },
    {
      en: 'Your family was assassinated as pawns in a larger power struggle.',
      fr: 'Votre famille a été assassinée. Cette tragédie faisait peut-être partie d’une machination, ou alors vos proches s’en sont pris à plus fort qu’eux. Quoi qu’il en soit, tout le monde est mort.',
    },
  ],
  elderlands: [
    {
      en: 'Your family was branded as human sympathizers and shunned in your homeland.',
      fr: 'Votre famille est accusée de soutenir les humains et n’est donc pas particulièrement appréciée dans votre village natal.',
    },
    {
      en: 'Your family was ostracized for dissenting opinions; neighbors avoid you like the plague.',
      fr: 'Votre famille a été ostracisée à cause de ses opinions divergentes. Depuis, les gens vous évitent comme la peste, vous et vos proches.',
    },
    {
      en: 'Your family perished during the Northern Wars, either as fighters or casualties.',
      fr: 'Votre famille est morte pendant les Guerres nordiques. Elle a peut-être directement pris part au conflit ou a fait partie des victimes collatérales.',
    },
    {
      en: 'Your family has been locked in a centuries-old blood feud.',
      fr: 'Votre famille est au cœur d’une vendetta depuis des siècles. Même si personne ne se souvient des origines de ce conflit, il n’a rien perdu de sa violence.',
    },
    {
      en: 'Your family was stripped of its standing and cast out of its home.',
      fr: 'Votre famille a été déchue de ses titres pour une raison quelconque. Vous avez été chassé de votre maison et deviez vous débrouiller pour survivre.',
    },
    {
      en: 'In your youth your family raided human settlements for food and vengeance.',
      fr: 'Durant votre jeunesse, votre famille menait des raids sur des colonies humaines pour obtenir de la nourriture et peut-être se venger des hommes.',
    },
    {
      en: 'Your family home is haunted by spirits slain during the wars against humans.',
      fr: 'La demeure familiale est hantée. Apparemment, cette malédiction est le résultat des innombrables morts qui ont eu lieu à l’emplacement de votre maison lors de la guerre contre les humains.',
    },
    {
      en: 'Your family is split by a sibling marrying a human; half accept them, half despise them.',
      fr: 'Votre famille est divisée depuis qu’un de vos proches, peut-être votre frère ou votre sœur, est en couple avec un humain. Certains l’apprécient, d’autres le détestent.',
    },
    {
      en: 'Humans mistook your family for Scoia’tael and slaughtered them without trial.',
      fr: 'Votre famille a été tuée par des humains qui pensaient avoir mis la main sur des Scoia’tael. Vos proches ont été massacrés ou pendus sans procès équitable.',
    },
    {
      en: 'Your family descends from an infamous traitor, tainting all local interactions.',
      fr: 'Votre famille descend d’un traître notoire, ce qui a un impact sur ses relations avec les autres membres des races anciennes.',
    },
  ],
};

export const PARENTAL_FATES: Record<RegionId, readonly LocalizedText[]> = {
  north: [
    {
      en: 'Killed in the Northern Wars (soldier or collateral victim).',
      fr: 'Votre ou vos parents se sont fait tuer au cours des Guerres nordiques.',
    },
    {
      en: 'Abandoned you in the wilderness when they could no longer keep you.',
      fr: 'Votre ou vos parents vous ont abandonné dans la nature où vous étiez livré à vous-même.',
    },
    {
      en: 'Cursed by a mage or bitter enemy, losing their lives to the hex.',
      fr: 'Votre ou vos parents ont été maudits par un mage ou à cause de la haine intense de quelqu’un. Cette malédiction leur a été fatale.',
    },
    {
      en: 'Sold or traded you away for coin, goods, or a service.',
      fr: 'Votre ou vos parents vous ont échangé contre de l’argent, des biens ou un service.',
    },
    {
      en: 'Joined a criminal gang you occasionally had to work alongside.',
      fr: 'Votre ou vos parents ont rejoint une organisation criminelle. Vous fréquentiez souvent des bandits et étiez parfois forcé de travailler avec eux.',
    },
    {
      en: 'Killed by monsters in the wild.',
      fr: 'Votre ou vos parents ont été tués par des monstres. À vous de décider quelle créature a mis fin à leurs jours.',
    },
    {
      en: 'Wrongfully executed as a scapegoat.',
      fr: 'Votre ou vos parents ont été exécutés à tort comme bouc émissaire.',
    },
    {
      en: 'Died of a sweeping plague before any cure could help.',
      fr: 'Votre ou vos parents ont succombé à une épidémie sans remède.',
    },
    {
      en: 'Defected to Nilfgaard across the border.',
      fr: 'Votre ou vos parents sont passés à Nilfgaard pour informations ou pour fuir.',
    },
    {
      en: 'Abducted by a local lord or noble family.',
      fr: 'Votre ou vos parents ont été kidnappés par des aristocrates locaux.',
    },
  ],
  nilfgaard: [
    {
      en: 'Your father died fighting in one of the Northern Wars.',
      fr: 'Votre père est mort au cours des Guerres nordiques.',
    },
    {
      en: 'Poisoned by a business or political rival.',
      fr: 'Votre ou vos parents ont été empoisonnés par un rival.',
    },
    {
      en: 'Taken by Imperial secret police; hanged publicly the week after.',
      fr: 'Les services secrets ont enlevé votre ou vos parents pour les soumettre à la question. La semaine suivante, leurs corps étaient pendus dans les rues.',
    },
    {
      en: 'Murdered by a rogue mage after trying to report them.',
      fr: 'Votre ou vos parents ont été assassinés par un mage renégat.',
    },
    {
      en: 'Imprisoned for illegal magic (true or framed).',
      fr: 'Votre ou vos parents ont été enfermés pour utilisation illégale de la magie.',
    },
    {
      en: 'Exiled to the Korath Desert after a major offense.',
      fr: 'Votre ou vos parents ont été exilés dans le désert de Korath.',
    },
    {
      en: 'Fatally cursed by a vengeful mage.',
      fr: 'Votre ou vos parents ont été maudits par un mage en quête de vengeance.',
    },
    {
      en: 'Simply walked out one day without explanation.',
      fr: 'Un jour, vos parents vous ont quitté du jour au lendemain sans explication.',
    },
    {
      en: 'Enslaved by the Empire after being framed by a rival.',
      fr: 'Votre ou vos parents ont été réduits en esclavage pour crime contre l’Empire.',
    },
    {
      en: 'Sent North as double agents in service of the Emperor.',
      fr: 'Votre ou vos parents ont été envoyés dans le Nord en tant qu’agents doubles pour l’Empereur.',
    },
  ],
  elderlands: [
    {
      en: 'Accused of being Scoia’tael; neighbors watch them with suspicion.',
      fr: 'Votre ou vos parents ont été accusés d’œuvrer pour la Scoia’tael.',
    },
    {
      en: 'Betrayed Elderfolk to humans; no longer welcome at home.',
      fr: 'Votre ou vos parents se sont retournés contre leur peuple et ont trahi les races anciennes en faveur des humains.',
    },
    {
      en: 'Gave in to despair over lost Elderfolk glory and took their own lives.',
      fr: 'Votre ou vos parents ont sombré dans le désespoir et se sont suicidés.',
    },
    {
      en: 'Killed during a brutal human pogrom while traveling.',
      fr: 'Au cours d’un voyage, vos parents ont été victimes d’un pogrom humain.',
    },
    {
      en: 'Obsessed with restoring ancient glory, sacrificing everything for it.',
      fr: 'Votre ou vos parents sont devenus obsédés par l’idée de retrouver la gloire passée de leur race.',
    },
    {
      en: 'Exiled from their homeland over crimes or dissent.',
      fr: 'Votre ou vos parents ont été exilés de leur terre natale.',
    },
    {
      en: 'Afflicted with a lingering curse (GM discretion).',
      fr: 'Votre ou vos parents ont été victimes d’une malédiction.',
    },
    {
      en: 'Gave you to another family so you could survive.',
      fr: 'Vos parents vous ont confié à une autre famille pour que vous puissiez survivre.',
    },
    {
      en: 'Joined the Scoia’tael to seek vengeance against humans.',
      fr: 'Votre ou vos parents ont rejoint les Scoia’tael pour se venger des humains.',
    },
    {
      en: 'Died in a suspicious "accident" arranged by a powerful foe.',
      fr: 'Votre ou vos parents sont morts dans un soi-disant « accident » orchestré par un ennemi puissant.',
    },
  ],
};

export const FAMILY_STANDINGS: Record<RegionId, readonly LocalizedText[]> = {
  north: [
    {
      en: 'Aristocracy — Noble manor with servants. Gear: Deed of Nobility (+2 Reputation).',
      fr: 'Aristocratie — Manoir avec serviteurs. Équipement : lettre de noblesse (+2 Réputation).',
    },
    {
      en: 'Mage Ward — Raised in comfort by a busy mage. Gear: A Chronicle (+1 Education).',
      fr: 'Adopté par un mage — Confort matériel mais mentor occupé. Équipement : une chronique (+1 Éducation).',
    },
    {
      en: 'Knightly Family — Raised on chivalric duty. Gear: Personal Heraldry (+1 Reputation).',
      fr: 'Chevaliers — Élevé dans la tradition chevaleresque. Équipement : armoiries personnelles (+1 Réputation).',
    },
    {
      en: 'Merchant Family — Haggle, coin, and trade routes. Gear: 2 Contacts.',
      fr: 'Famille de marchands — Négociations et négoce. Équipement : 2 connaissances.',
    },
    {
      en: 'Artisan Family — Raised in a busy workshop. Gear: 3 Common Diagrams / Formulae.',
      fr: "Famille d'artisans — Élevé dans un atelier. Équipement : 3 schémas / formules communes.",
    },
    {
      en: 'Entertainer Family — Traveling troupes and stages. Gear: 1 Instrument & 1 Friend.',
      fr: "Famille d'artistes — Scènes et voyages. Équipement : 1 instrument et 1 ami.",
    },
    {
      en: 'Peasant Family — Simple, dangerous country farm. Gear: Lucky Token (+1 Luck).',
      fr: 'Famille paysanne — Ferme modeste et rude. Équipement : porte-bonheur (+1 Chance).',
    },
  ],
  nilfgaard: [
    {
      en: 'Aristocracy — Courtly intrigue and luxury. Gear: Deed of Nobility (+2 Reputation).',
      fr: 'Aristocratie — Univers de la cour et luxe. Équipement : lettre de noblesse (+2 Réputation).',
    },
    {
      en: 'High Clergy — Church of the Great Sun. Gear: Sacred Symbol (+1 Courage).',
      fr: 'Haut clergé — Église du Grand Soleil. Équipement : symbole sacré (+1 Courage).',
    },
    {
      en: 'Knightly House — Duty to the Emperor above all. Gear: Personal Heraldry (+1 Reputation).',
      fr: "Chevaliers — Devoir envers l'Empereur. Équipement : armoiries personnelles (+1 Réputation).",
    },
    {
      en: 'Artisan Family — Imperial exports and craft quality. Gear: 3 Common Diagrams / Formulae.',
      fr: "Famille d'artisans — Artisanat d'exportation. Équipement : 3 schémas / formules communes.",
    },
    {
      en: 'Merchant Family — Exotic Imperial trade. Gear: 2 Contacts.',
      fr: 'Famille de marchands — Négoce impérial exotique. Équipement : 2 connaissances.',
    },
    {
      en: 'Born into Serfdom — Hard labor in modest quarters. Gear: Trained bird or snake.',
      fr: 'Né dans la servitude — Travail rude. Équipement : oiseau ou serpent apprivoisé.',
    },
    {
      en: 'Peasant Family — Simple farm life across the Empire. Gear: Lucky Token (+1 Luck).',
      fr: "Famille paysanne — Ferme simple de l'Empire. Équipement : porte-bonheur (+1 Chance).",
    },
  ],
  elderlands: [
    {
      en: 'Aristocracy — Palaces steeped in Elder glory. Gear: Deed of Nobility (+2 Reputation).',
      fr: 'Aristocratie — Palais et héritage glorieux. Équipement : lettre de noblesse (+2 Réputation).',
    },
    {
      en: 'Noble Warrior — Mahakam Defenders or Wardancers. Gear: Personal Heraldry (+1 Reputation).',
      fr: 'Guerrier noble — Défenseur de Mahakam ou danseur de guerre. Équipement : armoiries personnelles (+1 Réputation).',
    },
    {
      en: 'Merchant Caravan — Wandering non-human traders. Gear: 2 Contacts.',
      fr: 'Marchands itinérants — Négoce non-humain recherché. Équipement : 2 connaissances.',
    },
    {
      en: 'Scribe Family — Keepers of Elder history. Gear: A Chronicle (+1 Education).',
      fr: 'Famille de scribes — Gardiens de la mémoire ancienne. Équipement : une chronique (+1 Éducation).',
    },
    {
      en: 'Entertainer Family — Songs, stages, and craft. Gear: 1 Instrument & 1 Friend.',
      fr: 'Artistes — Chants, théâtre et instruments. Équipement : 1 instrument et 1 ami.',
    },
    {
      en: 'Artisan Family — Studying ancient palaces for inspiration. Gear: 3 Common Diagrams / Formulae.',
      fr: "Famille d'artisans — Projets minutieux et palais anciens. Équipement : 3 schémas / formules communes.",
    },
    {
      en: 'Lowborn Family — Humble work in elders’ towns. Gear: Lucky Token (+1 Luck).',
      fr: 'Famille modeste — Petits métiers et entretien des demeures. Équipement : porte-bonheur (+1 Chance).',
    },
  ],
};

export const MENTORS_DATA: Record<RegionId, readonly LocalizedText[]> = {
  north: [
    { en: 'A Church — Devout hours at the temple. Keepsake: A sacred text.', fr: 'Une Église — Temps passé au temple. Souvenir : un texte sacré.' },
    { en: 'An Artisan — Appreciation for craft. Keepsake: A token you crafted.', fr: 'Un artisan — Goût du savoir-faire. Souvenir : un objet fabriqué.' },
    { en: 'A Count — Taught you composure and grace. Keepsake: A silver ring.', fr: 'Un comte — Maîtrise de soi et prestance. Souvenir : une bague en argent.' },
    { en: 'A Mage — Not to fear magic, question everything. Keepsake: A small pendant.', fr: 'Un mage — Ne pas craindre la magie, tout remettre en question. Souvenir : un petit pendentif.' },
    { en: 'A Village Witch — Importance of lore. Keepsake: A black magic doll.', fr: 'Une sorcière — Valeur du savoir. Souvenir : une poupée de magie noire.' },
    { en: 'A Cursed Person — Never judge too harshly. Keepsake: A carved totem.', fr: 'Une personne maudite — Ne jamais juger trop sévèrement. Souvenir : une statuette sculptée.' },
    { en: 'An Entertainer — Secrets of the stage. Keepsake: A playbill or ticket.', fr: 'Un bateleur — Secrets du spectacle. Souvenir : une affiche ou un ticket.' },
    { en: 'A Merchant — Shrewdness and wit. Keepsake: A coin you earned.', fr: 'Un marchand — Art de la ruse. Souvenir : une pièce gagnée.' },
    { en: 'A Criminal — How to watch out for yourself. Keepsake: A mask.', fr: 'Un criminel — Faire passer son intérêt avant tout. Souvenir : un masque.' },
    { en: 'A Soldier — How to defend yourself. Keepsake: A battle trophy.', fr: 'Un homme d’armes — Savoir se défendre. Souvenir : un trophée de guerre.' },
  ],
  nilfgaard: [
    { en: 'Cult of the Great Sun — Chants and rituals. Keepsake: Ceremonial mask.', fr: 'Culte du Grand Soleil — Chants et rituels. Souvenir : un masque de cérémonie.' },
    { en: 'An Outcast — Question society always. Keepsake: Bright colored badge.', fr: 'Un paria — Toujours remettre la société en question. Souvenir : un insigne coloré.' },
    { en: 'A Count — Command and Imperial order. Keepsake: A silver necklace.', fr: 'Un comte — Art du commandement et ordre. Souvenir : un collier en argent.' },
    { en: 'A Mage — Discipline and caution. Keepsake: An emblem.', fr: 'Un mage — Discipline et prudence. Souvenir : un emblème.' },
    { en: 'Imperial Detective — Solving mysteries. Keepsake: A magnifying glass.', fr: 'Un détective impérial — Résolution de mystères. Souvenir : une loupe.' },
    { en: 'A Mage Hunter — Wary of sorcery. Keepsake: A dimeritium ring.', fr: 'Un chasseur de mages — Méfiance envers la magie. Souvenir : une bague en diméritium.' },
    { en: 'A Soldier — Tales of danger and battle. Keepsake: A war trophy.', fr: 'Un homme d’armes — Récits de bataille. Souvenir : un trophée de guerre.' },
    { en: 'An Artisan — Precision and mastery. Keepsake: A jewel you crafted.', fr: 'Un artisan — Savoir-faire et précision. Souvenir : un objet fabriqué.' },
    { en: 'A Sentient Monster — Not all monsters are evil. Keepsake: Strange totem.', fr: 'Un monstre intelligent — Tous ne sont pas mauvais. Souvenir : une étrange statuette.' },
    { en: 'An Entertainer — Express yourself freely. Keepsake: Gift from a fan.', fr: 'Un bateleur — Créativité libre. Souvenir : un cadeau d’admirateur.' },
  ],
  elderlands: [
    { en: 'A Human — Not all prejudice is justified. Keepsake: A straw doll.', fr: 'Un humain — Le racisme est parfois infondé. Souvenir : une poupée de chiffon.' },
    { en: 'An Artisan — Sublime Elderfolk craft. Keepsake: Small token you made.', fr: 'Un artisan — Art sublime des races anciennes. Souvenir : un petit objet fabriqué.' },
    { en: 'A Noble Warrior — Taught you honor. Keepsake: A battle token.', fr: 'Un guerrier noble — Enseignement de l’honneur. Souvenir : un trophée.' },
    { en: 'A Highborn — Pride and etiquette. Keepsake: A signet ring.', fr: 'Un aristocrate — Fierté et étiquette. Souvenir : une chevalière.' },
    { en: 'An Entertainer — Joy and beauty. Keepsake: A ticket.', fr: 'Un bateleur — Gaieté et beauté. Souvenir : une affiche ou un ticket.' },
    { en: 'A Raider — Take what you need by force. Keepsake: A satchel.', fr: 'Un pillard — Prendre ce dont on a besoin. Souvenir : une sacoche.' },
    { en: 'A Sage — Elder history and lore. Keepsake: A book of tales.', fr: 'Un sage — Histoire des races anciennes. Souvenir : un livre de contes.' },
    { en: 'A Criminal — Follow your own rules. Keepsake: A mask.', fr: 'Un criminel — Suivre ses propres règles. Souvenir : un masque.' },
    { en: 'A Hunter — Surviving the wilds. Keepsake: A hunting trophy.', fr: 'Un chasseur — Survivre dans les contrées sauvages. Souvenir : un trophée de chasse.' },
    { en: 'A Lowland Farmer — Living happily and simply. Keepsake: Farmer’s spade.', fr: 'Un fermier pauvre — Vivre simplement et heureux. Souvenir : une bêche.' },
  ],
};

export const WITCHER_AGES: readonly { id: '1-2' | '4-6' | '8-11'; label: LocalizedText; trialModifier: number; description: LocalizedText }[] = [
  {
    id: '1-2',
    label: { en: '1–2 years old', fr: '1–2 ans' },
    trialModifier: -2,
    description: {
      en: 'Taken as an infant (1–2 years old). No memories of a prior life to anchor you during the Trial of the Grasses.',
      fr: "On vous a amené à devenir sorceleur très jeune (1–2 ans), sans aucun souvenir d'avant pour vous raccrocher lors de l'Épreuve des Herbes.",
    },
  },
  {
    id: '4-6',
    label: { en: '4–6 years old', fr: '4–6 ans' },
    trialModifier: 0,
    description: {
      en: 'Taken young (4–6 years old), retaining precious memories to cling to during the Trial of the Grasses.',
      fr: "On vous a amené jeune (4–6 ans), avec encore assez de souvenirs pour vous aider durant l'Épreuve des Herbes.",
    },
  },
  {
    id: '8-11',
    label: { en: '8–11 years old', fr: '8–11 ans' },
    trialModifier: 2,
    description: {
      en: 'Taken relatively old (8–11 years old). Training was harder, but strong memories strengthened your mind for the Trials.',
      fr: "On vous a amené relativement âgé (8–11 ans). L'entraînement fut plus dur mais vos souvenirs vous ont renforcé lors de l'Épreuve des Herbes.",
    },
  },
];

export const WITCHER_SCHOOLS: readonly { id: 'wolf' | 'griffin' | 'cat' | 'viper' | 'bear'; label: LocalizedText; description: LocalizedText }[] = [
  {
    id: 'wolf',
    label: { en: 'School of the Wolf', fr: 'École du Loup' },
    description: {
      en: 'Trained at Kaer Morhen in the Blue Mountains — structured, balanced training emphasizing hard, swift strikes.',
      fr: 'Entraîné à Kaer Morhen dans les Montagnes Bleues. Formation rigoureuse et équilibrée axée sur des frappes rapides et puissantes.',
    },
  },
  {
    id: 'griffin',
    label: { en: 'School of the Griffin', fr: 'École du Griffon' },
    description: {
      en: 'Trained at Kaer y Seren along the Dragon Mountains coast — versed in outnumbered combat and magical Signs.',
      fr: 'Formé à Kaer Y Seren le long des Montagnes du Dragon, spécialisé contre les ennemis nombreux et l’usage poussé des Signes.',
    },
  },
  {
    id: 'cat',
    label: { en: 'School of the Cat', fr: 'École du Chat' },
    description: {
      en: 'Trained in the wandering Dyn Marv caravan — harsh mutations sharpened lethal precision and volatile impulses.',
      fr: 'Entraîné dans la caravane itinérante Dyn Marv. Vos mutations ont exacerbé vos réflexes tout en écorchant vos émotions.',
    },
  },
  {
    id: 'viper',
    label: { en: 'School of the Viper', fr: 'École de la Vipère' },
    description: {
      en: 'Trained in Gorthur Gvaed in Tir Tochair — dual-blade combat and methodical monster assassination.',
      fr: 'Entraîné à Gorthur Gvaed dans les gouffres du Tir Tochair : lames jumelles et approche méthodique de l’assassinat.',
    },
  },
  {
    id: 'bear',
    label: { en: 'School of the Bear', fr: 'École de l’Ours' },
    description: {
      en: 'Trained at Haern Caduch in the snowy Amell Mountains — endurance, heavy steel armor, and relentless grit.',
      fr: 'Entraîné à Haern Caduch dans les neiges d’Amell : endurance hors norme et port efficace d’armures lourdes.',
    },
  },
];

export const WITCHER_EARLY_TRAINING: readonly { bonus: number; text: LocalizedText }[] = [
  {
    bonus: 0,
    text: {
      en: 'Injured on the Gauntlet (-1 SPD): Badly damaged your leg running the school Gauntlet.',
      fr: 'Blessé sur le Gantelet (–1 VIT) : Votre jambe a été salement amochée lors du parcours du Gantelet.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Purfered Knowledge (+1 Witcher Diagram): Copied a secret witcher diagram from the fortress library.',
      fr: 'Connaissances dérobées (+1 schéma de sorceleur) : Vous avez recopié un schéma secret dans la bibliothèque.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Rival (Witcher Enemy): Developed an enduring rivalry with another witcher trainee.',
      fr: 'Rival (un ennemi sorceleur) : Une haine tenace est née avec un autre apprenti sorceleur.',
    },
  },
  {
    bonus: 2,
    text: {
      en: 'Took Well to Mutations (+2 Trial of the Grasses): Adapted smoothly to early mutagens.',
      fr: 'Mutations aisées (+2 à l’Épreuve des Herbes) : Vous avez très bien assimilé les mutagènes préliminaires.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Sign Backlash (-1 Vigor Threshold): A failed Sign scarred your magical channeling.',
      fr: 'Contrecoup magique (–1 au seuil de Vigueur) : Un échec de Signe vous a laissé une séquelle durable.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Top of Your Class (+1 Swordsmanship): Unmatched mastery of witcher pirouettes and bladework.',
      fr: 'Premier de la classe (+1 en Escrime) : Vous maîtrisiez mieux que quiconque les passes et pirouettes de combat.',
    },
  },
  {
    bonus: -2,
    text: {
      en: 'Bad Reaction to Mutagens (-2 Trial of the Grasses): Severe allergic reaction to early alchemy.',
      fr: 'Mauvaise réaction aux mutagènes (–2 à l’Épreuve des Herbes) : Forte réaction allergique aux champignons mutagènes.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Friend (Witcher Ally): Forged a lifelong bond with a fellow trainee.',
      fr: 'Ami (un ami sorceleur) : L’entraînement périlleux a scellé une amitié solide avec un frère d’armes.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Wounded by the Pendulum (-1 REF): Shattered bones in the pendulum pit left lingering stiffness.',
      fr: 'Blessé par le Pendule (–1 RÉF) : Une chute dans le Pendule vous a laissé une légère raideur.',
    },
  },
  {
    bonus: 0,
    text: {
      en: 'Extensive Research (+1 Witcher Training): Spent every spare hour studying monster lore in the library.',
      fr: 'Recherches étendues (+1 en Formation de sorceleur) : Vous avez étudié sans relâche les traités sur les monstres.',
    },
  },
];

export const WITCHER_TRIAL_OUTCOMES: readonly LocalizedText[] = [
  {
    en: 'Almost Fatal (-1 EMP, -1 BODY): The Trial of the Grasses nearly destroyed your body and mind.',
    fr: 'Presque fatales (–1 EMP et –1 COR) : L’Épreuve des Herbes a pratiquement détruit votre corps et votre esprit.',
  },
  {
    en: 'Barely Made It (-1 EMP): Survived the Grasses on a razor edge, leaving psychological scars.',
    fr: 'À peine reçu (–1 EMP) : L’Épreuve s’est mal passée ; vous avez survécu non sans séquelles psychologiques.',
  },
  {
    en: 'Passable Mutations (No modifier): Endured the Grasses cleanly and entered the ranks of witchers.',
    fr: 'Mutations passables (aucun modificateur) : L’Épreuve des Herbes s’est déroulée normalement.',
  },
  {
    en: 'Extra Mutations (+1 EMP, +1 DEX): Your body embraced the Grasses extraordinarily well.',
    fr: 'Mutations supplémentaires (+1 EMP et +1 DEX) : Votre corps a réagi avec brio à l’Épreuve des Herbes.',
  },
];

export const WITCHER_IMPORTANT_EVENTS: readonly LocalizedText[] = [
  { en: 'Invoked the Law of Surprise for a child', fr: 'Obtenu un enfant par le Droit de Surprise' },
  { en: 'Hunted by a sentient monster', fr: 'Traqué par un monstre intelligent' },
  { en: 'Fought alongside a noble knight', fr: 'Combattu aux côtés d’un chevalier' },
  { en: 'Captured by a mage for experimentation', fr: 'Capturé par un mage pour des expériences' },
  { en: 'Worked secretly for a noble house', fr: 'Travaillé dans l’ombre pour un noble' },
  { en: 'Ventured beyond the Continent’s borders', fr: 'Voyagé au-delà des frontières du Continent' },
  { en: 'Shared a meaningful romance', fr: 'Vécu une romance marquante' },
  { en: 'Fought in a brutal siege of your keep', fr: 'Défendu votre forteresse lors d’un siège' },
  { en: 'Chased out after saving a town (Infamy)', fr: 'Chassé par les villageois après un contrat (Infamie)' },
  { en: 'Welcomed warmly by a grateful town (Renown)', fr: 'Accueilli en héros dans une ville (Renommée)' },
];

export const WITCHER_CURRENT_STATUS: readonly LocalizedText[] = [
  { en: 'Retained as a personal witcher for a house or merchant guild', fr: 'Sorceleur personnel au service d’une maison' },
  { en: 'Walking the Path looking for scarce contracts', fr: 'Sur la Voie à la recherche de contrats' },
  { en: 'Former hermit returning to the Path', fr: 'Ancien ermite de retour sur les routes' },
  { en: 'Trying to carve out an almost normal life', fr: 'Tente de mener une vie presque normale' },
  { en: 'Renegade hunter taking contracts on people', fr: 'Chasseur renégat aux méthodes criminelles' },
];

export const MAGE_AGES: readonly { id: '2-6' | '7-12' | '12+'; label: LocalizedText; modifier: number; description: LocalizedText }[] = [
  {
    id: '2-6',
    label: { en: '2–6 years old', fr: '2–6 ans' },
    modifier: -2,
    description: {
      en: 'Magical Source surfaced early due to unstable primal emotions (2–6 years old).',
      fr: 'Potentiel magique détecté très tôt (2–6 ans) sous l’effet d’émotions primaires instables.',
    },
  },
  {
    id: '7-12',
    label: { en: '7–12 years old', fr: '7–12 ans' },
    modifier: 0,
    description: {
      en: 'Detected during optimal childhood years (7–12) for structured arcane instruction.',
      fr: 'Repéré entre 7 et 12 ans, à l’âge idéal pour l’apprentissage rigoureux de la magie.',
    },
  },
  {
    id: '12+',
    label: { en: 'Over 12 years old', fr: 'Après 12 ans' },
    modifier: 2,
    description: {
      en: 'Late awakening after age 12; chaotic energy was bottled up before detection.',
      fr: 'Éveil tardif après 12 ans : votre énergie magique est restée longtemps contenue avant d’être détectée.',
    },
  },
];

export const MAGE_ACADEMIES: readonly { id: 'aretuza' | 'ban-ard' | 'nilfgaard' | 'druid-circle'; label: LocalizedText; description: LocalizedText }[] = [
  {
    id: 'aretuza',
    label: { en: 'Aretuza (+1 Education)', fr: 'Aretuza (+1 Éducation)' },
    description: {
      en: 'Trained at the Sorceress Academy on Thanedd / Loxia; impeccable courtly education.',
      fr: 'Formée à Aretuza en Rédanie (Loxia) pour conseiller les rois avec une éducation impeccable.',
    },
  },
  {
    id: 'ban-ard',
    label: { en: 'Ban Ard (-1 Armor EV penalty)', fr: 'Ban Ard (–1 pénalité VE d’armure)' },
    description: {
      en: 'Trained in Kaedwen at Ban Ard, emphasizing pragmatic combat readiness.',
      fr: 'Formé à l’école de Ban Ard à Kaedwen, préparé à survivre et combattre en armure légère.',
    },
  },
  {
    id: 'nilfgaard',
    label: { en: 'Nilfgaard Imperial Academy (+1 Deceit)', fr: 'École Impériale de Nilfgaard (+1 Duperie)' },
    description: {
      en: 'Austere Imperial academy where failure was harshly punished and espionage trained.',
      fr: 'Éducation stricte et austère sous le joug impérial, orientée vers l’espionnage et la discipline.',
    },
  },
  {
    id: 'druid-circle',
    label: { en: 'Druid Circle (+1 Druid Invocation)', fr: 'Cercle de Druides (+1 Invocation druidique)' },
    description: {
      en: 'Raised among wild druids before transferring to formal arcane studies.',
      fr: 'Formé d’abord dans la nature par les druides avant de rejoindre une académie.',
    },
  },
];

export const MAGE_TRAINING_EVENTS: readonly { modifier: number; text: LocalizedText }[] = [
  {
    modifier: 0,
    text: {
      en: 'Magical Trauma (-1 WILL): A severe arcane backlash scarred your willpower.',
      fr: 'Trauma magique (–1 Volonté) : Un retour de magie vous a affaibli durablement.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Stellar Student (+1 Magic Training): Mastered arcane theory under top tutors.',
      fr: 'Bon élève (+1 Formation de Mage) : Vous êtes incollable en théorie magique.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Mage Friend (Ally): Made a lasting ally during demanding academy years.',
      fr: 'Ami mage (allié) : Vous vous êtes lié d’amitié avec un autre élève sur les bancs de l’école.',
    },
  },
  {
    modifier: -2,
    text: {
      en: 'Poor Attunement (-2 Graduation): Struggled to discipline your Chaos channeling.',
      fr: 'Mauvaise harmonisation (–2 Fin de formation) : Vous avez peiné à discipliner vos études.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Magical Accident (-2 Vigor Threshold): A dangerous mishap reduced your Chaos conduit.',
      fr: 'Accident magique (–2 Seuil de Vigueur) : Une grave blessure magique a réduit votre endurance au Chaos.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Top of Your Class (+1 Spell Casting): Cast everyday spells with remarkable ease.',
      fr: 'Premier de la classe (+1 Incantation) : Vous manipulez la magie courante avec agilité.',
    },
  },
  {
    modifier: 2,
    text: {
      en: 'Strong Attunement (+2 Graduation): Natural harmony with the Force made finals effortless.',
      fr: 'Bonne harmonisation (+2 Fin de formation) : Vous vous êtes parfaitement acclimaté au Chaos.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Rival Mage (Enemy): Earned a bitter arcane rival from day one.',
      fr: 'Ennemi magicien (ennemi) : Une haine tenace avec un rival s’est forgée à l’académie.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Botched Polymorph (-1 EMP): An altered feature left subtle arcane dissonance.',
      fr: 'Métamorphose ratée (–1 Empathie) : Une transformation a laissé une légère trace sur votre charisme.',
    },
  },
  {
    modifier: 0,
    text: {
      en: 'Extensive Research (+1 Novice Spell): Learned an extra spell from a forbidden tome.',
      fr: 'Recherches étendues (+1 Sort de Novice) : Un grimoire avancé vous a permis d’apprendre un sort bonus.',
    },
  },
];

export const MAGE_GRADUATION_OUTCOMES: readonly LocalizedText[] = [
  {
    en: 'Renegade (-1 EMP, -1 WILL, +1 Streetwise): Cast out or fled the academy to survive on the fringes.',
    fr: 'Renégat (–1 Empathie, –1 Volonté, +1 Connaissance de la rue) : Vous avez fui ou quitté l’académie en marge de la société.',
  },
  {
    en: 'Passed Without Distinction (-1 WILL): Scraped past final exams through sheer stubborn grit.',
    fr: 'Admis sans distinction (–1 Volonté) : Vous avez passé les épreuves finales non sans séquelles.',
  },
  {
    en: 'Solid Graduate (No modifier): Reliable initiate of the Brotherhood of Sorcerers.',
    fr: 'Formation sans encombres (aucun modificateur) : Membre accompli et fiable de la Confrérie.',
  },
  {
    en: 'Graduated with Honors (+1 WILL, +1 EMP): Distinguished scholar of the arcane arts.',
    fr: 'Formation avec les honneurs (+1 Volonté et +1 Empathie) : Diplômé d’élite de votre académie.',
  },
];

export const MAGE_IMPORTANT_EVENTS: readonly LocalizedText[] = [
  { en: 'Found and mentored a promising apprentice', fr: 'Trouvé et formé un apprenti' },
  { en: 'Hunted through a scheme by a rogue Black Mage', fr: 'Traqué par un mage noir renégat' },
  { en: 'Debated and collaborated alongside a Druid', fr: 'Œuvré aux côtés d’un Druide' },
  { en: 'Studied a Witcher’s mutations firsthand', fr: 'Étudié un Sorceleur en action' },
  { en: 'Served a noble’s dark courtly intrigues', fr: 'Servi un noble et ses intrigues' },
  { en: 'Traveled beyond the Continent’s borders', fr: 'Voyagé au-delà des frontières du Continent' },
  { en: 'Experienced a lasting romantic attachment', fr: 'Vécu une romance marquante' },
  { en: 'Foiled a plot against your academy', fr: 'Déjoué un complot contre votre académie' },
  { en: 'Driven out by witch-hunting mobs (Infamy)', fr: 'Chassé par des villageois excités (Infamie)' },
  { en: 'Honored by an entire village for your aid (Renown)', fr: 'Reconnu par tout un village (Gloire)' },
];

export const MAGE_CURRENT_STATUS: readonly LocalizedText[] = [
  { en: 'Court / Retained Mage for a lord or guild', fr: 'Mage attitré d’un seigneur ou d’une maison' },
  { en: 'Secluded researcher / Hermit', fr: 'Ermite retiré pour ses recherches' },
  { en: 'Resident town mage or Brotherhood agent', fr: 'Vie normale en ville ou agent de la Confrérie' },
  { en: 'Unemployed wandering hedge-wizard', fr: 'Sans emploi, errant sur les routes' },
  { en: 'Feared Black Mage operating in shadows', fr: 'Mage noir redouté agissant dans l’ombre' },
];

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function pick<T>(arr: readonly T[]): T {
  return arr[randomInt(arr.length)];
}

/**
 * Generates a single sibling description for Standard lifepath.
 */
export function rollSiblingDescription(lang: ModuleLanguage): string {
  if (lang === 'fr') {
    const gender = randomInt(2) === 0 ? 'Un frère' : 'Une sœur';
    const ageRoll = randomInt(10);
    const age =
      ageRoll === 9 ? 'jumeau/jumelle' : ageRoll < 5 ? 'aîné(e)' : 'cadet(te)';
    const traits = [
      'timide',
      'agressif',
      'gentil',
      'bizarre',
      'attentionné',
      'bavard',
      'romantique',
      'sévère',
      'dépressif',
      'immature',
    ];
    const feelings = [
      'qui veut votre mort',
      'qui ne vous supporte pas',
      'qui est jaloux de vous',
      '',
      '',
      '',
      '',
      'qui vous aime profondément',
      'qui vous admire',
      'qui est très possessif',
    ];
    const feeling = pick(feelings);
    return `${gender}, ${age}, ${pick(traits)}${feeling ? ` (${feeling})` : ''}`;
  }

  const gender = randomInt(2) === 0 ? 'Brother' : 'Sister';
  const ageRoll = randomInt(10);
  const age = ageRoll === 9 ? 'twin' : ageRoll < 5 ? 'older' : 'younger';
  const traits = [
    'shy',
    'aggressive',
    'kind',
    'strange',
    'thoughtful',
    'talkative',
    'romantic',
    'stern',
    'depressive',
    'immature',
  ];
  const feelings = [
    'wants you dead',
    'cannot stand you',
    'jealous of you',
    '',
    '',
    '',
    '',
    'loves you dearly',
    'looks up to you',
    'very possessive',
  ];
  const feeling = pick(feelings);
  return `${gender} (${age}, ${pick(traits)}${feeling ? ` — ${feeling}` : ''})`;
}

/**
 * Rolls a standard decade life event from the core lifepath tables.
 */
export function rollStandardDecadeEvent(lang: ModuleLanguage): string {
  const catRoll = randomInt(10) + 1;
  // 1-4 Fortune or Misfortune, 5-7 Allies & Enemies, 8-10 Romance
  if (catRoll <= 4) {
    const isFortune = randomInt(2) === 0;
    const roll = randomInt(10) + 1;
    if (isFortune) {
      const crowns = (randomInt(10) + 1) * 100;
      const pet = randomInt(10) + 1 < 8
        ? lang === 'fr' ? 'chien' : 'dog'
        : lang === 'fr' ? 'loup' : 'wolf';
      const frFortunes = [
        `Jackpot : un coup de chance vous rapporte ${crowns} couronnes.`,
        "Enseignement : +1 dans une compétence d'INT (ou nouvelle compétence INT à +2).",
        "Faveur d'un noble : un aristocrate vous doit un service.",
        'Entraînement martial : +1 dans une compétence de combat (ou nouvelle à +2).',
        "Faveur d'un sorceleur : vous avez gagné la gratitude d'un sorceleur.",
        'Lié à un gang : une faveur par mois auprès d’une bande de bandits.',
        `Domptage : vous avez apprivoisé un ${pet} sauvage.`,
        "Faveur d'un mage : un puissant magicien vous doit un service.",
        'Béni par un prêtre : symbole sacré conférant +2 en Charisme avec son clergé.',
        'Anobli : fait chevalier dans votre royaume (+2 en Réputation locale).',
      ];
      const enFortunes = [
        `Jackpot: a stroke of luck brings you ${crowns} crowns.`,
        'Teacher: gain +1 in an INT skill or start one at +2.',
        'Noble Favor: a noble owes you a reasonable favor.',
        'Combat Teacher: +1 in any combat skill or start one at +2.',
        'Witcher Favor: a witcher owes you a favor.',
        'Fell in with Bandits: call on a bandit gang once per month.',
        `Tamed Wild Animal: befrended a wild ${pet}.`,
        'Mage Favor: a powerful mage owes you a favor.',
        'Blessed by a Priest: sacred symbol (+2 Charisma with that faith).',
        'Knighted: +2 Reputation and knighthood in your home kingdom.',
      ];
      return (lang === 'fr' ? frFortunes : enFortunes)[roll - 1];
    }

    const debt = (randomInt(10) + 1) * 100;
    const months = randomInt(10) + 1;
    const frMisfortunes = [
      `Dette : vous devez ${debt} couronnes.`,
      `Emprisonnement : ${months} mois derrière les barreaux.`,
      'Dépendance : vous avez développé une addiction.',
      'Proche tué : un ami, amant ou parent a été assassiné ou victime d’un accident.',
      'Fausse accusation : accusé à tort d’un crime grave.',
      'Chassé par la loi : des gardes ou une cité entière vous recherchent.',
      'Trahison : un proche vous a trahi ou victime de chantage.',
      'Accident grave : blessure, cicatrice ou cauchemars persistants.',
      'Séquelle : affaiblissement physique ou trouble d’angoisse (–5 PS ou jets d’étourdissement).',
      'Maudit : une malédiction pèse sur vous (à définir avec le MJ).',
    ];
    const enMisfortunes = [
      `Debt: deep in debt for ${debt} crowns.`,
      `Imprisonment: spent ${months} months locked up.`,
      'Addiction: developed a severe addiction.',
      'Loved One Killed: friend, lover, or kin lost to tragedy.',
      'False Accusation: framed for a serious crime.',
      'Hunted by the Law: guards or a whole city are after you.',
      'Betrayal: blackmailed or betrayed by someone close.',
      'Accident: scarred, disfigured, or plagued by nightmares.',
      'Incapacity: lingering ailment (-5 HP or panic fits).',
      'Cursed: afflicted with a lingering hex (GM discretion).',
    ];
    return (lang === 'fr' ? frMisfortunes : enMisfortunes)[roll - 1];
  }

  if (catRoll >= 8) {
    const roll = randomInt(10) + 1;
    if (roll === 1) {
      return lang === 'fr'
        ? 'Romance idyllique : vous formez un couple heureux.'
        : 'Happy Love Affair: a genuine, joyful romance.';
    }
    if (roll <= 4) {
      return lang === 'fr'
        ? 'Tragédie romantique : séparation brutale, disparition ou enlèvement de votre bien-aimé(e).'
        : 'Romantic Tragedy: lover vanished, captured, or torn away by fate.';
    }
    if (roll <= 6) {
      return lang === 'fr'
        ? 'Relation compliquée : rivalité, jalousie ou désapprobation familiale.'
        : 'Problematic Love: complicated by rivalry, jealousy, or family opposition.';
    }
    return lang === 'fr'
      ? 'Débauche : aventures sans lendemain et nuits agitées dans les tavernes.'
      : 'Debauchery: wild nights across taverns and brothels.';
  }

  const isAlly = randomInt(2) === 0;
  if (isAlly) {
    const rolesFr = [
      'Chasseur de primes',
      'Mage',
      'Artisan',
      "Ami d'enfance",
      'Soldat',
      'Barde',
      'Prêtre',
      'Noble',
    ];
    const rolesEn = [
      'Bounty Hunter',
      'Mage',
      'Craftsman',
      'Childhood Friend',
      'Soldier',
      'Bard',
      'Priest',
      'Noble',
    ];
    const power = ['Connaissance', 'Ami proche', 'Lié par serment'];
    const powerEn = ['Acquaintance', 'Close Friend', 'Bound by Oath'];
    return lang === 'fr'
      ? `Allié : ${pick(rolesFr)} (${pick(power)}).`
      : `Ally: ${pick(rolesEn)} (${pick(powerEn)}).`;
  }

  const enemyRolesFr = [
    'Ancien ami',
    'Soldat',
    'Bandit',
    'Magicien',
    'Cultiste',
    'Noble',
  ];
  const enemyRolesEn = [
    'Former Friend',
    'Soldier',
    'Bandit',
    'Mage',
    'Cultist',
    'Noble',
  ];
  const threat = randomInt(10) + 1;
  return lang === 'fr'
    ? `Ennemi : ${pick(enemyRolesFr)} (menace ${threat}/10).`
    : `Enemy: ${pick(enemyRolesEn)} (power ${threat}/10).`;
}

/**
 * Generates a Witcher decade event honoring safety level odds & fixed bug logic.
 */
export function rollWitcherDecadeEvent(
  risk: DecadeRiskLevel,
  lang: ModuleLanguage
): string {
  const dangerThresholds: Record<DecadeRiskLevel, number> = {
    safe: 10,
    ordinary: 25,
    reckless: 50,
    risky: 75,
  };
  const rollDanger = randomInt(100) + 1;
  const parts: string[] = [];

  if (rollDanger <= dangerThresholds[risk]) {
    const kind = randomInt(10) + 1;
    if (kind <= 3) {
      parts.push(
        lang === 'fr'
          ? 'Danger — Dette, prison, trahison ou malédiction contractée sur la Voie.'
          : 'Danger — Contracted a heavy debt, imprisonment, betrayal, or curse on the Path.'
      );
    } else if (kind <= 6) {
      const woundsFr = [
        'Blessure — Genou rigide (–1 VIT).',
        'Blessure — Œil endommagé (–1 Vigilance vue).',
        'Blessure — Bras raide (–1 Mêlée).',
        'Blessure — Doigts endommagés (Signes gênés d’une main).',
        'Blessure — Venin persistant (–5 PS).',
        'Blessure — Énorme cicatrice (–2 Charisme/Séduction).',
      ];
      const woundsEn = [
        'Wound — Stiff Knee (-1 SPD).',
        'Wound — Damaged Eye (-1 Awareness sight).',
        'Wound — Stiff Arm (-1 Melee).',
        'Wound — Mangled Fingers (harder Signs).',
        'Wound — Venom Scars (-5 HP).',
        'Wound — Huge Scar (-2 Charisma/Seduction).',
      ];
      parts.push(pick(lang === 'fr' ? woundsFr : woundsEn));
    } else {
      const alive = randomInt(100) + 1 > 30;
      parts.push(
        lang === 'fr'
          ? `Ennemi : un adversaire tenace (${alive ? 'toujours en vie' : 'mort depuis'}).`
          : `Enemy: a lingering foe (${alive ? 'still alive' : 'since deceased'}).`
      );
    }
  }

  const ev = randomInt(10) + 1;
  if (risk === 'safe' && ev === 1) {
    parts.push(
      lang === 'fr'
        ? 'Bénéfice : Droit de Surprise, aubaine financière ou secret d’alchimie transmis.'
        : 'Benefit: Law of Surprise, windfall coin, or lost witcher formula shared.'
    );
  } else if (risk === 'safe' && ev === 2) {
    parts.push(
      lang === 'fr'
        ? 'Allié rencontré lors d’une chasse périlleuse.'
        : 'Ally befriended during a perilous hunt.'
    );
  } else if (risk === 'safe' && ev === 3) {
    parts.push(
      lang === 'fr'
        ? 'Chasse mémorable contre un monstre (contrat compliqué mais instructif).'
        : 'Notable monster contract (complicated twist, valuable experience).'
    );
  } else if (risk === 'ordinary' && ev <= 2) {
    parts.push(
      ev === 1
        ? lang === 'fr'
          ? 'Bénéfice : faveur d’un noble, d’un mage ou économies notables.'
          : 'Benefit: favor from a noble or mage, or solid coin saved.'
        : lang === 'fr'
          ? 'Allié rencontré sur la route.'
          : 'Ally met on the road.'
    );
  } else if (risk === 'ordinary' && ev <= 5) {
    parts.push(
      lang === 'fr'
        ? 'Chasse : traque mouvementée d’un nécrophage, spectre ou hybride.'
        : 'Hunt: eventful contract against a necrophage, specter, or hybrid.'
    );
  } else if (risk === 'reckless' && ev <= 2) {
    parts.push(
      lang === 'fr'
        ? 'Bénéfice majeur : formule alchimique rare ou entraînement auprès d’un maître.'
        : 'Major Benefit: rare alchemy formula or study with a master.'
    );
  } else if (risk === 'reckless' && ev <= 7) {
    parts.push(
      lang === 'fr'
        ? 'Allié ou chasse difficile ayant forgé votre réputation.'
        : 'Close ally forged or tough monster hunt survived.'
    );
  } else if (risk === 'risky' && ev <= 5) {
    parts.push(
      lang === 'fr'
        ? 'Bénéfice exceptionnel : butin de ruines anciennes ou faveur royale.'
        : 'Exceptional Benefit: ancient ruins relic or royal favor.'
    );
  } else if (risk === 'risky' && ev <= 9) {
    parts.push(
      lang === 'fr'
        ? 'Chasse légendaire ou allié lié par serment.'
        : 'High-stakes hunt or oath-bound ally.'
    );
  } else if (parts.length === 0) {
    parts.push(
      lang === 'fr'
        ? 'Décennie calme sans incident notable.'
        : 'Uneventful decade on the Path.'
    );
  }

  return parts.join(' ');
}

/**
 * Generates a Mage decade event fixing legacy B7/B1 bugs.
 */
export function rollMageDecadeEvent(
  risk: DecadeRiskLevel,
  lang: ModuleLanguage
): string {
  const odds: Record<DecadeRiskLevel, { b: number; a: number; m: number }> = {
    safe: { b: 1, a: 2, m: 3 },
    ordinary: { b: 1, a: 3, m: 5 },
    reckless: { b: 2, a: 7, m: 8 },
    risky: { b: 5, a: 7, m: 9 },
  };
  const roll = randomInt(10) + 1;
  const threshold = odds[risk];

  if (roll <= threshold.b) {
    const perksFr = [
      'Investissement : acquisition d’une tour de mage ou d’un petit domaine.',
      'Romance : connexion sincère malgré votre statut de mage.',
      'Abondance : importantes économies après paiement de vos ingrédients.',
      'Faveur d’un noble : un aristocrate vous doit un service.',
      'Secret de magicien : un ermite vous a transmis un sort, rituel ou signe.',
      'Anobli : +1 en Réputation dans un royaume pour service rendu.',
      'Allié à des bandits ou Scoia’tael : service mensuel raisonnable.',
      'Ruines explorées : découverte d’un artefact ou grimoire elfique/nain.',
      'Faveur d’un sorceleur : vous avez aidé un sorceleur en difficulté.',
      'Mentor trouvé : +1 dans une compétence INT (ou nouvelle à +2).',
    ];
    const perksEn = [
      'Investment: acquired a mage tower or modest estate.',
      'Romance: genuine romantic bond beyond your arcane life.',
      'Windfall: substantial coin saved beyond component expenses.',
      'Noble Favor: an aristocrat owes you a favor.',
      'Arcane Secret: an old hermit taught you a forgotten spell or ritual.',
      'Titled for Valor: +1 Reputation in a kingdom.',
      'Bandit Pact: monthly favor from an outlaw or Scoia’tael band.',
      'Explored Ruins: uncovered an elven enhancement or dwarven heirloom.',
      'Witcher Favor: aided a witcher who now owes you.',
      'Mentor: +1 in an INT skill or start a new one at +2.',
    ];
    return pick(lang === 'fr' ? perksFr : perksEn);
  }

  if (roll <= threshold.a) {
    return lang === 'fr'
      ? 'Allié : lien forgé avec un autre érudit, soldat ou dignitaire.'
      : 'Ally: lasting bond forged with a scholar, soldier, or dignitary.';
  }

  if (roll <= threshold.m) {
    const complication = randomInt(10) < 4;
    if (!complication) {
      return lang === 'fr'
        ? 'Mission accomplie : conspiration déjouée, malédiction levée ou renseignement.'
        : 'Mission Completed: lifted a curse, gathered intel, or navigated intrigue.';
    }
    return lang === 'fr'
      ? 'Mission compliquée : piège d’une Loge rivale entraînant blessure, dette ou ennemi.'
      : 'Botched Mission: rival Lodge trap left lingering debt, scar, or enemy.';
  }

  return lang === 'fr'
    ? 'Années paisibles consacrées à l’étude.'
    : 'Quiet years dedicated to arcane study.';
}
