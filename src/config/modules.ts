import {
  BarChart3,
  BookText,
  CalendarDays,
  Castle,
  Compass,
  Dices,
  FileSearch,
  Flame,
  Landmark,
  Languages,
  Milestone,
  Scale,
  Skull,
  Swords,
  UserRound,
} from 'lucide-react';
import type { ModuleDefinition, ModuleGroupId, ModuleId } from '@/src/types/navigation';

/**
 * Ordered list of sidebar/directory groups.
 */
export const MODULE_GROUPS: readonly ModuleGroupId[] = [
  'world',
  'combat',
  'reference',
] as const;

/**
 * Master registry of all 8 Witcher TRPG Game Master modules.
 * Each entry points to an isolated module under `src/modules/<id>/index.tsx`.
 */
export const GM_MODULES: readonly ModuleDefinition[] = [
  {
    id: 'random-tables',
    group: 'world',
    icon: Dices,
    shortcut: '1',
    status: 'ready',
  },
  {
    id: 'urban-generator',
    group: 'world',
    icon: Castle,
    shortcut: '2',
    status: 'ready',
  },
  {
    id: 'travel-manager',
    group: 'world',
    icon: Compass,
    shortcut: '3',
    status: 'ready',
  },
  {
    id: 'campaign-calendar',
    group: 'world',
    icon: CalendarDays,
    shortcut: '0',
    status: 'ready',
  },
  {
    id: 'campaign-chronicle',
    group: 'world',
    icon: Milestone,
    shortcut: 'C',
    status: 'ready',
  },
  {
    id: 'investigation-contracts',
    group: 'world',
    icon: FileSearch,
    shortcut: 'E',
    status: 'ready',
  },
  {
    id: 'estate-manager',
    group: 'world',
    icon: Landmark,
    shortcut: 'D',
    status: 'ready',
  },
  {
    id: 'encounter-manager',
    group: 'combat',
    icon: Skull,
    shortcut: '4',
    status: 'ready',
  },
  {
    id: 'combat-tracker',
    group: 'combat',
    icon: Swords,
    shortcut: '5',
    status: 'ready',
  },
  {
    id: 'combat-simulator',
    group: 'combat',
    icon: BarChart3,
    shortcut: '6',
    status: 'ready',
  },
  {
    id: 'verbal-combat',
    group: 'combat',
    icon: Scale,
    shortcut: '9',
    status: 'ready',
  },
  {
    id: 'character-generator',
    group: 'reference',
    icon: UserRound,
    shortcut: '7',
    status: 'ready',
  },
  {
    id: 'lexicon-tables',
    group: 'reference',
    icon: Languages,
    shortcut: '8',
    status: 'ready',
  },
  {
    id: 'homebrew-studio',
    group: 'reference',
    icon: BookText,
    shortcut: 'P',
    status: 'ready',
  },
  {
    id: 'chaos-ley-goetia',
    group: 'reference',
    icon: Flame,
    shortcut: 'G',
    status: 'ready',
  },
] as const;

const MODULE_MAP = new Map<ModuleId, ModuleDefinition>(
  GM_MODULES.map((mod) => [mod.id, mod])
);

export function isValidModuleId(value: string): value is ModuleId {
  return value === 'overview' || MODULE_MAP.has(value as ModuleId);
}

export function getModuleDefinition(
  id: Exclude<ModuleId, 'overview'>
): ModuleDefinition {
  const found = MODULE_MAP.get(id);
  if (!found) {
    throw new Error(`Unknown GM module id: ${id}`);
  }
  return found;
}

export function getModulesByGroup(group: ModuleGroupId): ModuleDefinition[] {
  return GM_MODULES.filter((mod) => mod.group === group);
}
