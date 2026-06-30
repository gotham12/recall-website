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
import { DevLinksSection } from '@/components/site/dev-links';
import { FlowerBackground } from '@/components/site/flower-background';
import { PrivacyTrustSection } from '@/components/site/privacy-trust';
import { Navbar } from '@/components/site/navbar';

export default function ProductPage() {
  return (
    <main className="theme-product relative min-h-screen text-product-950">
      <FlowerBackground phase="product" />
      <div className="relative z-10">
        <Navbar tone="light" />
        <SolutionSection />
        <PrivacyTrustSection bright />
        <DemoVideoSection bright />
        <DualExperienceSection />
        <FeaturesBento />
        <CascadeSection />
        <ScreenshotsSection />
        <StackSection />
        <CTASection />
        <DevLinksSection bright />
        <SiteFooter variant="light" />
      </div>
    </main>
  );
}
