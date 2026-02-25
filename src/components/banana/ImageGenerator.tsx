'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, CheckCircle, Sparkles } from 'lucide-react';

const ASPECT_RATIOS = [
  '16:9', '5:4', '4:3', '3:2', '1:1', '2:3', '3:4', '4:5', '9:16',
] as const;

const SAMPLE_IMAGES = [
  '/images/banana/1tpln4as6p33.jpeg',
  '/images/banana/3rh7in3ztrd9.jpeg',
  '/images/banana/5aqwpua9noqi.jpeg',
  '/images/banana/8pk4idwouhh0.jpeg',
  '/images/banana/b88usp2lk4ef.jpeg',
  '/images/banana/d5gn3mlwmm7n.jpeg',
  '/images/banana/f4ru78usquup.jpeg',
  '/images/banana/i0ygz1dtdza3.jpeg',
  '/images/banana/j3znhyr1jyn8.jpeg',
];

type Mode = 'text' | 'image';
type GenerateState = 'idle' | 'loading' | 'done';

export default function ImageGenerator() {
  const [mode, setMode] = useState<Mode>('text');
  const [prompt, setPrompt] = useState('');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [generateState, setGenerateState] = useState<GenerateState>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [prompt]);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const getButtonContent = () => {
    if (generateState === 'loading') return (
      <><Loader2 className="w-5 h-5 animate-spin mr-2" />生成中...</>
    );
    if (generateState === 'done') return (
      <><CheckCircle className="w-5 h-5 mr-2" />生成完成！</>
    );
    return <><Sparkles className="w-5 h-5 mr-2" />✨ AI 生成</>;
  };

  return (
    <div className="w-full bg-[#13151f] border border-[#363b4e] rounded-2xl overflow-hidden">
      {/* Mode Tabs */}
      <div className="flex border-b border-[#363b4e]">
        {(['text', 'image'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-200 ${
              mode === m
                ? 'bg-[#1c2030] text-[#ffcc33] border-b-2 border-[#ffcc33]'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
            }`}
          >
            {m === 'text' ? '文本转换为 图片' : '图片转 图片'}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="flex flex-col lg:flex-row min-h-[480px]">
        {/* Left panel ~40% */}
        <div className="w-full lg:w-[40%] p-5 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-[#363b4e]">
          {/* Image upload (image mode only) */}
          {mode === 'image' && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">上传参考图片</label>
              {uploadedFile ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0f1117]">
                  <img src={uploadedFile} alt="uploaded" className="w-full h-full object-contain" />
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex flex-col items-center justify-center gap-2 w-full min-h-[140px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-[#ffcc33] bg-[#ffcc33]/5'
                      : 'border-[#363b4e] bg-[#0f1117] hover:border-[#ffcc33]/50 hover:bg-[#ffcc33]/[0.02]'
                  }`}
                >
                  <Upload className="w-8 h-8 text-white/30" />
                  <span className="text-sm text-white/50">拖拽图片或点击选择</span>
                  <span className="text-xs text-white/30">JPG / PNG（最大 10MB）</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange(file);
                }}
              />
            </div>
          )}

          {/* Prompt */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">提示词</label>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="描述你想要生成的图像..."
              rows={3}
              className="w-full resize-none overflow-hidden bg-[#0f1117] border border-[#363b4e] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ffcc33]/50 transition-colors"
            />
          </div>

          {/* Aspect ratio */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">图片尺寸</label>
            <div className="grid grid-cols-5 gap-1.5">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setSelectedRatio(ratio)}
                  className={`py-1.5 px-1 rounded-lg text-xs font-medium transition-all duration-150 ${
                    selectedRatio === ratio
                      ? 'bg-[#ffcc33] text-black font-bold'
                      : 'bg-[#1c2030] text-white hover:bg-[#252a3d] hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={generateState === 'loading'}
            className={`w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all duration-200 mt-auto ${
              generateState === 'done'
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black hover:opacity-90 active:scale-[0.98] disabled:opacity-70'
            }`}
          >
            {getButtonContent()}
          </button>
        </div>

        {/* Right panel ~60% */}
        <div className="w-full lg:w-[60%] p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-white/70">🖼 示例图片</h3>
          <div className="grid grid-cols-3 gap-2">
            {SAMPLE_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#0f1117] group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`示例图片 ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
