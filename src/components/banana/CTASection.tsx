'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

export default function CTASection() {
  const ref = useScrollFade();

  return (
    <section className="relative py-24 md:py-36 px-4 overflow-hidden">
      {/* Background Image with subtle zoom on hover */}
      <div className="absolute inset-0 group/bg overflow-hidden">
        <Image
          src="/images/banana/cta-cover.jpeg"
          alt="CTA background"
          fill
          className="object-cover transition-transform duration-700 group-hover/bg:scale-105"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center" ref={ref}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight scroll-fade-in">
          <span className="text-white">立即使用 Banana Pro AI </span>
          <span className="gradient-glow-text">开始创作精美图像</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-8 scroll-fade-in stagger-2">
          加入数百万创作者，永久完全免费
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
    </section>
  );
}
