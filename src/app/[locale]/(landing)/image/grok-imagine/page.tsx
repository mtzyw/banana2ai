'use client';

import { useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageGenerator from '@/components/banana/ImageGenerator';
import { GROK_IMAGINE_EXAMPLES } from '@/data/page-examples';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

/* ─── Why / Features Section Tabs (tab + left image / right text) ─── */

/* ─── Technology (3-col grid) ─── */

/* ─── Steps ─── */

/* ─── Use Cases (icon box 2-col grid) ─── */

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
        <span className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
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

  const go = useCallback((n: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setIdx((n + total) % total); setAnimating(false); }, 400);
  }, [animating, total]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = useCallback(() => { timerRef.current = setInterval(() => setIdx(prev => (prev + 1) % total), 6000); }, [total]);
  const stopTimer = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  useEffect(() => { startTimer(); return () => stopTimer(); }, [startTimer, stopTimer]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div
        className="relative overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] p-6 shadow-lg md:p-12"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'none', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#ffcc33]/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#ff9900]/5 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col">
          <div className="mb-4 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-lg text-[#ffcc33]">★</span>)}
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
      >←</button>
      <button
        onClick={() => { stopTimer(); go(idx + 1); startTimer(); }}
        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e] bg-[#0f1117]/80 text-white/60 backdrop-blur-sm transition-all hover:border-[#ffcc33]/50 hover:text-[#ffcc33] md:-right-4"
      >→</button>
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
    name: '张伟',
    role: 'Logo 设计师',
    avatar: 'https://static.banana2ai.net/images/avatars/95ls4obu8n1r.webp',
    quote: '我使用过很多工具，但 Grok Imagine 是唯一每次都能正确生成文本的工具。Grok 上的 FLUX.1 模型对于我的 Logo 设计业务来说是一个改变游戏规则的东西。它非常易于使用，而且免费在线访问对于自由职业者来说是一个巨大的优势。',
  },
  {
    name: '李晓梅',
    role: '社媒经理',
    avatar: 'https://static.banana2ai.net/images/avatars/ffer5qw3809o.webp',
    quote: '作为一名社交媒体经理，我需要快速且具有病毒传播性的内容。Grok Imagine 让我能够创作出真正有趣且相关的迷因，而无需经过繁重的审查。这绝对是用于创作互动内容的最佳 Grok AI 艺术生成器。',
  },
  {
    name: '王芳',
    role: '摄影师',
    avatar: 'https://static.banana2ai.net/images/avatars/b2rbrxlowmmw.webp',
    quote: '照片写实感令人震惊。我使用 Grok Imagine 为客户网站生成库存照片，他们根本看不出区别。Grok 上的 FLUX.1 模型处理光线的能力比我尝试过的任何其他 AI 都要好。强烈推荐。',
  },
  {
    name: '陈明',
    role: '概念艺术家',
    avatar: 'https://static.banana2ai.net/images/avatars/8wokupsy7u34.webp',
    quote: '我喜欢它精准的指令遵循能力。其他工具会忽略我一半的提示词，但 Grok Imagine 会倾听每一个细节。这是终极的概念艺术 AI 工具。能够如此流畅地运行 Grok 上的 FLUX.1 模型真是太棒了。',
  },
];

