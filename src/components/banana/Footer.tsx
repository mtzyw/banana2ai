'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const modelLinks = [
  { href: '/image/banana-pro-ai/', label: 'Banana Pro AI' },
  { href: '/image/flux-ai-image-generator/', label: 'Flux AI' },
  { href: '/image/seedream-ai/', label: 'Seedream AI' },
  { href: '/image/grok-imagine/', label: 'Grok Imagine' },
  { href: '/image/z-image-turbo/', label: 'Z Image Turbo' },
  { href: '/image/qwen-image-edit/', label: 'Qwen Image Edit' },
];

export default function Footer() {
  const t = useTranslations('banana.footer');

  const productLinks = [
    { href: '/image/', label: t('product_links.0.label' as any) },
    { href: '/video/', label: t('product_links.1.label' as any) },
    { href: '/banana-prompts/', label: t('product_links.2.label' as any) },
    { href: '/studio/', label: t('product_links.3.label' as any) },
    { href: '/pricing/', label: t('product_links.4.label' as any) },
  ];

  const legalLinks = [
    { href: '/privacy-policy/', label: t('legal_links.0.label' as any) },
    { href: '/terms-of-service/', label: t('legal_links.1.label' as any) },
    { href: '/refund-policy/', label: t('legal_links.3.label' as any) },
    { href: '/disclaimer/', label: t('legal_links.2.label' as any) },
  ];

  return (
    <footer className="border-t border-[#363b4e] bg-[#0a0a0f] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">{t('products')}</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">AI Models</h3>
            <ul className="space-y-2">
              {modelLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">{t('legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">{t('contact')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hi@banana2ai.net" className="text-sm text-gray-400 transition-colors hover:text-white">
                  hi@banana2ai.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#363b4e] pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Banana 2 AI. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
