'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

const TYPEWRITER_PROMPTS = [
  'The train moves forward through a bright forest, sunlight flickering through the leaves onto the windows. A girl leans out joyfully, her hair blowing in the wind. Soft anime lighting, vibrant colors, smooth gentle motion.',
  'Cyberpunk desert warrior woman with pink-turquoise ombre hair, golden futuristic armor, steampunk goggles, standing in red canyon desert, golden hour lighting, post-apocalyptic cinematic style.',
  'Gothic anime girl with silver hair and crimson eyes, wearing an elegant black lace dress, surrounded by floating dark roses, moonlit cathedral background, dramatic lighting.',
  'A cozy mountain cabin at sunset, warm golden light spilling from windows, snow-capped peaks in background, pine trees, a winding path with lanterns, Studio Ghibli style, peaceful atmosphere.',
  'Filling black and white portraits with appropriate colors can create a sense of realism.',
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
  const promptIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const userFocused = useRef(false);

  const doTypewriter = useCallback(() => {
    if (userFocused.current) return;
    const currentPrompt = TYPEWRITER_PROMPTS[promptIdxRef.current];
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
        promptIdxRef.current = (promptIdxRef.current + 1) % TYPEWRITER_PROMPTS.length;
        setIsTyping(true);
      }
    }
  }, [isTyping]);

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
      promptIdxRef.current = (promptIdxRef.current + 1) % TYPEWRITER_PROMPTS.length;
      setIsTyping(true);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-gradient-to-b from-black/40 to-black/60">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="/images/banana/index-video05.mp4"
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
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">
            Banana Pro AI:<span className="gradient-glow-text">最强大的免费 AI 图像生成器</span>
          </h1>
          <h2 className="gradient-text mt-2 text-xs font-bold sm:mt-3 sm:text-sm md:mt-4 md:text-base lg:text-xl">
            专业的图生图和文生图创作，适用于商业和艺术用途。几秒内获得工作室级品质，无任何附加条件。
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
                  className="relative z-10 w-full resize-none border-none bg-transparent text-sm text-white outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-base"
                  rows={3}
                />
              </div>
            </div>

            {/* Bottom Controls — no border-t like original */}
            <div className="flex items-center justify-between gap-2 border-gray-400/20 pt-3">
              <div className="flex items-center gap-2 sm:gap-3">
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
              <div className="flex items-center gap-2">
                <button className="flex h-12 items-center gap-2 rounded-md border border-[#2c2f3a] bg-black/40 px-4 text-sm font-medium text-white shadow-sm transition-transform hover:scale-105 hover:bg-white/[0.08] sm:px-6">
                  <Sparkles className="h-4 w-4" />
                  <span>快速生成</span>
                </button>
                <button
                  className="flex h-12 items-center gap-2 rounded-md px-4 text-sm font-semibold text-[#181d25] shadow-sm transition-transform hover:scale-105 sm:px-6"
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
        <div className="mt-6 w-full">
          <div className="flex w-full items-center justify-center px-2">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-400/10 bg-black/10 px-3 py-2 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-2.5 md:gap-4 md:px-6 md:py-3 lg:px-8 lg:py-4"
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
        <div className="mt-6 w-full">
          <div className="flex w-full items-center justify-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-300/80 transition-colors hover:bg-red-500/20 cursor-pointer">
              🚫 严禁成人/NSFW 内容 →
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300/80 transition-colors hover:bg-blue-500/20 cursor-pointer">
              ℹ️ Banana Pro AI 是一个独立平台... →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
