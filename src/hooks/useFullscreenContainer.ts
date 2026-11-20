import { useSyncExternalStore } from 'react';

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
};

const FULLSCREEN_EVENTS = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
  'MSFullscreenChange',
] as const;

/**
 * Reads the current browser native fullscreen element, if any.
 */
export function getFullscreenElement(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  const doc = document as FullscreenDocument;
  const el =
    doc.fullscreenElement ??
    doc.webkitFullscreenElement ??
    doc.mozFullScreenElement ??
    doc.msFullscreenElement ??
    null;
  return el instanceof HTMLElement ? el : null;
}

function subscribeFullscreenChange(callback: () => void): () => void {
  if (typeof document === 'undefined') return () => {};
  for (const eventName of FULLSCREEN_EVENTS) {
    document.addEventListener(eventName, callback);
  }
  return () => {
    for (const eventName of FULLSCREEN_EVENTS) {
      document.removeEventListener(eventName, callback);
    }
  };
}

/**
 * React hook returning the active native fullscreen container element (or null).
 * Essential for Portal-based UI (Dialog, Select, Tooltip, DropdownMenu, Toaster)
 * so overlays mount inside the browser's fullscreen Top Layer instead of document.body.
 */
export function useFullscreenContainer(): HTMLElement | null {
  return useSyncExternalStore(
    subscribeFullscreenChange,
    getFullscreenElement,
    () => null
  );
}
