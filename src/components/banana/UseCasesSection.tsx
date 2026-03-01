'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const tabs = [
  {
    id: 'marketing',
    label: '营销人员',
    image: 'https://static.banana2ai.net/images/features/nmodnhmzoinn.webp',
    heading: '面向营销人员和广告专业人士',
    desc: 'Banana Pro AI 可在几分钟内生成高转化率的广告创意、引人注目的营销视觉素材和专业的营销物料。使用 Banana Pro AI 可同时测试多个创意方向，基于效果数据进行迭代优化，无需昂贵的摄影拍摄即可扩展营销活动。',
    features: [
      '即时生成广告创意和营销物料',
      '图生图功能适配不同市场和受众',
      '文生图功能创建独特生活方式图像',
      '测试多个创意方向，快速迭代优化',
    ],
  },
  {
    id: 'creator',
    label: '内容创作者',
    image: 'https://static.banana2ai.net/images/features/oymo6e4j50qi.webp',
    heading: '面向内容创作者和社交媒体运营者',
    desc: 'Banana Pro AI 通过我们的 AI 图像生成器为您的内容日历持续提供新鲜、引人入胜的视觉内容。即时生成自定义 YouTube 缩略图、Instagram 帖子、博客特色图片等。有了 Banana Pro AI，您再也不会缺少视觉内容。',
    features: [
      '自定义 YouTube 缩略图和封面图',
      'Instagram / TikTok 视觉素材创作',
      '跨平台保持品牌一致性',
      '一键生成多种变体进行 A/B 测试',
    ],
  },
  {
    id: 'ecommerce',
    label: '电商卖家',
    image: 'https://static.banana2ai.net/images/avatars/sw79fczaphwe.webp',
    heading: '适用于电商与产品卖家',
    desc: 'Banana Pro AI 可将基础产品照片转化为极具吸引力的生活场景图像，助力销售转化。图生图功能可将产品置于精美场景中、更换背景、创建季节性变体。我们的 AI 图像生成器帮助在线卖家提升转化率、降低摄影成本。',
    features: [
      '产品图片生活场景化转换',
      '批量背景替换和季节性变体',
      '整个产品目录统一专业呈现',
      '提升转化率，降低摄影成本',
    ],
  },
  {
    id: 'game',
    label: '游戏设计师',
    image: 'https://static.banana2ai.net/images/avatars/w09plbs60v32.webp',
    heading: '适合平面设计师和创意机构',
    desc: 'Banana Pro AI 通过我们的 AI 图像生成器加速创意工作流程，扩展您可以交付给客户的内容。使用图像到图像功能进行风格探索、创建变体和艺术实验。Banana Pro AI 是您的创意合作伙伴，让您专注于高价值的创意决策。',
    features: [
      '快速风格探索和概念开发',
      '情绪板制作和参考图像生成',
      '批量生成变体供客户选择',
      'AI 驱动效率，承接更多项目',
    ],
  },
];

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState('marketing');
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Banana Pro AI：以AI图像生成技术
            <span className="text-[#ffcc33]">赋能全球各行各业</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            专为商业用途和艺术创作打造，了解各行业专业人士如何利用 Banana Pro AI 降低成本、加速工作流程。
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all border overflow-hidden ${
                activeId === t.id
                  ? 'bg-[#ffcc33] text-black border-[#ffcc33]'
                  : 'bg-[#1c2030] text-white/60 border-[#363b4e] hover:border-[#ffcc33]/40 hover:text-white/90'
              }`}
            >
              {t.label}
              {activeId === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div
          key={activeId}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          style={{ animation: 'fadeIn 0.4s ease' }}
        >
          {/* Left */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{active.heading}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{active.desc}</p>
            <ul className="flex flex-col gap-3">
              {active.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ffcc33] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#363b4e] image-hover-zoom">
            <Image
              key={active.image}
              src={active.image}
              alt={active.heading}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
