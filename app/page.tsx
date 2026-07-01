import { ContactSection } from '@/components/site/contact-section';
import { DemoVideoSection } from '@/components/demo-video';
import { DevLinksSection } from '@/components/site/dev-links';
import { HeroBackground } from '@/components/site/hero-background';
import { HomeChapterBridge } from '@/components/site/home-chapter-bridge';
import { HomeFeatures } from '@/components/site/home-features';
import { HomeStatsBand } from '@/components/site/home-stats-band';
import { HomeTestimonial } from '@/components/site/home-testimonial';
import { Navbar } from '@/components/site/navbar';
import { PrivacyTrustSection } from '@/components/site/privacy-trust';
import { SectionPanel } from '@/components/site/section-panel';
import { TeamSection } from '@/components/site/team-section';
import { SiteFooter } from '@/components/product-sections';
import { HOME_SECTION_BACKGROUNDS } from '@/lib/constants';

export default function Home() {
  const [stats, testimonial, features, bridge, demo, privacy, team, contact, devLinks] =
    HOME_SECTION_BACKGROUNDS;

  return (
    <main className="relative text-white">
      <HeroBackground />
      <div className="relative z-0">
        <Navbar />
        <SectionPanel background={stats.src} tone={stats.tone}>
          <HomeStatsBand />
        </SectionPanel>
        <SectionPanel background={testimonial.src} tone={testimonial.tone}>
          <HomeTestimonial />
        </SectionPanel>
        <SectionPanel background={features.src} tone={features.tone}>
          <HomeFeatures />
        </SectionPanel>
        <SectionPanel background={bridge.src} tone={bridge.tone}>
          <HomeChapterBridge />
        </SectionPanel>
        <SectionPanel background={demo.src} tone={demo.tone}>
          <DemoVideoSection />
        </SectionPanel>
        <SectionPanel background={privacy.src} tone={privacy.tone}>
          <PrivacyTrustSection />
        </SectionPanel>
        <SectionPanel background={team.src} tone={team.tone}>
          <TeamSection />
        </SectionPanel>
        <SectionPanel background={contact.src} tone={contact.tone}>
          <ContactSection />
        </SectionPanel>
        <SectionPanel background={devLinks.src} tone={devLinks.tone}>
          <DevLinksSection />
          <SiteFooter variant="dark" />
        </SectionPanel>
      </div>
    </main>
  );
}
