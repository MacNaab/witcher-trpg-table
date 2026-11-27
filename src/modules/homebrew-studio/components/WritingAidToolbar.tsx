import {
  BookImage,
  BookMarked,
  Briefcase,
  Frame,
  Heading1,
  Heading2,
  Heading3,
  HelpCircle,
  ImagePlus,
  ListOrdered,
  PanelBottom,
  PanelLeft,
  Quote,
  Scissors,
  ShieldAlert,
  Skull,
  Sparkles,
  Table2,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HomebrewStudioCopy } from '../i18n';
import type { ModuleLanguage } from '../types';

interface WritingAidToolbarProps {
  lang: ModuleLanguage;
  copy: HomebrewStudioCopy;
  activeDocTitle: string;
  activeDocMarkdown: string;
  showSyntaxHelp: boolean;
  isFullscreen?: boolean;
  onToggleSyntaxHelp: () => void;
  onInsertAtCursor: (snippet: string) => void;
  onUpdateMarkdown: (nextMarkdown: string) => void;
  onUploadImageClick: () => void;
  onOpenImportCharacter: () => void;
  onOpenImportMonster: () => void;
  onOpenCreateProfession: () => void;
}

/**
 * Top writing-aid toolbar ("aides à l'écriture") with Witcher TRPG Markdown directives,
 * quick entity/image importers, and a collapsible syntax cheat-sheet.
 */
