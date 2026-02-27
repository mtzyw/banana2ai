'use client';

import { useState } from 'react';
import {
  Menu,
  X,
  Globe,
  Coins,
  LogIn,
  Banana,
  Sparkles,
} from 'lucide-react';
import LoginModal from '@/components/banana/LoginModal';

interface TopNavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  topOffset?: number;
}

export default function TopNavbar({ sidebarOpen, onToggleSidebar, topOffset = 0 }: TopNavbarProps) {
  const [credits] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header
      className="fixed left-0 z-50 w-full h-16 bg-[#111111] border-b border-white/[0.08] flex items-center px-3 sm:px-4 transition-[top] duration-300"
      style={{ top: topOffset }}
    >
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <Banana className="w-4 h-4 text-black" />
          </div>
          <span className="font-bold text-sm tracking-wide text-[#f8d24b] hidden sm:block">
            BANANA PRO AI
          </span>
        </a>
      </div>

      <div className="flex-1" />

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          <span>免费获取20点数</span>
        </button>

        <button className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors">
          <Globe className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
          <Coins className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-white/80 text-xs font-medium tabular-nums">{credits}</span>
        </div>

        <button
          onClick={() => setLoginOpen(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-[#f8d24b] text-black text-xs font-semibold hover:bg-yellow-300 transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">登录</span>
        </button>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
