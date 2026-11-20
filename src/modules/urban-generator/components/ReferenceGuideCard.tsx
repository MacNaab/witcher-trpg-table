import { useState } from 'react';
import { BookMarked, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUrbanGeneratorCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

interface ReferenceGuideCardProps {
  lang: ModuleLanguage;
}

/**
 * Collapsible Game Master reference explaining the 4 settlement tiers
 * and 9 building archetypes used during urban generation.
 */
export function ReferenceGuideCard({ lang }: ReferenceGuideCardProps) {
  const copy = getUrbanGeneratorCopy(lang);
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="print:hidden">
      <Card>
        <CardHeader className="py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <CardTitle className="text-sm font-semibold">
                  {copy.guide.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {copy.guide.description}
                </CardDescription>
              </div>
            </div>

            <CollapsibleTrigger
              render={
                <Button type="button" variant="outline" size="sm">
                  <BookMarked data-icon="inline-start" />
                  <span>{copy.guide.toggleLabel}</span>
                  {open ? (
                    <ChevronUp data-icon="inline-end" />
                  ) : (
                    <ChevronDown data-icon="inline-end" />
                  )}
                </Button>
              }
            />
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="border-t border-border pt-4">
            <Tabs defaultValue="environments" className="w-full gap-4">
              <TabsList className="grid h-auto w-full grid-cols-2 p-1 sm:inline-flex sm:w-fit">
                <TabsTrigger value="environments" className="px-3 py-1.5 text-xs sm:text-sm">
                  {copy.guide.environmentsTab}
                </TabsTrigger>
                <TabsTrigger value="buildings" className="px-3 py-1.5 text-xs sm:text-sm">
                  {copy.guide.buildingsTab}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="environments">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {copy.guide.environments.map((env) => (
                    <div
                      key={env.id}
                      className="rounded-lg border border-border/80 bg-muted/30 p-3.5"
                    >
                      <h3 className="text-sm font-semibold text-foreground">
                        {env.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {env.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="buildings">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {copy.guide.buildings.map((bld) => (
                    <div
                      key={bld.id}
                      className="rounded-lg border border-border/80 bg-muted/30 p-3.5"
                    >
                      <h3 className="text-sm font-semibold text-foreground">
                        {bld.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {bld.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
