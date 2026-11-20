import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bug,
  Castle,
  Compass,
  ExternalLink,
  Milestone,
  Play,
  Search,
  Swords,
  UserRound,
  Users,
} from 'lucide-react';
import heroBannerImg from '@/src/assets/images/witcher_gm_grimoire_1794558035520.jpg';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GM_MODULES,
  MODULE_GROUPS,
  getModulesByGroup,
} from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import { loadChronicleStore } from '@/src/modules/campaign-chronicle/utils/chronicleStorage';
import {
  loadCombatHubState,
  loadCombatSessions,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import { loadUrbanHistory } from '@/src/modules/urban-generator/utils/urbanStorage';
import type {
  ModuleDefinition,
  ModuleGroupId,
  ModuleId,
  ModuleLaunchIntent,
} from '@/src/types/navigation';

type GroupFilter = 'all' | ModuleGroupId;

interface OverviewHubProps {
  onSelectModule: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
  onOpenCommandPalette: () => void;
}

function readCharGenDraftName(): { exists: boolean; name: string } {
  if (typeof window === 'undefined') return { exists: false, name: '' };
  try {
    const raw = window.localStorage.getItem('witcher-gm-chargen-draft-v1');
    if (!raw) return { exists: false, name: '' };
    const parsed = JSON.parse(raw) as { characterName?: string };
    return {
      exists: Boolean(parsed && typeof parsed === 'object'),
      name:
        typeof parsed?.characterName === 'string'
          ? parsed.characterName.trim()
          : '',
    };
  } catch {
    return { exists: false, name: '' };
  }
}

/**
 * Primary GM Hub overview.
 * Presents the Witcher tabletop workbench hero, a contextual Campaign Quick-Resume strip
 * when local campaign data exists, and a structured module directory.
 */
export function OverviewHub({
  onSelectModule,
  onOpenCommandPalette,
}: OverviewHubProps) {
  const { locale, t } = useI18n();
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('all');
  const [bannerError, setBannerError] = useState(false);

  const campaignSnapshot = useMemo(() => {
    const sessions = loadCombatSessions();
    const sortedSessions = [...sessions].sort((a, b) => {
      const rank = (s: typeof a.status) =>
        s === 'active' ? 0 : s === 'paused' ? 1 : 2;
      const diff = rank(a.status) - rank(b.status);
      if (diff !== 0) return diff;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
    const latestCombat = sortedSessions[0] ?? null;

    const hub = loadCombatHubState();
    const hasHubData =
      hub.characters.length > 0 ||
      hub.groups.length > 0 ||
      hub.customNpcs.length > 0 ||
      hub.customMonsters.length > 0;

    const urban = loadUrbanHistory();
    const latestUrban = urban.environments[0] ?? null;
    const chargenDraft = readCharGenDraftName();

    const chronicle = loadChronicleStore(locale === 'fr' ? 'fr' : 'en');
    const activeChronicleCampaign =
      chronicle.campaigns.find((c) => c.id === chronicle.activeCampaignId) ??
      chronicle.campaigns[0] ??
      null;
    const hasChronicleData =
      chronicle.events.length > 0 || chronicle.campaigns.length > 1;

    return {
      latestCombat,
      hasHubData,
      hubCounts: {
        pcs: hub.characters.length,
        groups: hub.groups.length,
        custom: hub.customNpcs.length + hub.customMonsters.length,
      },
      latestUrban,
      chargenDraft,
      hasChronicleData,
      activeChronicleCampaign,
      chronicleCounts: {
        events: chronicle.events.length,
        campaigns: chronicle.campaigns.length,
      },
      hasAny:
        Boolean(latestCombat) ||
        hasHubData ||
        Boolean(latestUrban) ||
        chargenDraft.exists ||
        hasChronicleData,
    };
  }, [locale]);

  const displayedGroups: readonly ModuleGroupId[] =
    groupFilter === 'all' ? MODULE_GROUPS : [groupFilter];

  const renderModuleCard = (mod: ModuleDefinition) => {
    const copy = t.modules[mod.id];
    const Icon = mod.icon;

    return (
      <Card
        key={mod.id}
        className="group flex flex-col justify-between transition-colors duration-150 hover:border-primary/50"
      >
        <CardHeader className="gap-3 pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted/50 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
              <Icon className="size-4" aria-hidden="true" />
            </div>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              Alt+{mod.shortcut}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <CardTitle className="font-sans text-base font-semibold leading-snug text-foreground">
              {copy.title}
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              {copy.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <ul className="flex flex-col gap-1.5 border-t border-border/60 pt-3 text-xs leading-relaxed text-muted-foreground">
            {copy.plannedScope.map((feature) => (
              <li key={feature} className="flex items-baseline gap-2">
                <span aria-hidden="true" className="text-primary/80">
                  ·
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
          <span className="min-w-0 truncate font-mono text-xs text-muted-foreground tabular-nums">
            {copy.metaLabel}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectModule(mod.id)}
            className="shrink-0 gap-1.5 text-foreground hover:text-primary"
          >
            <span>{t.controls.openModule}</span>
            <ArrowRight data-icon="inline-end" className="size-3.5" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const r = t.overview.resume;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      {/* Hero Banner Card */}
      <Card className="relative overflow-hidden border-border p-0">
        <div className="relative min-h-[260px] w-full sm:min-h-[300px]">
          {!bannerError ? (
            <img
              src={heroBannerImg}
              alt={t.app.subtitle}
              referrerPolicy="no-referrer"
              onError={() => setBannerError(true)}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-end bg-gradient-to-br from-card via-muted to-background pr-10 opacity-90"
            >
              <Compass className="size-36 text-primary/15" />
            </div>
          )}

          {/* Measured contrast scrim ensuring WCAG AA text contrast in both themes */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45 sm:to-black/30"
          />

          <div className="relative z-10 flex h-full flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="text-xs font-medium tracking-wide text-amber-300/90">
                {t.overview.heroEyebrow}
              </p>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-balance text-stone-50 sm:text-3xl lg:text-4xl">
                {t.overview.heroTitle}
              </h1>
              <p className="text-sm leading-relaxed text-stone-200/90 sm:text-base">
                {t.overview.heroDescription}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="default"
                onClick={() => onSelectModule('combat-tracker')}
                className="bg-amber-600 text-stone-950 hover:bg-amber-500"
              >
                <Swords data-icon="inline-start" />
                <span>{t.overview.heroCta}</span>
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={onOpenCommandPalette}
                className="border-stone-400/40 bg-black/45 text-stone-100 hover:bg-black/65 hover:text-white"
              >
                <Search data-icon="inline-start" />
                <span>{t.overview.heroSecondary}</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Contextual Campaign Quick-Resume Strip */}
      {campaignSnapshot.hasAny && (
        <section
          aria-labelledby="resume-campaign-heading"
          className="flex flex-col gap-3.5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <h2
                id="resume-campaign-heading"
                className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
              >
                {r.title}
              </h2>
              <p className="text-xs text-muted-foreground">{r.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {campaignSnapshot.latestCombat && (
              <Card className="flex flex-col justify-between border-primary/35 bg-card">
                <CardHeader className="gap-1.5 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary" className="gap-1 text-[11px]">
                      <Swords className="size-3 text-primary" aria-hidden="true" />
                      <span>
                        {campaignSnapshot.latestCombat.status === 'active'
                          ? r.combatActive
                          : campaignSnapshot.latestCombat.status === 'paused'
                            ? r.combatPaused
                            : r.combatCompleted}
                      </span>
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {r.combatRound(campaignSnapshot.latestCombat.state.round)}
                    </span>
                  </div>
                  <CardTitle className="truncate text-sm font-semibold">
                    {campaignSnapshot.latestCombat.title}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      onSelectModule('combat-tracker', {
                        sessionId: campaignSnapshot.latestCombat!.id,
                      })
                    }
                    className="w-full"
                  >
                    <Play data-icon="inline-start" />
                    <span>{r.combatResumeBtn}</span>
                  </Button>
                </CardFooter>
              </Card>
            )}

            {campaignSnapshot.hasHubData && (
              <Card className="flex flex-col justify-between bg-card">
                <CardHeader className="gap-1.5 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Users className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{r.hubTitle}</span>
                  </div>
                  <CardTitle className="text-sm font-semibold tabular-nums">
                    {r.hubMeta(
                      campaignSnapshot.hubCounts.pcs,
                      campaignSnapshot.hubCounts.groups,
                      campaignSnapshot.hubCounts.custom
                    )}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onSelectModule('combat-tracker', { tab: 'hub' })
                    }
                    className="w-full"
                  >
                    <span>{r.hubOpenBtn}</span>
                    <ArrowRight data-icon="inline-end" className="size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {campaignSnapshot.latestUrban && (
              <Card className="flex flex-col justify-between bg-card">
                <CardHeader className="gap-1.5 pb-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Castle className="size-3.5 text-primary" aria-hidden="true" />
                      <span>{r.urbanTitle}</span>
                    </span>
                    <span className="font-mono">
                      {r.urbanMeta(
                        campaignSnapshot.latestUrban.data.buildings.length
                      )}
                    </span>
                  </div>
                  <CardTitle className="truncate text-sm font-semibold">
                    {campaignSnapshot.latestUrban.data.settlementName ||
                      t.modules['urban-generator'].shortTitle}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onSelectModule('urban-generator', {
                        tab: 'environment',
                        entryId: campaignSnapshot.latestUrban!.id,
                      })
                    }
                    className="w-full"
                  >
                    <span>{r.urbanOpenBtn}</span>
                    <ArrowRight data-icon="inline-end" className="size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {campaignSnapshot.chargenDraft.exists && (
              <Card className="flex flex-col justify-between bg-card">
                <CardHeader className="gap-1.5 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <UserRound className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{r.chargenTitle}</span>
                  </div>
                  <CardTitle className="truncate text-sm font-semibold">
                    {campaignSnapshot.chargenDraft.name || r.chargenUntitled}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectModule('character-generator')}
                    className="w-full"
                  >
                    <span>{r.chargenOpenBtn}</span>
                    <ArrowRight data-icon="inline-end" className="size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            )}

            {campaignSnapshot.hasChronicleData &&
              campaignSnapshot.activeChronicleCampaign && (
                <Card className="flex flex-col justify-between bg-card">
                  <CardHeader className="gap-1.5 pb-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Milestone
                          className="size-3.5 text-primary"
                          aria-hidden="true"
                        />
                        <span>{r.chronicleTitle}</span>
                      </span>
                      <span className="font-mono tabular-nums">
                        {r.chronicleMeta(
                          campaignSnapshot.chronicleCounts.events,
                          campaignSnapshot.chronicleCounts.campaigns
                        )}
                      </span>
                    </div>
                    <CardTitle className="truncate text-sm font-semibold">
                      {campaignSnapshot.activeChronicleCampaign.name}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onSelectModule('campaign-chronicle', {
                          entryId: campaignSnapshot.activeChronicleCampaign!.id,
                        })
                      }
                      className="w-full"
                    >
                      <span>{r.chronicleOpenBtn}</span>
                      <ArrowRight data-icon="inline-end" className="size-3.5" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
          </div>
        </section>
      )}

      {/* Module Directory Section */}
      <section aria-labelledby="directory-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono tabular-nums">
                {GM_MODULES.length} {t.overview.moduleCountLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t.app.editionLabel}</span>
            </div>
            <h2
              id="directory-heading"
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              {t.overview.directoryTitle}
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              {t.overview.directorySubtitle}
            </p>
          </div>

          {/* Group Filter Tabs (Shadcn Tabs) */}
          <Tabs
            value={groupFilter}
            onValueChange={(val) => setGroupFilter(val as GroupFilter)}
            className="w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-1 xl:w-auto xl:shrink-0"
          >
            <TabsList className="w-max">
              <TabsTrigger value="all">{t.nav.allCategories}</TabsTrigger>
              {MODULE_GROUPS.map((groupId) => (
                <TabsTrigger key={groupId} value={groupId}>
                  {t.nav.groups[groupId]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Separator />

        {/* Group-structured Module Grids */}
        <div className="flex flex-col gap-8">
          {displayedGroups.map((groupId) => {
            const groupModules = getModulesByGroup(groupId);
            const gridColsClass =
              groupModules.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';

            return (
              <div key={groupId} className="flex flex-col gap-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold tracking-wide text-foreground">
                    {t.nav.groups[groupId]}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {groupModules.length}
                  </span>
                </div>

                <div className={`grid gap-4 ${gridColsClass}`}>
                  {groupModules.map((mod) => renderModuleCard(mod))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Support, Errors & Suggestions Callout */}
      <Card className="border-border bg-muted/20">
        <CardContent className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Bug className="size-4" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-foreground">
                {t.app.issuesNotice}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t.app.issuesDescription}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            className="shrink-0 gap-1.5 font-mono text-xs"
            render={
              <a
                href={t.app.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <span>{t.app.issuesCta}</span>
            <ExternalLink data-icon="inline-end" className="size-3.5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
