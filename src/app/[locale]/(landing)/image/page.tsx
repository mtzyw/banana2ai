'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const IMAGE_MODELS = [
  {
    slug: 'banana-pro-ai',
    name: 'Banana Pro AI',
    description: '基于 Google 最新多模态大模型，业界领先的文生图与图生图能力，极速生成高质量图像。',
    icon: '🍌',
    image: '/images/banana/1tpln4as6p33.jpeg',
    badges: ['新功能', '热门'],
  },
  {
    slug: 'flux-ai-image-generator',
    name: 'Flux AI 图像生成器',
    description: '由 Black Forest Labs 打造，超强提示词跟随能力，专业级构图与细节控制，多种艺术风格覆盖。',
    icon: '⚡',
    image: '/images/banana/3rh7in3ztrd9.jpeg',
    badges: [],
  },
  {
    slug: 'seedream-ai',
    name: 'Seedream AI',
    description: '字节跳动出品，卓越的中文语义理解，东方美学专项优化，支持国风、古风等特色视觉风格。',
    icon: '🌸',
    image: '/images/banana/5aqwpua9noqi.jpeg',
    badges: [],
  },
  {
    slug: 'grok-imagine',
    name: 'Grok Imagine',
    description: 'xAI 出品，每次请求生成 6 张独特图像，独特视觉语言风格，擅长概念艺术和科幻场景。',
    icon: '🔮',
    image: '/images/banana/8pk4idwouhh0.jpeg',
    badges: [],
  },
  {
    slug: 'z-image-turbo',
    name: 'Z Image Turbo',
    description: '通义-MAI 超快 60 亿参数模型，照片级真实感，支持中英文双语文字渲染，极速批量生成。',
    icon: '🚀',
    image: '/images/banana/b88usp2lk4ef.jpeg',
    badges: ['新功能'],
  },
  {
    slug: 'qwen-image-edit',
    name: 'Qwen 图像编辑',
    description: '阿里云通义千问驱动，自然语言指令精确图像编辑，支持背景替换、局部修改、风格迁移等高级功能。',
    icon: '✏️',
    image: '/images/banana/d5gn3mlwmm7n.jpeg',
    badges: [],
  },
];

const HERO_IMAGES = [
  '/images/banana/1tpln4as6p33.jpeg',
  '/images/banana/f4ru78usquup.jpeg',
  '/images/banana/j3znhyr1jyn8.jpeg',
];

export default function ImageListPage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const fadeRef = useScrollFade();

  // Auto-cycle hero images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroVisible(false);
      setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
        setHeroVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] text-sm font-medium mb-6">
              ✨ AI 图像制作工具集
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 scroll-fade-in">
              <span className="gradient-glow-text">Banana Pro AI</span>
              <span className="block text-white mt-2">高级图生图编辑器</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 scroll-fade-in stagger-1">
              将任何照片转换为精美艺术作品。集成 6 款顶级 AI 图像生成模型，满足你所有的视觉创作需求。
            </p>
            <div className="flex flex-wrap gap-4 scroll-fade-in stagger-2">
              <Link href="/zh/image/banana-pro-ai/" className="highlight-button">
                ✨ 立即开始创作
              </Link>
              <Link
                href="/zh/pricing/"
                className="px-6 py-3 rounded-xl bg-[#1c2030] border border-[#363b4e] text-white font-semibold hover:border-[#ffcc33]/50 transition-colors"
              >
                查看定价
              </Link>
            </div>
          </div>

          {/* Right: Hero image carousel */}
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-[#1c2030]">
            <Image
              src={HERO_IMAGES[heroIdx]}
              alt="AI 图像示例"
              fill
              className="object-cover transition-opacity duration-500"
              style={{ opacity: heroVisible ? 1 : 0 }}
              priority
            />
            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setHeroIdx(i); setHeroVisible(true); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === heroIdx ? 'w-5 h-1.5 bg-[#ffcc33]' : 'w-1.5 h-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#363b4e] bg-[#13151f] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: '活跃用户', value: '500万+' },
              { label: '生成图像', value: '1亿+' },
              { label: 'AI 模型', value: '6款' },
              { label: '用户满意度', value: '98%' },
            ].map((s, i) => (
              <div key={i} className={`scroll-fade-in stagger-${i + 1}`}>
                <div className="text-2xl md:text-3xl font-bold text-[#ffcc33]">{s.value}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 scroll-fade-in gradient-glow-text">
          探索我们的 AI 图像生成模型
        </h2>
        <p className="text-center text-white/50 mb-12 scroll-fade-in stagger-1">
          每款模型都针对不同创作场景进行专项优化，总有一款适合你
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGE_MODELS.map((model, i) => (
            <div key={model.slug} className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <ModelCard model={model} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 scroll-fade-in gradient-glow-text">
            立即开启 AI 图像创作
          </h2>
          <p className="text-white/60 mb-8 scroll-fade-in stagger-1">注册即可免费体验，无需信用卡</p>
          <Link href="/zh/pricing/" className="highlight-button text-lg scroll-fade-in stagger-2">
            ✨ 免费开始使用
          </Link>
        </div>
      </section>
    </div>
  );
}

function ModelCard({
  model,
}: {
  model: (typeof IMAGE_MODELS)[0];
}) {
  return (
    <Link
      href={`/zh/image/${model.slug}/`}
      className="group block gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-2xl overflow-hidden hover:border-[#ffcc33]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,204,51,0.12)] hover:scale-[1.02]"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-[#0f1117]">
        <Image
          src={model.image}
          alt={model.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        {model.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {model.badges.map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 rounded-md bg-[#ffcc33] text-black text-[10px] font-bold"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full badge-gradient flex items-center justify-center text-base">
            {model.icon}
          </div>
          <h3 className="font-semibold text-white group-hover:text-[#ffcc33] transition-colors">
            {model.name}
          </h3>
        </div>
        <p className="text-sm text-white/55 leading-relaxed mb-4">{model.description}</p>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#ffcc33]">
          立即使用
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
