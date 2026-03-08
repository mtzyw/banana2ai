'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { Download, Trash2, Image as ImageIcon, Video, Layers, Search, Loader2, Plus, X, Eye } from 'lucide-react';

/* ── Types ── */
interface GeneratedItem {
  id: string;
  prompt: string;
  model: string;
  mediaType: 'image' | 'video';
  images: string[];
  watermarked: string[];
  ratio: string;
  createdAt: string;
}

interface UploadedItem {
  id: string;
  url: string;
  filename: string;
  content_type: string;
  size_bytes: number;
  created_at: string;
}

/* ── Watermark (same as ImageGenerator) ── */
function addWatermark(imageUrl: string, text = 'banana2ai.net'): Promise<string> {
  return new Promise((resolve) => {
    fetch(imageUrl)
      .then(r => r.blob())
      .then(blob => createImageBitmap(blob))
      .then(bitmap => {
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(bitmap, 0, 0);
        const fontSize = Math.max(16, Math.min(canvas.width, canvas.height) * 0.04);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const gap = fontSize * 8;
        const diag = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-30 * Math.PI / 180);
        for (let y = -diag; y < diag; y += gap) {
          for (let x = -diag; x < diag; x += gap) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
        resolve(canvas.toDataURL('image/png'));
      })
      .catch(() => resolve(imageUrl));
  });
}

