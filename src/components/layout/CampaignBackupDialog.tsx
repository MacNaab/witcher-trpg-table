import { useEffect, useRef, useState } from 'react';
import {
  Archive,
  CheckCircle2,
  Download,
  FileJson,
  Upload,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/src/contexts/I18nContext';
import {
  applyCampaignBackup,
  collectLocalCampaignBackup,
  downloadCampaignBackupFile,
  parseCampaignBackupJson,
  type CampaignBackupPayload,
  type CampaignBackupSummary,
} from '@/src/utils/campaignBackup';

interface CampaignBackupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestored: () => void;
}

function SummaryGrid({
  summary,
}: {
  summary: CampaignBackupSummary;
}) {
  const { t } = useI18n();
  const s = t.backup.stats;

  const rows: Array<{ label: string; value: string | number }> = [
    { label: s.hubPcs, value: summary.hubPcs },
    { label: s.hubGroups, value: summary.hubGroups },
    {
      label: s.hubNpcsMonsters,
      value: summary.hubNpcs + summary.hubMonsters,
    },
    { label: s.combatSessions, value: summary.combatSessions },
    { label: s.simSessions, value: summary.simSessions },
    { label: s.urbanEntries, value: summary.urbanEntries },
    { label: s.travelRoutes, value: summary.travelRoutes },
    { label: s.rollerHistories, value: summary.rollerHistories },
    { label: s.chronicleCampaigns, value: summary.chronicleCampaigns },
    { label: s.chronicleEvents, value: summary.chronicleEvents },
    { label: s.investigationsCount, value: summary.investigationsCount },
    { label: s.estatesCount, value: summary.estatesCount },
    { label: s.demonsCount, value: summary.demonsCount },
    {
      label: s.chargenDraft,
      value: summary.hasCharGenDraft ? s.yes : s.no,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-0.5 rounded-md border border-border/70 bg-muted/30 px-2.5 py-1.5"
        >
          <span className="truncate text-[11px] text-muted-foreground">
            {row.label}
          </span>
          <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Dialog for exporting and restoring all `witcher-gm-*` localStorage campaign data
 * in a single JSON file, with pre-restore summary preview and replace/merge options.
 */
export function CampaignBackupDialog({
  open,
  onOpenChange,
  onRestored,
}: CampaignBackupDialogProps) {
  const { t } = useI18n();
  const b = t.backup;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [currentSummary, setCurrentSummary] = useState<CampaignBackupSummary>(
    () => collectLocalCampaignBackup().summary
  );
  const [stagedFile, setStagedFile] = useState<{
    fileName: string;
    payload: CampaignBackupPayload;
    summary: CampaignBackupSummary;
  } | null>(null);
  const [restoreMode, setRestoreMode] = useState<'replace' | 'merge'>('replace');
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStagedFile(null);
      setImportError(null);
      return;
    }
    setCurrentSummary(collectLocalCampaignBackup().summary);
  }, [open]);

  const handleExport = () => {
    const { payload } = collectLocalCampaignBackup();
    downloadCampaignBackupFile(payload);
    toast.success(b.exportedToast);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = parseCampaignBackupJson(text);
      if (!parsed) {
        setStagedFile(null);
        setImportError(b.invalidFileError);
        return;
      }
      setImportError(null);
      setStagedFile({
        fileName: file.name,
        payload: parsed.payload,
        summary: parsed.summary,
      });
    } catch {
      setStagedFile(null);
      setImportError(b.invalidFileError);
    }
  };

  const handleConfirmRestore = () => {
    if (!stagedFile) return;
    applyCampaignBackup(stagedFile.payload, restoreMode);
    setCurrentSummary(collectLocalCampaignBackup().summary);
    setStagedFile(null);
    setImportError(null);
    toast.success(b.restoredToast);
    onRestored();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="size-4 text-primary" aria-hidden="true" />
            <span>{b.title}</span>
          </DialogTitle>
          <DialogDescription>{b.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 sm:max-h-[68dvh] sm:overflow-y-auto sm:pr-1">
          {/* Current Local Campaign Export */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {b.currentSectionTitle}
              </span>
              <Button
                type="button"
                size="sm"
                onClick={handleExport}
              >
                <Download data-icon="inline-start" />
                <span>{b.exportBtn}</span>
              </Button>
            </div>

            {currentSummary.totalKeys === 0 ? (
              <p className="text-xs text-muted-foreground">{b.emptyState}</p>
            ) : (
              <SummaryGrid summary={currentSummary} />
            )}
          </div>

          <Separator />

          {/* Import & Preview */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {b.importSectionTitle}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="sr-only"
                aria-label={b.importSelectFileBtn}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload data-icon="inline-start" />
                <span>{b.importSelectFileBtn}</span>
              </Button>
            </div>

            {importError && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {importError}
              </p>
            )}

            {stagedFile && (
              <div className="flex flex-col gap-3 rounded-md border border-primary/35 bg-primary/5 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileJson className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="truncate font-mono text-xs font-medium text-foreground">
                      {stagedFile.fileName}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setStagedFile(null)}
                    aria-label={b.cancelFileBtn}
                    title={b.cancelFileBtn}
                  >
                    <X className="size-3.5" aria-hidden="true" />
                  </Button>
                </div>

                <SummaryGrid summary={stagedFile.summary} />

                <div className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setRestoreMode('replace')}
                    className={`flex flex-col items-start gap-0.5 rounded-md border p-2.5 text-left transition-colors ${
                      restoreMode === 'replace'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:bg-muted/40'
                    }`}
                  >
                    <span className="text-xs font-semibold text-foreground">
                      {b.modeReplaceLabel}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {b.modeReplaceHint}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRestoreMode('merge')}
                    className={`flex flex-col items-start gap-0.5 rounded-md border p-2.5 text-left transition-colors ${
                      restoreMode === 'merge'
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:bg-muted/40'
                    }`}
                  >
                    <span className="text-xs font-semibold text-foreground">
                      {b.modeMergeLabel}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {b.modeMergeHint}
                    </span>
                  </button>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleConfirmRestore}
                  >
                    <CheckCircle2 data-icon="inline-start" />
                    <span>{b.confirmRestoreBtn}</span>
                  </Button>
                </div>
              </div>
            )}

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {b.indexedDbNotice}
            </p>
          </div>
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}
