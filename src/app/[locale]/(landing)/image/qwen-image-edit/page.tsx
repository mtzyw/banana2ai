'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Why Section Tabs Data ─── */
const WHY_TABS = [
  {
    label: '双通道能力',
    title: '双通道编辑架构，带来灵活而强大的控制能力',
    highlight: '语义控制 + 外观精度的完美结合',
    image: '/images/banana/vedawlqv8ef3.jpeg',
    body: 'Qwen Image Edit 的双通道架构融合 Qwen2.5-VL 的语义控制与 VAE Encoder 的精度编辑能力。既能完成风格迁移、艺术化渲染等概念级修改，也能实现对象移除、颜色调整等像素级操作，在创意理解与技术准确性之间取得平衡。',
  },
  {
    label: '文本编辑能力',
    title: '卓越的中英文双语文本渲染与编辑能力',
    highlight: '精准支持英文与中文文本',
    image: '/images/banana/eixtuh6n1bpv.jpeg',
    body: 'Qwen Image Edit 在中英文文本编辑方面表现出色，可添加、修改或移除文字，并自动匹配字体、字号与样式。轻松应对复杂书法、混合语言设计和高排版要求的项目，是跨文化内容与国际品牌的理想选择。',
  },
  {
    label: '智能对象',
    title: '具备上下文理解的高级对象编辑能力',
    highlight: '自然添加与无痕移除',
    image: '/images/banana/9q60mvfjf1qo.jpeg',
    body: 'Qwen Image Edit 通过上下文智能，实现自然的对象添加与移除。模型理解光照、透视与场景关系，生成协调统一的视觉效果，非常适合电商、房地产、人像摄影和创意合成。',
  },
  {
    label: '开源优势',
    title: '基于 Apache 2.0 的开源创新与商业自由',
    highlight: '完全的商业使用权限',
    image: '/images/banana/2ns20ij2z7ne.jpeg',
    body: 'Qwen Image Edit 采用 Apache 2.0 协议，允许无限制的商业使用。可在 Hugging Face 上获取并进行微调、定制和部署，无需支付授权费用，适合初创团队、创意机构和企业级应用。',
  },
];

/* ─── Technology ─── */
const TECHNOLOGIES = [
  {
    title: 'Qwen2.5-VL 语义理解引擎',
    image: '/images/banana/tykdsai2nagx.jpeg',
    desc: 'Qwen Image Edit 基于 Qwen2.5-VL 视觉语言模型，实现高层次语义理解与控制。能够解析自然语言指令，完成风格迁移、艺术渲染和氛围调整，在尊重画面构图的前提下进行智能修改。',
  },
  {
    title: 'VAE Encoder 外观精度控制',
    image: '/images/banana/tukqrbgb08om.jpeg',
    desc: 'VAE Encoder 为 Qwen Image Edit 提供像素级外观控制能力，实现精确的颜色调整、纹理修改与细节润色。配合语义理解，确保创意表达与技术精度高度一致。',
  },
  {
    title: '200 亿参数的基础模型架构',
    image: '/images/banana/9rjkyxfadlm4.jpeg',
    desc: 'Qwen Image Edit 构建于阿里巴巴 200 亿参数基础模型之上，具备企业级理解能力，能够处理复杂视觉关系和多样化场景，支持云端与本地部署。',
  },
];

/* ─── Steps ─── */
const STEPS = [
  {
    title: '上传图片并描述你的编辑需求',
    desc: '将图片上传至 Qwen Image Edit，用自然语言描述你想要的修改内容。无论是添加文字、更换背景、风格转换还是对象调整，Qwen Image Edit 都能理解英文和中文的语义与外观层级指令。',
  },
  {
    title: 'Qwen Image Edit 智能解析你的请求',
    desc: 'Qwen Image Edit 的 200 亿参数模型通过双通道架构处理输入。Qwen2.5-VL 负责语义理解与风格层面的修改，VAE Encoder 则实现像素级精细控制，全面分析画面构图、光照与上下文，确保编辑自然无缝。',
  },
  {
    title: '高级 AI 处理完成图像变换',
    desc: 'Qwen Image Edit 结合扩散模型等先进算法，在保持画质的同时完成编辑。文本渲染精准匹配字体与样式，对象移除采用智能填充，新元素通过上下文理解自然融合。',
  },
  {
    title: '下载专业级编辑后的图像',
    desc: '下载无明显瑕疵的高分辨率成品图像，适用于电商、营销推广、社交媒体或创意作品集。Qwen Image Edit 采用 Apache 2.0 协议，支持完全自由的商业使用。',
  },
];

