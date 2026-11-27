import { useState } from 'react';
import {
  Copy,
  Dices,
  Flame,
  Plus,
  RotateCcw,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DEMON_SYLLABLE_MATRIX } from '../data/goetiaData';
import type { ChaosLeyGoetiaCopy } from '../i18n';
import type {
  DemonBindingState,
  DemonSpeciesId,
  GoetiaStoreState,
  SavedDemonEntry,
} from '../types';
import {
  rollExplodingD10,
  rollMatrixSyllable,
} from '../utils/goetiaStorage';

interface DemonTrueNameSectionProps {
  store: GoetiaStoreState;
  onUpdateStore: (
    updater: (prev: GoetiaStoreState) => GoetiaStoreState
  ) => void;
  locale: 'fr' | 'en';
  copy: ChaosLeyGoetiaCopy['trueName'];
}

export function DemonTrueNameSection({
  store,
  onUpdateStore,
  locale,
  copy,
}: DemonTrueNameSectionProps) {
  const [syllables, setSyllables] = useState<[string, string, string]>([
    'RES',
    'TAL',
    'TOS',
  ]);
  const [highlightedCells, setHighlightedCells] = useState<string[]>([]);

  const [species, setSpecies] = useState<DemonSpeciesId>('bes');
  const [isGreater, setIsGreater] = useState(false);
  const [bindingState, setBindingState] =
    useState<DemonBindingState>('unbound');
  const [lucifugeBearer, setLucifugeBearer] = useState('');
  const [bindingCheckResult, setBindingCheckResult] = useState('22');
  const [summonerNotes, setSummonerNotes] = useState('');

  const assembledName = syllables.filter(Boolean).join('');

  const handleRollTwo = () => {
    const first = rollMatrixSyllable();
    const second = rollMatrixSyllable();
    setSyllables([first.syllable, second.syllable, '']);
    setHighlightedCells([
      `${first.d10 - 1}-${first.d6 - 1}`,
      `${second.d10 - 1}-${second.d6 - 1}`,
    ]);
  };

  const handleRollThree = () => {
    const first = rollMatrixSyllable();
    const second = rollMatrixSyllable();
    const third = rollMatrixSyllable();
    setSyllables([first.syllable, second.syllable, third.syllable]);
    setHighlightedCells([
      `${first.d10 - 1}-${first.d6 - 1}`,
      `${second.d10 - 1}-${second.d6 - 1}`,
      `${third.d10 - 1}-${third.d6 - 1}`,
    ]);
  };

  const handleCellClick = (rIdx: number, cIdx: number, syl: string) => {
    const coord = `${rIdx}-${cIdx}`;
    setSyllables((prev) => {
      if (!prev[0]) return [syl, prev[1], prev[2]];
      if (!prev[1]) return [prev[0], syl, prev[2]];
      return [prev[0], prev[1], syl];
    });
    setHighlightedCells((prev) => [...prev.slice(-2), coord]);
  };

  const handleCopyName = async () => {
    if (!assembledName) return;
    try {
      await navigator.clipboard.writeText(assembledName);
      toast.success(copy.copiedNameToast);
    } catch {
      toast.error('Clipboard unavailable');
    }
  };

  const handleSaveDemon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assembledName) return;

    const parsedCheck = parseInt(bindingCheckResult, 10);
    const entry: SavedDemonEntry = {
      id: `demon-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      trueName: assembledName,
      syllables: [...syllables] as [string, string, string],
      species,
      isGreater,
      bindingState,
      lucifugeBearer: lucifugeBearer.trim(),
      bindingCheckResult:
        bindingState === 'bound' && Number.isFinite(parsedCheck)
          ? parsedCheck
          : null,
      summonerNotes: summonerNotes.trim(),
      createdAt: new Date().toISOString(),
    };

    onUpdateStore((prev) => ({
      ...prev,
      demons: [entry, ...prev.demons],
    }));
    setLucifugeBearer('');
    setSummonerNotes('');
    toast.success(copy.savedToast);
  };

  const handleRollBiweeklyBreak = (demon: SavedDemonEntry) => {
    const demonResistBase = demon.isGreater ? 18 : 14;
    const d10 = rollExplodingD10();
    const total = demonResistBase + d10.total;
    const targetDc = demon.bindingCheckResult ?? 20;
    const brokeFree = total > targetDc;

    if (brokeFree) {
      onUpdateStore((prev) => ({
        ...prev,
        demons: prev.demons.map((d) =>
          d.id === demon.id ? { ...d, bindingState: 'escaped' } : d
        ),
      }));
      toast.error(
        locale === 'fr'
          ? `${demon.trueName} brise son lien (${total} vs ${targetDc}) !`
          : `${demon.trueName} breaks the Binding (${total} vs ${targetDc})!`
      );
    } else {
      toast.success(
        locale === 'fr'
          ? `Lien maintenu (${total} vs ${targetDc}).`
          : `Binding holds (${total} vs ${targetDc}).`
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Matrix Card */}
        <Card className="lg:col-span-7">
          <CardHeader className="gap-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Flame className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.generatorTitle}</span>
            </CardTitle>
            <CardDescription className="text-xs">
              {copy.generatorDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleRollTwo}
                className="whitespace-nowrap shrink-0"
              >
                <Dices data-icon="inline-start" />
                <span>{copy.rollTwoBtn}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleRollThree}
                className="whitespace-nowrap shrink-0"
              >
                <Dices data-icon="inline-start" />
                <span>{copy.rollThreeBtn}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setSyllables(['', '', '']);
                  setHighlightedCells([]);
                }}
                className="whitespace-nowrap shrink-0"
              >
                <RotateCcw data-icon="inline-start" />
                <span>{copy.clearSelectionBtn}</span>
              </Button>
            </div>

            {/* Syllable Slots + Preview */}
            <div className="flex flex-col gap-3 rounded-lg border border-border/80 bg-muted/25 p-3">
              <div className="grid grid-cols-3 gap-2">
                {([0, 1, 2] as const).map((idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <Label className="text-[11px] text-muted-foreground">
                      {copy.syllableSlot(idx + 1)}
                    </Label>
                    <Input
                      value={syllables[idx]}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase().slice(0, 6);
                        setSyllables((prev) => {
                          const next = [...prev] as [string, string, string];
                          next[idx] = val;
                          return next;
                        });
                      }}
                      className="h-8 text-center font-mono text-xs font-semibold tracking-wider uppercase"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-muted-foreground">
                    {copy.selectedNameLabel} :
                  </span>
                  <span className="font-mono text-xl font-bold tracking-widest text-primary">
                    {assembledName || '—'}
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!assembledName}
                  onClick={handleCopyName}
                  className="h-7 px-2.5 text-xs"
                >
                  <Copy className="size-3" />
                  <span>{copy.copyNameBtn}</span>
                </Button>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground">
              {copy.matrixHint}
            </p>

            {/* 1d10 x 1d6 Interactive Grid */}
            <div className="overflow-x-auto rounded-md border border-border/80">
              <table className="w-full border-collapse text-center font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-muted-foreground">
                    <th className="p-1.5 font-normal">1d10 \ 1d6</th>
                    {[1, 2, 3, 4, 5, 6].map((col) => (
                      <th key={col} className="p-1.5 font-semibold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEMON_SYLLABLE_MATRIX.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className="border-b border-border/60 last:border-b-0"
                    >
                      <td className="bg-muted/30 p-1.5 font-semibold text-muted-foreground">
                        {rIdx + 1}
                      </td>
                      {row.map((syl, cIdx) => {
                        const coord = `${rIdx}-${cIdx}`;
                        const active = highlightedCells.includes(coord);
                        return (
                          <td key={coord} className="p-0.5">
                            <button
                              type="button"
                              onClick={() => handleCellClick(rIdx, cIdx, syl)}
                              className={`w-full rounded px-1.5 py-1 transition-colors ${
                                active
                                  ? 'bg-primary font-bold text-primary-foreground'
                                  : 'hover:bg-muted text-foreground'
                              }`}
                            >
                              {syl}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Save Demon Form + Registry */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {copy.saveDemonTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveDemon} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.speciesLabel}</Label>
                    <Select
                      value={species}
                      onValueChange={(v) => setSpecies(v as DemonSpeciesId)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bes">
                          {copy.speciesNames.bes}
                        </SelectItem>
                        <SelectItem value="casglydd">
                          {copy.speciesNames.casglydd}
                        </SelectItem>
                        <SelectItem value="mari_lwyd">
                          {copy.speciesNames.mari_lwyd}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>{copy.bindingStateLabel}</Label>
                    <Select
                      value={bindingState}
                      onValueChange={(v) =>
                        setBindingState(v as DemonBindingState)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unbound">
                          {copy.bindingStates.unbound}
                        </SelectItem>
                        <SelectItem value="bound">
                          {copy.bindingStates.bound}
                        </SelectItem>
                        <SelectItem value="banished">
                          {copy.bindingStates.banished}
                        </SelectItem>
                        <SelectItem value="escaped">
                          {copy.bindingStates.escaped}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-foreground">
                  <Checkbox
                    checked={isGreater}
                    onCheckedChange={(v) => setIsGreater(Boolean(v))}
                  />
                  <span>{copy.greaterLabel}</span>
                </label>

                {bindingState === 'bound' && (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bind-check">{copy.bindingCheckLabel}</Label>
                    <Input
                      id="bind-check"
                      type="number"
                      value={bindingCheckResult}
                      onChange={(e) => setBindingCheckResult(e.target.value)}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="lucifuge-pc">{copy.lucifugeLabel}</Label>
                  <Input
                    id="lucifuge-pc"
                    placeholder={copy.lucifugePlaceholder}
                    value={lucifugeBearer}
                    onChange={(e) => setLucifugeBearer(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="demon-notes">{copy.notesLabel}</Label>
                  <Textarea
                    id="demon-notes"
                    rows={2}
                    placeholder={copy.notesPlaceholder}
                    value={summonerNotes}
                    onChange={(e) => setSummonerNotes(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!assembledName}
                  className="w-full"
                >
                  <Plus data-icon="inline-start" />
                  <span>{copy.saveToRegistryBtn}</span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {copy.registryTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {store.demons.length === 0 ? (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {copy.emptyRegistry}
                </p>
              ) : (
                <div className="divide-y divide-border/70 rounded-md border border-border/80">
                  {store.demons.map((demon) => (
                    <div key={demon.id} className="flex flex-col gap-2 p-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-mono text-sm font-bold tracking-wider text-primary">
                              {demon.trueName}
                            </span>
                            {demon.isGreater && (
                              <Badge variant="destructive" className="text-[10px]">
                                {copy.greaterBadge}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px]">
                              {copy.bindingStates[demon.bindingState]}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {copy.speciesNames[demon.species]}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {demon.bindingState === 'bound' && (
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => handleRollBiweeklyBreak(demon)}
                              className="h-7 px-2 text-xs"
                            >
                              <ShieldAlert className="size-3" />
                              <span>{copy.resistCheckBtn}</span>
                            </Button>
                          )}
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            aria-label={copy.deleteDemonBtn}
                            onClick={() =>
                              onUpdateStore((prev) => ({
                                ...prev,
                                demons: prev.demons.filter(
                                  (d) => d.id !== demon.id
                                ),
                              }))
                            }
                            className="size-7 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>

                      {demon.lucifugeBearer && (
                        <div className="text-xs font-medium text-destructive">
                          {copy.lucifugeBadge(demon.lucifugeBearer)}
                        </div>
                      )}

                      {demon.summonerNotes && (
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {demon.summonerNotes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
