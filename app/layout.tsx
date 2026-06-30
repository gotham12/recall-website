import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Recall — AI Cognitive Care for Families',
  description:
    'Recall is an AI-native cognitive care platform: Clara for patients, Recall AI for caregivers, and the ACSE engine that catches decline before crisis.',
  openGraph: {
    title: 'Recall — AI Cognitive Care',
    description: 'Early signal. Automatic de-escalation. Dignity preserved.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recall — AI Cognitive Care',
    description: 'Clara for patients. Recall AI for caregivers. One source of truth.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
