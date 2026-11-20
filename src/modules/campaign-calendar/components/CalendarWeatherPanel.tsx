import { useState } from 'react';
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  Compass,
  Dices,
  Flame,
  Lock,
  Moon,
  Snowflake,
  Sparkles,
  Sun,
  Thermometer,
  Unlock,
  Wind,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  CLIMATE_REGIONS,
  ELVEN_MONTHS,
  WEATHER_DEFINITIONS,
  getFestivalForDate,
  getMonthDef,
  getMoonPhaseForEpoch,
  getSeasonLabel,
  type ClimateRegionId,
  type ContinentCalendarState,
  type ModuleLanguage,
  type RecoveryCareMode,
  type WeatherConditionId,
} from '@/src/utils/continentCalendar';
import type { CampaignCalendarCopy } from '../i18n';

interface CalendarWeatherPanelProps {
  state: ContinentCalendarState;
  lang: ModuleLanguage;
  copy: CampaignCalendarCopy;
  onAdvanceDays: (days: number, careMode: RecoveryCareMode) => void;
  onSelectDay: (dayOfMonth: number) => void;
  onChangeMonth: (monthIndex: number) => void;
  onChangeYear: (year: number) => void;
  onChangeRegion: (regionId: ClimateRegionId) => void;
  onRerollWeather: () => void;
  onSetWeather: (weatherId: WeatherConditionId) => void;
  onToggleWeatherLock: () => void;
}

function getWeatherIcon(id: WeatherConditionId) {
  switch (id) {
    case 'clear':
      return Sun;
    case 'overcast':
      return Cloud;
    case 'rain':
      return CloudRain;
    case 'storm':
      return CloudLightning;
    case 'fog':
      return CloudFog;
    case 'frost':
    case 'blizzard':
      return Snowflake;
    case 'heatwave':
      return Flame;
    case 'gale':
      return Wind;
  }
}

