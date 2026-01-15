import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Canton Mobile Detail Pros',
  description: 'Privacy Policy for Canton Mobile Detail Pros lead connection platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-sm text-gray-500 mb-6">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              Canton Mobile Detail Pros (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
              committed to protecting your personal information. This Privacy Policy explains how
              we collect, use, share, and protect information when you use our lead connection
              platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              2.1 From Customers (Lead Requesters)
            </h3>
            <p>When you submit a lead request, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address (if provided)</li>
              <li>ZIP code</li>
              <li>Service requested and details</li>
              <li>Preferred timing for service</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              2.2 From Businesses (Subscribers)
            </h3>
            <p>When you subscribe to our service, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Business name</li>
              <li>Contact name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Desired ZIP code territories</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              2.3 Automatically Collected Information
            </h3>
            <p>
              We may automatically collect certain information when you visit our website,
              including IP address, browser type, device information, and pages visited. This
              information is used for analytics and improving our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">3.1 Customer Information</h3>
            <p>We use customer lead information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Match you with an appropriate local service provider</li>
              <li>Share your contact details with the matched provider</li>
              <li>Facilitate communication between you and the provider</li>
              <li>Improve our matching and routing services</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              3.2 Business Information
            </h3>
            <p>We use business subscriber information to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process and manage your subscription</li>
              <li>Deliver leads to your email</li>
              <li>Communicate about your account and service updates</li>
              <li>Process payments through Stripe</li>
              <li>Manage ZIP code territory claims</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Information Sharing and Disclosure
            </h2>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              4.1 Sharing with Service Providers
            </h3>
            <p>
              <strong>Customer leads are shared with matched Business subscribers.</strong> When
              you submit a lead request, your contact information (name, phone, email, service
              details) is shared with the Business that has claimed your ZIP code territory. This
              sharing is the core function of our platform and is necessary to connect you with a
              local service provider.
            </p>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">
              4.2 Third-Party Service Providers
            </h3>
            <p>We may share information with third parties who help us operate our platform:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Stripe:</strong> For payment processing (Business subscribers only)
              </li>
              <li>
                <strong>Supabase:</strong> For secure data storage
              </li>
              <li>
                <strong>Email services:</strong> For sending lead notifications
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">4.3 Legal Requirements</h3>
            <p>
              We may disclose information if required by law, court order, or government request,
              or to protect the rights, property, or safety of ourselves or others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Consent to Contact
            </h2>
            <p>
              By submitting a lead request, you expressly consent to be contacted by phone call,
              text message (SMS/MMS), and/or email by the matched service provider regarding your
              detailing request. Standard message and data rates may apply for text messages.
            </p>
            <p className="mt-3">
              You may opt out of communications by contacting the service provider directly or by
              emailing us at{' '}
              <a
                href="mailto:cantondetailingpros@gmail.com"
                className="text-blue-600 hover:underline"
              >
                cantondetailingpros@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
            <p>
              We retain customer lead information as long as necessary for our business purposes
              and as required by law. Business subscriber information is retained for the duration
              of the subscription and for a reasonable period thereafter for record-keeping
              purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of certain data uses</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at{' '}
              <a
                href="mailto:cantondetailingpros@gmail.com"
                className="text-blue-600 hover:underline"
              >
                cantondetailingpros@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our platform is not intended for children under 18 years of age. We do not knowingly
              collect personal information from children. If you believe we have collected
              information from a child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the updated policy on our website with a new &quot;Last updated&quot; date.
              Continued use of the platform after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please
              contact us at:
            </p>
            <p className="mt-2">
              <strong>Canton Mobile Detail Pros</strong>
              <br />
              Email:{' '}
              <a
                href="mailto:cantondetailingpros@gmail.com"
                className="text-blue-600 hover:underline"
              >
                cantondetailingpros@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
