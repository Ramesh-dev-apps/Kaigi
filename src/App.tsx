/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  ArrowRight,
  Sun,
  Moon,
  ChevronDown,
  Check,
  ShieldCheck,
  HardDrive,
  WifiOff,
  Cpu,
  MailCheck,
  FileLock2,
  BookOpen,
  Play,
  Menu,
  X,
} from 'lucide-react';
import {
  Language,
  SCREENSHOTS,
  BUILT_FOR_TABS,
  FAQ_ITEMS,
  UI_COPY,
} from './data/kaigiContent';
import { WindowsAppFrame } from './components/WindowsAppFrame';
import { FeatureTourSection } from './components/FeatureTourSection';
import { EditionsSection } from './components/EditionsSection';
import { DemoDeckVideoSection } from './components/DemoDeckVideoSection';
import { LightboxModal, InfoModal, InfoModalType } from './components/Modals';
import { spotlightCardProps } from './utils/spotlightCard';
import { downloadZipPackage } from './utils/staticStorage';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeHowStep, setActiveHowStep] = useState<number>(0);
  const [activeBuiltForTab, setActiveBuiltForTab] = useState<string>(BUILT_FOR_TABS[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showExportBar, setShowExportBar] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.hostname.includes('run.app') ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );
  });
  const [downloadingZip, setDownloadingZip] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const t = UI_COPY[lang];

  const handleZipDownload = async (filename: string) => {
    setDownloadingZip(filename);
    await downloadZipPackage(filename);
    setDownloadingZip(null);
  };

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Sync document language attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Performant mouse cursor flashlight / spotlight tracker using rAF & CSS variables
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (rafRef.current !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafRef.current = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
        rafRef.current = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const openZoom = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
  };

  const currentBuiltFor =
    BUILT_FOR_TABS.find((tab) => tab.id === activeBuiltForTab) || BUILT_FOR_TABS[0];

  const privacyIcons = [WifiOff, ShieldCheck, HardDrive, Cpu, MailCheck, FileLock2];

  return (
    <div className="min-h-screen relative bg-[#F6F4F0] text-[#15171C] dark:bg-[#15171C] dark:text-[#F6F4F0] transition-colors duration-200 architectural-grid">
      {/* Subtle Cursor Flashlight / Spotlight Overlay */}
      <div className="flashlight-overlay" aria-hidden="true" />

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#E8456B] focus:text-white focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Top Publisher Export Bar (Visible in AI Studio Preview for 1-click ZIP download) */}
      {showExportBar && (
        <div className="relative z-50 bg-[#15171C] text-[#F6F4F0] border-b border-[#E8456B]/40 px-4 py-2.5">
          <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E8456B]" />
              <span className="font-semibold text-[#F6F4F0]">
                STATIC WEBSITE EXPORT READY (NO FIREBASE):
              </span>
              <span className="text-[#F6F4F0]/70 hidden sm:inline">
                Download your ready-to-upload static hosting ZIP or full React source code below.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleZipDownload('kaigi-static-website-hosting.zip')}
                disabled={downloadingZip !== null}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingZip === 'kaigi-static-website-hosting.zip'
                    ? 'Downloading Hosting ZIP…'
                    : 'Download Hosting ZIP (3.87 MB)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleZipDownload('kaigi-full-source-project.zip')}
                disabled={downloadingZip !== null}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F6F4F0]/25 bg-[#1D2028] hover:border-[#E8456B] px-3 py-1.5 text-xs font-medium text-[#F6F4F0] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#E8456B]" />
                <span>
                  {downloadingZip === 'kaigi-full-source-project.zip'
                    ? 'Downloading Source ZIP…'
                    : 'Download Source Code ZIP (3.66 MB)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowExportBar(false)}
                className="p-1 rounded text-[#F6F4F0]/60 hover:text-[#F6F4F0] hover:bg-[#F6F4F0]/10 transition-colors cursor-pointer"
                aria-label="Hide export bar"
                title="Hide export bar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          1. HEADER (Sticky)
         ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#F6F4F0]/90 dark:bg-[#15171C]/90 backdrop-blur-md">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Logo (plays SGB_short_video.mp4 & returns to home page) & Kaigi Wordmark */}
          <button
            type="button"
            onClick={() => setInfoModal('video')}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8456B] rounded cursor-pointer"
            aria-label="Play SGB Dev Apps intro video and return to home page"
            title={lang === 'en' ? 'Click to play SGB Dev Apps intro video' : 'クリックして SGB Dev Apps イントロ映像を再生'}
          >
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1 border border-[#15171C]/10 shadow-2xs group-hover:border-[#E8456B] transition-colors">
              <img
                src={SCREENSHOTS.logo}
                alt="SGB Dev Apps"
                referrerPolicy="no-referrer"
                className="h-5 w-auto object-contain"
              />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0]">
              Kaigi <span className="font-normal text-sm opacity-65">会議</span>
            </span>
          </button>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#15171C]/80 dark:text-[#F6F4F0]/80"
          >
            <a
              href="#features"
              className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navFeatures}
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navHowItWorks}
            </a>
            <a
              href="#editions"
              className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navEditions}
            </a>
            <a
              href="#faq"
              className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.navFaq}
            </a>
          </nav>

          {/* Zone 3: Language Toggle EN / 日本語, Theme Switch, and Download Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Toggle EN / 日本語 */}
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex items-center rounded-lg p-0.5 bg-[#ECE8E0] dark:bg-[#1D2028] border border-[#15171C]/10 dark:border-[#F6F4F0]/10"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-2xs'
                    : 'text-[#15171C]/65 dark:text-[#F6F4F0]/65 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ja')}
                aria-pressed={lang === 'ja'}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'ja'
                    ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-2xs'
                    : 'text-[#15171C]/65 dark:text-[#F6F4F0]/65 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                日本語
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#15171C]/12 dark:border-[#F6F4F0]/15 bg-[#FDFCFA] dark:bg-[#1D2028] text-[#15171C] dark:text-[#F6F4F0] hover:border-[#E8456B] transition-colors shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#E8456B]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Download CTA */}
            <button
              type="button"
              onClick={() => setInfoModal('download')}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-4 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadBtn}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#15171C]/12 dark:border-[#F6F4F0]/15 bg-[#FDFCFA] dark:bg-[#1D2028]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#F6F4F0] dark:bg-[#15171C] px-4 py-4 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E8456B]"
              >
                {t.navFeatures}
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E8456B]"
              >
                {t.navHowItWorks}
              </a>
              <a
                href="#editions"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E8456B]"
              >
                {t.navEditions}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#E8456B]"
              >
                {t.navFaq}
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setInfoModal('download');
              }}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8456B] px-4 py-2.5 text-xs font-semibold text-white"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.heroPrimaryCta}</span>
            </button>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* =====================================================================
            2. HERO SECTION
           ===================================================================== */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Architectural spine metadata bar inspired by web_style.jpg */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 text-xs font-mono">
              <span className="font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                {t.heroEyebrow}
              </span>
              <span className="text-[#15171C]/60 dark:text-[#F6F4F0]/60">
                SGB DEV APPS · LOCAL DESKTOP ARCHITECTURE
              </span>
            </div>

            {/* Hero Copy & CTAs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
              <div className="lg:col-span-7">
                <h1 className="font-display text-[clamp(2.25rem,4.2vw,3.75rem)] font-bold tracking-tight leading-[1.08] text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]">
                  {t.heroHeadline}
                </h1>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <p className="text-base sm:text-lg text-[#15171C]/80 dark:text-[#F6F4F0]/80 leading-relaxed">
                  {t.heroSub}
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInfoModal('download')}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-5 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.heroPrimaryCta}</span>
                    </button>

                    <a
                      href="#how-it-works"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] hover:border-[#15171C]/40 dark:hover:border-[#F6F4F0]/40 px-5 py-3 text-sm font-semibold text-[#15171C] dark:text-[#F6F4F0] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{t.heroSecondaryCta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Trust line (unboxed clean metadata with middot separators) */}
                  <p className="font-mono text-xs text-[#15171C]/65 dark:text-[#F6F4F0]/65">
                    {t.heroTrustLine}
                  </p>
                </div>
              </div>
            </div>

            {/* Large Dashboard Screenshot in Windows App Frame */}
            <div className="mt-6">
              <WindowsAppFrame
                src={SCREENSHOTS.dashboard}
                alt="Kaigi Dashboard showing overdue actions, open issues by status, 67% completion rate, 89% attendance rate, upcoming meetings, and recent decisions"
                caption={
                  lang === 'en'
                    ? 'Kaigi Dashboard — overdue tasks, open issues by status and ball in court, completion and attendance rates, upcoming meetings, and recent decisions.'
                    : 'Kaigi ダッシュボード — 期限切れタスク、ステータス・ボール保持者別の課題、完了率・出席率、今後の会議、直近の決定事項を一画面に集約。'
                }
                windowTitle="Kaigi — Dashboard · PL27 Product Launch 2027 (Local PC)"
                onZoom={openZoom}
                priority
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. AT A GLANCE STRIP (Plain facts, no fake metrics)
           ===================================================================== */}
        <section
          aria-label="At a glance facts"
          className="border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/70 dark:bg-[#1A1D24]"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-6 font-mono text-xs sm:text-sm font-medium text-[#15171C] dark:text-[#F6F4F0]">
              {t.glanceItems.map((fact, idx) => (
                <React.Fragment key={idx}>
                  <span className="tracking-tight">{fact}</span>
                  {idx < t.glanceItems.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="text-[#C42F57] dark:text-[#E8456B] font-bold"
                    >
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. THE PROBLEM (3 short cards)
           ===================================================================== */}
        <section
          aria-labelledby="problem-heading"
          className="py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                {t.problemEyebrow}
              </p>
              <h2
                id="problem-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
              >
                {t.problemHeadline}
              </h2>
              <p className="mt-3 text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
                {t.problemSub}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.problemCards.map((card) => (
                <article
                  key={card.num}
                  {...spotlightCardProps}
                  className="spotlight-surface flex flex-col justify-between rounded-2xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#1A1D24] p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(232,69,107,0.14)]"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#C42F57] dark:text-[#E8456B] tabular-nums">
                      {card.num}.
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#15171C] dark:text-[#F6F4F0]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
                      {card.body}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8 text-xs font-medium text-[#15171C] dark:text-[#F6F4F0]">
                    {card.contrast}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. HOW IT WORKS (5-step horizontal timeline, exact order)
           ===================================================================== */}
        <section
          id="how-it-works"
          aria-labelledby="how-heading"
          className="py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/45 dark:bg-[#181A20]"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                {t.howEyebrow}
              </p>
              <h2
                id="how-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
              >
                {t.howHeadline}
              </h2>
              <p className="mt-3 text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75">
                {t.howSub}
              </p>
            </div>

            {/* 5-Step Horizontal Timeline */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
              {t.howSteps.map((s, idx) => {
                const isSelected = activeHowStep === idx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveHowStep(idx)}
                    {...spotlightCardProps}
                    className={`spotlight-surface group text-left rounded-xl p-5 border transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-[#E8456B] bg-[#FDFCFA] dark:bg-[#1D2028] shadow-sm'
                        : 'border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA]/70 dark:bg-[#1A1D24]/70 hover:border-[#15171C]/25 dark:hover:border-[#F6F4F0]/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-xs font-bold uppercase tracking-wider tabular-nums ${
                            isSelected
                              ? 'text-[#C42F57] dark:text-[#E8456B]'
                              : 'text-[#15171C]/50 dark:text-[#F6F4F0]/50'
                          }`}
                        >
                          0{idx + 1} · {s.step}
                        </span>
                        {idx < 4 && (
                          <ArrowRight
                            aria-hidden="true"
                            className={`hidden md:block w-3.5 h-3.5 transition-transform ${
                              isSelected
                                ? 'text-[#E8456B] translate-x-0.5'
                                : 'text-[#15171C]/30 dark:text-[#F6F4F0]/30'
                            }`}
                          />
                        )}
                      </div>

                      <h3 className="mt-2.5 font-display text-base font-bold text-[#15171C] dark:text-[#F6F4F0]">
                        {s.title}
                      </h3>

                      <p className="mt-2 text-xs text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8 flex items-center justify-between text-[11px] font-mono">
                      <span
                        className={
                          isSelected
                            ? 'text-[#C42F57] dark:text-[#E8456B] font-semibold'
                            : 'text-[#15171C]/45 dark:text-[#F6F4F0]/45'
                        }
                      >
                        {isSelected
                          ? lang === 'en'
                            ? 'Active preview below'
                            : '下にプレビュー表示中'
                          : lang === 'en'
                          ? 'Preview screen'
                          : '画面を見る'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Timeline Step Screenshot Preview */}
            <div className="mt-8">
              <WindowsAppFrame
                src={t.howSteps[activeHowStep].screenshot}
                alt={`${t.howSteps[activeHowStep].step}: ${t.howSteps[activeHowStep].title}`}
                caption={`${t.howSteps[activeHowStep].step} — ${t.howSteps[activeHowStep].title}: ${t.howSteps[activeHowStep].desc}`}
                windowTitle={`Kaigi — ${t.howSteps[activeHowStep].step}: ${t.howSteps[activeHowStep].title}`}
                onZoom={openZoom}
              />
            </div>
          </div>
        </section>

        {/* =====================================================================
            5B. GOOGLE DRIVE DEMO DECK VIDEOS (_ENG & _JA from kaigi/demo decks)
           ===================================================================== */}
        <DemoDeckVideoSection lang={lang} />

        {/* =====================================================================
            6. FULL FEATURE TOUR (All 23 Modules)
           ===================================================================== */}
        <FeatureTourSection lang={lang} onZoom={openZoom} />

        {/* =====================================================================
            7. PRIVACY BAND (Dark Ink #15171C Background)
           ===================================================================== */}
        <section
          aria-labelledby="privacy-heading"
          className="py-20 sm:py-28 bg-[#15171C] text-[#F6F4F0] border-b border-[#F6F4F0]/10"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#E8456B]">
                {t.privacyEyebrow}
              </p>
              <h2
                id="privacy-heading"
                className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F4F0] [text-wrap:balance]"
              >
                {t.privacyHeadline}
              </h2>
              <p className="mt-3 text-base text-[#F6F4F0]/75 leading-relaxed">
                {t.privacySub}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.privacyPoints.map((pt, idx) => {
                const IconComponent = privacyIcons[idx % privacyIcons.length];
                return (
                  <div
                    key={idx}
                    {...spotlightCardProps}
                    className="spotlight-surface rounded-2xl border border-[#F6F4F0]/12 bg-[#1D2028] p-6 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8456B]/15 text-[#E8456B]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#F6F4F0] tracking-wide">
                      {pt.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#F6F4F0]/75 leading-relaxed">
                      {pt.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            8. BUILT FOR (3 Tabs with a Screenshot Each)
           ===================================================================== */}
        <section
          aria-labelledby="built-for-heading"
          className="py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10"
        >
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                  {t.builtForEyebrow}
                </p>
                <h2
                  id="built-for-heading"
                  className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
                >
                  {t.builtForHeadline}
                </h2>
              </div>

              {/* 3 Interactive Tabs */}
              <div
                role="tablist"
                aria-label="Use cases"
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#ECE8E0] dark:bg-[#1D2028] border border-[#15171C]/10 dark:border-[#F6F4F0]/10"
              >
                {BUILT_FOR_TABS.map((tab) => {
                  const isActive = activeBuiltForTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveBuiltForTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-[#E8456B] text-white shadow-xs'
                          : 'text-[#15171C]/75 dark:text-[#F6F4F0]/75 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                      }`}
                    >
                      {tab.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tab Content Panel */}
            <div
              role="tabpanel"
              {...spotlightCardProps}
              className="spotlight-surface mt-10 rounded-2xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#1A1D24] p-6 sm:p-10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-15px_rgba(232,69,107,0.14)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C42F57] dark:text-[#E8456B]">
                    {currentBuiltFor.eyebrow[lang]}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]">
                    {currentBuiltFor.headline[lang]}
                  </h3>
                  <p className="text-sm sm:text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
                    {currentBuiltFor.description[lang]}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {currentBuiltFor.bullets[lang].map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-[#15171C]/85 dark:text-[#F6F4F0]/85 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8456B]/15 text-[#C42F57] dark:text-[#E8456B]"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <WindowsAppFrame
                    src={currentBuiltFor.screenshot}
                    alt={currentBuiltFor.label[lang]}
                    caption={currentBuiltFor.caption[lang]}
                    windowTitle={`Kaigi — ${currentBuiltFor.label.en}`}
                    onZoom={openZoom}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. EDITIONS (Two Cards + 23-Module Comparison Table)
           ===================================================================== */}
        <EditionsSection lang={lang} onDownloadClick={() => setInfoModal('download')} />

        {/* =====================================================================
            10. FAQ (Accordion)
           ===================================================================== */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                {t.faqEyebrow}
              </p>
              <h2
                id="faq-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
              >
                {t.faqHeadline}
              </h2>
            </div>

            <div className="mt-12 divide-y divide-[#15171C]/10 dark:divide-[#F6F4F0]/10 rounded-2xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#1A1D24] overflow-hidden">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="transition-colors">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-display text-base sm:text-lg font-semibold text-[#15171C] dark:text-[#F6F4F0] hover:bg-[#ECE8E0]/40 dark:hover:bg-[#F6F4F0]/5 transition-colors cursor-pointer"
                      >
                        <span>{item.q[lang]}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 text-[#C42F57] dark:text-[#E8456B] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm sm:text-base text-[#15171C]/80 dark:text-[#F6F4F0]/80 leading-relaxed">
                        {item.a[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            11. FINAL CALL TO ACTION
           ===================================================================== */}
        <section
          id="download"
          aria-labelledby="final-cta-heading"
          className="py-20 sm:py-28 bg-[#ECE8E0]/60 dark:bg-[#181A20]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
              {t.finalCtaEyebrow}
            </p>
            <h2
              id="final-cta-heading"
              className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
            >
              {t.finalCtaHeadline}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#15171C]/75 dark:text-[#F6F4F0]/75 max-w-2xl mx-auto leading-relaxed">
              {t.finalCtaSub}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setInfoModal('download')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8456B] hover:bg-[#C42F57] px-6 py-3.5 text-sm sm:text-base font-semibold text-white transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.heroPrimaryCta}</span>
              </button>

              <button
                type="button"
                onClick={() => setInfoModal('guide')}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/20 bg-[#FDFCFA] dark:bg-[#1D2028] hover:border-[#E8456B] px-5 py-3.5 text-sm sm:text-base font-semibold text-[#15171C] dark:text-[#F6F4F0] transition-colors whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#E8456B]" />
                <span>{t.readUserGuide}</span>
              </button>
            </div>

            <div className="mt-5 font-mono text-xs text-[#15171C]/60 dark:text-[#F6F4F0]/60">
              <span>Installer: [download link]</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Windows 10/11 (64-bit)</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>Pro licence: [price]</span>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          12. FOOTER
         ===================================================================== */}
      <footer className="border-t border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#F6F4F0] dark:bg-[#15171C] py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Logo & Copyright */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1 border border-[#15171C]/10 shadow-2xs">
                <img
                  src={SCREENSHOTS.logo}
                  alt="SGB Dev Apps"
                  referrerPolicy="no-referrer"
                  className="h-5 w-auto object-contain"
                />
              </span>
              <div className="text-sm text-[#15171C]/80 dark:text-[#F6F4F0]/80">
                <span className="font-semibold text-[#15171C] dark:text-[#F6F4F0]">
                  Kaigi (会議)
                </span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>{t.footerCopyright}</span>
              </div>
              <button
                type="button"
                onClick={() => setInfoModal('video')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C42F57] dark:text-[#E8456B] hover:underline cursor-pointer"
              >
                <Play className="w-3 h-3" />
                <span>{lang === 'en' ? 'SGB Dev Apps intro' : 'SGB Dev Apps 紹介映像'}</span>
              </button>
            </div>

            {/* Links & Made for Windows */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#15171C]/75 dark:text-[#F6F4F0]/75">
              <button
                type="button"
                onClick={() => setInfoModal('guide')}
                className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 cursor-pointer"
              >
                {t.footerUserGuide}
              </button>
              <button
                type="button"
                onClick={() => setInfoModal('privacy')}
                className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 cursor-pointer"
              >
                {t.footerPrivacy}
              </button>
              <a
                href="mailto:sgb.dev.apps@gmail.com"
                className="hover:text-[#C42F57] dark:hover:text-[#E8456B] hover:underline underline-offset-4 font-mono"
              >
                {t.footerContact}
              </a>
              <span aria-hidden="true" className="opacity-40">·</span>
              <button
                type="button"
                onClick={() => handleZipDownload('kaigi-static-website-hosting.zip')}
                className="inline-flex items-center gap-1 font-mono text-xs text-[#C42F57] dark:text-[#E8456B] hover:underline underline-offset-4 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Download Hosting ZIP</span>
              </button>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#15171C]/60 dark:text-[#F6F4F0]/60">
                {t.footerMadeFor}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Lightbox & Info Modals */}
      <LightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <InfoModal type={infoModal} lang={lang} onClose={() => setInfoModal(null)} />
    </div>
  );
}
