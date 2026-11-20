import { useEffect, useState } from 'react';
import { Clock, Copy, NotebookPen, Trash2 } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/src/contexts/I18nContext';

export const CAMPAIGN_NOTES_STORAGE_KEY = 'witcher-gm-notes-v1';

interface CampaignNotesData {
  title: string;
  content: string;
  updatedAt: string | null;
}

const DEFAULT_NOTES: CampaignNotesData = {
  title: '',
  content: '',
  updatedAt: null,
};

function loadCampaignNotes(): CampaignNotesData {
  if (typeof window === 'undefined') return DEFAULT_NOTES;
  try {
    const raw = window.localStorage.getItem(CAMPAIGN_NOTES_STORAGE_KEY);
    if (!raw) return DEFAULT_NOTES;
    const parsed = JSON.parse(raw) as Partial<CampaignNotesData>;
    if (!parsed || typeof parsed !== 'object') return DEFAULT_NOTES;
    return {
      title: typeof parsed.title === 'string' ? parsed.title : '',
      content: typeof parsed.content === 'string' ? parsed.content : '',
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return DEFAULT_NOTES;
  }
}

function saveCampaignNotes(data: CampaignNotesData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CAMPAIGN_NOTES_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

interface CampaignNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Persistent GM session scratchpad saved under `witcher-gm-notes-v1`
 * so all campaign notes are automatically included in JSON backups.
 */
export function CampaignNotesDialog({
  open,
  onOpenChange,
}: CampaignNotesDialogProps) {
  const { locale, t } = useI18n();
  const n = t.notes;

  const [notes, setNotes] = useState<CampaignNotesData>(() => loadCampaignNotes());
  const [confirmClear, setConfirmClear] = useState(false);

  // Sync from localStorage whenever opened (picks up JSON backup restores cleanly)
  useEffect(() => {
    if (open) {
      setNotes(loadCampaignNotes());
      setConfirmClear(false);
    }
  }, [open]);

  const updateNotes = (patch: Partial<CampaignNotesData>) => {
    setNotes((prev) => {
      const next: CampaignNotesData = {
        ...prev,
        ...patch,
        updatedAt: new Date().toISOString(),
      };
      saveCampaignNotes(next);
      return next;
    });
  };

  const handleInsertTimestamp = () => {
    const stamp = new Date().toLocaleTimeString(
      locale === 'fr' ? 'fr-FR' : 'en-US',
      { hour: '2-digit', minute: '2-digit' }
    );
    const prefix = notes.content.trim().length > 0 ? '\n' : '';
    updateNotes({ content: `${notes.content}${prefix}[${stamp}] ` });
  };

  const handleCopyNotes = async () => {
    const text = [notes.title.trim(), notes.content.trim()]
      .filter(Boolean)
      .join('\n\n');
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(n.copiedToast);
    } catch {
      // Clipboard restricted
    }
  };

  const handleClearNotes = () => {
    const cleared: CampaignNotesData = {
      title: '',
      content: '',
      updatedAt: null,
    };
    setNotes(cleared);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CAMPAIGN_NOTES_STORAGE_KEY);
    }
    setConfirmClear(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <NotebookPen className="size-4 text-primary" aria-hidden="true" />
            <span>{n.title}</span>
          </DialogTitle>
          <DialogDescription>{n.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="gm-notes-title">{n.sessionTitleLabel}</Label>
            <Input
              id="gm-notes-title"
              value={notes.title}
              onChange={(e) => updateNotes({ title: e.target.value })}
              placeholder={n.sessionTitlePlaceholder}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="gm-notes-content">{n.contentLabel}</Label>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={handleInsertTimestamp}
                className="gap-1 text-muted-foreground"
              >
                <Clock className="size-3" />
                <span>{n.insertTimestampBtn}</span>
              </Button>
            </div>
            <Textarea
              id="gm-notes-content"
              value={notes.content}
              onChange={(e) => updateNotes({ content: e.target.value })}
              placeholder={n.contentPlaceholder}
              rows={10}
              className="min-h-[220px] resize-y text-sm leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{n.savedHint}</span>
            <span className="font-mono tabular-nums">
              {n.charsCount(notes.content.length)}
            </span>
          </div>
        </div>

        <DialogFooter className="flex-wrap justify-between gap-2 sm:justify-between">
          <div className="flex items-center gap-2">
            {confirmClear ? (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleClearNotes}
                >
                  {n.clearConfirmBtn}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmClear(false)}
                >
                  {n.cancelClearBtn}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmClear(true)}
                disabled={!notes.title && !notes.content}
              >
                <Trash2 data-icon="inline-start" />
                <span>{n.clearBtn}</span>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopyNotes}
              disabled={!notes.title.trim() && !notes.content.trim()}
            >
              <Copy data-icon="inline-start" />
              <span>{n.copyBtn}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              {t.controls.close}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
