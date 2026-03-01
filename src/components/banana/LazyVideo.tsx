'use client';

import { useRef, useEffect, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  /** If true, load immediately (e.g. hero background). Default: lazy */
  eager?: boolean;
}

/**
 * Video that only loads when scrolled into view.
 * Saves bandwidth by not downloading off-screen videos.
 */
export default function LazyVideo({ src, className = '', eager = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload={eager ? 'metadata' : 'none'}
      className={className}
      {...(visible ? { src } : {})}
    />
  );
}
