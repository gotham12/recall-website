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
import { PrivacyTrustSection } from '@/components/site/privacy-trust';
import { SectionPanel } from '@/components/site/section-panel';
import { Navbar } from '@/components/site/navbar';
import { PRODUCT_SECTION_BACKGROUNDS } from '@/lib/constants';

export default function ProductPage() {
  const [solution, privacy, demo, dual, features, cascade, screens, stack, cta, devLinks] =
    PRODUCT_SECTION_BACKGROUNDS;

  return (
    <main className="relative text-product-950">
      <div className="relative z-10">
        <Navbar tone="light" />
        <SectionPanel background={solution.src} tone={solution.tone}>
          <SolutionSection />
        </SectionPanel>
        <SectionPanel background={privacy.src} tone={privacy.tone}>
          <PrivacyTrustSection bright />
        </SectionPanel>
        <SectionPanel background={demo.src} tone={demo.tone}>
          <DemoVideoSection bright />
        </SectionPanel>
        <SectionPanel background={dual.src} tone={dual.tone}>
          <DualExperienceSection />
        </SectionPanel>
        <SectionPanel background={features.src} tone={features.tone}>
          <FeaturesBento bright />
        </SectionPanel>
        <SectionPanel background={cascade.src} tone={cascade.tone}>
          <CascadeSection bright />
        </SectionPanel>
        <SectionPanel background={screens.src} tone={screens.tone}>
          <ScreenshotsSection />
        </SectionPanel>
        <SectionPanel background={stack.src} tone={stack.tone}>
          <StackSection bright />
        </SectionPanel>
        <SectionPanel background={cta.src} tone={cta.tone}>
          <CTASection />
        </SectionPanel>
        <SectionPanel background={devLinks.src} tone={devLinks.tone}>
          <DevLinksSection bright />
          <SiteFooter variant="light" />
        </SectionPanel>
      </div>
    </main>
  );
}
