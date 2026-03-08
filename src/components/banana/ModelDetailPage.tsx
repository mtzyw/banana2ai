'use client';

import { useTranslations, useLocale } from 'next-intl';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import ImageGenerator, { type ExampleSlide } from './ImageGenerator';
import ModelDetailClient from './ModelDetailClient';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

export interface ModelDetailPageProps {
  modelName: string;
  modelSlug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  features: Array<{ icon: string; title: string; description: string }>;
  steps: Array<{ title: string; description: string }>;
  useCases: Array<{ title: string; description: string }>;
  testimonials: Array<{ name: string; role: string; content: string; rating: number }>;
  faqs: Array<{ question: string; answer: string }>;
  ctaTitle: string;
  ctaDescription: string;
  examples?: ExampleSlide[];
}

export default function ModelDetailPage(props: ModelDetailPageProps) {
  const {
    modelName,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroImage,
    features,
    steps,
    useCases,
    testimonials,
    faqs,
    ctaTitle,
    ctaDescription,
  } = props;

  const fadeRef = useScrollFade();
  const t = useTranslations('banana.modelDetail');
  const locale = useLocale();
  const isZh = locale === 'zh';

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">{t('home')}</Link>
          <span>/</span>
          <Link href="/image/" className="hover:text-white/70 transition-colors">{t('ai_image')}</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">{modelName}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 gradient-glow-text scroll-fade-in">
              {heroTitle}
            </h1>
            <h2 className="text-lg md:text-xl text-white/80 font-medium mb-4">{heroSubtitle}</h2>
            <p className="text-white/60 mb-6 leading-relaxed">{heroDescription}</p>
            <Link
              href="/zh/pricing/"
              className="highlight-button mb-8 inline-flex"
            >
              {t('try_now')}
            </Link>
            {/* Feature bullets */}
            <ul className="space-y-2 mt-8">
              {features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-0.5 text-[#ffcc33]">{f.icon}</span>
                  <span>{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-[#1c2030] image-hover-zoom">
            <Image
              src={heroImage}
              alt={modelName}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Image Generator Panel */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 scroll-fade-in">
          <span className="gradient-glow-text">
            {modelName}
          </span>{' '}{t('images')}
        </h2>
        <ImageGenerator examples={props.examples} />
      </section>

      {/* Why Leading Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in">
            {t('why_prefix')} <span className="text-[#ffcc33]">{modelName}</span> {t('why_title_suffix')}
          </h2>
          <ModelDetailClient features={features} />
        </div>
      </section>

      {/* Core Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          {t('why_title_suffix')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className={`gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/60 transition-all duration-300 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 gradient-glow-text">{f.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
            {t('how_subtitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className={`relative flex flex-col items-center text-center gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/40 transition-all duration-300 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center text-black font-bold text-lg mb-4 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[#ffcc33] mb-2">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-6 -right-3 z-10 items-center justify-center w-6 h-6">
                    <span className="text-[#ffcc33]/60 text-lg font-bold">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          {modelName} - {t('use_cases_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className={`relative gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-xl p-5 hover:border-[#ffcc33]/50 transition-all duration-300 group overflow-hidden scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
            >
              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 badge-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="font-semibold text-white group-hover:text-[#ffcc33] transition-colors mb-2">
                {uc.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
            {t('reviews_title')}
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          {isZh ? `关于 ${modelName} 的` : ''}{t('faq_title')}{!isZh ? ` about ${modelName}` : ''}
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>

      {/* CTA Section */}
      <section className="group relative bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20 overflow-hidden">
        {/* Background image effect */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/20 to-[#3b82f6]/10" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-glow-text scroll-fade-in">
            {ctaTitle}
          </h2>
          <p className="text-white/60 mb-8 text-lg">{ctaDescription}</p>
          <Link
            href="/zh/pricing/"
            className="highlight-button text-lg"
          >
            {t('try_now')}
          </Link>
        </div>
      </section>
    </div>
  );
}

// Smooth testimonials carousel
function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Array<{ name: string; role: string; content: string; rating: number }>;
}) {
  const perPage = 3;
  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      changePage((page + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [page, totalPages]);

  const changePage = (newPage: number) => {
    if (animating) return;
    setAnimating(true);
    setPage(newPage);
    setTimeout(() => setAnimating(false), 500);
  };

  const items = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="relative">
      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
      >
        {items.map((t, i) => (
          <div
            key={`${page}-${i}`}
            className="bg-[#0f1117] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/30 transition-all duration-300"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} className="text-[#ffcc33]">★</span>
              ))}
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
            <div>
              <div className="font-semibold text-white text-sm">{t.name}</div>
              <div className="text-xs text-white/40">{t.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => changePage((page - 1 + totalPages) % totalPages)}
            className="w-9 h-9 rounded-full bg-[#1c2030] border border-[#363b4e] flex items-center justify-center text-white/60 hover:text-[#ffcc33] hover:border-[#ffcc33]/50 transition-all"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => changePage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-6 h-2 bg-[#ffcc33]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => changePage((page + 1) % totalPages)}
            className="w-9 h-9 rounded-full bg-[#1c2030] border border-[#363b4e] flex items-center justify-center text-white/60 hover:text-[#ffcc33] hover:border-[#ffcc33]/50 transition-all"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

// Smooth FAQ accordion
function FAQAccordion({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {faqs.map((faq, i) => (
        <FAQItem key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
      ))}
    </div>
  );
}

function FAQItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#13151f] border border-[#363b4e] rounded-xl overflow-hidden transition-colors duration-200 hover:border-[#ffcc33]/30">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-left transition-colors ${
          open ? 'text-[#ffcc33]' : 'text-white hover:text-[#ffcc33]'
        }`}
      >
        {question}
        <span
          className="text-white/40 ml-4 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: open ? (contentRef.current ? contentRef.current.scrollHeight + 'px' : '500px') : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}
