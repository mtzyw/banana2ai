'use client';

import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const features = [
  { title: '照片级画质', desc: '以惊人的清晰度渲染每一个细节——自然光照、逼真纹理、完美构图和专业级品质。' },
  { title: '闪电速度', desc: '5-10 秒内生成专业图像，快速迭代，让您的创作势头持续流畅。' },
  { title: '零水印', desc: '所有下载图像均无水印，拥有完整商业使用权，立即可用。' },
  { title: '免费注册', desc: '无需信用卡，永久免费，每日提供免费额度让您尽情创作。' },
];

/* 原站用 3 video + 3 image 交替展示 */
const media: Array<{ type: 'video' | 'image'; src: string }> = [
  { type: 'video', src: '/images/banana/i2vuvmfyggea.mp4' },
  { type: 'image', src: '/images/banana/1tpln4as6p33.jpeg' },
  { type: 'image', src: '/images/banana/l8af5arb7l0d.jpeg' },
  { type: 'image', src: '/images/banana/8pk4idwouhh0.jpeg' },
  { type: 'image', src: '/images/banana/3rh7in3ztrd9.jpeg' },
  { type: 'image', src: '/images/banana/oymo6e4j50qi.jpeg' },
];

export default function ShowcaseSection() {
  const ref = useScrollFade();

  return (
    <section className="relative px-4 py-12 md:py-24 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Banana Pro AI 的创作成果：
            <span className="gradient-glow-text">超出预期的输出效果</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Banana Pro AI 将您的创意构想转化为媲美顶级设计师和摄影师的专业视觉内容。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Feature List */}
          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <div key={f.title} className={`flex gap-4 items-start scroll-fade-left stagger-${i + 1}`}>
                <CheckCircle className="w-6 h-6 text-[#ffcc33] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">{f.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Media Grid (video + images) */}
          <div className="grid grid-cols-2 gap-3 scroll-fade-right">
            {media.map((item, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden image-hover-zoom gradient-glow-bg">
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
                    alt={`Banana Pro AI showcase ${i + 1}`}
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
