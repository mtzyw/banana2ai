'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { X, Check, Gift, Flame, Star, Coins } from 'lucide-react';

/* ── Check-in credits per day (matches backend STREAK_REWARDS) ── */
const DAILY_CREDITS: Record<number, number> = {
  1: 3, 2: 3, 3: 5, 4: 5, 5: 8, 6: 8, 7: 15,
};
const TOTAL_WEEKLY = Object.values(DAILY_CREDITS).reduce((a, b) => a + b, 0); // 47
const BASE_CREDIT = DAILY_CREDITS[1]; // 3

interface DayInfo {
  day: number;
  credits: number;
  isChecked: boolean;
  isToday: boolean;
  isSpecial: boolean;
  multiplier?: number;
}

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onCheckInSuccess?: () => void;
}

export default function CheckInModal({ open, onClose, onCheckInSuccess }: CheckInModalProps) {
  const isZh = useLocale() === 'zh';
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch check-in status on open
  useEffect(() => {
    if (!open) return;
    setStatusLoading(true);
    fetch('/api/user/checkin')
      .then(r => r.json())
      .then(res => {
        if (res?.data) {
          setConsecutiveDays(res.data.currentStreak || 0);
          setIsCheckedToday(!!res.data.checkedInToday);
        }
      })
      .catch(() => {})
      .finally(() => setStatusLoading(false));
  }, [open]);

  // Build 7-day grid
  const days: DayInfo[] = Array.from({ length: 7 }, (_, i) => {
    const day = i + 1;
    const credits = DAILY_CREDITS[day];
    const checkedCount = consecutiveDays % 7 || (isCheckedToday ? 7 : 0);
    const isChecked = day <= checkedCount;
    const isToday = day === checkedCount + 1 && checkedCount < 7 && !isCheckedToday;
    const multiplier = Math.round(credits / BASE_CREDIT);
    return {
      day,
      credits,
      isChecked,
      isToday: isToday || (day === checkedCount && isCheckedToday && showConfetti),
      isSpecial: multiplier > 1,
      multiplier: multiplier > 1 ? multiplier : undefined,
    };
  });

  const handleCheckIn = async () => {
    if (loading || isCheckedToday || statusLoading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/user/checkin', { method: 'POST' });
      const data = await res.json();
      if (data?.data) {
        setConsecutiveDays(data.data.streak || 1);
        setIsCheckedToday(true);
        setTotalEarned(prev => prev + (data.data.credits || 0));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        onCheckInSuccess?.();
      } else if (data?.message) {
        // Already checked in or error
        if (data.message.includes('already')) {
          setIsCheckedToday(true);
        }
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Top banana decoration */}
        <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-20">
          <div className="text-5xl">🍌</div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1f35] to-[#0f1117] border border-[#363b4e]/50 shadow-2xl">
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-[#ffcc33]/10 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-1.5 hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4 text-white/60" />
          </button>

          {/* Content */}
          <div className="relative p-6 pt-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white mb-1">
                {isZh ? '每日签到赚取更多积分' : 'Daily Check-in for Free Credits'}
              </h2>
              <p className="text-sm text-white/50">
                {isZh
                  ? `连续签到 7 天即可赚取最多 ${TOTAL_WEEKLY} 积分`
                  : `Complete 7 days to earn up to ${TOTAL_WEEKLY} credits`
                }
              </p>
            </div>

            {/* Streak badge */}
            {consecutiveDays > 0 && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 px-3 py-1">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-sm font-semibold text-orange-300">
                    {isZh ? `已连续签到 ${consecutiveDays} 天` : `${consecutiveDays} day streak`}
                  </span>
                </div>
                {totalEarned > 0 && (
                  <div className="flex items-center gap-1 rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 px-2.5 py-1">
                    <Coins className="h-3.5 w-3.5 text-[#ffcc33]" />
                    <span className="text-xs font-medium text-[#ffcc33]">{totalEarned}</span>
                  </div>
                )}
              </div>
            )}

            {/* Daily rewards label */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/70">
                {isZh ? '每日奖励：' : 'Daily rewards:'}
              </span>
              <span className="rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 px-2.5 py-0.5 text-xs font-semibold text-[#ffcc33]">
                {isZh ? `最多 ${TOTAL_WEEKLY} 点数` : `Up to ${TOTAL_WEEKLY} credits`}
              </span>
            </div>

            {/* 7-day grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {days.map((day) => (
                <div
                  key={day.day}
                  className={`relative flex flex-col items-center justify-center rounded-2xl p-3 shadow-md transition-all duration-300 ${
                    day.isChecked
                      ? 'border-2 border-green-400 bg-green-400/20'
                      : day.isToday
                        ? 'border-2 border-[#ffcc33] bg-[#ffcc33]/20 shadow-lg shadow-[#ffcc33]/30'
                        : 'border border-[#363b4e] bg-[#1c2030]/50'
                  }`}
                >
                  {/* Multiplier badge */}
                  {day.isSpecial && day.multiplier && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#ffcc33] to-orange-500 text-[10px] font-bold text-black shadow-lg">
                      {day.multiplier}x
                    </div>
                  )}

                  {/* Circle: checkmark or credit amount */}
                  <div className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    day.isChecked
                      ? 'bg-green-500 text-white'
                      : day.isToday
                        ? 'bg-gradient-to-r from-[#ffcc33] to-orange-500 text-black'
                        : 'bg-[#363b4e] text-white/50'
                  }`}>
                    {day.isChecked ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span>+{day.credits}</span>
                    )}
                  </div>

                  {/* Day label */}
                  <span className={`text-[10px] font-medium transition-colors ${
                    day.isChecked
                      ? 'text-green-300'
                      : day.isToday
                        ? 'text-[#ffcc33]'
                        : 'text-white/40'
                  }`}>
                    {isZh ? `第${day.day}天` : `Day ${day.day}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Check-in button */}
            <button
              onClick={handleCheckIn}
              disabled={loading || isCheckedToday || statusLoading}
              className={`w-full rounded-xl py-3 text-base font-bold transition-all duration-300 ${
                statusLoading
                  ? 'bg-[#ffcc33]/50 text-black cursor-wait'
                  : isCheckedToday
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                    : loading
                      ? 'bg-[#ffcc33]/50 text-black cursor-wait'
                      : 'bg-gradient-to-r from-[#ffcc33] to-orange-500 text-black hover:shadow-lg hover:shadow-[#ffcc33]/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {statusLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  {isZh ? '加载中...' : 'Loading...'}
                </span>
              ) : isCheckedToday ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-5 w-5" />
                  {isZh ? '今日已签到' : 'Checked in today'}
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  {isZh ? '正在签到...' : 'Checking in...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Gift className="h-5 w-5" />
                  {isZh
                    ? `签到并领取 ${DAILY_CREDITS[((consecutiveDays % 7) + 1) as keyof typeof DAILY_CREDITS] || 2} 积分`
                    : `Check in and claim ${DAILY_CREDITS[((consecutiveDays % 7) + 1) as keyof typeof DAILY_CREDITS] || 2} credits`
                  }
                </span>
              )}
            </button>

            {/* Sign in prompt for logged-out users */}
            <p className="mt-3 text-center text-xs text-white/30">
              {isZh ? '登录后即可开始签到领取免费积分' : 'Sign in to start earning free credits daily'}
            </p>
          </div>

          {/* Confetti effect */}
          {showConfetti && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${0.5 + Math.random()}s`,
                    fontSize: `${10 + Math.random() * 14}px`,
                    opacity: 0.8,
                  }}
                >
                  {['🍌', '✨', '⭐', '🎉', '💛'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
