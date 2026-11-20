import { useRef, useState } from 'react';
import {
  CheckCircle2,
  Dices,
  Download,
  FileDown,
  Loader2,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { getCharacterGeneratorCopy } from '../i18n';
import type {
  CharacterSheetState,
  GeneratorMode,
  ModuleLanguage,
  WizardStepId,
} from '../types';
import {
  WIZARD_STEP_ORDER,
  validateWizardStep,
} from '../utils/characterCalculations';

interface ModeAndProgressHeaderProps {
  lang: ModuleLanguage;
  state: CharacterSheetState;
  activeStep: WizardStepId;
  isExportingPdf: boolean;
  onSelectStep: (step: WizardStepId) => void;
  onChangeMode: (mode: GeneratorMode) => void;
  onRandomizeFull: () => void;
  onExportJson: () => void;
  onExportPdf: () => void;
  onImportJson: (raw: string) => void;
  onReset: () => void;
}

/**
 * Top control bar with Simple/Advanced mode switcher, JSON/PDF export & JSON import,
 * full random character generation, safe Dialog-based reset, and 7-step progress navigation.
 */
export function ModeAndProgressHeader({
  lang,
  state,
  activeStep,
  isExportingPdf,
  onSelectStep,
  onChangeMode,
  onRandomizeFull,
  onExportJson,
  onExportPdf,
  onImportJson,
  onReset,
}: ModeAndProgressHeaderProps) {
  const copy = getCharacterGeneratorCopy(lang);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isAdvanced = state.mode === 'advanced';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onImportJson(reader.result);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="@container flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Mode Switcher: Simple (Guided) vs Advanced (Freeform) */}
          <div className="flex items-start gap-3 sm:items-center">
            <Switch
              id="cg-mode-switch"
              checked={isAdvanced}
              onCheckedChange={(checked) =>
                onChangeMode(checked ? 'advanced' : 'simple')
              }
            />
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="cg-mode-switch"
                className="flex cursor-pointer items-center gap-2 text-sm font-semibold"
              >
                {isAdvanced ? (
                  <>
                    <SlidersHorizontal className="size-4 text-primary" />
                    <span>{copy.header.modeAdvanced}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 text-primary" />
                    <span>{copy.header.modeSimple}</span>
                  </>
                )}
              </Label>
              <span className="text-xs text-muted-foreground">
                {isAdvanced
                  ? copy.header.modeAdvancedHint
                  : copy.header.modeSimpleHint}
              </span>
            </div>
          </div>

          {/* Utility Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onRandomizeFull}
            >
              <Dices data-icon="inline-start" />
              <span>{copy.header.randomFull}</span>
            </Button>

            <Input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="sr-only"
              aria-label={copy.header.importJson}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload data-icon="inline-start" />
              <span>{copy.header.importJson}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onExportJson}
            >
              <Download data-icon="inline-start" />
              <span>{copy.header.exportJson}</span>
            </Button>

            <Button
              type="button"
              variant="default"
              size="sm"
              disabled={isExportingPdf}
              onClick={onExportPdf}
            >
              {isExportingPdf ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <FileDown data-icon="inline-start" />
              )}
              <span>
                {isExportingPdf
                  ? copy.summary.exportingPdfBtn
                  : copy.summary.exportPdfBtn}
              </span>
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => setResetDialogOpen(true)}
            >
              <RotateCcw data-icon="inline-start" />
              <span>{copy.header.resetBtn}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 7-Step Stepper Strip */}
      <nav
        aria-label={copy.header.moduleTag}
        className="grid grid-cols-1 gap-2 @sm:grid-cols-2 @xl:grid-cols-4 @5xl:grid-cols-7"
      >
        {WIZARD_STEP_ORDER.map((stepId, index) => {
          const meta = copy.steps[stepId];
          const isCurrent = activeStep === stepId;
          const isCompleted =
            stepId !== 'summary' &&
            validateWizardStep(stepId, state, lang).valid;

          return (
            <Button
              key={stepId}
              type="button"
              variant={isCurrent ? 'default' : 'outline'}
              size="sm"
              title={`${index + 1}. ${meta.shortLabel} — ${meta.description}`}
              onClick={() => onSelectStep(stepId)}
              className="h-full w-full min-w-0 flex-col items-start justify-start gap-1 overflow-hidden whitespace-normal px-3 py-2.5 text-left"
            >
              <div className="flex w-full min-w-0 items-center justify-between gap-1.5 text-xs font-semibold">
                <span className="truncate">
                  {index + 1}. {meta.shortLabel}
                </span>
                {isCompleted && (
                  <CheckCircle2
                    className={`size-3.5 shrink-0 ${
                      isCurrent ? 'text-primary-foreground' : 'text-emerald-500'
                    }`}
                  />
                )}
              </div>
              <span
                className={`w-full min-w-0 whitespace-normal break-words text-[11px] leading-snug font-normal ${
                  isCurrent
                    ? 'text-primary-foreground/85'
                    : 'text-muted-foreground'
                }`}
              >
                {meta.description}
              </span>
            </Button>
          );
        })}
      </nav>

      {/* Reset Confirmation Dialog (Never native window.confirm) */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{copy.header.resetDialogTitle}</DialogTitle>
            <DialogDescription>{copy.header.resetDialogBody}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setResetDialogOpen(false)}
            >
              {copy.header.cancel}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                setResetDialogOpen(false);
                onReset();
              }}
            >
              {copy.header.resetConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
