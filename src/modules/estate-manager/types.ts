/**
 * Domain types for the Noble Estate Manager ("Seigneur & Fiefs" — Domaine).
 */

export type EstateUpgradeId =
  | 'atelier'
  | 'baraquements'
  | 'chambres_secretes'
  | 'medecin'
  | 'salle_torture'
  | 'securite'
  | 'serre'
  | 'terrain_chasse';

export type PlantRarity = 'common' | 'uncommon' | 'rare';

export interface BilingualText {
  fr: string;
  en: string;
}

export interface EstateUpgradeDef {
  id: EstateUpgradeId;
  name: BilingualText;
  summary: BilingualText;
  ruleText: BilingualText;
  maxBuilds: number | null; // null = unlimited (e.g. Atelier, Chambres secrètes)
  requiresSpecialty?: boolean;
  staffGranted?: BilingualText;
}

export interface EstatePlantEntry {
  id: string;
  name: string;
  rarity: PlantRarity;
  monthlyYield: number; // 10 units/month
  storedUnits: number;
}

export interface InstalledUpgrade {
  instanceId: string;
  upgradeId: EstateUpgradeId;
  specialty?: string;
  builtAt: string;
}

export interface ConstructionProject {
  id: string;
  upgradeId: EstateUpgradeId;
  specialty?: string;
  startedNote: string;
}

export interface HuntingHarvestRecord {
  id: string;
  hours: 1 | 2 | 3;
  bones: number;
  feathers: number;
  leather: number;
  timestamp: string;
}

export interface NobleEstate {
  id: string;
  name: string;
  nobleName: string;
  region: string;
  domainLevel: number;
  floorplanNotes: string;
  installedUpgrades: InstalledUpgrade[];
  constructionQueue: ConstructionProject[];
  greenhousePlants: EstatePlantEntry[];
  stockpile: {
    bones: number;
    feathers: number;
    leather: number;
  };
  huntingHistory: HuntingHarvestRecord[];
  updatedAt: string;
}

export interface EstateStoreState {
  activeEstateId: string;
  estates: NobleEstate[];
}
