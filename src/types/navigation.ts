import type { LucideIcon } from 'lucide-react';

/**
 * Identifiers for the top-level overview and the 8 Witcher TRPG GM modules.
 * Add new module IDs here first when expanding the application.
 */
export type ModuleId =
  | 'overview'
  | 'random-tables'
  | 'urban-generator'
  | 'encounter-manager'
  | 'combat-tracker'
  | 'travel-manager'
  | 'lexicon-tables'
  | 'character-generator'
  | 'combat-simulator'
  | 'verbal-combat'
  | 'campaign-calendar'
  | 'campaign-chronicle'
  | 'homebrew-studio';

/**
 * Logical grouping used for sidebar sections and overview filtering.
 */
export type ModuleGroupId = 'world' | 'combat' | 'reference';

/**
 * Readiness status of a module slot.
 * Allows progressive module-by-module implementation without breaking navigation.
 */
export type ModuleStatus = 'ready' | 'pending';

/**
 * Metadata contract describing a registered GM tool module.
 */
export interface ModuleDefinition {
  id: Exclude<ModuleId, 'overview'>;
  group: ModuleGroupId;
  icon: LucideIcon;
  shortcut: string;
  status: ModuleStatus;
}

/**
 * Optional deep-link payload passed when jumping to a module
 * (e.g. from CommandSearchDialog or cross-module action bridges).
 */
export interface ModuleLaunchIntent {
  nonce: number;
  tab?: string;
  sessionId?: string;
  entryId?: string;
}

export interface ModuleEntryProps {
  onNavigateOverview: () => void;
  onNavigateModule?: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
  launchIntent?: ModuleLaunchIntent | null;
}
