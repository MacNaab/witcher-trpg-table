import { loadCombatHubState } from '@/src/modules/combat-tracker/utils/hubStorage';

export type ModuleLanguage = 'fr' | 'en';

export const CONTINENT_CALENDAR_STORAGE_KEY = 'witcher-gm-calendar-v1';
export const CALENDAR_UPDATED_EVENT = 'witcher-calendar-updated';

export type ElvenMonthId =
  | 'yule'
  | 'imbaelk'
  | 'birke'
  | 'blathe'
  | 'feainn'
  | 'lammas'
  | 'velen'
  | 'saovine';

export type SeasonId = 'winter' | 'spring' | 'summer' | 'autumn';

export type ClimateRegionId =
  | 'northern-temperate'
  | 'velen-marsh'
  | 'skellige-sea'
  | 'mountains-kaedwen'
  | 'toussaint-south';

export type WeatherConditionId =
  | 'clear'
  | 'overcast'
  | 'rain'
  | 'storm'
  | 'fog'
  | 'frost'
  | 'blizzard'
  | 'heatwave'
  | 'gale';

export type MoonPhaseId =
  | 'new-moon'
  | 'waxing-crescent'
  | 'first-quarter'
  | 'waxing-gibbous'
  | 'full-moon'
  | 'waning-gibbous'
  | 'last-quarter'
  | 'waning-crescent';

export type RecoveryCareMode = 'rest' | 'travel';

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface ElvenMonthDef {
  id: ElvenMonthId;
  index: number;
  length: number;
  season: SeasonId;
  name: LocalizedText;
  meaning: LocalizedText;
  gregorianApprox: LocalizedText;
}

export interface ContinentFestivalDef {
  monthId: ElvenMonthId;
  day: number;
  name: LocalizedText;
  loreNote: LocalizedText;
}

export interface MoonPhaseDef {
  id: MoonPhaseId;
  name: LocalizedText;
  ruleNote: LocalizedText;
  illumination: LocalizedText;
}

export interface WeatherModifiers {
  perception: LocalizedText;
  ranged: LocalizedText;
  fireMagic: LocalizedText;
  waterMagic: LocalizedText;
  travelAndSurvival: LocalizedText;
}

export interface WeatherDefinition {
  id: WeatherConditionId;
  name: LocalizedText;
  summary: LocalizedText;
  temperatureBand: Record<SeasonId, LocalizedText>;
  modifiers: WeatherModifiers;
}

export interface TrackedRecoveryCharacter {
  id: string;
  hubPcId?: string;
  name: string;
  professionLabel: string;
  currentHp: number;
  maxHp: number;
  rec: number;
  careMode: RecoveryCareMode;
  doctorHealingHands: boolean;
  criticalWoundNote: string;
  criticalWoundDaysLeft: number;
}

export interface CraftingProject {
  id: string;
  title: string;
  crafterName: string;
  dcLabel: string;
  totalDays: number;
  daysCompleted: number;
  active: boolean;
  workDuringTravel: boolean;
  completedAtDay?: number;
}

export interface CalendarLogEntry {
  id: string;
  dayEpoch: number;
  dateLabel: LocalizedText;
  kind: 'advance' | 'travel' | 'weather' | 'recovery' | 'crafting' | 'note';
  message: LocalizedText;
}

export interface ContinentCalendarState {
  version: 1;
  year: number;
  monthIndex: number;
  dayOfMonth: number;
  totalDaysElapsed: number;
  regionId: ClimateRegionId;
  weatherId: WeatherConditionId;
  weatherLocked: boolean;
  recoveryCharacters: TrackedRecoveryCharacter[];
  craftingProjects: CraftingProject[];
  logs: CalendarLogEntry[];
}

export const ELVEN_MONTHS: readonly ElvenMonthDef[] = [
  {
    id: 'yule',
    index: 0,
    length: 45,
    season: 'winter',
    name: { fr: 'Yule', en: 'Yule' },
    meaning: { fr: 'Solstice d’hiver · Cœur du froid', en: 'Winter Solstice · Deep Frost' },
    gregorianApprox: { fr: 'Fin déc. – Début fév.', en: 'Late Dec – Early Feb' },
  },
  {
    id: 'imbaelk',
    index: 1,
    length: 45,
    season: 'winter',
    name: { fr: 'Imbaelk', en: 'Imbaelk' },
    meaning: { fr: 'Bourgeonnement caché · Fin d’hiver', en: 'Hidden Budding · Late Winter' },
    gregorianApprox: { fr: 'Début fév. – Fin mars', en: 'Early Feb – Late Mar' },
  },
  {
    id: 'birke',
    index: 2,
    length: 46,
    season: 'spring',
    name: { fr: 'Birke', en: 'Birke' },
    meaning: { fr: 'Équinoxe de printemps · Renouveau', en: 'Spring Equinox · Awakening' },
    gregorianApprox: { fr: 'Fin mars – Début mai', en: 'Late Mar – Early May' },
  },
  {
    id: 'blathe',
    index: 3,
    length: 46,
    season: 'spring',
    name: { fr: 'Blathe', en: 'Blathe' },
    meaning: { fr: 'Floraison · Haut printemps', en: 'Blossoming · High Spring' },
    gregorianApprox: { fr: 'Début mai – Fin juin', en: 'Early May – Late Jun' },
  },
  {
    id: 'feainn',
    index: 4,
    length: 45,
    season: 'summer',
    name: { fr: 'Feainn', en: 'Feainn' },
    meaning: { fr: 'Solstice d’été · Zénith solaire', en: 'Summer Solstice · High Sun' },
    gregorianApprox: { fr: 'Fin juin – Début août', en: 'Late Jun – Early Aug' },
  },
  {
    id: 'lammas',
    index: 5,
    length: 47,
    season: 'summer',
    name: { fr: 'Lammas', en: 'Lammas' },
    meaning: { fr: 'Moissons · Fin d’été', en: 'Harvest · Late Summer' },
    gregorianApprox: { fr: 'Début août – Fin sept.', en: 'Early Aug – Late Sep' },
  },
  {
    id: 'velen',
    index: 6,
    length: 45,
    season: 'autumn',
    name: { fr: 'Velen', en: 'Velen' },
    meaning: { fr: 'Équinoxe d’automne · Chute des feuilles', en: 'Autumn Equinox · Falling Leaves' },
    gregorianApprox: { fr: 'Fin sept. – Début nov.', en: 'Late Sep – Early Nov' },
  },
  {
    id: 'saovine',
    index: 7,
    length: 46,
    season: 'autumn',
    name: { fr: 'Saovine', en: 'Saovine' },
    meaning: { fr: 'Veillée des morts · Brumes d’hiver', en: 'Vigil of the Dead · Early Frost' },
    gregorianApprox: { fr: 'Début nov. – Fin déc.', en: 'Early Nov – Late Dec' },
  },
] as const;

