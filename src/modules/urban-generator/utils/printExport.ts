import { getUrbanGeneratorCopy } from '../i18n';
import type { GeneratedEnvironment, ModuleLanguage } from '../types';
import { formatCrownsText } from './generator';

/**
 * Escapes HTML special characters to keep generated settlement names and notes safe.
 */
function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/**
 * Detects whether the app is running inside an embedded/sandboxed iframe
 * where native `window.print()` is blocked by missing `allow-modals`.
 */
export function isEmbeddedSandbox(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Builds a clean, self-contained, print-ready HTML document for a generated settlement.
 */
export function buildPrintableDossierHtml(
  env: GeneratedEnvironment,
  lang: ModuleLanguage
): string {
  const copy = getUrbanGeneratorCopy(lang);
  const settlementTitle =
    env.settlementName || copy.envForm.defaultSettlementName;
  const printBtnLabel = lang === 'fr' ? 'Imprimer / Enregistrer en PDF' : 'Print / Save as PDF';

  const buildingCardsHtml = env.buildings
    .map((building) => {
      const heading = building.tavernName
        ? `${building.title[lang]} — « ${building.tavernName[lang]} »`
        : building.title[lang];

      const lodgingHtml = building.lodgingNote
        ? `<p class="lodging">${escapeHtml(building.lodgingNote[lang])}</p>`
        : '';

      const rowsHtml = building.items
        .map((item) => {
          const kindLabel = copy.itemKinds[item.kind];
          const metaParts = [kindLabel];
          if (item.meta) metaParts.push(item.meta[lang]);
          if (item.isFanMade) metaParts.push(copy.output.fanMadeBadge);
          if (item.isStandard) metaParts.push(copy.output.standardBadge);

          const priceHtml =
            item.kind === 'contract'
              ? ''
              : `<td class="price">${escapeHtml(formatCrownsText(item.price, lang))}</td>`;

          return `
            <tr>
              <td>
                <div class="item-name">${escapeHtml(item.name[lang])}</div>
                <div class="item-meta">${escapeHtml(metaParts.join(' · '))}</div>
              </td>
              ${priceHtml}
            </tr>
          `;
        })
        .join('');

      return `
        <section class="card">
          <header class="card-header">
            <div class="card-header-row">
              <h2>${escapeHtml(heading)}</h2>
              <span class="count">${building.items.length} ${escapeHtml(copy.output.itemsCountLabel)}</span>
            </div>
            ${lodgingHtml}
          </header>
          <table>
            <tbody>${rowsHtml}</tbody>
          </table>
        </section>
      `;
    })
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(settlementTitle)} — ${escapeHtml(copy.output.printSubtitle)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f8f5ee;
      --surface: #ffffff;
      --ink: #1f1b16;
      --muted: #655b4e;
      --border: #dfd6c5;
      --accent: #8b5e1a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      background: var(--bg);
      color: var(--ink);
      font-family: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
      line-height: 1.45;
    }
    .container {
      max-width: 1080px;
      margin: 0 auto;
    }
    .toolbar {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
    }
    .print-btn {
      border: 1px solid var(--accent);
      background: var(--accent);
      color: #fff;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .hero {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 18px;
    }
    .eyebrow {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin-bottom: 4px;
    }
    h1 {
      margin: 0 0 6px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 26px;
    }
    .summary {
      font-size: 13px;
      color: var(--muted);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 16px;
      align-items: start;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .card-header {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: #fcfaf5;
    }
    .card-header-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .card-header h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
    }
    .count {
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
    }
    .lodging {
      margin: 4px 0 0;
      font-size: 12px;
      color: var(--muted);
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 7px 14px;
      border-bottom: 1px solid #efe9dc;
      vertical-align: top;
      font-size: 13px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .item-name {
      font-weight: 500;
    }
    .item-meta {
      font-size: 11px;
      color: var(--muted);
    }
    .price {
      text-align: right;
      white-space: nowrap;
      font-family: ui-monospace, SFMono-Regular, monospace;
      font-size: 12px;
      font-weight: 600;
    }
    @media print {
      body {
        background: #fff;
        padding: 0;
      }
      .toolbar {
        display: none;
      }
      .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
    }
  </style>
</head>
<body>
  <main class="container">
    <div class="toolbar">
      <button type="button" class="print-btn" onclick="window.print()">${escapeHtml(printBtnLabel)}</button>
    </div>
    <header class="hero">
      <div class="eyebrow">${escapeHtml(copy.output.printSubtitle)}</div>
      <h1>${escapeHtml(settlementTitle)}</h1>
      <div class="summary">
        ${escapeHtml(env.environmentName[lang])} · ${env.buildings.length} ${escapeHtml(copy.output.buildingsCountLabel)} · ${escapeHtml(env.includeFanMade ? copy.output.fanMadeActive : copy.output.officialOnly)}
      </div>
    </header>
    <div class="grid">
      ${buildingCardsHtml}
    </div>
  </main>
</body>
</html>`;
}

/**
 * Downloads a standalone printable HTML file for the generated settlement.
 */
export function downloadPrintableDossier(
  env: GeneratedEnvironment,
  lang: ModuleLanguage
): void {
  const html = buildPrintableDossierHtml(env, lang);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const copy = getUrbanGeneratorCopy(lang);
  const rawName = env.settlementName || copy.envForm.defaultSettlementName;
  const safeSlug = rawName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${safeSlug || 'witcher-settlement'}-dossier.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
