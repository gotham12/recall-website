import {
  CascadeSection,
  CTASection,
  FeaturesBento,
  SiteFooter,
  ScreenshotsSection,
  StackSection,
} from '@/components/product-sections';
import { DemoVideoSection } from '@/components/demo-video';
import { DualExperienceSection } from '@/components/dual-experience';
import { SolutionSection } from '@/components/solution';
import { Navbar } from '@/components/site/navbar';
import { VisualBackdrop } from '@/components/site/visual-backdrop';

export default function ProductPage() {
  return (
    <main className="theme-product relative min-h-screen bg-product-50 text-product-950">
      <VisualBackdrop variant="product" />
      <Navbar tone="light" />
      <SolutionSection />
      <DemoVideoSection />
      <DualExperienceSection />
      <FeaturesBento />
      <CascadeSection />
      <ScreenshotsSection />
      <StackSection />
      <CTASection />
      <SiteFooter variant="light" />
    </main>
  );
}
