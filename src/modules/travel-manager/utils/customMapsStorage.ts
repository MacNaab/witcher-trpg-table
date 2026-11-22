import { MAP_ACCENT_PRESETS } from '../data/mapsCatalog';
import type {
  CustomMapFormPayload,
  TravelMapAccentKey,
  TravelMapDefinition,
} from '../types';

const CUSTOM_MAPS_DB_NAME = 'witcher-gm-custom-maps-db';
const CUSTOM_MAPS_DB_VERSION = 1;
const CUSTOM_MAPS_STORE = 'maps';
const WORKSPACE_STORAGE_PREFIX = 'witcher-gm-travel-workspace-v1:';

interface StoredCustomMapRecord {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  regionTag: string;
  scaleHint: string;
  creatorName: string;
  creatorSourceUrl: string;
  defaultScaleKmPerWidth: number;
  accentKey: TravelMapAccentKey;
  naturalDimensions: {
    width: number;
    height: number;
  };
  imageBlob: Blob;
  createdAt: number;
  updatedAt: number;
}

/**
 * Validates optional external source URLs so only safe http(s) links are rendered.
 */
export function sanitizeMapSourceUrl(raw: string): string | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Reads the natural pixel dimensions of an image File/Blob via the browser Image decoder.
 */
export function readImageFileDimensions(
  file: Blob
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);
      if (width > 0 && height > 0) {
        resolve({ width, height });
      } else {
        reject(new Error('Invalid image dimensions'));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to decode image file'));
    };
    img.src = objectUrl;
  });
}

function openCustomMapsDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const request = window.indexedDB.open(
      CUSTOM_MAPS_DB_NAME,
      CUSTOM_MAPS_DB_VERSION
    );
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CUSTOM_MAPS_STORE)) {
        db.createObjectStore(CUSTOM_MAPS_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error('Failed to open IndexedDB'));
  });
}

function recordToMapDefinition(
  record: StoredCustomMapRecord
): TravelMapDefinition {
  const preset =
    MAP_ACCENT_PRESETS[record.accentKey] ?? MAP_ACCENT_PRESETS.violet;
  const imageSrc = URL.createObjectURL(record.imageBlob);
  const safeName = record.name.trim();
  const safeSubtitle = record.subtitle.trim();
  const safeDesc = record.description.trim();
  const safeRegionTag = record.regionTag.trim();
  const safeScaleHint = record.scaleHint.trim();
  const safeCreator = record.creatorName.trim();

  return {
    id: record.id,
    legacyPath: '',
    isCustom: true,
    accentKey: record.accentKey,
    name: { en: safeName, fr: safeName },
    subtitle: {
      en: safeSubtitle || 'Custom Campaign Map',
      fr: safeSubtitle || 'Carte de campagne personnalisée',
    },
    description: {
      en:
        safeDesc ||
        'User-imported interactive map ready for scale calibration, route plotting, and ration tracking.',
      fr:
        safeDesc ||
        'Carte interactive importée localement, prête pour la calibration d’échelle et le tracé d’itinéraires.',
    },
    regionTag: {
      en: safeRegionTag || 'Custom Map',
      fr: safeRegionTag || 'Carte personnalisée',
    },
    scaleHint: {
      en:
        safeScaleHint ||
        `Est. width: ${Math.round(record.defaultScaleKmPerWidth)} km`,
      fr:
        safeScaleHint ||
        `Largeur est. : ${Math.round(record.defaultScaleKmPerWidth)} km`,
    },
    status: 'available',
    creatorName: safeCreator || 'MJ / Local',
    creatorSourceUrl: sanitizeMapSourceUrl(record.creatorSourceUrl),
    imageSrc,
    naturalDimensions: record.naturalDimensions,
    defaultScaleKmPerWidth: record.defaultScaleKmPerWidth,
    accent: preset.accent,
  };
}

/**
 * Loads all persisted custom maps from IndexedDB and wraps their Blobs as Object URLs.
 */