/* ─── Use Cases ─── */
const USE_CASES = [
  {
    title: '电商商品优化与背景替换',
    image: '/images/banana/7s1xvycd3qom.png',
    desc: '使用 Qwen Image Edit 优化商品图片，快速去除背景、替换为棚拍场景，并修改文字标签以保持品牌一致性，无需重新拍摄即可提升商品表现力。',
  },
  {
    title: '营销活动适配与本地化',
    image: '/images/banana/09syt7q0cucl.png',
    desc: '借助 Qwen Image Edit 快速完成营销素材的本地化，将文本在中英文之间切换，同时保持设计风格一致，实现季节性与区域化营销。',
  },
  {
    title: '社交媒体内容优化与个性化',
    image: '/images/banana/5uutmp5oh4qb.png',
    desc: 'Qwen Image Edit 针对不同平台快速调整图片背景、文字与光效，从一张原图生成适配 Instagram、TikTok、YouTube 的多种版本，提升内容表现力。',
  },
  {
    title: '房地产与建筑可视化增强',
    image: '/images/banana/txo0xsz0o0vj.png',
    desc: 'Qwen Image Edit 通过智能去除杂物、改善光照与虚拟布置，提升房产图片质量，无需昂贵实景布置即可呈现理想效果。',
  },
  {
    title: '出版与编辑设计优化',
    image: '/images/banana/6i2y44p0n2cx.png',
    desc: 'Qwen Image Edit 用于封面设计迭代、文字调整与系列视觉统一，支持中英双语内容，适合出版社、编辑团队与独立作者。',
  },
  {
    title: '创意作品集与艺术探索',
    image: '/images/banana/l26x71ggyfqt.png',
    desc: '快速尝试不同风格与构图方案，提升作品集质量。开源特性鼓励艺术家与创作者进行更多实验与创新。',
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: 'Jennifer Wang',
    role: '全球零售品牌 电商运营总监',
    avatar: '/images/banana/3wl0yjqm80wt.webp',
    quote: 'Qwen Image Edit 彻底改变了我们的电商流程！管理 5000 多张商品图片变得非常轻松，中英文标签切换精准无误。背景移除节省了大量拍摄成本，转化率提升了 28%。',
  },
  {
    name: 'Marcus Thompson',
    role: '国际营销机构 创意总监',
    avatar: '/images/banana/eke14nbac7uz.webp',
    quote: '快速迭代和本地化不可或缺的工具。双通道架构同时应对创意与技术需求，两天内完成整套亚洲市场活动物料，制作周期缩短 60%。',
  },
  {
    name: 'Yuki Tanaka',
    role: '自由平面设计师 / 书籍封面设计师',
    avatar: '/images/banana/3pyj6cjs2k8z.webp',
    quote: 'Qwen Image Edit 彻底革新了我的书籍封面设计流程。中英文排版效果非常出色，语义模式激发创意，精度控制确保专业度，效率提升了 40%。',
  },
  {
    name: 'David Martinez',
    role: '房地产经纪人 / 机构负责人',
    avatar: '/images/banana/sihu3aashtj0.webp',
    quote: 'Qwen Image Edit 对房地产来说是颠覆性的工具。无需昂贵布置就能提升照片品质，房源更具吸引力，成交速度提升了 35%。',
  },
  {
    name: 'Sarah Chen',
    role: '社交媒体博主 / 多平台内容创作者',
    avatar: '/images/banana/x4wcrhme4pmi.webp',
    quote: 'Qwen Image Edit 让多平台内容创作变得高效一致。快速适配不同平台风格，在保证专业度的同时测试创意，粉丝增长了 150%。',
  },
];

