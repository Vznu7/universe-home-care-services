import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `UNIVERSE HOME CARE SERVICES | Best Home Care in Coimbatore`,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Universe Home Care Services provides the best home healthcare, nursing, elder care, and patient support in Coimbatore. Care that feels like family.',
  keywords: ['Universe Home Care', 'Universe Home Care Services', 'Home Care Coimbatore', 'Elder Care Coimbatore', 'Nursing Service at home Coimbatore', 'Patient Care Coimbatore'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.universehomecare.org',
    siteName: siteConfig.name,
    title: `UNIVERSE HOME CARE SERVICES | Best Home Care in Coimbatore`,
    description: 'Universe Home Care Services provides the best home healthcare, nursing, elder care, and patient support in Coimbatore.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50`}>
        {children}
      </body>
    </html>
  );
}

