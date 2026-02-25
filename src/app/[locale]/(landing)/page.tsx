import HeroSection from '@/components/banana/HeroSection'
import HowItWorksSection from '@/components/banana/HowItWorksSection'
import ShowcaseSection from '@/components/banana/ShowcaseSection'
import FeaturesSection from '@/components/banana/FeaturesSection'
import AdvancedFeaturesSection from '@/components/banana/AdvancedFeaturesSection'
import UseCasesSection from '@/components/banana/UseCasesSection'
import TestimonialsSection from '@/components/banana/TestimonialsSection'
import FAQSection from '@/components/banana/FAQSection'
import CTASection from '@/components/banana/CTASection'

export default function Page() {
  return (
    <main className="flex-1 overflow-auto bg-[#0f1117] custom-scrollbar">
      <HeroSection />
      <HowItWorksSection />
      <ShowcaseSection />
      <FeaturesSection />
      <AdvancedFeaturesSection />
      <UseCasesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
