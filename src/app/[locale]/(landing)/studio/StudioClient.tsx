'use client';

import { useLocale } from 'next-intl';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  Plus, Link2, Sparkles, Download, FolderOpen,
  ChevronDown, ArrowRight,
  Layout, ImageIcon, Video, GitBranch, History, Keyboard,
} from 'lucide-react';

/* ──────────────────────────── Data ──────────────────────────── */




/* ──────────────────────────── Shared ──────────────────────────── */

function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 right-[16%] h-64 w-64 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffcc33] opacity-[0.08] blur-3xl" />
    </div>
  );
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ──────────────────────────── PAGE ──────────────────────────── */

export default function StudioClient() {
  const isZh = useLocale() === 'zh';
  const STEPS = [
    {
      num: 1, icon: FolderOpen,
      title: isZh ? '创建新项目并打开画布' : 'Create a new project and open the canvas',
      desc: isZh ? '从 Studio 仪表盘创建新项目，或使用快速创建表单即时描述您的创意。每个项目都会打开一个无限画布——您的专属创作空间，所有节点、连接和生成结果都会实时自动保存。' : 'Create a new project from the Studio dashboard, or use the quick creation form to instantly describe your ideas. Each project opens an infinite canvas—your dedicated creative space, where all nodes, connections, and generated results are automatically saved in real time.',
    },
    {
      num: 2, icon: Plus,
      title: isZh ? '添加节点：图像、视频、文本或上传' : 'Add nodes: Image, Video, Text, or Upload',
      desc: isZh ? '从侧边栏点击或拖拽添加节点到画布上。可选择图像生成、视频生成、文本提示或上传素材节点。图像节点支持 9+ AI 模型，视频节点支持 Veo 3 和 Veo 3.1 生成。' : 'Click or drag from the sidebar to add nodes to the canvas. You can choose image generation, video generation, text prompt, or upload asset nodes. Image nodes support 9+ AI models, and video nodes support Veo 3 and Veo 3.1 generation.',
    },
    {
      num: 3, icon: Link2,
      title: isZh ? '连接节点，构建创意工作流' : 'Connect nodes, build creative workflows',
      desc: isZh ? '在节点之间拖拽连接以建立依赖关系。将文本节点的提示词输入图像节点，或将图像输出链接到视频节点作为参考帧。这种节点化工作流让您以可视化方式构建多步骤创意流水线——无需编码。' : 'Drag connections between nodes to establish dependencies. Input text node prompts into image nodes, or link image outputs to video nodes as reference frames. This node-based workflow allows you to visually build multi-step creative pipelines—no coding required.',
    },
    {
      num: 4, icon: Sparkles,
      title: isZh ? '即时生成、预览和迭代' : 'Instant generation, preview, and iteration',
      desc: isZh ? '点击任意节点上的"生成"按钮，数秒内即可产出 AI 图像或视频。直接在画布上预览结果。不满意？调整提示词重新生成、尝试不同的 AI 模型，或使用"基于此创建"衍生新的变体。' : 'Click the "Generate" button on any node to produce AI images or videos in seconds. Preview results directly on the canvas. Not satisfied? Adjust prompts to regenerate, try different AI models, or use "Create from this" to derive new variations.',
    },
    {
      num: 5, icon: Download,
      title: isZh ? '管理、导出，持续创作' : 'Manage, export, continue creating',
      desc: isZh ? '每次生成都保存在项目历史中。在历史面板中浏览过往作品，将其添加回画布，或导出无水印的高分辨率成果。使用键盘快捷键提速，撤销/重做保障信心——一切为专业创意工作流而设计。' : 'Every generation is saved in the project history. Browse past creations in the history panel, add them back to the canvas, or export high-resolution, watermark-free results. Use keyboard shortcuts to speed up, undo/redo to ensure confidence—all designed for professional creative workflows.',
    },
  ];

  const FEATURES_DETAIL = [
    {
      title: isZh ? '无限画布与可视化节点工作流' : 'Infinite Canvas and Visual Node Workflow',
      desc: isZh ? '在无限、可缩放的画布上工作，每个创意素材都以节点形式呈现。拖拽定位、连接构建工作流，放大缩小一览完整创意流水线。可视化方式让复杂的多步骤生成变得直观——没有隐藏菜单，没有线性限制。' : 'Work on an infinite, scalable canvas where every creative asset is represented as a node. Drag to position, connect to build workflows, zoom in and out to view the complete creative pipeline. The visual approach makes complex multi-step generation intuitive—no hidden menus, no linear limitations.',
      image: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp',
    },
    {
      title: isZh ? '多模型 AI 图像生成' : 'Multi-model AI Image Generation',
      desc: isZh ? '在画布上直接使用 9+ 先进 AI 图像模型。用 Nano Banana Pro、Z-Image Turbo、Seedream 或 GPT-4o Image 从文本提示生成。上传参考图像，使用 Flux Kontext Pro、Qwen Image Edit 和 Grok Imagine 进行风格转换。支持 1:1 到 21:9 的宽高比，分辨率最高 4K。' : 'Directly use 9+ advanced AI image models on the canvas. Generate from text prompts with Nano Banana Pro, Z-Image Turbo, Seedream, or GPT-4o Image. Upload reference images and use Flux Kontext Pro, Qwen Image Edit, and Grok Imagine for style transfer. Supports aspect ratios from 1:1 to 21:9, with resolutions up to 4K.',
      image: 'https://static.banana2ai.net/images/showcase/ai-models.webp',
    },
    {
      title: isZh ? 'Veo 3 & Veo 3.1 AI 视频生成' : 'Veo 3 & Veo 3.1 AI Video Generation',
      desc: isZh ? '在画布工作流中直接创建 AI 视频。Veo 3.1 Premium 和 Basic 模型可从文本描述或参考图像生成高质量视频。选择 16:9 或 9:16 宽高比，适配横屏或竖屏内容。将图像节点连接到视频节点，以 AI 生成的画作作为起始帧。' : 'Directly create AI videos within your canvas workflow. Veo 3.1 Premium and Basic models can generate high-quality videos from text descriptions or reference images. Choose 16:9 or 9:16 aspect ratios for landscape or portrait content. Connect image nodes to video nodes to use AI-generated artwork as starting frames.',
      image: 'https://static.banana2ai.net/images/showcase/video-generation.webp',
    },
    {
      title: isZh ? '智能节点连接与创意流水线' : 'Smart Node Connections and Creative Pipelines',
      desc: isZh ? '从一个节点的输出端拖拽到另一个节点的输入端即可建立依赖关系。文本节点提供提示词，图像节点提供参考视觉，视频节点接收两者。系统自动验证连接——确保输入兼容，防止错误。通过简单的拖放操作，构建文本→图像→视频等复杂多步骤工作流。' : 'Drag from a node’s output port to another node’s input port to establish dependencies. Text nodes provide prompts, image nodes provide visual references, and video nodes receive both. The system automatically validates connections—ensuring input compatibility and preventing errors. Build complex multi-step workflows like text→image→video with simple drag-and-drop operations.',
      image: 'https://static.banana2ai.net/images/avatars/8pk4idwouhh0.webp',
    },
    {
      title: isZh ? '项目管理：自动保存与版本历史' : 'Project Management: Auto-Save and Version History',
      desc: isZh ? '每项更改都实时自动保存——永不丢失您的作品。在专用历史面板中按图像和视频分类浏览生成历史。每个项目追踪所有节点、连接和输出。自由撤销和重做。在仪表盘上创建、重命名和管理多个项目。' : 'Every change is automatically saved in real time—never lose your work. Browse generation history categorized by images and videos in the dedicated history panel. Each project tracks all nodes, connections, and outputs. Freely undo and redo. Create, rename, and manage multiple projects on the dashboard.',
      image: 'https://static.banana2ai.net/images/avatars/b88usp2lk4ef.webp',
    },
    {
      title: isZh ? '丰富交互：右键菜单、键盘快捷键与批量操作' : 'Rich Interaction: Right-Click Menus, Keyboard Shortcuts, and Batch Operations',
      desc: isZh ? '右键点击画布快速操作：添加节点、上传、撤销、重做、粘贴。使用键盘快捷键——Cmd/Ctrl+Z 撤销、Cmd/Ctrl+C 复制、Delete 删除。批量生成变体、复制节点、从已有结果衍生新节点。专为创意速度打造的专业级工具。' : 'Right-click the canvas for quick actions: add nodes, upload, undo, redo, paste. Use keyboard shortcuts—Cmd/Ctrl+Z for undo, Cmd/Ctrl+C for copy, Delete for delete. Batch generate variations, duplicate nodes, derive new nodes from existing results. Professional-grade tools built for creative speed.',
      image: 'https://static.banana2ai.net/images/showcase/interactive-tools.webp',
    },
  ];

  const FAQ_ITEMS = [
    {
      q: isZh ? '什么是 Banana Pro AI Studio？它是如何工作的？' : 'What is Banana Pro AI Studio? How does it work?',
      a: isZh ? 'Banana Pro AI Studio 是一个免费的可视化工作流画布，专为 AI 内容创作设计。它让您使用多个 AI 模型生成图像和视频，所有内容都组织在一个无限、可缩放的画布上。创建项目 → 添加节点 → 连接工作流 → 生成并迭代 → 导出成果。一切实时自动保存，节点化的可视化方式让复杂的 AI 工作流变得直观易用。' : 'Banana Pro AI Studio is a free visual workflow canvas designed for AI content creation. It allows you to generate images and videos using multiple AI models, all organized on an infinite, scalable canvas. Create a project → add nodes → connect workflows → generate and iterate → export results. Everything is automatically saved in real time, and the node-based visual approach makes complex AI workflows intuitive and easy to use.',
    },
    {
      q: isZh ? 'Banana Pro AI Studio 免费吗？' : 'Is Banana Pro AI Studio free?',
      a: isZh ? '是的！Banana Pro AI Studio 凭您的 Banana Pro AI 账户即可免费使用。免费注册——无需信用卡——即可获得每日 AI 图像和视频生成积分。免费账户包括：无限画布和项目创建、所有 AI 模型访问权限、自动保存和版本历史、无水印高分辨率导出。高级计划为高频用户提供更多积分和优先处理。' : 'Yes! Banana Pro AI Studio is free to use with your Banana Pro AI account. Register for free—no credit card needed—to get daily AI image and video generation credits. Free accounts include: infinite canvas and project creation, access to all AI models, auto-save and version history, and watermark-free high-resolution exports. Premium plans offer more credits and priority processing for frequent users.',
    },
    {
      q: isZh ? 'Banana Pro AI Studio 提供哪些 AI 模型？' : 'Which AI models does Banana Pro AI Studio offer?',
      a: isZh ? '图像生成模型：Nano Banana Pro（Google Gemini 驱动）、GPT-4o Image、Flux Kontext Pro/Max、Z-Image Turbo、Seedream、Qwen Image Edit、Grok Imagine 等 9+ 模型。视频生成模型：Veo 3.1 Premium、Veo 3.1 Basic。所有模型均可在画布上直接使用，只需从节点的下拉菜单中选择。' : 'Image generation models: Nano Banana Pro (powered by Google Gemini), GPT-4o Image, Flux Kontext Pro/Max, Z-Image Turbo, Seedream, Qwen Image Edit, Grok Imagine, and 9+ other models. Video generation models: Veo 3.1 Premium, Veo 3.1 Basic. All models can be used directly on the canvas; simply select from the node’s dropdown menu.',
    },
    {
      q: isZh ? '画布上的节点连接和工作流是如何运作的？' : 'How do node connections and workflows work on the canvas?',
      a: isZh ? '每个节点都有输入和输出端口（左右两侧的小圆圈）。从输出端拖拽到输入端即可建立连接。工作流示例：文本节点（提示词）→ 图像节点（生成图片）→ 视频节点（以图片为首帧生成视频）。系统自动验证连接兼容性，无需任何编码或技术配置即可构建复杂的创意工作流。' : 'Each node has input and output ports (small circles on the left and right sides). Drag from an output port to an input port to establish a connection. Workflow example: Text node (prompt) → Image node (generate image) → Video node (generate video using the image as the first frame). The system automatically validates connection compatibility, allowing you to build complex creative workflows without any coding or technical configuration.',
    },
    {
      q: isZh ? '可以一次生成多个变体吗？' : 'Can multiple variants be generated at once?',
      a: isZh ? '可以！Banana Pro AI Studio 支持批量生成。在节点设置中选择批量数量（最多 4 个），点击生成即可同时创建多个变体。结合"基于此创建"功能（从已有结果创建衍生的新节点），您可以快速迭代，直到找到完美的创意方向。' : 'Yes! Banana Pro AI Studio supports batch generation. In the node settings, select the batch quantity (up to 4), click generate to create multiple variants simultaneously. Combined with the "Create from This" feature (creating new derivative nodes from existing results), you can quickly iterate until you find the perfect creative direction.',
    },
    {
      q: isZh ? '自动保存如何工作？会丢失进度吗？' : 'How does auto-save work? Will I lose my progress?',
      a: isZh ? 'Banana Pro AI Studio 采用双层自动保存系统：本地优先保存（更改即时保存到浏览器）+ 云端同步（自动上传到服务器，跨设备同步）。此外，所有生成结果保存在云端资产库中，即使清除浏览器数据也不会丢失生成的图像和视频。您的创作在每一步都受到保护。' : 'Banana Pro AI Studio uses a dual-layer auto-save system: local-first saving (changes are instantly saved to the browser) + cloud synchronization (automatically uploaded to the server, synchronized across devices). In addition, all generated results are saved in the cloud asset library, so even if you clear browser data, your generated images and videos will not be lost. Your creations are protected every step of the way.',
    },
    {
      q: isZh ? 'Banana Pro AI Studio 有哪些键盘快捷键？' : 'What are the keyboard shortcuts for Banana Pro AI Studio?',
      a: isZh ? '导航：滚轮缩放、空格+拖拽平移、Cmd/Ctrl+0 重置视图。编辑：Cmd/Ctrl+Z 撤销、Cmd/Ctrl+Shift+Z 重做、Cmd/Ctrl+C 复制、Cmd/Ctrl+V 粘贴、Delete/Backspace 删除。节点：双击画布创建新节点、Tab 打开快速添加菜单。' : 'Navigation: Scroll wheel zoom, Space + drag to pan, Cmd/Ctrl+0 to reset view. Editing: Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo, Cmd/Ctrl+C copy, Cmd/Ctrl+V paste, Delete/Backspace delete. Nodes: Double click canvas to create new node, Tab to open quick add menu.',
    },
  ];

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen bg-[#0f1117] text-white">

      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1117] via-[#161926] to-[#0f1117] px-4 py-12 md:py-20">
        <GlowOrbs />
        <div className="relative mx-auto max-w-[1400px] text-center">
          <FadeIn>
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              AI {isZh ? '工作流画布工作室' : 'Workflow Canvas Studio'}
            </h1>
            <h2 className="mt-2 text-xs font-bold text-white/70 sm:mt-3 sm:text-sm md:mt-4 md:text-base lg:text-xl">
              {isZh ? '描述你的想法，选择模型，在无限画布上生成图像或视频。' : 'Describe your idea, select a model, generate images or videos on an infinite canvas.'}
            </h2>
          </FadeIn>

          {/* Studio preview mockup */}
          <FadeIn delay={0.2} className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] shadow-2xl">
              {/* Top bar */}
              <div className="flex items-center gap-3 border-b border-[#363b4e] bg-[#1c2030] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-white/40">Banana Pro AI Studio</span>
              </div>
              {/* Canvas preview */}
              <div className="relative aspect-video bg-[#0a0c14] p-8">
                {/* Simulated nodes */}
                <div className="absolute left-[10%] top-[20%] rounded-lg border border-[#363b4e] bg-[#1c2030] px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#ffcc33]" />
                    <span className="text-xs font-medium">{isZh ? '文本提示' : 'Text Prompt'}</span>
                  </div>
                  <p className="mt-1 max-w-[140px] text-xs text-white/40">{isZh ? '一只猫在月光下...' : 'A cat under the moonlight...'}</p>
                </div>
                <div className="absolute left-[40%] top-[35%] rounded-lg border border-[#ffcc33]/30 bg-[#1c2030] px-4 py-3 shadow-lg shadow-[#ffcc33]/5">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-3 w-3 text-[#ffcc33]" />
                    <span className="text-xs font-medium">{isZh ? '图像生成' : 'Image Generation'}</span>
                  </div>
                  <div className="mt-2 h-16 w-24 rounded bg-gradient-to-br from-[#ffcc33]/10 to-[#ff9900]/10" />
                </div>
                <div className="absolute right-[15%] top-[25%] rounded-lg border border-[#363b4e] bg-[#1c2030] px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Video className="h-3 w-3 text-[#ffcc33]" />
                    <span className="text-xs font-medium">{isZh ? '视频生成' : 'Video Generation'}</span>
                  </div>
                  <div className="mt-2 h-16 w-24 rounded bg-gradient-to-br from-[#ff9900]/10 to-[#ffcc33]/10" />
                </div>
                {/* Connection lines (SVG) */}
                <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: 'none' }}>
                  <line x1="25%" y1="35%" x2="42%" y2="45%" stroke="#ffcc33" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="6 4" />
                  <line x1="58%" y1="50%" x2="75%" y2="40%" stroke="#ffcc33" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="6 4" />
                </svg>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.35} className="mt-8">
            <Link
              href="/zh/studio/"
              className="highlight-button group inline-flex items-center px-8 py-3 text-lg"
            >
              {isZh ? '免费打开 Studio' : 'Open Studio for Free'}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ─── 2. Five Steps ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              5 {isZh ? '个简单步骤：从创意到无限画布上的精彩 AI 作品' : 'Simple Steps: From Idea to Stunning AI Creations on an Infinite Canvas'}
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-5xl md:text-base">
              Banana Pro AI Studio {isZh ? '以可视化节点工作流画布革新您的创作流程。生成专业级 AI 图像和视频，连接节点构建创意流水线，自由迭代——一切尽在统一工作空间。' : 'Revolutionize your creative process with a visual node workflow canvas. Generate professional-grade AI images and videos, connect nodes to build creative pipelines, and iterate freely—all in a unified workspace.'}
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative z-10 flex flex-wrap justify-center gap-8 md:flex-nowrap">
              {STEPS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="group relative w-full max-w-[240px] overflow-hidden rounded-xl border border-[#363b4e]/40 bg-gradient-to-br from-[#1c2030]/80 to-[#252a3d]/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#ffcc33]/50 hover:shadow-xl hover:shadow-[#ffcc33]/10 sm:w-[220px]">
                    <div className="absolute left-4 top-3 z-10 flex h-8 w-8 items-center justify-center">
                      <div className="badge-gradient absolute inset-0 rounded-full opacity-95 transition-all duration-300 group-hover:scale-110" />
                      <span className="relative text-sm font-bold text-black">{step.num}</span>
                    </div>
                    <div className="relative z-10 p-5 pt-14">
                      <div className="mb-4 flex justify-center">
                        <div className="gradient-glow-bg relative overflow-hidden rounded-xl border border-[#363b4e]/40 bg-[#13151f]/50 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-[#ffcc33]/60 group-hover:shadow-lg group-hover:shadow-[#ffcc33]/20">
                          <step.icon className="h-10 w-10 text-[#ffcc33]" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="gradient-glow-text mb-2 text-base font-semibold transition-all duration-300 group-hover:scale-105 md:text-lg">{step.title}</h3>
                        <p className="text-xs text-white/50 md:text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
                      <div className="badge-gradient flex h-8 w-8 items-center justify-center rounded-full border border-[#363b4e]/40 shadow-lg">
                        <ArrowRight className="h-3 w-3 text-black" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 3. Features (Alternating Layout) ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-20 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              {isZh ? '一站式 AI 创意工作室：在无限画布上生成图像与视频' : 'One-Stop AI Creative Studio: Generate Images and Videos on an Infinite Canvas'}
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/50 md:max-w-4xl md:text-base">
              Banana Pro AI Studio {isZh ? '将多个 AI 生成模型的强大能力与直观的可视化工作流画布相结合。创建图像、生成视频、将节点连接为创意流水线、管理完整项目——全部在一个免费工作空间中完成。' : 'Combine the power of multiple AI generation models with an intuitive visual workflow canvas. Create images, generate videos, connect nodes into creative pipelines, and manage complete projects—all in one free workspace.'}
            </p>
          </FadeIn>
          <div className="space-y-36 md:space-y-56">
            {FEATURES_DETAIL.map((feat, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
                  <FadeIn className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="relative overflow-hidden rounded-3xl shadow-lg">
                      <Image src={feat.image} alt={feat.title} width={800} height={500} className="w-full rounded-lg object-cover transition-transform duration-700 hover:scale-105" />
                    </div>
                  </FadeIn>
                  <FadeIn className={`mt-10 lg:mt-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`} delay={0.15}>
                    <div className="lg:px-8">
                      <h3 className="gradient-glow-text mb-6 text-3xl md:text-4xl">{feat.title}</h3>
                      <p className="text-base text-white/90 md:text-lg">{feat.desc}</p>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. FAQ ─── */}
      <section className="relative px-4 py-16 md:py-24">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
              Banana Pro AI Studio {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
          </FadeIn>
          <div className="mx-auto max-w-7xl">
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="mb-4 overflow-hidden rounded-xl border border-[#363b4e] bg-[#0f1117] shadow-sm transition-all hover:border-[#ffcc33]/30 hover:shadow-md">
                  <button onClick={() => setOpenFaq(isOpen ? -1 : i)} className={`flex w-full items-center justify-between p-6 text-left md:p-8 ${isOpen ? 'border-b border-[#363b4e]/50' : ''}`}>
                    <h3 className={`text-lg font-semibold transition-colors duration-200 md:text-xl ${isOpen ? 'text-[#ffcc33]' : 'text-white'}`}>{faq.q}</h3>
                    <div className={`ml-4 flex-shrink-0 rounded-full p-1 transition-all ${isOpen ? 'bg-[#ffcc33]/10' : 'bg-[#1c2030]'}`}>
                      <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ffcc33]' : 'text-white/50'}`} />
                    </div>
                  </button>
                  <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}>
                    <div className="p-6 pt-4 text-sm text-white/60 md:p-8 md:pt-6 md:text-base">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. CTA ─── */}
      <section className="relative px-4 py-20 md:py-28">
        <GlowOrbs />
        <div className="relative mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-20">
            <FadeIn className="mb-12 text-center lg:mb-0 lg:text-left">
              <div className="lg:pr-8">
                <h2 className="gradient-glow-text mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {isZh ? '立即开始构建您的 AI 创意工作流——免费' : 'Start Building Your AI Creative Workflow Now—For Free'}
                </h2>
                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                  {isZh ? '加入数千名创作者，使用 Banana Pro AI Studio 的无限画布和可视化节点工作流。免费注册，无需信用卡。立即在无限画布上构建您的第一个 AI 创意工作流。' : 'Join thousands of creators using Banana Pro AI Studio with its infinite canvas and visual node workflow. Register for free, no credit card needed. Start building your first AI creative workflow on an infinite canvas now.'}
                </p>
                <Link href="/zh/studio/" className="highlight-button group inline-flex items-center px-8 py-3 text-lg">
                  {isZh ? '免费打开 Studio' : 'Open Studio for Free'} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn className="relative mx-auto w-full max-w-md lg:max-w-none" delay={0.15}>
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl" style={{ maskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, white 50%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.4) 70%, transparent 100%)' }}>
                <Image src="https://static.banana2ai.net/images/cta-cover.webp" alt="Studio" fill className="object-cover" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
