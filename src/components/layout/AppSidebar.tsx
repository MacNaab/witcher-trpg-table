import { Bug, ExternalLink, LayoutGrid, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { GM_MODULES, MODULE_GROUPS } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleId } from '@/src/types/navigation';

interface AppSidebarProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
  onOpenCommandPalette: () => void;
}

/**
 * Geometric Wolf-School emblem SVG tailored to The Witcher aesthetic.
 */
function WolfMedallionEmblem() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M5 4l3.5 4.5h7L19 4l-1.5 7.5L12 20 6.5 11.5 5 4z" />
      <path d="M9 12l1.5 1.5M15 12l-1.5 1.5" />
      <path d="M12 15v5" />
    </svg>
  );
}

/**
 * Primary application navigation sidebar built with Shadcn Sidebar primitives.
 * Adapts automatically between desktop collapsible rail and mobile drawer Sheet.
 */
export function AppSidebar({
  activeModule,
  onSelectModule,
  onOpenCommandPalette,
}: AppSidebarProps) {
  const { t } = useI18n();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavigate = (id: ModuleId) => {
    onSelectModule(id);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="shrink-0 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={t.app.brand}
              onClick={() => handleNavigate('overview')}
              className="hover:bg-sidebar-accent/70"
            >
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-primary/15 text-primary">
                <WolfMedallionEmblem />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-display text-sm font-semibold tracking-wide text-sidebar-foreground">
                  {t.app.brand}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {t.app.subtitle}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="shrink-0" />

      <SidebarContent className="overflow-hidden p-0">
        {/* Scrollable navigation area keeping header and footer pinned */}
        <ScrollArea className="flex h-0 min-h-0 w-full flex-1 flex-col overflow-x-hidden [&_[data-slot=scroll-area-scrollbar]]:z-30 [&_[data-slot=scroll-area-scrollbar]]:w-2.5 [&_[data-slot=scroll-area-scrollbar]]:p-0.5 [&_[data-slot=scroll-area-thumb]]:bg-sidebar-foreground/30 hover:[&_[data-slot=scroll-area-thumb]]:bg-sidebar-foreground/55 active:[&_[data-slot=scroll-area-thumb]]:bg-primary/80 [&_[data-slot=scroll-area-viewport]]:min-h-0 [&_[data-slot=scroll-area-viewport]]:flex-1 [&_[data-slot=scroll-area-viewport]]:overflow-x-hidden! [&_[data-slot=scroll-area-viewport]]:overflow-y-auto! group-data-[collapsible=icon]:[&_[data-slot=scroll-area-scrollbar]]:w-1.5">
          <div className="flex w-full min-w-0 flex-col overflow-hidden pb-2 pr-2.5 group-data-[collapsible=icon]:pr-0">
            {/* Overview & Quick Search */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeModule === 'overview'}
                      tooltip={t.nav.overview}
                      onClick={() => handleNavigate('overview')}
                    >
                      <LayoutGrid />
                      <span>{t.nav.overview}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton
                      tooltip={t.nav.openCommandPalette}
                      onClick={() => {
                        if (isMobile) setOpenMobile(false);
                        onOpenCommandPalette();
                      }}
                    >
                      <Search />
                      <span>{t.nav.openCommandPalette}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Grouped GM Categories */}
            {MODULE_GROUPS.map((groupId) => {
              const groupModules = GM_MODULES.filter((mod) => mod.group === groupId);

              return (
                <SidebarGroup key={groupId}>
                  <SidebarGroupLabel className="truncate">
                    {t.nav.groups[groupId]}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {groupModules.map((mod) => {
                        const Icon = mod.icon;
                        const label = t.modules[mod.id].shortTitle;

                        return (
                          <SidebarMenuItem key={mod.id}>
                            <SidebarMenuButton
                              isActive={activeModule === mod.id}
                              tooltip={t.modules[mod.id].title}
                              onClick={() => handleNavigate(mod.id)}
                            >
                              <Icon />
                              <span>{label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              );
            })}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="shrink-0 border-t border-sidebar-border py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={`${t.app.issuesNotice} — ${t.app.issuesCta}`}
              render={
                <a
                  href={t.app.issuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Bug className="size-4 text-primary" />
              <span className="truncate">{t.app.issuesShortLabel}</span>
              <ExternalLink className="ml-auto size-3 shrink-0 opacity-60" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <span className="truncate">{t.app.subtitle}</span>
          <span className="font-mono tabular-nums">Ctrl+K</span>
        </div>
      </SidebarFooter>

      {/* Keep collapse rail outside the sidebar border so it never overlaps the scrollbar */}
      <SidebarRail className="w-2 group-data-[side=left]:right-auto group-data-[side=left]:left-full ltr:translate-x-0 rtl:translate-x-0 after:start-0" />
    </Sidebar>
  );
}