/* ─── FAQs ─── */
const FAQS = [
  {
    q: '什么是 Qwen Image Edit？它是如何工作的？',
    a: 'Qwen Image Edit 是阿里巴巴 Qwen 团队推出的 200 亿参数开源 AI 图像编辑模型，采用双通道架构。只需上传图片并用自然语言描述修改需求，即可完成文本编辑、风格转换与对象操作。',
  },
  {
    q: 'Qwen Image Edit 的双语文本编辑有什么优势？',
    a: 'Qwen Image Edit 在中英文文本编辑方面表现卓越，可精准匹配字体、字号与样式，支持复杂书法与混合语言设计，非常适合跨文化营销与设计项目。',
  },
  {
    q: 'Qwen Image Edit 的双通道架构是如何工作的？',
    a: '语义模式（Qwen2.5-VL）负责风格与创意层面的理解，外观模式（VAE Encoder）负责像素级精细控制，两者结合实现创意与精度兼顾。',
  },
  {
    q: 'Qwen Image Edit 的编辑质量如何？',
    a: 'Qwen Image Edit 适用于电商、营销、出版与房地产等专业场景，保持原始分辨率的同时实现自然、真实的修改效果。',
  },
  {
    q: '我可以将 Qwen Image Edit 用于商业项目吗？',
    a: '可以。Qwen Image Edit 的 Apache 2.0 协议允许完全自由的商业使用，无需额外授权费用，适合商业项目与客户服务。',
  },
  {
    q: '如何为 Qwen Image Edit 编写高质量的编辑提示词？',
    a: '建议为 Qwen Image Edit 使用清晰、具体的描述，例如指定颜色、位置与风格，就像在向一位设计师下达需求一样。',
  },
  {
    q: 'Qwen Image Edit 背后采用了哪些先进技术？',
    a: 'Qwen Image Edit 基于 200 亿参数模型，融合 Qwen2.5-VL、VAE Encoder、扩散模型与智能填充等先进技术。',
  },
  {
    q: 'Qwen Image Edit 最适合哪些使用场景？',
    a: '非常适合电商、营销本地化、社交媒体、房地产、出版与创意设计等领域，尤其适用于跨语言与国际化项目。',
  },
  {
    q: '我该如何获取并部署 Qwen Image Edit？',
    a: 'Qwen Image Edit 可通过 Hugging Face、GitHub 及官方 Qwen 仓库获取，支持本地部署或云端 API 使用，并可进行定制与集成。',
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
        <span
          className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
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

  const go = useCallback(
    (n: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setIdx((n + total) % total);
        setAnimating(false);
      }, 400);
    },
    [animating, total],
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => setIdx((prev) => (prev + 1) % total), 6000);
  }, [total]);
  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] p-6 shadow-lg md:p-12"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'none',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ffcc33]/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#ff9900]/5 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-lg text-[#ffcc33]">★</span>
            ))}
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
          <span className="text-[#ffcc33]">Qwen Image Edit</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                Qwen Image Edit - 高级开源 AI 编辑，免费在线使用
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">
                AI 驱动的图像编辑大师 —— 解锁精准文字渲染、语义级变换与外观控制
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Qwen Image Edit 是由阿里巴巴 Qwen 团队推出的 200 亿参数开源基础模型。通过 Qwen2.5-VL 的语义控制与 VAE Encoder 的外观精度控制双通道架构，实现卓越的图像编辑效果。采用 Apache 2.0 协议，支持风格迁移、对象编辑、中英双语文本处理与像素级修改，全面赋能专业创作者。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {[
                  '🔤 精准中英文双语文本渲染与编辑',
                  '🔀 双通道架构：语义 + 外观精度双重控制',
                  '🎨 风格迁移、对象编辑与像素级修改',
                  '🔓 Apache 2.0 开源协议，完全商业自由',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="/images/banana/f4ru78usquup.jpeg" alt="Qwen Image Edit" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Generator ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in">
          <span className="gradient-glow-text">Qwen Image Edit</span> 图片
        </h2>
        <ImageGenerator />
      </section>

      {/* ── Steps (4) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            四步完成<span className="text-[#ffcc33]">专业级 AI 图像编辑</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            借助 Qwen Image Edit，实现高精度图像编辑。开源 AI 编辑器融合语义智能与外观控制，带来专业级编辑体验。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}
              >
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

      {/* ── Why Qwen Image Edit Leads (Tabs + Left Image / Right Text) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            为什么 <span className="text-[#ffcc33]">Qwen Image Edit</span> 引领 AI 图像编辑
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            革命性的功能与先进架构，使 Qwen Image Edit 成为专业图像变换、文本编辑与对象处理领域的领先 AI 编辑器。
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {WHY_TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => switchWhyTab(i)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  whyTab === i
                    ? 'border-[#ffcc33]/30 bg-[#ffcc33]/10 text-[#ffcc33]'
                    : 'border-transparent bg-[#1c2030] text-white/50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Desktop tabs */}
          <div className="mb-10 hidden justify-center gap-4 md:flex">
            {WHY_TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => switchWhyTab(i)}
                className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
                  whyTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t.label}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
                  style={{ opacity: whyTab === i ? 1 : 0, transform: whyTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            ))}
          </div>

          {/* Content: left image + right text */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
              style={{
                opacity: whyVisible ? 1 : 0,
                transform: whyVisible ? 'none' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={tab.image}
                  alt={tab.title}
                  width={600}
                  height={500}
                  className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 hover:scale-105 md:max-h-[500px]"
                />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{tab.title}</h3>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <span className="gradient-glow-text text-sm font-semibold md:text-base">{tab.highlight}</span>
                </div>
                <p className="mb-8 leading-relaxed text-white/60">{tab.body}</p>
                <Link href="/zh/image/qwen-image-edit/" className="highlight-button inline-flex">
                  体验 Qwen Image Edit
                </Link>
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
            驱动 Qwen Image Edit 的<span className="text-[#ffcc33]">核心技术</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            前沿的 AI 架构与双通道处理机制，使 Qwen Image Edit 成为面向全球专业用户的智能图像编辑基础模型。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TECHNOLOGIES.map((tech, i) => (
              <div
                key={i}
                className={`group overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-xl hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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

      {/* ── Use Cases (icon box w-12 h-12 + title + desc, 2-col grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Qwen Image Edit：<span className="text-[#ffcc33]">正在重塑专业工作流程</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            从电商到创意探索，Qwen Image Edit 以精准而智能的编辑能力，帮助各行业实现高质量、高效率的视觉创作。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                {/* Icon box */}
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={uc.image} alt={uc.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">
                  {uc.title}
                </h3>
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
            Qwen Image Edit 的成功案例
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            成千上万的创作者和企业正在使用 Qwen Image Edit 优化工作流程，加速制作效率，降低成本，并获得专业级编辑效果。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            关于 Qwen Image Edit 的常见问题解答
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            全面解答 Qwen Image Edit 的功能特点、双通道架构、双语文本能力、技术原理、编辑质量与商业使用权限。
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="group relative overflow-hidden border-t border-[#363b4e] bg-gradient-to-br from-[#1c2030] to-[#13151f] px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/5 to-[#3b82f6]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="gradient-glow-text mb-4 text-3xl font-bold scroll-fade-in md:text-4xl">
            使用 Qwen Image Edit，开启专业级 AI 图像编辑体验
          </h2>
          <p className="mb-8 text-lg text-white/60">
            加入全球专业用户行列，使用 Qwen Image Edit 重塑工作流程。双通道 AI 融合语义智能与外观精度，只需上传图片并描述修改需求即可完成编辑。支持中英文文本、风格转换与对象操作，Apache 2.0 协议保障商业自由，全面提升效率并释放无限创意潜能。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始免费使用</Link>
        </div>
      </section>
    </div>
  );
}
