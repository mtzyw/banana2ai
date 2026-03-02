'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Check, X, Star, Info } from 'lucide-react';
import { useScrollFade } from '@/shared/hooks/use-scroll-fade';

type BillingPeriod = 'monthly' | 'annual';

/* ── Gradient pill tag component ── */
function ModelTag({ children }: { children: string }) {
  return (
    <span
      className="inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium transition-all duration-200 hover:shadow-[0_0_8px_rgba(255,204,51,0.4)] sm:px-2 sm:text-xs"
      style={{
        border: '1.5px solid transparent',
        backgroundImage: 'linear-gradient(#13151f, #13151f), linear-gradient(to right, #ffcc33, #ff9900)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <span className="gradient-glow-text whitespace-nowrap">{children}</span>
    </span>
  );
}

/* ── Feature with optional sub-items and model tags ── */
interface Feature {
  text: string;
  included: boolean;
  highlight?: string; // number to highlight in gold
  tags?: string[];
  subItems?: { text: string; highlight?: string }[];
}

interface Plan {
  name: string;
  price: { monthly: number; annual: number };
  originalPrice: { monthly: number | null; annual: number | null };
  description: string;
  badge: string | null;
  highlight: boolean;
  cta: string;
  yearlyTotal?: number;
  discount?: string;
  saveAmount?: number;
  features: Feature[];
}



export default function PricingClient() {
  const t = useTranslations('banana.pricing');
  const locale = useLocale();
  const isZh = locale === 'zh';

  const FAQS = [
  { question: isZh ? '如何更改我的订阅计划？' : 'How do I change my subscription plan?', answer: isZh ? '你可以随时在账户设置中升级或降级订阅计划。升级立即生效，降级将在下个计费周期生效。' : 'You can upgrade or downgrade anytime in account settings. Upgrades take effect immediately, downgrades apply next billing cycle.' },
  { question: isZh ? '未使用的积分会过期吗？' : 'Do unused credits expire?', answer: isZh ? '订阅积分每月重置，但永久积分不会过期。我们建议在计费周期内充分利用订阅积分。' : 'Subscription credits reset monthly, but permanent credits never expire.' },
  { question: isZh ? '可以随时取消订阅吗？' : 'Can I cancel anytime?', answer: isZh ? '是的，你可以随时取消订阅。取消后你仍可使用剩余的订阅期限，到期后不再续费。' : 'Yes, cancel anytime. You keep access until the end of your current billing period.' },
  { question: isZh ? '支持哪些支付方式？' : 'What payment methods are supported?', answer: isZh ? '支持信用卡（Visa、Mastercard、American Express）和 PayPal 支付。' : 'We accept Visa, Mastercard, American Express, and PayPal.' },
  { question: isZh ? '年付和月付有什么区别？' : "What's the difference between monthly and annual billing?", answer: isZh ? '年付可享受最高 50% 的折扣优惠，按年一次性扣费。月付按月扣费，灵活性更高。' : 'Annual billing saves up to 50%. Monthly billing offers more flexibility.' },
  { question: isZh ? '如果对服务不满意，可以退款吗？' : 'Can I get a refund?', answer: isZh ? '我们提供 7 天无理由退款保障。如有退款需求，请联系客服处理。' : 'We offer a 7-day money-back guarantee. Contact support for refund requests.' },
  { question: isZh ? '企业用户有专属方案吗？' : 'Do you offer enterprise plans?', answer: isZh ? '有的。如需企业定制方案，请通过邮件联系我们，我们会根据你的需求提供专属报价。' : 'Yes! Contact us via email for custom enterprise pricing.' },
  { question: isZh ? '免费版有哪些功能限制？' : 'What are the free plan limitations?', answer: isZh ? '免费版仅提供 10 次免费额度，不支持下载、私密生成等高级功能。注册后可立即免费体验。' : 'Free plan includes 10 credits. Downloads, private generation, and other premium features require a paid plan.' },
  ];


  const PLANS: Plan[] = [
  {
    name: 'Basic',
    price: { monthly: 16.6, annual: 8.3 },
    originalPrice: { monthly: null, annual: null },
    description: t('plans.0.description'),
    badge: null,
    highlight: false,
    cta: t('plans.1.cta'),
    yearlyTotal: 100,
    features: [
      { text: isZh ? '积分/年' : 'Credits/Year', included: true, highlight: '2,400' },
      {
        text: isZh ? '最多生成图片' : 'Max Images',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: isZh ? 'Nano Banana：最多 {n} 张图片' : 'Nano Banana: up to {n} images', highlight: '600' },
          { text: isZh ? 'Nano Banana Pro：最多 {n} 张图片' : 'Nano Banana Pro: up to {n} images', highlight: '240' },
        ],
      },
      {
        text: isZh ? '最多生成视频' : 'Max Videos',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: isZh ? 'Veo3 Basic：最多 {n} 个视频' : 'Veo3 Basic: up to {n} videos', highlight: '240' },
          { text: isZh ? 'Veo3.1 Basic：最多 {n} 个视频' : 'Veo3.1 Basic: up to {n} videos', highlight: '120' },
          { text: isZh ? 'Seedance 1.5 Pro：最多 {n} 个视频' : 'Seedance 1.5 Pro: up to {n} videos', highlight: '75' },
          { text: isZh ? 'Sora 2 Pro Video：最多 {n} 个视频' : 'Sora 2 Pro Video: up to {n} videos', highlight: '16' },
          { text: isZh ? 'Sora 2 Pro Storyboard：最多 {n} 个视频' : 'Sora 2 Pro Storyboard: up to {n} videos', highlight: '16' },
        ],
      },
      { text: isZh ? '下载结果' : 'Download Results', included: true },
      { text: isZh ? '高清、无水印下载' : 'HD, Watermark-free Downloads', included: true },
      { text: isZh ? '私密生成' : 'Private Generation', included: true },
      { text: isZh ? '无广告体验' : 'Ad-free Experience', included: true },
      { text: isZh ? '无限存储空间' : 'Unlimited Storage', included: true },
    ],
  },
  {
    name: 'Pro',
    price: { monthly: 49.9, annual: 30.0 },
    originalPrice: { monthly: null, annual: 49.9 },
    description: isZh ? '适合专业创作团队' : 'For professional creative teams',
    badge: isZh ? '热门' : 'Popular',
    highlight: false,
    cta: t('plans.1.cta'),
    yearlyTotal: 360,
    discount: '40% OFF',
    saveAmount: 238.8,
    features: [
      { text: isZh ? '积分/年' : 'Credits/Year', included: true, highlight: '21,600' },
      {
        text: isZh ? '最多生成图片' : 'Max Images',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: isZh ? 'Nano Banana：最多 {n} 张图片' : 'Nano Banana: up to {n} images', highlight: '5,400' },
          { text: isZh ? 'Nano Banana Pro：最多 {n} 张图片' : 'Nano Banana Pro: up to {n} images', highlight: '2,160' },
        ],
      },
      {
        text: isZh ? '最多生成视频' : 'Max Videos',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: isZh ? 'Veo3 Basic：最多 {n} 个视频' : 'Veo3 Basic: up to {n} videos', highlight: '2,160' },
          { text: isZh ? 'Veo3.1 Basic：最多 {n} 个视频' : 'Veo3.1 Basic: up to {n} videos', highlight: '1,080' },
          { text: isZh ? 'Seedance 1.5 Pro：最多 {n} 个视频' : 'Seedance 1.5 Pro: up to {n} videos', highlight: '675' },
          { text: isZh ? 'Sora 2 Pro Video：最多 {n} 个视频' : 'Sora 2 Pro Video: up to {n} videos', highlight: '144' },
          { text: isZh ? 'Sora 2 Pro Storyboard：最多 {n} 个视频' : 'Sora 2 Pro Storyboard: up to {n} videos', highlight: '144' },
        ],
      },
      { text: isZh ? '下载结果' : 'Download Results', included: true },
      { text: isZh ? '高清、无水印下载' : 'HD, Watermark-free Downloads', included: true },
      { text: isZh ? '私密生成' : 'Private Generation', included: true },
      { text: isZh ? '无广告体验' : 'Ad-free Experience', included: true },
      { text: isZh ? '无限存储空间' : 'Unlimited Storage', included: true },
    ],
  },
  {
    name: 'Ultra',
    price: { monthly: 99.9, annual: 49.9 },
    originalPrice: { monthly: null, annual: 99.9 },
    description: isZh ? '适合高频专业用户' : 'For power users',
    badge: isZh ? '超值之选' : 'Best Value',
    highlight: true,
    cta: t('plans.1.cta'),
    yearlyTotal: 599,
    discount: '50% OFF',
    saveAmount: 599.8,
    features: [
      { text: isZh ? '积分/年' : 'Credits/Year', included: true, highlight: '48,000' },
      {
        text: isZh ? '最多生成图片' : 'Max Images',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: isZh ? 'Nano Banana：最多 {n} 张图片' : 'Nano Banana: up to {n} images', highlight: '12,000' },
          { text: isZh ? 'Nano Banana Pro：最多 {n} 张图片' : 'Nano Banana Pro: up to {n} images', highlight: '4,800' },
        ],
      },
      {
        text: isZh ? '最多生成视频' : 'Max Videos',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: isZh ? 'Veo3 Basic：最多 {n} 个视频' : 'Veo3 Basic: up to {n} videos', highlight: '4,800' },
          { text: isZh ? 'Veo3.1 Basic：最多 {n} 个视频' : 'Veo3.1 Basic: up to {n} videos', highlight: '2,400' },
          { text: isZh ? 'Seedance 1.5 Pro：最多 {n} 个视频' : 'Seedance 1.5 Pro: up to {n} videos', highlight: '1,500' },
          { text: isZh ? 'Sora 2 Pro Video：最多 {n} 个视频' : 'Sora 2 Pro Video: up to {n} videos', highlight: '320' },
          { text: isZh ? 'Sora 2 Pro Storyboard：最多 {n} 个视频' : 'Sora 2 Pro Storyboard: up to {n} videos', highlight: '320' },
        ],
      },
      { text: isZh ? '下载结果' : 'Download Results', included: true },
      { text: isZh ? '高清、无水印下载' : 'HD, Watermark-free Downloads', included: true },
      { text: isZh ? '私密生成' : 'Private Generation', included: true },
      { text: isZh ? '无广告体验' : 'Ad-free Experience', included: true },
      { text: isZh ? '无限存储空间' : 'Unlimited Storage', included: true },
    ],
  },
  {
    name: isZh ? '免费计划' : 'Free Plan',
    price: { monthly: 0, annual: 0 },
    originalPrice: { monthly: null, annual: null },
    description: isZh ? '适合入门体验' : 'Get started for free',
    badge: null,
    highlight: false,
    cta: isZh ? '登录以访问' : 'Sign In to Access',
    features: [
      { text: isZh ? '登录即享 10 次免费额度' : '10 Free Credits on Sign Up', included: true },
      {
        text: isZh ? '最多生成 2 张图片' : 'Up to 2 Images',
        included: true,
        tags: ['Banana'],
      },
      {
        text: isZh ? '最多生成 1 个视频' : 'Up to 1 Video',
        included: true,
        tags: ['Veo 3', 'Sora 2'],
      },
      { text: isZh ? '下载结果' : 'Download Results', included: false },
      { text: isZh ? '高清、无水印下载' : 'HD, Watermark-free Downloads', included: false },
      { text: isZh ? '私密生成' : 'Private Generation', included: false },
      { text: isZh ? '无广告体验' : 'Ad-free Experience', included: false },
      { text: isZh ? '无限存储空间' : 'Unlimited Storage', included: false },
    ],
  },
  ];

  const [billing, setBilling] = useState<BillingPeriod>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const fadeRef = useScrollFade();

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white pb-20">
      {/* Header */}
      <section className="mx-auto max-w-[1920px] px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="gradient-glow-text mb-4 text-4xl font-bold tracking-tight scroll-fade-in sm:text-5xl lg:text-6xl">
          {isZh ? 'Banana Pro AI 的定价方案' : 'Banana Pro AI Pricing'}
        </h1>

        {/* Billing toggle */}
        <div className="mt-10 mb-12 flex items-center justify-center gap-4 scroll-fade-in stagger-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-full px-8 py-3 font-semibold transition-all duration-200 ${
              billing === 'monthly'
                ? 'scale-105 transform text-black shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
            style={billing === 'monthly' ? {
              background: 'linear-gradient(to right, #ffcc33, #ff9900)',
            } : undefined}
          >
            {isZh ? "按月计费" : "Monthly"}
          </button>

          <div className="relative">
            <div
              className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-black/90 px-1.5 py-0.5 text-[10px] font-bold shadow-[0_0_12px_rgba(255,204,51,0.5)] sm:px-2 sm:text-xs"
              style={{
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #ffcc33, #ff9900)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
              }}
            >
              <span className="gradient-glow-text">50% OFF</span>
            </div>
            <button
              onClick={() => setBilling('annual')}
              className={`rounded-full px-8 py-3 font-semibold transition-all duration-200 ${
                billing === 'annual'
                  ? 'scale-105 transform text-black shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
              style={billing === 'annual' ? {
                background: 'linear-gradient(to right, #ffcc33, #ff9900)',
              } : undefined}
            >
              {isZh ? "按年计费" : "Annual"}
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {PLANS.map((plan, i) => (
            <div key={i} className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <PlanCard plan={plan} billing={billing} isZh={isZh} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-sm text-white/50 scroll-fade-in">
          {isZh ? '所有付费计划均享有：无广告体验 · 无限存储 · 私密生成 · 高清无水印下载 · 优先生成队列' : 'All paid plans include: Ad-free · Unlimited storage · Private generation · HD watermark-free downloads · Priority queue'}
        </p>
        <p className="mt-2 text-sm text-white/30 scroll-fade-in stagger-1">
          {isZh ? '有问题？联系我们：' : 'Questions? Contact us:'}
          <a href="mailto:hi@banana2ai.net" className="ml-1 text-[#ffcc33] hover:underline">
            hi@banana2ai.net
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-8">
        <h2 className="gradient-glow-text mb-10 text-center text-2xl font-bold scroll-fade-in md:text-3xl">
          {isZh ? "常见问题" : "FAQ"}
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── FAQ Accordion ── */
function FAQItem({ faq, open, onToggle }: { faq: { question: string; answer: string }; open: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="overflow-hidden rounded-xl border border-[#363b4e] bg-[#13151f] transition-colors duration-200 hover:border-[#ffcc33]/30">
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors ${open ? 'text-[#ffcc33]' : 'text-white hover:text-[#ffcc33]'}`}
      >
        {faq.question}
        <span className="ml-4 flex-shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>
      <div ref={contentRef} className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: open ? (contentRef.current ? contentRef.current.scrollHeight + 'px' : '300px') : '0px', opacity: open ? 1 : 0 }}>
        <div className="px-5 pb-4 text-sm leading-relaxed text-white/60">{faq.answer}</div>
      </div>
    </div>
  );
}

