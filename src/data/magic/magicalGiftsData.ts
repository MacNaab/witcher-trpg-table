import type { MagicalGiftEntry } from './types';

/**
 * The 14 Magical Gifts ("The Magical Mundane" — A Tome of Chaos, 05_druids.md).
 * Grants Vigor Threshold 2 at the cost of a matching Side Effect.
 * Forbidden for Mages, Druids, Priests, Witchers, or races unable to become Mages.
 */
export const MAGICAL_GIFTS_DATA: readonly MagicalGiftEntry[] = [
  // ======================== MINOR GIFTS (6) ========================
  {
    id: 'gift-calm-animals',
    name: { en: 'Calm Animals', fr: 'Apaisement des bêtes' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Calm a Beast that does not have a Medium or Hard Threat Rating; it treats you and allies as friendly unless provoked.',
      fr: 'En 1 action, apaise une Bête de menace Inférieure à Moyenne : elle vous considère (ainsi que vos alliés) comme amicaux tant qu’on ne la provoque pas.',
    },
    sideEffect: {
      en: 'Beasts of Threat Rating Medium or Hard are enraged by your presence and prioritize attacking you.',
      fr: 'Les bêtes de menace Moyenne ou Difficile sont enragées par votre présence et vous ciblent en priorité.',
    },
  },
  {
    id: 'gift-fear-aura',
    name: { en: 'Fear Aura', fr: 'Aura de terreur' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Everyone within 4m must make a DC:12 Resist Magic check or be frightened (-2 to any action against you for 24 hours).',
      fr: 'Émet une aura dans un rayon de 4 m : Résistance à la magie SD 12 requis ou effrayé (–2 à toute action contre vous pendant 24 h).',
    },
    sideEffect: {
      en: 'Count as one level lower on the Social Standing Chart (min Hated); members of your own race treat you as Tolerated instead of Equal.',
      fr: 'Statut social réduit d’un cran (min Haï) ; même votre propre race vous considère Toléré au lieu d’Égal.',
    },
  },
  {
    id: 'gift-fleet-of-foot',
    name: { en: 'Fleet of Foot', fr: 'Pied léger' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Double the range of your LEAP for 1 Round.',
      fr: 'Double la portée de votre SAUT (LEAP) pendant 1 round.',
    },
    sideEffect: {
      en: 'Whenever knocked back, you travel an additional 4m, increasing impact collision damage.',
      fr: 'Chaque projection (Knock-Back) vous repousse de 4 m supplémentaires.',
    },
  },
  {
    id: 'gift-green-thumb',
    name: { en: 'Green Thumb', fr: 'Main verte' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Grow a small plant (herbs and alchemical plants, not trees) from seed to maturity as an action.',
      fr: 'Fait pousser instantanément une petite plante (herbes et plantes alchimiques, hors arbres) de la graine à maturité.',
    },
    sideEffect: {
      en: 'Any alchemical concoction you create using a plant-derived ingredient gives you the Poisoned condition when used.',
      fr: 'Toute concoction alchimique que vous créez avec un ingrédient végétal vous inflige l’état Empoisonné lors de son utilisation.',
    },
  },
  {
    id: 'gift-minuscule-illusion',
    name: { en: 'Minuscule Illusion', fr: 'Illusion minuscule' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Create a simple, purely visual illusion within 4m filling up to a 1m cubed space.',
      fr: 'Crée dans les 4 m une illusion purement visuelle simple d’au plus 1 m³.',
    },
    sideEffect: {
      en: 'Take a -3 penalty when determining whether an illusion is real or not.',
      fr: 'Malus de –3 pour discerner si une illusion est réelle ou non.',
    },
  },
  {
    id: 'gift-pigment',
    name: { en: 'Pigment', fr: 'Pigment' },
    tier: 'minor',
    stamina: '1',
    dc: 'N/A',
    castTime: { en: '1 Action', fr: '1 Action' },
    effect: {
      en: 'Leave a colored mark on a surface; optionally glows (+1 light level for 4m, max Daylight) and can emit a 1-round Glaring Light flash on a second action within 4m.',
      fr: 'Trace une marque colorée sur une surface (peut luire à +1 niveau de luminosité sur 4 m) et peut flasher Lumière aveuglante 1 round sur une seconde action à ≤ 4 m.',
    },
    sideEffect: {
      en: 'Whenever someone within 10m suffers a magic fumble effect, you suffer that fumble effect too (max once per cast).',
      fr: 'Dès qu’un individu à moins de 10 m subit un Échec critique magique, vous en subissez également les effets.',
    },
  },

  // ======================== MAJOR GIFTS (8) ========================
  {
    id: 'gift-aerokinesis',
    name: { en: 'Aerokinesis', fr: 'Aérokinésie' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Manipulate up to 5 ENC of material at a range of 8m as if holding it.',
      fr: 'Manipule à distance jusqu’à 5 ENC de matière dans un rayon de 8 m comme à la main.',
    },
    sideEffect: {
      en: 'Whenever knocked prone or knocked back, your STA is reduced to 10 (unless already at or below 10).',
      fr: 'Chaque mise à terre ou projection réduit votre END actuelle à 10 (sauf si déjà ≤ 10).',
    },
  },
  {
    id: 'gift-cryokinesis',
    name: { en: 'Cryokinesis', fr: 'Cryokinésie' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Freeze up to 2 square meters of liquid or a single target within 8m.',
      fr: 'Gèle jusqu’à 2 m² de liquide ou une cible unique dans les 8 m.',
    },
    sideEffect: {
      en: 'Any chance of being frozen automatically succeeds; Frozen reduces your SPD by 6 and REF by 4.',
      fr: 'Toute chance d’être Gelé réussit automatiquement ; l’état Gelé vous inflige –6 VIT et –4 RÉF.',
    },
  },
  {
    id: 'gift-detect-poison',
    name: { en: 'Detect Poison', fr: 'Détection du poison' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Smell any substance to determine whether it has been poisoned.',
      fr: 'Permet de déceler à l’odorat si une substance est empoisonnée.',
    },
    sideEffect: {
      en: 'Whenever you gain Intoxicated or Poisoned conditions, you are also Nauseated for the same duration.',
      fr: 'Tout état Ivresse ou Empoisonnement vous inflige en plus l’état Nauséeux pendant toute sa durée.',
    },
  },
  {
    id: 'gift-fortify',
    name: { en: 'Fortify', fr: 'Renforcement' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Increase the Reliability or SP of a touched item by 1 (once per item).',
      fr: 'Augmente de +1 la Fiabilité ou le PA d’un objet touché (1 seule fois par objet).',
    },
    sideEffect: {
      en: 'Within 4m of dimeritium you lose all Vigor Threshold and roll Endurance at -3 on the Dimeritium Effect Table.',
      fr: 'À moins de 4 m de diméritium, vous perdez votre Vigueur et subissez –3 en Résilience contre la table du diméritium.',
    },
  },
  {
    id: 'gift-geokinesis',
    name: { en: 'Geokinesis', fr: 'Géokinésie' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Create an 8m radius tremor centered on yourself: DC:14 Athletics or fall prone and become Staggered.',
      fr: 'Déclenche une secousse de 8 m de rayon autour de vous : Athlétisme SD 14 ou mise à terre et Chancelant.',
    },
    sideEffect: {
      en: 'Whenever you would suffer the Staggered condition, you are instead Stunned for 1 round.',
      fr: 'Chaque fois que vous devriez subir l’état Chancelant, vous êtes Étourdi pendant 1 round.',
    },
  },
  {
    id: 'gift-pyrokinesis',
    name: { en: 'Pyrokinesis', fr: 'Pyrokinésie' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Light or extinguish a fire, or set one object/target within 8m ablaze (cannot target self).',
      fr: 'Allume ou éteint un feu, ou embrase un objet ou une cible à ≤ 8 m (soi-même exclu).',
    },
    sideEffect: {
      en: 'Whenever you have any chance of catching fire, you automatically catch fire.',
      fr: 'Toute probabilité de prendre feu vous embrase automatiquement.',
    },
  },
  {
    id: 'gift-see-aura',
    name: { en: 'See Aura', fr: 'Vision de l’aura' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'See the aura of all targets within 8m, revealing each target’s Vigor Threshold.',
      fr: 'Révèle l’aura des cibles dans un rayon de 8 m et indique le Seuil de Vigueur de chacune.',
    },
    sideEffect: {
      en: 'You emit a tangible magical tingle when touched; your Social Standing is always treated as that of a Mage.',
      fr: 'Tout contact physique révèle un picotement magique ; votre Statut social est toujours traité comme celui d’un Mage.',
    },
  },
  {
    id: 'gift-weapon-honing',
    name: { en: 'Weapon Honing', fr: 'Affûtage arcanique' },
    tier: 'major',
    stamina: '2',
    dc: '9',
    castTime: { en: 'Full Round', fr: 'Round complet' },
    effect: {
      en: 'Add a 25% Bleed chance to a Piercing or Slashing weapon.',
      fr: 'Confère 25 % de chance de Saignement à une arme Perforante ou Tranchante.',
    },
    sideEffect: {
      en: 'Whenever you have any chance of bleeding, you bleed automatically.',
      fr: 'Toute probabilité de subir un Saignement réussit automatiquement contre vous.',
    },
  },
];
