'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';
import LazyVideo from '@/components/banana/LazyVideo';

export default function CTASection() {
  const ref = useScrollFade();

  return (
    <section className="relative px-4 py-20 md:py-28 overflow-hidden">
      {/* Two-column layout like original */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" ref={ref}>
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight scroll-fade-in">
            <span className="text-white">立即使用 Banana Pro AI </span>
            <span className="gradient-glow-text">开始创作精美图像</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg mb-8 scroll-fade-in stagger-2">
            加入数百万信赖 Banana Pro AI 作为首选 AI 图像生成器的创作者、营销人员和艺术家行列。在几秒内将您的创意转化为现实——完全免费，永久可用。
          </p>
          <div className="scroll-fade-in stagger-3">
            <a
              href="#"
              className="highlight-button gap-2 shadow-lg shadow-[#ffcc33]/20"
            >
              免费开始创作
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: Video showcase */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl scroll-fade-right">
          <LazyVideo
            className="h-full w-full object-cover"
            src="https://static.banana2ai.net/videos/cta-bg.mp4"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
