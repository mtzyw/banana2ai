'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare, SlidersHorizontal, Sparkles, Download,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Zap, Video, Film, Share2,
  Megaphone, Instagram, GraduationCap, Building2, Clapperboard, BookOpen,
} from 'lucide-react';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';

/* ──────────────────────────── Data ──────────────────────────── */

const HERO_FEATURES = [
  { icon: Zap, text: '闪电般快速的AI视频生成技术' },
  { icon: Film, text: '高级文字转视频创作' },
  { icon: Video, text: '图片到视频的无缝转换' },
  { icon: Share2, text: '免费注册 - 立即开始创作' },
];

const STEPS = [
  {
    num: 1, icon: MessageSquare,
    title: '描述或上传您的内容',
    desc: '与 Banana Pro AI 视频生成器分享您的愿景。输入文本进行文本生成视频创作，或上传图像进行图片生成视频转换。清晰的输入确保我们的 AI 视频生成器交付您所设想的内容。',
  },
  {
    num: 2, icon: SlidersHorizontal,
    title: '自定义您的视频设置',
    desc: '自定义视频设置——选择分辨率、宽高比和风格。无论使用文本生成视频还是图片生成视频，我们的 AI 视频生成器都能满足您的需求。灵活控制优化任何平台。',
  },
  {
    num: 3, icon: Sparkles,
    title: '一键生成',
    desc: '点击「生成」，让 Banana Pro AI 视频生成器创建您的视频。我们的文本生成视频和图片生成视频引擎在几秒钟内产出专业结果。自动保存到您的云端库以便即时访问。',
  },
  {
    num: 4, icon: Download,
    title: '下载和分享',
    desc: '您的视频已准备就绪！下载高质量 MP4——无水印且可直接广播。立即在任何平台使用您的文本生成视频或图片生成视频作品。专业结果，零妥协。',
  },
];