function downloadFile(url: string, filename: string) {
  if (url.startsWith('data:')) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    return;
  }
  fetch(url).then(r => r.blob()).then(blob => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }).catch(() => window.open(url, '_blank'));
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ── Component ── */
export default function AssetsClient() {
  const locale = useLocale();
  const isZh = locale === 'zh';

  const [sourceTab, setSourceTab] = useState<'generate' | 'upload'>('generate');
  const [mediaFilter, setMediaFilter] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate tab state
  const [generates, setGenerates] = useState<GeneratedItem[]>([]);
  const [genLoading, setGenLoading] = useState(false);
  const [genPage, setGenPage] = useState(1);
  const [genHasMore, setGenHasMore] = useState(true);

  // Upload tab state
  const [uploads, setUploads] = useState<UploadedItem[]>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadOffset, setUploadOffset] = useState(0);
  const [uploadHasMore, setUploadHasMore] = useState(true);

  // Detail modal
  const [detailItem, setDetailItem] = useState<GeneratedItem | null>(null);

  const PAGE_SIZE = 20;

  /* ── Fetch Generates ── */
  const fetchGenerates = useCallback(async (page: number, append: boolean) => {
    setGenLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
      if (mediaFilter !== 'all') params.set('mediaType', mediaFilter);
      const res = await fetch(`/api/user/tasks?${params}`);
      const data = await res.json();
      if (data.code === 0) {
        const tasks = data.data?.tasks || [];
        const items: GeneratedItem[] = tasks
          .map((t: any) => {
            const images = (t.taskInfo?.images || []).map((img: any) => img.imageUrl).filter(Boolean);
            const videos = (t.taskInfo?.videos || []).map((v: any) => v.videoUrl).filter(Boolean);
            const urls = [...images, ...videos];
            return {
              id: t.id,
              prompt: t.prompt || '',
              model: t.model || '',
              mediaType: videos.length > 0 ? 'video' as const : 'image' as const,
              images: urls,
              watermarked: [] as string[],
              ratio: t.options?.aspect_ratio || '1:1',
              createdAt: t.createdAt || new Date().toISOString(),
            };
          })
          .filter((item: GeneratedItem) => item.images.length > 0);

        if (append) {
          setGenerates(prev => [...prev, ...items]);
        } else {
          setGenerates(items);
        }
        setGenHasMore(tasks.length >= PAGE_SIZE);
        setGenPage(page + 1);

        // Watermark images in background
        items.forEach((item) => {
          if (item.mediaType === 'image') {
            Promise.all(item.images.map(url => addWatermark(url))).then(wm => {
              setGenerates(prev => prev.map(p => p.id === item.id ? { ...p, watermarked: wm } : p));
            });
          }
        });
      }
    } catch {}
    setGenLoading(false);
  }, [mediaFilter]);

  /* ── Fetch Uploads ── */
  const fetchUploads = useCallback(async (offset: number, append: boolean) => {
    setUploadLoading(true);
    try {
      const res = await fetch(`/api/upload?limit=${PAGE_SIZE}&offset=${offset}`);
      const data = await res.json();
      if (data.code === 0) {
        const assets = data.data?.assets || [];
        if (append) {
          setUploads(prev => [...prev, ...assets]);
        } else {
          setUploads(assets);
        }
        setUploadHasMore(assets.length >= PAGE_SIZE);
        setUploadOffset(offset + assets.length);
      }
    } catch {}
    setUploadLoading(false);
  }, []);

  /* ── Initial load ── */
  useEffect(() => {
    if (sourceTab === 'generate') {
      setGenPage(1);
      fetchGenerates(1, false);
    } else {
      setUploadOffset(0);
      fetchUploads(0, false);
    }
  }, [sourceTab, mediaFilter]);

  /* ── Filter by search ── */
  const filteredGenerates = generates.filter(item => {
    if (searchQuery && !item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) && !item.model.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredUploads = uploads.filter(item => {
    if (searchQuery && !item.filename?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sourceTabs = [
    { key: 'generate' as const, label: isZh ? '我的生成' : 'My Generates' },
    { key: 'upload' as const, label: isZh ? '我的上传' : 'My Uploads' },
  ];

  const mediaFilters = [
    { key: 'all' as const, label: isZh ? '全部' : 'All', icon: Layers },
    { key: 'image' as const, label: isZh ? '图片' : 'Images', icon: ImageIcon },
    { key: 'video' as const, label: isZh ? '视频' : 'Videos', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            <span className="gradient-text">{isZh ? '素材库' : 'Assets Library'}</span>
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {isZh ? '管理您所有 AI 生成的图片、视频和上传的素材' : 'Manage all your AI generated images, videos and uploaded assets'}
          </p>
        </div>

        {/* Source Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex rounded-full border border-[#363b4e]/50 bg-[#1c2030] p-1">
            {sourceTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setSourceTab(tab.key); setSearchQuery(''); }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  sourceTab === tab.key
                    ? 'bg-[#ffcc33] text-[#0f1117] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Media type filter (only for generates) */}
          {sourceTab === 'generate' && (
            <div className="flex rounded-full border border-[#363b4e]/50 bg-[#1c2030] p-1">
              {mediaFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setMediaFilter(f.key)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    mediaFilter === f.key
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  <f.icon className="h-3.5 w-3.5" />
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isZh ? '搜索...' : 'Search...'}
              className="rounded-full border border-[#363b4e]/50 bg-[#1c2030] py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 outline-none focus:border-[#ffcc33]/50"
            />
          </div>
        </div>

        {/* Content Grid */}
        {sourceTab === 'generate' ? (
          <>
            {filteredGenerates.length === 0 && !genLoading ? (
              <EmptyState isZh={isZh} type="generate" />
            ) : (
              <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
                {filteredGenerates.map((item) => (
                  <GenerateCard key={item.id} item={item} isZh={isZh} onClick={() => setDetailItem(item)} />
                ))}
              </div>
            )}
            {genLoading && <LoadingGrid />}
            {genHasMore && !genLoading && filteredGenerates.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => fetchGenerates(genPage, true)}
                  className="rounded-full border border-[#363b4e]/50 bg-[#1c2030] px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-[#ffcc33]/50 hover:text-white"
                >
                  {isZh ? '加载更多' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {filteredUploads.length === 0 && !uploadLoading ? (
              <EmptyState isZh={isZh} type="upload" />
            ) : (
              <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
                {filteredUploads.map((item) => (
                  <UploadCard key={item.id} item={item} isZh={isZh} />
                ))}
              </div>
            )}
            {uploadLoading && <LoadingGrid />}
            {uploadHasMore && !uploadLoading && filteredUploads.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => fetchUploads(uploadOffset, true)}
                  className="rounded-full border border-[#363b4e]/50 bg-[#1c2030] px-6 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-[#ffcc33]/50 hover:text-white"
                >
                  {isZh ? '加载更多' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {detailItem && (
        <DetailModal item={detailItem} isZh={isZh} onClose={() => setDetailItem(null)} />
      )}
    </div>
  );
}

/* ── Generate Card ── */
function GenerateCard({ item, isZh, onClick }: { item: GeneratedItem; isZh: boolean; onClick: () => void }) {
  const displayUrl = item.watermarked[0] || item.images[0];
  const isVideo = item.mediaType === 'video';

  return (
    <div
      className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-[#363b4e]/30 bg-[#1c2030] transition-all duration-300 hover:border-[#ffcc33]/30 hover:shadow-lg hover:shadow-[#ffcc33]/5"
      onClick={onClick}
    >
      {/* Preview */}
      <div className="group relative">
        {isVideo ? (
          <video
            src={item.images[0]}
            className="w-full"
            muted
            loop
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
            onMouseLeave={(e) => { (e.target as HTMLVideoElement).pause(); (e.target as HTMLVideoElement).currentTime = 0; }}
          />
        ) : (
          <img src={displayUrl} alt="" className="w-full" loading="lazy" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80" onClick={(e) => { e.stopPropagation(); }}>
              <Eye className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80"
              onClick={(e) => {
                e.stopPropagation();
                downloadFile(displayUrl, `banana2ai-${item.id}.${isVideo ? 'mp4' : 'png'}`);
              }}
            >
              <Download className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Media type badge */}
        {isVideo && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            <Video className="h-3 w-3" /> Video
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-[#ffcc33] px-2 py-0.5 text-[10px] font-bold text-[#0f1117]">
            {item.model.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'AI'}
          </span>
          <span className="ml-auto text-[10px] text-white/30">
            {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        {item.prompt && (
          <p className="line-clamp-2 text-xs leading-relaxed text-white/60">{item.prompt}</p>
        )}
      </div>
    </div>
  );
}

/* ── Upload Card ── */
function UploadCard({ item, isZh }: { item: UploadedItem; isZh: boolean }) {
  const isImage = item.content_type?.startsWith('image/');
  const isVideo = item.content_type?.startsWith('video/');

  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#363b4e]/30 bg-[#1c2030] transition-all duration-300 hover:border-[#363b4e]/60">
      {/* Preview */}
      <div className="group relative">
        {isVideo ? (
          <video src={item.url} className="w-full" muted />
        ) : isImage ? (
          <img src={item.url} alt="" className="w-full" loading="lazy" />
        ) : (
          <div className="flex h-32 items-center justify-center bg-[#13151f]">
            <Layers className="h-8 w-8 text-white/20" />
          </div>
        )}
        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80"
              onClick={() => downloadFile(item.url, item.filename || 'download')}
            >
              <Download className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 p-3">
        <p className="truncate text-xs font-medium text-white/70">{item.filename || 'Untitled'}</p>
        <div className="flex items-center justify-between text-[10px] text-white/30">
          <span>{formatBytes(item.size_bytes || 0)}</span>
          <span>{new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Detail Modal ── */
function DetailModal({ item, isZh, onClose }: { item: GeneratedItem; isZh: boolean; onClose: () => void }) {
  const displayUrl = item.watermarked[0] || item.images[0];
  const isVideo = item.mediaType === 'video';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-[#363b4e]/50 bg-[#13151f] shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80">
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image/Video */}
          <div className="flex flex-1 items-center justify-center bg-black/20 p-4 lg:p-8">
            {isVideo ? (
              <video src={item.images[0]} controls className="max-h-[60vh] w-full rounded-lg object-contain" />
            ) : (
              <img src={displayUrl} alt="" className="max-h-[60vh] w-full rounded-lg object-contain" />
            )}
          </div>

          {/* Details sidebar */}
          <div className="w-full space-y-5 border-t border-[#363b4e]/30 p-6 lg:w-80 lg:border-l lg:border-t-0">
            {/* Model */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/40">{isZh ? '模型' : 'Model'}</label>
              <span className="inline-flex items-center rounded-md bg-[#ffcc33] px-2.5 py-1 text-xs font-bold text-[#0f1117]">
                {item.model.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'AI'}
              </span>
            </div>

            {/* Prompt */}
            {item.prompt && (
              <div>
                <label className="mb-1 block text-xs font-medium text-white/40">{isZh ? '提示词' : 'Prompt'}</label>
                <p className="text-sm leading-relaxed text-white/80">{item.prompt}</p>
              </div>
            )}

            {/* Ratio */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/40">{isZh ? '比例' : 'Aspect Ratio'}</label>
              <span className="text-sm text-white/70">{item.ratio}</span>
            </div>

            {/* Date */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/40">{isZh ? '创建时间' : 'Created'}</label>
              <span className="text-sm text-white/70">
                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            {/* Download buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => downloadFile(displayUrl, `banana2ai-${item.id}.png`)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#363b4e]/50 bg-[#1c2030] py-2.5 text-sm text-white/80 transition-all hover:border-[#ffcc33]/50"
              >
                <Download className="h-4 w-4" />
                {isZh ? '下载带水印' : 'Download with watermark'}
              </button>
              <button
                onClick={() => downloadFile(item.images[0], `banana2ai-${item.id}-hd.png`)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ffcc33] py-2.5 text-sm font-medium text-[#0f1117] transition-all hover:bg-[#ffcc33]/90"
              >
                <Download className="h-4 w-4" />
                {isZh ? '下载无水印' : 'Download without watermark'} 👑
              </button>
            </div>

            {/* All images if multiple */}
            {item.images.length > 1 && (
              <div>
                <label className="mb-2 block text-xs font-medium text-white/40">
                  {isZh ? '所有图片' : 'All Images'} ({item.images.length})
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {item.images.map((url, idx) => (
                    <img key={idx} src={item.watermarked[idx] || url} alt="" className="w-full rounded-md object-cover" loading="lazy" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState({ isZh, type }: { isZh: boolean; type: 'generate' | 'upload' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1c2030]">
        {type === 'generate' ? (
          <ImageIcon className="h-10 w-10 text-white/20" />
        ) : (
          <Plus className="h-10 w-10 text-white/20" />
        )}
      </div>
      <h3 className="mb-2 text-lg font-medium text-white/70">
        {type === 'generate'
          ? (isZh ? '还没有生成记录' : 'No generations yet')
          : (isZh ? '还没有上传文件' : 'No uploads yet')
        }
      </h3>
      <p className="mb-6 text-sm text-white/40">
        {type === 'generate'
          ? (isZh ? '去生成一些 AI 图片或视频吧！' : 'Start creating AI images or videos!')
          : (isZh ? '上传图片作为参考素材' : 'Upload images as reference assets')
        }
      </p>
      <a
        href={type === 'generate' ? '/image' : '/image'}
        className="rounded-full bg-[#ffcc33] px-6 py-2.5 text-sm font-medium text-[#0f1117] transition-all hover:bg-[#ffcc33]/90"
      >
        {type === 'generate' ? (isZh ? '开始创作' : 'Start Creating') : (isZh ? '去上传' : 'Upload Now')}
      </a>
    </div>
  );
}

/* ── Loading Grid ── */
function LoadingGrid() {
  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="mb-4 break-inside-avoid animate-pulse overflow-hidden rounded-xl bg-[#1c2030]">
          <div className="h-48 bg-[#363b4e]/20" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-20 rounded bg-[#363b4e]/20" />
            <div className="h-2 w-full rounded bg-[#363b4e]/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
