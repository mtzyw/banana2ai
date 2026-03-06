'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, CheckCircle, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Info, Gem, Images, Coins, Download } from 'lucide-react';
import { useSession } from '@/core/auth/client';

/* ── Aspect ratios with visual shape hints ── */
const ASPECT_RATIOS = [
  { label: '16:9', w: 'w-11', h: 'h-6' },
  { label: '5:4',  w: 'w-8',  h: 'h-6' },
  { label: '4:3',  w: 'w-8',  h: 'h-6' },
  { label: '3:2',  w: 'w-9',  h: 'h-6' },
  { label: '1:1',  w: 'w-7',  h: 'h-7' },
  { label: '2:3',  w: 'w-5',  h: 'h-7' },
  { label: '3:4',  w: 'w-6',  h: 'h-8' },
  { label: '4:5',  w: 'w-6',  h: 'h-8' },
  { label: '9:16', w: 'w-5',  h: 'h-9' },
  { label: '21:9', w: 'w-12', h: 'h-6' },
];

const RESOLUTIONS = ['1K', '2K', '4K'];
const QUANTITIES = [1, 2, 3, 4];

/* ── Credit calculation (matches source site logic) ── */
function calculateImageCredits(modelId: string, quantity: number, resolution: string): number {
  const base: Record<string, number | Record<string, number>> = {
    'nano-banana': 4,
    'nano-banana-pro': 10,
    'nano-banana-2': { '1K': 10, '2K': 15, '4K': 20 },
    'gpt-4o-image': 4,
    'flux-kontext-pro': 3,
    'flux-kontext-max': 6,
    'seedream-4': 2,
    'seedream-5-lite': 5,
    'qwen-image': 3,
    'grok-imagine': 2,
    'z-image-turbo': 3,
  };
  const cost = base[modelId];
  if (!cost) return 10 * quantity;
  if (typeof cost === 'number') return cost * quantity;
  return (cost[resolution] ?? cost['1K'] ?? 10) * quantity;
}

/* ── AI Models ── */
type AIModel = {
  id: string;
  apiModel: string; // Kie.ai model identifier
  name: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  desc: string;
  descEn: string;
  credits: string;
  hd?: boolean;
  modes: ('text' | 'image')[];
  recommended?: boolean;
  // Model-specific capabilities
  hasNegativePrompt?: boolean;
  hasGuidanceScale?: boolean;
  hasSteps?: boolean;
  hasSafetyChecker?: boolean;
  hasStyle?: boolean;        // e.g. Ideogram styles
  ratios?: string[];         // override default ratios
  resolutions?: string[];    // override default resolutions
  maxQuantity?: number;      // max images per request
};