export const YEAR_LENGTH_DAYS = ELVEN_MONTHS.reduce((sum, m) => sum + m.length, 0);

export const CONTINENT_FESTIVALS: readonly ContinentFestivalDef[] = [
  {
    monthId: 'yule',
    day: 1,
    name: { fr: 'Midinváerne (Solstice d’hiver)', en: 'Midinváerne (Winter Solstice)' },
    loreNote: {
      fr: 'Nuit la plus longue de l’année ; les voiles magiques s’amincissent et les monstres rôdent près des hameaux.',
      en: 'Longest night of the year; magical veils thin and monsters prowl closer to settlements.',
    },
  },
  {
    monthId: 'imbaelk',
    day: 1,
    name: { fr: 'Fête d’Imbaelk', en: 'Feast of Imbaelk' },
    loreNote: {
      fr: 'Premiers signes du dégel ; rituels des prêtresses de Melitele pour bénir les semailles à venir.',
      en: 'First signs of thaw; Melitele priestesses bless future crops and shelters.',
    },
  },
  {
    monthId: 'birke',
    day: 1,
    name: { fr: 'Équinoxe de Birke', en: 'Birke Equinox' },
    loreNote: {
      fr: 'Ouverture des routes printanières et reprise du commerce fluvial après la débâcle des glaces.',
      en: 'Spring roads reopen and river trade resumes as ice breaks.',
    },
  },
  {
    monthId: 'birke',
    day: 41,
    name: { fr: 'Nuit de Belleteyn', en: 'Night of Belleteyn' },
    loreNote: {
      fr: 'Feux de joie, couronnes de fleurs, réjouissances populaires et forte résonance de magie naturelle.',
      en: 'Bonfires, garlands, revelry, and heightened natural magical resonance.',
    },
  },
  {
    monthId: 'feainn',
    day: 1,
    name: { fr: 'Solstice de Feainn', en: 'Feainn Solstice' },
    loreNote: {
      fr: 'Jour le plus long ; moisson d’herbes alchimiques rares à leur apogée (+1 cueillette nocturne).',
      en: 'Longest day; rare alchemical herbs reach peak potency (+1 nocturnal foraging).',
    },
  },
  {
    monthId: 'lammas',
    day: 1,
    name: { fr: 'Fête de Lammas', en: 'Lammas Harvest Feast' },
    loreNote: {
      fr: 'Foire aux moissons et tournois ; baisse temporaire des vivres rares sur les marchés ruraux.',
      en: 'Harvest fairs and tourneys; rural markets overflow with fresh provisions.',
    },
  },
  {
    monthId: 'velen',
    day: 1,
    name: { fr: 'Équinoxe de Velen', en: 'Velen Equinox' },
    loreNote: {
      fr: 'Bilan des récoltes et préparatifs d’hivernage ; caravanes escortées avant les grandes pluies.',
      en: 'Autumn reckoning and winter stockpiling; merchant caravans hire extra escorts.',
    },
  },
  {
    monthId: 'saovine',
    day: 1,
    name: { fr: 'Nuit de Saovine', en: 'Saovine Eve' },
    loreNote: {
      fr: 'Veillée des morts : spectres et nécrophages très actifs ; les villageois allument des lanternes aux seuils.',
      en: 'Vigil of the Dead: specters and necrophages surge; villagers set threshold lanterns.',
    },
  },
] as const;

export const MOON_PHASES: readonly MoonPhaseDef[] = [
  {
    id: 'new-moon',
    name: { fr: 'Nouvelle lune', en: 'New Moon' },
    illumination: { fr: 'Obscurité totale', en: 'Pitch Darkness' },
    ruleNote: {
      fr: '-4 Vigilance (vue) la nuit sans torche ; avantage aux créatures nocturnes & embuscades.',
      en: '-4 Awareness (sight) at night without light; nocturnal predators gain ambush edge.',
    },
  },
  {
    id: 'waxing-crescent',
    name: { fr: 'Premier croissant', en: 'Waxing Crescent' },
    illumination: { fr: 'Nuit sombre', en: 'Dark Night' },
    ruleNote: {
      fr: 'Faible lueur lunaire ; éclairage nocturne standard (-2 à -4 selon couvert nuageux).',
      en: 'Faint crescent glow; standard night darkness (-2 to -4 under cloud cover).',
    },
  },
  {
    id: 'first-quarter',
    name: { fr: 'Premier quartier', en: 'First Quarter' },
    illumination: { fr: 'Clarté partielle', en: 'Partial Moonlight' },
    ruleNote: {
      fr: 'Pénombre nocturne en terrain découvert (-2 Vigilance sans source de lumière).',
      en: 'Dim light in open terrain (-2 Awareness without a light source).',
    },
  },
  {
    id: 'waxing-gibbous',
    name: { fr: 'Gibbeuse croissante', en: 'Waxing Gibbous' },
    illumination: { fr: 'Lueur vive', en: 'Bright Moonlight' },
    ruleNote: {
      fr: 'Visibilité nocturne correcte à découvert ; loups et lycanthropes agités.',
      en: 'Clearer silhouettes in open fields; wolves and lycanthropes grow restless.',
    },
  },
  {
    id: 'full-moon',
    name: { fr: 'Pleine lune', en: 'Full Moon' },
    illumination: { fr: 'Pleine clarté lunaire', en: 'Full Moonlight' },
    ruleNote: {
      fr: 'Pénombre légère (-1 Vigilance max à découvert) ; lycanthropes transformés et spectres renforcés.',
      en: 'Light dimness (-1 Awareness max outdoors); lycanthropes transform and wraiths surge.',
    },
  },
  {
    id: 'waning-gibbous',
    name: { fr: 'Gibbeuse décroissante', en: 'Waning Gibbous' },
    illumination: { fr: 'Lueur vive', en: 'Bright Moonlight' },
    ruleNote: {
      fr: 'Nuit claire en première partie ; brumes fréquentes à l’aube.',
      en: 'Clear early night; heavy mist common toward dawn.',
    },
  },
  {
    id: 'last-quarter',
    name: { fr: 'Dernier quartier', en: 'Last Quarter' },
    illumination: { fr: 'Clarté partielle', en: 'Partial Moonlight' },
    ruleNote: {
      fr: 'Pénombre nocturne (-2 Vigilance à découvert sans lanterne).',
      en: 'Dim moonlight (-2 Awareness outdoors without a lantern).',
    },
  },
  {
    id: 'waning-crescent',
    name: { fr: 'Dernier croissant', en: 'Waning Crescent' },
    illumination: { fr: 'Nuit sombre', en: 'Dark Night' },
    ruleNote: {
      fr: 'Veille de nouvelle lune ; nuits noires propices aux contrebandiers.',
      en: 'Approaching new moon; dark nights favored by smugglers and assassins.',
    },
  },
] as const;

