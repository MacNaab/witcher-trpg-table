import {
  BookOpen,
  BookOpenCheck,
  Columns2,
  Download,
  FileText,
  Link2,
  Link2Off,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { HomebrewStudioCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

export type WorkspaceLayoutMode = 'split' | 'editor' | 'preview';
export type PreviewSpreadMode = 'single' | 'spread';

interface WorkspaceControlsBarProps {
  lang: ModuleLanguage;
  copy: HomebrewStudioCopy;
  docTitle: string;
  themeBannerBg: string;
  totalPages: number;
  layoutMode: WorkspaceLayoutMode;
  onChangeLayoutMode: (mode: WorkspaceLayoutMode) => void;
  spreadMode: PreviewSpreadMode;
  onChangeSpreadMode: (mode: PreviewSpreadMode) => void;
  zoomMode: 'auto' | number;
  onChangeZoomMode: (zoom: 'auto' | number) => void;
  scrollSyncEnabled: boolean;
  onToggleScrollSync: () => void;
  syncedPageIndex: number;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
  isExportingPdf: boolean;
  onExportPdf: () => void;
}

/**
 * Workspace mode & preview controls strip built with Shadcn UI Tabs, Buttons, and Badges.
 * Adapts cleanly for both embedded workspace mode and total fullscreen mode.
 */
export function WorkspaceControlsBar({
  lang,
  copy,
  docTitle,
  themeBannerBg,
  totalPages,
  layoutMode,
  onChangeLayoutMode,
  spreadMode,
  onChangeSpreadMode,
  zoomMode,
  onChangeZoomMode,
  scrollSyncEnabled,
  onToggleScrollSync,
  syncedPageIndex,
  fullscreen,
  onToggleFullscreen,
  isExportingPdf,
  onExportPdf,
}: WorkspaceControlsBarProps) {
  return (
    <div
      className={`flex shrink-0 flex-wrap items-center justify-between gap-2 print:hidden ${
        fullscreen
          ? 'rounded-lg border border-border bg-card px-3 py-2 shadow-xs'
          : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        {fullscreen && (
          <div className="flex items-center gap-2 pr-1">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: themeBannerBg }}
            />
            <span className="max-w-[200px] truncate text-sm font-semibold text-foreground">
              {docTitle}
            </span>
            <Badge
              variant="secondary"
              className="font-mono text-[11px] tabular-nums"
            >
              {totalPages} {lang === 'fr' ? 'page(s)' : 'page(s)'}
            </Badge>
          </div>
        )}

        <Tabs
          value={layoutMode}
          onValueChange={(val) =>
            onChangeLayoutMode(val as WorkspaceLayoutMode)
          }
        >
          <TabsList>
            <TabsTrigger value="split" className="gap-1.5 px-2.5 text-xs">
              <Columns2 className="size-3.5" />
              <span>{copy.viewModes.split}</span>
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-1.5 px-2.5 text-xs">
              <FileText className="size-3.5" />
              <span>{copy.viewModes.editor}</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1.5 px-2.5 text-xs">
              <BookOpen className="size-3.5" />
              <span>{copy.viewModes.preview}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {layoutMode === 'split' && (
          <Button
            type="button"
            variant={scrollSyncEnabled ? 'secondary' : 'outline'}
            size="sm"
            className="h-8 gap-1.5 text-xs"
            title={copy.viewModes.syncScrollTooltip}
            onClick={onToggleScrollSync}
          >
            {scrollSyncEnabled ? (
              <Link2 className="size-3.5 text-primary" />
            ) : (
              <Link2Off className="size-3.5 text-muted-foreground" />
            )}
            <span>{copy.viewModes.syncScrollLabel}</span>
            {totalPages > 0 && (
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                {copy.viewModes.syncedPageIndicator(
                  Math.min(totalPages, syncedPageIndex + 1),
                  totalPages
                )}
              </span>
            )}
          </Button>
        )}

        {layoutMode !== 'editor' && (
          <>
            <Tabs
              value={spreadMode}
              onValueChange={(val) =>
                onChangeSpreadMode(val as PreviewSpreadMode)
              }
            >
              <TabsList>
                <TabsTrigger value="single" className="px-2 text-xs">
                  {copy.viewModes.singlePage}
                </TabsTrigger>
                <TabsTrigger value="spread" className="gap-1 px-2 text-xs">
                  <BookOpenCheck className="size-3.5" />
                  <span>{copy.viewModes.spreadView}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs">
              <span className="text-muted-foreground">
                {copy.viewModes.zoomLabel}:
              </span>
              <Button
                type="button"
                variant={zoomMode === 'auto' ? 'default' : 'ghost'}
                size="sm"
                className="h-6 px-1.5 text-[11px]"
                onClick={() => onChangeZoomMode('auto')}
              >
                {copy.viewModes.zoomAuto}
              </Button>
              {[0.55, 0.75, 0.9, 1].map((z) => (
                <Button
                  key={z}
                  type="button"
                  variant={zoomMode === z ? 'default' : 'ghost'}
                  size="sm"
                  className="h-6 px-1.5 font-mono text-[11px] tabular-nums"
                  onClick={() => onChangeZoomMode(z)}
                >
                  {Math.round(z * 100)}%
                </Button>
              ))}
            </div>
          </>
        )}

        {fullscreen && (
          <Button
            type="button"
            size="sm"
            className="h-8 text-xs"
            disabled={isExportingPdf}
            onClick={onExportPdf}
          >
            {isExportingPdf ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Download data-icon="inline-start" className="size-3.5" />
            )}
            <span>
              {isExportingPdf
                ? copy.exportMenu.exportingPdfBtn
                : copy.exportMenu.exportPdfBtn}
            </span>
          </Button>
        )}

        <Button
          type="button"
          variant={fullscreen ? 'secondary' : 'outline'}
          size="sm"
          className="h-8 text-xs"
          onClick={onToggleFullscreen}
        >
          {fullscreen ? (
            <Minimize2 data-icon="inline-start" className="size-3.5" />
          ) : (
            <Maximize2 data-icon="inline-start" className="size-3.5" />
          )}
          <span>
            {fullscreen
              ? copy.viewModes.exitFullscreenBtn
              : copy.viewModes.fullscreenBtn}
          </span>
        </Button>
      </div>
    </div>
  );
}
