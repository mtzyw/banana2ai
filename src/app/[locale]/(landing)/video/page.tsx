'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const VIDEO_MODELS = [
  {
    slug: '/zh/video/veo-3-video-generator/',
    name: 'Veo 3 视频生成器',
    description: '电影级品质的先进 AI 视频生成器，支持原生音频，每秒画面细腻逼真，是 Google 旗舰级视频模型。',
    icon: '🎬',
    image: '/images/banana/video-media04.jpg',
    badges: ['热门', '新功能'],
    features: ['原生音频生成', '电影级画质', '8秒-15秒时长', '文生视频/图生视频'],
  },
  {
    slug: '/zh/video/veo-3-1/',
    name: 'Veo 3.1',
    description: '具备 AI 运动控制的高质量视频生成，专为长视频连贯性和专业镜头调度而设计的 Google 最新模型。',
    icon: '🎞️',
    image: '/images/banana/video-media04.jpg',
    badges: ['新功能'],
    features: ['AI 运动控制', '长视频连贯性', '镜头调度', '高质量叙事'],
  },
  {
    slug: '/zh/video/sora-2/',
    name: 'Sora 2',
    description: 'OpenAI 推出的照片级真实感 AI 视频生成器，精准创作，支持更长时长和高级品质控制。',
    icon: '🌊',
    image: '/images/banana/w09plbs60v32.jpeg',
    badges: ['新功能'],
    features: ['照片级真实感', '原生音频', '最长 20 秒', '专业版故事板'],
  },
  {
    slug: '/zh/video/seedance-1-5-pro/',
    name: 'Seedance 1.5 Pro',
    description: '字节跳动出品的专业 AI 视频生成模型，原生音频视频联合生成，电影级画质输出。',
    icon: '💃',
    image: '/images/banana/k1zo5dpjyh3y.jpeg',
    badges: [],
    features: ['原生音频生成', '电影级画质', '动作精准捕捉', '多风格支持'],
  },
  {
    slug: '#',
    name: 'Kling AI',
    description: '功能全面的 AI 视频生成器，具备高级控制功能，支持运镜控制、角色一致性保持等专业特性。',
    icon: '🎥',
    image: '/images/banana/j3znhyr1jyn8.jpeg',
    badges: [],
    features: ['运镜精细控制', '角色一致性', '多种时长', '高级参数调节'],
  },
  {
    slug: '#',
    name: 'Wan 2.5',
    description: '高产量制作的快速 AI 视频生成器，生成速度极快，适合需要批量制作视频内容的专业用户。',
    icon: '⚡',
    image: '/images/banana/ldvemdrtofq8.jpeg',
    badges: [],
    features: ['超快生成速度', '批量制作支持', '中英文双语', '写实场景优化'],
  },
];

const HERO_IMAGES = [
  '/images/banana/video-media04.jpg',
  '/images/banana/w09plbs60v32.jpeg',
  '/images/banana/k1zo5dpjyh3y.jpeg',
];

export default function VideoListPage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const fadeRef = useScrollFade();

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
              🎬 AI 视频制作工具集
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 scroll-fade-in">
              <span className="gradient-glow-text">为专业内容创作而生</span>
              <span className="block text-white mt-2">即刻将创意转化为精彩视频</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 scroll-fade-in stagger-1">
              集成 Veo 3、Sora 2、Kling 等全球顶级 AI 视频模型，支持文生视频、图生视频，让你的创意故事动起来。
            </p>
            <div className="flex flex-wrap gap-4 scroll-fade-in stagger-2">
              <Link href="/zh/pricing/" className="highlight-button">
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
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1c2030]">
            <Image
              src={HERO_IMAGES[heroIdx]}
              alt="AI 视频示例"
              fill
              className="object-cover transition-opacity duration-500"
              style={{ opacity: heroVisible ? 1 : 0 }}
              priority
            />
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
              { label: '视频模型', value: '5款' },
              { label: '最长时长', value: '20秒' },
              { label: '支持音频', value: '原生' },
              { label: '最高分辨率', value: '1080P' },
            ].map((s, i) => (
              <div key={i} className={`scroll-fade-in stagger-${i + 1}`}>
                <div className="text-2xl md:text-3xl font-bold text-[#ffcc33]">{s.value}</div>
                <div className="text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          Banana Pro 4 个简单步骤，完成专业视频创作
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: '描述或上传你的内容', desc: '用文字描述你想要的视频场景，或上传参考图片作为起始帧。' },
            { step: '02', title: '自定义视频设置', desc: '选择视频时长、分辨率、宽高比和目标 AI 模型。' },
            { step: '03', title: '一键生成', desc: 'AI 自动处理并生成高质量视频，无需专业技能。' },
            { step: '04', title: '下载和分享', desc: '高清无水印下载，直接发布到社交媒体或用于商业项目。' },
          ].map((s, i) => (
            <div
              key={i}
              className={`gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-xl p-6 text-center hover:border-[#ffcc33]/40 transition-all duration-300 scroll-fade-in stagger-${i + 1}`}
            >
              <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center text-black font-bold text-xl mx-auto mb-3">
                {s.step}
              </div>
              <h3 className="font-semibold text-[#ffcc33] mb-2">{s.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Model Cards */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 scroll-fade-in gradient-glow-text">
            探索我们的高级 AI 视频生成模型
          </h2>
          <p className="text-center text-white/50 mb-12 scroll-fade-in stagger-1">
            每款模型都针对不同视频创作场景专项优化
          </p>

          <div className="space-y-6">
            {VIDEO_MODELS.map((model, i) => (
              <div key={model.name} className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <VideoModelSection model={model} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 scroll-fade-in gradient-glow-text">
            开始你的 AI 视频创作之旅
          </h2>
          <p className="text-white/60 mb-8 scroll-fade-in stagger-1">注册即可获得免费积分，立即体验顶级 AI 视频生成</p>
          <Link href="/zh/pricing/" className="highlight-button text-lg scroll-fade-in stagger-2">
            🎬 立即开始创作
          </Link>
        </div>
      </section>
    </div>
  );
}

function VideoModelSection({ model }: { model: (typeof VIDEO_MODELS)[0] }) {
  return (
    <div className="gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-2xl overflow-hidden hover:border-[#ffcc33]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,204,51,0.08)]">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 aspect-video md:aspect-auto flex-shrink-0 bg-[#13151f] overflow-hidden">
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full badge-gradient flex items-center justify-center text-base">
              {model.icon}
            </div>
            <h3 className="text-xl font-bold text-[#ffcc33]">{model.name}</h3>
            {model.badges.map(b => (
              <span key={b} className="px-2 py-0.5 rounded-md bg-[#ffcc33] text-black text-[10px] font-bold">
                {b}
              </span>
            ))}
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-4">{model.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {model.features.map((f) => (
              <span key={f} className="px-2.5 py-1 rounded-lg bg-[#1c2030] border border-[#363b4e] text-xs text-white/70">
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {model.slug !== '#' && (
              <Link
                href={model.slug}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#363b4e] text-white/70 text-sm hover:border-[#ffcc33]/50 hover:text-[#ffcc33] transition-all"
              >
                了解详情 →
              </Link>
            )}
            <Link
              href="/zh/pricing/"
              className="inline-flex items-center gap-2 px-5 py-2.5 highlight-button text-sm"
            >
              立即使用 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