export const CLIMATE_REGIONS: ReadonlyArray<{
  id: ClimateRegionId;
  name: LocalizedText;
  hint: LocalizedText;
}> = [
  {
    id: 'northern-temperate',
    name: { fr: 'Royaumes du Nord (Tempéré)', en: 'Northern Realms (Temperate)' },
    hint: { fr: 'Témérie, Rédanie, Cintra, Novigrad', en: 'Temeria, Redania, Cintra, Novigrad' },
  },
  {
    id: 'velen-marsh',
    name: { fr: 'Velen & Marécages', en: 'Velen & Marshes' },
    hint: { fr: 'Brouillards tenaces, pluies froides, boue', en: 'Dense fog, cold rain, boggy roads' },
  },
  {
    id: 'skellige-sea',
    name: { fr: 'Îles Skellige & Côte', en: 'Skellige Isles & Coast' },
    hint: { fr: 'Bourrasques, grains marins, tempêtes', en: 'Gale winds, sea squalls, storms' },
  },
  {
    id: 'mountains-kaedwen',
    name: { fr: 'Kaedwen & Hautes Montagnes', en: 'Kaedwen & High Mountains' },
    hint: { fr: 'Gel précoce, neige et blizzards', en: 'Early frost, snow, and blizzards' },
  },
  {
    id: 'toussaint-south',
    name: { fr: 'Toussaint & Terres du Sud', en: 'Toussaint & Southern Realms' },
    hint: { fr: 'Climat doux, soleil généreux, canicules', en: 'Mild winters, sunny skies, heatwaves' },
  },
];

