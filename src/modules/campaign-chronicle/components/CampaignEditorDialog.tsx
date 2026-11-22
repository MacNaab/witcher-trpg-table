import { useEffect, useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getCampaignChronicleCopy } from '../i18n';
import type { CampaignRecord, CampaignStatus, ModuleLanguage } from '../types';

export interface CampaignFormValues {
  name: string;
  subtitle: string;
  region: string;
  status: CampaignStatus;
  currentSessionNumber: number;
  description: string;
}

interface CampaignEditorDialogProps {
  lang: ModuleLanguage;
  open: boolean;
  editingCampaign: CampaignRecord | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CampaignFormValues) => void;
}

const CAMPAIGN_STATUSES: readonly CampaignStatus[] = [
  'active',
  'paused',
  'completed',
];

/**
 * Shadcn Dialog for creating or editing a campaign chronicle container.
 */
export function CampaignEditorDialog({
  lang,
  open,
  editingCampaign,
  onOpenChange,
  onSubmit,
}: CampaignEditorDialogProps) {
  const copy = getCampaignChronicleCopy(lang);
  const d = copy.campaignDialog;

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState<CampaignStatus>('active');
  const [currentSessionNumber, setCurrentSessionNumber] = useState(1);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (editingCampaign) {
      setName(editingCampaign.name);
      setSubtitle(editingCampaign.subtitle);
      setRegion(editingCampaign.region);
      setStatus(editingCampaign.status);
      setCurrentSessionNumber(editingCampaign.currentSessionNumber);
      setDescription(editingCampaign.description);
    } else {
      setName('');
      setSubtitle('');
      setRegion('');
      setStatus('active');
      setCurrentSessionNumber(1);
      setDescription('');
    }
    setError(null);
  }, [editingCampaign, open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError(d.nameRequiredError);
      return;
    }

    onSubmit({
      name: trimmedName,
      subtitle: subtitle.trim(),
      region: region.trim(),
      status,
      currentSessionNumber: Math.max(0, Math.trunc(currentSessionNumber || 0)),
      description: description.trim(),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingCampaign ? d.editTitle : d.createTitle}
          </DialogTitle>
          <DialogDescription>{d.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chronicle-camp-name">{d.nameLabel}</Label>
            <Input
              id="chronicle-camp-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(null);
              }}
              placeholder={d.namePlaceholder}
            />
            {error && (
              <p className="text-xs font-medium text-destructive">{error}</p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="chronicle-camp-subtitle">{d.subtitleLabel}</Label>
              <Input
                id="chronicle-camp-subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder={d.subtitlePlaceholder}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="chronicle-camp-region">{d.regionLabel}</Label>
              <Input
                id="chronicle-camp-region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder={d.regionPlaceholder}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="chronicle-camp-status">{d.statusLabel}</Label>
              <Select
                value={status}
                onValueChange={(val) => {
                  if (val) setStatus(val as CampaignStatus);
                }}
              >
                <SelectTrigger id="chronicle-camp-status" className="w-full">
                  <SelectValue>{copy.campaignStatus[status]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CAMPAIGN_STATUSES.map((st) => (
                    <SelectItem key={st} value={st}>
                      {copy.campaignStatus[st]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="chronicle-camp-session">{d.sessionLabel}</Label>
              <Input
                id="chronicle-camp-session"
                type="number"
                min={0}
                max={999}
                value={currentSessionNumber}
                onChange={(e) =>
                  setCurrentSessionNumber(Number(e.target.value) || 0)
                }
                className="font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="chronicle-camp-synopsis">{d.synopsisLabel}</Label>
            <Textarea
              id="chronicle-camp-synopsis"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={d.synopsisPlaceholder}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {d.cancelBtn}
            </Button>
            <Button type="submit">
              {editingCampaign ? d.saveBtn : d.createBtn}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
