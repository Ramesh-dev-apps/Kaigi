import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Language, MODULES, UI_COPY } from '../data/kaigiContent';
import { WindowsAppFrame } from './WindowsAppFrame';
import { spotlightCardProps } from '../utils/spotlightCard';

interface FeatureTourSectionProps {
  lang: Language;
  onZoom: (src: string, alt: string) => void;
}

export const FeatureTourSection: React.FC<FeatureTourSectionProps> = ({ lang, onZoom }) => {
  const t = UI_COPY[lang];
  const [filter, setFilter] = useState<'all' | 'now' | 'v1'>('all');
  const [activeModuleId, setActiveModuleId] = useState<string>(MODULES[0].id);
  const [expandedMobileIds, setExpandedMobileIds] = useState<Record<string, boolean>>({
    [MODULES[0].id]: true,
  });

  const filteredModules = MODULES.filter((m) => {
    if (filter === 'now') return !m.v1Badge;
    if (filter === 'v1') return Boolean(m.v1Badge);
    return true;
  });

  useEffect(() => {
    const elements = filteredModules
      .map((m) => document.getElementById(`module-${m.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace('module-', '');
          setActiveModuleId(id);
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  const toggleMobileModule = (id: string) => {
    setExpandedMobileIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const setAllMobileExpanded = (expanded: boolean) => {
    const next: Record<string, boolean> = {};
    filteredModules.forEach((m) => {
      next[m.id] = expanded;
    });
    setExpandedMobileIds(next);
  };

  const scrollToModule = (id: string) => {
    setActiveModuleId(id);
    setExpandedMobileIds((prev) => ({ ...prev, [id]: true }));
    const el = document.getElementById(`module-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
              {t.tourEyebrow}
            </p>
            <h2
              id="features-heading"
              className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
            >
              {t.tourHeadline}
            </h2>
            <p className="mt-3 text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
              {t.tourSub}
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Filter modules by availability"
              className="inline-flex items-center p-1 rounded-lg bg-[#ECE8E0] dark:bg-[#1D2028] border border-[#15171C]/10 dark:border-[#F6F4F0]/10"
            >
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'all'
                    ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-xs'
                    : 'text-[#15171C]/70 dark:text-[#F6F4F0]/70 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setFilter('now')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'now'
                    ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-xs'
                    : 'text-[#15171C]/70 dark:text-[#F6F4F0]/70 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                {t.filterNow}
              </button>
              <button
                type="button"
                onClick={() => setFilter('v1')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  filter === 'v1'
                    ? 'bg-[#FDFCFA] dark:bg-[#15171C] text-[#15171C] dark:text-[#F6F4F0] shadow-xs'
                    : 'text-[#15171C]/70 dark:text-[#F6F4F0]/70 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                }`}
              >
                {t.filterV1}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Sub-Nav Chips (< 1024px) */}
        <div className="lg:hidden sticky top-16 z-20 -mx-4 px-4 py-2.5 bg-[#F6F4F0]/95 dark:bg-[#15171C]/95 backdrop-blur-md border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {filteredModules.map((m) => {
              const isActive = activeModuleId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => scrollToModule(m.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-[#E8456B] text-white border-[#E8456B]'
                      : 'bg-[#FDFCFA] dark:bg-[#1D2028] text-[#15171C]/80 dark:text-[#F6F4F0]/80 border-[#15171C]/10 dark:border-[#F6F4F0]/10'
                  }`}
                >
                  <span className="font-mono mr-1 opacity-75">{m.number}.</span>
                  {m.title[lang]}
                </button>
              );
            })}
          </div>
          {/* Mobile Expand/Collapse All convenience bar (< 640px) */}
          <div className="sm:hidden flex items-center justify-between pt-2 mt-2 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8 text-[11px]">
            <span className="text-[#15171C]/60 dark:text-[#F6F4F0]/60 font-mono">
              {filteredModules.length} {lang === 'en' ? 'MODULES' : 'モジュール'}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAllMobileExpanded(true)}
                className="text-[#C42F57] dark:text-[#E8456B] font-medium hover:underline"
              >
                {t.expandAllMobile}
              </button>
              <span aria-hidden="true" className="text-[#15171C]/30 dark:text-[#F6F4F0]/30">·</span>
              <button
                type="button"
                onClick={() => setAllMobileExpanded(false)}
                className="text-[#15171C]/65 dark:text-[#F6F4F0]/65 hover:underline"
              >
                {t.collapseAllMobile}
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout: Sticky Left Sub-Nav on Desktop + Module Blocks */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sticky Left Sub-Nav (Desktop) */}
          <aside
            aria-label="Module directory navigation"
            className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2"
          >
            <div className="rounded-xl border border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA] dark:bg-[#1D2028] p-2.5">
              <div className="px-2.5 py-1.5 mb-1 flex items-center justify-between border-b border-[#15171C]/8 dark:border-[#F6F4F0]/8">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#15171C]/55 dark:text-[#F6F4F0]/55">
                  {lang === 'en' ? 'MODULES (01–23)' : 'モジュール一覧 (01–23)'}
                </span>
                <span className="font-mono text-[11px] tabular-nums text-[#C42F57] dark:text-[#E8456B]">
                  {filteredModules.length}
                </span>
              </div>
              <nav className="space-y-0.5">
                {filteredModules.map((m) => {
                  const isActive = activeModuleId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => scrollToModule(m.id)}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors ${
                        isActive
                          ? 'bg-[#E8456B]/12 text-[#C42F57] dark:text-[#E8456B] font-semibold'
                          : 'text-[#15171C]/75 dark:text-[#F6F4F0]/75 hover:bg-[#15171C]/5 dark:hover:bg-[#F6F4F0]/5 hover:text-[#15171C] dark:hover:text-[#F6F4F0]'
                      }`}
                    >
                      <span className="truncate">
                        <span className="font-mono text-[11px] opacity-65 mr-1.5 tabular-nums">
                          {m.number}.
                        </span>
                        {m.title[lang]}
                      </span>
                      {m.v1Badge && (
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded border border-[#E8456B]/50 text-[#C42F57] dark:text-[#E8456B] shrink-0">
                          v1.0
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* 23 Module Blocks */}
          <div className="lg:col-span-9 space-y-8 sm:space-y-12">
            {filteredModules.map((m, idx) => {
              const isExpandedMobile = Boolean(expandedMobileIds[m.id]);
              const isReversedDesktop = idx % 2 === 1;

              return (
                <article
                  key={m.id}
                  id={`module-${m.id}`}
                  {...spotlightCardProps}
                  className="spotlight-surface scroll-mt-32 lg:scroll-mt-24 rounded-2xl border border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#FDFCFA] dark:bg-[#1A1D24] p-5 sm:p-8 transition-colors hover:-translate-y-0.5"
                >
                  {/* Module Header Row (Always visible on mobile & desktop) */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
                        {m.eyebrow[lang]}
                      </span>

                      {m.v1Badge && (
                        <span className="inline-flex items-center rounded-md border border-[#E8456B] px-2.5 py-0.5 text-xs font-medium text-[#C42F57] dark:text-[#E8456B] whitespace-nowrap shrink-0">
                          {t.comingInV1}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0]">
                        <span className="font-mono text-[#15171C]/40 dark:text-[#F6F4F0]/40 mr-2 tabular-nums">
                          {m.number}.
                        </span>
                        {m.title[lang]}
                      </h3>

                      {/* Mobile "More" / "Less" collapse button (< 640px) */}
                      <button
                        type="button"
                        onClick={() => toggleMobileModule(m.id)}
                        aria-expanded={isExpandedMobile}
                        aria-controls={`module-details-${m.id}`}
                        className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#F6F4F0] dark:bg-[#15171C] text-xs font-semibold text-[#C42F57] dark:text-[#E8456B] whitespace-nowrap shrink-0 min-h-[38px]"
                      >
                        <span>{isExpandedMobile ? t.lessDetails : t.moreDetails}</span>
                        {isExpandedMobile ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* One-line summary (always visible) */}
                    <p className="text-sm sm:text-base text-[#15171C]/80 dark:text-[#F6F4F0]/80 leading-relaxed max-w-3xl">
                      {m.summary[lang]}
                    </p>
                  </div>

                  {/* Collapsible body on mobile (< 640px), always expanded on >= 640px */}
                  <div
                    id={`module-details-${m.id}`}
                    className={`${isExpandedMobile ? 'block' : 'hidden'} sm:block mt-6 pt-6 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8`}
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-center">
                      {/* Feature Bullets Column */}
                      <div
                        className={`xl:col-span-5 ${
                          isReversedDesktop ? 'xl:order-2' : 'xl:order-1'
                        }`}
                      >
                        <ul className="space-y-3">
                          {m.bullets[lang].map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-sm text-[#15171C]/85 dark:text-[#F6F4F0]/85 leading-relaxed"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8456B]/15 text-[#C42F57] dark:text-[#E8456B]"
                              >
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Quiet metadata footer showing edition availability */}
                        <div className="mt-5 pt-4 border-t border-[#15171C]/8 dark:border-[#F6F4F0]/8 flex flex-wrap items-center gap-2 text-xs text-[#15171C]/60 dark:text-[#F6F4F0]/60">
                          <span className="font-mono uppercase tracking-wider">
                            {lang === 'en' ? 'Edition:' : '対応エディション:'}
                          </span>
                          <span>
                            {m.liteIncluded
                              ? lang === 'en'
                                ? 'Kaigi Lite & Kaigi Pro'
                                : 'Kaigi Lite / Kaigi Pro 両対応'
                              : lang === 'en'
                              ? 'Kaigi Pro only'
                              : 'Kaigi Pro 専用'}
                          </span>
                          {m.liteNote && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{m.liteNote[lang]}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Screenshot Column */}
                      <div
                        className={`xl:col-span-7 ${
                          isReversedDesktop ? 'xl:order-1' : 'xl:order-2'
                        }`}
                      >
                        <WindowsAppFrame
                          src={m.screenshot}
                          secondarySrc={m.secondaryScreenshot}
                          variant={m.secondaryScreenshot ? 'document' : 'app'}
                          alt={`${m.title[lang]} — Kaigi screenshot`}
                          caption={m.screenshotCaption[lang]}
                          windowTitle={`Kaigi — ${m.number}. ${m.title.en}`}
                          onZoom={onZoom}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