const AI_MODELS: AIModel[] = [
  {
    id: 'nano-banana',
    apiModel: 'google/nano-banana',
    name: 'Nano Banana',
    badge: 'SMART',
    badgeColor: 'bg-white/10 text-white/70',
    desc: '由 Google 提供支持的先进 AI 模型，擅长自然语言驱动的图像生成',
    descEn: 'Advanced AI model excelling in natural language-driven image generation powered by Google',
    credits: '4+',
    modes: ['text', 'image'],
  },
  {
    id: 'nano-banana-pro',
    apiModel: 'nano-banana-pro',
    name: 'Nano Banana Pro',
    badge: 'PRO',
    badgeColor: 'bg-[#ffcc33]/20 text-[#ffcc33]',
    desc: '由 Google 提供支持的专业 AI 图像生成，具备增强质量和高级控制功能',
    descEn: 'Professional AI image generation with enhanced quality and advanced controls powered by Google',
    credits: '10+',
    hd: true,
    modes: ['text', 'image'],
    recommended: true,
    hasGuidanceScale: true,
    hasSafetyChecker: true,
  },
  {
    id: 'nano-banana-2',
    apiModel: 'nano-banana-2',
    name: 'Nano Banana 2',
    badge: 'NEW',
    badgeColor: 'bg-white/10 text-white/70',
    desc: '由 Google 提供支持的新一代 Flash 模型，具备闪电般速度和专业级一致性',
    descEn: 'Next-gen Flash model delivering lightning speed and Pro-level consistency powered by Google',
    credits: '10+',
    hd: true,
    modes: ['text'],
    recommended: true,
    hasNegativePrompt: true,
    maxQuantity: 4,
  },
  {
    id: 'gpt-4o-image',
    apiModel: 'gpt-image/text-to-image',  // TODO: verify Kie.ai model name - currently 422
    name: 'GPT-4o Image',
    badge: 'STD',
    badgeColor: 'bg-white/10 text-white/70',
    icon: 'openai',
    desc: 'AI 驱动的图像生成与编辑',
    descEn: 'AI-powered image generation and editing',
    credits: '4+',
    modes: ['text', 'image'],
  },
  {
    id: 'flux-kontext-pro',
    apiModel: 'flux-kontext/pro',  // TODO: verify Kie.ai model name - currently 422
    name: 'Flux Kontext Pro',
    badge: 'PRO',
    badgeColor: 'bg-[#ffcc33]/20 text-[#ffcc33]',
    icon: 'flux',
    desc: '生成富含上下文信息的逼真场景，用于插画和故事叙述',
    descEn: 'Generate context-rich realistic scenes for illustration and storytelling',
    credits: '3+',
    modes: ['text', 'image'],
    hasGuidanceScale: true,
    hasSteps: true,
  },
  {
    id: 'flux-kontext-max',
    apiModel: 'flux-kontext/max',  // TODO: verify Kie.ai model name - currently 422
    name: 'Flux Kontext Max',
    badge: 'MAX',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    icon: 'flux',
    desc: '为高端艺术和设计项目创建高度精细、复杂的视觉效果',
    descEn: 'Create highly detailed, complex visuals for high-end art and design projects',
    credits: '6+',
    modes: ['text', 'image'],
  },
  {
    id: 'seedream-4',
    apiModel: 'bytedance/seedream',
    name: 'Seedream 4.0',
    badge: 'FAST',
    badgeColor: 'bg-green-500/20 text-green-400',
    icon: 'bytedance',
    desc: '字节跳动先进图像生成模型，具有卓越的质量和创意控制能力',
    descEn: 'ByteDance advanced image generation model with exceptional quality and creative control',
    credits: '2+',
    modes: ['text', 'image'],
    hasGuidanceScale: true,
    hasSafetyChecker: true,
  },
  {
    id: 'seedream-5-lite',
    apiModel: 'bytedance/seedream',  // Kie.ai only has generic seedream model
    name: 'Seedream 5.0 Lite',
    badge: 'NEW',
    badgeColor: 'bg-white/10 text-white/70',
    icon: 'bytedance',
    desc: '字节跳动统一多模态图像生成模型，具备推理和可控视觉创作能力',
    descEn: 'ByteDance unified multimodal image generation model with reasoning and controllable visual creation',
    credits: '5+',
    modes: ['text', 'image'],
    hasGuidanceScale: true,
    hasSafetyChecker: true,
  },
  {
    id: 'qwen-image',
    apiModel: 'qwen/text-to-image',
    name: 'Qwen Image',
    badge: 'BASIC',
    badgeColor: 'bg-blue-500/20 text-blue-400',
    icon: 'wan',
    desc: '高级图像生成与编辑，精确控制风格和细节',
    descEn: 'Advanced image generation and editing with precise style and detail control',
    credits: '3+',
    modes: ['text'],
    hasNegativePrompt: true,
    hasGuidanceScale: true,
    hasSteps: true,
    hasSafetyChecker: true,
  },
  {
    id: 'grok-imagine',
    apiModel: 'grok-imagine/text-to-image',
    name: 'Grok Imagine',
    badge: 'NEW',
    badgeColor: 'bg-white/10 text-white/70',
    icon: 'grok',
    desc: 'xAI 文生图功能，每次请求生成 6 张独特图像',
    descEn: 'xAI text-to-image with stunning visuals - 6 unique images per request',
    credits: '2+',
    modes: ['text'],
  },
  {
    id: 'z-image-turbo',
    apiModel: 'z-image',
    name: 'Z-Image Turbo',
    badge: 'FAST',
    badgeColor: 'bg-green-500/20 text-green-400',
    icon: 'wan',
    desc: '通义超快文生图模型，具备照片级真实感和双语文本渲染',
    descEn: 'Ultra-fast 6B parameter text-to-image model with photorealistic output',
    credits: '3+',
    modes: ['text'],
    hasSteps: true,
    hasSafetyChecker: true,
  },
];

/* ── Example slides ── */
export type ExampleSlide = {
  before: string;
  after: string;
  prompt: string;
};

const DEFAULT_EXAMPLES: ExampleSlide[] = [
  {
    before: 'https://static.banana2ai.net/images/generator/example-v3-before-1.webp',
    after:  'https://static.banana2ai.net/images/generator/example-v3-after-1.webp',
    prompt: 'Turn this selfie into a 3D collectible blind box figure — keep my features, place in clear acrylic packaging with miniature accessories and studio lighting.',
  },
  {
    before: 'https://static.banana2ai.net/images/generator/example-v3-before-2.webp',
    after:  'https://static.banana2ai.net/images/generator/example-v3-after-2.webp',
    prompt: 'Reimagine this street photo in Studio Ghibli anime style — same person and composition, hand-painted watercolor textures, magical golden-hour atmosphere.',
  },
  {
    before: 'https://static.banana2ai.net/images/generator/example-v3-before-3.webp',
    after:  'https://static.banana2ai.net/images/generator/example-v3-after-3.webp',
    prompt: 'Upgrade this couple photo to a cinematic magazine cover — dramatic rim lighting, rich color grading, shallow depth of field, editorial quality.',
  },
];