export const WEATHER_DEFINITIONS: Record<WeatherConditionId, WeatherDefinition> = {
  clear: {
    id: 'clear',
    name: { fr: 'Ciel dégagé', en: 'Clear Skies' },
    summary: {
      fr: 'Temps sec et visibilité optimale sur toute la journée.',
      en: 'Dry weather with optimal daytime visibility.',
    },
    temperatureBand: {
      winter: { fr: 'Froid sec (-2 °C)', en: 'Crisp Cold (-2 °C)' },
      spring: { fr: 'Doux (14 °C)', en: 'Mild (14 °C)' },
      summer: { fr: 'Chaud (24 °C)', en: 'Warm (24 °C)' },
      autumn: { fr: 'Frais (10 °C)', en: 'Cool (10 °C)' },
    },
    modifiers: {
      perception: { fr: 'Aucun malus', en: 'No penalty' },
      ranged: { fr: 'Aucun malus', en: 'No penalty' },
      fireMagic: { fr: 'Normal', en: 'Normal' },
      waterMagic: { fr: 'Normal', en: 'Normal' },
      travelAndSurvival: {
        fr: 'Conditions idéales (allure normale)',
        en: 'Ideal road conditions (normal pace)',
      },
    },
  },
  overcast: {
    id: 'overcast',
    name: { fr: 'Ciel couvert', en: 'Overcast' },
    summary: {
      fr: 'Couche nuageuse grise et brise fraîche, lumière diffuse.',
      en: 'Gray cloud cover and cool breeze with diffused daylight.',
    },
    temperatureBand: {
      winter: { fr: 'Frais/Froid (0 °C)', en: 'Cold (0 °C)' },
      spring: { fr: 'Tempéré (11 °C)', en: 'Temperate (11 °C)' },
      summer: { fr: 'Agréable (20 °C)', en: 'Pleasant (20 °C)' },
      autumn: { fr: 'Gris (8 °C)', en: 'Brisk (8 °C)' },
    },
    modifiers: {
      perception: { fr: 'Aucun malus', en: 'No penalty' },
      ranged: { fr: 'Aucun malus', en: 'No penalty' },
      fireMagic: { fr: 'Normal', en: 'Normal' },
      waterMagic: { fr: 'Normal', en: 'Normal' },
      travelAndSurvival: {
        fr: 'Cadence standard, pistage aisé',
        en: 'Standard pace, steady visibility',
      },
    },
  },
  rain: {
    id: 'rain',
    name: { fr: 'Pluie soutenue', en: 'Steady Rain' },
    summary: {
      fr: 'Averses continues détrempant les pistes et éteignant les torches non abritées.',
      en: 'Persistent rainfall soaking trails and dousing uncovered torches.',
    },
    temperatureBand: {
      winter: { fr: 'Pluie glacée (2 °C)', en: 'Freezing Rain (2 °C)' },
      spring: { fr: 'Frais (9 °C)', en: 'Chilly (9 °C)' },
      summer: { fr: 'Orageux (18 °C)', en: 'Warm Rain (18 °C)' },
      autumn: { fr: 'Froid humide (6 °C)', en: 'Cold Damp (6 °C)' },
    },
    modifiers: {
      perception: { fr: '-2 Vigilance (vue/ouïe)', en: '-2 Awareness (sight/hearing)' },
      ranged: { fr: '-2 Tir à distance (cordes humides)', en: '-2 Ranged attacks (wet bowstrings)' },
      fireMagic: { fr: '-2 Sorts de Feu (ou +1 END)', en: '-2 Fire Magic (or +1 STA cost)' },
      waterMagic: { fr: '+1 Sorts d’Eau & Foudre', en: '+1 Water & Lightning Magic' },
      travelAndSurvival: {
        fr: 'Allumer un feu SD 14 · Pistes boueuses (-15% trajets)',
        en: 'Firemaking DC 14 · Muddy trails (-15% travel)',
      },
    },
  },
  storm: {
    id: 'storm',
    name: { fr: 'Orage & Tempête', en: 'Heavy Storm' },
    summary: {
      fr: 'Trombes d’eau, tonnerre et rafales rendant la route ou la navigation périlleuse.',
      en: 'Torrential rain, thunder, and gusts making roads and seas hazardous.',
    },
    temperatureBand: {
      winter: { fr: 'Tempête hivernale (1 °C)', en: 'Winter Gale (1 °C)' },
      spring: { fr: 'Agité (8 °C)', en: 'Squally (8 °C)' },
      summer: { fr: 'Orage chaud (19 °C)', en: 'Thunderstorm (19 °C)' },
      autumn: { fr: 'Bourrasques (5 °C)', en: 'Autumn Storm (5 °C)' },
    },
    modifiers: {
      perception: { fr: '-4 Vigilance (bruit/pluie)', en: '-4 Awareness (thunder/rain)' },
      ranged: { fr: '-4 Tir à distance', en: '-4 Ranged attacks' },
      fireMagic: { fr: '-3 Sorts de Feu', en: '-3 Fire Magic' },
      waterMagic: { fr: '+2 Sorts d’Eau & Foudre (cibles trempées)', en: '+2 Water & Lightning Magic' },
      travelAndSurvival: {
        fr: 'Trajet -25% · Naviguer SD 18 · Survie pour abri SD 14',
        en: 'Travel -25% · Sailing DC 18 · Shelter Survival DC 14',
      },
    },
  },
  fog: {
    id: 'fog',
    name: { fr: 'Brouillard épais', en: 'Dense Fog' },
    summary: {
      fr: 'Nappe de brume dense limitant la portée visuelle à quelques mètres.',
      en: 'Thick mist blanketing the land and cutting sightlines to meters.',
    },
    temperatureBand: {
      winter: { fr: 'Brume givrante (-1 °C)', en: 'Freezing Mist (-1 °C)' },
      spring: { fr: 'Matin humide (8 °C)', en: 'Damp Morning (8 °C)' },
      summer: { fr: 'Brume tiède (15 °C)', en: 'Warm Mist (15 °C)' },
      autumn: { fr: 'Brume épaisse (5 °C)', en: 'Thick Fog (5 °C)' },
    },
    modifiers: {
      perception: { fr: '-4 Vigilance (vue > 10 m bloquée)', en: '-4 Awareness (vision capped ~10 m)' },
      ranged: { fr: '-3 Tir au-delà de 6 m', en: '-3 Ranged beyond 6 m' },
      fireMagic: { fr: '-1 Sorts de Feu (humidité)', en: '-1 Fire Magic (damp air)' },
      waterMagic: { fr: '+1 Sorts d’Eau (condensation)', en: '+1 Water Magic' },
      travelAndSurvival: {
        fr: '+2 Discrétion · Risque de s’égarer (Survie SD 14)',
        en: '+2 Stealth · Navigation check (Wilderness Survival DC 14)',
      },
    },
  },
  frost: {
    id: 'frost',
    name: { fr: 'Gel & Neige légère', en: 'Frost & Light Snow' },
    summary: {
      fr: 'Sol gelé, givre matinal et chutes de neige éparses.',
      en: 'Frozen earth, morning rime, and light drifting snow.',
    },
    temperatureBand: {
      winter: { fr: 'Gel mordant (-8 °C)', en: 'Hard Frost (-8 °C)' },
      spring: { fr: 'Gelée tardive (0 °C)', en: 'Late Frost (0 °C)' },
      summer: { fr: 'Gel d’altitude (1 °C)', en: 'Highland Frost (1 °C)' },
      autumn: { fr: 'Premières gelées (-2 °C)', en: 'First Frost (-2 °C)' },
    },
    modifiers: {
      perception: { fr: '-1 Vigilance si neige tombe', en: '-1 Awareness during snowfall' },
      ranged: { fr: '-1 Tir à longue portée', en: '-1 Long-range shots' },
      fireMagic: { fr: 'Normal (-1 si humidité)', en: 'Normal' },
      waterMagic: { fr: '+1 Glace / -1 Eau liquide', en: '+1 Ice / -1 Liquid Water' },
      travelAndSurvival: {
        fr: 'Verglas (-2 Esquive/Athlétisme) · Froid Endurance SD 14/h sans tenue',
        en: 'Ice (-2 Dodge/Athletics) · Cold Endurance DC 14/hr without winter gear',
      },
    },
  },
  blizzard: {
    id: 'blizzard',
    name: { fr: 'Blizzard', en: 'Blizzard' },
    summary: {
      fr: 'Bourrasques glaciales et neige aveuglante exigeant un abri immédiat.',
      en: 'Howling freezing winds and blinding snow demanding shelter.',
    },
    temperatureBand: {
      winter: { fr: 'Grand froid (-18 °C)', en: 'Severe Freeze (-18 °C)' },
      spring: { fr: 'Tempête tardive (-6 °C)', en: 'Late Blizzard (-6 °C)' },
      summer: { fr: 'Tempête de col (-4 °C)', en: 'Peak Whiteout (-4 °C)' },
      autumn: { fr: 'Neige précoce (-10 °C)', en: 'Early Blizzard (-10 °C)' },
    },
    modifiers: {
      perception: { fr: '-5 Vigilance (visibilité 4 m)', en: '-5 Awareness (4 m visibility)' },
      ranged: { fr: '-5 Projectiles', en: '-5 Ranged projectiles' },
      fireMagic: { fr: '-2 Sorts de Feu (vent)', en: '-2 Fire Magic (wind)' },
      waterMagic: { fr: '+2 Sorts de Glace/Froid', en: '+2 Ice & Frost Magic' },
      travelAndSurvival: {
        fr: 'Trajet -50% · Endurance SD 16/h (hypothermie) · Survie SD 16',
        en: 'Travel -50% · Endurance DC 16/hr (hypothermia) · Survival DC 16',
      },
    },
  },
  heatwave: {
    id: 'heatwave',
    name: { fr: 'Canicule', en: 'Heatwave' },
    summary: {
      fr: 'Soleil implacable et air brûlant éprouvant les voyageurs en armure.',
      en: 'Relentless sun and scorching air taxing armored travelers.',
    },
    temperatureBand: {
      winter: { fr: 'Redoux exceptionnel (12 °C)', en: 'Unseasonal Thaw (12 °C)' },
      spring: { fr: 'Chaleur précoce (27 °C)', en: 'Early Heat (27 °C)' },
      summer: { fr: 'Fournaise (36 °C)', en: 'Scorching (36 °C)' },
      autumn: { fr: 'Été indien (26 °C)', en: 'Late Heat (26 °C)' },
    },
    modifiers: {
      perception: { fr: '-1 Vigilance (mirages/soleil)', en: '-1 Awareness (glare)' },
      ranged: { fr: 'Aucun malus', en: 'No penalty' },
      fireMagic: { fr: '+2 Sorts de Feu', en: '+2 Fire Magic' },
      waterMagic: { fr: '-2 Sorts d’Eau (évaporation)', en: '-2 Water Magic (evaporation)' },
      travelAndSurvival: {
        fr: 'Eau ×2 (4 L/j) · Armure EV ≥ 2 : Endurance SD 14/2 h contre fatigue',
        en: 'Water ×2 (4 L/day) · Armor EV ≥ 2: Endurance DC 14/2h vs exhaustion',
      },
    },
  },
  gale: {
    id: 'gale',
    name: { fr: 'Vents violents', en: 'Gale Winds' },
    summary: {
      fr: 'Rafales puissantes déviant flèches, carreaux et voiles.',
      en: 'Strong gusts deflecting arrows, bolts, and sails.',
    },
    temperatureBand: {
      winter: { fr: 'Bise glaciale (-3 °C)', en: 'Freezing Gale (-3 °C)' },
      spring: { fr: 'Venteux (10 °C)', en: 'Windy (10 °C)' },
      summer: { fr: 'Vent chaud (22 °C)', en: 'Hot Gusts (22 °C)' },
      autumn: { fr: 'Rafales d’automne (7 °C)', en: 'Autumn Gales (7 °C)' },
    },
    modifiers: {
      perception: { fr: '-2 Vigilance (ouïe masquée)', en: '-2 Awareness (hearing masked)' },
      ranged: { fr: '-4 Tir à distance > Courte portée', en: '-4 Ranged beyond Close range' },
      fireMagic: { fr: '-1 Contrôle de flammes', en: '-1 Flame control' },
      waterMagic: { fr: 'Normal', en: 'Normal' },
      travelAndSurvival: {
        fr: 'Voiles ±25% selon cap · Naviguer SD 15',
        en: 'Sailing ±25% by heading · Sailing DC 15',
      },
    },
  },
};

