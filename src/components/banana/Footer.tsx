import Link from 'next/link'

const productLinks = [
  { href: '/zh/image/', label: 'AI 图像制作' },
  { href: '/zh/video/', label: 'AI 视频制作' },
  { href: '/zh/banana-prompts/', label: 'Banana 提示词' },
  { href: '/zh/studio/', label: 'AI 工作流工作室' },
  { href: '/zh/pricing/', label: '定价' },
]

const modelLinks = [
  { href: '/zh/image/banana-pro-ai/', label: 'Banana Pro AI' },
  { href: '/zh/image/flux-ai-image-generator/', label: 'Flux AI' },
  { href: '/zh/image/seedream-ai/', label: 'Seedream AI' },
  { href: '/zh/image/grok-imagine/', label: 'Grok Imagine' },
  { href: '/zh/image/z-image-turbo/', label: 'Z Image Turbo' },
  { href: '/zh/image/qwen-image-edit/', label: 'Qwen Image Edit' },
]

const legalLinks = [
  { href: '/zh/privacy-policy/', label: '隐私政策' },
  { href: '/zh/terms-of-service/', label: '服务条款' },
  { href: '/zh/refund-policy/', label: '退款政策' },
  { href: '/zh/disclaimer/', label: '免责声明' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#363b4e] bg-[#0a0a0f] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">产品</h3>
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">模型</h3>
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">法律</h3>
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#ffcc33]">BANANA PRO AI</h3>
            <p className="text-sm text-gray-400">
              专业的 AI 图像和视频生成平台。几秒内将创意转化为令人惊艳的视觉作品。
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-[#363b4e] pt-6 text-center">
          <p className="text-xs text-gray-500">© 2025 Banana Pro AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
