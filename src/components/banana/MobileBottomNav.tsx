'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NAV_ICONS = [
  {
    href: '/',
    key: 'home',
    icon: (
      <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-7 w-7 transition-colors">
        <path d="M923.733333 394.666667c-85.333333-70.4-206.933333-174.933333-362.666666-309.333334C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333c-155.733333 134.4-277.333333 238.933333-362.666666 309.333334-14.933333 14.933333-25.6 34.133333-25.6 53.333333 0 38.4 32 70.4 70.4 70.4H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333H405.333333c29.866667 0 53.333333-23.466667 53.333334-53.333333v-206.933333h106.666666v206.933333c0 29.866667 23.466667 53.333333 53.333334 53.333333h160c29.866667 0 53.333333-23.466667 53.333333-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-10.666667-40.533333-25.6-53.333333z" />
      </svg>
    ),
  },
  {
    href: '/image',
    key: 'image',
    icon: (
      <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6 transition-colors">
        <path d="M213.333333 128h597.333334a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128z m640 611.968l-94.805333-94.805333a85.333333 85.333333 0 0 0-120.661333 0l-26.837334 26.837333 138.666667 138.666667H810.666667a42.666667 42.666667 0 0 0 42.666666-42.666667v-28.032zM682.666667 469.333333a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z m170.666666 149.973334V256a42.666667 42.666667 0 0 0-42.666666-42.666667H213.333333a42.666667 42.666667 0 0 0-42.666666 42.666667v232.533333l7.765333-7.765333a170.666667 170.666667 0 0 1 241.365333 0l130.901334 130.901333 26.837333-26.837333a170.666667 170.666667 0 0 1 241.322667 0l34.474666 34.474667zM629.034667 810.666667l-269.568-269.568a85.333333 85.333333 0 0 0-120.704 0L170.666667 609.194667V768a42.666667 42.666667 0 0 0 42.666666 42.666667h415.701334z" />
      </svg>
    ),
  },
  {
    href: '/video',
    key: 'video',
    icon: (
      <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6 transition-colors">
        <path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM712 792H136V232h576v560z m176-167l-104-59.8V458.9L888 399v226z" />
        <path d="M208 360h112c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" />
      </svg>
    ),
  },
  {
    href: '/pricing',
    key: 'premium',
    icon: (
      <svg viewBox="0 0 1030 1024" fill="currentColor" className="h-6 w-6 transition-colors">
        <path d="M508.82 1017.64c-12.72 0-31.801-6.36-38.162-19.081L0 343.453 254.41 0h515.18L1024 343.453 546.981 998.56c-6.36 12.72-25.44 19.08-38.161 19.08z m-12.72-57.242z m25.44 0zM76.323 343.453L508.82 941.317l432.497-597.864-203.528-279.85H279.85L76.323 343.452z" />
        <path d="M38.161 311.652h941.317v63.603H38.161z" />
        <path d="M477.019 1004.92L286.21 343.452 483.38 19.081l50.882 31.801-178.087 298.932L540.62 985.839z" />
        <path d="M540.621 1004.92l-63.602-19.081 184.447-636.025L483.379 50.882l50.882-31.801 197.168 324.372z" />
      </svg>
    ),
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const path = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
  const t = useTranslations('banana.mobileNav');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.50) 100%)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div className="mx-4 mb-2 rounded-[2rem] shadow-2xl" style={{
        background: 'rgba(20, 20, 30, 0.50)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}>
        <div className="flex items-center justify-around p-1">
          {NAV_ICONS.map((item) => {
            const isActive = item.href === '/'
              ? path === '/'
              : path.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl px-3 py-2 transition-all duration-300 ease-out"
              >
                {isActive && (
                  <div
                    className="absolute left-1/2 top-2 h-8 w-8 -translate-x-1/2 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(248, 210, 75, 0.1) 0%, rgba(248, 210, 75, 0.05) 100%)',
                      boxShadow: '0 0 10px rgba(248, 210, 75, 0.15)',
                    }}
                  />
                )}
                <div className="relative z-10 mb-1" style={{ color: isActive ? '#f8d24b' : 'white' }}>
                  {item.icon}
                </div>
                <span
                  className="relative z-10 truncate text-xs font-medium transition-all duration-300"
                  style={{
                    color: isActive ? '#f8d24b' : '#9ca3af',
                    textShadow: isActive ? '0 0 8px rgba(248, 210, 75, 0.5)' : 'none',
                  }}
                >
                  {t(item.key)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
