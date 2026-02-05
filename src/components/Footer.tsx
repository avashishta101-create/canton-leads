import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, Facebook, Instagram, Twitter, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Canton</span>
                <span className="block text-xs text-violet-400">Mobile Detail Pros</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Connecting Canton residents with professional mobile auto detailing services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-violet-500 hover:border-violet-500 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-violet-500 hover:border-violet-500 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-violet-500 hover:border-violet-500 transition-all"
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
                <Link href="/" className="text-sm hover:text-violet-400 transition-colors">
                  Request Service
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-sm hover:text-violet-400 transition-colors">
                  Business Solutions
                </Link>
              </li>
              <li>
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-sm hover:text-violet-400 transition-colors"
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
                <Link href="/terms" className="text-sm hover:text-violet-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-violet-400 transition-colors">
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
                <MapPin className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <span>Canton, Michigan</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-violet-400 flex-shrink-0" />
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="hover:text-violet-400 transition-colors"
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
                className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <Link href="/admin/leads">Admin Access</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} Canton Mobile Detail Pros. All rights reserved.</p>
          <p>Professional Mobile Detailing Connection Service</p>
        </div>
      </div>
    </footer>
  );
}
