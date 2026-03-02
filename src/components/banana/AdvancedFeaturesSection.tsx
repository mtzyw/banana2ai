'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { Shield, Image as ImageIcon, Layers, Zap, Gift, Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';
import LazyVideo from '@/components/banana/LazyVideo';

const showcaseMedia: Array<{ type: 'video' | 'image'; src: string }> = [
  { type: 'video', src: 'https://static.banana2ai.net/videos/showcase-2.mp4' },
  { type: 'image', src: 'https://static.banana2ai.net/images/features/commercial-product-ai.webp' },
  { type: 'video', src: 'https://static.banana2ai.net/videos/showcase-3.mp4' },
  { type: 'image', src: 'https://static.banana2ai.net/images/features/creative-workspace-ai.webp' },
  { type: 'video', src: 'https://static.banana2ai.net/videos/showcase-4.mp4' },
  { type: 'image', src: 'https://static.banana2ai.net/images/features/batch-generation-showcase.webp' },
];

export default function AdvancedFeaturesSection() {
  const ref = useScrollFade();
  const t = useTranslations('banana.advancedFeatures');

  const features = [
  {
    icon: Shield,
    title: t('items.0.title'),
    desc: t('items.0.desc'),
  },
  {
    icon: ImageIcon,
    title: t('items.1.title'),
    desc: t('items.1.desc'),
  },
  {
    icon: Layers,
    title: t('items.2.title'),
    desc: t('items.2.desc'),
  },
  {
    icon: Zap,
    title: t('items.3.title' as any),
    desc: t('items.3.desc' as any),
  },
  {
    icon: Gift,
    title: t('items.4.title' as any),
    desc: t('items.4.desc' as any),
  },
  {
    icon: Star,
    title: t('items.4.title' as any),
    desc: t('items.4.desc' as any),
  },
];

  return (
    <section className="relative px-4 py-16 md:py-24 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-glow-text">{t('title')}</span>
            <span className="text-white"></span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            {t('subtitle')}</p>
        </div>

        {/* Two-column: features left, media right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`scroll-fade-in stagger-${i + 1} gradient-glow-bg group bg-[#1c2030] rounded-2xl p-5 border border-[#363b4e] flex gap-3 hover:border-[#ffcc33]/30 transition-colors`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl badge-gradient flex items-center justify-center shadow-md shadow-[#ffcc33]/20">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-[#ffcc33] transition-colors">{f.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Video/Image showcase grid */}
          <div className="grid grid-cols-2 gap-3 scroll-fade-right">
            {showcaseMedia.map((item, i) => (
              <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden image-hover-zoom">
                {item.type === 'video' ? (
                  <LazyVideo
                    className="h-full w-full object-cover"
                    src={item.src}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`Advanced feature ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
