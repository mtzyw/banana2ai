'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { X, Star, Crown, Check } from 'lucide-react';

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

const plans = {
  monthly: [
    {
      name: 'Basic',
      product_id: 'basic-monthly',
      price: '$9.9',
      originalPrice: '$16.6',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '2,400',
      badge: null,
      icon: null,
      label: null,
      highlighted: false,
      features: {
        en: [
          'Up to 2,400 images',
          'Up to 240 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Email support',
        ],
        zh: [
          '最多 2,400 张图片',
          '最多 240 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '邮件支持',
        ],
      },
    },
    {
      name: 'Pro',
      product_id: 'pro-monthly',
      price: '$29.9',
      originalPrice: '$49.9',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '21,600',
      badge: '50% OFF',
      icon: 'star' as const,
      label: { en: 'Best Value', zh: '超值之选' },
      highlighted: true,
      features: {
        en: [
          'Up to 21,600 images',
          'Up to 2,160 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Priority support',
        ],
        zh: [
          '最多 21,600 张图片',
          '最多 2,160 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '优先支持',
        ],
      },
    },
    {
      name: 'Mega',
      product_id: 'mega-monthly',
      price: '$59.9',
      originalPrice: '$99.9',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '48,000',
      badge: '40% OFF',
      icon: 'crown' as const,
      label: { en: 'Popular', zh: '热门' },
      highlighted: false,
      features: {
        en: [
          'Up to 48,000 images',
          'Up to 4,800 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Dedicated support',
        ],
        zh: [
          '最多 48,000 张图片',
          '最多 4,800 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '专属支持',
        ],
      },
    },
  ],
  yearly: [
    {
      name: 'Basic',
      product_id: 'basic-yearly',
      price: '$8.3',
      originalPrice: '$9.9',
      yearlyTotal: '$100',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '2,400',
      badge: null,
      icon: null,
      label: null,
      highlighted: false,
      features: {
        en: [
          'Up to 2,400 images',
          'Up to 240 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Email support',
        ],
        zh: [
          '最多 2,400 张图片',
          '最多 240 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '邮件支持',
        ],
      },
    },
    {
      name: 'Pro',
      product_id: 'pro-yearly',
      price: '$30',
      originalPrice: '$49.9',
      yearlyTotal: '$360',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '21,600',
      badge: '50% OFF',
      icon: 'star' as const,
      label: { en: 'Best Value', zh: '超值之选' },
      highlighted: true,
      features: {
        en: [
          'Up to 21,600 images',
          'Up to 2,160 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Priority support',
        ],
        zh: [
          '最多 21,600 张图片',
          '最多 2,160 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '优先支持',
        ],
      },
    },
    {
      name: 'Mega',
      product_id: 'mega-yearly',
      price: '$49.9',
      originalPrice: '$99.9',
      yearlyTotal: '$599',
      unit: { en: '/ month', zh: '/ 月' },
      credits: '48,000',
      badge: '40% OFF',
      icon: 'crown' as const,
      label: { en: 'Popular', zh: '热门' },
      highlighted: false,
      features: {
        en: [
          'Up to 48,000 images',
          'Up to 4,800 videos',
          'HD downloads',
          'No watermark',
          'Private generation',
          'Dedicated support',
        ],
        zh: [
          '最多 48,000 张图片',
          '最多 4,800 个视频',
          '高清下载',
          '无水印',
          '私密生成',
          '专属支持',
        ],
      },
    },
  ],
};

export default function PricingModal({ open, onClose }: PricingModalProps) {
  const locale = useLocale();
  const isZh = locale === 'zh';
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!open) return null;

  const currentPlans = plans[billing];

  const handleSubscribe = async (productId: string) => {
    setLoadingId(productId);
    try {
      const res = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, locale }),
      });
      const data = await res.json();
      if (data.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl;
      } else if (data.data?.url) {
        window.location.href = data.data.url;
      }
    } catch {
      // silently fail
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f1117] border border-[#363b4e] p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-center text-xl sm:text-2xl font-bold text-white mb-6">
          {isZh ? 'Banana Pro AI 的定价方案' : 'Banana Pro AI Pricing Plans'}
        </h2>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-1 mb-8">
          <div className="flex rounded-lg bg-[#1c2030] border border-[#363b4e] p-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                billing === 'monthly'
                  ? 'bg-white/10 text-white border border-[#363b4e]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {isZh ? '按月付费' : 'Monthly'}
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                billing === 'yearly'
                  ? 'bg-white/10 text-white border border-[#363b4e]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {isZh ? '按年付费' : 'Yearly'}
              <span className="px-1.5 py-0.5 rounded-full bg-[#f8d24b] text-black text-[10px] font-bold">
                50% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentPlans.map((plan) => (
            <div
              key={plan.product_id}
              className={`relative rounded-xl p-5 flex flex-col ${
                plan.highlighted
                  ? 'bg-[#13151f] border-2 border-[#ffcc33]'
                  : 'bg-[#13151f] border border-[#363b4e]'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#f8d24b] text-black text-xs font-bold">
                  {plan.badge}
                </span>
              )}

              {/* Plan label */}
              <div className="flex items-center gap-1.5 mb-3">
                {plan.icon === 'star' && <Star className="w-4 h-4 text-[#f8d24b]" />}
                {plan.icon === 'crown' && <Crown className="w-4 h-4 text-[#f8d24b]" />}
                <span className="text-sm font-semibold text-white">
                  {plan.name}
                </span>
                {plan.label && (
                  <span className="ml-auto text-xs text-[#f8d24b] font-medium">
                    {isZh ? plan.label.zh : plan.label.en}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/50 ml-1">
                  {isZh ? plan.unit.zh : plan.unit.en}
                </span>
              </div>
              {plan.originalPrice && (
                <div className="text-xs text-white/40 line-through mb-1">
                  {plan.originalPrice} {isZh ? plan.unit.zh : plan.unit.en}
                </div>
              )}
              {'yearlyTotal' in plan && plan.yearlyTotal && (
                <div className="text-xs text-white/50 mb-3">
                  {plan.yearlyTotal} {isZh ? '/ 年' : '/ year'}
                </div>
              )}
              {!('yearlyTotal' in plan && plan.yearlyTotal) && <div className="mb-3" />}

              {/* Credits */}
              <div className="text-sm text-[#f8d24b] font-medium mb-4">
                {plan.credits} {isZh ? '积分 / 月' : 'credits / mo'}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-5 flex-1">
                {(isZh ? plan.features.zh : plan.features.en).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-[#f8d24b] mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Subscribe button */}
              <button
                onClick={() => handleSubscribe(plan.product_id)}
                disabled={loadingId === plan.product_id}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#f8d24b] to-[#f0a030] text-black text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loadingId === plan.product_id
                  ? (isZh ? '处理中...' : 'Processing...')
                  : (isZh ? '立即订阅' : 'Subscribe Now')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
