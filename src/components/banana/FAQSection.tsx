'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const faqs = [
  {
    q: '什么是 Banana Pro AI，AI 图像生成器如何工作？',
    a: 'Banana Pro AI 是一个前沿的人工智能图像生成平台。我们的 AI 图像生成器采用先进的机器学习模型，经过数百万张图像的训练，能够理解并创建视觉内容。Banana Pro AI 提供两种强大的生成方式：图生图——上传参考图像，AI 会根据您的指令对其进行转换；以及文生图——只需描述想要看到的内容，Banana Pro AI 就会生成符合要求的原创图像。',
  },
  {
    q: 'Banana Pro AI 的 AI 图像生成器在技术上是如何工作的？',
    a: 'Banana Pro AI 的 AI 图像生成器使用先进的深度学习模型，在海量图像及其描述数据集上进行训练。图像到图像功能：您上传一张图像并指定所需修改，Banana Pro AI 分析图像结构和内容，在保留核心元素的同时应用您请求的转换。文本到图像功能：您提供文本描述，AI 分析语义含义，理解上下文和风格要求，然后生成与描述相匹配的原创图像。整个过程只需几秒钟。',
  },
  {
    q: 'Banana Pro AI 与其他 AI 图像生成器有何不同？',
    a: 'Banana Pro AI 在多个关键方面脱颖而出：100% 免费且无任何限制；行业领先的速度，5-15 秒内生成专业图像；同时支持图生图和文生图两种模式；包含完整商用授权；卓越的用户体验无需学习曲线；高分辨率专业输出适用于数字和印刷应用。当竞争对手专注于复杂性或收取高昂费用时，Banana Pro AI 优先考虑易用性、速度、质量和创作自由。',
  },
  {
    q: '我可以将 Banana Pro AI 图像用于商业用途吗？',
    a: '当然可以！您使用 Banana Pro AI 生成的每张图片都拥有完整的商业使用权，无需额外付费。您可以自由地将其用于客户项目、广告、商品、网站、社交媒体、印刷材料或任何商业应用，无需支付额外的许可费用或受到任何限制。这适用于图生图和文生图的所有创作——没有隐藏限制，没有意外约束。',
  },
  {
    q: 'Banana Pro AI 提供什么样的图像质量和分辨率？',
    a: 'Banana Pro AI 的 AI 图像生成器可生成高分辨率、专业品质的图像。我们的标准输出为 1024×1024 像素，根据生成类型不同，可选择最高达 2048×2048 像素的更高分辨率。生成的图像具有出色的细节表现、自然的色彩、恰当的光照和专业的构图，其清晰的细节可媲美专业摄影和数字插画作品。',
  },
  {
    q: 'Banana Pro AI 是完全免费的吗？有哪些限制？',
    a: 'Banana Pro AI 提供永久免费的核心功能，每日均有免费额度供用户使用，无需信用卡即可注册。免费版本包含商业使用权、无水印输出等核心功能。如需更高的每日生成限额和更多高级功能，我们也提供高级版套餐供有更高需求的专业用户选择。',
  },
  {
    q: 'Banana Pro AI 支持哪些图像风格和类型？',
    a: 'Banana Pro AI 支持极为丰富的图像风格，包括：照片写实风格、动漫和插画风格、水彩和油画风格、数字艺术风格、极简主义风格、电影感风格、复古风格等数十种预设。同时支持生成人像、风景、产品照片、概念艺术、插画等多种类型，几乎涵盖所有创作需求场景。',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollFade();

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            关于 Banana Pro AI 的
            <span className="text-[#ffcc33]">常见问题</span>
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            解答您对 Banana Pro AI 最关心的问题。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="scroll-fade-in bg-[#1c2030] rounded-xl border border-[#363b4e] overflow-hidden transition-colors hover:border-[#ffcc33]/20"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium text-sm md:text-base group"
                >
                  <span className={`transition-colors ${isOpen ? 'text-[#ffcc33]' : 'text-white group-hover:text-[#ffcc33]'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
