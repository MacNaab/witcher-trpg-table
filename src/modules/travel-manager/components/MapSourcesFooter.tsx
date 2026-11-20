import { ExternalLink, Layers, ScrollText } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  TECH_AND_INSPIRATION_CREDITS,
  TRAVEL_MAPS_CATALOG,
} from '../data/mapsCatalog';
import { getTravelManagerCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

interface MapSourcesFooterProps {
  lang: ModuleLanguage;
}

/**
 * Structured Attribution & Sources card preserving all community cartographer
 * credits and technical/UI inspirations from the legacy Travel Hub.
 */
export function MapSourcesFooter({ lang }: MapSourcesFooterProps) {
  const copy = getTravelManagerCopy(lang);

  return (
    <Card className="border-border bg-muted/15">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <ScrollText className="size-4 text-primary" aria-hidden="true" />
          <span>{copy.sources.title}</span>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {copy.sources.subtitle}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* Community Map Creators */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {copy.sources.creatorsHeading}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TRAVEL_MAPS_CATALOG.map((map) => (
              <a
                key={map.id}
                href={map.creatorSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 rounded-lg border border-border/80 bg-card px-3 py-2 text-xs transition-colors hover:border-primary/50 hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full ${map.accent.topBar}`}
                  />
                  <span className="truncate text-muted-foreground">
                    {copy.sources.mapPrefix}{' '}
                    <strong className="font-semibold text-foreground">
                      {map.name[lang]}
                    </strong>{' '}
                    {copy.sources.byWord}{' '}
                    <span className="font-medium text-primary">
                      {map.creatorName}
                    </span>
                  </span>
                </div>
                <ExternalLink
                  className="size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
