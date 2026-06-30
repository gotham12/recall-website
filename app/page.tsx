import { ContactSection } from '@/components/site/contact-section';
import { DemoVideoSection } from '@/components/demo-video';
import { FlowerBackground } from '@/components/site/flower-background';
import { HomeHero, Navbar } from '@/components/site/navbar';
import { TeamSection } from '@/components/site/team-section';
import { SiteFooter } from '@/components/product-sections';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <FlowerBackground phase="home" />
      <div className="relative z-10">
        <Navbar />
        <HomeHero />
        <DemoVideoSection />
        <TeamSection />
        <ContactSection />
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
