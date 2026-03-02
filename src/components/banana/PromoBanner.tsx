'use client';

import { useTranslations } from 'next-intl';

import { useState, useEffect } from 'react';

interface PromoBannerProps {
  onClose?: () => void;
}

const INITIAL_SECONDS = 23 * 3600 + 59 * 60 + 36;

function Digit({ value }: { value: string }) {
  return (
    <div
      className="flex h-5 w-4 items-center justify-center rounded bg-black/80 text-white shadow-md sm:h-8 sm:w-6"
      style={{ boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}
    >
      <span className="font-mono text-[10px] font-bold sm:text-sm">{value}</span>
    </div>
  );
}

function TimeUnit({ label }: { label: string }) {
  return (
    <span className="flex h-5 w-3 items-center justify-center px-0 text-[10px] font-bold text-black/70 sm:h-8 sm:w-5 sm:text-sm">
      {label}
    </span>
  );
}

export default function PromoBanner({ onClose }: PromoBannerProps) {
  const t = useTranslations('banana.promo');
  const [visible, setVisible] = useState(true);
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex w-full items-center justify-center overflow-hidden px-2 py-2 shadow-md sm:px-4 sm:py-2.5"
      style={{ background: 'linear-gradient(135deg, rgb(255, 222, 92) 0%, rgb(215, 244, 225) 50%, rgb(224, 215, 234) 100%)' }}
    >
      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative flex w-full max-w-screen-xl items-center justify-between gap-2 sm:gap-3">
        {/* Left: Countdown */}
        <div className="flex flex-shrink-0 items-center gap-0.5 sm:gap-1">
          <Digit value={hh[0]} />
          <Digit value={hh[1]} />
          <TimeUnit label="h" />
          <span className="px-[2px] text-[10px] font-bold text-black/60 sm:text-sm">:</span>
          <Digit value={mm[0]} />
          <Digit value={mm[1]} />
          <TimeUnit label="m" />
          <span className="px-[2px] text-[10px] font-bold text-black/60 sm:text-sm">:</span>
          <Digit value={ss[0]} />
          <Digit value={ss[1]} />
          <TimeUnit label="s" />
        </div>

        {/* Center: Text */}
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-[11px] font-semibold leading-tight sm:text-sm md:text-base">
            {/* Mobile */}
            <span className="sm:hidden">
              <span className="font-semibold text-black/90">{t('advanced_ai')}</span>
              <span className="mx-1 text-lg font-black text-black">50%</span>
              <span className="font-semibold text-black/90">{t('discount')}</span>
            </span>
            {/* Desktop */}
            <span className="hidden sm:inline">
              <span
                className="mr-1 rounded-md bg-black/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white sm:text-sm md:mr-4"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                {t('flash_sale')}
              </span>
              <span className="font-semibold text-black/90">{t('generate_now')}</span>
              <span className="mx-1 text-lg font-black text-black">50%</span>
            </span>
          </p>
        </div>

        {/* Right: CTA + Close */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="/zh/pricing/"
            className="relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-black px-3 py-1 text-[10px] font-bold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-black/90 hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
          >
            <span className="relative z-10">{t('claim')}</span>
          </a>
          <button
            onClick={handleClose}
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-black/70 transition-opacity hover:text-black/90 sm:h-6 sm:w-6"
            aria-label="close"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
