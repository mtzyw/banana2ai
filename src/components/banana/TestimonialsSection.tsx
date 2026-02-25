'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const testimonials = [
  {
    quote:
      'Banana Pro AI 彻底革新了我们的内容创作方式。AI 图像生成器速度极快，质量出众。使用 Banana Pro AI 后，我们的视觉内容制作时间缩短了 70%，同时质量反而得到了提升。AI 图像处理技术能够完美保持品牌一致性，并即时创建定制图形。Banana Pro AI 已成为我们整个团队不可或缺的工具！',
    name: 'Sarah Mitchell',
    role: '社交媒体管理员',
    avatar: '/images/banana/j3znhyr1jyn8.jpeg',
    stagger: 'stagger-1',
  },
  {
    quote:
      '我无法为整个产品目录支付专业摄影费用。Banana Pro AI 的图生图功能彻底改变了这一切。我使用这个 AI 图像生成器将基础产品照片转化为精美的场景化图片，效果堪比专业摄影。我的转化率提升了 35%！Banana Pro AI 免费使用，却能带来价值数千美元的效果。每个电商卖家都需要它！',
    name: 'Marcus Chen',
    role: '电商店主',
    avatar: '/images/banana/k1zo5dpjyh3y.jpeg',
    stagger: 'stagger-2',
  },
  {
    quote:
      '我曾对AI图像生成器取代设计师持怀疑态度，但Banana Pro AI反而成为了我的秘密武器。我用它进行快速概念开发、情绪板制作和参考图像生成。Banana Pro AI的图生图功能帮助我在几秒钟内探索各种风格，而文生图的质量更是出色。使用Banana Pro AI后，我的创作产出增加了两倍。这是能力的放大，而非替代！',
    name: 'Elena Rodriguez',
    role: '自由设计师',
    avatar: '/images/banana/b88usp2lk4ef.jpeg',
    stagger: 'stagger-3',
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#ffcc33] text-[#ffcc33]" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useScrollFade();

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0a0d14]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            创作者喜爱{' '}
            <span className="text-[#ffcc33]">Banana Pro AI</span> 的理由
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            来自全球各地的创作者分享他们使用 Banana Pro AI 的真实体验。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`scroll-fade-in ${t.stagger} bg-[#1c2030] rounded-2xl p-6 border border-[#363b4e] flex flex-col gap-4 hover:border-[#ffcc33]/30 transition-colors`}
            >
              <StarRating />
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#363b4e]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/45 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
