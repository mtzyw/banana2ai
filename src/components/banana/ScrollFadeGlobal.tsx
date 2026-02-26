'use client';

import { useEffect } from 'react';

export default function ScrollFadeGlobal() {
  useEffect(() => {
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
        root: null, // viewport
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    function observeAll() {
      document.querySelectorAll(
        '.scroll-fade-in:not(.visible), .scroll-fade-left:not(.visible), .scroll-fade-right:not(.visible)'
      ).forEach((el) => observer.observe(el));
    }

    // 延迟一帧观察，确保 DOM 渲染完
    requestAnimationFrame(() => observeAll());

    // 路由切换时新元素
    const mutObs = new MutationObserver(() => {
      requestAnimationFrame(() => observeAll());
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);

  return null;
}