type Mode = 'text' | 'image';
type GenerateState = 'idle' | 'loading' | 'done';

interface GeneratedImage {
  id: string;
  prompt: string;
  ratio: string;
  model: string;
  images: string[];
  createdAt: string;
  mode?: string;
}

interface ImageGeneratorProps {
  examples?: ExampleSlide[];
}

export default function ImageGenerator({ examples }: ImageGeneratorProps) {
  const t = useTranslations('banana.imageGenerator');
  const isZh = useLocale() === 'zh';
  const { data: session } = useSession();
  const EXAMPLES = examples ?? DEFAULT_EXAMPLES;
  const [selectedModel, setSelectedModel] = useState<AIModel>(AI_MODELS[1]); // default: Pro
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('text');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [guidanceScale, setGuidanceScale] = useState(2.5);
  const [steps, setSteps] = useState(30);
  const [safetyChecker, setSafetyChecker] = useState(true);
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [resolution, setResolution] = useState('1K');
  const [quantity, setQuantity] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [generateState, setGenerateState] = useState<GenerateState>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const pollingRef = useRef(false);

  // Fetch user's past image generations on mount
  useEffect(() => {
    if (!session?.user) return;
    (async () => {
      try {
        const res = await fetch('/api/user/tasks?mediaType=image&limit=20');
        const data = await res.json();
        if (data.code === 0 && data.data?.tasks) {
          const items: GeneratedImage[] = data.data.tasks
            .filter((t: any) => t.status === 'completed' || t.status === 'success')
            .map((t: any) => {
              let images: string[] = [];
              try {
                // Primary: taskInfo.images[].imageUrl
                const info = typeof t.taskInfo === 'string' ? JSON.parse(t.taskInfo) : t.taskInfo;
                if (info?.images && Array.isArray(info.images)) {
                  images = info.images.map((img: any) => img.imageUrl).filter(Boolean);
                }
                // Fallback: taskResult
                if (images.length === 0) {
                  const result = typeof t.taskResult === 'string' ? JSON.parse(t.taskResult) : t.taskResult;
                  if (Array.isArray(result)) images = result;
                  else if (result?.output) images = Array.isArray(result.output) ? result.output : [result.output];
                  else if (result?.url) images = [result.url];
                  else if (result?.urls) images = result.urls;
                }
              } catch { /* ignore parse errors */ }
              return {
                id: t.id,
                prompt: t.prompt || '',
                ratio: t.options?.aspect_ratio || '1:1',
                model: t.model || '',
                images,
                createdAt: t.createdAt || new Date().toISOString(),
              };
            })
            .filter((item: GeneratedImage) => item.images.length > 0);
          setGeneratedImages(items);
        }
      } catch { /* ignore */ }
    })();
  }, [session?.user]);

  // Reset mode if model doesn't support current mode
  useEffect(() => {
    if (mode === 'image' && !selectedModel.modes.includes('image')) {
      setMode('text');
    }
  }, [selectedModel, mode]);

  // Close model dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
    };
    if (modelDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modelDropdownOpen]);

  const filteredModels = AI_MODELS.filter(m =>
    m.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  // Auto-dismiss error after 5s
  useEffect(() => {
    if (!errorMsg) return;
    const timer = setTimeout(() => setErrorMsg(null), 5000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const pollTaskResult = useCallback(async (taskDbId: string, currentPrompt: string, currentRatio: string, currentModel: string) => {
    pollingRef.current = true;
    const maxAttempts = 60; // 2 min max
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(r => setTimeout(r, 2000));
      if (!pollingRef.current) return; // cancelled
      try {
        const res = await fetch('/api/ai/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId: taskDbId }),
        });
        const data = await res.json();
        if (data.code !== 0) continue;

        const task = data.data;
        const status = task?.status;

        if (status === 'completed' || status === 'success') {
          let images: string[] = [];
          try {
            // Primary: extract from taskInfo.images[].imageUrl (Kie.ai format)
            const info = typeof task.taskInfo === 'string' ? JSON.parse(task.taskInfo) : task.taskInfo;
            if (info?.images && Array.isArray(info.images)) {
              images = info.images.map((img: any) => img.imageUrl).filter(Boolean);
            }
            // Fallback: try taskResult
            if (images.length === 0) {
              const result = typeof task.taskResult === 'string' ? JSON.parse(task.taskResult) : task.taskResult;
              if (Array.isArray(result)) images = result;
              else if (result?.output) images = Array.isArray(result.output) ? result.output : [result.output];
              else if (result?.url) images = [result.url];
              else if (result?.urls) images = result.urls;
            }
          } catch { /* ignore */ }

          setGeneratedImages(prev => [{
            id: taskDbId,
            prompt: currentPrompt,
            ratio: currentRatio,
            model: currentModel,
            images,
            createdAt: new Date().toISOString(),
          }, ...prev]);
          setGenerateState('done');
          setTimeout(() => setGenerateState('idle'), 1500);
          pollingRef.current = false;
          return;
        }

        if (status === 'failed' || status === 'error') {
          setErrorMsg(isZh ? '生成失败，请重试' : 'Generation failed, please try again');
          setGenerateState('idle');
          pollingRef.current = false;
          return;
        }
        // still processing, continue polling
      } catch {
        // ignore and retry
      }
    }
    setErrorMsg(isZh ? '生成超时，请重试' : 'Generation timed out, please try again');
    setGenerateState('idle');
    pollingRef.current = false;
  }, [isZh]);

  const handleGenerate = async () => {
    if (generateState === 'loading' || !prompt.trim()) return;
    setErrorMsg(null);
    setGenerateState('loading');

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'kie',
          mediaType: 'image',
          model: selectedModel.apiModel,
          prompt: prompt.trim(),
          quantity,
          resolution,
          options: {
            aspect_ratio: selectedRatio,
            ...(negativePrompt ? { negative_prompt: negativePrompt } : {}),
            ...(selectedModel.hasGuidanceScale && guidanceScale !== 2.5 ? { guidance_scale: guidanceScale } : {}),
            ...(selectedModel.hasSteps && steps !== 30 ? { num_inference_steps: steps } : {}),
            ...(selectedModel.hasSafetyChecker ? { safety_checker: safetyChecker } : {}),
            ...(mode === 'image' && uploadedFile ? { image: uploadedFile } : {}),
          },
        }),
      });
      const data = await res.json();

      if (data.code !== 0) {
        setErrorMsg(data.message || (isZh ? '生成失败' : 'Generation failed'));
        setGenerateState('idle');
        return;
      }

      const task = data.data;
      if (task?.id) {
        // Task created, start polling
        pollTaskResult(task.id, prompt.trim(), selectedRatio, selectedModel.name);
      } else {
        setErrorMsg(isZh ? '未收到任务ID' : 'No task ID received');
        setGenerateState('idle');
      }
    } catch (err: any) {
      setErrorMsg(err.message || (isZh ? '生成失败' : 'Generation failed'));
      setGenerateState('idle');
    }
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setUploadedFile(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFileChange(file);
  }, []);

  const ex = EXAMPLES[exampleIdx];

  return (
    <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:h-[calc(100vh-120px)]">
      {/* ═══ Left: AI Image Generator Panel ═══ */}
      <div className="w-full lg:flex-shrink-0 lg:w-[380px] xl:w-[420px]">
        <div className="flex h-full flex-col rounded-xl border border-[#363b4e]/50 bg-[#13151f] shadow-lg">
          {/* Header + Model selector */}
          <div className="flex-shrink-0 p-4 pb-1.5">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-bold text-white sm:text-base">{t('title')}</span>
              <div className="relative sm:w-auto w-full" ref={modelDropdownRef}>
                <button
                  onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                  className="flex w-full items-center gap-1 rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm transition-colors hover:bg-[#252a3d] sm:w-auto"
                >
                  {selectedModel.icon === 'flux' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-white text-xs font-black text-black">F</span>
                  ) : selectedModel.icon === 'bytedance' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[#00D1FF]/20 text-xs font-black text-[#00D1FF]">S</span>
                  ) : selectedModel.icon === 'openai' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-white text-xs font-black text-black">O</span>
                  ) : selectedModel.icon === 'wan' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-purple-500/20 text-xs font-black text-purple-400">Q</span>
                  ) : selectedModel.icon === 'grok' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-blue-500/20 text-xs font-black text-blue-400">G</span>
                  ) : (
                    <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="Google" width={24} height={24} className="h-6 w-6 flex-shrink-0" unoptimized />
                  )}
                  <span className="truncate text-[#ffcc33]">{selectedModel.name}</span>
                  <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {modelDropdownOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-[340px] rounded-xl border border-[#363b4e] bg-[#13151f] shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Search */}
                    <div className="border-b border-[#363b4e]/50 p-3">
                      <div className="flex items-center gap-2 rounded-lg bg-[#0f1117] px-3 py-2">
                        <svg className="h-4 w-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                          type="text"
                          placeholder="Search models..."
                          value={modelSearch}
                          onChange={(e) => setModelSearch(e.target.value)}
                          className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
                        />
                      </div>
                    </div>

                    {/* Model list */}
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {filteredModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => { setSelectedModel(model); setModelDropdownOpen(false); setModelSearch(''); }}
                          className={`w-full text-left rounded-lg p-3 transition-colors ${
                            selectedModel.id === model.id
                              ? 'bg-[#1c2030] border border-[#ffcc33]/30'
                              : 'hover:bg-[#1c2030]/60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            {model.icon === 'flux' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-black text-black">F</span>
                            ) : model.icon === 'bytedance' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#00D1FF]/20 text-[10px] font-black text-[#00D1FF]">S</span>
                            ) : model.icon === 'openai' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-black text-black">O</span>
                            ) : model.icon === 'wan' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-500/20 text-[10px] font-black text-purple-400">Q</span>
                            ) : model.icon === 'grok' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-500/20 text-[10px] font-black text-blue-400">G</span>
                            ) : (
                              <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="" width={20} height={20} className="h-5 w-5" unoptimized />
                            )}
                            <span className="font-semibold text-white text-sm">{model.name}</span>
                            {model.badge && (
                              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${model.badgeColor}`}>
                                {model.badge}
                              </span>
                            )}
                            {selectedModel.id === model.id && (
                              <CheckCircle className="h-4 w-4 text-[#ffcc33] ml-auto" />
                            )}
                          </div>
                          <p className="text-xs text-white/50 mb-2 leading-relaxed">{isZh ? model.desc : model.descEn}</p>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                              <Coins className="h-3 w-3" /> {model.credits}
                            </span>
                            {model.hd && (
                              <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-bold text-white/60">HD</span>
                            )}
                            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{model.modes.map(m => m === 'text' ? 'Text' : 'Image').join(' & ')}</span>
                            {model.recommended && (
                              <span className="ml-auto flex items-center gap-1 text-[10px] text-[#ffcc33]">
                                <Sparkles className="h-3 w-3" /> Recommended
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-lg p-2">
              <p className="text-sm font-semibold text-white/90">{t('powered_by')}</p>
            </div>
          </div>

          {/* Scrollable controls */}
          <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-1.5">
            <div className="flex h-full flex-col">
              {/* Mode tabs */}
              <div className="mb-3 flex-shrink-0">
                {selectedModel.modes.length > 1 ? (
                  <div className={`grid grid-cols-${selectedModel.modes.length} gap-1 rounded-lg bg-[#0f1117] p-1`}>
                    {selectedModel.modes.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`relative rounded-md px-4 py-2 text-xs font-medium transition-all ${
                          mode === m ? 'text-white' : 'text-white/50 hover:text-white/80'
                        }`}
                        style={mode === m ? {
                          background: '#0f1117',
                          boxShadow: 'inset 0 0 0 2px transparent',
                          borderImage: 'linear-gradient(135deg, #ffcc33, #ff9900) 1',
                          border: '2px solid',
                          borderRadius: '6px',
                        } : undefined}
                      >
                        {m === 'text' ? t('mode_text') : t('mode_image')}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg bg-[#0f1117] p-1">
                    <div className="rounded-md px-4 py-2 text-center text-xs font-medium text-white" style={{ background: '#0f1117', border: '2px solid', borderImage: 'linear-gradient(135deg, #ffcc33, #ff9900) 1', borderRadius: '6px' }}>
                      {t('mode_text')}
                    </div>
                  </div>
                )}
              </div>

              {/* Scrollable body */}
              <div className="mb-3 min-h-0 flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                {/* Image upload (image mode) */}
                {mode === 'image' && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white">{t('upload_label')}</label>
                    {uploadedFile ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0f1117]">
                        <img src={uploadedFile} alt="uploaded" className="h-full w-full object-contain" />
                        <button
                          onClick={() => setUploadedFile(null)}
                          className="absolute right-2 top-2 rounded-full bg-black/60 p-1 transition-colors hover:bg-black/80"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all duration-200 ${
                          isDragging
                            ? 'border-[#ffcc33] bg-[#ffcc33]/5'
                            : 'border-[#363b4e] bg-[#0f1117] hover:border-[#ffcc33]/50'
                        }`}
                      >
                        <Upload className="h-8 w-8 text-white/30" />
                        <span className="text-sm text-white/50">{t('upload_hint')}</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileChange(f); }}
                    />
                  </div>
                )}

                {/* Prompt */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm font-medium text-white">{t('prompt_label')}</label>
                  </div>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder=" {t('prompt_placeholder')}, max 5000 chars..."
                    maxLength={5000}
                    className="min-h-[80px] w-full resize-y rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-1.5 pr-10 text-sm text-white placeholder-white/30 transition-colors focus:border-[#ffcc33] focus:outline-none md:min-h-[110px]"
                    style={{ resize: 'vertical' }}
                  />
                  <div className="flex justify-between text-xs">
                    <button className="flex items-center gap-1 text-sm font-medium text-[#ffcc33] transition-colors hover:scale-105">
                      <Sparkles className="h-4 w-4" /> {t('generate')}
                    </button>
                    <span className="text-white/40">{prompt.length}/5000</span>
                  </div>
                </div>

                {/* Aspect ratio with shape previews */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white">{t('aspect_ratio')}</label>
                  <div className="grid grid-cols-5 gap-2">
                    {ASPECT_RATIOS.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => setSelectedRatio(r.label)}
                        className={`group relative rounded-lg px-1.5 py-2 transition-all duration-200 ${
                          selectedRatio === r.label
                            ? 'border-2 bg-[#1c2030] shadow-md'
                            : 'border border-[#363b4e]/50 bg-[#1c2030] hover:border-[#363b4e] hover:bg-[#252a3d]'
                        }`}
                        style={selectedRatio === r.label ? {
                          borderImage: 'linear-gradient(135deg, #ffcc33, #ff9900) 1',
                        } : undefined}
                      >
                        <div
                          className={`mx-auto mb-1.5 rounded border-2 transition-colors ${r.w} ${r.h} ${
                            selectedRatio === r.label
                              ? 'border-[#ffcc33]'
                              : 'border-white/30 group-hover:border-white/60'
                          }`}
                        />
                        <span className={`block text-xs font-medium leading-tight ${
                          selectedRatio === r.label ? 'gradient-glow-text' : 'text-white/80'
                        }`}>
                          {r.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div>
                  <div className="mb-2 flex items-center gap-1">
                    <label className="text-sm font-medium text-white">{isZh ? '分辨率' : 'Resolution'}</label>
                  </div>
                  <div className="grid grid-cols-3 gap-2 px-1">
                    {RESOLUTIONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setResolution(r)}
                        className={`relative overflow-hidden rounded-md px-4 py-2 font-medium transition-all ${
                          resolution === r
                            ? 'border-2 bg-[#1c2030]'
                            : 'border border-white/20 text-white/50 hover:border-[#ffcc33]/50 hover:text-white'
                        }`}
                        style={resolution === r ? {
                          borderImage: 'linear-gradient(90deg, #ffcc33, #ff9900) 1',
                        } : undefined}
                      >
                        <span className={`relative z-10 ${resolution === r ? 'gradient-glow-text' : ''}`}>
                          {r}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                {(selectedModel.maxQuantity ?? 1) > 1 && (
                <div>
                  <div className="mb-2 flex items-center gap-1">
                    <label className="text-sm font-medium text-white">{isZh ? '数量' : 'Quantity'}</label>
                    <Info className="h-4 w-4 cursor-help text-white/40" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 px-1">
                    {QUANTITIES.filter(q => q <= (selectedModel.maxQuantity ?? 1)).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuantity(q)}
                        className={`relative overflow-hidden rounded-md px-4 py-2 font-medium transition-all ${
                          quantity === q
                            ? 'border-2 bg-[#1c2030]'
                            : 'border border-white/20 text-white/50 hover:border-[#ffcc33]/50 hover:text-white'
                        }`}
                        style={quantity === q ? {
                          borderImage: 'linear-gradient(90deg, #ffcc33, #ff9900) 1',
                        } : undefined}
                      >
                        <span className={`relative z-10 ${quantity === q ? 'gradient-glow-text' : ''}`}>
                          {q}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* ── Model-specific advanced settings ── */}
                {(selectedModel.hasNegativePrompt || selectedModel.hasGuidanceScale || selectedModel.hasSteps || selectedModel.hasSafetyChecker) && (
                  <div className="space-y-3 rounded-lg border border-[#363b4e]/30 bg-[#0f1117]/50 p-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ffcc33]/80 uppercase tracking-wider">
                      <Sparkles className="h-3 w-3" />
                      {isZh ? '高级设置' : 'Advanced Settings'}
                    </div>

                    {/* Negative prompt */}
                    {selectedModel.hasNegativePrompt && (
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-white/60">{isZh ? '负面提示词' : 'Negative Prompt'}</label>
                        <input
                          type="text"
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder={isZh ? '描述不想出现的内容...' : 'Describe what to avoid...'}
                          className="w-full rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm text-white placeholder-white/30 focus:border-[#ffcc33] focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Guidance scale */}
                    {selectedModel.hasGuidanceScale && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-white/60">{isZh ? '引导强度' : 'Guidance Scale'}</label>
                          <span className="text-xs font-mono text-[#ffcc33]">{guidanceScale.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(Number(e.target.value))}
                          className="w-full accent-[#ffcc33]"
                        />
                      </div>
                    )}

                    {/* Steps */}
                    {selectedModel.hasSteps && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-white/60">{isZh ? '推理步数' : 'Inference Steps'}</label>
                          <span className="text-xs font-mono text-[#ffcc33]">{steps}</span>
                        </div>
                        <input
                          type="range"
                          min="4"
                          max="50"
                          step="1"
                          value={steps}
                          onChange={(e) => setSteps(Number(e.target.value))}
                          className="w-full accent-[#ffcc33]"
                        />
                      </div>
                    )}

                    {/* Safety checker */}
                    {selectedModel.hasSafetyChecker && (
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-white/60">{isZh ? '安全检查' : 'Safety Checker'}</label>
                        <button
                          onClick={() => setSafetyChecker(!safetyChecker)}
                          className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                          style={{ background: safetyChecker ? 'linear-gradient(to right, #ffcc33, #ff9900)' : '#363b4e' }}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${safetyChecker ? 'translate-x-4' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Public visibility toggle */}
                <div className="mt-4 pt-2">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      Public
                      <Info className="h-4 w-4 cursor-help text-white/40" />
                    </span>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 cursor-help text-[#ffcc33]" />
                      <button
                        onClick={() => setIsPublic(!isPublic)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isPublic ? 'bg-gradient-to-r from-[#ffcc33] to-[#ff9900]' : 'bg-white/20'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
                            isPublic ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: credits + generate button */}
              <div className="flex-shrink-0 border-t border-[#363b4e] pt-4">
                <div className="space-y-4">
                  {/* Credits display — dynamic */}
                  {(() => {
                    const credits = calculateImageCredits(selectedModel.id, quantity, resolution);
                    return (
                      <div className="rounded-lg border border-[#ffcc33]/30 bg-gradient-to-r from-[#ffcc33]/10 to-[#ffcc33]/5">
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-2">
                            <Coins className="h-4 w-4 text-[#ffcc33]" />
                            <span className="text-sm font-medium text-white">{isZh ? '所需点数' : 'Credits needed'}</span>
                          </div>
                          <span className="text-base font-bold text-[#ffcc33]">{credits}</span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Generate button */}
                  <button
                    onClick={handleGenerate}
                    disabled={generateState === 'loading'}
                    className="w-full rounded-md px-3 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
                    style={{
                      background: generateState === 'done'
                        ? 'rgba(74,222,128,0.2)'
                        : 'linear-gradient(135deg, #ffcc33, #ff9900)',
                      color: generateState === 'done' ? '#4ade80' : '#000',
                    }}
                  >
                    {generateState === 'loading' ? (
                      <span className="flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{isZh ? '生成中...' : 'Generating...'}</span>
                    ) : generateState === 'done' ? (
                      <span className="flex items-center justify-center gap-2"><CheckCircle className="h-4 w-4" />Done!</span>
                    ) : (
                      t('generate')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Right: Gallery / Examples Panel ═══ */}
      <div className="w-full min-w-0">
        {/* Error toast */}
        {errorMsg && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <X className="h-4 w-4 flex-shrink-0 cursor-pointer" onClick={() => setErrorMsg(null)} />
            {errorMsg}
          </div>
        )}

        {(generatedImages.length > 0 || generateState === 'loading') ? (
          /* ── My Images Gallery + Thumbnail Sidebar ── */
          <div className="flex h-full gap-2 md:gap-4">
          {/* Main card area */}
          <div className="flex h-full min-w-0 flex-1 flex-col rounded-xl border border-[#363b4e]/30 bg-[#252831] shadow backdrop-blur-md">
            <div className="flex-shrink-0 p-6 pb-0">
              <div className="font-semibold leading-none tracking-tight flex items-center gap-2">
                  <Images className="h-5 w-5 text-[#ffcc33]" />
                  <span className="gradient-text">{isZh ? '我的图片' : 'My Images'}</span>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6 pt-4 space-y-4">
              {/* Generating placeholder card */}
              {generateState === 'loading' && (
                <div className="rounded-xl border border-[#ffcc33]/20 bg-[#0f1117] shadow-lg">
                  <div className="space-y-2 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md border border-[#ffcc33]/30 bg-[#ffcc33] px-2.5 py-0.5 text-xs font-medium text-[#0f1117] shadow">
                        {mode === 'image' ? (isZh ? '图生图' : 'Img2Img') : (isZh ? '文生图' : 'Txt2Img')}
                      </span>
                      <span className="text-sm text-white/40">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-white/80">{prompt}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center px-4 pb-4 py-12">
                    <div className="relative mb-4 h-16 w-16">
                      <svg className="h-16 w-16 animate-spin" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#363b4e" strokeWidth="4" />
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#ffcc33" strokeWidth="4"
                          strokeDasharray="120 60" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-[#ffcc33]">{isZh ? '分析中...' : 'Analyzing...'}</span>
                    <span className="mt-1 text-xs text-white/40">{isZh ? '图片生成中...' : 'Generating image...'}</span>
                  </div>
                </div>
              )}
              {generatedImages.map((item, itemIdx) => (
                <div key={item.id} id={`gallery-card-${itemIdx}`} className={`rounded-xl border bg-[#0f1117] shadow-lg cursor-pointer transition-all duration-300 hover:shadow-md ${selectedGalleryIdx === itemIdx ? 'border-[#ffcc33]/50' : 'border-[#363b4e]/30'}`} onClick={() => setSelectedGalleryIdx(itemIdx)}>
                  <div className="flex flex-col">
                  <div className="space-y-2 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md border border-[#ffcc33]/30 bg-[#ffcc33] px-2.5 py-0.5 text-xs font-medium text-[#0f1117] shadow">
                        {item.mode === 'image' ? (isZh ? '图生图' : 'Img2Img') : (isZh ? '文生图' : 'Txt2Img')}
                      </span>
                      <span className="text-sm text-white/40">
                        {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center rounded-md border border-[#363b4e]/50 px-2.5 py-0.5 text-xs font-medium text-white/70 ml-auto">{item.ratio}</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-white/80" title={item.prompt}>{item.prompt}</p>
                  </div>
                  <div className="px-4 pb-4">
                    <div className={`grid gap-3 ${item.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {item.images.map((url, idx) => (
                      <div key={idx} className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-black/20" style={{ maxHeight: '320px' }}>
                        <a href={url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <img
                            src={url}
                            alt={`Generated ${idx + 1}`}
                            className="max-h-[320px] w-auto max-w-full rounded-lg object-contain"
                            loading="lazy"
                          />
                        </a>
                        <a
                          href={url}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/80"
                        >
                          <Download className="h-4 w-4 text-white" />
                        </a>
                      </div>
                    ))}
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Thumbnail sidebar */}
          {generatedImages.length > 0 && (
            <div className="hidden w-20 flex-shrink-0 lg:block xl:w-24">
              <div className="flex h-full flex-col gap-2 overflow-y-auto custom-scrollbar py-1">
                {generatedImages.map((item, itemIdx) => {
                  const thumbUrl = item.images[0];
                  if (!thumbUrl) return null;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedGalleryIdx(itemIdx);
                        document.getElementById(`gallery-card-${itemIdx}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }}
                      className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                        selectedGalleryIdx === itemIdx
                          ? 'ring-2 ring-[#ffcc33] ring-offset-1 ring-offset-[#0f1117]'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={thumbUrl}
                        alt=""
                        className="h-20 w-full object-cover xl:h-24"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          </div>
        ) : (
          /* ── Example Images Panel (shown when no generated images) ── */
          <div className="relative overflow-hidden rounded-xl border border-[#363b4e]/50 bg-[#1c2030] shadow">
            {/* Header */}
            <div className="p-5 pb-3">
              <div className="flex items-center gap-2 font-semibold">
                <Images className="h-5 w-5 text-[#ffcc33]" />
                <span className="gradient-glow-text">{t('example_title')}</span>
              </div>
            </div>

            {/* Before/After showcase */}
            <div className="relative mx-5 rounded-xl bg-[#0f1117]/30">
                {/* Images */}
                <div className="grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6">
                  {/* Before */}
                  <div className="relative overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      src={ex.before}
                      alt="Before"
                      width={400}
                      height={533}
                      className="h-auto w-full rounded-2xl object-cover"
                    />
                    <div className="absolute left-2 top-2 z-10 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                      {isZh ? '之前' : 'Before'}
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative overflow-hidden rounded-2xl bg-white/5">
                    <Image
                      src={ex.after}
                      alt="After"
                      width={400}
                      height={533}
                      className="h-auto w-full rounded-2xl object-cover"
                    />
                    <div className="absolute right-2 top-2 z-10 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-bold text-white/90 backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                      {isZh ? '之后' : 'After'}
                    </div>
                  </div>
                </div>

                {/* Dots + prompt + button */}
                <div className="flex flex-col gap-3 px-4 pb-4 sm:px-8 sm:pb-8">
                  {/* Pagination dots */}
                  <div className="flex items-center justify-center gap-2">
                    {EXAMPLES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setExampleIdx(i)}
                        aria-label={`Go to sample ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === exampleIdx
                            ? 'h-3 w-10 shadow-lg'
                            : 'h-2.5 w-2.5 bg-white/30 hover:scale-125 hover:bg-white/50'
                        }`}
                        style={i === exampleIdx ? {
                          background: 'linear-gradient(to right, #ffcc33, #ff9900)',
                        } : undefined}
                      />
                    ))}
                  </div>

                  {/* Prompt + try button */}
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-white/70">
                      {ex.prompt}
                    </p>
                    <button
                      onClick={() => setPrompt(ex.prompt)}
                      className="highlight-button flex-shrink-0 whitespace-nowrap px-6 py-2.5 text-sm font-medium"
                    >
                      {t('example_title')}
                    </button>
                  </div>
                </div>

              </div>

            {/* Nav arrows */}
            <button
              onClick={() => setExampleIdx((exampleIdx - 1 + EXAMPLES.length) % EXAMPLES.length)}
              className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e]/40 bg-[#1c2030]/90 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-[#ffcc33]/50"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => setExampleIdx((exampleIdx + 1) % EXAMPLES.length)}
              className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#363b4e]/40 bg-[#1c2030]/90 shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-[#ffcc33]/50"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
