import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
