'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Globe,
  Coins,
  LogIn,
  Banana,
  Sparkles,
  LogOut,
  Clock,
  Plus,
  CalendarCheck,
} from 'lucide-react';
import LoginModal from '@/components/banana/LoginModal';
import CheckInModal from '@/components/banana/CheckInModal';
import PricingModal from '@/components/banana/PricingModal';
import { useSession, signOut } from '@/core/auth/client';

interface TopNavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  topOffset?: number;
}

export default function TopNavbar({ sidebarOpen, onToggleSidebar, topOffset = 0 }: TopNavbarProps) {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending: sessionPending } = useSession();
  const [credits, setCredits] = useState<number | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [creditsPopoverOpen, setCreditsPopoverOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const creditsRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!session?.user;
  const user = session?.user;

  // Fetch credits eagerly on mount (don't wait for session)
  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/get-user-info', { method: 'POST' })
      .then((r) => r.json())
      .then((res) => {
        if (!cancelled && res?.data?.credits?.remainingCredits != null) {
          setCredits(res.data.credits.remainingCredits);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close credits popover on outside click
  useEffect(() => {
    if (!creditsPopoverOpen) return;
    function handleClick(e: MouseEvent) {
      if (creditsRef.current && !creditsRef.current.contains(e.target as Node)) {
        setCreditsPopoverOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [creditsPopoverOpen]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    window.location.reload();
  };

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
        <button
          onClick={() => setCheckInOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-medium hover:bg-yellow-500/20 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isZh ? '免费获取20点数' : 'Get 20 Free Credits'}</span>
        </button>

        <button
          onClick={() => {
            const next = locale === 'zh' ? 'en' : 'zh';
            const path = pathname.replace(/^\/(en|zh)/, '');
            router.push(`/${next}${path}`);
          }}
          className="flex items-center gap-1 p-2 rounded-md text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
          title={isZh ? 'Switch to English' : 'Switch to Chinese'}
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs">{isZh ? 'EN' : '中文'}</span>
        </button>

        <div className="relative" ref={creditsRef}>
          <div
            onClick={() => setCreditsPopoverOpen((v) => !v)}
            className="flex cursor-pointer items-center gap-1 rounded-full bg-gradient-to-r from-[#f8d24b] to-[#f0a030] px-2 py-1.5 text-xs font-medium text-black shadow-sm transition-opacity hover:opacity-90 md:gap-1.5 md:px-3 md:text-sm"
          >
            <Coins className="w-4 h-4" />
            <span>{credits ?? "—"}</span>
          </div>

          {creditsPopoverOpen && (
            <div className="absolute right-0 top-full mt-2 w-[280px] rounded-xl bg-[#1c2030] border border-[#363b4e] shadow-2xl z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#f8d24b]" />
                  <span className="text-sm font-semibold text-white">
                    {isZh ? '积分' : 'Credits'}
                  </span>
                </div>
                <button
                  onClick={() => setCreditsPopoverOpen(false)}
                  className="p-1 rounded text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Balance */}
              <div className="px-4 py-3 text-center">
                <div className="text-3xl font-bold text-[#f8d24b]">{credits ?? "—"}</div>
                <div className="text-xs text-white/50 mt-1">
                  {isZh ? '可用积分' : 'Available Credits'}
                </div>
              </div>

              {/* Support */}
              <div className="px-4 pb-3 text-center text-xs text-white/40">
                {isZh ? '对我们的服务有疑问？' : 'Have questions?'}{' '}
                <a href="mailto:hi@banana2ai.net" className="text-[#f8d24b] hover:underline">
                  {isZh ? '联系我们' : 'Contact Us'}
                </a>
              </div>

              <div className="border-t border-[#363b4e] mx-4" />

              {/* Credit type */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/50" />
                  <span className="text-xs text-white/70">
                    {isZh ? '永久积分' : 'Permanent Credits'}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#f8d24b]/15 text-[#f8d24b] text-xs font-medium">
                  {credits ?? "—"}
                </span>
              </div>

              <div className="border-t border-[#363b4e] mx-4" />

              {/* Buttons */}
              <div className="p-4 space-y-2">
                <button
                  onClick={() => {
                    setCreditsPopoverOpen(false);
                    setPricingOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-[#f8d24b] text-[#f8d24b] text-sm font-medium hover:bg-[#f8d24b]/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {isZh ? '获取更多' : 'Get More'}
                </button>
                <button
                  onClick={() => {
                    setCreditsPopoverOpen(false);
                    setCheckInOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-[#f0a030] to-[#f8d24b] text-black text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <CalendarCheck className="w-4 h-4" />
                  {isZh ? '签到并领取 10 积分' : 'Check in & claim 10 credits'}
                </button>
              </div>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-500/40 hover:border-yellow-500/70 transition-colors"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-[#f8d24b] flex items-center justify-center text-black text-xs font-bold">
                  {(user?.name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                </div>
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-[#1c2030] border border-[#363b4e] shadow-xl py-2 z-50">
                <div className="px-3 py-2 text-sm text-white/70 truncate border-b border-[#363b4e]">
                  {user?.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isZh ? '退出登录' : 'Sign Out'}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-[#f8d24b] text-black text-xs font-semibold hover:bg-yellow-300 transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isZh ? '登录' : 'Sign In'}</span>
          </button>
        )}
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <CheckInModal open={checkInOpen} onClose={() => setCheckInOpen(false)} />
      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </header>
  );
}
