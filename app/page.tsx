import { ContactSection } from '@/components/site/contact-section';
import { HomeHero, Navbar } from '@/components/site/navbar';
import { TeamSection } from '@/components/site/team-section';
import { VisualBackdrop } from '@/components/site/visual-backdrop';
import { SiteFooter } from '@/components/product-sections';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <VisualBackdrop variant="home" />
      <Navbar />
      <HomeHero />
      <TeamSection />
      <ContactSection />
      <SiteFooter variant="dark" />
    </main>
  );
}
