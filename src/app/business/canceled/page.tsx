import Link from 'next/link';

export default function CanceledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="card max-w-md text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          No worries! Your payment was not processed and no charges were made. You can try again
          whenever you&apos;re ready.
        </p>

        <div className="space-y-3">
          <Link href="/business" className="btn-primary block">
            Return to Business Page
          </Link>
          <Link href="/" className="btn-secondary block">
            Go to Home
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Have questions?{' '}
          <a
            href="mailto:cantondetailingpros@gmail.com"
            className="text-blue-600 hover:underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
