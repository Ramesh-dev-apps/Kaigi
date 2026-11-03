import React from 'react';
import { Maximize2 } from 'lucide-react';

interface WindowsAppFrameProps {
  src: string;
  secondarySrc?: string;
  alt: string;
  caption?: string;
  windowTitle?: string;
  onZoom?: (src: string, alt: string) => void;
  priority?: boolean;
  variant?: 'app' | 'document';
}

export const WindowsAppFrame: React.FC<WindowsAppFrameProps> = ({
  src,
  secondarySrc,
  alt,
  caption,
  windowTitle = 'Kaigi — SGB Dev Apps (Offline · Local DB)',
  onZoom,
  priority = false,
  variant = 'app',
}) => {
  return (
    <figure className="group relative w-full">
      {/* Subtle architectural frame outer wrapper inspired by web_style.jpg */}
      <div className="relative overflow-hidden rounded-xl border border-[#15171C]/12 dark:border-[#F6F4F0]/14 bg-[#FDFCFA] dark:bg-[#1D2028] shadow-[0_20px_50px_-15px_rgba(21,23,28,0.16)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        {/* Clean Windows 11 style title bar */}
        <div className="flex items-center justify-between border-b border-[#15171C]/8 dark:border-[#F6F4F0]/10 bg-[#EFECE6] dark:bg-[#181A20] px-3.5 py-2 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#E8456B] text-[10px] font-bold text-white font-display">
              K
            </span>
            <span className="truncate font-mono text-[11px] tracking-tight text-[#15171C]/70 dark:text-[#F6F4F0]/70">
              {windowTitle}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onZoom && (
              <button
                type="button"
                onClick={() => onZoom(src, alt)}
                className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium text-[#15171C]/65 hover:text-[#15171C] hover:bg-[#15171C]/5 dark:text-[#F6F4F0]/65 dark:hover:text-[#F6F4F0] dark:hover:bg-[#F6F4F0]/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8456B]"
                aria-label={`Inspect ${alt}`}
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Inspect</span>
              </button>
            )}
            {/* Windows 11 window control glyphs */}
            <div className="flex items-center gap-2.5 text-[#15171C]/45 dark:text-[#F6F4F0]/45" aria-hidden="true">
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="1" y1="5" x2="9" y2="5" />
              </svg>
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1.5" y="1.5" width="7" height="7" rx="1" />
              </svg>
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" />
                <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Screenshot viewport */}
        {variant === 'document' && secondarySrc ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 sm:p-5 bg-[#E6E2D9] dark:bg-[#13151A]">
            <button
              type="button"
              onClick={() => onZoom && onZoom(src, `${alt} (Page 1)`)}
              className="group/page relative overflow-hidden rounded border border-[#15171C]/10 bg-white shadow-sm text-left focus-visible:outline-2 focus-visible:outline-[#E8456B]"
            >
              <img
                src={src}
                alt={`${alt} — Page 1`}
                loading={priority ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                className="w-full h-auto block object-contain"
              />
            </button>
            <button
              type="button"
              onClick={() => onZoom && onZoom(secondarySrc, `${alt} (Page 4)`)}
              className="group/page relative overflow-hidden rounded border border-[#15171C]/10 bg-white shadow-sm text-left focus-visible:outline-2 focus-visible:outline-[#E8456B]"
            >
              <img
                src={secondarySrc}
                alt={`${alt} — Page 4`}
                loading={priority ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                className="w-full h-auto block object-contain"
              />
            </button>
          </div>
        ) : (
          <div
            onClick={() => onZoom && onZoom(src, alt)}
            className={`relative bg-white dark:bg-[#F9F8F6] ${onZoom ? 'cursor-zoom-in' : ''}`}
          >
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              referrerPolicy="no-referrer"
              className="w-full h-auto block object-contain"
            />
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2.5 flex items-center justify-between gap-4 text-xs text-[#15171C]/65 dark:text-[#F6F4F0]/65 font-normal">
          <span>{caption}</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#15171C]/45 dark:text-[#F6F4F0]/45 shrink-0">
            Fictional Demo Data
          </span>
        </figcaption>
      )}
    </figure>
  );
};