const WEATHER_WEIGHTS: Record<
  ClimateRegionId,
  Record<SeasonId, Array<{ id: WeatherConditionId; weight: number }>>
> = {
  'northern-temperate': {
    winter: [
      { id: 'frost', weight: 35 },
      { id: 'overcast', weight: 25 },
      { id: 'rain', weight: 15 },
      { id: 'clear', weight: 12 },
      { id: 'blizzard', weight: 8 },
      { id: 'fog', weight: 5 },
    ],
    spring: [
      { id: 'clear', weight: 30 },
      { id: 'overcast', weight: 25 },
      { id: 'rain', weight: 25 },
      { id: 'fog', weight: 10 },
      { id: 'storm', weight: 5 },
      { id: 'gale', weight: 5 },
    ],
    summer: [
      { id: 'clear', weight: 45 },
      { id: 'overcast', weight: 20 },
      { id: 'rain', weight: 12 },
      { id: 'storm', weight: 12 },
      { id: 'heatwave', weight: 8 },
      { id: 'fog', weight: 3 },
    ],
    autumn: [
      { id: 'overcast', weight: 30 },
      { id: 'rain', weight: 25 },
      { id: 'fog', weight: 18 },
      { id: 'clear', weight: 12 },
      { id: 'gale', weight: 10 },
      { id: 'frost', weight: 5 },
    ],
  },
  'velen-marsh': {
    winter: [
      { id: 'fog', weight: 25 },
      { id: 'rain', weight: 25 },
      { id: 'frost', weight: 25 },
      { id: 'overcast', weight: 20 },
      { id: 'clear', weight: 5 },
    ],
    spring: [
      { id: 'fog', weight: 30 },
      { id: 'rain', weight: 30 },
      { id: 'overcast', weight: 22 },
      { id: 'clear', weight: 10 },
      { id: 'storm', weight: 8 },
    ],
    summer: [
      { id: 'overcast', weight: 28 },
      { id: 'fog', weight: 22 },
      { id: 'rain', weight: 20 },
      { id: 'clear', weight: 18 },
      { id: 'storm', weight: 12 },
    ],
    autumn: [
      { id: 'fog', weight: 32 },
      { id: 'rain', weight: 32 },
      { id: 'overcast', weight: 22 },
      { id: 'storm', weight: 8 },
      { id: 'clear', weight: 6 },
    ],
  },
  'skellige-sea': {
    winter: [
      { id: 'gale', weight: 25 },
      { id: 'storm', weight: 22 },
      { id: 'frost', weight: 20 },
      { id: 'blizzard', weight: 15 },
      { id: 'overcast', weight: 12 },
      { id: 'clear', weight: 6 },
    ],
    spring: [
      { id: 'gale', weight: 28 },
      { id: 'rain', weight: 25 },
      { id: 'overcast', weight: 22 },
      { id: 'clear', weight: 15 },
      { id: 'storm', weight: 10 },
    ],
    summer: [
      { id: 'clear', weight: 30 },
      { id: 'overcast', weight: 25 },
      { id: 'gale', weight: 20 },
      { id: 'rain', weight: 15 },
      { id: 'storm', weight: 10 },
    ],
    autumn: [
      { id: 'gale', weight: 28 },
      { id: 'storm', weight: 22 },
      { id: 'rain', weight: 22 },
      { id: 'fog', weight: 14 },
      { id: 'overcast', weight: 10 },
      { id: 'clear', weight: 4 },
    ],
  },
  'mountains-kaedwen': {
    winter: [
      { id: 'blizzard', weight: 30 },
      { id: 'frost', weight: 40 },
      { id: 'clear', weight: 15 },
      { id: 'gale', weight: 10 },
      { id: 'overcast', weight: 5 },
    ],
    spring: [
      { id: 'frost', weight: 25 },
      { id: 'overcast', weight: 25 },
      { id: 'clear', weight: 22 },
      { id: 'rain', weight: 18 },
      { id: 'gale', weight: 10 },
    ],
    summer: [
      { id: 'clear', weight: 42 },
      { id: 'overcast', weight: 22 },
      { id: 'storm', weight: 16 },
      { id: 'rain', weight: 12 },
      { id: 'gale', weight: 8 },
    ],
    autumn: [
      { id: 'frost', weight: 30 },
      { id: 'overcast', weight: 25 },
      { id: 'gale', weight: 18 },
      { id: 'blizzard', weight: 12 },
      { id: 'clear', weight: 10 },
      { id: 'fog', weight: 5 },
    ],
  },
  'toussaint-south': {
    winter: [
      { id: 'clear', weight: 40 },
      { id: 'overcast', weight: 30 },
      { id: 'rain', weight: 20 },
      { id: 'frost', weight: 6 },
      { id: 'fog', weight: 4 },
    ],
    spring: [
      { id: 'clear', weight: 55 },
      { id: 'overcast', weight: 20 },
      { id: 'rain', weight: 15 },
      { id: 'heatwave', weight: 5 },
      { id: 'storm', weight: 5 },
    ],
    summer: [
      { id: 'clear', weight: 48 },
      { id: 'heatwave', weight: 30 },
      { id: 'storm', weight: 12 },
      { id: 'overcast', weight: 10 },
    ],
    autumn: [
      { id: 'clear', weight: 45 },
      { id: 'overcast', weight: 25 },
      { id: 'rain', weight: 18 },
      { id: 'fog', weight: 7 },
      { id: 'storm', weight: 5 },
    ],
  },
};

