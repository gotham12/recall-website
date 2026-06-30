import { ResearchProblemSection } from '@/components/research-problem';
import { ProblemBridge } from '@/components/site/problem-bridge';
import { SiteFooter } from '@/components/product-sections';
import { Navbar } from '@/components/site/navbar';
import { VisualBackdrop } from '@/components/site/visual-backdrop';

export default function ProblemPage() {
  return (
    <main className="theme-problem relative min-h-screen bg-problem-950 text-white">
      <VisualBackdrop variant="problem" />
      <Navbar tone="dark" />
      <ResearchProblemSection />
      <ProblemBridge />
      <SiteFooter variant="dark" />
    </main>
  );
}