export async function loadCustomMapsFromDb(): Promise<TravelMapDefinition[]> {
  try {
    const db = await openCustomMapsDatabase();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(CUSTOM_MAPS_STORE, 'readonly');
      const store = tx.objectStore(CUSTOM_MAPS_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const rows = (req.result as StoredCustomMapRecord[]) ?? [];
        rows.sort((a, b) => b.createdAt - a.createdAt);
        resolve(rows.map(recordToMapDefinition));
      };
      req.onerror = () =>
        reject(req.error ?? new Error('Failed to load custom maps'));
      tx.oncomplete = () => db.close();
    });
  } catch {
    return [];
  }
}

/**
 * Creates or updates a custom map in IndexedDB and returns its hydrated `TravelMapDefinition`.
 */
export async function saveCustomMapToDb(
  payload: CustomMapFormPayload
): Promise<TravelMapDefinition> {
  const db = await openCustomMapsDatabase();

  const existingRecord = payload.id
    ? await new Promise<StoredCustomMapRecord | undefined>((resolve, reject) => {
        const tx = db.transaction(CUSTOM_MAPS_STORE, 'readonly');
        const req = tx.objectStore(CUSTOM_MAPS_STORE).get(payload.id!);
        req.onsuccess = () =>
          resolve(req.result as StoredCustomMapRecord | undefined);
        req.onerror = () => reject(req.error);
      })
    : undefined;

  let imageBlob: Blob;
  let naturalDimensions: { width: number; height: number };

  if (payload.imageFile) {
    naturalDimensions = await readImageFileDimensions(payload.imageFile);
    imageBlob = payload.imageFile;
  } else if (existingRecord) {
    imageBlob = existingRecord.imageBlob;
    naturalDimensions = existingRecord.naturalDimensions;
  } else {
    db.close();
    throw new Error('Map image file is required');
  }

  const now = Date.now();
  const id =
    payload.id ?? `custom-${now}-${Math.random().toString(36).slice(2, 7)}`;

  const record: StoredCustomMapRecord = {
    id,
    name: payload.name.trim(),
    subtitle: payload.subtitle.trim(),
    description: payload.description.trim(),
    regionTag: payload.regionTag.trim(),
    scaleHint: payload.scaleHint.trim(),
    creatorName: payload.creatorName.trim(),
    creatorSourceUrl: payload.creatorSourceUrl.trim(),
    defaultScaleKmPerWidth:
      Number.isFinite(payload.defaultScaleKmPerWidth) &&
      payload.defaultScaleKmPerWidth > 0
        ? Math.round(payload.defaultScaleKmPerWidth)
        : 1000,
    accentKey: payload.accentKey,
    naturalDimensions,
    imageBlob,
    createdAt: existingRecord?.createdAt ?? now,
    updatedAt: now,
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(CUSTOM_MAPS_STORE, 'readwrite');
    const req = tx.objectStore(CUSTOM_MAPS_STORE).put(record);
    req.onsuccess = () => resolve();
    req.onerror = () =>
      reject(req.error ?? new Error('Failed to store custom map'));
    tx.oncomplete = () => db.close();
  });

  return recordToMapDefinition(record);
}

/**
 * Deletes a custom map from IndexedDB and clears its persisted route workspace from localStorage.
 */
export async function deleteCustomMapFromDb(mapId: string): Promise<void> {
  try {
    const db = await openCustomMapsDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(CUSTOM_MAPS_STORE, 'readwrite');
      const req = tx.objectStore(CUSTOM_MAPS_STORE).delete(mapId);
      req.onsuccess = () => resolve();
      req.onerror = () =>
        reject(req.error ?? new Error('Failed to delete custom map'));
      tx.oncomplete = () => db.close();
    });
  } finally {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(`${WORKSPACE_STORAGE_PREFIX}${mapId}`);
      } catch {
        // Ignore storage errors
      }
    }
  }
}

/**
 * Safely revokes temporary blob: object URLs created for custom map previews.
 */
export function revokeCustomMapObjectUrl(imageSrc?: string): void {
  if (imageSrc && imageSrc.startsWith('blob:')) {
    URL.revokeObjectURL(imageSrc);
  }
}
