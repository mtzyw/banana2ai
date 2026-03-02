'use client';

import { useTranslations } from 'next-intl';

import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

export default function HowItWorksSection() {
  const t = useTranslations('banana.howItWorks');
  const ref = useScrollFade();

  const steps = [
    {
      number: '1',
      title: t('steps.0.title'),
      description: t('steps.0.desc'),
      stagger: 'stagger-1',
    },
    {
      number: '2',
      title: t('steps.1.title'),
      description: t('steps.1.desc'),
      stagger: 'stagger-2',
    },
    {
      number: '3',
      title: t('steps.2.title'),
      description: t('steps.2.desc'),
      stagger: 'stagger-3',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Banana Pro AI{' '}
            <span className="text-[#ffcc33]">{t('title')}</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            {t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`scroll-fade-in ${step.stagger} gradient-glow-bg bg-[#1c2030] rounded-2xl p-6 border border-[#363b4e] flex flex-col gap-4 hover:border-[#ffcc33]/30 transition-colors`}
            >
              <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center shadow-lg shadow-[#ffcc33]/20">
                <span className="text-black font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