export function getMonthDef(monthIndex: number): ElvenMonthDef {
  const safeIndex = ((monthIndex % ELVEN_MONTHS.length) + ELVEN_MONTHS.length) % ELVEN_MONTHS.length;
  return ELVEN_MONTHS[safeIndex];
}

export function getDayOfYear(monthIndex: number, dayOfMonth: number): number {
  let acc = 0;
  for (let i = 0; i < monthIndex; i++) {
    acc += ELVEN_MONTHS[i].length;
  }
  return acc + dayOfMonth;
}

export function getFestivalForDate(
  monthId: ElvenMonthId,
  dayOfMonth: number
): ContinentFestivalDef | null {
  return (
    CONTINENT_FESTIVALS.find(
      (f) => f.monthId === monthId && f.day === dayOfMonth
    ) ?? null
  );
}

export function getMoonPhaseForEpoch(totalDaysElapsed: number): {
  phase: MoonPhaseDef;
  lunarDay: number;
} {
  const lunarDay = ((totalDaysElapsed % 28) + 28) % 28; // 0..27
  let phaseIndex = 0;
  if (lunarDay <= 2) phaseIndex = 0;
  else if (lunarDay <= 6) phaseIndex = 1;
  else if (lunarDay <= 9) phaseIndex = 2;
  else if (lunarDay <= 13) phaseIndex = 3;
  else if (lunarDay <= 16) phaseIndex = 4;
  else if (lunarDay <= 20) phaseIndex = 5;
  else if (lunarDay <= 23) phaseIndex = 6;
  else phaseIndex = 7;

  return {
    phase: MOON_PHASES[phaseIndex],
    lunarDay: lunarDay + 1,
  };
}

export function rollWeatherForSeason(
  regionId: ClimateRegionId,
  season: SeasonId
): WeatherConditionId {
  const table = WEATHER_WEIGHTS[regionId]?.[season] ?? WEATHER_WEIGHTS['northern-temperate'][season];
  const totalWeight = table.reduce((sum, item) => sum + item.weight, 0);
  let r = Math.random() * totalWeight;
  for (const entry of table) {
    r -= entry.weight;
    if (r <= 0) return entry.id;
  }
  return table[0]?.id ?? 'clear';
}

export function formatContinentDate(
  state: Pick<ContinentCalendarState, 'year' | 'monthIndex' | 'dayOfMonth'>
): LocalizedText {
  const month = getMonthDef(state.monthIndex);
  return {
    fr: `${state.dayOfMonth} ${month.name.fr} ${state.year}`,
    en: `${state.dayOfMonth} ${month.name.en}, ${state.year}`,
  };
}

