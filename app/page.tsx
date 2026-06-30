import { ContactSection } from '@/components/site/contact-section';
import { DemoVideoSection } from '@/components/demo-video';
import { DevLinksSection } from '@/components/site/dev-links';
import { FlowerBackground } from '@/components/site/flower-background';
import { HomeLeadSections } from '@/components/site/home-lead';
import { HomeHero, Navbar } from '@/components/site/navbar';
import { PrivacyTrustSection } from '@/components/site/privacy-trust';
import { TeamSection } from '@/components/site/team-section';
import { SiteFooter } from '@/components/product-sections';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <FlowerBackground phase="home" />
      <div className="relative z-10">
        <Navbar />
        <HomeLeadSections />
        <HomeHero />
        <DemoVideoSection />
        <PrivacyTrustSection />
        <TeamSection />
        <ContactSection />
        <DevLinksSection />
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
