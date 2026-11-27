import { useState } from 'react';
import { AlertTriangle, Compass, Dices, RotateCcw, Sparkles } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LEY_ELEMENTS } from '../data/leyLinesData';
import type { ChaosLeyGoetiaCopy } from '../i18n';
import type { LeyCasterType, LeyElementId } from '../types';
import { rollExplodingD10 } from '../utils/goetiaStorage';

interface LeyLinesSectionProps {
  locale: 'fr' | 'en';
  copy: ChaosLeyGoetiaCopy['ley'];
}

export function LeyLinesSection({ locale, copy }: LeyLinesSectionProps) {
  const [casterType, setCasterType] = useState<LeyCasterType>('mage');
  const [elementId, setElementId] = useState<LeyElementId>('earth');
  const [spellCastBase, setSpellCastBase] = useState('14');
  const [earthReconnectDc, setEarthReconnectDc] = useState(16);
  const [priestVigorPenalty, setPriestVigorPenalty] = useState(0);
  const [connected, setConnected] = useState(false);
  const [lastRollText, setLastRollText] = useState<string | null>(null);

  const selectedElement =
    LEY_ELEMENTS.find((e) => e.id === elementId) ?? LEY_ELEMENTS[0];
  const activeDc = elementId === 'earth' ? earthReconnectDc : 16;

  const handleDraw = () => {
    if (casterType === 'witcher') return;
    const base = parseInt(spellCastBase, 10) || 0;
    const d10 = rollExplodingD10();
    const total = base + d10.total;
    const ok = total >= activeDc;

    setConnected(ok);
    const rollInfo = `${base} + (${d10.rolls.join(',')}) = ${total} vs SD ${activeDc}`;
    setLastRollText(rollInfo);

    if (ok) {
      toast.success(
        locale === 'fr'
          ? `Connexion réussie (${rollInfo}) !`
          : `Attunement succeeded (${rollInfo})!`
      );
    } else {
      if (elementId === 'earth') {
        setEarthReconnectDc((dc) => dc + 2);
      }
      if (casterType === 'priest_druid') {
        setPriestVigorPenalty((p) => p + 2);
      }
      toast.error(
        locale === 'fr'
          ? `Échec (${rollInfo}) : échec critique élémentaire immédiat !`
          : `Failed (${rollInfo}): immediate elemental fumble (no bonus dmg)!`
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Interactive Draw & Attenuation Panel */}
        <Card className="lg:col-span-7">
          <CardHeader className="gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                <span>{copy.resolverTitle}</span>
              </CardTitle>
              <Badge variant={connected ? 'default' : 'secondary'}>
                {connected ? copy.connectedBadge : copy.severedBadge}
              </Badge>
            </div>
            <CardDescription className="text-xs">
              {copy.resolverDesc}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>{copy.casterTypeLabel}</Label>
                <Select
                  value={casterType}
                  onValueChange={(v) => {
                    setCasterType(v as LeyCasterType);
                    setConnected(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mage">{copy.casterTypes.mage}</SelectItem>
                    <SelectItem value="priest_druid">
                      {copy.casterTypes.priest_druid}
                    </SelectItem>
                    <SelectItem value="witcher">
                      {copy.casterTypes.witcher}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>{copy.elementLabel}</Label>
                <Select
                  value={elementId}
                  onValueChange={(v) => {
                    setElementId(v as LeyElementId);
                    setConnected(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEY_ELEMENTS.map((el) => (
                      <SelectItem key={el.id} value={el.id}>
                        {el.name[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {casterType === 'witcher' ? (
              <div className="flex items-start gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <p className="leading-relaxed">{copy.witcherBlockedWarning}</p>
              </div>
            ) : (
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex w-44 flex-col gap-1.5">
                  <Label htmlFor="ley-spellcast">
                    {copy.spellCastBaseLabel}
                  </Label>
                  <Input
                    id="ley-spellcast"
                    type="number"
                    value={spellCastBase}
                    onChange={(e) => setSpellCastBase(e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleDraw}
                  className="whitespace-nowrap shrink-0"
                >
                  <Dices data-icon="inline-start" />
                  <span>
                    {copy.drawCheckBtn} · SD {activeDc}
                  </span>
                </Button>

                {elementId === 'earth' && earthReconnectDc > 16 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEarthReconnectDc(16)}
                    className="whitespace-nowrap shrink-0"
                  >
                    <RotateCcw data-icon="inline-start" />
                    <span>{copy.resetEarthPenaltyBtn}</span>
                  </Button>
                )}

                {lastRollText && (
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {lastRollText}
                  </span>
                )}
              </div>
            )}

            <Separator />

            {/* Active Rules Breakdown */}
            {casterType === 'priest_druid' ? (
              <div className="flex flex-col gap-3 rounded-md border border-border/80 bg-muted/20 p-3.5 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-foreground">
                    {copy.priestMixedTitle}
                  </span>
                  <span className="font-mono text-xs text-amber-500 tabular-nums">
                    {copy.priestVigorStatus(priestVigorPenalty)}
                  </span>
                </div>
                <p className="leading-relaxed text-foreground">
                  <strong>{copy.benefitLabel} :</strong>{' '}
                  {copy.priestMixedBenefit}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  <strong>{copy.penaltyLabel} :</strong>{' '}
                  {copy.priestMixedPenalty}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setPriestVigorPenalty((p) => p + 2)}
                    className="h-7 px-2.5 text-xs"
                  >
                    {copy.priestVigorPenaltyBtn}
                  </Button>
                  {priestVigorPenalty > 0 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setPriestVigorPenalty(0)}
                      className="h-7 px-2.5 text-xs"
                    >
                      {copy.priestVigorResetBtn}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 rounded-md border border-border/80 bg-muted/20 p-3.5 text-xs">
                <div>
                  <span className="font-semibold text-muted-foreground">
                    {copy.signsLabel} :{' '}
                  </span>
                  <span className="text-foreground">
                    {selectedElement.signs[locale]}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-primary">
                    {copy.benefitLabel} :{' '}
                  </span>
                  <span className="text-foreground">
                    {selectedElement.benefit[locale]}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-destructive">
                    {copy.penaltyLabel} :{' '}
                  </span>
                  <span className="text-foreground">
                    {selectedElement.penalty[locale]}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detection & Places of Power Guide */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Compass className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.detectionTitle}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground">
            <p className="text-foreground">{copy.detectionMagic}</p>
            <Separator />
            <p>{copy.detectionMundane}</p>
            <Separator />
            <p>{copy.detectionPlaces}</p>
            <Separator />
            <p className="text-amber-500">{copy.elementalsWarning}</p>
          </CardContent>
        </Card>
      </div>

      {/* Complete 4 Elements Reference Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.allElementsTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{copy.elementLabel}</TableHead>
                <TableHead>{copy.signsLabel}</TableHead>
                <TableHead>{copy.benefitLabel}</TableHead>
                <TableHead>{copy.penaltyLabel}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LEY_ELEMENTS.map((el) => (
                <TableRow key={el.id}>
                  <TableCell className="align-top text-xs font-semibold">
                    {el.name[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs text-muted-foreground">
                    {el.signs[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs">
                    {el.benefit[locale]}
                  </TableCell>
                  <TableCell className="align-top text-xs text-muted-foreground">
                    {el.penalty[locale]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
