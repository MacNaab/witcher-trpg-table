import { createPortal } from 'react-dom';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppShell } from '@/src/components/layout/AppShell';
import { I18nProvider } from '@/src/contexts/I18nContext';
import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { useFullscreenContainer } from '@/src/hooks/useFullscreenContainer';

/**
 * Root application component providing theme, localization, tooltip context,
 * and toast notifications around the modular Witcher TRPG GM workspace.
 */
export default function App() {
  const fullscreenContainer = useFullscreenContainer();
  const toaster = <Toaster position="bottom-right" />;

  return (
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider delay={200}>
          <AppShell />
          {fullscreenContainer
            ? createPortal(toaster, fullscreenContainer)
            : toaster}
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
