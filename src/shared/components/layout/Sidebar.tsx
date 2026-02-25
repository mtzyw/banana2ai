'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const mainNav: NavItem[] = [
  { icon: Home, label: '首页', href: '/', exact: true },
  { icon: Lightbulb, label: 'Banana 提示词', href: '/banana-prompts' },
  {
    icon: Workflow,
    label: 'AI 工作流工作室',
    href: '/studio',
    badges: [{ text: '新功能', color: 'green' }],
  },
];

const aiGenNav: NavItem[] = [
  { icon: Image, label: 'AI 图像制作', href: '/image', exact: true },
  { icon: Video, label: 'AI 视频制作', href: '/video', exact: true },
];

const modelsNav: NavItem[] = [
  {
    icon: Sparkles,
    label: 'Banana Pro AI',
    href: '/image/banana-pro-ai',
    badges: [
      { text: '新功能', color: 'green' },
      { text: '热门', color: 'orange' },
    ],
  },
  {
    icon: Zap,
    label: 'Z Image Turbo',
    href: '/image/z-image-turbo',
    badges: [{ text: '新功能', color: 'green' }],
  },
  { icon: Eye, label: 'Seedream AI 图像', href: '/image/seedream-ai' },
  { icon: Wand2, label: 'Grok 图像制作', href: '/image/grok-imagine' },
  { icon: Wand2, label: 'Qwen 图像编辑', href: '/image/qwen-image-edit' },
  {
    icon: Zap,
    label: 'Flux AI 图像生成器',
    href: '/image/flux-ai-image-generator',
  },
];

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

interface SidebarProps {
  open?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
  topOffset?: number;
}

export default function Sidebar({ open, isMobile, onClose, topOffset = 64 }: SidebarProps) {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return normalizedPath === item.href || normalizedPath === item.href + '/';
    }
    return normalizedPath.startsWith(item.href);
  };

  const isFluxActive = normalizedPath.startsWith('/image/flux-ai-image-generator');

  // Only close sidebar on mobile when a nav link is clicked
  const handleNavClick = () => {
    if (isMobile) onClose?.();
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={handleNavClick}
        />
      )}

      {/* Sidebar */}
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
              AI 生成
            </span>
          </div>

          {aiGenNav.map((item) => (
            <NavItemRow key={item.href + item.label} item={item} isActive={false} onClick={handleNavClick} />
          ))}

          <div className="pt-3 pb-1 px-1">
            <div className="h-px bg-white/[0.06] mb-2" />
            <span className="px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
              模型
            </span>
          </div>

          {modelsNav.map((item) => (
            <NavItemRow
              key={item.label}
              item={item}
              isActive={item.label === 'Flux AI 图像生成器' ? isFluxActive : isActive(item)}
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
            <span className="flex-1 text-sm text-white/80 font-medium text-left">升级套餐</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              5折优惠
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
