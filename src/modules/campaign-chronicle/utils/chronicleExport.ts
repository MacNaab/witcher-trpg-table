import { getCampaignChronicleCopy } from '../i18n';
import type {
  CampaignRecord,
  ChronicleEvent,
  ModuleLanguage,
} from '../types';
import {
  formatEventDateLabel,
  formatRealDateLabel,
  sanitizeSessionDates,
  sortChronicleEvents,
} from './chronicleStorage';

export interface ChronicleJsonExportPayload {
  app: 'witcher-gm-chronicle';
  version: 1;
  exportedAt: string;
  campaign: CampaignRecord;
  events: ChronicleEvent[];
}

function slugifyFilename(value: string): string {
  return (
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'campaign-chronicle'
  );
}

function triggerTextDownload(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Generates a readable Markdown chronicle for either full GM archival
 * or spoiler-free player recap (omitting GM secret notes and upcoming hooks).
 */
export function buildChronicleMarkdown(
  campaign: CampaignRecord,
  events: readonly ChronicleEvent[],
  lang: ModuleLanguage,
  includeGmSecrets: boolean
): string {
  const copy = getCampaignChronicleCopy(lang);
  const sorted = sortChronicleEvents(
    includeGmSecrets
      ? events
      : events.filter((ev) => ev.status !== 'upcoming'),
    'asc'
  );

  const lines: string[] = [];
  lines.push(`# ${campaign.name}`);
  if (campaign.subtitle) {
    lines.push(`*${campaign.subtitle}*`);
  }
  lines.push('');

  const metaParts: string[] = [];
  if (campaign.region) metaParts.push(campaign.region);
  metaParts.push(copy.campaignStatus[campaign.status]);
  metaParts.push(copy.campaignBar.sessionBadge(campaign.currentSessionNumber));
  lines.push(`**${metaParts.join(' · ')}**`);

  if (campaign.description.trim()) {
    lines.push('');
    lines.push(campaign.description.trim());
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  if (sorted.length === 0) {
    lines.push(
      lang === 'fr'
        ? '*Aucun événement consigné pour le moment.*'
        : '*No events recorded yet.*'
    );
    return lines.join('\n');
  }

  for (const ev of sorted) {
    const dateStr = formatEventDateLabel(ev.date, lang);
    const timeStr = copy.timeOfDay[ev.date.timeOfDay];
    const realDateStr =
      ev.sessionNumber > 0
        ? formatRealDateLabel(
            campaign.sessionDates?.[String(ev.sessionNumber)],
            lang
          )
        : null;
    const sessionStr =
      ev.sessionNumber > 0
        ? realDateStr
          ? `${copy.eventCard.sessionLabel(ev.sessionNumber)} (${realDateStr})`
          : copy.eventCard.sessionLabel(ev.sessionNumber)
        : copy.eventCard.unassignedSession;

    lines.push(`## ${dateStr} (${timeStr}) — ${ev.title}`);
    const details = [
      copy.categories[ev.category],
      copy.eventStatus[ev.status],
      sessionStr,
      ev.location ? ev.location : null,
    ]
      .filter(Boolean)
      .join(' · ');
    lines.push(`*${details}*`);
    lines.push('');

    if (ev.summary.trim()) {
      lines.push(ev.summary.trim());
      lines.push('');
    }
    if (ev.involvedEntities.length > 0) {
      lines.push(
        `- **${copy.eventCard.entitiesLabel} :** ${ev.involvedEntities.join(', ')}`
      );
    }
    if (ev.consequences.trim()) {
      lines.push(
        `- **${copy.eventCard.consequencesLabel} :** ${ev.consequences.trim()}`
      );
    }
    if (includeGmSecrets && ev.gmSecretNote.trim()) {
      lines.push(
        `- **${copy.eventCard.gmSecretLabel} :** ${ev.gmSecretNote.trim()}`
      );
    }
    lines.push('');
  }

  return lines.join('\n');
}

export function downloadChronicleMarkdown(
  campaign: CampaignRecord,
  events: readonly ChronicleEvent[],
  lang: ModuleLanguage,
  includeGmSecrets: boolean
): void {
  const md = buildChronicleMarkdown(campaign, events, lang, includeGmSecrets);
  const suffix = includeGmSecrets ? 'gm' : 'players';
  triggerTextDownload(
    md,
    `${slugifyFilename(campaign.name)}-${suffix}.md`,
    'text/markdown;charset=utf-8'
  );
}

export function downloadChronicleJson(
  campaign: CampaignRecord,
  events: readonly ChronicleEvent[]
): void {
  const payload: ChronicleJsonExportPayload = {
    app: 'witcher-gm-chronicle',
    version: 1,
    exportedAt: new Date().toISOString(),
    campaign,
    events: sortChronicleEvents(events, 'asc'),
  };
  triggerTextDownload(
    JSON.stringify(payload, null, 2),
    `${slugifyFilename(campaign.name)}-chronicle.json`,
    'application/json;charset=utf-8'
  );
}

export function parseChronicleImportJson(rawText: string): {
  campaignName?: string;
  campaignSubtitle?: string;
  campaignRegion?: string;
  campaignDescription?: string;
  sessionDates?: Record<string, string>;
  events: Array<Partial<ChronicleEvent>>;
} | null {
  try {
    const parsed = JSON.parse(rawText) as Partial<ChronicleJsonExportPayload>;
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.app !== 'witcher-gm-chronicle' ||
      parsed.version !== 1 ||
      !Array.isArray(parsed.events)
    ) {
      return null;
    }

    return {
      campaignName: parsed.campaign?.name,
      campaignSubtitle: parsed.campaign?.subtitle,
      campaignRegion: parsed.campaign?.region,
      campaignDescription: parsed.campaign?.description,
      sessionDates: sanitizeSessionDates(parsed.campaign?.sessionDates),
      events: (parsed.events as unknown[]).filter(
        (item): item is Partial<ChronicleEvent> =>
          Boolean(item && typeof item === 'object')
      ),
    };
  } catch {
    return null;
  }
}