const VIDEO_MODELS = [
  {
    name: 'Veo 3/3.1',
    subtitle: 'Google 高级 AI 视频生成器',
    title: 'Veo 3/3.1:电影级品质的先进 AI 视频生成器',
    desc: '体验 Veo 3/3.1 前沿 AI 视频生成器技术。该模型由 Google 最新创新技术驱动，可将文本转视频和图像转视频，呈现电影级品质效果。非常适合追求广播级制作水准的专业创作者。',
    features: [
      { title: '电影级画质输出', desc: '使用这款AI视频生成器创建令人惊艳的4K视频，专业级品质，完美适用于文本生成视频和图片生成视频项目。' },
      { title: '高级文字转视频', desc: '将详细脚本转化为引人入胜的视频叙事，具备出色的场景理解和视觉叙事能力。' },
      { title: '卓越的图片转视频', desc: '使用先进的 AI 技术，为静态图像添加流畅逼真的动态效果和动感镜头运动。' },
      { title: '延长时长支持', desc: '创建时长达 2 分钟的长视频，实现全面的故事叙述和专业内容制作。' },
    ],
  },
  {
    name: 'Sora 2',
    subtitle: 'OpenAI 革命性 AI 视频生成器',
    title: 'Sora 2：OpenAI 推出的照片级真实感 AI 视频生成器',
    desc: '利用 OpenAI Sora 2 的强大功能，这是一款突破性的 AI 视频生成器，可以根据文本提示和图像输入创建逼真的视频。体验这项革命性 AI 视频生成技术带来的前所未有的真实感和创意控制力。',
    features: [
      { title: '照片级真实感生成', desc: '使用这款AI视频生成器的先进文本转视频和图片转视频功能，创作逼真生动的视频。' },
      { title: '复杂场景理解', desc: '生成包含多个角色、复杂交互和精密空间推理的视频。' },
      { title: '动态镜头运动', desc: '自动实现专业级电影摄影效果，包括流畅的平移、倾斜和跟踪镜头。' },
      { title: '多风格支持', desc: '从逼真的画面到艺术风格，这款AI视频生成器能够适应您的创意愿景。' },
    ],
  },
  {
    name: 'Wan 2.5',
    subtitle: '速度优化 AI 视频生成器',
    title: 'Wan 2.5:高产量制作的快速 AI 视频生成器',
    desc: '当速度至关重要时，Wan 2.5 能够满足您的需求。这款 AI 视频生成器专为快速文本转视频和图片转视频创作而设计，能在极短时间内生成专业级成果。',
    features: [
      { title: '快速生成速度', desc: '使用这款超快速 AI 视频生成器，在 30-60 秒内生成高质量视频，支持文本生成视频和图片生成视频。' },
      { title: '高效批量处理', desc: '同时处理多个文本生成视频或图片生成视频请求，实现最高生产效率。' },
      { title: '稳定品质', desc: '尽管AI视频生成器速度惊人，仍可在所有输出中保持专业标准。' },
      { title: '高性价比创作', desc: '以最低的积分消耗获得专业级视频输出，适合预算敏感的创作者。' },
    ],
  },
  {
    name: 'Kling',
    subtitle: '满足各种需求的灵活AI视频生成器',
    title: 'Kling：功能全面的AI视频生成器，具备高级控制功能',
    desc: 'Kling 提供全面的AI视频生成能力，具备精细的控制选项，适合需要灵活性和多样性的创作者。',
    features: [
      { title: '多种分辨率选项', desc: '支持从标清到高清的多种输出分辨率，满足不同平台和用途的需求。' },
      { title: '多样化风格控制', desc: '提供丰富的风格预设和自定义选项，实现独特的视觉表现。' },
      { title: '智能场景构图', desc: '自动优化场景构图和元素布局，确保视觉平衡和专业美感。' },
      { title: '优化工作流程', desc: '简化的操作流程让从概念到成品的转换更加高效顺畅。' },
    ],
  },
  {
    name: 'Grok Imagine',
    subtitle: '富有艺术气息的创意AI视频生成器',
    title: 'Grok Imagine：打造独特视觉效果的艺术AI视频生成器',
    desc: 'Grok Imagine 专注于艺术表现力，为追求独特视觉风格的创作者提供创意工具。',
    features: [
      { title: '艺术风格迁移', desc: '将经典艺术风格应用到视频创作中，创造独特的视觉美学效果。' },
      { title: '创意诠释', desc: '超越字面描述，对提示词进行创意诠释，生成出人意料的精彩内容。' },
      { title: '独特视觉美学', desc: '独特的视觉处理风格，让您的视频在众多内容中脱颖而出。' },
      { title: '实验性功能', desc: '探索前沿的AI视频生成技术，尝试创新的视觉表现方式。' },
    ],
  },
];

const WHY_TABS = [
  {
    label: '一键生成',
    title: '专业视频创作，一键即达',
    desc: '体验 Banana Pro AI 视频生成器的轻松视频创作。只需描述您的愿景进行文本生成视频，或上传图像进行图片生成视频转换。我们直观的 AI 视频生成器处理一切——从场景构图到最终渲染。',
    sub: 'Banana Pro 简化您的整个工作流程，即时交付专业结果。',
  },
  {
    label: '即时视频创作',
    title: '即刻将创意转化为专业视频',
    desc: '释放您的创意潜能，使用 Banana Pro AI 视频生成器。通过文本生成视频将脚本转化为引人入胜的视频，或使用图片生成视频让图像动起来。我们的 AI 视频生成器在几秒钟内为您的概念注入生命。',
    sub: 'Banana Pro 专为速度和精准而设计——您值得信赖的视频项目合作伙伴。',
  },
  {
    label: '一体化平台',
    title: '完整的 AI 视频生成器套件满足各种需求',
    desc: '使用 Banana Pro AI 视频生成器创建的每个视频都会自动保存到您的安全云端库。随时访问您所有的文本生成视频和图片生成视频作品。无水印下载，重复使用素材，保持井然有序的工作流程。',
    sub: 'Banana Pro AI 是您全面的视频制作平台。',
  },
  {
    label: '面向所有创作者',
    title: 'AI 视频生成器为每一位创作者赋能',
    desc: 'Banana Pro AI 视频生成器让专业视频创作变得大众化。我们友好的用户界面让复杂的文本生成视频和图片生成视频制作人人可及——无需任何技术专长。',
    sub: '从快速社交短片到电影叙事，Banana Pro AI 视频生成器助力您的愿景。',
  },
];

