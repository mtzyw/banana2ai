'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const features = [
  {
    id: 'ai-gen',
    title: 'AI图像生成器',
    subtitle: '核心功能',
    desc: 'Banana Pro AI创意能力的核心。我们的AI图像生成器提供双重功能：图像到图像可通过智能风格迁移转换现有照片，文本到图像可根据描述创建令人惊艳的原创图像。非常适合设计师、营销人员、内容创作者以及任何需要快速获取专业图像的用户。',
    image: 'https://static.banana2ai.net/images/models/features-ai-gen.webp',
  },
  {
    id: 'text-to-image',
    title: '文生图',
    subtitle: '文字描述生成图像',
    desc: '只需输入文字描述，Banana Pro AI 即可将您的想象转化为高质量图像。支持多种风格，从写实摄影到动漫插画，满足各种创作需求。',
    image: 'https://static.banana2ai.net/images/showcase/interactive-tools.webp',
  },
  {
    id: 'image-to-image',
    title: '图生图',
    subtitle: '以图为参考生成变体',
    desc: '上传您的参考图片，Banana Pro AI 将智能分析并生成风格化变体。保留原图结构的同时，赋予全新的艺术风格和创意表达。',
    image: 'https://static.banana2ai.net/images/showcase/video-generation.webp',
  },
  {
    id: 'ai-portrait',
    title: 'AI写真',
    subtitle: '专业级人像生成',
    desc: '使用 Banana Pro AI 生成媲美专业摄影的高质量人像写真，支持多种光影风格和场景背景，打造完美的个人形象。',
    image: 'https://static.banana2ai.net/images/avatars/i0ygz1dtdza3.webp',
  },
  {
    id: 'ai-avatar',
    title: 'AI头像',
    subtitle: '个性化头像生成',
    desc: '一键生成独具个性的AI头像，适用于社交媒体、游戏、职业档案等各种场景，展现您的独特风格。',
    image: 'https://static.banana2ai.net/images/showcase/interactive-tools.webp',
  },
  {
    id: 'style-transfer',
    title: '风格迁移',
    subtitle: '艺术风格自由切换',
    desc: 'Banana Pro AI 提供丰富的艺术风格库和专业预设模板。轻松自定义强度、组合风格，在照片写实主义和艺术化表现之间无缝切换，打造专属美学风格。',
    image: 'https://static.banana2ai.net/images/showcase/video-generation.webp',
  },
];

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState('ai-gen');
  const active = features.find((f) => f.id === activeId) ?? features[0];
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            深入了解 Banana Pro AI：
            <span className="text-[#ffcc33]">您的完整创意工具包</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Banana Pro AI 提供强大的图像生成工具套件，具备图像到图像转换和文本到图像创建功能，并辅以多种创意能力。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Feature List */}
          <div className="flex flex-col gap-2 scroll-fade-in stagger-2">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className={`text-left rounded-xl px-5 py-4 transition-all border relative ${
                  activeId === f.id
                    ? 'bg-[#1c2030] border-[#ffcc33]/40 shadow-lg shadow-[#ffcc33]/5'
                    : 'border-transparent hover:bg-[#1c2030]/50'
                }`}
              >
                {/* Active indicator bar */}
                {activeId === f.id && (
                  <span className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-[#ffcc33]" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`font-semibold text-base transition-colors ${
                        activeId === f.id ? 'text-[#ffcc33]' : 'text-white/80'
                      }`}
                    >
                      {f.title}
                    </span>
                    <span className="ml-2 text-xs text-white/40">{f.subtitle}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeId === f.id ? 'text-[#ffcc33] rotate-90' : 'text-white/30'
                    }`}
                  />
                </div>
                {activeId === f.id && (
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">{f.desc}</p>
                )}
              </button>
            ))}
          </div>

          {/* Right: Feature Image */}
          <div className="lg:sticky lg:top-24 scroll-fade-right stagger-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#363b4e]">
              <Image
                key={active.image}
                src={active.image}
                alt={active.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-semibold text-lg">{active.title}</p>
                <p className="text-white/60 text-sm">{active.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
