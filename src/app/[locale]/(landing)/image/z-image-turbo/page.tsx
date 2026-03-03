'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { Z_IMAGE_TURBO_EXAMPLES } from '@/data/page-examples';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Why Section Tabs Data ─── */

/* ─── Technology ─── */

/* ─── Steps ─── */

/* ─── Use Cases ─── */

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
const TESTIMONIALS = [
  { name: 'Marcus Chen', role: 'Creative Director, Digital Marketing Agency', avatar: 'https://static.banana2ai.net/images/avatars/cv3ypbf94ef5.webp', quote: 'Z Image Turbo has completely revolutionized our content production workflow! As a marketing agency, we need to generate hundreds of campaign assets every month. The sub-second generation speed is incredible—what used to take hours now takes minutes. The realistic image quality rivals professional photography, and our clients cant tell the difference.' },
  { name: 'Sofia Rodriguez', role: 'E-commerce Visual Content Manager', avatar: 'https://static.banana2ai.net/images/avatars/zrkrexmu2koo.webp', quote: 'Z Image Turbos text rendering capability is unparalleled! I create bilingual marketing materials for our international e-commerce platform. Finally, an AI image generator that perfectly renders both Chinese and English characters. Product labels, logos, and promotional graphics look incredibly professional.' },
  { name: 'James Patterson', role: 'Freelance Digital Artist and Illustrator', avatar: 'https://static.banana2ai.net/images/avatars/q0sy9gl2cw07.webp', quote: 'Z Image Turbo has completely reshaped my creative process. As a freelance illustrator, I use it for rapid concept exploration and client presentations. The 8-step generation allows me to iterate instantly. Realistic output means I can present polished concepts in the very first meeting. Project cycles are shortened by 60%.' },
  { name: 'Priya Sharma', role: 'Tech Startup Founder', avatar: 'https://static.banana2ai.net/images/avatars/edssw31z3vjs.webp', quote: 'Z Image Turbo is crucial for our startups lean operations. We need professional product images but cant afford expensive photoshoots. This tool instantly creates realistic product images, social media content, and website banners. The Apache 2.0 license means we dont have to worry about legal risks.' },
  { name: 'Alexandra Kim', role: 'Social Media Blogger and Content Creator', avatar: 'https://static.banana2ai.net/images/avatars/zpbjfchv5agj.webp', quote: 'Z Image Turbos speed supports my daily content update rhythm. I post three times a day across various platforms, and this AI tool makes it sustainable. The realistic image quality keeps my 200,000 followers engaged. Rapid iteration allows me to test different styles and optimize engagement. A must-have tool for bloggers.' },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const WHY_TABS = [
    {
      label: isZh ? '闪电级速度' : 'Lightning-fast speed',
      title: isZh ? '基于 60 亿参数模型的亚秒级生成速度' : 'Sub-second generation speed based on a 6 billion parameter model',
      highlight: isZh ? '革命性的 8 步图像生成技术' : 'Revolutionary 8-step image generation technology',
      image: 'https://static.banana2ai.net/images/features/bwt679t7lek1.webp',
      body: isZh ? 'Z Image Turbo 以亚秒级的创作时间重新定义了 AI 图像生成器的性能。我们的 60 亿参数模型仅需 8 步推理，是目前最快的文生图方案之一。PrunaAI 优化结合了缓存、编译和量化技术，在不降低质量的情况下实现了极致速度。无论是快速原型设计、创意探索还是高产量制作工作流，都能瞬间生成写实级图像。' : 'Z Image Turbo redefines AI image generator performance with sub-second creation times. Our 6 billion parameter model requires only 8 inference steps, making it one of the fastest text-to-image solutions available. PrunaAI optimization combines caching, compilation, and quantization techniques to achieve extreme speed without compromising quality. Whether for rapid prototyping, creative exploration, or high-volume production workflows, realistic images are generated instantly.',
    },
    {
      label: isZh ? '文字表现力' : 'Text Expressiveness',
      title: isZh ? '卓越的双语文字渲染技术' : 'Excellent bilingual text rendering technology',
      highlight: isZh ? '完美的中英文文本呈现' : 'Perfect Chinese and English text presentation',
      image: 'https://static.banana2ai.net/images/features/t8xs09rhgv8l.webp',
      body: isZh ? 'Z Image Turbo 在 AI 图像生成器中脱颖而出，具有非凡的文字渲染能力。生成的图像可包含清晰的中英文字符——非常适合标牌、海报、书封、产品标签和品牌材料。在其他模型还在为文字清晰度挣扎时，Z Image Turbo 已能提供准确、优美且与写实场景自然融合的排版设计。' : 'Z Image Turbo stands out among AI image generators with its extraordinary text rendering capabilities. Generated images can include clear Chinese and English characters—perfect for signage, posters, book covers, product labels, and branding materials. While other models struggle with text clarity, Z Image Turbo delivers accurate, beautiful typography that naturally integrates with realistic scenes.',
    },
    {
      label: isZh ? '写实主义' : 'Realism',
      title: isZh ? '具有自然光影的写实级画质' : 'Realistic image quality with natural lighting and shadows',
      highlight: isZh ? '影棚级的视觉真实感' : 'Studio-grade visual realism',
      image: 'https://static.banana2ai.net/images/features/kp8s3k2546hs.webp',
      body: isZh ? 'Z Image Turbo 擅长创建具有真实纹理和自然光影的写实图像。这款 AI 图像生成器能以惊人的真实感处理人像、环境和物体——真实的肤色、精准的材质属性和电影级的光效。无论是生成产品摄影、建筑可视化还是角色肖像，Z Image Turbo 都能提供适用于商业用途、广告宣传和创意作品集的专业品质。' : 'Z Image Turbo excels at creating realistic images with authentic textures and natural lighting and shadows. This AI image generator handles portraits, environments, and objects with astonishing realism—true-to-life skin tones, precise material properties, and cinematic lighting effects. Whether generating product photography, architectural visualizations, or character portraits, Z Image Turbo delivers professional quality suitable for commercial use, advertising, and creative portfolios.',
    },
    {
      label: isZh ? '开放且实惠' : 'Open and Affordable',
      title: isZh ? '高性价比，基于 Apache 2.0 开源协议' : 'Cost-effective, based on Apache 2.0 open-source license',
      highlight: isZh ? '免费的商业使用权' : 'Free commercial use rights',
      image: 'https://static.banana2ai.net/images/features/rghnloqczfqg.webp',
      body: isZh ? 'Z Image Turbo 在 Apache 2.0 协议下运行，提供完全的商业使用自由。这款 AI 图像生成器以传统成本的一小部分提供企业级性能——更快的生成速度意味着更低的计算支出。非常适合每月需生成数千张图像的初创公司、代理机构和大型企业。' : 'Z Image Turbo operates under the Apache 2.0 license, offering complete freedom for commercial use. This AI image generator provides enterprise-grade performance at a fraction of traditional costs—faster generation speeds mean lower computational expenses. It is ideal for startups, agencies, and large enterprises that need to generate thousands of images monthly.',
    },
  ];

  const TECHNOLOGIES = [
    {
      title: isZh ? 'Decoupled-DMD 技术实现效率最大化' : 'Decoupled-DMD technology maximizes efficiency',
      image: 'https://static.banana2ai.net/images/features/qw2gx2wclo80.webp',
      desc: isZh ? 'Z Image Turbo 采用了先进的解耦分布匹配蒸馏（Decoupled-DMD）技术，这是一种精密的压缩技术，能将大型模型蒸馏成更快的版本而不损失画质。结合 DMD 与 PrunaAI 的优化层，实现了前所未有的速度。' : 'Z Image Turbo employs advanced Decoupled Distribution Matching Distillation (Decoupled-DMD) technology, a sophisticated compression technique that distills large models into faster versions without loss of image quality. Combining DMD with PrunaAI optimization layers achieves unprecedented speed.',
    },
    {
      title: isZh ? '单流扩散 Transformer 架构' : 'Single-stream Diffusion Transformer architecture',
      image: 'https://static.banana2ai.net/images/features/wnml1jjnz4nm.webp',
      desc: isZh ? 'Z Image Turbo 采用了尖端的单流扩散 Transformer 架构，同步处理文本提示词和视觉信息。这种统一的处理方式确保了生成的图像逻辑连贯，每一个元素都与你的描述完美对齐。' : 'Z Image Turbo adopts a cutting-edge single-stream Diffusion Transformer architecture, simultaneously processing text prompts and visual information. This unified approach ensures that generated images are logically coherent, with every element perfectly aligned with your description.',
    },
    {
      title: isZh ? '针对 1024×1024 高分辨率输出优化' : 'Optimized for 1024×1024 high-resolution output',
      image: 'https://static.banana2ai.net/images/features/y7nbiswp7bfa.webp',
      desc: isZh ? 'Z Image Turbo 生成 1024×1024 的最佳分辨率图像，提供适用于专业用途的细腻细节。高分辨率结合极速生成的特性，使其成为快速原型设计和最终生产资产生成的理想选择。' : 'Z Image Turbo generates optimal 1024×1024 resolution images, providing fine details suitable for professional use. The high resolution combined with ultra-fast generation makes it an ideal choice for rapid prototyping and final production asset creation.',
    },
  ];

  const STEPS = [
    { title: isZh ? '编写你的创意提示词' : 'Write your creative prompt', desc: isZh ? '详细描述你的构思。Z Image Turbo 在处理包含风格、光效和构图等细节的提示词时表现最佳。如果需要，可以添加文字要求——我们的模型擅长清晰地渲染中英文。' : 'Describe your idea in detail. Z Image Turbo performs best when processing prompts that include details such as style, lighting, and composition. If needed, you can add text requirements—our model excels at clearly rendering Chinese and English.' },
    { title: isZh ? 'Z Image Turbo 处理请求' : 'Z Image Turbo processes the request', desc: isZh ? '60 亿参数模型通过先进的单流扩散 Transformer 架构分析你的提示词。PrunaAI 优化通过智能缓存和编译确保闪电般的计算速度。' : 'The 6 billion parameter model analyzes your prompt through an advanced single-stream Diffusion Transformer architecture. PrunaAI optimization ensures lightning-fast computation through intelligent caching and compilation.' },
    { title: isZh ? '仅需 8 步即可生成图像' : 'Generate images in just 8 steps', desc: isZh ? '采用 Decoupled-DMD 技术，在不牺牲画质的前提下实现快速生成。数秒内，具有自然光影、精准纹理和完美文字渲染的 1024×1024 高分辨率写实图像便会跃然屏上。' : 'Utilizing Decoupled-DMD technology, rapid generation is achieved without sacrificing image quality. Within seconds, a 1024×1024 high-resolution realistic image with natural lighting and shadows, precise textures, and perfect text rendering appears on screen.' },
    { title: isZh ? '下载你的写实级图像' : 'Download your realistic image', desc: isZh ? '高质量图像经过专业优化且无水印，适合商业项目、营销素材、社交媒体内容或个人创意作品集。Apache 2.0 许可证确保你拥有完整商业使用权。' : 'High-quality images are professionally optimized and watermark-free, suitable for commercial projects, marketing materials, social media content, or personal creative portfolios. The Apache 2.0 license ensures you have full commercial use rights.' },
  ];

  const USE_CASES = [
    { title: isZh ? '营销素材与品牌内容创作' : 'Marketing materials and brand content creation', image: 'https://static.banana2ai.net/images/features/7s1xvycd3qom.webp', desc: isZh ? '营销团队利用 Z Image Turbo 快速创建活动资产。通过精准的文字渲染生成产品样机、主视角图像、社交媒体图形和广告视觉素材。极速生成支持快速 A/B 测试和迭代，大幅降低制作成本和周期。' : 'Marketing teams use Z Image Turbo to quickly create campaign assets. Generate product mockups, first-person view images, social media graphics, and advertising visuals through precise text rendering. Ultra-fast generation supports rapid A/B testing and iteration, significantly reducing production costs and cycles.' },
    { title: isZh ? '创作者与红人的社交媒体内容' : 'Social media content for creators and influencers', image: 'https://static.banana2ai.net/images/features/09syt7q0cucl.webp', desc: isZh ? '内容创作者使用 Z Image Turbo 每日产出极具吸引力的视觉内容。瞬间生成吸睛的 Instagram 帖子、YouTube 缩略图、TikTok 背景和个人主页图形。写实级品质确保专业观感。' : 'Content creators use Z Image Turbo to produce highly engaging visual content daily. Instantly generate eye-catching Instagram posts, YouTube thumbnails, TikTok backgrounds, and profile graphics. Realistic quality ensures a professional look.' },
    { title: isZh ? '产品设计与快速原型制作' : 'Product design and rapid prototyping', image: 'https://static.banana2ai.net/images/features/5uutmp5oh4qb.webp', desc: isZh ? '产品设计师利用 Z Image Turbo 进行快速视觉化和方案探索。可在数秒内创建写实的产品渲染图、包装设计和界面样机。快速迭代多种设计变体，无需昂贵的 3D 建模即可展示写实概念。' : 'Product designers use Z Image Turbo for rapid visualization and concept exploration. Create realistic product renders, packaging designs, and interface mockups in seconds. Quickly iterate multiple design variations and showcase realistic concepts without expensive 3D modeling.' },
    { title: isZh ? '电子商务与网店视觉' : 'E-commerce and online store visuals', image: 'https://static.banana2ai.net/images/features/txo0xsz0o0vj.webp', desc: isZh ? '电商企业采用 Z Image Turbo 作为产品摄影和生活方式图片的替代方案。生成包含准确文字的情境产品图、横幅图像和类目焦点图。这是拥有海量库存店铺的高性价比解决方案。' : 'E-commerce businesses adopt Z Image Turbo as an alternative to product photography and lifestyle images. Generate in-context product images, banner images, and category spotlight images with accurate text. This is a cost-effective solution for stores with large inventories.' },
    { title: isZh ? '社论与出版项目' : 'Editorial and publishing projects', image: 'https://static.banana2ai.net/images/features/6i2y44p0n2cx.webp', desc: isZh ? '出版和编辑团队使用 Z Image Turbo 制作文章插图、书籍封面和杂志排版。擅长创建与文字内容匹配的情境图像，卓越的文字渲染能力支持制作集成精美排版的杂志封面和海报设计。' : 'Publishing and editorial teams use Z Image Turbo to create article illustrations, book covers, and magazine layouts. It excels at creating in-context images that match text content, and its excellent text rendering capability supports the creation of magazine covers and poster designs with beautifully integrated typography.' },
    { title: isZh ? '创意作品集与艺术探索' : 'Creative portfolios and artistic exploration', image: 'https://static.banana2ai.net/images/features/l26x71ggyfqt.webp', desc: isZh ? '艺术家和设计师利用 Z Image Turbo 进行创意实验和作品集开发。探索多样化的艺术风格，测试构图创意并快速生成概念草图。写实级能力助你打造专业级的作品集展示。' : 'Artists and designers use Z Image Turbo for creative experimentation and portfolio development. Explore diverse artistic styles, test composition ideas, and quickly generate concept sketches. Realistic capabilities help you build professional-grade portfolio displays.' },
  ];


  const FAQS = [
    { q: isZh ? 'Z Image Turbo 的文字渲染功能有什么特别之处？' : 'What is special about Z Image Turbo text rendering feature?', a: isZh ? '大多数文生图模型很难生成可读文字，而 Z Image Turbo 则能提供自然融合进写实场景的清晰排版。它可以在图像中渲染清晰的中英文字符，非常适合标牌、海报、书封、产品标签和品牌材料，这对于设计师和营销人员来说至关重要。' : 'Most text-to-image models struggle to generate readable text, while Z Image Turbo provides clear typography naturally integrated into realistic scenes. It can render clear Chinese and English characters in images, which is ideal for signage, posters, book covers, product labels, and branding materials, making it crucial for designers and marketers.' },
    { q: isZh ? '与其他 AI 图像生成器相比，Z Image Turbo 的生成速度有多快？' : 'How fast is Z Image Turbo generation speed compared to other AI image generators?', a: isZh ? 'Z Image Turbo 可在亚秒级时间内生成图像，通常在 1-3 秒内完成。该模型仅需 8 步推理，而传统扩散模型需要 50-100 步。结合 PrunaAI 的缓存、编译和量化优化，进一步提升了生成速度。' : 'Z Image Turbo can generate images in sub-second time, typically completing in 1-3 seconds. The model requires only 8 inference steps, whereas traditional diffusion models require 50-100 steps. Combined with PrunaAI caching, compilation, and quantization optimizations, generation speed is further enhanced.' },
    { q: isZh ? '我可以从 Z Image Turbo 获得怎样的画质？' : 'What image quality can I expect from Z Image Turbo?', a: isZh ? 'Z Image Turbo 擅长生成具有自然光影、精准纹理和真实场景的写实图像。它可以处理肤色真实的人像、透视准确的环境以及材质属性真实的物体，输出 1024×1024 高分辨率图像。' : 'Z Image Turbo excels at generating realistic images with natural lighting, precise textures, and authentic scenes. It can handle portraits with true skin tones, environments with accurate perspective, and objects with realistic material properties, outputting 1024x1024 high-resolution images.' },
    { q: isZh ? '我能将 Z Image Turbo 生成的图像用于商业项目吗？' : 'Can I use images generated by Z Image Turbo for commercial projects?', a: isZh ? '是的！Z Image Turbo 基于 Apache 2.0 开源协议运行，提供完整的商业使用权。你可以将生成的图像用于企业营销、广告宣传、产品设计、客户项目、周边商品、社交媒体内容以及任何商业场景，无需支付授权费。' : 'Yes! Z Image Turbo operates under the Apache 2.0 open-source license, providing full commercial use rights. You can use the generated images for corporate marketing, advertising, product design, client projects, merchandise, social media content, and any commercial scenario without paying licensing fees.' },
    { q: isZh ? '是什么技术支撑了 Z Image Turbo 极致的速度与品质？' : 'What technology supports the ultimate speed and quality of Z Image Turbo?', a: isZh ? 'Z Image Turbo 采用了解耦分布匹配蒸馏（DMD）技术，这是一种将大型模型压缩为更快速版本且不牺牲质量的先进技术。结合单流扩散 Transformer 架构和 PrunaAI 优化，在保留强大母模型知识的同时，实现了高效的写实级输出。' : 'Z Image Turbo employs Decoupled Distribution Matching Distillation (DMD) technology, an advanced technique that compresses large models into faster versions without sacrificing quality. Combined with a single-stream diffusion Transformer architecture and PrunaAI optimization, it achieves efficient, photorealistic output while retaining the knowledge of powerful parent models.' },
    { q: isZh ? 'Z Image Turbo 最适合哪些使用场景？' : 'What use cases is Z Image Turbo best suited for?', a: isZh ? 'Z Image Turbo 非常适合营销活动、社交媒体创作、产品设计视觉化、电商图片、出版插图、书籍封面、网页图形、广告素材、品牌内容、创意作品集和快速原型设计。其双语文字渲染能力在国际营销和多语种品牌项目中极具价值。' : 'Z Image Turbo is ideal for marketing campaigns, social media content creation, product design visualization, e-commerce images, publishing illustrations, book covers, web graphics, advertising creatives, brand content, creative portfolios, and rapid prototyping. Its bilingual text rendering capability is extremely valuable in international marketing and multilingual branding projects.' },
  ];

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
          <Link href="/zh/" className="transition-colors hover:text-white/70">{isZh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <Link href="/zh/image/" className="transition-colors hover:text-white/70">{isZh ? 'AI图像生成器' : 'AI Image Generator'}</Link>
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
                Z Image Turbo — {isZh ? '更快、更高质量的生图体验，不必复杂' : 'Faster, higher quality image generation experience, without complexity.'}
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">{isZh ? '极速 AI 图像生成器，打造逼真视觉体验' : 'Turbo AI Image Generator, Create Realistic Visual Experiences'}</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                Z Image Turbo {isZh ? '是一款拥有 60 亿参数的尖端 AI 图像生成器，仅需 8 步推理即可在数秒内生成写实级图像。通过 PrunaAI 优化，在保持顶尖画质的同时实现了无与伦比的生成速度，是创作者、设计师及企业的首选工具。' : 'It is a cutting-edge AI image generator with 6 billion parameters, capable of generating photorealistic images in seconds with just 8 inference steps. Optimized by PrunaAI, it achieves unparalleled generation speed while maintaining top-tier image quality, making it the preferred tool for creators, designers, and businesses.'}
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">{isZh ? '✨ 立即体验' : '✨ Experience Now'}</Link>
              <ul className="mt-8 space-y-2">
                {[isZh ? '⚡ 亚秒级生成速度，8 步推理' : '⚡ Sub-second generation speed, 8 inference steps', isZh ? '🔤 中英文双语文字渲染' : '🔤 Bilingual Chinese and English text rendering', isZh ? '📸 写实级画质，自然光影' : '📸 Photorealistic image quality, natural lighting and shadows', isZh ? '🔓 Apache 2.0 开源，免费商用' : '🔓 Apache 2.0 open source, free for commercial use'].map((f, i) => (
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
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in"><span className="gradient-glow-text">Z Image Turbo</span> {isZh ? '图片' : 'Images'}</h2>
        <ImageGenerator examples={Z_IMAGE_TURBO_EXAMPLES} />
      </section>

      {/* ── Steps (4) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            生成写实级 AI 图像的<span className="text-[#ffcc33]">{isZh ? '四个简单步骤' : 'Four Simple Steps'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '使用 Z Image Turbo 在数秒内创建专业品质的图像。这款革命性的 AI 图像生成器能将你的想法转化为惊艳的写实视觉效果。' : 'Create professional quality images in seconds with Z Image Turbo. This revolutionary AI image generator transforms your ideas into stunning, photorealistic visuals.'}
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
            {isZh ? '为什么' : 'Why'} <span className="text-[#ffcc33]">Z Image Turbo</span> {isZh ? '领跑 AI 图像生成技术' : 'Leading AI Image Generation Technology'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '探索让 Z Image Turbo 成为写实创作、文字渲染和极速生成领域最先进 AI 图像生成器的突破性功能和优化架构。' : 'Explore the groundbreaking features and optimized architecture that make Z Image Turbo the most advanced AI image generator for photorealistic creation, text rendering, and lightning-fast generation.'}
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
                <Link href="/zh/image/z-image-turbo/" className="highlight-button inline-flex">{isZh ? '体验 Z Image Turbo' : 'Experience Z Image Turbo'}</Link>
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
            驱动 Z Image Turbo 的<span className="text-[#ffcc33]">{isZh ? '先进技术' : 'Advanced Technology'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '深入了解复杂的 AI 架构和优化技术，这些正是让 Z Image Turbo 成为功能最强大且最高效的 AI 图像生成器的核心。' : 'Dive deep into the complex AI architecture and optimization techniques that are at the core of what makes Z Image Turbo the most powerful and efficient AI image generator.'}
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
            Z Image Turbo：<span className="text-[#ffcc33]">{isZh ? '以极速写实创作赋能行业转型' : 'Empowering Industry Transformation with Ultra-Fast Realistic Creation'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '从营销活动到创意作品集，Z Image Turbo 以闪电般的极速写实 AI 图像生成能力，为各行各业的专业人士提供卓越品质和可商用成果。' : 'From marketing campaigns to creative portfolios, Z Image Turbo provides professionals across all industries with exceptional quality and commercially viable results through its lightning-fast photorealistic AI image generation capabilities.'}
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
            Z Image Turbo {isZh ? '专业用户成功案例' : 'Professional User Success Stories'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '加入全球成千上万名创作者、企业和机构的行列，探索闪电般的写实生成如何加速工作流并降低各行业成本。' : 'Join thousands of creators, businesses, and organizations worldwide to discover how lightning-fast photorealistic generation can accelerate workflows and reduce costs across various industries.'}
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            {isZh ? '关于 Z Image Turbo AI 图像生成器的常见问题' : 'Frequently Asked Questions about Z Image Turbo AI Image Generator'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '关于 Z Image Turbo 的能力、先进技术、写实画质、文字渲染功能和使用技巧的详细解答。' : 'Detailed answers regarding Z Image Turbo capabilities, advanced technology, photorealistic image quality, text rendering features, and usage tips.'}
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
            {isZh ? '立即使用 Z Image Turbo，数秒内开启写实创作' : 'Start photorealistic creation in seconds with Z Image Turbo now.'}
          </h2>
          <p className="mb-8 text-lg text-white/60">
            {isZh ? '加入全球成千上万专业人士、创作者和企业的行列。无需复杂设置——只需描述你的构思，见证先进的 60 亿参数技术通过仅 8 步推理创建惊艳图像。' : 'Join thousands of professionals, creators, and businesses worldwide. No complex setup is needed – simply describe your idea and witness advanced 6 billion parameter technology create stunning images with just 8 inference steps.'}
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">{isZh ? '✨ 立即开始免费使用' : '✨ Start Using for Free Now'}</Link>
        </div>
      </section>
    </div>
  );
}
