'use client';

import { useLocale } from 'next-intl';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare, SlidersHorizontal, Sparkles, Download,
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Zap, Star, Shield, Cloud,
  Palette, ShoppingBag, GraduationCap, Gamepad2,
} from 'lucide-react';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { IMAGE_LIST_EXAMPLES } from '@/data/page-examples';

/* ──────────────────────────── Data ──────────────────────────── */









/* ──────────────────────────── Decorative Orbs ──────────────────────────── */

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 right-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffcc33] opacity-[0.08] blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffcc33] opacity-[0.04] blur-3xl" />
    </div>
  );
}

/* ──────────────────────────── Scroll Fade Hook ──────────────────────────── */

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

export default function ImageListPage() {
  const isZh = useLocale() === 'zh';
  const MODEL_GRID = [
    { slug: 'flux-ai-image-generator', name: isZh ? 'Flux AI 图像生成器' : 'Flux AI Image Generator', image: 'https://static.banana2ai.net/images/showcase/ai-models.webp' },
    { slug: 'seedream-ai', name: 'Seedream AI', image: 'https://static.banana2ai.net/images/showcase/video-generation.webp' },
    { slug: 'z-image-turbo', name: 'Z Image Turbo', image: 'https://static.banana2ai.net/images/avatars/b88usp2lk4ef.webp' },
    { slug: 'qwen-image-edit', name: 'Qwen Image Edit', image: 'https://static.banana2ai.net/images/showcase/interactive-tools.webp' },
    { slug: 'grok-imagine', name: 'Grok Imagine', image: 'https://static.banana2ai.net/images/avatars/8pk4idwouhh0.webp' },
    { slug: 'banana-pro-ai', name: isZh ? 'Banana Pro AI 图片' : 'Banana Pro AI Images', image: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp' },
    { slug: 'banana-pro-ai', name: 'Banana AI Image', image: 'https://static.banana2ai.net/images/showcase/image-gallery.webp' },
    { slug: 'banana-pro-ai', name: isZh ? 'Banana Pro AI 图片' : 'Banana Pro AI Images', image: 'https://static.banana2ai.net/images/avatars/j3znhyr1jyn8.webp' },
  ];

  const STEPS = [
    {
      num: 1,
      icon: MessageSquare,
      title: isZh ? '选择：图生图或文生图' : 'Choose: Image-to-Image or Text-to-Image',
      desc: isZh ? '选择您的模式：上传照片进行图生图转换，或描述您的创意进行文生图生成。随着项目的发展，可在模式之间无缝切换。免费注册即可立即解锁两种模式。' : 'Select your mode: Upload a photo for image-to-image conversion, or describe your idea for text-to-image generation. Seamlessly switch between modes as your project evolves. Register for free to unlock both modes instantly.',
    },
    {
      num: 2,
      icon: SlidersHorizontal,
      title: isZh ? '自定义设置' : 'Custom Settings',
      desc: isZh ? '为初学者和专业人士提供直观易用的精细调控。图生图功能：选择风格、调整强度、设定比例。文生图功能：编写提示词、挑选风格、设置分辨率。智能AI会推荐最优参数设置。' : 'Intuitive and easy-to-use fine-tuning for beginners and professionals. Image-to-Image features: Select style, adjust intensity, set aspect ratio. Text-to-Image features: Write prompts, choose style, set resolution. Smart AI recommends optimal parameter settings.',
    },
    {
      num: 3,
      icon: Sparkles,
      title: isZh ? '生成并预览' : 'Generate and Preview',
      desc: isZh ? '5-10 秒即可生成。即时预览，需要时可调整后重新生成。快速处理鼓励创意实验——无需等待即可尝试多种风格和变化。免费账户包含无限次迭代。' : 'Generate in 5-10 seconds. Instant preview, adjust and regenerate as needed. Fast processing encourages creative experimentation – try multiple styles and variations without waiting. Free accounts include unlimited iterations.',
    },
    {
      num: 4,
      icon: Download,
      title: isZh ? '下载创作内容' : 'Download Your Creations',
      desc: isZh ? '下载无水印的高分辨率成果，完全免费。自动保存至您的安全云端资料库。可用于商业项目、社交媒体、营销或个人用途。完全所有权，零限制，无限存储空间。' : 'Download high-resolution, watermark-free results, completely free. Automatically saved to your secure cloud library. Usable for commercial projects, social media, marketing, or personal use. Full ownership, zero restrictions, unlimited storage.',
    },
  ];

  const AI_MODELS = [
    {
      name: 'Banana Pro',
      title: isZh ? 'Banana Pro：终极图生图与文生图 AI' : 'Banana Pro: The Ultimate Image-to-Image and Text-to-Image AI',
      desc: isZh ? 'Banana Pro AI 的旗舰模型，由 Google 的 Gemini Imagen 技术驱动。在文生图生成和图生图转换方面均提供最高质量输出。' : 'Banana Pro AI’s flagship model, powered by Google’s Gemini Imagen technology. Delivers the highest quality output for both text-to-image generation and image-to-image conversion.',
      features: [
        { title: isZh ? 'Google Gemini 驱动的图生图' : 'Google Gemini Powered Image-to-Image', desc: isZh ? '利用最新的Gemini Imagen技术进行精确风格迁移和图像增强' : 'Utilizes the latest Gemini Imagen technology for precise style transfer and image enhancement' },
        { title: isZh ? '自然语言文生图' : 'Natural Language Text-to-Image', desc: isZh ? '用自然中文或英文描述即可生成专业级图像，无需复杂提示词技巧' : 'Generate professional-grade images by describing in natural Chinese or English, no complex prompt engineering skills needed' },
        { title: isZh ? '多样化风格支持' : 'Diverse Style Support', desc: isZh ? '从照片写实到数字艺术、水彩、油画等多种风格一键切换' : 'One-click switching between various styles, from photorealistic to digital art, watercolor, oil painting, and more' },
        { title: isZh ? '智能细节保留' : 'Smart Detail Retention', desc: isZh ? '图生图转换中保留关键细节和构图，同时应用所选风格变化' : 'Retains key details and composition during image-to-image conversion while applying selected style changes' },
      ],
    },
    {
      name: 'Z-Image Turbo',
      title: isZh ? 'Z-Image Turbo：速度优化的图生图和文生图' : 'Z-Image Turbo: Speed-Optimized Image-to-Image and Text-to-Image',
      desc: isZh ? '通义-MAI 超快 60 亿参数模型，专为需要即时结果的创作者优化。' : '通义-MAI ultra-fast 6 billion parameter model, optimized for creators who need instant results.',
      features: [
        { title: isZh ? '极速生成' : 'Lightning-Fast Generation', desc: isZh ? '3-5秒内完成图生图和文生图，适合需要快速迭代的创作流程' : 'Completes image-to-image and text-to-image in 3-5 seconds, suitable for creative workflows requiring rapid iteration' },
        { title: isZh ? '中英双语文字渲染' : 'Bilingual Chinese and English Text Rendering', desc: isZh ? '业界领先的中文和英文文字渲染能力，适合海报和商业设计' : 'Industry-leading Chinese and English text rendering capabilities, suitable for posters and commercial design' },
        { title: isZh ? '照片级真实感' : 'Photorealistic Quality', desc: isZh ? '60亿参数确保输出具有照片般的真实质感和细腻纹理' : '6 billion parameters ensure output with photorealistic texture and delicate details' },
        { title: isZh ? '批量处理优化' : 'Batch Processing Optimization', desc: isZh ? '针对批量生成场景优化，适合电商和内容营销团队' : 'Optimized for batch generation scenarios, suitable for e-commerce and content marketing teams' },
      ],
    },
    {
      name: 'Flux Kontext',
      title: isZh ? 'Flux Kontext:智能图生图和文生图(带上下文)' : 'Flux Kontext: Smart image-to-image and text-to-image generation (with context)',
      desc: isZh ? 'Black Forest Labs 出品，具备强大的上下文理解能力，擅长保持风格一致性。' : 'Developed by Black Forest Labs, possessing powerful context understanding capabilities, excelling at maintaining style consistency.',
      features: [
        { title: isZh ? '上下文感知生成' : 'Context-Aware Generation', desc: isZh ? '理解图片上下文，在图生图转换中保持元素间的逻辑关系' : 'Understands image context, maintains logical relationships between elements in image-to-image transformations' },
        { title: isZh ? '风格一致性' : 'Style Consistency', desc: isZh ? '系列图片生成时自动保持统一的视觉风格和色调' : 'Automatically maintains a unified visual style and tone when generating a series of images' },
        { title: isZh ? '精确提示词跟随' : 'Precise Prompt Following', desc: isZh ? '业界顶级的提示词理解能力，精确还原您描述的每个细节' : 'Industry-leading prompt understanding capability, precisely reproduces every detail you describe' },
        { title: isZh ? '专业构图控制' : 'Professional Composition Control', desc: isZh ? '支持精细的构图参数调节，适合专业设计工作流程' : 'Supports fine-grained composition parameter adjustment, suitable for professional design workflows' },
      ],
    },
    {
      name: 'GPT-4o Vision',
      title: isZh ? 'GPT-4o Vision：对话驱动的图生图与文生图' : 'GPT-4o Vision: Conversation-driven image-to-image and text-to-image generation',
      desc: isZh ? 'OpenAI 最新视觉模型，支持自然对话式的图像创作和编辑。' : 'OpenAI latest vision model, supports natural conversational image creation and editing.',
      features: [
        { title: isZh ? '对话式图像编辑' : 'Conversational Image Editing', desc: isZh ? '通过自然语言对话描述修改需求，AI智能理解并执行精确编辑' : 'Describes modification requirements through natural language conversation, AI intelligently understands and performs precise edits' },
        { title: isZh ? '多轮迭代优化' : 'Multi-round Iterative Optimization', desc: isZh ? '支持连续对话逐步优化图像，直到满意为止' : 'Supports continuous conversation to gradually optimize images until satisfied' },
        { title: isZh ? '复杂场景理解' : 'Complex Scene Understanding', desc: isZh ? '深度理解图片中的场景、人物和物体关系，实现精准编辑' : 'Deeply understands scenes, characters, and object relationships in images, enabling precise editing' },
        { title: isZh ? '创意概念生成' : 'Creative Concept Generation', desc: isZh ? '擅长将抽象概念和创意想法转化为具体的视觉表现' : 'Excels at transforming abstract concepts and creative ideas into concrete visual representations' },
      ],
    },
    {
      name: isZh ? 'Qwen 图像编辑' : 'Qwen Image Edit',
      title: isZh ? 'Qwen 图像编辑：面向技术插图的精准图生图与文生图' : 'Qwen Image Edit: Precise image-to-image and text-to-image generation for technical illustrations',
      desc: isZh ? 'Qwen Image Edit 是您进行高精度图生图转换和文生图创作的首选工具，尤其适用于技术插图、图表和精细概念艺术。' : 'Qwen Image Edit is your preferred tool for high-precision image-to-image conversion and text-to-image creation, especially suitable for technical illustrations, diagrams, and fine concept art.',
      features: [
        { title: isZh ? '技术插图精准度' : 'Technical Illustration Precision', desc: isZh ? '对线条、形状和复杂元素提供卓越控制，确保每个像素精准无误' : 'Provides excellent control over lines, shapes, and complex elements, ensuring every pixel is accurate' },
        { title: isZh ? '图表与信息图' : 'Charts and Infographics', desc: isZh ? '专为技术文档和数据可视化优化，生成清晰专业的图表' : 'Optimized for technical documentation and data visualization, generates clear and professional charts' },
        { title: isZh ? '精细局部编辑' : 'Fine-grained Local Editing', desc: isZh ? '支持画笔级别的精确编辑，在不影响其他区域的情况下修改特定部分' : 'Supports brush-level precise editing, modifying specific parts without affecting other areas' },
        { title: isZh ? '矢量化风格输出' : 'Vectorized Style Output', desc: isZh ? '生成适合放大和印刷的高精度图像，边缘清晰锐利' : 'Generate high-precision images suitable for enlargement and printing, with clear and sharp edges' },
      ],
    },
  ];

  const WHY_TABS = [
    {
      label: isZh ? '双模式' : 'Dual Mode',
      title: isZh ? '双重生成模式：图生图与文生图' : 'Dual Generation Modes: Image-to-Image and Text-to-Image',
      desc: isZh ? 'Banana Pro AI 让您在一个平台上同时使用图生图转换和文生图生成。上传照片应用AI风格变换，或输入文字描述创建全新图像。两种模式无缝切换，互为补充——先用文生图创建基础图像，再用图生图进行精修完善。' : 'Banana Pro AI allows you to use both image-to-image conversion and text-to-image generation on a single platform. Upload photos to apply AI style transformations, or enter text descriptions to create entirely new images. The two modes switch seamlessly and complement each other—first use text-to-image to create a base image, then use image-to-image for refinement and perfection.',
      features: ['图生图：上传照片，AI转换风格', '文生图：描述创意，AI生成图像', '两种模式一键切换', '免费账户包含双模式完整访问'],
    },
    {
      label: isZh ? '专业品质' : 'Professional Quality',
      title: isZh ? '专业级图像到图像转换' : 'Professional-Grade Image-to-Image Conversion',
      desc: isZh ? '我们的图生图引擎采用前沿AI模型（包括Google Gemini Imagen），在转换中保留关键细节并应用精妙的风格变化。文生图同样输出媲美专业设计师的高质量作品。' : 'Our image-to-image engine utilizes cutting-edge AI models (including Google Gemini Imagen) to preserve key details and apply subtle style changes during conversion. Text-to-image also produces high-quality works comparable to those of professional designers.',
      features: ['5种AI模型可选', '照片级真实感输出', '智能细节保留技术', '适合商业用途的专业品质'],
    },
    {
      label: isZh ? '即时结果' : 'Instant Results',
      title: isZh ? '即时结果：快速图像到图像处理' : 'Instant Results: Fast Image-to-Image Processing',
      desc: isZh ? '大多数图生图转换仅需5-10秒，Z-Image Turbo模型低至3-5秒。快速迭代让您在几分钟内探索多种创作方向。' : 'Most image-to-image conversions take only 5-10 seconds, with the Z-Image Turbo model as low as 3-5 seconds. Rapid iteration allows you to explore multiple creative directions in minutes.',
      features: ['图生图转换：5-10秒', 'Turbo模型：3-5秒', '文生图生成：8-15秒', '免费账户享同等速度'],
    },
    {
      label: isZh ? '无水印' : 'No Watermarks',
      title: isZh ? '无水印，完全创作自由' : 'No Watermarks, Complete Creative Freedom',
      desc: isZh ? '所有图生图转换和文生图创作在下载时均无水印。您保留作品完全所有权，可自由用于商业项目、社交媒体、营销材料或个人用途。' : 'All image-to-image conversions and text-to-image creations are watermark-free upon download. You retain full ownership of your work, free to use it for commercial projects, social media, marketing materials, or personal use.',
      features: ['下载零水印', '完全商业使用权', '高分辨率输出', '完全所有权归您'],
    },
    {
      label: isZh ? '云存储' : 'Cloud Storage',
      title: isZh ? '云存储您的所有创作' : 'Cloud Storage for All Your Creations',
      desc: isZh ? '每一张图生图和文生图作品都自动保存到您的安全云端素材库。随时随地访问、管理和下载。免费账户包含无限云存储空间。' : 'Every image-to-image and text-to-image creation is automatically saved to your secure cloud asset library. Access, manage, and download anytime, anywhere. Free accounts include unlimited cloud storage.',
      features: ['自动云端保存', '无限存储空间', '随时随地访问', '作品管理与整理'],
    },
  ];

  const USE_CASES = [
    {
      title: isZh ? '摄影师与视觉艺术家' : 'Photographers and Visual Artists',
      desc: isZh ? '使用图生图和文生图工具提升您的艺术创作水平。应用实验性风格、为客户创建多种方案，或探索新方向而无需重新拍摄。转换作品集素材或在制作前生成创意概念。免费无限次转换，助您打造作品集而不受预算限制。' : 'Elevate your artistic creations with image-to-image and text-to-image tools. Apply experimental styles, create multiple options for clients, or explore new directions without reshooting. Transform portfolio assets or generate creative concepts before production. Free unlimited conversions help you build your portfolio without budget constraints.',
      hasComparison: true,
    },
    {
      title: isZh ? '营销与社交媒体团队' : 'Marketing and Social Media Teams',
      desc: isZh ? '双重AI能力助力内容生产提速增效。通过图生图功能从单张照片创建数十种变体。使用文生图生成符合品牌调性的图形和营销素材。在保持跨平台一致性的同时，将设计成本降低75%。' : 'Dual AI capabilities accelerate and enhance content production. Create dozens of variations from a single photo using the image-to-image feature. Generate brand-aligned graphics and marketing materials with text-to-image. Reduce design costs by 75% while maintaining cross-platform consistency.',
      image: 'https://static.banana2ai.net/images/features/nmodnhmzoinn.webp',
    },
    {
      title: isZh ? '电子商务与在线商店' : 'E-commerce and Online Stores',
      desc: isZh ? '利用图生图技术改造产品视觉效果。移除背景、更换场景，无需拍摄即可创建生活方式图像。从单张照片生成多个角度。搭配文生图功能制作营销素材，提升转化率。' : 'Transform product visuals with image-to-image technology. Remove backgrounds, change scenes, and create lifestyle images without a photoshoot. Generate multiple angles from a single photo. Combine with text-to-image to produce marketing materials and boost conversion rates.',
      image: 'https://static.banana2ai.net/images/features/oymo6e4j50qi.webp',
    },
    {
      title: isZh ? '内容创作者与数字出版商' : 'Content Creators and Digital Publishers',
      desc: isZh ? '借助 AI 工具激发无限创作。使用文本生成图像创建自定义插图。通过图像生成图像将库存照片转换为独特的品牌视觉内容。保持稳定的发布节奏并提升互动率，无需订阅费用。' : 'Unleash unlimited creativity with AI tools. Create custom illustrations using text-to-image. Transform stock photos into unique branded visual content with image-to-image. Maintain a consistent publishing schedule and boost engagement rates, without subscription fees.',
      image: 'https://static.banana2ai.net/images/features/ldvemdrtofq8.webp',
    },
  ];

  const CASE_STUDIES = [
    {
      icon: Palette,
      title: isZh ? '电商产品摄影' : 'E-commerce Product Photography',
      desc: isZh ? '将基础产品图转化为专业的生活场景图片，配以不同背景和光效——无需实拍。可生成多个版本用于A/B测试和营销活动。企业反馈成本降低60%，制作速度提升3倍。' : 'Transform basic product images into professional lifestyle scenes with different backgrounds and lighting effects—no actual photoshoot needed. Generate multiple versions for A/B testing and marketing campaigns. Businesses report a 60% reduction in costs and a 3x increase in production speed.',
    },
    {
      icon: ShoppingBag,
      title: isZh ? '规模化社交媒体内容' : 'Scalable Social Media Content',
      desc: isZh ? '使用文本生成图像创建原创图形，然后通过图像生成图像制作多平台变体。将单张照片转换为适用于 Instagram、TikTok、Pinterest 的多种风格。创作者反馈发布一致性提升 200%，互动率提高 45%。' : 'Create original graphics using text-to-image, then produce multi-platform variations with image-to-image. Convert a single photo into multiple styles suitable for Instagram, TikTok, and Pinterest. Creators report a 200% increase in publishing consistency and a 45% boost in engagement rates.',
    },
    {
      icon: GraduationCap,
      title: isZh ? '营销活动策划' : 'Marketing Campaign Planning',
      desc: isZh ? '快速生成数十种主视觉图变体以进行测试。为全球市场本地化内容。创建与信息传达一致的定制图形。团队反馈产品上线速度提升 65%，创意测试效果提升 40%。' : 'Quickly generate dozens of main visual variations for testing. Localize content for global markets. Create custom graphics consistent with your messaging. Teams report a 65% increase in product launch speed and a 40% improvement in creative testing effectiveness.',
    },
    {
      icon: Gamepad2,
      title: isZh ? '艺术探索与概念开发' : 'Artistic Exploration and Concept Development',
      desc: isZh ? '将草图转化为完整渲染的艺术作品。即时探索不同风格，生成参考素材，或在无需从头开始的情况下创建变体。艺术家反馈能够更快突破创作瓶颈，并探索多达5倍的创作方向。' : 'Transform sketches into fully rendered artworks. Instantly explore different styles, generate reference materials, or create variations without starting from scratch. Artist feedback helps break through creative blocks faster and explore up to 5 times more creative directions.',
    },
  ];

  const TESTIMONIALS = [
    {
      quote: isZh ? 'Banana Pro AI 的图生图功能彻底改变了我们整个产品摄影工作流程。现在我们只需几秒钟就能从基础产品照片生成专业的生活场景图。免费的文生图工具为我们创建营销活动图形和季节性促销素材。我们削减了 70% 的摄影成本，同时实际上还提升了视觉质量。' : 'Banana Pro AI’s image-to-image feature has completely revolutionized our entire product photography workflow. Now we can generate professional lifestyle scene images from basic product photos in just seconds. The free text-to-image tool helps us create marketing campaign graphics and seasonal promotion materials. We have cut photography costs by 70% while actually improving visual quality.',
      name: 'Jessica Chen',
      role: isZh ? 'TechStyle Online 电商总监' : 'Ecommerce Director, TechStyle Online',
      avatar: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp',
    },
    {
      quote: isZh ? '作为一名艺术家，Banana Pro AI 的图生图和文生图组合功能为我带来了前所未有的创作自由。在最终确定作品之前，我会使用图生图探索数十种风格变化。文生图帮助我即时将客户的概念可视化。我的创作产出增加了两倍，并且赢得了更大的委托项目。' : 'As an artist, Banana Pro AI’s combined image-to-image and text-to-image features have given me unprecedented creative freedom. I use image-to-image to explore dozens of style variations before finalizing a piece. Text-to-image helps me instantly visualize client concepts. My creative output has doubled, and I have won larger commissioned projects.',
      name: 'Marcus Rodriguez',
      role: isZh ? '数字插画师与独立艺术家' : 'Digital Illustrator and Independent Artist',
      avatar: 'https://static.banana2ai.net/images/avatars/k1zo5dpjyh3y.webp',
    },
    {
      quote: isZh ? '我们的代理公司需要扩大视觉内容规模，但又不想增加设计师人手。Banana Pro AI 就是我们的解决方案。图生图转换质量可媲美昂贵的替代产品，而文生图功能可以处理从主视觉到社交媒体帖子的所有内容。客户视觉内容产出提升了 400%。' : 'Our agency needed to scale visual content without increasing our design team. Banana Pro AI was our solution. The image-to-image conversion quality rivals expensive alternatives, and the text-to-image feature handles everything from hero visuals to social media posts. Client visual content output has increased by 400%.',
      name: 'Sarah Mitchell',
      role: isZh ? 'GrowthHub Agency 营销经理' : 'Marketing Manager, GrowthHub Agency',
      avatar: 'https://static.banana2ai.net/images/avatars/l8af5arb7l0d.webp',
    },
    {
      quote: isZh ? '每天创作内容让我精疲力竭，直到我发现了 Banana Pro AI。图生图功能将我的旧照片转换成新风格，适配不同平台。文生图功能在我缺乏灵感时生成原创图形。我的互动率提升了 55%，因为我的视觉内容现在始终保持专业且独特。' : 'Creating content daily was exhausting until I discovered Banana Pro AI. The image-to-image feature transforms my old photos into new styles, adapting them for different platforms. The text-to-image feature generates original graphics when I lack inspiration. My engagement rate has increased by 55% because my visual content now consistently looks professional and unique.',
      name: 'David Park',
      role: isZh ? '内容创作者 @DavidCreates · 50万粉丝' : 'Content Creator @DavidCreates · 500K Followers',
      avatar: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
    },
  ];

  const FAQ_ITEMS = [
    {
      q: isZh ? 'Banana Pro AI 上的图生图和文生图有什么区别?' : 'What is the difference between image-to-image and text-to-image on Banana Pro AI?',
      a: isZh ? `图生图转换功能可将您现有的照片应用AI驱动的修改——风格变化、艺术效果、构图调整或完全的视觉重塑。上传照片，使用Banana Pro AI的先进图生图技术进行转换。\n\n文生图生成功能可根据文字描述创建全新的图像。只需描述您想要的内容，Banana Pro AI的文生图AI即可从零开始生成专业级艺术作品。\n\n图生图和文生图功能均包含在您的免费Banana Pro AI账户中。` : `The Image-to-Image conversion feature allows you to apply AI-driven modifications to your existing photos—style changes, artistic effects, composition adjustments, or complete visual reimagining. Upload your photos and use Banana Pro AI’s advanced Image-to-Image technology to transform them.

The Text-to-Image generation feature creates entirely new images based on text descriptions. Simply describe what you want, and Banana Pro AI’s Text-to-Image AI will generate professional-grade artwork from scratch.

Both Image-to-Image and Text-to-Image features are included in your free Banana Pro AI account.`,
    },
    {
      q: isZh ? 'Banana Pro AI 的图生图和文生图真的免费吗?' : 'Are Banana Pro AI’s image-to-image and text-to-image truly free?',
      a: isZh ? `是的！Banana Pro AI 为您的免费账户提供免费的图生图转换和文生图生成功能。免费注册即可获得每日积分，用于创建专业视觉内容。注册无需信用卡。\n\n免费账户包含：无限次图生图转换（基于积分）、完整的文生图生成访问权限、所有 AI 模型、下载文件零水印、安全云存储、高分辨率输出。` : `Yes! Banana Pro AI offers free Image-to-Image conversion and Text-to-Image generation features for your free account. Register for free to receive daily credits for creating professional visual content. No credit card is required for registration.

Your free account includes: Unlimited Image-to-Image conversions (credit-based), full Text-to-Image generation access, all AI models, zero watermarks on downloaded files, secure cloud storage, and high-resolution output.`,
    },
    {
      q: isZh ? 'Banana Pro AI 的图生图质量与其他工具相比如何?' : 'How does Banana Pro AI’s image-to-image quality compare to other tools?',
      a: isZh ? `Banana Pro AI的图生图引擎采用前沿AI模型，包括Google的Gemini Imagen技术。我们的图生图转换在应用精妙的艺术效果和风格迁移的同时，能够保留关键细节。\n\n核心优势：图生图转换中卓越的细节保留能力、处理速度更快（5-10秒）、多种AI模型优化、稳定的专业品质、免费使用且无质量损失。` : `Banana Pro AI’s Image-to-Image engine utilizes cutting-edge AI models, including Google’s Gemini Imagen technology. Our Image-to-Image conversions preserve key details while applying subtle artistic effects and style transfers.

Key advantages: Exceptional detail preservation in Image-to-Image conversions, faster processing speed (5-10 seconds), optimized for multiple AI models, consistent professional quality, and free to use with no quality loss.`,
    },
    {
      q: isZh ? '我可以在一个项目中同时使用图生图和文生图吗?' : 'Can I use both image-to-image and text-to-image in one project?',
      a: isZh ? `当然可以！Banana Pro AI 平台专为灵活的创意工作流程而设计，可无缝结合图生图和文生图功能。\n\n常用组合方式：使用文生图生成基础图像然后通过图生图创建变体、从上传的照片开始进行图生图转换再用文生图元素增强、使用文生图进行概念探索然后通过图生图优化。` : `Absolutely! The Banana Pro AI platform is designed for flexible creative workflows, seamlessly combining Image-to-Image and Text-to-Image features.

Common combination methods: Use Text-to-Image to generate a base image, then create variations with Image-to-Image; start with an uploaded photo for Image-to-Image conversion, then enhance it with Text-to-Image elements; use Text-to-Image for concept exploration, then refine with Image-to-Image.`,
    },
    {
      q: isZh ? 'Banana Pro AI 的图片转图片功能支持哪些图片格式?' : 'What image formats does Banana Pro AI’s image-to-image feature support?',
      a: isZh ? `Banana Pro AI 的图生图功能支持所有标准图片格式：JPEG/JPG、PNG（支持透明度）、WebP、BMP 及其他常见格式。\n\n上传限制：最大文件大小每张图片 20MB、推荐分辨率最高 4K、支持批量处理。文生图默认输出高质量 PNG 文件，支持多种宽高比。` : `Banana Pro AI’s Image-to-Image feature supports all standard image formats: JPEG/JPG, PNG (with transparency support), WebP, BMP, and other common formats.

Upload limits: Maximum file size of 20MB per image, recommended resolution up to 4K, and batch processing supported. Text-to-Image defaults to outputting high-quality PNG files and supports various aspect ratios.`,
    },
    {
      q: isZh ? '使用图生图和文生图功能需要注册吗?' : 'Is registration required to use the image-to-image and text-to-image features?',
      a: isZh ? `是的，Banana Pro AI 需要免费注册账户才能使用图生图转换和文生图生成功能。注册快速便捷（不到 60 秒），无需信用卡。\n\n注册后即可获得：每日免费积分、安全云端存储、完整AI模型库访问、偏好设置保存、生成历史记录。` : `Yes, Banana Pro AI requires a free account registration to use the Image-to-Image conversion and Text-to-Image generation features. Registration is quick and easy (under 60 seconds), and no credit card is required.

Upon registration, you will receive: Daily free credits, secure cloud storage, full AI model library access, saved preferences, and generation history.`,
    },
    {
      q: isZh ? '我可以将 Banana Pro AI 的图生图和文生图作品用于商业用途吗?' : 'Can I use Banana Pro AI’s image-to-image and text-to-image creations for commercial purposes?',
      a: isZh ? `是的！免费的 Banana Pro AI 账户包含图生图转换和文生图生成的商业使用权。\n\n商业使用包括：营销材料和广告、社交媒体内容、网站图形和横幅、产品列表和电商视觉素材、客户项目和代理业务、印刷材料和商品。所有作品下载时均无水印。` : `Yes! A free Banana Pro AI account includes commercial usage rights for Image-to-Image conversion and Text-to-Image generation.

Commercial use includes: Marketing materials and advertisements, social media content, website graphics and banners, product listings and e-commerce visuals, client projects and agency work, and print materials and merchandise. All creations are downloaded without watermarks.`,
    },
    {
      q: isZh ? 'Banana Pro AI 的图像到图像和文本到图像处理速度有多快?' : 'How fast is Banana Pro AI’s image-to-image and text-to-image processing?',
      a: isZh ? `图生图处理：标准转换5-10秒、批量处理同时多张、Z-Image Turbo模型仅需3-5秒。\n\n文生图生成：大多数创作8-15秒、简单提示词最快5秒、复杂场景15-20秒。免费账户享有与高级用户相同的处理速度。` : `Image-to-Image processing: Standard conversions 5-10 seconds, batch processing for multiple images simultaneously, Z-Image Turbo model takes only 3-5 seconds.

Text-to-Image generation: Most creations 8-15 seconds, simple prompts as fast as 5 seconds, complex scenes 15-20 seconds. Free accounts enjoy the same processing speeds as premium users.`,
    },
  ];

  const [activeModel, setActiveModel] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [comparePos, setComparePos] = useState(50);
  const compareRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Testimonial auto-rotate
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Before/after slider
  const handleCompareMove = useCallback((clientX: number) => {
    if (!compareRef.current) return;
    const rect = compareRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setComparePos(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      handleCompareMove(x);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleCompareMove]);

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
                  <span className="mr-2">Banana Pro AI：</span>
                  <span className="gradient-text">高级图生图编辑器</span>
                </span>
                <span className="mx-auto mt-3 block h-0.5 w-44 rounded-full bg-gradient-to-r from-transparent via-[#ffcc33] to-transparent opacity-60 md:mt-4" />
              </h1>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            {/* Left text */}
            <FadeIn className="text-center lg:text-left" delay={0.15}>
              <div className="space-y-4 md:space-y-6">
                <h2 className="gradient-glow-text text-lg font-bold leading-snug md:text-2xl lg:text-3xl">
                  将任何照片转换为精美艺术作品
                </h2>
                <p className="text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
                  上传您的图片，即刻体验AI图生图技术带来的专业级转换效果。从风格迁移到完全重构——让AI放大您的创意愿景。
                </p>
                <FadeIn delay={0.3}>
                  <Link
                    href="/zh/image/banana-pro-ai/"
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
                {/* Feature list */}
                <div className="hidden space-y-3 lg:block">
                  {[
                    { icon: Zap, text: isZh ? '闪电般快速的图像到图像转换' : 'Lightning-fast image-to-image conversion' },
                    { icon: Star, text: isZh ? 'AI 驱动的文本生成图像' : 'AI-powered text-to-image generation' },
                    { icon: Shield, text: isZh ? '所有作品零水印' : 'Zero watermarks on all creations' },
                    { icon: Cloud, text: isZh ? '安全的云端存储' : 'Secure cloud storage' },
                  ].map((f, i) => (
                    <FadeIn key={i} delay={0.4 + i * 0.1} className="flex items-center gap-3">
                      <f.icon className="h-4 w-4 text-[#ffcc33]" />
                      <span className="text-sm font-medium md:text-base">{f.text}</span>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right - hero image */}
            <FadeIn className="relative mx-auto w-full max-w-lg lg:max-w-none" delay={0.2}>
              <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://static.banana2ai.net/images/showcase/canvas-workflow.webp"
                    alt="AI 图像创作"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-[#ffcc33]/20 md:rounded-3xl" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── 2. Image Generator ─── */}
      <section className="px-4 py-4">
        <div className="mx-auto max-w-[1400px]">
          <ImageGenerator examples={IMAGE_LIST_EXAMPLES} />
        </div>
      </section>

      {/* ─── 3. More AI Image Generators Grid ─── */}
      <section className="px-4 py-8 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <p className="gradient-glow-text mb-2 text-lg font-bold leading-tight sm:text-xl md:mb-4 md:text-2xl lg:text-3xl xl:text-4xl">
              更多 AI 图像生成器
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mx-auto mb-4 max-w-4xl text-xs text-white/50 sm:text-sm md:mb-10 md:text-base">
              探索我们的专业AI图像生成器合集，专为不同的创意需求和风格而设计
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative rounded-xl p-2 sm:p-4 md:rounded-2xl md:p-8 lg:p-12">
              <div className="relative grid grid-cols-4 grid-rows-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8" style={{ height: 'clamp(200px, 40vw, 500px)' }}>
                {MODEL_GRID.map((m, i) => (
                  <Link
                    key={i}
                    href={`/zh/image/${m.slug}/`}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-[#363b4e] bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#ffcc33]/60">
                      <Image src={m.image} alt={m.name} width={400} height={300} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex h-8 items-center justify-center bg-[#13151f] px-1 py-1 text-center sm:h-10 md:h-12 lg:h-14">
                      <span className="line-clamp-2 text-xs font-bold text-white transition-colors duration-300 group-hover:text-[#ffcc33] sm:text-sm md:text-base">
                        {m.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
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
              4个简单步骤：从创意到专业图像
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-5xl md:text-base">
              几分钟内即可创建令人惊艳的图生图转换和文生图作品。Banana Pro AI 让专业级视觉创作人人可及。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative z-10 flex flex-wrap justify-center gap-8 md:flex-nowrap">
              {STEPS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="group relative w-full max-w-[280px] overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10 sm:w-[280px]">
                    {/* Number badge */}
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
                  {/* Arrow connector */}
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

      {/* ─── 5. AI Models Explorer ─── */}
      <section className="relative bg-gradient-to-b from-[#0f1117] via-[#161926] to-[#0f1117] px-4 py-12 md:py-24">
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-8 text-center md:mb-16">
            <h2 className="gradient-text mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
              探索我们的先进AI图像模型
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/70 md:max-w-4xl md:text-base">
              Banana Pro AI 提供一系列强大的图生图和文生图模型，每个模型都针对独特的创作需求进行了优化。
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {/* Left: model tabs */}
            <div className="md:col-span-1">
              <div className="space-y-3">
                {AI_MODELS.map((m, i) => (
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
                    <span className={`ml-4 text-sm font-semibold ${activeModel === i ? 'text-white' : ''}`}>
                      {m.name}
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-colors ${activeModel === i ? 'text-[#ffcc33]' : 'text-white/30'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: model details */}
            <div className="md:col-span-2">
              <div className="rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 p-6 md:p-8">
                <h2 className="gradient-glow-text mb-4 text-xl font-bold md:text-2xl lg:text-3xl">
                  {AI_MODELS[activeModel].title}
                </h2>
                <p className="mb-8 text-sm leading-relaxed text-white/75 md:text-base">
                  {AI_MODELS[activeModel].desc}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {AI_MODELS[activeModel].features.map((f, i) => (
                    <div
                      key={i}
                      className="group rounded-lg border border-[#363b4e]/40 bg-[#13151f]/50 p-4 transition-all duration-300 hover:border-[#ffcc33]/40 hover:bg-[#1c2030]/80"
                    >
                      <h3 className="mb-2 flex items-start text-base font-semibold transition-colors duration-300 group-hover:text-[#ffcc33] md:text-lg">
                        {f.title}
                      </h3>
                      <p className="text-sm text-white/60">{f.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/zh/image/banana-pro-ai/" className="highlight-button inline-flex items-center gap-2 px-6 py-3">
                    立即免费试用 <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Why Choose ─── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-8 text-center md:mb-16">
            <h2 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
              为什么选择 Banana Pro AI 生成图像?
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Pro AI 将强大的图生图转换与直观的文生图生成相结合。我们的平台专为追求专业效果而不想面对复杂操作的创作者而设计。
            </p>
          </FadeIn>

          {/* Tabs */}
          <div className="relative mb-8 md:mb-12">
            {/* Mobile */}
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
            {/* Desktop */}
            <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-4">
              {WHY_TABS.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === i
                      ? 'bg-gradient-to-r from-[#ffcc33] to-[#ff9900] text-black shadow-lg shadow-[#ffcc33]/20'
                      : 'border border-[#363b4e] bg-[#13151f] text-white/60 hover:border-[#ffcc33]/30 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <FadeIn key={activeTab}>
            <div className="rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 p-6 md:p-10">
              <h3 className="mb-2 text-2xl font-bold md:mb-4 md:text-3xl lg:text-4xl">
                {WHY_TABS[activeTab].title}
              </h3>
              <p className="mb-6 text-sm text-white/70 md:text-base">
                {WHY_TABS[activeTab].desc}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {WHY_TABS[activeTab].features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffcc33]/10">
                      <Zap className="h-3.5 w-3.5 text-[#ffcc33]" />
                    </div>
                    <span className="text-sm text-white/80 md:text-base">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 7. Use Cases ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="relative z-10 mb-20 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              图生图与文生图，为每一位创作者而生
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Pro AI 为各行业创作者提供免费的专业级图生图和文生图功能。无论您是独立创作者还是团队成员，我们的 AI 驱动平台都能随您的目标不断扩展。
            </p>
          </FadeIn>

          <div className="space-y-36 md:space-y-56">
            {USE_CASES.map((uc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                  {/* Image/Comparison */}
                  <FadeIn className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative flex items-center justify-center overflow-hidden rounded-3xl py-4 shadow-lg" style={{ minHeight: 300 }}>
                      {uc.hasComparison ? (
                        /* Before/After slider */
                        <div
                          ref={compareRef}
                          className="relative w-full overflow-hidden rounded-lg"
                          style={{ aspectRatio: '16/9' }}
                          onMouseDown={() => { isDragging.current = true; }}
                          onTouchStart={() => { isDragging.current = true; }}
                        >
                          <Image src="https://static.banana2ai.net/images/features/oymo6e4j50qi.webp" alt="之前" fill className="object-cover" />
                          <div className="absolute bottom-4 left-4 rounded-full bg-black/70 px-3 py-1 text-sm">之前</div>
                          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${comparePos}%)` }}>
                            <Image src="https://static.banana2ai.net/images/features/nmodnhmzoinn.webp" alt="之后" fill className="object-cover" />
                            <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm">之后</div>
                          </div>
                          <div
                            className="absolute top-0 bottom-0 z-10 w-0.5 cursor-ew-resize bg-white shadow-lg"
                            style={{ left: `${comparePos}%`, transform: 'translateX(-50%)' }}
                          >
                            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
                              <div className="flex items-center space-x-0.5">
                                <div className="h-5 w-1 rounded-full bg-gray-400" />
                                <div className="h-5 w-1 rounded-full bg-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : uc.image ? (
                        <div className="group relative h-auto max-h-full w-auto max-w-full overflow-hidden rounded-lg">
                          <Image
                            src={uc.image}
                            alt={uc.title}
                            width={800}
                            height={500}
                            className="max-h-[550px] max-w-full rounded-lg object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                        </div>
                      ) : null}
                    </div>
                  </FadeIn>
                  {/* Text */}
                  <FadeIn className={`mt-10 lg:mt-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`} delay={0.15}>
                    <div className="lg:px-8">
                      <h3 className="gradient-glow-text mb-6 text-3xl md:text-4xl">{uc.title}</h3>
                      <p className="text-base text-white/90 md:text-lg">{uc.desc}</p>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 8. Case Studies ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="relative z-10 mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              真实案例：图生图与文生图应用
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              了解创作者和企业如何使用 Banana Pro AI 的免费图生图转换和文生图生成功能来实现专业效果。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {CASE_STUDIES.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10">
                  <div className="badge-gradient absolute left-0 right-0 top-0 h-1 opacity-80" />
                  <div className="relative z-10 p-8">
                    <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#13151f]/50 p-3 transition-all duration-300 group-hover:border-[#ffcc33]/60 group-hover:shadow-lg group-hover:shadow-[#ffcc33]/20">
                      <cs.icon className="h-8 w-8 text-[#ffcc33]" />
                    </div>
                    <h3 className="gradient-glow-text mb-3 text-lg font-semibold transition-all duration-300 group-hover:scale-[1.02] md:text-xl">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-white/50 md:text-base">{cs.desc}</p>
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
              创作者都喜爱 Banana Pro AI 的图生图生成器
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              数千名专业人士信赖 Banana Pro AI 来满足他们的图生图转换和文生图生成需求。
            </p>
          </FadeIn>

          <div className="relative rounded-xl border border-[#363b4e] bg-[#0f1117] p-6 shadow-lg md:p-12">
            <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#ffcc33] opacity-[0.03] blur-3xl" />
            <div className="absolute left-8 top-8 z-0 font-serif text-7xl text-[#ffcc33] opacity-30">&ldquo;</div>
            <div className="relative z-10 flex flex-col">
              {/* Quotes */}
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

              {/* Authors */}
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

              {/* Controls */}
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
              图像生成图像 &amp; 文本生成图像：常见问题解答
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              关于 Banana Pro AI 免费的图像转图像变换和文本生成图像功能，您需要了解的一切都在这里。
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
            {/* Left text */}
            <FadeIn className="mb-12 text-center lg:mb-0 lg:text-left">
              <div className="lg:pr-8">
                <h2 className="gradient-glow-text mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  立即开始创作专业的图生图和文生图内容
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                  加入数千名创作者、设计师和企业，使用 Banana Pro AI 的免费图生图转换和文生图生成工具。免费注册，无需信用卡。60 秒内体验专业的 AI 视觉创作。
                </p>
                <Link
                  href="/zh/image/banana-pro-ai/"
                  className="highlight-button group inline-flex items-center px-8 py-3 text-lg"
                >
                  立即免费开始创作
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>

            {/* Right image with radial mask */}
            <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none" delay={0.15}>
              <div
                className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl"
                style={{
                  maskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)',
                }}
              >
                <Image
                  src="https://static.banana2ai.net/images/cta-cover.webp"
                  alt="开始创作"
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
