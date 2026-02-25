'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const EXAMPLE_PROMPTS = [
  {
    id: 1,
    prompt: 'A serene Japanese garden at twilight, with a traditional torii gate reflected in a still koi pond, cherry blossoms falling, soft lantern light, ultra-realistic photography, 8K resolution',
    model: 'Banana Pro AI',
    image: '/images/banana/1tpln4as6p33.jpeg',
    tags: ['风景', '日本风格', '写实'],
  },
  {
    id: 2,
    prompt: '超写实人像，金发女性，穿着现代都市风格服装，站在霓虹灯闪烁的东京街头，赛博朋克氛围，电影感光影',
    model: 'Flux AI',
    image: '/images/banana/3rh7in3ztrd9.jpeg',
    tags: ['人像', '赛博朋克', '都市'],
  },
  {
    id: 3,
    prompt: '一只威严的雄狮站在非洲草原日落的金色光芒中，背景是宽阔的草原和斑斓的天空，超高清细节，4K摄影风格',
    model: 'Seedream AI',
    image: '/images/banana/5aqwpua9noqi.jpeg',
    tags: ['动物', '自然', '日落'],
  },
  {
    id: 4,
    prompt: 'Futuristic space station orbiting a gas giant, detailed architecture with solar panels and observation decks, astronaut in spacesuit floating nearby, dramatic space backdrop with nebula',
    model: 'Grok Imagine',
    image: '/images/banana/8pk4idwouhh0.jpeg',
    tags: ['科幻', '太空', '建筑'],
  },
  {
    id: 5,
    prompt: '传统中国水墨画风格，山水画，峻岭险峰，云雾缭绕，一叶扁舟行于江上，意境悠远，丹青神韵',
    model: 'Nano Banana',
    image: '/images/banana/b88usp2lk4ef.jpeg',
    tags: ['水墨', '国风', '山水'],
  },
  {
    id: 6,
    prompt: 'Professional product photography of a luxury watch on a dark marble surface, dramatic studio lighting, bokeh background, commercial quality, ultra sharp details',
    model: 'Z Image Turbo',
    image: '/images/banana/d5gn3mlwmm7n.jpeg',
    tags: ['产品', '摄影', '奢华'],
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: '浏览精选 Banana 提示词',
    description: '在我们精心策划的提示词库中，探索各种风格和主题的优质提示词，找到适合您创作需求的灵感。',
  },
  {
    step: '02',
    title: '使用或复制您喜欢的提示词',
    description: '点击任意提示词卡片，一键复制提示词或直接在 Banana Pro AI 中使用，即刻开始创作。',
  },
  {
    step: '03',
    title: '使用 AI 生成自定义提示词',
    description: '描述您的创意构想，让 AI 为您生成完美的定制提示词，无论多复杂的创意都能精准表达。',
  },
];

const FEATURES = [
  { icon: '📚', title: '海量精选提示词库', description: '收录数千条经过专家筛选的高质量提示词，涵盖各种风格和应用场景。' },
  { icon: '🖼️', title: '真实生成结果预览', description: '每个提示词都附有真实的 AI 生成图像预览，所见即所得，帮助您直观了解生成效果。' },
  { icon: '🤖', title: 'AI驱动的提示词生成器', description: '用自然语言描述您的想法，AI 自动生成专业级提示词，告别反复调试的烦恼。' },
  { icon: '🔄', title: '始终新鲜且紧跟潮流', description: '提示词库每日更新，包含最新的 AI 艺术趋势和创作技法。' },
  { icon: '🔗', title: '一键集成 Banana Pro AI', description: '与 Banana Pro AI 无缝集成，一键使用提示词直接跳转到创作界面，零摩擦体验。' },
  { icon: '🌐', title: '通用兼容性', description: '提示词支持多种主流 AI 图像生成工具，在 Banana Pro AI 所有模型上均可使用。' },
];

const WHY_ITEMS = [
  { icon: '📝', title: '包含 AI 提示词生成器', description: '不仅是一个提示词库，还内置了 AI 提示词生成器，帮助您从灵感到精准提示词一步到位。' },
  { icon: '🎨', title: '数字艺术家和插画师', description: '为专业艺术家提供启发性的提示词，加速您的创作探索和风格迭代。' },
  { icon: '📊', title: '内容创作者和社交媒体管理者', description: '快速获取引人注目的内容创意，提升社交媒体视觉内容质量。' },
  { icon: '💼', title: '营销专业人士', description: '生成高质量营销图像的最佳起点，从提示词到成品的最短路径。' },
];

