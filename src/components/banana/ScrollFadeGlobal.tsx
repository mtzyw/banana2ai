'use client';

import { useEffect } from 'react';

export default function ScrollFadeGlobal() {
  useEffect(() => {
    // 找 overflow-auto 的滚动容器
    const allMains = document.querySelectorAll('main');
    let scrollContainer: Element | null = null;
    allMains.forEach((m) => {
      if (m.classList.contains('overflow-auto')) {
        scrollContainer = m;
      }
    });

    // 方案 1: 用滚动容器作为 root
    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer1.unobserve(entry.target);
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.02,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    // 方案 2: 用 viewport 作为 root（备用）
    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer2.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.02,
        rootMargin: '50px 0px 50px 0px',
      }
    );

    function observeAll() {
      const els = document.querySelectorAll(
        '.scroll-fade-in:not(.visible), .scroll-fade-left:not(.visible), .scroll-fade-right:not(.visible)'
      );
      els.forEach((el) => {
        observer1.observe(el);
        observer2.observe(el);
      });
    }

    // 延迟一帧确保 DOM 完全渲染
    requestAnimationFrame(() => {
      observeAll();
    });

    // 监听 DOM 变化（路由切换）
    const mutObs = new MutationObserver(() => {
      requestAnimationFrame(() => observeAll());
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    // 备用：滚动时检查
    const handleScroll = () => {
      const els = document.querySelectorAll('.scroll-fade-in:not(.visible), .scroll-fade-left:not(.visible), .scroll-fade-right:not(.visible)');
      if (els.length === 0) return;
      
      const viewH = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewH + 50 && rect.bottom > -50) {
          el.classList.add('visible');
        }
      });
    };

    // 监听 main 容器和 window 滚动
    scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初始触发一次
    setTimeout(handleScroll, 100);
    setTimeout(handleScroll, 500);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
      mutObs.disconnect();
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
