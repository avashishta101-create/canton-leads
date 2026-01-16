import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Canton Mobile Detail Pros',
  description: 'Privacy Policy for Canton Mobile Detail Pros lead connection platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="hero-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-indigo-200">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="prose prose-indigo max-w-none">
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
                committed to protecting your personal information. This Privacy Policy explains how
                we collect, use, share, and protect information when you use our lead connection
                platform.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Information We Collect
              </h2>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">From Customers (Lead Requesters)</h3>
                <p className="text-gray-600 mb-3">When you submit a lead request, we collect:</p>
                <ul className="space-y-2">
                  {['Full name', 'Phone number', 'Email address (if provided)', 'ZIP code', 'Service requested and details', 'Preferred timing for service'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">From Businesses (Subscribers)</h3>
                <p className="text-gray-600 mb-3">When you subscribe to our service, we collect:</p>
                <ul className="space-y-2">
                  {['Business name', 'Contact name', 'Email address', 'Phone number', 'Desired ZIP code territories', 'Payment information (processed securely by Stripe)'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-600">
                  We may automatically collect certain information when you visit our website,
                  including IP address, browser type, device information, and pages visited. This
                  information is used for analytics and improving our service.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                How We Use Your Information
              </h2>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Information</h3>
                <p className="text-gray-600 mb-3">We use customer lead information to:</p>
                <ul className="space-y-2">
                  {[
                    'Match you with an appropriate local service provider',
                    'Share your contact details with the matched provider',
                    'Facilitate communication between you and the provider',
                    'Improve our matching and routing services',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Information</h3>
                <p className="text-gray-600 mb-3">We use business subscriber information to:</p>
                <ul className="space-y-2">
                  {[
                    'Process and manage your subscription',
                    'Deliver leads to your email',
                    'Communicate about your account and service updates',
                    'Process payments through Stripe',
                    'Manage ZIP code territory claims',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Information Sharing and Disclosure
              </h2>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">Sharing with Service Providers</h3>
                <p className="text-indigo-800">
                  <strong>Customer leads are shared with matched Business subscribers.</strong> When
                  you submit a lead request, your contact information (name, phone, email, service
                  details) is shared with the Business that has claimed your ZIP code territory. This
                  sharing is the core function of our platform and is necessary to connect you with a
                  local service provider.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Third-Party Service Providers</h3>
                <p className="text-gray-600 mb-3">We may share information with third parties who help us operate our platform:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Stripe:</strong> For payment processing (Business subscribers only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Supabase:</strong> For secure data storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Email services:</strong> For sending lead notifications</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Requirements</h3>
                <p className="text-gray-600">
                  We may disclose information if required by law, court order, or government request,
                  or to protect the rights, property, or safety of ourselves or others.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Consent to Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By submitting a lead request, you expressly consent to be contacted by phone call,
                text message (SMS/MMS), and/or email by the matched service provider regarding your
                detailing request. Standard message and data rates may apply for text messages.
              </p>
              <p className="text-gray-600 leading-relaxed mt-3">
                You may opt out of communications by contacting the service provider directly or by
                emailing us at{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet or electronic
                storage is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We retain customer lead information as long as necessary for our business purposes
                and as required by law. Business subscriber information is retained for the duration
                of the subscription and for a reasonable period thereafter for record-keeping
                purposes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">Depending on your location, you may have rights to:</p>
              <ul className="space-y-2">
                {[
                  'Access the personal information we hold about you',
                  'Request correction of inaccurate information',
                  'Request deletion of your information',
                  'Opt out of certain data uses',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, contact us at{' '}
                <a
                  href="mailto:cantondetailingpros@gmail.com"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  cantondetailingpros@gmail.com
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our platform is not intended for children under 18 years of age. We do not knowingly
                collect personal information from children. If you believe we have collected
                information from a child, please contact us immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material
                changes by posting the updated policy on our website with a new &quot;Last updated&quot; date.
                Continued use of the platform after changes constitutes acceptance of the updated
                policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please
                contact us at:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 mt-4">
                <p className="font-semibold text-gray-900">Canton Mobile Detail Pros</p>
                <p className="text-gray-600 mt-1">
                  Email:{' '}
                  <a
                    href="mailto:cantondetailingpros@gmail.com"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    cantondetailingpros@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
