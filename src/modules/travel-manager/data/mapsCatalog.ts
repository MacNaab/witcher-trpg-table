import continentMapImg from '../maps/continent.webp';
import korathMapImg from '../maps/korath.webp';
import skelligeMapImg from '../maps/skellige.webp';
import toussaintMapImg from '../maps/toussaint.webp';
import zerrikaniaMapImg from '../maps/zerrikania.webp';
import type {
  LocalizedText,
} from '@/src/data/bestiary/types';
import type {
  MapLibraryCredit,
  TravelMapAccent,
  TravelMapAccentKey,
  TravelMapDefinition,
} from '../types';

/**
 * Static Tailwind accent presets shared between built-in and user-imported maps.
 */
export const MAP_ACCENT_PRESETS: Record<
  TravelMapAccentKey,
  { label: LocalizedText; accent: TravelMapAccent }
> = {
  amber: {
    label: { en: 'Amber', fr: 'Ambre' },
    accent: {
      topBar: 'bg-amber-500',
      iconBox:
        'border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400',
      badge:
        'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      cardHover: 'hover:border-amber-500/50',
    },
  },
  sky: {
    label: { en: 'Ocean Blue', fr: 'Bleu océan' },
    accent: {
      topBar: 'bg-sky-500',
      iconBox: 'border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400',
      badge: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      cardHover: 'hover:border-sky-500/50',
    },
  },
  rose: {
    label: { en: 'Crimson', fr: 'Cramoisi' },
    accent: {
      topBar: 'bg-rose-500',
      iconBox:
        'border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400',
      badge:
        'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
      cardHover: 'hover:border-rose-500/50',
    },
  },
  orange: {
    label: { en: 'Dune Ochre', fr: 'Ocre des dunes' },
    accent: {
      topBar: 'bg-orange-500',
      iconBox:
        'border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-400',
      badge:
        'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
      cardHover: 'hover:border-orange-500/50',
    },
  },
  emerald: {
    label: { en: 'Forest Emerald', fr: 'Émeraude' },
    accent: {
      topBar: 'bg-emerald-500',
      iconBox:
        'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
      badge:
        'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      cardHover: 'hover:border-emerald-500/50',
    },
  },
  violet: {
    label: { en: 'Arcane Violet', fr: 'Violet arcanique' },
    accent: {
      topBar: 'bg-violet-500',
      iconBox:
        'border-violet-500/30 bg-violet-500/15 text-violet-600 dark:text-violet-400',
      badge:
        'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
      cardHover: 'hover:border-violet-500/50',
    },
  },
};

/**
 * Ordered catalog of the 6 Witcher TRPG world/regional maps from the legacy hub,
 * preserving each original cartographer name and source link.
 */
