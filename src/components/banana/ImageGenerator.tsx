'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, CheckCircle, Sparkles, ChevronDown, ChevronLeft, ChevronRight, Info, Gem, Images, Coins } from 'lucide-react';

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

interface ImageGeneratorProps {
  examples?: ExampleSlide[];
}

export default function ImageGenerator({ examples }: ImageGeneratorProps) {
  const t = useTranslations('banana.imageGenerator');
  const isZh = useLocale() === 'zh';
  const EXAMPLES = examples ?? DEFAULT_EXAMPLES;
  const [mode, setMode] = useState<Mode>('text');
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [resolution, setResolution] = useState('1K');
  const [quantity, setQuantity] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [generateState, setGenerateState] = useState<GenerateState>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [exampleIdx, setExampleIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    if (generateState === 'loading') return;
    setGenerateState('loading');
    setTimeout(() => {
      setGenerateState('done');
      setTimeout(() => setGenerateState('idle'), 2000);
    }, 3000);
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
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:h-[calc(100vh-180px)] lg:max-h-[750px]">
      {/* ═══ Left: AI Image Generator Panel ═══ */}
      <div className="w-full lg:flex-shrink-0 lg:w-[380px] xl:w-[420px]">
        <div className="flex h-full flex-col rounded-xl border border-[#363b4e]/50 bg-[#13151f] shadow-lg">
          {/* Header + Model selector */}
          <div className="flex-shrink-0 p-5 pb-2">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-base font-bold text-white sm:text-lg">{t('title')}</span>
              <button className="flex w-full items-center gap-1 rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 text-sm transition-colors hover:bg-[#252a3d] sm:w-auto">
                <Image src="https://static.banana2ai.net/images/icons/google-icon.svg" alt="Google" width={24} height={24} className="h-6 w-6 flex-shrink-0" />
                <span className="truncate text-[#ffcc33]">Nano Banana Pro</span>
                <ChevronDown className="h-4 w-4 text-white/50" />
              </button>
            </div>
            <div className="rounded-lg p-2">
              <p className="text-sm font-semibold text-white/90">{t('powered_by')}</p>
            </div>
          </div>

          {/* Scrollable controls */}
          <div className="flex min-h-0 flex-1 flex-col px-5 pb-5 pt-2">
            <div className="flex h-full flex-col">
              {/* Mode tabs */}
              <div className="mb-4 flex-shrink-0">
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#0f1117] p-1">
                  {(['text', 'image'] as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`relative rounded-md px-6 py-3 text-sm font-medium transition-all ${
                        mode === m
                          ? 'text-white'
                          : 'text-white/50 hover:text-white/80'
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
              </div>

              {/* Scrollable body */}
              <div className="mb-4 min-h-0 flex-1 space-y-4 overflow-y-auto custom-scrollbar">
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
                    className="min-h-[100px] w-full resize-y rounded-md border border-[#363b4e]/50 bg-[#1c2030] px-3 py-2 pr-10 text-sm text-white placeholder-white/30 transition-colors focus:border-[#ffcc33] focus:outline-none md:min-h-[140px]"
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
                    <label className="text-sm font-medium text-white">{t('style')}</label>
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
                <div>
                  <div className="mb-2 flex items-center gap-1">
                    <label className="text-sm font-medium text-white">{t('style')}</label>
                    <Info className="h-4 w-4 cursor-help text-white/40" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 px-1">
                    {QUANTITIES.map((q) => (
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
                  {/* Credits display */}
                  <div className="rounded-lg border border-[#ffcc33]/30 bg-gradient-to-r from-[#ffcc33]/10 to-[#ffcc33]/5">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-[#ffcc33]" />
                        <span className="text-sm font-medium text-white">Credits needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/40 line-through">20</span>
                        <span className="text-base font-bold text-[#ffcc33]">10</span>
                        <span className="rounded-md border border-[#ffcc33]/20 bg-[#ffcc33]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#ffcc33]">
                          50% OFF
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Generate button */}
                  <button
                    onClick={handleGenerate}
                    disabled={generateState === 'loading'}
                    className="w-full rounded-md px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-70"
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

      {/* ═══ Right: Example Images Panel ═══ */}
      <div className="w-full min-w-0">
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
      </div>
    </div>
  );
}
