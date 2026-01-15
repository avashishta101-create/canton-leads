import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Canton Mobile Detail Pros | Mobile Auto Detailing in Canton, MI',
  description:
    'Request mobile auto detailing services in Canton, Michigan. We connect you with trusted local providers for professional car detailing at your location.',
  openGraph: {
    title: 'Canton Mobile Detail Pros | Mobile Auto Detailing',
    description:
      'Request mobile auto detailing services in Canton, MI. We connect you with trusted local providers.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
