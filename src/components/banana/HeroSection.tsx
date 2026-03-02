'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import LazyVideo from '@/components/banana/LazyVideo';
import {
  ImageIcon,
  ChevronDown,
  LayoutDashboard,
  Sparkles,
  Upload,
  Plus,
} from 'lucide-react';

const MODELS = [
  { label: 'Nano Banana', id: 'nano', icon: 'G' },
  { label: 'Seedream', id: 'seedream', icon: '▌' },
  { label: 'Flux', id: 'flux', icon: '△' },
  { label: 'Grok', id: 'grok', icon: '◇' },
  { label: 'Qwen', id: 'qwen', icon: '✦' },
  { label: 'Sora', id: 'sora', icon: '●' },
  { label: 'Veo', id: 'veo', icon: 'G' },
];

const TYPEWRITER_PROMPTS_DESKTOP = [
  'The train moves forward through a bright forest, sunlight flickering through the leaves onto the windows. A girl leans out joyfully, her hair blowing in the wind. Soft anime lighting, vibrant colors, smooth gentle motion.',
  'Cyberpunk desert warrior woman with pink-turquoise ombre hair, golden futuristic armor, steampunk goggles, standing in red canyon desert, golden hour lighting, post-apocalyptic cinematic style.',
  'Gothic anime girl with split face (normal blue eye/glowing skull red eye), platinum twin braids, black chains outfit against bright pink background, kawaii-horror aesthetic.',
  'A cozy mountain cabin at sunset, warm golden light spilling from windows, snow-capped peaks in background, pine trees, a winding path with lanterns, Studio Ghibli style, peaceful atmosphere.',
  'Filling black and white portraits with appropriate colors can create a sense of realism.',
];

