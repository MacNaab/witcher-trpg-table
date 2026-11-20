import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Compass,
  Copy,
  History,
  MinusCircle,
  RotateCcw,
  ShieldCheck,
  Skull,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { getRandomTablesCopy } from '../i18n';
import type {
  EncounterDisposition,
  ModularEncounterRates,
  ModularEncounterResult,
  ModuleLanguage,
} from '../types';
import {
  formatEncounterAsText,
  rollModularEncounter,
} from '../utils/roller';

interface ModularEncounterSectionProps {
  lang: ModuleLanguage;
}

const DEFAULT_RATES: ModularEncounterRates = {
  good: 33,
  neutral: 34,
  bad: 33,
};

const PRESET_SAFE: ModularEncounterRates = {
  good: 50,
  neutral: 35,
  bad: 15,
};

const PRESET_HOSTILE: ModularEncounterRates = {
  good: 15,
  neutral: 35,
  bad: 50,
};

function DispositionIcon({
  disposition,
}: {
  disposition: EncounterDisposition;
}) {
  if (disposition === 'good') {
    return <ShieldCheck className="size-4 text-emerald-500" aria-hidden="true" />;
  }
  if (disposition === 'bad') {
    return <Skull className="size-4 text-destructive" aria-hidden="true" />;
  }
  return <MinusCircle className="size-4 text-amber-500" aria-hidden="true" />;
}

const MODULAR_ENC_STORAGE_KEY = 'witcher-gm-modular-enc-v1';
const MAX_MODULAR_HISTORY = 12;

interface PersistedModularEncounterState {
  rates: ModularEncounterRates;
  history: ModularEncounterResult[];
}

function loadStoredModularEncounterState(): PersistedModularEncounterState {
  const fallback: PersistedModularEncounterState = {
    rates: DEFAULT_RATES,
    history: [],
  };
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(MODULAR_ENC_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedModularEncounterState>;
    if (!parsed || typeof parsed !== 'object') return fallback;

    const r = parsed.rates;
    const validRates =
      r &&
      typeof r.good === 'number' &&
      typeof r.neutral === 'number' &&
      typeof r.bad === 'number' &&
      r.good >= 0 &&
      r.neutral >= 0 &&
      r.bad >= 0 &&
      Math.round(r.good + r.neutral + r.bad) === 100
        ? r
        : DEFAULT_RATES;

    const validHistory = Array.isArray(parsed.history)
      ? parsed.history
          .filter(
            (item): item is ModularEncounterResult =>
              Boolean(
                item &&
                  typeof item === 'object' &&
                  typeof item.id === 'string' &&
                  typeof item.d100Roll === 'number' &&
                  item.detail
              )
          )
          .slice(0, MAX_MODULAR_HISTORY)
      : [];

    return {
      rates: validRates,
      history: validHistory,
    };
  } catch {
    return fallback;
  }
}

/**
 * Dual-thumb probability splitter (Good / Neutral / Bad) and Modular Encounter roller.
 */
