/**
 * Core domain types for the multi-campaign chronological tracker.
 */

export type ModuleLanguage = 'fr' | 'en';

export type CampaignStatus = 'active' | 'paused' | 'completed';

export type ChronicleEventCategory =
  | 'story'
  | 'contract'
  | 'combat'
  | 'travel'
  | 'politics'
  | 'npc'
  | 'discovery'
  | 'downtime';

export type ChronicleEventStatus =
  | 'completed'
  | 'active'
  | 'upcoming'
  | 'consequence';

export type ChronicleImportance = 'minor' | 'major' | 'turning-point';

export type ChronicleTimeOfDay =
  | 'dawn'
  | 'morning'
  | 'afternoon'
  | 'dusk'
  | 'night';

export type ChronicleViewMode = 'timeline' | 'sessions' | 'table';

export type ChronicleSortOrder = 'asc' | 'desc';

/**
 * In-world Continent date anchored to the 8 official Elven periods.
 */
export interface ChronicleContinentDate {
  year: number;
  monthIndex: number;
  dayOfMonth: number;
  timeOfDay: ChronicleTimeOfDay;
}

/**
 * Campaign container allowing a GM to manage multiple independent chronicles.
 */
export interface CampaignRecord {
  id: string;
  name: string;
  subtitle: string;
  region: string;
  description: string;
  currentSessionNumber: number;
  /** Maps session number (as string key, e.g. "1") to ISO real-world date "YYYY-MM-DD" */
  sessionDates: Record<string, string>;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Individual chronological entry belonging to a specific campaign.
 */
export interface ChronicleEvent {
  id: string;
  campaignId: string;
  title: string;
  summary: string;
  gmSecretNote: string;
  date: ChronicleContinentDate;
  sessionNumber: number;
  category: ChronicleEventCategory;
  status: ChronicleEventStatus;
  importance: ChronicleImportance;
  location: string;
  involvedEntities: string[];
  consequences: string;
  pinned: boolean;
  sortOrderOffset: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Root persisted store for all campaigns and chronicle events.
 */
export interface CampaignChronicleStore {
  version: 1;
  activeCampaignId: string;
  campaigns: CampaignRecord[];
  events: ChronicleEvent[];
}
