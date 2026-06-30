import {
  CascadeSection,
  CTASection,
  FeaturesBento,
  Footer,
  ScreenshotsSection,
  StackSection,
} from '@/components/product-sections';
import { DemoVideoSection } from '@/components/demo-video';
import { DualExperienceSection } from '@/components/dual-experience';
import { ResearchProblemSection } from '@/components/research-problem';
import { SolutionSection } from '@/components/solution';
import { Hero, Navbar } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ResearchProblemSection />
      <SolutionSection />
      <DemoVideoSection />
      <DualExperienceSection />
      <FeaturesBento />
      <CascadeSection />
      <ScreenshotsSection />
      <StackSection />
      <CTASection />
      <Footer />
    </main>
  );
}
