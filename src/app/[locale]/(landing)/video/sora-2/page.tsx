'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';
import Image from 'next/image';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Steps ─── */

/* ─── Features ─── */

/* ─── Who Benefits ─── */

/* ─── Testimonials ─── */

/* ─── FAQs ─── */

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
const TESTIMONIALS = [
  {
    name: '赵建筑师',
    role: '高端建筑可视化专家',
    avatar: 'https://static.banana2ai.net/images/avatars/dhp85zlyoefb.webp',
    quote: '我从事高端建筑可视化工作，客户对灯光和纹理的要求极为挑剔。我开始用 Sora 2 为概念建筑创作漫步动画。Sora 2 处理玻璃反射和自然光交互的方式令我叹为观止——这正是我们向客户呈现建筑愿景所需要的真实感。',
  },
  {
    name: '李独立电影人',
    role: '独立电影导演',
    avatar: 'https://static.banana2ai.net/images/avatars/o2x1l23at94y.webp',
    quote: '作为独立电影人，预算始终是我最大的制约。我需要为短片创作一个 1920 年代纽约街道的定场镜头，搭建实景根本不可能。我转向 Sora 2，结果令人惊叹——时代准确的服装、建筑和街道氛围，让整部片子焕然一新。',
  },
  {
    name: '王社媒机构主理人',
    role: '社交媒体运营机构创始人',
    avatar: 'https://static.banana2ai.net/images/avatars/obc2sna6dfu2.webp',
    quote: '经营社交媒体机构意味着永无止境地供应内容。我们以前总为素材库的通用感所困扰。Sora 2 彻底改变了这一切。现在，如果客户需要"在霓虹灯丛林中制作拿铁的未来机器人"，我们五分钟内就能交付独一无二的专属素材。',
  },
  {
    name: '陈VR教育开发者',
    role: '教育 VR 体验开发者',
    avatar: 'https://static.banana2ai.net/images/avatars/x7tn1t9bnx5u.webp',
    quote: '我开发教育 VR 体验，并使用 Sora 2 生成动态背景纹理。Sora 2 的物理引擎彻底征服了我。当我要求"波涛汹涌的海水"时，海浪真的像水一样运动，而不仅仅是移动的噪点纹理。这正是沉浸式教育体验所需要的真实感。',
  },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const STEPS = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-describe.webp',
      title: isZh ? '输入你的文字提示词' : 'Enter your text prompt',
      desc: isZh ? '用自然语言描述你想创作的视频场景。Sora 2 能理解复杂的多层次指令，精准还原你的创意构想。' : 'Describe the video scene you want to create using natural language. Sora 2 understands complex, multi-layered instructions and precisely recreates your creative vision.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-video.webp',
      title: isZh ? '选择视频参数' : 'Select video parameters',
      desc: isZh ? '根据需求选择视频分辨率、时长和宽高比，无论是竖屏社交媒体还是横屏影院格式，Sora 2 均可完美适配。' : 'Choose video resolution, duration, and aspect ratio according to your needs. Sora 2 perfectly adapts to both vertical social media and horizontal cinematic formats.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      title: isZh ? '点击生成视频' : 'Click to generate video',
      desc: isZh ? '基于云端的 Sora 2 引擎将处理你的请求。无需高性能电脑，只需稳定的网络连接即可享受完整功能。' : 'The cloud-based Sora 2 engine will process your request. No high-performance computer is needed, just a stable internet connection to enjoy full functionality.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-settings.webp',
      title: isZh ? '下载并使用' : 'Download and use',
      desc: isZh ? '生成完成后即刻下载你的视频，可用于商业项目、社交媒体、教育内容或任何创意用途。' : 'Once generated, immediately download your video for use in commercial projects, social media, educational content, or any creative purpose.',
    },
  ];

  const FEATURES = [
    {
      title: isZh ? '无与伦比的照片级真实感与纹理精度' : 'Unparalleled Photorealistic Fidelity and Texture Precision',
      desc: isZh ? 'Sora 2 的定义性特征在于其令人叹为观止的视觉保真度。AI 视频领域长期存在"恐怖谷"难题，而 Sora 2 彻底攻克了这一难关——从玻璃反射的精确光学行为到布料在风中自然飘动的褶皱，每一个细节都与真实世界如出一辙。' : 'The defining characteristic of Sora 2 is its breathtaking visual fidelity. The AI video field has long struggled with the ’uncanny valley’ problem, but Sora 2 has completely overcome this challenge – from the precise optical behavior of glass reflections to the natural folds of fabric fluttering in the wind, every detail is indistinguishable from the real world.',
    },
    {
      title: isZh ? '先进的物理引擎与时间一致性' : 'Advanced Physics Engine and Temporal Consistency',
      desc: isZh ? 'Sora 2 最重要的飞跃之一，是对物理学和因果关系的深度理解。过去的视频模型常将物体处理为色彩变化的模糊团块，导致不自然的运动效果。Sora 2 真正理解重力、动量和物质属性，流体动力学、碰撞和自然现象的呈现都符合真实世界的物理规律。' : 'One of the most significant leaps for Sora 2 is its deep understanding of physics and causality. Past video models often treated objects as blurry masses of changing colors, leading to unnatural motion effects. Sora 2 truly understands gravity, momentum, and material properties, ensuring that fluid dynamics, collisions, and natural phenomena are rendered in accordance with real-world physical laws.',
    },
    {
      title: isZh ? '精准提示词遵循与创意控制' : 'Precise Prompt Following and Creative Control',
      desc: isZh ? 'Sora 2 为创作者提供了前所未有的输出控制能力。Sora 2 内置的自然语言处理单元经过精心调优，能够理解指令的字面意义和内在意图。无论是指定特定的摄影运动、情绪基调还是风格参考，Sora 2 都能精准实现你的完整创意愿景。' : 'Sora 2 offers creators unprecedented output control. The built-in natural language processing unit of Sora 2 is meticulously tuned to understand both the literal meaning and underlying intent of instructions. Whether specifying particular camera movements, emotional tones, or style references, Sora 2 can precisely realize your complete creative vision.',
    },
  ];

  const BENEFITS = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-describe.webp',
      title: isZh ? '电影人和导演' : 'Filmmakers and Directors',
      desc: isZh ? '对于影视专业人士而言，Sora 2 是终极的预可视化和补充镜头工具。导演可以用 Sora 2 即时将复杂场景绘制成分镜图，在剧组进场之前测试镜头角度和布光方案，从而节省大量时间和预算。' : 'For film and television professionals, Sora 2 is the ultimate pre-visualization and supplementary shot tool. Directors can use Sora 2 to instantly storyboard complex scenes, testing camera angles and lighting setups before the crew arrives, thereby saving significant time and budget.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-video.webp',
      title: isZh ? '数字营销人员和机构' : 'Digital Marketers and Agencies',
      desc: isZh ? '速度是现代营销的硬通货。Sora 2 赋能机构在数分钟而非数周内制作高端商业视频内容。无论是动感的社交媒体广告、产品展示还是品牌情绪视频，Sora 2 都能以惊人速度交付成果。' : 'Speed is the currency of modern marketing. Sora 2 empowers agencies to produce high-end commercial video content in minutes, not weeks. Whether dynamic social media ads, product showcases, or brand mood videos, Sora 2 delivers results with astonishing speed.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      title: isZh ? '游戏开发者' : 'Game Developers',
      desc: isZh ? '游戏开发需要大量资源用于资产创作。Sora 2 通过生成动态纹理、环境背景和过场动画原型来加速这一流程。开发者可以用 Sora 2 可视化游戏机制或氛围概念，无需耗费大量时间和资金进行全面制作。' : 'Game development requires significant resources for asset creation. Sora 2 accelerates this process by generating dynamic textures, environmental backgrounds, and cutscene prototypes. Developers can use Sora 2 to visualize game mechanics or atmospheric concepts without spending extensive time and money on full production.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-settings.webp',
      title: isZh ? '教育工作者和内容创作者' : 'Educators and Content Creators',
      desc: isZh ? '用视觉辅助手段解释复杂概念变得前所未有的简单。教育工作者可以用 Sora 2 生成历史重演、科学可视化和地理旅游内容，无需预算支持。YouTube 创作者和在线课程制作者则能创作出令受众叹服的专业级教育内容。' : 'Explaining complex concepts with visual aids has never been easier. Educators can use Sora 2 to generate historical reenactments, scientific visualizations, and geographical travel content without budget constraints. YouTube creators and online course producers can create professional-grade educational content that impresses their audience.',
    },
  ];


  const FAQS = [
    {
      q: isZh ? 'Sora 2 是什么？它是如何工作的？' : 'What is Sora 2? How does it work?',
      a: isZh ? 'Sora 2 是最新一代的先进文字转视频生成模型，采用基于 Transformer 的架构，能够根据简单的文字指令生成长达一分钟（或在扩展模式下更长）的高保真视频。与早期系统不同，Sora 2 能够推理视觉场景中的物体、动作和关系，实现符合物理规律的真实动态效果。' : 'Sora 2 is the latest generation of advanced text-to-video generative models, utilizing a Transformer-based architecture to create high-fidelity videos up to one minute long (or longer in extended mode) from simple text prompts. Unlike earlier systems, Sora 2 can reason about objects, actions, and relationships within visual scenes, achieving realistic dynamic effects that adhere to physical laws.',
    },
    {
      q: isZh ? 'Sora 2 与上一个版本有何不同？' : 'How is Sora 2 different from the previous version?',
      a: isZh ? 'Sora 2 相较于原版本实现了巨大飞跃。主要改进包括：增强的 4K 分辨率支持、能精确模拟流体动力学和重力的高级物理引擎，以及更出色的提示词遵循能力。与此同时，对话自然性、动作流畅度和整体渲染精度均有显著提升。' : 'Sora 2 represents a huge leap forward compared to the original version. Key improvements include: enhanced 4K resolution support, an advanced physics engine capable of accurately simulating fluid dynamics and gravity, and superior prompt adherence. Concurrently, conversational naturalness, motion fluidity, and overall rendering precision have all significantly improved.',
    },
    {
      q: isZh ? '我可以将 Sora 2 生成的视频用于商业项目吗？' : 'Can I use videos generated by Sora 2 for commercial projects?',
      a: isZh ? '可以！Sora 2 为你生成的视频授予完整的商业使用权，前提是你使用的是符合条件的专业套餐。这意味着你可以将视频用于电视广告、YouTube 变现、故事片和营销活动等商业场景，无需额外支付授权费用。' : 'Yes! Sora 2 grants you full commercial usage rights for the videos it generates, provided you are on an eligible professional plan. This means you can use the videos for commercial purposes such as TV commercials, YouTube monetization, feature films, and marketing campaigns, without additional licensing fees.',
    },
    {
      q: isZh ? 'Sora 2 支持竖屏格式的社交媒体视频吗？' : 'Does Sora 2 support vertical format videos for social media?',
      a: isZh ? '完全支持。Sora 2 提供强大的宽高比控制功能。你可以生成标准 16:9 宽屏（适用于影院和电视）、9:16 竖屏（适用于 TikTok、Instagram Reels 和 Shorts）等多种格式。Sora 2 会根据你选择的宽高比智能调整画面构图。' : 'Absolutely. Sora 2 offers powerful aspect ratio control. You can generate various formats such as standard 16:9 widescreen (for cinema and TV), 9:16 vertical (for TikTok, Instagram Reels, and Shorts). Sora 2 intelligently adjusts frame composition based on your chosen aspect ratio.',
    },
    {
      q: isZh ? '使用 Sora 2 需要高性能电脑吗？' : 'Do I need a high-performance computer to use Sora 2?',
      a: isZh ? '不需要！Sora 2 是基于云端的解决方案，所有繁重的计算工作都在我们强大的服务器集群上完成。你无需昂贵的游戏电脑或高端显卡，只需稳定的网络连接和网页浏览器，即可享受 Sora 2 的全部功能。' : 'No! Sora 2 is a cloud-based solution, and all heavy computational work is performed on our powerful server clusters. You do not need an an expensive gaming computer or high-end graphics card; simply a stable internet connection and a web browser are sufficient to enjoy all of Sora 2’s features.',
    },
    {
      q: isZh ? 'Sora 2 如何保障我的数据和内容安全？' : 'How does Sora 2 ensure the security of my data and content?',
      a: isZh ? '我们将用户安全和负责任的 AI 使用置于首位。Sora 2 内置安全机制，防止生成暴力、仇恨或不当内容。此外，所有视频生成数据均经过加密处理。我们不会将你的私人、非公开输入用于训练模型，你的创意成果始终受到保护。' : 'We prioritize user safety and responsible AI use. Sora 2 has built-in safety mechanisms to prevent the generation of violent, hateful, or inappropriate content. Furthermore, all video generation data is encrypted. We do not use your private, non-public inputs to train the model, and your creative output is always protected.',
    },
  ];

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
          <span className="text-[#ffcc33]">Sora 2</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                释放 Sora 2 视频生成的全部潜力
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">加入 AI 驱动的电影创作革命</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                欢迎来到生成式媒体的绝对前沿。Sora 2 并非简单的版本更新，而是对人工智能在视频制作领域所能实现目标的全面重新构想。它通过精准的物理引擎模拟、卓越的时间一致性和 4K 照片级真实感，将你的文字提示词转化为电影级杰作。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {[
                  '📸 4K 照片级真实感输出',
                  '⚛️ 先进物理引擎模拟',
                  '🎯 精准提示词遵循控制',
                  '☁️ 云端运行，无需高性能设备',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/showcase/sora-thumb.webp" alt="Sora 2" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Generator ── */}
      <VideoGeneratorPanel
        sampleVideoSrc="https://static.banana2ai.net/videos/sample-subpage.mp4"
        sampleVideoPoster="https://static.banana2ai.net/images/showcase/sora-thumb.webp"
      />

      {/* ── Steps ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            如何使用 <span className="text-[#ffcc33]">Sora 2</span> 创作视频
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            无论你是休闲爱好者还是专业导演，Sora 2 都为你量身定制了流畅的创作体验。
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
            Sora 2 的<span className="text-[#ffcc33]">无限创意可能</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            探索使 Sora 2 成为 AI 视频生成市场领导者的技术突破。从模拟复杂的世界物理到呈现照片级真实感纹理，Sora 2 专为专业人士打造。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffcc33]/20 to-[#ff9900]/10">
                  <span className="text-2xl">
                    {i === 0 ? '🎨' : i === 1 ? '⚛️' : '🎯'}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Benefits ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            谁能从 <span className="text-[#ffcc33]">Sora 2</span> 中受益？
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            了解不同行业如何借助 Sora 2 的力量革新工作流程。从好莱坞制片公司到独立创作者，Sora 2 已成为新一代视频创作的行业标准。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {BENEFITS.map((card, i) => (
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
            用户对 Sora 2 的真实评价
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            了解为什么全球各地的专业人士都在转向 Sora 2 满足他们的视频生成需求。来自真实创作者的真实反馈。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            关于 Sora 2 的常见问题
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            关于 Sora 2 视频模型的功能、定价和技术规格的详细解答。
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
            立即使用 Sora 2 开始创作电影级视频
          </h2>
          <p className="mb-8 text-lg text-white/60">
            视频制作的未来已经到来。不要落后于时代。加入已经在使用 Sora 2 将最疯狂创意变为现实的数千名创作者行列。立即注册，体验全球最先进视频 AI 的强大力量。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始免费使用</Link>
        </div>
      </section>
    </div>
  );
}
