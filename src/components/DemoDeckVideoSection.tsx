import React, { useState, useEffect } from 'react';
import { Play, Film, ExternalLink, Link2, CheckCircle2 } from 'lucide-react';
import { Language } from '../data/kaigiContent';
import { spotlightCardProps } from '../utils/spotlightCard';
import {
  getStaticConfig,
  saveStaticConfig,
  extractGoogleDriveFileId,
  toGoogleDriveEmbedPreviewUrl,
  toGoogleDriveDirectDownloadUrl,
} from '../utils/staticStorage';

interface DemoDeckVideoSectionProps {
  lang: Language;
}

export const DemoDeckVideoSection: React.FC<DemoDeckVideoSectionProps> = ({ lang }) => {
  const [selectedVideoLang, setSelectedVideoLang] = useState<Language>(lang);
  const [playerMode, setPlayerMode] = useState<'embed' | 'direct'>('embed');
  const [engUrl, setEngUrl] = useState('');
  const [jaUrl, setJaUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync video language when top-bar EN / 日本語 toggle changes
  useEffect(() => {
    setSelectedVideoLang(lang);
  }, [lang]);

  // Load saved static config on mount & listen for updates
  useEffect(() => {
    const load = () => {
      const cfg = getStaticConfig();
      setEngUrl(cfg.demoEngDriveUrl);
      setJaUrl(cfg.demoJaDriveUrl);
    };
    load();
    window.addEventListener('kaigi-static-config-updated', load);
    return () => window.removeEventListener('kaigi-static-config-updated', load);
  }, []);

  const rawActiveUrl = selectedVideoLang === 'en' ? engUrl : jaUrl;
  const activeFileId = extractGoogleDriveFileId(rawActiveUrl);
  const activeEmbedUrl = toGoogleDriveEmbedPreviewUrl(rawActiveUrl);
  const activeDirectUrl = toGoogleDriveDirectDownloadUrl(rawActiveUrl);
  const hasActiveVideo = Boolean(rawActiveUrl.trim());

  const handleSaveVideoLinks = (e: React.FormEvent) => {
    e.preventDefault();
    saveStaticConfig({
      demoEngDriveUrl: engUrl.trim(),
      demoJaDriveUrl: jaUrl.trim(),
    });
    setSavedNotice(true);
    setShowLinkInput(false);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <section
      id="demo-video"
      aria-labelledby="demo-video-heading"
      className="py-16 sm:py-24 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA]/60 dark:bg-[#181A20]/70"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Language Track Selector (_ENG / _JA) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
              {lang === 'en'
                ? 'VIDEO WALKTHROUGH · DIRECT FROM GOOGLE DRIVE'
                : 'デモデッキ動画 · GOOGLEドライブから直接再生'}
            </p>
            <h2
              id="demo-video-heading"
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
            >
              {lang === 'en'
                ? 'Watch the Kaigi presentation deck in English or Japanese.'
                : 'Kaigi プレゼンテーション動画を英語（_ENG）・日本語（_JA）で再生。'}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
              {lang === 'en'
                ? 'Streamed directly from the kaigi/demo decks folder on Google Drive. Switch between the English (_ENG) and Japanese (_JA) editions below.'
                : 'Googleドライブの「kaigi/demo decks」フォルダに保存されている英語版（_ENG）と日本語版（_JA）のPPT動画を直接再生します。'}
            </p>
          </div>

          {/* Interactive _ENG / _JA Video Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Select demo video language"
              className="inline-flex items-center p-1 rounded-xl bg-[#ECE8E0] dark:bg-[#1D2028] border border-[#15171C]/10 dark:border-[#F6F4F0]/10"
            >
              <button
                type="button"
                onClick={() => setSelectedVideoLang('en')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedVideoLang === 'en'
                    ? 'bg-[#E8456B] text-white shadow-xs'
                    : 'text-[#15171C]/75 dark:text-[#F6F4F0]/75 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                <span className="font-mono mr-1.5">_ENG</span>
                <span>{lang === 'en' ? 'English Deck' : '英語版動画'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVideoLang('ja')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedVideoLang === 'ja'
                    ? 'bg-[#E8456B] text-white shadow-xs'
                    : 'text-[#15171C]/75 dark:text-[#F6F4F0]/75 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                <span className="font-mono mr-1.5">_JA</span>
                <span>{lang === 'en' ? 'Japanese Deck (日本語)' : '日本語版動画'}</span>
              </button>
            </div>

            {hasActiveVideo && (
              <div
                role="group"
                aria-label="Player mode"
                className="inline-flex items-center p-1 rounded-xl bg-[#ECE8E0] dark:bg-[#1D2028] border border-[#15171C]/10 dark:border-[#F6F4F0]/10 text-xs"
              >
                <button
                  type="button"
                  onClick={() => setPlayerMode('embed')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    playerMode === 'embed'
                      ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-2xs'
                      : 'text-[#15171C]/65 dark:text-[#F6F4F0]/65'
                  }`}
                >
                  {lang === 'en' ? 'Drive Player' : 'Driveプレイヤー'}
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerMode('direct')}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    playerMode === 'direct'
                      ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-2xs'
                      : 'text-[#15171C]/65 dark:text-[#F6F4F0]/65'
                  }`}
                >
                  {lang === 'en' ? 'HTML5 Video' : '直接再生'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Windows 11 Style Video Player Frame */}
        <div
          {...spotlightCardProps}
          className="spotlight-surface overflow-hidden rounded-2xl border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#FDFCFA] dark:bg-[#1D2028] shadow-[0_20px_50px_-15px_rgba(21,23,28,0.16)]"
        >
          {/* Window Title Bar */}
          <div className="flex items-center justify-between border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#EFECE6] dark:bg-[#15171C] px-4 py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#E8456B] text-[10px] font-bold text-white font-display">
                <Play className="w-2.5 h-2.5 fill-current" />
              </span>
              <span className="truncate font-mono text-xs text-[#15171C]/80 dark:text-[#F6F4F0]/80">
                kaigi / demo decks /{' '}
                {selectedVideoLang === 'en' ? 'Kaigi_Demo_ENG.mp4' : 'Kaigi_Demo_JA.mp4'}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowLinkInput((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-mono font-medium text-[#C42F57] dark:text-[#E8456B] hover:bg-[#E8456B]/10 transition-colors cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>
                  {lang === 'en' ? 'Set Drive Video Links' : 'Drive動画リンク設定'}
                </span>
              </button>

              {rawActiveUrl && (
                <a
                  href={rawActiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#15171C]/65 dark:text-[#F6F4F0]/65 hover:text-[#E8456B]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Drive</span>
                </a>
              )}
            </div>
          </div>

          {/* Collapsible Static Google Drive Link Bar */}
          {showLinkInput && (
            <form
              onSubmit={handleSaveVideoLinks}
              className="p-4 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/60 dark:bg-[#181A20] space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="static-eng-video-url"
                    className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75 mb-1"
                  >
                    English PPT Video (_ENG) Google Drive Share Link
                  </label>
                  <input
                    id="static-eng-video-url"
                    type="text"
                    value={engUrl}
                    onChange={(e) => setEngUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#15171C] px-3 py-2 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="static-ja-video-url"
                    className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#15171C]/75 dark:text-[#F6F4F0]/75 mb-1"
                  >
                    Japanese PPT Video (_JA) Google Drive Share Link
                  </label>
                  <input
                    id="static-ja-video-url"
                    type="text"
                    value={jaUrl}
                    onChange={(e) => setJaUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    className="w-full rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#15171C] px-3 py-2 text-xs font-mono text-[#15171C] dark:text-[#F6F4F0] focus:outline-none focus:border-[#E8456B]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#15171C]/65 dark:text-[#F6F4F0]/65">
                  {lang === 'en'
                    ? 'Tip: In Google Drive, right-click the _ENG and _JA video files → Share → "Anyone with the link" → Copy link.'
                    : 'ヒント: Googleドライブで _ENG と _JA 動画を右クリック → 共有 →「リンクを知っている全員」に設定してリンクを貼り付けてください。'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] text-white text-xs font-semibold cursor-pointer shrink-0"
                >
                  {lang === 'en' ? 'Save Video Links' : '保存する'}
                </button>
              </div>
            </form>
          )}

          {/* Video Viewport */}
          {hasActiveVideo ? (
            <div className="relative aspect-video w-full bg-[#15171C]">
              {playerMode === 'embed' && activeFileId ? (
                <iframe
                  key={`${selectedVideoLang}-${activeEmbedUrl}`}
                  src={activeEmbedUrl}
                  title={selectedVideoLang === 'en' ? 'Kaigi Demo Deck (_ENG)' : 'Kaigi Demo Deck (_JA)'}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <video
                  key={`${selectedVideoLang}-${activeDirectUrl}`}
                  src={activeDirectUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          ) : (
            <div className="aspect-video w-full bg-[#15171C] text-[#F6F4F0] flex flex-col items-center justify-center p-6 sm:p-12 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8456B]/15 text-[#E8456B] mb-4">
                <Film className="w-7 h-7" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold max-w-lg">
                {lang === 'en'
                  ? `${selectedVideoLang === 'en' ? 'English (_ENG)' : 'Japanese (_JA)'} PPT Demo Video`
                  : `${selectedVideoLang === 'en' ? '英語版 (_ENG)' : '日本語版 (_JA)'} PPTデモ動画`}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#F6F4F0]/70 max-w-xl leading-relaxed">
                {lang === 'en'
                  ? 'Paste your shared Google Drive file link for the _ENG and _JA videos (from kaigi/demo decks) to play them directly on this static page — no Firebase or login required.'
                  : 'Googleドライブ「kaigi/demo decks」内の _ENG / _JA 動画の共有リンクを設定すると、ログイン不要で直接再生されます。'}
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowLinkInput(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  <Link2 className="w-4 h-4" />
                  <span>
                    {lang === 'en'
                      ? 'Paste Google Drive Video Links (_ENG & _JA)'
                      : 'Googleドライブ動画リンク (_ENG / _JA) を設定'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {savedNotice && (
            <div className="px-4 py-2.5 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/50 dark:bg-[#15171C] flex items-center gap-2 text-xs font-mono text-[#C42F57] dark:text-[#E8456B]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Saved Google Drive demo video links.'
                  : 'Googleドライブのデモ動画リンクを保存しました。'}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
