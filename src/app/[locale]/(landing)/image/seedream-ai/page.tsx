'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Why Section (icon-box cards 2-col, no tabs) ─── */
const WHY_CARDS = [
  {
    icon: 'https://static.banana2ai.net/images/icons/step-video.webp',
    title: '智能文本到图像生成',
    desc: '这项技术允许您输入详细的提示词并接收准确、高保真的图像。Seedream AI 旨在理解细微差别，确保即使是最抽象的概念也能清晰呈现。无论是写实肖像还是复杂的工程图，系统都能专业应对，是所有用户值得信赖的 Seedream AI 生成器。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
    title: '排版与布局精度',
    desc: 'Seedream AI 通过集成先进的文本渲染技术，解决了文本乱码的常见问题。创建海报、书籍封面和社交媒体横幅，使其排版与背景一样精美。我们的系统确保您的信息无缝融入视觉构图，提供无需额外编辑的专业成品。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
    title: '可扩展的 4K 专业输出',
    desc: '该引擎专为追求规模的专业输出而构建。通过 Seedream AI 框架生成的每张图像都可以放大到 4K 分辨率，且不丢失关键细节。这种可扩展性使 Seedream AI 适用于专业印刷媒体和高清数字显示。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-describe.webp',
    title: '创意资产管理',
    desc: '管理您的 Seedream AI 作品非常简单。生成的每张图像都存储在您的个人云端库中，方便随时访问。组织您的创意项目，优化之前的生成内容，并与同事或客户分享您的专业作品集。',
  },
];

/* ─── Features (alternating 2-col layout) ─── */
const FEATURES = [
  {
    title: '革命性的文生图精度',
    image: 'https://static.banana2ai.net/images/features/5odukgz1kwh1.webp',
    desc: '我们的平台利用 Seedream AI 先进的 4.0 架构，重新定义了文本概念转化为艺术的方式。与标准视觉模型不同，该技术能理解深层语境，从而以像素级的准确度生成复杂的图表、数学公式和错综复杂的有机纹理。Seedream AI 确保您的创意愿景在转化过程中永不失真。',
  },
  {
    title: '原生 4K 超高清输出',
    image: 'https://static.banana2ai.net/images/features/b7x76vc0165t.webp',
    desc: '在我们的平台上，输出质量是不容妥协的。Seedream AI 框架专为生产原生 4K 分辨率图像而设计，即使在为专业用途放大时也能保持惊人的锐度。这使得 Seedream AI 工具成为大规模印刷、高端广告和专业 UI/UX 设计的完美选择。该模型在模拟真实光照、景深和复杂色彩渐变方面表现卓越。',
  },
  {
    title: '高级逻辑与排版',
    image: 'https://static.banana2ai.net/images/features/cl4059dlq53y.webp',
    desc: 'Seedream AI 的一个突出特点是其处理复杂排版和结构化逻辑布局的能力。无论您是需要带有特定文字的宣传海报，还是带有精确标注的科学插图，生成引擎都能交付专业的结果。该模型理解元素间的空间关系，确保文字清晰可辨且布局美观平衡。',
  },
];

/* ─── Steps ─── */
const STEPS = [
  { title: '革命性的文生图精度', desc: '输入您的创意提示词，Seedream AI 的 4.0 架构将以像素级的准确度理解深层语境，生成高保真视觉效果。' },
  { title: '原生 4K 超高清输出', desc: '选择分辨率和尺寸，系统将生成专为专业用途设计的原生 4K 图像，细节惊人、锐度卓越。' },
  { title: '高级逻辑与排版', desc: '下载您的成品。Seedream AI 确保文字清晰可辨、布局美观平衡，无需额外编辑即可直接用于专业场景。' },
];

