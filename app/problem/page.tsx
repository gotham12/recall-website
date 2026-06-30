import { ResearchProblemSection } from '@/components/research-problem';
import { ProblemBridge } from '@/components/site/problem-bridge';
import { DevLinksSection } from '@/components/site/dev-links';
import { FlowerBackground } from '@/components/site/flower-background';
import { SiteFooter } from '@/components/product-sections';
import { Navbar } from '@/components/site/navbar';

export default function ProblemPage() {
  return (
    <main className="theme-problem relative min-h-screen text-zinc-100">
      <FlowerBackground phase="problem" />
      <div className="relative z-10">
        <Navbar tone="dark" />
        <ResearchProblemSection />
        <ProblemBridge />
        <DevLinksSection />
        <SiteFooter variant="dark" />
      </div>
    </main>
  );
}
