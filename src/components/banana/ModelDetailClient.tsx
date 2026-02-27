'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const TABS = [
  {
    label: '先进 AI 引擎',
    image: '/images/banana/gnp61umatcle.jpeg',
    imageAlt: '以革命性 AI 技术驱动你的创意',
    heading: '以革命性 AI 技术驱动你的创意',
    highlight: '下一代神经网络架构',
    body: 'Banana Pro AI 图片利用最前沿的人工智能技术，带来前所未有的图像质量与生成速度。我们的模型基于海量视觉概念进行训练，能够以出色的保真度生成专业级作品。与基础 AI 工具相比，Banana Pro AI 图片在生成速度上快 10 倍，在画质和还原度上提升 3 倍，让创意表达无缝流畅。',
  },
  {
    label: '完美一致性',
    image: '/images/banana/3c4y2msray7n.jpeg',
    imageAlt: '无与伦比的角色与风格一致性',
    heading: '无与伦比的角色与风格一致性',
    highlight: '高级视觉记忆系统',
    body: '构建视觉叙事需要稳定的角色与统一的风格。Banana Pro AI 图片在保持视觉身份方面表现出色。我们先进的记忆系统会记住角色特征、艺术风格和构图偏好，确保系列中的每一张图片都拥有完美的视觉延续性。非常适合漫画创作者、品牌设计师和故事创作者等需要稳定输出的场景。',
  },
  {
    label: '两种强大模式',
    image: '/images/banana/xpee3k37jl8p.jpeg',
    imageAlt: '多场景适配的双模式创作系统',
    heading: '多场景适配的双模式创作系统',
    highlight: '文生图 + 图生图双引擎',
    body: '无论是从零开始创作，还是基于现有图像进行风格迁移与二次编辑，Banana Pro AI 图片都能完美适配。文生图模式让你通过自然语言描述即可获得专业作品；图生图模式则支持精准的风格转换、细节增强和创意重塑，满足各类复杂创作需求。',
  },
  {
    label: '永久免费',
    image: '/images/banana/96equhxq2u7i.jpeg',
    imageAlt: '真正永久免费且附带完整商用权利',
    heading: '真正永久免费且附带完整商用权利',
    highlight: '零成本启动，无隐藏收费',
    body: 'Banana Pro AI 图片承诺永久免费使用基础功能，不设置任何隐形限制。所有免费用户生成的图片均附带完整的商用授权，你可以自由用于个人项目、社交媒体内容或商业设计。我们相信，好的创意工具不应该成为创作的门槛。',
  },
];

export default function ModelDetailClient({ features }: { features: Feature[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleTabChange = (i: number) => {
    if (i === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(i);
      setVisible(true);
    }, 250);
  };

  const tab = TABS[activeTab];

  return (
    <div>
      {/* Subtitle */}
      <p className="mx-auto mb-8 max-w-4xl text-center text-sm text-white/50 md:text-base">
        了解让 Banana Pro AI 图片成为全球 750,000+ 创意专业人士首选平台的技术优势与以用户为中心的功能设计。
      </p>

      {/* Tab buttons */}
      <div className="mb-8 hidden flex-wrap justify-center gap-4 md:flex">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => handleTabChange(i)}
            className={`relative px-6 py-3 text-base font-medium transition-all duration-300 ${
              activeTab === i ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {t.label}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#ffcc33] transition-all duration-300"
              style={{ opacity: activeTab === i ? 1 : 0, transform: activeTab === i ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </button>
        ))}
      </div>

      {/* Mobile tabs (vertical) */}
      <div className="mb-6 flex flex-col gap-2 md:hidden">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => handleTabChange(i)}
            className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-[#ffcc33]/10 text-[#ffcc33] border border-[#ffcc33]/30'
                : 'bg-[#1c2030] text-white/50 border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content — left image + right text */}
      <div className="relative min-h-[400px] md:min-h-[600px]">
        <div
          className="grid grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <Image
              src={tab.image}
              alt={tab.imageAlt}
              width={600}
              height={550}
              className="max-h-[300px] max-w-full rounded-lg object-contain transition-transform duration-700 ease-in-out hover:scale-105 md:max-h-[550px]"
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-2xl font-bold text-white md:mb-4 md:text-3xl lg:text-4xl">
              {tab.heading}
            </h3>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900]" />
              <span className="gradient-glow-text text-sm font-semibold md:text-base">{tab.highlight}</span>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-white/60 md:text-base">
              {tab.body}
            </p>
            <a
              href="/zh/image/banana-pro-ai/"
              className="highlight-button inline-flex w-full justify-center md:w-auto"
            >
              体验 Banana Pro AI 图片
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