/* ─── Use Cases (tab + image layout) ─── */
const USE_CASE_TABS = [
  {
    label: '营销',
    title: 'Seedream AI 营销解决方案',
    image: 'https://static.banana2ai.net/images/features/5n49h9o8u5jc.webp',
    desc: 'Seedream AI 引擎是营销机构和增长团队的游戏规则改变者。在数秒内生成高转化率的广告创意、社交媒体视觉效果和品牌资产。我们的集成支持视觉活动的快速原型设计，让您无需承担传统制作的高昂成本即可测试多种审美风格。',
  },
  {
    label: '艺术与设计',
    title: '概念艺术与原型设计',
    image: 'https://static.banana2ai.net/images/features/e0pf3x87pvqw.webp',
    desc: '对于游戏和电影行业的概念艺术家，Seedream AI 可作为无限的情绪板进行快速迭代。利用生成器快速可视化环境设计、角色剪影和光影基调。底层模型经过大量艺术风格训练，允许您将传统技法与未来感概念完美融合。',
  },
  {
    label: '建筑',
    title: '空间可视化与渲染',
    image: 'https://static.banana2ai.net/images/features/1ocx4fy5iztz.webp',
    desc: 'Seedream AI 内部的技术在空间推理方面表现出色，使其成为室内设计师和建筑师的得力工具。输入您的尺寸和风格偏好，系统将生成生活空间、办公室或景观设计的写实渲染图。Seedream AI 帮助客户在施工开始前就预见最终效果。',
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: 'Mike',
    role: '设计机构创始人',
    avatar: 'https://static.banana2ai.net/images/avatars/95ls4obu8n1r.webp',
    quote: 'Seedream AI 彻底改变了我机构的设计工作流。Seedream AI 中的文本渲染比我用过的任何工具都要先进。我们现在可以在几分钟内生成过去需要数小时手动排版的海报概念。',
  },
  {
    name: 'Fiona',
    role: '建筑可视化师',
    avatar: 'https://static.banana2ai.net/images/avatars/ffer5qw3809o.webp',
    quote: 'Seedream AI 的分辨率简直令人惊叹。我将其用于建筑可视化，4K 输出的清晰度足以直接进行客户演示。该模型对光照和材质的理解甚至优于大多数渲染软件。它非常高效，每次都能产出惊艳的效果。',
  },
  {
    name: 'Elena',
    role: '社交媒体策略师',
    avatar: 'https://static.banana2ai.net/images/avatars/b2rbrxlowmmw.webp',
    quote: '作为一名社交媒体经理，我每天都需要高质量的内容。Seedream AI 让我能够创建看起来非常专业的独特、高保真图像。我喜欢 Seedream AI 处理复杂提示词并将其转化为爆款艺术的能力。它确实让我的品牌在数字领域拥有了竞争优势。',
  },
  {
    name: 'Marcus',
    role: '教育内容创作者',
    avatar: 'https://static.banana2ai.net/images/avatars/8wokupsy7u34.webp',
    quote: 'Seedream AI 是我用过的第一个真正理解逻辑图表的工具。我用它来创建教育内容，准确性是无与伦比的。我们的平台为 Seedream AI 提供了稳定的基础，使我的研究和可视化任务变得轻而易举。如果你需要专业的 AI 艺术，Seedream AI 是唯一选择。',
  },
];

/* ─── FAQs ─── */
const FAQS = [
  {
    q: '什么是 Seedream AI？',
    a: 'Seedream AI 是一个前沿的多模态 AI 模型，旨在根据文本提示生成高质量的图像和设计。我们的平台集成了这项技术，为用户提供 4K 分辨率、精准的排版以及用于专业视觉内容的复杂逻辑渲染。',
  },
  {
    q: 'Seedream AI 可以生成带有文字的图像吗？',
    a: '是的，Seedream AI 以其在图像中渲染清晰、准确文本的能力而闻名。这使得 Seedream AI 非常适合制作海报、信息图表和横幅，在这些场景中，文本位置和拼写至关重要。',
  },
  {
    q: 'Seedream AI 支持什么分辨率？',
    a: '本平台支持原生高分辨率输出，您可以生成并放大图像至 4K 超高清。这确保了您的 Seedream AI 资产适用于专业印刷和数字显示。',
  },
  {
    q: 'Seedream AI 的最佳用途是什么？',
    a: 'Seedream AI 非常全面。它最擅长创建写实摄影、艺术插画、复杂图表、建筑渲染和专业平面设计。该引擎几乎可以适应您描述的任何风格。',
  },
  {
    q: '使用 Seedream AI 时我的数据安全吗？',
    a: '通过生成器处理的所有数据都经过加密，您的个人提示词和图像将保持私密。我们确保您使用 Seedream AI 的创作过程是安全且符合现代标准的。',
  },
];

