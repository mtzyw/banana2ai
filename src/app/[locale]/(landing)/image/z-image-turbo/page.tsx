'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { Z_IMAGE_TURBO_EXAMPLES } from '@/data/page-examples';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Why Section Tabs Data ─── */
const WHY_TABS = [
  {
    label: '闪电级速度',
    title: '基于 60 亿参数模型的亚秒级生成速度',
    highlight: '革命性的 8 步图像生成技术',
    image: 'https://static.banana2ai.net/images/features/bwt679t7lek1.webp',
    body: 'Z Image Turbo 以亚秒级的创作时间重新定义了 AI 图像生成器的性能。我们的 60 亿参数模型仅需 8 步推理，是目前最快的文生图方案之一。PrunaAI 优化结合了缓存、编译和量化技术，在不降低质量的情况下实现了极致速度。无论是快速原型设计、创意探索还是高产量制作工作流，都能瞬间生成写实级图像。',
  },
  {
    label: '文字表现力',
    title: '卓越的双语文字渲染技术',
    highlight: '完美的中英文文本呈现',
    image: 'https://static.banana2ai.net/images/features/t8xs09rhgv8l.webp',
    body: 'Z Image Turbo 在 AI 图像生成器中脱颖而出，具有非凡的文字渲染能力。生成的图像可包含清晰的中英文字符——非常适合标牌、海报、书封、产品标签和品牌材料。在其他模型还在为文字清晰度挣扎时，Z Image Turbo 已能提供准确、优美且与写实场景自然融合的排版设计。',
  },
  {
    label: '写实主义',
    title: '具有自然光影的写实级画质',
    highlight: '影棚级的视觉真实感',
    image: 'https://static.banana2ai.net/images/features/kp8s3k2546hs.webp',
    body: 'Z Image Turbo 擅长创建具有真实纹理和自然光影的写实图像。这款 AI 图像生成器能以惊人的真实感处理人像、环境和物体——真实的肤色、精准的材质属性和电影级的光效。无论是生成产品摄影、建筑可视化还是角色肖像，Z Image Turbo 都能提供适用于商业用途、广告宣传和创意作品集的专业品质。',
  },
  {
    label: '开放且实惠',
    title: '高性价比，基于 Apache 2.0 开源协议',
    highlight: '免费的商业使用权',
    image: 'https://static.banana2ai.net/images/features/rghnloqczfqg.webp',
    body: 'Z Image Turbo 在 Apache 2.0 协议下运行，提供完全的商业使用自由。这款 AI 图像生成器以传统成本的一小部分提供企业级性能——更快的生成速度意味着更低的计算支出。非常适合每月需生成数千张图像的初创公司、代理机构和大型企业。',
  },
];

/* ─── Technology ─── */
const TECHNOLOGIES = [
  {
    title: 'Decoupled-DMD 技术实现效率最大化',
    image: 'https://static.banana2ai.net/images/features/qw2gx2wclo80.webp',
    desc: 'Z Image Turbo 采用了先进的解耦分布匹配蒸馏（Decoupled-DMD）技术，这是一种精密的压缩技术，能将大型模型蒸馏成更快的版本而不损失画质。结合 DMD 与 PrunaAI 的优化层，实现了前所未有的速度。',
  },
  {
    title: '单流扩散 Transformer 架构',
    image: 'https://static.banana2ai.net/images/features/wnml1jjnz4nm.webp',
    desc: 'Z Image Turbo 采用了尖端的单流扩散 Transformer 架构，同步处理文本提示词和视觉信息。这种统一的处理方式确保了生成的图像逻辑连贯，每一个元素都与你的描述完美对齐。',
  },
  {
    title: '针对 1024×1024 高分辨率输出优化',
    image: 'https://static.banana2ai.net/images/features/y7nbiswp7bfa.webp',
    desc: 'Z Image Turbo 生成 1024×1024 的最佳分辨率图像，提供适用于专业用途的细腻细节。高分辨率结合极速生成的特性，使其成为快速原型设计和最终生产资产生成的理想选择。',
  },
];

/* ─── Steps ─── */
const STEPS = [
  { title: '编写你的创意提示词', desc: '详细描述你的构思。Z Image Turbo 在处理包含风格、光效和构图等细节的提示词时表现最佳。如果需要，可以添加文字要求——我们的模型擅长清晰地渲染中英文。' },
  { title: 'Z Image Turbo 处理请求', desc: '60 亿参数模型通过先进的单流扩散 Transformer 架构分析你的提示词。PrunaAI 优化通过智能缓存和编译确保闪电般的计算速度。' },
  { title: '仅需 8 步即可生成图像', desc: '采用 Decoupled-DMD 技术，在不牺牲画质的前提下实现快速生成。数秒内，具有自然光影、精准纹理和完美文字渲染的 1024×1024 高分辨率写实图像便会跃然屏上。' },
  { title: '下载你的写实级图像', desc: '高质量图像经过专业优化且无水印，适合商业项目、营销素材、社交媒体内容或个人创意作品集。Apache 2.0 许可证确保你拥有完整商业使用权。' },
];

