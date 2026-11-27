import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Copy,
  Download,
  FileCode,
  FilePlus2,
  FileText,
  LayoutPanelLeft,
  Loader2,
  Printer,
  Trash2,
  Upload,
} from 'lucide-react';
import { toast } from 'sonner';
import type { CreatureTypeId } from '@/src/data/bestiary/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useI18n } from '@/src/contexts/I18nContext';
import { isEmbeddedSandbox } from '@/src/modules/urban-generator/utils/printExport';
import type { ModuleEntryProps } from '@/src/types/navigation';
import {
  BestiaryImportDialog,
  type ImportEntityMode,
} from './components/BestiaryImportDialog';
import { CreatureTypeAutocompleteMenu } from './components/CreatureTypeAutocompleteMenu';
import { ProfessionBuilderDialog } from './components/ProfessionBuilderDialog';
import { WitcherBookPage, PAGE_DIMENSIONS } from './components/WitcherBookPage';
import {
  WorkspaceControlsBar,
  type PreviewSpreadMode,
  type WorkspaceLayoutMode,
} from './components/WorkspaceControlsBar';
import { WritingAidToolbar } from './components/WritingAidToolbar';
import {
  HOMEBREW_TEMPLATES,
  HOMEBREW_THEMES,
  createBlankDocument,
  createDocumentFromTemplate,
  loadHomebrewDocuments,
  saveHomebrewDocuments,
} from './data/templates';
import { getHomebrewStudioCopy } from './i18n';
import type {
  HomebrewDocument,
  HomebrewPageFormat,
  HomebrewThemeId,
} from './types';
import {
  downloadMarkdownSource,
  downloadPrintableBrewHtml,
  exportBrewPagesToPdf,
  readAndOptimizeImageFile,
} from './utils/pdfExporter';
import {
  computeTextPageRanges,
  findPageIndexAtOffset,
  measureTextareaPageTops,
  resolvePreviewScrollPosition,
  resolveTextareaScrollPosition,
} from './utils/syncNavigation';
import {
  detectCreatureTypeAutocomplete,
  filterCreatureTypeSuggestions,
  measureTextareaCaretCoords,
  type CaretPopupCoords,
  type CreatureTypeSuggestion,
  type TypeAutocompleteMatch,
} from './utils/textareaAutocomplete';
import { parseHomebrewDocument } from './utils/witcherMarkdown';

/**
 * Homebrewery-style Witcher TRPG Markdown-to-PDF Content Creation Studio.
 */
