'use client';

import Image from 'next/image';
import { Shield, Image as ImageIcon, Layers, Zap, Gift, Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const features = [
  {
    icon: Shield,
    title: '包含商业使用权',
    desc: '完全拥有您的创作成果。Banana Pro AI 为每张生成的图像提供完整的商业使用权，无需额外费用。可自由用于客户项目、广告宣传、社交媒体、印刷材料以及任何商业用途，没有隐藏费用，没有许可限制。',
  },
  {
    icon: ImageIcon,
    title: '高分辨率4K输出',
    desc: 'Banana Pro AI 可生成高达 4K 分辨率的图像，细节丰富，清晰度出众。适用于数字和印刷应用，呈现锐利的细节、自然的色彩、恰当的光线，以及媲美专业摄影的构图质量。',
  },
  {
    icon: Layers,
    title: '多种图像尺寸',
    desc: '支持多种图像尺寸和比例输出，从正方形到横幅、竖版，满足不同平台和场景的需求。标准输出 1024×1024，最高支持 2048×2048 像素。',
  },
  {
    icon: Zap,
    title: '极速生成',
    desc: 'Banana Pro AI 处理图生图转换仅需 5-10 秒，文生图请求仅需 8-12 秒。超快速度意味着您可以快速迭代、尝试多种创意方向、并比传统设计方法更快地交付完成作品。',
  },
  {
    icon: Gift,
    title: '每日免费额度',
    desc: '每日提供免费生成额度，无需信用卡，永久免费使用核心功能。Banana Pro AI 让所有创作者都能享受专业级 AI 图像生成能力，零门槛开始创作。',
  },
  {
    icon: Star,
    title: '无水印输出',
    desc: '所有通过 Banana Pro AI 生成的图像均不含水印，下载即用。干净、专业的输出内容让您可以直接用于商业项目，无需任何后期处理。',
  },
];

const showcaseMedia: Array<{ type: 'video' | 'image'; src: string }> = [
  { type: 'video', src: '/images/banana/27z9t8c071ab.mp4' },
  { type: 'image', src: '/images/banana/j3znhyr1jyn8.jpeg' },
  { type: 'video', src: '/images/banana/r259rnys4r88.mp4' },
  { type: 'image', src: '/images/banana/k1zo5dpjyh3y.jpeg' },
  { type: 'video', src: '/images/banana/8vu9fpet1i3t.mp4' },
  { type: 'image', src: '/images/banana/nmodnhmzoinn.jpeg' },
];

export default function AdvancedFeaturesSection() {
  const ref = useScrollFade();

  return (
    <section className="relative px-4 py-16 md:py-24 bg-[#0a0d14]">
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

        {/* Two-column: features left, media right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`scroll-fade-in stagger-${i + 1} gradient-glow-bg group bg-[#1c2030] rounded-2xl p-5 border border-[#363b4e] flex gap-3 hover:border-[#ffcc33]/30 transition-colors`}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl badge-gradient flex items-center justify-center shadow-md shadow-[#ffcc33]/20">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1.5 group-hover:text-[#ffcc33] transition-colors">{f.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Video/Image showcase grid */}
          <div className="grid grid-cols-2 gap-3 scroll-fade-right">
            {showcaseMedia.map((item, i) => (
              <div key={i} className="relative aspect-[4/5] rounded-xl overflow-hidden image-hover-zoom">
                {item.type === 'video' ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    src={item.src}
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`Advanced feature ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
