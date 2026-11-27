import { useState } from 'react';
import { Check, Hammer, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ESTATE_UPGRADES } from '../data/estateUpgradesData';
import type { EstateCopy } from '../i18n';
import type { EstateUpgradeDef, NobleEstate } from '../types';

interface EstateUpgradesSectionProps {
  estate: NobleEstate;
  locale: 'fr' | 'en';
  copy: EstateCopy['upgrades'];
  onUpdateEstate: (mutator: (prev: NobleEstate) => NobleEstate) => void;
}

export function EstateUpgradesSection({
  estate,
  locale,
  copy,
  onUpdateEstate,
}: EstateUpgradesSectionProps) {
  const [atelierSpecialties, setAtelierSpecialties] = useState<
    Record<string, string>
  >({});

  const upgradeMap = new Map(ESTATE_UPGRADES.map((u) => [u.id, u]));
  const totalCommitted =
    estate.installedUpgrades.length + estate.constructionQueue.length;
  const remainingSlots = Math.max(0, estate.domainLevel - totalCommitted);
  const slotPct =
    estate.domainLevel > 0
      ? Math.min(100, Math.round((totalCommitted / estate.domainLevel) * 100))
      : 100;

  const countForUpgrade = (id: EstateUpgradeDef['id']) =>
    estate.installedUpgrades.filter((u) => u.upgradeId === id).length +
    estate.constructionQueue.filter((q) => q.upgradeId === id).length;

  const handleQueueBuild = (
    def: EstateUpgradeDef,
    instant: boolean
  ) => {
    if (remainingSlots <= 0) return;
    if (def.maxBuilds !== null && countForUpgrade(def.id) >= def.maxBuilds) {
      return;
    }

    const specialty = def.requiresSpecialty
      ? (atelierSpecialties[def.id] || '').trim() ||
        (locale === 'fr' ? 'Artisanat général' : 'General Craft')
      : undefined;

    if (instant) {
      onUpdateEstate((prev) => ({
        ...prev,
        installedUpgrades: [
          ...prev.installedUpgrades,
          {
            instanceId: `upg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            upgradeId: def.id,
            specialty,
            builtAt: new Date().toISOString(),
          },
        ],
      }));
    } else {
      onUpdateEstate((prev) => ({
        ...prev,
        constructionQueue: [
          ...prev.constructionQueue,
          {
            id: `proj-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            upgradeId: def.id,
            specialty,
            startedNote: new Date().toLocaleDateString(),
          },
        ],
      }));
      toast.success(copy.buildQueuedToast(def.name[locale]));
    }

    if (def.requiresSpecialty) {
      setAtelierSpecialties((prev) => ({ ...prev, [def.id]: '' }));
    }
  };

  const handleCompleteAllQueue = () => {
    const count = estate.constructionQueue.length;
    if (count === 0) return;
    const now = new Date().toISOString();
    onUpdateEstate((prev) => ({
      ...prev,
      installedUpgrades: [
        ...prev.installedUpgrades,
        ...prev.constructionQueue.map((proj) => ({
          instanceId: `upg-${proj.id}`,
          upgradeId: proj.upgradeId,
          specialty: proj.specialty,
          builtAt: now,
        })),
      ],
      constructionQueue: [],
    }));
    toast.success(copy.monthCompletedToast(count));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Slot Budget Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base font-semibold">
              {copy.budgetLabel}
            </CardTitle>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {copy.slotsSummary(
                estate.installedUpgrades.length,
                estate.constructionQueue.length,
                estate.domainLevel
              )}
            </span>
          </div>
          {remainingSlots === 0 && (
            <CardDescription className="text-xs text-amber-500">
              {copy.noSlotsWarning}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Progress value={slotPct} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Queue + Installed Structures */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="gap-2 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base font-semibold">
                {copy.queueTitle}
              </CardTitle>
              <Button
                type="button"
                size="sm"
                disabled={estate.constructionQueue.length === 0}
                onClick={handleCompleteAllQueue}
                className="whitespace-nowrap shrink-0"
              >
                <Check data-icon="inline-start" />
                <span>{copy.advanceMonthBtn}</span>
              </Button>
            </div>
            <CardDescription className="text-xs">
              {copy.queueDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {estate.constructionQueue.length === 0 ? (
              <p className="text-xs text-muted-foreground">{copy.emptyQueue}</p>
            ) : (
              <div className="divide-y divide-border/70 rounded-md border border-border/80">
                {estate.constructionQueue.map((proj) => {
                  const def = upgradeMap.get(proj.upgradeId);
                  return (
                    <div
                      key={proj.id}
                      className="flex flex-wrap items-center justify-between gap-2 p-3"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="text-sm font-medium">
                          {def?.name[locale]}
                          {proj.specialty ? ` (${proj.specialty})` : ''}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {def?.summary[locale]}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            onUpdateEstate((prev) => ({
                              ...prev,
                              installedUpgrades: [
                                ...prev.installedUpgrades,
                                {
                                  instanceId: `upg-${proj.id}`,
                                  upgradeId: proj.upgradeId,
                                  specialty: proj.specialty,
                                  builtAt: new Date().toISOString(),
                                },
                              ],
                              constructionQueue: prev.constructionQueue.filter(
                                (q) => q.id !== proj.id
                              ),
                            }))
                          }
                          className="h-7 px-2.5 text-xs"
                        >
                          {copy.completeSingleBtn}
                        </Button>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          aria-label={copy.cancelProjectBtn}
                          onClick={() =>
                            onUpdateEstate((prev) => ({
                              ...prev,
                              constructionQueue: prev.constructionQueue.filter(
                                (q) => q.id !== proj.id
                              ),
                            }))
                          }
                          className="size-7 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              {copy.installedTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {estate.installedUpgrades.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                {copy.emptyInstalled}
              </p>
            ) : (
              <div className="divide-y divide-border/70 rounded-md border border-border/80">
                {estate.installedUpgrades.map((inst) => {
                  const def = upgradeMap.get(inst.upgradeId);
                  return (
                    <div
                      key={inst.instanceId}
                      className="flex flex-wrap items-center justify-between gap-2 p-3"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="text-sm font-medium">
                          {def?.name[locale]}
                          {inst.specialty ? ` (${inst.specialty})` : ''}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {def?.summary[locale]}
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label={copy.removeUpgradeBtn}
                        onClick={() =>
                          onUpdateEstate((prev) => ({
                            ...prev,
                            installedUpgrades: prev.installedUpgrades.filter(
                              (u) => u.instanceId !== inst.instanceId
                            ),
                          }))
                        }
                        className="size-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Catalog of 8 Official Upgrades */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.catalogTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.catalogDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ESTATE_UPGRADES.map((def) => {
              const builtCount = countForUpgrade(def.id);
              const atLimit =
                def.maxBuilds !== null && builtCount >= def.maxBuilds;
              const disabled = remainingSlots <= 0 || atLimit;

              return (
                <div
                  key={def.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card p-3.5"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {def.name[locale]}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {def.maxBuilds !== null
                          ? `${builtCount}/${def.maxBuilds}`
                          : `${builtCount}×`}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-primary">
                      {def.summary[locale]}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {def.ruleText[locale]}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-border/60 pt-2.5">
                    {def.requiresSpecialty && !disabled && (
                      <Input
                        value={atelierSpecialties[def.id] || ''}
                        onChange={(e) =>
                          setAtelierSpecialties((prev) => ({
                            ...prev,
                            [def.id]: e.target.value,
                          }))
                        }
                        placeholder={copy.specialtyPlaceholder}
                        className="h-8 text-xs"
                      />
                    )}
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {atLimit ? (
                        <Badge variant="secondary" className="text-xs">
                          {copy.limitReachedLabel}
                        </Badge>
                      ) : (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={disabled}
                            onClick={() => handleQueueBuild(def, true)}
                            className="h-7 px-2.5 text-xs whitespace-nowrap"
                          >
                            <Plus className="size-3" />
                            <span>{copy.instantBuildBtn}</span>
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={disabled}
                            onClick={() => handleQueueBuild(def, false)}
                            className="h-7 px-2.5 text-xs whitespace-nowrap"
                          >
                            <Hammer className="size-3" />
                            <span>{copy.startBuildBtn}</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
