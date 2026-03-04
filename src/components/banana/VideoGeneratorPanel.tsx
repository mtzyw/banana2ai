'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronDown, Sparkles, Lock, Unlock, RefreshCw, Coins, Info, Gem, Film, Upload, X, CheckCircle,
} from 'lucide-react';

/* ── Video Models ── */
type VideoModel = {
  id: string;
  apiModel: string;          // Kie.ai model or veo endpoint param
  apiEndpoint?: 'veo' | 'market'; // which Kie.ai API to use
  name: string;
  badge?: string;
  badgeColor?: string;
  icon?: string;
  desc: string;
  descEn: string;
  credits: string;
  recommended?: boolean;
  // Model capabilities
  modes: ('text' | 'image' | 'frames' | 'reference')[];
  ratios?: string[];
  durations?: number[];      // seconds
  hasNegativePrompt?: boolean;
  hasCameraFixed?: boolean;
  hasAudio?: boolean;
  hasTranslation?: boolean;
  hasResolution?: boolean;
  resolutions?: string[];
};

const VIDEO_MODELS: VideoModel[] = [
  {
    id: 'veo3-basic',
    apiModel: 'veo3_fast',
    apiEndpoint: 'veo',
    name: 'Veo 3 Basic',
    badge: 'HOT',
    badgeColor: 'bg-orange-500/20 text-orange-400',
    desc: '专业视频创作，自然音频与高质量视觉效果',
    descEn: 'Professional video creation with natural audio and high-quality visuals',
    credits: '10+',
    recommended: true,
    modes: ['text', 'frames', 'reference'],
    ratios: ['16:9', '9:16', 'auto'],
    hasAudio: true,
    hasTranslation: true,
  },
  {
    id: 'veo3-premium',
    apiModel: 'veo3',
    apiEndpoint: 'veo',
    name: 'Veo 3 Premium',
    badge: 'PRO',
    badgeColor: 'bg-[#ffcc33]/20 text-[#ffcc33]',
    desc: '沉浸式音效与超逼真视觉效果',
    descEn: 'Immersive audio and ultra-realistic visual effects',
    credits: '50+',
    modes: ['text', 'frames'],
    ratios: ['16:9', '9:16', 'auto'],
    hasAudio: true,
    hasTranslation: true,
  },
  {
    id: 'veo3-1-basic',
    apiModel: 'veo3.1_fast',
    apiEndpoint: 'veo',
    name: 'Veo 3.1 Basic',
    badge: 'NEW',
    badgeColor: 'bg-white/10 text-white/70',
    desc: '高质量视频配原生音频——速度优化',
    descEn: 'High-quality video with native audio - speed optimized',
    credits: '20+',
    recommended: true,
    modes: ['text', 'frames', 'reference'],
    ratios: ['16:9', '9:16', 'auto'],
    hasAudio: true,
    hasTranslation: true,
  },
  {
    id: 'veo3-1-premium',
    apiModel: 'veo3.1',
    apiEndpoint: 'veo',
    name: 'Veo 3.1 Premium',
    badge: 'ULTRA',
    badgeColor: 'bg-purple-500/20 text-purple-400',
    desc: '终极视频质量与原生音频——Google 最先进的模型',
    descEn: 'Ultimate video quality with native audio - Google most advanced model',
    credits: '44+',
    modes: ['text', 'frames'],
    ratios: ['16:9', '9:16', 'auto'],
    hasAudio: true,
    hasTranslation: true,
  },
  {
    id: 'seedance-1-5-pro',
    apiModel: 'bytedance/v1-pro-text-to-video',
    apiEndpoint: 'market',
    name: 'Seedance 1.5 Pro',
    badge: 'AUDIO',
    badgeColor: 'bg-cyan-500/20 text-cyan-400',
    icon: 'bytedance',
    desc: '新一代多场景叙事，支持音频生成与增强转场',
    descEn: 'Next-gen multi-scene narrative with audio generation and enhanced transitions',
    credits: '32+',
    modes: ['text', 'image'],
    ratios: ['16:9', '9:16', '4:3', '3:4', '1:1', '21:9', '9:21'],
    durations: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    hasCameraFixed: true,
    hasAudio: true,
    hasResolution: true,
    resolutions: ['480p', '720p', '1080p'],
  },
  {
    id: 'sora-2',
    apiModel: 'sora-2-text-to-video',
    apiEndpoint: 'market',
    name: 'Sora 2',
    badge: 'SMART',
    badgeColor: 'bg-white/10 text-white/70',
    icon: 'openai',
    desc: '原生音频，精准创作',
    descEn: 'Native audio, precise creation',
    credits: '10+',
    modes: ['text'],
    ratios: ['landscape', 'portrait', 'square'],
  },
  {
    id: 'sora-2-pro',
    apiModel: 'sora-2-pro-text-to-video',
    apiEndpoint: 'market',
    name: 'Sora 2 Pro',
    badge: 'PRO',
    badgeColor: 'bg-[#ffcc33]/20 text-[#ffcc33]',
    icon: 'openai',
    desc: '延长时长和高级品质，配备高级控制功能',
    descEn: 'Extended duration and premium quality with advanced controls',
    credits: '150+',
    modes: ['text'],
    ratios: ['landscape', 'portrait', 'square'],
    hasResolution: true,
    resolutions: ['standard', 'high'],
  },
  {
    id: 'sora-2-pro-storyboard',
    apiModel: 'sora-2-pro-storyboard',
    apiEndpoint: 'market',
    name: 'Sora 2 Pro Storyboard',
    badge: 'AUDIO',
    badgeColor: 'bg-cyan-500/20 text-cyan-400',
    icon: 'openai',
    desc: '将自然语言请求转换为结构化分镜脚本',
    descEn: 'Transform natural language into structured storyboards with shot breakdowns',
    credits: '150+',
    modes: ['text'],
    ratios: ['landscape', 'portrait', 'square'],
  },
];

