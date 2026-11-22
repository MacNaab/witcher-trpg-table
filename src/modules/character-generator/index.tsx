import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getModuleDefinition } from '@/src/config/modules';
import { useI18n } from '@/src/contexts/I18nContext';
import type { ModuleEntryProps } from '@/src/types/navigation';
import {
  createSavedPcFromCharacterSheet,
  loadCombatHubState,
  saveCombatHubState,
} from '@/src/modules/combat-tracker/utils/hubStorage';
import { CharacterSummarySheet } from './components/CharacterSummarySheet';
import { ModeAndProgressHeader } from './components/ModeAndProgressHeader';
import { StepGearCard } from './components/StepGearCard';
import { StepGeneralSkillsCard } from './components/StepGeneralSkillsCard';
import { StepIdentityCard } from './components/StepIdentityCard';
import { StepLifepathCard } from './components/StepLifepathCard';
import { StepProfessionSkillsCard } from './components/StepProfessionSkillsCard';
import { StepStatsCard } from './components/StepStatsCard';
import { getCharacterGeneratorCopy } from './i18n';
import type {
  CharacterProfessionId,
  CharacterSheetState,
  GeneratorMode,
  ModuleLanguage,
  RaceId,
  WizardStepId,
} from './types';
import {
  WIZARD_STEP_ORDER,
  applyProfessionChange,
  applyRaceChange,
  createInitialCharacterState,
  generateFullRandomCharacter,
  parseImportedCharacterJson,
  serializeCharacterJson,
  validateWizardStep,
} from './utils/characterCalculations';
import { downloadFilledCharacterPdf } from './utils/pdfExport';

const CHARGEN_DRAFT_STORAGE_KEY = 'witcher-gm-chargen-draft-v1';

interface StoredCharacterDraft {
  version: 1;
  activeStep: WizardStepId;
  state: CharacterSheetState;
}

function loadCharacterDraft(): {
  state: CharacterSheetState;
  activeStep: WizardStepId;
} {
  if (typeof window === 'undefined') {
    return {
      state: createInitialCharacterState('simple'),
      activeStep: 'identity',
    };
  }
  try {
    const raw = window.localStorage.getItem(CHARGEN_DRAFT_STORAGE_KEY);
    if (!raw) {
      return {
        state: createInitialCharacterState('simple'),
        activeStep: 'identity',
      };
    }
    const parsed = JSON.parse(raw) as Partial<StoredCharacterDraft>;
    const hydrated = parsed?.state
      ? parseImportedCharacterJson(JSON.stringify(parsed.state))
      : null;
    if (!hydrated) {
      return {
        state: createInitialCharacterState('simple'),
        activeStep: 'identity',
      };
    }
    const validStep =
      parsed.activeStep && WIZARD_STEP_ORDER.includes(parsed.activeStep)
        ? parsed.activeStep
        : 'identity';
    return { state: hydrated, activeStep: validStep };
  } catch {
    return {
      state: createInitialCharacterState('simple'),
      activeStep: 'identity',
    };
  }
}

/**
 * Unified Witcher TRPG Character Sheet Generator (Guided & Advanced/Freeform modes).
 * Connected to unified Compendiums for Magic, Equipment/Formulae, and Talents.
 */