const FEATURES_DETAIL = [
  {
    title: '专业文本转视频和图片转视频生成',
    desc: '使用 Banana Pro 的 AI 视频生成器转换任何创意概念。输入脚本即可实现文本到视频的创作，或上传图片进行图片到视频的转换。我们先进的 AI 视频生成器提供专业级效果——广播级质量、零水印、即时生成。',
    image: 'https://static.banana2ai.net/images/features/video-media04.webp',
  },
  {
    title: '可自定义的AI视频生成器控制选项',
    desc: '精细调整视频创作的每个细节。我们的AI视频生成器为文本转视频和图片转视频提供广泛的自定义选项——风格、分辨率、宽高比。通过Banana Pro灵活的控制功能，完美匹配您的品牌形象。',
    image: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
  },
  {
    title: '多种AI视频生成模型',
    desc: '使用5个强大的AI视频生成模型。从Veo 3/3.1的电影级画质到Sora 2的照片级真实感，为您的项目选择完美的文本生成视频或图像生成视频引擎。每个模型都针对特定创作需求进行了优化。',
    image: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
  },
  {
    title: '云存储与资产管理',
    desc: '我们的AI视频生成器生成的每个视频都会自动保存到您的安全云端库中。随时访问所有文本转视频和图片转视频的创作内容。无水印下载、重复使用素材，并保持工作流程井然有序。',
    image: 'https://static.banana2ai.net/images/features/ldvemdrtofq8.webp',
  },
];

const INDUSTRIES = [
  {
    icon: Megaphone,
    title: '营销与广告视频',
    desc: '使用 Banana Pro AI 视频生成器制作高转化视频广告。使用文本生成视频转换广告脚本，或使用图片生成视频展示产品。我们的 AI 视频生成器大规模生产引人注目的营销素材。',
  },
  {
    icon: Instagram,
    title: '社交媒体内容',
    desc: '使用 Banana Pro AI 视频生成器制作病毒式传播的社交内容。使用文本生成视频将文本更新转换为引人入胜的视频，或使用图片生成视频将图像转化为动态帖子。针对每个平台优化内容。',
  },
  {
    icon: GraduationCap,
    title: '教育与培训材料',
    desc: '使用 Banana Pro AI 视频生成器制作有影响力的教学视频。使用文本生成视频转换课程计划，或使用图片生成视频让教育图表动起来。让复杂概念对所有级别的学习者都易于理解。',
  },
  {
    icon: Building2,
    title: '企业演示与沟通',
    desc: '使用 Banana Pro AI 视频生成器提升商业沟通。使用文本生成视频或图片生成视频将报告和数据转化为引人注目的演示。为内部沟通、投资者演示和客户提案增添专业光彩。',
  },
  {
    icon: Clapperboard,
    title: '影视与创意视频制作',
    desc: '使用 Banana Pro AI 视频生成器将电影愿景变为现实。使用文本生成视频可视化整个脚本，使用图片生成视频创建分镜序列。是独立电影制作人和创意工作室突破界限的必备工具。',
  },
  {
    icon: BookOpen,
    title: '个人项目与创意叙事',
    desc: '使用 Banana Pro AI 视频生成器将个人故事转化为视觉杰作。使用文本生成视频转换诗歌和叙事，或使用图片生成视频创建照片蒙太奇。赋能您的创意表达，将想象变为现实。',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Banana Pro的AI视频生成器真是改变游戏规则的利器！文本转视频功能可以快速将脚本转换为高质量视频，图片转视频则能轻松将照片转换为动态广告。我的每周视频产出增加了40%，互动率也提升了。',
    name: 'Maria Rodriguez',
    role: '社交媒体策略师',
    avatar: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp',
  },
  {
    quote: 'Banana Pro AI视频生成器效果惊艳！图片转视频功能可以制作动态产品展示，文字转视频能快速将广告文案转化为视觉内容。这款AI视频生成器为我节省了外包费用，帮助我更快地推出广告。',
    name: 'David Chen',
    role: '小企业主',
    avatar: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
  },
  {
    quote: 'Banana Pro AI视频生成器彻底改变了我的课程制作方式！文本转视频让教学计划变得生动活泼，图片转视频将静态图表转化为引人入胜的视觉内容。制作时间缩短了50%，学生参与度显著提升。',
    name: 'Sophia Miller',
    role: '在线教育工作者',
    avatar: 'https://static.banana2ai.net/images/avatars/l8af5arb7l0d.webp',
  },
  {
    quote: 'Banana Pro AI视频生成器彻底改变了我的影视制作流程！我可以通过文本生成视频功能即时将脚本可视化，并通过图片生成视频功能轻松创建故事板动画。高效性大幅加快了前期制作速度。',
    name: 'James Williams',
    role: '独立电影制作人',
    avatar: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
  },
];

