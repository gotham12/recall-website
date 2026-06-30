import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Problem — Recall',
  description: 'The structural crisis in neurodegenerative care that families navigate every day.',
};

export default function ProblemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
