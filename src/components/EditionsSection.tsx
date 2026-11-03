import React from 'react';
import { Check, Minus, Download } from 'lucide-react';
import { Language, MODULES, UI_COPY } from '../data/kaigiContent';
import { spotlightCardProps } from '../utils/spotlightCard';

interface EditionsSectionProps {
  lang: Language;
  onDownloadClick: () => void;
}

export const EditionsSection: React.FC<EditionsSectionProps> = ({ lang, onDownloadClick }) => {
  const t = UI_COPY[lang];

  return (
    <section
      id="editions"
      aria-labelledby="editions-heading"
      className="relative py-20 sm:py-28 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with "Coming in v1.0" badge */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[#C42F57] dark:text-[#E8456B]">
              {t.editionsEyebrow}
            </span>
            <span className="inline-flex items-center rounded-md border border-[#E8456B] px-2.5 py-0.5 text-xs font-medium text-[#C42F57] dark:text-[#E8456B] whitespace-nowrap shrink-0">
              {t.comingInV1}
            </span>
          </div>

          <h2
            id="editions-heading"
            className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] [text-wrap:balance]"
          >
            {t.editionsHeadline}
          </h2>
          <p className="mt-3 text-base text-[#15171C]/75 dark:text-[#F6F4F0]/75 leading-relaxed">
            {t.editionsSub}
          </p>
        </div>

        {/* Two Edition Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Kaigi Lite — Free */}
          <div
            {...spotlightCardProps}
            className="spotlight-surface flex flex-col justify-between rounded-2xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#1A1D24] p-6 sm:p-8 hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 pb-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#15171C] dark:text-[#F6F4F0]">
                    {t.liteTitle}
                  </h3>
                  <p className="mt-1 text-xs text-[#15171C]/65 dark:text-[#F6F4F0]/65">
                    {t.liteSub}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#15171C] dark:text-[#F6F4F0] tabular-nums">
                    {t.litePrice}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3.5">
                {t.liteFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#15171C]/85 dark:text-[#F6F4F0]/85 leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#15171C]/10 dark:bg-[#F6F4F0]/15 text-[#15171C] dark:text-[#F6F4F0]"
                    >
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10">
              <button
                type="button"
                onClick={onDownloadClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#15171C]/20 dark:border-[#F6F4F0]/25 bg-[#F6F4F0] dark:bg-[#15171C] px-5 py-3 text-sm font-semibold text-[#15171C] dark:text-[#F6F4F0] hover:border-[#E8456B] dark:hover:border-[#E8456B] transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-[#E8456B]" />
                <span>
                  {lang === 'en' ? 'Download Kaigi Lite (Free)' : 'Kaigi Lite をダウンロード (無料)'}
                </span>
              </button>
            </div>
          </div>

          {/* Kaigi Pro — [price] */}
          <div
            {...spotlightCardProps}
            className="spotlight-surface flex flex-col justify-between rounded-2xl border-2 border-[#E8456B] bg-[#FDFCFA] dark:bg-[#1A1D24] p-6 sm:p-8 relative hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-baseline justify-between gap-4 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-2xl font-bold text-[#15171C] dark:text-[#F6F4F0]">
                      {t.proTitle}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#C42F57] dark:text-[#E8456B]">
                      {lang === 'en' ? 'FULL SUITE' : 'フル機能版'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#15171C]/65 dark:text-[#F6F4F0]/65">
                    {t.proSub}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[#C42F57] dark:text-[#E8456B] tabular-nums">
                    {t.proPrice}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3.5">
                {t.proFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[#15171C]/90 dark:text-[#F6F4F0]/90 leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8456B] text-white"
                    >
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#15171C]/15 dark:border-[#F6F4F0]/15 bg-[#ECE8E0] dark:bg-[#15171C]/70 px-5 py-3 text-sm font-semibold text-[#15171C]/45 dark:text-[#F6F4F0]/45 opacity-65 cursor-not-allowed whitespace-nowrap select-none"
              >
                <Download className="w-4 h-4 opacity-50" />
                <span>
                  {lang === 'en'
                    ? 'Kaigi Pro — In Development (Coming in v1.0)'
                    : 'Kaigi Pro — 開発中 (Coming in v1.0)'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Full 23-Module Row-by-Row Comparison Table */}
        <div className="mt-14 rounded-2xl border border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#FDFCFA] dark:bg-[#1A1D24] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/60 dark:bg-[#15171C]/60 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#15171C] dark:text-[#F6F4F0]">
              {t.comparisonTitle}
            </h3>
            <span className="font-mono text-xs text-[#15171C]/60 dark:text-[#F6F4F0]/60">
              {lang === 'en' ? 'Click any row to jump to module details' : '行をクリックすると各モジュールの詳細へ移動します'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#15171C]/12 dark:border-[#F6F4F0]/12 bg-[#15171C] text-[#F6F4F0] text-xs font-mono uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-1/2">{t.tableColModule}</th>
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">{t.tableColLite}</th>
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">{t.tableColPro}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#15171C]/8 dark:divide-[#F6F4F0]/8 text-sm">
                {MODULES.map((m) => (
                  <tr
                    key={m.id}
                    onClick={() => {
                      const el = document.getElementById(`module-${m.id}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="cursor-pointer hover:bg-[#ECE8E0]/50 dark:hover:bg-[#F6F4F0]/5 transition-colors"
                  >
                    <td className="py-3 px-4 sm:px-6 font-medium text-[#15171C] dark:text-[#F6F4F0]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs text-[#15171C]/45 dark:text-[#F6F4F0]/45 tabular-nums">
                          {m.number}.
                        </span>
                        <span>{m.title[lang]}</span>
                        {m.v1Badge && (
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded border border-[#E8456B]/50 text-[#C42F57] dark:text-[#E8456B]">
                            {t.comingInV1}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Lite column */}
                    <td className="py-3 px-4 sm:px-6 text-[#15171C]/80 dark:text-[#F6F4F0]/80">
                      {m.liteIncluded ? (
                        <div className="flex items-start gap-2">
                          <span
                            aria-label="Included in Lite"
                            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#15171C]/12 dark:bg-[#F6F4F0]/15 text-[#15171C] dark:text-[#F6F4F0] font-bold text-xs"
                          >
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm">
                            {m.liteNote ? m.liteNote[lang] : lang === 'en' ? 'Included' : '対応'}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-[#15171C]/45 dark:text-[#F6F4F0]/45">
                          <Minus className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-xs">
                            {m.liteNote ? m.liteNote[lang] : lang === 'en' ? 'Pro only' : 'Proのみ'}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Pro column */}
                    <td className="py-3 px-4 sm:px-6 text-[#15171C] dark:text-[#F6F4F0] font-medium">
                      {m.proIncluded && (
                        <div className="flex items-start gap-2">
                          <span
                            aria-label="Included in Pro"
                            className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8456B] text-white font-bold text-xs"
                          >
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm">
                            {m.proNote ? m.proNote[lang] : lang === 'en' ? 'Included' : '対応'}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mandatory Note under table */}
          <div className="px-6 py-4 border-t border-[#15171C]/10 dark:border-[#F6F4F0]/10 bg-[#ECE8E0]/40 dark:bg-[#15171C]/40 text-xs sm:text-sm font-medium text-[#15171C]/85 dark:text-[#F6F4F0]/85">
            {t.dataNeverLockedNote}
          </div>
        </div>
      </div>
    </section>
  );
};