/* ── Credit calculation (matches source site logic) ── */
function calculateVideoCredits(modelId: string, duration: number, resolution: string, quality: string = 'standard', nFrames: string = '10'): number {
  // Veo models — fixed cost
  if (modelId === 'veo3-basic') return 10;
  if (modelId === 'veo3-premium') return 50;
  if (modelId === 'veo3-1-basic') return 20;
  if (modelId === 'veo3-1-premium') return 44;

  // Seedance 1.5 Pro — duration × 8 × resolution multiplier
  if (modelId === 'seedance-1-5-pro') {
    const resMult = resolution === '1080p' ? 4 : resolution === '720p' ? 2 : 1;
    return duration * 8 * resMult;
  }

  // Sora 2 — varies by duration (10/15s) × quality (std/hd)
  if (modelId === 'sora-2') {
    const dur = parseInt(nFrames || '10');
    if (quality === 'hd') return dur >= 15 ? 30 : 20;
    return dur >= 15 ? 15 : 10;
  }

  // Sora 2 Pro — varies by duration × quality (standard/high)
  if (modelId === 'sora-2-pro') {
    const dur = parseInt(nFrames || '10');
    if (quality === 'high') return dur >= 15 ? 300 : 200;
    return dur >= 15 ? 200 : 150;
  }

  // Sora 2 Pro Storyboard — by duration
  if (modelId === 'sora-2-pro-storyboard') {
    const dur = parseInt(nFrames || '10');
    if (dur >= 25) return 300;
    if (dur >= 15) return 200;
    return 150;
  }

  return 10; // fallback
}

interface VideoGeneratorPanelProps {
  sampleVideoSrc?: string;
  sampleVideoPoster?: string;
}

