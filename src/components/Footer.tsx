import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2C8 2 6 5 6 8c0 2 1 3.5 2 4.5S10 14 10 16h4c0-2 1-2.5 2-3.5s2-2.5 2-4.5c0-3-2-6-6-6z" />
                  <path d="M10 16v2a2 2 0 0 0 4 0v-2" />
                  <circle cx="12" cy="6" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Canton</span>
                <span className="block text-sm text-blue-400">Mobile Detail Pros</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              Connecting Canton residents with professional mobile auto detailing services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-blue-400 transition-colors">
                  Customer Lead Page
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-sm hover:text-blue-400 transition-colors">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link href="/business/success" className="text-sm hover:text-blue-400 transition-colors">
                  Business Success
                </Link>
              </li>
              <li>
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Canton, Michigan</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  cantondetailingpros@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              >
                <Link href="/admin/leads">Admin Access</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>&copy; {currentYear} Canton Mobile Detail Pros. All rights reserved.</p>
          <p>Professional Mobile Detailing Connection Service</p>
        </div>
      </div>
    </footer>
  );
}
