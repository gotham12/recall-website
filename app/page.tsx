import { ContactSection } from '@/components/site/contact-section';
import { DemoVideoSection } from '@/components/demo-video';
import { HeroIntro } from '@/components/site/hero-intro';
import { HomeHero, Navbar } from '@/components/site/navbar';
import { ScrollFlowers } from '@/components/site/scroll-flowers';
import { TeamSection } from '@/components/site/team-section';
import { VisualBackdrop } from '@/components/site/visual-backdrop';
import { SiteFooter } from '@/components/product-sections';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <ScrollFlowers mode="home" />
      <VisualBackdrop variant="home" />
      <Navbar />
      <HeroIntro />
      <HomeHero />
      <DemoVideoSection />
      <TeamSection />
      <ContactSection />
      <SiteFooter variant="dark" />
    </main>
  );
}
