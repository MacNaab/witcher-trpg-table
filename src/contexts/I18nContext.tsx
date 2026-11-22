import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE, DICTIONARIES } from '@/src/i18n';
import type { Locale, TranslationDictionary } from '@/src/i18n/types';

const LOCALE_STORAGE_KEY = 'witcher-gm-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: TranslationDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Resolves the initial locale from localStorage, falling back to browser language
 * or the configured default locale ('fr').
 */
function resolveInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && AVAILABLE_LOCALES.some((item) => item.code === stored)) {
      return stored as Locale;
    }

    const browserLang = window.navigator.language.slice(0, 2).toLowerCase();
    const matched = AVAILABLE_LOCALES.find((item) => item.code === browserLang);
    return matched ? matched.code : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore storage quota or private browsing errors gracefully.
    }
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTIONARIES[locale],
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Access the current locale, translation dictionary `t`, and `setLocale` mutator.
 */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider.');
  }
  return ctx;
}
