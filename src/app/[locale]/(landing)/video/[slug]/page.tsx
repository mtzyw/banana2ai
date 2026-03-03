import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import VideoGeneratorPanel from '@/components/banana/VideoGeneratorPanel';
import Image from 'next/image';
import { videoTools } from '@/data/video-tools';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return Object.keys(videoTools).map((slug) => ({ slug }));
}

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  return (
    <details
      open={defaultOpen}
      className="group bg-[#13151f] border border-[#363b4e] rounded-xl overflow-hidden"
    >
      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-sm font-semibold text-white group-hover:text-[#ffcc33] transition-colors list-none">
        {question}
        <span className="text-white/40 group-open:rotate-180 transition-transform duration-200 ml-4 flex-shrink-0">▼</span>
      </summary>
      <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{answer}</div>
    </details>
  );
}

export default async function VideoToolPage({ params }: Props) {
  const { slug } = await params;
  const isZh = (await getLocale()) === 'zh';
  const tool = videoTools[slug];

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-white/40">
          <Link href="/zh/" className="hover:text-white/70 transition-colors">{isZh ? '首页' : 'Homepage'}</Link>
          <span>/</span>
          <Link href="/zh/video/" className="hover:text-white/70 transition-colors">AI{isZh ? '视频生成器' : 'Video Generator'}</Link>
          <span>/</span>
          <span className="text-[#ffcc33]">{tool.modelName}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] text-sm font-medium mb-4">
              🎬 AI {isZh ? '视频生成' : 'Video Generation'}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-[#ffcc33] via-[#ff9f43] to-[#ffcc33] bg-clip-text text-transparent">
                {tool.heroTitle}
              </span>
            </h1>
            <h2 className="text-lg md:text-xl text-white/80 font-medium mb-4">{tool.heroSubtitle}</h2>
            <p className="text-white/60 mb-6 leading-relaxed">{tool.heroDescription}</p>
            <Link
              href="/zh/pricing/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black font-bold hover:opacity-90 transition-opacity mb-8"
            >
              🎬 {isZh ? '立即体验' : 'Experience Now'}
            </Link>
            <ul className="space-y-2">
              {tool.features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-0.5 text-[#ffcc33]">{f.icon}</span>
                  <span>{f.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#1c2030]">
            <Image src={tool.heroImage} alt={tool.modelName} fill className="object-cover" />
            {/* Video play overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#ffcc33]/20 border-2 border-[#ffcc33]/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl ml-1">▶</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {tool.modelName} {isZh ? '的核心功能' : 'Core Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.features.map((f, i) => (
              <div key={i} className="bg-[#0f1117] border border-[#363b4e] rounded-2xl p-6 hover:border-[#ffcc33]/40 transition-colors">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-semibold mb-2 text-[#ffcc33]">{f.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Generator */}
      <VideoGeneratorPanel
        sampleVideoSrc="https://static.banana2ai.net/videos/sample-subpage.mp4"
        sampleVideoPoster="https://static.banana2ai.net/images/video/default-poster.webp"
      />

      {/* Steps Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {isZh ? '简单几步，完成专业视频创作' : 'Create professional videos in a few simple steps'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tool.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffcc33] to-[#ff9f43] flex items-center justify-center text-black font-bold text-lg mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-[#ffcc33] mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {tool.modelName}：{isZh ? '适用场景' : 'Use Cases'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tool.useCases.map((uc, i) => (
              <div key={i} className="bg-[#0f1117] border border-[#363b4e] rounded-xl p-5 hover:border-[#ffcc33]/30 transition-colors group">
                <h3 className="font-semibold text-white group-hover:text-[#ffcc33] transition-colors mb-2">{uc.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {isZh ? '用户对 {tool.modelName} 的评价' : 'User reviews of {tool.modelName}'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.testimonials.map((t, i) => (
            <div key={i} className="bg-[#13151f] border border-[#363b4e] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#ffcc33]">★</span>
                ))}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">&ldquo;{t.content}&rdquo;</p>
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#13151f] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {isZh ? '关于 {tool.modelName} 的常见问题' : 'Frequently asked questions about {tool.modelName}'}
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1c2030] to-[#13151f] border-t border-[#363b4e] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
              {tool.ctaTitle}
            </span>
          </h2>
          <p className="text-white/60 mb-8 text-lg">{tool.ctaDescription}</p>
          <Link
            href="/zh/pricing/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] text-black font-bold text-lg hover:opacity-90 transition-opacity"
          >
            🎬 {isZh ? '立即开始免费使用' : 'Start Using for Free Now'}
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = videoTools[slug];

  if (!tool) {
    return { title: 'Not Found' };
  }

  return {
    title: `${tool.modelName} - Banana Pro AI`,
    description: tool.heroDescription,
  };
}
