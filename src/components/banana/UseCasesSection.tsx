'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';


export default function UseCasesSection() {
  const t = useTranslations('banana.useCases');

  const tabs = [
  {
    id: 'marketing',
    label: t('tabs.0.label'),
    image: 'https://static.banana2ai.net/images/features/usecase-marketing.webp',
    heading: t('tabs.0.heading'),
    desc: t('tabs.0.desc'),
    features: [
      t('tabs.0.bullets.0'),
      t('tabs.0.bullets.1'),
      t('tabs.0.bullets.2' as any),
      t('tabs.0.bullets.2' as any),
    ],
  },
  {
    id: 'creator',
    label: t('tabs.1.label'),
    image: 'https://static.banana2ai.net/images/features/usecase-creator.webp',
    heading: t('tabs.1.heading'),
    desc: t('tabs.1.desc' as any),
    features: [
      t('tabs.1.bullets.0' as any),
      t('tabs.1.bullets.1' as any),
      t('tabs.1.bullets.2' as any),
      t('tabs.1.bullets.2' as any),
    ],
  },
  {
    id: 'ecommerce',
    label: t('tabs.3.label'),
    image: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp',
    heading: t('tabs.3.heading' as any),
    desc: t('tabs.3.desc' as any),
    features: [
      t('tabs.3.bullets.0' as any),
      t('tabs.3.bullets.1' as any),
      t('tabs.3.bullets.2' as any),
      t('tabs.3.bullets.2' as any),
    ],
  },
  {
    id: 'game',
    label: t('tabs.2.label' as any),
    image: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
    heading: t('tabs.2.heading' as any),
    desc: t('tabs.2.desc' as any),
    features: [
      t('tabs.2.bullets.0' as any),
      t('tabs.2.bullets.1' as any),
      t('tabs.2.bullets.2' as any),
      t('tabs.2.bullets.2' as any),
    ],
  },
  ];

  const [activeId, setActiveId] = useState('marketing');
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('title')}
            <span className="text-[#ffcc33]">{t('subtitle')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            {t('subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all border overflow-hidden ${
                activeId === t.id
                  ? 'bg-[#ffcc33] text-black border-[#ffcc33]'
                  : 'bg-[#1c2030] text-white/60 border-[#363b4e] hover:border-[#ffcc33]/40 hover:text-white/90'
              }`}
            >
              {t.label}
              {activeId === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          key={activeId}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{ animation: 'fadeIn 0.4s ease' }}
        >
          {/* Left */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{active.heading}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{active.desc}</p>
            <ul className="flex flex-col gap-3">
              {active.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffcc33] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#363b4e] image-hover-zoom">
            <Image
              key={active.image}
              src={active.image}
              alt={active.heading}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
