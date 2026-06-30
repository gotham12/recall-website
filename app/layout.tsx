import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Recall — When Memory Fades, Someone Remains',
  description:
    'Recall is cognitive care for Margaret and clarity for Susan — Clara voice companion, Recall AI for caregivers, and ACSE early signal. Founded by Advaith Vijayasankaran (CEO) & Param Tyagi (CTO).',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Recall — When Memory Fades, Someone Remains',
    description:
      'Clara for patients. Recall AI for caregivers. One source of truth — built by Advaith Vijayasankaran & Param Tyagi.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Recall',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recall — When Memory Fades, Someone Remains',
    description: 'Clara for patients. Recall AI for caregivers. Founded by Advaith & Param.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
