import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Product — Recall',
  description: 'Clara for patients, Recall AI for caregivers, and the ACSE engine that catches decline before crisis.',
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
