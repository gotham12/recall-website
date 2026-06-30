import {
  CascadeSection,
  CTASection,
  FeaturesBento,
  Footer,
  ScreenshotsSection,
  StackSection,
} from '@/components/product-sections';
import { Hero, Navbar, ProblemSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesBento />
      <CascadeSection />
      <ScreenshotsSection />
      <StackSection />
      <CTASection />
      <Footer />
    </main>
  );
}