/* ─── Shared Components ─── */
function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[16%] top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] opacity-[0.06] blur-3xl" />
      <div className="absolute bottom-1/4 right-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffcc33] opacity-[0.06] blur-3xl" />
    </div>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] transition-colors hover:border-[#ffcc33]/30">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors ${open ? 'text-[#ffcc33]' : 'text-white hover:text-[#ffcc33]'}`}
      >
        {q}
        <span className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      <div
        ref={ref}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? (ref.current?.scrollHeight ?? 300) + 'px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-4 text-sm leading-relaxed text-white/60">{a}</div>
      </div>
    </div>
  );
}

/* ─── Testimonial Single-Card Carousel ─── */
function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[idx];

  const go = useCallback((n: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setIdx((n + total) % total); setAnimating(false); }, 400);
  }, [animating, total]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useCallback(() => { timerRef.current = setInterval(() => setIdx(prev => (prev + 1) % total), 6000); }, [total]);
  const stopTimer = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  useEffect(() => { startTimer(); return () => stopTimer(); }, [startTimer, stopTimer]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className="relative overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] p-6 shadow-lg md:p-12"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'none', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ffcc33]/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#ff9900]/5 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-lg text-[#ffcc33]">★</span>)}
          </div>
          <div className="mb-6 h-[220px] overflow-y-auto md:h-auto md:min-h-[120px] md:overflow-visible">
            <p className="text-base leading-relaxed text-white/80 md:text-lg">&ldquo;{t.quote}&rdquo;</p>
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#ffcc33]/30 md:h-12 md:w-12">
              <Image src={t.avatar} alt={t.name} fill className="object-cover" />
            </div>
            <div>
              <div className="font-semibold text-white">{t.name}</div>
              <div className="text-sm text-white/40">{t.role}</div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => { stopTimer(); go(idx - 1); startTimer(); }}
        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 text-white/60 backdrop-blur-sm transition-all hover:border-[#ffcc33]/50 hover:text-[#ffcc33] md:-left-4"
      >←</button>
      <button
        onClick={() => { stopTimer(); go(idx + 1); startTimer(); }}
        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 text-white/60 backdrop-blur-sm transition-all hover:border-[#ffcc33]/50 hover:text-[#ffcc33] md:-right-4"
      >→</button>
      <div className="mt-6 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { stopTimer(); go(i); startTimer(); }}
            className={`rounded-full transition-all duration-300 ${i === idx ? 'h-2 w-6 bg-[#ffcc33]' : 'h-2 w-2 bg-white/20 hover:bg-[#ffcc33]/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────── PAGE ────────────────────────── */
export default function Page() {
  const fadeRef = useScrollFade();
  const [useCaseTab, setUseCaseTab] = useState(0);
  const [ucVisible, setUcVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const switchUcTab = (i: number) => {
    if (i === useCaseTab) return;
    setUcVisible(false);
    setTimeout(() => { setUseCaseTab(i); setUcVisible(true); }, 250);
  };

  const uc = USE_CASE_TABS[useCaseTab];

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">首页</Link>
          <span>/</span>
          <Link href="/zh/image/" className="transition-colors hover:text-white/70">AI图像生成器</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">Seedream AI</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                释放您的创意愿景 — Seedream AI 4K 多模态
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">下一代创意枢纽</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                以行业领先的精度将复杂想法转化为高保真视觉效果。在每一次创作中体验先进的空间逻辑和完美的纹理渲染。作为尖端的多模态生成工具，Seedream AI 在将复杂的文本转化为令人惊叹的 4K 高分辨率图像方面拥有无与伦比的精准度。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {['🎨 行业领先的文生图精度', '📐 原生 4K 超高清输出', '✍️ 高级逻辑与排版渲染', '🔒 安全加密的云端资产管理'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/avatars/8pk4idwouhh0.webp" alt="Seedream AI" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Generator ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in"><span className="gradient-glow-text">Seedream AI</span> 图片</h2>
        <ImageGenerator />
      </section>

      {/* ── Steps (3) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            体验 Seedream AI <span className="text-[#ffcc33]">三步生成专业视觉</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            通过简单三步，将您的创意想法转化为令人惊叹的 4K 高分辨率图像，探索 Seedream AI 专业的全能多模态视觉生成能力。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="badge-gradient mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-black shadow-lg">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 font-semibold text-[#ffcc33]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-6 z-10 hidden items-center justify-center lg:flex">
                    <span className="text-lg font-bold text-[#ffcc33]/60">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Seedream AI (icon-box 2-col grid, no tabs) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            为什么 <span className="text-[#ffcc33]">Seedream AI</span> 是专业创作的最佳选择
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            我们的平台提供了一个专门的环境来最大化 Seedream AI 的输出，确保每位用户都能通过 Seedream AI 生成器获得工作室级的成果。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {WHY_CARDS.map((card, i) => (
              <div key={i} className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 4)}`}>
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={card.icon} alt={card.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (alternating 2-col layout with big images) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            助力视觉创作的<span className="text-[#ffcc33]">先进 Seedream AI 能力</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            探索由 Seedream AI 驱动的行业领先功能。我们的 AI 为您带来最稳定、功能最丰富的环境，助力探索专业生成工具的全方位潜能。
          </p>
          <div className="space-y-20">
            {FEATURES.map((feat, i) => (
              <div key={i} className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 scroll-fade-in stagger-${i + 1}`}>
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image src={feat.image} alt={feat.title} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117]/40 to-transparent" />
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="gradient-glow-text mb-4 text-2xl font-bold md:text-3xl">{feat.title}</h3>
                  <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <p className="leading-relaxed text-white/60">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases (tabs + image, like z-image-turbo Why section) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            通过先进 AI 生成解锁<span className="text-[#ffcc33]">多样化应用场景</span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            从业务增长到个人创意，我们的平台为您提供最通用的工具集，用于生成专业级图像和高端设计资产。
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {USE_CASE_TABS.map((tab, i) => (
              <button key={i} onClick={() => switchUcTab(i)} className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${useCaseTab === i ? 'border-[#ffcc33]/30 bg-[#ffcc33]/10 text-[#ffcc33]' : 'border-transparent bg-[#1c2030] text-white/50'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop tabs */}
          <div className="mb-10 hidden justify-center gap-4 md:flex">
            {USE_CASE_TABS.map((tab, i) => (
              <button key={i} onClick={() => switchUcTab(i)} className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${useCaseTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                {tab.label}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300" style={{ opacity: useCaseTab === i ? 1 : 0, transform: useCaseTab === i ? 'scaleX(1)' : 'scaleX(0)' }} />
              </button>
            ))}
          </div>

          {/* Content: left image + right text */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12" style={{ opacity: ucVisible ? 1 : 0, transform: ucVisible ? 'none' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
              <div className="flex items-center justify-center">
                <Image src={uc.image} alt={uc.title} width={600} height={500} className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 hover:scale-105 md:max-h-[500px]" />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{uc.title}</h3>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <span className="gradient-glow-text text-sm font-semibold md:text-base">{uc.label}解决方案</span>
                </div>
                <p className="mb-8 leading-relaxed text-white/60">{uc.desc}</p>
                <Link href="/zh/image/seedream-ai/" className="highlight-button inline-flex">体验 Seedream AI</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials (single-card carousel) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl gradient-glow-text">
            专业创作者如何评价 Seedream AI
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            加入依靠 Seedream AI 突破数字创作边界、利用先进多模态能力的专家社区。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            Seedream AI 生成器常见问题 — 专家洞察
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            了解您需要关于 Seedream AI 的一切。学习如何利用这项技术实现最大的创意影响和专业效率。
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="group relative overflow-hidden border-t border-[#363b4e] bg-gradient-to-br from-[#1c2030] to-[#13151f] px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/5 to-[#3b82f6]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="gradient-glow-text mb-4 text-3xl font-bold scroll-fade-in md:text-4xl">
            今日起，与 Seedream AI 一起掌握设计艺术
          </h2>
          <p className="mb-8 text-lg text-white/60">
            通过我们的免费 Seedream AI 平台，体验 Seedream AI 无与伦比的力量并变革您的创作工作流。既然可以使用 Seedream AI 创作，就不要屈就于平庸。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始免费使用</Link>
        </div>
      </section>
    </div>
  );
}
