'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';
import LazyVideo from '@/components/banana/LazyVideo';



const media: Array<{ type: 'video' | 'image'; src: string }> = [
  { type: 'video', src: 'https://static.banana2ai.net/videos/showcase-1.mp4' },
  { type: 'image', src: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp' },
  { type: 'image', src: 'https://static.banana2ai.net/images/avatars/l8af5arb7l0d.webp' },
  { type: 'image', src: 'https://static.banana2ai.net/images/avatars/8pk4idwouhh0.webp' },
  { type: 'image', src: 'https://static.banana2ai.net/images/showcase/ai-models.webp' },
  { type: 'image', src: 'https://static.banana2ai.net/images/features/oymo6e4j50qi.webp' },
];

export default function ShowcaseSection() {
  const ref = useScrollFade();
  const t = useTranslations('banana.showcase');
  const features = [0,1,2,3].map(i => ({ title: t(`items.${i}.title` as any), desc: t(`items.${i}.desc` as any) }));

  return (
    <section className="relative px-4 py-12 md:py-24 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('title')}
            <span className="gradient-glow-text">{t('subtitle')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Banana Pro AI {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Feature List */}
          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`flex gap-4 items-start scroll-fade-left stagger-${i + 1}`}>
                <CheckCircle className="w-6 h-6 text-[#ffcc33] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">{f.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Media Grid (video + images) */}
          <div className="grid grid-cols-2 gap-3 scroll-fade-right">
            {media.map((item, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden image-hover-zoom gradient-glow-bg">
                {item.type === 'video' ? (
                  <LazyVideo
                    className="h-full w-full object-cover"
                    src={item.src}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`Banana Pro AI showcase ${i + 1}`}
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