export default function HomebrewStudioModule({
  onNavigateOverview,
}: ModuleEntryProps) {
  const { locale } = useI18n();
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = getHomebrewStudioCopy(lang);

  const [documents, setDocuments] = useState<HomebrewDocument[]>(() =>
    loadHomebrewDocuments(lang)
  );
  const [activeDocId, setActiveDocId] = useState<string>(
    () => loadHomebrewDocuments(lang)[0]?.id ?? ''
  );

  const activeDoc = useMemo(
    () => documents.find((d) => d.id === activeDocId) ?? documents[0],
    [activeDocId, documents]
  );

  const [layoutMode, setLayoutMode] = useState<WorkspaceLayoutMode>('split');
  const [spreadMode, setSpreadMode] = useState<PreviewSpreadMode>('single');
  const [zoomMode, setZoomMode] = useState<'auto' | number>('auto');
  const [previewWidth, setPreviewWidth] = useState<number>(620);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [showSyntaxHelp, setShowSyntaxHelp] = useState(false);
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(true);
  const [syncedPageIndex, setSyncedPageIndex] = useState(0);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [importDialogMode, setImportDialogMode] =
    useState<ImportEntityMode | null>(null);
  const [professionDialogOpen, setProfessionDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [typeAutocomplete, setTypeAutocomplete] = useState<{
    match: TypeAutocompleteMatch;
    suggestions: CreatureTypeSuggestion[];
    activeIndex: number;
    coords: CaretPopupCoords;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const mdImportRef = useRef<HTMLInputElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const exportPageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const previewPageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Bidirectional scroll-sync state (rAF throttling + loop-prevention timestamps + cached page tops)
  const ignorePreviewScrollUntilRef = useRef<number>(0);
  const ignoreTextareaScrollUntilRef = useRef<number>(0);
  const editorScrollRafRef = useRef<number | null>(null);
  const previewScrollRafRef = useRef<number | null>(null);
  const lastCaretPageRef = useRef<number>(0);
  const cachedPageTopsRef = useRef<{
    docId: string;
    markdown: string;
    width: number;
    tops: number[];
  } | null>(null);

  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const updateWidth = () => {
      const nextW = el.clientWidth;
      if (nextW > 0) {
        setPreviewWidth((prev) => (Math.abs(prev - nextW) > 2 ? nextW : prev));
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layoutMode, fullscreenPreview]);

  // Lock page body scroll & support Escape to leave total fullscreen (unless a modal is open)
  useEffect(() => {
    if (!fullscreenPreview) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        !typeAutocomplete &&
        importDialogMode === null &&
        !professionDialogOpen &&
        !templateDialogOpen
      ) {
        setFullscreenPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    fullscreenPreview,
    importDialogMode,
    professionDialogOpen,
    templateDialogOpen,
    typeAutocomplete,
  ]);

  // Invalidate textarea page-top measurements when container width changes
  useEffect(() => {
    cachedPageTopsRef.current = null;
  }, [fullscreenPreview, layoutMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      saveHomebrewDocuments(documents);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [documents]);

  useEffect(() => {
    return () => {
      if (editorScrollRafRef.current !== null) {
        window.cancelAnimationFrame(editorScrollRafRef.current);
      }
      if (previewScrollRafRef.current !== null) {
        window.cancelAnimationFrame(previewScrollRafRef.current);
      }
    };
  }, []);

  // Reset sync caches cleanly when switching documents
  useEffect(() => {
    cachedPageTopsRef.current = null;
    lastCaretPageRef.current = 0;
    setSyncedPageIndex(0);
  }, [activeDocId]);

  const deferredMarkdown = useDeferredValue(activeDoc?.markdown ?? '');

  const parsedPages = useMemo(() => {
    if (!activeDoc) return [];
    return parseHomebrewDocument(deferredMarkdown, activeDoc.startPageNumber);
  }, [activeDoc, deferredMarkdown]);

  const textPageRanges = useMemo(
    () => computeTextPageRanges(activeDoc?.markdown ?? ''),
    [activeDoc?.markdown]
  );

  /**
   * Lazily computes and caches pixel Y boundaries of each `\page` section inside the textarea.
   * Never invoked synchronously during typing (`onChange`) so editing stays instantaneous.
   */
  const getTextareaPageTops = () => {
    const ta = textareaRef.current;
    if (!ta || !activeDoc) return [0];
    const cached = cachedPageTopsRef.current;
    if (
      cached &&
      cached.docId === activeDoc.id &&
      cached.markdown === activeDoc.markdown &&
      Math.abs(cached.width - ta.clientWidth) <= 1
    ) {
      return cached.tops;
    }
    const tops = measureTextareaPageTops(ta, activeDoc.markdown, textPageRanges);
    cachedPageTopsRef.current = {
      docId: activeDoc.id,
      markdown: activeDoc.markdown,
      width: ta.clientWidth,
      tops,
    };
    return tops;
  };

  /** Scrolls the live PDF preview panel to a specific 0-based page index & intra-page progress. */
  const scrollPreviewToPage = (
    targetPageIndex: number,
    intraRatio: number,
    behavior: ScrollBehavior
  ) => {
    const container = previewContainerRef.current;
    if (!container || parsedPages.length === 0) return;

    const clampedIdx = Math.max(
      0,
      Math.min(parsedPages.length - 1, targetPageIndex)
    );
    const pageEl = previewPageRefs.current[clampedIdx];
    if (!pageEl) return;

    const containerRect = container.getBoundingClientRect();
    const pageRect = pageEl.getBoundingClientRect();
    const pageTopInContainer =
      pageRect.top - containerRect.top + container.scrollTop;
    const maxIntraTravel = Math.max(
      0,
      pageEl.offsetHeight - container.clientHeight * 0.55
    );
    const targetTop = Math.max(
      0,
      pageTopInContainer - 8 + intraRatio * maxIntraTravel
    );

    ignorePreviewScrollUntilRef.current =
      performance.now() + (behavior === 'smooth' ? 480 : 140);
    setSyncedPageIndex(clampedIdx);
    container.scrollTo({ top: targetTop, behavior });
  };

  /** Scrolls the Markdown `<textarea>` to a specific 0-based page index & intra-page progress. */
  const scrollTextareaToPage = (
    targetPageIndex: number,
    intraRatio: number,
    behavior: ScrollBehavior
  ) => {
    const ta = textareaRef.current;
    if (!ta || textPageRanges.length === 0) return;

    const clampedIdx = Math.max(
      0,
      Math.min(textPageRanges.length - 1, targetPageIndex)
    );
    const pageTops = getTextareaPageTops();
    const startY = pageTops[clampedIdx] ?? 0;
    const endY =
      clampedIdx + 1 < pageTops.length
        ? pageTops[clampedIdx + 1]
        : ta.scrollHeight;
    const maxIntraTravel = Math.max(
      0,
      endY - startY - ta.clientHeight * 0.45
    );
    const targetTop = Math.max(0, startY + intraRatio * maxIntraTravel);

    ignoreTextareaScrollUntilRef.current =
      performance.now() + (behavior === 'smooth' ? 480 : 140);
    lastCaretPageRef.current = clampedIdx;
    setSyncedPageIndex(clampedIdx);
    ta.scrollTo({ top: targetTop, behavior });
  };

  const handleTextareaScroll = () => {
    setTypeAutocomplete(null);
    if (!scrollSyncEnabled || layoutMode !== 'split') return;
    if (performance.now() < ignoreTextareaScrollUntilRef.current) return;
    if (editorScrollRafRef.current !== null) return;

    editorScrollRafRef.current = window.requestAnimationFrame(() => {
      editorScrollRafRef.current = null;
      const ta = textareaRef.current;
      if (!ta) return;
      const pageTops = getTextareaPageTops();
      const { pageIndex, intraRatio } = resolveTextareaScrollPosition(
        ta.scrollTop,
        ta.clientHeight,
        ta.scrollHeight,
        pageTops
      );
      scrollPreviewToPage(pageIndex, intraRatio, 'auto');
    });
  };

  const handlePreviewScroll = () => {
    if (!scrollSyncEnabled || layoutMode !== 'split') return;
    if (performance.now() < ignorePreviewScrollUntilRef.current) return;
    if (previewScrollRafRef.current !== null) return;

    previewScrollRafRef.current = window.requestAnimationFrame(() => {
      previewScrollRafRef.current = null;
      const container = previewContainerRef.current;
      if (!container || parsedPages.length === 0) return;
      const { pageIndex, intraRatio } = resolvePreviewScrollPosition(
        container,
        previewPageRefs.current,
        parsedPages.length
      );
      scrollTextareaToPage(pageIndex, intraRatio, 'auto');
    });
  };

  const refreshTypeAutocomplete = (
    markdown: string,
    ta: HTMLTextAreaElement,
    trigger: 'typing' | 'manual' | 'caret'
  ) => {
    const start = ta.selectionStart ?? 0;
    const end = ta.selectionEnd ?? start;
    if (start !== end) {
      setTypeAutocomplete(null);
      return;
    }

    const match = detectCreatureTypeAutocomplete(markdown, start);
    if (!match) {
      setTypeAutocomplete(null);
      return;
    }

    if (trigger === 'caret' && match.isExactCanonicalId) {
      setTypeAutocomplete(null);
      return;
    }

    const suggestions = filterCreatureTypeSuggestions(match.query);
    if (suggestions.length === 0) {
      setTypeAutocomplete(null);
      return;
    }

    const coords = measureTextareaCaretCoords(ta, match.replaceStart);
    setTypeAutocomplete((prev) => {
      const sameQuery = prev?.match.query === match.query;
      const nextIdx = sameQuery
        ? Math.min(prev.activeIndex, suggestions.length - 1)
        : 0;
      return {
        match,
        suggestions,
        activeIndex: nextIdx,
        coords,
      };
    });
  };

  const applyCreatureTypeSuggestion = (typeId: CreatureTypeId) => {
    if (!activeDoc || !typeAutocomplete) return;
    const { replaceStart, replaceEnd } = typeAutocomplete.match;
    const before = activeDoc.markdown.slice(0, replaceStart);
    const after = activeDoc.markdown.slice(replaceEnd);
    const insertion = ` ${typeId}`;
    const nextMd = `${before}${insertion}${after}`;

    updateActiveDoc({ markdown: nextMd });
    setTypeAutocomplete(null);

    const ta = textareaRef.current;
    if (ta) {
      window.requestAnimationFrame(() => {
        ta.focus();
        const nextCursor = replaceStart + insertion.length;
        ta.setSelectionRange(nextCursor, nextCursor);
      });
    }
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.ctrlKey && e.code === 'Space' && activeDoc) {
      e.preventDefault();
      refreshTypeAutocomplete(activeDoc.markdown, e.currentTarget, 'manual');
      return;
    }

    if (!typeAutocomplete || typeAutocomplete.suggestions.length === 0) return;

    const count = typeAutocomplete.suggestions.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setTypeAutocomplete((prev) =>
        prev ? { ...prev, activeIndex: (prev.activeIndex + 1) % count } : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setTypeAutocomplete((prev) =>
        prev
          ? { ...prev, activeIndex: (prev.activeIndex - 1 + count) % count }
          : prev
      );
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const picked = typeAutocomplete.suggestions[typeAutocomplete.activeIndex];
      if (picked) {
        applyCreatureTypeSuggestion(picked.id);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      setTypeAutocomplete(null);
    }
  };

  const handleTextareaCaretChange = () => {
    if (!scrollSyncEnabled || layoutMode !== 'split') return;
    const ta = textareaRef.current;
    if (!ta) return;
    const caretPageIdx = findPageIndexAtOffset(
      textPageRanges,
      ta.selectionStart ?? 0
    );
    if (caretPageIdx !== lastCaretPageRef.current) {
      lastCaretPageRef.current = caretPageIdx;
      scrollPreviewToPage(caretPageIdx, 0, 'smooth');
    }
  };

  const updateActiveDoc = (patch: Partial<HomebrewDocument>) => {
    if (!activeDoc) return;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === activeDoc.id
          ? { ...doc, ...patch, updatedAt: new Date().toISOString() }
          : doc
      )
    );
  };

  const insertAtCursor = (snippet: string) => {
    if (!activeDoc) return;
    const el = textareaRef.current;
    if (!el) {
      updateActiveDoc({
        markdown: `${activeDoc.markdown}\n\n${snippet}`,
      });
      return;
    }

    const start = el.selectionStart ?? activeDoc.markdown.length;
    const end = el.selectionEnd ?? start;
    const before = activeDoc.markdown.slice(0, start);
    const after = activeDoc.markdown.slice(end);
    const nextMd = `${before}${snippet}${after}`;
    updateActiveDoc({ markdown: nextMd });

    window.requestAnimationFrame(() => {
      el.focus();
      const nextCursor = start + snippet.length;
      el.setSelectionRange(nextCursor, nextCursor);
    });
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !activeDoc) return;

    try {
      const dataUrl = await readAndOptimizeImageFile(file);
      const imageKey = `art-${Date.now().toString(36)}`;
      const cleanAlt = file.name.replace(/\.[^.]+$/, '') || 'Illustration';
      updateActiveDoc({
        images: {
          ...activeDoc.images,
          [imageKey]: dataUrl,
        },
      });
      insertAtCursor(`\n![${cleanAlt}](img:${imageKey})\n`);
      toast.success(copy.toolbar.imageUploadedToast);
    } catch {
      toast.error(copy.toolbar.imageErrorToast);
    }
  };

  const handleImportMarkdownFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const text = await file.text();
    const title = file.name.replace(/\.[^.]+$/, '') || copy.docs.untitledPrefix;
    const newDoc: HomebrewDocument = {
      ...createBlankDocument(lang, title),
      markdown: text,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
    toast.success(copy.exportMenu.mdImportedToast);
  };

  const handleCreateFromTemplate = (presetId: string) => {
    const nextDoc = createDocumentFromTemplate(presetId, lang);
    setDocuments((prev) => [nextDoc, ...prev]);
    setActiveDocId(nextDoc.id);
    setTemplateDialogOpen(false);
    toast.success(copy.docs.createdToast);
  };

  const handleCreateBlank = () => {
    const nextDoc = createBlankDocument(
      lang,
      `${copy.docs.untitledPrefix} #${documents.length + 1}`
    );
    setDocuments((prev) => [nextDoc, ...prev]);
    setActiveDocId(nextDoc.id);
    setTemplateDialogOpen(false);
    toast.success(copy.docs.createdToast);
  };

  const handleDuplicateDoc = () => {
    if (!activeDoc) return;
    const copyDoc: HomebrewDocument = {
      ...activeDoc,
      id: `brew-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: `${activeDoc.title} (${lang === 'fr' ? 'copie' : 'copy'})`,
      updatedAt: new Date().toISOString(),
    };
    setDocuments((prev) => [copyDoc, ...prev]);
    setActiveDocId(copyDoc.id);
    toast.success(copy.docs.createdToast);
  };

  const handleDeleteDoc = (id: string) => {
    setConfirmDeleteId(null);
    setDocuments((prev) => {
      const remaining = prev.filter((d) => d.id !== id);
      if (remaining.length === 0) {
        const fallback = createBlankDocument(lang, copy.docs.untitledPrefix);
        setActiveDocId(fallback.id);
        return [fallback];
      }
      if (activeDocId === id) {
        setActiveDocId(remaining[0].id);
      }
      return remaining;
    });
    toast.success(copy.docs.deletedToast);
  };

  const handleExportPdf = async () => {
    if (!activeDoc || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      const elements = parsedPages
        .map((p) => exportPageRefs.current[p.pageIndex])
        .filter((el): el is HTMLDivElement => Boolean(el));
      const filename = await exportBrewPagesToPdf(elements, activeDoc);
      toast.success(copy.exportMenu.pdfReadyToast(filename));
    } catch {
      downloadPrintableBrewHtml(activeDoc, parsedPages, lang);
      toast.error(copy.exportMenu.pdfErrorToast);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleNativePrint = () => {
    if (!activeDoc) return;
    if (isEmbeddedSandbox()) {
      toast.info(copy.exportMenu.printSandboxFallbackToast);
      void handleExportPdf();
      return;
    }
    window.print();
  };

  // Build spreads (pair pages 2-by-2 when spreadView is active)
  const spreadRows = useMemo(() => {
    if (spreadMode === 'single') {
      return parsedPages.map((p) => [p]);
    }
    const rows: typeof parsedPages[] = [];
    for (let i = 0; i < parsedPages.length; i += 2) {
      rows.push(parsedPages.slice(i, i + 2));
    }
    return rows;
  }, [parsedPages, spreadMode]);

  if (!activeDoc) return null;

  const pageDims = PAGE_DIMENSIONS[activeDoc.pageFormat];
  const activeTheme = HOMEBREW_THEMES[activeDoc.theme];

  const computeFitScale = (containerW: number, paddingPx: number) => {
    const innerW = Math.max(240, containerW - paddingPx);
    if (spreadMode === 'spread') {
      return Math.min(0.85, Math.max(0.28, (innerW - 24) / (pageDims.width * 2)));
    }
    return Math.min(0.92, Math.max(0.32, innerW / pageDims.width));
  };

  const effectiveZoom =
    zoomMode === 'auto' ? computeFitScale(previewWidth, 32) : zoomMode;

  const renderPagePreviewList = (
    scaleFactor: number,
    attachSyncRefs = true
  ) => (
    <div className="mx-auto flex w-max min-w-full flex-col gap-8 py-2">
      {spreadRows.map((row, rIdx) => (
        <div
          key={rIdx}
          className="mx-auto flex w-fit items-start gap-6"
        >
          {row.map((page) => {
            const isSyncedCurrent =
              attachSyncRefs &&
              layoutMode === 'split' &&
              scrollSyncEnabled &&
              syncedPageIndex === page.pageIndex;

            return (
              <div
                key={page.pageIndex}
                ref={
                  attachSyncRefs
                    ? (el) => {
                        previewPageRefs.current[page.pageIndex] = el;
                      }
                    : undefined
                }
                onClick={() => {
                  if (
                    attachSyncRefs &&
                    layoutMode === 'split' &&
                    scrollSyncEnabled &&
                    !window.getSelection()?.toString()
                  ) {
                    scrollTextareaToPage(page.pageIndex, 0, 'smooth');
                  }
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className={`font-mono font-semibold tabular-nums ${
                      isSyncedCurrent ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {page.isCover
                      ? copy.preview.coverMeta
                      : page.isBackCover
                        ? copy.preview.backCoverMeta
                        : page.bestiaryLeftData
                          ? copy.preview.bestiaryLeftMeta(
                              page.pageNumber,
                              page.isEven,
                              page.bestiaryLeftData.name
                            )
                          : page.bestiaryRightData
                            ? copy.preview.bestiaryRightMeta(
                                page.pageNumber,
                                page.isEven
                              )
                            : page.characterSheetData
                              ? copy.preview.characterSheetMeta(
                                  page.pageNumber,
                                  page.isEven,
                                  page.characterSheetData.name
                                )
                              : page.professionOverviewData
                                ? copy.preview.professionOverviewMeta(
                                    page.pageNumber,
                                    page.isEven,
                                    page.professionOverviewData.title
                                  )
                                : page.professionTreeData
                                  ? copy.preview.professionTreeMeta(
                                      page.pageNumber,
                                      page.isEven,
                                      page.professionTreeData.title
                                    )
                                  : page.isArtPage
                                    ? copy.preview.artPageMeta(
                                        page.pageNumber,
                                        page.isEven
                                      )
                                    : page.tocConfig
                                      ? copy.preview.tocMeta(
                                          page.pageNumber,
                                          page.isEven
                                        )
                                      : copy.preview.pageMeta(
                                          page.pageNumber,
                                          page.isEven
                                        )}
                  </span>
                  {!page.isCover &&
                    !page.isBackCover &&
                    !page.bestiaryLeftData &&
                    !page.bestiaryRightData &&
                    !page.characterSheetData &&
                    !page.professionOverviewData &&
                    !page.professionTreeData &&
                    !page.isArtPage &&
                    !page.tocConfig &&
                    page.asideNodes.length === 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{copy.preview.noAsideHint}</span>
                      </>
                    )}
                </div>

                <div
                  style={{
                    width: `${Math.round(pageDims.width * scaleFactor)}px`,
                    height: `${Math.round(pageDims.height * scaleFactor)}px`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pageDims.width}px`,
                      height: `${pageDims.height}px`,
                      transform: `scale(${scaleFactor})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <WitcherBookPage
                      page={page}
                      themeId={activeDoc.theme}
                      pageFormat={activeDoc.pageFormat}
                      chapterFooter={activeDoc.chapterFooter}
                      images={activeDoc.images}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      {/* Studio Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4 print:hidden">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[11px] font-medium tracking-wider text-primary uppercase">
            {copy.header.eyebrow}
          </span>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {copy.header.title}
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            {copy.header.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled={isExportingPdf}
            onClick={() => void handleExportPdf()}
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

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button type="button" variant="outline" size="sm">
                  <Printer data-icon="inline-start" className="size-3.5" />
                  <span>PDF / HTML / .md</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleNativePrint}>
                <Printer className="size-3.5" />
                <span>{copy.exportMenu.printBtn}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  downloadPrintableBrewHtml(activeDoc, parsedPages, lang);
                  toast.success(copy.exportMenu.htmlReadyToast);
                }}
              >
                <FileCode className="size-3.5" />
                <span>{copy.exportMenu.downloadHtmlBtn}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  downloadMarkdownSource(activeDoc);
                  toast.success(copy.exportMenu.mdExportedToast);
                }}
              >
                <FileText className="size-3.5" />
                <span>{copy.exportMenu.downloadMdBtn}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => mdImportRef.current?.click()}>
                <Upload className="size-3.5" />
                <span>{copy.exportMenu.importMdBtn}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onNavigateOverview}
          >
            <ArrowLeft data-icon="inline-start" className="size-3.5" />
            <span>{copy.header.backBtn}</span>
          </Button>
        </div>
      </div>

      {/* Document & Layout Settings Bar */}
      <div className="grid gap-3 rounded-lg border border-border bg-card p-3.5 md:grid-cols-12 print:hidden">
        {/* Document Switcher + Actions */}
        <div className="flex flex-wrap items-end gap-2 md:col-span-5">
          <div className="flex min-w-[180px] flex-1 flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground">
              {copy.docs.selectLabel}
            </Label>
            <Select
              value={activeDoc.id}
              onValueChange={(val) => {
                if (val) setActiveDocId(val);
              }}
            >
              <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue>{activeDoc.title}</SelectValue>
              </SelectTrigger>
              <SelectContent align="start">
                {documents.map((doc) => (
                  <SelectItem key={doc.id} value={doc.id}>
                    {doc.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => setTemplateDialogOpen(true)}
          >
            <FilePlus2 data-icon="inline-start" className="size-3.5" />
            <span>{copy.docs.newDocBtn}</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5 text-xs"
            title={copy.docs.duplicateBtn}
            onClick={handleDuplicateDoc}
          >
            <Copy className="size-3.5" />
          </Button>

          {confirmDeleteId === activeDoc.id ? (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => handleDeleteDoc(activeDoc.id)}
              >
                {copy.docs.deleteConfirmBtn}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => setConfirmDeleteId(null)}
              >
                {copy.docs.cancelBtn}
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={copy.docs.deleteBtn}
              title={copy.docs.deleteBtn}
              onClick={() => setConfirmDeleteId(activeDoc.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3.5" />
            </Button>
          )}
        </div>

        {/* Title, Footer, Theme, Format, Start Page */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 md:col-span-7">
          <div className="flex flex-col gap-1 lg:col-span-1">
            <Label htmlFor="brew-title" className="text-[11px] text-muted-foreground">
              {lang === 'fr' ? 'Titre' : 'Title'}
            </Label>
            <Input
              id="brew-title"
              value={activeDoc.title}
              onChange={(e) => updateActiveDoc({ title: e.target.value })}
              placeholder={copy.docs.titlePlaceholder}
              className="h-8 text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="brew-footer" className="text-[11px] text-muted-foreground">
              {copy.docs.footerLabel}
            </Label>
            <Input
              id="brew-footer"
              value={activeDoc.chapterFooter}
              onChange={(e) =>
                updateActiveDoc({ chapterFooter: e.target.value })
              }
              placeholder={copy.docs.footerPlaceholder}
              className="h-8 text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground">
              {copy.docs.themeLabel}
            </Label>
            <Select
              value={activeDoc.theme}
              onValueChange={(val) => {
                if (val) updateActiveDoc({ theme: val as HomebrewThemeId });
              }}
            >
              <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue>
                  <span className="flex items-center gap-1.5 truncate">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: activeTheme.bannerBg }}
                    />
                    <span className="truncate">{activeTheme.label[lang]}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                {Object.values(HOMEBREW_THEMES).map((th) => (
                  <SelectItem key={th.id} value={th.id}>
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-sm"
                        style={{ backgroundColor: th.bannerBg }}
                      />
                      <span>{th.label[lang]}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground">
              {copy.docs.formatLabel}
            </Label>
            <Select
              value={activeDoc.pageFormat}
              onValueChange={(val) => {
                if (val) {
                  updateActiveDoc({ pageFormat: val as HomebrewPageFormat });
                }
              }}
            >
              <SelectTrigger className="h-8 w-full text-xs">
                <SelectValue>
                  {activeDoc.pageFormat === 'a4' ? 'A4 (210×297)' : 'US Letter'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="a4">A4 (210×297 mm)</SelectItem>
                <SelectItem value="letter">US Letter (8.5×11 in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label
              htmlFor="brew-start-page"
              className="text-[11px] text-muted-foreground"
            >
              {copy.docs.startPageLabel}
            </Label>
            <Input
              id="brew-start-page"
              type="number"
              min={1}
              max={999}
              value={activeDoc.startPageNumber}
              onChange={(e) => {
                const n = Math.max(1, Number.parseInt(e.target.value, 10) || 1);
                updateActiveDoc({ startPageNumber: n });
              }}
              className="h-8 font-mono text-xs tabular-nums"
            />
          </div>
        </div>
      </div>

      {/* Studio Workspace Container: Expands to total fullscreen (top writing aids + dual Editor/Preview below) */}
      <div
        className={
          fullscreenPreview
            ? 'fixed inset-0 z-40 flex h-dvh w-screen flex-col gap-2.5 overflow-hidden bg-background p-3 sm:p-4 print:hidden'
            : 'flex flex-col gap-3 print:hidden'
        }
      >
        <WorkspaceControlsBar
          lang={lang}
          copy={copy}
          docTitle={activeDoc.title}
          themeBannerBg={activeTheme.bannerBg}
          totalPages={parsedPages.length}
          layoutMode={layoutMode}
          onChangeLayoutMode={setLayoutMode}
          spreadMode={spreadMode}
          onChangeSpreadMode={setSpreadMode}
          zoomMode={zoomMode}
          onChangeZoomMode={setZoomMode}
          scrollSyncEnabled={scrollSyncEnabled}
          onToggleScrollSync={() => setScrollSyncEnabled((prev) => !prev)}
          syncedPageIndex={syncedPageIndex}
          fullscreen={fullscreenPreview}
          onToggleFullscreen={() => setFullscreenPreview((prev) => !prev)}
          isExportingPdf={isExportingPdf}
          onExportPdf={() => void handleExportPdf()}
        />

        {/* Upper Section: Writing Aids Toolbar ("aides à l'écriture") */}
        {layoutMode !== 'preview' && (
          <WritingAidToolbar
            lang={lang}
            copy={copy}
            activeDocTitle={activeDoc.title}
            activeDocMarkdown={activeDoc.markdown}
            showSyntaxHelp={showSyntaxHelp}
            isFullscreen={fullscreenPreview}
            onToggleSyntaxHelp={() => setShowSyntaxHelp((prev) => !prev)}
            onInsertAtCursor={insertAtCursor}
            onUpdateMarkdown={(nextMarkdown) =>
              updateActiveDoc({ markdown: nextMarkdown })
            }
            onUploadImageClick={() => imageInputRef.current?.click()}
            onOpenImportCharacter={() => setImportDialogMode('character')}
            onOpenImportMonster={() => setImportDialogMode('monster')}
            onOpenCreateProfession={() => setProfessionDialogOpen(true)}
          />
        )}

        {/* Lower Section: Dual Markdown Editor / Live Book Preview */}
        <div
          className={`grid items-stretch ${
            fullscreenPreview
              ? `min-h-0 flex-1 gap-3 ${layoutMode === 'split' ? 'md:grid-cols-12' : 'grid-cols-1'}`
              : `gap-4 ${layoutMode === 'split' ? 'lg:grid-cols-12' : 'grid-cols-1'}`
          }`}
        >
          {/* Left: Markdown Textarea with inline type: category autocomplete */}
          {layoutMode !== 'preview' && (
            <div
              className={`relative flex flex-col overflow-hidden rounded-lg border border-border bg-card ${
                fullscreenPreview
                  ? `h-full min-h-[240px] ${layoutMode === 'split' ? 'md:col-span-5' : ''}`
                  : `h-[76vh] min-h-[620px] ${layoutMode === 'split' ? 'lg:col-span-5' : ''}`
              }`}
            >
              <textarea
                ref={textareaRef}
                value={activeDoc.markdown}
                onChange={(e) => {
                  const nextValue = e.target.value;
                  const ta = e.currentTarget;
                  updateActiveDoc({ markdown: nextValue });
                  refreshTypeAutocomplete(nextValue, ta, 'typing');
                }}
                onScroll={handleTextareaScroll}
                onKeyDown={handleTextareaKeyDown}
                onClick={(e) => {
                  handleTextareaCaretChange();
                  refreshTypeAutocomplete(
                    e.currentTarget.value,
                    e.currentTarget,
                    'caret'
                  );
                }}
                onKeyUp={(e) => {
                  handleTextareaCaretChange();
                  if (
                    e.key !== 'ArrowDown' &&
                    e.key !== 'ArrowUp' &&
                    e.key !== 'Enter' &&
                    e.key !== 'Tab' &&
                    e.key !== 'Escape'
                  ) {
                    refreshTypeAutocomplete(
                      e.currentTarget.value,
                      e.currentTarget,
                      'caret'
                    );
                  }
                }}
                onBlur={() => setTypeAutocomplete(null)}
                spellCheck={false}
                className="h-full w-full flex-1 resize-none bg-background p-4 font-mono text-xs leading-relaxed text-foreground focus:outline-none"
              />

              {typeAutocomplete && (
                <CreatureTypeAutocompleteMenu
                  lang={lang}
                  suggestions={typeAutocomplete.suggestions}
                  activeIndex={typeAutocomplete.activeIndex}
                  coords={typeAutocomplete.coords}
                  onSelect={applyCreatureTypeSuggestion}
                  onHoverIndex={(idx) =>
                    setTypeAutocomplete((prev) =>
                      prev ? { ...prev, activeIndex: idx } : prev
                    )
                  }
                />
              )}
            </div>
          )}

          {/* Right: Live PDF Sheet Preview */}
          {layoutMode !== 'editor' && (
            <div
              ref={previewContainerRef}
              onScroll={handlePreviewScroll}
              className={`overflow-auto rounded-lg border border-border bg-muted/40 p-4 ${
                fullscreenPreview
                  ? `h-full min-h-[240px] ${layoutMode === 'split' ? 'md:col-span-7' : ''}`
                  : `h-[76vh] min-h-[620px] ${layoutMode === 'split' ? 'lg:col-span-7' : ''}`
              }`}
            >
              {activeDoc.markdown.trim().length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center gap-2 text-center">
                  <LayoutPanelLeft className="size-8 text-muted-foreground/60" />
                  <p className="text-sm font-semibold text-foreground">
                    {copy.preview.emptyDocTitle}
                  </p>
                  <p className="max-w-md text-xs text-muted-foreground">
                    {copy.preview.emptyDocDesc}
                  </p>
                </div>
              ) : (
                renderPagePreviewList(effectiveZoom)
              )}
            </div>
          )}
        </div>
      </div>

      {/* Offscreen 1:1 Unscaled Staging Pages for Crisp PDF Capture + Native Print */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-[-99999px] flex flex-col gap-0 print:static print:left-0 print:pointer-events-auto"
      >
        {parsedPages.map((page) => (
          <div key={page.pageIndex} className="break-after-page">
            <WitcherBookPage
              page={page}
              themeId={activeDoc.theme}
              pageFormat={activeDoc.pageFormat}
              chapterFooter={activeDoc.chapterFooter}
              images={activeDoc.images}
              pageRef={(el) => {
                exportPageRefs.current[page.pageIndex] = el;
              }}
            />
          </div>
        ))}
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        className="sr-only"
      />
      <input
        ref={mdImportRef}
        type="file"
        accept=".md,.txt,text/markdown"
        onChange={handleImportMarkdownFile}
        className="sr-only"
      />

      {/* New Document / Template Picker Dialog */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{copy.docs.templateDialogTitle}</DialogTitle>
            <DialogDescription>
              {copy.docs.templateDialogDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            {HOMEBREW_TEMPLATES.map((tpl) => {
              const th = HOMEBREW_THEMES[tpl.theme];
              return (
                <div
                  key={tpl.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-card p-3.5 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="size-3 rounded-sm"
                        style={{ backgroundColor: th.bannerBg }}
                      />
                      <span className="text-sm font-semibold text-foreground">
                        {tpl.title[lang]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tpl.description[lang]}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="shrink-0"
                    onClick={() => handleCreateFromTemplate(tpl.id)}
                  >
                    {copy.docs.useTemplateBtn}
                  </Button>
                </div>
              );
            })}

            <div className="flex flex-col justify-between gap-3 rounded-lg border border-dashed border-border bg-muted/20 p-3.5 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">
                  {copy.docs.blankDocTitle}
                </span>
                <p className="text-xs text-muted-foreground">
                  {copy.docs.blankDocDesc}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="shrink-0"
                onClick={handleCreateBlank}
              >
                {copy.docs.useTemplateBtn}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bestiary & Shared GM Hub Statblock Importer (Strictly Scoped: PC/NPC vs Monster) */}
      <BestiaryImportDialog
        open={importDialogMode !== null}
        mode={importDialogMode ?? 'monster'}
        onOpenChange={(isOpen) => {
          if (!isOpen) setImportDialogMode(null);
        }}
        lang={lang}
        copy={copy}
        onInsertStatblock={(name, md) => {
          insertAtCursor(`\n${md}\n`);
          toast.success(copy.bestiaryDialog.insertedToast(name));
        }}
      />

      {/* Guided 2-Page Profession Builder Dialog */}
      <ProfessionBuilderDialog
        open={professionDialogOpen}
        onOpenChange={setProfessionDialogOpen}
        lang={lang}
        copy={copy}
        docImages={activeDoc.images}
        onInsertProfession={(name, md) => {
          insertAtCursor(`\n\n${md}\n\n`);
          toast.success(copy.professionDialog.insertedToast(name));
        }}
      />
    </div>
  );
}
