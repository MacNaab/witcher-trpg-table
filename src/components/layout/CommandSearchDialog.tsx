import { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Bomb,
  BookOpen,
  CalendarDays,
  Castle,
  Compass,
  Crown,
  Dices,
  Dna,
  FileSearch,
  Flame,
  FlaskConical,
  Gem,
  Hammer,
  HeartPulse,
  History,
  Landmark,
  Languages,
  LayoutGrid,
  Milestone,
  Moon,
  NotebookPen,
  Package,
  PackageOpen,
  Scale,
  Shield,
  Skull,
  Sparkles,
  Store,
  Sun,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import type { CompendiumSearchItem } from '@/src/components/layout/CompendiumItemDialog';
import { GM_MODULES } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import { useTheme } from '@/src/contexts/ThemeContext';
import {
  ARMOR_DATA,
  EXPERIMENTAL_TECH_DATA,
  GEAR_ITEMS,
  MAGIC_ITEMS_DATA,
  MUTAGENS_DATA,
  POTIONS_DATA,
  RELICS_DATA,
  RUNES_GLYPHS_DATA,
  TROPHIES_DATA,
  WEAPONS_DATA,
} from '@/src/data/items';
import { AVAILABLE_LOCALES } from '@/src/i18n';
import {
  loadCombatHubState,
  loadCombatSessions,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import {
  ALL_BESTIARY_ENTRIES,
  getCreatureTypeLabel,
} from '@/src/modules/encounter-manager/data';
import { ALL_LEXICON_ENTRIES } from '@/src/modules/lexicon-tables/data';
import { getLexiconTablesCopy } from '@/src/modules/lexicon-tables/i18n';
import { loadChronicleStore } from '@/src/modules/campaign-chronicle/utils/chronicleStorage';
import { loadUrbanHistory } from '@/src/modules/urban-generator/utils/urbanStorage';
import { loadVerbalSessions } from '@/src/modules/verbal-combat/utils/verbalEngine';
import type { ModuleId, ModuleLaunchIntent } from '@/src/types/navigation';

interface CommandSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectModule: (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => void;
  onOpenDice?: () => void;
  onOpenNotes?: () => void;
  onOpenBackup?: () => void;
  onOpenCompendiumItem?: (item: CompendiumSearchItem) => void;
}

function normalizeSearchToken(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

interface SubToolShortcut {
  id: string;
  moduleId: Exclude<ModuleId, 'overview'>;
  tab: string;
  icon: typeof PackageOpen;
  label: { fr: string; en: string };
  keywords: string;
}

const SUB_TOOL_SHORTCUTS: readonly SubToolShortcut[] = [
  {
    id: 'shortcut-chest',
    moduleId: 'random-tables',
    tab: 'chest',
    icon: PackageOpen,
    label: {
      fr: 'Coffre aléatoire & taux de butin',
      en: 'Random Chest & Drop Rates',
    },
    keywords: 'loot chest coffre butin couronnes crowns drop rates',
  },
  {
    id: 'shortcut-modular-encounter',
    moduleId: 'random-tables',
    tab: 'encounter',
    icon: Compass,
    label: {
      fr: 'Rencontre modulaire (Bon / Neutre / Mauvais)',
      en: 'Modular Encounter (Good / Neutral / Bad)',
    },
    keywords: 'modular encounter modulaire scene complication',
  },
  {
    id: 'shortcut-single-shop',
    moduleId: 'urban-generator',
    tab: 'single-building',
    icon: Store,
    label: {
      fr: 'Commerce ou auberge isolée',
      en: 'Standalone Shop or Tavern',
    },
    keywords: 'shop tavern inn auberge commerce echoppe marchand',
  },
  {
    id: 'shortcut-urban-history',
    moduleId: 'urban-generator',
    tab: 'history',
    icon: History,
    label: {
      fr: 'Historique des localités & commerces',
      en: 'Settlement & Shop History',
    },
    keywords: 'urban history historique ville localite',
  },
  {
    id: 'shortcut-roll-monster',
    moduleId: 'encounter-manager',
    tab: 'monster',
    icon: Skull,
    label: {
      fr: 'Tirage de monstre par environnement',
      en: 'Roll Random Monster by Environment',
    },
    keywords: 'monster monstre tirage terrain encounter',
  },
  {
    id: 'shortcut-roll-humanoid',
    moduleId: 'encounter-manager',
    tab: 'humanoid',
    icon: Users,
    label: {
      fr: 'Tirage d’humain / faction par zone',
      en: 'Roll Human / Faction by Zone',
    },
    keywords: 'humanoid human faction patrol bandit scoiatael',
  },
  {
    id: 'shortcut-bestiary-table',
    moduleId: 'encounter-manager',
    tab: 'bestiary',
    icon: BookOpen,
    label: {
      fr: `Bestiaire & Tableau complet (${ALL_BESTIARY_ENTRIES.length} fiches)`,
      en: `Complete Bestiary & Faction Table (${ALL_BESTIARY_ENTRIES.length} entries)`,
    },
    keywords: 'bestiary bestiaire stats tableau complet fiche creature',
  },
  {
    id: 'shortcut-gm-hub',
    moduleId: 'combat-tracker',
    tab: 'hub',
    icon: Swords,
    label: {
      fr: 'Hub MJ partagé (PJ, groupes, PNJ & monstres)',
      en: 'Shared GM Hub (PCs, Groups, NPCs & Monsters)',
    },
    keywords: 'hub mj gm party groupe pj pnj monstre custom',
  },
  {
    id: 'shortcut-gm-screen',
    moduleId: 'combat-tracker',
    tab: 'rules',
    icon: BookOpen,
    label: {
      fr: 'Écran du MJ complet (Combat & Hors-combat)',
      en: 'Complete GM Screen (Combat & Out-of-Combat)',
    },
    keywords:
      'ecran mj gm screen sd 10 30 soins chirurgie toxicite addiction chute noyade feu climat reputation pots-de-vin peages guides apothicaire',
  },
  {
    id: 'shortcut-verbal-rules',
    moduleId: 'verbal-combat',
    tab: 'rules',
    icon: Scale,
    label: {
      fr: 'Combat verbal : Règles & outils sociaux',
      en: 'Verbal Combat: Official Social Rules',
    },
    keywords: 'verbal social joute determination resolve persuasion intimidation proces',
  },
  {
    id: 'shortcut-codex-formulae',
    moduleId: 'lexicon-tables',
    tab: 'formulae',
    icon: FlaskConical,
    label: {
      fr: 'Codex : Formules alchimiques & décoctions',
      en: 'Codex: Alchemy Formulae & Decoctions',
    },
    keywords: 'alchemy alchimie formules potions huiles decoctions bombe',
  },
  {
    id: 'shortcut-codex-weapons',
    moduleId: 'lexicon-tables',
    tab: 'weapon-diagrams',
    icon: Hammer,
    label: {
      fr: 'Codex : Schémas d’armes & armures',
      en: 'Codex: Weapon & Armor Diagrams',
    },
    keywords: 'diagrams schemas forge armes armures crafting artisanat',
  },
  {
    id: 'shortcut-calendar-weather',
    moduleId: 'campaign-calendar',
    tab: 'calendar',
    icon: CalendarDays,
    label: {
      fr: 'Calendrier du Continent & Météo dynamique',
      en: 'Continent Calendar & Dynamic Weather',
    },
    keywords:
      'calendrier calendar meteo weather birke blathe feainn lammas velen saovine yule imbaelk lune moon phase',
  },
  {
    id: 'shortcut-recovery-crafting',
    moduleId: 'campaign-calendar',
    tab: 'recovery',
    icon: HeartPulse,
    label: {
      fr: 'Guérison naturelle des PJ & File d’artisanat',
      en: 'PC Natural Healing & Crafting Queue',
    },
    keywords:
      'guerison recovery healing rec repos blessure critique artisanat crafting downtime temps',
  },
  {
    id: 'shortcut-campaign-chronicle',
    moduleId: 'campaign-chronicle',
    tab: 'timeline',
    icon: Milestone,
    label: {
      fr: 'Chronologie de campagne & frise multi-campagnes',
      en: 'Campaign Chronicle & Multi-Campaign Timeline',
    },
    keywords:
      'chronologie chronicle campagne campaign frise timeline seance session historique arc',
  },
  {
    id: 'shortcut-homebrew-studio',
    moduleId: 'homebrew-studio',
    tab: 'studio',
    icon: BookOpen,
    label: {
      fr: 'Studio PDF / Markdown (façon Homebrewery)',
      en: 'PDF & Markdown Studio (Homebrewery-style)',
    },
    keywords:
      'pdf markdown homebrew homebrewery supplement creation editeur colonnes livre mise en page',
  },
  {
    id: 'shortcut-contracts-board',
    moduleId: 'investigation-contracts',
    tab: 'contracts',
    icon: FileSearch,
    label: {
      fr: 'Tableau des 11 Contrats de Sorceleur',
      en: 'Official 11 Witcher Contracts Board',
    },
    keywords:
      'contrat contract witcher panneau annonce mystere enquete investigation journal',
  },
  {
    id: 'shortcut-estate-upgrades',
    moduleId: 'estate-manager',
    tab: 'upgrades',
    icon: Landmark,
    label: {
      fr: 'Domaine du Noble : Améliorations & Serre',
      en: 'Noble Estate: Upgrades & Greenhouse',
    },
    keywords:
      'domaine estate fief noble serre terrain chasse baraquements atelier seigneur',
  },
  {
    id: 'shortcut-demon-truename',
    moduleId: 'chaos-ley-goetia',
    tab: 'truename',
    icon: Flame,
    label: {
      fr: 'Générateur de Vrai Nom de Démon (Goétie)',
      en: 'Demon True Name Generator (Goetia)',
    },
    keywords:
      'demon goetia goetie vrai nom true name lucifuge bes casglydd mari lwyd ligne tellurique ley line',
  },
];

interface CampaignSnapshotItem {
  id: string;
  label: string;
  meta: string;
  kind: 'combat' | 'verbal' | 'group' | 'urban' | 'chronicle';
  moduleId: Exclude<ModuleId, 'overview'>;
  intent: Omit<ModuleLaunchIntent, 'nonce'>;
  searchTokens: string;
}

/**
 * Global keyboard-accessible command palette (`Ctrl+K` / `Cmd+K` and `Alt+1..8`).
 * Enables instant jumping across GM modules, sub-tools, Bestiary, Crafting Codex,
 * Equipment & Alchemy compendium items, and saved local campaign sessions/settlements.
 */
export function CommandSearchDialog({
  open,
  onOpenChange,
  onSelectModule,
  onOpenDice,
  onOpenNotes,
  onOpenBackup,
  onOpenCompendiumItem,
}: CommandSearchDialogProps) {
  const { locale, setLocale, t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';
  const lang = locale === 'fr' ? 'fr' : 'en';
  const lexiconCopy = useMemo(() => getLexiconTablesCopy(lang), [lang]);
  const [search, setSearch] = useState('');
  const [campaignItems, setCampaignItems] = useState<CampaignSnapshotItem[]>([]);

  useEffect(() => {
    if (!open) {
      setSearch('');
      return;
    }

    const items: CampaignSnapshotItem[] = [];
    const sessions = loadCombatSessions();
    for (const s of sessions) {
      items.push({
        id: `session-${s.id}`,
        label: s.title,
        meta:
          lang === 'fr'
            ? `Combat · R${s.state.round}`
            : `Combat · R${s.state.round}`,
        kind: 'combat',
        moduleId: 'combat-tracker',
        intent: { sessionId: s.id },
        searchTokens: `${s.title} combat session`,
      });
    }

    const verbalSessions = loadVerbalSessions();
    for (const vs of verbalSessions) {
      items.push({
        id: `verbal-${vs.id}`,
        label: vs.title,
        meta:
          lang === 'fr'
            ? `Joute · R${vs.state.round}`
            : `Verbal · R${vs.state.round}`,
        kind: 'verbal',
        moduleId: 'verbal-combat',
        intent: { sessionId: vs.id },
        searchTokens: `${vs.title} ${vs.state.stakes} verbal joute proces interrogatoire negociation`,
      });
    }

    const hub = loadCombatHubState();
    for (const g of hub.groups) {
      items.push({
        id: `group-${g.id}`,
        label: g.name,
        meta:
          lang === 'fr'
            ? `Groupe Hub (${g.members.length})`
            : `Hub Party (${g.members.length})`,
        kind: 'group',
        moduleId: 'combat-tracker',
        intent: { tab: 'hub' },
        searchTokens: `${g.name} ${g.description} hub groupe party`,
      });
    }

    const urban = loadUrbanHistory();
    for (const env of urban.environments) {
      const name =
        env.data.settlementName ||
        (lang === 'fr' ? 'Localité sans nom' : 'Unnamed Settlement');
      items.push({
        id: `urban-${env.id}`,
        label: name,
        meta:
          lang === 'fr'
            ? `Localité (${env.data.buildings.length} bât.)`
            : `Settlement (${env.data.buildings.length} bld.)`,
        kind: 'urban',
        moduleId: 'urban-generator',
        intent: { tab: 'environment', entryId: env.id },
        searchTokens: `${name} ville localite settlement urban`,
      });
    }

    const chronicle = loadChronicleStore(lang);
    const campaignNames = new Map(
      chronicle.campaigns.map((camp) => [camp.id, camp.name])
    );
    for (const camp of chronicle.campaigns) {
      const campEventsCount = chronicle.events.filter(
        (ev) => ev.campaignId === camp.id
      ).length;
      items.push({
        id: `chronicle-camp-${camp.id}`,
        label: camp.name,
        meta:
          lang === 'fr'
            ? `Campagne (${campEventsCount} év.)`
            : `Campaign (${campEventsCount} ev.)`,
        kind: 'chronicle',
        moduleId: 'campaign-chronicle',
        intent: { entryId: camp.id },
        searchTokens: `${camp.name} ${camp.subtitle} ${camp.region} campagne chronicle chronologie`,
      });
    }
    for (const ev of chronicle.events) {
      const campName = campaignNames.get(ev.campaignId) ?? '';
      items.push({
        id: `chronicle-evt-${ev.id}`,
        label: ev.title,
        meta: campName
          ? `${campName} · S${ev.sessionNumber}`
          : `S${ev.sessionNumber}`,
        kind: 'chronicle',
        moduleId: 'campaign-chronicle',
        intent: { entryId: ev.campaignId },
        searchTokens: `${ev.title} ${ev.location} ${ev.summary} ${campName} chronologie chronicle evenement`,
      });
    }

    setCampaignItems(items);
  }, [lang, open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onOpenChange(!open);
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (event.altKey && !isEditable) {
        const matched = GM_MODULES.find(
          (mod) => mod.shortcut.toLowerCase() === event.key.toLowerCase()
        );
        if (matched) {
          event.preventDefault();
          onSelectModule(matched.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, onSelectModule]);

  const normalizedQuery = useMemo(() => normalizeSearchToken(search), [search]);

  const campaignMatches = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    const results: Array<CampaignSnapshotItem & { searchValue: string }> = [];
    for (const item of campaignItems) {
      if (normalizeSearchToken(item.searchTokens).includes(normalizedQuery)) {
        results.push({
          ...item,
          searchValue: `${search} ${item.searchTokens} ${normalizeSearchToken(item.searchTokens)}`,
        });
        if (results.length >= 6) break;
      }
    }
    return results;
  }, [campaignItems, normalizedQuery, search]);

  const bestiaryMatches = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    const results: Array<{
      id: string;
      name: string;
      typeLabel: string;
      searchValue: string;
      kind: 'monster' | 'humanoid' | 'animal';
    }> = [];
    for (const entry of ALL_BESTIARY_ENTRIES) {
      const typeLabel = getCreatureTypeLabel(entry.typeId, lang);
      const rawHaystack = `${entry.name.fr} ${entry.name.en} ${typeLabel} ${entry.threat.fr} ${entry.threat.en}`;
      if (normalizeSearchToken(rawHaystack).includes(normalizedQuery)) {
        results.push({
          id: entry.id,
          name: entry.name[lang],
          typeLabel,
          kind: entry.kind,
          searchValue: `${search} ${rawHaystack} ${normalizeSearchToken(rawHaystack)}`,
        });
        if (results.length >= 8) break;
      }
    }
    return results;
  }, [lang, normalizedQuery, search]);

  const codexMatches = useMemo(() => {
    if (normalizedQuery.length < 2) return [];
    const results: Array<{
      id: string;
      name: string;
      tabId: string;
      tabLabel: string;
      searchValue: string;
    }> = [];
    for (const entry of ALL_LEXICON_ENTRIES) {
      const tabLabel = lexiconCopy.tabs[entry.tabId];
      const rawHaystack = `${entry.name.fr} ${entry.name.en} ${tabLabel}`;
      if (normalizeSearchToken(rawHaystack).includes(normalizedQuery)) {
        results.push({
          id: entry.id,
          name: entry.name[lang],
          tabId: entry.tabId,
          tabLabel,
          searchValue: `${search} ${rawHaystack} ${normalizeSearchToken(rawHaystack)}`,
        });
        if (results.length >= 8) break;
      }
    }
    return results;
  }, [lang, lexiconCopy.tabs, normalizedQuery, search]);

  const compendiumMatches = useMemo(() => {
    if (normalizedQuery.length < 2 || !onOpenCompendiumItem) return [];
    const results: Array<{
      id: string;
      name: string;
      meta: string;
      item: CompendiumSearchItem;
      searchValue: string;
    }> = [];

    const MAX_TOTAL = 16;
    const MAX_PER_KIND = 3;

    const collectKind = (
      collectFn: (push: (
        id: string,
        nameFr: string,
        nameEn: string,
        meta: string,
        item: CompendiumSearchItem
      ) => void) => void
    ) => {
      let kindCount = 0;
      collectFn((id, nameFr, nameEn, meta, item) => {
        if (results.length >= MAX_TOTAL || kindCount >= MAX_PER_KIND) return;
        const rawHaystack = `${nameFr} ${nameEn} ${meta}`;
        if (normalizeSearchToken(rawHaystack).includes(normalizedQuery)) {
          results.push({
            id,
            name: lang === 'fr' ? nameFr : nameEn,
            meta,
            item,
            searchValue: `${search} ${rawHaystack} ${normalizeSearchToken(rawHaystack)}`,
          });
          kindCount++;
        }
      });
    };

    collectKind((push) => {
      for (const entry of RELICS_DATA) {
        push(
          `rel-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.subType[lang]} · ${entry.priceDisplay}`,
          { kind: 'relic', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of WEAPONS_DATA) {
        push(
          `w-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.damage} · ${entry.priceDisplay}`,
          { kind: 'weapon', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of ARMOR_DATA) {
        push(
          `a-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `PA ${entry.sp} · ${entry.priceDisplay}`,
          { kind: 'armor', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of EXPERIMENTAL_TECH_DATA) {
        push(
          `exp-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.techType} · ${entry.priceDisplay} cr.`,
          { kind: 'experimental', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of RUNES_GLYPHS_DATA) {
        push(
          `rn-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.target[lang]} · ${entry.priceDisplay}`,
          { kind: 'runeGlyph', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of MAGIC_ITEMS_DATA) {
        push(
          `mag-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.category} · ${entry.priceDisplay}`,
          { kind: 'magicItem', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of POTIONS_DATA) {
        push(
          `p-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.type} · ${entry.priceDisplay}`,
          { kind: 'alchemy', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of MUTAGENS_DATA) {
        push(
          `mut-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.sourceMonster[lang]} · SD ${entry.alchemyDc}`,
          { kind: 'mutagen', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of TROPHIES_DATA) {
        push(
          `trp-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.monsterCategory[lang]} · ToC`,
          { kind: 'trophy', entry }
        );
      }
    });
    collectKind((push) => {
      for (const entry of GEAR_ITEMS) {
        push(
          `g-${entry.id}`,
          entry.name.fr,
          entry.name.en,
          `${entry.category} · ${entry.priceDisplay}`,
          { kind: 'gear', entry }
        );
      }
    });

    return results;
  }, [lang, normalizedQuery, onOpenCompendiumItem, search]);

  const handleSelect = (
    id: ModuleId,
    intent?: Omit<ModuleLaunchIntent, 'nonce'>
  ) => {
    onSelectModule(id, intent);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.nav.openCommandPalette}
      description={t.nav.searchPlaceholder}
    >
      <Command>
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder={t.nav.searchPlaceholder}
        />
        <CommandList>
          <CommandEmpty>{t.nav.noResults}</CommandEmpty>

          {campaignMatches.length > 0 && (
            <>
              <CommandGroup heading={t.nav.campaignGroup}>
                {campaignMatches.map((item) => {
                  const Icon =
                    item.kind === 'combat'
                      ? Swords
                      : item.kind === 'verbal'
                        ? Scale
                        : item.kind === 'group'
                          ? Users
                          : item.kind === 'chronicle'
                            ? Milestone
                            : Castle;
                  return (
                    <CommandItem
                      key={item.id}
                      value={item.searchValue}
                      onSelect={() => handleSelect(item.moduleId, item.intent)}
                    >
                      <Icon />
                      <span>{item.label}</span>
                      <CommandShortcut>{item.meta}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {bestiaryMatches.length > 0 && (
            <>
              <CommandGroup heading={t.nav.bestiaryGroup}>
                {bestiaryMatches.map((entry) => {
                  const EntryIcon = entry.kind === 'humanoid' ? Users : Skull;
                  return (
                    <CommandItem
                      key={`bestiary-${entry.id}`}
                      value={entry.searchValue}
                      onSelect={() =>
                        handleSelect('encounter-manager', {
                          tab: 'bestiary',
                          entryId: entry.id,
                        })
                      }
                    >
                      <EntryIcon />
                      <span>{entry.name}</span>
                      <CommandShortcut>{entry.typeLabel}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {compendiumMatches.length > 0 && onOpenCompendiumItem && (
            <>
              <CommandGroup heading={t.nav.compendiumGroup}>
                {compendiumMatches.map((match) => {
                  const Icon = (() => {
                    switch (match.item.kind) {
                      case 'weapon':
                        return Swords;
                      case 'armor':
                        return Shield;
                      case 'alchemy':
                        return FlaskConical;
                      case 'relic':
                        return Crown;
                      case 'experimental':
                        return Bomb;
                      case 'runeGlyph':
                        return Gem;
                      case 'magicItem':
                        return Sparkles;
                      case 'trophy':
                        return Trophy;
                      case 'mutagen':
                        return Dna;
                      default:
                        return Package;
                    }
                  })();
                  return (
                    <CommandItem
                      key={match.id}
                      value={match.searchValue}
                      onSelect={() => {
                        onOpenChange(false);
                        onOpenCompendiumItem(match.item);
                      }}
                    >
                      <Icon />
                      <span>{match.name}</span>
                      <CommandShortcut>{match.meta}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {codexMatches.length > 0 && (
            <>
              <CommandGroup heading={t.nav.codexGroup}>
                {codexMatches.map((entry) => (
                  <CommandItem
                    key={`codex-${entry.id}`}
                    value={entry.searchValue}
                    onSelect={() =>
                      handleSelect('lexicon-tables', {
                        tab: entry.tabId,
                        entryId: entry.id,
                      })
                    }
                  >
                    <FlaskConical />
                    <span>{entry.name}</span>
                    <CommandShortcut>{entry.tabLabel}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading={t.nav.modulesGroup}>
            <CommandItem
              value={`${t.nav.overview} overview home accueil`}
              onSelect={() => handleSelect('overview')}
            >
              <LayoutGrid />
              <span>{t.nav.overview}</span>
            </CommandItem>

            {GM_MODULES.map((mod) => {
              const Icon = mod.icon;
              const copy = t.modules[mod.id];

              return (
                <CommandItem
                  key={mod.id}
                  value={`${copy.title} ${copy.description} ${mod.id}`}
                  onSelect={() => handleSelect(mod.id)}
                >
                  <Icon />
                  <span>{copy.title}</span>
                  <CommandShortcut>Alt+{mod.shortcut}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t.nav.shortcutsGroup}>
            {SUB_TOOL_SHORTCUTS.map((item) => {
              const Icon = item.icon;
              const parentTitle = t.modules[item.moduleId].shortTitle;
              return (
                <CommandItem
                  key={item.id}
                  value={`${item.label.fr} ${item.label.en} ${parentTitle} ${item.keywords}`}
                  onSelect={() => handleSelect(item.moduleId, { tab: item.tab })}
                >
                  <Icon />
                  <span>{item.label[lang]}</span>
                  <CommandShortcut>{parentTitle}</CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t.nav.quickActions}>
            {onOpenDice && (
              <CommandItem
                value={`dice des 1d10 jet roll skill check ${t.nav.diceAction}`}
                onSelect={() => {
                  onOpenChange(false);
                  onOpenDice();
                }}
              >
                <Dices />
                <span>{t.nav.diceAction}</span>
              </CommandItem>
            )}

            {onOpenNotes && (
              <CommandItem
                value={`notes scratchpad session bloc-notes mj ${t.nav.notesAction}`}
                onSelect={() => {
                  onOpenChange(false);
                  onOpenNotes();
                }}
              >
                <NotebookPen />
                <span>{t.nav.notesAction}</span>
              </CommandItem>
            )}

            {onOpenBackup && (
              <CommandItem
                value={`backup export import json save restore sauvegarde campagne ${t.nav.backupAction}`}
                onSelect={() => {
                  onOpenChange(false);
                  onOpenBackup();
                }}
              >
                <Archive />
                <span>{t.nav.backupAction}</span>
              </CommandItem>
            )}

            <CommandItem
              value={`theme dark light ${t.controls.theme}`}
              onSelect={() => {
                setTheme(isDark ? 'light' : 'dark');
                onOpenChange(false);
              }}
            >
              {isDark ? <Sun /> : <Moon />}
              <span>
                {isDark ? t.controls.themeLight : t.controls.themeDark}
              </span>
            </CommandItem>

            {AVAILABLE_LOCALES.filter((item) => item.code !== locale).map(
              (item) => (
                <CommandItem
                  key={item.code}
                  value={`language locale ${item.label} ${item.nativeLabel}`}
                  onSelect={() => {
                    setLocale(item.code);
                    onOpenChange(false);
                  }}
                >
                  <Languages />
                  <span>
                    {t.controls.language}: {item.nativeLabel}
                  </span>
                </CommandItem>
              )
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
