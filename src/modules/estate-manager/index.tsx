import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Castle,
  Copy,
  Hammer,
  Plus,
  Sprout,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import { EstateOverviewSection } from './components/EstateOverviewSection';
import { EstateResourcesSection } from './components/EstateResourcesSection';
import { EstateUpgradesSection } from './components/EstateUpgradesSection';
import { ESTATE_UPGRADES } from './data/estateUpgradesData';
import { getEstateCopy } from './i18n';
import type { EstateStoreState, NobleEstate } from './types';
import {
  computeEstateDerivedStats,
  createDefaultEstate,
  loadEstateStore,
  saveEstateStore,
} from './utils/estateStorage';

type EstateTab = 'overview' | 'upgrades' | 'resources';

/**
 * Noble Estate Manager module implementing "Seigneur & Fiefs" Domaine rules.
 */
export default function EstateManagerModule({
  onNavigateOverview,
  launchIntent,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = useMemo(() => getEstateCopy(lang), [lang]);

  const [activeTab, setActiveTab] = useState<EstateTab>('overview');
  const [store, setStore] = useState<EstateStoreState>(() =>
    loadEstateStore(lang)
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newNoble, setNewNoble] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [newDomainLevel, setNewDomainLevel] = useState('3');

  useEffect(() => {
    if (!launchIntent?.tab) return;
    if (
      launchIntent.tab === 'overview' ||
      launchIntent.tab === 'upgrades' ||
      launchIntent.tab === 'resources'
    ) {
      setActiveTab(launchIntent.tab);
    }
  }, [launchIntent]);

  const activeEstate =
    store.estates.find((e) => e.id === store.activeEstateId) ??
    store.estates[0];

  const updateStore = (
    updater: (prev: EstateStoreState) => EstateStoreState
  ) => {
    setStore((prev) => {
      const next = updater(prev);
      saveEstateStore(next);
      return next;
    });
  };

  const mutateActiveEstate = (
    mutator: (prev: NobleEstate) => NobleEstate
  ) => {
    updateStore((prev) => ({
      ...prev,
      estates: prev.estates.map((est) =>
        est.id === activeEstate.id
          ? { ...mutator(est), updatedAt: new Date().toISOString() }
          : est
      ),
    }));
  };

  const handleCopyMarkdown = async () => {
    const derived = computeEstateDerivedStats(activeEstate);
    const upgradeMap = new Map(ESTATE_UPGRADES.map((u) => [u.id, u]));
    const upgradesLines = activeEstate.installedUpgrades.map((u) => {
      const def = upgradeMap.get(u.upgradeId);
      return `- ${def?.name[lang] ?? u.upgradeId}${
        u.specialty ? ` (${u.specialty})` : ''
      }`;
    });

    const md = [
      `# ${activeEstate.name}`,
      `**${copy.overview.nobleNameLabel}:** ${activeEstate.nobleName}`,
      `**${copy.overview.regionLabel}:** ${activeEstate.region}`,
      `**${copy.overview.domainLevelLabel}:** ${activeEstate.domainLevel}`,
      `**${copy.overview.servantsRole(derived.servantsCount)}** · **${copy.overview.guardsRole(derived.guardsCount)}** · **${copy.overview.doorLockDcLabel}:** SD ${derived.doorLockDc}`,
      '',
      `## ${copy.upgrades.installedTitle}`,
      upgradesLines.length > 0 ? upgradesLines.join('\n') : '-',
      '',
      `## ${copy.overview.floorplanLabel}`,
      activeEstate.floorplanNotes || '-',
    ].join('\n');

    try {
      await navigator.clipboard.writeText(md);
      toast.success(copy.selector.copiedToast);
    } catch {
      toast.error('Clipboard unavailable');
    }
  };

  const handleCreateEstate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createDefaultEstate(lang, {
      name: newName.trim() || undefined,
      nobleName: newNoble.trim() || undefined,
      region: newRegion.trim() || undefined,
      domainLevel: Math.max(0, Math.min(15, parseInt(newDomainLevel, 10) || 3)),
    });
    updateStore((prev) => ({
      activeEstateId: created.id,
      estates: [created, ...prev.estates],
    }));
    setCreateOpen(false);
    setNewName('');
    setNewNoble('');
    setNewRegion('');
  };

  const handleDeleteEstate = () => {
    if (store.estates.length <= 1) return;
    updateStore((prev) => {
      const remaining = prev.estates.filter((e) => e.id !== activeEstate.id);
      return {
        activeEstateId: remaining[0].id,
        estates: remaining,
      };
    });
    setDeleteOpen(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-medium tracking-wide text-primary">
            {copy.headerEyebrow}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {copy.headerTitle}
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {copy.headerSubtitle}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="w-fit shrink-0 whitespace-nowrap"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator />

      {/* Estate Selector Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:max-w-md">
          <Label className="text-xs text-muted-foreground">
            {copy.selector.activeEstateLabel}
          </Label>
          <Select
            value={activeEstate.id}
            onValueChange={(id) =>
              id &&
              updateStore((prev) => ({ ...prev, activeEstateId: id }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {store.estates.map((est) => (
                <SelectItem key={est.id} value={est.id}>
                  {est.name} ({est.nobleName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => setCreateOpen(true)}
            className="whitespace-nowrap shrink-0"
          >
            <Plus data-icon="inline-start" />
            <span>{copy.selector.newEstateBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyMarkdown}
            className="whitespace-nowrap shrink-0"
          >
            <Copy data-icon="inline-start" />
            <span>{copy.selector.copyMarkdownBtn}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={store.estates.length <= 1}
            onClick={() => setDeleteOpen(true)}
            className="whitespace-nowrap shrink-0 text-destructive hover:text-destructive"
          >
            <Trash2 data-icon="inline-start" />
            <span>{copy.selector.deleteBtn}</span>
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as EstateTab)}
        className="flex flex-col gap-5"
      >
        <TabsList className="w-full max-w-full justify-start overflow-x-auto sm:w-max">
          <TabsTrigger value="overview" className="gap-1.5 whitespace-nowrap">
            <Castle className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.overview}</span>
          </TabsTrigger>
          <TabsTrigger value="upgrades" className="gap-1.5 whitespace-nowrap">
            <Hammer className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.upgrades}</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-1.5 whitespace-nowrap">
            <Sprout className="size-3.5" aria-hidden="true" />
            <span>{copy.tabs.resources}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <EstateOverviewSection
            estate={activeEstate}
            locale={lang}
            copy={copy.overview}
            onChangeEstate={(patch) =>
              mutateActiveEstate((prev) => ({ ...prev, ...patch }))
            }
          />
        </TabsContent>

        <TabsContent value="upgrades" className="mt-0">
          <EstateUpgradesSection
            estate={activeEstate}
            locale={lang}
            copy={copy.upgrades}
            onUpdateEstate={mutateActiveEstate}
          />
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <EstateResourcesSection
            estate={activeEstate}
            locale={lang}
            copy={copy.resources}
            onUpdateEstate={mutateActiveEstate}
          />
        </TabsContent>
      </Tabs>

      {/* Create Estate Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.createDialog.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEstate} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-est-name">
                {copy.createDialog.nameLabel}
              </Label>
              <Input
                id="new-est-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="new-est-noble">
                {copy.createDialog.nobleLabel}
              </Label>
              <Input
                id="new-est-noble"
                value={newNoble}
                onChange={(e) => setNewNoble(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new-est-region">
                  {copy.createDialog.regionLabel}
                </Label>
                <Input
                  id="new-est-region"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="new-est-domain">
                  {copy.createDialog.domainLabel}
                </Label>
                <Input
                  id="new-est-domain"
                  type="number"
                  min={0}
                  max={15}
                  value={newDomainLevel}
                  onChange={(e) => setNewDomainLevel(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
              >
                {copy.createDialog.cancelBtn}
              </Button>
              <Button type="submit">{copy.createDialog.createBtn}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Estate AlertDialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {copy.selector.deleteConfirmTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {copy.selector.deleteConfirmDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{copy.selector.cancelBtn}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEstate}>
              {copy.selector.confirmDeleteBtn}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