/* ── Plan Card ── */
function PlanCard({ plan, billing, isZh }: { plan: Plan; billing: BillingPeriod; isZh: boolean }) {
  const price = plan.price[billing];
  const originalPrice = plan.originalPrice[billing];
  const isFree = price === 0;

  return (
    <div
      className={`relative flex flex-col rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        plan.highlight
          ? 'border-2 border-[#ffcc33]/60 bg-[#13151f] shadow-[0_0_40px_rgba(255,204,51,0.15)]'
          : isFree
          ? 'border-2 border-dashed border-[#363b4e] bg-[#13151f]'
          : 'border border-[#363b4e] bg-[#13151f] hover:border-[#ffcc33]/40'
      }`}
    >
      {/* Discount badge (top-right) */}
      {billing === 'annual' && plan.saveAmount && (
        <div
          className="absolute right-2 top-2 z-10 rounded-full bg-black/90 px-3 py-1 text-sm font-semibold shadow-[0_0_12px_rgba(255,204,51,0.5)] md:-right-3 md:-top-3"
          style={{
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(black, black), linear-gradient(to right, #ffcc33, #ff9900)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <span className="gradient-glow-text">{plan.discount} - Save ${plan.saveAmount}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Badge */}
        {plan.badge ? (
          <div className="badge-gradient mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold shadow-md">
            <Star className="mr-1 h-3.5 w-3.5" fill="currentColor" />
            {plan.badge}
          </div>
        ) : (
          <div className="mb-0 h-7" />
        )}

        {/* Price */}
        {isFree ? (
          <div className="mb-4">
            <h3 className="mb-1 text-xl font-bold text-white">{plan.name}</h3>
            <p className="mb-4 text-sm text-white/50">{plan.description}</p>
            <div className="gradient-glow-text text-4xl font-bold tracking-tight">{isZh ? '免费' : 'Free'}</div>
          </div>
        ) : (
          <div className="mb-4">
            <h3 className="mb-1 text-xl font-bold text-white">{plan.name}</h3>
            <p className="mb-4 text-sm text-white/50">{plan.description}</p>
            <div className="flex items-baseline gap-1">
              <span className="gradient-glow-text text-4xl font-bold tracking-tight">${price}</span>
              <span className="text-xl text-white/40">{isZh ? '/月' : '/mo'}</span>
            </div>
            {originalPrice && (
              <div className="mt-1 text-sm text-white/30">
                <span className="line-through">${originalPrice}</span>
                <span className="ml-1 text-xs text-white/30">{isZh ? '/月' : '/mo'}</span>
              </div>
            )}
            {billing === 'annual' && plan.yearlyTotal && (
              <div className="mt-1 text-sm text-white/40">${plan.yearlyTotal}{isZh ? '/年 按年计费' : '/yr billed annually'}</div>
            )}
          </div>
        )}

        {/* CTA */}
        {isFree ? (
          <Link
            href="#"
            className="mb-6 block w-full rounded-xl border border-[#ffcc33]/30 py-3 text-center text-sm font-bold text-[#ffcc33] transition-all duration-200 hover:bg-[#ffcc33]/10"
          >
            {plan.cta} →
          </Link>
        ) : (
          <a className="gradient-button mb-6 block w-full cursor-pointer rounded-xl px-6 py-3 text-center text-lg font-semibold transition-all duration-200">
            {plan.cta}
          </a>
        )}

        {/* Features */}
        <ul className="space-y-3">
          {plan.features.map((f, i) => (
            <li key={i}>
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 flex-shrink-0 ${f.included ? 'text-[#ffcc33]' : 'text-white/20'}`}>
                  {f.included ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-sm ${f.included ? 'text-white/80' : 'text-white/30 line-through'}`}>
                      {f.highlight ? (
                        <>
                          <span className="font-semibold text-[#ffcc33]">{f.highlight}</span>{' '}
                          {f.text}
                        </>
                      ) : (
                        f.text
                      )}
                    </span>
                    {f.tags?.map((tag) => <ModelTag key={tag}>{tag}</ModelTag>)}
                  </div>
                  {/* Sub-items */}
                  {f.subItems && (
                    <div className="mt-1.5 space-y-1 pl-0">
                      {f.subItems.map((sub, j) => (
                        <div key={j} className="ml-2 text-sm text-white/60">
                          • {sub.text.replace('{n}', '')}
                          {sub.highlight && (
                            <span className="font-semibold text-[#ffcc33]">{sub.highlight}</span>
                          )}
                          {sub.text.includes('{n}') ? sub.text.split('{n}')[1] : ''}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