/* ─── Use Cases ─── */
const USE_CASES = [
  { title: '营销素材与品牌内容创作', image: 'https://static.banana2ai.net/images/features/7s1xvycd3qom.webp', desc: '营销团队利用 Z Image Turbo 快速创建活动资产。通过精准的文字渲染生成产品样机、主视角图像、社交媒体图形和广告视觉素材。极速生成支持快速 A/B 测试和迭代，大幅降低制作成本和周期。' },
  { title: '创作者与红人的社交媒体内容', image: 'https://static.banana2ai.net/images/features/09syt7q0cucl.webp', desc: '内容创作者使用 Z Image Turbo 每日产出极具吸引力的视觉内容。瞬间生成吸睛的 Instagram 帖子、YouTube 缩略图、TikTok 背景和个人主页图形。写实级品质确保专业观感。' },
  { title: '产品设计与快速原型制作', image: 'https://static.banana2ai.net/images/features/5uutmp5oh4qb.webp', desc: '产品设计师利用 Z Image Turbo 进行快速视觉化和方案探索。可在数秒内创建写实的产品渲染图、包装设计和界面样机。快速迭代多种设计变体，无需昂贵的 3D 建模即可展示写实概念。' },
  { title: '电子商务与网店视觉', image: 'https://static.banana2ai.net/images/features/txo0xsz0o0vj.webp', desc: '电商企业采用 Z Image Turbo 作为产品摄影和生活方式图片的替代方案。生成包含准确文字的情境产品图、横幅图像和类目焦点图。这是拥有海量库存店铺的高性价比解决方案。' },
  { title: '社论与出版项目', image: 'https://static.banana2ai.net/images/features/6i2y44p0n2cx.webp', desc: '出版和编辑团队使用 Z Image Turbo 制作文章插图、书籍封面和杂志排版。擅长创建与文字内容匹配的情境图像，卓越的文字渲染能力支持制作集成精美排版的杂志封面和海报设计。' },
  { title: '创意作品集与艺术探索', image: 'https://static.banana2ai.net/images/features/l26x71ggyfqt.webp', desc: '艺术家和设计师利用 Z Image Turbo 进行创意实验和作品集开发。探索多样化的艺术风格，测试构图创意并快速生成概念草图。写实级能力助你打造专业级的作品集展示。' },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { name: 'Marcus Chen', role: '数字营销机构创意总监', avatar: 'https://static.banana2ai.net/images/avatars/cv3ypbf94ef5.webp', quote: 'Z Image Turbo 彻底改变了我们的内容生产流！作为一家营销机构，我们每月需要生成数百个活动资产。亚秒级的生成速度太惊人了——过去需要几小时的工作现在几分钟就能完成。写实画质足以媲美专业摄影，我们的客户完全看不出差别。' },
  { name: 'Sofia Rodriguez', role: '电商视觉内容经理', avatar: 'https://static.banana2ai.net/images/avatars/zrkrexmu2koo.webp', quote: 'Z Image Turbo 的文字渲染能力无与伦比！我为我们的国际电商平台创建双语营销材料。终于有一款 AI 图像生成器能完美渲染中英文字符了。产品标签、标识和促销图形看起来非常专业。' },
  { name: 'James Patterson', role: '自由数字艺术家与插画师', avatar: 'https://static.banana2ai.net/images/avatars/q0sy9gl2cw07.webp', quote: 'Z Image Turbo 完全重塑了我的创作过程。作为一名自由插画师，我使用它进行快速方案探索和客户演示。8 步生成让我能即时迭代。写实级输出意味着我在初次会议就能展示精美的方案。项目周期缩短了 60%。' },
  { name: 'Priya Sharma', role: '科技初创公司创始人', avatar: 'https://static.banana2ai.net/images/avatars/edssw31z3vjs.webp', quote: 'Z Image Turbo 对我们初创公司的精益运营至关重要。我们需要专业的产品图但付不起昂贵的拍摄费用。这款工具能即时创建写实的产品图、社媒内容和官网横幅。Apache 2.0 协议让我们无需担心法律风险。' },
  { name: 'Alexandra Kim', role: '社交媒体博主与内容创作者', avatar: 'https://static.banana2ai.net/images/avatars/zpbjfchv5agj.webp', quote: 'Z Image Turbo 的速度支撑起了我的日常内容更新节奏。我每天在各平台发三次帖，这款 AI 工具让这变得可持续。写实画质让我的 20 万粉丝保持活跃。快速迭代让我能测试不同风格并优化互动。博主必备神器。' },
];

