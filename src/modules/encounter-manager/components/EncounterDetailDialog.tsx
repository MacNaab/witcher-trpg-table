import { useEffect, useState } from 'react';
import {
  BarChart3,
  Copy,
  Package,
  PawPrint,
  Shield,
  ShieldAlert,
  Skull,
  Sparkles,
  Swords,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BestiaryCombatVariant } from '@/src/data/bestiary';
import { getCreatureTypeLabel, getEnvironmentLabel } from '../data';
import { getEncounterManagerCopy } from '../i18n';
import type { EncounterEntry, ModuleLanguage } from '../types';
import { formatEncounterAsText } from '../utils/encounterRoller';

interface EncounterDetailDialogProps {
  entry: EncounterEntry | null;
  lang: ModuleLanguage;
  onClose: () => void;
  onSendToCombat?: (
    entry: EncounterEntry,
    quantity: number,
    variant?: BestiaryCombatVariant
  ) => void;
  onSendToSimulator?: (
    entry: EncounterEntry,
    quantity: number,
    variant?: BestiaryCombatVariant
  ) => void;
}

/**
 * Full Game Master encounter reference dialog showing tactical metadata,
 * Witcher TRPG characteristics, skills, weapons, special abilities,
 * vulnerabilities, loot, caste variants, and sanitized GM notes.
 */
