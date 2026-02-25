'use client';

import Link from 'next/link';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

const STEPS = [
  {
    num: '01',
    title: '创建新项目并打开画布',
    description: '从 Studio 仪表盘创建新项目，或使用快速创建表单即时描述您的创意。每个项目都会打开一个无限画布——您的专属创作空间，所有节点、连接和生成结果都会实时自动保存。',
  },
  {
    num: '02',
    title: '添加节点：图像、视频、文本或上传',
    description: '从侧边栏点击或拖拽添加节点到画布上。可选择图像生成、视频生成、文本提示或上传素材节点。图像节点支持 9+ AI 模型，视频节点支持 Veo 3 和 Veo 3.1 生成。',
  },
  {
    num: '03',
    title: '连接节点，构建创意工作流',
    description: '在节点之间拖拽连接以建立依赖关系。将文本节点的提示词输入图像节点，或将图像输出链接到视频节点作为参考帧。节点化工作流让您以可视化方式构建多步骤创意流水线——无需编码。',
  },
  {
    num: '04',
    title: '即时生成、预览和迭代',
    description: '点击任意节点上的"生成"按钮，数秒内即可产出 AI 图像或视频。直接在画布上预览结果。调整提示词重新生成、尝试不同的 AI 模型，或使用"基于此创建"衍生新的变体。',
  },
  {
    num: '05',
    title: '管理、导出，持续创作',
    description: '每次生成都保存在项目历史中。在历史面板中浏览过往作品，将其添加回画布，或导出无水印的高分辨率成果。使用键盘快捷键提速，撤销/重做保障信心。',
  },
];

const FEATURES = [
  {
    icon: '🖼️',
    title: '无限画布与可视化节点工作流',
    description: '在无限、可缩放的画布上工作，每个创意素材都以节点形式呈现。拖拽定位、连接构建工作流，放大缩小一览完整创意流水线。',
  },
  {
    icon: '🎨',
    title: '多模型 AI 图像生成',
    description: '在画布上直接使用 9+ 先进 AI 图像模型：Nano Banana Pro、Z-Image Turbo、Seedream、Flux Kontext Pro、GPT-4o Image 等。支持最高 4K 分辨率。',
  },
  {
    icon: '🎬',
    title: 'Veo 3 & Veo 3.1 AI 视频生成',
    description: '集成 Google 最新 Veo 3 和 Veo 3.1 视频生成模型，在画布上直接创作电影级 AI 视频内容。',
  },
  {
    icon: '🔗',
    title: '智能节点连接与创意流水线',
    description: '通过可视化连线构建复杂的多步骤创意工作流（文本 → 图像 → 视频），零编程门槛，直觉式操作。',
  },
  {
    icon: '💾',
    title: '项目管理：自动保存与版本历史',
    description: '所有工作实时自动保存，完整的版本历史让您随时回溯和对比不同版本的创作成果。',
  },
  {
    icon: '⌨️',
    title: '丰富交互：快捷键与批量操作',
    description: '支持键盘快捷键、右键菜单、批量生成等专业操作，为高效的创意工作流而设计。',
  },
];

const FAQS = [
  {
    question: '什么是 Banana Pro AI Studio？它是如何工作的？',
    answer: 'Banana Pro AI Studio 是一个可视化节点工作流创作平台，将多个 AI 生成模型与无限画布相结合。您可以在画布上创建节点（图像、视频、文本），将节点连接成创意工作流，并在同一界面中管理所有创作成果。',
  },
  {
    question: 'Banana Pro AI Studio 免费吗？',
    answer: '是的，Banana Pro AI Studio 提供免费版本。注册即可开始使用，部分高级模型和功能可能需要积分或订阅。',
  },
  {
    question: 'Banana Pro AI Studio 提供哪些 AI 模型？',
    answer: '图像生成支持 9+ 模型，包括 Nano Banana Pro、Z-Image Turbo、Seedream、Flux Kontext Pro、Flux Kontext Max、Qwen Image Edit、Grok Imagine 等。视频生成支持 Veo 3 和 Veo 3.1。',
  },
  {
    question: '画布上的节点连接和工作流是如何运作的？',
    answer: '在两个节点之间拖拽连线即可建立依赖关系。例如，将文本提示节点连接到图像生成节点，图像节点会自动使用文本节点的内容作为提示词。可以构建任意复杂度的多步骤工作流。',
  },
  {
    question: '可以一次生成多个变体吗？',
    answer: '是的！批量生成功能允许您一次创建多个变体（最多4个），帮助您快速探索不同的创意方向并选择最佳结果。',
  },
  {
    question: '自动保存如何工作？会丢失进度吗？',
    answer: '所有画布内容、节点配置和生成结果都会实时自动保存。即使意外关闭浏览器，重新打开项目时所有内容都完好无损。完整的版本历史让您可以随时回溯到任意保存点。',
  },
  {
    question: '在 Banana Pro AI Studio 中创建的图像和视频可以用于商业项目吗？',
    answer: '是的，使用 Banana Pro AI Studio 生成的内容可用于商业项目。请参考我们的使用条款了解具体的权利和限制。',
  },
  {
    question: 'Banana Pro AI Studio 有哪些键盘快捷键？',
    answer: '支持标准快捷键：Ctrl/Cmd+Z 撤销、Ctrl/Cmd+Y 重做、Space+拖拽平移画布、Ctrl+滚轮缩放。更多快捷键请在 Studio 界面的帮助菜单中查看完整列表。',
  },
];

