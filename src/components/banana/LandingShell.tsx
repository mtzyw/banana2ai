'use client';

import { ReactNode, useState, useEffect } from 'react';
import { TopNavbar, Sidebar } from '@/shared/components/layout';
import Footer from '@/components/banana/Footer';
import PromoBanner from '@/components/banana/PromoBanner';
import ScrollFadeGlobal from '@/components/banana/ScrollFadeGlobal';

const BANNER_HEIGHT = 34;

export default function LandingShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [bannerVisible, setBannerVisible] = useState(true);

  const topOffset = bannerVisible ? BANNER_HEIGHT : 0;

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="bg-[#0f1117] min-h-screen">
      <ScrollFadeGlobal />
      <PromoBanner onClose={() => setBannerVisible(false)} />

      <div style={{ paddingTop: topOffset }}>
        <TopNavbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
          topOffset={topOffset}
        />

        <div className="flex pt-16">
          <Sidebar
            open={sidebarOpen}
            isMobile={isMobile}
            onClose={() => setSidebarOpen(false)}
            topOffset={topOffset + 64}
          />

          <main
            className="flex-1 min-h-[calc(100vh-64px)] overflow-auto transition-[margin] duration-300"
            style={{ marginLeft: sidebarOpen && !isMobile ? 240 : 0 }}
          >
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
