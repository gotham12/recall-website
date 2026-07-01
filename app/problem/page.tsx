import { ResearchProblemSection } from '@/components/research-problem';
import { ProblemBridge } from '@/components/site/problem-bridge';
import { DevLinksSection } from '@/components/site/dev-links';
import { SectionPanel } from '@/components/site/section-panel';
import { SiteFooter } from '@/components/product-sections';
import { Navbar } from '@/components/site/navbar';
import { PROBLEM_SECTION_BACKGROUNDS } from '@/lib/constants';

export default function ProblemPage() {
  const bridgeBg = PROBLEM_SECTION_BACKGROUNDS[5];

  return (
    <main className="relative text-zinc-100">
      <div className="relative z-10">
        <Navbar tone="dark" />
        <ResearchProblemSection />
        <SectionPanel background={bridgeBg.src} tone={bridgeBg.tone}>
          <ProblemBridge />
          <DevLinksSection />
          <SiteFooter variant="dark" />
        </SectionPanel>
      </div>
    </main>
  );
}
