'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';
import Image from 'next/image';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Steps ─── */

/* ─── Features (tabs) ─── */

/* ─── Use Cases (2-col icon grid) ─── */

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
    name: 'Emily Carter',
    role: 'Content Creator',
    avatar: 'https://static.banana2ai.net/images/avatars/bzj3qje3ijz7.webp',
    quote: 'I have tried all AI tools on the market, but Veo 3 stands out. Google Veo 3 audio sync feature is simply flawless, saving me hours of editing time and allowing me to create more content without sacrificing quality.',
  },
  {
    name: 'David Chen',
    role: 'Digital Marketer',
    avatar: 'https://static.banana2ai.net/images/avatars/sv7s90civ0n2.webp',
    quote: 'Google Veo 3 has completely transformed our entire marketing workflow. We can now use Veo 3 to produce studio-quality advertisements in minutes, significantly reducing production costs and giving us the flexibility to quickly experiment with different creative concepts.',
  },
  {
    name: 'Michael Ross',
    role: 'VFX Artist',
    avatar: 'https://static.banana2ai.net/images/avatars/f2gxbdnt7si8.webp',
    quote: 'The physics engine in Veo 3 is eye-opening. Google Veo 3 truly understands how objects move in the real world, making the generated videos look incredibly realistic, surpassing any other generative video tool I have used for visual effects.',
  },
  {
    name: 'Lucyka Lee',
    role: 'Lead Animator',
    avatar: 'https://static.banana2ai.net/images/avatars/spbaurgotgng.webp',
    quote: 'The image-to-video feature is a game-changer for my animation work. I simply upload static character designs to Veo 3, and it brings them to life with perfectly natural movements, saving me weeks of manual keyframing effort.',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Independent Producer',
    avatar: 'https://static.banana2ai.net/images/avatars/wur60e4yhiaf.webp',
    quote: 'I used to be skeptical about AI video, but Veo 3 proved me wrong. Uploading our product photos and watching them transform into cinematic commercials is simply magical. Google Veo 3 perfectly preserves the image fidelity while adding dynamic, realistic motion.',
  },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const STEPS = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
      step: '01',
      title: isZh ? '输入您的构想' : 'Enter your idea',
      desc: isZh ? '输入详细的文本提示或上传参考图像，在 Veo 3 仪表板中描述您的场景、角色和运镜，即可立即开始您的创作之旅，毫无技术门槛。' : 'Enter detailed text prompts or upload reference images, describe your scenes, characters, and camera movements in the Veo 3 dashboard, and immediately begin your creative journey with no technical barriers.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
      step: '02',
      title: isZh ? '自定义设置' : 'Custom Settings',
      desc: isZh ? '调整宽高比和风格参数，以匹配您特定的创意需求，并确保您所有项目拥有完美的视觉一致性，每一帧都符合您的创作愿景。' : 'Adjust aspect ratios and style parameters to match your specific creative needs, ensuring perfect visual consistency across all your projects, with every frame aligning with your creative vision.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-share.webp',
      step: '03',
      title: isZh ? '生成并下载' : 'Generate and Download',
      desc: isZh ? '点击生成，观看 Veo 3 渲染出带有同步音频的高清视频，随时可以下载并在任何社交平台上与您的观众分享，一键完成整个创作流程。' : 'Click generate to watch Veo 3 render high-definition videos with synchronized audio, ready for download and sharing with your audience on any social platform, completing the entire creation process with one click.',
    },
  ];

  const FEATURES = [
    {
      label: isZh ? '音视频同步' : 'Audio and Video Synchronization',
      title: isZh ? '革命性的音视频同步技术' : 'Revolutionary Audio and Video Synchronization Technology',
      highlight: isZh ? '精确同步，超越旧模型极限' : 'Precise Synchronization, Beyond Old Model Limits',
      desc: isZh ? 'Veo 3 通过提供旧模型无法实现的精确音视频同步，为内容注入生命力。Google Veo 3 在生成视觉流的同时，创造复杂的声音景观，包括对话和环境噪音。确保视频中的每一个唇部动作和环境声音都完美契合，将叙事提升至专业电影标准，实现真正的沉浸式体验。' : 'Veo 3 injects life into content by providing precise audio and video synchronization that old models cannot achieve. Google Veo 3 creates complex soundscapes, including dialogue and environmental noise, while generating visual streams. It ensures every lip movement and environmental sound in the video perfectly aligns, elevating storytelling to professional cinematic standards for a truly immersive experience.',
    },
    {
      label: isZh ? '电影级画质' : 'Cinematic Quality',
      title: isZh ? '电影级视觉质量与艺术一致性' : 'Cinematic Visual Quality and Artistic Consistency',
      highlight: isZh ? '专业胶片质感，1080p 高清输出' : 'Professional Film Texture, 1080p HD Output',
      desc: isZh ? 'Veo 3 能够渲染出具有专业胶片相机细腻质感的 1080p 高清视频，实现令人惊叹的效果。Google Veo 3 掌握了光影的复杂相互作用，捕捉水面和皮肤上的逼真反射。确保生成的每一帧都保持连贯的、类似电影的美学风格，非常适合纪录片和高端广告制作。' : 'Veo 3 can render stunning 1080p HD videos with the delicate texture of professional film cameras. Google Veo 3 masters the complex interplay of light and shadow, capturing realistic reflections on water surfaces and skin. It ensures every generated frame maintains a coherent, cinematic aesthetic, perfect for documentaries and high-end advertising productions.',
    },
    {
      label: isZh ? '物理真实感' : 'Physical Realism',
      title: isZh ? '基于物理的真实感模拟' : 'Physics-Based Realism Simulation',
      highlight: isZh ? '精准物理引擎，消除恐怖谷效应' : 'Precise Physics Engine, Eliminating the Uncanny Valley Effect',
      desc: isZh ? 'Veo 3 超越了像素预测，使用先进的引擎精确模拟现实世界的流体动力学和重力。Google Veo 3 模型确保角色和物体的移动具有真实的重量感，有效消除了恐怖谷效应。无论是织物中的风还是复杂的动作，Veo 3 保证所有的阴影和物理互动都严格遵守科学定律。' : 'Veo 3 goes beyond pixel prediction, using advanced engines to precisely simulate real-world fluid dynamics and gravity. The Google Veo 3 model ensures characters and objects move with a realistic sense of weight, effectively eliminating the uncanny valley effect. Whether it is wind in fabric or complex movements, Veo 3 guarantees all shadows and physical interactions strictly adhere to scientific laws.',
    },
    {
      label: isZh ? '企业级能力' : 'Enterprise-Grade Capabilities',
      title: isZh ? '企业级能力与安全保障' : 'Enterprise-Grade Capabilities and Security Assurance',
      highlight: isZh ? '可扩展集成，负责任的内容生成' : 'Scalable Integration, Responsible Content Generation',
      desc: isZh ? 'Veo 3 专为可扩展性设计，与 Vertex AI 无缝集成，非常适合企业培训和大规模广告制作。Google Veo 3 结合了先进的安全过滤器和 SynthID 水印技术，以确保合规且负责任的内容生成，满足企业在安全性和可追溯性方面的严格要求。' : 'Veo 3 is designed for scalability, seamlessly integrating with Vertex AI, making it ideal for corporate training and large-scale advertising productions. Google Veo 3 combines advanced safety filters and SynthID watermarking technology to ensure compliant and responsible content generation, meeting strict enterprise requirements for security and traceability.',
    },
  ];

  const USE_CASES = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-describe.webp',
      title: isZh ? '数字营销广告' : 'Digital Marketing Ads',
      desc: isZh ? '使用 Veo 3 瞬间制作病毒式社交媒体广告。营销人员使用 Google Veo 3 生成高转化率的视频内容，无需昂贵的制作团队即可抓住眼球并推动销售，显著最大化广告活动的投资回报率。' : 'Instantly create viral social media ads with Veo 3. Marketers use Google Veo 3 to generate high-converting video content that captures attention and drives sales without expensive production teams, significantly maximizing the return on investment for advertising campaigns.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      title: isZh ? '电影预演' : 'Film Previsualization',
      desc: isZh ? '电影制作人利用 Veo 3 进行快速故事板制作和预演。Veo 3 帮助在拍摄前可视化复杂的场景和摄像机角度，节省片场的时间和预算，确保整个制作团队与导演的艺术愿景保持一致。' : 'Filmmakers use Veo 3 for rapid storyboarding and previsualization. Veo 3 helps visualize complex scenes and camera angles before shooting, saving time and budget on set, and ensuring the entire production team aligns with the director’s artistic vision.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-enhance.webp',
      title: isZh ? '教育内容' : 'Educational Content',
      desc: isZh ? '教育工作者用 Veo 3 变革课程。使用 Google Veo 3 生成历史重演或科学模拟，使复杂的学科变得引人入胜且易于学生理解，培养对学习材料的更深层联系并提高记忆率。' : 'Educators transform curricula with Veo 3. Use Google Veo 3 to generate historical reenactments or scientific simulations, making complex subjects engaging and easy for students to understand, fostering a deeper connection to learning materials and improving retention rates.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-video.webp',
      title: isZh ? '电商展示' : 'E-commerce Displays',
      desc: isZh ? '使用 Veo 3 动态展示产品。卖家使用 Veo 3 生成逼真的产品视频，在真实环境中演示功能以增强买家信心和在线转化率，创造一种触手可及、互动性强的购物体验。' : 'Dynamically showcase products with Veo 3. Sellers use Veo 3 to generate realistic product videos, demonstrating features in real-world environments to boost buyer confidence and online conversion rates, creating a tangible and interactive shopping experience.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
      title: isZh ? '社交媒体增长' : 'Social Media Growth',
      desc: isZh ? '网红利用 Veo 3 增长受众。使用 Google Veo 3 每天生成一致的高质量视频片段，毫不费力地保持粉丝参与度并领先于算法趋势，维持稳定的新鲜内容流以保持个人资料热度。' : 'Influencers use Veo 3 to grow their audience. Generate consistent, high-quality video clips daily with Google Veo 3, effortlessly keeping fans engaged and staying ahead of algorithm trends, maintaining a steady stream of fresh content to keep profiles hot.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
      title: isZh ? '企业培训' : 'Corporate Training',
      desc: isZh ? '人力资源部门使用 Veo 3 简化入职流程。使用 Veo 3 制作一致的多语言培训视频，确保所有员工都能快速安全地获得标准化且引人入胜的学习材料，消除语言障碍。' : 'HR departments use Veo 3 to streamline onboarding. Create consistent, multilingual training videos with Veo 3, ensuring all employees quickly and securely receive standardized and engaging learning materials, eliminating language barriers.',
    },
  ];


  const FAQS = [
    {
      q: isZh ? '什么是 Veo 3？' : 'What is Veo 3?',
      a: isZh ? 'Veo 3 是最新的最先进生成式视频模型，旨在将文本提示转化为高质量的 1080p 视频片段。由 Google Veo 3 技术驱动，它擅长理解自然语言、电影术语和物理定律。与之前的迭代不同，Veo 3 提供集成的音频生成，在生成视觉画面的同时，还能创造同步的声音、对话和音乐，专为内容创作者、营销人员和企业设计。' : 'Veo 3 is the latest and most advanced generative video model, designed to transform text prompts into high-quality 1080p video footage. Powered by Google Veo 3 technology, it excels at understanding natural language, cinematic terminology, and the laws of physics. Unlike previous iterations, Veo 3 offers integrated audio generation, creating synchronized sounds, dialogue, and music alongside the visual generation, designed for content creators, marketers, and businesses.',
    },
    {
      q: isZh ? '如何使用 Google Veo 3？' : 'How to use Google Veo 3?',
      a: isZh ? '要使用 Google Veo 3，只需通过我们的指定界面访问平台。在 Veo 3 输入框中输入高度描述性的文本提示即可开始。您可以指定摄像机角度、光照条件和角色动作。Veo 3 还支持图生视频功能，允许您上传参考图像。设置好参数后点击生成，Veo 3 引擎将渲染出以惊人准确度遵守您创意指令的视频。' : 'To use Google Veo 3, simply access the platform through our designated interface. Begin by entering highly descriptive text prompts into the Veo 3 input box. You can specify camera angles, lighting conditions, and character actions. Veo 3 also supports an image-to-video feature, allowing you to upload reference images. After setting your parameters, click generate, and the Veo 3 engine will render a video that adheres to your creative instructions with astonishing accuracy.',
    },
    {
      q: isZh ? 'Veo 3 免费使用吗？' : 'Is Veo 3 free to use?',
      a: isZh ? '许多用户问 Veo 3 是否免费。虽然有限制的免费试用选项或基于积分的系统供新用户测试 Veo 3 的功能，但要全面访问 Google Veo 3 的高清生成和高级功能，通常需要订阅或购买积分。免费层通常允许生成较短的片段或带水印的导出，而高级计划则解锁 Veo 3 的全部潜力，包括商业使用权和更高分辨率。' : 'Many users ask if Veo 3 is free. While limited free trial options or credit-based systems are available for new users to test Veo 3 capabilities, full access to Google Veo 3 high-definition generation and advanced features typically requires a subscription or credit purchase. The free tier usually allows for shorter clip generation or watermarked exports, while premium plans unlock Veo 3 full potential, including commercial usage rights and higher resolutions.',
    },
    {
      q: isZh ? '如何访问 Veo 3？' : 'How to access Veo 3?',
      a: isZh ? '您可以直接通过我们的网页平台访问 Veo 3，该平台为 Google Veo 3 模型提供了用户友好的界面。只需注册账户，验证您的详细信息，您将立即获得 Veo 3 的创造力。无论是桌面端还是移动端，访问 Veo 3 都旨在实现无缝连接，让您可以在世界任何地方开始创作专业视频。' : 'You can access Veo 3 directly through our web platform, which provides a user-friendly interface for the Google Veo 3 model. Simply register an account, verify your details, and you will immediately gain access to Veo 3 creativity. Whether on desktop or mobile, accessing Veo 3 is designed to be seamless, allowing you to start creating professional videos anywhere in the world.',
    },
  ];

  const fadeRef = useScrollFade();
  const [featTab, setFeatTab] = useState(0);
  const [featVisible, setFeatVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const switchFeat = (i: number) => {
    if (i === featTab) return;
    setFeatVisible(false);
    setTimeout(() => { setFeatTab(i); setFeatVisible(true); }, 250);
  };

  const feat = FEATURES[featTab];

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">{isZh ? '首页' : 'Homepage'}</Link>
          <span>/</span>
          <Link href="/zh/video/" className="transition-colors hover:text-white/70">{isZh ? 'AI视频生成器' : 'AI Video Generator'}</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">{isZh ? 'Veo 3 视频生成器' : 'Veo 3 Video Generator'}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                {isZh ? '体验 Google Veo 3 模型的突破性力量' : 'Experience the breakthrough power of the Google Veo 3 model'}
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">
                Veo 3 {isZh ? '视频生成器：终极 AI 创作平台' : 'Video Generator: The Ultimate AI Creation Platform'}
              </h2>
              <p className="mb-6 leading-relaxed text-white/60">
                {isZh ? '体验 Veo 3 带来的内容创作未来，这是专为电影制作人和营销人员设计的先进 Google Veo 3 模型。将文本提示或静态图像转化为带有同步音频的高清 1080p 视频。这款 Veo 3 AI 工具确保角色一致性、逼真的物理效果以及令人惊叹的视觉质量，助力您的下一个大项目。' : 'Experience the future of content creation with Veo 3, an advanced Google Veo 3 model designed for filmmakers and marketers. Transform text prompts or static images into high definition 1080p videos with synchronized audio. This Veo 3 AI tool ensures character consistency, realistic physics, and stunning visual quality to power your next big project.'}
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">{isZh ? '✨ 立即免费体验' : '✨ Try for free now'}</Link>
              <ul className="mt-8 space-y-2">
                {[
                  isZh ? '🎬 高清 1080p 视频，同步音频生成' : '🎬 High definition 1080p video, synchronized audio generation',
                  isZh ? '🎥 电影级视觉质量与逼真物理效果' : '🎥 Cinematic visual quality with realistic physics',
                  isZh ? '🖼️ 支持文生视频与图生视频两种模式' : '🖼️ Supports text to video and image to video modes',
                  isZh ? '🔒 企业级安全，SynthID 水印保护' : '🔒 Enterprise grade security, SynthID watermark protection',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/video/veo3gen-showcase.webp" alt="Veo 3 {isZh ? '视频生成器' : 'Video Generator'}" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Generator ── */}
      <VideoGeneratorPanel
        sampleVideoSrc="https://static.banana2ai.net/videos/sample-subpage.mp4"
        sampleVideoPoster="https://static.banana2ai.net/images/showcase/veo-thumb.webp"
      />

      {/* ── Steps ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '如何使用' : 'How to use'} <span className="text-[#ffcc33]">{isZh ? 'Veo 3 视频生成器' : 'Veo 3 Video Generator'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '使用我们直观的 Veo 3 界面，只需三个简单步骤即可制作工作室品质的视频。' : 'Create studio quality videos in just three simple steps using our intuitive Veo 3 interface.'}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc33]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 flex items-center justify-center rounded-xl border border-[#363b4e]/40 bg-[#1c2030] p-3">
                    <Image src={step.icon} alt={step.title} width={40} height={40} className="h-10 w-10" />
                  </div>
                  <div className="badge-gradient mb-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-black shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-[#ffcc33]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-6 z-10 hidden items-center justify-center sm:flex">
                    <span className="text-lg font-bold text-[#ffcc33]/60">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (tabs) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            <span className="text-[#ffcc33]">Veo 3</span> {isZh ? '的突破性功能' : 'Breakthrough Features'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '探索让 Veo 3 成为 AI 视频生成行业领导者的突破性功能。' : 'Explore the breakthrough features that make Veo 3 a leader in the AI video generation industry.'}
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {FEATURES.map((f, i) => (
              <button
                key={i}
                onClick={() => switchFeat(i)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${featTab === i ? 'border-[#ffcc33]/30 bg-[#ffcc33]/10 text-[#ffcc33]' : 'border-transparent bg-[#1c2030] text-white/50'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Desktop tabs */}
          <div className="mb-10 hidden justify-center gap-4 md:flex">
            {FEATURES.map((f, i) => (
              <button
                key={i}
                onClick={() => switchFeat(i)}
                className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${featTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                {f.label}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
                  style={{ opacity: featTab === i ? 1 : 0, transform: featTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            ))}
          </div>

          {/* Feature content */}
          <div className="relative min-h-[280px]">
            <div
              className="mx-auto max-w-3xl rounded-2xl border border-[#363b4e] bg-[#13151f] p-8 md:p-12"
              style={{
                opacity: featVisible ? 1 : 0,
                transform: featVisible ? 'none' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ffcc33]/5 blur-3xl" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">{feat.title}</h3>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                <span className="gradient-glow-text text-sm font-semibold">{feat.highlight}</span>
              </div>
              <p className="leading-relaxed text-white/60">{feat.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases (2-col icon grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '释放' : 'Unleash'} <span className="text-[#ffcc33]">Veo 3</span> {isZh ? '的潜力' : 'The Potential'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '看看各行各业的专业人士如何利用 Veo 3 改变他们的工作流程。' : 'See how professionals across various industries are transforming their workflows with Veo 3.'}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={uc.icon} alt={uc.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">{uc.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{uc.desc}</p>
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
            {isZh ? '用户对 Veo 3 的评价' : 'User Reviews of Veo 3'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '加入成千上万信赖 Veo 3 满足其视频生成需求的创作者行列。' : 'Join thousands of creators who trust Veo 3 for their video generation needs.'}
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            {isZh ? '常见问题解答' : 'Frequently Asked Questions'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '关于 Veo 3 AI 视频生成器您需要了解的一切。' : 'Everything you need to know about the Veo 3 AI video generator.'}
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
            {isZh ? '立即开始使用 Veo 3 创作' : 'Start Creating with Veo 3 Now'}
          </h2>
          <p className="mb-8 text-lg text-white/60">
            {isZh ? '不要在快速发展的数字环境中落后。立即加入 AI 视频革命，利用 Google Veo 3 的变革力量释放您无限的创造力，将您的故事变为现实。' : 'Do not fall behind in the rapidly evolving digital landscape. Join the AI video revolution today and unleash your limitless creativity, bringing your stories to life with the transformative power of Google Veo 3.'}
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">{isZh ? '✨ 立即免费开始创作' : '✨ Start creating for free now'}</Link>
        </div>
      </section>

    </div>
  );
}
