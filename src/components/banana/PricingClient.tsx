'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Check, X, Star } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

type BillingPeriod = 'monthly' | 'annual';

const PLANS = [
  {
    name: '免费计划',
    price: { monthly: 0, annual: 0 },
    originalPrice: { monthly: null, annual: null },
    description: '适合入门体验',
    badge: null,
    highlight: false,
    cta: '登录以访问',
    features: [
      { text: '登录即享 10 次免费额度', included: true },
      { text: '最多生成 2 张图片', included: true },
      { text: '最多生成 1 个视频', included: true },
      { text: '下载结果', included: false },
      { text: '高清、无水印下载', included: false },
      { text: '私密生成', included: false },
      { text: '无广告体验', included: false },
      { text: '无限存储空间', included: false },
    ],
  },
  {
    name: 'Basic',
    price: { monthly: 16.6, annual: 8.3 },
    originalPrice: { monthly: null, annual: null },
    description: '适合个人创作者',
    badge: null,
    highlight: false,
    cta: '立即订阅',
    yearlyTotal: 100,
    credits: { monthly: 200, annual: 2400 },
    images: { monthly: 50, annual: 600 },
    videos: { monthly: 20, annual: 240 },
    features: [
      { text: '2,400 积分/年', included: true },
      { text: '最多生成 600 张图片', included: true },
      { text: '最多生成 240 个视频', included: true },
      { text: '下载结果', included: true },
      { text: '高清、无水印下载', included: true },
      { text: '私密生成', included: true },
      { text: '无广告体验', included: true },
      { text: '无限存储空间', included: true },
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 49.9, annual: 30.0 },
    originalPrice: { monthly: null, annual: 49.9 },
    description: '适合专业创作团队',
    badge: '热门',
    highlight: false,
    cta: '立即订阅',
    yearlyTotal: 360,
    discount: '40% OFF',
    saveAmount: { annual: 239 },
    credits: { monthly: 1800, annual: 21600 },
    images: { monthly: 450, annual: 5400 },
    videos: { monthly: 180, annual: 2160 },
    features: [
      { text: '21,600 积分/年', included: true },
      { text: '最多生成 5,400 张图片', included: true },
      { text: '最多生成 2,160 个视频', included: true },
      { text: '下载结果', included: true },
      { text: '高清、无水印下载', included: true },
      { text: '私密生成', included: true },
      { text: '无广告体验', included: true },
      { text: '无限存储空间', included: true },
    ],
  },
  {
    name: 'Ultra',
    price: { monthly: 99.9, annual: 49.9 },
    originalPrice: { monthly: null, annual: 99.9 },
    description: '适合高频专业用户',
    badge: '超值之选',
    highlight: true,
    cta: '立即订阅',
    yearlyTotal: 599,
    discount: '50% OFF',
    saveAmount: { annual: 599 },
    credits: { monthly: 4000, annual: 48000 },
    images: { monthly: 1000, annual: 12000 },
    videos: { monthly: 400, annual: 4800 },
    features: [
      { text: '48,000 积分/年', included: true },
      { text: '最多生成 12,000 张图片', included: true },
      { text: '最多生成 4,800 个视频', included: true },
      { text: '下载结果', included: true },
      { text: '高清、无水印下载', included: true },
      { text: '私密生成', included: true },
      { text: '无广告体验', included: true },
      { text: '无限存储空间', included: true },
    ],
  },
];

const FAQS = [
  {
    question: '如何更改我的订阅计划？',
    answer: '你可以随时在账户设置中升级或降级订阅计划。升级立即生效，降级将在下个计费周期生效。',
  },
  {
    question: '未使用的积分会过期吗？',
    answer: '订阅积分每月重置，但永久积分不会过期。我们建议在计费周期内充分利用订阅积分。',
  },
  {
    question: '可以随时取消订阅吗？',
    answer: '是的，你可以随时取消订阅。取消后你仍可使用剩余的订阅期限，到期后不再续费。',
  },
  {
    question: '支持哪些支付方式？',
    answer: '支持信用卡（Visa、Mastercard、American Express）和 PayPal 支付。',
  },
  {
    question: '年付和月付有什么区别？',
    answer: '年付可享受最高 50% 的折扣优惠，按年一次性扣费。月付按月扣费，灵活性更高。',
  },
  {
    question: '如果对服务不满意，可以退款吗？',
    answer: '我们提供 7 天无理由退款保障。如有退款需求，请联系客服处理。',
  },
  {
    question: '企业用户有专属方案吗？',
    answer: '有的。如需企业定制方案，请通过邮件联系我们，我们会根据你的需求提供专属报价。',
  },
  {
    question: '免费版有哪些功能限制？',
    answer: '免费版仅提供 10 次免费额度，不支持下载、私密生成等高级功能。注册后可立即免费体验。',
  },
];

