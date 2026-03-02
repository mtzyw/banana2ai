'use client';

import { useLocale } from 'next-intl';

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
  const isZh = useLocale() === 'zh';
  const HERO_FEATURES = [
    { icon: Zap, text: isZh ? '闪电般快速的AI视频生成技术' : 'Lightning-fast AI video generation technology' },
    { icon: Film, text: isZh ? '高级文字转视频创作' : 'Advanced text to video creation' },
    { icon: Video, text: isZh ? '图片到视频的无缝转换' : 'Seamless image to video conversion' },
    { icon: Share2, text: isZh ? '免费注册 - 立即开始创作' : 'Free registration - Start creating now' },
  ];

  const STEPS = [
    {
      num: 1, icon: MessageSquare,
      title: isZh ? '描述或上传您的内容' : 'Describe or upload your content',
      desc: isZh ? '与 Banana Pro AI 视频生成器分享您的愿景。输入文本进行文本生成视频创作，或上传图像进行图片生成视频转换。清晰的输入确保我们的 AI 视频生成器交付您所设想的内容。' : 'Share your vision with Banana Pro AI video generator. Enter text for text to video creation, or upload images for image to video conversion. Clear input ensures our AI video generator delivers what you envision.',
    },
    {
      num: 2, icon: SlidersHorizontal,
      title: isZh ? '自定义您的视频设置' : 'Customize your video settings',
      desc: isZh ? '自定义视频设置——选择分辨率、宽高比和风格。无论使用文本生成视频还是图片生成视频，我们的 AI 视频生成器都能满足您的需求。灵活控制优化任何平台。' : 'Customize video settings – choose resolution, aspect ratio, and style. Whether using text to video or image to video, our AI video generator meets your needs. Flexible control optimizes for any platform.',
    },
    {
      num: 3, icon: Sparkles,
      title: isZh ? '一键生成' : 'Generate with one click',
      desc: isZh ? '点击「生成」，让 Banana Pro AI 视频生成器创建您的视频。我们的文本生成视频和图片生成视频引擎在几秒钟内产出专业结果。自动保存到您的云端库以便即时访问。' : 'Click ’Generate’ and let Banana Pro AI video generator create your video. Our text to video and image to video engines produce professional results in seconds. Automatically saved to your cloud library for instant access.',
    },
    {
      num: 4, icon: Download,
      title: isZh ? '下载和分享' : 'Download and share',
      desc: isZh ? '您的视频已准备就绪！下载高质量 MP4——无水印且可直接广播。立即在任何平台使用您的文本生成视频或图片生成视频作品。专业结果，零妥协。' : 'Your video is ready! Download high-quality MP4 – no watermark and broadcast-ready. Use your text to video or image to video creations on any platform immediately. Professional results, zero compromise.',
    },
  ];

  const VIDEO_MODELS = [
    {
      name: 'Veo 3/3.1',
      subtitle: isZh ? 'Google 高级 AI 视频生成器' : 'Google Advanced AI Video Generator',
      title: isZh ? 'Veo 3/3.1:电影级品质的先进 AI 视频生成器' : 'Veo 3/3.1: Cinematic quality advanced AI video generator',
      desc: isZh ? '体验 Veo 3/3.1 前沿 AI 视频生成器技术。该模型由 Google 最新创新技术驱动，可将文本转视频和图像转视频，呈现电影级品质效果。非常适合追求广播级制作水准的专业创作者。' : 'Experience Veo 3/3.1 cutting-edge AI video generator technology. Powered by Google latest innovations, this model transforms text to video and images to video, delivering cinematic quality results. Ideal for professional creators seeking broadcast-level production.',
      features: [
        { title: isZh ? '电影级画质输出' : 'Cinematic quality output', desc: isZh ? '使用这款AI视频生成器创建令人惊艳的4K视频，专业级品质，完美适用于文本生成视频和图片生成视频项目。' : 'Create stunning 4K videos with this AI video generator, professional quality, perfect for text to video and image to video projects.' },
        { title: isZh ? '高级文字转视频' : 'Advanced text to video', desc: isZh ? '将详细脚本转化为引人入胜的视频叙事，具备出色的场景理解和视觉叙事能力。' : 'Transform detailed scripts into engaging video narratives, with excellent scene understanding and visual storytelling capabilities.' },
        { title: isZh ? '卓越的图片转视频' : 'Exceptional image to video', desc: isZh ? '使用先进的 AI 技术，为静态图像添加流畅逼真的动态效果和动感镜头运动。' : 'Add smooth, realistic motion effects and dynamic camera movements to static images using advanced AI technology.' },
        { title: isZh ? '延长时长支持' : 'Extended duration support', desc: isZh ? '创建时长达 2 分钟的长视频，实现全面的故事叙述和专业内容制作。' : 'Create long videos up to 2 minutes in duration, enabling comprehensive storytelling and professional content production.' },
      ],
    },
    {
      name: 'Sora 2',
      subtitle: isZh ? 'OpenAI 革命性 AI 视频生成器' : 'OpenAI Revolutionary AI Video Generator',
      title: isZh ? 'Sora 2：OpenAI 推出的照片级真实感 AI 视频生成器' : 'Sora 2: Photorealistic AI Video Generator by OpenAI',
      desc: isZh ? '利用 OpenAI Sora 2 的强大功能，这是一款突破性的 AI 视频生成器，可以根据文本提示和图像输入创建逼真的视频。体验这项革命性 AI 视频生成技术带来的前所未有的真实感和创意控制力。' : 'Harness the power of OpenAI Sora 2, a groundbreaking AI video generator that creates realistic videos from text prompts and image inputs. Experience unprecedented realism and creative control with this revolutionary AI video generation technology.',
      features: [
        { title: isZh ? '照片级真实感生成' : 'Photorealistic generation', desc: isZh ? '使用这款AI视频生成器的先进文本转视频和图片转视频功能，创作逼真生动的视频。' : 'Create lifelike and vivid videos using this AI video generator advanced text to video and image to video capabilities.' },
        { title: isZh ? '复杂场景理解' : 'Complex scene understanding', desc: isZh ? '生成包含多个角色、复杂交互和精密空间推理的视频。' : 'Generate videos featuring multiple characters, complex interactions, and intricate spatial reasoning.' },
        { title: isZh ? '动态镜头运动' : 'Dynamic Camera Movement', desc: isZh ? '自动实现专业级电影摄影效果，包括流畅的平移、倾斜和跟踪镜头。' : 'Automatically achieve professional-grade cinematic effects, including smooth pans, tilts, and tracking shots.' },
        { title: isZh ? '多风格支持' : 'Multi-style Support', desc: isZh ? '从逼真的画面到艺术风格，这款AI视频生成器能够适应您的创意愿景。' : 'From realistic visuals to artistic styles, this AI video generator can adapt to your creative vision.' },
      ],
    },
    {
      name: 'Wan 2.5',
      subtitle: isZh ? '速度优化 AI 视频生成器' : 'Speed Optimized AI Video Generator',
      title: isZh ? 'Wan 2.5:高产量制作的快速 AI 视频生成器' : 'Wan 2.5: Fast AI Video Generator for High-Volume Production',
      desc: isZh ? '当速度至关重要时，Wan 2.5 能够满足您的需求。这款 AI 视频生成器专为快速文本转视频和图片转视频创作而设计，能在极短时间内生成专业级成果。' : 'When speed is crucial, Wan 2.5 can meet your needs. This AI video generator is specifically designed for fast text-to-video and image-to-video creation, generating professional-grade results in a very short time.',
      features: [
        { title: isZh ? '快速生成速度' : 'Fast Generation Speed', desc: isZh ? '使用这款超快速 AI 视频生成器，在 30-60 秒内生成高质量视频，支持文本生成视频和图片生成视频。' : 'Use this ultra-fast AI video generator to create high-quality videos in 30-60 seconds, supporting text-to-video and image-to-video generation.' },
        { title: isZh ? '高效批量处理' : 'Efficient Batch Processing', desc: isZh ? '同时处理多个文本生成视频或图片生成视频请求，实现最高生产效率。' : 'Process multiple text-to-video or image-to-video requests simultaneously to achieve maximum production efficiency.' },
        { title: isZh ? '稳定品质' : 'Consistent Quality', desc: isZh ? '尽管AI视频生成器速度惊人，仍可在所有输出中保持专业标准。' : 'Despite the astonishing speed of the AI video generator, it still maintains professional standards across all outputs.' },
        { title: isZh ? '高性价比创作' : 'Cost-Effective Creation', desc: isZh ? '以最低的积分消耗获得专业级视频输出，适合预算敏感的创作者。' : 'Obtain professional-grade video output with the lowest credit consumption, suitable for budget-sensitive creators.' },
      ],
    },
    {
      name: 'Kling',
      subtitle: isZh ? '满足各种需求的灵活AI视频生成器' : 'Flexible AI Video Generator for Various Needs',
      title: isZh ? 'Kling：功能全面的AI视频生成器，具备高级控制功能' : 'Kling: A Comprehensive AI Video Generator with Advanced Control Features',
      desc: isZh ? 'Kling 提供全面的AI视频生成能力，具备精细的控制选项，适合需要灵活性和多样性的创作者。' : 'Kling offers comprehensive AI video generation capabilities with fine-grained control options, suitable for creators who need flexibility and versatility.',
      features: [
        { title: isZh ? '多种分辨率选项' : 'Multiple Resolution Options', desc: isZh ? '支持从标清到高清的多种输出分辨率，满足不同平台和用途的需求。' : 'Supports multiple output resolutions from standard definition to high definition, meeting the needs of different platforms and uses.' },
        { title: isZh ? '多样化风格控制' : 'Diverse Style Control', desc: isZh ? '提供丰富的风格预设和自定义选项，实现独特的视觉表现。' : 'Provides rich style presets and customization options to achieve unique visual expression.' },
        { title: isZh ? '智能场景构图' : 'Smart Scene Composition', desc: isZh ? '自动优化场景构图和元素布局，确保视觉平衡和专业美感。' : 'Automatically optimizes scene composition and element layout, ensuring visual balance and professional aesthetics.' },
        { title: isZh ? '优化工作流程' : 'Optimized Workflow', desc: isZh ? '简化的操作流程让从概念到成品的转换更加高效顺畅。' : 'Simplified operational processes make the transition from concept to finished product more efficient and smooth.' },
      ],
    },
    {
      name: 'Grok Imagine',
      subtitle: isZh ? '富有艺术气息的创意AI视频生成器' : 'Artistic and Creative AI Video Generator',
      title: isZh ? 'Grok Imagine：打造独特视觉效果的艺术AI视频生成器' : 'Grok Imagine: Artistic AI Video Generator for Unique Visual Effects',
      desc: isZh ? 'Grok Imagine 专注于艺术表现力，为追求独特视觉风格的创作者提供创意工具。' : 'Grok Imagine focuses on artistic expressiveness, providing creative tools for creators seeking unique visual styles.',
      features: [
        { title: isZh ? '艺术风格迁移' : 'Artistic Style Transfer', desc: isZh ? '将经典艺术风格应用到视频创作中，创造独特的视觉美学效果。' : 'Apply classic art styles to video creation, creating unique visual aesthetic effects.' },
        { title: isZh ? '创意诠释' : 'Creative Interpretation', desc: isZh ? '超越字面描述，对提示词进行创意诠释，生成出人意料的精彩内容。' : 'Go beyond literal descriptions, creatively interpret prompts, and generate unexpected and brilliant content.' },
        { title: isZh ? '独特视觉美学' : 'Unique Visual Aesthetics', desc: isZh ? '独特的视觉处理风格，让您的视频在众多内容中脱颖而出。' : 'Unique visual processing styles make your videos stand out among a multitude of content.' },
        { title: isZh ? '实验性功能' : 'Experimental Features', desc: isZh ? '探索前沿的AI视频生成技术，尝试创新的视觉表现方式。' : 'Explore cutting-edge AI video generation technology and experiment with innovative visual expression methods.' },
      ],
    },
  ];

  const WHY_TABS = [
    {
      label: isZh ? '一键生成' : 'Generate with one click',
      title: isZh ? '专业视频创作，一键即达' : 'Professional Video Creation, One Click Away',
      desc: isZh ? '体验 Banana Pro AI 视频生成器的轻松视频创作。只需描述您的愿景进行文本生成视频，或上传图像进行图片生成视频转换。我们直观的 AI 视频生成器处理一切——从场景构图到最终渲染。' : 'Experience effortless video creation with the Banana Pro AI video generator. Simply describe your vision for text to video generation, or upload images for image to video conversion. Our intuitive AI video generator handles everything from scene composition to final rendering.',
      sub: isZh ? 'Banana Pro 简化您的整个工作流程，即时交付专业结果。' : 'Banana Pro simplifies your entire workflow, delivering professional results instantly.',
    },
    {
      label: isZh ? '即时视频创作' : 'Instant Video Creation',
      title: isZh ? '即刻将创意转化为专业视频' : 'Instantly transform ideas into professional videos',
      desc: isZh ? '释放您的创意潜能，使用 Banana Pro AI 视频生成器。通过文本生成视频将脚本转化为引人入胜的视频，或使用图片生成视频让图像动起来。我们的 AI 视频生成器在几秒钟内为您的概念注入生命。' : 'Unleash your creative potential with the Banana Pro AI video generator. Transform scripts into engaging videos with text to video, or bring images to life with image to video. Our AI video generator breathes life into your concepts in seconds.',
      sub: isZh ? 'Banana Pro 专为速度和精准而设计——您值得信赖的视频项目合作伙伴。' : 'Banana Pro is designed for speed and precision – your trusted partner for video projects.',
    },
    {
      label: isZh ? '一体化平台' : 'All-in-One Platform',
      title: isZh ? '完整的 AI 视频生成器套件满足各种需求' : 'A complete AI video generator suite for every need',
      desc: isZh ? '使用 Banana Pro AI 视频生成器创建的每个视频都会自动保存到您的安全云端库。随时访问您所有的文本生成视频和图片生成视频作品。无水印下载，重复使用素材，保持井然有序的工作流程。' : 'Every video created with the Banana Pro AI video generator is automatically saved to your secure cloud library. Access all your text to video and image to video creations anytime. Download without watermarks, reuse assets, and maintain an organized workflow.',
      sub: isZh ? 'Banana Pro AI 是您全面的视频制作平台。' : 'Banana Pro AI is your comprehensive video production platform.',
    },
    {
      label: isZh ? '面向所有创作者' : 'For All Creators',
      title: isZh ? 'AI 视频生成器为每一位创作者赋能' : 'AI video generator empowers every creator',
      desc: isZh ? 'Banana Pro AI 视频生成器让专业视频创作变得大众化。我们友好的用户界面让复杂的文本生成视频和图片生成视频制作人人可及——无需任何技术专长。' : 'The Banana Pro AI video generator democratizes professional video creation. Our user-friendly interface makes complex text to video and image to video production accessible to everyone – no technical expertise required.',
      sub: isZh ? '从快速社交短片到电影叙事，Banana Pro AI 视频生成器助力您的愿景。' : 'From quick social shorts to cinematic narratives, the Banana Pro AI video generator powers your vision.',
    },
  ];

  const FEATURES_DETAIL = [
    {
      title: isZh ? '专业文本转视频和图片转视频生成' : 'Professional Text to Video and Image to Video Generation',
      desc: isZh ? '使用 Banana Pro 的 AI 视频生成器转换任何创意概念。输入脚本即可实现文本到视频的创作，或上传图片进行图片到视频的转换。我们先进的 AI 视频生成器提供专业级效果——广播级质量、零水印、即时生成。' : 'Transform any creative concept using Banana Pro AI video generator. Input scripts for text to video creation, or upload images for image to video conversion. Our advanced AI video generator delivers professional-grade results – broadcast quality, zero watermarks, instant generation.',
      image: 'https://static.banana2ai.net/images/features/video-media04.webp',
    },
    {
      title: isZh ? '可自定义的AI视频生成器控制选项' : 'Customizable AI Video Generator Control Options',
      desc: isZh ? '精细调整视频创作的每个细节。我们的AI视频生成器为文本转视频和图片转视频提供广泛的自定义选项——风格、分辨率、宽高比。通过Banana Pro灵活的控制功能，完美匹配您的品牌形象。' : 'Fine-tune every detail of your video creation. Our AI video generator offers extensive customization options for text to video and image to video – style, resolution, aspect ratio. Perfectly match your brand identity with Banana Pro flexible control features.',
      image: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
    },
    {
      title: isZh ? '多种AI视频生成模型' : 'Multiple AI Video Generation Models',
      desc: isZh ? '使用5个强大的AI视频生成模型。从Veo 3/3.1的电影级画质到Sora 2的照片级真实感，为您的项目选择完美的文本生成视频或图像生成视频引擎。每个模型都针对特定创作需求进行了优化。' : 'Utilize 5 powerful AI video generation models. From the cinematic quality of Veo 3/3.1 to the photorealistic fidelity of Sora 2, choose the perfect text to video or image to video engine for your project. Each model is optimized for specific creative needs.',
      image: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
    },
    {
      title: isZh ? '云存储与资产管理' : 'Cloud Storage and Asset Management',
      desc: isZh ? '我们的AI视频生成器生成的每个视频都会自动保存到您的安全云端库中。随时访问所有文本转视频和图片转视频的创作内容。无水印下载、重复使用素材，并保持工作流程井然有序。' : 'Every video generated by our AI video generator is automatically saved to your secure cloud library. Access all your text to video and image to video creations anytime. Download without watermarks, reuse assets, and maintain an organized workflow.',
      image: 'https://static.banana2ai.net/images/features/ldvemdrtofq8.webp',
    },
  ];

  const INDUSTRIES = [
    {
      icon: Megaphone,
      title: isZh ? '营销与广告视频' : 'Marketing and Advertising Videos',
      desc: isZh ? '使用 Banana Pro AI 视频生成器制作高转化视频广告。使用文本生成视频转换广告脚本，或使用图片生成视频展示产品。我们的 AI 视频生成器大规模生产引人注目的营销素材。' : 'Create high-converting video ads with the Banana Pro AI video generator. Use text to video to transform ad scripts, or use image to video to showcase products. Our AI video generator produces compelling marketing materials at scale.',
    },
    {
      icon: Instagram,
      title: isZh ? '社交媒体内容' : 'Social Media Content',
      desc: isZh ? '使用 Banana Pro AI 视频生成器制作病毒式传播的社交内容。使用文本生成视频将文本更新转换为引人入胜的视频，或使用图片生成视频将图像转化为动态帖子。针对每个平台优化内容。' : 'Create viral social content with the Banana Pro AI video generator. Use text to video to convert text updates into engaging videos, or use image to video to transform images into dynamic posts. Optimize content for each platform.',
    },
    {
      icon: GraduationCap,
      title: isZh ? '教育与培训材料' : 'Education and Training Materials',
      desc: isZh ? '使用 Banana Pro AI 视频生成器制作有影响力的教学视频。使用文本生成视频转换课程计划，或使用图片生成视频让教育图表动起来。让复杂概念对所有级别的学习者都易于理解。' : 'Create impactful educational videos with the Banana Pro AI video generator. Use text to video to transform lesson plans, or use image to video to bring educational charts to life. Make complex concepts easy to understand for learners of all levels.',
    },
    {
      icon: Building2,
      title: isZh ? '企业演示与沟通' : 'Business Presentations and Communication',
      desc: isZh ? '使用 Banana Pro AI 视频生成器提升商业沟通。使用文本生成视频或图片生成视频将报告和数据转化为引人注目的演示。为内部沟通、投资者演示和客户提案增添专业光彩。' : 'Elevate business communication with the Banana Pro AI video generator. Use text to video or image to video to transform reports and data into compelling presentations. Add a professional polish to internal communications, investor pitches, and client proposals.',
    },
    {
      icon: Clapperboard,
      title: isZh ? '影视与创意视频制作' : 'Film and Creative Video Production',
      desc: isZh ? '使用 Banana Pro AI 视频生成器将电影愿景变为现实。使用文本生成视频可视化整个脚本，使用图片生成视频创建分镜序列。是独立电影制作人和创意工作室突破界限的必备工具。' : 'Bring cinematic visions to life with the Banana Pro AI video generator. Use text to video to visualize entire scripts, and use image to video to create storyboard sequences. It is an essential tool for independent filmmakers and creative studios pushing boundaries.',
    },
    {
      icon: BookOpen,
      title: isZh ? '个人项目与创意叙事' : 'Personal Projects and Creative Storytelling',
      desc: isZh ? '使用 Banana Pro AI 视频生成器将个人故事转化为视觉杰作。使用文本生成视频转换诗歌和叙事，或使用图片生成视频创建照片蒙太奇。赋能您的创意表达，将想象变为现实。' : 'Transform personal stories into visual masterpieces with the Banana Pro AI video generator. Use text to video to convert poetry and narratives, or use image to video to create photo montages. Empower your creative expression and bring imagination to reality.',
    },
  ];

  const TESTIMONIALS = [
    {
      quote: isZh ? 'Banana Pro的AI视频生成器真是改变游戏规则的利器！文本转视频功能可以快速将脚本转换为高质量视频，图片转视频则能轻松将照片转换为动态广告。我的每周视频产出增加了40%，互动率也提升了。' : 'The Banana Pro AI video generator is truly a game-changer! The text to video feature quickly converts scripts into high-quality videos, and image to video easily transforms photos into dynamic ads. My weekly video output has increased by 40%, and engagement rates have also improved.',
      name: 'Maria Rodriguez',
      role: isZh ? '社交媒体策略师' : 'Social Media Strategist',
      avatar: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp',
    },
    {
      quote: isZh ? 'Banana Pro AI视频生成器效果惊艳！图片转视频功能可以制作动态产品展示，文字转视频能快速将广告文案转化为视觉内容。这款AI视频生成器为我节省了外包费用，帮助我更快地推出广告。' : 'The Banana Pro AI video generator is amazing! The image to video feature creates dynamic product showcases, and text to video quickly converts ad copy into visual content. This AI video generator saves me outsourcing costs and helps me launch ads faster.',
      name: 'David Chen',
      role: isZh ? '小企业主' : 'Small Business Owner',
      avatar: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
    },
    {
      quote: isZh ? 'Banana Pro AI视频生成器彻底改变了我的课程制作方式！文本转视频让教学计划变得生动活泼，图片转视频将静态图表转化为引人入胜的视觉内容。制作时间缩短了50%，学生参与度显著提升。' : 'The Banana Pro AI video generator has completely transformed my course creation process! Text to video brings lesson plans to life, and image to video turns static charts into engaging visual content. Production time has been cut by 50%, and student engagement has significantly increased.',
      name: 'Sophia Miller',
      role: isZh ? '在线教育工作者' : 'Online Educator',
      avatar: 'https://static.banana2ai.net/images/avatars/l8af5arb7l0d.webp',
    },
    {
      quote: isZh ? 'Banana Pro AI视频生成器彻底改变了我的影视制作流程！我可以通过文本生成视频功能即时将脚本可视化，并通过图片生成视频功能轻松创建故事板动画。高效性大幅加快了前期制作速度。' : 'The Banana Pro AI video generator has completely revolutionized my film production workflow! I can instantly visualize scripts with the text to video feature and easily create animated storyboards with the image to video feature. The efficiency has greatly accelerated pre-production.',
      name: 'James Williams',
      role: isZh ? '独立电影制作人' : 'Independent Filmmaker',
      avatar: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
    },
  ];

  const FAQ_ITEMS = [
    {
      q: isZh ? '什么是 Banana Pro AI 视频生成器?' : 'What is the Banana Pro AI Video Generator?',
      a: isZh ? 'Banana Pro AI视频生成器是一个先进的AI驱动平台，可将文本描述（文本转视频）或静态图片（图片转视频）转换为专业品质的视频。采用Veo 3/3.1、Sora 2、Wan 2.5、Kling和Grok Imagine等前沿模型，呈现广播级效果。免费开始使用，无水印，保证专业品质。' : 'The Banana Pro AI video generator is an advanced AI-powered platform that converts text descriptions (text to video) or static images (image to video) into professional-quality videos. Utilizing cutting-edge models like Veo 3/3.1, Sora 2, Wan 2.5, Kling, and Grok Imagine, it delivers broadcast-quality results. Start for free, with no watermarks, guaranteeing professional quality.',
    },
    {
      q: isZh ? '我可以用这个AI视频生成器创建什么样的视频?' : 'What types of videos can I create with this AI video generator?',
      a: isZh ? 'Banana Pro AI视频生成器功能强大且用途广泛！可以创建营销广告视频、社交媒体短视频、教育培训视频、产品展示视频、企业宣传片、个人创意视频等各种类型的视频内容。' : 'The Banana Pro AI video generator is powerful and versatile! You can create various types of video content, including marketing ad videos, social media short videos, educational training videos, product showcase videos, corporate promotional videos, and personal creative videos.',
    },
    {
      q: isZh ? '使用这个AI视频生成器需要视频编辑经验吗?' : 'Do I need video editing experience to use this AI video generator?',
      a: isZh ? '完全不需要！Banana Pro AI视频生成器专为所有人设计。我们的文本转视频和图片转视频功能完全直观易用——无需任何剪辑经验。AI视频生成器会自动处理所有技术细节。只需输入您的内容，自定义设置，即可生成专业视频。' : 'Absolutely not! The Banana Pro AI video generator is designed for everyone. Our text to video and image to video features are completely intuitive and easy to use—no editing experience is required. The AI video generator automatically handles all technical details. Simply input your content, customize settings, and generate professional videos.',
    },
    {
      q: isZh ? 'Banana Pro AI视频生成器如何帮助我的业务?' : 'How can the Banana Pro AI video generator help my business?',
      a: isZh ? 'Banana Pro AI视频生成器改变您的内容策略：大幅降低视频制作成本、提高内容产出速度、无需专业团队即可创建专业视频、快速迭代和测试不同创意方向、跨平台优化内容格式。' : 'The Banana Pro AI video generator transforms your content strategy by: significantly reducing video production costs, increasing content output speed, enabling professional video creation without a specialized team, allowing rapid iteration and testing of different creative directions, and optimizing content formats across platforms.',
    },
    {
      q: isZh ? 'Banana Pro AI视频生成器可以免费使用吗?' : 'Can I use the Banana Pro AI video generator for free?',
      a: isZh ? '当然可以！Banana Pro 提供免费的 AI 视频生成器，每日赠送积分额度。您可以免费创建文字转视频和图片转视频内容。免费账户包含所有AI模型访问、无水印下载、云存储等完整功能。' : 'Absolutely! Banana Pro offers a free AI video generator with daily complimentary credit allowances. You can create text to video and image to video content for free. The free account includes full features such as access to all AI models, watermark-free downloads, and cloud storage.',
    },
    {
      q: isZh ? '我可以将AI视频生成器的内容用于商业用途吗?' : 'Can I use the content from the AI video generator for commercial purposes?',
      a: isZh ? '当然可以！使用 Banana Pro AI 视频生成器创建的所有视频均包含完整的商业使用权。您可以将内容用于营销广告、社交媒体、企业沟通、客户项目等任何商业用途。所有视频无水印，完全所有权归您。' : 'Absolutely! All videos created with the Banana Pro AI video generator include full commercial use rights. You can use the content for marketing advertisements, social media, corporate communications, client projects, and any other commercial purpose. All videos are watermark-free, and full ownership belongs to you.',
    },
    {
      q: isZh ? 'AI视频生成器的速度有多快?' : 'How fast is the AI video generator?',
      a: isZh ? 'Banana Pro AI 视频生成器经过速度优化：Wan 2.5 模型 30-60 秒生成、Veo 3/3.1 模型 1-3 分钟、Sora 2 模型 1-2 分钟。速度取决于视频长度和复杂度。免费账户享有与付费用户相同的处理速度。' : 'The Banana Pro AI video generator is optimized for speed: Wan 2.5 model generates in 30-60 seconds, Veo 3/3.1 model in 1-3 minutes, and Sora 2 model in 1-2 minutes. Speed depends on video length and complexity. Free accounts enjoy the same processing speed as paid users.',
    },
    {
      q: isZh ? 'AI视频生成器支持哪些格式？' : 'What formats does the AI video generator support?',
      a: isZh ? 'Banana Pro AI视频生成器将所有内容导出为高质量MP4文件——这是与所有平台和设备兼容的行业标准格式。视频已针对社交媒体发布、网站嵌入、演示播放等场景进行优化。' : 'The Banana Pro AI video generator exports all content as high-quality MP4 files—an industry-standard format compatible with all platforms and devices. Videos are optimized for social media posting, website embedding, presentation playback, and other scenarios.',
    },
    {
      q: isZh ? '如果我对 AI 视频生成器的结果不满意怎么办?' : 'What if I am not satisfied with the results from the AI video generator?',
      a: isZh ? 'Banana Pro AI视频生成器让优化变得简单：可以调整提示词重新生成、切换不同AI模型尝试、修改视频参数（分辨率、宽高比等）。快速迭代让您在几分钟内找到满意的结果。' : 'The Banana Pro AI video generator makes optimization simple: you can adjust prompts and regenerate, switch to different AI models, or modify video parameters (resolution, aspect ratio, etc.). Rapid iteration allows you to find satisfactory results in minutes.',
    },
    {
      q: isZh ? '我应该选择哪个AI视频生成模型?' : 'Which AI video generation model should I choose?',
      a: isZh ? '每个 AI 视频生成模型各有所长：Veo 3/3.1 适合电影级品质、Sora 2 适合照片级真实感、Wan 2.5 适合快速批量生成、Kling 适合灵活控制、Grok Imagine 适合艺术创意。可以免费尝试所有模型，找到最适合您需求的那一个。' : 'Each AI video generation model has its strengths: Veo 3/3.1 is suitable for cinematic quality, Sora 2 for photorealistic realism, Wan 2.5 for fast batch generation, Kling for flexible control, and Grok Imagine for artistic creativity. You can try all models for free to find the one that best suits your needs.',
    },
  ];

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
                { name: isZh ? 'Veo 3 视频生成器' : 'Veo 3 Video Generator', href: '/zh/video/veo-3-video-generator/', img: 'https://static.banana2ai.net/images/showcase/veo-thumb.webp' },
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
