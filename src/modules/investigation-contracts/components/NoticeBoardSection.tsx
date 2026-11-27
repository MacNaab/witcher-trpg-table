import { useMemo, useState } from 'react';
import {
  Copy,
  Eye,
  EyeOff,
  Play,
  ScrollText,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OFFICIAL_WITCHER_CONTRACTS } from '../data/contractsData';
import type { InvestigationCopy } from '../i18n';
import type { WitcherContractEntry } from '../types';

interface NoticeBoardSectionProps {
  locale: 'fr' | 'en';
  copy: InvestigationCopy['contracts'];
  onLaunchContractMystery: (contract: WitcherContractEntry) => void;
}

export function NoticeBoardSection({
  locale,
  copy,
  onLaunchContractMystery,
}: NoticeBoardSectionProps) {
  const [query, setQuery] = useState('');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OFFICIAL_WITCHER_CONTRACTS;
    return OFFICIAL_WITCHER_CONTRACTS.filter((c) => {
      const haystack = [
        `#${c.number}`,
        c.title[locale],
        c.client[locale],
        c.location[locale],
        c.reward[locale],
        c.suggestedMonster[locale],
        c.noticeText[locale],
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [locale, query]);

  const handleCopy = async (contract: WitcherContractEntry) => {
    try {
      const text = `${contract.title[locale]}\n\n${contract.noticeText[locale]}\n\n${copy.rewardLabel}: ${contract.reward[locale]}`;
      await navigator.clipboard.writeText(text);
      toast.success(copy.copiedNoticeToast);
    } catch {
      toast.error('Clipboard unavailable');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search
            className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={copy.searchPlaceholder}
            className="pl-9"
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {copy.countLabel(filtered.length, OFFICIAL_WITCHER_CONTRACTS.length)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((contract) => {
          const hintVisible = Boolean(revealedHints[contract.id]);
          return (
            <Card key={contract.id} className="flex flex-col justify-between">
              <CardHeader className="gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-primary tabular-nums">
                    <ScrollText className="size-3.5" aria-hidden="true" />
                    Contrat #{contract.number}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {contract.reward[locale]}
                  </span>
                </div>
                <CardTitle className="text-base font-semibold">
                  {contract.title[locale]}
                </CardTitle>
                <CardDescription className="text-xs">
                  {contract.client[locale]} · {contract.location[locale]}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-3">
                <blockquote className="whitespace-pre-line rounded-md border border-border/70 bg-muted/25 p-3 text-xs leading-relaxed text-foreground/90 italic">
                  {contract.noticeText[locale]}
                </blockquote>

                <div className="flex flex-col gap-1.5 rounded-md border border-border/60 bg-background px-3 py-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-muted-foreground">
                      {copy.gmHintLabel}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setRevealedHints((prev) => ({
                          ...prev,
                          [contract.id]: !prev[contract.id],
                        }))
                      }
                      className="h-6 px-2 text-xs"
                    >
                      {hintVisible ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                      <span>
                        {hintVisible ? copy.hideHintBtn : copy.showHintBtn}
                      </span>
                    </Button>
                  </div>
                  {hintVisible && (
                    <div className="flex flex-col gap-1 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {copy.suggestedMonsterLabel} :{' '}
                        {contract.suggestedMonster[locale]}
                      </span>
                      <span>{contract.gmHint[locale]}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(contract)}
                  className="whitespace-nowrap shrink-0"
                >
                  <Copy data-icon="inline-start" />
                  <span>{copy.copyNoticeBtn}</span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onLaunchContractMystery(contract)}
                  className="whitespace-nowrap shrink-0"
                >
                  <Play data-icon="inline-start" />
                  <span>{copy.launchMysteryBtn}</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
