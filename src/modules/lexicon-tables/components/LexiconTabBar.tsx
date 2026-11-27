import { Button } from '@/components/ui/button';
import { LEXICON_TABS } from '../data';
import { getLexiconTablesCopy } from '../i18n';
import type { LexiconGroupId, LexiconTabId, ModuleLanguage } from '../types';

interface LexiconTabBarProps {
  activeTab: LexiconTabId;
  isGlobalMode: boolean;
  lang: ModuleLanguage;
  onSelectTab: (tabId: LexiconTabId) => void;
}

const GROUP_ORDER: readonly LexiconGroupId[] = [
  'materials',
  'diagrams',
  'alchemy',
];

/**
 * Responsive 11-category selector grouped into Materials, Crafting Diagrams, and Alchemy.
 * Preserves clear visibility across desktop, tablet, and mobile without horizontal crushing.
 */
export function LexiconTabBar({
  activeTab,
  isGlobalMode,
  lang,
  onSelectTab,
}: LexiconTabBarProps) {
  const copy = getLexiconTablesCopy(lang);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {GROUP_ORDER.map((groupId) => {
        const tabsInGroup = LEXICON_TABS.filter((tab) => tab.group === groupId);

        return (
          <div
            key={groupId}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3"
          >
            <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {copy.groups[groupId]}
            </span>
            <div
              className="flex flex-wrap gap-1.5"
              role="tablist"
              aria-label={copy.groups[groupId]}
            >
              {tabsInGroup.map((tab) => {
                const isActive = !isGlobalMode && activeTab === tab.id;
                return (
                  <Button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    size="sm"
                    variant={isActive ? 'default' : 'outline'}
                    onClick={() => onSelectTab(tab.id)}
                    className="h-auto justify-between gap-2 px-2.5 py-1.5 text-xs"
                  >
                    <span>{copy.tabs[tab.id]}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        isActive
                          ? 'text-primary-foreground/85'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
