import type { Metadata } from 'next';
import './globals.css';
import { Outfit, DM_Sans } from 'next/font/google';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { SITE_URL } from '@/lib/constants';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

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
    <html lang={`en`} className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
