import { ArrowLeft, CheckCircle2, Code2, Layers } from 'lucide-react';
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleId } from '@/src/types/navigation';

interface CategoryWorkspaceShellProps {
  moduleId: Exclude<ModuleId, 'overview'>;
  onNavigateOverview: () => void;
}

/**
 * Reusable modular workspace shell rendered for each category until its
 * dedicated functional implementation is integrated individually.
 * Strictly composed from Shadcn UI primitives (Card, Button, Separator, Dialog).
 */
export function CategoryWorkspaceShell({
  moduleId,
  onNavigateOverview,
}: CategoryWorkspaceShellProps) {
  const { t } = useI18n();
  const definition = getModuleDefinition(moduleId);
  const copy = t.modules[moduleId];
  const Icon = definition.icon;

  return (
    <section
      aria-labelledby={`module-heading-${moduleId}`}
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      {/* Category Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{t.nav.groups[definition.group]}</span>
              <span aria-hidden="true">·</span>
              <span>{t.placeholder.statusLabel}</span>
            </div>
            <h1
              id={`module-heading-${moduleId}`}
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {copy.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy.description}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNavigateOverview}
          className="shrink-0 self-start"
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{t.controls.backToOverview}</span>
        </Button>
      </div>

      <Separator />

      {/* Main Placeholder Architecture Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Layers className="size-4 text-primary" aria-hidden="true" />
            <span>{t.placeholder.titleSuffix}</span>
          </CardTitle>
          <CardDescription className="leading-relaxed">
            {t.placeholder.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="font-sans text-sm font-semibold text-foreground">
              {t.placeholder.plannedScopeHeading}
            </h2>
            <ul className="grid gap-2.5 sm:grid-cols-1">
              {copy.plannedScope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              {t.placeholder.architectureNoteTitle}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t.placeholder.architectureNoteBody}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            src/modules/{moduleId}/index.tsx
          </span>

          <Dialog>
            <DialogTrigger
              render={
                <Button variant="secondary" size="sm">
                  <Code2 data-icon="inline-start" />
                  <span>{t.controls.moduleSpecs}</span>
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t.placeholder.specsDialogTitle}</DialogTitle>
                <DialogDescription>
                  {t.placeholder.specsDialogDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-2 text-sm">
                <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
                  <span className="text-muted-foreground">
                    {t.placeholder.modulePathLabel}
                  </span>
                  <span className="font-mono text-xs text-foreground">
                    src/modules/{moduleId}/index.tsx
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-border pb-2">
                  <span className="text-muted-foreground">
                    {t.placeholder.groupLabel}
                  </span>
                  <span className="text-foreground">
                    {t.nav.groups[definition.group]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    {t.placeholder.shortcutLabel}
                  </span>
                  <span className="font-mono text-xs text-foreground tabular-nums">
                    Alt + {definition.shortcut}
                  </span>
                </div>
              </div>

              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant="outline" size="sm">
                      {t.controls.close}
                    </Button>
                  }
                />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </section>
  );
}
