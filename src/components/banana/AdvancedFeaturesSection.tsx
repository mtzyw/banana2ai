'use client';

import { Shield, Image as ImageIcon, Layers, Zap, Gift, Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const features = [
  {
    icon: Shield,
    title: '包含商业使用权',
    desc: '完全拥有您的创作成果。Banana Pro AI 为每张生成的图像提供完整的商业使用权，无需额外费用。可自由用于客户项目、广告宣传、社交媒体、印刷材料以及任何商业用途，没有隐藏费用，没有许可限制。',
    stagger: 'stagger-1',
  },
  {
    icon: ImageIcon,
    title: '高分辨率4K输出',
    desc: 'Banana Pro AI 可生成高达 4K 分辨率的图像，细节丰富，清晰度出众。适用于数字和印刷应用，呈现锐利的细节、自然的色彩、恰当的光线，以及媲美专业摄影的构图质量。',
    stagger: 'stagger-2',
  },
  {
    icon: Layers,
    title: '多种图像尺寸',
    desc: '支持多种图像尺寸和比例输出，从正方形到横幅、竖版，满足不同平台和场景的需求。标准输出 1024×1024，最高支持 2048×2048 像素。',
    stagger: 'stagger-3',
  },
  {
    icon: Zap,
    title: '极速生成',
    desc: 'Banana Pro AI 处理图生图转换仅需 5-10 秒，文生图请求仅需 8-12 秒。超快速度意味着您可以快速迭代、尝试多种创意方向、并比传统设计方法更快地交付完成作品。',
    stagger: 'stagger-4',
  },
  {
    icon: Gift,
    title: '每日免费额度',
    desc: '每日提供免费生成额度，无需信用卡，永久免费使用核心功能。Banana Pro AI 让所有创作者都能享受专业级 AI 图像生成能力，零门槛开始创作。',
    stagger: 'stagger-5',
  },
  {
    icon: Star,
    title: '无水印输出',
    desc: '所有通过 Banana Pro AI 生成的图像均不含水印，下载即用。干净、专业的输出内容让您可以直接用于商业项目，无需任何后期处理。',
    stagger: 'stagger-6',
  },
];

export default function AdvancedFeaturesSection() {
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-glow-text">Banana Pro AI 高级功能</span>
            <span className="text-white">，提升您的创意工作流程</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            超越基础图像生成功能，专为追求卓越的专业创作者、营销人员和艺术家而设计。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`scroll-fade-in ${f.stagger} gradient-glow-bg group bg-[#1c2030] rounded-2xl p-6 border border-[#363b4e] flex gap-4 hover:border-[#ffcc33]/30 transition-colors`}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl badge-gradient flex items-center justify-center shadow-md shadow-[#ffcc33]/20">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#ffcc33] transition-colors">{f.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
