'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

export default function FAQSection() {
  const t = useTranslations('banana.faq');
  const faqs = Array.from({length: 8}, (_, i) => ({
    q: t(`items.${i}.q` as any),
    a: t(`items.${i}.a` as any),
  }));
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollFade();

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            <span className="text-[#ffcc33]">{t('title')}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="scroll-fade-in bg-[#1c2030] rounded-xl border border-[#363b4e] overflow-hidden transition-colors hover:border-[#ffcc33]/20"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-sm md:text-base group"
                >
                  <span className={`transition-colors ${isOpen ? 'text-[#ffcc33]' : 'text-white group-hover:text-[#ffcc33]'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