export default function Page() {
  const isZh = useLocale() === 'zh';
  const WHY_TABS = [
    {
      label: isZh ? '完美的文本生成' : 'Perfect Text Generation',
      title: isZh ? '完美的文本生成：告别乱码排版' : 'Perfect Text Generation: Say Goodbye to Garbled Typography',
      highlight: isZh ? '精准渲染每一个字符' : 'Precisely Render Every Character',
      image: 'https://static.banana2ai.net/images/features/ih5x64wsr0qe.webp',
      body: isZh ? 'Grok Imagine 通过消除设计中的乱码文本彻底改变了排版。由 Grok 上精密的 FLUX.1 模型驱动，此功能对于 Logo 创作者和品牌设计师至关重要。无论您是制作朗朗上口的商品标语还是专业徽章，Grok Imagine 都能确保每个字符都以绝对的精度渲染。体验当今最可靠的、适用于重文本创意项目的 Grok AI 艺术生成器带来的差异。' : 'Grok Imagine revolutionizes typography by eliminating garbled text in designs. Powered by the sophisticated FLUX.1 model on Grok, this feature is crucial for logo creators and brand designers. Whether you are crafting catchy merchandise slogans or professional badges, Grok Imagine ensures every character is rendered with absolute precision. Experience the difference with todays most reliable Grok AI art generator for text-heavy creative projects.',
    },
    {
      label: isZh ? '超写实 AI 照片' : 'Hyperrealistic AI Photos',
      title: isZh ? '超写实 AI 照片，单反级画质' : 'Hyperrealistic AI Photos, DSLR-Quality',
      highlight: isZh ? '与现实无法区分的图像保真度' : 'Indistinguishable Image Fidelity from Reality',
      image: 'https://static.banana2ai.net/images/features/uj3azsxcbjmm.webp',
      body: isZh ? '使用 Grok Imagine 获得单反级画质。我们的 Grok AI 艺术生成器利用 Grok 上 FLUX.1 模型的深度学习能力，制作出与现实无法区分的照片级图像。捕捉真实的皮肤纹理、自然光线和微妙的瑕疵，为您的肖像注入生命。此功能非常适合创建虚拟网红或高端图库摄影替代品。' : 'Achieve DSLR-quality with Grok Imagine. Our Grok AI art generator leverages the deep learning capabilities of the FLUX.1 model on Grok to produce photorealistic images indistinguishable from reality. Capture authentic skin textures, natural lighting, and subtle imperfections to breathe life into your portraits. This feature is perfect for creating virtual influencers or high-end stock photography alternatives.',
    },
    {
      label: isZh ? '无过滤的创意' : 'Unfiltered Creativity',
      title: isZh ? '无过滤的创意，释放真正艺术潜能' : 'Unfiltered Creativity, Unleash True Artistic Potential',
      highlight: isZh ? '超越限制的创作自由' : 'Creative Freedom Beyond Limits',
      image: 'https://static.banana2ai.net/images/features/1da9l0hqw37c.webp',
      body: isZh ? '使用 Grok Imagine 释放您真正的艺术潜能。与其他受限平台不同，这款 Grok AI 艺术生成器提供更广泛的创作自由，允许您探索前卫的概念和幽默。Grok 上的 FLUX.1 模型经过调优，能够理解流行文化和迷因，赋予您生成能够引起共鸣的病毒式内容的能力。Grok Imagine 是那些拒绝被严格审查过滤器限制的艺术家的终极游乐场。' : 'Unleash your true artistic potential with Grok Imagine. Unlike other restricted platforms, this Grok AI art generator offers broader creative freedom, allowing you to explore avant-garde concepts and humor. The FLUX.1 model on Grok is tuned to understand pop culture and memes, empowering you to generate viral content that resonates. Grok Imagine is the ultimate playground for artists who refuse to be limited by strict censorship filters.',
    },
    {
      label: isZh ? '精准的指令遵循' : 'Precise Instruction Following',
      title: isZh ? '精准的指令遵循，告别随机结果' : 'Precise Instruction Following, Say Goodbye to Random Results',
      highlight: isZh ? '复杂指令精确执行' : 'Precise Execution of Complex Instructions',
      image: 'https://static.banana2ai.net/images/features/2rdnu2zvwpxo.webp',
      body: isZh ? 'Grok Imagine 擅长以极高的精准度遵循复杂、多层次的指令。得益于 Grok 上 FLUX.1 模型的高级逻辑，您可以自信地描述特定的空间布局、相机角度和复杂的细节。这使得 Grok Imagine 成为需要精准执行愿景的游戏开发者、概念艺术家和建筑师的首选 Grok AI 艺术生成器。告别随机结果，迎接精准。' : 'Grok Imagine excels at following complex, multi-layered instructions with extreme precision. Thanks to the advanced logic of the FLUX.1 model on Grok, you can confidently describe specific spatial layouts, camera angles, and intricate details. This makes Grok Imagine the preferred Grok AI art generator for game developers, concept artists, and architects who require precise execution of their vision. Say goodbye to random results and embrace precision.',
    },
  ];

  const TECHNOLOGIES = [
    {
      title: isZh ? 'FLUX.1 模型：次世代图像生成引擎' : 'FLUX.1 Model: Next-Generation Image Generation Engine',
      image: 'https://static.banana2ai.net/images/features/ih5x64wsr0qe.webp',
      desc: isZh ? 'Grok Imagine 由 Grok 上的先进 FLUX.1 模型驱动，提供无与伦比的图像保真度和精准的文本渲染。FLUX.1 在文字渲染、照片写实感和提示词遵循方面优于竞争对手，是目前功能最强大的开源图像生成框架。' : 'Grok Imagine is powered by the advanced FLUX.1 model on Grok, offering unparalleled image fidelity and precise text rendering. FLUX.1 outperforms competitors in text rendering, photorealism, and prompt adherence, making it currently the most powerful open-source image generation framework.',
    },
    {
      title: isZh ? '深度学习驱动的照片级写实' : 'Deep Learning Driven Photorealism',
      image: 'https://static.banana2ai.net/images/features/uj3azsxcbjmm.webp',
      desc: isZh ? '利用 FLUX.1 模型的深度学习能力，Grok Imagine 制作出与现实无法区分的照片级图像。捕捉真实的皮肤纹理、自然光线和微妙的场景细节，每张图像都达到工作室级的视觉标准。' : 'Leveraging the deep learning capabilities of the FLUX.1 model, Grok Imagine produces photorealistic images indistinguishable from reality. Capture authentic skin textures, natural lighting, and subtle scene details, with every image achieving studio-grade visual standards.',
    },
    {
      title: isZh ? '高级语言理解与空间推理' : 'Advanced Language Understanding and Spatial Reasoning',
      image: 'https://static.banana2ai.net/images/features/2rdnu2zvwpxo.webp',
      desc: isZh ? 'Grok 上的 FLUX.1 模型具备高级自然语言理解能力，能够解析复杂的空间描述和多层次指令。无论是赛博朋克城市景观还是精准标注的产品图，系统都能以极高精度呈现您的创意构想。' : 'The FLUX.1 model on Grok possesses advanced natural language understanding, capable of parsing complex spatial descriptions and multi-layered instructions. Whether it is a cyberpunk cityscape or a precisely annotated product image, the system renders your creative concepts with extreme accuracy.',
    },
  ];

  const STEPS = [
    {
      title: isZh ? '输入您的构想' : 'Enter Your Vision',
      desc: isZh ? '在 Grok Imagine 文本框中输入详细的提示词。Grok 上的 FLUX.1 模型擅长理解复杂的自然语言和空间描述，将您最抽象的创意想法转化为精准的视觉指令。' : 'Enter detailed prompts in the Grok Imagine text box. The FLUX.1 model on Grok excels at understanding complex natural language and spatial descriptions, transforming your most abstract creative ideas into precise visual instructions.',
    },
    {
      title: isZh ? '选择纵横比' : 'Select Aspect Ratio',
      desc: isZh ? '为您的平台选择完美的尺寸。无论是 Instagram 快拍还是 YouTube 缩略图，Grok Imagine 都能适应您的需求，提供多种宽高比选项以满足不同场景的创作要求。' : 'Choose the perfect dimensions for your platform. Whether it is an Instagram Story or a YouTube thumbnail, Grok Imagine adapts to your needs, offering various aspect ratio options to meet the creative requirements of different scenarios.',
    },
    {
      title: isZh ? '生成并下载' : 'Generate and Download',
      desc: isZh ? '点击生成，观看 Grok Imagine 将您的想法变为现实。立即下载您的高分辨率 AI 艺术作品，且无水印，随时可用于商业项目和个人创作。' : 'Click Generate and watch Grok Imagine bring your ideas to life. Download your high-resolution AI artwork instantly, without watermarks, ready for commercial projects and personal creations.',
    },
  ];

  const USE_CASES = [
    {
      icon: 'https://static.banana2ai.net/images/icons/step-generate.webp',
      title: isZh ? '排版与 Logo 设计' : 'Typography and Logo Design',
      desc: isZh ? '生成真正可读的文本。与旧的 AI 模型不同，Grok Imagine 擅长渲染正确的拼写和排版。使用我们强大的 Grok AI 艺术生成器，无需担心乱码，即可瞬间创建专业的 Logo、徽章和书法艺术。' : 'Generate truly readable text. Unlike older AI models, Grok Imagine excels at rendering correct spelling and typography. Use our powerful Grok AI art generator to instantly create professional logos, badges, and calligraphic art without worrying about garbled text.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-upload.webp',
      title: isZh ? '超写实摄影' : 'Hyperrealistic Photography',
      desc: isZh ? '使用 Grok 上的 FLUX.1 模型创建与现实无法区分的照片。生成具有自然皮肤纹理、逼真光线和瑕疵的高保真库存照片。非常适合创建看起来像是由单反或 iPhone 拍摄的 AI 网红或生活方式内容。' : 'Create photos indistinguishable from reality using the FLUX.1 model on Grok. Generate high-fidelity stock photos with natural skin textures, realistic lighting, and imperfections. Perfect for creating AI influencers or lifestyle content that looks like it was shot with a DSLR or iPhone.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-share.webp',
      title: isZh ? '病毒式迷因与社交内容' : 'Viral Memes and Social Content',
      desc: isZh ? '使用 Grok Imagine 以更少的限制释放您的幽默感。利用当前趋势，创建引人入胜的迷因、讽刺艺术或有趣的社交媒体帖子。这款 Grok AI 艺术生成器理解流行文化引用，并能轻松处理文本叠加。' : 'Unleash your humor with fewer restrictions using Grok Imagine. Leverage current trends to create engaging memes, satirical art, or funny social media posts. This Grok AI art generator understands pop culture references and handles text overlays with ease.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-describe.webp',
      title: isZh ? '按需打印 (POD) 商品' : 'Print On Demand (POD) Merchandise',
      desc: isZh ? '使用 Grok Imagine 设计畅销的 T 恤和贴纸。生成干净、独立的艺术品，适合印在服装、杯子和海报上。使用最好的免费在线 AI 工具，将创意视觉效果与准确的标语相结合，加速您的 POD 业务。' : 'Design best-selling T-shirts and stickers with Grok Imagine. Generate clean, standalone artwork suitable for printing on apparel, mugs, and posters. Accelerate your POD business by combining creative visuals with accurate slogans using the best free online AI tool.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-prompt.webp',
      title: isZh ? '概念艺术与游戏资产' : 'Concept Art and Game Assets',
      desc: isZh ? '轻松可视化复杂世界。无论您需要赛博朋克城市景观还是 3D 角色设计，Grok Imagine 都能精确遵循复杂的空间指令，这使其成为利用 Grok 上 FLUX.1 模型进行创作的游戏开发者和概念艺术家的理想选择。' : 'Visualize complex worlds with ease. Whether you need cyberpunk cityscapes or 3D character designs, Grok Imagine precisely follows intricate spatial instructions, making it ideal for game developers and concept artists creating with the FLUX.1 model on Grok.',
    },
    {
      icon: 'https://static.banana2ai.net/images/icons/step-enhance.webp',
      title: isZh ? '营销与广告创意' : 'Marketing and Advertising Creatives',
      desc: isZh ? '使用 Grok Imagine 提高您的点击率 (CTR)。在几秒钟内创建引人注目的横幅、YouTube 缩略图和社交媒体广告。使用这款顶级 Grok AI 艺术生成器生成符合您品牌风格的定制营销视觉效果，从而节省数千美元的拍摄费用。' : 'Boost your Click-Through Rate (CTR) with Grok Imagine. Create eye-catching banners, YouTube thumbnails, and social media ads in seconds. Save thousands on photoshoots by generating custom marketing visuals that match your brand style using this top Grok AI art generator.',
    },
  ];


  const FAQS = [
    {
      q: isZh ? 'Grok Imagine 免费吗？' : 'Is Grok Imagine free?',
      a: isZh ? '是的，Grok Imagine 提供强大的免费在线层级，让每个人都能体验 Grok 上 FLUX.1 模型的力量。我们致力于让高质量的艺术生成触手可及。核心的 Grok Imagine 体验旨在永久免费，标准使用无需付费。您可以生成惊艳的图像，测试 Grok AI 艺术生成器的功能，并下载您的作品，无需输入信用卡信息。' : 'Yes, Grok Imagine offers a powerful free online tier, allowing everyone to experience the power of the FLUX.1 model on Grok. We are committed to making high-quality art generation accessible. The core Grok Imagine experience is designed to be permanently free, with no payment required for standard use. You can generate stunning images, test the Grok AI art generator features, and download your creations without entering credit card information.',
    },
    {
      q: isZh ? 'Grok Imagine 保护隐私吗？' : 'Does Grok Imagine protect privacy?',
      a: isZh ? '隐私是 Grok Imagine 的首要任务。与许多其他平台不同，我们确保您的提示词和生成的图像受到最高级别的安全保护。当您使用我们的 Grok AI 艺术生成器时，您的个人数据是安全的。未经您的同意，我们不会使用您的私人生成内容来训练公共模型。' : 'Privacy is a top priority for Grok Imagine. Unlike many other platforms, we ensure your prompts and generated images are protected with the highest level of security. Your personal data is safe when you use our Grok AI art generator. We do not use your private generated content to train public models without your consent.',
    },
    {
      q: isZh ? 'Grok Imagine 好用吗？' : 'Is Grok Imagine good?',
      a: isZh ? '当然。Grok Imagine 被广泛认为是当今可用的最好的 Grok AI 艺术生成器。通过利用 Grok 上尖端的 FLUX.1 模型，它在文本渲染、照片写实感和提示词遵循方面优于竞争对手。无论您将其与 Midjourney 还是 DALL-E 相比，Grok Imagine 都因其完美处理排版和复杂指令的能力而脱颖而出。' : 'Absolutely. Grok Imagine is widely considered the best Grok AI art generator available today. By leveraging the cutting-edge FLUX.1 model on Grok, it outperforms competitors in text rendering, photorealism, and prompt following. Whether you compare it to Midjourney or DALL-E, Grok Imagine stands out for its ability to perfectly handle typography and complex instructions.',
    },
    {
      q: isZh ? 'Grok Imagine 会限制前卫或无过滤的艺术内容吗？' : 'Does Grok Imagine restrict edgy or unfiltered art content?',
      a: isZh ? 'Grok Imagine 以提供无过滤的创意而闻名，并保持着比其他平台限制更少的声誉。虽然我们遵守法律和安全准则以防止伤害，但 Grok Imagine 保留了高度的创作自由，常被社区称为"辛辣模式 (spicy mode)"。Grok 上的 FLUX.1 模型旨在理解语境和幽默，允许创作其他 AI 工具可能屏蔽的讽刺和前卫内容。' : 'Grok Imagine is known for providing unfiltered creativity and maintains a reputation for fewer restrictions than other platforms. While we adhere to legal and safety guidelines to prevent harm, Grok Imagine retains a high degree of creative freedom, often referred to by the community as "spicy mode." The FLUX.1 model on Grok is designed to understand context and humor, allowing for the creation of satirical and edgy content that other AI tools might block.',
    },
    {
      q: isZh ? 'Grok Imagine 对讽刺和成人主题的开放程度如何？' : 'How open is Grok Imagine to satire and adult themes?',
      a: isZh ? 'Grok Imagine 提供了相当大范围的创作自由。它允许用户生成包括讽刺、幽默和艺术概念的内容，这些内容可能会被其他平台上更严格的过滤器标记。Grok 上的 FLUX.1 模型经过调优，允许更广泛的主题，使其成为寻求无拘束表达的用户的首选 Grok AI 艺术生成器。然而，Grok Imagine 仍然禁止非法或未经同意的内容，以确保安全的生态系统。' : 'Grok Imagine offers a considerable degree of creative freedom. It allows users to generate content including satire, humor, and artistic concepts, which might be flagged by stricter filters on other platforms. The FLUX.1 model on Grok is tuned to allow a wider range of themes, making it the preferred Grok AI art generator for users seeking unconstrained expression. However, Grok Imagine still prohibits illegal or non-consensual content to ensure a safe ecosystem.',
    },
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
          <Link href="/zh/" className="transition-colors hover:text-white/70">首页</Link>
          <span>/</span>
          <Link href="/zh/image/" className="transition-colors hover:text-white/70">AI图像生成器</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">Grok Imagine</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 py-12 md:py-16">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="gradient-glow-text mb-4 text-3xl font-bold leading-tight scroll-fade-in sm:text-4xl md:text-5xl">
                解锁无限创意，使用 Grok Imagine AI
              </h1>
              <h2 className="mb-4 text-lg font-medium text-white/80 md:text-xl">体验 Grok 上 FLUX.1 模型的强大力量</h2>
              <p className="mb-6 leading-relaxed text-white/60">
                即刻生成超写实照片、完美排版和病毒式传播的迷因。Grok Imagine 是由 Grok 上的 FLUX.1 模型驱动的终极免费在线 AI 工具。将您的文本提示词转化为惊艳的视觉效果，零限制且无需下载。今天就开始您的创意之旅。
              </p>
              <Link href="/zh/pricing/" className="highlight-button mb-8 inline-flex">✨ 立即体验</Link>
              <ul className="mt-8 space-y-2">
                {['✍️ 完美的文本生成，告别乱码', '📸 超写实 AI 照片，单反级画质', '🎨 无过滤的创意，释放艺术潜能', '🎯 精准的指令遵循，零随机偏差'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">{f}</li>
                ))}
              </ul>
            </div>
            <div className="image-hover-zoom relative aspect-video overflow-hidden rounded-2xl bg-[#1c2030] lg:aspect-square">
              <Image src="https://static.banana2ai.net/images/showcase/interactive-tools.webp" alt="Grok Imagine" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Image Generator ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold scroll-fade-in"><span className="gradient-glow-text">Grok Imagine</span> 图片</h2>
        <ImageGenerator examples={GROK_IMAGINE_EXAMPLES} />
      </section>

      {/* ── Steps (3) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            如何使用 Grok Imagine — <span className="text-[#ffcc33]">三步即可掌握</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50 md:text-base">
            只需简单三步即可掌握这款 Grok AI 艺术生成器。我们直观的界面确保您能即刻从 Grok 上的 FLUX.1 模型获得最佳结果。
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={i} className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/10 scroll-fade-in stagger-${i + 1}`}>
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

      {/* ── Why Grok Imagine (Tabs + Left Image / Right Text) ── */}
      <section className="relative px-4 py-12 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Grok Imagine 的<span className="text-[#ffcc33]">核心功能</span>
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50 md:text-base">
            探索为什么 Grok Imagine 是顶级评分的 Grok AI 艺术生成器。从完美的拼写到无过滤的艺术自由，发现 Grok 上 FLUX.1 模型的能力。
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
                <Link href="/zh/image/grok-imagine/" className="highlight-button inline-flex">体验 Grok Imagine</Link>
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
            驱动 Grok Imagine 的<span className="text-[#ffcc33]">先进技术</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            深入了解 Grok 上 FLUX.1 模型的核心技术架构，正是这些突破性创新让 Grok Imagine 成为功能最强大且最精准的 AI 艺术生成器。
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

      {/* ── Use Cases (icon box 2-col grid) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl">
            Grok Imagine 的<span className="text-[#ffcc33]">多元应用场景</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            发现不同行业如何利用 Grok Imagine 和 Grok 上的 FLUX.1 模型来提高生产力和创造力，释放前所未有的创作潜能。
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {USE_CASES.map((uc, i) => (
              <div key={i} className={`group rounded-2xl border border-[#363b4e] bg-[#13151f] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/40 hover:shadow-lg hover:shadow-[#ffcc33]/5 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
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

      {/* ── Testimonials (single-card carousel) ── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl lg:text-4xl gradient-glow-text">
            用户对 Grok Imagine 的评价
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-sm text-white/50">
            加入成千上万满意创作者的行列，使用市场上最好的 Grok AI 艺术生成器，探索 FLUX.1 模型如何变革您的创作工作流。
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold scroll-fade-in md:text-3xl gradient-glow-text">
            常见问题解答
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-white/50">
            关于 Grok Imagine 和 Grok 上的 FLUX.1 模型您需要知道的一切。
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
            准备好改变您的想象力了吗？
          </h2>
          <p className="mb-8 text-lg text-white/60">
            不要满足于平庸的 AI。今天就切换到 Grok Imagine，体验 Grok 上 FLUX.1 模型的力量。加入创作者社区，使用最好的免费在线 Grok AI 艺术生成器。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg">✨ 立即开始免费使用</Link>
        </div>
      </section>
    </div>
  );
}
