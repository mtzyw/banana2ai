'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ImageIcon,
  ChevronDown,
  LayoutDashboard,
  Sparkles,
  AlertTriangle,
  Info,
} from 'lucide-react';

const MODELS = [
  { label: 'Nano Banana', id: 'nano' },
  { label: 'Seedream', id: 'seedream' },
  { label: 'Flux', id: 'flux' },
  { label: 'Grok', id: 'grok' },
  { label: 'Qwen', id: 'qwen' },
  { label: 'Sora', id: 'sora' },
  { label: 'Veo', id: 'veo' },
];

const TYPEWRITER_PROMPTS = [
  'The train moves forward through a bright forest, sunlight flickering through the leaves onto the windows. A girl leans out joyfully, her hair blowing in the wind. Soft anime lighting, vibrant colors, smooth gentle motion.',
  'Cyberpunk desert warrior woman with pink-turquoise ombre hair, golden futuristic armor, steampunk goggles, standing in red canyon desert, golden hour lighting, post-apocalyptic cinematic style.',
  'Gothic anime girl with silver hair and crimson eyes, wearing an elegant black lace dress, surrounded by floating dark roses, moonlit cathedral background, dramatic lighting.',
  'A cozy mountain cabin at sunset, warm golden light spilling from windows, snow-capped peaks in background, pine trees, a winding path with lanterns, Studio Ghibli style, peaceful atmosphere.',
  'Ancient Chinese warrior princess in flowing silk robes, cherry blossom petals falling, misty mountain landscape, ink wash painting style with vivid color accents, ethereal lighting.',
];

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [activeType, setActiveType] = useState<'image' | 'video'>('image');
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');
  const [activeModelTag, setActiveModelTag] = useState('nano');

  // Typewriter state
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
        // Pause at end then start erasing
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIdxRef.current > 0) {
        charIdxRef.current--;
        setDisplayText(currentPrompt.slice(0, charIdxRef.current));
      } else {
        // Move to next prompt
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
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="/images/banana/index-video05.mp4"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        {/* Notice banners */}
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-1 text-xs text-white/80 cursor-pointer hover:bg-black/50 transition-colors">
            <AlertTriangle className="w-3 h-3 text-yellow-400" />
            严禁成人/NSFW 内容 →
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3 py-1 text-xs text-white/80 cursor-pointer hover:bg-black/50 transition-colors">
            <Info className="w-3 h-3 text-blue-400" />
            Banana Pro AI 是一个独立平台... →
          </span>
        </div>

        {/* Title */}
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
            Banana Pro AI:
            <span className="gradient-glow-text">
              最强大的免费 AI 图像生成器
            </span>
          </h1>
          <p className="text-[#ffcc33]/90 text-sm sm:text-base md:text-lg font-medium">
            专业的图生图和文生图创作，适用于商业和艺术用途。几秒内获得工作室级品质，无任何附加条件。
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full rounded-2xl border border-white/[0.15] bg-[#111111]/70 shadow-xl backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,204,51,0.15)]">
          <div className="flex flex-col p-4 sm:p-5">
            {/* Upload + Textarea Row */}
            <div className="flex items-start gap-3">
              {/* Image Upload Button */}
              <label htmlFor="hero-image-upload" className="flex-shrink-0 cursor-pointer">
                <div className="relative -rotate-6 transition-transform hover:scale-110 group">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="h-16 w-16 sm:h-20 sm:w-20">
                    <path
                      d="M10 6C10 4.89543 10.8954 4 12 4H68C69.1046 4 70 4.89543 70 6V74C70 75.1046 69.1046 76 68 76H12C10.8954 76 10 75.1046 10 74V6Z"
                      className="fill-gray-900/40 stroke-gray-500/60 group-hover:fill-gray-800/50 group-hover:stroke-gray-400/70 transition-colors"
                      strokeWidth="2" strokeDasharray="2 2"
                    />
                    <line x1="40" y1="25" x2="40" y2="55" className="stroke-gray-500 group-hover:stroke-gray-400 transition-colors" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="25" y1="40" x2="55" y2="40" className="stroke-gray-500 group-hover:stroke-gray-400 transition-colors" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <input type="file" id="hero-image-upload" accept="image/*" className="hidden" />
              </label>

              {/* Textarea with typewriter overlay */}
              <div className="relative flex-1">
                {/* Typewriter overlay */}
                {!prompt && !userFocused.current && (
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-full text-sm sm:text-base text-white/50 leading-relaxed whitespace-pre-wrap">
                    {displayText}
                    <span className="inline-block w-[2px] h-[1em] bg-white/50 ml-[1px] align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
                  </div>
                )}
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder=""
                  className="relative z-10 w-full min-h-[80px] resize-none bg-transparent text-white/90 text-sm sm:text-base outline-none leading-relaxed"
                  rows={3}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveType('image')}
                  className={`flex h-10 items-center gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300 ${activeType === 'image' ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300' : ''}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">图片</span>
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </button>
                <button className="flex h-10 items-center gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300 min-w-[120px] sm:min-w-[160px]">
                  <span className="truncate">{selectedModel}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-white/40" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-md border border-white/[0.12] bg-black/40 hover:bg-white/[0.12] text-white text-sm font-medium transition-transform hover:scale-105">
                  <Sparkles className="w-4 h-4" />
                  <span>快速生成</span>
                </button>
                <button className="flex items-center gap-2 h-10 sm:h-12 px-4 sm:px-6 rounded-md bg-[#f8d24b] hover:bg-yellow-300 text-black text-sm font-semibold transition-transform hover:scale-105">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>创建工作流</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Tags */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-400/10 bg-black/10 px-4 py-2.5 backdrop-blur-sm"
          style={{ boxShadow: 'rgba(255, 218, 42, 0.1) -2px 2.4px 18px -2.6px inset, rgba(0, 0, 0, 0.3) 0px 4px 12px' }}
        >
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModelTag(model.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                activeModelTag === model.id
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  : 'bg-white/[0.05] text-white/50 border-white/[0.1] hover:text-white/80 hover:bg-white/[0.08]'
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>

        {/* Notice badges at bottom */}
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs text-red-400 cursor-pointer hover:bg-red-500/20 transition-colors">
            🚫 严禁成人/NSFW 内容 →
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 cursor-pointer hover:bg-blue-500/20 transition-colors">
            ℹ️ Banana Pro AI 是一个独立平台... →
          </span>
        </div>

        {/* Bounce arrow */}
        <div className="animate-bounce mt-2 text-white/40">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
