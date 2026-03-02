'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import {
  ChevronDown, Sparkles, Lock, RefreshCw, Coins, Info, Gem, Film,
} from 'lucide-react';

interface VideoGeneratorPanelProps {
  sampleVideoSrc?: string;
  sampleVideoPoster?: string;
}

export default function VideoGeneratorPanel({
  sampleVideoSrc = 'https://static.banana2ai.net/videos/sample-generator.mp4',
  sampleVideoPoster = 'https://static.banana2ai.net/images/video/default-poster.webp',
}: VideoGeneratorPanelProps) {
  const t = useTranslations('banana.videoGenerator');
  return (
    <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:px-6 lg:flex-row lg:min-h-[min(calc(100vh-120px),800px)]">
      {/* Left: Generator Form */}
      <div className="w-full lg:flex-shrink-0 lg:w-[380px] xl:w-[420px]">
        <div className="flex h-full flex-col rounded-xl border border-[#363b4e]/50 bg-[#1c2030] shadow-lg">
          <div className="flex-shrink-0 border-b border-[#363b4e]/30 p-5 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-base font-bold sm:text-lg">{t('title')}</div>
              <button className="flex w-full items-center gap-1 rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm hover:bg-[#2b3046] sm:w-auto">
                <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="Veo 3.1" width={24} height={24} />
                <span className="truncate text-[#ffcc33]">{t('model')}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-5 pt-3">
            <div className="mb-4 flex-shrink-0">
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#0f1117] p-1">
                <button className="relative rounded-md px-4 py-2.5 text-sm font-medium" style={{ border: '2px solid transparent', backgroundImage: 'linear-gradient(#0f1117, #0f1117), linear-gradient(to right, #ffcc33, #ff9900)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' }}>
                  <span className="gradient-text">{t('mode_text')}</span>
                </button>
                <button className="rounded-md px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white">
                  {t('mode_image')}
                </button>
              </div>
            </div>
            <div className="mb-4 min-h-0 flex-1 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">{t('prompt_label')}</label>
                  <Info className="h-4 w-4 text-white/30" />
                </div>
                <textarea className="w-full resize-y rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm placeholder:text-white/30 focus:border-[#ffcc33] focus:outline-none" style={{ minHeight: 140 }} placeholder=" 描述您想要创建的内容 最多 10000 个字符..." maxLength={10000} readOnly />
                <div className="flex justify-between text-xs">
                  <button className="flex items-center gap-1 text-sm font-medium text-[#ffcc33]">
                    <Sparkles className="h-4 w-4" /> {t('generate')}
                  </button>
                  <span className="text-white/30">0/10000</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('aspect_ratio')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="group rounded-lg border border-[#363b4e]/50 bg-[#1c2030] px-1.5 py-2 hover:border-[#363b4e]">
                    <div className="mx-auto mb-1.5 h-6 w-11 rounded border-2 border-white/40 group-hover:border-white/70" />
                    <span className="block text-xs font-medium">16:9</span>
                  </button>
                  <button className="group rounded-lg border border-[#363b4e]/50 bg-[#1c2030] px-1.5 py-2 hover:border-[#363b4e]">
                    <div className="mx-auto mb-1.5 h-9 w-5 rounded border-2 border-white/40 group-hover:border-white/70" />
                    <span className="block text-xs font-medium">9:16</span>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">种子</label>
                  <Info className="h-4 w-4 text-white/30" />
                </div>
                <div className="flex">
                  <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1c2030] hover:bg-[#2b3046]">
                    <Lock className="h-4 w-4" />
                  </button>
                  <input type="text" disabled className="h-9 flex-1 rounded-md border border-[#363b4e] bg-transparent px-3 text-center font-mono text-sm opacity-60" value="42471" readOnly />
                  <button disabled className="flex h-9 w-9 items-center justify-center opacity-50">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    公开可见性
                    <Info className="h-4 w-4 text-white/30" />
                  </span>
                  <div className="flex items-center gap-2">
                    <Gem className="h-4 w-4 text-[#ffcc33]" />
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full" style={{ background: 'linear-gradient(to right, #ffcc33, #ff9900)' }}>
                      <span className="inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 border-t border-[#363b4e] pt-4">
              <div className="mb-3 flex items-center justify-between rounded-lg border border-[#ffcc33]/10 bg-[#ffcc33]/5 p-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-[#ffcc33]" />
                  <span className="text-sm font-medium">所需点数</span>
                </div>
                <span className="font-bold text-[#ffcc33]">20</span>
              </div>
              <button className="w-full rounded-md py-2 text-sm font-semibold text-black" style={{ background: 'linear-gradient(to right, #ffcc33, #ff9900)' }}>
                生成 视频
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Sample Videos */}
      <div className="w-full min-w-0">
        <div className="flex h-full flex-1 flex-col rounded-xl border border-[#363b4e]/50 bg-[#1c2030] shadow-lg">
          <div className="flex-shrink-0 p-6">
            <div className="flex items-center gap-2 font-semibold">
              <Film className="h-5 w-5 text-[#ffcc33]" />
              <span className="gradient-text">示例视频</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-6 pt-0">
            <div className="flex h-full w-full items-center justify-center">
              <video
                controls
                autoPlay
                loop
                muted
                playsInline
                poster={sampleVideoPoster}
                preload="none"
                src={sampleVideoSrc}
                className="h-full w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
