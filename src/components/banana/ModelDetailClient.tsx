'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import Image from 'next/image';

interface Feature {
  icon: string;
  title: string;
  description: string;
}


export default function ModelDetailClient({ features }: { features: Feature[] }) {
  const t = useTranslations('banana.modelClient');

  const TABS = [
  {
    label: t('sections.0.label'),
    image: 'https://static.banana2ai.net/images/models/ai-engine.webp',
    imageAlt: t('sections.0.heading'),
    heading: t('sections.0.heading'),
    highlight: t('sections.0.highlight'),
    body: t('sections.0.body'),
  },
  {
    label: t('sections.3.label'),
    image: 'https://static.banana2ai.net/images/models/consistency.webp',
    imageAlt: t('sections.3.heading'),
    heading: t('sections.3.heading'),
    highlight: t('sections.3.highlight'),
    body: t('sections.3.body'),
  },
  {
    label: t('sections.4.label'),
    image: 'https://static.banana2ai.net/images/models/dual-mode.webp',
    imageAlt: t('sections.4.heading'),
    heading: t('sections.4.heading'),
    highlight: t('sections.4.highlight'),
    body: t('sections.4.body'),
  },
  {
    label: t('sections.5.label'),
    image: 'https://static.banana2ai.net/images/models/free-tier.webp',
    imageAlt: t('sections.5.heading'),
    heading: t('sections.5.heading'),
    highlight: t('sections.5.highlight'),
    body: t('sections.5.body'),
  },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleTabChange = (i: number) => {
    if (i === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(i);
      setVisible(true);
    }, 250);
  };

  const tab = TABS[activeTab];

  return (
    <div>
      {/* Subtitle */}
      <p className="mx-auto mb-8 max-w-4xl text-center text-sm text-white/50 md:text-base">
        </p>

      {/* Tab buttons */}
      <div className="mb-8 hidden flex-wrap justify-center gap-4 md:flex">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => handleTabChange(i)}
            className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
              activeTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {t.label}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
              style={{ opacity: activeTab === i ? 1 : 0, transform: activeTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </button>
        ))}
      </div>

      {/* Mobile tabs (vertical) */}
      <div className="mb-6 flex flex-col gap-2 md:hidden">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => handleTabChange(i)}
            className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-[#ffcc33]/10 text-[#ffcc33] border border-[#ffcc33]/30'
                : 'bg-[#1c2030] text-white/50 border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content — left image + right text */}
      <div className="relative min-h-[400px] md:min-h-[600px]">
        <div
          className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <Image
              src={tab.image}
              alt={tab.imageAlt}
              width={600}
              height={550}
              className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 ease-in-out hover:scale-105 md:max-h-[550px]"
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-2xl font-bold text-white md:mb-4 md:text-3xl lg:text-4xl">
              {tab.heading}
            </h3>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
              <span className="gradient-glow-text text-sm font-semibold md:text-base">{tab.highlight}</span>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-white/60 md:text-base">
              {tab.body}
            </p>
            <a
              href="/zh/image/banana-pro-ai/"
              className="highlight-button inline-flex w-full justify-center md:w-auto"
            >
              Try Banana Pro AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
