import type { WitcherContractEntry } from '../types';

/**
 * All 11 Official Notice-Board Contracts from "Le Journal du Sorcelleur" (18_contrats.md).
 */
export const OFFICIAL_WITCHER_CONTRACTS: readonly WitcherContractEntry[] = [
  {
    id: 'contract-01',
    number: 1,
    title: {
      fr: 'Les catacombes du manoir Zielinski',
      en: 'Catacombs of Zielinski Manor',
    },
    client: {
      fr: 'Majordome Leznica (pour le duc Zielinski)',
      en: 'Butler Leznica (for Duke Zielinski)',
    },
    location: {
      fr: 'Catacombes du manoir Zielinski',
      en: 'Catacombs of Zielinski Manor',
    },
    reward: {
      fr: '200 couronnes',
      en: '200 Crowns',
    },
    noticeText: {
      fr: 'Pour le compte du duc Zielinski, le majordome Leznica récompensera quiconque sera capable de débarrasser les catacombes du manoir Zielinski des putréfacteurs. Une récompense généreuse de 200 couronnes vous sera remise une fois l’extermination accomplie. Attention, il s’agit d’un travail exigeant. Les catacombes doivent être laissées en parfait état.',
      en: 'On behalf of Duke Zielinski, Butler Leznica will reward anyone capable of clearing the rotfiends from the catacombs of Zielinski Manor. A generous sum of 200 crowns shall be paid upon completion. Beware: this is delicate work — the catacombs must be left in pristine condition.',
    },
    gmHint: {
      fr: 'Les putréfacteurs explosent en mourant : préserver l’architecture des catacombes interdit les bombes ou sorts destructeurs et force à attirer ou neutraliser les bêtes autrement.',
      en: 'Rotfiends explode upon death — keeping the catacombs intact rules out sloppy explosives or fireballs and forces careful luring or incapacitation.',
    },
    suggestedTier: 'easy',
    suggestedMonster: {
      fr: 'Putréfacteurs (Nécrophages)',
      en: 'Rotfiends (Necrophages)',
    },
  },
  {
    id: 'contract-02',
    number: 2,
    title: {
      fr: 'Le cyclope des collines',
      en: 'Cyclops in the Hills',
    },
    client: {
      fr: 'Un paysan endeuillé',
      en: 'A grieving villager',
    },
    location: {
      fr: 'Les collines environnantes',
      en: 'Surrounding hills',
    },
    reward: {
      fr: 'Peu d’argent (ou son fils par la Loi de la Surprise)',
      en: 'Scant coin (or his good-for-nothing son)',
    },
    noticeText: {
      fr: 'Sire sorceleur, vous qui passez par-là,\nMon frère s’est fait manger par un cyclope il y a six jours. J’ai vu la bête rôder dans les collines, mais c’est un trop gros morceau pour un gars comme moi. Je n’ai pas grand-chose, à part un bon à rien de fils, et il paraît que les sorceleurs acceptent aussi bien les jeunes hommes que l’argent.',
      en: 'Master witcher, passing through,\nMy brother got eaten by a cyclops six days back. I saw the beast prowling the hills, too big a job for a man like me. Haven’t got much to pay with, save for a useless son, and folk say witchers take lads same as coin.',
    },
    gmHint: {
      fr: 'Le cyclope est une menace mortelle (Ogroïde). Choix moral sur la récompense : refuser le fils, le recruter comme écuyer ou négocier avec les anciens du village.',
      en: 'A Cyclops is a lethal Ogroid opponent. Strong moral hook around refusing the boy, hiring him as a camp hand, or rallying the village.',
    },
    suggestedTier: 'easy',
    suggestedMonster: {
      fr: 'Cyclope (Ogroïde)',
      en: 'Cyclops (Ogroid)',
    },
  },
  {
    id: 'contract-03',
    number: 3,
    title: {
      fr: 'La bourde d’un associé mage',
      en: 'A Mage Associate’s Blunder',
    },
    client: {
      fr: 'Anonyme (via messager)',
      en: 'Anonymous (via courier)',
    },
    location: {
      fr: 'Lieu de rendez-vous secret',
      en: 'Secret rendezvous',
    },
    reward: {
      fr: 'À négocier lors de la rencontre',
      en: 'Negotiated at meeting',
    },
    noticeText: {
      fr: 'J’ai besoin d’un sorceleur expérimenté. Un associé versé dans la magie a commis une grave erreur, et sans l’aide d’un sorceleur je crains que cette bourde fasse de nombreux morts. Plus d’explications lors de notre rencontre. Le messager vous transmettra le lieu de rendez-vous.',
      en: 'Experienced witcher needed urgently. An associate versed in the arcane has made a grave mistake, and without a witcher’s aid I fear many lives will be lost. Further details in person. The courier will give you the meeting place.',
    },
    gmHint: {
      fr: 'Idéal pour introduire une invocation goétique qui a mal tourné, un élémentaire déchaîné, un golem hors de contrôle ou une expérience mutagène.',
      en: 'Ideal hook for a botched summoning, rogue golem, unbound elemental, or mutant experiment gone wrong.',
    },
    suggestedTier: 'moderate',
    suggestedMonster: {
      fr: 'Élémentaire / Golem / Démon',
      en: 'Elemental / Golem / Demon',
    },
  },
  {
    id: 'contract-04',
    number: 4,
    title: {
      fr: 'La bête de la lande',
      en: 'The Beast on the Moor',
    },
    client: {
      fr: 'Une artiste protégée par la duchesse Locklear',
      en: 'A performer under Duchess Locklear’s patronage',
    },
    location: {
      fr: 'La lande (nuit)',
      en: 'The moors (at night)',
    },
    reward: {
      fr: 'Poignée de couronnes + faveur de la duchesse Locklear',
      en: 'Handful of crowns + Duchess Locklear’s favor',
    },
    noticeText: {
      fr: 'Bonnes gens,\nAyez pitié d’une pauvre artiste qui s’efforce de gagner sa vie dans ce monde obscur et dépravé. Lors de ma promenade nocturne, j’ai assisté à un spectacle si horrible que j’ai à présent besoin d’un bretteur bien intentionné pour protéger ma personne ! La nuit dernière, sur la lande, j’ai espionné une bête d’une stature remarquable qui violentait une femme de petite vertu ! Hélas, la bête m’a vue tandis que je l’observais de loin, et depuis, je crains qu’elle ne s’en prenne à moi. Je ne puis promettre qu’une poignée de couronnes en guise de récompense, mais je parlerai en bien de mon sauveur à ma protectrice, la duchesse Locklear.',
      en: 'Good people,\nHave pity on a poor artist striving to make a living in this dark, depraved world! During an evening stroll I witnessed a sight so foul I now require a capable swordsman for protection. Last night on the moor I spied a beast of remarkable stature savaging a woman of ill repute — and alas, it spotted me watching! I can promise only a handful of crowns, yet I shall sing my savior’s praises to my patroness, Duchess Locklear.',
    },
    gmHint: {
      fr: 'La réputation auprès de la duchesse Locklear peut servir de levier politique ou d’entrée dans la haute société.',
      en: 'Duchess Locklear’s favor makes a strong political or high-society reward hook.',
    },
    suggestedTier: 'moderate',
    suggestedMonster: {
      fr: 'Loup-garou / Leshen / Katakan',
      en: 'Werewolf / Leshen / Katakan',
    },
  },
  {
    id: 'contract-05',
    number: 5,
    title: {
      fr: 'La chose ailée de la rivière',
      en: 'Winged Horror by the River',
    },
    client: {
      fr: 'Un ivrogne (paiement par le bourgmestre)',
      en: 'A local drunk (burgomaster may pay)',
    },
    location: {
      fr: 'La rivière & vieilles ruines',
      en: 'The river & old ruins',
    },
    reward: {
      fr: 'À négocier avec le bourgmestre',
      en: 'Negotiate with the burgomaster',
    },
    noticeText: {
      fr: 'J’ai repéré quelque chose à la rivière, un truc qui est pas censé y être. Je sais pas ce que c’était. Pour être honnête, je crois que j’avais un peu bu. La chose avait des ailes et une figure à faire mugir de peur une vache. J’ai pas beaucoup d’argent, mais le bourgmestre pourrait vous payer. La chose s’est envolée vers les vieilles ruines.',
      en: 'Spotted summat down by the river that don’t belong there. Don’t rightly know what it was — truth be told I’d had a few — but it had wings and a mug ugly enough to sour milk. Ain’t got much coin, though the burgomaster might pay ye. It flew off toward the old ruins.',
    },
    gmHint: {
      fr: 'Témoin peu fiable (Indice avec Dissimulation élevée ou fausse piste). Peut être une wyverne, un basilic, un griffon ou une harpie.',
      en: 'Unreliable witness (high Concealment clues). Could be a Wyvern, Cockatrice, Griffin, or Siren/Harpy.',
    },
    suggestedTier: 'easy',
    suggestedMonster: {
      fr: 'Draconide / Hybride (Wyverne, Griffon…)',
      en: 'Draconid / Hybrid (Wyvern, Griffin…)',
    },
  },
  {
    id: 'contract-06',
    number: 6,
    title: {
      fr: 'La malédiction de Samuel Riddick',
      en: 'Samuel Riddick’s Curse',
    },
    client: {
      fr: 'Samuel Riddick',
      en: 'Samuel Riddick',
    },
    location: {
      fr: 'Demeure de Samuel Riddick',
      en: 'Samuel Riddick’s residence',
    },
    reward: {
      fr: '1 000 couronnes',
      en: '1,000 Crowns',
    },
    noticeText: {
      fr: 'Maître sorceleur,\nEn temps normal, je n’aurais pas requis l’aide d’un mutant tel que vous, mais je crains que vous ne soyez le seul à pouvoir soulager le malheur qui m’accable. Bien que je n’aie pas vu de monstre, je crois de tout mon cœur être la proie d’une forme de malédiction. Récemment, mes nuits sont devenues un enfer, tandis que la journée, je me surprends à broyer du noir et à ressasser des idées perturbantes. Les remèdes des prêtres sont restés sans effet, et j’ai bien peur que Kreve m’ait abandonné. C’est le cœur empli de désespoir que j’implore votre aide. Bien sûr, je n’ai pas omis la récompense. 1 000 couronnes payées au terme du contrat.\n− Samuel Riddick',
      en: 'Master Witcher,\nOrdinarily I would never seek aid from a mutant, yet I fear you alone can lift the affliction tormenting me. Though I have seen no monster, I am certain I am cursed: my nights are a waking hell, and by day I am consumed by bleak, disturbing thoughts. Even the priests’ remedies failed, and I fear Kreve has forsaken me. Despair drives me to beg your help. A reward of 1,000 crowns will be paid upon completion.\n− Samuel Riddick',
    },
    gmHint: {
      fr: 'Symptômes typiques d’un Hym ou d’un spectre lié à une culpabilité cachée : une enquête morale (Complexité 50 à 100) est idéale.',
      en: 'Classic symptoms of a Hym feeding on hidden guilt (or a Penitent). A moral investigation (Complexity 50–100) fits best.',
    },
    suggestedTier: 'moderate',
    suggestedMonster: {
      fr: 'Hym / Spectre (Vestige / Maudit)',
      en: 'Hym / Wraith (Relict / Cursed)',
    },
  },
  {
    id: 'contract-07',
    number: 7,
    title: {
      fr: 'Disparitions dans les marais',
      en: 'Missing in the Swamps',
    },
    client: {
      fr: 'Une épouse inquiète',
      en: 'A desperate wife',
    },
    location: {
      fr: 'Les marais',
      en: 'The swamps',
    },
    reward: {
      fr: '100 couronnes',
      en: '100 Crowns',
    },
    noticeText: {
      fr: 'J’ai désespérément besoin d’un sorceleur ou même d’un magicien. Il y a un jour, mon mari est parti chasser dans les marais, mais il n’est jamais revenu. Son frère est allé à sa recherche ce matin, lui aussi s’est volatilisé. Ce sont des hommes honnêtes qui ont connu leur lot de danger, alors je suis certaine qu’ils sont encore en vie. Je vous paierai cent couronnes.',
      en: 'Desperately seeking a witcher or even a mage. Yesterday my husband went hunting in the marshes and never came back. His brother set out looking for him this morning and vanished too. Honest, capable men — I know they must still be alive. I can pay 100 crowns.',
    },
    gmHint: {
      fr: 'Parfait pour un mystère avec Compte à rebours (2 jours avant qu’ils ne soient dévorés par des guenaudes aquatiques, un noyadé ou un brumelet).',
      en: 'Great fit for a 2-day Countdown mystery before a Foglet, Water Hag, or Drowner pack finishes the captives.',
    },
    suggestedTier: 'easy',
    suggestedMonster: {
      fr: 'Guenaude aquatique / Brumelet / Noyeur',
      en: 'Water Hag / Foglet / Drowner',
    },
  },
  {
    id: 'contract-08',
    number: 8,
    title: {
      fr: 'Le domaine palatial de Reynard d’Attre',
      en: 'Reynard d’Attre’s Palatial Estate',
    },
    client: {
      fr: 'Reynard d’Attre',
      en: 'Reynard d’Attre',
    },
    location: {
      fr: 'Domaine hérité de son oncle',
      en: 'Inherited manor estate',
    },
    reward: {
      fr: '200 couronnes',
      en: '200 Crowns',
    },
    noticeText: {
      fr: 'Aux personnes compétentes,\nJ’ai récemment déménagé avec ma famille dans le domaine palatial de mon oncle et j’ai souffert d’humiliations qui nécessitent l’intervention d’un sorceleur ou d’un spécialiste de la chasse aux monstres. Personne n’a été blessé, mais je ne resterai pas une nuit de plus tant que l’on n’aura pas expulsé la créature qui guette le moindre de mes mouvements. Les villageois débitent des sornettes sur les esprits des bois qu’il faudrait apaiser, mais je n’avalerai pas ces racontars. J’ai surpris une petite silhouette qui filait vers mon cellier et entendu des grattements sous mon lit conjugal. Je suis prêt à verser la somme raisonnable de 200 couronnes.\n− Reynard d’Attre',
      en: 'To persons of competence,\nI recently moved my family into my uncle’s palatial estate and have suffered indignities requiring a witcher or monster specialist. No one is harmed, yet I will not stay another night until the creature watching my every move is driven out. Villagers prattle about appeasing woodland spirits, which I refuse to swallow. I spotted a small figure darting toward the cellar and heard scratching under my marriage bed. I offer a reasonable 200 crowns.\n− Reynard d’Attre',
    },
    gmHint: {
      fr: 'Silhouette petite + cellier + esprits du foyer : probablement un Boïtak (Godling), un Lutin/Follelet ou un Púca attaché à l’oncle défunt — négociation préférable au combat !',
      en: 'Small figure + cellar + household folklore: likely a Godling or Púca loyal to the late uncle — peaceful diplomacy beats bloodshed.',
    },
    suggestedTier: 'easy',
    suggestedMonster: {
      fr: 'Boïtak / Púca (Vestige pacifique)',
      en: 'Godling / Púca (Peaceful Relict)',
    },
  },
  {
    id: 'contract-09',
    number: 9,
    title: {
      fr: 'Ombres dans les recoins obscurs',
      en: 'Shadows in Dark Corners',
    },
    client: {
      fr: 'Anonyme terrifié',
      en: 'Terrified anonymous author',
    },
    location: {
      fr: 'Demeure urbaine close',
      en: 'Locked urban residence',
    },
    reward: {
      fr: 'Forte récompense (même pour l’intermédiaire)',
      en: 'Substantial reward (even for a referral)',
    },
    noticeText: {
      fr: 'Bonnes gens,\nJ’ai urgemment besoin de l’aide d’un sorceleur ou d’un chasseur de monstres professionnel. J’offre une forte récompense à quiconque me mettra en contact avec un tel individu. Je n’arrive pas à tenir le compte des dangers qui ont menacé ma vie, étant donné que je n’ai toujours pas réussi à percer les mystères de mon affliction. Mais je puis vous assurer que sans le soutien d’un escrimeur aguerri et d’un esprit vif, je serai mort avant l’été. Pendant que j’écris cette missive, mes mains tremblent, mes yeux sont attirés par les recoins obscurs et les bruits qui éclatent soudainement dans ma chambre. Si vous avez la moindre expérience dans la chasse aux monstres ou connaissez un professionnel, je vous supplie de répondre sans tarder à ce message.',
      en: 'Good folk,\nI urgently require a witcher or professional monster hunter and offer a handsome reward to anyone who puts me in touch with one. I can no longer count the threats on my life, nor unravel the mystery of my affliction, yet without a keen blade and sharper mind I shall be dead before summer. Even as I write, my hands shake and my eyes dart to every dark corner and sudden sound. Please respond without delay.',
    },
    gmHint: {
      fr: 'Paranoïa nocturne, bruits et terreur ciblée : peut impliquer un Barghest, un Doppleganger ennemi, un spectre d’assassin ou un contrat de vendetta.',
      en: 'Creeping paranoia & dark corners: fits a Barghest, Nightwraith, hidden Assassin, or Doppler.',
    },
    suggestedTier: 'moderate',
    suggestedMonster: {
      fr: 'Spectre / Barghest / Vampire mineur',
      en: 'Nightwraith / Barghest / Lesser Vampire',
    },
  },
  {
    id: 'contract-10',
    number: 10,
    title: {
      fr: 'Disparition à la nouvelle lune',
      en: 'Missing on the New Moon',
    },
    client: {
      fr: 'Conseil du village / Bûcherons',
      en: 'Village Council / Woodcutters',
    },
    location: {
      fr: 'Forêt voisine (avant la pleine lune)',
      en: 'Nearby woods (before full moon)',
    },
    reward: {
      fr: 'Collecte villageoise (à négocier)',
      en: 'Village collection (negotiable)',
    },
    noticeText: {
      fr: 'C’est le cœur lourd de chagrin que j’annonce la disparition de notre bon Pawel. C’était un garçon sérieux et un solide bûcheron. Je n’ai toujours aucune idée de ce qui lui a pris d’entrer dans les bois le soir de la nouvelle lune, mais je me dois d’être clair avec tous les membres de notre communauté : nous cessons les recherches. La pleine lune approche, nous devons nous préparer.',
      en: 'With a heavy heart I announce the disappearance of good Pawel, a steady lad and fine woodcutter. I know not what possessed him to enter the woods on the night of the new moon, yet I must be plain with our community: the search is over. The full moon draws near, and we must prepare.',
    },
    gmHint: {
      fr: 'Compte à rebours naturel lié au Calendrier lunaire ! Soit Pawel a été mordu (lycanthropie imminente à la pleine lune), soit un loup-garou sévit dans le village.',
      en: 'Natural lunar Countdown! Either Pawel was bitten and is about to turn at full moon, or another villager is the werewolf.',
    },
    suggestedTier: 'moderate',
    suggestedMonster: {
      fr: 'Loup-garou (Maudit)',
      en: 'Werewolf (Cursed One)',
    },
  },
  {
    id: 'contract-11',
    number: 11,
    title: {
      fr: 'L’invitée du domaine Damiani',
      en: 'The Guest of Damiani Manor',
    },
    client: {
      fr: 'Une servante (en secret du maître)',
      en: 'A terrified maid (without master’s consent)',
    },
    location: {
      fr: 'Domaine Damiani',
      en: 'Damiani Estate',
    },
    reward: {
      fr: 'Or et joyaux (si Damiani est libéré)',
      en: 'Gold & jewels (once Damiani is freed)',
    },
    noticeText: {
      fr: 'Maître sorceleur,\nJ’espère que vous lirez ce message et viendrez rapidement au domaine Damiani. Nous avons à tout prix besoin d’un sorceleur tel que vous. Ces dernières années, j’ai travaillé comme servante pour la famille Damiani. Je n’ai jamais eu de raison de me quereller et les dieux m’ont accordé assez de bon sens pour que je reste à ma place. Hélas, je crains que mon maître soit en danger, et j’ai fait parvenir ce mot sans obtenir l’aval de mon seigneur.\nDepuis peu, mon maître accueille une femme de la ville qui, fait surprenant, bat les serviteurs. C’est une femme séduisante, et maître Damiani semble sous le charme, mais elle est tellement étrange et leur affection a été si soudaine, presque surnaturelle. La femme a une peau d’albâtre et aucun serviteur ne l’a jamais entendu parler. Maître Damiani l’a introduite dans sa demeure une nuit, et depuis quelque temps, nous la croisons tous les soirs. Un jour, Glendys qui travaille aux cuisines a surpris le regard de la femme, elle dit que ses yeux étaient froids et noirs comme ceux d’un loup.\nNous n’avons pas beaucoup d’argent, maître sorceleur, mais je suis sûre qu’une fois libéré de ce maléfice, maître Damiani vous offrira une belle récompense en or et en joyaux. Je vous en prie, hâtez-vous. Les nuits deviennent inquiétantes et je jure avoir vu une silhouette se mouvoir dans les quartiers des serviteurs hier au soir.',
      en: 'Master Witcher,\nI pray you read this and hurry to the Damiani estate. We desperately need a witcher. I have served the Damiani family faithfully for years, yet I fear my master is in mortal peril and send this letter without his knowledge.\nOf late my master has housed a woman from the city who beats the servants. She is alluring, and Master Damiani seems bewitched — their affection arose so suddenly it feels unnatural. Her skin is alabaster white, no servant has heard her utter a single word, and we only ever see her after dusk. Kitchen maid Glendys once caught her gaze and swore her eyes were as cold and black as a wolf’s.\nWe lack coin, yet once freed from her spell Master Damiani will surely reward you richly in gold and gems. Please hurry — I swear I saw a figure prowling the servants’ quarters last night.',
    },
    gmHint: {
      fr: 'Peau d’albâtre, muette, nocturne, charme surnaturel, yeux noirs de loup : signe classique d’une Brouxe (Bruxa) ou d’une Alpe (Alp) !',
      en: 'Alabaster skin, mute, nocturnal, supernatural charm, black eyes: classic signs of a Bruxa or Alp!',
    },
    suggestedTier: 'hard',
    suggestedMonster: {
      fr: 'Brouxe / Alpe (Vampire)',
      en: 'Bruxa / Alp (Vampire)',
    },
  },
];
