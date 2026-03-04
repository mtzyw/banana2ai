/**
 * Server-side credit calculator.
 * Source: Reverse-engineered from bananaproai.com module 58918 (chunk 7786)
 * Mirrors: ImageGenerator.calculateImageCredits + VideoGeneratorPanel.calculateVideoCredits
 */

// ── Image Credits ──
const IMAGE_CREDITS: Record<string, number | Record<string, number>> = {
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

export function calculateImageCredits(
  modelId: string,
  quantity: number = 1,
  resolution: string = '1K'
): number {
  const cost = IMAGE_CREDITS[modelId];
  if (!cost) return 10 * quantity; // safe fallback
  if (typeof cost === 'number') return cost * quantity;
  return (cost[resolution] ?? cost['1K'] ?? 10) * quantity;
}

// ── Video Credits ──
export function calculateVideoCredits(
  modelId: string,
  duration: number = 5,
  resolution: string = '480p',
  quality: string = 'standard',
  nFrames: string = '10'
): number {
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

  // Sora 2
  if (modelId === 'sora-2') {
    const dur = parseInt(nFrames || '10');
    if (quality === 'hd') return dur >= 15 ? 30 : 20;
    return dur >= 15 ? 15 : 10;
  }

  // Sora 2 Pro
  if (modelId === 'sora-2-pro') {
    const dur = parseInt(nFrames || '10');
    if (quality === 'high') return dur >= 15 ? 300 : 200;
    return dur >= 15 ? 200 : 150;
  }

  // Sora 2 Pro Storyboard
  if (modelId === 'sora-2-pro-storyboard') {
    const dur = parseInt(nFrames || '10');
    if (dur >= 25) return 300;
    if (dur >= 15) return 200;
    return 150;
  }

  return 10; // fallback
}

// ── Unified entry ──
export function calculateCredits(params: {
  mediaType: 'image' | 'video' | 'music';
  modelId: string;
  quantity?: number;
  resolution?: string;
  duration?: number;
  quality?: string;
  nFrames?: string;
}): number {
  if (params.mediaType === 'image') {
    return calculateImageCredits(params.modelId, params.quantity || 1, params.resolution || '1K');
  }
  if (params.mediaType === 'video') {
    return calculateVideoCredits(
      params.modelId,
      params.duration || 5,
      params.resolution || '480p',
      params.quality || 'standard',
      params.nFrames || '10'
    );
  }
  if (params.mediaType === 'music') {
    return 10; // fixed for now
  }
  return 10;
}
