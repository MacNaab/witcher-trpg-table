import { useState } from 'react';
import {
  Activity,
  HeartPulse,
  Minus,
  Plus,
  RefreshCw,
  Stethoscope,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  computeDailyHealAmount,
  type ModuleLanguage,
  type RecoveryCareMode,
  type TrackedRecoveryCharacter,
} from '@/src/utils/continentCalendar';
import type { CampaignCalendarCopy } from '../i18n';

interface RecoveryTrackerPanelProps {
  characters: TrackedRecoveryCharacter[];
  lang: ModuleLanguage;
  copy: CampaignCalendarCopy;
  onSyncHub: () => void;
  onAddCharacter: (char: Omit<TrackedRecoveryCharacter, 'id'>) => void;
  onUpdateCharacter: (
    id: string,
    patch: Partial<TrackedRecoveryCharacter>
  ) => void;
  onRemoveCharacter: (id: string) => void;
}

export function RecoveryTrackerPanel({
  characters,
  lang,
  copy,
  onSyncHub,
  onAddCharacter,
  onUpdateCharacter,
  onRemoveCharacter,
}: RecoveryTrackerPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [professionLabel, setProfessionLabel] = useState('');
  const [maxHp, setMaxHp] = useState('30');
  const [rec, setRec] = useState('6');

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    const parsedMaxHp = Math.max(1, Number.parseInt(maxHp, 10) || 30);
    const parsedRec = Math.max(1, Number.parseInt(rec, 10) || 5);
    onAddCharacter({
      name: cleanName,
      professionLabel:
        professionLabel.trim() || (lang === 'fr' ? 'Compagnon' : 'Companion'),
      currentHp: parsedMaxHp,
      maxHp: parsedMaxHp,
      rec: parsedRec,
      careMode: 'rest',
      doctorHealingHands: false,
      criticalWoundNote: '',
      criticalWoundDaysLeft: 0,
    });
    setName('');
    setProfessionLabel('');
    setMaxHp('30');
    setRec('6');
    setShowAddForm(false);
  };

  return (
    <Card className="border-border">
      <CardHeader className="gap-3 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <HeartPulse className="size-5 text-primary" aria-hidden="true" />
              <span>{copy.recovery.title}</span>
            </CardTitle>
            <CardDescription>{copy.recovery.subtitle}</CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSyncHub}
            >
              <RefreshCw data-icon="inline-start" className="size-3.5" />
              <span>{copy.recovery.syncHubBtn}</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setShowAddForm((prev) => !prev)}
            >
              <UserPlus data-icon="inline-start" className="size-3.5" />
              <span>{copy.recovery.addCustomBtn}</span>
            </Button>
          </div>
        </div>

        <p className="rounded-md border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
          {copy.recovery.ruleSummary}
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {showAddForm && (
          <form
            onSubmit={handleSubmitCustom}
            className="grid gap-3 rounded-lg border border-border bg-muted/20 p-3.5 sm:grid-cols-2 lg:grid-cols-5"
          >
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-2">
              <Label htmlFor="rec-name" className="text-xs">
                {copy.recovery.nameLabel}
              </Label>
              <Input
                id="rec-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.recovery.namePlaceholder}
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="rec-prof" className="text-xs">
                {copy.recovery.profLabel}
              </Label>
              <Input
                id="rec-prof"
                value={professionLabel}
                onChange={(e) => setProfessionLabel(e.target.value)}
                placeholder={copy.recovery.profPlaceholder}
                className="h-8 text-xs"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="rec-maxhp" className="text-xs">
                {copy.recovery.maxHpLabel}
              </Label>
              <Input
                id="rec-maxhp"
                type="number"
                min={1}
                max={500}
                value={maxHp}
                onChange={(e) => setMaxHp(e.target.value)}
                className="h-8 font-mono text-xs tabular-nums"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="rec-stat" className="text-xs">
                {copy.recovery.recLabel}
              </Label>
              <Input
                id="rec-stat"
                type="number"
                min={1}
                max={30}
                value={rec}
                onChange={(e) => setRec(e.target.value)}
                className="h-8 font-mono text-xs tabular-nums"
              />
            </div>

            <div className="flex items-center justify-end gap-2 sm:col-span-2 lg:col-span-5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                {copy.recovery.cancelBtn}
              </Button>
              <Button type="submit" size="sm">
                {copy.recovery.saveCustomBtn}
              </Button>
            </div>
          </form>
        )}

        {characters.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-center">
            <Activity className="size-7 text-muted-foreground/70" />
            <p className="text-sm font-semibold text-foreground">
              {copy.recovery.emptyTitle}
            </p>
            <p className="max-w-md text-xs text-muted-foreground">
              {copy.recovery.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {characters.map((char) => {
              const hpPct = Math.max(
                0,
                Math.min(100, Math.round((char.currentHp / char.maxHp) * 100))
              );
              const dailyRate = computeDailyHealAmount(char);
              const isInjured = char.currentHp < char.maxHp;

              return (
                <div
                  key={char.id}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {char.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {char.professionLabel}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          · {copy.recovery.recStatLabel} {char.rec} ·{' '}
                          {copy.recovery.ratePerDayLabel} +{dailyRate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 font-mono text-xs"
                        onClick={() =>
                          onUpdateCharacter(char.id, {
                            currentHp: Math.max(0, char.currentHp - 5),
                          })
                        }
                      >
                        -5
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 font-mono text-xs"
                        onClick={() =>
                          onUpdateCharacter(char.id, {
                            currentHp: Math.max(0, char.currentHp - 1),
                          })
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span
                        className={`min-w-[4.5rem] text-center font-mono text-sm font-bold tabular-nums ${
                          isInjured ? 'text-amber-500' : 'text-emerald-500'
                        }`}
                      >
                        {char.currentHp} / {char.maxHp}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 font-mono text-xs"
                        onClick={() =>
                          onUpdateCharacter(char.id, {
                            currentHp: Math.min(char.maxHp, char.currentHp + 1),
                          })
                        }
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 font-mono text-xs"
                        onClick={() =>
                          onUpdateCharacter(char.id, {
                            currentHp: Math.min(
                              char.maxHp,
                              char.currentHp + dailyRate
                            ),
                          })
                        }
                      >
                        +{dailyRate}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={copy.recovery.removeLabel}
                        onClick={() => onRemoveCharacter(char.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Clean HP Progress Bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all ${
                        hpPct < 40
                          ? 'bg-rose-500'
                          : hpPct < 80
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                      style={{ width: `${hpPct}%` }}
                    />
                  </div>

                  {/* Care Mode, Healing Hands, and Critical Wound Countdown */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex rounded-md border border-border bg-muted/30 p-0.5 text-[11px]">
                        {(['rest', 'travel'] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() =>
                              onUpdateCharacter(char.id, {
                                careMode: mode as RecoveryCareMode,
                              })
                            }
                            className={`rounded px-2 py-0.5 font-medium transition-colors ${
                              char.careMode === mode
                                ? 'bg-background text-foreground shadow-xs'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {mode === 'rest'
                              ? copy.recovery.careModeRest
                              : copy.recovery.careModeTravel}
                          </button>
                        ))}
                      </div>

                      <Button
                        type="button"
                        variant={char.doctorHealingHands ? 'secondary' : 'outline'}
                        size="sm"
                        className="h-7 gap-1 px-2 text-[11px]"
                        onClick={() =>
                          onUpdateCharacter(char.id, {
                            doctorHealingHands: !char.doctorHealingHands,
                          })
                        }
                      >
                        <Stethoscope className="size-3" />
                        <span>{copy.recovery.doctorToggle}</span>
                      </Button>
                    </div>

                    {/* Critical Wound Recovery Days */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-muted-foreground">
                        {copy.recovery.critWoundLabel}:
                      </span>
                      <Input
                        value={char.criticalWoundNote}
                        onChange={(e) =>
                          onUpdateCharacter(char.id, {
                            criticalWoundNote: e.target.value,
                          })
                        }
                        placeholder={copy.recovery.critWoundPlaceholder}
                        className="h-7 w-40 text-xs"
                      />
                      <Input
                        type="number"
                        min={0}
                        max={60}
                        value={char.criticalWoundDaysLeft}
                        onChange={(e) => {
                          const days = Math.max(
                            0,
                            Number.parseInt(e.target.value, 10) || 0
                          );
                          onUpdateCharacter(char.id, {
                            criticalWoundDaysLeft: days,
                          });
                        }}
                        className="h-7 w-14 font-mono text-xs tabular-nums"
                        aria-label={copy.recovery.critDaysLabel}
                      />
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {copy.crafting.daysSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
