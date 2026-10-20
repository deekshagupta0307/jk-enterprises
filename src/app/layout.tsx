import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { ChatWidget } from '@/components/assistant/ChatWidget';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JK Enterprises | Computer Hardware, IT Solutions & Wholesale Rajasthan',
  description:
    'JK Enterprises provides computer hardware, processors, SSDs, RAM, CCTV surveillance, and enterprise networking equipment across Rajasthan. Serving retail customers, schools, offices, and wholesale partners.',
  keywords: [
    'JK Enterprises',
    'Computer Hardware Rajasthan',
    'IT Solutions Jaipur',
    'SSDs and Processors',
    'RAM Memory',
    'School Computer Labs',
    'CCTV Security Systems',
    'Wholesale IT Equipment',
    'Jai Shree Shyam',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <AnnouncementBar />
        <DemoBanner />
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
