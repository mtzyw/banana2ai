'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

// features array moved inside component

export default function FeaturesSection() {
  const t = useTranslations('banana.features');
  const features = [
  {
    id: 'ai-gen',
    title: t('sectionTitle'),
    subtitle: t('sectionSubtitle'),
    desc: t('sectionDesc'),
    image: 'https://static.banana2ai.net/images/models/features-ai-gen.webp',
  },
  {
    id: 'text-to-image',
    title: t('tabs.0.title'),
    subtitle: t('tabs.0.subtitle'),
    desc: t('tabs.0.desc'),
    image: 'https://static.banana2ai.net/images/features/text-to-image-concept.webp',
  },
  {
    id: 'image-to-image',
    title: t('tabs.1.title'),
    subtitle: t('tabs.1.subtitle'),
    desc: t('tabs.1.desc'),
    image: 'https://static.banana2ai.net/images/features/image-to-image-concept.webp',
  },
  {
    id: 'ai-portrait',
    title: t('tabs.2.title'),
    subtitle: t('tabs.2.subtitle'),
    desc: t('tabs.2.desc'),
    image: 'https://static.banana2ai.net/images/avatars/i0ygz1dtdza3.webp',
  },
  {
    id: 'ai-avatar',
    title: t('tabs.3.title'),
    subtitle: t('tabs.3.subtitle'),
    desc: t('tabs.3.desc'),
    image: 'https://static.banana2ai.net/images/features/ai-avatar-showcase.webp',
  },
  {
    id: 'style-transfer',
    title: t('tabs.4.title'),
    subtitle: t('tabs.4.subtitle'),
    desc: t('tabs.4.desc'),
    image: 'https://static.banana2ai.net/images/features/style-transfer-showcase.webp',
  },
];

  const [activeId, setActiveId] = useState('ai-gen');
  const active = features.find((f) => f.id === activeId) ?? features[0];
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('sectionTitle')}
            <span className="text-[#ffcc33]">{t('sectionSubtitle')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            {t('sectionDesc')}</p>
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