export function ModularEncounterSection({
  lang,
}: ModularEncounterSectionProps) {
  const copy = getRandomTablesCopy(lang);
  const initialStored = useMemo(() => loadStoredModularEncounterState(), []);

  const [rates, setRates] = useState<ModularEncounterRates>(initialStored.rates);
  const [history, setHistory] = useState<ModularEncounterResult[]>(
    initialStored.history
  );
  const [result, setResult] = useState<ModularEncounterResult | null>(
    initialStored.history[0] ?? null
  );
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload: PersistedModularEncounterState = {
        rates,
        history: history.slice(0, MAX_MODULAR_HISTORY),
      };
      window.localStorage.setItem(
        MODULAR_ENC_STORAGE_KEY,
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [history, rates]);

  const sliderHandles: [number, number] = [rates.good, rates.good + rates.neutral];

  const handleSliderChange = (value: number | readonly number[]) => {
    if (!Array.isArray(value) || value.length < 2) return;
    const low = Math.max(0, Math.min(100, Math.round(value[0])));
    const high = Math.max(low, Math.min(100, Math.round(value[1])));
    setRates({
      good: low,
      neutral: high - low,
      bad: 100 - high,
    });
  };

  const handleGenerate = () => {
    const rolled = rollModularEncounter(rates);
    setResult(rolled);
    setHistory((prev) => [rolled, ...prev].slice(0, MAX_MODULAR_HISTORY));
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        formatEncounterAsText(result, lang, copy)
      );
      toast.success(copy.encounter.copiedToast);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Probability Split & Action Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold">
                {copy.encounter.title}
              </CardTitle>
              <CardDescription>{copy.encounter.description}</CardDescription>
            </div>

            <Button
              type="button"
              size="lg"
              onClick={handleGenerate}
              className="w-full shrink-0 sm:w-auto"
            >
              <Compass data-icon="inline-start" />
              <span>{copy.encounter.generateButton}</span>
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-4 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {copy.encounter.distributionTitle}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setRates(DEFAULT_RATES)}
            >
              <RotateCcw data-icon="inline-start" />
              <span>{copy.encounter.resetButton}</span>
            </Button>
          </div>

          {/* Numeric Readout */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <DispositionIcon disposition="good" />
                <span>{copy.encounter.dispositions.good}</span>
              </span>
              <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                {rates.good}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <DispositionIcon disposition="neutral" />
                <span>{copy.encounter.dispositions.neutral}</span>
              </span>
              <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                {rates.neutral}%
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                <DispositionIcon disposition="bad" />
                <span>{copy.encounter.dispositions.bad}</span>
              </span>
              <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                {rates.bad}%
              </span>
            </div>
          </div>

          {/* Visual Proportion Bar */}
          <div
            className="flex h-2 w-full overflow-hidden rounded-sm bg-muted"
            aria-hidden="true"
          >
            <div
              className="bg-emerald-600 transition-all"
              style={{ width: `${rates.good}%` }}
            />
            <div
              className="bg-amber-500 transition-all"
              style={{ width: `${rates.neutral}%` }}
            />
            <div
              className="bg-destructive transition-all"
              style={{ width: `${rates.bad}%` }}
            />
          </div>

          {/* Dual-thumb Shadcn Slider */}
          <div className="py-2">
            <Slider
              value={sliderHandles}
              min={0}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              aria-label={copy.encounter.distributionTitle}
            />
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {copy.encounter.presetsLabel}:
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setRates(DEFAULT_RATES)}
            >
              {copy.encounter.presets.balanced}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setRates(PRESET_SAFE)}
            >
              {copy.encounter.presets.safe}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setRates(PRESET_HOSTILE)}
            >
              {copy.encounter.presets.hostile}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Encounter Result Card */}
      {result ? (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <DispositionIcon disposition={result.disposition} />
                  <span className="text-foreground">
                    {copy.encounter.dispositions[result.disposition]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {copy.encounter.rollLabel} {result.d100Roll}
                  </span>
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {result.category[lang]}
                </CardTitle>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleCopy}
              >
                <Copy data-icon="inline-start" />
                <span>{copy.encounter.copyButton}</span>
              </Button>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-5">
            <p className="text-base leading-relaxed text-foreground">
              {result.detail[lang]}
            </p>
          </CardContent>

          {result.attribution && (
            <CardFooter className="border-t border-border pt-3 text-xs text-muted-foreground">
              <span>
                {copy.encounter.sourcePrefix}{' '}
                {result.attribution.url ? (
                  <a
                    href={result.attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    {result.attribution.author}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">
                    {result.attribution.author}
                  </span>
                )}
              </span>
            </CardFooter>
          )}
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <Compass className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="text-base font-medium text-foreground">
              {copy.encounter.emptyTitle}
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              {copy.encounter.emptyDescription}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Collapsible Encounter History */}
      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger
            render={
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground"
              >
                <History className="size-4" />
                <span>
                  {copy.encounter.historyTitle} (
                  <span className="font-mono tabular-nums">{history.length}</span>)
                </span>
                {historyOpen ? (
                  <ChevronUp className="size-4" />
                ) : (
                  <ChevronDown className="size-4" />
                )}
              </Button>
            }
          />
          {history.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setHistory([])}
              className="text-muted-foreground"
            >
              <Trash2 data-icon="inline-start" />
              <span>{copy.encounter.clearHistory}</span>
            </Button>
          )}
        </div>

        <CollapsibleContent className="pt-2">
          {history.length === 0 ? (
            <p className="rounded-lg bg-muted/35 p-4 text-sm text-muted-foreground">
              {copy.encounter.historyEmpty}
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setResult(item)}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <DispositionIcon disposition={item.disposition} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.category[lang]}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.detail[lang]}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground tabular-nums">
                    <span>d100: {item.d100Roll}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {new Date(item.timestamp).toLocaleTimeString(
                        lang === 'fr' ? 'fr-FR' : 'en-US',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