const FAQ_ITEMS = [
  {
    q: '什么是 Banana Pro AI 视频生成器?',
    a: 'Banana Pro AI视频生成器是一个先进的AI驱动平台，可将文本描述（文本转视频）或静态图片（图片转视频）转换为专业品质的视频。采用Veo 3/3.1、Sora 2、Wan 2.5、Kling和Grok Imagine等前沿模型，呈现广播级效果。免费开始使用，无水印，保证专业品质。',
  },
  {
    q: '我可以用这个AI视频生成器创建什么样的视频?',
    a: 'Banana Pro AI视频生成器功能强大且用途广泛！可以创建营销广告视频、社交媒体短视频、教育培训视频、产品展示视频、企业宣传片、个人创意视频等各种类型的视频内容。',
  },
  {
    q: '使用这个AI视频生成器需要视频编辑经验吗?',
    a: '完全不需要！Banana Pro AI视频生成器专为所有人设计。我们的文本转视频和图片转视频功能完全直观易用——无需任何剪辑经验。AI视频生成器会自动处理所有技术细节。只需输入您的内容，自定义设置，即可生成专业视频。',
  },
  {
    q: 'Banana Pro AI视频生成器如何帮助我的业务?',
    a: 'Banana Pro AI视频生成器改变您的内容策略：大幅降低视频制作成本、提高内容产出速度、无需专业团队即可创建专业视频、快速迭代和测试不同创意方向、跨平台优化内容格式。',
  },
  {
    q: 'Banana Pro AI视频生成器可以免费使用吗?',
    a: '当然可以！Banana Pro 提供免费的 AI 视频生成器，每日赠送积分额度。您可以免费创建文字转视频和图片转视频内容。免费账户包含所有AI模型访问、无水印下载、云存储等完整功能。',
  },
  {
    q: '我可以将AI视频生成器的内容用于商业用途吗?',
    a: '当然可以！使用 Banana Pro AI 视频生成器创建的所有视频均包含完整的商业使用权。您可以将内容用于营销广告、社交媒体、企业沟通、客户项目等任何商业用途。所有视频无水印，完全所有权归您。',
  },
  {
    q: 'AI视频生成器的速度有多快?',
    a: 'Banana Pro AI 视频生成器经过速度优化：Wan 2.5 模型 30-60 秒生成、Veo 3/3.1 模型 1-3 分钟、Sora 2 模型 1-2 分钟。速度取决于视频长度和复杂度。免费账户享有与付费用户相同的处理速度。',
  },
  {
    q: 'AI视频生成器支持哪些格式？',
    a: 'Banana Pro AI视频生成器将所有内容导出为高质量MP4文件——这是与所有平台和设备兼容的行业标准格式。视频已针对社交媒体发布、网站嵌入、演示播放等场景进行优化。',
  },
  {
    q: '如果我对 AI 视频生成器的结果不满意怎么办?',
    a: 'Banana Pro AI视频生成器让优化变得简单：可以调整提示词重新生成、切换不同AI模型尝试、修改视频参数（分辨率、宽高比等）。快速迭代让您在几分钟内找到满意的结果。',
  },
  {
    q: '我应该选择哪个AI视频生成模型?',
    a: '每个 AI 视频生成模型各有所长：Veo 3/3.1 适合电影级品质、Sora 2 适合照片级真实感、Wan 2.5 适合快速批量生成、Kling 适合灵活控制、Grok Imagine 适合艺术创意。可以免费尝试所有模型，找到最适合您需求的那一个。',
  },
];

