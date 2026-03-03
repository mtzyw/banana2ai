'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';
import Image from 'next/image';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Features ─── */

/* ─── Steps (tab + image layout) ─── */

/* ─── Workflow (2-col icon grid) ─── */

/* ─── Testimonials ─── */

/* ─── FAQs ─── */

/* ─── Inline Components ─── */
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
            className={`rounded-full transition-all duration-300 ${i === idx ? 'h-2 w-6 bg-[#ffcc33]' : 'h-2 w-2 bg-white/20 hover:bg-[#ffcc33]/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────── PAGE ────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Daniel Foster',
    role: 'Independent Filmmaker',
    avatar: 'https://static.banana2ai.net/images/avatars/x17b6f0kapj8.webp',
    quote: 'Using Veo 3.1 on this page has completely changed how I prototype scenes. I can describe camera movements, extend shots, and test pacing without touching the timeline. For filmmakers exploring the Veo 3.1 workflow, this feels more like writing visual choreography than editing footage.',
  },
  {
    name: 'Isabella Conti',
    role: 'Brand Campaign Strategist',
    avatar: 'https://static.banana2ai.net/images/avatars/zrwyalsqygtm.webp',
    quote: 'I use Veo 3.1 to explore the narrative rhythm of product campaigns. Generating longer, more coherent sequences allows me to test transitions and emotions earlier. This platform clearly shows me how Veo 3.1 integrates into the creative process, rather than just being an AI video demo.',
  },
  {
    name: 'Marcus Lee',
    role: 'Game Cutscene Designer',
    avatar: 'https://static.banana2ai.net/images/avatars/n2lf5ciih5o2.webp',
    quote: 'Veo 3.1 is perfect for testing in-game cutscene ideas. I can describe actions, environmental behaviors, and camera perspectives with text and see immediate results. For video creation emphasizing movement and coherence, this workflow is practical and closer to production standards.',
  },
  {
    name: 'Olivia Ramirez',
    role: 'Motion Design Lead',
    avatar: 'https://static.banana2ai.net/images/avatars/p2oz67swj6ax.webp',
    quote: 'What impresses me most about Veo 3.1 is its scene consistency. I can iterate around the same visual idea, fine-tune movements, and maintain a stable style. This platform clearly explains how Veo 3.1 supports longer narratives, which is exactly what creative teams need for early concept development.',
  },
  {
    name: 'Ethan Novak',
    role: 'Digital Content Producer',
    avatar: 'https://static.banana2ai.net/images/avatars/o1r99ex3i9fb.webp',
    quote: 'I use Veo 3.1 for camera movement studies and visual rhythm testing. Adjusting shots with text is surprisingly efficient. This platform demonstrates how Veo 3.1 can be implemented into real workflows, proving highly valuable for cinematic motion experiments.',
  },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const FEATURES = [
    {
      title: isZh ? '长时段且连贯的电影级视频结构' : 'Long-duration and Coherent Cinematic Video Structure',
      desc: isZh ? 'Veo 3.1 可以生成超越短片段限制的高质量 1080p 视频序列，支持具备一致风格、空间构图持续演进以及叙事连贯性的长视频输出。这对正在做概念原型、预可视化与基于运动内容规划的创作者尤为有吸引力，让画面随时间推进，而不是陷入重复生成的循环。' : 'Veo 3.1 can generate high-quality 1080p video sequences that go beyond the limitations of short clips, supporting long video outputs with consistent style, continuously evolving spatial composition, and narrative coherence. This is particularly attractive to creators working on concept prototyping, pre-visualization, and motion-based content planning, allowing scenes to progress over time instead of getting stuck in a loop of repetitive generation.',
    },
    {
      title: isZh ? '镜头运动、视角变化与物理一致性' : 'Camera Movement, Perspective Changes, and Physical Consistency',
      desc: isZh ? '官方 Veo 页面强调电影级镜头运动、连贯动作表现与平滑的视角变化。它能够呈现具备物理感知的视觉行为——反射、水体、烟雾、玻璃以及自然光照。用户可以用文字描述动作并看到画面响应，真正实现"摄影指导"特性——用语言设计镜头，而不是依赖时间轴。' : 'The official Veo page emphasizes cinematic camera movements, coherent action performance, and smooth perspective changes. It can present physically aware visual behaviors—reflections, water bodies, smoke, glass, and natural lighting. Users can describe actions with text and see the visual response, truly achieving the "cinematography director" feature—designing shots with language instead of relying on a timeline.',
    },
    {
      title: isZh ? '多镜头创作与文本驱动剪辑' : 'Multi-shot Creation and Text-driven Editing',
      desc: isZh ? 'Veo 3.1 支持通过文本指令进行叙事剪辑。用户可以延展镜头、调整运动方式，或通过描述性提示重构场景。在我们的环境中，Veo 3.1 有助于实现多镜头合成——场景 A 过渡到场景 B，角色保持可识别性，视觉风格持续一致，同时掌控构图与叙事。' : 'Veo 3.1 supports narrative editing through text commands. Users can extend shots, adjust motion, or reconstruct scenes through descriptive prompts. In our environment, Veo 3.1 helps achieve multi-shot composition—scene A transitions to scene B, characters maintain recognizability, visual style remains consistent, while controlling composition and narrative.',
    },
  ];

  const STEPS = [
    {
      label: isZh ? '步骤 1：用自然语言描述场景' : 'Step 1: Describe the Scene with Natural Language',
      title: isZh ? '提示词结构' : 'Prompt Structure',
      image: 'https://static.banana2ai.net/images/features/314i9xc9veiz.webp',
      desc: isZh ? '写出对动作、空间语境、环境材质或镜头角度的文字描述。描述性语言——例如光照、运动行为、转场方式——能够驱动结构化输出。用户可以提及视角、演员动作、风的状态或水下扭曲效果。用文字描述镜头，而不是编辑关键帧。' : 'Write a text description of actions, spatial context, environmental materials, or camera angles. Descriptive language—such as lighting, motion behavior, transition methods—can drive structured output. Users can mention perspectives, actor movements, wind conditions, or underwater distortion effects. Describe shots with text, do not edit keyframes.',
    },
    {
      label: isZh ? '步骤 2：生成并延展' : 'Step 2: Generate and Extend',
      title: isZh ? '使用 Veo 3.1 构建时长' : 'Use Veo 3.1 to Build Duration',
      image: 'https://static.banana2ai.net/images/features/qa4lfqspyuzg.webp',
      desc: isZh ? '当初始画面生成后，用户可以延展视频片段的不同阶段。Veo 3.1 具备结构持续性以及跨镜头的叙事延续能力。在我们的平台中，Veo 3.1 成为"演进工具"——从几秒扩展到具备连贯分钟级结构的内容，对营销、预可视化与 IP 开发工作流具有战略价值。' : 'After the initial footage is generated, users can extend different stages of the video clip. Veo 3.1 possesses structural continuity and narrative extension capabilities across shots. On our platform, Veo 3.1 becomes an "evolution tool"—expanding from a few seconds to content with coherent minute-level structures, holding strategic value for marketing, pre-visualization, and IP development workflows.',
    },
    {
      label: isZh ? '步骤 3：修改、重写、重新构想' : 'Step 3: Modify, Rewrite, Re-imagine',
      title: isZh ? '基于文本的画面重构' : 'Text-based Scene Reconstruction',
      image: 'https://static.banana2ai.net/images/features/rltfglk5u3vj.webp',
      desc: isZh ? 'Veo 3.1 支持基于文本的修改能力，创作者可以请求新的运动行为——更快的跟拍摇移、更慢的航拍拉远，或重新定义视觉风格。写下请求、更新镜头、锁定一致性、导出结构化素材。对许多创作者而言，这替代了昂贵的原型制作阶段。' : 'Veo 3.1 supports text-based modification capabilities, creators can request new motion behaviors—faster follow pans, slower aerial pull-backs, or redefine visual styles. Write down requests, update shots, lock consistency, export structured footage. For many creators, this replaces expensive prototyping stages.',
    },
  ];

  const WORKFLOW = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      title: isZh ? '短片预可视化' : 'Short Film Pre-visualization',
      desc: isZh ? '影视制作团队可以描述三个场景转场，并期望 Veo 3.1 在 1080p 渲染中保持动作连贯性。他们可以撰写旁白、让镜头环绕运动，并请求在环境中缓慢漂移，在投入实体拍摄前显著降低不确定性。' : 'Film and television production teams can describe three scene transitions and expect Veo 3.1 to maintain motion coherence in 1080p rendering. They can write narration, have the camera move around, and request a slow drift through the environment, significantly reducing uncertainty before committing to physical shooting.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-customize.webp',
      title: isZh ? '长叙事品牌内容' : 'Long-form Narrative Brand Content',
      desc: isZh ? '营销团队希望为活动制作叙事驱动的发布片段。Veo 3.1 可以让运动持续演进——产品穿梭镜头、观众视角旋转、地点切换与一致的视觉身份。目标是进行可迭代的方案探索，而非一次生成最终广告。' : 'Marketing teams want to produce narrative-driven launch clips for campaigns. Veo 3.1 can allow motion to continuously evolve—product fly-throughs, rotating audience perspectives, location changes, and consistent visual identity. The goal is to explore iterative solutions, not to generate a final advertisement in one go.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
      title: isZh ? '场景延展与角色一致性' : 'Scene Extension and Character Consistency',
      desc: isZh ? '编剧可以基于前序画面请求更多镜头素材。Veo 3.1 跨镜头保持一致性，对角色驱动的叙事作品在结构上非常重要，帮助创作者持续推进故事情节而不失去视觉连贯感。' : 'Screenwriters can request more footage based on preceding scenes. Veo 3.1 maintains consistency across shots, which is structurally very important for character-driven narrative works, helping creators advance storylines without losing visual coherence.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-download.webp',
      title: isZh ? '概念设计中的镜头运动探索' : 'Camera Movement Exploration in Concept Design',
      desc: isZh ? '艺术家希望获得摇臂角度、水下漂移、航拍扫掠与视差叙事等运动效果。Veo 3.1 将这些需求转化为语言指令，而非 3D 绑定与复杂镜头设定，大幅降低技术门槛。' : 'Artists want motion effects such as jib angles, underwater drifts, aerial sweeps, and parallax narratives. Veo 3.1 translates these requirements into language commands, rather than 3D rigging and complex camera setups, significantly lowering the technical barrier.',
    },
  ];


  const FAQS = [
    {
      q: isZh ? 'Veo 3.1 和官方 Google 产品页面是同一个模型吗？' : 'Is Veo 3.1 the same model as on the official Google product page?',
      a: isZh ? '当然是！Veo 3.1 由 Google 官方服务提供支持。你可以在这里直接使用官方 Google Veo 3.1 AI 视频模型，体验与官方同等的生成质量。' : 'Absolutely! Veo 3.1 is powered by official Google services. You can directly use the official Google Veo 3.1 AI video model here and experience the same generation quality as the official version.',
    },
    {
      q: isZh ? 'Veo 3.1 能生成带声音的视频吗？' : 'Can Veo 3.1 generate videos with sound?',
      a: isZh ? '是的！Veo 3.1 可以生成带声音的视频。Veo 3.1 AI 视频模型是从 Veo 3 升级而来，而 Veo 3 是第一个能够生成带音频视频的视频模型，实现真正的音画同步体验。' : 'Yes! Veo 3.1 can generate videos with sound. The Veo 3.1 AI video model is an upgrade from Veo 3, which was the first video model capable of generating videos with audio, achieving a truly synchronized audio-visual experience.',
    },
    {
      q: isZh ? '使用这款 Veo 3.1 视频工具时，我的内容与数据安全吗？' : 'Is my content and data secure when using this Veo 3.1 video tool?',
      a: isZh ? '是的。隐私与数据安全对我们来说至关重要。在我们的平台内，使用 Veo 3.1 生成的所有视频都会以安全方式处理，确保你的创作内容受到妥善保护。' : 'Yes. Privacy and data security are paramount to us. Within our platform, all videos generated using Veo 3.1 are processed securely, ensuring your creative content is properly protected.',
    },
    {
      q: isZh ? '在这个平台上，Veo 3.1 真的可以免费用吗？' : 'Is Veo 3.1 truly free to use on this platform?',
      a: isZh ? '是的。我们提供免费使用入口，让用户无需预付费用即可体验 Veo 3.1。新用户可以直接开始创作，探索模型的核心能力。' : 'Yes. We provide a free access point, allowing users to experience Veo 3.1 without upfront payment. New users can directly start creating and explore the core capabilities of the model.',
    },
    {
      q: isZh ? '如何去除 Veo 3.1 生成视频的水印？' : 'How do I remove the watermark from Veo 3.1 generated videos?',
      a: isZh ? '升级为我们的订阅方案即可去除水印。成为订阅会员后，你可以导出干净、无水印的 Veo 3.1 视频，满足专业与商业使用需求。' : 'Upgrade to our subscription plan to remove watermarks. As a subscriber, you can export clean, watermark-free Veo 3.1 videos, meeting professional and commercial use requirements.',
    },
    {
      q: isZh ? '我可以将 Veo 3.1 生成的视频用于商业项目吗？' : 'Can I use Veo 3.1 generated videos for commercial projects?',
      a: isZh ? '商业用途取决于你的订阅等级。免费用户可以探索并测试 Veo 3.1 的能力，而订阅会员可获得更适合商业使用的导出选项，包括无水印高清导出与更多生成配额。' : 'Commercial use depends on your subscription tier. Free users can explore and test Veo 3.1 capabilities, while subscribers gain export options more suitable for commercial use, including watermark-free HD export and more generation quota.',
    },
  ];

  const fadeRef = useScrollFade();
  const [stepTab, setStepTab] = useState(0);
  const [stepVisible, setStepVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const switchStep = (i: number) => {
    if (i === stepTab) return;
    setStepVisible(false);
    setTimeout(() => { setStepTab(i); setStepVisible(true); }, 250);
  };

  const step = STEPS[stepTab];

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">{isZh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <Link href="/zh/video/" className="transition-colors hover:text-white/70">{isZh ? 'AI视频生成器' : 'AI Video Generator'}</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">Veo 3.1</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                {isZh ? '开启电影级视频创作，使用 Veo 3.1' : 'Start cinematic video creation using Veo 3.1'}
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">
                {isZh ? '探索长视频连贯性与以运动为核心的镜头调度' : 'Explore long-form video coherence and motion-centric shot orchestration'}
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Veo 3.1 {isZh ? '是 Google 最新推出的高质量 AI 视频生成模型，被集成在我们的多引擎创作空间中。用户无需技术阻碍即可获得电影级输出与场景探索能力——无门槛、无需手动时间轴剪辑、也不需要专业人员介入。模型会响应你的指令：描述镜头运动、延展镜头、调整动作，并细化转场。' : 'is Google newest high-quality AI video generation model, integrated into our multi-engine creative space. Users can achieve cinematic output and scene exploration capabilities without technical barriers—no threshold, no manual timeline editing, and no need for professional intervention. The model will respond to your commands: describe camera movement, extend shots, adjust actions, and refine transitions.'}
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">{isZh ? '✨ 立即体验 Veo 3.1' : '✨ Experience Veo 3.1 Now'}</Link>
              <ul className="mt-8 space-y-2">
                {[
                  isZh ? '🎬 带声音的电影级长视频输出' : '🎬 Cinematic long-form video output with sound',
                  isZh ? '🎥 运动感知与平滑视角变化' : '🎥 Motion awareness and smooth perspective changes',
                  isZh ? '📝 文本驱动镜头调度与剪辑' : '📝 Text-driven shot orchestration and editing',
                  isZh ? '🔗 跨帧一致性与叙事连贯结构' : '🔗 Cross-frame consistency and narrative coherent structure',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/video/veo3-showcase.webp" alt="Veo 3.1 {isZh ? '视频生成' : 'Video Generation'}" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '为什么' : 'Why'} <span className="text-[#ffcc33]">Veo 3.1</span> {isZh ? '对长视频创作很关键' : 'is crucial for long-form video creation'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '许多创作者希望获得高质量 AI 视频模型的使用入口，是因为他们需要分钟级的叙事能力。以下是 Veo 3.1 的核心优势。' : 'Many creators want access to high-quality AI video models because they need minute-level narrative capabilities. Here are Veo 3.1 core advantages.'}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ffcc33] to-[#ff9900] text-lg font-bold text-black">
                  {i + 1}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#ffcc33] transition-colors group-hover:text-[#ffcc33]">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Generator ── */}
      <VideoGeneratorPanel
        sampleVideoSrc="https://static.banana2ai.net/videos/sample-subpage.mp4"
        sampleVideoPoster="https://static.banana2ai.net/images/showcase/veo-thumb.webp"
      />

      {/* ── Steps (tabs + image) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            如何用 Veo 3.1 创作<span className="text-[#ffcc33]">{isZh ? '高质量叙事视频' : 'High-Quality Narrative Videos'}</span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '我们的平台提供三步式方法，将 Veo 3.1 映射为可落地的工作流，让创作者从创意到成片，无需手动剪辑时间轴。' : 'Our platform provides a three-step method to map Veo 3.1 into a practical workflow, allowing creators to go from idea to finished product without manual timeline editing.'}
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => switchStep(i)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${stepTab === i ? 'border-[#ffcc33]/30 bg-[#ffcc33]/10 text-[#ffcc33]' : 'border-transparent bg-[#1c2030] text-white/50'}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Desktop tabs */}
          <div className="mb-10 hidden justify-center gap-2 md:flex md:flex-wrap">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => switchStep(i)}
                className={`relative px-5 py-3 text-sm font-medium transition-all duration-300 ${stepTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {s.label}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
                  style={{ opacity: stepTab === i ? 1 : 0, transform: stepTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            ))}
          </div>

          {/* Content: left image + right text */}
          <div className="relative min-h-[400px] md:min-h-[480px]">
            <div
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
              style={{
                opacity: stepVisible ? 1 : 0,
                transform: stepVisible ? 'none' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={600}
                  height={500}
                  className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 hover:scale-105 md:max-h-[500px]"
                />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{step.title}</h3>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <span className="gradient-glow-text text-sm font-semibold md:text-base">{step.label}</span>
                </div>
                <p className="mb-8 leading-relaxed text-white/60">{step.desc}</p>
                <Link href="/zh/pricing/" className="highlight-button inline-flex">{isZh ? '开始创作' : 'Start Creating'}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow (2-col icon grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Veo 3.1 在<span className="text-[#ffcc33]">{isZh ? '多模型视频工作流' : 'Multi-Model Video Workflow'}</span>中的定位
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            Veo 3.1 {isZh ? '是我们集成环境的一部分。用于电影级连贯性、长视频控制、文本重写与序列延展，以下是更贴近实际的使用场景。' : 'is part of our integrated environment. Used for cinematic coherence, long-form video control, text rewriting, and sequence extension, here are more practical use cases.'}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {WORKFLOW.map((item, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 4)}`}
              >
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={item.icon} alt={item.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.desc}</p>
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
            {isZh ? '创作者如何评价 Veo 3.1' : 'How creators evaluate Veo 3.1'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '以下创作者选择 Veo 3.1，是因为该模型帮助他们用更简单的语言去构思电影级运动，而无需依赖复杂的技术管线。' : 'The following creators chose Veo 3.1 because the model helps them conceptualize cinematic motion with simpler language without relying on complex technical pipelines.'}
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            {isZh ? '关于 Veo 3.1 的常见问题' : 'Frequently Asked Questions about Veo 3.1'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '关于 Veo 3.1 能力、使用方式、数据安全与商业授权的详细解答。' : 'Detailed answers regarding Veo 3.1 capabilities, usage, data security, and commercial licensing.'}
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
            {isZh ? '在多模型视频工作室中体验 Veo 3.1' : 'Experience Veo 3.1 in a multi-model video studio'}
          </h2>
          <p className="mb-8 text-lg text-white/60">
            {isZh ? '与其盲目搜索各种入口，不如直接在我们的环境中进行长视频运动测试、电影级序列创作、分钟级转场、场景探索与叙事修改。Veo 3.1 变成了一种' : 'Instead of blindly searching for various entry points, it is better to directly perform long-form video motion testing, cinematic sequence creation, minute-level transitions, scene exploration, and narrative modification in our environment. Veo 3.1 becomes a'}"{isZh ? '用文字做镜头调度' : 'text-based shot orchestration'}"{isZh ? '的工具——运动、视角、反射、光照与风格化表现，都可以在受控项目空间内完成。' : 'tool—motion, perspective, reflections, lighting, and stylized expression can all be completed within a controlled project space.'}
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">{isZh ? '✨ 立即开始免费使用' : '✨ Start Using for Free Now'}</Link>
        </div>
      </section>

    </div>
  );
}
