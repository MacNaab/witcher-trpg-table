import { useEffect, useState } from 'react';
import {
  Archive,
  CalendarDays,
  Dices,
  Languages,
  Moon,
  NotebookPen,
  Search,
  Sun,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import { useTheme } from '@/src/contexts/ThemeContext';
import { AVAILABLE_LOCALES } from '@/src/i18n';
import type { Locale } from '@/src/i18n/types';
import type { ModuleId } from '@/src/types/navigation';
import {
  CALENDAR_UPDATED_EVENT,
  WEATHER_DEFINITIONS,
  getMonthDef,
  loadCalendarState,
} from '@/src/utils/continentCalendar';

interface TopHeaderProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onOpenCommandPalette: () => void;
  onOpenDice: () => void;
  onOpenNotes: () => void;
  onOpenBackup: () => void;
}

/**
 * Compact sticky top header bar providing:
 * - Sidebar drawer/rail trigger
 * - Contextual breadcrumb navigation
 * - Quick search trigger
 * - Quick Dice Roller & GM Session Notes triggers
 * - Global campaign JSON backup/restore trigger
 * - Multilingual switcher (FR / EN)
 * - Dark/Light appearance toggle
 */
export function TopHeader({
  activeModule,
  onSelectModule,
  onOpenCommandPalette,
  onOpenDice,
  onOpenNotes,
  onOpenBackup,
}: TopHeaderProps) {
  const { locale, setLocale, t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const lang = locale === 'fr' ? 'fr' : 'en';

  const [calSnapshot, setCalSnapshot] = useState(() => loadCalendarState());

  useEffect(() => {
    const syncCal = () => setCalSnapshot(loadCalendarState());
    window.addEventListener(CALENDAR_UPDATED_EVENT, syncCal);
    return () => window.removeEventListener(CALENDAR_UPDATED_EVENT, syncCal);
  }, []);

  const currentMonth = getMonthDef(calSnapshot.monthIndex);
  const currentWeather = WEATHER_DEFINITIONS[calSnapshot.weatherId];

  const currentModDef =
    activeModule === 'overview' ? null : getModuleDefinition(activeModule);
  const currentModTitle =
    activeModule === 'overview'
      ? t.nav.overview
      : t.modules[activeModule].shortTitle;

  const isDark = resolvedTheme !== 'light';

  const handleToggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    toast.success(
      `${t.controls.themeSwitched}: ${
        nextTheme === 'dark' ? t.controls.themeDark : t.controls.themeLight
      }`
    );
  };

  const handleLocaleChange = (nextLocale: string) => {
    const typed = nextLocale as Locale;
    setLocale(typed);
    const meta = AVAILABLE_LOCALES.find((item) => item.code === typed);
    toast.success(meta ? `${t.controls.language}: ${meta.nativeLabel}` : t.controls.languageSwitched);
  };

  return (
    <header className="@container sticky top-0 z-20 flex h-14 w-full min-w-0 shrink-0 items-center justify-between gap-3 overflow-hidden border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Left: Sidebar trigger & contextual breadcrumbs */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <SidebarTrigger aria-label={t.nav.collapseSidebar} className="shrink-0" />
        <Separator orientation="vertical" className="h-4 shrink-0" />

        <Breadcrumb className="min-w-0 flex-1 overflow-hidden">
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="hidden min-w-0 @md:inline-flex">
              <BreadcrumbLink
                render={
                  <button
                    type="button"
                    onClick={() => onSelectModule('overview')}
                    className="cursor-pointer truncate text-muted-foreground hover:text-foreground"
                  />
                }
              >
                {t.app.brand}
              </BreadcrumbLink>
            </BreadcrumbItem>

            {currentModDef && (
              <>
                <BreadcrumbSeparator className="hidden shrink-0 @md:inline-flex" />
                <BreadcrumbItem className="hidden min-w-0 @2xl:inline-flex">
                  <span className="truncate text-muted-foreground">
                    {t.nav.groups[currentModDef.group]}
                  </span>
                </BreadcrumbItem>
              </>
            )}

            <BreadcrumbSeparator className="hidden shrink-0 @md:inline-flex" />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate font-medium">
                {currentModTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Search, Quick Tools, Backup, Language switcher, Theme toggle */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCommandPalette}
          className="hidden gap-2 text-muted-foreground @lg:inline-flex"
          aria-label={t.nav.openCommandPalette}
        >
          <Search data-icon="inline-start" className="size-3.5" />
          <span className="hidden @4xl:inline">{t.nav.openCommandPalette}</span>
          <kbd className="pointer-events-none hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground @4xl:inline-block">
            Ctrl+K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onOpenCommandPalette}
          className="@lg:hidden"
          aria-label={t.nav.openCommandPalette}
        >
          <Search className="size-4" />
        </Button>

        <Button
          variant={activeModule === 'campaign-calendar' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onSelectModule('campaign-calendar')}
          aria-label={t.modules['campaign-calendar'].title}
          title={`${calSnapshot.dayOfMonth} ${currentMonth.name[lang]} ${calSnapshot.year} · ${currentWeather.name[lang]}`}
          className="hidden gap-1.5 font-mono text-xs @xl:inline-flex"
        >
          <CalendarDays className="size-3.5 text-primary" aria-hidden="true" />
          <span className="tabular-nums">
            {calSnapshot.dayOfMonth} {currentMonth.name[lang]}
          </span>
          <span className="hidden text-muted-foreground @6xl:inline">
            · {currentWeather.name[lang]}
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenDice}
          aria-label={t.dice.title}
          title={t.dice.title}
          className="gap-1.5"
        >
          <Dices className="size-3.5 text-primary" aria-hidden="true" />
          <span className="hidden @5xl:inline">{t.dice.buttonLabel}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenNotes}
          aria-label={t.notes.title}
          title={t.notes.title}
          className="gap-1.5"
        >
          <NotebookPen className="size-3.5 text-primary" aria-hidden="true" />
          <span className="hidden @5xl:inline">{t.notes.buttonLabel}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenBackup}
          aria-label={t.backup.title}
          title={t.backup.title}
          className="gap-1.5"
        >
          <Archive className="size-3.5 text-primary" aria-hidden="true" />
          <span className="hidden @5xl:inline">{t.backup.buttonLabel}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="sm"
                aria-label={t.controls.language}
                className="gap-1.5 font-mono text-xs uppercase"
              >
                <Languages data-icon="inline-start" className="size-3.5" />
                <span>{locale}</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t.controls.language}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={locale}
              onValueChange={handleLocaleChange}
            >
              {AVAILABLE_LOCALES.map((item) => (
                <DropdownMenuRadioItem key={item.code} value={item.code}>
                  <span className="flex-1">{item.nativeLabel}</span>
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    {item.code}
                  </span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleToggleTheme}
          aria-label={t.controls.theme}
          title={isDark ? t.controls.themeLight : t.controls.themeDark}
        >
          {isDark ? (
            <Sun className="size-4 text-primary" />
          ) : (
            <Moon className="size-4 text-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
}
