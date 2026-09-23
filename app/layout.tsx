import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Vikram-1 — Interactive Rocket Anatomy & Mission Explorer',
  description:
    "Take apart Skyroot Aerospace's Vikram-1: what each stage does, how propulsion works, who builds what, and what Mission Aagaman actually carried to orbit. Every factual claim is sourced.",
  keywords: [
    'Vikram-1',
    'Skyroot Aerospace',
    'Mission Aagaman',
    'rocket anatomy',
    'launch vehicle',
    'ISRO',
    'low Earth orbit',
  ],
  authors: [{ name: 'Vikram-1 Explorer' }],
  openGraph: {
    title: 'Vikram-1 — Interactive Rocket Anatomy & Mission Explorer',
    description:
      'Explore the rocket. Understand every stage. Follow the technology. Meet the payloads.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#07080a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]
                     focus:bg-ember focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-void"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