export function EncounterDetailDialog({
  entry,
  lang,
  onClose,
  onSendToCombat,
  onSendToSimulator,
}: EncounterDetailDialogProps) {
  const copy = getEncounterManagerCopy(lang);
  const d = copy.dossier;
  const [variantIdx, setVariantIdx] = useState(0);
  const [launchQty, setLaunchQty] = useState(1);

  useEffect(() => {
    setVariantIdx(0);
    setLaunchQty(1);
  }, [entry?.id]);

  const handleCopy = async () => {
    if (!entry) return;
    try {
      await navigator.clipboard.writeText(formatEncounterAsText(entry, lang));
      toast.success(d.copiedToast);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const variants = entry?.combat?.variants;
  const activeCombat =
    variants && variants.length > 0
      ? (variants[variantIdx] ?? variants[0])
      : entry?.combat;

  const KindIcon =
    entry?.kind === 'monster'
      ? Skull
      : entry?.kind === 'humanoid'
        ? Users
        : PawPrint;

  const kindLabel =
    entry?.kind === 'monster'
      ? d.monsterTag
      : entry?.kind === 'humanoid'
        ? d.humanoidTag
        : d.animalTag;

  return (
    <Dialog
      open={entry !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        {entry && (
          <>
            <DialogHeader className="pr-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                  <KindIcon className="size-3.5" aria-hidden="true" />
                  {kindLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{getCreatureTypeLabel(entry.typeId, lang)}</span>
                <span aria-hidden="true">·</span>
                <span className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">
                  {entry.isFanMade ? d.fanMadeTag : d.officialTag}
                </span>
                {entry.isUniqueNpc && (
                  <span className="rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary">
                    {d.uniqueNpcTag}
                  </span>
                )}
              </div>
              <DialogTitle className="text-xl font-semibold tracking-tight text-foreground">
                {entry.name[lang]}
              </DialogTitle>
              <DialogDescription>
                {entry.threat[lang]} · {entry.reward[lang]}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            <div className="sm:max-h-[65dvh] sm:overflow-y-auto sm:pr-2">
              <div className="flex flex-col gap-4">
                {/* Key Tactical Stats Grid */}
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.threat}
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {entry.threat[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.reward}
                    </dt>
                    <dd className="font-mono text-sm font-medium text-primary tabular-nums">
                      {entry.reward[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Shield className="size-3.5" aria-hidden="true" />
                      <span>{d.armor}</span>
                    </dt>
                    <dd className="font-mono text-sm text-foreground tabular-nums">
                      {entry.armor[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.intelligence}
                    </dt>
                    <dd className="text-sm text-foreground">
                      {entry.intelligence[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.size} / {d.weight}
                    </dt>
                    <dd className="text-sm text-foreground">
                      {entry.size[lang]} · {entry.weight[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 rounded-lg bg-muted/40 p-3">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.organization}
                    </dt>
                    <dd className="text-sm text-foreground">
                      {entry.organization[lang]}
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1.5 rounded-lg bg-muted/40 p-3 sm:col-span-2">
                    <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.environments}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {entry.environments.map((envId) => (
                        <span
                          key={envId}
                          className="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground"
                        >
                          {getEnvironmentLabel(envId, lang)}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* Optional Caste/Variant Selector (e.g. Endregas Queen / Warrior / Drone / Worker) */}
                {variants && variants.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.variants}
                    </span>
                    <Tabs
                      value={String(variantIdx)}
                      onValueChange={(value) => {
                        const parsed = Number(value);
                        if (!Number.isNaN(parsed)) setVariantIdx(parsed);
                      }}
                    >
                      <TabsList className="flex h-auto flex-wrap gap-1 p-1">
                        {variants.map((variant, idx) => (
                          <TabsTrigger
                            key={variant.label.fr}
                            value={String(idx)}
                            className="px-2.5 py-1 text-xs"
                          >
                            {variant.label[lang]}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                {/* Unified Combat Stat Sheet (Caract, Compt, Arme, Capacités, Vulnérabilités, Butins) */}
                {activeCombat && (
                  <div className="flex flex-col gap-3">
                    {Object.keys(activeCombat.stats).length > 0 && (
                      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                        <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                          {d.combatStats}
                        </h4>
                        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                          {Object.entries(activeCombat.stats).map(
                            ([stat, val]) => (
                              <div
                                key={stat}
                                className="flex flex-col rounded border border-border bg-background px-2 py-1 text-center"
                              >
                                <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                                  {stat}
                                </span>
                                <span className="font-mono text-xs font-semibold text-foreground tabular-nums">
                                  {val}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {Object.keys(activeCombat.skills).length > 0 && (
                      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                        <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                          {d.combatSkills}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(activeCombat.skills).map(
                            ([skill, val]) => (
                              <span
                                key={skill}
                                className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                              >
                                <span className="text-muted-foreground">
                                  {skill}:{' '}
                                </span>
                                <span className="font-mono font-semibold tabular-nums">
                                  +{val}
                                </span>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {entry.combat?.keySkills &&
                      Object.keys(entry.combat.keySkills).length > 0 && (
                        <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                          <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            {d.keySkills}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(entry.combat.keySkills).map(
                              ([skill, val]) => (
                                <span
                                  key={skill}
                                  className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                                >
                                  <span className="text-muted-foreground">
                                    {skill}:{' '}
                                  </span>
                                  <span className="font-mono font-semibold tabular-nums">
                                    {val}
                                  </span>
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {entry.combat?.favoredMagic &&
                      entry.combat.favoredMagic.length > 0 && (
                        <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <Sparkles
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            <span>{d.favoredMagic}</span>
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.combat.favoredMagic.map((spell) => (
                              <span
                                key={spell}
                                className="rounded border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-foreground"
                              >
                                {spell}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {activeCombat.weapons.length > 0 && (
                      <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                        <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                          <Swords className="size-3.5" aria-hidden="true" />
                          <span>{d.weapons}</span>
                        </h4>
                        <div className="rounded-md border border-border bg-background">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="text-xs">
                                  {d.weaponName}
                                </TableHead>
                                <TableHead className="text-xs">
                                  {d.weaponDamage}
                                </TableHead>
                                <TableHead className="text-xs">
                                  {d.weaponEffect}
                                </TableHead>
                                <TableHead className="text-right text-xs">
                                  {d.weaponAttacks}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {activeCombat.weapons.map((weapon, idx) => (
                                <TableRow key={`${weapon.name}-${idx}`}>
                                  <TableCell className="text-xs font-medium text-foreground">
                                    {weapon.name}
                                  </TableCell>
                                  <TableCell className="font-mono text-xs text-primary tabular-nums">
                                    {weapon.damage}
                                  </TableCell>
                                  <TableCell className="text-xs text-muted-foreground whitespace-normal">
                                    {weapon.effect}
                                  </TableCell>
                                  <TableCell className="text-right font-mono text-xs tabular-nums">
                                    {weapon.attacksPerTurn}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {d.attacksPerRoundNote}
                        </p>
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-3">
                      {activeCombat.abilities.length > 0 && (
                        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/20 p-3">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <Sparkles
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            <span>{d.abilities}</span>
                          </h4>
                          <ul className="flex flex-col gap-1 text-xs text-foreground">
                            {activeCombat.abilities.map((ab, idx) => (
                              <li key={`${ab}-${idx}`}>• {ab}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeCombat.vulnerabilities.length > 0 && (
                        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/20 p-3">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <ShieldAlert
                              className="size-3.5 text-destructive"
                              aria-hidden="true"
                            />
                            <span>{d.vulnerabilities}</span>
                          </h4>
                          <ul className="flex flex-col gap-1 text-xs text-foreground">
                            {activeCombat.vulnerabilities.map((vuln, idx) => (
                              <li key={`${vuln}-${idx}`}>• {vuln}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeCombat.loot.length > 0 && (
                        <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/20 p-3">
                          <h4 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                            <Package className="size-3.5" aria-hidden="true" />
                            <span>{d.loot}</span>
                          </h4>
                          <ul className="flex flex-col gap-1 text-xs text-foreground">
                            {activeCombat.loot.map((item, idx) => (
                              <li key={`${item}-${idx}`}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Optional Legacy Reference Attributes */}
                {!activeCombat && entry.baseStats && (
                  <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/20 p-3.5">
                    <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      {d.baseStats}
                    </h4>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {Object.entries(entry.baseStats).map(([stat, val]) => (
                        <div
                          key={stat}
                          className="flex flex-col rounded border border-border bg-background px-2 py-1.5 text-center"
                        >
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                            {stat}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground tabular-nums">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GM Notes */}
                <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3.5">
                  <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {d.notes}
                  </h4>
                  {entry.notes[lang].length > 0 ? (
                    <div className="flex flex-col gap-2 text-sm leading-relaxed text-foreground">
                      {entry.notes[lang].map((paragraph, idx) => (
                        <p key={`${entry.id}-note-${idx}`}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">{d.noNotes}</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="flex-wrap gap-2 sm:justify-between">
              {(onSendToCombat || onSendToSimulator) && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Label
                      htmlFor="detail-launch-qty"
                      className="text-xs text-muted-foreground"
                    >
                      {d.quantityLabel}
                    </Label>
                    <Input
                      id="detail-launch-qty"
                      type="number"
                      min={1}
                      max={8}
                      value={launchQty}
                      onChange={(e) =>
                        setLaunchQty(
                          Math.max(
                            1,
                            Math.min(8, Number.parseInt(e.target.value, 10) || 1)
                          )
                        )
                      }
                      className="h-8 w-14 font-mono text-xs tabular-nums"
                    />
                  </div>
                  {onSendToCombat && (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() =>
                        onSendToCombat(
                          entry,
                          launchQty,
                          variants && variants.length > 0
                            ? (variants[variantIdx] ?? variants[0])
                            : undefined
                        )
                      }
                    >
                      <Swords data-icon="inline-start" />
                      <span>{d.sendToCombat}</span>
                    </Button>
                  )}
                  {onSendToSimulator && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onSendToSimulator(
                          entry,
                          launchQty,
                          variants && variants.length > 0
                            ? (variants[variantIdx] ?? variants[0])
                            : undefined
                        )
                      }
                    >
                      <BarChart3 data-icon="inline-start" />
                      <span>{d.sendToSimulator}</span>
                    </Button>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleCopy}
                >
                  <Copy data-icon="inline-start" />
                  <span>{d.copy}</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  {copy.bestiary.dialogClose}
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
