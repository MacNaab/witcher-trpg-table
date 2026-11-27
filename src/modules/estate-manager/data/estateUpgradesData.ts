import type { EstateUpgradeDef, PlantRarity } from '../types';

/**
 * Official 8 Noble Estate Upgrades from "Seigneur & Fiefs" (lines 294-305).
 */
export const ESTATE_UPGRADES: readonly EstateUpgradeDef[] = [
  {
    id: 'atelier',
    name: { fr: 'Atelier', en: 'Workshop' },
    summary: {
      fr: '+2 à tous les jets d’Artisanat (choisir un métier)',
      en: '+2 to all Crafting checks (choose one trade)',
    },
    ruleText: {
      fr: 'Petit bâtiment équipé de tous les outils pour une activité artisanale (+2 Artisanat). Peut être bâti plusieurs fois pour différents métiers.',
      en: 'Small building outfitted with tools for a specific craft (+2 Crafting). Can be built multiple times for different specialties.',
    },
    maxBuilds: null,
    requiresSpecialty: true,
  },
  {
    id: 'baraquements',
    name: { fr: 'Baraquements', en: 'Barracks' },
    summary: {
      fr: '+10 gardes (1re fois), +5 gardes (2e fois)',
      en: '+10 guards (1st build), +5 guards (2nd build)',
    },
    ruleText: {
      fr: 'Bâtiment en brique abritant 10 gardes (profil Bandits p.272) qui protègent le fief et rapportent tout fait suspect. Une 2e construction ajoute 5 gardes.',
      en: 'Brick quarters housing 10 guards (Bandit stats p.272) loyal to the estate. A second Barracks adds 5 more guards.',
    },
    maxBuilds: 2,
    staffGranted: {
      fr: '10–15 Gardes (profil Bandit)',
      en: '10–15 Guards (Bandit stats)',
    },
  },
  {
    id: 'chambres_secretes',
    name: { fr: 'Chambres secrètes', en: 'Secret Chambers' },
    summary: {
      fr: '2 passages secrets (relient jusqu’à 3 pièces) + 2 pièces cachées',
      en: '2 secret passages (link up to 3 rooms) + 2 hidden rooms',
    },
    ruleText: {
      fr: 'Vigilance SD 16 pour repérer l’entrée ; serrure à clef spéciale (doubles gratuits) ou Crochetage SD 20.',
      en: 'Awareness DC 16 to detect; special key lock (free duplicates) or Pick Lock DC 20.',
    },
    maxBuilds: null,
  },
  {
    id: 'medecin',
    name: { fr: 'Médecin attitré', en: 'Resident Physician' },
    summary: {
      fr: 'Soins gratuits (Savant · Mains thérapeutiques base 15)',
      en: 'Free medical care (Sage · Healing Hands Base 15)',
    },
    ruleText: {
      fr: 'Soigne gratuitement le Noble et ses invités. Compte comme un savant ayant une base de 15 en Mains thérapeutiques.',
      en: 'Treats you and your guests free of charge. Counts as a Sage with Healing Hands Base 15.',
    },
    maxBuilds: 1,
    staffGranted: {
      fr: 'Médecin (Mains thérapeutiques Base 15)',
      en: 'Physician (Healing Hands Base 15)',
    },
  },
  {
    id: 'salle_torture',
    name: { fr: 'Salle de torture', en: 'Torture Chamber' },
    summary: {
      fr: 'Serrure SD 18 · 5 cages SD 18 · +3 Intimidation (2d6) · Bourreau base 15',
      en: 'Lock DC 18 · 5 cages DC 18 · +3 Intimidation (2d6) · Executioner Base 15',
    },
    ruleText: {
      fr: 'Chambre souterraine verrouillée (SD 18) avec 5 cages (SD 18). Confère +3 Intimidation (2d6 dégâts/tentative) et +2 Torture et douleur en combat verbal. Gardée par un Bourreau (Intimidation base 15).',
      en: 'Underground chamber locked from outside (DC 18) with 5 cages (DC 18). Grants +3 Intimidation (2d6 dmg/attempt) and +2 Verbal Combat Torture & Pain. Guarded by an Executioner (Base 15).',
    },
    maxBuilds: 1,
    staffGranted: {
      fr: 'Bourreau (Intimidation Base 15)',
      en: 'Executioner (Intimidation Base 15)',
    },
  },
  {
    id: 'securite',
    name: { fr: 'Sécurité', en: 'Security' },
    summary: {
      fr: 'Portes & fenêtres SD 15 → 18 (1re) → 20 (2e)',
      en: 'Doors & windows Lock DC 15 → 18 (1st) → 20 (2nd)',
    },
    ruleText: {
      fr: 'Renforce serrures de portes et fenêtres : Crochetage SD 18 (1er choix) puis SD 20 (2e choix). N’affecte pas les Chambres secrètes ni la Salle de torture.',
      en: 'Upgrades doors & windows Pick Lock DC from 15 to 18 (1st) and 20 (2nd). Does not affect Secret Chambers or Torture Chamber.',
    },
    maxBuilds: 2,
  },
  {
    id: 'serre',
    name: { fr: 'Serre', en: 'Greenhouse' },
    summary: {
      fr: 'Jusqu’à 10 plantes (10 u./mois chacune) · Jardinier Survie base 15',
      en: 'Up to 10 crops (10 units/mo each) · Gardener Survival Base 15',
    },
    ruleText: {
      fr: 'Départ : 4 communes/partout + 2 inhabituelles (10 u./mois). Ajoutez les plantes récoltées en voyage jusqu’à 10 substances par Serre. Jardinier : Survie base 15.',
      en: 'Start with 4 Everywhere/Common + 2 Uncommon plants (10 units/mo). Plant wild samples up to 10 substances total. Gardener: Wilderness Survival Base 15.',
    },
    maxBuilds: null,
    staffGranted: {
      fr: 'Jardinier (Survie Base 15)',
      en: 'Gardener (Survival Base 15)',
    },
  },
  {
    id: 'terrain_chasse',
    name: { fr: 'Terrain de chasse', en: 'Hunting Ground' },
    summary: {
      fr: '1d6 à 3d6 os, plumes et cuir / heure · Maître de chasse Survie base 15',
      en: '1d6–3d6 bones, feathers & leather / hr · Huntsmaster Survival Base 15',
    },
    ruleText: {
      fr: 'Zone sauvage à 1 jour de voyage : 1d6 unités de chaque (os, plumes, cuir) par heure de chasse (max 3d6), préparées par votre Maître de chasse (Survie base 15).',
      en: 'Wilderness 1 day away yielding 1d6 each of bones, feathers, and leather per hour (max 3d6), prepared by your Huntsmaster (Survival Base 15).',
    },
    maxBuilds: 1,
    staffGranted: {
      fr: 'Maître de chasse (Survie Base 15)',
      en: 'Huntsmaster (Survival Base 15)',
    },
  },
];

export const SUGGESTED_BOTANICALS: ReadonlyArray<{
  name: { fr: string; en: string };
  rarity: PlantRarity;
}> = [
  { name: { fr: 'Pétales de myrte blanc', en: 'White Myrtle Petals' }, rarity: 'common' },
  { name: { fr: 'Céladine', en: 'Celandine' }, rarity: 'common' },
  { name: { fr: 'Verveine', en: 'Verbena' }, rarity: 'common' },
  { name: { fr: 'Berbéris', en: 'Berbercane Fruit' }, rarity: 'common' },
  { name: { fr: 'Œil-de-corbeau', en: 'Crow’s Eye' }, rarity: 'common' },
  { name: { fr: 'Pétales d’ellébore', en: 'Hellebore Petals' }, rarity: 'uncommon' },
  { name: { fr: 'Racine de mandragore', en: 'Mandrake Root' }, rarity: 'uncommon' },
  { name: { fr: 'Tue-loup', en: 'Wolfsbane' }, rarity: 'uncommon' },
  { name: { fr: 'Feuille de guetteur', en: 'Fool’s Parsley' }, rarity: 'uncommon' },
  { name: { fr: 'Fibre de han', en: 'Han Fiber' }, rarity: 'rare' },
];
