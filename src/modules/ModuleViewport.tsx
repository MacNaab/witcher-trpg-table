import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { OverviewHub } from '@/src/components/views/OverviewHub';
import type {
  ModuleEntryProps,
  ModuleId,
  ModuleLaunchIntent,
} from '@/src/types/navigation';

/**
 * Lazy-loaded isolated module map.
 * Each category is code-split and maintained independently under `src/modules/<id>/`.
 */
const MODULE_COMPONENTS: Record<
  Exclude<ModuleId, 'overview'>,
  React.LazyExoticComponent<React.ComponentType<ModuleEntryProps>>
> = {
  'random-tables': lazy(() => import('@/src/modules/random-tables')),
  'urban-generator': lazy(() => import('@/src/modules/urban-generator')),
  'encounter-manager': lazy(() => import('@/src/modules/encounter-manager')),
  'combat-tracker': lazy(() => import('@/src/modules/combat-tracker')),
  'travel-manager': lazy(() => import('@/src/modules/travel-manager')),
  'lexicon-tables': lazy(() => import('@/src/modules/lexicon-tables')),
  'character-generator': lazy(() => import('@/src/modules/character-generator')),
  'combat-simulator': lazy(() => import('@/src/modules/combat-simulator')),
  'verbal-combat': lazy(() => import('@/src/modules/verbal-combat')),
  'campaign-calendar': lazy(() => import('@/src/modules/campaign-calendar')),
  'campaign-chronicle': lazy(() => import('@/src/modules/campaign-chronicle')),
  'homebrew-studio': lazy(() => import('@/src/modules/homebrew-studio')),
};

interface ModuleViewportProps {
  activeModule: ModuleId;
  launchIntent: ModuleLaunchIntent | null;
  onSelectModule: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
  onOpenCommandPalette: () => void;
}

function ModuleLoadingFallback() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-11 rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-7 w-64" />
        </div>
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

/**
 * Switches between the Overview Hub and the active isolated GM category module.
 */
export function ModuleViewport({
  activeModule,
  launchIntent,
  onSelectModule,
  onOpenCommandPalette,
}: ModuleViewportProps) {
  if (activeModule === 'overview') {
    return (
      <OverviewHub
        onSelectModule={onSelectModule}
        onOpenCommandPalette={onOpenCommandPalette}
      />
    );
  }

  const ActiveComponent = MODULE_COMPONENTS[activeModule];

  return (
    <Suspense fallback={<ModuleLoadingFallback />}>
      <ActiveComponent
        onNavigateOverview={() => onSelectModule('overview')}
        onNavigateModule={onSelectModule}
        launchIntent={launchIntent}
      />
    </Suspense>
  );
}
