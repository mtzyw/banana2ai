'use client';

import { useLocale } from 'next-intl';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Check,
  Zap,
  Image as ImageIcon,
} from 'lucide-react';


const SAMPLE_IMAGES = [
  'https://static.banana2ai.net/images/samples/xemk5igdslyy.webp',
  'https://static.banana2ai.net/images/samples/94xi4e385y5p.webp',
  'https://static.banana2ai.net/images/samples/rh3qj90a2dvh.webp',
  'https://static.banana2ai.net/images/samples/3v2z36udzbss.webp',
  'https://static.banana2ai.net/images/samples/2qc5odwjkjjo.webp',
  'https://static.banana2ai.net/images/samples/vcxetk2f3r3e.webp',
  'https://static.banana2ai.net/images/samples/ud5bmgnt8f17.webp',
  'https://static.banana2ai.net/images/samples/lti5o9223ftb.webp',
  'https://static.banana2ai.net/images/features/d4j74diw3h7n.webp',
  'https://static.banana2ai.net/images/features/6nemc9rfeqe0.webp',
  'https://static.banana2ai.net/images/features/o6onuv78986b.webp',
  'https://static.banana2ai.net/images/features/an4kmo2ls0qy.webp',
];

const GENERATION_MODELS = [
  'Flux Schnell',
  'Flux Dev',
  'Flux Pro',
  'Flux Ultra',
];

export default function FluxAIImageGeneratorPage() {
  const isZh = useLocale() === 'zh';
  const FEATURES = [
    '精准控制的双架构系统',
    '复杂空间逻辑处理',
    '无瑕的文字渲染能力',
    '商业级图像质量输出',
    '支持多种图像尺寸',
    '极速生成，无需等待',
  ];

  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('Flux Schnell');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#111111]">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-white/[0.06]">
        <nav className="flex items-center gap-1.5 text-xs text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">
            首页
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/ai-image-generator" className="hover:text-white/70 transition-colors">
            AI图像生成器
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/70">Flux AI 图像生成器</span>
        </nav>
      </div>

      <div className="px-4 sm:px-6 py-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-12">
          {/* Left: Title + Description */}
          <div className="flex-1 max-w-xl">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white mb-4">
                <span className="block">
                  <span className="mr-2">释放精准力量</span>
                  <span
                    style={{
                      background: 'linear-gradient(to right, #ffffff, #f8d24b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: 700,
                    }}
                  >
                    Flux AI
                  </span>
                </span>
                <span className="block h-0.5 w-44 rounded-full bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mt-3" />
              </h1>

              <h2 className="text-lg font-bold text-white/90 mb-3">
                全球最先进的图像引擎
              </h2>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                在我们平台体验 Flux AI 图像生成器。通过我们专业级的双架构系统，掌控复杂的空间逻辑和无暇的文字渲染。
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-yellow-400" />
                    </div>
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                style={{
                  border: '2px solid transparent',
                  backgroundImage:
                    'linear-gradient(#111111, #111111), linear-gradient(to right, #f8d24b, #f97316)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md text-base font-semibold text-white hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>免费生成</span>
              </button>
            </div>
          </div>

          {/* Right: Sample Image */}
          <div className="flex-shrink-0 w-full lg:w-[420px]">
            <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
              <img
                src={SAMPLE_IMAGES[0]}
                alt="Flux AI Sample"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Generator + Image Grid Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Generator Panel */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <h3 className="text-sm font-semibold text-white/80 mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-yellow-400" />
                Flux AI 生成器
              </h3>

              {/* Model Select */}
              <div className="mb-4">
                <label className="text-xs text-white/40 mb-1.5 block">选择模型</label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full appearance-none bg-white/[0.04] border border-white/[0.12] rounded-md px-3 py-2.5 text-sm text-white/80 pr-8 outline-none focus:border-yellow-500/50 focus:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    {GENERATION_MODELS.map((m) => (
                      <option key={m} value={m} className="bg-[#1a1a1a] text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-4">
                <label className="text-xs text-white/40 mb-1.5 block">提示词</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述您想要生成的图像..."
                  rows={4}
                  className="w-full resize-none bg-white/[0.04] border border-white/[0.12] rounded-md px-3 py-2.5 text-sm text-white/80 placeholder-white/30 outline-none focus:border-yellow-500/50 focus:bg-white/[0.06] transition-colors leading-relaxed"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#f8d24b] hover:bg-yellow-300 disabled:opacity-60 text-black text-sm font-semibold transition-colors"
              >
                <Zap className="w-4 h-4" />
                {isGenerating ? '生成中...' : '快速生成'}
              </button>
            </div>
          </div>

          {/* Right: Sample Image Grid */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white/60 mb-3">示例图片</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {SAMPLE_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden border border-white/[0.08] bg-white/[0.02] group cursor-pointer hover:border-yellow-500/30 transition-colors"
                >
                  <img
                    src={src}
                    alt={`Flux AI Sample ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
