'use client';

import { useLocale } from 'next-intl';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Copy, ExternalLink, ArrowRight, ChevronDown,
  ChevronLeft, ChevronRight, Sparkles, BookOpen, Eye,
  Zap, RefreshCw, Link2, Globe,
  Palette, Instagram, Megaphone, Code, GraduationCap, Heart,
} from 'lucide-react';

/* ──────────────────────────── Data ──────────────────────────── */








/* ──────────────────────────── Shared Components ──────────────────────────── */

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 right-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffcc33] opacity-[0.08] blur-3xl" />
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
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function BananaPromptsClient() {
  const isZh = useLocale() === 'zh';
  const EXAMPLE_PROMPTS = [
    { id: 1, prompt: 'Do this for the Bleach. Input Variable: [INSERT TITLE] (e.g., The Terminator, Dune, The Matrix). System Prompt: Create a collection of six anime-styled movie posters arranged in a 3x2 grid layout.', model: 'Nano Banana', image: 'https://static.banana2ai.net/images/prompts/anime-posters.webp', tags: ['动漫', '海报', '网格'] },
    { id: 2, prompt: 'Cinematic film still of the protagonist in a dimly lit, ancient private library, caught in a decisive moment while researching late at night. Shot on an Arri Alexa Mini with a Cooke S4/i 50mm Prime lens at T2.0.', model: 'Nano Banana Pro', image: 'https://static.banana2ai.net/images/prompts/researcher-night.webp', tags: ['电影', '人像', '写实'] },
    { id: 3, prompt: 'Create a hyper-realistic 3D render of a transparent twitter profile card, designed like a futuristic holographic ID badge held between fingers against a dark background.', model: 'Nano Banana', image: 'https://static.banana2ai.net/images/prompts/holographic-id.webp', tags: ['3D', '未来', '卡片'] },
    { id: 4, prompt: 'Oil on Canvas, A view of the bay from an upstairs window. In a impressionism, new media art style. A breathtaking sunset with warm golden and amber tones illuminating the scene.', model: 'Nano Banana Pro', image: 'https://static.banana2ai.net/images/prompts/sunset-art.webp', tags: ['油画', '风景', '印象派'] },
    { id: 5, prompt: 'Highly detailed close-up photograph, ultra-photorealistic, 8K resolution shot on a digital camera with cinematic lighting and dramatic shadows. Portrait of a man with sunglasses.', model: 'Nano Banana', image: 'https://static.banana2ai.net/images/prompts/portrait-sunglasses.webp', tags: ['人像', '摄影', '特写'] },
    { id: 6, prompt: 'Cinematic 90s film still of a stunning young man with messy wet-look dark hair strands falling across forehead, photographed on Kodak Vision3 500T film stock emulation.', model: 'Nano Banana Pro', image: 'https://static.banana2ai.net/images/prompts/dark-hair-portrait.webp', tags: ['电影', '复古', '90年代'] },
    { id: 7, prompt: 'Beautiful redheaded woman with a perfectly proportioned figure, smiling happily and naturally, posing on a tropical beach at golden hour with soft warm lighting.', model: 'Nano Banana', image: 'https://static.banana2ai.net/images/prompts/beach-figure.webp', tags: ['人像', '海滩', '自然'] },
    { id: 8, prompt: 'Ultra-viral recipe infographic. Showcase a FOOD with melted cheese, crispy edges and fresh herbs. Include step-by-step visual guide with ingredients list and cooking time.', model: 'Nano Banana Pro', image: 'https://static.banana2ai.net/images/prompts/food-recipe.webp', tags: ['美食', '信息图', '食谱'] },
  ];

  const HOW_IT_WORKS = [
    {
      num: 1, icon: BookOpen,
      title: isZh ? '浏览精选 Banana 提示词' : 'Browse Curated Banana Prompts',
      desc: isZh ? '探索我们海量且持续更新的 Banana Prompts 提示词库，汇集了来自全球优秀创作者的作品。通过风格、类别、热度或时间筛选，找到符合您创意愿景的提示词。每个提示词都展示真实的生成结果预览，让您在使用前就能看到确切的风格和质量。' : 'Explore our massive and continuously updated Banana Prompts library, featuring works from top creators worldwide. Filter by style, category, popularity, or time to find prompts that match your creative vision. Each prompt displays real generated result previews, allowing you to see the exact style and quality before use.',
    },
    {
      num: 2, icon: Copy,
      title: isZh ? '使用或复制您喜欢的提示词' : 'Use or Copy Your Favorite Prompts',
      desc: isZh ? '找到了完美的 Banana Prompt？您有两个强大的选项：点击"使用"即可立即跳转到 Banana Pro AI，提示词已预加载并准备好生成——无需输入。或者点击"复制"以获取确切的提示词文本，用于您偏好的任何 AI 图像生成工具。' : 'Found the perfect Banana Prompt? You have two powerful options: Click "Use" to instantly jump to Banana Pro AI, with the prompt preloaded and ready for generation – no typing required. Or click "Copy" to get the exact prompt text for use with any AI image generation tool you prefer.',
    },
    {
      num: 3, icon: Sparkles,
      title: isZh ? '使用 AI 生成自定义提示词' : 'Generate Custom Prompts with AI',
      desc: isZh ? '在我们的素材库中找不到您需要的特定内容？使用 Banana Prompts 的 AI 智能提示词生成器！只需用自然语言描述您的创意构想，我们的智能 AI 就会为您量身定制详细且优化的提示词。这就像拥有一位专业的提示词工程师随时待命！' : 'Cannot find the specific content you need in our library? Use Banana Prompts AI smart prompt generator! Simply describe your creative idea in natural language, and our smart AI will tailor detailed and optimized prompts for you. It is like having a professional prompt engineer on standby!',
    },
  ];

  const FEATURES_DETAIL = [
    {
      title: isZh ? '海量精选提示词库' : 'Massive Curated Prompt Library',
      desc: isZh ? '收录数千条经过专家筛选的高质量提示词，涵盖照片写实、数字艺术、插画、概念设计等各种风格和应用场景。每日持续更新，紧跟最新 AI 艺术趋势。' : 'Contains thousands of expert-vetted high-quality prompts, covering various styles and application scenarios such as photorealism, digital art, illustration, and concept design. Continuously updated daily, keeping up with the latest AI art trends.',
      image: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp',
    },
    {
      title: isZh ? '真实生成结果预览' : 'Real Generated Result Previews',
      desc: isZh ? '每个提示词都附有真实的 AI 生成图像预览，所见即所得。帮助您在使用前准确了解生成效果的风格和质量，节省试错时间和积分。' : 'Each prompt comes with real AI generated image previews, what you see is what you get. Helping you accurately understand the style and quality of the generated results before use, saving trial and error time and credits.',
      image: 'https://static.banana2ai.net/images/showcase/ai-models.webp',
    },
    {
      title: isZh ? 'AI驱动的提示词生成器' : 'AI-Powered Prompt Generator',
      desc: isZh ? '用自然语言描述您的想法，AI 自动生成专业级提示词。该生成器理解艺术术语、风格偏好、构图原则和技术参数，生成的提示词能够精准呈现您的创意愿景。' : 'Describe your ideas in natural language, and AI automatically generates professional-grade prompts. The generator understands artistic terms, style preferences, composition principles, and technical parameters, enabling the generated prompts to precisely present your creative vision.',
      image: 'https://static.banana2ai.net/images/showcase/video-generation.webp',
    },
  ];

  const WHY_TABS = [
    {
      label: isZh ? '始终新鲜且紧跟潮流' : 'Always Fresh and Up-to-Date',
      title: isZh ? '始终新鲜且紧跟潮流' : 'Always Fresh and Up-to-Date',
      desc: isZh ? 'Banana Prompts 每日更新，汇集来自全球创作者社区的新鲜热门提示词。我们的策展团队持续监测热门 AI 生成平台、社交媒体趋势和社区投稿，以识别并添加最有效、最具创新性的提示词。无论您是每天访问还是每周访问，都能持续发现激发创作灵感的新提示词。' : 'Banana Prompts are updated daily, gathering fresh and popular prompts from the global creator community. Our curation team continuously monitors popular AI generation platforms, social media trends, and community submissions to identify and add the most effective and innovative prompts. Whether you visit daily or weekly, you will continuously discover new prompts to spark creative inspiration.',
    },
    {
      label: isZh ? '一键集成 Banana Pro AI' : 'One-Click Banana Pro AI Integration',
      title: isZh ? '一键集成 Banana Pro AI' : 'One-Click Banana Pro AI Integration',
      desc: isZh ? '与 Banana Pro AI 无缝集成，点击"立即使用"即可跳转到创作界面，提示词已预加载完毕，您只需点击生成，几秒钟后图像就创建完成了。这是从发现提示词到完成创作的最短路径，零摩擦体验。' : 'Seamlessly integrated with Banana Pro AI, click "Use Now" to jump to the creation interface, with the prompt preloaded. You just click generate, and the image is created in seconds. This is the shortest path from discovering a prompt to completing a creation, a zero-friction experience.',
    },
    {
      label: isZh ? '通用兼容性' : 'Universal Compatibility',
      title: isZh ? '通用兼容性' : 'Universal Compatibility',
      desc: isZh ? '我们库中的每个提示词都兼容所有主流 AI 图像生成平台。提示词采用通用格式和术语，可完美适配 Midjourney、DALL-E 3、Stable Diffusion、Leonardo AI、Adobe Firefly 等工具。只需复制提示词文本并粘贴到您喜欢的平台即可。' : 'Every prompt in our library is compatible with all mainstream AI image generation platforms. Prompts use universal formats and terminology, perfectly adapting to tools like Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, Adobe Firefly, and more. Simply copy the prompt text and paste it into your preferred platform.',
    },
    {
      label: isZh ? '包含 AI 提示词生成器' : 'Includes AI Prompt Generator',
      title: isZh ? '包含 AI 提示词生成器' : 'Includes AI Prompt Generator',
      desc: isZh ? '不仅是一个提示词库，还内置了 AI 提示词生成器。只需用日常语言描述您想要创作的内容，AI 就会生成完整的提示词，包含结构、技术参数、风格参考和描述性细节，从而生成高质量的图像。' : 'Not just a prompt library, it also has a built-in AI prompt generator. Simply describe what you want to create in everyday language, and AI will generate a complete prompt, including structure, technical parameters, style references, and descriptive details, to produce high-quality images.',
    },
  ];

  const BENEFITS = [
    { icon: Palette, title: isZh ? '数字艺术家和插画师' : 'Digital Artists and Illustrators', desc: isZh ? '为专业艺术家提供启发性的提示词，发现从未想过尝试的新风格，加速您的创作探索和风格迭代。通过研究精选提示词来理解有效的提示词结构。' : 'Provides inspiring prompts for professional artists, discover new styles you never thought to try, accelerate your creative exploration and style iteration. Understand effective prompt structures by studying curated prompts.' },
    { icon: Instagram, title: isZh ? '内容创作者和社交媒体管理者' : 'Content Creators and Social Media Managers', desc: isZh ? '快速找到热门的提示词风格，精确预览生成效果，并在几秒钟内生成符合品牌调性的图片。提示词库会持续更新最新风格，让您的内容始终保持新鲜感。' : 'Quickly find popular prompt styles, accurately preview generated results, and generate brand-aligned images in seconds. The prompt library continuously updates with the latest styles, keeping your content fresh.' },
    { icon: Megaphone, title: isZh ? '营销专业人士' : 'Marketing Professionals', desc: isZh ? '使用精选提示词生成的图像质量可媲美专业摄影作品，只需花费传统方法的零头成本，就能创建无限量的定制视觉素材。大幅提升创意产出。' : 'Images generated using curated prompts rival professional photography in quality, at a fraction of the cost of traditional methods, allowing you to create unlimited custom visual assets. Significantly boost creative output.' },
    { icon: Code, title: isZh ? '网页设计师与开发者' : 'Web Designers and Developers', desc: isZh ? '生成完美契合客户品牌指南的主视觉图像、背景和图形。AI 提示词生成器理解设计术语，可针对特定配色方案、构图和风格创建提示词。' : 'Generate main visual images, backgrounds, and graphics that perfectly align with client brand guidelines. The AI prompt generator understands design terminology and can create prompts for specific color schemes, compositions, and styles.' },
    { icon: GraduationCap, title: isZh ? '教育工作者与培训专业人士' : 'Educators and Training Professionals', desc: isZh ? '创建生动的教学插图和视觉辅助材料。AI 提示词生成器帮助您将复杂概念转化为直观的视觉表达，提升学习体验。' : 'Create vivid educational illustrations and visual aids. The AI prompt generator helps you transform complex concepts into intuitive visual expressions, enhancing the learning experience.' },
    { icon: Heart, title: isZh ? 'AI 爱好者与兴趣用户' : 'AI enthusiasts and hobbyists', desc: isZh ? '学习和获取灵感的首选资源。通过研究精选提示词来理解它们的有效性，发现前沿技术，实验各种大胆的创意想法。' : 'The go-to resource for learning and inspiration. Understand the effectiveness of curated prompts by studying them, discover cutting-edge techniques, and experiment with bold creative ideas.' },
  ];

  const TESTIMONIALS = [
    { quote: isZh ? '作为一名自由插画师，Banana Prompts 彻底改变了我的创作方式。以前我花数小时调试提示词，现在直接浏览精选库就能找到完美的起点。AI 提示词生成器更是锦上添花——它理解我描述的艺术风格，并生成我自己可能永远想不到的精妙提示词。' : 'As a freelance illustrator, Banana Prompts has completely transformed my creative process. I used to spend hours debugging prompts, but now I can just browse the curated library to find the perfect starting point. The AI prompt generator is the icing on the cake—it understands the art style I describe and generates ingenious prompts I might never have thought of myself.', name: 'Alex Rivera', role: isZh ? '自由插画师' : 'Freelance Illustrator', avatar: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp' },
    { quote: isZh ? '作为五个不同品牌的内容管理者，Banana Prompts 对我的工作流程至关重要。我可以快速找到热门的提示词风格，精确预览生成效果，并在几秒钟内生成符合品牌调性的图片。与 Banana Pro AI 的"立即使用"集成非常流畅——我曾在一小时内创建了整整一周的社交媒体内容。' : 'As a content manager for five different brands, Banana Prompts is crucial to my workflow. I can quickly find popular prompt styles, accurately preview generated results, and create brand-aligned images in seconds. The "Use Now" integration with Banana Pro AI is seamless—I once created an entire week of social media content in an hour.', name: 'Jessica Park', role: isZh ? '社交媒体管理员' : 'Social Media Manager', avatar: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp' },
    { quote: isZh ? 'Banana Prompts 已经取代了我们昂贵的图库订阅服务。使用这些精选提示词生成的图像质量可媲美专业摄影作品，而我们只需花费传统方法的零头成本。AI 生成器功能让我们能够创建符合品牌特色的提示词，在各个营销活动中保持统一的视觉形象。' : 'Banana Prompts has replaced our expensive stock photo subscriptions. The image quality generated using these curated prompts rivals professional photography, and we only pay a fraction of the cost of traditional methods. The AI generator feature allows us to create brand-specific prompts, maintaining a consistent visual identity across all marketing campaigns.', name: 'Marcus Chen', role: isZh ? '营销总监' : 'Marketing Director', avatar: 'https://static.banana2ai.net/images/avatars/l8af5arb7l0d.webp' },
    { quote: isZh ? '我每天都在使用 Banana Prompts 进行网页设计项目。它能够生成完美契合客户品牌指南的主视觉图像。AI 提示词生成器能够理解设计术语，并可以针对特定的配色方案、构图和风格创建提示词。我可以在几分钟内向客户展示多个视觉方向。' : 'I use Banana Prompts daily for web design projects. It generates main visual images that perfectly align with client brand guidelines. The AI prompt generator understands design terminology and can create prompts for specific color schemes, compositions, and styles. I can present multiple visual directions to clients in minutes.', name: 'Sarah Thompson', role: isZh ? 'UX/UI 设计师' : 'UX/UI Designer', avatar: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp' },
  ];

  const FAQ_ITEMS = [
    { q: isZh ? '什么是 Banana Prompts？' : 'What is Banana Prompts?', a: isZh ? 'Banana Prompts 是全球最大的精选 AI 图像生成提示词库，收录了数千条高质量、经过验证的提示词，并提供真实的生成结果预览。我们的平台帮助创作者发现有效的提示词，在使用前准确预览生成效果，既可以点击"立即使用"在 Banana Pro AI 上即时生成，也可以复制提示词在任何 AI 工具中使用。' : 'Banana Prompts is the worlds largest curated library of AI image generation prompts, featuring thousands of high-quality, verified prompts with real generated result previews. Our platform helps creators discover effective prompts, accurately preview generated results before use, and either click "Use Now" to instantly generate on Banana Pro AI or copy the prompt for use in any AI tool.' },
    { q: isZh ? '如何使用 Banana Prompts 中的提示词？' : 'How do I use prompts from Banana Prompts?', a: isZh ? '浏览提示词库，按风格或类别筛选，并预览生成效果。找到喜欢的提示词时：点击"使用"即可立即启动 Banana Pro AI 并预加载提示词，或点击"复制"获取文本粘贴到任何 AI 图像生成工具中。' : 'Browse the prompt library, filter by style or category, and preview the generated results. When you find a prompt you like: click "Use" to immediately launch Banana Pro AI with the prompt preloaded, or click "Copy" to get the text and paste it into any AI image generation tool.' },
    { q: isZh ? 'Banana Prompts 可以免费使用吗?' : 'Is Banana Prompts free to use?', a: isZh ? '是的！Banana Prompts 完全免费浏览、探索和使用。您可以访问包含数千条精选提示词的完整库，查看所有结果预览，无限复制提示词，并免费使用"立即使用"功能。AI 提示词生成器也提供免费使用。' : 'Yes! Banana Prompts is completely free to browse, explore, and use. You can access the full library of thousands of curated prompts, view all result previews, copy prompts unlimited times, and use the "Use Now" feature for free. The AI prompt generator is also available for free use.' },
    { q: isZh ? '复制提示词和使用"立即使用"有什么区别?' : 'What is the difference between copying a prompt and using "Use Now"?', a: isZh ? '"复制"将提示词文本复制到剪贴板，可粘贴到任何 AI 工具中，提供最大灵活性。"立即使用"则直接跳转到 Banana Pro AI 并自动预加载提示词，只需点击生成即可——提供最快速、最流畅的体验。' : '"Copy" copies the prompt text to your clipboard, allowing you to paste it into any AI tool for maximum flexibility. "Use Now" directly jumps to Banana Pro AI and automatically preloads the prompt, requiring only a click to generate—providing the fastest, most seamless experience.' },
    { q: isZh ? 'AI 提示词生成器是如何工作的?' : 'How does the AI prompt generator work?', a: isZh ? 'AI 提示词生成器采用先进的自然语言处理技术，将您的创意描述转化为详细、优化的提示词。只需用日常语言描述您想要创作的内容，AI 就会生成包含结构、技术参数、风格参考和描述性细节的完整提示词。' : 'The AI prompt generator uses advanced natural language processing technology to transform your creative descriptions into detailed, optimized prompts. Simply describe what you want to create in everyday language, and the AI will generate a complete prompt including structure, technical parameters, style references, and descriptive details.' },
    { q: isZh ? '我可以在任何 AI 图像生成器中使用 Banana Prompts 吗?' : 'Can I use Banana Prompts with any AI image generator?', a: isZh ? '当然可以！我们的提示词采用通用格式和术语，可完美适配 Midjourney、DALL-E 3、Stable Diffusion、Leonardo AI、Adobe Firefly 等所有主流平台。只需复制提示词文本并粘贴到您喜欢的平台即可。' : 'Absolutely! Our prompts use a universal format and terminology, making them perfectly compatible with all major platforms like Midjourney, DALL-E 3, Stable Diffusion, Leonardo AI, Adobe Firefly, and more. Simply copy the prompt text and paste it into your preferred platform.' },
    { q: isZh ? 'Banana Prompts 库多久更新一次?' : 'How often is the Banana Prompts library updated?', a: isZh ? 'Banana Prompts 每日更新，汇集来自全球创作者社区的新鲜热门提示词。策展团队持续监测热门 AI 平台、社交媒体趋势和社区投稿，每月新增数百条提示词。' : 'Banana Prompts is updated daily, gathering fresh and trending prompts from the global creator community. Our curation team continuously monitors popular AI platforms, social media trends, and community submissions, adding hundreds of new prompts each month.' },
    { q: isZh ? '我可以向 Banana Prompts 提交自己的提示词吗?' : 'Can I submit my own prompts to Banana Prompts?', a: isZh ? '当然！我们欢迎社区提交高质量的提示词。经过审核的提示词将被添加到资源库中，并注明原作者信息。社区驱动的方式确保 Banana Prompts 汇集了来自全球优秀创作者的技巧和风格。' : 'Absolutely! We welcome community submissions of high-quality prompts. Approved prompts will be added to the library with credit to the original author. This community-driven approach ensures Banana Prompts gathers tips and styles from top creators worldwide.' },
    { q: isZh ? '使用 Banana Prompts 需要有 AI 或提示词工程经验吗?' : 'Do I need AI or prompt engineering experience to use Banana Prompts?', a: isZh ? '完全不需要！初学者只需浏览精选提示词库，找到喜欢的视觉风格，然后复制或点击"立即使用"即可。高级用户则可以使用 AI 生成器创建复杂的自定义提示词。随着您技能的提升，平台也会与您一同成长。' : 'Not at all! Beginners can simply browse the curated prompt library, find a visual style they like, and then copy or click "Use Now." Advanced users can use the AI generator to create complex custom prompts. As your skills grow, the platform will grow with you.' },
    { q: isZh ? '什么是好的提示词，Banana Prompts 如何确保质量？' : 'What makes a good prompt, and how does Banana Prompts ensure quality?', a: isZh ? '优质提示词需要在具体性和清晰度之间取得平衡。Banana Prompts 通过多阶段策划确保质量：从成功创作者获取提示词，在多个 AI 平台上测试，验证结果一致性，只有达到高标准的才会被收录。每个提示词都包含真实生成结果预览。' : 'A good prompt strikes a balance between specificity and clarity. Banana Prompts ensures quality through a multi-stage curation process: acquiring prompts from successful creators, testing them on multiple AI platforms, verifying result consistency, and only including those that meet high standards. Each prompt includes a real generated result preview.' },
  ];

  const [searchText, setSearchText] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const filtered = searchText.trim()
    ? EXAMPLE_PROMPTS.filter(
        (p) =>
          p.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          p.tags.some((t) => t.includes(searchText)) ||
          p.model.toLowerCase().includes(searchText.toLowerCase())
      )
    : EXAMPLE_PROMPTS;

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-20">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl text-center">
          <FadeIn>
            <h1 className="gradient-glow-text mb-3 text-xl font-bold leading-tight sm:mb-4 sm:text-2xl md:text-4xl">
              最新香蕉图像生成提示词示例与最佳实践
            </h1>
            <h2 className="mx-auto max-w-3xl text-xs text-white/50 sm:text-sm md:text-base">
              探索精彩的香蕉图像生成提示词及示例图片。从这些精心策划的提示词中获取灵感，创作出令人惊艳的图像。
            </h2>
          </FadeIn>

        </div>
      </section>

      {/* ─── 1b. AI Prompt Generator ─── */}
      <section className="px-4 pb-8">
        <FadeIn className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-[#363b4e] bg-[#161f2b] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#ffcc33]" />
              <span className="font-semibold text-white">使用 AI 生成 Nano Banana 提示词</span>
              <span className="rounded-md bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/60">3 今日剩余使用次数</span>
            </div>
            <p className="mb-3 text-sm text-white/40">描述您的图片创意，让 AI 为您创建完美的 Nano Banana 提示词</p>
            <div className="flex gap-2">
              <textarea
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="描述您想要创建的图像..."
                rows={3}
                className="min-h-[80px] flex-1 resize-none rounded-lg border border-[#363b4e] bg-[#0f1117] px-3 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#ffcc33]/50"
              />
            </div>
            <div className="mt-3 flex justify-end">
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ffcc33] to-[#ff9900] px-5 py-2 text-sm font-semibold text-black transition-all hover:opacity-90">
                <Sparkles className="h-4 w-4" />
                生成
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── 2. Prompt Gallery (Masonry) ─── */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="columns-1 gap-3 sm:columns-2 md:gap-4 lg:columns-3 xl:columns-4">
            {filtered.map((p, i) => (
              <div key={p.id} className="mb-3 break-inside-avoid md:mb-4">
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#161f2b] transition-all duration-300 hover:border-gray-700 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.prompt}
                      width={400}
                      height={400}
                      className="h-full w-full transition-transform duration-300 group-hover:scale-105 object-contain"
                    />
                  </div>
                  {/* Prompt text */}
                  <div className="flex flex-1 flex-col p-3">
                    <p className="mb-2 flex-shrink-0 text-sm font-medium text-gray-300">Prompt:</p>
                    <p className="mb-3 text-xs leading-relaxed text-white/50 line-clamp-4">{p.prompt}</p>
                    {/* Action buttons */}
                    <div className="mt-auto flex gap-2">
                      <Link
                        href="/zh/image/banana-pro-ai/"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Use It
                      </Link>
                      <button
                        onClick={() => handleCopy(p.id, p.prompt)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-yellow-400 to-red-400 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-yellow-500 hover:to-red-500 hover:shadow-lg"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        {copiedId === p.id ? 'Copied!' : 'Copy It'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-white/30">未找到匹配的提示词</div>
          )}
        </div>
      </section>

      {/* ─── 3. How It Works (3 Steps) ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">从发现到创作：Banana Prompts 的工作原理</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-5xl md:text-base">
              Banana Prompts 通过直观的工作流程简化您的创作过程，专为速度和灵感而设计。从浏览数千个精选提示词到一键生成图像，我们让每个人都能轻松使用 AI 图像创作。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 md:flex-nowrap">
              {HOW_IT_WORKS.map((step, i) => (
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
                        <h3 className="gradient-glow-text mb-3 text-lg font-semibold transition-all duration-300 group-hover:scale-105 md:text-xl">{step.title}</h3>
                        <p className="text-sm text-white/50 md:text-base">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
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

      {/* ─── 4. Features (Alternating Layout) ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-20 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">让 Banana Prompts 成为必备工具的强大功能</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              了解为什么 Banana Prompts 是全球数千名创作者首选的提示词资源平台。
            </p>
          </FadeIn>
          <div className="space-y-36 md:space-y-56">
            {FEATURES_DETAIL.map((feat, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                  <FadeIn className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative overflow-hidden rounded-3xl shadow-lg">
                      <Image src={feat.image} alt={feat.title} width={800} height={500} className="w-full rounded-lg object-cover transition-transform duration-700 hover:scale-105" />
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

      {/* ─── 5. Why Choose (Tabs) ─── */}
      <section className="relative bg-gradient-to-b from-[#0f1117] via-[#161926] to-[#0f1117] px-4 py-12 md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-8 text-center md:mb-16">
            <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">为什么 Banana Prompts 是终极提示词资源</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Prompts 作为最全面、最易用且最有效的提示词发现平台脱颖而出。
            </p>
          </FadeIn>
          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-4 mb-8">
            {WHY_TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === i ? 'bg-gradient-to-r from-[#ffcc33] to-[#ff9900] text-black shadow-lg shadow-[#ffcc33]/20' : 'border border-[#363b4e] bg-[#13151f] text-white/60 hover:border-[#ffcc33]/30 hover:text-white'}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 md:hidden">
            {WHY_TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium border transition-all ${activeTab === i ? 'border-[#363b4e]/30 bg-[#0f1117] text-white' : 'border-transparent bg-white/5 text-white/50'}`}>
                <div className="flex items-center">
                  <div className={`mr-2 h-4 w-1 rounded-full transition-all ${activeTab === i ? 'bg-[#ffcc33]' : 'bg-transparent'}`} />
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
          <FadeIn key={activeTab}>
            <div className="mt-6 rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 p-6 md:p-10">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">{WHY_TABS[activeTab].title}</h3>
              <p className="text-sm text-white/70 md:text-base">{WHY_TABS[activeTab].desc}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 6. Who Benefits ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">谁能从 Banana Prompts 中受益?</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              无论您是专业创作者还是 AI 爱好者，Banana Prompts 都为您提供强大的提示词发现和创建工具。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10">
                  <div className="badge-gradient absolute left-0 right-0 top-0 h-1 opacity-80" />
                  <div className="relative z-10 p-8">
                    <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#13151f]/50 p-3 transition-all duration-300 group-hover:border-[#ffcc33]/60 group-hover:shadow-lg group-hover:shadow-[#ffcc33]/20">
                      <b.icon className="h-8 w-8 text-[#ffcc33]" />
                    </div>
                    <h3 className="gradient-glow-text mb-3 text-lg font-semibold transition-all duration-300 group-hover:scale-[1.02] md:text-xl">{b.title}</h3>
                    <p className="text-sm text-white/50 md:text-base">{b.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Testimonials ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">社区对 Banana Prompts 的评价</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">数千名创作者信赖 Banana Prompts 来获取灵感和提升创作效率。</p>
          </FadeIn>
          <div className="relative rounded-xl border border-[#363b4e] bg-[#0f1117] p-6 shadow-lg md:p-12">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute left-8 top-8 z-0 font-serif text-7xl text-[#ffcc33] opacity-30">&ldquo;</div>
            <div className="relative z-10">
              <div className="relative min-h-[180px]">
                {TESTIMONIALS.map((t, i) => (
                  <blockquote key={i} className={`mb-8 text-lg font-medium transition-opacity duration-500 md:text-2xl lg:text-3xl ${i === testimonialIdx ? 'relative z-10 opacity-100' : 'absolute inset-0 z-0 opacity-0'}`}>
                    <p className="text-white/40">{t.quote}</p>
                  </blockquote>
                ))}
              </div>
              <div className="relative">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className={`flex items-center gap-4 transition-opacity duration-500 ${i === testimonialIdx ? 'relative z-10 opacity-100' : 'absolute inset-0 z-0 opacity-0'}`}>
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
                <button onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 backdrop-blur-sm transition-all hover:border-[#ffcc33]/30">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all ${i === testimonialIdx ? 'w-6 bg-[#ffcc33]' : 'w-2 bg-[#363b4e] hover:bg-[#ffcc33]/30'}`} />
                  ))}
                </div>
                <button onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 backdrop-blur-sm transition-all hover:border-[#ffcc33]/30">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">关于 Banana Prompts 的常见问题</h2>
          </FadeIn>
          <div className="mx-auto max-w-7xl">
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="mb-4 overflow-hidden rounded-xl border border-[#363b4e] bg-[#0f1117] shadow-sm transition-all hover:border-[#ffcc33]/30 hover:shadow-md">
                  <button onClick={() => setOpenFaq(isOpen ? -1 : i)} className={`flex w-full items-center justify-between p-6 text-left md:p-8 ${isOpen ? 'border-b border-[#363b4e]/50' : ''}`}>
                    <h3 className={`text-lg font-semibold transition-colors duration-200 md:text-xl ${isOpen ? 'text-[#ffcc33]' : 'text-white'}`}>{faq.q}</h3>
                    <div className={`ml-4 flex-shrink-0 rounded-full p-1 transition-all ${isOpen ? 'bg-[#ffcc33]/10' : 'bg-[#1c2030]'}`}>
                      <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ffcc33]' : 'text-white/50'}`} />
                    </div>
                  </button>
                  <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}>
                    <div className="p-6 pt-4 text-sm text-white/60 md:p-8 md:pt-6 md:text-base">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 9. CTA ─── */}
      <section className="relative px-4 py-20 md:py-28">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-20">
            <FadeIn className="mb-12 text-center lg:mb-0 lg:text-left">
              <div className="lg:pr-8">
                <h2 className="gradient-glow-text mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  立即使用 Banana Prompts 开始创作精彩图像
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                  浏览数千条精选提示词，使用 AI 生成自定义提示词，一键在 Banana Pro AI 上创作专业图像。免费开始，无需注册。
                </p>
                <Link href="/zh/image/banana-pro-ai/" className="highlight-button group inline-flex items-center px-8 py-3 text-lg">
                  立即免费开始创作 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none" delay={0.15}>
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl" style={{ maskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}>
                <Image src="https://static.banana2ai.net/images/cta-cover.webp" alt="开始创作" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
