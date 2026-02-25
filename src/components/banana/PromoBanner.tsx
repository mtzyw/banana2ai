'use client';

import { useState, useEffect } from 'react';

interface PromoBannerProps {
  onClose?: () => void;
}

const INITIAL_SECONDS = 23 * 3600 + 59 * 60 + 36;

export default function PromoBanner({ onClose }: PromoBannerProps) {
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
      className="fixed top-0 left-0 right-0 z-[100] h-[34px] flex items-center justify-between px-3 sm:px-6 text-white text-xs font-medium overflow-hidden"
      style={{ background: 'linear-gradient(to right, #10b981, #3b82f6)' }}
    >
      {/* Left: Countdown */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {[hh, mm, ss].map((unit, i) => (
          <span key={i} className="flex items-center gap-0.5">
            <span className="bg-black/70 rounded px-1 py-0.5 font-mono font-bold tabular-nums">{unit}</span>
            {i < 2 && <span className="text-white/80 font-bold">:</span>}
          </span>
        ))}
      </div>

      {/* Center: Badge + Text */}
      <div className="flex items-center gap-2 mx-2 truncate">
        <span className="hidden sm:inline-flex bg-black/70 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap flex-shrink-0">
          限时抢购
        </span>
        <span className="truncate text-xs font-semibold">即刻生成精美图片 — 今日立省 50%</span>
      </div>

      {/* Right: CTA + Close */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href="/zh/pricing/"
          className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          领取优惠
        </a>
        <button
          onClick={handleClose}
          className="p-0.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
          aria-label="关闭"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