export function WritingAidToolbar({
  lang,
  copy,
  activeDocTitle,
  activeDocMarkdown,
  showSyntaxHelp,
  isFullscreen = false,
  onToggleSyntaxHelp,
  onInsertAtCursor,
  onUpdateMarkdown,
  onUploadImageClick,
  onOpenImportCharacter,
  onOpenImportMonster,
  onOpenCreateProfession,
}: WritingAidToolbarProps) {
  const handleInsertCover = () => {
    const coverSnippet =
      lang === 'fr'
        ? `::: cover\noverline: CHRONIQUES DU CONTINENT\ntitle: ${activeDocTitle.toUpperCase()}\nsubtitle: SUPPLÉMENT DE CAMPAGNE\ntagline: Dans le monde sombre du Sorceleur, chaque avantage compte rien que pour survivre…\nimage: preset:grimoire\ncreditLeft: Compagnon du MJ\ncreditRight: Édition Homebrew\n:::\n\n\\page\n\n`
        : `::: cover\noverline: CHRONICLES OF THE CONTINENT\ntitle: ${activeDocTitle.toUpperCase()}\nsubtitle: CAMPAIGN SUPPLEMENT\ntagline: In the Dark World of the Witcher, a person needs every advantage they can get just to survive...\nimage: preset:grimoire\ncreditLeft: GM Companion\ncreditRight: Homebrew Edition\n:::\n\n\\page\n\n`;

    if (!/:::\s*cover\b/i.test(activeDocMarkdown)) {
      onUpdateMarkdown(`${coverSnippet}${activeDocMarkdown}`);
    } else {
      onInsertAtCursor(`\n${coverSnippet}`);
    }
  };

  const handleInsertBackCover = () => {
    const backCoverSnippet =
      lang === 'fr'
        ? `\n\\page\n\n::: backcover\nimage: preset:grimoire\nParcourez le Continent, percez ses secrets et traquez ses monstres les plus redoutables.\n\nfeaturing: Au programme\n- 6 Aventures | Enquêtes, duels et contrats à travers les Royaumes du Nord.\n- Nouveaux Contenus | Armes inédites, formules alchimiques et règles optionnelles.\ncreditLeft: Compagnon du MJ\ncreditRight: Édition Homebrew\n:::\n`
        : `\n\\page\n\n::: backcover\nimage: preset:grimoire\nAdventure across the Continent, uncovering its secrets, slaying monsters, and forging unforgettable stories.\n\nfeaturing: Featuring\n- 6 Adventures | Investigations, arena clashes, and hunts across the Northern Realms.\n- New Player Content | New weapons, alchemical formulae, and optional GM rules.\ncreditLeft: GM Companion\ncreditRight: Homebrew Edition\n:::\n`;

    if (!/:::\s*(?:backcover|back-cover|quatrieme)\b/i.test(activeDocMarkdown)) {
      onUpdateMarkdown(`${activeDocMarkdown.trimEnd()}\n${backCoverSnippet}`);
    } else {
      onInsertAtCursor(backCoverSnippet);
    }
  };

  return (
    <div className="shrink-0 overflow-hidden rounded-lg border border-border bg-card print:hidden">
      <div className="flex flex-wrap items-center gap-1 bg-muted/25 p-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={handleInsertCover}
        >
          <BookImage className="size-3.5" />
          <span>{copy.toolbar.cover}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              lang === 'fr'
                ? '\n::: toc\ntitle: Sommaire\nimage: preset:grimoire\n:::\n\n\\page\n\n'
                : '\n::: toc\ntitle: Table of Contents\nimage: preset:grimoire\n:::\n\n\\page\n\n'
            )
          }
        >
          <ListOrdered className="size-3.5" />
          <span>{copy.toolbar.toc}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              '\n::: art-page\nimage: preset:grimoire\n:::\n\n\\page\n\n'
            )
          }
        >
          <Frame className="size-3.5" />
          <span>{copy.toolbar.artPage}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onInsertAtCursor('\n::: signs\n')}
        >
          <Sparkles className="size-3.5" />
          <span>{copy.toolbar.signs}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={handleInsertBackCover}
        >
          <BookMarked className="size-3.5" />
          <span>{copy.toolbar.backCover}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onInsertAtCursor('\n# Titre de chapitre\n')}
        >
          <Heading1 className="size-3.5" />
          <span>H1</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onInsertAtCursor('\n## Section principale\n')}
        >
          <Heading2 className="size-3.5" />
          <span>H2</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onInsertAtCursor('\n### Sous-section\n')}
        >
          <Heading3 className="size-3.5" />
          <span>H3</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              '\n> *« Citation d’un sorceleur ou note d’ambiance. »*\n'
            )
          }
        >
          <Quote className="size-3.5" />
          <span>{copy.toolbar.quote}</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              lang === 'fr'
                ? '\n::: aside\n## Note en marge\nTexte de la colonne mineure (alterne gauche/droite selon le numéro de page).\n:::\n'
                : '\n::: aside\n## Sidebar Note\nMinor 1-column text (automatically alternates Left/Right by page parity).\n:::\n'
            )
          }
        >
          <PanelLeft className="size-3.5" />
          <span>{copy.toolbar.aside}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              '\n::: bottom-art\n![Illustration](preset:grimoire)\n:::\n'
            )
          }
        >
          <PanelBottom className="size-3.5" />
          <span>{copy.toolbar.bottomArt}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              lang === 'fr'
                ? '\n::: callout Règle optionnelle\nAjoutez ici un rappel de règle ou un conseil de maîtrise.\n:::\n'
                : '\n::: callout Optional Rule\nAdd a concise rules reminder or GM note here.\n:::\n'
            )
          }
        >
          <ShieldAlert className="size-3.5" />
          <span>{copy.toolbar.callout}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() =>
            onInsertAtCursor(
              '\n| Colonne A | Colonne B | Prix |\n| :--- | :--- | :---: |\n| Objet 1 | Effet | 50 c. |\n| Objet 2 | Effet | 120 c. |\n'
            )
          }
        >
          <Table2 className="size-3.5" />
          <span>{copy.toolbar.table}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={() => onInsertAtCursor('\n\n\\page\n\n')}
        >
          <Scissors className="size-3.5" />
          <span>{copy.toolbar.pageBreak}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={onUploadImageClick}
        >
          <ImagePlus className="size-3.5" />
          <span>{copy.toolbar.uploadImage}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={onOpenImportCharacter}
        >
          <UserCheck className="size-3.5 text-primary" />
          <span>{copy.toolbar.importCharacter}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={onOpenImportMonster}
        >
          <Skull className="size-3.5 text-primary" />
          <span>{copy.toolbar.importMonster}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={onOpenCreateProfession}
        >
          <Briefcase className="size-3.5 text-primary" />
          <span>{copy.toolbar.createProfession}</span>
        </Button>

        <Button
          type="button"
          variant={showSyntaxHelp ? 'secondary' : 'ghost'}
          size="sm"
          className="ml-auto h-7 gap-1 px-2 text-xs"
          onClick={onToggleSyntaxHelp}
        >
          <HelpCircle className="size-3.5" />
          <span>{copy.guide.toggleBtn}</span>
        </Button>
      </div>

      {showSyntaxHelp && (
        <div
          className={`border-t border-border bg-muted/20 p-3 text-xs ${
            isFullscreen ? 'max-h-36 overflow-y-auto' : ''
          }`}
        >
          <p className="mb-2 font-semibold text-foreground">
            {copy.guide.title}
          </p>
          <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.guide.items.map((item) => (
              <div key={item.syntax} className="flex flex-col gap-0.5">
                <code className="w-fit rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                  {item.syntax}
                </code>
                <span className="text-[11px] text-muted-foreground">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
