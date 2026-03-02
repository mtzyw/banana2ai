'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LazyVideo from '@/components/banana/LazyVideo';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const isZh = useLocale() === 'zh';
  const t = useTranslations('banana.login');
  const [minutes, setMinutes] = useState(9);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (!open) return;
    setMinutes(9);
    setSeconds(59);
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m > 0 ? m - 1 : 0));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Center */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          className="relative flex transform overflow-hidden rounded-xl border border-neutral-600 bg-neutral-800 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:border-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left — video/image */}
          <div className="hidden w-[40%] p-6 md:block">
            <video
              src="https://static.banana2ai.net/videos/login-panel.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="https://static.banana2ai.net/images/ui/login-poster.webp"
              className="h-full w-full rounded-xl object-contain lg:object-cover"
            />
          </div>

          {/* Right — content */}
          <div className="flex h-full w-full flex-col justify-between px-2 py-5 md:w-[60%] md:px-4 md:pb-6 md:pt-5">
            <div>
              <div className="mt-3 text-center md:mt-6 md:pt-12">
                {/* Title */}
                <h3 className="flex items-end justify-center text-2xl md:items-start md:text-3xl">
                  <span className="text-2xl text-white md:text-4xl">{t('welcome')}&nbsp;</span>
                  <span className="gradient-glow-text text-2xl font-bold md:text-4xl">BANANA PRO AI</span>
                </h3>

                {/* Countdown */}
                <div className="mt-6 md:mt-10">
                  <div className="text-lg font-medium text-white md:text-xl">
                    {t('countdown_prefix')}&nbsp;
                    <div className="inline-flex items-center">
                      <div className="flex flex-col items-center">
                        <div className="group relative flex h-full w-16 items-center justify-center overflow-hidden rounded-md text-2xl font-bold text-[#ffcc33] shadow-lg" style={{ background: 'linear-gradient(to bottom, #262626, #171717)' }}>
                          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,204,51,0.4), transparent)' }} />
                          <span className="text-2xl">{minutes}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-[#ffcc33]">:</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="group relative flex h-full w-16 items-center justify-center overflow-hidden rounded-md text-2xl font-bold text-[#ffcc33] shadow-lg" style={{ background: 'linear-gradient(to bottom, #262626, #171717)' }}>
                          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,204,51,0.4), transparent)' }} />
                          <span className="text-2xl">{String(seconds).padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                    &nbsp;{t('unlock')}
                  </div>

                  {/* Benefits list */}
                  <div className="ml-4 mt-6 flex flex-col items-start gap-3 text-left text-base md:ml-8 md:mt-8 md:gap-5 md:text-lg">
                    {/* 1 */}
                    <div className="flex items-start">
                      <div className="mr-2 text-[#ffcc33]">✓</div>
                      <div>
                        <span className="text-white">{t('credits_prefix')} </span>
                        <strong className="text-yellow-400">10</strong>
                        <span className="text-white"> {t('credits_suffix')}</span>
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="flex items-start">
                      <div className="mr-2 text-[#ffcc33]">✓</div>
                      <div className="flex flex-col items-start">
                        <div>
                          <span className="text-[#ffcc33]">Full Access</span>{' '}
                          <span className="text-white">Premium AI Models</span>
                        </div>
                        <div className="text-start text-base text-white/50">
                          <strong className="text-yellow-400">Nano Banana</strong>,{' '}
                          <strong className="text-yellow-400">Nano Banana Pro</strong>,{' '}
                          <strong className="text-yellow-400">Veo 3</strong> &{' '}
                          <strong className="text-yellow-400">Veo 3.1</strong>
                        </div>
                      </div>
                    </div>
                    {/* 3 */}
                    <div className="flex items-start">
                      <div className="mr-2 text-[#ffcc33]">✓</div>
                      <div className="flex flex-col items-start">
                        <div>
                          <span className="text-[#ffcc33]">Member Pricing</span>
                        </div>
                        <div className="text-start text-base text-white/50">
                          <span>Annual plan from </span>
                          <strong className="text-yellow-400">$8.3{isZh ? '/月' : '/mo'}</strong>
                          <span>（save up to </span>
                          <strong className="text-yellow-400">40%</strong>
                          <span>）</span>
                        </div>
                      </div>
                    </div>
                    {/* 4 */}
                    <div className="flex items-start">
                      <div className="mr-2 text-[#ffcc33]">✓</div>
                      <div className="flex flex-col items-start">
                        <div>
                          <span className="text-[#ffcc33]">Unlimited Storage</span>
                        </div>
                        <div className="text-start text-base text-white/50">
                          Save & manage all AI creations
                        </div>
                      </div>
                    </div>
                    {/* 5 */}
                    <div className="flex items-start">
                      <div className="mr-2 text-[#ffcc33]">✓</div>
                      <div>
                        <span className="text-[#ffcc33]">Priority support & faster generation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google login button */}
            <div className="mt-5 space-y-3 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center space-x-3 rounded-lg border-2 border-[#363b4e] px-3 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:border-[#ffcc33] focus:outline-none focus:ring-2 focus:ring-[#ffcc33]/30"
              >
                {/* Google icon */}
                <svg viewBox="0 0 48 48" className="h-5 w-5" fill="currentColor">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <p className="text-white">{t('google_login')}</p>
              </button>
              <a href="/zh/privacy-policy/" className="mt-3 block text-center text-xs text-white/40">
                {isZh ? '继续即表示您同意我们的' : 'By continuing, you agree to our '}{t('terms_link')}和{t('privacy_link')}。
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
