'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Steps ─── */
const STEPS = [
  {
    icon: 'https://static.banana2ai.net/images/icons/step-download.webp',
    title: '选择生成模式',
    desc: '选择图片转视频或文字转视频，以开始你的创作项目。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-customize.webp',
    title: '描述你的创意构思',
    desc: '清晰地输入你的创作构思。通过精准的提示词来实现电影级别的细节效果。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
    title: '点击生成',
    desc: '让 Seedance 1.5 Pro 多镜头叙事 AI 处理你的提示词，实现完美的音视频对齐。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
    title: '下载视频',
    desc: '即刻从 Seedance 1.5 Pro 视频生成器导出你的杰作，与全世界分享。',
  },
];

/* ─── Features ─── */
const FEATURES = [
  {
    title: '精准音视频对齐',
    desc: 'Seedance 1.5 Pro 最具突破性的进步之一，是其完美的音频集成能力。作为一流的口型同步视频生成器，AI 能实时将音素精准映射到复杂的面部肌肉运动上，无论是单人独白还是多人群戏，都能呈现极为自然的对话效果。',
  },
  {
    title: '多语言多人对话',
    desc: '借助 Seedance 1.5 Pro 的先进语言能力，打破全球语言壁垒。平台原生支持在单个生成场景中无缝呈现多语言、多人对话，让全球化内容创作触手可及。',
  },
  {
    title: '电影叙事品质',
    desc: '将你的视觉叙事提升至好莱坞水准。Seedance 1.5 Pro 搭载了基于海量影视数据训练的高级渲染引擎，确保每一帧都散发出专业艺术气质，帮你打造媲美商业大片的视频内容。',
  },
  {
    title: '高精度提示词控制',
    desc: '毫无妥协地实现你的创作愿景。Seedance 1.5 Pro 提供卓越的提示词遵循能力，AI 能以外科手术般的精准度解析并执行复杂的多层次指令，让创作结果与预期高度一致。',
  },
];

/* ─── Why Choose ─── */
const WHY_CARDS = [
  {
    icon: 'https://static.banana2ai.net/images/icons/step-download.webp',
    title: '社交媒体博主和内容创作者',
    desc: '告别昂贵设备和摄影棚租赁的烦恼。使用 Seedance 1.5 Pro，个人创作者每天都能产出极具吸引力的趋势内容，直觉化操作大幅降低了学习门槛。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-customize.webp',
    title: '营销和广告机构',
    desc: '最大化投资回报，大幅削减制作成本。机构可利用多镜头叙事 AI 快速制作广告活动的 A/B 测试版本，让图片转视频功能赋予静态素材全新生命力。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
    title: '电影人和故事创作者',
    desc: '以前所未有的速度将分镜脚本变为现实。独立电影人可使用电影级镜头提示词预览复杂场景，或生成高质量的补充镜头。',
  },
  {
    icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
    title: '在线教育和企业培训',
    desc: '通过丰富的多媒体内容提升学习体验。课程创作者可利用口型同步功能创建能以多种语言授课的虚拟讲师，让教学内容跨越语言边界触达全球学员。',
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    name: '林志远',
    role: '独立电影导演',
    avatar: 'https://static.banana2ai.net/images/avatars/dhp85zlyoefb.webp',
    quote: 'Seedance 1.5 Pro 的精准提示词控制无与伦比。我可以用电影级镜头提示词获得追踪镜头，看起来像是用五万美元的摄影机拍摄的。它彻底改变了我处理独立电影制作的方式。',
  },
  {
    name: '张雅婷',
    role: '数字营销总监',
    avatar: 'https://static.banana2ai.net/images/avatars/o2x1l23at94y.webp',
    quote: '作为营销人员，交付速度就是一切。Seedance 1.5 Pro 让我们的团队能在数小时内将简单的广告文案转化为完整的视频宣传活动，文字转视频功能完全改变了游戏规则。',
  },
  {
    name: '王建国',
    role: '在线教育内容创作者',
    avatar: 'https://static.banana2ai.net/images/avatars/obc2sna6dfu2.webp',
    quote: '口型同步功能令人叹为观止。我现在为所有教育课程使用 Seedance 1.5 Pro 的口型同步功能。虚拟讲师看起来非常自然，多人对话处理也无缝流畅。',
  },
  {
    name: '陈美玲',
    role: '历史纪录片制作人',
    avatar: 'https://static.banana2ai.net/images/avatars/x7tn1t9bnx5u.webp',
    quote: '我们需要一个可靠的工具来为老旧的档案照片制作动画。图片转视频功能为平面照片增添了令人难以置信的深度，加入的环境音效让历史纪录片焕发了生机。',
  },
];

