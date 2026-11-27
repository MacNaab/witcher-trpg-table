import { Shield, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ESTATE_UPGRADES } from '../data/estateUpgradesData';
import type { EstateCopy } from '../i18n';
import type { NobleEstate } from '../types';
import { computeEstateDerivedStats } from '../utils/estateStorage';

interface EstateOverviewSectionProps {
  estate: NobleEstate;
  locale: 'fr' | 'en';
  copy: EstateCopy['overview'];
  onChangeEstate: (patch: Partial<NobleEstate>) => void;
}

export function EstateOverviewSection({
  estate,
  locale,
  copy,
  onChangeEstate,
}: EstateOverviewSectionProps) {
  const derived = computeEstateDerivedStats(estate);
  const upgradeMap = new Map(ESTATE_UPGRADES.map((u) => [u.id, u]));

  const activeSpecialists = estate.installedUpgrades
    .map((u) => upgradeMap.get(u.upgradeId)?.staffGranted?.[locale])
    .filter((v): v is string => Boolean(v));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Identity & Floorplan */}
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {copy.identityCardTitle}
          </CardTitle>
          <CardDescription className="text-xs">
            {copy.visitRuleTitle} : {copy.visitRuleBody}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-name">{copy.estateNameLabel}</Label>
              <Input
                id="est-name"
                value={estate.name}
                onChange={(e) => onChangeEstate({ name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-noble">{copy.nobleNameLabel}</Label>
              <Input
                id="est-noble"
                value={estate.nobleName}
                onChange={(e) => onChangeEstate({ nobleName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-region">{copy.regionLabel}</Label>
              <Input
                id="est-region"
                value={estate.region}
                onChange={(e) => onChangeEstate({ region: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="est-domain">{copy.domainLevelLabel}</Label>
              <Input
                id="est-domain"
                type="number"
                min={0}
                max={15}
                value={estate.domainLevel}
                onChange={(e) =>
                  onChangeEstate({
                    domainLevel: Math.max(
                      0,
                      Math.min(15, parseInt(e.target.value, 10) || 0)
                    ),
                  })
                }
              />
              <span className="text-[11px] text-muted-foreground">
                {copy.domainLevelHint}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="est-plan">{copy.floorplanLabel}</Label>
            <Textarea
              id="est-plan"
              rows={5}
              placeholder={copy.floorplanPlaceholder}
              value={estate.floorplanNotes}
              onChange={(e) => onChangeEstate({ floorplanNotes: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Staff + Security */}
      <div className="flex flex-col gap-6 lg:col-span-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Users className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.staffCardTitle}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-xs">
            <div>
              <p className="font-semibold text-foreground">
                {copy.majordomeRole}
              </p>
              <p className="text-muted-foreground">{copy.majordomeDesc}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold text-foreground tabular-nums">
                {copy.servantsRole(derived.servantsCount)}
              </p>
              <p className="text-muted-foreground">{copy.servantsDesc}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold text-foreground tabular-nums">
                {copy.guardsRole(derived.guardsCount)}
              </p>
              <p className="text-muted-foreground">{copy.guardsDesc}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-foreground">
                {copy.specialistsLabel}
              </p>
              {activeSpecialists.length === 0 ? (
                <p className="text-muted-foreground">{copy.noSpecialists}</p>
              ) : (
                <ul className="flex flex-col gap-1 text-muted-foreground">
                  {activeSpecialists.map((spec, idx) => (
                    <li key={`${spec}-${idx}`}>· {spec}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Shield className="size-4 text-primary" aria-hidden="true" />
              <span>{copy.securityCardTitle}</span>
            </CardTitle>
            <CardDescription className="font-mono text-xs tabular-nums">
              {copy.slotsUsedLabel(derived.usedSlots, estate.domainLevel)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">
                {copy.doorLockDcLabel}
              </span>
              <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                SD {derived.doorLockDc}
              </span>
            </div>
            <Separator />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">
                  {copy.secretRoomsLabel}
                </span>
                <span className="font-mono font-semibold text-foreground tabular-nums">
                  {copy.secretRoomsValue(
                    derived.secretRooms,
                    derived.secretPassages
                  )}
                </span>
              </div>
              {derived.secretRooms > 0 && (
                <p className="text-[11px] text-muted-foreground">
                  {copy.secretRoomsDesc}
                </p>
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-0.5">
              <span className="text-muted-foreground">
                {copy.tortureRoomLabel}
              </span>
              <span
                className={
                  derived.hasTortureChamber
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground'
                }
              >
                {derived.hasTortureChamber
                  ? copy.tortureActive
                  : copy.tortureLocked}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
