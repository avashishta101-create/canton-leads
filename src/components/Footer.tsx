import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Canton Mobile Detail Pros</p>
            <p className="text-sm mt-1">
              Contact:{' '}
              <a
                href="mailto:cantondetailingpros@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                cantondetailingpros@gmail.com
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/business"
              className="hover:text-white transition-colors"
            >
              For Businesses
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-sm text-center">
          <p>&copy; {currentYear} Canton Mobile Detail Pros. All rights reserved.</p>
          <p className="mt-1 text-gray-500">
            We connect customers with independent local mobile auto detailing providers.
          </p>
        </div>
      </div>
    </footer>
  );
}