const FAQS = [
  { question: '什么是 Banana Prompts？', answer: 'Banana Prompts 是一个专为 Banana Pro AI 设计的提示词资源平台，提供海量精选提示词、真实生成结果预览以及 AI 驱动的自定义提示词生成功能。' },
  { question: '如何使用 Banana Prompts 中的提示词？', answer: '点击您喜欢的提示词卡片，可以一键复制提示词或直接跳转到 Banana Pro AI 创作界面使用。也可以将提示词粘贴到任何兼容的 AI 图像生成工具中使用。' },
  { question: 'Banana Prompts 可以免费使用吗？', answer: '是的，浏览和复制 Banana Prompts 中的提示词完全免费。AI 自定义提示词生成功能需要登录 Banana Pro AI 账户使用。' },
  { question: '复制提示词和使用"立即使用"有什么区别？', answer: '复制提示词会将提示词文本复制到剪贴板，您可以在任何工具中使用。"立即使用"按钮会直接跳转到 Banana Pro AI 并预填充该提示词，让您立即开始生成。' },
];

export default function BananaPromptsClient() {
  const [promptText, setPromptText] = useState('');
  const fadeRef = useScrollFade();

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] text-sm font-medium mb-6">
          🍌 Banana Prompts
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 scroll-fade-in">
          <span className="gradient-glow-text">最新香蕉图像生成提示词</span>
          <span className="block text-white mt-2">示例与最佳实践</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 scroll-fade-in stagger-1">
          探索精彩的香蕉图像生成提示词及示例图片。从这些精心策划的提示词中获取灵感，创作出令人惊艳的图像。
        </p>

        {/* AI Prompt Generator */}
        <div className="max-w-2xl mx-auto scroll-fade-in stagger-2">
          <div className="gradient-glow-bg bg-[#1c2030] border border-[#363b4e] rounded-2xl p-4">
            <p className="text-sm text-white/50 mb-3">描述您的图片创意，让 AI 为您创建完美的 Banana Prompts 提示词</p>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="例如：一只在星空下的孤狼，写实风格，神秘氛围..."
              className="w-full bg-[#0f1117] border border-[#363b4e] rounded-xl px-4 py-3 text-white placeholder-white/30 resize-none focus:outline-none focus:border-[#ffcc33]/50 text-sm mb-3"
              rows={3}
            />
            <div className="flex justify-end gap-3">
              <Link
                href="/zh/image/banana-pro-ai/"
                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                直接创作
              </Link>
              <button
                className="highlight-button px-5 py-2 text-sm"
                onClick={() => {
                  if (promptText.trim()) {
                    alert('AI 提示词生成功能即将上线，请先使用下方精选提示词！');
                  }
                }}
              >
                ✨ 生成提示词
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prompt Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-2 scroll-fade-in gradient-glow-text">精选提示词示例</h2>
        <p className="text-white/50 mb-8 text-sm scroll-fade-in stagger-1">
          探索精彩的香蕉图像生成提示词及示例图片。从这些精心策划的提示词中获取灵感，创作出令人惊艳的图像。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMPLE_PROMPTS.map((item, i) => (
            <div key={item.id} className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <PromptCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 scroll-fade-in gradient-glow-text">
            从发现到创作：Banana Prompts 的工作原理
          </h2>
          <p className="text-white/50 text-center mb-12 scroll-fade-in stagger-1">三个简单步骤，从灵感到精彩图像</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className={`text-center scroll-fade-in stagger-${i + 1}`}>
                <div className="w-16 h-16 mx-auto rounded-2xl badge-gradient flex items-center justify-center text-black font-bold text-2xl mb-5">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3 gradient-glow-text">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 scroll-fade-in gradient-glow-text">
          让 Banana Prompts 成为必备工具的强大功能
        </h2>
        <p className="text-white/50 text-center mb-12 scroll-fade-in stagger-1">专为 AI 图像创作者打造的完整提示词生态</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/40 transition-all duration-300 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
            >
              <div className="w-12 h-12 rounded-full badge-gradient flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold gradient-glow-text mb-2">{f.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 scroll-fade-in gradient-glow-text">
            为什么 Banana Prompts 是终极提示词资源
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-xl p-5 hover:border-[#ffcc33]/30 transition-all duration-300 group scroll-fade-in stagger-${i + 1}`}
              >
                <div className="w-10 h-10 rounded-full badge-gradient flex items-center justify-center text-xl mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#ffcc33] transition-colors mb-2">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 scroll-fade-in gradient-glow-text">
          谁能从 Banana Prompts 中受益？
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: '🎨', label: '数字艺术家和插画师' },
            { icon: '📱', label: '内容创作者和社交媒体管理者' },
            { icon: '💼', label: '营销专业人士' },
            { icon: '🖥️', label: '网页设计师与开发者' },
            { icon: '📚', label: '教育工作者与培训专业人士' },
            { icon: '🤖', label: 'AI 爱好者与兴趣用户' },
          ].map((item, i) => (
            <div
              key={i}
              className={`text-center gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-xl p-4 hover:border-[#ffcc33]/40 transition-all duration-300 scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
            >
              <span className="text-3xl block mb-2">{item.icon}</span>
              <p className="text-xs text-white/70 leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
            社区对 Banana Prompts 的评价
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: '艾莉丝', role: '数字艺术家', content: 'Banana Prompts 彻底改变了我的创作流程。以前花30分钟调试提示词，现在直接找到高质量模板，效率提升了5倍！', rating: 5 },
              { name: '马库斯', role: '内容营销总监', content: '每天用 Banana Prompts 找灵感，生成的营销图像质量非常高。提示词库丰富多样，总能找到适合的风格。', rating: 5 },
              { name: '小白', role: 'AI 爱好者', content: '作为初学者，Banana Prompts 让我快速了解如何写出好的提示词。真实预览图太有帮助了，让我知道什么风格能生成什么效果。', rating: 5 },
            ].map((t, i) => (
              <div
                key={i}
                className={`gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/30 transition-all duration-300 scroll-fade-in stagger-${i + 1}`}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[#ffcc33]">★</span>
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          关于 Banana Prompts 的常见问题
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-[#13151f] border border-[#363b4e] rounded-xl overflow-hidden hover:border-[#ffcc33]/30 transition-colors" open={i === 0}>
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-sm font-semibold text-white group-hover:text-[#ffcc33] transition-colors list-none">
                {faq.question}
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0">▼</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 scroll-fade-in gradient-glow-text">
            立即使用 Banana Prompts 开始创作精彩图像
          </h2>
          <p className="text-white/60 mb-8 scroll-fade-in stagger-1">从海量精选提示词中获取灵感，创作出令人惊艳的 AI 图像</p>
          <Link href="/zh/image/banana-pro-ai/" className="highlight-button text-lg scroll-fade-in stagger-2">
            ✨ 立即开始创作
          </Link>
        </div>
      </section>
    </div>
  );
}

function PromptCard({ item }: { item: (typeof EXAMPLE_PROMPTS)[0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="gradient-glow-bg bg-[#13151f] border border-[#363b4e] rounded-2xl overflow-hidden hover:border-[#ffcc33]/50 transition-all duration-300 group hover:scale-[1.02]">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0f1117] image-hover-zoom">
        <Image
          src={item.image}
          alt={item.prompt.slice(0, 50)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Model Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[#ffcc33] text-[10px] font-bold border border-[#ffcc33]/30">
            {item.model}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-[#0f1117] border border-[#363b4e] text-white/50 text-[10px]">
              {tag}
            </span>
          ))}
        </div>

        {/* Prompt Text */}
        <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-3">{item.prompt}</p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 px-3 py-2 rounded-lg bg-[#0f1117] border border-[#363b4e] text-xs text-white/60 hover:text-white hover:border-[#ffcc33]/40 transition-all"
          >
            {copied ? '✓ 已复制' : '📋 复制提示词'}
          </button>
          <Link
            href="/zh/image/banana-pro-ai/"
            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-[#ffcc33]/20 to-[#ff9f43]/20 border border-[#ffcc33]/30 text-xs text-[#ffcc33] text-center hover:from-[#ffcc33]/30 hover:to-[#ff9f43]/30 transition-all"
          >
            ✨ 立即使用
          </Link>
        </div>
      </div>
    </div>
  );
}
