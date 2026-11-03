import React, { useEffect, useState } from 'react';
import {
  X,
  Download,
  Shield,
  BookOpen,
  Terminal,
  Play,
  CheckCircle2,
  User,
  Mail,
  Clock,
  ExternalLink,
  AlertCircle,
  Lock,
  Settings,
  Link2,
  FileSpreadsheet,
  Copy,
  Check,
} from 'lucide-react';
import { Language, SCREENSHOTS } from '../data/kaigiContent';
import {
  StaticDownloadRecord,
  getStaticConfig,
  saveStaticConfig,
  getStaticDownloadRecords,
  recordStaticDownload,
  downloadLocalExcelWorkbook,
  downloadZipPackage,
  GOOGLE_APPS_SCRIPT_SNIPPET,
} from '../utils/staticStorage';

interface LightboxModalProps {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15171C]/85 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col rounded-xl border border-[#F6F4F0]/15 bg-[#1D2028] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F6F4F0]/10 bg-[#15171C] text-[#F6F4F0]">
          <span className="font-mono text-xs truncate pr-4">{image.alt}</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-[#F6F4F0]/70 hover:text-[#F6F4F0] hover:bg-[#F6F4F0]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#E8456B]"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-auto p-2 sm:p-4 bg-[#15171C]/60 flex items-center justify-center">
          <img
            src={image.src}
            alt={image.alt}
            referrerPolicy="no-referrer"
            className="max-h-[78vh] w-auto object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
};

export type InfoModalType = 'download' | 'guide' | 'privacy' | 'video' | null;

interface DownloadSubmissionResult {
  record: StaticDownloadRecord;
  directDownloadUrl: string;
  webhookSent: boolean;
}

interface InfoModalProps {
  type: InfoModalType;
  lang: Language;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, lang, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<DownloadSubmissionResult | null>(null);

  // Static Owner Setup State (Zero Firebase)
  const [showOwnerPanel, setShowOwnerPanel] = useState(false);
  const [liteDriveUrlInput, setLiteDriveUrlInput] = useState('');
  const [demoEngUrlInput, setDemoEngUrlInput] = useState('');
  const [demoJaUrlInput, setDemoJaUrlInput] = useState('');
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [notifyEmailEnabled, setNotifyEmailEnabled] = useState(true);
  const [linkSavedFeedback, setLinkSavedFeedback] = useState(false);
  const [ownerRecords, setOwnerRecords] = useState<StaticDownloadRecord[]>([]);
  const [showAppsScriptGuide, setShowAppsScriptGuide] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  useEffect(() => {
    if (!type) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  useEffect(() => {
    if (type === 'download') {
      setErrorMsg(null);
      const cfg = getStaticConfig();
      setLiteDriveUrlInput(cfg.liteDriveUrl);
      setDemoEngUrlInput(cfg.demoEngDriveUrl);
      setDemoJaUrlInput(cfg.demoJaDriveUrl);
      setWebhookUrlInput(cfg.googleSheetWebhookUrl);
      setNotifyEmailEnabled(cfg.notifyEmailEnabled);
      setOwnerRecords(getStaticDownloadRecords());
    }
  }, [type]);

  if (!type) return null;

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (cleanName.length < 2) {
      setErrorMsg(
        lang === 'en'
          ? 'Please enter your name (at least 2 characters).'
          : 'お名前を入力してください（2文字以上）。'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMsg(
        lang === 'en'
          ? 'Please enter a valid email address (Mail ID).'
          : '有効なメールアドレス（Mail ID）を入力してください。'
      );
      return;
    }

    setSubmitting(true);
    try {
      const result = await recordStaticDownload(cleanName, cleanEmail);
      setSubmittedRecord(result);
      setOwnerRecords(getStaticDownloadRecords());
      setSubmitting(false);

      // Trigger Google Drive download if configured
      if (result.directDownloadUrl) {
        const a = document.createElement('a');
        a.href = result.directDownloadUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      setErrorMsg(
        lang === 'en'
          ? 'Could not process download request. Please try again.'
          : 'ダウンロード処理中にエラーが発生しました。もう一度お試しください。'
      );
      setSubmitting(false);
    }
  };

  const resetDownloadForm = () => {
    setSubmittedRecord(null);
    setName('');
    setEmail('');
    setErrorMsg(null);
  };

  const handleSaveStaticSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStaticConfig({
      liteDriveUrl: liteDriveUrlInput.trim(),
      demoEngDriveUrl: demoEngUrlInput.trim(),
      demoJaDriveUrl: demoJaUrlInput.trim(),
      googleSheetWebhookUrl: webhookUrlInput.trim(),
      notifyEmailEnabled,
    });
    setLinkSavedFeedback(true);
    setTimeout(() => setLinkSavedFeedback(false), 3000);
  };

  const handleCopyScript = () => {
    navigator.clipboard?.writeText(GOOGLE_APPS_SCRIPT_SNIPPET);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15171C]/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-xl border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#F6F4F0] dark:bg-[#1D2028] text-[#15171C] dark:text-[#F6F4F0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10">
          <div className="flex items-center gap-2.5">
            {type === 'download' && <Download className="w-4 h-4 text-[#E8456B]" />}
            {type === 'guide' && <BookOpen className="w-4 h-4 text-[#E8456B]" />}
            {type === 'privacy' && <Shield className="w-4 h-4 text-[#E8456B]" />}
            {type === 'video' && <Play className="w-4 h-4 text-[#E8456B]" />}
            <h3 className="font-display text-lg font-semibold">
              {type === 'download' &&
                (lang === 'en'
                  ? 'Download Kaigi Lite for Windows'
                  : 'Kaigi Lite Windows版 ダウンロード')}
              {type === 'guide' &&
                (lang === 'en'
                  ? 'Kaigi Quick-Start User Guide'
                  : 'Kaigi クイックスタート・ユーザーガイド')}
              {type === 'privacy' &&
                (lang === 'en'
                  ? 'Offline Privacy & Data Architecture'
                  : 'オフライン・プライバシーとデータ設計')}
              {type === 'video' &&
                (lang === 'en'
                  ? 'SGB Dev Apps — Publisher Intro'
                  : 'SGB Dev Apps — パブリッシャー紹介')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-[#15171C]/70 dark:text-[#F6F4F0]/70 hover:bg-[#15171C]/5 dark:hover:bg-[#F6F4F0]/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#E8456B]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed">
          {type === 'download' && (
            <>
              {/* Edition Selector: ONLY Kaigi Lite is active; all others are disabled ("duffed") */}
              <div className="space-y-2.5">
                <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75">
                  {lang === 'en' ? 'Select Edition' : 'エディション選択'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Active Option: Kaigi Lite (Free) */}
                  <div className="rounded-lg border-2 border-[#E8456B] bg-[#FDFCFA] dark:bg-[#15171C] p-3.5 flex items-start justify-between gap-2">
                    <div>
                      <div className="font-display font-bold text-sm text-[#15171C] dark:text-[#F6F4F0]">
                        Kaigi Lite — Free
                      </div>
                      <div className="text-xs text-[#15171C]/70 dark:text-[#F6F4F0]/70 mt-0.5">
                        {lang === 'en'
                          ? 'Windows 10/11 (64-bit) · Available now'
                          : 'Windows 10/11 (64-bit) · 現在利用可能'}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#E8456B] text-white shrink-0">
                      {lang === 'en' ? 'Active' : '選択中'}
                    </span>
                  </div>

                  {/* Disabled ("Duffed") Option: Kaigi Pro */}
                  <div
                    aria-disabled="true"
                    className="rounded-lg border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#ECE8E0]/60 dark:bg-[#15171C]/40 p-3.5 flex items-start justify-between gap-2 opacity-55 cursor-not-allowed select-none"
                  >
                    <div>
                      <div className="font-display font-bold text-sm text-[#15171C]/65 dark:text-[#F6F4F0]/65 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Kaigi Pro — [price]</span>
                      </div>
                      <div className="text-xs text-[#15171C]/50 dark:text-[#F6F4F0]/50 mt-0.5">
                        {lang === 'en'
                          ? 'Disabled until v1.0 development completes'
                          : 'v1.0開発完了まで選択不可'}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded border border-[#15171C]/20 dark:border-[#F6F4F0]/20 text-[#15171C]/50 dark:text-[#F6F4F0]/50 shrink-0">
                      {lang === 'en' ? 'In Dev' : '開発中'}
                    </span>
                  </div>
                </div>
              </div>

              {!submittedRecord ? (
                <form onSubmit={handleDownloadSubmit} className="space-y-4 pt-1" noValidate>
                  <p className="text-[#15171C]/80 dark:text-[#F6F4F0]/80 text-xs sm:text-sm">
                    {lang === 'en'
                      ? 'Enter your Name and Mail ID to download the Kaigi Lite installer.'
                      : 'お名前とメールアドレス（Mail ID）を入力して、Kaigi Liteインストーラーをダウンロードしてください。'}
                  </p>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg border border-[#C42F57]/40 bg-[#E8456B]/10 px-4 py-3 text-xs font-medium text-[#C42F57] dark:text-[#E8456B]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="dl-name"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75 mb-1.5"
                      >
                        {lang === 'en' ? 'Name *' : 'お名前 (Name) *'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#15171C]/40 dark:text-[#F6F4F0]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="dl-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={lang === 'en' ? 'e.g. Daniel Okafor' : '例: 山田 太郎'}
                          className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#15171C] pl-9 pr-3.5 py-2.5 text-sm text-[#15171C] dark:text-[#F6F4F0] placeholder:text-[#15171C]/40 dark:placeholder:text-[#F6F4F0]/40 focus:outline-none focus:border-[#E8456B]"
                        />
                      </div>
                    </div>

                    {/* Mail ID Field */}
                    <div>
                      <label
                        htmlFor="dl-email"
                        className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75 mb-1.5"
                      >
                        {lang === 'en' ? 'Mail ID *' : 'メールアドレス (Mail ID) *'}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#15171C]/40 dark:text-[#F6F4F0]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="dl-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={
                            lang === 'en'
                              ? 'e.g. daniel@northbridge.example'
                              : '例: yamada@example.com'
                          }
                          className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#15171C] pl-9 pr-3.5 py-2.5 text-sm text-[#15171C] dark:text-[#F6F4F0] placeholder:text-[#15171C]/40 dark:placeholder:text-[#F6F4F0]/40 focus:outline-none focus:border-[#E8456B]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] disabled:opacity-60 px-6 py-3 text-sm font-semibold text-white transition-colors cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {submitting
                          ? lang === 'en'
                            ? 'Starting Kaigi Lite download…'
                            : 'ダウンロードを準備中…'
                          : lang === 'en'
                          ? 'Download Kaigi Lite (Free)'
                          : 'Kaigi Lite (無料) をダウンロード'}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="rounded-xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#15171C] p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E8456B] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-base text-[#15171C] dark:text-[#F6F4F0]">
                        {lang === 'en'
                          ? 'Thank you — Kaigi Lite is ready to download'
                          : 'ありがとうございます — Kaigi Lite のダウンロード準備が整いました'}
                      </h4>
                      <p className="text-xs text-[#15171C]/70 dark:text-[#F6F4F0]/70">
                        {lang === 'en'
                          ? 'Your registration details have been recorded.'
                          : '登録情報が記録されました。'}
                      </p>
                    </div>
                  </div>

                  {/* Recorded Entry Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8 text-xs font-mono">
                    <div className="p-2.5 rounded bg-[#F6F4F0] dark:bg-[#1D2028]">
                      <div className="text-[10px] uppercase text-[#15171C]/50 dark:text-[#F6F4F0]/50">
                        NAME
                      </div>
                      <div className="font-semibold truncate mt-0.5">
                        {submittedRecord.record.name}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#F6F4F0] dark:bg-[#1D2028]">
                      <div className="text-[10px] uppercase text-[#15171C]/50 dark:text-[#F6F4F0]/50">
                        MAIL ID
                      </div>
                      <div className="font-semibold truncate mt-0.5">
                        {submittedRecord.record.email}
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#F6F4F0] dark:bg-[#1D2028]">
                      <div className="text-[10px] uppercase text-[#15171C]/50 dark:text-[#F6F4F0]/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> DATE & TIME
                      </div>
                      <div className="font-semibold mt-0.5 tabular-nums">
                        {submittedRecord.record.date} · {submittedRecord.record.time}
                      </div>
                    </div>
                  </div>

                  {/* Direct Google Drive Download Link */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    {submittedRecord.directDownloadUrl ? (
                      <a
                        href={submittedRecord.directDownloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-5 py-2.5 text-xs font-semibold text-white transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'en'
                            ? 'Download Kaigi Lite from Google Drive'
                            : 'Googleドライブから Kaigi Lite をダウンロード'}
                        </span>
                      </a>
                    ) : (
                      <div className="text-xs font-mono text-[#C42F57] dark:text-[#E8456B]">
                        {lang === 'en'
                          ? 'Kaigi Lite Link: [download link] (set your Google Drive URL below)'
                          : 'Kaigi Lite リンク: [download link]'}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={resetDownloadForm}
                      className="text-xs text-[#15171C]/60 dark:text-[#F6F4F0]/60 hover:underline px-2 py-1"
                    >
                      {lang === 'en' ? 'Back' : '戻る'}
                    </button>
                  </div>
                </div>
              )}

              {/* Discreet Static Owner Configuration Panel (Zero Firebase) */}
              <div className="pt-4 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10">
                <button
                  type="button"
                  onClick={() => setShowOwnerPanel((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#15171C]/55 dark:text-[#F6F4F0]/55 hover:text-[#C42F57] dark:hover:text-[#E8456B] transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'en'
                      ? 'Publisher / Owner Static Setup (No Firebase)'
                      : '管理者用 スタティック設定（Firebase不使用）'}
                  </span>
                </button>

                {showOwnerPanel && (
                  <div className="mt-3 rounded-xl border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#ECE8E0]/65 dark:bg-[#15171C] p-4 space-y-4">
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#C42F57] dark:text-[#E8456B]">
                        100% Static Lead Capture & Google Drive Links (Zero Firebase)
                      </h4>
                      <p className="text-xs text-[#15171C]/70 dark:text-[#F6F4F0]/70 mt-0.5">
                        Record every downloader&apos;s Name, Mail ID, Date &amp; Time without
                        Firebase using a Google Sheets Apps Script Webhook, email notification to{' '}
                        <code className="font-mono">sgb.dev.apps@gmail.com</code>, or local{' '}
                        <code className="font-mono">.xlsx</code> export.
                      </p>
                    </div>

                    <form onSubmit={handleSaveStaticSettings} className="space-y-3">
                      {/* Kaigi Lite Installer Drive Link */}
                      <div>
                        <label
                          htmlFor="owner-lite-drive-url"
                          className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75 mb-1"
                        >
                          Kaigi Lite Google Drive Installer Link
                        </label>
                        <div className="relative">
                          <Link2 className="w-3.5 h-3.5 text-[#15171C]/45 dark:text-[#F6F4F0]/45 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="owner-lite-drive-url"
                            type="url"
                            value={liteDriveUrlInput}
                            onChange={(e) => setLiteDriveUrlInput(e.target.value)}
                            placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                            className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] pl-8 pr-3 py-2 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                          />
                        </div>
                      </div>

                      {/* Google Sheets Apps Script Webhook URL (saves directly to Google Sheet without Firebase) */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <label
                            htmlFor="owner-sheet-webhook-url"
                            className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75"
                          >
                            Google Sheets Web App URL (Optional · Appends rows directly in Drive)
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowAppsScriptGuide((prev) => !prev)}
                            className="text-[11px] font-mono text-[#C42F57] dark:text-[#E8456B] hover:underline cursor-pointer"
                          >
                            {showAppsScriptGuide ? 'Hide 1-min script' : 'How to get this URL?'}
                          </button>
                        </div>
                        <input
                          id="owner-sheet-webhook-url"
                          type="url"
                          value={webhookUrlInput}
                          onChange={(e) => setWebhookUrlInput(e.target.value)}
                          placeholder="https://script.google.com/macros/s/.../exec"
                          className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] px-3 py-2 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                        />
                      </div>

                      {showAppsScriptGuide && (
                        <div className="rounded-lg border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#FDFCFA] dark:bg-[#1D2028] p-3 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">
                              Save directly to Google Sheets (Zero Firebase):
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyScript}
                              className="inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-mono bg-[#ECE8E0] dark:bg-[#15171C] hover:text-[#E8456B] cursor-pointer"
                            >
                              {copiedScript ? (
                                <>
                                  <Check className="w-3 h-3 text-[#E8456B]" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Script</span>
                                </>
                              )}
                            </button>
                          </div>
                          <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[#15171C]/80 dark:text-[#F6F4F0]/80">
                            <li>
                              Create a blank Google Sheet in your Google Drive named{' '}
                              <code className="font-mono">kaigi-downloads-log</code>.
                            </li>
                            <li>
                              Click <strong>Extensions → Apps Script</strong>, paste the script
                              below, and click <strong>Deploy → New deployment → Web app</strong>{' '}
                              (Who has access: <em>Anyone</em>).
                            </li>
                            <li>Paste the resulting Web App URL into the box above.</li>
                          </ol>
                          <pre className="p-2 rounded bg-[#15171C] text-[#F6F4F0] font-mono text-[10px] overflow-x-auto">
                            {GOOGLE_APPS_SCRIPT_SNIPPET}
                          </pre>
                        </div>
                      )}

                      {/* Demo Video Links */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label
                            htmlFor="owner-demo-eng-url"
                            className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#15171C]/65 dark:text-[#F6F4F0]/65 mb-1"
                          >
                            Demo Video (_ENG) Drive Link
                          </label>
                          <input
                            id="owner-demo-eng-url"
                            type="text"
                            value={demoEngUrlInput}
                            onChange={(e) => setDemoEngUrlInput(e.target.value)}
                            placeholder="https://drive.google.com/file/d/... (_ENG)"
                            className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] px-3 py-1.5 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="owner-demo-ja-url"
                            className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#15171C]/65 dark:text-[#F6F4F0]/65 mb-1"
                          >
                            Demo Video (_JA) Drive Link
                          </label>
                          <input
                            id="owner-demo-ja-url"
                            type="text"
                            value={demoJaUrlInput}
                            onChange={(e) => setDemoJaUrlInput(e.target.value)}
                            placeholder="https://drive.google.com/file/d/... (_JA)"
                            className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] px-3 py-1.5 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                          />
                        </div>
                      </div>

                      {/* Email notification checkbox */}
                      <label className="flex items-center gap-2 text-xs cursor-pointer select-none pt-1">
                        <input
                          type="checkbox"
                          checked={notifyEmailEnabled}
                          onChange={(e) => setNotifyEmailEnabled(e.target.checked)}
                          className="accent-[#E8456B] rounded"
                        />
                        <span>
                          Also send each download entry (Name, Mail ID, Date, Time) via email to{' '}
                          <code className="font-mono">sgb.dev.apps@gmail.com</code>
                        </span>
                      </label>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={downloadLocalExcelWorkbook}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] px-3.5 py-2 text-xs font-semibold hover:border-[#E8456B] transition-colors cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-[#E8456B]" />
                          <span>
                            Download Local Excel Log ({ownerRecords.length})
                          </span>
                        </button>

                        <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-[#15171C] text-[#F6F4F0] dark:bg-[#F6F4F0] dark:text-[#15171C] text-xs font-semibold hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                        >
                          {linkSavedFeedback ? 'Saved ✓' : 'Save Static Settings'}
                        </button>
                      </div>
                    </form>

                    {/* Ready-to-Host Static ZIP Package Downloads */}
                    <div className="pt-3 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono text-[#15171C]/75 dark:text-[#F6F4F0]/75">
                        Export Website ZIP for Web Hosting:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => downloadZipPackage('kaigi-static-website-hosting.zip')}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Hosting ZIP (Ready to Upload)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadZipPackage('kaigi-full-source-project.zip')}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] px-3 py-1.5 text-xs font-medium hover:border-[#E8456B] transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#E8456B]" />
                          <span>Source Code ZIP</span>
                        </button>
                      </div>
                    </div>

                    {/* Owner-only preview table of recorded entries in this browser */}
                    {ownerRecords.length > 0 && (
                      <div className="max-h-36 overflow-y-auto rounded border border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA] dark:bg-[#1D2028]">
                        <table className="w-full text-left border-collapse text-[11px] font-mono">
                          <thead>
                            <tr className="border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/60 dark:bg-[#15171C] text-[#15171C]/70 dark:text-[#F6F4F0]/70">
                              <th className="py-1.5 px-2.5">Name</th>
                              <th className="py-1.5 px-2.5">Mail ID</th>
                              <th className="py-1.5 px-2.5">Date</th>
                              <th className="py-1.5 px-2.5">Time</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#15171C]/6 dark:divide-[#F6F4F0]/6">
                            {ownerRecords.map((r) => (
                              <tr key={r.id}>
                                <td className="py-1 px-2.5 truncate max-w-[120px]">{r.name}</td>
                                <td className="py-1 px-2.5 truncate max-w-[160px]">{r.email}</td>
                                <td className="py-1 px-2.5 tabular-nums">{r.date}</td>
                                <td className="py-1 px-2.5 tabular-nums">{r.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {type === 'guide' && (
            <>
              <div className="space-y-4">
                <div className="rounded-lg border border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA] dark:bg-[#15171C] p-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#C42F57] dark:text-[#E8456B] mb-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'en'
                        ? 'KEYBOARD-FIRST SHORTCUT REFERENCE'
                        : 'キーボードショートカット早見表'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>{lang === 'en' ? 'Global search anywhere' : '全体検索を開く'}</span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + K
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>{lang === 'en' ? 'Entry type: Info / Note' : 'エントリ種別: Info'}</span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + 1
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>
                        {lang === 'en' ? 'Entry type: Discussion' : 'エントリ種別: Discussion'}
                      </span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + 2 / d:
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>
                        {lang === 'en' ? 'Entry type: Decision' : 'エントリ種別: Decision'}
                      </span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + 3 / dec:
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>{lang === 'en' ? 'Entry type: Action' : 'エントリ種別: Action'}</span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + 4 / a:
                      </kbd>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#15171C]/6 dark:border-[#F6F4F0]/6">
                      <span>
                        {lang === 'en' ? 'Paste screenshot attachment' : 'クリップボード画像を添付'}
                      </span>
                      <kbd className="font-mono px-1.5 py-0.5 rounded bg-[#ECE8E0] dark:bg-[#252934]">
                        Ctrl + V
                      </kbd>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-[#15171C]/80 dark:text-[#F6F4F0]/80">
                  <p>
                    <strong>
                      1. {lang === 'en' ? 'Set up your directory once:' : '最初に名簿とプロジェクトを設定：'}
                    </strong>{' '}
                    {lang === 'en'
                      ? 'Import people and organisations from Excel/CSV or add them in People. Assign project roles and toggle Distribution for everyone who should receive the issued minutes.'
                      : 'People画面でExcel/CSVから連絡先を取り込み、プロジェクトメンバーの役割と配布対象（Distribution）を設定します。'}
                  </p>
                  <p>
                    <strong>
                      2. {lang === 'en' ? 'Run the meeting cycle:' : '定例サイクルの実行：'}
                    </strong>{' '}
                    {lang === 'en'
                      ? 'Create a meeting in your series (Draft → Agenda). Carry-forward items from earlier meetings are added automatically under Section 1 (Matters arising).'
                      : 'シリーズ内で新しい会議を作成すると、前回の未完了アクションと課題が「1 Matters arising」に自動で引き継がれます。'}
                  </p>
                  <p>
                    <strong>
                      3. {lang === 'en' ? 'Approve and distribute:' : '承認と配布：'}
                    </strong>{' '}
                    {lang === 'en'
                      ? 'Click "Approve minutes" to lock the meeting and generate Revision 0 PDF. Need to amend later? Reopen with a recorded reason to issue Rev 1 while keeping Rev 0 intact.'
                      : '「Approve minutes」で議事録をロックしてRev 0のPDFを発行します。後から訂正する場合は理由を記録して再オープンし、Rev 0を残したままRev 1を発行できます。'}
                  </p>
                </div>
              </div>
            </>
          )}

          {type === 'privacy' && (
            <div className="space-y-3 text-xs text-[#15171C]/80 dark:text-[#F6F4F0]/80">
              <p>
                {lang === 'en'
                  ? 'Kaigi is built on a strict local-first architecture by SGB Dev Apps. Unlike browser-based meeting bots or SaaS transcription clouds, Kaigi operates entirely inside your Windows user profile.'
                  : 'KaigiはSGB Dev Appsによる厳格なローカルファースト設計で構築されています。クラウド型の議事録サービスとは異なり、すべての処理と保存がお使いのWindows PC内で完結します。'}
              </p>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <strong>{lang === 'en' ? 'Zero Cloud Storage:' : 'クラウド保存ゼロ：'}</strong>{' '}
                  {lang === 'en'
                    ? 'Your SQLite database, attached drawings, photos, and generated PDFs reside in one folder on your PC.'
                    : 'データベース、添付図面・写真、発行済みPDFのすべてがPC内の1つのローカルフォルダに保存されます。'}
                </li>
                <li>
                  <strong>
                    {lang === 'en' ? 'Zero Outbound Email Transmission:' : '勝手なメール送信なし：'}
                  </strong>{' '}
                  {lang === 'en'
                    ? 'Kaigi never connects to SMTP or sends messages behind the scenes. It prepares a local draft in your mail client so you remain in full control.'
                    : 'Kaigiがバックグラウンドでメールサーバーに接続して送信することはありません。お使いのメールアプリで下書きを開くだけです。'}
                </li>
                <li>
                  <strong>
                    {lang === 'en' ? 'Local-Only AI (Coming in v1.0):' : '完全ローカルAI（v1.0予定）：'}
                  </strong>{' '}
                  {lang === 'en'
                    ? 'All transcription and Q&A models run on your PC hardware offline, and can be disabled completely in Settings.'
                    : '文字起こしや議事録Q&Aモデルもインターネット不要でPC上で動作し、設定から完全に無効化できます。'}
                </li>
              </ul>
              <p className="pt-2 text-[#15171C]/65 dark:text-[#F6F4F0]/65">
                {lang === 'en'
                  ? 'Privacy & security inquiries: '
                  : 'プライバシーに関するお問い合わせ: '}
                <a
                  href="mailto:sgb.dev.apps@gmail.com"
                  className="font-mono underline underline-offset-4 hover:text-[#C42F57] dark:hover:text-[#E8456B]"
                >
                  sgb.dev.apps@gmail.com
                </a>
              </p>
            </div>
          )}

          {type === 'video' && (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-lg border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-white">
                <video
                  src={SCREENSHOTS.introVideo}
                  controls
                  autoPlay
                  playsInline
                  onEnded={() => {
                    onClose();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full h-auto block"
                />
              </div>
              <p className="text-xs text-[#15171C]/70 dark:text-[#F6F4F0]/70">
                {lang === 'en'
                  ? 'Playing SGB Dev Apps intro — returns to the home page automatically when finished.'
                  : 'SGB Dev Apps イントロ映像再生中 — 再生終了後、自動的にホームページへ戻ります。'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/50 dark:bg-[#15171C]/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-[#15171C] text-[#F6F4F0] dark:bg-[#F6F4F0] dark:text-[#15171C] hover:opacity-90 transition-opacity"
          >
            {lang === 'en' ? 'Close' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
};