export function CalendarWeatherPanel({
  state,
  lang,
  copy,
  onAdvanceDays,
  onSelectDay,
  onChangeMonth,
  onChangeYear,
  onChangeRegion,
  onRerollWeather,
  onSetWeather,
  onToggleWeatherLock,
}: CalendarWeatherPanelProps) {
  const [customDays, setCustomDays] = useState('5');
  const [advanceMode, setAdvanceMode] = useState<RecoveryCareMode>('rest');

  const monthDef = getMonthDef(state.monthIndex);
  const seasonLabel = getSeasonLabel(monthDef.season)[lang];
  const festival = getFestivalForDate(monthDef.id, state.dayOfMonth);
  const lunar = getMoonPhaseForEpoch(state.totalDaysElapsed);
  const weather = WEATHER_DEFINITIONS[state.weatherId];
  const WeatherIcon = getWeatherIcon(state.weatherId);
  const activeRegion =
    CLIMATE_REGIONS.find((r) => r.id === state.regionId) ?? CLIMATE_REGIONS[0];

  const handleCustomAdvance = () => {
    const parsed = Number.parseInt(customDays, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      onAdvanceDays(parsed, advanceMode);
    }
  };

  // Compute day-epoch offset for the start of the current month so lunar phases render cleanly on every day cell
  const monthStartEpoch = state.totalDaysElapsed - (state.dayOfMonth - 1);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Left 7 cols: Current Date, Controls & Elven Month Grid */}
      <div className="flex flex-col gap-5 lg:col-span-7">
        <Card className="border-border">
          <CardHeader className="gap-3 pb-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {seasonLabel} · {monthDef.meaning[lang]}
                </span>
                <CardTitle className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl tabular-nums">
                  {state.dayOfMonth} {monthDef.name[lang]} {state.year}
                </CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span>{monthDef.gregorianApprox[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <Moon className="size-3.5 text-primary" aria-hidden="true" />
                    <span>{lunar.phase.name[lang]}</span>
                    <span className="font-mono text-muted-foreground tabular-nums">
                      ({lunar.lunarDay} {copy.dateCard.lunarDaySuffix})
                    </span>
                  </span>
                </CardDescription>
              </div>

              {/* Compact Date Adjusters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-[11px] text-muted-foreground">
                    {copy.dateCard.monthLabel}
                  </Label>
                  <Select
                    value={String(state.monthIndex)}
                    onValueChange={(val) => {
                      if (val !== null) {
                        onChangeMonth(Number.parseInt(val, 10));
                      }
                    }}
                  >
                    <SelectTrigger className="h-8 w-36 text-xs">
                      <SelectValue>{monthDef.name[lang]}</SelectValue>
                    </SelectTrigger>
                    <SelectContent align="end">
                      {ELVEN_MONTHS.map((m) => (
                        <SelectItem key={m.id} value={String(m.index)}>
                          {m.index + 1}. {m.name[lang]} ({m.length}j)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="cal-year-input"
                    className="text-[11px] text-muted-foreground"
                  >
                    {copy.dateCard.yearLabel}
                  </Label>
                  <Input
                    id="cal-year-input"
                    type="number"
                    min={1000}
                    max={1500}
                    value={state.year}
                    onChange={(e) => {
                      const yr = Number.parseInt(e.target.value, 10);
                      if (Number.isFinite(yr) && yr >= 1) {
                        onChangeYear(yr);
                      }
                    }}
                    className="h-8 w-20 font-mono text-xs tabular-nums"
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Lunar Rule & Optional Festival Callout */}
            <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-foreground">
                  {copy.dateCard.lunarLabel} · {lunar.phase.illumination[lang]}
                </span>
              </div>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                {lunar.phase.ruleNote[lang]}
              </p>
            </div>

            {festival && (
              <div className="rounded-lg border border-primary/40 bg-primary/5 p-3.5 text-xs">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                  <span>
                    {copy.dateCard.festivalBannerTitle} : {festival.name[lang]}
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-foreground/90">
                  {festival.loreNote[lang]}
                </p>
              </div>
            )}

            <Separator />

            {/* Time Progression Controls */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">
                  {copy.dateCard.advanceLabel}
                </span>

                <div className="inline-flex rounded-md border border-border bg-muted/30 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAdvanceMode('rest')}
                    className={`rounded px-2.5 py-1 font-medium transition-colors ${
                      advanceMode === 'rest'
                        ? 'bg-background text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {copy.dateCard.advanceModeRest}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvanceMode('travel')}
                    className={`rounded px-2.5 py-1 font-medium transition-colors ${
                      advanceMode === 'travel'
                        ? 'bg-background text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {copy.dateCard.advanceModeTravel}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onAdvanceDays(1, advanceMode)}
                  className="font-mono tabular-nums"
                >
                  {copy.dateCard.advance1d}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAdvanceDays(3, advanceMode)}
                  className="font-mono tabular-nums"
                >
                  {copy.dateCard.advance3d}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onAdvanceDays(7, advanceMode)}
                  className="font-mono tabular-nums"
                >
                  {copy.dateCard.advance7d}
                </Button>

                <div className="ml-auto flex items-center gap-1.5">
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder={copy.dateCard.advanceCustomPlaceholder}
                    className="h-8 w-16 font-mono text-xs tabular-nums"
                    aria-label={copy.dateCard.advanceCustomPlaceholder}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleCustomAdvance}
                  >
                    {copy.dateCard.advanceCustomBtn}
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Interactive Month Day Grid (45-47 days) */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xs font-semibold text-foreground">
                    {copy.dateCard.monthGridTitle} — {monthDef.name[lang]} (
                    {monthDef.length} {copy.crafting.daysSuffix})
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    {copy.dateCard.monthGridHint}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="size-3 text-primary" />
                    {copy.dateCard.festivalLegend}
                  </span>
                  <span>● {copy.dateCard.fullMoonLegend}</span>
                  <span>○ {copy.dateCard.newMoonLegend}</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
                {Array.from({ length: monthDef.length }, (_, idx) => {
                  const dayNum = idx + 1;
                  const isToday = dayNum === state.dayOfMonth;
                  const dayFest = getFestivalForDate(monthDef.id, dayNum);
                  const dayEpoch = monthStartEpoch + idx;
                  const dayMoon = getMoonPhaseForEpoch(dayEpoch);
                  const isFullMoonStart =
                    dayMoon.phase.id === 'full-moon' && dayMoon.lunarDay === 15;
                  const isNewMoonStart =
                    dayMoon.phase.id === 'new-moon' && dayMoon.lunarDay === 1;

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => onSelectDay(dayNum)}
                      title={
                        dayFest
                          ? `${dayNum} ${monthDef.name[lang]} · ${dayFest.name[lang]}`
                          : `${dayNum} ${monthDef.name[lang]} · ${dayMoon.phase.name[lang]}`
                      }
                      className={`flex h-9 flex-col items-center justify-center rounded-md border font-mono text-xs tabular-nums transition-colors ${
                        isToday
                          ? 'border-primary bg-primary text-primary-foreground font-bold'
                          : dayFest
                            ? 'border-primary/45 bg-primary/10 text-foreground hover:bg-primary/20'
                            : 'border-border bg-card text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span>{dayNum}</span>
                      {(dayFest || isFullMoonStart || isNewMoonStart) && (
                        <span className="text-[9px] leading-none">
                          {dayFest ? '✦' : isFullMoonStart ? '●' : '○'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right 5 cols: Dynamic Weather Generator & Mechanical Penalties */}
      <div className="flex flex-col gap-5 lg:col-span-5">
        <Card className="border-border">
          <CardHeader className="gap-2 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <WeatherIcon className="size-5 text-primary" aria-hidden="true" />
              <span>{copy.weatherCard.title}</span>
            </CardTitle>
            <CardDescription>{activeRegion.hint[lang]}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            {/* Region & Manual Weather Controls */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">{copy.weatherCard.regionLabel}</Label>
                <Select
                  value={state.regionId}
                  onValueChange={(val) => {
                    if (val) onChangeRegion(val as ClimateRegionId);
                  }}
                >
                  <SelectTrigger className="h-8 w-full text-xs">
                    <SelectValue>{activeRegion.name[lang]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="start">
                    {CLIMATE_REGIONS.map((reg) => (
                      <SelectItem key={reg.id} value={reg.id}>
                        {reg.name[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs">
                  {copy.weatherCard.manualSelectLabel}
                </Label>
                <Select
                  value={state.weatherId}
                  onValueChange={(val) => {
                    if (val) onSetWeather(val as WeatherConditionId);
                  }}
                >
                  <SelectTrigger className="h-8 w-full text-xs">
                    <SelectValue>{weather.name[lang]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent align="end">
                    {Object.values(WEATHER_DEFINITIONS).map((w) => (
                      <SelectItem key={w.id} value={w.id}>
                        {w.name[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={onRerollWeather}
                className="flex-1"
              >
                <Dices data-icon="inline-start" />
                <span>{copy.weatherCard.rerollBtn}</span>
              </Button>
              <Button
                type="button"
                variant={state.weatherLocked ? 'secondary' : 'outline'}
                size="sm"
                onClick={onToggleWeatherLock}
                title={
                  state.weatherLocked
                    ? copy.weatherCard.lockedHint
                    : copy.weatherCard.unlockedHint
                }
              >
                {state.weatherLocked ? (
                  <Lock data-icon="inline-start" className="size-3.5" />
                ) : (
                  <Unlock data-icon="inline-start" className="size-3.5" />
                )}
                <span>{copy.weatherCard.lockLabel}</span>
              </Button>
            </div>

            <Separator />

            {/* Today's Weather Hero Summary */}
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-muted/25 p-3.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <WeatherIcon className="size-5 text-primary" />
                  <span className="text-base font-semibold text-foreground">
                    {weather.name[lang]}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                  <Thermometer className="size-3.5" aria-hidden="true" />
                  {weather.temperatureBand[monthDef.season][lang]}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {weather.summary[lang]}
              </p>
            </div>

            {/* Active Mechanical Modifiers List */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-foreground">
                {copy.weatherCard.modifiersTitle}
              </h4>

              <div className="divide-y divide-border rounded-lg border border-border bg-card text-xs">
                <div className="flex items-start justify-between gap-3 px-3 py-2">
                  <span className="font-medium text-muted-foreground">
                    {copy.weatherCard.modPerception}
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {weather.modifiers.perception[lang]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-3 py-2">
                  <span className="font-medium text-muted-foreground">
                    {copy.weatherCard.modRanged}
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {weather.modifiers.ranged[lang]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-3 py-2">
                  <span className="font-medium text-muted-foreground">
                    {copy.weatherCard.modFireMagic}
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {weather.modifiers.fireMagic[lang]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-3 py-2">
                  <span className="font-medium text-muted-foreground">
                    {copy.weatherCard.modWaterMagic}
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {weather.modifiers.waterMagic[lang]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 px-3 py-2">
                  <span className="flex items-center gap-1 font-medium text-muted-foreground">
                    <Compass className="size-3.5 text-primary" />
                    {copy.weatherCard.modTravelSurvival}
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {weather.modifiers.travelAndSurvival[lang]}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
