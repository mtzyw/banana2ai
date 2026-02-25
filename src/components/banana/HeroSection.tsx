'use client';

import { useState, useEffect } from 'react';
import {
  ImageIcon,
  VideoIcon,
  ChevronDown,
  Zap,
  LayoutDashboard,
  Sparkles,
  Upload,
  AlertTriangle,
  Info,
  ChevronDown as ChevronDownBounce,
} from 'lucide-react';

const HERO_IMAGES = [
  '/images/banana/video-media04.jpg',
  '/images/banana/f4ru78usquup.jpeg',
  '/images/banana/b88usp2lk4ef.jpeg',
  '/images/banana/d5gn3mlwmm7n.jpeg',
  '/images/banana/ldvemdrtofq8.jpeg',
];

const MODELS = [
  { label: 'Nano Banana', id: 'nano' },
  { label: 'Seedream', id: 'seedream' },
  { label: 'Flux', id: 'flux' },
  { label: 'Grok', id: 'grok' },
  { label: 'Qwen', id: 'qwen' },
  { label: 'Sora', id: 'sora' },
  { label: 'Veo', id: 'veo' },
];

const GENERATION_MODELS = [
  'Nano Banana Pro',
  'Seedream V2',
  'Flux Schnell',
  'Grok Aurora',
  'Qwen VL',
  'Sora',
];

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [activeType, setActiveType] = useState<'image' | 'video'>('image');
  const [selectedModel, setSelectedModel] = useState('Nano Banana Pro');
  const [activeModelTag, setActiveModelTag] = useState('nano');
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Images with crossfade */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === currentBgIndex ? 1 : 0,
          }}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        {/* Top notice banners */}
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
            Banana Pro AI:{' '}
            <span className="gradient-glow-text">
              最强大的免费 AI 图像生成器
            </span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium">
            专业的图生图和文生图创作，适用于商业和艺术用途。几秒内获得工作室级品质，无任何附加条件。
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full rounded-2xl border border-white/[0.15] bg-[#111111]/70 shadow-xl backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(255,204,51,0.15)]">
          <div className="flex flex-col p-4 sm:p-5">
            {/* Upload + Textarea Row */}
            <div className="flex items-start gap-3">
              {/* Image Upload Button */}
              <label
                htmlFor="hero-image-upload"
                className="flex-shrink-0 cursor-pointer"
              >
                <div className="relative -rotate-6 transition-transform hover:scale-110 group">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 sm:h-20 sm:w-20"
                  >
                    <path
                      d="M10 6C10 4.89543 10.8954 4 12 4H68C69.1046 4 70 4.89543 70 6V74C70 75.1046 69.1046 76 68 76H12C10.8954 76 10 75.1046 10 74V6Z"
                      className="fill-gray-900/40 stroke-gray-500/60 group-hover:fill-gray-800/50 group-hover:stroke-gray-400/70 transition-colors"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />
                    <line
                      x1="40"
                      y1="25"
                      x2="40"
                      y2="55"
                      className="stroke-gray-500 group-hover:stroke-gray-400 transition-colors"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="25"
                      y1="40"
                      x2="55"
                      y2="40"
                      className="stroke-gray-500 group-hover:stroke-gray-400 transition-colors"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <input
                  type="file"
                  id="hero-image-upload"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              {/* Textarea */}
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="The train moves forward through a bright forest, sunlight flickering through the leaves onto the windows. A girl leans out joyfully, her hair blowing in the wind. Soft anime lighting, vibrant colors, smooth gentle motion."
                className="flex-1 min-h-[80px] resize-none bg-transparent text-white/90 placeholder-white/30 text-sm sm:text-base outline-none leading-relaxed"
                rows={3}
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-white/[0.08]">
              {/* Left: Type + Model Selection */}
              <div className="flex items-center gap-2">
                {/* Type Selector: Image */}
                <button
                  onClick={() => setActiveType('image')}
                  className={`flex h-10 items-center gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300 ${activeType === 'image' ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300' : ''}`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">图片</span>
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </button>

                {/* Model Dropdown */}
                <button className="flex h-10 items-center gap-2 rounded-lg border border-gray-400/20 bg-black/20 px-3 text-sm text-white transition-colors hover:border-gray-300 min-w-[120px] sm:min-w-[160px]">
                  <span className="truncate">{selectedModel}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0 text-white/40" />
                </button>
              </div>

              {/* Right: Action Buttons */}
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

        {/* Model Tags Row */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-400/10 bg-black/10 px-4 py-2.5 backdrop-blur-sm"
          style={{
            boxShadow:
              'rgba(255, 218, 42, 0.1) -2px 2.4px 18px -2.6px inset, rgba(0, 0, 0, 0.3) 0px 4px 12px',
          }}
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

        {/* Bounce arrow */}
        <div className="animate-bounce mt-2 text-white/40">
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
