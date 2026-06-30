import { ResearchProblemSection } from '@/components/research-problem';
import { ProblemBridge } from '@/components/site/problem-bridge';
import { ScrollFlowers } from '@/components/site/scroll-flowers';
import { SiteFooter } from '@/components/product-sections';
import { Navbar } from '@/components/site/navbar';
import { VisualBackdrop } from '@/components/site/visual-backdrop';

export default function ProblemPage() {
  return (
    <main className="theme-problem relative min-h-screen bg-zinc-950 text-zinc-100">
      <ScrollFlowers mode="wilt" />
      <VisualBackdrop variant="problem" />
      <Navbar tone="dark" />
      <ResearchProblemSection />
      <ProblemBridge />
      <SiteFooter variant="dark" />
    </main>
  );
}