export const TRAVEL_MAPS_CATALOG: readonly TravelMapDefinition[] = [
  {
    id: 'continent',
    legacyPath: 'c/',
    name: { en: 'The Continent', fr: 'Continent' },
    subtitle: {
      en: 'Northern Kingdoms & Nilfgaardian Empire',
      fr: 'Royaumes du Nord & Empire nilfgaardien',
    },
    description: {
      en: 'Full continental political map spanning Kovir and Poviss down to Nilfgaard, ideal for long cross-border campaigns.',
      fr: 'Carte politique complète du Continent, de Kovir et Poviss jusqu’à Nilfgaard, idéale pour les grands trajets transfrontaliers.',
    },
    regionTag: { en: 'Continental Scale', fr: 'Échelle continentale' },
    scaleHint: {
      en: 'Macro routes · Multi-week expeditions',
      fr: 'Grands axes · Expéditions sur plusieurs semaines',
    },
    status: 'available',
    creatorName: 'RabbitSlayer',
    creatorSourceUrl:
      'https://www.reddit.com/r/inkarnate/comments/jtgqjh/the_witcher_continent_updated_with_borders/?utm_source=share&utm_medium=web2x&context=3',
    imageSrc: continentMapImg,
    naturalDimensions: { width: 2894, height: 4096 },
    defaultScaleKmPerWidth: 3242,
    accent: {
      topBar: 'bg-amber-500',
      iconBox:
        'border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400',
      badge:
        'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      cardHover: 'hover:border-amber-500/50',
    },
  },
  {
    id: 'skellige',
    legacyPath: 's/',
    name: { en: 'Skellige Isles', fr: 'Skellige' },
    subtitle: {
      en: 'Ard Skellig, An Skellig, Spikeroog & Undvik',
      fr: 'Ard Skellig, An Skellig, Spikeroog & Undvik',
    },
    description: {
      en: 'Detailed archipelago chart highlighting clan strongholds, fjords, mountain passes, and treacherous maritime crossings.',
      fr: 'Carte détaillée de l’archipel couvrant fiefs des clans, fjords, cols montagneux et traversées maritimes.',
    },
    regionTag: { en: 'Archipelago & Sea', fr: 'Archipel & Mer' },
    scaleHint: {
      en: 'Longship crossings · Island trails',
      fr: 'Traversées en drakkar · Sentiers insulaires',
    },
    status: 'available',
    creatorName: 'Mac Hareng',
    creatorSourceUrl:
      'https://www.the-witcher-jdr.fr/fichiers/ressources/maps/skellige_v2.png',
    imageSrc: skelligeMapImg,
    naturalDimensions: { width: 4480, height: 3200 },
    defaultScaleKmPerWidth: 520,
    accent: {
      topBar: 'bg-sky-500',
      iconBox: 'border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400',
      badge: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      cardHover: 'hover:border-sky-500/50',
    },
  },
  {
    id: 'toussaint',
    legacyPath: 't/',
    name: { en: 'Duchy of Toussaint', fr: 'Toussaint' },
    subtitle: {
      en: 'Beauclair, Vineyards & Gorgona Foothills',
      fr: 'Beauclair, Vignobles & Contreforts du Gorgone',
    },
    description: {
      en: 'High-detail regional map of the fairy-tale Nilfgaardian vassal duchy, its wine estates, rivers, and knightly roads.',
      fr: 'Carte régionale détaillée du duché vassal de Nilfgaard, de Beauclair, ses vignobles et ses routes chevaleresques.',
    },
    regionTag: { en: 'Duchy Scale', fr: 'Échelle ducale' },
    scaleHint: {
      en: 'Estate roads · Short regional journeys',
      fr: 'Routes ducales · Trajets de quelques jours',
    },
    status: 'available',
    creatorName: 'Vanagandr',
    creatorSourceUrl: 'https://inkarnate.com/m/apzKd3--duchy-of-toussaint/',
    imageSrc: toussaintMapImg,
    naturalDimensions: { width: 2048, height: 1536 },
    defaultScaleKmPerWidth: 614,
    accent: {
      topBar: 'bg-rose-500',
      iconBox:
        'border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400',
      badge:
        'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
      cardHover: 'hover:border-rose-500/50',
    },
  },
  {
    id: 'korath',
    legacyPath: 'k/',
    name: { en: 'Korath Desert', fr: 'Korath' },
    subtitle: {
      en: 'Frying Pan Dunes & Eastern Borderlands',
      fr: 'Désert du Chaudron & Marches orientales',
    },
    description: {
      en: 'Arid expanse south-east of Nilfgaard featuring scarce oases, caravan tracks, and unforgiving desert hazards.',
      fr: 'Étendue aride au sud-est de Nilfgaard : oasis rares, pistes caravanières et dangers du désert.',
    },
    regionTag: { en: 'Arid Frontier', fr: 'Frontière aride' },
    scaleHint: {
      en: 'Caravan routes · Water & heat rationing',
      fr: 'Pistes caravanières · Gestion de l’eau',
    },
    status: 'available',
    creatorName: 'Lancelot von See',
    creatorSourceUrl:
      'https://inkarnate-api-as-production.s3.amazonaws.com/1s90g1vt52un4jet1v2lqbnjc6xr?disposition=attachment&fbclid=IwAR0ZnrUWLTwVxOvUZFzxSAzs7j_MNsB8N_D2pyQF7bFnJwBAfAspYHbs-MI',
    imageSrc: korathMapImg,
    naturalDimensions: { width: 2048, height: 1536 },
    defaultScaleKmPerWidth: 900,
    accent: {
      topBar: 'bg-orange-500',
      iconBox:
        'border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-400',
      badge:
        'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
      cardHover: 'hover:border-orange-500/50',
    },
  },
  {
    id: 'ophir',
    legacyPath: '',
    name: { en: 'Ofir (Ophir)', fr: 'Ophir' },
    subtitle: {
      en: 'Southern Overseas Realm (In Preparation)',
      fr: 'Royaume d’outre-mer méridional (En préparation)',
    },
    description: {
      en: 'Exotic southern kingdom across the Great Sea. Currently disabled in the hub while calibration and waypoints are prepared.',
      fr: 'Royaume méridional par-delà la Grande Mer. Carte actuellement désactivée en attente d’intégration interactive.',
    },
    regionTag: { en: 'Overseas Realm', fr: 'Terre d’outre-mer' },
    scaleHint: {
      en: 'Pending calibration · Disabled in legacy hub',
      fr: 'Calibration à venir · Désactivée dans l’ancien hub',
    },
    status: 'coming-soon',
    creatorName: 'Lancelot von See',
    creatorSourceUrl:
      'https://inkarnate-api-as-production.s3.amazonaws.com/4oefxyu7f5epjcaejlg6sjv0ofod?disposition=attachment',
    defaultScaleKmPerWidth: 1100,
    accent: {
      topBar: 'bg-teal-500/60',
      iconBox:
        'border-teal-500/25 bg-teal-500/10 text-teal-600/80 dark:text-teal-400/80',
      badge:
        'border-teal-500/25 bg-teal-500/10 text-teal-700/80 dark:text-teal-300/80',
      cardHover: '',
    },
  },
  {
    id: 'zerrikania',
    legacyPath: 'z/',
    name: { en: 'Zerrikania', fr: 'Zerrikania' },
    subtitle: {
      en: 'Far Eastern Steppes, Canyons & Dragon Cults',
      fr: 'Steppes orientales, Canyons & Terres des dragons',
    },
    description: {
      en: 'Distant eastern territory beyond the Korath Desert and Blue Mountains, known for warrior women, alchemy, and wild beasts.',
      fr: 'Contrée orientale au-delà du désert de Korath et des Montagnes Bleues, célèbre pour ses guerrières et son alchimie.',
    },
    regionTag: { en: 'Eastern Expanse', fr: 'Contrée orientale' },
    scaleHint: {
      en: 'Long expeditions · Canyon & steppe trails',
      fr: 'Longues expéditions · Canyons et steppes',
    },
    status: 'available',
    creatorName: 'Mac Hareng',
    creatorSourceUrl: 'https://www.the-witcher-jdr.fr/mappemondes.php',
    imageSrc: zerrikaniaMapImg,
    naturalDimensions: { width: 2048, height: 1536 },
    defaultScaleKmPerWidth: 1200,
    accent: {
      topBar: 'bg-emerald-500',
      iconBox:
        'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
      badge:
        'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      cardHover: 'hover:border-emerald-500/50',
    },
  },
] as const;

/**
 * Technical libraries and UI inspirations credited in the original map hub footer.
 */
export const TECH_AND_INSPIRATION_CREDITS: readonly MapLibraryCredit[] = [
  {
    id: 'witcher3map',
    label: 'The Witcher 3 Map',
    role: {
      en: 'Original hub layout & visual style inspiration',
      fr: 'Style et inspiration originale du hub',
    },
    url: 'https://witcher3map.com/',
  },
  {
    id: 'leaflet',
    label: 'Leaflet',
    role: {
      en: 'Interactive map rendering reference',
      fr: 'Référence cartographique interactive',
    },
    url: 'https://leafletjs.com/',
  },
  {
    id: 'leaflet-draw',
    label: 'Leaflet.draw',
    role: {
      en: 'Waypoint & route drawing reference',
      fr: 'Référence tracé de jalons et d’itinéraires',
    },
    url: 'https://github.com/Leaflet/Leaflet.draw',
  },
] as const;
