import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JaiShreeShyamTicker } from '@/components/ui/JaiShreeShyamTicker';
import { ChatWidget } from '@/components/assistant/ChatWidget';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { BUSINESS_CONFIG } from '@/lib/config/businessConfig';

const siteUrl = process.env.BETTER_AUTH_URL || 'https://jkenterprises-rajasthan.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'JK Enterprises | Products, Equipment & Commercial Supplies Rajasthan',
    template: '%s | JK Enterprises Rajasthan',
  },
  description:
    'JK Enterprises provides commercial products, office equipment, computer hardware, electronics, and general institutional supplies across Rajasthan. Headquartered in Bikaner, Rajasthan.',
  keywords: [
    'JK Enterprises',
    'Commercial Supplies Rajasthan',
    'Equipment and Supplies Bikaner',
    'Office Equipment',
    'Computer Hardware Rajasthan',
    'Electronics and Electricals',
    'Institutional Procurement',
    'Wholesale Supplies',
    'Jai Shree Shyam',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'JK Enterprises | Products, Equipment & Wholesale Rajasthan',
    description:
      'Regional trading, commercial equipment, and wholesale supplier serving retail customers, businesses, institutions, and dealers across Rajasthan.',
    url: siteUrl,
    siteName: 'JK Enterprises',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JK Enterprises | Products, Equipment & Supplies Rajasthan',
    description:
      'Regional trading, commercial equipment, and wholesale supplier serving retail customers, businesses, institutions, and dealers across Rajasthan.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: BUSINESS_CONFIG.name,
              description:
                'Commercial products, office equipment, computer hardware, electronics, and general institutional supplies across Rajasthan.',
              telephone: BUSINESS_CONFIG.phone,
              email: BUSINESS_CONFIG.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bikaner',
                addressRegion: 'Rajasthan',
                addressCountry: 'IN',
              },
              areaServed: {
                '@type': 'State',
                name: 'Rajasthan',
              },
              currenciesAccepted: 'INR',
              paymentAccepted: 'Manual UPI QR Code, Bank Transfer (NEFT/RTGS/IMPS)',
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <CartProvider>
          <JaiShreeShyamTicker />
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <ChatWidget />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
