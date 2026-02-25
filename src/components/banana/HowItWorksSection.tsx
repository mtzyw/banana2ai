'use client';

import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

export default function HowItWorksSection() {
  const ref = useScrollFade();

  const steps = [
    {
      number: '1',
      title: '描述或上传',
      description:
        'Banana Pro AI 提供两种强大的创作方式：上传现有照片进行图生图转换，或通过描述您的创意进行文生图生成。我们的 AI 图像生成器能够理解您的创作意图。',
      stagger: 'stagger-1',
    },
    {
      number: '2',
      title: 'AI 处理',
      description:
        'Banana Pro AI 的先进 AI 图像生成器可即时分析您的输入。图生图功能可将您上传的图片转换为艺术变体，而文生图功能则可根据描述创建原创杰作。',
      stagger: 'stagger-2',
    },
    {
      number: '3',
      title: '下载使用',
      description:
        'Banana Pro AI 提供具有完整商业使用权的高分辨率图像，无水印下载，可立即用于商业用途。每一个 AI 图像生成器创作都可立即使用，完全赋能您的创作自由！',
      stagger: 'stagger-3',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-[#0f1117]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-12 scroll-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Banana Pro AI{' '}
            <span className="text-[#ffcc33]">如何在几秒内创建专业图像</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Banana Pro AI 为您提供从创意到精美图像的无缝创作体验，让专业图像创作变得轻松简单。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`scroll-fade-in ${step.stagger} gradient-glow-bg bg-[#1c2030] rounded-2xl p-6 border border-[#363b4e] flex flex-col gap-4 hover:border-[#ffcc33]/30 transition-colors`}
            >
              <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center shadow-lg shadow-[#ffcc33]/20">
                <span className="text-black font-bold text-xl">{step.number}</span>
              </div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
