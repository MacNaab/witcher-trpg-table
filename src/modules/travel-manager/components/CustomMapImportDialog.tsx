import { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus, Map, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { MAP_ACCENT_PRESETS } from '../data/mapsCatalog';
import { getTravelManagerCopy } from '../i18n';
import type {
  CustomMapFormPayload,
  ModuleLanguage,
  TravelMapAccentKey,
  TravelMapDefinition,
} from '../types';
import {
  readImageFileDimensions,
  revokeCustomMapObjectUrl,
  sanitizeMapSourceUrl,
} from '../utils/customMapsStorage';

interface CustomMapImportDialogProps {
  open: boolean;
  editingMap: TravelMapDefinition | null;
  lang: ModuleLanguage;
  onClose: () => void;
  onSubmit: (payload: CustomMapFormPayload) => Promise<void>;
}

const ACCENT_KEYS = Object.keys(MAP_ACCENT_PRESETS) as TravelMapAccentKey[];

/**
 * Shadcn Dialog allowing the GM to import a custom map image from disk
 * (with automatic pixel-dimension detection, description, scale, creator, and card accent)
 * or edit an existing imported map.
 */
export function CustomMapImportDialog({
  open,
  editingMap,
  lang,
  onClose,
  onSubmit,
}: CustomMapImportDialogProps) {
  const copy = getTravelManagerCopy(lang);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [regionTag, setRegionTag] = useState('');
  const [scaleHint, setScaleHint] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorSourceUrl, setCreatorSourceUrl] = useState('');
  const [scaleKmInput, setScaleKmInput] = useState('1000');
  const [accentKey, setAccentKey] = useState<TravelMapAccentKey>('violet');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectedDims, setDetectedDims] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Hydrate form fields whenever dialog opens or switches between create/edit targets
  useEffect(() => {
    if (!open) return;

    if (editingMap) {
      setName(editingMap.name[lang]);
      setSubtitle(editingMap.subtitle[lang]);
      setDescription(editingMap.description[lang]);
      setRegionTag(editingMap.regionTag[lang]);
      setScaleHint(editingMap.scaleHint[lang]);
      setCreatorName(editingMap.creatorName);
      setCreatorSourceUrl(editingMap.creatorSourceUrl ?? '');
      setScaleKmInput(String(editingMap.defaultScaleKmPerWidth ?? 1000));
      setAccentKey(editingMap.accentKey ?? 'violet');
      setSelectedFile(null);
      setPreviewUrl(editingMap.imageSrc ?? null);
      setDetectedDims(editingMap.naturalDimensions ?? null);
    } else {
      setName('');
      setSubtitle('');
      setDescription('');
      setRegionTag('');
      setScaleHint('');
      setCreatorName('');
      setCreatorSourceUrl('');
      setScaleKmInput('1000');
      setAccentKey('violet');
      setSelectedFile(null);
      setPreviewUrl(null);
      setDetectedDims(null);
    }
    setIsDragging(false);
    setIsSaving(false);
  }, [editingMap, lang, open]);

  // Clean up locally created blob preview URLs (never revoke the active saved map URL)
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== editingMap?.imageSrc) {
        revokeCustomMapObjectUrl(previewUrl);
      }
    };
  }, [editingMap?.imageSrc, previewUrl]);

  const handleFileSelected = async (file: File | undefined) => {
    if (!file) return;
    try {
      const dims = await readImageFileDimensions(file);
      const nextPreviewUrl = URL.createObjectURL(file);

      if (previewUrl && previewUrl !== editingMap?.imageSrc) {
        revokeCustomMapObjectUrl(previewUrl);
      }

      setSelectedFile(file);
      setPreviewUrl(nextPreviewUrl);
      setDetectedDims(dims);

      // Conveniently pre-fill map name from filename when still empty
      if (!name.trim()) {
        const baseName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[_-]+/g, ' ')
          .trim();
        if (baseName) {
          setName(baseName.charAt(0).toUpperCase() + baseName.slice(1));
        }
      }
    } catch {
      toast.error(copy.customMapDialog.validationInvalidImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error(copy.customMapDialog.validationNameRequired);
      return;
    }
    if (!editingMap && !selectedFile) {
      toast.error(copy.customMapDialog.validationImageRequired);
      return;
    }
    if (creatorSourceUrl.trim() && !sanitizeMapSourceUrl(creatorSourceUrl)) {
      toast.error(copy.customMapDialog.validationInvalidUrl);
      return;
    }

    const parsedKm = Number.parseFloat(scaleKmInput.replace(',', '.'));
    const defaultScaleKmPerWidth =
      Number.isFinite(parsedKm) && parsedKm > 0 ? Math.round(parsedKm) : 1000;

    setIsSaving(true);
    try {
      await onSubmit({
        id: editingMap?.id,
        name: name.trim(),
        subtitle: subtitle.trim(),
        description: description.trim(),
        regionTag: regionTag.trim(),
        scaleHint: scaleHint.trim(),
        creatorName: creatorName.trim(),
        creatorSourceUrl: creatorSourceUrl.trim(),
        defaultScaleKmPerWidth,
        accentKey,
        imageFile: selectedFile,
      });
      toast.success(
        editingMap
          ? copy.customMapDialog.updatedToast
          : copy.customMapDialog.createdToast
      );
      onClose();
    } catch {
      toast.error(copy.customMapDialog.validationStorageError);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isSaving) onClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Map className="size-4 text-primary" />
            <span>
              {editingMap
                ? copy.customMapDialog.editTitle
                : copy.customMapDialog.createTitle}
            </span>
          </DialogTitle>
          <DialogDescription>
            {copy.customMapDialog.subtitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ScrollArea className="max-h-[65vh] pr-3">
            <div className="flex flex-col gap-4 py-1">
              {/* Image Picker / Dropzone */}
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Label>{copy.customMapDialog.imageLabel}</Label>
                  <span className="text-[11px] text-muted-foreground">
                    {editingMap
                      ? copy.customMapDialog.imageReplaceHint
                      : copy.customMapDialog.imageRequiredHint}
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    void handleFileSelected(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                  className="sr-only"
                />

                {previewUrl ? (
                  <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/20 p-3 sm:flex-row sm:items-center">
                    <div className="h-28 w-full shrink-0 overflow-hidden rounded-md border border-border bg-stone-950 sm:w-44">
                      <img
                        src={previewUrl}
                        alt={name || copy.customMapDialog.imageLabel}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      {detectedDims && (
                        <div className="text-xs text-muted-foreground">
                          {copy.customMapDialog.dimensionsLabel}:{' '}
                          <span className="font-mono font-semibold text-foreground">
                            {detectedDims.width} × {detectedDims.height} px
                          </span>
                        </div>
                      )}
                      {selectedFile && (
                        <div className="truncate font-mono text-[11px] text-muted-foreground">
                          {selectedFile.name}
                        </div>
                      )}
                      <div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload data-icon="inline-start" className="size-3.5" />
                          <span>{copy.customMapDialog.changeImageBtn}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      void handleFileSelected(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      isDragging
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/35'
                    }`}
                  >
                    <div className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-primary">
                      <ImagePlus className="size-5" aria-hidden="true" />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {copy.customMapDialog.dropzoneTitle}
                    </div>
                    <p className="max-w-md text-xs text-muted-foreground">
                      {copy.customMapDialog.dropzoneSubtitle}
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Map Metadata */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-name">
                    {copy.customMapDialog.nameLabel} *
                  </Label>
                  <Input
                    id="tm-custom-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.customMapDialog.namePlaceholder}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-tag">
                    {copy.customMapDialog.regionTagLabel}
                  </Label>
                  <Input
                    id="tm-custom-tag"
                    value={regionTag}
                    onChange={(e) => setRegionTag(e.target.value)}
                    placeholder={copy.customMapDialog.regionTagPlaceholder}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tm-custom-subtitle">
                  {copy.customMapDialog.subtitleLabel}
                </Label>
                <Input
                  id="tm-custom-subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder={copy.customMapDialog.subtitlePlaceholder}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tm-custom-description">
                  {copy.customMapDialog.descriptionLabel}
                </Label>
                <Textarea
                  id="tm-custom-description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={copy.customMapDialog.descriptionPlaceholder}
                />
              </div>

              {/* Scale & Attribution */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-scale-km">
                    {copy.customMapDialog.scaleKmLabel}
                  </Label>
                  <Input
                    id="tm-custom-scale-km"
                    type="number"
                    min={1}
                    step="any"
                    value={scaleKmInput}
                    onChange={(e) => setScaleKmInput(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-scale-hint">
                    {copy.customMapDialog.scaleHintLabel}
                  </Label>
                  <Input
                    id="tm-custom-scale-hint"
                    value={scaleHint}
                    onChange={(e) => setScaleHint(e.target.value)}
                    placeholder={copy.customMapDialog.scaleHintPlaceholder}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-creator">
                    {copy.customMapDialog.creatorLabel}
                  </Label>
                  <Input
                    id="tm-custom-creator"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder={copy.customMapDialog.creatorPlaceholder}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="tm-custom-source-url">
                    {copy.customMapDialog.sourceUrlLabel}
                  </Label>
                  <Input
                    id="tm-custom-source-url"
                    type="url"
                    value={creatorSourceUrl}
                    onChange={(e) => setCreatorSourceUrl(e.target.value)}
                    placeholder={copy.customMapDialog.sourceUrlPlaceholder}
                  />
                </div>
              </div>

              {/* Regional Accent Selector */}
              <div className="flex flex-col gap-2">
                <Label>{copy.customMapDialog.accentLabel}</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {ACCENT_KEYS.map((key) => {
                    const preset = MAP_ACCENT_PRESETS[key];
                    const isActive = accentKey === key;
                    return (
                      <Button
                        key={key}
                        type="button"
                        size="sm"
                        variant={isActive ? 'secondary' : 'outline'}
                        onClick={() => setAccentKey(key)}
                        className={`gap-2 text-xs ${
                          isActive ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`size-3 rounded-full ${preset.accent.topBar}`}
                        />
                        <span>{preset.label[lang]}</span>
                        {isActive && <Check className="size-3 text-primary" />}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="border-t border-border pt-3">
            <DialogClose
              render={
                <Button type="button" variant="outline" disabled={isSaving}>
                  {copy.customMapDialog.cancelBtn}
                </Button>
              }
            />
            <Button type="submit" disabled={isSaving}>
              <Upload data-icon="inline-start" className="size-4" />
              <span>
                {isSaving
                  ? copy.customMapDialog.savingBtn
                  : editingMap
                    ? copy.customMapDialog.editSubmitBtn
                    : copy.customMapDialog.createSubmitBtn}
              </span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
