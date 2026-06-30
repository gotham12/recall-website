import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/ui/smooth-scroll';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Recall — AI Cognitive Care for Families',
  description:
    'Recall is an AI-native cognitive care platform: Clara for patients, Recall AI for caregivers, and the ACSE engine that catches decline before crisis.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Recall — AI Cognitive Care',
    description: 'Early signal. Automatic de-escalation. Dignity preserved.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Recall',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recall — AI Cognitive Care',
    description: 'Clara for patients. Recall AI for caregivers. One source of truth.',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-ink text-white antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