export default function PricingClient() {
  const [billing, setBilling] = useState<BillingPeriod>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const fadeRef = useScrollFade();

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 scroll-fade-in gradient-glow-text">
          Banana Pro AI 的定价方案
        </h1>
        <p className="text-white/60 mb-10 text-lg scroll-fade-in stagger-1">选择适合你的方案，随时可以升级或降级</p>

        {/* Billing toggle with slider indicator */}
        <div className="inline-flex items-center bg-[#1c2030] rounded-full p-1.5 border border-[#363b4e] relative scroll-fade-in stagger-2">
          {/* Slider background */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white/10 transition-all duration-300"
            style={{
              left: billing === 'monthly' ? '6px' : '50%',
              width: 'calc(50% - 6px)',
            }}
          />
          <button
            onClick={() => setBilling('monthly')}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              billing === 'monthly' ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            按月计费
          </button>
          <div className="relative z-10">
            {billing === 'annual' && (
              <span className="absolute -top-7 -right-2 bg-black border-2 border-[#ffcc33] text-[#ffcc33] text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                50% OFF
              </span>
            )}
            <button
              onClick={() => setBilling('annual')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                billing === 'annual' ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              按年计费
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {PLANS.map((plan, i) => (
            <div
              key={i}
              className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}
              style={{ ...(plan.highlight ? { transform: 'scale(1.03)' } : {}) }}
            >
              <PlanCard plan={plan} billing={billing} />
            </div>
          ))}
        </div>
      </section>

      {/* Features comparison note */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-white/50 text-sm scroll-fade-in">
          所有付费计划均享有：无广告体验 · 无限存储 · 私密生成 · 高清无水印下载 · 优先生成队列
        </p>
        <p className="text-white/30 text-sm mt-2 scroll-fade-in stagger-1">
          有问题？联系我们：
          <a href="mailto:support@bananaproai.com" className="text-[#ffcc33] hover:underline ml-1">
            support@bananaproai.com
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 scroll-fade-in gradient-glow-text">
          常见问题
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function FAQItem({
  faq,
  open,
  onToggle,
}: {
  faq: { question: string; answer: string };
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#13151f] border border-[#363b4e] rounded-xl overflow-hidden transition-colors duration-200 hover:border-[#ffcc33]/30">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-left transition-colors ${
          open ? 'text-[#ffcc33]' : 'text-white hover:text-[#ffcc33]'
        }`}
      >
        {faq.question}
        <span
          className="text-white/40 transition-transform duration-300 ml-4 flex-shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: open ? (contentRef.current ? contentRef.current.scrollHeight + 'px' : '300px') : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{faq.answer}</div>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  billing,
}: {
  plan: (typeof PLANS)[0];
  billing: BillingPeriod;
}) {
  const price = plan.price[billing];
  const originalPrice = plan.originalPrice[billing];
  const isHighlight = plan.highlight;
  const saveAmt = billing === 'annual' ? (plan as any).saveAmount?.annual : null;

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isHighlight
          ? 'border-2 border-[#ffcc33]/60 bg-[#13151f] shadow-[0_0_40px_rgba(255,204,51,0.15)]'
          : plan.name === '免费计划'
          ? 'border-2 border-dashed border-[#363b4e] bg-[#13151f] hover:border-[#363b4e]/80'
          : 'border border-[#363b4e] bg-[#13151f] hover:border-[#ffcc33]/40'
      }`}
    >
      {/* Discount badge */}
      {billing === 'annual' && saveAmt && (
        <div className="absolute -top-3 -right-3 z-10 bg-black border-2 border-[#ffcc33] rounded-full px-2.5 py-0.5 text-[11px] font-bold">
          <span className="bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
            {(plan as any).discount} · 省 ${saveAmt}
          </span>
        </div>
      )}
      {billing === 'monthly' && (plan as any).discount && (
        <div className="absolute -top-3 -right-3 z-10 bg-black border-2 border-[#ffcc33]/50 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
          <span className="text-[#ffcc33]/70">年付享 {(plan as any).discount}</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Plan badge */}
        {plan.badge && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black text-xs font-bold mb-4 w-fit">
            <Star className="w-3 h-3" fill="currentColor" />
            {plan.badge}
          </div>
        )}
        {!plan.badge && <div className="h-7 mb-0" />}

        {/* Plan name */}
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-white/50 mb-4">{plan.description}</p>

        {/* Price */}
        <div className="mb-4">
          {price === 0 ? (
            <div className="text-3xl font-bold gradient-glow-text">
              免费
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold gradient-glow-text">
                  ${price}
                </span>
                <span className="text-white/50">/月</span>
                {originalPrice && (
                  <span className="text-sm text-white/30 line-through">${originalPrice}/月</span>
                )}
              </div>
              {billing === 'annual' && (plan as any).yearlyTotal && (
                <div className="text-sm text-white/40 mt-1">
                  ${(plan as any).yearlyTotal}/年，按年计费
                </div>
              )}
            </>
          )}
        </div>

        {/* CTA */}
        <Link
          href={price === 0 ? '#' : '/zh/pricing/'}
          className={`w-full py-3 rounded-xl text-sm font-bold text-center transition-all duration-200 mb-6 block ${
            isHighlight
              ? 'highlight-button'
              : price > 0
              ? 'bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black hover:opacity-90'
              : 'border border-[#ffcc33]/30 text-[#ffcc33] hover:bg-[#ffcc33]/10'
          }`}
        >
          {plan.cta}
        </Link>

        {/* Feature list */}
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className={`flex-shrink-0 mt-0.5 ${feature.included ? 'text-[#ffcc33]' : 'text-white/20'}`}>
                {feature.included ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </div>
              <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30 line-through'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
