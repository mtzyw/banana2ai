import { notFound } from 'next/navigation';
import ModelDetailPage from '@/components/banana/ModelDetailPage';
import { imageTools } from '@/data/image-tools';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return Object.keys(imageTools).map((slug) => ({ slug }));
}

export default async function ImageToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = imageTools[slug];

  if (!tool) {
    notFound();
  }

  return (
    <ModelDetailPage
      modelName={tool.modelName}
      modelSlug={tool.slug}
      heroTitle={tool.heroTitle}
      heroSubtitle={tool.heroSubtitle}
      heroDescription={tool.heroDescription}
      heroImage={tool.heroImage}
      features={tool.features}
      steps={tool.steps}
      useCases={tool.useCases}
      testimonials={tool.testimonials}
      faqs={tool.faqs}
      ctaTitle={tool.ctaTitle}
      ctaDescription={tool.ctaDescription}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tool = imageTools[slug];

  if (!tool) {
    return { title: 'Not Found' };
  }

  return {
    title: `${tool.modelName} - Banana Pro AI`,
    description: tool.heroDescription,
  };
}
