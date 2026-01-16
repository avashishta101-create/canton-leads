import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Canton Mobile Detail Pros | Mobile Auto Detailing in Canton, MI',
  description:
    'Request mobile auto detailing services in Canton, Michigan. We connect you with trusted local providers for professional car detailing at your location.',
  keywords: ['mobile detailing', 'auto detailing', 'Canton MI', 'car detailing', 'mobile car wash'],
  authors: [{ name: 'Canton Mobile Detail Pros' }],
  openGraph: {
    title: 'Canton Mobile Detail Pros | Mobile Auto Detailing',
    description:
      'Request mobile auto detailing services in Canton, MI. We connect you with trusted local providers.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Canton Mobile Detail Pros',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canton Mobile Detail Pros | Mobile Auto Detailing',
    description: 'Request mobile auto detailing services in Canton, MI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
