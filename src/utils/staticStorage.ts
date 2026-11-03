import * as XLSX from 'xlsx';

export interface StaticDownloadRecord {
  id: string;
  name: string;
  email: string;
  edition: string;
  date: string;
  time: string;
  isoTimestamp: string;
}

export interface StaticSiteConfig {
  liteDriveUrl: string;
  demoEngDriveUrl: string;
  demoJaDriveUrl: string;
  googleSheetWebhookUrl: string;
  notifyEmailEnabled: boolean;
}

const RECORDS_STORAGE_KEY = 'kaigi_static_download_records_v1';
const CONFIG_STORAGE_KEY = 'kaigi_static_site_config_v1';

const DEFAULT_CONFIG: StaticSiteConfig = {
  liteDriveUrl: import.meta.env.VITE_KAIGI_LITE_DRIVE_URL || '',
  demoEngDriveUrl: import.meta.env.VITE_KAIGI_DEMO_ENG_DRIVE_URL || '',
  demoJaDriveUrl: import.meta.env.VITE_KAIGI_DEMO_JA_DRIVE_URL || '',
  googleSheetWebhookUrl: import.meta.env.VITE_KAIGI_GOOGLE_SHEET_WEBHOOK_URL || '',
  notifyEmailEnabled: true,
};

export function getStaticConfig(): StaticSiteConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      liteDriveUrl:
        typeof parsed.liteDriveUrl === 'string' ? parsed.liteDriveUrl : DEFAULT_CONFIG.liteDriveUrl,
      demoEngDriveUrl:
        typeof parsed.demoEngDriveUrl === 'string'
          ? parsed.demoEngDriveUrl
          : DEFAULT_CONFIG.demoEngDriveUrl,
      demoJaDriveUrl:
        typeof parsed.demoJaDriveUrl === 'string'
          ? parsed.demoJaDriveUrl
          : DEFAULT_CONFIG.demoJaDriveUrl,
      googleSheetWebhookUrl:
        typeof parsed.googleSheetWebhookUrl === 'string'
          ? parsed.googleSheetWebhookUrl
          : DEFAULT_CONFIG.googleSheetWebhookUrl,
      notifyEmailEnabled:
        typeof parsed.notifyEmailEnabled === 'boolean'
          ? parsed.notifyEmailEnabled
          : DEFAULT_CONFIG.notifyEmailEnabled,
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveStaticConfig(next: Partial<StaticSiteConfig>): StaticSiteConfig {
  const merged: StaticSiteConfig = {
    ...getStaticConfig(),
    ...next,
  };
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('kaigi-static-config-updated', { detail: merged }));
  } catch {
    // ignore storage quota errors
  }
  return merged;
}

export function getStaticDownloadRecords(): StaticDownloadRecord[] {
  try {
    const raw = localStorage.getItem(RECORDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function extractGoogleDriveFileId(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) return trimmed;
  return '';
}

export function toGoogleDriveDirectDownloadUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const fileId = extractGoogleDriveFileId(rawUrl);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return rawUrl.trim();
}

export function toGoogleDriveEmbedPreviewUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const fileId = extractGoogleDriveFileId(rawUrl);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return rawUrl.trim();
}

export async function recordStaticDownload(
  name: string,
  email: string
): Promise<{
  record: StaticDownloadRecord;
  directDownloadUrl: string;
  webhookSent: boolean;
}> {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  const record: StaticDownloadRecord = {
    id: `DL-${now.getTime()}`,
    name: name.trim(),
    email: email.trim(),
    edition: 'Kaigi Lite (Free)',
    date,
    time,
    isoTimestamp: now.toISOString(),
  };

  // 1. Save in browser localStorage
  const existing = getStaticDownloadRecords();
  const updated = [record, ...existing];
  try {
    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  const config = getStaticConfig();
  let webhookSent = false;

  // 2. If a Google Sheets Apps Script Web App URL (or custom webhook) is configured, POST directly (no Firebase needed)
  if (config.googleSheetWebhookUrl.trim()) {
    try {
      await fetch(config.googleSheetWebhookUrl.trim(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(record),
      });
      webhookSent = true;
    } catch {
      // non-blocking
    }
  }

  // 3. Optional background email notification to sgb.dev.apps@gmail.com via FormSubmit AJAX
  if (config.notifyEmailEnabled) {
    try {
      fetch('https://formsubmit.co/ajax/sgb.dev.apps@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Kaigi Lite Download: ${record.name}`,
          Name: record.name,
          'Mail ID': record.email,
          Edition: record.edition,
          Date: record.date,
          Time: record.time,
          Timestamp: record.isoTimestamp,
        }),
      }).catch(() => {
        // non-blocking
      });
    } catch {
      // non-blocking
    }
  }

  return {
    record,
    directDownloadUrl: toGoogleDriveDirectDownloadUrl(config.liteDriveUrl),
    webhookSent,
  };
}

export function downloadLocalExcelWorkbook(): void {
  const records = getStaticDownloadRecords();
  const rows = records.map((r, index) => ({
    '#': index + 1,
    Name: r.name,
    'Mail ID': r.email,
    Edition: r.edition,
    Date: r.date,
    Time: r.time,
    'ISO Timestamp': r.isoTimestamp,
  }));

  const worksheet = XLSX.utils.json_to_sheet(
    rows.length > 0
      ? rows
      : [
          {
            '#': 1,
            Name: '(No downloads recorded yet)',
            'Mail ID': '-',
            Edition: 'Kaigi Lite (Free)',
            Date: '-',
            Time: '-',
            'ISO Timestamp': '-',
          },
        ]
  );

  worksheet['!cols'] = [
    { wch: 6 },
    { wch: 26 },
    { wch: 32 },
    { wch: 20 },
    { wch: 14 },
    { wch: 12 },
    { wch: 26 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Kaigi Lite Downloads');
  XLSX.writeFile(workbook, 'kaigi-downloads-log.xlsx');
}

export const GOOGLE_APPS_SCRIPT_SNIPPET = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Name", "Mail ID", "Edition", "Date", "Time", "ISO Timestamp"]);
  }
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.name, data.email, data.edition, data.date, data.time, data.isoTimestamp]);
  return ContentService.createTextOutput("OK");
}`;

export async function downloadZipPackage(filename: string): Promise<void> {
  try {
    const response = await fetch(`./${filename}`);
    if (!response.ok) throw new Error('ZIP file not found');
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  } catch {
    const a = document.createElement('a');
    a.href = `./${filename}`;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

