'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const AVATARS = [
  'https://static.banana2ai.net/images/avatars/j3znhyr1jyn8.webp',
  'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
  'https://static.banana2ai.net/images/avatars/b88usp2lk4ef.webp',
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#ffcc33] text-[#ffcc33]" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('banana.testimonials');
  const ref = useScrollFade();

  const items = [0, 1, 2].map((i) => ({
    content: t(`items.${i}.content` as any),
    name: t(`items.${i}.name` as any),
    role: t(`items.${i}.role` as any),
    avatar: AVATARS[i],
    stagger: `stagger-${i + 1}`,
  }));

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t('title')}{' '}
            <span className="text-[#ffcc33]">Banana Pro AI</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className={`scroll-fade-in ${item.stagger} bg-[#1c2030] rounded-2xl p-6 border border-[#363b4e] flex flex-col gap-4 hover:border-[#ffcc33]/30 transition-colors`}
            >
              <StarRating />
              <p className="text-white/70 text-sm leading-relaxed flex-1">&quot;{item.content}&quot;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#363b4e]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-white/45 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
