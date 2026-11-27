import type { EstateStoreState, NobleEstate } from '../types';

export const ESTATE_STORAGE_KEY = 'witcher-gm-estates-v1';

export function createDefaultEstate(
  locale: 'fr' | 'en',
  overrides?: Partial<Pick<NobleEstate, 'name' | 'nobleName' | 'region' | 'domainLevel'>>
): NobleEstate {
  const now = new Date().toISOString();
  return {
    id: `estate-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name:
      overrides?.name ||
      (locale === 'fr' ? 'Manoir de Corvo Bianco' : 'Corvo Bianco Manor'),
    nobleName:
      overrides?.nobleName ||
      (locale === 'fr' ? 'Sire Thibault de Beauclair' : 'Lord Thibault of Beauclair'),
    region: overrides?.region || (locale === 'fr' ? 'Toussaint' : 'Toussaint'),
    domainLevel: overrides?.domainLevel ?? 3,
    floorplanNotes:
      locale === 'fr'
        ? 'Corps de logis à deux étages, cellier voûté, écuries attenantes et cour intérieure close.'
        : 'Two-story stone manor, vaulted wine cellar, adjoining stables, and walled courtyard.',
    installedUpgrades: [
      {
        instanceId: 'upg-init-serre',
        upgradeId: 'serre',
        builtAt: now,
      },
    ],
    constructionQueue: [],
    greenhousePlants: [
      {
        id: 'pl-1',
        name: locale === 'fr' ? 'Céladine' : 'Celandine',
        rarity: 'common',
        monthlyYield: 10,
        storedUnits: 10,
      },
      {
        id: 'pl-2',
        name: locale === 'fr' ? 'Verveine' : 'Verbena',
        rarity: 'common',
        monthlyYield: 10,
        storedUnits: 10,
      },
      {
        id: 'pl-3',
        name: locale === 'fr' ? 'Pétales de myrte blanc' : 'White Myrtle Petals',
        rarity: 'common',
        monthlyYield: 10,
        storedUnits: 10,
      },
      {
        id: 'pl-4',
        name: locale === 'fr' ? 'Œil-de-corbeau' : 'Crow’s Eye',
        rarity: 'common',
        monthlyYield: 10,
        storedUnits: 10,
      },
      {
        id: 'pl-5',
        name: locale === 'fr' ? 'Pétales d’ellébore' : 'Hellebore Petals',
        rarity: 'uncommon',
        monthlyYield: 10,
        storedUnits: 10,
      },
      {
        id: 'pl-6',
        name: locale === 'fr' ? 'Racine de mandragore' : 'Mandrake Root',
        rarity: 'uncommon',
        monthlyYield: 10,
        storedUnits: 10,
      },
    ],
    stockpile: {
      bones: 0,
      feathers: 0,
      leather: 0,
    },
    huntingHistory: [],
    updatedAt: now,
  };
}

export function computeEstateDerivedStats(estate: NobleEstate) {
  const servantsCount = Math.max(0, estate.domainLevel) * 2;
  const barracksCount = estate.installedUpgrades.filter(
    (u) => u.upgradeId === 'baraquements'
  ).length;
  const guardsCount =
    barracksCount === 0 ? 0 : barracksCount === 1 ? 10 : 15;

  const securityCount = estate.installedUpgrades.filter(
    (u) => u.upgradeId === 'securite'
  ).length;
  const doorLockDc = securityCount === 0 ? 15 : securityCount === 1 ? 18 : 20;

  const secretChamberBuilds = estate.installedUpgrades.filter(
    (u) => u.upgradeId === 'chambres_secretes'
  ).length;

  const hasPhysician = estate.installedUpgrades.some(
    (u) => u.upgradeId === 'medecin'
  );
  const hasTortureChamber = estate.installedUpgrades.some(
    (u) => u.upgradeId === 'salle_torture'
  );
  const greenhouseCount = estate.installedUpgrades.filter(
    (u) => u.upgradeId === 'serre'
  ).length;
  const hasHuntingGround = estate.installedUpgrades.some(
    (u) => u.upgradeId === 'terrain_chasse'
  );

  return {
    servantsCount,
    guardsCount,
    doorLockDc,
    secretRooms: secretChamberBuilds * 2,
    secretPassages: secretChamberBuilds * 2,
    hasPhysician,
    hasTortureChamber,
    greenhouseCount,
    maxPlantSpecies: greenhouseCount * 10,
    hasHuntingGround,
    usedSlots: estate.installedUpgrades.length,
    queuedSlots: estate.constructionQueue.length,
  };
}

export function rollNd6(count: number): number {
  let total = 0;
  for (let i = 0; i < count; i += 1) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

export function loadEstateStore(locale: 'fr' | 'en'): EstateStoreState {
  if (typeof window === 'undefined') {
    const initial = createDefaultEstate(locale);
    return { activeEstateId: initial.id, estates: [initial] };
  }

  try {
    const raw = window.localStorage.getItem(ESTATE_STORAGE_KEY);
    if (!raw) {
      const initial = createDefaultEstate(locale);
      return { activeEstateId: initial.id, estates: [initial] };
    }
    const parsed = JSON.parse(raw) as Partial<EstateStoreState>;
    const estates =
      Array.isArray(parsed.estates) && parsed.estates.length > 0
        ? parsed.estates
        : [createDefaultEstate(locale)];
    return {
      activeEstateId:
        typeof parsed.activeEstateId === 'string' &&
        estates.some((e) => e.id === parsed.activeEstateId)
          ? parsed.activeEstateId
          : estates[0].id,
      estates,
    };
  } catch {
    const initial = createDefaultEstate(locale);
    return { activeEstateId: initial.id, estates: [initial] };
  }
}

export function saveEstateStore(state: EstateStoreState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ESTATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}