const TYPEWRITER_PROMPTS_MOBILE = [
  '赛博朋克女战士，粉蓝渐变发色，金色铠甲，沙漠峡谷背景',
  '吉卜力风格，山间小屋，温暖灯光，雪山松林',
  '盲盒手办风格，可爱少女，3D渲染，柔和光影',
  '电影感人像，黄金时段，逆光剪影，胶片质感',
  '水彩风景画，樱花树下，春日午后，梦幻氛围',
];

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const promptIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const userFocused = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const doTypewriter = useCallback(() => {
    if (userFocused.current) return;
    const prompts = isMobile ? TYPEWRITER_PROMPTS_MOBILE : TYPEWRITER_PROMPTS_DESKTOP;
    const currentPrompt = prompts[promptIdxRef.current % prompts.length];
    if (isTyping) {
      if (charIdxRef.current < currentPrompt.length) {
        charIdxRef.current++;
        setDisplayText(currentPrompt.slice(0, charIdxRef.current));
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIdxRef.current > 0) {
        charIdxRef.current--;
        setDisplayText(currentPrompt.slice(0, charIdxRef.current));
      } else {
        const prompts = isMobile ? TYPEWRITER_PROMPTS_MOBILE : TYPEWRITER_PROMPTS_DESKTOP;
        promptIdxRef.current = (promptIdxRef.current + 1) % prompts.length;
        setIsTyping(true);
      }
    }
  }, [isTyping, isMobile]);

  useEffect(() => {
    const speed = isTyping ? 35 : 15;
    const timer = setInterval(doTypewriter, speed);
    return () => clearInterval(timer);
  }, [doTypewriter, isTyping]);

  const handleFocus = () => {
    userFocused.current = true;
    setDisplayText('');
  };
  const handleBlur = () => {
    if (!prompt) {
      userFocused.current = false;
      charIdxRef.current = 0;
      const prompts = isMobile ? TYPEWRITER_PROMPTS_MOBILE : TYPEWRITER_PROMPTS_DESKTOP;
      promptIdxRef.current = (promptIdxRef.current + 1) % prompts.length;
      setIsTyping(true);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-b from-black/40 to-black/60">
        <LazyVideo
          eager
          className="h-full w-full object-cover"
          src="https://static.banana2ai.net/videos/hero-bg.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      {/* Content — max-w-7xl like original */}
      <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-3 sm:px-4 md:px-6">
        {/* Title — fade-in-down animation on mount */}
        <div
          className="mx-auto mb-4 max-w-6xl text-center sm:mb-6 md:mb-8 transition-all duration-700 ease-out"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          <h1 className="text-xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">
            <span className="text-white">Banana 2 AI:</span><span className="gradient-glow-text">最强大的免费 AI 图像生成器</span>
          </h1>
          <h2 className="gradient-text mt-2 text-[11px] font-bold leading-snug sm:mt-3 sm:text-sm md:mt-4 md:text-base lg:text-xl">
            专业的图生图和文生图创作，适用于商业和艺术用途。<br className="sm:hidden" />几秒内获得工作室级品质，无任何附加条件。
          </h2>
        </div>

        {/* Input Box — full width, lighter background */}
        <div className="w-full rounded-lg border border-gray-400/20 bg-[#111111]/40 shadow-lg backdrop-blur-xl sm:rounded-xl">
          <div className="flex flex-col p-3 sm:p-4 md:p-6">
            {/* Upload + Textarea Row */}
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
              {/* Upload button — tilted SVG card like original */}
              <label htmlFor="hero-upload" className="flex-shrink-0 cursor-pointer group">
                <div className="-rotate-6 transition-transform hover:scale-110">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="h-16 w-16 sm:h-20 sm:w-20">
                    <path d="M10 6C10 4.89543 10.8954 4 12 4H68C69.1046 4 70 4.89543 70 6V74C70 75.1046 69.1046 76 68 76H12C10.8954 76 10 75.1046 10 74V6Z" className="fill-gray-900/40 stroke-gray-500/60 transition-colors group-hover:fill-gray-800/50 group-hover:stroke-gray-400/70" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="40" y1="25" x2="40" y2="55" className="stroke-gray-500 transition-colors group-hover:stroke-gray-400" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="25" y1="40" x2="55" y2="40" className="stroke-gray-500 transition-colors group-hover:stroke-gray-400" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <input type="file" id="hero-upload" accept="image/*" className="hidden" />
              </label>

              {/* Textarea with typewriter */}
              <div className="relative flex-1">
                {!prompt && !userFocused.current && (
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-full text-sm text-gray-400 sm:text-base" style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}>
                    {displayText}
                    <span className="ml-[1px] inline-block h-[1em] w-[2px] bg-gray-400 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
                  </div>
                )}
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="relative z-10 w-full resize-none border-none text-sm text-white outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-base"
                  style={{ background: 'transparent' }}
                  rows={3}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-2 border-gray-400/20 pt-3">
              {/* Left selectors — hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                <button className="flex h-12 items-center justify-between gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300">
                  <ImageIcon className="h-4 w-4" />
                  <span>AI 图片</span>
                  <ChevronDown className="h-4 w-4 text-white/40" />
                </button>
                <button className="flex h-12 items-center justify-between gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300">
                  <span className="truncate">{selectedModel}</span>
                  <ChevronDown className="h-4 w-4 text-white/40" />
                </button>
              </div>
              {/* Generate buttons */}
              <div className="flex w-full sm:w-auto items-center gap-2">
                <button className="flex h-10 sm:h-12 flex-1 sm:flex-none items-center justify-center gap-2 rounded-md border border-[#2c2f3a] bg-black/40 px-4 sm:px-6 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105 hover:bg-white/[0.08]"
                  style={{ background: 'linear-gradient(135deg, rgba(255,204,51,0.15), rgba(255,153,0,0.1))' }}
                >
                  <Sparkles className="h-4 w-4 text-[#ffcc33]" />
                  <span>快速生成</span>
                </button>
                <button
                  className="hidden sm:flex h-12 items-center gap-2 rounded-md px-6 text-sm font-semibold text-[#181d25] shadow-sm transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(to right, #ffde5c, #d7f4e1 50%, #e0d7ea)' }}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>创建工作流</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Tags Bar — glass capsule like original */}
        <div className="mt-4 sm:mt-6 w-full">
          <div className="flex w-full items-center justify-center px-2">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-gray-400/10 bg-black/10 px-2 py-1.5 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2.5 md:gap-4 md:px-6 md:py-3 lg:px-8 lg:py-4"
              style={{
                boxShadow: `rgba(255, 218, 42, 0.1) -2px 2.4px 18px -2.6px inset,
                  rgb(255 255 255 / 40%) -5.7px -4px 3.4px -2.7px inset,
                  rgba(255, 255, 255, 0.3) 6.7px 6.7px 3.4px -6.2px inset,
                  rgb(255 255 255 / 50%) 0px 1px 12px -5px inset,
                  rgb(255 255 255 / 40%) -6.7px -6.7px 3.4px -6.7px inset`,
              }}
            >
              {MODELS.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-1 transition-all hover:scale-105 sm:gap-1.5 md:gap-2 cursor-pointer"
                >
                  <span className="text-xs text-white/40">{m.icon}</span>
                  <span className="text-xs font-medium text-white/70 sm:text-sm">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Notices — only here, not at top */}
        <div className="mt-4 sm:mt-6 w-full">
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] sm:text-xs text-red-300/80 transition-colors hover:bg-red-500/20 cursor-pointer">
              🚫 严禁NSFW内容
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] sm:text-xs text-blue-300/80 transition-colors hover:bg-blue-500/20 cursor-pointer">
              ℹ️ 独立平台，与Google无关
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
