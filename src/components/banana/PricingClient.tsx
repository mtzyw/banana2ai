'use client';

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

const PLANS: Plan[] = [
  {
    name: 'Basic',
    price: { monthly: 16.6, annual: 8.3 },
    originalPrice: { monthly: null, annual: null },
    description: '适合个人创作者',
    badge: null,
    highlight: false,
    cta: '立即订阅',
    yearlyTotal: 100,
    features: [
      { text: '积分/年', included: true, highlight: '2,400' },
      {
        text: '最多生成图片',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: 'Nano Banana：最多 {n} 张图片', highlight: '600' },
          { text: 'Nano Banana Pro：最多 {n} 张图片', highlight: '240' },
        ],
      },
      {
        text: '最多生成视频',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: 'Veo3 Basic：最多 {n} 个视频', highlight: '240' },
          { text: 'Veo3.1 Basic：最多 {n} 个视频', highlight: '120' },
          { text: 'Seedance 1.5 Pro：最多 {n} 个视频', highlight: '75' },
          { text: 'Sora 2 Pro Video：最多 {n} 个视频', highlight: '16' },
          { text: 'Sora 2 Pro Storyboard：最多 {n} 个视频', highlight: '16' },
        ],
      },
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
    saveAmount: 238.8,
    features: [
      { text: '积分/年', included: true, highlight: '21,600' },
      {
        text: '最多生成图片',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: 'Nano Banana：最多 {n} 张图片', highlight: '5,400' },
          { text: 'Nano Banana Pro：最多 {n} 张图片', highlight: '2,160' },
        ],
      },
      {
        text: '最多生成视频',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: 'Veo3 Basic：最多 {n} 个视频', highlight: '2,160' },
          { text: 'Veo3.1 Basic：最多 {n} 个视频', highlight: '1,080' },
          { text: 'Seedance 1.5 Pro：最多 {n} 个视频', highlight: '675' },
          { text: 'Sora 2 Pro Video：最多 {n} 个视频', highlight: '144' },
          { text: 'Sora 2 Pro Storyboard：最多 {n} 个视频', highlight: '144' },
        ],
      },
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
    saveAmount: 599.8,
    features: [
      { text: '积分/年', included: true, highlight: '48,000' },
      {
        text: '最多生成图片',
        included: true,
        tags: ['Banana Pro'],
        subItems: [
          { text: 'Nano Banana：最多 {n} 张图片', highlight: '12,000' },
          { text: 'Nano Banana Pro：最多 {n} 张图片', highlight: '4,800' },
        ],
      },
      {
        text: '最多生成视频',
        included: true,
        tags: ['Veo 3.1', 'Sora 2'],
        subItems: [
          { text: 'Veo3 Basic：最多 {n} 个视频', highlight: '4,800' },
          { text: 'Veo3.1 Basic：最多 {n} 个视频', highlight: '2,400' },
          { text: 'Seedance 1.5 Pro：最多 {n} 个视频', highlight: '1,500' },
          { text: 'Sora 2 Pro Video：最多 {n} 个视频', highlight: '320' },
          { text: 'Sora 2 Pro Storyboard：最多 {n} 个视频', highlight: '320' },
        ],
      },
      { text: '下载结果', included: true },
      { text: '高清、无水印下载', included: true },
      { text: '私密生成', included: true },
      { text: '无广告体验', included: true },
      { text: '无限存储空间', included: true },
    ],
  },
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
      {
        text: '最多生成 2 张图片',
        included: true,
        tags: ['Banana'],
      },
      {
        text: '最多生成 1 个视频',
        included: true,
        tags: ['Veo 3', 'Sora 2'],
      },
      { text: '下载结果', included: false },
      { text: '高清、无水印下载', included: false },
      { text: '私密生成', included: false },
      { text: '无广告体验', included: false },
      { text: '无限存储空间', included: false },
    ],
  },
];

const FAQS = [
  { question: '如何更改我的订阅计划？', answer: '你可以随时在账户设置中升级或降级订阅计划。升级立即生效，降级将在下个计费周期生效。' },
  { question: '未使用的积分会过期吗？', answer: '订阅积分每月重置，但永久积分不会过期。我们建议在计费周期内充分利用订阅积分。' },
  { question: '可以随时取消订阅吗？', answer: '是的，你可以随时取消订阅。取消后你仍可使用剩余的订阅期限，到期后不再续费。' },
  { question: '支持哪些支付方式？', answer: '支持信用卡（Visa、Mastercard、American Express）和 PayPal 支付。' },
  { question: '年付和月付有什么区别？', answer: '年付可享受最高 50% 的折扣优惠，按年一次性扣费。月付按月扣费，灵活性更高。' },
  { question: '如果对服务不满意，可以退款吗？', answer: '我们提供 7 天无理由退款保障。如有退款需求，请联系客服处理。' },
  { question: '企业用户有专属方案吗？', answer: '有的。如需企业定制方案，请通过邮件联系我们，我们会根据你的需求提供专属报价。' },
  { question: '免费版有哪些功能限制？', answer: '免费版仅提供 10 次免费额度，不支持下载、私密生成等高级功能。注册后可立即免费体验。' },
];

export default function PricingClient() {
  const [billing, setBilling] = useState<BillingPeriod>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const fadeRef = useScrollFade();

  return (
    <div ref={fadeRef} className="min-h-screen bg-[#0f1117] text-white pb-20">
      {/* Header */}
      <section className="mx-auto max-w-[1920px] px-4 py-12 text-center sm:px-6 lg:px-8">
        <h1 className="gradient-glow-text mb-4 text-4xl font-bold tracking-tight scroll-fade-in sm:text-5xl lg:text-6xl">
          Banana Pro AI 的定价方案
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
            按月计费
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
              按年计费
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
          {PLANS.map((plan, i) => (
            <div key={i} className={`scroll-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <PlanCard plan={plan} billing={billing} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-sm text-white/50 scroll-fade-in">
          所有付费计划均享有：无广告体验 · 无限存储 · 私密生成 · 高清无水印下载 · 优先生成队列
        </p>
        <p className="mt-2 text-sm text-white/30 scroll-fade-in stagger-1">
          有问题？联系我们：
          <a href="mailto:hi@banana2ai.net" className="ml-1 text-[#ffcc33] hover:underline">
            hi@banana2ai.net
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-8">
        <h2 className="gradient-glow-text mb-10 text-center text-2xl font-bold scroll-fade-in md:text-3xl">
          常见问题
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
function PlanCard({ plan, billing }: { plan: Plan; billing: BillingPeriod }) {
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
            <div className="gradient-glow-text text-4xl font-bold tracking-tight">免费</div>
          </div>
        ) : (
          <div className="mb-4">
            <h3 className="mb-1 text-xl font-bold text-white">{plan.name}</h3>
            <p className="mb-4 text-sm text-white/50">{plan.description}</p>
            <div className="flex items-baseline gap-1">
              <span className="gradient-glow-text text-4xl font-bold tracking-tight">${price}</span>
              <span className="text-xl text-white/40">/月</span>
            </div>
            {originalPrice && (
              <div className="mt-1 text-sm text-white/30">
                <span className="line-through">${originalPrice}</span>
                <span className="ml-1 text-xs text-white/30">/月</span>
              </div>
            )}
            {billing === 'annual' && plan.yearlyTotal && (
              <div className="mt-1 text-sm text-white/40">${plan.yearlyTotal}/年 按年计费</div>
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