/* ─── FAQs ─── */
const FAQS = [
  {
    q: '什么是 Seedance 1.5 Pro？',
    a: 'Seedance 1.5 Pro 是字节跳动推出的先进 AI 视频生成模型，专为电影级内容创作而设计，是业界领先的视频生成解决方案。',
  },
  {
    q: 'Seedance 1.5 Pro 文字转视频（带音频）是如何工作的？',
    a: '只需输入你的提示词，Seedance 1.5 Pro 引擎便会自动生成高保真视觉内容，并配以完美对齐的音轨，一次生成搞定所有。',
  },
  {
    q: '我可以在视频中让角色说话吗？',
    a: '可以！Seedance 1.5 Pro 的口型同步功能能为对话生成逼真且高度同步的口型动作，让角色自然地开口说话。',
  },
  {
    q: '如何控制镜头运动？',
    a: '使用 Seedance 1.5 Pro 的电影级镜头提示词，可以精准控制场景中的角度、平移和缩放，实现专业级的镜头语言。',
  },
  {
    q: '它支持图片输入吗？',
    a: '支持！Seedance 1.5 Pro 的图片转视频功能可以轻松将你的静态照片变为有声有色的动态视频。',
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
    timerRef.current = setInterval(() => setIdx(prev => (prev + 1) % total), 6000);
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
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">首页</Link>
          <span>/</span>
          <Link href="/zh/video/" className="transition-colors hover:text-white/70">AI视频生成器</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">Seedance 1.5 Pro</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                使用 Seedance 1.5 Pro 创作电影级 AI 视频
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">体验原生音视频生成的强大力量</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Seedance 1.5 Pro 是终极 AI 视频生成平台，一次通过即可生成配有同步音频和视觉效果的电影级视频。使用多语言口型同步对话、精准的提示词控制和电影级镜头运动，更快地创作出引人入胜的故事场景。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {[
                  '🎬 同步音视频输出',
                  '🗣️ 多语言多人对话',
                  '🎥 电影级镜头运动',
                  '🎯 高精度提示词控制',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/showcase/seedance-thumb.webp" alt="Seedance 1.5 Pro" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Generator ── */}
      <VideoGeneratorPanel
        sampleVideoSrc="https://static.banana2ai.net/videos/sample-subpage.mp4"
        sampleVideoPoster="https://static.banana2ai.net/images/showcase/seedance-thumb.webp"
      />

      {/* ── Steps ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            如何使用 <span className="text-[#ffcc33]">Seedance 1.5 Pro</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            几秒钟内，使用 Seedance 1.5 Pro 创作出色彩斑斓的视觉效果。这款革命性的 AI 视频生成器能将你的创意转化为令人惊叹的电影级视频。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                    <Image src={step.icon} alt={step.title} width={48} height={48} className="h-12 w-12" />
                  </div>
                  <div className="badge-gradient mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-black shadow-lg">
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

      {/* ── Core Features ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Seedance 1.5 Pro <span className="text-[#ffcc33]">核心功能</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            探索顶级行业专业人士和热情创作者纷纷转向字节跳动 Seedance 1.5 Pro 的原因。我们精心设计的尖端功能，专为解决传统制作瓶颈而生。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 4)}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffcc33]/20 to-[#ff9900]/10">
                  <span className="text-2xl">
                    {i === 0 ? '🎙️' : i === 1 ? '🌐' : i === 2 ? '🎞️' : '🎯'}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            为什么选择 <span className="text-[#ffcc33]">Seedance 1.5 Pro？</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            在当今快节奏的数字世界中，传统视频制作往往过于缓慢、昂贵且缺乏灵活性。Seedance 1.5 Pro 通过提供敏捷、高保真的替代方案，从根本上解决了这些痛点。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {WHY_CARDS.map((card, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 4)}`}
              >
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

      {/* ── Testimonials ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl gradient-glow-text">
            深受各界创作者信赖
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            听听全球专业人士如何借助字节跳动 Seedance 1.5 Pro 改变工作流程、节省时间、提升创作产出。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            关于 Seedance 1.5 Pro 的常见问题
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            快速解答关于 Seedance 1.5 Pro AI 视频生成器的常见疑问。
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
            准备好体验 Seedance 1.5 Pro 的强大力量了吗？
          </h2>
          <p className="mb-8 text-lg text-white/60">
            停止将就平庸的视觉内容。加入已在提升制作规模、降低成本、提高观众参与度的创作者革命，开启你与终极字节跳动 Seedance 1.5 Pro 平台的旅程。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始创作</Link>
        </div>
      </section>
    </div>
  );
}
