import Link from 'next/link';

export default function CanceledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 text-center">
          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-500"
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
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Payment Canceled</h1>
          <p className="text-gray-600 mb-8">
            No worries! Your payment was not processed and no charges were made. You can try again
            whenever you&apos;re ready.
          </p>

          {/* Info box */}
          <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-600">
                Your ZIP code selections have not been saved. They&apos;ll still be available for you to claim when you&apos;re ready.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/business#claim-form"
              className="block w-full py-3.5 px-6 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full py-3.5 px-6 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Return to Home
            </Link>
          </div>

          {/* Support link */}
          <p className="mt-8 text-sm text-gray-500">
            Have questions?{' '}
            <a
              href="mailto:cantondetailingpros@gmail.com"
              className="text-indigo-600 hover:underline font-medium"
            >
              Contact us
            </a>
          </p>
        </div>

        {/* Benefits reminder */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Remember what you&apos;ll get:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Exclusive Leads', '10+ Leads/Month', 'Cancel Anytime'].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm text-gray-600 shadow-sm border border-gray-100"
              >
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