export default function StudioClient() {
  const fadeRef = useScrollFade();

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] text-sm font-medium mb-6">
            🎨 AI 工作流工作室
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 scroll-fade-in">
            <span className="gradient-glow-text">AI 工作流画布工作室</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-4 scroll-fade-in stagger-1">
            描述你的想法，选择模型，在无限画布上生成图像或视频。
          </p>
          <p className="text-white/50 max-w-2xl mx-auto mb-10 scroll-fade-in stagger-2">
            Banana Pro AI Studio 将多个 AI 生成模型的强大能力与直观的可视化工作流画布相结合。创建图像、生成视频、将节点连接为创意流水线，全部在一个为创作者打造的免费工作空间中完成。
          </p>
          <div className="flex flex-wrap justify-center gap-4 scroll-fade-in stagger-3">
            <Link href="/zh/pricing/" className="highlight-button">
              🎨 免费开始使用
            </Link>
            <a
              href="#features"
              className="px-6 py-3 rounded-xl bg-[#1c2030] border border-[#363b4e] text-white font-semibold hover:border-[#ffcc33]/50 transition-colors"
            >
              了解更多
            </a>
          </div>
        </div>

        {/* Canvas Placeholder */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0a0c12] border border-[#363b4e] scroll-fade-in stagger-4 group hover:border-[#ffcc33]/30 transition-colors duration-500">
          {/* Grid Background */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(54,59,78,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(54,59,78,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Canvas Nodes (decorative) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-8">
              {/* Node 1 */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#1c2030] border border-[#363b4e] rounded-xl p-3 w-44">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#ffcc33] bg-[#ffcc33]/10 px-2 py-0.5 rounded">📝 文本提示</span>
                </div>
                <div className="h-2 bg-[#363b4e] rounded mb-1.5"></div>
                <div className="h-2 bg-[#363b4e] rounded w-3/4"></div>
                <div className="mt-2 flex justify-end">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc33]"></div>
                </div>
              </div>

              {/* Connection Line */}
              <div className="absolute left-52 top-1/2 -translate-y-px w-12 h-px bg-gradient-to-r from-[#ffcc33]/60 to-[#ffcc33]/60"></div>
              <div className="absolute left-60 top-1/2 -translate-y-1 w-2 h-2 border-r border-b border-[#ffcc33]/60 rotate-[-45deg]"></div>

              {/* Node 2 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[#1c2030] border-2 border-[#ffcc33]/60 rounded-xl p-3 w-52 shadow-[0_0_20px_rgba(255,204,51,0.15)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#ffcc33] bg-[#ffcc33]/10 px-2 py-0.5 rounded">🎨 图像生成</span>
                </div>
                <div className="h-16 bg-gradient-to-br from-[#ffcc33]/20 to-[#ff9f43]/20 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-[#ffcc33] text-2xl">🌅</span>
                </div>
                <div className="text-[10px] text-white/40 text-center">Nano Banana Pro</div>
                <div className="mt-2 flex justify-between">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc33]"></div>
                </div>
              </div>

              {/* Connection Line 2 */}
              <div className="absolute right-52 top-1/2 -translate-y-px w-12 h-px bg-gradient-to-r from-[#ffcc33]/60 to-[#ffcc33]/60"></div>

              {/* Node 3 */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1c2030] border border-[#363b4e] rounded-xl p-3 w-44">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#ffcc33] bg-[#ffcc33]/10 px-2 py-0.5 rounded">🎬 视频生成</span>
                </div>
                <div className="h-16 bg-[#0f1117] rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white/30 text-xl">▶</span>
                </div>
                <div className="text-[10px] text-white/40 text-center">Veo 3.1</div>
                <div className="mt-2 flex justify-start">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Studio Label */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ffcc33] animate-pulse"></div>
            <span className="text-xs text-white/50">Banana Pro AI Studio</span>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1">
            <button className="w-7 h-7 rounded bg-[#1c2030] border border-[#363b4e] text-white/50 text-sm flex items-center justify-center hover:text-white transition-colors">+</button>
            <span className="text-xs text-white/30 px-1">100%</span>
            <button className="w-7 h-7 rounded bg-[#1c2030] border border-[#363b4e] text-white/50 text-sm flex items-center justify-center hover:text-white transition-colors">−</button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 scroll-fade-in gradient-glow-text">
            5 个简单步骤：从创意到无限画布上的精彩 AI 作品
          </h2>
          <p className="text-white/50 text-center mb-12 scroll-fade-in stagger-1">系统化的创意工作流，让每一个想法都能变成精彩作品</p>

          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-6 gradient-glow-bg bg-[#0f1117] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/40 transition-all duration-300 group scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl badge-gradient flex items-center justify-center text-black font-bold text-lg shadow-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#ffcc33] transition-colors mb-2">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 scroll-fade-in gradient-glow-text">
          一站式 AI 创意工作室：在无限画布上生成图像与视频
        </h2>
        <p className="text-white/50 text-center mb-12 scroll-fade-in stagger-1">为专业创作者打造的完整 AI 工作流解决方案</p>

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

      {/* FAQ Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
            Banana Pro AI Studio 常见问题
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-[#0f1117] border border-[#363b4e] rounded-xl overflow-hidden hover:border-[#ffcc33]/30 transition-colors" open={i === 0}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-sm font-semibold text-white group-hover:text-[#ffcc33] transition-colors list-none">
                  {faq.question}
                  <span className="text-white/40 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-fade-in gradient-glow-text">
            立即开始构建您的 AI 创意工作流——免费
          </h2>
          <p className="text-white/60 mb-8 text-lg scroll-fade-in stagger-1">
            加入数千位使用 Banana Pro AI Studio 的创作者，在无限画布上释放您的创意潜力。
          </p>
          <Link href="/zh/pricing/" className="highlight-button text-lg scroll-fade-in stagger-2">
            🎨 免费开始使用 Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