/* ──────────────────────────── Shared Components ──────────────────────────── */

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 right-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffcc33] opacity-[0.08] blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcc33] opacity-[0.04] blur-3xl" />
    </div>
  );
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function VideoListPage() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Testimonial auto-rotate
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* ─── 1. Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#161926] to-[#0f1117] px-4 py-8 md:py-12 lg:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-[1400px]">
          <FadeIn className="mb-6 text-center md:mb-10">
            <div className="relative inline-block px-4">
              <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#ffcc33]/20 via-[#ff9900]/20 to-[#ffcc33]/20 opacity-60 blur-3xl" />
              <h1 className="relative text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                <span className="block">
                  <span className="mr-2">AI 视频生成器</span>
                  <span className="gradient-text">为专业内容创作而生</span>
                </span>
                <span className="mx-auto mt-3 block h-0.5 w-44 rounded-full bg-gradient-to-r from-transparent via-[#ffcc33] to-transparent opacity-60 md:mt-4" />
              </h1>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <FadeIn className="text-center lg:text-left" delay={0.15}>
              <div className="space-y-4 md:space-y-6">
                <h2 className="gradient-glow-text text-lg font-bold leading-snug md:text-2xl lg:text-3xl">
                  即刻将创意转化为精彩视频
                </h2>
                <p className="text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
                  使用我们的AI视频生成器制作专业视频。几秒钟内将文本转换为视频或将图片转换为动态视频内容。Banana Pro提供广播级质量效果——免费开始使用，高清画质，零水印。
                </p>
                <FadeIn delay={0.3}>
                  <Link
                    href="/zh/video/veo-3-video-generator/"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#ffcc33]/30 md:text-lg"
                    style={{
                      border: '2px solid transparent',
                      backgroundImage: 'linear-gradient(#0f1117, #0f1117), linear-gradient(to right, #ffcc33, #ff9900, #ffcc33)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  >
                    <span className="gradient-text relative z-10">注册并免费创建</span>
                    <ArrowRight className="relative z-10 h-5 w-5 text-[#ffcc33] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </FadeIn>
                <div className="hidden space-y-3 lg:block">
                  {HERO_FEATURES.map((f, i) => (
                    <FadeIn key={i} delay={0.4 + i * 0.1} className="flex items-center gap-3">
                      <f.icon className="h-4 w-4 text-[#ffcc33]" />
                      <span className="text-sm font-medium md:text-base">{f.text}</span>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn className="relative mx-auto w-full max-w-lg lg:max-w-none" delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="aspect-[4/3] w-full object-cover"
                  poster="https://static.banana2ai.net/images/features/video-media04.webp"
                >
                  <source src="https://static.banana2ai.net/videos/showcase-2.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-[#ffcc33]/20 md:rounded-3xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 2. Video Generator Panel ─── */}
      <VideoGeneratorPanel />

      {/* ─── 3. More AI Video Generators ─── */}
      <section className="w-full px-4 py-8 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <p className="gradient-glow-text mb-2 text-lg font-bold sm:text-xl md:mb-4 md:text-2xl lg:text-3xl xl:text-4xl">
              更多 AI 视频生成器
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mb-4 max-w-4xl text-xs text-white/50 sm:text-sm md:mb-10 md:text-base lg:text-lg">
              探索我们的专业AI视频生成器合集，专为不同的创意需求和风格而设计
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 md:gap-6">
              {[
                { name: 'Veo 3.1', href: '/zh/video/veo-3-1/', img: 'https://static.banana2ai.net/images/showcase/veo-thumb.webp' },
                { name: 'Veo 3 视频生成器', href: '/zh/video/veo-3-video-generator/', img: 'https://static.banana2ai.net/images/showcase/veo-thumb.webp' },
                { name: 'Seedance 1.5 Pro', href: '/zh/video/seedance-1-5-pro/', img: 'https://static.banana2ai.net/images/showcase/seedance-thumb.webp' },
                { name: 'Sora 2', href: '/zh/video/sora-2/', img: 'https://static.banana2ai.net/images/showcase/sora-thumb.webp' },
              ].map((m) => (
                <Link key={m.name} href={m.href} className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-[#363b4e] shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ffcc33]/60">
                    <Image src={m.img} alt={m.name} fill className="object-cover" />
                  </div>
                  <div className="flex h-8 items-center justify-center bg-[#1c2030] px-1 py-1 sm:h-10 md:h-12 lg:h-14">
                    <span className="text-xs font-bold text-white transition-colors group-hover:text-[#ffcc33] sm:text-sm md:text-base">
                      {m.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. Four Steps ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              您的专业视频之旅：Banana Pro 4 个简单步骤
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-5xl md:text-base">
              体验 Banana Pro AI 视频生成器的轻松视频创作。使用文本生成视频或图片生成视频，只需四个简单步骤即可将创意转化为引人入胜的视频。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative z-10 flex flex-wrap justify-center gap-8 md:flex-nowrap">
              {STEPS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="group relative w-full max-w-[280px] overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10 sm:w-[280px]">
                    <div className="absolute left-5 top-4 z-10 flex h-10 w-10 items-center justify-center">
                      <div className="badge-gradient absolute inset-0 rounded-full opacity-95 transition-all duration-300 group-hover:scale-110" />
                      <span className="relative text-lg font-bold text-black">{step.num}</span>
                    </div>
                    <div className="relative z-10 p-6 pt-16">
                      <div className="mb-6 flex justify-center">
                        <div className="gradient-glow-bg relative overflow-hidden rounded-xl border border-[#363b4e]/40 bg-[#13151f]/50 p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-[#ffcc33]/60 group-hover:shadow-lg group-hover:shadow-[#ffcc33]/20">
                          <step.icon className="h-12 w-12 text-[#ffcc33]" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="gradient-glow-text mb-3 text-lg font-semibold transition-all duration-300 group-hover:scale-105 md:text-xl">
                          {step.title}
                        </h3>
                        <p className="text-sm text-white/50 md:text-base">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
                      <div className="badge-gradient flex h-10 w-10 items-center justify-center rounded-full border border-[#363b4e]/40 shadow-lg">
                        <ArrowRight className="h-4 w-4 text-black" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 5. AI Video Models Explorer ─── */}
      <section className="relative bg-gradient-to-b from-[#0f1117] via-[#161926] to-[#0f1117] px-4 py-12 md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-8 text-center md:mb-16">
            <h2 className="gradient-text mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
              探索我们的高级AI视频生成模型
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/70 md:max-w-4xl md:text-base">
              Banana Pro AI 提供一系列强大的 AI 视频生成模型，每个模型都针对独特的创作需求进行了优化。从文本生成视频到图像生成视频，探索完美工具。
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            <div className="md:col-span-1">
              <div className="space-y-3">
                {VIDEO_MODELS.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveModel(i)}
                    className={`group relative flex w-full items-center justify-between overflow-hidden rounded-lg border p-4 text-left transition-all duration-300 ${
                      activeModel === i
                        ? 'border-[#ffcc33]/60 bg-gradient-to-br from-[#1c2030] to-[#252a3d] text-white shadow-xl ring-2 ring-[#ffcc33]/20'
                        : 'border-[#363b4e]/40 bg-[#13151f]/50 text-white/60 hover:border-[#363b4e] hover:bg-[#1c2030]/50'
                    }`}
                  >
                    {activeModel === i && (
                      <div className="absolute left-0 top-1/2 h-16 w-1.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-[#ffcc33] via-[#ff9900] to-[#ffcc33] shadow-lg shadow-[#ffcc33]/50" />
                    )}
                    <div className="ml-4">
                      <p className={`text-base font-semibold leading-tight md:text-lg ${activeModel === i ? 'gradient-glow-text' : ''}`}>
                        {m.name}
                      </p>
                      <p className={`mt-1 text-xs md:text-sm ${activeModel === i ? 'text-white/70' : 'text-white/40'}`}>
                        {m.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-colors ${activeModel === i ? 'text-[#ffcc33]' : 'text-white/30'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 p-6 md:p-8">
                <h2 className="gradient-glow-text mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
                  {VIDEO_MODELS[activeModel].title}
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-white/75 md:text-base">
                  {VIDEO_MODELS[activeModel].desc}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {VIDEO_MODELS[activeModel].features.map((f, i) => (
                    <div
                      key={i}
                      className="group rounded-lg border border-[#363b4e]/40 bg-[#13151f]/50 p-4 transition-all duration-300 hover:border-[#ffcc33]/40 hover:bg-[#1c2030]/80 md:p-5"
                    >
                      <h3 className="relative z-10 mb-2 flex items-start text-base font-semibold transition-colors duration-300 group-hover:text-[#ffcc33] md:text-lg">
                        <div className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ffcc33] to-[#ff9900] transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        </div>
                        <span className="flex-1">{f.title}</span>
                      </h3>
                      <p className="relative z-10 ml-6 text-xs leading-relaxed text-white/60 md:text-sm">{f.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/zh/video/veo-3-video-generator/" className="highlight-button inline-flex items-center gap-2 px-6 py-3">
                    立即免费试用 <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Why Choose (Tabs) ─── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-8 text-center md:mb-16">
            <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
              不仅是视频创作——您的完整AI制作工作室
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              探索为何 Banana Pro AI 视频生成器是专业视频创作的首选。我们先进的文本生成视频和图片生成视频技术提供广播级质量。
            </p>
          </FadeIn>

          {/* Mobile tabs */}
          <div className="flex flex-col gap-2 md:hidden">
            {WHY_TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium border transition-all duration-300 ${
                  activeTab === i
                    ? 'border-[#363b4e]/30 bg-[#0f1117] text-white shadow-sm'
                    : 'border-transparent bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-2 h-4 w-1 rounded-full transition-all duration-300 ${activeTab === i ? 'bg-[#ffcc33]' : 'bg-transparent'}`} />
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
          {/* Desktop tabs */}
          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-4 mb-8">
            {WHY_TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
                  activeTab === i ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {tab.label}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffcc33] transition-all duration-300 ${activeTab === i ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          <FadeIn key={activeTab}>
            <div className="mt-6 rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 p-6 md:p-10">
              <h3 className="mb-2 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
                {WHY_TABS[activeTab].title}
              </h3>
              <p className="mb-4 text-sm text-white/70 md:text-base">
                {WHY_TABS[activeTab].desc}
              </p>
              <p className="text-sm text-white/50 md:text-base">{WHY_TABS[activeTab].sub}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 7. Features Detail (alternating rows) ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-20 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              专业内容AI视频生成完整套件
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Pro AI视频生成器提供全面的文本转视频和图片转视频功能。借助我们先进的AI视频生成器技术，轻松创作专业视频。
            </p>
          </FadeIn>

          <div className="space-y-36 md:space-y-56">
            {FEATURES_DETAIL.map((feat, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                  <FadeIn className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative flex items-center justify-center overflow-hidden rounded-3xl py-4 shadow-lg" style={{ minHeight: 300 }}>
                      <div className="group relative h-auto max-h-full w-auto max-w-full overflow-hidden rounded-lg">
                        <Image
                          src={feat.image}
                          alt={feat.title}
                          width={800}
                          height={500}
                          className="max-h-[550px] max-w-full rounded-lg object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </FadeIn>
                  <FadeIn className={`mt-10 lg:mt-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`} delay={0.15}>
                    <div className="lg:px-8">
                      <h3 className="gradient-glow-text mb-6 text-3xl md:text-4xl">{feat.title}</h3>
                      <p className="text-base text-white/90 md:text-lg">{feat.desc}</p>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 8. Industries ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="relative z-10 mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              无限应用：Banana Pro AI 视频生成器跨越各行业
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Pro AI 视频生成器为每种创意需求提供专业解决方案。从文本生成视频营销活动到图片生成视频展示，以广播级质量将您的概念变为现实。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {INDUSTRIES.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10">
                  <div className="badge-gradient absolute left-0 right-0 top-0 h-1 opacity-80" />
                  <div className="relative z-10 p-8">
                    <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#13151f]/50 p-3 transition-all duration-300 group-hover:border-[#ffcc33]/60 group-hover:shadow-lg group-hover:shadow-[#ffcc33]/20">
                      <item.icon className="h-8 w-8 text-[#ffcc33]" />
                    </div>
                    <h3 className="gradient-glow-text mb-3 text-lg font-semibold transition-all duration-300 group-hover:scale-[1.02] md:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 md:text-base">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Testimonials ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              创作者都喜爱 Banana Pro AI 视频生成器
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              数千名专业人士信赖 Banana Pro AI 来满足他们的视频创作需求。
            </p>
          </FadeIn>

          <div className="relative rounded-xl border border-[#363b4e] bg-[#0f1117] p-6 shadow-lg md:p-12">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute left-8 top-8 z-0 font-serif text-7xl text-[#ffcc33] opacity-30">&ldquo;</div>
            <div className="relative z-10 flex flex-col">
              <div className="relative min-h-[220px]">
                {TESTIMONIALS.map((t, i) => (
                  <blockquote
                    key={i}
                    className={`mb-8 text-lg font-medium transition-opacity duration-500 md:text-2xl lg:text-3xl ${
                      i === testimonialIdx ? 'relative z-10 opacity-100' : 'absolute inset-0 z-0 opacity-0'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-white/40">{t.quote}</p>
                  </blockquote>
                ))}
              </div>
              <div className="relative">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-4 transition-opacity duration-500 ${
                      i === testimonialIdx ? 'relative z-10 opacity-100' : 'absolute inset-0 z-0 opacity-0'
                    }`}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#ffcc33]/30 md:h-12 md:w-12">
                      <Image src={t.avatar} alt={t.name} width={48} height={48} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="text-base font-semibold md:text-lg">{t.name}</div>
                      <div className="text-xs text-white/50 md:text-sm">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="z-20 mt-8 flex items-center justify-center gap-4 md:mt-0">
                <button
                  onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 backdrop-blur-sm transition-all hover:border-[#ffcc33]/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === testimonialIdx ? 'w-6 bg-[#ffcc33]' : 'w-2 bg-[#363b4e] hover:bg-[#ffcc33]/30'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 backdrop-blur-sm transition-all hover:border-[#ffcc33]/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              AI视频生成器：常见问题解答
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              关于 Banana Pro AI 视频生成器的文本转视频和图片转视频功能，您需要了解的一切。
            </p>
          </FadeIn>
          <div className="mx-auto max-w-7xl">
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="mb-4 overflow-hidden rounded-xl border border-[#363b4e] bg-[#0f1117] shadow-sm transition-all hover:border-[#ffcc33]/30 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className={`flex w-full items-center justify-between p-6 text-left md:p-8 ${isOpen ? 'border-b border-[#363b4e]/50' : ''}`}
                  >
                    <h3 className={`text-lg font-semibold transition-colors duration-200 md:text-xl ${isOpen ? 'text-[#ffcc33]' : 'text-white'}`}>
                      {faq.q}
                    </h3>
                    <div className={`ml-4 flex-shrink-0 rounded-full p-1 transition-all duration-200 ${isOpen ? 'bg-[#ffcc33]/10' : 'bg-[#1c2030]'}`}>
                      <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ffcc33]' : 'text-white/50'}`} />
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="p-6 pt-4 text-sm text-white/60 md:p-8 md:pt-6 md:text-base">
                      {faq.a.split('\n\n').map((p, j) => (
                        <p key={j} className="mb-3 last:mb-0">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 11. CTA Section ─── */}
      <section className="relative px-4 py-20 md:py-28">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-20">
            <FadeIn className="mb-12 text-center lg:mb-0 lg:text-left">
              <div className="lg:pr-8">
                <h2 className="gradient-glow-text mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  立即使用AI视频生成器开始创作专业视频
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                  加入数千名创作者、设计师和企业，使用 Banana Pro AI 的免费文本转视频和图片转视频工具。免费注册，无需信用卡。60 秒内体验专业的 AI 视频创作。
                </p>
                <Link
                  href="/zh/video/veo-3-video-generator/"
                  className="highlight-button group inline-flex items-center px-8 py-3 text-lg"
                >
                  立即免费开始创作
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none" delay={0.15}>
              <div
                className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl"
                style={{
                  maskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)',
                }}
              >
                <Image src="https://static.banana2ai.net/images/cta-cover.webp" alt="开始创作" fill className="object-cover" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
