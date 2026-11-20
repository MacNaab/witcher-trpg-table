import { en } from '@/src/i18n/locales/en';
import { fr } from '@/src/i18n/locales/fr';
import type { Locale, LocaleMeta, TranslationDictionary } from '@/src/i18n/types';

/**
 * Registry of supported UI languages.
 * Add new languages here alongside their dictionary file.
 */
export const AVAILABLE_LOCALES: readonly LocaleMeta[] = [
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
] as const;

export const DEFAULT_LOCALE: Locale = 'fr';

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  fr,
  en,
};
