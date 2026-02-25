'use client';

import { useEffect, useRef } from 'react';

export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const fadeEls = el.querySelectorAll(
      '.scroll-fade-in, .scroll-fade-left, .scroll-fade-right'
    );
    fadeEls.forEach((child) => observer.observe(child));

    if (
      el.classList.contains('scroll-fade-in') ||
      el.classList.contains('scroll-fade-left') ||
      el.classList.contains('scroll-fade-right')
    ) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