export default function VideoGeneratorPanel({
  sampleVideoSrc = 'https://static.banana2ai.net/videos/sample-generator.mp4',
  sampleVideoPoster = 'https://static.banana2ai.net/images/video/default-poster.webp',
}: VideoGeneratorPanelProps) {
  const t = useTranslations('banana.videoGenerator');
  const isZh = useLocale() === 'zh';

  const [selectedModel, setSelectedModel] = useState(VIDEO_MODELS[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState('');
  const modelRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'text' | 'image' | 'frames' | 'reference'>('text');
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState('16:9');
  const [seed, setSeed] = useState('42471');
  const [seedLocked, setSeedLocked] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  // Keyframes mode (Veo)
  const [firstFrame, setFirstFrame] = useState<string | null>(null);
  const [lastFrame, setLastFrame] = useState<string | null>(null);
  // Reference mode (Veo Basic only)
  const [refImages, setRefImages] = useState<(string | null)[]>([null, null, null]);
  // Model-specific toggles
  const [enableTranslation, setEnableTranslation] = useState(true);
  const [enableAudio, setEnableAudio] = useState(true);
  const [cameraFixed, setCameraFixed] = useState(false);
  const [duration, setDuration] = useState(5);
  const [videoResolution, setVideoResolution] = useState('720p');

  const hasReference = selectedModel.modes.includes('reference');
  const hasFrames = selectedModel.modes.includes('frames');

  // Reset mode when switching models if current mode unsupported
  useEffect(() => {
    if (!selectedModel.modes.includes(mode as typeof selectedModel.modes[number])) {
      setMode('text');
    }
    // Reset ratio to first available
    if (selectedModel.ratios && !selectedModel.ratios.includes(ratio)) {
      setRatio(selectedModel.ratios[0]);
    }
  }, [selectedModel, mode, ratio]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstFrameRef = useRef<HTMLInputElement>(null);
  const lastFrameRef = useRef<HTMLInputElement>(null);
  const refInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const readFileAsDataURL = (file: File, cb: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const setRefImage = (index: number, url: string | null) => {
    setRefImages(prev => { const next = [...prev]; next[index] = url; return next; });
  };

  // Close model dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false);
    };
    if (modelOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [modelOpen]);

  const filteredModels = VIDEO_MODELS.filter(m =>
    m.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const randomizeSeed = () => setSeed(String(Math.floor(Math.random() * 99999)));

  const handleGenerate = () => {
    if (generating || !prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setUploadedFile(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const modelIcon = (model: VideoModel, size: number) => {
    if (model.icon === 'openai') return <span className={`flex h-${size} w-${size} items-center justify-center rounded bg-white text-[${size * 2}px] font-black text-black`}>O</span>;
    if (model.icon === 'bytedance') return <span className={`flex h-${size} w-${size} items-center justify-center rounded bg-[#00D1FF]/20 text-[${size * 2}px] font-black text-[#00D1FF]`}>S</span>;
    return <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="" width={size * 4} height={size * 4} className={`h-${size} w-${size}`} unoptimized />;
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6 md:gap-6 md:px-6 lg:flex-row lg:h-[calc(100vh-120px)] lg:max-h-[800px]">
      {/* Left: Generator Form */}
      <div className="w-full lg:flex-shrink-0 lg:w-[380px] xl:w-[420px]">
        <div className="flex h-full flex-col rounded-xl border border-[#363b4e]/50 bg-[#1c2030] shadow-lg overflow-hidden">
          <div className="flex-shrink-0 border-b border-[#363b4e]/30 p-5 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-base font-bold sm:text-lg">{t('title')}</div>
              {/* Model selector */}
              <div className="relative sm:w-auto w-full" ref={modelRef}>
                <button
                  onClick={() => setModelOpen(!modelOpen)}
                  className="flex w-full items-center gap-1 rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm hover:bg-[#2b3046] sm:w-auto"
                >
                  {selectedModel.icon === 'openai' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-white text-xs font-black text-black">O</span>
                  ) : selectedModel.icon === 'bytedance' ? (
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-[#00D1FF]/20 text-xs font-black text-[#00D1FF]">S</span>
                  ) : (
                    <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="" width={24} height={24} className="h-6 w-6 flex-shrink-0" unoptimized />
                  )}
                  <span className="truncate text-[#ffcc33]">{selectedModel.name}</span>
                  <ChevronDown className={`h-4 w-4 text-white/50 transition-transform ${modelOpen ? 'rotate-180' : ''}`} />
                </button>

                {modelOpen && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-[320px] rounded-xl border border-[#363b4e] bg-[#13151f] shadow-2xl shadow-black/50 overflow-hidden">
                    <div className="border-b border-[#363b4e]/50 p-3">
                      <div className="flex items-center gap-2 rounded-lg bg-[#0f1117] px-3 py-2">
                        <svg className="h-4 w-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="text" placeholder="Search models..." value={modelSearch} onChange={(e) => setModelSearch(e.target.value)} className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none" />
                      </div>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {filteredModels.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => { setSelectedModel(model); setModelOpen(false); setModelSearch(''); }}
                          className={`w-full text-left rounded-lg p-3 transition-colors ${selectedModel.id === model.id ? 'bg-[#1c2030] border border-[#ffcc33]/30' : 'hover:bg-[#1c2030]/60 border border-transparent'}`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            {model.icon === 'openai' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[10px] font-black text-black">O</span>
                            ) : model.icon === 'bytedance' ? (
                              <span className="flex h-5 w-5 items-center justify-center rounded bg-[#00D1FF]/20 text-[10px] font-black text-[#00D1FF]">S</span>
                            ) : (
                              <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="" width={20} height={20} className="h-5 w-5" unoptimized />
                            )}
                            <span className="font-semibold text-white text-sm">{model.name}</span>
                            {model.badge && <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${model.badgeColor}`}>{model.badge}</span>}
                            {selectedModel.id === model.id && <CheckCircle className="h-4 w-4 text-[#ffcc33] ml-auto" />}
                          </div>
                          <p className="text-xs text-white/50 mb-2 leading-relaxed">{isZh ? model.desc : model.descEn}</p>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                              <Coins className="h-3 w-3" /> {model.credits}
                            </span>
                            {model.recommended && <span className="ml-auto flex items-center gap-1 text-[10px] text-[#ffcc33]"><Sparkles className="h-3 w-3" /> Recommended</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-5 pt-3">
            {/* Mode tabs */}
            <div className="mb-4 flex-shrink-0">
              {(() => {
                const modeLabels: Record<string, string> = {
                  text: t('mode_text'),
                  image: t('mode_image'),
                  frames: isZh ? '首末帧' : 'Keyframes',
                  reference: isZh ? '参考图' : 'Reference',
                };
                const modes = selectedModel.modes;
                return (
                  <div className={`grid gap-1 rounded-lg bg-[#0f1117] p-1`} style={{ gridTemplateColumns: `repeat(${modes.length}, 1fr)` }}>
                    {modes.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className="relative rounded-md px-2 py-2.5 text-sm font-medium transition-all"
                        style={mode === m ? {
                          border: '2px solid transparent',
                          backgroundImage: 'linear-gradient(#0f1117, #0f1117), linear-gradient(to right, #ffcc33, #ff9900)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                        } : undefined}
                      >
                        <span className={mode === m ? 'gradient-text' : 'text-white/50 hover:text-white'}>
                          {modeLabels[m] || m}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Scrollable body */}
            <div className="mb-4 min-h-0 flex-1 space-y-4 overflow-y-auto custom-scrollbar">
              {/* Image upload (generic image mode for non-Veo models) */}
              {mode === 'image' && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">{isZh ? '上传图片' : 'Upload Image'}</label>
                  {uploadedFile ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0f1117]">
                      <img src={uploadedFile} alt="uploaded" className="h-full w-full object-contain" />
                      <button onClick={() => setUploadedFile(null)} className="absolute right-2 top-2 rounded-full bg-black/60 p-1 hover:bg-black/80">
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#363b4e] bg-[#0f1117] p-6 hover:border-[#ffcc33]/50 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-white/30" />
                      <span className="text-sm text-white/50">{isZh ? '点击上传图片' : 'Click to upload image'}</span>
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFileChange(e.target.files[0]); }} />
                </div>
              )}

              {/* Veo 3.1 Keyframes mode — first frame (required) + last frame (optional) */}
              {mode === 'frames' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">{isZh ? '关键帧图片' : 'Keyframe Images'}</label>
                  <p className="text-xs text-white/40 -mt-2">{isZh ? 'AI 会生成两帧之间的过渡视频' : 'AI generates a transition video between the two frames'}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* First frame */}
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-white/60">{isZh ? '起始帧' : 'First Frame'} <span className="text-[#ffcc33]">*</span></span>
                      {firstFrame ? (
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#0f1117]">
                          <img src={firstFrame} alt="first frame" className="h-full w-full object-cover" />
                          <button onClick={() => setFirstFrame(null)} className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5 hover:bg-black/90">
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => firstFrameRef.current?.click()}
                          className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-[#363b4e] bg-[#0f1117] hover:border-[#ffcc33]/50 transition-colors"
                        >
                          <Upload className="h-5 w-5 text-white/30" />
                          <span className="text-[10px] text-white/40">{isZh ? '必填' : 'Required'}</span>
                        </button>
                      )}
                      <input ref={firstFrameRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) readFileAsDataURL(e.target.files[0], setFirstFrame); }} />
                    </div>
                    {/* Last frame */}
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-white/60">{isZh ? '结束帧' : 'Last Frame'} <span className="text-white/30">({isZh ? '可选' : 'Optional'})</span></span>
                      {lastFrame ? (
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#0f1117]">
                          <img src={lastFrame} alt="last frame" className="h-full w-full object-cover" />
                          <button onClick={() => setLastFrame(null)} className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5 hover:bg-black/90">
                            <X className="h-3 w-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => lastFrameRef.current?.click()}
                          className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-[#363b4e]/50 bg-[#0f1117]/50 hover:border-[#363b4e] transition-colors"
                        >
                          <Upload className="h-5 w-5 text-white/20" />
                          <span className="text-[10px] text-white/30">{isZh ? '可选' : 'Optional'}</span>
                        </button>
                      )}
                      <input ref={lastFrameRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) readFileAsDataURL(e.target.files[0], setLastFrame); }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Veo 3.1 Reference mode — up to 3 reference images (Basic only) */}
              {mode === 'reference' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">{isZh ? '参考图片' : 'Reference Images'}</label>
                  <p className="text-xs text-white/40 -mt-2">{isZh ? '上传图片引导视频的风格和内容（不作为帧）' : 'Upload images to guide style and content (not used as frames)'}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {refImages.map((img, i) => (
                      <div key={i} className="space-y-1">
                        {img ? (
                          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#0f1117]">
                            <img src={img} alt={`ref ${i + 1}`} className="h-full w-full object-cover" />
                            <button onClick={() => setRefImage(i, null)} className="absolute right-1 top-1 rounded-full bg-black/70 p-0.5 hover:bg-black/90">
                              <X className="h-3 w-3 text-white" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => refInputRefs[i].current?.click()}
                            className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#363b4e]/50 bg-[#0f1117]/50 hover:border-[#ffcc33]/30 transition-colors"
                          >
                            <Upload className="h-4 w-4 text-white/20" />
                            <span className="text-[10px] text-white/30">{i + 1}</span>
                          </button>
                        )}
                        <input ref={refInputRefs[i]} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) readFileAsDataURL(e.target.files[0], (url) => setRefImage(i, url)); }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-[#ffcc33]/5 px-2.5 py-1.5 text-[10px] text-[#ffcc33]/70">
                    <Info className="h-3 w-3 flex-shrink-0" />
                    {isZh ? '参考图模式仅支持 16:9 和 9:16 比例' : 'Reference mode only supports 16:9 and 9:16 ratios'}
                  </div>
                </div>
              )}

              {/* Prompt */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">{t('prompt_label')}</label>
                  <Info className="h-4 w-4 text-white/30" />
                </div>
                <textarea
                  className="w-full resize-y rounded-md border border-[#363b4e]/50 bg-[#0f1117] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#ffcc33] focus:outline-none"
                  style={{ minHeight: 120 }}
                  placeholder={isZh ? '描述您想要创建的视频内容...' : 'Describe the video you want to create...'}
                  maxLength={10000}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <div className="flex justify-between text-xs">
                  <button className="flex items-center gap-1 text-sm font-medium text-[#ffcc33] hover:text-[#ff9900]">
                    <Sparkles className="h-4 w-4" /> {t('generate')}
                  </button>
                  <span className="text-white/30">{prompt.length}/10000</span>
                </div>
              </div>

              {/* Aspect ratio */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('aspect_ratio')}</label>
                {(() => {
                  const ratios = selectedModel.ratios || ['16:9', '9:16'];
                  const shapeMap: Record<string, string> = {
                    '16:9': 'h-6 w-11', '9:16': 'h-9 w-5', '4:3': 'h-7 w-9', '3:4': 'h-9 w-7',
                    '1:1': 'h-7 w-7', '21:9': 'h-5 w-12', '9:21': 'h-12 w-5', 'auto': 'h-7 w-7',
                    'landscape': 'h-6 w-11', 'portrait': 'h-9 w-5', 'square': 'h-7 w-7',
                    'standard': 'h-6 w-10', 'high': 'h-7 w-10',
                  };
                  const cols = Math.min(ratios.length, 4);
                  return (
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                      {ratios.map((r) => (
                        <button
                          key={r}
                          onClick={() => setRatio(r)}
                          className={`group rounded-lg border px-1.5 py-2 transition-colors ${ratio === r ? 'border-[#ffcc33]/50 bg-[#ffcc33]/5' : 'border-[#363b4e]/50 bg-[#1c2030] hover:border-[#363b4e]'}`}
                        >
                          <div className={`mx-auto mb-1.5 rounded border-2 transition-colors ${ratio === r ? 'border-[#ffcc33]' : 'border-white/40 group-hover:border-white/70'} ${shapeMap[r] || 'h-7 w-7'}`} />
                          <span className={`block text-xs font-medium capitalize ${ratio === r ? 'text-[#ffcc33]' : ''}`}>{r === 'auto' ? 'Auto' : r}</span>
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Duration selector (Seedance etc.) */}
              {selectedModel.durations && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{isZh ? '时长' : 'Duration'}</label>
                    <span className="text-xs font-mono text-[#ffcc33]">{duration}s</span>
                  </div>
                  <input
                    type="range"
                    min={selectedModel.durations[0]}
                    max={selectedModel.durations[selectedModel.durations.length - 1]}
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-[#ffcc33]"
                  />
                  <div className="flex justify-between text-[10px] text-white/30">
                    <span>{selectedModel.durations[0]}s</span>
                    <span>{selectedModel.durations[selectedModel.durations.length - 1]}s</span>
                  </div>
                </div>
              )}

              {/* Resolution selector */}
              {selectedModel.hasResolution && selectedModel.resolutions && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">{isZh ? '分辨率' : 'Resolution'}</label>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${selectedModel.resolutions.length}, 1fr)` }}>
                    {selectedModel.resolutions.map((r) => (
                      <button
                        key={r}
                        onClick={() => setVideoResolution(r)}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-colors ${videoResolution === r ? 'border-[#ffcc33]/50 bg-[#ffcc33]/5 text-[#ffcc33]' : 'border-[#363b4e]/50 bg-[#1c2030] hover:border-[#363b4e]'}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Model-specific advanced settings */}
              {(selectedModel.hasAudio || selectedModel.hasTranslation || selectedModel.hasCameraFixed) && (
                <div className="space-y-3 rounded-lg border border-[#363b4e]/30 bg-[#0f1117]/50 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ffcc33]/80 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" />
                    {isZh ? '高级设置' : 'Advanced Settings'}
                  </div>
                  {/* Enable Audio */}
                  {selectedModel.hasAudio && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm">
                        🔊 {isZh ? '生成音频' : 'Generate Audio'}
                      </span>
                      <button
                        onClick={() => setEnableAudio(!enableAudio)}
                        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                        style={{ background: enableAudio ? 'linear-gradient(to right, #ffcc33, #ff9900)' : '#363b4e' }}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enableAudio ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  )}
                  {/* Enable Translation */}
                  {selectedModel.hasTranslation && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm">
                        🌐 {isZh ? '自动翻译提示词' : 'Auto-translate Prompt'}
                      </span>
                      <button
                        onClick={() => setEnableTranslation(!enableTranslation)}
                        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                        style={{ background: enableTranslation ? 'linear-gradient(to right, #ffcc33, #ff9900)' : '#363b4e' }}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enableTranslation ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  )}
                  {/* Camera fixed */}
                  {selectedModel.hasCameraFixed && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm">
                        📷 {isZh ? '固定镜头' : 'Fixed Camera'}
                      </span>
                      <button
                        onClick={() => setCameraFixed(!cameraFixed)}
                        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                        style={{ background: cameraFixed ? 'linear-gradient(to right, #ffcc33, #ff9900)' : '#363b4e' }}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${cameraFixed ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Seed */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">{isZh ? '种子' : 'Seed'}</label>
                  <Info className="h-4 w-4 text-white/30" />
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setSeedLocked(!seedLocked)} className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0f1117] hover:bg-[#2b3046] transition-colors">
                    {seedLocked ? <Lock className="h-4 w-4 text-[#ffcc33]" /> : <Unlock className="h-4 w-4 text-white/50" />}
                  </button>
                  <input
                    type="text"
                    className="h-9 flex-1 rounded-md border border-[#363b4e] bg-[#0f1117] px-3 text-center font-mono text-sm text-white focus:border-[#ffcc33] focus:outline-none"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value.replace(/\D/g, ''))}
                    disabled={seedLocked}
                  />
                  <button onClick={randomizeSeed} disabled={seedLocked} className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0f1117] hover:bg-[#2b3046] transition-colors disabled:opacity-40">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Public toggle */}
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {isZh ? '公开可见性' : 'Public'}
                    <Info className="h-4 w-4 text-white/30" />
                  </span>
                  <div className="flex items-center gap-2">
                    <Gem className="h-4 w-4 text-[#ffcc33]" />
                    <button
                      onClick={() => setIsPublic(!isPublic)}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                      style={{ background: isPublic ? 'linear-gradient(to right, #ffcc33, #ff9900)' : '#363b4e' }}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${isPublic ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: credits + generate */}
            <div className="flex-shrink-0 border-t border-[#363b4e] pt-4">
              <div className="mb-3 flex items-center justify-between rounded-lg border border-[#ffcc33]/10 bg-[#ffcc33]/5 p-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-[#ffcc33]" />
                  <span className="text-sm font-medium">{isZh ? '所需点数' : 'Credits'}</span>
                </div>
                <span className="font-bold text-[#ffcc33]">{calculateVideoCredits(selectedModel.id, duration, videoResolution)}</span>
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="w-full rounded-md py-3 text-sm font-semibold text-black transition-opacity disabled:opacity-50"
                style={{ background: 'linear-gradient(to right, #ffcc33, #ff9900)' }}
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    {isZh ? '生成中...' : 'Generating...'}
                  </span>
                ) : (
                  isZh ? '生成视频' : 'Generate Video'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Sample Videos */}
      <div className="w-full min-w-0">
        <div className="flex h-full flex-1 flex-col rounded-xl border border-[#363b4e]/50 bg-[#1c2030] shadow-lg">
          <div className="flex-shrink-0 p-6">
            <div className="flex items-center gap-2 font-semibold">
              <Film className="h-5 w-5 text-[#ffcc33]" />
              <span className="gradient-text">{isZh ? '示例视频' : 'Example Videos'}</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden p-6 pt-0">
            <div className="flex h-full w-full items-center justify-center">
              <video
                controls
                autoPlay
                loop
                muted
                playsInline
                poster={sampleVideoPoster}
                preload="none"
                src={sampleVideoSrc}
                className="h-full w-full rounded-lg object-contain shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