export function getSeasonLabel(season: SeasonId): LocalizedText {
  switch (season) {
    case 'winter':
      return { fr: 'Hiver', en: 'Winter' };
    case 'spring':
      return { fr: 'Printemps', en: 'Spring' };
    case 'summer':
      return { fr: 'Été', en: 'Summer' };
    case 'autumn':
      return { fr: 'Automne', en: 'Autumn' };
  }
}

export function buildInitialCalendarState(): ContinentCalendarState {
  // Default start: 12 Birke 1272 (Spring in Northern Realms, classic Witcher 3 era)
  const initialMonth = 2; // Birke
  const initialDay = 12;
  const initialElapsed = getDayOfYear(initialMonth, initialDay) - 1;
  return {
    version: 1,
    year: 1272,
    monthIndex: initialMonth,
    dayOfMonth: initialDay,
    totalDaysElapsed: initialElapsed,
    regionId: 'northern-temperate',
    weatherId: 'overcast',
    weatherLocked: false,
    recoveryCharacters: [],
    craftingProjects: [],
    logs: [
      {
        id: 'cal-init',
        dayEpoch: initialElapsed,
        dateLabel: { fr: '12 Birke 1272', en: '12 Birke, 1272' },
        kind: 'note',
        message: {
          fr: 'Début du suivi de campagne sur le Continent.',
          en: 'Campaign calendar initialized across the Continent.',
        },
      },
    ],
  };
}

export function loadCalendarState(): ContinentCalendarState {
  if (typeof window === 'undefined') return buildInitialCalendarState();
  try {
    const raw = window.localStorage.getItem(CONTINENT_CALENDAR_STORAGE_KEY);
    if (!raw) return buildInitialCalendarState();
    const parsed = JSON.parse(raw) as Partial<ContinentCalendarState>;
    if (!parsed || typeof parsed !== 'object' || parsed.version !== 1) {
      return buildInitialCalendarState();
    }
    const base = buildInitialCalendarState();
    return {
      ...base,
      ...parsed,
      recoveryCharacters: Array.isArray(parsed.recoveryCharacters)
        ? parsed.recoveryCharacters
        : [],
      craftingProjects: Array.isArray(parsed.craftingProjects)
        ? parsed.craftingProjects
        : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : base.logs,
    };
  } catch {
    return buildInitialCalendarState();
  }
}

export function saveCalendarState(state: ContinentCalendarState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      CONTINENT_CALENDAR_STORAGE_KEY,
      JSON.stringify(state)
    );
    window.dispatchEvent(new CustomEvent(CALENDAR_UPDATED_EVENT));
  } catch {
    // Ignore quota errors
  }
}

export function computeDailyHealAmount(
  char: Pick<TrackedRecoveryCharacter, 'rec' | 'careMode' | 'doctorHealingHands'>,
  overrideCareMode?: RecoveryCareMode
): number {
  const mode = overrideCareMode ?? char.careMode;
  const baseHeal =
    mode === 'rest' ? Math.max(1, char.rec) : Math.max(0, Math.floor(char.rec / 2));
  const doctorBonus = char.doctorHealingHands ? 3 : 0;
  return baseHeal + doctorBonus;
}

export interface AdvanceDaysOptions {
  days: number;
  source?: 'manual' | 'travel';
  careModeOverride?: RecoveryCareMode;
  travelSummaryLabel?: LocalizedText;
  rollWeatherEachDay?: boolean;
}

export interface AdvanceDaysResult {
  nextState: ContinentCalendarState;
  healedSummary: Array<{ name: string; healedHp: number; woundCleared: boolean }>;
  completedProjects: string[];
  festivalsEncountered: ContinentFestivalDef[];
}

