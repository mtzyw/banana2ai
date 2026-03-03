'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { FLUX_AI_IMAGE_GENERATOR_EXAMPLES } from '@/data/page-examples';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Features (alternating image+text) ─── */

/* ─── Use Cases Tabs ─── */

/* ─── Steps ─── */

/* ─── Strategic Advantages ─── */

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
const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Independent Designer',
    avatar: 'https://static.banana2ai.net/images/avatars/0chf3prv2avy.webp',
    quote: 'The introduction of Flux AI Image Generator has completely revolutionized my daily workflow. Now, I just describe my ideas to Flux AI Image Generator and get high-fidelity results that perfectly match my needs. The accuracy of typography is particularly impressive; I have never seen AI handle text so perfectly. It has become an indispensable part of my professional toolkit.',
  },
  {
    name: 'David Chen',
    role: 'Commercial Photographer',
    avatar: 'https://static.banana2ai.net/images/avatars/xrzla888hnj4.webp',
    quote: 'As a professional photographer, I use Flux AI Image Generator to experiment with lighting layouts and color palettes. The realism produced by the system is simply astonishing. It allows me to show my team the exact effects I am aiming for. Flux AI Image Generator is the gold standard for high-resolution visual synthesis and storyboarding.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Senior Marketing Manager',
    avatar: 'https://static.banana2ai.net/images/avatars/9eyq4zr370bs.webp',
    quote: 'In the realm of social media marketing, Flux AI Image Generator is a complete game-changer. My team has to produce dozens of visual content pieces every week, and this tool allows us to maintain a high-end feel without high costs. The consistency of Flux AI Image Generator is crucial; we know the engine will deliver 4K quality every time we generate an image.',
  },
  {
    name: 'Mark Thompson',
    role: 'Game Concept Artist',
    avatar: 'https://static.banana2ai.net/images/avatars/yqnbz7lctilz.webp',
    quote: 'The technical precision of Flux AI Image Generator makes it stand out. As a concept artist, I need a tool that understands the anatomical details of characters. This model excels in that regard. Its speed in processing complex prompts has greatly boosted my productivity, allowing me to iterate designs faster.',
  },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const FEATURES = [
    {
      title: isZh ? '革命性的写实主义与表面渲染' : 'Revolutionary Realism and Surface Rendering',
      image: 'https://static.banana2ai.net/images/features/d4j74diw3h7n.webp',
      body: isZh ? 'Flux AI 图像生成器的真正实力在于其对光学物理和材料属性的深入理解。当您使用我们的专业系统时，您正在接入一个经过数百万张专业照片训练的神经网络。这使得系统能够模拟复杂的视觉现象，如皮肤的次表面散射、玻璃上的焦散反射以及纺织品的精细织纹。Flux AI 图像生成器确保每个阴影在数学上保持一致，每个高光都自然摆放。此外，它还能以电影级的质量处理景深和虚化效果。' : 'The true power of Flux AI image generator lies in its deep understanding of optical physics and material properties. When you use our professional system, you are accessing a neural network trained on millions of professional photographs. This enables the system to simulate complex visual phenomena such as subsurface scattering on skin, caustic reflections on glass, and the intricate textures of textiles. Flux AI image generator ensures every shadow is mathematically consistent and every highlight is naturally placed. Furthermore, it can handle depth of field and bokeh effects with cinematic quality.',
    },
    {
      title: isZh ? '无与伦比的排版与解剖准确性' : 'Unparalleled Typography and Anatomical Accuracy',
      image: 'https://static.banana2ai.net/images/features/6nemc9rfeqe0.webp',
      body: isZh ? 'Flux AI 图像生成器成功征服了人工智能领域的巨大挑战。使用 Flux AI 图像生成器，您可以直接将特定的单词或品牌名称融入图像中，并保持完美的拼写和字体一致性。这种能力使其成为创建海报和社交媒体横幅（文字整合至关重要）的必备资产。此外，Flux AI 图像生成器已经掌握了复杂的人体解剖学。手指畸形的时代已经过去，该模型能生成自然、富有表现力的姿势，传达真实的情感和动态。' : 'Flux AI image generator has successfully conquered significant challenges in the field of artificial intelligence. Using Flux AI image generator, you can directly integrate specific words or brand names into images, maintaining perfect spelling and font consistency. This capability makes it an essential asset for creating posters and social media banners where text integration is crucial. Furthermore, Flux AI image generator has mastered complex human anatomy. The era of distorted fingers is over; the model can generate natural, expressive poses that convey genuine emotion and dynamism.',
    },
    {
      title: isZh ? '先进的语义理解与空间逻辑' : 'Advanced Semantic Understanding and Spatial Logic',
      image: 'https://static.banana2ai.net/images/features/o6onuv78986b.webp',
      body: isZh ? 'Flux AI 图像生成器最深远的优势之一在于其复杂的双架构方法，它将基于 Transformer 的主干网络与先进的潜在扩散技术相结合。这使得 Flux AI 图像生成器能够保持惊人的空间逻辑，确保提示词中提到的物体不仅具有高保真度，而且在物理关系上摆放正确。如果您描述一个玻璃杯放在红木桌上，背景是模糊的热带叶子，Flux AI 图像生成器能完美理解该场景的深度、分层和物体关系。' : 'One of the most profound advantages of Flux AI image generator lies in its sophisticated dual-architecture approach, combining a Transformer-based backbone with advanced latent diffusion technology. This allows Flux AI image generator to maintain astonishing spatial logic, ensuring that objects mentioned in prompts are not only high-fidelity but also correctly positioned in physical relation to each other. If you describe a glass placed on a mahogany table with blurred tropical leaves in the background, Flux AI image generator perfectly understands the scene’s depth, layering, and object relationships.',
    },
  ];

  const USE_CASE_TABS = [
    {
      label: isZh ? '建筑设计' : 'Architectural Design',
      title: isZh ? '电影级建筑可视化' : 'Cinematic Architectural Visualization',
      highlight: isZh ? '精确空间' : 'Precise Spatiality',
      image: 'https://static.banana2ai.net/images/features/an4kmo2ls0qy.webp',
      body: isZh ? '建筑师现在可以使用 Flux AI 图像生成器在创纪录的时间内将蓝图转化为写实的视觉环境。无论是需要沐浴在晨光中的极简主义斯堪的纳维亚客厅，还是带有戏剧性阴影的宏伟粗犷主义大厅，Flux AI 图像生成器都能以惊人的准确度捕捉空间逻辑和材料纹理。这使得设计公司能够实验不同的建筑材料——如拉丝钢、橡木或抛光大理石——并观察它们与复杂光线的交互。通过使用 Flux AI 图像生成器进行快速原型设计，创意团队可以大幅压缩从概念到落地的周期。' : 'Architects can now use Flux AI image generator to transform blueprints into realistic visual environments in record time. Whether it is a minimalist Scandinavian living room bathed in morning light or a grand Brutalist hall with dramatic shadows, Flux AI image generator captures spatial logic and material textures with astonishing accuracy. This allows design firms to experiment with different architectural materials—such as brushed steel, oak, or polished marble—and observe their interaction with complex lighting. By using Flux AI image generator for rapid prototyping, creative teams can significantly compress the cycle from concept to realization.',
    },
    {
      label: isZh ? '电子商务' : 'E-commerce',
      title: isZh ? '高端电子商务与产品营销' : 'High-end E-commerce and Product Marketing',
      highlight: isZh ? '影棚级质量' : 'Studio-Grade Quality',
      image: 'https://static.banana2ai.net/images/features/ikszunvda943.webp',
      body: isZh ? '在竞争激烈的在线零售世界中，Flux AI 图像生成器为昂贵的实物拍摄提供了一个极具性价比的替代方案。领先企业使用我们的 Flux AI 图像生成器套件，以影棚级的精度将产品放置在高端生活方式场景中。营销团队利用 Flux AI 图像生成器在不同的数字平台上保持一致的美学风格。此外，Flux AI 图像生成器支持即时创建本地化营销内容，允许企业通过简单的提示词调整来适配全球不同市场的产品视觉效果。' : 'In the competitive world of online retail, Flux AI image generator offers a highly cost-effective alternative to expensive physical photoshoots. Leading businesses use our Flux AI image generator suite to place products in high-end lifestyle scenes with studio-grade precision. Marketing teams leverage Flux AI image generator to maintain a consistent aesthetic across different digital platforms. Furthermore, Flux AI image generator supports the instant creation of localized marketing content, allowing businesses to adapt product visuals for different global markets with simple prompt adjustments.',
    },
    {
      label: isZh ? '游戏设计' : 'Game Design',
      title: isZh ? '专业游戏概念艺术与世界观构建' : 'Professional Game Concept Art and World Building',
      highlight: isZh ? '世界构建' : 'World Building',
      image: 'https://static.banana2ai.net/images/features/88bqx2sf400h.webp',
      body: isZh ? '对于游戏行业的概念艺术家来说，Flux AI 图像生成器是构建沉浸式虚拟世界的得力创作伙伴。该引擎擅长生成复杂的环境细节，从拥有生物发光植物的迷幻森林到扩张的废土都市。通过将 Flux AI 图像生成器集成到前期制作流程中，开发人员可以快速迭代角色剪影、盔甲设计和生物概念。Flux AI 图像生成器确保所有资产在满足现代游戏引擎高分辨率要求的同时，保持一致的艺术风格。' : 'For concept artists in the gaming industry, Flux AI image generator is a powerful creative partner for building immersive virtual worlds. The engine excels at generating intricate environmental details, from psychedelic forests with bioluminescent flora to sprawling dystopian metropolises. By integrating Flux AI image generator into the pre-production workflow, developers can rapidly iterate on character silhouettes, armor designs, and creature concepts. Flux AI image generator ensures all assets maintain a consistent artistic style while meeting the high-resolution demands of modern game engines.',
    },
    {
      label: isZh ? '时尚' : 'Fashion',
      title: isZh ? '社论与时尚插画' : 'Editorial and Fashion Illustration',
      highlight: isZh ? '高级时尚美学' : 'High Fashion Aesthetics',
      image: 'https://static.banana2ai.net/images/features/93enwhj5jmuw.webp',
      body: isZh ? 'Flux AI 图像生成器正在彻底改变时尚品牌和社论设计师处理视觉叙事的方式。插画家使用 Flux AI 图像生成器将概念服装设计可视化，并探索不同面料在各种影棚光线条件下的垂坠感。该引擎在丝绸光泽、复杂的刺绣图案和精细的蕾丝纹理等领域提供了极高的细节。通过利用 Flux AI 图像生成器，时尚品牌可以制作出具有冲击力的活动图像和数字画册，突破传统风格的界限。' : 'Flux AI image generator is revolutionizing how fashion brands and editorial designers approach visual storytelling. Illustrators use Flux AI image generator to visualize conceptual garment designs and explore the drape of different fabrics under various studio lighting conditions. The engine provides exceptional detail in areas such as silk sheen, intricate embroidery patterns, and delicate lace textures. By leveraging Flux AI image generator, fashion brands can produce impactful campaign imagery and digital lookbooks that push the boundaries of traditional styles.',
    },
  ];

  const STEPS = [
    {
      title: isZh ? '输入创意构想' : 'Input Creative Concept',
      desc: isZh ? '详细描述您的视觉构思，包括风格、光影、构图和主体细节。Flux AI 图像生成器擅长解析包含丰富细节的复杂提示词，并将其转化为精准的视觉输出。' : 'Describe your visual concept in detail, including style, lighting, composition, and subject specifics. Flux AI image generator excels at parsing complex prompts with rich details and transforming them into precise visual outputs.',
    },
    {
      title: isZh ? '选择参数与风格' : 'Select Parameters and Style',
      desc: isZh ? '根据创作需求调整图像尺寸、数量和风格参数。Flux AI 图像生成器支持多种宽高比，满足社交媒体、印刷品和数字展示的不同需求。' : 'Adjust image size, quantity, and style parameters according to your creative needs. Flux AI image generator supports various aspect ratios, meeting different requirements for social media, print, and digital displays.',
    },
    {
      title: isZh ? 'AI 引擎生成图像' : 'AI Engine Generates Images',
      desc: isZh ? 'Flux AI 图像生成器的双架构系统结合 Transformer 主干网络与潜在扩散技术，处理您的请求并生成符合物理逻辑、细节丰富的高保真图像。' : 'Flux AI image generator’s dual-architecture system, combining a Transformer backbone with latent diffusion technology, processes your request and generates physically logical, richly detailed, high-fidelity images.',
    },
    {
      title: isZh ? '下载专业级作品' : 'Download Professional-Grade Work',
      desc: isZh ? '获得高分辨率专业级图像，适用于营销活动、社交媒体、产品展示或创意作品集。Flux AI 图像生成器的输出可直接用于商业项目。' : 'Obtain high-resolution, professional-grade images suitable for marketing campaigns, social media, product displays, or creative portfolios. Flux AI image generator’s output can be directly used for commercial projects.',
    },
  ];

  const ADVANTAGES = [
    {
      title: isZh ? '精通文本生成图像' : 'Mastering Text-to-Image Generation',
      image: 'https://static.banana2ai.net/images/icons/step-upload.webp',
      desc: isZh ? 'Flux AI 图像生成器让用户见证他们的灵感转化为令人惊叹的视觉效果。经过优化，可以处理包含构图和光影特定指令的复杂提示词。这意味着您将获得一个完全尊重每一个细节要求的定制视觉响应。Flux AI 图像生成器的高效率确保您可以在几秒钟内从概念过渡到最终打磨的资产，大幅缩短交付周期。' : 'Flux AI Image Generator allows users to witness their inspiration transform into stunning visuals. It is optimized to handle complex prompts that include specific instructions for composition and lighting. This means you will receive a customized visual response that fully respects every detail requirement. The high efficiency of Flux AI Image Generator ensures you can transition from concept to final polished assets in seconds, significantly shortening delivery cycles.',
    },
    {
      title: isZh ? '高级光影与氛围' : 'Advanced Lighting and Atmosphere',
      image: 'https://static.banana2ai.net/images/icons/step-describe.webp',
      desc: isZh ? 'Flux AI 图像生成器的一个显著特点是其能够精准模拟专业摄影灯光。用户可以指挥系统应用高调照明或黑色电影阴影等风格。Flux AI 图像生成器理解光影与大气条件的相互作用，允许您生成带有真实雾气或黄金时段光辉的图像。这种级别的控制对于使用该技术预演项目的摄影师来说至关重要。' : 'A notable feature of Flux AI Image Generator is its ability to precisely simulate professional photographic lighting. Users can instruct the system to apply styles such as high-key lighting or film noir shadows. Flux AI Image Generator understands the interplay of light and atmospheric conditions, allowing you to generate images with realistic fog or golden hour glow. This level of control is crucial for photographers who use this technology to pre-visualize projects.',
    },
    {
      title: isZh ? '品牌化的可扩展视觉资产' : 'Branded Scalable Visual Assets',
      image: 'https://static.banana2ai.net/images/icons/step-generate.webp',
      desc: isZh ? '对于希望在不牺牲质量的情况下扩大内容生产规模的品牌来说，Flux AI 图像生成器是终极工具。在当今的数字经济中，对高质量视觉效果的需求是持续不断的。我们的 Flux AI 图像生成器允许营销团队以惊人的速度生产符合品牌风格的图像，保持统一的视觉语言，同时为不同的受众群体量身定制图像。' : 'For brands looking to scale content production without sacrificing quality, Flux AI Image Generator is the ultimate tool. In todays digital economy, the demand for high-quality visuals is constant. Our Flux AI Image Generator allows marketing teams to produce brand-compliant images at incredible speed, maintaining a unified visual language while tailoring images for different audience segments.',
    },
    {
      title: isZh ? '智能工作流与生产力' : 'Smart Workflow and Productivity',
      image: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      desc: isZh ? '我们的工作空间旨在将 Flux AI 图像生成器无缝集成到您现有的创意流程中。界面针对速度和易用性优化，每一项功能都非常直观，让您可以专注于创作本身。支持快速迭代，让您通过调整提示词来细化和完善图像，并允许批量生成，轻松找到最完美的一张。' : 'Our workspace is designed to seamlessly integrate Flux AI Image Generator into your existing creative workflow. The interface is optimized for speed and ease of use, with every feature being intuitive, allowing you to focus on the creation itself. It supports rapid iteration, allowing you to refine and perfect images by adjusting prompts, and enables batch generation to easily find the most perfect one.',
    },
  ];


  const FAQS = [
    {
      q: isZh ? '什么是 Flux AI 图像生成器？' : 'What is Flux AI Image Generator?',
      a: isZh ? 'Flux AI 图像生成器是专为从文本提示词生成高分辨率图像而设计的新一代潜在扩散模型。它建立在海量数据集之上，并在写实度、排版和解剖准确性方面进行了性能优化。与旧模型不同，Flux AI 图像生成器能以极高的忠实度遵循长且复杂的提示词。它被公认为 AI 艺术领域最强大、最通用的工具之一，提供影棚级的成果。' : 'Flux AI Image Generator is a new generation latent diffusion model specifically designed to generate high-resolution images from text prompts. It is built upon a massive dataset and optimized for performance in realism, typography, and anatomical accuracy. Unlike older models, Flux AI Image Generator can follow long and complex prompts with extreme fidelity. It is recognized as one of the most powerful and versatile tools in the field of AI art, delivering studio-grade results.',
    },
    {
      q: isZh ? '我可以将 Flux AI 图像生成器用于商业工作吗？' : 'Can I use Flux AI Image Generator for commercial work?',
      a: isZh ? '是的，通过 Flux AI 图像生成器生成的图像可用于商业项目，包括营销材料和社交媒体内容。Flux AI 图像生成器的高分辨率输出确保您的资产已达到专业水准，适用于数字和平面媒体。许多企业使用我们的平台来扩大内容生产规模，同时保持高端美学。请务必熟悉特定的订阅条款，以最大化利用该技术。' : 'Yes, images generated with Flux AI Image Generator can be used for commercial projects, including marketing materials and social media content. The high-resolution output of Flux AI Image Generator ensures your assets are professional grade, suitable for both digital and print media. Many businesses use our platform to scale content production while maintaining a high-end aesthetic. Please be sure to familiarize yourself with the specific subscription terms to maximize your use of the technology.',
    },
    {
      q: isZh ? '如何从 Flux AI 图像生成器中获得最佳结果？' : 'How to get the best results from Flux AI Image Generator?',
      a: isZh ? '为了通过 Flux AI 图像生成器获得最佳效果，我们建议使用详细且描述性的提示词，明确指定光影和纹理。该系统在指令清晰的情况下表现最出色。例如，描述具体的材料有助于 Flux AI 图像生成器将您的灵感转化为生动的视觉现实。您还可以在界面中实验不同的艺术风格和摄像机设置，为您的项目寻找完美的视觉风格。' : 'To get the best results from Flux AI Image Generator, we recommend using detailed and descriptive prompts that clearly specify lighting and textures. The system performs best with clear instructions. For example, describing specific materials helps Flux AI Image Generator transform your inspiration into vivid visual reality. You can also experiment with different art styles and camera settings within the interface to find the perfect visual style for your project.',
    },
    {
      q: isZh ? 'Flux AI 图像生成器是否保护我的隐私？' : 'Does Flux AI Image Generator protect my privacy?',
      a: isZh ? '您的安全和隐私至关重要。当您在我们的平台上使用 Flux AI 图像生成器时，所有数据传输都通过安全的加密通道处理。未经您的明确同意，我们不会使用您的私有提示词或生成的图像来训练我们的模型。您的创意作品归您所有。我们实施安全协议，以确保您的个人信息和创意资产时刻受到保护。' : 'Your security and privacy are paramount. When you use Flux AI Image Generator on our platform, all data transfers are handled via secure encrypted channels. We do not use your private prompts or generated images to train our models without your explicit consent. Your creative work belongs to you. We implement security protocols to ensure your personal information and creative assets are protected at all times.',
    },
  ];

  const fadeRef = useScrollFade();
  const [ucTab, setUcTab] = useState(0);
  const [ucVisible, setUcVisible] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  const switchUcTab = (i: number) => {
    if (i === ucTab) return;
    setUcVisible(false);
    setTimeout(() => { setUcTab(i); setUcVisible(true); }, 250);
  };

  const ucData = USE_CASE_TABS[ucTab];

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="transition-colors hover:text-white/70">{isZh ? '首页' : 'Homepage'}</Link>
          <span>/</span>
          <Link href="/zh/image/" className="transition-colors hover:text-white/70">{isZh ? 'AI图像生成器' : 'AI Image Generator'}</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">{isZh ? 'Flux AI 图像生成器' : 'Flux AI Image Generator'}</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                {isZh ? '释放精准力量 — Flux AI' : 'Unleash Precise Power — Flux AI'}
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">{isZh ? '全球最先进的图像引擎' : 'The Most Advanced Image Engine in the World'}</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                {isZh ? '在我们平台体验 Flux AI 图像生成器。通过我们专业级的双架构系统，掌控复杂的空间逻辑和无瑕的文字渲染。与经常在复杂空间逻辑上挣扎的传统生成模型不同，Flux AI 图像生成器擅长解析复杂的文本指令，并将其转化为高保真的视觉资产。这项尖端技术专为弥合人类想象力与数字执行之间的鸿沟而设计。' : 'Experience the Flux AI Image Generator on our platform. Master complex spatial logic and flawless text rendering with our professional-grade dual-architecture system. Unlike traditional generative models that often struggle with intricate spatial logic, the Flux AI Image Generator excels at interpreting complex text instructions and transforming them into high-fidelity visual assets. This cutting-edge technology is specifically designed to bridge the gap between human imagination and digital execution.'}
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">{isZh ? '✨ 立即体验' : '✨ Experience Now'}</Link>
              <ul className="mt-8 space-y-2">
                {[
                  isZh ? '✍️ 无与伦比的文字准确度' : '✍️ Unparalleled Text Accuracy',
                  isZh ? '💪 完美的人体解剖结构' : '💪 Perfect Human Anatomy',
                  isZh ? '📸 高分辨率照片级输出' : '📸 High-Resolution Photorealistic Output',
                  isZh ? '🎁 每日免费额度' : '🎁 Daily Free Credits',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/showcase/ai-models.webp" alt="Flux AI {isZh ? '图像生成器' : 'Image Generator'}" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Generator ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in">
          <span className="gradient-glow-text">{isZh ? 'Flux AI 图像生成器' : 'Flux AI Image Generator'}</span> {isZh ? '图片' : 'Images'}
        </h2>
        <ImageGenerator examples={FLUX_AI_IMAGE_GENERATOR_EXAMPLES} />
      </section>

      {/* ── Steps (4) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '四步创作' : 'Four-step creation'}<span className="text-[#ffcc33]">{isZh ? '专业级 AI 图像' : 'Professional Grade AI Images'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '利用当今最精确、最高分辨率的 AI 图像生成技术，释放视觉合成的未来。' : 'Unleash the future of visual synthesis using the most precise and highest-resolution AI image generation technology available today.'}
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

      {/* ── Features (alternating image+text) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '专业 AI 引擎的' : 'Professional AI engine'}<span className="text-[#ffcc33]">{isZh ? '尖端特性' : 'Cutting Edge Features'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '深入了解我们套件的技术优势。我们利用 Flux AI 图像生成器提供满足现代创作者需求的工具。从建筑可视化到高级时尚社论概念，该系统为所有专业用户提供一致的结果。' : 'Dive deep into the technical advantages of our suite. We leverage the Flux AI Image Generator to provide tools that meet the demands of modern creators. From architectural visualization to advanced fashion editorial concepts, this system delivers consistent results for all professional users.'}
          </p>
          <div className="space-y-20">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 scroll-fade-in stagger-${i + 1}`}
              >
                {/* Alternate image side */}
                <div className={`flex items-center justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="image-hover-zoom relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl">
                    <Image src={feat.image} alt={feat.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117]/40 to-transparent" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{feat.title}</h3>
                  <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <p className="leading-relaxed text-white/60">{feat.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases (4 tabs + left image / right text) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '多元化的' : 'Diverse'}<span className="text-[#ffcc33]">{isZh ? '行业应用' : 'Industry Applications'}</span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            {isZh ? '探索不同专业领域如何将 Flux AI 图像生成器整合到工作流中，以在四大核心行业中节省时间并提升创意产出。' : 'Discover how different professional fields integrate the Flux AI Image Generator into their workflows to save time and enhance creative output across four core industries.'}
          </p>

          {/* Mobile tabs */}
          <div className="mb-6 flex flex-col gap-2 md:hidden">
            {USE_CASE_TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => switchUcTab(i)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  ucTab === i
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
            {USE_CASE_TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => switchUcTab(i)}
                className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
                  ucTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t.label}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
                  style={{ opacity: ucTab === i ? 1 : 0, transform: ucTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            ))}
          </div>

          {/* Content: left image + right text */}
          <div className="relative min-h-[400px] md:min-h-[500px]">
            <div
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
              style={{
                opacity: ucVisible ? 1 : 0,
                transform: ucVisible ? 'none' : 'translateY(8px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={ucData.image}
                  alt={ucData.title}
                  width={600}
                  height={500}
                  className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 hover:scale-105 md:max-h-[500px]"
                />
              </div>
              <div>
                <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">{ucData.title}</h3>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
                  <span className="gradient-glow-text text-sm font-semibold md:text-base">{ucData.highlight}</span>
                </div>
                <p className="mb-8 leading-relaxed text-white/60">{ucData.body}</p>
                <Link href="/zh/image/flux-ai-image-generator/" className="highlight-button inline-flex">
                  {isZh ? '体验 Flux AI 图像生成器' : 'Experience the Flux AI Image Generator'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Advantages (icon box 2-col grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            {isZh ? '我们 AI 平台的' : 'Our AI platform'}<span className="text-[#ffcc33]">{isZh ? '战略优势' : 'Strategic Advantages'}</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '通过利用 Flux AI 图像生成器，我们提供了一个强大、可扩展且极具创意的环境，适配每一位专业用户的独特需求。' : 'By utilizing the Flux AI Image Generator, we provide a powerful, scalable, and highly creative environment tailored to the unique needs of every professional user.'}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 4)}`}
              >
                {/* Icon box */}
                <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-[#363b4e]/40 bg-[#1c2030] p-2.5">
                  <Image src={adv.image} alt={adv.title} width={48} height={48} className="h-12 w-12" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-[#ffcc33]">
                  {adv.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{adv.desc}</p>
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
            {isZh ? '来自全球创意社区的成功案例' : 'Success Stories from the Global Creative Community'}
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '了解 Flux AI 图像生成器如何通过我们的先进视觉套件赋能全球专业人士。' : 'Learn how the Flux AI Image Generator empowers professionals worldwide through our advanced visual suite.'}
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            Flux AI {isZh ? '图像生成器 常见问题' : 'Image Generator Frequently Asked Questions'}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            {isZh ? '寻找关于 Flux AI 图像生成器最常见问题的答案。' : 'Find answers to the most common questions about the Flux AI Image Generator.'}
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
            {isZh ? '利用 Flux AI 图像生成器释放您的创意潜力' : 'Unleash Your Creative Potential with the Flux AI Image Generator'}
          </h2>
          <p className="mb-8 text-lg text-white/60">
            {isZh ? '准备好体验数字艺术的未来了吗？接入 Flux AI 图像生成器的强大动力，见证专业级 AI 为您的项目带来的改变。' : 'Are you ready to experience the future of digital art? Access the power of the Flux AI Image Generator and witness the transformation professional-grade AI brings to your projects.'}
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">{isZh ? '✨ 立即开始免费使用' : '✨ Start Using for Free Now'}</Link>
        </div>
      </section>
    </div>
  );
}
