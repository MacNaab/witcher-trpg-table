import { useCallback, useEffect, useState } from 'react';
import { isValidModuleId } from '@/src/config/modules';
import type { ModuleId, ModuleLaunchIntent } from '@/src/types/navigation';

/**
 * Reads the current URL hash (`#module-id`) and validates it against registered modules.
 */
function readModuleFromHash(): ModuleId {
  if (typeof window === 'undefined') {
    return 'overview';
  }
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  return isValidModuleId(raw) ? raw : 'overview';
}

/**
 * Synchronizes the active module view with the browser URL hash (`#module-id`),
 * supporting browser back/forward history and optional sub-tab/session launch intents.
 */
export function useActiveModule() {
  const [activeModule, setActiveModuleState] = useState<ModuleId>(readModuleFromHash);
  const [launchIntent, setLaunchIntent] = useState<ModuleLaunchIntent | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveModuleState(readModuleFromHash());
      setLaunchIntent(null);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback(
    (
      nextId: ModuleId,
      intent?: Omit<ModuleLaunchIntent, 'nonce'>
    ) => {
      setActiveModuleState(nextId);
      setLaunchIntent(
        intent ? { nonce: Date.now() + Math.random(), ...intent } : null
      );
      const targetHash = nextId === 'overview' ? '' : `#${nextId}`;
      if (window.location.hash !== targetHash) {
        if (targetHash === '') {
          window.history.pushState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = nextId;
        }
      }
    },
    []
  );

  return { activeModule, launchIntent, navigateTo };
}
