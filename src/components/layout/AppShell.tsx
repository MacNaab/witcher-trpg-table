import { useState } from 'react';
import { Bug, ExternalLink } from 'lucide-react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/src/components/layout/AppSidebar';
import { CampaignBackupDialog } from '@/src/components/layout/CampaignBackupDialog';
import { CampaignNotesDialog } from '@/src/components/layout/CampaignNotesDialog';
import { CommandSearchDialog } from '@/src/components/layout/CommandSearchDialog';
import {
  CompendiumItemDialog,
  type CompendiumSearchItem,
} from '@/src/components/layout/CompendiumItemDialog';
import { QuickDiceDialog } from '@/src/components/layout/QuickDiceDialog';
import { TopHeader } from '@/src/components/layout/TopHeader';
import { useI18n } from '@/src/contexts/I18nContext';
import { useActiveModule } from '@/src/hooks/useActiveModule';
import { ModuleViewport } from '@/src/modules/ModuleViewport';

/**
 * Top-level responsive workspace shell composing the Shadcn Sidebar,
 * sticky TopHeader, main scrollable viewport, QuickDiceDialog, CampaignNotesDialog,
 * CompendiumItemDialog, CampaignBackupDialog, and CommandSearchDialog.
 */
export function AppShell() {
  const { t } = useI18n();
  const { activeModule, launchIntent, navigateTo } = useActiveModule();
  const [commandOpen, setCommandOpen] = useState(false);
  const [diceOpen, setDiceOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [compendiumItem, setCompendiumItem] =
    useState<CompendiumSearchItem | null>(null);
  const [backupRevision, setBackupRevision] = useState(0);

  return (
    <SidebarProvider defaultOpen={true} className="overflow-x-clip">
      <AppSidebar
        activeModule={activeModule}
        onSelectModule={(id) => navigateTo(id)}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      <SidebarInset className="flex min-h-svh min-w-0 flex-col overflow-x-clip">
        <TopHeader
          activeModule={activeModule}
          onSelectModule={(id) => navigateTo(id)}
          onOpenCommandPalette={() => setCommandOpen(true)}
          onOpenDice={() => setDiceOpen(true)}
          onOpenNotes={() => setNotesOpen(true)}
          onOpenBackup={() => setBackupOpen(true)}
        />

        <main className="min-w-0 flex-1 p-3 sm:p-6 lg:p-8">
          <ModuleViewport
            key={backupRevision}
            activeModule={activeModule}
            launchIntent={launchIntent}
            onSelectModule={navigateTo}
            onOpenCommandPalette={() => setCommandOpen(true)}
          />
        </main>

        <footer className="border-t border-border/70 bg-background/80 px-4 py-3 text-xs text-muted-foreground sm:px-6 lg:px-8 print:hidden">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bug className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{t.app.issuesDescription}</span>
            </div>
            <a
              href={t.app.issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono font-medium text-primary underline-offset-4 hover:underline"
            >
              <span>{t.app.issuesUrl}</span>
              <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </SidebarInset>

      <CommandSearchDialog
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onSelectModule={navigateTo}
        onOpenDice={() => setDiceOpen(true)}
        onOpenNotes={() => setNotesOpen(true)}
        onOpenBackup={() => setBackupOpen(true)}
        onOpenCompendiumItem={(item) => setCompendiumItem(item)}
      />

      <QuickDiceDialog open={diceOpen} onOpenChange={setDiceOpen} />

      <CampaignNotesDialog
        key={`notes-${backupRevision}`}
        open={notesOpen}
        onOpenChange={setNotesOpen}
      />

      <CompendiumItemDialog
        item={compendiumItem}
        open={compendiumItem !== null}
        onOpenChange={(open) => {
          if (!open) setCompendiumItem(null);
        }}
      />

      <CampaignBackupDialog
        open={backupOpen}
        onOpenChange={setBackupOpen}
        onRestored={() => setBackupRevision((prev) => prev + 1)}
      />
    </SidebarProvider>
  );
}