export default function CharacterGeneratorModule({
  onNavigateOverview,
  onNavigateModule,
}: ModuleEntryProps) {
  const { locale, t } = useI18n();
  const lang: ModuleLanguage = locale === 'fr' ? 'fr' : 'en';
  const definition = getModuleDefinition('character-generator');
  const moduleCopy = t.modules['character-generator'];
  const copy = getCharacterGeneratorCopy(lang);
  const Icon = definition.icon;

  const [initialDraft] = useState(() => loadCharacterDraft());
  const [state, setState] = useState<CharacterSheetState>(initialDraft.state);
  const [activeStep, setActiveStep] = useState<WizardStepId>(
    initialDraft.activeStep
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const lastHubPcIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const payload: StoredCharacterDraft = {
        version: 1,
        activeStep,
        state,
      };
      window.localStorage.setItem(
        CHARGEN_DRAFT_STORAGE_KEY,
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [activeStep, state]);

  const currentStepIndex = WIZARD_STEP_ORDER.indexOf(activeStep);

  const handleSelectStep = (targetStep: WizardStepId) => {
    setValidationErrors([]);
    setActiveStep(targetStep);
  };

  const handleNext = () => {
    const check = validateWizardStep(activeStep, state, lang);
    if (!check.valid) {
      setValidationErrors(check.errors);
      toast.error(check.errors[0]);
      return;
    }
    setValidationErrors([]);
    const nextIdx = Math.min(
      WIZARD_STEP_ORDER.length - 1,
      currentStepIndex + 1
    );
    setActiveStep(WIZARD_STEP_ORDER[nextIdx]);
  };

  const handlePrevious = () => {
    setValidationErrors([]);
    const prevIdx = Math.max(0, currentStepIndex - 1);
    setActiveStep(WIZARD_STEP_ORDER[prevIdx]);
  };

  const handleChangeMode = (nextMode: GeneratorMode) => {
    setValidationErrors([]);
    setState((prev) => ({
      ...prev,
      mode: nextMode,
      ignoreStatBudget: nextMode === 'advanced',
      allowStatCap13: nextMode === 'advanced',
      ignoreSkillBudgets: nextMode === 'advanced',
      allowSkillCap13: nextMode === 'advanced',
      includeUnofficialMagic:
        nextMode === 'advanced' ? true : prev.includeUnofficialMagic,
    }));
  };

  const handleRandomizeFull = () => {
    const generated = generateFullRandomCharacter(state.mode, lang);
    lastHubPcIdRef.current = null;
    setState(generated);
    setValidationErrors([]);
    setActiveStep('summary');
    toast.success(copy.header.quickGeneratedToast);
  };

  const handleExportJson = () => {
    const json = serializeCharacterJson(state);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const slug = (state.characterName || 'witcher-character')
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${slug || 'witcher-character'}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      await downloadFilledCharacterPdf(state, lang);
      toast.success(copy.summary.exportedPdfToast);
    } catch {
      toast.error(copy.summary.exportPdfErrorToast);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleSendToGmHub = () => {
    const savedPc = createSavedPcFromCharacterSheet(state, lang);
    const hub = loadCombatHubState();
    const existingId = lastHubPcIdRef.current;
    const alreadyInHub =
      existingId !== null && hub.characters.some((c) => c.id === existingId);

    const nextPc = alreadyInHub ? { ...savedPc, id: existingId } : savedPc;
    lastHubPcIdRef.current = nextPc.id;

    saveCombatHubState({
      ...hub,
      characters: alreadyInHub
        ? hub.characters.map((c) => (c.id === existingId ? nextPc : c))
        : [nextPc, ...hub.characters],
    });

    toast.success(copy.summary.sentToHubToast(nextPc.name), {
      action: onNavigateModule
        ? {
            label: copy.summary.openGmHubBtn,
            onClick: () => onNavigateModule('combat-tracker', { tab: 'hub' }),
          }
        : undefined,
    });
  };

  const handleImportJson = (raw: string) => {
    const parsed = parseImportedCharacterJson(raw);
    if (!parsed) {
      toast.error(copy.header.importErrorToast);
      return;
    }
    lastHubPcIdRef.current = null;
    setState(parsed);
    setValidationErrors([]);
    toast.success(copy.header.importedToast);
  };

  const handleReset = () => {
    lastHubPcIdRef.current = null;
    setState(createInitialCharacterState(state.mode));
    setValidationErrors([]);
    setActiveStep('identity');
    toast.success(copy.header.resetToast);
  };

  return (
    <section
      aria-labelledby="module-heading-character-generator"
      className="mx-auto flex w-full max-w-6xl flex-col gap-6"
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
              <span className="font-mono tabular-nums">
                {copy.header.moduleTag}
              </span>
            </div>
            <h1
              id="module-heading-character-generator"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {moduleCopy.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {moduleCopy.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
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

      {/* Top Mode & Progress Bar */}
      <ModeAndProgressHeader
        lang={lang}
        state={state}
        activeStep={activeStep}
        isExportingPdf={isExportingPdf}
        onSelectStep={handleSelectStep}
        onChangeMode={handleChangeMode}
        onRandomizeFull={handleRandomizeFull}
        onExportJson={handleExportJson}
        onExportPdf={handleExportPdf}
        onImportJson={handleImportJson}
        onReset={handleReset}
      />

      {/* Inline Validation Alert Banner */}
      {validationErrors.length > 0 && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{copy.nav.validationTitle}</span>
            <ul className="list-disc pl-5 text-xs">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Active Step Content */}
      {activeStep === 'identity' && (
        <StepIdentityCard
          lang={lang}
          state={state}
          onUpdateFields={(patch) => {
            setValidationErrors([]);
            setState((prev) => ({ ...prev, ...patch }));
          }}
          onSelectRace={(raceId: RaceId) => {
            setValidationErrors([]);
            setState((prev) => applyRaceChange(prev, raceId));
          }}
          onSelectProfession={(profId: CharacterProfessionId) => {
            setValidationErrors([]);
            setState((prev) => applyProfessionChange(prev, profId));
          }}
        />
      )}

      {activeStep === 'lifepath' && (
        <StepLifepathCard
          lang={lang}
          state={state}
          onUpdateState={(updater) => {
            setValidationErrors([]);
            setState(updater);
          }}
        />
      )}

      {activeStep === 'stats' && (
        <StepStatsCard
          lang={lang}
          state={state}
          onUpdateState={(updater) => {
            setValidationErrors([]);
            setState(updater);
          }}
        />
      )}

      {activeStep === 'professionSkills' && (
        <StepProfessionSkillsCard
          lang={lang}
          state={state}
          onUpdateState={(updater) => {
            setValidationErrors([]);
            setState(updater);
          }}
        />
      )}

      {activeStep === 'generalSkills' && (
        <StepGeneralSkillsCard
          lang={lang}
          state={state}
          onUpdateState={(updater) => {
            setValidationErrors([]);
            setState(updater);
          }}
        />
      )}

      {activeStep === 'gear' && (
        <StepGearCard
          lang={lang}
          state={state}
          onUpdateState={(updater) => {
            setValidationErrors([]);
            setState(updater);
          }}
        />
      )}

      {activeStep === 'summary' && (
        <CharacterSummarySheet
          lang={lang}
          state={state}
          isExportingPdf={isExportingPdf}
          onExportJson={handleExportJson}
          onExportPdf={handleExportPdf}
          onSendToHub={handleSendToGmHub}
        />
      )}

      {/* Bottom Wizard Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          disabled={currentStepIndex <= 0}
          onClick={handlePrevious}
        >
          <ArrowLeft data-icon="inline-start" />
          <span>{copy.nav.previous}</span>
        </Button>

        {activeStep !== 'summary' && (
          <Button type="button" onClick={handleNext}>
            <span>
              {activeStep === 'gear' ? copy.nav.finish : copy.nav.next}
            </span>
            {activeStep === 'gear' ? (
              <Check data-icon="inline-end" />
            ) : (
              <ArrowRight data-icon="inline-end" />
            )}
          </Button>
        )}
      </div>
    </section>
  );
}