/* ─── FAQs ─── */
const FAQS = [
  { q: 'Z Image Turbo 的文字渲染功能有什么特别之处？', a: '大多数文生图模型很难生成可读文字，而 Z Image Turbo 则能提供自然融合进写实场景的清晰排版。它可以在图像中渲染清晰的中英文字符，非常适合标牌、海报、书封、产品标签和品牌材料，这对于设计师和营销人员来说至关重要。' },
  { q: '与其他 AI 图像生成器相比，Z Image Turbo 的生成速度有多快？', a: 'Z Image Turbo 可在亚秒级时间内生成图像，通常在 1-3 秒内完成。该模型仅需 8 步推理，而传统扩散模型需要 50-100 步。结合 PrunaAI 的缓存、编译和量化优化，进一步提升了生成速度。' },
  { q: '我可以从 Z Image Turbo 获得怎样的画质？', a: 'Z Image Turbo 擅长生成具有自然光影、精准纹理和真实场景的写实图像。它可以处理肤色真实的人像、透视准确的环境以及材质属性真实的物体，输出 1024×1024 高分辨率图像。' },
  { q: '我能将 Z Image Turbo 生成的图像用于商业项目吗？', a: '是的！Z Image Turbo 基于 Apache 2.0 开源协议运行，提供完整的商业使用权。你可以将生成的图像用于企业营销、广告宣传、产品设计、客户项目、周边商品、社交媒体内容以及任何商业场景，无需支付授权费。' },
  { q: '是什么技术支撑了 Z Image Turbo 极致的速度与品质？', a: 'Z Image Turbo 采用了解耦分布匹配蒸馏（DMD）技术，这是一种将大型模型压缩为更快速版本且不牺牲质量的先进技术。结合单流扩散 Transformer 架构和 PrunaAI 优化，在保留强大母模型知识的同时，实现了高效的写实级输出。' },
  { q: 'Z Image Turbo 最适合哪些使用场景？', a: 'Z Image Turbo 非常适合营销活动、社交媒体创作、产品设计视觉化、电商图片、出版插图、书籍封面、网页图形、广告素材、品牌内容、创意作品集和快速原型设计。其双语文字渲染能力在国际营销和多语种品牌项目中极具价值。' },
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
      <button onClick={onToggle} className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors ${open ? 'text-[#ffcc33]' : 'text-white hover:text-[#ffcc33]'}`}>
        {q}
        <span className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      <div ref={ref} className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: open ? (ref.current?.scrollHeight ?? 300) + 'px' : '0px', opacity: open ? 1 : 0 }}>
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

  // Auto-rotate
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useCallback(() => { timerRef.current = setInterval(() => setIdx(prev => (prev + 1) % total), 6000); }, [total]);
  const stopTimer = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  useEffect(() => { startTimer(); return () => stopTimer(); }, [startTimer, stopTimer]);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] p-6 shadow-lg md:p-12"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'none', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ffcc33]/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#ff9900]/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Stars */}
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-lg text-[#ffcc33]">★</span>
            ))}
          </div>
          {/* Quote */}
          <div className="mb-6 h-[220px] overflow-y-auto md:h-auto md:min-h-[120px] md:overflow-visible">
            <p className="text-base leading-relaxed text-white/80 md:text-lg">&ldquo;{t.quote}&rdquo;</p>
          </div>
          {/* Author */}
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

      {/* Navigation arrows */}
      <button
        onClick={() => { stopTimer(); go(idx - 1); startTimer(); }}
        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 text-white/60 backdrop-blur-sm transition-all hover:border-[#ffcc33]/50 hover:text-[#ffcc33] md:-left-4"
      >
        ←
      </button>
      <button
        onClick={() => { stopTimer(); go(idx + 1); startTimer(); }}
        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 text-white/60 backdrop-blur-sm transition-all hover:border-[#ffcc33]/50 hover:text-[#ffcc33] md:-right-4"
      >
        →
      </button>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { stopTimer(); go(i); startTimer(); }}
            className={`rounded-full transition-all duration-300 ${
              i === idx ? 'h-2 w-6 bg-[#ffcc33]' : 'h-2 w-2 bg-white/20 hover:bg-[#ffcc33]/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────── PAGE ────────────────────────── */
export default function Page() {
  const fadeRef = useScrollFade();
  const [whyTab, setWhyTab] = useState(0);
  const [whyVisible, setWhyVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const switchWhyTab = (i: number) => {
    if (i === whyTab) return;
    setWhyVisible(false);
    setTimeout(() => { setWhyTab(i); setWhyVisible(true); }, 250);
  };

  const tab = WHY_TABS[whyTab];

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">首页</Link>
          <span>/</span>
          <Link href="/zh/image/" className="transition-colors hover:text-white/70">AI图像生成器</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">Z Image Turbo</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                Z Image Turbo — 更快、更高质量的生图体验，不必复杂
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">极速 AI 图像生成器，打造逼真视觉体验</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Z Image Turbo 是一款拥有 60 亿参数的尖端 AI 图像生成器，仅需 8 步推理即可在数秒内生成写实级图像。通过 PrunaAI 优化，在保持顶尖画质的同时实现了无与伦比的生成速度，是创作者、设计师及企业的首选工具。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {['⚡ 亚秒级生成速度，8 步推理', '🔤 中英文双语文字渲染', '📸 写实级画质，自然光影', '🔓 Apache 2.0 开源，免费商用'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/avatars/b88usp2lk4ef.webp" alt="Z Image Turbo" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Generator ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in"><span className="gradient-glow-text">Z Image Turbo</span> 图片</h2>
        <ImageGenerator examples={Z_IMAGE_TURBO_EXAMPLES} />
      </section>

      {/* ── Steps (4) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            生成写实级 AI 图像的<span className="text-[#ffcc33]">四个简单步骤</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            使用 Z Image Turbo 在数秒内创建专业品质的图像。这款革命性的 AI 图像生成器能将你的想法转化为惊艳的写实视觉效果。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={i} className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}>
                {/* Glow on hover */}
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

      {/* ── Why Z Image Turbo Leads (Tabs + Left Image / Right Text) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            为什么 <span className="text-[#ffcc33]">Z Image Turbo</span> 领跑 AI 图像生成技术
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            探索让 Z Image Turbo 成为写实创作、文字渲染和极速生成领域最先进 AI 图像生成器的突破性功能和优化架构。
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {WHY_TABS.map((t, i) => (
              <button key={i} onClick={() => switchWhyTab(i)} className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${whyTab === i ? 'border-[#ffcc33]/30 bg-[#ffcc33]/10 text-[#ffcc33]' : 'border-transparent bg-[#1c2030] text-white/50'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Desktop tabs */}
          <div className="mb-10 hidden justify-center gap-4 md:flex">
            {WHY_TABS.map((t, i) => (
              <button key={i} onClick={() => switchWhyTab(i)} className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${whyTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
                {t.label}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300" style={{ opacity: whyTab === i ? 1 : 0, transform: whyTab === i ? 'scaleX(1)' : 'scaleX(0)' }} />
              </button>
            ))}
          </div>

          {/* Content: left image + right text */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12" style={{ opacity: whyVisible ? 1 : 0, transform: whyVisible ? 'none' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
              <div className="flex items-center justify-center">
                <Image src={tab.image} alt={tab.title} width={600} height={500} className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 hover:scale-105 md:max-h-[500px]" />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{tab.title}</h3>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <span className="gradient-glow-text text-sm font-semibold md:text-base">{tab.highlight}</span>
                </div>
                <p className="mb-8 leading-relaxed text-white/60">{tab.body}</p>
                <Link href="/zh/image/z-image-turbo/" className="highlight-button inline-flex">体验 Z Image Turbo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technology (3 cards with images) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            驱动 Z Image Turbo 的<span className="text-[#ffcc33]">先进技术</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            深入了解复杂的 AI 架构和优化技术，这些正是让 Z Image Turbo 成为功能最强大且最高效的 AI 图像生成器的核心。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TECHNOLOGIES.map((tech, i) => (
              <div key={i} className={`group overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-xl hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={tech.image} alt={tech.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151f] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="gradient-glow-text mb-3 text-lg font-bold">{tech.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases (icon + title + desc, 2-col grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Z Image Turbo：<span className="text-[#ffcc33]">以极速写实创作赋能行业转型</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            从营销活动到创意作品集，Z Image Turbo 以闪电般的极速写实 AI 图像生成能力，为各行各业的专业人士提供卓越品质和可商用成果。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {USE_CASES.map((uc, i) => (
              <div key={i} className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
                {/* Icon box */}
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={uc.image} alt={uc.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{uc.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (single-card carousel) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl gradient-glow-text">
            Z Image Turbo 专业用户成功案例
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            加入全球成千上万名创作者、企业和机构的行列，探索闪电般的写实生成如何加速工作流并降低各行业成本。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            关于 Z Image Turbo AI 图像生成器的常见问题
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            关于 Z Image Turbo 的能力、先进技术、写实画质、文字渲染功能和使用技巧的详细解答。
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
            立即使用 Z Image Turbo，数秒内开启写实创作
          </h2>
          <p className="mb-8 text-lg text-white/60">
            加入全球成千上万专业人士、创作者和企业的行列。无需复杂设置——只需描述你的构思，见证先进的 60 亿参数技术通过仅 8 步推理创建惊艳图像。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始免费使用</Link>
        </div>
      </section>
    </div>
  );
}
