'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import {
  Home,
  Lightbulb,
  Workflow,
  Image,
  Video,
  Diamond,
  Zap,
  Sparkles,
  Wand2,
  Eye,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badges?: Array<{ text: string; color: 'green' | 'orange' | 'red' | 'blue' }>;
  exact?: boolean;
}

const BadgeColors: Record<string, string> = {
  green: 'bg-green-500/20 text-green-400 border border-green-500/30',
  orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  red: 'bg-red-500/20 text-red-400 border border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
};

function NavItemRow({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors group ${
        isActive
          ? 'bg-yellow-500/15 text-[#f8d24b] border border-yellow-500/20'
          : 'text-white/60 hover:text-white/90 hover:bg-white/[0.05] border border-transparent'
      }`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${
          isActive ? 'text-[#f8d24b]' : 'text-white/50 group-hover:text-white/70'
        }`}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badges && item.badges.length > 0 && (
        <div className="flex items-center gap-1">
          {item.badges.map((badge) => (
            <span
              key={badge.text}
              className={`px-1 py-0.5 rounded text-[9px] font-semibold leading-none ${BadgeColors[badge.color]}`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function RailIcon({
  item,
  isActive,
  badge,
}: {
  item: NavItem;
  isActive: boolean;
  badge?: string;
}) {
  const Icon = item.icon;
  return (
    <li className="relative">
      <Link
        href={item.href}
        className={`flex items-center justify-center rounded-md px-2 py-2 transition-colors ${
          isActive
            ? 'border-l-2 border-white bg-[hsl(220,15%,28%)] text-white'
            : 'border-l-2 border-transparent hover:bg-[hsl(220,15%,28%)] hover:text-white text-white/50'
        }`}
        title={item.label}
      >
        <Icon className="h-5 w-5" />
      </Link>
      {badge && (
        <span className="absolute -right-0.5 -top-0.5 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9900] px-1 py-px text-[8px] font-bold leading-none text-black">
          {badge}
        </span>
      )}
    </li>
  );
}

interface SidebarProps {
  open?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  topOffset?: number;
}

export default function Sidebar({ open, isMobile, onClose, topOffset = 64 }: SidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const isZh = locale === 'zh';
  const normalizedPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

  const NEW = isZh ? '新功能' : 'New';
  const HOT = isZh ? '热门' : 'Hot';

  const mainNav: NavItem[] = [
    { icon: Home, label: isZh ? '首页' : 'Home', href: '/', exact: true },
    { icon: Lightbulb, label: 'Banana Prompts', href: '/banana-prompts' },
    {
      icon: Workflow,
      label: isZh ? 'AI 工作流工作室' : 'AI Workflow Studio',
      href: '/studio',
      badges: [{ text: NEW, color: 'green' }],
    },
  ];

  const aiGenNav: NavItem[] = [
    { icon: Image, label: isZh ? 'AI 图像制作' : 'AI Image', href: '/image', exact: true },
    { icon: Video, label: isZh ? 'AI 视频制作' : 'AI Video', href: '/video', exact: true },
  ];

  const modelsNav: NavItem[] = [
    {
      icon: Sparkles,
      label: 'Banana Pro AI',
      href: '/image/banana-pro-ai',
      badges: [
        { text: NEW, color: 'green' },
        { text: HOT, color: 'orange' },
      ],
    },
    {
      icon: Zap,
      label: 'Z Image Turbo',
      href: '/image/z-image-turbo',
      badges: [{ text: NEW, color: 'green' }],
    },
    { icon: Eye, label: isZh ? 'Seedream AI 图像' : 'Seedream AI', href: '/image/seedream-ai' },
    { icon: Wand2, label: isZh ? 'Grok 图像制作' : 'Grok Imagine', href: '/image/grok-imagine' },
    { icon: Wand2, label: isZh ? 'Qwen 图像编辑' : 'Qwen Image Edit', href: '/image/qwen-image-edit' },
    {
      icon: Zap,
      label: isZh ? 'Flux AI 图像生成器' : 'Flux AI Generator',
      href: '/image/flux-ai-image-generator',
    },
  ];

  const FLUX_LABEL = isZh ? 'Flux AI 图像生成器' : 'Flux AI Generator';

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return normalizedPath === item.href || normalizedPath === item.href + '/';
    }
    return normalizedPath.startsWith(item.href);
  };

  const isFluxActive = normalizedPath.startsWith('/image/flux-ai-image-generator');

  const handleNavClick = () => {
    if (isMobile) onClose?.();
  };

  const allRailItems: Array<NavItem & { badge?: string }> = [
    ...mainNav.map(n => ({ ...n, badge: n.badges?.[0]?.text })),
    ...aiGenNav,
    ...modelsNav.map(n => ({ ...n, badge: n.badges?.[0]?.text })),
  ];

  return (
    <>
      {open && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={handleNavClick}
        />
      )}

      {!open && !isMobile && (
        <div
          className="fixed left-0 z-30 hidden w-16 flex-col border-r border-white/[0.06] bg-[#111111] text-white/70 xl:flex overflow-y-auto"
          style={{
            top: topOffset,
            height: `calc(100vh - ${topOffset}px)`,
          }}
        >
          <nav className="flex-1 space-y-1 p-1.5">
            <ul className="space-y-1">
              {allRailItems.map((item) => (
                <RailIcon
                  key={item.href + item.label}
                  item={item}
                  isActive={item.label === FLUX_LABEL ? isFluxActive : isActive(item)}
                  badge={item.badge}
                />
              ))}
            </ul>
          </nav>
          <div className="border-t border-white/[0.06] p-1.5">
            <Link
              href="/pricing"
              className="flex items-center justify-center rounded-md px-2 py-2 text-[#ffcc33] transition-colors hover:bg-[hsl(220,15%,28%)]"
              title={isZh ? '升级套餐' : 'Upgrade'}
            >
              <Diamond className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}

      <aside
        className="fixed left-0 z-40 w-[240px] bg-[#111111] border-r border-white/[0.06] flex flex-col overflow-y-auto transition-[transform,top,height] duration-300 ease-in-out"
        style={{
          top: topOffset,
          height: `calc(100vh - ${topOffset}px)`,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <nav className="flex flex-col gap-0.5 p-2 flex-1">
          {mainNav.map((item) => (
            <NavItemRow key={item.href} item={item} isActive={isActive(item)} onClick={handleNavClick} />
          ))}

          <div className="pt-3 pb-1 px-1">
            <div className="h-px bg-white/[0.06] mb-2" />
            <span className="px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {isZh ? 'AI 生成' : 'AI Generate'}
            </span>
          </div>

          {aiGenNav.map((item) => (
            <NavItemRow key={item.href + item.label} item={item} isActive={false} onClick={handleNavClick} />
          ))}

          <div className="pt-3 pb-1 px-1">
            <div className="h-px bg-white/[0.06] mb-2" />
            <span className="px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              {isZh ? '模型' : 'Models'}
            </span>
          </div>

          {modelsNav.map((item) => (
            <NavItemRow
              key={item.label}
              item={item}
              isActive={item.label === FLUX_LABEL ? isFluxActive : isActive(item)}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        <div className="p-2 border-t border-white/[0.06]">
          <Link
            href="/pricing"
            onClick={handleNavClick}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-gradient-to-r from-yellow-500/15 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors"
          >
            <Diamond className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span className="flex-1 text-sm text-white/80 font-medium text-left">
              {isZh ? '升级套餐' : 'Upgrade Plan'}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              {isZh ? '5折优惠' : '50% OFF'}
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