export function advanceCalendarDays(
  current: ContinentCalendarState,
  options: AdvanceDaysOptions
): AdvanceDaysResult {
  const days = Math.max(1, Math.min(365, Math.round(options.days)));
  let year = current.year;
  let monthIndex = current.monthIndex;
  let dayOfMonth = current.dayOfMonth;
  let totalDaysElapsed = current.totalDaysElapsed;
  let weatherId = current.weatherId;

  const festivalsEncountered: ContinentFestivalDef[] = [];

  for (let step = 0; step < days; step++) {
    const monthDef = getMonthDef(monthIndex);
    dayOfMonth += 1;
    totalDaysElapsed += 1;
    if (dayOfMonth > monthDef.length) {
      dayOfMonth = 1;
      monthIndex += 1;
      if (monthIndex >= ELVEN_MONTHS.length) {
        monthIndex = 0;
        year += 1;
      }
    }
    const newMonth = getMonthDef(monthIndex);
    const festival = getFestivalForDate(newMonth.id, dayOfMonth);
    if (festival) {
      festivalsEncountered.push(festival);
    }
    if (!current.weatherLocked && (options.rollWeatherEachDay !== false)) {
      weatherId = rollWeatherForSeason(current.regionId, newMonth.season);
    }
  }

  // Advance PC recovery
  const healedSummary: Array<{
    name: string;
    healedHp: number;
    woundCleared: boolean;
  }> = [];

  const nextCharacters = current.recoveryCharacters.map((char) => {
    const perDay = computeDailyHealAmount(char, options.careModeOverride);
    const potentialHeal = perDay * days;
    const prevHp = char.currentHp;
    const nextHp = Math.min(char.maxHp, prevHp + potentialHeal);
    const actualHealed = Math.max(0, nextHp - prevHp);

    let nextWoundDays = char.criticalWoundDaysLeft;
    let woundCleared = false;
    if (nextWoundDays > 0) {
      nextWoundDays = Math.max(0, nextWoundDays - days);
      if (nextWoundDays === 0) woundCleared = true;
    }

    if (actualHealed > 0 || woundCleared) {
      healedSummary.push({
        name: char.name,
        healedHp: actualHealed,
        woundCleared,
      });
    }

    return {
      ...char,
      currentHp: nextHp,
      criticalWoundDaysLeft: nextWoundDays,
      criticalWoundNote: woundCleared ? '' : char.criticalWoundNote,
    };
  });

  // Advance crafting projects
  const completedProjects: string[] = [];
  const isTravel = options.source === 'travel';
  const nextProjects = current.craftingProjects.map((proj) => {
    if (!proj.active || proj.daysCompleted >= proj.totalDays) return proj;
    if (isTravel && !proj.workDuringTravel) return proj;

    const nextCompleted = Math.min(proj.totalDays, proj.daysCompleted + days);
    const justFinished =
      proj.daysCompleted < proj.totalDays && nextCompleted >= proj.totalDays;
    if (justFinished) {
      completedProjects.push(proj.title);
    }
    return {
      ...proj,
      daysCompleted: nextCompleted,
      completedAtDay: justFinished ? totalDaysElapsed : proj.completedAtDay,
    };
  });

  const newDateLabel = formatContinentDate({ year, monthIndex, dayOfMonth });
  const weatherName = WEATHER_DEFINITIONS[weatherId].name;

  const newLogs: CalendarLogEntry[] = [];

  if (options.source === 'travel' && options.travelSummaryLabel) {
    newLogs.push({
      id: `cal-log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dayEpoch: totalDaysElapsed,
      dateLabel: newDateLabel,
      kind: 'travel',
      message: {
        fr: `Trajet terminé (+${days} j) : ${options.travelSummaryLabel.fr} · Météo d’arrivée : ${weatherName.fr}.`,
        en: `Journey completed (+${days} d): ${options.travelSummaryLabel.en} · Arrival weather: ${weatherName.en}.`,
      },
    });
  } else {
    newLogs.push({
      id: `cal-log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dayEpoch: totalDaysElapsed,
      dateLabel: newDateLabel,
      kind: 'advance',
      message: {
        fr: `+${days} jour(s) écoulé(s) · Météo : ${weatherName.fr}.`,
        en: `+${days} day(s) passed · Weather: ${weatherName.en}.`,
      },
    });
  }

  for (const fest of festivalsEncountered) {
    newLogs.push({
      id: `cal-fest-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dayEpoch: totalDaysElapsed,
      dateLabel: newDateLabel,
      kind: 'note',
      message: {
        fr: `Fête du Continent atteinte : ${fest.name.fr}.`,
        en: `Continent festival reached: ${fest.name.en}.`,
      },
    });
  }

  if (healedSummary.length > 0) {
    const healedFr = healedSummary
      .map(
        (h) =>
          `${h.name} (+${h.healedHp} PV${h.woundCleared ? ', blessure critique guérie' : ''})`
      )
      .join(', ');
    const healedEn = healedSummary
      .map(
        (h) =>
          `${h.name} (+${h.healedHp} HP${h.woundCleared ? ', critical wound healed' : ''})`
      )
      .join(', ');

    newLogs.push({
      id: `cal-heal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dayEpoch: totalDaysElapsed,
      dateLabel: newDateLabel,
      kind: 'recovery',
      message: {
        fr: `Récupération : ${healedFr}.`,
        en: `Recovery: ${healedEn}.`,
      },
    });
  }

  if (completedProjects.length > 0) {
    newLogs.push({
      id: `cal-craft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dayEpoch: totalDaysElapsed,
      dateLabel: newDateLabel,
      kind: 'crafting',
      message: {
        fr: `Artisanat terminé : ${completedProjects.join(', ')}.`,
        en: `Crafting completed: ${completedProjects.join(', ')}.`,
      },
    });
  }

  const nextState: ContinentCalendarState = {
    ...current,
    year,
    monthIndex,
    dayOfMonth,
    totalDaysElapsed,
    weatherId,
    recoveryCharacters: nextCharacters,
    craftingProjects: nextProjects,
    logs: [...newLogs, ...current.logs].slice(0, 60),
  };

  return {
    nextState,
    healedSummary,
    completedProjects,
    festivalsEncountered,
  };
}

/**
 * Imports missing PCs/allies from the Shared GM Hub without overwriting existing HP/wound state.
 */
export function syncRecoveryWithHubCharacters(
  existing: readonly TrackedRecoveryCharacter[]
): {
  characters: TrackedRecoveryCharacter[];
  addedCount: number;
} {
  const hub = loadCombatHubState();
  const byHubId = new Set(existing.map((c) => c.hubPcId).filter(Boolean));
  const additions: TrackedRecoveryCharacter[] = [];

  for (const pc of hub.characters) {
    if (byHubId.has(pc.id)) continue;
    additions.push({
      id: `rec-${pc.id}`,
      hubPcId: pc.id,
      name: pc.name,
      professionLabel: pc.professionLabel || (pc.role === 'pc' ? 'PJ' : 'Allié'),
      currentHp: pc.maxHp,
      maxHp: pc.maxHp,
      rec: pc.stats.rec,
      careMode: 'rest',
      doctorHealingHands: false,
      criticalWoundNote: '',
      criticalWoundDaysLeft: 0,
    });
  }

  return {
    characters: [...existing, ...additions],
    addedCount: additions.length,
  };
}

/**
 * Helper used by crafting queue when importing a diagram/formula from Codex Artisanat.
 */
export function parseLexiconCraftDays(timeText: string): number {
  const lower = timeText.toLowerCase();
  const numMatch = lower.match(/(\d+(?:[.,]\d+)?)/);
  if (!numMatch) return 1;
  const val = Number.parseFloat(numMatch[1].replace(',', '.'));
  if (!Number.isFinite(val) || val <= 0) return 1;

  if (lower.includes('day') || lower.includes('jour')) {
    return Math.max(1, Math.ceil(val));
  }
  if (lower.includes('week') || lower.includes('semaine')) {
    return Math.max(1, Math.ceil(val * 7));
  }
  if (lower.includes('hour') || lower.includes('heure') || lower.includes('hr') || lower.includes('h')) {
    // 8 hours of workshop effort = 1 crafting day
    return Math.max(1, Math.ceil(val / 8));
  }
  return 1;
}
